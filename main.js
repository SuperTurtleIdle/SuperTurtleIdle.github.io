//muere eslint
/* eslint-env es6 */
/* eslint-disable */

//------------Shorcuts-----------

const did = (id) => document.getElementById(id);

//------------Overrides----------

window.addEventListener("contextmenu", function (e) { //disables web right click
    e.preventDefault();
}); 

window.addEventListener('keydown', function (event) { //disables alt key
    if (event.keyCode === 18) { event.preventDefault(); return false; }
});

//-------------------------------

var game = {}

var player = {
    coins: { amount: 1, second: 10, perClick: 100, upgrades: 1, upgradesClick: 0 },
    resources: { amount: 0, second: 0, upgrades: 1 },
    supplies: { amount: 0, second: 0, upgrades: 1 },
    energy: { amount: 0, second: 0, upgrades: 1 },
    storage: { amount: 15000, upgrades: 1 },
    penguins: { amount: 0},
    };


const growRate = 1.07;

var stats = {
    timePlayed: 0, startedSince: 0, totalBuildings: 0, totalUpgrades: 0, totalSeconds: 0, clickCount: 0, totalCoins: 0, totalResources: 0, totalSupplies: 0, totalEnergy: 0, turtleName: 'Jeffrey', totalCoinsClick: 0, currentClickCoin: 0, totalAchievementsGot: 0, activeTreaty: "none", ableToSign : 1,
    };

var unlocks ={ 
    penguins:0,
}

var timers = { treatyCD: 0, frenzy: 0, superFrenzy:0, click: 0, superClick: 0}

function beautify(number) {
    number = number >= 9999999 ? number.toExponential(3) : number.toFixed(0);
    return number;
    };

function updateCounters() { //DO NOT PUT HERE ANYTHING THATS NOT UI
    did("contadorMonedas").textContent = beautify(player.coins.amount)
    did("contadorRecursos").textContent = beautify(player.resources.amount)
    did("contadorAlimento").textContent = beautify(player.supplies.amount)
    did("contadorEnergia").textContent = beautify(player.energy.amount)
    
    did("contadorAlmacenamiento").textContent = beautify(player.storage.amount)
    did("contadorAlmacenamiento2").textContent = beautify(player.storage.amount)
    did("contadorAlmacenamiento3").textContent = beautify(player.storage.amount)
    
    
    if (stats.activeTreaty === "none"){
    did("contadorMonedasSegundo").textContent = beautify(player.coins.second * player.coins.upgrades) + " /s"
    did("contadorRecursosSegundo").textContent = "(+" + beautify(player.resources.second * player.resources.upgrades) + " s)"
    did("contadorAlimentoSegundo").textContent = "(+" + beautify(player.supplies.second * player.supplies.upgrades) + " s)"
    did("contadorEnergiaSegundo").textContent = "(+" + beautify(player.energy.second * player.energy.upgrades) + " s)"
    }
    };

//----------------------==========================-----------------------
//----------------------=======ON TURTLE CLICK====-----------------------
//----------------------==========================-----------------------

let clickCooldown = false;

did("tortugaClick").onclick = function () {
    
if (!clickCooldown) {
    //turtle image shift
    if (stats.clickCount % 10 === 0 && stats.activeTreaty === "none") {
            const randomImageIndex = Math.floor(Math.random() * 5) + 1;
            const imagePath = "img/src/tortugasdefault/img" + randomImageIndex + ".png";
            did("tortugaClick").src = imagePath
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
    textoClick1.innerHTML = '<p>+' + (beautify(player.coins.perClick+player.coins.upgradesClick)) + '<img src="img/sys/coin.png" />'; 
    
    document.body.appendChild(textoClick1);
    setTimeout(function () { textoClick1.remove(); }, 490); }
    
    stats.totalCoins += player.coins.perClick+player.coins.upgradesClick;
    stats.totalCoinsClick += player.coins.perClick+player.coins.upgradesClick;
    stats.currentClickCoin = player.coins.perClick+player.coins.upgradesClick; //tracks how much per click for the achievement
    player.coins.amount += player.coins.perClick+player.coins.upgradesClick;
    stats.clickCount++;
    updateCounters();
    
clickCooldown = true;
setTimeout(function () {clickCooldown = false;}, 120);
}
};

//----------------------==========================-----------------------
//----------------------=======EVERY SECOND=======-----------------------
//----------------------==========================-----------------------

setInterval(oneSecond, 1000);
function oneSecond() {
    //resource cap
    const x = player.storage.amount;
    let y = did("contadorRecursos").style.color;
    
    if (player.resources.amount >= x) { player.resources.amount = x; y = "coral"; } 
    else { y = "white"; } did("contadorRecursos").style.color = y;
    
    y = did("contadorAlimento").style.color;
    if (player.supplies.amount >= x) { player.supplies.amount = x; y = "coral"; } 
    else { y = "white"; } did("contadorAlimento").style.color = y;
    
    y = did("contadorEnergia").style.color;
    if (player.energy.amount >= x) { player.energy.amount = x; y = "coral"; } 
    else { y = "white"; } did("contadorEnergia").style.color = y;
    
    if(stats.activeTreaty === "none"){ //see treaties for altered behaviour
    
    stats.totalCoins += player.coins.second * player.coins.upgrades
    stats.totalResources += player.resources.second * player.resources.upgrades
    stats.totalSupplies += player.supplies.second * player.supplies.upgrades 
    stats.totalEnergy += player.energy.second * player.energy.upgrades 
     
    player.coins.amount += player.coins.second * player.coins.upgrades
    player.resources.amount += player.resources.second * player.resources.upgrades
    player.supplies.amount += player.supplies.second * player.supplies.upgrades 
    player.energy.amount += player.energy.second * player.energy.upgrades
    
    }    
    
    //update stats
    did("estadisticaEdificiosTotal").textContent = stats.totalBuildings;
    did("estadisticaMejorasTotal").textContent = stats.totalUpgrades;
    did("estadisticaClicks").textContent = stats.clickCount;
    
    did("totalCoins").textContent = beautify(stats.totalCoins);
    did("totalResources").textContent = beautify(stats.totalResources);
    did("totalSupplies").textContent = beautify(stats.totalSupplies);
    did("totalEnergy").textContent = beautify(stats.totalEnergy);
    
    did("totalCoinClicks").textContent = beautify(stats.totalCoinsClick);
    
    //penguin counter
    did("penguinCounter").textContent = player.penguins.amount;
    
    if (settings.currentCategory === "campContainer")//building panel is visible
    for (let b in buildings) { //updates the price tag color if player has enough
    if ('apc' in buildings[b]) { if (player.coins.amount >= buildings[b].apc) { did(buildings[b].id+"PT").style.color = "#7EFF69"; } else { did(buildings[b].id+"PT").style.color = "coral"; };}  
    if ('apr' in buildings[b]) { if (player.resources.amount >= buildings[b].apr) { did(buildings[b].id+"PT").style.color = "#7EFF69"; } else { did(buildings[b].id+"PT").style.color = "coral"; };}
    if ('aps' in buildings[b]) { if (player.supplies.amount >= buildings[b].aps) { did(buildings[b].id+"PT").style.color = "#7EFF69"; } else { did(buildings[b].id+"PT").style.color = "coral"; };}
    if ('ape' in buildings[b]) { if (player.energy.amount >= buildings[b].ape) { did(buildings[b].id+"PT").style.color = "#7EFF69"; } else { did(buildings[b].id+"PT").style.color = "coral"; };}    
    }
  
    for (let t in timers) { //discounts one to every timer in timers every one second
     if (timers[t] > 0) timers[t]--;
    }
    
    document.title = beautify(player.coins.amount) + " Coins"; 
    AchievementCheck();
    updateCounters();
    };

//----------------------==========================-----------------------
//----------------------=======BUILDINGS TAB======-----------------------
//----------------------==========================-----------------------

//change tabs
function changeBuilding(panelName, buttonName) {
    var panel = did(panelName);
    var button = did(buttonName);

    if (panel.style.display === "none") {
        var panels = ["panelBanco", "panelComida", "panelRecursos", "panelEnergia", "panelAlmacenamiento"];
        var buttons = ["botonCategoriaBanco", "botonCategoriaAlimento", "botonCategoriaRecursos", "botonCategoriaEnergia", "botonCategoriaAlmacenamiento"];

        for (var i = 0; i < buttons.length; i++) {
            var btnName = buttons[i];
            var btn = did(btnName);
            btn.style.background = btnName === buttonName ? "#4f4054" : "#31313D";
        }

        for (var j = 0; j < panels.length; j++) {
            var pnlName = panels[j];
            var pnl = did(pnlName);
            if (pnlName !== panelName && pnl.style.display !== "none") {
                pnl.style.animation = "desvanecerPanel 0.4s";
                setTimeout(function (pnl) {
                    pnl.style.display = "none";
                }, 100, pnl);
            }
        }

        setTimeout(function () {
            panel.style.animation = "aparecerPanel 0.2s ease";
            panel.style.display = "flex";
        }, 200);
    }
}

function CategoryHandler(x,y,z){
    
    did(x).addEventListener("click", function () {
    changeBuilding(y, z);
        
});     
}

CategoryHandler ('botonCategoriaBanco','panelBanco','botonCategoriaBanco');
CategoryHandler ('botonCategoriaAlimento','panelComida','botonCategoriaAlimento');
CategoryHandler ('botonCategoriaRecursos','panelRecursos','botonCategoriaRecursos');
CategoryHandler ('botonCategoriaEnergia','panelEnergia','botonCategoriaEnergia');
CategoryHandler ('botonCategoriaAlmacenamiento', 'panelAlmacenamiento','botonCategoriaAlmacenamiento');

//-------------------------------

