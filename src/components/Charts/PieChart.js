import { Pie } from 'vue-chartjs'
import db from "../../firebase.js"


export default {
    extends: Pie,
    data: function () {
        return {
            id: this.$route.query.id,
            datacollection: {
                labels: ["bus", "car", "electricity", "gas", "mrt", "water" ],
                datasets: [{
                    label: "Quantity",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#28DAE2"],
                    data: [0, 0, 0, 0, 0, 0]
                }]
            },
            options: {
                legend: { display: true },
                title: {
                    display: true,
                    text: 'Emmission Orders Aggregate'
                },
                responsive: true,
                maintainAspectRatio: true,
                pieceLabel: {
                    render: 'percentage',
                    precision: 1
                }
            }
        }
    },
    methods:{
        fetchItems: function(){
            db.firestore().collection('users').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                this.datacollection.datasets[0].data[0] = parseFloat(item.Survey["bus"])*4*12
                this.datacollection.datasets[0].data[1] = parseFloat(item.Survey["car"])*4*30
                this.datacollection.datasets[0].data[2] = parseFloat(item.Survey["electricity"])*18
                this.datacollection.datasets[0].data[3] = parseFloat(item.Survey["gas"])*20
                this.datacollection.datasets[0].data[4] = parseFloat(item.Survey["mrt"])*4*9
                this.datacollection.datasets[0].data[5] = parseFloat(item.Survey["water"])*21
            }).then(()=>this.renderChart(this.datacollection, this.options))
        }    
    },
    mounted() {
        this.fetchItems()
    }
}