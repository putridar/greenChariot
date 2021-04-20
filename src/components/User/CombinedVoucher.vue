<template>
    <div>
        <div class="bg">
            <Head v-bind:id="id" class="head"></Head>
            <div class="top">
                <p class="content">Your points: {{this.score}}</p>
                <button class = "btn2" v-on:click="reward()"> Your Rewards </button>
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
                    <div class="title">{{item.name}} ${{item.price}} {{name}} Voucher</div>
                    <div class="title2">{{item.point}} points </div>
                    <p class="txt2"><button class="btn" v-on:click="onclick(item.id,item.name,item.image,item)"> Redeem </button></p>
                </li>
            </ul>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Head from './Header.vue'
import db from '../../firebase.js'
import Footer from '../Footer.vue'
export default{
     components:{
        Head,
        Footer
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
                var item = snapshot.data()
                this.currvoucher= item.currvoucher == undefined ? [] : item.currvoucher
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
                            couponID: v.id,
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
        onclick:function(id, name, image,item){
            console.log(this.currvoucher)
            for (var x of this.currvoucher){
                if (item.couponID==x.id && item.point==x.point && item.shopId==x.shopId){
                    alert("You already have this voucher in your possession!")
                    return
                }
            }
            if (item.point>this.score){
                alert("Insufficient points to exchange for voucher")
            }else{
                this.price=item.price
                this.point=item.point
                item.imagename=image
                this.currvoucher.push(item)
                this.$router.push({name:"voucherverify",query:{id:this.id,shopId:id,name:name,voucher:item,combined:true}})
                
            }
        },
        reward: function() {
            this.$router.push({name:"rewardpage",query:{id:this.id}})
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
        margin-top: 1%;
    }
    .title{
        font-family: Montserrat;
        font-size: 25px;
        text-align: center;
        padding: 2%;
        margin:2%;
        margin-top:4%
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
        justify-content:center
    }
    li {
        display:flex;
        flex-direction:column;
        justify-content:center;
        flex-shrink: 1;
        flex-basis: 20%;
        text-align: center;
        padding: 45px;
        margin: 10px;
        border-radius: 20px;
        background-color: #FFFFFF;
        min-height: 40vh;
        margin-bottom: 30px;
    }
    .pic {
        height: 30%;
        margin-top:5%;
        margin-bottom: 0%;
    }
    .btn {
        background: #2D8F8A;
        border:none;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        width: 100%;
        height: 50px;
        text-align: center;
        cursor: pointer;
        transition-duration: 0.4s;
    }
    .btn:hover {
        background:#1C746F;
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
    .btn2 {
        background: #2D8F8A;
        border-radius: 8px;
        border:none;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        width: 30%;
        height: 50px;
        text-align: center;
        cursor: pointer;
        transition-duration: 0.4s;
    }
    .btn2:hover {
        background:#1C746F;
    }
    img {
        width:50%;
        margin-bottom:2%
    }
    .txt2{
        flex-grow: 1;
        display: flex;
        align-items: flex-end;
    }
    .txt {
        font-family: Inter;
        font-size: 30px;
        color: #1C746F;
        margin-left: 8%;
        text-align: center;
    }
</style>
