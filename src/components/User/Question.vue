<template>
    <div class = "bg">
        <Head v-bind:id="id" class="head"></Head>
        <div class = "content">
            <p id = "question"> {{this.questions[0].question}}</p><br>
            <br>
            <ul>
                <li v-for='(o, index) in questions[0].options' :key='o'>
                    <div id='help'>
                        <button class='mcq' type='button' v-on:click='selected($event)' v-bind:id='index'>
                            {{index+1}}. {{o}}
                        </button>
                    </div>
                </li>
            </ul>
            <button class = "btn" type='button' v-on:click="next()">Next</button>
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
            score:0,
            questions:[], //selected questions
            selectedQuestions:[], //ids of selected qns
            questionIDs:["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15","q16","q17","q18","q19","q20"],
            counter:0,
            chose:10, //index of answer selected
            answer:100, //index of answer
        }
    },
    methods: {
        selected: function(event) {
            this.chose = event.target.getAttribute("id");
            this.answer = this.questions[this.counter].correct;
        },
        next: function() {
            this.counter=this.counter+1
            document.getElementById('question').innerHTML = this.questions[this.counter].question

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
    .mcq:hover {
        background-color:rgb(255, 255, 179);
    }
    .mcq:focus {
        background-color:rgb(255, 255, 179);
    }
    .mcq{
        font-family: Montserrat;
        font-style: normal;
        background-color: #FFFFFF;
        padding:15px;
        border-radius:15px;
        border-width:1px;
        display:flex;
        font-size:25px;
        width:100%;
        cursor: pointer;
    }
    .head {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
    }  
    li{
        list-style-type:none;
        padding:5px;
        margin-left: 40px;
        margin-right:40px;
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