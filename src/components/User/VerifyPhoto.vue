<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <label for = "imageLoader" class="ins">Screenshots (Make sure that your caption is visible)</label>
        <input type="file" id ="imageLoader" @change="updateCanvasImage"><br>
        <!--<label for = "image" class = "ins">Upload Photo (the one that you post)</label>
        <input type="file" id = "image" @change="imageClassifier" />-->
        <div class ="left">
            <canvas id="imageCanvas" ref="imageCanvas"></canvas><br>
            <!--<p class="ins">Original Photo:</p>
            <img v-show="uploadedImage" class="preview" :src="uploadedImage"/>-->
        </div>
        <div class = "content">
            <p class= "title"> {{status}} </p>
            <p class= "title"> Caption: </p>
            <p class= "txt">{{result}}</p>
            <p class= "title" v-show="this.label.length!==0"> Label: </p>
            <p class= "txt" v-show="this.label.length!==0">{{label}}</p>
            <!--<p class= "title"> Class: </p>
            <p class= "txt">{{classify}}</p>-->
            <button class = "btn" v-on:click="check()">Check</button>
            <button class = "btn" v-on:click="cancel()">Cancel</button>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from "../../firebase.js"

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
            act: this.$route.query.act,
            result: '',
            captions: [],
            label: [],
            pic: null,
            loading: false,
            classify: null,
            uploadedImage: '',
            screenshot: '',
            plant: ['potted plant', 'vase', 'person', 'flower', 'plant', 'tree'],
            recycle: ['person','trash', 'bottle', 'book', 'paper','umbrella', 'cell phone','laptop','keyboard','tablet','cup','stop sign','toilet','wine glass','vase','oven','scissors','bed','bowl','knife','spoon','fork','plate','refrigerator'],
            transport: ['bus','train','person','chair'],
            eat: ['person','bowl','banana','carrot','apple','cup','broccoli','orange','bottle','pizza','sandwich','knife','beef','cow','chicken','pork','cake','suitcase','spoon','egg']
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
            var validCaption = this.isValidCaption()
            var validUser = this.isValidUser()
            var isMultiple = this.isMultipleSubmission()
            var invalid = false
            var validPhoto = this.isValidPhoto()
            if (!validCaption) {
                alert("Your post is invalid. Make sure you use the correct hashtag!")
                invalid = true;
            } 
            if (!validUser) {
                alert("Please post your photo using the same social media account when you registered!")
                invalid = true;
            }
            if (isMultiple) {
                alert("Make sure you do not submit the same file more than once and please use a different caption from your previous submission!")
                invalid = true;
            }
            if (!validPhoto) {
                alert("Please post the correct photo based on the category you choose!")
                invalid = true;
            }
            if (!invalid) {
                this.points += 10;
                this.captions.push(this.result);
                this.updatePoints();
            }
            
        },
        isValidCaption: function() {
            var valid = true;
            for (let x = 0; x < this.hash.length; x++) {
                if(this.result.search(this.hash[x]) === -1) {
                    valid = false
                    break;
                }
            }
            return valid
        },
        isValidUser: function() {
            var valid = true;
            if (this.username[this.platform] === "") {
                return true;
            }
            if(this.result.search(this.username[this.platform]) === -1) {
                valid = false;      
            }
            return valid
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
        isValidPhoto: function() {
            var found = false
            if (this.label.length === 0) {
                return true
            }
            for (let x = 0; x < this.label.length; x++) {
                var item = this.label[x]
                if (this.act === "plant") {
                    if (item in this.plant) {
                        found = true
                    }
                } else if (this.act === "recycle") {
                    if (item in this.recycle) {
                        found = true
                    }
                } else if (this.act === "transport") {
                    if (item in this.transport) {
                        found = true
                    }
                } else {
                    if (item in this.eat) {
                        found = true
                    }
                }
            }
            return found
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
                this.screenshot = event.target.result;
            };  
            reader.readAsDataURL(files[0]);       
        },
    
        drawCanvasImage: function(img) {
            const Tesseract = require('tesseract.js');
            const cocoSsd = require('@tensorflow-models/coco-ssd');
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

            cocoSsd.load().then(model => {
                this.model = model
                model.detect(img).then((predictions) => {
                    const font = "16px sans-serif";
                    ctx.font = font;
                    ctx.textBaseline = "top";
                    var res = []
                    predictions.forEach(prediction => {
                        const x = prediction.bbox[0];
                        const y = prediction.bbox[1];
                        const width = prediction.bbox[2];
                        const height = prediction.bbox[3];
                        // Draw the bounding box.
                        ctx.strokeStyle = "#00FFFF";
                        ctx.lineWidth = 4;
                        ctx.strokeRect(x, y, width, height);
                        // Draw the label background.
                        ctx.fillStyle = "#00FFFF";
                        const textWidth = ctx.measureText(prediction.class).width;
                        const textHeight = parseInt(font, 10); // base 10
                        ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
                    });

                    predictions.forEach(prediction => {
                        const x = prediction.bbox[0];
                        const y = prediction.bbox[1];
                        // Draw the text last to ensure it's on top.
                        ctx.fillStyle = "#000000";
                        ctx.fillText(prediction.class, x, y);
                        res.push(prediction.class)
                    });
                    console.log('Predictions: ');
                    console.log(predictions);
                    this.label = res;
                })
            });
        },
        imageClassifier: function(e) {
            this.loading = true
            const files = e.target.files || e.dataTransfer.files;
            this.createImage(files[0]);
            
        },

        createImage: function(file) {
            const mobilenet = require('@tensorflow-models/mobilenet');
            this.classify = []
            var img = new Image();
            img.crossOrigin = "anonymous";
            const reader = new FileReader();
            reader.onload = e => {
                this.uploadedImage = e.target.result;
                img.src = e.target.result;
                mobilenet.load().then(response => {
                    response.classify(img).then(result => {
                        this.loading = false
                        this.classify = result
                    })
                })
            }
            reader.readAsDataURL(file);
            this.match()
        },
        match: function() {
            var Jimp = require('jimp');
            Jimp.read("../assets/eat.png").then(image => {
                Jimp.read("../assets/plant.png").then(img => {
                    var diff = Jimp.diff(image, img, 0.1);
                    console.log(diff.percent);
                })
            })
        }
    },
    created() {
      this.fetchItems()    
    },
    mounted() {
        let externalScript = document.createElement('script')
        externalScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js')
        externalScript.setAttribute('src', 'https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js')
        externalScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet')
        externalScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/tensorflow/1.2.10/tf.min.js')
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
        animation: slide 1.5s
    }
    @keyframes slide {
        from {
            transform: translateX(30%);
            opacity: 0
        }

        to {
            transform: translateX(0%);
            opacity: 1
        }
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        line-height: 44px;
        margin: 10px;
        padding:10px
    }
    .txt {
        font-family: Montserrat;
        font-size: 20px;
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
        font-size: 20px;
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
        width: 80%;
        height: 70%;
        justify-content: center;
        margin-left: 20%;
        margin-top: 2%;
    }
    .preview {
        float: left;
        height: 70%;
        width: 100%;
        justify-content: center;
        margin-left: 9%;
        margin-top: 2%;
    }
    .left {
        float: left;
        width: 35%
    }
</style>