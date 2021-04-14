import { Doughnut } from 'vue-chartjs'
import db from "../../firebase.js"
// import Chart from "chart.js";



export default {
    extends: Doughnut,
    data: function () {
        return {
            id: this.$route.query.id,
            total:0,
            commcoefs:{"Fashion":0.1, "Gadgets":0.4, "Gym":1, "Food Delivery":-0.3},
            commcoef:2,
            datacollection: {
                labels: ["Transport", "Utilities", "Food","Ecommerce", "Car","Bus","Mrt", "Electricity", "Water", "Gas", "White Meat", "Red Meat", "Vegetable", "Ecommerce"],
                datasets: [{
                    label: "Quantity",
                    backgroundColor: ["#1c4073","#3CB371","#00a5cf","#25a18e"],
                    data: [0, 0, 0, 0]
                }, 
                {
                    
                    label: "Big group",
                    backgroundColor: ["#004e64", "#00a5cf","#7ae582", "#25a18e","#175e72", "#22506e", "#44799a", "#64BC6A","#6FD076" , "#84F98D","#24B1D5", "#6DCBE3","#48BEDC","#25a18e"],
                    data: [0,0,0,0,0,0,0,0,0,0,0,0,0]
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Emmission Orders Aggregate'
                },
                maintainAspectRatio: false,
                legend: {display: false},
                cutoutPercentage: 60,
                
              }
        }
    },
    methods:{
        fetchItems: function(){
            db.firestore().collection('users').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                let household = parseFloat(item.Survey["house"])
                let commerce = item.Survey2["ecommerce"]
                console.log(commerce)
                var i;
                for (i =0; i<commerce.length;i++){
                    this.commcoef += this.commcoefs[commerce[i]] 
                }
                this.datacollection.datasets[1].data[4] = Math.round(parseFloat(item.Survey["car"])*0.118*64.1*4*12, 2) //1  363
                this.datacollection.datasets[1].data[5] = Math.round(parseFloat(item.Survey["bus"])*0.073*20*4*12, 2)  //2 70.08
                this.datacollection.datasets[1].data[6] = Math.round(parseFloat(item.Survey["mrt"])*0.0132*78*4*12,2) //4 49.4
                this.datacollection.datasets[1].data[7] = Math.round(((parseFloat(item.Survey["electricity"])/household)/0.2413)*0.4085*12,2)//100
                this.datacollection.datasets[1].data[8] = Math.round(((parseFloat(item.Survey["water"])/household)/0.83)*0.279*12, 2) //60
                this.datacollection.datasets[1].data[9] = Math.round(((parseFloat(item.Survey["gas"])/household)/0.1933)*0.4085*12, 2) //10
                this.datacollection.datasets[1].data[10] = Math.round((parseFloat(item.Survey1["chick"])/100)*250*30, 2) //30 2700
                this.datacollection.datasets[1].data[11] = Math.round((parseFloat(item.Survey1["beef"])/100)*250*46, 2) //10 1380
                this.datacollection.datasets[1].data[12] = Math.round((parseFloat(item.Survey1["veg"])/100)*250*1.8, 2) //60 324
                this.datacollection.datasets[1].data[13] = Math.round((parseFloat(item.Survey2["amount"]))*this.commcoef*12, 2) //7 240
                // Transport
                this.datacollection.datasets[0].data[0] = this.datacollection.datasets[1].data[4]+this.datacollection.datasets[1].data[5]+ this.datacollection.datasets[1].data[6]
                // Utilities
                this.datacollection.datasets[0].data[1] = this.datacollection.datasets[1].data[7]+this.datacollection.datasets[1].data[8]+ this.datacollection.datasets[1].data[9]
                // Food
                this.datacollection.datasets[0].data[2] = this.datacollection.datasets[1].data[10]+this.datacollection.datasets[1].data[11]+ this.datacollection.datasets[1].data[12]
                // Ecommerce
                this.datacollection.datasets[0].data[3] = this.datacollection.datasets[1].data[13]
                //Total
                this.total = this.datacollection.datasets[0].data.reduce(function(a, b){return a + b}, 0)
            }).then(()=>{
                this.textCenter(this.total)
                console.log(this.total)
                this.renderChart(this.datacollection, this.options)
                this.loadTotal(this.total, this.datacollection.datasets[0].data[0], this.datacollection.datasets[0].data[1], this.datacollection.datasets[0].data[2], this.datacollection.datasets[0].data[3])
            })
        },
        textCenter(val) {
            this.addPlugin({
                id: 'my-plugin',
                beforeDraw: function(chart) {
                    var width = chart.chart.width;
                    var height = chart.chart.height;
                    var ctx = chart.chart.ctx;
                    ctx.restore();
                    var fontSize = (height / 270).toFixed(5);
                    ctx.font = fontSize + "em Montserrat";
                    ctx.textBaseline = "middle";
                    var text = val + "kg Carbon";
                    var text1 = "Yearly";
                    var textX = Math.round((width - ctx.measureText(text).width) / 2);
                    var textX1 = Math.round((width - ctx.measureText(text1).width) / 2);
                    var textY = height / 2;
                    ctx.fillText(text, textX, textY+15);
                    ctx.fillText(text1, textX1, textY+45);
                    ctx.save();
                }
            })
        },
        loadTotal(val, Transportation, Utilities,Food, Ecommerce ){
            db.firestore().collection('users').doc(this.id).update({
                Emissions: {
                    total: val,
                    transport: Transportation,
                    utility: Utilities,
                    food: Food,
                    ecommerce: Ecommerce 
                }
            })
        }
    },
    mounted() {
        this.fetchItems()
    }
}
// https://www.eco-business.com/news/singapores-mrt-lines-be-graded-green-ness/#:~:text=Each%20MRT%20passenger%20generates%20a,figures%20from%20transport%20operator%20SMRT.
// https://www.ema.gov.sg/singapore-energy-statistics/Ch02/index2#:~:text=The%20Grid%20Emission%20Factor%20(GEF,per%20MWh%20of%20electricity%20generated.&text=Singapore's%20average%20OM%20GEF%20fell,CO2%2FkWh%20in%202019.
// https://www.todayonline.com/singapore/explainer-how-food-singaporeans-eat-contribute-climate-change
// https://www.ema.gov.sg/statistic.aspx?sta_sid=20140729MPY03nTHx2a1