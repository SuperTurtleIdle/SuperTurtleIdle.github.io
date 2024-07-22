
//#region Trackers
var logTrackClickDuck = false;
var logTrackClickDiscord = false;
var logTrackTier = false;
var playerInsight = 0;
//#endregion

document.addEventListener("click", function(event) { if (event.target && event.target.closest("#P30log")) { logs.P30.unlocked = true; logCheck() } });

function calculateInsight(){

  let insightFromLogs = 0

  for (let i in logs) {  if (logs[i].unlocked) insightFromLogs += 10  }

playerInsight = insightFromLogs

}

function createLog() {
   for (let i in logs) {
   if (!did(i+"log")) {
    
    const div = document.createElement("span");
    div.innerHTML = '<span id="'+i+'tag"></span><img src="img/src/icons/pageLocked.jpg">'
    div.getElementsByTagName("img")[0].id = i+"log";
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
    did(i+"log").style.outline = "solid #db991f 0.15rem";
    calculateInsight();
    did(i+"tag").innerHTML = logs[i].tag
  }   
   }    
}


function tooltipLog(i) {
    if (did(i+"log")) {
    did(i+"log").addEventListener('mouseenter', function (event) { //on mouseenter
    did(i+"log").style.animation = "none";
    playSound("audio/page.mp3")
    did('tooltip').style.display = "flex";
    did("tooltipName").textContent = logs[i].name;
    did("tooltipPrice").innerHTML = '';
    
    if (logs[i].unlocked){
    did("tooltipRarity").textContent = 'Completed Book';
    did("tooltipRarity").style.color = "white";      
    did("tooltipName").style.color = "white";     
    did("tooltipDescription").innerHTML = logs[i].description+'<br><span class="logStat">[ +5 Mastery]</span>';
    did('tooltipImage').src = "img/src/icons/pageCompleted.jpg";
        
    } else {
    did("tooltipRarity").textContent = 'Missing Book';
    did("tooltipRarity").style.color = "gray";
    did("tooltipName").style.color = "gray";
    did("tooltipDescription").innerHTML = "";
    if (items.I222.count>0) did("tooltipDescription").innerHTML = bestiaryTag(colorTag("Right Click to use a Golden Magnifying Glass", "#966c38"), "transparent");
    if (logs[i].revealed) did("tooltipDescription").innerHTML = logs[i].description;
    did('tooltipImage').src = "img/src/icons/pageLocked.jpg";     
    }
        
    did("tooltipFlavor").textContent = logs[i].hint;
    did("tooltipArrowUp").style.display = 'flex';
    did("tooltipArrow").style.display = 'none';







    const hoveredElement = event.target;
    const elementRect = hoveredElement.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const seventyPercentWidth = windowWidth * 0.5;


  var movingDiv = did("tooltip");
  var referenceDiv = did(i+"log");
  var referenceRect = referenceDiv.getBoundingClientRect();
  
    if (elementRect.left < seventyPercentWidth) {


 
    var newLeft = referenceRect.left;
    var newTop = referenceRect.top - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft - 8+ "px";
    movingDiv.style.top = newTop - 13+ "px";

    } else {


      const referenceLeft = referenceRect.left + 8;
      const referenceTop = referenceRect.top - 13;
      const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
      const newTop = referenceTop  - movingDiv.offsetHeight;
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";



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

        if (!logs[i].unlocked && "logic" in logs[i]) {
          if (eval(logs[i].logic)) logs[i].unlocked=true;
        }

        if (logs[i].unlocked && !logs[i].once) { //plays only once ever
          stats.logsGot++;
          logs[i].once = true;
          createPopup('&#128196 Book Completed: '+logs[i].name, 'page')
          playSound("audio/achievement.mp3");
          createLog();
          did(i+"log").style.animation = "logUnlock infinite 1s";
          statsUpdate()
          updateStatsUI()
        }

      }
    }

    //they have new names
    did('logHeaderBooks').innerHTML = 'Books Collected :<strong style="background:#4c5673">' + stats.logsGot+'/'+totalLogs +'</strong> <strong style="background:orange">['+Math.round(stats.logsGot/totalLogs*100)+'%]</strong>';
    did('logHeaderInsight').innerHTML = 'Archive Mastery: <strong style="background: #6eb1b8;">' + stats.logsGot*5+'</strong><img src="img/src/icons/insight.png">';
    
}

function unlockAllLogs(){
  for (var i in logs) { logs[i].unlocked = true }
}



let collectibles1Total = 0;
let collectibles2Total = 0;
let collectibles3Total = 0;
let collectibles4Total = 0;
let collectibles5Total = 0;
let collectibles6Total = 0;
let collectibles7Total = 0;
let collectibles8Total = 0;
let collectibles9Total = 0;
let collectibles10Total = 0;
let collectibles11Total = 0;

let collectibles1Got = 0;
let collectibles2Got = 0;
let collectibles3Got = 0;
let collectibles4Got = 0;
let collectibles5Got = 0;
let collectibles6Got = 0;
let collectibles7Got = 0;
let collectibles8Got = 0;
let collectibles9Got = 0;
let collectibles10Got = 0;
let collectibles11Got = 0;

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
const referenceBottom = referenceRect.bottom - 1; // Abajo de currentWeather
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
    //let collection = items[i].collectible
    const areadiv = document.createElement("div");
    areadiv.id = i + "catalogue";
    areadiv.innerHTML = '<img class="catalogueCasing3" id="'+i+'catalogueLight" src="img/src/icons/catalogueCasing3.png"><img class="catalogueCasing2" src="img/src/icons/catalogueCasing2.png"><img class="casingItem" id="'+i+'catalogueItem" src="img/src/items/I233.jpg"><img class="catalogueCasing1" src="img/src/icons/catalogueCasing1.png">';
    areadiv.className = "catalogueCasing";


    eval("collectibles" + items[i].collectible + "Total += 1")
    if (items[i].statUp === "got") eval("collectibles" + items[i].collectible + "Got += 1")

    did("catalogue"+items[i].collectible).appendChild(areadiv)


/*
    if (collection.startsWith("M")){
      did("miningCatalogue").appendChild(areadiv)
      
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

    */
    
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

  
  if ("collectible" in items[i] && items[i].statUp === "got" && did(i+"catalogueItem")){
  did(i+"catalogueItem").src = "img/src/items/"+i+".jpg";
  did(i+"catalogueItem").style.display = "flex"
} else if (did(i+"catalogueItem")){
  did(i+"catalogueItem").style.display = "none";
}
}


collectiblesTotal = collectibles1Total+collectibles2Total+collectibles3Total+collectibles4Total+collectibles5Total+collectibles6Total+collectibles7Total+collectibles8Total+collectibles9Total+collectibles10Total+collectibles11Total;
collectiblesGot = collectibles1Got+collectibles2Got+collectibles3Got+collectibles4Got+collectibles5Got+collectibles6Got+collectibles7Got+collectibles8Got+collectibles9Got+collectibles10Got+collectibles11Got;


did("catalogue1Count").innerHTML = "["+collectibles1Got+"/"+collectibles1Total+"]"
did("catalogue2Count").innerHTML = "["+collectibles2Got+"/"+collectibles2Total+"]"
did("catalogue3Count").innerHTML = "["+collectibles3Got+"/"+collectibles3Total+"]"
did("catalogue4Count").innerHTML = "["+collectibles4Got+"/"+collectibles4Total+"]"
did("catalogue5Count").innerHTML = "["+collectibles5Got+"/"+collectibles5Total+"]"
did("catalogue6Count").innerHTML = "["+collectibles6Got+"/"+collectibles6Total+"]"
did("catalogue7Count").innerHTML = "["+collectibles7Got+"/"+collectibles7Total+"]"
did("catalogue8Count").innerHTML = "["+collectibles8Got+"/"+collectibles8Total+"]"
did("catalogue9Count").innerHTML = "["+collectibles9Got+"/"+collectibles9Total+"]"
did("catalogue10Count").innerHTML = "["+collectibles10Got+"/"+collectibles10Total+"]"
did("catalogue11Count").innerHTML = "["+collectibles11Got+"/"+collectibles11Total+"]"





}

