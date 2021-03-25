<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <p class = "content"> Challenges: </p>
        <ul>
            <li>
                <div class = "pic">
                    <img alt= "quiz" src="../../assets/quiz.png">
                </div>
                <h1 class = "title">Quiz</h1><br>
                <p>
                    Confident about your knowledge in carbon footprint?<br>
                    Test your understanding by doing this quiz!<br>
                    +5 Points/correct answer
                </p>
                <button class = "btn">Start</button>
            </li>
            <li>
                <div class = "pic">
                    <img alt= "social media" src="../../assets/socialmedia.png">
                </div>
                <h1 class = "title">Social Media Challenge</h1><br>
                <p>
                    Prove that you have contributed to reduce the carbon emissions!<br>
                    +10 Points/post
                </p>
                <button class = "btn" v-on:click="isLinked()">See Challenges</button>
            </li>
            <li>
                <div class = "pic">
                    <img class = "pic2" alt= "shop" src="../../assets/shop.png">
                </div>
                <h1 class = "title">Shop at Our Green Shops!</h1><br>
                <p>
                    Buy more sustainable products to help saving the planet!
                </p>
                <button class = "btn">Shop now!</button>
            </li>
        </ul>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from "../../firebase.js"
export default {
    name: 'Challenges',
    components :{
        Head
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