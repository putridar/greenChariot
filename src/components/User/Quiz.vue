<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <img class = "image" alt="socialmedia" src="../../assets/quiz.png">
            <div class = "content">
                <p class = "title"> Are you ready for the Quiz? </p><br>
                <button class = "btn" v-on:click="toQuestion()">Start</button>
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
    name: 'quiz',
    components :{
        Head,
        Footer
    },
    data() {
        return {
            id: this.$route.query.id,
            selectedQuestions:[], //selected questions
            selectedQuestionsIDs:[], //ids of selected qns
            questionIDs:["q1","q2","q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15","q16","q17","q18","q19","q20"],
            score:0,
            qns:[],
            counter: 0
        }
    },
    methods: {
        toQuestion:function() {
            this.$router.push({name:'question',query:{id:this.id,selectedQuestions:this.selectedQuestions}})
        },
        getQuestion: function() {
            db.firestore().collection('questions').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    var qn = [doc.id, doc.data()]
                    this.qns.push(qn)
                });
            }).then(()=> {
                this.select();
            })
        },
        putqns: function(select) {
            for (var i=0;i<select.length;i++) {
                var id=select[i]
                var curr = this.qns.filter(i => i[0] == id)
                this.selectedQuestions.push(curr[0][1])
            }
        },
        select: function() {
            var select = []
            while (select.length<10) {
                var randomIndex=Math.floor(Math.random()*20);
                var chosen=this.questionIDs[randomIndex]
                if (select.includes(chosen)!=true) {
                    select.push(chosen)
                }
            }
            this.putqns(select)
        },       
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
        min-height: 100vh;
    }
    .head {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
    }
    .image {
        float: left;
        width: 40%;
        justify-content: center;
        margin-left: -30%;
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
        margin-top: 11%;
        margin-left: 55%;
        margin-right: 10%;
        width: 35%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px;
        animation: zoomIn 1s
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        margin: 10px;
        padding:10px
    }
    input {
        font-family: Montserrat;
        padding: 8px;
        width: 80%;
        margin: 2%;
        margin-left:8%;
        margin-right:8%;
        font-size: 20px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%;
        display: flex;
        align-items: center;
    }
    label {
        font-family: Montserrat;
        font-size: 22px;
        display: flex;
        align-items: center;
        margin: 1%;
        margin-left:8%;
        margin-right:8%;
        width: 80%;
        padding: 8px;

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