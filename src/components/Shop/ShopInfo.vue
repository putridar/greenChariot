<template>
    <div>
        <div class="bg">
            <Head v-bind:id="id" class="head"></Head>
            <div class="content1">
                <div class="pic">
                    <div class="hg">
                        <img alt="scoop" v-bind:src="this.image">
                        <p class = "title1">{{this.name}}</p>
                    </div>
                    <button class="btn" v-on:click="editimage()">Edit Image</button>
                </div>
                <div class = "txt1">
                    <div class="hg1">
                        <p class="title1">Description</p>
                        <p class="item1">{{this.desc}}</p><br>
                        <p class="title1">Address</p>
                        <p class="item1">{{this.address}}</p><br>
                        <p class="title1">URL</p>
                        <p class="item1">{{this.website}}</p><br>
                    </div>
                    <button class="btn" v-on:click="edit()">Edit Info</button>
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
export default {
    name: 'Info',
    components :{
        Head,
        Footer
    },
    data() {
        return {
            id: this.$route.query.id,
            image: null,
            desc: '',
            name: '',
            code: '',
            address: '',
            website: ''
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('shops').doc(this.id).get().then(snapshot => {
                var item = snapshot.data()
                this.update(item)
            })
        },
        update: function(item) {
            this.image = item.imagename
            this.desc = item.desc == undefined ? "No Description" : item.desc
            this.name = item.name
            this.address = item.address == undefined ? "No Address" : item.address
            this.code = item.code == undefined ? "No code specified" : item.code.slice(0,4) + 'x'.repeat(item.code.length - 4)
            this.website = item.website == undefined || item.website == "" ? "No website" : item.website
            console.log(this.website)
            console.log(item.code)
        },
        edit: function(){
            this.$router.push({ name: 'editinfo', query: {id: this.id}})
        },
        editimage: function(){
            this.$router.push({ name: 'editimage', query: {id: this.id}})
        }
    },
    created() {
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
    .content1 {
        font-family: Montserrat;
        font-size: 30px;
        margin-top: 5%;
        margin-left: 15%;
        margin-right: 15%;
        width: 70%;
        background: #FFFFFF;
        border-radius: 20px;
        height: 500px;
        padding: 3px
    }
    .title1 {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 28px;
        color:black
    }
    .item1 {
        font-family: Montserrat;
        font-size: 22px;
        text-align: left;
        width: 90%;
        color:black
    }
    img {
        width: 70%;
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
        cursor: pointer;
    }
    .pic {
        margin-top:7%;
        margin-bottom: 2%;
        float: left;
        text-align: center;
        height: 60%;
        width: 40%
    }
    .txt1 {
        margin-top:7%;
        margin-bottom: 2%;
        height: 60%;
        margin-left: 40%;
    }
    .hg {
        height:100%;
    }
    .hg1 {
        height: 100%;
        align-items: center;
    }
</style>