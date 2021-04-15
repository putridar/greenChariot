<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <img alt="greenChariot" src="../../assets/survey.png">
            <div class = "content">
                <p class = "title">Food Intake Proportion</p>
                <div class="slider" v-for="option, index in Sliders" :key="index">
                    <p class="txt1">{{name[index]}} %</p>
                    <input class="food" type="number" :value="Math.round(Sliders[index])" @change="changeBox(index, option, $event)">
                    <input class="ranger" type="range" :id="'slider'+index" :min=0 :max=100 v-model.number="Sliders[index]"  @input="changeSlider(index)" step="0.01">
                </div>
                <button class = "next" v-on:click="SurveySubmit2()">Next</button>
                <p class = "txt"> Page 2 / 3 </p>
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
            selectedAnswer:[],
            name:["Vegetables, Rice, Bread, Wheat","Chicken, Fish, White Meat","Beef, Red Meat"],
            Sliders :[33,33,33]
        }
    },
    methods: {
        print: function() {
            console.log(this.name);
        },
        SurveySubmit2 : function() {
            db.firestore().collection('users').doc(this.id).update({
                Survey1: {
                    veg: this.Sliders[0],
                    chick: this.Sliders[1],
                    beef: this.Sliders[2]
                }
            }).then(() => {
                alert("Submitted 2/3 successfuly");
                this.$router.push({ name: 'survey2', query: {id: this.id}})
            })
        },
        changeSlider(slider){
            const sum = this.Sliders.reduce((sum, val) => sum + val, 0);
            const diff = sum - 100;
            let remainder = 0
            let arr=[];
            for(let i in this.Sliders){
                if(i != slider){ //don't modify the slider which is being dragged
                    let val = this.Sliders[i] - diff / (this.Sliders.length - 1)
                    if(val < 0){
                        remainder += val;
                        val = 0;
                    }
                    this.$set(this.Sliders, i, val)
                }
            }
            if(remainder){
                const filteredLength = this.Sliders.filter((val, key) => val > 0 && key != slider).length
                for(let i in this.Sliders){
                    if(i != slider && this.Sliders[i] > 0){
                        this.$set(this.Sliders, i, this.Sliders[i] + remainder / filteredLength)
                    }
                }
            }
            this.$emit('input', this.Sliders)
            //convert to rounded values
            for(let i in this.Sliders){
                arr.push(Math.round(this.Sliders[i]))
                this.selectedAnswer=arr;
            }
        },
        changeBox(slider,value, e){
            if(e.target.value.length>3){
                e.target.value= ""
            }
            if(e.target.value==isNaN || e.target.value > 100 || e.target.value < 0){
                e.target.value= ""
            }else{
                this.Sliders[slider] = Math.round(e.target.value);
                this.changeSlider(slider)
            }
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
    .ranger {
        -webkit-appearance: none;
        width: 90%;
        height: 25px;
        background: #e4e2e2;
        outline: none;
        -webkit-transition: .2s;
        transition: opacity .2s;
        border-radius: 12px;
    }
    .ranger:hover {
        opacity: 1.2;
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
        margin-top: 1%;
        margin-left: 4%;
        margin-right: 20%;
        width: 43%;
        display: inline-block;
    }
    
</style>