var buildings = { // a = amount, ap = actual price, bp = base price, p = production
    //coin        // u = upgrades, v = visibility, s = storage
    "C10": { a: 0, aps: 110, bps: 110, id: "mE1", pc: 1, u: 1, v: 0, img:'C10'}, //2 10min
    "C20": { a: 0, apr: 1250, bpr: 1250, id: "mE2", pc: 50, u: 1, v: 0, }, //4 40min
    "C30": { a: 0, ape: 14400, bpe: 14400, id: "mE3", pc: 1200, u: 1, v: 0, }, //8 8h
    "C40": { a: 0, aps: 42250000, bps: 42250000, id: "mE4", pc: 15860, u: 1, v: 0, }, //11 64h
    "C50": { a: 0, apr: 2000000000, bpr: 2000000000, id: "mE5", pc: 140120, u: 1, v: 0, }, //15 1000h
    "Money Printer": { a: 0, ape: 3888000000, bpe: 3888000000, id: "mE6", pc: 1213000, u: 1, v: 0, }, //18 8000h
    "TurtleLand": { a: 0, aps: 14600000000000, bps: 14600000000000, id: "mE7", pc: 9229000, u: 1, v: 0, }, //23 250000h
    //resources
    "Wood Chopping": { a: 0, apc: 600, bpc: 600, id: "rE1", pr: 1, u: 1, v: 0, }, //3 20min
    "Stone Mining": { a: 0, apc: 224000, bpc: 224000, id: "rE2", pr: 65, u: 1, v: 0, }, //6 2h
    "Tree Harvest": { a: 0, apc: 12000000, bpc: 12000000, id: "rE3", pr: 1230, u: 1, v: 0, }, //10 32h
    "Automatisation": { a: 0, apc: 1670000000, bpc: 1670000000, id: "rE4", pr: 9700, u: 1, v: 0, }, //14 500h
    "Asteroid Crusher": { a: 0, apc: 69990000000, bpc: 69990000000, id: "rE5", pr: 95555, u: 1, v: 0, }, //17 4000h
    "World Partition": { a: 0, apc: 245000000000000, bpc: 245000000000000, id: "rE6", pr: 2252500, u: 1, v: 0, }, //24 500000h
    //supplies
    "Bow Hunting": { a: 0, apc: 10, bpc: 10, id: "cE1", ps: 1, u: 1, v: 0, }, //1 1m
    "Croissant Trap": { a: 0, apc: 124600, bpc: 124600, id: "cE2", ps: 155, u: 1, v: 0, }, //5 1h
    "Agriculture": { a: 0, apc: 6222000, bpc: 6222000, id: "cE3", ps: 850, u: 1, v: 0, }, //9 16h
    "Turtle Grandma": { a: 0, apc: 746000000, bpc: 746000000, id: "cE4", ps: 11900, u: 1, v: 0, }, //13 250h
    "Husbandry": { a: 0, apc: 715000000000, bpc: 715000000000, id: "cE5", ps: 215250, u: 1, v: 0, }, //19 16000h
    "Avocadium": { a: 0, apc: 4000000000000, bpc: 4000000000000, id: "cE6", ps: 1430100, u: 1, v: 0, }, //21 64000h
    //energy
    "Coffee": { a: 0, apc: 1556000, bpc: 1556000, id: "eE1", pe: 1, u: 1, v: 0, }, //7 4h
    "Kite Generator": { a: 0, apc: 271000000, bpc: 271000000, id: "eE2", pe: 50, u: 1, v: 0, }, //12 128h
    "Potato Battery": { a: 0, apc: 25670000000, bpc: 25670000000, id: "eE3", pe: 610, u: 1, v: 0, }, //16 2000h
    "Canned Lightning": { a: 0, apc: 1800000000000, bpc: 1800000000000, id: "eE4", pe: 11520, u: 1, v: 0, }, //20 32000h
    "Carbon Burning": { a: 0, apc: 8422000000000, bpc: 8422000000000, id: "eE5", pe: 76200, u: 1, v: 0, },//22 128000h
    "Turtle Generator": { a: 0, apc: 688800000000000, bpc: 688800000000000, id: "eE6", pe: 2651000, u: 1, v: 0, }, //25 1000000h
    //storage
    "Big Ol Cave": { a: 0, apc: 120000, bpc: 120000, id: "aE1", s: 500000, u: 1, v: 0, },
    "Clay Pottery": { a: 0, apc: 18500000, bpc: 18500000, id: "aE2", s: 100000000, u: 1, v: 0, },
    "Straw Basket": { a: 0, apc: 1300000000, bpc: 1300000000, id: "aE3", s: 10000000000, u: 1, v: 0, },
    "Warehouse": { a: 0, apc: 125200000000, bpc: 125200000000, id: "aE4", s: 1000000000000, u: 1, v: 0, },
    "Floppy Disk": { a: 0, apc: 7700000000000, bpc: 7700000000000, id: "aE5", s: 100000000000000, u: 1, v: 0, },
    "Variable": { a: 0, apc: 666000000000000, bpc: 666000000000000, id: "aE6", s: 10000000000000000, u: 1, v: 0, },
};

function buildingImage(){ //updates image of the building (for upgrades)
  for (let b in buildings) {  
    if(buildings[b].img) did(buildings[b].id+'IMG').src = "img/src/upgrades/"+buildings[b].img+".png"
  }
} 
  
//--------animation handler------

let animationCooldown = false;

function limitedAnimation(animname){
    if(!animationCooldown) {
        
        animationCooldown=true;
        var element=this;
        setTimeout(function() {element.style.animation="none";animationCooldown=false} ,200);
        void element.offsetWidth;
        element.style.animation= animname + " 0.2s" }
}

//-------------------------------
buyMultiplier = 1; 
var maxBuy = false;

function buyingHandler2(b){ // gets called when buying a multiplier update, i have absolutely no idea how this works or why this works but im not interested in knowing
    if ('pc' in buildings[b]){ 
        player.coins.second += buildings[b].pc * buildings[b].u * buildings[b].a * 0.9; }   
    if ('pr' in buildings[b]){
        did("contadorRecursosSegundo").style.fontSize = "1vw"; 
        setTimeout(function () { did("contadorRecursosSegundo").style.fontSize = "0.8vw"; }, 50);
        player.resources.second += buildings[b].pr * buildings[b].u * buildings[b].a * 0.9; } 
    if ('ps' in buildings[b]){
        did("contadorAlimentoSegundo").style.fontSize = "1vw"; 
        setTimeout(function () { did("contadorAlimentoSegundo").style.fontSize = "0.8vw"; }, 50);
        player.supplies.second += buildings[b].ps * buildings[b].u * buildings[b].a * 0.9;  } 
    if ('pe' in buildings[b]){
        did("contadorEnergiaSegundo").style.fontSize = "1vw"; 
        setTimeout(function () { did("contadorEnergiaSegundo").style.fontSize = "0.8vw"; }, 50);
        player.energy.second += buildings[b].pe * buildings[b].u * buildings[b].a * 0.9;  }
     }   

function updateBuildingUI(b){ //updates various UI, such as %, production and price
  for (let b in buildings) {      
         
    function priceFormula(x) { //updates % and production tags
    x = x * (Math.pow(growRate, buildings[b].a) - Math.pow(growRate,buildings[b].a + buyMultiplier)) / (1 - growRate);
    return x;
    }
      
    if ('pc' in buildings[b]){ did(buildings[b].id+"TP").textContent = ((buildings[b].pc * buildings[b].u * buildings[b].a) / player.coins.second * 100).toFixed(2) + " %"; did(buildings[b].id+"P").textContent = "+" + beautify(buildings[b].pc * buildings[b].u);}
    
    if ('pr' in buildings[b]){ did(buildings[b].id+"TP").textContent = ((buildings[b].pr * buildings[b].u * buildings[b].a) / player.resources.second * 100).toFixed(2) + " %"; did(buildings[b].id+"P").textContent = "+" + beautify(buildings[b].pr * buildings[b].u);}
         
    if ('ps' in buildings[b]){ did(buildings[b].id+"TP").textContent = ((buildings[b].ps * buildings[b].u * buildings[b].a) / player.supplies.second * 100).toFixed(2) + " %"; did(buildings[b].id+"P").textContent = "+" + beautify(buildings[b].ps * buildings[b].u)} 
    
    if ('pe' in buildings[b]){ did(buildings[b].id+"TP").textContent = ((buildings[b].pe * buildings[b].u * buildings[b].a) / player.energy.second * 100).toFixed(2) + " %"; did(buildings[b].id+"P").textContent = "+" + beautify(buildings[b].pe * buildings[b].u)} 
    
    if ('s' in buildings[b]){ did(buildings[b].id+"P").textContent = "+" + beautify(buildings[b].s * buildings[b].u)} 
    
    //updates price, not entirely sure how this works but it does
    if ('apc' in buildings[b]) buildings[b].apc = priceFormula(buildings[b].bpc);
    if ('apr' in buildings[b]) buildings[b].apr = priceFormula(buildings[b].bpr);
    if ('aps' in buildings[b]) buildings[b].aps = priceFormula(buildings[b].bps);
    if ('ape' in buildings[b]) buildings[b].ape = priceFormula(buildings[b].bpe);
      
    if ('apc' in buildings[b]) did(buildings[b].id+"PT").textContent = beautify(buildings[b].apc)
    if ('apr' in buildings[b]) did(buildings[b].id+"PT").textContent = beautify(buildings[b].apr)   
    if ('aps' in buildings[b]) did(buildings[b].id+"PT").textContent = beautify(buildings[b].aps)
    if ('ape' in buildings[b]) did(buildings[b].id+"PT").textContent = beautify(buildings[b].ape)
             
    did(buildings[b].id+"T").textContent = buildings[b].a; // updates amount counter
      
    for (let b in buildings) { //updates the price tag color if player has enough
    if ('apc' in buildings[b]) { if (player.coins.amount >= buildings[b].apc) { did(buildings[b].id+"PT").style.color = "#7EFF69"; } else { did(buildings[b].id+"PT").style.color = "coral"; };}  
    if ('apr' in buildings[b]) { if (player.resources.amount >= buildings[b].apr) { did(buildings[b].id+"PT").style.color = "#7EFF69"; } else { did(buildings[b].id+"PT").style.color = "coral"; };}
    if ('aps' in buildings[b]) { if (player.supplies.amount >= buildings[b].aps) { did(buildings[b].id+"PT").style.color = "#7EFF69"; } else { did(buildings[b].id+"PT").style.color = "coral"; };}
    if ('ape' in buildings[b]) { if (player.energy.amount >= buildings[b].ape) { did(buildings[b].id+"PT").style.color = "#7EFF69"; } else { did(buildings[b].id+"PT").style.color = "coral"; };}    
    }  
    } 
}

