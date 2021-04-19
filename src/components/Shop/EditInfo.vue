<template>
    <div>
        <div class="bg">
            <Head v-bind:id="id" class="head"></Head>
            <div class="content">
                <div class = "txt">
                    <label for="name" class="title">Name</label><br>
                    <input type="text" id="name" placeholder="Name" v-model="name" class ="inputstyle" required><br>
                    <label for="desc" class="title">Description</label><br>
                    <textarea id="desc" placeholder="Description" v-model="desc" name="desc" rows="4" cols="50"></textarea><br>
                    <label for="address" class="title">Address</label><br>
                    <textarea id="address" placeholder="Address" v-model="address" name="address" rows="4" cols="50"></textarea><br>
                    <label for="website" class="title">URL of your shop website(Leave it blank if you dont have a website)</label><br>
                    <input type="website" class="inputstyle" placeholder="Link to Shop's Website" v-model="website"><br>
                    <button class="btn" v-on:click="validate();save();">Save</button>
                    <button class="btn" v-on:click="cancel()">Cancel</button>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Head from './HeaderShop.vue'
import db from "../../firebase.js"
import Footer from '../Footer.vue'
export default {
    name: 'Challenges',
    components :{
        Head,
        Footer
    },
    data() {
        return {
            id: this.$route.query.id,
            currdesc: '',
            currname: '',
            currcode: '',
            curraddress:'',
            desc: '',
            name: '',
            code: '',
            address:'',
            website:'',
            correcturl:true
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('shops').doc(this.id).get().then(snapshot => {
                var item = snapshot.data()
                this.desc = item.desc == undefined ? "" : item.desc
                this.name = item.name
                this.code = item.code == undefined ? "" : item.code
                this.address = item.address == undefined ? "" : item.address
                this.website= item.website
            })
        },
        save: function() {
            if (this.correcturl==false){
                this.correcturl=true
                return
            }
            db.firestore().collection('shops').doc(this.id).update({
                desc: this.desc,
                name: this.name,
                code: this.code,
                address: this.address,
                website: this.website
            }).then(() => {
                alert("Updated successfuly");
                this.$router.push({ name: 'shopinfo', query: {id: this.id}})
            })
        },
        cancel: function() {
            this.$router.push({ name: 'shopinfo', query: {id: this.id}})
        },
        validate:function(){
            if (this.website==''){
                return
            }
            var pattern = new RegExp('^(https?:\\/\\/)?'+ 
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
             '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
             '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
             '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
            '(\\#[-a-z\\d_]*)?$','i'); 
             if(pattern.test(this.website)==false){
                 alert("Please input a valid URL!")
                 this.correcturl=false
             }else{
                 if (this.website.indexOf('https://')==-1 || (this.website.indexOf('.com')==-1 && this.website.indexOf('.sg')==-1)){
                     alert('Please input a valid URL!')
                     this.correcturl=false
                 }
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
        min-height: 180vh;
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
        height: 870px;
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