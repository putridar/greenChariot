<template>
    <div class="background">
        <Head v-bind:id="id"></Head>
        <div class="top">
            <p class="content">Your points: {{this.score}}</p>
        </div>
        <div class="rewards">
            <div class="outside">
            <div class="inside">
            <div class="pic">
                <img alt="shoplogo" v-bind:src="imagename">
            </div>
            <p class="title">{{this.price}} {{this.name}} Voucher</p>
            <p class="title2">{{this.point}} points</p>
        </div>
        <div class="title3">
            <p class="title3">Are you sure you want to exchange this?</p>
        </div>
            <button class="btn" v-on:click="proceed()">Yes</button>
            <button class="btn" v-on:click="backwards()">No</button>
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
            imagename:null,
            name:this.$route.query.name,
            currentvoucher:this.$route.query.currentvoucher,
            price:this.$route.query.price,
            point:this.$route.query.point,
            shopId:this.$route.query.shopId,
            score:0
        }
    },
    methods:{
        fetchItems: function() {
            console.log(this.id)
            db.firestore().collection('shops').doc(this.shopId).get().then(snapshot=>{
                 this.imagename = snapshot.data().imagename
            })
        },
        retrieve:function(){
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                this.score=snapshot.data().points
            })
        },
        
    },
    created(){
        this.retrieve(),
        this.fetchItems()
    },
    mounted(){
        this.fetchItems()
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
        margin-left: 5%;
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
        font-size: 20px;
        text-align: center;
        height: 17%;
        padding: 1%;
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
        height: 35%;
        margin-top:5%;
        margin-bottom: 2%;
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
        margin-left:100px;
    
    }
    .title3{
        font-family: Montserrat;
        font-size: 35px;
        text-align: center;
        padding: 2%;
        margin-left:100px;
        font-weight:bold;
    }
</style>
