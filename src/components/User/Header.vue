<template>
    <div class = "background">
        <div class = "logo">
            <p class="greenlogo">green</p>
            <p class="whitelogo">Chariot</p><br>
        </div>
        <div class = "navi">
            <ul>
                <li class = "txt"><router-link :to="{ name: 'Dashboard', query: {id: this.id} }" exact>Dashboard</router-link></li>
                <li class = "txt"><router-link :to="{ name: 'survey', query: {id: this.id} }" exact>Survey</router-link></li>
                <li class = "txt"><router-link :to="{ name: 'information', query: {id: this.id} }" exact>Information</router-link></li>
                <li class = "txt"><router-link :to="{ name: 'challenges', query: {id: this.id} }" exact>Quiz & Challenges</router-link></li>
                <li class = "txt"><router-link :to="{ name: 'greenshops', query: {id: this.id} }" exact>Green Shops</router-link></li>
                <li class = "txt"><router-link :to="{ name: 'signin', query: {id: this.id} }" exact>Rewards</router-link></li>
                <li><router-link :to="{ name: 'editprofile', query: {id: this.id} }" exact><img alt='profilepic' :src="this.image" /></router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
import db from '../../firebase.js'
export default {
  name: 'Header',
  data() {
      return {
          image:''
          
      }
  },
  props: {
      id:{
          type: String
      }
  },
  methods: {
      fetchimage:function(){
          var temp=''
          db.firestore().collection('users').doc(this.id).get().then(snapshot => {
              temp=snapshot.data().image
            if (temp!=''){
                this.image=temp
            }else{
                this.image='../../assets/user.png'
            }

              
              }
          )
      }
        
  },
  created(){
      this.fetchimage()
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
    }
    .logo {
        float:left
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
        margin-left: 40%
       
    }
    li {
        flex-grow: 1;
        flex-basis: 70px;
        text-align: center;
        margin: 3px;
    }
    .txt {
        margin-top: 50px
    }
    a {
        color: #1C746F;
        text-decoration: none;
        font-family: Montserrat;
        font-size: 16px;
    }
    img {
        width: 30%;
        margin-top: 30px
    }
</style>