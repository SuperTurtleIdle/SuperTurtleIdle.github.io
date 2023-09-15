/* eslint-env es6 */
/* eslint-disable */

var rpgPlayer = {
    level: 1,
    exp: 0,
    maxExp: 1000,
    hp: 1000,
    haste:10, 
    tempo:10, 
    alive:1,
    feetSlot: 'none',
    headSlot: 'none',
    legsSlot: 'none',
    handsSlot: 'none',
    chestSlot: 'none',
    ringSlot: 'none',
    weaponSlot: 'none',
    trinketSlot: 'none',
    area: 'A1',
}
var playerPhysAttack = 0; //base stats
var playerMagicAttack = 0;
var playerRangedAttack = 0;
var playerPhysDefense = 0;
var playerMagicDefense = 0;
var playerRangedDefense = 0;
var armorPhysAttack = 0;
var armorMagicAttack = 0;
var armorRangedAttack = 0;
var armorPhysDefense = 0;
var armorMagicDefense = 0;
var armorRangedDefense = 0;
var tierPhysAttack = 0;
var tierMagicAttack = 0;
var tierRangedAttack = 0;
var tierPhysDefense = 0;
var tierMagicDefense = 0;
var tierRangedDefense = 0;
var armorMaxHp = 0;
var playerHpRegen = 0;
var playerMaxHp = 0;


var playerAttackInterval = setInterval(playerAttack, rpgPlayer.haste);

setInterval(enemySpawn, rpgPlayer.tempo);

var enemyAttackInterval = setInterval(enemyAttack, 2500);

setInterval(hpRegen, 1000);
var foodRegen = 0;

setInterval(playerBuffs, 1000);


for (let e in enemies) { 
var currentHP = enemies[e].hp;    
var percentageHP = (currentHP/enemies[e].hp)*100;
var percentageplayerHP = (rpgPlayer.hp/playerMaxHp)*100;
}

const rangedIcon = '<img src="img/sys/ranged.png">';
const physIcon = '<img src="img/sys/phys.png">';
const magicIcon = '<img src="img/sys/magic.png">';



function statsUpdate(){
    //aqui crear una nueva var llamada setbonus probablemente, setbonusphysattak, etc
  playerPhysAttack = 100 + armorPhysAttack + tierPhysAttack;  
  playerMagicAttack = armorMagicAttack + tierMagicAttack;    
  playerRangedAttack = armorRangedAttack + tierRangedAttack;    
    
  playerPhysDefense = armorPhysDefense + tierPhysDefense;    
  playerMagicDefense = armorMagicDefense + tierMagicDefense;     
  playerRangedDefense = armorRangedDefense + tierRangedDefense;  
    
  playerHpRegen = 100 + foodRegen;
  playerMaxHp = 1000 + armorMaxHp;
  
}

function playerAttack() {

    for (let e in enemies) { 
    if (did(enemies[e].id+'enemy')) {

    currentHP -= 50;
        
        
        
    //log mssg when player hits creature    
    logPrint (stats.turtleName + " deals <FONT COLOR='#e8643c'>100 damage<FONT COLOR='white'> to <FONT COLOR='#ffbd54'>" + enemies[e].name + "!")
        
        
        
    //updates hp bar    
    percentageHP = (currentHP/enemies[e].hp)*100;
    did('enemyHpBar').style.background = 'linear-gradient(90deg, rgb(144,238,111)'+percentageHP+'%, rgb(255,119,119) '+percentageHP+'%)';
        
      }
        
    if (did('enemyAnimation').childElementCount === 0 && currentHP>0) currentHP=0; //failsafe to prevent unspawned enemies    
        
        
   }
    
    setTimeout(function () { did('playerAnimation').style.animation = '' }, rpgPlayer.haste*0.9);
    did('playerAnimation').style.animation = 'playerAttack '+(rpgPlayer.haste/1000)/2+'s 1 ease'
    
    
    

}


