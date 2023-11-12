//#region Thats hell youre walking in

const did = (id) => document.getElementById(id); 

function rng(min, max) { //gives a random number between the two
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

window.addEventListener("contextmenu", function (e) { //disables web right click
    e.preventDefault();
}); 

window.addEventListener('keydown', function (event) { //disables alt key
    if (event.keyCode === 18) { event.preventDefault(); return false; }
});

function beautify(number) {
    number = number >= 9999999 ? number.toExponential(3) : number.toFixed(0);
    return number;
    };

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

    };
//#endregion
//----------------------==========================-----------------------
//----------------------=======ON TURTLE CLICK====-----------------------
//----------------------==========================-----------------------
//#region Click
let clickCooldown = false;

unlocks.present = false;

did("tortugaClick").onclick = function () {
    
if (!clickCooldown) {
    
    rpgPlayer.coins += playerCoinsPerClick;
    stats.clickCount++
    stats.totalCoinsClick += playerCoinsPerClick
    playSound("audio/throw.mp3")
    //turtle image shift
    if (stats.clickCount % 40 === 0) {
            const randomImageIndex = Math.floor(Math.random() * 5) + 1;
            const imagePath = "img/src/tortugasdefault/img" + randomImageIndex + ".png";
            did("tortugaClick").src = imagePath;
            let rnglet = rng(1,4)
            if (rnglet===1)playSound("audio/lily2.mp3");
            else playSound("audio/lily.mp3");

            if (unlocks.present && stats.presentCooldown){
                stats.presentCooldown = false;
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
    let animTortuga = did("tortugaClick")
    animTortuga.style.padding = "8%"
    animTortuga.style.transition = "0.07s ease-out"
    setTimeout(function () { animTortuga.style.padding = "0%"; }, 100);
    
    //floating value div
    if (!settings.disableClickText) {
    var textoClick1 = document.createElement('div');
    textoClick1.className = 'textoClick';
    textoClick1.style.left = (event.clientX + (window.scrollX || window.pageXOffset) - 10) + 'px';
    textoClick1.style.top = (event.clientY + (window.scrollY || window.pageYOffset) - 40) + 'px';
    textoClick1.innerHTML = '<p>+' + (beautify(playerCoinsPerClick)) + '<img src="img/sys/coin.png" />'; 
    
    document.body.appendChild(textoClick1);
    setTimeout(function () { textoClick1.remove(); }, 490); }
    
    updateCounters();
    
clickCooldown = true;
setTimeout(function () {clickCooldown = false;}, 120);
}
};
//#endregion
//----------------------==========================-----------------------
//----------------------=======EVERY SECOND=======-----------------------
//----------------------==========================-----------------------
//#region Second
setInterval(oneSecond, 1000);
function oneSecond() {
    updateCounters();
    };

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

  //#endregion
//----------------------==========================-----------------------
//----------------------======WEATHER SYSTEM======-----------------------
//----------------------==========================-----------------------
//#region Weather
stats.rpgTime = 0;
stats.currentWeather = 'day';
var bluemoonExpUp = 0;
var bluemoonDmgUp = 0;
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

    if (stats.currentWeather === 'day' && did('currentWeather').src !== "img/src/icons/day.png"){ resetOverlay(); did('currentWeather').src = "img/src/icons/day.png"; did('weatherOverlay').style.opacity = 0; did('weatherEffectOverlay').style.opacity = 0}
    if (stats.currentWeather === 'night' && did('currentWeather').src !== "img/src/icons/night.png"){ resetOverlay(); did('currentWeather').src = "img/src/icons/night.png"; did('weatherOverlay').style.opacity = 0.7; did('weatherEffectOverlay').style.opacity = 0}
    if (stats.currentWeather === 'bluemoon' && did('currentWeather').src !== "img/src/icons/bluemoon.png"){ resetOverlay(); did('currentWeather').src = "img/src/icons/bluemoon.png"; did('weatherOverlay').style.opacity = 0.7; did('weatherOverlay').style.background = "#010028"; did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/bluemoon.gif)"; did('weatherEffectOverlay').style.opacity = "0.5"; bluemoonExpUp = 1; bluemoonDmgUp = 0.2; statsUpdate() }
    if (stats.currentWeather === 'vortex' && did('currentWeather').src !== "img/src/icons/vortex.png"){ resetOverlay(); did('currentWeather').src = "img/src/icons/vortex.png"; did('weatherOverlay').style.opacity = 0.7; did('weatherOverlay').style.background = "#18011F" ;did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/vortex.gif)";  did('weatherEffectOverlay').style.opacity = "1";  did('weatherEffectOverlay').style.backgroundSize = "150%"; did('weatherEffectOverlay').style.backgroundPosition = "150% 60%";}
    if (stats.currentWeather === 'rain' && did('currentWeather').src !== "img/src/icons/rain.png"){ resetOverlay(); did('currentWeather').src = "img/src/icons/rain.png"; did('weatherOverlay').style.opacity = 0.3; did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/rain.gif)";  did('weatherEffectOverlay').style.opacity = "1"; }
    if (stats.currentWeather === 'sakura' && did('currentWeather').src !== "img/src/icons/sakura.png"){ resetOverlay(); did('currentWeather').src = "img/src/icons/sakura.png"; did('weatherOverlay').style.opacity = 0.2; did('weatherOverlay').style.background = "#512551" ;did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/sakura.gif)";  did('weatherEffectOverlay').style.opacity = "1";}
    if (stats.currentWeather === 'snow' && did('currentWeather').src !== "img/src/icons/snow.png"){ resetOverlay(); did('currentWeather').src = "img/src/icons/snow.png"; did('weatherOverlay').style.opacity = 0.3; did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/snow.gif)";  did('weatherEffectOverlay').style.opacity = "1";}

    function resetOverlay(){

        did('weatherOverlay').style.background = "#030222";
        did('weatherEffectOverlay').style.backgroundSize = "50%";
        did('weatherEffectOverlay').style.backgroundPosition = "100%";
        bluemoonExpUp = 0;
        bluemoonDmgUp = 0;
        statsUpdate()

    }

    };

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
        did("tooltipDescription").innerHTML = '<span style="color:#1EFF0C">❖ Multiplied EXP gain by 2<br>❖ Multiplied '+occultIcon+' Occult damage by 1.2</span>';
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
        did("tooltipDescription").innerHTML = '<span style="color:#1EFF0C">❖ Multiplied Drop and Turtle Coins gains by 2</span>';
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
    disableClickText:false, disableAutosave:false, disablePenguinRecap: false, disableDamageNumbers: false,
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
    did("body").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    did("body").style.filter = "blur(5px) brightness(0.5)";
    event.stopPropagation();
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
    did("turtleRename").style.display = "none";
    did("boughtUpgradesPanel").style.display = "none";
    did("bodyCover").style.display = "none";
    did("body").style.backgroundColor = "transparent";
    did("body").style.filter = "blur(0) brightness(1)";
}