setInterval(() => { if (did("catalogue").style.display != "none") { catalogueShine() } }, 2000);

function catalogueShine(){
  for (let i in items) {
  if ("collectible" in items[i] && items[i].statUp === "got"){
    
    if (rng(1,40)===1)animParticleBurst(rng(1,3) , "particleSpark", i+"catalogue", 0);

  }
}
}


function tooltipCatalogue(i) {
  if (did(i+"catalogue")) {
  did(i+"catalogue").addEventListener('mouseenter', function () { //on mouseenter

    selectedRelic = i;
    
    if ("collectible" in items[i] && items[i].statUp === "got") {
 
      let collection = items[i].collectible

  did('tooltip').style.display = "flex";
  did("tooltipName").textContent = items[i].name;
  did("tooltipPrice").innerHTML = '';
  did("tooltipFlavor").textContent = items[i].flavor;
  did('tooltipImage').src = "img/src/items/"+i+".jpg";
  did("tooltipRarity").textContent = "★".repeat(items[i].rarity);
  did("tooltipRarity").style.color = returnQualityColor("Collectible");  
  did("tooltipName").style.color = returnQualityColor("Collectible");  
  did("tooltipArrow").style.display = "none";
  did('tooltip').style.backgroundImage = "url(img/sys/fondotooltipCollectible.jpg)"

  did("tooltipDescription").innerHTML = '<span class="logStat">[+ 5 Mastery]</span>';

 
  const movingDiv = document.getElementById('tooltip');
const referenceDiv = document.getElementById(i + "catalogue");

const movingRect = movingDiv.getBoundingClientRect();
const referenceRect = referenceDiv.getBoundingClientRect();

const newLeft = referenceRect.left + (referenceRect.width / 2) - (movingRect.width / 2);
const newTop = referenceRect.top - movingRect.height;

movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop - 15 + "px";

}

      
});
  did(i+"catalogue").addEventListener('mouseleave', function () {
  resetTooltip();
  });
}
}


