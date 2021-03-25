<template>
 <div class="background">
    <Head v-bind:id="id"></Head>
    <p class="Content">Our Green Shop Partners:</p>
    <ul>
        <li>
            <div class="pic">
             <img alt="scoop" src="../assets/wholefoods.png">
            </div>
            <h1 class="title">Scoop Wholefoods</h1><br>
            <button class="btn" v-on:click="isclick()">Shop</button>

        </li>
        <li>
            <div class="pic">
             <img alt="green collection" src="../assets/greencollective.png">
            </div>
            <h1 class="title">The Green Collective SG</h1><br>
          <button class="btn" v-on:click="isclick()">Shop</button>
        </li>
        <li>
            <div class="pic">
             <img alt="eco.le" src="../assets/eco.le.png">
            </div>
            <h1 class="title">Eco.Le</h1><br>
            <button class="btn" v-on:click="isclick()">Shop</button>

        </li>
    </ul>
    </div>
</template>
<script>
    import Head from './Header.vue'
    export default{
        components:{
            Head
        },
        data(){
            return{
                id:this.$route.query.id
            }
        },
        methods:{
            isclick:function(){
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
        min-height: 80vh;
    }
    .title {
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 30px;
        height: 10%
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
        width: 50%;
        height: 50px;
        text-align: center;
        margin: 2%;
        cursor: pointer;
    }
    .pic {
        height: 45%;
        margin-top:5%;
        margin-bottom: 2%
    }
</style>



