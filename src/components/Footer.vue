<template>
    <div class = "foot">
        <div class = "logo">
            <br>
            <p class="greenlogo">green</p>
            <p class="whitelogo">Chariot</p><br>
        </div>
        <p class = "desc"> A carbon footprint tracker application to help reducing carbon emissions</p>
        <p class = "desc"> 
            Any questions about us?<br>
            Contact us!<br>
            greenchariot@gmail.com<br>
        </p>
    </div>
</template>

<script>
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
        
  },
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    .foot {
        background-color: #73c2fa;
        padding: 0px;
        margin: 0px;
        width: 100%;
        text-align: center;
        height: 320px
    }
    .greenlogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 54px;
        line-height: 103px;
        color: #1C746F;
        text-align: left;
        display: inline;
        margin-right: 0px;
    }
    .whitelogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 54px;
        line-height: 103px;
        color: #FFFFFF;
        display: inline;
        margin-left: 0px;
    }
    .desc {
        font-family: Montserrat;
        font-size: 22px;
        color: #FFFFFF;
        margin: 20px;
        margin-left: 0px;
    }
    a {
        color: #1C746F;
        text-decoration: none;
        font-family: Montserrat;
        font-size: 16px;
        justify-content: center;
    }
    img {
        width: 30%;
        margin-top: 30px
    }
</style>