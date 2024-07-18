
function returnRoman(num) {
  const numerosRomanos = [
      { valor: 1000, simbolo: 'M' },
      { valor: 900, simbolo: 'CM' },
      { valor: 500, simbolo: 'D' },
      { valor: 400, simbolo: 'CD' },
      { valor: 100, simbolo: 'C' },
      { valor: 90, simbolo: 'XC' },
      { valor: 50, simbolo: 'L' },
      { valor: 40, simbolo: 'XL' },
      { valor: 10, simbolo: 'X' },
      { valor: 9, simbolo: 'IX' },
      { valor: 5, simbolo: 'V' },
      { valor: 4, simbolo: 'IV' },
      { valor: 1, simbolo: 'I' }
  ];

  return numerosRomanos.reduce((acc, { valor, simbolo }) => {
      while (num >= valor) {
          acc += simbolo;
          num -= valor;
      }
      return acc;
  }, '');
}




function createBuilding() {
    for (let i in buildings) {
      if (!did(i + "building") && buildings[i].unlocked) {
        const buildingdiv = document.createElement("div");
        buildingdiv.id = i + "building";
        buildingdiv.className = "building";
        buildingdiv.innerHTML = ' <img src="img/src/upgrades/C10.jpg" id="'+i+'buildingImage"> <div class="buildingInfo"> <span style="background: #463126; height: 1.8rem; font-size: 1.4rem;" id="'+i+'buildingName">Lumberjack Post</span> <span style="background: #7c7055; width: auto; padding: 0 1rem; font-family: fredoka; font-weight: 500;" id="'+i+'buildingLevel">10 / 10</span> <span style="background: #627775; width: auto; margin-left: auto; padding: 0 1rem; font-family: fredoka; font-weight: 500;"  id="'+i+'buildingTier">Tier: I</span> </div><span style="font-size: 1.15rem;" id="'+i+'buildingMoney"><img src="img/sys/coin.png" >221.3M Shells</span><span style="font-size: 1.15rem;" id="'+i+'buildingItem1"><img src="img/src/items/"'+buildings[i].item1+'".jpg">19K Mossy Supply Box</span><span style="font-size: 1.15rem; height: 3.5rem; background: #1B1B21; border-radius: 0.3rem; display:inline" id="'+i+'buildingDescription">Increases Max HP by 5% per level and something else that i forgot</span><span style="background: transparent; font-family: fredoka; font-weight: 400; font-size: 1.15rem;" id="'+i+'buildingStat">Current Bonus: 30%</span>';
        did("buildingList").appendChild(buildingdiv);

        did(i+'buildingName').innerHTML = buildings[i].name;
        did(i+'buildingDescription').innerHTML = buildings[i].description;
        buildings[i].price = Math.floor(300000 * Math.pow(1.3, buildings[i].level));
        buildings[i].item1Amount = Math.floor(1+buildings[i].level*2);
        //did(i+'buildingTier').innerHTML = "Tiere";



  
        buildingdiv.addEventListener("click", function () { 
          if(rpgPlayer.coins>=buildings[i].price && buildings[i].level<buildings[i].tier*10 && items[buildings[i].item1].count>=buildings[i].item1Amount){ 
            playSound("audio/craft.mp3")
            buildingdiv.style.animation = "";
        void buildingdiv.offsetWidth;
        buildingdiv.style.animation = "areaClick 0.3s 1";


            rpgPlayer.coins-=buildings[i].price;
            buildings[i].level++;
            items[buildings[i].item1].count-=buildings[i].item1Amount
            buildings[i].price = Math.floor(300000 * Math.pow(1.3, buildings[i].level));
            buildings[i].item1Amount = Math.floor(1+buildings[i].level*2);

            statsUpdate();
            updateStatsUI();
            updateCounters();
            createBuilding();

            addItem();


          } else playSound("audio/thud.mp3")

        });
          
      }


      if (did(i + "building")) {
        did(i+'buildingTier').innerHTML = "Tier "+returnRoman(buildings[i].tier);
        did(i+'buildingImage').src = "img/src/buildings/"+i+"U"+buildings[i].tier+".jpg";
        did(i+'buildingStat').innerHTML = 'Current Bonus:  '+ colorTag("x"+(1+buildings[i].statUp).toFixed(2),"#E57D08")
        did(i+'buildingLevel').innerHTML = buildings[i].level+"/"+buildings[i].tier*10;
        did(i+'buildingMoney').innerHTML = '<img src="img/sys/coin.png">'+ beautify(buildings[i].price) +" Shells";
        did(i+'buildingItem1').innerHTML = '<img src="img/src/items/'+buildings[i].item1+'.jpg">'+ beautify(buildings[i].item1Amount) +" "+items[buildings[i].item1].name+"";
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
        did(i+'researchImage').src = research[i].img;
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
    did(i+"researchBar").style.background = "linear-gradient(-90deg, black " + percentageEXP + "%, #319364 " + percentageEXP + "%)";
    did(i+'researchTime').innerHTML = convertSecondsToHMS(research[i].timer)
    }

if (research[i].timer<=0){
  research[i].status = "ready"
  createBuilding();
  createResearch();

}


}

if (research[i].status === "ready") {
  did(i+"researchBar").style.background = "#3ec986";
}



  }




}









document.addEventListener('DOMContentLoaded', garrisonInitialization);

function garrisonInitialization(){
    createBuilding();
    createResearch();
    researchTimer();
}