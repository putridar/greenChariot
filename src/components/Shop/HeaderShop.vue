<template>
    <div class = "background">
        <div class = "logo">
            <p class="greenlogo">green</p>
            <p class="whitelogo">Chariot</p><br>
        </div>
        <div class = "navi">
            <ul>
                <li class = "txtt"><router-link :to="{ name: 'dashboardShop', query: {id: this.id} }" exact>Dashboard</router-link></li>
                <li class = "txtt"><router-link :to="{ name: 'voucherlists', query: {id: this.id} }" exact>Voucher Lists</router-link></li>
                <li><router-link :to="{ name: 'editacc', query: {id: this.id} }" exact><div v-if="this.image==''"><img src='../../assets/user.png' class="user"></div><div v-else><img :src="this.image" class="user"/></div></router-link></li>
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
          image:null
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
          db.firestore().collection('shops').doc(this.id).get().then(snapshot => {
              temp=snapshot.data().imagename
              console.log(temp)
              if (temp=='' || temp == undefined){
                  this.image=''
              }else{
                  this.image=temp
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
        box-shadow: 0 5px 8px 0 #77c5fc;
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
        margin-left: 60%
       
    }
    li {
        flex-grow: 1;
        flex-basis: 60px;
        text-align: center;
        margin: 3px;
    }
    .txtt:hover {
        background-color: #FFFFFF
    }
    .txtt {
        justify-content: center;
        align-items: center;
        display: flex;
        height:95px
    }
    a {
        color: #1C746F;
        text-decoration: none;
        font-family: Montserrat;
        font-size: 16px;
        justify-content: center;
    }
    .user {
        width: 30%;
        margin-top: 20px
    }
</style>