<template>
    <div>
        <div class="bg">
            <Head v-bind:id="id"></Head>
            <div class="top">
                <p class="content">Your points: {{this.points}}</p>
            </div>
            <div class="rewards">
                <div class="outside">
                    <div class="inside">
                        <div class="pic">
                            <img alt="shoplogo" v-bind:src="item.imagename">
                            <p class="title">${{item.price}} {{item.name}} Voucher</p><br>
                            <p class="title2">{{item.point}} points</p>
                            <p class="title3">Are you sure you want to spend this voucher?</p>
                            <button class="btn" v-on:click="proceed()">Yes</button>
                            <button class="btn" v-on:click="backwards()">No</button>
                        </div>
                    </div>
                </div>
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
            item:this.$route.query.item,
            index:this.$route.query.index,
            currvoucher:[],
            used :[],
            custlist: {}
        }
    },
    methods:{
        retrieveitems:function(){
            console.log(this.item)
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
               this.points=snapshot.data().points
               this.currvoucher=snapshot.data().currvoucher
            })
            db.firestore().collection('shops').doc(this.item.shopId).get().then(snapshot => {
               var item = snapshot.data()
               this.used = item.used == undefined ? [] : item.used
               this.custlist = item.custlist
            })
        },
        backwards:function(){
            this.$router.push({name:'rewardpage',query:{id:this.id}})
        },
        proceed:function(){
                var d = new Date()
                var curr = this.currvoucher[this.index]
                this.currvoucher.splice(this.index,1)
                this.used.push(this.id)
                var final=this.currvoucher
                this.custlist[d.getDay()].push(this.id)
                db.firestore().collection('users').doc(this.id).update({
                    currvoucher:final
                }).then(() => {
                    db.firestore().collection('shops').doc(this.item.shopId).update({
                        used: this.used,
                        custlist: this.custlist
                    }).then(() => {
                        alert('You have successfully spent your voucher! Your voucher code: ' + curr.coupon)
                        this.$router.push({name:'rewardpage',query:{id:this.id}})
                    })
                })
                    
                    
        }
    },
    created(){
        this.retrieveitems()
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
    .content{
        font-family: Montserrat;
        font-weight: bold;
        font-size: 35px;
        margin-left: 2%;
    }
    .top {
        margin-right: 100px;
        margin-top: 2%;
        margin-bottom: 2%;
        margin-left:-7%;
        display:flex
    }
    .rewards {
        margin-top: 8px;
    }
    .title{
        font-family: Montserrat;
        font-size: 36px;
        text-align: center;
        padding: 2%;
        margin-top:2%;
        font-weight:bold
    }
    .title2{
        font-family: Montserrat;
        font-size: 24px;
        text-align: center;
        padding: 1%;
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
        width:50%;
        text-align: center;
        padding: 10px;
        margin-left:25%;
        margin-right:25%;
        margin-bottom:2%;
        border-radius: 20px;
        background-color: #FFFFFF;
        min-height: 60vh;
    }
    .pic {
        height: 35%;
        margin-top:3%;
        margin-bottom: 2%;
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
        width: 20%;
        height: 50px;
        text-align: center;
        cursor: pointer;
        margin: 2%;
        transition-duration: 0.4s;
    }
    .btn:hover {
        background: #1C746F;
    }
    .title3{
        font-family: Montserrat;
        font-size: 24px;
        text-align: center;
        padding: 2%;
        font-weight:bold;
    }
    .content {
        width: 40%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px;
    }
    img {
        width:30%
    }
</style>