<template>
  <div class="chart">
    <h2 class="title"> Recommendations</h2>
    <div :class='Transport<1828? "Positive": "Negative"'>
        <div>
            <p class="obs">Transport: </p>
            <p class="obs" id="transportObs"></p> 
            <p class="rec" id="transportRec"></p> 
        </div>
    </div>
    <div :class='Utility<1760? "Positive": "Negative"'>
        <div>
            <p class="obs">Utility: </p>
            <p class="obs" id="utilityObs"></p> 
            <p class="rec" id="utilityRec"></p>  
        </div>
    </div>
    <div :class='Food<3945? "Positive": "Negative"'>
        <div>
            <p class="obs">Food: </p>
            <p class="obs" id="foodObs"></p> 
            <p class="rec" id="foodRec"></p>  
        </div>
    </div>
    <div :class='Ecommerce<883?"Positive": "Negative"'>
        <div>
            <p class="obs">Ecommerce: </p>
            <p class="obs" id="ecommerceObs"></p> 
            <p class="rec" id="ecommerceRec"></p> 
        </div>
    </div>
  </div>
</template>

<script>
import db from "../../firebase.js"

export default {
    name:"recommendations",
    data(){
        return {
            id: this.$route.query.id,
            Transport:0,
            Utility:0,
            Food:0,
            Ecommerce:0

        }
    },methods: {
        print: function() {
            console.log(this.name);
        },
        fetchName: function(){
            db.firestore().collection('users').doc(this.id).get().then((snapshot) => {
                var item = snapshot.data()
                this.Transport=item.Emissions["transport"];
                this.Utility=item.Emissions["utility"];
                this.Food=item.Emissions["food"];
                this.Ecommerce=item.Emissions["ecommerce"];
            }).then(()=> this.recommend())
        },
        recommend: function(){
            if (this.Transport<1828){
                document.getElementById("transportObs").innerHTML = "Great! You can do more"
            }else{
                document.getElementById("transportObs").innerHTML = "Keep Working on it!"   
            }
            if (this.Utility<1760){
                document.getElementById("utilityObs").innerHTML = "Great! You can do more"
            }else{
                document.getElementById("utilityObs").innerHTML = "Keep Working on it!"
            }
            if (this.Food<3945){
                document.getElementById("foodObs").innerHTML = "Great! You can do more"
            }else{
                document.getElementById("foodObs").innerHTML = "Keep Working on it!"   
            }
            if (this.Ecommerce<883){
                document.getElementById("ecommerceObs").innerHTML = "Great! You can do more"
            }else{
                document.getElementById("ecommerceObs").innerHTML = "Keep Working on it!"
            }
            const Tarr = ["Filling your car tires with optimal air capacity could give you significantly more mileage",
            "Public transport systems are 7 to 10 times less Carbon emitting than private cars",
            "Investing in a bicycle could help reduce carbon footprint of short range travel"
            ];
            const Uarr = ["Opting for energy efficient appliances could stretch your dollar and reduce the emissions",
            "Support Renewable energy tech to accelerate the transition to Green energy sources ",
            "Install aerators on tap faucets to maximise water usage", 
            "Take shorter showers where possible"
            ];
            const Farr = ["Reducing red meat consumption could drastically reduce your carboon footprint",
            "Support plant based alternatives to meat", 
            "White meat is less carbon intensive than red meat", 
            "Plant based protein sources are readily available at low cost"
            ];
            const Earr = ["Refrain from impulse buying products that you dont need", 
            "Refrain from selecting Express delivery options that are generally more carbon intensive", 
            "Choose products that are locally sourced or shipped from locally to reduce footprint while travelling", 
            "Some products have protection packaging which end up being discarded and are carbon heavy"];
            document.getElementById("transportRec").innerHTML = Tarr[Math.floor(Math.random() * Tarr.length)]
            document.getElementById("utilityRec").innerHTML = Uarr[Math.floor(Math.random() * Uarr.length)]
            document.getElementById("foodRec").innerHTML = Farr[Math.floor(Math.random() * Farr.length)]
            document.getElementById("ecommerceRec").innerHTML = Earr[Math.floor(Math.random() * Earr.length)]
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
.title{
    margin-top: 3%;
    margin-left:5%;
}
.Positive{
    background-color: #abe0a4;
    margin-top: 2%;
    margin-left: 5%;
    margin-right: 5%;
    width: auto;
    font-size:1vw;
    border-radius: 8px;
    padding: 10px;
    flex-direction: column;
    flex:1
}
.Negative{
    background-color: #e0a4a4;
    margin-top: 1%;
    margin-left: 5%;
    margin-right: 5%;
    width: auto;
    height: auto;
    font-size:1vw;
    border-radius: 8px;
    padding: 10px;
    flex-direction: column;
    flex:1
}
.obs{
    margin-left:0%;
    font: 1%;
    margin-right: auto;
    font-style: normal;
    font-weight: bold;
    display: inline;
}
.rec{
    margin:1%;
    font-style: bold;
    font-weight: normal;
}
</style>