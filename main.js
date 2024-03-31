//#region Thats hell youre walking in

const did = (id) => document.getElementById(id); 


var rightClickX = 0;
var rightClickY = 0;

window.addEventListener("contextmenu", function (e) { //disables web right click
    e.preventDefault();
    rightClickX = e.clientX;
    rightClickY = e.clientY;
}); 


document.addEventListener('keydown', function (event) { //disables spacebar
    if (event.key === ' ') {
      event.preventDefault();
    } });

window.addEventListener('keydown', function (event) { //disables alt key
    if (event.keyCode === 18) { event.preventDefault(); return false; }
});



document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {closePanels(); }
});

function setCursor() {

    var estilo = document.createElement('style');

    if (!settings.disableCustomCursor) {
        document.body.style.cursor = "url('img/sys/cursorHand.png'), auto";
        estilo.innerHTML = ` button:hover { cursor: url('img/sys/cursorHand.png'), auto; } `;
        document.head.appendChild(estilo);
        
    } else {
        document.body.style.cursor = "default";
        estilo.innerHTML = ` button:hover { cursor: default; } `;
        document.head.appendChild(estilo);
    }

}


document.addEventListener("click", function() {
    if (!settings.disableCustomCursor){

    document.body.style.cursor = "url('img/sys/cursorHandClick.png'), auto";

    setTimeout(function() {
        document.body.style.cursor = "url('img/sys/cursorHand.png'), auto";
    }, 100);
}
});

function updateCounters() { //DO NOT PUT HERE ANYTHING THATS NOT UI
    did("contadorMonedas").textContent = beautify(rpgPlayer.coins);
    did("estadisticaClicks").textContent = stats.clickCount;
    did("totalCoins").textContent = beautify(stats.totalCoins);
    did("totalCoinClicks").textContent = beautify(stats.totalCoinsClick);

    did("statCrafted").textContent = beautify(stats.craftedItems);
    did("statSold").textContent = beautify(stats.soldItems);
    did("statQuestCompleted").textContent = beautify(stats.questsCompleted);
    did("statKills").textContent = beautify(stats.totalKills);
    did("statBossKills").textContent = beautify(stats.totalBossKills);
    did("statDeaths").textContent = beautify(stats.timesDied);
    did("statDungeons").textContent = beautify(stats.dungeonsCleared);

    did("statThief").textContent = beautify(stats.timesStolen);
    did("statJester").textContent = beautify(stats.jesterTurtleClicks);
    did("statPresents").textContent = beautify(stats.mysteryPresentsOpened);

    };
//#endregion
//----------------------==========================-----------------------
//----------------------=======ON TURTLE CLICK====-----------------------
//----------------------==========================-----------------------
//#region Click
let clickCooldown = false;
let clickAnimCooldown = false

unlocks.present = false;

did("tortugaClick").onclick = turtleClick;

function turtleClick(){

    if (!clickCooldown) {
    
        rpgPlayer.coins += playerCoinsPerClick;
        stats.clickCount++
        stats.totalCoinsClick += playerCoinsPerClick
        stats.totalCoins += playerCoinsPerClick
        playSound("audio/throw.mp3")
        //turtle image shift
        if (stats.clickCount % 40 === 0) {
                const randomImageIndex = Math.floor(Math.random() * 5) + 1;
                const imagePath = "img/src/tortugasdefault/img" + randomImageIndex + ".png";
                did("tortugaClick").src = imagePath;
                let rnglet = rng(1,4)
                if (rnglet===1)playSound("audio/lily2.mp3");
                else playSound("audio/lily.mp3");
    
                if (unlocks.present && cd.presentCooldown<=0){
                    cd.presentCooldown = 43200;
                    items.I119.count += 1;
                    stats.recievedPresents++;
                    addItem();
                    logPrint("<span style='color:pink'>"+stats.turtleName+" left a present...!</span>")
                }
            };
        
        //counter animation
        let animText = did("contadorMonedas")
        animText.style.padding = "1%"
        animText.style.fontSize = "1.2vw"
        animText.style.transition = "0.05s"
        setTimeout(function () {
            animText.style.fontSize = "0.98vw"
            animText.style.padding = "0%";
        }, 100);
    
        //turtle animation

        did("tortugaClick").style.animation = "";
        void did("tortugaClick").offsetWidth;
        did("tortugaClick").style.animation = "gelatine 0.3s 1 ease";
        
        
        //floating value div
        if (!settings.disableClickText) {
            createFloatingText('<p>+' + (beautify(playerCoinsPerClick)) + '<img src="img/sys/coin.png" />') }
        
        updateCounters();
        
    clickCooldown = true;
    setTimeout(function () {clickCooldown = false;}, playerClickRate);
    }
}

function createFloatingText(text){
    var textoClick1 = document.createElement('div');
        textoClick1.className = 'textoClick';
        textoClick1.style.left = (event.clientX + (window.scrollX || window.pageXOffset) - 10) + 'px';
        textoClick1.style.top = (event.clientY + (window.scrollY || window.pageYOffset) - 40) + 'px';
        textoClick1.innerHTML = text; 
        
        document.body.appendChild(textoClick1);
        setTimeout(function () { textoClick1.remove(); }, 480); 
}

var autoclicker = false

did("tortugaClick").addEventListener('mousedown', function (event) {  if (event.button === 2 && unlocks.autoclicker) { autoclicker=true } })
did("tortugaClick").addEventListener('mouseup', function (event) { if (event.button === 2) { autoclicker=false } })
did("tortugaClick").addEventListener('mouseleave', function () { autoclicker=false })  
did("tortugaClick").addEventListener('mousemove', function () { if (autoclicker) turtleClick() })


//#endregion
//----------------------==========================-----------------------
//----------------------=======EVERY SECOND=======-----------------------
//----------------------==========================-----------------------
//#region Second

cd.jesterCooldown = 1200;

cd.itemOfTheDay = 28800


cd.shopRestock = 259200

var itemOfTheDay = {}
itemOfTheDay.item = 'I93';
itemOfTheDay.price = 'stats.totalCoins*0.015';
itemOfTheDay.bought = false;

did("itemOfTheDay").addEventListener("click", function () {
    if (rpgPlayer.coins >= eval(itemOfTheDay.price) && itemOfTheDay.bought===false && items[itemOfTheDay.item].count!==items[itemOfTheDay.item].max) {

        itemOfTheDay.bought = true;
      
        playSound("audio/button3.mp3"); 
        rpgPlayer.coins -= eval(itemOfTheDay.price);
        items[itemOfTheDay.item].count++;
        stats.boughtItems++;
        did("itemOfTheDay").style.animation = "";
        void did("itemOfTheDay").offsetWidth;
        did("itemOfTheDay").style.animation = "useSkill 0.8s 1";
        refreshItemOfTheDay()
        addItem();

    } else {
        playSound("audio/thud.mp3"); 

    }
  });