function updateBuildingUIMax(b){ //updates various UI, such as %, production and price
  for (let b in buildings) {      
         
    function priceFormula(x) { //updates % and production tags
    x = x * (Math.pow(growRate, buildings[b].a) - Math.pow(growRate,buildings[b].a + buyMultiplier)) / (1 - growRate);
    return x;
    }
      
    if ('pc' in buildings[b]){ did(buildings[b].id+"TP").textContent = ((buildings[b].pc * buildings[b].u * buildings[b].a) / player.coins.second * 100).toFixed(2) + " %"; did(buildings[b].id+"P").textContent = "+" + beautify(buildings[b].pc * buildings[b].u);}
    
    if ('pr' in buildings[b]){ did(buildings[b].id+"TP").textContent = ((buildings[b].pr * buildings[b].u * buildings[b].a) / player.resources.second * 100).toFixed(2) + " %"; did(buildings[b].id+"P").textContent = "+" + beautify(buildings[b].pr * buildings[b].u);}
         
    if ('ps' in buildings[b]){ did(buildings[b].id+"TP").textContent = ((buildings[b].ps * buildings[b].u * buildings[b].a) / player.supplies.second * 100).toFixed(2) + " %"; did(buildings[b].id+"P").textContent = "+" + beautify(buildings[b].ps * buildings[b].u)} 
    
    if ('pe' in buildings[b]){ did(buildings[b].id+"TP").textContent = ((buildings[b].pe * buildings[b].u * buildings[b].a) / player.energy.second * 100).toFixed(2) + " %"; did(buildings[b].id+"P").textContent = "+" + beautify(buildings[b].pe * buildings[b].u)} 
    
    if ('s' in buildings[b]){ did(buildings[b].id+"P").textContent = "+" + beautify(buildings[b].s * buildings[b].u)} 
    
    //updates price, not entirely sure how this works but it does
    if ('apc' in buildings[b]) buildings[b].apc = priceFormula(buildings[b].bpc);
    if ('apr' in buildings[b]) buildings[b].apr = priceFormula(buildings[b].bpr);
    if ('aps' in buildings[b]) buildings[b].aps = priceFormula(buildings[b].bps);
    if ('ape' in buildings[b]) buildings[b].ape = priceFormula(buildings[b].bpe);
      
    if ('apc' in buildings[b]) did(buildings[b].id+"PT").textContent = beautify(buildings[b].apc)
    if ('apr' in buildings[b]) did(buildings[b].id+"PT").textContent = beautify(buildings[b].apr)   
    if ('aps' in buildings[b]) did(buildings[b].id+"PT").textContent = beautify(buildings[b].aps)
    if ('ape' in buildings[b]) did(buildings[b].id+"PT").textContent = beautify(buildings[b].ape)
             
    did(buildings[b].id+"T").textContent = buildings[b].a; // updates amount counter
       
    } 
}

function buyBuilding() {
    for (let b in buildings) {
    did(buildings[b].id+"B").addEventListener("click", function (){
         
    function priceFormula(x) {
    x = x * (Math.pow(growRate, buildings[b].a) - Math.pow(growRate,buildings[b].a + buyMultiplier)) / (1 - growRate);
    return x;
    }
        
//-------------------------------
        
 function buyingHandler(b){
    if ('pc' in buildings[b]){ // if building produces coins
        player.coins.second += buildings[b].pc * buildings[b].u * buyMultiplier;  
        }
    if ('pr' in buildings[b]){
        did("contadorRecursosSegundo").style.fontSize = "1vw"; 
        setTimeout(function () { did("contadorRecursosSegundo").style.fontSize = "0.8vw"; }, 50);
        player.resources.second += buildings[b].pr * buildings[b].u * buyMultiplier;  
        }
    if ('ps' in buildings[b]){
        did("contadorAlimentoSegundo").style.fontSize = "1vw"; 
        setTimeout(function () { did("contadorAlimentoSegundo").style.fontSize = "0.8vw"; }, 50);
        player.supplies.second += buildings[b].ps * buildings[b].u * buyMultiplier;  
        }
    if ('pe' in buildings[b]){
        did("contadorEnergiaSegundo").style.fontSize = "1vw"; 
        setTimeout(function () { did("contadorEnergiaSegundo").style.fontSize = "0.8vw"; }, 50);
        player.energy.second += buildings[b].pe * buildings[b].u * buyMultiplier;  
        }
    if ('s' in buildings[b]){
        did("contadorAlmacenamiento").style.fontSize = "1vw";
        did("contadorAlmacenamiento2").style.fontSize = "1vw"; 
        did("contadorAlmacenamiento3").style.fontSize = "1vw"; 
        setTimeout(function () { did("contadorAlmacenamiento").style.fontSize = "0.8vw"; did("contadorAlmacenamiento2").style.fontSize = "0.8vw"; did("contadorAlmacenamiento3").style.fontSize = "0.8vw"; }, 50);
        player.storage.amount += buildings[b].s * buildings[b].u * buyMultiplier;
        }
     } 
        
function buyingHandlerMax(b){
    switch(true) {
    case 'pc' in buildings[b]:
        player.coins.second += buildings[b].pc * buildings[b].u;
        break;
    case 'pr' in buildings[b]:
        player.resources.second += buildings[b].pr * buildings[b].u;
        break;
    case 'ps' in buildings[b]:
        player.supplies.second += buildings[b].ps * buildings[b].u;
        break;
    case 'pe' in buildings[b]:
        player.energy.second += buildings[b].pe * buildings[b].u;
        break;
    case 's' in buildings[b]:
        player.storage.amount += buildings[b].s * buildings[b].u;
        break;
}
     }         
 
 //-------------------------------
        
     function buildingCall () { //shared function when the building is bought
        buildings[b].a += buyMultiplier; //increases amount
        buyingHandler(b); //proceeds with the operation
        stats.totalBuildings += buyMultiplier; //increases statistics
        limitedAnimation.bind(did(buildings[b].id + "B"))("buyAnimation");
        updateBuildingUI(b); 
     }  
        
        function buildingCallMax () { //basically this calls more optimised duplicates, terribly optimised but not as bad as it could be
        buildings[b].a++; //increases amount
        buyingHandlerMax(b); //proceeds with the operation
        stats.totalBuildings++; //increases statistics
        updateBuildingUIMax(b); 
     }  
        
 //--------buying buildings-------
        
    
    
    if ('apc' in buildings[b]) { //if building costs coins
        if (player.coins.amount >= priceFormula(buildings[b].bpc)) { //if player can afford it   
        player.coins.amount -= buildings[b].apc; //deducts actual price
        buildings[b].apc = priceFormula(buildings[b].bpc); //updates actual price
        buildingCall();
        } else {limitedAnimation.bind(did(buildings[b].id + "B"))("noBuyAnimation");  return;}
       } 
        
     if ('apr' in buildings[b]) { //if building costs resources
        if (player.resources.amount >= priceFormula(buildings[b].bpr)) { 
        player.resources.amount -= buildings[b].apr; 
        buildings[b].apr = priceFormula(buildings[b].bpr); 
        buildingCall();
        } else {limitedAnimation.bind(did(buildings[b].id + "B"))("noBuyAnimation");  return;}
       } 
        
     if ('aps' in buildings[b]) { //if building costs supplies
        if (player.supplies.amount >= priceFormula(buildings[b].bps)) { 
        player.supplies.amount -= buildings[b].aps; 
        buildings[b].aps = priceFormula(buildings[b].bps); 
        buildingCall();
        } else {limitedAnimation.bind(did(buildings[b].id + "B"))("noBuyAnimation");  return;}
       }
        
     if ('ape' in buildings[b]) { //if building costs energy
        if (player.energy.amount >= priceFormula(buildings[b].bpe)) { 
        player.energy.amount -= buildings[b].ape; 
        buildings[b].ape = priceFormula(buildings[b].bpe); 
        buildingCall();
        } else {limitedAnimation.bind(did(buildings[b].id + "B"))("noBuyAnimation");  return;}
       }
     
     //BUY MAX     
     if (maxBuy === true) {         
     if ('apc' in buildings[b]) { //if building costs coins
        while (player.coins.amount >= priceFormula(buildings[b].bpc)) { //if player can afford it  
        player.coins.amount -= buildings[b].apc; //deducts actual price
        buildings[b].apc = priceFormula(buildings[b].bpc); //updates actual price
        buildingCallMax();}
       }

     if ('apr' in buildings[b]) { //if building costs resources
        while (player.resources.amount >= priceFormula(buildings[b].bpr)) { 
        player.resources.amount -= buildings[b].apr; 
        buildings[b].apr = priceFormula(buildings[b].bpr); 
        buildingCallMax();}
       }
         
     if ('aps' in buildings[b]) { //if building costs supplies
        while (player.supplies.amount >= priceFormula(buildings[b].bps)) { 
        player.supplies.amount -= buildings[b].aps; 
        buildings[b].aps = priceFormula(buildings[b].bps); 
        buildingCallMax();}
       }
         
     if ('ape' in buildings[b]) { //if building costs energy
        while (player.energy.amount >= priceFormula(buildings[b].bpe)) { 
        player.energy.amount -= buildings[b].ape; 
        buildings[b].ape = priceFormula(buildings[b].bpe); 
        buildingCallMax();}
        }   
     }   
         
    updateCounters();
            
})}};

buyBuilding();

//-------quantity selectors------

function quantitySelector(value, marked, deselect1, deselect2, deselect3, keyModifier, key){
    
    function ui(){ 
        
       
    maxBuy = false;
    did(marked).style.background = "#FD5151";
    did(deselect1).style.background = "#23232D";
    did(deselect2).style.background = "#23232D";   
    did(deselect3).style.background = "#23232D";  
    for (let b in buildings) { updateBuildingUI(b);}}
    
    did(marked).addEventListener("click", function () { buyMultiplier = value; ui() } )
    
    document.addEventListener(keyModifier, function (event) { 
    if (event.key === key && settings.currentCategory === "campContainer") { buyMultiplier = value; ui(); } })
    
}

