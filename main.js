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

var player = {
    coins: { amount: 0, second: 0, perClick: 1, upgrades: 1, upgradesClick: 0 },
    resources: { amount: 0, second: 0, upgrades: 1 },
    supplies: { amount: 0, second: 0, upgrades: 1 },
    energy: { amount: 0, second: 0, upgrades: 1 },
    storage: { amount: 15000, upgrades: 1 },
    };


const growRate = 1.07;

var stats = {
    timePlayed: 0, startedSince: 0, totalBuildings: 0, totalUpgrades: 0, totalSeconds: 0, clickCount: 0,
    };

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
    
    did("contadorMonedasSegundo").textContent = beautify(player.coins.second * player.coins.upgrades) + " /s"
    did("contadorRecursosSegundo").textContent = "(+" + beautify(player.resources.second * player.resources.upgrades) + " s)"
    did("contadorAlimentoSegundo").textContent = "(+" + beautify(player.supplies.second * player.supplies.upgrades) + " s)"
    did("contadorEnergiaSegundo").textContent = "(+" + beautify(player.energy.second * player.energy.upgrades) + " s)"
    };

//----------------------==========================-----------------------
//----------------------=======ON TURTLE CLICK====-----------------------
//----------------------==========================-----------------------

let clickCooldown = false;

did("tortugaClick").onclick = function () {
    
if (!clickCooldown) {
    //turtle image shift
    if (stats.clickCount % 6 === 0) {
            const randomImageIndex = Math.floor(Math.random() * 11) + 1;
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
    
    //cursor animation
    this.style.cursor = "grabbing"; setTimeout(function () { this.style.cursor = "grab"; }.bind(this), 100);
    
    //floating value div
    if (!settings.disableClickText) {
    var textoClick1 = document.createElement('div');
    textoClick1.className = 'textoClick';
    textoClick1.style.left = (event.clientX + (window.scrollX || window.pageXOffset) - 10) + 'px';
    textoClick1.style.top = (event.clientY + (window.scrollY || window.pageYOffset) - 40) + 'px';
    textoClick1.innerHTML = '<p>+' + (beautify(player.coins.perClick+player.coins.upgradesClick)) + '</p><img src="img/icon/tCoin.png">'; 
    
    document.body.appendChild(textoClick1);
    setTimeout(function () { textoClick1.remove(); }, 490); }
    
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
    
    player.coins.amount += player.coins.second * player.coins.upgrades
    player.resources.amount += player.resources.second * player.resources.upgrades
    player.supplies.amount += player.supplies.second * player.supplies.upgrades 
    player.energy.amount += player.energy.second * player.energy.upgrades
    
    //update stats
    did("estadisticaEdificiosTotal").textContent = stats.totalBuildings;
    did("estadisticaMejorasTotal").textContent = stats.totalUpgrades;
    did("estadisticaClicks").textContent = stats.clickCount;

    
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
    "Hard Currency": { a: 0, aps: 110, bps: 110, id: "mE1", pc: 1, u: 1, v: 0, }, //2 10min
    "Communal Life": { a: 0, apr: 1250, bpr: 1250, id: "mE2", pc: 50, u: 1, v: 0, }, //4 40min
    "Handicraft": { a: 0, ape: 14400, bpe: 14400, id: "mE3", pc: 1200, u: 1, v: 0, }, //8 8h
    "Turtle Beliefs": { a: 0, aps: 42250000, bps: 42250000, id: "mE4", pc: 15860, u: 1, v: 0, }, //11 64h
    "Empire Zealotry": { a: 0, apr: 2000000000, bpr: 2000000000, id: "mE5", pc: 140120, u: 1, v: 0, }, //15 1000h
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
    
    if ('pr' in buildings[b]){ did(buildings[b].id+"TP").textContent = ((buildings[b].pr * buildings[b].u * buildings[b].a) / player.resources.second * 100).toFixed(2) + " %"; did(buildings[b].id+"P").textContent = "+" + beautify(buildings[b].pr * buildings[b].u)}
         
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
 
 //-------------------------------
        
     function buildingCall () { //shared function when the building is bought
        buildings[b].a += buyMultiplier; //increases amount
        buyingHandler(b); //proceeds with the operation
        stats.totalBuildings += buyMultiplier; //increases statistics
        limitedAnimation.bind(did(buildings[b].id + "B"))("buyAnimation");
        updateBuildingUI(b); 
     }  
        
 //--------buying buildings-------
        
    if ('apc' in buildings[b]) { //if building costs coins
        if (player.coins.amount >= priceFormula(buildings[b].bpc)) { //if player can afford it   
        player.coins.amount -= buildings[b].apc; //deducts actual price
        buildings[b].apc = priceFormula(buildings[b].bpc); //updates actual price
        buildingCall();
        } else limitedAnimation.bind(did(buildings[b].id + "B"))("noBuyAnimation");  
       } 
        
     if ('apr' in buildings[b]) { //if building costs resources
        if (player.resources.amount >= priceFormula(buildings[b].bpr)) { 
        player.resources.amount -= buildings[b].apr; 
        buildings[b].apr = priceFormula(buildings[b].bpr); 
        buildingCall();
        } else limitedAnimation.bind(did(buildings[b].id + "B"))("noBuyAnimation");  
       } 
        
     if ('aps' in buildings[b]) { //if building costs supplies
        if (player.supplies.amount >= priceFormula(buildings[b].bps)) { 
        player.supplies.amount -= buildings[b].aps; 
        buildings[b].aps = priceFormula(buildings[b].bps); 
        buildingCall();
        } else limitedAnimation.bind(did(buildings[b].id + "B"))("noBuyAnimation");  
       }
        
     if ('ape' in buildings[b]) { //if building costs energy
        if (player.energy.amount >= priceFormula(buildings[b].bpe)) { 
        player.energy.amount -= buildings[b].ape; 
        buildings[b].ape = priceFormula(buildings[b].bpe); 
        buildingCall();
        } else limitedAnimation.bind(did(buildings[b].id + "B"))("noBuyAnimation");  
       }
          
    updateCounters();
            
})}};