settingsPanel ("armoryButton", "armory");



let returnToArmory = false;

function createArmory() {
  for (let i in items) {

    let series = items[i].series

  if ("series" in items[i] && !did(i+"armory")) {

    eval("armory" + series + "Total++");

    const div = document.createElement("img");
    div.id = i+"armory";
    div.src = "img/src/items/"+i+".jpg";
    div.className = "itemSlot";
    div.style.outline = returnQualityColor(items[i].quality)+" solid 0.15";


    div.addEventListener("click", function (event) {
      if (items[i].gotOnce){
      closePanels();
      upgradeItem = i;
      upgradeMenu();
      returnToArmory = true;
    }
    });

    


    did(series+"Armory").appendChild(div)

    if (items[i].armoryState==="complete") {eval("armory" + series + "Got += 1");}

    tooltipArmory(i)


  }

  if ("series" in items[i] && items[i].armoryState === "unseen") {
    did(i+"armory").src = "img/src/items/I0.jpg"; 
    did(i+"armory").style.filter = "grayscale(1)";
    did(i+"armory").style.outline = "gray solid 0.15rem";
  } 
  if ("series" in items[i] && items[i].armoryState === "partial"){
    did(i+"armory").src = "img/src/items/"+i+".jpg"; 
    did(i+"armory").style.filter = "grayscale(1)";
    did(i+"armory").style.outline = returnQualityColor(items[i].quality)+" solid 0.15rem";

  }
  if ("series" in items[i] && items[i].armoryState === "complete") {
    did(i+"armory").src = "img/src/items/"+i+".jpg";
    did(i+"armory").style.filter = "grayscale(0)";
    did(i+"armory").style.outline = returnQualityColor(items[i].quality)+" solid 0.15rem";
  }

  if ("series" in items[i]) {
  did(series+"ArmoryCount").innerHTML = eval("armory" + series + "Got")+"/"+eval("armory" + series + "Total");
  }


}
}


let seriesCompleted

setInterval(() => {armorycheck()}, 10000);


