<template>
 <div class="background">
    <Head v-bind:id="id"></Head>
    <div class = "top">
        <p class="content">Our Green Shop Partners:</p>
        <button class = "btn" v-on:click="register()"> Want to be our partner? Register now! </button>
    </div>
    <div class = "shops">
        <ul>
            <li v-for="(item,index) in shops" :key="index">
                <div class="pic">
                    <img alt="logo" v-bind:src="item.imagename">
                </div>
                <h1 class="title">{{item.name}}</h1><br>
                <button class="btn" v-on:click="isclick(item.imagename, item.name)">Shop</button>
            </li>
        </ul>
    </div>
    </div>
</template>
<script>
import Head from './Header.vue'
import db from '../../firebase.js'
export default {
    name: 'Greenshops',
    components :{
        Head
    },
    data() {
        return {
            id: this.$route.query.id,
            imagename:'',
            code:'',
            shops: []
        }
    },
    methods: {
        fetchItems: function() {
            db.firestore().collection('shops').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.shops.push(doc.data())
                });
            }).catch(error => {console.log(error)
                alert(error)})
        },
        register: function() {
            this.$router.push({ name: 'registershop', query: {id: this.id}})
        },  
        isclick:function(image, name){
            this.imagename = image
            this.$router.push({name:'scoopcode',query:{id:this.id,imagename:this.imagename,name:name}})
                
        },
    },
    created() {
        this.fetchItems()
    }
}
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    .background {
        background-color: #9AD5FF;
        padding: 0px;
        margin: 0px;
        width: 100%;
        min-height: 100vh;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style-type: none;
        padding: 0;
        justify-content: center;
        align-items: center;
    }
    li {
        flex-shrink: 1;
        flex-basis: 20%;
        text-align: center;
        padding: 10px;
        margin: 10px;
        border-radius: 20px;
        background-color: #FFFFFF;
        min-height: 63vh;
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 26px;
        height: 70px;
        margin-top: 10px
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
        width: 37%;
        height: 50px;
        text-align: center;
        cursor: pointer;
    
    }
    .pic {
        height: 230px;
        margin-top:5%;
        margin-bottom: 2%;
        justify-content: center;
        align-items: center;
        display: flex;
    }
    img {
        justify-content: center;
        align-items: center;
        width: 60%;
        margin-top: 10%;
        margin-bottom: 20%
    }
    .top {
        justify-content: space-between;
        display: flex;
        margin-right: 100px;
        margin-top: -40%;
        margin-bottom: 2%
    }
    .content {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 35px;
        margin-left: 5%;
    }
    .shops {
        margin-top: 10px;
        align-items: center;
        display: flex;
    }
</style>