setInterval(oneSecond, 1000);
function oneSecond() {
    updateCounters();


 if (cd.jesterCooldown <= 0 && rng(1,20)===1) {
    spawnJesterTurtle();
 }

 if (cd.itemOfTheDay <= 0) {

    itemOfTheDay.bought = false;

    cd.itemOfTheDay = 28800
    itemOfTheDay.item = itemsOfTheDay[rng(0,(itemsOfTheDay.length-1))]
    refreshItemOfTheDay();
 }

did('shopRestockTimer').innerHTML = convertSecondsToDHM(cd.shopRestock)
did("priceOfTheDay").innerHTML = beautify(eval(itemOfTheDay.price))+" Turtle Coins";

 if (cd.shopRestock <= 0) {

    cd.shopRestock = 259200


    for (i in shopItems){
        if ("restock" in shopItems[i]){
            shopItems[i].stock = shopItems[i].restock

            if (did(i+ "shopItem")){

            did(i+ "shopItem").style.animation = "";
            void did(i+ "shopItem").offsetWidth;
            did(i+ "shopItem").style.animation = "levelUp 0.5s 1";

        }

            createShopItem()
        }
    }

 }


    };

const jesterEffects = ['exp','exp','drop','drop','click','click','superClick','pat','pat','superPat']

var itemsOfTheDay = ['I14', 'I26', 'I93', 'I96', 'I97', 'I174', 'I177', 'I178', 'I207', 'I210', 'I219', 'I222']

function refreshItemOfTheDay(){

    if (!itemOfTheDay.bought) {
        did("itemOfTheDayFlair").style.display = "inline";
        did("itemOfTheDayTag").style.display = "none";
    }else {
        did("itemOfTheDayFlair").style.display = "none";
        did("itemOfTheDayTag").style.display = "flex";
}
    
    
    
    did("imageOfTheDay").src = "img/src/items/"+itemOfTheDay.item+".jpg";
    did("nameOfTheDay").innerHTML = items[itemOfTheDay.item].name;
    did("nameOfTheDay").style.background = returnQualityColor(items[itemOfTheDay.item].quality);
    
}

stats.jesterTurtleClicks = 0;

function spawnJesterTurtle(){

    const div = document.createElement("div");
    div.id = 'jesterTurtle';
    div.innerHTML = '<img id="jesterImage" src="img/sys/jesterturtle.png">';
    div.style.top= rng(10,80)+'%'
    did("jesterWrapper").appendChild(div);
    setTimeout(() => {div.remove();}, 7000);
    cd.jesterCooldown = 60;

    div.addEventListener("click", function clickHandler() {
        playSound("audio/button9.mp3"); 
        stats.jesterTurtleClicks++;
        cd.jesterCooldown = 1200;
        setTimeout(() => {did("jesterImage").style.opacity = 0;}, 100);
        setTimeout(() => {div.remove()}, 1000);
        div.removeEventListener('click', clickHandler);
        animParticleBurst(10 , "particleSpark", "jesterTurtle", 0);
    
        let randomEffect = jesterEffects[rng(0,(jesterEffects.length-1))]
    
        if (randomEffect === 'exp'){
            createFloatingText('<p>EXP BOOST!')
            buffs.B23.time=120; playerBuffs();
        }
        
        if (randomEffect === 'drop'){
            createFloatingText('<p>DROP BOOST!')
            buffs.B24.time=120; playerBuffs();
        }

        if (randomEffect === 'click'){
            createFloatingText('<p>CLICK BOOST!')
            buffs.B25.time=20; playerBuffs();
        }

        if (randomEffect === 'superClick'){
            createFloatingText('<p>CLICK SUPERBOOST!')
            buffs.B26.time=20; playerBuffs();
        }

        if (randomEffect === 'pat'){
            createFloatingText('<p>PAT BOOST!')
            buffs.B27.time=30; playerBuffs();
        }

        if (randomEffect === 'superPat'){
            createFloatingText('<p>PAT SUPERBOOST!')
            buffs.B28.time=20; playerBuffs();
        }

    
    });
}


  //#endregion
//----------------------==========================-----------------------
//----------------------==========SOUNDS==========-----------------------
//----------------------==========================-----------------------
//#region Sounds

function playSound(filename){
    if (!settings.disableAudio && document.hasFocus()){
    var audio = new Audio(filename);
    audio.volume = 0.06;
    audio.play();
}
}

window.addEventListener('focus', function() {
    sellMode = false;
    did("sellModeText").style.display = "none";
});

  //#endregion