function armorycheck(){

  for (let i in items) {
    if ("series" in items[i]) {
      let series = items[i].series

    if ( !items[i].gotOnce && items[i].armoryState != "complete" ) {
      items[i].armoryState = "unseen";
    } else if ( items[i].level < items[i].cap && items[i].armoryState != "complete" ){
      items[i].armoryState = "partial";
    } else if (items[i].armoryState != "complete"){
      items[i].armoryState = "complete";
      eval("armory" + series + "Got += 1");
    }

    if (rpgPlayer.debug && items[i].armoryState != "complete") items[i].armoryState = "partial";


  }
  }

  seriesCompleted = 0;

  if (armoryheirloomTotal=== armoryheirloomGot) seriesCompleted++
  if (armorymillionaireTotal === armorymillionaireGot) seriesCompleted++
  if (armoryforgottenTotal===armoryforgottenGot) seriesCompleted++
  if (armorymasterworkTotal === armorymasterworkGot) seriesCompleted++
  if (armorybeastfallenTotal=== armorybeastfallenGot) seriesCompleted++
  if (armoryreveredTotal === armoryreveredGot) seriesCompleted++
  if (armorysolsticeTotal ===armorysolsticeGot) seriesCompleted++



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
  did("tooltipDescription").innerHTML = "";
  did('tooltipImage').style.filter = "grayscale(0.6)"

  if (items[i].armoryState==="partial") did("tooltipDescription").innerHTML = rUpgLvl(i)+'<br><FONT COLOR="gray">Upgrade this item to level '+items[i].cap+' to complete the entry and unlock its potential<br><br><FONT COLOR="#d194cd">Click to open the upgrade menu of this item<div class="separador"></div>';

  if (items[i].armoryState==="complete"){
    did('tooltipImage').style.filter = "grayscale(0)"
    did("tooltipDescription").innerHTML = rUpgLvl(i)+'<br><span class="logStat">[+ 10 Mastery]</span>';

  }

 
  const movingDiv = document.getElementById('tooltip');
const referenceDiv = document.getElementById(i + "armory");

const movingRect = movingDiv.getBoundingClientRect();
const referenceRect = referenceDiv.getBoundingClientRect();

const newLeft = referenceRect.left + (referenceRect.width / 2) - (movingRect.width / 2);
const newTop = referenceRect.top - movingRect.height;

movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop - 15 + "px";
  

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
  did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">View your Armory ('+totalArmoryGot+'/'+totalArmory+")";
  did("tooltipFlavor").textContent = "";
  did("tooltipDescription").style.textAlign = "center";
  did("tooltipImage").style.display = "none";
  did("tooltipArrowUp").style.display = 'flex';
  did("tooltipArrow").style.display = 'none';

const movingDiv = did("tooltip");
const referenceDiv = did("armoryButton");
const referenceRect = referenceDiv.getBoundingClientRect();
const referenceRight = referenceRect.right; // Derecha de currentWeather
const referenceBottom = referenceRect.bottom -1; // Abajo de currentWeather
const newLeft = referenceRight - movingDiv.offsetWidth;
const newTop = referenceBottom;
movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + "px";
});
did("armoryButton").addEventListener("mouseleave", function () {
  resetTooltip();
});




settingsPanel ("bestiaryButton", "bestiary");

let bestiaryPointEntry = 0;
let bestiaryPointBronze = 0;
let bestiaryPointGold = 0;
let bestiaryPointPlatinum = 0;
let totalBestiaryPoints = 0;


let currentEntry = "E1";

function completeBestiary(){

  for (let i in enemies) {


    if (!did(i+"bestiary") && i.startsWith("E") && !enemies[i].ignoreBestiary) {



    }

  }


}


let bronzeMedalsGot = 0;
let goldMedalsGot = 0;
let platinumMedalsGot = 0;

let medalsGot = 0;