function hpRegen(){
    
    if (rpgPlayer.alive === 1 && rpgPlayer.hp < playerMaxHp){ //if player alive
    if (rpgPlayer.hp < playerMaxHp) rpgPlayer.hp += playerHpRegen
    percentageplayerHP = (rpgPlayer.hp/playerMaxHp)*100;
    did('playerHpBar').style.background = 'linear-gradient(90deg, rgb(144,238,111)'+percentageplayerHP+'%, rgb(255,119,119) '+percentageplayerHP+'%)';
    }
    
    if (rpgPlayer.alive === 0 && rpgPlayer.hp < playerMaxHp){ //if player dead
    if (rpgPlayer.hp < playerMaxHp) rpgPlayer.hp += playerHpRegen
    percentageplayerHP = (rpgPlayer.hp/playerMaxHp)*100;
    did('playerHpBar').style.background = 'linear-gradient(90deg, rgb(144,238,111)'+percentageplayerHP+'%, rgb(255,119,119) '+percentageplayerHP+'%)';
        
    did('playerAnimation').style.animation = 'playerDeath 1s 1'
        setTimeout(function () { did('playerAnimation').style.transform = 'rotateX(180deg) translateY(-35%)' }, 800);
        did('rpgPlayerImg').src = "img/sys/rpgPlayerDead.png"   
        
    clearInterval(enemyAttackInterval);  
    clearInterval(playerAttackInterval);   
        
    }
    
    if (rpgPlayer.hp >= playerMaxHp && rpgPlayer.alive === 0){  // on player revive
      rpgPlayer.alive = 1;
          
      playerAttackInterval = setInterval(playerAttack, rpgPlayer.haste);
      enemyAttackInterval = setInterval(enemyAttack, 2500);
        
      did('playerAnimation').style.animation = 'playerRevive 1s 1'
      setTimeout(function () { did('playerAnimation').style.transform = '' }, 800);
      did('rpgPlayerImg').src = "img/sys/rpgPlayer.png"   
      
      }
    
}







function enemyAttack() {

    for (let e in enemies) { 
    if (did(enemies[e].id+'enemy')) {

    rpgPlayer.hp -= 300; //PONER AQUI UN (O MAX HP) PARA QUE NO HAGA MAS DAÑO DE TU VIDA
        
        
        
    //log mssg when player hits creature    
    logPrint (enemies[e].name + " deals <FONT COLOR='#e8643c'>100 damage<FONT COLOR='white'> to <FONT COLOR='#ffbd54'>" + stats.turtleName + "!")
        
        
        
    //updates player hp bar    
    percentageplayerHP = (rpgPlayer.hp/playerMaxHp)*100;
    did('playerHpBar').style.background = 'linear-gradient(90deg, rgb(144,238,111)'+percentageplayerHP+'%, rgb(255,119,119) '+percentageplayerHP+'%)';
        
      }
   }
    
    
     setTimeout(function () { did('enemyAnimation').style.animation = '' }, 490);
    did('enemyAnimation').style.animation = 'enemyAttack 0.5s 1'
   
    if (rpgPlayer.hp < 0){ //if the player dies
    
       
       rpgPlayer.alive = 0;
       hpRegen() 
        
       
    }
    
    
}

