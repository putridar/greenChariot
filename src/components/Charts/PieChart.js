import { Doughnut } from 'vue-chartjs'
import db from "../../firebase.js"
// import Chart from "chart.js";



export default {
    extends: Doughnut,
    data: function () {
        return {
            id: this.$route.query.id,
            total:"",
            datacollection: {
                labels: ["Transport", "Utilities", "Food","Ecommerce", "Car","Bus","Mrt", "Electricity","Gas", "Water", "White Meat", "Red Meat", "Vegetable", "Ecommerce"],
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
                // let household = parseFloat(item.Survey["house"])
                // this.datacollection.datasets[1].data[4] = (parseFloat(item.Survey["car"])*0.118*64.1*4*12)
                // this.datacollection.datasets[1].data[5] = (parseFloat(item.Survey["bus"])*4*0.73*20*4*12)
                // this.datacollection.datasets[1].data[6] = (parseFloat(item.Survey["mrt"])*4**13.2*78*4*12)
                this.datacollection.datasets[1].data[4] = (parseFloat(item.Survey["car"]))*4
                this.datacollection.datasets[1].data[5] = (parseFloat(item.Survey["bus"]))*4
                this.datacollection.datasets[1].data[6] = (parseFloat(item.Survey["mrt"]))*4
                this.datacollection.datasets[1].data[7] = parseFloat(item.Survey["electricity"])
                this.datacollection.datasets[1].data[8] = parseFloat(item.Survey["gas"])
                this.datacollection.datasets[1].data[9] = parseFloat(item.Survey["water"])
                this.datacollection.datasets[1].data[10] = parseFloat(item.Survey1["chick"])
                this.datacollection.datasets[1].data[11] = parseFloat(item.Survey1["beef"])
                this.datacollection.datasets[1].data[12] = parseFloat(item.Survey1["veg"])
                this.datacollection.datasets[1].data[13] = parseFloat(item.Survey2["amount"])
                // Transport
                this.datacollection.datasets[0].data[0] = this.datacollection.datasets[1].data[4]+this.datacollection.datasets[1].data[5]+ this.datacollection.datasets[1].data[6]
                // Utilities
                this.datacollection.datasets[0].data[1] = this.datacollection.datasets[1].data[7]+this.datacollection.datasets[1].data[8]+ this.datacollection.datasets[1].data[9]
                // Food
                this.datacollection.datasets[0].data[2] = this.datacollection.datasets[1].data[10]+this.datacollection.datasets[1].data[11]+ this.datacollection.datasets[1].data[12]
                // Ecommerce
                this.datacollection.datasets[0].data[3] = this.datacollection.datasets[1].data[13]
            }).then(()=>{
                this.sumall()
                this.textCenter(this.total)
                this.renderChart(this.datacollection, this.options)
                this.loadTotal(this.total)
            })
            
        },
        sumall: function(){
            this.total = this.datacollection.datasets[0].data.reduce(function(a, b){return a + b}, 0)
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
                    var textX = Math.round((width - ctx.measureText(text).width) / 2);
                    var textY = height / 2;
                    ctx.fillText(text, textX, textY+15);
                    ctx.save();
                }
            })
        },
        loadTotal(val){
            db.firestore().collection('users').doc(this.id).update({
                total: val
            })
        }
    },
    mounted() {
        this.fetchItems()
    }
}
// https://www.eco-business.com/news/singapores-mrt-lines-be-graded-green-ness/#:~:text=Each%20MRT%20passenger%20generates%20a,figures%20from%20transport%20operator%20SMRT.
// https://www.ema.gov.sg/singapore-energy-statistics/Ch02/index2#:~:text=The%20Grid%20Emission%20Factor%20(GEF,per%20MWh%20of%20electricity%20generated.&text=Singapore's%20average%20OM%20GEF%20fell,CO2%2FkWh%20in%202019.