function createBestiary() {

  goldMedalsGot = 0;
  platinumMedalsGot = 0;
  bestiaryPointEntry = 0;
  let elibileEnemies = 0;
  totalBestiaryPoints = 0;
  medalsGot = 0;

  for (let i in enemies) {


  if (!did(i+"bestiary") && i.startsWith("E") && !enemies[i].ignoreBestiary) {

    const areadiv = document.createElement("div");
    areadiv.id = i + "bestiary";
    did("bestiaryListing").appendChild(areadiv);

    areadiv.addEventListener("click", function () {
      if (enemies[i].killCount>=1 || enemies[i].sawOnce){
      bestiaryEntry(i);
      playSound("audio/page.mp3");
      currentEntry = i;
      } else playSound("audio/thud.mp3");
    });

  }

    if (!enemies[i].ignoreBestiaryPercentage){

      totalBestiaryPoints++

    
    if (enemies[i].killCount>=1 || enemies[i].sawOnce) bestiaryPointEntry++


    if (enemies[i].tag !== 'dungeonEnemy' && !enemies[i].noMedal && enemies[i].tag !== 'showdownBoss' && enemies[i].tag !== 'stageBoss1' && enemies[i].tag !== 'stageBoss2' && enemies[i].tag !== 'finalBoss')
         { enemies[i].medal = "none"; }//eligible

if (enemies[i].killCount>=10000
  && enemies[i].tag !== 'dungeonEnemy' && !enemies[i].noMedal && enemies[i].tag !== 'showdownBoss' && enemies[i].tag !== 'stageBoss1' && enemies[i].tag !== 'stageBoss2' && enemies[i].tag !== 'finalBoss')
     { enemies[i].medal = "gold"; }//gold medal




if (enemies[i].killCount>=100000
  && enemies[i].tag !== 'dungeonEnemy' && !enemies[i].noMedal && enemies[i].tag !== 'showdownBoss' && enemies[i].tag !== 'stageBoss1' && enemies[i].tag !== 'stageBoss2' && enemies[i].tag !== 'finalBoss')
    { //platinum medal
      
      
      enemies[i].medal = "platinum";

  }


  

  if (enemies[i].medal === "gold") goldMedalsGot++
  if (enemies[i].medal === "platinum") platinumMedalsGot++
  medalsGot = goldMedalsGot + platinumMedalsGot

}

if (did(i+"bestiary")){
if (enemies[i].killCount>=1 || enemies[i].sawOnce){
  did(i+"bestiary").innerHTML = '<img src="img/src/enemies/'+i+'M.png"></img><span>'+enemies[i].name+'</span>';
  if (enemies[i].tag==="areaBoss") did(i+"bestiary").innerHTML = '<img src="img/src/enemies/'+i+'M.png"></img><span>'+enemies[i].name+' 💀</span>';
  if (enemies[i].ignoreBestiaryPercentage) did(i+"bestiary").innerHTML = '<img src="img/src/enemies/'+i+'M.png"></img><span>'+enemies[i].name+' ❌</span>';
} else{
  did(i+"bestiary").innerHTML = '<span>?????</span>';
}

}


  }

 
  for (i in enemies) if (enemies[i].medal==="none" && enemies[i].sawOnce) elibileEnemies++

bestiaryPercentage = ( ( bestiaryPointEntry + medalsGot ) / (totalBestiaryPoints) * 100 ) 
did("bestiaryProgress").innerHTML = bestiaryPercentage.toFixed(1)+"%";
did("bestiaryMastery").innerHTML = "+"+medalsGot*10+" Mastery";
did("bestiaryProgress2").innerHTML = medalsGot+"/"+(elibileEnemies+medalsGot)+" Medals";

did("bestiaryProgressBar").style.width = bestiaryPercentage+'%';

}


let bestiaryPercentage = ( ( bestiaryPointEntry + medalsGot ) / (totalBestiaryPoints) * 100 ) 


