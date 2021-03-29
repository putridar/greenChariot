<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <div>
            <div class="content">
                <div class="pic">
                    <img v-bind:src="this.image" alt="shop" class="image">
                    <div class = "title">{{this.name}}</div>
                </div>
                <div class="txt1">
                    <p class = "txt"> {{this.desc}}</p>
                    <p class = "txt2">Address</p>
                    <p class = "txt"> {{this.address}}</p>
                    <button class="btn" v-on:click="edit()"> Edit Info</button>
                </div>
            </div>
            <div class="chart">
                <p class = "txt2">Customer Insight (greenChariot Users)</p><br>
                <p class = "txt2">Vouchers Insight</p>
            </div>
        </div>
    </div>
</template>

<script>
import Head from './HeaderShop.vue'
import db from "../../firebase.js"
export default {
    name: 'Header',
    components :{
        Head
    },
    data() {
        return {
            id: this.$route.query.id,
            image: null,
            name: '',
            desc: '',
            address: ''
        }
    },
    methods: {
        fetchItems : function() {
            db.firestore().collection('shops').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                this.image = item.imagename
                this.name = item.name
                this.desc = item.desc
                this.address = item.address
            })
        },
        edit: function() {
            this.$router.push({ name: 'shopinfo', query: {id: this.id}})
        }  
    },
    created() {
        this.fetchItems();
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    @import url('https://fonts.googleapis.com/css?family=Inter');
    .bg {
        background-color: #9AD5FF;
        padding: 0px;
        margin: 0px;
        width: 100%;
        min-height: 120vh;
    }
    .content {
        font-family: Montserrat;
        font-size: 30px;
        margin-left: 10%;
        margin-right: 3%;
        width: 38%;
        background: #FFFFFF;
        border-radius: 20px;
        height: 650px;
        padding: 3px;
        float:left
    }
    .chart {
        font-family: Montserrat;
        font-size: 30px;
        margin-top: 3%;
        margin-left: 50%;
        margin-right: 10%;
        width: 38%;
        background: #FFFFFF;
        border-radius: 20px;
        height: 650px;
        padding: 3px;
    }
    .title {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 36px;
        margin-left:90%;
        display: flex;
        width: 30%;
        align-items: center;
        text-align: center;
        height: 70%
    }
    .item {
        font-family: Montserrat;
        font-size: 22px;
        text-align: left;
        width: 90%
    }
    .image {
        width: 70%;
        float: left;
    }
    .btn {
        background: #2D8F8A;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        align-items: center;
        color: #FFFFFF;
        width: 40%;
        height: 50px;
        text-align: center;
        margin-left: 25%;
        margin-right: 25%;
        margin-top:4%;
        cursor: pointer;
    }
    .pic {
        margin-top:7%;
        margin-bottom: 2%;
        height: 40%;
        width: 50%;
        margin-left: 2%;
    }
    .txt1 {
        margin-top:7%;
        margin-bottom: 2%;
        height: 60%;
        margin-left: 2%;
    }
    .txt {
        margin-top:2%;
        margin-bottom: 2%;
        font-size: 20px;
    }
    .txt2 {
        margin-top:7%;
        font-size: 22px;
        font-weight: bold;
    }
    
</style>