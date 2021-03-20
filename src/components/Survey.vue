<template>
    <div class = "bg">
        <Head v-bind:id="id"></Head>
        <img alt="greenChariot" src="../assets/survey.png">
        <div class = "content">
            <p class = "title">How much do you consume on a monthly basis?</p>
            <p class = "txt1">Electricity</p>
            <input type="number" placeholder="Electricity bills" v-model="Electricity" required><br>
            <p class = "txt1">Water Expense</p>
            <input type="text" placeholder="Water bills" v-model="water" required><br>
            <p class = "txt1">Ecommerce</p>
            <input type="text"  placeholder="Number of items shipped" v-model="username" required><br>
            <p class = "txt1">Food</p>
            <input type="number" placeholder="Percentage of Homegrown food (ie. 20)" v-model="email" required><br>
            <button class = "create">Next</button>
            <p class = "txt"> More accurate Data helps us predict better :) </p>
        </div>
    </div>
</template>

<script>
import Head from './Header.vue'
export default {
    name: 'Header',
    components :{
        Head
    },
    data() {
        return {
            id: this.$route.query.id
        }
    },
    methods: {
        print: function() {
            console.log(this.name);
        }    
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
    .greenlogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 64px;
        line-height: 103px;
        color: #1C746F;
        text-align: left;
        margin: 50px;
        display: inline;
        margin-right: 0px;
    }
    .whitelogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 64px;
        line-height: 103px;
        color: #FFFFFF;
        text-align: left;
        margin: 50px;
        display: inline;
        margin-left: 0px;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
    }
    li {
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        margin: 10px;
        color: #1C746F;
    }
    img {
        float: left;
        width: 45%;
        height: 80%;
        justify-content: center;
        margin-left: -35%;
        margin-top: 2%;
    }
    .content {
        background-color: #FFFFFF;
        margin-top: 4%;
        margin-left: 45%;
        margin-right: 10%;
        height: 60%;
        width: 50%;
        justify-content: center;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        padding: 10px
    }
    .title {
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 25px;
        line-height: 58px;
        text-align: center;
        color: #1C746F;
        margin: 15px;
    }
    .signup {
        background: #2D8F8A;
        border-radius: 8px;
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        float: left;
        height: 70px;
        padding: 15px;
        border: #2D8F8A;
    }
    input {
        font-family: Montserrat;
        padding: 5px;
        width: 90%;
        margin: 1%;
        font-size: 16px;
        border-radius: 8px;
        border: 1px solid #E5E5E5;
        height: 10%
    }
    .create {
        background: #2D8F8A;
        border-radius: 8px;
        border: #2D8F8A;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        line-height: 44px;
        text-align: center;
        color: #FFFFFF;
        width: 80%;
        height: 60px;
        margin: 3%;
        cursor: pointer;
    }
    .txt {
        font-family: Montserrat;
        color: #1C746F;
        text-align: center;
        font-size: 16px;
        margin: 10px;
        cursor: pointer;
    }
    .txt1 {
        font-family: Montserrat;
        color: #1C746F;
        text-align: left;
        font-size: 16px;
        margin: 7px;
        margin-left: 4%;
        cursor: pointer;
        font-weight: bold;

    }
    
</style>