quantitySelector(1, "buy1", "buy10", "buy100", "buyMax", "keyup", "Shift");
quantitySelector(1, "buy1", "buy10", "buy100", "buyMax", "keyup", "Control");
quantitySelector(1, "buy1", "buy10", "buy100", "buyMax", "keyup", "Alt");
quantitySelector(10, "buy10", "buy1", "buy100", "buyMax", "keydown", "Shift"); 
quantitySelector(100, "buy100", "buy1", "buy10", "buyMax", "keydown", "Control"); 
quantitySelector(1, "buyMax", "buy1", "buy100", "buy10", "keydown", "Alt"); 


did("buyMax").addEventListener("click", function () { maxBuy = true } )
document.addEventListener("keydown", function (event) { if (event.key === "Alt") maxBuy = true } )
did("buy1").addEventListener("click", function () { maxBuy = false } )
did("buy10").addEventListener("click", function () { maxBuy = false } )
did("buy100").addEventListener("click", function () { maxBuy = false } )


function hideBuildings() {
 for (let b in buildings) {
    if (buildings[b].v === 0) { did(buildings[b].id + "B").style.display = "none"; } // hide the element if v = 0
    else {
    did(buildings[b].id + "B").style.display = "flex"; // show the element if v = 1
    if (parseFloat(did(buildings[b].id + "B").style.opacity) === 1) { continue; } // check if element is already visible and skips
            
 fadeIn(did(buildings[b].id + "B")); }// Start the fade-in animation
  }      
}    

function fadeIn(x) {
    let opacity = 0;
    let increment = 0.05;
    x.style.opacity = "0";
    function showElement() {
        opacity += increment;
        x.style.opacity = opacity.toString();
        if (opacity >= 1) {  x.style.opacity = "1"; }
        else { requestAnimationFrame(showElement); }
    }       
  showElement();          
}        
//--------misc tooltips------

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


function tooltipDuckBuildings() {
 did('helpMultipliers').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex"
    //content related code   
    did("upperTooltip").style.display = 'none';
    did("tooltipDescription").textContent = 'You can also buy in bulk with the keys Shift, Cntrl and Alt!' ;
    did("tooltipFlavor").textContent = '';
    did("tooltipArrow").style.right = '45%';
    did('tooltipDescription').style.textAlign = 'center'; 
    did('tooltipImage').style.display = "none";
    //position related code
    did('tooltip').style.left = '55.2%';
    did('tooltip').style.top = '22%';
  });
    
    did('helpMultipliers').addEventListener('mouseleave', function () { //on mouseleave
    resetTooltip();
    });
  }
tooltipDuckBuildings();

function tooltipCoins() {
 did('iconoMoneda').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex"
    //content related code   
    did("tooltipName").textContent = 'Turtle Coin';
    did("tooltipPrice").innerHTML = "";
    did("tooltipRarity").textContent = "Common";
    did("tooltipRarity").style.color = "white";               
    did("tooltipName").style.color = "white";               
    did("tooltipDescription").innerHTML = 'A round currency made of solid gold, imprinted with the stamp of a turtle.<br>Every turtle of every kingdom abides Its value.';
    did("tooltipFlavor").textContent = '"Some turtles will do anything for a few of these Ill tell ya."';
    did('tooltipImage').src = "img/sys/coin.png";     
    did("tooltipArrow").style.right = '91%';
    //position related code
    did('tooltip').style.left = '0.5%';
    did('tooltip').style.bottom = '38%';
  });
    
    did('iconoMoneda').addEventListener('mouseleave', function () { //on mouseleave
    resetTooltip();
    });
  }
tooltipCoins();

function tooltipResources() {
 did('resourcesIcon').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex"
    //content related code   
    did("tooltipName").textContent = 'Resources';
    did("tooltipPrice").innerHTML = "";
    did("tooltipRarity").textContent = "Common";
    did("tooltipRarity").style.color = "white";               
    did("tooltipName").style.color = "white";               
    did("tooltipDescription").innerHTML = 'Materials of all kinds used primarily for construction.';
    did("tooltipFlavor").textContent = '';
    did('tooltipImage').src = "img/sys/resources.png";     
    did("tooltipArrow").style.right = '91%';
    //position related code
    did('tooltip').style.top = '3.5%';
    did('tooltip').style.left = '25.55%';
  });
    
    did('resourcesIcon').addEventListener('mouseleave', function () { //on mouseleave
    resetTooltip();
    });
  }
tooltipResources();

function tooltipSupplies() {
 did('suppliesIcon').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex"
    //content related code   
    did("tooltipName").textContent = 'Resources';
    did("tooltipPrice").innerHTML = "";
    did("tooltipRarity").textContent = "Common";
    did("tooltipRarity").style.color = "white";               
    did("tooltipName").style.color = "white";               
    did("tooltipDescription").innerHTML = 'Supplies necessary for sustaining your turtles.';
    did("tooltipFlavor").textContent = '';
    did('tooltipImage').src = "img/sys/food.png";     
    did("tooltipArrow").style.right = '91%';
    //position related code
    did('tooltip').style.top = '5%';
    did('tooltip').style.left = '42.9%';
  });
    
    did('suppliesIcon').addEventListener('mouseleave', function () { //on mouseleave
    resetTooltip();
    });
  }
tooltipSupplies();

function tooltipMagic() {
 did('magicIcon').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex"
    //content related code   
    did("tooltipName").textContent = 'Magic';
    did("tooltipPrice").innerHTML = "";
    did("tooltipRarity").textContent = "Uncommon";
    did("tooltipRarity").style.color = "#1eff00";               
    did("tooltipName").style.color = "#1eff00";               
    did("tooltipDescription").innerHTML = 'Concentrated magic essence, highly volatile';
    did("tooltipFlavor").textContent = '"The reason many kingdoms fell. Will yours be different, or...?"';
    did('tooltipImage').src = "img/sys/energy.png";     
    did("tooltipArrow").style.right = '91%';
    //position related code
    did('tooltip').style.top = '1.2%';
    did('tooltip').style.left = '60%';
  });
    
    did('magicIcon').addEventListener('mouseleave', function () { //on mouseleave
    resetTooltip();
    });
  }
tooltipMagic();


 
//----------------------==========================-----------------------
//----------------------=========UPGRADES=========-----------------------
//----------------------==========================-----------------------
//see upgrades.js
//-------category panels------

function UpgradePanelHandler(x,y) { //contracts and expands categories
   did(y).addEventListener("click", function () {
    if (did(x).clientHeight > 0) {did(x).style.maxHeight = "0"; did(x).style.padding = "0"; did(y).style.transform = "rotateX(180deg)"; }
    else {did(x).style.maxHeight = "100%"; did(x).style.padding = "2%"; did(y).style.transform = "rotateX(0deg)";} });
}

UpgradePanelHandler("panelMUnicas","contrerUnicas")
UpgradePanelHandler("panelMComunes","contrerComunes")

//----creation of upgrades---

    
setInterval(function() { if (settings.currentCategory === "campContainer") { createUpgrade(); } }, 1000);

function createUpgrade() {
   for (let u in upgrades) {
   if (!did(upgrades[u].id+"upgrade")) { //if it doesnt exist yet 
       
   if (stats.totalCoins >= (upgrades[u].price * 0.6) && upgrades[u].unlocked === 1 && upgrades[u].bought === 0) { 
       
    const divMejora = document.createElement('div');
    divMejora.id = upgrades[u].id+"upgrade";  
    divMejora.innerHTML = '<img src = "img/src/upgrades/'+upgrades[u].id+'.png">';
    divMejora.style.opacity = '0';
    divMejora.style.filter = 'brightness(0.2)';
    //assign a category depending on the tag      
    if (upgrades[u].permanent === 0) {did('panelMComunes').appendChild(divMejora); divMejora.className = 'mejoraComunSlot'} else {did('panelMUnicas').appendChild(divMejora); divMejora.className = 'mejoraUnicaSlot';}
    if (upgrades[u].rarity === "Common") divMejora.style.border = 'white solid 1px';
    if (upgrades[u].rarity === "Uncommon") divMejora.style.border = '#1eff00 solid 1px';
    if (upgrades[u].rarity === "Rare") divMejora.style.border = '#0070dd solid 1px'; 
    if (upgrades[u].rarity === "Epic") divMejora.style.border = '#a335ee solid 1px'; 
    if (upgrades[u].rarity === "Legendary") divMejora.style.border = '#ff8000 solid 1px'; 
    if (upgrades[u].rarity === "Relic") divMejora.style.border = '#e6cc80 solid 1px'; 
        
    //fade in on creation     
    setTimeout(function () { divMejora.style.opacity = '1'; }, 100); 
    tooltipUpgrades();
    buyUpgrades();
       
    }} else {
    if (did(upgrades[u].id+"upgrade")) {
    did(upgrades[u].id+"upgrade").style.filter = 'brightness(' + (player.coins.amount >= upgrades[u].price ? '1' : '0.2') + ')'; }
    }
       
    //controls bought updates and places them in statistics panel 
    if (upgrades[u].bought === 1 && !did(upgrades[u].id+"upgrade")) {
    const divMejora = document.createElement('div');
    divMejora.id = upgrades[u].id+"upgrade";  
    divMejora.innerHTML = '<img src = "img/src/upgrades/'+upgrades[u].id+'.png">';
    did('boughtUpgrades').appendChild(divMejora);
    if (upgrades[u].permanent === 0) {divMejora.className = 'mejoraComunSlot'} else {divMejora.className = 'mejoraUnicaSlot';}
    }     
    }   
};
createUpgrade();

//---tooltips of upgrades---