function enemySpawn(){
    
    if (currentHP <= 0){ //on enemy kill
        for (let e in enemies) {
            if (did(enemies[e].id+'enemy')) {
            did(enemies[e].id+'enemy').style.animation = 'enemyDefeat 0.2s 1 ease'
            setTimeout(function () { did(enemies[e].id+'enemy').remove(); }, 180);
            enemies[e].killCount++;    
            player.coins.amount += enemies[e].coins;
            stats.totalCoins += enemies[e].coins;
            logPrint ("<FONT COLOR='#ffbd54'>"+ enemies[e].name + " <FONT COLOR='white'>gets defeated and drops<FONT COLOR='#ffbd54'> " +enemies[e].coins+ " Turtle Coins <FONT COLOR='white'>and<FONT COLOR='#ae77f7'> " +enemies[e].exp+ " EXP!");
            for (let a in areas){
                if(areas[a].active === 1 && areas[a].mastery != areas[a].maxMastery) {
                areas[a].mastery += enemies[e].exp;     
                rpgPlayer.exp += enemies[e].exp;
                }}
            trinketEnemyKill() //trinket effect    
            switchArea();    
            expBar();    
                
            //loot tables    
            if (Math.random() <= enemies[e].drops.id1w) { //checks if the first drop is an array, only put arrays on first drop!!
                if (Array.isArray(enemies[e].drops.id1)) {
                var indiceAleatorio = Math.floor(Math.random() * enemies[e].drops.id1.length);
                var elementoAleatorio = enemies[e].drops.id1[indiceAleatorio];
                if(items[elementoAleatorio].count < items[elementoAleatorio].max) {items[elementoAleatorio].count++; logPrint ("<FONT COLOR='#8fba77'>"+enemies[e].name + " drops "+items[elementoAleatorio].name+"!")} //if its not an array
                }
            else { //if its not an array
                if(items[enemies[e].drops.id1].count < items[enemies[e].drops.id1].max) {items[enemies[e].drops.id1].count++; logPrint ("<FONT COLOR='#8fba77'>"+enemies[e].name + " drops "+items[enemies[e].drops.id1].name+"!")} //checks the max ammount permitida
            }
            }
            if (Math.random() <= enemies[e].drops.id2w) {
                if(items[enemies[e].drops.id2].count < items[enemies[e].drops.id2].max) {items[enemies[e].drops.id2].count++; logPrint ("<FONT COLOR='#8fba77'>"+enemies[e].name + " drops "+items[enemies[e].drops.id2].name+"!")}
            }
            if (Math.random() <= enemies[e].drops.id3w) {
                if(items[enemies[e].drops.id3].count < items[enemies[e].drops.id3].max) {items[enemies[e].drops.id3].count++; logPrint ("<FONT COLOR='#8fba77'>"+enemies[e].name + " drops "+items[enemies[e].drops.id3].name+"!")}
            }}    
        }
       
       //this resets attack timer of enemy if it dies 
       clearInterval(enemyAttackInterval);   
       enemyAttackInterval = setInterval(enemyAttack, 2500);
        
      //generates a random enemy within the actual area  
      const enemyKeys = Object.keys(enemies).filter(key => enemies[key].area === rpgPlayer.area);
      const randomEnemyKey = enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
            
        
          //creates the randomly picked enemy
          const enemyDiv = document.createElement("div");
          enemyDiv.id = randomEnemyKey+'enemy';
          enemyDiv.className = 'enemy';
          did('enemyAnimation').appendChild(enemyDiv);
          enemyDiv.innerHTML = '<img src="img/src/enemies/'+randomEnemyKey+'.png">'; 
          did("enemyName").textContent = enemies[randomEnemyKey].name;
          did("enemyLevel").textContent = enemies[randomEnemyKey].level;
          currentHP = enemies[randomEnemyKey].hp;
          percentageHP = (currentHP/enemies[randomEnemyKey].hp)*100;
          tooltipEnemies();    
        
        
              
      did('enemyHpBar').style.background = 'linear-gradient(90deg, rgb(144,238,111)'+percentageHP+'%, rgb(255,119,119) '+percentageHP+'%)';        
        
    }
}
    
setInterval(function() { if (settings.currentCategory === "rpgContainer")  {addItem()}  }, 1000);    
    
function addItem() {
   for (let i in items) {
   if (items[i].count >= 1){   
   if (!did(items[i].id+'item')) { //if it doesnt exist yet create it
    const itemdiv = document.createElement('div');
    itemdiv.id = items[i].id+'item';  
    if (items[i].max === 1) itemdiv.innerHTML = '<img src = "img/src/items/'+items[i].id+'.png">';
    else itemdiv.innerHTML = '<img src = "img/src/items/'+items[i].id+'.png"><div class="itemCount" id="'+items[i].id+'itemCount'+'">'+items[i].count+'</div>';
    itemdiv.className = 'itemSlot'; 
    setTimeout(function () { itemdiv.style.animation = '' }, 190);   
    itemdiv.style.animation = "growFadeIn 0.2s 1"   
    //assign a category depending on the tag      
    did('inventory').appendChild(itemdiv);
    if (items[i].quality === "Common") itemdiv.style.border = 'white solid 1px';
    if (items[i].quality === "Uncommon") itemdiv.style.border = '#1eff00 solid 1px';
    if (items[i].quality === "Rare") itemdiv.style.border = '#0070dd solid 1px'; 
    if (items[i].quality === "Epic") itemdiv.style.border = '#a335ee solid 1px'; 
    if (items[i].quality === "Legendary") itemdiv.style.border = '#ff8000 solid 1px'; 
    if (items[i].quality === "Relic") itemdiv.style.border = '#e6cc80 solid 1px';
    //call tooltip and use functions
    tooltipItems()  
    if ('use' in items[i]) itemUse(items[i].id, function() { eval(items[i].use) })   
    }   
       
   if (did(items[i].id+'item')) { //if it exists update ammount  
   if (items[i].max !== 1) did(items[i].id+'itemCount').innerHTML = items[i].count;    
    }   
    }}
};

