
//#region Trackers
var logTrackClickDuck = false;
var logTrackClickDiscord = false;
var logTrackTier = false;
var playerInsight = 0;
//#endregion

document.addEventListener("click", function(event) { if (event.target && event.target.closest("#P30log")) { logs.P30.unlocked = true; logCheck() } });

function calculateInsight(){

  let insightFromLogs = 0

  for (let i in logs) {  if (logs[i].unlocked) insightFromLogs += logs[i].insight  }

playerInsight = insightFromLogs

}

function createLog() {
   for (let i in logs) {
   if (!did(i+"log")) {
    
    const div = document.createElement("img");
    div.id = i+"log";
    div.style.border = "black solid 1px";
    did('achievementListing').appendChild(div);
    div.src = "img/src/icons/pageLocked.jpg";   
    
    

    div.addEventListener("contextmenu", function () {
      if (items.I222.count>0 && !logs[i].revealed && !logs[i].unlocked) {
        playSound("audio/button6.mp3");
        animParticleBurst(5 , "particleSpark", "cursor", 0);
        items.I222.count--;
        logs[i].revealed = true;
        did("tooltipDescription").innerHTML = logs[i].description;

        did(i+"log").style.animation = "";
        void did(i+"log").offsetWidth;
        did(i+"log").style.animation = "useSkill 0.4s 1 ease";


      
      }
    });
  




    //tooltip here
    //areaButton(areas[a]);
    tooltipLog(i);   
   }
       
   if (logs[i].unlocked) {
    did(i+"log").src = "img/src/icons/pageCompleted.jpg";
    calculateInsight();

  }   
   }    
}


function tooltipLog(i) {
    if (did(i+"log")) {
    did(i+"log").addEventListener('mouseenter', function () { //on mouseenter
    did(i + "log").style.animation = "none";
    playSound("audio/page.mp3")
    did('tooltip').style.display = "flex";
    did("tooltipName").textContent = logs[i].name;
    did("tooltipPrice").innerHTML = '';
    
    if (logs[i].unlocked){
    did("tooltipRarity").textContent = 'Completed Book';
    did("tooltipRarity").style.color = "white";      
    did("tooltipName").style.color = "white";     
    did("tooltipDescription").innerHTML = logs[i].description + '<br> <span class="logStat">[+'+logs[i].insight+' Insight]';
    did('tooltipImage').src = "img/src/icons/pageCompleted.jpg";
        
    } else {
    did("tooltipRarity").textContent = 'Missing Book';
    did("tooltipRarity").style.color = "gray";
    did("tooltipName").style.color = "gray";
    did("tooltipDescription").innerHTML = "";
    if (items.I222.count>0) did("tooltipDescription").innerHTML = '<span style="background:black; padding: 0 2%; border-radius: 0.6vh; color:gold">Right Click to use a Golden Magnifying Glass</span>';
    if (logs[i].revealed) did("tooltipDescription").innerHTML = logs[i].description;
    did('tooltipImage').src = "img/src/icons/pageLocked.jpg";     
    }
        
    did("tooltipFlavor").textContent = logs[i].hint;
  
    
  


    if (i.startsWith("L1") || logs[i].tag === "upper") { 

      did("tooltipArrowUp").style.display = 'flex'
      did("tooltipArrow").style.display = 'none'


    const movingDiv = did('tooltip');
    const referenceDiv = did(i + "log");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const newLeft = referenceRect.right - movingDiv.offsetWidth;
    const newTop = referenceRect.bottom + 20;
    movingDiv.style.left = newLeft +73+ 'px';
    movingDiv.style.top = newTop + 'px';
    did("tooltipArrowUp").style.right = '22%'
    } else {
    did("tooltipArrow").style.right = '22%'
    const movingDiv = did('tooltip');
    const referenceDiv = did(i+"log");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 33;
    const referenceTop = referenceRect.top - 15;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 40+ 'px';
    movingDiv.style.top = newTop + 'px';
    }
        
  });
    did(i+"log").addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }
}


