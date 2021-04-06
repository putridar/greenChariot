<template>
 <div class="bg">
    <Head v-bind:id="id" class="head"></Head>
    <div class="top">
        <p class="content">Your points: {{this.score}}</p>
    </div>
    <div class="rewards">
        <div v-if="this.vouchers.length == 0">
            <p class ="title"> There are currently no vouchers </p>
        </div> 
        <ul>
        <li v-for="(item,index) in vouchers" :key="index">
            <div class="pic">
                <img alt = "shoplogo" v-bind:src="item.image">
            </div>
            <p class="title">{{item.name}} ${{item.price}} {{name}} Voucher</p>
            <p class="title2">{{item.point}} points </p>
            <button class="btn" v-on:click="onclick(item.id,item.name,item)"> Redeem </button>
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
            score:0,
            currvoucher:[]
        }
     },
    methods:{
        fetchvoucher:function(){
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                this.currvoucher=snapshot.data().currvoucher
            })
        },
        fetchItems: function() {
            db.firestore().collection('shops').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    var name = doc.data().name
                    var item = doc.data().vouchers
                    var pic = doc.data().imagename
                    if (item !== undefined) {
                        item.forEach(v => this.vouchers.push({
                            price: v.price,
                            point: v.point,
                            image: pic,
                            name: name,
                            id: doc.id              
                        }))
                    }
                });
            }).catch(error => {console.log(error)
                alert(error)})
        },
        retrieve:function(){
            db.firestore().collection('users').doc(this.id).get().then(snapshot=>{
                 this.score=snapshot.data().points      
            })
        
     },
        onclick:function(id, name, item){
            for (var x of this.currvoucher){
                if (item.price==x.price && item.point==x.point && item.name==x.name){
                    alert("You already have this voucher in your possession!")
                    return
                }
            }
            if (item.point>this.score){
                alert("Insufficient points to exchange for voucher")
            }else{
                this.price=item.price
                this.point=item.point
                this.$router.push({name:"rewardpage",query:{id:this.id,shopId:id,name:name,voucher:item}})
            }
        }  
    },
    created(){
        this.retrieve(),
        this.fetchvoucher()
    },
    mounted() {
        this.fetchItems()
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
    .head {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
    }
    .top {
        justify-content: space-between;
        display: flex;
        margin-right: 100px;
        margin-top: 2%;
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
        margin-top:7%
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
        margin-left: 5%;
        margin-right: 5%;
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
