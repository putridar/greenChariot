import { Line } from 'vue-chartjs'
import db from '../../firebase.js'

export default {
    extends: Line,
    data: function () {
        return {
            datacollection: {
                labels: [],
                datasets: [{
                    data: [],
                    label: "Customer data",
                    borderColor: ["#165BAA"],
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            },
            custlist: []
        }
    },
    props: {
        id: {
            type: String
        }
    },
  methods: {
    fetchItems: function () {
        db.firestore().collection('shops').doc(this.id).get().then(snapshot => {
            this.custlist = snapshot.data().custlist
            this.getValue(snapshot.data().custlist)
            this.renderChart(this.datacollection, this.options)
        })
    },
    getValue : function(data) {
        var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        for (var [key, value] of Object.entries(data)) {
            this.datacollection.labels.push(day[key])
            this.datacollection.datasets[0].data.push(value.length)
        }
    }
  },
  created () {
    this.fetchItems()
  }
}