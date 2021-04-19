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
                <button type='button' class='btn' v-on:click='toInfo()'>Begin</button>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    components: {
    },
    data(){
        return{
            id:this.$route.query.id,
        }
    },
    methods:{
        toInfo: function() {
            this.$router.push({name:'info',query:{id:this.id}})
        }
    },
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
        top: 50%;
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
        top: 50%;
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
        margin-top: 100px;
        width:300px; 
        margin-left:-150px;
        padding:15px;
        border: solid black 1px;
    }

</style>