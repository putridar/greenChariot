<template>
    <div class="bg">
        <Head v-bind:id="id"></Head>
        <div class="content">
            <div class="pic">
                <img alt="scoop" v-bind:src="this.image">
                <p class = "title">{{this.name}}</p>
            </div>
            <div class = "txt">
                <p class="title">Description</p><br>
                <p class="item">{{this.desc}}</p><br>
                <p class="title">Shop's Unique Code</p><br>
                <p class="item">{{this.code}}</p><br>
                <button class="btn" v-on:click="edit()">Edit</button>
            </div>
        </div>
    </div>
</template>

<script>
import Head from './HeaderShop.vue'
import db from "../../firebase.js"
export default {
    name: 'Challenges',
    components :{
        Head
    },
    data() {
        return {
            id: this.$route.query.id,
            image: null,
            desc: '',
            name: '',
            code: ''
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('shops').doc(this.id).get().then(snapshot => {
                var item = snapshot.data()
                this.image = item.imagename
                this.desc = item.desc == undefined ? "No Description" : item.desc
                this.name = item.name
                this.code = item.code == undefined ? "No code specified" : item.code.slice(0,4) + 'x'.repeat(item.code.length - 4)
            })
        },
        edit: function(){
            this.$router.push({ name: 'editinfo', query: {id: this.id}})
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
    .content {
        font-family: Montserrat;
        font-size: 30px;
        margin-top: 5%;
        margin-left: 15%;
        margin-right: 15%;
        width: 70%;
        background: #FFFFFF;
        border-radius: 20px;
        height: 550px;
        padding: 3px
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
    }
    .item {
        font-family: Montserrat;
        font-size: 22px;
        text-align: left;
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
        margin: 2%;
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
    .txt {
        margin-top:7%;
        margin-bottom: 2%;
        height: 60%
    }
</style>