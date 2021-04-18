<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <div class="content">
                <div class="divider">
                    <img v-bind:src="this.image" alt="shop" class="image">
                    <h1 class="companyname"> {{name}}</h1>
                </div>
                <div class="details">
                    <p class="company"> Company Description:</p>
                    <p class="companyname"> {{desc}} </p>
                    <br>
                    <p class="company"> Address:</p>
                    <p class="companyname"> {{address}} </p>
                    <button class="edit"> Edit Info</button>
                </div>
                <div class="pie">
                    <Shoppie></Shoppie>
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
export default {
    name: 'Header',
    components :{
        Head,
        Footer, 
        Shoppie
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
        min-height: 160vh;
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
        margin-left: 2%;
        margin-right: 2%;
        height: auto;
        width: auto;
        border-radius: 8px;
        padding: 3%;
        display: flex;
    }
    .divider{
        flex-direction: row;
        flex:1;
        text-align: center;
    }
    .details{
        flex-direction: row;
        flex:1;
        text-align: left;
    }
    .companyname{
        margin-top: 4%;
        margin-bottom: 3%;
        font-style: normal;
    }
    .company{
        margin-top: 5%;
        font-weight: bolder;
        font-size: 28px;
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
        margin-top: 10%;
        cursor: pointer;
        transition-duration: 0.4s;
    }
    .edit:hover{
        background:#1C746F;
    }
    .pie{
        background-color:none;
        margin-left: 2%;
        margin-right: 2%;
        align-items: center;
        border-radius: 8px;
        padding: 0px;
        width: 28%;
        flex-direction: row;
        flex:1;
    }
</style>