<template>
    <div class="background">
        <Head v-bind:id="id"></Head>
        <div class="content">
            <div class="pic">
                <img alt="scoop" v-bind:src="this.imagename">
            </div>
            <p class="title">Insert this code stated to get points!</p><br>
            <input type="text" id="codes" placeholder="Code"  ><br>
            <button class="btn" v-on:click="direct()">OK</button>
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
            imagename:this.$route.query.imagename,
            name:this.$route.query.name,
            storecode:'',
            redeemed:[],
            oldpoints:0,
        }
    },
    methods:{
        fetchPoints: function() {
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                this.oldpoints=snapshot.data().points
                this.newpoints=snapshot.data().points+500 
            })
        },
        fetchItems: function() {
            db.firestore().collection('codes').doc(this.name).get().then(snapshot => {
                this.storecode=snapshot.data().code
                this.redeemed=snapshot.data().redeemed
            })
            this.fetchPoints();
        },
        updateRedeemed: function() {
            db.firestore().collection('codes').doc(this.name).update({
                redeemed: this.redeemed,
            })
        },
        direct:function(){
            if (document.getElementById("codes").value.length==0){
                alert("You need to input a code!")
            } else if (document.getElementById("codes").value!==this.storecode){
                alert("Code is invalid!")
            } else if (this.redeemed.includes(this.id)){
                alert("You have already redeemed this code!")
            } else {
                this.redeemed.push(this.id)
                this.updateRedeemed();
                this.$router.push({name:'congratpage',query:{id:this.id,imagename:this.imagename,name:this.name,oldpoints:this.oldpoints}})
            }
        }   
    },
    created() {
        this.fetchItems();
    },
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
    .content {
        background-color: #FFFFFF;
        margin-top: -37%;
        margin-left: 33%;
        margin-right: 10%;
        height: 60%;
        width: 30%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px;
        animation: zoomIn ease 0.5s
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        margin: 10px;
        padding:10px
    }
    .pic {
        height: 45%;
        margin-top:5%;
        margin-bottom: 2%
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
    img {
        width:50%
    }
</style>