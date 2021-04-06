<template>
    <div class="bg">
        <Head v-bind:id="id"></Head>
        <div class="content">
            <div class ="pic">
                <img alt="scoop" v-bind:src="this.image"><br>
                <label for="image" class="title">Change Image (Max file size: 1MB)</label><br>
                <input type="file" class ="inputfile" id = "image" @change="createImage"/>
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
            currimage: null,
            image: null,
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('shops').doc(this.id).get().then(snapshot => {
                var item = snapshot.data()
                this.image = item.imagename
                this.currimage = this.image
            })
        },
        save: function() {
            if (this.currimage != this.image) {
                db.firestore().collection('shops').doc(this.id).update({
                    imagename: this.image
                }).then(() => {
                    alert("Updated successfuly");
                    this.$router.push({ name: 'shopinfo', query: {id: this.id}})
                }).catch(error => {
                    alert("Your file is larger than 1MB!");
                    console.log(error)
                })
            } else {
                this.$router.push({ name: 'shopinfo', query: {id: this.id}})
            }
        },
        cancel: function() {
            this.$router.push({ name: 'shopinfo', query: {id: this.id}})
        },
        createImage: function(e) {
            const files = e.target.files || e.dataTransfer.files;
            var file = files[0]
            var img = new Image();
            img.crossOrigin = "anonymous";
            const reader = new FileReader();
            reader.onload = e => {
                this.image = e.target.result;
                img.src = e.target.result;
            }
            reader.readAsDataURL(file);
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
        min-height: 140vh;
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
        height: 850px;
        padding: 3px;
        
    }
    .title {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 24px;
        margin-top:1%
    }
    img {
        width:70%;
        margin-bottom:10%;
        margin-top:3%;
        margin-left: 5%;
    }
    label {
        font-family: Montserrat;
        font-size: 16px;
        height: 17%;
        margin:2%
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
        margin: 10%;
        margin-top: 2%;
        cursor: pointer;
    }
    .txt {
        margin-top:3%;
        margin-bottom: 2%;
        height: 60%
    }
    .inputfile {
        font-family: Montserrat;
        padding: 8px;
        width: 80%;
        margin: 2%;
        font-size: 20px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
    }
    .pic {
        width: 70%;
        margin-left: 20%;
        margin-right: 20%;
    }
</style>