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
                    data: [1828, 1760, 3945, 883]
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
                maintainAspectRatio: false,
            }
        }
    },
    methods:{
        fetchItem: function(){
            db.firestore().collection('users').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                this.datacollection.datasets[0].data[0] = item.Emissions["transport"]
                this.datacollection.datasets[0].data[1] = item.Emissions["utility"]
                this.datacollection.datasets[0].data[2] = item.Emissions["food"]
                this.datacollection.datasets[0].data[3] = item.Emissions["ecommerce"]
            }).then(()=>this.renderChart(this.datacollection, this.options))
        }
    },
    mounted() {
        this.fetchItem()
    }
}