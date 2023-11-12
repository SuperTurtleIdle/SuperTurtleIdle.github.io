//#region Update stats for everything


const rangedIcon = '<img src="img/sys/ranged.png">';
const physIcon = '<img src="img/sys/phys.png">';
const magicIcon = '<img src="img/sys/magic.png">';
const mightIcon = '<img src="img/src/icons/might.png">';
const natureIcon = '<img src="img/src/icons/nature.png">';
const elementalIcon = '<img src="img/src/icons/elemental.png">';
const occultIcon = '<img src="img/src/icons/occult.png">';
const deificIcon = '<img src="img/src/icons/deific.png">';


var stats = {
    timePlayed: 0, startedSince: 0, totalBuildings: 0, totalUpgrades: 0, totalSeconds: 0, clickCount: 0, totalCoins: 0, totalResources: 0, totalSupplies: 0, totalEnergy: 0, turtleName: 'Jeffrey', totalCoinsClick: 0, currentClickCoin: 0, totalLogs: 0, logsGot: 0, timesDied:0, currentCategory: "rpgContainer",
    };

var unlocks ={ 
    penguins:0, journal:false, jobs:false, book2: false,
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
}

//#region variable hell
var tierMaxHp = 0;

var armorMaxHp = 0;
var armorHaste = 0;

var additiveRegen = 0;
var armorRegen = 0;
var playerHpRegen = 0;


var armorAdditiveNatureDamage = 0;

var baseNatureDamage = 0;
var additiveNatureDamage = 0;
var multiplicativeNatureDamage = 1;

var baseMightDamage = 0;
var additiveMightDamage = 0;
var multiplicativeMightDamage = 1;

var baseElementalDamage = 0;
var additiveElementalDamage = 0;
var multiplicativeElementalDamage = 1;

var baseOccultDamage = 0;
var additiveOccultDamage = 0;
var multiplicativeOccultDamage = 1;

var baseDeificDamage = 0;
var additiveDeificDamage = 0;
var multiplicativeDeificDamage = 1;

var baseMiningDamage = 0;
var baseHerbloreDamage = 0;

var playerCoinsPerClick = 0;
var additiveCoinsPerClick = 0;
var multiplicativeCoinsPerClick = 0;

var playerMaxHp = 0;
var playerStrength = 0;

var additiveHaste = 0
var playerHaste = 2000;

var playerMiningDamage = 0;
var additiveMiningDamage= 0;
var playerHerbloreDamage = 0;

var additiveMaxHp = 0

var playerPoison = 0;
var enemyPoison = 0;

var playerMaxStack = 100;
var additiveMaxStack = 0
var multiplicativeMaxStack = 1;

var playerMaxStackResource = 999;

var multiplicativeDropChance = 1;
var multiplicativeEXPGain = 1;
var multiplicativeCoinRewards = 1;

var additivePoisonTimer = 0;
//#endregion

function statsUpdate(){

multiplicativeDropChance = 1 + logs.B1P22.statUp + logs.B1P3.statUp + logs.B1P6.statUp + logs.B2P1.statUp + logs.B2P2.statUp + items.I11.statUp 
multiplicativeEXPGain = 1 + logs.B1P11.statUp + logs.B1P15.statUp + logs.B1P27.statUp + bluemoonExpUp
multiplicativeCoinRewards = 1 + logs.B1P8.statUp

additiveMaxHp = armorMaxHp + tierMaxHp;

additiveNatureDamage = 0 + armorAdditiveNatureDamage + buffs.B4.statUp + buffs.B1D.statUp;
multiplicativeNatureDamage = 1;

additiveMightDamage = 0 + buffs.B1B.statUp + buffs.B5.statUp;
multiplicativeMightDamage = 1;

additiveElementalDamage = 0;
multiplicativeElementalDamage = 1;

additiveOccultDamage = 0;
multiplicativeOccultDamage = 1 + bluemoonDmgUp;

additiveDeificDamage = 0;
multiplicativeDeificDamage = 1;

additiveRegen = armorRegen + buffs.B1.statUp + buffs.B1A.statUp + buffs.B1C.statUp
playerHpRegen = rpgPlayer.baseHpRegen + additiveRegen;

playerMaxHp = rpgPlayer.baseMaxHp + additiveMaxHp;
playerStrength = rpgPlayer.baseStrength;

additiveHaste = buffs.B7.statUp
playerHaste = rpgPlayer.baseHaste - armorHaste - additiveHaste;  

additiveMiningDamage = 0 + items.I117.statUp;
playerMiningDamage = baseMiningDamage + additiveMiningDamage;

playerHerbloreDamage = baseHerbloreDamage;
        
additiveCoinsPerClick = items.I113.statUp + items.I124.statUp;
multiplicativeCoinsPerClick = 1 + logs.B1P9.statUp + logs.B1P10.statUp + logs.B1P21.statUp + logs.B1P28.statUp
playerCoinsPerClick = (10 + additiveCoinsPerClick) * multiplicativeCoinsPerClick;
    
playerPoison = buffs.B3.statUp; 
enemyPoison = buffs.B2.statUp;

multiplicativeMaxStack = 1 + logs.B1P5.statUp + logs.B1P12.statUp + logs.B1P14.statUp + logs.B1P20.statUp + logs.B1P25.statUp + logs.B1P17.statUp + logs.B1P1.statUp + logs.B1P16.statUp
additiveMaxStack = items.I94.statUp + items.I90.statUp;
playerMaxStack = 100 + additiveMaxStack * multiplicativeMaxStack;

additivePoisonTimer = logs.B1P24.statUp
     
}

//----------------------==========================-----------------------
//----------------------==========ENEMIES=========-----------------------
//----------------------==========================-----------------------
//#region Enemies
var enemies = {}

enemies.E1 = {};
enemies.E1.name = 'Softshell Slug';
enemies.E1.level = '[lvl 1]';
enemies.E1.hp = 60;
enemies.E1.description = 'A slippery organism without any combat prowess. Because of such, it is regarded as a symbol of harmony and peace in numerous nations.'
enemies.E1.area = 'A1';
enemies.E1.attack = 23;
enemies.E1.difficulty = 'easy';
enemies.E1.exp = 7;
enemies.E1.drop = "dropItem('I1'); rollTable(area1Common, 1)";
enemies.E1.dropDesc = '<FONT COLOR="white">[Slug Meat]';
enemies.E1.align = 'nature';


enemies.E2 = {}; 
enemies.E2.name = 'Tiny Scorpid';
enemies.E2.level = '[lvl 7]';
enemies.E2.hp = 1100;
enemies.E2.description = 'A small insect commonly spotted nearby forests. Despite the fact that it corresponds to a poisonous species, it doesnt develop venom glands until it becomes an adult.'
enemies.E2.area = 'A1';
enemies.E2.attack = 150; 
enemies.E2.exp = 174;
enemies.E2.difficulty = 'hard';
enemies.E2.drop = "dropItem('I37'); rollTable(area1Common, 1)";
enemies.E2.dropDesc = '<FONT COLOR="white">[White Stinger]'
enemies.E2.align = 'nature';


enemies.E3 = {};
enemies.E3.name = 'Warmlake Frog';
enemies.E3.level = '[lvl 4]';
enemies.E3.hp = 350;
enemies.E3.description = 'Small species of frogs that enjoy to linger in ponds near walkways. Since it is an useless predator, it tends to rely on food that turtles abandon on paths.'
enemies.E3.area = 'A1';
enemies.E3.attack = 80;
enemies.E3.difficulty = 'medium';
enemies.E3.exp = 43;
enemies.E3.drop =  "dropItem('I51'); rollTable(area1Common, 1)";
enemies.E3.dropDesc = '<FONT COLOR="white">[Frog Leg]'
enemies.E3.align = 'nature';


enemies.E4 = {};
enemies.E4.name = 'Great Wolf Spider';
enemies.E4.level = '[lvl 10]';
enemies.E4.hp = 4200;
enemies.E4.description = 'An overgrown arachnid that wouldnt normally be seen beyond the woods. Its attacks can inflict a deadly poison that bypasses armor.<br><br><FONT COLOR="#93b56e">Skills:<br>Fleming Bite: High chance of applying poison on attack.';
enemies.E4.attack = 250;
enemies.E4.exp = 3829;
enemies.E4.commonSkill = 'animImageSplash("bite", "playerPanel", "impact", 0); animParticleBurst(7 , "particlePoison", "playerPanel", 0); buffs.B3.time=3; playerBuffs(); logPrint(`<FONT COLOR="#18ccba"> The enemy does a Fleming Bite!`)';
enemies.E4.drop = "dropItem('I107'); rollTable(area1Common, 1)";
enemies.E4.dropDesc = '<FONT COLOR="#1EFF0C">[Wolf Spider Eggsack]'
enemies.E4.align = 'nature';

enemies.E5 = {};
enemies.E5.name = 'Giant Hare';
enemies.E5.level = '[lvl 11]';
enemies.E5.hp = 1600;
enemies.E5.description = 'A giant breed of hares that can weight up to 50 Kg. Although it lacks poison, its sheer size makes up for it.'
enemies.E5.area = 'A2';
enemies.E5.attack = 200;
enemies.E5.exp = 255;
enemies.E5.difficulty = 'easy';
enemies.E5.drop =  "dropItem('I114'); rollTable(area1Common, 2)";
enemies.E5.dropDesc = '<FONT COLOR="white">[Rabbit Hide]'
enemies.E5.align = 'nature';


enemies.E6 = {};
enemies.E6.name = 'Red Squirrel';
enemies.E6.level = '[lvl 15]';
enemies.E6.hp = 2500;
enemies.E6.description = 'Red squirrels hunt collectively whilst awaiting a chance to jump from the highest branches of the trees. Explorers often experience serious wounds from them.'
enemies.E6.area = 'A2';
enemies.E6.attack = 420;
enemies.E6.exp = 410;
enemies.E6.difficulty = 'medium';
enemies.E6.align = 'nature';
enemies.E6.drop =  "dropItem('I115'); rollTable(area1Common, 2)";
enemies.E6.dropDesc = '<FONT COLOR="white">[Acorn]'


enemies.E7 = {};
enemies.E7.name = 'Mighty Hen';
enemies.E7.level = '[lvl 17]';
enemies.E7.hp = 3000;
enemies.E7.description = 'A common hen variety with increased defiance. Hens typically refrain from attacking unless provoked, but these are especially belligerent.'
enemies.E7.area = 'A2';
enemies.E7.attack = 1100;
enemies.E7.exp = 518;
enemies.E7.difficulty = 'hard';
enemies.E7.align = 'might';
enemies.E7.drop =  "dropItem('I25'); rollTable(area1Common, 2)";
enemies.E7.dropDesc = '<FONT COLOR="white">[Poultry Wing]'


enemies.E8 = {};
enemies.E8.name = 'Basalt Tiger';
enemies.E8.level = '[lvl 21]';
enemies.E8.hp = 29000;
enemies.E8.description = 'A massive beast whose claws are as tough as volcanic rock, which gives it its name. Beware of its outstanding predatory agility.<br><br><FONT COLOR="#93b56e">Skills:<br>Bestial Pounce: When below half health, high chance of dealing high Might Damage and recovering a portion of the damage dealt.'
enemies.E8.attack = 1600;
enemies.E8.exp = 10;
enemies.E8.veryCommonSkill = ' if (currentHP < enemies.E8.hp/2){ let damagedealt=rng(1200,1300); animImageSplash("doubleSlash", "playerPanel", "impact", 0); animParticleBurst(5 , "particleGlow", "playerPanel", 230); animParticleProjectile("", "throw", 15, "particleGlow", 230); setTimeout(() => { animParticleBurst(7 , "particleHealth", "enemyPanel", 0); enemyHealingDamage(damagedealt/2); }, 700); logPrint(`<FONT COLOR="#18ccba"> The enemy does a Bestial Pounce!`) }';
enemies.E8.align = 'might';

enemies.E9 = {};
enemies.E9.name = 'Rhynokerros';
enemies.E9.level = '[lvl 1]';
enemies.E9.hp = 200;
enemies.E9.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E9.area = 'A3';
enemies.E9.attack = 10;
enemies.E9.exp = 10;
enemies.E9.difficulty = 'medium';


enemies.E10 = {};
enemies.E10.name = 'Iron Kuwait';
enemies.E10.level = '[lvl 1]';
enemies.E10.hp = 200;
enemies.E10.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E10.area = 'A3';
enemies.E10.attack = 10;
enemies.E10.exp = 10;
enemies.E10.difficulty = 'easy';


enemies.E11 = {};
enemies.E11.name = 'Great Riftwolf';
enemies.E11.level = '[lvl 1]';
enemies.E11.hp = 200;
enemies.E11.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E11.area = 'A3';
enemies.E11.attack = 10;
enemies.E11.exp = 10;
enemies.E11.difficulty = 'hard';


enemies.E12 = {};
enemies.E12.name = 'Giant Talus';
enemies.E12.level = '[lvl 1]';
enemies.E12.hp = 200;
enemies.E12.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E12.attack = 10;
enemies.E12.exp = 10;

enemies.E13 = {};
enemies.E13.name = 'Copper Vein';
enemies.E13.level = '';
enemies.E13.difficulty = 'ore';
enemies.E13.area = 'A1';
enemies.E13.hp = 100;
enemies.E13.description = 'A rich ore deposit containing soft metals.'
enemies.E13.exp = 60;
enemies.E13.drop = "dropItem('I32'); dropItem('I40'); rollTable(area1Common, 1)";
enemies.E13.dropDesc = '<FONT COLOR="white">[Copper Ore]<br>[Sulfur Ore]'

enemies.E14 = {};
enemies.E14.name = 'Spicethorn Briar';
enemies.E14.level = '';
enemies.E14.difficulty = 'herb';
enemies.E14.area = 'A2';
enemies.E14.hp = 100;
enemies.E14.description = 'A lush and rare herb with many applications.'
enemies.E14.exp = 60;
enemies.E14.drop = "dropItem('I34'); dropItem('I38'); rollTable(area1Common, 2)";
enemies.E14.dropDesc = '<FONT COLOR="white">[Spicethorn]<br>[Dayleaf]'


Object.keys(enemies).forEach(function(key) {
  enemies[key].id = key;
  enemies[key].img = key;
  enemies[key].miniImg = key+'M';
  enemies[key].killCount = 0;  
});
//#endregion
//----------------------==========================-----------------------
//----------------------===========ITEMS==========-----------------------
//----------------------==========================-----------------------
//#region Items
var items = {}

items.I1 = {};
items.I1.name = 'Slug Meat';
items.I1.description = 'Material';
items.I1.flavor = '"Rancid meat gathered from an oversized slug, probably a delicatessen in some parts of France."';
items.I1.quality = 'Common';
items.I1.sell = 70;
items.I1.max = playerMaxStack;

items.I2 = {};
items.I2.name = 'Cloth Slippers';
items.I2.description = 'Equipable - Feet<br><FONT COLOR="#1EFF0C">+56 Max HP<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Bandana<br>❖ Cloth Shirt<br>❖ Cloth Bracelet<br>❖ Cloth Pants<br><FONT COLOR="#1EFF0C">❖ Cloth Slippers<br><FONT COLOR="#b983f7">★ Set bonus [5]: +250 Max Hp';
items.I2.flavor = '"Probably the kind your turtle grandmother would wear."';
items.I2.quality = 'Common';
items.I2.sell = 200;
items.I2.max = 1;
items.I2.use = 'gearSwap(items.I2.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I2.stats = 'armorMaxHp += 56'
items.I2.remove = 'armorMaxHp -=56'

items.I3 = {};
items.I3.name = 'Worn Bandana';
items.I3.description = 'Equipable - Head<br><FONT COLOR="#1EFF0C">+63 Max HP<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray"><FONT COLOR="#1EFF0C">❖ Worn Bandana<br><FONT COLOR="gray">❖ Cloth Shirt<br>❖ Cloth Bracelet<br>❖ Cloth Pants<br>❖ Cloth Slippers<br><FONT COLOR="#b983f7">★ Set bonus [5]: +250 Max Hp';
items.I3.flavor = '"A foul-smelling rag for the forehead. Unfortunately, it goes in the head slot."';
items.I3.quality = 'Common';
items.I3.sell = 200;
items.I3.max = 1; 
items.I3.use = 'gearSwap(items.I3.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I3.stats = 'armorMaxHp += 63'
items.I3.remove = 'armorMaxHp -= 63'

items.I4 = {};
items.I4.name = 'Cloth Bracelet';
items.I4.description = 'Equipable - Hands<br><FONT COLOR="#1EFF0C">+49 Max HP<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Bandana<br>❖ Cloth Shirt<br><FONT COLOR="#1EFF0C">❖ Cloth Bracelet<br><FONT COLOR="gray">❖ Cloth Pants<br>❖ Cloth Slippers<br><FONT COLOR="#b983f7">★ Set bonus [5]: +250 Max Hp';
items.I4.flavor = '"Highly effective against nuns rulers."';
items.I4.quality = 'Common';
items.I4.sell = 200;
items.I4.max = 1;
items.I4.use = 'gearSwap(items.I4.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I4.stats = 'armorMaxHp += 49'
items.I4.remove = 'armorMaxHp -= 49'

items.I5 = {};
items.I5.name = 'Cloth Shirt';
items.I5.description = 'Equipable - Chest<br><FONT COLOR="#1EFF0C">+74 Max HP<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Bandana<br><FONT COLOR="#1EFF0C">❖ Cloth Shirt<br><FONT COLOR="gray">❖ Cloth Bracelet<br>❖ Cloth Pants<br>❖ Cloth Slippers<br><FONT COLOR="#b983f7">★ Set bonus [5]: +250 Max Hp';
items.I5.flavor = '"A garment of attire with the chest completely exposed, more effective than nothing whatsoever. Not much more, though."';
items.I5.quality = 'Common';
items.I5.sell = 200;
items.I5.max = 1;
items.I5.use = 'gearSwap(items.I5.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I5.stats = 'armorMaxHp += 74'
items.I5.remove = 'armorMaxHp -= 74'

