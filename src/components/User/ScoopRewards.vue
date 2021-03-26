<template>
 <div class="background">
     <Head v-bind:id="id"></Head>
     <div class="top">
         Your points:{{retrieve()}}
     </div>
     <div class="rewards">
      <li>
        <ul>
          <div class="pic">
           <img alt="scoop" src="this.imagename">
           <p class="title">$5 {{this.name}} Voucher</p><br>
           <p class="title2">500 points</p>
          </div>
        </ul>
        <ul>
          <div class="pic">
            <img alt="scoop" src="this.imagename">
            <p class="title">$10 {{this.name}} Voucher</p><br>
            <p class="title2">1000 points</p>
          </div>
        </ul>
        <ul>
         <div class="pic">
            <img alt="scoop" src="this.imagename">
            <p class="title">$15 {{this.name}} Voucher</p><br>
            <p class="title2">2000 points</p>
            
         </div>
        </ul>
      </li>
     </div>
 </div>
</template>
<script>
 import Head from './header.vue'
 import db from '../../firebase.js'
 export default{
     components:{
         Head
     },
     data(){
         return{
            id:this.$route.query.id,
            imagename:this.$route.query.imagename,
            name:this.$route.query.name,

         }
     },
     methods:{
         retrieve:function(){
             db.firestore().collection('users').doc(this.id).get().then(snapshot=>{
                 return snapshot.data().points
         })
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
    .top {
        justify-content: space-between;
        display: flex;
        margin-right: 100px;
        margin-top: -40%;
    }
    .rewards {
        margin-top: 10px;
    }
    .title{
        font-family: Montserrat;
        font-size: 25px;
        text-align: center;
        height: 17%;
        padding: 2%;
        margin:2%
    }
    .title2{
        font-family: Montserrat;
        font-size: 16px;
        text-align: center;
        height: 17%;
        padding: 2%;
        margin:2%
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
    .pic {
        height: 45%;
        margin-top:5%;
        margin-bottom: 2%;
    }
</style>