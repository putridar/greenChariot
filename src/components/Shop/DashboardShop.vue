<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <div class="content">
                <div class="divider">
                    <img v-bind:src="this.image" alt="shop" class="image">
                    <h1 class="companyname"> {{name}}</h1>
                
                    <div class="details">
                        <p class="company"> Company Description:</p>
                        <p class="companyname"> {{desc}} </p>
                        <p class="company"> Address:</p>
                        <p class="companyname"> {{address}} </p>
                        <button class="edit" v-on:click="edit()"> Edit Info</button>
                    </div>
                </div>
                <div class="divider1">
                    <div class="pie">
                        <Shoppie></Shoppie>
                    </div>
                    <div class="cust">
                        <customer-chart v-bind:id="id"></customer-chart>
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
import Footer from '../Footer.vue'
import Shoppie from '../Charts/Shoppie.vue'
import CustomerChart from '../Charts/CustomerChart.vue'
export default {
    name: 'Header',
    components :{
        Head,
        Footer, 
        Shoppie,
        CustomerChart
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
        },
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
        min-height: 120vh;
        font-family: Montserrat;

    }
    .head {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 2%;
        margin-left: 5%;
        margin-right: 5%;
        height: auto;
        width: auto;
        border-radius: 8px;
        display: flex;
        padding-left: 3%;
    }
    .divider{
        flex-direction: row;
        flex:0.35;
        text-align: center;
    }
    .divider1{
        flex:0.65;
        text-align: center;
        display: flex;
    }
    .details{
        flex-direction: row;
        flex:1;
        text-align: left;
    }
    .companyname{
        margin-top: 2%;
        margin-bottom: 3%;
        font-style: normal;
    }
    .company{
        margin-top: 5%;
        font-weight: bolder;
        font-size: 24px;
    }
    .edit{
        background: #2D8F8A;
        border-radius: 8px;
        border: #2D8F8A;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: auto;
        line-height: 40px;
        text-align: center;
        color: #FFFFFF;
        width: 90%;
        height: 60px;
        margin: 2%;
        margin-top: 5%;
        cursor: pointer;
        transition-duration: 0.4s;
    }
    .edit:hover{
        background:#1C746F;
    }
    .pie{
        background-color:none;
        margin-top:5%;
        margin-left: 2%;
        margin-right: 2%;
        align-items: center;
        border-radius: 8px;
        padding: 0px;
        width: 30%;
        flex-direction: column;
    }
    .cust{
        background-color:none;
        align-items: center;
        margin-top:5%;
        margin-left: 5%;
        margin-right: 2%;
        border-radius: 8px;
        padding: 0px;
        width: 50%;
        flex-direction: column;
    }
    .image {
        width:60%
    }
</style>