items.I6 = {};
items.I6.name = 'Cloth Pants';
items.I6.description = 'Equipable - Legs<br><FONT COLOR="#1EFF0C">+70 Max HP<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Bandana<br>❖ Cloth Shirt<br>❖ Cloth Bracelet<br><FONT COLOR="#1EFF0C">❖ Cloth Pants<br><FONT COLOR="gray">❖ Cloth Slippers<br><FONT COLOR="#b983f7">★ Set bonus [5]: +250 Max Hp';
items.I6.flavor = '"A pair of thinly layered trousers. They must at least be resistant if they were able to survive were they were found."';
items.I6.quality = 'Common';
items.I6.sell = 200;
items.I6.max = 1;
items.I6.use = 'gearSwap(items.I6.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I6.stats = 'armorMaxHp += 70'
items.I6.remove = 'armorMaxHp -= 70'

items.I7 = {};
items.I7.name = 'Silver Ring';
items.I7.description = 'Equipable - Ring<br><FONT COLOR="#1EFF0C">+5 Regeneration';
items.I7.flavor = '"An ordinary jewelry ring. Despite it appearing to be of little worth, you can sense good craftsmanship."';
items.I7.quality = 'Uncommon';
items.I7.sell = 1000;
items.I7.max = 1; 
items.I7.use = 'gearSwap(items.I7.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I7.stats = 'armorRegen += 5'
items.I7.remove = 'armorRegen -= 5'

items.I8 = {};
items.I8.name = 'Wooden Sword';
items.I8.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+25 Nature Damage';
items.I8.flavor = '"A wooden stick shaped like a sword, retaining all the properties of a wooden stick and none of a sword."';
items.I8.quality = 'Common';
items.I8.sell = 100;
items.I8.max = 1;
items.I8.use = 'gearSwap(items.I8.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I8.stats = 'baseNatureDamage = 25; weaponSwap("W1")'
items.I8.remove = 'baseNatureDamage = 0; weaponSwap("W0")'
items.I8.align = 'nature';

items.I9 = {};
items.I9.name = 'Wooden Bow';
items.I9.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+41 Nature Damage<br>On Attack: Low chance to fire a wooden arrow dealing 100-200 Nature damage.';
items.I9.flavor = '"A crooked, splinter-filled bow. It should hold together for a few shots before falling apart entirely."';
items.I9.quality = 'Common';
items.I9.sell = 200;
items.I9.max = 1;
items.I9.use = 'gearSwap(items.I9.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I9.stats = 'baseNatureDamage = 41; weaponSwap("W2")'
items.I9.remove = 'baseNatureDamage = 0; weaponSwap("W0")'
items.I9.align = 'nature';
items.I9.commonSkill = 'animParticleProjectile("arrow", "throwArrow", 0, "particleSmoke", 0); let damageDealt = rng(100,200); setTimeout(() => { enemyNatureDamage(damageDealt); playSound("audio/button4.mp3")}, 600);' 

items.I10 = {};
items.I10.name = 'Small Wooden Lockbox';
items.I10.description = 'Container<br><FONT COLOR="#1EFF0C">Use: Unlock with a Novice-Lock key to open.<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="#0070dd">❖ Sacrificial Dagger<br><FONT COLOR="#1eff00">❖ Recipe: Nephrite-Embedded Ring<br>❖ Recipe: Net-o-Launcher 3000<br>❖ Malachite<br>❖ Travelers Purse<br><FONT COLOR="white">❖ Skewed Lizard<br>❖ Nephrite'
items.I10.flavor = '"Life is like a Small Wooden Lockbox."';
items.I10.quality = 'Uncommon';
items.I10.sell = 5000;
items.I10.max = playerMaxStack; 
items.I10.use = 'if (items.I41.count>0){ items.I41.count--; rollTable(smallCache, 1); if(quests.A2Q7.state === "pending"){ if(rng(1,6)===1) items.I123.count++ }; items.I10.count--;  addItem() }';
    
items.I11 = {};
items.I11.name = 'Runic Die';
items.I11.description = 'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: +20% Item Drop Chance';
items.I11.flavor = '"Truth is... the game was rigged from the start."';
items.I11.quality = 'Uncommon';
items.I11.sell = 200;
items.I11.max = 1;
items.I11.use = 'gearSwap(items.I11.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I11.stats = 'items.I11.statUp = 0.2;'
items.I11.remove = 'items.I11.statUp = 0;'
items.I11.statUp = 0;

items.I12 = {};
items.I12.name = 'Skewed Lizard';
items.I12.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Grants +3 Regeneration for 30 minutes.<br><FONT COLOR="gray">(Only one food buff can be active at a time)'
items.I12.flavor = '"Dont complain, it tastes like chicken."';
items.I12.quality = 'Common';
items.I12.sell = 200;
items.I12.max = playerMaxStack;
items.I12.use = 'removeBuffs("food"); buffs.B1.time=1800; playerBuffs(); playSound("audio/potion.mp3"); animState("rpgPlayerImg", "flash 0.5s 1"); animParticleBurst(10 , "particleHealth", "playerPanel", 0);  items.I12.count--; addItem()';
/*
items.I13 = {};
items.I13.name = 'Pirate Sabatoons';
items.I13.description = 'Equipable - Feet<br><FONT COLOR="#1EFF0C">+10 Physical Defense<br><FONT COLOR="#b983f7">Sea Monkey Set:<br><FONT COLOR="gray">❖ Pirate Hat<br>❖ Pirate Dress<br>❖ Pirate Gloves<br>❖ Pirate Buckle<br><FONT COLOR="#1EFF0C">❖ Pirate Sabatoons<br><FONT COLOR="#b983f7">★ Set bonus [5]: Your attacks have a chance to trigger Sea Chanty, increasing Ranged Damage by 400 for 5 seconds.';
items.I13.flavor = '"Footwear worn by seafarers, although a great deal of them favor to wear a mallet of lumber on their shins"';
items.I13.quality = 'Rare';
items.I13.sell = 10;
items.I13.max = 1;
items.I13.use = 'gearSwap(items.I13.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I13.stats = 'armorMaxHp += 20'
items.I13.remove = 'armorMaxHp -= 20'

items.I14 = {};
items.I14.name = 'Pirate Hat';
items.I14.description = 'Equipable - Feet Slot<br><FONT COLOR="#1EFF0C">+10 Physical Resistance<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="#1EFF0C">❖ Worn Scarf<FONT COLOR="gray"><br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br>❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +10 Physical Resistance';
items.I14.flavor = '"A stylish and lavish pirate hat adorned with red feathers. It includes an eyepatch that ensures a trendy lazy eye."';
items.I14.quality = 'Rare';
items.I14.use = 'gearSwap(items.I14.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I14.sell = 10;
items.I14.max = 1;
items.I14.stats = 'armorMaxHp += 25'
items.I14.remove = 'armorMaxHp -= 25'

items.I15 = {};
items.I15.name = 'Butchers Knife';
items.I15.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+15 Physical Damage';
items.I15.flavor = '"A practice sword typically used for friendly competition and sparring. Created specifically to be as harmless as conceivable."';
items.I15.quality = 'Common';
items.I15.sell = 10;
items.I15.max = 1;
items.I15.use = 'gearSwap(items.I15.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I15.stats = 'armorPhysAttack += 25; weaponSwap("W9")'
items.I15.remove = 'armorPhysAttack -= 25; weaponSwap("W0")'

items.I16 = {};
items.I16.name = 'Pirate Gloves';
items.I16.description = 'Equipable - Feet Slot<br><FONT COLOR="#1EFF0C">+10 Physical Resistance<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br><FONT COLOR="#1EFF0C">❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +10 Physical Resistance';
items.I16.flavor = '"Deliberately torn apart in order to provide them greater freedom when lifting up heavy objects such as chests of riches."';
items.I16.quality = 'Rare';
items.I16.sell = 10;
items.I16.max = 1;
items.I16.use = 'gearSwap(items.I16.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")';
items.I16.stats = 'armorMaxHp += 25';
items.I16.remove = 'armorMaxHp -= 25';

items.I17 = {};
items.I17.name = 'Pirate Dress';
items.I17.description = 'Equipable - Feet Slot<br><FONT COLOR="#1EFF0C">+10 Physical Resistance<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br><FONT COLOR="#1EFF0C">❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +10 Physical Resistance';
items.I17.flavor = '"Also sometimes called poet shirt, youd might assume that men who routinely risk their lives in contend would require greater defense than some frills of fabric on their chest."';
items.I17.quality = 'Rare';
items.I17.sell = 10;
items.I17.max = 1;
items.I17.use = 'gearSwap(items.I17.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")';
items.I17.stats = 'armorMaxHp += 25'
items.I17.remove = 'armorMaxHp -= 25'

items.I18 = {};
items.I18.name = 'Pirate Buckle';
items.I18.description = 'Equipable - Feet Slot<br><FONT COLOR="#1EFF0C">+10 Physical Resistance<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br><FONT COLOR="#1EFF0C">❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +10 Physical Resistance';
items.I18.flavor = '"A saggy belt to keep the sagging garments that make up pirates everyday attire; it is known that the greater number of belts a pirate carries, the more formidable they are."';
items.I18.quality = 'Rare';
items.I18.sell = 10;
items.I18.max = 1;
items.I18.stats = 'armorMaxHp += 25';
items.I18.remove = 'armorMaxHp -= 25';
items.I18.use = 'gearSwap(items.I18.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")';
*/
items.I19 = {};
items.I19.name = 'Lesser Healing Flask';
items.I19.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Restores 900-1200 Health.<FONT COLOR="gray"> (30 second Cooldown)';
items.I19.flavor = '"This potion operates by abruptly shattering your entire internal structure, causing your body to make an immediate effort to rebuild them in order to avert a sudden death. It also has a mild strawberry flavor."';
items.I19.quality = 'Common';
items.I19.sell = 7100;
items.I19.max = 5;
items.I19.cd = 0;
items.I19.use = ' playSound("audio/potion.mp3"); let recovered = rng(900,1200); items.I19.cd=30; playerHealingDamage(recovered); animState("rpgPlayerImg", "flash 0.5s 1"); playerUpdate(); animParticleBurst(10 , "particleGlow", "playerPanel", 230);  items.I19.count--; addItem()';
/*
items.I20 = {};
items.I20.name = 'Skull Caverns Key';
items.I20.description = 'Key Item<br><FONT COLOR="#1EFF0C">Use: Grants access to the Skull Caverns dungeon.';
items.I20.flavor = '"In contrast to Its key, you have a feeling sensation that the insides are not going to be as usual."';
items.I20.quality = 'Uncommon';
items.I20.sell = 10;
items.I20.max = 1;
*/
items.I21 = {};
items.I21.name = 'Lesser Poison Flask';
items.I21.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Applies a weak poison that deals 7900 damage over 20 seconds.<FONT COLOR="gray"> (2 minute Cooldown)';
items.I21.flavor = '"In the midst of chaos, there is also opportunity."';
items.I21.quality = 'Common';
items.I21.sell = 19000;
items.I21.max = 5;
items.I21.use = 'playSound("audio/throw.mp3"); animParticleProjectile("poison", "throw", 15, "particlePoison", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); setTimeout(() => {animParticleBurst(7 , "particlePoison", "enemyPanel", 0); playSound("audio/gas.mp3"); }, 700); buffs.B2.time=20+additivePoisonTimer; playerBuffs(); items.I21.cd = 120; items.I21.count--; addItem();'
items.I21.cd = 0;

items.I22 = {};
items.I22.name = 'Nephrite';
items.I22.description = 'Material';
items.I22.flavor = '"One variety of jade much more rare and impure than Its sibling. Despite that, It still can fetch a good price."';
items.I22.quality = 'Common';
items.I22.sell = 1500;
items.I22.max = playerMaxStack;
/*
items.I23 = {};
items.I23.name = 'Oran Berry';
items.I23.description = 'Equipable - Trinket<br>Restores <FONT COLOR="#1EFF0C">100 health<FONT COLOR="white"> when It falls below 50%. <br><FONT COLOR="gray">[1 minute cooldown]';
items.I23.flavor = '"A plump and round berry fruit characterised by their blue color. It can save you in a pinch."';
items.I23.quality = 'Uncommon';
items.I23.sell = 10;
items.I23.max = 1; 
*/
items.I25 = {};
items.I25.name = 'Poultry Wing';
items.I25.description = 'Material';
items.I25.flavor = '"The only politics thats being brought up on my table."';
items.I25.quality = 'Common';
items.I25.sell = 1150;
items.I25.max = playerMaxStack;

items.I26 = {};
items.I26.name = 'Chicken Yakitori';
items.I26.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Grants +30 Regeneration for 30 minutes.<br><FONT COLOR="gray">(Only one food buff can be active at a time)'
items.I26.flavor = '"Bite-sized pieces of chicken skewered and grilled to perfection. Seasoned with a savory sauce made from soy sauce, mirin, and sugar, even though the recipe had none of those on it. But thats the magic of Yakitori."';
items.I26.quality = 'Uncommon';
items.I26.sell = 10;
items.I26.max = playerMaxStack;
items.I26.use = 'removeBuffs("food"); buffs.B1C.time=1800; playerBuffs(); playSound("audio/potion.mp3"); animState("rpgPlayerImg", "flash 0.5s 1"); animParticleBurst(10 , "particleHealth", "playerPanel", 0);  items.I26.count--; addItem()';

items.I29 = {};
items.I29.name = 'Gunpowder Dust';
items.I29.description = 'Material';
items.I29.flavor = '"A highly explosive dust primarily used for explosives or to flavor up drinks if youre not a fan of living long."';
items.I29.quality = 'Common';
items.I29.sell = 10;
items.I29.max = playerMaxStack; 

items.I30 = {};
items.I30.name = 'Light Dynamite';
items.I30.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Throws an explosive that deals 1200-2400 damage to an enemy.<FONT COLOR="gray"> (1 minute Cooldown)';
items.I30.flavor = '"A medium-range explosive that is simple to toss. The enemy here appears to be always at the same distance, though."';
items.I30.quality = 'Common';
items.I30.use = 'playSound("audio/throw.mp3"); animParticleProjectile("bomb", "throw", 15, "particleSmoke", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I30.cd = 60; let damageDealt = rng(1200,2000); setTimeout(() => { enemyElementalDamage(damageDealt); animParticleBurst(10 , "particleSmoke", "enemyPanel", 0); animState(stats.currentEnemy+"enemy", "shake 0.4s 1");  playSound("audio/explosion.mp3")}, 700); items.I30.count --; addItem();'
items.I30.sell = 1000;
items.I30.cd = 0;
items.I30.max = playerMaxStack;

items.I31 = {};
items.I31.name = 'Copper Bar';
items.I31.description = 'Material';
items.I31.flavor = '"A metal whose structure is ductile, malleable, and possesses high thermal conductivity. Despite being very versatile, it makes for inadequate weaponry."';
items.I31.quality = 'Common';
items.I31.sell = 950;
items.I31.max = playerMaxStack; 

items.I32 = {};
items.I32.name = 'Copper Ore';
items.I32.description = "Resource";
items.I32.flavor = '"A clump of impure copper ore. For such crude ore to be helpful, it must undergo extensive refinement."';
items.I32.quality = 'Common';
items.I32.sell = 150;
items.I32.max = playerMaxStackResource; 
items.I32.tag = "resource";

items.I34 = {};
items.I34.name = 'Spicethorn';
items.I34.description = "Resource";
items.I34.flavor = '"A thorny herb which is employed for cookery. It can be broken into ready-to-use powder with just the strength of the palms alone."';
items.I34.quality = 'Common';
items.I34.sell = 150;
items.I34.max = playerMaxStackResource; 
items.I34.tag = "resource";
/*
items.I35 = {};
items.I35.name = 'Iron Bar';
items.I35.description = 'Material';
items.I35.flavor = '"Durable and resilient, iron is a crucial component of every nations armament and lentils."';
items.I35.quality = 'Common';
items.I35.sell = 10;
items.I35.max = playerMaxStack; 

items.I36 = {};
items.I36.name = 'Iron Ore';
items.I36.description = 'Material';
items.I36.flavor = '"A clump of irony ore. It possesses both the traits of iron and ore. The iron that this ore holds is quite the metal."';
items.I36.quality = 'Common';
items.I36.sell = 10;
items.I36.max = playerMaxStack; 
*/
items.I37 = {};
items.I37.name = 'White Stinger';
items.I37.description = 'Material';
items.I37.flavor = '"The stinger of a scorpid. Small traces of poison can still be found on the inside glands, although not ready yet to be deployed."';
items.I37.quality = 'Common';
items.I37.sell = 580;
items.I37.max = playerMaxStack; 

items.I38 = {};
items.I38.name = 'Dayleaf';
items.I38.description = "Resource";
items.I38.flavor = '"A leaf which shines as dazzling as sunlight. It holds nutrients similarly emanated by the star."';
items.I38.quality = 'Common';
items.I38.sell = 150;
items.I38.max = playerMaxStackResource; 
items.I38.tag = "resource";

items.I39 = {};
items.I39.name = 'Sulfur Dust';
items.I39.description = 'Material';
items.I39.flavor = '"Dusted sulfur, also referred to as brimstone, serves as a highly volatile reagent with powerful alchemical properties."';
items.I39.quality = 'Common';
items.I39.sell = 900;
items.I39.max = playerMaxStack; 

items.I40 = {};
items.I40.name = 'Sulfur Ore';
items.I40.description = "Resource";
items.I40.flavor = '"An essential element for all life, sulfur ore can be found near hot springs and volcanic regions in many parts of the world."';
items.I40.quality = 'Common';
items.I40.sell = 150;
items.I40.max = playerMaxStackResource; 
items.I40.tag = "resource";

items.I41 = {};
items.I41.name = 'Copper Key';
items.I41.description = 'Key<br><FONT COLOR="#1EFF0C">Can open Novice-Lock containers.';
items.I41.flavor = '"For the easily-influenced locks."';
items.I41.quality = 'Common';
items.I41.sell = 3500;
items.I41.max = playerMaxStack;