setInterval(logCheck, 3000);
function logCheck() {
    
    if (unlocks.journal){
        
      for (i in logs) {

        if (!logs[i].unlocked) {
          if (eval(logs[i].logic)) logs[i].unlocked=true;
        }

        if (logs[i].unlocked && !logs[i].once) { //plays only once ever
          did(i + "log").style.animation = "newItemGot 40s 1, levelUp 0.5s 1";
          stats.logsGot++;
          logs[i].once = true;
          createPopup('&#128196 Log Acquired: '+logs[i].name, 'page')
          playSound("audio/achievement.mp3");
          createLog();
        }

      }
    }

    //they have new names
    did('logHeaderBooks').innerHTML = "Books Collected : " + stats.logsGot+'/'+totalLogs +' <strong>['+Math.round(stats.logsGot/totalLogs*100)+'%]</strong>';
    did('logHeaderInsight').innerHTML = 'Insight Gained :<strong style="color: #6dcdde;">'+playerInsight+'</strong><img src="img/src/icons/insight.png"> </span>';
    
}

function unlockAllLogs(){
  for (var i in logs) { logs[i].unlocked = true }
}


let miningCollectiblesTotal = 0;
let miningCollectiblesGot = 0;
let fishingCollectiblesTotal = 0;
let fishingCollectiblesGot = 0;
let relicsCollectiblesTotal = 0;
let relicsCollectiblesGot = 0;
let foragingCollectiblesTotal = 0;
let foragingCollectiblesGot = 0;

let collectiblesTotal = 0;
let collectiblesGot = 0;




settingsPanel ("collectionButton", "catalogue");


did("collectionButton").addEventListener("mouseenter", function () {

    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">View your Collection ('+collectiblesGot+"/"+collectiblesTotal+")";
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    did("tooltipArrowUp").style.display = 'flex'
      did("tooltipArrow").style.display = 'none'
 
const movingDiv = did("tooltip");
const referenceDiv = did("collectionButton");
const referenceRect = referenceDiv.getBoundingClientRect();
const referenceRight = referenceRect.right; // Derecha de currentWeather
const referenceBottom = referenceRect.bottom + 20; // Abajo de currentWeather
const newLeft = referenceRight - movingDiv.offsetWidth;
const newTop = referenceBottom;
movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + "px";

  });
  did("collectionButton").addEventListener("mouseleave", function () {
    resetTooltip();
  });

function createCatalogue() {
  for (let i in items) {

  if ("collectible" in items[i] && !did(i+"catalogue")) {
    let collection = items[i].collectible
    const areadiv = document.createElement("div");
    areadiv.id = i + "catalogue";
    areadiv.innerHTML = '<img class="catalogueCasing3" id="'+i+'catalogueLight" src="img/src/icons/catalogueCasing3.png"><img class="catalogueCasing2" src="img/src/icons/catalogueCasing2.png"><img class="casingItem" id="'+i+'catalogueItem" src="img/src/items/I233.jpg"><img class="catalogueCasing1" src="img/src/icons/catalogueCasing1.png">';
    areadiv.className = "catalogueCasing";

    collectiblesTotal = miningCollectiblesTotal+fishingCollectiblesTotal+relicsCollectiblesTotal+foragingCollectiblesTotal;
    collectiblesGot = miningCollectiblesGot+fishingCollectiblesGot+relicsCollectiblesGot+foragingCollectiblesGot

    if (collection.startsWith("M")){
      did("miningCatalogue").appendChild(areadiv)
      miningCollectiblesTotal++
      if (items[i].statUp === "got") miningCollectiblesGot++
    } 
    if (collection.startsWith("F")) {
      did("fishingCatalogue").appendChild(areadiv);
      fishingCollectiblesTotal++
      if (items[i].statUp === "got") fishingCollectiblesGot++
    }
    if (collection.startsWith("R")) {
      did("relicsCatalogue").appendChild(areadiv);
      relicsCollectiblesTotal++
      if (items[i].statUp === "got") relicsCollectiblesGot++
    }
    if (collection.startsWith("B")) {
      did("foragingCatalogue").appendChild(areadiv);
      foragingCollectiblesTotal++
      if (items[i].statUp === "got") foragingCollectiblesGot++
    }
    
    areadiv.addEventListener("mouseenter", function () {
      did(i+"catalogueLight").style.display = "flex"
      
    });
    areadiv.addEventListener("mouseleave", function () {
      did(i+"catalogueLight").style.display = "none"
    });

    areadiv.addEventListener("click", function (event) {
      playSound("audio/touchGlass.mp3"); 
    });

   
    tooltipCatalogue(i)



  }

  
  if ("collectible" in items[i] && items[i].statUp === "got")
  {did(i+"catalogueItem").src = "img/src/items/"+i+".jpg";
  did(i+"catalogueItem").style.display = "flex"
} else if (did(i+"catalogueItem")){
  did(i+"catalogueItem").style.display = "none";
}

  did("miningCatalogueCount").innerHTML = "["+miningCollectiblesGot+"/"+miningCollectiblesTotal+"]"
  did("fishingCatalogueCount").innerHTML = "["+fishingCollectiblesGot+"/"+fishingCollectiblesTotal+"]"
  did("relicsCatalogueCount").innerHTML = "["+relicsCollectiblesGot+"/"+relicsCollectiblesTotal+"]"
  did("foragingCatalogueCount").innerHTML = "["+foragingCollectiblesGot+"/"+foragingCollectiblesTotal+"]"


}

setInterval(() => { catalogueShine() }, 2000);

function catalogueShine(){
  if (did("catalogue").style.display != "none") {
  for (let i in items) {
  if ("collectible" in items[i] && items[i].statUp === "got"){

    if (rng(1,40)===1)animParticleBurst(rng(1,3) , "particleSpark", i+"catalogue", 0);

  }


  }






}

}


}

