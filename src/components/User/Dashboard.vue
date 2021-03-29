<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <div class="piechart" >
            <div class="col">
                <PieChart class="piechart"></PieChart>
            </div>
            <div class="col" >
                <p class="txt">Highest emission is Food </p>
            </div>
        </div>
        <div class = "content">
            <p class = "title">Dashboard</p>
            <p class = "txt"> Page 3 / 4 </p>
            <p class = "txt"> Accurate data helps us predict better :) </p>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from "../../firebase.js"
import PieChart from '../Charts/PieChart.vue'


export default {
    name: 'Header',
    components :{
        Head, PieChart
    },
    data() {
        return {
            id: this.$route.query.id,
            ecommerce: [],
            amount:""
        }
    },
    methods: {
        print: function() {
            console.log(this.name);
        },
        SurveySubmit2 : function() {
            db.firestore().collection('users').doc(this.id).update({
                Survey2: {
                    ecommerce: this.ecommerce
                }
            }).then(() => {
                alert("Submitted 2/4 successfuly");
                this.$router.push({ name: 'survey2', query: {id: this.id}})
            })
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
        min-height: 110vh;
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 7%;
        margin-left: 45%;
        margin-right: 10%;
        height: 60%;
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px
    }
    .title {
        font-family: Inter;
        font-style: normal;
        font-weight: 1000;
        font-size: 30px;
        line-height: 58px;
        text-align: center;
        color: #1C746F;
        margin: 0px;
    }
    .txt {
        font-family: Montserrat;
        color: #1C746F;
        text-align: center;
        font-size: 16px;
        margin: 5px;
    }
    .piechart {
        background-color: #FFFFFF;
        display: flex;
        margin-top: 2%;
        margin-left: 2%;
        margin-right: 2%;
        height: 100%;
        width: 45%;
        align-items: center;
        border-radius: 8px;
        padding: 10px
    }
    .col {
        flex: 50%;
        padding: 10px;
        height: auto; 
        align-items: center;
    }

</style>