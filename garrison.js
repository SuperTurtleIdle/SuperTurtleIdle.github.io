
function returnRoman(num) {

  if (num===0) return 0
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


setInterval(garrisonTick, 30000); //default 30000

function garrisonTick(){

  for(let i in buildings){
    if (buildings[i].progress<8640 && buildings[i].unlocked){


      buildings[i].progress++






    }
  }








  garrisonProgressVisual()

}

function garrisonProgressVisual(){

  for(let i in buildings){
    if (buildings[i].unlocked){


      did(i+'buildingProgress').style.width = (buildings[i].progress / 8640) * 100+"%"



    }
  }



}

function createBuilding() {
    for (let i in buildings) {
      if (!did(i + "building") && buildings[i].unlocked) {
        const buildingdiv = document.createElement("div");
        buildingdiv.id = i + "building";
        buildingdiv.className = "building";
        buildingdiv.innerHTML = ' <img src="img/src/upgrades/C10.jpg" id="'+i+'buildingImage"> <div class="buildingInfo"> <span style="background: #463126; height: 1.8rem; font-size: 1.4rem;" id="'+i+'buildingName">Lumberjack Post</span> <span style="background: #7c7055; width: auto; padding: 0 1rem; font-family: fredoka; font-weight: 500;" id="'+i+'buildingLevel">10 / 10</span> <span style="background: #627775; width: auto; margin-left: auto; padding: 0 1rem; font-family: fredoka; font-weight: 500;"  id="'+i+'buildingTier">Tier: I</span> </div><span style="font-size: 1.15rem;" id="'+i+'buildingMoney"><img src="img/sys/coin.png" >221.3M Shells</span><span style="height:0.7rem"><div class="buildingProgress" id="'+i+'buildingProgress"></div></span><span style="font-size: 1.15rem; height: 3.5rem; background: #1B1B21; border-radius: 0.3rem; display:inline" id="'+i+'buildingDescription">Increases Max HP by 5% per level and something else that i forgot</span>';
        did("buildingList").appendChild(buildingdiv);

        did(i+'buildingName').innerHTML = buildings[i].name;
        did(i+'buildingDescription').innerHTML = buildings[i].description;
        buildings[i].price = Math.floor(1000000 * Math.pow(1.3, buildings[i].level-1));
        //buildings[i].item1Amount = Math.floor(1+buildings[i].level*2);
        //did(i+'buildingTier').innerHTML = "Tiere";

        tooltipBuildings(i)



  
        buildingdiv.addEventListener("contextmenu", function () { //upgrade
          if(rpgPlayer.coins>=buildings[i].price && buildings[i].level<buildings[i].tier*10){ 
            playSound("audio/craft.mp3")
            buildingdiv.style.animation = "";
        void buildingdiv.offsetWidth;
        buildingdiv.style.animation = "areaClick 0.3s 1";


            rpgPlayer.coins-=buildings[i].price;
            buildings[i].level++;
            //items[buildings[i].item1].count-=buildings[i].item1Amount
            buildings[i].price = Math.floor(1000000 * Math.pow(1.3, buildings[i].level-1));
            //buildings[i].item1Amount = Math.floor(1+buildings[i].level*2);

            statsUpdate();
            updateStatsUI();
            updateCounters();
            createBuilding();

            addItem();


          } else playSound("audio/thud.mp3")

        });


        buildingdiv.addEventListener("click", function () { //collect
          if(buildings[i].progress>99){ 
            playSound("audio/heal.mp3")
            playSound("audio/button9.mp3")

            buildingdiv.style.animation = "";
            void buildingdiv.offsetWidth;
            buildingdiv.style.animation = "gelatine 0.3s 1";


            let buildingReward = Math.ceil(buildings[i].progress/100*(buildings[i].level*4))


            let mat1 = ""
            if ("mat1" in buildings[i]) {mat1 = "+ "+beautify(buildingReward)+ " "+items[buildings[i].mat1].name+"<br>"; rareItemDrop(buildings[i].mat1, 1, buildingReward)}
            let mat2 = ""
            if ("mat2" in buildings[i]) {mat2 = "+ "+beautify(buildingReward)+ " "+items[buildings[i].mat2].name+"<br>"; rareItemDrop(buildings[i].mat2, 1, buildingReward)}
            let mat3 = ""
            if ("mat3" in buildings[i]) {mat3 = "+ "+beautify(buildingReward)+ " "+items[buildings[i].mat3].name+"<br>"; rareItemDrop(buildings[i].mat3, 1, buildingReward)}

            createFloatingText('<p>'+mat1+mat2+mat3)








            mat1 = ""
            if ("mat1" in buildings[i]) mat1 = bestiaryItem(buildings[i].mat1)+"<br>"
            mat2 = ""
            if ("mat2" in buildings[i]) mat2 = bestiaryItem(buildings[i].mat2)+"<br>"
            mat3 = ""
            if ("mat3" in buildings[i]) mat3 = bestiaryItem(buildings[i].mat3)+"<br>"
    
            did("tooltipDescription").innerHTML = bestiaryTag("Left Click to Collect","transparent")+bestiaryTag("Right Click to Upgrade","transparent")+bestiaryTag("⛏️ Gathering ⛏️")+mat1+mat2+mat3+bestiaryTag("⏱️ Progress ⏱️")+"Not enough materials to collect yet."
    

           
            buildings[i].progress=0


            garrisonProgressVisual()
            addItem();




          } else playSound("audio/thud.mp3")

        });







          
      }


      if (did(i + "building")) {
        did(i+'buildingTier').innerHTML = "Tier "+returnRoman(buildings[i].tier);
        did(i+'buildingImage').src = "img/src/buildings/"+i+"U"+buildings[i].tier+".jpg";
        did(i+'buildingLevel').innerHTML = buildings[i].level+"/"+buildings[i].tier*10;
        did(i+'buildingMoney').innerHTML = '<img src="img/sys/coin.png">'+ beautify(buildings[i].price) +" Shells";
        //did(i+'buildingItem1').innerHTML = '<img src="img/src/items/'+buildings[i].item1+'.jpg">'+ beautify(buildings[i].item1Amount) +" "+items[buildings[i].item1].name+"";
      }
  
    
    }
  }


  function tooltipBuildings(id) {
    if (did(id + "building")) {
      did(id + "building").addEventListener("mouseenter", function () {
        did('tooltip').style.display = "flex";
        did('tooltip').style.width = "15vw";
        did('tooltip').style.backgroundImage = "url(img/src/icons/stampMenu.jpg)"
        did("upperTooltip").style.display = "none";
        did("tooltipFlavor").textContent = "";
        did("tooltipArrow").style.display = "none";

        let mat1 = ""
        if ("mat1" in buildings[id]) mat1 = bestiaryItem(buildings[id].mat1)+"<br>"
        let mat2 = ""
        if ("mat2" in buildings[id]) mat2 = bestiaryItem(buildings[id].mat2)+"<br>"
        let mat3 = ""
        if ("mat3" in buildings[id]) mat3 = bestiaryItem(buildings[id].mat3)+"<br>"


        let buildingReward = Math.ceil(buildings[id].progress/100*(buildings[id].level*4))



        did("tooltipDescription").innerHTML = bestiaryTag("Left Click to Collect","transparent")+bestiaryTag("Right Click to Upgrade","transparent")+bestiaryTag("⛏️ Gathering ⛏️")+mat1+mat2+mat3+bestiaryTag("⏱️ Progress ⏱️")+"Will completely fill out in "+convertSecondsToHMS((8640-buildings[id].progress)*30)+". If you collect it right now at "+((buildings[id].progress / 8640) * 100).toFixed(1)+"%, it will yield "+colorTag(buildingReward,"darkorange")+" of each item."
        if (buildings[id].progress<99) did("tooltipDescription").innerHTML = bestiaryTag("Left Click to Collect","transparent")+bestiaryTag("Right Click to Upgrade","transparent")+bestiaryTag("⛏️ Gathering ⛏️")+mat1+mat2+mat3+bestiaryTag("⏱️ Progress ⏱️")+"Not enough materials to collect yet."

        var movingDiv = did("tooltip");
        var referenceDiv = did(id + "building");
        var referenceRect = referenceDiv.getBoundingClientRect();
        var newLeft = referenceRect.right + 20;
        var newTop = referenceRect.top - 10;
              
        movingDiv.style.left = newLeft + "px";
        movingDiv.style.top = newTop + "px";

      });
      did(id + "building").addEventListener("mouseleave", function () {
        resetTooltip();
      });
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
            research[i].status = "waiting";
            research[i].unlocked = false;
            research[i].timer = research[i].timerMax;
            did(i + "research").style.animation = "shrinkFadeOut 0.3s 1";
            
            setTimeout(() => {did(i+"research").remove() }, 200);
              
            
            createBuilding();
            createResearch();
            garrisonProgressVisual();
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
    garrisonProgressVisual();
}