function tooltipUpgrades() {
  for (let u in upgrades) {  
    if (did(upgrades[u].id+"upgrade")) {
    did(upgrades[u].id+"upgrade").addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex";
    const coin = '<img src="img/sys/Coin.png">';
    did("tooltipName").textContent = upgrades[u].name;
    did("tooltipPrice").innerHTML = beautify(upgrades[u].price) + coin;
    did("tooltipRarity").textContent = upgrades[u].rarity;
    if (upgrades[u].rarity === "Common") {did("tooltipRarity").style.color = "white";did("tooltipName").style.color = "white"; }
    if (upgrades[u].rarity === "Uncommon") {did("tooltipRarity").style.color = "#1eff00";did("tooltipName").style.color = "#1eff00";}
    if (upgrades[u].rarity === "Rare") {did("tooltipRarity").style.color = "#0070dd";did("tooltipName").style.color = "#0070dd"}
    if (upgrades[u].rarity === "Epic") {did("tooltipRarity").style.color = "#a335ee";did("tooltipName").style.color = "#a335ee"}
    if (upgrades[u].rarity === "Legendary") {did("tooltipRarity").style.color = "#ff8000";did("tooltipName").style.color = "#ff8000"}
    if (upgrades[u].rarity === "Relic") {did("tooltipRarity").style.color = "#e6cc80";did("tooltipName").style.color = "#e6cc80"}
    did("tooltipDescription").innerHTML = upgrades[u].description;
    did("tooltipFlavor").textContent = upgrades[u].flavor;
    did('tooltipImage').src = "img/src/upgrades/"+upgrades[u].id+".png";     
    //position related code
    const movingDiv = did('tooltip');
    const referenceDiv = did(upgrades[u].id+"upgrade");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 26;
    const referenceTop = referenceRect.top - 15;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
    //changes color of price
    if (player.coins.amount >= upgrades[u].price)
    { did('tooltipPrice').style.color = "#7EFF69"; } 
    else { did('tooltipPrice').style.color = "coral"; };
        
  });
    did(upgrades[u].id+"upgrade").addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }}
}
tooltipUpgrades();


//-----buying upgrades----

function buyUpgrades() {
  for (let u in upgrades) {
      
    if (did(upgrades[u].id+"upgrade")) {
    did(upgrades[u].id+"upgrade").addEventListener('click', function () {
    if (player.coins.amount >= upgrades[u].price && upgrades[u].bought === 0) {
        player.coins.amount -= upgrades[u].price;
        updateCounters();
        createUpgrade();
        limitedAnimation.bind(did(upgrades[u].id+"upgrade"))("buyUpgradeAnimation");
        setTimeout(function () {
            eval(upgrades[u].o);
            hideBuildings();
            for (let b in buildings) {updateBuildingUI(b)}
            did('boughtUpgrades').appendChild(document.getElementById(upgrades[u].id+"upgrade")); //moves it to bought upgrades list
            }, 110);
        stats.totalUpgrades++;
        upgrades[u].bought = 1;
    } else limitedAnimation.bind(did(upgrades[u].id+"upgrade"))("noBuyAnimation");
    })
    }
  }
}
buyUpgrades();


//----------------------==========================-----------------------
//----------------------=======ACHIEVEMENTS=======-----------------------
//----------------------==========================-----------------------

function createAchievement() {
   for (let a in achievements) {
   if (!did(achievements[a].id)) { //if it doesnt exist yet 

    const divMejora = document.createElement('div');
    divMejora.id = achievements[a].id; 
       
    if(achievements[a].u === 1){ divMejora.innerHTML = '<img src = "img/src/achievement/'+achievements[a].id+'.png">'; }
    if(achievements[a].u === 0){ divMejora.innerHTML = '<img src = "img/src/achievement/locked.png">'; }   
    //assign a category depending on the tag      
    if (achievements[a].t === "Achievement") did('achievementList').appendChild(divMejora);
    if (achievements[a].t === "Secret Achievement") did('achievementList2').appendChild(divMejora);   
    divMejora.className = 'achievementSlot';}
     
    achievements[a].flag = 0; //flag for achievement popup   
       
    }
} createAchievement();

function AchievementCheck(){
    for (let a in achievements) {
    //no idea why i need to individually check them, but if i dont, it doesnt work    
    if (achievements[a].t === "Achievement"){ //this assigns a specific id to the image and checks if it exists to prevent calling after unlocking
    if(achievements[a].u === 1 && !did(achievements[a].id+"i")){ did(achievements[a].id).innerHTML = '<img id='+achievements[a].id+'i src = "img/src/achievement/'+achievements[a].id+'.png">'}} 
    if (achievements[a].t === "Secret Achievement"){
    if(achievements[a].u === 1 && !did(achievements[a].id+"i")){ did(achievements[a].id).innerHTML = '<img id='+achievements[a].id+'i src = "img/src/achievement/'+achievements[a].id+'.png">'}}
        
    if (achievements[a].u === 0) eval(achievements[a].uc);
    if (achievements[a].u === 1 && achievements[a].flag === 0)  {
 
   achievements[a].flag = 1;
   stats.totalAchievementsGot++;    
   did("achievementName").textContent = achievements[a].n;
   did("achievementPopup").style.display = "flex";
   did("achievementPopup").style.animation = "none";
   void did("achievementPopup").offsetWidth;//borrar probs
   did("achievementPopup").style.animation = "achievementUnlock 3s ease-in";
   setTimeout(function () { did("achievementPopup").style.display = "none";}, 2500);      
   }  
    
    did('totalAchievements').textContent = Object.keys(achievements).length; 
    did("totalAchievementsGot").textContent = stats.totalAchievementsGot;
    did("totalAchievementCompletition").textContent = "["+beautify(stats.totalAchievementsGot / Object.keys(achievements).length * 100)+"%]";    
    
    }
}

function unlockAllAchievements(){
    for (let a in achievements) { achievements[a].u = 1}
}

//---tooltips of achievements---

function tooltipAchievements() {
  for (let a in achievements) {
        

    did(achievements[a].id).addEventListener('mouseenter', function () { //on mouseenter
    did('tooltipMejora').style.display = "flex";
        
    if (achievements[a].u === 1) { //what to display if the achievement is unlocked   
    //content related code   
    did("mejoraNombre").textContent = achievements[a].n;
    did("mejoraPrecio").innerHTML = "";
    did("mejoraTag").textContent = achievements[a].t;
    //assigns tag color    
    did("mejoraTag").className = 'mejoraTagU';
        
    did("mejoraDescripcion").textContent = achievements[a].d;
    did("mejoraFlavor").textContent = achievements[a].f;
    } 
        
    if (achievements[a].u === 0) { // if the achievement is locked   
    //content related code   
    did("mejoraNombre").textContent = "";
    did("mejoraPrecio").innerHTML = "";
    did("upgradeSeparator").style.display = 'none'    
    did("mejoraTag").textContent = "Locked Achievement";
    did("mejoraTag").className = 'mejoraTagB';    
    did("mejoraDescripcion").textContent = "";
    if (achievements[a].t === "Secret Achievement") did("mejoraFlavor").textContent = achievements[a].st;
    else did("mejoraFlavor").textContent = "Peraphs in the future...?";
    }
        
        
    did("tooltipArrow").style.marginRight = '10.5%';
    did("tooltipArrowUp").style.display = 'none';
    did("tooltipArrow").style.display = 'flex';  
        
    //position related code    
    const movingDiv = did('tooltipMejora');
    const referenceDiv = did(achievements[a].id);
        
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 22;
    const referenceTop = referenceRect.top - 15;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
        
   
  });
    did(achievements[a].id).addEventListener('mouseleave', function () { //on mouseleave
    did('tooltipMejora').style.display = "none";
    did("upgradeSeparator").style.display = 'flex'        
    });
  }
}
tooltipAchievements();

//----------------------==========================-----------------------
//----------------------==========TREATIES========-----------------------
//----------------------==========================-----------------------

function createTreaties() {
   for (let t in treaties) {
   if (!did(treaties[t].id+"treaty")) { //if it doesnt exist yet 

    const divMejora = document.createElement('div');
    divMejora.id = treaties[t].id+"treaty"; 
       
    divMejora.innerHTML = '<img src = "img/src/treaties/'+treaties[t].id+'.png">'; 
    did('treatiesList').appendChild(divMejora);
    divMejora.className = 'treatySlot';}
    }
} createTreaties();

function tooltipTreaties() {
  for (let t in treaties) {
        
    //for the treaties in their category
    did(treaties[t].id+"treaty").addEventListener('mouseenter', function () { //on mouseenter
    did('tooltipMejora').style.display = "flex";
          
    //content related code   
    did("mejoraNombre").textContent = treaties[t].n;
    did('mejoraPrecio').style.color = "#7EFF69";    
    did("mejoraPrecio").innerHTML = '[Rank '+treaties[t].r+' ]';
    did("mejoraTag").textContent = 'Treaty';
    did("mejoraTag").className = 'mejoraTagL';
    did("mejoraDescripcion").innerHTML = '<FONT COLOR="#edd585">'+treaties[t].d;
    
    did("mejoraFlavor").textContent = '';
    
        
        
    did("tooltipArrow").style.marginRight = '10.5%';
    did("tooltipArrowUp").style.display = 'none';
    did("tooltipArrow").style.display = 'flex';  
        
    //position related code    
    const movingDiv = did('tooltipMejora');
    const referenceDiv = did(treaties[t].id+"treaty");
        
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 28;
    const referenceTop = referenceRect.top - 15;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
        
   
  });
    did(treaties[t].id+"treaty").addEventListener('mouseleave', function () { //on mouseleave
    did('tooltipMejora').style.display = "none";
    did("upgradeSeparator").style.display = 'flex';        
    });
     
    //for the minitreaty
    did('currentTreaty').addEventListener('mouseenter', function () { //on mouseenter
    
    if (treaties[t] && treaties[t].a === 1) {    
        
    did('tooltipMejora').style.display = "flex";
          
    //content related code   
    did("mejoraNombre").textContent = treaties[t].n;
    did("mejoraPrecio").innerHTML = '[Rank '+treaties[t].r+' ]';
    did("mejoraTag").textContent = 'Treaty';
    did("mejoraTag").className = 'mejoraTagL';
        
    did("mejoraDescripcion").innerHTML = '<FONT COLOR="#edd585">'+treaties[t].d;
    
    did("mejoraFlavor").textContent = '';
    
        
        
    did("tooltipArrow").style.marginRight = '90%';
    did("tooltipArrowUp").style.display = 'none';
    did("tooltipArrow").style.display = 'flex';  
        
    //position related code
    did('tooltipMejora').style.top = '';
    did('tooltipMejora').style.right = '';    
    did('tooltipMejora').style.left = '0.5%';
    did('tooltipMejora').style.bottom = '8%';
    }
   
  });
    did('currentTreaty').addEventListener('mouseleave', function () { //on mouseleave
    did('tooltipMejora').style.display = "none";
    did("upgradeSeparator").style.display = 'flex';
    did('tooltipMejora').style.left = '';
    did('tooltipMejora').style.bottom = '';
    });    
  }
}tooltipTreaties();

