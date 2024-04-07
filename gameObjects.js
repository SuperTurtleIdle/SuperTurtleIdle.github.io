//#region Update stats for everything


const stampIcon = '<img src="img/src/icons/stamp.png">';
const mightIcon = '<img src="img/src/icons/might.png">';
const natureIcon = '<img src="img/src/icons/nature.png">';
const elementalIcon = '<img src="img/src/icons/elemental.png">';
const occultIcon = '<img src="img/src/icons/occult.png">';
const deificIcon = '<img src="img/src/icons/deific.png">';
const thiefIcon = '<img src="img/src/talents/TG1B.jpg">';
const coinIcon = '<img src="img/src/icons/coin.png">';
const expIcon = '<img src="img/src/icons/xp.png">';
const scalingIcon = '<img style="border-color: gold" src="img/src/icons/scaling.jpg">';
const honorIcon = '<img src="img/src/icons/honor.jpg">';


const collectibleChance1 = 1000;
const collectibleChance2 = 7000;
const collectibleChance3 = 30000;

function itemIcon(id){
  return '<img style="border-color: '+returnQualityColor(items[id].quality)+' " src="img/src/items/'+id+'.jpg">'
}

function beautify(number) { 

  if (number >= 1000000000) {
    if (number % 1000000000) {return (number / 1000000000).toFixed(1) + "B";}
    else {return (number / 1000000).toFixed(0) + "B";}
  }

  else if (number >= 1000000) {
      if (number % 1000000) {return (number / 1000000).toFixed(1) + "M";}
      else {return (number / 1000000).toFixed(0) + "M";}
    }
    
  else if (number >= 1000) {
      if (number % 1000) {return (number / 1000).toFixed(1) + "K";}
      else {return (number / 1000).toFixed(0) + "K";}
    }
  
  else {
      return Math.round(number).toString();
    }
  };

function rng(min, max) { //gives a random number between the two
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var stats = {
    startedSince: 0, totalBuildings: 0, totalUpgrades: 0, activeSeconds: 0, totalSeconds: 0, clickCount: 0, totalCoins: 0, totalResources: 0, totalSupplies: 0, totalEnergy: 0, turtleName: 'Jeffrey', totalCoinsClick: 0, currentClickCoin: 0, logsGot: 0, timesDied:0, currentCategory: "rpgContainer", totalExp: 0,mailUnread : false,
    };

var unlocks ={ 
    penguins:0, journal:false, jobs:false, book2: false, autoclicker:false, skills:false, magic:false, dungeons: false, garrison: false,
}

var rpgPlayer = {
    hp: 100,
    baseHaste:2000, 
    alive:true,
    feetSlot: 'none', 
    headSlot: 'none',
    legsSlot: 'none',
    handsSlot: 'none',
    chestSlot: 'none',
    ringSlot: 'none',
    weaponSlot: 'none',
    trinketSlot: 'none',
    area: 'A1',
    currentJob: 'blacksmith',
    coins:0,
    baseStrength: 13,
    baseMaxHp: 100,
    baseHpRegen: 10,
    align: 'none',
    skill0: "none",
    skill1: "none",
    skill2: "none",
    skill3: "none",
    skill4: "none",
    mana: 100,
    talentProgress : 0,
    talentPoints: 1,
    totalTalentPoints: 1,
    honor: 0,
    gladiatorRank: 1,

}

var currentSort ="all";

//#region variable hell

var weaponNatureDamage = 0;
var weaponMightDamage = 0;
var weaponElementalDamage = 0;
var weaponDeificDamage = 0;
var weaponOccultDamage = 0;


var additiveRegen = 0;
var armorAdditiveRegen = 0;

var headAdditiveRegen = 0;
var chestAdditiveRegen = 0;
var feetAdditiveRegen = 0;
var legsAdditiveRegen = 0;
var handsAdditiveRegen = 0;
var ringAdditiveRegen = 0;

var headAdditiveMightDamage = 0;
var chestAdditiveMightDamage = 0;
var feetAdditiveMightDamage = 0;
var legsAdditiveMightDamage = 0;
var handsAdditiveMightDamage = 0;
var ringAdditiveMightDamage = 0;

var headAdditiveNatureDamage = 0;
var chestAdditiveNatureDamage = 0;
var feetAdditiveNatureDamage = 0;
var legsAdditiveNatureDamage = 0;
var handsAdditiveNatureDamage = 0;
var ringAdditiveNatureDamage = 0;

var headAdditiveOccultDamage = 0;
var chestAdditiveOccultDamage = 0;
var feetAdditiveOccultDamage = 0;
var legsAdditiveOccultDamage = 0;
var handsAdditiveOccultDamage = 0;
var ringAdditiveOccultDamage = 0;

var multiplicativeRegen = 1;
var playerHpRegen = 0;

var additiveNatureDamage = 0;
var multiplicativeNatureDamage = 1;
var playerTotalNatureDamage = 0

var additiveMightDamage = 0;
var multiplicativeMightDamage = 1;
var playerTotalMightDamage = 0

var additiveElementalDamage = 0;
var multiplicativeElementalDamage = 1;
var playerTotalElementalDamage = 0

var additiveOccultDamage = 0;
var multiplicativeOccultDamage = 1;
var playerTotalOccultDamage = 0

var additiveDeificDamage = 0;
var multiplicativeDeificDamage = 1;
var playerTotalDeificDamage = 0

var additiveCoinsPerClick = 0;
var multiplicativeCoinsPerClick = 0;
var playerCoinsPerClick = 0;

var additiveMaxHp = 0;

var headAdditiveMaxHp = 0;
var chestAdditiveMaxHp = 0;
var feetAdditiveMaxHp = 0;
var legsAdditiveMaxHp = 0;
var handsAdditiveMaxHp = 0;
var ringAdditiveMaxHp = 0;

var armorAdditiveMaxHp = 0;
var multiplicativeMaxHp = 1
var playerMaxHp = 0;

var multiplicativeStrength = 1;
var playerStrength = 0;

var additiveHaste = 0;
var multiplicativeHaste = 0;
var playerHaste = 2000;
var weaponHaste = 0;


var additiveMiningDamage= 0;
var multiplicativeMiningDamage= 1;
var playerMiningDamage = 0;

var baseFishingLevel= 0;
var additiveFishingLevel= 0;
var playerFishingLevel = 0;

var playerMaxStack = 2147483647;

var multiplicativeDropChance = 1;
var multiplicativeEXPGain = 1;

//stamps apply multiplicative bonuses
var natureStampStatUp = 1
var mightStampStatUp = 1
var elementalStampStatUp = 1
var occultStampStatUp = 1
var deificStampStatUp = 1
var critStampStatUp = 1
var multihitStampStatUp = 1

var multiplicativeCritChance = 1;
var playerCritChance = 0;
var playerMultihit = 0;

var tierMaxHp = 0;

var additiveMaxMana = 0;
var multiplicativeMaxMana = 1;
var playerMaxMana = 100;
var playerManaRegen = 0.2;

var playerClickRate = 100

var playerPresentsMinigame = 6
var playerPresentMinigameTimer = 1200
let activeBuffs = 0

var multiplicativePenguinPower = 1
var playerPenguinPower = 100

var weaponPower = 0;

var clothTier = 0
var exlorerTier = 0

var armorMightDamage = 0;
var armorNatureDamage = 0;
var weaponMiningDamage = 0;

let multiplicativeSellValue = 0;

let disableArmory = false;

let multiplicativeHealingItems = 0;

let playerGatheringLevel = 0;
let weaponGatheringLevel = 0;

//#endregion

function statsUpdate(){

  for (i in talent) { if ('logic' in talent[i] && talent[i].active) talent[i].statUp = eval(talent[i].logic); } //keeps updated all the statups of all skills, pretty poggies if you ask me
  
  activeBuffs = 0
  for (i in buffs) if (buffs[i].time>0) {activeBuffs++;}
  
buildings.B1.statUp = buildings.B1.level * 0.05 //hp
buildings.B2.statUp = buildings.B2.level * 0.05 //regen
buildings.B3.statUp = buildings.B3.level * 0.06 //str
//buildings.B4.statUp = buildings.B4.level * 0.04
//buildings.B6.statUp = buildings.B6.level * 0.06
buildings.B7.statUp = buildings.B7.level * 0.1 //penguin

if (currentSet === "cloth") {clothTier = 250} else {clothTier = 0}
if (currentSet === "explorer") {exlorerTier = 200} else {exlorerTier = 0}

multiplicativeHealingItems = 1 + items.I282.statUp;

let collectionRelicsStatUp = relicsCollectiblesGot * 0.05; //crit chance
let collectionFishingStatUp = fishingCollectiblesGot * 0.05; //Strength
let collectionMiningStatUp = miningCollectiblesGot * 0.05; //max hp
let collectionForagingStatUp = foragingCollectiblesGot * 0.05; //drop chance


let armorymillionaireStatUp = armorymillionaireGot * 0.02; //sell value
let armoryforgottenStatUp = armoryforgottenGot * 0.1; //drop chance
let armorymasterworkStatUp = armorymasterworkGot * 0.05; //max hp
let armorybeastfallenStatUp = armorybeastfallenGot * 0.05; //exp rate
let armoryreveredStatUp = armoryreveredGot * 0.05; //max sp
let armorysolsticeStatUp = armorysolsticeGot * 0.03; //crit chance

if (disableArmory){
  armorymillionaireStatUp = 0;
  armoryforgottenStatUp = 0;
  armorymasterworkStatUp = 0;
  armorybeastfallenStatUp = 0;
  armoryreveredStatUp = 0;
  armorysolsticeStatUp = 0;
  }

multiplicativeSellValue = 1 + armorymillionaireStatUp;

multiplicativeDropChance = 1 + items.I11.statUp + buffs.B11.statUp + sakuraDropUp + buffs.B24.statUp + talent.TA1E.statUp + talent.TG3.statUp + buffs.B36.statUp + items.I184.statUp + buffs.B55.statUp + collectionForagingStatUp + armoryforgottenStatUp + talent.TG2E.statUp + buffs.B29.statUp + buffs.B63.statUp

multiplicativeEXPGain = 1 + bluemoonExpUp + buffs.B9.statUp + buffs.B10.statUp + buffs.B23.statUp + items.I172.statUp + buffs.B35.statUp + items.I193.statUp + armorybeastfallenStatUp + talent.TI2C.statUp + talent.TI0D.statUp

armorAdditiveMaxHp = headAdditiveMaxHp + chestAdditiveMaxHp + legsAdditiveMaxHp + feetAdditiveMaxHp + handsAdditiveMaxHp + ringAdditiveMaxHp
additiveMaxHp = armorAdditiveMaxHp + buffs.B1.statUp + clothTier
multiplicativeMaxHp = 1 + (buildings.B1.statUp + talent.TA2.statUp + buffs.B12.statUp + collectionMiningStatUp + armorymasterworkStatUp)
playerMaxHp = (rpgPlayer.baseMaxHp + additiveMaxHp) * (multiplicativeMaxHp);

multiplicativeStrength = 1 + talent.TI1C.statUp + buildings.B3.statUp + buffs.B45.statUp + collectionFishingStatUp + buffs.B61.statUp
playerStrength = rpgPlayer.baseStrength * multiplicativeStrength;
playerMultihit = 1 * multihitStampStatUp;

multiplicativeCritChance = 1 + talent.TA1C.statUp + talent.TI0E.statUp + buffs.B46.statUp + collectionRelicsStatUp + buffs.B62.statUp  + armorysolsticeStatUp + items.I15.statUp
playerCritChance = multiplicativeCritChance * critStampStatUp;

multiplicativeNatureDamage = (1 + buffs.B4.statUp + buffs.B15.statUp + items.I44.statUp + buffs.B18.statUp + buffs.B19.statUp + talent.TI1B.statUp + talent.TI3.statUp) * natureStampStatUp;
armorNatureDamage = headAdditiveNatureDamage + chestAdditiveNatureDamage + legsAdditiveNatureDamage + feetAdditiveNatureDamage + handsAdditiveNatureDamage + ringAdditiveNatureDamage
additiveNatureDamage = weaponNatureDamage + armorNatureDamage+ exlorerTier
playerTotalNatureDamage = (playerStrength/10 + additiveNatureDamage) * multiplicativeNatureDamage;

multiplicativeMightDamage = (1 + buffs.B5.statUp + buffs.B13.statUp + buffs.B18.statUp + buffs.B21.statUp + talent.TG2C.statUp + items.I45.statUp) * mightStampStatUp;
armorMightDamage = headAdditiveMightDamage + chestAdditiveMightDamage + legsAdditiveMightDamage + feetAdditiveMightDamage + handsAdditiveMightDamage + ringAdditiveMightDamage
additiveMightDamage = weaponMightDamage + armorMightDamage
playerTotalMightDamage = (playerStrength/10 + additiveMightDamage) * multiplicativeMightDamage;

multiplicativeElementalDamage = (( 1 + buffs.B18.statUp) + talent.TA3.statUp + buffs.B30.statUp + items.I173.statUp + buffs.B40.statUp)* elementalStampStatUp;
additiveElementalDamage = weaponElementalDamage
playerTotalElementalDamage = (playerStrength/10 + additiveElementalDamage) * multiplicativeElementalDamage

multiplicativeOccultDamage = ( 1 + bluemoonDmgUp + buffs.B18.statUp + buffs.B20.statUp + buffs.B32.statUp + buffs.B41.statUp + items.I192.statUp + buffs.B51.statUp) * occultStampStatUp;
let armorOccultDamage = headAdditiveOccultDamage + chestAdditiveOccultDamage + legsAdditiveOccultDamage + feetAdditiveOccultDamage + handsAdditiveOccultDamage + ringAdditiveOccultDamage
additiveOccultDamage = weaponOccultDamage + armorOccultDamage
playerTotalOccultDamage = (playerStrength/10 + additiveOccultDamage) * multiplicativeOccultDamage;

multiplicativeDeificDamage = (1 + buffs.B18.statUp + buffs.B31.statUp + items.I175.statUp + buffs.B38.statUp ) * deificStampStatUp;
additiveDeificDamage = weaponDeificDamage
playerTotalDeificDamage = (playerStrength/10 + additiveDeificDamage) * multiplicativeDeificDamage;

armorAdditiveRegen = headAdditiveRegen + chestAdditiveRegen + legsAdditiveRegen + feetAdditiveRegen + handsAdditiveRegen + ringAdditiveRegen
multiplicativeRegen = 1 + buffs.B14.statUp + buildings.B2.statUp
playerHpRegen = (rpgPlayer.baseHpRegen + additiveRegen + armorAdditiveRegen) * multiplicativeRegen;

multiplicativeHaste = 1 - buffs.B7.statUp - buffs.B47.statUp
additiveHaste = weaponHaste;
playerHaste = Math.max((rpgPlayer.baseHaste - additiveHaste) * multiplicativeHaste, 500)  

multiplicativeMiningDamage = 1
additiveMiningDamage = buffs.B37.statUp + weaponMiningDamage ;
playerMiningDamage = additiveMiningDamage * multiplicativeMiningDamage;

playerGatheringLevel = 0 + weaponGatheringLevel + buffs.B37.statUp + items.I117.statUp; 

additiveFishingLevel = 0 + items.I182.statUp + buffs.B22.statUp + buffs.B14.statUp;
playerFishingLevel = baseFishingLevel + additiveFishingLevel + rainFishingUp;

additiveCoinsPerClick = items.I113.statUp + items.I124.statUp + items.I128.statUp +  items.I202.statUp
multiplicativeCoinsPerClick = 1 + buffs.B8.statUp + buffs.B25.statUp + buffs.B26.statUp + talent.TA1B.statUp + talent.TG1.statUp
playerCoinsPerClick = (10 + additiveCoinsPerClick) * multiplicativeCoinsPerClick;

playerClickRate = 100 / ( 1 + ( buffs.B27.statUp + buffs.B28.statUp ))

additiveMaxMana = 100 + talent.TA0C.statUp + talent.TG2E.statUp;
multiplicativeMaxMana = 1 + talent.TA1G.statUp + talent.TG1E.statUp + armoryreveredStatUp
playerMaxMana = additiveMaxMana * multiplicativeMaxMana

playerPresentsMinigame = 6 + talent.TA0B.statUp + talent.TG1D.statUp + talent.TI0B.statUp + items.I217.statUp
playerPresentMinigameTimer = 1200 * (1+talent.TG0B.statUp)

multiplicativePenguinPower = 1 + buildings.B7.statUp
playerPenguinPower = 100 * multiplicativePenguinPower

playerManaRegen = playerMaxMana*0.002;

setTimeout(() => {if (rpgPlayer.hp > playerMaxHp) { rpgPlayer.hp = playerMaxHp }  }, 400); //prevents overhealing
     
totalArmoryGot = armoryheirloomGot+armorymillionaireGot+armoryforgottenGot+armorymasterworkGot+armorybeastfallenGot+armoryreveredGot+armorysolsticeGot
totalArmory = armoryheirloomTotal+armorymillionaireTotal+armoryforgottenTotal+armorymasterworkTotal+armorybeastfallenTotal+armoryreveredTotal+armorysolsticeTotal
   
     
}

//----------------------==========================-----------------------
//----------------------==========ENEMIES=========-----------------------
//----------------------==========================-----------------------
//#region Enemies
var enemies = {}


var miningCollectibles = { 
  I241:{P:collectibleChance1,A:1, R:"low"}, //tiger eye
  I227:{P:collectibleChance1,A:1, R:"low"}, //ruby
  I228:{P:collectibleChance1,A:1, R:"low"}, //topaz
  I233:{P:collectibleChance1,A:1, R:"low"}, //sapphire

  I226:{P:collectibleChance2,A:1, R:"medium"}, //diamond
  I229:{P:collectibleChance2,A:1, R:"medium"}, //turqueosite
  I230:{P:collectibleChance2,A:1, R:"medium"}, //peridot
  I231:{P:collectibleChance2,A:1, R:"medium"}, //feldespate
  I232:{P:collectibleChance2,A:1, R:"medium"}, //raritarium
  I234:{P:collectibleChance2,A:1, R:"medium"}, //gammanite
  I237:{P:collectibleChance2,A:1, R:"medium"}, //pointy
  I238:{P:collectibleChance2,A:1, R:"medium"}, //chromatic
  I240:{P:collectibleChance2,A:1, R:"medium"}, //taoline

  I235:{P:collectibleChance3,A:1, R:"high"}, //stardustite
  I236:{P:collectibleChance3,A:1, R:"high"}, //twilight
  I239:{P:collectibleChance3,A:1, R:"high"}, //xyzite
}


var foragingCollectibles = { 
  I265:{P:collectibleChance1,A:1, R:"low"}, //grasshopper
  I266:{P:collectibleChance1,A:1, R:"low"}, //moth
  I267:{P:collectibleChance1,A:1, R:"low"}, //bee
  I269:{P:collectibleChance1,A:1, R:"low"}, //ladybug
  
  I268:{P:collectibleChance2,A:1, R:"medium"}, //tarantula
  I270:{P:collectibleChance2,A:1, R:"medium"}, //butterfly
  I271:{P:collectibleChance2,A:1, R:"medium"}, //stick bug
  I272:{P:collectibleChance2,A:1, R:"medium"}, //beetle
  I274:{P:collectibleChance2,A:1, R:"medium"}, //firefly
  I277:{P:collectibleChance2,A:1, R:"medium"}, //sparx
  I278:{P:collectibleChance2,A:1, R:"medium"}, //pulga
  
  I273:{P:collectibleChance3,A:1, R:"high"}, //hypnomoth
  I275:{P:collectibleChance3,A:1, R:"high"}, //void beetle
  I276:{P:collectibleChance3,A:1, R:"high"}, //crystal scorpion
  I279:{P:collectibleChance3,A:1, R:"high"}, //error
}

var fishingCollectibles = { 
  I243:{P:collectibleChance1,A:1, R:"low"}, //koi
  I248:{P:collectibleChance1,A:1, R:"low"}, //jellyfish
  I249:{P:collectibleChance1,A:1, R:"low"}, //spectrefish
  I244:{P:collectibleChance1,A:1, R:"low"}, //fishbag

  I242:{P:collectibleChance2,A:1, R:"medium"}, //eel
  I245:{P:collectibleChance2,A:1, R:"medium"}, //pulpo
  I247:{P:collectibleChance2,A:1, R:"medium"}, //fish snack
  I251:{P:collectibleChance2,A:1, R:"medium"}, //catfish
  I253:{P:collectibleChance2,A:1, R:"medium"}, //blobfish
  I254:{P:collectibleChance2,A:1, R:"medium"}, //seahorse
  I256:{P:collectibleChance2,A:1, R:"medium"}, //pufferfish
    
  I255:{P:collectibleChance3,A:1, R:"high"}, //lava eel
  I250:{P:collectibleChance3,A:1, R:"high"}, //axolotl
  I249:{P:collectibleChance3,A:1, R:"high"}, //goldfish
  I252:{P:collectibleChance3,A:1, R:"high"}, //blobfish baby
}

function bestiaryItem(id, tag){

if (items[id].gotOnce && tag==="rare") { return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>★⠀<img src="img/src/items/'+id+'.jpg">'+items[id].name }
else if (items[id].gotOnce) { return '<FONT COLOR='+returnQualityColor(items[id].quality)+'><img src="img/src/items/'+id+'.jpg">'+items[id].name }
else return '<FONT COLOR="#707070"> ?????'

}

function bestiaryReveal(content, enemyid, kills){

  if (enemies[enemyid].killCount>=kills) { return '<FONT COLOR="#707070"> '+content }
  else return '<FONT COLOR="#707070"> [??%]'
  
}

function bestiaryTag(tag, color){
  if (color !== undefined) return '<div style=" text-align: center;background:'+color+'; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450; margin:2% 0;">'+tag+'</div>'
 else return '<div style=" text-align: center;background:#516385; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450; margin:2% 0;">'+tag+'</div>'
 
}

enemies.E1 = {};
enemies.E1.name = 'Caulislug';
enemies.E1.level = '[lvl 1]';
enemies.E1.hp = 59;
enemies.E1.description = 'A slug so passionate about vegetables that he raised one on its shell. Scientists are in absolute awe.'
enemies.E1.area = 'A1';
enemies.E1.attack = 6;
enemies.E1.difficulty = 'easy';
enemies.E1.exp = 15;
enemies.E1.drop = "dropItem('I1'); rollTable(area1Loot, 1)";
enemies.E1.dropDesc = '<FONT COLOR="white">[Slug Meat]';
enemies.E1.align = 'nature';
enemies.E1.bestiaryItem = 'bestiaryItem("I1")';

var ribullRareDrop = { I59:{P:150, A:1}}
enemies.E3 = {};
enemies.E3.name = 'Ribull';
enemies.E3.level = '[lvl 4]';
enemies.E3.hp = 400;
enemies.E3.description = 'Recognized for their loud croaking sound, numerous noise complaints have been filled wherever they reside. But they never listen...'
enemies.E3.area = 'A1';
enemies.E3.attack = 180;
enemies.E3.difficulty = 'medium';
enemies.E3.exp = 80;
enemies.E3.drop =  "dropItem('I51'); rollTable(area1Loot, 1); rollTable(ribullRareDrop, 1)";
enemies.E3.dropDesc = '<FONT COLOR="white">[Frog Leg]<br><FONT COLOR="#1EFF0C">★ eval(bestiaryItem("I59"))'
enemies.E3.align = 'nature';
enemies.E3.bestiaryItem = 'bestiaryItem("I51")+"<br>"+bestiaryItem("I59","rare")+bestiaryReveal("[0.67%]", "E3", 1000)';

enemies.E2 = {}; 
enemies.E2.name = 'Stinglet';
enemies.E2.level = '[lvl 7]';
enemies.E2.hp = 590;
enemies.E2.description = 'It is said that the poison of these scorpids is more lethal the whiter their tails are. It also kinda looks like a baguette.'
enemies.E2.area = 'A1';
enemies.E2.attack = 250; 
enemies.E2.exp = 120;
enemies.E2.difficulty = 'hard';
enemies.E2.drop = "dropItem('I37'); rollTable(area1Loot, 1)";
enemies.E2.dropDesc = '<FONT COLOR="white">[White Stinger]'
enemies.E2.align = 'nature';
enemies.E2.bestiaryItem = 'bestiaryItem("I37")';

enemies.E13 = {};
enemies.E13.name = 'Copper Vein';
enemies.E13.level = '';
enemies.E13.difficulty = 'ore';
enemies.E13.area = 'A1';
enemies.E13.hp = 100;
enemies.E13.description = 'A rich mineral deposit containing soft metals.'
enemies.E13.exp = 60;
enemies.E13.drop = "dropItem('I32'); rollTable(area1Loot, 1); rollTable(miningCollectibles, 1)";
enemies.E13.dropDesc = '<FONT COLOR="white">[Copper Ore]';
enemies.E13.tag = "ore"
enemies.E13.gatheringLevel = 1;
enemies.E13.bestiaryItem = 'bestiaryTag("Requires: ⛏️ Gathering Level 1")+bestiaryItem("I32")';


var hoopperoonaLoot = { I107:{P:1, A:1}}
enemies.E4 = {};
enemies.E4.name = 'Hoopperoona';
enemies.E4.level = '[lvl 10]';
enemies.E4.hp = 7000;
enemies.E4.area = 'A1';
//enemies.E4.description = 'An overgrown arachnid that doesn\'t seem too up for conversation.<br><br><span class="logStat">[Skills]</span><FONT COLOR="#93b56e"><br>❖ Fleming Bite: Applies poison on attack';
enemies.E4.description = 'An overgrown arachnid that doesn\'t seem too up for conversation.';
enemies.E4.attack = 350;
enemies.E4.exp = 9500;
enemies.E4.attackChance = 'if (rng(1,5)===1) castHoopperoona1()';
enemies.E4.drop = "rollTable(hoopperoonaLoot, 1)";
enemies.E4.dropDesc = '<FONT COLOR="#1EFF0C">★ [Wolf Spider Cache]'
enemies.E4.align = 'occult';
enemies.E4.tag = 'areaBoss';
enemies.E4.bigEnemy = true;
enemies.E4.bestiarySkills = "❖ Fleming Bite: Applies poison on attack.";
enemies.E4.bestiaryItem = 'bestiaryItem("I107","rare")';
enemies.E4.bestiaryLoot = 'I107';

var jabbitRareDrop = { I69:{P:400, A:1}}
enemies.E5 = {};
enemies.E5.name = 'Jabbit';
enemies.E5.level = '[lvl 11]';
enemies.E5.hp = 840;
enemies.E5.description = 'Although it lacks poison or claws, does it really look like it couldn\'t hurt you?'
enemies.E5.area = 'A2';
enemies.E5.attack = 315;
enemies.E5.exp = 380;
enemies.E5.difficulty = 'easy';
enemies.E5.drop =  "dropItem('I114'); rollTable(area2Loot, 1); rollTable(jabbitRareDrop, 1)";
enemies.E5.dropDesc = '<FONT COLOR="white">[Rabbit Hide]<br><FONT COLOR="#1EFF0C">★ [Boxing Gloves]'
enemies.E5.align = 'might';
enemies.E5.bestiaryItem = 'bestiaryItem("I114")+"<br>"+bestiaryItem("I69","rare")+bestiaryReveal("[0.25%]", "E5", 1000)';

enemies.E6 = {};
enemies.E6.name = 'Karateil';
enemies.E6.level = '[lvl 14]';
enemies.E6.hp = 4500;
enemies.E6.description = 'A common red squirrel that has found its ways into martial arts. Not so common anymore.'
enemies.E6.area = 'A2';
enemies.E6.attack = 1400;
enemies.E6.exp = 1312;
enemies.E6.difficulty = 'medium';
enemies.E6.align = 'nature';
enemies.E6.drop =  "dropItem('I115'); rollTable(area2Loot, 1);";
enemies.E6.dropDesc = '<FONT COLOR="white">[Acorn]'
enemies.E6.bestiaryItem = 'bestiaryItem("I115")';

enemies.E7 = {};
enemies.E7.name = 'Roostrika';
enemies.E7.level = '[lvl 17]';
enemies.E7.hp = 8000;
enemies.E7.description = 'A hen proeficient in full body combat. This one doesn\'t even want to cross the road.'
enemies.E7.area = 'A2';
enemies.E7.attack = 2200;
enemies.E7.exp = 4366;
enemies.E7.difficulty = 'hard';
enemies.E7.align = 'nature';
enemies.E7.drop =  "dropItem('I25'); rollTable(area2Loot, 1);";
enemies.E7.dropDesc = '<FONT COLOR="white">[Feather Pinion]'
enemies.E7.bestiaryItem = 'bestiaryItem("I25")';

enemies.E14 = {};
enemies.E14.name = 'Snapthorn Briar';
enemies.E14.level = '';
enemies.E14.difficulty = 'herb';
enemies.E14.area = 'A2';
enemies.E14.hp = 100;
enemies.E14.description = 'A lush and bountiful briar containing many kinds of rare herbs with many applications.'
enemies.E14.exp = 620;
enemies.E14.drop = "dropItem('I38'); rollTable(area2Loot, 1); rollTable(foragingCollectibles, 1)";
enemies.E14.dropDesc = '<FONT COLOR="white">[Dayleaf]';
enemies.E14.gatheringLevel = 1;
enemies.E14.bestiaryItem = 'bestiaryTag("Requires: ⛏️ Gathering Level 2")+bestiaryItem("I38")';

var enemyDamageMultiplier = 1;
var enemyDefenseMultiplier = 1;
var enemyPhase = 1;
var kingKatLoot = { I53:{P:1, A:1}}
enemies.E8 = {};
enemies.E8.name = 'King-Kat';
enemies.E8.level = '[lvl 20]';
enemies.E8.hp = 150000;
enemies.E8.description = 'King of the jungle and king of all fighting styles. Try hitting its weakness.';
enemies.E8.attack = 4500;
enemies.E8.area = 'A2';
enemies.E8.exp = 550000;
enemies.E8.attackChance = ' if(rng(1,4)===1) {castKingKat1()} if (currentHP < enemies.E8.hp*0.4 && enemyPhase===1){ enemyPhase=2; castKingKat2() }';
enemies.E8.defenseChance = ' if(rpgPlayer.weaponSlot==="I60") {logs.P39.unlocked=true;}';
enemies.E8.align = 'nature';
enemies.E8.drop =  "rollTable(kingKatLoot, 1);";
enemies.E8.dropDesc = '<FONT COLOR="#1EFF0C">★ [Jungle King Cache]';
enemies.E8.tag = 'areaBoss';
enemies.E8.bigEnemy = true;
enemies.E8.bestiarySkills = '❖ King Punch: Moderate Might Damage.<br>❖ [When below 40% HP] Enrage: Increase attack by 40%.';
enemies.E8.bestiaryItem = 'bestiaryItem("I53","rare")';
enemies.E8.bestiaryLoot = 'I53';

enemies.E9 = {};
enemies.E9.name = 'Picore';
enemies.E9.level = '[lvl 21]';
enemies.E9.hp = 9000;
enemies.E9.description = 'A cute square monster that likes to mine rocks. He doesn\'t do it with any purpose in mind, he just likes to do so.'
enemies.E9.area = 'A3';
enemies.E9.attack = 3400;
enemies.E9.exp = 12000;
enemies.E9.difficulty = 'easy';
enemies.E9.align = 'elemental';
enemies.E9.drop =  "dropItem('I16'); rollTable(area3Loot, 1)";
enemies.E9.dropDesc = '<FONT COLOR="white">[Yellow Cube]<br>'+thiefIcon+'<FONT COLOR="#68FEBE"> Unique loot can be stolen'
enemies.E9.bestiaryItem = 'bestiaryItem("I16")+"<br>"+bestiaryTag("Steal")+bestiaryItem("I24", "rare")+bestiaryReveal("[2.2%]", "E9", 1000)';

enemies.E10 = {};
enemies.E10.name = 'Cubomite';
enemies.E10.level = '[lvl 24]';
enemies.E10.hp = 28000;
enemies.E10.description = 'A monster with a highly volatile personality. If attacked with elemental damage, well, why don\'t you try it out for yourself?'
enemies.E10.area = 'A3';
enemies.E10.attack = 8000;
enemies.E10.exp = 44000;
enemies.E10.difficulty = 'medium';
enemies.E10.align = 'deific';
enemies.E10.drop =  "dropItem('I29'); rollTable(area3Loot, 1)";
enemies.E10.dropDesc = '<FONT COLOR="white">[Gunpowder]'
enemies.E10.bestiaryItem = 'bestiaryItem("I29")'

enemies.E29 = {};
enemies.E29.name = 'Royal Pudding';
enemies.E29.level = '[lvl 35]';
enemies.E29.hp = 480000;
enemies.E29.description = 'A pink round jelly that is as dangerous as it is delicious. Do not let the intrusive thoughts win.'
enemies.E29.attack = 15000;
enemies.E29.exp = 0;
enemies.E29.area = 'A7';
enemies.E29.align = 'deific';
enemies.E29.tag = "showdownBoss";
enemies.E29.attackChance = 'if (rng(1,5)===1){ castRoyalPudding1() }'
enemies.E29.showdown = "S1";
enemies.E29.bestiaryItem = '"None"';
enemies.E29.bestiarySkills = "❖ Gelitic Shot: Medium Deific Damage.";

enemies.E11 = {};
enemies.E11.name = 'Granite Elemental';
enemies.E11.level = '[lvl 27]';
enemies.E11.hp = 55000;
enemies.E11.description = 'Sentient mineral rock that has taken a monstruous shape. Every geologist\'s dream. Probably.'
enemies.E11.area = 'A3';
enemies.E11.attack = 20000;
enemies.E11.exp = 152000;
enemies.E11.difficulty = 'hard';
enemies.E11.align = 'might';
enemies.E11.drop =  "dropItem('I17'); rollTable(area3Loot, 1);";
enemies.E11.dropDesc = '<FONT COLOR="white">[Granite Splinter]'
enemies.E11.bestiaryItem = 'bestiaryItem("I17")'

enemies.E19 = {};
enemies.E19.name = 'Arcanite Vein';
enemies.E19.level = '';
enemies.E19.difficulty = 'ore';
enemies.E19.area = 'A3';
enemies.E19.hp = 100;
enemies.E19.description = 'An ore pulsating with latent electromagnetic energy, coveted by mages and engineers alike.'
enemies.E19.exp = 180283;
enemies.E19.drop = "dropItem('I36'); rollTable(area3Loot, 1);  rollTable(miningCollectibles, 1)";
enemies.E19.dropDesc = '<FONT COLOR="white">[Arcanite Ore]';
enemies.E19.tag = "ore";
enemies.E19.gatheringLevel = 2;
enemies.E19.bestiaryItem = 'bestiaryTag("Requires: ⛏️ Gathering Level 2")+bestiaryItem("I36")';

enemies.E22 = {};
enemies.E22.name = 'Pringu Soldier';
enemies.E22.level = '[lvl 30]';
enemies.E22.hp = 70000;
enemies.E22.description = 'A fierce warrior of the Pringu Army. They are as knightly as they are cute, so they are very knightly indeed.'
enemies.E22.area = 'A5';
enemies.E22.attack = 60000;
enemies.E22.exp = 0;
enemies.E22.difficulty = 'easy';
enemies.E22.align = 'deific';
enemies.E22.bestiaryItem = '"None"';
enemies.E22.tag = 'dungeonEnemy';

var pringuEmperorDrop = { I205:{P:1, A:1} }

enemies.E23 = {};
enemies.E23.name = 'Pringu Emperor';
enemies.E23.level = '[lvl 32]';
enemies.E23.hp = 650000;
enemies.E23.description = 'He hates to lose so be prepared when his HP is low. Be sure to save all your cards until then.'
enemies.E23.attack = 50000;
enemies.E23.exp = 0;
enemies.E23.area = 'A5';
enemies.E23.align = 'deific';
enemies.E23.drop =  "rollTable(pringuEmperorDrop, 1); unlocksReveal();";
enemies.E23.dropDesc = '<FONT COLOR="#0070dd">★ [Cool Cooler]'
enemies.E23.tag = "finalBoss";
enemies.E23.attackChance = ' if (currentHP < enemies.E23.hp*0.3){ castPringuEmperor1() }';
enemies.E23.bigEnemy = true;
enemies.E23.bestiaryItem = 'bestiaryItem("I205","rare")';
enemies.E23.bestiarySkills = "❖ [When below 20% HP] Royal Authority: Heals a portion of the HP.";
enemies.E23.bestiaryLoot = 'I205';

var terragosaLoot = { I101:{P:1, A:1}}
enemies.E12 = {};
enemies.E12.name = 'Terragosa';
enemies.E12.level = '[lvl 30]';
enemies.E12.hp = 2500000;
enemies.E12.description = 'A crystalline drake formed out of sheer willpower and pressure. Be wary of its Prismatic Shift.';
enemies.E12.attack = 70000;
enemies.E12.exp = 31750000;
enemies.E12.area = 'A3';
enemies.E12.align = 'elemental';
enemies.E12.drop =  "rollTable(terragosaLoot, 1); unlocksReveal()";
enemies.E12.attackChance = 'if (rng(1,5)===1){ castTerragosa1() }else if (rng(1,8)===1){ castTerragosa2()}';
enemies.E12.tag = 'areaBoss';
enemies.E12.bigEnemy = true;
enemies.E12.bestiaryItem = 'bestiaryItem("I101","rare")';
enemies.E12.bestiarySkills = "❖ Razor Claws: Low Might Damage.<br>❖ Crystal Breath: Moderate Elemental Damage.<br>❖ [When attacked with Might Damage] Prismatic Shift: Increase attack by 1600%.";
enemies.E12.bestiaryLoot = 'I101';

enemies.E28 = {};
enemies.E28.name = 'Dai-Goran';
enemies.E28.level = '[lvl 37]';
enemies.E28.hp = 4500000;
enemies.E28.description = 'A legendary creature revered as a god of an ancient tribe.'
enemies.E28.attack = 100000;
enemies.E28.exp = 0;
enemies.E28.area = 'A7';
enemies.E28.align = 'deific';
enemies.E28.tag = "showdownBoss";
enemies.E28.attackChance = 'if (rng(1,5)===1){ castDaiGoran() }'
enemies.E28.showdown = "S2";
enemies.E28.bestiaryItem = '"None"';
enemies.E28.bestiarySkills = "❖ Talon Quill: Applies Poison.";

enemies.E15 = {};
enemies.E15.name = 'Mystery Present';
enemies.E15.level = '';
enemies.E15.hp = 150;
enemies.E15.area = 'A1';
enemies.E15.difficulty = 'cache';
enemies.E15.description = 'Right Click to open it!<br>Quick, Before you "accidentally" destroy it!'
enemies.E15.exp = 1;
enemies.E15.ignoreBestiary = true;

enemies.E16 = {};
enemies.E16.name = 'Hollog';
enemies.E16.level = '[lvl 31]';
enemies.E16.hp = 650000;
enemies.E16.description = 'A stumpy fellow that, despite appearing ghastly, has no trouble in making friends.'
enemies.E16.area = 'A4';
enemies.E16.attack = 90000;
enemies.E16.exp = 548571;
enemies.E16.difficulty = 'easy';
enemies.E16.align = 'deific';
enemies.E16.drop =  "dropItem('I40'); rollTable(area4Loot, 1)";
enemies.E16.bestiaryItem = 'bestiaryItem("I40")';

enemies.E17 = {};
enemies.E17.name = 'Caladora';
enemies.E17.level = '[lvl 34]';
enemies.E17.hp = 850000;
enemies.E17.description = 'A genetic monstrosity between a pumpking and a dragon. On second thought, it looks kind of cute.'
enemies.E17.area = 'A4';
enemies.E17.attack = 140000;
enemies.E17.exp = 1848571;
enemies.E17.difficulty = 'medium';
enemies.E17.align = 'deific';
enemies.E17.drop =  "dropItem('I58'); rollTable(area4Loot, 1)";
enemies.E17.bestiaryItem = 'bestiaryItem("I58")+"<br>"+bestiaryTag("Steal")+bestiaryItem("I215", "rare")+bestiaryReveal("[16%]", "E17", 1000)';

enemies.E18 = {};
enemies.E18.name = 'Morgato';
enemies.E18.level = '[lvl 37]';
enemies.E18.hp = 1300000;
enemies.E18.description = 'An amalgamation of souls manifested into corporeal form. As to why they manifested into this shape, one can only guess.'
enemies.E18.area = 'A4';
enemies.E18.attack = 180000;
enemies.E18.exp = 6228571;
enemies.E18.difficulty = 'hard';
enemies.E18.align = 'might';
enemies.E18.drop =  "dropItem('I18'); rollTable(area4Loot, 1)";
enemies.E18.attackChance = 'if (enemyPhase===1){}'
enemies.E18.bestiaryItem = 'bestiaryItem("I18")';

enemies.E30 = {};
enemies.E30.name = 'La Creatura';
enemies.E30.level = '[lvl ??]';
enemies.E30.hp = 5000000;
enemies.E30.area = 'A4';
enemies.E30.description = 'What in tarnation'
enemies.E30.attack = 4000000;
enemies.E30.exp = 1;
enemies.E30.align = 'occult';
enemies.E30.attackChance = 'playSound("audio/creatura2.mp3");';
enemies.E30.bestiaryItem = '"None"';

var fishingJunk = { I88:{P:35, A:1}, I89:{P:35, A:1}, I158:{P:35, A:1} , I216:{P:3500, A:1} /*golden trash*/ }
var fishingEeriePond1 = { I161:{P:10, A:1}, /*skelefish*/ I160:{P:20, A:1}, /*devilfish*/ I159:{P:200, A:1}, /*jellyfish*/}
var fishingEeriePond2 = { I169:{P:1000, A:1}, /*the catch*/ I117:{P:1000, A:1}, /*fosil*/ I286:{P:30, A:1}, /*quest*/}

enemies.E20 = {};
enemies.E20.name = 'Eerie Pond';
enemies.E20.level = '';
enemies.E20.difficulty = 'pond';
enemies.E20.area = 'A4';
enemies.E20.hp = 20;
enemies.E20.description = 'A shadow-laden pond cloaked in an eerie mist. Grab a fishing rod and don\'t get your hopes too high.'
enemies.E20.exp = 508571;
enemies.E20.drop = "rollTable(area4Loot, 1); rollTable(fishingJunk, 4-playerFishingLevel);  rollTable(fishingEeriePond1, playerFishingLevel); rollTable(fishingEeriePond2, -2+playerFishingLevel);  rollTable(fishingCollectibles, 1); removeTableItem()";
enemies.E20.bestiaryItem = 'bestiaryTag("Requires: 🎣 Fishing Level 1")+bestiaryItem("I161")+"⠀⠀"+bestiaryItem("I160")+"<br>"+bestiaryItem("I159")+bestiaryTag("Requires: 🎣 Fishing Level 3")+ bestiaryItem("I169")+"⠀⠀"+bestiaryItem("I117")';

//e21 is reserved for the sheep of polymorph

enemies.E24 = {};
enemies.E24.name = 'Pirate Parrot';
enemies.E24.level = '[lvl 38]';
enemies.E24.hp = 1200000;
enemies.E24.description = 'A chatty fellow tasked to guard the bar.'
enemies.E24.area = 'A6';
enemies.E24.attack = 400000;
enemies.E24.drop =  "if(rng(1,10)===1) items.I39.count++";
enemies.E24.exp = 518;
enemies.E24.difficulty = 'easy';
enemies.E24.align = 'might';
enemies.E24.bestiaryItem = 'bestiaryItem("I39","rare")+bestiaryReveal("[10%]", "E24", 200)';
enemies.E24.tag = 'dungeonEnemy';

var malvarrelDrop = { I23:{P:2, A:1} }
enemies.E25 = {};
enemies.E25.name = 'Malvarrel';
enemies.E25.level = '[lvl 40]';
enemies.E25.hp = 12000000;
enemies.E25.area = 'A6';
enemies.E25.description = 'A terrible mutation manifested by the evil deeds of pirates.'
enemies.E25.attack = 600000;
enemies.E25.exp = 518;
enemies.E25.align = 'deific';
enemies.E25.drop =  "rollTable(malvarrelDrop, 1)";
enemies.E25.dropDesc = '<FONT COLOR="#0070dd">★ [Firekeg Cannon]'
enemies.E25.tag = "stageBoss1";
enemies.E25.attackChance = ' if(rng(1,4)===1) {castMalvarrel1()} ';
enemies.E25.bigEnemy = true;
enemies.E25.bestiaryItem = 'bestiaryItem("I23","rare")+bestiaryReveal("[50%]", "E25", 10)'
enemies.E25.bestiarySkills = "❖ Booze Shot: Sprays poisonous liquor.";

var pundergeistDrop = { I206:{P:1, A:1} }
enemies.E26 = {};
enemies.E26.name = 'Cap. Plundergeist';
enemies.E26.level = '[lvl 40]';
enemies.E26.hp = 20000000;
enemies.E26.description = 'The restless spirit of the pirate captain. Be sure to not drag the fight for too long.'
enemies.E26.attack = 600000;
enemies.E26.exp = 518;
enemies.E26.area = 'A6';
enemies.E26.align = 'occult';
enemies.E26.drop =  "rollTable(pundergeistDrop, 1)";
enemies.E26.dropDesc = '<FONT COLOR="#0070dd">★ [Davy Jones Locker]'
enemies.E26.tag = "finalBoss";
enemies.E26.attackChance = 'castPlundergeist1()';
enemies.E26.bigEnemy = true;
enemies.E26.bestiaryItem = 'bestiaryItem("I206","rare")';
enemies.E26.bestiarySkills = "❖ Cursed Rend: Applies one stack of curse. You will perish at 15 stacks.";
enemies.E26.bestiaryLoot = 'I206';

var infernalusDrop = { I153:{P:1, A:1} }
enemies.E27 = {};
enemies.E27.name = 'Infernalus';
enemies.E27.level = '[lvl 40]';
enemies.E27.hp = 70000000;
enemies.E27.description = 'The lord of hellfire. Not a self-proclaimed title, but everyone just kinda agreed on it after looking at it once.'
enemies.E27.attack = 500000;
enemies.E27.area = 'A4';
enemies.E27.exp = 7000000000/4;
enemies.E27.align = 'elemental';
enemies.E27.drop =  "rollTable(infernalusDrop, 1)";
enemies.E27.dropDesc = '<FONT COLOR="#0070dd">★ [Infernal Cache]'
enemies.E27.attackChance = ' castInfernalus1(); if (currentHP < enemies.E27.hp*0.9 && enemyPhase===1) { enemyPhase=2; castInfernalus2()}  if (currentHP < enemies.E27.hp*0.4 && enemyPhase===2) { enemyPhase=3; castInfernalus2()}';
enemies.E27.tag = 'areaBoss';
enemies.E27.bigEnemy = true;
enemies.E27.bestiaryItem = 'bestiaryItem("I153","rare")';
enemies.E27.bestiarySkills = "❖ Hellfire Blast: Applies one stack of Hellfire, dealing Elemental Damage overtime.<br>❖ Jailer Sentence: Applies Silenced.";
enemies.E27.bestiaryLoot = 'I153';

var hoopperoonaJrLoot = { I221:{P:1, A:1}}
enemies.E31 = {};
enemies.E31.name = 'Hoopperoona Jr.';
enemies.E31.level = '[lvl 30]';
enemies.E31.hp = 300000;
enemies.E31.description = 'An overgrown arachnid that STILL doesn\'t seem too up for conversation.<br><br><span class="logStat">[Skills]</span><FONT COLOR="#93b56e"><br>❖ Melting Bite: Applies poison on attack';
enemies.E31.attack = 1400;
enemies.E31.exp = 9500;
enemies.E31.attackChance = 'if (rng(1,5)===1) castHoopperoonaJr1()';
enemies.E31.drop = "rollTable(hoopperoonaJrLoot, 1)";
enemies.E31.dropDesc = '<FONT COLOR="#1EFF0C">★ [Wolf Spider Cache +]'
enemies.E31.align = 'occult';
enemies.E31.tag = 'areaBoss';
enemies.E31.ignoreBestiary = true;

var kingMysterioLoot = { I53:{P:1, A:1}}
enemies.E32 = {};
enemies.E32.name = 'King-Mysterio';
enemies.E32.level = '[lvl 35]';
enemies.E32.hp = 400000;
enemies.E32.description = 'You cant put a finger on who is this mysterious warrior, but he is one fearsome fellow.<br><br><span class="logStat">[Skills]</span><FONT COLOR="#93b56e"><br>❖ Mysterio Punch: Moderate '+mightIcon+'Might Damage<br>❖ [When below 80% HP] Enrage: Increase attack by 40%';
enemies.E32.attack = 3000;
enemies.E32.exp = 550000;
enemies.E32.attackChance = ' if(rng(1,4)===1) {castKingMysterio1()} if (currentHP < enemies.E8.hp*0.8 && enemyPhase===1){ enemyPhase=2; castKingKat2() }';
enemies.E32.align = 'nature';
enemies.E32.drop =  "rollTable(kingMysterioLoot, 1);";
enemies.E32.dropDesc = '<FONT COLOR="#1EFF0C">★ [Jungle King Cache +]';
enemies.E32.tag = 'areaBoss';
enemies.E32.ignoreBestiary = true;

enemies.R1 = {};
enemies.R1.name = 'Seaprism Slug';
enemies.R1.level = '[lvl 30]';
enemies.R1.hp = 200000;
enemies.R1.attack = 100000;
enemies.R1.exp = 518;
enemies.R1.align = 'elemental';
enemies.R1.tag = "skirmish";

enemies.R2 = {};
enemies.R2.name = 'Devotree';
enemies.R2.level = '[lvl 35]';
enemies.R2.hp = 500000;
enemies.R2.attack = 200000;
enemies.R2.exp = 518;
enemies.R2.align = 'deific';
enemies.R2.tag = "wave2";
enemies.R2.showdown = "S1";

enemies.R3 = {};
enemies.R3.name = 'Fluffarose';
enemies.R3.level = '[lvl 35]';
enemies.R3.hp = 700000;
enemies.R3.attack = 600000;
enemies.R3.exp = 518;
enemies.R3.align = 'occult';
enemies.R3.tag = "wave3";
enemies.R3.showdown = "S1";

enemies.R4 = {};
enemies.R4.name = 'Plasmite';
enemies.R4.level = '[lvl 35]';
enemies.R4.hp = 1000000;
enemies.R4.attack = 700000;
enemies.R4.exp = 518;
enemies.R4.align = 'elemental';
enemies.R4.tag = "wave4";
enemies.R4.showdown = "S1";

enemies.R5 = {};
enemies.R5.name = 'Toximire';
enemies.R5.level = '[lvl 40]';
enemies.R5.hp = 2000000;
enemies.R5.attack = 900000;
enemies.R5.exp = 518;
enemies.R5.align = 'might';
enemies.R5.tag = "wave5";
enemies.R5.showdown = "S1";

enemies.R6 = {};
enemies.R6.name = 'Sandiablo';
enemies.R6.level = '[lvl 40]';
enemies.R6.hp = 3000000;
enemies.R6.attack = 1500000;
enemies.R6.exp = 518;
enemies.R6.align = 'nature';
enemies.R6.tag = "wave6";
enemies.R6.showdown = "S1";

enemies.R7 = {};
enemies.R7.name = 'Garabato';
enemies.R7.level = '[lvl 40]';
enemies.R7.hp = 4000000;
enemies.R7.attack = 1800000;
enemies.R7.exp = 518;
enemies.R7.align = 'occult';
enemies.R7.tag = "wave7";
enemies.R7.showdown = "S1";

Object.keys(enemies).forEach(function(key) {
  enemies[key].killCount = 0;  
});
//#endregion
//----------------------==========================-----------------------
//----------------------===========ITEMS==========-----------------------
//----------------------==========================-----------------------
//#region Items
var items = {}

function returnItemUpgradeScaling(baseDamage, id, type) {
  
  if (type==="high") return Math.floor((baseDamage+baseDamage*(((items[id].count-1)/3)*5)))
  else if (items[id].count===0) return Math.floor((baseDamage+baseDamage*(((1-1)/3)*1.5))) //shop display 
  else return Math.floor((baseDamage+baseDamage*(((items[id].count-1)/3)*1.5))) 
}

items.I0 = {}; 
items.I0.name = 'Missing ID!';
items.I0.description = 'Miscellaneous';
items.I0.flavor = '"You shouldnt be able to see this. If you are, I simply ducked up" -duck';
items.I0.quality = 'Poor';
items.I0.sell = 1;
items.I0.max = 1;

items.I194 = {}; 
items.I194.name = 'Mossy Supply Box';
items.I194.description = 'Material';
items.I194.flavor = '"A container with materials necessary to construct various structures."';
items.I194.quality = 'Uncommon';
items.I194.sell = 500;

items.I195 = {}; 
items.I195.name = 'Sporty Supply Box';
items.I195.description = 'Material';
items.I195.flavor = '"A container with materials necessary to construct various structures."';
items.I195.quality = 'Uncommon';
items.I195.sell = 500;

items.I196 = {}; 
items.I196.name = 'Rocky Supply Box';
items.I196.description = 'Material';
items.I196.flavor = '"A container with materials necessary to construct various structures."';
items.I196.quality = 'Uncommon';
items.I196.sell = 500;

items.I197 = {}; 
items.I197.name = 'Ghastly Supply Box';
items.I197.description = 'Material<br><FONT COLOR="coral">⚠ Not currently used in this version of the game. Not going to stop you from crafting it, though';
items.I197.flavor = '"A container with materials necessary to construct various structures."';
items.I197.quality = 'Uncommon';
items.I197.sell = 500;

items.I197A = {}; 
items.I197A.name = 'Artisan Supply Box';
items.I197A.description = 'Material';
items.I197A.flavor = '"A container with materials necessary to construct various structures."';
items.I197A.quality = 'Uncommon';
items.I197A.sell = 500;

items.I106 = {};
items.I106.name = 'Trapped Cage';
items.I106.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to summon Hoopperoona'
items.I106.flavor = '"This is going to be a terrible night..."';
items.I106.quality = 'Uncommon';
items.I106.sell = 800;

items.I127 = {};
items.I127.name = 'Black Belt';
items.I127.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to summon King-Kat'
items.I127.flavor = '"Better not to mess too much with this one."';
items.I127.quality = 'Uncommon';
items.I127.sell = 1000;

items.I163 = {};
items.I163.name = 'Crystalline Drakeling Egg';
items.I163.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to summon Terragosa'
items.I163.flavor = '"A shimmering, crystalline egg imbued with the essence of a formidable drake."';
items.I163.quality = 'Uncommon';
items.I163.sell = 1200;

items.I164 = {}; 
items.I164.name = 'Hell Bindings';
items.I164.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to summon Infernalus'
items.I164.flavor = '"Sinister prison pulsating with the anguished cries of captive souls."';
items.I164.quality = 'Uncommon';
items.I164.sell = 1500;

var meatBeat = 0

items.I1 = {};
items.I1.name = 'Slug Meat';
items.I1.description = 'Material';
items.I1.flavor = '"Seems inedible, but probably a delicatessen in some parts of France."';
items.I1.quality = 'Common';
items.I1.sell = 28;
items.I1.touch = 'playSound("audio/touchSlime.mp3"); meatBeat++';

items.I51 = {};
items.I51.name = 'Frog Leg';
items.I51.description = 'Material';
items.I51.flavor = '"A vital reagent in alchemy and the cauldrons of every self-respecting witch."';
items.I51.quality = 'Common';
items.I51.sell = 31;

items.I37 = {};
items.I37.name = 'White Stinger';
items.I37.description = 'Material';
items.I37.flavor = '"The stinger of a scorpid. Small traces of poison can be seen on the tip."';
items.I37.quality = 'Common';
items.I37.sell = 35;

items.I57 = {};
items.I57.name = 'Creeping Wolf Web';
items.I57.description = 'Material';
items.I57.flavor = '"A sprawling cobweb, intricately woven by an enormous forest-dwelling spider."';
items.I57.quality = 'Common';
items.I57.sell = 83;

items.I114 = {}; 
items.I114.name = 'Rabbit Hide';
items.I114.description = 'Material';
items.I114.flavor = '"A supple and furry hide harvested from rabbits. Regretting now is useless, the deed has been done."';
items.I114.quality = 'Common';
items.I114.sell = 38;

items.I115 = {}; 
items.I115.name = 'Acorn';
items.I115.description = 'Material';
items.I115.flavor = '"A small, nut-like seed from oak trees. Additionally, in the Squirrel Kingdom, it\'s a standard form of currency."';
items.I115.quality = 'Common';
items.I115.sell = 40;

items.I25 = {};
items.I25.name = 'Feather Pinion';
items.I25.description = 'Material';
items.I25.flavor = '"One kilogram of this weight is surprisingly the same as a lot of stuff."';
items.I25.quality = 'Common';
items.I25.sell = 42;

items.I165 = {}; 
items.I165.name = 'Chalk Dust';
items.I165.description = 'Material';
items.I165.flavor = '"A practical cloud of chalk dust for athletes. Keeps your grip solid and hands dry."';
items.I165.quality = 'Common';
items.I165.sell = 95;

items.I16 = {};
items.I16.name = 'Yellow Cube';
items.I16.description = 'Material';
items.I16.flavor = '"You feel uncomfortable carrying more than 64 of these at a time."';
items.I16.quality = 'Common';
items.I16.sell = 48;

items.I29 = {};
items.I29.name = 'Gunpowder';
items.I29.description = 'Material';
items.I29.flavor = '"Highly volatile dust primarily used for explosives."';
items.I29.quality = 'Common';
items.I29.sell = 54;

items.I17 = {};
items.I17.name = 'Granite Splinter';
items.I17.description = 'Material';
items.I17.flavor = '"A hard rock from a rock hard foe."';
items.I17.quality = 'Common';
items.I17.sell = 61;

items.I71 = {};
items.I71.name = 'Agate Crystal Scale';
items.I71.description = 'Material';
items.I71.flavor = '"A fiery red scale, hewn from a crystal dragon, pulsating with potent mystical energy."';
items.I71.quality = 'Common';
items.I71.sell = 58;

items.I40 = {};
items.I40.name = 'Spooky Wood';
items.I40.description = 'Material';
items.I40.flavor = '"An eerie, creaking log. Its ominous aura makes you feel uneasy."';
items.I40.quality = 'Common';
items.I40.sell = 72;

items.I58 = {};
items.I58.name = 'Devilish Pumpkin';
items.I58.description = 'Material';
items.I58.flavor = '"A wickedly enchanted gourd with savory dark magic sprinkled on top."';
items.I58.quality = 'Common';
items.I58.sell = 79;

items.I18 = {};
items.I18.name = 'Ruinous Soul';
items.I18.description = 'Material';
items.I18.flavor = '"Your shell quakes in fear at the echo of it."';
items.I18.quality = 'Common';
items.I18.sell = 84;

items.I100 = {};
items.I100.name = 'Nightmare Fuel';
items.I100.description = 'Material';
items.I100.flavor = '"Pure dread, harvested from the accursed grounds where nightmares manifest into tangible horrors."';
items.I100.quality = 'Common';
items.I100.sell = 21;

items.I22 = {};
items.I22.name = 'Nephrite';
items.I22.description = 'Material';
items.I22.flavor = '"An impure variety of jade. Despite that, it still can fetch a good price."';
items.I22.quality = 'Common';
items.I22.sell = 550;

items.I42 = {};
items.I42.name = 'Malachite';
items.I42.description = 'Material';
items.I42.flavor = '"A striking green mineral, prized for its vivid color and used in jewelry for centuries."';
items.I42.quality = 'Uncommon';
items.I42.sell = 2000;

items.I32 = {};
items.I32.name = 'Copper Ore';
items.I32.description = "Material";
items.I32.flavor = '"A clump of impure copper ore. For such crude ore to be helpful, it must undergo extensive refinement."';
items.I32.quality = 'Common';
items.I32.sell = 24;

items.I31 = {};
items.I31.name = 'Copper Bar';
items.I31.description = 'Material';
items.I31.flavor = '"A ductile, malleable, and highly thermal metal. Despite being very versatile, it makes for inadequate weaponry."';
items.I31.quality = 'Common';
items.I31.sell = 150;

items.I66 = {};
items.I66.name = 'Copper Plate';
items.I66.description = 'Material';
items.I66.flavor = '"Versatile material used in various crafting, valued for its strength and adaptability."';
items.I66.quality = 'Common';
items.I66.sell = 300;

items.I36 = {};
items.I36.name = 'Arcanite Ore';
items.I36.description = 'Material';
items.I36.flavor = '"A mysterious earthy chunk of marine-like shade glistening ore."';
items.I36.quality = 'Common';
items.I36.sell = 50;

items.I35 = {};
items.I35.name = 'Arcanite Bar';
items.I35.description = 'Material';
items.I35.flavor = '"It pulsates with a mystical blue hue unseen in earthly metals."';
items.I35.quality = 'Common';
items.I35.sell = 300;

items.I198 = {}; 
items.I198.name = 'Arcanite Bolts';
items.I198.description = 'Material';
items.I198.flavor = '"Screws made out of arcanite that boast better resistance and conductivity than non-fictional metals."';
items.I198.quality = 'Common';
items.I198.sell = 600;

items.I88 = {};
items.I88.name = 'Old Boot';
items.I88.description = 'Material';
items.I88.flavor = '"It\'s just trash."';
items.I88.quality = 'Poor';
items.I88.sell = 5;

items.I89 = {};
items.I89.name = 'Tin Can';
items.I89.description = 'Material';
items.I89.flavor = '"May contain beans."';
items.I89.quality = 'Poor';
items.I89.sell = 3;

items.I158 = {}; 
items.I158.name = 'Algae';
items.I158.description = 'Material';
items.I158.flavor = '"A lackluster catch."';
items.I158.quality = 'Poor';
items.I158.sell = 4;

items.I216 = {};
items.I216.name = 'Golden Trashbag';
items.I216.description = 'Miscellaneous - Treasure';
items.I216.flavor = '"One man\'s gold is another man\'s trash."';
items.I216.quality = 'Uncommon';
items.I216.sell = 500000;

items.I159 = {}; 
items.I159.name = 'Ghost Jellyfish';
items.I159.description = 'Material';
items.I159.flavor = '"A mesmerizing essence pulsates within."';
items.I159.quality = 'Rare';
items.I159.sell = 2200;

items.I160 = {}; 
items.I160.name = 'Imp Devilfish';
items.I160.description = 'Material';
items.I160.flavor = '"Doesn\'t seem like it will be easy to bring this to a plate."';
items.I160.quality = 'Uncommon';
items.I160.sell = 800;

items.I161 = {}; 
items.I161.name = 'Grimjaw Angler';
items.I161.description = 'Material';
items.I161.flavor = '"How do we cook this one."';
items.I161.quality = 'Common';
items.I161.sell = 400;

items.I38 = {};
items.I38.name = 'Dayleaf';
items.I38.description = "Material";
items.I38.flavor = '"A leaf shining as dazzling as sunlight."';
items.I38.quality = 'Common';
items.I38.sell = 39;

items.I108 = {}; 
items.I108.name = 'Dayleaf Spice';
items.I108.description = 'Material';
items.I108.flavor = '"A spice known for its sweet licorice-like flavor."';
items.I108.quality = 'Common';
items.I108.sell = 200;

items.I68 = {};
items.I68.name = 'Lesser Alchemical Dust';
items.I68.description = 'Material';
items.I68.flavor = '"A shimmering, iridescent powder valued for its reactivity in alchemy."';
items.I68.quality = 'Common';
items.I68.sell = 150;

items.I48 = {};
items.I48.name = 'Glass Flask';
items.I48.description = 'Material';
items.I48.flavor = '"A specialized flask crafted from materials designed to interact with alchemical substances."';
items.I48.quality = 'Common';
items.I48.sell = 100;

items.I49 = {};
items.I49.name = 'Lesser Nature Flask';
items.I49.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases '+natureIcon+'Nature Damage by 100% for 20 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I49.flavor = '"Beware of hallucinations of colorful round forest creatures."';
items.I49.quality = 'Uncommon';
items.I49.sell = 500;
items.I49.use = 'removeBuffs("potion"); items.I49.cd = 120; playSound("audio/potion.mp3"); buffs.B4.time=20; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 0); animState("rpgPlayerImg", "flash 0.5s 1"); items.I49.count--; ';
items.I49.cd = 0;

items.I50 = {};
items.I50.name = 'Lesser Might Flask';
items.I50.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases '+mightIcon+'Might Damage by 100% for 20 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I50.flavor = '"Feeling like a true gaulish."';
items.I50.quality = 'Uncommon';
items.I50.sell = 500;
items.I50.use = 'removeBuffs("potion"); items.I50.cd = 120; playSound("audio/potion.mp3"); buffs.B5.time=20; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 100); animState("rpgPlayerImg", "flash 0.5s 1"); items.I50.count--; ';
items.I50.cd = 0;

items.I154 = {};
items.I154.name = 'Lesser Elemental Flask';
items.I154.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases '+elementalIcon+'Elemental Damage by 100% for 20 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I154.flavor = '"Also known as fireball."';
items.I154.quality = 'Uncommon';
items.I154.sell = 500;
items.I154.use = 'removeBuffs("potion"); items.I154.cd = 120; playSound("audio/potion.mp3"); buffs.B30.time=20; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 0); animState("rpgPlayerImg", "flash 0.5s 1"); items.I154.count--; ';
items.I154.cd = 0;

items.I155 = {};
items.I155.name = 'Lesser Deific Flask';
items.I155.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases '+deificIcon+'Deific Damage by 100% for 20 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I155.flavor = '"Deus Vult."';
items.I155.quality = 'Uncommon';
items.I155.sell = 500;
items.I155.use = 'removeBuffs("potion"); items.I155.cd = 120; playSound("audio/potion.mp3"); buffs.B31.time=20; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 0); animState("rpgPlayerImg", "flash 0.5s 1"); items.I155.count--; ';
items.I155.cd = 0;

items.I156 = {};
items.I156.name = 'Lesser Occult Flask';
items.I156.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases '+occultIcon+'Occult Damage by 100% for 20 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I156.flavor = '"When the abyss peers into your soul, take a sip out of it."';
items.I156.quality = 'Uncommon';
items.I156.sell = 500;
items.I156.use = 'removeBuffs("potion"); items.I156.cd = 120; playSound("audio/potion.mp3"); buffs.B32.time=20; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 0); animState("rpgPlayerImg", "flash 0.5s 1"); items.I156.count--; ';
items.I156.cd = 0;

items.I130 = {};
items.I130.name = 'Lesser Haste Flask';
items.I130.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases Haste by 25% for 12 seconds <FONT COLOR="gray"> (3 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I130.flavor = '"Sweet dreams are made of this..."';
items.I130.quality = 'Uncommon';
items.I130.sell = 24000;
items.I130.use = 'removeBuffs("potion"); items.I130.cd = 180; playSound("audio/potion.mp3"); buffs.B7.time=12; playerBuffs(); clearInterval(playerAttackInterval); playerAttackInterval = setInterval(playerAttack, playerHaste); animParticleBurst(10 , "particleGlow", "playerPanel", 300); animState("rpgPlayerImg", "flash 0.5s 1"); items.I130.count--; ';
items.I130.cd = 0;

items.I21 = {};
items.I21.name = 'Lesser Poison Flask';
items.I21.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Applies a poison that deals 1000 '+natureIcon+'Nature Damage every second over 20 seconds<FONT COLOR="gray"> (2 minute Cooldown)';
items.I21.flavor = '"In the midst of chaos, there is also opportunity."';
items.I21.quality = 'Common';
items.I21.sell = 500;
items.I21.cd = 0;
items.I21.use = 'castLesserPoisonFlask(); items.I21.cd = 120; items.I21.count--; ;'

items.I185 = {};
items.I185.name = 'Shatterstone Potion';
items.I185.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases Gathering Level by +1 for 30 Minutes'
items.I185.flavor = '"Despite the name, it also works with herbs. Go figure this one out."';
items.I185.quality = 'Uncommon';
items.I185.sell = 900;
items.I185.use = 'playSound("audio/potion.mp3"); buffs.B37.time=1800; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 0); animState("rpgPlayerImg", "flash 0.5s 1"); items.I185.count--; ';
items.I185.cd = 0;

items.I12 = {};
items.I12.name = 'Skewed Lizard';
items.I12.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Restores 1500-2000 Health';
items.I12.flavor = '"Don\'t complain, it tastes like chicken."';
items.I12.quality = 'Common';
items.I12.sell = 200;
items.I12.use = ' playSound("audio/monch.mp3"); playerHealingDamage(rng(1500,2000)); animState("rpgPlayerImg", "gelatineHigh 0.4s 1"); items.I12.count--; ';
items.I12.max = 5;

items.I19 = {};
items.I19.name = 'Lesser Healing Flask';
items.I19.description = `'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Restores '+beautify(30000*multiplicativeHealingItems)+' Health<br><FONT COLOR="gray">[You can only carry 5 of each healing items at a time]'`;
items.I19.flavor = '"This potion operates by abruptly shattering your entire internal structure, causing your body to make an immediate effort to rebuild them in order to avert a sudden death. It also has a mild strawberry flavor."';
items.I19.quality = 'Common';
items.I19.sell = 500;
items.I19.max = 5;
items.I19.use = ' playSound("audio/potion.mp3"); playerHealingDamage(30000*multiplicativeHealingItems); animState("rpgPlayerImg", "flash 0.5s 1"); playerUpdate(); animParticleBurst(5 , "particleGlow", "playerPanel", 230); animParticleBurst(3 , "particleHealth", "playerPanel", 0); items.I19.count--; ';
items.I19.dynamic = true;

items.I280 = {};
items.I280.name = 'Healing Potion';
items.I280.description = `'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Restores '+beautify(350000*multiplicativeHealingItems)+' Health'`;
items.I280.flavor = '"Remember the rule. The less practical the shape, the stronger it is."';
items.I280.quality = 'Uncommon';
items.I280.sell = 500;
items.I280.max = 5;
items.I280.use = ' playSound("audio/potion.mp3"); playerHealingDamage(350000*multiplicativeHealingItems); animState("rpgPlayerImg", "flash 0.5s 1"); playerUpdate(); animParticleBurst(5 , "particleGlow", "playerPanel", 230); animParticleBurst(3 , "particleHealth", "playerPanel", 0); items.I280.count--; ';
items.I280.dynamic = true;

items.I54 = {};
items.I54.name = 'Monster Sausage';
items.I54.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Increases Max Health by 10% for 30 minutes <FONT COLOR="gray">(Only one food buff can be active at a time)';
items.I54.flavor = '"The meat grinder does not discriminate, and neither should you."';
items.I54.quality = 'Uncommon';
items.I54.sell = 500;
items.I54.use = 'removeBuffs("food"); buffs.B12.time=1800; playerBuffs();playSound("audio/monch.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");  items.I54.count--; ; rpgPlayer.hp+=playerMaxHp*0.2';

items.I52 = {};
items.I52.name = 'Frog Pho';
items.I52.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Increases '+mightIcon+'Might Damage by 50% for 30 minutes <FONT COLOR="gray">(Only one food buff can be active at a time)'
items.I52.flavor = '"A dish known for its flavorful broth, typically made with beef or chicken, rice noodles, and aromatic herbs. And now frog."';
items.I52.quality = 'Uncommon';
items.I52.sell = 600;
items.I52.use = 'removeBuffs("food"); buffs.B13.time=1800; playerBuffs(); playSound("audio/monch.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");  items.I52.count--; ';

items.I110 = {}; 
items.I110.name = 'Masala Chai';
items.I110.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Increases '+natureIcon+'Nature Damage by 50% for 30 minutes <FONT COLOR="gray">(Only one food buff can be active at a time)';
items.I110.flavor = '"A spiced black tea full of warm spices that is sure to recomfort the heart."';
items.I110.quality = 'Uncommon';
items.I110.sell = 800;
items.I110.use = 'removeBuffs("food"); buffs.B15.time=1800; playerBuffs();playSound("audio/monch.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");   items.I110.count--; ';

items.I129 = {};
items.I129.name = 'Pumpkin Spice Latte';
items.I129.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Increases Drop Chance by 20% for 30 minutes <FONT COLOR="gray">(Only one food buff can be active at a time)'
items.I129.flavor = '"That will be 12.99$."';
items.I129.quality = 'Uncommon';
items.I129.sell = 800;
items.I129.use = 'removeBuffs("food"); buffs.B29.time=1800; playerBuffs();playSound("audio/monch.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");  items.I129.count--; ';

items.I186 = {}; 
items.I186.name = 'Arêtes de Poisson Frites';
items.I186.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Increases '+deificIcon+'Deific Damage by 50% for 30 minutes <FONT COLOR="gray">(Only one food buff can be active at a time)';
items.I186.flavor = '"A brittle crunch that reveals a surprising burst of briny essence."';
items.I186.quality = 'Uncommon';
items.I186.sell = 900;
items.I186.use = 'removeBuffs("food"); buffs.B38.time=1800; playerBuffs(); playSound("audio/monch.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");   items.I186.count--; ';

items.I189 = {}; 
items.I189.name = 'Devilfish Sashimi';
items.I189.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Increases '+occultIcon+'Occult Damage by 50% for 30 minutes <FONT COLOR="gray">(Only one food buff can be active at a time)';
items.I189.flavor = '"May have lingering effects on the soul, but it\'s definitely worth it."';
items.I189.quality = 'Uncommon';
items.I189.sell = 900;
items.I189.use = 'removeBuffs("food"); buffs.B41.time=1800; playerBuffs();playSound("audio/monch.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");   items.I189.count--; ';

items.I190 = {}; 
items.I190.name = 'Pilk';
items.I190.description = 'Miscellaneous';
items.I190.flavor = '"Just a carton of Pilk."';
items.I190.quality = 'Legendary';
items.I190.sell = 69;
items.I190.max = 1;
items.I190.use = 'if (stats.currentEnemy==="E18") {deleteEnemy("E30"); animParticleBurst(10 , "particleFire", "enemyPanel", 200); animParticleBurst(10 , "particleSpark", "enemyPanel", 200); animImageSplash("soundWave", "enemyPanel", "wave", 200); animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1"); playSound("audio/creatura1.mp3"); playSound("audio/creatura2.mp3"); logs.P54.unlocked=true; items.I190.count--}'; 
items.I190.align = "occult";

items.I188 = {}; 
items.I188.name = 'Granite Pachamanca';
items.I188.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Increases '+elementalIcon+'Elemental Damage by 50% for 30 minutes <FONT COLOR="gray">(Only one food buff can be active at a time)';
items.I188.flavor = '"High temperature rocks are poured into the stew for heating. You are not supposed to eat them, but I\'m not a cop."';
items.I188.quality = 'Uncommon';
items.I188.sell = 700;
items.I188.use = 'removeBuffs("food"); buffs.B40.time=1800; playerBuffs(); playSound("audio/monch.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");   items.I188.count--; ';

var smallCache =  { I22:{P:1,A:"rng(1,5)"}, /*nephrite*/ I12:{P:1,A:"rng(1,3)"}, /*lizard*/ I42:{P:5,A:1}, /*malachite*/ REN5:{P:20,A:1}, RSN8:{P:20,A:1}, I33:{P:7,A:1}, /*blade*/ I91:{P:2,A:'rng(1,2)'}, /*stamp*/ I131:{P:7,A:1}, /*thorn ring*/ I112:{P:1,A:'rng(1,5)'}, /*boomerang*/}
items.I10 = {};
items.I10.name = 'Small Wooden Lockbox';
items.I10.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Unlock with a Copper Key to open<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="#1eff00">❖ Foliar Blade<br>❖ Thorn Binding<br>❖ Recipe: Nephrite-Embedded Ring<br>❖ Recipe: Net-o-Launcher 3000<br>❖ Malachite<br>❖ Wooden Stamper<br><FONT COLOR="white">❖ Skewed Lizard<br>❖ Nephrite<br>❖ Pine Boomerang<br><FONT COLOR="orange">❖ ...And More!'
items.I10.flavor = '"Life is like a Small Wooden Lockbox."';
items.I10.quality = 'Uncommon';
items.I10.sell = 2000;
items.I10.use = 'if (items.I41.count>0){ items.I41.count--; rollTable(smallCache, 1); rollTable(materialTable1, 1); items.I10.count--; if(quests.A2Q2.state === "pending"){ if(rng(1,6)===1) items.I123.count++ }; removeTableItem() }';
items.I10.autoOpenLocked = "I41"; 

items.I41 = {};
items.I41.name = 'Copper Key';
items.I41.description = 'Miscellaneous - Key<br><FONT COLOR="#1EFF0C">Can open small containers';
items.I41.flavor = '"For the easily-influenced locks."';
items.I41.quality = 'Common';
items.I41.sell = 350;

var reinforcedChest = { I42:{P:2,A:"rng(1,3)"}, /*malachite*/ I91:{P:1,A:"rng(1,2)"}, /*woodenstamper*/ I92:{P:2,A:"rng(1,3)"}, /*reinforcedstamper*/ I81:{P:8,A:1}, /*sacdagger*/  I62:{P:50,A:1}, /*heartcard*/ RSN9:{P:20,A:1},  REN8:{P:30,A:1}, /*recipes*/}
items.I43 = {};
items.I43.name = 'Reinforced Wooden Chest';
items.I43.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Unlock with an Arcanite Blasting Charge to open<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="#0070dd">❖ Sacrificial Dagger<br>❖ Reinforced Stamper<br>❖ Heart of Tortugas<br>❖ Recipe: Malachite-Embedded Ring<br><FONT COLOR="#1eff00">❖ Recipe: Soul Canister<br>❖ Malachite<br>❖ Wooden Stamper<br><FONT COLOR="orange">❖ ...And More!'
items.I43.flavor = '"As reinforced as wood can be."';
items.I43.quality = 'Uncommon';
items.I43.sell = 4000;
items.I43.use = 'if (items.I46.count>0){ items.I43.count--; items.I46.count--; rollTable(reinforcedChest, 1); rollTable(materialTable2, 1); rollTable(materialTable1, 1); removeTableItem() }';
items.I43.autoOpenLocked = "I46"; 

items.I46 = {};
items.I46.name = 'Arcanite Blasting Charge';
items.I46.description = 'Miscellaneous - Key<br><FONT COLOR="#1EFF0C">Can open reinforced containers';
items.I46.flavor = '"For the moderately-swayed locks."';
items.I46.quality = 'Uncommon';
items.I46.sell = 900;

var wolfSpiderCache = { I83:{P:4,A:1}, /*weapon*/ I192:{P:4,A:1}, /*ring*/ I47:{P:4,A:1}, /*trinket*/ I57:{P:1,A:'rng(18,24)'}, /*material*/ }
items.I107 = {};
items.I107.name = 'Wolf Spider Cache';
items.I107.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="#0070dd">❖ Chrysalis Recurver<br>❖ Web-Threaded Promise<br>❖ Hoopperona\'s Phylactery<br><FONT COLOR="white">❖ Creeping Wolf Web';
items.I107.flavor = '"Spiders not included, and it\'s for the best."';
items.I107.quality = 'Uncommon';
items.I107.sell = 2000;
items.I107.use = 'rollTable(wolfSpiderCache, 1); items.I107.count--;  ;';
items.I107.autoOpen = true; 

var jungleKingCache = { I132:{P:4,A:1}, I133:{P:4,A:1}, I134:{P:4,A:1}, I135:{P:4,A:1}, I136:{P:4,A:1}, /*armor*/ I137:{P:4,A:1}, /*weapon*/ I15:{P:40,A:1}, /*ring*/ I165:{P:1,A:'rng(18,24)'}, /*chalk*/ }
items.I53 = {};
items.I53.name = 'Jungle King Cache';
items.I53.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="#0070dd">★ Jungle King Armor Set<br>❖ King-Kat Decapitator<br>❖ Champion Finger Belt<br><FONT COLOR="white">❖ Chalk Dust';
items.I53.flavor = '"Witness the might of the undisputed champion!"';
items.I53.quality = 'Uncommon';
items.I53.sell = 2000;
items.I53.use = 'rollTable(jungleKingCache, 1); items.I53.count--;  ;';
items.I53.autoOpen = true; 

var crystalCache = { I27:{P:15,A:1}, /*weapon*/ I173:{P:5,A:1}, /*ring*/ I71:{P:1,A:'rng(18,24)'}, /*material*/ }
items.I101 = {};
items.I101.name = 'Crystal Cache';
items.I101.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="#0070dd">❖ Moonlit Greatsword<br>❖ Firelink Band<br><FONT COLOR="white">❖ Agate Crystal Scale';
items.I101.flavor = '"The label reads; "Fragile"."';
items.I101.quality = 'Uncommon';
items.I101.sell = 2000;
items.I101.use = 'rollTable(crystalCache, 1); items.I101.count--; ';
items.I101.autoOpen = true; 

var infernalCache = { I28:{P:10,A:1}, /*weapon*/ I175:{P:3,A:1}, /*ring*/ I100:{P:1,A:'rng(18,24)'}, /*material*/ I65:{P:7,A:1}, /*card*/ }
items.I153 = {};
items.I153.name = 'Infernal Cache';
items.I153.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="#a335ee">❖ Edge of Cataclysm<br><FONT COLOR="#0070dd">❖ Clover of Tortugas<br>❖ Golden Order Seal<br><FONT COLOR="white">❖ Nightmare Fuel';
items.I153.flavor = '"A blazing repository ablaze with imprisoned souls."';
items.I153.quality = 'Rare';
items.I153.sell = 15500;
items.I153.use = 'rollTable(infernalCache, 1); items.I153.count--;  ; ';
items.I153.autoOpen = true; 

var dungeonBonus1 = { I93:{P:10, A:1},I92:{P:5, A:'rng(1,3)'},I91:{P:2, A:'rng(1,7)'}, /*stamps*/ I22:{P:4, A:'rng(1,10)'},I42:{P:6, A:'rng(1,4)'}, /*gems*/ I96:{P:30,A:1},  I97:{P:30,A:1}, I207:{P:30,A:1},  /*gambas*/ I177:{P:30,A:1},  I178:{P:30,A:1},  /*vouchers*/ I200:{P:30,A:1},  /*phoenix*/  I208:{P:40,A:1},  /*jackinabox*/}
var coolCooler =  { I142:{P:2,A:1}, I141:{P:2,A:1}, I140:{P:2,A:1}, I139:{P:2,A:1}, I138:{P:2,A:1},  /*armor*/ I60:{P:3,A:1},/*weapon*/ I166:{P:3,A:1},  /*waddling band*/  BR7:{P:9,A:1},  /*blueprint*/}
items.I205 = {};
items.I205.name = 'Cool Cooler';
items.I205.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="#a335ee">❖ Blueprint: Penguin Aviary<br><FONT COLOR="#0070dd">★ Pringu Armor Set<br>❖ Bluefin Tuna<br>❖ Waddling Band<br><FONT COLOR="orange">❖ ...And More!'
items.I205.flavor = '"Doesn\'t it just scream summer?"';
items.I205.quality = 'Rare';
items.I205.sell = 5000;
items.I205.use = 'rollTable(coolCooler, 1); rollTable(materialTable1, 3); rollTable(materialTable2, 3); rollTable(dungeonBonus1, 1);items.I205.count--; removeTableItem() ';
items.I205.autoOpen = true; 

var jonesLocker =  { I147:{P:2,A:1}, I146:{P:2,A:1}, I145:{P:2,A:1}, I144:{P:2,A:1}, I143:{P:2,A:1},  /*armor*/  I167:{P:3,A:1},  /*scimitar*/ I61:{P:10,A:1},  /*card*/} 
items.I206 = {};
items.I206.name = 'Davy Jones\' Locker';
items.I206.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="#a335ee">❖ Wraithblade Scimitar<br><FONT COLOR="#0070dd">★ Ghastly Captain Set<br>❖ Spade of Tortugas<br><FONT COLOR="orange">❖ ...And More!'
items.I206.flavor = '"I don\'t really see what\'s all the fuss about this one."';
items.I206.quality = 'Rare';
items.I206.sell = 7000;
items.I206.use = 'items.I206.count--; rollTable(materialTable1, 3); rollTable(materialTable2, 3); rollTable(dungeonBonus1, 1); rollTable(jonesLocker, 1);';
items.I206.autoOpen = true; 

items.I118 = {}; 
items.I118.name = 'Gamba';
items.I118.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Feed it to the turtle';
items.I118.flavor = '"Beware of the strange sounds at night."';
items.I118.quality = 'Uncommon';
items.I118.sell = 1;
items.I118.max = 1;
items.I118.use = 'playSound("audio/monch.mp3"); animParticleBurst(7 , "particleHeart", "playerPanel", 0); playSound("audio/lily.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I118.count--; ';

items.I96 = {};
items.I96.name = 'Gold-Tinged Gamba';
items.I96.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Turtle Coin reward from clicking by 100% for 30 minutes'
items.I96.flavor = '"A symbol of greed and covetousness."';
items.I96.quality = 'Rare';
items.I96.sell = 1000;
items.I96.use = 'playSound("audio/monch.mp3"); animParticleBurst(7 , "particleHeart", "playerPanel", 0); playSound("audio/lily.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); buffs.B8.time=1800; playerBuffs(); items.I96.count--; ';

items.I97 = {};
items.I97.name = 'Vitreous Gamba';
items.I97.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases EXP Rate by 100% for 30 minutes'
items.I97.flavor = '"A symbol of beauty and elegance."';
items.I97.quality = 'Rare';
items.I97.sell = 1000;
items.I97.use = 'playSound("audio/monch.mp3"); animParticleBurst(7 , "particleHeart", "playerPanel", 0); playSound("audio/lily.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); buffs.B9.time=1800; playerBuffs(); items.I97.count--; ';

items.I200 = {};
items.I200.name = 'Phoenix Prawn';
items.I200.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Grants a buff for 10 minutes that prevents death, reviving instead your turle with 30% of its life <FONT COLOR="gray">(15 minute Cooldown)';
items.I200.flavor = '"A bit on the nose on this one."';
items.I200.quality = 'Rare';
items.I200.sell = 2000;
items.I200.max = 10;
items.I200.use = ' if (rpgPlayer.alive) {playSound("audio/monch.mp3"); animParticleBurst(7 , "particleHeart", "playerPanel", 0);animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); playSound("audio/lily.mp3"); buffs.B64.time=600; playerBuffs(); items.I200.cd=900; items.I200.count--; }';

items.I26 = {};
items.I26.name = 'Dreamwoven Gamba';
items.I26.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to reset Talent Points'
items.I26.flavor = '"The stars are gleaming through the crustacean\'s surface."';
items.I26.quality = 'Epic';
items.I26.sell = 1000;
items.I26.max = 1;

items.I207 = {};
items.I207.name = 'Wood-Carved Gamba';
items.I207.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Drop Chance by 100% for 30 minutes'
items.I207.flavor = '"A symbol of talent and workmanship."';
items.I207.quality = 'Rare';
items.I207.sell = 1000;
items.I207.use = 'playSound("audio/monch.mp3"); animParticleBurst(7 , "particleHeart", "playerPanel", 0); playSound("audio/lily.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); buffs.B55.time=1800; playerBuffs(); items.I207.count--; ';

var whiskersPresent = { I118:{P:3, A:1}, /*gamba*/ I98:{P:1, A:1}, I99:{P:1, A:1}, /*tokens*/ I26:{P:1, A:1}, /*dreamgamba*/ I177:{P:5, A:1}, I178:{P:5, A:1},/*vouchers*/ I93:{P:3, A:1}, /*golden stamp*/ I96:{P:8, A:1}, I97:{P:8, A:1}, I207:{P:8, A:1}, I200:{P:8,A:1}, /*special gambas*/  I209:{P:10, A:1}, I210:{P:10, A:1}, /*time eggs*/ I208:{P:10, A:1}, /*jackinabox*/ }
items.I119 = {}; 
items.I119.name = 'Carefully Wrapped Present';
items.I119.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="white">?????';
items.I119.flavor = '"Para mi?"';
items.I119.quality = 'Uncommon';
items.I119.sell = 1;
items.I119.use = 'playSound("audio/meow.mp3"); rollTable(whiskersPresent, 1); items.I119.count--; ';

items.I296 = {}; 
items.I296.name = 'Carefully Wrapped Exported Data';
items.I296.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="white">?????';
items.I296.flavor = '"One export save a day keeps the data corruption away."';
items.I296.quality = 'Uncommon';
items.I296.sell = 1;
items.I296.use = 'playSound("audio/button9.mp3"); items.I174.count++; items.I210.count++; items.I296.count--; ';

items.I98 = {};
items.I98.name = 'Friendly Cat Token';
items.I98.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases EXP Gain by 300% for 30 minutes'
items.I98.flavor = '"Protection awaits for the friends of Whiskers."';
items.I98.quality = 'Epic';
items.I98.sell = 1000;
items.I98.use = 'playSound("audio/meow.mp3"); buffs.B10.time=1800; playerBuffs(); animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I98.count--; ';

items.I99 = {};
items.I99.name = 'Angry Cat Token';
items.I99.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Drop Chance by 300% for 30 minutes'
items.I99.flavor = '"Destruction awaits for the enemies of Whiskers."';
items.I99.quality = 'Epic';
items.I99.sell = 1000;
items.I99.use = 'playSound("audio/meow.mp3"); buffs.B11.time=1800; playerBuffs(); animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I99.count--; ';

stats.stampsUsed = 0;

items.I91 = {}; 
items.I91.name = 'Wooden Stamper';
items.I91.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Applies or rerolls a random stamp to the currently equiped weapon, with a low chance of adding multiple stamp<br><FONT COLOR="gray">[Stamps give specific damage bonuses to your weapon or, in rare cases, general ones such as Critical Chance]';
items.I91.flavor = '"Pluck."';
items.I91.quality = 'Uncommon';
items.I91.sell = 100;
items.I91.use = 'stampWeapon("wood"); stats.stampsUsed++; items.I91.count--; ; updateStampMenu(); animParticleBurst(4 , "particleExp", "stampMenuDescription", 0)'

items.I92 = {}; 
items.I92.name = 'Reinforced Stamper';
items.I92.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Applies or rerolls a random stamp to the currently equiped weapon, with a high chance of adding multiple stamps';
items.I92.flavor = '"Doink."';
items.I92.quality = 'Rare';
items.I92.sell = 400;
items.I92.use = 'stampWeapon("iron"); stats.stampsUsed++; items.I92.count--; ; updateStampMenu(); animParticleBurst(4 , "particleExp", "stampMenuDescription", 0)'

items.I93 = {}; 
items.I93.name = 'Ornate Stamper';
items.I93.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Applies or rerolls a random stamp to the currently equiped weapon, always adding multiple stamps';
items.I93.flavor = '"Tunk."';
items.I93.quality = 'Epic';
items.I93.sell = 800;
items.I93.use = 'stampWeapon("gold"); stats.stampsUsed++; items.I93.count--; ; updateStampMenu(); animParticleBurst(4 , "particleExp", "stampMenuDescription", 0)'

items.I222 = {}; 
items.I222.name = 'Golden Magnifying Glass';
items.I222.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used once to reveal the details of a missing book';
items.I222.flavor = '"Oh. So that\'s what it was talking about."';
items.I222.quality = 'Rare';
items.I222.sell = 1000;

items.I208 = {};
items.I208.name = 'Jack-In-The-Box';
items.I208.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Summons a Jester Turtle<FONT COLOR="gray"> (1 minute Cooldown)'
items.I208.flavor = '"What\'s in the box?"';
items.I208.quality = 'Epic';
items.I208.sell = 5000;
items.I208.use = 'playSound("audio/button8.mp3"); items.I208.cd = 120;animParticleBurst(5 , "particleSpark", "cursor", 0); spawnJesterTurtle() ;items.I208.count--; ';

items.I209 = {};
items.I209.name = 'Ephemeral Time Egg';
items.I209.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Fast-forwards 1 hour of offline progress<br><FONT COLOR="gray"> (Only works if the current enemy has been defeated more than 100 times)'
items.I209.flavor = '"...Time, the very essence of change and decay, which would hatch forth and the very heartbeat of existence, would find its genesis..."';
items.I209.quality = 'Rare';
items.I209.sell = 1000;
items.I209.use = 'if (farmable) {playSound("audio/button9.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); offlineRewards((3600/60)*(playerPenguinPower/15),"egg"); items.I209.count--; }';

items.I210 = {};
items.I210.name = 'Perennial Time Egg';
items.I210.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Fast-forwards 6 hours of offline progress<br><FONT COLOR="gray"> (Only works if the current enemy has been defeated more than 100 times)'
items.I210.flavor = '"...Encased within the shell of the cosmic ovum lay the potential for eternity, awaiting the pivotal moment of hatching, as within resided..."';
items.I210.quality = 'Epic';
items.I210.sell = 5000;
items.I210.use = 'if (farmable) {playSound("audio/button9.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); offlineRewards((21600/60)*(playerPenguinPower/15),"egg"); items.I210.count--; }';

items.I211 = {};
items.I211.name = 'Everlasting Time Egg';
items.I211.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Fast-forwards 24 hours of offline progress<br><FONT COLOR="gray"> (Only works if the current enemy has been defeated more than 100 times)'
items.I211.flavor = '"—In the depths of its ancient shell harbored the essence of creation itself. And so, in an epoch-shattering moment, amidst the swirling mists of eternity, it laid an egg..."';
items.I211.quality = 'Epic';
items.I211.sell = 10000;
items.I211.use = 'if (farmable) {playSound("audio/button9.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); offlineRewards((86400/60)*(playerPenguinPower/15),"egg"); items.I211.count--; }';

items.I212 = {};
items.I212.name = 'Timeless Time Egg';
items.I212.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Fast-forwards 48 hours of offline progress<br><FONT COLOR="gray"> (Only works if the current enemy has been defeated more than 100 times)'
items.I212.flavor = '"...As it unfurled its wings, ages passed like fleeting shadows, civilizations rose and crumbled, and the land itself bore witness to the inexorable march of time."';
items.I212.quality = 'Legendary';
items.I212.sell = 25000;
items.I212.use = 'if (farmable) {playSound("audio/button9.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); offlineRewards((172800/60)*(playerPenguinPower/15),"egg"); items.I212.count--; }';

items.I213 = {};
items.I213.name = 'Reality Voxel';
items.I213.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Combine 4 into a Reality Cube'
items.I213.flavor = '"Seems like it really doesn\'t belong in this world."';
items.I213.quality = 'Epic';
items.I213.sell = 0;
items.I213.use = 'if (items.I213.count>3) { playSound("audio/talent.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I213.count-=4; items.I214.count++; }';

items.I214 = {};
items.I214.name = 'Reality Cube';
items.I214.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently grants 1 additional Talent Point'
items.I214.flavor = '"I cant say I fully trust how our third dimensional plane bends around this."';
items.I214.quality = 'Legendary';
items.I214.sell = 0;
items.I214.use = 'playSound("audio/talent2.mp3"); rpgPlayer.talentPoints++; rpgPlayer.totalTalentPoints++; animParticleBurst(5 , "particleSpark", "cursor", 0); updateTalentUI(); items.I214.count--; ';

items.I217 = {};
items.I217.name = 'Philanthropy Marble';
items.I217.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently adds +1 additional present in Mystery Presents'
items.I217.flavor = '"Someone holds you very dearly it seems."';
items.I217.quality = 'Epic';
items.I217.sell = 0;
items.I217.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); updateTalentUI(); items.I217.count--; items.I217.statUp++; ';
items.I217.statUp = 0;

items.I219 = {};
items.I219.name = 'Giantite Chunk';
items.I219.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Upgrades the currently equipped weapon by +1 level'
items.I219.flavor = '"...b-ar...s-ek...se-k...le-t..."';
items.I219.quality = 'Epic';
items.I219.sell = 3000;
items.I219.use = 'if (rpgPlayer.weaponSlot!=="none" && items[rpgPlayer.weaponSlot].count!==items[rpgPlayer.weaponSlot].max){ playSound("audio/craft.mp3"); items[rpgPlayer.weaponSlot].count++; ; animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I219.count--; ;}';

items.I174 = {}; 
items.I174.name = 'Dungeon Voucher';
items.I174.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to enter any dungeon';
items.I174.flavor = '"The fast pass of the adventures."';
items.I174.quality = 'Rare';
items.I174.sell = 1000;

items.I177 = {}; 
items.I177.name = 'EXP Voucher';
items.I177.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases EXP Gain by 300% for 10 minutes.'
items.I177.flavor = '"This one always puts a gleaming smile on your face."';
items.I177.use = 'playSound("audio/button6.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); buffs.B35.time=600;  playerBuffs(); items.I177.count--; ';
items.I177.quality = 'Rare';
items.I177.sell = 3000;

items.I178 = {}; 
items.I178.name = 'Drop Voucher';
items.I178.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Drop Chance by 300% for 10 minutes'
items.I178.flavor = '"This one always puts a gleaming smile on your face."';
items.I178.use = 'playSound("audio/button6.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); buffs.B36.time=600; playerBuffs(); items.I178.count--; ';
items.I178.quality = 'Rare';
items.I178.sell = 3000;

items.I14 = {}; 
items.I14.name = 'Chocolate Chip Cookies';
items.I14.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Feed it to the turtle';
items.I14.flavor = '"Their flavor is quite familiar. Nothing happens if you press them, though."';
items.I14.quality = 'Uncommon';
items.I14.sell = 10;
items.I14.use = 'playSound("audio/monch.mp3"); animParticleBurst(7 , "particleHeart", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I14.count--; ';

let coinWins = 0;
items.I39 = {};
items.I39.name = 'Pirate Coin';
items.I39.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Flip the coin';
items.I39.flavor = '"Fateful decisions upon the high seas await ye."';
items.I39.quality = 'Uncommon';
items.I39.sell = 900;
items.I39.use = 'items.I39.cd = 3; playSound("audio/touchGlass.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I39.count--; if (rng(1,2)===1) {createPopup("&#127922; Tails", "#913c3c"); coinWins = 0;} else {createPopup("&#127922; Heads", "#61ba56"); coinWins++}; if (rng(1,50)===1) {playSound("audio/meow.mp3"); createPopup("&#127922; You feel lucky!", "#61ba56"); items.I193.count++; }';

items.I61 = {}; //mazz pirata
items.I61.name = 'Spade of Tortugas';
items.I61.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Combine the clover, the spade, the heart and the diamond into a deck'
items.I61.flavor = '"Luck Be A Turtle."';
items.I61.quality = 'Rare';
items.I61.sell = 5000;
items.I61.use = 'if (items.I61.count>0 && items.I62.count>0 && items.I63.count>0 && items.I65.count>0){items.I61.count--; items.I62.count--; items.I63.count--; items.I65.count--; items.I56.count++; ;}';
items.I61.max = 1;

items.I62 = {}; //reinforced
items.I62.name = 'Heart of Tortugas';
items.I62.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Combine the clover, the spade, the heart and the diamond into a deck'
items.I62.flavor = '"Luck Be A Turtle."';
items.I62.quality = 'Rare';
items.I62.sell = 5000;
items.I62.use = 'if (items.I61.count>0 && items.I62.count>0 && items.I63.count>0 && items.I65.count>0){items.I61.count--; items.I62.count--; items.I63.count--; items.I65.count--; items.I56.count++; ;}';
items.I62.max = 1;

items.I63 = {}; //bought 4 shop
items.I63.name = 'Diamond of Tortugas';
items.I63.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Combine the clover, the spade, the heart and the diamond into a deck'
items.I63.flavor = '"Luck Be A Turtle."';
items.I63.quality = 'Rare';
items.I63.sell = 5000;
items.I63.use = 'if (items.I61.count>0 && items.I62.count>0 && items.I63.count>0 && items.I65.count>0){items.I61.count--; items.I62.count--; items.I63.count--; items.I65.count--; items.I56.count++; ;}';
items.I63.max = 1;

items.I65 = {}; //infernalus
items.I65.name = 'Clover of Tortugas';
items.I65.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Combine the clover, the spade, the heart and the diamond into a deck'
items.I65.flavor = '"Luck Be A Turtle."';
items.I65.quality = 'Rare';
items.I65.sell = 5000;
items.I65.use = 'if (items.I61.count>0 && items.I62.count>0 && items.I63.count>0 && items.I65.count>0){items.I61.count--; items.I62.count--; items.I63.count--; items.I65.count--; items.I56.count++; ;}';
items.I65.max = 1;

items.I112 = {};
items.I112.name = 'Pine Boomerang';
items.I112.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Throws a wooden boomerang that deals 260-300 '+natureIcon+'Nature Damage';
items.I112.flavor = '"An elvish weapon used by the forest dwelling race known as the Australians."';
items.I112.quality = 'Common';
items.I112.use = 'castPineBoomerang(); items.I112.count --; ;'
items.I112.sell = 100;
items.I112.max = 10;
items.I112.align = 'nature'

items.I176 = {};
items.I176.name = 'Antidote';
items.I176.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Prevents enemy-inflicted poisons for 10 minutes'
items.I176.flavor = '"Might be useful in a pinch."';
items.I176.quality = 'Common';
items.I176.sell = 500;
items.I176.use = 'playSound("audio/potion.mp3"); buffs.B34.time=600; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 0); animState("rpgPlayerImg", "flash 0.5s 1"); items.I176.count--; ';
items.I176.cd = 0;
items.I176.max = 10;

items.I30 = {};
items.I30.name = 'Light Dynamite';
items.I30.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Throws an explosive that deals 130K-140K '+elementalIcon+'Elemental Damage to an enemy. Can also be thrown into ore for quick mining<FONT COLOR="gray"> (1 minute Cooldown)';
items.I30.flavor = '"A medium-range explosive. The enemy here appears to be always at the same distance, though."';
items.I30.quality = 'Uncommon';
items.I30.cd = 0;
items.I30.use = ' castLightDynamite(); items.I30.cd = 60; items.I30.count --; if (stats.currentEnemy==="E20") logs.P52.unlocked=true;'
items.I30.sell = 600;

items.I179 = {};
items.I179.name = 'Soul Canister';
items.I179.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Throws an explosive that deals 1.6M-1.7M '+occultIcon+'Occult Damage to an enemy <FONT COLOR="gray"> (1 minute Cooldown)';
items.I179.flavor = '"Do you have a better idea of what to do with the souls of the dead?"';
items.I179.quality = 'Uncommon';
items.I179.use = ' castSoulCanister(); items.I179.cd = 60; items.I179.count --; ;';
items.I179.sell = 1000;
items.I179.cd = 0;

items.I215 = {};
items.I215.name = 'Hex Tag';
items.I215.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Applies a damaging curse that deals 90K '+occultIcon+'Occult Damage every second over 20 seconds<FONT COLOR="gray"> (2 minute Cooldown)';
items.I215.flavor = '"Something might happen if you eat this."';
items.I215.quality = 'Uncommon';
items.I215.sell = 1300;
items.I215.cd = 0;
items.I215.use = 'castHexTag(); items.I215.cd = 120; items.I215.count--; ;'

items.I67 = {};
items.I67.name = 'Net-O-Launcher 3000';
items.I67.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Launches a net that immobilises the enemy for 10 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Doesn\'t work past reaching Level 30)';
items.I67.flavor = '"We don\'t talk about the other 2999."';
items.I67.quality = 'Uncommon';
items.I67.sell = 2000;
items.I67.use = ' if (rpgClass[stats.currentClass].level<31) {castNetOLauncher3000(); items.I67.cd = 120; items.I67.count --; ;}'
items.I67.cd = 0;

items.I187 = {};
items.I187.name = 'Firetank Pyrocombulator';
items.I187.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Attach it to your weapon, dealing 70K additional '+elementalIcon+'Elemental Damage with every attack. Lasts 2 Minutes until it runs out of fuel <FONT COLOR="gray"> (3 minute Cooldown)'
items.I187.flavor = '"Good grief you don\'t have fingers to blow up."';
items.I187.quality = 'Uncommon';
items.I187.sell = 4000;
items.I187.use =  'playSound("audio/engine.mp3"); items.I187.cd = 180; buffs.B39.time=120; playerBuffs(); animParticleBurst(6 , "particleGear", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I187.count--; ';
items.I187.cd = 0;

items.I84 = {};
items.I84.name = 'Stone Mattock';
items.I84.description = 'Equipable - Tool<br><FONT COLOR="#1EFF0C">Can be used to gather ores and herbs<br>+1 Gathering Level';
items.I84.flavor = '"Three thousand years ago, this baby would be considered top-notch engineering, but right now it\'s better than punching rocks."';
items.I84.quality = 'Common';
items.I84.sell = 1000;
items.I84.max = 1;
items.I84.use = 'gearSwap(items.I84.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I84.stats = 'weaponGatheringLevel = 1;'
items.I84.remove = 'weaponGatheringLevel = 0;';
items.I84.tag = "mattock"

items.I85 = {};
items.I85.name = 'Reinforced Mattock';
items.I85.description = 'Equipable - Tool<br><FONT COLOR="#1EFF0C">+2 Gathering Level';
items.I85.flavor = '"For when you had enough with your hoe."';
items.I85.quality = 'Uncommon';
items.I85.sell = 5000;
items.I85.max = 1;
items.I85.use = 'gearSwap(items.I85.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I85.stats = 'weaponGatheringLevel = 2;'
items.I85.remove = 'weaponGatheringLevel = 0;';
items.I85.tag = "mattock"

items.I24 = {};
items.I24.name = 'Prismatic Mattock';
items.I24.description = 'Equipable - Tool<br><FONT COLOR="#1EFF0C">+3 Gathering Level';
items.I24.flavor = '"It feels like a waste to smash this onto a rock."';
items.I24.quality = 'Rare';
items.I24.sell = 15000;
items.I24.max = 1;
items.I24.use = 'gearSwap(items.I24.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I24.stats = 'weaponGatheringLevel = 3;'
items.I24.remove = 'weaponGatheringLevel = 0;';
items.I24.tag = "mattock"

items.I162 = {};
items.I162.name = 'Old Rod';
items.I162.description = 'Equipable - Tool<br><FONT COLOR="#1EFF0C">+1 Fishing Level';
items.I162.flavor = '"Approach with low expectations."';
items.I162.quality = 'Uncommon';
items.I162.sell = 1000;
items.I162.max = 1;
items.I162.use = 'gearSwap(items.I162.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I162.stats = 'baseFishingLevel += 1; weaponSwap("W24")'
items.I162.remove = 'baseFishingLevel -= 1; weaponSwap("W0")';
items.I162.tag = "rod"
items.I162.animation = 'ranged';

items.I171 = {};
items.I171.name = 'Good Fishing Rod';
items.I171.description = 'Equipable - Tool<br><FONT COLOR="#1EFF0C">+2 Fishing Level';
items.I171.flavor = '"No more magic carps."';
items.I171.quality = 'Rare';
items.I171.sell = 1000;
items.I171.max = 1;
items.I171.use = 'gearSwap(items.I171.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I171.stats = 'baseFishingLevel += 2; weaponSwap("W25")'
items.I171.remove = 'baseFishingLevel -= 2; weaponSwap("W0")';
items.I171.tag = "rod"
items.I171.animation = 'ranged';

items.I181 = {};
items.I181.name = 'Fish Bait';
items.I181.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Fishing Level by 1 for 30 Minutes <FONT COLOR="gray"> <br>(Only one bait can be active at a time)'
items.I181.flavor = '"Slimy yet satisfying."';
items.I181.quality = 'Common';
items.I181.sell = 500;
items.I181.use = 'removeBuffs("bait"); buffs.B14.time=1800; playerBuffs(); animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1");  items.I181.count--; ';

items.I183 = {};
items.I183.name = 'Soul Grub';
items.I183.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Fishing Level by 2 for 30 Minutes <FONT COLOR="gray"> <br>(Only one bait can be active at a time)'
items.I183.flavor = '"Infused with unresting spirits."';
items.I183.quality = 'Uncommon';
items.I183.sell = 1000;
items.I183.use = 'removeBuffs("bait"); buffs.B22.time=1800; playerBuffs(); animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1");  items.I181.count--; ';

items.I8 = {};
items.I8.name = 'Wooden Sword';
items.I8.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+20 Nature Damage';
items.I8.flavor = '"A wooden stick shaped like a sword, retaining all the properties of a wooden stick and none of a sword."';
items.I8.quality = 'Poor';
items.I8.sell = 100;
items.I8.max = 1
items.I8.use = 'gearSwap(items.I8.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I8.stats = 'weaponNatureDamage = 20;'
items.I8.remove = 'weaponNatureDamage = 0;'
items.I8.align = 'nature';
items.I8.series = 'heirloom';

items.I9 = {};
items.I9.name = 'Wooden Bow';
items.I9.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(20, "I9")+' Nature Damage<br>On Attack: Shoot a wooden arrow'`;
items.I9.flavor = '"It should hold together for a few shots before falling apart entirely."';
items.I9.quality = 'Common';
items.I9.sell = 500;
items.I9.max = 10;
items.I9.use = 'gearSwap(items.I9.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I9.stats = 'weaponNatureDamage = returnItemUpgradeScaling(25, "I9");'
items.I9.remove = 'weaponNatureDamage = 0;'
items.I9.align = 'nature';
items.I9.attackChance = ' castWoodenBow()' 
items.I9.animation = 'ranged';
items.I9.series = 'millionaire';

items.I20 = {};
items.I20.name = 'Magewood Staff';
items.I20.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+380 Elemental Damage<br>On Attack: Cast a fireball';
items.I20.flavor = '"A catalyst employed by the mages of the royal army. Not all turtles are endowed with the rare quality of magic."';
items.I20.quality = 'Uncommon';
items.I20.sell = 1000;
items.I20.max = 1;
items.I20.use = 'gearSwap(items.I20.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I20.stats = 'additiveElementalDamage += 380; weaponSwap("W14")'
items.I20.remove = 'additiveElementalDamage -= 380; weaponSwap("W0")'
items.I20.align = 'elemental';
items.I20.attackChance = ' castMagewoodStaff()' 
items.I20.animation = 'ranged';

items.I23 = {};
items.I23.name = 'Firekeg Cannon';
items.I23.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(490432, "I23"))+' Elemental Damage<br>-2000 Haste<br>On Attack: Launch an explosive cannonball'`;
items.I23.flavor = '"It appears to be single-barreled."';
items.I23.quality = 'Rare';
items.I23.sell = 34000;
items.I23.max = 10;
items.I23.use = 'gearSwap(items.I23.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I23.stats = 'weaponElementalDamage = returnItemUpgradeScaling(490432, "I23"); weaponHaste = -2000'
items.I23.remove = 'weaponElementalDamage = 0; weaponHaste = 0'
items.I23.align = "elemental";
items.I23.attackChance = ' castFirekegCannon()' 
items.I23.animation = 'ranged';
items.I23.series = "revered"; 

items.I27 = {};
items.I27.name = 'Moonlit Greatsword';
items.I27.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(55382, "I27"))+' Elemental Damage<br>On Attack: Low chance to gain Blessing of the Moon, converting every normal attack into moon slashes'`;
items.I27.flavor = '"Nothing appears to be refracted on the edge but the blue hue of the moon."';
items.I27.quality = 'Rare';
items.I27.sell = 25000;
items.I27.max = 10;
items.I27.use = 'gearSwap(items.I27.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I27.stats = 'weaponElementalDamage = returnItemUpgradeScaling(55382, "I27");'
items.I27.remove = 'weaponElementalDamage = 0;'
items.I27.align = 'elemental';
items.I27.attackChance = 'if (rng(1,20)===1) castMoonlitGreatsword()'
items.I27.series = "revered"; 

items.I28 = {};
items.I28.name = 'Edge Of Cataclysm';
items.I28.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(305102, "I28"))+' Deific Damage<br>On Attack: Low chance to rain down 4 meteorites, dealing medium '+deificIcon+'Deific damage'`;
items.I28.flavor = '"Terrific blade wielded by the jailer of the hallowed grounds. Tasked with warding off souls, this weapon has become nearly sentient over time."';
items.I28.quality = 'Epic';
items.I28.sell = 45000;
items.I28.max = 10;
items.I28.use = 'gearSwap(items.I28.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I28.stats = 'weaponDeificDamage = returnItemUpgradeScaling(305102, "I28");'
items.I28.remove = 'weaponDeificDamage = 0;'
items.I28.align = 'deific';
items.I28.attackChance = 'if (rng(1,5)===1) castEdgeOfCataclysm()';
items.I28.series = "solstice"; 

items.I33 = {};
items.I33.name = 'Foliar Blade';
items.I33.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(257, "I33", "high")+' Nature Damage '+scalingIcon+'<br>On Attack: Low chance to trigger photosynthesis, increasing your '+natureIcon+'Nature Damage by 15% and heal based on your current nature bonus'`;
items.I33.flavor = '"A blossoming blade emerging from the heart of the forest. Like plantlife, it can harness sunlight to gain strength."';
items.I33.quality = 'Uncommon';
items.I33.sell = 2000;
items.I33.max = 10;
items.I33.use = 'gearSwap(items.I33.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I33.stats = 'weaponNatureDamage = returnItemUpgradeScaling(257, "I33", "high");'
items.I33.remove = 'weaponNatureDamage = 0; '
items.I33.align = 'nature';
items.I33.attackChance = 'if (rng(1,10)===1) castFoliarBlade()';
items.I33.series = 'forgotten';

items.I55 = {};
items.I55.name = 'Festive Wakizashi';
items.I55.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(602, "I55")+' Deific Damage<br>On Attack: Low chance to celebrate serizawa festival, increasing damage from all sources by 20%'`;
items.I55.flavor = '"A ceremonial blade used in festivities and joyous days."';
items.I55.quality = 'Uncommon';
items.I55.sell = 1000;
items.I55.max = 10;
items.I55.use = 'gearSwap(items.I55.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I55.stats = 'weaponDeificDamage = returnItemUpgradeScaling(602, "I55");'
items.I55.remove = 'weaponDeificDamage = 0;'
items.I55.align = 'deific';
items.I55.attackChance = 'if (rng(1,10)===1) castSerizawaFestival()'
items.I55.series = 'millionaire';

items.I60 = {};
items.I60.name = 'Bluefin Tuna';
items.I60.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(35621, "I60"))+' Deific Damage<br>On Attack: Low chance to summon 3 flying fish, dealing low '+deificIcon+'Deific Damage'`;
items.I60.flavor = '"Never swim against the current. Never go against tortuga."';
items.I60.quality = 'Rare';
items.I60.sell = 15000;
items.I60.max = 10;
items.I60.use = 'gearSwap(items.I60.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I60.stats = 'weaponDeificDamage = returnItemUpgradeScaling(35621, "I60");'
items.I60.remove = 'weaponDeificDamage = 0; '
items.I60.align = 'deific';
items.I60.attackChance = 'if (rng(1,10)===1) castBluefinTuna()';
items.I60.series = "revered"; 

items.I64 = {};
items.I64.name = 'Terrorscythe';
items.I64.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+25.6K Occult Damage<br>On Attack: Low chance to reap the soul of the enemy, increasing '+occultIcon+'Occult Damage by 25%.';
items.I64.flavor = '"A weapon normally asociated with either death and grim, or just getting some vegetables out of the floor. Which one will it be?"';
items.I64.quality = 'Rare';
items.I64.sell = 2000;
items.I64.max = 1;
items.I64.use = 'gearSwap(items.I64.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I64.stats = 'weaponOccultDamage = 25666;'
items.I64.remove = 'weaponOccultDamage = 0;';
items.I64.align = 'occult';
items.I64.attackChance = 'if (rng(1,10)===1) castTerrorscythe();';
//items.I64.series = 'forgotten';

items.I69 = {};
items.I69.name = 'Boxing Gloves';
items.I69.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+1512 Might Damage<br>On Attack: Low chance to knock out the enemy, interrupting their attack';
items.I69.flavor = '"If a turtle wore boxing gloves, would they wear them like this or...?"';
items.I69.quality = 'Uncommon';
items.I69.sell = 4500;
items.I69.max = 1;
items.I69.use = 'gearSwap(items.I69.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I69.stats = 'weaponMightDamage = 1512;'
items.I69.align = 'might';
items.I69.attackChance = 'if (rng(1,5)===1) castBoxingGloves()';
items.I69.series = 'forgotten';

items.I78 = {};
items.I78.name = 'Regal Broadsword';
items.I78.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(110, "I78")+' Might Damage<br>On Attack: Low chance to inflict a royal slash dealing 150-200 '+mightIcon+'Might Damage'`;
items.I78.flavor = '"A fine sword bestowed to the nobility of the turtle kingdom. They say that blood spilled with this edge bleeds blue."';
items.I78.quality = 'Uncommon';
items.I78.sell = 1000;
items.I78.max = 10;
items.I78.use = 'gearSwap(items.I78.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I78.stats = 'weaponMightDamage = returnItemUpgradeScaling(110, "I78");'
items.I78.remove = 'weaponMightDamage = 0;'
items.I78.align = 'might';
items.I78.attackChance = 'if (rng(1,5)===1) castRegalBroadsword()'
items.I78.series = 'millionaire';

items.I81 = {};
items.I81.name = 'Sacrificial Dagger';
items.I81.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(7800, "I81"))+' Occult Damage<br>+300 Haste<br>On Attack: Low chance to inflict a cursed rend, dealing medium '+occultIcon+'Occult damage and stealing a part of the damage dealt as HP'`;
items.I81.flavor = '"A dagger used in rituals of darkness. The dagger itself has nothing sinister going on, it just simply had the misfortune of taking part in them."';
items.I81.quality = 'Rare';
items.I81.sell = 5000;
items.I81.max = 10;
items.I81.use = 'gearSwap(items.I81.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I81.stats = 'weaponOccultDamage = returnItemUpgradeScaling(7800, "I81"); weaponHaste = 300'
items.I81.remove = 'weaponOccultDamage = 0; ; weaponHaste = 0'
items.I81.attackChance = 'if (rng(1,5)===1) castSacrificialDagger()';
items.I81.align = "occult";
items.I81.series = 'forgotten';

items.I82 = {};
items.I82.name = 'Dragonfell Sword';
items.I82.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+beautify(486739)+' Might Damage<br>-2000 Haste<br>On Attack: Slams the foe with the weight of the sword';
items.I82.flavor = '"Too big to be called a sword. Too big, too thick, too heavy, and too rough. It\'s more like a large hunk of iron."';
items.I82.quality = 'Rare';
items.I82.sell = 30000;
items.I82.max = 1;
items.I82.use = 'gearSwap(items.I82.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I82.stats = 'weaponMightDamage = 486739; weaponHaste = -2000'
items.I82.remove = 'weaponMightDamage = 0; weaponHaste = 0'
items.I82.attackChance = 'castDragonfellSword()';
items.I82.align = "might";
items.I82.series = 'millionaire';

items.I169 = {};
items.I169.name = 'The Caught';
items.I169.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+510.3K Might Damage<br>On Attack: Low chance to create a whirlpool that hits 6 times for medium '+mightIcon+'Might Damage';
items.I169.flavor = '"A two-pronged fishing spear forged from a unique blue-hued metal, reflecting the mysteries of the deep."';
items.I169.quality = 'Epic';
items.I169.sell = 250000;
items.I169.max = 1;
items.I169.use = 'gearSwap(items.I169.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I169.stats = 'weaponMightDamage = 510392'
items.I169.remove = 'weaponMightDamage = 0;'
items.I169.align = 'might';
items.I169.attackChance = 'if (rng(1,5)===1) castTheCaught()'
items.I169.series = 'forgotten';

items.I170 = {};
items.I170.name = 'Penguin\'s Umbrella';
items.I170.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+910 Deific Damage<br>On Attack: High chance to pull out random stuff out of your umbrella, dealing various types of damage';
items.I170.flavor = '"A lot of tape and a little patience make all the difference."';
items.I170.quality = 'Rare';
items.I170.sell = 12000;
items.I170.max = 1;
items.I170.use = 'gearSwap(items.I170.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I170.stats = 'additiveDeificDamage += 910; weaponSwap("W22")'
items.I170.remove = 'additiveDeificDamage -= 910; weaponSwap("W0")'
items.I170.align = 'deific';
items.I170.attackChance = 'if (rng(1,2)===1) castPenguinsUmbrella()'

items.I167 = {};
items.I167.name = 'Wraithblade Scimitar';
items.I167.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(193722, "I167"))+' Occult Damage<br>On Attack: Burns the soul of the enemy inflicting '+occultIcon+'Occult Damage overtime. Once this effect reaches 10 stacks, the target soul will collapse dealing high '+occultIcon+'Occult Damage'`;
items.I167.flavor = '"A spooky scary blade with an otherworldly edge. It sends shivers down your spine."';
items.I167.quality = 'Epic';
items.I167.sell = 40000;
items.I167.max = 10;
items.I167.use = 'gearSwap(items.I167.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I167.stats = 'weaponOccultDamage = returnItemUpgradeScaling(193722, "I167");'
items.I167.remove = 'weaponOccultDamage = 0;'
items.I167.align = 'occult';
items.I167.attackChance = 'castWraithbladeScimitar()'
items.I167.series = "solstice"; 

items.I137 = {};
items.I137.name = 'King-Kat Decapitator';
items.I137.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(3412, "I137")+' Might Damage<br>On Attack: Medium chance to let out a mighty roar, increasing '+mightIcon+'Might Damage by 25%'`;
items.I137.flavor = '"It\'s not flawed, it\'s just a one-handed axe."';
items.I137.quality = 'Rare';
items.I137.sell = 1500;
items.I137.max = 10;
items.I137.use = 'gearSwap(items.I137.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I137.stats = 'weaponMightDamage = returnItemUpgradeScaling(3412, "I137");'
items.I137.remove = 'weaponMightDamage = 0;'
items.I137.align = 'might';
items.I137.attackChance = 'if (rng(1,8)===1) castKingKatDecapitator()';
items.I137.series = "beastfallen"; 

items.I83 = {};
items.I83.name = 'Chrysalis Recurver';
items.I83.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(469, "I83")+' Occult Damage<br>On Attack: Shoot a crystal shard'`;
items.I83.flavor = '"A short, ominous bow splintered with red crystals."';
items.I83.quality = 'Rare';
items.I83.sell = 1000;
items.I83.max = 10;
items.I83.use = 'gearSwap(items.I83.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I83.stats = 'weaponOccultDamage = returnItemUpgradeScaling(469, "I83");'
items.I83.remove = 'weaponOccultDamage = 0;'
items.I83.attackChance = 'castChrysalisRecurver()'
items.I83.align ="occult";
items.I83.animation = 'ranged';
items.I83.series = "beastfallen"; 

items.I80 = {};
items.I80.name = 'Copperwork Axe';
items.I80.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(510, "I80")+' Elemental Damage<br>On Attack: Low chance to launch a stream of hot steam dealing medium '+elementalIcon+'Elemental Damage'`;
items.I80.flavor = '"This must be the sort of weapon that turtles had been using before the iron age, which began approximately 1200 BC."';
items.I80.quality = 'Uncommon';
items.I80.sell = 1000;
items.I80.max = 10;
items.I80.use = 'gearSwap(items.I80.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I80.stats = 'weaponElementalDamage = returnItemUpgradeScaling(510, "I80");'
items.I80.remove = 'weaponElementalDamage = 0;'
items.I80.attackChance = 'if (rng(1,5)===1) castCopperworkAxe()'
items.I80.align = 'elemental';
items.I80.series = 'masterwork';

items.I59 = {};
items.I59.name = 'Rana Hat';
items.I59.description = 'Equipable - Head<br><FONT COLOR="#1EFF0C">+2130 Max HP<br>+210 Regeneration';
items.I59.flavor = '"Ribbit."';
items.I59.quality = 'Uncommon';
items.I59.sell = 2500;
items.I59.max = 1;
items.I59.use = 'gearSwap(items.I59.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I59.stats = 'headAdditiveMaxHp = 2130; headAdditiveRegen = 210'
items.I59.remove = 'headAdditiveMaxHp = 0; headAdditiveRegen = 0'
items.I59.series = 'forgotten';

items.I2 = {};
items.I2.name = 'Cloth Slippers';
items.I2.description = `'Equipable - Feet<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(82*2, "I2")+' Max HP<br>+'+ returnItemUpgradeScaling(8*2, "I2")+' Regeneration<br><FONT COLOR="#b983f7">Cloth Set:<br>'`;
items.I2.tierDesc1 = "I3";
items.I2.tierDesc2 = "I5";
items.I2.tierDesc3 = "I4";
items.I2.tierDesc4 = "I6";
items.I2.tierDesc5 = "I2";
items.I2.tierArmorBonus = "★ Set bonus [5]: +250 Max HP";
items.I2.flavor = '"The kind your turtle grandmother would wear."';
items.I2.quality = 'Common';
items.I2.sell = 300;
items.I2.max = 10;
items.I2.use = 'gearSwap(items.I2.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I2.stats = 'feetAdditiveMaxHp = returnItemUpgradeScaling(82*2, "I2"); feetAdditiveRegen = returnItemUpgradeScaling(8*2, "I2")'
items.I2.remove = 'feetAdditiveMaxHp = 0; feetAdditiveRegen = 0'
items.I2.series = 'millionaire';

items.I3 = {};
items.I3.name = 'Worn Bandana';
items.I3.description = `'Equipable - Head<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(84*2, "I3")+' Max HP<br>+'+ returnItemUpgradeScaling(8.2*2, "I3")+' Regeneration<br><FONT COLOR="#b983f7">Cloth Set:<br>'`;
items.I3.flavor = '"A foul-smelling rag for the forehead. Unfortunately, it goes in the head slot."';
items.I3.tierDesc1 = "I3";
items.I3.tierDesc2 = "I5";
items.I3.tierDesc3 = "I4";
items.I3.tierDesc4 = "I6";
items.I3.tierDesc5 = "I2";
items.I3.tierArmorBonus = "★ Set bonus [5]: +250 Max HP";
items.I3.quality = 'Common';
items.I3.sell = 300
items.I3.max = 10; 
items.I3.use = 'gearSwap(items.I3.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I3.stats = 'headAdditiveMaxHp = returnItemUpgradeScaling(84*2, "I3"); headAdditiveRegen = returnItemUpgradeScaling(8.2*2, "I3")'
items.I3.remove = 'headAdditiveMaxHp = 0; headAdditiveRegen = 0'
items.I3.series = 'millionaire';

items.I4 = {};
items.I4.name = 'Cloth Bracelet';
items.I4.description = `'Equipable - Hands<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(79*2, "I4")+' Max HP<br>+'+ returnItemUpgradeScaling(7.4*2, "I4")+' Regeneration<br><FONT COLOR="#b983f7">Cloth Set:<br>'`;
items.I4.flavor = '"Seems to not be of your size."';
items.I4.tierDesc1 = "I3";
items.I4.tierDesc2 = "I5";
items.I4.tierDesc3 = "I4";
items.I4.tierDesc4 = "I6";
items.I4.tierDesc5 = "I2";
items.I4.tierArmorBonus = "★ Set bonus [5]: +250 Max HP";
items.I4.quality = 'Common';
items.I4.sell = 300;
items.I4.max = 10;
items.I4.use = 'gearSwap(items.I4.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I4.stats = 'handsAdditiveMaxHp = returnItemUpgradeScaling(79*2, "I4"); handsAdditiveRegen = returnItemUpgradeScaling(7.4*2, "I4")'
items.I4.remove = 'handsAdditiveMaxHp = 0; handsAdditiveRegen = 0'
items.I4.series = 'millionaire';

items.I5 = {};
items.I5.name = 'Cloth Shirt';
items.I5.description = `'Equipable - Chest<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(89*2, "I5")+' Max HP<br>+'+ returnItemUpgradeScaling(8*2, "I5")+' Regeneration<br><FONT COLOR="#b983f7">Cloth Set:<br>'`;
items.I5.flavor = '"More effective than nothing whatsoever. Not much more, though."';
items.I5.tierDesc1 = "I3";
items.I5.tierDesc2 = "I5";
items.I5.tierDesc3 = "I4";
items.I5.tierDesc4 = "I6";
items.I5.tierDesc5 = "I2";
items.I5.tierArmorBonus = "★ Set bonus [5]: +250 Max HP";
items.I5.quality = 'Common';
items.I5.sell = 300;
items.I5.max = 10;
items.I5.use = 'gearSwap(items.I5.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I5.stats = 'chestAdditiveMaxHp = returnItemUpgradeScaling(89*2, "I5"); chestAdditiveRegen = returnItemUpgradeScaling(8*2, "I5")'
items.I5.remove = 'chestAdditiveMaxHp = 0; chestAdditiveRegen = 0'
items.I5.series = 'millionaire';

items.I6 = {};
items.I6.name = 'Cloth Pants';
items.I6.description = `'Equipable - Legs<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(83*2, "I6")+' Max HP<br>+'+ returnItemUpgradeScaling(7.6*2, "I6")+' Regeneration<br><FONT COLOR="#b983f7">Cloth Set:<br>'`;
items.I6.flavor = '"They must at least be resistant if they were able to survive this long."';
items.I6.quality = 'Common';
items.I6.tierDesc1 = "I3";
items.I6.tierDesc2 = "I5";
items.I6.tierDesc3 = "I4";
items.I6.tierDesc4 = "I6";
items.I6.tierDesc5 = "I2";
items.I6.tierArmorBonus = "★ Set bonus [5]: +250 Max HP";
items.I6.sell = 300;
items.I6.max = 10;
items.I6.use = 'gearSwap(items.I6.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I6.stats = 'legsAdditiveMaxHp = returnItemUpgradeScaling(83*2, "I6"); legsAdditiveRegen = returnItemUpgradeScaling(7.6*2, "I6")'
items.I6.remove = 'legsAdditiveMaxHp = 0; legsAdditiveRegen = 0'
items.I6.series = 'millionaire';

items.I73 = {};
items.I73.name = 'Plated Explorer Boots';
items.I73.description = `'Equipable - Feet<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(2775.5, "I73")+' Max HP<br>+'+ returnItemUpgradeScaling(265.5, "I73")+' Regeneration<br><FONT COLOR="#b983f7">Plated Explorer Set:<br>'`;
items.I73.flavor = '"Adventures await at every step."';
items.I73.tierDesc1 = "I74";
items.I73.tierDesc2 = "I76";
items.I73.tierDesc3 = "I75";
items.I73.tierDesc4 = "I77";
items.I73.tierDesc5 = "I73";
items.I73.tierArmorBonus = "★ Set bonus [5]: "+natureIcon+"You can now talk to plants";
items.I73.quality = 'Uncommon';
items.I73.sell = 2600;
items.I73.max = 10;
items.I73.use = 'gearSwap(items.I73.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I73.stats = 'feetAdditiveMaxHp = returnItemUpgradeScaling(2775.5, "I73"); feetAdditiveRegen = returnItemUpgradeScaling(265.5, "I73")'
items.I73.remove = 'feetAdditiveMaxHp = 0; feetAdditiveRegen = 0'
items.I73.series = 'masterwork';

items.I74 = {};
items.I74.name = 'Plated Explorer Boonie';
items.I74.description = `'Equipable - Head<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(2885.5, "I74")+' Max HP<br>+'+ returnItemUpgradeScaling(275.5, "I74")+' Regeneration<br><FONT COLOR="#b983f7">Plated Explorer Set:<br>'`;
items.I74.flavor = '"A fashionable attire for turtles that are not overly reliant on directions."';
items.I74.quality = 'Uncommon';
items.I74.tierDesc1 = "I74";
items.I74.tierDesc2 = "I76";
items.I74.tierDesc3 = "I75";
items.I74.tierDesc4 = "I77";
items.I74.tierDesc5 = "I73";
items.I74.tierArmorBonus = "★ Set bonus [5]: "+natureIcon+"You can now talk to plants";
items.I74.sell = 2600;
items.I74.max = 10; 
items.I74.use = 'gearSwap(items.I74.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I74.stats = 'headAdditiveMaxHp = returnItemUpgradeScaling(2885.5, "I74"); headAdditiveRegen = returnItemUpgradeScaling(275.5, "I74")'
items.I74.remove = 'headAdditiveMaxHp = 0; headAdditiveRegen = 0'
items.I74.series = 'masterwork';

items.I75 = {};
items.I75.name = 'Plated Explorer Gloves';
items.I75.description = `'Equipable - Hands<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(2795.5, "I75")+' Max HP<br>+'+ returnItemUpgradeScaling(285.5, "I75")+' Regeneration<br><FONT COLOR="#b983f7">Plated Explorer Set:<br>'`;
items.I75.flavor = '"Not that they are much of use for you."';
items.I75.quality = 'Uncommon';
items.I75.tierDesc1 = "I74";
items.I75.tierDesc2 = "I76";
items.I75.tierDesc3 = "I75";
items.I75.tierDesc4 = "I77";
items.I75.tierDesc5 = "I73";
items.I75.tierArmorBonus = "★ Set bonus [5]: "+natureIcon+"You can now talk to plants";
items.I75.sell = 2600;
items.I75.max = 10;
items.I75.use = 'gearSwap(items.I75.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I75.stats = 'handsAdditiveMaxHp = returnItemUpgradeScaling(2795.5, "I75"); handsAdditiveRegen = returnItemUpgradeScaling(285.5, "I75")'
items.I75.remove = 'handsAdditiveMaxHp = 0; handsAdditiveRegen = 0'
items.I75.series = 'masterwork';

items.I76 = {};
items.I76.name = 'Plated Explorer Cuirass';
items.I76.description = `'Equipable - Chest<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(2945.5, "I76")+' Max HP<br>+'+ returnItemUpgradeScaling(295.5, "I76")+' Regeneration<br><FONT COLOR="#b983f7">Plated Explorer Set:<br>'`;
items.I76.flavor = '"Includes camouflage."';
items.I76.quality = 'Uncommon';
items.I76.tierDesc1 = "I74";
items.I76.tierDesc2 = "I76";
items.I76.tierDesc3 = "I75";
items.I76.tierDesc4 = "I77";
items.I76.tierDesc5 = "I73";
items.I76.tierArmorBonus = "★ Set bonus [5]: "+natureIcon+"You can now talk to plants";
items.I76.sell = 2600;
items.I76.max = 10;
items.I76.use = 'gearSwap(items.I76.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I76.stats = 'chestAdditiveMaxHp = returnItemUpgradeScaling(2945.5, "I76"); chestAdditiveRegen = returnItemUpgradeScaling(295.5, "I76")'
items.I76.remove = 'chestAdditiveMaxHp = 0; chestAdditiveRegen = 0'
items.I76.series = 'masterwork';

items.I77 = {};
items.I77.name = 'Plated Explorer Pants';
items.I77.description = `'Equipable - Legs<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(2805.5, "I77")+' Max HP<br>+'+ returnItemUpgradeScaling(285.5, "I77")+' Regeneration<br><FONT COLOR="#b983f7">Plated Explorer Set:<br>'`;
items.I77.flavor = '"The copper bolts aimed at the knees emphasize the importance of avoiding falling."';
items.I77.quality = 'Uncommon';
items.I77.tierDesc1 = "I74";
items.I77.tierDesc2 = "I76";
items.I77.tierDesc3 = "I75";
items.I77.tierDesc4 = "I77";
items.I77.tierDesc5 = "I73";
items.I77.tierArmorBonus = "★ Set bonus [5]: "+natureIcon+"You can now talk to plants";
items.I77.sell = 2600;
items.I77.max = 10;
items.I77.use = 'gearSwap(items.I77.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I77.stats = 'legsAdditiveMaxHp = returnItemUpgradeScaling(2805.5, "I77"); legsAdditiveRegen = returnItemUpgradeScaling(285.5, "I77")'
items.I77.remove = 'legsAdditiveMaxHp = 0; legsAdditiveRegen = 0'
items.I77.series = 'masterwork';

items.I132 = {};
items.I132.name = 'Jungle King Paws';
items.I132.description = `'Equipable - Feet<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(277*65, "I132"))+' Max HP<br>+'+ returnItemUpgradeScaling(26*65, "I132")+' Regeneration<br><FONT COLOR="#b983f7">Jungle King Set:<br>'`;
items.I132.flavor = '"Pawsitively adorable."';
items.I132.tierDesc1 = "I133";
items.I132.tierDesc2 = "I135";
items.I132.tierDesc3 = "I134";
items.I132.tierDesc4 = "I136";
items.I132.tierDesc5 = "I132";
items.I132.tierArmorBonus = "★ Set bonus [5]: Your attacks have a high chance to lacerate the enemy for 1800-2000 "+mightIcon+"Might Damage";
items.I132.quality = 'Rare';
items.I132.sell = 1000;
items.I132.max = 10;
items.I132.use = 'gearSwap(items.I132.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I132.stats = 'feetAdditiveMaxHp = returnItemUpgradeScaling(277*65, "I132"); feetAdditiveRegen = returnItemUpgradeScaling(26*65, "I132");'
items.I132.remove = 'feetAdditiveMaxHp = 0; feetAdditiveRegen = 0;'
items.I132.series = "beastfallen"; 

items.I133 = {};
items.I133.name = 'Jungle King Helm';
items.I133.description = `'Equipable - Head<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(279*65, "I133"))+' Max HP<br>+'+ returnItemUpgradeScaling(27*65, "I133")+' Regeneration<br><FONT COLOR="#b983f7">Jungle King Set:<br>'`;
items.I133.flavor = '"It\'s hard to look mighty with those fluffy ears looking at me."';
items.I133.quality = 'Rare';
items.I133.tierDesc1 = "I133";
items.I133.tierDesc2 = "I135";
items.I133.tierDesc3 = "I134";
items.I133.tierDesc4 = "I136";
items.I133.tierDesc5 = "I132";
items.I133.tierArmorBonus = "★ Set bonus [5]: Your attacks have a high chance to lacerate the enemy for 1800-2000 "+mightIcon+"Might Damage";
items.I133.sell = 1000;
items.I133.max = 10; 
items.I133.use = 'gearSwap(items.I133.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I133.stats = 'headAdditiveMaxHp = returnItemUpgradeScaling(279*65, "I133"); headAdditiveRegen = returnItemUpgradeScaling(27*65, "I133");'
items.I133.remove = 'headAdditiveMaxHp = 0; headAdditiveRegen = 0;'
items.I133.series = "beastfallen"; 

items.I134 = {};
items.I134.name = 'Jungle King Mittens';
items.I134.description = `'Equipable - Hands<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(269*65, "I134"))+' Max HP<br>+'+ returnItemUpgradeScaling(26*65, "I134")+' Regeneration<br><FONT COLOR="#b983f7">Jungle King Set:<br>'`;
items.I134.flavor = '"Far more secure than metal gloves."';
items.I134.quality = 'Rare';
items.I134.tierDesc1 = "I133";
items.I134.tierDesc2 = "I135";
items.I134.tierDesc3 = "I134";
items.I134.tierDesc4 = "I136";
items.I134.tierDesc5 = "I132";
items.I134.tierArmorBonus = "★ Set bonus [5]: Your attacks have a high chance to lacerate the enemy for 1800-2000 "+mightIcon+"Might Damage";
items.I134.sell = 1000;
items.I134.max = 10;
items.I134.use = 'gearSwap(items.I134.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I134.stats = 'handsAdditiveMaxHp = returnItemUpgradeScaling(269*65, "I134"); handsAdditiveRegen = returnItemUpgradeScaling(26*65, "I134");'
items.I134.remove = 'handsAdditiveMaxHp = 0; handsAdditiveRegen = 0;'
items.I134.series = "beastfallen"; 

items.I135 = {};
items.I135.name = 'Jungle King Chestplate';
items.I135.description = `'Equipable - Chest<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(280*65, "I135"))+' Max HP<br>+'+ returnItemUpgradeScaling(28*65, "I135")+' Regeneration<br><FONT COLOR="#b983f7">Jungle King Set:<br>'`;
items.I135.flavor = '"Adorned with the fierce and majestic pattern of a tiger, blending strength and style on the battlefield."';
items.I135.quality = 'Rare';
items.I135.tierDesc1 = "I133";
items.I135.tierDesc2 = "I135";
items.I135.tierDesc3 = "I134";
items.I135.tierDesc4 = "I136";
items.I135.tierDesc5 = "I132";
items.I135.tierArmorBonus = "★ Set bonus [5]: Your attacks have a high chance to lacerate the enemy for 1800-2000 "+mightIcon+"Might Damage";
items.I135.sell = 1000;
items.I135.max = 10;
items.I135.use = 'gearSwap(items.I135.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I135.stats = 'chestAdditiveMaxHp = returnItemUpgradeScaling(280*65, "I135"); chestAdditiveRegen = returnItemUpgradeScaling(28*65, "I135");'
items.I135.remove = 'chestAdditiveMaxHp = 0; chestAdditiveRegen = 0;'
items.I135.series = "beastfallen"; 

items.I136 = {};
items.I136.name = 'Jungle King Tail';
items.I136.description = `'Equipable - Legs<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(279*65, "I136"))+' Max HP<br>+'+ returnItemUpgradeScaling(27*65, "I136")+' Regeneration<br><FONT COLOR="#b983f7">Jungle King Set:<br>'`;
items.I136.flavor = '"Doesn\'t need to be plugged anywhere fortunately."';
items.I136.quality = 'Rare';
items.I136.tierDesc1 = "I133";
items.I136.tierDesc2 = "I135";
items.I136.tierDesc3 = "I134";
items.I136.tierDesc4 = "I136";
items.I136.tierDesc5 = "I132";
items.I136.tierArmorBonus = "★ Set bonus [5]: Your attacks have a high chance to lacerate the enemy for 1800-2000 "+mightIcon+"Might Damage";
items.I136.sell = 1000;
items.I136.max = 10;
items.I136.use = 'gearSwap(items.I136.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I136.stats = 'legsAdditiveMaxHp = returnItemUpgradeScaling(279*65, "I136"); legsAdditiveRegen = returnItemUpgradeScaling(27*65, "I136");'
items.I136.remove = 'legsAdditiveMaxHp = 0; legsAdditiveRegen = 0;'
items.I136.series = "beastfallen"; 

items.I138 = {};
items.I138.name = 'Pringu Slippers';
items.I138.description = `'Equipable - Feet<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(277*410, "I138"))+' Max HP<br>+'+ returnItemUpgradeScaling(26*410, "I138")+' Regeneration<br><FONT COLOR="#b983f7">Pringu Set:<br>'`;
items.I138.flavor = '"They really said 🐟."';
items.I138.tierDesc1 = "I139";
items.I138.tierDesc2 = "I141";
items.I138.tierDesc3 = "I140";
items.I138.tierDesc4 = "I142";
items.I138.tierDesc5 = "I138";
items.I138.tierArmorBonus = "★ Set bonus [5]: Your attacks rain down a tuna, dealing  8000-10000 "+deificIcon+"Deific Damage";
items.I138.quality = 'Rare';
items.I138.sell = 10000;
items.I138.max = 10;
items.I138.use = 'gearSwap(items.I138.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I138.stats = 'feetAdditiveMaxHp = returnItemUpgradeScaling(277*410, "I138"); feetAdditiveRegen = returnItemUpgradeScaling(26*410, "I138");'
items.I138.remove = 'feetAdditiveMaxHp = 0; feetAdditiveRegen = 0;'
items.I138.series = "revered"; 

items.I139 = {};
items.I139.name = 'Pringu Hat';
items.I139.description = `'Equipable - Head<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(279*410, "I139"))+' Max HP<br>+'+ returnItemUpgradeScaling(27*410, "I139")+' Regeneration<br><FONT COLOR="#b983f7">Pringu Set:<br>'`;
items.I139.flavor = '"Noot Noot."';
items.I139.quality = 'Rare';
items.I139.tierDesc1 = "I139";
items.I139.tierDesc2 = "I141";
items.I139.tierDesc3 = "I140";
items.I139.tierDesc4 = "I142";
items.I139.tierDesc5 = "I138";
items.I139.tierArmorBonus = "★ Set bonus [5]: Your attacks rain down a tuna, dealing  8000-10000 "+deificIcon+"Deific Damage";
items.I139.sell = 10000;
items.I139.max = 10; 
items.I139.use = 'gearSwap(items.I139.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I139.stats = 'headAdditiveMaxHp = returnItemUpgradeScaling(279*410, "I139"); headAdditiveRegen = returnItemUpgradeScaling(27*410, "I139");'
items.I139.remove = 'headAdditiveMaxHp = 0; headAdditiveRegen = 0;'
items.I139.series = "revered"; 

items.I140 = {};
items.I140.name = 'Pringu Gloves';
items.I140.description = `'Equipable - Hands<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(278*410, "I140"))+' Max HP<br>+'+ returnItemUpgradeScaling(26*410, "I140")+' Regeneration<br><FONT COLOR="#b983f7">Pringu Set:<br>'`;
items.I140.flavor = '"That\'s how they keep themselves warm."';
items.I140.quality = 'Rare';
items.I140.tierDesc1 = "I139";
items.I140.tierDesc2 = "I141";
items.I140.tierDesc3 = "I140";
items.I140.tierDesc4 = "I142";
items.I140.tierDesc5 = "I138";
items.I140.tierArmorBonus = "★ Set bonus [5]: Your attacks rain down a tuna, dealing  8000-10000 "+deificIcon+"Deific Damage";
items.I140.sell = 10000;
items.I140.max = 10;
items.I140.use = 'gearSwap(items.I140.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I140.stats = 'handsAdditiveMaxHp = returnItemUpgradeScaling(278*410, "I140"); handsAdditiveRegen = returnItemUpgradeScaling(26*410, "I140");'
items.I140.remove = 'handsAdditiveMaxHp = 0; handsAdditiveRegen = 0;'
items.I140.series = "revered"; 

items.I141 = {};
items.I141.name = 'Pringu Cape';
items.I141.description = `'Equipable - Chest<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(281*410, "I141"))+' Max HP<br>+'+ returnItemUpgradeScaling(27*410, "I141")+' Regeneration<br><FONT COLOR="#b983f7">Pringu Set:<br>'`;
items.I141.flavor = '"Charm +220."';
items.I141.quality = 'Rare';
items.I141.tierDesc1 = "I139";
items.I141.tierDesc2 = "I141";
items.I141.tierDesc3 = "I140";
items.I141.tierDesc4 = "I142";
items.I141.tierDesc5 = "I138";
items.I141.tierArmorBonus = "★ Set bonus [5]: Your attacks rain down a tuna, dealing  8000-10000 "+deificIcon+"Deific Damage";
items.I141.sell = 10000;
items.I141.max = 10;
items.I141.use = 'gearSwap(items.I141.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I141.stats = 'chestAdditiveMaxHp = returnItemUpgradeScaling(281*410, "I141"); chestAdditiveRegen = returnItemUpgradeScaling(27*410, "I141");'
items.I141.remove = 'chestAdditiveMaxHp = 0; chestAdditiveRegen = 0;'
items.I141.series = "revered"; 

items.I142 = {};
items.I142.name = 'Pringu Pants';
items.I142.description = `'Equipable - Legs<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(280*410, "I142"))+' Max HP<br>+'+ returnItemUpgradeScaling(28*410, "I142")+' Regeneration<br><FONT COLOR="#b983f7">Pringu Set:<br>'`;
items.I142.flavor = '"Tuxedoed mystique."';
items.I142.quality = 'Rare';
items.I142.tierDesc1 = "I139";
items.I142.tierDesc2 = "I141";
items.I142.tierDesc3 = "I140";
items.I142.tierDesc4 = "I142";
items.I142.tierDesc5 = "I138";
items.I142.tierArmorBonus = "★ Set bonus [5]: Your attacks rain down a tuna, dealing  8000-10000 "+deificIcon+"Deific Damage";
items.I142.sell = 10000;
items.I142.max = 10;
items.I142.use = 'gearSwap(items.I142.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I142.stats = 'legsAdditiveMaxHp = returnItemUpgradeScaling(280*410, "I142"); legsAdditiveRegen = returnItemUpgradeScaling(28*410, "I142");'
items.I142.remove = 'legsAdditiveMaxHp = 0; legsAdditiveRegen = 0;'
items.I142.series = "revered"; 

items.I143 = {};
items.I143.name = 'Ghastly Captain Peg Leg';
items.I143.description = `'Equipable - Feet<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(273*2831, "I143"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(27*2831, "I143"))+' Regeneration<br><FONT COLOR="#b983f7">Ghastly Captain Set:<br>'`;
items.I143.flavor = '"Spectral limb that once sailed the haunted seas, now hunts the toe."';
items.I143.quality = 'Rare';
items.I143.tierDesc1 = "I144";
items.I143.tierDesc2 = "I146";
items.I143.tierDesc3 = "I145";
items.I143.tierDesc4 = "I147";
items.I143.tierDesc5 = "I143";
items.I143.tierArmorBonus = "★ Set bonus [5]: Your attacks have a chance to trigger a Sea Chanty, increasing Drop Rate, Crit Chance or Strength for 20 seconds";
items.I143.sell = 35000;
items.I143.max = 10;
items.I143.use = 'gearSwap(items.I143.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I143.stats = 'feetAdditiveMaxHp = returnItemUpgradeScaling(273*2831, "I143"); feetAdditiveRegen = returnItemUpgradeScaling(27*2831, "I143");'
items.I143.remove = 'feetAdditiveMaxHp = 0; feetAdditiveRegen = 0;'
items.I143.series = "solstice"; 

items.I144 = {};
items.I144.name = 'Ghastly Captain Hat';
items.I144.description = `'Equipable - Head<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(287*2831, "I144"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(28*2831, "I144"))+' Regeneration<br><FONT COLOR="#b983f7">Ghastly Captain Set:<br>'`;
items.I144.flavor = '"Crowned with ethereal shadows."';
items.I144.quality = 'Rare';
items.I144.tierDesc1 = "I144";
items.I144.tierDesc2 = "I146";
items.I144.tierDesc3 = "I145";
items.I144.tierDesc4 = "I147";
items.I144.tierDesc5 = "I143";
items.I144.tierArmorBonus = "★ Set bonus [5]: Your attacks have a chance to trigger a Sea Chanty, increasing Drop Rate, Crit Chance or Strength for 20 seconds";
items.I144.sell = 35000;
items.I144.max = 10; 
items.I144.use = 'gearSwap(items.I144.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I144.stats = 'headAdditiveMaxHp = returnItemUpgradeScaling(287*2831, "I144"); headAdditiveRegen = returnItemUpgradeScaling(28*2831, "I144");'
items.I144.remove = 'headAdditiveMaxHp = 0; headAdditiveRegen = 0;'
items.I144.series = "solstice"; 

items.I145 = {};
items.I145.name = 'Ghastly Captain Hook';
items.I145.description = `'Equipable - Hands<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(275*2831, "I145"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(27*2831, "I145"))+' Regeneration<br><FONT COLOR="#b983f7">Ghastly Captain Set:<br>'`;
items.I145.flavor = '"Looks cursed but it gives better stats."';
items.I145.quality = 'Rare';
items.I145.tierDesc1 = "I144";
items.I145.tierDesc2 = "I146";
items.I145.tierDesc3 = "I145";
items.I145.tierDesc4 = "I147";
items.I145.tierDesc5 = "I143";
items.I145.tierArmorBonus = "★ Set bonus [5]: Your attacks have a chance to trigger a Sea Chanty, increasing Drop Rate, Crit Chance or Strength for 20 seconds";
items.I145.sell = 35000;
items.I145.max = 10;
items.I145.use = 'gearSwap(items.I145.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I145.stats = 'handsAdditiveMaxHp = returnItemUpgradeScaling(275*2831, "I145"); handsAdditiveRegen = returnItemUpgradeScaling(27*2831, "I145");'
items.I145.remove = 'handsAdditiveMaxHp = 0; handsAdditiveRegen = 0;'
items.I145.series = "solstice"; 

items.I146 = {};
items.I146.name = 'Ghastly Captain Poet Shirt';
items.I146.description = `'Equipable - Chest<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(290*2831, "I146"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(29*2831, "I146"))+' Regeneration<br><FONT COLOR="#b983f7">Ghastly Captain Set:<br>'`;
items.I146.flavor = '"Draped in the haunting grace of the ghostly muse."';
items.I146.quality = 'Rare';
items.I146.tierDesc1 = "I144";
items.I146.tierDesc2 = "I146";
items.I146.tierDesc3 = "I145";
items.I146.tierDesc4 = "I147";
items.I146.tierDesc5 = "I143";
items.I146.tierArmorBonus = "★ Set bonus [5]: Your attacks have a chance to trigger a Sea Chanty, increasing Drop Rate, Crit Chance or Strength for 20 seconds";
items.I146.sell = 35000;
items.I146.max = 10;
items.I146.use = 'gearSwap(items.I146.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I146.stats = 'chestAdditiveMaxHp = returnItemUpgradeScaling(290*2831, "I146"); chestAdditiveRegen = returnItemUpgradeScaling(29*2831, "I146");'
items.I146.remove = 'chestAdditiveMaxHp = 0; chestAdditiveRegen = 0;'
items.I146.series = "solstice"; 

items.I147 = {};
items.I147.name = 'Ghastly Captain Pants';
items.I147.description = `'Equipable - Legs<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(280*2831, "I147"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(28*2831, "I147"))+' Regeneration<br><FONT COLOR="#b983f7">Ghastly Captain Set:<br>'`;
items.I147.flavor = '"Features that touch of seafaring charm of a 500 year old cadaver."';
items.I147.quality = 'Rare';
items.I147.tierDesc1 = "I144";
items.I147.tierDesc2 = "I146";
items.I147.tierDesc3 = "I145";
items.I147.tierDesc4 = "I147";
items.I147.tierDesc5 = "I143";
items.I147.tierArmorBonus = "★ Set bonus [5]: Your attacks have a chance to trigger a Sea Chanty, increasing Drop Rate, Crit Chance or Strength for 20 seconds";
items.I147.sell = 35000;
items.I147.max = 10;
items.I147.use = 'gearSwap(items.I147.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I147.stats = 'legsAdditiveMaxHp = returnItemUpgradeScaling(280*2831, "I147"); legsAdditiveRegen = returnItemUpgradeScaling(28*2831, "I147");'
items.I147.remove = 'legsAdditiveMaxHp = 0; legsAdditiveRegen = 0;'
items.I147.series = "solstice"; 

items.I7 = {};
items.I7.name = 'Silver Ring';
items.I7.description = `'Equipable - Ring<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(9, "I7")+' Regeneration'`;
items.I7.flavor = '"An ordinary jewelry ring. You can sense good craftsmanship out of it."';
items.I7.quality = 'Common';
items.I7.sell = 100;
items.I7.max = 10; 
items.I7.use = 'gearSwap(items.I7.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I7.stats = 'ringAdditiveRegen = returnItemUpgradeScaling(9, "I7")'
items.I7.remove = 'ringAdditiveRegen = 0'
items.I7.series = 'millionaire';

items.I15 = {};
items.I15.name = 'Champion Finger Belt';
items.I15.description = 'Equipable - Ring<br><FONT COLOR="#1EFF0C">Equip: +10% Critical Chance';
items.I15.flavor = '"Isnt that just a ring, though."';
items.I15.quality = 'Rare';
items.I15.sell = 5000;
items.I15.max = 1;
items.I15.use = 'gearSwap(items.I15.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I15.stats = 'items.I15.statUp = 0.1;'
items.I15.remove = 'items.I15.statUp = 0;'
items.I15.statUp = 0;
items.I15.series = "beastfallen"; 
   
items.I44 = {};
items.I44.name = 'Nephrite-Embedded Ring';
items.I44.description = `'Equipable - Ring<br><FONT COLOR="#1EFF0C">Equip: +'+ returnItemUpgradeScaling(7.4, "I44")+'% '+natureIcon+'Nature Damage'`;
items.I44.flavor = '"A captivating jewelry piece with a nephrite gemstone intricately set within the ring. The lush gemstone represents nature itself."';
items.I44.quality = 'Rare';
items.I44.sell = 2500;
items.I44.max = 10;
items.I44.use = 'gearSwap(items.I44.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I44.stats = 'items.I44.statUp = returnItemUpgradeScaling(7.4, "I44")*0.01;'
items.I44.remove = 'items.I44.statUp = 0;'
items.I44.statUp = 0;
items.I44.series = 'masterwork';

items.I45 = {};
items.I45.name = 'Malachite-Embedded Ring';
items.I45.description = `'Equipable - Ring<br><FONT COLOR="#1EFF0C">Equip: +'+ returnItemUpgradeScaling(7.4, "I45")+'% '+mightIcon+'Might Damage'`;
items.I45.flavor = '"A captivating jewelry piece with a malachite gemstone intricately set within the ring. The adept gemstone represents might itself."';
items.I45.quality = 'Rare';
items.I45.sell = 5000;
items.I45.max = 10;
items.I45.use = 'gearSwap(items.I45.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I45.stats = 'items.I45.statUp = returnItemUpgradeScaling(7.4, "I45")*0.01;'
items.I45.remove = 'items.I45.statUp = 0;'
items.I45.statUp = 0;
items.I45.series = 'masterwork';

items.I131 = {};
items.I131.name = 'Thorn Binding';
items.I131.description = `'Equipable - Ring<br><FONT COLOR="#1EFF0C">Equip: Reflects damage received back to the enemy as '+natureIcon+'Nature Damage up to a maximum of '+ returnItemUpgradeScaling(312, "I131")+' damage'`;
items.I131.flavor = '"A fierce ring made out of thorns and blossoms. To inflict pain one must be ready to receive pain."';
items.I131.quality = 'Uncommon';
items.I131.sell = 4500;
items.I131.max = 10; 
items.I131.use = 'gearSwap(items.I131.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")';
items.I131.defenseChance = 'enemyNatureDamage(Math.min(damage*0.3, returnItemUpgradeScaling(312, "I131")), "noScale");'
items.I131.series = 'forgotten';

items.I166 = {};
items.I166.name = 'Waddling Band';
items.I166.description = `'Equipable - Ring<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(23520, "I166"))+' '+natureIcon+'Weapon Nature Damage'`;
items.I166.flavor = '"It\'s not going anywhere though."';
items.I166.quality = 'Rare';
items.I166.sell = 5000;
items.I166.max = 10;
items.I166.use = 'gearSwap(items.I166.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I166.stats = 'ringAdditiveNatureDamage = returnItemUpgradeScaling(23520, "I166");'
items.I166.remove = 'ringAdditiveNatureDamage = 0;'
items.I166.series = "revered"; 

items.I173 = {};
items.I173.name = 'Firelink Band';
items.I173.description = `'Equipable - Ring<br><FONT COLOR="#1EFF0C">Equip: +'+ returnItemUpgradeScaling(7.4, "I173")+'% '+elementalIcon+'Elemental Damage'`;
items.I173.flavor = '"Warm to the touch."';
items.I173.quality = 'Rare';
items.I173.sell = 5000;
items.I173.max = 10;
items.I173.use = 'gearSwap(items.I173.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I173.stats = 'items.I173.statUp = returnItemUpgradeScaling(7.4, "I173")*0.01;'
items.I173.remove = 'items.I173.statUp = 0;'
items.I173.statUp = 0;
items.I173.series = "revered"; 

items.I175 = {};
items.I175.name = 'Golden Order Seal';
items.I175.description = `'Equipable - Ring<br><FONT COLOR="#1EFF0C">Equip: +'+ returnItemUpgradeScaling(7.4, "I175")+'% '+deificIcon+'Deific Damage'`;
items.I175.flavor = '"Glistening gold and sacred inscriptions make this ring a beacon of divine favor"';
items.I175.quality = 'Rare';
items.I175.sell = 8000;
items.I175.max = 10;
items.I175.use = 'gearSwap(items.I175.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I175.stats = 'items.I175.statUp = returnItemUpgradeScaling(7.4, "I175")*0.01;'
items.I175.remove = 'items.I175.statUp = 0;'
items.I175.statUp = 0;
items.I175.series = "solstice"; 

items.I184 = {};
items.I184.name = 'Ring of Mimic Friendship';
items.I184.description = 'Equipable - Ring<br><FONT COLOR="#1EFF0C">Equip: +20% Item Drop Chance';
items.I184.flavor = '"We won\'t take a single bait, promised."';
items.I184.quality = 'Rare';
items.I184.sell = 68000;
items.I184.max = 1;
items.I184.use = 'gearSwap(items.I184.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I184.stats = 'items.I184.statUp = 0.2;'
items.I184.remove = 'items.I184.statUp = 0;'
items.I184.statUp = 0;

items.I192 = {};
items.I192.name = 'Web-Threaded Promise';
items.I192.description = `'Equipable - Ring<br><FONT COLOR="#1EFF0C">Equip: +'+ returnItemUpgradeScaling(7.4, "I192")+'% '+occultIcon+'Occult Damage'`;
items.I192.flavor = '"Hardened, sharp cobweb in the shape of a ring."';
items.I192.quality = 'Rare';
items.I192.sell = 1000;
items.I192.max = 10;
items.I192.use = 'gearSwap(items.I192.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I192.stats = 'items.I192.statUp = returnItemUpgradeScaling(7.4, "I192")*0.01;'
items.I192.remove = 'items.I192.statUp = 0;'
items.I192.statUp = 0;
items.I192.series = "beastfallen"; 

items.I193 = {};
items.I193.name = 'Lucky Clover Ring';
items.I193.description = 'Equipable - Ring<br><FONT COLOR="#1EFF0C">Equip: +25% EXP Gain';
items.I193.flavor = '"Bears the symbol of fortune."';
items.I193.quality = 'Rare';
items.I193.sell = 20000;
items.I193.max = 1;
items.I193.use = 'gearSwap(items.I193.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I193.stats = 'items.I193.statUp = 0.25;'
items.I193.remove = 'items.I193.statUp = 0;'
items.I193.statUp = 0;
items.I193.series = 'forgotten';

items.I11 = {};
items.I11.name = 'Runic Die';
items.I11.description = `'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: +'+ returnItemUpgradeScaling(7.4, "I11")+'% Item Drop Chance'`;
items.I11.flavor = '"Truth is... the game was rigged from the start."';
items.I11.quality = 'Uncommon';
items.I11.sell = 4500;
items.I11.max = 10;
items.I11.use = 'gearSwap(items.I11.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I11.stats = 'items.I11.statUp = returnItemUpgradeScaling(7.4, "I11")*0.01;'
items.I11.remove = 'items.I11.statUp = 0;'
items.I11.statUp = 0;
items.I11.series = 'millionaire';

items.I13 = {};
items.I13.name = 'Adventurer Badge';
items.I13.description = 'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: Does nothing ...Or does it?';
items.I13.flavor = '"A wooden badge commemorating your initiation into adventuring."';
items.I13.quality = 'Uncommon';
items.I13.sell = 1;
items.I13.max = 1;
items.I13.use = 'gearSwap(items.I13.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I13.stats = '';
items.I13.remove = '';
items.I13.series = 'heirloom';

items.I47 = {};
items.I47.name = 'Hoopperona\'s Phylactery';
items.I47.description = `'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: Low chance to summon the spirit of Hoopperona, poisoning the enemy for '+ returnItemUpgradeScaling(220, "I47")+' '+natureIcon+'Nature Damage every second'`;
items.I47.flavor = '"Remains of a forbidden friendship."';
items.I47.quality = 'Rare';
items.I47.sell = 1000;
items.I47.max = 10;
items.I47.use = 'gearSwap(items.I47.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")';
items.I47.attackChance = 'if (rng(1,15)===1) castHoopperonasPhylactery()';
items.I47.series = "beastfallen"; 

items.I56 = {};
items.I56.name = 'Heart of the Cards';
items.I56.description = 'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: Everytime you receive damage, gain one stack of Card Shuffle. Once Card Shuffle reaches 10 stacks, unleash a barrage of cards dealing 600K '+deificIcon+'Deific Damage 10 times';
items.I56.flavor = '"A mystic deck with cards from all known card games. We are definitely getting kicked out of the casino with this one."';
items.I56.quality = 'Epic';
items.I56.sell = 75000;
items.I56.max = 1;
items.I56.use = 'gearSwap(items.I56.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I56.defenseChance = 'if (buffs.B28A.stacks>8) {buffs.B28A.time=0; buffs.B28A.stacks=0; playerBuffs(); castHeartOfTheCards()} else {buffs.B28A.time=10; buffs.B28A.stacks++; playerBuffs();} '
items.I56.series = 'forgotten';

items.I116 = {}; 
items.I116.name = 'Broccoli';
items.I116.description = `'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: Heals '+ returnItemUpgradeScaling(12000, "I116")+'-'+ returnItemUpgradeScaling(13000, "I116")+' HP if your health goes below 50% <FONT COLOR="gray"> (1 minute Cooldown)'`;
items.I116.flavor = '"Full of nutrients and good stuff for your body, unfortunately."';
items.I116.quality = 'Uncommon';
items.I116.sell = 5500;
items.I116.max = 10;
items.I116.use = 'gearSwap(items.I116.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")';
items.I116.cd = 0;
items.I116.healthChance = ' if (rpgPlayer.hp<playerMaxHp/2 && items.I116.cd===0) {playSound("audio/monch.mp3"); let recovered = rng(returnItemUpgradeScaling(12000, "I116"),returnItemUpgradeScaling(13000, "I116")); items.I116.cd=60; playerHealingDamage(recovered); animState("rpgPlayerImg", "flash 0.5s 1"); playerUpdate(); animParticleBurst(10 , "particleHealth", "playerPanel", 0); if (!settings.disableSkillLog) {logPrint(`<FONT COLOR="#18ccba"> You eat the Broccoli. It wasnt very tasty...`)}}';
items.I116.series = 'millionaire';

items.I117 = {}; 
items.I117.name = 'Fossilised Fish';
items.I117.description = 'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: +1 Gathering Level';
items.I117.flavor = '"Whiskers favorite."';
items.I117.quality = 'Rare';
items.I117.sell = 5000;
items.I117.max = 1;
items.I117.use = 'gearSwap(items.I117.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I117.stats = 'items.I117.statUp = 1;'
items.I117.remove = 'items.I117.statUp = 0;'
items.I117.statUp = 0;
items.I117.series = 'forgotten';

items.I168 = {};
items.I168.name = 'Sand In a Jar';
items.I168.description = 'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: +20% Item Drop Chance';
items.I168.flavor = '"Not quite as valuable as the dirt one."';
items.I168.quality = 'Rare';
items.I168.sell = 4500;
items.I168.max = 1;
items.I168.use = 'gearSwap(items.I168.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I168.stats = 'items.I168.statUp = 0.2;'
items.I168.remove = 'items.I168.statUp = 0;'
items.I168.statUp = 0;

items.I172 = {};
items.I172.name = 'Iron Adventurer Badge';
items.I172.description = 'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: +15% EXP Gain';
items.I172.flavor = '"An iron badge commemorating a seasoned adventurer."';
items.I172.quality = 'Uncommon';
items.I172.sell = 1;
items.I172.max = 1;
items.I172.use = 'gearSwap(items.I172.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I172.stats = 'items.I172.statUp = 0.15;'
items.I172.remove = 'items.I172.statUp = 0;'
items.I172.statUp = 0;
items.I172.series = 'heirloom';

items.I182 = {};
items.I182.name = 'Shiny Fishing Lure';
items.I182.description = 'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: +1 Fishing Level';
items.I182.flavor = '"Its iridescent hues attract the curiosity of aquatic life."';
items.I182.quality = 'Uncommon';
items.I182.sell = 4500;
items.I182.max = 1;
items.I182.use = 'gearSwap(items.I182.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I182.stats = 'items.I182.statUp = 1;'
items.I182.remove = 'items.I182.statUp = 0;'
items.I182.statUp = 0;
items.I182.series = 'masterwork';

items.I201 = {};
items.I201.name = 'Thunderous Gyroresonator';
items.I201.description = `'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: Your attacks have a high chance of summoning lightning to strike your enemies, dealing '+ returnItemUpgradeScaling(4900, "I201")+'-'+ returnItemUpgradeScaling(5100, "I201")+' '+elementalIcon+'Elemental Damage'`;
items.I201.flavor = '"A device that can harness electricity and discharge it right at the enemy spot."';
items.I201.quality = 'Rare';
items.I201.sell = 6000;
items.I201.max = 10;
items.I201.use = 'gearSwap(items.I201.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")';
items.I201.attackChance = 'if (rng(1,3)===1) castThunderousGyroresonator()';
items.I201.series = 'masterwork';

items.I220 = {};
items.I220.name = 'Emblem Of Godhood';
items.I220.description = `'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: Low chance to summon a holy ray of light, smitting the enemy for '+ returnItemUpgradeScaling(220, "I220", "high")+' '+deificIcon+'Deific Damage '+scalingIcon`;
items.I220.flavor = '"Remains of a forbidden friendship."';
items.I220.quality = 'Epic';
items.I220.sell = 8000;
items.I220.max = 10;
items.I220.use = 'gearSwap(items.I220.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")';
items.I220.attackChance = 'if (rng(1,2)===1) castEmblemOfGodhood()';

items.I113 = {}; 
items.I113.name = 'Soft Leather Gloves';
items.I113.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Turtle Coin reward from clicking by +40';
items.I113.flavor = '"Warm and fuzzy pats are guaranteed by the soft fur of the gloves"';
items.I113.quality = 'Upgrade';
items.I113.sell = 0;
items.I113.max = 1;
items.I113.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I113.statUp = 40; statsUpdate(); upgrades.I113.got=true;  items.I113.count--; ';
items.I113.statUp = 0;

items.I124 = {}; 
items.I124.name = 'Ironwork Gloves';
items.I124.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Turtle Coin reward from clicking by +100';
items.I124.flavor = '"Maybe it doesn\'t give the warmest pats, but it gives the most secure and firm ones."';
items.I124.quality = 'Upgrade';
items.I124.sell = 0;
items.I124.max = 1;
items.I124.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I124.statUp = 100; statsUpdate(); upgrades.I124.got=true;  items.I124.count--; ';
items.I124.statUp = 0;

items.I128 = {}; 
items.I128.name = 'Midas Embrace';
items.I128.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Turtle Coin reward from clicking the turtle by +250';
items.I128.flavor = '"The love they provide is way more valuable than gold can ever hope to be."';
items.I128.quality = 'Upgrade';
items.I128.sell = 0;
items.I128.max = 1;
items.I128.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I128.statUp = 250; statsUpdate(); upgrades.I128.got=true;  items.I128.count--; ';
items.I128.statUp = 0;

items.I202 = {}; 
items.I202.name = 'Vampiric Touch';
items.I202.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Turtle Coin reward from clicking the turtle by +600';
items.I202.flavor = '"Designed to drain affection to the touch."';
items.I202.quality = 'Upgrade';
items.I202.sell = 0;
items.I202.max = 1;
items.I202.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I202.statUp = 600; statsUpdate(); upgrades.I202.got=true;  items.I202.count--; ';
items.I202.statUp = 0;

items.I86 = {}; 
items.I86.name = 'High-Grade Anvil';
items.I86.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently reduces the crafting time of all recipes by 5 seconds';
items.I86.flavor = '"Hit Hard! Hit Fast! Hit Often!"';
items.I86.quality = 'Upgrade';
items.I86.sell = 0;
items.I86.max = 1;
items.I86.use = ' playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.anvil1 = true; reduceRecipeTimeCheck(); upgrades.I86.got=true;  items.I86.count--; ';

items.I87 = {}; 
items.I87.name = 'Blast-Proof Anvil';
items.I87.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently reduces the crafting time of all recipes by 5 seconds';
items.I87.flavor = '"I can assure you that some science is taking place here that allows this to work."';
items.I87.quality = 'Upgrade';
items.I87.sell = 0;
items.I87.max = 1;
items.I87.use = ' playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.anvil2 = true; reduceRecipeTimeCheck(); upgrades.I87.got=true;  items.I87.count--; ';

items.I157 = {}; 
items.I157.name = 'Anima Anvil';
items.I157.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently reduces the crafting time of all recipes by 5 seconds';
items.I157.flavor = '"Ignore the ghastly souls produced by the smithing."';
items.I157.quality = 'Upgrade';
items.I157.sell = 0;
items.I157.max = 1;
items.I157.use = ' playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.anvil3 = true; reduceRecipeTimeCheck(); upgrades.I157.got=true;  items.I157.count--; ';

items.I34 = {}; 
items.I34.name = 'Dead Man Emblem';
items.I34.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently enables the auto-summoning of bosses once the current one gets defeated. Right click on the boss button to toggle';
items.I34.flavor = '"No creature should suffer this fate."';
items.I34.quality = 'Upgrade';
items.I34.sell = 0;
items.I34.max = 1;
items.I34.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.autoBoss = true; upgrades.I34.got=true;  items.I34.count--; ';

unlocks.inventorySorting = false;

items.I70 = {}; 
items.I70.name = 'Colored Bookmarks';
items.I70.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently adds sorting categories to the inventory';
items.I70.flavor = '"Paginated bookmarks used to sort pages. They are scented according to their colors."';
items.I70.quality = 'Upgrade';
items.I70.sell = 0;
items.I70.max = 1;
items.I70.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.inventorySorting = true; unlocksReveal(); upgrades.I70.got=true;  items.I70.count--; ';

unlocks.bestiary = false;

items.I290 = {}; 
items.I290.name = 'Monster Bestiary';
items.I290.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the Bestiary at the top of the screen. Defeat an enemy multiple times to fill out their entry';
items.I290.flavor = '"A picture book full of details and photos of cute foes. Calling them monsters would be a farce."';
items.I290.quality = 'Upgrade';
items.I290.sell = 0;
items.I290.max = 1;
items.I290.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.bestiary = true; unlocksReveal(); items.I290.count--; ';
items.I290.statUp = 0;

items.I72 = {};
items.I72.name = 'Prismatic Crystal Scale';
items.I72.description = 'Material';
items.I72.flavor = '"An exceptionally rare crystal dragon scale, shimmering with a dazzling array of colors."';
items.I72.quality = 'Uncommon';
items.I72.sell = 21;

/*

items.I78 = {};
items.I78.name = 'Zweihander';
items.I78.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+135 Might Damage<br>On Attack: Low chance to inflict a heavy slash dealing 500-650 Might damage.<br><FONT COLOR="#b983f7">Huge Parent Set:<br><FONT COLOR="#1EFF0C">❖ Zweihander<br><FONT COLOR="gray">❖ Mask of the Parent<br>❖ Ring of Faith and Pledging<br><FONT COLOR="#b983f7">★ Set bonus [3]: <br>+44500 Max Health<br>+4450 Regeneration<br>+44500 Might Damage';
items.I78.flavor = '"BECOME UNSTOPPABLE."';
items.I78.quality = 'Uncommon';
items.I78.sell = 1000;
items.I78.max = 1;
items.I78.use = 'gearSwap(items.I78.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I78.stats = 'additiveMightDamage += 135; weaponSwap("W10")'
items.I78.remove = 'additiveMightDamage -= 135; weaponSwap("W0")'
items.I78.align = 'might';
items.I78.commonSkill = 'animImageSplash("slash", "enemyPanel", "impact", 0); animState(stats.currentEnemy+"enemy", "shake 0.4s 1"); let damageDealt = rng(500,650); enemyMightDamage(damageDealt);'

*/
items.I79 = {}; 
items.I79.name = 'Automated Petting Hand';
items.I79.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks autopetting. Hold Right Click and caress the turtle to autopet';
items.I79.flavor = '"Harder, better, faster, cuter."';
items.I79.quality = 'Upgrade';
items.I79.sell = 0;
items.I79.max = 1;
items.I79.use = 'playSound("audio/retro2.mp3");animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.autoclicker = true; unlocksReveal(); upgrades.I79.got=true;  items.I79.count--; ';

items.I90 = {}; 
items.I90.name = 'Premium Metal Grill';
items.I90.description = 'Miscellaneous';
items.I90.flavor = '"Vents and ample cooking surface ensures a perfect char every time, expect nothing less from the lord of fire."';
items.I90.quality = 'Quest';
items.I90.sell = 100;
items.I90.max = 1;

items.I94 = {}; 
items.I94.name = 'Lost Wallet';
items.I94.description = 'Miscellaneous - Treasure';
items.I94.flavor = '"Selling it before the owner suffers any longer would be the ethical thing to do in this situation."';
items.I94.quality = 'Poor';
items.I94.sell = 40000;

items.I95 = {}; 
items.I95.name = 'Pearl Necklace';
items.I95.description = 'Miscellaneous - Treasure';
items.I95.flavor = '"Perfect for everyday wear or special occasions or making money quickly."';
items.I95.quality = 'Poor';
items.I95.sell = 120000;

items.I285 = {}; 
items.I285.name = 'Jade Cat Figurine';
items.I285.description = 'Miscellaneous - Treasure';
items.I285.flavor = '"A small statue of an animal that seems loved by everyone. Not as much as tortugas, though."';
items.I285.quality = 'Poor';
items.I285.sell = 330000;

items.I102 = {};
items.I102.name = 'Golden Clover';
items.I102.description = 'Miscellaneous - Treasure';
items.I102.flavor = '"Today seems like a good day to buy lottery."';
items.I102.quality = 'Legendary';
items.I102.sell = 777;

items.I104 = {};
items.I104.name = 'Grand Archive Key';
items.I104.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the Grand Archive, gaining insight as you collect books on it';
items.I104.flavor = '"The key to a massive library recording specifics about the past, present, and future."';
items.I104.quality = 'Upgrade';
items.I104.sell = 0;
items.I104.max = 1;
items.I104.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0);  unlocks.journal=true; unlocksReveal(); upgrades.I104.got=true;  items.I104.count--; ';

items.I105 = {};
items.I105.name = 'Faraway Island Map';
items.I105.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to enter the Penguin Glacier'
items.I105.flavor = '"A parchment revealing the secrets of an uncharted, icy realm, guiding intrepid explorers through the frozen mysteries of a distant glacier."';
items.I105.quality = 'Uncommon';
items.I105.sell = 1000;
items.I105.max = 1;

items.I109 = {};
items.I109.name = 'Royal Penguin Decree';
items.I109.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the aid of the penguins';
items.I109.flavor = '"Sealed with regal authority, this decree proclaims an unbreakable bond between bearer and penguin royalty."';
items.I109.quality = 'Upgrade';
items.I109.sell = 0;
items.I109.max = 1;
items.I109.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.penguins=true; unlocksReveal(); upgrades.I109.got=true;  items.I109.count--; ';

items.I111 = {}; 
items.I111.name = 'Special Chai Blend';
items.I111.description = 'Miscellaneous';
items.I111.flavor = '"The raw power of a hundreds of herbs, compressed and atomized into fragrant dust. If you look closely, light is slightly bending around the spices."';
items.I111.quality = 'Quest';
items.I111.sell = 0;
items.I111.max = 1;
items.I111.align = "occult";

items.I286 = {}; 
items.I286.name = 'Bunch of Z\'s';
items.I286.description = 'Miscellaneous';
items.I286.flavor = '"Did you caught the joke?"';
items.I286.quality = 'Quest';
items.I286.max = 1;
items.I286.sell = 0;

items.I287 = {}; 
items.I287.name = '????????';
items.I287.description = 'Miscellaneous<br><FONT COLOR="coral">⚠ Not currently used in this version of the game, BUT. Do hold into it, because it will become something very cool on the next version.';
items.I287.flavor = '"I bet they are adding a battle royale with this one."';
items.I287.quality = 'Legendary';
items.I287.max = 1;
items.I287.sell = 0;

items.I120 = {}; 
items.I120.name = 'Whiskers Gratitude';
items.I120.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently, once a day, gives the chance to obtain a present from clicking the turtle';
items.I120.flavor = '"meow meow meow to you too, little fella."';
items.I120.quality = 'Upgrade';
items.I120.sell = 0;
items.I120.max = 1;
items.I120.use = 'playSound("audio/meow.mp3"); playSound("audio/retro2.mp3");animParticleBurst(5 , "particleSpark", "cursor", 0); createFloatingText("<p>Meow!"); unlocks.present = true; upgrades.I120.got=true;  items.I120.count--; ';

items.I121 = {}; 
items.I121.name = 'Chicken Cage';
items.I121.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Cage a chicken <FONT COLOR="gray"> (2 minute Cooldown)';
items.I121.flavor = '"A standard cage with a standard chicken-shaped hole inside."';
items.I121.quality = 'Quest';
items.I121.sell = 0;
items.I121.max = 10;
items.I121.use = 'if (stats.currentEnemy === "E7") {playSound("audio/throw.mp3"); items.I121.cd=120; items.I121.count--; items.I122.count++; animImageSplash("net", "enemyPanel", "downwards", 0); ; deleteEnemy()};'
items.I121.cd = 0;

items.I122 = {}; 
items.I122.name = 'Chicken In A Cage';
items.I122.description = 'Miscellaneous';
items.I122.flavor = '"There is no longer a chicken-shaped hole inside but a chicken-shaped-chicken."';
items.I122.quality = 'Quest';
items.I122.sell = 0;
items.I122.max = 10;

items.I123 = {}; 
items.I123.name = 'Whiskers';
items.I123.description = 'Miscellaneous';
items.I123.flavor = '"meow meow meow."';
items.I123.quality = 'Quest';
items.I123.sell = 0;
items.I123.max = 1;

items.I125 = {};
items.I125.name = 'Lost Book';
items.I125.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Add this book to the archives';
items.I125.flavor = '"Lost for not much longer."';
items.I125.quality = 'Epic';
items.I125.sell = 0;
items.I125.max = 1;
items.I125.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); logs.P23.unlocked=true; items.I125.count--; ';

items.I126 = {};
items.I126.name = 'Pirate Disguise';
items.I126.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to enter the Pirate Galleon'
items.I126.flavor = '"Complete with eye patch, tricorn hat, and weathered coat, perfect for blending in among the scurvy crew of the high seas."';
items.I126.quality = 'Uncommon';
items.I126.sell = 1000;
items.I126.max = 1;

/*
items.I191 = {};
items.I191.name = 'Lesser Mana Potion';
items.I191.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Restores 900-1200 Health.';
items.I191.flavor = '"This potion operates by abruptly shattering your entire internal structure, causing your body to make an immediate effort to rebuild them in order to avert a sudden death. It also has a mild strawberry flavor."';
items.I191.quality = 'Common';
items.I191.sell = 7100;
items.I191.max = 5;
items.I191.use = ' playSound("audio/potion.mp3"); let recovered = rng(900,1200); playerHealingDamage(recovered); animState("rpgPlayerImg", "flash 0.5s 1"); playerUpdate(); animParticleBurst(10 , "particleGlow", "playerPanel", 230);  items.I19.count--; ';
*/

items.I199 = {}; 
items.I199.name = 'Symbol Of Apathy';
items.I199.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently adds a switch to disable Mystery Presents';
items.I199.flavor = '"It\'s because I\'m green, isn\'t it? Wait. What do you mean you\'re also green?"';
items.I199.quality = 'Upgrade';
items.I199.sell = 0;
items.I199.max = 1;
items.I199.use = ' playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.presentSwitch=true; unlocksReveal(); upgrades.I199.got=true;  items.I199.count--; ';

items.I203 = {};
items.I203.name = 'Purifying Salt';
items.I203.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Purifies the spirit of a Morgato <FONT COLOR="gray"> (20 second Cooldown)';
items.I203.flavor = '"If you\'re wondering, it tastes just like table salt."';
items.I203.quality = 'Quest';
items.I203.sell = 100;
items.I203.use = ' castPurifyingSalt(); items.I203.cd = 20; items.I203.count-- ;'
items.I203.cd = 0;

items.I204 = {};
items.I204.name = 'Garrison Permit';
items.I204.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the Garrison tab. Research buildings and construct them to increase various stats';
items.I204.flavor = '"Imaginary property is just that much more convenient to manage than real one."';
items.I204.quality = 'Upgrade';
items.I204.sell = 0;
items.I204.max = 1;
items.I204.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.garrison=true; jobPanels.GS.unlocked = true; createRecipeListing(); unlocksReveal(); upgrades.I204.got=true;  items.I204.count--; ';

unlocks.itemOfTheDay = false;

items.I218 = {};
items.I218.name = 'Flash Sale!';
items.I218.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the "Item Of The Day" category in the shop'
items.I218.flavor = '"Call now to the number on-screen before someone else gets scammed!"';
items.I218.quality = 'Upgrade';
items.I218.sell = 0;
items.I218.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.itemOfTheDay=true; unlocksReveal(); upgrades.I218.got=true;  items.I218.count--; ';
items.I218.statUp = 0;
items.I218.max = 1;

unlocks.medikit=false;
items.I288 = {};
items.I288.name = 'Hasty Medikit';
items.I288.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks ability to revive the turtle by clicking repeatedly on it'
items.I288.flavor = '"Can you feel ze schadenfreude?"';
items.I288.quality = 'Upgrade';
items.I288.sell = 0;
items.I288.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.medikit=true; unlocksReveal(); items.I288.count--; ';
items.I288.statUp = 0;
items.I288.max = 1;

var wolfSpiderCachePlus = { I83:{P:1,A:1}, /*weapon*/ I192:{P:1,A:1}, /*ring*/ I47:{P:1,A:1}, /*trinket*/ I57:{P:1,A:'rng(18,24)'}, /*material*/ }
items.I221 = {};
items.I221.name = 'Wolf Spider Cache +';
items.I221.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br><br>[Always Contains]<br><FONT COLOR="#0070dd">❖ Chrysalis Recurver<br>❖ Web-Threaded Promise<br>❖ Hoopperona\'s Phylactery<br><FONT COLOR="white">❖ Creeping Wolf Web';
items.I221.flavor = '"Spiders are STILL not included, and we are all glad for that."';
items.I221.quality = 'Rare';
items.I221.sell = 20000;
items.I221.use = 'rollTable(wolfSpiderCachePlus, 1); items.I221.count--;  ;';

items.I223 = {}; 
items.I223.name = 'Luchador Mask';
items.I223.description = 'Miscellaneous';
items.I223.flavor = '"Mucha lucha mucho cachi richi."';
items.I223.quality = 'Quest';
items.I223.sell = 0;
items.I223.max = 1;

var jungleKingCachePlus = { I132:{P:1,A:1}, I133:{P:1,A:1}, I134:{P:1,A:1}, I135:{P:1,A:1}, I136:{P:1,A:1}, /*armor*/ I137:{P:1,A:1}, /*weapon*/ I15:{P:1,A:1}, /*ring*/ I165:{P:1,A:'rng(18,24)'}, /*chalk*/ }
items.I224 = {};
items.I224.name = 'Jungle King Cache +';
items.I224.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br><br>[Always Contains]<br><FONT COLOR="#0070dd">★ Jungle King Armor Set<br>❖ King-Kat Decapitator<br>❖ Champion Finger Belt<br><FONT COLOR="white">❖ Chalk Dust';
items.I224.flavor = '"🡒 ★ 🡓 🡖 ⓨ"';
items.I224.quality = 'Rare';
items.I224.sell = 2000;
items.I224.use = 'rollTable(jungleKingCachePlus, 1); items.I53.count--;  ;';

items.I227 = {}; 
items.I227.name = 'Blood Ruby';
items.I227.description = 'Miscellaneous - Collectible';
items.I227.flavor = '"A deep red variety of corundum, often associated with tales of conflict and bloodshed."';
items.I227.quality = 'Collectible';
items.I227.sell = 1; // out
items.I227.max = 1;
items.I227.collectible = "M";
items.I227.rarity = 1;

items.I228 = {}; 
items.I228.name = 'Topaz';
items.I228.description = 'Miscellaneous - Collectible';
items.I228.flavor = '"Often used in jewelry and believed to bring strength and healing properties."';
items.I228.quality = 'Collectible';
items.I228.sell = 1; // out
items.I228.max = 1;
items.I228.collectible = "M";
items.I228.rarity = 1;

items.I241 = {}; 
items.I241.name = 'Tiger Eye';
items.I241.description = 'Miscellaneous - Collectible';
items.I241.flavor = '"A type of quartz with fibrous inclusions of crocidolite, which impart its distinctive appearance."';
items.I241.quality = 'Collectible';
items.I241.sell = 1; // out
items.I241.max = 1;
items.I241.collectible = "M";
items.I241.rarity = 1;

items.I233 = {}; 
items.I233.name = 'Sapphire';
items.I233.description = 'Miscellaneous - Collectible';
items.I233.flavor = '"Symbolizes wisdom and loyalty."';
items.I233.quality = 'Collectible';
items.I233.sell = 1; // out
items.I233.max = 1;
items.I233.collectible = "M";
items.I233.rarity = 1;

items.I226 = {}; 
items.I226.name = 'Diamond';
items.I226.description = 'Miscellaneous - Collectible';
items.I226.flavor = '"Prized for its brilliance, hardness, and rarity."';
items.I226.quality = 'Collectible';
items.I226.sell = 1; // out
items.I226.max = 1;
items.I226.collectible = "M";
items.I226.rarity = 2;

items.I229 = {}; 
items.I229.name = 'Turquoiserite';
items.I229.description = 'Miscellaneous - Collectible';
items.I229.flavor = '"A rare tubular gemstone found in marine environments."';
items.I229.quality = 'Collectible';
items.I229.sell = 1; // out
items.I229.max = 1;
items.I229.collectible = "M";
items.I229.rarity = 2;

items.I230 = {}; 
items.I230.name = 'Peridot';
items.I230.description = 'Miscellaneous - Collectible';
items.I230.flavor = '"A luminous gemstone born from volcanic activity. Pray for it to not turn evil."';
items.I230.quality = 'Collectible';
items.I230.sell = 1; // out
items.I230.max = 1;
items.I230.collectible = "M";
items.I230.rarity = 2;

items.I231 = {}; 
items.I231.name = 'Feldespate';
items.I231.description = 'Miscellaneous - Collectible';
items.I231.flavor = '"A spiky teal mineral utilized as ammunition in the high-stakes battles of the Turtle Wars. Just kidding, it just looks cool."';
items.I231.quality = 'Collectible';
items.I231.sell = 1; // out
items.I231.max = 1;
items.I231.collectible = "M";
items.I231.rarity = 2;

items.I232 = {}; 
items.I232.name = 'Raritanium';
items.I232.description = 'Miscellaneous - Collectible';
items.I232.flavor = '"Turtles will go nuts and bolts for this."';
items.I232.quality = 'Collectible';
items.I232.sell = 1; // out
items.I232.max = 1;
items.I232.collectible = "M";
items.I232.rarity = 2;

items.I234 = {}; 
items.I234.name = 'Gammanite';
items.I234.description = 'Miscellaneous - Collectible';
items.I234.flavor = '"Despite its hazardous nature, turtles insist on making house walls out of it."';
items.I234.quality = 'Collectible';
items.I234.sell = 1; // out
items.I234.max = 1;
items.I234.collectible = "M";
items.I234.rarity = 2;

items.I237 = {}; 
items.I237.name = 'Advandrite';
items.I237.description = 'Miscellaneous - Collectible';
items.I237.flavor = '"This one rocks."';
items.I237.quality = 'Collectible';
items.I237.sell = 1; // out
items.I237.max = 1;
items.I237.collectible = "M";
items.I237.rarity = 2;

items.I238 = {}; 
items.I238.name = 'Chromatic Tourmaline';
items.I238.description = 'Miscellaneous - Collectible';
items.I238.flavor = '"A beautiful mineral dazzling with all the rainbow colors."';
items.I238.quality = 'Collectible';
items.I238.sell = 1; // out
items.I238.max = 1;
items.I238.collectible = "M";
items.I238.rarity = 2;

items.I240 = {}; 
items.I240.name = 'Taoline';
items.I240.description = 'Miscellaneous - Collectible';
items.I240.flavor = '"No matter on what slope you put it on, it seems to always mantain its balance."';
items.I240.quality = 'Collectible';
items.I240.sell = 1; // out
items.I240.max = 1;
items.I240.collectible = "M";
items.I240.rarity = 2;

items.I235 = {}; 
items.I235.name = 'Flepatite';
items.I235.description = 'Miscellaneous - Collectible';
items.I235.flavor = '"A rare crystal born from the fusion of stardust and seawater."';
items.I235.quality = 'Collectible';
items.I235.sell = 1; // out
items.I235.max = 1;
items.I235.collectible = "M";
items.I235.rarity = 3;

items.I236 = {}; 
items.I236.name = 'Equinoxium';
items.I236.description = 'Miscellaneous - Collectible';
items.I236.flavor = '"Absorbing both moonlight and sunlight, this gemstone is often referred as crystallised twilight."';
items.I236.quality = 'Collectible';
items.I236.sell = 1; // out
items.I236.max = 1;
items.I236.collectible = "M";
items.I236.rarity = 3;

items.I239 = {}; 
items.I239.name = 'Xyzite';
items.I239.description = 'Miscellaneous - Collectible';
items.I239.flavor = '"A stone of alien origin. It\'s constant shapeshifting and geometric screaming puts you at unease."';
items.I239.quality = 'Collectible';
items.I239.sell = 1; // out
items.I239.max = 1;
items.I239.collectible = "M";
items.I239.rarity = 3;

//fish

items.I243 = {}; 
items.I243.name = 'Risingsun Koi';
items.I243.description = 'Miscellaneous - Collectible';
items.I243.flavor = '"Symbolizes good fortune and prosperity in Japanese culture."';
items.I243.quality = 'Collectible';
items.I243.sell = 1; // out
items.I243.max = 1;
items.I243.collectible = "F";
items.I243.rarity = 1;

items.I244 = {}; 
items.I244.name = 'Storebought Fish';
items.I244.description = 'Miscellaneous - Collectible';
items.I244.flavor = '"A common sight in pet stores."';
items.I244.quality = 'Collectible';
items.I244.sell = 1; // out
items.I244.max = 1;
items.I244.collectible = "F";
items.I244.rarity = 1;

items.I248 = {}; 
items.I248.name = 'Pink Jellyfish';
items.I248.description = 'Miscellaneous - Collectible';
items.I248.flavor = '"A translucent marine creature with a gentle pink hue."';
items.I248.quality = 'Collectible';
items.I248.sell = 1; // out
items.I248.max = 1;
items.I248.collectible = "F";
items.I248.rarity = 1;

items.I249 = {}; 
items.I249.name = 'Miragefish';
items.I249.description = 'Miscellaneous - Collectible';
items.I249.flavor = '"Resembling a mirage in the water, tales describe its elusive nature and ethereal beauty."';
items.I249.quality = 'Collectible';
items.I249.sell = 1; // out
items.I249.max = 1;
items.I249.collectible = "F";
items.I249.rarity = 1;

items.I242 = {}; 
items.I242.name = 'Saltwater Eel';
items.I242.description = 'Miscellaneous - Collectible';
items.I242.flavor = '"A sleek and sinuous marine creature found in coastal waters worldwide."';
items.I242.quality = 'Collectible';
items.I242.sell = 1; // out
items.I242.max = 1;
items.I242.collectible = "F";
items.I242.rarity = 2;

items.I245 = {}; 
items.I245.name = 'Octopus';
items.I245.description = 'Miscellaneous - Collectible';
items.I245.flavor = '"Known for its intelligence, adaptability and great parenthood."';
items.I245.quality = 'Collectible';
items.I245.sell = 1; // out
items.I245.max = 1;
items.I245.collectible = "F";
items.I245.rarity = 2;

items.I247 = {}; 
items.I247.name = 'Fish Snack';
items.I247.description = 'Miscellaneous - Collectible';
items.I247.flavor = '"This one is not smiling back :("';
items.I247.quality = 'Collectible';
items.I247.sell = 1; // out
items.I247.max = 1;
items.I247.collectible = "F";
items.I247.rarity = 2;

items.I251 = {}; 
items.I251.name = 'Tiger Catfish';
items.I251.description = 'Miscellaneous - Collectible';
items.I251.flavor = '"It is characterized by its distinctive pattern of dark stripes and their loud purr."';
items.I251.quality = 'Collectible';
items.I251.sell = 1; // out
items.I251.max = 1;
items.I251.collectible = "F";
items.I251.rarity = 2;

items.I253 = {}; 
items.I253.name = 'Blobfish';
items.I253.description = 'Miscellaneous - Collectible';
items.I253.flavor = '"Fished deep underwater at 3000 feet by fisherman with 3000 and 1 foot fishing line."';
items.I253.quality = 'Collectible';
items.I253.sell = 1; // out
items.I253.max = 1;
items.I253.collectible = "F";
items.I253.rarity = 2;

items.I254 = {}; 
items.I254.name = 'Spotted Seahorse';
items.I254.description = 'Miscellaneous - Collectible';
items.I254.flavor = '"Found in shallow tropical and temperate waters worldwide."';
items.I254.quality = 'Collectible';
items.I254.sell = 1; // out
items.I254.max = 1;
items.I254.collectible = "F";
items.I254.rarity = 2;

items.I256 = {}; 
items.I256.name = 'Pufferfish';
items.I256.description = 'Miscellaneous - Collectible';
items.I256.flavor = '"Augh"';
items.I256.quality = 'Collectible';
items.I256.sell = 1; // out
items.I256.max = 1;
items.I256.collectible = "F";
items.I256.rarity = 2;

items.I255 = {}; 
items.I255.name = 'Igneous Eel';
items.I255.description = 'Miscellaneous - Collectible';
items.I255.flavor = '"The hottest catch around."';
items.I255.quality = 'Collectible';
items.I255.sell = 1; // out
items.I255.max = 1;
items.I255.collectible = "F";
items.I255.rarity = 3;

items.I250 = {}; 
items.I250.name = 'Axolotl';
items.I250.description = 'Miscellaneous - Collectible';
items.I250.flavor = '"I mean. Look at this guy. Come on."';
items.I250.quality = 'Collectible';
items.I250.sell = 1; // out
items.I250.max = 1;
items.I250.collectible = "F";
items.I250.rarity = 3;

items.I246 = {}; 
items.I246.name = 'Goldfish';
items.I246.description = 'Miscellaneous - Collectible';
items.I246.flavor = '"Not what I expected but I\'ll take it."';
items.I246.quality = 'Collectible';
items.I246.sell = 1; // out
items.I246.max = 1;
items.I246.collectible = "F";
items.I246.rarity = 3;

items.I252 = {}; 
items.I252.name = 'Baby Blobfish';
items.I252.description = 'Miscellaneous - Collectible';
items.I252.flavor = '"It looks like it already knows the fate that awaits it."';
items.I252.quality = 'Collectible';
items.I252.sell = 1; // out
items.I252.max = 1;
items.I252.collectible = "F";
items.I252.rarity = 3;

//relics

items.I257 = {}; 
items.I257.name = 'Guiding Relic';
items.I257.description = 'Miscellaneous - Collectible';
items.I257.flavor = '"Ancient construct that somehow always points out in the same direction."';
items.I257.quality = 'Collectible';
items.I257.sell = 1; // out
items.I257.max = 1;
items.I257.collectible = "R";
items.I257.rarity = 3;

items.I258 = {}; 
items.I258.name = 'Pointy Relic';
items.I258.description = 'Miscellaneous - Collectible';
items.I258.flavor = '"This one is just a rusty sword."';
items.I258.quality = 'Collectible';
items.I258.sell = 1; // out
items.I258.max = 1;
items.I258.collectible = "R";
items.I258.rarity = 3;

items.I259 = {}; 
items.I259.name = 'Training Relic';
items.I259.description = 'Miscellaneous - Collectible';
items.I259.flavor = '"A mysterious device that can compress itself with force applied."';
items.I259.quality = 'Collectible';
items.I259.sell = 1; // out
items.I259.max = 1;
items.I259.collectible = "R";
items.I259.rarity = 3;

items.I260 = {}; 
items.I260.name = 'Proteiny Relic';
items.I260.description = 'Miscellaneous - Collectible';
items.I260.flavor = '"Mythical concoction that it\'s said to enhance the muscular mass of whoever that consumes it."';
items.I260.quality = 'Collectible';
items.I260.sell = 1; // out
items.I260.max = 1;
items.I260.collectible = "R";
items.I260.rarity = 3;

items.I261 = {}; 
items.I261.name = 'Safety Relic';
items.I261.description = 'Miscellaneous - Collectible';
items.I261.flavor = '"Archaic head safeguarding used to protect old earthdwellers from cave collapses."';
items.I261.quality = 'Collectible';
items.I261.sell = 1; // out
items.I261.max = 1;
items.I261.collectible = "R";
items.I261.rarity = 3;

items.I262 = {}; 
items.I262.name = 'Flashy Relic';
items.I262.description = 'Miscellaneous - Collectible';
items.I262.flavor = '"An enigmatic invention that can store and channel rays of light whenever it\'s pointed at."';
items.I262.quality = 'Collectible';
items.I262.sell = 1; // out
items.I262.max = 1;
items.I262.collectible = "R";
items.I262.rarity = 3;

items.I263 = {}; 
items.I263.name = 'Self-Replicating Relic';
items.I263.description = 'Miscellaneous - Collectible';
items.I263.flavor = '"A fearsome construct that can clone itself when pressed against cookie dough."';
items.I263.quality = 'Collectible';
items.I263.sell = 1; // out
items.I263.max = 1;
items.I263.collectible = "R";
items.I263.rarity = 3;

items.I264 = {}; 
items.I264.name = 'Companionship Relic';
items.I264.description = 'Miscellaneous - Collectible';
items.I264.flavor = '"Despite its eerie look, it makes you feel somewhat at ease."';
items.I264.quality = 'Collectible';
items.I264.sell = 1; // out
items.I264.max = 1;
items.I264.collectible = "R";
items.I264.rarity = 3;

items.I264A = {}; 
items.I264A.name = 'Sticky Relic';
items.I264A.description = 'Miscellaneous - Collectible';
items.I264A.flavor = '"A container housing an arcane substance able to fuse any material it touches."';
items.I264A.quality = 'Collectible';
items.I264A.sell = 1; // out
items.I264A.max = 1;
items.I264A.collectible = "R";
items.I264A.rarity = 2;

items.I264B = {}; 
items.I264B.name = 'Measuring Relic';
items.I264B.description = 'Miscellaneous - Collectible';
items.I264B.flavor = '"This must be what the old ones used to measure their shells."';
items.I264B.quality = 'Collectible';
items.I264B.sell = 1; // out
items.I264B.max = 1;
items.I264B.collectible = "R";
items.I264B.rarity = 2;

items.I284 = {}; 
items.I284.name = 'Cutty Relic';
items.I284.description = 'Miscellaneous - Collectible';
items.I284.flavor = '"Small device that can produce a small cut under pressure. What a terrible weaponry they used to have."';
items.I284.quality = 'Collectible';
items.I284.sell = 1; // out
items.I284.max = 1;
items.I284.collectible = "R";
items.I284.rarity = 2;

items.I283 = {}; 
items.I283.name = 'Monetary Relic';
items.I283.description = 'Miscellaneous - Collectible';
items.I283.flavor = '"A small compartment allegedly used for storing money. You fail to figure out how they would put here millions of turtle coins."';
items.I283.quality = 'Collectible';
items.I283.sell = 1; // out
items.I283.max = 1;
items.I283.collectible = "R";
items.I283.rarity = 2;

items.I291 = {}; 
items.I291.name = 'Wrappy Relic';
items.I291.description = 'Miscellaneous - Collectible';
items.I291.flavor = '"Wonder material capable of giving cute properties to anything it gets enveloped with."';
items.I291.quality = 'Collectible';
items.I291.sell = 1; // out
items.I291.max = 1;
items.I291.collectible = "R";
items.I291.rarity = 2;

items.I292 = {}; 
items.I292.name = 'Gifty Relic';
items.I292.description = 'Miscellaneous - Collectible';
items.I292.flavor = '"A careful collection of monetary supplies condensed into a thin, pocket-friendly contraption."';
items.I292.quality = 'Collectible';
items.I292.sell = 1; // out
items.I292.max = 1;
items.I292.collectible = "R";
items.I292.rarity = 2;

items.I293 = {}; 
items.I293.name = 'Distracting Relic';
items.I293.description = 'Miscellaneous - Collectible';
items.I293.flavor = '"Oh no! The turtle cant hear you!."';
items.I293.quality = 'Collectible';
items.I293.sell = 1; // out
items.I293.max = 1;
items.I293.collectible = "R";
items.I293.rarity = 1;

items.I294 = {}; 
items.I294.name = 'Noisy Relic';
items.I294.description = 'Miscellaneous - Collectible';
items.I294.flavor = '"I do not know the purpose of this artifact but it sure is annoying."';
items.I294.quality = 'Collectible';
items.I294.sell = 1; // out
items.I294.max = 1;
items.I294.collectible = "R";
items.I294.rarity = 2;

items.I295 = {}; 
items.I295.name = 'Identity Relic';
items.I295.description = 'Miscellaneous - Collectible';
items.I295.flavor = '"A relic capable of completely changing the identity of its wearer."';
items.I295.quality = 'Collectible';
items.I295.sell = 1; // out
items.I295.max = 1;
items.I295.collectible = "R";
items.I295.rarity = 2;

//foraging

items.I265 = {}; 
items.I265.name = 'Young Grasshopper';
items.I265.description = 'Miscellaneous - Collectible';
items.I265.flavor = '"It seems like it has no patience at all."';
items.I265.quality = 'Collectible';
items.I265.sell = 1; // out
items.I265.max = 1;
items.I265.collectible = "B";
items.I265.rarity = 1;

items.I266 = {}; 
items.I266.name = 'White Moth';
items.I266.description = 'Miscellaneous - Collectible';
items.I266.flavor = '"Characterized by its predominantly white wings and known for their nocturnal habits."';
items.I266.quality = 'Collectible';
items.I266.sell = 1; // out
items.I266.max = 1;
items.I266.collectible = "B";
items.I266.rarity = 1;

items.I267 = {}; 
items.I267.name = 'Bee';
items.I267.description = 'Miscellaneous - Collectible';
items.I267.flavor = '"I could watch an entire movie featuring this little guy."';
items.I267.quality = 'Collectible';
items.I267.sell = 1; // out
items.I267.max = 1;
items.I267.collectible = "B";
items.I267.rarity = 1;

items.I269 = {}; 
items.I269.name = 'Common Ladybug';
items.I269.description = 'Miscellaneous - Collectible';
items.I269.flavor = '"The only bug everybody seems to like."';
items.I269.quality = 'Collectible';
items.I269.sell = 1; // out
items.I269.max = 1;
items.I269.collectible = "B";
items.I269.rarity = 1;

items.I268 = {}; 
items.I268.name = 'Brown Tarantula';
items.I268.description = 'Miscellaneous - Collectible';
items.I268.flavor = '"As it lacks poison, it is relatively harmless to turtles. It\'s still more harmful than not being biten by a tarantula."';
items.I268.quality = 'Collectible';
items.I268.sell = 1; // out
items.I268.max = 1;
items.I268.collectible = "B";
items.I268.rarity = 2;

items.I270 = {}; 
items.I270.name = 'Purple Emperor Butterfly';
items.I270.description = 'Miscellaneous - Collectible';
items.I270.flavor = '"A striking butterfly species known for its deep purple iridescent wings."';
items.I270.quality = 'Collectible';
items.I270.sell = 1; // out
items.I270.max = 1;
items.I270.collectible = "B";
items.I270.rarity = 2;

items.I271 = {}; 
items.I271.name = 'Stick Bug';
items.I271.description = 'Miscellaneous - Collectible';
items.I271.flavor = '"A bug genetically evolved to mimic a stick. Talk about setting the bar low."';
items.I271.quality = 'Collectible';
items.I271.sell = 1; // out
items.I271.max = 1;
items.I271.collectible = "B";
items.I271.rarity = 2;

items.I272 = {}; 
items.I272.name = 'Hercules Beetle';
items.I272.description = 'Miscellaneous - Collectible';
items.I272.flavor = '"It can lift objects 850 times its weight. Which sounds good but on paper he weights as much as a cookie."';
items.I272.quality = 'Collectible';
items.I272.sell = 1; // out
items.I272.max = 1;
items.I272.collectible = "B";
items.I272.rarity = 2;

items.I274 = {}; 
items.I274.name = 'Fire Fly';
items.I274.description = 'Miscellaneous - Collectible';
items.I274.flavor = '"You better believe your eyes."';
items.I274.quality = 'Collectible';
items.I274.sell = 1; // out
items.I274.max = 1;
items.I274.collectible = "B";
items.I274.rarity = 2;

items.I277 = {}; 
items.I277.name = 'Sparkly Dragonfly';
items.I277.description = 'Miscellaneous - Collectible';
items.I277.flavor = '"Don\'t let it get close to butterflies."';
items.I277.quality = 'Collectible';
items.I277.sell = 1; // out
items.I277.max = 1;
items.I277.collectible = "B";
items.I277.rarity = 2;

items.I278 = {}; 
items.I278.name = 'Flea';
items.I278.description = 'Miscellaneous - Collectible';
items.I278.flavor = '"It is small but it\'s really there."';
items.I278.quality = 'Collectible';
items.I278.sell = 1; // out
items.I278.max = 1;
items.I278.collectible = "B";
items.I278.rarity = 2;

items.I273 = {}; 
items.I273.name = 'Alienithera Hypnotica';
items.I273.description = 'Miscellaneous - Collectible';
items.I273.flavor = '"A species so pretty you would wish it wasnt brainwashing you while admiring its colors."';
items.I273.quality = 'Collectible';
items.I273.sell = 1; // out
items.I273.max = 1;
items.I273.collectible = "B";
items.I273.rarity = 3;

items.I275 = {}; 
items.I275.name = 'Void Stag';
items.I275.description = 'Miscellaneous - Collectible';
items.I275.flavor = '"Originary from a cursed realm called Netherlands."';
items.I275.quality = 'Collectible';
items.I275.sell = 1; // out
items.I275.max = 1;
items.I275.collectible = "B";
items.I275.rarity = 3;

items.I276 = {}; 
items.I276.name = 'Crystal Scorpion';
items.I276.description = 'Miscellaneous - Collectible';
items.I276.flavor = '"It is very much alive despite appearing to be made out of glass."';
items.I276.quality = 'Collectible';
items.I276.sell = 1; // out
items.I276.max = 1;
items.I276.collectible = "B";
items.I276.rarity = 3;

items.I279 = {}; 
items.I279.name = 'Uncaught TypeError';
items.I279.description = 'Miscellaneous - Collectible';
items.I279.flavor = '"I\'m never using Any ever again."';
items.I279.quality = 'Collectible';
items.I279.sell = 1; // out
items.I279.max = 1;
items.I279.collectible = "B";
items.I279.rarity = 3;

items.I281 = {};
items.I281.name = 'The Cube';
items.I281.description = `'Equipable - Ring<br><FONT COLOR="#1EFF0C">Can be upgraded infinitely<br>+'+ beautify(returnItemUpgradeScaling(19520, "I281"))+' Strength<br>+'+ beautify(returnItemUpgradeScaling(19520, "I281"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(19520, "I281"))+' Regen<br>'`;
items.I281.flavor = '"Infinity."';
items.I281.quality = 'Legendary';
items.I281.sell = 1000;
items.I281.max = 1000000;
items.I281.use = 'gearSwap(items.I281.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I281.stats = 'items.I281.statUp = returnItemUpgradeScaling(19520, "I281");'
items.I281.remove = 'items.I281.statUp = 0;'

items.I282 = {}; 
items.I282.name = 'Nanoturtles';
items.I282.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases the health received from consumable items by 700%';
items.I282.flavor = '"Nanometric turtles that harden their shells in response to physical trauma."';
items.I282.quality = 'Upgrade';
items.I282.sell = 0;
items.I282.max = 1;
items.I282.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I282.statUp = 7; statsUpdate(); upgrades.I282.got=true;  items.I282.count--; ';
items.I282.statUp = 0;

items.M1 = {}; 
items.M1.name = 'Small Memo Note';
items.M1.description = 'Miscellaneous';
items.M1.flavor = '"That beast is as tough as it comes, huh? And get this, that thing is entirely made out of valuable gemstones! If we only had a pickaxe... Yeah sure, like we are going to get close to that..."';
items.M1.quality = 'Poor';
items.M1.sell = 1;
items.M1.max = 1;

items.M2 = {}; 
items.M2.name = 'Small Memo Note';
items.M2.description = 'Miscellaneous';
items.M2.flavor = '"Look at this thing! Hes eating it from my hand! What do you mean I shouldnt be doing it? Who tought that scorpions liked prawns so much? Huh? What\'s this box?"';
items.M2.quality = 'Poor';
items.M2.sell = 1;
items.M2.max = 1;
/*
items.M3 = {}; 
items.M3.name = 'Small Memo Note';
items.M3.description = 'Miscellaneous';
items.M3.flavor = '"They are laughing at me. I know it. Everyone is doing so behind my back. But I will be the one laughing when I get to find treasure in the middle of all this fishing junk, even if I dont have many fishing gear on me..."';
items.M3.quality = 'Poor';
items.M3.sell = 1;
items.M3.max = 1;
*/
items.RSN8 = {};
items.RSN8.name = 'Recipe: Nephrite-Embedded Ring';
items.RSN8.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Nephrite-Embedded Ring';
items.RSN8.flavor = '"The true method of knowledge is experiment."';
items.RSN8.quality = 'Uncommon';
items.RSN8.sell = 0;
items.RSN8.max = 1;

items.RSN9 = {};
items.RSN9.name = 'Recipe: Malachite-Embedded Ring';
items.RSN9.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Malachite-Embedded Ring';
items.RSN9.flavor = '"The true method of knowledge is experiment."';
items.RSN9.quality = 'Uncommon';
items.RSN9.sell = 0;
items.RSN9.max = 1;

items.RSN9A = {};
items.RSN9A.name = 'Recipe: Prismatic Mattock';
items.RSN9A.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Prismatic Mattock';
items.RSN9A.flavor = '"The true method of knowledge is experiment."';
items.RSN9A.quality = 'Uncommon';
items.RSN9A.sell = 0;
items.RSN9A.max = 1;

items.RCN8 = {};
items.RCN8.name = 'Recipe: Masala Chai';
items.RCN8.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew Masala Chai';
items.RCN8.flavor = '"The true method of knowledge is experiment."';
items.RCN8.quality = 'Uncommon';
items.RCN8.sell = 0;
items.RCN8.max = 1;

items.RCN4 = {};
items.RCN4.name = 'Recipe: Frog Pho';
items.RCN4.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to cook Frog Pho';
items.RCN4.flavor = '"The true method of knowledge is experiment."';
items.RCN4.quality = 'Uncommon';
items.RCN4.sell = 0;
items.RCN4.max = 1;

items.RCN11 = {};
items.RCN11.name = 'Recipe: Devilfish Sashimi';
items.RCN11.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to cook Devilfish Sashimi';
items.RCN11.flavor = '"The true method of knowledge is experiment."';
items.RCN11.quality = 'Uncommon';
items.RCN11.sell = 0;
items.RCN11.max = 1;

items.REN4 = {};
items.REN4.name = 'Recipe: Copperwork Axe';
items.REN4.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to craft the Copperwork Axe';
items.REN4.flavor = '"The true method of knowledge is experiment."';
items.REN4.quality = 'Uncommon';
items.REN4.sell = 0;
items.REN4.max = 1;

items.REN5 = {};
items.REN5.name = 'Recipe: Net-O-Launcher 3000';
items.REN5.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create the Net-o-Launcher 3000';
items.REN5.flavor = '"The true method of knowledge is experiment."';
items.REN5.quality = 'Uncommon';
items.REN5.sell = 0;
items.REN5.max = 1;

items.REN6 = {};
items.REN6.name = 'Recipe: Light Dynamite';
items.REN6.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Light Dynamite';
items.REN6.flavor = '"The true method of knowledge is experiment."';
items.REN6.quality = 'Uncommon';
items.REN6.sell = 0;
items.REN6.max = 1;

items.REN7A = {};
items.REN7A.name = 'Recipe: Thunderous Gyroresonator';
items.REN7A.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Thunderous Gyroresonator';
items.REN7A.flavor = '"The true method of knowledge is experiment."';
items.REN7A.quality = 'Uncommon';
items.REN7A.sell = 0;
items.REN7A.max = 1;

items.REN8 = {};
items.REN8.name = 'Recipe: Soul Canister';
items.REN8.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Soul Canister';
items.REN8.flavor = '"The true method of knowledge is experiment."';
items.REN8.quality = 'Uncommon';
items.REN8.sell = 0;
items.REN8.max = 1;

items.REN9 = {};
items.REN9.name = 'Recipe: Shiny Fishing Lure';
items.REN9.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Shiny Fishing Lure';
items.REN9.flavor = '"The true method of knowledge is experiment."';
items.REN9.quality = 'Uncommon';
items.REN9.sell = 0;
items.REN9.max = 1;

items.RAN6 = {};
items.RAN6.name = 'Recipe: Lesser Elemental Flask';
items.RAN6.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Lesser Elemental Flask';
items.RAN6.flavor = '"The true method of knowledge is experiment."';
items.RAN6.quality = 'Uncommon';
items.RAN6.sell = 0;
items.RAN6.max = 1;

items.RAN7 = {};
items.RAN7.name = 'Recipe: Lesser Deific Flask';
items.RAN7.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Lesser Deific Flask';
items.RAN7.flavor = '"The true method of knowledge is experiment."';
items.RAN7.quality = 'Uncommon';
items.RAN7.sell = 0;
items.RAN7.max = 1;

items.RAN8 = {};
items.RAN8.name = 'Recipe: Lesser Occult Flask';
items.RAN8.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Lesser Occult Flask';
items.RAN8.flavor = '"The true method of knowledge is experiment."';
items.RAN8.quality = 'Uncommon';
items.RAN8.sell = 0;
items.RAN8.max = 1;

items.RAN9 = {};
items.RAN9.name = 'Recipe: Soul Grub';
items.RAN9.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to infuse a Soul Grub';
items.RAN9.flavor = '"The true method of knowledge is experiment."';
items.RAN9.quality = 'Uncommon';
items.RAN9.sell = 0;
items.RAN9.max = 1;

items.RAN10 = {};
items.RAN10.name = 'Recipe: Shatterstone Potion';
items.RAN10.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Shatterstone Potion';
items.RAN10.flavor = '"The true method of knowledge is experiment."';
items.RAN10.quality = 'Uncommon';
items.RAN10.sell = 0;
items.RAN10.max = 1;

items.RAN11 = {};
items.RAN11.name = 'Recipe: Reinforced Stamper Transfiguration';
items.RAN11.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to transfigure a Reinforced Stamper';
items.RAN11.flavor = '"The true method of knowledge is experiment."';
items.RAN11.quality = 'Uncommon';
items.RAN11.sell = 0;
items.RAN11.max = 1;

items.RAN4A = {};
items.RAN4A.name = 'Recipe: Healing Potion';
items.RAN4A.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Healing Potion';
items.RAN4A.flavor = '"The true method of knowledge is experiment."';
items.RAN4A.quality = 'Uncommon';
items.RAN4A.sell = 0;
items.RAN4A.max = 1;

items.REN10 = {};
items.REN10.name = 'Recipe: Firetank Pyrocombulator';
items.REN10.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Firetank Pyrocombulator';
items.REN10.flavor = '"The true method of knowledge is experiment."';
items.REN10.quality = 'Uncommon';
items.REN10.sell = 0;
items.REN10.max = 1;

items.BR2 = {};
items.BR2.name = 'Blueprint: Sawmill Plant';
items.BR2.description = 'Consumable - Blueprint<br><FONT COLOR="#1EFF0C">Use: Unlocks the research of the Sawmill Plant';
items.BR2.flavor = '"A good plan today is better than a perfect plan tomorrow."';
items.BR2.quality = 'Epic';
items.BR2.sell = 0;
items.BR2.max = 1;
items.BR2.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); research.R2.unlocked = true; items.BR2.count--; ; createResearch()';

items.BR3 = {};
items.BR3.name = 'Blueprint: Metal Workshop';
items.BR3.description = 'Consumable - Blueprint<br><FONT COLOR="#1EFF0C">Use: Unlocks the research of the Metal Workshop';
items.BR3.flavor = '"A good plan today is better than a perfect plan tomorrow."';
items.BR3.quality = 'Epic';
items.BR3.sell = 0;
items.BR3.max = 1;
items.BR3.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); research.R3.unlocked = true; items.BR3.count--; ; createResearch()';

items.BR4 = {};
items.BR4.name = 'Blueprint: Monster Hatchery';
items.BR4.description = 'Consumable - Blueprint<br><FONT COLOR="#1EFF0C">Use: Unlocks the research of the Monster Hatchery';
items.BR4.flavor = '"A good plan today is better than a perfect plan tomorrow."';
items.BR4.quality = 'Epic';
items.BR4.sell = 0;
items.BR4.max = 1;
items.BR4.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); research.R4.unlocked = true; items.BR4.count--; ; createResearch()';

items.BR6 = {};
items.BR6.name = 'Blueprint: Mineshaft Quarry';
items.BR6.description = 'Consumable - Blueprint<br><FONT COLOR="#1EFF0C">Use: Unlocks the research of the Mineshaft Quarry';
items.BR6.flavor = '"A good plan today is better than a perfect plan tomorrow."';
items.BR6.quality = 'Epic';
items.BR6.sell = 0;
items.BR6.max = 1;
items.BR6.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); research.R6.unlocked = true; items.BR6.count--; ; createResearch()';

items.BR7 = {};
items.BR7.name = 'Blueprint: Penguin Aviary';
items.BR7.description = 'Consumable - Blueprint<br><FONT COLOR="#1EFF0C">Use: Unlocks the research of the Penguin Aviary';
items.BR7.flavor = '"A good plan today is better than a perfect plan tomorrow."';
items.BR7.quality = 'Epic';
items.BR7.sell = 0;
items.BR7.max = 1;
items.BR7.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); research.R7.unlocked = true; items.BR7.count--; ; createResearch()';

items.BR8 = {};
items.BR8.name = 'Blueprint: Farmland Unit';
items.BR8.description = 'Consumable - Blueprint<br><FONT COLOR="#1EFF0C">Use: Unlocks the research of the Farmland Unit';
items.BR8.flavor = '"A good plan today is better than a perfect plan tomorrow."';
items.BR8.quality = 'Epic';
items.BR8.sell = 0;
items.BR8.max = 1;
items.BR8.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); research.R8.unlocked = true; items.BR8.count--; ; createResearch()';

items.I289 = {};
items.I289.name = 'Conqueror of 0.3 Medal';
items.I289.description = 'Miscellaneous<br><FONT COLOR="#bb83de">A commemorative badge acrediting that the owner completed the 0.3 update <FONT COLOR="gray"><br> (The method of obtention of this will permanently disappear once the next update takes place)';
items.I289.flavor = '"A winner is you!"';
items.I289.quality = 'Epic';
items.I289.sell = 1;
items.I289.max = 1;

Object.keys(items).forEach(function(key) {
  items[key].id = key;
  items[key].locked = false;
  items[key].favorited = false;
  items[key].count = 0;
  if (key.startsWith("R")) {items[key].img = 'I103';} 
  else if (key.startsWith("B")) {items[key].img = 'I180';}
  else if (key.startsWith("M")) {items[key].img = 'memo';}
  else if (key.startsWith("R")) {items[key].img = 'I103';} 
  else items[key].img = key;

  items[key].gotOnce = false;
  if (!("levelRequirement" in items[key])) items[key].levelRequirement = 0; //if the level requirement hasnt been defined, set it to 0
  if (!("max" in items[key])) items[key].max = playerMaxStack;
  //asigns sort category
  if (items[key].description.startsWith("Material")) items[key].sort = "material";
  if (items[key].description.startsWith("Equipable")) {items[key].sort = "equipable";}
  if (items[key].description.startsWith("'Equipable")) {items[key].sort = "equipable";}
  if (items[key].description.startsWith("Consumable")) items[key].sort = "consumable"; 
  if (items[key].description.startsWith("'Consumable")) items[key].sort = "consumable"; 
  if (items[key].description.startsWith("Miscellaneous")) items[key].sort = "misc";


  if (items[key].description.startsWith("'Equipable") && items[key].upgradeable!==false ) {items[key].upgradeable = true}
});



//#endregion
//----------------------==========================-----------------------
//----------------------============BUFFS=========-----------------------
//----------------------==========================-----------------------
//#region Buffs
var buffs = {}

buffs.B1 = {};
buffs.B1.name = 'Skewed Lizard';
buffs.B1.description = 'It really tasted like chicken.<br><FONT COLOR="#8fbaff">Max Health increased by 50';
buffs.B1.effect = 'buffEffect(50, "B1")';
buffs.B1.player = true;
buffs.B1.buff = true;
buffs.B1.tag = 'food';
buffs.B1.img = 'img/src/items/I12.jpg';

buffs.B2 = {};
buffs.B2.name = 'Poison';
buffs.B2.description = '<FONT COLOR="#8fbaff">Slowly Losing Life';
buffs.B2.effect = 'buffEffect(1000, "B2")';
buffs.B2.img = 'img/src/buffs/B1.png';

buffs.B3 = {};
buffs.B3.name = 'Fleming Bite';
buffs.B3.description = '<FONT COLOR="#8fbaff">Slowly Losing Life';
buffs.B3.player = true;
buffs.B3.effect = 'buffEffect(250, "B3")';
buffs.B3.img = 'img/src/buffs/B1.png';
buffs.B3.cleansable = true;

buffs.B4 = {};
buffs.B4.name = 'Lesser Nature Flask';
buffs.B4.description = '<FONT COLOR="#8fbaff">Nature Damage increased by 100%';
buffs.B4.player = true;
buffs.B4.effect = 'buffEffect(1, "B4")';
buffs.B4.buff = true;
buffs.B4.tag = 'potion';
buffs.B4.img = 'img/src/items/I49.jpg';

buffs.B5 = {};
buffs.B5.name = 'Lesser Might Flask';
buffs.B5.description = '<FONT COLOR="#8fbaff">Might Damage increased by 100%';
buffs.B5.player = true;
buffs.B5.effect = 'buffEffect(1, "B5")';
buffs.B5.buff = true;
buffs.B5.tag = 'potion';
buffs.B5.img = 'img/src/items/I50.jpg';

buffs.B6 = {};
buffs.B6.name = 'Trapped';
buffs.B6.description = 'Unable to move';
buffs.B6.effect = '';
buffs.B6.img = 'img/src/items/I67.jpg';

buffs.B7 = {};
buffs.B7.name = 'Lesser Haste Flask';
buffs.B7.description = '<FONT COLOR="#8fbaff">Haste increased by 25%';
buffs.B7.player = true;
buffs.B7.effect = 'buffEffect(0.25, "B7")';
buffs.B7.buff = true;
buffs.B7.tag = 'potion';
buffs.B7.haste = true;
buffs.B7.img = 'img/src/items/I130.jpg';

buffs.B8 = {};
buffs.B8.name = 'Gold-Tinged Gamba';
buffs.B8.description = '<FONT COLOR="#8fbaff">Clicking Power increased by 100%';
buffs.B8.player = true;
buffs.B8.effect = 'buffEffect(1, "B8")';
buffs.B8.buff = true;
buffs.B8.img = 'img/src/items/I96.jpg';

buffs.B9 = {};
buffs.B9.name = 'Vitreous Gamba';
buffs.B9.description = '<FONT COLOR="#8fbaff">EXP Rate increased by 100%';
buffs.B9.player = true;
buffs.B9.effect = 'buffEffect(1, "B9")';
buffs.B9.buff = true;
buffs.B9.img = 'img/src/items/I97.jpg';

buffs.B10 = {};
buffs.B10.name = 'Friendly Cat Token';
buffs.B10.description = '<FONT COLOR="#8fbaff">EXP Rate increased by 300%';
buffs.B10.player = true;
buffs.B10.effect = 'buffEffect(3, "B10")';
buffs.B10.buff = true;
buffs.B10.img = 'img/src/items/I98.jpg';

buffs.B11 = {};
buffs.B11.name = 'Angry Cat Token';
buffs.B11.description = '<FONT COLOR="#8fbaff">Drop Chance increased by 300%';
buffs.B11.player = true;
buffs.B11.effect = 'buffEffect(3, "B11")';
buffs.B11.buff = true;
buffs.B11.img = 'img/src/items/I99.jpg';

buffs.B12 = {};
buffs.B12.name = 'Monster Sausage';
buffs.B12.description = '<FONT COLOR="#8fbaff">Max Health increased by 10%';
buffs.B12.effect = 'buffEffect(0.1, "B12")';
buffs.B12.player = true;
buffs.B12.buff = true;
buffs.B12.tag = 'food';
buffs.B12.img = 'img/src/items/I54.jpg';

buffs.B13 = {};
buffs.B13.name = 'Frog Pho';
buffs.B13.description = '<FONT COLOR="#8fbaff">Might Damage increased by 50%';
buffs.B13.effect = 'buffEffect(0.5, "B13")';
buffs.B13.player = true;
buffs.B13.buff = true;
buffs.B13.tag = 'food';
buffs.B13.img = 'img/src/items/I52.jpg';

buffs.B14 = {};
buffs.B14.name = 'Fish Bait';
buffs.B14.description = '<FONT COLOR="#8fbaff">Fishing Level increased by 1';
buffs.B14.effect = 'buffEffect(1, "B14")';
buffs.B14.player = true;
buffs.B14.buff = true;
buffs.B14.img = 'img/src/items/I181.jpg';
buffs.B14.tag = 'bait';

buffs.B15 = {};
buffs.B15.name = 'Masala Chai';
buffs.B15.description = '<FONT COLOR="#8fbaff">Nature Damage increased by 50%';
buffs.B15.effect = 'buffEffect(0.5, "B15")';
buffs.B15.player = true;
buffs.B15.buff = true;
buffs.B15.tag = 'food';
buffs.B15.img = 'img/src/items/I110.jpg';

buffs.B16 = {};
buffs.B16.name = 'Summoned Violin';
buffs.B16.description = '<FONT COLOR="#8fbaff">A magic violin fights alongside';
buffs.B16.effect = '';
buffs.B16.player = true;
buffs.B16.buff = true;
buffs.B16.attackChance = 'castConjureViolinNote()';
buffs.B16.img = 'img/src/talents/TI1.jpg'; 

buffs.B17 = {};
buffs.B17.name = 'Blessing of the Moon';
buffs.B17.description = '<FONT COLOR="#8fbaff">Attacks get converted into moon slashes';
buffs.B17.effect = '';
buffs.B17.player = true;
buffs.B17.buff = true;
buffs.B17.attackChance = 'castMoonSlash()';
buffs.B17.img = 'img/src/items/I27.jpg';

buffs.B18 = {};
buffs.B18.name = 'Serizawa Festival';
buffs.B18.description = '<FONT COLOR="#8fbaff">Increased all damage by 20%!';
buffs.B18.effect = 'buffEffect(0.20, "B18")';
buffs.B18.player = true;
buffs.B18.buff = true;
buffs.B18.img = 'img/src/items/I55.jpg';

buffs.B19 = {};
buffs.B19.name = 'Photosynthesis';
buffs.B19.description = '<FONT COLOR="#8fbaff">Nature Damage increased by 20%';
buffs.B19.effect = 'buffEffect(0.2, "B19")';
buffs.B19.player = true;
buffs.B19.buff = true;
buffs.B19.img = 'img/src/items/I33.jpg';

buffs.B20 = {};
buffs.B20.name = 'Soul Reap';
buffs.B20.description = '<FONT COLOR="#8fbaff">Occult Damage increased by 25%';
buffs.B20.effect = 'buffEffect(0.25, "B20")';
buffs.B20.player = true;
buffs.B20.buff = true;
buffs.B20.img = 'img/src/items/I64.jpg';

buffs.B21 = {};
buffs.B21.name = 'Mighty Roar';
buffs.B21.description = '<FONT COLOR="#8fbaff">Might Damage increased by 25%';
buffs.B21.effect = 'buffEffect(0.25, "B21")';
buffs.B21.player = true;
buffs.B21.buff = true;
buffs.B21.img = 'img/src/items/I137.jpg';

buffs.B22 = {};
buffs.B22.name = 'Soul Grub';
buffs.B22.description = '<FONT COLOR="#8fbaff">Fishing Level increased by 2';
buffs.B22.effect = 'buffEffect(2, "B22")';
buffs.B22.player = true;
buffs.B22.buff = true;
buffs.B22.img = 'img/src/items/I183.jpg';
buffs.B22.tag = 'bait';

buffs.B23 = {};
buffs.B23.name = 'EXP Boost';
buffs.B23.description = '<FONT COLOR="#8fbaff">Experience Gain increased by 300%';
buffs.B23.effect = 'buffEffect(3, "B23")';
buffs.B23.turtle = true;
buffs.B23.buff = true;
buffs.B23.img = 'img/src/buffs/B3.jpg';

buffs.B24 = {};
buffs.B24.name = 'Drop Boost';
buffs.B24.description = '<FONT COLOR="#8fbaff">Drop Chance increased by 300%';
buffs.B24.effect = 'buffEffect(3, "B24")';
buffs.B24.turtle = true;
buffs.B24.buff = true;
buffs.B24.img = 'img/src/buffs/B4.jpg';

buffs.B25 = {};
buffs.B25.name = 'Click Boost';
buffs.B25.description = '<FONT COLOR="#8fbaff">Clicking Power increased by 100%';
buffs.B25.effect = 'buffEffect(1, "B25")';
buffs.B25.turtle = true;
buffs.B25.buff = true;
buffs.B25.img = 'img/src/buffs/B5.jpg';

buffs.B26 = {};
buffs.B26.name = 'Click Super Boost';
buffs.B26.description = '<FONT COLOR="#8fbaff">Clicking Power increased by 400%!';
buffs.B26.effect = 'buffEffect(4, "B26")';
buffs.B26.turtle = true;
buffs.B26.buff = true;
buffs.B26.img = 'img/src/buffs/B6.jpg';

buffs.B27 = {};
buffs.B27.name = 'Pat Boost';
buffs.B27.description = '<FONT COLOR="#8fbaff">Pat interval decreased!';
buffs.B27.effect = 'buffEffect(0.5, "B27")';
buffs.B27.turtle = true;
buffs.B27.buff = true;
buffs.B27.img = 'img/src/buffs/B7.jpg';

buffs.B28 = {};
buffs.B28.name = 'Pat Super Boost';
buffs.B28.description = '<FONT COLOR="#8fbaff">Pat interval severely decreased!';
buffs.B28.effect = 'buffEffect(3, "B28")';
buffs.B28.turtle = true;
buffs.B28.buff = true;
buffs.B28.img = 'img/src/buffs/B8.jpg';

buffs.B28A = {};
buffs.B28A.name = 'Card Shuffle';
buffs.B28A.description = '<FONT COLOR="#8fbaff">Shuffling Cards...';
buffs.B28A.effect = '';
buffs.B28A.buff = true;
buffs.B28A.player = true;
buffs.B28A.img = 'img/src/items/I56.jpg';
buffs.B28A.stacks = 0;

buffs.B29 = {};
buffs.B29.name = 'Pumpkin Spice Latte';
buffs.B29.description = '<FONT COLOR="#8fbaff">Drop Rate increased by 20%';
buffs.B29.effect = 'buffEffect(0.2, "B29")';
buffs.B29.player = true;
buffs.B29.buff = true;
buffs.B29.tag = 'food';
buffs.B29.img = 'img/src/items/I129.jpg';

buffs.B30 = {};
buffs.B30.name = 'Lesser Elemental Flask';
buffs.B30.description = '<FONT COLOR="#8fbaff">Elemental Damage increased by 100%';
buffs.B30.player = true;
buffs.B30.effect = 'buffEffect(1, "B30")';
buffs.B30.buff = true;
buffs.B30.tag = 'potion';
buffs.B30.img = 'img/src/items/I154.jpg';

buffs.B31 = {};
buffs.B31.name = 'Lesser Deific Flask';
buffs.B31.description = '<FONT COLOR="#8fbaff">Deific Damage increased by 100%';
buffs.B31.player = true;
buffs.B31.effect = 'buffEffect(1, "B31")';
buffs.B31.buff = true;
buffs.B31.tag = 'potion';
buffs.B31.img = 'img/src/items/I155.jpg';

buffs.B32 = {};
buffs.B32.name = 'Lesser Occult Flask';
buffs.B32.description = '<FONT COLOR="#8fbaff">Occult Damage increased by 100%';
buffs.B32.player = true;
buffs.B32.effect = 'buffEffect(1, "B32")';
buffs.B32.buff = true;
buffs.B32.tag = 'potion';
buffs.B32.img = 'img/src/items/I156.jpg';

buffs.B33 = {};
buffs.B33.name = 'Soul Burn';
buffs.B33.description = '<FONT COLOR="#8fbaff">Your very soul is shattering away...';
buffs.B33.effect = 'buffEffect(buffs.B33.stacks * (playerTotalOccultDamage*0.1), "B33")';
buffs.B33.img = 'img/src/items/I18.jpg';
buffs.B33.stacks = 0;

buffs.B34 = {};
buffs.B34.name = 'Antidoted';
buffs.B34.description = '<FONT COLOR="#8fbaff">Prevents poison debuffs';
buffs.B34.effect = '';
buffs.B34.img = 'img/src/items/I176.jpg';
buffs.B34.player = true;
buffs.B34.buff = true;

buffs.B35 = {};
buffs.B35.name = 'EXP Voucher';
buffs.B35.description = '<FONT COLOR="#8fbaff">Experience Gain increased by 300%';
buffs.B35.effect = 'buffEffect(3, "B35")';
buffs.B35.player = true;
buffs.B35.buff = true;
buffs.B35.img = 'img/src/items/I177.jpg';

buffs.B36 = {};
buffs.B36.name = 'Drop Voucher';
buffs.B36.description = '<FONT COLOR="#8fbaff">Drop Chance increased by 300%';
buffs.B36.effect = 'buffEffect(3, "B36")';
buffs.B36.player = true;
buffs.B36.buff = true;
buffs.B36.img = 'img/src/items/I178.jpg';

buffs.B37 = {};
buffs.B37.name = 'Shatterstone Potion';
buffs.B37.description = '<FONT COLOR="#8fbaff">Gathering Level increased by +1';
buffs.B37.effect = 'buffEffect(1, "B37")';
buffs.B37.player = true;
buffs.B37.buff = true;
buffs.B37.img = 'img/src/items/I185.jpg';

buffs.B38 = {};
buffs.B38.name = 'Arêtes de Poisson Frites';
buffs.B38.description = '<FONT COLOR="#8fbaff">Deific Damage increased by 50%';
buffs.B38.effect = 'buffEffect(0.5, "B38")';
buffs.B38.player = true;
buffs.B38.buff = true;
buffs.B38.tag = 'food';
buffs.B38.img = 'img/src/items/I186.jpg';

buffs.B39 = {};
buffs.B39.name = 'Firetank Pyrocombulator';
buffs.B39.description = '<FONT COLOR="#8fbaff">Your attacks deal additional Elemental Damage';
buffs.B39.effect = '';
buffs.B39.player = true;
buffs.B39.buff = true;
buffs.B39.img = 'img/src/items/I187.jpg';
buffs.B39.attackChance = 'enemyElementalDamage(70000, "noScale")';

buffs.B40 = {};
buffs.B40.name = 'Granite Pachamanca';
buffs.B40.description = '<FONT COLOR="#8fbaff">Elemental Damage increased by 50%';
buffs.B40.effect = 'buffEffect(0.5, "B40")';
buffs.B40.player = true;
buffs.B40.buff = true;
buffs.B40.tag = 'food';
buffs.B40.img = 'img/src/items/I188.jpg';

buffs.B41 = {};
buffs.B41.name = 'Devilfish Sashimi';
buffs.B41.description = '<FONT COLOR="#8fbaff">Occult Damage increased by 50%';
buffs.B41.effect = 'buffEffect(0.5, "B41")';
buffs.B41.player = true;
buffs.B41.buff = true;
buffs.B41.tag = 'food';
buffs.B41.img = 'img/src/items/I189.jpg';

buffs.B42 = {};
buffs.B42.name = 'Toxic Booze';
buffs.B42.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B42.player = true;
buffs.B42.effect = 'buffEffect(45000, "B42")';
buffs.B42.img = 'img/src/buffs/B9.jpg';
buffs.B42.cleansable = true;

buffs.B43 = {};
buffs.B43.name = 'Bunny Inferno';
buffs.B43.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B43.effect = 'buffEffect(playerStrength*skillDmg3, "B43")';
buffs.B43.img = 'img/src/buffs/B10.jpg';

buffs.B44 = {};
buffs.B44.name = 'Polymorphed';
buffs.B44.description = '<FONT COLOR="#8fbaff">Unable to move';
buffs.B44.effect = '';
buffs.B44.img = 'img/src/buffs/B11.jpg';

buffs.B45 = {};
buffs.B45.name = 'Strength Roll';
buffs.B45.description = '<FONT COLOR="#8fbaff">Strength increased by 40%';
buffs.B45.effect = 'buffEffect(0.4, "B45")';
buffs.B45.img = 'img/src/buffs/B12.jpg';
buffs.B45.player = true;
buffs.B45.buff = true;

buffs.B46 = {};
buffs.B46.name = 'Critical Roll';
buffs.B46.description = '<FONT COLOR="#8fbaff">Critical Chance increased by 30%';
buffs.B46.effect = 'buffEffect(0.3, "B46")';
buffs.B46.img = 'img/src/buffs/B14.jpg';
buffs.B46.player = true;
buffs.B46.buff = true;

buffs.B47 = {};
buffs.B47.name = 'Haste Roll';
buffs.B47.description = '<FONT COLOR="#8fbaff">Haste increased by 30%';
buffs.B47.player = true;
buffs.B47.effect = 'buffEffect(0.3, "B47")';
buffs.B47.buff = true;
buffs.B47.haste = true;
buffs.B47.img = 'img/src/buffs/B13.jpg';

buffs.B48 = {};
buffs.B48.name = 'Reverse Card';
buffs.B48.description = '<FONT COLOR="#8fbaff">Damage is being reflected';
buffs.B48.player = true;
buffs.B48.effect = '';
buffs.B48.buff = true;
buffs.B48.img = 'img/src/talents/TG2B.jpg';

buffs.B49 = {};
buffs.B49.name = 'Shellter';
buffs.B49.description = '<FONT COLOR="#8fbaff">33% chance to dodge incoming attacks';
buffs.B49.player = true;
buffs.B49.effect = '';
buffs.B49.buff = true;
buffs.B49.img = 'img/src/talents/TG2D.jpg';

buffs.B50 = {};
buffs.B50.name = 'Hex Tag';
buffs.B50.description = '<FONT COLOR="#8fbaff">Slowly Losing Life';
buffs.B50.effect = 'buffEffect(90000, "B50")';
buffs.B50.img = 'img/src/items/I215.jpg';

buffs.B51 = {};
buffs.B51.name = 'Harpsichaos';
buffs.B51.description = '<FONT COLOR="#8fbaff">Occult Damage increased by 60%';
buffs.B51.effect = 'buffEffect(0.6, "B51")';
buffs.B51.player = true;
buffs.B51.buff = true;
buffs.B51.img = 'img/src/talents/TI2.jpg';

buffs.B52 = {};
buffs.B52.name = 'Perish Song';
buffs.B52.description = '<FONT COLOR="coral">You\'ve met with a terrible fate, haven\'t you?';
buffs.B52.effect = '';
buffs.B52.img = 'img/src/talents/TI2B.jpg';

buffs.B53 = {};
buffs.B53.name = 'Song of Healing';
buffs.B53.description = '<FONT COLOR="#8fbaff">Regenerating Health';
buffs.B53.player = true;
buffs.B53.effect = 'buffEffect(playerStrength*skillDmg3, "B53")';
buffs.B53.buff = true;
buffs.B53.img = 'img/src/talents/TI3B.jpg';

buffs.B54 = {};
buffs.B54.name = 'Spider Poison';
buffs.B54.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B54.effect = 'buffEffect(returnItemUpgradeScaling(220, "I47"), "B54")';
buffs.B54.img = 'img/src/buffs/B1.png';

buffs.B55 = {};
buffs.B55.name = 'Wood-Carved Gamba';
buffs.B55.description = '<FONT COLOR="#8fbaff">Drop Chance increased by 100%';
buffs.B55.player = true;
buffs.B55.effect = 'buffEffect(1, "B55")';
buffs.B55.buff = true;
buffs.B55.img = 'img/src/items/I207.jpg';

buffs.B56 = {};
buffs.B56.name = 'Melting Bite';
buffs.B56.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B56.player = true;
buffs.B56.effect = 'buffEffect(3000, "B56")';
buffs.B56.img = 'img/src/buffs/B1.png';
buffs.B56.cleansable = true;

buffs.B57 = {};
buffs.B57.name = 'Deadly Poison';
buffs.B57.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B57.player = true;
buffs.B57.effect = 'buffEffect(80000, "B57")';
buffs.B57.img = 'img/src/buffs/B1.png';
buffs.B57.cleansable = true;

buffs.B58 = {};
buffs.B58.name = 'Cursed';
buffs.B58.description = '<FONT COLOR="#8fbaff">Instant Death at 15 stacks<br><FONT COLOR="coral">[Cant be Removed]';
buffs.B58.player = true;
buffs.B58.effect = '';
buffs.B58.img = 'img/src/buffs/B15.jpg';
buffs.B58.stacks = 0;

buffs.B59 = {};
buffs.B59.name = 'Hellfire';
buffs.B59.description = '<FONT COLOR="#8fbaff">Slowly Losing Life<br><FONT COLOR="coral">[Cant be Removed]';
buffs.B59.player = true;
buffs.B59.effect = 'buffEffect(buffs.B59.stacks * 15000, "B59")';
buffs.B59.img = 'img/src/buffs/B16.jpg';
buffs.B59.stacks = 0;

buffs.B60 = {};
buffs.B60.name = 'Silenced';
buffs.B60.description = '<FONT COLOR="#8fbaff">Unable to use Skills';
buffs.B60.player = true;
buffs.B60.effect = '';
buffs.B60.img = 'img/src/buffs/B17.jpg';

buffs.B61 = {};
buffs.B61.name = 'Sea Chanty';
buffs.B61.description = '<FONT COLOR="#8fbaff">Strength increased by 20%';
buffs.B61.effect = 'buffEffect(0.2, "B61")';
buffs.B61.img = 'img/src/buffs/B18.jpg';
buffs.B61.player = true;
buffs.B61.buff = true;

buffs.B62 = {};
buffs.B62.name = 'Sea Chanty';
buffs.B62.description = '<FONT COLOR="#8fbaff">Critical Chance increased by 20%';
buffs.B62.effect = 'buffEffect(0.2, "B62")';
buffs.B62.img = 'img/src/buffs/B18.jpg';
buffs.B62.player = true;
buffs.B62.buff = true;

buffs.B63 = {};
buffs.B63.name = 'Sea Chanty';
buffs.B63.description = '<FONT COLOR="#8fbaff">Drop Chance by 20%';
buffs.B63.player = true;
buffs.B63.effect = 'buffEffect(0.2, "B63")';
buffs.B63.buff = true;
buffs.B63.img = 'img/src/buffs/B18.jpg';

buffs.B64 = {};
buffs.B64.name = 'Phoenix Prawn';
buffs.B64.description = '<FONT COLOR="#8fbaff">+1 Extra Life';
buffs.B64.player = true;
buffs.B64.effect = '';
buffs.B64.buff = true;
buffs.B64.img = 'img/src/items/I200.jpg';

Object.keys(buffs).forEach(function(key) {
  buffs[key].percentage = 1;      
  buffs[key].time = 0;
  buffs[key].statUp = 0;    
});

//#endregion
//----------------------==========================-----------------------
//----------------------===========AREAS==========-----------------------
//----------------------==========================-----------------------
//#region Areas
var areas = {}

var materialTable1 = { I1:{P:15,A:'rng(20,40)*materialStage'}, I51:{P:15,A:'rng(20,40)*materialStage'}, I37:{P:15,A:'rng(20,40)*materialStage'}, I32:{P:15,A:'rng(20,40)*materialStage'}, I114:{P:0,A:'rng(20,40)*materialStage'}, I115:{P:0,A:'rng(20,40)*materialStage'}, I25:{P:0,A:'rng(20,40)*materialStage'}, I38:{P:0,A:'rng(20,40)*materialStage'} }
var materialTable2 = { I16:{P:0,A:'rng(20,40)*materialStage'}, I29:{P:0,A:'rng(20,40)*materialStage'}, I17:{P:0,A:'rng(20,40)*materialStage'}, I36:{P:0,A:'rng(20,40)*materialStage'}, I40:{P:0,A:'rng(20,40)*materialStage'}, I58:{P:0,A:'rng(20,40)*materialStage'}, I18:{P:0,A:'rng(20,40)*materialStage'},}
var materialStage = 1;


var area1Loot = { I10:{P:150,A:1}, /*chest*/ I106:{P:180,A:1}, /*boss*/ I257:{P:collectibleChance3,A:1, R:"medium"}, I258:{P:collectibleChance3,A:1, R:"medium"}, /*relics*/}
areas.A1 = {};
areas.A1.name = 'Cradle Hills';
areas.A1.level = 1;
areas.A1.description = '"The starting point of many turtle adventurers due to bugs and insects being the only residents around here, which makes for an easy prey. Or at least it should be."';
//areas.A1.unlocked = true;
//areas.A1.visible = 1;
areas.A1.boss = 'E4';
areas.A1.bossKey = 'I106';
areas.A1.unlockedOre = 0;

var area2Loot = { I10:{P:150,A:1}, /*chest*/ I127:{P:180,A:1}, /*boss*/ I259:{P:collectibleChance3,A:1, R:"medium"}, I260:{P:collectibleChance3,A:1, R:"medium"}, /*relics*/}
areas.A2 = {};
areas.A2.name = 'Lost Dojo';
areas.A2.level = 10;
areas.A2.description = '"Legends say that a martial dojo was abandoned in the heart of the forest. Overtime, animals began honing their moves in there, and today hardly anyone can live to tell the tale."';
areas.A2.boss = 'E8';
areas.A2.bossKey = 'I127';
areas.A2.unlockedHerb = 0;

var area3Loot = { I43:{P:200,A:1}, /*chest*/ I163:{P:350,A:1}, /*boss*/ I261:{P:collectibleChance3,A:1, R:"medium"}, I262:{P:collectibleChance3,A:1, R:"medium"}, /*relics*/}
areas.A3 = {};
areas.A3.name = 'Granite Grotto';
areas.A3.level = 20;
areas.A3.description = '"A damp cave imbued with magical ore. the combination of the minerals and the natural electromagnetism has breed both terrifying and cute creatures."';
areas.A3.boss = 'E12';
areas.A3.bossKey = 'I163';
areas.A3.unlockedOre = 0;

areas.A7 = {};
areas.A7.name = 'Monster Arena';
areas.A7.level = 25;
areas.A7.description = '"Welcoming all brave turtles, this thunderdome is a place of glory and riches. Fight against powerful foes and claim prize for yourself!."';

var area4Loot = { I43:{P:200,A:1}, /*chest*/ I164:{P:350,A:1}, /*boss*/ I263:{P:collectibleChance3,A:1, R:"medium"}, I264:{P:collectibleChance3,A:1, R:"medium"}, /*relics*/}
areas.A4 = {};
areas.A4.name = 'Hallow Forest';
areas.A4.level = 31;
areas.A4.description = '"A land devoid of life. Death always finds its way, and the ghostly remains of the undead torment the living in mortuary anger. I also heard there is a cute cat in here."';
areas.A4.boss = 'E27';
areas.A4.bossKey = 'I164';
areas.A4.unlockedPond = 0;

areas.A5 = {};
areas.A5.name = 'Penguin Glacier';
areas.A5.level = 25;
areas.A5.description = '"Chilly glacier home to a likeable breed of monster penguins."';
areas.A5.dungeon = true;
areas.A5.dungeonTimer = 0;
areas.A5.dungeonPoints = 10;
areas.A5.boss1 = 'E23';
areas.A5.key = 'I105';

areas.A6 = {};
areas.A6.name = 'Pirate Galleon';
areas.A6.level = 35;
areas.A6.description = '"A drifting drinking pirate bar. Booze, eyepatches, peg legs, all of that good stuff."';
areas.A6.dungeon = true;
areas.A6.dungeonTimer = 0;
areas.A6.dungeonPoints = 10;
areas.A6.boss1 = 'E25';
areas.A6.boss2 = 'E26';
areas.A6.key = 'I126';


//#endregion
//----------------------==========================-----------------------
//----------------------===========QUEST==========-----------------------
//----------------------==========================-----------------------
//#region Quests
var quests = {} 

quests.A1Q1 = {};
quests.A1Q1.name = 'Important Notice';
quests.A1Q1.difficulty = 1;
quests.A1Q1.description = 'To complete the registation of the Super Turtle Adventure program, please terrorise the local wildlife. <br><br> <span style="color:#FFD100"> [Tip: You can equip gear by right-clicking it]';
quests.A1Q1.objective = `'Defeat a bunch of slugs <span class="questProgress">'+beautify(enemies.E1.killCount)+'/6</span>'`;
quests.A1Q1.logic = 'enemies.E1.killCount>5';
quests.A1Q1.effect = 'items.I8.count++;';
quests.A1Q1.money = 500;
quests.A1Q1.exp = 300;
quests.A1Q1.reward = 'A cool stick';
quests.A1Q1.rewardIcon = 'itemIcon("I8")';

unlocks.shop = false

quests.A1Q2 = {};
quests.A1Q2.name = 'To My Beloved Friend';
quests.A1Q2.difficulty = 1;
quests.A1Q2.description = 'I am a prince from Nigeria and a giant idiot spider destroyed shop, give me your money please. <br><br> <span style="color:#FFD100"> [Tip: You can sell items by pressing Control]';
quests.A1Q2.objective = `'Hand over 2500 Turtle Coins <span class="questProgress">'+beautify(rpgPlayer.coins)+'/2500</span>'`;
quests.A1Q2.logic = 'rpgPlayer.coins>=2500';
quests.A1Q2.effect = 'rpgPlayer.coins-=2500; unlocks.shop = true;';
quests.A1Q2.money = 0;
quests.A1Q2.exp = 400;
quests.A1Q2.reward = 'Access to the Shop';
quests.A1Q2.rewardIcon = 'itemIcon("I218")';

quests.A1Q3 = {};
quests.A1Q3.name = 'Request From a Toad';
quests.A1Q3.difficulty = 2;
quests.A1Q3.description = 'Ribbit Ribbit. Ribbit Ribbit Ribbit Ribbit Ribbit Ribbit Ribbit.  Ribbit Ribbit. <br><br> <span style="color:#FFD100"> [Tip: Gear levels up automatically after getting multiple copies. Try buying multiple of them]';
quests.A1Q3.objective = `'Defeat 50 Ribulls <span class="questProgress">'+beautify(enemies.E3.killCount)+'/50</span>'`;
quests.A1Q3.logic = 'enemies.E3.killCount>49';
quests.A1Q3.effect = ' ';
quests.A1Q3.money = 2100;
quests.A1Q3.exp = 8000;
quests.A1Q3.reward = 'Ribbit Ribbit Ribbit';
quests.A1Q3.rewardIcon = 'itemIcon("I59")';

quests.A1Q4 = {};
quests.A1Q4.name = 'Miners Guild Request';
quests.A1Q4.difficulty = 2;
quests.A1Q4.description = 'These scorpions keep blocking the road to our sweet, sweet rocks. Clear the road and well show you our rocky goodness. <br><br> <span style="color:#FFD100"> [Tip: You can click the turtle to get coins]';
quests.A1Q4.objective = `'Defeat 50 Stinglets <span class="questProgress">'+beautify(enemies.E2.killCount)+'/50</span>'`;
quests.A1Q4.logic = 'enemies.E2.killCount>49';
quests.A1Q4.effect = 'areas.A1.unlockedOre = 1';
quests.A1Q4.money = 8500;
quests.A1Q4.exp = 35000;
quests.A1Q4.reward = 'Unlock Ore Node';
quests.A1Q4.rewardIcon = 'itemIcon("I32")';

quests.A1Q5 = {};
quests.A1Q5.name = 'Have You Seen My Pet';
quests.A1Q5.difficulty = 3;
quests.A1Q5.description = 'My pet Hoopperoona has gone missing. You will recognise her for her eight legs, rocky skin, and the ability to melt steel beams with her saliva. <br><br> <span style="color:#FFD100"> [Tip: You can switch browser tabs while the game is running]';
quests.A1Q5.objective = `'Defeat Hoopperoona'`;
quests.A1Q5.logic = 'enemies.E4.killCount>0';
quests.A1Q5.effect = 'items.I213.count++';
quests.A1Q5.money = 9000;
quests.A1Q5.exp = 12000;
quests.A1Q5.reward = 'Reality Voxel';
quests.A1Q5.rewardIcon = 'itemIcon("I213")';

unlocks.areas = false;

quests.A1Q6 = {};
quests.A1Q6.name = 'Chai Chai Real Smooth';
quests.A1Q6.difficulty = 1;
quests.A1Q6.description = 'Muggey, the president of the Chai Association, requests to see the most unusual chai blend of the lands. <br><br> <span style="color:#FFD100"> [Tip: You might want to come later to do certain quests]';
quests.A1Q6.objective = `'Show an unusual tea blend to Muggey'`;
quests.A1Q6.logic = 'items.I111.count>0';
quests.A1Q6.effect = 'items.RCN8.count++; items.I111.count = 0; recipes.CN7.unlocked = false;';
quests.A1Q6.money = 25000;
quests.A1Q6.exp = 390000;
quests.A1Q6.reward = 'Recipe: Masala Chai';
quests.A1Q6.rewardIcon = 'itemIcon("I110")';

/*
quests.A1Q7 = {};
quests.A1Q7.name = 'Impending Doom';
quests.A1Q7.difficulty = 7;
quests.A1Q7.description = 'I heard strange noises on the forest but it says here that my level is too low. Go check it for me, will ya? <br><br> <span style="color:#FFD100"> [Note: This effect will be permanent]';
quests.A1Q7.objective = 'Reach Level 30';
quests.A1Q7.logic = 'rpgClass.noClass.level>29';
quests.A1Q7.effect = 'areas.A1.boss = "E31";';
quests.A1Q7.money = 31000;
quests.A1Q7.exp = 39000000;
quests.A1Q7.reward = 'Area Boss Evolution';
quests.A1Q7.rewardIcon = 'itemIcon("I34")';
*/

//area 2

quests.A2Q2 = {};
quests.A2Q2.name = 'Help! Missing Feline';
quests.A2Q2.difficulty = 1;
quests.A2Q2.description = 'My cat Whiskers is missing. He likes dark closed spaces. I have nothing to offer but Whiskers grattitude.';
quests.A2Q2.objective = `'Find Whiskers'`;
quests.A2Q2.reward = 'Whiskers Gratitude';
quests.A2Q2.rewardIcon = 'itemIcon("I120")';
quests.A2Q2.logic = 'items.I123.count>0';
quests.A2Q2.effect = 'items.I123.count--; items.I120.count++;';
quests.A2Q2.money = 9000;
quests.A2Q2.exp = 19000;

quests.A2Q1 = {};
quests.A2Q1.name = 'Crafters Guild Request';
quests.A2Q1.difficulty = 2;
quests.A2Q1.description = 'The animals punched the heck out of our workshops. We will let anyone who help us repair them into the Crafters Guild.';
quests.A2Q1.objective = `'Hand over 100 copper ore <span class="questProgress">'+beautify(items.I32.count)+'/100</span><br>❖Hand over 100 rabbit hide <span class="questProgress">'+beautify(items.I114.count)+'/100</span>'`;
quests.A2Q1.logic = 'items.I32.count>99 && items.I114.count>99';
quests.A2Q1.effect = 'items.I32.count-=100; items.I114.count-=100; unlocks.jobs = true;';
quests.A2Q1.money = 11500;
quests.A2Q1.exp = 26000;
quests.A2Q1.reward = 'Access to the Guildwork Tab';
quests.A2Q1.rewardIcon = 'itemIcon("I86")';

quests.A2Q3 = {};
quests.A2Q3.name = 'A very corny request';
quests.A2Q3.difficulty = 3;
quests.A2Q3.description = 'To beat a squirrel I need to become a squirrel. Help me achieve my dream.';
quests.A2Q3.objective = `'Defeat 80 Karateil <span class="questProgress">'+beautify(enemies.E6.killCount)+'/80</span>'`;
quests.A2Q3.reward = 'Unlock Herb Node';
quests.A2Q3.logic = 'enemies.E6.killCount>79';
quests.A2Q3.effect = 'areas.A2.unlockedHerb = 1;';
quests.A2Q3.money = 22000;
quests.A2Q3.exp = 70000;
quests.A2Q3.rewardIcon = 'itemIcon("I38")';

quests.A2Q4 = {};
quests.A2Q4.name = 'Husbandry Issues';
quests.A2Q4.difficulty = 3;
quests.A2Q4.description = 'My chickens escaped from my coop and learnt full body combat. Help me bring them back.';
quests.A2Q4.objective = `'Capture 10 Roostrikas <span class="questProgress">'+beautify(items.I122.count)+'/10</span>'`;
quests.A2Q4.reward = 'Ornated Stamper x3';
quests.A2Q4.logic = 'items.I122.count>9';
quests.A2Q4.effect = 'items.I122.count=0; items.I93.count+=3;';
quests.A2Q4.money = 24000;
quests.A2Q4.exp = 295000;
quests.A2Q4.rewardIcon = 'itemIcon("I93")';

quests.A2Q5 = {};
quests.A2Q5.name = 'Sovereign Affairs';
quests.A2Q5.difficulty = 4;
quests.A2Q5.description = 'Teach him a lesson on my behalf. I would do it if it wasnt a 3 meter tiger proficient in breaking bones. <br><br> <span style="color:#FFD100"> [Tip: Area bosses can generally be tough to beat without first dabbling on the next area or coming a bit later]';
quests.A2Q5.objective = `'Defeat King-Kat'`;
quests.A2Q5.reward = 'Reality Voxel';
quests.A2Q5.rewardIcon = 'itemIcon("I213")';
quests.A2Q5.logic = 'enemies.E8.killCount>0';
quests.A2Q5.effect = 'items.I213.count++';
quests.A2Q5.money = 27000;
quests.A2Q5.exp = 480000;

quests.A2Q6 = {};
quests.A2Q6.name = 'The Way Of Karate';
quests.A2Q6.difficulty = 1;
quests.A2Q6.description = 'These animals got hands. I need something to make them learn a lesson or two about martial arts.';
quests.A2Q6.objective = `'Hand over 10 Light Dynamites <span class="questProgress">'+beautify(items.I30.count)+'/10</span>'`;
quests.A2Q6.reward = 'Vitreous Gamba';
quests.A2Q6.rewardIcon = 'itemIcon("I97")';
quests.A2Q6.logic = 'items.I30.count>9';
quests.A2Q6.effect = 'items.I30.count-=10; items.I97.count++';
quests.A2Q6.money = 32000;
quests.A2Q6.exp = 2983922;

/*
quests.A2Q7 = {};
quests.A2Q7.name = 'The Masked Return';
quests.A2Q7.difficulty = 7;
quests.A2Q7.description = 'Its a shame to see King-Kat underperforming like this. He used to be much stronger, but it seems he lost its passion for lucha.';
quests.A2Q7.objective = 'Hand over the Luchador Mask';
quests.A2Q7.reward = 'Area Boss Evolution';
quests.A2Q7.rewardIcon = 'itemIcon("I34")';
quests.A2Q7.logic = 'items.I223.count>0';
quests.A2Q7.effect = 'areas.A2.boss = "E32"; items.I223.count=0';
quests.A2Q7.money = 37000;
quests.A2Q7.exp = 80000000;
*/

//area3

quests.A3Q1 = {};
quests.A3Q1.name = 'Herbology Research';
quests.A3Q1.difficulty = 1;
quests.A3Q1.description = 'I need Nature Potions for totally legal reasons. Supply me and do not ask further questions.';
quests.A3Q1.objective = `'Reluctantly hand over 20 Lesser Nature Flasks <span class="questProgress">'+beautify(items.I49.count)+'/20</span>'`;
quests.A3Q1.reward = 'Recipe: Lesser Elemental Flask';
quests.A3Q1.rewardIcon = 'itemIcon("I154")';
quests.A3Q1.logic = 'items.I49.count>19';
quests.A3Q1.effect = 'items.I49.count-=20; items.RAN6.count = 1';
quests.A3Q1.money = 30500;
quests.A3Q1.exp = 2283922;

quests.A3Q2 = {};
quests.A3Q2.name = 'Unfortunate Subsidence';
quests.A3Q2.difficulty = 1;
quests.A3Q2.description = 'The cargo we were transporting got destroyed when a cave collapsed. Can you help us make up for it?';
quests.A3Q2.objective = `'Hand over 2000 White Stingers <span class="questProgress">'+beautify(items.I37.count)+'/2000</span>'`;
quests.A3Q2.reward = 'Runic Die III';
quests.A3Q2.rewardIcon = 'itemIcon("I11")';
quests.A3Q2.logic = 'items.I37.count>1999';
quests.A3Q2.effect = 'items.I37.count-=2000; items.I11.count+=3';
quests.A3Q2.money = 31000;
quests.A3Q2.exp = 2183922;

quests.A3Q3 = {};
quests.A3Q3.name = 'Pressing Matters';
quests.A3Q3.difficulty = 2;
quests.A3Q3.description = 'I was playing with my building blocks and realised I\'m missing yellow ones.';
quests.A3Q3.objective = `'Hand over 300 Yellow Cubes <span class="questProgress">'+beautify(items.I16.count)+'/300</span>'`;
quests.A3Q3.reward = 'Giantite Chunk';
quests.A3Q3.rewardIcon = 'itemIcon("I219")';
quests.A3Q3.logic = 'items.I16.count>299';
quests.A3Q3.effect = 'items.I16.count-=300; items.I219.count++';
quests.A3Q3.money = 32000;
quests.A3Q3.exp = 3283922;

quests.A3Q4 = {};
quests.A3Q4.name = 'Sittin\' Carefully Away';
quests.A3Q4.difficulty = 3;
quests.A3Q4.description = 'These darn TNT fellas will pose a serious danger to the miners if left unchecked.';
quests.A3Q4.objective = `'Defeat 100 Cubomites <span class="questProgress">'+beautify(enemies.E10.killCount)+'/100</span><br>❖ Ignite 10 Cubomites with Elemental Damage <span class="questProgress">'+beautify(stats.ignitedCubomites)+'/10</span>'`;
quests.A3Q4.reward = 'Unlock Ore Node';
quests.A3Q4.rewardIcon = 'itemIcon("I36")';
quests.A3Q4.logic = 'stats.ignitedCubomites>9 && enemies.E10.killCount>99';
quests.A3Q4.effect = 'areas.A3.unlockedOre = 1';
quests.A3Q4.money = 33000;
quests.A3Q4.exp = 5213922;

quests.A3Q5 = {};
quests.A3Q5.name = 'Poor Lodging Choices';
quests.A3Q5.difficulty = 1;
quests.A3Q5.description = 'There\'s rare ore on this cave. And I\'m going to make a house out of it.';
quests.A3Q5.objective = `'Hand over 150 Arcanite Bar??? <span class="questProgress">'+beautify(items.I35.count)+'/150???</span>'`;
quests.A3Q5.reward = 'Recipe: Shatterstone Potion';
quests.A3Q5.rewardIcon = 'itemIcon("I185")';
quests.A3Q5.logic = 'items.I35.count>149';
quests.A3Q5.effect = 'items.I35.count-=150; items.RAN10.count = 1;';
quests.A3Q5.money = 29000;
quests.A3Q5.exp = 17013922;

quests.A3Q6 = {};
quests.A3Q6.name = 'Harder Than Rock';
quests.A3Q6.difficulty = 4;
quests.A3Q6.description = 'The recent extraction of granite has caused a rise in the population of elementals.';
quests.A3Q6.objective = `'Defeat 100 Granite Elementals <span class="questProgress">'+beautify(enemies.E11.killCount)+'/100</span>'`;
quests.A3Q6.reward = 'Reinforced Mattock'; 
quests.A3Q6.rewardIcon = 'itemIcon("I85")';
quests.A3Q6.logic = 'enemies.E11.killCount>99';
quests.A3Q6.effect = ' items.I85.count++; shopItems.A3S16.unlocked = true; createShopItem()';
quests.A3Q6.money = 30000;
quests.A3Q6.exp = 19182312;

quests.A3Q6A = {};
quests.A3Q6A.name = 'Cool, Cool Island';
quests.A3Q6A.difficulty = 5;
quests.A3Q6A.description = 'I\'m just more of a summer person, ya know?';
quests.A3Q6A.objective = `'Clear the Penguin Glacier'`;
quests.A3Q6A.reward = 'Philanthropy Marble';
quests.A3Q6A.rewardIcon = 'itemIcon("I217")';
quests.A3Q6A.logic = 'enemies.E23.killCount>0';
quests.A3Q6A.effect = 'items.I217.count++';
quests.A3Q6A.money = 32000;
quests.A3Q6A.exp = 24182312;

quests.A3Q6B = {};
quests.A3Q6B.name = 'Big Bad, Bad Dragon';
quests.A3Q6B.difficulty = 6;
quests.A3Q6B.description = 'Until that drake is out of commission we cant dwell further into the mines. Be sure to avoid using '+mightIcon+'Might Damage or shell get very pissy!';
quests.A3Q6B.objective = `'Defeat Terragosa'`;
quests.A3Q6B.reward = 'Reality Voxel';
quests.A3Q6B.rewardIcon = 'itemIcon("I213")';
quests.A3Q6B.logic = 'enemies.E12.killCount>0';
quests.A3Q6B.effect = 'items.I213.count++';
quests.A3Q6B.money = 31000;
quests.A3Q6B.exp = 22482312;

quests.A3Q7 = {};
quests.A3Q7.name = 'Lost In The Blue';
quests.A3Q7.difficulty = 1;
quests.A3Q7.description = 'Ive never left the caves, I want to see jellyfish.';
quests.A3Q7.objective = `'Hand over 10 Ghost Jellyfish <span class="questProgress">'+beautify(items.I159.count)+'/10</span>'`;
quests.A3Q7.reward = 'Recipe: Shiny Fishing Lure';
quests.A3Q7.rewardIcon = 'itemIcon("I213")';
quests.A3Q7.logic = 'items.I159.count>9';
quests.A3Q7.effect = 'items.I159.count-=10; items.REN9.count = 1;';
quests.A3Q7.money = 320000;
quests.A3Q7.exp = 780000000;

//area 4
quests.A4Q1 = {};
quests.A4Q1.name = 'Blacksmith Request';
quests.A4Q1.difficulty = 1;
quests.A4Q1.description = 'I\'m going to make the finest of armors and I need the finest of materials.';
quests.A4Q1.objective = `'Hand over 600 Agate Crystal Scales <span class="questProgress">'+beautify(items.I71.count)+'/600</span>'`;
quests.A4Q1.logic = 'items.I71.count>599';
quests.A4Q1.effect = 'items.I71.count-=600; items.RAN11.count++';
quests.A4Q1.reward = 'Recipe: Reinforced Stamper Transfiguration';
quests.A4Q1.rewardIcon = 'itemIcon("I92")';
quests.A4Q1.money = 280000;
quests.A4Q1.exp = 90000000;

quests.A4Q2 = {};
quests.A4Q2.name = 'Spineless Tourist';
quests.A4Q2.difficulty = 2;
quests.A4Q2.description = 'This depressing scenary is tooootaly making me unconfortable. Bring me something to drink.';
quests.A4Q2.objective = `'Hand over 15 Pumkin Spice Latte <span class="questProgress">'+beautify(items.I129.count)+'/15</span>'`;
quests.A4Q2.reward = 'Unlock Fishing Pond';
quests.A4Q2.rewardIcon = 'itemIcon("I162")';
quests.A4Q2.logic = 'items.I129.count>14';
quests.A4Q2.effect = 'items.I129.count-=15; areas.A4.unlockedPond = 1';
quests.A4Q2.money = 300000;
quests.A4Q2.exp = 190000000;

quests.A4Q3 = {};
quests.A4Q3.name = 'There is Always A Catch';
quests.A4Q3.difficulty = 1;
quests.A4Q3.description = 'Lately I\'m getting pretty restless over what I lost playing near the pond, can you get it for me?';
quests.A4Q3.objective = `'Hand over the lost item on the pond'`;
quests.A4Q3.reward = 'Recipe: Lesser Deific Flask';
quests.A4Q3.rewardIcon = 'itemIcon("I155")';
quests.A4Q3.logic = 'items.I286.count>0';
quests.A4Q3.effect = 'items.I286.count=0; items.RAN7.count++';
quests.A4Q3.money = 300000;
quests.A4Q3.exp = 730000000;

quests.A4Q4 = {};
quests.A4Q4.name = 'Begone Dark Presences';
quests.A4Q4.difficulty = 4;
quests.A4Q4.description = 'You feel the powerful aura, yes? I need a powerful exorciser to aid me on this Job.';
quests.A4Q4.objective = `'Exorcise 3 Morgatos with salt <span class="questProgress">'+beautify(stats.purifiedMorgatosDefeated)+'/3</span>'`;
quests.A4Q4.reward = 'Recipe: Lesser Occult Flask';
quests.A4Q4.rewardIcon = 'itemIcon("I156")';
quests.A4Q4.logic = 'stats.purifiedMorgatosDefeated>2'; 
quests.A4Q4.effect = 'items.RAN8.count++';
quests.A4Q4.money = 320000;
quests.A4Q4.exp = 960000000;

quests.A4Q6 = {};
quests.A4Q6.name = 'Exorcism Aboard';
quests.A4Q6.difficulty = 5;
quests.A4Q6.description = 'Well this is fantastic. Now the ghosts are throwing their own floating party.';
quests.A4Q6.objective = `'Clear the Pirate Galleon'`;
quests.A4Q6.reward = '?????????';
quests.A4Q6.logic = 'enemies.E26.killCount>0';
quests.A4Q6.rewardIcon = 'itemIcon("I287")';
quests.A4Q6.effect = 'items.I287.count++';
quests.A4Q6.money = 390000;
quests.A4Q6.exp = 1270000000;

quests.A4Q4A = {};
quests.A4Q4A.name = 'Monster Hunt Request';
quests.A4Q4A.difficulty = 6;
quests.A4Q4A.description = 'The adventurer\'s guild has reported sightings of a fiery monster several times more powerful than the rest.';
quests.A4Q4A.objective = `'Defeat Infernalus'`;
quests.A4Q4A.reward = 'Reality Voxel';
quests.A4Q4A.logic = 'enemies.E27.killCount>0';
quests.A4Q4A.rewardIcon = 'itemIcon("I213")';
quests.A4Q4A.effect = 'items.I213.count++';
quests.A4Q4A.money = 410000;
quests.A4Q4A.exp = 2300000000;

quests.A4Q7 = {};
quests.A4Q7.name = 'Relatable Situation';
quests.A4Q7.difficulty = 1;
quests.A4Q7.description = 'The lord of hell fire stole my grill. I think his reign over fiery goods has gone too far.';
quests.A4Q7.objective = `'Steal back the grill from Infernalus'`;
quests.A4Q7.reward = 'Recipe: Firetank Pyrocombulator';
quests.A4Q7.rewardIcon = 'itemIcon("I187")';
quests.A4Q7.logic = 'items.I90.count>0';
quests.A4Q7.effect = 'items.I90.count=0; items.REN10.count++; ';
quests.A4Q7.money = 350000;
quests.A4Q7.exp = 1200000000;

quests.A4Q5 = {};
quests.A4Q5.name = 'Red Hooded Behest';
quests.A4Q5.difficulty = 6;
quests.A4Q5.description = 'That... Thing... Hand it over... I can make something useful... For you...';
quests.A4Q5.objective = `'Hand over 200 Nightmare Fuel <span class="questProgress">'+beautify(items.I100.count)+'/200</span>'`;
quests.A4Q5.reward = 'Anima Anvil';
quests.A4Q5.rewardIcon = 'itemIcon("I157")';
quests.A4Q5.logic = 'items.I100.count>199'; 
quests.A4Q5.effect = 'items.I100.count-=200; items.I157.count++';
quests.A4Q5.money = 390000;
quests.A4Q5.exp = 3100000000;



Object.keys(quests).forEach(function(key) {
  quests[key].once = false;
  quests[key].state = "pending";
});
//#endregion
//----------------------==========================-----------------------
//----------------------===========RECIPES========-----------------------
//----------------------==========================-----------------------
//#region Recipes
var recipes = {}

//Smithing
//Novice
recipes.SN1 = {};
recipes.SN1.level = 1;
recipes.SN1.exp = 7;
recipes.SN1.timer = 5;
recipes.SN1.item = 'I31';
recipes.SN1.reagent1 = 'I32';
recipes.SN1.amount1 = 4;

recipes.SN2 = {};
recipes.SN2.description = 'Creates a piece of gear of the Plated Explorer Set';
recipes.SN2.level = 5;
recipes.SN2.exp = 80;
recipes.SN2.timer = 60;
recipes.SN2.item = 'I73';
recipes.SN2.reagent1 = 'I66';
recipes.SN2.amount1 = 3;
recipes.SN2.reagent2 = 'I57';
recipes.SN2.amount2 = 10;
recipes.SN2.reagent3 = 'I114';
recipes.SN2.amount3 = 20;

recipes.SN3 = {};
recipes.SN3.description = 'Creates a piece of gear of the Plated Explorer Set';
recipes.SN3.level = 5;
recipes.SN3.exp = 80;
recipes.SN3.timer = 60;
recipes.SN3.item = 'I74';
recipes.SN3.reagent1 = 'I66';
recipes.SN3.amount1 = 3;
recipes.SN3.reagent2 = 'I57';
recipes.SN3.amount2 = 10;
recipes.SN3.reagent3 = 'I114';
recipes.SN3.amount3 = 20;

recipes.SN4 = {};
recipes.SN4.description = 'Creates a piece of gear of the Plated Explorer Set';
recipes.SN4.level = 5;
recipes.SN4.exp = 80;
recipes.SN4.timer = 60;
recipes.SN4.item = 'I75';
recipes.SN4.reagent1 = 'I66';
recipes.SN4.amount1 = 3;
recipes.SN4.reagent2 = 'I57';
recipes.SN4.amount2 = 10;
recipes.SN4.reagent3 = 'I114';
recipes.SN4.amount3 = 20;

recipes.SN5 = {};
recipes.SN5.description = 'Creates a piece of gear of the Plated Explorer Set';
recipes.SN5.level = 5;
recipes.SN5.exp = 80;
recipes.SN5.timer = 60;
recipes.SN5.item = 'I76';
recipes.SN5.reagent1 = 'I66';
recipes.SN5.amount1 = 3;
recipes.SN5.reagent2 = 'I57';
recipes.SN5.amount2 = 10;
recipes.SN5.reagent3 = 'I114';
recipes.SN5.amount3 = 20;

recipes.SN6 = {};
recipes.SN6.description = 'Creates a piece of gear of the Plated Explorer Set';
recipes.SN6.level = 5;
recipes.SN6.exp = 80;
recipes.SN6.timer = 60;
recipes.SN6.item = 'I77';
recipes.SN6.reagent1 = 'I66';
recipes.SN6.amount1 = 3;
recipes.SN6.reagent2 = 'I57';
recipes.SN6.amount2 = 10;
recipes.SN6.reagent3 = 'I114';
recipes.SN6.amount3 = 20;

recipes.SN8 = {};
recipes.SN8.level = 10;
recipes.SN8.exp = 80;
recipes.SN8.timer = 60;
recipes.SN8.item = 'I44';
recipes.SN8.reagent1 = 'I66';
recipes.SN8.amount1 = 3;
recipes.SN8.reagent2 = 'I22';
recipes.SN8.amount2 = 10;
recipes.SN8.unlocked = false;

recipes.SN7 = {};
recipes.SN7.level = 15;
recipes.SN7.exp = 10;
recipes.SN7.timer = 10;
recipes.SN7.item = 'I35';
recipes.SN7.reagent1 = 'I36';
recipes.SN7.amount1 = 5;

recipes.SN9 = {};
recipes.SN9.level = 20;
recipes.SN9.exp = 200;
recipes.SN9.timer = 60;
recipes.SN9.item = 'I45';
recipes.SN9.reagent1 = 'I198';
recipes.SN9.amount1 = 6;
recipes.SN9.reagent2 = 'I42';
recipes.SN9.amount2 = 5;
recipes.SN9.unlocked = false;

recipes.SN9A = {};
recipes.SN9A.level = 25;
recipes.SN9A.exp = 200;
recipes.SN9A.timer = 300;
recipes.SN9A.item = 'I24';
recipes.SN9A.reagent1 = 'I35';
recipes.SN9A.amount1 = 10;
recipes.SN9A.reagent2 = 'I72';
recipes.SN9A.amount2 = 30;
recipes.SN9A.unlocked = false;

//Cooking
//Novice
recipes.CN1 = {};
recipes.CN1.level = 1;
recipes.CN1.exp = 8;
recipes.CN1.timer = 5;
recipes.CN1.item = 'I108';
recipes.CN1.reagent1 = 'I38';
recipes.CN1.amount1 = 5;

recipes.CN2 = {};
recipes.CN2.level = 5;
recipes.CN2.exp = 50;
recipes.CN2.timer = 15;
recipes.CN2.item = 'I54';
recipes.CN2.reagent1 = 'I1';
recipes.CN2.amount1 = 30;
recipes.CN2.reagent2 = 'I108';
recipes.CN2.amount2 = 3;

recipes.CN4 = {};
recipes.CN4.level = 5;
recipes.CN4.exp = 80;
recipes.CN4.timer = 15;
recipes.CN4.item = 'I52';
recipes.CN4.reagent1 = 'I51';
recipes.CN4.amount1 = 20;
recipes.CN4.reagent2 = 'I115';
recipes.CN4.amount2 = 20;
recipes.CN4.reagent3 = 'I108';
recipes.CN4.amount3 = 3;
recipes.CN4.unlocked = false;

recipes.CN7 = {};
recipes.CN7.description = 'Compress herbs into a special blend ignoring all safety procedures.';
recipes.CN7.level = 5;
recipes.CN7.exp = 0;
recipes.CN7.timer = 600;
recipes.CN7.item = 'I111';
recipes.CN7.reagent1 = 'I38';
recipes.CN7.amount1 = 50;
recipes.CN7.unlocked = true;

recipes.CN8 = {};
recipes.CN8.level = 5;
recipes.CN8.exp = 80;
recipes.CN8.timer = 15;
recipes.CN8.item = 'I110';
recipes.CN8.reagent1 = 'I108';
recipes.CN8.amount1 = 5;
recipes.CN8.unlocked = false;

recipes.CN9 = {};
recipes.CN9.level = 10;
recipes.CN9.exp = 90;
recipes.CN9.timer = 20;
recipes.CN9.item = 'I188';
recipes.CN9.reagent1 = 'I17';
recipes.CN9.amount1 = 20;
recipes.CN9.reagent2 = 'I25';
recipes.CN9.amount2 = 50;
recipes.CN9.reagent3 = 'I108';
recipes.CN9.amount3 = 5;

recipes.CN9A = {};
recipes.CN9A.level = 16;
recipes.CN9A.exp = 110;
recipes.CN9A.timer = 20;
recipes.CN9A.item = 'I129';
recipes.CN9A.reagent1 = 'I58';
recipes.CN9A.amount1 = 30;
recipes.CN9A.reagent2 = 'I108';
recipes.CN9A.amount2 = 10;


recipes.CN10 = {};
recipes.CN10.level = 20;
recipes.CN10.exp = 130;
recipes.CN10.timer = 20;
recipes.CN10.item = 'I186';
recipes.CN10.reagent1 = 'I161';
recipes.CN10.amount1 = 5;
recipes.CN10.reagent2 = 'I108';
recipes.CN10.amount2 = 10;

recipes.CN11 = {};
recipes.CN11.level = 20;
recipes.CN11.exp = 130;
recipes.CN11.timer = 20;
recipes.CN11.item = 'I189';
recipes.CN11.reagent1 = 'I160';
recipes.CN11.amount1 = 2;
recipes.CN11.reagent2 = 'I108';
recipes.CN11.amount2 = 10;
recipes.CN11.unlocked = false;


//Alchemy
//Novice
recipes.AN1 = {};
recipes.AN1.level = 1;
recipes.AN1.exp = 8;
recipes.AN1.timer = 5;
recipes.AN1.item = 'I68';
recipes.AN1.reagent1 = 'I38';
recipes.AN1.amount1 = 5;

recipes.AN2 = {};
recipes.AN2.level = 5;
recipes.AN2.exp = 30;
recipes.AN2.timer = 10;
recipes.AN2.item = 'I19';
recipes.AN2.reagent1 = 'I48';
recipes.AN2.amount1 = 1;
recipes.AN2.reagent2 = 'I68';
recipes.AN2.amount2 = 2;

recipes.AN5 = {};
recipes.AN5.level = 5;
recipes.AN5.exp = 50;
recipes.AN5.timer = 15;
recipes.AN5.item = 'I21';
recipes.AN5.reagent1 = 'I48';
recipes.AN5.amount1 = 1;
recipes.AN5.reagent2 = 'I68';
recipes.AN5.amount2 = 2;
recipes.AN5.reagent3 = 'I37';
recipes.AN5.amount3 = 20;

recipes.AN3 = {};
recipes.AN3.level = 10;
recipes.AN3.exp = 60;
recipes.AN3.timer = 15;
recipes.AN3.item = 'I49';
recipes.AN3.reagent1 = 'I48';
recipes.AN3.amount1 = 1;
recipes.AN3.reagent2 = 'I68';
recipes.AN3.amount2 = 2;
recipes.AN3.reagent3 = 'I115';
recipes.AN3.amount3 = 20;

recipes.AN4 = {};
recipes.AN4.level = 10;
recipes.AN4.exp = 60;
recipes.AN4.timer = 15;
recipes.AN4.item = 'I50';
recipes.AN4.reagent1 = 'I48';
recipes.AN4.amount1 = 1;
recipes.AN4.reagent2 = 'I68';
recipes.AN4.amount2 = 2;
recipes.AN4.reagent3 = 'I51';
recipes.AN4.amount3 = 20;

recipes.AN6 = {};
recipes.AN6.level = 15;
recipes.AN6.exp = 100;
recipes.AN6.timer = 15;
recipes.AN6.item = 'I154';
recipes.AN6.reagent1 = 'I48';
recipes.AN6.amount1 = 1;
recipes.AN6.reagent2 = 'I68';
recipes.AN6.amount2 = 5;
recipes.AN6.reagent3 = 'I16';
recipes.AN6.amount3 = 30;
recipes.AN6.unlocked = false;

recipes.AN7 = {};
recipes.AN7.level = 15;
recipes.AN7.exp = 100;
recipes.AN7.timer = 15;
recipes.AN7.item = 'I155';
recipes.AN7.reagent1 = 'I48';
recipes.AN7.amount1 = 1;
recipes.AN7.reagent2 = 'I68';
recipes.AN7.amount2 = 5;
recipes.AN7.reagent3 = 'I71';
recipes.AN7.amount3 = 30;
recipes.AN7.unlocked = false;

recipes.AN8 = {};
recipes.AN8.level = 15;
recipes.AN8.exp = 100;
recipes.AN8.timer = 15;
recipes.AN8.item = 'I156';
recipes.AN8.reagent1 = 'I48';
recipes.AN8.amount1 = 1;
recipes.AN8.reagent2 = 'I68';
recipes.AN8.amount2 = 5;
recipes.AN8.reagent3 = 'I18';
recipes.AN8.amount3 = 30;
recipes.AN8.unlocked = false;

recipes.AN10 = {};
recipes.AN10.level = 15;
recipes.AN10.exp = 100;
recipes.AN10.timer = 20;
recipes.AN10.item = 'I185';
recipes.AN10.reagent1 = 'I48';
recipes.AN10.amount1 = 1;
recipes.AN10.reagent2 = 'I68';
recipes.AN10.amount2 = 5;
recipes.AN10.reagent3 = 'I17';
recipes.AN10.amount3 = 30;
recipes.AN10.unlocked = false;

recipes.AN4A = {};
recipes.AN4A.level = 15;
recipes.AN4A.exp = 100;
recipes.AN4A.timer = 15;
recipes.AN4A.item = 'I280';
recipes.AN4A.reagent1 = 'I48';
recipes.AN4A.amount1 = 1;
recipes.AN4A.reagent2 = 'I68';
recipes.AN4A.amount2 = 5;
recipes.AN4A.reagent3 = 'I29';
recipes.AN4A.amount3 = 30;
recipes.AN4A.unlocked = false;

recipes.AN9 = {}; //soul grub
recipes.AN9.level = 20;
recipes.AN9.exp = 200;
recipes.AN9.timer = 60;
recipes.AN9.item = 'I183';
recipes.AN9.reagent1 = 'I181';
recipes.AN9.amount1 = 1;
recipes.AN9.reagent2 = 'I18';
recipes.AN9.amount2 = 30;
recipes.AN9.unlocked = false;

recipes.AN11 = {};
recipes.AN11.level = 20;
recipes.AN11.exp = 150;
recipes.AN11.timer = 15;
recipes.AN11.item = 'I92';
recipes.AN11.reagent1 = 'I91';
recipes.AN11.amount1 = 15;
recipes.AN11.reagent2 = 'I22';
recipes.AN11.amount2 = 3;
recipes.AN11.unlocked = false;



//Engineering
//Novice
recipes.EN1 = {};
recipes.EN1.level = 1;
recipes.EN1.exp = 12;
recipes.EN1.timer = 5;
recipes.EN1.item = 'I66';
recipes.EN1.reagent1 = 'I31';
recipes.EN1.amount1 = 2;

recipes.EN2 = {};
recipes.EN2.description = 'Creates a Copper Key<br>Can be used to open Novice Locks';
recipes.EN2.level = 5;
recipes.EN2.exp = 20;
recipes.EN2.timer = 10;
recipes.EN2.item = 'I41';
recipes.EN2.reagent1 = 'I66';
recipes.EN2.amount1 = 1;

recipes.EN4 = {};
recipes.EN4.level = 5;
recipes.EN4.exp = 80;
recipes.EN4.timer = 60;
recipes.EN4.item = 'I80';
recipes.EN4.reagent1 = 'I66';
recipes.EN4.amount1 = 10;
recipes.EN4.reagent2 = 'I22';
recipes.EN4.amount2 = 10;
recipes.EN4.unlocked = false;

recipes.EN5 = {};
recipes.EN5.level = 10;
recipes.EN5.exp = 40;
recipes.EN5.timer = 20;
recipes.EN5.item = 'I67';
recipes.EN5.reagent1 = 'I66';
recipes.EN5.amount1 = 2;
recipes.EN5.reagent2 = 'I57';
recipes.EN5.amount2 = 30;
recipes.EN5.unlocked = false;

recipes.EN6 = {};
recipes.EN6.level = 15;
recipes.EN6.exp = 20;
recipes.EN6.timer = 15;
recipes.EN6.item = 'I30';
recipes.EN6.reagent1 = 'I66';
recipes.EN6.amount1 = 5;
recipes.EN6.reagent2 = 'I29';
recipes.EN6.amount2 = 10;
recipes.EN6.unlocked = false;

recipes.EN6A = {};
recipes.EN6A.level = 15;
recipes.EN6A.description = "Creates a bunch of Arcanite Bolts";
recipes.EN6A.exp = 19;
recipes.EN6A.timer = 15;
recipes.EN6A.item = 'I198';
recipes.EN6A.reagent1 = 'I35';
recipes.EN6A.amount1 = 2;

recipes.EN7 = {};
recipes.EN7.level = 15;
recipes.EN7.exp = 50;
recipes.EN7.timer = 15;
recipes.EN7.item = 'I46';
recipes.EN7.reagent1 = 'I198';
recipes.EN7.amount1 = 1;
recipes.EN7.reagent2 = 'I165';
recipes.EN7.amount2 = 5;

recipes.EN7A = {};
recipes.EN7A.level = 15;
recipes.EN7A.exp = 200;
recipes.EN7A.timer = 60;
recipes.EN7A.item = 'I201';
recipes.EN7A.reagent1 = 'I198';
recipes.EN7A.amount1 = 15;
recipes.EN7A.reagent2 = 'I17';
recipes.EN7A.amount2 = 100;
recipes.EN7A.reagent3 = 'I42';
recipes.EN7A.amount3 = 5;
recipes.EN7A.unlocked = false;

recipes.EN8 = {};
recipes.EN8.level = 20;
recipes.EN8.exp = 150;
recipes.EN8.timer = 20;
recipes.EN8.item = 'I179';
recipes.EN8.reagent1 = 'I198';
recipes.EN8.amount1 = 5;
recipes.EN8.reagent2 = 'I29';
recipes.EN8.amount2 = 30;
recipes.EN8.reagent3 = 'I18';
recipes.EN8.amount3 = 15;
recipes.EN8.unlocked = false;

recipes.EN9 = {};
recipes.EN9.level = 20;
recipes.EN9.exp = 600;
recipes.EN9.timer = 70;
recipes.EN9.item = 'I182';
recipes.EN9.reagent1 = 'I198';
recipes.EN9.amount1 = 100;
recipes.EN9.reagent2 = 'I71';
recipes.EN9.amount2 = 400;
recipes.EN9.reagent3 = 'I42';
recipes.EN9.amount3 = 60;
recipes.EN9.unlocked = false;

recipes.EN10 = {};
recipes.EN10.level = 25;
recipes.EN10.exp = 500;
recipes.EN10.timer = 20;
recipes.EN10.item = 'I187';
recipes.EN10.reagent1 = 'I198';
recipes.EN10.amount1 = 5;
recipes.EN10.reagent2 = 'I100';
recipes.EN10.amount2 = 5;
recipes.EN10.reagent3 = 'I66';
recipes.EN10.amount3 = 10;
recipes.EN10.unlocked = false;

recipes.GS1 = {};
recipes.GS1.level = 20;
recipes.GS1.exp = 100;
recipes.GS1.timer = 1;
recipes.GS1.item = 'I194';
recipes.GS1.reagent1 = 'I1';
recipes.GS1.amount1 = 300;
recipes.GS1.reagent2 = 'I51';
recipes.GS1.amount2 = 300;
recipes.GS1.reagent3 = 'I37';
recipes.GS1.amount3 = 300;
recipes.GS1.reagent4 = 'I57';
recipes.GS1.amount4 = 30;

recipes.GS2 = {};
recipes.GS2.level = 20;
recipes.GS2.exp = 100;
recipes.GS2.timer = 1;
recipes.GS2.item = 'I195';
recipes.GS2.reagent1 = 'I114';
recipes.GS2.amount1 = 300;
recipes.GS2.reagent2 = 'I115';
recipes.GS2.amount2 = 300;
recipes.GS2.reagent3 = 'I25';
recipes.GS2.amount3 = 300;
recipes.GS2.reagent4 = 'I165';
recipes.GS2.amount4 = 30;

recipes.GS3 = {};
recipes.GS3.level = 20;
recipes.GS3.exp = 100;
recipes.GS3.timer = 1;
recipes.GS3.item = 'I196';
recipes.GS3.reagent1 = 'I16';
recipes.GS3.amount1 = 300;
recipes.GS3.reagent2 = 'I29';
recipes.GS3.amount2 = 300;
recipes.GS3.reagent3 = 'I17';
recipes.GS3.amount3 = 300;
recipes.GS3.reagent4 = 'I71';
recipes.GS3.amount4 = 30;

recipes.GS4 = {};
recipes.GS4.level = 20;
recipes.GS4.exp = 100;
recipes.GS4.timer = 1;
recipes.GS4.item = 'I197';
recipes.GS4.reagent1 = 'I40';
recipes.GS4.amount1 = 300;
recipes.GS4.reagent2 = 'I58';
recipes.GS4.amount2 = 300;
recipes.GS4.reagent3 = 'I18';
recipes.GS4.amount3 = 300;
recipes.GS4.reagent4 = 'I100';
recipes.GS4.amount4 = 30;

recipes.GS5 = {};
recipes.GS5.level = 20;
recipes.GS5.exp = 100;
recipes.GS5.timer = 1;
recipes.GS5.item = 'I197A';
recipes.GS5.reagent1 = 'I32';
recipes.GS5.amount1 = 300;
recipes.GS5.reagent2 = 'I36';
recipes.GS5.amount2 = 300;
recipes.GS5.reagent3 = 'I38';
recipes.GS5.amount3 = 300;
recipes.GS5.reagent4 = 'I161';
recipes.GS5.amount4 = 10;

/*
recipes.GS6 = {};
recipes.GS6.level = 24;
recipes.GS6.exp = 100;
recipes.GS6.timer = 1;
recipes.GS6.item = 'I0';
recipes.GS6.reagent1 = 'I37';
recipes.GS6.amount1 = 10;
recipes.GS6.reagent2 = 'I58';
recipes.GS6.amount2 = 10;
recipes.GS6.reagent3 = 'I114';
recipes.GS6.amount3 = 10;
*/

Object.keys(recipes).forEach(function(key) {
  recipes[key].selected = false;
  recipes[key].time = recipes[key].timer;
  recipes[key].crafting = 'false';
  recipes[key].craftingQueue = 0;
});

//#endregion
//----------------------==========================-----------------------
//----------------------===========JOBS===========-----------------------
//----------------------==========================-----------------------
//#region Jobs
var jobs = {}

jobs.blacksmith = {};
jobs.blacksmith.level = 1;
jobs.blacksmith.title = 'Novice Blacksmith';
jobs.blacksmith.exp = 0;
jobs.blacksmith.maxExp = 30;

jobs.cooking = {};
jobs.cooking.level = 1;
jobs.cooking.title = 'Novice Cooking';
jobs.cooking.exp = 0;
jobs.cooking.maxExp = 30;

jobs.alchemy = {};
jobs.alchemy.level = 1;
jobs.alchemy.title = 'Novice Alchemy';
jobs.alchemy.exp = 0;
jobs.alchemy.maxExp = 30;

jobs.engineering = {};
jobs.engineering.level = 1;
jobs.engineering.title = 'Novice Engineering';
jobs.engineering.exp = 0;
jobs.engineering.maxExp = 30;

var jobPanels = {}

jobPanels.SN = {}
jobPanels.SN.name = 'Novice Blacksmith Recipes';
jobPanels.SN.hidden = false; //this checks for contrapted category
jobPanels.SN.unlocked = true;
jobPanels.SN.category = 'blacksmithRecipes';

jobPanels.GS = {}
jobPanels.GS.name = 'Garrison Supplies';
jobPanels.GS.hidden = false;
jobPanels.GS.unlocked = false;
jobPanels.GS.category = 'blacksmithRecipes';

jobPanels.CN = {}
jobPanels.CN.name = 'Novice Cooking Recipes';
jobPanels.CN.hidden = false;
jobPanels.CN.unlocked = true;
jobPanels.CN.category = 'cookingRecipes';

jobPanels.AN = {}
jobPanels.AN.name = 'Novice Alchemy Recipes';
jobPanels.AN.hidden = false;
jobPanels.AN.unlocked = true;
jobPanels.AN.category = 'alchemyRecipes';

jobPanels.EN = {}
jobPanels.EN.name = 'Novice Engineering Recipes';
jobPanels.EN.hidden = false;
jobPanels.EN.unlocked = true;
jobPanels.EN.category = 'engineeringRecipes';

Object.keys(jobPanels).forEach(function(key) {
  jobPanels[key].id = key;
});

//#endregion
//----------------------==========================-----------------------
//----------------------===========SHOP===========-----------------------
//----------------------==========================-----------------------
const materialPrice = 100;
//#region ShopItems
var shopItems = {}

//Area 1
shopItems.A1S1 = {}
shopItems.A1S1.item = 'I12';
shopItems.A1S1.price = 600;
shopItems.A1S1.stock = 20;
shopItems.A1S1.restock = 20;
//shopItems.A1S1.unlocked = false;

shopItems.A1S2 = {}
shopItems.A1S2.item = 'I9';
shopItems.A1S2.price = 800;
shopItems.A1S2.stock = "∞";

shopItems.A1S3 = {}
shopItems.A1S3.item = 'I11';
shopItems.A1S3.price = 6500;
shopItems.A1S3.stock = 3;
shopItems.A1S3.restock = 3;

shopItems.A1S4 = {}
shopItems.A1S4.item = 'I41';
shopItems.A1S4.price = 1000;
shopItems.A1S4.stock = 10;
shopItems.A1S4.restock = 10;

shopItems.A1S6 = {}
shopItems.A1S6.item = 'I113';
shopItems.A1S6.price = 15000;
shopItems.A1S6.stock = 1;

shopItems.A1S7 = {}
shopItems.A1S7.item = 'I7';
shopItems.A1S7.price = 300;
shopItems.A1S7.stock = 5;
shopItems.A1S7.restock = 5;

shopItems.A1S8 = {}
shopItems.A1S8.item = 'I78';
shopItems.A1S8.price = 10000;
shopItems.A1S8.stock = "∞";

shopItems.A1S9 = {}
shopItems.A1S9.item = 'I104';
shopItems.A1S9.price = 10000;
shopItems.A1S9.stock = 1;

shopItems.A1S10 = {}
shopItems.A1S10.item = 'I89';
shopItems.A1S10.price = materialPrice;
shopItems.A1S10.stock = 5;
shopItems.A1S10.restock = 5;

shopItems.A1S11 = {}
shopItems.A1S11.item = 'I176';
shopItems.A1S11.price = 'Math.max(500, stats.totalCoins*0.01)';
shopItems.A1S11.stock = "∞";

shopItems.A1S12 = {}
shopItems.A1S12.item = 'I84';
shopItems.A1S12.price = 35000;
shopItems.A1S12.stock = "∞";

shopItems.A1S13 = {}
shopItems.A1S13.item = 'I3';
shopItems.A1S13.price = 500;
shopItems.A1S13.stock = "∞";

shopItems.A1S14 = {}
shopItems.A1S14.item = 'I5';
shopItems.A1S14.price = 500;
shopItems.A1S14.stock = "∞";

shopItems.A1S15 = {}
shopItems.A1S15.item = 'I4';
shopItems.A1S15.price = 500;
shopItems.A1S15.stock = "∞";

shopItems.A1S16 = {}
shopItems.A1S16.item = 'I6';
shopItems.A1S16.price = 500;
shopItems.A1S16.stock = "∞";

shopItems.A1S17 = {}
shopItems.A1S17.item = 'I2';
shopItems.A1S17.price = 500;
shopItems.A1S17.stock = "∞";

//area 2

shopItems.A2S1 = {}
shopItems.A2S1.item = 'I1';
shopItems.A2S1.price = materialPrice;
shopItems.A2S1.stock = 200;
shopItems.A2S1.restock = 200;

shopItems.A2S2 = {}
shopItems.A2S2.item = 'REN4';
shopItems.A2S2.price = 10000;
shopItems.A2S2.stock = 1;

shopItems.A2S3 = {}
shopItems.A2S3.item = 'RCN4';
shopItems.A2S3.price = 20000;
shopItems.A2S3.stock = 1;

shopItems.A2S4 = {}
shopItems.A2S4.item = 'I116';
shopItems.A2S4.price = 40000;
shopItems.A2S4.stock = "∞";

shopItems.A2S5 = {}
shopItems.A2S5.item = 'I121';
shopItems.A2S5.price = 5000;
shopItems.A2S5.stock = 10;

shopItems.A2S6 = {}
shopItems.A2S6.item = 'I86';
shopItems.A2S6.price = 45000;
shopItems.A2S6.stock = 1;

shopItems.A2S7 = {}
shopItems.A2S7.item = 'I124';
shopItems.A2S7.price = 125000;
shopItems.A2S7.stock = 1;

shopItems.A2S8 = {}
shopItems.A2S8.item = 'I125';
shopItems.A2S8.price = 99900;
shopItems.A2S8.stock = 1;

shopItems.A2S9 = {}
shopItems.A2S9.item = 'I34';
shopItems.A2S9.price = 30000;
shopItems.A2S9.stock = 1;

shopItems.A2S10 = {}
shopItems.A2S10.item = 'I48';
shopItems.A2S10.price = 500;
shopItems.A2S10.stock = "∞";

shopItems.A2S11 = {}
shopItems.A2S11.item = 'I37';
shopItems.A2S11.price = materialPrice;
shopItems.A2S11.stock = 200;
shopItems.A2S11.restock = 200;

shopItems.A2S12 = {}
shopItems.A2S12.item = 'I55';
shopItems.A2S12.price = 50000;
shopItems.A2S12.stock = "∞";

shopItems.A2S13 = {}
shopItems.A2S13.item = 'I51';
shopItems.A2S13.price = materialPrice;
shopItems.A2S13.stock = 200;
shopItems.A2S13.restock = 200;

shopItems.A2S14 = {}
shopItems.A2S14.item = 'I290';
shopItems.A2S14.price = 45000;
shopItems.A2S14.stock = 1;

//area 3

shopItems.A3S1 = {}
shopItems.A3S1.item = 'I70';
shopItems.A3S1.price = 120000;
shopItems.A3S1.stock = 1;

shopItems.A3S2 = {}
shopItems.A3S2.item = 'REN7A';
shopItems.A3S2.price = 219000;
shopItems.A3S2.stock = 1;

shopItems.A3S3 = {}
shopItems.A3S3.item = 'I30';
shopItems.A3S3.price = 35000;
shopItems.A3S3.stock = 3;
shopItems.A3S3.restock = 3;

shopItems.A3S4 = {}
shopItems.A3S4.item = 'I114';
shopItems.A3S4.price = materialPrice;
shopItems.A3S4.stock = 200;
shopItems.A3S4.restock = 200;

shopItems.A3S5 = {}
shopItems.A3S5.item = 'REN6';
shopItems.A3S5.price = 95000;
shopItems.A3S5.stock = 1;

shopItems.A3S6 = {}
shopItems.A3S6.item = 'I128';
shopItems.A3S6.price = 555000;
shopItems.A3S6.stock = 1;

shopItems.A3S7 = {}
shopItems.A3S7.item = 'I222';
shopItems.A3S7.price = 22000;
shopItems.A3S7.stock = 1;

shopItems.A3S8 = {}
shopItems.A3S8.item = 'I87';
shopItems.A3S8.price = 300000;
shopItems.A3S8.stock = 1;

/*
shopItems.A3S9 = {}
shopItems.A3S9.item = 'I0';
shopItems.A3S9.price = 190000;
shopItems.A3S9.stock = "∞";
shopItems.A3S9.unlocked = false;

shopItems.A3S10 = {}
shopItems.A3S10.item = 'I0';
shopItems.A3S10.price = 20000;
shopItems.A3S10.stock = 10;
shopItems.A3S10.restock = 10;
*/ 
shopItems.A3S11 = {}
shopItems.A3S11.item = 'I199';
shopItems.A3S11.price = 300000;
shopItems.A3S11.stock = 1;

shopItems.A3S12 = {}
shopItems.A3S12.item = 'I154';
shopItems.A3S12.price = 20000;
shopItems.A3S12.stock = 3;
shopItems.A3S12.restock = 3;

shopItems.A3S13 = {}
shopItems.A3S13.item = 'I25';
shopItems.A3S13.price = materialPrice;
shopItems.A3S13.stock = 200;
shopItems.A3S13.restock = 200;

shopItems.A3S14 = {}
shopItems.A3S14.item = 'I115';
shopItems.A3S14.price = materialPrice;
shopItems.A3S14.stock = 200;
shopItems.A3S14.restock = 200;

shopItems.A3S15 = {}
shopItems.A3S15.item = 'I288';
shopItems.A3S15.price = 50000;
shopItems.A3S15.stock = 1;

shopItems.A3S16 = {}
shopItems.A3S16.item = 'I85';
shopItems.A3S16.price = 300000;
shopItems.A3S16.stock = "∞";
shopItems.A3S16.unlocked = false;

//area 4

shopItems.A4S1 = {}
shopItems.A4S1.item = 'I162';
shopItems.A4S1.price = 800000;
shopItems.A4S1.stock = "∞";

shopItems.A4S2 = {}
shopItems.A4S2.item = 'I181';
shopItems.A4S2.price = 50000;
shopItems.A4S2.stock = "∞";

shopItems.A4S3 = {}
shopItems.A4S3.item = 'I17';
shopItems.A4S3.price = 19000;
shopItems.A4S3.price = materialPrice;
shopItems.A4S3.stock = 200;
shopItems.A4S3.restock = 200;
/*
shopItems.A4S4 = {}
shopItems.A4S4.item = 'I0';
shopItems.A4S4.price = 120000;
shopItems.A4S4.stock = "3";

shopItems.A4S5 = {}
shopItems.A4S5.item = 'I0';
shopItems.A4S5.price = 19000;
shopItems.A4S5.stock = "1";
*/
shopItems.A4S6 = {}
shopItems.A4S6.item = 'I202';
shopItems.A4S6.price = 5200000;
shopItems.A4S6.stock = "1";

shopItems.A4S7 = {}
shopItems.A4S7.item = 'I63';
shopItems.A4S7.price = 3200000;
shopItems.A4S7.stock = "∞";

shopItems.A4S8 = {}
shopItems.A4S8.item = 'RCN11';
shopItems.A4S8.price = 450000;
shopItems.A4S8.stock = "1";
/*
shopItems.A4S9 = {}
shopItems.A4S9.item = 'I0';
shopItems.A4S9.price = 19000;
shopItems.A4S9.stock = "1";
*/
shopItems.A4S10 = {}
shopItems.A4S10.item = 'I203';
shopItems.A4S10.price = 21000;
shopItems.A4S10.stock = "∞";

shopItems.A4S11 = {}
shopItems.A4S11.item = 'I204';
shopItems.A4S11.price = 750000;
shopItems.A4S11.stock = "1";

shopItems.A4S12 = {}
shopItems.A4S12.item = 'I29';
shopItems.A4S12.price = materialPrice;
shopItems.A4S12.stock = 200;
shopItems.A4S12.restock = 200;

shopItems.A4S13 = {}
shopItems.A4S13.item = 'I16';
shopItems.A4S13.price = materialPrice;
shopItems.A4S13.stock = 200;
shopItems.A4S13.restock = 200;


Object.keys(shopItems).forEach(function(key) {
  shopItems[key].id = key;
});
//#endregion
//----------------------==========================-----------------------
//----------------------===========LOGS===========-----------------------
//----------------------==========================-----------------------
//#region Logs


var logs = {}

//book1
logs.L1P1 = {}
logs.L1P1.name = "Cultivated Mind";
logs.L1P1.description = "Collect 10 Books";
logs.L1P1.hint = '"What do I like more than materialistic things? Knowledge."';
logs.L1P1.insight = 5;
logs.L1P1.logic = 'stats.logsGot>9';
logs.L1P1.tag = '📕';

logs.L1P2 = {}
logs.L1P2.name = "Big Brain";
logs.L1P2.description = "Collect 25 Books";
logs.L1P2.hint = '"Oh yeah it is time."';
logs.L1P2.insight = 5;
logs.L1P2.logic = 'stats.logsGot>24';
logs.L1P2.tag = '📕';

logs.L1P3 = {}
logs.L1P3.name = "Knowledge Garden";
logs.L1P3.description = "Collect 50 Books";
logs.L1P3.hint = '"Have you been studying a lot?"';
logs.L1P3.insight = 5;
logs.L1P3.logic = 'stats.logsGot>49';
logs.L1P3.tag = '📕';

logs.L1P3A = {}
logs.L1P3A.name = "Final Eden";
logs.L1P3A.description = "Collect 80 Books";
logs.L1P3A.hint = '"And this will be my last one."';
logs.L1P3A.insight = 5;
logs.L1P3A.logic = 'stats.logsGot>79';
logs.L1P3A.tag = '📕';

logs.L1P4 = {}
logs.L1P4.name = "Nice.";
logs.L1P4.description = "Deal exactly 69 damage";
logs.L1P4.hint = '"Nice."';
logs.L1P4.insight = 5;
logs.L1P4.logic = '';
logs.L1P4.tag = '♋';

logs.L1P4A = {}
logs.L1P4A.name = "Small Fortune";
logs.L1P4A.description = "Obtain 10K Total Turtle Coins";
logs.L1P4A.hint = '"Not decided yet on what to spend it on."';
logs.L1P4A.insight = 5;
logs.L1P4A.logic = 'stats.totalCoins>10000';
logs.L1P4A.tag = '💰';

logs.L1P4B = {}
logs.L1P4B.name = "Here Comes The Money";
logs.L1P4B.description = "Obtain 100K Total Turtle Coins";
logs.L1P4B.hint = '"Money talk."';
logs.L1P4B.insight = 5;
logs.L1P4B.logic = 'stats.totalCoins>100000';
logs.L1P4B.tag = '💰';

logs.L1P4C = {}
logs.L1P4C.name = "Bury Me With...";
logs.L1P4C.description = "Obtain 1M Total Turtle Coins";
logs.L1P4C.hint = '"...........my mone."';
logs.L1P4C.insight = 5;
logs.L1P4C.logic = 'stats.totalCoins>1000000';
logs.L1P4C.tag = '💰';

logs.L1P4D = {}
logs.L1P4D.name = "Tax Fraud";
logs.L1P4D.description = "Obtain 10M Total Turtle Coins";
logs.L1P4D.hint = '"Turtles can\'t possibly go to jail."';
logs.L1P4D.insight = 5;
logs.L1P4D.logic = 'stats.totalCoins>10000000';
logs.L1P4D.tag = '💰';

logs.L1P4E = {}
logs.L1P4E.name = "Tortullionaire";
logs.L1P4E.description = "Obtain 100M Total Turtle Coins";
logs.L1P4E.hint = '"Look it up, its a real word."';
logs.L1P4E.insight = 5;
logs.L1P4E.logic = 'stats.totalCoins>100000000';
logs.L1P4E.tag = '💰';

logs.L1P5 = {}
logs.L1P5.name = "Beginner Adventurer";
logs.L1P5.description = "Complete 5 Quests";
logs.L1P5.hint = '"I\'m Ready! I\'m Ready! I\'m Ready! I\'m Ready!"';
logs.L1P5.insight = 5;
logs.L1P5.logic = 'stats.questsCompleted>4';
logs.L1P5.tag = '📜';

logs.L1P6 = {}
logs.L1P6.name = "Advanced Adventurer";
logs.L1P6.description = "Complete 10 Quests";
logs.L1P6.hint = '"I really was ready."';
logs.L1P6.insight = 5;
logs.L1P6.logic = 'stats.questsCompleted>9';
logs.L1P6.tag = '📜';

logs.L1P7 = {}
logs.L1P7.name = "Master Adventurer";
logs.L1P7.description = "Complete 25 Quests";
logs.L1P7.hint = '"Peraphs too ready."';
logs.L1P7.insight = 5;
logs.L1P7.logic = 'stats.questsCompleted>24';
logs.L1P7.tag = '📜';

logs.L1P8 = {}
logs.L1P8.name = "Arachnophobia";
logs.L1P8.description = "Defeat the boss of Cradle Hills";
logs.L1P8.hint = '"Turtles and spiders were never meant to be friends."';
logs.L1P8.insight = 5;
logs.L1P8.logic = 'enemies.E4.killCount>0';
logs.L1P8.tag = '🕷️';

logs.L1P9 = {}
logs.L1P9.name = "Fight Poison With Poison";
logs.L1P9.description = "Poison Hoopperoona";
logs.L1P9.hint = '"Feels good man."';
logs.L1P9.insight = 5;
logs.L1P9.logic = "stats.currentEnemy==='E4' && (buffs.B2.time>0 || buffs.B54.time>0 )";
logs.L1P9.tag = '🕷️';

logs.L1P10 = {}
logs.L1P10.name = "Whatever Did We Do?";
logs.L1P10.description = "Check out the Discord";
logs.L1P10.hint = '"Everyone is invited c:"';
logs.L1P10.insight = 5;
logs.L1P10.logic = 'logTrackClickDiscord';
logs.L1P10.tag = '💬';

logs.L1P11 = {}
logs.L1P11.name = "Power Surge";
logs.L1P11.description = "Reach level 10";
logs.L1P11.hint = '"First of many."';
logs.L1P11.insight = 5;
logs.L1P11.logic = 'rpgClass[stats.currentClass].level>9';
logs.L1P11.tag = '⚜️';

logs.L1P12 = {}
logs.L1P12.name = "Path of the Hero";
logs.L1P12.description = "Reach level 20";
logs.L1P12.hint = '"And they don\'t stop coming..."';
logs.L1P12.insight = 5;
logs.L1P12.logic = 'rpgClass[stats.currentClass].level>19';
logs.L1P12.tag = '⚜️';

logs.L1P13 = {}
logs.L1P13.name = "Potential Overflow";
logs.L1P13.description = "Reach level 30";
logs.L1P13.hint = '"And this... Is to go further beyond."';
logs.L1P13.insight = 5;
logs.L1P13.logic = 'rpgClass[stats.currentClass].level>29';
logs.L1P13.tag = '⚜️';

logs.L1P13A = {}
logs.L1P13A.name = "New Heights";
logs.L1P13A.description = "Reach level 40";
logs.L1P13A.hint = '"Much wiser through the years."';
logs.L1P13A.insight = 5;
logs.L1P13A.logic = 'rpgClass[stats.currentClass].level>39';
logs.L1P13A.tag = '⚜️';

logs.L1P14 = {}
logs.L1P14.name = "You Shall be Known as...";
logs.L1P14.description = "Change the name of your turtle";
logs.L1P14.hint = '"Let your voice be heard."';
logs.L1P14.insight = 5;
logs.L1P14.logic = "logTrackName!=='base'";
logs.L1P14.tag = '✒️';

logs.L1P15 = {}
logs.L1P15.name = "Back in Black";
logs.L1P15.description = "Change the name of your turtle back to Jeffrey";
logs.L1P15.hint = '"It\'s like he never left..."';
logs.L1P15.insight = 5;
logs.L1P15.logic = "logTrackName==='jeffrey' || logTrackName==='Jeffrey'";
logs.L1P15.tag = '✒️';

logs.L1P16 = {}
logs.L1P16.name = "So I Just Need To Let It Run?";
logs.L1P16.description = "Play for 10 hours";
logs.L1P16.hint = '"Gameplay."';
logs.L1P16.insight = 5;
logs.L1P16.logic = 'stats.activeSeconds>36000';
logs.L1P16.tag = '⌛';

logs.L1P17 = {}
logs.L1P17.name = "Turtle Rabbithole";
logs.L1P17.description = "Play for 50 hours";
logs.L1P17.hint = '"Where will it take me?"';
logs.L1P17.insight = 10;
logs.L1P17.logic = 'stats.activeSeconds>180000';
logs.L1P17.tag = '⌛';

logs.L1P18 = {}
logs.L1P18.name = "I Can Stop Whenever I want";
logs.L1P18.description = "Play for 100 hours";
logs.L1P18.hint = '"I just don\'t want to."';
logs.L1P18.insight = 15;
logs.L1P18.logic = 'stats.activeSeconds>360000';
logs.L1P18.tag = '⌛';

logs.L1P18A = {}
logs.L1P18A.name = "Or Maybe Not?";
logs.L1P18A.description = "Play for 200 hours";
logs.L1P18A.hint = '"But the new update..."';
logs.L1P18A.insight = 15;
logs.L1P18A.logic = 'stats.activeSeconds>720000';
logs.L1P18A.tag = '⌛';

logs.L1P19 = {}
logs.L1P19.name = "Pat Pat Pat Pat Pat";
logs.L1P19.description = "Click the turtle 10000 times";
logs.L1P19.hint = "'pat pat pat pat pat pat pat pat pat'";
logs.L1P19.insight = 10;
logs.L1P19.logic = 'stats.clickCount>9999';
logs.L1P19.tag = '✋';

logs.L1P20 = {}
logs.L1P20.name = "Quack.";
logs.L1P20.description = "Click the hidden duck";
logs.L1P20.hint = '"That\'s not the animal you want to click."';
logs.L1P20.insight = 5;
logs.L1P20.logic = 'logTrackClickDuck';
logs.L1P20.tag = '🦆';

logs.L1P21 = {}
logs.L1P21.name = "Decked Out";
logs.L1P21.description = "Equip a full Set of armor";
logs.L1P21.hint = '"... all five pieces of the puzzle!"';
logs.L1P21.insight = 5;
logs.L1P21.logic = 'logTrackTier';
logs.L1P21.tag = '🛡️';

logs.L1P22 = {}
logs.L1P22.name = "Once in a Blue Moon";
logs.L1P22.description = "Obseve a Blue Moon";
logs.L1P22.hint = '"Literally speaking, that is."';
logs.L1P22.insight = 5;
logs.L1P22.logic = 'stats.currentWeather==="bluemoon"';
logs.L1P22.tag = '🌙';

logs.L1P22A = {}
logs.L1P22A.name = "Strong Guts";
logs.L1P22A.description = "Survive With 1% HP Left in a Boss Fight";
logs.L1P22A.hint = '"Threading inbetween life and death."';
logs.L1P22A.insight = 5;
logs.L1P22A.logic = '';
logs.L1P22A.tag = '⚔️';

logs.P22B = {}
logs.P22B.name = "Meat Beater";
logs.P22B.description = "Touch slimy meat a bunch of times";
logs.P22B.hint = '"Squish Splosh Splooch."';
logs.P22B.insight = 5;
logs.P22B.logic = 'meatBeat>20';
logs.P22B.tag = 'upper';
logs.P22B.tag = '🥩';

logs.P23 = {}
logs.P23.name = "Pay 2 Win";
logs.P23.description = "Buy this book out of a store";
logs.P23.hint = '"It just doesn\'t feel morally right, right?"';
logs.P23.insight = 5;
logs.P23.tag = 'upper';
logs.P23.tag = '🛒';

logs.P24 = {}
logs.P24.name = "Nothing Like The Present";
logs.P24.description = "Receive a present from your turtle";
logs.P24.hint = '"Repaying just a bit of all your kindness."';
logs.P24.insight = 5;
logs.P24.logic = 'stats.recievedPresents>0';
logs.P24.tag = 'upper';
logs.P24.tag = '🎁';

logs.P25 = {}
logs.P25.name = "Grateful Representation";
logs.P25.description = "Receive 15 presents from your turtle";
logs.P25.hint = '"It seems she took a liking to you."';
logs.P25.insight = 15;
logs.P25.logic = 'stats.recievedPresents>15';
logs.P25.tag = 'upper';
logs.P25.tag = '🎁';

logs.P26 = {}
logs.P26.name = "Unpresented Betrayal";
logs.P26.description = "Sell a present from your turtle";
logs.P26.hint = '"Totally uncool, dude."';
logs.P26.insight = 5;
logs.P26.logic = '';
logs.P26.tag = 'upper';
logs.P26.tag = '🎁';

logs.P27 = {}
logs.P27.name = "Apprentice Workman";
logs.P27.description = "Reach Level 10 In Any Job";
logs.P27.hint = '"Break a leg."';
logs.P27.insight = 5;
logs.P27.logic = 'jobs.blacksmith.level>9 || jobs.cooking.level>9 || jobs.alchemy.level>9 || jobs.engineering.level>9';
logs.P27.tag = 'upper';
logs.P27.tag = '⚜️';

logs.P28 = {}
logs.P28.name = "Master Of My Craftship";
logs.P28.description = "Reach Level 20 In Any Job";
logs.P28.hint = '"That\'s a very disciplined tortuga."';
logs.P28.insight = 10;
logs.P28.logic = 'jobs.blacksmith.level>19 || jobs.cooking.level>19 || jobs.alchemy.level>19 || jobs.engineering.level>19';
logs.P28.tag = 'upper';
logs.P28.tag = '⚜️';

logs.P29 = {}
logs.P29.name = "Vive la Révolution";
logs.P29.description = "Craft 1000 Items";
logs.P29.hint = '"Really putting the \'Craft\' in TurtleCraft."';
logs.P29.insight = 10;
logs.P29.logic = 'stats.craftedItems>999';
logs.P29.tag = 'upper';
logs.P29.tag = '⚒️';

logs.P29A = {}
logs.P29A.name = "Turtle Labor";
logs.P29A.description = "Craft 10000 Items";
logs.P29A.hint = '"Way faster than any children."';
logs.P29A.insight = 15;
logs.P29A.logic = 'stats.craftedItems>9999';
logs.P29A.tag = '⚒️';

logs.P30 = {}
logs.P30.name = "This One Officer";
logs.P30.description = "Click this book";
logs.P30.hint = '"Caught red handed."';
logs.P30.insight = 5;
logs.P30.logic = '';
logs.P30.tag = '🧶';

logs.P31 = {}
logs.P31.name = "Who Left All These Here?";
logs.P31.description = "Open 10 Mysterious Presents";
logs.P31.hint = '"Thank you, kind stranger."';
logs.P31.insight = 10;
logs.P31.logic = 'stats.mysteryPresentsOpened>9';
logs.P31.tag = '🎁';

logs.P31A = {}
logs.P31A.name = "Christmas Is Cancelled";
logs.P31A.description = "Destroy 100 Mysterious Presents";
logs.P31A.hint = '"If I can\'t get them, no one will."';
logs.P31A.insight = 5;
logs.P31A.logic = 'enemies.E15.killCount>99';
logs.P31A.tag = '🎁';

logs.P32 = {}
logs.P32.name = "Lucky Streak";
logs.P32.description = "Win a Rare Prize on a Mysterious Present";
logs.P32.hint = '"Gacha? Gacha? Gacha!"';
logs.P32.insight = 10;
logs.P32.logic = '';
logs.P32.tag = '🎁';

logs.P33 = {}
logs.P33.name = "Mysterious Benefactor";
logs.P33.description = "Open 100 Mysterious Presents";
logs.P33.hint = '"I don\'t care who it was, they are now mine."';
logs.P33.insight = 15;
logs.P33.logic = 'stats.mysteryPresentsOpened>99';
logs.P33.tag = '🎁';

logs.P34 = {}
logs.P34.name = "Ill Take Your Entire Stock";
logs.P34.description = "Buy 100 items";
logs.P34.hint = '"Do you have the client card?"';
logs.P34.insight = 5;
logs.P34.logic = 'stats.boughtItems>99';
logs.P34.tag = '🛒';

logs.P34A = {}
logs.P34A.name = "Oniomaniac Therapy";
logs.P34A.description = "Buy 1000 items";
logs.P34A.hint = '"I got enough points for the pot set."';
logs.P34A.insight = 10;
logs.P34A.logic = 'stats.boughtItems>999';
logs.P34A.tag = '🛒';

logs.P35 = {}
logs.P35.name = "One Punch Turtle";
logs.P35.description = "Deal 1K Damage in one hit";
logs.P35.hint = '"That\'s a lotta damage."';
logs.P35.insight = 5;
logs.P35.logic = '';
logs.P35.tag = '⚔️';

logs.P35A = {}
logs.P35A.name = "Ultrakill";
logs.P35A.description = "Deal 100K Damage in one hit";
logs.P35A.hint = '"You make even the DEVIL CRY!"';
logs.P35A.insight = 10;
logs.P35A.logic = '';
logs.P35A.tag = '⚔️';

logs.P35B = {}
logs.P35B.name = "One way trip";
logs.P35B.description = "Deal 1M Damage in one hit";
logs.P35B.hint = '"To the shadow realm."';
logs.P35B.insight = 10;
logs.P35B.logic = '';
logs.P35B.tag = '⚔️';

logs.P35BA = {}
logs.P35BA.name = "Assisted Atomisation";
logs.P35BA.description = "Deal 20M Damage in one hit";
logs.P35BA.hint = '"Smokin\' Sexy Style!"';
logs.P35BA.insight = 10;
logs.P35BA.logic = '';
logs.P35BA.tag = '⚔️';

logs.P36 = {}
logs.P36.name = "Joker";
logs.P36.description = "Click on a Jester Turtle";
logs.P36.hint = '"I saw you peeking."';
logs.P36.insight = 5;
logs.P36.logic = 'stats.jesterTurtleClicks>0';
logs.P36.tag = '🃏';

logs.P37 = {}
logs.P37.name = "The Entire Circus";
logs.P37.description = "Click on 100 Jester Turtles";
logs.P37.hint = '"You got all us laughing."';
logs.P37.insight = 15;
logs.P37.logic = 'stats.jesterTurtleClicks>99';
logs.P37.tag = '🃏';

logs.P38 = {}
logs.P38.name = "Take a Break";
logs.P38.description = "Defeat the boss of the Lost Dojo";
logs.P38.hint = '"You must defeat tortuga to stand a chance."';
logs.P38.insight = 5;
logs.P38.logic = 'enemies.E8.killCount>0';
logs.P38.tag = '🐯';

logs.P39 = {}
logs.P39.name = "Big Dreams";
logs.P39.description = "Smack King-Kat with a giant fish";
logs.P39.hint = '"Give the cat what he wants."';
logs.P39.insight = 5;
logs.P39.logic = '';
logs.P39.tag = '🐟';

logs.P40 = {}
logs.P40.name = "Heroes Never Die!";
logs.P40.description = "Perish 10 times";
logs.P40.hint = '"We still need you."';
logs.P40.insight = 5;
logs.P40.logic = 'stats.timesDied>9';
logs.P40.tag = '⚰️';

logs.P41 = {}
logs.P41.name = "Pawn Star";
logs.P41.description = "Sell 10K items.";
logs.P41.hint = '"Best I can do is 200 Coins."';
logs.P41.insight = 5;
logs.P41.logic = 'stats.soldItems>9999';
logs.P41.tag = '📈';

logs.P41A = {}
logs.P41A.name = "Gang Star";
logs.P41A.description = "Sell 100K items.";
logs.P41A.hint = '"Step 3: Profit."';
logs.P41A.insight = 10;
logs.P41A.logic = 'stats.soldItems>99999';
logs.P41A.tag = '📈';

logs.P42 = {}
logs.P42.name = "Critical Thinking";
logs.P42.description = "Deal 100 Critical Hits";
logs.P42.hint = '"Glad we sorted this out one with words alone."';
logs.P42.insight = 5;
logs.P42.logic = 'stats.criticalHitsDealt>99';
logs.P42.tag = '⚔️';

logs.P43 = {}
logs.P43.name = "Luck Issue";
logs.P43.description = "Obtain a Golden Clover";
logs.P43.hint = '"It\'s shrimple."';
logs.P43.insight = 10;
logs.P43.logic = 'items.I102.count>0';
logs.P43.tag = '🍀';

logs.P44 = {}
logs.P44.name = "It All Returns to Nothing";
logs.P44.description = "Witness a World-Ending Event";
logs.P44.hint = '"It all comes tumbling down, tumbling down, tumbling down..."';
logs.P44.insight = 5;
logs.P44.logic = 'stats.currentWeather==="vortex"';
logs.P44.tag = '🌀';

logs.P45 = {}
logs.P45.name = "Officework";
logs.P45.description = "Use 100 Stampers";
logs.P45.hint = '"This is not the adventure I signed for."';
logs.P45.insight = 5;
logs.P45.logic = 'stats.stampsUsed>99';
logs.P45.tag = '🗳️';

logs.P45A = {}
logs.P45A.name = "Turtle Champion";
logs.P45A.description = "Obtain a Gold Medal in the Monster Arena";
logs.P45A.hint = '"The turtle remains undefeated."';
logs.P45A.insight = 10;
logs.P45A.logic = 'goldenMedalsGot>0';
logs.P45A.tag = '🥇';

logs.P45C = {}
logs.P45C.name = "World Record Any%";
logs.P45C.description = "Obtain a Last Time of 0 Seconds in a Showdown";
logs.P45C.hint = '"(Unbeatable)"';
logs.P45C.insight = 10;
logs.P45C.logic = 'showdown.S1.bestTime===0 || showdown.S2.bestTime===0';
logs.P45C.tag = '🥇';

logs.P45B = {}
logs.P45B.name = "Awww Man";
logs.P45B.description = "Die from a Cubomite Explosion";
logs.P45B.hint = '"Should had brought a cat."';
logs.P45B.insight = 5;
logs.P45B.logic = 'rpgPlayer.alive===false && stats.currentEnemy === "E10"';
logs.P45B.tag = '🧨';

logs.P45D = {}
logs.P45D.name = "Sweet Revenge";
logs.P45D.description = "Ignite 100 Cubomites";
logs.P45D.hint = '"I love the smell of gunpowder in the morning."';
logs.P45D.insight = 5;
logs.P45D.logic = 'stats.ignitedCubomites>99';
logs.P45D.tag = '🧨';

logs.P46 = {}
logs.P46.name = "Break a Drake";
logs.P46.description = "Defeat the boss of the Granite Grotto";
logs.P46.hint = '"Shattering your expectations."';
logs.P46.insight = 5;
logs.P46.logic = 'enemies.E12.killCount>0';
logs.P46.tag = '🐲';

logs.P47 = {} 
logs.P47.name = "Encased Forever";
logs.P47.description = "Collect 10 Collectibles";
logs.P47.hint = '"Go show it to an owl or something."';
logs.P47.insight = 5;
logs.P47.logic = 'collectiblesGot>9';
logs.P47.tag = '💎';

logs.P47A = {} 
logs.P47A.name = "A fine collection";
logs.P47A.description = "Collect 50 Collectibles";
logs.P47A.hint = '"Gunther would like to have a word with you."';
logs.P47A.insight = 10;
logs.P47A.logic = 'collectiblesGot>49';
logs.P47A.tag = '💎';

logs.P47B = {} 
logs.P47B.name = "Monster Foster";
logs.P47B.description = "Complete Some Entries of the Bestiary";
logs.P47B.hint = '"I feel so... Informed."';
logs.P47B.insight = 5;
logs.P47B.logic = '(unlocks.bestiary && bestiaryPointEntry + bestiaryPointBronze + bestiaryPointGold)>20';
logs.P47B.tag = '📒';

logs.P47C = {} 
logs.P47C.name = "Monster Obsession";
logs.P47C.description = "Complete a Bunch of Entries of the Bestiary";
logs.P47C.hint = '"Gotta study them all."';
logs.P47C.insight = 5;
logs.P47C.logic = '(unlocks.bestiary && bestiaryPointEntry + bestiaryPointBronze + bestiaryPointGold)>40';
logs.P47C.tag = '📒';

logs.P47D = {} 
logs.P47D.name = "Monster Degree";
logs.P47D.description = "Complete a Lot of Entries of the Bestiary";
logs.P47D.hint = '"I could tell you a thing or two."';
logs.P47D.insight = 10;
logs.P47D.logic = '(unlocks.bestiary && bestiaryPointEntry + bestiaryPointBronze + bestiaryPointGold)>70';
logs.P47D.tag = '📒';

logs.P48 = {}
logs.P48.name = "Stop Right There";
logs.P48.description = "Steal 100 Items";
logs.P48.hint = '"You criminal scum."';
logs.P48.insight = 5;
logs.P48.logic = 'stats.timesStolen>99';
logs.P48.tag = '🎭';

logs.P49 = {}
logs.P49.name = "Phantom Thief";
logs.P49.description = "Steal 1000 Items.";
logs.P49.hint = '"The tortuga always had my heart anyways"';
logs.P49.insight = 15;
logs.P49.logic = 'stats.timesStolen>999';
logs.P49.tag = '🎭';

logs.P50 = {}
logs.P50.name = "Red Herring";
logs.P50.description = "Amass 1000 Fishing Junk";
logs.P50.hint = '"It wasnt such a special catch after all..."';
logs.P50.insight = 10;
logs.P50.logic = '(items.I158.count + items.I89.count + items.I88.count )>999';
logs.P50.tag = '🎣';

logs.P51 = {}
logs.P51.name = "Big Game";
logs.P51.description = "Fish a Rare Catch";
logs.P51.hint = '"This one is going to the wall."';
logs.P51.insight = 5;
logs.P51.logic = 'items.I169.count>0 || items.I117.count>0';
logs.P51.tag = '🎣';

logs.P52 = {}
logs.P52.name = "Blast Fishing";
logs.P52.description = "Throw a Dynamite to a Pond";
logs.P52.hint = '"It was worth a try."';
logs.P52.insight = 5;
logs.P52.logic = '';
logs.P52.tag = '🧨';

logs.P52A = {}
logs.P52A.name = "Et tu, Bunnytus?";
logs.P52A.description = "Throw an Incendiary Bunny into a Jabbit";
logs.P52A.hint = '"I\'m you but stronger."';
logs.P52A.insight = 5;
logs.P52A.logic = '';
logs.P52A.tag = '🐇';

logs.P53 = {}
logs.P53.name = "Turtle Spelunky";
logs.P53.description = "Clear a Dungeon";
logs.P53.hint = '"And without angering the shopkeeper."';
logs.P53.insight = 10;
logs.P53.logic = 'stats.dungeonsCleared>0';
logs.P53.tag = '⛺';

logs.P53A = {}
logs.P53A.name = "Tuxedo Friends";
logs.P53A.description = "Pat the Penguin Helper";
logs.P53A.hint = '"Thank you for your service."';
logs.P53A.insight = 5;
logs.P53A.logic = '';
logs.P53A.tag = '🐧';

logs.P54 = {}
logs.P54.name = "Containment Breach";
logs.P54.description = "Encounter La Creatura"
logs.P54.hint = '"It escaped."';
logs.P54.insight = 5;
logs.P54.logic = '';
logs.P54.tag = '❓';

logs.P55 = {}
logs.P55.name = "God of Hell Fire";
logs.P55.description = "Defeat the Boss of the Hallow Forest";
logs.P55.hint = '"Ill take you to burn."';
logs.P55.insight = 10;
logs.P55.logic = 'enemies.E27.killCount>0';
logs.P55.tag = '🔥';

logs.P56 = {}
logs.P56.name = "Extinguished";
logs.P56.description = "Fight Infernalus While Raining";
logs.P56.hint = '"Bad day to be made out of fire."';
logs.P56.insight = 5;
logs.P56.logic = 'stats.currentEnemy === "E27" && stats.currentWeather === "rain"';
logs.P56.tag = '🌧️';

logs.P56A = {}
logs.P56A.name = "Fast Learner";
logs.P56A.description = "Learn 10 Recipes";
logs.P56A.hint = '"Let him cook."';
logs.P56A.insight = 5;
logs.P56A.logic = 'stats.recipesLearnt>10';
logs.P56A.tag = '📄';

logs.P57 = {}
logs.P57.name = "Jack Of All Trades";
logs.P57.description = "Unlock 3 Classes at the Same Time";
logs.P57.hint = '"Your pityful average protagonist can only get one of these."';
logs.P57.insight = 10;
logs.P57.logic = 'talent.TI0.active === true && talent.TG0.active === true && talent.TA0.active === true';
logs.P57.tag = '⚜️';

logs.P58 = {}
logs.P58.name = "The Architect";
logs.P58.description = "Research 3 Buildings";
logs.P58.hint = '"It\'s work o clock."';
logs.P58.insight = 10;
logs.P58.logic = 'stats.researchedBuildings>2';
logs.P58.tag = '🧱';

logs.P59 = {}
logs.P59.name = "Super Turtle Grinder";
logs.P59.description = "Level Up a Building to Level 10";
logs.P59.hint = '"At least it farms itself."';
logs.P59.insight = 15;
logs.P59.logic = 'buildings.B1.level>9 || buildings.B2.level>9 || buildings.B3.level>9 || buildings.B7.level>9';
logs.P59.tag = '🧱';

logs.P58A = {}
logs.P58A.name = "Salt Splash";
logs.P58A.description = "Exorcise 15 Morgatos";
logs.P58A.hint = '"Who are you going to call?"';
logs.P58A.insight = 5;
logs.P58A.logic = 'stats.purifiedMorgatosDefeated>14';
logs.P58A.tag = '👻';

logs.P60 = {}
logs.P60.name = "Gambling Addiction";
logs.P60.description = "Win a Coin Flip 5 Times in a Row";
logs.P60.hint = '"This coin will take me out poverty."';
logs.P60.insight = 5;
logs.P60.logic = 'coinWins>4';
logs.P60.tag = '🎲';

logs.P61 = {}
logs.P61.name = "Honest Mistake";
logs.P61.description = "Throw Purifying Salt on a Caulislug";
logs.P61.hint = '"I just wanted to salt the salad..."';
logs.P61.insight = 5;
logs.P61.logic = '';
logs.P61.tag = '🧂';

logs.P61A = {}
logs.P61A.name = "???";
logs.P61A.description = "Search the secret";
logs.P61A.hint = '"It\'s a secret to everybody."';
logs.P61A.insight = 5;
logs.P61A.logic = '';
logs.P61A.tag = '❔';






Object.keys(logs).forEach(function(i) { logs[i].unlocked = false; logs[i].once = false; });

var totalLogs = 0;

for (var i in logs) { if (logs[i]) { totalLogs++; } }

//#endregion
//----------------------==========================-----------------------
//----------------------==========CLASSES=========-----------------------
//----------------------==========================-----------------------
//#region Classes
stats.currentClass = "noClass"

var rpgClass = {};

rpgClass.noClass = {};
rpgClass.noClass.name = "No Class"
rpgClass.noClass.currentExp = 0;
rpgClass.noClass.nextExp = 1000;
rpgClass.noClass.level = 1;
rpgClass.noClass.color = "gray";
rpgClass.noClass.maxLevel = 30;

rpgClass.TA0 = {};
rpgClass.TA0.name = "Apprentice"
rpgClass.TA0.currentExp = 0;
rpgClass.TA0.nextExp = 1000;
rpgClass.TA0.level = 1;
rpgClass.TA0.color = "#77C7EE"
rpgClass.TA0.maxLevel = 40;

rpgClass.TG0 = {};
rpgClass.TG0.name = "Gambler"
rpgClass.TG0.currentExp = 0;
rpgClass.TG0.nextExp = 1000;
rpgClass.TG0.level = 1;
rpgClass.TG0.color = "#68FEBE"
rpgClass.TG0.maxLevel = 40;

rpgClass.TI0 = {};
rpgClass.TI0.name = "Instrumentalist"
rpgClass.TI0.currentExp = 0;
rpgClass.TI0.nextExp = 1000;
rpgClass.TI0.level = 1;
rpgClass.TI0.color = "#FC4AB9"
rpgClass.TI0.maxLevel = 40;
//#endregion

//----------------------==========================-----------------------
//----------------------============MAIL==========-----------------------
//----------------------==========================-----------------------
//#region Mail
var mail = {};

mail.M1 = {};
mail.M1.title = 'Thank you for enrolling in the Super Turtle Adventure program!'
mail.M1.body = 'We are appreciative of your participation in our program. Turtles all across the world will be happy to rely on your help and in exchange we will reward you handsomely for your bravery!<br><br>Make every effort to assist your fellow turtles whenever you go.<br><br>We sincerely hope you continue with our program and have a wonderful journey! Here is your welcome badge:'
mail.M1.item = 'I13'
mail.M1.effect = "items.I13.count++"

mail.M2 = {};
mail.M2.title = 'Hi, my dear hatchling, hows over there, dear?'
mail.M2.body = 'I\'m hoping you can still recall your dear mother. Ive heard youve made the decision to pursue adventure. While I\'m cheering you on from afar, just like any mother would, I\'m still worried about my cub.<br><br>We will pray for your safety, every single one of us. I\'m sure that you are assisting others and that you are not ignoring their requests. You better not.<br><br>Anyhow, these are some cookies I baked for you. Love you, Tortumom.'
mail.M2.item = 'I14'
mail.M2.effect = "items.I14.count++"

mail.M3 = {};
mail.M3.title = 'Adventure guild notice.'
mail.M3.body = 'The Adventure Guild is pleased with your accomplishments and has chosen to give you this gift, which will undoubtedly help you on your adventures.<br><br>We will be very vigilant about your future accomplishments.'
mail.M3.item = 'I79'
mail.M3.effect = "items.I79.count++"

mail.M5 = {};
mail.M5.title = 'Your journey awaits!'
mail.M5.body = 'This is a Super Turtle Adventure Program official statement.<br><br>We are glad to learn that you have been fulfilling requests from individuals in need.<br><br>We have determined that you\'re prepared to set out on an exciting adventure by yourself and make your own decisions moving forward<br><br>We acknowledge that you will face numerous obstacles, but we believe you can overcome every obstacle if you remain true to your principles.'
mail.M5.effect = "unlocks.areas = true; unlocksReveal()"

mail.M6 = {};
mail.M6.title = 'Adventure guild request.'
mail.M6.body = 'This is a Super Turtle Adventure Program official request. Reports have surfaced of an undiscovered island in the middle of the ocean.<br><br>We are convinced you are prepared to venture into perilous dungeons after noticing your accomplishments, and we would like to summon you personally to said destination.<br><br>You won\'t be able to access other menus while exploring dungeons, so be cautious of their increased difficulty.<br><br>We hope that your journey is successful.'
mail.M6.item = 'I174'
mail.M6.effect = "items.I174.count++; unlocks.dungeons=true; unlocksReveal()"

mail.M7 = {};
mail.M7.title = 'Tortumom writting here.'
mail.M7.body = 'Have you recently covered up to protect yourself from the cold?<br><br>Now that Christmas is over, the family and myself thoroughly enjoyed some gambas.<br><br>Despite choking on one, the Tortuyaya recovered.<br><br>I kept some of the leftover cookies from dinner for you.<br><br>Love you, Tortumom.'
mail.M7.item = 'I14'
mail.M7.effect = "items.I14.count++";

mail.M8 = {};
mail.M8.title = 'Honk honk honk.'
mail.M8.body = 'honk honk honk honk honk<br><br>honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk<br><br>honk honk honk honk honk honk honk honk honk<br><br><br><br><br><br>honk.'
mail.M8.item = 'I109'
mail.M8.effect = "items.I109.count++";

mail.M4 = {};
mail.M4.title = 'The stars are calling...'
mail.M4.body = 'Salutations, shining star, Robertus Shellington is my name. As I pondered my magic orb, I observed your voyage, and I was more than thrilled to see the extent of your willingness to assist others.<br><br>Without a doubt, you are unique. I noticed the desire and spark in your eyes, which far surpasses that of a typical turtle. <br><br>I chose to write you this letter to let you know that you can now learn skills if you click the level panel. Don\'t ask me what any of those words mean, for I am merely informing you what my orb told me.'
mail.M4.item = 'I26'
mail.M4.effect = "items.I26.count++; unlocks.magic=true; unlocks.skills=true; unlocksReveal()"

mail.M9 = {};
mail.M9.title = 'Adventure rank up.'
mail.M9.body = 'The Adventure Guild is indebted with you for all the people you helped through your journey, and has decided to promote your status as an adventurer.<br><br>We will be very vigilant about your future accomplishments.'
mail.M9.item = 'I172'
mail.M9.effect = "items.I172.count++"

for (var i in mail) { mail[i].recieved = false; mail[i].read = false }

//#endregion
//----------------------==========================-----------------------
//----------------------============Talents=======-----------------------
//----------------------==========================-----------------------
//#region Talents

const skillDmg1 = 30
const skillDmg2 = 70
const skillDmg3 = 150
const skillDmg4 = 300
const skillDmg5 = 500
const skillDmg6 = 800
const skillDmg7 = 1200
const skillDmg8 = 3000



var talent = {};

talent.T0 = {};
talent.T0.position = '0px 0px'
talent.T0.hue = "0deg"
talent.T0.name = "Awakening";
talent.T0.category = "Passive";
talent.T0.description = '<span class="logStat">Enables the hidden inner power that resides within your shell.<br><br>Unlocks classes and skills using SP (Skill Points). You can unlock as many classes as you want and swap them at will. Assign them from the Skills panel at the side of your gear.<br><br>Skills unlocked in one class will carry to others, allowing your turtle to become increasingly more powerful the more classes you level.<br><br>You can get Talent Points to unlock new talents by leveling classes.</span>'

talent.noClass = {};
talent.noClass.position = '9999px 9999px'
talent.noClass.name = "No Class";
talent.noClass.category = "Class";
talent.noClass.description = 'Nothing to fight with, except life-affirming flesh.<br><br><span class="logStat">[Innate Skill: None]</span>';

talent.TA0 = {};
talent.TA0.position = '0px -60px'
talent.TA0.parent = "T0"
talent.TA0.name = "Apprentice";
talent.TA0.category = "Class";
talent.TA0.description = 'Bunnies out of your hat, conjuring doves... What do you mean that\'s just street magic? It\'s still magic after all, isnt it?<br><br><span class="logStat">[Innate Skill: Incendiary Bunny]</span><br><br><FONT COLOR="gray">Consumes 6 SP<br>20s Cooldown<FONT COLOR="white"><br><br>Casts a flaming rabbit out of your hat, <span style="color:orange"> dealing '+beautify(skillDmg5*100)+'% of your Strength as Elemental Damage and '+beautify(skillDmg3*100)+'% of your Strength as Elemental Damage over 15 seconds</span>';

talent.TA0B = {};
talent.TA0B.position = '50px -100px'
talent.TA0B.parent = "TA0"
talent.TA0B.name = "Reverse Disappearance";
talent.TA0B.category = "Passive";
talent.TA0B.description = "Mystery Presents contain +2 additional presents</span>";
talent.TA0B.effect = 'talent.TA0B.statUp = 2'

talent.TA0BASE = {};
talent.TA0BASE.position = '9999px 9999px'
talent.TA0BASE.name = "Incendiary Bunny";
talent.TA0BASE.category = "Skill";
talent.TA0BASE.description = "Casts a flaming rabbit out of your hat, <span style='color:orange'> dealing "+beautify(skillDmg5*100)+"% of your Strength as Elemental Damage and "+beautify(skillDmg3*100)+"% of your Strength as Elemental Damage over 15 seconds</span>"; 
talent.TA0BASE.cast = "castIncendiaryBunny()";
talent.TA0BASE.cost = 6;
talent.TA0BASE.cd = 20;

talent.TA0C = {};
talent.TA0C.position = '-50px -90px'
talent.TA0C.parent = "TA0"
talent.TA0C.name = "Abracatortle";
talent.TA0C.category = "Passive";
talent.TA0C.description = "Increases max SP by +25"
talent.TA0C.effect = 'talent.TA0C.statUp = 25'

talent.TA1 = {};
talent.TA1.position = '10px -130px'
talent.TA1.parent = "TA0"
talent.TA1.name = "Polymorph";
talent.TA1.category = "Skill";
talent.TA1.description = "Polymorphs the enemy away, transforming them into an inoffensive ram, <span style='color:orange'> impeding their movent for 10 seconds </span>"; 
talent.TA1.cast = "castPolymorph()";
talent.TA1.cost = 10;
talent.TA1.cd = 50;

talent.TA1B = {};
talent.TA1B.position = '70px -160px'
talent.TA1B.parent = "TA1"
talent.TA1B.name = "Sleight of Hand";
talent.TA1B.category = "Passive";
talent.TA1B.description = "Increases Turtle Coin reward from clicking by 15% of your Max SP <FONT COLOR='gray'>(Max 60%)";
talent.TA1B.logic = 'Math.min(playerMaxMana * 0.0015, 0.6)';

talent.TA1C = {};
talent.TA1C.position = '-50px -130px'
talent.TA1C.parent = "TA1"
talent.TA1C.name = "Critical Thinking";
talent.TA1C.category = "Passive";
talent.TA1C.description = "Increases Critical Chance by 8% of your Max SP <FONT COLOR='gray'>(Max 20%)"
talent.TA1C.logic = 'Math.min(playerMaxMana * 0.0008, 0.2)'; 

talent.TA1D = {};
talent.TA1D.position = '40px -230px'
talent.TA1D.parent = "TA1B"
talent.TA1D.name = "Wizhard Shell";
talent.TA1D.category = "Skill";
talent.TA1D.description = "Creates a magic barrier, <span style='color:orange'> absorbing damage worth "+beautify(skillDmg8*100)+"% of your Strength</span>"; 
talent.TA1D.cast = "castWizhardShield()";
talent.TA1D.cost = 10;
talent.TA1D.cd = 30;

talent.TA1E = {};
talent.TA1E.position = '-60px -180px'
talent.TA1E.parent = "TA1C"
talent.TA1E.name = "Levitation";
talent.TA1E.category = "Passive";
talent.TA1E.description = "Increases Drop Chance by 12% of your Max SP <FONT COLOR='gray'> (Max 40%)";
talent.TA1E.logic = 'Math.min(playerMaxMana * 0.0012, 0.4)';

talent.TA1F = {};
talent.TA1F.position = '-100px -150px'
talent.TA1F.parent = "TA1C"
talent.TA1F.name = "Dove Flock";
talent.TA1F.category = "Skill";
talent.TA1F.description = "Sends 4 doves, <span style='color:orange'> dealing "+beautify(skillDmg2*100)+"% of your Strength as "+natureIcon+"Nature Damage 4 times</span>"; 
talent.TA1F.cast = "castDoveFlock()";
talent.TA1F.cost = 3;
talent.TA1F.cd = 5;

talent.TA1G = {};
talent.TA1G.position = '-40px -240px'
talent.TA1G.parent = "TA1E"
talent.TA1G.name = "Prestidigitation";
talent.TA1G.category = "Passive";
talent.TA1G.description = "Increases Max SP by 7% of your Strength <FONT COLOR='gray'> (Max 60%)";
talent.TA1G.logic = 'Math.min(playerStrength * 0.0007, 0.6)';

talent.TA1H = {};
talent.TA1H.position = '-100px -220px'
talent.TA1H.parent = "TA1E"
talent.TA1H.name = "Cleanse";
talent.TA1H.category = "Skill";
talent.TA1H.description = "Purifies the body, <span style='color:orange'> removing one negative debuff from yourself, and dealing "+beautify(skillDmg7*100)+"% of your Strength as "+deificIcon+"Deific Damage.</span> Only deals damage if the purification succeeds"; 
talent.TA1H.cast = "castCleanse()";
talent.TA1H.cost = 10;
talent.TA1H.cd = 5;

talent.TA2 = {};
talent.TA2.position = '-5px -190px'
talent.TA2.parent = "TA1"
talent.TA2.name = "Brilliant Constitution";
talent.TA2.category = "Passive";
talent.TA2.description = "Increases Max HP by 10% of your Max SP <FONT COLOR='gray'>(Max 30%)"
talent.TA2.logic = 'Math.min(playerMaxMana * 0.0010, 0.3)';

talent.TA3 = {};
talent.TA3.position = '0px -260px'
talent.TA3.parent = "TA2"
talent.TA3.name = "Pure Illusion";
talent.TA3.category = "Passive";
talent.TA3.description = "Increases "+elementalIcon+"Elemental Damage by 15% of your Max SP <FONT COLOR='gray'>(Max 50%)"
talent.TA3.logic = 'Math.min(playerMaxMana * 0.0015, 0.5)';

talent.TG0 = {};
talent.TG0.position = '60px 60px'
talent.TG0.parent = "T0"
talent.TG0.name = "Gambler";
talent.TG0.category = "Class";
talent.TG0.description = 'Have you ever considered using your crippling addiction as a weapon? Myriad of cards and dice shall trump over your foes.<br><br><span class="logStat">[Innate Skill: Card Fan]</span><br><br><FONT COLOR="gray">Consumes 1 SP<br>1s Cooldown<FONT COLOR="white"><br><br>Throws 3 sharp cards, <span style="color:orange"> dealing '+beautify(skillDmg1*100)+'% of your Strength as '+mightIcon+'Might Damage 3 times</span>';

talent.TG0B = {};
talent.TG0B.position = '50px 120px'
talent.TG0B.parent = "TG0"
talent.TG0B.name = "Bargain Chip";
talent.TG0B.category = "Passive";
talent.TG0B.description = "Mystery Presents are 15% more common</span>";
talent.TG0B.effect = 'talent.TG0B.statUp = -0.15'

talent.TG1 = {};
talent.TG1.position = '120px 50px'
talent.TG1.parent = "TG0"
talent.TG1.name = "Pilfer";
talent.TG1.category = "Passive";
talent.TG1.description = "Increases Turtle Coin reward from clicking by 10% of your Drop Chance <FONT COLOR='gray'>(Max 90%)"
talent.TG1.logic = 'Math.min(multiplicativeDropChance*100 * 0.0010, 0.9)';

talent.TG0BASE = {};
talent.TG0BASE.position = '9999px 9999px'
talent.TG0BASE.name = "Card Fan";
talent.TG0BASE.category = "Skill";
talent.TG0BASE.description = "Throws 3 sharp cards, <span style='color:orange'> dealing x% of your Strength as "+mightIcon+"Might Damage 3 times</span>"; 
talent.TG0BASE.cast = "castCardFan();";
talent.TG0BASE.cost = 1;
talent.TG0BASE.cd = 1;

talent.TG1B = {};
talent.TG1B.position = '80px 10px'
talent.TG1B.parent = "TG1"
talent.TG1B.name = "Thief";
talent.TG1B.category = "Skill";
talent.TG1B.description = "Attempts to steal an item from the enemy, <span style='color:orange'> some enemies might have special items to steal</span>"; 
talent.TG1B.cast = "castThief()"
talent.TG1B.cost = 'beautify(playerMaxMana*0.1)';
talent.TG1B.cd = 0;

talent.TG1C = {};
talent.TG1C.position = '110px 110px'
talent.TG1C.parent = "TG1"
talent.TG1C.name = "Roll the Dice!";
talent.TG1C.category = "Skill";
talent.TG1C.description = "Rolls magical dice with 3 possible outcomes; <span style='color:orange'> Increase Haste, Critical Chance or Strength for 20 seconds</span>"; 
talent.TG1C.cast = "castRollTheDice()";
talent.TG1C.cost = 10;
talent.TG1C.cd = 30;

talent.TG1D = {};
talent.TG1D.position = '90px 160px'
talent.TG1D.parent = "TG1C"
talent.TG1D.name = "High Roller";
talent.TG1D.category = "Passive";
talent.TG1D.description = "Mystery Presents contain +2 additional presents</span>";
talent.TG1D.effect = 'talent.TG1D.statUp = 2';

talent.TG1E = {};
talent.TG1E.position = '140px 200px'
talent.TG1E.parent = "TG1D"
talent.TG1E.name = "Golden Die Cup";
talent.TG1E.category = "Passive";
talent.TG1E.description = "Increases Max SP by 1% for every book you collected <FONT COLOR='gray'>(Max 200%)"
talent.TG1E.logic = 'Math.min(stats.logsGot * 0.01, 2)';

talent.TG2 = {};
talent.TG2.position = '160px 90px'
talent.TG2.parent = "TG1"
talent.TG2.name = "Summon Jackpot";
talent.TG2.category = "Skill";
talent.TG2.description = "Pulls the lever on a magic jackpot, with 3 possible outcomes; <span style='color:orange'> Hurls a fireball dealing "+beautify(skillDmg7*100)+"% of your Strength as "+elementalIcon+"Elemental Damage, Heals 10% of your Max HP, or have a chance of backfiring</span>"; 
talent.TG2.cast = "castSummonJackpot()"
talent.TG2.cost = 3;
talent.TG2.cd = 10;

talent.TG2B = {};
talent.TG2B.position = '200px 140px'
talent.TG2B.parent = "TG2"
talent.TG2B.name = "Reverse Card";
talent.TG2B.category = "Skill";
talent.TG2B.description = "Pulls a fast one at the enemy, <span style='color:orange'> reflecting 50% of all damage received converted into "+occultIcon+"Occult Damage</span> for 20 seconds"; 
talent.TG2B.cast = "castReverseCard()"
talent.TG2B.cost = 10;
talent.TG2B.cd = 30;

talent.TG2C = {};
talent.TG2C.position = '200px 190px'
talent.TG2C.parent = "TG2B"
talent.TG2C.name = "Card Counting";
talent.TG2C.category = "Passive";
talent.TG2C.description = "Increases "+mightIcon+"Might Damage by 15% of your Max SP <FONT COLOR='gray'> (Max 50%)"
talent.TG2C.logic = 'Math.min(playerMaxMana * 0.0015, 0.5)';

talent.TG2D = {};
talent.TG2D.position = '250px 140px'
talent.TG2D.parent = "TG2B"
talent.TG2D.name = "Shellter";
talent.TG2D.category = "Skill";
talent.TG2D.description = "Hides back into the shell,<span style='color:orange'> evading 33% of all incoming attacks for 30 seconds</span>"; 
talent.TG2D.cast = "castShellter()";
talent.TG2D.cost = 10;
talent.TG2D.cd = 40;

talent.TG2E = {};
talent.TG2E.position = '220px 90px'
talent.TG2E.parent = "TG2B"
talent.TG2E.name = "Sly Thief";
talent.TG2E.category = "Passive";
talent.TG2E.description = "Increases Drop Chance by 1% for each one of your collectibles got"
talent.TG2E.logic = 'collectiblesGot * 0.01';

talent.TG3 = {};
talent.TG3.position = '140px 150px'
talent.TG3.parent = "TG2"
talent.TG3.name = "Nat D20";
talent.TG3.category = "Passive";
talent.TG3.description = "Increases Drop Chance by 6% of your Strength <FONT COLOR='gray'>(Max 30%)"
talent.TG3.logic = 'Math.min(playerStrength * 0.0006, 0.3)';

talent.TI0 = {};
talent.TI0.position = '-60px 60px'
talent.TI0.parent = "T0"
talent.TI0.name = "Instrumentalist";
talent.TI0.category = "Class";
talent.TI0.description = 'Charm your enemies and play requiems for their demise.<br><br><span class="logStat">[Innate Skill: Riff Tempo]<br><br><FONT COLOR="gray">Consumes 3 SP<br>20s Cooldown<FONT COLOR="white"><br><br><br>Plays a rhythm-guided riff, <span style="color:orange"> dealing '+beautify(skillDmg3*100)+'% of your Strength as '+natureIcon+'Nature Damage 10 times</span>';

talent.TI0B = {};
talent.TI0B.position = '-50px 110px'
talent.TI0B.parent = "TI0"
talent.TI0B.name = "Caregiver Sonata";
talent.TI0B.description = "Mystery Presents contain +2 additional presents</span>";
talent.TI0B.effect = 'talent.TI0B.statUp = 2';

talent.TI0BASE = {};
talent.TI0BASE.position = '9999px 9999px'
talent.TI0BASE.name = "Riff Tempo";
talent.TI0BASE.category = "Skill";
talent.TI0BASE.description = "Plays a rhythm-guided riff, <span style='color:orange'> dealing "+beautify(skillDmg2*100)+"% of your Strength as "+natureIcon+"Nature Damage 10 times</span>"; 
talent.TI0BASE.cast = "castRiffTempo()"
talent.TI0BASE.cost = 3;
talent.TI0BASE.cd = 20;

talent.TI0C = {};
talent.TI0C.position = '-20px 170px'
talent.TI0C.parent = "TI0B"
talent.TI0C.name = "Metronome";
talent.TI0C.category = "Skill";
talent.TI0C.description = "Go with the flow of the tempo, <span style='color:orange'> casting a random skill</span>";
talent.TI0C.cast = "castMetronome()" 
talent.TI0C.cost = 5;
talent.TI0C.cd = 15;

talent.TI0D = {};
talent.TI0D.position = '-80px 160px'
talent.TI0D.parent = "TI0B"
talent.TI0D.name = "Symphony of the Night";
talent.TI0D.category = "Passive";
talent.TI0D.description = "Increases EXP rate by 10% of your Max SP <FONT COLOR='gray'>(Max 20%)"
talent.TI0D.logic = 'Math.min(playerMaxMana * 0.0010, 0.2)';

talent.TI0E = {};
talent.TI0E.position = '-80px 210px'
talent.TI0E.parent = "TI0D"
talent.TI0E.name = "Jubilant Clarinet";
talent.TI0E.category = "Passive";
talent.TI0E.description = "Increases Crit Chance by 0.4% for every book you collected <FONT COLOR='gray'>(Max 40%)";
talent.TI0E.logic = 'Math.min(stats.logsGot * 0.004, 0.4)';

talent.TI1 = {};
talent.TI1.position = '-120px 70px'
talent.TI1.parent = "TI0"
talent.TI1.name = "Conjure Violin";
talent.TI1.category = "Skill";
talent.TI1.description = "Summons a magic violin to fight alongside you, <span style='color:orange'> dealing "+beautify(skillDmg3*100)+"% of your Strength as "+natureIcon+"Nature Damage every time you attack</span>"; 
talent.TI1.cast = 'castConjureViolin()';
talent.TI1.cost = 15;
talent.TI1.cd = 35;

talent.TI1B = {};
talent.TI1B.position = '-110px 120px'
talent.TI1B.parent = "TI1"
talent.TI1B.name = "Drums of Liberation";
talent.TI1B.category = "Passive";
talent.TI1B.description = "Increases "+natureIcon+"Nature Damage by 15% for every single buff you have active";
talent.TI1B.logic = 'activeBuffs * 0.15'; 

talent.TI1C = {};
talent.TI1C.position = '-180px 50px'
talent.TI1C.parent = "TI1"
talent.TI1C.name = "Mighty Resonance";
talent.TI1C.category = "Passive";
talent.TI1C.description = "Increases Strength by 0.0001% of your Max HP <FONT COLOR='gray'>(Max 20%)"
talent.TI1C.logic = 'Math.min(playerMaxHp * 0.00000001, 0.2)';

talent.TI2 = {};
talent.TI2.position = '-170px 100px'
talent.TI2.parent = "TI1"
talent.TI2.name = "Harpsichaos";
talent.TI2.category = "Skill";
talent.TI2.description = "Plays a sinister piece, <span style='color:orange'> increasing "+occultIcon+"Occult Damage by 60% for 20 seconds</span>"; 
talent.TI2.cast = "castHarpsichaos()";
talent.TI2.cost = 10;
talent.TI2.cd = 30;

talent.TI2B = {};
talent.TI2B.position = '-210px 140px'
talent.TI2B.parent = "TI2"
talent.TI2B.name = "Perish Song";
talent.TI2B.category = "Skill";
talent.TI2B.description = "Plays a requiem of death, inflicting a debuff lasting 20 seconds that deals<span style='color:orange'> "+beautify(skillDmg7*100)+"% of your Strength as "+occultIcon+"Occult Damage once it expires</span>"; 
talent.TI2B.cast = "castPerishSong()";
talent.TI2B.cost = 10;
talent.TI2B.cd = 30;

talent.TI2C = {};
talent.TI2C.position = '-230px 90px'
talent.TI2C.parent = "TI2B"
talent.TI2C.name = "The Fork";
talent.TI2C.category = "Passive";
talent.TI2C.description = "Increases EXP gain by 1% for each one of your collectibles got"
talent.TI2C.logic = 'collectiblesGot * 0.01';

talent.TI3 = {};
talent.TI3.position = '-140px 170px'
talent.TI3.parent = "TI2"
talent.TI3.name = "Harmony with Nature";
talent.TI3.category = "Passive";
talent.TI3.description = "Increases "+natureIcon+"Nature Damage by 15% of your Max SP <FONT COLOR='gray'>(Max 50%)"
talent.TI3.logic = 'Math.min(playerMaxMana * 0.0015, 0.5)';

talent.TI3B = {};
talent.TI3B.position = '-190px 190px'
talent.TI3B.parent = "TI3"
talent.TI3B.name = "Song of Healing";
talent.TI3B.category = "Skill";
talent.TI3B.description = "Plays a requiem of life, <span style='color:orange'> healing "+beautify(skillDmg4*100)+"% of your Strength every second for 20 seconds</span>"; 
talent.TI3B.cast = "castSongOfHealing()";
talent.TI3B.cost = 10;
talent.TI3B.cd = 30;

for (var i in talent) {
  talent[i].active = false;
  talent[i].statUp = 0;
  if (i.startsWith("TA")) talent[i].hue = "200deg"
  if (i.startsWith("TG")) talent[i].hue = "100deg"
  if (i.startsWith("TI")) talent[i].hue = "300deg"
  if ("cast" in talent[i]) talent[i].currentCd = 0
}

talent.T0.active = true;
talent.noClass.active = true;


//#endregion
//----------------------==========================-----------------------
//----------------------===========BUILDINGS======-----------------------
//----------------------==========================-----------------------
//#region Buildings
var buildings = {};

buildings.B1 = {};
buildings.B1.name = 'Lumberjack Post';
buildings.B1.description = 'Increases Max HP by 5% per level<br><br>';
buildings.B1.price = 300;
buildings.B1.item1 = 'I194';
buildings.B1.item1Amount = 5;
buildings.B1.level = 0;
buildings.B1.maxLevel = 10;
buildings.B1.img = "R10";

buildings.B2 = {};
buildings.B2.name = 'Sawmill Plant';
buildings.B2.description = 'Increases Regeneration 5% per level<br><br>';
buildings.B2.price = 300;
buildings.B2.item1 = 'I195';
buildings.B2.item1Amount = 5;
buildings.B2.level = 0;
buildings.B2.maxLevel = 10;
buildings.B2.img = "C10";

buildings.B3 = {};
buildings.B3.name = 'Metal Workshop';
buildings.B3.description = 'Increases Strength by 6% per level<br><br>';
buildings.B3.price = 300;
buildings.B3.item1 = 'I196';
buildings.B3.item1Amount = 5;
buildings.B3.level = 0;
buildings.B3.maxLevel = 10;
buildings.B3.img = "C30";
/*
buildings.B4 = {};
buildings.B4.name = 'Monster Hatchery';
buildings.B4.description = 'Increases Turtle Coin reward from clicking by 4% per level<br>';
buildings.B4.price = 300;
buildings.B4.item1 = 'I197';
buildings.B4.item1Amount = 5;
buildings.B4.level = 0;
buildings.B4.maxLevel = 10;
buildings.B4.img = "S40";

buildings.B5 = {};
buildings.B5.name = 'Tome Enchanter WIP';
buildings.B5.description = 'Increases Max SP by 0.1% per level<br><br>';
buildings.B5.price = 300;
buildings.B5.item1 = 'I37';
buildings.B5.item1Amount = 20;
buildings.B5.item2 = "I100";
buildings.B5.item2Amount = 600;
buildings.B5.level = 0;
buildings.B5.maxLevel = 25;
buildings.B5.img = "M10";

buildings.B6 = {};
buildings.B6.name = 'Mineshaft Quarry';
buildings.B6.description = 'Increases Drop Chance by 5% per level<br><br>';
buildings.B6.price = 300;
buildings.B6.item1 = 'I0';
buildings.B6.item1Amount = 5;
buildings.B6.level = 0;
buildings.B6.maxLevel = 10;
buildings.B6.img = "R20";
*/
buildings.B7 = {};
buildings.B7.name = 'Penguin Aviary';
buildings.B7.description = 'Increases Offline Power by 10% per level<br><br>';
buildings.B7.price = 300;
buildings.B7.item1 = 'I197A';
buildings.B7.item1Amount = 5;
buildings.B7.level = 0;
buildings.B7.maxLevel = 10;
buildings.B7.img = "P1";
/*
buildings.B8 = {};
buildings.B8.name = 'Farmland Unit WIP';
buildings.B8.description = '<br>Increases EXP gain by 0.1% per level<br>';
buildings.B8.price = 300;
buildings.B8.item1 = 'I34';
buildings.B8.item1Amount = 20;
buildings.B8.item2 = "I58";
buildings.B8.item2Amount = 600;
buildings.B8.level = 0;
buildings.B8.maxLevel = 25;
buildings.B8.img = "S30";
*/


for (var i in buildings) { buildings[i].unlocked = false; buildings[i].statUp = 0;}


//#endregion
//----------------------==========================-----------------------
//----------------------===========RESEARCH=======-----------------------
//----------------------==========================-----------------------
//#region Buildings
cd = {};

var research = {};

research.R1 = {};
research.R1.name = 'Lumberjack Post';
research.R1.price = 600000;
research.R1.timer = 18000;
research.R1.effect = 'buildings.B1.unlocked=true';
research.R1.img = 'R10';

research.R2 = {};
research.R2.name = 'Sawmill Plant';
research.R2.price = 600000;
research.R2.timer = 18000;
research.R2.effect = 'buildings.B2.unlocked=true';
research.R2.img = 'C10';

research.R3 = {};
research.R3.name = 'Metal Workshop';
research.R3.price = 600000;
research.R3.timer = 18000;
research.R3.effect = 'buildings.B3.unlocked=true';
research.R3.img = 'C30';
/*
research.R4 = {};
research.R4.name = 'Monster Hatchery';
research.R4.price = 300;
research.R4.timer = 10;
research.R4.effect = 'buildings.B4.unlocked=true';
research.R4.img = 'S40';

research.R5 = {};
research.R5.name = 'Tome Enchanter';
research.R5.price = 300;
research.R5.timer = 10;
research.R5.effect = 'buildings.B5.unlocked=true';
research.R5.img = 'M10';

research.R6 = {};
research.R6.name = 'Mineshaft Quarry';
research.R6.price = 300;
research.R6.timer = 10;
research.R6.effect = 'buildings.B6.unlocked=true';
research.R6.img = 'R20';
*/
research.R7 = {};
research.R7.name = 'Penguin Aviary';
research.R7.price = 1000000;
research.R7.timer = 28800;
research.R7.effect = 'buildings.B7.unlocked=true';
research.R7.img = 'P1';
/*
research.R8 = {};
research.R8.name = 'Farmland Unit';
research.R8.price = 300;
research.R8.timer = 10;
research.R8.effect = 'buildings.B8.unlocked=true';
research.R8.img = 'S30';
*/

for (var i in research) {
  research[i].status = "waiting";
  research[i].unlocked = false;
}

research.R1.unlocked = true;
research.R2.unlocked = true;
research.R3.unlocked = true;

//#endregion
//----------------------==========================-----------------------
//----------------------===========ARENA==========-----------------------
//----------------------==========================-----------------------
//#region Buildings

var showdown = {};

showdown.S1 = {};
showdown.S1.enemy = 'E29';
showdown.S1.timer = 10;
showdown.S1.bestTime = 'Undefeated';
showdown.S1.difficulty = 2;

showdown.S2 = {};
showdown.S2.enemy = 'E28';
showdown.S2.timer = 10;
showdown.S2.bestTime = 'Undefeated';
showdown.S2.difficulty = 3;

var skirmish = {};

skirmish.S1 = {};
skirmish.S1.name = 'Trial of the Mountain';
skirmish.S1.timer = 10;
skirmish.S1.bestScore = 'Undefeated';
skirmish.S1.difficulty = 4;
skirmish.S1.wave1 = 'R1';
skirmish.S1.wave2 = 'R2';
skirmish.S1.wave3 = 'R3';
skirmish.S1.wave4 = 'R4';
skirmish.S1.wave5 = 'R5';
skirmish.S1.wave6 = 'R6';
skirmish.S1.wave7 = 'R7';

var shopHonor = {}

//shop 1
shopHonor.SH1 = {}
shopHonor.SH1.item = 'I222';
shopHonor.SH1.price = 35000;
shopHonor.SH1.stock = 1;
shopHonor.SH1.parent = 'honorShopListing1';

shopHonor.SH2 = {}
shopHonor.SH2.item = 'RAN4A';
shopHonor.SH2.price = 165000;
shopHonor.SH2.stock = 1;
shopHonor.SH2.parent = 'honorShopListing1';

shopHonor.SH3 = {}
shopHonor.SH3.item = 'I42';
shopHonor.SH3.price = 5000;
shopHonor.SH3.stock = 10;
shopHonor.SH3.parent = 'honorShopListing1';

shopHonor.SH4 = {}
shopHonor.SH4.item = 'I200';
shopHonor.SH4.price = 12000;
shopHonor.SH4.stock = 3;
shopHonor.SH4.parent = 'honorShopListing1';

shopHonor.SH5 = {}
shopHonor.SH5.item = 'I219';
shopHonor.SH5.price = 55000;
shopHonor.SH5.stock = 1;
shopHonor.SH5.parent = 'honorShopListing1';

shopHonor.SH5 = {}
shopHonor.SH5.item = 'I218';
shopHonor.SH5.price = 230000;
shopHonor.SH5.stock = 1;
shopHonor.SH5.parent = 'honorShopListing1';

//shop 2

shopHonor.SH6 = {}
shopHonor.SH6.item = 'I82';
shopHonor.SH6.price = 800000;
shopHonor.SH6.stock = "∞";
shopHonor.SH6.parent = 'honorShopListing2';

shopHonor.SH7 = {}
shopHonor.SH7.item = 'I210';
shopHonor.SH7.price = 10000;
shopHonor.SH7.stock = 1;
shopHonor.SH7.parent = 'honorShopListing2';

shopHonor.SH8 = {}
shopHonor.SH8.item = 'I217';
shopHonor.SH8.price = 1000000;
shopHonor.SH8.stock = 1;
shopHonor.SH8.parent = 'honorShopListing2';

shopHonor.SH9 = {}
shopHonor.SH9.item = 'I93';
shopHonor.SH9.price = 15000;
shopHonor.SH9.stock = 10;
shopHonor.SH9.parent = 'honorShopListing2';

shopHonor.SH10 = {}
shopHonor.SH10.item = 'I213';
shopHonor.SH10.price = 2000000;
shopHonor.SH10.stock = 1;
shopHonor.SH10.parent = 'honorShopListing2';

shopHonor.SH11 = {}
shopHonor.SH11.item = 'I282';
shopHonor.SH11.price = 1200000;
shopHonor.SH11.stock = 1;
shopHonor.SH11.parent = 'honorShopListing2';

//shop 2

shopHonor.SH12 = {}
shopHonor.SH12.item = 'I14';
shopHonor.SH12.price = 1;
shopHonor.SH12.stock = 1;
shopHonor.SH12.parent = 'honorShopListing3';

shopHonor.SH13 = {}
shopHonor.SH13.item = 'I289';
shopHonor.SH13.price = 1;
shopHonor.SH13.stock = 1;
shopHonor.SH13.parent = 'honorShopListing3';




//for (var i in research) { research[i].status = "waiting"; research[i].unlocked = true;}

//#endregion

let armoryheirloomTotal = 0;
let armorymillionaireTotal = 0;
let armoryforgottenTotal = 0;
let armorymasterworkTotal = 0;
let armorybeastfallenTotal = 0;
let armoryreveredTotal = 0;
let armorysolsticeTotal = 0;

let armoryheirloomGot = 0;
let armorymillionaireGot = 0;
let armoryforgottenGot = 0;
let armorymasterworkGot = 0;
let armorybeastfallenGot = 0;
let armoryreveredGot = 0;
let armorysolsticeGot = 0;

let totalArmoryGot = armoryheirloomGot+armorymillionaireGot+armoryforgottenGot+armorymasterworkGot+armorybeastfallenGot+armoryreveredGot+armorysolsticeGot
let totalArmory = armoryheirloomTotal+armorymillionaireTotal+armoryforgottenTotal+armorymasterworkTotal+armorybeastfallenTotal+armoryreveredTotal+armorysolsticeTotal



//#endregion

//----------------------==========================-----------------------
//----------------------==========Catalogue=======-----------------------
//----------------------==========================-----------------------
//#region Buildings

var upgrades = {};
upgrades.I113 = {}; //pat
upgrades.I124 = {}; //pat
upgrades.I128 = {}; //pat
upgrades.I202 = {}; //pat
upgrades.I86 = {}; //anvil
upgrades.I87 = {}; //anvil
upgrades.I157 = {}; //anvil
upgrades.I34 = {}; 
upgrades.I70 = {}; 
upgrades.I79 = {}; 
upgrades.I104 = {}; 
upgrades.I109 = {}; 
upgrades.I120 = {}; 
upgrades.I199 = {}; 
upgrades.I204 = {}; 
upgrades.I218 = {}; 
upgrades.I282 = {}; //hp


//#endregion
