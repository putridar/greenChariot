<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <img alt="greenChariot" src="../../assets/survey.png">
            <div class = "content">
                <p class = "title">Monthly Consumption survey</p>
                <p class="txt6">The survey takes only about 3-5 minutes to complete. It is advised that you complete this survey on a monthly basis to keep yourself updated on your carbon emissions!</p><br>
                <div class ="Consumption1">
                    <p class = "txt2">Monthly Utilities Expenditure</p>
                    <p class="txt4">Do you know that the production of electricity and heat generates the second largest share of greenhouse gas emissions? Find out how you are doing in your monthly utilities on electricity, water and gas!</p><br>
                    <p class = "txt1">Household population:</p>
                    <input type="number" placeholder="Number of people in your house " min=1 value="householdpop" id="householdpop" v-model="householdpop" required><br>
                    <p class = "txt1">Electricity ($)</p>
                    <input type="number" placeholder="Household Electricity bill " min=0 max=1000 id="electricity" v-model="electricity" required><br>
                    <p class = "txt1">Water ($)</p>
                    <input type="number" placeholder="Household Water bill " min=0 max=600 id="water" v-model="water" required><br>
                    <p class = "txt1">Gas ($)</p>
                    <input type="number" placeholder="Household Gas bill " min=0 max=600 id="gas" v-model="gas" required><br>
                </div>
                <div class ="Consumption1">
                    <p class = "txt2">Weekly Transport Duration</p>
                    <p class="txt4"> Do you know that taking public transport, such as the MRT helps to reduce carbon emission significantly, as compared to taking private transport? Find out how you are doing in your mode of transportation!</p><br>
                    <p class = "txt1"> MRT Public Transport (Hours)</p>
                    <input type="number" placeholder="Approx Duration MRT" min=0 max=30 id="mrt" v-model="mrt" required><br>
                    <p class = "txt1"> Bus Public Transport (Hours)</p>
                    <input type="number" placeholder="Approx Duration Bus" min=0 max=30 id="bus" v-model="bus" required><br>
                    <p class = "txt1">Drive or Ride Car (Hours)</p>
                    <input type="number" placeholder="Approx Duration Private Car, Taxi, Grab, Gojek, etc" min=0 max=30 id="car" v-model="car" required><br>
                </div>
                <button class = "create" v-on:click="SurveySubmit1()">Next</button>
                <p class = "txt"> Page 1 / 3 </p>
                <p class = "txt"> Accurate data helps us predict better :) </p>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from "../../firebase.js"
