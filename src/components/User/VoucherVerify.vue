<template>
    <div>
        <div class="bg">
            <Head v-bind:id="id" class="head"></Head>
            <div class="top">
                <p class="content">Your points: {{this.score}}</p>
            </div>
            <div class="rewards">
                <div class="outside">
                    <div class="inside">
                        <div class="pic">
                            <img alt="shoplogo" v-bind:src="imagename">
                            <p class="title">${{this.currentvoucher.price}} {{this.currentvoucher.name}} Voucher</p><br>
                            <p class="title2">{{this.currentvoucher.point}} points</p>
                            <p class="title3">Are you sure you want to exchange this?</p>
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
            imagename:'',
            name:this.$route.query.name,
            currentvoucher:{},
            voucher:this.$route.query.voucher,
            shopId:this.$route.query.shopId,
            score:0,
            currvoucher:[],
            exchanged: [],
            combined: this.$route.query.combined
        }
    },
    methods:{
        fetchItems: function() {
            console.log(this.id)
            db.firestore().collection('shops').doc(this.shopId).get().then(snapshot=>{
                 this.imagename = snapshot.data().imagename
            })
        },
        fetchvoucher:function(){
            var temp=''
            db.firestore().collection('shops').doc(this.shopId).get().then(snapshot => {
                temp=snapshot.data()
                this.currentvoucher.imagename=temp.imagename
                this.currentvoucher.price=this.voucher.price
                this.currentvoucher.point=this.voucher.point
                this.currentvoucher.name=this.name
                this.currentvoucher.shopId = this.shopId
<<<<<<< HEAD
                this.exchange = temp.exchanged == undefined ? [] : temp.exchanged
=======
                this.exchanged = temp.exchanged == undefined ? [] : temp.exchanged
>>>>>>> 26bcc6315c17aca64d1439af146a7afb4d99f77c
            })
        },
        retrieve:function(){
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                var item = snapshot.data()
                this.score= item.points
                this.currvoucher= item.currvoucher == undefined ? [] : item.currvoucher
            })
        },
        proceed:function(){
            this.currvoucher.push(this.currentvoucher)
            db.firestore().collection('users').doc(this.id).update({
                currvoucher:this.currvoucher,
                points: this.score - this.currentvoucher.point
            }).then(() => {
                this.exchanged.push(this.id)
                db.firestore().collection('shops').doc(this.shopId).update({
                    exchanged: this.exchanged
                }).then(() => {
                    alert("You have successfully exchange your points")
                    if (this.combined) {
                        this.$router.push({name:'combinedvoucher',query:{id:this.id,name:this.name, shopId:this.shopId}})
                    } else {
                        this.$router.push({name:'scooprewards',query:{id:this.id,name:this.name, shopId:this.shopId}})
                    }
                })
            })
        },
        backwards:function(){
            if (this.combined) {
                this.$router.push({name:'combinedvoucher',query:{id:this.id,name:this.name, shopId:this.shopId}})
            } else {
                this.$router.push({name:'scooprewards',query:{id:this.id,name:this.name, shopId:this.shopId}})
            }
        }
            
        
    },
    created(){
        this.retrieve(),
        this.fetchvoucher()
    },
    mounted(){
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
        margin: 2%
    
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
