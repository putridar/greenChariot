<template>
  <div class = "bg">
        <Head v-bind:id="id"></Head>
        <img alt="greenChariot" src="../../assets/shop.png">
        <div class = "content">
            <p class = "title"> Register Your Shop! </p>
            <input type="text" placeholder="Shop Name" v-model="name" required><br>
            <input type="password" placeholder="Password" v-model="password" required><br>
            <button class = "create" v-on:click="create()">Register</button>
            <p class="txt" v-on:click="signIn()"> Already own a shop account? Sign In now!</p>
        </div>
  </div>
</template>

<script>
import db from "../../firebase.js"
import Head from './Header.vue'
export default {
    name: 'Register',
    components :{
        Head
    },
    data() {
        return {
            name: "",
            username :"",
            email: "",
            password: "",
            id: this.$route.query.id,
            shops: []
        }
    },
    methods: {
        fetchItems: function() {
             db.firestore().collection('shops').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    var user = [doc.id, doc.data()]
                    this.shops.push(user)
                });
            }).catch(error => {console.log(error)
                alert(error)})
        },
        create : function() {
            if (this.name == "" || this.password == "") {
                alert("Please fill in the required input");
            } else {
                this.signup();
            }
        },
        signup: function() {
            var success = true;
            var email
            var currId
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                    email = snapshot.data().email
                    console.log(email)
                    currId = this.shops.filter(item => item[1].email === email);
                    console.log(currId)
                    if (currId[0] !== undefined) {
                        alert("You already have a shop that registered with this email")
                    } else {
                        db.auth()
                            .signInWithEmailAndPassword(email, this.password)
                            .catch(error => {console.log(error)
                                alert(error)
                                success = false;})
                            .then(() => {
                                if (success) {
                                    db.firestore().collection('shops').add({
                                        name: this.name,
                                        email: email,
                                        image: null
                                    }).then((docRef) => {
                                        var id = docRef.id
                                        this.navigate(id) 
                                    }) 
                                }
                            })
                            .catch(error => {console.log(error)})
                    }
                }).catch(error => {console.log(error)
                    alert(error)})
        },
        navigate: function(id) {
            this.$router.push({ name: 'dashboardShop', query : {
                id: id,
            }})
        },
        signIn: function() {
            this.$router.push({ name: 'signinShop', query : {
                id: this.id,
            }})
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
        min-height: 100vh;
    }
    .greenlogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 60px;
        line-height: 103px;
        color: #1C746F;
        text-align: left;
        margin: 50px;
        display: inline;
        margin-right: 0px;
    }
    .whitelogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 60px;
        line-height: 103px;
        color: #FFFFFF;
        text-align: left;
        margin: 50px;
        display: inline;
        margin-left: 0px;
    }
    img {
        float: left;
        width: 40%;
        justify-content: center;
        margin-left: -30%
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 5%;
        margin-left: 55%;
        margin-right: 10%;
        height: 60%;
        width: 35%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px;
        animation: zoomIn ease 0.7s
    }
    @keyframes zoomIn {
        0% {transform: scale(0.7,0.7); opacity:0}
        100% {transform: scale(1,1); opacity:1}
    }
    .title {
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 44px;
        line-height: 58px;
        text-align: center;
        color: #1C746F;
        margin: 15px;
    }
    input {
        font-family: Montserrat;
        padding: 8px;
        width: 80%;
        margin: 3%;
        font-size: 22px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%
    }
    .create {
        background: #2D8F8A;
        border-radius: 8px;
        border: #2D8F8A;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 44px;
        text-align: center;
        color: #FFFFFF;
        width: 80%;
        height: 60px;
        margin: 3%;
        cursor: pointer;
    }
    .txt {
        font-family: Montserrat;
        color: #1C746F;
        text-align: center;
        font-size: 20px;
        margin: 10px;
        cursor: pointer;
    }
</style>