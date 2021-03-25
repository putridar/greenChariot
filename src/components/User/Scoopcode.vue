<template>
    <div class="background">
        <Head v-bind:id="id"></Head>
        <div class="content">
            <div class="pic">
                <img alt="scoop" src="../../assets/wholefoods.png">
               </div>
            <p class="title">Insert this code stated to get points!</p><br>
            <input type="text" placeholder="Code" v-model="code" required><br>
            <button class="btn" v-on:click="direct()">OK</button>
        </div>
    </div>
</template>
<script>
import Head from './Header.vue'
export default{
    components:{
        Head
    },
    data(){
        return{
            id:this.$route.query.id
        }
    },
    methods:{
        direct:function(){
        this.$router.push({name:'scooprewards',query:{id:this.id}})
        }
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
    .content {
        background-color: #FFFFFF;
        margin-top: -37%;
        margin-left: 37%;
        margin-right: 10%;
        height: 60%;
        width: 30%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px;
        animation: zoomIn ease 0.5s
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        margin: 10px;
        padding:10px
    }
    .pic {
        height: 45%;
        margin-top:5%;
        margin-bottom: 2%
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
        width: 50%;
        height: 50px;
        text-align: center;
        margin: 2%;
        cursor: pointer;
    }
    input {
        font-family: Montserrat;
        padding: 8px;
        width: 80%;
        margin: 3%;
        font-size: 22px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%
    }
</style>