buyBuilding();

//-------quantity selectors------

function setMultiplier(value) {
    buyMultiplier = value;

    const fondosBoton = ["#23232D", "#23232D", "#23232D", "#23232D"];
    const index = [1, 10, 100, 1000].indexOf(buyMultiplier);
    fondosBoton[index] = "#FD5151";
    [1, 10, 100, 1000].forEach(function (value, i) {
        did("cantidadComprador" + value + "B").style.background = fondosBoton[i];
    });
}

function multiplierSelector(x,y){
    did(x).addEventListener("click", function () {
    setMultiplier(y);
    for (let b in buildings) {
        updateBuildingUI(b);
    }});  
}

multiplierSelector("cantidadComprador1B", 1);
multiplierSelector("cantidadComprador10B", 10);
multiplierSelector("cantidadComprador100B", 100);
multiplierSelector("cantidadComprador1000B", 1000);
    
function multiplierKeybind(x,y,z){
    
    document.addEventListener(x, function (event) {
    if (event.key === y) {
        setMultiplier(z);
    for (let b in buildings) {
        updateBuildingUI(b);
        return;
        }}});
}    
    
multiplierKeybind("keyup", "Shift", 1);
multiplierKeybind("keyup", "Control", 1);
multiplierKeybind("keyup", "Alt", 1);
multiplierKeybind("keydown", "Shift", 10);
multiplierKeybind("keydown", "Control", 100);
multiplierKeybind("keydown", "Alt", 1000);

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
//--------Helping Duck------

function tooltipDuckBuildings() {
 did('helpMultipliers').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltipMejora').style.display = "flex"
    //content related code   
    did("mejoraNombre").textContent = '';
    did("mejoraPrecio").innerHTML = '';
    did("mejoraTag").textContent = '';
    did("mejoraDescripcion").textContent = 'You can also buy in bulk with the keys Shift, Cntrl and Alt!';
    did("mejoraFlavor").textContent = '';
    did("mejoraTag").style.display = 'none'
    did("upgradeSeparator").style.display = 'none'
    did("tooltipArrow").style.marginRight = '45%';
    //position related code
    const movingDiv = did('tooltipMejora');
    const referenceDiv = did('helpMultipliers');
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 160;
    const referenceTop = referenceRect.top - 15;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
  });
    
    did('helpMultipliers').addEventListener('mouseleave', function () { //on mouseleave
    did('tooltipMejora').style.display = "none";
    did("mejoraTag").style.display = 'flex'
    did("upgradeSeparator").style.display = 'flex'
    });
  }

tooltipDuckBuildings();


//----------------------==========================-----------------------
//----------------------=========UPGRADES=========-----------------------
//----------------------==========================-----------------------
//see upgrades.js
//-------category panels------

