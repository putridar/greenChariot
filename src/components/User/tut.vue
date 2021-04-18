<template>
    <div>
        <div class='bg'>
            <div class='fade-in'>
                <div class='logo'>
                    <p class="greenlogo">green</p>
                    <p class="whitelogo">Chariot</p>
                    <br>
                    <div class='slogan'>
                        <p class='subtitles'>going green has never been easier</p>
                    </div>
                </div>
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
    },
}   
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Montserrat');
    @import url('https://fonts.googleapis.com/css?family=Inter');
    .fade-in {
        animation: fadeIn ease 5s;
        -webkit-animation: fadeIn ease 5s;
        -moz-animation: fadeIn ease 5s;
        -o-animation: fadeIn ease 5s;
        -ms-animation: fadeIn ease 5s;
        background: linear-gradient(
            35deg,
        #77c5fc,
        #77c5fc
        );
    }
    @keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        } 
    }
    @-moz-keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }
    @-webkit-keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }
    @-o-keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }
    @-ms-keyframes fadeIn {
        0% {
            opacity:0;
        }
        100% {
            opacity:1;
        }
    }
    .greenlogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 64px;
        line-height: 103px;
        color: #1C746F;
        text-align: center;
        display: inline;
        margin-right: 0px;
    }
    .whitelogo {
        font-family: Inter;
        font-weight: bold;
        font-size: 64px;
        line-height: 103px;
        color: #FFFFFF;
        text-align:center;
        display: inline;
        margin-left: 0px;
    }.subtitles {
        font-family: Montserrat;
        font-size: 25px;
        line-height: 103px;
        color: #FFFFFF;
        text-align: center;
        display: inline;
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
        margin-left: -200px;
        border:10px solid black;
    }

</style>