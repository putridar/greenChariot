<template>
    <div class="bg">
        <Head v-bind:id="id"></Head>
        <img alt="logo" src="../../assets/welcome.png" class="image">
        <div class="profile">
            <p class="title">Edit Your Profile!</p>
            <p class = "txt"> Email </p>
            <input type="text" placeholder="email" v-model="email" required><br>
            <p class = "txt"> New Password (leave it blank if you do not want to change password) </p>
            <input type="password" placeholder="Password" v-model="password"><br>
            <p class = "txt"> Confirm Password </p>
            <input type="password" placeholder="Confirm Password" v-model="confirmpass"><br>
            <p><button class="btn" v-on:click="confirm()">Confirm</button>
            <button class="btn" v-on:click="signout()">Sign out</button></p>
              
        </div>
    </div>
</template>

<script>
import Head from './HeaderShop.vue'
import db from '../../firebase.js'
export default{
    components:{
        Head
    },
    data(){
        return{
            id:this.$route.query.id,
            points:0,
            email:'',
            oldemail:'',
            password :null,
            confirmpass: null,
            users: []
        }
    },
    methods:{
        retrieve:function(){
            db.firestore().collection('shops').doc(this.id).get().then(snapshot => {
                this.oldemail=snapshot.data().email
                this.email=snapshot.data().email
            })
        },
        confirm:function(){
            const user = db.auth().currentUser;
            var success = true;
            if (this.oldemail == this.email && this.password != null && this.password == this.confirmpass) {
                user.updatePassword(this.password)
                        .catch(error => {
                            console.log(error)
                            alert(error)
                            success = false
                        })
                        .then(() => {
                            if (success) {
                                console.log("Password updated!");
                                alert("Password has been changed. Please login again.")
                                this.$router.push({name:'signin'})
                            }
                        })
            } else if (this.oldemail == this.emai){
                alert("Your email is the same as the previous one")
            } else if (this.email == "" || this.email == null) {
                alert("Your email is empty")
            } else {
                if (this.password != null && this.password == this.confirmpass) {
                     user.updateEmail(this.email)
                    .catch(error => {
                        console.log(error)
                        alert(error)
                        success = false
                    })
                    .then(() => {
                        if (success) {
                            user.updatePassword(this.password).then(() => {
                                console.log("Email and password updated!");
                            })
                            .then(() => {
                                db.firestore().collection('shops').doc(this.id).update({
                                    email: this.email
                                })
                                .then(() => {
                                    alert("Email and password has been changed. Please login again.")
                                    this.$router.push({name:'signin'})
                                })
                                .catch(error => {console.log(error)
                                    alert(error)}) 
                            })  
                        } else {
                            this.$router.push({name:'signin'})
                        }
                    })
                    
                } else if (this.password != null && this.password != this.confirmpass) {
                    alert("Your password confirmation is incorrect")
                } else {
                    user.updateEmail(this.email)
                        .catch(error => {
                            console.log(error)
                            alert(error)
                            success = false
                        })
                        .then(() => {
                            if (success) {
                                console.log("Email updated!");
                                db.firestore().collection('shops').doc(this.id).update({email: this.email})
                                .then(() => {
                                    alert("Email has been changed. Please login again.")
                                    this.$router.push({name:'signin'})
                                })
                                .catch(error => {console.log(error)
                                    alert(error)}) 
                            } else {
                                this.$router.push({name:'signin'})
                            }
                        })
                        
                }
            }
        },
        signout:function(){
            db.auth()
            .signOut()
            .then(() => {
                alert('You have successfully signed out!')
                this.$router.push({name:'signin',query:{id:this.id}})
            })
            .catch(error => console.log(error))
            
        }
    },
    created(){
        this.retrieve()
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
    .content{
        font-family: Montserrat;
        font-weight: bold;
        font-size: 35px;
        margin-left: 2%;
        margin-top:10px;
        animation: zoomIn ease 0.7s
    }
    @keyframes zoomIn {
        0% {transform: scale(0.7,0.7); opacity:0}
        100% {transform: scale(1,1); opacity:1}
    }
    .top {
        margin-right: 100px;
        margin-top: 2%;
        margin-bottom: 2%;
        margin-left:2%;
        display:flex
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
    .txt {
        font-family: Inter;
        font-size: 24px;
        color: #1C746F;
        margin-left: 8%;
        text-align: left;
    }
    .profile {
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
        width: 37%;
        height: 50px;
        text-align: center;
        cursor: pointer;
        margin:7px
    
    }
    .picture{
        height:10%
    }
    .image {
        float: left;
        width: 40%;
        justify-content: center;
        margin-left:-30.2%;
        margin-top:0.1%
    }


</style>