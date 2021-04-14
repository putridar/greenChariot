<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <div class="content">
                <div class="pie">
                    <PieChart></PieChart>
                </div>
                <div class="pie1">
                    <img class="tree" alt="greenChariotTree" src="../../assets/Tree.jpg">
                    <h1 class="txt"> {{Math.round(totalcarb/19, 2)}} Fully grown Rain Trees</h1>
                    <h1 class="txt"> Required to absorb your emissions </h1>
                </div>
                <div class="pie">
                    <Nationalbar></Nationalbar>
                </div>
            </div>
            <div class="hi">
                <div class="content1">
                    <Comparison></Comparison>
                </div>
                <div class="content2">
                    <Recommendation></Recommendation>
                </div>
                <div class="content3">
                    <Dashboardprofile></Dashboardprofile>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Head from './Header.vue'
import Footer from '../Footer.vue'
import db from "../../firebase.js"
import PieChart from '../Charts/PieChart.vue'
import Nationalbar from '../Charts/NationalBar.vue'
import Comparison from '../Charts/Comparison.vue'
import Recommendation from './Recommendation.vue'
import Dashboardprofile from './Dashboardprofile.vue'

export default {
    name: 'Header',
    components :{
        Head, 
        PieChart, 
        Footer, 
        Nationalbar, 
        Comparison,
        Recommendation, 
        Dashboardprofile
    },
    data() {
        return {
            id: this.$route.query.id,
            totalcarb:0
        }
    },
    methods: {
        print: function() {
            console.log(this.name);
        },
        fetchTotal: function(){
            db.firestore().collection('users').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                this.totalcarb = item.Emissions["total"];
            })
        }
    },
    mounted() {
        this.fetchTotal()
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    @import url('https://fonts.googleapis.com/css?family=Inter');
    .bg {
        background-color: #9AD5FF;
        padding: 0px;
        margin: 0px;
        width: 100%;
        min-height: 120vh;
        font-family: Montserrat;
    }
    .head {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
    }
    img {
        width: 100%;
        margin-left: 0%;
        margin-right:0%;
        margin-top: 2%;
        margin-bottom: 2%;        
    }.content {
        background-color: #FFFFFF;
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        height: auto;
        width: auto;
        border-radius: 8px;
        padding: 10px;
        display: flex;
    }.pie{
        background-color:none;
        margin-left: 2%;
        margin-right: 2%;
        align-items: center;
        border-radius: 8px;
        padding: 0px;
        width: 28%;
    }.pie1{
        background-color: none;
        margin-left: 2%;
        margin-right: 2%;
        align-items: center;
        border-radius: 8px;
        padding: 0px;
        width: 31%;
    }
    .tree{
        animation: floating 5s ease-in-out infinite;

    }
    @keyframes floating {
        0% {	
            transform: translatey(0px);
        }
        50% {
            transform: translatey(8px);
        }
        100% {
            transform: translatey(0px);
        }
    }
    .hi{
        display: flex;
        flex-direction: row;
    }
    .content1 {
        background-color: #FFFFFF;
        margin-top: 1%;
        margin-left: 2%;
        margin-right: 0%;
        height: auto;
        width: 40%;
        border-radius: 8px;
        padding: 10px;        
    }
    .content2 {
        background-color: #FFFFFF;
        margin-top: 1%;
        margin-left: 1%;
        margin-right: 0%;
        height: auto;
        border-radius: 8px;
        padding: 10px;
        flex: 1;
    }
    .content3 {
        background-color: #FFFFFF;
        margin-top: 1%;
        margin-left: 1%;
        margin-right: 2%;
        height: auto;
        border-radius: 8px;
        padding: 10px;
        flex: 1;
    }
    .txt {
        color: #1C746F;
        font-size: 16px;
        margin-left: 4%;
        margin-top: 1%;
        margin-bottom:0% ;
        display: block ;
        text-align: center;
    }
    .txt1 {
        color: #1C746F;
        font-size: 24px;
        margin-left: 2%;
        display: block ;
        text-align: left;
        display: block;
    }
    
</style>