function UpgradePanelHandler(x,y) { //contracts and expands categories
   did(y).addEventListener("click", function () {
    if (did(x).clientHeight > 0) {did(x).style.maxHeight = "0"; did(x).style.padding = "0";}
    else {did(x).style.maxHeight = "100%"; did(x).style.padding = "2%";} });
}

UpgradePanelHandler("panelMUnicas","contrerUnicas")
UpgradePanelHandler("panelMComunes","contrerComunes")

//---------------------------

function sortUpgrades() { //by price
    upgrades.sort((a, b) => a.p - b.p);
    return upgrades;
}

//----creation of upgrades---

setInterval(createUpgrade, 1000);

function createUpgrade() {
 const u = sortUpgrades();
    
   for (let u in upgrades) {
   if (!did(upgrades[u].id)) { //if it doesnt exist yet    
   if (player.coins.amount >= (upgrades[u].p * 0.7) && upgrades[u].u === 1 && upgrades[u].b === 0) { 
    const divMejora = document.createElement('div');
    divMejora.id = upgrades[u].id;  
    divMejora.innerHTML = '<img src = "img/src/mejoras/'+upgrades[u].id+'.png">';
    divMejora.style.opacity = '0';
    divMejora.style.filter = 'brightness(0.2)';
    //assign a category depending on the tag      
    if (upgrades[u].t === "Common Upgrade") did('panelMComunes').appendChild(divMejora);
    if (upgrades[u].t === "Permanent Upgrade") did('panelMUnicas').appendChild(divMejora);
    //assign a class depending on the tag    
    if (upgrades[u].t === "Common Upgrade") divMejora.className = 'mejoraComunSlot';
    if (upgrades[u].t === "Permanent Upgrade") divMejora.className = 'mejoraUnicaSlot';    
    //fade in on creation     
    setTimeout(function () { divMejora.style.opacity = '1'; }, 100); 
    tooltipUpgrades();
    buyUpgrades();
    }} else {
    if (did(upgrades[u].id)) {
    did(upgrades[u].id).style.filter = 'brightness(' + (player.coins.amount >= upgrades[u].p ? '1' : '0.2') + ')'; }
    }
   }  
};
createUpgrade();

//---tooltips of upgrades---

function tooltipUpgrades() {
  for (let u in upgrades) {
        
    if (did(upgrades[u].id)) {
    did(upgrades[u].id).addEventListener('mouseenter', function () { //on mouseenter
    did('tooltipMejora').style.display = "flex";
    const coin = '<img src="img/icon/tCoin.png">';
    //content related code   
    did("mejoraNombre").textContent = upgrades[u].n;
    did("mejoraPrecio").innerHTML = beautify(upgrades[u].p) + " " + coin;
    did("mejoraTag").textContent = upgrades[u].t;
    //assigns tag color    
    if (upgrades[u].t === "Permanent Upgrade") did("mejoraTag").className = 'mejoraTagU';
    if (upgrades[u].t === "Common Upgrade") did("mejoraTag").className = 'mejoraTag';
    did("mejoraDescripcion").textContent = upgrades[u].d;
    did("mejoraFlavor").textContent = upgrades[u].f;
    did("tooltipArrow").style.marginRight = '10.5%';
    //position related code    
    const movingDiv = did('tooltipMejora');
    const referenceDiv = did(upgrades[u].id);
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 30;
    const referenceTop = referenceRect.top - 15;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
    //changes color of price
    if (player.coins.amount >= upgrades[u].p)
    { did('mejoraPrecio').style.color = "#7EFF69"; } 
    else { did('mejoraPrecio').style.color = "coral"; };
  });
    did(upgrades[u].id).addEventListener('mouseleave', function () { //on mouseleave
    did('tooltipMejora').style.display = "none";
    });
  }}
}
tooltipUpgrades();

//-----buying upgrades----

function buyUpgrades() {
  for (let u in upgrades) {
      
    if (did(upgrades[u].id)) {
    did(upgrades[u].id).addEventListener('click', function () {
    if (player.coins.amount >= upgrades[u].p && upgrades[u].b === 0) {
        player.coins.amount -= upgrades[u].p;
        updateCounters();
        createUpgrade();
        limitedAnimation.bind(did(upgrades[u].id))("buyUpgradeAnimation");
        setTimeout(function () {
            did(upgrades[u].id).style.display = "none";
            eval(upgrades[u].o);
            hideBuildings();
            for (let b in buildings) {updateBuildingUI(b)}
            
            }, 110);
        stats.totalUpgrades++;
        upgrades[u].b = 1;
        
    } else limitedAnimation.bind(did(upgrades[u].id))("noBuyAnimation");
    })
    }
  }
}
buyUpgrades();

