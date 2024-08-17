//#region Thats hell youre walking in

const did = (id) => document.getElementById(id); 

var rightClickX = 0;
var rightClickY = 0;

var leftClickX = 0;
var leftClickY = 0;

window.addEventListener("contextmenu", function (e) { //disables web right click
    e.preventDefault();
    rightClickX = e.clientX;
    rightClickY = e.clientY;
}); 

/* upcoming secreto

window.addEventListener('resize', checkResolution);

function checkResolution() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var columns1 = document.querySelectorAll('.categoryContent');
    var windows1 = document.querySelectorAll('.categoryContentColumn');

    var columns2 = document.querySelectorAll('.categoryContentMobile');
    var windows2 = document.querySelectorAll('.categoryContentColumnMobile');

    if (height >= 1.2 * width) {
        columns1.forEach(function(element) {
            element.classList.replace('categoryContent', 'categoryContentMobile');
        });

        windows1.forEach(function(element) {
            element.classList.replace('categoryContentColumn', 'categoryContentColumnMobile');
        });

        document.querySelector('.bLateral').classList.replace('bLateral', 'bLateralMobile');


       
    } else{

        columns2.forEach(function(element) {
            element.classList.replace('categoryContentMobile', 'categoryContent');
        });

        windows2.forEach(function(element) {
            element.classList.replace('categoryContentColumnMobile', 'categoryContentColumn');
        });

        document.querySelector('.bLateralMobile').classList.replace('bLateralMobile', 'bLateral');


    }
}

*/



document.addEventListener('keydown', function (event) { //disables spacebar
    if (event.key === ' ' && (did("skillMenu").style.display === "flex" || did("turtleRename").style.display === "flex")) {
      event.preventDefault();
    } });

window.addEventListener('keydown', function (event) { //disables alt key
    if (event.keyCode === 18) { event.preventDefault(); return false; }
});




function setCursor() {

    var estilo = document.createElement('style');

    if (!settings.disableCustomCursor) {
        document.body.style.cursor = "url('img/sys/cursorHand.png'), auto";
        estilo.innerHTML = ` button:hover { cursor: url('img/sys/cursorHand.png'), auto; } input:hover { cursor: url('img/sys/cursorHand.png'), auto; } `;
        document.head.appendChild(estilo);
        
    } else {
        document.body.style.cursor = "default";
        estilo.innerHTML = ` button:hover { cursor: default; } input:hover { cursor: default; } `;
        document.head.appendChild(estilo);
    }

    if (settings.disableAnimatedBg) {
        document.documentElement.style.setProperty('--performance100', "0%");
        document.documentElement.style.setProperty('--performance90', "0%");

        
    } else {
        document.documentElement.style.setProperty('--performance100', "100%");
        document.documentElement.style.setProperty('--performance90', "90%");
    }




}

document.addEventListener('dragstart', function(event) { //thanks firefox very cool
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});


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
    did("estadisticaClicks").textContent = beautify(stats.clickCount);
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
    did("statPlants").textContent = beautify(stats.plantsHarvested);
    
    did("statCoinsClick").textContent = beautify(playerCoinsPerClick);
    did("statCoinsClickMultiplier").textContent = "x"+multiplicativeCoinsPerClick.toFixed(1);

    did("statOfflineMultiplier").textContent = "x"+multiplicativePenguinPower.toFixed(1);

    did("statHealthMultiplier").textContent = "x"+multiplicativeMaxHp.toFixed(1);
    did("statStrengthMultiplier").textContent = "x"+multiplicativeStrength.toFixed(1);
    did("statSpellpowerMultiplier").textContent = "x"+multiplicativeSpellpower.toFixed(1);
    did("statExpMultiplier").textContent = "x"+multiplicativeEXPGain.toFixed(1);

    did("statNatureMultiplier").textContent = "x"+natureDamageMultiplicative.toFixed(1);
    did("statMightMultiplier").textContent ="x"+mightDamageMultiplicative.toFixed(1);
    did("statElementalMultiplier").textContent ="x"+elementalDamageMultiplicative.toFixed(1);
    did("statDeificMultiplier").textContent ="x"+deificDamageMultiplicative.toFixed(1);
    did("statOccultMultiplier").textContent ="x"+occultDamageMultiplicative.toFixed(1);


    };
//#endregion
//----------------------==========================-----------------------
//----------------------=======ON TURTLE CLICK====-----------------------
//----------------------==========================-----------------------
//#region Click
let clickCooldown = false;
let clickAnimCooldown = false

unlocks.present = false;

stats.recievedPresents = 0;

did("tortugaClick").onclick = turtleClick;

function turtleClick(alt){

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
            if (alt==="spacebar") { createFloatingText('<p>+' + (beautify(playerCoinsPerClick)) + '<img src="img/sys/coin.png" />', "spacebar") }
            else createFloatingText('<p>+' + (beautify(playerCoinsPerClick)) + '<img src="img/sys/coin.png" />')
            
            
            }
        
        updateCounters();
        
    clickCooldown = true;
    setTimeout(function () {clickCooldown = false;}, playerClickRate);
    }
}



document.addEventListener("keydown", (event) => {
    
      if (event.code === 'Space') {
        turtleClick("spacebar");
      }
    
  });





function createFloatingText(text, alt){

    
    var textoClick1 = document.createElement('div');
        textoClick1.className = 'textoClick';

        if (alt === "spacebar") {

            const referenceDiv = did("tortugaClick");
const referenceRect = referenceDiv.getBoundingClientRect();
const newLeft = referenceRect.left + (referenceRect.width - textoClick1.offsetWidth) / 2;
const newTop = referenceRect.top + (referenceRect.height - textoClick1.offsetHeight) / 2;
textoClick1.style.left = newLeft + "px";
textoClick1.style.top = newTop + "px";

        }
        else {
        textoClick1.style.left = (event.clientX + (window.scrollX || window.pageXOffset) - 10) + 'px';
        textoClick1.style.top = (event.clientY + (window.scrollY || window.pageYOffset) - 40) + 'px';

        }

        document.body.appendChild(textoClick1);

        textoClick1.innerHTML = text; 
        
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
itemOfTheDay.price = 'Math.min(stats.totalCoins*0.015,500000)';
itemOfTheDay.bought = false;

function clickIOTD(){
did("IOTD").addEventListener("click", function () {
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
        createItemOfTheDay();

    } else {
        playSound("audio/thud.mp3"); 

    }
  });

}


