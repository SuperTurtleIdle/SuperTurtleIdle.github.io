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
const repIcon = '<img src="img/src/icons/insight.png">';
const scalingIcon = '<img style="border-color: red" src="img/src/icons/scaling.jpg">';
const honorIcon = '<img src="img/src/icons/honor.jpg">';
const spIcon = '<img src="img/src/icons/spellpower.jpg">';
const strIcon = '<img src="img/src/icons/strength.jpg">';


const collectibleChance1 = 1000;
const collectibleChance2 = 7000;
const collectibleChance3 = 30000;

let plantCompletionProgress = 0
let plantCompletionProgressTotal = 0

let uncommonDrop = 5000 //15K (95%)
let rareDrop = 15000 //50k (96%)
let epicDrop = 45000 //150k (96%)
let mythicDrop = 450000 //500k (67%)

let relicDrop = 30000 //relics do not have pity
let relicDungeon = 60

let uncommonChest = 30 //chest do not have pity
let rareChest = 90
let epicChest = 270
let mythicChest = 2777

let uncommonDungeon = 30 //90 (95%)
let rareDungeon = 50 //150 (95%)
let epicDungeon = 90 //200 (89%)
let mythicDungeon = 170 //200 (69%) 

let commonThief = 3 //thief does not have pity
let uncommonThief = 10
let rareThief = 20
let epicThief = 60
let mythicThief = 70

function returnQualityColor(quality){

  if (quality === "Poor") return "gray"
  if (quality === "Common") return "white"
  if (quality === "Uncommon") return "#1eff00"
  if (quality === "Rare") return "#0070dd"
  if (quality === "Epic") return "#a335ee" 
  if (quality === "Mythic") return "#E44661"
  if (quality === "Legendary") return "#ff8000"

  if (quality === "Collectible") return "#e6cc80"
  if (quality === "Quest") return "yellow"
  if (quality === "Upgrade") return "#00FFCA"
  if (quality === "Soulbound") return "#B5DD7B"

  if (quality.startsWith("TA")) return rpgClass.TA0.color;
  if (quality.startsWith("TG")) return rpgClass.TG0.color;
  if (quality.startsWith("TI")) return rpgClass.TI0.color;

  if (quality === "Very Easy") return "#579DA6"
  if (quality === "Easy") return "#539D62"
  if (quality === "Medium") return "#A78E50"
  if (quality === "Hard") return "#AB525A"
  if (quality === "Very Hard") return "#A04674"
  if (quality === "Nightmare") return "#8B569F"
  if (quality === "Impossible") return "#38293E"

  if (quality === '0') return ""
  if (quality === '1') return " <span class='itemLevel'>I</span>"
  if (quality === '2') return " <span class='itemLevel' style='color: #abffbd'>II</span>"
  if (quality === '3') return " <span class='itemLevel' style='color: #9cd9ff'>III</span>"
  if (quality === '4') return " <span class='itemLevel' style='color: #EED490'>IV</span>"
  if (quality === '5') return " <span class='itemLevel' style='color: #3486F1'>V</span>"
  if (quality === '6') return " <span class='itemLevel' style='color: #5BDBBD'>VI</span>"
  if (quality === '7') return " <span class='itemLevel' style='color: #FF6536'>VII</span>"
  if (quality === '8') return " <span class='itemLevel' style='color: #FF21DE'>VIII</span>"
  if (quality === '9') return " <span class='itemLevel' style='color: #AC37FF'>IX</span>"
  if (quality === '10') return " <span class='itemLevel' style='color: #FF2121'>X</span>"
  if (quality === '11') return " <span class='itemLevel' style='color: #FF2121'>X</span>" //some annoying bugs like description of job item

  if (quality === "heirloom")  return '<div style=" text-align: center;background:#6D6D6D; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Heirloom Series</div>'
  if (quality === "masterwork")  return '<div style=" text-align: center;background:#957256; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Masterwork Series</div>'
  if (quality === "forgotten")  return '<div style=" text-align: center;background:#886386; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Forgotten Series</div>'
  if (quality === "millionaire")  return '<div style=" text-align: center;background:#9E8244; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Millionaire Series</div>'
  if (quality === "beastfallen")  return '<div style=" text-align: center;background:#8E4D60; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Beastfallen Series</div>'
  if (quality === "revered")  return '<div style=" text-align: center;background:#5A8C98; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Revered Series</div>'
  if (quality === "solstice")  return '<div style=" text-align: center;background:linear-gradient(90deg, rgba(240, 71, 5, 1) 0%, rgba(240, 169, 10, 1)  100%); padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Solstice Series</div>'
  
  if (quality === "ancient")  return '<div style=" text-align: center;background:linear-gradient(90deg, rgba(193,121,17,1) 0%, rgba(56,126,53,1) 100%); padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Ancient Series</div>'
  if (quality === "malevolent")  return '<div style=" text-align: center;background:linear-gradient(90deg, rgba(54,55,77,1) 0%, rgba(126,53,117,1) 100%); padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Malevolent Series</div>'
  if (quality === "chosen")  return '<div style=" text-align: center;background:linear-gradient(90deg, rgba(210,171,17,1) 0%, rgba(41,159,112,1) 100%); padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Chosen Series</div>'
  if (quality === "toybox")  return '<div style=" text-align: center;background:linear-gradient(90deg, rgba(255,151,19,1) 0%, rgba(187,154,48,1) 19%, rgba(41,159,112,1) 19%); padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Toybox Series</div>'
  if (quality === "runic")  return '<div style=" text-align: center;background:linear-gradient(90deg, rgba(77,54,128,1) 0%, rgba(187,48,159,1) 52%, rgba(77,54,128,1) 100%); padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Runic Series</div>'
  if (quality === "omega")  return '<div style=" text-align: center;background-image: url(img/sys/omegaBg.jpg); background-size:cover; outline:#215de0 solid 0.1rem; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">Omega Series</div>'



  if (quality === "difficulty1") return "#579DA6"

}


function returnGearPrice(i){

  let mod = 1

  if (items[i].quality === "Uncommon") return 30000 * mod
  if (items[i].quality === "Rare") return 100000 * mod
  if (items[i].quality === "Epic") return 400000 * mod
  if (items[i].quality === "Mythic") return 1000000 * mod
  if (items[i].quality === "Legendary") return 10000000 * mod

}

function itemIcon(id){
  return '<img style="border-color: '+returnQualityColor(items[id].quality)+' " src="img/src/items/'+items[id].img+'.jpg">'
}

function buffIcon(id){
  return '<img src="img/src/buffs/'+id+'.jpg">'
}

function rUpgLvl(id){
  let weaponTier = 1
  if (items[id].tier!==undefined) weaponTier = items[id].tier
  return '<FONT COLOR="gray">Level '+ items[id].level +' - Tier '+returnRoman(weaponTier)
}

function rUpgSkill(id,text,type,cap){

  if (items[id].level<cap && !items[id].revealed) return '<FONT COLOR="gray">⯁<img src="img/src/icons/lock.jpg">Upgrade this item to level '+cap+' to unlock this skill'

  let upgImg = '<img src="img/src/icons/xp.png">';
  if (type==="passive") upgImg = '<img src="img/src/icons/scaling2.jpg">';
  if (type==="active") upgImg = '<img src="img/src/icons/active.jpg">';

  if (items[id].level<cap && items[id].revealed) return '<FONT COLOR="gray">⯁'+upgImg+text+" ["+cap+"]"
  
  return '<FONT COLOR="#1EFF0C">⯁'+upgImg+text
}

/*
function rUpgDmg(id, mod){

  let weaponTier = 0
  if (items[id].tier!==undefined) weaponTier = items[id].tier-1

  if (items[id].quality==="Common") return (25 * Math.pow(1.15, items[id].level) * (1+weaponTier) * mod);
  if (items[id].quality==="Uncommon") return (25 * Math.pow(1.15, items[id].level) * (2+weaponTier) * mod);
  if (items[id].quality==="Rare") return (25 * Math.pow(1.15, items[id].level) * (3+weaponTier) * mod);
  if (items[id].quality==="Epic") return (25 * Math.pow(1.15, items[id].level) * (4+weaponTier) * mod);
  if (items[id].quality==="Mythic") return (25 * Math.pow(1.15, items[id].level) * (5+weaponTier) * mod);

}*/


function rUpgDmg(id, mod){

  let rarityPower = 1;
  if (items[id].quality==="Poor") rarityPower = 0;
  if (items[id].quality==="Uncommon") rarityPower = 2;
  if (items[id].quality==="Rare") rarityPower = 3;
  if (items[id].quality==="Epic") rarityPower = 4;
  if (items[id].quality==="Mythic") rarityPower = 5;


  let weaponTier = 1
  if (items[id].tier!==undefined) weaponTier = items[id].tier+1


  weaponPower = rarityPower + weaponTier - 2

  return (25 * Math.pow(1.15, items[id].level) * Math.pow(1.6,weaponPower) * mod);

}



function beautify(number) { 


  if (number >= 1000000000000000000) {
    let truncatedNumber = Math.floor(number / 10000000000000000) / 10; 
    if (truncatedNumber % 1 === 0) {
        return truncatedNumber.toExponential(1).replace('e+', '★').replace('e-', '★-');
    } else {
        return truncatedNumber.toExponential(1).replace('e+', '★').replace('e-', '★-');
    }
  }

  else if (number >= 1000000000000000) {
    let truncatedNumber = Math.floor(number / 100000000000000) / 10; 
    if (truncatedNumber % 1 === 0) {
        return truncatedNumber + "Q";
    } else {
        return truncatedNumber.toFixed(1) + "Q";
    }
  }

  else if (number >= 1000000000000) {
    let truncatedNumber = Math.floor(number / 100000000000) / 10; 
    if (truncatedNumber % 1 === 0) {
        return truncatedNumber + "T";
    } else {
        return truncatedNumber.toFixed(1) + "T";
    }
  }
  
  else if (number >= 1000000000) {
    let truncatedNumber = Math.floor(number / 100000000) / 10; 
    if (truncatedNumber % 1 === 0) {
        return truncatedNumber + "B";
    } else {
        return truncatedNumber.toFixed(1) + "B";
    }
  }

  else if (number >= 1000000) {
    let truncatedNumber = Math.floor(number / 100000) / 10; 
    if (truncatedNumber % 1 === 0) {
        return truncatedNumber + "M";
    } else {
        return truncatedNumber.toFixed(1) + "M";
    }
}
    
    else if (number >= 1000) {
      let truncatedNumber = Math.floor(number / 100) / 10;
      if (truncatedNumber % 1 === 0) {
          return truncatedNumber + "K";
      } else {
          return truncatedNumber.toFixed(1) + "K";
      }
  }
  
  else {
      return Math.floor(number).toString();
    }
  };

function rng(min, max) { //gives a random number between the two
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rngW(min, max, weight) {
  const random = Math.random();
  const skewed = Math.pow(random, weight);
  const result = Math.floor(min + (skewed * (max - min)));
  return result;
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
    L1feetSlot: 'none', 
    L1headSlot: 'none',
    L1legsSlot: 'none',
    L1handsSlot: 'none',
    L1chestSlot: 'none',
    L1ringSlot: 'none',
    L1weaponSlot: 'none',
    L1trinketSlot: 'none',
    L2feetSlot: 'none', 
    L2headSlot: 'none',
    L2legsSlot: 'none',
    L2handsSlot: 'none',
    L2chestSlot: 'none',
    L2ringSlot: 'none',
    L2weaponSlot: 'none',
    L2trinketSlot: 'none',
    L3feetSlot: 'none', 
    L3headSlot: 'none',
    L3legsSlot: 'none',
    L3handsSlot: 'none',
    L3chestSlot: 'none',
    L3ringSlot: 'none',
    L3weaponSlot: 'none',
    L3trinketSlot: 'none',
    L4feetSlot: 'none', 
    L4headSlot: 'none',
    L4legsSlot: 'none',
    L4handsSlot: 'none',
    L4chestSlot: 'none',
    L4ringSlot: 'none',
    L4weaponSlot: 'none',
    L4trinketSlot: 'none',
    L5feetSlot: 'none', 
    L5headSlot: 'none',
    L5legsSlot: 'none',
    L5handsSlot: 'none',
    L5chestSlot: 'none',
    L5ringSlot: 'none',
    L5weaponSlot: 'none',
    L5trinketSlot: 'none',
    L6feetSlot: 'none', 
    L6headSlot: 'none',
    L6legsSlot: 'none',
    L6handsSlot: 'none',
    L6chestSlot: 'none',
    L6ringSlot: 'none',
    L6weaponSlot: 'none',
    L6trinketSlot: 'none',
    L7feetSlot: 'none', 
    L7headSlot: 'none',
    L7legsSlot: 'none',
    L7handsSlot: 'none',
    L7chestSlot: 'none',
    L7ringSlot: 'none',
    L7weaponSlot: 'none',
    L7trinketSlot: 'none',
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
    gardenTokens:0,
    gardenExp:0,
    gardenLevel:1,

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
var trinketAdditiveMaxHp = 0;

var armorAdditiveMaxHp = 0;
var multiplicativeMaxHp = 1
var playerMaxHp = 0;

var multiplicativeStrength = 1;
var playerStrength = 0;
var playerSteal = 0;

var multiplicativeSpellpower = 1;
var playerSpellpower = 1;
let additiveSpellpower = 0;

var multiplicativeOmni = 1;
var playerOmni = 1;

var additiveHaste = 0;
var multiplicativeHaste = 0;
var playerHaste = 2000;
var weaponHaste = 0;

var playerHealingBonus = 1;

var additiveMiningDamage= 0;
var multiplicativeMiningDamage= 1;
var playerMiningDamage = 0;

var baseFishingLevel= 0;
var additiveFishingLevel= 0;
var playerFishingLevel = 0;

var playerMaxStack = 2147483647;

var multiplicativeDropChance = 1;
var multiplicativeEXPGain = 1;
var additiveEXPGain = 1;
var playerEXPGain = 1;

//stamps apply multiplicative bonuses
var natureStampStatUp = 1
var mightStampStatUp = 1
var elementalStampStatUp = 1
var occultStampStatUp = 1
var deificStampStatUp = 1

var natureDownStampStatUp = 0
var mightDownStampStatUp = 0
var elementalDownStampStatUp = 0
var occultDownStampStatUp = 0
var deificDownStampStatUp = 0

var strengthStampStatUp = 1
var omniStampStatUp = 1
var hasteStampStatUp = 0
var luckStampStatUp = 1

var multiplicativeCritChance = 1;
var playerCritChance = 0;

var tierMaxHp = 0;
var additiveMaxMana = 0;
var multiplicativeMaxMana = 1;
var playerMaxMana = 100;
var playerManaRegen = 0.2;

var playerClickRate = 100

var playerPresentsMinigame = 6
var playerPresentMinigameTimer = 1200
let activeDebuffs = 0

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

let expectedPlayerDamage = 0;

let playerWeaponDamage = 0;

let apprenticePoints = 0;
let gamblerPoints = 0;
let instrumentalistPoints = 0;

let flatWeaponDamage = 0

let natureDamageAdditive = 0;
let natureDamageMultiplicative = 0;
let natureDamageBonus = 0;

let elementalDamageAdditive = 0;
let elementalDamageMultiplicative = 0;
let elementalDamageBonus = 0;

let mightDamageAdditive = 0;
let mightDamageMultiplicative = 0;
let mightDamageBonus = 0;

let deificDamageAdditive = 0;
let deificDamageMultiplicative = 0;
let deificDamageBonus = 0;

let occultDamageAdditive = 0;
let occultDamageMultiplicative = 0;
let occultDamageBonus = 0;

let additiveStrength = 0;

let additiveOmni = 0;

let natureResist = 0;
let mightResist = 0;
let elementalResist = 0;
let occultResist = 0;
let deificResist = 0;

let playerMastery = 0;
let restrainedMastery = 0;


rpgPlayer.debugMastery = 0;

//#endregion

function statsUpdate(){

  apprenticePoints = 0;
  gamblerPoints = 0;
  instrumentalistPoints = 0;

  for (i in talent) {
    
    if ('logic' in talent[i] && talent[i].active) talent[i].statUp = eval(talent[i].logic); 
    if (i.startsWith("TA") && talent[i].active) apprenticePoints++
    if (i.startsWith("TG") && talent[i].active) gamblerPoints++
    if (i.startsWith("TI") && talent[i].active) instrumentalistPoints++

  } //keeps updated all the statups of all skills, pretty poggies if you ask me
  
  activeDebuffs = 0
  for (i in buffs) if (buffs[i].time>0 && buffs[i].player) {activeDebuffs++;}

  talent.TI3.statUp = 0;
  if (activeDebuffs>0 && talent.TI3.active) talent.TI3.statUp = 0.5; else talent.TI3.statUp = 0;
  


if (currentSet === "cloth") {clothTier = true} else {clothTier = false}
if (currentSet === "explorer") {exlorerTier = 200} else {exlorerTier = 0}

multiplicativeHealingItems = 1 + items.I282.statUp;

let bestiaryMasteryStats = 0
if (unlocks.bestiary) bestiaryMasteryStats = medalsGot*10

playerMastery = stats.questsCompleted*10 + collectiblesGot*5 + totalArmoryGot*10 + bestiaryMasteryStats + stats.logsGot*5 + plantCompletionProgress*6
if (rpgPlayer.debugMastery!=0) playerMastery = rpgPlayer.debugMastery
if (buffs.B115.time>0 && playerMastery>buffs.B115.stacks)  playerMastery = buffs.B115.stacks


restrainedMastery = 0;

if ("masteryCap" in areas[stats.currentArea] && enemies[areas[stats.currentArea].boss].killCount===0 && !settings.overpoweredToggle){

  restrainedMastery = areas[stats.currentArea].masteryCap

  if (playerMastery>areas[stats.currentArea].masteryCap){
    playerMastery = restrainedMastery
  }
  
}

if (settings.masteryToggle) playerMastery = 0;

multiplicativeSellValue = 1;


//multiplicativeDropChance = ( 1  + buffs.B11.statUp + sakuraDropUp + buffs.B24.statUp + taleSnt.TA1E.statUp + talent.TG3.statUp + buffs.B36.statUp + items.I184.statUp +
//buffs.B55.statUp + collection3StatUp + armoryforgottenStatUp + talent.TG2E.statUp + buffs.B29.statUp + buffs.B63.statUp + talent.TG1E.statUp + items.I385.statUp) * luckStampStatUp * items.I315.statUp * (1+gardenDropChancePower)

//multiplicativeEXPGain = 1 + bluemoonExpUp + buffs.B9.statUp + buffs.B10.statUp + buffs.B23.statUp + items.I172.statUp + buffs.B35.statUp + items.I193.statUp + talent.TI2C.statUp + talent.TI0D.statUp + items.I432.statUp + buffs.B101.statUp + items.I3.statUp + items.I140.statUp2
additiveEXPGain = bluemoonExpUp + buffs.B9.statUp + buffs.B10.statUp + buffs.B23.statUp + items.I172.statUp + buffs.B35.statUp + items.I193.statUp + buffs.B101.statUp + items.I3.statUp + items.I140.statUp2 + items.I55.statUp + items.I337.statUp2
multiplicativeEXPGain =  (1+gardenExpGainPower) * (1+talent.TI0D.statUp) * (1+talent.TI2B3.statUp)
playerEXPGain = 1+ additiveEXPGain * multiplicativeEXPGain

armorAdditiveMaxHp = headAdditiveMaxHp + chestAdditiveMaxHp + legsAdditiveMaxHp + feetAdditiveMaxHp + handsAdditiveMaxHp + ringAdditiveMaxHp + trinketAdditiveMaxHp
additiveMaxHp = armorAdditiveMaxHp + buffs.B1.statUp
//multiplicativeMaxHp = 1 + (talent.TA2.statUp + buffs.B12.statUp + collection2StatUp + armorymasterworkStatUp);
//playerMaxHp = (25 + additiveMaxHp) * (multiplicativeMaxHp)   * (1+buildings.B1.statUp) * (1+armoryrunicStatUp);
multiplicativeMaxHp = 1 * items.I6.statUp * items.I80.statUp * (1+buffs.B12.statUp) * (1+talent.TA2.statUp) * (1+talent.TI1C.statUp) * (1-items.I23.statUp2) * (1+gardenHealthPower);


playerMaxHp = ((25 + additiveMaxHp) * multiplicativeMaxHp) * Math.pow(1.005, playerMastery) 


additiveStrength = strengthStampStatUp + items.I132.statUp + items.I135.statUp2 + items.I137.statUp + items.I15.statUp  + buffs.B45.statUp + items.I146.statUp2 + buffs.B61.statUp + items.I127.statUp2 + items.I134.statUp + items.I322.statUp + items.I336.statUp2 + items.I383.statUp2 + buffs.B98.statUp + items.I376.statUp3 + buffs.B20B.statUp
//multiplicativeStrength =  ( 1 + talent.TI1C.statUp + buffs.B45.statUp + buffs.B61.statUp + items.I15.statUp + talent.TI3E.statUp + buffs.B98.statUp )  * items.I317.statUp * (1+gardenStrengthPower) * (1+talent.TI3.statUp) * (1+buildings.B3.statUp) * (1+items.I376.statUp)
multiplicativeStrength =  (1+gardenStrengthPower) * (1+talent.TG1E.statUp) * (1+talent.TG2D1.statUp) * (1+talent.TI3E.statUp) * items.I376.statUp
playerStrength = 1+(additiveStrength * multiplicativeStrength);

playerOmni = 1

playerSteal = items.I136.statUp2 + items.I345.statUp + talent.TG2E1.statUp + buffs.B116.statUp



additiveSpellpower = items.I138.statUp2 + items.I139.statUp + items.I141.statUp + buffs.B46.statUp + buffs.B70.statUp + items.I168.statUp + items.I144.statUp + items.I145.statUp + buffs.B62.statUp + items.I335.statUp2 + items.I360.statUp + items.I383.statUp + buffs.B99.statUp + items.I20.statUp +  items.I378.statUp2 + items.I375.statUp2
//multiplicativeSpellpower = (1 + (items.I375.statUp*0.01) + buffs.B46.statUp + talent.TI0E.statUp + talent.TA1C.statUp + buffs.B70.statUp + buffs.B99.statUp) * items.I318.statUp * ;
multiplicativeSpellpower = (1+gardenSpellpower) * (1+talent.TA1G11.statUp) * (1+talent.TA1E.statUp) * (1+talent.TI3.statUp) * items.I378.statUp;
playerSpellpower = (1+(additiveSpellpower * multiplicativeSpellpower)  )* items.I376.statUp2 ;


multiplicativeCritChance = 1 + buffs.B62.hasteStampStatUp
playerCritChance = multiplicativeCritChance ;

/*
multiplicativeNatureDamage = (1 + buffs.B4.statUp + buffs.B15.statUp + items.I44.statUp + buffs.B19.statUp + talent.TI1B.statUp + talent.TI3.statUp) * natureStampStatUp * (1+gardenNaturePower);
armorNatureDamage = headAdditiveNatureDamage + chestAdditiveNatureDamage + legsAdditiveNatureDamage + feetAdditiveNatureDamage + handsAdditiveNatureDamage + ringAdditiveNatureDamage
additiveNatureDamage = weaponNatureDamage + armorNatureDamage+ exlorerTier
playerTotalNatureDamage = (additiveNatureDamage) * multiplicativeNatureDamage;

multiplicativeMightDamage = (1 + buffs.B5.statUp + buffs.B13.statUp  + buffs.B21.statUp + talent.TG2C.statUp + items.I45.statUp) *
armorMightDamage = headAdditiveMightDamage + chestAdditiveMightDamage + legsAdditiveMightDamage + feetAdditiveMightDamage + handsAdditiveMightDamage + ringAdditiveMightDamage
additiveMightDamage = weaponMightDamage + armorMightDamage
playerTotalMightDamage = (additiveMightDamage) * multiplicativeMightDamage;


multiplicativeElementalDamage = (( 1 ) + talent.TA3.statUp + buffs.B30.statUp + items.I173.statUp + buffs.B40.statUp)* elementalStampStatUp * (1+gardenElementalPower);
multiplicativeElementalDamage = (( 1 ) + talent.TA3.statUp + buffs.B30.statUp + items.I173.statUp + buffs.B40.statUp)* elementalStampStatUp * (1+gardenElementalPower);
additiveElementalDamage = weaponElementalDamage
playerTotalElementalDamage = (additiveElementalDamage) * multiplicativeElementalDamage

multiplicativeOccultDamage = ( 1 + bluemoonDmgUp  + buffs.B20.statUp + buffs.B32.statUp + buffs.B41.statUp + items.I192.statUp + buffs.B51.statUp) * occultStampStatUp * (1+gardenOccultPower);
let armorOccultDamage = headAdditiveOccultDamage + chestAdditiveOccultDamage + legsAdditiveOccultDamage + feetAdditiveOccultDamage + handsAdditiveOccultDamage + ringAdditiveOccultDamage
additiveOccultDamage = weaponOccultDamage + armorOccultDamage
playerTotalOccultDamage = (additiveOccultDamage) * multiplicativeOccultDamage;

multiplicativeDeificDamage = (1  +  ) * 
additiveDeificDamage = weaponDeificDamage
playerTotalDeificDamage = (additiveDeificDamage) * multiplicativeDeificDamage;
*/

natureDamageAdditive =  buffs.B4.statUp + buffs.B15.statUp + items.I44.statUp + buffs.B19.statUp + natureStampStatUp + buffs.B107.statUp + items.I59.statUp + items.I73.statUp + items.I76.statUp + items.I142.statUp + items.I141.statUp2 + items.I140.statUp + items.I321.statUp;
natureDamageMultiplicative =   (1+gardenNaturePower) * (1+talent.TI1B.statUp) * (1+talent.TI3C1.statUp);
natureDamageBonus = natureDamageAdditive * natureDamageMultiplicative

mightDamageAdditive =  items.I8.statUp + buffs.B5.statUp + buffs.B13.statUp  + buffs.B21.statUp + items.I45.statUp + mightStampStatUp + items.I133.statUp + items.I7.statUp  + items.I136.statUp + items.I132.statUp;
mightDamageMultiplicative =  (1+gardenMightPower) * (1+talent.TG2C.statUp) * (1+talent.TG2D4.statUp);
mightDamageBonus = mightDamageAdditive * mightDamageMultiplicative

occultDamageAdditive = bluemoonDmgUp  + buffs.B20.statUp + buffs.B32.statUp + buffs.B41.statUp + items.I192.statUp + occultStampStatUp + items.I167.statUp + items.I143.statUp2 + items.I147.statUp + buffs.B63.statUp + items.I78.statUp + buffs.B94.statUp;
occultDamageMultiplicative =  (1+gardenOccultPower) * (1+talent.TG2E.statUp) * (1+talent.TI2C.statUp);
occultDamageBonus = occultDamageAdditive * occultDamageMultiplicative

deificDamageAdditive = buffs.B31.statUp + items.I175.statUp + buffs.B38.statUp + deificStampStatUp + buffs.B18.statUp + items.I56.statUp + buffs.B114.statUp;
deificDamageMultiplicative =  (1+gardenDeificPower) * (1+talent.TA1G.statUp) * (1+talent.TG3.statUp) * (1+talent.TI0E.statUp);
deificDamageBonus = deificDamageAdditive * deificDamageMultiplicative

elementalDamageAdditive =  buffs.B30.statUp + items.I173.statUp + buffs.B40.statUp + elementalStampStatUp + items.I23.statUp2 + items.I23.statUp2 + items.I288.statUp2 + items.I334.statUp2 + items.I335.statUp + items.I338.statUp + items.I20.statUp2 + items.I27.statUp;
elementalDamageMultiplicative =  (1+gardenElementalPower) * (1+talent.TA3.statUp) * (1+talent.TA31.statUp);
elementalDamageBonus = elementalDamageAdditive * elementalDamageMultiplicative

armorAdditiveRegen = headAdditiveRegen + chestAdditiveRegen + legsAdditiveRegen + feetAdditiveRegen + handsAdditiveRegen + ringAdditiveRegen
playerHpRegen = (rpgPlayer.baseHpRegen + additiveRegen + armorAdditiveRegen);

let esotericBrume = 0;
if (stats.currentArea==="A8") {esotericBrume = -0.15;} else esotericBrume = 0;


natureResist = items.I4.statUp + items.I74.statUp + items.I75.statUp  + items.I77.statUp + items.I131.statUp + items.I138.statUp + items.I139.statUp2 - natureDownStampStatUp + items.I72.statUp + items.I142.statUp + esotericBrume;
mightResist = items.I5.statUp + items.I134.statUp2 - mightDownStampStatUp + items.I169.statUp + items.I127.statUp + items.I72.statUp + items.I133.statUp2 + items.I135.statUp + esotericBrume;
elementalResist =  - elementalDownStampStatUp + items.I72.statUp + items.I288.statUp + items.I334.statUp + items.I336.statUp + items.I337.statUp + esotericBrume ;
occultResist = 0 - occultDownStampStatUp + items.I143.statUp + items.I144.statUp2 + items.I146.statUp + items.I147.statUp2 + items.I72.statUp + buffs.B20A.statUp + esotericBrume;
deificResist =  - deificDownStampStatUp + items.I72.statUp + esotericBrume;



//multiplicativeHaste = (1 - buffs.B7.statUp - buffs.B47.statUp - weaponHaste - buffs.B71.statUp - buffs.B72.statUp - buffs.B86.statUp - items.I2.statUp) * hasteStampStatUp older haste
//playerHaste = Math.min(1 - items.I2.statUp - items.I81.statUp - hasteStampStatUp + buffs.B86.statUp - buffs.B47.statUp + items.I23.statUp, 4)  old haste
playerHaste = 1/(1 + Math.max( items.I2.statUp + items.I81.statUp + hasteStampStatUp + buffs.B47.statUp + buffs.B86.statUp + items.I23.statUp + items.I320.statUp + items.I82.statUp + buffs.B71.statUp + buffs.B72.statUp + items.I385.statUp + items.I199.statUp + items.I85.statUp + items.I24.statUp + items.I171.statUp2, -0.99) )   

playerHealingBonus = 1 +  items.I206.statUp2 + items.I495.statUp


multiplicativeMiningDamage = 1
additiveMiningDamage = buffs.B37.statUp + weaponMiningDamage ;
playerMiningDamage = additiveMiningDamage * multiplicativeMiningDamage;

playerGatheringLevel = 0 + weaponGatheringLevel + buffs.B37.statUp + items.I117.statUp + buffs.B69.statUp + items.I387.statUp; 

additiveFishingLevel = 0 + items.I182.statUp + buffs.B22.statUp + buffs.B14.statUp + buffs.B69.statUp + buffs.B45.statUp + items.I162.statUp + items.I171.statUp ;
playerFishingLevel = additiveFishingLevel + rainFishingUp + items.I344.statUp + items.I145.statUp2;

additiveCoinsPerClick = items.I113.statUp + items.I124.statUp + items.I128.statUp + items.I202.statUp + items.I426.statUp + items.I401.statUp
//multiplicativeCoinsPerClick = 1 + buffs.B8.statUp + buffs.B25.statUp + buffs.B26.statUp + talent.TA1B.statUp + talent.TG1.statUp * (1+gardenPatPower);
multiplicativeCoinsPerClick = 1 * (1+talent.TG1.statUp) * (1+talent.TA1B.statUp) * (1+talent.TI2B2.statUp) * (1+buffs.B8.statUp) * (1+buffs.B25.statUp) * (1+buffs.B26.statUp) * (1+gardenPatPower)
playerCoinsPerClick = (10 + additiveCoinsPerClick) * multiplicativeCoinsPerClick;

playerClickRate = 100 / ( 1 + ( buffs.B27.statUp + buffs.B28.statUp ))

additiveMaxMana = 100 + talent.TA0C.statUp + items.I375.statUp;
multiplicativeMaxMana = 1
playerMaxMana = additiveMaxMana * multiplicativeMaxMana

playerPresentsMinigame = 6 + talent.TA0B.statUp + talent.TG1D.statUp + talent.TI0B.statUp + items.I217.statUp + items.I184.statUp
playerPresentMinigameTimer = 1200 - talent.TG0B.statUp

//multiplicativePenguinPower = 1 + buildings.B7.statUp * (1+talent.TA1G1.statUp) * (1+talent.TG2C1.statUp)
multiplicativePenguinPower = (1+talent.TA1G1.statUp) * (1+talent.TG2C1.statUp) * (1+items.I166.statUp)
playerPenguinPower = (100) * multiplicativePenguinPower

playerManaRegen = playerMaxMana*0.002+buffs.B66.statUp+gardenMagicRegenPower;

setTimeout(() => {if (rpgPlayer.hp > playerMaxHp) { rpgPlayer.hp = playerMaxHp }  }, 400); //prevents overhealing
     

totalArmoryGot = armoryheirloomGot+armorymillionaireGot+armoryforgottenGot+armorymasterworkGot+armorybeastfallenGot+armoryreveredGot+armorysolsticeGot+
armoryancientGot+armorymalevolentGot+armorychosenGot+armorytoyboxGot+armoryrunicGot+armoryomegaGot;

totalArmory = armoryheirloomTotal+armorymillionaireTotal+armoryforgottenTotal+armorymasterworkTotal+armorybeastfallenTotal+armoryreveredTotal+armorysolsticeTotal+
+armoryancientTotal+armorymalevolentTotal+armorychosenTotal+armorytoyboxTotal+armoryrunicTotal+armoryomegaTotal


playerWeaponDamage = weaponMightDamage + weaponNatureDamage + weaponElementalDamage + weaponDeificDamage + weaponOccultDamage + flatWeaponDamage

expectedPlayerDamage = playerWeaponDamage * (1+natureDamageBonus) * (1+mightDamageBonus) * (1+elementalDamageBonus) * (1+occultDamageBonus) * (1+deificDamageBonus) * playerStrength * playerSpellpower * Math.pow(1.005, playerMastery)
   
flatWeaponDamage = items.I374.statUp

     
}




//----------------------==========================-----------------------
//----------------------==========ENEMIES=========-----------------------
//----------------------==========================-----------------------
//#region Enemies
var enemies = {}


var copperCollectibles = { 
  I241:{R:true}, //tiger eye
  I227:{R:true}, //ruby
  I233:{R:true}, //sapphire
  I229:{R:true}, //turqueosite
  I231:{R:true}, //feldespate
  I234:{R:true}, //gammanite
  I238:{R:true}, //chromatic
  I235:{R:true}, //stardustite
}

var arcaniteCollectibles = { 
  I228:{R:true}, //topaz
  I226:{R:true}, //diamond
  I230:{R:true}, //peridot
  I232:{R:true}, //raritarium
  I237:{R:true}, //advandrite
  I240:{R:true}, //taoline
  I236:{R:true}, //equinox
  I239:{R:true}, //xyzite
}

var snapthornCollectibles = { 
  I265:{R:true}, //grasshopper
  I267:{R:true}, //bee
  I269:{R:true}, //ladybug
  I271:{R:true}, //stick bug
  I272:{R:true}, //beetle
  I278:{R:true}, //pulga
  I275:{R:true}, //void beetle
}

var dataclusterCollectibles = { 
  I266:{R:true}, //moth
  I268:{R:true}, //tarantula
  I270:{R:true}, //butterfly
  I274:{R:true}, //firefly
  I277:{R:true}, //sparx
  I276:{R:true}, //crystal scorpion
  I273:{R:true}, //hypnomoth
  I279:{R:true}, //error
}

var fossilCollectibles = { 
  I402:{R:true},
  I403:{R:true},
  I404:{R:true},
  I405:{R:true}, 
  I406:{R:true},
  I407:{R:true}, 
  I408:{R:true}, 
  I409:{R:true},
  I410:{R:true}, 
  I411:{R:true}, 
}



var eeriePondCollectibles = { 
  I248:{R:true}, //jellyfish
  I244:{R:true}, //fishbag
  I242:{R:true}, //eel
  I247:{R:true}, //fish snack
  I253:{R:true}, //blobfish
  I256:{R:true}, //pufferfish
  I250:{R:true}, //axolotl
  I246:{R:true}, //goldfish
}

var unusedPondCollectibles = { 
  I243:{R:true}, //koi
  I249:{R:true}, //miragefish
  I245:{R:true}, //pulpo
  I251:{R:true}, //catfish
  I254:{R:true}, //seahorse
  I255:{R:true}, //lava eel
  I252:{R:true}, //blobfish baby

}

function bestiaryItem(id, tag, alt, alt2){

 if (tag==="container" && items[id].gotOnce && alt2!==undefined)  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>❖ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+alt+" ✔️ <FONT COLOR=gray>[1/"+alt2+"]<br>" 
else if (tag==="container" && alt2!==undefined)  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>❖ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+alt+" <FONT COLOR=gray>[1/"+alt2+"]<br>" 


if (tag==="container" && items[id].gotOnce)  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>❖ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+items[id].name+" ✔️ <FONT COLOR=gray> [1/"+alt+"]<br>";
else if (tag==="container" )  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>❖ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+items[id].name+"<FONT COLOR=gray> [1/"+alt+"]<br>" 
 

if (alt===undefined){
  if (tag==="drop" && items[id].gotOnce)  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>★ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+items[id].name+" ✔️<br>";
  else if (tag==="drop")  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>★ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">?????<br>'
} else{
  if (tag==="drop" && items[id].gotOnce)  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>★ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+items[id].name+" ✔️ <FONT COLOR=gray>[1/"+alt+"]<br>";
  else if (tag==="drop")  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>★ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">????? <FONT COLOR=gray>[1/'+alt+']<br>'
}


if (tag==="steal" && items[id].gotOnce)  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>✱ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+items[id].name+" ✔️ <FONT COLOR=gray>[Steal]<img src='img/src/talents/TG1B.jpg'><FONT COLOR=gray>["+alt+"]<br>";
else if (tag==="steal")  return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>✱ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">????? <FONT COLOR=gray>[Steal]<img src="img/src/talents/TG1B.jpg"><FONT COLOR=gray>['+alt+']<br>'

return '<FONT COLOR='+returnQualityColor(items[id].quality)+'>★ <img src="img/src/items/'+items[id].img+'.jpg" style="border: solid 1px '+returnQualityColor(items[id].quality)+'">'+items[id].name;

}

function bestiaryReveal(content, enemyid, kills){

  if (enemies[enemyid].killCount>=kills) { return '<FONT COLOR="#707070"> '+content }
  else return '<FONT COLOR="#707070"> [??%]'
  
}

function bestiaryTag(tag, color, width){


let colorvar = '#516385'
if (color !== undefined) colorvar = color

let widthvar = '100%';
if (width === "auto") widthvar = 'auto';

  if (width==="nobr") return '<span class="bestiaryTaggy" style="display:flex; align-self:center; justify-content:center; width: '+widthvar+'; background:'+colorvar+'; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450; margin:2% 0; margin-bottom: -2rem;">'+tag+'</span>'
  return '<span class="bestiaryTaggy" style="display:flex; align-self:center; justify-content:center; width: '+widthvar+'; background:'+colorvar+'; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450; margin:2% 0;">'+tag+'</span>'
 
}
function colorTag(text, color, mode){
  if (mode==="nobr") return '<strong style="background:'+color+'; padding: 0 0.4rem; border-radius: 0.2rem; white-space: nowrap; color:white;font-family: fredoka; font-weight: 450;">'+text+'</strong>'
  return '<strong style="background:'+color+'; padding: 0 0.4rem; border-radius: 0.2rem; white-space: nowrap; color:white;font-family: fredoka; font-weight: 450; margin:0 0.3rem">'+text+'</strong>'
  }


function returnExp(level){

  return Math.floor(1000 * Math.pow(1.5, (level-1)))

}


enemies.E1 = {};
enemies.E1.name = 'Caulislug';
enemies.E1.level = '[lvl 1]';
enemies.E1.hp = 40;
enemies.E1.description = 'A slug so passionate about vegetables that he raised one on its shell. Scientists are in absolute awe.'
enemies.E1.area = 'A1';
enemies.E1.attack = 3;
enemies.E1.difficulty = 'easy';
enemies.E1.exp = returnExp(1)/200;
enemies.E1.drop = "dropItem('I1'); rareItemDrop('I464',relicDrop);";
enemies.E1.align = 'nature';
enemies.E1.bestiaryItem = 'bestiaryItem("I1", "drop")+bestiaryItem("I464", "drop", relicDrop)';

enemies.E3 = {};
enemies.E3.name = 'Ribull';
enemies.E3.level = '[lvl 4]';
enemies.E3.hp = 200;
enemies.E3.description = 'Recognized for their loud croaking sound, numerous noise complaints have been filled wherever they reside. But they never listen...'
enemies.E3.area = 'A1';
enemies.E3.attack = 30;
enemies.E3.difficulty = 'medium';
enemies.E3.exp = returnExp(4)/200;
enemies.E3.drop =  "dropItem('I51'); rareItemDrop('I59',uncommonDrop,1,'drop');";
enemies.E3.align = 'might';
enemies.E3.bestiaryItem = 'bestiaryItem("I51", "drop")+bestiaryItem("I59", "drop",uncommonDrop)';

enemies.E2 = {}; 
enemies.E2.name = 'Stinglet';
enemies.E2.level = '[lvl 7]';
enemies.E2.hp = 400;
enemies.E2.description = 'It is said that the poison of these scorpids is more lethal the whiter their tails are. It is also said that they kinda look like a baguette.'
enemies.E2.area = 'A1';
enemies.E2.attack = 50; 
enemies.E2.exp = returnExp(7)/200;
enemies.E2.difficulty = 'hard';
enemies.E2.drop = "dropItem('I37');";
enemies.E2.align = 'might';
enemies.E2.bestiaryItem = 'bestiaryItem("I37", "drop")';

enemies.E13 = {};
enemies.E13.name = 'Copper Vein';
enemies.E13.level = '';
enemies.E13.difficulty = 'ore';
enemies.E13.area = 'A1';
enemies.E13.hp = 75;
enemies.E13.description = 'A rich mineral deposit containing soft metals.'
enemies.E13.exp = returnExp(4)/200;
enemies.E13.drop = "dropItem('I32'); rollTable(copperCollectibles, 1)";
enemies.E13.tag = "ore"
enemies.E13.gatheringLevel = 1;
enemies.E13.bestiaryItem = 'bestiaryTag("Requires: ⛏️ Gathering Level 1")+bestiaryItem("I32", "drop")';

enemies.E4 = {};
enemies.E4.name = 'Hoopperoona';
enemies.E4.level = '[lvl 10]';
enemies.E4.hp = 8000;
enemies.E4.area = 'A1';
enemies.E4.description = 'An overgrown arachnid that doesn\'t seem too up for conversation.';
enemies.E4.attack = 70;
enemies.E4.exp = returnExp(10)/200;
enemies.E4.attackChance = 'castHoopperoona()';
enemies.E4.drop = 'rareItemDrop("I83",uncommonDrop,1,"drop")+rareItemDrop("I192",uncommonDrop,1,"drop")+rareItemDrop("I47",uncommonDrop,1,"drop")+dropItem("I57")'; 
enemies.E4.align = 'occult';
enemies.E4.tag = 'areaBoss';
enemies.E4.difficulty = 'boss';
enemies.E4.bigEnemy = true;
enemies.E4.bestiarySkills = "❖ Fleming Bite: Inflicts"+buffIcon("B1")+"Poison.";
enemies.E4.bestiaryItem = 'bestiaryItem("I83", "drop", uncommonDrop)+bestiaryItem("I192", "drop", uncommonDrop)+bestiaryItem("I47", "drop", uncommonDrop)+bestiaryItem("I57", "drop")';
enemies.E4.firstTimeReward = true;

enemies.E31 = {};
enemies.E31.name = 'Matriarachnia';
enemies.E31.level = '[lvl 55]';
enemies.E31.hp = 250000000;
enemies.E31.area = 'A1';
enemies.E31.description = 'Even after undergoing evolution, the beast still doesnt know table manners.';
enemies.E31.attack = 6000000;
enemies.E31.exp = returnExp(40)/500;
enemies.E31.bigEnemy = true;
enemies.E31.attackChance = 'castHoopperoonaLucid();';
enemies.E31.drop = "rareItemDrop('I106',1,50); rareItemDrop('I83',1);"; 
enemies.E31.bestiaryItem = 'bestiaryItem("I106","container", "Trapped Cage x50")+bestiaryItem("I83","rare")';
enemies.E31.bestiarySkills = "❖ Melting Bite: Inflicts"+buffIcon("B1")+"Poison.<br>❖ String Shot: Inflicts"+buffIcon("B36")+"Slow.";
enemies.E31.align = 'occult';
enemies.E31.tag = 'areaBoss';
enemies.E31.ignoreBestiary = true;

enemies.E5 = {};
enemies.E5.name = 'Jabbit';
enemies.E5.level = '[lvl 11]';
enemies.E5.hp = 1600;
enemies.E5.description = 'Although it lacks poison or claws, does it really look like it couldn\'t hurt you?'
enemies.E5.area = 'A2';
enemies.E5.attack = 140;
enemies.E5.exp = returnExp(11)/300;
enemies.E5.difficulty = 'easy';
enemies.E5.drop =  "dropItem('I114'); rareItemDrop('I69', uncommonDrop,1,'drop')";
enemies.E5.align = 'might';
enemies.E5.bestiaryItem = 'bestiaryItem("I114","drop")+bestiaryItem("I69","drop",uncommonDrop)';

enemies.E6 = {};
enemies.E6.name = 'Karateil';
enemies.E6.level = '[lvl 14]';
enemies.E6.hp = 2700;
enemies.E6.description = 'A common red squirrel that has found its ways into martial arts. Not so common anymore.'
enemies.E6.area = 'A2';
enemies.E6.attack = 400;
enemies.E6.exp = returnExp(14)/300;
enemies.E6.difficulty = 'medium';
enemies.E6.align = 'nature';
enemies.E6.drop =  "dropItem('I115');";
enemies.E6.bestiaryItem = 'bestiaryItem("I115","drop")+bestiaryItem("I127","steal", "1/150 up to 1/"+rareThief)';

enemies.E7 = {};
enemies.E7.name = 'Roostrika';
enemies.E7.level = '[lvl 17]';
enemies.E7.hp = 6500;
enemies.E7.description = 'A hen proficient in full body combat. This one doesn\'t even want to cross the road.'
enemies.E7.area = 'A2';
enemies.E7.attack = 800;
enemies.E7.exp = returnExp(17)/300;
enemies.E7.difficulty = 'hard';
enemies.E7.align = 'nature';
enemies.E7.drop =  "dropItem('I25');";
enemies.E7.bestiaryItem = 'bestiaryItem("I25","drop")';

enemies.E14 = {};
enemies.E14.name = 'Snapthorn Briar';
enemies.E14.level = '';
enemies.E14.difficulty = 'herb';
enemies.E14.area = 'A2';
enemies.E14.hp = 75;
enemies.E14.description = 'A lush and bountiful briar containing many kinds of rare herbs with many applications.'
enemies.E14.exp = returnExp(14)/300;
enemies.E14.drop = "dropItem('I38'); rollTable(snapthornCollectibles, 1)";
enemies.E14.gatheringLevel = 1;
enemies.E14.bestiaryItem = 'bestiaryTag("Requires: ⛏️ Gathering Level 1")+bestiaryItem("I38","drop")';

var enemyDamageMultiplier = 1;
var enemyDefenseMultiplier = 1;
var enemyPhase = 1;
enemies.E8 = {};
enemies.E8.name = 'King-Kat';
enemies.E8.level = '[lvl 20]';
enemies.E8.hp = 200000;
enemies.E8.description = 'King of the jungle and king of all fighting styles. Try hitting its weakness.';
enemies.E8.attack = 1400;
enemies.E8.area = 'A2';
enemies.E8.exp = returnExp(20)/300;
enemies.E8.attackChance = 'castKingKat()';
enemies.E8.defenseChance = ' if(rpgPlayer.weaponSlot==="I60") {logs.P39.unlocked=true;}';
enemies.E8.align = 'nature';
enemies.E8.drop =  'rareItemDrop("I137",rareDrop,1,"drop")+rareItemDrop("I15",rareDrop,1,"drop")+rareItemDrop("I132",uncommonDrop,1,"drop")+rareItemDrop("I133",uncommonDrop,1,"drop")+rareItemDrop("I134",uncommonDrop,1,"drop")+rareItemDrop("I135",uncommonDrop,1,"drop")+rareItemDrop("I136",uncommonDrop,1,"drop")+dropItem("I165")'; 
enemies.E8.tag = 'areaBoss';
enemies.E8.difficulty = 'boss';
enemies.E8.bigEnemy = true;
enemies.E8.bestiarySkills = '❖ King Punch: Medium'+mightIcon+'Might Damage.<br>❖'+buffIcon("B26")+'Enrage: Increases attack.';
enemies.E8.bestiaryItem = 'bestiaryItem("I135","container","Jungle King Armor Set", uncommonDrop)+bestiaryItem("I137","drop", rareDrop)+bestiaryItem("I15","drop", rareDrop)+bestiaryItem("I165","drop")';
enemies.E8.firstTimeReward = true;

enemies.E32 = {};
enemies.E32.name = 'King-Mysterio';
enemies.E32.level = '[lvl 60]';
enemies.E32.hp = 350000000000;
enemies.E32.area = 'A2';
enemies.E32.description = 'You can\'t really put a finger on who is it below the mask.';
enemies.E32.attack = 400000000;
enemies.E32.exp = 6000;
enemies.E32.attackChance = 'castKingMysterio()';
enemies.E32.align = 'might';
enemies.E32.bigEnemy = true;
enemies.E32.drop =  "rareItemDrop('I53',1,50);";
enemies.E32.bestiarySkills = '❖ Mysterio Punch: Medium'+mightIcon+'Might Damage.<br>❖'+buffIcon("B34")+'619 Consecutive Mysterio Punches: Very High'+mightIcon+'Might Damage.';
enemies.E32.tag = 'areaBoss';
enemies.E32.ignoreBestiary = true;

enemies.E15 = {};
enemies.E15.name = 'Mystery Present';
enemies.E15.level = '';
enemies.E15.hp = 150;
enemies.E15.area = 'A1';
enemies.E15.difficulty = 'cache';
enemies.E15.description = 'Right Click to open it!<br>Quick, Before you "accidentally" destroy it!'
enemies.E15.exp = 1;
enemies.E15.ignoreBestiary = true;
enemies.E15.noMedal = true;

enemies.E43 = {};
enemies.E43.name = 'Present Mimic';
enemies.E43.level = '[lvl ??]';
enemies.E43.hp = 30000;
enemies.E43.description = 'A creature prying on innocent turtles looking for riches. A lesson to be sure, as not all surprises are motive of joy.'
enemies.E43.attack = 'playerMaxHp/6';
enemies.E43.area = 'A1';
enemies.E43.tag = "areaBoss";
enemies.E43.exp = 1;
enemies.E43.align = 'occult';
enemies.E43.drop =  "rareItemDrop(rareItems[rng(0,(rareItems.length-1))],1); rareItemDrop(rareItems2[rng(0,(rareItems2.length-1))],1); rareItemDrop(rareItems[rng(0,(rareItems.length-1))],1); rareItemDrop(rareItems2[rng(0,(rareItems2.length-1))],1);";
enemies.E43.bestiaryItem = '"???<br>"+bestiaryItem("I184","steal","1/200 up to 1/"+epicThief)';
enemies.E43.dynamic = true;
enemies.E43.noMedal = true;

enemies.E9 = {};
enemies.E9.name = 'Picore';
enemies.E9.level = '[lvl 21]';
enemies.E9.hp = 35000;
enemies.E9.description = 'A cute square monster that likes to mine rocks. He doesn\'t do it with any purpose in mind, he just likes to do so.'
enemies.E9.area = 'A3';
enemies.E9.attack = 1100;
enemies.E9.exp = returnExp(21)/1800;
enemies.E9.difficulty = 'easy';
enemies.E9.align = 'deific';
enemies.E9.drop =  "dropItem('I16');";
enemies.E9.bestiaryItem = 'bestiaryItem("I16","drop")+bestiaryItem("I24","steal", "1/200 up to 1/"+rareThief)';

enemies.E10 = {};
enemies.E10.name = 'Cubomite';
enemies.E10.level = '[lvl 24]';
enemies.E10.hp = 50000;
enemies.E10.description = 'A monster with a highly volatile personality. If attacked with elemental damage, well, why don\'t you try it out for yourself?'
enemies.E10.area = 'A3';
enemies.E10.attack = 5000;
enemies.E10.exp = returnExp(24)/1800;
enemies.E10.difficulty = 'medium';
enemies.E10.align = 'elemental';
enemies.E10.drop =  "dropItem('I29');";
enemies.E10.bestiaryItem = 'bestiaryItem("I29","drop")'

enemies.E29 = {};
enemies.E29.name = 'Royal Pudding';
enemies.E29.level = '[lvl 30]';
enemies.E29.hp = 1300000;
enemies.E29.description = 'A pink round jelly that is as dangerous as it is delicious. Do not let the intrusive thoughts win.'
enemies.E29.attack = 20000;
enemies.E29.exp = 0;
enemies.E29.area = 'A7';
enemies.E29.align = 'deific';
enemies.E29.tag = "showdownBoss";
enemies.E29.attackChance = 'castRoyalPudding()'
enemies.E29.showdown = "S1";
enemies.E29.bestiaryItem = '"None"';
enemies.E29.bestiarySkills = "❖ Gel Shot: Medium"+natureIcon+"Nature Damage and inflicts"+buffIcon("B36")+"Slow.";

enemies.E11 = {};
enemies.E11.name = 'Granite Elemental';
enemies.E11.level = '[lvl 27]';
enemies.E11.hp = 100000;
enemies.E11.description = 'Sentient mineral rock that has taken a monstruous shape. Every geologist\'s dream. Probably.'
enemies.E11.area = 'A3';
enemies.E11.attack = 9000;
enemies.E11.exp = returnExp(27)/1800;
enemies.E11.difficulty = 'hard';
enemies.E11.align = 'elemental';
enemies.E11.drop =  "dropItem('I17');rareItemDrop('I468',relicDrop);";
enemies.E11.bestiaryItem = 'bestiaryItem("I17","drop")+bestiaryItem("I468","drop",relicDrop)'

enemies.E19 = {};
enemies.E19.name = 'Arcanite Vein';
enemies.E19.level = '';
enemies.E19.difficulty = 'ore';
enemies.E19.area = 'A3';
enemies.E19.hp = 75;
enemies.E19.description = 'An ore pulsating with latent electromagnetic energy, coveted by mages and engineers alike.'
enemies.E19.exp = returnExp(25)/1800;
enemies.E19.drop = "dropItem('I36');   rollTable(arcaniteCollectibles, 1)";
enemies.E19.tag = "ore";
enemies.E19.gatheringLevel = 2;
enemies.E19.bestiaryItem = 'bestiaryTag("Requires: ⛏️ Gathering Level 2")+bestiaryItem("I36","drop")';

enemies.E22 = {};
enemies.E22.name = 'Pringu Soldier';
enemies.E22.level = '[lvl 30]';
enemies.E22.hp = 400000;
enemies.E22.description = 'A fierce warrior of the Pringu Army. They are as knightly as they are cute, so they are very knightly indeed.'
enemies.E22.area = 'A5';
enemies.E22.attack = 50000;
enemies.E22.exp = 0;
enemies.E22.drop =  "rareItemDrop('I310', 1)";
enemies.E22.difficulty = 'easy'; 
enemies.E22.defenseChance = 'if (items[rpgPlayer.weaponSlot].tag==="rod" && rng(1,3)===1) rareItemDrop("I344", 1);'
enemies.E22.align = 'nature';
enemies.E22.bestiaryItem = 'bestiaryItem("I310","drop",1)';
enemies.E22.tag = 'dungeonEnemy';

enemies.E23 = {};
enemies.E23.name = 'Pringu Emperor';
enemies.E23.level = '[lvl 32]';
enemies.E23.hp = 5000000;
enemies.E23.description = 'He hates to lose so be prepared when his HP is low. Be sure to save all your cards until then.'
enemies.E23.attack = 45000;
enemies.E23.exp = 0;
enemies.E23.area = 'A5';
enemies.E23.align = 'nature';
enemies.E23.drop =  'rareItemDrop("I310",1,10);rareItemDrop("I142",uncommonDungeon,1,"drop");rareItemDrop("I141",uncommonDungeon,1,"drop");rareItemDrop("I140",uncommonDungeon,1,"drop");rareItemDrop("I139",uncommonDungeon,1,"drop");rareItemDrop("I138",uncommonDungeon,1,"drop");rareItemDrop("I60",rareDungeon,1,"drop");  sendMail("MO1");   unlocksReveal(); shopItems.A3S22.unlocked = true; shopItems.A3S18.unlocked = true; shopItems.A3S19.unlocked = true;';
enemies.E23.tag = "finalBoss";
enemies.E23.attackChance = 'castPringuEmperor()';
enemies.E23.bigEnemy = true;
enemies.E23.bestiaryItem = 'bestiaryItem("I139","container", "Pringu Armor Set",uncommonDungeon)+bestiaryItem("I60","drop",rareDungeon)';
enemies.E23.bestiarySkills = "❖ Spit Fish: Inflicts"+buffIcon("B31")+"Seized.<br>❖ Royal Authority: Heals when low HP.";
enemies.E23.firstTimeReward = true;

enemies.E12 = {};
enemies.E12.name = 'Terragosa';
enemies.E12.level = '[lvl 35]';
enemies.E12.hp = 15000000;
enemies.E12.description = 'A crystalline drake formed out of sheer willpower and pressure. Be wary of its Prismatic Shield.';
enemies.E12.attack = 40000;
enemies.E12.exp = returnExp(30)/1800;
enemies.E12.area = 'A3';
enemies.E12.align = 'elemental';
enemies.E12.drop =  'dropItem("I71")+rareItemDrop("I27",epicDrop,1,"drop")+rareItemDrop("I173",uncommonDrop,1,"drop")+rareItemDrop("I288",rareDrop,1,"drop")';
enemies.E12.attackChance = 'castTerragosa()';
enemies.E12.tag = 'areaBoss';
enemies.E12.difficulty = 'boss';
enemies.E12.bigEnemy = true;
enemies.E12.bestiaryItem = 'bestiaryItem("I27","drop",epicDrop)+bestiaryItem("I288","drop",rareDrop)+bestiaryItem("I173","drop",uncommonDrop)+bestiaryItem("I71","drop")';
enemies.E12.bestiarySkills = "❖"+buffIcon("B37")+"Prismatic Shield: Increase attack after receiving"+natureIcon+"Nature Damage. Starts at 1 stack. <br>❖ Dragon Claws: Inflicts"+buffIcon("B52")+"Wounded.<br>❖ Crystal Breath: Inflicts"+buffIcon("B24")+"Burning.";
enemies.E12.firstTimeReward = true;

enemies.E55 = {};
enemies.E55.name = 'Shatterstrasza';
enemies.E55.level = '[lvl 60]';
enemies.E55.hp = 450000000000;
enemies.E55.description = 'The will of protection of Granite Grotto, shapen up to a terrifying beast.';
enemies.E55.attack = 500000000;
enemies.E55.exp = returnExp(30)/250;
enemies.E55.area = 'A3';
enemies.E55.align = 'deific';
enemies.E55.drop =  "rareItemDrop('I101',1, 50);rareItemDrop('I378',1);"; 
enemies.E55.attackChance = 'castShatterstrasza()';
enemies.E55.tag = 'areaBoss';
enemies.E55.bigEnemy = true;
enemies.E55.bestiaryItem = 'bestiaryItem("I378","rare")+"<br>"+bestiaryItem("I101","rare")';
enemies.E55.bestiarySkills = "❖"+buffIcon("B37")+"Prismatic Will: Increase attack after receiving any damage other than"+mightIcon+"Might Damage.<br>❖ Drake Claws: Inflicts"+buffIcon("B52")+"Wounded.<br>❖ Dragonsoul Breath: Inflicts"+buffIcon("B25")+"Hex.";
enemies.E55.ignoreBestiary = true;

enemies.E28 = {};
enemies.E28.name = 'Dai-Goran';
enemies.E28.level = '[lvl 37]';
enemies.E28.hp = 330000000;
enemies.E28.description = 'A legendary creature revered as a god of an ancient tribe.'
enemies.E28.attack = 300000;
enemies.E28.exp = 0;
enemies.E28.area = 'A7';
enemies.E28.align = 'might';
enemies.E28.tag = "showdownBoss";
enemies.E28.attackChance = 'castDaiGoran()'
enemies.E28.showdown = "S2";
enemies.E28.bestiarySkills = "❖ Talon Quill: Inflicts"+buffIcon("B1")+"Poison.<br>❖"+buffIcon("B34")+"Basilisk Stare: Inflicts"+buffIcon("B35")+"Petrified.";

enemies.E46 = {};
enemies.E46.name = 'DPS Tester';
enemies.E46.level = '[lvl ??]';
enemies.E46.attack = 0;
enemies.E46.hp = 10000000000000;
enemies.E46.description = 'You feel your sins crawling on your back'
enemies.E46.attackChance = 'castDpsTester()'
enemies.E46.exp = 1;
enemies.E46.ignoreBestiary = true;

enemies.E16 = {};
enemies.E16.name = 'Hollog';
enemies.E16.level = '[lvl 31]';
enemies.E16.hp = 3200000;
enemies.E16.description = 'A stumpy fellow that, despite appearing ghastly, has no trouble in making friends.'
enemies.E16.area = 'A4';
enemies.E16.attack = 100000;
enemies.E16.exp = returnExp(31)/1800;
enemies.E16.difficulty = 'easy';
enemies.E16.align = 'occult';
enemies.E16.drop =  "dropItem('I40'); rareItemDrop('I72', mythicDrop,1,'drop')";
enemies.E16.bestiaryItem = 'bestiaryItem("I40", "drop")+bestiaryItem("I72", "drop", mythicDrop)';

enemies.E17 = {};
enemies.E17.name = 'Caladora';
enemies.E17.level = '[lvl 34]';
enemies.E17.hp = 8000000;
enemies.E17.description = 'A genetic monstrosity between a pumpkin and a dragon. On second thought, it looks kind of cute.'
enemies.E17.area = 'A4';
enemies.E17.attack = 300000;
enemies.E17.exp = returnExp(34)/1800;
enemies.E17.difficulty = 'medium';
enemies.E17.align = 'nature';
enemies.E17.drop =  "dropItem('I58'); ";
enemies.E17.bestiaryItem = 'bestiaryItem("I58", "drop")+bestiaryItem("I215", "steal","1/70 up to 1/"+commonThief)';

enemies.E18 = {};
enemies.E18.name = 'Morgato';
enemies.E18.level = '[lvl 37]';
enemies.E18.hp = 32000000;
enemies.E18.description = 'An amalgamation of souls manifested into corporeal form. As to why they manifested into this shape, one can only guess.';
enemies.E18.area = 'A4';
enemies.E18.attack = 250000;
enemies.E18.exp = returnExp(37)/1800;
enemies.E18.difficulty = 'hard';
enemies.E18.align = 'deific';
enemies.E18.drop =  "dropItem('I18');";
enemies.E18.attackChance = 'if (enemyPhase===1){}';
enemies.E18.bestiaryItem = 'bestiaryItem("I18", "drop")+bestiaryItem("I345", "steal","1/400 up to 1/"+rareThief)';

enemies.E30 = {};
enemies.E30.name = 'La Creatura';
enemies.E30.level = '[lvl ??]';
enemies.E30.hp = 50000000000;
enemies.E30.area = 'A4';
enemies.E30.description = 'What in tarnation';
enemies.E30.attack = 4000000;
enemies.E30.exp = 69;
enemies.E30.tag = 'areaBoss';
enemies.E30.align = 'occult';
enemies.E30.bestiaryItem = 'bestiaryItem("I345", "steal","1/60 up to 1/"+rareThief)';
enemies.E30.attackChance = 'playSound("audio/creatura2.mp3");';
enemies.E30.ignoreBestiaryPercentage = true;
enemies.E30.noMedal = true;

var fishingJunk = { I88:{P:35, A:1}, I89:{P:35, A:1}, I158:{P:35, A:1} , I216:{P:50000, A:1} /*golden trash*/ }
var fishingEeriePond1 = { I161:{P:10, A:1}, /*skelefish*/ I160:{P:50, A:1}, /*devilfish*/  I159:{P:200, A:1}, /*jellyfish*/}
var fishingEeriePond2 = { I169:{P:epicDrop/4, A:1}, /*the catch*/ I286:{P:30, A:1}, /*quest*/}

enemies.E20 = {};
enemies.E20.name = 'Eerie Pond';
enemies.E20.level = '';
enemies.E20.difficulty = 'pond';
enemies.E20.area = 'A4';
enemies.E20.hp = 20;
enemies.E20.description = 'A shadow-laden pond cloaked in an eerie mist. Grab a fishing rod and don\'t get your hopes too high.'
enemies.E20.exp = returnExp(34)/1800;
enemies.E20.drop = " rollTable(fishingJunk, 4-playerFishingLevel);  rollTable(fishingEeriePond1, Math.min(playerFishingLevel,5)); rollTable(fishingEeriePond2, Math.min(-2+playerFishingLevel,2));  rollTable(eeriePondCollectibles, 1); removeTableItem()";
//enemies.E20.bestiaryItem = 'bestiaryTag("Requires: 🎣 Fishing Level 1")+bestiaryItem("I161","drop")+bestiaryItem("I159","drop")+bestiaryTag("Requires: 🎣 Fishing Level 3")+ bestiaryItem("I169","drop")';
enemies.E20.bestiaryItem = 'bestiaryItem("I161","drop",10+" up to 1/"+10/5)+bestiaryItem("I160","drop",50+" up to 1/"+50/5)+bestiaryItem("I159","drop",200+" up to 1/"+200/5)+colorTag("🎣3","#446262")+ bestiaryItem("I169","drop",epicDrop/4+" up to 1/"+epicDrop/4/2)';

//e21 is reserved for the sheep of polymorph 

enemies.E24 = {};
enemies.E24.name = 'Pirate Parrot';
enemies.E24.level = '[lvl 38]';
enemies.E24.hp = 200000000;
enemies.E24.description = 'A chatty fellow tasked to guard the bar.'
enemies.E24.area = 'A6';
enemies.E24.attack = 6000000;
enemies.E24.drop =  "rareItemDrop('I39', 1)";
enemies.E24.exp = 0;
enemies.E24.difficulty = 'easy';
enemies.E24.align = 'might';
enemies.E24.bestiaryItem = 'bestiaryItem("I39","drop",1)';
enemies.E24.tag = 'dungeonEnemy';

enemies.E25 = {};
enemies.E25.name = 'Malvarrel';
enemies.E25.level = '[lvl 40]';
enemies.E25.hp = 1500000000; 
enemies.E25.area = 'A6';
enemies.E25.description = 'A terrible mutation manifested by the evil deeds of pirates.'
enemies.E25.attack = 5000000;
enemies.E25.exp = 0;
enemies.E25.align = 'occult';
enemies.E25.drop =  'rareItemDrop("I23",rareDungeon,1,"drop")+rareItemDrop("I467", relicDungeon)+rareItemDrop("I39",1, 10)'
enemies.E25.tag = "stageBoss1";
enemies.E25.attackChance = 'castMalvarrel()';
enemies.E25.bigEnemy = true;
enemies.E25.bestiaryItem = 'bestiaryItem("I23","drop",rareDungeon)+bestiaryItem("I467","drop",relicDungeon)'
enemies.E25.bestiarySkills = "❖ Booze Shot: Inflicts"+buffIcon("B1")+"Poison.<br>❖ Evil Stream: Inflicts"+buffIcon("B25")+"Hex.";
enemies.E25.firstTimeReward = true;

//var plunderDrop =  { I147:{P:uncommonDungeon,A:1}, I146:{P:uncommonDungeon,A:1}, I145:{P:uncommonDungeon,A:1}, I144:{P:uncommonDungeon,A:1}, I143:{P:uncommonDungeon,A:1},  /*armor*/  I167:{P:epicDungeon,A:1},  /*scimitar*/ I61:{P:rareDungeon,A:1},  /*card*/} 
enemies.E26 = {};
enemies.E26.name = 'Cap. Plundergeist';
enemies.E26.level = '[lvl 40]';
enemies.E26.hp = 4500000000;
enemies.E26.description = 'The restless spirit of the pirate captain. Be sure to not drag the fight for too long.';
enemies.E26.attack = 5000000;
enemies.E26.exp = 0;
enemies.E26.area = 'A6';
enemies.E26.align = 'might';
enemies.E26.drop =  'rareItemDrop("I39",1, 10)+rareItemDrop("I147",uncommonDungeon,1,"drop")+rareItemDrop("I146",uncommonDungeon,1,"drop")+rareItemDrop("I145",uncommonDungeon,1,"drop")+rareItemDrop("I144",uncommonDungeon,1,"drop")+rareItemDrop("I143",uncommonDungeon,1,"drop")+rareItemDrop("I167",epicDungeon,1,"drop")+rareItemDrop("I61",rareDungeon,1,"drop");                          shopItems.A4S14.unlocked = true; shopItems.A4S15.unlocked = true;shopItems.A4S16.unlocked = true;shopItems.A4S20.unlocked = true;';
enemies.E26.tag = "finalBoss";
enemies.E26.attackChance = 'castPlundergeist()';
enemies.E26.bigEnemy = true;
enemies.E26.bestiaryItem = 'bestiaryItem("I147","container","Ghastly Pirate Set",uncommonDungeon)+bestiaryItem("I167","drop",epicDungeon)+bestiaryItem("I61","drop",rareDungeon)';
enemies.E26.bestiarySkills = "❖ Harvest Magic: Inflicts"+buffIcon("B17")+"Silence.<br>❖ Cursed Rend: Inflicts one stack of"+buffIcon("B15")+"Curse.";
//enemies.E26.bestiaryLoot = 'I206';
enemies.E26.firstTimeReward = true;

enemies.E27 = {};
enemies.E27.name = 'Infernalus';
enemies.E27.level = '[lvl 40]';
enemies.E27.hp = 1450000000;
enemies.E27.description = 'The lord of hellfire. Not a self-proclaimed title, everyone just kinda agreed on it after looking at it once.'
enemies.E27.attack = 1100000;
enemies.E27.area = 'A4';
enemies.E27.exp = returnExp(40)/1800;
enemies.E27.align = 'elemental';
enemies.E27.drop =  'rareItemDrop("I28",rareDrop,1,"drop")+rareItemDrop("I175",uncommonDrop,1,"drop")+rareItemDrop("I282",uncommonDrop,1,"drop")+rareItemDrop("I65",rareDrop,1,"drop")+dropItem("I100")';
enemies.E27.attackChance = 'castInfernalus();';
enemies.E27.tag = 'areaBoss';
enemies.E27.difficulty = 'boss';
enemies.E27.bigEnemy = true;
enemies.E27.bestiaryItem = 'bestiaryItem("I28","drop",rareDrop)+bestiaryItem("I65","drop",rareDrop)+bestiaryItem("I175","drop",uncommonDrop)+bestiaryItem("I282","drop",uncommonDrop)+bestiaryItem("I90","steal", "1/150 up to 1/5")+bestiaryItem("I100","drop")';
enemies.E27.bestiarySkills = "❖ Hellfire Slash: Inflicts"+buffIcon("B24")+"Burning.<br>❖ Smog Blast: Inflicts"+buffIcon("B23")+"Blind.";
enemies.E27.firstTimeReward = true;

enemies.E33 = {};
enemies.E33.name = 'Relicolo';
enemies.E33.level = '[lvl 41]';
enemies.E33.hp = 300000000;
enemies.E33.description = 'A stumpy reanimated stone, woken up after millions of years.'
enemies.E33.area = 'A8';
enemies.E33.attack = 3500000;
enemies.E33.difficulty = 'easy';
enemies.E33.exp = returnExp(41)/1800;
enemies.E33.drop = "dropItem('I346');";
enemies.E33.align = 'elemental';
enemies.E33.bestiaryItem = 'bestiaryItem("I346","drop")+bestiaryItem("I386", "steal","1/300 up to 1/"+rareThief)';

enemies.E34 = {};
enemies.E34.name = 'Dragoraro';
enemies.E34.level = '[lvl 44]';
enemies.E34.hp = 1400000000;
enemies.E34.description = 'An amalgamation of strange fossils merged into one powerful predator. Its jaws can press up to five hundred tons.'
enemies.E34.area = 'A8';
enemies.E34.attack = 27000000;
enemies.E34.difficulty = 'medium';
enemies.E34.exp = returnExp(44)/1800;
enemies.E34.drop =  "dropItem('I347'); rareItemDrop('I471',relicDrop);";
enemies.E34.align = 'nature';
enemies.E34.defenseChance = 'if (["mattock"].includes(items[rpgPlayer.weaponSlot].tag) && playerGatheringLevel>3) { rareItemDrop("I398",1)  }';
enemies.E34.bestiaryItem = 'bestiaryItem("I347","drop")+bestiaryItem("I471","drop",relicDrop)+colorTag("⛏️4","#446262")+bestiaryItem("I398","drop")';

enemies.E37 = {};
enemies.E37.name = 'Fossil Deposit';
enemies.E37.level = '';
enemies.E37.difficulty = 'ore';
enemies.E37.area = 'A8';
enemies.E37.hp = 75;
enemies.E37.description = 'A rich cluster of fossilised remains waiting to be uncovered by brave tortugas.'
enemies.E37.exp = returnExp(42)/1800;
enemies.E37.drop = "dropItem('I417'); rollTable(fossilCollectibles, 1)";
enemies.E37.tag = "ore";
enemies.E37.gatheringLevel = 3;
enemies.E37.bestiaryItem = 'bestiaryTag("Requires: ⛏️ Gathering Level 3")+bestiaryItem("I417")';

enemies.E35 = {}; 
enemies.E35.name = 'Akumuro';
enemies.E35.level = '[lvl 47]';
enemies.E35.hp = 19000000000;
enemies.E35.description = 'The manifestation of evil thoughts evoked into drawings by the turtles of old. It is better to not know what some of them were painting.'
enemies.E35.area = 'A8';
enemies.E35.attack = 70000000; 
enemies.E35.exp = returnExp(47)/1800;
enemies.E35.difficulty = 'hard';
enemies.E35.drop = "dropItem('I348'); rareItemDrop('I321',epicDrop,1,'drop');";
enemies.E35.align = 'occult';
enemies.E35.bestiaryItem = 'bestiaryItem("I348","drop")+bestiaryItem("I321","drop",epicDrop)';

enemies.E36 = {};
enemies.E36.name = 'Eis Zeith';
enemies.E36.level = '[lvl 50]';
enemies.E36.hp = 380000000000;
enemies.E36.description = 'Tasked with protecting the valley millions of years ago, its mission remains unchanged.'
enemies.E36.attack = 160000000;
enemies.E36.area = 'A8';
enemies.E36.exp = returnExp(50)/1800;
enemies.E36.align = 'deific';
enemies.E36.drop =  'rareItemDrop("I319",epicDrop,1,"drop")+rareItemDrop("I383",rareDrop,1,"drop")+rareItemDrop("I425",uncommonDrop,1,"drop")+dropItem("I350"); logs.P61B.unlocked=true;'; 
enemies.E36.attackChance = 'castEisZeith()';
enemies.E36.tag = 'areaBoss';
enemies.E36.difficulty = 'boss';
enemies.E36.bigEnemy = true;
enemies.E36.bestiaryItem = 'bestiaryItem("I319","drop",epicDrop)+bestiaryItem("I383","drop",rareDrop)+bestiaryItem("I425","drop",uncommonDrop)+bestiaryItem("I350","drop")';
enemies.E36.bestiarySkills = "❖ Soulfire: Inflicts"+buffIcon("B24")+"Burning.<br>❖"+buffIcon("B39")+"Thunder Stomp: Deals High"+mightIcon+"Might Damage and Inflicts"+buffIcon("B21")+"Paralysis.<br>❖"+buffIcon("B34")+"Rage of Ancients: Deals Very High"+deificIcon+"Deific Damage";
enemies.E36.firstTimeReward = true;

enemies.E54 = {};
enemies.E54.name = 'Raijin-Goran';
enemies.E54.level = '[lvl 60]';
enemies.E54.hp = 4000000000000;
enemies.E54.area = 'A8';
enemies.E54.description = 'A really distant relative of a certain lizard we all know and love.'
enemies.E54.attack = 1500000000;
enemies.E54.exp = returnExp(52)/1800;
enemies.E54.align = 'nature';
enemies.E54.drop =  "rareItemDrop('I371', rareDrop); logs.P63.unlocked=true;";
enemies.E54.tag = "areaBoss";
enemies.E54.attackChance = 'castRaijinGoran()';
enemies.E54.bestiaryItem = 'bestiaryItem("I371","drop",rareDrop)'
enemies.E54.bigEnemy = true;
enemies.E54.bestiarySkills = "❖ Primal Instincts: Every time it attacks, gain one stack of"+buffIcon("B26")+"Enrage.<br>❖"+buffIcon("B39")+"Thunder God Raiga: High"+elementalIcon+"Elemental Damage, increases"+buffIcon("B26")+"Enrage by 10 Stacks.";
enemies.E54.firstTimeReward = true;
enemies.E54.noMedal = true;

enemies.E44 = {};
enemies.E44.name = 'Primarder';
enemies.E44.level = '[lvl 45]';
enemies.E44.hp = 120000000000;
enemies.E44.description = 'An unknown vagabond of darkness on an unknown quest of its own. Appearing on full moon and wielding a sword, the rest is history.'
enemies.E44.attack = 160000000;
enemies.E44.exp = 0;
enemies.E44.area = 'A7';
enemies.E44.tag = "showdownBoss";
enemies.E44.showdown = "S3";
enemies.E44.attackChance = 'castPrimarder()'
enemies.E44.align = 'might';
enemies.E44.bestiarySkills = "❖ Killing Instincts: Inflicts"+buffIcon("B31")+"Seized.<br>❖"+buffIcon("B34")+"Lustrous Armor: "+buffIcon("B28")+"Reflects Skill Damage.";

enemies.E38 = {};
enemies.E38.name = 'Kleiner';
enemies.E38.level = '[lvl 51]';
enemies.E38.hp = 30000000000;
enemies.E38.description = 'An automata tasked with basic maintenance functions within the facility.'
enemies.E38.area = 'A9';
enemies.E38.attack = 370000000;
enemies.E38.difficulty = 'easy';
enemies.E38.exp = returnExp(51)/2000;
enemies.E38.drop = "dropItem('I351');";
enemies.E38.align = 'might';
enemies.E38.bestiaryItem = 'bestiaryItem("I351","drop")';

enemies.E39 = {};
enemies.E39.name = 'Maholem';
enemies.E39.level = '[lvl 54]';
enemies.E39.hp = 80000000000;
enemies.E39.description = 'Construct of magic golemancy with offensive and defensive capabilities. It can analyse data and adapt to it.'
enemies.E39.area = 'A9';
enemies.E39.attack = 900000000;
enemies.E39.difficulty = 'medium';
enemies.E39.exp = returnExp(54)/2000;
enemies.E39.drop =  "dropItem('I352');";
enemies.E39.align = 'nature';
enemies.E39.bestiaryItem = 'bestiaryItem("I352","drop")+bestiaryItem("I490", "steal","1/100 up to 1/"+commonThief)';

enemies.E45 = {};
enemies.E45.name = 'T.U.R.T.L.E';
enemies.E45.level = '[lvl 58]';
enemies.E45.hp = 2000000000000;
enemies.E45.description = 'Tactical unmanned robotic turtle lifeform exterminator, or T.U.R.T.L.E for short. A machine created by the scions of mankind, the enemies of turtles.'
enemies.E45.attack = 2500000000;
enemies.E45.exp = 0;
enemies.E45.area = 'A7';
enemies.E45.tag = "showdownBoss";
enemies.E45.showdown = "S4";
enemies.E45.align = 'elemental';
enemies.E45.attackChance = 'castTURTLE()'
enemies.E45.animation = 'ranged';
enemies.E45.bestiarySkills = "❖ Antimagi EMP: Inflict"+buffIcon("B22")+"Spell Fizz.<br>❖"+buffIcon("B39")+"Self-Repair Protocol: Become"+buffIcon("B33")+"Invulnerable and regain Health.";

enemies.E40 = {}; 
enemies.E40.name = 'Arcanite Tower';
enemies.E40.level = '[lvl 57]';
enemies.E40.hp = 140000000000;
enemies.E40.description = 'The last bastion of defense of the workshop. Gating the very end of the prison quarters, tasked to attack anything on sight.'
enemies.E40.area = 'A9';
enemies.E40.attack = 5000000000; 
enemies.E40.exp = returnExp(57)/2000;
enemies.E40.difficulty = 'hard';
enemies.E40.attackChance = 'castArcaniteTower();';
enemies.E40.drop = "dropItem('I353')+rareItemDrop('I375',rareDrop,1,'drop')";
enemies.E40.align = 'elemental';
enemies.E40.bestiaryItem = 'bestiaryItem("I353","drop")+bestiaryItem("I375","drop",rareDrop)';
enemies.E40.bigEnemy = true;
enemies.E40.animation = 'ranged';

enemies.E42 = {};
enemies.E42.name = 'Dreambulb Fiora';
enemies.E42.level = '';
enemies.E42.difficulty = 'herb';
enemies.E42.area = 'A9';
enemies.E42.hp = 75;
enemies.E42.attack = 1;
enemies.E42.description = 'A botanical specimen thought to be lost long ago, somehow brought to life by sheer magic. It seems this specific strain has assimilated the magical particles in the air.'
enemies.E42.exp = returnExp(55)/2000;
enemies.E42.drop = "dropItem('I355'); rollTable(dataclusterCollectibles, 1)";
enemies.E42.gatheringLevel = 4;
enemies.E42.bestiaryItem = 'bestiaryTag("Requires: ⛏️ Gathering Level 4")+bestiaryItem("I355","drop")';

enemies.E41 = {};
enemies.E41.name = 'Xezdeth';
enemies.E41.level = '[lvl 60]';
enemies.E41.hp = 10000000000000;
enemies.E41.description = 'An ancient imprisoned fiend, now free from its chains.'
enemies.E41.attack = 5000000000;
enemies.E41.area = 'A9';
enemies.E41.exp = returnExp(60)/2000;
enemies.E41.align = 'elemental';
enemies.E41.drop =  'rareItemDrop("I378",epicDrop,1,"drop")+rareItemDrop("I82",rareDrop,1,"drop")+rareItemDrop("I376",rareDrop,1,"drop")+dropItem("I354")'; 
enemies.E41.bestiaryItem = 'bestiaryItem("I378","drop",epicDrop)+bestiaryItem("I82","drop",rareDrop)+bestiaryItem("I376","drop",rareDrop)+bestiaryItem("I354","drop")'
enemies.E41.attackChance = 'castXezdeth()';
enemies.E41.tag = 'areaBoss';
enemies.E41.difficulty = 'boss';
enemies.E41.bigEnemy = true;
enemies.E41.bestiarySkills = "❖ Daemon Flame: Inflicts"+buffIcon("B24")+"Burning and"+buffIcon("B25")+"Hex.<br>❖"+buffIcon("B39")+"Dark Blast: High"+occultIcon+"Occult Damage and removes all stacks of"+buffIcon("B24")+"Burning.<br>❖"+buffIcon("B34")+"Conflagrate Soul: Extreme"+elementalIcon+"Elemental Damage if the target is not"+buffIcon("B24")+"Burning.";
enemies.E41.firstTimeReward = true;

enemies.E47 = {};
enemies.E47.name = 'Dusk Cultist';
enemies.E47.level = '[lvl 60]';
enemies.E47.hp = 1000000000000; 
enemies.E47.description = 'A suspicious robed member of the dusk temple. He didn\'t do anything nefarious yet, but you just know hes dying to do so.'
enemies.E47.area = 'A10';
enemies.E47.attack = 12000000000;
enemies.E47.drop =  "rareItemDrop('I313', 1)";
enemies.E47.exp = 0;
enemies.E47.difficulty = 'easy';
enemies.E47.align = 'occult';
enemies.E47.bestiaryItem = 'bestiaryItem("I313","rare",1)';
enemies.E47.tag = 'dungeonEnemy';

enemies.E48 = {};
enemies.E48.name = 'Kaw-Kaw';
enemies.E48.level = '[lvl 62]';
enemies.E48.hp = 18000000000000;
enemies.E48.area = 'A10';
enemies.E48.description = 'A devoted raven priest of the highest order of the Dusk.'
enemies.E48.attack = 14000000000;
enemies.E48.exp = 0;
enemies.E48.align = 'deific';
enemies.E48.drop =  'rareItemDrop("I206",rareDungeon,1,"drop")+rareItemDrop("I313",1, 10)+rareItemDrop("I498",rareDungeon,1,"drop")';
enemies.E48.tag = "stageBoss1";
enemies.E48.attackChance = 'castKawKaw()';
enemies.E48.bestiaryItem = 'bestiaryItem("I206","drop",rareDungeon)+bestiaryItem("I498","drop",rareDungeon)'
enemies.E48.bestiarySkills = "❖ Dark Thunder: Deals High"+occultIcon+"Occult Damage and inflicts"+buffIcon("B25")+"Hex and"+buffIcon("B17")+"Silence.<br>❖"+buffIcon("B39")+"Holy Word: Heals the user";

enemies.E49 = {};
enemies.E49.name = 'Yog-Kulth';
enemies.E49.level = '[lvl 63]';
enemies.E49.hp = 80000000000000; 
enemies.E49.area = 'A10';
enemies.E49.description = 'A dark entity transported from a realm without turtles. Clearly the worse realm.'
enemies.E49.attack = 16000000000;
enemies.E49.exp = 0;
enemies.E49.align = 'occult';
enemies.E49.drop =  "rareItemDrop('I325',mythicDungeon,1,'drop'); rareItemDrop('I495',uncommonDungeon,1,'drop'); rareItemDrop('I313',1, 10); rareItemDrop('I470',relicDungeon); sendMail('MF7'); shopItems.A9S7.unlocked = true; shopItems.A9S8.unlocked = true; shopItems.A9S9.unlocked = true; shopItems.A9S10.unlocked = true; shopItems.A9S11.unlocked = true;"; // shopItems.A8S18.unlocked = true;
enemies.E49.tag = "finalBoss";
enemies.E49.attackChance = 'castYogKulth()';
enemies.E49.bigEnemy = true;
enemies.E49.bestiaryItem = 'bestiaryItem("I325","drop",mythicDungeon)+bestiaryItem("I495","drop",uncommonDungeon)+bestiaryItem("I470","drop",relicDungeon)'
enemies.E49.bestiarySkills = "❖ Inflicts the"+buffIcon("B41")+"Sanity debuff at the start of the fight. If it reaches 0, you will rapidly lose Health.<br>❖"+buffIcon("B39")+"Corruption: High"+natureIcon+"Nature Damage and decreases"+buffIcon("B41")+"Sanity by 15.<br>❖"+buffIcon("B42")+"Mindfly: Enemy attacks will drain 5 more"+buffIcon("B41")+"Sanity until"+deificIcon+"Deific Damage is dealt.<br>❖"+buffIcon("B34")+"Time Has Cometh: Drain 40"+buffIcon("B41")+"Sanity if your Health is under 80%.";
enemies.E49.animation = 'ranged';
enemies.E49.bigEnemy = true;

enemies.E56 = {};
enemies.E56.name = 'Lady of the Lake';
enemies.E56.level = '[lvl 65]';
enemies.E56.hp = 200000000000000;
enemies.E56.area = 'A8';
enemies.E56.description = 'A vestige of a shadow appearing atop the lake during full moon. Seen by everyone, yet no one remembers.'
enemies.E56.attack = 30000000000;
enemies.E56.exp = returnExp(65)/1800;
enemies.E56.align = 'nature';
enemies.E56.drop =  "rareItemDrop('I497', 1); rareItemDrop('I320', rareDrop);";
enemies.E56.tag = "areaBoss";
enemies.E56.area = 'A4';
enemies.E56.attackChance = 'castLadyoftheLake()';
enemies.E56.bestiaryItem = 'bestiaryItem("I497","drop",1);bestiaryItem("I320","drop",rareDrop);'
enemies.E56.bestiarySkills = "❖"+buffIcon("B39")+"Holy Spear: High"+deificIcon+"Deific Damage, creates a Holy Lance Splinter in the inventory.<br>❖"+buffIcon("B34")+"Avalon Curse: Medium"+occultIcon+"Occult Damage and inflicts"+buffIcon("B30")+"Zombie.<br>[Second Phase] ❖ Avalon Ward: Periodically become "+buffIcon("B33")+"Invulnerable.<br>[Second Phase] ❖ Drown Already!: Inflicts"+buffIcon("B15")+"Curse.";
enemies.E56.firstTimeReward = true;
enemies.E56.noMedal = true;

enemies.E50 = {};
enemies.E50.name = 'Dawn Cultist';
enemies.E50.level = '[lvl 60]';
enemies.E50.hp = 10000000000; 
enemies.E50.description = 'A suspicious robed member of the dawn temple. He promises to never do anything nefarious, yet here we are.'
enemies.E50.area = 'A11';
enemies.E50.attack = 300000000;
enemies.E50.drop =  "rareItemDrop('I314', 20)";
enemies.E50.exp = 0;
enemies.E50.difficulty = 'easy';
enemies.E50.align = 'might';
enemies.E50.bestiaryItem = 'bestiaryItem("I314","rare")';
enemies.E50.tag = 'dungeonEnemy';
enemies.E50.ignoreBestiary = true;

var virtueDrops = { I324:{P:5, A:1}, /*weapon*/ I339:{P:4, A:1}, I340:{P:4, A:1} }
enemies.E51 = {};
enemies.E51.name = 'Virtue';
enemies.E51.level = '[lvl 60]';
enemies.E51.hp = 200000000000; //
enemies.E51.area = 'A11';
enemies.E51.description = 'A manifested concept by prayers. Bright and shining, it is tasked with illuminating the paths of salvation. Or so it says.'
enemies.E51.attack = 100000000;
enemies.E51.exp = 0;
enemies.E51.align = 'deific';
enemies.E51.drop =  "rollTable(virtueDrops, 1); shopItems.A9S13.unlocked = true;shopItems.A9S14.unlocked = true;shopItems.A9S15.unlocked = true;";
enemies.E51.tag = "stageBoss1";
enemies.E51.attackChance = 'castVirtue()';
enemies.E51.bestiaryItem = 'bestiaryItem("I324","container")+bestiaryItem("I339","container")+bestiaryItem("I340","container")'
enemies.E51.bestiarySkills = "❖"+buffIcon("B39")+"Faithfire: Inflicts"+buffIcon("B24")+"Burning.<br>❖"+buffIcon("B34")+"Repentance: Inflicts"+buffIcon("B30")+"Zombie.";
enemies.E51.ignoreBestiary = true;

enemies.E52 = {};
enemies.E52.name = 'Principality';
enemies.E52.level = '[lvl 63]';
enemies.E52.hp = 1500000000000; //
enemies.E52.area = 'A11';
enemies.E52.description = 'A manifested concept by prayers. Just and harmonious, it is tasked with mediating between the higher godly orders and turtles. Or so it says.'
enemies.E52.attack = 400000000;
enemies.E52.exp = 0;
enemies.E52.align = 'deific';
enemies.E52.drop =  "shopItems.A9S16.unlocked = true;shopItems.A9S17.unlocked = true;";
enemies.E52.tag = "stageBoss2";
enemies.E52.attackChance = 'castPrincipality()';
enemies.E52.bestiaryItem = 'bestiaryItem("I23","rare")'
enemies.E52.bestiarySkills = "❖ Corruptible Will: Gain five Stacks of"+buffIcon("B26")+"Enraged on attack, increasing damage dealt. Receiving"+occultIcon+"Occult Damage reduces the Stacks by 1.<br>❖"+buffIcon("B39")+"Stomp: Inflicts"+buffIcon("B21")+"Paralysis.";
enemies.E52.ignoreBestiary = true;

enemies.E53 = {};
enemies.E53.name = 'Dominion';
enemies.E53.level = '[lvl 65]';
enemies.E53.hp = 3000000000000; //
enemies.E53.area = 'A11';
enemies.E53.description = 'A manifested concept by prayers. Regal and authoritative, it is tasked with executing divine orders. Or so it says.'
enemies.E53.attack = 800000000;
enemies.E53.exp = 0;
enemies.E53.align = 'deific';
enemies.E53.drop =  "shopItems.A9S18.unlocked = true;";
enemies.E53.tag = "finalBoss";
enemies.E53.attackChance = 'castDominion()';
enemies.E53.defenseChance = ' if (currentHP < enemies[stats.currentEnemy].hp*0.35 && enemyPhase===1) {castDominion("bobi")} ';
enemies.E53.bigEnemy = true;
enemies.E53.bestiaryItem = 'bestiaryItem("I23","rare")'
enemies.E53.bestiarySkills = "❖ Light Of Ruin: Inflicts"+buffIcon("B24")+"Burning.<br>❖"+buffIcon("B39")+"Zealous Sentence: Inflicts"+buffIcon("B17")+"Silence."+bestiaryTag("Second Phase")+"❖ Five Crowns: Periodically rotates alignment buffs. If no corresponding alignment damage is dealt before the buff expires, restores a portion of the Health. Dealing damage of the corresponding alignment of the buff will cancel it.";
enemies.E53.ignoreBestiary = true;

enemies.R1 = {};
enemies.R1.name = 'Seaprism Slug';
enemies.R1.level = '[lvl 30]';
enemies.R1.hp = 200000;
enemies.R1.attack = 100000;
enemies.R1.exp = 518;
enemies.R1.align = 'elemental';
enemies.R1.tag = "skirmish";
enemies.R1.ignoreBestiary = true;

enemies.R2 = {};
enemies.R2.name = 'Devotree';
enemies.R2.level = '[lvl 35]';
enemies.R2.hp = 500000;
enemies.R2.attack = 200000;
enemies.R2.exp = 518;
enemies.R2.align = 'deific';
enemies.R2.tag = "wave2";
enemies.R2.showdown = "S1";
enemies.R2.ignoreBestiary = true;

enemies.R3 = {};
enemies.R3.name = 'Fluffarose';
enemies.R3.level = '[lvl 35]';
enemies.R3.hp = 700000;
enemies.R3.attack = 600000;
enemies.R3.exp = 518;
enemies.R3.align = 'occult';
enemies.R3.tag = "wave3";
enemies.R3.showdown = "S1";
enemies.R3.ignoreBestiary = true;

enemies.R4 = {};
enemies.R4.name = 'Plasmite';
enemies.R4.level = '[lvl 35]';
enemies.R4.hp = 2000000;
enemies.R4.attack = 700000;
enemies.R4.exp = 518;
enemies.R4.align = 'elemental';
enemies.R4.tag = "wave4";
enemies.R4.showdown = "S1";
enemies.R4.ignoreBestiary = true;

enemies.R5 = {};
enemies.R5.name = 'Toximire';
enemies.R5.level = '[lvl 40]';
enemies.R5.hp = 3000000;
enemies.R5.attack = 900000;
enemies.R5.exp = 518;
enemies.R5.align = 'might';
enemies.R5.tag = "wave5";
enemies.R5.showdown = "S1";
enemies.R5.ignoreBestiary = true;

enemies.R6 = {};
enemies.R6.name = 'Sandiablo';
enemies.R6.level = '[lvl 40]';
enemies.R6.hp = 4000000;
enemies.R6.attack = 2000000;
enemies.R6.exp = 518;
enemies.R6.align = 'nature';
enemies.R6.tag = "wave6";
enemies.R6.showdown = "S1";
enemies.R6.ignoreBestiary = true;

enemies.R7 = {};
enemies.R7.name = 'Garabato';
enemies.R7.level = '[lvl 40]';
enemies.R7.hp = 5000000;
enemies.R7.attack = 3000000;
enemies.R7.exp = 518;
enemies.R7.align = 'occult';
enemies.R7.tag = "wave7";
enemies.R7.showdown = "S1";
enemies.R7.ignoreBestiary = true;


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

items.I434 = {}; 
items.I434.name = 'Nature Glitterstone';
items.I434.description = 'Material';
items.I434.flavor = '"An enhancement material dropped by nature aligned beings."';
items.I434.quality = 'Uncommon';
items.I434.sell = 5000;

items.I435 = {}; 
items.I435.name = 'Might Glitterstone';
items.I435.description = 'Material';
items.I435.flavor = '"An enhancement material dropped by might aligned beings."';
items.I435.quality = 'Uncommon';
items.I435.sell = 5000;

items.I436 = {}; 
items.I436.name = 'Elemental Glitterstone';
items.I436.description = 'Material';
items.I436.flavor = '"An enhancement material dropped by elemental aligned beings."';
items.I436.quality = 'Uncommon';
items.I436.sell = 5000;

items.I437 = {}; 
items.I437.name = 'Occult Glitterstone';
items.I437.description = 'Material';
items.I437.flavor = '"An enhancement material dropped by occult aligned beings."';
items.I437.quality = 'Uncommon';
items.I437.sell = 5000;

items.I438 = {}; 
items.I438.name = 'Deific Glitterstone';
items.I438.description = 'Material';
items.I438.flavor = '"An enhancement material dropped by deific aligned beings."';
items.I438.quality = 'Uncommon';
items.I438.sell = 5000;

items.I420 = {}; 
items.I420.name = 'Paleolithic Supply Box';
items.I420.description = 'Material';
items.I420.flavor = '"A container with materials necessary to construct various structures."';
items.I420.quality = 'Uncommon';
items.I420.sell = 500;

items.I421 = {}; 
items.I421.name = 'Wonder Supply Box';
items.I421.description = 'Material<br><FONT COLOR="coral">⚠ Not currently used in this version of the game. Not going to stop you from crafting it, though';
items.I421.flavor = '"A container with materials necessary to construct various structures."';
items.I421.quality = 'Uncommon';
items.I421.sell = 500;

items.I106 = {};
items.I106.name = 'Trapped Cage';
items.I106.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to summon Hoopperoona<FONT COLOR="gray"><br>(Boss summon items such as these can drop from any enemy in the area)'
items.I106.flavor = '"This is going to be a terrible night..."';
items.I106.quality = 'Uncommon';
items.I106.sell = 800;

items.I397 = {};
items.I397.name = 'Spider Evolution Shard';
items.I397.description = 'Consumable<br><FONT COLOR="#1EFF0C">Use: Evolve Hoopperoona into a higher lifeform'
items.I397.flavor = '"A faint dream about being the strongest."';
items.I397.quality = 'Rare';
items.I397.sell = 20000;
items.I397.use = ' if (stats.currentEnemy==="E4") {deleteEnemy("E31"); items.I397.count--; playSound("audio/hawk.mp3"); playSound("audio/explosion.mp3"); animParticleBurst(10 , "particleFire", "enemyPanel", 200); animParticleBurst(10 , "particleSpark", "enemyPanel", 200); animImageSplash("soundWave", "enemyPanel", "wave", 200); animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");} ;'

items.I412 = {};
items.I412.name = 'Tiger Evolution Shard';
items.I412.description = 'Consumable<br><FONT COLOR="#1EFF0C">Use: Evolve King-Kat into a higher lifeform'
items.I412.flavor = '"A faint dream about being world-famous."';
items.I412.quality = 'Rare';
items.I412.sell = 20000;
items.I412.use = ' if (stats.currentEnemy==="E8") {deleteEnemy("E32"); items.I412.count--; playSound("audio/hawk.mp3"); playSound("audio/explosion.mp3"); animParticleBurst(10 , "particleFire", "enemyPanel", 200); animParticleBurst(10 , "particleSpark", "enemyPanel", 200); animImageSplash("soundWave", "enemyPanel", "wave", 200); animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");} ;'

items.I431 = {};
items.I431.name = 'Dragon Evolution Shard';
items.I431.description = 'Consumable<br><FONT COLOR="#1EFF0C">Use: Evolve Terragosa into a higher lifeform'
items.I431.flavor = '"A faint dream about protecting your home."';
items.I431.quality = 'Rare';
items.I431.sell = 20000;
items.I431.use = ' if (stats.currentEnemy==="E12") {deleteEnemy("E55"); items.I431.count--; playSound("audio/hawk.mp3"); playSound("audio/explosion.mp3"); animParticleBurst(10 , "particleFire", "enemyPanel", 200); animParticleBurst(10 , "particleSpark", "enemyPanel", 200); animImageSplash("soundWave", "enemyPanel", "wave", 200); animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");} ;'

items.I164 = {}; 
items.I164.name = 'Hell Bindings';
items.I164.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to summon Infernalus'
items.I164.flavor = '"Sinister prison pulsating with the anguished cries of captive souls."';
items.I164.quality = 'Uncommon';
items.I164.sell = 1500;

items.I357 = {}; 
items.I357.name = 'Sacred Candle';
items.I357.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to summon Eis Zeith'
items.I357.flavor = '"An offering for a guardian beast of the past."';
items.I357.quality = 'Uncommon';
items.I357.sell = 2000;

items.I356 = {}; 
items.I356.name = 'Ars Goetia';
items.I356.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to summon Xezdeth';
items.I356.flavor = '"Hexxed grimoire capable of granting dominion to enslaved fiends."';
items.I356.quality = 'Uncommon';
items.I356.sell = 4500;

items.I358 = {};
items.I358.name = 'Ancient Fossil';
items.I358.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Summon a beast of the past on an ancient land'
items.I358.flavor = '"Nap time is over."';
items.I358.quality = 'Rare';
items.I358.sell = 15000;
items.I358.use = ' if (stats.currentArea==="A8") { bossTime=true; deleteEnemy("E54"); bossTime=true; items.I358.count--; playSound("audio/hawk.mp3"); animParticleBurst(10 , "particleFire", "enemyPanel", 200); animParticleBurst(10 , "particleSpark", "enemyPanel", 200); animImageSplash("soundWave", "enemyPanel", "wave", 200); animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1"); playSound("audio/explosion.mp3");} ;'

items.I386 = {};
items.I386.name = 'Lake Orb';
items.I386.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Use: ?????'
items.I386.flavor = '"Return it to its rightful owner."';
items.I386.quality = 'Rare';
items.I386.sell = 15000;
items.I386.use = ' if (enemies[stats.currentEnemy].difficulty==="pond") { bossTime=true; deleteEnemy("E56"); bossTime=true; items.I386.count--; playSound("audio/hawk.mp3"); animParticleBurst(10 , "particleFire", "enemyPanel", 200); animParticleBurst(10 , "particleSpark", "enemyPanel", 200); animImageSplash("soundWave", "enemyPanel", "wave", 200); animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1"); playSound("audio/explosion.mp3");} ;'

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
items.I57.quality = 'Uncommon';
items.I57.sell = 44;

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
items.I165.quality = 'Uncommon';
items.I165.sell = 70;

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
items.I71.quality = 'Uncommon';
items.I71.sell = 80;

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
items.I100.quality = 'Uncommon';
items.I100.sell = 120;

items.I346 = {};
items.I346.name = 'Ancient Brick';
items.I346.description = 'Material';
items.I346.flavor = '"Perfect material to build an ancient house."';
items.I346.quality = 'Common';
items.I346.sell = 91;

items.I347 = {};
items.I347.name = 'Fossilised Fang';
items.I347.description = 'Material';
items.I347.flavor = '"A coarse and extremely tough tooth."';
items.I347.quality = 'Common';
items.I347.sell = 99;

items.I348 = {};
items.I348.name = 'Eerie Mural';
items.I348.description = 'Material';
items.I348.flavor = '"A canvas only for the most wicked paintings."';
items.I348.quality = 'Common';
items.I348.sell = 112;

items.I350 = {};
items.I350.name = 'Spirit Ivory';
items.I350.description = 'Material';
items.I350.flavor = '"Sacred remains of an ancient spiritual beast. Can be used to forge dreams, or a piano."';
items.I350.quality = 'Uncommon';
items.I350.sell = 142;

items.I351 = {};
items.I351.name = 'Wonder Cog';
items.I351.description = 'Material';
items.I351.flavor = '"A gear that never rusts or decays. A miracle of engineering."';
items.I351.quality = 'Common';
items.I351.sell = 121;

items.I352 = {};
items.I352.name = 'Telluric Engrave';
items.I352.description = 'Material';
items.I352.flavor = '"The key reagent in magic golemancy. Magical constructs require at least one of these to function."';
items.I352.quality = 'Common';
items.I352.sell = 129;

items.I353 = {};
items.I353.name = 'Liquid Arcanite';
items.I353.description = 'Material';
items.I353.flavor = '"Arcanite melted at impossibly high temperatures with the use of magic. Once melted, it becomes stable if stored properly within this apparatus."';
items.I353.quality = 'Common';
items.I353.sell = 137;

items.I354 = {};
items.I354.name = 'Hellion Tethers';
items.I354.description = 'Material';
items.I354.flavor = '"Magical binds used to chain down a bigger threat. They can be used as materials with proper procedure."';
items.I354.quality = 'Uncommon';
items.I354.sell = 150;

items.I22 = {};
items.I22.name = 'Nephrite';
items.I22.description = 'Material';
items.I22.flavor = '"An impure variety of jade. Despite that, it still can fetch a good price."';
items.I22.quality = 'Common';
items.I22.sell = 150;

items.I42 = {};
items.I42.name = 'Malachite';
items.I42.description = 'Material';
items.I42.flavor = '"A striking green mineral, prized for its vivid color and used in jewelry for centuries."';
items.I42.quality = 'Uncommon';
items.I42.sell = 2000;

items.I418 = {};
items.I418.name = 'Shadow Diamond';
items.I418.description = 'Material';
items.I418.flavor = '"A deep purple gemstone with a sinister aura."';
items.I418.quality = 'Uncommon';
items.I418.sell = 10000;

items.I359 = {};
items.I359.name = 'Citrokine';
items.I359.description = 'Material';
items.I359.flavor = '"A gem with an unnatural orange luster."';
items.I359.quality = 'Uncommon';
items.I359.sell = 20000;

items.I194 = {}; 
items.I194.name = 'Flawless Nephrite';
items.I194.description = 'Material';
items.I194.flavor = '"A meticulously carved gemstone polished to perfection. Sells for a good price."';
items.I194.quality = 'Uncommon';
items.I194.sell = 6000*1.5;

items.I195 = {}; 
items.I195.name = 'Flawless Malachite';
items.I195.description = 'Material';
items.I195.flavor = '"A meticulously carved gemstone polished to perfection. Sells for a good price."';
items.I195.quality = 'Uncommon';
items.I195.sell = 10000*1.5;

items.I196 = {}; 
items.I196.name = 'Flawless Shadow Diamond';
items.I196.description = 'Material';
items.I196.flavor = '"A meticulously carved gemstone polished to perfection. Sells for a good price."';
items.I196.quality = 'Uncommon';
items.I196.sell = 40000*1.5;

items.I197 = {}; 
items.I197.name = 'Flawless Citrokine';
items.I197.description = 'Material';
items.I197.flavor = '"A meticulously carved gemstone polished to perfection. Sells for a good price."';
items.I197.quality = 'Uncommon';
items.I197.sell = 50000*1.5;

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
items.I31.sell = 'artisanBonus("SN1")';

items.I66 = {};
items.I66.name = 'Copper Plate';
items.I66.description = 'Material';
items.I66.flavor = '"Versatile material used in various crafting, valued for its strength and adaptability."';
items.I66.quality = 'Common';
items.I66.sell = 'artisanBonus("EN1")'

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
items.I35.sell = 'artisanBonus("SN2")';

items.I198 = {}; 
items.I198.name = 'Arcanite Bolts';
items.I198.description = 'Material';
items.I198.flavor = '"Screws made out of arcanite that boast better resistance and conductivity than non-fictional metals."';
items.I198.quality = 'Common';
items.I198.sell = 'artisanBonus("EN2")';

items.I417 = {};
items.I417.name = 'Fossil Ore';
items.I417.description = 'Material';
items.I417.flavor = '"Hundreds of trillions of years of pressurisation turned animal remains into material beyond comprehension."';
items.I417.quality = 'Common';
items.I417.sell = 94;

items.I349 = {};
items.I349.name = 'Fossil Materia';
items.I349.description = 'Material';
items.I349.flavor = '"A compressed alloy of metals fused with biotic matter, giving it flexible yet durable properties not seen on inorganic materials."';
items.I349.quality = 'Common';
items.I349.sell = 'artisanBonus("SN3")'

items.I419 = {};
items.I419.name = 'Wonderframe';
items.I419.description = 'Material';
items.I419.flavor = '"Skillfully bent alloy of fossil, shaped into a modular frame."';
items.I419.quality = 'Common';
items.I419.sell = 'artisanBonus("EN3")';

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
items.I68.name = 'Alchemical Dust';
items.I68.description = 'Material';
items.I68.flavor = '"A shimmering, iridescent powder valued for its reactivity in alchemy."';
items.I68.quality = 'Common';
items.I68.sell = 'artisanBonus("AN1")';

items.I355 = {};
items.I355.name = 'Dreambulb Sequence';
items.I355.description = "Material";
items.I355.flavor = '"A pristine cluster of information of biological data of the Dreambulb."';
items.I355.quality = 'Common';
items.I355.sell = 120;

items.I362 = {};
items.I362.name = 'Seraphire Powder';
items.I362.description = "Material";
items.I362.flavor = '"A powder with a refractive blue hue made from information. The best reagent in the world, until the next one unlocks."';
items.I362.quality = 'Common';
items.I362.sell = 'artisanBonus("AN3")';

items.I48 = {};
items.I48.name = 'Glass Flask';
items.I48.description = 'Material';
items.I48.flavor = '"A specialized flask crafted from materials designed to interact with alchemical substances."';
items.I48.quality = 'Common';
items.I48.sell = 500;

items.I422 = {};
items.I422.name = 'Tempered Flask';
items.I422.description = 'Material';
items.I422.flavor = '"Usually tedious and expensive to mass produce, these containers are often reserved for luxury potions, or fancy alchemy restaurants."';
items.I422.quality = 'Common';
items.I422.sell = 25000;

items.I49 = {};
items.I49.name = 'Nature Flask';
items.I49.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases'+natureIcon+'Nature Bonus by 100% for 20 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I49.flavor = '"Beware of hallucinations of colorful round forest creatures."';
items.I49.quality = 'Uncommon';
items.I49.sell = 'artisanBonus("AA1")';
items.I49.use = 'removeBuffs("potion"); items.I49.cd = 120; playSound("audio/potion.mp3"); buffs.B4.time=20; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 0); animState("rpgPlayerImg", "flash 0.5s 1"); items.I49.count--; ';
items.I49.cd = 0;

items.I50 = {};
items.I50.name = 'Might Flask';
items.I50.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases'+mightIcon+'Might Bonus by 100% for 20 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I50.flavor = '"Feeling like a true gaulish."';
items.I50.quality = 'Uncommon';
items.I50.sell = 'artisanBonus("AA1A")';
items.I50.use = 'removeBuffs("potion"); items.I50.cd = 120; playSound("audio/potion.mp3"); buffs.B5.time=20; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 100); animState("rpgPlayerImg", "flash 0.5s 1"); items.I50.count--; ';
items.I50.cd = 0;

items.I154 = {};
items.I154.name = 'Elemental Flask';
items.I154.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases'+elementalIcon+'Elemental Bonus by 100% for 20 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I154.flavor = '"Also known as fireball."';
items.I154.quality = 'Uncommon';
items.I154.sell = 'artisanBonus("AA1B")';
items.I154.use = 'removeBuffs("potion"); items.I154.cd = 120; playSound("audio/potion.mp3"); buffs.B30.time=20; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 240); animState("rpgPlayerImg", "flash 0.5s 1"); items.I154.count--; ';
items.I154.cd = 0;

items.I155 = {};
items.I155.name = 'Deific Flask';
items.I155.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases'+deificIcon+'Deific Bonus by 100% for 20 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I155.flavor = '"Deus Vult."';
items.I155.quality = 'Uncommon';
items.I155.sell = 'artisanBonus("AA1C")';
items.I155.use = 'removeBuffs("potion"); items.I155.cd = 120; playSound("audio/potion.mp3"); buffs.B31.time=20; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 300); animState("rpgPlayerImg", "flash 0.5s 1"); items.I155.count--; ';
items.I155.cd = 0;

items.I156 = {};
items.I156.name = 'Occult Flask';
items.I156.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases'+occultIcon+'Occult Bonus by 100% for 20 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I156.flavor = '"When the abyss peers into your soul, take a sip out of it."';
items.I156.quality = 'Uncommon';
items.I156.sell = 'artisanBonus("AA1D")';
items.I156.use = 'removeBuffs("potion"); items.I156.cd = 120; playSound("audio/potion.mp3"); buffs.B32.time=20; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", -200); animState("rpgPlayerImg", "flash 0.5s 1"); items.I156.count--; ';
items.I156.cd = 0;

items.I130 = {};
items.I130.name = 'Haste Flask';
items.I130.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases Haste by 25% for 12 seconds <FONT COLOR="gray"> (3 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I130.flavor = '"Sweet dreams are made of this..."';
items.I130.quality = 'Uncommon';
items.I130.sell = 24000;
items.I130.use = 'removeBuffs("potion"); items.I130.cd = 180; playSound("audio/potion.mp3"); buffs.B7.time=12; playerBuffs(); clearInterval(playerAttackInterval); playerAttackInterval = setInterval(playerAttack, playerHaste); animParticleBurst(10 , "particleGlow", "playerPanel", 300); animState("rpgPlayerImg", "flash 0.5s 1"); items.I130.count--; ';
items.I130.cd = 0;

items.I363 = {};
items.I363.name = 'Power Flask';
items.I363.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases Strength by 100% for 20 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I363.flavor = '"Used by alchemists worldwide to open jars of pickled goods."';
items.I363.quality = 'Uncommon';
items.I363.sell = 'artisanBonus("AA2")';
items.I363.use = 'removeBuffs("potion"); items.I363.cd = 120; playSound("audio/potion.mp3"); buffs.B98.time=20; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 240); animState("rpgPlayerImg", "flash 0.5s 1"); items.I363.count--; ';
items.I363.cd = 0;

items.I364 = {};
items.I364.name = 'Intellect Flask';
items.I364.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases Spellpower by 100% for 20 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Only one potion buff can be active at a time)'
items.I364.flavor = '"The label of the side effects is blacked out."';
items.I364.quality = 'Uncommon';
items.I364.sell = 'artisanBonus("AA3")';
items.I364.use = 'removeBuffs("potion"); items.I364.cd = 120; playSound("audio/potion.mp3"); buffs.B99.time=20; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", -200); animState("rpgPlayerImg", "flash 0.5s 1"); items.I364.count--; ';
items.I364.cd = 0;

items.I365 = {};
items.I365.name = 'Bastion Flask';
items.I365.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Creates a shield based on 40% of your Max Health<FONT COLOR="gray"> (2 minute Cooldown)'
items.I365.flavor = '"You feel technically immortal."';
items.I365.quality = 'Uncommon';
items.I365.sell = 'artisanBonus("AA3A")';
items.I365.use = 'items.I365.cd = 120; playerShield+=playerMaxHp*0.4; damageText("+"+beautify(playerMaxHp*0.4), "damageText", "#45a5a8", "shield", "playerPanel"); playerUpdate(); playSound("audio/potion.mp3"); animParticleBurst(10 , "particleGlow", "playerPanel", 400); animState("rpgPlayerImg", "flash 0.5s 1"); items.I365.count--; ';
items.I365.cd = 0;

items.I21 = {};
items.I21.name = 'Poison Flask';
items.I21.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Inflicts'+buffIcon("B1")+'Poison over 30 seconds<FONT COLOR="gray"> (2 minute Cooldown)';
items.I21.flavor = '"In the midst of chaos, there is also opportunity."';
items.I21.quality = 'Common';
items.I21.sell = 'artisanBonus("EA1A")';
items.I21.cd = 0;
items.I21.use = 'castLesserPoisonFlask(); items.I21.cd = 120; items.I21.count--; ;'

items.I185 = {};
items.I185.name = 'Swiftwork Tincture';
items.I185.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Increases Gathering Level by +1 for 30 Minutes<FONT COLOR="gray"> (Only one tincture can be active at a time)'
items.I185.flavor = '"Work smart, not hard. If not smart, then leave it to alchemy."';
items.I185.quality = 'Uncommon';
items.I185.sell = 'artisanBonus("AT4A")';
items.I185.use = 'removeBuffs("food"); playSound("audio/potion.mp3"); buffs.B37.time=1800; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 0); animState("rpgPlayerImg", "flash 0.5s 1"); items.I185.count--; ';
items.I185.cd = 0;

items.I12 = {};
items.I12.name = 'Skewed Lizard';
items.I12.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Restores 300 Health';
items.I12.flavor = '"Don\'t complain, it tastes like chicken."';
items.I12.quality = 'Common';
items.I12.sell = 200;
items.I12.use = ' playSound("audio/monch.mp3"); playerHealingDamage(300); animState("rpgPlayerImg", "gelatineHigh 0.4s 1"); items.I12.count--; ';
items.I12.max = 5;



function returnPotionLevel(id){

let base = 40; //heals 40% initially
if (rpgClass[stats.currentClass].level > items[id].potionLevel) {
    let diferencia = rpgClass[stats.currentClass].level - items[id].potionLevel;
    base -= diferencia * 4;


}
return Math.max(base,1);

}


items.I19 = {};
items.I19.name = 'Healing Flask';
items.I19.description = `'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Restores '+beautify(returnPotionLevel("I19")*playerMaxHp/100)+' Health<FONT COLOR="gray"> (40% of your Max Health)'`;
items.I19.flavor = '"This potion operates by abruptly shattering your entire internal structure, causing your body to make an immediate effort to rebuild them in order to avert a sudden death. It also has a mild strawberry flavor."';
items.I19.quality = 'Common';
items.I19.sell = 'artisanBonus("AN2")';
items.I19.max = 5;
items.I19.potionLevel = 6000;
items.I19.use = ' playSound("audio/potion.mp3"); playerHealingDamage(returnPotionLevel("I19")*playerMaxHp/100); animState("rpgPlayerImg", "flash 0.5s 1"); playerUpdate(); animParticleBurst(5 , "particleGlow", "playerPanel", 230); animParticleBurst(3 , "particleHealth", "playerPanel", 0); items.I19.count--; ';
items.I19.dynamic = true;

items.I280 = {};
items.I280.name = 'Healing Potion';
items.I280.description = `'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Restores '+beautify(returnPotionLevel("I280")*playerMaxHp/100)+' Health <FONT COLOR="gray">(This potion starts losing effectivity at level 60)'`;
items.I280.flavor = '"Remember the rule. The less practical the shape, the stronger it is."';
items.I280.quality = 'Uncommon';
items.I280.sell = 'artisanBonus("AN4A")';
items.I280.max = 5;
items.I280.potionLevel = 60;
items.I280.use = ' playSound("audio/potion.mp3"); playerHealingDamage(returnPotionLevel("I280")*playerMaxHp/100); animState("rpgPlayerImg", "flash 0.5s 1"); playerUpdate(); animParticleBurst(5 , "particleGlow", "playerPanel", 230); animParticleBurst(3 , "particleHealth", "playerPanel", 0); items.I280.count--; ';
items.I280.dynamic = true;

items.I366 = {};
items.I366.name = 'Greater Healing Potion';
items.I366.description = `'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Restores '+beautify(returnPotionLevel("I366")*playerMaxHp/100)+' Health'`;
items.I366.flavor = '"A work of art only seen by the aristocracy of the best alchemists in the world. Instead of healing your body, this liquid uses its political influence to pressure your wounds into ceasing immediately."';
items.I366.quality = 'Uncommon';
items.I366.sell = 'artisanBonus("AA5")';
items.I366.max = 5;
items.I366.potionLevel = 50;
items.I366.use = ' playSound("audio/potion.mp3"); playerHealingDamage(350000*multiplicativeHealingItems); animState("rpgPlayerImg", "flash 0.5s 1"); playerUpdate(); animParticleBurst(5 , "particleGlow", "playerPanel", 230); animParticleBurst(3 , "particleHealth", "playerPanel", 0); items.I280.count--; ';
items.I366.dynamic = true;

items.I54 = {};
items.I54.name = 'Hearty Tincture';
items.I54.description = `'Consumable - Tincture<br><FONT COLOR="#1EFF0C">Use: Increases Max Health by'+ colorTag("x1.2","#E57D08")+'for 30 minutes <FONT COLOR="gray">(Only one tincture can be active at a time)'`;
items.I54.flavor = '"The most basic of the works of an alchemist. Increasing one\'s survival chance is a simple but effective way to triumph into the battlegrounds."';
items.I54.quality = 'Uncommon';
items.I54.sell = 'artisanBonus("AT1")';
items.I54.use = 'removeBuffs("food"); buffs.B12.time=1800; playerBuffs();playSound("audio/potion.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");  items.I54.count--; ; rpgPlayer.hp+=playerMaxHp*0.2';
items.I54.dynamic = true;

items.I52 = {};
items.I52.name = 'Mighty Tincture';
items.I52.description = `'Consumable - Tincture<br><FONT COLOR="#1EFF0C">Use: Increases '+mightIcon+'Might Damage by '+beautify(50 * (1+talent.TA32.statUp))+'% for 30 minutes <FONT COLOR="gray">(Only one tincture can be active at a time)'`
items.I52.flavor = '"A foul smelling tincture thats sure to invigorate your body and mind."';
items.I52.quality = 'Uncommon';
items.I52.sell = 'artisanBonus("AT2")';
items.I52.use = 'removeBuffs("food"); buffs.B13.time=1800; playerBuffs(); playSound("audio/potion.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");  items.I52.count--; ';
items.I52.dynamic = true;

items.I110 = {}; 
items.I110.name = 'Natural Tincture';
items.I110.description = `'Consumable - Tincture<br><FONT COLOR="#1EFF0C">Use: Increases '+natureIcon+'Nature Damage by '+beautify(50 * (1+talent.TA32.statUp))+'% for 30 minutes <FONT COLOR="gray">(Only one tincture can be active at a time)'`;
items.I110.flavor = '"A popular alternative for vegan alchemists."';
items.I110.quality = 'Uncommon';
items.I110.sell = 'artisanBonus("AT3")';
items.I110.use = 'removeBuffs("food"); buffs.B15.time=1800; playerBuffs();playSound("audio/potion.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");   items.I110.count--; ';
items.I110.dynamic = true;

items.I188 = {}; 
items.I188.name = 'Elemental Tincture';
items.I188.description = `'Consumable - Tincture<br><FONT COLOR="#1EFF0C">Use: Increases '+elementalIcon+'Elemental Damage by '+beautify(50 * (1+talent.TA32.statUp))+'% for 30 minutes <FONT COLOR="gray">(Only one tincture can be active at a time)'`;
items.I188.flavor = '"High temperature rocks are poured into the stew for heating. You are not supposed to eat them, but I\'m not a cop."';
items.I188.quality = 'Uncommon';
items.I188.sell = 'artisanBonus("AT4")';
items.I188.use = 'removeBuffs("food"); buffs.B40.time=1800; playerBuffs(); playSound("audio/potion.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");   items.I188.count--; ';
items.I188.dynamic = true;

items.I129 = {};
items.I129.name = 'Bountiful Tincture';
items.I129.description = `'Consumable - Tincture<br><FONT COLOR="#1EFF0C">Use: Increases Drop Bonus by '+beautify(70 * (1+talent.TA32.statUp))+'% for 30 minutes <FONT COLOR="gray">(Only one tincture can be active at a time)'`
items.I129.flavor = '"Also called "liquid luck" in some countries, they find themselves banned in casinos and other gambling spaces."';
items.I129.quality = 'Uncommon';
items.I129.sell = 'artisanBonus("AT5")';
items.I129.use = 'removeBuffs("food"); buffs.B29.time=1800; playerBuffs();playSound("audio/potion.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");  items.I129.count--; ';
items.I129.dynamic = true;

items.I186 = {}; 
items.I186.name = 'Divine Tincture';
items.I186.description = `'Consumable - Tincture<br><FONT COLOR="#1EFF0C">Use: Increases '+deificIcon+'Deific Damage by '+beautify(50 * (1+talent.TA32.statUp))+'% for 30 minutes <FONT COLOR="gray">(Only one tincture can be active at a time)'`;
items.I186.flavor = '"Way more convenient and faster than praying."';
items.I186.quality = 'Uncommon';
items.I186.sell = 'artisanBonus("AT6")';
items.I186.use = 'removeBuffs("food"); buffs.B38.time=1800; playerBuffs(); playSound("audio/potion.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");   items.I186.count--; ';
items.I186.dynamic = true;

items.I189 = {}; 
items.I189.name = 'Sinister Tincture';
items.I189.description = `'Consumable - Tincture<br><FONT COLOR="#1EFF0C">Use: Increases '+occultIcon+'Occult Damage by '+beautify(50 * (1+talent.TA32.statUp))+'% for 30 minutes <FONT COLOR="gray">(Only one tincture can be active at a time)'`;
items.I189.flavor = '"May have lingering effects on the soul, but it\'s definitely worth it."';
items.I189.quality = 'Uncommon';
items.I189.sell = 'artisanBonus("AT7")';
items.I189.use = 'removeBuffs("food"); buffs.B41.time=1800; playerBuffs();playSound("audio/potion.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");   items.I189.count--; ';
items.I189.dynamic = true;

items.I367 = {}; 
items.I367.name = 'Brilliance Tincture';
items.I367.description = `'Consumable - Tincture<br><FONT COLOR="#1EFF0C">Use: Increases EXP Bonus by '+beautify(30 * (1+talent.TA32.statUp))+'% for 30 minutes <FONT COLOR="gray">(Only one tincture can be active at a time)'`;
items.I367.flavor = '"It takes a genius to drink up a genius."';
items.I367.quality = 'Uncommon';
items.I367.sell = 'artisanBonus("AT8")';
items.I367.use = 'removeBuffs("food"); buffs.B101.time=1800; playerBuffs();playSound("audio/potion.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");   items.I367.count--; ';
items.I367.dynamic = true;

items.I368 = {}; 
items.I368.name = 'Shadowbolt Tincture';
items.I368.description = 'Consumable - Tincture<br><FONT COLOR="#1EFF0C">Use: Fire a Shadow Bolt dealing Low'+occultIcon+'Occult Damage with every attack for 30 minutes <FONT COLOR="gray">(Only one tincture can be active at a time)';
items.I368.flavor = '"Its name inspires both fear and lack of creativity."';
items.I368.quality = 'Uncommon';
items.I368.sell = 'artisanBonus("AT9")';
items.I368.use = 'removeBuffs("food"); buffs.B100.time=1800; playerBuffs();playSound("audio/potion.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");   items.I368.count--; ';

items.I369 = {}; 
items.I369.name = 'Manastorm Tincture';
items.I369.description = 'Consumable - Tincture<br><FONT COLOR="#1EFF0C">Use: Increases Magic Regeneration for 30 minutes <FONT COLOR="gray">(Only one tincture can be active at a time)';
items.I369.flavor = '"Surely this won\'t be used for nefarious deeds such as stealing."';
items.I369.quality = 'Uncommon';
items.I369.sell = 'artisanBonus("AT10")';
items.I369.use = 'removeBuffs("food"); buffs.B41.time=1800; playerBuffs();playSound("audio/potion.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.4s 1");   items.I189.count--; ';

items.I190 = {}; 
items.I190.name = 'Pilk';
items.I190.description = 'Miscellaneous';
items.I190.flavor = '"Just a carton of Pilk."';
items.I190.quality = 'Common';
items.I190.sell = 69;
items.I190.max = 1;
items.I190.use = 'if (stats.currentEnemy==="E18") {deleteEnemy("E30"); animParticleBurst(10 , "particleFire", "enemyPanel", 200); animParticleBurst(10 , "particleSpark", "enemyPanel", 200); animImageSplash("soundWave", "enemyPanel", "wave", 200); animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1"); playSound("audio/creatura1.mp3"); playSound("audio/creatura2.mp3"); logs.P54.unlocked=true; items.I190.count--}'; 
items.I190.align = "occult";

var stampArray = { I91:{P:2,A:1}, I92:{P:20,A:1}, I93:{P:60,A:1} }

var smallCache =  { I385:{P:mythicChest,A:1}, /*alienhead*/ I22:{P:1,A:"rng(1,5)"}, /*nephrite*/ I42:{P:5,A:1}, /*malachite*/  I12:{P:1,A:"rng(1,3)"}, /*lizard*/ I33:{P:25,A:1}, /*blade*/ I131:{P:25,A:1}, /*thorn ring*/ I112:{P:1,A:'rng(1,5)'}, /*boomerang*/}
items.I10 = {};
items.I10.name = 'Small Wooden Lockbox';
items.I10.description = `'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Unlock with a'+itemIcon("I41")+'Copper Key to open<FONT COLOR="#edd585"><br>'+bestiaryTag("🎲 Possible Contents 🎲", "#815C42")+bestiaryItem("I385","container",mythicChest)+bestiaryItem("I33","container",uncommonChest)+bestiaryItem("I131","container",uncommonChest)+bestiaryItem("I42","container",5)+bestiaryItem("I12","container",1)+bestiaryItem("I22","container",1)+bestiaryItem("I112","container",1)`
items.I10.flavor = '"Life is like a Small Wooden Lockbox."';
items.I10.quality = 'Uncommon';
items.I10.sell = 2000;
items.I10.use = 'if (items.I41.count>0){ items.I41.count--; rollTable(smallCache, 1); rollTable(stampArray, 1); items.I10.count--; if(quests.A2Q2.state === "pending"){ if(rng(1,6)===1) items.I123.count++ }; }';
items.I10.autoOpenLocked = "I41"; 
items.I10.dynamic = true; 

items.I41 = {};
items.I41.name = 'Copper Key';
items.I41.description = 'Miscellaneous - Key<br><FONT COLOR="#1EFF0C">Can open small containers';
items.I41.flavor = '"For the easily-influenced locks."';
items.I41.quality = 'Common';
items.I41.sell = 'artisanBonus("EK1")';

var reinforcedChest = { I384:{P:mythicChest,A:1}, /*grandad*/ I42:{P:2,A:1}, /*malachite*/ I418:{P:10,A:1}, /*shadowdiamond*/ I81:{P:rareChest,A:1}, /*sacdagger*/  I62:{P:rareChest,A:1}, /*heartcard*/}
items.I43 = {};
items.I43.name = 'Reinforced Wooden Chest';
items.I43.description = `'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Unlock with an'+itemIcon("I46")+'Arcanite Blasting Charge to open<FONT COLOR="#edd585"><br>'+bestiaryTag("🎲 Possible Contents 🎲", "#815C42")+bestiaryItem("I384","container",mythicChest)+bestiaryItem("I81","container",rareChest)+bestiaryItem("I62","container",rareChest)+bestiaryItem("I418","container",10)+bestiaryItem("I42","container",2)`
items.I43.flavor = '"As reinforced as wood can be."';
items.I43.quality = 'Uncommon';
items.I43.sell = 4000;
items.I43.use = 'if (items.I46.count>0){ items.I43.count--; items.I46.count--; rollTable(reinforcedChest, 1); rollTable(stampArray, 1); }';
items.I43.autoOpenLocked = "I46"; 
items.I43.dynamic = true; 

items.I46 = {};
items.I46.name = 'Arcanite Blasting Charge';
items.I46.description = 'Miscellaneous - Key<br><FONT COLOR="#1EFF0C">Can open reinforced containers';
items.I46.flavor = '"For the moderately-swayed locks."';
items.I46.quality = 'Common';
items.I46.sell = 'artisanBonus("EK2")';

var runicCache =  { I42:{P:2,A:1}, /*shadowdiamond*/ I359:{P:10,A:1}, /*citrokine*/  I373:{P:rareChest,A:1}, /*ring*/ I360:{P:rareChest,A:1}, /*pjs*/  I328:{P:mythicChest,A:1}, /*brass dooter*/}
items.I399 = {};
items.I399.name = 'Silver Runic Cache';
items.I399.description = `'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Unlock with a'+itemIcon("I400")+'Verdant Key to open<FONT COLOR="#edd585"><br>'+bestiaryTag("🎲 Possible Contents 🎲", "#815C42")+bestiaryItem("I328","container",mythicChest)+bestiaryItem("I373","container",rareChest)+bestiaryItem("I360","container",rareChest)+bestiaryItem("I359","container",10)+bestiaryItem("I42","container",2)`
items.I399.flavor = '"Looks quite valuable."';
items.I399.quality = 'Uncommon';
items.I399.sell = 20000;
items.I399.use = 'if (items.I400.count>0){ items.I400.count--; rollTable(runicCache, 1); rollTable(stampArray, 1); items.I399.count--; }';
items.I399.autoOpenLocked = "I400"; 
items.I399.dynamic = true;

items.I400 = {};
items.I400.name = 'Verdant Key';
items.I400.description = 'Miscellaneous - Key<br><FONT COLOR="#1EFF0C">Can open runic containers';
items.I400.flavor = '"For the tough-looking locks."';
items.I400.quality = 'Common';
items.I400.sell = 'artisanBonus("EK3")';

items.I153 = {};
items.I153.name = 'Infernal Cache';
items.I153.description = `'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br>'+bestiaryTag("🎲 Possible Contents 🎲", "#815C42")+bestiaryItem("I28","container")+bestiaryItem("I65","container")+bestiaryItem("I175","container")+bestiaryItem("I100","container")`;
items.I153.flavor = '"A blazing repository ablaze with imprisoned souls."';
items.I153.quality = 'Rare';
items.I153.sell = 15500;
items.I153.use = 'rollTable(infernalCache, 1); items.I153.count--;';
items.I153.autoOpen = true; 
items.I153.dynamic = true;

var spriteCenserLoot = { I319:{P:10,A:1}, /*weapon*/ I377:{P:10,A:1}, /*lapili*/ BR2U1:{P:30,A:1}, /*bp*/ I350:{P:1,A:'rng(18*2,24*2)'}, /*material*/ }
items.I429 = {};
items.I429.name = 'Sprite Censer';
items.I429.description = `'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br>'+bestiaryTag("🎲 Possible Contents 🎲", "#815C42")+bestiaryItem("BR2U1","container")+bestiaryItem("I319","container")+bestiaryItem("I377","container")+bestiaryItem("I350","container")`;
items.I429.flavor = '"A pagoda-shaped container designed to hold and burn incense, left as an offering for a deity."';
items.I429.quality = 'Rare';
items.I429.sell = 22000;
items.I429.use = 'rollTable(spriteCenserLoot, 1); items.I429.count--; removeTableItem() ';
items.I429.autoOpen = true; 
items.I429.dynamic = true;

var summonedCache = { I320:{P:10,A:1}, /*weapon*/ I376:{P:4,A:1}, /*ring*/ I354:{P:1,A:'rng(18*2,24*2)'}, /*material*/ }
items.I430 = {};
items.I430.name = 'Summoned Cache';
items.I430.description = `'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br>'+bestiaryTag("🎲 Possible Contents 🎲", "#815C42")+bestiaryItem("I320","container")+bestiaryItem("I376","container")+bestiaryItem("I354","container")`;
items.I430.flavor = '"I love me some fourth dimensional loot."';
items.I430.quality = 'Rare';
items.I430.sell = 42000;
items.I430.use = 'rollTable(summonedCache, 1); items.I430.count--;';
items.I430.autoOpen = true; 
items.I430.dynamic = true;

var dungeonBonus1 = { I93:{P:10, A:1},I92:{P:5, A:'rng(1,3)'},I91:{P:2, A:'rng(1,7)'}, /*stamps*/ I22:{P:4, A:'rng(1,10)'},I42:{P:6, A:'rng(1,4)'}, /*gems*/ I96:{P:30,A:1},  I97:{P:30,A:1}, I207:{P:30,A:1},  /*gambas*/ I177:{P:30,A:1},  I178:{P:30,A:1},  /*vouchers*/ I200:{P:30,A:1},  /*phoenix*/  I208:{P:40,A:1},  /*jackinabox*/}

items.I205 = {};
items.I205.name = 'Kid\'s Meal';
items.I205.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!'+bestiaryTag("⚜️ Dedicated Content: Kidsmeal ⚜️", "#A351AB")
items.I205.flavor = '"If a toy happened to be inside, it would be healthier to eat than the food served."';
items.I205.quality = 'Rare';
items.I205.sell = 15000;
items.I205.use = 'rareItemDrop(rareItems[rng(0,(rareItems.length-1))],1); rareItemDrop(rareItems2[rng(0,(rareItems2.length-1))],1); items.I205.count--; if (rng(1,6)===1) {items.I284.count++;}';

items.I433 = {}; 
items.I433.name = 'Prison Realm Binding';
items.I433.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Binds Xezdeth to the mortal plane';
items.I433.flavor = '"A multidimensional confine used for keeping at bay great threats, or really, really bad turtles."';
items.I433.quality = 'Rare';
items.I433.sell = 1;
items.I433.max = 1;
items.I433.use = 'items.I433.count--; ';

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
items.I96.description = `'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Pat Multiplier by'+ colorTag("x2","#E57D08")+'for 30 minutes'`
items.I96.flavor = '"A symbol of greed and covetousness."';
items.I96.quality = 'Rare';
items.I96.sell = 1000;
items.I96.use = 'playSound("audio/monch.mp3"); animParticleBurst(7 , "particleHeart", "playerPanel", 0); playSound("audio/lily.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); buffs.B8.time=1800; playerBuffs(); items.I96.count--; ';
items.I96.max = 10;
items.I96.dynamic = true;

items.I97 = {};
items.I97.name = 'Vitreous Gamba';
items.I97.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases"+expIcon+"EXP Bonus by"+ colorTag("x2","#E57D08"),"passive",25)+"for 30 minutes'
items.I97.flavor = '"A symbol of beauty and elegance."';
items.I97.quality = 'Rare';
items.I97.sell = 1000;
items.I97.use = 'playSound("audio/monch.mp3"); animParticleBurst(7 , "particleHeart", "playerPanel", 0); playSound("audio/lily.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); buffs.B9.time=1800; playerBuffs(); items.I97.count--; ';
items.I97.max = 10;

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
items.I26.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to reset Stars'
items.I26.flavor = '"The stars are gleaming through the crustacean\'s surface."';
items.I26.quality = 'Rare';
items.I26.sell = 1000;
items.I26.max = 1;

items.I389 = {};
items.I389.name = 'Flask of Aspects';
items.I389.description = `'Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Freeze the visual appearance of your turtle gear. Use it again to unfreeze it'`;
items.I389.flavor = '"Be yourself, we wont judge over here."';
items.I389.quality = 'Rare';
items.I389.sell = 0;
items.I389.use = 'aspectFlask(); items.I389.cd = 5; animParticleBurst(10 , "particleFire", "playerPanel", 200); animParticleBurst(10 , "particleSpark", "playerPanel", 200); animImageSplash("soundWave", "playerPanel", "wave", 200); animState("rpgPlayerImg", "shakeFlash 0.4s 1"); playSound("audio/explosion.mp3")'
items.I389.max = 1;
items.I389.cd = 0;
items.I389.statUp = "none";
items.I389.dynamic = true;

function aspectFlask(){

  const regex = /\/(\w+)\.png$/;
  const match = did("rpgPlayerImg").src.match(regex);


  if (items.I389.statUp !== "none"){

    items.I389.statUp = "none";
    setBonus()
    return;

  } 
  else if (match) {
    //console.log(match[1])
    items.I389.statUp = match[1];
    setBonus()
  }
  

}

items.I432 = {};
items.I432.name = 'Personal Battle Data Analyzer';
items.I432.description = `'Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Gather battle data over 60 seconds'+bestiaryTag("⏱️ Battle data over 60 seconds<br>" , "coral")+items.I432.data`;
items.I432.flavor = '"Tortulexa, play despacito"';
items.I432.quality = 'Rare';
items.I432.sell = 0;
items.I432.max = 1;
items.I432.data = "No data available";
items.I432.use = "battleAnalysis()";
items.I432.dynamic = true;

let dataDamageDealt = 0;
let dataExpGained = 0;
let dataEnemiesKilled = 0;
let battleData = false;

function battleAnalysis(){


  if (battleData){
    createPopup('⏱️ An analysis is already taking place!', '#913c3c')
    return
  }

  battleData = true;
  dataDamageDealt = 0;
  dataExpGained = 0;
  dataEnemiesKilled = 0;
  createPopup('⏱️ Data analysing started!', '#994687')
  playSound("audio/engine.mp3");
  setTimeout(() => {

    let next = rpgClass[stats.currentClass].nextExp - rpgClass[stats.currentClass].currentExp;



    items.I432.data = "◆ Damage dealt: "+beautify(dataDamageDealt)+"<br>◆ DPS: "+beautify(dataDamageDealt/60)+"<br>◆ Enemies defeated: "+dataEnemiesKilled+"<br>◆ Kills per second: "+(dataEnemiesKilled/60).toFixed(2)+"<br>◆ EXP gained: "+beautify(dataExpGained)+"<br>◆ Estimated to level up: "+convertSecondsToHMS(next * 60 / dataExpGained)

    createPopup('⏱️ Data analysing finished!', '#994687')
    playSound("audio/ring.mp3");

    battleData = false
    
  }, 60000);





}



items.I207 = {};
items.I207.name = 'Wood-Carved Gamba';
items.I207.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Drop Bonus by 100% for 30 minutes'
items.I207.flavor = '"A symbol of talent and workmanship."';
items.I207.quality = 'Rare';
items.I207.sell = 1000;
items.I207.use = 'playSound("audio/monch.mp3"); animParticleBurst(7 , "particleHeart", "playerPanel", 0); playSound("audio/lily.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); buffs.B55.time=1800; playerBuffs(); items.I207.count--; ';
items.I207.max = 10;

items.I119 = {}; 
items.I119.name = 'Carefully Wrapped Present';
items.I119.description = `'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br>'+bestiaryTag("🎲 Always Contains 🎲", "#6A4D74")+bestiaryItem("I26","container",1)+bestiaryTag("🎲 Possible Contents 🎲", "#815C42")+'<FONT COLOR="pink">?????'`;
items.I119.flavor = '"Para mi?"';
items.I119.quality = 'Uncommon';
items.I119.sell = 1;
items.I119.use = 'playSound("audio/meow.mp3"); rareItemDrop("I26",1); rareItemDrop("I98",1); rareItemDrop(rareItems[rng(0,(rareItems.length-1))],1); rareItemDrop(rareItems2[rng(0,(rareItems2.length-1))],1); items.I119.count--; ';
items.I119.dynamic = true;

items.I296 = {}; 
items.I296.name = 'Carefully Wrapped Exported Data';
items.I296.description = `'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br>'+bestiaryTag("🎲 Always Contains 🎲", "#6A4D74")+bestiaryItem("I174","container",1)+bestiaryItem("I209","container",1)`;
items.I296.flavor = '"One export save a day keeps the data corruption away."';
items.I296.quality = 'Uncommon';
items.I296.sell = 1;
items.I296.use = 'playSound("audio/button9.mp3"); items.I174.count++; items.I209.count++; items.I296.count--; ';
items.I296.dynamic = true;
items.I296.max = 10;

items.I98 = {};
items.I98.name = 'Friendly Cat Token';
items.I98.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases'+expIcon+'EXP Bonus by 100% for 30 minutes'
items.I98.flavor = '"Protection awaits for the friends of Whiskers."';
items.I98.quality = 'Uncommon';
items.I98.sell = 1000;
items.I98.use = 'playSound("audio/meow.mp3"); buffs.B10.time=1800; playerBuffs(); animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I98.count--; ';
items.I98.max = 10;

items.I99 = {};
items.I99.name = 'Angry Cat Token';
items.I99.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Drop Bonus by 300% for 30 minutes'
items.I99.flavor = '"Destruction awaits for the enemies of Whiskers."';
items.I99.quality = 'Epic';
items.I99.sell = 1000;
items.I99.use = 'playSound("audio/meow.mp3"); buffs.B11.time=1800; playerBuffs(); animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I99.count--; ';
items.I99.max = 10;

stats.stampsUsed = 0;

items.I91 = {}; 
items.I91.name = 'Wooden Stamper';
items.I91.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Applies or rerolls a random stamp to the currently equiped weapon, with a low chance of adding multiple stamps';
items.I91.flavor = '"Pluck."';
items.I91.quality = 'Common';
items.I91.sell = 100;
items.I91.use = 'if (!(["rod", "mattock"].includes(items[rpgPlayer.weaponSlot].tag)) && !items[rpgPlayer.weaponSlot].locked) { stampWeapon("wood"); stats.stampsUsed++; items.I91.count--; ; updateStampMenu(); } else {createPopup("&#10060; Invalid or Locked Weapon!", "#913c3c", "stampPopUp")} '

items.I92 = {}; 
items.I92.name = 'Reinforced Stamper';
items.I92.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Applies or rerolls a random stamp to the currently equiped weapon, with a high chance of adding multiple stamps';
items.I92.flavor = '"Doink."';
items.I92.quality = 'Uncommon';
items.I92.sell = 1000;
items.I92.use = 'if (!(["rod", "mattock"].includes(items[rpgPlayer.weaponSlot].tag)) && !items[rpgPlayer.weaponSlot].locked) { stampWeapon("iron"); stats.stampsUsed++; items.I92.count--; ; updateStampMenu(); } else {createPopup("&#10060; Invalid or Locked Weapon!", "#913c3c", "stampPopUp")} '

items.I93 = {}; 
items.I93.name = 'Ornate Stamper';
items.I93.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Applies or rerolls a random stamp to the currently equiped weapon, always adding multiple stamps';
items.I93.flavor = '"Tunk."';
items.I93.quality = 'Rare';
items.I93.sell = 2000;
items.I93.use = 'if (!(["rod", "mattock"].includes(items[rpgPlayer.weaponSlot].tag)) && !items[rpgPlayer.weaponSlot].locked) { stampWeapon("gold"); stats.stampsUsed++; items.I93.count--; ; updateStampMenu(); } else {createPopup("&#10060; Invalid or Locked Weapon!", "#913c3c", "stampPopUp")} '

items.I312 = {}; 
items.I312.name = 'Gardener\'s Stamper';
items.I312.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Applies or rerolls a tool stamp to the currently equiped tool, with a low chance of adding multiple stamps. Can only be used in tools';
items.I312.flavor = '"Badoonk."';
items.I312.quality = 'Rare';
items.I312.sell = 1200;
items.I312.use = 'if (["rod", "mattock"].includes(items[rpgPlayer.weaponSlot].tag) && !items[rpgPlayer.weaponSlot].locked) { stampWeapon("gardener"); stats.stampsUsed++; items.I312.count--; updateStampMenu(); } else {createPopup("&#10060; Invalid or Locked Weapon!", "#913c3c", "stampPopUp")} '

items.I311 = {}; 
items.I311.name = 'Cursed Stamper';
items.I311.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Applies or rerolls a random stamp to the currently equiped weapon, always adding multiple stamps. Has a chance to add negative stamps';
items.I311.flavor = '"Bababoink."';
items.I311.quality = 'Rare';
items.I311.sell = 2000;
items.I311.use = 'if (!(["rod", "mattock"].includes(items[rpgPlayer.weaponSlot].tag)) && !items[rpgPlayer.weaponSlot].locked) { stampWeapon("eternal"); stats.stampsUsed++; items.I311.count--; ; updateStampMenu(); } else {createPopup("&#10060; Invalid or Locked Weapon!", "#913c3c", "stampPopUp")} '

items.I222 = {}; 
items.I222.name = 'Golden Magnifying Glass';
items.I222.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used once to reveal the details of a missing book or the skills of a weapon';
items.I222.flavor = '"Oh. So that\'s what it was talking about."';
items.I222.quality = 'Rare';
items.I222.sell = 10000;
items.I222.max = 10;

items.I208 = {};
items.I208.name = 'Jack-In-The-Box';
items.I208.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Summons a Jester Turtle<FONT COLOR="gray"> (2 minute Cooldown)'
items.I208.flavor = '"What\'s in the box?"';
items.I208.quality = 'Rare';
items.I208.sell = 20000;
items.I208.use = 'playSound("audio/button8.mp3"); items.I208.cd = 120;animParticleBurst(5 , "particleSpark", "cursor", 0); spawnJesterTurtle() ;items.I208.count--; ';
items.I208.cd= 0;
items.I208.max = 10;

items.I209 = {};
items.I209.name = 'Ephemeral Time Egg';
items.I209.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Gathers materials and experience worth 1 hour of Turtlebot\'s offline progress<br><FONT COLOR="gray"> (Doesnt work if the current enemy has been defeated less than 100 times)'
items.I209.flavor = '"...Time, the very essence of change and decay, which would hatch forth and the very heartbeat of existence, would find its genesis..."';
items.I209.quality = 'Rare';
items.I209.sell = 1000;
items.I209.use = 'if (farmable && (!bossTime || stats.currentDifficulty==="boss")) {playSound("audio/button9.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); offlineRewards((3600/60),"egg"); items.I209.count--; }';
items.I209.max = 1;

items.I210 = {};
items.I210.name = 'Perennial Time Egg';
items.I210.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Gathers materials and experience worth 6 hour of Turtlebot\'s offline progress<br><FONT COLOR="gray"> (Doesnt work if the current enemy has been defeated less than 100 times)'
items.I210.flavor = '"...Encased within the shell of the cosmic ovum lay the potential for eternity, awaiting the pivotal moment of hatching, as within resided..."';
items.I210.quality = 'Epic';
items.I210.sell = 10000;
items.I210.use = 'if (farmable && (!bossTime || stats.currentDifficulty==="boss")) {playSound("audio/button9.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); offlineRewards((21600/60),"egg"); items.I210.count--; }';
items.I210.max = 1;

items.I211 = {};
items.I211.name = 'Everlasting Time Egg';
items.I211.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Gathers materials and experience worth 3 days of Turtlebot\'s offline progress<br><FONT COLOR="gray"> (Doesnt work if the current enemy has been defeated less than 100 times)'
items.I211.flavor = '"—In the depths of its ancient shell harbored the essence of creation itself. And so, in an epoch-shattering moment, amidst the swirling mists of eternity, it laid an egg..."';
items.I211.quality = 'Mythic';
items.I211.sell = 50000;
items.I211.use = 'if (farmable && (!bossTime || stats.currentDifficulty==="boss")) {playSound("audio/button9.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); offlineRewards((259200/60),"egg"); items.I211.count--; }';
items.I211.max = 1;

items.I212 = {};
items.I212.name = 'Timeless Time Egg';
items.I212.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Gathers materials and experience worth 2 weeks of Turtlebot\'s offline progress<br><FONT COLOR="gray"> (Doesnt work if the current enemy has been defeated less than 100 times)'
items.I212.flavor = '"...As it unfurled its wings, ages passed like fleeting shadows, civilizations rose and crumbled, and the land itself bore witness to the inexorable march of time."';
items.I212.quality = 'Legendary';
items.I212.sell = 200000;
items.I212.use = 'if (farmable && (!bossTime || stats.currentDifficulty==="boss")) {playSound("audio/button9.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); offlineRewards((1209600/60),"egg"); items.I212.count--; }';
items.I212.max = 1;

items.I291 = {};
items.I291.name = 'Threnody for 999999';
items.I291.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: All attacks deal 999.9K for 1 minute';
items.I291.flavor = '"Ad astra per aspera."';
items.I291.quality = 'Epic';
items.I291.sell = 999999;
items.I291.max = 1;
items.I291.use = ' if (rpgPlayer.alive) {animParticleBurst(7 , "particleHeart", "playerPanel", 0);animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); playSound("audio/lily.mp3"); buffs.B113.time=600; playerBuffs(); items.I291.count--; }';

items.I213 = {};
items.I213.name = 'Reality Voxel';
items.I213.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Combine 4 into a Reality Cube'
items.I213.flavor = '"Seems like it really doesn\'t belong in this world."';
items.I213.quality = 'Epic';
items.I213.sell = 0;
items.I213.use = 'if (items.I213.count>3) { playSound("audio/talent.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I213.count-=4; items.I214.count++; }';

items.I219 = {};
items.I219.name = 'Busted Improbability Drive';
items.I219.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Attempts to materialise a drop you haven\'t gotten yet from the enemy you\'re currently facing. Doesn\'t work with epic items and above, or enemies with less than 10 kills.<FONT COLOR="gray"> It doesn\'t seem very reliable, though...'
items.I219.flavor = '"Time is an illusion. Lunchtime doubly so."';
items.I219.quality = 'Rare';
items.I219.max = 5;
items.I219.sell = 25000;
items.I219.use = 'if (enemies[stats.currentEnemy].killCount>9) improbabilityDrive()';

items.I174 = {}; 
items.I174.name = 'Dungeon Voucher';
items.I174.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to enter any dungeon regardless of the cooldown';
items.I174.flavor = '"The fast pass of the adventures."';
items.I174.quality = 'Rare';
items.I174.sell = 1000;
items.I174.max = 10;

items.I177 = {}; 
items.I177.name = 'EXP Voucher';
items.I177.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases EXP Bonus by 100% for 10 minutes'
items.I177.flavor = '"This one always puts a gleaming smile on your face."';
items.I177.use = 'playSound("audio/button6.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); buffs.B35.time=600;  playerBuffs(); items.I177.count--; ';
items.I177.quality = 'Rare';
items.I177.sell = 3000;
items.I177.max = 10;

items.I178 = {}; 
items.I178.name = 'Drop Voucher';
items.I178.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Drop Bonus by 300% for 10 minutes'
items.I178.flavor = '"This one always puts a gleaming smile on your face."';
items.I178.use = 'playSound("audio/button6.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); buffs.B36.time=600; playerBuffs(); items.I178.count--; ';
items.I178.quality = 'Rare';
items.I178.sell = 3000;
items.I178.max = 10;

items.I14 = {}; 
items.I14.name = 'Chocolate Chip Cookies';
items.I14.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Feed it to the turtle';
items.I14.flavor = '"Their flavor is quite familiar. Nothing happens if you press them, though."';
items.I14.quality = 'Uncommon';
items.I14.sell = 10;
items.I14.use = 'playSound("audio/monch.mp3"); animParticleBurst(7 , "particleHeart", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I14.count--; ';

items.I372 = {}; 
items.I372.name = 'Fish Oil';
items.I372.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: ?????';
items.I372.flavor = '"?????"';
items.I372.quality = 'Uncommon';
items.I372.sell = 10;
items.I372.use = 'playSound("audio/potion.mp3"); animParticleBurst(7 , "particleHeart", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I14.count--; ';


stats.mushroomsUsed = 0;

items.I380 = {}; 
items.I380.name = 'Suspicious Mushroom';
items.I380.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Eat me!';
items.I380.flavor = '"We are either going old school, or to the hospital."';
items.I380.quality = 'Uncommon';
items.I380.sell = 10;
items.I380.use = 'castSussyMushroom(); stats.mushroomsUsed++';
items.I380.cd = 0

items.I316 = {};
items.I316.name = 'Fish Bones';
items.I316.description = 'Miscellaneous - Currency';
items.I316.flavor = '"I knew sending penguins to catch fish wasn\'t a good idea..."';
items.I316.quality = 'Common';
items.I316.sell = 1;

let coinWins = 0;
items.I39 = {};
items.I39.name = 'Pirate Coin';
items.I39.description = 'Miscellaneous - Currency<br><FONT COLOR="#1EFF0C">Use: Flip the coin';
items.I39.flavor = '"Fateful decisions upon the high seas await ye."';
items.I39.quality = 'Uncommon';
items.I39.sell = 900;
items.I39.use = 'items.I39.cd = 3; playSound("audio/touchGlass.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I39.count--; if (rng(1,2)===1) {createPopup("&#127922; Tails", "#913c3c"); coinWins = 0;} else {createPopup("&#127922; Heads", "#61ba56"); coinWins++}; if (rng(1,50)===1) {playSound("audio/meow.mp3"); createPopup("&#127922; You feel lucky!", "#61ba56"); items.I193.count++; }';
items.I39.cd = 0;

items.I310 = {};
items.I310.name = 'Sardine Token';
items.I310.description = 'Miscellaneous - Currency';
items.I310.flavor = '"A form of currency, and a salty snack at the same time. Genius, really."';
items.I310.quality = 'Uncommon';
items.I310.sell = 900;

items.I313 = {};
items.I313.name = 'Dark Moon Coin';
items.I313.description = 'Miscellaneous - Currency';
items.I313.flavor = '"A gloomy token carried by those swell in darkness."';
items.I313.quality = 'Uncommon';
items.I313.sell = 1500;

items.I314 = {};
items.I314.name = 'Radiant Sun Coin';
items.I314.description = 'Miscellaneous - Currency';
items.I314.flavor = '"Praise it."';
items.I314.quality = 'Uncommon';
items.I314.sell = 2000;

items.I298 = {};
items.I298.name = 'Armament War Paint';
items.I298.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Paint your currently equipped weapon into a random color';
items.I298.flavor = '"Please be Factory New."';
items.I298.quality = 'Uncommon';
items.I298.sell = 1000;
items.I298.use = 'if (rpgPlayer.weaponSlot!=="none"){ items[rpgPlayer.weaponSlot].paint = rng(30,340); weaponSwap(rpgPlayer.weaponSlot); playSound("audio/button8.mp3"); animState("playerWeapon", "gelatine 0.3s 1");  animParticleBurst(7 , "particleSpark", "playerPanel", 0);items.I298.count-- } ';

items.I299 = {};
items.I299.name = 'Armament Lint Roller';
items.I299.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Removes the paint of your currently equipped weapon';
items.I299.flavor = '"Now with laser sight and night vision for after dark cleaning."';
items.I299.quality = 'Common';
items.I299.sell = 100;
items.I299.use = 'if (rpgPlayer.weaponSlot!=="none"){ delete items[rpgPlayer.weaponSlot].paint; weaponSwap(rpgPlayer.weaponSlot); playSound("audio/button8.mp3"); animState("playerWeapon", "gelatine 0.3s 1");  animParticleBurst(7 , "particleSpark", "playerPanel", 0);items.I299.count-- } ';

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
items.I112.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Throws a wooden boomerang that deals low'+natureIcon+'Nature Damage';
items.I112.flavor = '"An elvish weapon used by the forest dwelling race known as the Australians."';
items.I112.quality = 'Common';
items.I112.use = 'castPineBoomerang(); items.I112.count --; ;'
items.I112.sell = 100;
items.I112.max = 10;
items.I112.align = 'nature'

items.I163 = {};
items.I163.name = 'Bone Shuriken';
items.I163.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Flings a sturdy bone that deals low'+mightIcon+'Might Damage';
items.I163.flavor = '"Sticks and stones may break my bones, but my bones will definitely break yours."';
items.I163.quality = 'Common';
items.I163.use = 'castBoneShuriken(); items.I163.count -- ;'
items.I163.sell = 'artisanBonus("EA4")/20';
items.I163.max = 10;
items.I163.align = 'might'

items.I30 = {};
items.I30.name = 'Light Dynamite';
items.I30.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Throws an explosive dealing high'+elementalIcon+'Elemental Damage to an enemy. Can also be thrown into ore for quick mining<FONT COLOR="gray"> (1 minute Cooldown)';
items.I30.flavor = '"A medium-range explosive. The enemy here appears to be always at the same distance, though."';
items.I30.quality = 'Common';
items.I30.cd = 0;
items.I30.use = ' castLightDynamite(); items.I30.cd = 60; items.I30.count --; if (stats.currentEnemy==="E20") logs.P52.unlocked=true;'
items.I30.sell = 'artisanBonus("EA1")';

items.I491 = {};
items.I491.name = 'Holy Lance Splinter';
items.I491.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Throws back a splinter of the Holy Lance, removing the Invulnerability of the Lady of the Lake';
items.I491.flavor = '"Only the turtles pure of heart may touch a shard of the Holy Lance."';
items.I491.quality = 'Legendary';
items.I491.max = 1;
items.I491.use = ' castHolyLance(); items.I491.count --;'
items.I491.sell = '1';

items.I179 = {};
items.I179.name = 'Soul Canister';
items.I179.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Throws an explosive dealing High'+occultIcon+'Occult Damage to an enemy <FONT COLOR="gray"> (1 minute Cooldown)';
items.I179.flavor = '"Do you have a better idea of what to do with the souls of the dead?"';
items.I179.quality = 'Common';
items.I179.use = ' castSoulCanister(); items.I179.cd = 60; items.I179.count --; ;';
items.I179.sell = 'artisanBonus("EA2")';
items.I179.cd = 0;

items.I370 = {};
items.I370.name = 'Runed Iron Bomb';
items.I370.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Throws an explosive that deals 130K-140K '+elementalIcon+'Elemental Damage to an enemy <FONT COLOR="gray"> (1 minute Cooldown)';
items.I370.flavor = '"An explosive imbued with magical properties. People of old used to call them "Magi Killers". "';
items.I370.quality = 'Uncommon';
items.I370.cd = 0;
items.I370.use = ' castLightDynamite(); items.I30.cd = 60; items.I30.count --; if (stats.currentEnemy==="E20") logs.P52.unlocked=true;'
items.I370.sell = 'artisanBonus("EA4")';

items.I215 = {};
items.I215.name = 'Hex Tag';
items.I215.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Inflicts'+buffIcon("B25")+'Hex over 30 seconds<FONT COLOR="gray"> (2 minute Cooldown)';
items.I215.flavor = '"Something might happen if you eat this."';
items.I215.quality = 'Common';
items.I215.sell = 1300;
items.I215.cd = 0;
items.I215.use = 'castHexTag(); items.I215.cd = 120; items.I215.count--; ;'

items.I67 = {};
items.I67.name = 'Net-O-Launcher 3000';
items.I67.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Launches a net that immobilises the enemy for 10 seconds <FONT COLOR="gray"> (2 minute Cooldown)<br>(Doesn\'t work past reaching Level 30)';
items.I67.flavor = '"We don\'t talk about the other 2999."';
items.I67.quality = 'Uncommon';
items.I67.sell = 'artisanBonus("EN5")';
items.I67.use = ' if (rpgClass[stats.currentClass].level<31) {castNetOLauncher3000(); items.I67.cd = 120; items.I67.count --; ;}'
items.I67.cd = 0;

items.I187 = {};
items.I187.name = 'Firetank Pyrocombulator';
items.I187.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Attach it to your weapon, dealing additional Low'+elementalIcon+'Elemental Damage with every attack. Lasts 2 Minutes until it runs out of fuel <FONT COLOR="gray"> (3 minute Cooldown)'
items.I187.flavor = '"Good grief you don\'t have fingers to blow up."';
items.I187.quality = 'Uncommon';
items.I187.sell = 'artisanBonus("EA3")';
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
items.I84.series = "millionaire"

items.I85 = {};
items.I85.name = 'Reinforced Mattock';
items.I85.description = 'Equipable - Tool<br><FONT COLOR="#1EFF0C">+2 Gathering Level';
items.I85.skills = 'rUpgSkill("I85", "Tempered Steel: +5% Attack Speed","passive",0)'
items.I85.flavor = '"For when you had enough with your hoe."';
items.I85.quality = 'Uncommon';
items.I85.sell = 5000;
items.I85.max = 1;
items.I85.use = 'gearSwap(items.I85.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I85.stats = 'weaponGatheringLevel = 2; items.I85.statUp=0.05'
items.I85.remove = 'weaponGatheringLevel = 0; items.I85.statUp=0';
items.I85.tag = "mattock"
items.I85.series = "millionaire"
items.I85.statUp=0;

items.I24 = {};
items.I24.name = 'Prismatic Mattock';
items.I24.description = 'Equipable - Tool<br><FONT COLOR="#1EFF0C">+3 Gathering Level';
items.I24.skills = 'rUpgSkill("I24", "Polychrome: +10% Attack Speed","passive",0)'
items.I24.flavor = '"It feels like a waste to smash this onto a rock."';
items.I24.quality = 'Rare';
items.I24.sell = 15000;
items.I24.max = 1;
items.I24.use = 'gearSwap(items.I24.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I24.stats = 'weaponGatheringLevel = 3; items.I24.statUp=0.1'
items.I24.remove = 'weaponGatheringLevel = 0; items.I24.statUp=0';
items.I24.tag = "mattock";
items.I24.statUp=0;
items.I24.series = "masterwork"

items.I162 = {};
items.I162.name = 'Old Rod';
items.I162.description = 'Equipable - Tool<br><FONT COLOR="#1EFF0C">+1 Fishing Level';
items.I162.flavor = '"Approach with low expectations."';
items.I162.quality = 'Common';
items.I162.sell = 1000;
items.I162.max = 1;
items.I162.use = 'gearSwap(items.I162.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I162.stats = 'items.I162.statUp=1; weaponSwap("W24")'
items.I162.remove = 'items.I162.statUp=0; weaponSwap("W0")';
items.I162.tag = "rod"
items.I162.animation = 'ranged';
items.I162.statUp=0;
items.I162.series = "millionaire"

items.I171 = {};
items.I171.name = 'Good Fishing Rod';
items.I171.description = 'Equipable - Tool<br><FONT COLOR="#1EFF0C">+2 Fishing Level';
items.I171.skills = 'rUpgSkill("I171", "Tacklebox: +5% Attack Speed","passive",0)'
items.I171.flavor = '"No more magic carps."';
items.I171.quality = 'Uncommon';
items.I171.sell = 'returnGearPrice("I171")';
items.I171.max = 1;
items.I171.use = 'gearSwap(items.I171.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I171.stats = 'items.I171.statUp=2; items.I171.statUp2=0.05; weaponSwap("W25")'
items.I171.remove = 'items.I171.statUp=0; items.I171.statUp2=0; weaponSwap("W0")';
items.I171.tag = "rod"
items.I171.animation = 'ranged';
items.I171.statUp=0;
items.I171.series = "solstice"
items.I171.statUp2=0;

items.I181 = {};
items.I181.name = 'Fish Bait';
items.I181.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Fishing Level by 1 for 30 Minutes <FONT COLOR="gray"> <br>(Only one bait can be active at a time)'
items.I181.flavor = '"Slimy yet satisfying."';
items.I181.quality = 'Common';
items.I181.sell = 500;
items.I181.use = 'removeBuffs("bait"); buffs.B14.time=1800; playerBuffs(); animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1");  items.I181.count--; ';

items.I490 = {};
items.I490.name = 'Smoke Bomb';
items.I490.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Thief success chance for 30 Minutes'
items.I490.flavor = '"Improvised devices with a melted mixture of sugar and potassium nitrate, with a fuse for ignition."';
items.I490.quality = 'Common';
items.I490.sell = 1000;
items.I490.use = 'buffs.B116.time=1800; playerBuffs(); animParticleBurst(10 , "particleSmoke", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1");  items.I490.count--; playSound("audio/gas.mp3"); ';

items.I183 = {};
items.I183.name = 'Soul Grub';
items.I183.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases Fishing Level by 2 for 30 Minutes <FONT COLOR="gray"> <br>(Only one bait can be active at a time)'
items.I183.flavor = '"Infused with unresting spirits."';
items.I183.quality = 'Uncommon';
items.I183.sell = 'artisanBonus("AN9")';
items.I183.use = 'removeBuffs("bait"); buffs.B22.time=1800; playerBuffs(); animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1");  items.I181.count--; ';

items.I8 = {};
items.I8.name = 'Wooden Sword';
items.I8.description = `'Equipable - Weapon<br>'+rUpgLvl("I8")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I8", 1))+' Might Damage'`;
items.I8.flavor = '"A wooden stick shaped like a sword, retaining all the properties of a wooden stick and none of a sword."';
items.I8.skills = 'rUpgSkill("I8", "Splintered Hilt: +20%"+mightIcon+"Might Bonus","passive",10)'
items.I8.quality = 'Common';
items.I8.sell = 100;
items.I8.max = 1
items.I8.use = 'gearSwap(items.I8.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I8.stats = 'weaponMightDamage = rUpgDmg("I8", 1); if (items.I8.level>=10) {items.I8.statUp = 0.2}'
items.I8.remove = 'weaponMightDamage = 0; items.I8.statUp = 0'
items.I8.align = 'might';
items.I8.series = 'heirloom';
items.I8.dynamic = true;
items.I8.statUp = 0;
items.I8.cap = 10;

items.I9 = {};
items.I9.name = 'Wooden Bow';
items.I9.description = `'Equipable - Weapon<br>'+rUpgLvl("I9")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I9", 1))+' Nature Damage'`;
items.I9.skills = 'rUpgSkill("I9", "Fire Arrow: Low chance to deal high"+elementalIcon+"Elemental Damage","active",10)'
items.I9.flavor = '"It should hold together for a few shots before falling apart entirely."';
items.I9.quality = 'Common';
items.I9.sell = 500;
items.I9.max = 1;
items.I9.use = 'gearSwap(items.I9.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I9.stats = 'weaponNatureDamage = rUpgDmg("I9", 1);'
items.I9.remove = 'weaponNatureDamage = 0;'
items.I9.align = 'nature';
items.I9.attackChance = ' castWoodenBow()' 
items.I9.animation = 'ranged';
items.I9.series = 'millionaire';
items.I9.cap = 20;

items.I23 = {};
items.I23.name = 'Firekeg Cannon';
items.I23.description = `'Equipable - Weapon<br>'+rUpgLvl("I23")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I23", 2))+' Elemental Damage'`;
items.I23.skills = 'rUpgSkill("I23", "Cannonball: -50% Attack Speed","active",0)+"<br>"+rUpgSkill("I23", "Glass Cannon: +100%"+elementalIcon+"Elemental Bonus, "+ colorTag("x0.5","#E57D08")+"Max Health","passive",50)'
items.I23.flavor = '"It appears to be single-barreled."';
items.I23.quality = 'Rare';
items.I23.sell = 'returnGearPrice("I23")';
items.I23.max = 1;
items.I23.use = 'gearSwap(items.I23.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I23.stats = 'weaponElementalDamage = rUpgDmg("I23", 2); items.I23.statUp= -0.5; if (items.I23.level>49) items.I23.statUp2= 0.5'
items.I23.remove = 'weaponElementalDamage = 0; items.I23.statUp= 0; items.I23.statUp2= 0'
items.I23.align = "elemental";
items.I23.attackChance = ' castFirekegCannon()' 
items.I23.animation = 'ranged';
items.I23.series = "revered"; 
items.I23.cap = 60;
items.I23.statUp= 0;
items.I23.statUp2= 0;

items.I27 = {};
items.I27.name = 'Moonlit Greatsword';
items.I27.description = `'Equipable - Weapon<br>'+rUpgLvl("I27")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I27", 1))+' Elemental Damage'`;
items.I27.flavor = '"Nothing appears to be refracted on the edge but the blue hue of the moon."';
items.I27.skills = 'rUpgSkill("I27", "Blessing of the Moon: Very low chance to empower your attacks","active",35)+"<br>"+rUpgSkill("I27", "Kaguya Desperatio: Blessing of the Moon Damage Up","passive",45)+"<br>"+rUpgSkill("I27", "Artemisa Legatum: +20%"+elementalIcon+"Elemental Bonus","passive",55)'
items.I27.quality = 'Epic';
items.I27.sell = 'returnGearPrice("I27")';
items.I27.max = 1;
items.I27.use = 'gearSwap(items.I27.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I27.stats = 'weaponElementalDamage = rUpgDmg("I27", 1); if (items.I27.level>54) items.I27.statUp= 0.2'
items.I27.remove = 'weaponElementalDamage = 0;  items.I27.statUp= 0'
items.I27.align = 'elemental';
items.I27.attackChance = 'castMoonlitGreatsword()'
items.I27.series = "revered"; 
items.I27.cap = 60;
items.I27.statUp = 0;

items.I28 = {};
items.I28.name = 'Edge Of Cataclysm';
items.I28.description = `'Equipable - Weapon<br>'+rUpgLvl("I28")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I28", 1))+' Deific Damage'`;
items.I28.skills = 'rUpgSkill("I28", "Meteora: Low chance to deal medium"+deificIcon+"Deific Damage 4 times","active",40)+"<br>"+rUpgSkill("I28", "Purging Fire: Meteora now inflicts"+buffIcon("B51")+"Sacro for 5 seconds","passive",50)'
items.I28.flavor = '"Terrific blade wielded by the jailer of the hallowed grounds. Tasked with warding off souls, this weapon has become nearly sentient over time."';
items.I28.quality = 'Rare';
items.I28.sell = 'returnGearPrice("I28")';
items.I28.max = 1;
items.I28.use = 'gearSwap(items.I28.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I28.stats = 'weaponDeificDamage = rUpgDmg("I28", 1);'
items.I28.remove = 'weaponDeificDamage = 0;'
items.I28.align = 'deific';
items.I28.attackChance = 'castEdgeOfCataclysm()';
items.I28.series = "revered"; 
items.I28.cap = 60;

items.I33 = {};
items.I33.name = 'Foliar Blade';
items.I33.description = `'Equipable - Weapon<br>'+rUpgLvl("I33")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I33", 1))+' Nature Damage'`;
items.I33.skills = 'rUpgSkill("I33", "Photosynthesis: Low chance to restore Health","active",15)+"<br>"+rUpgSkill("I33", "Verdant Trail: Photosynthesis now increases"+natureIcon+"Nature Bonus by 20%","passive",25)'
items.I33.flavor = '"A blossoming blade emerging from the heart of the forest. Like plantlife, it can harness sunlight to gain strength."';
items.I33.quality = 'Uncommon';
items.I33.sell = 'returnGearPrice("I33")';
items.I33.max = 1;
items.I33.use = 'gearSwap(items.I33.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I33.stats = 'weaponNatureDamage = rUpgDmg("I33", 1);'
items.I33.remove = 'weaponNatureDamage = 0; '
items.I33.align = 'nature';
items.I33.attackChance = 'castFoliarBlade()';
items.I33.series = 'masterwork';
items.I33.cap = 30;

items.I55 = {};
items.I55.name = 'Festive Wakizashi';
items.I55.description = `'Equipable - Weapon<br>'+rUpgLvl("I55")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I55", 1))+' Deific Damage'`;
items.I55.flavor = '"A decorated sword used in festivities and joyous days."';
items.I55.skills = 'rUpgSkill("I55", "Ceremonial Blade: +20%"+expIcon+"EXP Bonus","passive",0)+"<br>"+rUpgSkill("I55", "Serizawa Festival: Low chance to increase"+deificIcon+"Deific Bonus by 120%","active",30)'
items.I55.quality = 'Common';
items.I55.sell = 10000;
items.I55.max = 1;
items.I55.use = 'gearSwap(items.I55.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I55.stats = 'weaponDeificDamage = rUpgDmg("I55", 1); items.I55.statUp = 0.2'
items.I55.remove = 'weaponDeificDamage = 0; items.I55.statUp = 0 '
items.I55.align = 'deific';
items.I55.attackChance = 'castSerizawaFestival()'
items.I55.series = 'forgotten';
items.I55.cap = 40;
items.I55.statUp = 0;

items.I60 = {};
items.I60.name = 'Bluefin Tuna';
items.I60.description = `'Equipable - Weapon<br>'+rUpgLvl("I60")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I60", 1))+' Nature Damage'`;
items.I60.flavor = '"Never swim against the current. Never go against tortuga."';
items.I60.skills = 'rUpgSkill("I60", "Fishnado: Low chance to deal Low"+natureIcon+"Nature Damage 3 times","active",35)+"<br>"+rUpgSkill("I60", "Incoming Backup: Fishnado hits 1 additional time","passive",45)'
items.I60.quality = 'Rare';
items.I60.sell = 'returnGearPrice("I60")';
items.I60.max = 1;
items.I60.use = 'gearSwap(items.I60.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I60.stats = 'weaponDeificDamage = rUpgDmg("I60", 1);'
items.I60.remove = 'weaponDeificDamage = 0; '
items.I60.align = 'nature';
items.I60.attackChance = 'castBluefinTuna()';
items.I60.series = "beastfallen"; 
items.I60.cap = 50;

items.I69 = {};
items.I69.name = 'Boxing Gloves';
items.I69.description = `'Equipable - Weapon<br>'+rUpgLvl("I69")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I69", 1))+' Might Damage'`;
items.I69.skills = 'rUpgSkill("I69", "TKO: Low chance to deal High"+mightIcon+"Might Damage","active",20)'
items.I69.flavor = '"If a turtle wore boxing gloves, would they wear them like this or...?"';
items.I69.quality = 'Uncommon';
items.I69.sell = 'returnGearPrice("I69")';
items.I69.max = 1;
items.I69.use = 'gearSwap(items.I69.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I69.stats = 'weaponMightDamage = rUpgDmg("I69", 1);'
items.I69.remove = 'weaponMightDamage = 0; '
items.I69.align = 'might';
items.I69.attackChance = 'castBoxingGloves()';
items.I69.series = 'masterwork';
items.I69.cap = 30;

items.I78 = {};
items.I78.name = 'Arcanite Darkblade';
items.I78.description = `'Equipable - Weapon<br>'+rUpgLvl("I78")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I78", 1))+' Deific Damage'`;
items.I78.flavor = '"A fine sword bestowed to the holy turtle riders. They say that blood spilled with this edge bleeds black."';
items.I78.skills = 'rUpgSkill("I78", "Holy Slash: Attacks deal extra medium"+deificIcon+"Deific Damage","active",20)+"<br>"+rUpgSkill("I78", "Vanquish Darkness: +20%"+deificIcon+"Deific Bonus","passive",35)'
items.I78.quality = 'Uncommon';
items.I78.sell = 'artisanBonus("SA4")';
items.I78.max = 1;
items.I78.use = 'gearSwap(items.I78.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I78.stats = 'weaponDeificDamage = rUpgDmg("I78", 1); if(items.I78.level>34) items.I78.statUp=0.2'
items.I78.remove = 'weaponDeificDamage = 0; items.I78.statUp=0'
items.I78.align = 'deific';
items.I78.attackChance = 'castRegalBroadsword()'
items.I78.series = 'forgotten';
items.I78.cap = 40;
items.I78.statUp=0;

items.I81 = {};
items.I81.name = 'Sacrificial Dagger';
items.I81.description = `'Equipable - Weapon<br>'+rUpgLvl("I81")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I81", 0.85))+' Occult Damage'`;
items.I81.skills = 'rUpgSkill("I81", "Dagger Affinity: +15% Attack Speed","passive",0)+"<br>"+rUpgSkill("I81", "Leech Energy: Low chance to deal Medium"+occultIcon+"Occult Damage and healing a portion of it","active",30)'
items.I81.flavor = '"A dagger used in rituals of darkness. The dagger itself has nothing sinister going on, it just simply had the misfortune of taking part in them."';
items.I81.quality = 'Rare';
items.I81.sell = 'returnGearPrice("I81")';
items.I81.max = 1;
items.I81.use = 'gearSwap(items.I81.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I81.stats = 'weaponOccultDamage = rUpgDmg("I81", 0.85); items.I81.statUp= 0.15'
items.I81.remove = 'weaponOccultDamage = 0; items.I81.statUp= 0'
items.I81.attackChance = 'castSacrificialDagger()';
items.I81.align = "occult";
items.I81.series = 'beastfallen';
items.I81.statUp= 0;
items.I81.cap = 50;

items.I82 = {};
items.I82.name = 'Dragonfell Sword';
items.I82.description = `'Equipable - Weapon<br>'+rUpgLvl("I82")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I82", 3))+' Might Damage'`;
items.I82.skills = 'rUpgSkill("I82", "Dragonrender: -50% Attack Speed","active",0)+"<br>"+rUpgSkill("I82", "Aftershock: Dragonrender hits an additional time for Low"+mightIcon+"Might Damage","passive",70)'
items.I82.flavor = '"Too big to be called a sword. Too big, too thick, too heavy, and too rough. It\'s more like a large hunk of iron."';
items.I82.quality = 'Rare';
items.I82.sell = 'returnGearPrice("I82")';
items.I82.max = 1;
items.I82.use = 'gearSwap(items.I82.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I82.stats = 'weaponMightDamage = rUpgDmg("I82", 3); items.I82.statUp= -0.5;'
items.I82.remove = 'weaponMightDamage = 0; items.I82.statUp= 0;'
items.I82.attackChance = 'castDragonfellSword()';
items.I82.align = "might";
items.I82.statUp= 0;
items.I82.series = "ancient"; 
items.I82.cap = 80;
items.I82.tier = 2;

items.I169 = {};
items.I169.name = 'The Caught';
items.I169.description = `'Equipable - Weapon<br>'+rUpgLvl("I169")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I169", 1))+' Might Damage'`;
items.I169.flavor = '"A two-pronged fishing spear forged from a unique blue-hued metal, reflecting the mysteries of the deep."';
items.I169.skills = 'rUpgSkill("I169", "Whirlpool: Low chance to deal medium"+mightIcon+"Might Damage 6 times","active",30)+"<br>"+rUpgSkill("I169", "King of the Seas: +15%"+mightIcon+"Might Resistance","passive",40)+"<br>"+rUpgSkill("I169", "Razorblade Typhoon: Whirlpool inflicts"+buffIcon("B32")+"Bleed for 6 seconds","passive",50)'
items.I169.quality = 'Epic';
items.I169.sell = 'returnGearPrice("I169")';
items.I169.max = 1;
items.I169.use = 'gearSwap(items.I169.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I169.stats = 'weaponMightDamage = rUpgDmg("I169", 1); if(items.I169.level>39) items.I169.statUp=0.15'
items.I169.remove = 'weaponMightDamage = 0; items.I169.statUp=0'
items.I169.align = 'might';
items.I169.attackChance = 'castTheCaught()'
items.I169.series = 'revered';
items.I169.cap = 60;
items.I169.statUp=0;

items.I167 = {};
items.I167.name = 'Wraithblade Scimitar';
items.I167.description = `'Equipable - Weapon<br>'+rUpgLvl("I167")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I167", 1))+' Occult Damage'`;
items.I167.flavor = '"A spooky scary blade with an otherworldly edge. It sends shivers down your spine."';
items.I167.skills = 'rUpgSkill("I167", "Soulburn: Your attacks inflict stacking"+occultIcon+"Occult Damage over time","active",30)+"<br>"+rUpgSkill("I167", "Purgatory Crux: +20%"+occultIcon+"Occult Bonus","passive",40)+"<br>"+rUpgSkill("I167", "Anima Buster: Massive"+occultIcon+"Occult Damage the end of Soulburn","passive",50)'
items.I167.quality = 'Epic';
items.I167.sell = 'returnGearPrice("I167")';
items.I167.max = 1;
items.I167.use = 'gearSwap(items.I167.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I167.stats = 'weaponOccultDamage = rUpgDmg("I167", 1); if(items.I167.level>39) items.I167.statUp=0.2'
items.I167.remove = 'weaponOccultDamage = 0; items.I167.statUp=0'
items.I167.align = 'occult';
items.I167.attackChance = 'castWraithbladeScimitar()'
items.I167.series = "revered"; 
items.I167.cap = 60;
items.I167.statUp=0;

items.I137 = {};
items.I137.name = 'King-Kat Decapitator';
items.I137.description = `'Equipable - Weapon<br>'+rUpgLvl("I137")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I137", 1))+' Might Damage'`;
items.I137.skills = 'rUpgSkill("I137", "Mighty Roar: Low chance to increase"+mightIcon+"Might Bonus by 25%","active",20)+"<br>"+rUpgSkill("I137", "Sin of Pride: +15%"+strIcon+"Strength","passive",40)'
items.I137.flavor = '"It\'s not flawed, it\'s just a one-handed axe."';
items.I137.quality = 'Rare';
items.I137.sell = 'returnGearPrice("I137")';
items.I137.max = 1;
items.I137.use = 'gearSwap(items.I137.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I137.stats = 'weaponMightDamage = rUpgDmg("I137", 1); if(items.I137.level>39) items.I137.statUp=0.15'
items.I137.remove = 'weaponMightDamage = 0; items.I137.statUp=0;'
items.I137.align = 'might';
items.I137.attackChance = 'castKingKatDecapitator()';
items.I137.series = "beastfallen"; 
items.I137.statUp = 0;
items.I137.cap = 50;

items.I83 = {};
items.I83.name = 'Chrysalis Recurver';
items.I83.description = `'Equipable - Weapon<br>'+rUpgLvl("I83")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I83", 1))+' Occult Damage'`;
items.I83.skills = 'rUpgSkill("I83", "Split Shot: Medium chance to deal low"+occultIcon+"Occult Damage 3 times","active",20)+"<br>"+rUpgSkill("I83", "Crystal Castles: Split Shot fires off 2 additional projectiles","passive",30)'
items.I83.flavor = '"A short, ominous bow splintered with red crystals."';
items.I83.quality = 'Uncommon';
items.I83.sell = 'returnGearPrice("I83")';
items.I83.max = 1;
items.I83.use = 'gearSwap(items.I83.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I83.stats = 'weaponOccultDamage = rUpgDmg("I83", 1);'
items.I83.remove = 'weaponOccultDamage = 0;'
items.I83.attackChance = 'castChrysalisRecurver()'
items.I83.align ="occult";
items.I83.animation = 'ranged';
items.I83.series = 'forgotten';
items.I83.cap = 40;

items.I80 = {};
items.I80.name = 'Copperwork Axe';
items.I80.description = `'Equipable - Weapon<br>'+rUpgLvl("I80")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I80", 1))+' Elemental Damage'`;
items.I80.flavor = '"This must be the sort of weapon that turtles had been using before the iron age, which began approximately 1200 BC."';
items.I80.skills = 'rUpgSkill("I80", "Steam Stream: Medium chance to deal medium"+elementalIcon+"Elemental Damage","active",15)+"<br>"+rUpgSkill("I80", "Sturdy Casing: "+ colorTag("x1.2","#E57D08")+"Max Health","passive",30)'
items.I80.quality = 'Uncommon';
items.I80.sell = 'artisanBonus("SA1")';
items.I80.max = 1;
items.I80.use = 'gearSwap(items.I80.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I80.stats = 'weaponElementalDamage = rUpgDmg("I80", 1); if (items.I80.level>29) items.I80.statUp= 1.2'
items.I80.remove = 'weaponElementalDamage = 0; items.I80.statUp= 1';
items.I80.statUp = 1
items.I80.attackChance = 'castCopperworkAxe()'
items.I80.align = 'elemental';
items.I80.series = 'masterwork';
items.I80.cap = 30;

items.I20 = {};
items.I20.name = 'Magewood Staff';
items.I20.description = `'Equipable - Weapon<br>'+rUpgLvl("I20")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I20", 1))+' Elemental Damage'`;
items.I20.skills = 'rUpgSkill("I20", "Catalize: +40%"+spIcon+"Spellpower","passive",60)+"<br>"+rUpgSkill("I20", "O Flame: +30%"+elementalIcon+"Elemental Bonus","passive",70)'
items.I20.flavor = '"A staff employed by the mages of the royal army. Not all turtles are endowed with the rare quality of magic."';
items.I20.quality = 'Rare';
items.I20.sell = 'returnGearPrice("I20")';
items.I20.max = 1;
items.I20.use = 'gearSwap(items.I20.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I20.stats = 'weaponElementalDamage = rUpgDmg("I20", 1); if (items.I20.level>59) items.I20.statUp= 0.4; if (items.I20.level>69) items.I20.statUp2= 0.3'
items.I20.remove = 'weaponElementalDamage = 0;  items.I20.statUp= 0;  items.I20.statUp2= 0'
items.I20.align = 'elemental';
items.I20.attackChance = ' castMagewoodStaff()' 
items.I20.animation = 'ranged';
items.I20.series = "ancient"; 
items.I20.cap = 80;
items.I20.tier = 2;
items.I20.statUp = 0;
items.I20.statUp2 = 0;

items.I170 = {};
items.I170.name = 'Penguin\'s Umbrella';
items.I170.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+910 Deific Damage<br>On Attack: High chance to pull out random stuff out of your umbrella, dealing various types of damage';
items.I170.flavor = '"A lot of tape and a little patience make all the difference."';
items.I170.quality = 'Rare';
items.I170.sell = 'returnGearPrice("I170")';
items.I170.max = 1;
items.I170.use = 'gearSwap(items.I170.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I170.stats = 'additiveDeificDamage += 910; weaponSwap("W22")'
items.I170.remove = 'additiveDeificDamage -= 910; weaponSwap("W0")'
items.I170.align = 'deific';
items.I170.attackChance = 'if (rng(1,2)===1) castPenguinsUmbrella()'

items.I64 = {};
items.I64.name = 'Terrorscythe';
items.I64.description = `'Equipable - Weapon<br>'+rUpgLvl("I64")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I64", 1))+' Occult Damage'`;
items.I64.skills = 'rUpgSkill("I64", "Dark Harvest: Low chance to increase"+occultIcon+"Occult Bonus by 50%","active",50)+"<br>"+rUpgSkill("I64", "Assimilate: +50%"+occultIcon+"Occult Resistance during Dark Harvest","passive",60)'
items.I64.flavor = '"A weapon normally asociated with either death and grim, or just getting some vegetables out of the floor. Which one will it be?"';
items.I64.quality = 'Rare';
items.I64.sell = 'returnGearPrice("I64")';
items.I64.max = 1;
items.I64.use = 'gearSwap(items.I64.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I64.stats = 'weaponOccultDamage = rUpgDmg("I64", 1);'
items.I64.remove = 'weaponOccultDamage = 0;';
items.I64.align = 'occult';
items.I64.attackChance = 'castTerrorscythe();';
items.I64.tier = 2

items.I297 = {};
items.I297.name = 'Tortufleet';
items.I297.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+beautify(486739)+' Might Damage<br>-2000 Haste<br>On Attack: Launch a superheated ball of plasma that hits 10 times with massive '+elementalIcon+'Elemental Damage';
items.I297.flavor = '<FONT COLOR="darkorange">"Blows Up Everything!!!"';
items.I297.quality = 'Legendary';
items.I297.sell = 'returnGearPrice("I297")';
items.I297.max = 1;
items.I297.use = 'gearSwap(items.I297.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I297.stats = 'weaponMightDamage = 486739; weaponHaste = -2'
items.I297.remove = 'weaponMightDamage = 0; weaponHaste = 0'
items.I297.attackChance = 'castTortufleet()';
items.I297.align = "elemental";
items.I297.animation = 'ranged';

items.I319 = {};
items.I319.name = 'Spirit Splitter';
items.I319.description = `'Equipable - Weapon<br>'+rUpgLvl("I319")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I319", 1))+' Deific Damage'`;
items.I319.skills = 'rUpgSkill("I319", "Soul Rend: Low chance to use 10 magic to deal High"+deificIcon+"Deific Damage","active",50)+"<br>"+rUpgSkill("I319", "Surge: Medium chance to use 5 magic to increase"+deificIcon+"Deific Bonus by 15% per stack up to 5","active",60)+"<br>"+rUpgSkill("I319", "Entropy: Surge can have a maximum of 10 stacks","active",70)'
items.I319.flavor = '"This blade disassembles the spiritual energy of every living being to the touch, leaving no trace or mark behind."';
items.I319.quality = 'Epic';
items.I319.sell = 'returnGearPrice("I319")';
items.I319.max = 1;
items.I319.use = 'gearSwap(items.I319.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I319.stats = 'weaponDeificDamage = rUpgDmg("I319", 1);'
items.I319.remove = 'weaponDeificDamage = 0;'
items.I319.attackChance = 'castManaSplitter()'
items.I319.align = 'deific';
items.I319.series = 'ancient';
items.I319.cap = 80;

items.I320 = {};
items.I320.name = 'Heavenly Ruin';
items.I320.description = `'Equipable - Weapon<br>'+rUpgLvl("I320")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I320", 1))+' Elemental Damage'`;
items.I320.skills = 'rUpgSkill("I320", "Spiritron Break: Deal Medium"+elementalIcon+"Elemental Damage overtime, -40% Attack Speed","active",0)+"<br>"+rUpgSkill("I320", "Enkidu\'s Will: +30%"+elementalIcon+"Elemental Bonus","passive",80)'
items.I320.flavor = '"When of the gods none had been called into being, and none bore a name, and no destinies were ordained; Then were created the gods in the midst of heaven."';
items.I320.quality = 'Rare';
items.I320.sell = 'returnGearPrice("I320")';
items.I320.max = 1;
items.I320.use = 'gearSwap(items.I320.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I320.stats = 'weaponElementalDamage = rUpgDmg("I320", 1); items.I320.statUp= -0.4;'
items.I320.remove = 'weaponElementalDamage = 0; items.I320.statUp= 0;'
items.I320.attackChance = 'castHeavenlyRuin()'
items.I320.align = 'elemental';
items.I320.animation = 'ranged';
items.I320.series = 'malevolent';
items.I320.cap = '90';
items.I320.tier = 2;
items.I320.statUp= 0;

items.I321 = {};
items.I321.name = 'Hidden Pledge';
items.I321.description = `'Equipable - Weapon<br>'+rUpgLvl("I321")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I321", 1))+' Nature Damage'`;
items.I321.skills = 'rUpgSkill("I321", "Multicolored Multikill: Low chance to deal low"+natureIcon+"Nature Damage a random amount of times","active",50)+"<br>"+rUpgSkill("I321", "Colored Pinions: +20%"+natureIcon+"Nature Bonus","passive",60)+"<br>"+rUpgSkill("I321", "Fiesta: Low chance to deal random debuffs","passive",70)'
items.I321.flavor = '"A tribal greatbow covered in feathers. There are many ancient carvings on the surface depicting a giant creature bonding with a certain tribe."';
items.I321.quality = 'Epic';
items.I321.sell = 'returnGearPrice("I321")';
items.I321.max = 1;
items.I321.use = 'gearSwap(items.I321.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I321.stats = 'weaponNatureDamage = rUpgDmg("I321", 1); if (items.I321.level>59) items.I321.statUp= 0.2'
items.I321.remove = 'weaponNatureDamage = 0; items.I321.statUp= 0'
items.I321.attackChance = 'castHiddenPledge()'
items.I321.align = 'nature';
items.I321.animation = 'ranged';
items.I321.series = 'ancient';
items.I321.cap = 80;
items.I321.statUp= 0;

items.I322 = {};
items.I322.name = 'Fossil Club';
items.I322.description = `'Equipable - Weapon<br>'+rUpgLvl("I322")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I322", 1))+' Might Damage'`;
items.I322.skills = 'rUpgSkill("I322", "Marrowstorm: Low chance to deal High"+mightIcon+"Might Damage 3 times","active",45)+"<br>"+rUpgSkill("I322", "Ancient Might: +15%"+strIcon+"Strength","passive",60)'
items.I322.flavor = '"Millions of years worth of pain."';
items.I322.quality = 'Uncommon';
items.I322.sell = 'artisanBonus("SA2")';
items.I322.max = 1;
items.I322.use = 'gearSwap(items.I322.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I322.stats = 'weaponMightDamage = rUpgDmg("I322", 1); if (items.I322.level>59) items.I322.statUp= 0.15'
items.I322.remove = 'weaponMightDamage = 0; items.I322.statUp= 0'
items.I322.attackChance = 'castFossilClub()'
items.I322.align = 'might';
items.I322.series = "solstice"; 
items.I322.cap = 70;
items.I322.tier = 2;
items.I322.statUp= 0;

items.I323 = {};
items.I323.name = 'Floral Shortbow';
items.I323.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(510, "I80")+' Nature Damage<br>+60% Attack Speed<br>On Attack: Medium chance to shoot a flower';
items.I323.flavor = '"A shortbow made entirely out of plant matter. Nature really sports a hefty craftmanship."';
items.I323.quality = 'Rare';
items.I323.sell = 100000;
items.I323.max = 1;
items.I323.use = 'gearSwap(items.I323.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I323.stats = 'weaponNatureDamage = 45839661; weaponHaste = 0.6'
items.I323.remove = 'weaponNatureDamage = 0; weaponHaste = 0'
items.I323.attackChance = 'castFloralBow()'
items.I323.align = 'nature';
items.I323.animation = 'ranged';
//items.I323.series = 'runic';

items.I324 = {};
items.I324.name = 'Angelic Buster';
items.I324.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(91721839, "I324"))+' Deific Damage<br>On Attack: Low chance throw your weapon, slicing the enemy for medium '+deificIcon+'Deific Damage 4 times'`;
items.I324.flavor = '"A greatsword encasing the fury of the fallen angels. It is said that the blade will refuse to cut anything but evil."';
items.I324.quality = 'Epic';
items.I324.sell = 1000;
items.I324.max = 10;
items.I324.use = 'gearSwap(items.I324.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I324.stats = 'weaponDeificDamage = returnItemUpgradeScaling(91721839, "I324");'
items.I324.remove = 'weaponDeificDamage = 0;'
items.I324.attackChance = 'if (rng(1,7)===1) castAngelicBuster()'
items.I324.align = 'deific';

items.I325 = {};
items.I325.name = 'Wrath';
items.I325.description = `'Equipable - Weapon<br>'+rUpgLvl("I325")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I325", 1))+' Occult Damage'`;
items.I325.skills = 'rUpgSkill("I325", "Star of Destruction: Increase"+occultIcon+"Occult Bonus with each attack","active",0)'
items.I325.flavor = '"Resentful half of a legendary blade. Forged within the depths of the darkest hearts, your mind blurs in a haze at wield."';
items.I325.quality = 'Mythic';
items.I325.sell = 'returnGearPrice("I325")';
items.I325.max = 1;
items.I325.use = 'gearSwap(items.I325.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I325.stats = 'weaponOccultDamage = rUpgDmg("I325", 1);'
items.I325.remove = 'weaponOccultDamage = 0;'
items.I325.attackChance = 'castWrath()'
items.I325.align = 'occult';
items.I325.series = 'ancient';
items.I325.cap = 80;

items.I326 = {};
items.I326.name = 'Faith';
items.I326.description = `'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(510, "I80")+' Deific Damage<br>On Attack: Low chance to gain Star Of Hope, causing every attack to inflict one stack of Daybreak, dealing '+deificIcon+'Deific Damage overtime'`;
items.I326.flavor = '"Merciful half of a legendary blade. Acording to the legend of creation, this edge was used to vanquish a great evil."';
items.I326.quality = 'Epic';
items.I326.sell = 1000;
items.I326.max = 10;
items.I326.use = 'gearSwap(items.I326.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I326.stats = 'weaponDeificDamage = returnItemUpgradeScaling(510, "I326");'
items.I326.remove = 'weaponDeificDamage = 0;'
items.I326.attackChance = 'castFaith()'
items.I326.align = 'deific';

items.I327 = {};
items.I327.name = 'Eternity\'s End';
items.I327.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+'+ returnItemUpgradeScaling(510, "I80")+' Elemental Damage<br>On Attack: Low chance to gain Twin Stars Of Creation, causing every attack to inflict one stack of Nightwither, dealing '+occultIcon+'Occult Damage overtime, and increasing your Omni by 10% for 10 seconds. At the end of the duration, throw your weapon for massive '+deificIcon+'Deific Damage';
items.I327.flavor = '"Never lose your way."';
items.I327.quality = 'Legendary';
items.I327.sell = 'artisanBonus("SA3")'
items.I327.max = 1;
items.I327.use = 'gearSwap(items.I327.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I327.stats = 'weaponElementalDamage = returnItemUpgradeScaling(510, "I327");'
items.I327.remove = 'weaponElementalDamage = 0;'
items.I327.attackChance = 'castEternitysEnd()'
items.I327.align = 'elemental';
//items.I327.series = 'omega';

items.I328 = {};
items.I328.name = 'Brass Dooter';
items.I328.description = 'Equipable - Weapon';
items.I328.skills = 'rUpgSkill("I328", "Oblivion: High chance to doot the enemy","passive",0)'
items.I328.flavor = '"Well thats annoying."';
items.I328.quality = 'Mythic';
items.I328.sell = 'returnGearPrice("I328")';
items.I328.max = 1;
items.I328.use = 'gearSwap(items.I328.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I328.attackChance = 'playSound("audio/trumpet.mp3"); if (stats.currentEnemy==="E15") { cd.presentCanSpawn=0; enemyBasicDamage(50); if (rng(1,6)===1) { deleteEnemy("E43"); playSound("audio/hawk.mp3"); animParticleBurst(10 , "particleFire", "enemyPanel", 200);animParticleBurst(10 , "particleSpark", "enemyPanel", 200); animImageSplash("soundWave", "enemyPanel", "wave", 200); animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1"); playSound("audio/explosion.mp3"); } }'
items.I328.animation = 'ranged';
items.I328.series = 'ancient';
items.I328.noUpgrade = true;

items.I371 = {};
items.I371.name = 'Vice\'s Retribution';
items.I371.description = `'Equipable - Weapon<br>'+rUpgLvl("I371")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I371", 2.5))+' Occult Damage'`;
items.I371.skills = 'rUpgSkill("I371", "Jeweled Summon: Summons a creature to deal"+occultIcon+"Occult Damage for you","passive",0)+"<br>"+rUpgSkill("I371", "Abomination Boost: Increased damage of Jeweled Summon","active",70)+bestiaryTag("⚜️ Dedicated Content: pikacheecks ⚜️", "#A351AB")'
items.I371.flavor = '"Sorry, but I won\'t hold back."';
items.I371.quality = 'Rare';
items.I371.sell = 'returnGearPrice("I371")';
items.I371.max = 1;
items.I371.use = 'gearSwap(items.I371.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I371.stats = 'weaponOccultDamage = rUpgDmg("I371", 2.5); '
items.I371.remove = 'weaponOccultDamage = 0;'
items.I371.attackChance = 'castVicesRetribution()'
items.I371.align = 'occult';
items.I371.animation = 'none';
items.I371.series = 'ancient';
items.I371.cap = 80;
items.I371.tier = 2;

items.I59 = {};
items.I59.name = 'Rana Hat';
items.I59.description = `'Equipable - Head<br>'+rUpgLvl("I59")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I59", 1))+' Max Health'`;
items.I59.skills = 'rUpgSkill("I59", "Karmic Retribution: Increases"+natureIcon+"Nature Bonus by 0.005% for every Ribull defeated (max 30%)","passive",0)'
items.I59.flavor = '"Ribbit."';
items.I59.quality = 'Uncommon';
items.I59.sell = 'returnGearPrice("I59")';
items.I59.max = 1;
items.I59.use = 'gearSwap(items.I59.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I59.stats = 'headAdditiveMaxHp = rUpgDmg("I59", 1); items.I59.statUp = Math.min(enemies.E3.killCount*0.00005, 0.3)'
items.I59.remove = 'headAdditiveMaxHp = 0; items.I59.statUp = 0;'
items.I59.statUp = 0;
items.I59.series = 'masterwork';
items.I59.cap = 30;

items.I127 = {};
items.I127.name = 'Black Belt';
items.I127.description = `'Equipable - Legs<br>'+rUpgLvl("I127")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I127", 1))+' Max Health'`;
items.I127.skills = 'rUpgSkill("I127", "Jujitsu  Stance: +15%"+mightIcon+"Might Resistance","passive",30)+"<br>"+rUpgSkill("I127", "Aikido  Stance: +15%"+strIcon+"Strength","passive",40)'
items.I127.flavor = '"I fear not the man who has practiced 10000 kicks once, but the turtle who sat five hours headbutting a chicken 100000 times"';
items.I127.quality = 'Rare';
items.I127.sell = 'returnGearPrice("I127")';
items.I127.max = 1;
items.I127.use = 'gearSwap(items.I127.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I127.stats = 'legsAdditiveMaxHp = rUpgDmg("I127", 1); items.I127.statUp = 0.15; if(items.I127.level>39) items.I127.statUp2=0.15'
items.I127.remove = 'legsAdditiveMaxHp = 0; items.I127.statUp = 0;items.I127.statUp2 = 0;'
items.I127.statUp = 0;
items.I127.statUp2 = 0;
items.I127.series = 'beastfallen';
items.I127.cap = 50;

items.I288 = {};
items.I288.name = 'Flameplate Gauntlets';
items.I288.description =`'Equipable - Hands<br>'+rUpgLvl("I288")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I288", 1))+' Max Health'`
items.I288.skills = 'rUpgSkill("I288", "Fireproof: +20%"+elementalIcon+"Elemental Resistance","passive",30)+"<br>"+rUpgSkill("I288", "Drake Heritage: +20%"+elementalIcon+"Elemental Bonus","passive",50)'
items.I288.stats = 'handsAdditiveMaxHp = rUpgDmg("I288", 1); if (items.I288.level>29) items.I288.statUp= 0.2; if (items.I288.level>49) items.I288.statUp2= 0.2'
items.I288.remove = 'handsAdditiveMaxHp = 0; items.I288.statUp=0; items.I288.statUp2=0;'
items.I288.max = 1;
items.I288.quality = 'Rare';
items.I288.sell = 'returnGearPrice("I288")';
items.I288.flavor = '"Forged to whithstand the highest temperatures known to turtles."';
items.I288.use = 'gearSwap(items.I288.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I288.series = "revered"; 
items.I288.cap = 60;
items.I288.statUp2=0;
items.I288.statUp=0;

items.I360 = {};
items.I360.name = 'Robertus Pajamas';
items.I360.description =`'Equipable - Chest<br>'+rUpgLvl("I360")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I360", 1))+' Max Health'`
items.I360.skills = 'rUpgSkill("I360", "Arcane Goodnights: +25%"+spIcon+"Spellpower","passive",50)+"<br>"+rUpgSkill("I360", "Empowered Sheep Counting: +25%"+spIcon+"Spellpower","passive",60)'
items.I360.stats = 'chestAdditiveMaxHp = rUpgDmg("I360", 1); if (items.I360.level>49) items.I360.statUp= 0.25; if (items.I360.level>59) items.I360.statUp= 0.50'
items.I360.remove = 'chestAdditiveMaxHp = 0; items.I360.statUp=0; '
items.I360.max = 1;
items.I360.quality = 'Rare';
items.I360.sell = 'returnGearPrice("I360")';
items.I360.flavor = '"Give that back you old rascal!"';
items.I360.use = 'gearSwap(items.I360.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I360.series = "solstice"; 
items.I360.cap = 70;
items.I360.statUp=0;

items.I206 = {};
items.I206.name = 'Raven Sandals';
items.I206.description =`'Equipable - Feet<br>'+rUpgLvl("I206")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I206", 1))+' Max Health'`
items.I206.skills = 'rUpgSkill("I206", "Black Prayer: Doubles the damage of"+occultIcon+"Occult based debuffs","passive",50)+"<br>"+rUpgSkill("I206", "White Prayer: +10% Healing Received","passive",60)'
items.I206.flavor = '"Can you hear the crow\'s caw?"';
items.I206.stats = 'feetAdditiveMaxHp = rUpgDmg("I206", 1); if (items.I206.level>49) items.I206.statUp= 2; if (items.I206.level>49) items.I206.statUp2= 0.15'
items.I206.remove = 'feetAdditiveMaxHp = 0; items.I206.statUp=1; items.I206.statUp2=0'
items.I206.max = 1;
items.I206.quality = 'Rare';
items.I206.sell = 'returnGearPrice("I206")';
items.I206.use = 'gearSwap(items.I206.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I206.statUp = 1;
items.I206.statUp2 = 0;
items.I206.series = "ancient";
items.I206.cap = 80;
items.I206.statUp2 = 0;

items.I387 = {};
items.I387.name = 'Ebonforge Gauntlets';
items.I387.description = 'Equipable - Hands<br><FONT COLOR="#1EFF0C">Equip: Increases Gathering Level by +1';
items.I387.flavor = '"Casted gauntlets originary from Dwellvenc, an underground turtle kingdom where turtles are slightly below the average height."';
items.I387.quality = 'Rare';
items.I387.sell = 'returnGearPrice("I387")';
items.I387.max = 1;
items.I387.series = 'solstice';
items.I387.use = 'gearSwap(items.I387.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I387.statUp = 0;
items.I387.stats = 'items.I387.statUp = 1;'
items.I387.remove = 'items.I387.statUp = 0;'

items.I384 = {};
items.I384.name = 'Parental Visage';
items.I384.description = `'Equipable - Head<br>'+rUpgLvl("I384")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I384", 1))+' Max Health'`;
items.I384.flavor = '"Wot rings u got"';
items.I384.skills = 'rUpgSkill("I384", "Chaos: Increased Max Health","passive",0)'
items.I384.armorTier = "Huge Parent Set";
items.I384.tierDesc1 = "I384";
items.I384.tierDesc6 = "I383";
items.I384.tierArmorBonus = "★ Set bonus [2]: BECOME UNSTOPPABLE";
items.I384.quality = 'Mythic';
items.I384.sell = 'returnGearPrice("I384")';
items.I384.max = 1;
items.I384.use = 'gearSwap(items.I384.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I384.stats = 'headAdditiveMaxHp = rUpgDmg("I384", 1); if(items.I384.level>39) items.I384.statUp = 0.15'
items.I384.remove = 'headAdditiveMaxHp = 0; items.I384.statUp = 0;'
items.I384.series = 'ancient';
items.I384.cap = 80;

items.I385 = {};
items.I385.name = 'Alien Head';
items.I385.description = `'Equipable - Head<br>'+rUpgLvl("I385")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I385", 0.5))+' Max Health'`;
items.I385.skills = 'rUpgSkill("I385", "Automation: +15% Attack Speed","passive",50)'
items.I385.flavor = '"As many ways to view the world."';
items.I385.quality = 'Mythic';
items.I385.sell ='returnGearPrice("I385")';
items.I385.max = 1;
items.I385.use = 'gearSwap(items.I385.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I385.stats = 'headAdditiveMaxHp = rUpgDmg("I385", 0.5); if(items.I385.level>39) items.I385.statUp = 0.15'
items.I385.remove = 'headAdditiveMaxHp = 0; items.I385.statUp = 0;'
items.I385.statUp = 0;
items.I385.series = 'ancient';
items.I385.cap = 80;

items.I2 = {};
items.I2.name = 'Cloth Slippers';
items.I2.description =`'Equipable - Feet<br>'+rUpgLvl("I2")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I2", 1))+' Max Health'`
items.I2.skills = 'rUpgSkill("I2", "Quick Feet: +5% Attack Speed","passive",10)'
items.I2.armorTier ='Cloth Set';
items.I2.tierDesc1 = "I3";
items.I2.tierDesc2 = "I5";
items.I2.tierDesc3 = "I4";
items.I2.tierDesc4 = "I6";
items.I2.tierDesc5 = "I2";
items.I2.tierArmorBonus = "★ Set bonus [5]: Low chance to dodge incoming attacks";
items.I2.flavor = '"The kind your turtle grandmother would wear."';
items.I2.quality = 'Poor';
items.I2.sell = 300;
items.I2.max = 1;
items.I2.use = 'gearSwap(items.I2.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I2.stats = 'feetAdditiveMaxHp = rUpgDmg("I2", 1); if (items.I2.level>9) items.I2.statUp= 0.05'
items.I2.remove = 'feetAdditiveMaxHp = 0; items.I2.statUp=0'
items.I2.series = 'millionaire';
items.I2.statUp = 0;
items.I2.cap = 20;

items.I3 = {};
items.I3.name = 'Cloth Bandana';
items.I3.description = `'Equipable - Head<br>'+rUpgLvl("I3")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I3", 1))+' Max Health'`
items.I3.flavor = '"A foul-smelling rag for the forehead. Unfortunately, it goes in the head slot."';
items.I3.skills = 'rUpgSkill("I3", "Steadfast: +10%"+expIcon+"EXP Bonus","passive",10)'
items.I3.armorTier ='Cloth Set';
items.I3.tierDesc1 = "I3";
items.I3.tierDesc2 = "I5";
items.I3.tierDesc3 = "I4";
items.I3.tierDesc4 = "I6";
items.I3.tierDesc5 = "I2";
items.I3.tierArmorBonus = "★ Set bonus [5]: Low chance to dodge incoming attacks";
items.I3.quality = 'Poor';
items.I3.sell = 300
items.I3.max = 1; 
items.I3.use = 'gearSwap(items.I3.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I3.stats = 'headAdditiveMaxHp = rUpgDmg("I3", 1); if (items.I3.level>9) items.I3.statUp= 0.1 '
items.I3.remove = 'headAdditiveMaxHp = 0; items.I3.statUp=0'
items.I3.series = 'millionaire';
items.I3.statUp = 0
items.I3.cap = 20;

items.I4 = {};
items.I4.name = 'Cloth Bracelet';
items.I4.description = `'Equipable - Hands<br>'+rUpgLvl("I4")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I4", 1))+' Max Health'`
items.I4.flavor = '"Seems to not be of your size."';
items.I4.skills = 'rUpgSkill("I4", "Gut Instinct: +5% Nature Resistance","passive",10)'
items.I4.tierDesc1 = "I3";
items.I4.tierDesc2 = "I5";
items.I4.tierDesc3 = "I4";
items.I4.tierDesc4 = "I6";
items.I4.tierDesc5 = "I2";
items.I4.armorTier ='Cloth Set';
items.I4.tierArmorBonus = "★ Set bonus [5]: Low chance to dodge incoming attacks";
items.I4.quality = 'Poor';
items.I4.sell = 300;
items.I4.max = 1;
items.I4.use = 'gearSwap(items.I4.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I4.stats = 'handsAdditiveMaxHp = rUpgDmg("I4", 1); if (items.I4.level>9) items.I4.statUp= 0.05'
items.I4.remove = 'handsAdditiveMaxHp = 0;  items.I4.statUp= 0'
items.I4.series = 'millionaire';
items.I4.statUp = 0
items.I4.cap = 20;

items.I5 = {};
items.I5.name = 'Cloth Shirt';
items.I5.description = `'Equipable - Chest<br>'+rUpgLvl("I5")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I5", 1))+' Max Health'`
items.I5.flavor = '"More effective than nothing whatsoever. Not much more, though."';
items.I5.skills = 'rUpgSkill("I5", "Armor Threads: +5% Might Resistance","passive",10)'
items.I5.armorTier ='Cloth Set';
items.I5.tierDesc1 = "I3";
items.I5.tierDesc2 = "I5";
items.I5.tierDesc3 = "I4";
items.I5.tierDesc4 = "I6";
items.I5.tierDesc5 = "I2";
items.I5.tierArmorBonus = "★ Set bonus [5]: Low chance to dodge incoming attacks";
items.I5.quality = 'Poor';
items.I5.sell = 300;
items.I5.max = 1;
items.I5.use = 'gearSwap(items.I5.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I5.stats = 'chestAdditiveMaxHp = rUpgDmg("I5", 1); if (items.I5.level>9) items.I5.statUp= 0.05'
items.I5.remove = 'chestAdditiveMaxHp = 0; items.I5.statUp= 0'
items.I5.series = 'millionaire';
items.I5.statUp= 0;
items.I5.cap = 20;

items.I6 = {};
items.I6.name = 'Cloth Pants';
items.I6.description = `'Equipable - Legs<br>'+rUpgLvl("I6")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I6", 1))+' Max Health'`
items.I6.skills = 'rUpgSkill("I6", "Vitality: "+ colorTag("x1.1","#E57D08")+" Max Health","passive",10)'
items.I6.flavor = '"They must at least be resistant if they were able to survive this long."';
items.I6.armorTier ='Cloth Set';
items.I6.quality = 'Poor';
items.I6.tierDesc1 = "I3";
items.I6.tierDesc2 = "I5";
items.I6.tierDesc3 = "I4";
items.I6.tierDesc4 = "I6";
items.I6.tierDesc5 = "I2";
items.I6.tierArmorBonus = "★ Set bonus [5]: Low chance to dodge incoming attacks";
items.I6.sell = 300;
items.I6.max = 1;
items.I6.use = 'gearSwap(items.I6.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I6.stats = 'legsAdditiveMaxHp = rUpgDmg("I6", 1); if (items.I6.level>9) items.I6.statUp= 1.1'
items.I6.remove = 'legsAdditiveMaxHp = 0; items.I6.statUp = 1'
items.I6.series = 'millionaire';
items.I6.statUp = 1;
items.I6.cap = 20;

items.I73 = {};
items.I73.name = 'Plated Explorer Boots';
items.I73.description =`'Equipable - Feet<br>'+rUpgLvl("I73")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I73", 1))+' Max Health'`
items.I73.skills = 'rUpgSkill("I73", "Nature Grace: +15%"+natureIcon+"Nature Bonus","passive",15)'
items.I73.armorTier ='Explorer Set';
items.I73.flavor = '"Adventures await at every step."';
items.I73.tierArmorBonus = "★ Set bonus [5]: All"+natureIcon+"Nature Damage gets reflected";
items.I73.stats = 'feetAdditiveMaxHp = rUpgDmg("I73", 1); if (items.I73.level>14) items.I73.statUp= 0.15'
items.I73.remove = 'feetAdditiveMaxHp = 0; items.I73.statUp=0'
items.I73.max = 1;
items.I73.tierDesc1 = "I74";
items.I73.tierDesc2 = "I76";
items.I73.tierDesc3 = "I75";
items.I73.tierDesc4 = "I77";
items.I73.tierDesc5 = "I73";
items.I73.quality = 'Common';
items.I73.sell = 'artisanBonus("SG1")'
items.I73.use = 'gearSwap(items.I73.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I73.series = 'masterwork';
items.I73.statUp = 0;
items.I73.cap = 30;

items.I74 = {};
items.I74.name = 'Plated Explorer Boonie';
items.I74.description =`'Equipable - Head<br>'+rUpgLvl("I74")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I74", 1))+' Max Health'`
items.I74.skills = 'rUpgSkill("I74", "Clear Mind: +10%"+natureIcon+"Nature Resistance","passive",15)'
items.I74.armorTier ='Explorer Set';
items.I74.flavor = '"Adventures await at every step."';
items.I74.tierArmorBonus = "★ Set bonus [5]: All"+natureIcon+"Nature Damage gets reflected";
items.I74.stats = 'headAdditiveMaxHp = rUpgDmg("I74", 1); if (items.I74.level>14) items.I74.statUp= 0.10'
items.I74.remove = 'headAdditiveMaxHp = 0; items.I74.statUp=0'
items.I74.max = 1;
items.I74.quality = 'Common';
items.I74.tierDesc1 = "I74";
items.I74.tierDesc2 = "I76";
items.I74.tierDesc3 = "I75";
items.I74.tierDesc4 = "I77";
items.I74.tierDesc5 = "I73";
items.I74.sell = 'artisanBonus("SG1")'
items.I74.use = 'gearSwap(items.I74.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I74.series = 'masterwork';
items.I74.statUp = 0;
items.I74.cap = 30;

items.I75 = {};
items.I75.name = 'Plated Explorer Gloves';
items.I75.description =`'Equipable - Hands<br>'+rUpgLvl("I75")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I75", 1))+' Max Health'`
items.I75.skills = 'rUpgSkill("I75", "Moss Print: +10%"+natureIcon+"Nature Resistance","passive",15)'
items.I75.armorTier ='Explorer Set';
items.I75.flavor = '"Adventures await at every step."';
items.I75.tierArmorBonus = "★ Set bonus [5]: All"+natureIcon+"Nature Damage gets reflected";
items.I75.stats = 'handsAdditiveMaxHp = rUpgDmg("I75", 1); if (items.I75.level>14) items.I75.statUp= 0.10'
items.I75.remove = 'handsAdditiveMaxHp = 0; items.I75.statUp=0'
items.I75.max = 1;
items.I75.quality = 'Common';
items.I75.tierDesc1 = "I74";
items.I75.tierDesc2 = "I76";
items.I75.tierDesc3 = "I75";
items.I75.tierDesc4 = "I77";
items.I75.tierDesc5 = "I73";
items.I75.sell = 'artisanBonus("SG1")'
items.I75.use = 'gearSwap(items.I75.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I75.series = 'masterwork';
items.I75.statUp = 0;
items.I75.cap = 30;

items.I76 = {};
items.I76.name = 'Plated Explorer Cuirass';
items.I76.description =`'Equipable - Chest<br>'+rUpgLvl("I76")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I76", 1))+' Max Health'`
items.I76.skills = 'rUpgSkill("I76", "Nature Grace: +15%"+natureIcon+"Nature Bonus","passive",15)'
items.I76.armorTier ='Explorer Set';
items.I76.flavor = '"Adventures await at every step."';
items.I76.tierArmorBonus = "★ Set bonus [5]: All"+natureIcon+"Nature Damage gets reflected";
items.I76.stats = 'chestAdditiveMaxHp = rUpgDmg("I76", 1); if (items.I76.level>14) items.I76.statUp= 0.15'
items.I76.remove = 'chestAdditiveMaxHp = 0; items.I76.statUp=0'
items.I76.max = 1;
items.I76.flavor = '"Includes camouflage."';
items.I76.quality = 'Common';
items.I76.tierDesc1 = "I74";
items.I76.tierDesc2 = "I76";
items.I76.tierDesc3 = "I75";
items.I76.tierDesc4 = "I77";
items.I76.tierDesc5 = "I73";
items.I76.sell = 'artisanBonus("SG1")'
items.I76.use = 'gearSwap(items.I76.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I76.series = 'masterwork';
items.I76.statUp = 0;
items.I76.cap = 30;

items.I77 = {};
items.I77.name = 'Plated Explorer Pants';
items.I77.description =`'Equipable - Legs<br>'+rUpgLvl("I77")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I77", 1))+' Max Health'`
items.I77.skills = 'rUpgSkill("I77", "Full Plating: +15%"+natureIcon+"Nature Resistance","passive",15)'
items.I77.armorTier ='Explorer Set';
items.I77.flavor = '"Adventures await at every step."';
items.I77.tierArmorBonus = "★ Set bonus [5]: All"+natureIcon+"Nature Damage gets reflected";
items.I77.stats = 'legsAdditiveMaxHp = rUpgDmg("I77", 1); if (items.I77.level>14) items.I77.statUp= 0.15'
items.I77.remove = 'legsAdditiveMaxHp = 0; items.I77.statUp=0'
items.I77.max = 1;
items.I77.flavor = '"The copper bolts aimed at the knees emphasize the importance of avoiding falling."';
items.I77.quality = 'Common';
items.I77.tierDesc1 = "I74";
items.I77.tierDesc2 = "I76";
items.I77.tierDesc3 = "I75";
items.I77.tierDesc4 = "I77";
items.I77.tierDesc5 = "I73";
items.I77.sell = 'artisanBonus("SG1")'
items.I77.use = 'gearSwap(items.I77.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I77.series = 'masterwork';
items.I77.statUp = 0;
items.I77.cap = 30;

items.I132 = {};
items.I132.name = 'Jungle King Paws';
items.I132.description =`'Equipable - Feet<br>'+rUpgLvl("I132")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I132", 1))+' Max Health'`
items.I132.skills = 'rUpgSkill("I132", "Strong Claws: +15%"+strIcon+"Strength","passive",20)+"<br>"+rUpgSkill("I132", "Mighty Claws: +15%"+mightIcon+"Might Bonus","passive",35)'
items.I132.armorTier ='Jungle King Set';
items.I132.tierArmorBonus = "★ Set bonus [5]: Your attacks have a high chance to lacerate the enemy, dealing medium"+mightIcon+"Might Damage";
items.I132.stats = 'feetAdditiveMaxHp = rUpgDmg("I132", 1); if (items.I132.level>19) items.I132.statUp= 0.15; if (items.I132.level>34) items.I132.statUp2= 0.15;'
items.I132.remove = 'feetAdditiveMaxHp = 0; items.I132.statUp=0; items.I132.statUp2= 0'
items.I132.max = 1;
items.I132.flavor = '"Pawsitively adorable."';
items.I132.tierDesc1 = "I133";
items.I132.tierDesc2 = "I135";
items.I132.tierDesc3 = "I134";
items.I132.tierDesc4 = "I136";
items.I132.tierDesc5 = "I132";
items.I132.quality = 'Uncommon';
items.I132.sell = 'returnGearPrice("I132")';
items.I132.use = 'gearSwap(items.I132.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I132.series = "forgotten"; 
items.I132.statUp = 0;
items.I132.cap = 40;
items.I132.statUp2= 0

items.I133 = {};
items.I133.name = 'Jungle King Helm';
items.I133.description =`'Equipable - Head<br>'+rUpgLvl("I133")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I133", 1))+' Max Health'`
items.I133.skills = 'rUpgSkill("I133", "Sensitive Ears: +15%"+mightIcon+"Might Bonus","passive",20)+"<br>"+rUpgSkill("I133", "Spatial Awareness: +15%"+mightIcon+"Might Resistance","passive",35)'
items.I133.armorTier ='Jungle King Set';
items.I133.tierArmorBonus = "★ Set bonus [5]: Your attacks have a high chance to lacerate the enemy, dealing medium"+mightIcon+"Might Damage";
items.I133.stats = 'headAdditiveMaxHp = rUpgDmg("I133", 1); if (items.I133.level>19) items.I133.statUp= 0.15; if (items.I133.level>34) items.I133.statUp2= 0.15;'
items.I133.remove = 'headAdditiveMaxHp = 0; items.I133.statUp=0; items.I133.statUp2= 0'
items.I133.max = 1;
items.I133.flavor = '"It\'s hard to look mighty with those fluffy ears looking at me."';
items.I133.quality = 'Uncommon';
items.I133.tierDesc1 = "I133";
items.I133.tierDesc2 = "I135";
items.I133.tierDesc3 = "I134";
items.I133.tierDesc4 = "I136";
items.I133.tierDesc5 = "I132";
items.I133.sell = 'returnGearPrice("I133")';
items.I133.use = 'gearSwap(items.I133.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I133.series = "forgotten"; 
items.I133.statUp = 0;
items.I133.statUp2 = 0;
items.I133.cap = 40;

items.I134 = {};
items.I134.name = 'Jungle King Mittens';
items.I134.description =`'Equipable - Hands<br>'+rUpgLvl("I134")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I134", 1))+' Max Health'`
items.I134.skills = 'rUpgSkill("I134", "Law of the Jungle: +10%"+strIcon+"Strength","passive",20)+"<br>"+rUpgSkill("I134", "Guts: +15%"+mightIcon+"Might Resistance","passive",35)'
items.I134.armorTier ='Jungle King Set';
items.I134.tierArmorBonus = "★ Set bonus [5]: Your attacks have a high chance to lacerate the enemy, dealing medium"+mightIcon+"Might Damage";
items.I134.stats = 'handsAdditiveMaxHp = rUpgDmg("I134", 1); if (items.I134.level>19) items.I134.statUp=0.10; if (items.I134.level>34) items.I134.statUp2=0.15;'
items.I134.remove = 'handsAdditiveMaxHp = 0; items.I134.statUp=0; items.I134.statUp2=0'
items.I134.max = 1;
items.I134.flavor = '"Far more secure than metal gloves."';
items.I134.quality = 'Uncommon';
items.I134.tierDesc1 = "I133";
items.I134.tierDesc2 = "I135";
items.I134.tierDesc3 = "I134";
items.I134.tierDesc4 = "I136";
items.I134.tierDesc5 = "I132";
items.I134.sell = 'returnGearPrice("I134")';
items.I134.use = 'gearSwap(items.I134.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I134.series = "forgotten"; 
items.I134.statUp = 0;
items.I134.statUp2 = 0;
items.I134.cap = 40;

items.I135 = {};
items.I135.name = 'Jungle King Chestplate';
items.I135.description =`'Equipable - Chest<br>'+rUpgLvl("I135")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I135", 1))+' Max Health'`
items.I135.skills = 'rUpgSkill("I135", "Auric Plating: +10%"+strIcon+"Strength","passive",20)+"<br>"+rUpgSkill("I135", "Divine Beast: +15%"+mightIcon+"Might Resistance","passive",35)'
items.I135.armorTier ='Jungle King Set';
items.I135.tierArmorBonus = "★ Set bonus [5]: Your attacks have a high chance to lacerate the enemy, dealing medium"+mightIcon+"Might Damage";
items.I135.stats = 'chestAdditiveMaxHp = rUpgDmg("I135", 1); if (items.I135.level>19) items.I135.statUp2= 0.1; if (items.I135.level>34) items.I135.statUp= 0.15;'
items.I135.remove = 'chestAdditiveMaxHp = 0; items.I135.statUp=0; items.I135.statUp2=0'
items.I135.max = 1;
items.I135.flavor = '"Adorned with the fierce and majestic pattern of a tiger, blending strength and style on the battlefield."';
items.I135.quality = 'Uncommon';
items.I135.tierDesc1 = "I133";
items.I135.tierDesc2 = "I135";
items.I135.tierDesc3 = "I134";
items.I135.tierDesc4 = "I136";
items.I135.tierDesc5 = "I132";
items.I135.sell = 'returnGearPrice("I135")';
items.I135.use = 'gearSwap(items.I135.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I135.series = "forgotten"; 
items.I135.statUp = 0;
items.I135.statUp2 = 0;
items.I135.cap = 40;

items.I136 = {};
items.I136.name = 'Jungle King Tail';
items.I136.description =`'Equipable - Legs<br>'+rUpgLvl("I136")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I136", 1))+' Max Health'`
items.I136.skills = 'rUpgSkill("I136", "Evasive Maneuvers: +15%"+mightIcon+"Might Bonus","passive",20)+"<br>"+rUpgSkill("I136", "Silent Maneuvers: Increases Thief success chance","passive",35)'
items.I136.armorTier ='Jungle King Set';
items.I136.tierArmorBonus = "★ Set bonus [5]: Your attacks have a high chance to lacerate the enemy, dealing medium"+mightIcon+"Might Damage";
items.I136.stats = 'legsAdditiveMaxHp = rUpgDmg("I136", 1); if (items.I136.level>19) items.I136.statUp= 0.15; if (items.I136.level>34) items.I136.statUp2= 50'
items.I136.remove = 'legsAdditiveMaxHp = 0; items.I136.statUp=0; items.I136.statUp2=0; '
items.I136.max = 1;
items.I136.flavor = '"Doesn\'t need to be plugged anywhere fortunately."';
items.I136.quality = 'Uncommon';
items.I136.tierDesc1 = "I133";
items.I136.tierDesc2 = "I135";
items.I136.tierDesc3 = "I134";
items.I136.tierDesc4 = "I136";
items.I136.tierDesc5 = "I132";
items.I136.sell = 'returnGearPrice("I136")';
items.I136.use = 'gearSwap(items.I136.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I136.series = "forgotten"; 
items.I136.statUp = 0;
items.I136.cap = 40;
items.I136.statUp2=0; 

items.I138 = {};
items.I138.name = 'Pringu Slippers';
items.I138.description =`'Equipable - Feet<br>'+rUpgLvl("I138")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I138", 1))+' Max Health'`
items.I138.skills = 'rUpgSkill("I138", "Natural Rubber: +15%"+natureIcon+"Nature Resistance","passive",20)+"<br>"+rUpgSkill("I138", "Enchanted Rubber: +15%"+spIcon+"Spellpower","passive",40)'
items.I138.armorTier ='Pringu Set';
items.I138.tierArmorBonus =  "★ Set bonus [5]: Your attacks rain down a tuna, dealing Low"+natureIcon+"Nature Damage";
items.I138.stats = 'feetAdditiveMaxHp = rUpgDmg("I138", 1); if (items.I138.level>19) items.I138.statUp= 0.15; if (items.I138.level>39) items.I138.statUp2= 0.15'
items.I138.remove = 'feetAdditiveMaxHp = 0; items.I138.statUp=0; items.I138.statUp2=0'
items.I138.max = 1;
items.I138.cap = 50;
items.I138.flavor = '"They really said 🐟."';
items.I138.tierDesc1 = "I139";
items.I138.tierDesc2 = "I141";
items.I138.tierDesc3 = "I140";
items.I138.tierDesc4 = "I142";
items.I138.tierDesc5 = "I138";
items.I138.quality = 'Uncommon';
items.I138.sell = 'returnGearPrice("I138")';
items.I138.use = 'gearSwap(items.I138.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I138.series = "beastfallen"; 
items.I138.statUp=0;
items.I138.statUp2=0

items.I139 = {};
items.I139.name = 'Pringu Hat';
items.I139.description =`'Equipable - Head<br>'+rUpgLvl("I139")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I139", 1))+' Max Health'`
items.I139.skills = 'rUpgSkill("I139", "Calm Mind: +15%"+spIcon+"Spellpower","passive",20)+"<br>"+rUpgSkill("I139", "Airhead: +15%"+natureIcon+"Nature Resistance","passive",40)'
items.I139.armorTier ='Pringu Set';
items.I139.tierArmorBonus =  "★ Set bonus [5]: Your attacks rain down a tuna, dealing Low"+natureIcon+"Nature Damage";
items.I139.stats = 'headAdditiveMaxHp = rUpgDmg("I139", 1); if (items.I139.level>19) items.I139.statUp= 0.15; if (items.I139.level>39) items.I139.statUp2= 0.15;'
items.I139.remove = 'headAdditiveMaxHp = 0; items.I139.statUp=0; items.I139.statUp2=0;'
items.I139.max = 1;
items.I139.cap = 50;
items.I139.flavor = '"Noot Noot."';
items.I139.quality = 'Uncommon';
items.I139.tierDesc1 = "I139";
items.I139.tierDesc2 = "I141";
items.I139.tierDesc3 = "I140";
items.I139.tierDesc4 = "I142";
items.I139.tierDesc5 = "I138";
items.I139.sell = 'returnGearPrice("I139")';
items.I139.use = 'gearSwap(items.I139.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I139.series = "beastfallen"; 
items.I139.statUp=0;
items.I139.statUp2=0;

items.I140 = {};
items.I140.name = 'Pringu Gloves';
items.I140.description =`'Equipable - Hands<br>'+rUpgLvl("I140")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I140", 1))+' Max Health'`
items.I140.skills = 'rUpgSkill("I140", "Trinity: +15%"+natureIcon+"Nature Bonus","passive",20)+"<br>"+rUpgSkill("I140", "Skilled Hands: +15%"+expIcon+"EXP Bonus","passive",40)'
items.I140.armorTier ='Pringu Set';
items.I140.tierArmorBonus =  "★ Set bonus [5]: Your attacks rain down a tuna, dealing Low"+natureIcon+"Nature Damage";
items.I140.stats = 'handsAdditiveMaxHp = rUpgDmg("I140", 1); if (items.I140.level>19) items.I140.statUp= 0.15; if (items.I140.level>39) items.I140.statUp2= 0.15'
items.I140.remove = 'handsAdditiveMaxHp = 0; items.I140.statUp=0; items.I140.statUp2=0'
items.I140.max = 1;
items.I140.cap = 50;
items.I140.flavor = '"That\'s how they keep themselves warm."';
items.I140.quality = 'Uncommon';
items.I140.tierDesc1 = "I139";
items.I140.tierDesc2 = "I141";
items.I140.tierDesc3 = "I140";
items.I140.tierDesc4 = "I142";
items.I140.tierDesc5 = "I138";
items.I140.sell = 'returnGearPrice("I140")';
items.I140.use = 'gearSwap(items.I140.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I140.series = "beastfallen"; 
items.I140.statUp=0;
items.I140.statUp2=0;

items.I141 = {};
items.I141.name = 'Pringu Cape';
items.I141.description =`'Equipable - Chest<br>'+rUpgLvl("I141")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I141", 1))+' Max Health'`
items.I141.skills = 'rUpgSkill("I141", "Magic Threads: +15%"+spIcon+"Spellpower","passive",20)+"<br>"+rUpgSkill("I141", "Artic Threads: +15%"+natureIcon+"Nature Bonus","passive",40)'
items.I141.armorTier ='Pringu Set';
items.I141.tierArmorBonus =  "★ Set bonus [5]: Your attacks rain down a tuna, dealing Low"+natureIcon+"Nature Damage";
items.I141.stats = 'chestAdditiveMaxHp = rUpgDmg("I141", 1); if (items.I141.level>19) items.I141.statUp= 0.15; if (items.I141.level>39) items.I141.statUp2= 0.15'
items.I141.remove = 'chestAdditiveMaxHp = 0; items.I141.statUp=0; items.I141.statUp2= 0'
items.I141.max = 1;
items.I141.cap = 50;
items.I141.flavor = '"Charm +220."';
items.I141.quality = 'Uncommon';
items.I141.tierDesc1 = "I139";
items.I141.tierDesc2 = "I141";
items.I141.tierDesc3 = "I140";
items.I141.tierDesc4 = "I142";
items.I141.tierDesc5 = "I138";
items.I141.sell = 'returnGearPrice("I141")';
items.I141.use = 'gearSwap(items.I141.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I141.series = "beastfallen"; 
items.I141.statUp=0;
items.I141.statUp2=0;

items.I142 = {};
items.I142.name = 'Pringu Pants';
items.I142.description =`'Equipable - Legs<br>'+rUpgLvl("I142")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I142", 1))+' Max Health'`
items.I142.skills = 'rUpgSkill("I142", "Green Pockets: +15%"+natureIcon+"Nature Bonus","passive",20)+"<br>"+rUpgSkill("I142", "Lush Pockets: +15%"+natureIcon+"Nature Resistance","passive",40)'
items.I142.armorTier ='Pringu Set';
items.I142.tierArmorBonus =  "★ Set bonus [5]: Your attacks rain down a tuna, dealing Low"+natureIcon+"Nature Damage";
items.I142.stats = 'legsAdditiveMaxHp = rUpgDmg("I142", 1); if (items.I142.level>19) items.I142.statUp= 0.15; if (items.I142.level>39) items.I142.statUp2= 0.35'
items.I142.remove = 'legsAdditiveMaxHp = 0; items.I142.statUp=0; items.I142.statUp2= 0'
items.I142.max = 1;
items.I142.cap = 50;
items.I142.flavor = '"Tuxedoed mystique."';
items.I142.quality = 'Uncommon';
items.I142.tierDesc1 = "I139";
items.I142.tierDesc2 = "I141";
items.I142.tierDesc3 = "I140";
items.I142.tierDesc4 = "I142";
items.I142.tierDesc5 = "I138";
items.I142.sell = 'returnGearPrice("I142")';
items.I142.use = 'gearSwap(items.I142.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I142.series = "beastfallen"; 
items.I142.statUp=0;
items.I142.statUp2= 0;

items.I143 = {};
items.I143.name = 'Captain Peg Leg';
items.I143.description =`'Equipable - Feet<br>'+rUpgLvl("I143")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I143", 1))+' Max Health'`
items.I143.skills = 'rUpgSkill("I143", "Wraithwalk: +15%"+occultIcon+"Occult Resist","passive",30)+"<br>"+rUpgSkill("I143", "Hatred: +20%"+occultIcon+"Occult Bonus","passive",50)'
items.I143.armorTier ='Ghastly Captain Set';
items.I143.tierArmorBonus =  "★ Set bonus [5]: Your attacks have a chance to trigger a Sea Chanty, increasing Spellpower, Strength or Occult Bonus for 20 seconds";
items.I143.stats = 'feetAdditiveMaxHp = rUpgDmg("I143", 1); if (items.I143.level>29) items.I143.statUp= 0.15; if (items.I143.level>49) items.I143.statUp2= 0.2'
items.I143.remove = 'feetAdditiveMaxHp = 0; items.I143.statUp=0; items.I143.statUp2=0'
items.I143.max = 1;
items.I143.quality = 'Uncommon';
items.I143.sell = 'returnGearPrice("I143")';
items.I143.flavor = '"Spectral limb that once sailed the haunted seas, now hunts the toe."';
items.I143.tierDesc1 = "I144";
items.I143.tierDesc2 = "I146";
items.I143.tierDesc3 = "I145";
items.I143.tierDesc4 = "I147";
items.I143.tierDesc5 = "I143";
items.I143.use = 'gearSwap(items.I143.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I143.series = "revered"; 
items.I143.cap = 60;
items.I143.statUp2=0;
items.I143.statUp=0;

items.I144 = {};
items.I144.name = 'Captain Hat';
items.I144.description =`'Equipable - Head<br>'+rUpgLvl("I144")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I144", 1))+' Max Health'`
items.I144.skills = 'rUpgSkill("I144", "Aura: +15%"+spIcon+"Spellpower","passive",30)+"<br>"+rUpgSkill("I144", "Yarrmored Threads: +10%"+occultIcon+"Occult Resist","passive",50)'
items.I144.armorTier ='Ghastly Captain Set';
items.I144.tierArmorBonus =  "★ Set bonus [5]: Your attacks have a chance to trigger a Sea Chanty, increasing Spellpower, Strength or Occult Bonus for 20 seconds";
items.I144.stats = 'headAdditiveMaxHp = rUpgDmg("I144", 1); if (items.I144.level>29) items.I144.statUp= 0.15; if (items.I144.level>49) items.I144.statUp2= 0.10'
items.I144.remove = 'headAdditiveMaxHp = 0; items.I144.statUp=0;items.I144.statUp2=0;'
items.I144.max = 1;
items.I144.quality = 'Uncommon';
items.I144.sell = 'returnGearPrice("I144")';
items.I144.flavor = '"Crowned with ethereal shadows."';
items.I144.tierDesc1 = "I144";
items.I144.tierDesc2 = "I146";
items.I144.tierDesc3 = "I145";
items.I144.tierDesc4 = "I147";
items.I144.tierDesc5 = "I143";
items.I144.use = 'gearSwap(items.I144.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I144.series = "revered"; 
items.I144.cap = 60;
items.I144.statUp2=0;
items.I144.statUp=0;

items.I145 = {};
items.I145.name = 'Captain Hook';
items.I145.description =`'Equipable - Hands<br>'+rUpgLvl("I145")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I145", 1))+' Max Health'`
items.I145.skills = 'rUpgSkill("I145", "Dethgrasp: +15%"+spIcon+"Spellpower","passive",30)+"<br>"+rUpgSkill("I145", "Fishing Hook: +1 Fishing Level","passive",50)'
items.I145.armorTier ='Ghastly Captain Set';
items.I145.tierArmorBonus =  "★ Set bonus [5]: Your attacks have a chance to trigger a Sea Chanty, increasing Spellpower, Strength or Occult Bonus for 20 seconds";
items.I145.stats = 'handsAdditiveMaxHp = rUpgDmg("I145", 1); if (items.I145.level>29) items.I145.statUp= 0.15; if (items.I145.level>49) items.I145.statUp2= 1'
items.I145.remove = 'handsAdditiveMaxHp = 0; items.I145.statUp=0; items.I145.statUp2=0;'
items.I145.max = 1;
items.I145.quality = 'Uncommon';
items.I145.sell = 'returnGearPrice("I145")';
items.I145.flavor = '"Looks cursed but it gives better stats."';
items.I145.tierDesc1 = "I144";
items.I145.tierDesc2 = "I146";
items.I145.tierDesc3 = "I145";
items.I145.tierDesc4 = "I147";
items.I145.tierDesc5 = "I143";
items.I145.use = 'gearSwap(items.I145.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I145.series = "revered"; 
items.I145.cap = 60;
items.I145.statUp2=0;
items.I145.statUp=0;

items.I146 = {};
items.I146.name = 'Captain Poet Shirt';
items.I146.description =`'Equipable - Chest<br>'+rUpgLvl("I146")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I146", 1))+' Max Health'`
items.I146.skills = 'rUpgSkill("I146", "Otherlander: +10%"+occultIcon+"Occult Resist","passive",30)+"<br>"+rUpgSkill("I146", "Purple Haze: +15%"+strIcon+"Strength","passive",50)'
items.I146.armorTier = 'Ghastly Captain Set';
items.I146.tierArmorBonus =  "★ Set bonus [5]: Your attacks have a chance to trigger a Sea Chanty, increasing Spellpower, Strength or Occult Bonus for 20 seconds";
items.I146.stats = 'chestAdditiveMaxHp = rUpgDmg("I146", 1); if (items.I146.level>29) items.I146.statUp= 0.10; if (items.I146.level>49) items.I146.statUp2= 0.15'
items.I146.remove = 'chestAdditiveMaxHp = 0; items.I146.statUp=0; items.I146.statUp2= 0'
items.I146.max = 1;
items.I146.quality = 'Uncommon';
items.I146.sell = 'returnGearPrice("I146")';
items.I146.flavor = '"Draped in the haunting grace of the ghostly muse."';
items.I146.tierDesc1 = "I144";
items.I146.tierDesc2 = "I146";
items.I146.tierDesc3 = "I145";
items.I146.tierDesc4 = "I147";
items.I146.tierDesc5 = "I143";
items.I146.use = 'gearSwap(items.I146.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I146.series = "revered"; 
items.I146.cap = 60;
items.I146.statUp2=0;
items.I146.statUp=0;

items.I147 = {};
items.I147.name = 'Captain Pants';
items.I147.description =`'Equipable - Legs<br>'+rUpgLvl("I147")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I147", 1))+' Max Health'`
items.I147.skills = 'rUpgSkill("I147", "Woven Fear: +20%"+occultIcon+"Occult Bonus","passive",30)+"<br>"+rUpgSkill("I147", "Lila Mirror: +15%"+occultIcon+"Occult Resist","passive",50)'
items.I147.armorTier = 'Ghastly Captain Set';
items.I147.tierArmorBonus =  "★ Set bonus [5]: Your attacks have a chance to trigger a Sea Chanty, increasing Spellpower, Strength or Occult Bonus for 20 seconds";
items.I147.stats = 'legsAdditiveMaxHp = rUpgDmg("I147", 1); if (items.I147.level>19) items.I147.statUp= 0.2; if (items.I147.level>39) items.I147.statUp2= 0.15'
items.I147.remove = 'legsAdditiveMaxHp = 0; items.I147.statUp=0; items.I147.statUp2=0'
items.I147.max = 1;
items.I147.quality = 'Uncommon';
items.I147.sell = 'returnGearPrice("I147")';
items.I147.flavor = '"Features that touch of seafaring charm of a 500 year old cadaver."';
items.I147.tierDesc1 = "I144";
items.I147.tierDesc2 = "I146";
items.I147.tierDesc3 = "I145";
items.I147.tierDesc4 = "I147";
items.I147.tierDesc5 = "I143";
items.I147.use = 'gearSwap(items.I147.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I147.series = "revered"; 
items.I147.cap = 60;
items.I147.statUp2=0;
items.I147.statUp=0;

items.I334 = {};
items.I334.name = 'Fossil Footpads';
items.I334.description =`'Equipable - Feet<br>'+rUpgLvl("I334")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I334", 1))+' Max Health'`
items.I334.skills = 'rUpgSkill("I334", "Elemental Path: +15%"+elementalIcon+"Elemental Resistance","passive",50)+"<br>"+rUpgSkill("I334", "Spriteboost: +15%"+elementalIcon+"Elemental Bonus","passive",60)'
items.I334.armorTier ='Spirit Fossil';
items.I334.tierArmorBonus =  "★ Set bonus [5]: Casting Skills throws a spirit bone, dealing low"+elementalIcon+"Elemental Damage";
items.I334.stats = 'feetAdditiveMaxHp = rUpgDmg("I334", 1); if (items.I334.level>49) items.I334.statUp= 0.15; if (items.I334.level>59) items.I334.statUp2= 0.15'
items.I334.remove = 'feetAdditiveMaxHp = 0; items.I334.statUp=0; items.I334.statUp2=0'
items.I334.max = 1;
items.I334.quality = 'Uncommon';
items.I334.series = "solstice"; 
items.I334.cap = 70;
items.I334.statUp2=0;
items.I334.statUp=0;
items.I334.flavor = '"Pulsing with the whispers of forgotten eons."';
items.I334.tierDesc1 = "I335";
items.I334.tierDesc2 = "I337";
items.I334.tierDesc3 = "I336";
items.I334.tierDesc4 = "I338";
items.I334.tierDesc5 = "I334";
items.I334.sell = 'artisanBonus("SG6")'
items.I334.use = 'gearSwap(items.I334.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'

items.I335 = {};
items.I335.name = 'Fossil Skull';
items.I335.description =`'Equipable - Head<br>'+rUpgLvl("I335")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I335", 1))+' Max Health'`
items.I335.skills = 'rUpgSkill("I335", "Shaman Will: +15%"+elementalIcon+"Elemental Bonus","passive",50)+"<br>"+rUpgSkill("I335", "Shaman King: +30%"+spIcon+"Spellpower","passive",60)'
items.I335.armorTier ='Spirit Fossil';
items.I335.tierArmorBonus =  "★ Set bonus [5]: Casting Skills throws a spirit bone, dealing low"+elementalIcon+"Elemental Damage";
items.I335.stats = 'headAdditiveMaxHp = rUpgDmg("I335", 1); if (items.I335.level>49) items.I335.statUp= 0.15; if (items.I335.level>59) items.I335.statUp2= 0.3'
items.I335.remove = 'headAdditiveMaxHp = 0; items.I335.statUp=0; items.I335.statUp2=0'
items.I335.max = 1;
items.I335.quality = 'Uncommon';
items.I335.series = "solstice"; 
items.I335.cap = 70;
items.I335.statUp2=0;
items.I335.statUp=0;
items.I335.flavor = '"Doubles as great garden decoration."';
items.I335.tierDesc1 = "I335";
items.I335.tierDesc2 = "I337";
items.I335.tierDesc3 = "I336";
items.I335.tierDesc4 = "I338";
items.I335.tierDesc5 = "I334";
items.I335.sell = 'artisanBonus("SG6")'
items.I335.use = 'gearSwap(items.I335.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'

items.I336 = {};
items.I336.name = 'Fossil Claws';
items.I336.description =`'Equipable - Hands<br>'+rUpgLvl("I336")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I336", 1))+' Max Health'`
items.I336.skills = 'rUpgSkill("I336", "Spirit Rend: +15%"+elementalIcon+"Elemental Resistance","passive",50)+"<br>"+rUpgSkill("I336", "Fierce Deity: +15%"+strIcon+"Strength","passive",60)'
items.I336.armorTier ='Spirit Fossil';
items.I336.tierArmorBonus =  "★ Set bonus [5]: Casting Skills throws a spirit bone, dealing low"+elementalIcon+"Elemental Damage";
items.I336.stats = 'handsAdditiveMaxHp = rUpgDmg("I336", 1); if (items.I336.level>49) items.I336.statUp= 0.15; if (items.I336.level>59) items.I336.statUp2= 0.15'
items.I336.remove = 'handsAdditiveMaxHp = 0; items.I336.statUp=0; items.I336.statUp2=0'
items.I336.max = 1;
items.I336.quality = 'Uncommon';
items.I336.series = "solstice"; 
items.I336.cap = 70;
items.I336.statUp2=0;
items.I336.statUp=0;
items.I336.flavor = '"Rugged textures and unique patterns reflect timeless power."';
items.I336.tierDesc1 = "I335";
items.I336.tierDesc2 = "I337";
items.I336.tierDesc3 = "I336";
items.I336.tierDesc4 = "I338";
items.I336.tierDesc5 = "I334";
items.I336.sell = 'artisanBonus("SG6")'
items.I336.use = 'gearSwap(items.I336.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'

items.I337 = {};
items.I337.name = 'Fossil Harness';
items.I337.description =`'Equipable - Chest<br>'+rUpgLvl("I337")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I337", 1))+' Max Health'`
items.I337.skills = 'rUpgSkill("I337", "Eroded Shield: +15%"+elementalIcon+"Elemental Resistance","passive",50)+"<br>"+rUpgSkill("I337", "Channeling: +15%"+expIcon+"EXP Bonus","passive",60)'
items.I337.armorTier ='Spirit Fossil';
items.I337.tierArmorBonus =  "★ Set bonus [5]: Casting Skills throws a spirit bone, dealing low"+elementalIcon+"Elemental Damage";
items.I337.stats = 'chestAdditiveMaxHp = rUpgDmg("I337", 1); if (items.I337.level>49) items.I337.statUp= 0.15; if (items.I337.level>59) items.I337.statUp2= 0.15'
items.I337.remove = 'chestAdditiveMaxHp = 0; items.I337.statUp=0; items.I337.statUp2=0'
items.I337.max = 1;
items.I337.quality = 'Uncommon';
items.I337.series = "solstice"; 
items.I337.cap = 70;
items.I337.statUp2=0;
items.I337.statUp=0;
items.I337.flavor = '"Capable of withstanding a ten kilometer asteroid, at the very least ."';
items.I337.tierDesc1 = "I335";
items.I337.tierDesc2 = "I337";
items.I337.tierDesc3 = "I336";
items.I337.tierDesc4 = "I338";
items.I337.tierDesc5 = "I334";
items.I337.sell = 'artisanBonus("SG6")'
items.I337.use = 'gearSwap(items.I337.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'

items.I338 = {};
items.I338.name = 'Fossil Legguards';
items.I338.description =`'Equipable - Legs<br>'+rUpgLvl("I338")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I338", 1))+' Max Health'`
items.I338.skills = 'rUpgSkill("I338", "Maelstrom: +15%"+elementalIcon+"Elemental Bonus","passive",50)+"<br>"+rUpgSkill("I338", "Evil Ward: Halves"+buffIcon("B25")+"Hex damage","passive",60)'
items.I338.armorTier ='Spirit Fossil';
items.I338.tierArmorBonus =  "★ Set bonus [5]: Casting Skills throws a spirit bone, dealing low"+elementalIcon+"Elemental Damage";
items.I338.stats = 'legsAdditiveMaxHp = rUpgDmg("I338", 1); if (items.I338.level>49) items.I338.statUp= 0.15; if (items.I338.level>59) items.I338.statUp2= 0.2'
items.I338.remove = 'legsAdditiveMaxHp = 0; items.I338.statUp=0; items.I338.statUp2=0'
items.I338.max = 1;
items.I338.quality = 'Uncommon';
items.I338.series = "solstice"; 
items.I338.cap = 70;
items.I338.statUp2=0;
items.I338.statUp=0;
items.I338.flavor = '"Fossilized remnants now come in all shapes and sizes."';
items.I338.tierDesc1 = "I335";
items.I338.tierDesc2 = "I337";
items.I338.tierDesc3 = "I336";
items.I338.tierDesc4 = "I338";
items.I338.tierDesc5 = "I334";
items.I338.sell = 'artisanBonus("SG6")'
items.I338.use = 'gearSwap(items.I338.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'

items.I329 = {};
items.I329.name = 'Nightmare Boots';
items.I329.description = `'Equipable - Feet<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(273*100391, "I329"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(27*100391, "I329"))+' Regeneration<br><FONT COLOR="#b983f7">Nightmare Hunter Set:<br>'`;
items.I329.flavor = '"Quite literally, walking among the shadows."';
items.I329.quality = 'Rare';
items.I329.tierDesc1 = "I330";
items.I329.tierDesc2 = "I332";
items.I329.tierDesc3 = "I331";
items.I329.tierDesc4 = "I333";
items.I329.tierDesc5 = "I329";
items.I329.tierArmorBonus = "★ Set bonus [5]: When an enemy is defeated, gain a stack of Hunting Prowess, up to a maximum of 50. Every stack increases Omni by 1%, and decays after 3 seconds";
items.I329.sell = 35000;
items.I329.max = 10;
items.I329.use = 'gearSwap(items.I329.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I329.stats = 'feetAdditiveMaxHp = returnItemUpgradeScaling(273*100391, "I329"); feetAdditiveRegen = returnItemUpgradeScaling(27*100391, "I329");'
items.I329.remove = 'feetAdditiveMaxHp = 0; feetAdditiveRegen = 0;'

items.I330 = {};
items.I330.name = 'Nightmare Tricorn';
items.I330.description = `'Equipable - Head<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(287*100391, "I330"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(28*100391, "I330"))+' Regeneration<br><FONT COLOR="#b983f7">Nightmare Hunter Set:<br>'`;
items.I330.flavor = '"Track and vanquish."';
items.I330.quality = 'Rare';
items.I330.tierDesc1 = "I330";
items.I330.tierDesc2 = "I332";
items.I330.tierDesc3 = "I331";
items.I330.tierDesc4 = "I333";
items.I330.tierDesc5 = "I329";
items.I330.tierArmorBonus = "★ Set bonus [5]: When an enemy is defeated, gain a stack of Hunting Prowess, up to a maximum of 50. Every stack increases Omni by 1%, and decays after 3 seconds";
items.I330.sell = 35000;
items.I330.max = 10; 
items.I330.use = 'gearSwap(items.I330.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I330.stats = 'headAdditiveMaxHp = returnItemUpgradeScaling(287*100391, "I330"); headAdditiveRegen = returnItemUpgradeScaling(28*100391, "I330");'
items.I330.remove = 'headAdditiveMaxHp = 0; headAdditiveRegen = 0;'

items.I331 = {};
items.I331.name = 'Nightmare Gloves';
items.I331.description = `'Equipable - Hands<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(275*100391, "I331"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(27*100391, "I331"))+' Regeneration<br><FONT COLOR="#b983f7">Nightmare Hunter Set:<br>'`;
items.I331.flavor = '"A pair of gloves capable of touching the untouchable. A good hunter must always have the upper hand. Or hands."';
items.I331.quality = 'Rare';
items.I331.tierDesc1 = "I330";
items.I331.tierDesc2 = "I332";
items.I331.tierDesc3 = "I331";
items.I331.tierDesc4 = "I333";
items.I331.tierDesc5 = "I329";
items.I331.tierArmorBonus = "★ Set bonus [5]: When an enemy is defeated, gain a stack of Hunting Prowess, up to a maximum of 50. Every stack increases Omni by 1%, and decays after 3 seconds";
items.I331.sell = 35000;
items.I331.max = 10;
items.I331.use = 'gearSwap(items.I331.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I331.stats = 'handsAdditiveMaxHp = returnItemUpgradeScaling(275*100391, "I331"); handsAdditiveRegen = returnItemUpgradeScaling(27*100391, "I331");'
items.I331.remove = 'handsAdditiveMaxHp = 0; handsAdditiveRegen = 0;'

items.I332 = {};
items.I332.name = 'Nightmare Cuirass';
items.I332.description = `'Equipable - Chest<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(290*100391, "I332"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(29*100391, "I332"))+' Regeneration<br><FONT COLOR="#b983f7">Nightmare Hunter Set:<br>'`;
items.I332.flavor = '"Fear is the strongest weapon."';
items.I332.quality = 'Rare';
items.I332.tierDesc1 = "I330";
items.I332.tierDesc2 = "I332";
items.I332.tierDesc3 = "I331";
items.I332.tierDesc4 = "I333";
items.I332.tierDesc5 = "I329";
items.I332.tierArmorBonus = "★ Set bonus [5]: When an enemy is defeated, gain a stack of Hunting Prowess, up to a maximum of 50. Every stack increases Omni by 1%, and decays after 3 seconds";
items.I332.sell = 35000;
items.I332.max = 10;
items.I332.use = 'gearSwap(items.I332.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I332.stats = 'chestAdditiveMaxHp = returnItemUpgradeScaling(290*100391, "I332"); chestAdditiveRegen = returnItemUpgradeScaling(29*100391, "I332");'
items.I332.remove = 'chestAdditiveMaxHp = 0; chestAdditiveRegen = 0;'

items.I333 = {};
items.I333.name = 'Nightmare Pants';
items.I333.description = `'Equipable - Legs<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(280*100391, "I333"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(28*100391, "I333"))+' Regeneration<br><FONT COLOR="#b983f7">Nightmare Hunter Set:<br>'`;
items.I333.flavor = '"The true nightmare is putting these on a turtle."';
items.I333.quality = 'Rare';
items.I333.tierDesc1 = "I330";
items.I333.tierDesc2 = "I332";
items.I333.tierDesc3 = "I331";
items.I333.tierDesc4 = "I333";
items.I333.tierDesc5 = "I329";
items.I333.tierArmorBonus = "★ Set bonus [5]: When an enemy is defeated, gain a stack of Hunting Prowess, up to a maximum of 50. Every stack increases Omni by 1%, and decays after 3 seconds";
items.I333.sell = 35000;
items.I333.max = 10;
items.I333.use = 'gearSwap(items.I333.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I333.stats = 'legsAdditiveMaxHp = returnItemUpgradeScaling(280*100391, "I333"); legsAdditiveRegen = returnItemUpgradeScaling(28*100391, "I333");'
items.I333.remove = 'legsAdditiveMaxHp = 0; legsAdditiveRegen = 0;'

//--------------------------------

items.I339 = {};
items.I339.name = 'Lightbringer Steps';
items.I339.description = `'Equipable - Feet<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(273*600391, "I339"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(27*600391, "I339"))+' Regeneration<br><FONT COLOR="#b983f7">Holy Crusader Set:<br>'`;
items.I339.flavor = '"Symbol of unwavering faith. They are as heavy as they appear."';
items.I339.quality = 'Epic';
items.I339.tierDesc1 = "I340";
items.I339.tierDesc2 = "I342";
items.I339.tierDesc3 = "I341";
items.I339.tierDesc4 = "I343";
items.I339.tierDesc5 = "I339";
items.I339.tierArmorBonus = "★ Set bonus [5]: When Healing is received, smite the enemy with "+deificIcon+"Deific Damage based on how much Health you recovered";
items.I339.sell = 35000;
items.I339.max = 10;
items.I339.use = 'gearSwap(items.I339.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I339.stats = 'feetAdditiveMaxHp = returnItemUpgradeScaling(273*600391, "I339"); feetAdditiveRegen = returnItemUpgradeScaling(27*600391, "I339");'
items.I339.remove = 'feetAdditiveMaxHp = 0; feetAdditiveRegen = 0;'

items.I340 = {};
items.I340.name = 'Lightbringer Crown';
items.I340.description = `'Equipable - Head<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(287*600391, "I340"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(28*600391, "I340"))+' Regeneration<br><FONT COLOR="#b983f7">Holy Crusader Set:<br>'`;
items.I340.flavor = '"Throughout heaven and Earth, I alone am the crowned one."';
items.I340.quality = 'Epic';
items.I340.tierDesc1 = "I340";
items.I340.tierDesc2 = "I342";
items.I340.tierDesc3 = "I341";
items.I340.tierDesc4 = "I343";
items.I340.tierDesc5 = "I339";
items.I340.tierArmorBonus = "★ Set bonus [5]: When Healing is received, smite the enemy with "+deificIcon+"Deific Damage based on how much Health you recovered";
items.I340.sell = 35000;
items.I340.max = 10; 
items.I340.use = 'gearSwap(items.I340.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I340.stats = 'headAdditiveMaxHp = returnItemUpgradeScaling(287*600391, "I340"); headAdditiveRegen = returnItemUpgradeScaling(28*600391, "I340");'
items.I340.remove = 'headAdditiveMaxHp = 0; headAdditiveRegen = 0;'
//items.I340.series = 'chosen';

items.I341 = {};
items.I341.name = 'Lightbringer Hands';
items.I341.description = `'Equipable - Hands<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(275*600391, "I341"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(27*600391, "I341"))+' Regeneration<br><FONT COLOR="#b983f7">Holy Crusader Set:<br>'`;
items.I341.flavor = '"Light is but a farewell gift from darkness."';
items.I341.quality = 'Epic';
items.I341.tierDesc1 = "I340";
items.I341.tierDesc2 = "I342";
items.I341.tierDesc3 = "I341";
items.I341.tierDesc4 = "I343";
items.I341.tierDesc5 = "I339";
items.I341.tierArmorBonus = "★ Set bonus [5]: When Healing is received, smite the enemy with "+deificIcon+"Deific Damage based on how much Health you recovered";
items.I341.sell = 35000;
items.I341.max = 10;
items.I341.use = 'gearSwap(items.I341.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I341.stats = 'handsAdditiveMaxHp = returnItemUpgradeScaling(275*600391, "I341"); handsAdditiveRegen = returnItemUpgradeScaling(27*600391, "I341");'
items.I341.remove = 'handsAdditiveMaxHp = 0; handsAdditiveRegen = 0;'
//items.I341.series = 'chosen';

items.I342 = {};
items.I342.name = 'Lightbringer Regalia';
items.I342.description = `'Equipable - Chest<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(290*600391, "I342"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(29*600391, "I342"))+' Regeneration<br><FONT COLOR="#b983f7">Holy Crusader Set:<br>'`;
items.I342.flavor = '"Plated chesplate sanctified by the highest religious authority."';
items.I342.quality = 'Epic';
items.I342.tierDesc1 = "I340";
items.I342.tierDesc2 = "I342";
items.I342.tierDesc3 = "I341";
items.I342.tierDesc4 = "I343";
items.I342.tierDesc5 = "I339";
items.I342.tierArmorBonus = "★ Set bonus [5]: When Healing is received, smite the enemy with "+deificIcon+"Deific Damage based on how much Health you recovered";
items.I342.sell = 35000;
items.I342.max = 10;
items.I342.use = 'gearSwap(items.I342.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I342.stats = 'chestAdditiveMaxHp = returnItemUpgradeScaling(290*600391, "I342"); chestAdditiveRegen = returnItemUpgradeScaling(29*600391, "I342");'
items.I342.remove = 'chestAdditiveMaxHp = 0; chestAdditiveRegen = 0;'
//items.I342.series = 'chosen';

items.I343 = {};
items.I343.name = 'Lightbringer Leggings';
items.I343.description = `'Equipable - Legs<br><FONT COLOR="#1EFF0C">+'+ beautify(returnItemUpgradeScaling(280*600391, "I343"))+' Max HP<br>+'+ beautify(returnItemUpgradeScaling(28*600391, "I343"))+' Regeneration<br><FONT COLOR="#b983f7">Holy Crusader Set:<br>'`;
items.I343.flavor = '"Features that touch of seafaring charm of a 500 year old cadaver."';
items.I343.quality = 'Epic';
items.I343.tierDesc1 = "I340";
items.I343.tierDesc2 = "I342";
items.I343.tierDesc3 = "I341";
items.I343.tierDesc4 = "I343";
items.I343.tierDesc5 = "I339";
items.I343.tierArmorBonus = "★ Set bonus [5]: When Healing is received, smite the enemy with "+deificIcon+"Deific Damage based on how much Health you recovered";
items.I343.sell = 35000;
items.I343.max = 10;
items.I343.use = 'gearSwap(items.I343.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I343.stats = 'legsAdditiveMaxHp = returnItemUpgradeScaling(280*600391, "I343"); legsAdditiveRegen = returnItemUpgradeScaling(28*600391, "I343");'
items.I343.remove = 'legsAdditiveMaxHp = 0; legsAdditiveRegen = 0;'
//items.I343.series = 'chosen';

items.I344 = {};
items.I344.name = 'Marketable Mud Monster Hat';
items.I344.description = `'Equipable - Head<br>'+rUpgLvl("I344")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I344", 1))+' Max Health'`;
items.I344.skills = 'rUpgSkill("I344", "Torrent: +1 Fishing Level","passive",30)+bestiaryTag("⚜️ Dedicated Content: huskymudkipper56 ⚜️", "#A351AB")'
items.I344.flavor = '"I herd you liek these."';
items.I344.quality = 'Uncommon';
items.I344.sell = 258;
items.I344.max = 1;
items.I344.use = 'gearSwap(items.I344.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I344.stats = 'if (items.I344.level>29) items.I344.statUp = 1'
items.I344.remove = 'items.I344.statUp = 0'
items.I344.statUp = 0;
items.I344.cap = 30;
items.I344.series = "masterwork";

items.I7 = {};
items.I7.name = 'Silver Ring';
items.I7.description =  `'Equipable - Ring<br>'+rUpgLvl("I7")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I7", 1))+' Max Health'`;
items.I7.skills = 'rUpgSkill("I7", "Werewolf\'s Bane: +10%"+mightIcon+"Might Bonus","passive",10)'
items.I7.flavor = '"An ordinary jewelry ring. You can sense good craftsmanship out of it."';
items.I7.quality = 'Common';
items.I7.sell = 100;
items.I7.max = 1; 
items.I7.use = 'gearSwap(items.I7.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I7.stats = 'ringAdditiveMaxHp = rUpgDmg("I7", 1); if (items.I7.level>9) items.I7.statUp = 0.1'
items.I7.remove = 'ringAdditiveMaxHp = 0; items.I7.statUp = 0'
items.I7.series = 'millionaire';
items.I7.statUp =0;
items.I7.cap = 20;

items.I373 = {};
items.I373.name = 'Dark Bidding Ring';
items.I373.description = `'Equipable - Ring<br>'+rUpgLvl("I373")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I373", 1))+' Max Health'`;
items.I373.skills = 'rUpgSkill("I373", "Mind Resist: Prevents"+buffIcon("B40")+"Darkmoon Seal Damage in the Temple of Dusk","passive",0)'
items.I373.flavor = '"I command you to go on my turtle finger."';
items.I373.quality = 'Rare';
items.I373.sell = 'returnGearPrice("I373")';
items.I373.max = 1;
items.I373.use = 'gearSwap(items.I373.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I373.stats = 'ringAdditiveMaxHp = rUpgDmg("I373", 1); '
items.I373.remove = 'ringAdditiveMaxHp = 0;'
items.I373.series = 'solstice';
items.I373.cap = 70;

items.I374 = {};
items.I374.name = 'Sapphire Union Ring';
items.I374.description = `'Equipable - Ring<br><FONT COLOR="#1EFF0C">Equip: +'+ beautify(returnItemUpgradeScaling(2881299, "I374"))+' Weapon Damage'`;
items.I374.flavor = '"A sky-blue gem rests on top."';
items.I374.quality = 'Rare';
items.I374.sell = 'returnGearPrice("I374")';
items.I374.max = 10;
items.I374.use = 'gearSwap(items.I374.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I374.stats = 'items.I374.statUp = returnItemUpgradeScaling(2881299, "I374");'
items.I374.remove = 'items.I374.statUp = 0;'
items.I374.statUp = 0;

items.I375 = {};
items.I375.name = 'Arcane Sign';
items.I375.description = `'Equipable - Ring<br>'+rUpgLvl("I375")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I375", 1))+' Max Health'`;
items.I375.skills = 'rUpgSkill("I375", "Runetraced: +50 Max Magic","passive",60)+"<br>"+rUpgSkill("I375", "Protection: +60%"+spIcon+"Spellpower","passive",70)'
items.I375.flavor = '"A magic-amplifying ring, operating as a relay for magic waves."';
items.I375.quality = 'Rare';
items.I375.sell = 'returnGearPrice("I375")';
items.I375.max = 1;
items.I375.use = 'gearSwap(items.I375.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I375.stats = 'ringAdditiveMaxHp = rUpgDmg("I375", 1); if (items.I375.level>59) items.I375.statUp = 50; if (items.I375.level>69) items.I375.statUp2 = 0.6;'
items.I375.remove = 'ringAdditiveMaxHp = 0; items.I375.statUp = 0; items.I375.statUp2 = 0;'
items.I375.series = 'ancient';
items.I375.cap = 80;
items.I375.statUp = 0;
items.I375.statUp2 = 0;

items.I376 = {};
items.I376.name = 'Beholder Ring';
items.I376.description = `'Equipable - Ring<br>'+rUpgLvl("I376")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I376", 1))+' Max Health'`;
items.I376.skills = 'rUpgSkill("I376", "Lifeforce Conversion: "+colorTag("x2","#E57D08")+strIcon+"Strength, "+colorTag("x0","#E57D08")+spIcon+"Skill Damage","passive",60)+"<br>"+rUpgSkill("I376", "Fierce Deity: +20%"+strIcon+"Strength","passive",70)'
items.I376.flavor = '"Would you watch the world burn with me?"';
items.I376.quality = 'Rare';
items.I376.sell = 'returnGearPrice("I376")';
items.I376.max = 1;
items.I376.use = 'gearSwap(items.I376.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I376.stats = 'ringAdditiveMaxHp = rUpgDmg("I376", 1); if (items.I376.level>59) items.I376.statUp = 2; items.I376.statUp2 = 0; if (items.I376.level>69) items.I376.statUp3 = 0.2;'
items.I376.remove = 'ringAdditiveMaxHp = 0; items.I376.statUp = 1; items.I376.statUp2 = 1;'
items.I376.statUp = 1;
items.I376.statUp2 = 1;
items.I376.statUp3 = 0;
items.I376.series = 'ancient';
items.I376.cap = 80;

items.I383 = {};
items.I383.name = 'Ring of Grace and Salvation';
items.I383.description = `'Equipable - Ring<br>'+rUpgLvl("I383")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I383", 1))+' Max Health'`;
items.I383.skills = 'rUpgSkill("I383", "Favor: +40%"+spIcon+"Spellpower","passive",50)+"<br>"+rUpgSkill("I383", "Protection: +40%"+strIcon+"Strength","passive",60)'
items.I383.flavor = '"A fragile ring that shatters on equip. It will take a while to reforge itself back."';
items.I383.quality = 'Rare';
items.I383.sell = 'returnGearPrice("I383")';
items.I383.max = 1;
items.I383.use = 'items.I383.cd=1200; gearSwap(items.I383.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I383.stats = 'ringAdditiveMaxHp = rUpgDmg("I383", 1); if (items.I383.level>49) items.I383.statUp = 0.4; if (items.I383.level>59) items.I383.statUp2 = 0.4;'
items.I383.remove = 'ringAdditiveMaxHp = 0; items.I383.statUp = 0; items.I383.statUp2 = 0;'
items.I383.statUp = 0;
items.I383.statUp2 = 0;
items.I383.series = 'solstice';
items.I383.cap = 70;
items.I383.cd = 0;

items.I15 = {};
items.I15.name = 'Champion Finger Belt';
items.I15.description = `'Equipable - Ring<br>'+rUpgLvl("I15")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I15", 1))+' Max Health'`;
items.I15.flavor = '"Isnt that just a ring, though."';
items.I15.skills = 'rUpgSkill("I15", "Leg Breaker: +10%"+strIcon+"Strength","passive",0)+"<br>"+rUpgSkill("I15", "Cobra Twist: +10%"+strIcon+"Strength","passive",30)+"<br>"+rUpgSkill("I15", "Death Cradle: +10%"+strIcon+"Strength","passive",40)'
items.I15.quality = 'Rare';
items.I15.sell = 'returnGearPrice("I15")';
items.I15.max = 1;
items.I15.use = 'gearSwap(items.I15.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I15.stats = 'ringAdditiveMaxHp = rUpgDmg("I15", 1); items.I15.statUp = 0.1; if (items.I15.level>29) items.I15.statUp = 0.2; if (items.I15.level>39) items.I15.statUp = 0.3'
items.I15.remove = 'ringAdditiveMaxHp = 0; items.I15.statUp = 0'
items.I15.statUp = 0;
items.I15.series = "forgotten"; 
items.I15.cap = 40;

items.I44 = {};
items.I44.name = 'Nephrite-Embedded Ring';
items.I44.description = `'Equipable - Ring<br>'+rUpgLvl("I44")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I44", 1))+' Max Health'`;
items.I44.flavor = '"A captivating jewelry piece with a nephrite gemstone intricately set within the ring. The lush gemstone represents nature itself."';
items.I44.skills = 'rUpgSkill("I44", "Verdant Mirror: +20%"+natureIcon+"Nature Bonus","passive",0)+"<br>"+rUpgSkill("I44", "Verdant Mirror+: +20%"+natureIcon+"Nature Bonus","passive",30)+"<br>"+rUpgSkill("I44", "Verdant Mirror++: +20%"+natureIcon+"Nature Bonus","passive",40)'
items.I44.quality = 'Uncommon';
items.I44.sell = 'artisanBonus("EI2")'
items.I44.max = 1;
items.I44.use = 'gearSwap(items.I44.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I44.stats = 'ringAdditiveMaxHp = rUpgDmg("I44", 1); items.I44.statUp = 0.2; if (items.I44.level>29) items.I44.statUp = 0.4; if (items.I44.level>39) items.I44.statUp = 0.6'
items.I44.remove = 'ringAdditiveMaxHp = 0; items.I44.statUp = 0'
items.I44.statUp = 0;
items.I44.series = 'forgotten';
items.I44.cap = 40;

items.I45 = {};
items.I45.name = 'Malachite-Embedded Ring';
items.I45.description = `'Equipable - Ring<br>'+rUpgLvl("I45")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I45", 1))+' Max Health'`;
items.I45.flavor = '"A captivating jewelry piece with a malachite gemstone intricately set within the ring. The adept gemstone represents might itself."';
items.I45.skills = 'rUpgSkill("I45", "Bejeweling Might: +20%"+mightIcon+"Might Bonus","passive",0)+"<br>"+rUpgSkill("I45", "Bejeweling Might+: +20%"+mightIcon+"Might Bonus","passive",30)+"<br>"+rUpgSkill("I45", "Bejeweling Might++: +20%"+mightIcon+"Might Bonus","passive",40)'
items.I45.quality = 'Uncommon';
items.I45.sell = 'artisanBonus("EI1")'
items.I45.max = 1;
items.I45.use = 'gearSwap(items.I45.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I45.stats = 'ringAdditiveMaxHp = rUpgDmg("I45", 1); items.I45.statUp = 0.2; if (items.I45.level>29) items.I45.statUp = 0.4; if (items.I45.level>39) items.I45.statUp = 0.6'
items.I45.remove = 'ringAdditiveMaxHp = 0; items.I45.statUp = 0'
items.I45.statUp = 0;
items.I45.series = 'forgotten';
items.I45.cap = 40;

items.I131 = {};
items.I131.name = 'Thorn Binding';
items.I131.description = `'Equipable - Ring<br>'+rUpgLvl("I131")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I131", 1))+' Max Health'`;
items.I131.skills = 'rUpgSkill("I131", "Tough Love: Reflects one third of the damage received as"+natureIcon+"Nature Damage","passive",0)+"<br>"+rUpgSkill("I131", "Blossom Bossom: +15% Nature Resistance","passive",30)'
items.I131.flavor = '"A fierce ring made out of thorns and blossoms. To inflict pain one must be ready to receive pain."';
items.I131.quality = 'Uncommon';
items.I131.sell = 'returnGearPrice("I131")';
items.I131.max = 1; 
items.I131.use = 'gearSwap(items.I131.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")';
items.I131.stats = 'ringAdditiveMaxHp = rUpgDmg("I131", 1); if (items.I131.level>29) items.I131.statUp = 0.15;'
items.I131.remove = 'ringAdditiveMaxHp = 0; items.I131.statUp = 0'
items.I131.defenseChance = 'enemyNatureDamage(Math.min(damage*0.3, expectedPlayerDamage), "zeroScale");'
items.I131.series = 'masterwork';
items.I131.statUp = 0
items.I131.cap = 30

items.I166 = {};
items.I166.name = 'Waddling Band';
items.I166.description = `'Equipable - Ring<br>'+rUpgLvl("I166")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I166", 1))+' Max Health'`;
items.I166.skills = 'rUpgSkill("I166", "Happy Feet:"+colorTag("x1.2","#E57D08")+"Offline Gains","passive",0)+"<br>"+rUpgSkill("I166", "Wombo Combo:"+colorTag("x1.2","#E57D08")+"Offline Gains","passive",50)'
items.I166.flavor = '"It\'s not going anywhere though."';
items.I166.quality = 'Uncommon';
items.I166.sell = 'returnGearPrice("I166")';
items.I166.max = 1;
items.I166.use = 'gearSwap(items.I166.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I166.stats = 'ringAdditiveMaxHp = rUpgDmg("I166", 1); items.I166.statUp = 0.2; if (items.I166.level>49) items.I166.statUp = 0.4'
items.I166.remove = 'ringAdditiveMaxHp = 0; items.I166.statUp = 0'
items.I166.series = "beastfallen"; 
items.I166.cap = 50;
items.I166.statUp = 0

items.I173 = {};
items.I173.name = 'Firelink Band';
items.I173.description =`'Equipable - Ring<br>'+rUpgLvl("I173")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I173", 1))+' Max Health'`;
items.I173.flavor = '"Warm to the touch."';
items.I173.skills = 'rUpgSkill("I173", "Raging Elements: +20%"+elementalIcon+"Elemental Bonus","passive",0)+"<br>"+rUpgSkill("I173", "Raging Elements+: +20%"+elementalIcon+"Elemental Bonus","passive",40)+"<br>"+rUpgSkill("I173", "Raging Elements++: +20%"+elementalIcon+"Elemental Bonus","passive",50)'
items.I173.quality = 'Uncommon';
items.I173.sell = 'returnGearPrice("I173")';
items.I173.max = 1;
items.I173.use = 'gearSwap(items.I173.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I173.stats = 'ringAdditiveMaxHp = rUpgDmg("I173", 1); items.I173.statUp = 0.2; if (items.I173.level>39) items.I173.statUp = 0.4; if (items.I173.level>49) items.I173.statUp = 0.6'
items.I173.remove = 'ringAdditiveMaxHp = 0; items.I173.statUp = 0'
items.I173.statUp = 0;
items.I173.series = "beastfallen"; 
items.I173.cap = 50;

items.I282 = {};
items.I282.name = 'Hellfire Ring';
items.I282.description =  `'Equipable - Ring<br>'+rUpgLvl("I282")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I282", 1))+' Max Health'`;
items.I282.skills = 'rUpgSkill("I282", "Tyranny\'s End: Prevents"+buffIcon("B24")+"Burning damage","passive",30)'
items.I282.flavor = '"A ring plated in a gem that can absorb heat of the wearer. Great for Summer."';
items.I282.quality = 'Uncommon';
items.I282.sell = 'returnGearPrice("I282")';
items.I282.max = 1; 
items.I282.use = 'gearSwap(items.I282.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I282.stats = 'ringAdditiveMaxHp = rUpgDmg("I282", 1);'
items.I282.remove = 'ringAdditiveMaxHp = 0;'
items.I282.series = 'beastfallen';
items.I282.cap = 50;

items.I175 = {};
items.I175.name = 'Golden Order Seal';
items.I175.description = `'Equipable - Ring<br>'+rUpgLvl("I175")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I175", 1))+' Max Health'`;
items.I175.flavor = '"Glistening gold and sacred inscriptions make this ring a beacon of divine favor"';
items.I175.skills = 'rUpgSkill("I175", "Unshackled Faith: +20%"+deificIcon+"Deific Bonus","passive",0)+"<br>"+rUpgSkill("I175", "Unshackled Faith+: +20%"+deificIcon+"Deific Bonus","passive",40)+"<br>"+rUpgSkill("I175", "Unshackled Faith++: +20%"+deificIcon+"Deific Bonuss","passive",50)'
items.I175.quality = 'Uncommon';
items.I175.sell = 'returnGearPrice("I175")';
items.I175.max = 1;
items.I175.use = 'gearSwap(items.I175.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I175.stats = 'ringAdditiveMaxHp = rUpgDmg("I175", 1); items.I175.statUp = 0.2; if (items.I175.level>39) items.I175.statUp = 0.4; if (items.I175.level>49) items.I175.statUp = 0.6'
items.I175.remove = 'ringAdditiveMaxHp = 0; items.I175.statUp = 0'
items.I175.statUp = 0;
items.I175.series = "beastfallen"; 
items.I175.cap = 50;

items.I184 = {};
items.I184.name = 'Ring of Mimic Friendship';
items.I184.description =  `'Equipable - Ring<br>'+rUpgLvl("I184")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I184", 1))+' Max Health'`;
items.I184.skills = 'rUpgSkill("I184", "Quid Pro Quo: +1 Mystery Present","passive",40)+"<br>"+rUpgSkill("I184", "Quid Pro Quo+: +1 Mystery Present","passive",50)+"<br>"+rUpgSkill("I184", "Quid Pro Quo++: +1 Mystery Present","passive",60)'
items.I184.flavor = '"We won\'t take a single bait, promised."';
items.I184.quality = 'Epic';
items.I184.sell = 'returnGearPrice("I184")';
items.I184.max = 1;
items.I184.use = 'gearSwap(items.I184.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I184.stats = 'ringAdditiveMaxHp = rUpgDmg("I184", 1);if (items.I184.level>39) items.I184.statUp = 1; if (items.I184.level>49) items.I184.statUp = 2; if (items.I184.level>59) items.I184.statUp = 3;'
items.I184.remove = 'ringAdditiveMaxHp = 0;items.I184.statUp = 0;'
items.I184.statUp = 0;
items.I184.cap = 70
items.I184.series = "solstice"

items.I192 = {};
items.I192.name = 'Web-Threaded Promise';
items.I192.description = `'Equipable - Ring<br>'+rUpgLvl("I192")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I192", 1))+' Max Health'`;
items.I192.flavor = '"Hardened, sharp cobweb in the shape of a ring."';
items.I192.skills = 'rUpgSkill("I192", "Dark String: +20%"+occultIcon+"Occult Bonus","passive",0)+"<br>"+rUpgSkill("I192", "Dark String+: +20%"+occultIcon+"Occult Bonus","passive",30)+"<br>"+rUpgSkill("I192", "Dark String++: +20%"+occultIcon+"Occult Bonus","passive",40)'
items.I192.quality = 'Uncommon';
items.I192.sell = 'returnGearPrice("I192")';
items.I192.max = 1;
items.I192.use = 'gearSwap(items.I192.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I192.stats = 'ringAdditiveMaxHp = rUpgDmg("I192", 1); items.I192.statUp = 0.2; if (items.I192.level>29) items.I192.statUp = 0.4; if (items.I192.level>39) items.I192.statUp = 0.6'
items.I192.remove = ' ringAdditiveMaxHp = 0; items.I192.statUp = 0;'
items.I192.statUp = 0;
items.I192.series = "forgotten"; 
items.I192.cap = 40;

items.I193 = {};
items.I193.name = 'Lucky Clover Ring';
items.I193.description =  `'Equipable - Ring<br>'+rUpgLvl("I193")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I193", 1))+' Max Health'`;
items.I193.skills = 'rUpgSkill("I193", "Five Leaf Visage: +15%"+expIcon+"EXP Bonus","passive",30)'
items.I193.flavor = '"Bears the symbol of fortune."';
items.I193.quality = 'Rare';
items.I193.sell = 20000;
items.I193.max = 1;
items.I193.use = 'gearSwap(items.I193.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I193.stats = 'ringAdditiveMaxHp = rUpgDmg("I193", 1); if (items.I193.level>9) items.I193.statUp = 0.15'
items.I193.remove = 'ringAdditiveMaxHp = 0; items.I193.statUp = 0'
items.I193.statUp = 0;
items.I193.series = 'revered';
items.I193.cap = 60;

items.I345 = {};
items.I345.name = 'Cat Burglar Ring';
items.I345.description = 'Equipable - Ring' 
items.I345.skills = 'rUpgSkill("I345", "Sticky Paw: Increases Thief success chance","passive",0)+bestiaryTag("⚜️ Dedicated Content: Neko ⚜️", "#A351AB")'
items.I345.flavor = '"The gemstone resembling a cat\'s eye imbues one\'s perception with heightened acuity, facilitating the art of pocket-picking."';
items.I345.quality = 'Rare';
items.I345.sell = 'returnGearPrice("I345")';
items.I345.max = 1;
items.I345.use = 'gearSwap(items.I345.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I345.stats = 'items.I345.statUp = 50;'
items.I345.remove = 'items.I345.statUp = 0;'
items.I345.statUp = 0;
items.I345.series = 'forgotten';
items.I345.noUpgrade = true;

items.I72 = {};
items.I72.name = 'Ribbon';
items.I72.description =  `'Equipable - Trinket<br>'+rUpgLvl("I72")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I72", 0.5))+' Max Health'`;
items.I72.skills = 'rUpgSkill("I72", "Pretty In Pink: +10% All Resistances","passive",0)'
items.I72.flavor = '"A gorgeous grand ribbon that guarantees being the center of attention."';
items.I72.quality = 'Mythic';
items.I72.sell = 'returnGearPrice("I72")';
items.I72.max = 1; 
items.I72.use = 'gearSwap(items.I72.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I72.stats = 'trinketAdditiveMaxHp = rUpgDmg("I72", 0.5); items.I72.statUp = 0.1'
items.I72.remove = 'trinketAdditiveMaxHp = 0; items.I72.statUp = 0'
items.I72.series = 'revered';
items.I72.statUp =0;
items.I72.cap = 60;

items.I11 = {};
items.I11.name = 'Runic Die';
items.I11.description = `'Equipable - Trinket<br>'+rUpgLvl("I11")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I11", 1))+' Max Health'`;
items.I11.flavor = '"Truth is... the game was rigged from the start."';
items.I11.skills = 'rUpgSkill("I11", "Loaded Sides: Enemies drop a small amount of Shells on defeat","passive",0)'
items.I11.quality = 'Common';
items.I11.sell = 5000;
items.I11.max = 1;
items.I11.use = 'gearSwap(items.I11.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I11.stats = 'trinketAdditiveMaxHp = rUpgDmg("I11", 1); items.I11.statUp = 30;'
items.I11.remove = 'trinketAdditiveMaxHp = 0; items.I11.statUp = 0;'
items.I11.statUp = 0;
items.I11.series = 'heirloom';
items.I11.cap = 10;

items.I13 = {};
items.I13.name = 'Wooden Badge';
items.I13.description = `'Equipable - Trinket<br>'+rUpgLvl("I13")+'<br><FONT COLOR="#1EFF0C">Equip: Does nothing ...Or does it?'`;
items.I13.skills = 'rUpgSkill("I13", "Nothing: Increases Nothing by 15%","passive",20)'
items.I13.flavor = '"A wooden badge commemorating your initiation into adventuring."';
items.I13.quality = 'Uncommon';
items.I13.sell = 1;
items.I13.max = 1;
items.I13.use = 'gearSwap(items.I13.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I13.series = 'heirloom';
items.I13.cap = 10;

items.I172 = {};
items.I172.name = 'Mighty Squeaky Paladinic Hammer of Squeak';
items.I172.description = `'Equipable - Weapon<br>'+rUpgLvl("I172")`;
items.I172.flavor = '"Forged for the cutest hero"';
items.I172.skills = 'rUpgSkill("I172", "Godslam: Massive Squeak Damage","active",0)+bestiaryTag("⚜️ Dedicated Content: PursuantAunt ⚜️", "#A351AB")'
items.I172.quality = 'Epic';
items.I172.sell = 100;
items.I172.max = 1
items.I172.use = 'gearSwap(items.I172.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I172.series = 'millionaire';
items.I172.statUp = 0;
items.I172.attackChance = 'castSqueaky()';
items.I172.noUpgrade = true;

items.I176 = {};
items.I176.name = 'Old Bandaid';
items.I176.description =  `'Equipable - Ring<br>'+rUpgLvl("I176")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I176", 1))+' Max Health'`;
items.I176.skills = 'rUpgSkill("I176", "Medicinal Balm: Prevents"+buffIcon("B1")+"Poison damage","passive",10)'
items.I176.flavor = '"A discarded, second-hand bandaid. Nothing else but a bandaid fix."';
items.I176.quality = 'Common';
items.I176.sell = 1000;
items.I176.max = 1; 
items.I176.use = 'gearSwap(items.I176.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I176.stats = 'ringAdditiveMaxHp = rUpgDmg("I176", 1);'
items.I176.remove = 'ringAdditiveMaxHp = 0;'
items.I176.series = 'millionaire';
items.I176.cap = 20;

items.I47 = {};
items.I47.name = 'Hoopperoona\'s Phylactery';
items.I47.description =  `'Equipable - Trinket<br>'+rUpgLvl("I47")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I47", 1))+' Max Health'`;
items.I47.skills = 'rUpgSkill("I47", "Poison Fangs: Low chance to inflict"+buffIcon("B1")+"Poison","active",0)+"<br>"+rUpgSkill("I47", "Neurotoxin: Poisoned enemies take 20% more"+natureIcon+"Nature Damage","passive",30)'
items.I47.flavor = '"Remains of a forbidden friendship."';
items.I47.quality = 'Uncommon';
items.I47.sell = 'returnGearPrice("I47")';
items.I47.max = 1;
items.I47.stats = 'trinketAdditiveMaxHp = rUpgDmg("I47", 1)'
items.I47.remove = 'trinketAdditiveMaxHp = 0'
items.I47.use = 'gearSwap(items.I47.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")';
items.I47.attackChance = 'castHoopperonasPhylactery()';
items.I47.series = "forgotten"; 
items.I47.cap = 40;

items.I56 = {};
items.I56.name = 'Heart of the Cards';
items.I56.description = `'Equipable - Trinket<br>'+rUpgLvl("I56")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I56", 1))+' Max Health'`;
items.I56.flavor = '"A mystic deck with cards from all known card games. We are definitely getting kicked out of the casino with this one."';
items.I56.skills = 'rUpgSkill("I56", "Willpower: Deal Medium"+deificIcon+"Deific Damage 10 times after getting hit 10 times","active",0)+"<br>"+rUpgSkill("I56", "Faith: +20%"+deificIcon+"Deific Damage","passive",50)+"<br>"+rUpgSkill("I56", "Trust: Willpower hits 5 additional times","passive",60)'
items.I56.quality = 'Epic';
items.I56.sell = 'returnGearPrice("I56")';
items.I56.max = 1;
items.I56.stats = 'trinketAdditiveMaxHp = rUpgDmg("I56", 1); if (items.I56.level>49) items.I56.statUp=0.2;'
items.I56.remove = 'trinketAdditiveMaxHp = 0; items.I56.statUp=0'
items.I56.use = 'gearSwap(items.I56.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I56.defenseChance = 'if (buffs.B28A.stacks>8) {buffs.B28A.time=0; buffs.B28A.stacks=0; playerBuffs(); castHeartOfTheCards()} else {buffs.B28A.time=10; buffs.B28A.stacks++; playerBuffs();} '
items.I56.series = 'solstice';
items.I56.cap = 70;
items.I56.statUp=0;

items.I116 = {}; 
items.I116.name = 'Broccoli';
items.I116.description = `'Equipable - Trinket<br>'+rUpgLvl("I116")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I116", 1))+' Max Health'`;
items.I116.skills = 'rUpgSkill("I116", "Emergency Meal: Restore 1/4 of your Health when it goes below 50% (1 minute Cooldown)","passive",0)+"<br>"+rUpgSkill("I116", "Eat Your Greens: Emergency Meal restores an additional 1/4 Health overtime","passive",30)'
items.I116.flavor = '"Full of nutrients and good stuff for your body, unfortunately."';
items.I116.quality = 'Common';
items.I116.sell = 5500;
items.I116.max = 1;
items.I116.use = 'gearSwap(items.I116.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")';
items.I116.cd = 0;
items.I116.stats = 'trinketAdditiveMaxHp = rUpgDmg("I116", 1)'
items.I116.remove = 'trinketAdditiveMaxHp = 0'
items.I116.healthChance = ' if (rpgPlayer.hp<playerMaxHp/2 && items.I116.cd===0) {if (items.I116.level>29){buffs.B108.time=10;playerBuffs()} playSound("audio/monch.mp3"); items.I116.cd=60; playerHealingDamage(playerMaxHp*0.25); animState("rpgPlayerImg", "flash 0.5s 1"); playerUpdate(); animParticleBurst(10 , "particleHealth", "playerPanel", 0); if (!settings.disableSkillLog) {logPrint(`<FONT COLOR="#18ccba"> You eat the Broccoli. It wasnt very tasty...`)}}';
items.I116.series = 'masterwork';
items.I116.cap = 30;

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

items.I168 = {};
items.I168.name = 'Desert In a Jar';
items.I168.description = `'Equipable - Trinket<br>'+rUpgLvl("I168")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I168", 1))+' Max Health'`;
items.I168.skills = 'rUpgSkill("I168", "Stirring Sands: Low chance to gain +40%"+spIcon+"Spellpower","active",0)+"<br>"+rUpgSkill("I168", "Mirage Dust: +20%"+spIcon+"Spellpower","passive",50)'
items.I168.flavor = '"Not quite as valuable as the one with the dirt."';
items.I168.quality = 'Rare';
items.I168.sell = 'returnGearPrice("I168")';
items.I168.max = 1;
items.I168.use = 'gearSwap(items.I168.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I168.attackChance = 'castDesertInAJar()';
items.I168.stats = 'trinketAdditiveMaxHp = rUpgDmg("I168", 1); if (items.I168.level>49) items.I168.statUp=0.2;'
items.I168.remove = 'trinketAdditiveMaxHp = 0; items.I168.statUp=0;'
items.I168.series = 'revered';
items.I168.cap = 60;
items.I168.statUp=0;

items.I182 = {};
items.I182.name = 'Shiny Fishing Lure';
items.I182.description = 'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: +1 Fishing Level';
items.I182.flavor = '"Its iridescent hues attract the curiosity of aquatic life."';
items.I182.quality = 'Uncommon';
items.I182.sell = 'artisanBonus("EI4")';
items.I182.max = 1;
items.I182.use = 'gearSwap(items.I182.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I182.stats = 'items.I182.statUp = 1;'
items.I182.remove = 'items.I182.statUp = 0;'
items.I182.statUp = 0;
items.I182.series = "masterwork"

items.I201 = {};
items.I201.name = 'Thunderous Gyroresonator';
items.I201.description = `'Equipable - Trinket<br>'+rUpgLvl("I201")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I201", 1))+' Max Health'`;
items.I201.skills = 'rUpgSkill("I201", "Lightning Strike: Medium chance to deal medium"+elementalIcon+"Elemental Damage","active",0)+"<br>"+rUpgSkill("I201", "Fulgor: Lightning Strike has High chance to inflict"+buffIcon("B16")+"Burn","passive",40)'
items.I201.flavor = '"A device that can harness electricity and discharge it right at the enemy spot."';
items.I201.quality = 'Uncommon';
items.I201.sell = 'artisanBonus("EI3")';
items.I201.max = 1;
items.I201.stats = 'trinketAdditiveMaxHp = rUpgDmg("I201", 1)'
items.I201.remove = 'trinketAdditiveMaxHp = 0'
items.I201.use = 'gearSwap(items.I201.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")';
items.I201.attackChance = 'castThunderousGyroresonator()';
items.I201.series = 'beastfallen';
items.I201.cap = '50';

items.I425 = {};
items.I425.name = 'Lithic Speartip';
items.I425.description = `'Equipable - Trinket<br>'+rUpgLvl("I425")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I425", 1))+' Max Health'`;
items.I425.skills = 'rUpgSkill("I425", "Ancient Recall: Every 30 seconds, gain one stack of"+buffIcon("B38")+"Brittle Shield","passive",0)+"<br>"+rUpgSkill("I425", "Era Walk: Gain one extra stack of"+buffIcon("B38")+"Brittle Shield","passive",60)'
items.I425.flavor = '"Don\'t bring a spear to a gunfight."';
items.I425.quality = 'Uncommon';
items.I425.sell = 'returnGearPrice("I425")';
items.I425.stats = 'trinketAdditiveMaxHp = rUpgDmg("I425", 1)'
items.I425.remove = 'trinketAdditiveMaxHp = 0'
items.I425.max = 1;
items.I425.use = 'gearSwap(items.I425.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I425.attackChance = 'if (items.I425.cd === 0 && items.I425.level>59) {items.I425.cd = 30; buffs.B89.time=30; buffs.B89.stacks=2;} else if (items.I425.cd === 0) {items.I425.cd = 30; buffs.B89.time=30; buffs.B89.stacks=1;}';
items.I425.cd = 0;
items.I425.series = 'solstice';
items.I425.cap = 70;

items.I220 = {};
items.I220.name = 'Emblem Of Godhood';
items.I220.description = `'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: Low chance to summon a holy ray of light, smitting the enemy for '+ returnItemUpgradeScaling(220, "I220", "high")+' '+deificIcon+'Deific Damage '+scalingIcon`;
items.I220.flavor = '"Remains of a forbidden friendship."';
items.I220.quality = 'Epic';
items.I220.sell = 8000;
items.I220.max = 10;
items.I220.use = 'gearSwap(items.I220.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")';
items.I220.attackChance = 'if (rng(1,2)===1) castEmblemOfGodhood()';
//items.I220.series = 'chosen';

items.I377 = {};
items.I377.name = 'Lapilli';
items.I377.description = `'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: Restores '+ beautify(returnItemUpgradeScaling(16923000, "I377"))+' Health when the enemy attacks'`;
items.I377.flavor = '"Amidst the risk of the storm, con lentitud poderosa."';
items.I377.quality = 'Epic';
items.I377.sell = 4500;
items.I377.max = 10;
items.I377.use = 'gearSwap(items.I377.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")';
items.I377.defenseChance = 'playerHealingDamage(returnItemUpgradeScaling(16923000, "I377"))'
items.I377.statUp = 0;
//if (items.I168.level>49) items.I168.statUp=0.2;

items.I378 = {};
items.I378.name = 'Demonlife Orb';
items.I378.description = `'Equipable - Trinket<br>'+rUpgLvl("I378")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I378", 1))+' Max Health'`;
items.I378.skills = 'rUpgSkill("I378", "Blood Pact: Increase"+spIcon+"Spellpower by"+colorTag("x2","#E57D08")+"at the expense of losing Health everytime you auto-attack","passive",0)+"<br>"+rUpgSkill("I378", "Daemon Communion: +20%"+spIcon+"Spellpower","passive",60)+"<br>"+rUpgSkill("I378", "Fire Purge: Your spells might inflict"+buffIcon("B25")+"Hex","passive",70)'
items.I378.flavor = '"A sphere containing tremendous spiritual demonic energy. Do not let anyone knock it off."';
items.I378.quality = 'Epic';
items.I378.sell = 'returnGearPrice("I378")';
items.I378.max = 1;
items.I378.attackChance = "playerBasicDamage(playerMaxHp/12)";
items.I378.use = 'gearSwap(items.I378.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I378.stats = 'trinketAdditiveMaxHp = rUpgDmg("I378", 1); items.I378.statUp=2; if (items.I378.level>59) items.I378.statUp2=0.2 '
items.I378.remove = 'trinketAdditiveMaxHp = 0; items.I378.statUp=1; items.I378.statUp2=0'
items.I378.statUp = 0;
items.I378.series = 'ancient';
items.I378.cap = 80;
items.I378.statUp=1;
items.I378.statUp2=0;

items.I495 = {};
items.I495.name = 'IV Bag';
items.I495.description =  `'Equipable - Trinket<br>'+rUpgLvl("I495")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I495", 1))+' Max Health'`;
items.I495.skills = 'rUpgSkill("I495", "Transfusion: Automatically uses owned Healing Potions on low Health","passive",0)+"<br>"+rUpgSkill("I495", "First Aid: +10% Healing Received","passive",70)'
items.I495.flavor = '"Filled to the brim with tomato sauce."';
items.I495.quality = 'Uncommon';
items.I495.sell = 'returnGearPrice("I495")';
items.I495.max = 1;
items.I495.stats = 'trinketAdditiveMaxHp = rUpgDmg("I495", 1);  if (items.I495.level>49) items.I495.statUp= 0.15'
items.I495.remove = 'trinketAdditiveMaxHp = 0; items.I495.statUp= 0'
items.I495.use = 'gearSwap(items.I495.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")';
items.I495.defenseChance = 'castIvBag()';
items.I495.series = "ancient"; 
items.I495.cap = 80;
items.I495.statUp= 0;

items.I498 = {};
items.I498.name = 'House Turtle Warbanner';
items.I498.description =  `'Equipable - Trinket<br>'+rUpgLvl("I498")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I498", 1))+' Max Health'`;
items.I498.skills = 'rUpgSkill("I498", "Grand House Banner: Periodically gain +50%"+strIcon+"Strength","active",0)+"<br>"+rUpgSkill("I498", "Drakeblood: Reduced Cooldown timer of Grand House Banner","passive",80)+bestiaryTag("⚜️ Dedicated Content: Jacko ⚜️", "#A351AB")'
items.I498.flavor = '"The north remembers."';
items.I498.quality = 'Rare';
items.I498.sell = 'returnGearPrice("I498")';
items.I498.max = 1;
items.I498.stats = 'trinketAdditiveMaxHp = rUpgDmg("I498", 1);'
items.I498.remove = 'trinketAdditiveMaxHp = 0; items.I498.statUp= 0'
items.I498.use = 'gearSwap(items.I498.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")';
items.I498.defenseChance = 'castWarbanner()';
items.I498.series = "malevolent"; 
items.I498.cap = 90;
items.I498.cd = 0;
items.I498.statUp= 0;

items.I113 = {}; 
items.I113.name = 'Soft Leather Gloves';
items.I113.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Shells per pat by +25';
items.I113.flavor = '"Warm and fuzzy pats are guaranteed by the soft fur of the gloves"';
items.I113.quality = 'Upgrade';
items.I113.sell = 0;
items.I113.max = 1;
items.I113.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I113.statUp = 25; statsUpdate(); items.I113.count--; ';
items.I113.statUp = 0;

items.I124 = {}; 
items.I124.name = 'Ironwork Gloves';
items.I124.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Shells per pat by +35';
items.I124.flavor = '"Maybe it doesn\'t give the warmest pats, but it gives the most secure and firm ones."';
items.I124.quality = 'Upgrade';
items.I124.sell = 0;
items.I124.max = 1;
items.I124.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I124.statUp = 35; statsUpdate();  items.I124.count--; ';
items.I124.statUp = 0;

items.I128 = {}; 
items.I128.name = 'Midas Embrace';
items.I128.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Shells per pat by +50';
items.I128.flavor = '"The love they provide is way more valuable than gold can ever hope to be."';
items.I128.quality = 'Upgrade';
items.I128.sell = 0;
items.I128.max = 1;
items.I128.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I128.statUp = 50; statsUpdate(); items.I128.count--; ';
items.I128.statUp = 0;

items.I202 = {}; 
items.I202.name = 'Vampiric Touch';
items.I202.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Shells per pat by +1000';
items.I202.flavor = '"Designed to drain affection to the touch."';
items.I202.quality = 'Upgrade';
items.I202.sell = 0;
items.I202.max = 1;
items.I202.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I202.statUp = 1000; statsUpdate();items.I202.count--; ';
items.I202.statUp = 0;

items.I401 = {}; 
items.I401.name = 'Spirit Gauntlets';
items.I401.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Shells per pat by +1000';
items.I401.flavor = '"Ever patted a soul?"';
items.I401.quality = 'Upgrade';
items.I401.sell = 0;
items.I401.max = 1;
items.I401.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I401.statUp = 1000; statsUpdate();items.I401.count--; ';
items.I401.statUp = 0;

items.I426 = {}; 
items.I426.name = 'Thermocline Gloves';
items.I426.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Shells per pat by +1000';
items.I426.flavor = '"A piece of armor made up from a made up alloy. Allegedly, it increases patting efficiency up to unseen levels, but I could also be making that up aswell."';
items.I426.quality = 'Upgrade';
items.I426.sell = 0;
items.I426.max = 1;
items.I426.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); items.I426.statUp = 1000; statsUpdate();items.I426.count--; ';
items.I426.statUp = 0;

items.I86 = {}; 
items.I86.name = 'High-Grade Anvil';
items.I86.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently reduces the crafting time of all recipes by 5 seconds';
items.I86.flavor = '"Hit Hard! Hit Fast! Hit Often!"';
items.I86.quality = 'Upgrade';
items.I86.sell = 0;
items.I86.max = 1;
items.I86.use = ' playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.anvil1 = true; reduceRecipeTimeCheck();  items.I86.count--; ';

items.I87 = {}; 
items.I87.name = 'Blast-Proof Anvil';
items.I87.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently reduces the crafting time of all recipes by 5 seconds';
items.I87.flavor = '"I can assure you that some science is taking place here that allows this to work."';
items.I87.quality = 'Upgrade';
items.I87.sell = 0;
items.I87.max = 1;
items.I87.use = ' playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.anvil2 = true; reduceRecipeTimeCheck(); items.I87.count--; ';

items.I157 = {}; 
items.I157.name = 'Anima Anvil';
items.I157.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently reduces the crafting time of all recipes by 5 seconds';
items.I157.flavor = '"Ignore the ghastly souls produced by the smithing."';
items.I157.quality = 'Upgrade';
items.I157.sell = 0;
items.I157.max = 1;
items.I157.use = ' playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.anvil3 = true; reduceRecipeTimeCheck(); items.I157.count--; ';

items.I34 = {}; 
items.I34.name = 'Dead Man Emblem';
items.I34.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently enables the auto-summoning of bosses once the current one gets defeated. Right click on the boss button to toggle';
items.I34.flavor = '"No creature should suffer this fate."';
items.I34.quality = 'Upgrade';
items.I34.sell = 0;
items.I34.max = 1;
items.I34.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.autoBoss = true; items.I34.count--; ';

unlocks.inventorySorting = false;

items.I70 = {}; 
items.I70.name = 'Colored Bookmarks';
items.I70.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently adds sorting categories to the inventory';
items.I70.flavor = '"Paginated bookmarks used to sort pages. They are scented according to their colors."';
items.I70.quality = 'Upgrade';
items.I70.sell = 0;
items.I70.max = 1;
items.I70.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.inventorySorting = true; unlocksReveal();  items.I70.count--; gametipUnlock("gt9");  ';

unlocks.bestiary = false;
items.I290 = {}; 
items.I290.name = 'Monster Bestiary';
items.I290.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the Bestiary at the top of the screen. Fill entries of enemies by defeating them to gain Mastery';
items.I290.flavor = '"A picture book full of details and photos of cute foes. Calling them monsters would be a farce."';
items.I290.quality = 'Upgrade';
items.I290.sell = 0;
items.I290.max = 1;
items.I290.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.bestiary = true; unlocksReveal(); items.I290.count--; ';

unlocks.armory = false;
items.I474 = {}; 
items.I474.name = 'Armory';
items.I474.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the Armory at the top of the screen. Store and level up gear and weapons on it to gain Mastery. You can buy back adquired gear too';
items.I474.flavor = '"How do you plan on carrying all of that?."';
items.I474.quality = 'Upgrade';
items.I474.sell = 0;
items.I474.max = 1;
items.I474.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.armory = true; unlocksReveal(); items.I474.count--; gametipUnlock("gt7")';



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
items.I79.use = 'playSound("audio/retro2.mp3");animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.autoclicker = true; unlocksReveal();   items.I79.count--; ';

items.I90 = {}; 
items.I90.name = 'Premium Metal Grill';
items.I90.description = 'Miscellaneous';
items.I90.flavor = '"Vents and ample cooking surface ensures a perfect char every time, expect nothing less from the lord of fire."';
items.I90.quality = 'Quest';
items.I90.sell = 100;
items.I90.max = 1;

items.I381 = {}; 
items.I381.name = 'Worn Down Blade';
items.I381.description = 'Miscellaneous';
items.I381.flavor = '"Exudeing a legendary aura, it is evident that it has experienced numerous battlegrounds."';
items.I381.quality = 'Quest';
items.I381.sell = 0;
items.I381.max = 1;

items.I382 = {}; 
items.I382.name = 'Magicrilium Recalibrator';
items.I382.description = `'Miscellaneous<br><FONT COLOR="#1EFF0C">Charge by recieving magic damage from Arcanite Towers<br>'+bestiaryTag("Current Charge: "+items.I382.statUp.toFixed(1)+"%", "purple")`;
items.I382.flavor = '"An accomulator of magic. Essentially, a battery for magi."';
items.I382.quality = 'Quest';
items.I382.sell = 0;
items.I382.statUp = 0;
items.I382.max = 1;
items.I382.dynamic = true;

items.I102 = {};
items.I102.name = 'Golden Clover';
items.I102.description = 'Miscellaneous - Treasure';
items.I102.flavor = '"Today seems like a good day to buy lottery."';
items.I102.quality = 'Soulbound';
items.I102.sell = 777;

items.I391 = {};
items.I391.name = 'Gold Bar';
items.I391.description = 'Miscellaneous - Treasure';
items.I391.flavor = '"Incredibly devalued due to the appearance of shinier and prettier made up metals."';
items.I391.quality = 'Poor';
items.I391.sell = 120000;

items.I221 = {};
items.I221.name = 'Apology T-shirt';
items.I221.description = 'Miscellaneous - Treasure';
items.I221.flavor = '"I got my Time Eggs nerfed and all I got was this stupid T-shirt"';
items.I221.quality = 'Soulbound';
items.I221.max = 1;
items.I221.sell = 20;

items.I104 = {};
items.I104.name = 'Grand Archive Key';
items.I104.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the Grand Archive, gaining Mastery as you collect books on it';
items.I104.flavor = '"The key to a massive library recording specifics about the past, present, and future."';
items.I104.quality = 'Upgrade';
items.I104.sell = 0;
items.I104.max = 1;
items.I104.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0);  unlocks.journal=true; unlocksReveal(); items.I104.count--;';

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
items.I109.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.penguins=true; unlocksReveal();  items.I109.count--;  ';

items.I111 = {}; 
items.I111.name = 'Unusual Herb Blend';
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
items.I287.name = 'Garden Plot';
items.I287.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the Garden on the Guildwork tab';
items.I287.flavor = '"Tortugrandpa\'s dying wish."';
items.I287.quality = 'Upgrade';
items.I287.max = 1;
items.I287.sell = 0;
items.I287.use = 'playSound("audio/retro2.mp3");animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.garden = true; unlocksReveal();  items.I287.count--; ';

items.I120 = {}; 
items.I120.name = 'Whiskers Gratitude';
items.I120.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently, once a day, gives the chance to obtain a present from clicking the turtle';
items.I120.flavor = '"meow meow meow to you too, little fella."';
items.I120.quality = 'Upgrade';
items.I120.sell = 0;
items.I120.max = 1;
items.I120.use = 'playSound("audio/meow.mp3"); playSound("audio/retro2.mp3");animParticleBurst(5 , "particleSpark", "cursor", 0); createFloatingText("<p>Meow!"); unlocks.present = true;   items.I120.count--; ';

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

items.I423 = {}; 
items.I423.name = 'Broken Glasses';
items.I423.description = 'Miscellaneous';
items.I423.flavor = '"Well someone is not going to be happy about this."';
items.I423.quality = 'Quest';
items.I423.sell = 0;
items.I423.max = 1;

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
items.I191.name = 'Mana Potion';
items.I191.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Restores 900-1200 Health.';
items.I191.flavor = '"This potion operates by abruptly shattering your entire internal structure, causing your body to make an immediate effort to rebuild them in order to avert a sudden death. It also has a mild strawberry flavor."';
items.I191.quality = 'Common';
items.I191.sell = 7100;
items.I191.max = 5;
items.I191.use = ' playSound("audio/potion.mp3"); let recovered = rng(900,1200); playerHealingDamage(recovered); animState("rpgPlayerImg", "flash 0.5s 1"); playerUpdate(); animParticleBurst(10 , "particleGlow", "playerPanel", 230);  items.I19.count--; ';
*/


items.I199 = {};
items.I199.name = 'Unobtanium Necklace';
items.I199.description =  `'Equipable - Trinket<br>'+rUpgLvl("I199")+'<br><FONT COLOR="#1EFF0C">+'+ beautify(rUpgDmg("I199", 1))+' Max Health'`;
items.I199.skills = 'rUpgSkill("I199", "Cheater\'s Respite: +300% Attack Speed","passive",0)'
items.I199.flavor = '"To each their own."';
items.I199.quality = 'Poor';
items.I199.sell = 1;
items.I199.max = 1; 
items.I199.use = 'gearSwap(items.I199.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I199.stats = 'trinketAdditiveMaxHp = rUpgDmg("I199", 1); items.I199.statUp = 3'
items.I199.remove = 'trinketAdditiveMaxHp = 0; items.I199.statUp = 0'
items.I199.statUp =0;

items.I424 = {};
items.I424.name = 'IOU Voucher';
items.I424.description = `'Miscellaneous<br><FONT COLOR="#1EFF0C">Your previously exceeding Shells got stored into this voucher. Save it up well'+bestiaryTag("Shells Stored: "+beautify(items.I424.statUp), "darkorange","nobr")+"<br>"`;
items.I424.flavor = '"An exchangeable won only by the highest of achievers."';
items.I424.quality = 'Epic';
items.I424.sell = 0;
items.I424.max = 1;
items.I424.dynamic = true;
items.I424.statUp = 0;

items.I203 = {};
items.I203.name = 'Purifying Salt';
items.I203.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Purifies the spirit of a restless enemy <FONT COLOR="gray"> (20 second Cooldown)';
items.I203.flavor = '"If you\'re wondering, it tastes just like table salt."';
items.I203.quality = 'Quest';
items.I203.sell = 100;
items.I203.use = ' castPurifyingSalt(); items.I203.cd = 20; items.I203.count-- ;'
items.I203.cd = 0;

items.I398 = {};
items.I398.name = 'Pristine Tusk';
items.I398.description = 'Miscellaneous';
items.I398.flavor = '"As pristine as a billion year old piece of rock can be at least."';
items.I398.quality = 'Quest';
items.I398.sell = 50;

items.I388 = {}; 
items.I388.name = 'Forge Binder';
items.I388.description = 'Miscellaneous';
items.I388.flavor = '"A binder of the highest quality used in smithing."';
items.I388.quality = 'Quest';
items.I388.sell = 0;
items.I388.max = 1;

items.I393 = {}; 
items.I393.name = 'Beast Pelt';
items.I393.description = 'Miscellaneous';
items.I393.flavor = '"Hard and tough pelt of a legendary beast. It is clear this must have a great purpose."';
items.I393.quality = 'Quest';
items.I393.sell = 0;
items.I393.max = 1;

items.I396 = {};
items.I396.name = 'Monster Sampler';
items.I396.description = `'Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Take a sample of Hoopperoona'+bestiaryTag("Status: "+items.I396.statUp, "coral")`;
items.I396.flavor = '"A device capable of extracting fluids of a monster via injection."';
items.I396.quality = 'Quest';
items.I396.sell = 0;
items.I396.use = ' if (stats.currentEnemy==="E4" && items.I396.statUp==="Sample Not Taken") {items.I396.statUp="Sample Taken!"; playSound("audio/button7.mp3");} ;'
items.I396.cd = 0;
items.I396.max = 1;
items.I396.dynamic = true;
items.I396.statUp = "Sample Not Taken";

items.I390 = {}; 
items.I390.name = 'Twilight Shard';
items.I390.description = 'Miscellaneous';
items.I390.flavor = '"You feel a burning sensation in your soul as you get close to it."';
items.I390.quality = 'Legendary';
items.I390.sell = 0;
items.I390.max = 1;

items.I204 = {};
items.I204.name = 'Garrison Permit';
items.I204.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the Garrison tab. Research and build to gain various items and rewards.';
items.I204.flavor = '"Imaginary property is just that much more convenient to manage than real one."';
items.I204.quality = 'Upgrade';
items.I204.sell = 0;
items.I204.max = 1;
items.I204.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.garrison=true; createRecipeListing(); unlocksReveal(); items.I204.count--; ';

unlocks.itemOfTheDay = false;

items.I218 = {};
items.I218.name = 'Flash Sale!';
items.I218.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the "Item Of The Day" category in the shop'
items.I218.flavor = '"Call now to the number on-screen before someone else gets scammed!"';
items.I218.quality = 'Upgrade';
items.I218.sell = 0;
items.I218.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.itemOfTheDay=true; createItemOfTheDay(); unlocksReveal();items.I218.count--; ';
items.I218.statUp = 0;
items.I218.max = 1;

unlocks.medikit=false;

unlocks.loadouts=false;
items.I395 = {};
items.I395.name = 'Infinite Wardrobe';
items.I395.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks loadouts'
items.I395.flavor = '"There is actually just barely space for seven armor sets."';
items.I395.quality = 'Upgrade';
items.I395.sell = 0;
items.I395.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.loadouts=true; unlocksReveal(); items.I395.count--; ';
items.I395.statUp = 0;
items.I395.max = 1;

unlocks.gardenUpgrade1=false;
items.I301 = {};
items.I301.name = 'Garden Fencing';
items.I301.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently expands the garden'
items.I301.flavor = '"Can you feel ze schadenfreude?"';
items.I301.quality = 'Upgrade';
items.I301.sell = 0;
items.I301.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.gardenUpgrade1=true; unlocksReveal(); items.I301.count--; ';
items.I301.max = 1;

unlocks.gardenUpgrade2=false;
items.I302 = {};
items.I302.name = 'Garden Sprinklers';
items.I302.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently expands the garden'
items.I302.flavor = '"Can you feel ze schadenfreude?"';
items.I302.quality = 'Upgrade';
items.I302.sell = 0;
items.I302.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.gardenUpgrade2=true; unlocksReveal(); items.I302.count--; ';
items.I302.max = 1;

unlocks.gardenUpgrade3=false;
items.I303 = {};
items.I303.name = 'Garden Scarecrow';
items.I303.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently expands the garden'
items.I303.flavor = '"Can you feel ze schadenfreude?"';
items.I303.quality = 'Upgrade';
items.I303.sell = 0;
items.I303.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.gardenUpgrade3=true; unlocksReveal(); items.I303.count--; ';
items.I303.max = 1;

unlocks.gardenFertiliser=false;
items.I304 = {};
items.I304.name = 'Garden Fertiliser';
items.I304.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently allows the use of fertiliser within the garden'
items.I304.flavor = '"Doesn\'t net iridium crops, but it does help a lot."';
items.I304.quality = 'Upgrade';
items.I304.sell = 0;
items.I304.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.gardenFertiliser=true; unlocksReveal(); items.I304.count--; ';
items.I304.max = 1;

items.I379 = {};
items.I379.name = 'Water-Retaining Fertiliser';
items.I379.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks Water-Retaining Fertiliser'
items.I379.flavor = '"I just realised that the players dont really read this text ever so why bother."';
items.I379.quality = 'Upgrade';
items.I379.sell = 0;
items.I379.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.gardenFertiliser=true; unlocksReveal(); items.I304.count--; ';
items.I379.max = 1;

items.I494 = {};
items.I494.name = 'Sack of Microbots';
items.I494.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the Sack of Microbots Fertiliser'
items.I494.flavor = '"I just realised that the players dont really read this text ever so why bother."';
items.I494.quality = 'Upgrade';
items.I494.sell = 0;
items.I494.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.gardenFertiliser=true; unlocksReveal(); items.I304.count--; ';
items.I494.max = 1;

unlocks.seedCompendium=false;
items.I305 = {};
items.I305.name = 'Compendium';
items.I305.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently allows to see information about currently known seeds'
items.I305.flavor = '"Can you feel ze schadenfreude?"';
items.I305.quality = 'Upgrade';
items.I305.sell = 0;
items.I305.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.seedCompendium=true; unlocksReveal(); items.I305.count--; ';
items.I305.max = 1;

items.I306 = {};
items.I306.name = 'Wood Grain Fertiliser';
items.I306.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently allows the use of Wood Grain Fertiliser, boosting Flower Power at the expense of plant lifespan'
items.I306.flavor = '"Can you feel ze schadenfreude?"';
items.I306.quality = 'Upgrade';
items.I306.sell = 0;
items.I306.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.fertiliser1=true; unlocksReveal(); items.I306.count--; ';
items.I306.max = 1;

items.I307 = {};
items.I307.name = 'Bioluminiscent Fertiliser';
items.I307.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently allows the use of Bioluminiscent Fertiliser, boosting Mutation Chance at the expense of Water Requirement'
items.I307.flavor = '"Can you feel ze schadenfreude?"';
items.I307.quality = 'Upgrade';
items.I307.sell = 0;
items.I307.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.fertiliser2=true; unlocksReveal(); items.I307.count--; ';
items.I307.max = 1;

unlocks.seedShipping=false;
items.I308 = {};
items.I308.name = 'Seed Shipping';
items.I308.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently allows the shipping of known seeds from the Compendium for a price'
items.I308.flavor = '"Can you feel ze schadenfreude?"';
items.I308.quality = 'Upgrade';
items.I308.sell = 0;
items.I308.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.seedShipping=true; unlocksReveal(); items.I308.count--; ';
items.I308.max = 1;

items.I309 = {};
items.I309.name = 'Basic Seed Pouch';
items.I309.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Contains an assortment of basic seeds'
items.I309.flavor = '"Can you feel ze schadenfreude?"';
items.I309.quality = 'Uncommon';
items.I309.sell = 10;
items.I309.use = 'basicSeedPouch(); items.I309.count--;';

function basicSeedPouch(){

plants.g1.count += rng(0,11)
plants.g3.count += rng(0,11)
plants.g4.count += rng(0,11)
plants.g5.count += rng(0,11)
plants.g6.count += rng(0,11)
plants.g7.count += rng(0,11)
createPlants();

}



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

//mining

items.I227 = {}; 
items.I227.name = 'Blood Ruby';
items.I227.description = 'Miscellaneous - Collectible';
items.I227.flavor = '"A deep red variety of corundum, often associated with tales of conflict and bloodshed."';
items.I227.quality = 'Collectible';
items.I227.collectible = 2;
items.I227.rarity = 1;

items.I228 = {}; 
items.I228.name = 'Topaz';
items.I228.description = 'Miscellaneous - Collectible';
items.I228.flavor = '"Often used in jewelry and believed to bring strength and healing properties."';
items.I228.quality = 'Collectible';
items.I228.collectible = 10;
items.I228.rarity = 1;

items.I241 = {}; 
items.I241.name = 'Tiger Eye';
items.I241.description = 'Miscellaneous - Collectible';
items.I241.flavor = '"A type of quartz with fibrous inclusions of crocidolite, which impart its distinctive appearance."';
items.I241.quality = 'Collectible';
items.I241.collectible = 2;
items.I241.rarity = 1;

items.I233 = {}; 
items.I233.name = 'Sapphire';
items.I233.description = 'Miscellaneous - Collectible';
items.I233.flavor = '"Symbolizes wisdom and loyalty."';
items.I233.quality = 'Collectible';
items.I233.collectible = 2;
items.I233.rarity = 2;

items.I226 = {}; 
items.I226.name = 'Diamond';
items.I226.description = 'Miscellaneous - Collectible';
items.I226.flavor = '"Prized for its brilliance, hardness, and rarity."';
items.I226.quality = 'Collectible';
items.I226.collectible = 10;
items.I226.rarity = 2;

items.I229 = {}; 
items.I229.name = 'Turquoiserite';
items.I229.description = 'Miscellaneous - Collectible';
items.I229.flavor = '"A rare tubular gemstone found in marine environments."';
items.I229.quality = 'Collectible';
items.I229.collectible = 2;
items.I229.rarity = 2;

items.I230 = {}; 
items.I230.name = 'Peridot';
items.I230.description = 'Miscellaneous - Collectible';
items.I230.flavor = '"A luminous gemstone born from volcanic activity. Pray for it to not turn evil."';
items.I230.quality = 'Collectible';
items.I230.collectible = 10;
items.I230.rarity = 2;

items.I231 = {}; 
items.I231.name = 'Feldespate';
items.I231.description = 'Miscellaneous - Collectible';
items.I231.flavor = '"A spiky teal mineral utilized as ammunition in the high-stakes battles of the Turtle Wars. Just kidding, it just looks cool."';
items.I231.quality = 'Collectible';
items.I231.collectible = 2;
items.I231.rarity = 3;

items.I232 = {}; 
items.I232.name = 'Raritanium';
items.I232.description = 'Miscellaneous - Collectible';
items.I232.flavor = '"Turtles will go nuts and bolts for this."';
items.I232.quality = 'Collectible';
items.I232.collectible = 10;
items.I232.rarity = 3;

items.I234 = {}; 
items.I234.name = 'Gammanite';
items.I234.description = 'Miscellaneous - Collectible';
items.I234.flavor = '"Despite its hazardous nature, turtles insist on making house walls out of it."';
items.I234.quality = 'Collectible';
items.I234.collectible = 2;
items.I234.rarity = 3;

items.I237 = {}; 
items.I237.name = 'Advandrite';
items.I237.description = 'Miscellaneous - Collectible';
items.I237.flavor = '"This one rocks."';
items.I237.quality = 'Collectible';
items.I237.collectible = 10;
items.I237.rarity = 4;

items.I238 = {}; 
items.I238.name = 'Chromatic Tourmaline';
items.I238.description = 'Miscellaneous - Collectible';
items.I238.flavor = '"A beautiful mineral dazzling with all the rainbow colors."';
items.I238.quality = 'Collectible';
items.I238.collectible = 2;
items.I238.rarity = 4;

items.I240 = {}; 
items.I240.name = 'Taoline';
items.I240.description = 'Miscellaneous - Collectible';
items.I240.flavor = '"No matter on what slope you put it on, it seems to always mantain its balance."';
items.I240.quality = 'Collectible';
items.I240.collectible = 10;
items.I240.rarity = 4;

items.I235 = {}; 
items.I235.name = 'Flepatite';
items.I235.description = 'Miscellaneous - Collectible';
items.I235.flavor = '"A rare crystal born from the fusion of stardust and seawater."';
items.I235.quality = 'Collectible';
items.I235.collectible = 2;
items.I235.rarity = 5;

items.I236 = {}; 
items.I236.name = 'Equinoxium';
items.I236.description = 'Miscellaneous - Collectible';
items.I236.flavor = '"Absorbing both moonlight and sunlight, this gemstone is often referred as crystallised twilight."';
items.I236.quality = 'Collectible';
items.I236.collectible = 10;
items.I236.rarity = 5;

items.I239 = {}; 
items.I239.name = 'Xyzite';
items.I239.description = 'Miscellaneous - Collectible';
items.I239.flavor = '"A stone of alien origin. It\'s constant shapeshifting and geometric screaming puts you at unease."';
items.I239.quality = 'Collectible';
items.I239.collectible = 10;
items.I239.rarity = 5;

//fossil

items.I402 = {}; 
items.I402.name = 'Ancient Tooth';
items.I402.description = 'Miscellaneous - Collectible';
items.I402.flavor = '"A sharp, serrated, and curved fossilized tooth from a formidable dinosaur."';
items.I402.quality = 'Collectible';
items.I402.collectible = 5;
items.I402.rarity = 1;

items.I403 = {}; 
items.I403.name = 'Ancient Rib';
items.I403.description = 'Miscellaneous - Collectible';
items.I403.flavor = '"Its massive size and sturdy structure hint at the immense power and size of the creature it once belonged to."';
items.I403.quality = 'Collectible';
items.I403.collectible = 5;
items.I403.rarity = 1;

items.I404 = {}; 
items.I404.name = 'Ancient Scapula';
items.I404.description = 'Miscellaneous - Collectible';
items.I404.flavor = '"A fossilized shoulder blade from a prehistoric creature."';
items.I404.quality = 'Collectible';
items.I404.collectible = 5;
items.I404.rarity = 2;

items.I405 = {}; 
items.I405.name = 'Ancient Autopodium';
items.I405.description = 'Miscellaneous - Collectible';
items.I405.flavor = '"A bone from the lower extremity of a dinosaur. You ponder upon what kinds of shoes they would wear."';
items.I405.quality = 'Collectible';
items.I405.collectible = 5;
items.I405.rarity = 2;

items.I406 = {}; 
items.I406.name = 'Ancient Tail';
items.I406.description = 'Miscellaneous - Collectible';
items.I406.flavor = '"Reminds you of your own."';
items.I406.quality = 'Collectible';
items.I406.collectible = 5;
items.I406.rarity = 3;

items.I407 = {}; 
items.I407.name = 'Ancient Vertebrae';
items.I407.description = 'Miscellaneous - Collectible';
items.I407.flavor = '"A bone of a synapsid, which technically were not dinosaurs. However, the tortuga must not discriminate."';
items.I407.quality = 'Collectible';
items.I407.collectible = 5;
items.I407.rarity = 3;

items.I408 = {}; 
items.I408.name = 'Ancient Femur';
items.I408.description = 'Miscellaneous - Collectible';
items.I408.flavor = '"A thick bone from a creature of the past. It won\'t double your attack if you equip it, though."';
items.I408.quality = 'Collectible';
items.I408.collectible = 5;
items.I408.rarity = 4;

items.I409 = {}; 
items.I409.name = 'Ancient Skull';
items.I409.description = 'Miscellaneous - Collectible';
items.I409.flavor = '"Mighty, big and boney. Scientifically speaking, this creature must had been at least 500 tortugas long."';
items.I409.quality = 'Collectible';
items.I409.collectible = 5;
items.I409.rarity = 4;

items.I410 = {}; 
items.I410.name = 'Ancient Dino Toy';
items.I410.description = 'Miscellaneous - Collectible';
items.I410.flavor = '"A dinosaur encased in a hard material resembling a turtle caparace, awaiting for the moment to finally break free. Or so it seems."';
items.I410.quality = 'Collectible';
items.I410.collectible = 5;
items.I410.rarity = 5;

items.I411 = {}; 
items.I411.name = 'Ancient Dino Nuggie';
items.I411.description = 'Miscellaneous - Collectible';
items.I411.flavor = '"Primitive meat frozen over multiple ice ages. By the shape of it, we can only assume it pertained to a dinosaur."';
items.I411.quality = 'Collectible';
items.I411.collectible = 5;
items.I411.rarity = 5;


//fish

/*
items.I243 = {}; 
items.I243.name = 'Risingsun Koi';
items.I243.description = 'Miscellaneous - Collectible';
items.I243.flavor = '"Symbolizes good fortune and prosperity in Japanese culture."';
items.I243.quality = 'Collectible';
items.I243.collectible = 4;
items.I243.rarity = 1;
*/

items.I244 = {}; 
items.I244.name = 'Storebought Fish';
items.I244.description = 'Miscellaneous - Collectible';
items.I244.flavor = '"A common sight in pet stores."';
items.I244.quality = 'Collectible';
items.I244.collectible = 4;
items.I244.rarity = 1;

items.I248 = {}; 
items.I248.name = 'Pink Jellyfish';
items.I248.description = 'Miscellaneous - Collectible';
items.I248.flavor = '"A translucent marine creature with a gentle pink hue."';
items.I248.quality = 'Collectible';
items.I248.collectible = 4;
items.I248.rarity = 1;

/*
items.I249 = {}; 
items.I249.name = 'Miragefish';
items.I249.description = 'Miscellaneous - Collectible';
items.I249.flavor = '"Resembling a mirage in the water, tales describe its elusive nature and ethereal beauty."';
items.I249.quality = 'Collectible';
items.I249.collectible = 4;
items.I249.rarity = 2;
*/

items.I242 = {}; 
items.I242.name = 'Saltwater Eel';
items.I242.description = 'Miscellaneous - Collectible';
items.I242.flavor = '"A sleek and sinuous marine creature found in coastal waters worldwide."';
items.I242.quality = 'Collectible';
items.I242.collectible = 4;
items.I242.rarity = 2;
/*
items.I245 = {}; 
items.I245.name = 'Octopus';
items.I245.description = 'Miscellaneous - Collectible';
items.I245.flavor = '"Known for its intelligence, adaptability and great parenthood."';
items.I245.quality = 'Collectible';
items.I245.collectible = 4;
items.I245.rarity = 2;
*/
items.I247 = {}; 
items.I247.name = 'Fish Snack';
items.I247.description = 'Miscellaneous - Collectible';
items.I247.flavor = '"This one is not smiling back :("';
items.I247.quality = 'Collectible';
items.I247.collectible = 4;
items.I247.rarity = 3;
/*
items.I251 = {}; 
items.I251.name = 'Tiger Catfish';
items.I251.description = 'Miscellaneous - Collectible';
items.I251.flavor = '"It is characterized by its distinctive pattern of dark stripes and their loud purr."';
items.I251.quality = 'Collectible';
items.I251.collectible = 4;
items.I251.rarity = 3;
*/
items.I253 = {}; 
items.I253.name = 'Blobfish';
items.I253.description = 'Miscellaneous - Collectible';
items.I253.flavor = '"Fished deep underwater at 3000 feet by fisherman with 3000 and 1 foot fishing line."';
items.I253.quality = 'Collectible';
items.I253.collectible = 4;
items.I253.rarity = 3;
/*
items.I254 = {}; 
items.I254.name = 'Spotted Seahorse';
items.I254.description = 'Miscellaneous - Collectible';
items.I254.flavor = '"Found in shallow tropical and temperate waters worldwide."';
items.I254.quality = 'Collectible';
items.I254.collectible = 4;
items.I254.rarity = 4;
*/
items.I256 = {}; 
items.I256.name = 'Pufferfish';
items.I256.description = 'Miscellaneous - Collectible';
items.I256.flavor = '"Augh"';
items.I256.quality = 'Collectible';
items.I256.collectible = 4;
items.I256.rarity = 4;
/*
items.I255 = {}; 
items.I255.name = 'Igneous Eel';
items.I255.description = 'Miscellaneous - Collectible';
items.I255.flavor = '"The hottest catch around."';
items.I255.quality = 'Collectible';
items.I255.collectible = 4;
items.I255.rarity = 4;
*/
items.I250 = {}; 
items.I250.name = 'Axolotl';
items.I250.description = 'Miscellaneous - Collectible';
items.I250.flavor = '"I mean. Look at this guy. Come on."';
items.I250.quality = 'Collectible';
items.I250.collectible = 4;
items.I250.rarity = 5;

items.I246 = {}; 
items.I246.name = 'Goldfish';
items.I246.description = 'Miscellaneous - Collectible';
items.I246.flavor = '"Not what I expected but I\'ll take it."';
items.I246.quality = 'Collectible';
items.I246.collectible = 4;
items.I246.rarity = 5;
/*
items.I252 = {}; 
items.I252.name = 'Baby Blobfish';
items.I252.description = 'Miscellaneous - Collectible';
items.I252.flavor = '"It looks like it already knows the fate that awaits it."';
items.I252.quality = 'Collectible';
items.I252.collectible = 4;
items.I252.rarity = 5;
*/
//relics

items.I257 = {}; 
items.I257.name = 'Guiding Relic';
items.I257.description = 'Miscellaneous - Collectible';
items.I257.flavor = '"Ancient construct that somehow always points out in the same direction."';
items.I257.quality = 'Collectible';
items.I257.collectible = 1;
items.I257.rarity = 5;

items.I258 = {}; 
items.I258.name = 'Pointy Relic';
items.I258.description = 'Miscellaneous - Collectible';
items.I258.flavor = '"This one is just a rusty sword."';
items.I258.quality = 'Collectible';
items.I258.collectible = 1;
items.I258.rarity = 5;

items.I259 = {}; 
items.I259.name = 'Training Relic';
items.I259.description = 'Miscellaneous - Collectible';
items.I259.flavor = '"A mysterious device that can compress itself with force applied."';
items.I259.quality = 'Collectible';
items.I259.collectible = 1;
items.I259.rarity = 5;

items.I260 = {}; 
items.I260.name = 'Proteiny Relic';
items.I260.description = 'Miscellaneous - Collectible';
items.I260.flavor = '"Mythical concoction that it\'s said to enhance the muscular mass of whoever that consumes it."';
items.I260.quality = 'Collectible';
items.I260.collectible = 1;
items.I260.rarity = 5;

items.I261 = {}; 
items.I261.name = 'Safety Relic';
items.I261.description = 'Miscellaneous - Collectible';
items.I261.flavor = '"Archaic head safeguarding used to protect old earthdwellers from cave collapses."';
items.I261.quality = 'Collectible';
items.I261.collectible = 1;
items.I261.rarity = 5;

items.I262 = {}; 
items.I262.name = 'Flashy Relic';
items.I262.description = 'Miscellaneous - Collectible';
items.I262.flavor = '"An enigmatic invention that can store and channel rays of light whenever it\'s pointed at."';
items.I262.quality = 'Collectible';
items.I262.collectible = 1;
items.I262.rarity = 5;

items.I263 = {}; 
items.I263.name = 'Self-Replicating Relic';
items.I263.description = 'Miscellaneous - Collectible';
items.I263.flavor = '"A fearsome construct that can clone itself when pressed against cookie dough."';
items.I263.quality = 'Collectible';
items.I263.collectible = 1;
items.I263.rarity = 5;

items.I264 = {}; 
items.I264.name = 'Companionship Relic';
items.I264.description = 'Miscellaneous - Collectible';
items.I264.flavor = '"Despite its eerie look, it makes you feel somewhat at ease."';
items.I264.quality = 'Collectible';
items.I264.collectible = 1;
items.I264.rarity = 5;

items.I413 = {}; 
items.I413.name = 'Ancient Relic';
items.I413.description = 'Miscellaneous - Collectible';
items.I413.flavor = '"It appears to be the oldest of the relics known to the turtle."';
items.I413.quality = 'Collectible';
items.I413.collectible = 1;
items.I413.rarity = 5;

items.I414 = {}; 
items.I414.name = 'Boiling Relic';
items.I414.description = 'Miscellaneous - Collectible';
items.I414.flavor = '"Despite being millions of years old, a sweet scent of cinnamon and cumin lies inside the contraption."';
items.I414.quality = 'Collectible';
items.I414.collectible = 1;
items.I414.rarity = 5;

items.I415 = {}; 
items.I415.name = 'Rolling Relic';
items.I415.description = 'Miscellaneous - Collectible';
items.I415.flavor = '"Battle armor presumably used to quickly relocate units during war. At least thats what the turtle historians are teaching kids at school."';
items.I415.quality = 'Collectible';
items.I415.collectible = 1;
items.I415.rarity = 5;

items.I416 = {}; 
items.I416.name = 'Clairvoyant Relic';
items.I416.description = 'Miscellaneous - Collectible';
items.I416.flavor = '"A magical orb capable of seeing the future. Right now must be turned off, as all we can see is moss."';
items.I416.quality = 'Collectible';
items.I416.collectible = 1;
items.I416.rarity = 5;

//foraging

items.I265 = {}; 
items.I265.name = 'Young Grasshopper';
items.I265.description = 'Miscellaneous - Collectible';
items.I265.flavor = '"It seems like it has no patience at all."';
items.I265.quality = 'Collectible';
items.I265.collectible = 3;
items.I265.rarity = 1;

items.I266 = {}; 
items.I266.name = 'White Moth';
items.I266.description = 'Miscellaneous - Collectible';
items.I266.flavor = '"Characterized by its predominantly white wings and known for their nocturnal habits."';
items.I266.quality = 'Collectible';
items.I266.collectible = 11;
items.I266.rarity = 1;

items.I267 = {}; 
items.I267.name = 'Bee';
items.I267.description = 'Miscellaneous - Collectible';
items.I267.flavor = '"I could watch an entire movie featuring this little guy."';
items.I267.quality = 'Collectible';
items.I267.collectible = 3;
items.I267.rarity = 1;

items.I269 = {}; 
items.I269.name = 'Common Ladybug';
items.I269.description = 'Miscellaneous - Collectible';
items.I269.flavor = '"The only bug everybody seems to like."';
items.I269.quality = 'Collectible';
items.I269.collectible = 3;
items.I269.rarity = 2;

items.I268 = {}; 
items.I268.name = 'Brown Tarantula';
items.I268.description = 'Miscellaneous - Collectible';
items.I268.flavor = '"As it lacks poison, it is relatively harmless to turtles. It\'s still more harmful than not being biten by a tarantula."';
items.I268.quality = 'Collectible';
items.I268.collectible = 11;
items.I268.rarity = 2;

items.I270 = {}; 
items.I270.name = 'Purple Emperor Butterfly';
items.I270.description = 'Miscellaneous - Collectible';
items.I270.flavor = '"A striking butterfly species known for its deep purple iridescent wings."';
items.I270.quality = 'Collectible';
items.I270.collectible = 11;
items.I270.rarity = 2;

items.I271 = {}; 
items.I271.name = 'Stick Bug';
items.I271.description = 'Miscellaneous - Collectible';
items.I271.flavor = '"A bug genetically evolved to mimic a stick. Talk about setting the bar low."';
items.I271.quality = 'Collectible';
items.I271.collectible = 3;
items.I271.rarity = 3;

items.I272 = {}; 
items.I272.name = 'Hercules Beetle';
items.I272.description = 'Miscellaneous - Collectible';
items.I272.flavor = '"It can lift objects 850 times its weight. Which sounds good but on paper he weights as much as a cookie."';
items.I272.quality = 'Collectible';
items.I272.collectible = 3;
items.I272.rarity = 3;

items.I274 = {}; 
items.I274.name = 'Fire Fly';
items.I274.description = 'Miscellaneous - Collectible';
items.I274.flavor = '"You better believe your eyes."';
items.I274.quality = 'Collectible';
items.I274.collectible = 11;
items.I274.rarity = 3;

items.I277 = {}; 
items.I277.name = 'Sparkly Dragonfly';
items.I277.description = 'Miscellaneous - Collectible';
items.I277.flavor = '"Don\'t let it get close to butterflies."';
items.I277.quality = 'Collectible';
items.I277.collectible = 11;
items.I277.rarity = 4;

items.I278 = {}; 
items.I278.name = 'Flea';
items.I278.description = 'Miscellaneous - Collectible';
items.I278.flavor = '"It is small but it\'s really there."';
items.I278.quality = 'Collectible';
items.I278.collectible = 3;
items.I278.rarity = 4;

items.I276 = {}; 
items.I276.name = 'Crystal Scorpion';
items.I276.description = 'Miscellaneous - Collectible';
items.I276.flavor = '"It is very much alive despite appearing to be made out of glass."';
items.I276.quality = 'Collectible';
items.I276.collectible = 11;
items.I276.rarity = 4;

items.I273 = {}; 
items.I273.name = 'Alienithera Hypnotica';
items.I273.description = 'Miscellaneous - Collectible';
items.I273.flavor = '"A species so pretty you would wish it wasnt brainwashing you while admiring its colors."';
items.I273.quality = 'Collectible';
items.I273.collectible = 11;
items.I273.rarity = 5;

items.I275 = {}; 
items.I275.name = 'Void Stag';
items.I275.description = 'Miscellaneous - Collectible';
items.I275.flavor = '"Originary from a cursed realm called Netherlands."';
items.I275.quality = 'Collectible';
items.I275.collectible = 3;
items.I275.rarity = 5;

items.I279 = {}; 
items.I279.name = 'Uncaught TypeError';
items.I279.description = 'Miscellaneous - Collectible';
items.I279.flavor = '"I\'m never using Any ever again."';
items.I279.quality = 'Collectible';
items.I279.collectible = 11;
items.I279.rarity = 5;

// dungeon

items.I448 = {}; 
items.I448.name = 'Dungeon Floor Tile';
items.I448.description = 'Miscellaneous - Collectible';
items.I448.flavor = '"Can\'t have shoot in the dungeon."';
items.I448.quality = 'Collectible';
items.I448.collectible = 6;
items.I448.rarity = 1;

items.I450 = {}; 
items.I450.name = 'The Fatemaker';
items.I450.description = 'Miscellaneous - Collectible';
items.I450.flavor = '"For glory."';
items.I450.quality = 'Collectible';
items.I450.collectible = 6;
items.I450.rarity = 1;

items.I452 = {}; 
items.I452.name = 'Spike Death Trap';
items.I452.description = 'Miscellaneous - Collectible';
items.I452.flavor = '"You are not supposed to take that home."';
items.I452.quality = 'Collectible';
items.I452.collectible = 6;
items.I452.rarity = 2;

items.I453 = {}; 
items.I453.name = 'Motivational Dungeon Poster';
items.I453.description = 'Miscellaneous - Collectible';
items.I453.flavor = '"Just a few more pieces of gold buddy."';
items.I453.quality = 'Collectible';
items.I453.collectible = 6;
items.I453.rarity = 2;

items.I454 = {}; 
items.I454.name = 'Overlord Lich\'s Cursed Crystal';
items.I454.description = 'Miscellaneous - Collectible';
items.I454.flavor = '"They call him that but he is just Matt."';
items.I454.quality = 'Collectible';
items.I454.collectible = 6;
items.I454.rarity = 3;

items.I449 = {}; 
items.I449.name = 'Dungeon Fashion Magazine';
items.I449.description = 'Miscellaneous - Collectible';
items.I449.flavor = '"Discussing topics too hot for Rogue or the New Orc Times."';
items.I449.quality = 'Collectible';
items.I449.collectible = 6;
items.I449.rarity = 3;

items.I451 = {}; 
items.I451.name = 'Glimbo\'s Attire';
items.I451.description = 'Miscellaneous - Collectible';
items.I451.flavor = '"Now you can be Glimbo too."';
items.I451.quality = 'Collectible';
items.I451.collectible = 6;
items.I451.rarity = 4;

items.I447 = {}; 
items.I447.name = 'Mimic Plushie';
items.I447.description = 'Miscellaneous - Collectible';
items.I447.flavor = '"How cute."';
items.I447.quality = 'Collectible';
items.I447.collectible = 6;
items.I447.rarity = 5;

//steal

items.I444 = {}; 
items.I444.name = 'Mint Candy';
items.I444.description = 'Miscellaneous - Collectible';
items.I444.flavor = '"Not the greatest find."';
items.I444.quality = 'Collectible';
items.I444.collectible = 7;
items.I444.rarity = 1;

items.I439 = {}; 
items.I439.name = 'Lost Wallet';
items.I439.description = 'Miscellaneous - Collectible';
items.I439.flavor = '"Finder\'s Keeper\'s."';
items.I439.quality = 'Collectible';
items.I439.collectible = 7;
items.I439.rarity = 1;

items.I442 = {}; 
items.I442.name = 'Ancient Vase';
items.I442.description = 'Miscellaneous - Collectible';
items.I442.flavor = '"Smells old indeed."';
items.I442.quality = 'Collectible';
items.I442.collectible = 7;
items.I442.rarity = 2;

items.I440 = {}; 
items.I440.name = 'Pearl Necklace';
items.I440.description = 'Miscellaneous - Collectible';
items.I440.flavor = '"Turtles are fond of them."';
items.I440.quality = 'Collectible';
items.I440.collectible = 7;
items.I440.rarity = 2;

items.I441 = {}; 
items.I441.name = 'Jade Cat Figurine';
items.I441.description = 'Miscellaneous - Collectible';
items.I441.flavor = '"A small statue of an animal that seems loved by everyone. Not as much as tortugas, though."';
items.I441.quality = 'Collectible';
items.I441.collectible = 7;
items.I441.rarity = 3;

items.I445 = {}; 
items.I445.name = 'Paper Crane';
items.I445.description = 'Miscellaneous - Collectible';
items.I445.flavor = '"One for each year."';
items.I445.quality = 'Collectible';
items.I445.collectible = 7;
items.I445.rarity = 3;

items.I446 = {}; 
items.I446.name = 'Unsuspicious Bag';
items.I446.description = 'Miscellaneous - Collectible';
items.I446.flavor = '"You just couldn\'t had used a more discrete one."';
items.I446.quality = 'Collectible';
items.I446.collectible = 7;
items.I446.rarity = 4;

items.I443 = {}; 
items.I443.name = 'Ugly Monkey Photocopy';
items.I443.description = 'Miscellaneous - Collectible';
items.I443.flavor = '"Someone\'s going to be real mad."';
items.I443.quality = 'Collectible';
items.I443.collectible = 7;
items.I443.rarity = 5;

items.I473 = {}; 
items.I473.name = 'Strange Proposal Letter';
items.I473.description = 'Miscellaneous - Collectible';
items.I473.flavor = '"Stealing my heart? Without even taking me to Red Lobster first?"';
items.I473.quality = 'Collectible';
items.I473.collectible = 7;
items.I473.rarity = 5;

//crafting

items.I455 = {}; 
items.I455.name = 'Measuring Tape';
items.I455.description = 'Miscellaneous - Collectible';
items.I455.flavor = '"A strip of plastic used for measuring items in turtle feet, which is three thirds of a turtle tail, which in turn is a quarter of a turtle shell. I\'m sure there\'s a better way to do this."';
items.I455.quality = 'Collectible';
items.I455.collectible = 8;
items.I455.rarity = 1;

items.I462 = {}; 
items.I462.name = 'Yarn Ball';
items.I462.description = 'Miscellaneous - Collectible';
items.I462.flavor = '"A soft ball of blue yarn, used for sewing."';
items.I462.quality = 'Collectible';
items.I462.collectible = 8;
items.I462.rarity = 1;

items.I458 = {}; 
items.I458.name = 'Box of Crayons';
items.I458.description = 'Miscellaneous - Collectible';
items.I458.flavor = '"All of them are snaped in half..."';
items.I458.quality = 'Collectible';
items.I458.collectible = 8;
items.I458.rarity = 2;

items.I460 = {}; 
items.I460.name = 'Modeling Clay';
items.I460.description = 'Miscellaneous - Collectible';
items.I460.flavor = '"Technically edible, but not up your palate alley."';
items.I460.quality = 'Collectible';
items.I460.collectible = 8;
items.I460.rarity = 2;

items.I456 = {}; 
items.I456.name = 'Cubic Chest';
items.I456.description = 'Miscellaneous - Collectible';
items.I456.flavor = '"Ideal for storing crafted items."';
items.I456.quality = 'Collectible';
items.I456.collectible = 8;
items.I456.rarity = 3;

items.I461 = {}; 
items.I461.name = 'Wooden Popsicle Sticks';
items.I461.description = 'Miscellaneous - Collectible';
items.I461.flavor = '"The building blocks of architecture."';
items.I461.quality = 'Collectible';
items.I461.collectible = 8;
items.I461.rarity = 3;

items.I463 = {}; 
items.I463.name = 'Heartfelt Postal';
items.I463.description = 'Miscellaneous - Collectible';
items.I463.flavor = '"What counts is the effort behind it. And you bought this on a store."';
items.I463.quality = 'Collectible';
items.I463.collectible = 8;
items.I463.rarity = 4;

items.I459 = {}; 
items.I459.name = 'BOX of Crayons';
items.I459.description = 'Miscellaneous - Collectible';
items.I459.flavor = '"I didn\'t even knew this many colors existed in the first place."';
items.I459.quality = 'Collectible';
items.I459.collectible = 8;
items.I459.rarity = 5;

items.I457 = {}; 
items.I457.name = 'Swedish Instructions';
items.I457.description = 'Miscellaneous - Collectible';
items.I457.flavor = '"Now where did those bolts go."';
items.I457.quality = 'Collectible';
items.I457.collectible = 8;
items.I457.rarity = 5;


//drops

items.I464 = {}; 
items.I464.name = 'Bag of Lettuce';
items.I464.description = 'Miscellaneous - Collectible';
items.I464.flavor = '"Portable healthy."';
items.I464.quality = 'Collectible';
items.I464.collectible = 9;
items.I464.rarity = 5;

items.I284 = {}; 
items.I284.name = 'Plastic Turtle Toy';
items.I284.description = 'Miscellaneous - Collectible';
items.I284.flavor = '"An anatomically accurate representation of a turtle. Except being made up entirely out of cheap plastic."';
items.I284.quality = 'Collectible';
items.I284.collectible = 9;
items.I284.rarity = 5;

items.I467 = {}; 
items.I467.name = 'Stonebrook Vineyards Reserve 98';
items.I467.description = 'Miscellaneous - Collectible';
items.I467.flavor = '"Quite the rare find indeed."';
items.I467.quality = 'Collectible';
items.I467.collectible = 9;
items.I467.rarity = 5;

items.I468 = {}; 
items.I468.name = 'Pet Rock';
items.I468.description = 'Miscellaneous - Collectible';
items.I468.flavor = '"Do not feed past midnight."';
items.I468.quality = 'Collectible';
items.I468.collectible = 9;
items.I468.rarity = 5;

items.I469 = {}; 
items.I469.name = 'The Jar';
items.I469.description = 'Miscellaneous - Collectible';
items.I469.flavor = '"A totally unsuspicious and regular jar, with no association whatsoever."';
items.I469.quality = 'Collectible';
items.I469.collectible = 9;
items.I469.rarity = 5;

items.I470 = {}; 
items.I470.name = 'Blueberry Pie';
items.I470.description = 'Miscellaneous - Collectible';
items.I470.flavor = '"As dark and tasty as the abyss."';
items.I470.quality = 'Collectible';
items.I470.collectible = 9;
items.I470.rarity = 5;

items.I471 = {}; 
items.I471.name = 'The Missing Link';
items.I471.description = 'Miscellaneous - Collectible';
items.I471.flavor = '"We found it."';
items.I471.quality = 'Collectible';
items.I471.collectible = 9;
items.I471.rarity = 5;

items.I472 = {}; 
items.I472.name = 'Technologically Advanced Slab';
items.I472.description = 'Miscellaneous - Collectible';
items.I472.flavor = '"Its purpose unknown, however the fans on the side help you stay cool."';
items.I472.quality = 'Collectible';
items.I472.collectible = 9;
items.I472.rarity = 5;

//garden


items.I480 = {}; 
items.I480.name = 'Meconopsis Betonicifolia';
items.I480.description = 'Miscellaneous - Collectible';
items.I480.flavor = '"Triking blue petals with a delicate, poppy-like structure."';
items.I480.quality = 'Collectible';
items.I480.collectible = 12;
items.I480.rarity = 1;

items.I482 = {}; 
items.I482.name = 'Tagetes Erecta';
items.I482.description = 'Miscellaneous - Collectible';
items.I482.flavor = '"Often used in gardens for their bright colors and ability to repel pests."';
items.I482.quality = 'Collectible';
items.I482.collectible = 12;
items.I482.rarity = 1;

items.I478 = {}; 
items.I478.name = 'Protea Cynaroides';
items.I478.description = 'Miscellaneous - Collectible';
items.I478.flavor = '"A spiky flower with a pink head and white bracts, known for its large size."';
items.I478.quality = 'Collectible';
items.I478.collectible = 12;
items.I478.rarity = 2;

items.I479 = {}; 
items.I479.name = 'Amorphophallus Titanum';
items.I479.description = 'Miscellaneous - Collectible';
items.I479.flavor = '"Known for its enormous size and strong odor of rotting flesh."';
items.I479.quality = 'Collectible';
items.I479.collectible = 12;
items.I479.rarity = 2;

items.I475 = {}; 
items.I475.name = 'Strelitzia Reginae';
items.I475.description = 'Miscellaneous - Collectible';
items.I475.flavor = '"Sometimes called Bird of Paradise as it resembles a brightly colored tropical bird."';
items.I475.quality = 'Collectible';
items.I475.collectible = 12;
items.I475.rarity = 3;

items.I477 = {}; 
items.I477.name = 'Passiflora Edulis';
items.I477.description = 'Miscellaneous - Collectible';
items.I477.flavor = '"Intricate, exotic structure with a central corona of filaments, typically in purple, blue, or white."';
items.I477.quality = 'Collectible';
items.I477.collectible = 12;
items.I477.rarity = 3;

items.I476 = {}; 
items.I476.name = 'Lamprocapnos Spectabilis';
items.I476.description = 'Miscellaneous - Collectible';
items.I476.flavor = '"Heart-shaped pink and white petals dangle gracefully, resembling a "bleeding" heart."';
items.I476.quality = 'Collectible';
items.I476.collectible = 12;
items.I476.rarity = 4;

items.I481 = {}; 
items.I481.name = 'Floribus Chompus';
items.I481.description = 'Miscellaneous - Collectible';
items.I481.flavor = '"Right."';
items.I481.quality = 'Collectible';
items.I481.collectible = 12;
items.I481.rarity = 5;






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

items.I315 = {}; 
items.I315.name = 'Medal Case';
items.I315.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently allows the collection of medals and mastery by defeating 10K times an enemy in the Bestiary.';
items.I315.flavor = '"Monster Bestiary? These cute guys? Calling them monsters would be a farce."';
items.I315.quality = 'Upgrade';
items.I315.sell = 0;
items.I315.max = 1;
items.I315.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); unlocks.bestiary = true; unlocksReveal(); items.I315.count--; ';



items.I317 = {};
items.I317.name = 'Relic Chest';
items.I317.description = 'Consumable - Container<br><FONT COLOR="#1EFF0C">Use: Open it!<br>Contains a bunch of assorted relics.<br><FONT COLOR="coral">⚠ Keep in mind that the Mastery provided by these relics might affect the initial experience'
items.I317.flavor = '"A letter of apology is attached to the lid."';
items.I317.quality = 'Soulbound';
items.I317.sell = 1;
items.I317.max = 1;
items.I317.use = 'items.I317.count--;items.I228.count++;items.I241.count++;items.I238.count++;items.I231.count++;items.I240.count++;items.I236.count++;items.I232.count++;items.I228.count++;items.I271.count++;items.I275.count++;items.I267.count++;items.I242.count++;items.I250.count++;items.I246.count++;';

items.I318 = {};
items.I318.name = 'Stardrop Gummy';
items.I318.description = `'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Spellpower by '+ colorTag("x1.1","#E57D08")+'<br><span class="logStat">[ Current multiplier: '+colorTag("x"+(items.I318.statUp.toFixed(1)),"#E57D08")+' ]</span>'`
items.I318.flavor = '"Not an entirely astronomically correct shape."';
items.I318.quality = 'Upgrade';
items.I318.sell = 0;
items.I318.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); updateTalentUI(); items.I318.count--; items.I318.statUp+=0.1; ';
items.I318.statUp = 1;
items.I318.dynamic = true;

items.I214 = {};
items.I214.name = 'Reality Cube';
items.I214.description = `'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently grants 1 additional Wish<br><span class="logStat">[Current amount: +'+items.I214.statUp+']</span>'`
items.I214.flavor = '"I cant say I fully trust how our third dimensional plane bends around it."';
items.I214.quality = 'Upgrade';
items.I214.sell = 0;
items.I214.statUp = 0;
items.I214.use = 'playSound("audio/talent2.mp3"); rpgPlayer.talentPoints++; rpgPlayer.totalTalentPoints++; items.I214.statUp++; animParticleBurst(5 , "particleSpark", "cursor", 0); updateTalentUI(); items.I214.count--; ';
items.I214.dynamic = true;

items.I217 = {};
items.I217.name = 'Philanthropy Marble';
items.I217.description = `'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently adds +1 additional present in Mystery Presents<br><span class="logStat">[Current amount: +'+items.I217.statUp+']</span>'`
items.I217.flavor = '"Someone holds you very dearly it seems."';
items.I217.quality = 'Upgrade';
items.I217.sell = 0;
items.I217.use = 'playSound("audio/retro2.mp3"); animParticleBurst(5 , "particleSpark", "cursor", 0); updateTalentUI(); items.I217.count--; items.I217.statUp++; ';
items.I217.statUp = 0;
items.I217.dynamic = true;

items.M1 = {}; 
items.M1.name = 'Small Memo Note';
items.M1.description = 'Miscellaneous';
items.M1.flavor = '"It\'s come to this. I\'m recording this as proof of how far I\'ve fallen. I... I had to steal from a slug. A slug, of all things. I saw it crawling in the garden, and there it was—  If anyone ever hears this, know that I was desperate. Really desperate."';
items.M1.quality = 'Poor';
items.M1.sell = 1;
items.M1.max = 1;

items.M2 = {}; 
items.M2.name = 'Small Memo Note';
items.M2.description = 'Miscellaneous';
items.M2.flavor = '"Unearthed the fabled hammer today. Odd thing, it squeaks with every touch. The old tales hint that only a person with a certain... \'squeak\' to their name can wield it. Looks like I\'ll need to keep moving on."';
items.M2.quality = 'Poor';
items.M2.sell = 1;
items.M2.max = 1;

items.M3 = {}; 
items.M3.name = 'Small Memo Note';
items.M3.description = 'Miscellaneous';
items.M3.flavor = '"The ice here is thicker than I expected. Gonna try my luck fishing today—seems like the penguins are pretty curious about what I\'m up to. If I can catch something, it\’ll be a nice change from all these sardines."';
items.M3.quality = 'Poor';
items.M3.sell = 1;
items.M3.max = 1;

items.M4 = {}; 
items.M4.name = 'Small Memo Note';
items.M4.description = 'Miscellaneous';
items.M4.flavor = '"Their native guardian? Oh, the elephant. Well, as with all spirits, it\'s susceptible to purifying elements. Using these elements seems to ease its presence, though it\'s not a lasting solution. More updates to come as we gather more information."';
items.M4.quality = 'Poor';
items.M4.sell = 1;
items.M4.max = 1;

items.M5 = {}; 
items.M5.name = 'Small Memo Note';
items.M5.description = 'Miscellaneous';
items.M5.flavor = '"The presents... they aren\'t what they seem. Found out the hard way when I gave one to her. Radio was on, playing some old jazz... and then the trumpet hit. The thing shrieked and morphed right there. So, whatever you do, keep a radio nearby, and for the love of all that\'s holy, if you hear a trumpet, stay alert. It hates the sound. Could save your life."';
items.M5.quality = 'Poor';
items.M5.sell = 1;
items.M5.max = 1;


/*
items.M3 = {}; 
items.M3.name = 'Small Memo Note';
items.M3.description = 'Miscellaneous';
items.M3.flavor = '"They are laughing at me. I know it. Everyone is doing so behind my back. But I will be the one laughing when I get to find treasure in the middle of all this fishing junk, even if I dont have many fishing gear on me..."';
items.M3.quality = 'Poor';
items.M3.sell = 1;
items.M3.max = 1;
*/

items.I483 = {};
items.I483.name = 'Nature-Infused Tech';
items.I483.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Research this on your Garrison to gain Nature Glitterstones'
items.I483.flavor = '"You feel like you could learn a thing or two by analysing this."';
items.I483.quality = 'Rare';
items.I483.sell = 20000;
items.I483.use = 'renewableResearch("I483", "RO1")';

items.I484 = {};
items.I484.name = 'Might-Infused Tech';
items.I484.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Research this on your Garrison to gain Might Glitterstones'
items.I484.flavor = '"You feel like you could learn a thing or two by analysing this."';
items.I484.quality = 'Rare';
items.I484.sell = 20000;
items.I484.use = 'renewableResearch("I484", "RO2")';

items.I485 = {};
items.I485.name = 'Elemental-Infused Tech';
items.I485.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Research this on your Garrison to gain Elemental Glitterstones'
items.I485.flavor = '"You feel like you could learn a thing or two by analysing this."';
items.I485.quality = 'Rare';
items.I485.sell = 20000;
items.I485.use = 'renewableResearch("I485", "RO3")';

items.I486 = {};
items.I486.name = 'Occult-Infused Tech';
items.I486.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Research this on your Garrison to gain Occult Glitterstones'
items.I486.flavor = '"You feel like you could learn a thing or two by analysing this."';
items.I486.quality = 'Rare';
items.I486.sell = 20000;
items.I486.use = 'renewableResearch("I486", "RO4")';

items.I487 = {};
items.I487.name = 'Deific-Infused Tech';
items.I487.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Research this on your Garrison to gain Deific Glitterstones'
items.I487.flavor = '"You feel like you could learn a thing or two by analysing this."';
items.I487.quality = 'Rare';
items.I487.sell = 20000;
items.I487.use = 'renewableResearch("I487", "RO5")';

items.I496 = {};
items.I496.name = 'Botanical-Infused Tech';
items.I496.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Research this on your Garrison to gain Bloom Tokens'
items.I496.flavor = '"You feel like you could learn a thing or two by analysing this."';
items.I496.quality = 'Rare';
items.I496.sell = 20000;
items.I496.use = 'renewableResearch("I496", "RO6")';

items.I492 = {};
items.I492.name = 'The Box';
items.I492.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Research this on your Garrison to know whats inside'
items.I492.flavor = '"You feel like you could learn a thing or two by analysing this."';
items.I492.quality = 'Rare';
items.I492.sell = 0;
items.I492.use = 'renewableResearch("I492", "R6")';

items.BR2 = {};
items.BR2.name = 'Blueprint: Lumberjack Post';
items.BR2.description = 'Consumable - Blueprint<br><FONT COLOR="#1EFF0C">Use: Unlocks the research of the Lumberjack Post on your Garrison';
items.BR2.flavor = '"A good plan today is better than a perfect plan tomorrow."';
items.BR2.quality = 'Epic';
items.BR2.sell = 0;
items.BR2.max = 1;
items.BR2.use = 'renewableResearch("BR2", "R1")';

items.I180 = {};
items.I180.name = 'Blueprint';
items.I180.description = '';
items.I180.flavor = '';
items.I180.quality = 'Epic';
items.I180.sell = 0;
items.I180.max = 1;


function renewableResearch(item,id){

if (unlocks.garrison){

if (!research[id].unlocked){

  playSound("audio/retro2.mp3");
  animParticleBurst(5 , "particleSpark", "cursor", 0);
  research[id].unlocked = true
  items[item].count--;
  createResearch();
  addItem();


} else createPopup('&#10060; You are already researching this!', '#913c3c')

} else{
  createPopup('&#10060; Garrison not unlocked!', '#913c3c')
}


}

items.REA2 = {};
items.REA2.name = 'Recipe: Fossil Club';
items.REA2.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Fossil Club';
items.REA2.flavor = '"The true method of knowledge is experiment."';
items.REA2.quality = 'Uncommon';
items.REA2.sell = 0;
items.REA2.max = 1;

items.REA3 = {};
items.REA3.name = 'Recipe: Dark Bidding Ring';
items.REA3.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Dark Bidding Ring';
items.REA3.flavor = '"The true method of knowledge is experiment."';
items.REA3.quality = 'Uncommon';
items.REA3.sell = 0;
items.REA3.max = 1;

items.REK4 = {};
items.REK4.name = 'Recipe: Novice Master Key';
items.REK4.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Novice Master Key';
items.REK4.flavor = '"The true method of knowledge is experiment."';
items.REK4.quality = 'Uncommon';
items.REK4.sell = 0;
items.REK4.max = 1;

items.REK3 = {};
items.REK3.name = 'Recipe: Verdant Key';
items.REK3.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Verdant Key';
items.REK3.flavor = '"The true method of knowledge is experiment."';
items.REK3.quality = 'Uncommon';
items.REK3.sell = 0;
items.REK3.max = 1;

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

items.RAA4 = {};
items.RAA4.name = 'Recipe: Greater Intellect Flask';
items.RAA4.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Greater Intellect Flask';
items.RAA4.flavor = '"The true method of knowledge is experiment."';
items.RAA4.quality = 'Uncommon';
items.RAA4.sell = 0;
items.RAA4.max = 1;

items.RAT2 = {};
items.RAT2.name = 'Recipe: Mighty Tincture';
items.RAT2.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Mighty Tincture';
items.RAT2.flavor = '"The true method of knowledge is experiment."';
items.RAT2.quality = 'Uncommon';
items.RAT2.sell = 0;
items.RAT2.max = 1;

items.RAT3 = {};
items.RAT3.name = 'Recipe: Natural Tincture';
items.RAT3.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Nature Tincture';
items.RAT3.flavor = '"The true method of knowledge is experiment."';
items.RAT3.quality = 'Uncommon';
items.RAT3.sell = 0;
items.RAT3.max = 1;

items.RAT4A = {};
items.RAT4A.name = 'Recipe: Swiftwork Tincture';
items.RAT4A.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Swiftwork Tincture';
items.RAT4A.flavor = '"The true method of knowledge is experiment."';
items.RAT4A.quality = 'Uncommon';
items.RAT4A.sell = 0;
items.RAT4A.max = 1;

items.RAT6 = {};
items.RAT6.name = 'Recipe: Divine Tincture';
items.RAT6.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Divine Tincture';
items.RAT6.flavor = '"The true method of knowledge is experiment."';
items.RAT6.quality = 'Uncommon';
items.RAT6.sell = 0;
items.RAT6.max = 1;

items.RAT7 = {};
items.RAT7.name = 'Recipe: Sinister Tincture';
items.RAT7.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Sinister Tincture';
items.RAT7.flavor = '"The true method of knowledge is experiment."';
items.RAT7.quality = 'Uncommon';
items.RAT7.sell = 0;
items.RAT7.max = 1;

items.RAT10 = {};
items.RAT10.name = 'Recipe: Manastorm Tincture';
items.RAT10.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Manastorm Tincture';
items.RAT10.flavor = '"The true method of knowledge is experiment."';
items.RAT10.quality = 'Uncommon';
items.RAT10.sell = 0;
items.RAT10.max = 1;

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
items.RAN6.name = 'Recipe: Elemental Flask';
items.RAN6.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Elemental Flask';
items.RAN6.flavor = '"The true method of knowledge is experiment."';
items.RAN6.quality = 'Uncommon';
items.RAN6.sell = 0;
items.RAN6.max = 1;

items.RAN7 = {};
items.RAN7.name = 'Recipe: Deific Flask';
items.RAN7.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Deific Flask';
items.RAN7.flavor = '"The true method of knowledge is experiment."';
items.RAN7.quality = 'Uncommon';
items.RAN7.sell = 0;
items.RAN7.max = 1;

items.RAN8 = {};
items.RAN8.name = 'Recipe: Occult Flask';
items.RAN8.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew a Occult Flask';
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

items.RAS1 = {};
items.RAS1.name = 'DEPRECATED';
items.RAS1.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Spider Dream Shard';
items.RAS1.flavor = '"The true method of knowledge is experiment."';
items.RAS1.quality = 'Uncommon';
items.RAS1.sell = 0;
items.RAS1.max = 1;

items.REM1 = {};
items.REM1.name = 'Recipe: Spider Dream Shard';
items.REM1.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Spider Dream Shard';
items.REM1.flavor = '"The true method of knowledge is experiment."';
items.REM1.quality = 'Uncommon';
items.REM1.sell = 0;
items.REM1.max = 1;

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

items.I289 = {};
items.I289.name = 'Conqueror of 0.3 Medal';
items.I289.description = 'Miscellaneous<br><FONT COLOR="#bb83de">A commemorative badge acrediting that the owner completed the 0.3 update';
items.I289.flavor = '"A winner is you!"';
items.I289.quality = 'Soulbound';
items.I289.sell = 1;
items.I289.max = 1;

items.I497 = {};
items.I497.name = 'Conqueror of 0.4 Medal';
items.I497.description = 'Miscellaneous<br><FONT COLOR="#bb83de">A commemorative badge acrediting that the owner completed the 0.4 update<br><FONT COLOR="coral">⚠ The method of obtention of this item will permanently be removed in the future';
items.I497.flavor = '"A winner is you!"';
items.I497.quality = 'Soulbound';
items.I497.sell = 1;
items.I497.max = 1;

Object.keys(items).forEach(function(key) {
  items[key].id = key;
  items[key].locked = false;
  items[key].favorited = false;
  items[key].count = 0;
  items[key].level = 0;
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

  if (items[key].quality=='Collectible') {items[key].max = 1; items[key].sell = 0; }


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

buffs.B4 = {};
buffs.B4.name = 'Nature Flask';
buffs.B4.description = '<FONT COLOR="#8fbaff">Nature Bonus increased by 100%';
buffs.B4.player = true;
buffs.B4.effect = 'buffEffect(1, "B4")';
buffs.B4.buff = true;
buffs.B4.tag = 'potion';
buffs.B4.img = 'img/src/items/I49.jpg';

buffs.B5 = {};
buffs.B5.name = 'Might Flask';
buffs.B5.description = '<FONT COLOR="#8fbaff">Might Bonus increased by 100%';
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
buffs.B7.name = 'Haste Flask';
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
buffs.B9.description = '<FONT COLOR="#8fbaff">EXP Bonus increased by 100%';
buffs.B9.player = true;
buffs.B9.effect = 'buffEffect(1, "B9")';
buffs.B9.buff = true;
buffs.B9.img = 'img/src/items/I97.jpg';

buffs.B10 = {};
buffs.B10.name = 'Friendly Cat Token';
buffs.B10.description = '<FONT COLOR="#8fbaff">EXP Bonus increased by 100%';
buffs.B10.player = true;
buffs.B10.effect = 'buffEffect(1, "B10")';
buffs.B10.buff = true;
buffs.B10.img = 'img/src/items/I98.jpg';

buffs.B11 = {};
buffs.B11.name = 'Angry Cat Token';
buffs.B11.description = '<FONT COLOR="#8fbaff">Drop Bonus increased by 300%';
buffs.B11.player = true;
buffs.B11.effect = 'buffEffect(3, "B11")';
buffs.B11.buff = true;
buffs.B11.img = 'img/src/items/I99.jpg';

buffs.B12 = {};
buffs.B12.name = 'Hearty Tincture';
buffs.B12.description = `'<FONT COLOR="#8fbaff">Max Health increased by'+ colorTag("x1.2","#E57D08")`;
buffs.B12.effect = 'buffEffect(0.2, "B12")';
buffs.B12.player = true;
buffs.B12.buff = true;
buffs.B12.tag = 'food';
buffs.B12.img = 'img/src/items/I54.jpg';
buffs.B12.dynamic = true;

buffs.B13 = {};
buffs.B13.name = 'Mighty Tincture';
buffs.B13.description = `'<FONT COLOR="#8fbaff">Might Bonus increased by '+beautify(50 * (1+talent.TA32.statUp))+'%'`;
buffs.B13.effect = 'buffEffect(0.5*(1+talent.TA32.statUp), "B13")';
buffs.B13.player = true;
buffs.B13.buff = true;
buffs.B13.tag = 'food';
buffs.B13.img = 'img/src/items/I52.jpg';
buffs.B13.dynamic = true;

buffs.B14 = {};
buffs.B14.name = 'Fish Bait';
buffs.B14.description = '<FONT COLOR="#8fbaff">Fishing Level increased by 1';
buffs.B14.effect = 'buffEffect(1, "B14")';
buffs.B14.player = true;
buffs.B14.buff = true;
buffs.B14.img = 'img/src/items/I181.jpg';
buffs.B14.tag = 'bait';

buffs.B15 = {};
buffs.B15.name = 'Nature Tincture';
buffs.B15.description = `'<FONT COLOR="#8fbaff">Nature Damage increased by '+beautify(50 * (1+talent.TA32.statUp))+'%'`;
buffs.B15.effect = 'buffEffect(0.5*(1+talent.TA32.statUp), "B15")';
buffs.B15.player = true;
buffs.B15.buff = true;
buffs.B15.tag = 'food';
buffs.B15.img = 'img/src/items/I110.jpg';
buffs.B15.dynamic = true;

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
//buffs.B17.attackChance = 'castMoonSlash()';
buffs.B17.img = 'img/src/items/I27.jpg';

buffs.B18 = {};
buffs.B18.name = 'Serizawa Festival';
buffs.B18.description = '<FONT COLOR="#8fbaff">Increased Deific Bonus by 120%';
buffs.B18.effect = 'buffEffect(1.2, "B18")';
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
buffs.B20.name = 'Dark Harvest';
buffs.B20.description = '<FONT COLOR="#8fbaff">Occult Damage increased by 50%';
buffs.B20.effect = 'buffEffect(0.5, "B20")';
buffs.B20.player = true;
buffs.B20.buff = true;
buffs.B20.img = 'img/src/items/I64.jpg';

buffs.B20A = {};
buffs.B20A.name = 'Dark Harvest InvisResist';
buffs.B20A.description = '<FONT COLOR="#8fbaff">Occult Damage increased by 50%';
buffs.B20A.effect = 'buffEffect(0.5, "B20A")';
buffs.B20A.player = true;
buffs.B20A.buff = true;
buffs.B20A.img = 'img/src/items/I64.jpg';
buffs.B20A.invisible = true;

buffs.B20B = {};
buffs.B20B.name = 'Warbanner invis';
buffs.B20B.description = '<FONT COLOR="#8fbaff">+50% str';
buffs.B20B.effect = 'buffEffect(0.5, "B20B")';
buffs.B20B.player = true;
buffs.B20B.buff = true;
buffs.B20B.img = 'img/src/items/I64.jpg';
buffs.B20B.invisible = true;

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
buffs.B23.description = '<FONT COLOR="#8fbaff">EXP Bonus increased by 1000%';
buffs.B23.effect = 'buffEffect(10, "B23")';
buffs.B23.turtle = true;
buffs.B23.buff = true;
buffs.B23.img = 'img/src/buffs/B3.jpg';

buffs.B24 = {};
buffs.B24.name = 'Drop Boost';
buffs.B24.description = '<FONT COLOR="#8fbaff">Drop Bonus increased by 1000%';
buffs.B24.effect = 'buffEffect(10, "B24")';
buffs.B24.turtle = true;
buffs.B24.buff = true;
buffs.B24.img = 'img/src/buffs/B4.jpg';

buffs.B25 = {};
buffs.B25.name = 'Click Boost';
buffs.B25.description = '<FONT COLOR="#8fbaff">Clicking Power increased by'+ colorTag("x2","#E57D08");
buffs.B25.effect = 'buffEffect(2, "B25")';
buffs.B25.turtle = true;
buffs.B25.buff = true;
buffs.B25.img = 'img/src/buffs/B5.jpg';

buffs.B26 = {};
buffs.B26.name = 'Click Super Boost';
buffs.B26.description = '<FONT COLOR="#8fbaff">Clicking Power increased by'+ colorTag("x4!","#E57D08");
buffs.B26.effect = 'buffEffect(4, "B26")';
buffs.B26.turtle = true;
buffs.B26.buff = true;
buffs.B26.img = 'img/src/buffs/B6.jpg';

buffs.B27 = {};
buffs.B27.name = 'Pat Boost';
buffs.B27.description = '<FONT COLOR="#8fbaff">Pat interval decreased!';
buffs.B27.effect = 'buffEffect(1, "B27")';
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
buffs.B29.name = 'Bountiful Tincture';
buffs.B29.description = `'<FONT COLOR="#8fbaff">Drop Rate increased by '+beautify(70 * (1+talent.TA32.statUp))+'%'`;
buffs.B29.effect = 'buffEffect(0.7*(1+talent.TA32.statUp), "B29")';
buffs.B29.player = true;
buffs.B29.buff = true;
buffs.B29.tag = 'food';
buffs.B29.img = 'img/src/items/I129.jpg';
buffs.B29.dynamic = true;

buffs.B30 = {};
buffs.B30.name = 'Elemental Flask';
buffs.B30.description = '<FONT COLOR="#8fbaff">Elemental Damage increased by 100%';
buffs.B30.player = true;
buffs.B30.effect = 'buffEffect(1, "B30")';
buffs.B30.buff = true;
buffs.B30.tag = 'potion';
buffs.B30.img = 'img/src/items/I154.jpg';

buffs.B31 = {};
buffs.B31.name = 'Deific Flask';
buffs.B31.description = '<FONT COLOR="#8fbaff">Deific Damage increased by 100%';
buffs.B31.player = true;
buffs.B31.effect = 'buffEffect(1, "B31")';
buffs.B31.buff = true;
buffs.B31.tag = 'potion';
buffs.B31.img = 'img/src/items/I155.jpg';

buffs.B32 = {};
buffs.B32.name = 'Occult Flask';
buffs.B32.description = '<FONT COLOR="#8fbaff">Occult Damage increased by 100%';
buffs.B32.player = true;
buffs.B32.effect = 'buffEffect(1, "B32")';
buffs.B32.buff = true;
buffs.B32.tag = 'potion';
buffs.B32.img = 'img/src/items/I156.jpg';

buffs.B33 = {};
buffs.B33.name = 'Soulburn';
buffs.B33.description = '<FONT COLOR="#8fbaff">Your very soul is shattering away...';
buffs.B33.effect = 'buffEffect(buffs.B33.stacks * (playerWeaponDamage*0.1), "B33")';
buffs.B33.img = 'img/src/items/I18.jpg';
buffs.B33.stacks = 0;

buffs.B34 = {};
buffs.B34.name = 'Antidoted';
buffs.B34.description = '<FONT COLOR="#8fbaff">Prevents the Poison debuff';
buffs.B34.effect = '';
buffs.B34.img = 'img/src/items/I176.jpg';
buffs.B34.player = true;
buffs.B34.buff = true;

buffs.B35 = {};
buffs.B35.name = 'EXP Voucher';
buffs.B35.description = '<FONT COLOR="#8fbaff">EXP Bonus increased by 100%';
buffs.B35.effect = 'buffEffect(1, "B35")';
buffs.B35.player = true;
buffs.B35.buff = true;
buffs.B35.img = 'img/src/items/I177.jpg';

buffs.B36 = {};
buffs.B36.name = 'Drop Voucher';
buffs.B36.description = '<FONT COLOR="#8fbaff">Drop Bonus increased by 300%';
buffs.B36.effect = 'buffEffect(3, "B36")';
buffs.B36.player = true;
buffs.B36.buff = true;
buffs.B36.img = 'img/src/items/I178.jpg';

buffs.B37 = {};
buffs.B37.name = 'Swiftwork Tincture';
buffs.B37.description = '<FONT COLOR="#8fbaff">Gathering Level increased by +1';
buffs.B37.effect = 'buffEffect(1, "B37")';
buffs.B37.player = true;
buffs.B37.buff = true;
buffs.B37.img = 'img/src/items/I185.jpg';
buffs.B37.tag = 'food';

buffs.B38 = {};
buffs.B38.name = 'Divine Tincture';
buffs.B38.description = `'<FONT COLOR="#8fbaff">Deific Damage increased by '+beautify(50 * (1+talent.TA32.statUp))+'%'`;
buffs.B38.effect = 'buffEffect(0.5*(1+talent.TA32.statUp), "B38")';
buffs.B38.player = true;
buffs.B38.buff = true;
buffs.B38.tag = 'food';
buffs.B38.img = 'img/src/items/I186.jpg';
buffs.B38.dynamic = true;

buffs.B39 = {};
buffs.B39.name = 'Firetank Pyrocombulator';
buffs.B39.description = '<FONT COLOR="#8fbaff">Your attacks deal additional Elemental Damage';
buffs.B39.effect = '';
buffs.B39.player = true;
buffs.B39.buff = true;
buffs.B39.img = 'img/src/items/I187.jpg';
buffs.B39.attackChance = 'enemyElementalDamage(playerWeaponDamage*0.2)';

buffs.B40 = {};
buffs.B40.name = 'Elemental Tincture';
buffs.B40.description = `'<FONT COLOR="#8fbaff">Elemental Damage increased by '+beautify(50 * (1+talent.TA32.statUp))+'%'`;
buffs.B40.effect = 'buffEffect(0.5*(1+talent.TA32.statUp), "B40")';
buffs.B40.player = true;
buffs.B40.buff = true;
buffs.B40.tag = 'food';
buffs.B40.img = 'img/src/items/I188.jpg';
buffs.B40.dynamic = true;

buffs.B41 = {};
buffs.B41.name = 'Sinister Tincture';
buffs.B41.description = `'<FONT COLOR="#8fbaff">Occult Damage increased by '+beautify(50 * (1+talent.TA32.statUp))+'%'`;
buffs.B41.effect = 'buffEffect(0.5*(1+talent.TA32.statUp), "B41")';
buffs.B41.player = true;
buffs.B41.buff = true;
buffs.B41.tag = 'food';
buffs.B41.img = 'img/src/items/I189.jpg';
buffs.B41.dynamic = true;

buffs.B42 = {};
buffs.B42.name = 'Toxic Booze';
buffs.B42.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B42.player = true;
buffs.B42.effect = 'buffEffect(200000, "B42")';
buffs.B42.img = 'img/src/buffs/B9.jpg';
buffs.B42.cleansable = true;

buffs.B43 = {};
buffs.B43.name = 'Bunny Inferno';
buffs.B43.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B43.effect = 'buffEffect(playerWeaponDamage*0.5, "B43")';
buffs.B43.img = 'img/src/buffs/B10.jpg';

buffs.B44 = {};
buffs.B44.name = 'Polymorphed';
buffs.B44.description = '<FONT COLOR="#8fbaff">Unable to move';
buffs.B44.effect = '';
buffs.B44.img = 'img/src/buffs/B11.jpg';
buffs.B44.tag = "clear"

buffs.B45 = {};
buffs.B45.name = 'Strength Roll';
buffs.B45.description = '<FONT COLOR="#8fbaff">Strength increased by 60%';
buffs.B45.effect = 'buffEffect(0.6, "B45")';
buffs.B45.img = 'img/src/buffs/B12.jpg';
buffs.B45.player = true;
buffs.B45.buff = true;

buffs.B46 = {};
buffs.B46.name = 'Spellpower Roll';
buffs.B46.description = '<FONT COLOR="#8fbaff">Spellpower increased by 60%';
buffs.B46.effect = 'buffEffect(0.6, "B46")';
buffs.B46.img = 'img/src/buffs/B14.jpg';
buffs.B46.player = true;
buffs.B46.buff = true;

buffs.B47 = {};
buffs.B47.name = 'Haste Roll';
buffs.B47.description = '<FONT COLOR="#8fbaff">Attack Speed increased by 50%';
buffs.B47.player = true;
buffs.B47.effect = 'buffEffect(0.5, "B47")';
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

buffs.B52 = {};
buffs.B52.name = 'Perish Song';
buffs.B52.description = '<FONT COLOR="coral">You\'ve met with a terrible fate, haven\'t you?';
buffs.B52.effect = '';
buffs.B52.img = 'img/src/talents/TI2B.jpg';

buffs.B53 = {};
buffs.B53.name = 'Song of Heal';
buffs.B53.description = '<FONT COLOR="#8fbaff">Regenerating Health';
buffs.B53.player = true;
buffs.B53.effect = 'buffEffect(playerMaxHp/20, "B53")';
buffs.B53.buff = true;
buffs.B53.img = 'img/src/talents/TI3B.jpg';

buffs.B55 = {};
buffs.B55.name = 'Wood-Carved Gamba';
buffs.B55.description = '<FONT COLOR="#8fbaff">Drop Bonus increased by 100%';
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

buffs.B61 = {};
buffs.B61.name = 'Sea Chanty';
buffs.B61.description = '<FONT COLOR="#8fbaff">Strength increased by 20%';
buffs.B61.effect = 'buffEffect(0.2, "B61")';
buffs.B61.img = 'img/src/buffs/B18.jpg';
buffs.B61.player = true;
buffs.B61.buff = true;

buffs.B62 = {};
buffs.B62.name = 'Sea Chanty';
buffs.B62.description = '<FONT COLOR="#8fbaff">Spellpower increased by 20%';
buffs.B62.effect = 'buffEffect(0.2, "B62")';
buffs.B62.img = 'img/src/buffs/B18.jpg';
buffs.B62.player = true;
buffs.B62.buff = true;

buffs.B63 = {};
buffs.B63.name = 'Sea Chanty';
buffs.B63.description = '<FONT COLOR="#8fbaff">Occult Bonus increased by 20%';
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

buffs.B65 = {};
buffs.B65.name = 'Spiritron Break';
buffs.B65.description = '<FONT COLOR="#8fbaff">Losing life';
buffs.B65.effect = 'buffEffect(playerWeaponDamage*0.5, "B65")';
buffs.B65.img = 'img/src/buffs/B19.jpg';

buffs.B66 = {};
buffs.B66.name = 'Evocation';
buffs.B66.description = '<FONT COLOR="#8fbaff">Restoring Magic';
buffs.B66.effect = 'buffEffect((playerMaxMana*0.6)/15, "B66")';
buffs.B66.img = 'img/src/talents/TA1B1.jpg';
buffs.B66.player = true;
buffs.B66.buff = true;

buffs.B67 = {};
buffs.B67.name = 'Conjured Caltrops';
buffs.B67.description = '<FONT COLOR="#8fbaff">Dealing damage on spawn';
buffs.B67.effect = '';
buffs.B67.img = 'img/src/talents/TA1D2.jpg';

buffs.B51 = {};
buffs.B51.name = 'Rhythm Hell';
buffs.B51.description = '<FONT COLOR="#8fbaff">Click on the enemy circles!';
buffs.B51.effect = '';
buffs.B51.img = 'img/src/talents/TI2.jpg';
buffs.B51.player = true;
buffs.B51.buff = true;

buffs.B69 = {};
buffs.B69.name = 'Workforce Poem';
buffs.B69.description = '<FONT COLOR="#8fbaff">Gathering and Fishing Level increased by +1';
buffs.B69.effect = 'buffEffect(1, "B69")';
buffs.B69.player = true;
buffs.B69.buff = true;
buffs.B69.img = 'img/src/talents/TI3D.jpg';

buffs.B70 = {};
buffs.B70.name = 'Stirring Sands';
buffs.B70.description = `'<FONT COLOR="#8fbaff">Spellpower increased by 40%'`;
buffs.B70.effect = 'buffEffect(0.4, "B70")';
buffs.B70.img = 'img/src/items/I168.jpg';
buffs.B70.player = true;
buffs.B70.buff = true;
buffs.B70.dynamic = true;

buffs.B71 = {};
buffs.B71.name = 'Suspicious Mushroom';
buffs.B71.description = '<FONT COLOR="#8fbaff">Touch fuzzy, get dizzy';
buffs.B71.effect = 'buffEffect(1, "B71")';
buffs.B71.img = 'img/src/items/I380.jpg';
buffs.B71.player = true;
buffs.B71.haste = true;

buffs.B72 = {};
buffs.B72.name = 'Suspicious Mushroom';
buffs.B72.description = '<FONT COLOR="#8fbaff">Touch dizzy, get fuzzy';
buffs.B72.effect = 'buffEffect(-0.9, "B72")';
buffs.B72.img = 'img/src/items/I380.jpg';
buffs.B72.player = true;
buffs.B72.haste = true;

buffs.B57 = {};
buffs.B57.name = 'Venom';
buffs.B57.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B57.player = true;
buffs.B57.effect = 'buffEffect(playerMaxHp/20, "B57")';
buffs.B57.img = 'img/src/buffs/B9.jpg';
buffs.B57.cleansable = true;

buffs.B87 = {};
buffs.B87.name = 'Prismatic Shield';
buffs.B87.description = '<FONT COLOR="#8fbaff">Increase attack after receiving Nature Damage';
buffs.B87.effect = '';
buffs.B87.img = 'img/src/buffs/B37.jpg';
buffs.B87.tag = 'clear';
buffs.B87.stacks = 0;

buffs.B88 = {};
buffs.B88.name = 'Hunting Prowess';
buffs.B88.description = `'<FONT COLOR="#8fbaff">Omni increased by '+1*buffs.B88.stacks+'%'`;
buffs.B88.effect = 'buffEffect(buffs.B88.stacks*0.01, "B88")';
buffs.B88.img = 'img/src/items/I330.jpg';
buffs.B88.player = true;
buffs.B88.buff = true;
buffs.B88.stacks = 0;
buffs.B88.dynamic = true;

buffs.B91 = {};
buffs.B91.name = 'Darkmoon Seal';
buffs.B91.description = '<FONT COLOR="#8fbaff">Losing Life<br><FONT COLOR="coral">[Cant be Removed]';
buffs.B91.player = true;
buffs.B91.effect = 'buffEffect(playerMaxHp/20, "B91")';
buffs.B91.img = 'img/src/buffs/B40.jpg';

buffs.B92 = {};
buffs.B92.name = 'Sanity';
buffs.B92.description = '<FONT COLOR="#8fbaff">Rapidly losing Health at 0 Stacks<br><FONT COLOR="coral">[Cant be Removed]';
buffs.B92.effect = '';
buffs.B92.player = true;
buffs.B92.img = 'img/src/buffs/B41.jpg';
buffs.B92.tag = 'clear';
buffs.B92.stacks = 0;

buffs.B93 = {};
buffs.B93.name = 'Mindfly';
buffs.B93.description = '<FONT COLOR="#8fbaff">Sanity drain with each attack until attacked with Deific Damage<br><FONT COLOR="coral">[Cant be Removed]';
buffs.B93.effect = '';
buffs.B93.img = 'img/src/buffs/B42.jpg';
buffs.B93.tag = 'clear';

buffs.B94 = {};
buffs.B94.name = 'Star Of Destruction';
buffs.B94.description = `'<FONT COLOR="#8fbaff">Occult Bonus increased by '+10*buffs.B94.stacks+'%'`;
buffs.B94.effect = 'buffEffect(10*buffs.B94.stacks*0.01, "B94")';
buffs.B94.img = 'img/src/items/I325.jpg';
buffs.B94.player = true;
buffs.B94.buff = true;
buffs.B94.stacks = 0;
buffs.B94.dynamic = true;

buffs.B96 = {};
buffs.B96.name = 'Holybringer Seal';
buffs.B96.description = '<FONT COLOR="#8fbaff">Losing Life<br><FONT COLOR="coral">[Cant be Removed]';
buffs.B96.player = true;
buffs.B96.effect = 'buffEffect(playerMaxHp/100, "B96")';
buffs.B96.img = 'img/src/buffs/B43.jpg';

buffs.B97 = {};
buffs.B97.name = 'Prismatic Will';
buffs.B97.description = '<FONT COLOR="#8fbaff">Increase attack after receiving damage other than Might Damage';
buffs.B97.effect = '';
buffs.B97.img = 'img/src/buffs/B37.jpg';
buffs.B97.tag = 'clear';
buffs.B97.stacks = 0;

buffs.B98 = {};
buffs.B98.name = 'Power Flask';
buffs.B98.description = '<FONT COLOR="#8fbaff">Strength increased by 100%';
buffs.B98.player = true;
buffs.B98.effect = 'buffEffect(1, "B98")';
buffs.B98.buff = true;
buffs.B98.tag = 'potion';
buffs.B98.img = 'img/src/items/I363.jpg';

buffs.B99 = {};
buffs.B99.name = 'Intellect Flask';
buffs.B99.description = '<FONT COLOR="#8fbaff">Spellpower increased by 100%';
buffs.B99.player = true;
buffs.B99.effect = 'buffEffect(1, "B99")';
buffs.B99.buff = true;
buffs.B99.tag = 'potion';
buffs.B99.img = 'img/src/items/I364.jpg';

buffs.B100 = {};
buffs.B100.name = 'Shadowbolt Tincture';
buffs.B100.description = `<FONT COLOR="#8fbaff">Attacks fire off a Shadow Bolt`;
buffs.B100.player = true;
buffs.B100.buff = true;
buffs.B100.tag = 'food';
buffs.B100.img = 'img/src/items/I368.jpg';

buffs.B101 = {};
buffs.B101.name = 'Brilliance Tincture';
buffs.B101.description = `'<FONT COLOR="#8fbaff">EXP Bonus increased by '+beautify(30 * (1+talent.TA32.statUp))+'%'`;
buffs.B101.effect = 'buffEffect(0.3*(1+talent.TA32.statUp), "B101")';
buffs.B101.player = true;
buffs.B101.buff = true;
buffs.B101.tag = 'food';
buffs.B101.img = 'img/src/items/I367.jpg';
buffs.B101.dynamic = true;

buffs.B102 = {};
buffs.B102.name = 'Might Crown';
buffs.B102.description = '<FONT COLOR="#8fbaff">Use Might Damage to dispel it';
buffs.B102.effect = '';
buffs.B102.img = 'img/src/icons/might.png';
buffs.B102.tag = 'clear';

buffs.B103 = {};
buffs.B103.name = 'Nature Crown';
buffs.B103.description = '<FONT COLOR="#8fbaff">Use Nature Damage to dispel it';
buffs.B103.effect = '';
buffs.B103.img = 'img/src/icons/nature.png';
buffs.B103.tag = 'clear';

buffs.B104 = {};
buffs.B104.name = 'Elemental Crown';
buffs.B104.description = '<FONT COLOR="#8fbaff">Use Elemental Damage to dispel it';
buffs.B104.effect = '';
buffs.B104.img = 'img/src/icons/elemental.png';
buffs.B104.tag = 'clear';

buffs.B105 = {};
buffs.B105.name = 'Deific Crown';
buffs.B105.description = '<FONT COLOR="#8fbaff">Use Deific Damage to dispel it';
buffs.B105.effect = '';
buffs.B105.img = 'img/src/icons/deific.png';
buffs.B105.tag = 'clear';

buffs.B106 = {};
buffs.B106.name = 'Occult Crown';
buffs.B106.description = '<FONT COLOR="#8fbaff">Use Occult Damage to dispel it';
buffs.B106.effect = '';
buffs.B106.img = 'img/src/icons/occult.png';
buffs.B106.tag = 'clear';

buffs.B107 = {};
buffs.B107.name = 'HopPhylacteryInvis';
buffs.B107.description = '<FONT COLOR="#8fbaff">nature damage up';
buffs.B107.player = true;
buffs.B107.effect = 'buffEffect(0.2, "B107")';
buffs.B107.img = 'img/src/icons/occult.png';
buffs.B107.invisible = true;

buffs.B108 = {};
buffs.B108.name = 'Brocoli regen invis';
buffs.B108.description = '<FONT COLOR="#8fbaff">nature damage up';
buffs.B108.player = true;
buffs.B108.effect = 'buffEffect((playerMaxHp*0.25)/10, "B108")';
buffs.B108.img = 'img/src/icons/occult.png';
buffs.B108.invisible = true;

buffs.B113 = {};
buffs.B113.name = 'Threnody for 999999';
buffs.B113.description = `<FONT COLOR="#8fbaff">All attacks deal 999K`;
buffs.B113.player = true;
buffs.B113.buff = true;
buffs.B113.img = 'img/src/items/I291.jpg';

buffs.B114 = {};
buffs.B114.name = 'Surge';
buffs.B114.description = `'<FONT COLOR="#8fbaff">Deific Bonus increased by '+buffs.B114.stacks*15+'%'`;
buffs.B114.effect = 'buffEffect(buffs.B114.stacks*0.15, "B114")';
buffs.B114.img = 'img/src/items/I319.jpg';
buffs.B114.player = true;
buffs.B114.buff = true;
buffs.B114.stacks = 0;
buffs.B114.dynamic = true;

buffs.B116 = {};
buffs.B116.name = 'Smoke Bomb';
buffs.B116.description = '<FONT COLOR="#8fbaff">Increases Thief success chance';
buffs.B116.player = true;
buffs.B116.effect = 'buffEffect(50, "B116")';
buffs.B116.buff = true;
buffs.B116.img = 'img/src/items/I490.jpg';


//general buffs

//inflicted by enemies

buffs.B3 = {};
buffs.B3.name = 'Poison';
buffs.B3.description = '<FONT COLOR="#8fbaff">Slowly Losing Life';
buffs.B3.player = true;
buffs.B3.effect = 'buffEffect(playerMaxHp/200*buffs.B3.stacks, "B3")';
buffs.B3.img = 'img/src/buffs/B1.png';
buffs.B3.cleansable = true;
buffs.B3.stacks = 0;
buffs.B3.tag = 'clear';

buffs.B59 = {};
buffs.B59.name = 'Burning';
buffs.B59.description = '<FONT COLOR="#8fbaff">Slowly Losing Life';
buffs.B59.player = true;
buffs.B59.effect = 'buffEffect(playerMaxHp/200*buffs.B59.stacks, "B59")';
buffs.B59.img = 'img/src/buffs/B16.jpg';
buffs.B59.stacks = 0;
buffs.B59.cleansable = true;
buffs.B59.tag = 'clear';

buffs.B58 = {};
buffs.B58.name = 'Curse';
buffs.B58.description = '<FONT COLOR="#8fbaff">Instant Death at 15 stacks<br><FONT COLOR="coral">[Cant be Removed]';
buffs.B58.player = true;
buffs.B58.effect = '';
buffs.B58.img = 'img/src/buffs/B15.jpg';
buffs.B58.stacks = 0;
buffs.B58.tag = 'clear';

buffs.B60 = {};
buffs.B60.name = 'Silence';
buffs.B60.description = '<FONT COLOR="#8fbaff">Unable to use Skills';
buffs.B60.player = true;
buffs.B60.effect = '';
buffs.B60.img = 'img/src/buffs/B17.jpg';
buffs.B60.tag = 'clear';

buffs.B73 = {};
buffs.B73.name = 'Hex';
buffs.B73.description = '<FONT COLOR="#8fbaff">Slowly Losing Life';
buffs.B73.player = true;
buffs.B73.effect = 'buffEffect(playerMaxHp/200*buffs.B73.stacks, "B73")';
buffs.B73.img = 'img/src/buffs/B25.jpg';
buffs.B73.tag = 'clear';
buffs.B73.stacks = 0;
buffs.B73.cleansable = true;

buffs.B74 = {};
buffs.B74.name = 'Paralysis';
buffs.B74.description = '<FONT COLOR="#8fbaff">Unable to Attack';
buffs.B74.player = true;
buffs.B74.effect = 'buffEffect(playerMaxHp/20, "B73")';
buffs.B74.img = 'img/src/buffs/B21.jpg';
buffs.B74.cleansable = true;
buffs.B74.tag = 'clear';

buffs.B75 = {};
buffs.B75.name = 'Blind';
buffs.B75.description = '<FONT COLOR="#8fbaff">Unable to see your own Health';
buffs.B75.player = true;
buffs.B75.effect = '';
buffs.B75.img = 'img/src/buffs/B23.jpg';
buffs.B75.cleansable = true;
buffs.B75.tag = 'clear';

buffs.B76 = {};
buffs.B76.name = 'Enrage';
buffs.B76.description = '<FONT COLOR="#8fbaff">Attack Increased';
buffs.B76.effect = '';
buffs.B76.img = 'img/src/buffs/B26.jpg';
buffs.B76.tag = 'clear';
buffs.B76.stacks = 0;

buffs.B77 = {};
buffs.B77.name = 'Spell Fizz';
buffs.B77.description = '<FONT COLOR="#8fbaff">Chance for Skills to not activate';
buffs.B77.effect = '';
buffs.B77.player = true;
buffs.B77.img = 'img/src/buffs/B22.jpg';
buffs.B77.cleansable = true;
buffs.B77.tag = 'clear';

buffs.B78 = {};
buffs.B78.name = 'Weak';
buffs.B78.description = '<FONT COLOR="#8fbaff">Attack Decreased';
buffs.B78.effect = '';
buffs.B78.player = true;
buffs.B78.img = 'img/src/buffs/B27.jpg';
buffs.B78.cleansable = true;
buffs.B78.tag = 'clear';

buffs.B79 = {};
buffs.B79.name = 'Mirror';
buffs.B79.description = '<FONT COLOR="#8fbaff">Spell damage is being reflected';
buffs.B79.effect = '';
buffs.B79.img = 'img/src/buffs/B28.jpg';
buffs.B79.tag = 'clear';

buffs.B80 = {};
buffs.B80.name = 'Zombie';
buffs.B80.description = '<FONT COLOR="#8fbaff">Healing becomes harmful';
buffs.B80.effect = '';
buffs.B80.player = true;
buffs.B80.img = 'img/src/buffs/B30.jpg';
buffs.B80.cleansable = true;
buffs.B80.tag = 'clear';

buffs.B81 = {};
buffs.B81.name = 'Seized';
buffs.B81.description = '<FONT COLOR="#8fbaff">Unable to use Items';
buffs.B81.effect = '';
buffs.B81.player = true;
buffs.B81.img = 'img/src/buffs/B31.jpg';
buffs.B81.cleansable = true;
buffs.B81.tag = 'clear';

buffs.B82 = {};
buffs.B82.name = 'Wounded';
buffs.B82.description = '<FONT COLOR="#8fbaff">Cannot receive Healing<br><FONT COLOR="coral">[Cant be Removed]';
buffs.B82.effect = '';
buffs.B82.player = true;
buffs.B82.img = 'img/src/buffs/B52.jpg';
buffs.B82.tag = 'clear';

buffs.B83 = {};
buffs.B83.name = 'Invulnerable';
buffs.B83.description = '<FONT COLOR="#8fbaff">Cannot receive Damage';
buffs.B83.effect = '';
buffs.B83.img = 'img/src/buffs/B33.jpg';
buffs.B83.tag = 'clear';

buffs.B84 = {};
buffs.B84.name = 'Alerted';
buffs.B84.description = '<FONT COLOR="#8fbaff">The enemy is plotting its next move';
buffs.B84.effect = '';
buffs.B84.img = 'img/src/buffs/B34.jpg';
buffs.B84.tag = 'clear';
buffs.B84.stacks = 0;

buffs.B85 = {};
buffs.B85.name = 'Petrified';
buffs.B85.description = '<FONT COLOR="#8fbaff">Unable to Move<br><FONT COLOR="coral">[Cant be Removed]';
buffs.B85.effect = '';
buffs.B85.player = true;
buffs.B85.img = 'img/src/buffs/B35.jpg';
buffs.B85.tag = 'clear';

buffs.B86 = {};
buffs.B86.name = 'Slow';
buffs.B86.description = '<FONT COLOR="#8fbaff">Attack Speed decreased';
buffs.B86.effect = 'buffEffect(-0.05 * buffs.B86.stacks, "B86")';
buffs.B86.img = 'img/src/buffs/B36.jpg';
buffs.B86.player = true;
buffs.B86.haste = true;
buffs.B86.stacks = 0;
buffs.B86.tag = 'clear';

buffs.B90 = {};
buffs.B90.name = 'Casting';
buffs.B90.description = '<FONT COLOR="#8fbaff">The enemy is plotting its next move<br><FONT COLOR="lawngreen">[Can be Interrupted]';
buffs.B90.effect = '';
buffs.B90.img = 'img/src/buffs/B39.jpg';
buffs.B90.tag = 'clear';
buffs.B90.stacks = 0;

buffs.B89 = {};
buffs.B89.name = 'Brittle Shield';
buffs.B89.description = `'<FONT COLOR="#8fbaff">Protects against '+buffs.B89.stacks+' attack(s)'`;
buffs.B89.img = 'img/src/buffs/B38.jpg';
buffs.B89.player = true;
buffs.B89.buff = true;
buffs.B89.stacks = 0;
buffs.B89.dynamic = true;

buffs.B95 = {};
buffs.B95.name = 'Healing';
buffs.B95.description = '<FONT COLOR="#8fbaff">Regenerating Health';
buffs.B95.effect = 'buffEffect((enemies[stats.currentEnemy].hp/100) * buffs.B95.stacks, "B95")';
buffs.B95.img = 'img/src/buffs/B29.jpg';
buffs.B95.stacks = 0;
buffs.B95.tag = 'clear';

buffs.B115 = {};
buffs.B115.name = 'Overpowered';
buffs.B115.description = `'<FONT COLOR="#8fbaff">Mastery capped at '+buffs.B115.stacks`;
buffs.B115.img = 'img/src/buffs/B50.jpg';
buffs.B115.effect = 'buffEffect(1, "B115")';
buffs.B115.player = true;
buffs.B115.stacks = 0;
buffs.B115.dynamic = true;
buffs.B115.tag = 'clear';

//inflicted by player

buffs.B54 = {};
buffs.B54.name = 'Poison';
buffs.B54.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B54.effect = 'buffEffect(playerWeaponDamage*0.25, "B54")';
buffs.B54.img = 'img/src/buffs/B1.png';

buffs.B109 = {};
buffs.B109.name = 'Hex';
buffs.B109.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B109.effect = 'buffEffect(playerWeaponDamage*0.25, "B109")';
buffs.B109.img = 'img/src/buffs/B25.jpg';

buffs.B110 = {};
buffs.B110.name = 'Burn';
buffs.B110.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B110.effect = 'buffEffect(playerWeaponDamage*0.25, "B110")';
buffs.B110.img = 'img/src/buffs/B16.jpg';

buffs.B111 = {};
buffs.B111.name = 'Bleed';
buffs.B111.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B111.effect = 'buffEffect(playerWeaponDamage*0.25, "B111")';
buffs.B111.img = 'img/src/buffs/B32.jpg';

buffs.B112 = {};
buffs.B112.name = 'Sacro';
buffs.B112.description = '<FONT COLOR="#8fbaff">Losing Life';
buffs.B112.effect = 'buffEffect(playerWeaponDamage*0.25, "B112")';
buffs.B112.img = 'img/src/buffs/B51.jpg';



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

const generalRelicDrop = 60000


var A1Loot = { I10:{P:200,A:1}, /*chest*/ I257:{P:generalRelicDrop,A:1}, I258:{P:generalRelicDrop,A:1} /*relics*/ ,M1:{P:100000,A:1} /*memo*/}
areas.A1 = {};
areas.A1.name = 'Cradle Hills';
areas.A1.level = 1;
areas.A1.description = '"The starting point of many turtle adventurers due to bugs and insects being the only residents around here, which makes for an easy prey. Or at least it should be."';
//areas.A1.unlocked = true;
//areas.A1.visible = 1;
areas.A1.boss = 'E4';
areas.A1.bossKey = 'I106';
areas.A1.unlockedOre = 0;
areas.A1.color1 = "#59662d";
areas.A1.color2 = "#50473e";
areas.A1.masteryCap = 50;

var A2Loot = { I10:{P:200,A:1}, /*chest*/ I259:{P:generalRelicDrop,A:1}, I260:{P:generalRelicDrop,A:1} /*relics*/ ,M2:{P:100000,A:1} /*memo*/}
areas.A2 = {};
areas.A2.name = 'Lost Dojo';
areas.A2.level = 10;
areas.A2.description = '"Legends say that a martial dojo was abandoned in the heart of the forest. Overtime, animals began honing their moves in there, and today hardly anyone can live to tell the tale."';
areas.A2.boss = 'E8';
areas.A2.bossKey = 'I127';
areas.A2.unlockedHerb = 0;
areas.A2.color1 = "#485640";
areas.A2.color2 = "#35443f";
areas.A2.mastery = 100;
areas.A2.masteryCap = 250;

var A3Loot = { I43:{P:200,A:1}, /*chest*/ I261:{P:generalRelicDrop,A:1}, I262:{P:generalRelicDrop,A:1} /*relics*/ ,M3:{P:100000,A:1} /*memo*/}
areas.A3 = {};
areas.A3.name = 'Granite Grotto';
areas.A3.level = 20;
areas.A3.description = '"A damp cave imbued with magical ore. the combination of the minerals and the natural electromagnetism has breed both terrifying and cute creatures."';
areas.A3.boss = 'E12';
areas.A3.bossKey = 'I163';
areas.A3.unlockedOre = 0;
areas.A3.color1 = "#4a477a";
areas.A3.color2 = "#3A3D56";
areas.A3.mastery = 300;
areas.A3.masteryCap = 650;

areas.A7 = {};
areas.A7.name = '🏆 The Arena';
areas.A7.level = 25;
areas.A7.description = '"Welcoming all brave turtles, this thunderdome is a place of glory and riches. Fight against powerful foes and claim prize for yourself!."';
areas.A7.color1 = "#69584e";
areas.A7.color2 = "#524238";
areas.A7.mastery = 500;

var A4Loot = { I43:{P:200,A:1}, /*chest*/ I263:{P:generalRelicDrop,A:1}, I264:{P:generalRelicDrop,A:1} /*relics*/ }
areas.A4 = {};
areas.A4.name = 'Hallow Forest';
areas.A4.level = 30;
areas.A4.description = '"A land devoid of life. Death always finds its way, and the ghostly remains of the undead torment the living in mortuary anger. I also heard there is a cute cat in here."';
areas.A4.boss = 'E27';
areas.A4.bossKey = 'I164';
areas.A4.unlockedPond = 0;
areas.A4.color1 = "#44304B";
areas.A4.color2 = "#46374b";
areas.A4.mastery = 700;
areas.A4.masteryCap = 1100;

areas.A5 = {};
areas.A5.name = 'Penguin Glacier';
areas.A5.level = 25;
areas.A5.description = '"Chilly glacier home to a likeable breed of monster penguins."';
areas.A5.dungeon = true;
areas.A5.dungeonTimer = 0;
areas.A5.dungeonPoints = 10;
areas.A5.boss = 'E23';
areas.A5.boss1 = 'E23';
areas.A5.key = 'I105';
areas.A5.color1 = "#3d3d3d";
areas.A5.color2 = "#578492";
areas.A5.charges = 3;
areas.A5.masteryCap = 600;

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
areas.A6.color1 = "#3d3d3d";
areas.A6.color2 = "#5c4440";
areas.A6.charges = 3;
areas.A6.masteryCap = 1200;
areas.A6.boss = 'E26';

var A8Loot = { I399:{P:200,A:1}, /*chest*/I380:{P:1000,A:1}, /*shroom*/ I413:{P:generalRelicDrop,A:1}, I414:{P:generalRelicDrop,A:1} /*relics*/ ,M4:{P:100000,A:1} /*memo*/}
areas.A8 = {};
areas.A8.name = 'Spirited Valley';
areas.A8.level = 40;
areas.A8.description = '"A hidden prehistoric land, lush and untouched by time, where the echoes of the beasts of ancient can still be heard from time to time."';
areas.A8.boss = 'E36';
areas.A8.bossKey = 'I357';
areas.A8.unlockedOre = 0;
areas.A8.color1 = "#6e3f36";
areas.A8.color2 = "#38492f";
areas.A8.areaEffect = true;
areas.A8.mastery = 1200; 
areas.A8.masteryCap = 1800; 

var A9Loot = { I399:{P:200,A:1}, /*chest*/ I415:{P:generalRelicDrop,A:1}, I416:{P:generalRelicDrop,A:1} /*relics*/,M5:{P:100000,A:1} /*memo*/}
areas.A9 = {};
areas.A9.name = 'Ruined Lab';
areas.A9.level = 50;
areas.A9.description = '"Once bustling with magic experiments, this arcane workshop tasked with imprisoning a greater foe now lies silent, ran only by automata continuing their purpose in the eerie stillness."';
areas.A9.boss = 'E41';
areas.A9.bossKey = 'I356';
areas.A9.unlockedHerb = 0;
areas.A9.color1 = "#6e365b";
areas.A9.color2 = "#46374b";
areas.A9.areaEffect = true;
areas.A9.mastery = 1800;
areas.A9.masteryCap = 2100; 


areas.A10 = {};
areas.A10.name = 'Temple of Dusk';
areas.A10.level = 25;
areas.A10.description = '"An ominous sanctuary cloaked in eternal twilight. Here, devotees seek the forbidden knowledge that lies beyond the veil, embracing darkness."';
areas.A10.dungeon = true;
areas.A10.dungeonTimer = 0;
areas.A10.dungeonPoints = 10;
areas.A10.boss1 = 'E48';
areas.A10.boss2 = 'E49';
areas.A10.color1 = "#5f1f1f";
areas.A10.color2 = "#313131";
areas.A10.charges = 3;
areas.A10.areaEffect = true;
areas.A10.masteryCap = 2300; 
areas.A10.boss = 'E49';


/*
areas.A11 = {};
areas.A11.name = 'Temple of Dawn';
areas.A11.level = 25;
areas.A11.description = '"A sanctuary bathed in radiant light. Here, devotees gather to seek enlightenment, guided by the purity and warmth of the dawn\'s first light."';
areas.A11.dungeon = true;
areas.A11.dungeonTimer = 0;
areas.A11.dungeonPoints = 10;
areas.A11.boss1 = 'E51';
areas.A11.boss2 = 'E52';
areas.A11.boss3 = 'E53';
areas.A11.color1 = "#928722";
areas.A11.color2 = "#644f22";
areas.A11.charges = 3;
areas.A11.areaEffect = true;
*/

//#endregion
//----------------------==========================-----------------------
//----------------------===========QUEST==========-----------------------
//----------------------==========================-----------------------
//#region Quests
var quests = {} 

quests.A1Q1 = {};
quests.A1Q1.name = 'Important Notice';
quests.A1Q1.difficulty = 1;
quests.A1Q1.description = 'To complete the registation of the Super Turtle Adventure program, please terrorise the local wildlife.'+bestiaryTag("Tip: The game will run when tabbed out","#E57D08");
quests.A1Q1.objective = `'Defeat a bunch of slugs <span class="questProgress">'+beautify(enemies.E1.killCount)+'/6</span>'`;
quests.A1Q1.logic = 'enemies.E1.killCount>5';
quests.A1Q1.effect = 'items.I8.count++; tipPopUp("Quick Tips!","<br>The game progresses while offline, you will get rare items this way too<br><br>Hold down spacebar to quickly click the turtle<br><br>If you are ever lost, check the Game Guide<br><br>Upgrade your weapons as soon as possible to farm faster<br><br>Use the right weapon agains the right enemy, pay attention to alignments<br><br>Check your mail on the top left as soon as you get a new one<br><br>Check out the settings for alternate game modifiers")';
quests.A1Q1.reward = `itemIcon("I8")+' A cool stick'`;
quests.A1Q1.icon = "img/src/items/I9.jpg";

unlocks.shop = false

quests.A1Q7 = {};
quests.A1Q7.name = 'Fateful Companion';
quests.A1Q7.difficulty = 1;
quests.A1Q7.description = 'Fun fact! Did you know turtles LIKE to be pet? And did you know you should do it NOW?'+bestiaryTag("Tip: Spacebar also clicks the turtle","#E57D08");
quests.A1Q7.objective = `'Click the turtle on the bottom left 50 times <span class="questProgress">'+beautify(stats.clickCount)+'/50</span>'`;
quests.A1Q7.logic = 'stats.clickCount>=50';
quests.A1Q7.effect = 'items.I1.count+=100';
quests.A1Q7.exp = returnExp(1)/2;
quests.A1Q7.reward = `itemIcon("I1")+' Slug Meat x100'`;
quests.A1Q7.icon = "img/src/items/I79.jpg";

quests.A1Q2 = {};
quests.A1Q2.name = 'My Beloved Friend';
quests.A1Q2.difficulty = 1;
quests.A1Q2.description = 'I am a prince from Nigeria and a giant idiot spider destroyed shop, give me your money please.'+bestiaryTag('Tip: Sell items by pressing <img src="img/src/icons/shopButton.png"> on the inventory',"#E57D08");
quests.A1Q2.objective = `'Hand over 2500 Shells <span class="questProgress">'+beautify(rpgPlayer.coins)+'/2500</span>'`;
quests.A1Q2.logic = 'rpgPlayer.coins>=2500';
quests.A1Q2.effect = 'rpgPlayer.coins-=2500; items.I1.count+=300; unlocks.shop = true; did("shopButton").style.animation = "newGameTip 1s infinite linear"';
quests.A1Q2.money = 0;
quests.A1Q2.reward = `itemIcon("I218")+'Access to the Shop'+'<br>★ '+itemIcon("I1")+' Slug Meat x300'`;
quests.A1Q2.icon = "img/src/items/I94.jpg";

quests.A1Q3 = {};
quests.A1Q3.name = 'Greenhorn No More';
quests.A1Q3.difficulty = 1;
quests.A1Q3.description = 'We are screwed over here if you are our best bet exploring these lands. Could you at the very least not be totally naked?'+bestiaryTag('Tip: Upgrade gear by pressing the Upgrade button',"#E57D08");
quests.A1Q3.objective = `'Upgrade a full set of'+colorTag("Cloth Armor", "#516385")+'from the shop to level 4'`;
quests.A1Q3.logic = 'items.I2.level>3 && items.I3.level>3 && items.I4.level>3 && items.I5.level>3 && items.I6.level>3';
quests.A1Q3.effect = 'items.I10.count+=3';
quests.A1Q3.reward = `itemIcon("I10")+'Small Wooden Lockbox x3'`;
quests.A1Q3.icon = "img/src/items/I5.jpg";

quests.A1Q3A = {};
quests.A1Q3A.name = 'Request From a Toad';
quests.A1Q3A.difficulty = 2;
quests.A1Q3A.description = 'Ribbit Ribbit. Ribbit Ribbit Ribbit Ribbit Ribbit Ribbit Ribbit.  Ribbit Ribbit.';
quests.A1Q3A.objective = `'Defeat 300 Ribulls <span class="questProgress">'+beautify(enemies.E3.killCount)+'/300</span>'`;
quests.A1Q3A.logic = 'enemies.E3.killCount>299';
quests.A1Q3A.effect = 'items.I51.count+=300';
quests.A1Q3A.reward = `itemIcon("I51")+' Frog Leg x300'`;
quests.A1Q3A.icon = "img/src/items/I59.jpg";

quests.A1Q4 = {};
quests.A1Q4.name = 'Miner\'s Request';
quests.A1Q4.difficulty = 3;
quests.A1Q4.description = 'These scorpions keep blocking the road to our sweet, sweet rocks. Clear the road and well show you our rocky goodness.';
quests.A1Q4.objective = `'Defeat 150 Stinglets <span class="questProgress">'+beautify(enemies.E2.killCount)+'/150</span>'`;
quests.A1Q4.logic = 'enemies.E2.killCount>149';
quests.A1Q4.effect = 'areas.A1.unlockedOre = 1;items.I37.count+=300; tipPopUp("Mastery","<br>Mastery is the most important stat of your turtle. It increases exponentially your health and damage, and allows you to progress the game<br><br>Gain mastery by interacting with the game systems.<br><br>Check out the mastery guide at the top of the screen for more details<br><br>Each area has a Mastery limit shown next to their name, and will unlock once the boss of the area has been defeated")';
quests.A1Q4.reward = `itemIcon("I32")+'Unlock Mining Node'+'<br>★ '+itemIcon("I37")+' White Stinger x300'`;
quests.A1Q4.icon = "img/src/items/I84.jpg";

quests.A1Q5 = {};
quests.A1Q5.name = 'Have You Seen My Pet';
quests.A1Q5.difficulty = 4;
quests.A1Q5.description = 'My pet Hoopperoona has gone missing. You will recognise her for her eight legs, rocky skin, and the ability to melt steel beams with her saliva.';
quests.A1Q5.objective = `'Defeat Hoopperoona'`;
quests.A1Q5.logic = 'enemies.E4.killCount>0';
quests.A1Q5.effect = 'items.I213.count++';
quests.A1Q5.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A1Q5.icon = "img/src/items/I0.jpg";

unlocks.areas = false;

quests.A1Q6 = {};
quests.A1Q6.name = 'Nature\'s Blessing';
quests.A1Q6.difficulty = 1;
quests.A1Q6.description = 'I am missing a key ingredient in my potion. I wouldnt mind sharing the recipe with you if you help me.';
quests.A1Q6.objective = `'Show an unusual herb blend'`;
quests.A1Q6.logic = 'items.I111.count>0';
quests.A1Q6.effect = 'items.I436.count++; items.I111.count = 0; recipes.AN2A.unlocked=false; createRecipe()';
quests.A1Q6.reward = `itemIcon("I436")+'Elemental Glitterstone'`;
quests.A1Q6.icon = "img/src/items/I38.jpg";

/*
quests.A1Q7 = {};
quests.A1Q7.name = 'Impending Doom';
quests.A1Q7.difficulty = 7;
quests.A1Q7.description = 'I heard strange noises on the forest but it says here that my level is too low. Go check it for me, will ya? <br><br> <span style="color:#FFD100"> [Note: This effect will be permanent]';
quests.A1Q7.objective = 'Reach Level 30';
quests.A1Q7.logic = 'rpgClass.noClass.level>29';
quests.A1Q7.effect = 'areas.A1.boss = "E31";';
quests.A1Q7.reward = 'Area Boss Evolution';
quests.A1Q7.rewardIcon = 'itemIcon("I34")';
*/

//area 2

quests.A2Q2 = {};
quests.A2Q2.name = 'Help! Missing Feline';
quests.A2Q2.difficulty = 1;
quests.A2Q2.description = 'My cat Whiskers is missing. He likes dark closed spaces. I have nothing to offer but Whiskers grattitude.';
quests.A2Q2.objective = `'Find Whiskers'`;
quests.A2Q2.reward = `itemIcon("I120")+'Whiskers Gratitude'`;
quests.A2Q2.logic = 'items.I123.count>0';
quests.A2Q2.effect = 'items.I123.count--; items.I120.count++;';
quests.A2Q2.icon = "img/src/items/I123.jpg";

quests.A2Q1 = {};
quests.A2Q1.name = 'Craft Guild Request';
quests.A2Q1.difficulty = 2;
quests.A2Q1.description = 'The animals punched the heck out of our workshops. We will let anyone who help us repair them into the Crafters Guild.';
quests.A2Q1.objective = `'Hand over 50 copper ore <span class="questProgress">'+beautify(items.I32.count)+'/50</span><br>❖ Hand over 100 rabbit hide <span class="questProgress">'+beautify(items.I114.count)+'/100</span>'`;
quests.A2Q1.logic = 'items.I32.count>49 && items.I114.count>99';
quests.A2Q1.effect = 'items.I32.count-=50; items.I114.count-=100; unlocks.jobs = true; gametipUnlock("gt5")';
quests.A2Q1.reward = `itemIcon("I86")+'Access to the Guildwork Tab'`;
quests.A2Q1.icon = "img/src/items/I69.jpg";

quests.A2Q1A = {};
quests.A2Q1A.name = 'Blacksmithing Trial';
quests.A2Q1A.difficulty = 1;
quests.A2Q1A.description = 'You might have entered the crafters guild, but I will never be convinced until you show me your craftmanship.';
quests.A2Q1A.objective = `'Show 30 Copper Bars <span class="questProgress">'+beautify(items.I31.count)+'/30</span>'`;
quests.A2Q1A.reward = `itemIcon("I114")+'Rabbit Hide x400'`;
quests.A2Q1A.logic = 'items.I31.count>29';
quests.A2Q1A.effect = 'items.I114.count+=400';
quests.A2Q1A.icon = "img/src/items/I86.jpg";

quests.A2Q3 = {};
quests.A2Q3.name = 'A very corny request';
quests.A2Q3.difficulty = 3;
quests.A2Q3.description = 'To beat a squirrel I need to become a squirrel. Help me achieve my dream.';
quests.A2Q3.objective = `'Defeat 240 Karateil <span class="questProgress">'+beautify(enemies.E6.killCount)+'/240</span>'`;
quests.A2Q3.reward = `itemIcon("I38")+'Unlock Foraging Node'`;
quests.A2Q3.logic = 'enemies.E6.killCount>239';
quests.A2Q3.effect = 'areas.A2.unlockedHerb = 1;';
quests.A2Q3.icon = "img/src/items/I115.jpg";

quests.A2Q4 = {};
quests.A2Q4.name = 'Husbandry Issues';
quests.A2Q4.difficulty = 1;
quests.A2Q4.description = 'My chickens escaped from my coop and learnt full body combat. Help me bring them back.';
quests.A2Q4.objective = `'Capture 10 Roostrikas <span class="questProgress">'+beautify(items.I122.count)+'/10</span>'`;
quests.A2Q4.reward = `itemIcon("I93")+'Ornate Stamper x3'`;
quests.A2Q4.logic = 'items.I122.count>9';
quests.A2Q4.effect = 'items.I122.count=0; items.I93.count+=3;';
quests.A2Q4.icon = "img/src/items/I121.jpg";

quests.A2Q4A = {};
quests.A2Q4A.name = 'Pharmacist Assistance';
quests.A2Q4A.difficulty = 1;
quests.A2Q4A.description = 'I tried to get cocky with a giant world-champion cat and broke five bones. If I was a level 2 Alchemist I could turn the tables against him.';
quests.A2Q4A.objective = `'Hand over 5 Healing Flasks <span class="questProgress">'+beautify(items.I19.count)+'/5</span>'`;
quests.A2Q4A.reward = `itemIcon("I209")+'Ephemeral Time Egg'`;
quests.A2Q4A.logic = 'items.I19.count>4';
quests.A2Q4A.effect = 'items.I19.count-=5; items.I209.count+=1;';
quests.A2Q4A.icon = "img/src/items/I19.jpg";
quests.A2Q4A.warning1 = "I209";
quests.A2Q4A.warning2 = 1;

quests.A2Q5 = {};
quests.A2Q5.name = 'Sovereign Affairs';
quests.A2Q5.difficulty = 4;
quests.A2Q5.description = 'Teach him a lesson on my behalf. I would do it if it wasnt a 3 meter tiger proficient in breaking bones.';
quests.A2Q5.objective = `'Defeat King-Kat'`;
quests.A2Q5.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A2Q5.logic = 'enemies.E8.killCount>0';
quests.A2Q5.effect = 'items.I213.count++';
quests.A2Q5.icon = "img/src/items/I15.jpg";

quests.A2Q6 = {};
quests.A2Q6.name = 'The Way Of Karate';
quests.A2Q6.difficulty = 1;
quests.A2Q6.description = 'These animals got hands. I need something to make them learn a lesson or two about martial arts.';
quests.A2Q6.objective = `'Hand over 10 Light Dynamites <span class="questProgress">'+beautify(items.I30.count)+'/10</span>'`;
quests.A2Q6.reward = `itemIcon("I174")+'Dungeon Voucher x3'`; 
quests.A2Q6.logic = 'items.I30.count>9';
quests.A2Q6.effect = 'items.I30.count-=10; items.I174.count+=3';
quests.A2Q6.icon = "img/src/items/I30.jpg";

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
quests.A3Q1.objective = `'Reluctantly hand over 20 Nature Flasks <span class="questProgress">'+beautify(items.I49.count)+'/20</span>'`;
quests.A3Q1.reward = `itemIcon("I16")+'Yellow Cube x500'`;
quests.A3Q1.logic = 'items.I49.count>19';
quests.A3Q1.effect = 'items.I49.count-=20; items.I16.count +=500';
quests.A3Q1.icon = "img/src/items/I49.jpg";

quests.A3Q2 = {};
quests.A3Q2.name = 'Unfortunate Subsidence';
quests.A3Q2.difficulty = 1;
quests.A3Q2.description = 'The cargo we were transporting got destroyed when a cave collapsed. Can you help us make up for it?';
quests.A3Q2.objective = `'Hand over 2500 White Stingers <span class="questProgress">'+beautify(items.I37.count)+'/2500</span>'`;
quests.A3Q2.reward = `itemIcon("I298")+'Armament War Paint x20'`;
quests.A3Q2.logic = 'items.I37.count>2499';
quests.A3Q2.effect = 'items.I37.count-=2500; items.I298.count+=20';
quests.A3Q2.icon = "img/src/items/I107.jpg";

quests.A3Q3 = {};
quests.A3Q3.name = 'Pressing Matters';
quests.A3Q3.difficulty = 2;
quests.A3Q3.description = 'I was playing with my building blocks and realised I\'m missing yellow ones.';
quests.A3Q3.objective = `'Hand over 1500 Yellow Cubes <span class="questProgress">'+beautify(items.I16.count)+'/1500</span>'`;
quests.A3Q3.reward = `itemIcon("I437")+'Occult Glitterstone x10'`;
quests.A3Q3.logic = 'items.I16.count>1499';
quests.A3Q3.effect = 'items.I16.count-=1500; items.I437.count+=10';
quests.A3Q3.icon = "img/src/items/I16.jpg";

quests.A3Q4 = {};
quests.A3Q4.name = 'Carefully Away';
quests.A3Q4.difficulty = 3;
quests.A3Q4.description = 'These darn TNT fellas will pose a serious danger to the miners if left unchecked.';
quests.A3Q4.objective = `'Defeat 600 Cubomites <span class="questProgress">'+beautify(enemies.E10.killCount)+'/600</span>'`;
quests.A3Q4.reward = `itemIcon("I36")+'Unlock Mining Node'`;
quests.A3Q4.logic = 'enemies.E10.killCount>599';
quests.A3Q4.effect = 'areas.A3.unlockedOre = 1';
quests.A3Q4.icon = "img/src/items/I29.jpg";


quests.A3Q6 = {};
quests.A3Q6.name = 'Harder Than Rock';
quests.A3Q6.difficulty = 4;
quests.A3Q6.description = 'The recent extraction of granite has caused a rise in the population of elementals.';
quests.A3Q6.objective = `'Defeat 300 Granite Elementals <span class="questProgress">'+beautify(enemies.E11.killCount)+'/300</span>'`;
quests.A3Q6.reward = `itemIcon("I85")+'Reinforced Mattock'`; 
quests.A3Q6.logic = 'enemies.E11.killCount>299';
quests.A3Q6.effect = ' items.I85.count++; shopItems.A3S16.unlocked = true; createShopItem()';
quests.A3Q6.icon = "img/src/items/I17.jpg";

quests.A3Q5 = {};
quests.A3Q5.name = 'Poor Lodging Choices';
quests.A3Q5.difficulty = 1;
quests.A3Q5.description = 'There\'s rare ore on this cave. And I\'m going to make a house out of it.';
quests.A3Q5.objective = `'Hand over 150 Arcanite Bar??? <span class="questProgress">'+beautify(items.I35.count)+'/150???</span>'`;
quests.A3Q5.reward = `itemIcon("I209")+'Ephemeral Time Egg'`;
quests.A3Q5.logic = 'items.I35.count>149';
quests.A3Q5.effect = 'items.I35.count-=150; items.I209.count+=1';
quests.A3Q5.icon = "img/src/items/I35.jpg";
quests.A3Q5.warning1 = "I209";
quests.A3Q5.warning2 = 1;

quests.A3Q5A = {};
quests.A3Q5A.name = 'Victorious Bout';
quests.A3Q5A.difficulty = 5;
quests.A3Q5A.description = 'I see a star on the rise? Prove your might and I will spread the word about your deeds worldwide.<br>'+colorTag("Dont forget to check the exchange shop!", "darkorange");
quests.A3Q5A.objective = `'Acquire one Gold Medal in the Monster Arena'`;
quests.A3Q5A.reward = `itemIcon("I438")+'Deific Glitterstone x15'`; 
quests.A3Q5A.logic = 'goldenMedalsGot>0';
quests.A3Q5A.effect = ' items.I438.count+=15;';
quests.A3Q5A.icon = "img/src/icons/gladr1.jpg";

quests.A3Q6A = {};
quests.A3Q6A.name = 'Cool, Cool Island';
quests.A3Q6A.difficulty = 5;
quests.A3Q6A.description = 'I\'m just more of a summer person, ya know?';
quests.A3Q6A.objective = `'Clear the Penguin Glacier'`;
quests.A3Q6A.reward = `itemIcon("I174")+'Dungeon Voucher x5'`; 
quests.A3Q6A.logic = 'enemies.E23.killCount>0';
quests.A3Q6A.effect = 'items.I174.count+=5';
quests.A3Q6A.icon = "img/src/upgrades/P4.jpg";
quests.A3Q6A.warning1 = "I174";
quests.A3Q6A.warning2 = 5;

quests.A3Q6B = {};
quests.A3Q6B.name = 'Big Bad, Bad Dragon';
quests.A3Q6B.difficulty = 6;
quests.A3Q6B.description = 'Until that drake is out of commission we cant dwell further into the mines. Be sure to avoid using '+natureIcon+'Nature Damage or shell get very pissy!';
quests.A3Q6B.objective = `'Defeat Terragosa'`;
quests.A3Q6B.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A3Q6B.logic = 'enemies.E12.killCount>0';
quests.A3Q6B.effect = 'items.I213.count++';
quests.A3Q6B.icon = "img/src/items/I84.jpg";

quests.A3Q7 = {};
quests.A3Q7.name = 'Lost In The Blue';
quests.A3Q7.difficulty = 1;
quests.A3Q7.description = 'Ive never left the caves, I want to see jellyfish.';
quests.A3Q7.objective = `'Hand over 10 Ghost Jellyfish <span class="questProgress">'+beautify(items.I159.count)+'/10</span>'`;
quests.A3Q7.reward = `itemIcon("I219")+'Busted Improbability Drive x5'`;
quests.A3Q7.logic = 'items.I159.count>9';
quests.A3Q7.effect = 'items.I159.count-=10; items.I219.count += 5';
quests.A3Q7.icon = "img/src/items/I162.jpg";
quests.A3Q7.warning1 = "I219";
quests.A3Q7.warning2 = 5;

//area 4
quests.A4Q1 = {};
quests.A4Q1.name = 'Blacksmith Request';
quests.A4Q1.difficulty = 1;
quests.A4Q1.description = 'I\'m going to make the finest of armors and I need the finest of materials.';
quests.A4Q1.objective = `'Hand over 1.5k Agate Crystal Scales <span class="questProgress">'+beautify(items.I71.count)+'/1.5K</span>'`;
quests.A4Q1.logic = 'items.I71.count>1499';
quests.A4Q1.effect = 'items.I71.count-=1500; items.I174.count+=5';
quests.A4Q1.reward = `itemIcon("I174")+'Dungeon Voucher x5'`;
quests.A4Q1.icon = "img/src/items/I86.jpg";

quests.A4Q2 = {};
quests.A4Q2.name = 'Spineless Tourist';
quests.A4Q2.difficulty = 2;
quests.A4Q2.description = 'This depressing scenary is tooootaly making me unconfortable. Bring me something to drink.';
quests.A4Q2.objective = `'Hand over 10 Occult Flasks <span class="questProgress">'+beautify(items.I156.count)+'/10</span>'`;
quests.A4Q2.reward = `itemIcon("I162")+'Unlock Fishing Node'`;
quests.A4Q2.logic = 'items.I156.count>9';
quests.A4Q2.effect = 'items.I156.count-=10; areas.A4.unlockedPond = 1; gametipUnlock("gt18")';
quests.A4Q2.icon = "img/src/areas/A4M.png";

quests.A4Q2A = {};
quests.A4Q2A.name = 'Olympic Adventure';
quests.A4Q2A.difficulty = 1;
quests.A4Q2A.description = 'Achieve what no other turtle has achieved ever before, make me proud. You will need a Medal Case for this one.';
quests.A4Q2A.objective = `'Achieve 6 Gold Medals on the Bestiary <span class="questProgress">'+beautify(medalsGot)+'/6</span>'`;
quests.A4Q2A.reward = `itemIcon("I291")+'Threnody for 999999'`;
quests.A4Q2A.logic = 'medalsGot>5';
quests.A4Q2A.effect = 'items.I291.count++';
quests.A4Q2A.icon = "img/src/items/I315.jpg";

quests.A4Q2B = {};
quests.A4Q2B.name = 'Illegally Blind';
quests.A4Q2B.difficulty = 1;
quests.A4Q2B.description = 'I\'ve lost my glasses! They are so lost that, in fact, they are probably not even on this whole area!';
quests.A4Q2B.objective = `'Hand over the Lost Glasses'`;
quests.A4Q2B.reward = `itemIcon("I211")+'Timeless Time Egg'`;
quests.A4Q2B.logic = 'items.I423.count>0';
quests.A4Q2B.effect = 'items.I423.count=0;items.I211.count++';
quests.A4Q2B.icon = "img/src/items/I423.jpg";
quests.A4Q2B.warning1 = "I211";
quests.A4Q2B.warning2 = 1;

quests.A4Q4 = {};
quests.A4Q4.name = 'Begone Dark Presences';
quests.A4Q4.difficulty = 4;
quests.A4Q4.description = 'You feel the powerful aura, yes? I need a powerful exorciser to aid me on this Job.';
quests.A4Q4.objective = `'Exorcise 3 Morgatos with salt <span class="questProgress">'+beautify(stats.purifiedMorgatosDefeated)+'/3</span>'`;
quests.A4Q4.reward = `itemIcon("I209")+'Ephemeral Time Egg'`;
quests.A4Q4.logic = 'stats.purifiedMorgatosDefeated>2'; 
quests.A4Q4.effect = 'items.I209.count+=1';
quests.A4Q4.icon = "img/src/items/I18.jpg";
quests.A4Q4.warning1 = "I209";
quests.A4Q4.warning2 = 1;

quests.A4Q3 = {};
quests.A4Q3.name = 'Always A Catch';
quests.A4Q3.difficulty = 1;
quests.A4Q3.description = 'Lately I\'m getting pretty restless over what I lost playing near the pond, can you get it for me?';
quests.A4Q3.objective = `'Hand over the lost item on the pond'`;
quests.A4Q3.reward = `itemIcon("I18")+'Ruinous Soul x500'`;
quests.A4Q3.logic = 'items.I286.count>0';
quests.A4Q3.effect = 'items.I286.count=0; items.I18.count+=500';
quests.A4Q3.icon = "img/src/items/I162.jpg";

quests.A4Q4A = {};
quests.A4Q4A.name = 'Monster Hunt Request';
quests.A4Q4A.difficulty = 5;
quests.A4Q4A.description = 'The adventurer\'s guild has reported sightings of a fiery monster several times more powerful than the rest.';
quests.A4Q4A.objective = `'Defeat Infernalus'`;
quests.A4Q4A.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A4Q4A.logic = 'enemies.E27.killCount>0';
quests.A4Q4A.effect = 'items.I213.count++';
quests.A4Q4A.icon = "img/src/items/I13.jpg";

quests.A4Q6 = {};
quests.A4Q6.name = 'Exorcism Aboard';
quests.A4Q6.difficulty = 6;
quests.A4Q6.description = 'Well this is fantastic. Now the ghosts are throwing their own floating party.';
quests.A4Q6.objective = `'Clear the Pirate Galleon'`;
quests.A4Q6.reward = `itemIcon("I174")+'Dungeon Voucher x5'`;
quests.A4Q6.logic = 'enemies.E26.killCount>0';
quests.A4Q6.effect = 'items.I174.count+=5';
quests.A4Q6.icon = "img/src/items/I126.jpg";

quests.A4Q7 = {};
quests.A4Q7.name = 'Relatable Situation';
quests.A4Q7.difficulty = 1;
quests.A4Q7.description = 'The lord of hell fire stole my grill. I think his reign over fiery goods has gone too far.';
quests.A4Q7.objective = `'Steal back the grill from Infernalus'`;
quests.A4Q7.reward = `itemIcon("I219")+'Busted Improbability Drive x5'`;
quests.A4Q7.logic = 'items.I90.count>0';
quests.A4Q7.effect = 'items.I90.count=0; items.I219.count += 5 ';
quests.A4Q7.icon = "img/src/items/I100.jpg";

quests.A4Q5 = {};
quests.A4Q5.name = 'Red Hooded Behest';
quests.A4Q5.difficulty = 6;
quests.A4Q5.description = 'That... Thing... Hand it over... I can make something useful... For you...';
quests.A4Q5.objective = `'Hand over 200 Nightmare Fuel <span class="questProgress">'+beautify(items.I100.count)+'/200</span>'`;
quests.A4Q5.reward = `itemIcon("I157")+'Anima Anvil'`;
quests.A4Q5.logic = 'items.I100.count>199'; 
quests.A4Q5.effect = 'items.I100.count-=200; items.I157.count++';
quests.A4Q5.icon = "img/src/items/I335.jpg";
quests.A4Q5.unlocked = false
//area 5

quests.A8Q1 = {};
quests.A8Q1.name = 'Prehistoric Research';
quests.A8Q1.difficulty = 2;
quests.A8Q1.description = 'This place is a compelete gold mine for science! I will need samples to bring them to the laboratory.';
quests.A8Q1.objective = `'Hand over 1000 Ancient Brick <span class="questProgress">'+beautify(items.I346.count)+'/1000</span>'`;
quests.A8Q1.logic = 'items.I346.count>999';
quests.A8Q1.effect = 'items.I346.count-=1000; items.I177.count++';
quests.A8Q1.reward = `itemIcon("I177")+'EXP Voucher'`;
quests.A8Q1.icon = "img/src/items/I52.jpg";
quests.A8Q1.warning1 = "I177";
quests.A8Q1.warning2 = 1;

quests.A8Q1A = {};
quests.A8Q1A.name = 'Wilderness Gourmand';
quests.A8Q1A.difficulty = 1;
quests.A8Q1A.description = 'All these mushrooms growing arround here... And we dont even have fire to roast them? Who\'s going to held accountable for this now?';
quests.A8Q1A.objective = `'Hand over 25 Firetank Pyrocombulators <span class="questProgress">'+beautify(items.I187.count)+'/25</span>'`;
quests.A8Q1A.logic = 'items.I187.count>24';
quests.A8Q1A.effect = 'items.I187.count-=25; items.I312.count+=10';
quests.A8Q1A.reward = `itemIcon("I312")+"Gardener\'s Stamper x10"`;
quests.A8Q1A.icon = "img/src/items/I90.jpg";

quests.A8Q2 = {};
quests.A8Q2.name = 'Scientific Method';
quests.A8Q2.difficulty = 1;
quests.A8Q2.description = 'See all those mushrooms lyin\' arround here? God knows what they do, but you will.';
quests.A8Q2.objective = `'Discover all the effects of Suspicious Mushrooms <span class="questProgress">'+shroomEffectsDiscovered+'/8</span>'`;
quests.A8Q2.logic = 'shroomEffectsDiscovered>7';
quests.A8Q2.effect = 'items.I387.count++; shopItems.A8S2A.unlocked = true; createShopItem()';
quests.A8Q2.reward = `itemIcon("I387")+'Ebonforge Gauntlets'`;
quests.A8Q2.icon = "img/src/items/I380.jpg";

quests.A8Q2A = {};
quests.A8Q2A.name = 'Evolution Theory I';
quests.A8Q2A.difficulty = 1;
quests.A8Q2A.description = 'Little is known about monster evolution, but if my calculations are correct, the beast at Cradle Hills could be the key to this research. Take a sampler from the shop and report back to me.';
quests.A8Q2A.objective = `'Hand over a Monster Sample from Hoopperoona'`;
quests.A8Q2A.logic = 'items.I396.statUp==="Sample Taken!"';
quests.A8Q2A.effect = 'items.I396.count=0; items.REM1.count++; jobPanels.EM.unlocked = true; createRecipeListing(); quests.A8Q2A.unlocked=false; quests.A8Q2B.unlocked = true; createQuest()';
quests.A8Q2A.reward = `itemIcon("I397")+'Recipe: Spider Dream Shard'`;
quests.A8Q2A.icon = "img/src/enemies/E4M.png";
quests.A8Q2A.unlocked = false;

quests.A8Q2B = {};
quests.A8Q2B.name = 'Evolution Theory II';
quests.A8Q2B.difficulty = 3;
quests.A8Q2B.description = 'As it turns out, powerful monsters are able to undergo further evolution. Would you mind testing it for me?';
quests.A8Q2B.objective = `'Defeat Evolved Hoopperoona'`;
quests.A8Q2B.logic = 'enemies.E31.killCount>0';
quests.A8Q2B.effect = 'areas.A8.unlockedOre = 0;';
quests.A8Q2B.reward = `itemIcon("I349")+'Unlock Ore Node'`;
quests.A8Q2B.icon = "img/src/items/I397.jpg";
quests.A8Q2B.unlocked = false;

quests.A8Q3 = {};
quests.A8Q3.name = 'Dire Rescue';
quests.A8Q3.difficulty = 3;
quests.A8Q3.description = 'Help! My exploration team is surrounded by those fanged beasts!';
quests.A8Q3.objective = `'Defeat 700 Dragoraros <span class="questProgress">'+beautify(enemies.E34.killCount)+'/700</span>'`;
quests.A8Q3.logic = 'enemies.E34.killCount>699';
quests.A8Q3.effect = 'areas.A8.unlockedOre = 1;';
quests.A8Q3.reward = `itemIcon("I349")+'Unlock Ore Node'`;
quests.A8Q3.icon = "img/src/items/I78.jpg";

quests.A8Q4 = {};
quests.A8Q4.name = 'Careful Procedures';
quests.A8Q4.difficulty = 3;
quests.A8Q4.description = 'See those wicked four legged beasts? Turns out, their teeth is something else! But we cannot get them through regular means, you know? You need to be delicate with it.';
quests.A8Q4.objective = `'Hand over 600 Pristine Dragoraro Tusks <span class="questProgress">'+beautify(items.I398.count)+'/600</span>'`;
quests.A8Q4.logic = 'items.I398.count>599';
quests.A8Q4.effect = 'items.I398.count-=600; items.I174.count+=5';
quests.A8Q4.reward = `itemIcon("I174")+'Dungeon Voucher x5'`;
quests.A8Q4.icon = "img/src/items/I347.jpg";
quests.A8Q4.warning1 = "I174";
quests.A8Q4.warning2 = 5;

quests.A8Q5 = {};
quests.A8Q5.name = 'Turtle My Dear I';
quests.A8Q5.difficulty = 1;
quests.A8Q5.description = 'Oh what a sweet child you are, are you interested in gardening? Grandma would love some help';
quests.A8Q5.objective = `'Reach Gardening level 3 <span class="questProgress">'+rpgPlayer.gardenLevel+'/3</span>'`;
quests.A8Q5.logic = 'rpgPlayer.gardenLevel>2';
quests.A8Q5.effect = 'plants.g10.count++; plants.g10.harvested++; quests.A8Q5A.unlocked = true; quests.A8Q5.unlocked = false; createQuest(); createPlants()';
quests.A8Q5.reward = `itemIcon("I309")+'Chocobloom Seeds x1'`;
quests.A8Q5.icon = "img/src/upgrades/grandma1.jpg";

quests.A8Q5A = {};
quests.A8Q5A.name = 'Turtle My Dear II';
quests.A8Q5A.difficulty = 1;
quests.A8Q5A.description = 'Beautiful gardening my dear, can you help grandma planting some cookies?';
quests.A8Q5A.objective = `'Hand over 30 Chocolate Chip Cookies <span class="questProgress">'+beautify(items.I14.count)+'/30</span>'`;
quests.A8Q5A.logic = 'items.I14.count>29';
quests.A8Q5A.effect = 'items.I14.count-=30;quests.A8Q5A.unlocked = false; quests.A8Q5B.unlocked = true; createQuest();';
quests.A8Q5A.reward = `"Nanny will appreciate"`;
quests.A8Q5A.icon = "img/src/upgrades/grandma2.jpg";
quests.A8Q5A.unlocked = false;

quests.A8Q5B = {};
quests.A8Q5B.name = 'Turtle My Dear III';
quests.A8Q5B.difficulty = 1;
quests.A8Q5B.description = 'Those are some lovely smelling cookies my dear, but they are not enough';
quests.A8Q5B.objective = `'Hand over 100 Chocolate Chip Cookies <span class="questProgress">'+beautify(items.I14.count)+'/100</span>'`;
quests.A8Q5B.logic = 'items.I14.count>99';
quests.A8Q5B.effect = 'items.I14.count-=100;quests.A8Q5B.unlocked = false; quests.A8Q5C.unlocked = true; createQuest();';
quests.A8Q5B.reward = `"Nanny will appreciate"`;
quests.A8Q5B.icon = "img/src/upgrades/grandma4.jpg";
quests.A8Q5B.unlocked = false;

quests.A8Q5C = {};
quests.A8Q5C.name = 'Turtle My Dear IV';
quests.A8Q5C.difficulty = 1;
quests.A8Q5C.description = 'Grandma will need a few more cookies than that sonny';
quests.A8Q5C.objective = `'Hand over 200 Chocolate Chip Cookies <span class="questProgress">'+beautify(items.I14.count)+'/200</span>'`;
quests.A8Q5C.logic = 'items.I14.count>199';
quests.A8Q5C.effect = 'items.I14.count-=200;quests.A8Q5C.unlocked = false; quests.A8Q5D.unlocked = true; createQuest();';
quests.A8Q5C.reward = `"Nanny will appreciate"`;
quests.A8Q5C.icon = "img/src/upgrades/grandma5.jpg";
quests.A8Q5C.unlocked = false;

quests.A8Q5D = {};
quests.A8Q5D.name = 'Turtle My Dear V';
quests.A8Q5D.difficulty = 1;
quests.A8Q5D.description = 'more';
quests.A8Q5D.objective = `'Hand over 300 Chocolate Chip Cookies <span class="questProgress">'+beautify(items.I14.count)+'/300</span>'`;
quests.A8Q5D.logic = 'items.I14.count>299';
quests.A8Q5D.effect = 'items.I14.count-=300;quests.A8Q5D.unlocked = false; quests.A8Q5E.unlocked = true; createQuest();';
quests.A8Q5D.reward = `"Nanny will appreciate"`;
quests.A8Q5D.icon = "img/src/upgrades/grandma6.jpg";
quests.A8Q5D.unlocked = false;

quests.A8Q5E = {};
quests.A8Q5E.name = 'Turtle My Dear VI';
quests.A8Q5E.difficulty = 1;
quests.A8Q5E.description = 'bake more cookies bake more cookies bake more cookies bake more cookies bake more cookies bake more cookies bake more cookies ';
quests.A8Q5E.objective = `'Hand over 400 Chocolate Chip Cookies <span class="questProgress">'+beautify(items.I14.count)+'/400</span>'`;
quests.A8Q5E.logic = 'items.I14.count>399';
quests.A8Q5E.effect = 'items.I14.count-=400;quests.A8Q5E.unlocked = false; quests.A8Q5F.unlocked = true; createQuest();';
quests.A8Q5E.reward = `"Nanny will appreciate"`;
quests.A8Q5E.icon = "img/src/upgrades/grandma7.jpg";
quests.A8Q5E.unlocked = false;

quests.A8Q5F = {};
quests.A8Q5F.name = 'Turtle My Dear VII';
quests.A8Q5F.difficulty = 1;
quests.A8Q5F.description = 'one last cookie sacrifice';
quests.A8Q5F.objective = `'Hand over 500 Chocolate Chip Cookies <span class="questProgress">'+beautify(items.I14.count)+'/500</span>'`;
quests.A8Q5F.logic = 'items.I14.count>499';
quests.A8Q5F.effect = 'items.I14.count-=500; items.I213.count++; logs.P62.unlocked=true';
quests.A8Q5F.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A8Q5F.icon = "img/src/upgrades/grandma8.jpg";
quests.A8Q5F.unlocked = false;

quests.A8Q6 = {};
quests.A8Q6.name = 'Primal Bones';
quests.A8Q6.difficulty = 1;
quests.A8Q6.description = 'The world of paleontology is wonderful! Discover 5 fossils from these lands.';
quests.A8Q6.objective = `'Discover 5 different fossil collectibles <span class="questProgress">'+collectibles5Got+'/5</span>'`;
quests.A8Q6.logic = 'collectibles5Got>4';
quests.A8Q6.effect = 'items.I358.count++, shopItems.A8S19.unlocked = true; createShopItem()';
quests.A8Q6.reward = `itemIcon("I358")+'Ancient Fossil'`;
quests.A8Q6.icon = "img/src/items/I358.jpg";

quests.A8Q7 = {};
quests.A8Q7.name = 'Lost and Found';
quests.A8Q7.difficulty = 1;
quests.A8Q7.description = 'I\'ve lost my glasses! They are so lost that, in fact, they are probably not even on this whole area!';
quests.A8Q7.objective = `'Hand over the Lost Glasses'`;
quests.A8Q7.logic = 'items.I423.count>0';
quests.A8Q7.effect = 'items.I423.count=0; items.RAN11.count++';
quests.A8Q7.reward = `itemIcon("I349")+'Unlock Ore Node'`;
quests.A8Q7.icon = "img/src/items/I222.jpg";
quests.A8Q7.unlocked = false;

quests.A8Q9 = {};
quests.A8Q9.name = 'Voodoo Request';
quests.A8Q9.difficulty = 4;
quests.A8Q9.description = 'Im missing various cursed items to perform a ritual. Do not worry, the target will not suffer.';
quests.A8Q9.objective = `'Hand over 1K Eerie Mural <span class="questProgress">'+beautify(items.I348.count)+'/1K</span><br>❖ Hand over 5K Ruinous Souls <span class="questProgress">'+beautify(items.I18.count)+'/5K</span><br>❖ Hand over 5K Frog Legs <span class="questProgress">'+beautify(items.I51.count)+'/5K</span>'`;
quests.A8Q9.logic = 'items.I348.count>999 && items.I18.count>4999 && items.I51.count>4999';
quests.A8Q9.effect = 'items.I348.count-=1000; items.I18.count-=5000; items.I51.count-=5000;  items.I389.count++';
quests.A8Q9.reward = `itemIcon("I389")+'Flask of Aspects'`;
quests.A8Q9.icon = "img/src/items/I356.jpg";

quests.A8Q10 = {};
quests.A8Q10.name = 'Tamers of the Guardian';
quests.A8Q10.difficulty = 5;
quests.A8Q10.description = 'Our spirit deity has gone mad after a millenia of slumber. We need a brave turtle to tame it.';
quests.A8Q10.objective = `'Defeat Eis Zeith'`;
quests.A8Q10.logic = 'enemies.E36.killCount>0';
quests.A8Q10.effect = 'items.I213.count++';
quests.A8Q10.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A8Q10.icon = "img/src/items/I357.jpg";

quests.A8Q11 = {};
quests.A8Q11.name = 'Salesman of the Dark';
quests.A8Q11.difficulty = 6;
quests.A8Q11.description = 'Howdy fellow turtle! We are a cult of sinners worshipping a forgotten deity, come visit us soon! Be sure to properly greet our lord!';
quests.A8Q11.objective = `'Clear the Temple of Dusk'`;
quests.A8Q11.logic = 'items.I71.count>599';
quests.A8Q11.effect = 'items.I71.count-=600; items.RAN11.count++';
quests.A8Q11.reward = `itemIcon("I349")+'Unlock Ore Node'`;
quests.A8Q11.icon = "img/src/items/I335.jpg";
quests.A8Q11.unlocked = false;

//area 6

quests.A9Q1 = {};
quests.A9Q1.name = 'Clockwork Troubles';
quests.A9Q1.difficulty = 2;
quests.A9Q1.description = 'Whoever built these robots, they are centuries ahead from a technological perspective! We need to disassemble them.';
quests.A9Q1.objective = `'Hand over 900 Wonder Cogs <span class="questProgress">'+beautify(items.I351.count)+'/900</span>'`;
quests.A9Q1.logic = 'items.I351.count>899';
quests.A9Q1.effect = 'items.I351.count-=900; items.I483.count+=3';
quests.A9Q1.reward = `itemIcon("I483")+'Nature-Infused Tech x3'`;
quests.A9Q1.icon = "img/src/items/I351.jpg";

quests.A9Q2 = {};
quests.A9Q2.name = 'Known Acquaintance';
quests.A9Q2.difficulty = 1;
quests.A9Q2.description = 'If it isnt my favorite turtle! Remember your friend the prince of Nigeria? How about you lend me some more money?';
quests.A9Q2.objective = `'Lend 5M Shells to your friend'`;
quests.A9Q2.logic = 'rpgPlayer.coins>4999999';
quests.A9Q2.effect = 'rpgPlayer.coins-=5000000; items.BR2.count++';
quests.A9Q2.reward = `itemIcon("I180")+'Blueprint: Lumberjack Post'`;
quests.A9Q2.money = 0;
quests.A9Q2.icon = "img/src/icons/coin.png";

quests.A9Q4 = {};
quests.A9Q4.name = 'Golem Mayhem';
quests.A9Q4.difficulty = 3;
quests.A9Q4.description = 'Whatever treasure they are keeping up on this place, they sure are guarding it tight.';
quests.A9Q4.objective = `'Defeat 600 Maholems <span class="questProgress">'+beautify(enemies.E39.killCount)+'/600</span>'`;
quests.A9Q4.logic = 'enemies.E39.killCount>599';
quests.A9Q4.effect = 'areas.A9.unlockedHerb = 1;';
quests.A9Q4.reward = `itemIcon("I355")+'Unlock Foraging Node'`;
quests.A9Q4.icon = "img/src/items/I226.jpg";

quests.A9Q3 = {};
quests.A9Q3.name = 'Turtle Expansion';
quests.A9Q3.difficulty = 1;
quests.A9Q3.description = 'There are enough resources in here to set up structures down the road.';
quests.A9Q3.objective = `'Upgrade the Lumberjack Post in your Garrison to level 5 <span class="questProgress">'+buildings.B1.level+'/5</span>'`;
quests.A9Q3.logic = 'buildings.B1.level>4';
quests.A9Q3.effect = 'items.I486.count+=3;';
quests.A9Q3.reward = `itemIcon("I486")+'Occult-Infused Tech x3'`;
quests.A9Q3.icon = "img/src/icons/garrison.jpg";
if (items.BR2.gotOnce && !buildings.B1.unlocked) {items.BR2.count=1; addItem()}
quests.A9Q5 = {};
quests.A9Q5.name = 'What is in the box?';
quests.A9Q5.difficulty = 1;
quests.A9Q5.description = 'I just need to know';
quests.A9Q5.objective = `'Research what is in the box'`;
quests.A9Q5.logic = 'stats.thebox';
quests.A9Q5.effect = 'items.I171.count++';
quests.A9Q5.reward =  `itemIcon("I171")+'Good Fishing Rod'`;
quests.A9Q5.icon = "img/src/items/I0.jpg";

quests.A9Q6 = {};
quests.A9Q6.name = 'Lab Rat';
quests.A9Q6.difficulty = 4;
quests.A9Q6.description = 'I came up with a device to harness the incredible energy that these magic towers produce. I just need some help.';
quests.A9Q6.objective = `'Hand over a fully charged Magicrilium Recalibrator'`;
quests.A9Q6.logic = 'items.I382.statUp>=100';
quests.A9Q6.effect = 'items.I209.count++; items.I382.count=0';
quests.A9Q6.reward = `itemIcon("I209")+'Ephemeral Time Egg'`;
quests.A9Q6.icon = "img/src/items/I382.jpg";
quests.A9Q6.warning1 = "I209";
quests.A9Q6.warning2 = 1;

quests.A9Q7 = {};
quests.A9Q7.name = 'Peering into the Abyss';
quests.A9Q7.difficulty = 5;
quests.A9Q7.description = 'Oh god what did we awoken.';
quests.A9Q7.objective = `'Defeat Xezdeth'`;
quests.A9Q7.logic = 'enemies.E41.killCount>0';
quests.A9Q7.effect = 'items.I213.count++';
quests.A9Q7.reward = `itemIcon("I213")+'Reality Voxel'`;
quests.A9Q7.icon = "img/src/items/I354.jpg";

quests.A9Q8 = {};
quests.A9Q8.name = 'Angelic Invitation';
quests.A9Q8.difficulty = 5;
quests.A9Q8.description = 'FEEL FREE TO BE INVITED TO OUR TEMPLE OF REDEMPTION, WICKED TURTLE, FOR SINNERS LIKE YOU ARE ALWAYS ALLURED TO SALVATION.';
quests.A9Q8.objective = `'Hand over a fully charged Magicrilium Recalibrator <span class="questProgress">'+beautify(items.I71.count)+'/600</span>'`;
quests.A9Q8.logic = 'items.I71.count>599';
quests.A9Q8.effect = 'items.I71.count-=600; items.RAN11.count++';
quests.A9Q8.reward = ``;
quests.A9Q8.icon = "img/src/items/I204.jpg";
quests.A9Q8.unlocked = false;

quests.A9Q11 = {};
quests.A9Q11.name = 'Salesman of the Dark';
quests.A9Q11.difficulty = 6;
quests.A9Q11.description = 'Howdy fellow turtle! We are a cult of sinners worshipping a forgotten deity, come visit us soon! Be sure to properly greet our lord!';
quests.A9Q11.objective = `'Clear the Temple of Dusk'`;
quests.A9Q11.logic = 'enemies.E49.killCount>0';
quests.A9Q11.effect = 'items.I210.count++';
quests.A9Q11.reward = `itemIcon("I210")+'Perennial Time Egg'`;
quests.A9Q11.icon = "img/src/items/I335.jpg";
quests.A9Q11.warning1 = "I210";
quests.A9Q11.warning2 = 1;

quests.A9Q9 = {};
quests.A9Q9.name = 'Legendary Blade I';
quests.A9Q9.difficulty = 7;
quests.A9Q9.description = 'There are rumors of a legendary blade. Its the dream of all blacksmiths to forge it, but no one knows a clue if it even exists.';
quests.A9Q9.objective = `'Find a clue about the legendary blade'`;
quests.A9Q9.logic = '';
quests.A9Q9.effect = 'items.I71.count-=600; items.RAN11.count++';
quests.A9Q9.reward = `itemIcon("I0")+'Insight about the legendary blade'`;
quests.A9Q9.icon = "img/src/items/I381.jpg";


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
//Smeltery
recipes.SN1 = {};
recipes.SN1.level = 1;
recipes.SN1.exp = 1;
recipes.SN1.timer = 1;
recipes.SN1.item = 'I31';
recipes.SN1.reagent1 = 'I32';
recipes.SN1.amount1 = 4;

recipes.SN2 = {};
recipes.SN2.level = 13;
recipes.SN2.exp = 3;
recipes.SN2.timer = 1;
recipes.SN2.item = 'I35';
recipes.SN2.reagent1 = 'I36';
recipes.SN2.amount1 = 5;

recipes.SN3 = {};
recipes.SN3.level = 20;
recipes.SN3.exp = 4;
recipes.SN3.timer = 1;
recipes.SN3.item = 'I349';
recipes.SN3.reagent1 = 'I417';
recipes.SN3.amount1 = 5;
recipes.SN3.reagent2 = 'I32';
recipes.SN3.amount2 = 1;
recipes.SN3.reagent3 = 'I36';
recipes.SN3.amount3 = 1;


//weapons

recipes.SA1 = {};
recipes.SA1.level = 10;
recipes.SA1.exp = 80;
recipes.SA1.timer = 600;
recipes.SA1.item = 'I80';
recipes.SA1.reagent1 = 'I66';
recipes.SA1.amount1 = 10;
recipes.SA1.reagent2 = 'I22';
recipes.SA1.amount2 = 20;

recipes.SA4 = {};
recipes.SA4.level = 15;
recipes.SA4.exp = 100;
recipes.SA4.timer = 600;
recipes.SA4.item = 'I78';
recipes.SA4.reagent1 = 'I66';
recipes.SA4.amount1 = 10;
recipes.SA4.reagent2 = 'I198';
recipes.SA4.amount2 = 10;
recipes.SA4.reagent3 = 'I418';
recipes.SA4.amount3 = 1;

recipes.SA2 = {};
recipes.SA2.level = 23;
recipes.SA2.exp = 800;
recipes.SA2.timer = 600;
recipes.SA2.item = 'I322';
recipes.SA2.reagent1 = 'I419';
recipes.SA2.amount1 = 40;
recipes.SA2.reagent2 = 'I347';
recipes.SA2.amount2 = 200;
recipes.SA2.reagent3 = 'I359';
recipes.SA2.amount3 = 3;

recipes.SA3 = {};
recipes.SA3.level = 400;
recipes.SA3.exp = 12;
recipes.SA3.timer = 5;
recipes.SA3.item = 'I327';
recipes.SA3.reagent1 = 'I326';
recipes.SA3.amount1 = 10;
recipes.SA3.reagent2 = 'I325';
recipes.SA3.amount2 = 10;
recipes.SA3.reagent3 = 'I390';
recipes.SA3.amount3 = 1;

//Armor

recipes.SG1 = {};
recipes.SG1.description = 'Creates a piece of gear of the Plated Explorer Set';
recipes.SG1.level = 2;
recipes.SG1.exp = 80;
recipes.SG1.timer = 300;
recipes.SG1.item = 'I73';
recipes.SG1.reagent1 = 'I66';
recipes.SG1.amount1 = 10;
recipes.SG1.reagent2 = 'I57';
recipes.SG1.amount2 = 5;
recipes.SG1.reagent3 = 'I114';
recipes.SG1.amount3 = 100;

recipes.SG2 = {};
recipes.SG2.description = 'Creates a piece of gear of the Plated Explorer Set';
recipes.SG2.level = 3;
recipes.SG2.exp = 80;
recipes.SG2.timer = 300;
recipes.SG2.item = 'I74';
recipes.SG2.reagent1 = 'I66';
recipes.SG2.amount1 = 10;
recipes.SG2.reagent2 = 'I57';
recipes.SG2.amount2 = 5;
recipes.SG2.reagent3 = 'I114';
recipes.SG2.amount3 = 100;

recipes.SG3 = {};
recipes.SG3.description = 'Creates a piece of gear of the Plated Explorer Set';
recipes.SG3.level = 4;
recipes.SG3.exp = 80;
recipes.SG3.timer = 300;
recipes.SG3.item = 'I75';
recipes.SG3.reagent1 = 'I66';
recipes.SG3.amount1 = 10;
recipes.SG3.reagent2 = 'I57';
recipes.SG3.amount2 = 5;
recipes.SG3.reagent3 = 'I114';
recipes.SG3.amount3 = 100;

recipes.SG4 = {};
recipes.SG4.description = 'Creates a piece of gear of the Plated Explorer Set';
recipes.SG4.level = 5;
recipes.SG4.exp = 80;
recipes.SG4.timer = 300;
recipes.SG4.item = 'I76';
recipes.SG4.reagent1 = 'I66';
recipes.SG4.amount1 = 10;
recipes.SG4.reagent2 = 'I57';
recipes.SG4.amount2 = 5;
recipes.SG4.reagent3 = 'I114';
recipes.SG4.amount3 = 100;

recipes.SG5 = {};
recipes.SG5.description = 'Creates a piece of gear of the Plated Explorer Set';
recipes.SG5.level = 6;
recipes.SG5.exp = 80;
recipes.SG5.timer = 300;
recipes.SG5.item = 'I77';
recipes.SG5.reagent1 = 'I66';
recipes.SG5.amount1 = 10;
recipes.SG5.reagent2 = 'I57';
recipes.SG5.amount2 = 5;
recipes.SG5.reagent3 = 'I114';
recipes.SG5.amount3 = 100;

recipes.SG6 = {};
recipes.SG6.description = 'Creates a piece of gear of the Spirit Fossil Set';
recipes.SG6.level = 21;
recipes.SG6.exp = 700;
recipes.SG6.timer = 300;
recipes.SG6.item = 'I334';
recipes.SG6.reagent1 = 'I419';
recipes.SG6.amount1 = 30;
recipes.SG6.reagent2 = 'I346';
recipes.SG6.amount2 = 200;
recipes.SG6.reagent3 = 'I100';
recipes.SG6.amount3 = 100;

recipes.SG7 = {};
recipes.SG7.description = 'Creates a piece of gear of the Spirit Fossil Set';
recipes.SG7.level = 22;
recipes.SG7.exp = 700;
recipes.SG7.timer = 300;
recipes.SG7.item = 'I335';
recipes.SG7.reagent1 = 'I419';
recipes.SG7.amount1 = 30;
recipes.SG7.reagent2 = 'I346';
recipes.SG7.amount2 = 200;
recipes.SG7.reagent3 = 'I100';
recipes.SG7.amount3 = 100;

recipes.SG8 = {};
recipes.SG8.description = 'Creates a piece of gear of the Spirit Fossil Set';
recipes.SG8.level = 23;
recipes.SG8.exp = 700;
recipes.SG8.timer = 300;
recipes.SG8.item = 'I336';
recipes.SG8.reagent1 = 'I419';
recipes.SG8.amount1 = 30;
recipes.SG8.reagent2 = 'I346';
recipes.SG8.amount2 = 200;
recipes.SG8.reagent3 = 'I100';
recipes.SG8.amount3 = 100;

recipes.SG9 = {};
recipes.SG9.description = 'Creates a piece of gear of the Spirit Fossil Set';
recipes.SG9.level = 24;
recipes.SG9.exp = 700;
recipes.SG9.timer = 300;
recipes.SG9.item = 'I337';
recipes.SG9.reagent1 = 'I419';
recipes.SG9.amount1 = 30;
recipes.SG9.reagent2 = 'I346';
recipes.SG9.amount2 = 200;
recipes.SG9.reagent3 = 'I100';
recipes.SG9.amount3 = 100;

recipes.SG10 = {};
recipes.SG10.description = 'Creates a piece of gear of the Spirit Fossil Set';
recipes.SG10.level = 25;
recipes.SG10.exp = 700;
recipes.SG10.timer = 300;
recipes.SG10.item = 'I338';
recipes.SG10.reagent1 = 'I419';
recipes.SG10.amount1 = 30;
recipes.SG10.reagent2 = 'I346';
recipes.SG10.amount2 = 200;
recipes.SG10.reagent3 = 'I100';
recipes.SG10.amount3 = 100;


//Alchemy
//Apothecary

recipes.AN1 = {};
recipes.AN1.level = 1;
recipes.AN1.exp = 2;
recipes.AN1.timer = 5;
recipes.AN1.item = 'I68';
recipes.AN1.reagent1 = 'I38';
recipes.AN1.amount1 = 4;

recipes.AN2 = {};
recipes.AN2.level = 2;
recipes.AN2.exp = 4;
recipes.AN2.description = 'Creates a Healing Flask<br>Healing items such as this can only be held 5 at a time';
recipes.AN2.timer = 10;
recipes.AN2.item = 'I19';
recipes.AN2.reagent1 = 'I48';
recipes.AN2.amount1 = 1;
recipes.AN2.reagent2 = 'I68';
recipes.AN2.amount2 = 2;

recipes.AN2A = {};
recipes.AN2A.level = 5;
recipes.AN2A.exp = 6;
recipes.AN2A.timer = 1200;
recipes.AN2A.item = 'I111';
recipes.AN2A.reagent1 = 'I38';
recipes.AN2A.amount1 = 100;

recipes.AN3 = {};
recipes.AN3.level = 20;
recipes.AN3.exp = 5;
recipes.AN3.timer = 5;
recipes.AN3.item = 'I362';
recipes.AN3.reagent1 = 'I355';
recipes.AN3.amount1 = 5;

recipes.AN4A = {};
recipes.AN4A.level = 150;
recipes.AN4A.exp = 100;
recipes.AN4A.timer = 15;
recipes.AN4A.item = 'I280';
recipes.AN4A.reagent1 = 'I48';
recipes.AN4A.amount1 = 1;
recipes.AN4A.reagent2 = 'I68';
recipes.AN4A.amount2 = 10;

//potions

recipes.AA1 = {};
recipes.AA1.level = 3;
recipes.AA1.exp = 9;
recipes.AA1.timer = 15;
recipes.AA1.item = 'I49';
recipes.AA1.reagent1 = 'I48';
recipes.AA1.amount1 = 1;
recipes.AA1.reagent2 = 'I68';
recipes.AA1.amount2 = 2;
recipes.AA1.reagent3 = 'I115';
recipes.AA1.amount3 = 50;

recipes.AA1A = {};
recipes.AA1A.level = 4;
recipes.AA1A.exp = 9;
recipes.AA1A.timer = 15;
recipes.AA1A.item = 'I50';
recipes.AA1A.reagent1 = 'I48';
recipes.AA1A.amount1 = 1;
recipes.AA1A.reagent2 = 'I68';
recipes.AA1A.amount2 = 2;
recipes.AA1A.reagent3 = 'I51';
recipes.AA1A.amount3 = 50;

recipes.AA1B = {};
recipes.AA1B.level = 8;
recipes.AA1B.exp = 10;
recipes.AA1B.timer = 15;
recipes.AA1B.item = 'I154';
recipes.AA1B.reagent1 = 'I48';
recipes.AA1B.amount1 = 1;
recipes.AA1B.reagent2 = 'I68';
recipes.AA1B.amount2 = 2;
recipes.AA1B.reagent3 = 'I16';
recipes.AA1B.amount3 = 50;

recipes.AA1C = {};
recipes.AA1C.level = 14;
recipes.AA1C.exp = 12;
recipes.AA1C.timer = 15;
recipes.AA1C.item = 'I156';
recipes.AA1C.reagent1 = 'I48';
recipes.AA1C.amount1 = 1;
recipes.AA1C.reagent2 = 'I68';
recipes.AA1C.amount2 = 2;
recipes.AA1C.reagent3 = 'I40';
recipes.AA1C.amount3 = 50;

recipes.AA1D = {};
recipes.AA1D.level = 16;
recipes.AA1D.exp = 14;
recipes.AA1D.timer = 15;
recipes.AA1D.item = 'I155';
recipes.AA1D.reagent1 = 'I48';
recipes.AA1D.amount1 = 1;
recipes.AA1D.reagent2 = 'I68';
recipes.AA1D.amount2 = 2;
recipes.AA1D.reagent3 = 'I58';
recipes.AA1D.amount3 = 50;

recipes.AA2 = {};
recipes.AA2.level = 21;
recipes.AA2.exp = 40;
recipes.AA2.timer = 15;
recipes.AA2.item = 'I363';
recipes.AA2.reagent1 = 'I422';
recipes.AA2.amount1 = 1;
recipes.AA2.reagent2 = 'I362';
recipes.AA2.amount2 = 2;
recipes.AA2.reagent3 = 'I159';
recipes.AA2.amount3 = 1;

recipes.AA3 = {};
recipes.AA3.level = 22;
recipes.AA3.exp = 40;
recipes.AA3.timer = 15;
recipes.AA3.item = 'I364';
recipes.AA3.reagent1 = 'I422';
recipes.AA3.amount1 = 1;
recipes.AA3.reagent2 = 'I362';
recipes.AA3.amount2 = 2;
recipes.AA3.reagent3 = 'I352';
recipes.AA3.amount3 = 50;

recipes.AA3A = {};
recipes.AA3A.level = 24;
recipes.AA3A.exp = 40;
recipes.AA3A.timer = 15;
recipes.AA3A.item = 'I365';
recipes.AA3A.reagent1 = 'I422';
recipes.AA3A.amount1 = 1;
recipes.AA3A.reagent2 = 'I362';
recipes.AA3A.amount2 = 2;
recipes.AA3A.reagent3 = 'I353';
recipes.AA3A.amount3 = 50;


/*

recipes.AA5 = {};
recipes.AA5.level = 25;
recipes.AA5.exp = 8;
recipes.AA5.timer = 5;
recipes.AA5.item = 'I366';
recipes.AA5.reagent1 = 'I422';
recipes.AA5.amount1 = 1;
recipes.AA5.reagent2 = 'I362';
recipes.AA5.amount2 = 5;
recipes.AA5.reagent3 = 'I355';
recipes.AA5.amount3 = 5;

*/

//tinctures

recipes.AT1 = {};
recipes.AT1.level = 2;
recipes.AT1.exp = 9;
recipes.AT1.description = 'Creates a Hearty Tincture<br>Only one tincture can be active at a time';
recipes.AT1.timer = 15;
recipes.AT1.item = 'I54';
recipes.AT1.reagent1 = 'I48';
recipes.AT1.amount1 = 1;
recipes.AT1.reagent2 = 'I1';
recipes.AT1.amount2 = 100;
recipes.AT1.reagent3 = 'I68';
recipes.AT1.amount3 = 2;


recipes.AT2 = {};
recipes.AT2.level = 3;
recipes.AT2.exp = 9;
recipes.AT2.timer = 15;
recipes.AT2.item = 'I52';
recipes.AT2.reagent1 = 'I48';
recipes.AT2.amount1 = 1;
recipes.AT2.reagent2 = 'I51';
recipes.AT2.amount2 = 50;
recipes.AT2.reagent3 = 'I115';
recipes.AT2.amount3 = 50;
recipes.AT2.reagent4 = 'I68';
recipes.AT2.amount4 = 5;

recipes.AT3 = {};
recipes.AT3.level = 4;
recipes.AT3.exp = 11;
recipes.AT3.timer = 15;
recipes.AT3.item = 'I110';
recipes.AT3.reagent1 = 'I48';
recipes.AT3.amount1 = 1;
recipes.AT3.reagent2 = 'I38';
recipes.AT3.amount2 = 20;
recipes.AT3.reagent3 = 'I68';
recipes.AT3.amount3 = 5;

recipes.AT4 = {};
recipes.AT4.level = 10;
recipes.AT4.exp = 12;
recipes.AT4.timer = 15;
recipes.AT4.item = 'I188';
recipes.AT4.reagent1 = 'I48';
recipes.AT4.amount1 = 1;
recipes.AT4.reagent2 = 'I17';
recipes.AT4.amount2 = 50;
recipes.AT4.reagent3 = 'I25';
recipes.AT4.amount3 = 50;
recipes.AT4.reagent4 = 'I68';
recipes.AT4.amount4 = 5;

/*
recipes.AT4A = {};
recipes.AT4A.level = 15;
recipes.AT4A.exp = 100;
recipes.AT4A.timer = 20;
recipes.AT4A.item = 'I185';
recipes.AT4A.reagent1 = 'I48';
recipes.AT4A.amount1 = 1;
recipes.AT4A.reagent2 = 'I68';
recipes.AT4A.amount2 = 5;
recipes.AT4A.reagent3 = 'I29';
recipes.AT4A.amount3 = 100;


recipes.AT5 = {};
recipes.AT5.level = 20;
recipes.AT5.exp = 110;
recipes.AT5.timer = 20;
recipes.AT5.item = 'I129';
recipes.AT5.reagent1 = 'I58';
recipes.AT5.amount1 = 100;
recipes.AT5.reagent2 = 'I68';
recipes.AT5.amount2 = 10;
*/

recipes.AT6 = {};
recipes.AT6.level = 17;
recipes.AT6.exp = 10;
recipes.AT6.timer = 15;
recipes.AT6.item = 'I186';
recipes.AT6.reagent1 = 'I48';
recipes.AT6.amount1 = 1;
recipes.AT6.reagent2 = 'I161';
recipes.AT6.amount2 = 20;
recipes.AT6.reagent3 = 'I68';
recipes.AT6.amount3 = 5;

recipes.AT7 = {};
recipes.AT7.level = 18;
recipes.AT7.exp = 11;
recipes.AT7.timer = 15;
recipes.AT7.item = 'I189';
recipes.AT7.reagent1 = 'I48';
recipes.AT7.amount1 = 1;
recipes.AT7.reagent2 = 'I160';
recipes.AT7.amount2 = 20/5;
recipes.AT7.reagent3 = 'I68';
recipes.AT7.amount3 = 5;

recipes.AT8 = {};
recipes.AT8.level = 23;
recipes.AT8.exp = 40;
recipes.AT8.timer = 15;
recipes.AT8.item = 'I367';
recipes.AT8.reagent1 = 'I422';
recipes.AT8.amount1 = 1;
recipes.AT8.reagent2 = 'I362';
recipes.AT8.amount2 = 5;
recipes.AT8.reagent3 = 'I351';
recipes.AT8.amount3 = 100;

recipes.AT9 = {};
recipes.AT9.level = 26;
recipes.AT9.exp = 40;
recipes.AT9.timer = 15;
recipes.AT9.item = 'I368';
recipes.AT9.reagent1 = 'I422';
recipes.AT9.amount1 = 1;
recipes.AT9.reagent2 = 'I362';
recipes.AT9.amount2 = 5;
recipes.AT9.reagent3 = 'I418';
recipes.AT9.amount3 = 1;

/*
recipes.AT10 = {};
recipes.AT10.level = 25;
recipes.AT10.exp = 8;
recipes.AT10.timer = 5;
recipes.AT10.item = 'I369';
recipes.AT10.reagent1 = 'I422';
recipes.AT10.amount1 = 1;
recipes.AT10.reagent2 = 'I362';
recipes.AT10.amount2 = 5;
recipes.AT10.reagent3 = 'I355';
recipes.AT10.amount3 = 5;
recipes.AT10.unlocked = false;
*/



//Engineering
//tinkering table
recipes.EN1 = {};
recipes.EN1.level = 1;
recipes.EN1.exp = 2;
recipes.EN1.timer = 2;
recipes.EN1.item = 'I66';
recipes.EN1.reagent1 = 'I31';
recipes.EN1.amount1 = 2;

recipes.EN2 = {};
recipes.EN2.level = 13;
recipes.EN2.description = "Creates a bunch of Arcanite Bolts";
recipes.EN2.exp = 4;
recipes.EN2.timer = 2;
recipes.EN2.item = 'I198';
recipes.EN2.reagent1 = 'I35';
recipes.EN2.amount1 = 2;

recipes.EN3 = {};
recipes.EN3.level = 25;
recipes.EN3.exp = 10;
recipes.EN3.timer = 2;
recipes.EN3.item = 'I419';
recipes.EN3.reagent1 = 'I349';
recipes.EN3.amount1 = 2;




//GADGETS

recipes.EA1A = {};
recipes.EA1A.level = 5;
recipes.EA1A.exp = 4;
recipes.EA1A.timer = 15;
recipes.EA1A.item = 'I21';
recipes.EA1A.reagent1 = 'I48';
recipes.EA1A.amount1 = 1;
recipes.EA1A.reagent3 = 'I37';
recipes.EA1A.amount3 = 30;

recipes.EA1 = {};
recipes.EA1.level = 16;
recipes.EA1.exp = 10;
recipes.EA1.timer = 15;
recipes.EA1.item = 'I30';
recipes.EA1.reagent1 = 'I66';
recipes.EA1.amount1 = 1;
recipes.EA1.reagent2 = 'I29';
recipes.EA1.amount2 = 30;

recipes.EA2 = {};
recipes.EA2.level = 22;
recipes.EA2.exp = 16;
recipes.EA2.timer = 15;
recipes.EA2.item = 'I179';
recipes.EA2.reagent1 = 'I198';
recipes.EA2.amount1 = 1;
recipes.EA2.reagent2 = 'I29';
recipes.EA2.amount2 = 30;
recipes.EA2.reagent3 = 'I18';
recipes.EA2.amount3 = 30;

recipes.EA3 = {};
recipes.EA3.level = 24;
recipes.EA3.exp = 32;
recipes.EA3.timer = 15;
recipes.EA3.item = 'I187';
recipes.EA3.reagent1 = 'I198';
recipes.EA3.amount1 = 3;
recipes.EA3.reagent2 = 'I100';
recipes.EA3.amount2 = 1;
recipes.EA3.reagent3 = 'I66';
recipes.EA3.amount3 = 5;

recipes.EA4 = {};
recipes.EA4.level = 27;
recipes.EA4.exp = 50;
recipes.EA4.timer = 15;
recipes.EA4.item = 'I163';
recipes.EA4.itemCount = 10;
recipes.EA4.reagent1 = 'I419';
recipes.EA4.amount1 = 2;
recipes.EA4.reagent2 = 'I359';
recipes.EA4.amount2 = 1;



//ACCESORIES

recipes.EI2 = {};
recipes.EI2.level = 10;
recipes.EI2.exp = 70;
recipes.EI2.timer = 600;
recipes.EI2.item = 'I44';
recipes.EI2.reagent1 = 'I66';
recipes.EI2.amount1 = 10;
recipes.EI2.reagent2 = 'I22';
recipes.EI2.amount2 = 50;

recipes.EI1 = {};
recipes.EI1.level = 17;
recipes.EI1.exp = 140;
recipes.EI1.timer = 600;
recipes.EI1.item = 'I45';
recipes.EI1.reagent1 = 'I198';
recipes.EI1.amount1 = 10;
recipes.EI1.reagent2 = 'I42';
recipes.EI1.amount2 = 15;

recipes.EI3 = {};
recipes.EI3.level = 19;
recipes.EI3.exp = 200;
recipes.EI3.timer = 600;
recipes.EI3.item = 'I201';
recipes.EI3.reagent1 = 'I198';
recipes.EI3.amount1 = 10;
recipes.EI3.reagent2 = 'I17';
recipes.EI3.amount2 = 1500;
recipes.EI3.reagent3 = 'I42';
recipes.EI3.amount3 = 10;

recipes.EI4 = {};
recipes.EI4.level = 23;
recipes.EI4.exp = 450;
recipes.EI4.timer = 600;
recipes.EI4.item = 'I182';
recipes.EI4.reagent1 = 'I198';
recipes.EI4.amount1 = 10;
recipes.EI4.reagent2 = 'I71';
recipes.EI4.amount2 = 500;
recipes.EI4.reagent3 = 'I22';
recipes.EI4.amount3 = 100;

recipes.EI6 = {};
recipes.EI6.level = 350;
recipes.EI6.exp = 12;
recipes.EI6.timer = 5;
recipes.EI6.item = 'I373';
recipes.EI6.reagent1 = 'I374';
recipes.EI6.amount1 = 5;
recipes.EI6.reagent2 = 'I348';
recipes.EI6.amount2 = 100;
recipes.EI6.reagent3 = 'I418';
recipes.EI6.amount3 = 5;


//gemcutting

recipes.EG1 = {};
recipes.EG1.level = 12;
recipes.EG1.exp = 10;
recipes.EG1.timer = 120;
recipes.EG1.item = 'I194';
recipes.EG1.reagent1 = 'I22';
recipes.EG1.amount1 = 1;

recipes.EG2 = {};
recipes.EG2.level = 20;
recipes.EG2.exp = 20;
recipes.EG2.timer = 120;
recipes.EG2.item = 'I195';
recipes.EG2.reagent1 = 'I42';
recipes.EG2.amount1 = 1;

recipes.EG3 = {};
recipes.EG3.level = 24;
recipes.EG3.exp = 30;
recipes.EG3.timer = 120;
recipes.EG3.item = 'I196';
recipes.EG3.reagent1 = 'I418';
recipes.EG3.amount1 = 1;

recipes.EG4 = {};
recipes.EG4.level = 28;
recipes.EG4.exp = 40;
recipes.EG4.timer = 120;
recipes.EG4.item = 'I197';
recipes.EG4.reagent1 = 'I359';
recipes.EG4.amount1 = 1;


//eengineering keys

recipes.EK1 = {};
recipes.EK1.description = 'Creates a Copper Key<br>Can be used to open Small Wooden Lockboxes';
recipes.EK1.level = 2;
recipes.EK1.exp = 5;
recipes.EK1.timer = 2;
recipes.EK1.item = 'I41';
recipes.EK1.reagent1 = 'I66';
recipes.EK1.amount1 = 1;

recipes.EK2 = {};
recipes.EK2.level = 15;
recipes.EK2.exp = 10;
recipes.EK2.timer = 2;
recipes.EK2.item = 'I46';
recipes.EK2.reagent1 = 'I198';
recipes.EK2.amount1 = 1;
recipes.EK2.reagent2 = 'I165';
recipes.EK2.amount2 = 2;

recipes.EK3 = {};
recipes.EK3.level = 26;
recipes.EK3.exp = 30;
recipes.EK3.timer = 2;
recipes.EK3.item = 'I400';
recipes.EK3.reagent1 = 'I419';
recipes.EK3.amount1 = 1;



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
jobs.blacksmith.title = 'Blacksmith';
jobs.blacksmith.exp = 0;
jobs.blacksmith.maxExp = 30;

jobs.cooking = {};
jobs.cooking.level = 1;
jobs.cooking.title = 'Cooking';
jobs.cooking.exp = 0;
jobs.cooking.maxExp = 30;

jobs.alchemy = {};
jobs.alchemy.level = 1;
jobs.alchemy.title = 'Alchemy';
jobs.alchemy.exp = 0;
jobs.alchemy.maxExp = 30;

jobs.engineering = {};
jobs.engineering.level = 1;
jobs.engineering.title = 'Engineering';
jobs.engineering.exp = 0;
jobs.engineering.maxExp = 30;

var jobPanels = {}

jobPanels.SN = {}
jobPanels.SN.name = 'Smeltery';
jobPanels.SN.hidden = false; //this checks for contrapted category
jobPanels.SN.unlocked = true;
jobPanels.SN.category = 'blacksmithRecipes';
jobPanels.SN.icon = 'I53';

jobPanels.SA = {}
jobPanels.SA.name = 'Weapons';
jobPanels.SA.hidden = false; 
jobPanels.SA.unlocked = true;
jobPanels.SA.category = 'blacksmithRecipes';
jobPanels.SA.icon = 'I82';

jobPanels.SG = {}
jobPanels.SG.name = 'Armor';
jobPanels.SG.hidden = false; 
jobPanels.SG.unlocked = true;
jobPanels.SG.category = 'blacksmithRecipes';
jobPanels.SG.icon = 'I86';

jobPanels.AN = {}
jobPanels.AN.name = 'Apothecary';
jobPanels.AN.hidden = false;
jobPanels.AN.unlocked = true;
jobPanels.AN.category = 'alchemyRecipes';
jobPanels.AN.icon = 'I67';

jobPanels.AA = {}
jobPanels.AA.name = 'Potions';
jobPanels.AA.hidden = false; //this checks for contrapted category
jobPanels.AA.unlocked = true;
jobPanels.AA.category = 'alchemyRecipes';
jobPanels.AA.icon = 'I365';

jobPanels.AT = {}
jobPanels.AT.name = 'Tinctures';
jobPanels.AT.hidden = false;
jobPanels.AT.unlocked = true;
jobPanels.AT.category = 'alchemyRecipes';
jobPanels.AT.icon = 'I54';

jobPanels.AS = {}
jobPanels.AS.name = 'Item Synthesis';
jobPanels.AS.hidden = false;
jobPanels.AS.unlocked = false;
jobPanels.AS.category = 'alchemyRecipes';
jobPanels.AS.icon = 'I300';

jobPanels.EN = {}
jobPanels.EN.name = 'Tinkering Table';
jobPanels.EN.hidden = false;
jobPanels.EN.unlocked = true;
jobPanels.EN.category = 'engineeringRecipes';
jobPanels.EN.icon = 'I283';

jobPanels.EA = {}
jobPanels.EA.name = 'Gadgets';
jobPanels.EA.hidden = false; //this checks for contrapted category
jobPanels.EA.unlocked = true;
jobPanels.EA.category = 'engineeringRecipes';
jobPanels.EA.icon = 'I382';

jobPanels.EI = {}
jobPanels.EI.name = 'Accessories';
jobPanels.EI.hidden = false;
jobPanels.EI.unlocked = true;
jobPanels.EI.category = 'engineeringRecipes';
jobPanels.EI.icon = 'I44';

jobPanels.EG = {}
jobPanels.EG.name = 'Gemcutting';
jobPanels.EG.hidden = false;
jobPanels.EG.unlocked = true;
jobPanels.EG.category = 'engineeringRecipes';
jobPanels.EG.icon = 'I194';

jobPanels.EK = {}
jobPanels.EK.name = 'Keys';
jobPanels.EK.hidden = false;
jobPanels.EK.unlocked = true;
jobPanels.EK.category = 'engineeringRecipes';
jobPanels.EK.icon = 'I41';

jobPanels.EM = {}
jobPanels.EM.name = 'Monster Evolution';
jobPanels.EM.hidden = false;
jobPanels.EM.unlocked = false;
jobPanels.EM.category = 'engineeringRecipes';
jobPanels.EM.icon = 'I397';


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
shopItems.A1S1.price = 1000;
shopItems.A1S1.stock = "∞";
//shopItems.A1S1.unlocked = false;

shopItems.A1S2A = {}
shopItems.A1S2A.item = 'I8';
shopItems.A1S2A.price = 1000;
shopItems.A1S2A.stock = "∞";

shopItems.A1S2 = {}
shopItems.A1S2.item = 'I9';
shopItems.A1S2.price = 1000;
shopItems.A1S2.stock = "∞";

shopItems.A1S3 = {}
shopItems.A1S3.item = 'I11';
shopItems.A1S3.price = 7000;
shopItems.A1S3.stock = "∞";

shopItems.A1S4 = {}
shopItems.A1S4.item = 'I41';
shopItems.A1S4.price = 1000;
shopItems.A1S4.stock = 10;
shopItems.A1S4.restock = 10;

shopItems.A1S6 = {}
shopItems.A1S6.item = 'I113';
shopItems.A1S6.price = 15000;
shopItems.A1S6.stock = 1;

shopItems.A1S6A = {}
shopItems.A1S6A.item = 'I435';
shopItems.A1S6A.price = 3000;
shopItems.A1S6A.stock = 1;

shopItems.A1S7 = {}
shopItems.A1S7.item = 'I7';
shopItems.A1S7.price = 1000;
shopItems.A1S7.stock = "∞";

shopItems.A1S9 = {}
shopItems.A1S9.item = 'I104';
shopItems.A1S9.price = 5000;
shopItems.A1S9.stock = 1;

shopItems.A1S10 = {}
shopItems.A1S10.item = 'I89';
shopItems.A1S10.price = materialPrice;
shopItems.A1S10.stock = "∞";
shopItems.A1S10.restock = 5;

shopItems.A1S11 = {}
shopItems.A1S11.item = 'I176';
shopItems.A1S11.price = 5000;
shopItems.A1S11.stock = "∞";

shopItems.A1S12 = {}
shopItems.A1S12.item = 'I84';
shopItems.A1S12.price = 25000;
shopItems.A1S12.stock = "∞";

shopItems.A1S13 = {}
shopItems.A1S13.item = 'I3';
shopItems.A1S13.price = 100;
shopItems.A1S13.stock = "∞";

shopItems.A1S14 = {}
shopItems.A1S14.item = 'I5';
shopItems.A1S14.price = 100;
shopItems.A1S14.stock = "∞";

shopItems.A1S15 = {}
shopItems.A1S15.item = 'I4';
shopItems.A1S15.price = 100;
shopItems.A1S15.stock = "∞";

shopItems.A1S16 = {}
shopItems.A1S16.item = 'I6';
shopItems.A1S16.price = 100;
shopItems.A1S16.stock = "∞";

shopItems.A1S17 = {}
shopItems.A1S17.item = 'I2';
shopItems.A1S17.price = 100;
shopItems.A1S17.stock = "∞";

//area 2

shopItems.A2S1 = {}
shopItems.A2S1.item = 'I1';
shopItems.A2S1.price = materialPrice;
shopItems.A2S1.stock = 200;
shopItems.A2S1.restock = 200;

shopItems.A2S4 = {}
shopItems.A2S4.item = 'I116';
shopItems.A2S4.price = 85000;
shopItems.A2S4.stock = "∞";

shopItems.A2S5 = {}
shopItems.A2S5.item = 'I121';
shopItems.A2S5.price = 5000;
shopItems.A2S5.stock = 10;

shopItems.A2S7 = {}
shopItems.A2S7.item = 'I124';
shopItems.A2S7.price = 200000;
shopItems.A2S7.stock = 1;

shopItems.A2S8 = {}
shopItems.A2S8.item = 'I125';
shopItems.A2S8.price = 400000;
shopItems.A2S8.stock = 1;
/*
shopItems.A2S9 = {}
shopItems.A2S9.item = 'I34';
shopItems.A2S9.price = 70000;
shopItems.A2S9.stock = 1;
*/
shopItems.A2S10 = {}
shopItems.A2S10.item = 'I48';
shopItems.A2S10.price = 500;
shopItems.A2S10.stock = "∞";

shopItems.A2S11 = {}
shopItems.A2S11.item = 'I37';
shopItems.A2S11.price = materialPrice;
shopItems.A2S11.stock = 200;
shopItems.A2S11.restock = 200;

shopItems.A2S13 = {}
shopItems.A2S13.item = 'I51';
shopItems.A2S13.price = materialPrice;
shopItems.A2S13.stock = 200;
shopItems.A2S13.restock = 200;

shopItems.A2S15 = {}
shopItems.A2S15.item = 'I311';
shopItems.A2S15.price = 1;
shopItems.A2S15.currency = "I93";
shopItems.A2S15.stock = "∞";


//area 3

shopItems.A3S1 = {}
shopItems.A3S1.item = 'I70';
shopItems.A3S1.price = 200000;
shopItems.A3S1.stock = 1;

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

shopItems.A3S6 = {}
shopItems.A3S6.item = 'I128';
shopItems.A3S6.price = 555000;
shopItems.A3S6.stock = 1;

shopItems.A3S7 = {}
shopItems.A3S7.item = 'I222';
shopItems.A3S7.price = 22000;
shopItems.A3S7.stock = 1;

shopItems.A3S9 = {}
shopItems.A3S9.item = 'I299';
shopItems.A3S9.price = 10000;
shopItems.A3S9.stock = "∞";

/*
shopItems.A3S10 = {}
shopItems.A3S10.item = 'I0';
shopItems.A3S10.price = 20000;
shopItems.A3S10.stock = 10;
shopItems.A3S10.restock = 10;
*/ 


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

shopItems.A3S9 = {}
shopItems.A3S9.item = 'I299';
shopItems.A3S9.price = 10000;
shopItems.A3S9.stock = "∞";

shopItems.A3S9A = {}
shopItems.A3S9A.item = 'I55';
shopItems.A3S9A.price = 400000;
shopItems.A3S9A.stock = "∞";

shopItems.A3S9B = {}
shopItems.A3S9B.item = 'I438';
shopItems.A3S9B.price = 50000;
shopItems.A3S9B.stock = "3";

shopItems.A3S9C = {}
shopItems.A3S9C.item = 'I437';
shopItems.A3S9C.price = 50000;
shopItems.A3S9C.stock = "3";

shopItems.A3S16 = {}
shopItems.A3S16.item = 'I85';
shopItems.A3S16.price = 300000;
shopItems.A3S16.stock = "∞";
shopItems.A3S16.unlocked = false;
shopItems.A3S16.unlockDescription = bestiaryTag('Clear "Harder Than Rock" to unlock', '#CE4447');

shopItems.A3S22 = {}
shopItems.A3S22.item = 'I166';
shopItems.A3S22.price = 1200;
shopItems.A3S22.currency = "I310";
shopItems.A3S22.stock = "∞";
shopItems.A3S22.unlocked = false;
shopItems.A3S22.unlockDescription = bestiaryTag('Clear the Penguin Glacier dungeon to unlock', '#CE4447');

shopItems.A3S18 = {}
shopItems.A3S18.item = 'I434';
shopItems.A3S18.price = 40;
shopItems.A3S18.currency = "I310";
shopItems.A3S18.stock = "∞";
shopItems.A3S18.unlocked = false;
shopItems.A3S18.unlockDescription = bestiaryTag('Clear the Penguin Glacier dungeon to unlock', '#CE4447');

shopItems.A3S19 = {}
shopItems.A3S19.item = 'I435';
shopItems.A3S19.price = 40;
shopItems.A3S19.currency = "I310";
shopItems.A3S19.stock = "∞";
shopItems.A3S19.unlocked = false;
shopItems.A3S19.unlockDescription = bestiaryTag('Clear the Penguin Glacier dungeon to unlock', '#CE4447');


//area 4

shopItems.A4S1 = {}
shopItems.A4S1.item = 'I162';
shopItems.A4S1.price = 600000;
shopItems.A4S1.stock = "∞";

shopItems.A4S2 = {}
shopItems.A4S2.item = 'I181';
shopItems.A4S2.price = 15000;
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

shopItems.A4S6 = {}
shopItems.A4S6.item = 'I202';
shopItems.A4S6.price = 3000000;
shopItems.A4S6.stock = "1";
*/
shopItems.A4S7 = {}
shopItems.A4S7.item = 'I63';
shopItems.A4S7.price = 5000000;
shopItems.A4S7.stock = "∞";

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

shopItems.A4S14 = {}
shopItems.A4S14.item = 'I436';
shopItems.A4S14.price = 80;
shopItems.A4S14.currency = "I39";
shopItems.A4S14.stock = "∞";
shopItems.A4S14.unlocked = false;
shopItems.A4S14.unlockDescription = bestiaryTag('Clear the Pirate Galleon dungeon to unlock', '#CE4447');

shopItems.A4S15 = {}
shopItems.A4S15.item = 'I437';
shopItems.A4S15.price = 80;
shopItems.A4S15.currency = "I39";
shopItems.A4S15.stock = "∞";
shopItems.A4S15.unlocked = false;
shopItems.A4S15.unlockDescription = bestiaryTag('Clear the Pirate Galleon dungeon to unlock', '#CE4447');

shopItems.A4S16 = {}
shopItems.A4S16.item = 'I438';
shopItems.A4S16.price = 80;
shopItems.A4S16.currency = "I39";
shopItems.A4S16.stock = "∞";
shopItems.A4S16.unlocked = false;
shopItems.A4S16.unlockDescription = bestiaryTag('Clear the Pirate Galleon dungeon to unlock', '#CE4447');

shopItems.A4S20 = {}
shopItems.A4S20.item = 'I168';
shopItems.A4S20.price = 2400;
shopItems.A4S20.currency = "I39";
shopItems.A4S20.stock = "∞";
shopItems.A4S20.unlocked = false;
shopItems.A4S20.unlockDescription = bestiaryTag('Clear the Pirate Galleon dungeon to unlock', '#CE4447');

//area 5


shopItems.A8S2A = {}
shopItems.A8S2A.item = 'I387';
shopItems.A8S2A.price = 3000000;
shopItems.A8S2A.stock = "∞";
shopItems.A8S2A.unlocked = false;
shopItems.A8S2A.unlockDescription = bestiaryTag('Complete "Scientific Method" to unlock', '#CE4447');

shopItems.A8S4 = {}
shopItems.A8S4.item = 'I40';
shopItems.A8S4.price = materialPrice;
shopItems.A8S4.stock = 200;
shopItems.A8S4.restock = 200;

shopItems.A8S5 = {}
shopItems.A8S5.item = 'I58';
shopItems.A8S5.price = materialPrice;
shopItems.A8S5.stock = 200;
shopItems.A8S5.restock = 200;

shopItems.A8S6 = {}
shopItems.A8S6.item = 'I18';
shopItems.A8S6.price = materialPrice;
shopItems.A8S6.stock = 200;
shopItems.A8S6.restock = 200;
/*
shopItems.A8S7 = {}
shopItems.A8S7.item = 'I401';
shopItems.A8S7.price = 30000000;
shopItems.A8S7.stock = "1";
*/
shopItems.A8S9 = {}
shopItems.A8S9.item = 'I400';
shopItems.A8S9.price = 100000;
shopItems.A8S9.stock = "10";

shopItems.A8S10 = {}
shopItems.A8S10.item = 'I363';
shopItems.A8S10.price = 300000;
shopItems.A8S10.stock = "5";

shopItems.A8S11 = {}
shopItems.A8S11.item = 'I364';
shopItems.A8S11.price = 300000;
shopItems.A8S11.stock = "5";

shopItems.A8S12 = {}
shopItems.A8S12.item = 'I380';
shopItems.A8S12.price = 55000;
shopItems.A8S12.stock = "1";
/*
shopItems.A8S13 = {}
shopItems.A8S13.item = 'I64';
shopItems.A8S13.price = 2400;
shopItems.A8S13.currency = "I313";
shopItems.A8S13.stock = "∞";
shopItems.A8S13.unlocked = false;
shopItems.A8S13.unlockDescription = bestiaryTag('Clear the Temple of the Duck to unlock', '#CE4447');
*/
shopItems.A8S19 = {}
shopItems.A8S19.item = 'I358';
shopItems.A8S19.price = 100000;
shopItems.A8S19.stock = "∞";
shopItems.A8S19.restock = "∞";
shopItems.A8S19.unlocked = false;
shopItems.A8S19.unlockDescription = bestiaryTag('Complete "Primal Bones" to unlock', '#CE4447');

shopItems.A8S20 = {}
shopItems.A8S20.item = 'I219';
shopItems.A8S20.price = 1000000;
shopItems.A8S20.stock = "3";


//area 6

shopItems.A9S1N = {}
shopItems.A9S1N.item = 'I20';
shopItems.A9S1N.price = 3500000;
shopItems.A9S1N.stock = "∞";

shopItems.A9S4 = {}
shopItems.A9S4.item = 'I347';
shopItems.A9S4.price = materialPrice;
shopItems.A9S4.stock = 200;
shopItems.A9S4.restock = 200;

shopItems.A9S5 = {}
shopItems.A9S5.item = 'I348';
shopItems.A9S5.price = materialPrice;
shopItems.A9S5.stock = 200;
shopItems.A9S5.restock = 200;

shopItems.A9S5A = {}
shopItems.A9S5A.item = 'I382';
shopItems.A9S5A.price = 550000;
shopItems.A9S5A.stock = 1;


shopItems.A9S3 = {}
shopItems.A9S3.item = 'I346';
shopItems.A9S3.price = materialPrice;
shopItems.A9S3.stock = 200;
shopItems.A9S3.restock = 200;

shopItems.A9S6 = {}
shopItems.A9S6.item = 'I422';
shopItems.A9S6.price = 25000;
shopItems.A9S6.stock = "∞";

shopItems.A9S7 = {}
shopItems.A9S7.item = 'I434';
shopItems.A9S7.price = 80;
shopItems.A9S7.currency = "I313";
shopItems.A9S7.stock = "∞";
shopItems.A9S7.unlocked = false;
shopItems.A9S7.unlockDescription = bestiaryTag('Clear the Temple of Dusk dungeon to unlock', '#CE4447');

shopItems.A9S8 = {}
shopItems.A9S8.item = 'I435';
shopItems.A9S8.price = 80;
shopItems.A9S8.currency = "I313";
shopItems.A9S8.stock = "∞";
shopItems.A9S8.unlocked = false;
shopItems.A9S8.unlockDescription = bestiaryTag('Clear the Temple of Dusk dungeon to unlock', '#CE4447');

shopItems.A9S9 = {}
shopItems.A9S9.item = 'I436';
shopItems.A9S9.price = 80;
shopItems.A9S9.currency = "I313";
shopItems.A9S9.stock = "∞";
shopItems.A9S9.unlocked = false;
shopItems.A9S9.unlockDescription = bestiaryTag('Clear the Temple of Duck dungeon to unlock', '#CE4447');

shopItems.A9S10 = {}
shopItems.A9S10.item = 'I437';
shopItems.A9S10.price = 80;
shopItems.A9S10.currency = "I313";
shopItems.A9S10.stock = "∞";
shopItems.A9S10.unlocked = false;
shopItems.A9S10.unlockDescription = bestiaryTag('Clear the Temple of Dusk dungeon to unlock', '#CE4447');

shopItems.A9S11 = {}
shopItems.A9S11.item = 'I438';
shopItems.A9S11.price = 80;
shopItems.A9S11.currency = "I313";
shopItems.A9S11.stock = "∞";
shopItems.A9S11.unlocked = false;
shopItems.A9S11.unlockDescription = bestiaryTag('Clear the Temple of Dusk dungeon to unlock', '#CE4447');



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
logs.L1P1.logic = 'stats.logsGot>9';
logs.L1P1.tag = '📕';

logs.L1P2 = {}
logs.L1P2.name = "Big Brain";
logs.L1P2.description = "Collect 25 Books";
logs.L1P2.hint = '"Oh yeah it is time."';
logs.L1P2.logic = 'stats.logsGot>24';
logs.L1P2.tag = '📕';

logs.L1P3 = {}
logs.L1P3.name = "Knowledge Garden";
logs.L1P3.description = "Collect 50 Books";
logs.L1P3.hint = '"Have you been studying a lot?"';
logs.L1P3.logic = 'stats.logsGot>49';
logs.L1P3.tag = '📕';

logs.L1P3A = {}
logs.L1P3A.name = "Final Eden";
logs.L1P3A.description = "Collect 80 Books";
logs.L1P3A.hint = '"And this will be my last one."';
logs.L1P3A.logic = 'stats.logsGot>79';
logs.L1P3A.tag = '📕';

logs.L1P3B = {}
logs.L1P3B.name = "Library of Babel";
logs.L1P3B.description = "Collect 100 Books";
logs.L1P3B.hint = '"Well alright I lied."';
logs.L1P3B.logic = 'stats.logsGot>99';
logs.L1P3B.tag = '📕';

logs.L1P3C = {}
logs.L1P3C.name = "Library of Ruina";
logs.L1P3C.description = "Collect 120 Books";
logs.L1P3C.hint = '"The real ruina is going to be fitting all of these on the shelf."';
logs.L1P3C.logic = 'stats.logsGot>119';
logs.L1P3C.tag = '📕';

logs.L1P4 = {}
logs.L1P4.name = "Nice.";
logs.L1P4.description = "Deal exactly 69 damage";
logs.L1P4.hint = '"Nice."';
logs.L1P4.tag = '♋';

logs.L1P4A1 = {}
logs.L1P4A1.name = "Not Nice";
logs.L1P4A1.description = "Deal exactly 0 damage";
logs.L1P4A1.hint = '"So did I missed or?"';
logs.L1P4A1.tag = '♋';

logs.L1P4A = {}
logs.L1P4A.name = "Small Fortune";
logs.L1P4A.description = "Obtain 10K Total Shells<FONT COLOR='gray'> (Only the TOTAL COINS GAINED on the statistics panel will count)";
logs.L1P4A.hint = '"Not decided yet on what to spend it on."';
logs.L1P4A.logic = 'stats.totalCoins>10000';
logs.L1P4A.tag = '💰';

logs.L1P4B = {}
logs.L1P4B.name = "Here Comes The Money";
logs.L1P4B.description = "Obtain 100K Total Shells";
logs.L1P4B.hint = '"Money talk."';
logs.L1P4B.logic = 'stats.totalCoins>100000';
logs.L1P4B.tag = '💰';

logs.L1P4C = {}
logs.L1P4C.name = "Bury Me With...";
logs.L1P4C.description = "Obtain 1M Total Shells";
logs.L1P4C.hint = '"...........my mone."';
logs.L1P4C.logic = 'stats.totalCoins>1000000';
logs.L1P4C.tag = '💰';

logs.L1P4D = {}
logs.L1P4D.name = "Tax Fraud";
logs.L1P4D.description = "Obtain 10M Total Shells";
logs.L1P4D.hint = '"Turtles can\'t possibly go to jail."';
logs.L1P4D.logic = 'stats.totalCoins>10000000';
logs.L1P4D.tag = '💰';

logs.L1P4E = {}
logs.L1P4E.name = "Tortullionaire";
logs.L1P4E.description = "Obtain 100M Total Shells";
logs.L1P4E.hint = '"Look it up, its a real word."';
logs.L1P4E.logic = 'stats.totalCoins>100000000';
logs.L1P4E.tag = '💰';

logs.L1P5 = {}
logs.L1P5.name = "Beginner Adventurer";
logs.L1P5.description = "Complete 5 Quests";
logs.L1P5.hint = '"I\'m Ready! I\'m Ready! I\'m Ready! I\'m Ready!"';
logs.L1P5.logic = 'stats.questsCompleted>4';
logs.L1P5.tag = '📜';

logs.L1P6 = {}
logs.L1P6.name = "Advanced Adventurer";
logs.L1P6.description = "Complete 10 Quests";
logs.L1P6.hint = '"I really was ready."';
logs.L1P6.logic = 'stats.questsCompleted>9';
logs.L1P6.tag = '📜';

logs.L1P7 = {}
logs.L1P7.name = "Master Adventurer";
logs.L1P7.description = "Complete 25 Quests";
logs.L1P7.hint = '"Peraphs too ready."';
logs.L1P7.logic = 'stats.questsCompleted>24';
logs.L1P7.tag = '📜';

logs.L1P7A = {}
logs.L1P7A.name = "Helping Hand";
logs.L1P7A.description = "Complete 35 Quests";
logs.L1P7A.hint = '"And the tortuga has four of them."';
logs.L1P7A.logic = 'stats.questsCompleted>34';
logs.L1P7A.tag = '📜';

logs.L1P7A = {}
logs.L1P7A.name = "Lending a Cat Paw";
logs.L1P7A.description = "Complete 50 Quests";
logs.L1P7A.hint = '"A turtle will do."';
logs.L1P7A.logic = 'stats.questsCompleted>49';
logs.L1P7A.tag = '📜';

logs.L1P8 = {}
logs.L1P8.name = "Arachnophobia";
logs.L1P8.description = "Defeat Hoopperoona";
logs.L1P8.hint = '"Turtles and spiders were never meant to be friends."';
logs.L1P8.insight = 5;
logs.L1P8.logic = 'enemies.E4.killCount>0';
logs.L1P8.tag = '🕷️';

logs.L1P9 = {}
logs.L1P9.name = "Fight Poison With Poison";
logs.L1P9.description = "Poison Hoopperoona";
logs.L1P9.hint = '"Feels good man."';
logs.L1P9.logic = "stats.currentEnemy==='E4' && (buffs.B2.time>0 || buffs.B54.time>0 )";
logs.L1P9.tag = '🕷️';

logs.L1P10 = {}
logs.L1P10.name = "Whatever Did We Do?";
logs.L1P10.description = "Check out the Discord";
logs.L1P10.hint = '"Everyone is invited c:"';
logs.L1P10.logic = 'logTrackClickDiscord';
logs.L1P10.tag = '💬';

logs.L1P11 = {}
logs.L1P11.name = "Power Surge";
logs.L1P11.description = "Reach level 10";
logs.L1P11.hint = '"First of many."';
logs.L1P11.logic = 'rpgClass[stats.currentClass].level>9';
logs.L1P11.tag = '⚜️';

logs.L1P12 = {}
logs.L1P12.name = "Path of the Hero";
logs.L1P12.description = "Reach level 20";
logs.L1P12.hint = '"And they don\'t stop coming..."';
logs.L1P12.logic = 'rpgClass[stats.currentClass].level>19';
logs.L1P12.tag = '⚜️';

logs.L1P13 = {}
logs.L1P13.name = "Potential Overflow";
logs.L1P13.description = "Reach level 30";
logs.L1P13.hint = '"And this... Is to go further beyond."';
logs.L1P13.logic = 'rpgClass[stats.currentClass].level>29';
logs.L1P13.tag = '⚜️';

logs.L1P13A = {}
logs.L1P13A.name = "New Heights";
logs.L1P13A.description = "Reach level 40";
logs.L1P13A.hint = '"Much wiser through the years."';
logs.L1P13A.logic = 'rpgClass[stats.currentClass].level>39';
logs.L1P13A.tag = '⚜️';

logs.L1P13B = {}
logs.L1P13B.name = "The Last Frontier";
logs.L1P13B.description = "Reach level 50";
logs.L1P13B.hint = '"And its not Space"';
logs.L1P13B.logic = 'rpgClass[stats.currentClass].level>49';
logs.L1P13B.tag = '⚜️';

logs.L1P13D = {}
logs.L1P13D.name = "Transcendence";
logs.L1P13D.description = "Reach level 60";
logs.L1P13D.hint = '"Thats what comes after ascendence."';
logs.L1P13D.logic = 'rpgClass[stats.currentClass].level>59';
logs.L1P13D.tag = '⚜️';

logs.L1P14 = {}
logs.L1P14.name = "You Shall be Known as...";
logs.L1P14.description = "Change the name of your turtle";
logs.L1P14.hint = '"Let your voice be heard."';
logs.L1P14.logic = "logTrackName!=='base'";
logs.L1P14.tag = '✒️';

logs.L1P15 = {}
logs.L1P15.name = "Back in Black";
logs.L1P15.description = "Change the name of your turtle back to Jeffrey";
logs.L1P15.hint = '"It\'s like he never left..."';
logs.L1P15.logic = "logTrackName==='jeffrey' || logTrackName==='Jeffrey'";
logs.L1P15.tag = '✒️';

logs.L1P15A = {}
logs.L1P15A.name = "Impostor Syndrome";
logs.L1P15A.description = "Change the name of your turtle to Duck";
logs.L1P15A.hint = '"Besides the fact that you got the wrong animal"';
logs.L1P15A.logic = "logTrackName==='duck' || logTrackName==='Duck'";
logs.L1P15A.tag = '✒️';

logs.L1P16 = {}
logs.L1P16.name = "So I Just Need To Let It Run?";
logs.L1P16.description = "Play for 10 hours";
logs.L1P16.hint = '"Gameplay."';
logs.L1P16.logic = 'stats.activeSeconds>36000';
logs.L1P16.tag = '⌛';

logs.L1P17 = {}
logs.L1P17.name = "Turtle Rabbithole";
logs.L1P17.description = "Play for 50 hours";
logs.L1P17.hint = '"Where will it take me?"';
logs.L1P17.logic = 'stats.activeSeconds>180000';
logs.L1P17.tag = '⌛';

logs.L1P18 = {}
logs.L1P18.name = "I Can Stop Whenever I want";
logs.L1P18.description = "Play for 100 hours";
logs.L1P18.hint = '"I just don\'t want to."';
logs.L1P18.logic = 'stats.activeSeconds>360000';
logs.L1P18.tag = '⌛';

logs.L1P18A = {}
logs.L1P18A.name = "Or Maybe Not?";
logs.L1P18A.description = "Play for 200 hours";
logs.L1P18A.hint = '"But the new update..."';
logs.L1P18A.logic = 'stats.activeSeconds>720000';
logs.L1P18A.tag = '⌛';

logs.L1P19 = {}
logs.L1P19.name = "Pat Pat Pat Pat Pat";
logs.L1P19.description = "Click the turtle 10000 times";
logs.L1P19.hint = "'pat pat pat pat pat pat pat pat pat'";
logs.L1P19.logic = 'stats.clickCount>9999';
logs.L1P19.tag = '✋';

logs.L1P20 = {}
logs.L1P20.name = "Quack.";
logs.L1P20.description = "Click the hidden duck";
logs.L1P20.hint = '"That\'s not the animal you want to click."';
logs.L1P20.logic = 'logTrackClickDuck';
logs.L1P20.tag = '🦆';

logs.L1P21 = {}
logs.L1P21.name = "Decked Out";
logs.L1P21.description = "Equip a full Set of armor";
logs.L1P21.hint = '"... all five pieces of the puzzle!"';
logs.L1P21.logic = 'logTrackTier';
logs.L1P21.tag = '🛡️';

logs.L1P22 = {}
logs.L1P22.name = "Once in a Blue Moon";
logs.L1P22.description = "Obseve a Blue Moon";
logs.L1P22.hint = '"Literally speaking, that is."';
logs.L1P22.logic = 'stats.currentWeather==="bluemoon"';
logs.L1P22.tag = '🌙';

logs.L1P22A = {}
logs.L1P22A.name = "Strong Guts";
logs.L1P22A.description = "Survive With 1% HP Left in a Boss Fight";
logs.L1P22A.hint = '"Threading in between life and death."';
logs.L1P22A.logic = '';
logs.L1P22A.tag = '⚔️';

logs.P22B = {}
logs.P22B.name = "Meat Beater";
logs.P22B.description = "Touch slimy meat a bunch of times";
logs.P22B.hint = '"Squish Splosh Splooch."';
logs.P22B.logic = 'meatBeat>20';
logs.P22B.tag = 'upper';
logs.P22B.tag = '🥩';

logs.P23 = {}
logs.P23.name = "Pay 2 Win";
logs.P23.description = "Buy this book out of a store";
logs.P23.hint = '"It just doesn\'t feel morally right, right?"';
logs.P23.tag = 'upper';
logs.P23.tag = '🛒';

logs.P24 = {}
logs.P24.name = "Nothing Like The Present";
logs.P24.description = "Receive a present from your turtle";
logs.P24.hint = '"Repaying just a bit of all your kindness."';
logs.P24.logic = 'stats.recievedPresents>0';
logs.P24.tag = 'upper';
logs.P24.tag = '🎁';

logs.P25 = {}
logs.P25.name = "Grateful Representation";
logs.P25.description = "Receive 15 presents from your turtle";
logs.P25.hint = '"It seems she took a liking to you."';
logs.P25.logic = 'stats.recievedPresents>14';
logs.P25.tag = 'upper';
logs.P25.tag = '🎁';

logs.P26 = {}
logs.P26.name = "Unpresented Betrayal";
logs.P26.description = "Sell a present from your turtle";
logs.P26.hint = '"Totally uncool, dude."';
logs.P26.logic = '';
logs.P26.tag = 'upper';
logs.P26.tag = '🎁';

logs.P27 = {}
logs.P27.name = "Apprentice Workman";
logs.P27.description = "Reach Level 10 In Any Job";
logs.P27.hint = '"Break a leg."';
logs.P27.logic = 'jobs.blacksmith.level>9 || jobs.cooking.level>9 || jobs.alchemy.level>9 || jobs.engineering.level>9';
logs.P27.tag = 'upper';
logs.P27.tag = '⚜️';

logs.P28 = {}
logs.P28.name = "Master Of My Craftship";
logs.P28.description = "Reach Level 20 In Any Job";
logs.P28.hint = '"That\'s a very disciplined tortuga."';
logs.P28.logic = 'jobs.blacksmith.level>19 || jobs.cooking.level>19 || jobs.alchemy.level>19 || jobs.engineering.level>19';
logs.P28.tag = 'upper';
logs.P28.tag = '⚜️';

logs.P29 = {}
logs.P29.name = "Vive la Révolution";
logs.P29.description = "Craft 1000 Items";
logs.P29.hint = '"Really putting the \'Craft\' in TurtleCraft."';
logs.P29.logic = 'stats.craftedItems>999';
logs.P29.tag = 'upper';
logs.P29.tag = '⚒️';

logs.P29A = {}
logs.P29A.name = "Turtle Labor";
logs.P29A.description = "Craft 10000 Items";
logs.P29A.hint = '"Way faster than any children."';
logs.P29A.logic = 'stats.craftedItems>9999';
logs.P29A.tag = '⚒️';

logs.P30 = {}
logs.P30.name = "This One Officer";
logs.P30.description = "Click this book";
logs.P30.hint = '"Caught red handed."';
logs.P30.tag = '🧶';

logs.P31 = {}
logs.P31.name = "Who Left All These Here?";
logs.P31.description = "Open 10 Mysterious Presents";
logs.P31.hint = '"Thank you, kind stranger."';
logs.P31.logic = 'stats.mysteryPresentsOpened>9';
logs.P31.tag = '🎁';

logs.P31B = {}
logs.P31B.name = "Happy Hanukkah";
logs.P31B.description = "Open 50 Mysterious Presents";
logs.P31B.hint = '"Hanukkah Matata as they say."';
logs.P31B.logic = 'stats.mysteryPresentsOpened>49';
logs.P31B.tag = '🎁';

logs.P33 = {}
logs.P33.name = "Mysterious Benefactor";
logs.P33.description = "Open 100 Mysterious Presents";
logs.P33.hint = '"I don\'t care who it was, they are now mine."';
logs.P33.logic = 'stats.mysteryPresentsOpened>99';
logs.P33.tag = '🎁';

logs.P31A = {}
logs.P31A.name = "Christmas Is Cancelled";
logs.P31A.description = "Destroy 10 Mysterious Presents";
logs.P31A.hint = '"If I can\'t get them, no one will."';
logs.P31A.insight = 5;
logs.P31A.logic = 'enemies.E15.killCount>9';
logs.P31A.tag = '🎁';

logs.P32 = {}
logs.P32.name = "Lucky Streak";
logs.P32.description = "Win a Rare Prize on a Mysterious Present";
logs.P32.hint = '"Gacha? Gacha? Gacha!"';
logs.P32.tag = '🎁';

logs.P32A = {}
logs.P32A.name = "Trick or Trick";
logs.P32A.description = "Find a nasty surprise on a Mysterious Present";
logs.P32A.hint = '"I wasn\'t expecting violence as a reward"';
logs.P32A.tag = '🎁';

logs.P32B = {}
logs.P32B.name = "Jackpot";
logs.P32B.description = "Find a lot of Shells on a Mysterious Present";
logs.P32B.hint = '"Instant Jeff Bezos"';
logs.P32B.tag = '🎁';

logs.P34 = {}
logs.P34.name = "Ill Take Your Entire Stock";
logs.P34.description = "Buy 100 items";
logs.P34.hint = '"Do you have the client card?"';
logs.P34.logic = 'stats.boughtItems>99';
logs.P34.tag = '🛒';

logs.P34A = {}
logs.P34A.name = "Oniomaniac Therapy";
logs.P34A.description = "Buy 1000 items";
logs.P34A.hint = '"I got enough points for the pot set."';
logs.P34A.logic = 'stats.boughtItems>999';
logs.P34A.tag = '🛒';

logs.P35 = {}
logs.P35.name = "One Punch Turtle";
logs.P35.description = "Deal 1K Damage in one hit";
logs.P35.hint = '"That\'s a lotta damage."';
logs.P35.logic = '';
logs.P35.tag = '⚔️';

logs.P35A = {}
logs.P35A.name = "Ultrakill";
logs.P35A.description = "Deal 100K Damage in one hit";
logs.P35A.hint = '"You make even the DEVIL CRY!"';
logs.P35A.logic = '';
logs.P35A.tag = '⚔️';

logs.P35B = {}
logs.P35B.name = "One way trip";
logs.P35B.description = "Deal 1M Damage in one hit";
logs.P35B.hint = '"To the shadow realm."';
logs.P35B.logic = '';
logs.P35B.tag = '⚔️';

logs.P35BA = {}
logs.P35BA.name = "Assisted Atomisation";
logs.P35BA.description = "Deal 10M Damage in one hit";
logs.P35BA.hint = '"Smokin\' Sexy Style!"';
logs.P35BA.logic = '';
logs.P35BA.tag = '⚔️';

logs.P35BB = {}
logs.P35BB.name = "Starshatter";
logs.P35BB.description = "Deal 100M Damage in one hit";
logs.P35BB.hint = '"Gone, reduced to atoms."';
logs.P35BB.logic = '';
logs.P35BB.tag = '⚔️';

logs.P35BC = {}
logs.P35BC.name = "Subterranean Supernova";
logs.P35BC.description = "Deal 100B Damage in one hit";
logs.P35BC.hint = '<FONT COLOR="yellow">"CAUTION!! ☢ CAUTION!! ☢ CAUTION!! ☢"';
logs.P35BC.logic = '';
logs.P35BC.tag = '⚔️';

logs.P35BD = {}
logs.P35BD.name = "Atom Splitter";
logs.P35BD.description = "Deal 100T Damage in one hit";
logs.P35BD.hint = '"I am become death."';
logs.P35BD.logic = '';
logs.P35BD.tag = '⚔️';

logs.P36 = {}
logs.P36.name = "Joker";
logs.P36.description = "Click on a Jester Turtle";
logs.P36.hint = '"I saw you peeking."';
logs.P36.logic = 'stats.jesterTurtleClicks>0';
logs.P36.tag = '🃏';

logs.P37 = {}
logs.P37.name = "The Entire Circus";
logs.P37.description = "Click on 100 Jester Turtles";
logs.P37.hint = '"You got all us laughing."';
logs.P37.logic = 'stats.jesterTurtleClicks>99';
logs.P37.tag = '🃏';

logs.P38 = {}
logs.P38.name = "Take a Break";
logs.P38.description = "Defeat King-Kat";
logs.P38.hint = '"You must defeat tortuga to stand a chance."';
logs.P38.logic = 'enemies.E8.killCount>0';
logs.P38.tag = '🐯';

logs.P39 = {}
logs.P39.name = "Big Dreams";
logs.P39.description = "Smack King-Kat with a giant fish";
logs.P39.hint = '"Give the cat what he wants."';
logs.P39.tag = '🐯';

logs.P40 = {}
logs.P40.name = "Heroes Never Die!";
logs.P40.description = "Perish 10 times";
logs.P40.hint = '"We still need you."';
logs.P40.logic = 'stats.timesDied>9';
logs.P40.tag = '⚰️';

logs.P41 = {}
logs.P41.name = "Pawn Star";
logs.P41.description = "Sell 10K items.";
logs.P41.hint = '"Best I can do is 200 Coins."';
logs.P41.logic = 'stats.soldItems>9999';
logs.P41.tag = '📈';

logs.P41A = {}
logs.P41A.name = "Gang Star";
logs.P41A.description = "Sell 100K items.";
logs.P41A.hint = '"Step 3: Profit."';
logs.P41A.logic = 'stats.soldItems>99999';
logs.P41A.tag = '📈';

logs.P42 = {}
logs.P42.name = "Critical Thinking";
logs.P42.description = "Deal 1000 Critical Hits";
logs.P42.hint = '"Glad we sorted this out one with words alone."';
logs.P42.logic = 'stats.criticalHitsDealt>999';
logs.P42.tag = '⚔️';

logs.P42A = {}
logs.P42A.name = "Critical Mistake";
logs.P42A.description = "Deal 10000 Critical Hits";
logs.P42A.hint = '"You being alive, that is."';
logs.P42A.logic = 'stats.criticalHitsDealt>9999';
logs.P42A.tag = '⚔️';

logs.P43 = {}
logs.P43.name = "Luck Issue";
logs.P43.description = "Obtain a Golden Clover";
logs.P43.hint = '"It\'s shrimple."';
logs.P43.logic = 'items.I102.count>0';
logs.P43.tag = '🍀';

logs.P44 = {}
logs.P44.name = "It All Returns to Nothing";
logs.P44.description = "Witness a World-Ending Event";
logs.P44.hint = '"It all comes tumbling down, tumbling down, tumbling down..."';
logs.P44.logic = 'stats.currentWeather==="vortex"';
logs.P44.tag = '🌀';

logs.P45 = {}
logs.P45.name = "Officework";
logs.P45.description = "Use 100 Stampers";
logs.P45.hint = '"This is not the adventure I signed for."';
logs.P45.logic = 'stats.stampsUsed>99';
logs.P45.tag = '🗳️';

logs.P45A = {}
logs.P45A.name = "Turtle Champion";
logs.P45A.description = "Obtain a Gold Medal in the Monster Arena";
logs.P45A.hint = '"The turtle remains undefeated."';
logs.P45A.logic = 'goldenMedalsGot>0';
logs.P45A.tag = '🥇';

logs.P45C = {}
logs.P45C.name = "World Record Any%";
logs.P45C.description = "Obtain a Last Time of 0 Seconds in a Showdown";
logs.P45C.hint = '"(Unbeatable)"';
logs.P45C.logic = 'showdown.S1.bestTime===0 || showdown.S2.bestTime===0';
logs.P45C.tag = '🥇';

logs.P45B = {}
logs.P45B.name = "Awww Man";
logs.P45B.description = "Die from a Cubomite Explosion";
logs.P45B.hint = '"Should have brought a cat."';
logs.P45B.logic = 'rpgPlayer.alive===false && stats.currentEnemy === "E10"';
logs.P45B.tag = '🧨';

logs.P45D = {}
logs.P45D.name = "Sweet Revenge";
logs.P45D.description = "Ignite 100 Cubomites";
logs.P45D.hint = '"I love the smell of gunpowder in the morning."';
logs.P45D.logic = 'stats.ignitedCubomites>99';
logs.P45D.tag = '🧨';

logs.P46 = {}
logs.P46.name = "Break a Drake";
logs.P46.description = "Defeat Terragosa";
logs.P46.hint = '"Shattering your expectations."';
logs.P46.logic = 'enemies.E12.killCount>0';
logs.P46.tag = '🐲';

logs.P46A = {}
logs.P46A.name = "Cry about it";
logs.P46A.description = "Achieve 150 stacks of Prismatic Shield";
logs.P46A.hint = '"What are you going to do? Call the rock police?"';
logs.P46A.tag = '🐲';

logs.P47 = {} 
logs.P47.name = "Encased Forever";
logs.P47.description = "Collect 10 Collectibles";
logs.P47.hint = '"Go show it to an owl or something."';
logs.P47.logic = 'collectiblesGot>9';
logs.P47.tag = '💎';

logs.P47A = {} 
logs.P47A.name = "A fine collection";
logs.P47A.description = "Collect 50 Collectibles";
logs.P47A.hint = '"Gunther would like to have a word with you."';
logs.P47A.logic = 'collectiblesGot>49';
logs.P47A.tag = '💎';

logs.P47AA = {} 
logs.P47AA.name = "Collectathon";
logs.P47AA.description = "Collect 100 Collectibles";
logs.P47AA.hint = '"At least you dont have to deal with space mafia."';
logs.P47AA.logic = 'collectiblesGot>99';
logs.P47AA.tag = '💎';

logs.P47B = {} 
logs.P47B.name = "Monster Foster";
logs.P47B.description = "Complete Some Entries of the Bestiary";
logs.P47B.hint = '"I feel so... Informed."';
logs.P47B.logic = '(unlocks.bestiary && bestiaryPointEntry + bestiaryPointBronze + medalsGot)>20';
logs.P47B.tag = '📒';

logs.P47C = {} 
logs.P47C.name = "Monster Obsession";
logs.P47C.description = "Complete a Bunch of Entries of the Bestiary";
logs.P47C.hint = '"Gotta study them all."';
logs.P47C.logic = '(unlocks.bestiary && bestiaryPointEntry + bestiaryPointBronze + medalsGot)>40';
logs.P47C.tag = '📒';

logs.P47D = {} 
logs.P47D.name = "Monster Degree";
logs.P47D.description = "Complete a Lot of Entries of the Bestiary";
logs.P47D.hint = '"I could tell you a thing or two..."';
logs.P47D.logic = '(unlocks.bestiary && bestiaryPointEntry + bestiaryPointBronze + medalsGot)>70';
logs.P47D.tag = '📒';

logs.P47E = {} 
logs.P47E.name = "Monster University";
logs.P47E.description = "Complete a Whole Lot of Entries of the Bestiary";
logs.P47E.hint = '"or three, or four..."';
logs.P47E.logic = '(unlocks.bestiary && bestiaryPointEntry + bestiaryPointBronze + medalsGot)>100';
logs.P47E.tag = '📒';

logs.P47F = {} 
logs.P47F.name = "Monster Inc";
logs.P47F.description = "Complete quite the amount of Entries of the Bestiary";
logs.P47F.hint = '"Scary feet, Scary feet, Scary feet."';
logs.P47F.logic = '(unlocks.bestiary && bestiaryPointEntry + bestiaryPointBronze + medalsGot)>120';
logs.P47F.tag = '📒';

logs.P48 = {}
logs.P48.name = "Stop Right There";
logs.P48.description = "Steal 100 Times";
logs.P48.hint = '"You criminal scum."';
logs.P48.logic = 'stats.timesStolen>99';
logs.P48.tag = '🎭';

logs.P49 = {}
logs.P49.name = "Phantom Thief";
logs.P49.description = "Steal 1000 Times.";
logs.P49.hint = '"The tortuga always had my heart anyways"';
logs.P49.logic = 'stats.timesStolen>999';
logs.P49.tag = '🎭';

logs.P50 = {}
logs.P50.name = "Red Herring";
logs.P50.description = "Amass 1000 Fishing Junk";
logs.P50.hint = '"It wasnt such a special catch after all..."';
logs.P50.logic = '(items.I158.count + items.I89.count + items.I88.count )>999';
logs.P50.tag = '🎣';

logs.P51 = {}
logs.P51.name = "Big Game";
logs.P51.description = "Fish a Rare Catch";
logs.P51.hint = '"This one is going to the wall."';
logs.P51.logic = 'items.I169.count>0 || items.I117.count>0';
logs.P51.tag = '🎣';

logs.P52 = {}
logs.P52.name = "Blast Fishing";
logs.P52.description = "Throw a Dynamite to a Pond";
logs.P52.hint = '"It was worth a try."';
logs.P52.logic = '';
logs.P52.tag = '🧨';

logs.P52A = {}
logs.P52A.name = "Et tu, Bunnytus?";
logs.P52A.description = "Throw an Incendiary Bunny into a Jabbit";
logs.P52A.hint = '"I\'m you but stronger."';
logs.P52A.logic = '';
logs.P52A.tag = '🐇';

logs.P53 = {}
logs.P53.name = "Turtle Spelunky";
logs.P53.description = "Clear the Penguin Glacier";
logs.P53.hint = '"And without angering the shopkeeper."';
logs.P53.logic = 'enemies.E23.killCount>0';
logs.P53.tag = '🐧';

logs.P53D = {}
logs.P53D.name = "Party Killer";
logs.P53D.description = "Clear the Pirate Galleon";
logs.P53D.hint = '"Drinks are on me."';
logs.P53D.logic = 'enemies.E26.killCount>0';
logs.P53D.tag = '🏴‍☠️';

logs.P53B = {}
logs.P53B.name = "New Religion Dropped";
logs.P53B.description = "Clear the Temple of Dusk";
logs.P53B.hint = '"Bow before your new overlord."';
logs.P53B.logic = 'enemies.E49.killCount>0';
logs.P53B.tag = '🌙';

logs.P53C = {}
logs.P53C.name = "False Idol";
logs.P53C.description = "Clear the Temple of Dawn";
logs.P53C.hint = '"Not so bright after all."';
logs.P53C.logic = 'enemies.E53.killCount>0';
logs.P53C.tag = '☀️';

logs.P53A = {}
logs.P53A.name = "Tuxedo Friends";
logs.P53A.description = "Pat the Penguin Helper";
logs.P53A.hint = '"Thank you for your service."';
logs.P53A.logic = '';
logs.P53A.tag = '🐧';

logs.P54 = {}
logs.P54.name = "Containment Breach";
logs.P54.description = "Encounter La Creatura"
logs.P54.hint = '"It escaped."';
logs.P54.logic = '';
logs.P54.tag = '❓';

logs.P55 = {}
logs.P55.name = "God of Hell Fire";
logs.P55.description = "Defeat Infernalus";
logs.P55.hint = '"I\'ll take you to burn."';
logs.P55.logic = 'enemies.E27.killCount>0';
logs.P55.tag = '🔥';

logs.P56 = {}
logs.P56.name = "Extinguished";
logs.P56.description = "Fight Infernalus While Raining";
logs.P56.hint = '"Bad day to be made out of fire."';
logs.P56.logic = 'stats.currentEnemy === "E27" && stats.currentWeather === "rain"';
logs.P56.tag = '🔥';

logs.P56A = {}
logs.P56A.name = "Shiny Hunting";
logs.P56A.description = "Defeat a Gilded Enemy";
logs.P56A.hint = '"No charm or anything, just skill."';
logs.P56A.logic = 'stats.gildedKilled>0';
logs.P56A.tag = '✨';

logs.P56B = {}
logs.P56B.name = "Golden Touch";
logs.P56B.description = "Defeat 50 Gilded Enemies";
logs.P56B.hint = '"Anything you want it to be, baby."';
logs.P56B.logic = 'stats.gildedKilled>49';
logs.P56B.tag = '✨';

logs.P56C = {}
logs.P56C.name = "Goliath Killer";
logs.P56C.description = "Defeat 100 Gilded Enemies";
logs.P56C.hint = '"Thats it! I\'m gettin\' me slingshot."';
logs.P56C.logic = 'stats.gildedKilled>99';
logs.P56C.tag = '✨';

logs.P57 = {}
logs.P57.name = "Jack Of All Trades";
logs.P57.description = "Unlock 3 Classes at the Same Time";
logs.P57.hint = '"Your pitiful average protagonist can only get one of these."';
logs.P57.logic = 'talent.TI0.active === true && talent.TG0.active === true && talent.TA0.active === true';
logs.P57.tag = '⚜️';

logs.P58 = {}
logs.P58.name = "The Plan";
logs.P58.description = "Research anything";
logs.P58.hint = '"It\'s work o clock."';
logs.P58.logic = 'stats.researchedBuildings>0';
logs.P58.tag = '🧱';

logs.P58E = {}
logs.P58E.name = "The Better Plan";
logs.P58E.description = "Research 10 items";
logs.P58E.hint = '"What did we learned today in class, kids?"';
logs.P58E.logic = 'stats.researchedBuildings>9';
logs.P58E.tag = '🧱';

logs.P58B = {}
logs.P58B.name = "The Ultimate Plan";
logs.P58B.description = "Research 100 items";
logs.P58B.hint = '"If it fails, its not my fault."';
logs.P58B.logic = 'stats.researchedBuildings>99';
logs.P58B.tag = '🧱';

logs.P59 = {}
logs.P59.name = "Super Turtle Grinder";
logs.P59.description = "Level Up a Building to Level 10";
logs.P59.hint = '"At least it farms itself."';
logs.P59.logic = 'buildings.B1.level>9 || buildings.B2.level>9 || buildings.B3.level>9 || buildings.B7.level>9';
logs.P59.tag = '🧱';

logs.P58A = {}
logs.P58A.name = "Salt Splash";
logs.P58A.description = "Exorcise 15 Morgatos";
logs.P58A.hint = '"Who are you going to call?"';
logs.P58A.logic = 'stats.purifiedMorgatosDefeated>14';
logs.P58A.tag = '👻';

logs.P60 = {}
logs.P60.name = "Gambling Addiction";
logs.P60.description = "Win a Coin Flip 5 Times in a Row";
logs.P60.hint = '"This coin will take me out poverty."';
logs.P60.logic = 'coinWins>4';
logs.P60.tag = '🎲';

logs.P61 = {}
logs.P61.name = "Honest Mistake";
logs.P61.description = "Throw Purifying Salt on a Caulislug";
logs.P61.hint = '"I just wanted to salt the salad..."';
logs.P61.logic = '';
logs.P61.tag = '🧂';

logs.P61A = {}
logs.P61A.name = "???";
logs.P61A.description = "Search the secret";
logs.P61A.hint = '"It\'s a secret to everybody."';
logs.P61A.logic = '';
logs.P61A.tag = '❔';

logs.P61B = {}
logs.P61B.name = "Sworn Guardian";
logs.P61B.description = "Defeat Eis Zeith";
logs.P61B.hint = '"Ultimately, he could not guard the world against you."';
logs.P61B.tag = '🐘';

logs.P62 = {}
logs.P62.name = "Community Service";
logs.P62.description = "Complete Nanny\'s Questline";
logs.P62.hint = '"I gained a powerful ally."';
logs.P62.tag = '🍪';

logs.P63 = {}
logs.P63.name = "One Less Deity to Pray";
logs.P63.description = "Defeat Raijin-Goran";
logs.P63.hint = '"One less day to church."';
logs.P63.tag = '🦖';

logs.P64 = {}
logs.P64.name = "Toxin-Free";
logs.P64.description = "Eat 50 Suspicious Mushrooms";
logs.P64.hint = '"The toxicity, of our city."';
logs.P64.logic = 'stats.mushroomsUsed>49';
logs.P64.tag = '🍄';

logs.P65 = {}
logs.P65.name = "Green Pinky";
logs.P65.description = "Harvest 100 Plants";
logs.P65.hint = '"Just a little dabble."';
logs.P65.logic = ' stats.plantsHarvested>99';
logs.P65.tag = '🌱';

logs.P66 = {}
logs.P66.name = "Green Index";
logs.P66.description = "Harvest 1000 Plants";
logs.P66.hint = '"Its not much, but its honest work."';
logs.P66.logic = ' stats.plantsHarvested>999';
logs.P66.tag = '🌱';

logs.P67 = {}
logs.P67.name = "Green Thumb";
logs.P67.description = "Harvest 10000 Plants";
logs.P67.hint = '"They are growing on my walls..."';
logs.P67.logic = ' stats.plantsHarvested>9999';
logs.P67.tag = '🌱';

logs.P68 = {}
logs.P68.name = "Technologist";
logs.P68.description = "Discover 15 unique seeds";
logs.P68.hint = '"I got a knack for this."';
logs.P68.logic = 'plantCompletionProgress>14';
logs.P68.tag = '🌿';

logs.P69 = {}
logs.P69.name = "Global Seed Bank";
logs.P69.description = "Discover 35 unique seeds";
logs.P69.hint = '"Just in case. You never know."';
logs.P69.logic = 'plantCompletionProgress>34';
logs.P69.tag = '🌿';

logs.P70 = {}
logs.P70.name = "F?tal Er?or";
logs.P70.description = "Discover a game-breaking mutation";
logs.P70.hint = '"Not really damaging, dont worry."';
logs.P70.logic = 'plants.g16.harvested>0';
logs.P70.tag = '👾';

logs.P71 = {}
logs.P71.name = "Mythical Morning";
logs.P71.description = "Obtain a Mythical item";
logs.P71.hint = '"Was it worth it? Probably not."';
logs.P71.tag = '👑';

logs.P72 = {}
logs.P72.name = "Bound by Darkness";
logs.P72.description = "Defeat Xezdeth";
logs.P72.hint = '"We must kill chaos."';
logs.P72.logic = 'enemies.E41.killCount>0';
logs.P72.tag = '⛓️';

logs.P73 = {}
logs.P73.name = "His Actual Name is Princess";
logs.P73.description = "Pet Xezdeth";
logs.P73.hint = '"Dont worry, he doesn\'t bite."';
logs.P73.tag = '⛓️';

logs.P74 = {}
logs.P74.name = "Amidst Moonlight";
logs.P74.description = "Defeat the Lady of the Lake";
logs.P74.hint = '"I am not returing any more orbs to no one."';
logs.P74.logic = 'enemies.E56.killCount>0';
logs.P74.tag = '🎣';


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
rpgClass.TA0.maxLevel = 60;

rpgClass.TG0 = {};
rpgClass.TG0.name = "Gambler"
rpgClass.TG0.currentExp = 0;
rpgClass.TG0.nextExp = 1000;
rpgClass.TG0.level = 1;
rpgClass.TG0.color = "#68FEBE"
rpgClass.TG0.maxLevel = 60;

rpgClass.TI0 = {};
rpgClass.TI0.name = "Instrumentalist"
rpgClass.TI0.currentExp = 0;
rpgClass.TI0.nextExp = 1000;
rpgClass.TI0.level = 1;
rpgClass.TI0.color = "#FC4AB9"
rpgClass.TI0.maxLevel = 60;
//#endregion

//----------------------==========================-----------------------
//----------------------============MAIL==========-----------------------
//----------------------==========================-----------------------
//#region Mail
var mail = {};

/*

mail.M1 = {};
mail.M1.title = 'Thank you for enrolling in the Super Turtle Program!'
mail.M1.body = 'We are appreciative of your participation in our program! Fight fearsome foes, upgrade gear, collect ancient relics and help people all across the world! In exchange, you will be rewarded handsomely for your bravery!<br><br>Make every effort to assist your fellow turtles whenever you go.<br><br>We sincerely hope you continue with our program and have a wonderful journey! Here is your welcome badge:'
mail.M1.item = 'I13'
mail.M1.effect = "items.I13.count++"
mail.M1.sender = "Super Turtle Inc"
mail.M1.cover = "I108"

mail.M3 = {};
mail.M3.title = ' Super Turtle Program notice.'
mail.M3.body = 'The Super Turtle Program is pleased with your accomplishments and has chosen to give you this gift, which will undoubtedly help you on your adventures.<br><br>We will be very vigilant about your future accomplishments.'
mail.M3.item = 'I79'
mail.M3.effect = "items.I79.count++"
mail.M3.sender = "Super Turtle Inc"
mail.M3.cover = "I108"

mail.M5 = {};
mail.M5.title = 'Your journey awaits!'
mail.M5.body = 'This is a Super Turtle Adventure Program official statement.<br><br>We are glad to learn that you have been fulfilling requests from individuals in need.<br><br>We have determined that you\'re prepared to set out on an exciting adventure by yourself and make your own decisions moving forward<br><br>We acknowledge that you will face numerous obstacles, but we believe you can overcome every obstacle if you remain true to your principles.'
mail.M5.effect = "unlocks.areas = true; unlocksReveal(); did('areaButton').style.animation = 'newGameTip 1s infinite linear'"
mail.M5.sender = "Super Turtle Inc"
mail.M5.cover = "I108"





mail.M9 = {};
mail.M9.title = 'Super Turtle rank up.'
mail.M9.body = 'The  Super Turtle Program is indebted with you for all the people you helped through your journey, and has decided to promote your status.<br><br>We will be very vigilant about your future accomplishments.'
mail.M9.item = 'I172'
mail.M9.effect = "items.I172.count++"
mail.M9.sender = "Super Turtle Inc"
mail.M9.cover = "I108"

mail.M10 = {};
mail.M10.title = 'Super Turtle Program Notice.'
mail.M10.body = 'The Super Turtle Program did not like that.'
mail.M10.sender = "Super Turtle Inc"
mail.M10.cover = "I108"

*/

mail.M1 = {};
mail.M1.title = 'Thank you for enrolling in the Super Turtle Program'
mail.M1.body = 'We are appreciative of your participation in our program! Fight fearsome foes, upgrade gear, collect ancient relics and help people all across the world! In exchange, you will be rewarded handsomely for your bravery!<br><br>Make every effort to assist your fellow turtles whenever you go.<br><br>We sincerely hope you continue with our program and have a wonderful journey! Here is your welcome badge:'
mail.M1.item = 'I13'
mail.M1.effect = "items.I13.count++"
mail.M1.sender = "Super Turtle Inc"
mail.M1.cover = "I108"

//rank

mail.MR1 = {};
mail.MR1.title = 'Your journey awaits!'
mail.MR1.body = 'This is a Super Turtle Adventure Program official statement.<br><br>We are glad to learn that you have been fulfilling requests from individuals in need.<br><br>We have determined that you\'re prepared to set out on an exciting adventure by yourself and make your own decisions moving forward<br><br>We acknowledge that you will face numerous obstacles, but we believe you can overcome every obstacle if you remain true to your principles.'
mail.MR1.effect = "unlocks.areas = true; unlocksReveal(); did('areaButton').style.animation = 'newGameTip 1s infinite linear'"
mail.MR1.sender = "Super Turtle Inc"
mail.MR1.cover = "I108"

mail.MR2 = {};
mail.MR2.title = 'Your very own Armory!'
mail.MR2.body = 'The Super Turtle Program is pleased with your accomplishments and has chosen to issue you with your own Armory, which will undoubtedly help you on your adventures.<br><br>Collect and upgrade all found gear inside! We deeply encourage you to step back and check it from time to time to further hone your Mastery!.<br><br>We will be very vigilant about your future accomplishments.'
mail.MR2.item = 'I474'
mail.MR2.effect = "items.I474.count++"
mail.MR2.sender = "Super Turtle Inc"
mail.MR2.cover = "I108"

mail.MR3 = {};
mail.MR3.title = 'Official request'
mail.MR3.body = 'This is a Super Turtle Program official request. Reports have surfaced of an undiscovered island in the middle of the ocean.<br><br>We are convinced you are prepared to venture into perilous dungeons after noticing your accomplishments, and we would like to summon you personally to said destination.<br><br>You won\'t be able to access other menus while exploring dungeons, so be cautious of their increased difficulty.<br><br>We hope that your journey is successful.'
mail.MR3.item = 'I174'
mail.MR3.effect = "items.I174.count++; unlocks.dungeons=true; unlocksReveal(); did('dungeonButton').style.animation = 'newGameTip 1s infinite linear'"
mail.MR3.sender = "Super Turtle Inc"
mail.MR3.cover = "I108"

mail.MR4 = {};
mail.MR4.title = 'Know your enemy!'
mail.MR4.body = 'The Super Turtle Program is pleased with your accomplishments and has chosen to issue you with this Medal Case!<br><br>By defeating pests in large quantities, Super Turtle Inc will reward your endevour with medals on your Bestiary! With every gold medal you achieve, you will receive Mastery, so you better start now!<br><br>We will be very vigilant about your future accomplishments.'
mail.MR4.item = 'I315'
mail.MR4.effect = "items.I315.count++"
mail.MR4.sender = "Super Turtle Inc"
mail.MR4.cover = "I108"

mail.MR5 = {};
mail.MR5.title = 'Up for a green thumb?'
mail.MR5.body = 'The Super Turtle Program is pleased with your accomplishments and has chosen to issue you with your own Garden Plot!<br><br>Our R&D concluded that taking care of plant lifeform severely increases the chances of success of missions, and can aid in honing your Mastery!<br><br>We will be very vigilant about your future accomplishments.'
mail.MR5.item = 'I287'
mail.MR5.effect = "items.I287.count++"
mail.MR5.sender = "Super Turtle Inc"
mail.MR5.cover = "I108"

mail.MR6 = {};
mail.MR6.title = 'Need Workforce?'
mail.MR6.body = 'We wanted to express our heartfelt thanks for all the help you\'ve given us with our quests and errands. Your dedication and hard work have made a real difference in our lives.<br><br>As a small token of our appreciation, we\'d like to assist you in building a garrison. It\’s our way of saying thank you for everything you\’ve done. We hope it will serve as a place of rest and strength for you.<br><br>Thank you once again, and we look forward to continuing our journey together.<br><br>With gratitude,Everyone You\’ve Helped'
mail.MR6.item = 'I204'
mail.MR6.effect = "items.I204.count++"
mail.MR6.sender = "Everyone"
mail.MR6.cover = "I208"

//flavor

mail.MF1 = {};
mail.MF1.title = 'Hi, my dear hatchling, hows over there, dear?'
mail.MF1.body = 'I\'m hoping you can still recall your dear mother. I\'ve heard youve made the decision to pursue adventures. While I\'m cheering you on from afar, just like any mother would, I\'m still worried about my cub.<br><br>We will pray for your safety, every single one of us. I\'m sure that you are assisting others and that you are not ignoring their requests. You better not.<br><br>Anyhow, these are some cookies I baked for you. Love you, Tortumom.'
mail.MF1.item = 'I14'
mail.MF1.effect = "items.I14.count++"
mail.MF1.sender = "Tortumom"
mail.MF1.cover = "I14"

mail.MF2 = {};
mail.MF2.title = '🐢 URGENT: Transform Your Shell with ShellShine Co.! 🐢'
mail.MF2.body = 'Dear Esteemed Turtle,<br><br>LIMITED TIME OFFER! ShellShine Co. is revolutionizing the way turtles like YOU live! Upgrade your shell NOW and experience:<br><br>✨ Unmatched Durability - Lasts a lifetime!<br><br>✨ Stylish Designs - Stand out in the pond!<br><br>✨ Ultimate Comfort - Perfect fit guaranteed!<br><br>ACT FAST! Our exclusive summer promotion is ending soon! Join the THOUSANDS of satisfied turtles who have already made the switch. Don\'t miss your chance to SHINE with a brand-new shell from ShellShine Co.!<br><br>Click Here to claim your special discount and transform your life today!'
mail.MF2.effect = ""
mail.MF2.sender = "ShellShine Co."
mail.MF2.cover = "I218"

mail.MF3 = {};
mail.MF3.title = 'Just checking on my sweet turtle'
mail.MF3.body = 'Have you recently covered up to protect yourself from the cold?<br><br>Now that Christmas is over, the family and myself thoroughly enjoyed some gambas.<br><br>Despite choking on one, the Tortuyaya recovered.<br><br>I kept some of the leftover cookies from dinner for you.<br><br>Love you, Tortumom.'
mail.MF3.item = 'I14'
mail.MF3.effect = "items.I14.count++";
mail.MF3.sender = "Tortumom"
mail.MF3.cover = "I14"

mail.MF4 = {};
mail.MF4.title = 'dONT'
mail.MF4.body = 'do not trusT Them.'
mail.MF4.effect = "";
mail.MF4.sender = "?????"
mail.MF4.cover = "I278"

mail.MF5 = {};
mail.MF5.title = '🎁 Complimentary Alchemy Potion'
mail.MF5.body = 'Dear Valued Customer,<br><br>We are thrilled to announce a special offer from Alchemic Wonders Inc.! As a token of our appreciation, we\'re giving away a selection of our finest alchemy potions for you to try—completely free!<br><br>Attached to this email, you\'ll find a sample of our newest, experimental concoction. Experience the magic and transformation that only Alchemic Wonders can offer!<br><FONT COLOR="gray">(the user is solely responsible for the consumption of any product, Alchemic Wonders Inc. or any of its parent companies hold any liability) '
mail.MF5.effect = "items.I365.count++"
mail.MF5.sender = "Alchemic Wonders Inc."
mail.MF5.cover = "I218"
mail.MF5.item = 'I365'

mail.MF6 = {};
mail.MF6.title = 'Hi Sweetie'
mail.MF6.body = 'I hope you\’re doing well and finding lots of delicious seaweed to munch on! I\’ve been a bit worried since I haven\’t heard from you in a while. Everything alright?<br><br>Your tortucousin Shellody had quite the adventure yesterday—he got caught in a current and ended up in a completely different reef!<br><br>Luckily, he\’s back home now, safe and sound.<br><br>Also, lately I have been recieving a lot of mails from Super Turtle Inc. I hope nothing is amiss.<br><br>Please write back when you can. I miss you and would love to hear how you’re doing.<br><br>Love you, Tortumom.'
mail.MF6.effect = "";
mail.MF6.sender = "Tortumom"
mail.MF6.cover = "I14"

mail.MF7 = {};
mail.MF7.title = 'Super Turtle Program Notice.'
mail.MF7.body = 'The Super Turtle Program did not like that.'
mail.MF7.sender = "Super Turtle Inc"
mail.MF7.cover = "I108"

//other

mail.MO1 = {};
mail.MO1.title = 'Honk honk honk.'
mail.MO1.body = 'honk honk honk honk honk<br><br>honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk honk<br><br>honk honk honk honk honk honk honk honk honk<br><br><br><br><br><br>honk.'
mail.MO1.item = 'I109'
mail.MO1.effect = "items.I109.count++";
mail.MO1.sender = "Honk Honk Honk"
mail.MO1.cover = "I109"

mail.MO2 = {};
mail.MO2.title = 'The stars are calling...'
mail.MO2.body = 'Salutations, shining star, Robertus Shellington is my name. As I pondered my magic orb, I observed your voyage.<br><br>Without a doubt, you are unique. I noticed the desire and spark in your eyes, which far surpasses that of a typical turtle. <br><br>I chose to write this letter to invite you to the Planetarium, which can be acessed from your '+colorTag("Skills tab.", "coral")+' Oh dear, there goes the third wall.<br><br>May the stars call your name, Robertus.'
mail.MO2.item = 'I26'
mail.MO2.effect = "items.I26.count++; unlocks.magic=true; unlocks.skills=true; unlocksReveal(); did('skillsButton').style.animation = 'newGameTip 1s infinite linear'"
mail.MO2.sender = "Robertus Shellington"
mail.MO2.cover = "I215"

mail.MO3 = {};
mail.MO3.title = 'A star in the making'
mail.MO3.body = 'I will wait for thee once level 30 hath been reached'
mail.MO3.effect = ""
mail.MO3.sender = "?????"
mail.MO3.cover = "I215"

//system

mail.MS1 = {};
mail.MS1.title = '0.41 Notice'
mail.MS1.body = 'Due to 0.41 changes in item drop rates, issued the following compensation:<br>[Busted Improbability Drive x5]<br><br>Hope ya keep enjoyin on<br><br><br><br><br><br>also sorry for stripping your turtle'
mail.MS1.effect = "items.I219.count=5"
mail.MS1.sender = "🦆"
mail.MS1.cover = "I79"

mail.MS2 = {};
mail.MS2.title = '0.42 Notice'
mail.MS2.body = 'Due to 0.42 changes in capping time eggs to 1, issued the following compensation:<br>[Apology T-shirt]<br><br>Happy farming'
mail.MS2.effect = "items.I221.count++"
mail.MS2.sender = "🦆"
mail.MS2.cover = "I79"

for (var i in mail) { mail[i].recieved = false; mail[i].read = false }

//#endregion

//----------------------==========================-----------------------
//----------------------============RANKS==========-----------------------
//----------------------==========================-----------------------
//#region Mail
var aRank = {};

aRank.AR1 = {}
aRank.AR1.required = 0
aRank.AR1.reward = 'bestiaryItem("I13","container",1)'

aRank.AR2 = {}
aRank.AR2.required = 7
aRank.AR2.reward = 'bestiaryItem("I13","container", "Area Exploration Permit",1)'

aRank.AR3 = {}
aRank.AR3.required = 12 //armory
aRank.AR3.reward = 'bestiaryItem("I474","container",1)'

aRank.AR4 = {}
aRank.AR4.required = 19 //dungeons
aRank.AR4.reward = 'bestiaryItem("I174","container", "Dungeon Exploration Permit",1)'

aRank.AR5 = {}
aRank.AR5.required = 26 //bestiary medals
aRank.AR5.reward = 'bestiaryItem("I315","container",1)'

aRank.AR6 = {}
aRank.AR6.required = 36 //garden
aRank.AR6.reward = 'bestiaryItem("I287","container",1)'

aRank.AR7 = {}
aRank.AR7.required = 50
aRank.AR7.reward = 'bestiaryItem("I204","container",1)'


//#endregion
//----------------------==========================-----------------------
//----------------------============Talents=======-----------------------
//----------------------==========================-----------------------
//#region Talents

const skillDmg1 = 0.1
const skillDmg2 = 0.2
const skillDmg3 = 0.3
const skillDmg4 = 0.4
const skillDmg5 = 0.5
const skillDmg6 = 0.6
const skillDmg7 = 0.8
const skillDmg8 = 0.9



var talent = {};

talent.T0 = {};
talent.T0.position = '0px 0px'
talent.T0.hue = "0deg"
talent.T0.name = "Awakening";
talent.T0.category = "Passive";
talent.T0.description = `'<span class="logStat">Enables the hidden inner power that resides within your shell.<br><br>Unlocks classes and skills using Wishes. You can unlock as many classes as you want and swap them at will. Assign them from the Skills panel at the side of your Equipment tab.<br><br>Skills unlocked in one class will carry to others, allowing your turtle to become increasingly more powerful the more classes you level.<br><br>You can get Wishes to unlock new stars by leveling classes.</span>'`

talent.noClass = {};
talent.noClass.position = '9999px 9999px'
talent.noClass.name = "No Class";
talent.noClass.category = "Class";
talent.noClass.description = `'Nothing to fight with, except life-affirming flesh'`;

talent.TA0 = {};
talent.TA0.position = '0px -60px'
talent.TA0.parent = "T0"
talent.TA0.name = "Apprentice";
talent.TA0.category = "Class";
talent.TA0.description = `'Bunnies out of your hat, conjuring doves... What do you mean thats just street magic? Its still magic after all, isnt it?'`;

talent.TA0B = {};
talent.TA0B.position = '50px -100px'
talent.TA0B.parent = "TA0"
talent.TA0B.name = "Reverse Vanish";
talent.TA0B.category = "Passive";
talent.TA0B.description = `"Mystery Presents contain +1 additional presents"`;
talent.TA0B.effect = 'talent.TA0B.statUp = 1'

talent.TA0BASE = {};
talent.TA0BASE.position = '9999px 9999px'
talent.TA0BASE.name = "Incendiary Bunny";
talent.TA0BASE.category = "Skill";
talent.TA0BASE.description = `"Casts a flaming rabbit out of your hat, <span style='color:orange'> dealing "+(4*playerSpellpower*100).toFixed(0)+"% of your damage as"+elementalIcon+"Elemental Damage and "+(0.5*playerSpellpower*100).toFixed(0)+"% of your damage as"+elementalIcon+"Elemental Damage over 15 seconds</span>"`; 
talent.TA0BASE.cast = "castIncendiaryBunny()";
talent.TA0BASE.cost = 6;
talent.TA0BASE.cd = 20;

talent.TA0C = {};
talent.TA0C.position = '-50px -90px'
talent.TA0C.parent = "TA0"
talent.TA0C.name = "Abracatortle";
talent.TA0C.category = "Passive";
talent.TA0C.description = `"Increases max Magic by +25"`
talent.TA0C.effect = 'talent.TA0C.statUp = 25'

talent.TA1 = {};
talent.TA1.position = '10px -130px'
talent.TA1.parent = "TA0"
talent.TA1.name = "Fortify Humor";
talent.TA1.category = "Passive";
talent.TA1.description = `"Jester Turtles can now overcharge your Magic bar"`;
talent.TA1.category = "Passive";
talent.TA1.locked = true;
talent.TA1.lockedCondition = "Click on 100 Jester Turtles";
talent.TA1.lockedLogic = "stats.jesterTurtleClicks>99";

talent.TA1B = {};
talent.TA1B.position = '70px -160px'
talent.TA1B.parent = "TA1";
talent.TA1B.parent2 = "TA0B"
talent.TA1B.name = "Sleight of Hand";
talent.TA1B.category = "Passive";
talent.TA1B.description = `"Increases Pat Multiplier by"+colorTag("x1.5","#E57D08")`
talent.TA1B.effect = 'talent.TA1B.statUp = 0.5'

talent.TA1B1 = {};
talent.TA1B1.position = '100px -120px'
talent.TA1B1.parent = "TA1B"
talent.TA1B1.name = "Evocation";
talent.TA1B1.category = "Skill";
talent.TA1B1.description = `"Channel a maelstrom of mana, <span style='color:orange'> restoring 60% of your Magic over 20 seconds</span>"`; 
talent.TA1B1.cast = "castEvocation()";
talent.TA1B1.cost = 15;
talent.TA1B1.cd = 90;
talent.TA1B1.locked = true;
talent.TA1B1.lockedCondition = "Achieve 1500+ Magic Once";
talent.TA1B1.lockedLogic = "rpgPlayer.mana>1499";
talent.TA1B1.permanent = false;

talent.TA1C = {};
talent.TA1C.position = '-50px -130px'
talent.TA1C.parent = "TA1"
talent.TA1C.parent2 = "TA1F"
talent.TA1C.name = "Critical Thinking";
talent.TA1C.category = "Passive";
talent.TA1C.description = `"Critical Hits now restore Magic"`

talent.TA1D = {};
talent.TA1D.position = '40px -230px'
talent.TA1D.parent = "TA1B"
talent.TA1D.parent2 = "TA3"
talent.TA1D.name = "Wizhard Shell";
talent.TA1D.category = "Skill";
talent.TA1D.description = `"Creates a magic barrier, <span style='color:orange'> absorbing damage worth 50% of your max health for 15 seconds</span>"`; 
talent.TA1D.cast = "castWizhardShield()";
talent.TA1D.cost = 10;
talent.TA1D.cd = 40;

talent.TA1D1 = {};
talent.TA1D1.position = '80px -260px'
talent.TA1D1.parent = "TA1D"
talent.TA1D1.parent2 = "TA1B"
talent.TA1D1.name = "Magikill";
talent.TA1D1.category = "Passive";
talent.TA1D1.description = `"Gain 0.5% of your Mana for every enemy you defeat"`;
talent.TA1D1.category = "Passive";
talent.TA1D1.locked = true;
talent.TA1D1.lockedCondition = "Achieve 20 gold medals on the bestiary";
talent.TA1D1.lockedLogic = "(goldMedalsGot+platinumMedalsGot)>19";

talent.TA1D2 = {};
talent.TA1D2.position = '70px -310px'
talent.TA1D2.parent = "TA1D1"
talent.TA1D2.name = "Conjured Caltrops";
talent.TA1D2.category = "Skill";
talent.TA1D2.description = `"Summons magical caltrops to puncture your foes, <span style='color:orange'> dealing "+(0.2*playerSpellpower*100).toFixed(0)+"% of your damage everytime they appear for 30 minutes. This skill cannot directly kill</span>"`; 
talent.TA1D2.cast = "castConjuredCaltrops()";
talent.TA1D2.cost = 60;
talent.TA1D2.cd = 30;

talent.TA1E = {};
talent.TA1E.position = '-60px -180px'
talent.TA1E.parent = "TA1C"
talent.TA1E.name = "Levitation";
talent.TA1E.category = "Passive";
talent.TA1E.description = `"Increases"+spIcon+"Spellpower by"+colorTag("x1.5","#E57D08")`
talent.TA1E.locked = true;
talent.TA1E.lockedCondition = "Reach level 50 with Apprentice";
talent.TA1E.effect = 'talent.TA1E.statUp = 0.5'
talent.TA1E.lockedLogic = "rpgClass.TA0.level>49";


talent.TA1F = {};
talent.TA1F.position = '-100px -150px'
talent.TA1F.parent = "TA1C"
talent.TA1F.parent2 = "TA0C"
talent.TA1F.name = "Dove Flock";
talent.TA1F.category = "Skill";
talent.TA1F.description = `"Sends 4 doves, <span style='color:orange'> dealing "+(0.5*playerSpellpower*100).toFixed(0)+"% of your damage as "+natureIcon+"Nature Damage 4 times</span>"`; 
talent.TA1F.cast = "castDoveFlock()";
talent.TA1F.cost = 6;
talent.TA1F.cd = 5;

talent.TA1G = {};
talent.TA1G.position = '-40px -240px'
talent.TA1G.parent = "TA1E"
talent.TA1G.parent2 = "TA1G1"
talent.TA1G.name = "Prestidigitation";
talent.TA1G.category = "Passive";
talent.TA1G.description = `"Increases"+deificIcon+"Deific Bonus by"+colorTag("x1.5","#E57D08")`
talent.TA1G.effect = 'talent.TA1G.statUp = 0.5'

talent.TA1G1 = {};
talent.TA1G1.position = '-90px -280px'
talent.TA1G1.parent = "TA1G"
talent.TA1G1.parent2 = "TA1H"
talent.TA1G1.name = "Magician Assistants";
talent.TA1G1.category = "Passive";
talent.TA1G1.description = `"Increases Offline Gains by"+colorTag("x1.2","#E57D08")`
talent.TA1G1.effect = 'talent.TA1G1.statUp = 0.2'

talent.TA1G11 = {};
talent.TA1G11.position = '-110px -340px'
talent.TA1G11.parent = "TA1G1"
talent.TA1G11.name = "Astrolabe";
talent.TA1G11.category = "Passive";
talent.TA1G11.description = `"Increase"+spIcon+"Spellpower by"+colorTag("x1.015","#E57D08")+"for every Armory entry completed<FONT COLOR='gray'> (x"+(1+(totalArmoryGot * 0.015)).toFixed(2)+")"`;
talent.TA1G11.logic = 'totalArmoryGot * 0.015';
talent.TA1G11.locked = true;
talent.TA1G11.lockedCondition = "Complete 30 Armory Entries";
talent.TA1G11.lockedLogic = "totalArmoryGot>29";

talent.TA1H = {};
talent.TA1H.position = '-100px -220px'
talent.TA1H.parent = "TA1E"
talent.TA1H.parent2 = "TA1F"
talent.TA1H.name = "Cleanse";
talent.TA1H.category = "Skill";
talent.TA1H.description = `"Purifies the body, <span style='color:orange'> removing one negative debuff from yourself"`; 
talent.TA1H.cast = "castCleanse()";
talent.TA1H.cost = 20;
talent.TA1H.cd = 50;

talent.TA2 = {};
talent.TA2.position = '-5px -190px'
talent.TA2.parent = "TA1"
talent.TA2.parent2 = "TA3"
talent.TA2.name = "Brilliant Constitution";
talent.TA2.category = "Passive";
talent.TA2.description = `"Increases Health by"+colorTag("x1.2","#E57D08")`
talent.TA2.effect = 'talent.TA2.statUp = 0.2'

talent.TA3 = {};
talent.TA3.position = '0px -260px'
talent.TA3.parent = "TA2"
talent.TA3.parent2 = "TA1D"
talent.TA3.name = "Pyroclastic Circus";
talent.TA3.category = "Passive";
talent.TA3.description = `"Increases"+elementalIcon+"Elemental Bonus by"+colorTag("x1.5","#E57D08")`
talent.TA3.effect = 'talent.TA3.statUp = 0.5'

talent.TA31 = {};
talent.TA31.position = '20px -310px'
talent.TA31.parent = "TA3"
talent.TA31.name = "Destruction 100";
talent.TA31.category = "Passive";
talent.TA31.description = `"Increases"+elementalIcon+"Elemental Bonus by"+colorTag("x1.1","#E57D08")+"for every active star of Apprentice<FONT COLOR='gray'> (x"+(1+(apprenticePoints * 0.1)).toFixed(2)+")"`;
talent.TA31.logic = 'apprenticePoints * 0.1';
talent.TA31.locked = true;
talent.TA31.lockedCondition = "Reach level 60 with Apprentice";
talent.TA31.lockedLogic = "rpgClass.TA0.level>59";

talent.TA32 = {};
talent.TA32.position = '-50px -310px'
talent.TA32.parent = "TA3"
talent.TA32.parent2 = "TA1G1"
talent.TA32.name = "Distilled Chaos";
talent.TA32.category = "Passive";
talent.TA32.description = `"Tinctures give 20% more stats"`
talent.TA32.effect = 'talent.TA32.statUp = 0.2'

talent.TA32A = {};
talent.TA32A.position = '-70px -360px'
talent.TA32A.parent = "TA32"
talent.TA32A.name = "Enchant Pickaxe";
talent.TA32A.category = "Passive";
talent.TA32A.description = `"When mining, theres a 10% chance to deal double damage to the node"`

talent.TA32B = {};
talent.TA32B.position = '-10px -360px'
talent.TA32B.parent = "TA32"
talent.TA32B.parent2 = "TA31"
talent.TA32B.name = "Brain Scatter";
talent.TA32B.category = "Skill";
talent.TA32B.description = `"Fries the brain of the enemy, <span style='color:orange'> interrupting their Casting and dealing "+(3*playerSpellpower*100).toFixed(0)+"% of your damage as"+elementalIcon+"Elemental Damage </span>"`; 
talent.TA32B.cast = "castPolymorph()";
talent.TA32B.cost = 10;
talent.TA32B.cd = 40;
talent.TA32B.locked = true;
talent.TA32B.lockedCondition = "Allocate 10+ points into Apprentice";
talent.TA32B.lockedLogic = "apprenticePoints>9";

talent.TG0 = {};
talent.TG0.position = '60px 60px'
talent.TG0.parent = "T0"
talent.TG0.name = "Gambler";
talent.TG0.category = "Class";
talent.TG0.description = `'Have you ever considered using your crippling addiction as a weapon? Myriad of cards and dice shall trump over your foes.'`;

talent.TG0B = {};
talent.TG0B.position = '50px 120px'
talent.TG0B.parent = "TG0"
talent.TG0B.name = "Bargain Chip";
talent.TG0B.category = "Passive";
talent.TG0B.description = `"Mystery Presents are 10% more common"`;
talent.TG0B.effect = 'talent.TG0B.statUp = 120'

talent.TG1 = {};
talent.TG1.position = '120px 50px'
talent.TG1.parent = "TG0"
talent.TG1.name = "Pilfer";
talent.TG1.category = "Passive";
talent.TG1.description = `"Increases Pat Power by"+colorTag("x1.5","#E57D08")`
talent.TG1.effect = 'talent.TG1.statUp = 0.5'

talent.TG0BASE = {};
talent.TG0BASE.position = '9999px 9999px'
talent.TG0BASE.name = "Card Fan";
talent.TG0BASE.category = "Skill";
talent.TG0BASE.description = `"Throws 3 sharp cards, <span style='color:orange'> dealing "+(0.25*playerSpellpower*100).toFixed(0)+"% of your damage as "+mightIcon+"Might Damage 3 times</span>"`; 
talent.TG0BASE.cast = "castCardFan();";
talent.TG0BASE.cost = 2;
talent.TG0BASE.cd = 1;

talent.TG1B = {};
talent.TG1B.position = '190px 40px'
talent.TG1B.parent = "TG1"
talent.TG1B.name = "Thief";
talent.TG1B.category = "Skill";
talent.TG1B.description = `"Attempts to steal an item from the enemy, <span style='color:orange'> some enemies might have special items to steal</span>. Always uses 10% of your Max Magic. Some items might increase Steal chance."`; 
talent.TG1B.cast = "castThief()"
talent.TG1B.cost = 'beautify(playerMaxMana*0.1)';
talent.TG1B.cd = 0;

talent.TG1C = {};
talent.TG1C.position = '110px 110px'
talent.TG1C.parent = "TG1";
talent.TG1C.parent2 = "TG0B";
talent.TG1C.name = "Roll the Dice!";
talent.TG1C.category = "Skill";
talent.TG1C.description = `"Rolls magical dice with 3 possible outcomes; <span style='color:orange'> Increase Attack Speed, Spellpower or Strength for 20 seconds</span>"`; 
talent.TG1C.cast = "castRollTheDice()";
talent.TG1C.cost = 18;
talent.TG1C.cd = 40;

talent.TG1D = {};
talent.TG1D.position = '90px 160px'
talent.TG1D.parent = "TG1C"
talent.TG1D.parent2 = "TG0B"
talent.TG1D.name = "High Roller";
talent.TG1D.category = "Passive";
talent.TG1D.description = `"Mystery Presents contain +1 additional presents"`;
talent.TG1D.effect = 'talent.TG1D.statUp = 1';

talent.TG1E = {};
talent.TG1E.position = '140px 200px'
talent.TG1E.parent = "TG1D"
talent.TG1E.name = "Golden Die Cup";
talent.TG1E.category = "Passive";
talent.TG1E.description = `"Increase"+strIcon+"Strength by"+colorTag("x1.5","#E57D08")`;
talent.TG1E.effect = 'talent.TG1E.statUp = 0.5';

talent.TG1E1 = {};
talent.TG1E1.position = '180px 250px'
talent.TG1E1.parent = "TG1E"
talent.TG1E1.name = "Golden Fleece";
talent.TG1E1.category = "Passive";
talent.TG1E1.description = `"Gilded enemies drop"+colorTag("x1.5","#E57D08")+"more materials"`
talent.TG1E1.locked = true;
talent.TG1E1.lockedCondition = "Defeat the Lady of the Lake";
talent.TG1E1.lockedLogic = "enemies.E56.killCount>0";

talent.TG2 = {};
talent.TG2.position = '160px 90px'
talent.TG2.parent = "TG1"
talent.TG2.name = "Summon Jackpot";
talent.TG2.category = "Skill";
talent.TG2.description = `"Pulls the lever on a magic jackpot, with 3 possible outcomes; <span style='color:orange'> Hurls a fireball dealing "+(8*playerSpellpower*100).toFixed(0)+"% of your damage as "+elementalIcon+"Elemental Damage, Heals 20% of your Max HP, or have a chance of backfiring</span>"`; 
talent.TG2.cast = "castSummonJackpot()"
talent.TG2.cost = 10;
talent.TG2.cd = 14;

talent.TG2B = {};
talent.TG2B.position = '200px 140px'
talent.TG2B.parent = "TG2"
talent.TG2B.parent2 = "TG2E"
talent.TG2B.name = "Reverse Card";
talent.TG2B.category = "Skill";
talent.TG2B.description = `"Pulls a fast one at the enemy, <span style='color:orange'> reflecting 50% of all damage received converted into "+occultIcon+"Occult Damage</span> for 20 seconds"`; 
talent.TG2B.cast = "castReverseCard()"
talent.TG2B.cost = 12;
talent.TG2B.cd = 30;

talent.TG2C = {};
talent.TG2C.position = '200px 190px'
talent.TG2C.parent = "TG2B"
talent.TG2C.parent2 = "TG3"
talent.TG2C.name = "Card Counting";
talent.TG2C.category = "Passive";
talent.TG2C.description = `"Increase"+mightIcon+"Might Bonus by"+colorTag("x1.5","#E57D08")`;
talent.TG2C.effect = 'talent.TG2C.statUp = 0.5';

talent.TG2C1 = {};
talent.TG2C1.position = '250px 190px'
talent.TG2C1.parent = "TG2C"
talent.TG2C1.name = "Penguin Smugglers";
talent.TG2C1.category = "Passive";
talent.TG2C1.description = `"Increases Offline Gains by"+colorTag("x1.2","#E57D08")`
talent.TG2C1.effect = 'talent.TG2C1.statUp = 0.2'

talent.TG2C2 = {};
talent.TG2C2.position = '230px 240px'
talent.TG2C2.parent = "TG2C"
talent.TG2C2.name = "Cheating Death";
talent.TG2C2.category = "Passive";
talent.TG2C2.description = `"A small portion of your HP Regen is kept during boss fights and dungeons"`
talent.TG2C2.category = "Passive";
talent.TG2C2.locked = true;
talent.TG2C2.lockedCondition = "Allocate 10+ points into Gambler";
talent.TG2C2.lockedLogic = "gamblerPoints>9";

talent.TG2C3 = {};
talent.TG2C3.position = '280px 240px'
talent.TG2C3.parent = "TG2C2"
talent.TG2C3.parent2 = "TG2D1"
talent.TG2C3.name = "Lights Out";
talent.TG2C3.category = "Skill";
talent.TG2C3.description = `"Disorient the foe,<span style='color:orange'> dealing "+(4*playerSpellpower*100).toFixed(0)+"% of your damage as "+deificIcon+"Deific Damage and interrupting their Casting.</span>"`; 
talent.TG2C3.cast = "castLightsOut()";
talent.TG2C3.cost = 20;
talent.TG2C3.cd = 40;

talent.TG2D = {};
talent.TG2D.position = '250px 140px'
talent.TG2D.parent = "TG2B"
talent.TG2D.name = "Shellter";
talent.TG2D.category = "Skill";
talent.TG2D.description = `"Hides back into the shell,<span style='color:orange'> evading 33% of all incoming attacks for 30 seconds</span>"`; 
talent.TG2D.cast = "castShellter()";
talent.TG2D.cost = 15;
talent.TG2D.cd = 40;

talent.TG2D2 = {};
talent.TG2D2.position = '310px 130px'
talent.TG2D2.parent = "TG2D";
talent.TG2D2.name = "Counterfeit Garden";
talent.TG2D2.category = "Passive";
talent.TG2D2.description = `"You have a 33% chance to get an extra Bloom Token when harvesting plants"`;
talent.TG2D2.locked = true;
talent.TG2D2.lockedCondition = "Harvest 1000 plants";
talent.TG2D2.lockedLogic = "stats.plantsHarvested>999";

talent.TG2D3 = {};
talent.TG2D3.position = '360px 130px'
talent.TG2D3.parent = "TG2D2"
talent.TG2D3.name = "Chance Sprouts";
talent.TG2D3.category = "Passive";
talent.TG2D3.description = `"When foraging, theres a 10% chance to deal double damage to the node"`

talent.TG2D1 = {};
talent.TG2D1.position = '290px 170px'
talent.TG2D1.parent = "TG2D"
talent.TG2D1.name = "Thrill of the Hunt";
talent.TG2D1.category = "Passive";
talent.TG2D1.description = `"Increase"+strIcon+"Strength by"+colorTag("x1.04","#E57D08")+"for every gold medal in the bestiary<FONT COLOR='gray'> (x"+(1+(medalsGot * 0.04)).toFixed(2)+")"`;
talent.TG2D1.logic = 'medalsGot * 0.04';

talent.TG2D4 = {};
talent.TG2D4.position = '330px 200px'
talent.TG2D4.parent = "TG2D1"
talent.TG2D4.name = "King of Liars";
talent.TG2D4.category = "Passive";
talent.TG2D4.description = `"Increases"+mightIcon+"Might Bonus by"+colorTag("x1.1","#E57D08")+"for every active star of Gambler<FONT COLOR='gray'> (x"+(1+(gamblerPoints * 0.1)).toFixed(2)+")"`;
talent.TG2D4.logic = 'gamblerPoints * 0.1';
talent.TG2D4.locked = true;
talent.TG2D4.lockedCondition = "Reach level 60 with Gambler";
talent.TG2D4.lockedLogic = "rpgClass.TG0.level>59";

talent.TG2E = {};
talent.TG2E.position = '220px 90px'
talent.TG2E.parent = "TG1B"
talent.TG2E.parent2 = "TG2"
talent.TG2E.name = "Sly Thief";
talent.TG2E.category = "Passive";
talent.TG2E.description = `"Increase"+occultIcon+"Occult Bonus by"+colorTag("x1.01","#E57D08")+"for every collectible got<FONT COLOR='gray'> (x"+(1+(collectiblesGot * 0.01)).toFixed(2)+")"`;
talent.TG2E.logic = 'collectiblesGot * 0.01';

talent.TG2E1 = {};
talent.TG2E1.position = '280px 90px'
talent.TG2E1.parent = "TG2E"
talent.TG2E1.name = "Smooth Criminal";
talent.TG2E1.category = "Passive";
talent.TG2E1.description = `"Increases Thief success chance"`
talent.TG2E1.effect = 'talent.TG2E1.statUp = 50'
talent.TG2E1.locked = true;
talent.TG2E1.lockedCondition = "Use Thief 800+ Times";
talent.TG2E1.lockedLogic = "stats.timesStolen>799";

talent.TG3 = {};
talent.TG3.position = '140px 150px'
talent.TG3.parent = "TG2"
talent.TG3.parent2 = "TG1D"
talent.TG3.name = "Holy D20";
talent.TG3.category = "Passive";
talent.TG3.description = `"Increases"+deificIcon+"Deific Bonus by"+colorTag("x1.5","#E57D08")`
talent.TG3.effect = 'talent.TG3.statUp = 0.5'
talent.TG3.locked = true;
talent.TG3.lockedCondition = "Reach level 50 with Gambler";
talent.TG3.lockedLogic = "rpgClass.TG0.level>49";

talent.TI0 = {};
talent.TI0.position = '-60px 60px'
talent.TI0.parent = "T0"
talent.TI0.name = "Instrumentalist";
talent.TI0.category = "Class";
talent.TI0.description = `'Musicians might not make a lot of money, but they sure can deal a lot of damage.'`;

talent.TI0B = {};
talent.TI0B.position = '-50px 110px'
talent.TI0B.parent = "TI0"
talent.TI0B.name = "Caregiver Sonata";
talent.TI0B.description = `"Mystery Presents contain +1 additional presents"`;
talent.TI0B.effect = 'talent.TI0B.statUp = 1';

talent.TI0BASE = {};
talent.TI0BASE.position = '9999px 9999px'
talent.TI0BASE.name = "Riff Tempo";
talent.TI0BASE.category = "Skill";
talent.TI0BASE.description = `"Plays a rhythm-guided riff, <span style='color:orange'> dealing "+(0.6*playerSpellpower*100).toFixed(0)+"% of your damage as "+natureIcon+"Nature Damage 10 times</span>"`; 
talent.TI0BASE.cast = "castRiffTempo()"
talent.TI0BASE.cost = 6;
talent.TI0BASE.cd = 20;

talent.TI0C = {};
talent.TI0C.position = '-20px 170px'
talent.TI0C.parent = "TI0B"
talent.TI0C.name = "Metronome";
talent.TI0C.category = "Skill";
talent.TI0C.description = `"Go with the flow of the tempo, <span style='color:orange'> casting a random skill</span>"`;
talent.TI0C.cast = "castMetronome()" 
talent.TI0C.cost = 5;
talent.TI0C.cd = 15;

talent.TI0D = {};
talent.TI0D.position = '-80px 160px'
talent.TI0D.parent = "TI0B"
talent.TI0D.name = "Symphony of the Night";
talent.TI0D.category = "Passive";
talent.TI0D.description = `"Increases"+expIcon+"EXP Bonus by"+colorTag("x1.5","#E57D08")`
talent.TI0D.effect = 'talent.TI0D.statUp = 0.5';

talent.TI0E = {};
talent.TI0E.position = '-80px 210px'
talent.TI0E.parent = "TI0D"
talent.TI0E.name = "Archives of Ruina";
talent.TI0E.category = "Passive";
talent.TI0E.description = `"Increase"+deificIcon+"Deific Bonus by"+colorTag("x1.007","#E57D08")+"for every book collected<FONT COLOR='gray'> (x"+(1+(stats.logsGot * 0.007)).toFixed(2)+")"`;
talent.TI0E.logic = 'stats.logsGot * 0.007';
talent.TI0E.locked = true;
talent.TI0E.lockedCondition = "Complete 70+ Books";
talent.TI0E.lockedLogic = "stats.logsGot>69"; //nice

talent.TI1 = {};
talent.TI1.position = '-120px 70px'
talent.TI1.parent = "TI0"
talent.TI1.name = "Conjure Violin";
talent.TI1.category = "Skill";
talent.TI1.description = `"Summons a magic violin to fight alongside you, <span style='color:orange'> dealing "+(1*playerSpellpower*100).toFixed(0)+"% of your damage as "+natureIcon+"Nature Damage every time you attack</span>"`; 
talent.TI1.cast = 'castConjureViolin()';
talent.TI1.cost = 15;
talent.TI1.cd = 35;

talent.TI1B = {};
talent.TI1B.position = '-110px 120px'
talent.TI1B.parent = "TI1"
talent.TI1B.name = "Harmony with Nature";
talent.TI1B.category = "Passive";
talent.TI1B.description = `"Increases"+natureIcon+"Nature Bonus by"+colorTag("x1.5","#E57D08")`
talent.TI1B.effect = 'talent.TI1B.statUp = 0.5'

talent.TI1C = {};
talent.TI1C.position = '-180px 50px'
talent.TI1C.parent = "TI1"
talent.TI1C.name = "Mighty Resonance";
talent.TI1C.category = "Passive";
talent.TI1C.description = `"Increases Health by"+colorTag("x1.2","#E57D08")`
talent.TI1C.effect = 'talent.TI1C.statUp = 0.2'

talent.TI2 = {};
talent.TI2.position = '-170px 100px'
talent.TI2.parent = "TI1"
talent.TI2.parent2 = "TI3"
talent.TI2.name = "Rhythm Hell";
talent.TI2.category = "Skill";
talent.TI2.description = `"Enters a state of heightened focus for 15 seconds, during this time, <span style='color:orange'> click the enemy on-beat to deal "+(0.8*playerSpellpower*100).toFixed(0)+"% of your damage as "+natureIcon+"Nature Damage. Missing the beat will break the focus</span>"+bestiaryTag("⚜️ Dedicated Content: Kasey ⚜️", "#A351AB")`; 
talent.TI2.cast = "castRhythmHell()";
talent.TI2.cost = 10;
talent.TI2.cd = 30;

talent.TI2B = {};
talent.TI2B.position = '-210px 140px'
talent.TI2B.parent = "TI2"
talent.TI2B.name = "Perish Song";
talent.TI2B.category = "Skill";
talent.TI2B.description = `"Plays a requiem of death, <span style='color:orange'>interrupting their Casting</span> and inflicting a debuff lasting 20 seconds that deals<span style='color:orange'> "+(8*playerSpellpower*100).toFixed(0)+"% of your damage as"+occultIcon+"Occult Damage once it expires</span>"`; 
talent.TI2B.cast = "castPerishSong()";
talent.TI2B.cost = 15;
talent.TI2B.cd = 30;
talent.TI2B.locked = true;
talent.TI2B.lockedCondition = "Allocate 10+ points into Instrumentalist";
talent.TI2B.lockedLogic = "instrumentalistPoints>9";

talent.TI2B1 = {};
talent.TI2B1.position = '-260px 160px'
talent.TI2B1.parent = "TI2B"
talent.TI2B1.parent2 = "TI2C"
talent.TI2B1.name = "Refloralia";
talent.TI2B1.category = "Passive";
talent.TI2B1.description = `"Increases Flower Power by 30% <span style='color:gray'>(Flower Power increases the potency of your plant effects)</span>"`
talent.TI2B1.effect = 'talent.TI2B1.statUp = 30'

talent.TI2B2 = {};
talent.TI2B2.position = '-280px 100px'
talent.TI2B2.parent = "TI2B1"
talent.TI2B2.name = "Charm";
talent.TI2B2.category = "Passive";
talent.TI2B2.description = `"Increases Pat Multiplier by"+colorTag("x1.5","#E57D08")`
talent.TI2B2.effect = 'talent.TI2B2.statUp = 0.5';

talent.TI2B3 = {};
talent.TI2B3.position = '-320px 140px'
talent.TI2B3.parent = "TI2B1"
talent.TI2B3.name = "Fleur Intuition";
talent.TI2B3.category = "Passive";
talent.TI2B3.description = `"Increase"+expIcon+"EXP Bonus by"+colorTag("x1.015","#E57D08")+"for every seed discovered<FONT COLOR='gray'> (x"+(1+(plantCompletionProgress * 0.015)).toFixed(2)+")"`;
talent.TI2B3.logic = 'plantCompletionProgress * 0.015';
talent.TI2B3.locked = true;
talent.TI2B3.lockedCondition = "Reach Gardening Level 6+";
talent.TI2B3.lockedLogic = 'rpgPlayer.gardenLevel>5';

talent.TI2C = {};
talent.TI2C.position = '-230px 90px'
talent.TI2C.parent = "TI2B"
talent.TI2C.parent2 = "TI1C"
talent.TI2C.name = "The Fork";
talent.TI2C.category = "Passive";
talent.TI2C.description = `"Increases"+occultIcon+"Occult Bonus by"+colorTag("x1.5","#E57D08")`
talent.TI2C.effect = 'talent.TI2C.statUp = 0.5'

talent.TI3 = {};
talent.TI3.position = '-140px 170px'
talent.TI3.parent = "TI2"
talent.TI3.parent2 = "TI0D"
talent.TI3.name = "Drums of Liberation";
talent.TI3.category = "Passive";
talent.TI3.description = `"Increases"+spIcon+"Spellpower by"+colorTag('x1.5','#E57D08')+"if afflicted with a debuff"`;
talent.TI3.locked = true;
talent.TI3.lockedCondition = "Reach level 50 with Instrumentalist";
talent.TI3.lockedLogic = "rpgClass.TI0.level>49";

talent.TI3B = {};
talent.TI3B.position = '-190px 190px'
talent.TI3B.parent = "TI3"
talent.TI3B.parent2 = "TI3D"
talent.TI3B.name = "Song of Heal";
talent.TI3B.category = "Skill";
talent.TI3B.description = `"Plays a requiem of life, <span style='color:orange'> healing 100% of your Max Health during 20 seconds</span>"`; 
talent.TI3B.cast = "castSongOfHealing()";
talent.TI3B.cost = 15;
talent.TI3B.cd = 60;

talent.TI3C = {};
talent.TI3C.position = '-260px 210px'
talent.TI3C.parent = "TI3B"
talent.TI3C.name = "Enchant Giftbox";
talent.TI3C.category = "Passive";
talent.TI3C.description = `"Presents in Mystery Presents have a 20% chance to be transformed into Enchanted Presents, yielding always positive rewards"`

talent.TI3C1 = {};
talent.TI3C1.position = '-320px 190px'
talent.TI3C1.parent = "TI3C"
talent.TI3C1.name = "Reinforce Prose";
talent.TI3C1.category = "Passive";
talent.TI3C1.description = `"Increases"+natureIcon+"Nature Bonus by"+colorTag("x1.1","#E57D08")+"for every active star of Instrumentalist<FONT COLOR='gray'> (x"+(1+(instrumentalistPoints * 0.1)).toFixed(2)+")"`;
talent.TI3C1.logic = 'instrumentalistPoints * 0.1';
talent.TI3C1.locked = true;
talent.TI3C1.lockedCondition = "Reach level 60 with Instrumentalist";
talent.TI3C1.lockedLogic = "rpgClass.TI0.level>59";

talent.TI3C2 = {};
talent.TI3C2.position = '-260px 270px'
talent.TI3C2.parent = "TI3C"
talent.TI3C2.name = "Platinum Awards";
talent.TI3C2.category = "Passive";
talent.TI3C2.description = `"Defeating an enemy with Gold Medal on the Bestiary will grant "+colorTag("x1.5","#E57D08")+" additional EXP"`
talent.TI3C2.locked = true;
talent.TI3C2.lockedCondition = "Achieve 1 Platinum Medal on the Bestiary";
talent.TI3C2.lockedLogic = "platinumMedalsGot>0";

talent.TI3D = {};
talent.TI3D.position = '-130px 230px'
talent.TI3D.parent = "TI3B"
talent.TI3D.parent2 = "TI0D"
talent.TI3D.name = "Workforce Poem";
talent.TI3D.category = "Skill";
talent.TI3D.description = `"Weaves morale boosting words into the spirit, <span style='color:orange'> increasing Gathering Level and Fishing Level by +1 for 1 hour</span>"`; 
talent.TI3D.cast = "castWorkforcePoem()";
talent.TI3D.cost = 20;
talent.TI3D.cd = 30;

talent.TI3E = {};
talent.TI3E.position = '-190px 250px'
talent.TI3E.parent = "TI3B"
talent.TI3E.name = "Fortification";
talent.TI3E.category = "Passive";
talent.TI3E.description = `"Increase"+strIcon+"Strength by"+colorTag("x1.5","#E57D08")`;
talent.TI3E.effect = 'talent.TI3E.statUp = 0.5'

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
buildings.B1.description = 'Gathering resources from<br><img src="img/src/areas/A1M.png">Cradle Hills';
buildings.B1.price = 300;
buildings.B1.level = 0;
buildings.B1.mat1 = "I1";
buildings.B1.mat2 = "I51";
buildings.B1.mat3 = "I37";

buildings.B2 = {};
buildings.B2.name = 'Sawmill Plant';
buildings.B2.description = 'Increases Regeneration by'+ colorTag("x1.1","#E57D08")+'per level';
buildings.B2.price = 300;
buildings.B2.level = 0;

buildings.B3 = {};
buildings.B3.name = 'Metal Workshop';
buildings.B3.description = 'Increases Strenght by'+ colorTag("x1.1","#E57D08")+'per level';
buildings.B3.price = 300;
buildings.B3.level = 0;

buildings.B7 = {};
buildings.B7.name = 'Penguin Aviary';
buildings.B7.description = 'Increases Penguin Power by'+ colorTag("x1.1","#E57D08")+'per level';
buildings.B7.price = 300;
buildings.B7.level = 0;

buildings.B4 = {};
buildings.B4.name = 'Monster Hatchery';
buildings.B4.description = 'Increases Turtle Click rewards by'+ colorTag("x1.1","#E57D08")+'per level';
buildings.B4.price = 300;
buildings.B4.level = 0;


buildings.B5 = {};
buildings.B5.name = 'Tome Enchanter';
buildings.B5.description = 'Increases Spellpower by'+ colorTag("x1.1","#E57D08")+'per level';
buildings.B5.price = 300;
buildings.B5.level = 0;

/*
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


for (var i in buildings) { buildings[i].unlocked = false; buildings[i].statUp = 0; buildings[i].tier = 1; buildings[i].progress = 0;}


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
research.R1.timerMax = 18000;
research.R1.effect = 'buildings.B1.unlocked=true';
research.R1.img = 'img/src/buildings/B1U1.jpg';

research.R2 = {};
research.R2.name = 'Sawmill Plant';
research.R2.price = 600000;
research.R2.timerMax = 18000;
research.R2.effect = 'buildings.B2.unlocked=true';
research.R2.img = 'img/src/buildings/B2U1.jpg';

research.R3 = {};
research.R3.name = 'Metal Workshop';
research.R3.price = 600000;
research.R3.timerMax = 18000;
research.R3.effect = 'buildings.B3.unlocked=true';
research.R3.img = 'img/src/buildings/B3U1.jpg';

research.R7 = {};
research.R7.name = 'Penguin Aviary';
research.R7.price = 5000000;
research.R7.timerMax = 28800;
research.R7.effect = 'buildings.B7.unlocked=true';
research.R7.img = 'img/src/buildings/B7U1.jpg';;

research.R4 = {};
research.R4.name = 'Monster Hatchery';
research.R4.price = 300;
research.R4.timerMax = 10;
research.R4.effect = 'buildings.B4.unlocked=true';
research.R4.img = 'img/src/buildings/B4U1.jpg';

research.R5 = {};
research.R5.name = 'Tome Enchanter';
research.R5.price = 300;
research.R5.timerMax = 10;
research.R5.effect = 'buildings.B5.unlocked=true';
research.R5.img = 'img/src/buildings/B5U1.jpg';


stats.thebox = false

research.R6 = {};
research.R6.name = 'The Box';
research.R6.price = 1000000;
research.R6.timerMax = 43200;
research.R6.effect = 'stats.thebox=true';
research.R6.img = 'img/src/items/I492.jpg';



research.R1U1 = {};
research.R1U1.name = 'Gold Plated Tools';
research.R1U1.price = 600000;
research.R1U1.timerMax = 18000;
research.R1U1.effect = 'buildings.B1.tier++';
research.R1U1.img = 'img/src/buildings/B1U2.jpg';

research.R2U1 = {};
research.R2U1.name = 'Willow Tree Logs';
research.R2U1.price = 600000;
research.R2U1.timerMax = 18000;
research.R2U1.effect = 'buildings.B2.tier++';
research.R2U1.img = 'img/src/buildings/B2U2.jpg';

research.R3U1 = {};
research.R3U1.name = 'Hotter Furnaces';
research.R3U1.price = 600000;
research.R3U1.timerMax = 18000;
research.R3U1.effect = 'buildings.B3.tier++';
research.R3U1.img = 'img/src/buildings/B3U2.jpg';

research.R4U1 = {};
research.R4U1.name = 'Solar-Powered Incubators';
research.R4U1.price = 600000;
research.R4U1.timerMax = 18000;
research.R4U1.effect = 'buildings.B4.tier++';
research.R4U1.img = 'img/src/buildings/B4U2.jpg';

research.R5U1 = {};
research.R5U1.name = 'Wizard Group Chat';
research.R5U1.price = 600000;
research.R5U1.timerMax = 18000;
research.R5U1.effect = 'buildings.B5.tier++';
research.R5U1.img = 'img/src/buildings/B5U2.jpg';

research.R7U1 = {};
research.R7U1.name = 'Penguin Diplomats';
research.R7U1.price = 600000;
research.R7U1.timerMax = 18000;
research.R7U1.effect = 'buildings.B7.tier++';
research.R7U1.img = 'img/src/buildings/B7U2.jpg';

//-----------other


research.RO1 = {};
research.RO1.name = 'Nature-Infused Tech';
research.RO1.price = 300000;
research.RO1.timerMax = 18000;
research.RO1.effect = 'rareItemDrop("I434",1,rng(5,10))';
research.RO1.img = 'img/src/items/I483.jpg';

research.RO2 = {};
research.RO2.name = 'Might-Infused Tech';
research.RO2.price = 300000;
research.RO2.timerMax = 18000;
research.RO2.effect = 'rareItemDrop("I435",1,rng(5,10))';
research.RO2.img = 'img/src/items/I484.jpg';

research.RO3 = {};
research.RO3.name = 'Elemental-Infused Tech';
research.RO3.price = 300000;
research.RO3.timerMax = 18000;
research.RO3.effect = 'rareItemDrop("I436",1,rng(5,10))';
research.RO3.img = 'img/src/items/I485.jpg';

research.RO4 = {};
research.RO4.name = 'Occult-Infused Tech';
research.RO4.price = 300000;
research.RO4.timerMax = 18000;
research.RO4.effect = 'rareItemDrop("I437",1,rng(5,10))';
research.RO4.img = 'img/src/items/I486.jpg';

research.RO5 = {};
research.RO5.name = 'Deific-Infused Tech';
research.RO5.price = 300000;
research.RO5.timerMax = 18000;
research.RO5.effect = 'rareItemDrop("I438",1,rng(5,10))';
research.RO5.img = 'img/src/items/I487.jpg';

research.RO6 = {};
research.RO6.name = 'Botanical-Infused Tech';
research.RO6.price = 300000;
research.RO6.timerMax = 18000;
research.RO6.effect = 'rpgPlayer.gardenTokens  += rng(50,150); updateGardenUi()';
research.RO6.img = 'img/src/items/I496.jpg';





/*
research.R6 = {};
research.R6.name = 'Mineshaft Quarry';
research.R6.price = 300;
research.R6.timer = 10;
research.R6.effect = 'buildings.B6.unlocked=true';
research.R6.img = 'R20';
*/

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
  research[i].timer = research[i].timerMax
}
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

showdown.S3 = {};
showdown.S3.enemy = 'E44';
showdown.S3.timer = 10;
showdown.S3.bestTime = 'Undefeated';
showdown.S3.difficulty = 4;

showdown.S4 = {};
showdown.S4.enemy = 'E45';
showdown.S4.timer = 10;
showdown.S4.bestTime = 'Undefeated';
showdown.S4.difficulty = 5;

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

skirmish.S2 = {};
skirmish.S2.name = 'Trial of the Seas';
skirmish.S2.timer = 10;
skirmish.S2.bestScore = 'Undefeated';
skirmish.S2.difficulty = 7;
skirmish.S2.wave1 = 'R1';
skirmish.S2.wave2 = 'R2';
skirmish.S2.wave3 = 'R3';
skirmish.S2.wave4 = 'R4';
skirmish.S2.wave5 = 'R5';
skirmish.S2.wave6 = 'R6';
skirmish.S2.wave7 = 'R7';

var shopHonor = {}

//shop 1
shopHonor.SH1 = {}
shopHonor.SH1.item = 'I395';
shopHonor.SH1.price = 100000;
shopHonor.SH1.stock = 1;
shopHonor.SH1.parent = 'honorShopListing1';

shopHonor.SH2 = {}
shopHonor.SH2.item = 'I96';
shopHonor.SH2.price = 30000;
shopHonor.SH2.stock = 2;
shopHonor.SH2.parent = 'honorShopListing1';

shopHonor.SH3 = {}
shopHonor.SH3.item = 'I209';
shopHonor.SH3.price = 10000;
shopHonor.SH3.stock = 3;
shopHonor.SH3.parent = 'honorShopListing1';

//shop 2

shopHonor.SH6 = {}
shopHonor.SH6.item = 'I218';
shopHonor.SH6.price = 800000;
shopHonor.SH6.stock = 1;
shopHonor.SH6.parent = 'honorShopListing2';

shopHonor.SH7 = {}
shopHonor.SH7.item = 'I423';
shopHonor.SH7.price = 100000;
shopHonor.SH7.stock = 1;
shopHonor.SH7.parent = 'honorShopListing2';

shopHonor.SH8 = {}
shopHonor.SH8.item = 'I213';
shopHonor.SH8.price = 1000000;
shopHonor.SH8.stock = 1;
shopHonor.SH8.parent = 'honorShopListing2';


//shop 3

shopHonor.SHC1A = {}
shopHonor.SHC1A.item = 'I210';
shopHonor.SHC1A.price = 1000000;
shopHonor.SHC1A.stock = 1;
shopHonor.SHC1A.parent = 'honorShopListing3';

shopHonor.SHC2A = {}
shopHonor.SHC2A.item = 'I177';
shopHonor.SHC2A.price = 300000;
shopHonor.SHC2A.stock = 5;
shopHonor.SHC2A.parent = 'honorShopListing3';

shopHonor.SHC5 = {}
shopHonor.SHC5.item = 'I432';
shopHonor.SHC5.price = 800000;
shopHonor.SHC5.stock = 1;
shopHonor.SHC5.parent = 'honorShopListing3';


//sh3



shopHonor.SHD3 = {}
shopHonor.SHD3.item = 'I492';
shopHonor.SHD3.price = 500000;
shopHonor.SHD3.stock = 1;
shopHonor.SHD3.parent = 'honorShopListing4';

shopHonor.SHD4 = {}
shopHonor.SHD4.item = 'I219';
shopHonor.SHD4.price = 1200000;
shopHonor.SHD4.stock = 3;
shopHonor.SHD4.parent = 'honorShopListing4';

shopHonor.SHD5 = {}
shopHonor.SHD5.item = 'I26';
shopHonor.SHD5.price = 1;
shopHonor.SHD5.stock = 1;
shopHonor.SHD5.parent = 'honorShopListing4';

//sh4

shopHonor.SHE1 = {}
shopHonor.SHE1.item = 'I0';
shopHonor.SHE1.price = 1000000;
shopHonor.SHE1.stock = 1;
shopHonor.SHE1.parent = 'honorShopListing5';




//for (var i in research) { research[i].status = "waiting"; research[i].unlocked = true;}

//#endregion

let armoryheirloomTotal = 0;
let armorymillionaireTotal = 0;
let armoryforgottenTotal = 0;
let armorymasterworkTotal = 0;
let armorybeastfallenTotal = 0;
let armoryreveredTotal = 0;
let armorysolsticeTotal = 0;

let armoryancientTotal = 0;
let armorymalevolentTotal = 0;
let armorychosenTotal = 0;
let armorytoyboxTotal = 0;
let armoryrunicTotal = 0;
let armoryomegaTotal = 0;

let armoryheirloomGot = 0;
let armorymillionaireGot = 0;
let armoryforgottenGot = 0;
let armorymasterworkGot = 0;
let armorybeastfallenGot = 0;
let armoryreveredGot = 0;
let armorysolsticeGot = 0;

let armoryancientGot = 0;
let armorymalevolentGot = 0;
let armorychosenGot = 0;
let armorytoyboxGot = 0;
let armoryrunicGot = 0;
let armoryomegaGot = 0;

let totalArmoryGot = 0
let totalArmory = 0



//#endregion

//----------------------==========================-----------------------
//----------------------============Garden========-----------------------
//----------------------==========================-----------------------
//#region Buildings

let plot = {}

plot.r1plot1 = {}
plot.r1plot2 = {}
plot.r1plot3 = {}
plot.r1plot4 = {}
plot.r1plot5 = {}
plot.r1plot6 = {}

plot.r2plot1 = {}
plot.r2plot2 = {}
plot.r2plot3 = {}
plot.r2plot4 = {}
plot.r2plot5 = {}
plot.r2plot6 = {}

plot.r3plot1 = {}
plot.r3plot2 = {}
plot.r3plot3 = {}
plot.r3plot4 = {}
plot.r3plot5 = {}
plot.r3plot6 = {}

plot.r4plot1 = {}
plot.r4plot2 = {}
plot.r4plot3 = {}
plot.r4plot4 = {}
plot.r4plot5 = {}
plot.r4plot6 = {}

plot.r5plot1 = {}
plot.r5plot2 = {}
plot.r5plot3 = {}
plot.r5plot4 = {}
plot.r5plot5 = {}
plot.r5plot6 = {}

for (var i in plot) {
  plot[i].slot = "none";
  plot[i].water = 0;
  plot[i].age = 0;
  plot[i].mature = false;
}



function returnPlantCatalogue(plant){



  if (plants[plant].harvested>0) return colorTag(plants[plant].name, plants[plant].color)
    else return colorTag("?????", "gray")


}

let plants = {}

//mutations should have a differnt value like +10
const plantTier1exp = 2
const plantTier2exp = 6
const plantTier3exp = 15
const plantTier4exp = 29
const plantTier5exp = 40

const plantLifespanShort = 7200 //2 hours of maturity
const plantLifespanMedium = 14400 //4 hours of maturity
const plantLifespanLong = 28800 //8 hours of maturity

plants.none = {}
plants.none.name = "No Plant";
plants.none.color = "#57A157";
plants.none.description = "Mistakes were made";
plants.none.age = 0;
plants.none.count = 0;

plants.g2 = {}
plants.g2.name = "Green Sprout";
plants.g2.color = "#57A157";
plants.g2.description = 'Harvest to obtain +1 Bloom Tokens';
plants.g2.harvest = '';
plants.g2.age = plantLifespanShort;
plants.g2.exp = 1;
plants.g2.tier = 0;

plants.g2a = {}
plants.g2a.name = "Star Sprout 🧬";
plants.g2a.color = "#629496";
plants.g2a.description = 'Harvest to obtain +10 Bloom Tokens';
plants.g2a.harvest = 'rpgPlayer.gardenTokens+=9';
plants.g2a.age = plantLifespanMedium;
plants.g2a.exp = plantTier2exp;
plants.g2a.catalogue = 'returnPlantCatalogue("g2a")+ " + " +returnPlantCatalogue("g12")+ " = " +returnPlantCatalogue("g19")';
plants.g2a.catalogue2 = 'returnPlantCatalogue("g2a")+ " + " +returnPlantCatalogue("g4a")+ " = " +returnPlantCatalogue("g8")'
plants.g2a.tier = 0;

plants.g1 = {}
plants.g1.name = "Cactus";
plants.g1.color = "#57A157";
plants.g1.description = 'Reflects 3% of damage as Nature Damage';
plants.g1.age = plantLifespanShort;
plants.g1.exp = plantTier1exp;
plants.g1.price = 2;
plants.g1.tier = 1;

plants.g1a = {}
plants.g1a.name = "Flowering Cactus 🧬";
plants.g1a.color = "#629496";
plants.g1a.description = 'Reflects 10% of damage as Nature Damage';
plants.g1a.age = plantLifespanMedium;
plants.g1a.exp = plantTier2exp;
plants.g1a.catalogue = 'returnPlantCatalogue("g1a")+ " + " +returnPlantCatalogue("g6")+ " = " +returnPlantCatalogue("g12")';
plants.g1a.tier = 1;

plants.g3 = {}
plants.g3.name = "Sunflower";
plants.g3.color = "#57A157";
plants.g3.description = 'Increases Deific Damage by'+colorTag("x1.02","#E57D08");
plants.g3.age = plantLifespanShort;
plants.g3.exp = plantTier1exp;
plants.g3.price = 2;
plants.g3.tier = 1;

plants.g3a = {}
plants.g3a.name = "Astroflower 🧬";
plants.g3a.color = "#629496";
plants.g3a.description = 'Increases Deific Damage by'+colorTag("x1.1","#E57D08");
plants.g3a.age = plantLifespanMedium;
plants.g3a.exp = plantTier2exp;
plants.g3a.catalogue = 'returnPlantCatalogue("g3a")+ " + " +returnPlantCatalogue("g15")+ " = " +returnPlantCatalogue("g9")';
plants.g3a.tier = 1;

plants.g4 = {}
plants.g4.name = "Red Chili";
plants.g4.color = "#57A157";
plants.g4.description = 'Increases Elemental Damage by'+colorTag("x1.02","#E57D08");
plants.g4.age = plantLifespanShort;
plants.g4.exp = plantTier1exp;
plants.g4.catalogue = 'returnPlantCatalogue("g4")+ " + " +returnPlantCatalogue("g5a")+ " = " +returnPlantCatalogue("g15")';
plants.g4.price = 2;
plants.g4.tier = 1;

plants.g4a = {}
plants.g4a.name = "Sweet Chili 🧬";
plants.g4a.color = "#629496";
plants.g4a.description = 'Increases Elemental Damage by'+colorTag("x1.1","#E57D08");
plants.g4a.age = plantLifespanMedium;
plants.g4a.exp = plantTier2exp;
plants.g4a.catalogue = 'returnPlantCatalogue("g4a")+ " + " +returnPlantCatalogue("g2a")+ " = " +returnPlantCatalogue("g8")';
plants.g4a.tier = 1;

plants.g5 = {}
plants.g5.name = "Blueberry";
plants.g5.color = "#57A157";
plants.g5.description = 'Increases Occult Damage by'+colorTag("x1.02","#E57D08");
plants.g5.age = plantLifespanShort;
plants.g5.exp = plantTier1exp;
plants.g5.price = 2;
plants.g5.tier = 1;

plants.g5a = {}
plants.g5a.name = "Cloudberry 🧬";
plants.g5a.color = "#629496";
plants.g5a.description = 'Increases Occult Damage by'+colorTag("x1.1","#E57D08");
plants.g5a.age = plantLifespanMedium;
plants.g5a.exp = plantTier2exp;
plants.g5a.catalogue = 'returnPlantCatalogue("g5a")+ " + " +returnPlantCatalogue("g4")+ " = " +returnPlantCatalogue("g15")';
plants.g5a.tier = 1;

plants.g6 = {}
plants.g6.name = "Pineapple";
plants.g6.color = "#57A157";
plants.g6.description = 'Increases Might Damage by'+colorTag("x1.02","#E57D08");
plants.g6.age = plantLifespanShort;
plants.g6.exp = plantTier1exp;
plants.g6.catalogue = 'returnPlantCatalogue("g6")+ " + " +returnPlantCatalogue("g1a")+ " = " +returnPlantCatalogue("g12")';
plants.g6.catalogue2 = 'returnPlantCatalogue("g6")+ " + " +returnPlantCatalogue("g7a")+ " = " +returnPlantCatalogue("g13")';
plants.g6.price = 2;
plants.g6.tier = 1;

plants.g6a = {}
plants.g6a.name = "Carved Pineapple 🧬";
plants.g6a.color = "#629496";
plants.g6a.description = 'Increases Might Damage by'+colorTag("x1.1","#E57D08");
plants.g6a.age = plantLifespanMedium;
plants.g6a.exp = plantTier2exp;
plants.g6a.catalogue = 'returnPlantCatalogue("g6a")+ " + " +returnPlantCatalogue("g7")+ " = " +returnPlantCatalogue("g14")';
plants.g6a.tier = 1;

plants.g7 = {}
plants.g7.name = "Red Rose";
plants.g7.color = "#57A157";
plants.g7.description = 'Increases Nature Damage by'+colorTag("x1.02","#E57D08");
plants.g7.age = plantLifespanShort;
plants.g7.exp = plantTier1exp;
plants.g7.catalogue = 'returnPlantCatalogue("g7")+ " + " +returnPlantCatalogue("g6a")+ " = " +returnPlantCatalogue("g14")';
plants.g7.price = 2;
plants.g7.tier = 1;

plants.g7a = {}
plants.g7a.name = "Crystal Rose 🧬";
plants.g7a.color = "#629496";
plants.g7a.description = 'Increases Nature Damage by'+colorTag("x1.1","#E57D08");
plants.g7a.age = plantLifespanMedium;
plants.g7a.exp = plantTier2exp;
plants.g7a.catalogue = 'returnPlantCatalogue("g7a")+ " + " +returnPlantCatalogue("g6")+ " = " +returnPlantCatalogue("g13")';
plants.g7a.tier = 1;

plants.g10 = {}
plants.g10.name = "Chocobloom";
plants.g10.color = "#57A157";
plants.g10.description = 'Harvest to get +1 cookie';
plants.g10.age = plantLifespanShort;
plants.g10.exp = plantTier1exp;
plants.g10.price = 1;
plants.g10.tier = 1;
plants.g10.harvest = 'items.I14.count++; addItem()';

plants.g10a = {}
plants.g10a.name = "Butterscorch 🧬";
plants.g10a.color = "#629496";
plants.g10a.description = 'Harvest to get +10 cookies';
plants.g10a.age = plantLifespanShort;
plants.g10a.exp = plantTier2exp;
plants.g10a.tier = 1;
plants.g10a.harvest = 'items.I14.count+=10; addItem()';

plants.g8 = {}
plants.g8.name = "Starmelo";
plants.g8.color = "#57A157";
plants.g8.description = 'Increases Strength by'+colorTag("x1.01","#E57D08");
plants.g8.age = plantLifespanMedium;
plants.g8.exp = plantTier2exp;
plants.g8.price = 3;
plants.g8.tier = 2;

plants.g8a = {}
plants.g8a.name = "Flametreat 🧬";
plants.g8a.color = "#629496";
plants.g8a.description = 'Increases Strength by'+colorTag("x1.06","#E57D08");
plants.g8a.age = plantLifespanMedium;
plants.g8a.exp = plantTier3exp;
plants.g8a.tier = 2;

plants.g9 = {}
plants.g9.name = "Pink Lotus";
plants.g9.color = "#57A157";
plants.g9.description = 'Increases Spellpower by'+colorTag("x1.01","#E57D08");
plants.g9.age = plantLifespanMedium;
plants.g9.exp = plantTier3exp;
plants.g9.price = 5;
plants.g9.tier = 2;

plants.g9a = {}
plants.g9a.name = "Black Lotus 🧬";
plants.g9a.color = "#629496";
plants.g9a.description = 'Increases Spellpower by'+colorTag("x1.06","#E57D08");
plants.g9a.age = 7200;
plants.g9a.catalogue = 'returnPlantCatalogue("g9a")+ " + " +returnPlantCatalogue("g16")+ " = " +returnPlantCatalogue("g17")';
plants.g9a.age = plantLifespanMedium;
plants.g9a.exp = plantTier4exp;
plants.g9a.tier = 2;

plants.g12 = {}
plants.g12.name = "Pricklypine";
plants.g12.color = "#57A157";
plants.g12.description = 'Increases Pat Power by'+colorTag("x1.02","#E57D08");
plants.g12.age = plantLifespanMedium;
plants.g12.exp = plantTier2exp;
plants.g12.catalogue = 'returnPlantCatalogue("g12")+ " + " +returnPlantCatalogue("g2a")+ " = " +returnPlantCatalogue("g19")';
plants.g12.catalogue2 = 'returnPlantCatalogue("g12")+ " + " +returnPlantCatalogue("g16")+ " = " +returnPlantCatalogue("g18")';
plants.g12.price = 3;
plants.g12.tier = 2;

plants.g12a = {}
plants.g12a.name = "Piñata 🧬";
plants.g12a.color = "#629496";
plants.g12a.description = 'Increases Pat Power by'+colorTag("x1.1","#E57D08");
plants.g12a.age = plantLifespanMedium;
plants.g12a.exp = plantTier3exp;
plants.g12a.tier = 2;

plants.g13 = {}
plants.g13.name = "Glacierfruit";
plants.g13.color = "#57A157";
plants.g13.description = 'Increases EXP Bonus by'+colorTag("x1.02","#E57D08");
plants.g13.age = plantLifespanMedium;
plants.g13.exp = plantTier2exp;
plants.g13.price = 3;
plants.g13.tier = 2;

plants.g13a = {}
plants.g13a.name = "Frozen Jizo 🧬";
plants.g13a.color = "#629496";
plants.g13a.description = 'Increases EXP Bonus by'+colorTag("x1.1","#E57D08");
plants.g13a.age = plantLifespanMedium;
plants.g13a.exp = plantTier3exp;
plants.g13a.tier = 2;

plants.g14 = {}
plants.g14.name = "Cedarose";
plants.g14.color = "#57A157";
plants.g14.description = 'Increases Max Health by'+colorTag("x1.01","#E57D08");
plants.g14.age = plantLifespanMedium;
plants.g14.exp = plantTier2exp;
plants.g14.price = 3;
plants.g14.tier = 2;

plants.g14a = {}
plants.g14a.name = "Maplebloom 🧬";
plants.g14a.color = "#629496";
plants.g14a.description = 'Increases Max Health by'+colorTag("x1.07","#E57D08");
plants.g14a.age = plantLifespanMedium;
plants.g14a.exp = plantTier3exp;
plants.g14a.catalogue = 'returnPlantCatalogue("g14a")+ " + " +returnPlantCatalogue("g19a")+ " = " +returnPlantCatalogue("g11")';
plants.g14a.price = 3;
plants.g14a.tier = 2;

plants.g15 = {}
plants.g15.name = "Peperuvola";
plants.g15.color = "#57A157";
plants.g15.description = 'Increases mutation chance by 20%';
plants.g15.age = plantLifespanMedium;
plants.g15.exp = plantTier2exp;
plants.g15.catalogue = 'returnPlantCatalogue("g15")+ " + " +returnPlantCatalogue("g3a")+ " = " +returnPlantCatalogue("g9")';
plants.g15.price = 3;
plants.g15.tier = 2;

plants.g15a = {}
plants.g15a.name = "Tortube 🧬";
plants.g15a.color = "#629496";
plants.g15a.description = 'Increases mutation chance by 75%';
plants.g15a.age = plantLifespanMedium;
plants.g15a.exp = plantTier3exp;
plants.g15a.price = 3;
plants.g15a.tier = 2;

plants.g16 = {}
plants.g16.name = "ERR?OR";
plants.g16.color = "#F6051D";
plants.g16.description = '?T-xt st?le={{ color: "!e74c3c", fo';
plants.g16.age = plantLifespanLong;
plants.g16.exp = plantTier3exp;
plants.g16.catalogue = 'returnPlantCatalogue("g16")+ " + " +returnPlantCatalogue("g12")+ " = " +returnPlantCatalogue("g18")';
plants.g16.catalogue2 = 'returnPlantCatalogue("g16")+ " + " +returnPlantCatalogue("g9a")+ " = " +returnPlantCatalogue("g17")';
plants.g16.price = 40;
plants.g16.tier = 2;


plants.g18 = {}
plants.g18.name = "N?URAL CACT?S";
plants.g18.color = "#57A157";
plants.g18.description = 'Increases Magic regeneration by 0.01';
plants.g18.age = plantLifespanMedium;
plants.g18.exp = plantTier3exp;
plants.g18.price = 5;
plants.g18.tier = 3;

plants.g18a = {}
plants.g18a.name = "F!ROG? 🧬";
plants.g18a.color = "#629496";
plants.g18a.description = 'Increases Magic regeneration by 0.05';
plants.g18a.age = plantLifespanMedium;
plants.g18a.exp = plantTier4exp;
plants.g18a.tier = 3;

plants.g19 = {}
plants.g19.name = "Invidragius";
plants.g19.color = "#57A157";
plants.g19.description = 'Enemies drop 3 Shells when defeated'+bestiaryTag("⚜️ Dedicated Content: invisibilia_draconis ⚜️", "#A351AB", "auto");
plants.g19.age = plantLifespanMedium;
plants.g19.exp = plantTier3exp;
plants.g19.price = 5;
plants.g19.tier = 3;

plants.g19a = {}
plants.g19a.name = "Invidragius Avaritia 🧬";
plants.g19a.color = "#629496";
plants.g19a.description = 'Enemies drop 30 Shells when defeated'+bestiaryTag("⚜️ Dedicated Content: invisibilia_draconis ⚜️", "#A351AB", "auto");
plants.g19a.age = plantLifespanMedium;
plants.g19a.exp = plantTier4exp;
plants.g19a.catalogue = 'returnPlantCatalogue("g19a")+ " + " +returnPlantCatalogue("g14a")+ " = " +returnPlantCatalogue("g11")';
plants.g19a.tier = 3;

plants.g11 = {}
plants.g11.name = "Pine Tree [WIP]";
plants.g11.color = "#57A157";
plants.g11.description = 'Increases Drop Bonus by'+colorTag("x1.02","#E57D08");
plants.g11.age = plantLifespanMedium;
plants.g11.exp = plantTier4exp;
plants.g11.price = 9;
plants.g11.tier = 4;

plants.g11a = {}
plants.g11a.name = "Christmas Tree 🧬 [WIP]";
plants.g11a.color = "#629496";
plants.g11a.description = 'Increases Drop Bonus by'+colorTag("x1.1","#E57D08");
plants.g11a.age = plantLifespanMedium;
plants.g11a.exp = plantTier5exp;
plants.g11a.tier = 4;

plants.g17 = {}
plants.g17.name = "ARCH R?SE";
plants.g17.color = "#57A157";
plants.g17.description = 'Increases Flower Power by 10%';
plants.g17.age = plantLifespanMedium;
plants.g17.exp = plantTier4exp;
plants.g17.price = 9;
plants.g17.tier = 4;

plants.g17a = {}
plants.g17a.name = "AR?H ROSE CLUS!ER 🧬";
plants.g17a.color = "#629496";
plants.g17a.description = 'Increases Flower Power by 30%';
plants.g17a.age = plantLifespanMedium;
plants.g17a.exp = plantTier5exp;
plants.g17a.tier = 4;


for (var i in plants) {
  plants[i].count = 0;
  plants[i].planted = 0;
  plants[i].harvested = 0;
}

plants.g2.count = 1;



function giveAllPlants(){
  for (var i in plants) {
    plants[i].count = 999;
  }
  
}




//fertiliser

let fertiliser = {}

fertiliser.f0 = {}
fertiliser.f0.name = "Bag of Ice Cubes";
fertiliser.f0.description = 'Completely halts plant growth and effects';

fertiliser.f1 = {}
fertiliser.f1.name = "Quality Fertiliser";
fertiliser.f1.description = 'Plants have a chance to drop an extra<img src="img/src/garden/gardenToken.jpg">Bloom Token when harvested';

fertiliser.f2 = {}
fertiliser.f2.name = "Water-Retaining Fertiliser";
fertiliser.f2.description = "Plants no longer need water nor speeds up growth, but plants grow to maturity 80% faster";

fertiliser.f3 = {}
fertiliser.f3.name = "Sack of Microbots";
fertiliser.f3.description = "Plants get automatically replanted on death if you got their seeds, but they cannot crossbreed";

for (var i in fertiliser) {
  fertiliser[i].unlocked = false;
}

fertiliser.f1.unlocked = true;
fertiliser.f0.unlocked = true;

var gardenShop = {}



//shop 0

gardenShop.GS0I1 = {}
gardenShop.GS0I1.item = 'I309';
gardenShop.GS0I1.price = 20;
gardenShop.GS0I1.stock = "∞";
gardenShop.GS0I1.parent = 'gardenShopListing0';
gardenShop.GS0I1.effect = 'basicSeedPouch()';

//shop 1

gardenShop.GS1I1 = {}
gardenShop.GS1I1.item = 'I305';
gardenShop.GS1I1.price = 30;
gardenShop.GS1I1.stock = 1;
gardenShop.GS1I1.parent = 'gardenShopListing1';
gardenShop.GS1I1.effect = 'playSound("audio/retro2.mp3"); unlocks.seedCompendium=true; items.I305.gotOnce=true ;unlocksReveal();';

//shop 2


gardenShop.GS2I3 = {}
gardenShop.GS2I3.item = 'I308';
gardenShop.GS2I3.price = 60;
gardenShop.GS2I3.stock = 1;
gardenShop.GS2I3.parent = 'gardenShopListing2';
gardenShop.GS2I3.effect = 'playSound("audio/retro2.mp3"); unlocks.seedShipping=true; items.I308.gotOnce=true ; unlocksReveal();';

//shop 3

gardenShop.GS2I1 = {}
gardenShop.GS2I1.item = 'I301';
gardenShop.GS2I1.price = 90;
gardenShop.GS2I1.stock = 1;
gardenShop.GS2I1.parent = 'gardenShopListing3';
gardenShop.GS2I1.effect = 'playSound("audio/retro2.mp3"); unlocks.gardenUpgrade1=true; items.I305.gotOnce=true; unlocksReveal();';
/*
gardenShop.GS3I1 = {}
gardenShop.GS3I1.item = 'I306';
gardenShop.GS3I1.price = 35000;
gardenShop.GS3I1.stock = 1;
gardenShop.GS3I1.parent = 'gardenShopListing3'; */

//shop 4

gardenShop.GS5I2 = {}
gardenShop.GS5I2.item = 'I304';
gardenShop.GS5I2.price = 200;
gardenShop.GS5I2.stock = 1;
gardenShop.GS5I2.parent = 'gardenShopListing4'; //esto level 5
gardenShop.GS5I2.effect = 'playSound("audio/retro2.mp3"); unlocks.fertiliser=true; items.I304.gotOnce=true ; unlocksReveal(); rpgPlayer.currentFertiliser = "f1"';

gardenShop.GS5I3 = {}
gardenShop.GS5I3.item = 'I312';
gardenShop.GS5I3.price = 50;
gardenShop.GS5I3.stock = "∞";
gardenShop.GS5I3.parent = 'gardenShopListing4'; 
gardenShop.GS5I3.effect = 'items.I312.count++; addItem()';

//shop 5
/*
gardenShop.GS5I1 = {}
gardenShop.GS5I1.item = 'I308';
gardenShop.GS5I1.price = 35000;
gardenShop.GS5I1.stock = 1;
gardenShop.GS5I1.parent = 'gardenShopListing5'; */

gardenShop.GS5I1 = {}
gardenShop.GS5I1.item = 'I379';
gardenShop.GS5I1.price = 300;
gardenShop.GS5I1.stock = 1;
gardenShop.GS5I1.parent = 'gardenShopListing5'; 
gardenShop.GS5I1.effect = 'playSound("audio/retro2.mp3"); items.I379.gotOnce=true ; unlocksReveal(); fertiliser.f2.unlocked = true;';


//shop 6

gardenShop.GS6I1 = {}
gardenShop.GS6I1.item = 'I302';
gardenShop.GS6I1.price = 400;
gardenShop.GS6I1.stock = 1;
gardenShop.GS6I1.parent = 'gardenShopListing6'; 
gardenShop.GS6I1.effect = 'playSound("audio/retro2.mp3"); unlocks.gardenUpgrade2=true; items.I302.gotOnce=true; unlocksReveal();';

gardenShop.GS6I2 = {}
gardenShop.GS6I2.item = 'I213';
gardenShop.GS6I2.price = 500;
gardenShop.GS6I2.stock = 1;
gardenShop.GS6I2.parent = 'gardenShopListing6'; 
gardenShop.GS6I2.effect = 'items.I213.count++; addItem()';

//shop 7

gardenShop.GS7I1 = {}
gardenShop.GS7I1.item = 'I494';
gardenShop.GS7I1.price = 500;
gardenShop.GS7I1.stock = 1;
gardenShop.GS7I1.parent = 'gardenShopListing7'; 
gardenShop.GS7I1.effect = 'playSound("audio/retro2.mp3"); items.I494.gotOnce=true ; unlocksReveal(); fertiliser.f3.unlocked = true;';

/*
gardenShop.GS6I1 = {}
gardenShop.GS6I1.item = 'I303';
gardenShop.GS6I1.price = 35000;
gardenShop.GS6I1.stock = 1;
gardenShop.GS6I1.parent = 'gardenShopListing6';

gardenShop.GS6I2 = {}
gardenShop.GS6I2.item = 'I307';
gardenShop.GS6I2.price = 35000;
gardenShop.GS6I2.stock = 1;
gardenShop.GS6I2.parent = 'gardenShopListing6';

*/

//#endregion

function gametipUnlock(number){
  if (gametip[number].unlocked===false) {
    gametip[number].unlocked = true;
    did('botonGameGuide').style.animation = "newGameTip 1.5s infinite linear, gelatine 0.4s 1";
    playSound("audio/levelup.mp3");
    createGametip();
  } 
}

let gametip = {}

gametip.gt0 = {}
gametip.gt0.name = "Introduction";
gametip.gt0.description ='Welcome to Super Turtle Idle, an incremental idle RPG. Complete quests, gather materials by idling, and tackle mighty foes!<br><br>Upgrade any weapon or armor you want, no pressure or strings attached. Is the foe too mighty? Engage with the different systems of the game to gain Mastery or try your luck getting new gear you never got before.<br><br>Getting rare items can be a daunting task at first, so dont hesitate to come back later when you\'re able to efficiently farm them. Do not worry, as said gear will always be useful no matter when you decide to get it!';

gametip.gt1 = {}
gametip.gt1.name = "Inventory I";
gametip.gt1.description = 'Inventory has no limit on the amount of different items you can have at once. However, some items like Potions can only be carried in specific quantities.<br><br>Right click equips gear. Items marked as'+colorTag("Unique", "#c28757")+'will only be able to be carried once. If an excess item is picked up, it will get automatically'+colorTag("deleted.", "#db4242")+'<br><br>The <img src="img/src/icons/shopButton.png"> button activates'+colorTag("Sell Mode", "#615ebf")+'while the <img src="img/src/icons/lockButton.png"> button activates'+colorTag("Lock Mode.", "gray")+'<br><br>Press <img src="img/src/icons/sortAll.png"> to sort your inventory.<br><br>You can see your current acquired upgrades inside the Statistics window.';

gametip.gt9 = {}
gametip.gt9.name = "Inventory II";
gametip.gt9.description = bestiaryTag("New Inventory Functions")+'The <img src="img/src/icons/favoritesAdd.png"> Favorites Button adds items to the <img src="img/src/icons/sortFavorites.png"> page. This will persist even if the item is no longer present, meaning it can automatically sort desired items for you.<br><br>The <img src="img/src/icons/vaultAdd.png"> Vault Button adds items to the <img src="img/src/icons/sortVault.png"> page. Items there won\'t show up in any other page of the inventory. Use it to store less used items.'+bestiaryTag("Inventory Sorting")+'<img src="img/src/icons/sortAll.png"> "All" page.<br><br><img src="img/src/icons/sortMaterials.png"> "Materials" page.<br><br><img src="img/src/icons/sortBattle.png"> "Consumables" page.<br><br><img src="img/src/icons/sortEquip.png"> "Gear" page.<br><br><img src="img/src/icons/sortMisc.png"> "Miscellaneous" page.<br><br>';

gametip.gt17 = {}
gametip.gt17.name = "Item Rarities";
gametip.gt17.description = 'All items are classified based on their rarity. Higher rarity gear will inherently have better stats, but will also be much more difficult to obtain.<br><br>Consider only trying to obtain such gear if your means of defeating the enemy are fast enough.<br><br>The regular rarities are the following: '+colorTag("Poor", returnQualityColor("Poor"))+colorTag("Common", "Black")+colorTag("Uncommon", returnQualityColor("Uncommon"))+colorTag("Rare", returnQualityColor("Rare"))+colorTag("Epic", returnQualityColor("Epic"))+colorTag("Mythic", returnQualityColor("Mythic"))+'<br>and'+colorTag("Legendary", returnQualityColor("Legendary"))+', each one more rare and powerful than the last.<br><br>Additionally, each gear has a Tier. Higher Tier means higher stats. Effectively, a common Tier II item has the same damage as a rare Tier I one.';

gametip.gt2 = {}
gametip.gt2.name = "Equipment Upgrading";
gametip.gt2.description = 'Gear with a level on their description is eligible to upgrade. To upgrade gear, press the'+colorTag("Upgrade", "#db4242")+'button on your inventory, and select the piece you want to upgrade.<br><br>As gear upgrades, it will often acquire new skills and bonuses if the level requirement is met. Gear will always keep their level even if its sold.<br><br>Keep in mind that higher rarities of gear will demand higher quantities of resources and shells, so consider the costs before upgrading them.';

gametip.gt20 = {}
gametip.gt20.name = "Player Stats";
gametip.gt20.description = colorTag("Mastery", "#464ACB")+' increases your Health and Attack exponentially, and is the main way to get stronger.<br><br>'+colorTag("Alignment Bonus", "#46CB4C")+' will increase your damage from all sources of that specific alignment. Includes, but is not limited to, status effects, skills, weapon skills and consumable items.<br><br>'+colorTag("Alignment Resistances", "#CB5E46")+' decreases your damage taken from that specific Alignment.<br><br>'+colorTag("Strength", "#CB7F46")+' increases the damage of your turtle\'s auto-attacks.<br><br>'+colorTag("Spellpower", "#446CC9")+' increases the percentage that magic skills use to determine their power.';

gametip.gt21 = {}
gametip.gt21.name = "Offline Gains";
gametip.gt21.description = 'Turtlebot will keep working hard while you are not inside the game. You will get resources, rare items, collectibles, experience and defeats of the current enemy while doing so. Your'+colorTag("Offline Multiplier", "#45a3a2")+'determines how fast you can defeat the enemies.<br><br>However, to be eligible for this, you will need to defeat the enemy you want them to farm at least'+colorTag("100 times.", "coral")+'';

gametip.gt6 = {}
gametip.gt6.name = "Alignments";
gametip.gt6.description = 'Every attack and enemy has an Alignment.<br><br>You can check which alignment the enemy has by hovering over it. Attacks will increase or decrease in damage depending on which Alignment is being attacked.<br><br>You can check at any time the chart in the Stats Panel by hovering over the duck.';

gametip.gt14 = {}
gametip.gt14.name = "Bosses and Mighty Foes";
gametip.gt14.description ='While fighting a boss, passive Health regeneration will be'+colorTag("disabled.", "#db4242")+"If its your first time defeating said boss, you will get awarded with one random item of theirs.";

gametip.gt22 = {}
gametip.gt22.name = "Combat: Status Effects";
gametip.gt22.description ='This is a list of the commonly shared status effects that can be inflicted by both you and the enemies.'+bestiaryTag("Damage Over Time")+'These debuffs can be cleansed and resisted with their respective alignment resistance;<br><br>'+buffIcon("B1")+' Poison deals '+natureIcon+' Nature Damage<br>'+buffIcon("B25")+' Hex deals '+occultIcon+' Occult Damage<br>'+buffIcon("B16")+' Burn deals '+elementalIcon+' Elemental Damage<br>'+buffIcon("B32")+' Bleed deals '+mightIcon+' Might Damage<br>'+buffIcon("B51")+' Sacro deals '+deificIcon+' Deific Damage<br><br>'+bestiaryTag("Status")+'These debuffs are usually inflicted by enemies and are varied in their effect;<br><br>'+buffIcon("B52")+' Wounded will prevent healing. Cannot be cleansed<br>'+buffIcon("B31")+' Seized will prevent you from using items<br>'+buffIcon("B15")+' Curse will kill at 15 stacks. Cannot be cleansed<br>'+buffIcon("B17")+' Silence will prevent you from using skills<br>'+buffIcon("B21")+' Paralysis will prevent you from auto-atacking<br>'+buffIcon("B35")+' Petrified will prevent you from doing any action. Cannot be removed<br>'+buffIcon("B36")+' Slow will lower your attack speed<br>'+buffIcon("B23")+' Blind will prevent you from seeing your Health<br>'+buffIcon("B22")+' Spell Fizz will sometimes make your skills backfire<br>'+buffIcon("B27")+' Weak will lower your damage<br>'+buffIcon("B28")+' Mirror will reflect your skills back at you<br>'+buffIcon("B30")+' Zombie will make healing hurt you';

gametip.gt15 = {}
gametip.gt15.name = "Combat: Alerted";
gametip.gt15.description ='Sometimes, enemies will have some of their skills marked with a '+buffIcon("B34")+' next to them on their description.<br><br>During the fight, said skill will be showing up with anticipation, as well as a number attached to it. This number determines the amount of turns the enemy must go before the skill is used.<br><br>Be on your guard as such skills are usually critical for the fight and must be taken into consideration.';

gametip.gt16 = {}
gametip.gt16.name = "Combat: Interrupting";
gametip.gt16.description ='Sometimes, enemies will have some of their skills marked with a '+buffIcon("B39")+' next to them on their description.<br><br>During the fight, said skill will be showing up with anticipation, as well as a number attached to it. This number determines the amount of turns the enemy must go before the skill is used.<br><br>However, this attack can be interrupted in the process by any skill that can'+colorTag("Interrupt.", "#BE7150")+'<br><br>Its up to you to chose which attack you want to interrupt.';

gametip.gt8 = {}
gametip.gt8.name = "Turtle Defeat";
gametip.gt8.description = 'If your turtle gets defeated in battle, worry not!<br><br>You can repeatedly click on it to get them back on track.';

gametip.gt4 = {}
gametip.gt4.name = "Weapon Stamping";
gametip.gt4.description = 'Equip a weapon and use a stamp to apply them to it in various levels of effectivity. The current weapon stamps will be replaced and rerolled by new ones.<br><br>Some stamp effects might not be available until better stampers get acquired.<br><br>'+colorTag("Alignment Force", "#5CAA5D")+' such as Nature Force will increase the damage for that specific alignment.<br><br>'+colorTag("Titanic Grip", "#BE7150")+' will increase your Strength. Strength increases the damage of your auto-attacks.<br><br>'+colorTag("Dynamo", "#B062A1")+' will increase your Attack Speed.<br><br>'+colorTag("Afflictions", "purple")+' will decrease your Alignment resistance.';

gametip.gt3 = {}
gametip.gt3.name = "Mastery and Area Cap";
gametip.gt3.description = 'Mastery is a stat that increases both your defense and offense massively. It is crucial to level up this stat to progress.Increase this stat through various means, such as doing quests, or engaging with the multiple systems of the game.<br><br>Initially, your Mastery is restrained by the area or dungeon you are in, preventing effective Mastery to go over a specific threshold, shown next to the area name.<br><br>Once you defeat the boss of the area, the limit will break, and you will be able to use exceeding mastery in that zone. ';

gametip.gt5 = {}
gametip.gt5.name = "Crafting";
gametip.gt5.description = 'Crafting is a good way to create items that will aid in your adventure, aswell as making profit.<br><br>There is no limit on how many different items you can craft at once. You can queue multiple items by pressing the crafting button again. This can be used to queue multiple large quantities of items at once.<br><br>Greyed out recipes will not yield any profession experience.'+bestiaryTag("Money Making")+'Crafting multiplies the value of spent materials, and its the most reliable way to make Shells. Crafted unique items sell for much more than non-unique ones. If another unique or limited item is crafted while you already have the maximum amount of it, it will sell automatically.';

gametip.gt7 = {}
gametip.gt7.name = "The Armory";
gametip.gt7.description = 'Gear automatically registers in the Armory once acquired. You can upgrade items directly from there.<br><br>Once you reach a level threshold dictated by the series of the item, you will receive'+colorTag("Mastery", "#45a3a2");

gametip.gt12 = {}
gametip.gt12.name = "Dungeons";
gametip.gt12.description = "Dungeons are perilous instances where passive health regeneration and other menus are disabled. Bar the first one, they consist of multiple tough bosses to defeat. You will remain inside the dungeon until its fully completed.<br><br>You can enter dungeons up to three times at a time. Once one entrance is used up, you will need to wait one hour for the entrance to recharge.<br><br>However, if there is no entrance available, the timer will be brought back to 30 minutes maximum.<br><br>Additionally, if there are no entrances left, you can spend a"+colorTag("Dungeon Voucher", "darkorange")+"to enter a Dungeon, ignoring the timer."

gametip.gt10 = {}
gametip.gt10.name = "Penguins Helpers";
gametip.gt10.description ='Penguin Helpers will gather resources for you while you are offline. You can select up to three different materials to farm at the same time, or select multiple of the same. They are eligible for '+colorTag("Offline Multiplier", "#45a3a2")+'bonuses too.<br><br>However, unlike Turtlebot, they wont gather experience, rare items nor be affected by time eggs.';

gametip.gt11 = {}
gametip.gt11.name = "Skills And Stars";
gametip.gt11.description ='Access the'+colorTag("Planetarium", "#4C838B")+'in your Skills tab, right of your Equipment.<br><br>In the Planetarium, you can allocate'+colorTag("Wishes", "#3BA144")+'acquired by leveling up multiple classes.<br><br>All skills can be used by all classes, and there is no limit in how many classes you can get at once, so try to get and level as many as possible to increase your'+colorTag("Wishes.", "#3BA144")+'The level of said class will remain forever.<br><br>You can also switch between learnt classes at any point, so feel free to experiment with different stars.';

gametip.gt13 = {}
gametip.gt13.name = "The Garden";
gametip.gt13.description ='Select a seed on the left and click or drag on an empty plot to plant it. Click on it again to water them. While plants are hydrated, they will grow faster.<br><br>Once the seed achieves maturity, it will activate its bonuses, and slowly decay to death.<br><br>Each time you harvest any mature plant, you will discover said seed, get garden experince (with higher tiered plants giving more experience) and one'+colorTag("Bloom Token,", "#3BA144")+'which you can spend in The Garden shop tab. If the plant dies of old age, you will recieve double the experience and tokens<br><br>'+bestiaryTag("Mutations")+'On rare ocasions while the plant is mature, plants can mutate (🧬). Plants also have an additional chance to mutate if they achieve maturity while watered.<br><br>Harvesting a naturally ocurring mature mutation is the only way to get mutated seeds, except for Star Sprouts and Butterscorch.<br><br>'+bestiaryTag("Crossbreeding")+'If circumstances are right, plants can crossbreed, and you might discover new seeds.<br><br>To crossbreed, plant two mature compatible parents somewhere on the garden and leave a few empty plots for their child to grow. The more parents of a plant and empty plots present, the higher the chances of crossbreeding. The ratio of the parents do not matter.';

gametip.gt18 = {}
gametip.gt18.name = "Fishing";
gametip.gt18.description ='Fishing Power determines both the quality and quantity of your catches. Some more rare items require higher fishing power to be caught at all.';

gametip.gt19 = {}
gametip.gt19.name = "Field Effects";
gametip.gt19.description ='Some areas have unique quirks to them. Field effects will appear on the right of the area name. Hover over them to know more about them';

for (var i in gametip) {
  gametip[i].unlocked = false;
}

gametip.gt0.unlocked = true;
gametip.gt1.unlocked = true;
gametip.gt2.unlocked = true;
gametip.gt3.unlocked = true;
gametip.gt6.unlocked = true;
gametip.gt14.unlocked = true;
gametip.gt17.unlocked = true;
gametip.gt20.unlocked = true;
gametip.gt21.unlocked = true;
gametip.gt22.unlocked = true;