//----------------------==========================-----------------------
//----------------------==========SETTINGS========-----------------------
//----------------------==========================-----------------------

//-----pannel buttons-----

var settings = {
    disableClickText: 0,
};

function settingsPanel (x,y){

did(x).addEventListener("click", function (event) {
    did(y).style.display = "flex";
    did("bodyCover").style.display = "flex";
    did("body").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    did("body").style.filter = "blur(5px) brightness(0.5)";
    event.stopPropagation();
});
}

settingsPanel ("botonOpciones", "opciones");

did("bodyCover").addEventListener("click", function () {
    did("opciones").style.display = "none";
    did("estadisticas").style.display = "none";
    did("changelog").style.display = "none";
    did("bodyCover").style.display = "none";
    did("body").style.backgroundColor = "transparent";
    did("body").style.filter = "blur(0) brightness(1)";
})

//-------settings-------

function opcionClick() { //this will need to be replaced by onclick once more options get added
    if (settings.disableClickText === 0) {  settings.disableClickText = 1; }
    else { settings.disableClickText = 0; }
    optionsUi();
}

function optionsUi() {
    
    if (settings.disableClickText === 0) { did("opcionClickB").textContent = "OFF"; }
    else { did("opcionClickB").textContent = "ON"; }
}

//-----statistics-------

settingsPanel ("botonEstadisticas", "estadisticas");

window.addEventListener('load', function () { //gets date started
    did('estadisticaStartDate').textContent = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
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

//------changelog-------

settingsPanel ("botonChangelog", "changelog");

//----------------------==========================-----------------------
//----------------------===========IDLING=========-----------------------
//----------------------==========================-----------------------

function increaseCoins(amount) { //converts idle time into resources
    
    let monedas = ((amount) * player.coins.second * player.coins.upgrades * 0.1);
    let recursos = ((amount) * player.resources.second * player.resources.upgrades* 0.1);
    let alimento = ((amount) * player.supplies.second * player.supplies.upgrades* 0.1);
    let energia = ((amount) * player.energy.second * player.energy.upgrades* 0.1);
    player.coins.amount += monedas;
    player.resources.amount += recursos;
    player.supplies.amount += alimento;
    player.energy.amount += energia;
    updateCounters();
}

function calculateInactiveTime() { //calculates idle time
    const lastVisitTime = localStorage.getItem('lastVisitTime');
    if (lastVisitTime) {
        const currentTime = new Date().getTime();
        const inactiveTime = currentTime - parseInt(lastVisitTime);
        const secondsInactive = Math.floor(inactiveTime / 1000);
        if (secondsInactive > 0) {
            increaseCoins(secondsInactive);
        }
    }
    
    localStorage.setItem('lastVisitTime', new Date().getTime());
}

//----------------------==========================-----------------------
//----------------------===========DEBUG==========-----------------------
//----------------------==========================-----------------------

function cheat2(tipo) {
    if (tipo === 1) player.coins.amount *= 999999999;
    if (tipo === 2) player.resources.amount *= 999999999;
    if (tipo === 3) player.supplies.amount *= 999999999;
    if (tipo === 4) player.energy.amount *= 999999999;
    updateCounters();
}
    var timeskip = 0;
function cheat(amount) {
    let monedas = ((amount * 60) * player.coins.second * player.coins.upgrades);
    let recursos = ((amount * 60) * player.resources.second * player.resources.upgrades);
    let alimento = ((amount * 60) * player.supplies.second * player.supplies.upgrades);
    let energia = ((amount * 60) * player.energy.second * player.energy.upgrades);
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

setInterval(autosave, 30000);

document.addEventListener("keydown", function (event) {
    if (event.key === "s") autosave()  
});

//----save and load----

function save() {
    const arrayDatos = [buildings, upgrades, player, stats, settings];
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
    }
}

function deleteSave() {
    localStorage.removeItem('savedata');
    localStorage.removeItem('lastVisitTime');
};

//----------------------==========================-----------------------
//----------------------==========DOM LOAD========-----------------------
//----------------------==========================-----------------------

document.addEventListener('DOMContentLoaded', initialization);

function initialization() {
    load();
    calculateInactiveTime();
    updateCounters();
    for (let b in buildings) updateBuildingUI(b);
    hideBuildings();
    optionsUi();
}