function CategoryHandler(x,y,z){
    
    did(x).addEventListener("click", function () {
    changeBuilding(y, z);
        
});     
}

CategoryHandler ('botonCategoriaBanco','panelBanco','botonCategoriaBanco');
 
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

stats.presentCooldown = true;

function sumarSegundo() { //every second adds a second to playtime
    function actualizarContador() {
        stats.totalSeconds++;
        const horas = Math.floor(stats.totalSeconds / 3600);
        const minutos = Math.floor((stats.totalSeconds % 3600) / 60);
        const segundos = stats.totalSeconds % 60;
        const mostrarHoras = horas.toString().padStart(2, '0');
        const mostrarMinutos = minutos.toString().padStart(2, '0');
        const mostrarSegundos = segundos.toString().padStart(2, '0');
        did("estadisticaPlaytime").textContent = `${mostrarHoras}h ${mostrarMinutos}m ${mostrarSegundos}s`;

        if (stats.totalSeconds % 43200 === 0) { //every 12 hours
            stats.presentCooldown = true;
          }
    }
    setInterval(actualizarContador, 1000);
}
sumarSegundo();

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
function increaseCoins(amount) { //converts idle time into resources
    
    let monedas = ((amount) * rpgPlayer.coins.second * rpgPlayer.coins.upgrades * (player.penguins.amount / 10));
    let recursos = ((amount) * player.resources.second * player.resources.upgrades* (player.penguins.amount / 10));
    let alimento = ((amount) * player.supplies.second * player.supplies.upgrades* (player.penguins.amount / 10));
    let energia = ((amount) * player.energy.second * player.energy.upgrades* (player.penguins.amount / 10));
    
    if (stats.activeTreaty === "resources"){recursos += (alimento / 2) + (energia / 2); alimento = alimento / 2; energia = energia / 2;}
    if (stats.activeTreaty === "supplies"){alimento += (recursos / 2) + (energia / 2); recursos = recursos / 2; energia = energia / 2;}
    if (stats.activeTreaty === "energy"){energia += (recursos / 2) + (alimento / 2); alimento = alimento / 2; recursos = recursos / 2;}

    stats.totalCoins += monedas;
    stats.totalResources += recursos;
    stats.totalSupplies += alimento;
    stats.totalEnergy += energia;
    
    rpgPlayer.coins += monedas;
    player.resources.amount += recursos;
    player.supplies.amount += alimento;
    player.energy.amount += energia;
    
    //penguin recap
    did("idleCoins").textContent = beautify(monedas);
    did("idleResources").textContent = beautify(recursos);
    did("idleSupplies").textContent = beautify(alimento);
    did("idleEnergy").textContent = beautify(energia);

    updateCounters();
}