//----------------------==========================-----------------------
//----------------------======WEATHER SYSTEM======-----------------------
//----------------------==========================-----------------------
//#region Weather
stats.rpgTime = 0;
stats.currentWeather = 'day';
var bluemoonExpUp = 0;
var bluemoonDmgUp = 0;
var sakuraDropUp = 0;
var rainFishingUp = 0;
setInterval(weatherCheck, 2500); //1 day = 1 hour
function weatherCheck() {
    stats.rpgTime++;
    if (stats.rpgTime>1440) stats.rpgTime = 0;

    var hours = Math.floor(stats.rpgTime / 60);
    var minutesLeft = stats.rpgTime % 60;
    var connvertedHours = (hours < 10) ? "0" + hours : hours.toString();
    var convertedMinutes = (minutesLeft < 10) ? "0" + minutesLeft : minutesLeft.toString();
    did('rpgTime').innerHTML = connvertedHours + ":" + convertedMinutes

    if (stats.rpgTime===480){
        stats.currentWeather='day' 
        if(rng(1,15)===1) stats.currentWeather='rain'
        if(rng(1,50)===1) stats.currentWeather='sakura'
    }

    if (stats.rpgTime===1200){
        stats.currentWeather='night'
        if(rng(1,30)===1) stats.currentWeather='bluemoon'
        if(rng(1,30)===1) stats.currentWeather='snow'
        if(rng(1,100)===1) stats.currentWeather='vortex'
    }

    //este codigo se repite multiples veces pese a que claramente no deberia y no se que hacer con esto
    if (stats.currentWeather === 'day' && !(document.getElementById('currentWeather').src.endsWith("day.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/day.png"; did('weatherOverlay').style.opacity = 0; did('weatherEffectOverlay').style.opacity = 0; statsUpdate(); updateStatsUI();}
    if (stats.currentWeather === 'night' && !(document.getElementById('currentWeather').src.endsWith("night.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/night.png"; did('weatherOverlay').style.opacity = 0.5; did('weatherEffectOverlay').style.opacity = 0; statsUpdate(); updateStatsUI();}
    if (stats.currentWeather === 'bluemoon' && !(document.getElementById('currentWeather').src.endsWith("bluemoon.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/bluemoon.png"; did('weatherOverlay').style.opacity = 0.5; did('weatherOverlay').style.background = "#010028"; did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/bluemoon.gif)"; did('weatherEffectOverlay').style.opacity = "0.5"; bluemoonExpUp = 1; bluemoonDmgUp = 0.2; statsUpdate(); updateStatsUI(); }
    if (stats.currentWeather === 'vortex' && !(document.getElementById('currentWeather').src.endsWith("vortex.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/vortex.png"; did('weatherOverlay').style.opacity = 0.5; did('weatherOverlay').style.background = "#18011F" ;did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/vortex.gif)";  did('weatherEffectOverlay').style.opacity = "1";  did('weatherEffectOverlay').style.backgroundSize = "150%"; did('weatherEffectOverlay').style.backgroundPosition = "150% 60%"; statsUpdate(); updateStatsUI();}
    if (stats.currentWeather === 'rain' && !(document.getElementById('currentWeather').src.endsWith("rain.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/rain.png"; did('weatherOverlay').style.opacity = 0; did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/rain.gif)";  did('weatherEffectOverlay').style.opacity = "1"; rainFishingUp = 1; statsUpdate(); updateStatsUI();}
    if (stats.currentWeather === 'sakura' && !(document.getElementById('currentWeather').src.endsWith("sakura.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/sakura.png"; did('weatherOverlay').style.opacity = 0.2; did('weatherOverlay').style.background = "#512551" ;did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/sakura.gif)";  did('weatherEffectOverlay').style.opacity = "1"; sakuraDropUp = 1; statsUpdate(); updateStatsUI();}
    if (stats.currentWeather === 'snow' && !(document.getElementById('currentWeather').src.endsWith("snow.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/snow.png"; did('weatherOverlay').style.opacity = 0.35; did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/snow.gif)";  did('weatherEffectOverlay').style.opacity = "1"; statsUpdate(); updateStatsUI();}
    };

    function resetOverlay(){

        did('weatherOverlay').style.background = "#030222";
        did('weatherEffectOverlay').style.backgroundSize = "50%";
        did('weatherEffectOverlay').style.backgroundPosition = "100%";
        bluemoonExpUp = 0;
        bluemoonDmgUp = 0;
        sakuraDropUp = 0;
        rainFishingUp = 0;
    }

  //#endregion
//----------------------==========================-----------------------
//----------------------==========TOOLTIPS========-----------------------
//----------------------==========================-----------------------
//#region Tooltips
function resetTooltip(){
    
   did('tooltip').style.display = "none"; 
   did("tooltipArrowUp").style.display = 'none';
   did("tooltipArrow").style.display = 'flex';      
   did("upperTooltip").style.display = 'flex'; 
   did('tooltipImage').style.display = "flex"; 
   did('tooltipDescription').style.textAlign = '';    
   did("tooltipArrow").style.right = '10%';
   did("tooltipArrowRight").style.display = "none";
   did("tooltipArrowRight").style.top = ""; 
   did('tooltip').style.top = '';
   did('tooltip').style.left = ''; 
   did('tooltip').style.right = ''; 
   did('tooltip').style.bottom = '';
   did('tooltipImage').style.filter = "none"
   did("tooltip").style.backgroundImage = "url(img/sys/fondotooltip.png)";
   did("tooltipArrowUp").style.right = '2%'

   
}

function tooltipWeather() {
    did("currentWeather").addEventListener("mouseenter", function () {
    
      did("tooltip").style.display = "flex";
      if (stats.currentWeather==="day"){
         did("tooltipName").textContent = "Sunny Day";
         did("tooltipFlavor").textContent = '"The birds are singing, flowers are blooming, on days like these, turtles like you, should have a good day."';
         did("tooltipDescription").innerHTML = '<span style="color:gray">No special weather bonuses.</span>';
      }

      if (stats.currentWeather==="night"){
        did("tooltipName").textContent = "Calm Night";
        did("tooltipFlavor").textContent = '"Its oddly calm tonight."';
        did("tooltipDescription").innerHTML = '<span style="color:gray">No special weather bonuses.</span>';
     }

      if (stats.currentWeather==="bluemoon"){
        did("tooltipName").textContent = "Blue Moon";
        did("tooltipFlavor").textContent = '"The stars seem aligned today..."';
        did("tooltipDescription").innerHTML = '<span style="color:#1EFF0C">❖ Increased EXP gain by 100%<br>❖ Increased '+occultIcon+' Occult damage by 20%</span>';
     }

      if (stats.currentWeather==="rain"){
         did("tooltipName").textContent = "Rainy Day";
         did("tooltipFlavor").textContent = '"The sky is specially wet today."';
         did("tooltipDescription").innerHTML = '<span style="color:gray">No special weather bonuses.</span>';
      }

      if (stats.currentWeather==="snow"){
         did("tooltipName").textContent = "Snowy Night";
         did("tooltipFlavor").textContent = '"Beware of the yellow snow."';
         did("tooltipDescription").innerHTML = '<span style="color:gray">No special weather bonuses.</span>';
      }

      if (stats.currentWeather==="sakura"){
        did("tooltipName").textContent = "Sakura Fall";
        did("tooltipFlavor").textContent = '"Sakura petals drift, Whispering the springtimes end, Beautys gentle fall."';
        did("tooltipDescription").innerHTML = '<span style="color:#1EFF0C">❖ Increased Drop chance by 100%</span>';
     }

     if (stats.currentWeather==="vortex"){
        did("tooltipName").textContent = "Reality Shift";
        did("tooltipFlavor").textContent = '"Well that doesnt look good at all."';
        did("tooltipDescription").innerHTML = '<span style="color:gray">No special weather bonuses.</span>';
     }



      
      did("tooltipPrice").innerHTML = "";
      did("tooltipRarity").innerHTML = "Weather";
      did("tooltipRarity").style.color = "white";
      did("tooltipName").style.color = "white";
      did("tooltipImage").src = "img/src/icons/" + stats.currentWeather + ".png";
      did("tooltipArrowUp").style.display = 'flex'
      did("tooltipArrow").style.display = 'none'
      


      const movingDiv = did("tooltip");
const referenceDiv = did("currentWeather");
const referenceRect = referenceDiv.getBoundingClientRect();
const referenceRight = referenceRect.right; // Derecha de currentWeather
const referenceBottom = referenceRect.bottom + 20; // Abajo de currentWeather
const newLeft = referenceRight - movingDiv.offsetWidth;
const newTop = referenceBottom;
movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + "px";

    });
    did("currentWeather").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  } tooltipWeather();

//#endregion
//----------------------==========================-----------------------
//----------------------==========SETTINGS========-----------------------
//----------------------==========================-----------------------
//#region Settings
//-----pannel buttons-----

var settings = {
    disableClickText:false, disableAutosave:false, disablePenguinRecap: false, disableDamageNumbers: false, disableParticles: false,
};

function toggleSettings(i) {
    playSound("audio/button1.mp3");
    if (!settings[i]) {settings[i]=true}
    else if (settings[i]) {settings[i]=false}
    toggleSettingsUI()
}

function toggleSettingsUI(){
    for (let i in settings) {
    if (settings[i]) did(i).innerHTML = 'ON';
    else if (!settings[i]) did(i).innerHTML = 'OFF';
    }
}

//-----category button on the left----- (weird placement but oh well)

const tabs = ["campTab","achievementsTab","townshipTab", "rpgTab", "jobTab"];
const containers = ["achievementContainer","campContainer", "townshipContainer", "rpgContainer", "jobContainer"]
const titles =["campTitle", "achievementsTitle", "townshipTitle", "rpgTitle", "jobTitle"];


function tabSwitch(x,y,z) {
did(x).addEventListener("click", function () {

    if (!dungeonTime & !showdownTime & skirmishTime===false){
    
    if (!did(x).classList.contains("botonLateralActivo")){

        playSound("audio/button2.mp3");

containers.forEach(function(id) {
    setTimeout(function () { did(id).style.display = "none" }, 150);
    did(id).style.animation = "desvanecerPanel 0.3s";
})
        
titles.forEach(function(id) {
    setTimeout(function () { did(id).style.display = "none" }, 150);
    did(id).style.animation = "desvanecerPanel 0.3s";
})        
    
setTimeout(function () { did(y).style.display = "flex"; did(z).style.display = "flex"; }, 150);
did(y).style.animation = "aparecerPanel 0.3s"; did(z).style.animation = "aparecerPanel 0.3s";
    
tabs.forEach(function(id) { did(id).classList.remove("botonLateralActivo"); })

did(x).classList.add("botonLateralActivo");
    
stats.currentCategory = y;
}   

createRecipe()

} else {

    playSound("audio/thud.mp3");

}
    
})};

tabSwitch ("campTab", "campContainer", "campTitle");
tabSwitch ("achievementsTab", "achievementContainer", "achievementsTitle");
tabSwitch ("townshipTab", "townshipContainer", "townshipTitle");
tabSwitch ("rpgTab", "rpgContainer", "rpgTitle");
tabSwitch ("jobTab", "jobContainer", "jobTitle");


function rememberCategory(){
    
   did(stats.currentCategory).style.display = "flex"
    
   if (stats.currentCategory === "campContainer") {did("campTab").classList.add("botonLateralActivo"); did("campTitle").style.display = "flex"; }
   if (stats.currentCategory === "achievementContainer") {did("achievementsTab").classList.add("botonLateralActivo"); did("achievementsTitle").style.display = "flex";}
   if (stats.currentCategory === "townshipContainer") {did("townshipTab").classList.add("botonLateralActivo"); did("townshipTitle").style.display = "flex";}
   if (stats.currentCategory === "rpgContainer") {did("rpgTab").classList.add("botonLateralActivo"); did("rpgTitle").style.display = "flex";}
   if (stats.currentCategory === "jobContainer") {did("jobTab").classList.add("botonLateralActivo"); did("jobTitle").style.display = "flex";}
    
}


function settingsPanel (x,y){

did(x).addEventListener("click", function (event) {
    playSound("audio/button3.mp3");
    did(y).style.display = "flex";
    did("bodyCover").style.display = "flex";
    //did("body").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    did("body").style.filter = "brightness(0.2)";
    //event.stopPropagation();






});
}

settingsPanel ("botonOpciones", "opciones");





did("bodyCover").addEventListener("click", function () { closePanels() })

function closePanels(){
    playSound("audio/close.mp3")
    did("opciones").style.display = "none";
    did("estadisticas").style.display = "none";
    did("changelog").style.display = "none";
    did("deleteData").style.display = "none";
    did("mailLetter").style.display = "none";
    did("catalogue").style.display = "none";
    did("armory").style.display = "none";
    did("skillMenu").style.display = "none";
    did("mailMenu").style.display = "none";
    did("turtleRename").style.display = "none";
    did("boughtUpgradesPanel").style.display = "none";
    did("bodyCover").style.display = "none";
    did("honorShop").style.display = "none";
    did("body").style.backgroundColor = "transparent";
    did("body").style.filter = "none";
}

 
function deleteSavePrompt(){
    playSound("audio/button3.mp3")
    did("opciones").style.display = "none";
    did("deleteData").style.display = "flex";
}

//-----statistics-------

settingsPanel ("botonEstadisticas", "estadisticas");

window.addEventListener('load', function () { //gets date started
    if (stats.startedSince === 0) stats.startedSince = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
    did('estadisticaStartDate').textContent = stats.startedSince;
});


cd.presentCooldown = 0;
cd.presentCanSpawn = 0;

function timeCounters() {

    stats.activeSeconds++;
    stats.totalSeconds++;

    for (let i in cd) if (cd[i]>0) {cd[i]--}

    did("estadisticaPlaytime").textContent = convertSecondsToHMS(stats.activeSeconds);
    did("statTotalPlaytime").textContent = convertSecondsToHMS(stats.totalSeconds);


    

}setInterval(timeCounters, 1000);

//----turtle naming----

settingsPanel ("turtleName", "turtleRename");

var logTrackName = 'base';

function enterName(event) {
    if (event.key === "Enter" && did("namingBox").value.length >= 1) {stats.turtleName = did("namingBox").value; logTrackName = did("namingBox").value; displayTurtleName(); closePanels()}
}
function displayTurtleName(){ did("turtleName").textContent = stats.turtleName; did('turtleName2').textContent = stats.turtleName;}

//----bought upgrades---

settingsPanel ("boughtUpgradesButton", "boughtUpgradesPanel");

//------changelog-------

settingsPanel ("botonChangelog", "changelog");

//------unlock animation-------
function unlockAnimation(name, description, image){

    resetTooltip();
    
    did("unlockedItem").src = image; 
    did("unlockedText").innerHTML = '<strong>&nbsp;'+name+'&nbsp;</strong>';
    did("unlockedDescription").innerHTML = description;

    did("unlockPanel").onclick = null;
    did('unlockPanel').style.cursor= '';
    did("unlockAnimation").src = "img/sys/unlockAnimation.gif";
    did('unlockPanel').style.display = "flex";
    did('unlockPanel').style.transition = "all 2s";

    setTimeout(function() {
        did('unlockPanel').style.opacity = "1";
    }, 100);
    
    setTimeout(function() {
        did('unlockedAura').style.display = "flex";
        did('unlockedItem').style.display = "flex";
        did('unlockedText').style.display = "flex";
        did('unlockedDescription').style.display = "flex";
        did('unlockedText2').style.display = "flex";
    }, 1000);
    
    setTimeout(function() { did('unlockedText').style.opacity = "1"; did('unlockedDescription').style.opacity = "1"; }, 2000);
        
    setTimeout(function() {
        did('unlockedText2').style.opacity = "1";
        did('unlockPanel').style.cursor= 'pointer';
        did("unlockPanel").onclick = function () { did('unlockPanel').style.opacity = "0"; did('unlockPanel').style.cursor= ''; setTimeout(function() {
        did('unlockPanel').style.display = "none"; did('unlockedAura').style.display = "none"; did('unlockedItem').style.display = "none"; did('unlockedText').style.display = "none"; did('unlockedDescription').style.display = "none"; did('unlockedText2').style.display = "none"; did("unlockAnimation").src = "img/sys/sunRays.gif"; did('unlockedText').style.opacity = "0"; did('unlockedText2').style.opacity = "0";
    }, 2000);}
    }, 3000);
}
//#endregion
//----------------------==========================-----------------------
//----------------------===========IDLING=========-----------------------
//----------------------==========================-----------------------
//#region Idling

function convertSecondsToHMS(seconds, size) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (size==="mini") return `${minutes}m ${remainingSeconds}s`;
    else return `${hours}h ${minutes}m ${remainingSeconds}s`;
}


function convertSecondsToDHM(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m`;
}


function calculateInactiveTime() { //calculates idle time
    const lastVisitTime = localStorage.getItem('lastVisitTime');
    if (lastVisitTime) {
        const currentTime = new Date().getTime();
        const inactiveTime = currentTime - parseInt(lastVisitTime);
        const secondsInactive = Math.floor(inactiveTime / 1000);
        if (secondsInactive > 60) {
            stats.totalSeconds += secondsInactive; 
            for (let i in cd) if (cd[i]>0) {cd[i]-=secondsInactive};
            did('idleTime').innerHTML = convertSecondsToHMS(secondsInactive);
            if (farmable) offlineRewards((secondsInactive/60)*(playerPenguinPower/15));
            if (!settings.disablePenguinRecap && unlocks.penguins && farmable) { did("penguinRecap").style.display = "flex"; }
            
            for (let i in research) { if (research[i].status === "researching" && research[i].timer>1) research[i].timer -= secondsInactive}
            for (let i in areas) { if ("dungeonTimer" in areas[i] && areas[i].dungeonTimer>0) areas[i].dungeonTimer -= secondsInactive; if (areas[i].dungeonTimer<0) areas[i].dungeonTimer=0;}

        }

        localStorage.setItem('lastVisitTime', new Date().getTime());
    }
}

//-----penguin recap----

did("closeRecap").onclick = function () { did("penguinRecap").style.animation = "shrinkFadeOut 0.3s"; setTimeout(function () { did("penguinRecap").style.display = "none" }, 200); }


function tooltipPenguin() {
    did('penguinIndicatorButton').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex";
    did("tooltipName").textContent = "Penguin Helpers";
    did("tooltipPrice").innerHTML = '';
    
  
    did("tooltipRarity").textContent = 'Hard-Working Birbs';
    did("tooltipRarity").style.color = "#5A9AE5";      
    did("tooltipName").style.color = "white";     
    did('tooltipImage').src = "img/src/upgrades/P1.jpg";
       
    did("tooltipFlavor").textContent = '';
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipDescription").innerHTML = '<span style="color:gray; font-size:1.5vh;"> Penguin Helpers will gather resources and experience for you while youre offline. Your Penguin Power determines how fast you gather them. To be eligible, however, you will need to defeat the current enemy at least 100 times.<span><div class="separador"></div><span id="penguinPowerMeter" style="color:white;font-size:1.6vh; background:#42A24C; padding: 0% 2%; border-radius:0.2vh">Penguin Power: 100 (1 kill per minute)</span><div class="separador"></div><span id="penguinCurrentResource" style="color:white;font-size:1.6vh; background:#2C8A97; padding: 0% 2%; border-radius:0.2vh">Currently Gathering: Nothing</span> <img id="penguinCurrentResourceImage" src="img/src/items/I28.jpg">';
     if (enemies[stats.currentEnemy].tag==="areaBoss" || dungeonTime || stats.currentEnemy==="E20") did("tooltipDescription").innerHTML = '<span style="color:gray; font-size:1.5vh;"> Penguin Helpers will gather resources and experience for you while youre offline. Your Penguin Power determines how fast you gather them. To be eligible, however, you will need to defeat the current enemy at least 100 times.<span><div class="separador"></div><span id="penguinPowerMeter" style="color:white;font-size:1.6vh; background:#42A24C; padding: 0% 2%; border-radius:0.2vh">Penguin Power: 100 (1 kill per minute)</span><div class="separador"></div><span style="color:white;font-size:1.6vh; background:coral; padding: 0% 2%; border-radius:0.2vh">Currently Gathering: Not Available!</span> <img src="img/src/icons/missing.jpg">';

    let currentDrop = "";

    if (enemies[stats.currentEnemy].drop && enemies[stats.currentEnemy].drop.includes('dropItem')) {
        const startIndex = enemies[stats.currentEnemy].drop.indexOf("dropItem('") + "dropItem('".length;
        const endIndex = enemies[stats.currentEnemy].drop.indexOf("')", startIndex);
        if (startIndex !== -1 && endIndex !== -1) {
            currentDrop = enemies[stats.currentEnemy].drop.substring(startIndex, endIndex);
        }
    }
    

    if (did("penguinCurrentResource")){
    did("penguinCurrentResource").innerHTML = 'Currently Gathering: '+items[currentDrop].name
    did("penguinCurrentResourceImage").src = "img/src/items/"+currentDrop+".jpg";
    }

    did("penguinPowerMeter").innerHTML = 'Penguin Power: '+beautify(playerPenguinPower)+' ('+(playerPenguinPower/15).toFixed(1)+' kills per minute)';



      did("tooltipArrowUp").style.display = 'flex';
      did("tooltipArrowUp").style.right = '91%'
      did("tooltipArrow").style.display = 'none'


      const movingDiv = did('tooltip');
const referenceDiv = did('penguinIndicatorButton');
const referenceRect = referenceDiv.getBoundingClientRect();
const newLeft = referenceRect.left;
const newTop = referenceRect.top + 50;
movingDiv.style.left = newLeft + 'px';
movingDiv.style.top = newTop + 'px';
    
        
  });
    did('penguinIndicatorButton').addEventListener('mouseleave', function () {
    resetTooltip();
    });
  
}

tooltipPenguin()


function offlineRewards(amount, concept){
if (enemies[stats.currentEnemy].tag!=="areaBoss" && !dungeonTime && stats.currentEnemy!=="E20") {
    let currentDrop = "";

    if (enemies[stats.currentEnemy].drop && enemies[stats.currentEnemy].drop.includes('dropItem')) {
        const startIndex = enemies[stats.currentEnemy].drop.indexOf("dropItem('") + "dropItem('".length;
        const endIndex = enemies[stats.currentEnemy].drop.indexOf("')", startIndex);
        if (startIndex !== -1 && endIndex !== -1) {
            currentDrop = enemies[stats.currentEnemy].drop.substring(startIndex, endIndex);
        }
    }


    if (concept==='egg'){

        createPopup('&#9201; Time Skipped and gathered '+beautify(Math.round(amount))+'<img src="img/src/items/'+currentDrop+'.jpg">and '+beautify(enemies[stats.currentEnemy].exp/6 * Math.round(amount))+' EXP', '#4e9690')

    }

if (stats.currentArea === "A1") rollTable(area1Loot, amount/7)
if (stats.currentArea === "A2") rollTable(area2Loot, amount/7)
if (stats.currentArea === "A3") rollTable(area3Loot, amount/7)
if (stats.currentArea === "A4") rollTable(area4Loot, amount/7)



items[currentDrop].count += Math.round(amount);
rpgClass[stats.currentClass].currentExp += enemies[stats.currentEnemy].exp/6 * Math.round(amount);

did("idleItem").innerHTML = beautify(Math.round(amount));
did("idleItemImg").src = "img/src/items/"+currentDrop+".jpg";
did("idleExp").innerHTML = beautify(enemies[stats.currentEnemy].exp * Math.round(amount));

expBar();
addItem();

}

}
//#endregion
//----------------------==========================-----------------------
//----------------------===========DEBUG==========-----------------------
//----------------------==========================-----------------------
//#region Debug
function diablo() {document.getElementById("cheatPanel").style.display = "flex"; console.log('modo diablo activado')}
//#endregion
//----------------------==========================-----------------------
//----------------------===========SAVING=========-----------------------
//----------------------==========================-----------------------
//#region Saving
//------autosave-------

function autosave() {


    if (!did('savePopUp')) createPopup('<img src="img/sys/saved.png"> Game Saved', 'save', 'savePopUp')

    save();
    
}

setInterval(function() { if (!settings.disableAutosave) { autosave(); } }, 60000);

document.addEventListener("keydown", function (event) {
    var turtleRename = did("turtleRename");
    if (event.key === "s" && turtleRename.style.display === "none") autosave()  
});

//----save and load----

function save() {

localStorage.setItem('lastVisitTime', new Date().getTime());
    
  const saveData = {}
  saveData.savedItemCount = {}; for (const i in items) { saveData.savedItemCount[i] = items[i].count;}
  saveData.savedItemCD = {}; for (const i in items) { saveData.savedItemCD[i] = items[i].cd;}
  saveData.savedItemStats = {}; for (const i in items) { saveData.savedItemStats[i] = items[i].statUp;}
  saveData.savedItemGot = {}; for (const i in items) { saveData.savedItemGot[i] = items[i].gotOnce;}
  saveData.savedItemStamp1 = {}; for (const i in items) { saveData.savedItemStamp1[i] = items[i].stamp1;}
  saveData.savedItemStamp2 = {}; for (const i in items) { saveData.savedItemStamp2[i] = items[i].stamp2;}
  saveData.savedItemStamp3 = {}; for (const i in items) { saveData.savedItemStamp3[i] = items[i].stamp3;}

  saveData.savedMailGot = {}; for (const i in mail) { saveData.savedMailGot[i] = mail[i].recieved;}
  saveData.savedMailRead = {}; for (const i in mail) { saveData.savedMailRead[i] = mail[i].read;}


  saveData.savedBuffTime = {}; for (const i in buffs) { saveData.savedBuffTime[i] = buffs[i].time;}
  saveData.savedBuffStacks = {}; for (const i in buffs) { saveData.savedBuffStacks[i] = buffs[i].stacks;}

  
  saveData.savedEnemyKills = {}; for (const i in enemies) { saveData.savedEnemyKills[i] = enemies[i].killCount;}

  saveData.savedQuestState = {}; for (const i in quests) { saveData.savedQuestState[i] = quests[i].state;}
  saveData.savedQuestLock = {}; for (const i in quests) { saveData.savedQuestLock[i] = quests[i].locked;}
  
    
  saveData.savedAreaActive = {}; for (const i in areas) { saveData.savedAreaActive[i] = areas[i].active;} 
  saveData.savedAreaUnlocked = {}; for (const i in areas) { saveData.savedAreaUnlocked[i] = areas[i].unlocked;}  

   
  saveData.savedAreaBoss = {}; for (const i in areas) { saveData.savedAreaBoss[i] = areas[i].boss;}  
  saveData.savedAreaOre = {}; for (const i in areas) { saveData.savedAreaOre[i] = areas[i].unlockedOre;}
  saveData.savedAreaHerb = {}; for (const i in areas) { saveData.savedAreaHerb[i] = areas[i].unlockedHerb;}
  saveData.savedAreaPond = {}; for (const i in areas) { saveData.savedAreaPond[i] = areas[i].unlockedPond;}

  saveData.savedRecipeTime = {}; for (const i in recipes) { saveData.savedRecipeTime[i] = recipes[i].time;}  
  saveData.savedRecipeCrafting = {}; for (const i in recipes) { saveData.savedRecipeCrafting[i] = recipes[i].crafting;}
  saveData.savedRecipeUnlocked = {}; for (const i in recipes) { saveData.savedRecipeUnlocked[i] = recipes[i].unlocked;}

  saveData.savedLogsUnlocked = {}; for (const i in logs) { saveData.savedLogsUnlocked[i] = logs[i].unlocked;}
  saveData.savedLogsOnce = {}; for (const i in logs) { saveData.savedLogsOnce[i] = logs[i].once;}
  saveData.savedLogsRevealed = {}; for (const i in logs) { saveData.savedLogsRevealed[i] = logs[i].revealed;}


  saveData.savedJobLevel = {}; for (const i in jobs) { saveData.savedJobLevel[i] = jobs[i].level;}
  saveData.savedJobExp = {}; for (const i in jobs) { saveData.savedJobExp[i] = jobs[i].exp;}  
  saveData.savedJobMaxExp = {}; for (const i in jobs) { saveData.savedJobMaxExp[i] = jobs[i].maxExp;}
    
  saveData.savedJobPanelHidden = {}; for (const i in jobPanels) { saveData.savedJobPanelHidden[i] = jobPanels[i].hidden;}    
  saveData.savedJobPanelUnlock = {}; for (const i in jobPanels) { saveData.savedJobPanelUnlock[i] = jobPanels[i].unlocked;}  
    
  saveData.savedShopStock = {}; for (const i in shopItems) { saveData.savedShopStock[i] = shopItems[i].stock;}  
  saveData.savedShopUnlocked = {}; for (const i in shopItems) { saveData.savedShopUnlocked[i] = shopItems[i].unlocked;}  
    
    
  saveData.savedPlayerData = {}; for (const i in rpgPlayer) { saveData.savedPlayerData[i] = rpgPlayer[i];}  
  saveData.savedCdData = {}; for (const i in cd) { saveData.savedCdData[i] = cd[i];}  
  saveData.savedSettingsData = {}; for (const i in settings) { saveData.savedSettingsData[i] = settings[i];}
  saveData.savedStatsData = {}; for (const i in stats) { saveData.savedStatsData[i] = stats[i];}
  saveData.savedUnlocksData = {}; for (const i in unlocks) { saveData.savedUnlocksData[i] = unlocks[i];}
  saveData.savedClassData = {}; for (const i in rpgClass) { saveData.savedClassData[i] = rpgClass[i];}  

  saveData.savedBuildingLevel = {}; for (const i in buildings) { saveData.savedBuildingLevel[i] = buildings[i].level;}
  saveData.savedBuildingMaxLevel = {}; for (const i in buildings) { saveData.savedBuildingMaxLevel[i] = buildings[i].maxLevel;}
  saveData.savedBuildingUnlock = {}; for (const i in buildings) { saveData.savedBuildingUnlock[i] = buildings[i].unlocked;}

  saveData.savedResearchTimer = {}; for (const i in research) { saveData.savedResearchTimer[i] = research[i].timer;}
  saveData.savedResearchStatus = {}; for (const i in research) { saveData.savedResearchStatus[i] = research[i].status;}
  saveData.savedResearchUnlocked = {}; for (const i in research) { saveData.savedResearchUnlocked[i] = research[i].unlocked;}

  saveData.savedJobUnlocked = {}; for (const i in jobPanels) { saveData.savedJobUnlocked[i] = jobPanels[i].unlocked;}

  saveData.savedTalents = {}; for (const i in talent) { saveData.savedTalents[i] = talent[i].active;}
  saveData.savedTalentsStats = {}; for (const i in talent) { saveData.savedTalentsStats[i] = talent[i].statUp;}


  saveData.savedItemOfTheDay = {}; for (const i in itemOfTheDay) { saveData.savedItemOfTheDay[i] = itemOfTheDay[i];}

  saveData.savedRecipePanelUnlocked = {}; for (const i in jobPanels) { saveData.savedRecipePanelUnlocked[i] = jobPanels[i].unlocked;}

  saveData.savedShowdownRecord = {}; for (const i in showdown) { saveData.savedShowdownRecord[i] = showdown[i].bestTime;}

  saveData.savedHonorStock = {}; for (const i in shopHonor) { saveData.savedHonorStock[i] = shopHonor[i].stock;}

  saveData.savedCollectiblePrice = {}; for (const i in items) { if ("collectible" in items[i]) { saveData.savedCollectiblePrice[i] = items[i].sell;} }

  saveData.savedDungeonTimer = {}; for (const i in areas) { if ("dungeonTimer" in areas[i]) { saveData.savedDungeonTimer[i] = areas[i].dungeonTimer;} }

  saveData.savedSkirmishRecord = {}; for (const i in skirmish) { saveData.savedSkirmishRecord[i] = skirmish[i].bestScore;}

  saveData.savedItemArmory = {}; for (const i in items) { saveData.savedItemArmory[i] = items[i].armoryState;}

  saveData.savedItemLocked = {}; for (const i in items) { saveData.savedItemLocked[i] = items[i].locked;}

  saveData.savedItemFavorited = {}; for (const i in items) { saveData.savedItemFavorited[i] = items[i].favorited;}


    
  const JSONData = JSON.stringify(saveData);
  localStorage.setItem('saveData', JSONData);
}

function load() {
  const datosGuardados = localStorage.getItem('saveData');
  if (datosGuardados) { //checks if savedata available
    const parsedData = JSON.parse(datosGuardados);

    for (const i in parsedData.savedItemFavorited) { items[i].favorited = parsedData.savedItemFavorited[i];}

    for (const i in parsedData.savedItemLocked) { items[i].locked = parsedData.savedItemLocked[i];}

    for (const i in parsedData.savedItemArmory) { items[i].armoryState = parsedData.savedItemArmory[i];}

    for (const i in parsedData.savedSkirmishRecord) { skirmish[i].bestScore = parsedData.savedSkirmishRecord[i];}

    for (const i in parsedData.savedDungeonTimer) { areas[i].dungeonTimer = parsedData.savedDungeonTimer[i];}

    for (const i in parsedData.savedCollectiblePrice) { items[i].sell = parsedData.savedCollectiblePrice[i];}

    for (const i in parsedData.savedHonorStock) { shopHonor[i].stock = parsedData.savedHonorStock[i];}  

    for (const i in parsedData.savedShowdownRecord) { showdown[i].bestTime = parsedData.savedShowdownRecord[i];}  

    for (const i in parsedData.savedRecipePanelUnlocked) { jobPanels[i].unlocked = parsedData.savedRecipePanelUnlocked[i];}  

    for (const i in parsedData.savedItemOfTheDay) { itemOfTheDay[i] = parsedData.savedItemOfTheDay[i];}

    for (const i in parsedData.savedResearchUnlocked) { research[i].unlocked = parsedData.savedResearchUnlocked[i];}  
    for (const i in parsedData.savedResearchTimer) { research[i].timer = parsedData.savedResearchTimer[i];}  
    for (const i in parsedData.savedResearchStatus) { research[i].status = parsedData.savedResearchStatus[i];}  

    for (const i in parsedData.savedJobUnlocked) { jobPanels[i].unlocked = parsedData.savedJobUnlocked[i];}  

    for (const i in parsedData.savedTalents) { talent[i].active = parsedData.savedTalents[i];}  
    for (const i in parsedData.savedTalentsStats) { talent[i].statUp = parsedData.savedTalentsStats[i];}  


    for (const i in parsedData.savedBuildingLevel) { buildings[i].level = parsedData.savedBuildingLevel[i];}  
    for (const i in parsedData.savedBuildingUnlock) { buildings[i].unlocked = parsedData.savedBuildingUnlock[i];}  
    for (const i in parsedData.savedBuildingMaxLevel) { buildings[i].maxLevel = parsedData.savedBuildingMaxLevel[i];}  

    
    for (const i in parsedData.savedLogsUnlocked) { logs[i].unlocked = parsedData.savedLogsUnlocked[i];}  
    for (const i in parsedData.savedLogsOnce) { logs[i].once = parsedData.savedLogsOnce[i];}  
    for (const i in parsedData.savedLogsRevealed) { logs[i].revealed = parsedData.savedLogsRevealed[i];}  


    for (const i in parsedData.savedMailGot) { mail[i].recieved = parsedData.savedMailGot[i];}  
    for (const i in parsedData.savedMailRead) { mail[i].read = parsedData.savedMailRead[i];}  


    for (const i in parsedData.savedJobLevel) { jobs[i].level = parsedData.savedJobLevel[i];}  
    for (const i in parsedData.savedJobExp) { jobs[i].exp = parsedData.savedJobExp[i];}
    for (const i in parsedData.savedJobMaxExp) { jobs[i].maxExp = parsedData.savedJobMaxExp[i];}  
      
    for (const i in parsedData.savedJobPanelHidden) { jobPanels[i].hidden = parsedData.savedJobPanelHidden[i];}  
    for (const i in parsedData.savedJobPanelUnlock) { jobPanels[i].unlocked = parsedData.savedJobPanelUnlock[i];}  
      
    for (const i in parsedData.savedShopStock) { shopItems[i].stock = parsedData.savedShopStock[i];}
    for (const i in parsedData.savedShopUnlocked) { shopItems[i].unlocked = parsedData.savedShopUnlocked[i];}  
      
    for (const i in parsedData.savedAreaActive) { areas[i].active = parsedData.savedAreaActive[i];}  
    for (const i in parsedData.savedAreaUnlocked) { areas[i].unlocked = parsedData.savedAreaUnlocked[i];}  

    
    for (const i in parsedData.savedAreaBoss) { areas[i].boss = parsedData.savedAreaBoss[i];}  
    for (const i in parsedData.savedAreaOre) { areas[i].unlockedOre = parsedData.savedAreaOre[i];}  
    for (const i in parsedData.savedAreaHerb) { areas[i].unlockedHerb = parsedData.savedAreaHerb[i];}
    for (const i in parsedData.savedAreaPond) { areas[i].unlockedPond = parsedData.savedAreaPond[i];}
      
    for (const i in parsedData.savedRecipeTime) { recipes[i].time = parsedData.savedRecipeTime[i];}
    for (const i in parsedData.savedRecipeCrafting) { recipes[i].crafting = parsedData.savedRecipeCrafting[i];}  
    for (const i in parsedData.savedRecipeUnlocked) { recipes[i].unlocked = parsedData.savedRecipeUnlocked[i];}
  

    for (const i in parsedData.savedItemCount) { items[i].count = parsedData.savedItemCount[i];}
    for (const i in parsedData.savedItemCD) { items[i].cd = parsedData.savedItemCD[i];}
    for (const i in parsedData.savedItemStats) { items[i].statUp = parsedData.savedItemStats[i];}
    for (const i in parsedData.savedItemGot) { items[i].gotOnce = parsedData.savedItemGot[i];}

    for (const i in parsedData.savedItemStamp1) { items[i].stamp1 = parsedData.savedItemStamp1[i];}
    for (const i in parsedData.savedItemStamp2) { items[i].stamp2 = parsedData.savedItemStamp2[i];}
    for (const i in parsedData.savedItemStamp3) { items[i].stamp3 = parsedData.savedItemStamp3[i];}


    for (const i in parsedData.savedBuffTime) { buffs[i].time = parsedData.savedBuffTime[i];}
    for (const i in parsedData.savedBuffStacks) { buffs[i].stacks = parsedData.savedBuffStacks[i];}
    
    for (const i in parsedData.savedEnemyKills) { enemies[i].killCount = parsedData.savedEnemyKills[i];}

    for (const i in parsedData.savedQuestState) { quests[i].state = parsedData.savedQuestState[i];}
    for (const i in parsedData.savedQuestLock) { quests[i].locked = parsedData.savedQuestLock[i];}

    for (const i in parsedData.savedPlayerData) { rpgPlayer[i] = parsedData.savedPlayerData[i];}  
    for (const i in parsedData.savedCdData) { cd[i] = parsedData.savedCdData[i];}  
    for (const i in parsedData.savedSettingsData) { settings[i] = parsedData.savedSettingsData[i];}
    for (const i in parsedData.savedStatsData) { stats[i] = parsedData.savedStatsData[i];}
    for (const i in parsedData.savedUnlocksData) { unlocks[i] = parsedData.savedUnlocksData[i];}  

    for (const i in parsedData.savedClassData) { rpgClass[i] = parsedData.savedClassData[i];}  
    

      
  }
}

function deleteSave() {
    localStorage.removeItem('saveData');
    localStorage.removeItem('lastVisitTime');
    location.reload();
};

function exportJSON() {

    save();

    
    if (!localStorage.getItem('saveData')){ if (!did('importPopUp')) {createPopup('&#10060; No SaveData Found', '#913c3c', 'importPopUp')} } else {
    
    const datosGuardados = localStorage.getItem('saveData');
    const jsonData = JSON.parse(datosGuardados);
    
    const jsonStr = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "SuperSaveData.json";
    a.click();
    URL.revokeObjectURL(url);
        
        
    }
}

function importJSON() {
    
    
    
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const importedData = JSON.parse(e.target.result);
                const JSONData = JSON.stringify(importedData);
                localStorage.setItem('saveData', JSONData);
                location.reload();
            };
            reader.readAsText(file);
        }
    });
    input.click();
        
        
}

//#endregion
//----------------------==========================-----------------------
//----------------------==========DOM LOAD========-----------------------
//----------------------==========================-----------------------
//#region Load

function googleTranslateElementInit() {
    new google.translate.TranslateElement({ layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL }, 'google_translate_element');
}

function unlocksReveal(){

    if (unlocks.jobs) did('jobTab').style.display = "flex";
    if (unlocks.garrison) did('campTab').style.display = "flex";
    if (unlocks.itemOfTheDay) did('itemOfTheDay').style.display = "flex";
    if (unlocks.journal) did('achievementsTab').style.display = "flex";
    if (unlocks.penguins) {did('disablePenguinRecapButton').style.display = "inline"; did('penguinIndicatorButton').style.display = "flex"; did('penguinIndicator').style.display = "flex"; }
    if (unlocks.inventorySorting) {
        did('inventorySorters2').style.display = "flex";
        did('addFavoriteButton').style.display = "flex";
}
    if (unlocks.shop) {did('shopButton').className = "gearButtonInactive"; if (stats.currentArea !== "A7") did('shopButton').innerHTML = "Shop"; }
    if (unlocks.dungeons) {did('dungeonButton').innerHTML = "Dungeon"; did('dungeonButton').className = "gearButtonInactive"}
    if (unlocks.areas) {did('areaButton').innerHTML = "Area"; did('areaButton').className = "gearButtonInactive"}
    //if (quests.A2Q3.state==="completed") {area1Common.I126 = {}; area1Common.I126.D=30; area1Common.I126.C=1; }
    if (unlocks.skills) {
        did("expPanel").className = "expPanelUnlocked"; 
        did('unspentTalent').style.display = "inline";
        did('skillsButton').innerHTML = "Skills";
        did('skillsButton').className = "gearButtonInactive";}
    if (unlocks.magic) {
        did('magicBar').style.visibility = "visible";
        did('skillSlot1').style.display = "flex";
        did('skillSlot2').style.display = "flex";
        did('skillSlot3').style.display = "flex";
        did('skillSlot4').style.display = "flex";
        did('skillSlot0').style.display = "flex";
        did('rpgCanvasUnder').style.background = "#19191C";
        did('encounterWrapper').style.marginTop = "0.1%";
    }
    if (unlocks.presentSwitch) {did('presentSwitch').style.display = "flex";}
    if (settings.presentSwitch) {did("presentSwitch").style.borderColor = "lawngreen";}


    if (stats.questsCompleted>=3 && !mail.M2.recieved) sendMail("M2");
    if (stats.questsCompleted>=5 && !mail.M5.recieved) sendMail("M5");
    if (stats.questsCompleted>=8 && !mail.M3.recieved) sendMail("M3");
    if (stats.questsCompleted>=16 && !mail.M6.recieved) sendMail("M6");
    if (stats.questsCompleted>=20 && !mail.M7.recieved) sendMail("M7");
    if (stats.questsCompleted>=24 && !mail.M9.recieved) sendMail("M9");
    if (enemies.E23.killCount>0 && !mail.M8.recieved) sendMail("M8");
    if (enemies.E12.killCount>0 && rpgClass.noClass.level===30 && !mail.M4.recieved) sendMail("M4");
    
}


function retroactiveUpdate(){

    if (quests.A3Q6.state === "completed") shopItems.A3S16.unlocked = true;






}

function upgradesReveal(){
    for (let i in items) {
        if (items[i].quality==="Upgrade" && items[i].gotOnce && !did(i+"upgrades")) {
            const div = document.createElement("img");
            div.id = i+"upgrades";
            did('boughtUpgrades').appendChild(div);
            div.src = "img/src/items/"+i+".jpg";  
            tooltipUpgrades(i)
        }
    }
}




function tooltipUpgrades(i) {
    if (did(i+"upgrades")) {
    did(i+"upgrades").addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex";
    did("tooltipName").textContent = items[i].name;
    did("tooltipPrice").innerHTML = '';
    did("tooltipRarity").textContent = 'Upgrade';
    did("tooltipRarity").style.color = "#00FFCA";      
    did("tooltipName").style.color = "#00FFCA";     
    did("tooltipDescription").innerHTML = items[i].description+'<br><div class="separador"></div>';
    did('tooltipImage').src = "img/src/items/"+i+".jpg";
    did("tooltipFlavor").textContent = items[i].flavor;
  
    
    const movingDiv = did('tooltip');
    const referenceDiv = did(i+"upgrades");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 33;
    const referenceTop = referenceRect.top - 15;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
    
        
  });
    did(i+"upgrades").addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }
}


function randomTabName(){ //displays a random browser tab name
    let random = rng(1,11);
    if (random===1) document.title = "Your Turtle Is Working Hard"; 
    if (random===2) document.title = "Where Is My Day Off?";
    if (random===3) document.title = "They Shall Rise Again";
    if (random===4) document.title = "Slaying Beasts";
    if (random===5) document.title = "Exploring Uncharted Lands";
    if (random===6) document.title = "Adventuring In Progress";
    if (random===7) document.title = "Pat Pat Pat Pat Pat Pat Pat Pat";
    if (random===8) document.title = "Grinding Materials";
    if (random===9) document.title = "Super Turtle Idle";
    if (random===10) document.title = "You Can Leave It To Me";
    if (random===11) document.title = "Have You Seen Whiskers?";


}


document.addEventListener('DOMContentLoaded', initialization);

function initialization() {
    load();
    toggleSettingsUI();
    displayTurtleName();
    oneSecond();
    rememberCategory(); //remembers tab on the left
    unlocksReveal();
    weatherCheck();
    randomTabName();
    refreshItemOfTheDay();
    addItem();
    setCursor();
    upgradesReveal();
    retroactiveUpdate();

}
//#endregion