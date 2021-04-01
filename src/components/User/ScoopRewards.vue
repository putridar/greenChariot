<template>
 <div class="background">
    <Head v-bind:id="id"></Head>
    <div class="top">
        <p class="content">Your points: {{this.score}}</p>
    </div>
    <div class="rewards">
        <ul>
        <li v-for="(item,index) in vouchers" :key="index">
            <div class="pic">
                <img alt = "shoplogo" v-bind:src="imagename">
            </div>
            <p class="title">${{item.price}} {{name}} Voucher</p>
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
            vouchers:[],
            price:'',
            point:'',
            imagename: null,
            shopId: this.$route.query.shopId,
            score:0
        }
     },
    methods:{
        fetchItems: function() {
            console.log(this.id)
            db.firestore().collection('shops').doc(this.shopId).get().then(snapshot=>{
                 this.imagename = snapshot.data().imagename
                 this.vouchers = snapshot.data().vouchers
            })
        },
        retrieve:function(){
            db.firestore().collection('users').doc(this.id).get().then(snapshot=>{
                 this.score=snapshot.data().points      
            })
        
     },
        onclick:function(item){
            if (item.point>this.score){
                alert("Insufficient points to exchange for voucher")
            }
            else{
                this.price=item.price
                this.point=item.point
                this.$router.push({name:"voucherverify",query:{id:this.id,shopId:this.shopId,name:this.name,voucher:item}})
            }
        }  
    },
    created(){
        this.retrieve()
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
        margin:2%;
        margin-top:5%
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
        flex-shrink: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        margin: 10px;
        border-radius: 20px;
        background-color: #FFFFFF;
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
        width:50%;
        margin-bottom:2%
    }
</style>
