<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <div class = "content">
            <p id = "question"> {{this.questions[0].question}}</p><br>
            <ul>
                <li v-for='o in questions[0].options' :key='o'>
                    <label for='q'>
                        <input type="radio" value="help" id="q" name="optionsss">
                        {{o}}
                    </label>
                </li>
            </ul>
            <button class = "btn" v-on:click="this.next()">Next</button>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from "../../firebase.js"

export default {
    name: 'question',
    components :{
        Head
    },
    data() {
        return {
            id: this.$route.query.id,
            score:this.$route.query.score,
            questions:[],
            selectedQuestions:[], //ids of selected qns
            questionIDs:["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15","q16","q17","q18","q19","q20"],
            counter:0
        }
    },
    methods: {
        next: function() {
            this.counter=this.counter+1
            document.getElementById("question").innerHTML = this.questions[this.counter].question

        },
        toScore: function() {
            this.$router.push({name:'score',query:{id:this.id,score:this.score}})
        },
        select: function() {
            while (this.selectedQuestions.length<10) {
                var randomIndex=Math.floor(Math.random()*20);
                var chosen=this.questionIDs[randomIndex]
                if (this.selectedQuestions.includes(chosen)!=true) {
                    this.selectedQuestions.push(chosen)
                }
            }
        },
        getQuestion: function() {
            this.select();
            for (var i=0;i<this.selectedQuestions.length;i++) {
                var id=this.selectedQuestions[i]
                db.firestore().collection('questions').doc(id).get().then(snapshot => {
                    this.questions.push(snapshot.data())
                })
            }
        }
    },
    created() {
        this.getQuestion()
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    .bg {
        background-color: #9AD5FF;
        padding: 0px;
        margin: 0px;
        width: 100%;
        min-height: 120vh;
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
    label {
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        border: 1px solid black;
        border-radius:20px;
        text-align:left;
        font-family: Montserrat;
        font-size: 22px;
        width: 100%;
        height:100%;
    }
    label::selection{
        background-color: rgb(242, 255, 212);
    }   
    li{
        list-style-type:none;
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 1%;
        margin-left: 10%;
        margin-right: 10%;
        margin-top:5%;
        height: 60%;
        width: 80%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px
    }
    #question {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        margin: 10px;
        padding:10px;
        float:left
    }
    #q {
        font-family: Montserrat;
        padding: 8px;
        width: 80%;
        margin: 2%;
        margin-left:8%;
        margin-right:8%;
        font-size: 20px;
        border-radius: 8px;
        border: 10px solid black;
        display: flex;
        align-items: center;
    }
    .btn {
        background: #2D8F8A;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
        width: 30%;
        height: 50px;
        margin: 20px;
        cursor: pointer;
    }
</style>