items.I42 = {};
items.I42.name = 'Malachite';
items.I42.description = 'Material';
items.I42.flavor = '"A striking green mineral, prized for its vivid color and used in jewelry and decorative art for centuries."';
items.I42.quality = 'Uncommon';
items.I42.sell = 10000;
items.I42.max = playerMaxStack;
/*
items.I43 = {};
items.I43.name = 'Aquamarine';
items.I43.description = 'Material';
items.I43.flavor = '"A serene blue-green gemstone renowned for its clarity and association with the calming properties of the sea."';
items.I43.quality = 'Uncommon';
items.I43.sell = 10;
items.I43.max = playerMaxStack;
*/
items.I44 = {};
items.I44.name = 'Nephrite-Embedded Ring';
items.I44.description = 'Equipable - Ring<br><FONT COLOR="#1EFF0C">+50 Nature Damage';
items.I44.flavor = '"A captivating jewelry piece with a nephrite gemstone intricately set within the ring. The lush gemstone represents nature itself."';
items.I44.quality = 'Uncommon';
items.I44.sell = 68000;
items.I44.max = 1;
items.I44.use = 'gearSwap(items.I44.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I44.stats = 'armorAdditiveNatureDamage += 50'
items.I44.remove = 'armorAdditiveNatureDamage -= 50'
/*
items.I45 = {};
items.I45.name = 'Aquamarine-Embedded Ring';
items.I45.description = 'Material';
items.I45.flavor = '"A captivating jewelry piece with an aquamarine gemstone intricately set within the ring. The lush gemstone provides physical resistance."';
items.I45.quality = 'Uncommon';
items.I45.sell = 10;
items.I45.max = 1;

items.I46 = {};
items.I46.name = 'Malachite-Embedded Ring';
items.I46.description = 'Material';
items.I46.flavor = '"A captivating jewelry piece with a malachite gemstone intricately set within the ring. The lush gemstone provides physical resistance."';
items.I46.quality = 'Uncommon';
items.I46.sell = 10;
items.I46.max = 1;

items.I47 = {};
items.I47.name = 'Rough Weightstone';
items.I47.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Increases the physical damage of your weapons by 10 for 5 minutes. (15 minute Cooldown)';
items.I47.flavor = '"An enhancive accessory for weapons, designed to increase their damage potential by adding extra weight, empowering your strikes with greater force."';
items.I47.quality = 'Common';
items.I47.sell = 10;
items.I47.max = playerMaxStack;
*/
items.I48 = {};
items.I48.name = 'Actinic Flask';
items.I48.description = 'Material';
items.I48.flavor = '"A specialized flask crafted from materials designed to interact with alchemical substances, ideal for storing volatile elixirs."';
items.I48.quality = 'Common';
items.I48.sell = 3100;
items.I48.max = playerMaxStack;

items.I49 = {};
items.I49.name = 'Lesser Nature Flask';
items.I49.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Grants +100 Nature Damage for 12 seconds.<FONT COLOR="gray"> (3 minute Cooldown)<br>(Only one potion buff can be active at a time.)'
items.I49.flavor = '"Beware of hallucinations of colorful round forest people."';
items.I49.quality = 'Uncommon';
items.I49.sell = 24000;
items.I49.use = 'removeBuffs("potion"); items.I49.cd = 180; playSound("audio/potion.mp3"); buffs.B4.time=12; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 0); animState("rpgPlayerImg", "flash 0.5s 1"); items.I49.count--; addItem()';
items.I49.max = playerMaxStack;
items.I49.cd = 0;

items.I50 = {};
items.I50.name = 'Lesser Might Flask';
items.I50.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Grants +100 Might Damage for 12 seconds.<FONT COLOR="gray"> (3 minute Cooldown)<br>(Only one potion buff can be active at a time.)'
items.I50.flavor = '"Makes you feel like a true gaulish warrior."';
items.I50.quality = 'Uncommon';
items.I50.sell = 24000;
items.I50.max = playerMaxStack;
items.I50.use = 'removeBuffs("potion"); items.I50.cd = 180; playSound("audio/potion.mp3"); buffs.B5.time=12; playerBuffs(); animParticleBurst(10 , "particleGlow", "playerPanel", 0); animState("rpgPlayerImg", "flash 0.5s 1"); items.I50.count--; addItem()';
items.I50.cd = 0;

items.I51 = {};
items.I51.name = 'Frog Leg';
items.I51.description = 'Material';
items.I51.flavor = '"A vital reagent in alchemy and the cauldrons of every self-respecting witch."';
items.I51.quality = 'Common';
items.I51.sell = 210;
items.I51.max = playerMaxStack;

items.I52 = {};
items.I52.name = 'Frog Pho';
items.I52.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Grants +78 Might Damage for 30 minutes.<br><FONT COLOR="gray">(Only one food buff can be active at a time)'
items.I52.flavor = '"A dish known for its flavorful broth, typically made with beef or chicken, rice noodles, and aromatic herbs. And now frog."';
items.I52.quality = 'Uncommon';
items.I52.sell = 21000;
items.I52.max = playerMaxStack;
items.I52.use = 'removeBuffs("food"); buffs.B1B.time=1800; playerBuffs(); playSound("audio/potion.mp3"); animState("rpgPlayerImg", "flash 0.5s 1"); animParticleBurst(10 , "particleHealth", "playerPanel", 0);  items.I52.count--; addItem()';
/*
items.I53 = {};
items.I53.name = 'Hainanese Chicken';
items.I53.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Consume the dish to grant +10 physical resistance for 30 minutes';
items.I53.flavor = '"A dish featuring tender chicken pieces slow-cooked in a flavorful broth, often with ginger, garlic, and aromatic spices, resulting in a comforting and aromatic stew."';
items.I53.quality = 'Common';
items.I53.sell = 10;
items.I53.max = playerMaxStack;
*/
items.I54 = {};
items.I54.name = 'Monster Sausage';
items.I54.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Grants +30 Regeneration for for 30 minutes.<br><FONT COLOR="gray">(Only one food buff can be active at a time)';
items.I54.flavor = '"The meat grinder does not discriminate, and neither should you."';
items.I54.quality = 'Common';
items.I54.sell = 6500;
items.I54.use = 'removeBuffs("food"); buffs.B1A.time=3600; playerBuffs(); playSound("audio/potion.mp3"); animState("rpgPlayerImg", "flash 0.5s 1"); animParticleBurst(10 , "particleHealth", "playerPanel", 0);  items.I54.count--; addItem()';
items.I54.max = playerMaxStack;
/*
items.I55 = {};
items.I55.name = 'Reactive Flask';
items.I55.description = 'Material';
items.I55.flavor = '"An even more sophisticated potion container, constructed from more robust components for brews of greater purity."';
items.I55.quality = 'Common';
items.I55.sell = 10;
items.I55.max = playerMaxStack;

items.I56 = {};
items.I56.name = 'Alchemical Dust';
items.I56.description = 'Material';
items.I56.flavor = '"A substance created primarily to lend elixirs and remedies greater reactivity."';
items.I56.quality = 'Common';
items.I56.sell = 10;
items.I56.max = playerMaxStack;
*/
items.I57 = {};
items.I57.name = 'Creeping Wolf Web';
items.I57.description = 'Material';
items.I57.flavor = '"A sprawling cobweb, intricately woven by an enormous forest-dwelling spider, serving as both a work of art and a trap for unsuspecting prey."';
items.I57.quality = 'Uncommon';
items.I57.sell = 370;
items.I57.max = playerMaxStack;
/*
items.I58 = {};
items.I58.name = 'Dwimling Life Essence';
items.I58.description = 'Material';
items.I58.flavor = '"An ethereal substance found within strong-willed foes."';
items.I58.quality = 'Uncommon';
items.I58.sell = 10;
items.I58.max = playerMaxStack;

items.I59 = {};
items.I59.name = 'Dinousaur Rib';
items.I59.description = 'Material';
items.I59.flavor = '"A gargantuan-sized meat piece with not-so-extinct flavor."';
items.I59.quality = 'Common';
items.I59.sell = 10;
items.I59.max = playerMaxStack;

items.I60 = {};
items.I60.name = 'Prehistoric Galbi';
items.I60.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Consume the dish to grant +10 physical resistance for 30 minutes';
items.I60.flavor = '"Dinousaur ribs marinated in a mouthwatering blend of soy sauce, sugar, garlic, and other seasonings."';
items.I60.quality = 'Uncommon';
items.I60.sell = 10;
items.I60.max = playerMaxStack;

items.I61 = {};
items.I61.name = 'Dinosaur A La Riojana';
items.I61.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Consume the dish to grant +10 physical resistance for 30 minutes';
items.I61.flavor = '"A hearty dino stew simmered in a rich tomato-based broth with vegetables and spices. Includes chorizo sausage for added flavor."';
items.I61.quality = 'Uncommon';
items.I61.sell = 10;
items.I61.max = playerMaxStack;

items.I62 = {};
items.I62.name = 'Saffronmist';
items.I62.description = 'Material';
items.I62.flavor = '"A prized herb known for its vibrant flavor and subtle aromatics elevating dishes with its unique essence."';
items.I62.quality = 'Common';
items.I62.sell = 10;
items.I62.max = playerMaxStack;

items.I63 = {};
items.I63.name = 'Wispwillow';
items.I63.description = 'Material';
items.I63.flavor = '"An elusive herb possessing a pale, luminescent glow. Its ethereal properties lends otherworldly capabilities to elixirs and potions."';
items.I63.quality = 'Uncommon';
items.I63.sell = 10;
items.I63.max = playerMaxStack;

items.I64 = {};
items.I64.name = 'Livingbrass Grail';
items.I64.description = 'Equipable - Trinket<br>Restores <FONT COLOR="#1EFF0C">100 health<FONT COLOR="white"> when It falls below 50%. <br><FONT COLOR="gray">[1 minute cooldown]';
items.I64.flavor = '"Also known as the Not-Quite-So-Holy-as-the-Holy-Grail."';
items.I64.quality = 'Uncommon';
items.I64.sell = 10;
items.I64.max = 1;

items.I65 = {};
items.I65.name = 'Fragile Alchemical Stone';
items.I65.description = 'Equipable - Trinket<br>Restores <FONT COLOR="#1EFF0C">100 health<FONT COLOR="white"> when It falls below 50%. <br><FONT COLOR="gray">[1 minute cooldown]';
items.I65.flavor = '"A powerful transmutation amplifier. Due to the absolute law of alchemy being equivalent exchange, the stone gives the illusion that someone is able to override that law. But for how long I wonder?"';
items.I65.quality = 'Uncommon';
items.I65.sell = 10;
items.I65.max = 1;
*/
items.I66 = {};
items.I66.name = 'Copper Plate';
items.I66.description = 'Material';
items.I66.flavor = '"Versatile material used in various crafting and construction projects, valued for its strength and adaptability."';
items.I66.quality = 'Common';
items.I66.sell = 2150;
items.I66.max = playerMaxStack;

items.I67 = {};
items.I67.name = 'Net-O-Launcher 3000';
items.I67.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Launches a net that immobilises the enemy for 10 seconds.<FONT COLOR="gray"> (2 minute Cooldown)<br>(Doesnt work on targets higher level than 40)';
items.I67.flavor = '"We dont talk about the other 2999."';
items.I67.quality = 'Uncommon';
items.I67.sell = 12500;
items.I67.max = playerMaxStack;
items.I67.use = 'playSound("audio/throw.mp3"); clearInterval(enemyAttackInterval); setTimeout(() => {  enemyAttackInterval = setInterval(enemyAttack, enemyAttackMS); }, 8000); items.I67.cd = 120; items.I67.count --; animImageSplash("net", "enemyPanel", "downwards", 0); buffs.B6.time=10; playerBuffs(); addItem();'
items.I67.cd = 0;
/*
items.I68 = {};
items.I68.name = 'Clockwork Hen';
items.I68.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Deploy a Clockwork Hen in battle, aiding you in battle for 1 minute. (5 minute Cooldown)';
items.I68.flavor = '"Very few people are conscious that the original goal of engineering as a whole was to attempt to control and mimic the destructive abilities of the hen for use in warfare."';
items.I68.quality = 'Rare';
items.I68.sell = 10;
items.I68.max = playerMaxStack;

items.I69 = {}; //nice
items.I69.name = 'Ironwork Bomb';
items.I69.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Throws an explosive that deals 1200-2400 damage to an enemy. (1 minute Cooldown)';
items.I69.flavor = '"As round and heavy as it is deadly, you could throw them to the enemy as it is and it would be very much deadly."';
items.I69.quality = 'Uncommon';
items.I69.sell = 10;
items.I69.max = playerMaxStack;

items.I70 = {}; 
items.I70.name = 'Iron Chain';
items.I70.description = 'Material';
items.I70.flavor = '"A sturdy and unyielding link of interlocking iron segments, serves as a versatile material in all kinds of engineering crafts."';
items.I70.quality = 'Common';
items.I70.sell = 10;
items.I70.max = playerMaxStack;

items.I71 = {}; 
items.I71.name = 'Primitive Gunpowder';
items.I71.description = 'Material';
items.I71.flavor = '"An ancient and raw form of explosive powder, this untamed concoction harnesses the very essence of explosive force."';
items.I71.quality = 'Common';
items.I71.sell = 10;
items.I71.max = playerMaxStack;

items.I72 = {}; 
items.I72.name = 'Iron Blasting Charge';
items.I72.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Opens a lock.';
items.I72.flavor = '"For the unruly locks that need a lesson to be taught."';
items.I72.quality = 'Uncommon';
items.I72.sell = 10;
items.I72.max = playerMaxStack;
*/
items.I73 = {};
items.I73.name = 'Plated Explorer Boots';
items.I73.description = 'Equipable - Feet<br><FONT COLOR="#D83063">Requires Level 10<br><FONT COLOR="#1EFF0C">+187 Max HP<br>+16 Regeneration<br><FONT COLOR="#b983f7">Intrepid Voyager Set:<br><FONT COLOR="gray">❖ Plated Explorer Boonie<br>❖ Plated Explorer Cuirass<br>❖ Plated Explorer Gloves<br>❖ Plated Explorer Pants<br><FONT COLOR="#1EFF0C">❖ Plated Explorer Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: '+natureIcon+' Nature Align';
items.I73.levelRequirement = 10;
items.I73.flavor = '"These are some big boy footwear for big adventures; Im uncertain if your little feet can fit them."';
items.I73.quality = 'Uncommon';
items.I73.sell = 63000;
items.I73.max = 1;
items.I73.use = 'gearSwap(items.I73.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I73.stats = 'armorMaxHp += 187; armorRegen +=16'
items.I73.remove = 'armorMaxHp -= 187; armorRegen -=16';

items.I74 = {};
items.I74.name = 'Plated Explorer Boonie';
items.I74.description = 'Equipable - Head<br><FONT COLOR="#D83063">Requires Level 10<br><FONT COLOR="#1EFF0C">+195 Max HP<br>+17 Regeneration<br><FONT COLOR="#b983f7">Intrepid Voyager Set:<br><FONT COLOR="gray"><FONT COLOR="#1EFF0C">❖ Plated Explorer Boonie<br><FONT COLOR="gray">❖ Plated Explorer Cuirass<br>❖ Plated Explorer Gloves<br>❖ Plated Explorer Pants<br>❖ Plated Explorer Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: '+natureIcon+' Nature Align';
items.I74.levelRequirement = 10;
items.I74.flavor = '"This fashionable attire facilitates society to decide who is willing to venture into the uncharted wilderness and who is overly reliant on directions."';
items.I74.quality = 'Uncommon';
items.I74.sell = 63000;
items.I74.max = 1; 
items.I74.use = 'gearSwap(items.I74.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I74.stats = 'armorMaxHp += 195; armorRegen +=17'
items.I74.remove = 'armorMaxHp -= 195; armorRegen -=17';

items.I75 = {};
items.I75.name = 'Plated Explorer Gloves';
items.I75.description = 'Equipable - Hands<br><FONT COLOR="#D83063">Requires Level 10<br><FONT COLOR="#1EFF0C">+163 Max HP<br>+15 Regeneration<br><FONT COLOR="#b983f7">Intrepid Voyager Set:<br><FONT COLOR="gray">❖ Plated Explorer Boonie<br>❖ Plated Explorer Cuirass<br><FONT COLOR="#1EFF0C">❖ Plated Explorer Gloves<br><FONT COLOR="gray">❖ Plated Explorer Pants<br>❖ Plated Explorer Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: '+natureIcon+' Nature Align';
items.I75.levelRequirement = 10;
items.I75.flavor = '"The added protection lets you to flail around while hollering whilst safely grasping a hanging vine."';
items.I75.quality = 'Uncommon';
items.I75.sell = 63000;
items.I75.max = 1;
items.I75.use = 'gearSwap(items.I75.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I75.stats = 'armorMaxHp +=163; armorRegen +=15'
items.I75.remove = 'armorMaxHp -=163; armorRegen -=15';

items.I76 = {};
items.I76.name = 'Plated Explorer Cuirass';
items.I76.description = 'Equipable - Chest<br><FONT COLOR="#D83063">Requires Level 10<br><FONT COLOR="#1EFF0C">+225 Max HP<br>+21 Regeneration<br><FONT COLOR="#b983f7">Intrepid Voyager Set:<br><FONT COLOR="gray">❖ Plated Explorer Boonie<br><FONT COLOR="#1EFF0C">❖ Plated Explorer Cuirass<br><FONT COLOR="gray">❖ Plated Explorer Gloves<br>❖ Plated Explorer Pants<br>❖ Plated Explorer Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: '+natureIcon+' Nature Align';
items.I76.levelRequirement = 10;
items.I76.flavor = '"Boasts a little leaf that assists in blending seamlessly within the natural setting."';
items.I76.quality = 'Uncommon';
items.I76.sell = 63000;
items.I76.max = 1;
items.I76.use = 'gearSwap(items.I76.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I76.stats = 'armorMaxHp += 225; armorRegen +=21'
items.I76.remove = 'armorMaxHp -225; armorRegen -=21'