function removeItem(item, amount) {
   if (item.count >= 1){
   if (did(item.id+'item')) { //only if it exsists
    item.count -= amount  
    did(item.id+'itemCount').innerHTML = item.count; 
   if (item.count <= 0){ did(item.id+"item").remove()}    
   }}      
};       
  
function logPrint(print){
    let hitLog = document.createElement('div');
    hitLog.id = Math.random();
    did('combatLog').appendChild(hitLog);
    hitLog.className = 'logMessage';
    hitLog.innerHTML = print;
    did('combatLog').scrollTop = did('combatLog').scrollHeight; //scroll to bottom on creation
    if (did('combatLog').children.length >= 10) did('combatLog').removeChild(did('combatLog').firstChild) //if it has more than 10 childs delete the first
}

function itemUse(id, effect) {
    did(id+"item").addEventListener('contextmenu', function () { 
    effect(); 
    });
}

const reinforcedClothArray = ['I13','I14','I16','I17','I18']

function giveRandomItem(array) {
    let pick = array[Math.floor(Math.random() * array.length)];
    items[pick].count += 1
}

function expBar() {
    
    let percentageEXP = (rpgPlayer.exp/rpgPlayer.maxExp)*100;
    did('expBar').style.background = 'linear-gradient(90deg, #6FB1EE '+percentageEXP+'%, #3F3939 '+percentageEXP+'%)';
    did("currentExp").textContent = rpgPlayer.exp;
    did("nextExp").textContent = rpgPlayer.maxExp; 
    did("turtleLevel2").textContent = rpgPlayer.level;
    did("turtleLevel").innerHTML = '[lvl '+rpgPlayer.level+']';
    
    if (rpgPlayer.exp >= rpgPlayer.maxExp){//on level up
    rpgPlayer.maxExp = Math.floor(1000 * Math.pow(1.5, rpgPlayer.level));    
    rpgPlayer.exp = 0;
    rpgPlayer.level += 1; 
        
    setTimeout(function () { did('expPanel').style.animation = '' }, 1100);
    did('expPanel').style.animation = 'levelUp 1s 1'    
        
    }
} 



    
setInterval(function() { if (settings.currentCategory === "rpgContainer") { createAreaPanel(); } }, 1000);

function createAreaPanel() {
   for (let a in areas) {
   if (!did(areas[a].id+"area")) {
    
    const areadiv = document.createElement('div');
    areadiv.id = areas[a].id+"area";  
    areadiv.style.filter = 'brightness(0.2)';
    areadiv.innerHTML = '<div class="areaPanel1"> <div class="areaImage"> <img src="img/src/areas/'+areas[a].mini+'.png"></div> </div> <div class="areaPanel2"> <p class="areaPanelName">'+areas[a].name+'</p> <p class="areaPanelLevel" id="'+areas[a].id+'areal">lvl '+areas[a].level+'</p><p class="areaPanelMastery" id="'+areas[a].id+'aream">0</p></div>'   
    did('travelTab').appendChild(areadiv);
    areadiv.className = 'areaPanel';
    //tooltip here
    areaButton(areas[a]);
    tooltipAreas(areas[a]);   
   }
   
   if (areas[a].unlocked === 1) {did(areas[a].id+"area").style.filter = 'brightness(1)';}
   if (rpgPlayer.level >= (areas[a].level * 0.7)) did(areas[a].id+'areal').style.background = "#CD984D"
   if (rpgPlayer.level >= (areas[a].level)) did(areas[a].id+'areal').style.background = "#58B86C"    
   did(areas[a].id+'aream').innerHTML = Math.floor(areas[a].mastery/areas[a].maxMastery*100)+"%"
       
   }    
};createAreaPanel();


function areaButton(area) {
   if (did(area.id + 'area')) {
       did(area.id + 'area').addEventListener('click', function () { 
           rpgPlayer.area = area.id;
           resetAreaButtonClass()
           switchArea()
           
           
       });
   }
    
    function resetAreaButtonClass() {
        
      for (let a in areas) { did(areas[a].id + 'area').classList.replace('areaPanelSelect', 'areaPanel'); }  
        
    }
}

