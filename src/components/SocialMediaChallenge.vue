<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <div class = "top">
            <h1 class = "content"> Challenges: </h1>
            <button class = "edit" v-on:click="edit()"> Edit Social Media Account </button>
        </div>
        <ul>
            <li>
                <img alt= "plant" v-bind:src="plantUrl">
                <h1 class = "title">Plant one/more trees</h1><br>
                <p>
                    Tell us your story in the caption!<br>
                    Please use these hashtags:<br>
                    #planttrees #greenchariot #reducecarbon
                </p>
                <button class = "btn" v-on:click="navigate(1)">Go</button>
            </li>
            <li>
                <img alt= "recycle" v-bind:src="recycleUrl">
                <h1 class = "title">Recycle!</h1><br>
                <p>
                    Tell us your story in the caption!<br>
                    Please use these hashtags:<br>
                    #recycle #greenchariot #reducecarbon
                </p>
                <button class = "btn" v-on:click="navigate(2)">Go</button>
            </li>
            <li>
                <img alt= "transport" v-bind:src="transportUrl">
                <h1 class = "title">Use Public Transport to Your Office/School</h1><br>
                <p>
                    Tell us your story in the caption!<br>
                    Please use these hashtags:<br>
                    #publictransport #greenchariot #reducecarbon
                </p>
                <button class = "btn" v-on:click="navigate(3)">Go</button>
            </li>
            <li>
                <img alt= "eat organic foods" v-bind:src="eatUrl">
                <h1 class = "title">Eat Organic Foods</h1><br>
                <p>
                    Tell us your story in the caption!<br>
                    Please use these hashtags:<br>
                    #organic #greenchariot #reducecarbon
                </p>
                <button class = "btn" v-on:click="navigate(4)">Go</button>
            </li>
        </ul>
    </div>
</template>

<script>
import Head from './Header.vue'
export default {
    name: 'SocialMediaChallenge',
    components :{
        Head
    },
    data() {
        return {
            plantUrl: require("../assets/plant.png"),
            recycleUrl: require("../assets/recycle.png"),
            transportUrl: require("../assets/transport.png"),
            eatUrl: require("../assets/eat.png"),
            id: this.$route.query.id,
            plantHash: ["#planttrees", "#greenchariot", "#reducecarbon"],
            recycleHash: ["#recycle", "#greenchariot", "#reducecarbon"],
            transportHash: ["#publictransport", "#greenchariot", "#reducecarbon"],
            eatHash: ["#organic", "#greenchariot", "#reducecarbon"],
        }
    },
    methods: {    
        navigate: function(id) {
            var item
            var pic
            var hash
            switch(id) {
                case 1:
                    item = "Plant one/more trees";
                    pic = this.plantUrl;
                    hash = this.plantHash;
                    break;
                case 2:
                    item = "Recycle!";
                    pic = this.recycleUrl;
                    hash = this.recycleHash;
                    break;
                case 3:
                    item = "Use Public Transport to Your Office/School";
                    pic = this.transportUrl;
                    hash = this.transportHash;
                    break;
                case 4:
                    item = "Eat Organic Foods";
                    pic = this.eatUrl;
                    hash = this.eatHash
                    break;
            }
            this.$router.push({ name: 'submission', query: {id: this.id, pic: pic, item: item, hash: hash}})
        },
        edit: function() {
            this.$router.push({ name: 'socialmedia', query: {id: this.id}})
        }
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
        min-height: 100vh;
    }
    .content {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 36px;
        margin-top: 30px;
        margin-left: -30%;

    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        height: 30%;
        margin-top: 5%;
    }
    .top {
        justify-content: space-between;
        display: flex;
        margin-right: 100px;
        margin-top: 10px;
    }
    .edit {
        background: #2D8F8A;
        border-radius: 8px;
        font-family: Montserrat;
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        width: 400px;
        height: 50px;
        text-align: center;
        margin-top: 2%;
        margin-bottom: 10px;
        cursor: pointer;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
        margin-left: 30px;
        margin-right: 30px
    }
    li {
        flex-grow: 1;
        flex-basis: 700px;
        text-align: center;
        padding: 10px;
        margin: 10px;
        border-radius: 20px;
        background-color: #FFFFFF;
    }
    img {
        float:left;
        width:37%;
    }
    p {
        font-family: Montserrat;
        font-size: 20px;
        text-align: center;
    }
    .btn {
        background: #2D8F8A;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        width: 30%;
        height: 50px;
        text-align: center;
        margin: 20px;
        cursor: pointer;
    }
</style>