items.I77 = {};
items.I77.name = 'Plated Explorer Pants';
items.I77.description = 'Equipable - Legs<br><FONT COLOR="#D83063">Requires Level 10<br><FONT COLOR="#1EFF0C">+218 Max HP<br>+19 Regeneration<br><FONT COLOR="#b983f7">Intrepid Voyager Set:<br><FONT COLOR="gray">❖ Plated Explorer Boonie<br>❖ Plated Explorer Cuirass<br>❖ Plated Explorer Gloves<br><FONT COLOR="#1EFF0C">❖ Plated Explorer Pants<br><FONT COLOR="gray">❖ Plated Explorer Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: '+natureIcon+' Nature Align';
items.I77.levelRequirement = 10;
items.I77.flavor = '"The copper bolts that are aimed at the knees emphasize the importance of doing your best to avoid falling."';
items.I77.quality = 'Uncommon';
items.I77.sell = 63000;
items.I77.max = 1;
items.I77.use = 'gearSwap(items.I77.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I77.stats = 'armorMaxHp += 218; armorRegen +=19'
items.I77.remove = 'armorMaxHp -= 218; armorRegen -=19'

items.I78 = {};
items.I78.name = 'Zweihander';
items.I78.description = 'Equipable - Weapon<br><FONT COLOR="#D83063">Requires Level 6<br><FONT COLOR="#1EFF0C">+135 Might Damage<br>On Attack: Low chance to inflict a heavy slash dealing 500-650 Might damage.<br><FONT COLOR="#b983f7">Huge Parent Set:<br><FONT COLOR="#1EFF0C">❖ Zweihander<br><FONT COLOR="gray">❖ Mask of the Parent<br>❖ Ring of Faith and Pledging<br><FONT COLOR="#b983f7">★ Set bonus [3]: <br>+44500 Max Health<br>+4450 Regeneration<br>+44500 Might Damage';
items.I78.levelRequirement = 6;
items.I78.flavor = '"BECOME UNSTOPPABLE."';
items.I78.quality = 'Uncommon';
items.I78.sell = 1000;
items.I78.max = 1;
items.I78.use = 'gearSwap(items.I78.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I78.stats = 'baseMightDamage = 135; weaponSwap("W10")'
items.I78.remove = 'baseMightDamage = 0; weaponSwap("W0")'
items.I78.align = 'might';
items.I78.commonSkill = 'animImageSplash("slash", "enemyPanel", "impact", 0); animState(stats.currentEnemy+"enemy", "shake 0.4s 1"); let damageDealt = rng(500,650); enemyMightDamage(damageDealt);'
/*
items.I79 = {};
items.I79.name = 'Cutlass';
items.I79.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+15 Physical Damage';
items.I79.flavor = '"Swift, nimble, and flexible, this blade was made specifically to cut a lass."';
items.I79.quality = 'Uncommon';
items.I79.sell = 10;
items.I79.max = 1;
items.I79.use = 'gearSwap(items.I79.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I79.stats = 'armorPhysAttack += 25; weaponSwap("W3")'
items.I79.remove = 'armorPhysAttack -= 25; weaponSwap("W0")'
*/
items.I80 = {};
items.I80.name = 'Copperwork Pipe';
items.I80.description = 'Equipable - Weapon<br><FONT COLOR="#D83063">Requires Level 10<br><FONT COLOR="#1EFF0C">+220 Might Damage<br>On Attack: Low chance to launch a stream of hot steam dealing 400-550 Elemental Damage.';
items.I80.levelRequirement = 10;
items.I80.flavor = '"This must be the sort of weapon that people had been using before the iron age, which began approximately 1200 BC. Probably."';
items.I80.quality = 'Uncommon';
items.I80.sell = 1000;
items.I80.max = 1;
items.I80.use = 'gearSwap(items.I80.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I80.stats = 'baseMightDamage = 220; weaponSwap("W8")';
items.I80.remove = 'baseMightDamage = 0; weaponSwap("W0")';
items.I80.commonSkill = ' let damageDealt=rng(400,550); animParticleProjectile("", "throw", 15, "particleSmoke", 0); setTimeout(() => {animParticleBurst(7 , "particleSmoke", "enemyPanel", 0); playSound("audio/gas.mp3"); enemyElementalDamage(damageDealt); }, 700);'
items.I80.align = 'might';

items.I81 = {};
items.I81.name = 'Sacrificial Dagger';
items.I81.description = 'Equipable - Weapon<br><FONT COLOR="#D83063">Requires Level 11<br><FONT COLOR="#1EFF0C">+55 Occult Damage<br>+300 Haste<br>On Attack: Low chance to inflict a cursed rend, dealing 200-290 Occult damage and stealing a part of the damage dealt as HP.';
items.I81.levelRequirement = 11;
items.I81.flavor = '"A dagger used in rituals of darkness. The dagger itself has nothing sinister going on, it just simply had the misfortune of taking part in them."';
items.I81.quality = 'Rare';
items.I81.sell = 15000;
items.I81.max = 1;
items.I81.use = 'gearSwap(items.I81.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I81.stats = 'baseOccultDamage = 55; armorHaste += 300; weaponSwap("W4")';
items.I81.remove = 'baseOccultDamage = 0; armorHaste -= 300; weaponSwap("W0")';
items.I81.commonSkill = 'let damageDealt=rng(400,590); animImageSplash("holySlash", "enemyPanel", "impact", 0); animState(stats.currentEnemy+"enemy", "shake 0.4s 1"); animParticleProjectile("", "reverseThrow", 15, "particleGlow", 130); enemyOccultDamage(damageDealt); setTimeout(() => { playerHealingDamage(damageDealt/3);  animParticleBurst(7 , "particleHealth", "playerPanel", 0);  }, 700);'
items.I81.align = "occult"
/*
items.I82 = {};
items.I82.name = 'Dragonfell Greatsword';
items.I82.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+15 Physical Damage';
items.I82.flavor = '"To call it a sword would be an insult given its size. It resembles more of a large piece of iron..."';
items.I82.quality = 'Rare';
items.I82.sell = 10;
items.I82.max = 1;
items.I82.use = 'gearSwap(items.I82.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I82.stats = 'armorPhysAttack += 25; weaponSwap("W7")'
items.I82.remove = 'armorPhysAttack -= 25; weaponSwap("W0")'
*/
items.I83 = {};
items.I83.name = 'Feathered Greatbow';
items.I83.description = 'Equipable - Weapon<br><FONT COLOR="#D83063">Requires Level 16<br><FONT COLOR="#1EFF0C">+200 Nature Damage<br>On Attack: Low chance to fire a feathered great arrow, dealing 1000-1400 Nature Damage.';
items.I83.levelRequirement = 16;
items.I83.flavor = '"A tribal bow adorned with pink feathers of unknown origin. Despite what you might believe, there are a surprising number of birds with pink feathers."';
items.I83.quality = 'Rare';
items.I83.sell = 5500;
items.I83.max = 1;
items.I83.use = 'gearSwap(items.I83.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")';
items.I83.stats = 'baseNatureDamage = 200; weaponSwap("W5")';
items.I83.remove = 'baseNatureDamage = 0; weaponSwap("W0")';
items.I83.commonSkill = 'animParticleProjectile("arrow", "throwArrow", 10, "particleFeather", 0); let damageDealt = rng(1000,1400); setTimeout(() => { enemyNatureDamage(damageDealt); playSound("audio/throw.mp3")}, 600); '
items.I83.align ="nature"

items.I84 = {};
items.I84.name = 'Stone Pickaxe';
items.I84.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+15 Mining Power';
items.I84.flavor = '"Three thousand years ago, this baby would be considered top-notch engineering, but right now its better than punching rocks."';
items.I84.quality = 'Common';
items.I84.sell = 1000;
items.I84.max = 1;
items.I84.use = 'gearSwap(items.I84.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I84.stats = 'baseMiningDamage += 25; weaponSwap("W11")'
items.I84.remove = 'baseMiningDamage -= 25; weaponSwap("W0")'
/*
items.I85 = {};
items.I85.name = 'Iron Pickaxe';
items.I85.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+15 Physical Damage';
items.I85.flavor = '"A standard-grade pickaxe constructed from sturdier materials. Nothing funny to say about it."';
items.I85.quality = 'Uncommon';
items.I85.sell = 10;
items.I85.max = 1;
items.I85.use = 'gearSwap(items.I85.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I85.stats = 'armorPhysAttack += 25; weaponSwap("W12")'
items.I85.remove = 'armorPhysAttack -= 25; weaponSwap("W0")'
*/
items.I86 = {}; 
items.I86.name = 'High-Grade Anvil';
items.I86.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently reduces the crafting time of all recipes by 5 seconds.';
items.I86.flavor = '"Hit Hard! Hit Fast! Hit Often!"';
items.I86.quality = 'Rare';
items.I86.sell = 10;
items.I86.max = 1;
items.I86.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); reduceRecipeTime(5); unlocks.anvil1 = true; items.I86.count--; addItem()';
items.I86.statUp = 0;
items.I86.unique = true;
/*
items.I87 = {}; 
items.I87.name = 'Blast-Proof Anvil';
items.I87.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases the amount of crafts at the same time by +1.';
items.I87.flavor = '"I can assure you that some science is taking place here that allows this to work."';
items.I87.quality = 'Epic';
items.I87.sell = 10;
items.I87.max = playerMaxStack;
*/
items.I88 = {};
items.I88.name = 'Stone Mattock';
items.I88.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+15 Herblore Power';
items.I88.flavor = '"For when you had enough with your hoe."';
items.I88.quality = 'Common';
items.I88.sell = 1000;
items.I88.max = 1;
items.I88.use = 'gearSwap(items.I88.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I88.stats = 'baseHerbloreDamage += 25; weaponSwap("W13")'
items.I88.remove = 'baseHerbloreDamage -= 25; weaponSwap("W0")'
/*
items.I89 = {};
items.I89.name = 'Iron Mattock';
items.I89.description = 'Equipable - Weapon<br><FONT COLOR="#1EFF0C">+15 Physical Damage';
items.I89.flavor = '"You start to feel aware that you would not typically use these to gather herbs, but you decide to let it slip for now."';
items.I89.quality = 'Uncommon';
items.I89.sell = 10;
items.I89.max = 1;
items.I89.use = 'gearSwap(items.I85.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I89.stats = 'armorPhysAttack += 25; weaponSwap("W12")'
items.I89.remove = 'armorPhysAttack -= 25; weaponSwap("W0")'
*/
items.I90 = {}; 
items.I90.name = 'Worn Leather Pouch';
items.I90.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases stack capacity of items by +50.';
items.I90.flavor = '"A tiny pouch with a tiny compartment for tiny items."';
items.I90.quality = 'Uncommon';
items.I90.sell = 0;
items.I90.statUp = 0;
items.I90.use = 'items.I90.statUp=50; updateMaxStack(); items.I90.count--; addItem()';
items.I90.max = 1;
items.I90.unique = true;
/*
items.I91 = {}; 
items.I91.name = 'Alchemist Satchel';
items.I91.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases healing potion capacity by +5.';
items.I91.flavor = '"This satchel has the exact shape of five healing potions. It would be completely insane to think about fitting anything else into this bag since it is precisely the shape of five healing potions. Dont even attempt it."';
items.I91.quality = 'Epic';
items.I91.sell = 0;
items.I91.max = 1;

items.I92 = {}; 
items.I92.name = 'Adventurers Bag';
items.I92.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases stack capacity of items by +50';
items.I92.flavor = '"A gift from someone less fortunate than you."';
items.I92.quality = 'Rare';
items.I92.sell = 0;
items.I92.statUp = 0;
items.I92.use = 'items.I92.statUp=50; updateMaxStack(); items.I92.count--; addItem()';
items.I92.max = 1;

items.I93 = {}; 
items.I93.name = 'Apothecary Holdster';
items.I93.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases healing potion capacity by +5.';
items.I93.flavor = '"For the unruly locks that need a lesson to be taught."';
items.I93.quality = 'Rare';
items.I93.sell = 0;
items.I93.max = 1;
*/
items.I94 = {}; 
items.I94.name = 'Travelers Purse';
items.I94.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases stack capacity of items by +100';
items.I94.flavor = '"A gift from someone less fortunate than you."';
items.I94.quality = 'Uncommon';
items.I94.sell = 0;
items.I94.statUp = 0;
items.I94.use = 'items.I94.statUp=100; updateMaxStack(); items.I94.count--; addItem()';
items.I94.max = 1;
items.I94.unique = true;
/*
items.I95 = {}; 
items.I95.name = 'Tigerhide Giant Bag';
items.I95.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Increases stack capacity of items by +100.';
items.I95.flavor = '"For the unruly locks that need a lesson to be taught."';
items.I95.quality = 'Epic';
items.I95.sell = 0;
items.I95.statUp = 0;
items.I95.use = 'items.I95.statUp=100; updateMaxStack(); items.I95.count--; addItem()';
items.I95.max = 1;
items.I95.unique = true;

items.I96 = {};
items.I96.name = 'Minor Healing Flask';
items.I96.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Consume the dish to grant +10 physical resistance for 30 minutes';
items.I96.flavor = '"A dish known for its flavorful broth, typically made with beef or chicken, rice noodles, and aromatic herbs. And now frog."';
items.I96.quality = 'Uncommon';
items.I96.sell = 10;
items.I96.max = playerMaxStack;
*/
items.I97 = {};
items.I97.name = 'Diminute Experience Candy';
items.I97.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Grants a diminute amount of experience.';
items.I97.flavor = '"Tastes like a good piece of advice."';
items.I97.quality = 'Uncommon';
items.I97.sell = 300;
items.I97.max = playerMaxStack; 
items.I97.use = 'questReward(0,800);  animState("rpgPlayerImg", "gelatine 0.3s 1");animParticleBurst(4 , "particleExp", "playerPanel", 0); items.I97.count--; addItem()';
/*
items.I98 = {};
items.I98.name = 'Tiny Experience Candy';
items.I98.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Consume the dish to grant +10 physical resistance for 30 minutes';
items.I98.flavor = '"A dish known for its flavorful broth, typically made with beef or chicken, rice noodles, and aromatic herbs. And now frog."';
items.I98.quality = 'Rare';
items.I98.sell = 10;
items.I98.max = playerMaxStack;

items.I99 = {};
items.I99.name = 'Small Experience Candy';
items.I99.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Consume the dish to grant +10 physical resistance for 30 minutes';
items.I99.flavor = '"Tastes like a thousand wars."';
items.I99.quality = 'Epic';
items.I99.sell = 10;
items.I99.max = playerMaxStack;

items.I100 = {};
items.I100.name = 'Minor Might? Flask';
items.I100.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Consume the dish to grant +10 physical resistance for 30 minutes';
items.I100.flavor = '"A dish known for its flavorful broth, typically made with beef or chicken, rice noodles, and aromatic herbs. And now frog."';
items.I100.quality = 'Rare';
items.I100.sell = 10;
items.I100.max = playerMaxStack;

items.I101 = {};
items.I101.name = 'Minor Sight? Flask';
items.I101.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Consume the dish to grant +10 physical resistance for 30 minutes';
items.I101.flavor = '"A dish known for its flavorful broth, typically made with beef or chicken, rice noodles, and aromatic herbs. And now frog."';
items.I101.quality = 'Rare';
items.I101.sell = 10;
items.I101.max = playerMaxStack;
*/
items.I102 = {};
items.I102.name = 'Golden Clover';
items.I102.description = 'Miscellaneous';
items.I102.flavor = '"Today seems like a good day to go buy a lottery ticket."';
items.I102.quality = 'Epic';
items.I102.sell = 7777;
items.I102.max = playerMaxStack;

items.I103A = {};
items.I103A.name = 'Recipe: Nephrite-Embedded Ring';
items.I103A.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create a Nephrite-Embedded Ring.';
items.I103A.flavor = '"The true method of knowledge is experiment."';
items.I103A.quality = 'Uncommon';
items.I103A.sell = 0;
items.I103A.max = 1;
items.I103A.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); recipes.SN4.unlocked = true; items.I103A.count--; addItem()';
items.I103A.recipe = true;
items.I103A.unique = true;

items.I103B = {};
items.I103B.name = 'Recipe: Net-O-Launcher 3000';
items.I103B.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create the Net-o-Launcher 3000.';
items.I103B.flavor = '"The true method of knowledge is experiment."';
items.I103B.quality = 'Uncommon';
items.I103B.sell = 0;
items.I103B.max = 1;
items.I103B.recipe = true;
items.I103B.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); recipes.EN4.unlocked = true; items.I103B.count--; addItem()';
items.I103B.unique = true;

items.I103C = {};
items.I103C.name = 'Recipe: Clockwork Hen';
items.I103C.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to create the Clockwork Hen. This is a very cool item that does something cool, but on this version, it does nothing. Huh? Dissapointed? Do you even know how much time takes already making hundreds of items? Are you seriously going to cry because a single one is not functional this version? Surely you are not going to be an ungrateful little rascal and thought himself that 4 thousand and counting lines of code are not enough. Surely you jest. You better. But yeah this recipe requires items from the next areas, its cool if you have it though, ill make it do something the next version, i promise. But for now, it takes a permanent spot in your inventory.';
items.I103C.flavor = '"The true method of knowledge is experiment."';
items.I103C.quality = 'Rare';
items.I103C.sell = 0;
items.I103C.max = 1;
items.I103C.recipe = true;
items.I103C.unique = true;

items.I103D = {};
items.I103D.name = 'Recipe: Masala Chai';
items.I103D.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to brew Masala Chai.';
items.I103D.flavor = '"The true method of knowledge is experiment."';
items.I103D.quality = 'Rare';
items.I103D.sell = 0;
items.I103D.max = 1;
items.I103D.recipe = true;
items.I103D.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); recipes.CN8.unlocked = true; items.I103D.count--; addItem()';
items.I103D.unique = true;

items.I103E = {};
items.I103E.name = 'Recipe: Copperwork Pipe';
items.I103E.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to craft a Copperwork Pipe.';
items.I103E.flavor = '"The true method of knowledge is experiment."';
items.I103E.quality = 'Uncommon';
items.I103E.sell = 0;
items.I103E.max = 1;
items.I103E.recipe = true;
items.I103E.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); recipes.EN5.unlocked = true; items.I103E.count--; addItem()';
items.I103E.unique = true;

