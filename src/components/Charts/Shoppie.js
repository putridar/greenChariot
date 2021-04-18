import { Doughnut } from 'vue-chartjs'
import db from "../../firebase.js"


export default {
    extends: Doughnut,
    data: function () {
        return {
            id: this.$route.query.id,
            datacollection: {
                labels: ["Remaining", "Redeemed", "Used"],
                datasets: [{
                    label: "Quantity",
                    backgroundColor: ["#1c4073","#3CB371","#00a5cf"],
                    data: [0, 0, 0]
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Voucher Usage'
                },
                maintainAspectRatio: false,
                legend: {display: true},
                cutoutPercentage: 60,
                
              }
        }
    },
    methods:{
        fetchItems: function(){
            db.firestore().collection('shops').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                var vouchers = item.vouchers
                console.log(vouchers)
                for (var i =0; i<vouchers.length; i++){
                    this.datacollection.datasets[0].data[0] += parseInt(vouchers[i].coupons.length)
                    this.datacollection.datasets[0].data[1] += parseInt(vouchers[i].redeem.length)
                }
                this.datacollection.datasets[0].data[2] += parseInt(item.used.length)
            }).then(()=> this.renderChart(this.datacollection, this.options))
        }
    },
    mounted() {
        this.fetchItems()
    }
}