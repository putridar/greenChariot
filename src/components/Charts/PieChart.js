import { Doughnut } from 'vue-chartjs'
import db from "../../firebase.js"
import Chart from "chart.js";



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
                this.total = (parseFloat(item.Survey["bus"])+parseFloat(item.Survey["car"])+parseFloat(item.Survey["mrt"]))*4 + parseFloat(item.Survey["electricity"]) + parseFloat(item.Survey["water"]) + parseFloat(item.Survey["gas"]) + this.datacollection.datasets[0].data[2] +parseFloat(item.Survey1["chick"]) + parseFloat(item.Survey1["beef"]) + parseFloat(item.Survey1["veg"])+ parseFloat(item.Survey2["amount"])
                this.datacollection.datasets[1].data[4] = parseFloat(item.Survey["car"])*4
                this.datacollection.datasets[1].data[5] = parseFloat(item.Survey["bus"])*4
                this.datacollection.datasets[1].data[6] = parseFloat(item.Survey["mrt"])*4
                this.datacollection.datasets[1].data[7] = parseFloat(item.Survey["electricity"])
                this.datacollection.datasets[1].data[8] = parseFloat(item.Survey["gas"])
                this.datacollection.datasets[1].data[9] = parseFloat(item.Survey["water"])
                this.datacollection.datasets[1].data[10] = parseFloat(item.Survey1["chick"])
                this.datacollection.datasets[1].data[11] = parseFloat(item.Survey1["beef"])
                this.datacollection.datasets[1].data[12] = parseFloat(item.Survey1["veg"])
                this.datacollection.datasets[1].data[13] = parseFloat(item.Survey2["amount"])
                this.datacollection.datasets[0].data[3] = parseFloat(item.Survey2["amount"])
                this.datacollection.datasets[0].data[0] = (parseFloat(item.Survey["bus"])+parseFloat(item.Survey["car"])+parseFloat(item.Survey["mrt"]))*4
                this.datacollection.datasets[0].data[1] = parseFloat(item.Survey["electricity"]) + parseFloat(item.Survey["water"]) + parseFloat(item.Survey["gas"])
                this.datacollection.datasets[0].data[2] = parseFloat(item.Survey1["chick"]) + parseFloat(item.Survey1["beef"]) + parseFloat(item.Survey1["veg"])
            }).then(()=>this.renderChart(this.datacollection, this.options)).then(()=>this.textCenter(this.total))
            
        },
        textCenter(val) {
            Chart.pluginService.register({
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
            });
            Chart.plugins.unregister(this.chartdata);
        }            
    },
    mounted() {
        this.fetchItems()
    }
}

// car https://www.lta.gov.sg/content/ltagov/en/newsroom/2015/2/2/revised-carbon-emissions-based-vehicle-scheme-cevs-from-1-july-2015.html
// bus and mrt https://www.e2singapore.gov.sg/overview/transport 
// meat - https://www.ecosperity.sg/content/dam/ecosperity/en/reports/Environmental-Impact-of-Key-Food-Items-in-Singapore_Oct2019.pdf
// ecommerce - https://www.generationim.com/research-centre/insights/ecommerce-vs-bricks-mortar/