<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <img alt="greenChariot" src="../../assets/survey.png">
            <div class = "content">
                <p class = "title">Monthly Ecommerce Behaviour</p>
                <p class = "txt1">Number of items Bought</p>
                <input class="ins" type="number" placeholder="Estimated per month" min=0 value="numofitem" id="numofitem" v-model="numofitem" required><br>
                <p class = "txt1">Predominant Category of Purchases (Optional)</p>
                <br>
                <div class = "ck">
                <input type="checkbox" id="Fashion" value="Fashion" v-model="ecommerce">
                <label for="Fashion">Fashion</label>
                <input type="checkbox" id="Gadgets" value="Gadgets" v-model="ecommerce">
                <label for="Gadgets">Gadgets</label>
                <input type="checkbox" id="Gym" value="Gym" v-model="ecommerce">
                <label for="Gym">Gym/Health</label>
                <input type="checkbox" id="Food_Delivery" value="Food Delivery" v-model="ecommerce">
                <label for="Food_Delivery">Food Delivery</label>
                </div>
                <button class = "next" v-on:click="SurveySubmit2()">Next</button>
                <p class = "txt"> Page 3 / 3 </p>
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
                alert("Submitted 3/3 successfuly");
                this.$router.push({ name: 'Dashboard', query: {id: this.id}})
            })
        },
        fetchConsumption: function(){
            db.firestore().collection('users').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                this.numofitem=item.Survey2["amount"],
                this.ecommerce=item.Survey2["ecommerce"]
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
        min-height: 110vh;
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
        animation: zoomIn 1s
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
        -webkit-appearance: none;
        background-color: #fafafa;
        border: 1px solid #cacece;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
        padding: 9px;
        border-radius: 3px;
        display: inline-block;
        cursor: pointer;
        height:20px;
        width: 12px
    }
    input[type="checkbox"]:active, input[type="checkbox"]:checked:active {
        box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
        height:20px;
    }
    input[type="checkbox"]:checked {
        background-color:#2D8F8A;
        border: 1px solid #ffffff;
        box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
        color: #99a1a7;
        height:20px;
    }
    input[type="checkbox"]:checked:after {
        content: '\2714';
        font-size: 11px;
        color: #ffffff;
        position:relative;
        margin-top:-2px;
        margin-left:-5px;
        display: flex;
        top:-5px;
    }
    .ck {
        height:30px;
    }
    label{
        font-family: Montserrat;
        margin: 3%;
        color: #1C746F;
        font-weight: 600;
        height:30px;
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
        margin-top: 5%;
        cursor: pointer;
        transition-duration: 0.4s;
    }
    .next:hover {
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
        margin-top: 2%;
        margin-bottom: 1.5%;
        margin-left: 4%;
    }
</style>