function convertSecondsToHMS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

function calculateInactiveTime() { //calculates idle time
    const lastVisitTime = localStorage.getItem('lastVisitTime');
    if (lastVisitTime && unlocks.penguins === 1) {
        const currentTime = new Date().getTime();
        const inactiveTime = currentTime - parseInt(lastVisitTime);
        const secondsInactive = Math.floor(inactiveTime / 1000);
        if (secondsInactive > 0) {
            increaseCoins(secondsInactive); 
            did("idleTime").textContent = convertSecondsToHMS(secondsInactive);
        }
    }
    localStorage.setItem('lastVisitTime', new Date().getTime());
}

//-----penguin recap----

did("closeRecap").onclick = function () { did("penguinRecap").style.animation = "shrinkFadeOut 0.3s"; setTimeout(function () { did("penguinRecap").style.display = "none" }, 200); }

function penguinRecapToggle(){
if (!settings.disablePenguinRecap && unlocks.penguins === 1) did("penguinRecap").style.display = "flex"
}
//#endregion
//----------------------==========================-----------------------
//----------------------=========TOWNSHIP=========-----------------------
//----------------------==========================-----------------------
//#region Township
const scrollContainer = did("treatiesList");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

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
    
    did("panelAutosave").style.display = "flex";
    did("panelAutosave").style.animation = "none";
    void did("panelAutosave").offsetWidth;
    did("panelAutosave").style.animation = "gameSaved 2s";
    setTimeout(function () { display = "none" }, 2000);
    save();
    
}

setInterval(function() { if (!settings.disableAutosave) { autosave(); } }, 60000);

document.addEventListener("keydown", function (event) {
    var turtleRename = did("turtleRename");
    if (event.key === "s" && turtleRename.style.display === "none") autosave()  
});

//----save and load----

