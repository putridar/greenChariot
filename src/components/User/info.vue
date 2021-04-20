<template>
    <div>
        <div class='bg'>
            <Head v-bind:id="id" class="head"></Head>
            <div class='content'>
                <div class='logo'>
                    Welcome to
                    <p class="greenlogo">green</p>
                    <p class="whitelogo">Chariot</p>
                </div>
                <div class='words'>
                    <div class='start'>
                        Our goals
                    </div>
                    <div class='explanation'>
                        Green chariot hopes to inculcate eco friendly habits within everyone by increasing awareness of the impact our carbon footprints can inflict on the environment and promoting ways to curb our emissions. We also aim to support green and eco friendly businesses doing their part to save the environment.
                    </div>
                    <br>
                    <div class='start'>
                        Understanding your carbon footprint 
                    </div>
                    <div class='explanation'>
                        Update details like your monthly electricity bill in our survey, and green chariot will construct an informative dashboard to visually track, analyze and display key emission performance indicators for you!
                        The data you provide us with will be analyzed, and green chariot will provide you with personalized carbon footprint reduction tips based on your current lifestyle choices.
                        Green chariot also has an information tab with educational and insightful articles related to the environment for you to read about!
                    </div>
                    <br>
                    <div class='start'>
                        Green rewards
                    </div>    
                    <div class='explanation'> 
                        We want to reward you for playing your part in saving the environment!
                        Users can earn points by participating in the weekly social media challenges and quizzes.
                        Gather enough points, and you can cash your points in for exclusive vouchers to save money when shopping at our partner green shops!
                    </div>              
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Head from './Header.vue'
import Footer from '../Footer.vue'

export default{
    name:'info',
    components: {
        Head,
        Footer
    },
    data(){
        return{
            id:this.$route.query.id,
        }
    },
    methods:{
        toInfo: function() {
            this.$router.push({name:'info',query:{id:this.id}})
        },
    },
}   
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    @import url('https://fonts.googleapis.com/css?family=Inter');
    .start{
        font-size:26px;
        font-weight:bold;
        font-family: Inter;
        color:#1C746F;
    }
    .explanation{
        font-size:22px;
    }
    .words{
        background-color: white;
        height: auto;
        width: auto;
        left: 50%;
        padding:2%;
        width:88%;
        border-radius:20px;
        margin-left:5%;
    }
    .greenlogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 70px;
        line-height: 103px;
        color: #1C746F;
        text-align: center;
        display: inline;
        margin-right: 0px;
    }
    .whitelogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 70px;
        line-height: 103px;
        color: #FFFFFF;
        text-align:center;
        display: inline;
        margin-left: 0px;
    }   
    .logo{
        height: 125px;
        width: 900px;
        left: 50%;
        margin-left:5%;
    }    
    .content{
        font-family: Montserrat;
        font-style: normal;
        font-size: 50px;
        margin: 10px;
        padding:10px;
    }
    .bg{
        background-color: #77c5fc;
        padding: 0px;
        margin: 0px;
        width: 100%;
        min-height: 150vh;
    }

</style>