items.I103F = {};
items.I103F.name = 'Recipe: Frog Pho';
items.I103F.description = 'Consumable - Recipe<br><FONT COLOR="#1EFF0C">Use: Learns how to cook Frog Pho.';
items.I103F.flavor = '"The true method of knowledge is experiment."';
items.I103F.quality = 'Uncommon';
items.I103F.sell = 0;
items.I103F.max = 1;
items.I103F.recipe = true;
items.I103F.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); recipes.CN4.unlocked = true; items.I103F.count--; addItem()';
items.I103F.unique = true;

items.I104 = {};
items.I104.name = 'Grand Journal';
items.I104.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently unlocks the Grand Archives, gaining boons as you record entires on it.';
items.I104.flavor = '"A massive journal that records specifics regarding the past, present, and future."';
items.I104.quality = 'Epic';
items.I104.sell = 0;
items.I104.max = 1;
items.I104.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); unlocks.journal=true; unlocksReveal(); items.I104.count--; addItem()';
items.I104.unique = true;

items.I105 = {};
items.I105.name = 'Trap Cage';
items.I105.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Combine with 100 Slug Meat to prepare a Trapped Cage.';
items.I105.flavor = '"You have a bad feeling about this."';
items.I105.quality = 'Uncommon';
items.I105.sell = 3000;
items.I105.max = playerMaxStack;
items.I105.use = 'if (items.I1.count>99){items.I1.count-=100; items.I105.count--; items.I106.count++; addItem(); unlocks.boss1found = true;}';

items.I106 = {};
items.I106.name = 'Trapped Cage';
items.I106.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to summon the Great Wolf Spider.'
items.I106.flavor = '"This is going to be a terrible night..."';
items.I106.quality = 'Uncommon';
items.I106.sell = 3000;
items.I106.max = playerMaxStack;

items.I107 = {};
items.I107.name = 'Wolf Spider Eggsack';
items.I107.description = 'Container<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="#a335ee">❖ Big Book of Big Damage<br><FONT COLOR="#0070dd">❖ Feathered Greatbow<br><FONT COLOR="#1eff00">❖ Creeping Wolf Web<br>❖ Diminute Experience Candy';
items.I107.flavor = '"Strangely, spiders are the only thing not found in here, and its for the best."';
items.I107.quality = 'Uncommon';
items.I107.sell = 15500;
items.I107.max = playerMaxStack; 
items.I107.use = 'rollTable(spiderEggsack, 1); items.I107.count--; addItem()';

items.I108 = {}; 
items.I108.name = 'Thorny Anise';
items.I108.description = 'Material';
items.I108.flavor = '"A spice known for its sweet licorice-like flavor."';
items.I108.quality = 'Common';
items.I108.sell = 1100;
items.I108.max = playerMaxStack;

items.I109 = {};
items.I109.name = 'Big Book of Big Damage';
items.I109.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently add this book to the Grand Archives.';
items.I109.flavor = '"DO judge a book for its cover, this one is very offensive."';
items.I109.quality = 'Epic';
items.I109.sell = 0;
items.I109.max = 1;
items.I109.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); unlocks.book2=true; unlocksReveal(); items.I109.count--; addItem()';
items.I109.unique = true;

items.I110 = {}; 
items.I110.name = 'Masala Chai';
items.I110.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Grants +50 Nature Damage for 30 minutes.<br><FONT COLOR="gray">(Only one food buff can be active at a time)';
items.I110.flavor = '"A spiced black tea full of warm spices that is sure to recomfort the heart."';
items.I110.quality = 'Uncommon';
items.I110.sell = 4000;
items.I110.max = playerMaxStack;
items.I110.use = 'removeBuffs("food"); buffs.B1D.time=1800; playerBuffs(); playSound("audio/potion.mp3"); animState("rpgPlayerImg", "flash 0.5s 1"); animParticleBurst(10 , "particleHealth", "playerPanel", 0);  items.I110.count--; addItem()';

items.I111 = {}; 
items.I111.name = 'Special Chai Blend';
items.I111.description = 'Material';
items.I111.flavor = '"The raw power of a hundreds of herbs, compressed and atomized into fragrant dust. If you look closely, light is slightly bending arround the spices."';
items.I111.quality = 'Quest';
items.I111.sell = 0;
items.I111.max = 1;
items.I111.align = "occult";
items.I111.unique = true;

items.I112 = {};
items.I112.name = 'Pine Boomerang';
items.I112.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">Use: Throws a wooden boomerang that deals 100-150 nature damage to an enemy.';
items.I112.flavor = '"An elvish weapon used by the forest dwelling race known as the Australians."';
items.I112.quality = 'Common';
items.I112.use = 'animParticleProjectile("boomerang", "throw", 0, "particleSmoke", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); let damageDealt = rng(100,150); setTimeout(() => { enemyNatureDamage(damageDealt); animState(stats.currentEnemy+"enemy", "gelatine 0.4s 1"); playSound("audio/throw.mp3")}, 700); items.I112.count --; addItem();'
items.I112.sell = 100;
items.I112.max = 10;
items.I112.align = 'nature'

items.I113 = {}; 
items.I113.name = 'Soft Leather Gloves';
items.I113.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Turtle Coin gains from clicking the turtle by +40.';
items.I113.flavor = '"Warm and fuzzy pats are guaranteed by the soft fur of the gloves"';
items.I113.quality = 'Uncommon';
items.I113.sell = 0;
items.I113.max = 1;
items.I113.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I113.statUp = 40; statsUpdate(); items.I113.count--; addItem()';
items.I113.statUp = 0;
items.I113.unique = true;

items.I114 = {}; 
items.I114.name = 'Rabbit Hide';
items.I114.description = 'Material';
items.I114.flavor = '"A supple and furry hide harvested from rabbits. Regretting now is useless, the deed has been done."';
items.I114.quality = 'Common';
items.I114.sell = 750;
items.I114.max = playerMaxStack;

items.I115 = {}; 
items.I115.name = 'Acorn';
items.I115.description = 'Material';
items.I115.flavor = '"A small, nut-like seed oak trees. Additionally, on the Squirrel Kingdom, its a standard form of currency."';
items.I115.quality = 'Common';
items.I115.sell = 890;
items.I115.max = playerMaxStack;

items.I116 = {}; 
items.I116.name = 'Broccoli';
items.I116.description = 'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: Heals 600-670 HP if your health goes below 50%.<FONT COLOR="gray"> (1 minute Cooldown)';
items.I116.flavor = '"Full of nutrients and good stuff for your body, unfortunately."';
items.I116.quality = 'Uncommon';
items.I116.sell = 10000;
items.I116.max = 1;
items.I116.use = 'gearSwap(items.I116.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")';
items.I116.trinketCD = 0;
items.I116.trinketHPEffect = ' if (rpgPlayer.hp<playerMaxHp/2) {playSound("audio/potion.mp3"); let recovered = rng(600,670); items.I116.trinketCD=60; playerHealingDamage(recovered); animState("rpgPlayerImg", "flash 0.5s 1"); playerUpdate(); animParticleBurst(10 , "particleGlow", "playerPanel", 230); logPrint(`<FONT COLOR="#18ccba"> You eat the Broccoli. It wasnt very tasty...`)}';

items.I117 = {}; 
items.I117.name = 'Fossilised Fish';
items.I117.description = 'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: +25 Mining Power';
items.I117.flavor = '"Whiskers favorite."';
items.I117.quality = 'Rare';
items.I117.sell = 10;
items.I117.max = 1;
items.I117.use = 'gearSwap(items.I117.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I117.stats = 'items.I117.statUp = 25;'
items.I117.remove = 'items.I117.statUp = 0;'
items.I117.statUp = 0;

items.I118 = {}; 
items.I118.name = 'Gamba';
items.I118.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Feed it to the turtle.';
items.I118.flavor = '"Beware of the strange sounds at night."';
items.I118.quality = 'Uncommon';
items.I118.sell = 1;
items.I118.max = 1;
items.I118.use = 'animParticleBurst(7 , "particleHeart", "playerPanel", 0); playSound("audio/lily.mp3"); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I118.count--; addItem()';

items.I119 = {}; 
items.I119.name = 'Carefully Wrapped Present';
items.I119.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Open it!<FONT COLOR="#edd585"><br><br>[Possible Contents]<br><FONT COLOR="white">?????';
items.I119.flavor = '"Para mi?"';
items.I119.quality = 'Uncommon';
items.I119.sell = 1;
items.I119.max = playerMaxStack;
items.I119.use = 'rollTable(whiskersPresent, 1); items.I119.count--; addItem()';

items.I120 = {}; 
items.I120.name = 'Whiskers Gratitude';
items.I120.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently, once a day, gives the chance to obtain a present from clicking the turtle.';
items.I120.flavor = '"meow meow meow to you too, little fella."';
items.I120.quality = 'Epic';
items.I120.sell = 0;
items.I120.max = 1;
items.I120.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); unlocks.present = true; items.I120.count--; addItem()';
items.I120.unique = true;

items.I121 = {}; 
items.I121.name = 'Chicken Cage';
items.I121.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Cage a chicken. <FONT COLOR="gray"> (15 minute Cooldown)';
items.I121.flavor = '"A standard crate with a standard chicken-shaped hole inside."';
items.I121.quality = 'Quest';
items.I121.sell = 0;
items.I121.max = 10;
items.I121.use = 'if (stats.currentEnemy === "E7") {playSound("audio/throw.mp3"); items.I121.cd=120; items.I121.count--; items.I122.count++; animImageSplash("net", "enemyPanel", "downwards", 0); addItem(); deleteEnemy()};'
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
items.I123.unique = true;

items.I124 = {}; 
items.I124.name = 'Ironwork Gloves';
items.I124.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Turtle Coin gains from clicking the turtle by +150.';
items.I124.flavor = '"Maybe it doesnt give the warmest pats, but it gives the most secure and firm ones."';
items.I124.quality = 'Uncommon';
items.I124.sell = 0;
items.I124.max = 1;
items.I124.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I124.statUp = 150; statsUpdate(); items.I124.count--; addItem()';
items.I124.statUp = 0;
items.I124.unique = true;

let logTrackLostPage = false;

items.I125 = {};
items.I125.name = 'Lost Page';
items.I125.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Adds this page to a book.';
items.I125.flavor = '"Lost for not much longer."';
items.I125.quality = 'Epic';
items.I125.sell = 0;
items.I125.max = 1;
items.I125.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); logTrackLostPage=true; items.I125.count--; addItem()';
items.I125.unique = true;

items.I126 = {}; 
items.I126.name = 'Broken Animal Tooth';
items.I126.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Combine 10 to create a Wild Necklace Offering';
items.I126.flavor = '"They make rattling noises inside your pocket."';
items.I126.quality = 'Uncommon';
items.I126.sell = 100;
items.I126.max = 10;
items.I126.use = 'if (items.I126.count>9){items.I1.count-=100; items.I126.count-=10; items.I127.count++; addItem();}';

items.I127 = {}; 
items.I127.name = 'Wild Necklace Offering';
items.I127.description = 'Miscellaneous<br><FONT COLOR="#1EFF0C">Can be used to summon the Basalt Tiger.'
items.I127.flavor = '"Not the best craftmanship, but intention is what counts."';
items.I127.quality = 'Uncommon';
items.I127.sell = 1000;
items.I127.max = playerMaxStack;
/*
items.I128 = {}; 
items.I128.name = 'Midas Embrace';
items.I128.description = 'Consumable - Miscellaneous<br><FONT COLOR="#1EFF0C">Use: Permanently increases Turtle Coin gains from clicking the turtle by +30.';
items.I128.flavor = '"The love they provide is way more valuable than gold can ever hope to be."';
items.I128.quality = 'Uncommon';
items.I128.sell = 0;
items.I128.max = 1;
items.I128.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I128.statUp = 30; statsUpdate(); items.I124.count--; addItem()';
items.I128.statUp = 0;
*/
items.I129 = {};
items.I129.name = 'Lost and Found Chest';
items.I129.description = 'Consumable - Miscellaneous<br><FONT COLOR="#D83063">Requires Level 10<br><FONT COLOR="#1EFF0C">Use: Contains a full Cloth Set.';
items.I129.levelRequirement = 10;
items.I129.flavor = '"If only I wasnt so unlucky..."';
items.I129.quality = 'Uncommon';
items.I129.sell = 0;
items.I129.max = 1;
items.I129.use = 'animParticleBurst(7 , "particleLight", "playerPanel", 0); animState("rpgPlayerImg", "gelatineHigh 0.3s 1"); items.I2.count++;items.I3.count++;items.I4.count++;items.I5.count++;items.I6.count++; items.I129.count--; addItem()';

items.I130 = {};
items.I130.name = 'Lesser Haste Flask';
items.I130.description = 'Consumable - Potion<br><FONT COLOR="#1EFF0C">Use: Grants +800 Haste for 12 seconds. <FONT COLOR="gray"> (3 minute Cooldown)<br>(Only one potion buff can be active at a time.)'
items.I130.flavor = '"Dont choke drinking it too fast."';
items.I130.quality = 'Uncommon';
items.I130.sell = 24000;
items.I130.max = playerMaxStack;
items.I130.use = 'removeBuffs("potion"); items.I130.cd = 180; playSound("audio/potion.mp3"); buffs.B7.time=12; playerBuffs(); clearInterval(playerAttackInterval); playerAttackInterval = setInterval(playerAttack, playerHaste); animParticleBurst(10 , "particleGlow", "playerPanel", 0); animState("rpgPlayerImg", "flash 0.5s 1"); items.I130.count--; addItem()';
items.I130.cd = 0;

items.I131 = {};
items.I131.name = 'Thorn Binding';
items.I131.description = 'Equipable - Ring<br><FONT COLOR="#1EFF0C">Equip: Reflects part of the damage recieved back to the enemy as nature damage up to a maximum of 200 damage.';
items.I131.flavor = '"A fierce ring made out of thorns and blossoms. To inflict pain one must be ready to recieve pain."';
items.I131.quality = 'Uncommon';
items.I131.sell = 4500;
items.I131.max = 1; 
items.I131.use = 'gearSwap(items.I131.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'

Object.keys(items).forEach(function(key) {
  items[key].id = key;
  items[key].count = 0;
  if (items[key].recipe) {items[key].img = 'I103';} //all items with the tag recipe will have this IMG
  else items[key].img = key;
  items[key].gotOnce = false;
  if (!("levelRequirement" in items[key])) items[key].levelRequirement = 0; //if the level requirement hasnt been defined, set it to 0
});



//#endregion
//----------------------==========================-----------------------
//----------------------============BUFFS=========-----------------------
//----------------------==========================-----------------------
//#region Buffs
var buffs = {}

buffs.B1 = {};
buffs.B1.name = 'Skewed Lizard';
buffs.B1.description = 'It really tasted like chicken.<br><FONT COLOR="#8fbaff">+3 Regeneration';
buffs.B1.effect = 'buffEffect(3, "B1")';
buffs.B1.player = true;
buffs.B1.buff = true;
buffs.B1.food = true;
buffs.B1.statUp = 0;

buffs.B1A = {};
buffs.B1A.name = 'Monster Sausage';
buffs.B1A.description = '<FONT COLOR="#8fbaff">+30 Regeneration';
buffs.B1A.effect = 'buffEffect(30, "B1A")';
buffs.B1A.player = true;
buffs.B1A.buff = true;
buffs.B1A.food = true;
buffs.B1A.statUp = 0;

buffs.B1B = {};
buffs.B1B.name = 'Frog Pho';
buffs.B1B.description = '<FONT COLOR="#8fbaff">+78 Might Damage';
buffs.B1B.effect = 'buffEffect(78, "B1B")';
buffs.B1B.player = true;
buffs.B1B.buff = true;
buffs.B1B.food = true;
buffs.B1B.statUp = 0;

buffs.B1C = {};
buffs.B1C.name = 'Chicken Yakitori';
buffs.B1C.description = '<FONT COLOR="#8fbaff">+30 Regeneration';
buffs.B1C.effect = 'buffEffect(30, "B1C")';
buffs.B1C.player = true;
buffs.B1C.buff = true;
buffs.B1C.food = true;
buffs.B1C.statUp = 0;

buffs.B1D = {};
buffs.B1D.name = 'Masala Chai';
buffs.B1D.description = '<FONT COLOR="#8fbaff">+50 Nature Damage';
buffs.B1D.effect = 'buffEffect(50, "B1D")';
buffs.B1D.player = true;
buffs.B1D.buff = true;
buffs.B1D.food = true;
buffs.B1D.statUp = 0;

buffs.B2 = {};
buffs.B2.name = 'Weak Poison';
buffs.B2.description = 'Slowly Losing Life';
buffs.B2.effect = 'buffEffect(395, "B2")';
buffs.B2.statUp = 0;

buffs.B3 = {};
buffs.B3.name = 'Fleming Bite';
buffs.B3.description = 'Slowly Losing Life';
buffs.B3.player = true;
buffs.B3.effect = 'buffEffect(20, "B3")';
buffs.B3.statUp = 0;

buffs.B4 = {};
buffs.B4.name = 'Lesser Nature Flask';
buffs.B4.description = '<FONT COLOR="#8fbaff">+100 Nature Damage';
buffs.B4.player = true;
buffs.B4.effect = 'buffEffect(100, "B4")';
buffs.B4.buff = true;
buffs.B4.statUp = 0;
buffs.B4.potion = true;

buffs.B5 = {};
buffs.B5.name = 'Lesser Might Flask';
buffs.B5.description = '<FONT COLOR="#8fbaff">+100 Might Damage';
buffs.B5.player = true;
buffs.B5.effect = 'buffEffect(100, "B5")';
buffs.B5.buff = true;
buffs.B5.statUp = 0;
buffs.B5.potion = true;

buffs.B6 = {};
buffs.B6.name = 'Caught in a Net';
buffs.B6.description = 'Unable to move';
buffs.B6.effect = '';
buffs.B6.statUp = 0;