function bestiaryEntry(i) {

if (enemies[i].bigEnemy) { did("bestiaryEnemy").style.marginLeft = "5%"} else { did("bestiaryEnemy").style.marginLeft = "75%"}


did("bestiaryName").innerHTML = enemies[i].name
did("bestiaryEnemy").src = "img/src/enemies/"+i+".png"

if (enemies[i].align === undefined) {did("bestiaryEnemyAlign").src = "img/src/projectiles/none.png"; did("bestiaryEnemyAlign").style.display = "none"}
else { did("bestiaryEnemyAlign").src = "img/src/icons/"+enemies[i].align+".png";  did("bestiaryEnemyAlign").style.display = "flex" }


did("bestiaryBackground").style.backgroundImage = "url(img/src/areas/"+enemies[i].area+".png)";


//bronze medal
did("bestiaryHealth").innerHTML = beautify(enemies[i].hp)+" HP"
did("bestiaryAttack").innerHTML = beautify(enemies[i].attack)+" ATK"

if (enemies[i].attack === undefined) did("bestiaryAttack").innerHTML = "0 ATK"
did("bestiaryExp").innerHTML = beautify(enemies[i].exp)+" EXP";

if (enemies[i].dynamic) {did("bestiaryHealth").innerHTML = "??? HP"; did("bestiaryAttack").innerHTML ="??? ATK"; did("bestiaryExp").innerHTML ="??? EXP"}


if (enemies[i].medal==="none" ){ did("bestiaryBadge").src = "img/src/icons/bestiaryBadge1.png" }
else did("bestiaryBadge").src = "img/src/projectiles/none.png"

if (enemies[i].medal==="gold" ){ did("bestiaryBadge").src = "img/src/icons/bestiaryBadge2.png" }
      
if (enemies[i].medal==="platinum" ){ did("bestiaryBadge").src = "img/src/icons/bestiaryBadge3.png" }



did("bestiaryKills").innerHTML = "💀 "+beautify(enemies[i].killCount)

did("bestiaryDescription").innerHTML = enemies[i].description

if ("bestiarySkills" in enemies[i]){
  did("bestiarySkillsTitle").style.display = "flex";
  did("bestiarySkills").style.display = "inline";
  did("bestiarySkills").innerHTML = enemies[i].bestiarySkills
} else{
  did("bestiarySkillsTitle").style.display = "none";
  did("bestiarySkills").style.display = "none";
}





if ("bestiaryItem" in (enemies[i])) {
  did("bestiaryDrops").style.display = "inline";
  did("bestiaryDropsTitle").style.display = "flex";
  did("bestiaryDrops").innerHTML = eval(enemies[i].bestiaryItem)}
  else{
    did("bestiaryDrops").style.display = "none";
    did("bestiaryDropsTitle").style.display = "none";

  }





}


did("bestiaryButton").addEventListener("mouseenter", function () {
  did("tooltip").style.display = "flex";
  did("upperTooltip").style.display = "none";
  did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">Open the Bestiary ('+beautify(bestiaryPercentage)+'%)';
  did("tooltipFlavor").textContent = "";
  did("tooltipDescription").style.textAlign = "center";
  did("tooltipImage").style.display = "none";
  did("tooltipArrowUp").style.display = 'flex'
  did("tooltipArrow").style.display = 'none'

const movingDiv = did("tooltip");
const referenceDiv = did("bestiaryButton");
const referenceRect = referenceDiv.getBoundingClientRect();
const referenceRight = referenceRect.right; // Derecha de currentWeather
const referenceBottom = referenceRect.bottom - 1; // Abajo de currentWeather
const newLeft = referenceRight - movingDiv.offsetWidth;
const newTop = referenceBottom;
movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + "px";
});
did("bestiaryButton").addEventListener("mouseleave", function () {
  resetTooltip();
});











did("bestiaryDrops").addEventListener("mouseenter", function () {
 
  if ("bestiaryLoot" in enemies[currentEntry]){
  did("tooltip").style.display = "flex";
  did("tooltipArrow").style.display = "none";

  did("tooltipName").innerHTML = items[enemies[currentEntry].bestiaryLoot].name
  did("tooltipPrice").innerHTML = "";
  
  did("tooltipRarity").innerHTML = items[enemies[currentEntry].bestiaryLoot].quality;

  did("tooltipRarity").style.color = returnQualityColor(items[enemies[currentEntry].bestiaryLoot].quality);
  did("tooltipName").style.color = returnQualityColor(items[enemies[currentEntry].bestiaryLoot].quality);
  

  did("tooltipDescription").innerHTML = items[enemies[currentEntry].bestiaryLoot].description
  if (items[enemies[currentEntry].bestiaryLoot].dynamic) did("tooltipDescription").innerHTML = eval(items[enemies[currentEntry].bestiaryLoot].description)

  did("tooltipFlavor").textContent = items[enemies[currentEntry].bestiaryLoot].flavor;
  did("tooltipImage").src = "img/src/items/" + enemies[currentEntry].bestiaryLoot + ".jpg";
  //position related code

  var movingDiv = did("tooltip");
  var referenceDiv = did("bestiaryDrops");
  var referenceRect = referenceDiv.getBoundingClientRect();
    var referenceLeft = referenceRect.left + 0;
    var referenceTop = referenceRect.top - 15;
    var newLeft =
      referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    var newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";


  }

  
  


});
did("bestiaryDrops").addEventListener("mouseleave", function () {
  resetTooltip();
 
});






















document.addEventListener('DOMContentLoaded', logInitialization);

function logInitialization(){
    createLog();
    logCheck();
    bestiaryEntry("E1")
    
}

