function switchArea(){
    did("rpgCanvas").style.backgroundImage = 'url(img/src/areas/'+rpgPlayer.area+'.png)';
    did(rpgPlayer.area + 'area').classList.replace('areaPanel', 'areaPanelSelect');
    for (let a in areas) { areas[a].active = 0; }
    areas[rpgPlayer.area].active = 1;
    
    for (let a in areas) {
      if (areas[a].active === 1) {
            
        did('areaName').innerHTML = areas[a].name;
        did('areaLevel').innerHTML = 'lvl '+areas[a].level;
           if (rpgPlayer.level < (areas[a].level * 0.7)) did('areaLevel').style.background = "#D85858";
           if (rpgPlayer.level >= (areas[a].level * 0.7)) did('areaLevel').style.background = "#CD984D";
           if (rpgPlayer.level >= (areas[a].level)) did('areaLevel').style.background = "#58B86C";
        did('areaMastery').innerHTML = 'Mastery: ' + Math.floor(areas[a].mastery/areas[a].maxMastery*100) + '%'
            
            
            
            
            
        }
        
        
        
        
    }
    
    
    
}

//----------------------==========================-----------------------
//----------------------========GEAR SLOTS========-----------------------
//----------------------==========================-----------------------

function initGear(slot, div){ //initialisation of the gear
    if (slot !== 'none') { //if something is on the slot variable
    let ID = slot //id becomes the value of rpgPlayyer.slot
    did(div).innerHTML = ''; //removes the default slot
    if (did(ID+'item')){ did(div).appendChild(did(ID+'item')); }
    eval(items[ID].stats);
    setBonus();    
    statsUpdate();
    updateStats();
    
    }
}

function initGearAll(){
initGear(rpgPlayer.feetSlot, 'rpgFeetSlot');
initGear(rpgPlayer.headSlot, 'rpgHeadSlot');
initGear(rpgPlayer.chestSlot, 'rpgChestSlot');
initGear(rpgPlayer.legsSlot, 'rpgLegsSlot');
initGear(rpgPlayer.handsSlot, 'rpgHandsSlot');
initGear(rpgPlayer.ringSlot, 'rpgRingSlot');
initGear(rpgPlayer.trinketSlot, 'rpgTrinketSlot');
initGear(rpgPlayer.weaponSlot, 'rpgWeaponSlot');
}

function gearSwap(ID, slot, div, category){
    if (did(ID+'item')){
    if (slot !== 'none') { eval(items[slot].remove) };
    let armor = category;
    if (armor === "feet") rpgPlayer.feetSlot = ID;
    if (armor === "head") rpgPlayer.headSlot = ID;
    if (armor === "hands") rpgPlayer.handsSlot = ID;
    if (armor === "chest") rpgPlayer.chestSlot = ID;
    if (armor === "legs") rpgPlayer.legsSlot = ID;
    if (armor === "ring") rpgPlayer.ringSlot = ID;
    if (armor === "trinket") rpgPlayer.trinketSlot = ID;
    if (armor === "weapon") rpgPlayer.weaponSlot = ID;    
    did(div).innerHTML = ''; 
    if (did(ID+'item')){ did(div).appendChild(did(ID+'item')); }
    eval(items[ID].stats)
    setBonus();    
    statsUpdate();
    updateStats();
    addItem();
    }
}

function removeGear(div, slot, path, category){ //on right click the piece
    did(div).addEventListener('contextmenu', function () {
    if (slot !== 'none')  { 
    while (did(div).firstChild) { 
    did('inventory').appendChild(did(div).firstChild); }   }
    did(div).innerHTML = path;
    let armor = category;    
    if (armor === "feet" && rpgPlayer.feetSlot !== 'none') {eval(items[rpgPlayer.feetSlot].remove); rpgPlayer.feetSlot = 'none';}
    if (armor === "head" && rpgPlayer.headSlot !== 'none') {eval(items[rpgPlayer.headSlot].remove); rpgPlayer.headSlot = 'none';}
    if (armor === "hands" && rpgPlayer.handsSlot !== 'none') {eval(items[rpgPlayer.handsSlot].remove); rpgPlayer.handsSlot = 'none';}
    if (armor === "chest" && rpgPlayer.chestSlot !== 'none') {eval(items[rpgPlayer.chestSlot].remove); rpgPlayer.chestSlot = 'none';}
    if (armor === "legs" && rpgPlayer.legsSlot !== 'none') {eval(items[rpgPlayer.legsSlot].remove); rpgPlayer.legsSlot = 'none';}
    if (armor === "ring" && rpgPlayer.ringSlot !== 'none') {eval(items[rpgPlayer.ringSlot].remove); rpgPlayer.ringSlot = 'none';}
    if (armor === "trinket" && rpgPlayer.trinketSlot !== 'none') {eval(items[rpgPlayer.trinketSlot].remove); rpgPlayer.trinketSlot = 'none';}
    if (armor === "weapon" && rpgPlayer.weaponSlot !== 'none') {eval(items[rpgPlayer.weaponSlot].remove); rpgPlayer.weaponSlot = 'none';}    
    setBonus(); 
    statsUpdate();   
    updateStats();
    addItem();
    resetTooltip();                           
    }); 
} 

