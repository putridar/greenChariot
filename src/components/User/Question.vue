<template>
    <div class = "bg">
        <Head v-bind:id="id" class="head"></Head>
        <div class = "content">
            <p id = "question"> {{this.selectedQuestions[0].question}}</p><br>
            <br>
            <ul>
                <li v-for='(o, index) in selectedQuestions[0].options' :key='o'>
                    <div id='help'>
                        <button class='mcq' type='button' v-on:click='selected($event)' v-bind:id='index'>
                            {{index+1}}. {{o}}
                        </button>
                    </div>
                </li>
            </ul>
            <button class = "btn" type='button' v-on:click="next()">Check</button>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'

export default {
    name: 'question',
    components :{
        Head
    },
    data() {
        return {
            id: this.$route.query.id,
            chose:100, //index of answer selected
            answer:100, //index of answer
            selectedQuestions:this.$route.query.selectedQuestions,
            score:this.$route.query.score,
            correct:false,
        }
    },
    methods: {
        selected: function(event) {
            this.chose = event.target.getAttribute("id");
            this.answer = this.selectedQuestions[0].correct;
            if (this.chose==this.answer) {
                this.correct=true;
            } else {
                this.correct=false;
            }
        },
        next: function() {
            this.counter+=1
            if (this.chose==100) {
                alert("You have not selected an option!")
            } else if (this.correct==true) {
                this.score+=5
                this.$router.push({name:'ans',query:{id:this.id,score:this.score,selectedQuestions:this.selectedQuestions,chose:this.chose,answer:this.answer,correct:this.correct}})
            } else {
                this.$router.push({name:'ans',query:{id:this.id,score:this.score,selectedQuestions:this.selectedQuestions,chose:this.chose,answer:this.answer,correct:this.correct}})
            }
        },
    },
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