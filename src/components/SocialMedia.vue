<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <img class = "image" alt="socialmedia" src="../assets/socialmedia.png">
        <div class = "content">
            <p class = "title"> Connect Your Social Media </p><br>
            <label for = "ig">Instagram</label>
            <input type="text" placeholder="Username" id ="ig" v-model="ig"><br>
            <label for = "fb">Facebook</label>
            <input type="text" placeholder="Username" id="fb" v-model="fb"><br>
            <label for = "twitter">Twitter</label>
            <input type="text" placeholder="Username" id="twitter" v-model="twitter"><br>
            <button class = "btn" v-on:click="link()">Connect</button>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from "../firebase.js"
export default {
    name: 'SocialMedia',
    components :{
        Head
    },
    data() {
        return {
            ig: "",
            fb: "",
            twitter: "",
            id: this.$route.query.id
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                var item = snapshot.data().socialmedia
                if (item !== undefined) {
                    this.ig = item.ig
                    this.fb = item.fb
                    this.twitter = item.twitter
                }
            }).catch(error => {console.log(error)
                alert(error)})
        },
        link : function() {
            if (this.ig === "" && this.fb === "" && this.twitter === "") {
                alert("Please fill at least one social media account")
            } else {
                db.firestore().collection('users').doc(this.id).update({
                    socialmedia: {
                        ig: this.ig,
                        fb: this.fb,
                        twitter: this.twitter
                    }
                }).then(() => {
                    alert("Connected successfuly");
                    this.$router.push({ name: 'socialmediachallenge', query: {id: this.id}})
                })
            }
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
    .image {
        float: left;
        width: 40%;
        justify-content: center;
        margin-left: -23%;
        margin-top: 5%;
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 40px;
        margin-left: 55%;
        margin-right: 10%;
        min-height: 70vh;
        width: 35%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px;
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 44px;
        margin: 10px;
        padding:10px
    }
    input {
        font-family: Montserrat;
        padding: 8px;
        width: 80%;
        margin: 8px;
        margin-left:8%;
        margin-right:8%;
        font-size: 24px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%;
        display: flex;
        align-items: center;
    }
    label {
        font-family: Montserrat;
        font-size: 24px;
        display: flex;
        align-items: center;
        margin: 8px;
        margin-left:8%;
        margin-right:8%;
        width: 80%;
        padding: 8px;

    }
    .btn {
        background: #2D8F8A;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
        width: 30%;
        height: 50px;
        margin: 20px;
        cursor: pointer;
    }
</style>