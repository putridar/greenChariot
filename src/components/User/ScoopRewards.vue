<template>
 <div class="background">
    <Head v-bind:id="id"></Head>
    <div class="top">
        <p class="content">Your points:{{retrieve()}}</p>
    </div>
    <div class="rewards">
        <ul>
        <li v-for="(item,index) in vouchers" :key="index">
            <div class="pic">
                <img alt = "shoplogo" v-bind:src="imagename">
            </div>
            <p class="title">{{item.price}} {{name}} Voucher</p>
            <p class="title2">{{item.point}} points </p>
            <button class="btn" v-on:click="onclick(item,index)"> Redeem </button>
        </li>
    </ul>
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
            name:this.$route.query.name,
            vouchers:[{price:"$5",point:500},{price:"$10",point:1000},{price:"$15",point:2000}],
            currentvoucher:[],
            imagename: null,
            shopId: this.$route.query.shopId
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
            db.firestore().collection('users').doc(this.id).get().then(snapshot=>{
                 return snapshot.data().points      
            })
        
     },
        onclick:function(item,index){
            if (item.point>this.retrieve()){
                alert("Insufficient points to exchange for voucher")
            }
            else{
            db.firestore().collection('users').doc(this.id).update({
                points:this.retrieve()-item.point,
                }).then(() => {
                    this.currentvoucher.push(item)
                    this.vouchers.splice(index,1)
                })
            }
        }  
    },
    mounted() {
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
        padding: 2%;
        margin:2%
    }
    .title2{
        font-family: Montserrat;
        font-size: 16px;
        text-align: center;
        padding: 2%;
        margin:2%
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
        margin-left: 30px;
        margin-right: 30px;
    }
    li {
        flex-grow: 1;
        flex-basis: 300px;
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
    .content {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 35px;
        margin-left: 5%;
    }
    .text{
        float:right
    }
    img {
        width:40%
    }
</style>