function save() {
    
  const saveData = {}
  saveData.savedItemCount = {}; for (const i in items) { saveData.savedItemCount[i] = items[i].count;}
  saveData.savedItemCD = {}; for (const i in items) { saveData.savedItemCD[i] = items[i].cd;}
  saveData.savedItemStats = {}; for (const i in items) { saveData.savedItemStats[i] = items[i].statUp;}
  saveData.savedItemGot = {}; for (const i in items) { saveData.savedItemGot[i] = items[i].gotOnce;}


  saveData.savedBuffTime = {}; for (const i in buffs) { saveData.savedBuffTime[i] = buffs[i].time;}
  
  saveData.savedEnemyKills = {}; for (const i in enemies) { saveData.savedEnemyKills[i] = enemies[i].killCount;}

  saveData.savedQuestState = {}; for (const i in quests) { saveData.savedQuestState[i] = quests[i].state;}
  saveData.savedQuestLock = {}; for (const i in quests) { saveData.savedQuestLock[i] = quests[i].locked;}
  
    
  saveData.savedAreaActive = {}; for (const i in areas) { saveData.savedAreaActive[i] = areas[i].active;} 
  saveData.savedAreaUnlocked = {}; for (const i in areas) { saveData.savedAreaUnlocked[i] = areas[i].unlocked;}  
  saveData.savedAreaMastery = {}; for (const i in areas) { saveData.savedAreaMastery[i] = areas[i].mastery;}
  saveData.savedAreaMaxMastery = {}; for (const i in areas) { saveData.savedAreaMaxMastery[i] = areas[i].maxMastery;}  
  saveData.savedAreaBoss = {}; for (const i in areas) { saveData.savedAreaBoss[i] = areas[i].unlockedBoss;}  
  saveData.savedAreaOre = {}; for (const i in areas) { saveData.savedAreaOre[i] = areas[i].unlockedOre;}
  saveData.savedAreaHerb = {}; for (const i in areas) { saveData.savedAreaHerb[i] = areas[i].unlockedHerb;}

  saveData.savedRecipeTime = {}; for (const i in recipes) { saveData.savedRecipeTime[i] = recipes[i].time;}  
  saveData.savedRecipeCrafting = {}; for (const i in recipes) { saveData.savedRecipeCrafting[i] = recipes[i].crafting;}
  saveData.savedRecipeUnlocked = {}; for (const i in recipes) { saveData.savedRecipeUnlocked[i] = recipes[i].unlocked;}

  saveData.savedLogsUnlocked = {}; for (const i in logs) { saveData.savedLogsUnlocked[i] = logs[i].unlocked;}
  saveData.savedLogsOnce = {}; for (const i in logs) { saveData.savedLogsOnce[i] = logs[i].once;}

  saveData.savedJobLevel = {}; for (const i in jobs) { saveData.savedJobLevel[i] = jobs[i].level;}
  saveData.savedJobExp = {}; for (const i in jobs) { saveData.savedJobExp[i] = jobs[i].exp;}  
  saveData.savedJobMaxExp = {}; for (const i in jobs) { saveData.savedJobMaxExp[i] = jobs[i].maxExp;}
    
  saveData.savedJobPanelHidden = {}; for (const i in jobPanels) { saveData.savedJobPanelHidden[i] = jobPanels[i].hidden;}    
  saveData.savedJobPanelUnlock = {}; for (const i in jobPanels) { saveData.savedJobPanelUnlock[i] = jobPanels[i].unlocked;}  
    
  saveData.savedShopStock = {}; for (const i in shopItems) { saveData.savedShopStock[i] = shopItems[i].stock;}  
  saveData.savedShopUnlocked = {}; for (const i in shopItems) { saveData.savedShopUnlocked[i] = shopItems[i].unlocked;}  
    
    
  saveData.savedPlayerData = {}; for (const i in rpgPlayer) { saveData.savedPlayerData[i] = rpgPlayer[i];}  
  saveData.savedSettingsData = {}; for (const i in settings) { saveData.savedSettingsData[i] = settings[i];}
  saveData.savedStatsData = {}; for (const i in stats) { saveData.savedStatsData[i] = stats[i];}
  saveData.savedUnlocksData = {}; for (const i in unlocks) { saveData.savedUnlocksData[i] = unlocks[i];}
  saveData.savedClassData = {}; for (const i in rpgClass) { saveData.savedClassData[i] = rpgClass[i];}  
    
  const JSONData = JSON.stringify(saveData);
  localStorage.setItem('saveData', JSONData);
}