const treatyID = ["tr1treaty","tr2treaty","tr3treaty"];

function selectTreaty() {
  for (let t in treaties) {
    if (did(treaties[t].id+"treaty")) {
    did(treaties[t].id+"treaty").addEventListener('click', function () {
        
        if (timers.treatyCD === 0 && stats.ableToSign === 1){
        treaties['tr1'].a = 0;
        treaties['tr2'].a = 0;
        treaties['tr3'].a = 0;
        treaties[t].a = 1; //marks the treaty active
            
        treatyID.forEach(function(id) { if (did(id)) did(id).style.filter ="none" }); //removes the selection from others
        did(treaties[t].id+"treaty").style.filter ="hue-rotate(200deg)"; //applies the selection to the one selected
            
        did("signButton").style.color ="white";
        }
    }) 
   }
          
     did("signButton").addEventListener('click', function () {
        if (treaties[t].a === 1 && stats.ableToSign === 1){ //if one treaty has been marked as active
        
        eval(treaties[t].o);    
        timers.treatyCD = 3600;
        did("signButton").style.color ="gray";
        var minutes = Math.floor(timers.treatyCD / 60);
        var seconds = timers.treatyCD % 60;
        did("signButton").textContent =  minutes + "m " + seconds + "s";  
         
        treatyID.forEach(function(id) { if (did(id)) did(id).style.filter ="none" }); //fade out animation except the selected one
        treatyID.forEach(function(id) { if (did(id)) did(id).style.animation ="shrinkFadeOut 0.5s" });
        did(treaties[t].id+"treaty").style.animation = "none";
        
        setTimeout(function () { //hides them except the selected one
        treatyID.forEach(function(id) { if (did(id)) did(id).style.display ="none" });   
        did(treaties[t].id+"treaty").style.display = "flex";
        }, 500);
            }
            
        if (did("signButton").textContent === "revoke treaty"){
        stats.ableToSign = 1    
        stats.activeTreaty = "none";
        switchTurtle();    
        did("signButton").textContent = "SIGN";
        did("signButton").style.color ="white";
        treaties['tr1'].a = 0;
        treaties['tr2'].a = 0;
        treaties['tr3'].a = 0;
        treatyID.forEach(function(id) { if (did(id)) did(id).style.animation ="growFadeIn 0.5s" });
        treatyID.forEach(function(id) { if (did(id)) did(id).style.display ="flex" });    
    }
        })
  }
}selectTreaty();

function switchTreaty(x) {
    stats.activeTreaty = x;
    did("tortugaClick").classList.add("flash-animation");
    did("sparkleFX").style.display = "flex";
    did("sparkleFX").src = "";
    did("sparkleFX").src = "img/sys/sparkle.gif";
    setTimeout(function () { did("tortugaClick").classList.remove("flash-animation"); did("sparkleFX").style.display = "none" }, 1500);
    switchTurtle();
};

function switchTurtle() {
    if (stats.activeTreaty === "resources"){
        did("tortugaClick").src = "img/src/turtles/resources.png";
        did("currentTreaty").innerHTML = '<img src="img/src/treaties/tr1.png" >';
        treatyID.forEach(function(id) { if (did(id)) did(id).style.display ="none" }); 
        did('tr1treaty').style.display ="flex";
    }
    if (stats.activeTreaty === "supplies") {
        did("tortugaClick").src = "img/src/turtles/supplies.png";
        did("currentTreaty").innerHTML = '<img src="img/src/treaties/tr2.png" >';
        treatyID.forEach(function(id) { if (did(id)) did(id).style.display ="none" }); 
        did('tr2treaty').style.display ="flex";
    }    
    if (stats.activeTreaty === "energy") {
        did("tortugaClick").src = "img/src/turtles/energy.png";
        did("currentTreaty").innerHTML = '<img src="img/src/treaties/tr3.png" >';
        treatyID.forEach(function(id) { if (did(id)) did(id).style.display ="none" }); 
        did('tr3treaty').style.display ="flex";
        
    }
    if (stats.activeTreaty === "none") {
        did("tortugaClick").src = "img/src/tortugasdefault/img1.png";
        did("currentTreaty").innerHTML = '';
    }
}

setInterval(function() { if (settings.currentCategory === "townshipContainer") { signCD(); } }, 1000);

function signCD(){
    if (timers.treatyCD > 0){
        stats.ableToSign = 0;
        var minutes = Math.floor(timers.treatyCD / 60);
        var seconds = timers.treatyCD % 60;
        did("signButton").textContent =  minutes + "m " + seconds + "s";
    }
    
    if (timers.treatyCD === 0 && stats.activeTreaty !== "none"){
       did("signButton").textContent =  "revoke treaty";
       did("signButton").style.color ="white";
    }   
}
setInterval(treatyEffects, 1000);

function treatyEffects(){
    
    if(stats.activeTreaty === "resources"){ 
         
    stats.totalResources += (player.resources.second * player.resources.upgrades) + ((player.supplies.second * player.supplies.upgrades) / 2 ) + ((player.energy.second * player.energy.upgrades) / 2);
    stats.totalSupplies += (player.supplies.second * player.supplies.upgrades) / 2; 
    stats.totalEnergy += (player.energy.second * player.energy.upgrades) / 2; 
         
    player.resources.amount += (player.resources.second * player.resources.upgrades) + ((player.supplies.second * player.supplies.upgrades) / 2 ) + ((player.energy.second * player.energy.upgrades) / 2);
         
    player.supplies.amount += (player.supplies.second * player.supplies.upgrades) / 2 ;
    player.energy.amount += (player.energy.second * player.energy.upgrades) / 2;
         
    stats.totalCoins += player.coins.second * player.coins.upgrades;    
    player.coins.amount += player.coins.second * player.coins.upgrades;
    
    did("contadorRecursosSegundo").textContent = "(+" + beautify((player.resources.second * player.resources.upgrades) + ((player.supplies.second * player.supplies.upgrades) / 2 ) + ((player.energy.second * player.energy.upgrades) / 2)) + " s)";
         
    did("contadorAlimentoSegundo").textContent = "(+" + beautify((player.supplies.second * player.supplies.upgrades) / 2 ) + " s)";
    did("contadorEnergiaSegundo").textContent = "(+" + beautify((player.energy.second * player.energy.upgrades) / 2) + " s)";     
    did("contadorMonedasSegundo").textContent = beautify(player.coins.second * player.coins.upgrades) + " /s";    
    }  
    
    if(stats.activeTreaty === "supplies"){ 
         
    stats.totalSupplies += (player.supplies.second * player.supplies.upgrades) + ((player.resources.second * player.resources.upgrades) / 2 ) + ((player.energy.second * player.energy.upgrades) / 2);
    stats.totalResources += (player.resources.second * player.resources.upgrades) / 2; 
    stats.totalEnergy += (player.energy.second * player.energy.upgrades) / 2; 
         
    player.supplies.amount += (player.supplies.second * player.supplies.upgrades) + ((player.resources.second * player.resources.upgrades) / 2 ) + ((player.energy.second * player.energy.upgrades) / 2);
         
    player.resources.amount += (player.resources.second * player.resources.upgrades) / 2 ;
    player.energy.amount += (player.energy.second * player.energy.upgrades) / 2;
         
    stats.totalCoins += player.coins.second * player.coins.upgrades;    
    player.coins.amount += player.coins.second * player.coins.upgrades;
    
    did("contadorAlimentoSegundo").textContent = "(+" + beautify((player.supplies.second * player.supplies.upgrades) + ((player.resources.second * player.resources.upgrades) / 2 ) + ((player.energy.second * player.energy.upgrades) / 2)) + " s)";
         
    did("contadorRecursosSegundo").textContent = "(+" + beautify((player.resources.second * player.resources.upgrades) / 2 ) + " s)";
    did("contadorEnergiaSegundo").textContent = "(+" + beautify((player.energy.second * player.energy.upgrades) / 2) + " s)";     
    did("contadorMonedasSegundo").textContent = beautify(player.coins.second * player.coins.upgrades) + " /s";    
    }  
    
    if(stats.activeTreaty === "energy"){ 
         
    stats.totalEnergy += (player.energy.second * player.energy.upgrades) + ((player.supplies.second * player.supplies.upgrades) / 2 ) + ((player.resources.second * player.resources.upgrades) / 2);
    stats.totalSupplies += (player.supplies.second * player.supplies.upgrades) / 2; 
    stats.totalResources += (player.resources.second * player.resources.upgrades) / 2; 
         
    player.energy.amount += (player.energy.second * player.energy.upgrades) + ((player.supplies.second * player.supplies.upgrades) / 2 ) + ((player.resources.second * player.resources.upgrades) / 2);
         
    player.supplies.amount += (player.supplies.second * player.supplies.upgrades) / 2 ;
    player.resources.amount += (player.resources.second * player.resources.upgrades) / 2;
         
    stats.totalCoins += player.coins.second * player.coins.upgrades;    
    player.coins.amount += player.coins.second * player.coins.upgrades;
    
    did("contadorEnergiaSegundo").textContent = "(+" + beautify((player.energy.second * player.energy.upgrades) + ((player.supplies.second * player.supplies.upgrades) / 2 ) + ((player.resources.second * player.resources.upgrades) / 2)) + " s)";
         
    did("contadorAlimentoSegundo").textContent = "(+" + beautify((player.supplies.second * player.supplies.upgrades) / 2 ) + " s)";
    did("contadorRecursosSegundo").textContent = "(+" + beautify((player.resources.second * player.resources.upgrades) / 2) + " s)";     
    did("contadorMonedasSegundo").textContent = beautify(player.coins.second * player.coins.upgrades) + " /s";    
    }  
    
}

