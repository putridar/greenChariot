<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <div class="content">
                <div class="pie">
                    <PieChart></PieChart>
                </div>
                <div class="pie">
                    <img alt="greenChariot" src="../../assets/Tree.jpg">
                    <h1 class="txt"> {{Math.round(totalcarb/1.9, 2)}} Rain Trees</h1>
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
                    <p>hi</p>
                </div>
                <div class="content3">
                    <h1 class="txt1" >Hi there {{name}}! </h1>
                    <h1 class="txt1" >Points: {{points}} </h1>
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


export default {
    name: 'Header',
    components :{
        Head, PieChart, Footer, Nationalbar, Comparison
    },
    data() {
        return {
            id: this.$route.query.id,
            name:"",
            points:0,
            totalcarb:0
        }
    },
    methods: {
        print: function() {
            console.log(this.name);
        },
        fetchName: function(){
            db.firestore().collection('users').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                const nam = item.name;
                this.name = nam.charAt(0).toUpperCase() + nam.slice(1);
                this.points = item.points;
                this.totalcarb = item.total;
            })
        }
    },
    mounted() {
        this.fetchName()
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
    }.pie{
        background-color: none;
        margin-left: 2%;
        margin-right: 2%;
        width: 24%;
        align-items: center;
        border-radius: 8px;
        padding: 0px;
        flex: 33%;
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        height: auto;
        width: auto;
        border-radius: 8px;
        padding: 10px;
        display: flex;
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
        display: inline-flex;
    }
    .content2 {
        background-color: #FFFFFF;
        margin-top: 1%;
        margin-left: 1%;
        margin-right: 0%;
        height: auto;
        width: 30%;
        border-radius: 8px;
        padding: 10px;
        display: inline-flex;
    }
    .content3 {
        background-color: #FFFFFF;
        margin-top: 1%;
        margin-left: 1%;
        margin-right: 0%;
        height: auto;
        width: 20%;
        border-radius: 8px;
        padding: 10px;
        display: inline-flex;
    }
    .txt {
        color: #1C746F;
        font-size: 16px;
        margin-left: 4%;
        display: block ;
        text-align: center;
    }
    .txt1 {
        color: #1C746F;
        font-size: 16px;
        margin-left: 2%;
        display: block ;
        text-align: center;
        display: block;
    }
    
</style>