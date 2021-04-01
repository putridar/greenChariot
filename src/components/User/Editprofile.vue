<template>
    <div class="background">
        <Head v-bind:id="id"></Head>
        <div class="top">
            <p class="content">Your points:{{this.points}}</p>
        </div>
        <div class="profile">
            <p class="title">Edit profile</p>
            <input type="text" placeholder="Name" v-model='name' required><br>
            <input type="text" placeholder="username" v-model="username" required><br>
            <input type="text" placeholder="email" v-model="email" required><br>
            <button class="btn" v-on:click="confirm()">Confirm</button>
              
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from '../../firebase.js'
export default{
    components:{
        Head
    },
    data(){
        return{
            id:this.$route.query.id,
            points:0,
            name:'',
            username:'',
            email:''
        }
    },
    methods:{
        retrieve:function(){
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                this.points=snapshot.data().points
                this.name=snapshot.data().name
                this.username=snapshot.data().username
                this.email=snapshot.data().email
            })
        }
    },
    created(){
        this.retrieve()
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
    .content{
        font-family: Montserrat;
        font-weight: bold;
        font-size: 35px;
        margin-left: 2%;
    }
    .profile {
        margin-top: 8px;
    }
    .top {
        margin-right: 100px;
        margin-top: -42%;
        margin-bottom: 2%;
        margin-left:-7%;
        display:flex
    }
    .title {
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 44px;
        line-height: 58px;
        text-align: center;
        color: #1C746F;
        margin: 15px;
    }
    .profile {
        background-color: #FFFFFF;
        margin-top: 2%;
        margin-left: 55%;
        margin-right: 10%;
        height: 60%;
        width: 30%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px;
        animation: zoomIn ease 0.7s
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