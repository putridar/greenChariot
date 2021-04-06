<template>
    <div class="bg">
        <Head v-bind:id="id" class="head"></Head>
        <div class="content">
            <div class = "txt">
                <label for="price" class="title">Price Value</label><br>
                <input type="number" id="price" placeholder="Price" v-model.number="price" class ="inputstyle" required><br>
                <label for="points" class="title">Points Needed</label><br>
                <input id="points" placeholder="Points" v-model.number="points" name="points" class ="inputstyle" required><br>
                <button class="btn" v-on:click="save()">Save</button>
                <button class="btn" v-on:click="cancel()">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import Head from './HeaderShop.vue'
import db from "../../firebase.js"
export default {
    name: 'Challenges',
    components :{
        Head
    },
    data() {
        return {
            id: this.$route.query.id,
            voucher: this.$route.query.voucher,
            price: null,
            points: null,
            vouchers: [],
            idx: -1
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('shops').doc(this.id).get().then(snapshot => {
                var item = snapshot.data()
                this.vouchers = item.vouchers
                this.getVoucher();
            })
        },
        getVoucher: function() {
            if (this.voucher > -1) {
                for (let x = 0; x < this.vouchers.length; x++) {
                    var curr = this.vouchers[x];
                    if (this.voucher == curr.id) {
                        this.price = curr.price;
                        this.points = curr.point;
                        this.idx = x;
                    }
                }
            }
        },
        save: function() {
            if (this.voucher == -1) {
                var length = this.vouchers.length
                this.vouchers.push({id:length, price: this.price, point: this.points})
            } else {
                this.vouchers.splice(this.idx,1,{id:this.voucher, price: this.price, point: this.points})
            }
            db.firestore().collection('shops').doc(this.id).update({
                vouchers: this.vouchers
            }).then(() => {
                alert("Updated successfuly");
                this.$router.push({ name: 'voucherlists', query: {id: this.id}})
            })
        },
        cancel: function() {
            this.$router.push({ name: 'voucherlists', query: {id: this.id}})
        },
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
    .content {
        font-family: Montserrat;
        margin-top: 5%;
        margin-left: 20%;
        margin-right: 20%;
        margin-bottom: 5%;
        width: 60%;
        background: #FFFFFF;
        border-radius: 20px;
        padding: 3px;
    }
    .title {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 24px;
    }
    .title2 {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 24px;
        text-align: left;
        margin-top: 3%
    }
    img {
        width: 60%;
        margin-bottom:15%
    }
    label {
        font-family: Montserrat;
        font-size: 16px;
        height: 17%;
        margin:3%
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
        width: 20%;
        height: 50px;
        text-align: center;
        margin-left: 15%;
        margin-right: 15%;
        margin-top: 2%;
        cursor: pointer;
    }
    .pic {
        height: 80%;
        margin-top:5%;
        margin-bottom: 2%;
        margin-left:5%;
        float: left;
        width: 40%
    }
    textarea, .inputstyle {
        font-family: Montserrat;
        padding: 8px;
        width: 90%;
        margin: 3%;
        font-size: 20px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
    }
    .txt {
        margin-top:3%;
        margin-bottom: 2%;
        height: 60%
    }
    .inputfile {
        font-family: Montserrat;
        padding: 8px;
        width: 60%;
        margin: 2%;
        font-size: 20px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
    }
</style>