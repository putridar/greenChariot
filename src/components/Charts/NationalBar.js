import { HorizontalBar } from 'vue-chartjs'
import db from "../../firebase.js"


export default {
    extends: HorizontalBar,
    
    data: function () {
        return {
            id: this.$route.query.id,
            datacollection: {
                labels: ["You","National Average","Goal"],
                datasets: [{
                    label: "Quantity",
                    backgroundColor: ["#1c4073","#00a5cf","#3CB371"],
                    data: [0, 8416, 3000]
                  }]
            },
            options: {
                legend: { display: false },
                title: {
                  display: true,
                  text: 'Emission chart Relative'
                },
                scales:{
                    xAxes:[{
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
                this.datacollection.datasets[0].data[0] = parseFloat(item.Emissions["total"])
            }).then(()=>this.renderChart(this.datacollection, this.options))
        }
    },
    mounted() {
        this.fetchItem()
    }
}