removeGear('rpgFeetSlot', rpgPlayer.feetSlot, '<div class="mejoraComunSlot"><img src="img/sys/feetSlot.png"></div>', 'feet');
removeGear('rpgHeadSlot', rpgPlayer.headSlot, '<div class="mejoraComunSlot"><img src="img/sys/headSlot.png"></div>', 'head');
removeGear('rpgHandsSlot', rpgPlayer.handsSlot, '<div class="mejoraComunSlot"><img src="img/sys/handsSlot.png"></div>', 'hands');
removeGear('rpgChestSlot', rpgPlayer.feetSlot, '<div class="mejoraComunSlot"><img src="img/sys/chestSlot.png"></div>', 'chest');
removeGear('rpgLegsSlot', rpgPlayer.legsSlot, '<div class="mejoraComunSlot"><img src="img/sys/legsSlot.png"></div>', 'legs');
removeGear('rpgRingSlot', rpgPlayer.ringSlot, '<div class="mejoraComunSlot"><img src="img/sys/ringSlot.png"></div>', 'ring');
removeGear('rpgTrinketSlot', rpgPlayer.trinketSlot, '<div class="mejoraComunSlot"><img src="img/sys/trinketSlot.png"></div>', 'trinket');
removeGear('rpgWeaponSlot', rpgPlayer.weaponSlot, '<div class="mejoraComunSlot"><img src="img/sys/weaponSlot.png"></div>', 'weapon');

function weaponSwap(ID){
    did('playerWeapon').src = "img/src/weaponModels/"+ID+".png"
}

function trinketEnemyKill(){
  if (rpgPlayer.trinketSlot == 'I11'){ //weighted die
    player.coins.amount += 20;
    stats.totalCoins += 20;
    logPrint ("You get an additional <FONT COLOR='#ffbd54'> 20 Turtle Coins.")    
        
  }
}

function setBonus(){
    let h = rpgPlayer.headSlot;
    let c = rpgPlayer.chestSlot;
    let l = rpgPlayer.legsSlot;
    let f = rpgPlayer.feetSlot;
    let d = rpgPlayer.handsSlot;
    if ((h === "I3" || h === "I14") && (c === "I5" || c === "I17") && (l === "I6" || l === "I18") && (f === "I2" || f === "I13") && (d === "I4" || d === "I16")){tierPhysDefense = 1000; did('rpgPlayerImg').src = "img/src/armor/A1.png";} //cloth setbonus
    else {tierPhysDefense = 0; did('rpgPlayerImg').src = "img/src/armor/A0.png";}
}

   
//----------------------==========================-----------------------
//----------------------=========TOOLTIPS=========-----------------------
//----------------------==========================-----------------------

