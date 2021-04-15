<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <div>
                <div class="content">
                    <div class="pic">
                        <img v-bind:src="this.image" alt="shop" class="image">
                        <div class = "title">{{this.name}}</div>
                    </div>
                    <div class="txt1">
                        <p class = "txt4"> {{this.desc}}</p>
                        <p class = "txt2">Address</p>
                        <p class = "txt4"> {{this.address}}</p>
                        <p class = "txt2">Today's Code</p>
                        <p class = "txt4"> {{this.code}}</p>
                        <button class="btn" v-on:click="edit()"> Edit Info</button>
                    </div>
                </div>
                <div class="chart">
                    <p class = "txt3">Customer Insight (greenChariot Users)</p>
                    <div class = "cust">
                        <customer-chart v-bind:id="id" style="height:30vh; width:10vw"></customer-chart>
                    </div>
                    <p class = "txt3">Vouchers Insight</p><br>
                    <div class = "cust">
                        <voucher-chart v-bind:id="id" style="height:30vh; width:20vw;"></voucher-chart>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Head from './HeaderShop.vue'
import db from "../../firebase.js"
import CustomerChart from "../Charts/CustomerChart.vue"
import VoucherChart from "../Charts/VoucherChart.vue"
import Footer from '../Footer.vue'
export default {
    name: 'Header',
    components :{
        Head,
        CustomerChart,
        VoucherChart,
        Footer
    },
    data() {
        return {
            id: this.$route.query.id,
            image: null,
            name: '',
            desc: '',
            address: '',
            day: null,
            code: '',
            custlist: {},
            redeemed: []
        }
    },
    methods: {
        fetchItems : function() {
            db.firestore().collection('shops').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                this.image = item.imagename
                this.desc = item.desc == undefined ? "No description provided" : item.desc
                this.name = item.name
                this.code = item.code == undefined ? "" : item.code
                this.address = item.address == undefined ? "No address provided" : item.address
                this.day = item.day == undefined ? null : item.day
                this.custlist = item.custlist
                this.randomCode(item.code, item.day)
            })
        },
        edit: function() {
            this.$router.push({ name: 'shopinfo', query: {id: this.id}})
        } ,
        randomCode: function(code, currday) {
            var d = new Date();
            var day = d.getDay();
            if (currday == null || day != currday || code == undefined) {
                var result = '';
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                for (let x = 0; x < 8; x++ ) {
                    result += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                this.code = result
                this.day = day
                db.firestore().collection('shops').doc(this.id).update({
                    code: this.code,
                    day: this.day,
                    redeemed: []
                }).then(() => {
                    console.log(this.code)
                })
            } else {
                this.code = code
            }
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
        min-height: 160vh;
    }
    .head {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
    }
    .content {
        font-family: Montserrat;
        font-size: 30px;
        margin-left: 7%;
        margin-right: 3%;
        width: 42%;
        background: #FFFFFF;
        border-radius: 20px;
        height: 1000px;
        padding: 3px;
        float:left
    }
    .chart {
        font-family: Montserrat;
        font-size: 30px;
        margin-top: 3%;
        margin-left: 50%;
        margin-right: 7%;
        width: 42%;
        background: #FFFFFF;
        border-radius: 20px;
        height: 1000px;
        padding: 3px;
    }
    .title {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 40px;
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
        margin-top:15%;
        margin-bottom:2%;
        height: 35%;
        width: 50%;
        margin-left: 2%;
    }
    .txt1 {
        margin-top:10px;
        margin-bottom: 2%;
        height: 60%;
        margin-left: 2%;
    }
    .txt4 {
        margin-top:5px;
        margin-bottom: 2%;
        font-size: 24px;
    }
    .txt2 {
        margin-top:7%;
        font-size: 28px;
        font-weight: bold;
    }
    .txt3 {
        margin-top:2%;
        font-size: 24px;
        font-weight: bold;
    }
    .cust {
        margin-left:-35%;
        height:400px;
        width:100%;
    }
    .cust1 {
        width:100%;
    }
</style>