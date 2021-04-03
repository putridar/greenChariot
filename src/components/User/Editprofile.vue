<template>
    <div class="background">
        <Head v-bind:id="id"></Head>
        <div class="top">
            <p class="content">Your points: {{this.points}}</p>
        </div>
        <img alt="logo" src="../../assets/welcome.png">
        <div class="profile">
            <p class="title">Edit Your Profile!</p>
            <p class = "txt"> Name </p>
            <input type="text" placeholder="Name" v-model='name' required><br>
            <p class = "txt"> Username </p>
            <input type="text" placeholder="username" v-model="username" required><br>
            <p class = "txt"> Email </p>
            <input type="text" placeholder="email" v-model="email" required><br>
            <p class="title2">Upload your profile picture below!</p>
            <input type="file" accept="image/*" @change="previewimage">
            <p class="title2">Preview Here:</p>
            <template v-if= "this.image!=''"><img alt="profilepic" :src="this.preview" class='imgfluid'><br></template>
            <p><button class="btn" v-on:click="confirm()">Confirm</button>
            <button class="btn" v-on:click="signout()">Sign out</button></p>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from '../../firebase.js'
export default{
    components:{
        Head
    },
    data(){
        return{
            id:this.$route.query.id,
            points:0,
            name:'',
            username:'',
            email:'',
            image:'',
            preview:''
        }
    },
    methods:{
        retrieve:function(){
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                this.points=snapshot.data().points
                this.name=snapshot.data().name
                this.username=snapshot.data().username
                this.email=snapshot.data().email
            })
        },
        confirm:function(){
            if (this.name=='' || this.username=='' || this.email==''){
                alert('You need to fill in all the inputs!')
            }else{
            db.firestore().collection('users').doc(this.id).update({
                name:this.name,
                username:this.username,
                email:this.email,
                image:this.image
            }).then(() => {
                alert("Profile updated successfully!")
            })
        }
    },
        signout:function(){
            alert('You have successfully signed out!')
            this.$router.push({name:'signin',query:{id:this.id}})
        },
        previewimage:function(event){
            this.preview= URL.createObjectURL(event.target.files[0]);
            const reader= new FileReader()
            reader.onload = event => {
                this.image=event.target.result
            }
            reader.readAsDataURL(event.target.files[0])
        },
    },
       
    created(){
        this.retrieve()
    }
    
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
    .background {
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
        margin-top: -42%;
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
        width: 35%;
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
    img {
        float: left;
        width: 40%;
        justify-content: center;
        margin-left: 60px
    }
    .title2 {
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        line-height: 58px;
        text-align: center;
        color: #1C746F;
        margin: 15px;
    }
    .imgfluid{
        justify-content:center;
        margin-left:30%;
        height:150px
    
    }

    



</style>