setInterval(oneSecond, 1000);
function oneSecond() {
    updateCounters();


 if (cd.jesterCooldown <= 0 && rng(1,20)===1) {
    spawnJesterTurtle();
 }

 if (cd.itemOfTheDay <= 0) {

    itemOfTheDay.bought = false;

    cd.itemOfTheDay = 28800
    itemOfTheDay.item = rareItems[rng(0,(rareItems.length-1))]
    if (rng(1,2)===1) itemOfTheDay.item = rareItems2[rng(0,(rareItems2.length-1))]
    if (rng(1,10)===1) itemOfTheDay.item = rareItems3[rng(0,(rareItems3.length-1))]
    refreshItemOfTheDay();
 }

did('shopRestock').innerHTML = "Shop restocks in ⏱️ "+convertSecondsToDHM(cd.shopRestock)
did("priceOfTheDay").innerHTML = beautify(eval(itemOfTheDay.price))+" Shells";

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

const jesterEffects = ['exp','exp','click','click','superClick','pat','pat','superPat']

const jesterEffectsMagic = ['magic','magic','supermagic','exp','click','superClick','pat','superPat']

var itemsOfTheDay = ['I14', 'I26', 'I93', 'I96', 'I97', 'I174', 'I177', 'I178', 'I207', 'I210', 'I219', 'I222']

function refreshItemOfTheDay(){

    if (did("IOTDitemTag") && did("IOTDdisplayItem")){

    if (!itemOfTheDay.bought) {
        did("itemOfTheDayFlair").style.display = "inline";
        did("IOTDitemTag").style.display = "none";
    }else {
        did("itemOfTheDayFlair").style.display = "none";
        did("IOTDitemTag").style.display = "flex";
}
    
    
    
    did("IOTDdisplayItem").src = "img/src/items/"+itemOfTheDay.item+".jpg";
    did("nameOfTheDay").innerHTML = items[itemOfTheDay.item].name;
    did("nameOfTheDay").style.background = returnQualityColor(items[itemOfTheDay.item].quality);

}
    
}

stats.jesterTurtleClicks = 0;

/*var jesterCollectibles = { 
    I294:{P:100,A:1, R:"medium"}, 
    I295:{P:100,A:1, R:"medium"},
  }*/


function createItemOfTheDay(){
        if (!did("IOTD") && unlocks.itemOfTheDay) {
          itemOfTheDay.price = 'Math.min(stats.totalCoins*0.015,500000)';
          const areadiv = document.createElement("div");
          areadiv.id = "IOTD";
          areadiv.innerHTML = '<img id="itemOfTheDayFlair" src="img/src/projectiles/sunray.png"><div class=soldOut id="IOTDitemTag">SOLD OUT</div><img id="IOTDdisplayItem" src="img/src/items/' + items[itemOfTheDay.item].img + '.jpg">';
          did("shopListing").appendChild(areadiv);
          areadiv.className = "shopBox IOTD";
    
    
    
          did("IOTDdisplayItem").style.outline = returnQualityColor(items[itemOfTheDay.item].quality) +" solid 0.15rem";
          tooltipIOTD()
          clickIOTD()
          //tooltip here
        }
    
    
    
    
        if ( did("IOTD") && itemOfTheDay.bought === true ) {
          did("IOTDitemTag").style.display = "flex";
          did("IOTDitemTag").innerHTML = "SOLD OUT";
        } else if (did("IOTD")) {did("IOTDitemTag").style.display = "none";}
    
        

}

function tooltipIOTD(){
if (did("IOTD")){
did("IOTD").addEventListener("mouseenter", function () {

    did("tooltip").style.display = "flex";

    did("tooltip").style.background = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 28' width='56' height='28'%3E%3Cpath fill='%23140808' fill-opacity='0.82' d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23c.94-.95 1.96-1.83 3.03-2.63A13.98 13.98 0 0 0 0 0h7.75c2 1.1 3.73 2.63 5.1 4.45 1.12-.72 2.3-1.37 3.53-1.93A20.1 20.1 0 0 0 14.28 0h2.7c.45.56.88 1.14 1.29 1.74 1.3-.48 2.63-.87 4-1.15-.11-.2-.23-.4-.36-.59H26v.07a28.4 28.4 0 0 1 4 0V0h4.09l-.37.59c1.38.28 2.72.67 4.01 1.15.4-.6.84-1.18 1.3-1.74h2.69a20.1 20.1 0 0 0-2.1 2.52c1.23.56 2.41 1.2 3.54 1.93A16.08 16.08 0 0 1 48.25 0H56c-4.58 0-8.65 2.2-11.2 5.6 1.07.8 2.09 1.68 3.03 2.63A9.99 9.99 0 0 1 56 4v2a8 8 0 0 0-6.77 3.74c1.03 1.2 1.97 2.5 2.79 3.86A4 4 0 0 1 56 10v2a2 2 0 0 0-2 2.07 28.4 28.4 0 0 1 2-.07v2c-9.2 0-17.3 4.78-21.91 12H30zM7.75 28H0v-2c2.81 0 5.46.73 7.75 2zM56 20v2c-5.6 0-10.65 2.3-14.28 6h-2.7c4.04-4.89 10.15-8 16.98-8zm-39.03 8h-2.69C10.65 24.3 5.6 22 0 22v-2c6.83 0 12.94 3.11 16.97 8zm15.01-.4a28.09 28.09 0 0 1 2.8-3.86 8 8 0 0 0-13.55 0c1.03 1.2 1.97 2.5 2.79 3.86a4 4 0 0 1 7.96 0zm14.29-11.86c1.3-.48 2.63-.87 4-1.15a25.99 25.99 0 0 0-44.55 0c1.38.28 2.72.67 4.01 1.15a21.98 21.98 0 0 1 36.54 0zm-5.43 2.71c1.13-.72 2.3-1.37 3.54-1.93a19.98 19.98 0 0 0-32.76 0c1.23.56 2.41 1.2 3.54 1.93a15.98 15.98 0 0 1 25.68 0zm-4.67 3.78c.94-.95 1.96-1.83 3.03-2.63a13.98 13.98 0 0 0-22.4 0c1.07.8 2.09 1.68 3.03 2.63a9.99 9.99 0 0 1 16.34 0z'%3E%3C/path%3E%3C/svg%3E"),#231111`;


    did("tooltipName").textContent = items[itemOfTheDay.item].name;
    did("tooltipPrice").innerHTML = "";
    did("tooltipRarity").textContent = items[itemOfTheDay.item].quality;

    did("tooltipRarity").style.color = returnQualityColor(items[itemOfTheDay.item].quality);
    did("tooltipName").style.color = returnQualityColor(items[itemOfTheDay.item].quality);

    did("tooltipDescription").innerHTML = bestiaryTag("❖ Item Of The Day ❖", "#723B63")+'<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(itemOfTheDay.price)) + coinIcon+'Shells<br></div><div class="separador"></div><FONT COLOR="white">' +  items[itemOfTheDay.item].description + '<br><div class="separador"></div>';
    if (items[itemOfTheDay.item].dynamic) did("tooltipDescription").innerHTML = bestiaryTag("❖ Item Of The Day ❖", "#723B63")+'<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(itemOfTheDay.price)) + coinIcon+'Shells<br></div><div class="separador"></div><FONT COLOR="white">' +  eval(items[itemOfTheDay.item].description) + '<br><div class="separador"></div>';
    did("tooltipFlavor").textContent = items[itemOfTheDay.item].flavor;
    did("tooltipImage").src = "img/src/items/" + items[itemOfTheDay.item].img + ".jpg";
    var movingDiv = did("tooltip");
    var referenceDiv = did("IOTD");
    var referenceRect = referenceDiv.getBoundingClientRect();
    var referenceLeft = referenceRect.left;
    var referenceTop = referenceRect.top - 45;
    var newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    var newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });
  did("IOTD").addEventListener("mouseleave", function () {
    resetTooltip();
  });
}
}

function spawnJesterTurtle(){

    const div = document.createElement("div");
    div.id = 'jesterTurtle';
    div.innerHTML = '<img id="jesterImage" src="img/sys/jesterturtle.png">';
    div.style.top= rng(10,80)+'%'
    did("jesterWrapper").appendChild(div);
    setTimeout(() => {div.remove();}, 12000);
    cd.jesterCooldown = 60;

    div.addEventListener("click", function clickHandler() {
        playSound("audio/button9.mp3"); 
        stats.jesterTurtleClicks++;
        //rollTable(jesterCollectibles, 1);
        cd.jesterCooldown = 1200;
        setTimeout(() => {did("jesterImage").style.opacity = 0;}, 100);
        setTimeout(() => {div.remove()}, 1000);
        div.removeEventListener('click', clickHandler);
        animParticleBurst(10 , "particleSpark", "jesterTurtle", 0);
    
        let randomEffect = jesterEffects[rng(0,(jesterEffects.length-1))]
        if (talent.TA1.active) randomEffect = jesterEffectsMagic[rng(0,(jesterEffects.length-1))]
    
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

        if (randomEffect === 'magic'){
            createFloatingText('<p>MAGIC OVERCHARGE!')
            rpgPlayer.mana += playerMaxMana
            manaUpdate()
        }

        if (randomEffect === 'supermagic'){
            createFloatingText('<p>MAGIC MEGACHARGE!')
            rpgPlayer.mana += playerMaxMana*2
            manaUpdate()
        }

    
    });
}


  //#endregion
//----------------------==========================-----------------------
//----------------------==========SOUNDS==========-----------------------
//----------------------==========================-----------------------
//#region Sounds

let savedSound;

function changeVolume(){

    savedSound = volumeSlider.value*2/1000;


}

function playSound(filename){
    if (!settings.disableAudio && document.hasFocus()){
    var audio = new Audio(filename);
    if (savedSound !== undefined){
    volumeSlider.value = savedSound/2*1000
        audio.volume = savedSound;
    }
    else audio.volume = 0.06;
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
var sakuraDropUp = 0;
var rainFishingUp = 0;

setInterval(weatherCheck, 2500); //1 day = 1 hour
function weatherCheck() {
    stats.rpgTime++;
    if (stats.rpgTime>1440) stats.rpgTime = 0;

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
    if (stats.currentWeather === 'sakura' && !(document.getElementById('currentWeather').src.endsWith("sakura.png"))){ resetOverlay(); did('currentWeather').src = "/img/src/icons/sakura.png"; did('weatherOverlay').style.opacity = 0.2; did('weatherOverlay').style.background = "#512551" ;did('weatherEffectOverlay').style.backgroundImage = "url(img/src/icons/sakura.gif)";  did('weatherEffectOverlay').style.opacity = "1"; sakuraDropUp = 50; statsUpdate(); updateStatsUI();}
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
   did('tooltip').style.width = "22vw"; 
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
   did("tooltip").style.background = ""
   did("tooltipArrowUp").style.right = '2%'

   
}

function tooltipWeather() {
    did("weatherButton").addEventListener("mouseenter", function () {
    
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
         did("tooltipDescription").innerHTML = '<span style="color:#1EFF0C">❖ +1 Fishing Level<br>❖ Garden feels refreshed</span>';
      }

      if (stats.currentWeather==="snow"){
         did("tooltipName").textContent = "Snowy Night";
         did("tooltipFlavor").textContent = '"Beware of the yellow snow."';
         did("tooltipDescription").innerHTML = '<span style="color:gray">No special weather bonuses.</span>';
      }

      if (stats.currentWeather==="sakura"){
        did("tooltipName").textContent = "Sakura Fall";
        did("tooltipFlavor").textContent = '"Sakura petals drift, Whispering the springtimes end, Beautys gentle fall."';
        did("tooltipDescription").innerHTML = '<span style="color:#1EFF0C">❖ +50% Flower Power</span>';
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
const referenceDiv = did("weatherButton");
const referenceRect = referenceDiv.getBoundingClientRect();
const referenceRight = referenceRect.right; // Derecha de currentWeather
const referenceBottom = referenceRect.bottom -1; // Abajo de currentWeather
const newLeft = referenceRight - movingDiv.offsetWidth;
const newTop = referenceBottom;
movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + "px";

    });
    did("weatherButton").addEventListener("mouseleave", function () {
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
        if (did(i)) {
    if (settings[i]) {
        did(i).innerHTML = 'ON';
        did(i).style.background = '#6BB23E';
    }
    else if (!settings[i]) {
        did(i).innerHTML = 'OFF';
        did(i).style.background = '#373737';
    }

    }
}
}

//-----category button on the left----- (weird placement but oh well)

const tabs = ["campTab","achievementsTab","townshipTab", "rpgTab", "jobTab"];
const containers = ["achievementContainer","campContainer", "townshipContainer", "rpgContainer", "jobContainer"]
const titles =["campTitle", "achievementsTitle", "townshipTitle", "rpgTitle", "jobTitle"];


function tabSwitch(x,y,z) {
did(x).addEventListener("click", function () {


    

    if (!dungeonTime && !showdownTime && skirmishTime===false){

        did("tooltip2").style.display = "none"
    
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

if(unlocks.garden)plantGrow()

setTimeout(() => {
    inventoryCulling()
}, 300); 
    
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
    did("bestiary").style.display = "none";
    did("support").style.display = "none";
    did("skillMenu").style.display = "none";
    did("upgradeMenu").style.display = "none";
    did("mailMenu").style.display = "none";
    did("rankMenu").style.display = "none";
    did("gardenShop").style.display = "none";
    did("turtleRename").style.display = "none";
    did("masteryGuide").style.display = "none";
    did("gameGuide").style.display = "none";
    did("plantCatalogue").style.display = "none";
    did("boughtUpgradesPanel").style.display = "none";
    did("bodyCover").style.display = "none";
    did("fertiliserMenu").style.display = "none";
    did("honorShop").style.display = "none";
    did("body").style.backgroundColor = "transparent";
    did("body").style.filter = "none";

    did("outdatedData").style.display = "none";

    if (returnToArmory){
        returnToArmory=false;
        did("armory").style.display = "flex";
        did("bodyCover").style.display = "flex";

    }
}

 
function deleteSavePrompt(){
    playSound("audio/button3.mp3")
    did("opciones").style.display = "none";
    did("deleteData").style.display = "flex";
}

//-----statistics-------

settingsPanel ("botonSupport", "support");

setInterval(() => { if (did("support").style.display != "none") { patreonShine() } }, 2000);

function patreonShine(){
    for (let i = 0; i < patreonTier2.length; i++) {
    if (rng(1,3)===1) animParticleBurst(rng(1,3) , "particleSpark", patreonTier2[i] + "patreonTier2", 0);
}

for (let i = 0; i < patreonTier1.length; i++) {
    if (rng(1,3)===1) animParticleBurst(rng(1,3) , "particleSpark", patreonTier1[i] + "patreonTier1", 0);
}

}


for (let i = 0; i < patreonTier1.length; i++) {
    if (!did(patreonTier1[i] + "patreonTier1")) {
        const div = document.createElement("span");
        div.id = patreonTier1[i] + "patreonTier1";
        div.innerHTML = patreonTier1[i];
        did('patreonList1').appendChild(div);
    }
}

for (let i = 0; i < patreonTier2.length; i++) {
    if (!did(patreonTier2[i] + "patreonTier2")) {
        const div = document.createElement("span");
        div.id = patreonTier2[i] + "patreonTier2";
        div.innerHTML = patreonTier2[i];
        did('patreonList2').appendChild(div);
    }
}

for (let i = 0; i < patreonTier3.length; i++) {
    if (!did(patreonTier3[i] + "patreonTier3")) {
        const div = document.createElement("span");
        div.id = patreonTier3[i] + "patreonTier3";
        div.innerHTML = patreonTier3[i];
        did('patreonList3').appendChild(div);
    }
}








settingsPanel ("botonEstadisticas", "estadisticas");

settingsPanel ("botonGameGuide", "gameGuide");


window.addEventListener('load', function () { //gets date started
    if (stats.startedSince === 0) {
        stats.startedSince = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
        did('botonGameGuide').style.animation = "newGameTip 1.5s infinite linear"
    }
    did('estadisticaStartDate').textContent = stats.startedSince;
});


cd.presentCooldown = 0;
cd.presentCanSpawn = 5000;
cd.gildedCooldown = 10000;

function timeCounters() {

    stats.activeSeconds++;
    stats.totalSeconds++;

    for (let i in cd) if (cd[i]>0) {cd[i]--}

    if (cd.exportReminder<=0){

        if (!settings.disableExportReminder) {
        did('botonOpciones').style.animation = "newGameTip2 3s infinite linear"
        did('exportSave').style.animation = "newGameTip2 3s infinite linear"
    }

}

    did("estadisticaPlaytime").textContent = convertSecondsToHMS(stats.activeSeconds);
    did("statTotalPlaytime").textContent = convertSecondsToHMS(stats.totalSeconds);


    

}setInterval(timeCounters, 1000);

//----turtle naming----

settingsPanel ("turtleName", "turtleRename");

var logTrackName = 'base';

function enterName(event) {
    if (event.key === "Enter" && did("namingBox").value.length >= 1) {stats.turtleName = did("namingBox").value; logTrackName = did("namingBox").value; displayTurtleName(); closePanels(); if (did("namingBox").value==="squeaky" || did("namingBox").value==="Squeaky") {rareItemDrop("I172",1)}}
}
function displayTurtleName(){



    did("turtleName").textContent = stats.turtleName; did('turtleName2').textContent = stats.turtleName;
    if (patreonTier1.includes(stats.turtleName) || patreonTier1Alt.includes(stats.turtleName)) did("turtleName").style.color = "#C672FA";
    else if (patreonTier2.includes(stats.turtleName) || patreonTier2Alt.includes(stats.turtleName)) did("turtleName").style.color = "#FF6B43";
    else if (patreonTier3.includes(stats.turtleName) || patreonTier3Alt.includes(stats.turtleName)) did("turtleName").style.color = "#92DB76";
    else did("turtleName").style.color = "white"

}

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



did('botonGameGuide').addEventListener('mouseenter', function () {  did('botonGameGuide').style.animation = "none" });
   
        
  

function createGametip() {
    for (let i in gametip) {
    
    if (!did(i+"gametip")) {

        if (gametip[i].unlocked){
  
      const div = document.createElement("div");
      div.innerHTML = gametip[i].name;
      div.id = i+"gametip";
      div.className = "gametip";
      did("gameGuideListing").appendChild(div)

    }

    }
  
  
  }
  }
  createGametip()

  document.addEventListener('click', function(event) {
    if (event.target.id && event.target.id.endsWith('gametip')) {
        let itemID = event.target.id.replace('gametip', '');
        let imgID = itemID.replace('gt', '');

        playSound("audio/button3.mp3");

        for (i in gametip){
            if (did(i+"gametip")){
               did(i+"gametip").className = "gametip"
            }
        }

        did("gameGuideImage").src = 'img/src/gametips/'+imgID+'.jpg'
        did("gameGuideDescription").innerHTML = gametip[itemID].description

        did("gameGuideLeft").style.display = "inline"

        did("gameGuideImage").style.animation = "";
        void did("gameGuideImage").offsetWidth;
        did("gameGuideImage").style.animation = "faintStrike 0.3s 1";

        did("gameGuideDescription").style.animation = "";
        void did("gameGuideDescription").offsetWidth;
        did("gameGuideDescription").style.animation = "faintStrike 0.3s 1";

        did(event.target.id).className = "gametipActive"
    }
});
//#endregion
//----------------------==========================-----------------------
//----------------------===========IDLING=========-----------------------
//----------------------==========================-----------------------
//#region Idling

function convertSecondsToHMS(seconds, size) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (size==="mini") return `${minutes}m ${remainingSeconds.toFixed(0)}s`;
    else return `${hours}h ${minutes}m ${remainingSeconds.toFixed(0)}s`;
}


function convertSecondsToDHM(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m`;
}


let lastofflinetime = 0


function calculateInactiveTime() { //calculates idle time
    const lastVisitTime = localStorage.getItem('lastVisitTime');
    if (lastVisitTime) {
        const currentTime = new Date().getTime();
        const inactiveTime = currentTime - parseInt(lastVisitTime);
        const secondsInactive = Math.floor(inactiveTime / 1000);

        lastofflinetime = secondsInactive

        if (secondsInactive > 60) {
            stats.totalSeconds += secondsInactive; 
            for (let i in cd) if (cd[i]>0) {cd[i]-=secondsInactive};
            if (enemies[stats.currentEnemy].killCount>99 && !dungeonTime){
                offlineRewards((secondsInactive/60));
                if (!settings.disablePenguinRecap) { did("penguinRecap").style.display = "flex"; }
                offlineDrops(secondsInactive/60)

            } 



            setTimeout(() => {
                if (unlocks.garden){ plantTick(secondsInactive/30) }
               }, 1000);
            

            
            
            for (let i in research) { if (research[i].status === "researching" && research[i].timer>1) research[i].timer -= secondsInactive}


            for (let i in buildings) { if (buildings[i].unlocked && buildings[i].progress<8640) {buildings[i].progress += secondsInactive/30; if (buildings[i].progress>8640) buildings[i].progress=8640}}


            for (let i in areas) {

                if ("dungeonTimer" in areas[i] && areas[i].dungeonTimer>0) {

                    areas[i].dungeonTimer -= secondsInactive;
                    if (secondsInactive >= 3600) areas[i].charges++
                    if (secondsInactive >= 7200) areas[i].charges++
                    if (areas[i].charges>3) areas[i].charges = 3;
                
                }



                if (areas[i].dungeonTimer<0) areas[i].dungeonTimer=0;
            
            }

            save();
        }

        localStorage.setItem('lastVisitTime', new Date().getTime());
    }
}

//-----penguin recap----

did("closeRecap").onclick = function () { did("penguinRecap").style.animation = "shrinkFadeOut 0.3s"; setTimeout(function () { did("penguinRecap").style.display = "none" }, 200); }


function tooltipPenguin() {
    did('penguinIndicatorButton').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex";
    did("tooltipName").textContent = "Turtlebot";
    did("tooltipPrice").innerHTML = '';
    
  
    did("tooltipRarity").textContent = 'Offline Gains';
    did("tooltipRarity").style.color = "#5A9AE5";      
    did("tooltipName").style.color = "white";     
    did('tooltipImage').src = "img/src/icons/afk.jpg";
       
    did("tooltipFlavor").textContent = '';
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipDescription").innerHTML = '</div><span id="penguinPowerMeter" style="color:white;font-size:1.6vh; background:#42A24C; padding: 0% 2%; border-radius:0.2vh">Penguin Power: 100 (1 kill per minute)</span><div class="separador"></div><span id="penguinCurrentResource">Currently Gathering: Nothing</span> ';

    let currentDrop = "";

    if (enemies[stats.currentEnemy].drop && enemies[stats.currentEnemy].drop.includes('dropItem')) {
        const regex = /dropItem\(["'](I\d+)["']\)/;
            const match = enemies[stats.currentEnemy].drop.match(regex);
            currentDrop = match[1];
    }
    

    if (did("penguinCurrentResource")){
    if (enemies[stats.currentEnemy].difficulty !== "pond") did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: '+bestiaryItem(currentDrop),"#2C8A97");
    if (enemies[stats.currentEnemy].difficulty === "pond") did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: ... fish?',"#2C8A97");
    if (enemies[stats.currentEnemy].killCount<99) did("penguinCurrentResource").innerHTML = '<FONT COLOR="gray">Defeat the current enemy at least 100 times to autofarm it'
    
    }

    did("penguinPowerMeter").innerHTML = (playerPenguinPower/15).toFixed(1)+' kills per minute';


      const movingDiv = did('tooltip');
const referenceDiv = did('penguinIndicatorButton');
const referenceRect = referenceDiv.getBoundingClientRect();
const newLeft = referenceRect.left;
const newTop = referenceRect.top + 35;
movingDiv.style.left = newLeft + 'px';
movingDiv.style.top = newTop + 'px';
    
        
  });
    did('penguinIndicatorButton').addEventListener('mouseleave', function () {
    resetTooltip();
    });
  
}tooltipPenguin()

rpgPlayer.minipenguin1="none"
rpgPlayer.minipenguin2="none"
rpgPlayer.minipenguin3="none"

activatePenguin("minipenguin1")
activatePenguin("minipenguin2")
activatePenguin("minipenguin3")

afkPenguinTooltip("minipenguin1")
afkPenguinTooltip("minipenguin2")
afkPenguinTooltip("minipenguin3")


function activatePenguin(x){

   setTimeout(() => {
    
   


    did(x).addEventListener("click", function() {


        if (enemies[stats.currentEnemy].killCount>=100){

            playSound("audio/button1.mp3");

        if (enemies[stats.currentEnemy].drop && enemies[stats.currentEnemy].drop.includes('dropItem')) {
            const regex = /dropItem\(["'](I\d+)["']\)/;
            const match = enemies[stats.currentEnemy].drop.match(regex);
            if (enemies[stats.currentEnemy].killCount>=100) rpgPlayer[x] = match[1]
        }

        if (enemies[stats.currentEnemy].difficulty === "pond") rpgPlayer[x]="I316"

        if (rpgPlayer[x]!=="none") {did(x).style.outline = "lawngreen 2px solid"}
        else {did(x).style.outline = "coral 2px solid"}
        
        did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: '+bestiaryItem(rpgPlayer[x]),"#2C8A97");
        if (rpgPlayer[x]==="I316") did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: ... fish?',"#2C8A97");


        did(x).style.animation = "";
        void did(x).offsetWidth;
        did(x).style.animation = "levelUp 0.5s 1";

    } else playSound("audio/thud.mp3");





    });


    //console.log (rpgPlayer[x])
    if (rpgPlayer[x]!=="none") {did(x).style.outline = "lawngreen 2px solid"}
    else {did(x).style.outline = "coral 2px solid"}


}, 100);



}


function afkPenguinTooltip(x){
    did(x).addEventListener('mouseenter', function () { 
        did('tooltip').style.display = "flex";
        did("tooltipName").textContent = "Penguin Helper";
        did("tooltipPrice").innerHTML = '';
        did("tooltipRarity").textContent = 'Offline Gains';
        did("tooltipRarity").style.color = "#5A9AE5";      
        did("tooltipName").style.color = "white";     
        did('tooltipImage').src = "img/src/upgrades/P1.jpg";
           
        did("tooltipFlavor").textContent = '';
        did("tooltipDescription").style.textAlign = "center";
        did("tooltipDescription").innerHTML = '</div><span id="penguinPowerMeter" style="color:white;font-size:1.6vh; background:#42A24C; padding: 0% 2%; border-radius:0.2vh">Penguin Power: 100 (1 kill per minute)</span><div class="separador"></div><span id="penguinCurrentResource">Currently Gathering: Nothing</span> ';
    
        let currentDrop = "";
    
        if (enemies[stats.currentEnemy].drop && enemies[stats.currentEnemy].drop.includes('dropItem')) {
            const regex = /dropItem\(["'](I\d+)["']\)/;
                const match = enemies[stats.currentEnemy].drop.match(regex);
                currentDrop = match[1];
        }
        
    
        if (did("penguinCurrentResource")){
        if (rpgPlayer[x]!=="none"){
            did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: '+bestiaryItem(rpgPlayer[x]),"#2C8A97");
            if (rpgPlayer[x]==="I316") did("penguinCurrentResource").innerHTML = colorTag('Currently Gathering: ... fish?',"#2C8A97");
        } else did("penguinCurrentResource").innerHTML = '<FONT COLOR="gray">Click here to start gathering offline the current enemy'
        if (enemies[stats.currentEnemy].killCount<99 && rpgPlayer[x]==="none") did("penguinCurrentResource").innerHTML = '<FONT COLOR="gray">Defeat the current enemy at least 100 times to autofarm it'

        }
    
        did("penguinPowerMeter").innerHTML = ((playerPenguinPower/15)/4).toFixed(1)+' kills per minute';
    
    
          const movingDiv = did('tooltip');
    const referenceDiv = did(x);
    const referenceRect = referenceDiv.getBoundingClientRect();
    const newLeft = referenceRect.left;
    const newTop = referenceRect.top + 35;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
        
            
      });
        did(x).addEventListener('mouseleave', function () {
        resetTooltip();
        });
}

  





function offlineDrops(kills){

    let killsGot = Math.round((kills*(playerPenguinPower/15))/3)

    const regex = /rareItemDrop\(['"]([^'"]+)['"],\s*(rareDrop|uncommonDrop|epicDrop|mythicDrop|relicDrop)\s*\)/g;
  let match;
const rareDropIds = [];
const uncommonDropIds = [];
const epicDropIds = [];
const mythicDropIds = [];
const relicDropIds = [];

while ((match = regex.exec(enemies[stats.currentEnemy].drop)) !== null) {
    const id = match[1];
    const dropType = match[2];
    if ((dropType === 'rareDrop')) {
        rareDropIds.push(id);
    }
    
    if ((dropType === 'uncommonDrop')) {
        uncommonDropIds.push(id);
    }

    if ((dropType === 'epicDrop')) {
        epicDropIds.push(id);
    }

    if ((dropType === 'mythicDrop')) {
        mythicDropIds.push(id);
    }

    if ((dropType === 'relicDrop')) {
        relicDropIds.push(id);
    }
}


/*
  console.log('Rare Drop IDs:', rareDropIds);
  console.log('Uncommon Drop IDs:', uncommonDropIds);
  console.log('Epic Drop IDs:', epicDropIds);
  console.log('Mythic Drop IDs:', mythicDropIds);
  console.log('Relic Drop IDs:', relicDropIds);
  */


  if (uncommonDropIds.length>0) uncommonDropIds.forEach(id => { rareItemDrop(id, Math.max(uncommonDrop/Math.ceil(killsGot,1)));});
  if (rareDropIds.length>0) rareDropIds.forEach(id => { rareItemDrop(id, Math.max(rareDrop/Math.ceil(killsGot,1)));});
  if (epicDropIds.length>0) epicDropIds.forEach(id => { rareItemDrop(id, Math.max(epicDrop/Math.ceil(killsGot,1)));});
  if (mythicDropIds.length>0) mythicDropIds.forEach(id => { rareItemDrop(id, Math.max(mythicDrop/Math.ceil(killsGot,1)));});
  if (relicDropIds.length>0) relicDropIds.forEach(id => { rareItemDrop(id, Math.max(relicDrop/Math.ceil(killsGot,1)));});

  console.log("uncommon:"+ Math.max(uncommonDrop/Math.ceil(killsGot,1)) +"rare:"+Math.max(rareDrop/Math.ceil(killsGot,1))+"relic :"+Math.max(relicDrop/Math.ceil(killsGot,1))+"epic :"+Math.max(mythicDrop/Math.ceil(killsGot,1))+"mythic :"+Math.max(mythicDrop/Math.ceil(killsGot,1)))

    
  if (stats.currentEnemy === "E13") rollTable(copperCollectibles, 1, killsGot)
  if (stats.currentEnemy === "E14") rollTable(snapthornCollectibles, 1, killsGot)
  if (stats.currentEnemy === "E19") rollTable(arcaniteCollectibles, 1, killsGot)
  if (stats.currentEnemy === "E20") rollTable(eeriePondCollectibles, 1, killsGot)
  if (stats.currentEnemy === "E37") rollTable(fossilCollectibles, 1, killsGot)
  if (stats.currentEnemy === "E42") rollTable(dataclusterCollectibles, 1, killsGot)



  /*

  itemGot = "none"

  if (uncommonDropIds.length>0) itemGot = uncommonDropIds[rng(0,(uncommonDropIds.length-1))]
  if (rng(1,4)===1 && rareDropIds.length>0 || rareDropIds.length>0 && uncommonDropIds.length===0) itemGot = rareDropIds[rng(0,(rareDropIds.length-1))]

  if (uncommonDropIds.length===0 && rareDropIds.length===0) invalid()
  if (itemGot!=="none") valid()

  function invalid(){

    if (!did('popupmaterialiser')) createPopup('&#10060; Invalid Target!', '#913c3c', "popupmaterialiser");

  }


  function valid (){

  if (mode==="guaranteed"){
    if (items[itemGot].quality==="Uncommon") {createPopup('💠 First time reward: '+items[itemGot].name+' !', '#994687'); items[itemGot].count++}
    else if (items[itemGot].quality==="Rare") {createPopup('💠 First time reward: '+items[itemGot].name+' !', '#994687'); items[itemGot].count++}

  } else {
    if (items[itemGot].quality==="Uncommon" && rng(1,5)===1) {createPopup('💠 '+items[itemGot].name+' has materialised!', '#994687'); items[itemGot].count++}
    else if (items[itemGot].quality==="Rare" && rng(1,10)===1) {createPopup('💠 '+items[itemGot].name+' has materialised!', '#994687'); items[itemGot].count++}
    else createPopup('&#10060; Failed to materialise '+items[itemGot].name, '#913c3c');
    items.I219.count--
    addItem();
  }
  
  playSound("audio/button9.mp3");


  }


*/



}


function offlineRewards(amount, concept){
if (!dungeonTime) {
    let currentDrop = "";

    if (enemies[stats.currentEnemy].drop && enemies[stats.currentEnemy].drop.includes('dropItem')) {


/*
        const startIndex = enemies[stats.currentEnemy].drop.indexOf("dropItem('") + "dropItem('".length;
        const endIndex = enemies[stats.currentEnemy].drop.indexOf("')", startIndex);
        if (startIndex !== -1 && endIndex !== -1) {
*/
            const regex = /dropItem\(["'](I\d+)["']\)/;
            const match = enemies[stats.currentEnemy].drop.match(regex);

            currentDrop = match[1];
        }
    

    let killsGot = Math.round(amount*(playerPenguinPower/15))

    if (enemies[stats.currentEnemy].difficulty === "pond") {
        currentDrop = "I316";
        killsGot = Math.round(amount*(100/15))

    }



    if (concept==='egg'){
        createPopup('&#9201; Time Skipped and gathered '+beautify(killsGot)+'<img src="img/src/items/'+currentDrop+'.jpg">and '+beautify(enemies[stats.currentEnemy].exp * killsGot)+' EXP', '#4e9690')

    }



    /*
if (stats.currentArea === "A1") rollTable(area1Loot, amount/7)
if (stats.currentArea === "A2") rollTable(area2Loot, amount/7)
if (stats.currentArea === "A3") rollTable(area3Loot, amount/7)
if (stats.currentArea === "A4") rollTable(area4Loot, amount/7)
    */

if (unlocks.penguins){


if (rpgPlayer.minipenguin1!=="none"){
    items[rpgPlayer.minipenguin1].count += killsGot/4;
}

if (rpgPlayer.minipenguin2!=="none"){
    items[rpgPlayer.minipenguin2].count += killsGot/4;
}

if (rpgPlayer.minipenguin3!=="none"){
    items[rpgPlayer.minipenguin3].count += killsGot/4;
}

    
}


if (concept===undefined) enemies[stats.currentEnemy].killCount += killsGot
    
items[currentDrop].count += killsGot;

rpgClass[stats.currentClass].currentExp += enemies[stats.currentEnemy].exp * killsGot;

/*
did("idleItem").innerHTML = beautify(killsGot);
did("idleItemImg").src = "img/src/items/"+currentDrop+".jpg";
did("idleExp").innerHTML = beautify(enemies[stats.currentEnemy].exp * killsGot);
did('idleTime').innerHTML = convertSecondsToHMS(secondsInactive);
*/

let additionalText = ""

if (unlocks.penguins) {

    did("recapImage").style.display="flex"

    if (rpgPlayer.minipenguin1!=="none" && rpgPlayer.minipenguin2!=="none" && rpgPlayer.minipenguin3!=="none"){


        additionalText = "Additionally, your penguins gathered "+beautify(killsGot/4)+" "+bestiaryItem(rpgPlayer.minipenguin1)+", "+beautify(killsGot/4)+" "+bestiaryItem(rpgPlayer.minipenguin2)+" and "+beautify(killsGot/4)+" "+bestiaryItem(rpgPlayer.minipenguin3)



    }





}

did("recapMsg").innerHTML = "<p>You have been away for "+convertSecondsToHMS(lastofflinetime)+". In that time, you gathered "+beautify(amount*(playerPenguinPower/15))+" "+bestiaryItem(currentDrop)+" and "+beautify(enemies[stats.currentEnemy].exp * killsGot)+" EXP. "+additionalText+"</p>"






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


function masteryGuide(){

let totalQuests = 58
did("MGQuesting").innerHTML = `<img src="img/src/items/quest.jpg"><h1>Questing</h1><h2><strong><img src="img/src/icons/insight.png">`+stats.questsCompleted*10+`/`+(totalQuests*10)+`</strong> `+stats.questsCompleted+`/`+totalQuests+` (`+(stats.questsCompleted/totalQuests*100).toFixed(1)+`%)</h2><div class="masteryGuideProgress"><div style="width:`+(stats.questsCompleted/totalQuests*100).toFixed(1)+`%"></div></div>`

did("MGCollection").innerHTML = `<img src="img/src/icons/collection.jpg"><h1>Collection</h1><h2><strong><img src="img/src/icons/insight.png">`+collectiblesGot*5+`/`+(collectiblesTotal*5)+`</strong> `+collectiblesGot+`/`+collectiblesTotal+` (`+(collectiblesGot/collectiblesTotal*100).toFixed(1)+`%)</h2><div class="masteryGuideProgress"><div style="width:`+(collectiblesGot/collectiblesTotal*100).toFixed(1)+`%"></div></div>`

if (unlocks.journal) did("MGGrandArchive").innerHTML = `<img src="img/src/icons/achievement.png"><h1>Grand Archive</h1><h2><strong><img src="img/src/icons/insight.png">`+stats.logsGot*5+`/`+(totalLogs*5)+`</strong> `+stats.logsGot+`/`+totalLogs+` (`+(stats.logsGot/totalLogs*100).toFixed(1)+`%)</h2><div class="masteryGuideProgress"><div style="width:`+(stats.logsGot/totalLogs*100).toFixed(1)+`%"></div></div>`

if (unlocks.armory) did("MGArmory").innerHTML = `<img src="img/src/icons/armory.jpg"><h1>Armory</h1><h2><strong><img src="img/src/icons/insight.png">`+totalArmoryGot*10+`/`+(totalArmory*10)+`</strong> `+totalArmoryGot+`/`+totalArmory+` (`+(totalArmoryGot/totalArmory*100).toFixed(1)+`%)</h2><div class="masteryGuideProgress"><div style="width:`+(totalArmoryGot/totalArmory*100).toFixed(1)+`%"></div></div>`

if (unlocks.bestiary) did("MGBestiary").innerHTML = `<img src="img/src/items/I290.jpg"><h1>Bestiary Medals</h1><h2><strong><img src="img/src/icons/insight.png">`+medalsGot*10+`/`+((elibileEnemies+medalsGot)*10)+`</strong> `+medalsGot+`/`+(elibileEnemies+medalsGot)+` (`+(medalsGot/(elibileEnemies+medalsGot)*100).toFixed(1)+`%)</h2><div class="masteryGuideProgress"><div style="width:`+(medalsGot/(elibileEnemies+medalsGot)*100).toFixed(1)+`%"></div></div>`

if (unlocks.garden) did("MGGarden").innerHTML = `<img src="img/src/items/I287.jpg"><h1>Garden</h1><h2><strong><img src="img/src/icons/insight.png">`+plantCompletionProgress*6+`/`+(plantCompletionProgressTotal*6)+`</strong> `+plantCompletionProgress+`/`+plantCompletionProgressTotal+` (`+(plantCompletionProgress/plantCompletionProgressTotal*100).toFixed(1)+`%)</h2><div class="masteryGuideProgress"><div style="width:`+(plantCompletionProgress/plantCompletionProgressTotal*100).toFixed(1)+`%"></div></div>`




}
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
    if (event.code === "KeyS" && turtleRename.style.display === "none") autosave()
});



//----save and load----

function save() {

    

localStorage.setItem('lastVisitTime', new Date().getTime());
    
  const saveData = {}
  saveData.savedItemCount = {}; for (const i in items) {  saveData.savedItemCount[i] = items[i].count;}
  saveData.savedItemLevel = {}; for (const i in items) { saveData.savedItemLevel[i] = items[i].level;}
  saveData.savedItemCD = {}; for (const i in items) { saveData.savedItemCD[i] = items[i].cd;}
  saveData.savedItemStats = {}; for (const i in items) { saveData.savedItemStats[i] = items[i].statUp;}
  saveData.savedItemGot = {}; for (const i in items) { saveData.savedItemGot[i] = items[i].gotOnce;}
  saveData.savedItemStamp1 = {}; for (const i in items) { saveData.savedItemStamp1[i] = items[i].stamp1;}
  saveData.savedItemStamp2 = {}; for (const i in items) { saveData.savedItemStamp2[i] = items[i].stamp2;}
  saveData.savedItemStamp3 = {}; for (const i in items) { saveData.savedItemStamp3[i] = items[i].stamp3;}
  saveData.savedItemTimesGot = {}; for (const i in items) { saveData.savedItemTimesGot[i] = items[i].timesGot;}
  saveData.savedItemRevealed = {}; for (const i in items) { saveData.savedItemRevealed[i] = items[i].revealed;}

  saveData.savedMailGot = {}; for (const i in mail) { saveData.savedMailGot[i] = mail[i].recieved;}
  saveData.savedMailRead = {}; for (const i in mail) { saveData.savedMailRead[i] = mail[i].read;}
  saveData.savedMailDeleted = {}; for (const i in mail) { saveData.savedMailDeleted[i] = mail[i].deleted;}


  saveData.savedBuffTime = {}; for (const i in buffs) { saveData.savedBuffTime[i] = buffs[i].time;}
  saveData.savedBuffStacks = {}; for (const i in buffs) { saveData.savedBuffStacks[i] = buffs[i].stacks;}

  
  saveData.savedEnemyKills = {}; for (const i in enemies) { saveData.savedEnemyKills[i] = enemies[i].killCount;}
  saveData.savedEnemyNerf = {}; for (const i in enemies) { saveData.savedEnemyNerf[i] = enemies[i].nerfed;}

  saveData.savedQuestState = {}; for (const i in quests) { saveData.savedQuestState[i] = quests[i].state;}
  saveData.savedQuestUnlocked = {}; for (const i in quests) { saveData.savedQuestUnlocked[i] = quests[i].unlocked;}
  
    
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

  saveData.savedBuildingLevel = {}; for (const i in buildings) { saveData.savedBuildingLevel[i] = buildings[i].level;}
  saveData.savedBuildingMaxLevel = {}; for (const i in buildings) { saveData.savedBuildingMaxLevel[i] = buildings[i].maxLevel;}
  saveData.savedBuildingUnlock = {}; for (const i in buildings) { saveData.savedBuildingUnlock[i] = buildings[i].unlocked;}
  saveData.savedBuildingTier = {}; for (const i in buildings) { saveData.savedBuildingTier[i] = buildings[i].tier;}
  saveData.savedBuildingProgress = {}; for (const i in buildings) { saveData.savedBuildingProgress[i] = buildings[i].progress;}

  saveData.savedResearchTimer = {}; for (const i in research) { saveData.savedResearchTimer[i] = research[i].timer;}
  saveData.savedResearchStatus = {}; for (const i in research) { saveData.savedResearchStatus[i] = research[i].status;}
  saveData.savedResearchUnlocked = {}; for (const i in research) { saveData.savedResearchUnlocked[i] = research[i].unlocked;}

  saveData.savedJobUnlocked = {}; for (const i in jobPanels) { saveData.savedJobUnlocked[i] = jobPanels[i].unlocked;}

  saveData.savedTalents = {}; for (const i in talent) { saveData.savedTalents[i] = talent[i].active;}
  saveData.savedTalentsStats = {}; for (const i in talent) { saveData.savedTalentsStats[i] = talent[i].statUp;}
  saveData.savedTalentsPermanent = {}; for (const i in talent) { saveData.savedTalentsPermanent[i] = talent[i].permanent;}


  saveData.savedItemOfTheDay = {}; for (const i in itemOfTheDay) { saveData.savedItemOfTheDay[i] = itemOfTheDay[i];}

  saveData.savedRecipePanelUnlocked = {}; for (const i in jobPanels) { saveData.savedRecipePanelUnlocked[i] = jobPanels[i].unlocked;}

  saveData.savedShowdownRecord = {}; for (const i in showdown) { saveData.savedShowdownRecord[i] = showdown[i].bestTime;}

  saveData.savedHonorStock = {}; for (const i in shopHonor) { saveData.savedHonorStock[i] = shopHonor[i].stock;}

  saveData.savedDungeonTimer = {}; for (const i in areas) { if ("dungeonTimer" in areas[i]) { saveData.savedDungeonTimer[i] = areas[i].dungeonTimer;} }

  saveData.savedSkirmishRecord = {}; for (const i in skirmish) { saveData.savedSkirmishRecord[i] = skirmish[i].bestScore;}

  saveData.savedItemArmory = {}; for (const i in items) { saveData.savedItemArmory[i] = items[i].armoryState;}

  saveData.savedItemLocked = {}; for (const i in items) { saveData.savedItemLocked[i] = items[i].locked;}

  saveData.savedItemFavorited = {}; for (const i in items) { saveData.savedItemFavorited[i] = items[i].favorited;}

  saveData.savedItemQueue = {}; for (const i in recipes) { saveData.savedItemQueue[i] = recipes[i].craftingQueue;}

  saveData.savedEnemiesSaw = {}; for (const i in enemies) { saveData.savedEnemiesSaw[i] = enemies[i].sawOnce;}

  saveData.savedTotalSeconds = {}; saveData.savedTotalSeconds = stats.totalSeconds;

  saveData.savedWarPaint = {}; for (const i in items) { if ("paint" in items[i]) { saveData.savedWarPaint[i] = items[i].paint;} }

  saveData.savedSeedCount = {}; for (const i in plants) { { saveData.savedSeedCount[i] = plants[i].count;} }

  saveData.savedSeedPlanted = {}; for (const i in plants) { { saveData.savedSeedPlanted[i] = plants[i].planted;} }

  saveData.savedItemVaulted = {}; for (const i in items) { saveData.savedItemVaulted[i] = items[i].vaulted;}

  saveData.savedSeedHarvested = {}; for (const i in plants) { { saveData.savedSeedHarvested[i] = plants[i].harvested;} }

  saveData.savedGardenShopStock = {}; for (const i in gardenShop) { saveData.savedGardenShopStock[i] = gardenShop[i].stock;}

  saveData.savedPlotSlot = {}; for (const i in plot) { saveData.savedPlotSlot[i] = plot[i].slot;}
  saveData.savedPlotAge = {}; for (const i in plot) { saveData.savedPlotAge[i] = plot[i].age;}
  saveData.savedPlotWater = {}; for (const i in plot) { saveData.savedPlotWater[i] = plot[i].water;}
  saveData.savedPlotMature = {}; for (const i in plot) { saveData.savedPlotMature[i] = plot[i].mature;}
  saveData.savedPlotRenewable = {}; for (const i in plot) { saveData.savedPlotRenewable[i] = plot[i].renewable;}

  saveData.savedSound = {}; saveData.savedSound = savedSound;

  //saveData.savedClassData = {}; for (const i in rpgClass) { saveData.savedClassData[i] = rpgClass[i];}  

  saveData.savedClassLevel = {}; for (const i in rpgClass) { saveData.savedClassLevel[i] = rpgClass[i].level;}  
  saveData.savedClassCurrentExp = {}; for (const i in rpgClass) { saveData.savedClassCurrentExp[i] = rpgClass[i].currentExp;}  
  saveData.savedClassNextExp = {}; for (const i in rpgClass) { saveData.savedClassNextExp[i] = rpgClass[i].nextExp;}  


  saveData.savedFertiliser = {}; for (const i in fertiliser) { saveData.savedFertiliser[i] = fertiliser[i].unlocked;}

  saveData.savedGametips = {}; for (const i in gametip) { saveData.savedGametips[i] = gametip[i].unlocked;}

  saveData.savedDungeonCharges = {}; for (const i in areas) { saveData.savedDungeonCharges[i] = areas[i].charges;}


  const datosGuardados = localStorage.getItem('saveData');
  const parsedData = JSON.parse(datosGuardados);


  if (datosGuardados && parsedData.savedTotalSeconds){
  if (parsedData.savedTotalSeconds <= stats.totalSeconds){
    
  const JSONData = JSON.stringify(saveData);
  localStorage.setItem('saveData', JSONData); 
  }
} else {
    const JSONData = JSON.stringify(saveData);
    localStorage.setItem('saveData', JSONData); 
}

}

function load() {
  const datosGuardados = localStorage.getItem('saveData');
  if (datosGuardados) { //checks if savedata available
    const parsedData = JSON.parse(datosGuardados);

    for (const i in parsedData.savedDungeonCharges) if (areas[i]) { areas[i].charges = parsedData.savedDungeonCharges[i];}

    for (const i in parsedData.savedGametips)  if (gametip[i]) { gametip[i].unlocked = parsedData.savedGametips[i];}

    for (const i in parsedData.savedFertiliser) { fertiliser[i].unlocked = parsedData.savedFertiliser[i];}

    for (const i in parsedData.savedClassData) { rpgClass[i].level = parsedData.savedClassData[i].level;}
    for (const i in parsedData.savedClassData) { rpgClass[i].currentExp = parsedData.savedClassData[i].currentExp;}
    for (const i in parsedData.savedClassData) { rpgClass[i].nextExp = parsedData.savedClassData[i].nextExp;} 

    for (const i in parsedData.savedClassLevel) { rpgClass[i].level = parsedData.savedClassLevel[i];}
    for (const i in parsedData.savedClassCurrentExp) { rpgClass[i].currentExp = parsedData.savedClassCurrentExp[i];}
    for (const i in parsedData.savedClassNextExp) { rpgClass[i].nextExp = parsedData.savedClassNextExp[i];}



    savedSound = parsedData.savedSound;

    for (const i in parsedData.savedPlotSlot) { plot[i].slot = parsedData.savedPlotSlot[i];}
    for (const i in parsedData.savedPlotAge) { plot[i].age = parsedData.savedPlotAge[i];}
    for (const i in parsedData.savedPlotWater) { plot[i].water = parsedData.savedPlotWater[i];}
    for (const i in parsedData.savedPlotMature) { plot[i].mature = parsedData.savedPlotMature[i];}
    for (const i in parsedData.savedPlotRenewable) { plot[i].renewable = parsedData.savedPlotRenewable[i];}

    for (const i in parsedData.savedGardenShopStock) { gardenShop[i].stock = parsedData.savedGardenShopStock[i];}

    for (const i in parsedData.savedSeedHarvested) { plants[i].harvested = parsedData.savedSeedHarvested[i];}

    for (const i in parsedData.savedItemVaulted) { if (items[i]) items[i].vaulted = parsedData.savedItemVaulted[i];}

    for (const i in parsedData.savedSeedCount) { plants[i].count = parsedData.savedSeedCount[i];}

    for (const i in parsedData.savedSeedPlanted) { plants[i].planted = parsedData.savedSeedPlanted[i];}



    for (const i in parsedData.savedEnemiesSaw) { enemies[i].sawOnce = parsedData.savedEnemiesSaw[i];}

    for (const i in parsedData.savedItemQueue) if (recipes[i]) { recipes[i].craftingQueue = parsedData.savedItemQueue[i];}


    for (const i in parsedData.savedSkirmishRecord) { skirmish[i].bestScore = parsedData.savedSkirmishRecord[i];}

    for (const i in parsedData.savedDungeonTimer) if (areas[i]) { areas[i].dungeonTimer = parsedData.savedDungeonTimer[i];}

    for (const i in parsedData.savedHonorStock) { if (shopHonor[i]) shopHonor[i].stock = parsedData.savedHonorStock[i];}  

    for (const i in parsedData.savedShowdownRecord) { showdown[i].bestTime = parsedData.savedShowdownRecord[i];}  

    for (const i in parsedData.savedRecipePanelUnlocked) if (jobPanels[i]) { jobPanels[i].unlocked = parsedData.savedRecipePanelUnlocked[i];}  

    for (const i in parsedData.savedItemOfTheDay) { itemOfTheDay[i] = parsedData.savedItemOfTheDay[i];}

    for (const i in parsedData.savedResearchUnlocked) { research[i].unlocked = parsedData.savedResearchUnlocked[i];}  
    for (const i in parsedData.savedResearchTimer) { research[i].timer = parsedData.savedResearchTimer[i];}  
    for (const i in parsedData.savedResearchStatus) { research[i].status = parsedData.savedResearchStatus[i];}  

    for (const i in parsedData.savedJobUnlocked) { if (jobPanels[i]) jobPanels[i].unlocked = parsedData.savedJobUnlocked[i];}  

    for (const i in parsedData.savedTalents) { talent[i].active = parsedData.savedTalents[i];}  
    for (const i in parsedData.savedTalentsStats) { talent[i].statUp = parsedData.savedTalentsStats[i];}  
    for (const i in parsedData.savedTalentsPermanent) { talent[i].permanent = parsedData.savedTalentsPermanent[i];}  


    for (const i in parsedData.savedBuildingLevel) { buildings[i].level = parsedData.savedBuildingLevel[i];}  
    for (const i in parsedData.savedBuildingUnlock) { buildings[i].unlocked = parsedData.savedBuildingUnlock[i];}  
    for (const i in parsedData.savedBuildingMaxLevel) { buildings[i].maxLevel = parsedData.savedBuildingMaxLevel[i];}  
    for (const i in parsedData.savedBuildingTier) { buildings[i].tier = parsedData.savedBuildingTier[i];}  
    for (const i in parsedData.savedBuildingProgress) { buildings[i].progress = parsedData.savedBuildingProgress[i];}  

    
    for (const i in parsedData.savedLogsUnlocked) { logs[i].unlocked = parsedData.savedLogsUnlocked[i];}  
    for (const i in parsedData.savedLogsOnce) { logs[i].once = parsedData.savedLogsOnce[i];}  
    for (const i in parsedData.savedLogsRevealed) { logs[i].revealed = parsedData.savedLogsRevealed[i];}  


    for (const i in parsedData.savedMailGot) { if (mail[i]) mail[i].recieved = parsedData.savedMailGot[i];}  
    for (const i in parsedData.savedMailRead) { if (mail[i]) mail[i].read = parsedData.savedMailRead[i];}  
    for (const i in parsedData.savedMailDeleted) { if (mail[i]) mail[i].deleted = parsedData.savedMailDeleted[i];}  


    for (const i in parsedData.savedJobLevel) { jobs[i].level = parsedData.savedJobLevel[i];}  
    for (const i in parsedData.savedJobExp) { jobs[i].exp = parsedData.savedJobExp[i];}
    for (const i in parsedData.savedJobMaxExp) { jobs[i].maxExp = parsedData.savedJobMaxExp[i];}  
      
    for (const i in parsedData.savedJobPanelHidden) { if (jobPanels[i]) jobPanels[i].hidden = parsedData.savedJobPanelHidden[i];}  
    for (const i in parsedData.savedJobPanelUnlock) { if (jobPanels[i]) jobPanels[i].unlocked = parsedData.savedJobPanelUnlock[i];}  
      
    for (const i in parsedData.savedShopStock) if (shopItems[i]) { shopItems[i].stock = parsedData.savedShopStock[i];}
    for (const i in parsedData.savedShopUnlocked) if (shopItems[i]) { shopItems[i].unlocked = parsedData.savedShopUnlocked[i];}  
      
    for (const i in parsedData.savedAreaActive) { areas[i].active = parsedData.savedAreaActive[i];}  
    for (const i in parsedData.savedAreaUnlocked) { areas[i].unlocked = parsedData.savedAreaUnlocked[i];}  

    
    for (const i in parsedData.savedAreaBoss) { areas[i].boss = parsedData.savedAreaBoss[i];}  
    for (const i in parsedData.savedAreaOre) { areas[i].unlockedOre = parsedData.savedAreaOre[i];}  
    for (const i in parsedData.savedAreaHerb) { areas[i].unlockedHerb = parsedData.savedAreaHerb[i];}
    for (const i in parsedData.savedAreaPond) { areas[i].unlockedPond = parsedData.savedAreaPond[i];}
      
    for (const i in parsedData.savedRecipeTime) if (recipes[i]) { recipes[i].time = parsedData.savedRecipeTime[i];}
    for (const i in parsedData.savedRecipeCrafting) if (recipes[i]) { recipes[i].crafting = parsedData.savedRecipeCrafting[i];}  
    for (const i in parsedData.savedRecipeUnlocked) if (recipes[i]){ recipes[i].unlocked = parsedData.savedRecipeUnlocked[i];}
  

    for (const i in parsedData.savedItemCount) { if (items[i]) items[i].count = parsedData.savedItemCount[i];}
    for (const i in parsedData.savedItemLevel) { if (items[i]) items[i].level = parsedData.savedItemLevel[i];}
    for (const i in parsedData.savedItemCD) { if (items[i]) items[i].cd = parsedData.savedItemCD[i];}
    for (const i in parsedData.savedItemStats) { if (items[i]) items[i].statUp = parsedData.savedItemStats[i];}
    for (const i in parsedData.savedItemGot) { if (items[i]) items[i].gotOnce = parsedData.savedItemGot[i];}
    for (const i in parsedData.savedItemTimesGot) { if (items[i]) items[i].timesGot = parsedData.savedItemTimesGot[i];}
    for (const i in parsedData.savedItemRevealed) { if (items[i]) items[i].revealed = parsedData.savedItemRevealed[i];}

    for (const i in parsedData.savedItemStamp1) { if (items[i]) items[i].stamp1 = parsedData.savedItemStamp1[i];}
    for (const i in parsedData.savedItemStamp2) { if (items[i]) items[i].stamp2 = parsedData.savedItemStamp2[i];}
    for (const i in parsedData.savedItemStamp3) { if (items[i]) items[i].stamp3 = parsedData.savedItemStamp3[i];}

    for (const i in parsedData.savedWarPaint) { if (items[i]) items[i].paint = parsedData.savedWarPaint[i];}

    for (const i in parsedData.savedItemFavorited) { if (items[i]) items[i].favorited = parsedData.savedItemFavorited[i];}

    for (const i in parsedData.savedItemLocked) { if (items[i]) items[i].locked = parsedData.savedItemLocked[i];}

    for (const i in parsedData.savedItemArmory) { if (items[i]) items[i].armoryState = parsedData.savedItemArmory[i];}


    for (const i in parsedData.savedBuffTime) { if (buffs[i]) buffs[i].time = parsedData.savedBuffTime[i];}
    for (const i in parsedData.savedBuffStacks) { if (buffs[i]) buffs[i].stacks = parsedData.savedBuffStacks[i];}
    
    for (const i in parsedData.savedEnemyKills) { enemies[i].killCount = parsedData.savedEnemyKills[i];}
    for (const i in parsedData.savedEnemyNerf) { enemies[i].nerfed = parsedData.savedEnemyNerf[i];}

    for (const i in parsedData.savedQuestState) { quests[i].state = parsedData.savedQuestState[i];}
    for (const i in parsedData.savedQuestUnlocked) { quests[i].unlocked = parsedData.savedQuestUnlocked[i];}

    for (const i in parsedData.savedPlayerData) { rpgPlayer[i] = parsedData.savedPlayerData[i];}  
    for (const i in parsedData.savedCdData) { cd[i] = parsedData.savedCdData[i];}  
    for (const i in parsedData.savedSettingsData){ settings[i] = parsedData.savedSettingsData[i];}
    for (const i in parsedData.savedStatsData) { stats[i] = parsedData.savedStatsData[i];}
    for (const i in parsedData.savedUnlocksData) { unlocks[i] = parsedData.savedUnlocksData[i];}  

    

      
  }
}

function deleteSave() {

    localStorage.removeItem('saveData');
    localStorage.removeItem('lastVisitTime');

    const saveData = {}
    saveData.savedItemCount = {}; for (const i in items) { if (items[i].quality==="Soulbound")  saveData.savedItemCount[i] = items[i].count;}
    const JSONData = JSON.stringify(saveData);
    localStorage.setItem('saveData', JSONData); 


    location.reload();
};



function exportJSON() {


    if (cd.exportReminder<=0){
        did('botonOpciones').style.animation = "none"
        did('exportSave').style.animation = "none"
        playSound("audio/retro2.mp3");
        items.I296.count++;
        addItem();
        cd.exportReminder = 43200;
        unlocksReveal();
    }

    save();

    
    if (!localStorage.getItem('saveData')){ if (!did('importPopUp')) {createPopup('&#10060; No SaveData Found', '#913c3c', 'importPopUp')} } else {
    
    const datosGuardados = localStorage.getItem('saveData');
    const jsonData = JSON.parse(datosGuardados);
    
    const jsonStr = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "SuperSaveData-"+stats.currentVersion+".json";
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




cd.exportReminder = 43200;
unlocks.garden = false;

function unlocksReveal(){


    if (unlocks.jobs) did('jobTab').style.display = "flex";
    if (unlocks.garrison) did('campTab').style.display = "flex";
    if (unlocks.itemOfTheDay) did('itemOfTheDay').style.display = "flex";
    if (unlocks.journal) did('achievementsTab').style.display = "flex";
    if (unlocks.bestiary) {did('bestiaryMastery').style.display = "flex"; did('bestiaryProgress2').style.display = "flex"; did('bestiaryBadge').style.display = "flex";}
    if (unlocks.armory) did('armoryButton').style.display = "flex";
    if (unlocks.penguins) {
        
        did("minipenguin1").style.display = "flex"
        did("minipenguin2").style.display = "flex"
        did("minipenguin3").style.display = "flex"

        gametipUnlock("gt10") 
    }
    if (unlocks.inventorySorting) {
        //did('inventorySorters2').style.display = "flex";


        document.querySelectorAll('.extraSorter').forEach(elemento => elemento.style.display = "flex");
        did('addFavoriteButton').style.display = "flex";
        did('addVaultButton').style.display = "flex";
}

    if (unlocks.garden) {did('gardenLockedPanel').style.display = "none"; gametipUnlock("gt13")}
    if (unlocks.gardenUpgrade1) did('gardenRow3').style.display = "flex";
    if (unlocks.gardenUpgrade2) did('gardenRow4').style.display = "flex";
    if (unlocks.gardenUpgrade3) did('gardenRow5').style.display = "flex";


    if (unlocks.loadouts) did('gearLoadouts').style.display = "flex";


    if (unlocks.seedCompendium) did('gardenShipButton').style.display = "flex";
    if (unlocks.fertiliser) did('gardenFertiliserButton').style.display = "flex";

    if (unlocks.shop) { if (stats.currentArea !== "A7") did('shopButton').innerHTML = '<img src="img/sys/coin.png" style="margin-right: 0.3rem;">Shop'; did('shopButton').className = "contentHeaderButton" }
    if (unlocks.dungeons) {did('dungeonButton').innerHTML = '<img src="img/src/areas/A3M.png" style="margin-right: 0.3rem;">Dungeon'; did('dungeonButton').className = "contentHeaderButton"; gametipUnlock("gt12")}
    if (unlocks.areas) {did('areaButton').innerHTML = '<img src="img/src/icons/expedition.png" style="margin-right: 0.3rem;">Area'; did('areaButton').className = "contentHeaderButton"  }
    //if (quests.A2Q3.state==="completed") {area1Common.I126 = {}; area1Common.I126.D=30; area1Common.I126.C=1; }
    if (unlocks.skills) {
        did("expPanel").className = "expPanelUnlocked"; 
        gametipUnlock('gt11');
        did('skillsButton').innerHTML = '<img src="img/src/icons/skillsIcon.jpg">Skills'; did('skillsButton').className = "contentHeaderButton"}
    if (unlocks.magic) {
        did('manaBox').style.display = "flex";
        did('skillSlot1').style.display = "flex";
        did('skillSlot2').style.display = "flex";
        did('skillSlot3').style.display = "flex";
        did('skillSlot4').style.display = "flex";
        did('skillSlot0').style.display = "flex";
        did('rpgCanvasUnder').style.background = "#19191C";
    }

    //rank
    if (stats.questsCompleted>=7) sendMail("MR1");
    if (stats.questsCompleted>=12) sendMail("MR2");
    if (stats.questsCompleted>=19) sendMail("MR3");
    if (stats.questsCompleted>=26) sendMail("MR4");
    if (stats.questsCompleted>=36) sendMail("MR5"); //garden
    if (stats.questsCompleted>=50) sendMail("MR6"); //garrison

    //flavor
    if (stats.questsCompleted>=4) sendMail("MF1"); //mom
    if (stats.questsCompleted>=16) sendMail("MF2"); //spam
    if (stats.questsCompleted>=22) sendMail("MF3"); //mom
    if (stats.questsCompleted>=29) sendMail("MF4"); //omious warning
    if (stats.questsCompleted>=43) sendMail("MF5"); //mom
    if (stats.questsCompleted>=48) sendMail("MF6"); //

    //other    
    if (enemies.E23.killCount>0) sendMail("MO1");
    if (rpgClass.noClass.level===30) sendMail("MO2");
    if (stats.questsCompleted>=14) sendMail("MO3"); //rasmondius pre30

    
}


stats.currentVersion = undefined;

function retroactiveUpdate(){

    if (stats.currentVersion === undefined && enemies.E1.killCount>3) { did("outdatedData").style.display = "flex"; did("bodyCover").style.display = "flex"; items.I317.count++}

    if (items.I113.statUp!==0) items.I113.statUp = 25 
    if (items.I124.statUp!==0) items.I124.statUp = 35
    if (items.I128.statUp!==0) items.I128.statUp = 50


    if (stats.currentVersion<0.41){


        strip()

        items.I57.count = Math.ceil(items.I57.count / 55);
        items.I165.count = Math.ceil(items.I165.count / 55);
        items.I71.count = Math.ceil(items.I71.count / 55);
        items.I100.count = Math.ceil(items.I100.count / 55);
        sendMail("MS1")
        
    }

    if (stats.currentVersion<0.42){ sendMail("MS2"); gametipUnlock("gt18")}

    if (stats.currentVersion<0.43){for (var i in research) { research[i].status = "waiting"; research[i].unlocked = false; }; areas.A9.unlockedHerb = 0;}

    if (stats.currentVersion<0.44){for (var i in research) if (research[i].status === "completed") {research[i].status = "waiting"; research[i].unlocked = false; research[i].timer = research[i].timerMax; } }

    sanityCheck()
    stats.currentVersion = 0.45;
}


function sanityCheck(){
for (i in items){ if (!(equipCheck(i)) && items[i].sort==="equipable") {eval(items[i].remove)} }
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


function strip(){
    rpgPlayer.feetSlot = 'none'
rpgPlayer.headSlot = 'none'
rpgPlayer.legsSlot = 'none'
rpgPlayer.handsSlot = 'none'
rpgPlayer.chestSlot = 'none'
rpgPlayer.ringSlot = 'none'
rpgPlayer.weaponSlot = 'none'
rpgPlayer.trinketSlot = 'none'
rpgPlayer.L1feetSlot = 'none'
rpgPlayer.L1headSlot = 'none'
rpgPlayer.L1legsSlot = 'none'
rpgPlayer.L1handsSlot = 'none'
rpgPlayer.L1chestSlot = 'none'
rpgPlayer.L1ringSlot = 'none'
rpgPlayer.L1weaponSlot = 'none'
rpgPlayer.L1trinketSlot = 'none'
rpgPlayer.L2feetSlot = 'none'
rpgPlayer.L2headSlot = 'none'
rpgPlayer.L2legsSlot = 'none'
rpgPlayer.L2handsSlot = 'none'
rpgPlayer.L2chestSlot = 'none'
rpgPlayer.L2ringSlot = 'none'
rpgPlayer.L2weaponSlot = 'none'
rpgPlayer.L2trinketSlot = 'none'
rpgPlayer.L3feetSlot = 'none'
rpgPlayer.L3headSlot = 'none'
rpgPlayer.L3legsSlot = 'none'
rpgPlayer.L3handsSlot = 'none'
rpgPlayer.L3chestSlot = 'none'
rpgPlayer.L3ringSlot = 'none'
rpgPlayer.L3weaponSlot = 'none'
rpgPlayer.L3trinketSlot = 'none'
rpgPlayer.L4feetSlot = 'none'
rpgPlayer.L4headSlot = 'none'
rpgPlayer.L4legsSlot = 'none'
rpgPlayer.L4handsSlot = 'none'
rpgPlayer.L4chestSlot = 'none'
rpgPlayer.L4ringSlot = 'none'
rpgPlayer.L4weaponSlot = 'none'
rpgPlayer.L4trinketSlot = 'none'
rpgPlayer.L5feetSlot = 'none'
rpgPlayer.L5headSlot = 'none'
rpgPlayer.L5legsSlot = 'none'
rpgPlayer.L5handsSlot = 'none'
rpgPlayer.L5chestSlot = 'none'
rpgPlayer.L5ringSlot = 'none'
rpgPlayer.L5weaponSlot = 'none'
rpgPlayer.L5trinketSlot = 'none'
rpgPlayer.L6feetSlot = 'none'
rpgPlayer.L6headSlot = 'none'
rpgPlayer.L6legsSlot = 'none'
rpgPlayer.L6handsSlot = 'none'
rpgPlayer.L6chestSlot = 'none'
rpgPlayer.L6ringSlot = 'none'
rpgPlayer.L6weaponSlot = 'none'
rpgPlayer.L6trinketSlot = 'none'
rpgPlayer.L7feetSlot = 'none'
rpgPlayer.L7headSlot = 'none'
rpgPlayer.L7legsSlot = 'none'
rpgPlayer.L7handsSlot = 'none'
rpgPlayer.L7chestSlot = 'none'
rpgPlayer.L7ringSlot = 'none'
rpgPlayer.L7weaponSlot = 'none'
rpgPlayer.L7trinketSlot = 'none'
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
    if (items[i].dynamic) did("tooltipDescription").innerHTML = eval(items[i].description)+'<br><div class="separador"></div>';
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

let randomTab = rng(1,11)

function randomTabName(icon){ //displays a random browser tab name
    let random = randomTab;
    let reminder = ""

    if (icon==="plant") reminder = "[🌱!]";

    if (random===1) document.title = reminder+" Your Turtle Is Working Hard"; 
    if (random===2) document.title = reminder+" Where Is My Day Off?";
    if (random===3) document.title = reminder+" They Shall Rise Again";
    if (random===4) document.title = reminder+" Slaying Beasts";
    if (random===5) document.title = reminder+" Exploring Uncharted Lands";
    if (random===6) document.title = reminder+" Adventuring In Progress";
    if (random===7) document.title = reminder+" Pat Pat Pat Pat Pat Pat Pat Pat";
    if (random===8) document.title = reminder+" Grinding Materials";
    if (random===9) document.title = reminder+" Super Turtle Idle";
    if (random===10) document.title = reminder+" You Can Leave It To Me";
    if (random===11) document.title = reminder+" Have You Seen Whiskers?";


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
    addItem();
    setCursor();
    upgradesReveal();
    createGametip();

    setTimeout(() => {
        unlocksReveal(); //export reminder bullshit
    }, 100);



    //checkResolution()

}
//#endregion
