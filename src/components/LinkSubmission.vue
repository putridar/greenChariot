<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <div class = "center">
            <img class = "image" alt="socialmedia" v-bind:src="this.pic">
        </div>
        <div class = "content">
            <p class = "title"> Put Your Post's Screenshots! </p>
            <p class = "item"> {{this.item}} </p><br>
            <label for="choose">Social Media Platform:</label>
            <select name="choose" id="choose" v-model="platform">
                <option value="ig">Instagram</option>
                <option value="fb">Facebook</option>
                <option value="twitter">Twitter</option>
            </select>
            <button class = "btn" v-on:click="submit()">Next</button>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'

export default {
    name: 'Submission',
    components :{
        Head
    },
    data() {
        return {
            platform: "",
            id: this.$route.query.id,
            pic: this.$route.query.pic,
            item: this.$route.query.item,
            hash: this.$route.query.hash,
            act: this.$route.query.act,
        }
    },
    methods: {
        submit: function() {
            this.$router.push({ name: 'verify', query: {id: this.id, platform: this.platform, hash:this.hash, act:this.act}})
        },
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
    .image {
        width: 100%;
        margin-top: 10%;
        margin-bottom: 10%;
    }
    .center {
        display: flex;
        align-content: center;
        justify-content: center;
        height: 100%;
        float: left;
        width: 35%;
        margin-left: -20%;
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 7%;
        margin-left: 55%;
        margin-right: 10%;
        min-height: 50vh;
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
    select {
        font-family: Montserrat;
        padding: 8px;
        width: 80%;
        margin: 8px;
        margin-left:8%;
        margin-right:8%;
        font-size: 22px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%;
        display: flex;
        align-items: center;
    }
    label {
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
</style>