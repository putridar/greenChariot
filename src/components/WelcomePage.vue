<template>
  <div class = "bg">
      <p class="greenlogo">green</p>
      <p class="whitelogo">Chariot</p><br>
      <img alt="greenChariot" src="../assets/welcome.png">
      <div class = "content">
        <p class="greentitle">green</p>
        <p class="whitetitle">Chariot</p><br>
        <p class = "desc">
            Help us to reduce global carbon emissions
            by tracking your carbon footprint!
        </p> 
        <div class = "buttons">
            <button class = "signup" v-on:click="signup()">SIGN UP</button>
            <button class = "signin" v-on:click="signin()">SIGN IN</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomePage',
  methods: {
        signup : function() {
            this.$router.push({ path: '/signup'})
        },
        signin : function() {
            this.$router.push({ path: '/signin'})
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
    .greentitle {
        font-family: Inter;
        font-weight: bold;
        font-size: 120px;
        line-height: 103px;
        color: #1C746F;
        text-align: center;
        margin-top: 200px;
        margin-bottom: 30px;
        display: inline;
        margin-right: 0px;
        text-align: center;
        
    }
    .whitetitle {
        font-family: Inter;
        font-weight: bold;
        font-size: 120px;
        line-height: 103px;
        color: #FFFFFF;
        text-align: center;
        margin-top: 200px;
        margin-bottom: 30px;
        display: inline;
        margin-left: 0px;
        text-align: center;
    }
    img {
        float: left;
        width: 40%;
        justify-content: center;
        margin-left: 50px
    }
    .content {
        margin-top: 8%;
        margin-left: 50%;
        margin-right: 10%;
        justify-content: center;
        align-items: center;
        text-align: center;
        height: 40%;
    }
    .desc {
        color: #FFFFFF;
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 40px;
        line-height: 34px;
        text-align: center;
        padding: 8px;
        margin-top: 50px;
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
        cursor: pointer;
    }
    .signin {
        background: #FFFFFF;
        border-radius: 8px;
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 36px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #2D8F8A;
        height: 70px;
        padding: 15px;
        border: #FFFFFF;
        cursor: pointer;
    }
    .buttons {
        display: flex;
        justify-content: space-around;
             
        margin-top: 50px;
    }
</style>