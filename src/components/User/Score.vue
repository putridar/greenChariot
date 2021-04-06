<template>
    <div class="bg">
        <Head v-bind:id="id" class="head"></Head>
        <div class = "item">
            <div class="rewards">
                <img alt="successful" src="../../assets/successful.png">
            </div>
            <div class="content">
                <p class="zoom">Great job!</p>
                <br>
                <p class="title2">You got {{this.score}}/10</p>
                <br>
                <button class="btn" v-on:click="direct()">Try again?</button>
            </div>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'

export default{
    components: {
        Head
    },
    data(){
        return{
            id:this.$route.query.id,
            score:this.$route.query.score,
        }
    },
    methods:{
        direct:function(){
            this.$router.push({name:'quiz',query:{id:this.id}})
        }
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
        min-height: 100vh;
    }
    .head {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
    }
    img {
        float: left;
        width: 40%;
        justify-content: center;
        margin-left: 7%;
        float:left;
        animation: zoomIn ease 1s
    }
    @keyframes zoomIn {
        0% {
            transform: scale(0.2,0.2)
        }
        100% {transform: scale(1,1)}
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        margin: 10px;
        padding:10px
    }
    .zoom {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 64px;
        margin: 10px;
        margin-bottom: 0px;
        margin-top: 150px;
        animation: large ease 1s
    }
    @keyframes large {
        0% {
            transform: scale(0.5,0.5);
        }
        100% {transform: scale(1,1)}
    }
    .rewards {
        margin-top: 10px;
    }
    .content {
        margin-left: 55%;
        margin-right: 55%;
        width: 40%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px;
    }
    .title2 {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 48px;
    }
    .txt {
        font-family: Montserrat;
        font-size: 30px;
        margin-top: 20px;
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
        margin: 25px;
        cursor: pointer;
    }
    .item {
        margin-top: 2%
    }
</style>