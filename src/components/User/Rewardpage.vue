<template>
    <div>
        <div class="bg">
            <Head v-bind:id="id" class="head"></Head>
            <div class="top">
                <p class="content2">Your vouchers:</p>
                <button class = "btn2" v-on:click="exchange()"> Exchange Vouchers </button>
            </div>
            <div class="rewards">
                <ul>
                <li v-for="(item,index) in currvoucher" :key=index>
                    <div class="pic">
                    <img alt="shoplogo" v-bind:src="item.imagename">
                    </div>
                    <p class="title">${{item.price}} {{item.name}} Voucher</p>
                    <p class="title2">{{item.point}} points</p><br>
                    <button class="btn" v-on:click="spend(item,index)">Spend this voucher!</button>
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
            points:0,
            currvoucher:[]
        }
    },
    methods:{
        retrievepoints:function(){
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                this.points=snapshot.data().points
                this.searchPictureandId(snapshot.data().currvoucher)
            })
        },
        searchPictureandId: function(item) {
            var shop = []
            db.firestore().collection('shops').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    var user = [doc.id, doc.data()]
                    shop.push(user)
                })
            }).then(()=>this.update(item,shop))
        },
        update : function(item,shop) {
            for (let x = 0; x < item.length; x++) {
                var curr = shop.filter(s=> item[x].shopId === s[0]);
                var cur = curr[0][1]
                var curritem = {
                    imagename: cur.imagename,
                    name: cur.name,
                    point: item[x].point,
                    price: item[x].price,
                    shopId: item[x].shopId,
                    couponID:item[x].code,
                    couponcode: item[x].coupon
                }
                this.currvoucher.push(curritem)
            }
        },
        exchange: function() {
            this.$router.push({name:'combinedvoucher',query:{id:this.id}})
        },
        spend:function(item,index){
            this.$router.push({name:'spendvoucher',query:{id:this.id,item:item,index:index, shopId:item.shopId}})
        }
    },
    created(){
        this.retrievepoints()
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
        margin-bottom:2%
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
        margin-top:0%
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
        margin-bottom: 30px;
        height: 350px
    }
    .pic {
        height: 45%;
        margin-top:5%;
        margin-bottom: 0%;
    }
    .btn {
        background: #2D8F8A;
        border: none;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        width: 80%;
        height: 50px;
        text-align: center;
        cursor: pointer;
        transition-duration: 0.4s;
    }
    .btn:hover {
        background:#1C746F;
    }
    .btn2 {
        background: #2D8F8A;
        border: none;
        border-radius: 8px;
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
    .content{
        font-family: Montserrat;
        font-weight: bold;
        font-size: 35px;
        margin-left: 2%;
        margin-top:2%
    }
    img {
        width:50%;
        margin-bottom:2%
    }
    .content2{
        font-family: Montserrat;
        font-weight: bold;
        font-size: 36px;
        margin-left: 5%;
        margin-top:10px;
        text-align:left
    }
</style>