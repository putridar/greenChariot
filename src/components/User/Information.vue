<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <br>
        <br>
        <p class = "txt"> Topic Filters:</p>
        <div class="filters">
            <input type="checkbox" id="Sustainability" class = "filterbutton" value="Sustainability" v-model="topics">
            <label class="checklabel" for="Sustainability">#Sustainability</label>
            <input type="checkbox" id="ClimateChange" class = "filterbutton" value="ClimateChange" v-model="topics">
            <label class="checklabel" for="ClimateChange">#ClimateChange</label>
            <input type="checkbox" id="Innovation" class = "filterbutton" value="Innovation" v-model="topics">
            <label class="checklabel" for="Innovation">#Innovation</label>
            <input type="checkbox" id="Nature" class = "filterbutton" value="Nature" v-model="topics">
            <label class="checklabel" for="Nature">#Nature</label>
        </div>
        <p>{{this.topics}}
        <div class = "content" v-for="art in this.articles" :key="art.id">
            <div class="image">
                <img alt="news" v-bind:src="art.picture">
            </div>
            <div class="caption">
                <p class = "txt"> {{art["title"]}}</p>
                <p class = "txt1">{{art["caption"].substring(0,500)}}...</p>
                <p class = "link"><a v-bind:href="art.link">Read more</a></p>
            </div>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'
import db from "../../firebase.js"
export default {
    name: 'Header',
    components :{
        Head
    },
    data() {
        return {
            articles: [],
            topics: []
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
        filteration : function(topic){
            if(topic)
            this.topics.push(topic)
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
        min-height: 100vh;
    }
    .checklabel {
        background: #2D8F8A;
        border-radius: 8px;
        border: #2D8F8A;
        font-family: Montserrat;
        font-weight: bold;
        font-size: auto;
        line-height: 30px;
        text-align: center;
        color: #FFFFFF;
        width: 50%;
        height: 2%;
        margin: 2%;
        cursor: pointer;
    }
    .checklabel:hover {
        background:#1C746F;
    }
    .checklabel:checked {
        background:#FFFFFF;
        color:#1C746F
    }
    .filters{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 8%;
    }
    .filterbutton {
        background: #2D8F8A;
        border-radius: 8px;
        border: #2D8F8A;
        font-family: Montserrat;
        font-weight: bold;
        font-size: auto;
        line-height: 30px;
        text-align: center;
        color: #FFFFFF;
        width: 10%;
        height: 2%;
        margin: 2%;
        cursor: pointer;
    }
    .content {
        display: flex;
        background-color: #FFFFFF;
        margin-top: 1%;
        margin-left: 10%;
        margin-right: 10%;
        height: 150px;
        width: 80%;
        border-radius: 8px;
        padding: 10px
    }
    img{
        max-width: 100%;
        min-height: 100%;
        border-radius: 8px;
    }
    .image{
        flex: 20%;
        width: 200px;
        height: 150px;
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
        font-size: 16px;
        font-weight: 500;
        margin-top: 1.25%;
        margin-left: 4%;
        margin-right: 3%;

    }
    .link {
        font-family: Montserrat;
        text-align: right;
        font-size: 16px;
        margin: 0%;
        font-weight: bold;
        margin-left: 4%;
        margin-right: 3%;
        padding: auto;
    }
    a:link{
        color: #1C746F;
    }
    a:visited {
        color:#1C746F;
    }
    a:hover {
        color:#9AD5FF;
    }
    a:active {
        color:#1C746F;
    }
    
</style>