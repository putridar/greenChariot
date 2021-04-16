<template>
  <div class = "bg">
        <p class="greenlogo">green</p>
        <p class="whitelogo">Chariot</p><br>
        <img alt="greenChariot" src="../../assets/welcome.png">
        <div class = "content">
            <p class = "title"> Sign In </p>
            <input type="text" placeholder="Email" v-model="email" class ="inputstyle" required><br>
            <input type="password" placeholder="Password" v-model="password" class ="inputstyle" required><br>
            <button class = "create" v-on:click="signin()">Sign In</button>
            <p class ="txt" v-on:click="signup()"> Do not have an account yet? Sign up now!</p>
        </div>
  </div>
</template>

<script>
import db from "../../firebase.js"

export default {
    name: 'SignIn',
    data() {
        return {
            password: "",
            email: "",
            users: [],
            isShop: false,
            shops: []
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('users').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    var user = [doc.id, doc.data()]
                    this.users.push(user)
                });
            }).catch(error => {console.log(error)
                alert(error)})
            db.firestore().collection('shops').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    var user = [doc.id, doc.data()]
                    this.shops.push(user)
                });
            }).catch(error => {console.log(error)
                alert(error)})
        },
        signin: function() {
            var success = true;
            var currId = this.users.filter(item => item[1].email === this.email);
            var currShop = this.shops.filter(item => item[1].email === this.email);
            if (currId[0] !== undefined) {
                db.auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .catch(error => {console.log(error)
                        alert(error)
                        success = false;})
                    .then(() => {
                        if (success) {
                            this.getData(currId, false);   
                        }
                    })
                    .catch(error => {console.log(error)})
            } else {
                if (currShop[0] !== undefined) {
                    db.auth()
                        .signInWithEmailAndPassword(this.email, this.password)
                        .catch(error => {console.log(error)
                            alert(error)
                            success = false;})
                        .then(() => {
                            if (success) {
                                this.getData(currShop, true);   
                            }
                        })
                        .catch(error => {console.log(error)})
                } else {
                    alert("Please register first!")
                }
            }
        },
        signup: function() {
            this.$router.push({ name: 'signup'})
        },
        getData: function(currId, isShop) {
            if (!isShop) {
                this.username = "";
                this.email = "";
                this.password = ""; 
                this.$router.push({ name: 'Dashboard', query : {
                    id: currId[0][0]
                }})
            } else {
                this.username = "";
                this.email = "";
                this.password = ""; 
                this.$router.push({ name: 'dashboardShop', query : {
                    id: currId[0][0]
                }})
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
        font-size: 64px;
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
        font-size: 64px;
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
        margin-left: 50px
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 7%;
        margin-left: 55%;
        margin-right: 10%;
        height: 60%;
        width: 30%;
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
    .inputstyle {
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
        transition-duration: 0.4s;
    }
    .create:hover {
        background:#1C746F;
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