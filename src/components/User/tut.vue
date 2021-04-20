<template>
    <div>
        <div class='bg'>
            <div class='fade-in one'>
                <div class='logo'>
                    <p class="greenlogo">green</p>
                    <p class="whitelogo">Chariot</p>
                </div>
            </div>
            <div class='fade-in two'>
                <div class='slogan'>
                    <p class='subtitles'>going green has never been easier</p>
                </div>
            </div>
            <div class='fade-in three'> 
                    <div class='msg'>
                        Welcome {{this.username}}!<br><br>
                        We are green chariot, and we hope to assist you in playing your part to reduce your daily carbon footprint emissions.
                        <br><br>
                        Now, let's get started! 
                        <br>
                        Kindly help us fill in a short survey so that we can generate your personal dashboard.
                    </div>
                <button type='button' class='btn' v-on:click='toSurvey()'>Begin</button>
            </div>
        </div>
    </div>
</template>

<script>
import db from "../../firebase.js"

export default{
    name:'tut',
    components: {
    },
    data(){
        return{
            id:this.$route.query.id,
            username:'',
        }
    },
    methods:{
        toSurvey: function() {
            this.$router.push({name:'survey',query:{id:this.id}})
        },
        fetchItems: function() {
            db.firestore().collection('users').doc(this.id).get().then(snapshot => {
               this.username=snapshot.data().username
            })            
        }
    },
    created(){
        this.fetchItems()
    }                
}   
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    @import url('https://fonts.googleapis.com/css?family=Inter');
    .fade-in {
        opacity:0;
        opacity: 1 \9; 
        -webkit-animation:fadeIn ease-in 1;
        -moz-animation:fadeIn ease-in 1;
        animation:fadeIn ease-in 1;
        -webkit-animation-fill-mode:forwards;
        -moz-animation-fill-mode:forwards;
        animation-fill-mode:forwards;
        -webkit-animation-duration:1s;
        -moz-animation-duration:1s;
        animation-duration:1s;
    }
    .fade-in.one {
        -webkit-animation-delay: 0.1s;
        -moz-animation-delay: 0.1s;
        animation-delay: 0.1s;
    }
    .fade-in.two {
        -webkit-animation-delay: 3s;
        -moz-animation-delay: 3s;
        animation-delay: 3s;
    }
    .fade-in.three {
        -webkit-animation-delay: 6s;
        -moz-animation-delay: 6s;
        animation-delay: 6s;
    }
    @-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @-o-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @-ms-keyframes fadeIn { from { opacity:0; } to { opacity:1; } 
}
    .msg{
        font-family: Montserrat;
        font-size: 25px;
        color:black;
        text-align: center;
        display: inline;
        margin-right: 0px;  
        height: 200px;
        width: 50%;
        position:fixed;
        top: 45%;
        left: 50%;
        margin-top: -100px;
        margin-left: -400px;
    }
    .greenlogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 80px;
        line-height: 103px;
        color: #1C746F;
        text-align: center;
        display: inline;
        margin-right: 0px;
    }
    .whitelogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 80px;
        line-height: 103px;
        color: #FFFFFF;
        text-align:center;
        display: inline;
        margin-left: 0px;
    }
    .subtitles {
        font-family: Montserrat;
        font-size: 25px;
        line-height: 103px;
        color: #FFFFFF;
        text-align: center;
        display: inline;
    }
    .slogan {
        height: 200px;
        width: 900px;
        position:fixed;
        top: 15%;
        left: 50%;
        margin-left: -210px;    
    }
    .bg{
        background-color: #77c5fc;
        padding: 0px;
        margin: 0px;
        width: 100%;
        min-height: 110vh;
    }
    .logo{
        height: 200px;
        width: 900px;
        position:fixed;
        top: 20%;
        left: 50%;
        margin-top: -100px;
        margin-left: -240px;
    }
    .btn {
        background: #2D8F8A;
        border-radius: 8px;
        font-family: Montserrat;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
        cursor: pointer;
        position:fixed;
        top: 50%;
        left: 50%;
        margin-top: 125px;
        width:300px; 
        margin-left:-163px;
        padding:15px;
        border: solid black 1px;
    }

</style>