function tooltipCatalogue(i) {
  if (did(i+"catalogue")) {
  did(i+"catalogue").addEventListener('mouseenter', function () { //on mouseenter
    if ("collectible" in items[i] && items[i].statUp === "got") {
 
      let collection = items[i].collectible

  did('tooltip').style.display = "flex";
  did("tooltipName").textContent = items[i].name;
  did("tooltipPrice").innerHTML = '';
  did("tooltipFlavor").textContent = items[i].flavor;
  did('tooltipImage').src = "img/src/items/"+i+".jpg";
  did("tooltipRarity").textContent = 'Collectible';
  did("tooltipRarity").style.color = returnQualityColor("Collectible");  
  did("tooltipName").style.color = returnQualityColor("Collectible");  
  did("tooltipArrow").style.display = "none";
  did('tooltip').style.backgroundImage = "url(img/sys/fondotooltipCollectible.jpg)"

  if (collection.startsWith("M")) did("tooltipDescription").innerHTML = '<span class="logStat">[+ 5% Max Health]</span>';
  if (collection.startsWith("F")) did("tooltipDescription").innerHTML = '<span class="logStat">[+ 5% Strenght]</span>';
  if (collection.startsWith("R")) did("tooltipDescription").innerHTML = '<span class="logStat">[+ 5% Crit Chance]</span>';
  if (collection.startsWith("B")) did("tooltipDescription").innerHTML = '<span class="logStat">[+ 5% Drop Chance]</span>';;

 
  var movingDiv = did("tooltip");
  var referenceDiv = did(i + "catalogue");
  var referenceRect = referenceDiv.getBoundingClientRect();
  var newLeft = referenceRect.right + 10;
  var newTop = referenceRect.top - 40;
  
  movingDiv.style.left = newLeft + "px";
  movingDiv.style.top = newTop + "px";

}

      
});
  did(i+"catalogue").addEventListener('mouseleave', function () {
  resetTooltip();
  });
}
}


settingsPanel ("armoryButton", "armory");





function createArmory() {
  for (let i in items) {

    let series = items[i].series

  if ("series" in items[i] && !did(i+"armory")) {

    eval("armory" + series + "Total++");

    const div = document.createElement("img");
    div.id = i+"armory";
    div.style.border = returnQualityColor(items[i].quality)+" solid 1px";
    div.src = "img/src/items/"+i+".jpg"; 

    did(series+"Armory").appendChild(div)

    if (items[i].armoryState==="complete") {eval("armory" + series + "Got += 1");}

    tooltipArmory(i)


  }

  if ("series" in items[i] && items[i].armoryState === "unseen") {
    did(i+"armory").src = "img/src/items/I0.jpg"; 
    did(i+"armory").style.filter = "grayscale(1)";
    did(i+"armory").style.border = "gray solid 1px";
  } 
  if ("series" in items[i] && items[i].armoryState === "partial"){
    did(i+"armory").src = "img/src/items/"+i+".jpg"; 
    did(i+"armory").style.filter = "grayscale(1)";
  }
  if ("series" in items[i] && items[i].armoryState === "complete") {
    did(i+"armory").src = "img/src/items/"+i+".jpg";
    did(i+"armory").style.filter = "grayscale(0)";
    did(i+"armory").style.border = returnQualityColor(items[i].quality)+" solid 1px";
  }

  if ("series" in items[i]) {
  did(series+"ArmoryCount").innerHTML = eval("armory" + series + "Got")+"/"+eval("armory" + series + "Total");
  }


}
}