import Footer from '../Footer.vue'
export default {
    name: 'Header',
    components :{
        Head,
        Footer
    },
    data() {
        return {
            id: this.$route.query.id,
            electricity:"",
            water:"",
            gas:"",
            mrt:"",
            bus:"",
            car:"", 
            householdpop:"",
            result:true
        }
    },
    methods: {
        print: function() {
            console.log(this.name);
        },
        SurveySubmit1 : function() {
            if (this.householdpop=='' || this.electricity=='' || this.water=='' || this.mrt=='' || this.bus=='' || this.car=='' || this.gas==''){
               alert("You need to fill in all the inputs!")
               return
            }
            if (this.householdpop<0 || this.electricity<0 || this.water<0 || this.mrt<0 || this.bus<0 || this.car<0 || this.gas<0){
                alert("1 of your input is negative!")
                return
            }
            if (this.electricity>=1000 || this.water>=1000 || this.gas>=1000){
                alert("Your monthly utilities expenditure is too high! Have you made an error in one of your inputs?")
                this.result=false
            }if (this.householdpop>=15){
               alert("Your household population appears to be too large! Have you made an error in your input of household population?")
               this.result=false
            }if (this.car>=100 || this.bus>=100 || this.mrt>=100){
                alert("Your weekly transport duration is too high! Have you made an error in one of your inputs?")
                this.result=false
            }
            if (this.result==false){
                this.result=true
                return
            }
            this.total = Math.round(parseFloat(this.car)*0.118*64.1*4*12 + parseFloat(this.bus)*0.073*20*4*12 + parseFloat(this.mrt)*0.0132*78*4*12 + ((parseFloat(this.gas)/this.householdpop)/0.1933)*0.4085*12 + ((parseFloat(this.electricity)/this.householdpop)/0.2413)*0.4085*12 + ((parseFloat(this.water)/this.householdpop)/0.83)*0.279*12,2)
            db.firestore().collection('users').doc(this.id).update({
                Survey: {
                    electricity: parseInt(this.electricity),
                    water: parseInt(this.water),
                    gas: parseInt(this.gas),
                    mrt: parseInt(this.mrt),
                    bus: parseInt(this.bus),
                    car: parseInt(this.car),
                    house: parseInt(this.householdpop)
                },
                Emissions:{
                    //Aggregate
                    transport: Math.round(parseFloat(this.car)*0.118*64.1*4*12 + parseFloat(this.bus)*0.073*20*4*12 + parseFloat(this.mrt)*0.0132*78*4*12,2),
                    utility: Math.round(((parseFloat(this.gas)/this.householdpop)/0.1933)*0.4085*12 + ((parseFloat(this.electricity)/this.householdpop)/0.2413)*0.4085*12 + ((parseFloat(this.water)/this.householdpop)/0.83)*0.279*12,2),
                    total: this.total,
                    //Breakdown
                    electricity: Math.round(((parseFloat(this.electricity)/this.householdpop)/0.2413)*0.4085*12,2),
                    water: Math.round(((parseFloat(this.water)/this.householdpop)/0.83)*0.279*12,2),
                    gas: Math.round(((parseFloat(this.gas)/this.householdpop)/0.1933)*0.4085*12,2),
                    mrt: Math.round(parseFloat(this.mrt)*0.0132*78*4*12,2),
                    bus: Math.round(parseFloat(this.bus)*0.073*20*4*12,2),
                    car: Math.round(parseFloat(this.car)*0.118*64.1*4*12,2)
                }
            }).then(() => {
                alert("Submitted 1/3 successfully");
                this.$router.push({ name: 'survey1', query: {id: this.id, total: this.total}})
            })
        },
        fetchConsumption: function(){
            db.firestore().collection('users').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                this.electricity=parseInt(item.Survey["electricity"]),
                this.water=parseInt(item.Survey["water"]),
                this.gas=parseInt(item.Survey["gas"]),
                this.mrt=parseInt(item.Survey["mrt"]),
                this.bus=parseInt(item.Survey["bus"]),
                this.car=parseInt(item.Survey["car"]),
                this.householdpop=parseInt(item.Survey["house"])
            })
        }     
    },
    mounted() {
        this.fetchConsumption()
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
        min-height: 240vh;
    }
    .head {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
    }
    img {
        float: left;
        width: 45%;
        justify-content: center;
        margin-left: -40%;
        margin-top: 5%;
        animation: zoomIn 1s
    }
    @keyframes zoomIn {
        from {
            transform: translate3d(0,30px,0);
            opacity: 0
        }

        to {
            transform: translate3d(0,0,0);
            opacity: 1
        }
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 5%;
        margin-left: 45%;
        margin-right: 10%;
        height: 60%;
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px;
        animation: zoomIn 1s;
        margin-bottom: 50px;
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
    input {
        font-family: Montserrat;
        padding: 1%;
        width: 90%;
        margin: 1%;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%
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
        transition-duration: 0.4s;
    }
    .create:hover {
        background: #1C746F;
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
    .txt3 {
        float: right;
        font-family: Montserrat;
        color: #1C746F;
        text-align: left;
        font-size: 16px;
        font-weight: 500;
        margin-top: 1%;
        margin-left: 4%;
    }
    .txt4 {
        font-family: Montserrat;
        color: #1C746F;
        text-align: left;
        font-size: 19px;
        margin-top: 2%;
        margin-bottom: 2%;
        margin-left: 4%;
        font-weight:bold
    }
    .txt5 {
        font-family: Montserrat;
        color: #1C746F;
        text-align: left;
        font-size: 22px;
        margin-top: 2%;
        margin-bottom: 2%;
        margin-left: 4%;
        font-weight:bold
    }
    .txt6 {
        font-family: Montserrat;
        color: #bd2525;
        text-align: left;
        font-size: 25px;
        margin-top: 2%;
        margin-bottom: 2%;
        margin-left: 4%;
        font-weight:bold
    }

    
</style>