buffs.B7 = {};
buffs.B7.name = 'Lesser Haste Flask';
buffs.B7.description = '<FONT COLOR="#8fbaff">+800 Haste';
buffs.B7.player = true;
buffs.B7.effect = 'buffEffect(800, "B7")';
buffs.B7.buff = true;
buffs.B7.statUp = 0;
buffs.B7.potion = true;
buffs.B7.haste = true;


Object.keys(buffs).forEach(function(key) {
  buffs[key].img = key;
  buffs[key].percentage = 1;      
  buffs[key].time = 0;    
});

//#endregion
//----------------------==========================-----------------------
//----------------------===========AREAS==========-----------------------
//----------------------==========================-----------------------
//#region Areas
var areas = {}

areas.A1 = {};
areas.A1.name = 'Lush Passageway';
areas.A1.level = 1;
areas.A1.description = '"The starting point of many turtle adventurers. Although the monsters here dont pose a threat to the world, many people will be caught offward by them."';
areas.A1.unlocked = true;
areas.A1.visible = 1;
areas.A1.unlockedBoss = 0;
areas.A1.boss = 'E4';
areas.A1.bossKey = 'I106';
areas.A1.unlockedOre = 0;

areas.A2 = {};
areas.A2.name = 'Heart of the Forest';
areas.A2.level = 10;
areas.A2.description = '"A dense forest, home to a tribe of tribal turtle worshippers. These tribals are known to cause moderate ruckus so dont feel too bad about spoiling their day. Its also required to progress the game if it makes you feel better."';
areas.A2.unlocked = false;
areas.A2.unlockedBoss = 0;
areas.A2.boss = 'E8';
areas.A2.bossKey = 'I127';
areas.A2.unlockedHerb = 0;

areas.A3 = {};
areas.A3.name = 'Rock-Strewn Plateau';
areas.A3.level = 20;
areas.A3.description = '"A hazardous route lined with cliffs and granite, home to beasts which evolved to the harsh terrain. Their claws were developed to sink into the steep, rocky cliffs and tear apart prey. Some even acquired wings."';
areas.A3.unlocked = false;
areas.A3.unlockedBoss = 0;
areas.A3.boss = 'E12';

Object.keys(areas).forEach(function(key) {
  areas[key].id = key;
  areas[key].background = key;
  areas[key].mini = key+"M";      
});
//#endregion
//----------------------==========================-----------------------
//----------------------===========QUEST==========-----------------------
//----------------------==========================-----------------------
//#region Quests
var quests = {} 

quests.A1Q1 = {};
quests.A1Q1.name = 'Important Notice';
quests.A1Q1.level = 1;
quests.A1Q1.description = '“Thank you for enrolling into the Super Turtle Adventure program. People from all arround the world will pay handsomly for brave turtles to complete their tasks.<br><br>To complete the registation, please terrorise the local wildlife.”<br><br><span style="color:#FFD100">[Tip: You can switch browser tabs while the game is running]</span><br><br><span style="color:#FFD100; font-size:1vw"> Objectives:</span><br><span style="color:#deaf6a">❖ Defeat a bunch of slugs</span><br><br><span style="color:#FFD100; font-size:1vw"> Rewards:</span></span><br><span style="color:#79ed8b">★ A stick with the shape of a sword</span><br><span style="color:#ffbd54">★ 500 Turtle Coins</span><br><span style="color:#ae77f7">★ 1000 Experience</span><br><span style="color:#94e1f2">★ A morally ambiguous job</span>';
quests.A1Q1.objective = 'if (enemies.E1.killCount>5) {quests.A1Q1.state = "complete"} else {quests.A1Q1.state = "pending"}';
quests.A1Q1.state = 'locked';
quests.A1Q1.effect = 'questReward(500*multiplicativeCoinRewards, 1000); items.I8.count++;';

unlocks.shop = false

quests.A1Q2 = {};
quests.A1Q2.name = 'To My Beloved Friend';
quests.A1Q2.level = 2;
quests.A1Q2.description = '“Dear adventurers, I am a prince from Nigeria. A giant idiot spider destroyed my settlement and I need financial help.<br><br>In return, I will give an early access to my shop wares while I rebuild back my empire."<br><br><span style="color:#FFD100">[Tip: You can sell items by pressing Shift]</span><br><br><span style="color:#FFD100; font-size:1vw"> Objectives:</span><br><span style="color:#deaf6a">❖ Give 5000 Turtle Coins to the prince</span><br><br><span style="color:#FFD100; font-size:1vw"> Rewards:</span></span><br><span style="color:#79ed8b">★ Access to the Shop</span><br><span style="color:#ffbd54">★ -5000 Turtle Coins</span><br><span style="color:#ae77f7">★ 200 Experience</span><br><span style="color:#94e1f2">★ Severe trust issues</span>';
quests.A1Q2.objective = 'if (rpgPlayer.coins>=5000) {quests.A1Q2.state = "complete"} else {quests.A1Q2.state = "pending"}';
quests.A1Q2.effect = 'questReward(0, 200); rpgPlayer.coins-=5000; unlocks.shop = true;  unlocksReveal()';
quests.A1Q2.state = 'locked';
//quests.A1Q2.locked = true;

quests.A1Q3 = {};
quests.A1Q3.name = 'Clearing The Mineshaft';
quests.A1Q3.level = 5;
quests.A1Q3.description = '“ The folks over here of the Miners Guild are pretty darn troubled. These darn scorpions keep blocking the path to the mineshaft and we cant even do our job!<br><br>Clear the darn path for us and well have no trouble showing you the way to get some sweet rocks, will ya? ”<br><br><span style="color:#FFD100; font-size:1vw"> Objectives:</span><br><span style="color:#deaf6a">❖ Clear the path of scorpids</span><br><br><span style="color:#FFD100; font-size:1vw"> Rewards:</span></span><br><span style="color:#79ed8b">★ Access to the mines</span><br><span style="color:#ffbd54">★ 8500 Turtle Coins</span><br><span style="color:#ae77f7">★ 800 Experience</span><br><span style="color:#94e1f2">★ -1830 reputation with the Scorpion clan </span>';
quests.A1Q3.objective = 'if (enemies.E2.killCount>10) {quests.A1Q3.state = "complete"} else {quests.A1Q3.state = "pending"}';
quests.A1Q3.effect = 'questReward(8500*multiplicativeCoinRewards, 800); areas.A1.unlockedOre = 1; specialButtonUi();';
quests.A1Q3.state = 'locked';

unlocks.boss1found = false;

quests.A1Q4 = {};
quests.A1Q4.name = 'Have You Seen My Pet';
quests.A1Q4.level = 8;
quests.A1Q4.description = '“ My pet Hopperoona has gone missing for a while. You will recognise her for her eight legs, fuzzy hair, and the ability to melt steel beams with her saliva.<br><br>She is the unruly type, so its okay to get a bit rough. She will come home once she stops playing. ”<br><br><span style="color:#FFD100; font-size:1vw"> Objectives:</span><br><span style="color:#deaf6a">❖ Find Hopperoona</span><br><br><span style="color:#FFD100; font-size:1vw"> Rewards:</span></span><br><span style="color:#79ed8b">★ Get to play with her as many times as you want</span><br><span style="color:#ffbd54">★ 15000 Turtle Coins</span><br><span style="color:#ae77f7">★ 1500 Experience</span><br><span style="color:#94e1f2">★ A lifelong Friendship </span>';
quests.A1Q4.objective = 'if (unlocks.boss1found) {quests.A1Q4.state = "complete"}';
quests.A1Q4.effect = 'questReward(15000*multiplicativeCoinRewards, 1500); areas.A1.unlockedBoss = 1;  specialButtonUi();';
quests.A1Q4.state = 'locked';

unlocks.areas = false;

quests.A1Q5 = {};
quests.A1Q5.name = 'Helping Hand on Woods';
quests.A1Q5.level = 10;
quests.A1Q5.description = '“ This is an official request from the Super Turtle Adventure program. Your deeds have been heard loud and clear across the place.<br><br>Weve made the decision to put you in charge of resolving the conflicts relating the Tribals that are taking place in the forest. You can progress with your adventures as soon as you finished all the business here. Thank you for sticking with the Super Turtle Adventure program. ”<br><br> <span style="color:#FFD100; font-size:1vw"> Objectives:</span><br><span style="color:#deaf6a">❖ Say goodbye to Hopperoona</span><br><br><span style="color:#FFD100; font-size:1vw"> Rewards:</span></span><br><span style="color:#79ed8b">★ Access to the next area</span><br><span style="color:#ffbd54">★ 25000 Turtle Coins</span><br><span style="color:#ae77f7">★ 5500 Experience</span><br><span style="color:#94e1f2">★ The unfold of an incredible adventure </span>';
quests.A1Q5.objective = 'if (enemies.E4.killCount>0)  {quests.A1Q5.state = "complete"}';
quests.A1Q5.effect = 'questReward(25000*multiplicativeCoinRewards, 5500); areas.A2.unlocked = 1; unlocks.areas = true; unlocksReveal()';
quests.A1Q5.state = 'locked';

quests.A1Q6 = {};
quests.A1Q6.name = 'Chai Chai Real Smooth';
quests.A1Q6.level = 15;
quests.A1Q6.description = '“ This is a direct request of Muggey, the head president of the Chai Association.<br><br>I will personally offer a lifetime membership alongside my distinguished recipe for tea to however that can show me their most unusual blend. ”<br><br> <span style="color:#FFD100; font-size:1vw"> Objectives:</span><br><span style="color:#deaf6a">❖ Show an unusual tea blend to Muggey</span><br><br><span style="color:#FFD100; font-size:1vw">Rewards:</span></span><br><span style="color:#79ed8b">★ Recipe: Masala Chai</span></span><br><span style="color:#ffbd54">★ 33500 Turtle Coins</span><br><span style="color:#ae77f7">★ 30000 Experience</span><br><span style="color:#94e1f2">★ Forbidden chai knowledge </span>';
quests.A1Q6.objective = 'if (items.I111.count>0) {quests.A1Q6.state = "complete"}';
quests.A1Q6.effect = 'questReward(33500*multiplicativeCoinRewards, 30000); items.I103D.count++; items.I111.count = 0; recipes.CN7.unlocked = false;';
quests.A1Q6.state = 'locked';

//area 2
quests.A2Q1 = {};
quests.A2Q1.name = 'Undergoing Renovations';
quests.A2Q1.level = 10;
quests.A2Q1.description = '“ My workshop has been ransacked by the Tribals.<br><br>I will let anyone willing to help me with the reparations to use it, free of charge ”<br><br> <span style="color:#FFD100; font-size:1vw"> Objectives:</span><br><span style="color:#deaf6a">❖ Hand over 100 copper ore and 100 rabbit hide</span><br><br><span style="color:#FFD100; font-size:1vw">Rewards:</span></span><br><span style="color:#79ed8b">★ Access to Craftwork</span></span><br><span style="color:#ffbd54">★ 35000 Turtle Coins</span><br><span style="color:#ae77f7">★ 9000 Experience</span><br><span style="color:#94e1f2">★ The satisfaction of honest work </span>';
quests.A2Q1.objective = 'if (items.I32.count>99 && items.I114.count>49) {quests.A2Q1.state = "complete"} else {quests.A2Q1.state = "pending"}';
quests.A2Q1.effect = 'questReward(35000*multiplicativeCoinRewards, 9000); items.I32.count-=100; items.I114.count-=50; unlocks.jobs = true;  unlocksReveal()'; 
quests.A2Q1.state = 'locked';

quests.A2Q7 = {};
quests.A2Q7.name = 'Help! Missing Feline';
quests.A2Q7.level = 10;
quests.A2Q7.description = '“  THE TRIBALS ATE MY CAT.<br><br>Now that I got your attention, my cat Whiskers is missing. He likes dark closed spaces. I have nothing to offer but Whiskers grattitude. ”<br><br> <span style="color:#FFD100; font-size:1vw"> Objectives:</span><br><span style="color:#deaf6a">❖ Find Whiskers</span><br><br><span style="color:#FFD100; font-size:1vw">Rewards:</span></span><br><span style="color:#79ed8b">★ Whiskers Gratitude</span></span><br><span style="color:#ffbd54">★ 21000 Turtle Coins</span><br><span style="color:#ae77f7">★ 10000 Experience</span><br><span style="color:#94e1f2">★ 3 days of bad luck </span>';
quests.A2Q7.objective = 'if (items.I123.count>0) {quests.A2Q7.state = "complete"}';
quests.A2Q7.effect = 'questReward(21000*multiplicativeCoinRewards, 10000); items.I123.count--; items.I120.count++;'; 
quests.A2Q7.state = 'locked';

quests.A2Q5 = {};
quests.A2Q5.name = 'Invasive Species';
quests.A2Q5.level = 12;
quests.A2Q5.description = '“  The agriculture guild is in shambles. The forest has always been a valuable agronomic asset, however, the Tribals are growing invasive species on the inside.<br><br>Supply the guild with proper equipment to deal with this situation. ”<br><br> <span style="color:#FFD100; font-size:1vw"> Objectives:</span><br><span style="color:#deaf6a">❖ Hand over 10 Light Dynamites for the agriculture guild</span><br><br><span style="color:#FFD100; font-size:1vw">Rewards:</span></span><br><span style="color:#79ed8b">★ Unlock Herb Node</span></span><br><span style="color:#ffbd54">★ 32000 Turtle Coins</span><br><span style="color:#ae77f7">★ 16000 Experience</span><br><span style="color:#94e1f2">★ A powerful ally </span>';
quests.A2Q5.objective = 'if (items.I30.count>9) {quests.A2Q5.state = "complete"} else {quests.A2Q5.state = "pending"}';
quests.A2Q5.effect = 'questReward(32000*multiplicativeCoinRewards, 16000); items.I30.count-=10; items.I114.count-=50; areas.A2.unlockedHerb = 1; specialButtonUi();'; 
quests.A2Q5.state = 'locked';

quests.A2Q3 = {};
quests.A2Q3.name = 'Tribal Admiration';
quests.A2Q3.level = 15;
quests.A2Q3.description = '“ I need love advice to court the lady of my dreams. The issue is that the lady is the head of the tribal settlement, and im sure im not enough of a man to compete with the rest.<br><br>Help me gather 200 acorns for the headess in order to claim her heart. ”<br><br> <span style="color:#FFD100; font-size:1vw"> Objectives:</span><br><span style="color:#deaf6a">❖ Hand over 200 acorns</span><br><br><span style="color:#FFD100; font-size:1vw">Rewards:</span></span><br><span style="color:#79ed8b">★ Unlock Tribal offerings</span></span><br><span style="color:#ffbd54">★ 42000 Turtle Coins</span><br><span style="color:#ae77f7">★ 30000 Experience</span><br><span style="color:#94e1f2">★ Cupids Blessing (Not an actual reward)</span>';
quests.A2Q3.objective = 'if (items.I115.count>199) {quests.A2Q3.state = "complete"} else {quests.A2Q3.state = "pending"}';
quests.A2Q3.effect = 'questReward(42000*multiplicativeCoinRewards, 30000); items.I115.count-=200; areas.A2.unlockedBoss = 1;  specialButtonUi(); unlocksReveal();'; 
quests.A2Q3.state = 'locked';

quests.A2Q2 = {};
quests.A2Q2.name = 'Husbandry Issues';
quests.A2Q2.level = 17;
quests.A2Q2.description = '“ The Tribals forced my husband to release the chickens he was using to conduct research. I need someone to gather them back at any cost before the casualties spread.<br><br>As a reward, Ill hand some scribbles of the research of my husband for free. ”<br><br> <span style="color:#FFD100; font-size:1vw"> Objectives:</span><br><span style="color:#deaf6a">❖ Capture 10 hens</span><br><br><span style="color:#FFD100; font-size:1vw">Rewards:</span></span><br><span style="color:#79ed8b">★ Recipe: Clockwork Hen</span></span><br><span style="color:#ffbd54">★ 37000 Turtle Coins</span><br><span style="color:#ae77f7">★ 35000 Experience</span><br><span style="color:#94e1f2">★ The satisfaction of honest work </span>';
quests.A2Q2.objective = 'if (items.I122.count>9) {quests.A2Q2.state = "complete"} ';
quests.A2Q2.effect = 'questReward(37000*multiplicativeCoinRewards, 35000); items.I122.count=0; items.I103C.count++;'; 
quests.A2Q2.state = 'locked';

quests.A2Q4 = {};
quests.A2Q4.name = 'Tribal Admiration [II]';
quests.A2Q4.level = 18;
quests.A2Q4.description = '“ Due to cultural differences, and the fact that giving an acorn is a declaration of death in the Tribal culture, the Tribals want to feed me to their local deity. Scare off their numen and save my life, pretty please. ”<br><br> <span style="color:#FFD100; font-size:1vw"> Objectives:</span><br><span style="color:#deaf6a">❖ Defeat the idol of the Tribals</span><br><br><span style="color:#FFD100; font-size:1vw">Rewards:</span></span><br><span style="color:#79ed8b">★ Finish the game for now</span></span><br><span style="color:#ffbd54">★ 42000 Turtle Coins</span><br><span style="color:#ae77f7">★ 40000 Experience</span><br><span style="color:#94e1f2">★ Removal of Cupids Blessing </span>';
quests.A2Q4.objective = 'if (enemies.E8.killCount>0)  {quests.A2Q4.state = "complete"}';
quests.A2Q4.effect = 'questReward(42000*multiplicativeCoinRewards, 40000);'; 

quests.A2Q4.state = 'locked';


Object.keys(quests).forEach(function(key) {
  quests[key].id = key;
  quests[key].once = false;
});
//#endregion
//----------------------==========================-----------------------
//----------------------===========RECIPES========-----------------------
//----------------------==========================-----------------------
//#region Recipes
var recipes = {}

//Smithing
//Novice
recipes.SN2 = {};
recipes.SN2.category = 'SNpanel';
recipes.SN2.description = '<span style="color: lawngreen">Requires Novice Blacksmith [1]</span><br>Smelt ore into a copper bar.</p>';
recipes.SN2.level = 1;
recipes.SN2.exp = 10;
recipes.SN2.timer = 1;
recipes.SN2.item = 'I31';
recipes.SN2.reagent1 = 'I32';
recipes.SN2.amount1 = 5;

