<template>
    <div class="background">
        <Head v-bind:id="id"></Head>
        <div class="top">
            <p class="content2">Your vouchers:</p>
        </div>
        <div class="rewards">
            <ul>
              <li v-for="(item,index) in currvoucher" :key=index>
                  <div class="pic">
                  <img alt="shoplogo" v-bind:src="item.imagename">
                  </div>
                  <p class="title">${{item.price}} {{item.name}} Voucher</p>
                  <p class="title2">{{item.point}} points</p><br>
                  <button class="btn">Spend this voucher!</button>
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
            points:0,
            currvoucher:[]
        }
    },
    methods:{
        retrievepoints:function(){
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                this.points=snapshot.data().points
                this.currvoucher=snapshot.data().currvoucher
            })
        },
    },
    created(){
        this.retrievepoints()
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
        width: 70%;
        height: 50px;
        text-align: center;
        cursor: pointer;
    
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
        font-size: 45px;
        margin-left: 5%;
        margin-top:10px;
        text-align:left
    }
</style>