<template>
    <div class="background">
        <Head v-bind:id="id"></Head>
        <div class="top">
            <p class="content">Your points:{{retrieve()}}</p>
        </div>
        <div class="rewards">
            <div class="outside">
            <div class="inside">
            <div class="pic">
                <img alt="shoplogo" src="this.imagename">
            </div>
            <p class="title">${{this.currentvoucher.price}} {{this.name}} Voucher</p><br><br>
            <p class="title2">{{this.currentvoucher.point}} points</p><br><br>
            <p class="title3">Are you sure you want to exchange this?</p><br><br>
            <button id="btn" v-on:click="proceed()">Yes</button>
            <button id="btn1" v-on:click="backwards()">No</button>

        </div>
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
            imagename:this.$route.query.imagename,
            name:this.$route.query.name,
            currentvoucher:this.$route.query.currentvoucher,
            score:0
        }

    },
    methods:{
        retrieve:function(){
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                this.score=snapshot.data().points
            })
        },
        
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
    .top {
        justify-content: space-between;
        display: flex;
        margin-right: 100px;
        margin-top: -40%;
    }
    .rewards {
        margin-top: 10px;
    }
    .title{
        font-family: Montserrat;
        font-size: 25px;
        text-align: center;
        height: 17%;
        padding: 2%;
        margin:2%
    }
    .title2{
        font-family: Montserrat;
        font-size: 16px;
        text-align: center;
        height: 17%;
        padding: 2%;
        margin:2%
    }
    .outside{
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
        margin-left: 30px;
        margin-right: 30px;
    }
    .inside{
        flex-grow: 1;
        text-align: center;
        padding: 10px;
        margin: 10px;
        border-radius: 20px;
        background-color: #FFFFFF;
        min-height: 60vh;
    }
    .pic {
        height: 45%;
        margin-top:5%;
        margin-bottom: 2%;
    }

</style>
