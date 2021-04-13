import { Bar } from 'vue-chartjs'
import db from "../../firebase.js"


export default {
    extends: Bar,
    
    data: function () {
        return {
            id: this.$route.query.id,
            datacollection: {
                labels: ["Transportation","Utilities","Food", "Ecommerce"],
                datasets: [{
                    label: "You",
                    backgroundColor: ["#1c4073","#1c4073","#1c4073", "#1c4073"],
                    data: [0, 0, 0, 0]
                  }, 
                  {
                    label: "Singapore",
                    backgroundColor: ["#00a5cf","#00a5cf","#00a5cf", "#00a5cf"],
                    data: [100, 100, 100, 100]
                  }]
            },
            options: {
                legend: { display: true },
                title: {
                  display: true,
                  text: 'Emission chart Relative'
                },
                scales:{
                    yAxes:[{
                        ticks:{
                            beginAtZero: true
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods:{
        fetchItem: function(){
            db.firestore().collection('users').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                this.datacollection.datasets[0].data[3] = parseFloat(item.Survey2["amount"])
                this.datacollection.datasets[0].data[0] = (parseFloat(item.Survey["bus"])+parseFloat(item.Survey["car"])+parseFloat(item.Survey["mrt"]))*4
                this.datacollection.datasets[0].data[1] = parseFloat(item.Survey["electricity"]) + parseFloat(item.Survey["water"]) + parseFloat(item.Survey["gas"])
                this.datacollection.datasets[0].data[2] = parseFloat(item.Survey1["chick"]) + parseFloat(item.Survey1["beef"]) + parseFloat(item.Survey1["veg"])
            }).then(()=>this.renderChart(this.datacollection, this.options))
        }
    },
    mounted() {
        this.fetchItem()
    }
}