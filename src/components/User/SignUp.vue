<template>
  <div class = "bg">
        <p class="greenlogo">green</p>
        <p class="whitelogo">Chariot</p><br>
        <img alt="greenChariot" src="../../assets/welcome.png">
        <div class = "content">
            <p class = "title"> Sign Up </p>
            <input type="text" placeholder="Name" v-model="name" class = "inputstyle" required><br>
            <input type="text" placeholder="Username" v-model="username" class = "inputstyle" required><br>
            <input type="email" placeholder="Email" v-model="email" class = "inputstyle" required><br>
            <input type="password" placeholder="Password" v-model="password" class = "inputstyle" required><br>
            <input type="checkbox" id="shop" name="shop" v-model="isShop">
            <label for="shop" class = "txt">Register as a Shop's Owner?</label><br>
            <button class = "create" v-on:click="create()">Create Account</button>
            <p class = "txt" v-on:click="signin()">Already have an account? Sign In now!</p>
        </div>
  </div>
</template>

<script>
import db from "../../firebase.js"

export default {
    name: 'SignUp',
    data() {
        return {
            name: "",
            username :"",
            email: "",
            password: "",
            id: "",
            isShop: false
        }
    },
    methods: {
        create : function() {
            if (this.name == "" || this.username == "" || this.email == "" || this.password == "") {
                alert("Please fill in the required input");
            } else {
                this.signup();
            }
        },
        signup: function() {
            var success = true;
            db.auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .catch(error => {
                success = false;
                console.log(error)
                alert(error)})
            .then(() => {
                db.auth().currentUser.updateProfile({displayName: this.name})
                if (success && !this.isShop){
                    db.firestore().collection('users').add({
                        name: this.name,
                        email: this.email,
                        username: this.username,
                        points: 0,
                        currvoucher:[],
                        image:''
                    })
                    .then((docRef) => {
                        this.id = docRef.id
                        this.name = ""
                        this.username = ""
                        this.email = ""
                        this.password = "" 
                        alert("Sign up successful!")
                    })
                    .then(() => {
                        this.navigate(this.id)
                    })
                    .catch(error => {
                        console.log(error)
                        alert(error)
                    })
                } else if (success) {
                    db.firestore().collection('shops').add({
                        name: this.name,
                        email: this.email,
                        imagename: "https://i.pinimg.com/originals/77/e5/0c/77e50c04f9f512a456eb3e135a1c013b.png",
                        vouchers: [],
                        redeemed: [],
                        custlist: {
                            0:[],
                            1:[],
                            2:[],
                            3:[],
                            4:[],
                            5:[],
                            6:[]
                        }
                    })
                    .then((docRef) => {
                        this.id = docRef.id
                        this.name = ""
                        this.username = ""
                        this.email = ""
                        this.password = "" 
                        alert("Sign up successful!")
                    })
                    .then(() => {
                        this.navigateShop(this.id)
                    })
                    .catch(error => {
                        console.log(error)
                        alert(error)
                    })
                }
            })
            .catch(error => {
                success = false;
                console.log(error)})
        },
        signin: function() {
            this.$router.push({ name: 'signin'})
        },
        navigate: function(id) {
            this.$router.push({ name: 'survey', query : {
                id: id,
            }})
        },
        navigateShop: function(id) {
            this.$router.push({ name: 'dashboardShop', query : {
                id: id,
            }})
        }
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
        margin-top: 2%;
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