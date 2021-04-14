import { Pie } from 'vue-chartjs'
import db from "../../firebase.js"


export default {
    extends: Pie,
    data: function () {
        return {
            id: this.$route.query.id,
            datacollection: {
                labels: ["Redeemed", "Used" ],
                datasets: [{
                    label: "Quantity",
                    backgroundColor: ["#17519c", "#80b2f2"],
                    data: [0, 0]
                }]
            },
            options: {
                legend: { display: true },
                responsive: true,
                maintainAspectRatio: false,
                pieceLabel: {
                    render: 'percentage',
                    precision: 1
                }
            }
        }
    },
    methods:{
        fetchItems: function(){
            db.firestore().collection('shops').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                this.datacollection.datasets[0].data[0] = parseFloat(item.exchanged == undefined ? 0 : item.exchanged.length)
                this.datacollection.datasets[0].data[1] = parseFloat(item.used == undefined ? 0 : item.used.length)
            }).then(()=>this.renderChart(this.datacollection, this.options))
        }    
    },
    mounted() {
        this.fetchItems()
    }
}