VanillaTilt.init(document.querySelectorAll(".treatySlot"), {
		max: 30,
		speed: 600,
        perspective: 100,
    reverse:true,
    scale: 1.2
    
    
	});
  
//----------------------==========================-----------------------
//----------------------=======JESTER TURTLES=====-----------------------
//----------------------==========================-----------------------

//7 = instant 30% of total coins // 77 = instant 70% of total coins // 777 = instant 230% of total coins // 7777 = instant 777% of total coins
//click = click upgrades * 10 //superClick = click upgrades * 300 // frenzy = coins upgrades * 3 // superFrenzy = coin upgrades * 10
// w = weight, t = timer (default duration, change this with upgrades), a = active? // f = flag of being active, used to prevent multipliers stacking after saving
var jesterEffects = { "7": {n: 'Lucky 7!', d: 'Always nice to see!',w: 0.3, a:0, o: 'jesterLucky(0.7)'}, "77": {n: 'Lucky 77!', d: 'High roller!',w: 0.10, a:0, o: 'jesterLucky(7)'}, "777": {n: 'Lucky 777!', d: 'Winner Winner Chicken Dinner!',w: 0.05, a:0, o: 'jesterLucky(777)'}, "7777": {n: "All Lucky 7's!", d: "777777777", w: 0.01, a:0, o: 'jesterLucky(7777)'}, "click": {id:'click',n: "Finger of the Mountain", d: "Boosted clicking power by x10!",w: 10.05, a:0, o:'timers.click += jesterEffects.click.t', t:20, f:0}, "superClick": {id:'superClick',n: "Elemental Finger", d: "Boosted clicking power by x100!",w: 10.05, a:0, o:'timers.superClick += jesterEffects.superClick.t', t:10, f:0}, "frenzy": {id:'frenzy',n: "Turtle Heroism", d: "Boosted coin production by x3!",w: 10.2, a:0, o:'timers.frenzy += jesterEffects.frenzy.t', t:11, f:0}, "superFrenzy": {id:'superFrenzy',n: "Turtle Rage", d: "Boosted coin production by x100!",w: 10.05, a:0, o:'timers.superFrenzy += jesterEffects.superFrenzy.t', t:10, f:0} };

//meter efecto dentro en forma de funcion, tiempo es innecesario porque va en la funcion, effectlucky, effectfrenzy, etc meter t en timers


did("jesterTurtle").addEventListener('click', function () {
    
    did("jesterTurtle").style.pointerEvents="none";//to prevent multiclicking
    did("jesterTurtle").style.opacity="0";
    did("jesterTurtle").style.scale="1.2";
    
    //spark effect
    var spark = document.createElement('div');
    spark.className = 'dynamicSpark';
    spark.style.left = (event.clientX + (window.scrollX || window.pageXOffset) - 50) + 'px';
    spark.style.top = (event.clientY + (window.scrollY || window.pageYOffset) - 50) + 'px';
    spark.innerHTML = '<img src="img/sys/sparkle.gif">'; 
    document.body.appendChild(spark);
    setTimeout(function () { spark.remove(); }, 1000);
    
    //floating text
    var text = document.createElement('div');
    text.className = 'textoClick';
    text.style.left = (event.clientX + (window.scrollX || window.pageXOffset) - 40) + 'px';
    text.style.top = (event.clientY + (window.scrollY || window.pageYOffset) - 40) + 'px';
    
    
    document.body.appendChild(text);
    setTimeout(function () { text.remove(); }, 490); 
    
    
     // Calculate the total weight of all effects
    var totalWeight = 0;
    for (let effect in jesterEffects) {
        totalWeight += jesterEffects[effect].w;
    }

    // Generate a random number between 0 and the total weight
    var randomWeight = Math.random() * totalWeight;

    // Find the effect based on the random weight
    var selectedEffect;
    for (let effect in jesterEffects) {
        if (randomWeight < jesterEffects[effect].w) {
            selectedEffect = effect;
            break;
        }
        randomWeight -= jesterEffects[effect].w;
    }

    // Set "a" to 1 in the selected effect
    jesterEffects[selectedEffect].a = 1;
        
    for (let effect in jesterEffects) {
        if (jesterEffects[effect].a === 1){ 
            eval(jesterEffects[effect].o)
            jesterEffects[effect].a = 0;
            if (timers.frenzy === jesterEffects.frenzy.t) jesterEffects.frenzy.f = 1; //only triggers if the timer has the initial duration, prone to bugs, cope
            if (timers.superFrenzy === jesterEffects.superFrenzy.t) jesterEffects.superFrenzy.f = 1;
            text.innerHTML = '<p>' + jesterEffects[effect].n + '</p>'; 
        }
    }
    
    
});

function jesterLucky(x){
    player.coins.amount += ((player.coins.amount) * x) + 10;
    stats.totalCoins += ((player.coins.amount) * x) + 10;
}


setInterval(function() { if (timers.frenzy > 0) { frenzyTimer(); } }, 1000);
setInterval(function() { if (timers.superFrenzy > 0) { superFrenzyTimer(); } }, 1000);


function frenzyTimer(){
    
    if (!did("frenzy")){
    var c = document.createElement('div');
    c.id = "frenzySlot"
    c.className = 'buffSlot';
    c.innerHTML = '<div id="frenzy" class="buffTimer"></div> <img src="img/sys/heroism.png">'; 
    did("buffWrapper").appendChild(c);
    buffTooltips();    
    } 
    
    if (jesterEffects.frenzy.f === 1) player.coins.upgrades += 7.77; jesterEffects.frenzy.f = 0;
    
    var math = 1 - (timers.frenzy / jesterEffects.frenzy.t);
    did("frenzy").style.transform = "scaleY(" + Math.max(math,0) + ")";
    if (timers.frenzy === 1) {did("frenzySlot").remove(); did('tooltipMejora').style.display = "none"; did("tooltipMejora").style.background = "linear-gradient(335deg, #464052 0%, #333140 43.75%, #31313D 100%)"; jesterEffects.frenzy.f = 0; player.coins.upgrades -= 7.77;}
}

function superFrenzyTimer(){
    
    if (!did("superFrenzy")){
    var c = document.createElement('div');
    c.id = "superFrenzySlot"
    c.className = 'buffSlot';
    c.innerHTML = '<div id="superFrenzy" class="buffTimer"></div> <img src="img/src/mejoras/am2.png">'; 
    did("buffWrapper").appendChild(c);
    buffTooltips();    
    } 
    
    if (jesterEffects.superFrenzy.f === 1) player.coins.upgrades += 7.77; jesterEffects.superFrenzy.f = 0;
    
    var math = 1 - (timers.superFrenzy / jesterEffects.superFrenzy.t);
    did("superFrenzy").style.transform = "scaleY(" + Math.max(math,0) + ")";
    if (timers.superFrenzy === 1) {did("superFrenzySlot").remove(); did('tooltipMejora').style.display = "none"; did("tooltipMejora").style.background = "linear-gradient(335deg, #464052 0%, #333140 43.75%, #31313D 100%)"; jesterEffects.superFrenzy.f = 0; player.coins.upgrades -= 7.77;}
}


    
function buffTooltips() {
  for (let j in jesterEffects) {
        
      if (did(jesterEffects[j].id)){
    did(jesterEffects[j].id+"Slot").addEventListener('mouseenter', function () { //on mouseenter
    did("tooltipMejora").style.display = "flex";
        
    if (jesterEffects[j].t > 0) { 
    did("mejoraNombre").textContent = jesterEffects[j].n;
    if (jesterEffects[j].id === "frenzy") did("mejoraPrecio").innerHTML = timers.frenzy+'s left';
    if (jesterEffects[j].id === "superFrenzy") did("mejoraPrecio").innerHTML = timers.superFrenzy+'s left';    
    did("mejoraTag").style.display = "none"
    did("tooltipMejora").style.background = "linear-gradient(180deg, rgba(79,70,63,1) 58%, rgba(163,124,39,1) 100%)"
    

    did("mejoraDescripcion").textContent = jesterEffects[j].d;
    did("mejoraFlavor").textContent = "";
    } 
        
        
    did("tooltipArrow").style.marginRight = '90.5%';
    did("tooltipArrowUp").style.display = 'none';
    did("tooltipArrow").style.display = 'flex';  
        
    //position related code    
    const movingDiv = did('tooltipMejora');
    const referenceDiv = did(jesterEffects[j].id);
        
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceTop = referenceRect.top - 18;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = '0.5%';
    movingDiv.style.top = newTop + 'px';
        
   
  });
    did(jesterEffects[j].id+"Slot").addEventListener('mouseleave', function () { //on mouseleave
    did("tooltipMejora").style.background = "linear-gradient(335deg, #464052 0%, #333140 43.75%, #31313D 100%)"    
    did('tooltipMejora').style.display = "none";
    did("upgradeSeparator").style.display = 'flex'        
    });
      
  }    
  }
}
buffTooltips();


//----------------------==========================-----------------------
//----------------------==========SETTINGS========-----------------------
//----------------------==========================-----------------------

//-----pannel buttons-----

var settings = {
    disableClickText: 0, disableAutosave: 0, disablePenguinRecap: 0, currentCategory: "rpgContainer",
};

//-----category button on the left----- (weird placement but oh well)

const tabs = ["campTab","achievementsTab","townshipTab", "rpgTab"];
const containers = ["achievementContainer","campContainer", "townshipContainer", "rpgContainer"]
const titles =["campTitle", "achievementsTitle", "townshipTitle", "rpgTitle"];


function tabSwitch(x,y,z) {
did(x).addEventListener("click", function () {
    
    if (!did(x).classList.contains("botonLateralActivo")){

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
    
settings.currentCategory = y;
}   
    
})};

tabSwitch ("campTab", "campContainer", "campTitle");
tabSwitch ("achievementsTab", "achievementContainer", "achievementsTitle");
tabSwitch ("townshipTab", "townshipContainer", "townshipTitle");
tabSwitch ("rpgTab", "rpgContainer", "rpgTitle");


