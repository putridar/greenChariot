<template>
    <div>
        <div class='bg'>
            <Head v-bind:id="id" class="head"></Head>
            <div class='content'>
                Welcome {{username}}!
                We are 
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Head from './Header.vue'
import Footer from '../Footer.vue'
import db from '../../firebase.js'

export default{
    components: {
        Head,
        Footer
    },
    data(){
        return{
            id:this.$route.query.id,
            username:''
        }
    },
    methods:{
        toInfo: function() {
            this.$router.push({name:'info',query:{id:this.id}})
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
    .content{
        font-family: Montserrat;
        font-style: normal;
        font-size: 30px;
        margin: 10px;
        padding:10px
    }
    .bg{
        background-color: #77c5fc;
        padding: 0px;
        margin: 0px;
        width: 100%;
        min-height: 110vh;
    }

</style>