function load() {
  const datosGuardados = localStorage.getItem('saveData');
  if (datosGuardados) { //checks if savedata available
    const parsedData = JSON.parse(datosGuardados);
    
    for (const i in parsedData.savedLogsUnlocked) { logs[i].unlocked = parsedData.savedLogsUnlocked[i];}  
    for (const i in parsedData.savedLogsOnce) { logs[i].once = parsedData.savedLogsOnce[i];}  



    for (const i in parsedData.savedJobLevel) { jobs[i].level = parsedData.savedJobLevel[i];}  
    for (const i in parsedData.savedJobExp) { jobs[i].exp = parsedData.savedJobExp[i];}
    for (const i in parsedData.savedJobMaxExp) { jobs[i].maxExp = parsedData.savedJobMaxExp[i];}  
      
    for (const i in parsedData.savedJobPanelHidden) { jobPanels[i].hidden = parsedData.savedJobPanelHidden[i];}  
    for (const i in parsedData.savedJobPanelUnlock) { jobPanels[i].unlocked = parsedData.savedJobPanelUnlock[i];}  
      
    for (const i in parsedData.savedShopStock) { shopItems[i].stock = parsedData.savedShopStock[i];}
    for (const i in parsedData.savedShopUnlocked) { shopItems[i].unlocked = parsedData.savedShopUnlocked[i];}  
      
    for (const i in parsedData.savedAreaActive) { areas[i].active = parsedData.savedAreaActive[i];}  
    for (const i in parsedData.savedAreaUnlocked) { areas[i].unlocked = parsedData.savedAreaUnlocked[i];}  
    for (const i in parsedData.savedAreaMastery) { areas[i].mastery = parsedData.savedAreaMastery[i];}
    for (const i in parsedData.savedAreaMaxMastery) { areas[i].maxMastery = parsedData.savedAreaMaxMastery[i];}  
    for (const i in parsedData.savedAreaBoss) { areas[i].unlockedBoss = parsedData.savedAreaBoss[i];}  
    for (const i in parsedData.savedAreaOre) { areas[i].unlockedOre = parsedData.savedAreaOre[i];}  
    for (const i in parsedData.savedAreaHerb) { areas[i].unlockedHerb = parsedData.savedAreaHerb[i];}
      
    for (const i in parsedData.savedRecipeTime) { recipes[i].time = parsedData.savedRecipeTime[i];}
    for (const i in parsedData.savedRecipeCrafting) { recipes[i].crafting = parsedData.savedRecipeCrafting[i];}  
    for (const i in parsedData.savedRecipeUnlocked) { recipes[i].unlocked = parsedData.savedRecipeUnlocked[i];}  

    for (const i in parsedData.savedItemCount) { items[i].count = parsedData.savedItemCount[i];}
    for (const i in parsedData.savedItemCD) { items[i].cd = parsedData.savedItemCD[i];}
    for (const i in parsedData.savedItemStats) { items[i].statUp = parsedData.savedItemStats[i];}
    for (const i in parsedData.savedItemGot) { items[i].gotOnce = parsedData.savedItemGot[i];}


    for (const i in parsedData.savedBuffTime) { buffs[i].time = parsedData.savedBuffTime[i];}
    
    for (const i in parsedData.savedEnemyKills) { enemies[i].killCount = parsedData.savedEnemyKills[i];}

    for (const i in parsedData.savedQuestState) { quests[i].state = parsedData.savedQuestState[i];}
    for (const i in parsedData.savedQuestLock) { quests[i].locked = parsedData.savedQuestLock[i];}

    for (const i in parsedData.savedPlayerData) { rpgPlayer[i] = parsedData.savedPlayerData[i];}  
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

function unlocksReveal(){

    if (unlocks.jobs) did('jobTab').style.display = "flex";
    if (unlocks.journal) did('achievementsTab').style.display = "flex";
    if (unlocks.book2) did('book2').style.display = "inline";
    if (unlocks.shop) {did('shopButton').innerHTML = "Shop"; did('shopButton').className = "gearButtonInactive"}
    if (unlocks.areas) {did('areaButton').innerHTML = "Area"; did('areaButton').className = "gearButtonInactive"}
    if (quests.A2Q3.state==="completed") {area1Common.I126 = {}; area1Common.I126.D=15; area1Common.I126.C=1; }


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
    calculateInactiveTime();
    toggleSettingsUI();
    displayTurtleName();
    penguinRecapToggle();
    oneSecond();
    rememberCategory(); //remembers tab on the left
    unlocksReveal();
    weatherCheck();
    randomTabName();
}
//#endregion