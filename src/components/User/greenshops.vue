<template>
 <div class="background">
    <Head v-bind:id="id"></Head>
    <div class = "top">
        <p class="content">Our Green Shop Partners:</p>
        <button class = "btn" v-on:click="register()"> Want to be our partner? Register now! </button>
    </div>
    <div class = "shops">
        <ul>
            <li>
                <div class="pic">
                <img alt="scoop" src="../../assets/wholefoods.png">
                </div>
                <h1 class="title">Scoop Wholefoods</h1><br>
                <button class="btn" v-on:click="isclick()">Shop</button>

            </li>
            <li>
                <div class="pic">
                <img alt="green collection" src="../../assets/greencollective.png">
                </div>
                <h1 class="title">The Green Collective SG</h1><br>
            <button class="btn" v-on:click="isclick2()">Shop</button>
            </li>
            <li>
                <div class="pic">
                <img alt="eco.le" src="../../assets/eco.le.png">
                </div>
                <h1 class="title">Eco.Le</h1><br>
                <button class="btn" v-on:click="isclick3()">Shop</button>

            </li>
        </ul>
    </div>
    </div>
</template>
<script>
import Head from './Header.vue'
import db from '../firebase.js'
export default {
    name: 'Greenshops',
    components :{
        Head
    },
    data() {
        return {
            id: this.$route.query.id,
            imagename:'',
            code:''
        }
    },
    methods: {
        register: function() {
            this.$router.push({ name: 'registershop', query: {id: this.id}})
        },
        isclick:function(){
            db.firestore().collection('users').doc(this.id).update({
                    greenshops:{
                        imagename:"../../assets/wholefoods.png"
                    }

                })
                this.imagename="../../assets/wholefoods.png"
                this.$router.push({name:'scoopcode',query:{id:this.id}})
        },
        isclick2:function(){
            db.firestore().collection('users').doc(this.id).update({
                    greenshops:{
                        imagename:"../../assets/greencollective.png"
                    }

                })
                this.imagename="../../assets/greencollective.png"
                this.$router.push({name:'scoopcode',query:{id:this.id}})
        },
        isclick3:function(){
            db.firestore().collection('users').doc(this.id).update({
                    greenshops:{
                        imagename:"../../assets/eco.le.png"
                    }

                })
                this.imagename="../../assets/eco.le.png"
                this.$router.push({name:'scoopcode',query:{id:this.id}})
        }

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
        margin-left: 30px;
        margin-right: 30px;
    }
    li {
        flex-grow: 1;
        flex-basis: 300px;
        text-align: center;
        padding: 10px;
        margin: 10px;
        border-radius: 20px;
        background-color: #FFFFFF;
        min-height: 60vh;
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        height: 10%;
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
        width: 35%;
        height: 50px;
        text-align: center;
        cursor: pointer;
    
    }
    .pic {
        height: 50%;
        margin-top:5%;
        margin-bottom: 2%
    }
    .top {
        justify-content: space-between;
        display: flex;
        margin-right: 100px;
        margin-top: -40%;
    }
    .content {
        font-family: Montserrat;
        font-weight: bold;
        font-size: 30px;
        margin-left: 50px;
    }
    .shops {
        margin-top: 10px;
    }
</style>



