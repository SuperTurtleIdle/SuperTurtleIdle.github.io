
function createBuilding() {
    for (let i in buildings) {
      if (!did(i + "building") && buildings[i].unlocked) {
        const buildingdiv = document.createElement("div");
        buildingdiv.id = i + "building";
        buildingdiv.className = "building";
        buildingdiv.innerHTML = ' <div class="building1"> <div class="buildingLeft"> <span id="'+i+'buildingLevel">14/20</span> <img id="'+i+'buildingImage" src="img/src/upgrades/R10.jpg"></div> <p> <strong id="'+i+'buildingName">Lumberjack Post</strong> <br> <span id="'+i+'buildingMoney">❖ 12K [Turtle Coins]</span> <br> <span id="'+i+'buildingItem1">❖ 310K [Spooky Wood]</span> <br> <span style="background: transparent; font-size: 1.5vh; padding: 0%;" id="'+i+'buildingDescription">Increases Max HP by 0.1% per level<br><br></span> <strong class="logStat" id="'+i+'buildingStat">[Current Bonus: 10%]</strong> </p> </div> <div class="building2">Left Click to <FONT COLOR="lawngreen">&nbsp;Buy</FONT></div>';
        did("buildingList").appendChild(buildingdiv);

        did(i+'buildingImage').src = "img/src/upgrades/"+buildings[i].img+".jpg";
        did(i+'buildingName').innerHTML = buildings[i].name;
        did(i+'buildingDescription').innerHTML = buildings[i].description;
        did(i+'buildingStat').innerHTML = '[Current Bonus: '+beautify((buildings[i].statUp)*100)+'%]'

        buildings[i].price = Math.floor(500000 * Math.pow(1.3, buildings[i].level));
        buildings[i].item1Amount = Math.floor(1+buildings[i].level*2);

  
        buildingdiv.addEventListener("click", function () { 
          if(rpgPlayer.coins>=buildings[i].price && buildings[i].level<buildings[i].maxLevel && items[buildings[i].item1].count>=buildings[i].item1Amount){ 
            playSound("audio/craft.mp3")
            buildingdiv.style.animation = "";
        void buildingdiv.offsetWidth;
        buildingdiv.style.animation = "gelatine 0.3s 1";


            rpgPlayer.coins-=buildings[i].price;
            buildings[i].level++;
            items[buildings[i].item1].count-=buildings[i].item1Amount
            buildings[i].price = Math.floor(500000 * Math.pow(1.3, buildings[i].level));
            buildings[i].item1Amount = Math.floor(1+buildings[i].level*2);

            createBuilding();
            statsUpdate();
            updateStatsUI();
            updateCounters();
            did(i+'buildingStat').innerHTML = '[Current Bonus: '+beautify((buildings[i].statUp)*100)+'%]'


          } else playSound("audio/thud.mp3")

        });
          
      }


      if (did(i + "building")) {
        did(i+'buildingLevel').innerHTML = buildings[i].level+"/"+buildings[i].maxLevel;
        did(i+'buildingMoney').innerHTML = "❖ "+ beautify(buildings[i].price) +" [Turtle Coins]";
        did(i+'buildingItem1').innerHTML = "❖ "+ beautify(buildings[i].item1Amount) +" ["+items[buildings[i].item1].name+"]";
      }
  
    
    }
  }

stats.researchedBuildings = 0;

function createResearch() {
    for (let i in research) {
      if (!did(i + "research") && research[i].unlocked && research[i].status !== "completed") {
        researchSnapshot = research[i].timer
        const researchdiv = document.createElement("div");
        researchdiv.id = i + "research";
        researchdiv.className = "researchItem";
        researchdiv.innerHTML = ' <img id="'+i+'researchImage" src="img/src/upgrades/C12.jpg"><p><span id="'+i+'researchName">Ghostwood Logs</span><span id="'+i+'researchPrice">1500M <img src="img/sys/coin.png" /></span><span style="background: rgb(180, 87, 58);" id="'+i+'researchTime">8:25:00</span><span style="background: rgb(180, 87, 58);" id="'+i+'researchStatus">&#8987;</span><br><br></p><div class="researchBar" id="'+i+'researchBar"></div>';
        did("researchList").appendChild(researchdiv);

        did(i+'researchName').innerHTML = research[i].name;
        did(i+'researchImage').src = "img/src/upgrades/"+research[i].img+".jpg";
        did(i+'researchPrice').innerHTML = beautify(research[i].price) + ' <img src="img/sys/coin.png" />';
        did(i+'researchTime').innerHTML = convertSecondsToHMS(research[i].timer)
        research[i].timerMax = research[i].timer;
  
        did(i + "research").addEventListener("click", function () {
          if(rpgPlayer.coins>=research[i].price && research[i].status === "waiting"){
            playSound("audio/button8.mp3")
            rpgPlayer.coins-=research[i].price;
            research[i].status = "researching";
            did(i + "research").style.animation = "levelUp 1s 1";
            createResearch();
            researchTimer();
          }
          if (research[i].status === "ready") {
            playSound("audio/retro2.mp3")
            stats.researchedBuildings++;
            eval(research[i].effect);
            research[i].status = "completed";
            did(i + "research").style.animation = "shrinkFadeOut 0.3s 1";
            
            setTimeout(() => {did(i+"research").remove() }, 200);
              
            
            createBuilding();
            createResearch();
          }
        });
          
      }

      if (research[i].status === "researching"){
        did(i+'researchStatus').innerHTML = '&#x1f52c;';
        did(i+'researchStatus').style.background = '#5eb3bd'
      }

      if (research[i].status === "ready"){
        did(i+'researchStatus').innerHTML = '&#10003;';
        did(i+'researchStatus').style.background = '#7be86b'
        did(i+'researchTime').innerHTML = 'Completed';
      }

    
    }
  }

  setInterval(() => { researchTimer() }, 1000);
    

function researchTimer(){
  for (let i in research) { 

if (research[i].status === "researching") {
  research[i].timer--

  if (stats.currentCategory === "campContainer"){
    let percentageEXP = (research[i].timer / research[i].timerMax) * 100;
    did(i+"researchBar").style.background = "linear-gradient(-90deg, black " + percentageEXP + "%, rgb(104, 237, 255) " + percentageEXP + "%)";
    did(i+'researchTime').innerHTML = convertSecondsToHMS(research[i].timer)
    }

if (research[i].timer<=0){
  research[i].status = "ready"
  createBuilding();
  createResearch();

}


}

if (research[i].status === "ready") {
  did(i+"researchBar").style.background = "linear-gradient(-90deg, rgb(104, 237, 255) 0%, rgb(104, 237, 255) 100%)";
}



  }




}

document.addEventListener('DOMContentLoaded', garrisonInitialization);

function garrisonInitialization(){
    createBuilding();
    createResearch();
    researchTimer();
}