recipes.SN3 = {};
recipes.SN3.category = 'SNpanel';
recipes.SN3.description = '<span style="color: lawngreen">Requires Novice Blacksmith [5]</span><br>Creates a Copper Key, used to open Novice Locks.</p>';
recipes.SN3.level = 5;
recipes.SN3.exp = 250;
recipes.SN3.timer = 10;
recipes.SN3.item = 'I41';
recipes.SN3.reagent1 = 'I66';
recipes.SN3.amount1 = 2;

recipes.SN4 = {};
recipes.SN4.category = 'SNpanel';
recipes.SN4.description = '<span style="color: lawngreen">Requires Novice Blacksmith [5]</span><br>Creates a Nephrite-Embedded Ring.</p>';
recipes.SN4.level = 5;
recipes.SN4.exp = 200;
recipes.SN4.timer = 550;
recipes.SN4.item = 'I44';
recipes.SN4.reagent1 = 'I66';
recipes.SN4.amount1 = 10;
recipes.SN4.reagent2 = 'I22';
recipes.SN4.amount2 = 30;
recipes.SN4.unlocked = false;

recipes.SN5 = {};
recipes.SN5.category = 'SNpanel';
recipes.SN5.description = '<span style="color: lawngreen">Requires Novice Blacksmith [10]</span><br>Creates a piece of gear of the Intrepid Voyager Set.</p>';
recipes.SN5.level = 10;
recipes.SN5.exp = 500;
recipes.SN5.timer = 530;
recipes.SN5.item = 'I73';
recipes.SN5.reagent1 = 'I66';
recipes.SN5.amount1 = 20;
recipes.SN5.reagent2 = 'I57';
recipes.SN5.amount2 = 80;
recipes.SN5.reagent3 = 'I114';
recipes.SN5.amount3 = 80;

recipes.SN6 = {};
recipes.SN6.category = 'SNpanel';
recipes.SN6.description = '<span style="color: lawngreen">Requires Novice Blacksmith [10]</span><br>Creates a piece of gear of the Intrepid Voyager Set.</p>';
recipes.SN6.level = 10;
recipes.SN6.exp = 500;
recipes.SN6.timer = 530;
recipes.SN6.item = 'I74';
recipes.SN6.reagent1 = 'I66';
recipes.SN6.amount1 = 20;
recipes.SN6.reagent2 = 'I57';
recipes.SN6.amount2 = 80;
recipes.SN6.reagent3 = 'I114';
recipes.SN6.amount3 = 80;

recipes.SN7 = {};
recipes.SN7.category = 'SNpanel';
recipes.SN7.description = '<span style="color: lawngreen">Requires Novice Blacksmith [10]</span><br>Creates a piece of gear of the Intrepid Voyager Set.</p>';
recipes.SN7.level = 10;
recipes.SN7.exp = 500;
recipes.SN7.timer = 530;
recipes.SN7.item = 'I75';
recipes.SN7.reagent1 = 'I66';
recipes.SN7.amount1 = 20;
recipes.SN7.reagent2 = 'I57';
recipes.SN7.amount2 = 80;
recipes.SN7.reagent3 = 'I114';
recipes.SN7.amount3 = 80;

recipes.SN8 = {};
recipes.SN8.category = 'SNpanel';
recipes.SN8.description = '<span style="color: lawngreen">Requires Novice Blacksmith [10]</span><br>Creates a piece of gear of the Intrepid Voyager Set.</p>';
recipes.SN8.level = 10;
recipes.SN8.exp = 500;
recipes.SN8.timer = 530;
recipes.SN8.item = 'I76';
recipes.SN8.reagent1 = 'I66';
recipes.SN8.amount1 = 20;
recipes.SN8.reagent2 = 'I57';
recipes.SN8.amount2 = 80;
recipes.SN8.reagent3 = 'I114';
recipes.SN8.amount3 = 80;

recipes.SN9 = {};
recipes.SN9.category = 'SNpanel';
recipes.SN9.description = '<span style="color: lawngreen">Requires Novice Blacksmith [10]</span><br>Creates a piece of gear of the Intrepid Voyager Set.</p>';
recipes.SN9.level = 10;
recipes.SN9.exp = 500;
recipes.SN9.timer = 530;
recipes.SN9.item = 'I77';
recipes.SN9.reagent1 = 'I66';
recipes.SN9.amount1 = 20;
recipes.SN9.reagent2 = 'I57';
recipes.SN9.amount2 = 80;
recipes.SN9.reagent3 = 'I114';
recipes.SN9.amount3 = 80;

/*
recipes.SN10 = {};
recipes.SN10.category = 'SNpanel';
recipes.SN10.description = '<span style="color: lawngreen">Requires Novice Blacksmith [10]</span><br>Smelt ore into an ingot of iron.</p>';
recipes.SN10.level = 10;
recipes.SN10.exp = 10;
recipes.SN10.timer = 5;
recipes.SN10.item = 'I35';
recipes.SN10.reagent1 = 'I36';
recipes.SN10.amount1 = 10;

recipes.SN11 = {};
recipes.SN11.category = 'SNpanel';
recipes.SN11.description = '<span style="color: lawngreen">Requires Novice Blacksmith [15]</span><br>Creates an Aquamarine-Embedded Ring.</p>';
recipes.SN11.level = 15;
recipes.SN11.exp = 10;
recipes.SN11.timer = 5;
recipes.SN11.item = 'I45';
recipes.SN11.reagent1 = 'I35';
recipes.SN11.amount1 = 10;
recipes.SN11.reagent2 = 'I43';
recipes.SN11.amount2 = 5;

recipes.SN12 = {};
recipes.SN12.category = 'SNpanel';
recipes.SN12.description = '<span style="color: lawngreen">Requires Novice Blacksmith [15]</span><br>Creates a Rough Weightstone, used to increase your Physical Damage.</p>';
recipes.SN12.level = 15;
recipes.SN12.exp = 10;
recipes.SN12.timer = 5;
recipes.SN12.item = 'I47';
recipes.SN12.reagent1 = 'I35';
recipes.SN12.amount1 = 10;

recipes.SN12 = {};
recipes.SN12.category = 'SNpanel';
recipes.SN12.description = '<span style="color: lawngreen">Requires Novice Blacksmith [15]</span><br>Creates a Rough Weightstone, used to increase your Physical Damage.</p>';
recipes.SN12.level = 15;
recipes.SN12.exp = 10;
recipes.SN12.timer = 5;
recipes.SN12.item = 'I47';
recipes.SN12.reagent1 = 'I35';
recipes.SN12.amount1 = 10;
*/

//Cooking
//Novice
recipes.CN1 = {};
recipes.CN1.category = 'CNpanel';
recipes.CN1.description = '<span style="color: lawngreen">Requires Novice Cooking [1]</span><br>Grinds down Thorny Anise.</p>';
recipes.CN1.level = 1;
recipes.CN1.exp = 10;
recipes.CN1.timer = 1;
recipes.CN1.item = 'I108';
recipes.CN1.reagent1 = 'I34';
recipes.CN1.amount1 = 5;

recipes.CN2 = {};
recipes.CN2.category = 'CNpanel';
recipes.CN2.description = '<span style="color: lawngreen">Requires Novice Cooking [1]</span><br>Prepares a Monster Sausage dish.</p>';
recipes.CN2.level = 1;
recipes.CN2.exp = 100;
recipes.CN2.timer = 15;
recipes.CN2.item = 'I54';
recipes.CN2.reagent1 = 'I1';
recipes.CN2.amount1 = 30;
recipes.CN2.reagent2 = 'I108';
recipes.CN2.amount2 = 5;

recipes.CN3 = {};
recipes.CN3.category = 'CNpanel';
recipes.CN3.description = '<span style="color: lawngreen">Requires Novice Cooking [5]</span><br>Creates an Actinic Flask.</p>';
recipes.CN3.level = 5;
recipes.CN3.exp = 30;
recipes.CN3.timer = 15;
recipes.CN3.item = 'I48';
recipes.CN3.reagent1 = 'I39';
recipes.CN3.amount1 = 3;

recipes.CN4 = {};
recipes.CN4.category = 'CNpanel';
recipes.CN4.description = '<span style="color: lawngreen">Requires Novice Cooking [5]</span><br>Prepares a Frog Pho dish.</p>';
recipes.CN4.level = 5;
recipes.CN4.exp = 110;
recipes.CN4.timer = 30;
recipes.CN4.item = 'I52';
recipes.CN4.reagent1 = 'I51';
recipes.CN4.amount1 = 30;
recipes.CN4.reagent2 = 'I108';
recipes.CN4.amount2 = 5;
recipes.CN4.reagent3 = 'I115';
recipes.CN4.amount3 = 20;
recipes.CN4.unlocked = false;

/*
recipes.CN5 = {};
recipes.CN5.category = 'CNpanel';
recipes.CN5.description = '<span style="color: lawngreen">Requires Novice Cooking [10]</span><br>Prepares a Chicken Yakitori dish.</p>';
recipes.CN5.level = 10;
recipes.CN5.exp = 10;
recipes.CN5.timer = 1;
recipes.CN5.item = 'I26';
recipes.CN5.reagent1 = 'I25';
recipes.CN5.amount1 = 10;
recipes.CN5.reagent2 = 'I115';
recipes.CN5.amount2 = 10;

recipes.CN6 = {};
recipes.CN6.category = 'CNpanel';
recipes.CN6.description = '<span style="color: lawngreen">Requires Novice Cooking [10]</span><br>Prepares a Hainanese Chicken dish.</p>';
recipes.CN6.level = 10;
recipes.CN6.exp = 10;
recipes.CN6.timer = 1;
recipes.CN6.item = 'I53';
recipes.CN6.reagent1 = 'I25';
recipes.CN6.amount1 = 10;
recipes.CN6.reagent2 = 'I115';
recipes.CN6.amount2 = 10;
recipes.CN6.reagent3 = 'I108';
recipes.CN6.amount3 = 10;
*/
recipes.CN7 = {};
recipes.CN7.category = 'CNpanel';
recipes.CN7.description = '<span style="color: lawngreen">Requires Novice Cooking [15]</span><br>Compress herbs into a special blend ignoring all safety procedures.</p>';
recipes.CN7.level = 15;
recipes.CN7.exp = 150;
recipes.CN7.timer = 5940;
recipes.CN7.item = 'I111';
recipes.CN7.reagent1 = 'I34';
recipes.CN7.amount1 = 200;
recipes.CN7.unlocked = true;

recipes.CN8 = {};
recipes.CN8.category = 'CNpanel';
recipes.CN8.description = '<span style="color: lawngreen">Requires Novice Cooking [15]</span><br>Brews a Masala Chai drink.</p>';
recipes.CN8.level = 15;
recipes.CN8.exp = 160;
recipes.CN8.timer = 30;
recipes.CN8.item = 'I110';
recipes.CN8.reagent1 = 'I108';
recipes.CN8.amount1 = 10;
recipes.CN8.unlocked = false;


//Alchemy
//Novice
recipes.AN1 = {};
recipes.AN1.category = 'ANpanel';
recipes.AN1.description = '<span style="color: lawngreen">Requires Novice Alchemy [1]</span><br>Treats Sulfur Ore into Sulfur Dust.</p>';
recipes.AN1.level = 1;
recipes.AN1.exp = 10;
recipes.AN1.timer = 1;
recipes.AN1.item = 'I39';
recipes.AN1.reagent1 = 'I40';
recipes.AN1.amount1 = 5;

recipes.AN2 = {};
recipes.AN2.category = 'ANpanel';
recipes.AN2.description = '<span style="color: lawngreen">Requires Novice Alchemy [5]</span><br>Brews a Lesser Healing Flask.</p>';
recipes.AN2.level = 5;
recipes.AN2.exp = 100;
recipes.AN2.timer = 20;
recipes.AN2.item = 'I19';
recipes.AN2.reagent1 = 'I48';
recipes.AN2.amount1 = 1;
recipes.AN2.reagent2 = 'I38';
recipes.AN2.amount2 = 50;

recipes.AN5 = {};
recipes.AN5.category = 'ANpanel';
recipes.AN5.description = '<span style="color: lawngreen">Requires Novice Alchemy [5]</span><br>Brews a Lesser Poison Flask.</p>';
recipes.AN5.level = 5;
recipes.AN5.exp = 70;
recipes.AN5.timer = 20;
recipes.AN5.item = 'I21';
recipes.AN5.reagent1 = 'I48';
recipes.AN5.amount1 = 1;
recipes.AN5.reagent2 = 'I37';
recipes.AN5.amount2 = 35;

recipes.AN3 = {};
recipes.AN3.category = 'ANpanel';
recipes.AN3.description = '<span style="color: lawngreen">Requires Novice Alchemy [10]</span><br>Brews a Lesser Nature Flask.</p>';
recipes.AN3.level = 10;
recipes.AN3.exp = 120;
recipes.AN3.timer = 20;
recipes.AN3.item = 'I49';
recipes.AN3.reagent1 = 'I48';
recipes.AN3.amount1 = 1;
recipes.AN3.reagent2 = 'I38';
recipes.AN3.amount2 = 30;
recipes.AN3.reagent3 = 'I115';
recipes.AN3.amount3 = 30;

recipes.AN4 = {};
recipes.AN4.category = 'ANpanel';
recipes.AN4.description = '<span style="color: lawngreen">Requires Novice Alchemy [10]</span><br>Brews a Lesser Might Flask.</p>';
recipes.AN4.level = 10;
recipes.AN4.exp = 120;
recipes.AN4.timer = 20;
recipes.AN4.item = 'I50';
recipes.AN4.reagent1 = 'I48';
recipes.AN4.amount1 = 1;
recipes.AN4.reagent2 = 'I38';
recipes.AN4.amount2 = 30;
recipes.AN4.reagent3 = 'I51';
recipes.AN4.amount3 = 30;

recipes.AN6 = {};
recipes.AN6.category = 'ANpanel';
recipes.AN6.description = '<span style="color: lawngreen">Requires Novice Alchemy [15]</span><br>Brews a Lesser Haste Flask.</p>';
recipes.AN6.level = 15;
recipes.AN6.exp = 200;
recipes.AN6.timer = 20;
recipes.AN6.item = 'I50';
recipes.AN6.reagent1 = 'I48';
recipes.AN6.amount1 = 1;
recipes.AN6.reagent2 = 'I38';
recipes.AN6.amount2 = 30;
recipes.AN6.reagent3 = 'I125';
recipes.AN6.amount3 = 30;

//Engineering
//Novice
recipes.EN1 = {};
recipes.EN1.category = 'ENpanel';
recipes.EN1.description = '<span style="color: lawngreen">Requires Novice Engineering [1]</span><br>Bends copper into a Copper Plate.</p>';
recipes.EN1.level = 1;
recipes.EN1.exp = 12;
recipes.EN1.timer = 2;
recipes.EN1.item = 'I66';
recipes.EN1.reagent1 = 'I31';
recipes.EN1.amount1 = 2;

recipes.EN2 = {};
recipes.EN2.category = 'ENpanel';
recipes.EN2.description = '<span style="color: lawngreen">Requires Novice Engineering [1]</span><br>Refines sulfur dust into gunpowder dust.</p>';
recipes.EN2.level = 1;
recipes.EN2.exp = 50;
recipes.EN2.timer = 3;
recipes.EN2.item = 'I29';
recipes.EN2.reagent1 = 'I39';
recipes.EN2.amount1 = 4;

recipes.EN3 = {};
recipes.EN3.category = 'ENpanel';
recipes.EN3.description = '<span style="color: lawngreen">Requires Novice Engineering [5]</span><br>Creates a Light Dynamite.</p>';
recipes.EN3.level = 5;
recipes.EN3.exp = 100;
recipes.EN3.timer = 15;
recipes.EN3.item = 'I30';
recipes.EN3.reagent1 = 'I66';
recipes.EN3.amount1 = 2;
recipes.EN3.reagent2 = 'I29';
recipes.EN3.amount2 = 1;

recipes.EN5 = {};
recipes.EN5.category = 'ENpanel';
recipes.EN5.description = '<span style="color: lawngreen">Requires Novice Engineering [5]</span><br>Creates a Copperwork Pipe.</p>';
recipes.EN5.level = 5;
recipes.EN5.exp = 200;
recipes.EN5.timer = 410;
recipes.EN5.item = 'I80';
recipes.EN5.reagent1 = 'I31';
recipes.EN5.amount1 = 10;
recipes.EN5.reagent2 = 'I66';
recipes.EN5.amount2 = 10;
recipes.EN5.unlocked = false;

recipes.EN4 = {};
recipes.EN4.category = 'ENpanel';
recipes.EN4.description = '<span style="color: lawngreen">Requires Novice Engineering [10]</span><br>Creates a Net-O-Launcher.</p>';
recipes.EN4.level = 10;
recipes.EN4.exp = 10;
recipes.EN4.timer = 1;
recipes.EN4.item = 'I67';
recipes.EN4.reagent1 = 'I31';
recipes.EN4.amount1 = 10;
recipes.EN4.reagent2 = 'I57';
recipes.EN4.amount2 = 10;
recipes.EN4.unlocked = false;

recipes.EN6 = {};
recipes.EN6.category = 'ENpanel';
recipes.EN6.description = '<span style="color: lawngreen">Requires Novice Engineering [15]</span><br>Creates a Clockwork Hen.</p>';
recipes.EN6.level = 15;
recipes.EN6.exp = 10;
recipes.EN6.timer = 1;
recipes.EN6.item = 'I67';
recipes.EN6.reagent1 = 'I31';
recipes.EN6.amount1 = 10;
recipes.EN6.reagent2 = 'I57';
recipes.EN6.amount2 = 10;
recipes.EN6.unlocked = false;