function rememberCategory(){
    
   did(settings.currentCategory).style.display = "flex"
    
   if (settings.currentCategory === "campContainer") {did("campTab").classList.add("botonLateralActivo"); did("campTitle").style.display = "flex"; }
   if (settings.currentCategory === "achievementContainer") {did("achievementsTab").classList.add("botonLateralActivo"); did("achievementsTitle").style.display = "flex";}
   if (settings.currentCategory === "townshipContainer") {did("townshipTab").classList.add("botonLateralActivo"); did("townshipTitle").style.display = "flex";}
   if (settings.currentCategory === "rpgContainer") {did("rpgTab").classList.add("botonLateralActivo"); did("rpgTitle").style.display = "flex";}
   
    
}


function settingsPanel (x,y){

did(x).addEventListener("click", function (event) {
    did("jesterTurtle").style.display = "none";
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

//-------settings-------

function CategoryHandler(x,y,z){
    
    did(x).addEventListener("click", function () {
    changeBuilding(y, z);
        
});     
}

CategoryHandler ('botonCategoriaBanco','panelBanco','botonCategoriaBanco');

function changeSetting(x,y) { //button toggles
    did(x).addEventListener("click", function () {
    if (settings[y] === 0) { settings[y] = 1; }
    else { settings[y] = 0; }
    optionsUi(x,y); //calls ui refresh of buttons
    })
}

function optionsUi(x,y) { //some mathematic shit
    if (settings[x] === 0) { did(y).textContent = "OFF"; }
    else { did(y).textContent = "ON"; }
}

function updateOptions() { //make sure they are both named the same! the id and var 
    
changeSetting("disableClickText", "disableClickText"); 
optionsUi("disableClickText", "disableClickText");
changeSetting("disableAutosave", "disableAutosave"); 
optionsUi("disableAutosave", "disableAutosave"); 
changeSetting("disablePenguinRecap", "disablePenguinRecap"); 
optionsUi("disablePenguinRecap", "disablePenguinRecap");     
    
    
}
       
function deleteSavePrompt(){
    did("opciones").style.display = "none";
    did("deleteData").style.display = "flex";
}

//-----statistics-------

settingsPanel ("botonEstadisticas", "estadisticas");

window.addEventListener('load', function () { //gets date started
    if (stats.startedSince === 0) stats.startedSince = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
    did('estadisticaStartDate').textContent = stats.startedSince;
});

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
    }
    setInterval(actualizarContador, 1000);
}
sumarSegundo();

//----turtle naming----

settingsPanel ("turtleName", "turtleRename");

function enterName(event) {
    if (event.key === "Enter" && did("namingBox").value.length >= 1) {stats.turtleName = did("namingBox").value; displayTurtleName(); closePanels()}
}
function displayTurtleName(){ did("turtleName").textContent = stats.turtleName; did('turtleName2').textContent = stats.turtleName;}

//----bought upgrades---

settingsPanel ("boughtUpgradesButton", "boughtUpgradesPanel");

//------changelog-------

settingsPanel ("botonChangelog", "changelog");

//------unlock animation-------

function unlockItem(x,y){
    
    did("unlockedItem").src = x;
    did("unlockedTextVar").textContent = y;
    
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
        did('unlockedText2').style.display = "flex";
    }, 1000);
    
    setTimeout(function() { did('unlockedText').style.opacity = "1"; }, 2000);
        
    setTimeout(function() {
        did('unlockedText2').style.opacity = "1";
        did('unlockPanel').style.cursor= 'pointer';
        did("unlockPanel").onclick = function () { did('unlockPanel').style.opacity = "0"; did('unlockPanel').style.cursor= ''; setTimeout(function() {
        did('unlockPanel').style.display = "none"; did('unlockedAura').style.display = "none"; did('unlockedItem').style.display = "none"; did('unlockedText').style.display = "none"; did('unlockedText2').style.display = "none"; did("unlockAnimation").src = "img/sys/sunRays.gif"; did('unlockedText').style.opacity = "0"; did('unlockedText2').style.opacity = "0";
    }, 2000);}
    }, 3000);
}

//----Resources Tooltip-----

function penguinTooltip() {
 
        
    
    did("resourcePenguin").addEventListener('mouseenter', function () { //on mouseenter
    did('tooltipMejora').style.display = "flex";
    
    //content related code   
    did("mejoraNombre").textContent = "Penguin Helpers";
    did('mejoraPrecio').style.color = "gray";    
    did("mejoraPrecio").innerHTML = "Bonus: "+ player.penguins.amount / 10 +"%";
    did("mejoraTag").textContent = "Special Currency";
    //assigns tag color    
    did("mejoraTag").className = 'mejoraTagS';
    
    did("mejoraDescripcion").textContent = "Penguin Helpers will assist you in offline production. For every Penguin Helper, you will gain 0.1 % offline gains of your total online production";
    did("mejoraFlavor").textContent = ""; //this uses a blank unicode that makes the bottom have a bit of margin
    did("tooltipArrowUp").style.display = 'flex';
    did("tooltipArrow").style.display = 'none'; 
    //position related code
    did('tooltipMejora').style.left = '';
    did('tooltipMejora').style.up = '';    
    did('tooltipMejora').style.right = '9.8%';
    did('tooltipMejora').style.top = '9.8%';
        
    did("resourcePenguin").addEventListener('mouseleave', function () { //on mouseleave
    did('tooltipMejora').style.display = "none";
     
        
    
    });
  }
)}
penguinTooltip();

//----------------------==========================-----------------------
//----------------------===========IDLING=========-----------------------
//----------------------==========================-----------------------

function increaseCoins(amount) { //converts idle time into resources
    
    let monedas = ((amount) * player.coins.second * player.coins.upgrades * (player.penguins.amount / 10));
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
    
    player.coins.amount += monedas;
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

//----------------------==========================-----------------------
//----------------------=========TOWNSHIP=========-----------------------
//----------------------==========================-----------------------

const scrollContainer = did("treatiesList");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});



//----------------------==========================-----------------------
//----------------------===========DEBUG==========-----------------------
//----------------------==========================-----------------------

function cheat2(tipo) {
    if (tipo === 1) {player.coins.amount *= 999999999; stats.totalCoins *= 999999999;}
    if (tipo === 2) {player.resources.amount *= 999999999; stats.totalResources *= 999999999;}
    if (tipo === 3) {player.supplies.amount *= 999999999; stats.totalSupplies *= 999999999;}
    if (tipo === 4) {player.energy.amount *= 999999999; stats.totalEnergy *= 999999999;}
    updateCounters();
}
    var timeskip = 0;
function cheat(amount) {
    let monedas = ((amount * 60) * player.coins.second * player.coins.upgrades);
    let recursos = ((amount * 60) * player.resources.second * player.resources.upgrades);
    let alimento = ((amount * 60) * player.supplies.second * player.supplies.upgrades);
    let energia = ((amount * 60) * player.energy.second * player.energy.upgrades);
    
    stats.totalCoins += monedas;
    stats.totalResources += recursos;
    stats.totalSupplies += alimento;
    stats.totalEnergy += energia;
    
    player.coins.amount += monedas;
    player.resources.amount += recursos;
    player.supplies.amount += alimento;
    player.energy.amount += energia;
    timeskip += amount / 60; 
    did("timeskip").textContent = timeskip.toFixed(0);
    updateCounters();
}

function diablo() {document.getElementById("cheatPanel").style.display = "flex"; console.log('modo diablo activado')}

//----------------------==========================-----------------------
//----------------------===========SAVING=========-----------------------
//----------------------==========================-----------------------

//------autosave-------

function autosave() {
    
    did("panelAutosave").style.display = "flex";
    did("panelAutosave").style.animation = "none";
    void did("panelAutosave").offsetWidth;
    did("panelAutosave").style.animation = "gameSaved 2s";
    setTimeout(function () { display = "none" }, 2000);
    save();
    
}

setInterval(function() { if (!settings.disableAutosave) { autosave(); } }, 30000);

document.addEventListener("keydown", function (event) {
    var turtleRename = did("turtleRename");
    if (event.key === "s" && turtleRename.style.display === "none") autosave()  
});

//----save and load----

function save() {
    const arrayDatos = [buildings, upgrades, player, stats, settings, unlocks, achievements, treaties, timers, jesterEffects, enemies, items, rpgPlayer, buffs, areas];
    const datosJSON = JSON.stringify(arrayDatos);
    localStorage.setItem('savedata', datosJSON);
}

function load() {
    const datosGuardados = localStorage.getItem('savedata');
    if (datosGuardados) {
        const objetosRecuperados = JSON.parse(datosGuardados);
        buildings = objetosRecuperados[0];
        upgrades = objetosRecuperados[1];
        player = objetosRecuperados[2];
        stats = objetosRecuperados[3];
        settings = objetosRecuperados[4];
        unlocks = objetosRecuperados[5];
        achievements = objetosRecuperados[6];
        treaties = objetosRecuperados[7];
        timers = objetosRecuperados[8];
        jesterEffects = objetosRecuperados[9];
        enemies = objetosRecuperados[10];
        items = objetosRecuperados[11];
        rpgPlayer = objetosRecuperados[12];
        buffs = objetosRecuperados[13];
        areas = objetosRecuperados[14];
    }
}

function deleteSave() {
    localStorage.removeItem('savedata');
    localStorage.removeItem('lastVisitTime');
    location.reload();
};

//----------------------==========================-----------------------
//----------------------==========DOM LOAD========-----------------------
//----------------------==========================-----------------------

document.addEventListener('DOMContentLoaded', initialization);

function initialization() {
    load();
    calculateInactiveTime();
    for (let b in buildings) updateBuildingUI(b);
    hideBuildings();
    updateOptions();
    displayTurtleName();
    penguinRecapToggle();
    oneSecond();
    rememberCategory(); //remembers tab on the left
    createUpgrade(); //these two are needed to see bought upgrades everywhere
    tooltipUpgrades();
    switchTurtle();
    buildingImage();
    
    
    
    //show unlocked shit on load
    if (unlocks.penguins === 1) did("penguinBox").style.display = "flex";
}