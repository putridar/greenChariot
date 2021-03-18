<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <label for = "imageLoader" class="ins">Screenshots</label>
        <input type="file" id ="imageLoader" @change="updateCanvasImage"><br>
        <p class ="ins">Make sure that your caption is visible</p>
        <canvas id="imageCanvas" ref="imageCanvas"></canvas>
        <div class = "content">
            <p class= "title"> {{status}} </p>
            <p class= "title"> Result: </p>
            <p class= "txt">{{result}}</p>
            <button class = "btn" v-on:click="check()">Check</button>
            <button class = "btn" v-on:click="cancel()">Cancel</button>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from "../firebase.js"

export default {
    name: 'Submission',
    components :{
        Head
    },
    data() {
        return {
            platform: this.$route.query.platform,
            id: this.$route.query.id,
            points: 0,
            dataUrl: '',
            status: '',
            hash: this.$route.query.hash,
            result: '',
            captions: []
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
                var item = snapshot.data()
                this.username = item.socialmedia
                this.points = item.points == undefined ? 0 : item.points
                this.captions = item.captions == undefined ? [] : item.captions
            }).catch(error => {console.log(error)
                alert(error)})
        },
        cancel: function() {
            this.$router.push({ name: 'socialmediachallenge', query: {id: this.id}})
        },
        check: function() {
            var invalidCaption = this.isValidCaption()
            var invalidUser = this.isValidUser()
            var isMultiple = this.isMultipleSubmission()
            var invalid = false
            if (invalidCaption) {
                alert("Your post is invalid. Make sure you use the correct hashtag!")
                invalid = true;
            } 
            if (invalidUser) {
                alert("Please post your photo using the same social media account when you registered!")
                invalid = true;
            }
            if (isMultiple) {
                alert("Make sure you do not submit the same file more than once and please use a different caption from your previous submission!")
                invalid = true;
            } 
            if (!invalid) {
                this.points += 10;
                this.captions.push(this.result);
                this.updatePoints();
            }
            
        },
        isValidCaption: function() {
            var invalid = false;
            for (let x = 0; x < this.hash.length; x++) {
                if(this.result.search(this.hash[x]) === -1) {
                    invalid = true
                    break;
                }
            }
            return invalid
        },
        isValidUser: function() {
            var invalid = false;
            if (this.username[this.platform] === "") {
                return true;
            }
            if(this.result.search(this.username[this.platform]) === -1) {
                invalid = true;      
            }
            return invalid
        },
        isMultipleSubmission: function() {
            var invalid = false;
            for (let x = 0; x < this.captions.length; x++) {
                if(this.result === this.captions[x]) {
                    invalid = true
                }
            }
            return invalid
        },
        updatePoints: function() {
            db.firestore().collection('users').doc(this.id).update({
                    points: this.points,
                    captions: this.captions
            }).then(() => {
                alert("Submission successful!");
                this.$router.push({ name: 'success', query: {id: this.id, points: this.points}})
            })
        },
        updateCanvasImage: function(ev) {
            this.status = 'Initialize'
            this.result = ""
            var self = this
            var reader, files = ev.target.files;
            reader = new FileReader();
            reader.onload = () => {
                var img = new Image();
                img.onload = function() {
                self.drawCanvasImage(img)
                }
                img.src = event.target.result;
            };  
            reader.readAsDataURL(files[0]);       
        },
    
        drawCanvasImage(img) {
            const Tesseract = require('tesseract.js');
            var canvas = this.$refs.imageCanvas;
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            this.dataUrl = canvas.toDataURL();
            this.status = 'Loading, please wait!'
            Tesseract.recognize(this.dataUrl, 'eng', {
                logger: log => {
                console.log(log);
                }
            })
            .then(result => {
                this.result = result.data.text
                this.status = ''
            })
            .catch(error => console.log(error))
        },
    },
    created() {
      this.fetchItems()    
    },
    mounted() {
        let externalScript = document.createElement('script')
        externalScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js')
        externalScript.setAttribute('src', 'https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js')
        document.head.appendChild(externalScript)
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
        min-height: 200vh;
    }
    .image {
        float: left;
        width: 40%;
        justify-content: center;
        margin-left: -23%;
        margin-top: 2%;
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 2%;
        margin-left: 55%;
        margin-right: 10%;
        min-height: 70vh;
        width: 35%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px;
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        line-height: 44px;
        margin: 10px;
        padding:10px
    }
    .txt {
        font-family: Montserrat;
        font-size: 24px;
        margin: 10px;
        padding:10px
    }
    .item {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 44px;
        margin: 10px;
        padding:10px
    }
    input {
        font-family: Montserrat;
        padding: 8px;
        width: 80%;
        margin: 8px;
        margin-left:8%;
        margin-right:8%;
        font-size: 24px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%;
        display: flex;
        align-items: center;
    }
    .ins {
        font-family: Montserrat;
        font-size: 24px;
        display: flex;
        align-items: center;
        margin: 8px;
        margin-left:8%;
        margin-right:8%;
        width: 80%;
        padding: 8px;

    }
    .btn {
        background: #2D8F8A;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
        width: 30%;
        height: 50px;
        margin: 20px;
        cursor: pointer;
    }
    canvas {
        float:left;
        width: 35%;
        height: 70%;
        justify-content: center;
        margin-left: 8%;
        margin-top: 2%;
    }
</style>