Object.keys(recipes).forEach(function(key) {
  recipes[key].id = key;
  recipes[key].selected = false;
  recipes[key].time = recipes[key].timer;
  recipes[key].crafting = 'false';
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
jobPanels.SN.unlocked = false;
jobPanels.SN.category = 'blacksmithRecipes';

jobPanels.CN = {}
jobPanels.CN.name = 'Novice Cooking Recipes';
jobPanels.CN.hidden = false;
jobPanels.CN.unlocked = false;
jobPanels.CN.category = 'cookingRecipes';

jobPanels.AN = {}
jobPanels.AN.name = 'Novice Alchemy Recipes';
jobPanels.AN.hidden = false;
jobPanels.AN.unlocked = false;
jobPanels.AN.category = 'alchemyRecipes';

jobPanels.EN = {}
jobPanels.EN.name = 'Novice Engineering Recipes';
jobPanels.EN.hidden = false;
jobPanels.EN.unlocked = false;
jobPanels.EN.category = 'engineeringRecipes';

Object.keys(jobPanels).forEach(function(key) {
  jobPanels[key].id = key;
});

//#endregion
//----------------------==========================-----------------------
//----------------------===========SHOP===========-----------------------
//----------------------==========================-----------------------
//#region ShopItems
var shopItems = {}

//Area 1
shopItems.A1S1 = {}
shopItems.A1S1.item = 'I12';
shopItems.A1S1.price = 600;
shopItems.A1S1.stock = 5;
//shopItems.A1S1.unlocked = false;

shopItems.A1S2 = {}
shopItems.A1S2.item = 'I9';
shopItems.A1S2.price = 5000;
shopItems.A1S2.stock = "∞";

shopItems.A1S3 = {}
shopItems.A1S3.item = 'I11';
shopItems.A1S3.price = 19500;
shopItems.A1S3.stock = "∞";

shopItems.A1S4 = {}
shopItems.A1S4.item = 'I41';
shopItems.A1S4.price = 3500;
shopItems.A1S4.stock = 10;

shopItems.A1S5 = {}
shopItems.A1S5.item = 'I90';
shopItems.A1S5.price = 33000;
shopItems.A1S5.stock = 1;

shopItems.A1S6 = {}
shopItems.A1S6.item = 'I113';
shopItems.A1S6.price = 22000;
shopItems.A1S6.stock = 1;

shopItems.A1S7 = {}
shopItems.A1S7.item = 'I7';
shopItems.A1S7.price = 12000;
shopItems.A1S7.stock = "∞";

shopItems.A1S8 = {}
shopItems.A1S8.item = 'I78';
shopItems.A1S8.price = 39200;
shopItems.A1S8.stock = "∞";

shopItems.A1S9 = {}
shopItems.A1S9.item = 'I104';
shopItems.A1S9.price = 85900;
shopItems.A1S9.stock = 1;

shopItems.A1S10 = {}
shopItems.A1S10.item = 'I105';
shopItems.A1S10.price = 5000;
shopItems.A1S10.stock = "∞";

shopItems.A1S11 = {}
shopItems.A1S11.item = 'I129';
shopItems.A1S11.price = 75000;
shopItems.A1S11.stock = "∞";

shopItems.A1S12 = {}
shopItems.A1S12.item = 'I84';
shopItems.A1S12.price = 65000;
shopItems.A1S12.stock = "∞";

//area 2
shopItems.A2S1 = {}
shopItems.A2S1.item = 'I88';
shopItems.A2S1.price = 190000;
shopItems.A2S1.stock = "∞";

shopItems.A2S2 = {}
shopItems.A2S2.item = 'I103E';
shopItems.A2S2.price = 125000;
shopItems.A2S2.stock = 1;
/*
shopItems.A2S3 = {}
shopItems.A2S3.item = 'I30'; 
shopItems.A2S3.price = 10;
shopItems.A2S3.stock = 5;
*/
shopItems.A2S4 = {}
shopItems.A2S4.item = 'I103F';
shopItems.A2S4.price = 95000;
shopItems.A2S4.stock = 1;
/*
shopItems.A2S5 = {}
shopItems.A2S5.item = 'I19'; 
shopItems.A2S5.price = 10;
shopItems.A2S5.stock = 10;
*/
shopItems.A2S6 = {}
shopItems.A2S6.item = 'I116';
shopItems.A2S6.price = 210000;
shopItems.A2S6.stock = "∞";
/*
shopItems.A2S7 = {}
shopItems.A2S7.item = 'I114';
shopItems.A2S7.price = 10;
shopItems.A2S7.stock = 25;
*/
shopItems.A2S8 = {}
shopItems.A2S8.item = 'I121';
shopItems.A2S8.price = 14000;
shopItems.A2S8.stock = 10;

shopItems.A2S9 = {}
shopItems.A2S9.item = 'I86';
shopItems.A2S9.price = 255000;
shopItems.A2S9.stock = 1;

shopItems.A2S10 = {}
shopItems.A2S10.item = 'I124';
shopItems.A2S10.price = 185000;
shopItems.A2S10.stock = 1;
/*
shopItems.A2S11 = {}
shopItems.A2S11.item = 'I88';
shopItems.A2S11.price = 10;
shopItems.A2S11.stock = 1;
*/
shopItems.A2S12 = {}
shopItems.A2S12.item = 'I125';
shopItems.A2S12.price = 640000;
shopItems.A2S12.stock = 1;


Object.keys(shopItems).forEach(function(key) {
  shopItems[key].id = key;
});
//#endregion
//----------------------==========================-----------------------
//----------------------========DROP TABLES=======-----------------------
//----------------------==========================-----------------------
//#region Droptables
var area1Common = { I2:{D:300,C:1}, I3:{D:300,C:1}, I4:{D:300,C:1}, I5:{D:300,C:1}, I6:{D:300,C:1}, /*set*/ I131:{D:700,C:1}, /*thorn ring*/ I10:{D:200,C:1}, /*chest*/ I22:{D:50,C:1}, /*gem*/ I112:{D:30,C:1}, /*boomerang*/}
var smallCache = { I22:{D:1,C:"rng(1,6)"}, I12:{D:1,C:"rng(1,3)"}, I94:{D:8,C:1}, I42:{D:3,C:1}, I103B:{D:6,C:1}, I103A:{D:6,C:1}, I81:{D:10,C:1},}
var spiderEggsack = { I97:{D:1,C:"rng(1,6)"}, I57:{D:1,C:"rng(9,19)"}, I83:{D:15,C:1}, I109:{D:60,C:1},}
var whiskersPresent = { I118:{D:1, C:1}, I117:{D:100, C:1},}


//#endregion
//----------------------==========================-----------------------
//----------------------===========LOGS===========-----------------------
//----------------------==========================-----------------------
//#region Logs
var logs = {}

//book1
logs.B1P1 = {}
logs.B1P1.name = "Cultivated Mind";
logs.B1P1.description = "Fill out 10 journal pages.<br><span class='logStat'>+8% Item Stack Capacity</span>";
logs.B1P1.hint = "But you know what I like more than materialistic things? Knowledge.";

logs.B1P2 = {}
logs.B1P2.name = "Vive la Révolution";
logs.B1P2.description = "Craft 1000 Items.<br><span class='logStat'>-3 Seconds to Craft Any Item</span>";
logs.B1P2.hint = "Really putting the 'Craft' in 'TurtleCraft'.";

logs.B1P3 = {}
logs.B1P3.name = "Experienced Adventurer";
logs.B1P3.description = "Complete 10 Quests.<br><span class='logStat'>+8% Item Drop Chance</span>";
logs.B1P3.hint = "Im Ready! Im Ready! Im Ready! Im Ready! Im Ready! Im Ready!";

logs.B1P4 = {}
logs.B1P4.name = "Nice.";
logs.B1P4.description = "Deal exactly 69 damage.<br><span class='logStat'>+69% Nice</span>";
logs.B1P4.hint = '"Nice."';

logs.B1P5 = {}
logs.B1P5.name = "Arachnophobia";
logs.B1P5.description = "Defeat the boss of the area 1.<br><span class='logStat'>+10% Item Stack Capacity</span>";
logs.B1P5.hint = '"Turtles and spiders were never meant to be friends."';

logs.B1P6 = {}
logs.B1P6.name = "Luck Issue";
logs.B1P6.description = "Obtain a Golden Clover<br><span class='logStat'>+15% Item Drop Chance</span>";
logs.B1P6.hint = '"Its shrimple."';

logs.B1P7 = {}
logs.B1P7.name = "Heroes Never Die!";
logs.B1P7.description = "Perish 100 times.<br><span class='logStat'>+50% Recovery Speed</span>";
logs.B1P7.hint = '"We still need you."';

logs.B1P8 = {}
logs.B1P8.name = "Pay 2 Win";
logs.B1P8.description = "Buy this page out of a store.<br><span class='logStat'>+15% Turtle Coin Reward From Quests</span>";
logs.B1P8.hint = '"It just doesnt feel morally right, right?"';

logs.B1P9 = {}
logs.B1P9.name = "You Shall be Known as...";
logs.B1P9.description = "Change the name of your turtle.<br><span class='logStat'>+10% Pat Turtle Coin Reward</span>";
logs.B1P9.hint = '"Let your voice be heard."';

logs.B1P10 = {}
logs.B1P10.name = "Back in Black";
logs.B1P10.description = "Change the name of your turtle back to Jeffrey.<br><span class='logStat'>+5% Pat Turtle Coin Reward</span>";
logs.B1P10.hint = '"Its like he never left..."';

logs.B1P11 = {}
logs.B1P11.name = "Quack.";
logs.B1P11.description = "Click the hidden duck.<br><span class='logStat'>+1% EXP Gains</span>";
logs.B1P11.hint = '"Thats not the animal you want to click."';

logs.B1P12 = {}
logs.B1P12.name = "So I Just Need To Let It Run?";
logs.B1P12.description = "Play for 10 hours.<br><span class='logStat'>+10% Item Stack Capacity</span>";
logs.B1P12.hint = '"Gameplay."';

logs.B1P13 = {}
logs.B1P13.name = "Turtle Rabbithole";
logs.B1P13.description = "Play for 50 hours.<br><span class='logStat'>-50 Hours of Your Life</span>";
logs.B1P13.hint = '"Where will it take me?"';

logs.B1P14 = {}
logs.B1P14.name = "I Can Stop Whenever I want";
logs.B1P14.description = "Play for 100 hours.<br><span class='logStat'>+20% Item Stack Capacity</span>";
logs.B1P14.hint = '"I just dont want to."';

logs.B1P15 = {}
logs.B1P15.name = "Decked Out";
logs.B1P15.description = "Equip a full Set of armor.<br><span class='logStat'>+5% EXP Gains</span>";
logs.B1P15.hint = '"... all five pieces of the puzzle!"';

logs.B1P16 = {}
logs.B1P16.name = "This One Officer";
logs.B1P16.description = "Click this page.<br><span class='logStat'>+4% Item Stack Capacity</span>"; //esto es item slot capacity
logs.B1P16.hint = '"Caught red handed."';

logs.B1P17 = {}
logs.B1P17.name = "Pawn Star";
logs.B1P17.description = "Sell 10 000 items.<br><span class='logStat'>+8% Item Stack Capacity</span>";
logs.B1P17.hint = '"Best I can do is 200 Coins."';

logs.B1P18 = {}
logs.B1P18.name = "Power Surge";
logs.B1P18.description = "Reach level 10.<br><span class='logStat'>+7% Respect</span>";
logs.B1P18.hint = '"First of many."';

logs.B1P19 = {}
logs.B1P19.name = "Path of the Hero";
logs.B1P19.description = "Reach level 20.<br><span class='logStat'>+9% Self Confidence</span>";
logs.B1P19.hint = '"And they dont stop coming..."';

logs.B1P20 = {}
logs.B1P20.name = "False Idol";
logs.B1P20.description = "Defeat the boss of the area 2.<br><span class='logStat'>+9% Item Stack Capacity</span>";
logs.B1P20.hint = '"Turtles and tigers were also never meant to be friends."';

logs.B1P21 = {}
logs.B1P21.name = "Pat Pat Pat Pat Pat";
logs.B1P21.description = "Click the turtle 1000 times.<br><span class='logStat'>+15% Pat Turtle Coin Reward</span>";
logs.B1P21.hint = "'pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat pat'";

logs.B1P22 = {}
logs.B1P22.name = "Whatever Did We Do?";
logs.B1P22.description = "Check out the Discord.<br><span class='logStat'>+2% Item Drop Chance</span>";
logs.B1P22.hint = '"Everyone is invited c:"';

logs.B1P23 = {}
logs.B1P23.name = "Honest Work";
logs.B1P23.description = "Unlock the Craftwork tab.<br><span class='logStat'>+1 New Tab</span>";
logs.B1P23.hint = "'Its not much...'";

logs.B1P24 = {}
logs.B1P24.name = "Fight Poison With Poison";
logs.B1P24.description = "Poison the Great Wolf Spider.<br><span class='logStat'>+3 Seconds of Player-Inflicted Poisons</span>";
logs.B1P24.hint = '"Feels good man."';

logs.B1P25 = {}
logs.B1P25.name = "Ill Take Your Entire Stock";
logs.B1P25.description = "Buy 100 items.<br><span class='logStat'>+9% Item Stack Capacity</span>";
logs.B1P25.hint = '"Do you have the client card?"';

logs.B1P26 = {}
logs.B1P26.name = "One way trip";
logs.B1P26.description = "Deal 1k Damage in one hit.<br><span class='logStat'>+1 Life Claimed</span>";
logs.B1P26.hint = '"...To the shadow realm."';

logs.B1P27 = {}
logs.B1P27.name = "Once in a Blue Moon";
logs.B1P27.description = "Obseve a Blue Moon.<br><span class='logStat'>+9% EXP Gains</span>";
logs.B1P27.hint = '"Literally speaking, that is."';

logs.B1P28 = {}
logs.B1P28.name = "Nothing Like The Present";
logs.B1P28.description = "Recieve ten presents from your turtle.<br><span class='logStat'>+10% Pat Turtle Coin Reward</span>";
logs.B1P28.hint = '"Repaying just a bit of all your kindness."';

//book2
logs.B2P1 = {}
logs.B2P1.name = "Double Kill";
logs.B2P1.description = "Deal 10K Damage in one hit.<br><span class='logStat'>+5% Item Drop Chance</span>";
logs.B2P1.hint = '"To the town of Agua Fria rode a stranger one fine day."';

logs.B2P2 = {}
logs.B2P2.name = "Killing Spree";
logs.B2P2.description = "Deal 50K Damage in one hit.<br><span class='logStat'>+5% Item Drop Chance</span>";
logs.B2P2.hint = '"Hardly spoke to folks around him, didnt have too much to say."';

logs.B2P3 = {}
logs.B2P3.name = "Multi Kill";
logs.B2P3.description = "Deal 100K Damage in one hit.<br><span class='logStat'>+1 Healing Potion Stack Capacity</span>";
logs.B2P3.hint = '"No one dared to ask his business, no one dared to make a slip."';

logs.B2P4 = {}
logs.B2P4.name = "Rampage";
logs.B2P4.description = "Deal 200K Damage in one hit.<br><span class='logStat'>+1 Healing Potion Stack Capacity</span>";
logs.B2P4.hint = '"For the stranger there among them had a big iron on his hip."';

logs.B2P5 = {}
logs.B2P5.name = "Mega Kill";
logs.B2P5.description = "Deal 500K Damage in one hit.<br><span class='logStat'>+1 Healing Potion Stack Capacity</span>";
logs.B2P5.hint = '"It was early in the morning when he rode into the town."';

logs.B2P6 = {}
logs.B2P6.name = "Dominating";
logs.B2P6.description = "Deal 800K Damage in one hit.<br><span class='logStat'>+1 Healing Potion Stack Capacity</span>";
logs.B2P6.hint = '"He came riding from the south side slowly lookin all around."';

logs.B2P7 = {}
logs.B2P7.name = "Ultra Kill";
logs.B2P7.description = "Deal 1M Damage in one hit.<br><span class='logStat'>+1 Healing Potion Stack Capacity</span>";
logs.B2P7.hint = '"Hes an outlaw loose and running, came the whisper from each lip."';

logs.B2P8 = {}
logs.B2P8.name = "Unstoppable";
logs.B2P8.description = "Deal 10M Damage in one hit.<br><span class='logStat'>+1 Healing Potion Stack Capacity</span>";
logs.B2P8.hint = '"And hes here to do some business with the big iron on his hip."';

logs.B2P9 = {}
logs.B2P9.name = "Monster Kill";
logs.B2P9.description = "Deal 30M Damage in one hit.<br><span class='logStat'>+1 Healing Potion Stack Capacity</span>";
logs.B2P9.hint = '"In this town there lived an outlaw by the name of Texas Red."';

logs.B2P10 = {}
logs.B2P10.name = "Godlike";
logs.B2P10.description = "Deal 50M Damage in one hit.<br><span class='logStat'>+1 Healing Potion Stack Capacity</span>";
logs.B2P10.hint = '"Many men had tried to take him and that many men were dead."';

Object.keys(logs).forEach(function(i) { logs[i].unlocked = false; logs[i].once = false; logs[i].statUp = 0; });
 
for (var i in logs) { if (logs[i]) { stats.totalLogs++; } }
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
rpgClass.noClass.color = "gray"
rpgClass.noClass.maxLevel = 30;

rpgClass.apprentice = {};
rpgClass.apprentice.name = "Apprentice"
rpgClass.apprentice.currentExp = 0;
rpgClass.apprentice.nextExp = 1000;
rpgClass.apprentice.level = 1;
rpgClass.apprentice.color = "#77C7EE"
rpgClass.apprentice.maxLevel = 40;

rpgClass.gambler = {};
rpgClass.gambler.name = "Gambler"
rpgClass.gambler.currentExp = 0;
rpgClass.gambler.nextExp = 1000;
rpgClass.gambler.level = 1;
rpgClass.gambler.color = "#68FEBE"
rpgClass.gambler.maxLevel = 40;

rpgClass.shogun = {};
rpgClass.shogun.name = "Shogun"
rpgClass.shogun.currentExp = 0;
rpgClass.shogun.nextExp = 1000;
rpgClass.shogun.level = 1;
rpgClass.shogun.color = "#FF1D56"
rpgClass.shogun.maxLevel = 40;



//#endregion