setInterval(() => {armorycheck()}, 10000);


function armorycheck(){

  for (let i in items) {
    if ("series" in items[i]) {
      let series = items[i].series

    if (!items[i].gotOnce && items[i].armoryState != "complete") {
      items[i].armoryState = "unseen";
    } else if (items[i].count !== items[i].max && items[i].armoryState != "complete"){
      items[i].armoryState = "partial";
    } else if (items[i].armoryState != "complete"){
      items[i].armoryState = "complete";
      eval("armory" + series + "Got += 1");
    }


  }
  }




}


function tooltipArmory(i) {
  if (did(i+"armory")) {
  did(i+"armory").addEventListener('mouseenter', function () { //on mouseenter
    if (items[i].armoryState!=="unseen") {

      let series = items[i].series

  did('tooltip').style.display = "flex";
  did("tooltipName").textContent = items[i].name;
  did("tooltipPrice").innerHTML = '';
  did("tooltipFlavor").textContent = items[i].flavor;
  did('tooltipImage').src = "img/src/items/"+i+".jpg";
  did("tooltipRarity").textContent = items[i].quality;
  did("tooltipRarity").style.color = returnQualityColor(items[i].quality);  
  did("tooltipName").style.color = returnQualityColor(items[i].quality);  
  did("tooltipArrow").style.display = "none";
  did("tooltipDescription").innerHTML = ""
  did('tooltipImage').style.filter = "grayscale(0.6)"

  if (items[i].armoryState==="partial") did("tooltipDescription").innerHTML = '<FONT COLOR="#d194cd">Fully upgrade this item to complete the entry and unlock its potential';

  if (items[i].armoryState==="complete"){
    did('tooltipImage').style.filter = "grayscale(0)"
    if (series === "heirloom") did("tooltipDescription").innerHTML = '<span class="logStat">[+ 1% Charisma]</span>';
    if (series === "millionaire") did("tooltipDescription").innerHTML = '<span class="logStat">[+ 2% Item Sell Value]</span>';
    if (series === "forgotten") did("tooltipDescription").innerHTML = '<span class="logStat">[+ 10% Drop Chance]</span>';
    if (series === "masterwork") did("tooltipDescription").innerHTML = '<span class="logStat">[+ 5% Max Health]</span>';
    if (series === "beastfallen") did("tooltipDescription").innerHTML = '<span class="logStat">[+ 5% EXP Rate]</span>';
    if (series === "revered") did("tooltipDescription").innerHTML = '<span class="logStat">[+ 5% Max SP]</span>';
    if (series === "solstice") did("tooltipDescription").innerHTML = '<span class="logStat">[+ 5% Pat Power]</span>';
  }

 
  var movingDiv = did("tooltip");
  var referenceDiv = did(i + "armory");
  var referenceRect = referenceDiv.getBoundingClientRect();
  var newLeft = referenceRect.right + 10;
  var newTop = referenceRect.top - 40;
  
  movingDiv.style.left = newLeft + "px";
  movingDiv.style.top = newTop + "px";

}
      
});
  did(i+"armory").addEventListener('mouseleave', function () {
  resetTooltip();
  });
}
}


did("armoryButton").addEventListener("mouseenter", function () {
  did("tooltip").style.display = "flex";
  did("upperTooltip").style.display = "none";
  did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">View your Armory';
  did("tooltipFlavor").textContent = "";
  did("tooltipDescription").style.textAlign = "center";
  did("tooltipImage").style.display = "none";
  did("tooltipArrowUp").style.display = 'flex'
  did("tooltipArrow").style.display = 'none'

const movingDiv = did("tooltip");
const referenceDiv = did("armoryButton");
const referenceRect = referenceDiv.getBoundingClientRect();
const referenceRight = referenceRect.right; // Derecha de currentWeather
const referenceBottom = referenceRect.bottom + 20; // Abajo de currentWeather
const newLeft = referenceRight - movingDiv.offsetWidth;
const newTop = referenceBottom;
movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + "px";
});
did("armoryButton").addEventListener("mouseleave", function () {
  resetTooltip();
});




document.addEventListener('DOMContentLoaded', logInitialization);

function logInitialization(){
    createLog();
    logCheck();

    
}

















