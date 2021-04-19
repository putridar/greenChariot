<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <p class = "content"> Challenges: </p>
            <ul>
                <li>
                    <div class = "pic">
                        <img alt= "quiz" src="../../assets/quiz.png">
                    </div>
                    <h1 class = "title">Quiz</h1><br>
                    <p>
                        Confident in your Eco knowledge?<br>
                        Test your understanding in our short quiz <br>
                        +5 Points for each correct answer!<br>
                        Available once a week!
                    </p>
                    <button class = "btn" v-on:click='toQuiz()'>Start</button>
                </li>
                <li>
                    <div class = "pic">
                        <img alt= "social media" src="../../assets/socialmedia.png">
                    </div>
                    <h1 class = "title">Social Media Challenge</h1><br>
                    <p>
                        Show off your efforts in reducing your carbon footprint!<br>
                        +10 Points/post
                    </p>
                    <button class = "btn" v-on:click="isLinked()">See Challenges</button>
                </li>
                <li>
                    <div class = "pic">
                        <img class = "pic2" alt= "shop" src="../../assets/shop.png">
                    </div>
                    <h1 class = "title">Shop at our Green Shops!</h1><br>
                    <p>
                        Buy more sustainable products to help save the planet!
                    </p>
                    <button class = "btn" v-on:click="toShops()">Shop now!</button>
                </li>
            </ul>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from "../../firebase.js"
import Footer from '../Footer.vue'
export default {
    name: 'Challenges',
    components :{
        Head,
        Footer
    },
    data() {
        return {
            id: this.$route.query.id
        }
    },
    methods: {
        isLinked: function() {
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                var item = snapshot.data()
                if ("socialmedia" in item) {
                    this.$router.push({ name: 'socialmediachallenge', query: {id: this.id}})
                } else {
                    this.$router.push({ name: 'socialmedia', query: {id: this.id}})
                }
            })
        },
        toQuiz: function() {
            this.$router.push({name:'quiz',query:{id:this.id}})
        },
        toShops: function() {
            this.$router.push({name:'greenshops',query:{id:this.id}})
        }
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
    .content {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        margin-top: 7px;
        margin-left: 50px;
        text-align: left;
        margin-bottom: 0px;
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        height: 10%
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
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        margin: 10px;
        border-radius: 20px;
        background-color: #FFFFFF;
        min-height: 80vh;
        margin-bottom: 30px;
    }
    img {
        width: 70%;
    }
    p {
        font-family: Montserrat;
        font-size: 16px;
        text-align: center;
        height: 17%;
        padding: 2%;
        margin:2%
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
        width: 50%;
        height: 50px;
        text-align: center;
        margin: 2%;
        cursor: pointer;
        transition-duration: 0.4s;
    }
    .btn:hover {
        background:#1C746F;
    }
    .pic {
        height: 45%;
        margin-top:5%;
        margin-bottom: 2%
    }
    .pic2 {
        width: 60%;
    }
</style>