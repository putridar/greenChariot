<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <img alt="greenChariot" src="../assets/survey.png">
        <div class = "content">
            <p class = "title">Ecommerce Behaviour</p>
            <p class = "txt1">Number of items Bought</p>
            <input class="ins" type="number" placeholder="Estimated per month" min=0 id="numofitem" v-model="numofitem" required><br>
            <p class = "txt1">Predominant Category of Purchases</p>
            <br>
            <input type="checkbox" id="Fashion" value="Fashion" v-model="ecommerce">
            <label for="Fashion">Fashion</label>
            <input type="checkbox" id="Gadgets" value="Gadgets" v-model="ecommerce">
            <label for="Gadgets">Gadgets</label>
            <input type="checkbox" id="Groceries" value="Groceries" v-model="ecommerce">
            <label for="Groceries">Groceries</label>
            <input type="checkbox" id="Food_Delivery" value="Food Delivery" v-model="ecommerce">
            <label for="Food_Delivery">Food Delivery</label>
            <br>
            <span>Checked names: {{ ecommerce | json }}</span>
            <button class = "next" v-on:click="SurveySubmit2()">Next</button>
            <p class = "txt"> Page 3 / 4 </p>
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
            ecommerce: [],
            numofitem:""
        }
    },
    methods: {
        print: function() {
            console.log(this.name);
        },
        SurveySubmit2 : function() {
            db.firestore().collection('users').doc(this.id).update({
                Survey2: {
                    ecommerce: this.ecommerce,
                    amount: this.numofitem
                }
            }).then(() => {
                alert("Submitted 3/4 successfuly");
                this.$router.push({ name: 'Dashboard', query: {id: this.id}})
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
    .ins{
        font-family: Montserrat;
        padding: 5px;
        width: 90%;
        margin: 1%;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%;
    }
    input[type="checkbox"]{
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .ranger {
        -webkit-appearance: none;
        width: 90%;
        height: 25px;
        background: #e4e2e2;
        outline: none;
        opacity: 0.7;
        -webkit-transition: .2s;
        transition: opacity .2s;
        border-radius: 12px;
    }
    .ranger:hover {
        opacity: 1;
    }
    .ranger::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background:#2D8F8A;
        cursor: pointer;
    }
    .food{
        font-family: Montserrat;
        padding: 5px;
        width: 25%;
        margin: 1%;
        margin-right: 5%;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%;
        display: inline-block;
    }
    ::placeholder {
        color: rgb(0, 0, 0);
        opacity: 0.45;
        font-size: 14px;
    }
    .next {
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
    
    
</style>