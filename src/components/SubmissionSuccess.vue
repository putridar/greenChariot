<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <img class = "image" alt="socialmedia" src="../assets/successful.png">
        <div class = "content">
            <p class = "zoom">
                Horray!
            </p>
            <p class = "item"> 
                Your have successfuly submitted our social media challenge!<br><br>
                Your points: {{points}}<br>
            </p>
            <button class = "btn" v-on:click ="back()">Back</button>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'

export default {
    name: 'Submission',
    components :{
        Head
    },
    data() {
        return {
            id: this.$route.query.id,
            points: this.$route.query.points,
        }
    },
    methods: {
        back: function() {
            this.$router.push({ name: 'socialmediachallenge', query: {id: this.id}})
        },
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
    .image {
        float: left;
        width: 40%;
        justify-content: center;
        margin-left: -23%;
        margin-top: 2%;
        animation: zoomIn ease 1s
    }
    @keyframes zoomIn {
        0% {
            transform: scale(0.2,0.2)
        }
        100% {transform: scale(1,1)}
    }
    .content {
        margin-top: 7%;
        margin-left: 55%;
        margin-right: 10%;
        min-height: 70vh;
        width: 40%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px;
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        margin: 10px;
        padding:10px
    }
    .item {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        margin: 10px;
        margin-top: 20px;
        padding:20px;
    }
    .zoom {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 64px;
        margin: 10px;
        margin-bottom: 0px;
        margin-top: 20px;
        animation: large ease 1s
    }
    @keyframes large {
        0% {
            transform: scale(0.5,0.5);
        }
        100% {transform: scale(1,1)}
    }
    input {
        font-family: Montserrat;
        padding: 8px;
        width: 80%;
        margin: 8px;
        margin-left:8%;
        margin-right:8%;
        font-size: 24px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%;
        display: flex;
        align-items: center;
    }
    select {
        font-family: Montserrat;
        padding: 8px;
        width: 80%;
        margin: 8px;
        margin-left:8%;
        margin-right:8%;
        font-size: 24px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%;
        display: flex;
        align-items: center;
    }
    label {
        font-family: Montserrat;
        font-size: 24px;
        display: flex;
        align-items: center;
        margin: 8px;
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