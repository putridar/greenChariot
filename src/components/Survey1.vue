<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <img alt="greenChariot" src="../assets/survey.png">
        <div class = "content">
            <p class = "title">Monthly Consumption survey</p>
            <div class ="Consumption1">
                <p class = "txt2">Food Proportion</p>
                <p class = "txt1">Vegetable, Rice, Wheat, Bread</p>
                <input type="number" placeholder="Percentage Proportion" min=0 id="veg" v-model="veg" required><br>
                <p class = "txt1">Chicken, Fish, white meat</p>
                <input type="number" placeholder="Percentage Proportion " min=0 id="chick" v-model="chick" required><br>
                <p class = "txt1">Beef, Red Meat</p>
                <input type="number" placeholder="Percentage Proportion " min=0 id="beef" v-model="beef" required><br>
            </div>
            <button class = "create" v-on:click="SurveySubmit2()">Next</button>
            <p class = "txt"> Page 2 / 4 </p>
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
            veg:"",
            chick:"",
            beef:""
        }
    },
    methods: {
        print: function() {
            console.log(this.name);
        },
        SurveySubmit1 : function() {
            db.firestore().collection('users').doc(this.id).update({
                Survey: {
                    veg: this.veg,
                    chick: this.chick,
                    beef:this.beef
                }
            }).then(() => {
                alert("Submitted 2/4 successfuly");
                this.$router.push({ name: 'socialmediachallenge', query: {id: this.id}})
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
    .greenlogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 64px;
        line-height: 103px;
        color: #1C746F;
        text-align: left;
        margin: 50px;
        display: inline;
        margin-right: 0px;
    }
    .whitelogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 64px;
        line-height: 103px;
        color: #FFFFFF;
        text-align: left;
        margin: 50px;
        display: inline;
        margin-left: 0px;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }
    li {
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        margin: 10px;
        color: #1C746F;
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
        margin-top: 4%;
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