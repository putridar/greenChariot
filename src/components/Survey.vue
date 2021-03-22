<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <img alt="greenChariot" src="../assets/survey.png">
        <div class = "content">
            <p class = "title">Monthly Consumption survey</p>
            <div class ="Consumption1">
                <p class = "txt2">Utilities Expenditure ($)</p>
                <p class = "txt1">Electricity</p>
                <input type="number" placeholder="Prorated Household Electricity bill " min=0 id="electricity" v-model="electricity" required><br>
                <p class = "txt1">Water</p>
                <input type="number" placeholder="Prorated Household Water bill " min=0 id="water" v-model="water" required><br>
                <p class = "txt1">Gas</p>
                <input type="number" placeholder="Prorated Household Gas bill " min=0 id="gas" v-model="gas" required><br>
            </div>
            <div class ="Consumption1">
                <p class = "txt2">Transport Duration (Hours)</p>
                <p class = "txt1"> MRT Public Transport</p>
                <input type="number" placeholder="Approx Duration MRT" min=0 id="mrt" v-model="mrt" required><br>
                <p class = "txt1"> Bus Public Transport</p>
                <input type="number" placeholder="Approx Duration Bus" min=0 id="bus" v-model="bus" required><br>
                <p class = "txt1">Drive or Ride Car</p>
                <input type="number" placeholder="Approx Duration Private Car, Taxi, Grab, Gojek, etc" min=0 id="car" v-model="car" required><br>
            </div>
            <button class = "create" v-on:click="SurveySubmit1()">Next</button>
            <p class = "txt"> Page 1 / 4 </p>
            <p class = "txt"> Accurate data helps us predict better :) </p>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from "../firebase.js"
export default {
    name: 'Header',
    components :{
        Head
    },
    data() {
        return {
            id: this.$route.query.id,
            electricity:"",
            water:"",
            gas:"",
            mrt:"",
            bus:"",
            car:""

        }
    },
    methods: {
        print: function() {
            console.log(this.name);
        },
        SurveySubmit1 : function() {
            db.firestore().collection('users').doc(this.id).update({
                Survey: {
                    electricity: this.electricity,
                    water: this.water,
                    gas: this.gas,
                    mrt: this.mrt,
                    bus: this.bus,
                    car: this.car
                }
            }).then(() => {
                alert("Submitted 1/4 successfully");
                this.$router.push({ name: 'survey1', query: {id: this.id}})
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
        min-height: 100vh;
    }
    img {
        float: left;
        width: 45%;
        justify-content: center;
        margin-left: -40%;
        margin-top: 5%;
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
    .Consumption1{
        width: 90%;
        border: 2px #1C746F;
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
    .signup {
        background: #2D8F8A;
        border-radius: 8px;
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        float: left;
        height: 70px;
        padding: 15px;
        border: #2D8F8A;
    }
    input {
        font-family: Montserrat;
        padding: 5px;
        width: 90%;
        margin: 1%;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%
    }
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: rgb(0, 0, 0);
        opacity: 0.45;
        font-size: 14px;
    }
    .create {
        background: #2D8F8A;
        border-radius: 8px;
        border: #2D8F8A;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 44px;
        text-align: center;
        color: #FFFFFF;
        width: 80%;
        height: 60px;
        margin: 3%;
        cursor: pointer;
    }
    .txt {
        font-family: Montserrat;
        color: #1C746F;
        text-align: center;
        font-size: 16px;
        margin: 5px;

    }
    .txt1 {
        font-family: Montserrat;
        color: #1C746F;
        text-align: left;
        font-size: 16px;
        font-weight: 500;
        margin-top: 1%;
        margin-left: 4%;
    }
    .txt2 {
        font-family: Montserrat;
        color: #1C746F;
        text-align: left;
        font-size: 22px;
        margin-top: 4%;
        margin-bottom: 2%;
        margin-left: 4%;
        font-weight: bold;
    }
    
</style>