function tooltipItems() {
    
  for (let i in items) {  
    if (did(items[i].id+'item')) {
    did(items[i].id+'item').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex";
    
    did("tooltipName").textContent = items[i].name;
    if (items[i].max === 1) did("tooltipPrice").innerHTML = "(Unique)";
    else did("tooltipPrice").innerHTML = "(Max "+ items[i].max +")";
    did("tooltipRarity").textContent = items[i].quality;
        
    if (items[i].quality === "Common") {did("tooltipRarity").style.color = "white";did("tooltipName").style.color = "white"; }
    if (items[i].quality === "Uncommon") {did("tooltipRarity").style.color = "#1eff00";did("tooltipName").style.color = "#1eff00";}
    if (items[i].quality === "Rare") {did("tooltipRarity").style.color = "#0070dd";did("tooltipName").style.color = "#0070dd"}
    if (items[i].quality === "Epic") {did("tooltipRarity").style.color = "#a335ee";did("tooltipName").style.color = "#a335ee"}
    if (items[i].quality === "Legendary") {did("tooltipRarity").style.color = "#ff8000";did("tooltipName").style.color = "#ff8000"}
    if (items[i].quality === "Relic") {did("tooltipRarity").style.color = "#e6cc80";did("tooltipName").style.color = "#e6cc80"}
          
    did("tooltipDescription").innerHTML = items[i].description + '<br><div class="separador"></div><FONT COLOR="white">Sell value: <FONT COLOR="#ffbd54">'+items[i].sell+' Turtle Coins<br>';
    did("tooltipFlavor").textContent = items[i].flavor;
    did('tooltipImage').src = "img/src/items/"+items[i].id+".png";     
    //position related code
        
    var movingDiv = did('tooltip');
    var referenceDiv = did(items[i].id + "item");
    var referenceRect = referenceDiv.getBoundingClientRect();    
        
    if (did("gearFlex").contains(did(items[i].id + 'item'))) { // if the item is equipped
    var referenceLeft = referenceRect.left - movingDiv.offsetWidth - 25; // Cambiar aquí para posicionar la parte superior derecha del tooltip en la parte superior izquierda del item
    var referenceTop = referenceRect.top - 5;
    var newLeft = referenceLeft;
    var newTop = referenceTop;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
    did("tooltipArrow").style.display = "none";
    did("tooltipArrowRight").style.display = "flex";
    did("tooltipArrowRight").style.top = "10%";    
    } else {
    var referenceLeft = referenceRect.left + 26;
    var referenceTop = referenceRect.top - 15;
    var newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    var newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';      
    }
        
        
        
        
  });
    did(items[i].id+'item').addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }}
}

function tooltipEnemies() {
  for (let e in enemies) {  
    if (did(enemies[e].id+'enemy')) {
    did(enemies[e].id+'enemy').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex";
    
    did("tooltipName").textContent = enemies[e].name;
    did("tooltipPrice").innerHTML = 'Killed:'+ beautify(enemies[e].killCount);
    did("tooltipRarity").textContent = 'Enemy';
    did("tooltipRarity").style.color = "white";
    did("tooltipName").style.color = "white";
    did("tooltipArrow").style.display = "none";
    did("tooltipArrowRight").style.display = "flex";    
    //aqui meterle un if killcount>x para el bestiario, meterlo dentro de esto de abajo
    did("tooltipDescription").innerHTML = enemies[e].description+'<br><FONT COLOR="#edd585"> Resistances: '+physIcon + enemies[e].physDefense+'%  '+rangedIcon + enemies[e].rangedDefense+'%  '+magicIcon + enemies[e].magicDefense+'%<br><br>Drops:<br>'+enemies[e].drops.id1n+' '+enemies[e].drops.id1w*100+'%<br>'+enemies[e].drops.id2n*100+' '+enemies[e].drops.id2w*100+'%<br>'+enemies[e].drops.id3n+' '+enemies[e].drops.id3w+'%';
    did("tooltipFlavor").textContent = '';
    did('tooltipImage').src = "img/src/enemies/"+enemies[e].miniImg+".png";     
    //position related code
    const movingDiv = did('tooltip');
    const referenceDiv = did(enemies[e].id+'enemy');
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left - 40;
    const referenceTop = referenceRect.bottom + 10;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.right = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
        
  });
        
    did(enemies[e].id+'enemy').addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }}
}

function tooltipBuffs() {
  for (let b in buffs) {  
    if (did(buffs[b].id+'buff')) {
    did(buffs[b].id+'buff').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex";
    did("tooltipName").textContent = buffs[b].name;
    did("tooltipPrice").innerHTML = buffs[b].left+"s left";
    did("tooltipRarity").textContent = 'Buff';
    did("tooltipRarity").style.color = "white";
    did("tooltipName").style.color = "white";   
    did("tooltipDescription").innerHTML = buffs[b].description;
    did("tooltipFlavor").textContent = '';
    did('tooltipImage').src = "img/src/buffs/"+buffs[b].img+".png";     
    //position related code
    const movingDiv = did('tooltip');
    const referenceDiv = did(buffs[b].id+'buff');
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 33;
    const referenceTop = referenceRect.top - 15;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
        
  });
    did(buffs[b].id+'buff').addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }}
}

