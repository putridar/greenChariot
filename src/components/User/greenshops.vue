<template>
<div>
 <div class="bg">
    <Head v-bind:id="id" class="head"></Head>
    <div class = "top">
        <p class="content">Our Green Shop Partners:</p>
        <button class = "btn2" v-on:click="register()"> Want to be our partner? Register now! </button>
        <button class="btn2" v-on:click="direct()">Voucher Redemption</button>
    </div>
    <div class = "shops">
        <ul>
            <li v-for="(item,index) in shops" :key="index">
                <div class="pic">
                    <img alt="logo" v-bind:src="item.imagename">
                </div>
                <h1 class="title">{{item.name}}</h1><br>
                <div class='txt' v-if="item.desc!=''">Shop Description: {{item.desc}}</div><div class='txt' v-else>Shop Description: This shop have not provided any description!</div>
                <div class='txt' v-if="item.address!=''">Shop Address: {{item.address}}</div><div class='txt' v-else>Shop Address: This shop have not provided any address yet!</div>
                <p class="txt2"><button class="btn" v-on:click='check(item.website);website(item.website);'>Visit shop website</button></p>
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
export default {
    name: 'Greenshops',
    components :{
        Head,
        Footer
    },
    data() {
        return {
            id: this.$route.query.id,
            imagename:'',
            code:'',
            shops: [],
            shopId:'',
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('shops').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.shops.push(doc.data())
                });
            }).catch(error => {console.log(error)
                alert(error)})
        },
        register: function() {
            this.$router.push({ name: 'registershop', query: {id: this.id}})
        },  
        isclick:function(image, name){
            this.imagename = image
            this.$router.push({name:'scoopcode',query:{id:this.id,name:name}})
                
        },
        direct:function(){
            this.$router.push({name:'combinedvoucher',query:{id:this.id}})
        },
        check:function(web){
            if (web==''){
                alert("This shop website is not available at the moment!")
            }
        },
        website:function(web){
            if (web!=''){
             window.location.href=web
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
    .bg {
        background-color: #9AD5FF;
        padding: 0px;
        margin: 0px;
        width: 100%;
        min-height: 130vh;
    }
    .head {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
        justify-content: center;
        
    }
    li {
        display:flex;
        flex-direction:column;
        justify-content:center;
        flex-shrink: 1;
        flex-basis: 20%;
        text-align: center;
        padding: 10px;
        margin: 10px;
        border-radius: 20px;
        background-color: #FFFFFF;
        min-height: 60vh;
        margin-bottom: 30px;
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 26px;
        height: 70px;
        margin-top: 10px
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
    .pic {
        height: 230px;
        margin-top:5%;
        margin-bottom: 2%;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    img {
        justify-content: center;
        align-items: center;
        width: 60%;
        margin-top: 10%;
        margin-bottom: 20%
    }
    .top {
        justify-content: space-between;
        display: flex;
        margin-right: 100px;
        margin-top: 2%;
        margin-bottom: 2%
    }
    .content {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 35px;
        margin-left: 5%;
    }
    .shops {
        margin-top: 10px;
    }
    .title2 {
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 58px;
        text-align: center;
        color: #1C746F;
        height:150px
    }
    .btn2 {
        background: #2D8F8A;
        border:none;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        width: 25%;
        height: 70px;
        text-align: center;
        cursor: pointer;
        transition-duration: 0.4s;
    }
    .btn2:hover {
        background:#1C746F;
    }
    .txt {
        font-family: Inter;
        font-size: 15px;
        color: #1C746F;
        margin-left: 8%;
        text-align: left;
    }
    .txt2{
        flex-grow: 1;
        display: flex;
        align-items: flex-end;
    }
    
</style>



