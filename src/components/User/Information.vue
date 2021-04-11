<template>
    <div>
        <div class = "bg">
            <Head v-bind:id="id" class="head"></Head>
            <p class = "txt2"> Topic Filters:</p>
            <div class="filters">
                <input type="checkbox" id="Sustainability" class = "filterbutton" value="sustainability" v-model="topics" v-on:change="update()">
                <label class="checklabel" for="Sustainability">#Sustainability X</label>
                <input type="checkbox" id="ClimateChange" class = "filterbutton" value="climatechange" v-model="topics" v-on:change="update()">
                <label class="checklabel" for="ClimateChange">#ClimateChange X</label>
                <input type="checkbox" id="Innovation" class = "filterbutton" value="innovation" v-model="topics" v-on:change="update()">
                <label class="checklabel" for="Innovation">#Innovation  X</label>
                <input type="checkbox" id="Nature" class = "filterbutton" value="nature" v-model="topics" v-on:change="update()">
                <label class="checklabel" for="Nature">#Nature  X</label>
            </div>
            <div class = "content" v-for="art in this.articles" :key="art.id">
                <div class="image">
                    <img alt="news" v-bind:src="art.picture">
                </div>
                <div class="caption">
                    <p class = "txt"> {{art["title"]}}</p>
                    <p class = "txt1">{{art["caption"].substring(0,300)}}...</p>
                    <p class = "txt3" v-for="i in art.type" :key="i.id">#{{i}}</p>
                    <p class = "link"><a v-bind:href="art.link">Read more</a></p>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from "../../firebase.js"
import Footer from '../Footer.vue'
export default {
    name: 'Header',
    components :{
        Head,
        Footer
    },
    data() {
        return {
            articles: [],
            topics: ["sustainability", "nature", "innovation", "climatechange"],
            id: this.$route.query.id,
        }
    },
    methods: {
        print: function() {
            console.log(this.name);
        },
        getArts : function(){
            db.firestore().collection('info').get().then((snapshot)=>{
                let od={}
                snapshot.docs.forEach(doc=>{
                    od=doc.data()
                    od.show=false
                    od.id=doc.id
                    this.articles.push(od)
                })
            })
        },
        update : function(){
            this.articles = []
            db.firestore().collection('info').where('type', 'array-contains-any',this.topics).get().then((snapshot)=>{
                console.log(snapshot.docs)
                console.log(this.topics)
                let od={}
                snapshot.docs.forEach(doc=>{
                    od=doc.data()
                    od.show=false
                    od.id=doc.id
                    this.articles.push(od)
                }).then(() => location.reload())
            })
        }

    },
    created(){
        this.getArts()
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    @import url('https://fonts.googleapis.com/css?family=Inter');
    .bg {
        background-color: #9AD5FF;
        padding: 0px;
        margin: 0px;
        width: 100%;
        min-height: auto;
    }
    .head {
        position: sticky;
        top: 0;
        position: -webkit-sticky;
    }
    .checklabel {
        background: #FFFFFF;
        color: #2D8F8A;
        border-radius: 8px;
        border: #2D8F8A;
        font-family: Montserrat;
        font-weight: bold;
        font-size: auto;
        line-height: 30px;
        text-align: center;
        width: 50%;
        height: 2%;
        margin: 2%;
        cursor: pointer;
    }
    .filters{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 8%;
        margin-left: 2%
    }
    .filterbutton {
        border-radius: 8px;
        font-family: Montserrat;
        font-weight: bold;
        font-size: auto;
        line-height: 30px;
        text-align: center;
        width: 8%;
        height: 2%;
        cursor: pointer;
    }
    .filterbutton:checked + label{
        background:#2D8F8A;
        color:#FFFFFF
    }
    .filterbutton:hover + label{
        background:#1C746F;
        color:#FFFFFF
    }
    .content {
        display: flex;
        background-color: #FFFFFF;
        margin-top: 1%;
        margin-left: 10%;
        margin-right: 10%;
        height: 130px;
        width: 80%;
        border-radius: 8px;
        padding: 10px;
    }
    img{
        max-width: 100%;
        min-height: 100%;
        border-radius: 8px;
    }
    .image{
        flex: 20%;
        width: 200px;
        height: 130px;
        background-position: center center;
        background-repeat: no-repeat;
        overflow: hidden;
    }
    .caption{
        flex: 80%;
        height: auto; 
        text-align: center;
    }
    .txt {
        font-family: Montserrat;
        color: #1C746F;
        text-align: left;
        font-size: 16px;
        margin: 1%;
        font-weight: bold;
        margin-left: 4%;
    }
    .txt1 {
        font-family: Montserrat;
        color: #1C746F;
        text-align: justify;
        font-size: 14px;
        font-weight: 500;
        margin-top: 1.25%;
        margin-left: 4%;
        margin-right: 3%;

    }
    .txt2 {
        font-family: Montserrat;
        color: #1C746F;
        text-align: left;
        font-size: 16px;
        margin: 1%;
        font-weight: bold;
        margin-left: 3%;
        margin-top: 3%;
    }
    .txt3{
        display: inline;
        font-family: Montserrat;
        color: #1C746F;
        font-size: 14px;
        font-weight: 500;
        font-style: italic;
        margin-top: 1.25%;
        margin-left: 4%;
        margin-right: 0%;
        float: left;
    }

    .link {
        display: inline;
        font-family: Montserrat;
        text-align: left;
        font-size: 14px;
        margin: 0%;
        font-weight: bold;
        margin-left: auto;
        margin-right: 3%;
        margin-top: 1.25%;
        padding: auto;
        float: right;
    }
    a:link{
        color: #1C746F;
    }
    a:visited {
        color:#1C746F;
    }
    a:hover {
        color:#2D8F8A;
    }
    a:active {
        color:#1C746F;
    }
    
</style>
