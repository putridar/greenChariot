<template>
    <div class="background">
        <Head v-bind:id="id"></Head>
        <div class="top">
            <p class="content">Your points: {{this.points}}</p>
        </div>
        <div class="rewards">
            <div class="pic">
            <img alt="successful" src="../../assets/successful.png">
        </div>
        <div class="text">
            <p class="title">Hooray!</p><br><br>
            <p class="title2">You get 500 points!</p><br><br><br>
            <button class="btn" v-on:click="direct()">Rewards</button>
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
            imagename:this.$route.query.imagename,
            name:this.$route.query.name,
            points:this.$route.query.points,
         }
    },
    methods:{
        direct:function(){
            this.$router.push({name:'scooprewards',query:{id:this.id,imagename:this.imagename,name:this.name}})
         }
    },
    created() {
        this.updatepoints()
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    .background {
        background-color: #9AD5FF;
        padding: 0px;
        margin: 0px;
        width: 100%;
        min-height: 100vh;
    }
    .pic {
        height: 45%;
        margin-top:5%;
        margin-bottom: 2%;
        float:left
    }
    .top {
        justify-content: space-between;
        display: flex;
        margin-right: 100px;
        margin-top: -40%;
    }
    .rewards {
        margin-top: 10px;
    }
    .content {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 35px;
        margin-left: 5%;
    }
    .text{
        float:right;
    }
    .title {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 45px;
        margin-left: 5%;
    }
    .title2 {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 35px;
        margin-left: 5%;
    }
    .btn {
        background: #2D8F8A;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        width: 37%;
        height: 50px;
        text-align: center;
        cursor: pointer;
    
    }
</style>