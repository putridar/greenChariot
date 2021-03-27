<template>
    <div class="bg">
        <Head v-bind:id="id"></Head>
        <div class="content">
            <div class="pic">
                <img alt="scoop" v-bind:src="this.image"> <br>
                <label for="image" class="title2">Change Image (Max file size: 1MB)</label><br>
                <input type="file" class ="inputfile" id = "image" @change="createImage"/>
            </div>
            <div class = "txt">
                <label for="name" class="title">Name</label><br>
                <input type="text" id="name" placeholder="Name" v-model="name" class ="inputstyle" required><br>
                <label for="desc" class="title">Description</label><br>
                <textarea id="desc" placeholder="Description" v-model="desc" name="desc" rows="4" cols="50"></textarea><br>
                <label for="code" class="title">Shop's Unique Code</label><br>
                <input type="text" id="code" placeholder="Code" v-model="code" class ="inputstyle"><br>
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
            image: null,
            desc: '',
            name: '',
            code: ''
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('shops').doc(this.id).get().then(snapshot => {
                var item = snapshot.data()
                this.image = item.imagename
                this.desc = item.desc == undefined ? "" : item.desc
                this.name = item.name
                this.code = item.code == undefined ? "" : item.code
            })
        },
        save: function() {
            db.firestore().collection('shops').doc(this.id).update({
                    desc: this.desc,
                    name: this.name,
                    code: this.code,
                    imagename: this.image
                }).then(() => {
                    alert("Updated successfuly");
                    this.$router.push({ name: 'shopinfo', query: {id: this.id}})
                })
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
        min-height: 110vh;
    }
    .content {
        font-family: Montserrat;
        margin-top: 5%;
        margin-left: 5%;
        margin-right: 5%;
        margin-bottom: 5%;
        width: 90%;
        background: #FFFFFF;
        border-radius: 20px;
        height: 600px;
        padding: 3px
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
        margin: 3%;
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
        width: 45%;
        margin: 2%;
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