function tooltipAreas(area) {
    if (did(area.id+'area')) {
    did(area.id+'area').addEventListener('mouseenter', function () { //on mouseenter
    did('tooltip').style.display = "flex";
    did("tooltipName").textContent = area.name;
    did("tooltipPrice").innerHTML = '';
    did("tooltipRarity").textContent = 'Area';
    did("tooltipRarity").style.color = "white";
    did("tooltipName").style.color = "white";   
    did("tooltipDescription").innerHTML = 'Select this area to travel to '+ area.name +'';
    did("tooltipFlavor").textContent = area.description;
    did('tooltipImage').src = "img/src/areas/"+area.mini+".png";     
    //position related code
    const movingDiv = did('tooltip');
    const referenceDiv = did(area.id+'area');
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 33;
    const referenceTop = referenceRect.top - 15;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
        
  });
    did(area.id+'area').addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }
}

//----------------------==========================-----------------------
//----------------------=======BUFF SYSTEM========-----------------------
//----------------------==========================-----------------------

function playerBuffs(){
    
    for (let b in buffs) {
   if (buffs[b].active >= 1){   
   if (!did(buffs[b].id+'buff')) { //creation if it doesnt exist
       
    const bufdiv = document.createElement('div');
    bufdiv.id = buffs[b].id+'buff';  
    bufdiv.innerHTML = '<div class="playerBuffTimer" id="'+buffs[b].id+'timer"></div><img src="img/src/buffs/'+buffs[b].id+'.png"></div>';
    bufdiv.className = 'playerBuffIcon';   
    did('playerBuffWrapper').appendChild(bufdiv);
    eval(buffs[b].effect)
    //call tooltip and use functions
    tooltipBuffs()   
    }
       
    if (did(buffs[b].id+'buff')) { //if exists update timer
       
    buffs[b].left-- //discounts time
    buffs[b].percentage = (buffs[b].left/buffs[b].timer)*100;
    did(buffs[b].id+'timer').style.background = "linear-gradient(0deg, rgba(74,74,74,0) "+buffs[b].percentage+"%, rgba(0,0,0,0.5) "+buffs[b].percentage+"%)" 
    if (buffs[b].left <= 0) {did(buffs[b].id+'buff').remove(); buffs[b].left=buffs[b].timer; buffs[b].active=0; resetTooltip();}
    }   
   }} 
}

var foodCD = false;
function buffFood(strenght, time){
    foodCD = true;
    foodRegen = strenght
    setTimeout(function () { foodRegen = 0; foodCD = false; statsUpdate(); updateStats()}, time);
    statsUpdate()
    updateStats()
}

function playerItemAnimation(){
    did("rpgPlayerImg").style.animation="flash 0.5s 1";
    setTimeout(function () { did("rpgPlayerImg").style.animation=""; }, 510);
}

//----------------------==========================-----------------------
//----------------------======INITIALIZATION======-----------------------
//----------------------==========================-----------------------

function updateStats(){
    did("statsHealth").textContent = playerMaxHp;
    did("statsRegen").textContent = playerHpRegen;
    did("statsPhysAttack").textContent = playerPhysAttack;
    did("statsRangedAttack").textContent = playerRangedAttack;
    did("statsMagicAttack").textContent = playerMagicAttack;
    did("statsPhysDefense").textContent = playerPhysDefense;
    did("statsRangedDefense").textContent = playerMagicDefense;
    did("statsMagicDefense").textContent = playerRangedDefense;
    did("statsHaste").textContent = rpgPlayer.haste;
    did("statsTempo").textContent = rpgPlayer.tempo;
    did('turtleName2').textContent = stats.turtleName;
    did('turtleLevel').textContent = "LvL ["+rpgPlayer.level+"]";
    
}


document.addEventListener('DOMContentLoaded', rpgInitialization);

//this hack activates on click the tab once and calls armor initialisation. one sidenote of this is that armor stats wont be gained until the player loads the tab!!!
document.addEventListener('DOMContentLoaded', rpgGearHack); 
function rpgGearHack(){
if (settings.currentCategory !== "rpgContainer"){
did('rpgTab').addEventListener('click', function() {
    setTimeout(initGearAll, 1000);
    },{ once: true });
}}

function rpgInitialization(){
    currentHP = 0; //esentially kills the enemy on start to kick off enemyspawn
    enemySpawn();
    statsUpdate();
    updateStats();
    hpRegen();
    if (settings.currentCategory === "rpgContainer") setTimeout(initGearAll, 1000);
    switchArea()
}

