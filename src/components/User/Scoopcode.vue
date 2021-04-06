<template>
    <div class="bg">
        <Head v-bind:id="id"></Head>
        <div class="content">
            <div class="pic">
                <img alt="scoop" v-bind:src="this.imagename">
            </div>
            <p class="title">Insert this code stated to get points!</p><br>
            <input type="text" id="codes" placeholder="Code" v-model="code" required><br>
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
            imagename:null,
            name:this.$route.query.name,
            storecode:'',
            redeemed:[],
            oldpoints:0,
            vouchers: [],
            code: '',
            shops: [],
            shopId: '',
            custlist: {}
        }
    },
    methods:{
        fetchPoints: function() {
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                this.oldpoints = snapshot.data().points
            })
        },
        fetchItems: function() {
            db.firestore().collection('shops').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    var item = doc.data()
                    if (item.name == this.name) {
                        this.shopId = doc.id
                        db.firestore().collection('shops').doc(doc.id).get().then(snapshot => {
                            var item = snapshot.data()
                            this.redeemed = item.redeemed == undefined ? [] : item.redeemed
                            this.storecode = item.code
                            this.imagename = item.imagename
                            this.day = item.day == undefined ? null : item.day
                            this.custlist = item.custlist == undefined ? {} : item.custlist
                        })
                    }
                });
            })
            this.fetchPoints();
        },
        updateRedeemed: function(id, redeemed, lst) {
            db.firestore().collection('shops').doc(id).update({
                redeemed: redeemed,
                custlist: lst
            })
            db.firestore().collection('users').doc(this.id).update({
                points: this.oldpoints + 500,
            })
        },
        direct:function(){
            var d = new Date();
            if (this.code.length == 0){
                alert("You need to input a code!")
            } else if (this.code !== this.storecode){
                alert("Code is invalid!")
            } else if (this.redeemed.includes(this.id)){
                alert("You have already redeemed this code!")
            } else {
                this.redeemed.push(this.id)
                if (d.getDay() in this.custlist) {
                    this.custlist[d.getDay()].push(this.id);     
                } else {
                    this.custlist[d.getDay()] = [this.id];
                }
                this.updateRedeemed(this.shopId, this.redeemed, this.custlist);
                this.$router.push({name:'congratpage',query:{id:this.id,name:this.name,oldpoints:this.oldpoints,shopId: this.shopId}})
            }
        }   
    },
    mounted() {
        this.fetchItems();
    },
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    .bg {
        background-color: #9AD5FF;
        padding: 0px;
        margin: 0px;
        width: 100%;
        min-height: 120vh;
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 2%;
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