<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <div class="content">
                <div class="pie">
                    <PieChart></PieChart>
                </div>
                <img alt="greenChariot" src="../../assets/shop.png">
            </div>
            <div class="content1">
                <p>hi</p>
            </div>
            <div class="content2">
                <p>hi</p>
            </div>
            <div class="content3">
                <p>hi</p>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Head from './Header.vue'
import PieChart from '../Charts/PieChart.vue'
import Footer from '../Footer.vue'

export default {
    name: 'Header',
    components :{
        Head, PieChart, Footer
    },
    data() {
        return {
            id: this.$route.query.id,
        }
    },
    methods: {
        print: function() {
            console.log(this.name);
        }
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
        width: 30%;
        justify-content: center;
        margin-left: 30%;
        margin-top: 2%;
        flex: 10%;        
    }.pie{
        background-color: none;
        margin-left: 2%;
        margin-right: 2%;
        width: 25%;
        align-items: center;
        border-radius: 8px;
        padding: 10px;
        flex: 30%;
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        height: auto;
        width: 95%;
        border-radius: 8px;
        padding: 10px;
        display: flex;
    }
    .content1 {
        background-color: #FFFFFF;
        margin-top: 1%;
        margin-left: 2%;
        margin-right: 0%;
        height: 270px;
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
        height: 270px;
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
        height: 270px;
        width: 20.4%;
        border-radius: 8px;
        padding: 10px;
        display: inline-flex;
    }
    
</style>