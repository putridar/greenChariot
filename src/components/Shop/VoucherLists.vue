<template>
    <div>
        <div class="bg">
            <Head v-bind:id="id" class="head"></Head>
            <div class = "top">
                <p class="content">Your Vouchers:</p>
                <button class="btn2" v-on:click="add()">Add Voucher</button>
            </div>
            <div class = "shops">
                <ul>
                    <li v-for="(item,index) in vouchers" :key="index">
                        <h1 class="title">${{item.price}} Vouchers</h1><br>
                        <p class ="txt1">{{item.point}} Points</p><br>
                        <p class="txt1">{{item.coupons.length}} number left</p>
                        <button class="btn" v-on:click="deleteVoucher(item.id)">Delete</button>
                        <button class="btn" v-on:click="modify(item.id)">Modify</button>
                    </li>
                </ul>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Head from './HeaderShop.vue'
import db from '../../firebase.js'
import Footer from '../Footer.vue'
export default {
    name: 'Greenshops',
    components :{
        Head,
        Footer
    },
    data() {
        return {
            id: this.$route.query.id,
            imagename:'',
            code:'',
            shops: [],
            vouchers: [],
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('shops').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                this.vouchers = item.vouchers == undefined ? [] : item.vouchers
            })
        },
        register: function() {
            this.$router.push({ name: 'registershop', query: {id: this.id}})
        },  
        isclick:function(image, name){
            this.imagename = image
            this.$router.push({name:'scoopcode',query:{id:this.id,name:name}})
                
        },
        add: function() {
            this.$router.push({ name: 'addeditvoucher', query: {id: this.id, voucher:-1}})
        },
        deleteVoucher: function(id) {
            for (let x = 0; x < this.vouchers.length; x++) {
                if (this.vouchers[x].id == id) {
                    this.vouchers.splice(x,1);
                    break;
                }
            }
            db.firestore().collection('shops').doc(this.id).update({
                vouchers: this.vouchers
            }).then(() => {
                alert("Deleted successfuly");
                location.reload();
            })
        },
        modify: function(id) {
            this.$router.push({ name: 'addeditvoucher', query: {id: this.id, voucher:id}})
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
    .head {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
        justify-content: center;
        align-items: center;
    }
    li {
        flex-shrink: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        margin: 10px;
        border-radius: 20px;
        background-color: #FFFFFF;
        width:300px
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 26px;
        margin-top: 10px
    }
    .txt1 {
        font-family: Montserrat;
        font-size: 22px;
        margin-top: 1%;
        text-align: center;
    }
    .btn {
        background: #2D8F8A;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        width: 100px;
        height: 50px;
        text-align: center;
        cursor: pointer;
        margin: 15px;
    }
    .btn2 {
        background: #2D8F8A;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 22px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        width: 27%;
        height: 50px;
        text-align: center;
        cursor: pointer;
    }
    .pic {
        height: 230px;
        margin-top:5%;
        margin-bottom: 2%;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    img {
        justify-content: center;
        align-items: center;
        width: 60%;
        margin-top: 10%;
        margin-bottom: 20%
    }
    .top {
        justify-content: space-between;
        display: flex;
        margin-right: 100px;
        margin-top: 2%;
        margin-bottom: 2%
    }
    .content {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 35px;
        margin-left: 5%;
    }
    .shops {
        margin-top: 10px;
        align-items: center;
        display: flex;
        margin-left:3%;
        margin-right:3%
    }
</style>



