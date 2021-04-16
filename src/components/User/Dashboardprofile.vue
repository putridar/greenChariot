<template>
  <div class="chart">
    <h1 class="txt1" >Hi there, {{name}}! </h1>
    <h1 class="txt1" >Points: {{points}} </h1>
    <h3 class="txt">Find out how you can help</h3>
    <button class="dbButton" v-on:click="GreenShop()">Support Green Shops</button>
    <button class="dbButton" v-on:click="Challenges()">Earn Points</button>
    <button class="dbButton" v-on:click="Surveytime()">Recalibrate DashBoard Survey</button>
  </div>
</template>

<script>
import db from "../../firebase.js"

export default {
    name:"Dashboardprofile",
    data(){
        return {
            id: this.$route.query.id,
            name:"",
            points:0
        }
    },
    methods: {
        print: function() {
            console.log(this.name);
        },
        fetchName: function(){
            db.firestore().collection('users').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                const nam = item.name;
                this.name = nam.charAt(0).toUpperCase() + nam.slice(1);
                this.points = item.points;
                this.totalcarb = item.Emissions["total"];
            })
        }, 
        GreenShop : function() {
            this.$router.push({ name: 'greenshops', query: {id: this.id}})
        },
        Challenges : function() {
            this.$router.push({ name: 'challenges', query: {id: this.id}})
        },
        Surveytime : function() {
            this.$router.push({ name: 'survey', query: {id: this.id}})
        } 
    },
    mounted() {
        this.fetchName()
    } 

  
};
</script>

<style>
.char{
    display:flex;
    flex-direction: column;
}
.txt {
    color: #1C746F;
    text-align: left;
    font-size: 16px;
    margin-left: 2%;
    margin-top: 4%;
    margin-bottom: 6%;
}
.txt1 {
    color: #1C746F;
    font-size: 24px;
    margin-left: 2%;
    display: block ;
    text-align: left;
    display: block;
}
.dbButton{
    background: #2D8F8A;
    border-radius: 8px;
    border: #2D8F8A;
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: auto;
    line-height: 40px;
    text-align: center;
    color: #FFFFFF;
    width: 96%;
    height: 60px;
    margin: 2%;
    cursor: pointer;
    transition-duration: 0.4s;
}
.dbButton:hover{
    background: #2d8f4e;
}
</style>