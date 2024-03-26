
//#region Variable Hell

var playerAttackInterval = setInterval(playerAttack, playerHaste);

const enemyAttackMS = 2500;
var enemyAttackInterval = setInterval(enemyAttack, enemyAttackMS);
var dungeonTime = false;
var showdownTime = false;
var skirmishTime = false;
var skirmishWave = 1;
var godmode = false;

const gatherDifficulty = ["ore", "herb", "cache", "pond"];

stats.currentDifficulty = 'easy';
stats.currentArea = 'A1';
stats.currentEnemy = 'E1';

var currentHP = 0;

//#endregion
//----------------------==========================-----------------------
//----------------------==========COMBAT==========-----------------------
//----------------------==========================-----------------------
//#region Combat

function spawnEnemy(enemy) { //spawns enemy based on current difficulty and area, to spawn custom enemy, use deleteEnemy

  for (let i in enemies) if (enemies[i].difficulty===stats.currentDifficulty&&enemies[i].area===stats.currentArea) var currentEnemy=i 

  if (bossTime) currentEnemy=areas[stats.currentArea].boss

  if (rng(1,200) === 1 && !gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty && !skirmishTime && !showdownTime) && !dungeonTime && cd.presentCanSpawn<=0 && !settings.presentSwitch) {currentEnemy="E15"; }

  if (enemy!==undefined) currentEnemy=enemy

  if (skirmishTime!==false) currentEnemy = skirmish[skirmishTime]["wave" + skirmishWave]

  if (currentEnemy===undefined || currentEnemy===NaN) currentEnemy="E1"; //failsafe to prevent error enemies

  const div = document.createElement("div");
  div.id = currentEnemy + "enemy";
  div.className = "enemy";
  did("enemyAnimation").appendChild(div);
  div.innerHTML = '<img src="img/src/enemies/' + currentEnemy + '.png">';

  if (!gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) div.style.animation= "enemySpawn 0.5s 1";

  if (stats.currentEnemy==="E15") div.style.animation= "enemySpawn 0.5s 1";

  did("enemyName").innerHTML = enemies[currentEnemy].name;
  did("enemyLevel").textContent = enemies[currentEnemy].level;
  currentHP = enemies[currentEnemy].hp;
  stats.currentEnemy = currentEnemy;

  if (enemies[stats.currentEnemy].killCount>=100 && stats.currentArea!=="A7"){ farmable = true} else {farmable = false};
    if (farmable) {did('penguinIndicator').innerHTML='Active'; did('penguinIndicator').style.color='lawngreen';}
    else {did('penguinIndicator').innerHTML='Inactive';did('penguinIndicator').style.color='coral';}

    


}


stats.totalKills = 0
stats.totalBossKills = 0
var dungeonPoints = 0;
var skirmishPoints = 0;
var dungeonStage = 0;
var farmable = false
stats.dungeonsCleared = 0;
stats.purifiedMorgatosDefeated = 0;

function enemyUpdate() { //updates enemy HP and checks if enemy is dead


  if (currentHP <= 0) { //on enemy kill

        enemies[stats.currentEnemy].killCount++;
        stats.totalKills++;
        if (bossTime) {stats.totalBossKills++;};

        

        if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) {
          var totalEXP = Math.round(enemies[stats.currentEnemy].exp * multiplicativeEXPGain);
           rpgClass[stats.currentClass].currentExp += totalEXP;
           stats.totalExp += totalEXP;
           if (!settings.disableExpLog) logPrint("<FONT COLOR='#ae77f7'>You gain " + beautify(totalEXP) + " EXP!" );

           for (let i in enemies){ if (did(i+"enemy")){ did(i + "enemy").remove(); }}


        }
        else {
          var totalEXP = Math.round(enemies[stats.currentEnemy].exp * multiplicativeEXPGain);
          rpgClass[stats.currentClass].currentExp += totalEXP;
          stats.totalExp += totalEXP;
          if (!settings.disableExpLog) logPrint("<FONT COLOR='#ae77f7'>" + enemies[stats.currentEnemy].name + " gets defeated! You gain " + beautify(totalEXP) + " EXP!" );


          for (let i in enemies){ if (did(i+"enemy")){
            did(i + "enemy").style.animation = "enemyDefeat 0.2s 1 ease";
            setTimeout(function () { did(i + "enemy").remove(); }, 180);
            }}

        }

        trinketEnemyKill(); //trinket effect
        expBar();
        eval(enemies[stats.currentEnemy].drop);


    clearInterval(enemyAttackInterval); //reset attack interval
    enemyAttackInterval = setInterval(enemyAttack, enemyAttackMS);

    if (enemies[stats.currentEnemy].tag==="areaBoss"){
      if (togleAutoBoss && items[areas[stats.currentArea].bossKey].count>0) {
        items[areas[stats.currentArea].bossKey].count--
        addItem()
      } else bossTime = false;

    } else bossTime = false;

        
    if (dungeonTime) {
      dungeonPoints++;
      updateDungeonPoints()
    }

    if (enemies[stats.currentEnemy].tag==="finalBoss"){
      playSound("audio/startup.mp3");
      dungeonTime=false;
      areas[stats.currentArea].dungeonTimer=2400;
      did("rpgCanvas").style.animation = "";
      void did("rpgCanvas").offsetWidth;
      did("rpgCanvas").style.animation = "rpgFade 1s 1";
      stats.currentArea = "A1";
      dungeonPoints = 0;
      dungeonStage=0
      stats.dungeonsCleared++;
      updateDungeonPoints();
      switchArea();
      specialButtonUi();
    }

    if (enemies[stats.currentEnemy].tag==="stageBoss1"){
      dungeonStage=1;
      areas[stats.currentArea].dungeonTimer=1200;
      playSound("audio/startup.mp3");
      dungeonPoints = 0;
      updateDungeonPoints();
      did("dungeonBox2").style.animation = "";
      void did("dungeonBox2").offsetWidth;
    }

    if (enemies[stats.currentEnemy].tag==="showdownBoss"){
      console.log(showdownTimer)
      showdown[enemies[stats.currentEnemy].showdown].bestTime = showdownTimer;
      playSound("audio/startup.mp3");
      did(enemies[stats.currentEnemy].showdown+"showdown").style.animation = "levelUp 1s 1";
      endShowdown()

    }

    if (skirmishTime) {
      skirmishPoints++;
      updateSkirmishPoints()
    }

    if (stats.currentEnemy === "E18" && enemyPhase===2) stats.purifiedMorgatosDefeated++
  

    
    enemyDamageMultiplier = 1;
    enemyDefenseMultiplier = 1;
    enemyPhase = 1;
    buffs.B44.time=0

    
    spawnEnemy();

    

  }

  var percentageHP = (currentHP / enemies[stats.currentEnemy].hp) * 100;
  did("enemyHpBar").style.background = "linear-gradient(90deg, rgb(144,238,111)" + percentageHP + "%, rgb(255,119,119) " + percentageHP + "%)";

}

function playerAttack() { 
      if (rpgPlayer.alive && !(stats.currentArea === "A7" && !skirmishTime && !showdownTime) && !(stats.currentEnemy==='E20' && items[rpgPlayer.weaponSlot].tag!=="rod") && !(gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty) && enemies[stats.currentEnemy].gatheringLevel>playerGatheringLevel)) {

        if (!settings.disableCombatAudio) playSound("audio/playerAttack.mp3")
        

        if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) { //if its a gathering node
          

          var damageDealt = 5;
          if (rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].tag==="mattock" && (enemies[stats.currentEnemy].difficulty==="ore" || enemies[stats.currentEnemy].difficulty==="herb")) {
          damageDealt = 25
          } 
          enemyBasicDamage(damageDealt)

          if (currentSet==="explorer" && stats.currentEnemy==="E14"){
            if( rng(1,500)===1) {logPrint("<FONT COLOR='#edd585'>"+enemies[stats.currentEnemy].name + ": oooo yeah that hits the spot");}
            if( rng(1,500)===1) {logPrint("<FONT COLOR='#edd585'>"+enemies[stats.currentEnemy].name + ": get yer hands off me leaves");}
            if( rng(1,500)===1) {logPrint("<FONT COLOR='#edd585'>"+enemies[stats.currentEnemy].name + ": why are you looking at me like that");}
            if( rng(1,500)===1) {logPrint("<FONT COLOR='#edd585'>"+enemies[stats.currentEnemy].name + ": can we resolve this peacefully");}
          }
          
          
        } else  {

          playerAttackCheck();
          
          if ( rpgPlayer.weaponSlot==="none" || items[rpgPlayer.weaponSlot].animation === undefined) {
            playerAttackHit()
          }


      }

      

      if (rpgPlayer.weaponSlot!=="none" && items[rpgPlayer.weaponSlot].animation === "ranged"){

        did("playerWeapon").style.animation = "";
        void did("playerWeapon").offsetWidth;
        did("playerWeapon").style.animation = "gelatineHigh " + playerHaste / 1000 / 6 + "s 1 ease";

        did("playerAnimation").style.animation = "";
        void did("playerAnimation").offsetWidth;
        did("playerAnimation").style.animation = "gelatine " + playerHaste / 1000 / 6 + "s 1 ease";


      }

      if ( rpgPlayer.weaponSlot==="none" || items[rpgPlayer.weaponSlot].animation === undefined) {
        did("playerAnimation").style.animation = "";
        void did("playerAnimation").offsetWidth;
        did("playerAnimation").style.animation = "playerAttack " + playerHaste / 1000 / 2 + "s 1 ease";
      }

      did("npcPanel").style.animation = "";
      void did("npcPanel").offsetWidth;
      did("npcPanel").style.animation = "gelatine 0.3s 1 ease";
    
    
  
  
  enemyUpdate();
}


  
}

function playerAttackHit(){ //a regular player attack

  let damageDealt = rng((playerStrength/10), ((playerStrength/10)*1.1))

  if (rpgPlayer.weaponSlot !== "none") {
  
  if (items[rpgPlayer.weaponSlot].align==="nature") enemyNatureDamage(damageDealt)
  else if (items[rpgPlayer.weaponSlot].align==="might") enemyMightDamage(damageDealt)
  else if (items[rpgPlayer.weaponSlot].align==="elemental") enemyElementalDamage(damageDealt)
  else if (items[rpgPlayer.weaponSlot].align==="occult") enemyOccultDamage(damageDealt)
  else if (items[rpgPlayer.weaponSlot].align==="deific") enemyDeificDamage(damageDealt)

  } else enemyBasicDamage(damageDealt+12)

}

function playerAttackCheck(){

  if ('defenseChance' in enemies[stats.currentEnemy]) eval(enemies[stats.currentEnemy].defenseChance)

if (rpgPlayer.trinketSlot!=='none' && items[rpgPlayer.trinketSlot].attackChance) eval(items[rpgPlayer.trinketSlot].attackChance)
if (rpgPlayer.weaponSlot!=='none' && items[rpgPlayer.weaponSlot].attackChance) eval(items[rpgPlayer.weaponSlot].attackChance)

for (i in buffs) if (buffs[i].time>0) eval(buffs[i].attackChance)

if (currentSet==="tiger") if (rng(1,3)===1) castJungleKingSet()
if (currentSet==="pringu") castPringuSet()

}

function playerUpdate(){ //updates player HP and checks if its dead

  if (rpgPlayer.hp <= 0 && rpgPlayer.alive && !godmode) {
    rpgPlayer.hp = 0;
    if (bossTime) { //if a boss kills the turtle
      bossTime = false;
      enemyDamageMultiplier = 1;
      enemyDefenseMultiplier = 1;
    enemyPhase = 1;
      deleteEnemy();
      did("rpgCanvas").style.animation = "";
      void did("rpgCanvas").offsetWidth;
      did("rpgCanvas").style.animation = "rpgFade 1s 1";
    }
    if (dungeonTime){
      dungeonTime=false;
      did("rpgCanvas").style.animation = "";
      void did("rpgCanvas").offsetWidth;
      did("rpgCanvas").style.animation = "rpgFade 1s 1";
      stats.currentArea = "A1";
      dungeonPoints = 0;
      dungeonStage=0
      updateDungeonPoints()
      switchArea();
      specialButtonUi();
      deleteEnemy();
    }
    if (showdownTime || skirmishTime){
      endShowdown();
      deleteEnemy();
      revive();
    }

    rpgPlayer.alive = false;
    logPrint(stats.turtleName + " perishes :c");
    playSound("audio/death.mp3");
    hpRegen();
  }

  playerHealthCheck();

  var percentageplayerHP = (rpgPlayer.hp / playerMaxHp) * 100;
  did("playerHpBar").style.background = "linear-gradient(90deg, rgb(144,238,111)" + percentageplayerHP + "%, rgb(255,119,119) " + percentageplayerHP + "%)";
}

function playerHealthCheck() {

if (rpgPlayer.trinketSlot !== 'none' && 'healthChance' in items[rpgPlayer.trinketSlot]) eval(items[rpgPlayer.trinketSlot].healthChance)



}

setInterval(hpRegen, 1000);
function hpRegen() { //additionally manages death
  if (rpgPlayer.alive) {
    //if player alive
    if (rpgPlayer.hp < playerMaxHp && !bossTime && !dungeonTime && !showdownTime && !skirmishTime) rpgPlayer.hp += playerHpRegen/4;
    playerUpdate()
    
  } else {
    //if player dead
    if (rpgPlayer.hp < playerMaxHp) rpgPlayer.hp += playerHpRegen / 10;
    playerUpdate()
    playSound("audio/throw.mp3");
    did("playerAnimation").style.animation = "playerDeath 1s 1";
    setTimeout(function () { did("playerAnimation").style.transform = "rotateX(180deg) translateY(-35%)"; }, 800);
    did("rpgPlayerImg").src = "img/src/armor/dead.png";

    if (rpgPlayer.hp >= playerMaxHp) {
      rpgPlayer.alive = true;
      
      stats.timesDied++; //prevents the player from reloading and getting points

      did("playerAnimation").style.animation = "playerRevive 1s 1";
      setTimeout(function () { did("playerAnimation").style.transform = ""; }, 800);
      did("rpgPlayerImg").src = "img/src/armor/A0.png";

      setBonus();
    }
  }


}

var bossTime = false;
function enemyAttack() {
  if (
    gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty) || !rpgPlayer.alive || (stats.currentArea === "A7" && !skirmishTime && !showdownTime) || (buffs.B6.time>0 || buffs.B44.time>0)) { //conditions to not attack
  } else {
    if (!settings.disableCombatAudio) playSound("audio/enemyAttack.mp3")
        var damageDealt = rng(enemies[stats.currentEnemy].attack, (enemies[stats.currentEnemy].attack*1.05))*enemyDamageMultiplier //damage variance

        let dodged = false;

        if (buffs.B49.time>0 && rng(1,3)===1) dodged = true

        if (!dodged){

        if (enemies[stats.currentEnemy].align==='nature') playerNatureDamage(damageDealt)
        if (enemies[stats.currentEnemy].align==='might') playerMightDamage(damageDealt)
        if (enemies[stats.currentEnemy].align==='elemental') playerElementalDamage(damageDealt)
        if (enemies[stats.currentEnemy].align==='occult') playerOccultDamage(damageDealt)
        if (enemies[stats.currentEnemy].align==='deific') playerDeificDamage(damageDealt)

      } else {

        animState("rpgPlayerImg", "spin 1s linear 1");
        damageText('Miss', 'damageText', '#818181', undefined, "playerPanel");


      }

    did("enemyAnimation").style.animation = "";
    void did("enemyAnimation").offsetWidth;
    did("enemyAnimation").style.animation = "enemyAttack 0.5s 1";

    did("playerNpcPanel").style.animation = "";
    void did("playerNpcPanel").offsetWidth;
    did("playerNpcPanel").style.animation = "gelatine 0.3s 1 ease";

    enemyAttackCheck(damageDealt)
}
}

function enemyAttackCheck(damage){

  if (rpgPlayer.trinketSlot!=='none' && items[rpgPlayer.trinketSlot].defenseChance) eval(items[rpgPlayer.trinketSlot].defenseChance)
  if (rpgPlayer.weaponSlot!=='none' && items[rpgPlayer.weaponSlot].defenseChance) eval(items[rpgPlayer.weaponSlot].defenseChance)
  if (rpgPlayer.ringSlot!=='none' && items[rpgPlayer.ringSlot].defenseChance) eval(items[rpgPlayer.ringSlot].defenseChance)


  if ('attackChance' in enemies[stats.currentEnemy]) eval(enemies[stats.currentEnemy].attackChance)


  if (buffs.B48.time>0) enemyOccultDamage(damage*0.5)




}


setInterval(damageTicks, 1000);

var enemyNatureDot = 0;
var enemyElementalDot = 0;
var enemyMightDot = 0;
var enemyOccultDot = 0;
var enemyDeificDot = 0;
var enemyHealingDot = 0;

var playerNatureDot = 0;
var playerElementalDot = 0;
var playerMightDot = 0;
var playerOccultDot = 0;
var playerDeificDot = 0;
var playerHealingDot = 0;



function damageTicks() {

  enemyNatureDot = buffs.B2.statUp + buffs.B42.statUp + buffs.B54.statUp 
  enemyElementalDot = 0 + buffs.B43.statUp;
  enemyMightDot = 0;
  enemyOccultDot = 0 + buffs.B33.statUp + buffs.B50.statUp;
  enemyDeificDot = 0;
  enemyHealingDot = 0;


  playerNatureDot = buffs.B3.statUp + buffs.B56.statUp + buffs.B57.statUp + buffs.B42.statUp
  playerElementalDot = 0 + buffs.B59.statUp;
  playerMightDot = 0;
  playerOccultDot = 0;
  playerDeificDot = 0;
  playerHealingDot = 0 + buffs.B53.statUp;

  if (rpgPlayer.alive && playerNatureDot > 0) { playerNatureDamage(playerNatureDot);}
  if (rpgPlayer.alive && playerMightDot > 0) { playerMightDamage(playerMightDot);}
  if (rpgPlayer.alive && playerElementalDot > 0) { playerElementalDamage(playerElementalDot);}
  if (rpgPlayer.alive && playerDeificDot > 0) { playerDeificDamage(playerDeificDot);}
  if (rpgPlayer.alive && playerOccultDot > 0) { playerOccultDamage(playerOccultDot);}
  if (rpgPlayer.alive && playerHealingDot > 0) { playerHealingDamage(playerHealingDot);}
  
  if (enemyNatureDot > 0) { enemyNatureDamage(enemyNatureDot, 'noScale'); }
  if (enemyMightDot > 0) { enemyMightDamage(enemyMightDot, 'noScale'); }
  if (enemyElementalDot > 0) { enemyElementalDamage(enemyElementalDot, 'noScale'); }
  if (enemyDeificDot > 0) { enemyDeificDamage(enemyDeificDot, 'noScale'); }
  if (enemyOccultDot > 0) { enemyOccultDamage(enemyOccultDot, 'noScale'); }



}

function deleteEnemy(enemy) {  //deletes without loot, used in dungeons, bosses and switching area
  for (let i in enemies) {
    if (did(i + "enemy")) {
      
  did(i + "enemy").remove();
  currentHP = 0;
  
  spawnEnemy(enemy);
  did(stats.currentEnemy + "enemy").style.animation= "enemySpawn 0.5s 1";
    }}
}

function logPrint(print) {
  let hitLog = document.createElement("div");
  hitLog.id = Math.random();
  did("combatLog").appendChild(hitLog);
  hitLog.className = "logMessage";
  hitLog.innerHTML = print;
  const elemento = document.getElementById("combatLog");
  //did('combatLog').scrollTop = did('combatLog').scrollHeight; //scroll to bottom on creation
  if (did("combatLog").children.length >= 100)
    did("combatLog").removeChild(did("combatLog").firstChild); //if it has more than x childs delete the first
}

function expBar() { //updates exp bar and checks level up
  if (rpgClass[stats.currentClass].level>=rpgClass[stats.currentClass].maxLevel){ rpgClass[stats.currentClass].currentExp = 0 }

  if (rpgClass[stats.currentClass].currentExp >= rpgClass[stats.currentClass].nextExp) { //on level up
    playSound("audio/levelup.mp3")
    rpgClass[stats.currentClass].currentExp -= rpgClass[stats.currentClass].nextExp;
    rpgClass[stats.currentClass].nextExp = Math.floor(1000 * Math.pow(1.5, rpgClass[stats.currentClass].level)); //esto era 1.4
    rpgClass[stats.currentClass].level += 1;
   
    did("expPanel").style.animation = "";
    void did("expPanel").offsetWidth;
    did("expPanel").style.animation = "levelUp 1s 1";

    rpgPlayer.baseStrength = 4 + (rpgClass[stats.currentClass].level * 9);
    rpgPlayer.baseMaxHp = 33 + (rpgClass[stats.currentClass].level * 67);
    rpgPlayer.baseHpRegen = 3.3 + (rpgClass[stats.currentClass].level * 6.7);

    animState("playerAnimation", "gelatineHigh 0.3s 1");animParticleBurst(15 , "particleExp", "playerPanel", 0)
    did("turtleLevel2").innerHTML = rpgClass[stats.currentClass].level

    if (rpgClass.noClass.level>29) rpgPlayer.talentProgress++;
    if (rpgPlayer.talentProgress===6){rpgPlayer.talentProgress=0; rpgPlayer.talentPoints++; rpgPlayer.totalTalentPoints++}

    unlocksReveal();
    updateTalentUI();
    statsUpdate();
    updateStatsUI();
    createAreaPanel();
  }

  let percentageEXP = (rpgClass[stats.currentClass].currentExp / rpgClass[stats.currentClass].nextExp) * 100;
  did("expBar").style.background = "linear-gradient(90deg, #6FB1EE " + percentageEXP + "%, #3F3939 " + percentageEXP + "%)";
  did("currentExp").textContent = beautify(rpgClass[stats.currentClass].currentExp) + "/" + beautify(rpgClass[stats.currentClass].nextExp);
}


function resetTalentPoints() {

  for (var i in talent) { talent[i].active = false;}
  talent.T0.active = true;
  talent.noClass.active = true;

  did('resetTalentMenu').style.display = 'none';
  playSound('audio/talent2.mp3');

  did("myCanvas").width = did("myCanvas").width

  for (let i in talent) {

      if ("statUp" in talent[i]) talent[i].statUp = 0;

      if ("parent" in talent[i]) {
      var parent = talent[i].parent

      const [startX, startY] = talent[i].position.split(' ');
      const [endX, endY] = talent[parent].position.split(' ');

      drawLine(parseInt(startX, 10), parseInt(startY, 10), parseInt(endX, 10),parseInt(endY, 10));
      }

      
    }

    stats.currentClass = "noClass";
    rpgPlayer.skill0 = "none";
    rpgPlayer.skill1 = "none";
    rpgPlayer.skill2 = "none";
    rpgPlayer.skill3 = "none";
    rpgPlayer.skill4 = "none";

    did("skillWrapper").innerHTML=""
    did("classWrapper").innerHTML=""

    
    rpgPlayer.talentPoints = rpgPlayer.totalTalentPoints;


  updateSkills();
  updateClass();
  updateTalentUI();


 
  

}

function updateClass(){

  rpgPlayer.baseStrength = 4 + (rpgClass[stats.currentClass].level * 9);
  rpgPlayer.baseMaxHp = 33 + (rpgClass[stats.currentClass].level * 67);
  rpgPlayer.baseHpRegen = 3.3 + (rpgClass[stats.currentClass].level * 6.7);

  did("turtleLevel2").innerHTML = rpgClass[stats.currentClass].level;
  did("classIcon").src = "img/src/talents/"+stats.currentClass+".jpg";
  did("expPanelClass").innerHTML = '&lt;'+rpgClass[stats.currentClass].name+'&gt;';
  did("expPanelClass").style.color = rpgClass[stats.currentClass].color;

  expBar();
  statsUpdate();
  updateStatsUI();
}

function rollFishingTables(){

if (stats.currentEnemy==='E20') { //eerie pond

if (playerFishingLevel<=1) {rollTable(fishingJunk, 4); rollTable(fishingEeriePond1, 1)}
if (playerFishingLevel===2) {rollTable(fishingJunk, 2); rollTable(fishingEeriePond1, 2)}
if (playerFishingLevel>=3) {rollTable(fishingJunk, 1); rollTable(fishingEeriePond1, 3); rollTable(fishingEeriePond2, 1)}

}



}

function updateDungeonPoints(){

  let percentageEXP =  (dungeonPoints/areas[stats.currentArea].dungeonPoints)*100;   
  did('dungeonMeter').style.width = percentageEXP+"%";

  if (dungeonPoints === areas[stats.currentArea].dungeonPoints){
  
  if (dungeonStage===0){
  playSound("audio/levelup.mp3");
  did("dungeonBox2").style.animation = "levelUp 1s 1";
  did("dungeonBox2").style.animation = "dungeonBoss 3s infinite";
  setTimeout(() => {  deleteEnemy(areas[stats.currentArea].boss1) }, 200);
  }

  if (dungeonStage===1){
  playSound("audio/levelup.mp3");
  did("dungeonBox2").style.animation = "levelUp 1s 1";
  did("dungeonBox2").style.animation = "dungeonBoss 3s infinite";
  setTimeout(() => {  deleteEnemy(areas[stats.currentArea].boss2) }, 200);
  }

  }
  
}

stats.criticalHitsDealt = 0;

function trinketEnemyKill() {}

const typestrength = 1.3;
const typeResist = 0.7;

function critMark(number) {  return "!".repeat(Math.max(0, number)); }

function enemyNatureDamage(damage, type){
  let damageDealt = (damage + additiveNatureDamage) * multiplicativeNatureDamage;
  if (type==="noScale") damageDealt = damage
  if (type==="skillDmg") damageDealt = damage * multiplicativeNatureDamage
  damageDealt *= enemyDefenseMultiplier
  let icon;
  if (enemies[stats.currentEnemy].align === 'elemental') {damageDealt *= typeResist; icon='weak';}
  if (enemies[stats.currentEnemy].align === 'might') {damageDealt *= typestrength; icon='strong';}

  let critChance = 0 
  const integerPart = Math.floor(playerCritChance);
  const extraValue = integerPart + (Math.random() < (playerCritChance - integerPart) ? 1 : 0);
  critChance += extraValue;
  if (critChance>1) stats.criticalHitsDealt++
  damageDealt *= critChance

  if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) damageDealt=0
  
  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautify(damageDealt)+critMark(critChance-1), 'damageText', '#21b42d', icon, "enemyPanel");
  if (!settings.disableDamageLog) logPrint( enemies[stats.currentEnemy].name + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Nature Damage");
    
  if (damageDealt === 69) logs.L1P4.unlocked = true;
  if (damageDealt > 999) logs.P35.unlocked = true;
  if (damageDealt > 99999) logs.P35A.unlocked = true;
  if (damageDealt > 999999) logs.P35B.unlocked = true;
}

function enemyMightDamage(damage, type){
  let damageDealt = (damage + additiveMightDamage) * multiplicativeMightDamage;
  if (type==="noScale") damageDealt = damage
  if (type==="skillDmg") damageDealt = damage * multiplicativeMightDamage
  damageDealt *= enemyDefenseMultiplier
  let icon;
  if (enemies[stats.currentEnemy].align === 'nature') {damageDealt *= typeResist; icon='weak';}
  if (enemies[stats.currentEnemy].align === 'elemental') {damageDealt *= typestrength; icon='strong';}

  let critChance = 0 
  const integerPart = Math.floor(playerCritChance);
  const extraValue = integerPart + (Math.random() < (playerCritChance - integerPart) ? 1 : 0);
  critChance += extraValue;
  if (critChance>1) stats.criticalHitsDealt++
  damageDealt *= critChance

  if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) damageDealt=0
  
  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautify(damageDealt)+critMark(critChance-1), 'damageText', '#217eb4', icon, "enemyPanel");
  if (!settings.disableDamageLog) logPrint( enemies[stats.currentEnemy].name + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Might Damage");

    
  if (damageDealt === 69) logs.L1P4.unlocked = true;
  if (damageDealt > 999) logs.P35.unlocked = true;
  if (damageDealt > 99999) logs.P35A.unlocked = true;
  if (damageDealt > 999999) logs.P35B.unlocked = true;

  if(stats.currentEnemy==="E12" && enemyPhase === 1){ castTerragosa3()}

}

function enemyElementalDamage(damage, type){
  let damageDealt = (damage + additiveElementalDamage) * multiplicativeElementalDamage;
  if (type==="noScale") damageDealt = damage
  if (type==="skillDmg") damageDealt = damage * multiplicativeElementalDamage
  damageDealt *= enemyDefenseMultiplier
  let icon;
  if (enemies[stats.currentEnemy].align === 'might') {damageDealt *= typeResist; icon='weak';}
  if (enemies[stats.currentEnemy].align === 'nature') {damageDealt *= typestrength; icon='strong';}

  let critChance = 0 
  const integerPart = Math.floor(playerCritChance);
  const extraValue = integerPart + (Math.random() < (playerCritChance - integerPart) ? 1 : 0);
  critChance += extraValue;
  if (critChance>1) stats.criticalHitsDealt++
  damageDealt *= critChance

  if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) damageDealt=0
  
  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautify(damageDealt)+critMark(critChance-1), 'damageText', '#f35933', icon, "enemyPanel");
  if (!settings.disableDamageLog) logPrint( enemies[stats.currentEnemy].name + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Elemental Damage");

    
  if (damageDealt === 69) logs.L1P4.unlocked = true;
  if (damageDealt > 999) logs.P35.unlocked = true;
  if (damageDealt > 99999) logs.P35A.unlocked = true;
  if (damageDealt > 999999) logs.P35B.unlocked = true;

  if(stats.currentEnemy==="E10"){ castCubomite()}

  

}

function enemyOccultDamage(damage, type){
  let damageDealt = (damage + additiveOccultDamage) * multiplicativeOccultDamage;
  if (type==="noScale") damageDealt = damage
  if (type==="skillDmg") damageDealt = damage * multiplicativeOccultDamage
  damageDealt *= enemyDefenseMultiplier
  let icon;
  if (enemies[stats.currentEnemy].align === 'deific') {damageDealt *= typestrength; icon='strong';}

  let critChance = 0 
  const integerPart = Math.floor(playerCritChance);
  const extraValue = integerPart + (Math.random() < (playerCritChance - integerPart) ? 1 : 0);
  critChance += extraValue;
  if (critChance>1) stats.criticalHitsDealt++
  damageDealt *= critChance

  if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) damageDealt=0

  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautify(damageDealt)+critMark(critChance-1), 'damageText', '#a936d6', icon, "enemyPanel");
  if (!settings.disableDamageLog) logPrint( enemies[stats.currentEnemy].name + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Occult Damage");

    
  if (damageDealt === 69) logs.L1P4.unlocked = true;
  if (damageDealt > 999) logs.P35.unlocked = true;
  if (damageDealt > 99999) logs.P35A.unlocked = true;
  if (damageDealt > 999999) logs.P35B.unlocked = true;
}

function enemyDeificDamage(damage, type){
  let damageDealt = (damage + additiveDeificDamage) * multiplicativeDeificDamage;
  if (type==="noScale") damageDealt = damage
  if (type==="skillDmg") damageDealt = damage * multiplicativeDeificDamage
  damageDealt *= enemyDefenseMultiplier
  let icon;
  if (enemies[stats.currentEnemy].align === 'occult') {damageDealt *= typestrength; icon='strong';}

  let critChance = 0 
  const integerPart = Math.floor(playerCritChance);
  const extraValue = integerPart + (Math.random() < (playerCritChance - integerPart) ? 1 : 0);
  critChance += extraValue;
  if (critChance>1) stats.criticalHitsDealt++
  damageDealt *= critChance

  if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) damageDealt=0

  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautify(damageDealt)+critMark(critChance-1), 'damageText', '#ec9900', icon, "enemyPanel");
  if (!settings.disableDamageLog) logPrint( enemies[stats.currentEnemy].name + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Deific Damage");

    
  if (damageDealt === 69) logs.L1P4.unlocked = true;
  if (damageDealt > 999) logs.P35.unlocked = true;
  if (damageDealt > 99999) logs.P35A.unlocked = true;
  if (damageDealt > 999999) logs.P35B.unlocked = true;
}

function enemyBasicDamage(damage){
  let damageDealt = damage
  let icon;
  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautify(damageDealt), 'damageText', '#818181', icon, "enemyPanel");
  if (!settings.disableDamageLog) logPrint( enemies[stats.currentEnemy].name + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Damage");
}

function enemyHealingDamage(healing){
  playSound("audio/heal.mp3")
  let healingDealt = healing
  currentHP += healingDealt;
  if (currentHP > enemies[stats.currentEnemy].hp) currentHP = enemies[stats.currentEnemy].hp //prevents overhealing
  enemyUpdate();
  damageText(beautify(healingDealt), 'damageText', '#61b600', 'heal', "enemyPanel");
  if (!settings.disableDamageLog) logPrint( enemies[stats.currentEnemy].name + " heals for <FONT COLOR='#e8643c'>" + Math.round(healingDealt) + " HP");
}



function playerNatureDamage(damage){
  let icon;
  let damageDealt = damage;
  if (rpgPlayer.align === 'elemental') {damageDealt *= typeResist; icon='weak';}
  if (playerShield<=0) rpgPlayer.hp -= damageDealt;
  else { 
    playerShield-=damageDealt
    icon='shield';
  }
  playerUpdate();
  damageText(beautify(damageDealt), 'damageText', '#21b42d', icon, "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Nature Damage");
}

function playerMightDamage(damage){
  let damageDealt = damage;
  let icon;
  if (rpgPlayer.align === 'nature') {damageDealt *= typeResist; icon='weak';}
  if (playerShield<=0) rpgPlayer.hp -= damageDealt;
  else { 
    playerShield-=damageDealt
    icon='shield';
  }
  playerUpdate();
  damageText(beautify(damageDealt), 'damageText', '#217eb4', icon, "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Might Damage");
}

function playerElementalDamage(damage){
  let damageDealt = damage;
  let icon;
  if (rpgPlayer.align === 'might') {damageDealt *= typeResist; icon='weak';}
  if (playerShield<=0) rpgPlayer.hp -= damageDealt;
  else { 
    playerShield-=damageDealt
    icon='shield';
  }
  playerUpdate();
  damageText(beautify(damageDealt), 'damageText', '#f35933', icon, "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Elemental Damage");
}

function playerOccultDamage(damage){
  let damageDealt = damage;
  let icon;
  if (rpgPlayer.align ===  'occult') {damageDealt *= typeResist; icon='weak';}
  if (playerShield<=0) rpgPlayer.hp -= damageDealt;
  else { 
    playerShield-=damageDealt
    icon='shield';
  }
  playerUpdate();
  damageText(beautify(damageDealt), 'damageText', '#a936d6', icon, "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Occult Damage");
}

function playerDeificDamage(damage){
  let damageDealt = damage;
  let icon;
  if (rpgPlayer.align ===  'deific') {damageDealt *= typeResist; icon='weak';}
  if (playerShield<=0) rpgPlayer.hp -= damageDealt;
  else { 
    playerShield-=damageDealt
    icon='shield';
  }
  playerUpdate();
  damageText(beautify(damageDealt), 'damageText', '#ec9900', icon, "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Deific Damage");
}

function playerHealingDamage(healing){
  playSound("audio/heal.mp3")
  let healingDealt = healing
  rpgPlayer.hp += healingDealt;
  if (rpgPlayer.hp > playerMaxHp) rpgPlayer.hp = playerMaxHp //prevents overhealing
  playerUpdate();
  damageText(beautify(healingDealt), 'damageText', '#61b600', 'heal', "playerPanel");
  if (!settings.disableDamageLog) logPrint( stats.turtleName + " heals for <FONT COLOR='#e8643c'>" + Math.round(healingDealt) + " HP");
}

//#endregion
//----------------------==========================-----------------------
//----------------------==========ANIMATIONS======-----------------------
//----------------------==========================-----------------------
//#region Animations


function animParticleProjectile(img, throwAnimation, particleCount, particleType, huerotation) { //projectile with following particles
  //create projectile
  const projectile = document.createElement("div");
  projectile.id = projectile + "projectile";
  projectile.className = "itemThrow";
  did("playerPanel").appendChild(projectile);
  projectile.style.backgroundImage = "url(img/src/projectiles/" + img + ".png)";

  let type = throwAnimation;
  if (type === "throw") { projectile.style.animation = "sexyY 0.8s infinite ease-in-out, sexyX 0.8s infinite ease-in-out, itemThrowRotate 0.8s infinite ease-out";   setTimeout(function () { projectile.remove(); }, 800);}
  if (type === "reverseThrow") { projectile.style.animation = "sexyY 0.8s infinite ease-in-out, sexyX 0.8s infinite ease-in-out, itemThrowRotate 0.8s infinite ease-out"; projectile.style.animationDirection = "reverse";   setTimeout(function () { projectile.remove(); }, 800);}
  if (type === "throwArrow") { projectile.style.animation = "sexyY 0.6s infinite ease-in-out, sexyX 0.6s infinite ease-in-out, itemThrowArrow 0.6s infinite ease-out";   setTimeout(function () { projectile.remove(); }, 600);}
  if (type === "rain") { projectile.style.animation = "itemRain 0.8s 1 ease-in-out"; projectile.style.margin = rng(30,90)+"%" ; setTimeout(function () { projectile.remove(); }, 750);}
//projectile.style.translate = "0 "+rng(-80,300)+"%"
  //particle count
  if (stats.currentCategory === "rpgContainer" && !settings.disableParticles) {
  for (let i = 0; i < particleCount; i++) {
    setTimeout(particle, 70 * i);
  }
  }
  //spawn particle
  function particle() {
    const particle = document.createElement("div");
    particle.className = "throwParticle";
    particle.style.filter = "hue-rotate("+huerotation+"deg)"
    did("playerPanel").appendChild(particle);
    particle.style.animation = particleType + " 2s 1 ease";
    setTimeout(function () {
      particle.remove();
    }, 1000);

    //sets the particle position to the projectile with some randomness
    const projectileLeft = projectile.offsetLeft;
    const projectileTop = projectile.offsetTop;
    const randomOffsetX = Math.random() * 50 - 0;
    const randomOffsetY = Math.random() * 50 - 0;
    const particleLeft = projectileLeft + randomOffsetX;
    const particleTop = projectileTop + randomOffsetY;
    particle.style.left = particleLeft + "px";
    particle.style.top = particleTop + "px";
  }
}

function animState(target, animation){ //animation of either player or enemy
  did(target).style.animation = "";
  void did(target).offsetWidth;
  did(target).style.animation = animation;
}

function animParticleBurst(particleCount, particleType, target, huerotation, isBoss) { //burst of particles on player
  //particle count
  if (!settings.disableParticles) {
  for (let i = 0; i < particleCount; i++) {
    setTimeout(particle, 50 * i);
  }
  }
  //spawn particle
  function particle() {
    const particle = document.createElement("div");
    particle.className = "throwParticle";
    

    if (target!=="cursor") {

      did(target).appendChild(particle);

    //sets the particle position to the projectile with some randomness
    const div2 = did(target);
    const maxWidthPercentage = 100 - (20 / div2.clientWidth) * 100; // 20 es el ancho del div1
    const maxHeightPercentage = 100 - (20 / div2.clientHeight) * 100; // 20 es el alto del div1
    let randomXPercentage = Math.random() * maxWidthPercentage;
    const randomYPercentage = Math.random() * maxHeightPercentage;
    if (isBoss==='boss') {randomXPercentage += 60;}
    particle.style.left = randomXPercentage + "%";
    particle.style.top = randomYPercentage + "%";
    }
     
    if (target==="cursor"){
      document.body.appendChild(particle);
      particle.style.left = (rightClickX) +-20+ rng(-40,40) + 'px';
      particle.style.top = (rightClickY ) +-20+ rng(-40,40) +  'px';
      
    }




    particle.style.filter = "hue-rotate("+huerotation+"deg)"
    particle.style.animation = particleType + " 2s 1 ease";
    setTimeout(function () {
      particle.remove();
    }, 1000);



  }
}

function animImageSplash(image, target, animation, huerotation, seconds, isBoss){ //image on top of a target

  const projectile = document.createElement("img");
  projectile.id = projectile + "projectile";
  projectile.className = "imageSplash";

  if (isBoss==='boss') projectile.style.left += '40%'

  did(target).appendChild(projectile);
  projectile.src = "img/src/projectiles/" + image + ".png";
  
    
  if (animation === "impact") { projectile.style.animation = "gelatineImpact 1.1s 1"; setTimeout(function () { projectile.remove(); }, 1000); }
  if (animation === "downwards") { projectile.style.animation = "gelatineDownwards 1.1s 1"; setTimeout(function () { projectile.remove(); }, 1000); }
  if (animation === "explosion") { projectile.style.animation = "gelatineImpact 400ms 1"; setTimeout(function () { projectile.remove(); }, 300); }
  if (animation === "hold") { projectile.style.animation = "gelatineHold 6s infinite"; setTimeout(function () { projectile.remove(); }, seconds*1000); }
  if (animation === "spin") { projectile.style.animation = "skillSpin 2.5s ease-out"; setTimeout(function () { projectile.remove(); }, 2400); }
  if (animation === "sway") { projectile.style.animation = "skillSway 1.9s 1"; setTimeout(function () { projectile.remove(); }, 1800); }
  if (animation === "float") { projectile.style.animation = "skillFloat 1.5s 1"; setTimeout(function () { projectile.remove(); }, 1400); }
  if (animation === "holdFloat") { projectile.style.animation = "gelatineHoldFloat 6s infinite"; setTimeout(function () { projectile.remove(); }, seconds*1000); }
  if (animation === "wave") { projectile.style.animation = "skillWave 0.7s 1"; setTimeout(function () { projectile.remove(); }, 600); }
  if (animation === "rotate") { projectile.style.animation = "gelatineRotate 1.6s ease-out 1"; setTimeout(function () { projectile.remove(); }, 1500); }

  projectile.style.filter += " hue-rotate("+huerotation+"deg)"

  

}

function damageText(number, type, color, icon, target) {
  if (stats.currentCategory === "rpgContainer" && !settings.disableDamageNumbers) {
  const damageT = document.createElement("div");
  damageT.className = type;
  did(target).appendChild(damageT);
  let iconvar = icon
  if (iconvar !== undefined) damageT.innerHTML = number+'</div><img class="damageText'+icon+'" src=img/src/icons/'+icon+'.png>';
  else damageT.innerHTML = number;
  damageT.style.color = color
  setTimeout(function () { damageT.remove();}, 1400);
  //sets the particle position to the projectile with some randomness
  const div2 = did(target);
  const maxWidthPercentage = 100 - 20 / div2.clientWidth;
  const maxHeightPercentage = 100 - 20 / div2.clientHeight;
  const randomXPercentage = Math.random() * maxWidthPercentage;
  const randomYPercentage = Math.random() * maxHeightPercentage;
  damageT.style.left = randomXPercentage + "%";
  damageT.style.top = randomYPercentage + "%";
  }
}

function statusParticle(particleType,huerotation, target) { //spawns one particle, used for status Particle Check below
  //spawn particle
  function particle() {
    const particle = document.createElement("div");
    particle.className = "throwParticle";
    particle.style.filter = "hue-rotate("+huerotation+"deg)"
    let targetLet = target;
    if (targetLet === "player") {
      did("playerPanel").appendChild(particle);
    } else did("enemyPanel").appendChild(particle);
    particle.style.animation = particleType + " 2s 1 ease";
    setTimeout(function () {
      particle.remove();
    }, 1000);
    //sets the particle position to the projectile with some randomness
    let div2 = did("enemyAnimation");
    if (targetLet === "player") {
      div2 = did("rpgPlayerImg");
    }

    
    const maxWidthPercentage = 100 - (20 / div2.clientWidth) * 100; // 20 es el ancho del div1
    const maxHeightPercentage = 100 - (20 / div2.clientHeight) * 100; // 20 es el alto del div1
    const randomXPercentage = Math.random() * maxWidthPercentage;
    const randomYPercentage = Math.random() * maxHeightPercentage;
    particle.style.left = randomXPercentage + "%";
    particle.style.top = randomYPercentage + "%";


    if (targetLet === "boss") {
      particle.style.left = randomXPercentage + 70 + "%";
    }

  }
  particle();
}

setInterval(function () { if (stats.currentCategory === "rpgContainer") { statusParticleCheck(); } }, 800);
function statusParticleCheck() { //checks if buffs is active, and asigns status Particle
  //if (buffs.B1.active===1) {statusParticle('particleHealth');}
  if (!settings.disableParticles){
  if (currentSet==="captain") statusParticle("particleLight",70, "player");
  if (stats.currentEnemy==="E8" && enemyPhase===2){ statusParticle("particleFire",330, "boss"); setTimeout(() => {statusParticle("particleFire",330, "boss")}, 400); };
  if (stats.currentEnemy==="E18" && enemyPhase===2){ statusParticle("particleGlow2",130); setTimeout(() => {statusParticle("particleGlow2",130)}, 400); };
  
}
}
//#endregion
//----------------------==========================-----------------------
//----------------------===========ITEMS==========-----------------------
//----------------------==========================-----------------------
//#region Items
function dropItem(ID) { //dedicated drop rolls
//this code manages the extra percentage of drop chance and adds it to how many drop you can get
  let itemdrop = 0 
  const integerPart = Math.floor(multiplicativeDropChance);
  const extraValue = integerPart + (Math.random() < (multiplicativeDropChance - integerPart) ? 1 : 0);
  itemdrop += extraValue;
  if  ((enemies[stats.currentEnemy].difficulty==="ore" || enemies[stats.currentEnemy].difficulty==="herb")){
    itemdrop += playerGatheringLevel - enemies[stats.currentEnemy].gatheringLevel
  }
  items[ID].count += itemdrop;
  addItem()
}

function rollTable(table, rolls) { //droptable rolls

if (enemies.E4.killCount>0) materialStage = 2
if (enemies.E8.killCount>0) materialStage = 4
if (enemies.E12.killCount>0) materialStage = 7
if (enemies.E27.killCount>0) materialStage = 10


if (enemies.E8.killCount>0) { materialTable1.I114.P = 15; materialTable1.I115.P = 15; materialTable1.I25.P = 15; materialTable1.I38.P = 15; }
if (enemies.E12.killCount>0) { materialTable2.I16.P = 15; materialTable2.I29.P = 15; materialTable2.I17.P = 15; materialTable2.I36.P = 15; }
if (enemies.E27.killCount>0) { materialTable2.I40.P = 15; materialTable2.I58.P = 15; materialTable2.I18.P = 15; }

  function getRandomInt(max) { //rewrite with the rng
    return Math.floor(Math.random() * max);
  }

  for (let i = 0; i < rolls; i++) {
    for (let dt in table) {
      let rngroll = getRandomInt(table[dt].P);
      if (rngroll === table[dt].P - 1) {
        //because the die can land on 0, substract 1 to make for it
        rollcount = eval(table[dt].A)
        items[dt].count += rollcount;
        if ("R" in table[dt]){ //dynamic price adjuster

          if (table[dt].R === "high") items[dt].sell = Math.max(1000, stats.totalCoins*0.1)
          if (table[dt].R === "medium") items[dt].sell = Math.max(1000, stats.totalCoins*0.05)
          if (table[dt].R === "low") items[dt].sell = Math.max(1000, stats.totalCoins*0.02)

          
        }
        if (!settings.disableDropsLog) logPrint("<FONT COLOR='#8fba77'>You obtain " + items[dt].name + " x"+rollcount+"!");
      }
    }
  }

  if (rng(1,777777)===1) {
    items.I102.count++
  }

  addItem()
}

setInterval(itemCooldownTick, 1000);
function itemCooldownTick(ID, time) { //removes one second from the cd of every single item
  for (let i in items) {
    if (items[i].cd > 0 && did(items[i].id + "item")) { //if its on CD
      items[i].cd--;
      did(items[i].id + "item").style.filter = "brightness(0.4)";
    }
    if (items[i].cd === 0 && did(items[i].id + "item")) { //if its not anymore
      did(items[i].id + "item").style.filter = "brightness(1)";
    }
  }
}


window.addEventListener('DOMContentLoaded', () => { // inventory culling 
  const contenedor = document.getElementById('inventory');
  
  contenedor.addEventListener('scroll', () => {
    const alturaContenedor = contenedor.clientHeight;
    const alturaViewport = window.innerHeight;
    const porcentajeVisible = (alturaViewport / alturaContenedor) * 100;

    const items = contenedor.querySelectorAll('.itemSlot');
    items.forEach(item => {
      const posicionItem = item.getBoundingClientRect().top;
      if (posicionItem > alturaViewport * 0.95 || posicionItem < -item.clientHeight) {
        item.style.visibility = "hidden";
      } else {
        item.style.visibility = "visible";
      }
    });
  });
});

stats.recipesLearnt = 0;

function addItem() { //updates inventory items
  for (let i in items) {
    if (items[i].count >= 1) {
      if (!did(items[i].id + "item") && currentSort==="all" || !did(items[i].id + "item") && items[i].sort===currentSort) {  //if it doesnt exist yet create it
        const itemdiv = document.createElement("div");
        itemdiv.id = items[i].id + "item";
        if (items[i].max === 1)
          itemdiv.innerHTML = '<img id="'+i+'ItemImage"  src = "img/src/items/' + items[i].img + '.jpg">';
        else //if its not singular, add counter
          itemdiv.innerHTML = '<img id="'+i+'ItemImage" src = "img/src/items/' + items[i].img + '.jpg"> <div class="itemCount" id="' + items[i].id + "itemCount" + '">' + items[i].count + "</div>";
          
        itemdiv.className = "itemSlot";

        did("inventory").appendChild(itemdiv);
        itemdiv.style.border = returnQualityColor(items[i].quality) + " solid 1px";

        tooltipItems(items[i]);

        if ("use" in items[i]) itemUse(items[i].id, function () { eval(items[i].use); }); //assigns use function

        if ("collectible" in items[i]) itemUse(items[i].id, function () { 
          if (items[i].statUp!=="got") {
            playSound("audio/retro2.mp3");
            animParticleBurst(5 , "particleSpark", "cursor", 0);
            createFloatingText("<p>Collected!")
            items[i].statUp="got";
            if (items[i].collectible.startsWith("M")){ miningCollectiblesGot++ } 
            if (items[i].collectible.startsWith("F")) { fishingCollectiblesGot++ }
            if (items[i].collectible.startsWith("R")) {  relicsCollectiblesGot++ }
            if (items[i].collectible.startsWith("B")) { foragingCollectiblesGot++ }
            createCatalogue();
            statsUpdate();
            updateStatsUI();
            items[i].count--;
            addItem();
          }
         });

         if (i.startsWith("R")) itemUse(items[i].id, function () { //recipe behaviour
          let recipe = i.slice(1)
          playSound("audio/page.mp3");
          stats.recipesLearnt++;
          animParticleBurst(5 , "particleSpark", "cursor", 0);
          createFloatingText("<p>Learned!");
          recipes[recipe].unlocked = true;
          items[i].count--;
          addItem();
         });

    
         if (did("debugPanel").style.display === "flex") {//debug upgrader
          document.addEventListener('keydown', function(event) { 
              if (document.getElementById("tooltipName").innerHTML.includes(items[i].name)) {
                if (event.key === 'o')  items[i].count--;
                if (event.key === 'p')  items[i].count++;
                 
                  addItem();
              }
          });
        }

        if ("touch" in items[i]){
          itemdiv.addEventListener('click', function(event) { 
            eval(items[i].touch)
            
        });
        }

        if (!items[i].gotOnce) items[i].gotOnce = true;

        sellItem(i);
      }
    }

    if (did(items[i].id + "item")) {  //if it exists limit and update ammount
      if (items[i].max < items[i].count) items[i].count = items[i].max;

      if (items[i].upgradeable && did(items[i].id + "itemCount")) did(items[i].id + "itemCount").innerHTML = returnQualityColor(items[i].count.toString())
      if ((items[i].max !== 1 && !items[i].upgradeable) || i === "I281") did(items[i].id + "itemCount").innerHTML = beautify(items[i].count);

    }

    if (items[i].count < 0) items[i].count = 0; //failsafe for negative items

    if (did(items[i].id + "item") && items[i].count <= 0) { //remove if count 0 and exists
      did(items[i].id + "item").remove();
    }

    
    if (items[i].upgradeable && ( rpgPlayer.weaponSlot === i || rpgPlayer.headSlot === i || rpgPlayer.chestSlot === i || rpgPlayer.legsSlot === i || rpgPlayer.handsSlot === i || rpgPlayer.feetSlot === i || rpgPlayer.ringSlot === i || rpgPlayer.trinketSlot === i ) ) {
      eval(items[i].stats)
      statsUpdate()
      updateStatsUI()
    }
    


  }
}



function removeTableItem() {

  if (items.RSN8.gotOnce) smallCache.RSN8.P = 0;
  if (items.REN5.gotOnce) smallCache.REN5.P = 0;

  if (items.RSN9.gotOnce) reinforcedChest.RSN9.P = 0;
  if (items.REN8.gotOnce) reinforcedChest.REN8.P = 0;

  if (items.BR7.gotOnce) coolCooler.BR7.P = 0;

  if (items.I286.gotOnce) fishingEeriePond2.I286.P = 0;

}

function itemUse(id, effect) { //right click functionality of items
  did(id + "item").addEventListener("contextmenu", function () {


    if (rpgClass[stats.currentClass].level>=items[id].levelRequirement) {

    if ("cd" in items[id]) {
      if (items[id].cd > 0 && !sellMode) {
        playSound("audio/thud.mp3")
        did(id + "item").style.animation = "";
        void did(id + "item").offsetWidth;
        did(id + "item").style.animation = "noBuyAnimation 0.2s 1";
      }
      if (items[id].cd === 0 && !sellMode) {
        playSound("audio/use.mp3")
        did(id + "item").style.animation = "";
        void did(id + "item").offsetWidth;
        did(id + "item").style.animation = "levelUp 0.1s 1";
        effect();
        if(items[id].count<1) resetTooltip()
      }

    } else if (!sellMode) {
      playSound("audio/use.mp3")
      did(id + "item").style.animation = "";
      void did(id + "item").offsetWidth;
      did(id + "item").style.animation = "levelUp 0.1s 1";
      effect();
      if(items[id].count<1) resetTooltip()
    }

  } else {
    playSound("audio/thud.mp3")
    did(id + "item").style.animation = "";
    void did(id + "item").offsetWidth;
    did(id + "item").style.animation = "noBuyAnimation 0.2s 1";
  }


  upgradesReveal();
  addItem()

  });
}

stats.soldItems = 0;
function sellItem(id) {
  did(id + "item").addEventListener("click", function () { //sell once

    if (sellMode && items[id].sell !== 0 && !items[id].upgradeable) {
    if (rpgPlayer.headSlot!==id && rpgPlayer.chestSlot!==id && rpgPlayer.handsSlot!==id && rpgPlayer.weaponSlot!==id && rpgPlayer.ringSlot!==id && rpgPlayer.legsSlot!==id && rpgPlayer.trinketSlot!==id && rpgPlayer.feetSlot!==id) { //if the item is not equiped
      playSound("audio/heal.mp3");
      if (id==="I119") logs.P26.unlocked=true
      items[id].count--;
      rpgPlayer.coins += items[id].sell*multiplicativeSellValue;
      if (!("collectible" in items[id])) stats.totalCoins += items[id].sell*multiplicativeSellValue;
      stats.soldItems++;
      removeStamps(id);
      updateCounters();
      addItem();
      if (items[id].count<1) resetTooltip();
    }
    } else if (sellMode && items[id].sell !== 0 && items[id].upgradeable) { //if its an upgradeable item
      if (rpgPlayer.headSlot!==id && rpgPlayer.chestSlot!==id && rpgPlayer.handsSlot!==id && rpgPlayer.weaponSlot!==id && rpgPlayer.ringSlot!==id && rpgPlayer.legsSlot!==id && rpgPlayer.trinketSlot!==id && rpgPlayer.feetSlot!==id) { //if the item is not equiped
        playSound("audio/heal.mp3"); 
      rpgPlayer.coins += (items[id].sell*multiplicativeSellValue) * items[id].count ;
      if (!("collectible" in items[id])) stats.totalCoins += (items[id].sell*multiplicativeSellValue) * items[id].count ;
      stats.soldItems += items[id].count;
      items[id].count = 0;
      removeStamps(id)
      updateCounters();
      addItem();
      resetTooltip();
      }
    }



  });

  did(id + "item").addEventListener("contextmenu", function () { //sell all
    if (sellMode && items[id].sell !== 0) {
      playSound("audio/heal.mp3"); 
      if (id==="I119") logs.P26.unlocked=true
      rpgPlayer.coins += (items[id].sell*multiplicativeSellValue) * items[id].count ;
      if (!("collectible" in items[id])) stats.totalCoins += (items[id].sell*multiplicativeSellValue) * items[id].count ;
      stats.soldItems += items[id].count;
      items[id].count = 0;
      removeStamps(id)
      updateCounters();
      addItem();
      resetTooltip();
    }
  });
}

function removeStamps(id){

if ("stamp1" in items[id]) delete items[id].stamp1;
if ("stamp2" in items[id]) delete items[id].stamp2;
if ("stamp3" in items[id]) delete items[id].stamp3;


}

//#endregion
//----------------------==========================-----------------------
//----------------------===========DEBUG==========-----------------------
//----------------------==========================-----------------------
//#region Debug
function levelUp(amount) { //gives levels
  for (let i = 0; i < amount; i++) {
    rpgClass[stats.currentClass].currentExp = rpgClass[stats.currentClass].nextExp;
    expBar();
    statsUpdate();
    updateStatsUI();
  }
}

function revive() { //used for debug
  rpgPlayer.hp = playerMaxHp;
  hpRegen();
}

function unlockAll(){
  for (i in recipes) recipes[i].unlocked = true;
  for (i in jobs) jobs[i].level = 999;
  for (i in unlocks) unlocks[i] = true;
  for (i in areas) {
    if ('unlockedOre' in  areas[i]) areas[i].unlockedOre = 1;
    if ('unlockedHerb' in  areas[i]) areas[i].unlockedHerb = 1;
    if ('unlockedPond' in  areas[i]) areas[i].unlockedPond = 1;
  }
  for (i in items) items[i].count = 10000000;
  for (var i in buildings) { buildings[i].unlocked = true;}

}
  


var woodenStamps = ["nature1", "nature2", "might1", "might2", "elemental1", "elemental2", "occult1", "occult2", "deific1", "deific2"]
var ironStamps = ["nature1", "nature2", "nature3", "might1", "might2", "might3", "elemental1", "elemental2", "elemental3", "occult1", "occult2", "occult3", "deific1", "deific2", "deific3", "crit1"]
var goldStamps = ["nature2", "nature3", "might2", "might3", "elemental2", "elemental3","occult2", "occult3", "deific2", "deific3", "crit1", "crit2"]

function stampWeapon(tier){

  if (tier === "wood") {
  items[rpgPlayer.weaponSlot].stamp1 = woodenStamps[rng(0,(woodenStamps.length-1))]
  delete items[rpgPlayer.weaponSlot].stamp2
  delete items[rpgPlayer.weaponSlot].stamp3
  if (rng(1,15) === 1) { items[rpgPlayer.weaponSlot].stamp2 = woodenStamps[rng(0,(woodenStamps.length-1))]
  if (rng(1,15) === 1) items[rpgPlayer.weaponSlot].stamp3 = woodenStamps[rng(0,(woodenStamps.length-1))] }
  }

  if (tier === "iron") {
  items[rpgPlayer.weaponSlot].stamp1 = ironStamps[rng(0,(ironStamps.length-1))]
  items[rpgPlayer.weaponSlot].stamp2 = ironStamps[rng(0,(ironStamps.length-1))]
  delete items[rpgPlayer.weaponSlot].stamp3
  if (rng(1,15) === 1) items[rpgPlayer.weaponSlot].stamp3 = ironStamps[rng(0,(ironStamps.length-1))]
  }

  if (tier === "gold") {
  items[rpgPlayer.weaponSlot].stamp1 = goldStamps[rng(0,(goldStamps.length-1))]
  items[rpgPlayer.weaponSlot].stamp2 = goldStamps[rng(0,(goldStamps.length-1))]
  items[rpgPlayer.weaponSlot].stamp3 = goldStamps[rng(0,(goldStamps.length-1))]
  } 

  playSound("audio/stamp.mp3");
  stampStatUp()

}



function stampStatUp(){

  natureStampStatUp = 1;
  mightStampStatUp = 1;
  elementalStampStatUp = 1;
  occultStampStatUp = 1;
  deificStampStatUp = 1;
  critStampStatUp = 1;
  multihitStampStatUp = 1;

  const natureValues = { "nature1": 0.1, "nature2": 0.2, "nature3": 0.3 };
  const mightValues = { "might1": 0.1, "might2": 0.2, "might3": 0.3 };
  const elementalValues = { "elemental1": 0.1, "elemental2": 0.2, "elemental3": 0.3 };
  const occultValues = { "occult1": 0.1, "occult2": 0.2, "occult3": 0.3 };
  const deificValues = { "deific1": 0.1, "deific2": 0.2, "deific3": 0.3 };
  const critValues = { "crit1": 0.1, "crit2": 0.2, "crit3": 0.3 };

  if (rpgPlayer.weaponSlot!=="none") {
  
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; natureStampStatUp += natureValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; mightStampStatUp += mightValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; elementalStampStatUp += elementalValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; occultStampStatUp += occultValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; deificStampStatUp += deificValues[stamp] || 0; }
  for (let i = 1; i <= 3; i++) { const stamp = items[rpgPlayer.weaponSlot][`stamp${i}`]; critStampStatUp += critValues[stamp] || 0; }


}



  statsUpdate()
  updateStatsUI()
}

//#endregion
//----------------------==========================-----------------------
//----------------------===========AREAS==========-----------------------
//----------------------==========================-----------------------
//#region Areas

function createAreaPanel() {
  for (let a in areas) {
    if (!did(a + "area")) {
      const areadiv = document.createElement("div");
      areadiv.id = a + "area";
      areadiv.innerHTML = '<div class="areaPanel2"> <p class="areaPanelName">' + areas[a].name + '</p> <p class="areaPanelLevel" id="' + a + 'areal">lvl ' + areas[a].level + '</p></div>';

      if (!areas[a].dungeon) {
      areadiv.className = "areaPanel";
      did("areaTab").appendChild(areadiv);
    }
      if (areas[a].dungeon) {
        areadiv.className = "dungeonPanel";
        did("dungeonTab").appendChild(areadiv);
      }

      
      areaButton(a);
      tooltipAreas(a);
    }

    if (rpgClass[stats.currentClass].level >= areas[a].level ) did(a + "areal").style.background = "#58B86C";



  }
};

function areaButton(id) {
  if (did(id + "area")) {
    did(id + "area").addEventListener("click", function () {
      if (stats.currentArea !== id) { // if its not already on the area

        if (!areas[id].dungeon  && rpgClass[stats.currentClass].level>=areas[id].level){
        playSound("audio/button3.mp3")
        stats.currentArea = id;
        resetAreaButtonClass();
        stats.currentDifficulty = "easy";
        switchArea();
        encounterButtonPress();
        did("rpgCanvas").style.animation = "";
        void did("rpgCanvas").offsetWidth;
        did("rpgCanvas").style.animation = "rpgFade 1s 1";
        bossTime = false;
        specialButtonUi();
        deleteEnemy();
      }

      if (areas[id].dungeon && (areas[id].dungeonTimer<=0 || items.I174.count>0)){ //dungeon voucher

        if (areas[id].dungeonTimer>0) items.I174.count--;

        addItem();
        playSound("audio/button3.mp3");
        stats.currentArea = id;
        resetAreaButtonClass();
        stats.currentDifficulty = "easy";
        switchArea();
        encounterButtonPress();
        did("rpgCanvas").style.animation = "";
        void did("rpgCanvas").offsetWidth;
        did("rpgCanvas").style.animation = "rpgFade 1s 1";
        bossTime = false;
        specialButtonUi();
        deleteEnemy();
      }


      }
    });
  }

}

function resetAreaButtonClass() { //visual select of area button

  for (let a in areas) {
    did(a + "area").classList.replace(
      "areaPanelSelect",
      "areaPanel"
    );
  }
}

function switchArea() {
  did("rpgCanvas").style.backgroundImage = "url(img/src/areas/" + stats.currentArea + ".png)";
  did(stats.currentArea + "area").classList.replace( "areaPanel", "areaPanelSelect");

      dungeonPoints = 0;
      dungeonStage=0;
      updateDungeonPoints();

      enemyDamageMultiplier = 1;
      enemyDefenseMultiplier = 1;
    enemyPhase = 1;

      did("areaName").innerHTML = areas[stats.currentArea].name;
      did("areaLevel").innerHTML = "lvl " + areas[stats.currentArea].level;
      if (rpgClass[stats.currentClass].level < areas[stats.currentArea].level * 0.7) did("areaLevel").style.background = "#D85858";
      if (rpgClass[stats.currentClass].level >= areas[stats.currentArea].level * 0.7) did("areaLevel").style.background = "#CD984D";
      if (rpgClass[stats.currentClass].level >= areas[stats.currentArea].level) did("areaLevel").style.background = "#58B86C";
      did('questTab').innerHTML = "";
      did('shopListing').innerHTML = "";
      createShopItem()
      createQuest()
}
  
function specialButtonUi() { //shows or hides special buttons depending on zone

      if (areas[stats.currentArea].unlockedOre === 1) { did("miningNode").style.display = "flex";
      } else did("miningNode").style.display = "none";
      
      if (areas[stats.currentArea].unlockedHerb === 1) { did("herbNode").style.display = "flex";
      } else did("herbNode").style.display = "none";

      if (areas[stats.currentArea].unlockedPond === 1) { did("pondNode").style.display = "flex";
      } else did("pondNode").style.display = "none";

      if (!areas[stats.currentArea].dungeon) {
        did("encounterWrapper").style.display = "flex";
        dungeonTime = false;
        did("dungeonUI").style.display = "none";
        document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(1)");

      } else {
        did("encounterWrapper").style.display = "none";
        did("dungeonUI").style.display = "flex";
        dungeonTime = true;
        document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(0.5)");
      }

      if (stats.currentArea === "A7") {
        did("encounterWrapper").style.display = "none";
        did("enemyPanel").style.display = "none";
        did('shopButton').innerHTML = "Skirmish";
        did('questButton').innerHTML = "Showdown";
        did("honorSign").style.display = "flex";
        did("honorPilar").style.display = "flex";



      } else {
        did("honorSign").style.display = "none";
        did("honorPilar").style.display = "none";
        skirmishTime = false;
        showdownTime = false;
        showdownTimer=0;
        did("enemyPanel").style.display = "flex";
        did('shopButton').innerHTML = "Shop";
        did('questButton').innerHTML = "Quest";
        did("showdownUI").style.display = "none";
      }
}

did("bossButton").addEventListener("click", summonAreaBoss);

function summonAreaBoss(){
  if (items[areas[stats.currentArea].bossKey].count>0) {
    items[areas[stats.currentArea].bossKey].count--
    addItem();
    playSound("audio/button3.mp3")
    bossTime = true;
    deleteEnemy();
    resetTooltip();
    enemyUpdate();
  }
}

unlocks.autoBoss = false;
var togleAutoBoss = false

did("bossButton").addEventListener("contextmenu", function () { //right click to togle boss autokill
  if (unlocks.autoBoss) {

    playSound("audio/button2.mp3")


    if (togleAutoBoss) did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Press to summon the boss of this area<FONT COLOR="#D83063"<br><br>Requires ['+items[areas[stats.currentArea].bossKey].name+'] x1<br><span style="background:black; padding: 0 2%; border-radius: 0.6vh"><FONT COLOR="coral">Auto-summon is turned OFF</span><br><FONT COLOR="white">(Right Click to activate)';
    else did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Press to summon the boss of this area<FONT COLOR="#D83063"<br><br>Requires ['+items[areas[stats.currentArea].bossKey].name+'] x1<br><span style="background:black; padding: 0 2%; border-radius: 0.6vh"><FONT COLOR="#44bd6c">Auto-summon is turned ON</span><br><FONT COLOR="white">(Right Click to deactivate)';

    if (!togleAutoBoss) togleAutoBoss = true;
    else togleAutoBoss = false;


      }});

function difficultyButton(div, difficulty){
  did(div).addEventListener("click", function () {
    playSound("audio/button4.mp3")
    stats.currentDifficulty = difficulty;

    enemyDamageMultiplier = 1;
    enemyDefenseMultiplier = 1;
    enemyPhase = 1;
    

    bossTime = false;
    deleteEnemy();
    enemyUpdate();
    encounterButtonPress();
    
  });
}

difficultyButton("encounterEasy", "easy")
difficultyButton("encounterMedium", "medium")
difficultyButton("encounterHard", "hard")
difficultyButton("miningNode", "ore")
difficultyButton("herbNode", "herb")
difficultyButton("pondNode", "pond")

function encounterButtonPress() { //Ui states of special Buttons
  did("encounterEasy").style.boxShadow = "";
  did("encounterMedium").style.boxShadow = "";
  did("encounterHard").style.boxShadow = "";
  did("miningNode").style.boxShadow = "";
  did("herbNode").style.boxShadow = "";
  did("pondNode").style.boxShadow = "";

  if (stats.currentDifficulty === "easy") {
    did("encounterEasy").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (stats.currentDifficulty === "medium") {
    did("encounterMedium").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (stats.currentDifficulty === "hard") {
    did("encounterHard").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (stats.currentDifficulty === "ore") {
    did("miningNode").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (stats.currentDifficulty === "herb") {
    did("herbNode").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (stats.currentDifficulty === "pond") {
    did("pondNode").style.boxShadow = "inset white 0px 0px 5px 1px";
  }

}

settings.presentSwitch = false;
did("presentSwitch").addEventListener("click", function () {
  playSound("audio/button2.mp3")
  if (settings.presentSwitch){
    did("presentSwitch").style.borderColor = "coral";
    did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Toggle Mystery Present spawn<br><span style="background:black; padding: 0 2%; border-radius: 0.6vh"><FONT COLOR="coral">Presents CAN Currently Spawn</span><br><FONT COLOR="white">(Click to toggle)';

  } 
    else{
      did("presentSwitch").style.borderColor = "lawngreen";
      did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Toggle Mystery Present spawn<br><span style="background:black; padding: 0 2%; border-radius: 0.6vh"><FONT COLOR="lawngreen">Presents CAN NOT Currently Spawn</span><br><FONT COLOR="white">(Click to toggle)'

    } 
    if (!settings.presentSwitch) settings.presentSwitch = true;
    else settings.presentSwitch = false;
    did("presentSwitch").style.animation = "";
    void did("presentSwitch").offsetWidth;
    did("presentSwitch").style.animation = "useSkill 0.4s 1 ease";
});

  did("presentSwitch").addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    if (!settings.presentSwitch) did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Toggle Mystery Present spawn<br><span style="background:black; padding: 0 2%; border-radius: 0.6vh"><FONT COLOR="coral">Presents CAN Currently Spawn</span><br><FONT COLOR="white">(Click to toggle)';
    else did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Toggle Mystery Present spawn<br><span style="background:black; padding: 0 2%; border-radius: 0.6vh"><FONT COLOR="lawngreen">Presents CAN NOT Currently Spawn</span><br><FONT COLOR="white">(Click to toggle)';
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    did("tooltipArrow").style.right = '90%';
    const movingDiv = did("tooltip");
    const referenceDiv = did("presentSwitch");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const newLeft = referenceRect.left;
    const newTop = referenceRect.bottom-60 - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });

  did("presentSwitch").addEventListener("mouseleave", function () {
    resetTooltip();
  });












//#endregion
//----------------------==========================-----------------------
//----------------------===========QUESTS=========-----------------------
//----------------------==========================-----------------------
//#region Quests
stats.questsCompleted = 0;

setInterval(function () { if (stats.currentCategory === "rpgContainer") { createQuest(); } }, 2000);

function createQuest() {
  for (let q in quests) {
    if (q.startsWith(stats.currentArea)){
    if (!did(q + "quest")) {
      const questdiv = document.createElement("div");
      questdiv.id = q + "quest";
      questdiv.innerHTML = '<div class="areaPanel1" > <div class="areaImage" id="' + q + 'questi" style="border-color: #FFD100"> <img src="img/src/items/quest.jpg"></div> </div> <div class="areaPanel2"> <p class="questPanelName">'+quests[q].name+'<br></p> <p class="questPanelLevel" id="' + q + 'questl" >' + returnDifficulty(quests[q].difficulty) + "</p></div>";
      did("questTab").appendChild(questdiv);
      questdiv.className = "questPanel";
      

      did(q + "quest").addEventListener("click", function () {
        if (quests[q].state === "complete") {
          playSound("audio/startup.mp3");
          stats.questsCompleted++;
          did(q + "questl").innerHTML = "Completed";
          quests[q].state = "completed";
          eval(quests[q].effect);
          questReward(quests[q].money, quests[q].exp);
          unlocksReveal();
          specialButtonUi();
          createQuest();
          addItem();
        }
      });

      tooltipQuests(q);
    }

    if(quests[q].state==='pending') {
      quests[q].once=false;
      did(q + "questl").style.background = "none";
      did(q + "questl").innerHTML = returnDifficulty(quests[q].difficulty)
      did(q + "questi").style.borderColor = "yellow";
    }
    else if(quests[q].state==='complete') {
      if (!quests[q].once) {
        createPopup('&#128220 Quest Completed: '+quests[q].name, '#6da5bf')
        playSound("audio/ring.mp3");
        quests[q].once=true}
      did(q + "questl").innerHTML = "REDEEM";
      did(q + "questl").style.background = "#37b330";
      did(q + "questi").style.borderColor = "#37b330";
      did(q + "questl").style.fontSize = "0.8vw";
    }
    else if(quests[q].state==='completed') {
      did(q + "questl").innerHTML = "COMPLETED";
      did(q + "questl").style.background = "gray";
      did(q + "questi").style.borderColor = "gray";
      did(q + "questl").style.fontSize = "0.7vw";

    }

    if(quests[q].state==='pending' || quests[q].state==='complete'){
    if (eval(quests[q].logic)) {quests[q].state = "complete"} else {quests[q].state = "pending"}  
    }
  }
  }
} createQuest();

function returnDifficulty(level){
  
  if (level === 1) return "<span style='color:gray; background:transparent'>★★★★★★</span>";
  if (level === 2) return "<span style='color:#579DA6; background:transparent'>★</span><span style='color:gray; background:transparent'>★★★★★</span>";
  if (level === 3) return "<span style='color:#579DA6; background:transparent'>★★</span><span style='color:gray; background:transparent'>★★★★</span>";
  if (level === 4) return "<span style='color:#579DA6; background:transparent'>★★★</span><span style='color:gray; background:transparent'>★★★</span>";
  if (level === 5) return "<span style='color:#579DA6; background:transparent'>★★★★</span><span style='color:gray; background:transparent'>★★</span>";
  if (level === 6) return "<span style='color:#579DA6; background:transparent'>★★★★★</span><span style='color:gray; background:transparent'>★</span>";
  if (level === 7) return "<span style='color:#579DA6; background:transparent'>★★★★★★</span>";

  if (level === 8) return "<span style='color:#A78E50; background:transparent'>★</span><span style='color:#579DA6; background:transparent'>★★★★★</span>";

 
}

function questReward(money, exp) { //generic rewards for quests, also used for exp candies
  rpgPlayer.coins += money;
  stats.totalCoins += money;
  rpgClass[stats.currentClass].currentExp += exp;
    
  
  expBar();
  statsUpdate();
  updateStatsUI();
}

//#endregion
//----------------------==========================-----------------------
//----------------------============SHOP==========-----------------------
//----------------------==========================-----------------------
//#region Shop
function createShopItem() {
  for (let si in shopItems) {
    if (si.startsWith(stats.currentArea)){
    if (!did(shopItems[si].id + "shopItem")) {
      const areadiv = document.createElement("div");
      areadiv.id = shopItems[si].id + "shopItem";
      areadiv.innerHTML = '<div class=soldOut id="' + shopItems[si].id + 'itemTag">SOON</div><div class="itemSlot" id="' + shopItems[si].id + 'displayItem"><div class=restockIcon id="' + si + 'restock" style="display:none">🔄</div><img id="' + si + 'image" src="img/src/items/' + items[shopItems[si].item].img + '.jpg"></div>'; did("shopListing").appendChild(areadiv);
      areadiv.className = "shopItemCasing";


      if ("restock" in shopItems[si]) did(si + 'restock').style.display = "inline"

      did(shopItems[si].id + "displayItem").style.border = returnQualityColor(items[shopItems[si].item].quality) +" solid 1px";
      //tooltip here
      shopItemButton(shopItems[si]);
      tooltipShopItem(shopItems[si], si);
    }

    if (shopItems[si].unlocked === false) {
      did(shopItems[si].id + "itemTag").style.display = "flex";
      did(shopItems[si].id + "itemTag").innerHTML = "SOON";
    } else { did(shopItems[si].id + "itemTag").style.display = "none"; } 


    if (shopItems[si].stock < 1) {
      did(shopItems[si].id + "itemTag").style.display = "flex";
      did(shopItems[si].id + "itemTag").innerHTML = "SOLD OUT";
    } else {did(shopItems[si].id + "itemTag").style.display = "none";}


    did(shopItems[si].id + "displayItem").style.filter = "grayscale(0)"
    if (shopItems[si].stock < 1 || shopItems[si].unlocked === false)
      did(shopItems[si].id + "displayItem").style.filter = "grayscale(0.8)";
    }
  }
} createShopItem();

stats.boughtItems = 0;

function shopItemButton(area) {
  if (did(area.id + "shopItem")) {
    did(area.id + "shopItem").addEventListener("click", function () {

      if ( sellMode && rpgPlayer.coins >= eval(area.price)*10 && (area.stock > 9 || area.stock==="∞") && area.unlocked !== false && items[area.item].count!==items[area.item].max ) {

        playSound("audio/button3.mp3"); 
        rpgPlayer.coins -= eval(area.price)*10;
        if (area.stock !=="∞") {area.stock-=10;}
        items[area.item].count+=10;
        stats.boughtItems+=10;
        did(area.id + "displayItem").style.animation = "";
        void did(area.id + "displayItem").offsetWidth;
        did(area.id + "displayItem").style.animation = "buyAnimation 0.2s 1";
        updateCounters();
        createShopItem();
        did("tooltipPrice").innerHTML = "Stock: " + shopItems[area.id].stock;

      } else if ( rpgPlayer.coins >= eval(area.price) && (area.stock > 0 || area.stock==="∞") && area.unlocked !== false && items[area.item].count!==items[area.item].max) {
        
        playSound("audio/button3.mp3"); 
        rpgPlayer.coins -= eval(area.price);
        if (area.stock !=="∞") {area.stock--;}
        items[area.item].count++;
        stats.boughtItems++;
        did(area.id + "displayItem").style.animation = "";
        void did(area.id + "displayItem").offsetWidth;
        did(area.id + "displayItem").style.animation = "buyAnimation 0.2s 1";
        updateCounters();
        createShopItem();
        did("tooltipPrice").innerHTML = "Stock: " + shopItems[area.id].stock;


      } else {
        
        playSound("audio/thud.mp3"); 
        did(area.id + "displayItem").style.animation = "";
        void did(area.id + "displayItem").offsetWidth;
        did(area.id + "displayItem").style.animation = "noBuyAnimation 0.2s 1";
      }


addItem()

    }
    
    
    
    );
  }
}

//#endregion
//----------------------==========================-----------------------
//----------------------============UI============-----------------------
//----------------------==========================-----------------------
//#region UI
var sellMode = false;
document.addEventListener("keydown", function (event) { //enable sell mode
  if (event.shiftKey) {
    sellMode = true;
    did("sellModeText").style.display = "inline";
  }
});

document.addEventListener("keyup", function (event) { //disable sell mode
  if (event.key === "Shift") {
    sellMode = false;
    did("sellModeText").style.display = "none";
  }
});

function changeRPGTab(button, tab) { //change menu tabs
  did(button).addEventListener("click", function () {
    if (!did(button).classList.contains("gearButtonLocked")){
    playSound("audio/button1.mp3")
    did("questTab").style.display = "none";
    did("areaTab").style.display = "none";
    did("shopTab").style.display = "none";
    did("dungeonTab").style.display = "none";

    did("questButton").className = "gearButtonInactive";
    if (unlocks.areas) did("areaButton").className = "gearButtonInactive";
    if (unlocks.shop) did("shopButton").className = "gearButtonInactive";
    if (unlocks.dungeons) did("dungeonButton").className = "gearButtonInactive";

    did(tab).style.display = "flex";
    did(button).className = "gearButtonActive";

    if (stats.currentArea==="A7" && button==="shopButton"){
      did("skirmishTab").style.display = "flex";
      did("shopTab").style.display = "none";
    } else did("skirmishTab").style.display = "none";

    if (stats.currentArea==="A7" && button==="questButton"){
      did("showdownTab").style.display = "flex";
      did("questTab").style.display = "none";
    } else did("showdownTab").style.display = "none";



    }
  });
}

changeRPGTab("questButton", "questTab");
changeRPGTab("areaButton", "areaTab");
changeRPGTab("shopButton", "shopTab");
changeRPGTab("dungeonButton", "dungeonTab");

rpgPlayer.contractedLog = false;
did("combatLogArrow").addEventListener("click", function () { 
  playSound("audio/button2.mp3")
  if (rpgPlayer.contractedLog) {
    rpgPlayer.contractedLog = false;
  } else {
    rpgPlayer.contractedLog = true;
  }
  contractLog();
});

function contractLog() {
  if (rpgPlayer.contractedLog === false) {
    did("combatLog").style.minHeight = "0%";
    did("inventory").style.minHeight = "53%";
    did("combatLogArrow").style.transform = "rotateX(0deg)";
  } else {
    did("combatLog").style.minHeight = "21%";
    did("combatLogArrow").style.transform = "rotateX(180deg)";
    did("inventory").style.minHeight = "31.3%";
  }
}

function returnQualityColor(quality){

  if (quality === "Poor") return "gray"
  if (quality === "Common") return "white"
  if (quality === "Uncommon") return "#1eff00"
  if (quality === "Rare") return "#0070dd"
  if (quality === "Epic") return "#a335ee"
  if (quality === "Legendary") return "#ff8000"
  if (quality === "Collectible") return "#e6cc80"
  if (quality === "Quest") return "yellow"
  if (quality === "Upgrade") return "#00FFCA"

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



  if (quality === "difficulty1") return "#579DA6"

}

function returnStampName(stamp){
  if (stamp === "nature1") return "Nature Force I";
  if (stamp === "nature2") return "Nature Force II";
  if (stamp === "nature3") return "Nature Force III";
  if (stamp === "might1") return "Might Force I";
  if (stamp === "might2") return "Might Force II";
  if (stamp === "might3") return "Might Force III";
  if (stamp === "elemental1") return "Elemental Force I";
  if (stamp === "elemental2") return "Elemental Force II";
  if (stamp === "elemental3") return "Elemental Force III";
  if (stamp === "occult1") return "Occult Force I";
  if (stamp === "occult2") return "Occult Force II";
  if (stamp === "occult3") return "Occult Force III";
  if (stamp === "deific1") return "Deific Force I";
  if (stamp === "deific2") return "Deific Force II";
  if (stamp === "deific3") return "Deific Force III";
  if (stamp === "crit1") return "Critical Chance I";
  if (stamp === "crit2") return "Critical Chance II";
  if (stamp === "crit3") return "Critical Chance III";
  if (stamp === "multihit1") return "Multihit I";
  if (stamp === "multihit2") return "Multihit II";
  if (stamp === "multihit3") return "Multihit III";
}

//#endregion
//----------------------==========================-----------------------
//----------------------===========MAIL===========-----------------------
//----------------------==========================-----------------------
//#region Mail
settingsPanel ("mailButton", "mailMenu");

function  createMail() {
  for (let i in mail) {
    if (!did(i + "mail") && mail[i].recieved) {
      const img = document.createElement("img");
      img.src = "img/src/icons/letter.png";
      img.id = i + "mail";
      did("mailList").insertBefore(img, did("mailList").firstChild);
      mailButton(i);
      tooltipMail(i);
    }

    if (mail[i].read) did(i + "mail").src = "img/src/icons/letterRead.png";

    
  }
}

function mailButton(id) {
  if (did(id + "mail")) {
    did(id + "mail").addEventListener("click", function () {
        playSound("audio/page.mp3")
        did("mailLetter").style.display = "flex";
        did("mailTitle").innerHTML = mail[id].title;
        did("mailBody").innerHTML = mail[id].body;
        if ("item" in mail[id]){ did("mailItem").innerHTML = '<div class="blackLine"></div><div class="itemSlot" style="border: solid black 1px"><img src="img/src/items/'+mail[id].item+'.jpg"></div>' }
        else did("mailItem").innerHTML = ""
        if (!mail[id].read) { mail[id].read=true; eval(mail[id].effect); createMail(); addItem()}
        
    });
  }}

  did("closeMail").addEventListener("click", function () {  did("mailLetter").style.display = "none"; playSound("audio/page.mp3")  })
  did("mailButton").addEventListener("click", function () {  stats.mailUnread=false; unreadMail()  })

  function unreadMail(){
    if (stats.mailUnread) {
      did('mailButton').src = "img/src/icons/mailUnread.png"
      did('mailButton').style.animation= 'mailShake 9s infinite ease-in-out'
    } else {
      did('mailButton').style.animation= ''
      did('mailButton').src = "img/src/icons/mail.png"
    }

    if (!mail.M1.recieved) sendMail("M1")
  }

  function sendMail(id){
    createPopup('&#128231; You got Mail!', '#315185', 'resourcePopUp');
    playSound("audio/ring.mp3");
    mail[id].recieved=true;
    createMail();
    stats.mailUnread=true;
    unreadMail();
  }

  function unlockAllMail(){
    for (i in mail) sendMail(i)
  }
    
 

//#endregion
//----------------------==========================-----------------------
//----------------------===========ARENA==========-----------------------
//----------------------==========================-----------------------
//#region Arena

  did("honorRank").addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">Achieve <span style="background:gold; padding: 0 2%; border-radius: 0.6vh"><FONT COLOR="black">1<FONT COLOR="#edd585"></span> more Gold Medal to rank up!';
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    const movingDiv = did("tooltip");
    const referenceDiv = did("honorRank");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 32;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });
  did("honorRank").addEventListener("mouseleave", function () {
    resetTooltip();
  });


settingsPanel ("honorSign", "honorShop");

const returnMinutes = seconds => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
var showdownTimer = 0;
var skirmishTimer = 0;

let goldenMedalsGot = 0;

function createShowdown() {

  for (let i in showdown) {
    if (!did(i + "showdown")) {
      const div = document.createElement("div");
      div.id = i + "showdown";
      div.className = "showdownPanel";
      div.innerHTML = '<img src="img/src/enemies/'+showdown[i].enemy+'M.png"><div class="showdownText"><span>'+enemies[showdown[i].enemy].name+'</span><br><span class="showdownDifficulty" id="'+i+'showdownDifficulty" >Easy</span><br><span id="'+i+'showdownBestTime">Last Time: Undefeated</span><span>0:40</span><span>0:50</span><span>1:00</span></div><div class="showdownMedal"><img id="'+i+'showdownMedal" src="img/src/projectiles/none.png"></div>';
      did("showdownTab").appendChild(div);

      did(i + "showdown").addEventListener("click", function () {
        if (!showdownTime) {
          stats.currentEnemy = showdown[i].enemy; //failsafe
          playSound("audio/arena.mp3")
          deleteEnemy(showdown[i].enemy);
          showdownTime=true;
          did("enemyPanel").style.display = "flex";
          did("showdownUI").style.display = "flex";
          did("honorSign").style.display = "none";
          did("honorPilar").style.display = "none";
          document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(0.5)");
        }
      });

  }

  did(i + "showdownDifficulty").innerHTML = returnDifficulty(showdown[i].difficulty);

  if (showdown[i].bestTime<=60) {did(i + "showdownMedal").src = "img/src/icons/bronzemedal.png";}
  if (showdown[i].bestTime<=50) did(i + "showdownMedal").src = "img/src/icons/silvermedal.png"
  if (showdown[i].bestTime<=40) {did(i + "showdownMedal").src = "img/src/icons/goldmedal.png";}

  if (showdown[i].bestTime<=40 && !showdown[i].once) { showdown[i].once = true; goldenMedalsGot++}

  if (showdown[i].bestTime!=="Undefeated") did(i + "showdownBestTime").innerHTML = 'Last Time: '+returnMinutes(showdown[i].bestTime)

if (goldenMedalsGot>0){
  for (let i = 1; i <= goldenMedalsGot; i++) {
    did("honorShopListing" + i + "Cover").style.display = "none";
}
let img = parseInt(goldenMedalsGot) + 1
for (let i = 1; i <= goldenMedalsGot; i++) { did("honorRank").src = "img/src/icons/gladr"+img+".jpg" }
}


  
  }
}

function endShowdown(){


  updateCounters();
  createShowdown();
  
 
  
  did("enemyPanel").style.display = "none";
  did("showdownUI").style.display = "none";
  did("honorSign").style.display = "flex";
  did("honorPilar").style.display = "flex";
  did("rpgCanvas").style.animation = "";
  void did("rpgCanvas").offsetWidth;
  did("rpgCanvas").style.animation = "rpgFade 1s 1";
  
  void did("expPanel").offsetWidth;
  document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(1)");

  if (showdownTime){

    did(enemies[stats.currentEnemy].showdown+"showdown").style.animation = "";
    showdownTimer=0;
    showdownTime=false;
  }

  if (skirmishTime!==false){
    did("skirmishUI").style.display = "none";
    skirmish[skirmishTime].bestScore = skirmishWave
    skirmishTime=false;
    skirmishPoints=0
    createSkirmish()
  }
  
  showdownCounter();
  createShowdown()

}

function createSkirmish() {
  for (let i in skirmish) {
    if (!did(i + "skirmish")) {
      const div = document.createElement("div");
      div.id = i + "skirmish";
      div.className = "showdownPanel";
      div.innerHTML = '<img src="img/src/enemies/'+i+'.png"><div class="showdownText"><span>'+skirmish[i].name+'</span><br><span class="showdownDifficulty" id="'+i+'skirmishDifficulty" >Easy</span><br><span id="'+i+'skirmishbestScore">Last Wave: Unattempted</span><span>7</span><span>5</span><span>3</span></div><div class="showdownMedal"><img id="'+i+'skirmishMedal" src="img/src/projectiles/none.png"></div>';
      did("skirmishTab").appendChild(div);

      did(i + "skirmish").addEventListener("click", function () {
        if (!skirmishTime) {
          playSound("audio/arena.mp3")
          skirmishTimer=90
          stats.currentEnemy = skirmish[i].wave1;
          deleteEnemy(skirmish[i].wave1);
          skirmishTime=i;
          skirmishWave=1;
          did("enemyPanel").style.display = "flex";
          did("skirmishUI").style.display = "flex";
          did("honorSign").style.display = "none";
          did("honorPilar").style.display = "none";
          document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(0.5)");

        }
      });

  }

  did(i + "skirmishDifficulty").innerHTML = returnDifficulty(skirmish[i].difficulty);

  if (skirmish[i].bestScore===7) did(i + "skirmishMedal").src = "img/src/icons/goldmedal.png"
  if (skirmish[i].bestScore<7) did(i + "skirmishMedal").src = "img/src/icons/silvermedal.png"
  if (skirmish[i].bestScore<=4) did(i + "skirmishMedal").src = "img/src/icons/bronzemedal.png"
  if (skirmish[i].bestScore<3) did(i + "skirmishMedal").src = "img/src/projectiles/none.png" //aqui meter un none por si el jugador no llega a oleada 4

  if (skirmish[i].bestScore===7 && !skirmish[i].once) { skirmish[i].once = true; goldenMedalsGot++}



  if (skirmish[i].bestScore!=="Undefeated") did(i + "skirmishbestScore").innerHTML = 'Last Wave: '+skirmish[i].bestScore


}
}


setInterval(() => { showdownCounter() }, 1000);

function showdownCounter(){

if (stats.currentArea === "A7" && showdownTime) {
  showdownTimer++;
  did("showdownUI").innerHTML = returnMinutes(showdownTimer)
}

if (stats.currentArea === "A7" && skirmishTime) {
  skirmishTimer--;
  did("skirmishTimer").innerHTML = 'Wave '+ skirmishWave +" - "+returnMinutes(skirmishTimer)

  if (skirmishTimer<0){
  skirmish[skirmishTime].bestScore = skirmishWave-1;
  skirmishWave=1;
  playSound("audio/startup.mp3");

  did(skirmishTime+"skirmish").style.animation = "";
  void did("expPanel").offsetWidth;
  did(skirmishTime+"skirmish").style.animation = "levelUp 1s 1";

  skirmishTime=false;
  did("enemyPanel").style.display = "none";
  did("skirmishUI").style.display = "none";
  did("rpgCanvas").style.animation = "";
  void did("rpgCanvas").offsetWidth;
  did("rpgCanvas").style.animation = "rpgFade 1s 1";
  createSkirmish()
  document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(1)");
  did("honorSign").style.display = "flex";
  did("honorPilar").style.display = "flex";
  createShowdown()
  }
}

}

function updateSkirmishPoints(){

  let percentageEXP =  (skirmishPoints/10)*100;   
  did('skirmishMeter').style.width = percentageEXP+"%";

  if (skirmishPoints >= 10){

    playSound("audio/heal.mp3");
    skirmishWave++
    skirmishPoints=0
    updateSkirmishPoints();
    did("skirmishUI").style.animation = "";
    void did("expPanel").offsetWidth;
    did("skirmishUI").style.animation = "levelUp 1s 1";

    if (skirmishWave>7) {
      
      skirmish[skirmishTime].bestScore=7
      skirmishWave=1;
      playSound("audio/startup.mp3");

      did(skirmishTime+"skirmish").style.animation = "";
      void did("expPanel").offsetWidth;
      did(skirmishTime+"skirmish").style.animation = "levelUp 1s 1";

      did("honorSign").style.display = "flex";
      did("honorPilar").style.display = "flex";

      skirmishTime=false;
      did("enemyPanel").style.display = "none";
      did("skirmishUI").style.display = "none";
      did("rpgCanvas").style.animation = "";
      void did("rpgCanvas").offsetWidth;
      did("rpgCanvas").style.animation = "rpgFade 1s 1";
      createSkirmish()
      createShowdown()
      document.querySelectorAll('.botonLateral').forEach(elemento => elemento.style.filter = "brightness(1)");

    }

  }
  
}

function createShopHonor() {
  for (let si in shopHonor) {
    if (!did(si + "shopHonor")) {
      const div = document.createElement("div");
      div.id = si + "shopHonor";


      div.innerHTML = '<div class=soldOut id="' + si + 'itemTag">LOCKED</div><div class="itemSlot" id="' + si + 'displayItem"><img id="' + si + 'image" src="img/src/items/' + items[shopHonor[si].item].img + '.jpg"></div>';
      did(shopHonor[si].parent).appendChild(div);
      div.className = "shopItemCasingNoHover";

      did(si + "displayItem").style.border = returnQualityColor(items[shopHonor[si].item].quality) +" solid 1px";
      honorItemButton(si);
      tooltipShopHonor(si);
    }

    if (shopHonor[si].stock < 1) {
      did(si + "itemTag").style.display = "flex";
      did(si + "itemTag").innerHTML = "SOLD OUT";
    }

  }
} createShopHonor();

function tooltipShopHonor(id) {
  if (did(id + "shopHonor")) {
    did(id + "shopHonor").addEventListener("mouseenter", function () {
      did("tooltip").style.display = "flex";
      did("tooltipName").textContent = items[shopHonor[id].item].name;
      did("tooltipPrice").innerHTML = "Stock: " + shopHonor[id].stock;
      did("tooltipRarity").textContent = items[shopHonor[id].item].quality;

      did("tooltipRarity").style.color = returnQualityColor(items[shopHonor[id].item].quality);
      did("tooltipName").style.color = returnQualityColor(items[shopHonor[id].item].quality);

      did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(shopHonor[id].price) + ' '+coinIcon+'Turtle Coins<br></div><div class="separador"></div><FONT COLOR="white">' + items[shopHonor[id].item].description;
            
      did("tooltipFlavor").textContent = "";
      did("tooltipImage").src = "img/src/items/" + items[shopHonor[id].item].img + ".jpg";

      var movingDiv = did("tooltip");
      var referenceDiv = did(id + "shopHonor");
      var referenceRect = referenceDiv.getBoundingClientRect();
      var referenceLeft = referenceRect.left + 26;
      var referenceTop = referenceRect.top - 15;
      var newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
      var newTop = referenceTop - movingDiv.offsetHeight;
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";
    });
    did(id + "shopHonor").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }



  
}


function honorItemButton(id) {
  if (did(id+ "shopHonor")) {
    did(id + "shopHonor").addEventListener("click", function () {
      if (shopHonor[id].stock && rpgPlayer.coins>=shopHonor[id].price) {
        playSound("audio/button3.mp3");
        rpgPlayer.coins-=shopHonor[id].price
        if (shopHonor[id].stock != "∞") shopHonor[id].stock--;
        items[shopHonor[id].item].count++;
        did(id + "shopHonor").style.animation = "";
        void did(id + "shopHonor").offsetWidth;
        did(id + "shopHonor").style.animation = "buyAnimation 0.2s 1";
        updateCounters();
        createShopHonor();
        addItem();
      } else {
        playSound("audio/thud.mp3"); 
        did(id + "shopHonor").style.animation = "";
        void did(id + "shopHonor").offsetWidth;
        did(id + "shopHonor").style.animation = "noBuyAnimation 0.2s 1";
      }
    });
  }
}


//#endregion
//----------------------==========================-----------------------
//----------------------===========SKILLS=========-----------------------
//----------------------==========================-----------------------
//#region Skills

did("expPanel").addEventListener("click", function (event) {
  if (unlocks.skills) {
  playSound("audio/button3.mp3");
  did("skillMenu").style.display = "flex";
  did("bodyCover").style.display = "flex";
  did("body").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  did("body").style.filter = "blur(5px) brightness(0.5)";
  event.stopPropagation();
}
});

var zoomelement = document.querySelector('#skillContainer')
panzoom(zoomelement, {
  maxZoom: 1.5,
  minZoom: 0.5,
  zoomDoubleClickSpeed: 1, 
});

function  createTalent() {
  for (let i in talent) {
    if (!did(i + "talent")) {
      const star = document.createElement("img");
      star.src = "img/src/icons/talentStar.png";
      star.id = i + "talent";
      star.className = "talentStar";
      star.style.translate = talent[i].position;
      star.style.filter = "hue-rotate("+talent[i].hue+")"
      did("skillContainer").appendChild(star);
      if ("parent" in talent[i]) {
      var parent = talent[i].parent

      const [startX, startY] = talent[i].position.split(' ');
      const [endX, endY] = talent[parent].position.split(' ');

      drawLine(parseInt(startX, 10), parseInt(startY, 10), parseInt(endX, 10),parseInt(endY, 10));
      }
      tooltipTalents(i)
      talentClick(i)
      

    }

    if ("parent" in talent[i] && talent[i].active) {
      var parent = talent[i].parent
      const [startX, startY] = talent[i].position.split(' ');
      const [endX, endY] = talent[parent].position.split(' ');
      drawLine(parseInt(startX, 10), parseInt(startY, 10), parseInt(endX, 10),parseInt(endY, 10), "active");

      did(i + "talent").style.opacity = "1"
      }


    
  }
}

function drawLine(x1, y1, x2, y2, state) {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext('2d');

  if(state === "active"){
    ctx.lineWidth = 2; 
    ctx.strokeStyle = "rgba(103, 100, 204, 1)";

  } else {
  ctx.lineWidth = 2; 
  ctx.strokeStyle = "rgba(103, 100, 204, 0.2)";
  }

  ctx.beginPath();
  ctx.moveTo(x1 + canvas.width / 2, y1 + canvas.height / 2);
  ctx.lineTo(x2 + canvas.width / 2, y2 + canvas.height / 2);
  ctx.stroke();
}

function talentClick(id) {
  if (did(id + "talent")) {
    did(id + "talent").addEventListener("click", function () {
      if (((!talent[id].active && id==="T0") || (!talent[id].active && talent[talent[id].parent].active)  ) && rpgPlayer.talentPoints>0){
      playSound("audio/talent.mp3");
      talent[id].active=true;
      eval(talent[id].effect);
      statsUpdate();
      updateStatsUI();
      createTalent();

    did(id + "talent").style.animation = "";
    void did(id + "talent").offsetWidth;
    did(id + "talent").style.animation = "talentFlash 0.4s 1 ease";
    did(id + "talent").style.filter = "brightness(10)"
    setTimeout(() => { did(id + "talent").style.filter = "brightness(1) hue-rotate("+talent[id].hue+")" }, 100);
    setTimeout(() => {  did(id + "talent").style.animation = "talentStarAnim 2s infinite";}, 400);

    rpgPlayer.talentPoints--
    updateTalentUI()
  

}

    });
  }
}


function updateTalentUI(){

did("talentCounter").innerHTML = "You have "+rpgPlayer.talentPoints+" unspent Talent Points"
did("unspentTalent").innerHTML = rpgPlayer.talentPoints

let percentageEXP = (rpgPlayer.talentProgress / 6) * 100;
  did("talentPointBar").style.background = "linear-gradient(90deg, #6FB1EE " + percentageEXP + "%, #23232D " + percentageEXP + "%)";

for (let i in talent) {
  if (!did(i + "skill") && talent[i].category==="Skill" && talent[i].active && !i.includes("BASE")) {
    const skilldiv = document.createElement("div");
    skilldiv.id = i + "skill";
    skilldiv.innerHTML = '<img src="img/src/talents/'+i+'.jpg">';
    did("skillWrapper").appendChild(skilldiv);
    skilldiv.className = "skillSlot";
    skilldiv.style.border = "solid 2px " + returnQualityColor(i)

    VanillaTilt.init(document.querySelector("#" + i + "skill"), {
      max: 20,
      speed: 2000,
      reverse: true,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      perspective: 100,
    });

    tooltipSkill(i, i + "skill")
    getHoveredSkill(i)
    
  }

  if (!did(i + "class") && talent[i].category==="Class" && talent[i].active) {
    const classdiv = document.createElement("div");
    classdiv.id = i + "class";
    classdiv.innerHTML = '<img src="img/src/talents/'+i+'.jpg">';
    did("classWrapper").appendChild(classdiv);
    classdiv.className = "classSlot";
    classdiv.style.border = "solid 2px " + returnQualityColor(i)

    tooltipSkill(i, i + "class")

    classdiv.addEventListener("click", function () { //class change

      playSound("audio/retro1.mp3");

      if (stats.currentArea === "A7"){
      did("showdownTab").style.display = "none";
      did("skirmishTab").style.display = "none";
      did("areaTab").style.display = "none";
      did("dungeonTab").style.display = "none";
      did("questTab").style.display = "flex";
    }

    

      did("rpgCanvas").style.animation = "";
        void did("rpgCanvas").offsetWidth;
        did("rpgCanvas").style.animation = "rpgFade 1s 1";
      stats.currentArea = "A1";
      resetAreaButtonClass();
      dungeonPoints = 0;
      dungeonStage=0;
      updateDungeonPoints()
      switchArea();
      specialButtonUi();
      deleteEnemy();

    

      
      stats.currentClass = i

      rpgPlayer.skill0 = i+"BASE"
      if (i === 'noClass')  rpgPlayer.skill0 = 'none'

      updateSkills();
      updateClass();

      did(i + "class").style.animation = "";
      void did(i + "class").offsetWidth;
      did(i + "class").style.animation = "gelatine 0.3s 1";

      animParticleBurst(7 , "particleSpark", "playerPanel", 100);
      animState("rpgPlayerImg", "flash 0.4s 1");
    animImageSplash("soundWave", "playerPanel", "wave", 100);

    });
  


  }

}

}

function learnAllTalents() { for (let i in talent) { talent[i].active = true; updateTalentUI() } }

function changeSkillTab(button, tab) { //change menu tabs
  did(button).addEventListener("click", function () {
    if (unlocks.skills) {
    playSound("audio/button1.mp3")
    did("equipmentTab").style.display = "none";
    did("skillsTab").style.display = "none";

    did("equipmentButton").className = "gearButtonInactive";
    did("skillsButton").className = "gearButtonInactive";

    did(tab).style.display = "flex";
    did(button).className = "gearButtonActive";
    }
  });
}

changeSkillTab("equipmentButton", "equipmentTab")
changeSkillTab("skillsButton", "skillsTab")

const scrollContainer = did("classWrapper");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});

let skillHover = "none"

function getHoveredSkill(id) { //assign skills
  document.getElementById(id + "skill").addEventListener('mouseover', function() { skillHover = id });
  document.getElementById(id + "skill").addEventListener('mouseout', function() { skillHover = "none" }); 
}

document.addEventListener('keydown', function (event) {
  if (event.key === '1' && skillHover !== "none" && rpgPlayer.skill2 !== skillHover && rpgPlayer.skill3 !== skillHover && rpgPlayer.skill4 !== skillHover) { rpgPlayer.skill1 = skillHover }
  if (event.key === '2' && skillHover !== "none" && rpgPlayer.skill1 !== skillHover && rpgPlayer.skill3 !== skillHover && rpgPlayer.skill4 !== skillHover) { rpgPlayer.skill2 = skillHover }
  if (event.key === '3' && skillHover !== "none" && rpgPlayer.skill2 !== skillHover && rpgPlayer.skill1 !== skillHover && rpgPlayer.skill4 !== skillHover) { rpgPlayer.skill3 = skillHover }
  if (event.key === '4' && skillHover !== "none" && rpgPlayer.skill2 !== skillHover && rpgPlayer.skill3 !== skillHover && rpgPlayer.skill1 !== skillHover) { rpgPlayer.skill4 = skillHover }

  if (event.key === '1' && skillHover === "none" && rpgPlayer.skill0 !== "none") castSkill("0")
  if (event.key === '2' && skillHover === "none" && rpgPlayer.skill1 !== "none") castSkill("1")
  if (event.key === '3' && skillHover === "none" && rpgPlayer.skill2 !== "none") castSkill("2")
  if (event.key === '4' && skillHover === "none" && rpgPlayer.skill3 !== "none") castSkill("3")
  if (event.key === '5' && skillHover === "none" && rpgPlayer.skill4 !== "none") castSkill("4")



  updateSkills()
});

did("skillSlot0").addEventListener('click', function () { castSkill("0") });
did("skillSlot1").addEventListener('click', function () { castSkill("1") });
did("skillSlot2").addEventListener('click', function () { castSkill("2") });
did("skillSlot3").addEventListener('click', function () { castSkill("3") });
did("skillSlot4").addEventListener('click', function () { castSkill("4") });

function castSkill(number) {

  if (eval(talent[rpgPlayer["skill"+number]].cost)<=rpgPlayer.mana && talent[rpgPlayer["skill"+number]].currentCd<=0 && !(stats.currentArea === "A7" && !skirmishTime && !showdownTime) && buffs.B60.time<=0) {

    playSound("audio/throw.mp3");

  eval(talent[rpgPlayer["skill"+number]].cast);
  did("skillButton"+number).style.animation = "";
  void did("skillButton"+number).offsetWidth;
  did("skillButton"+number).style.animation = "useSkill 0.4s 1 ease";
  if (!settings.disableSkillLog) logPrint(`<FONT COLOR="#18ccba"> You cast ` + talent[rpgPlayer["skill"+number]].name);

  talent[rpgPlayer["skill"+number]].currentCd = talent[rpgPlayer["skill"+number]].cd

  if (talent[rpgPlayer["skill"+number]].currentCd !== 0) did("skillSlot"+number+"CD").style.height = "100%";
  did("skillSlot"+number+"CD").style.transition = "none"
  setTimeout(() => { did("skillSlot"+number+"CD").style.transition = "1s all linear" }, 100);

  rpgPlayer.mana -= eval(talent[rpgPlayer["skill"+number]].cost)
  manaUpdate()
  did("magicBar").style.transition = "none"
  setTimeout(() => { did("magicBar").style.transition = "1s all linear" }, 100);

} else {
  did("skillButton"+number).style.animation = "";
  void did("skillButton"+number).offsetWidth;
  did("skillButton"+number).style.animation = "shake 0.4s 1 ease";
}



}
    
    




function updateSkills() {

  if ( rpgPlayer.skill0 !== "none" ) {
    did("skillSlot0").src = "img/src/talents/" + rpgPlayer.skill0 + ".jpg";
    did("skillButton0").style.border = "2px solid " + returnQualityColor(rpgPlayer.skill0)
  } else removeSkill(0)

  if ( rpgPlayer.skill1 !== "none" ) {
    did("skillSlot1").src = "img/src/talents/" + rpgPlayer.skill1 + ".jpg";
    did("skillButton1").style.border = "2px solid " + returnQualityColor(rpgPlayer.skill1)
  } else removeSkill(1)

  if ( rpgPlayer.skill2 !== "none" ) {
    did("skillSlot2").src = "img/src/talents/" + rpgPlayer.skill2 + ".jpg";
    did("skillButton2").style.border = "2px solid " + returnQualityColor(rpgPlayer.skill2)
  } else removeSkill(2)

  if ( rpgPlayer.skill3 !== "none" ) {
    did("skillSlot3").src = "img/src/talents/" + rpgPlayer.skill3 + ".jpg";
    did("skillButton3").style.border = "2px solid " + returnQualityColor(rpgPlayer.skill3)
  } else removeSkill(3)

  if ( rpgPlayer.skill4 !== "none" ) {
    did("skillSlot4").src = "img/src/talents/" + rpgPlayer.skill4 + ".jpg";
    did("skillButton4").style.border = "2px solid " + returnQualityColor(rpgPlayer.skill4)
  } else removeSkill(4)


  function removeSkill(number){
    did("skillSlot"+number).src = "img/src/icons/skill"+number+"Slot.png";
    did("skillButton"+number).style.border = "none"
  }

}

setInterval(manaUpdate, 1000); 
function manaUpdate(){

 if (rpgPlayer.mana < playerMaxMana ) rpgPlayer.mana += playerManaRegen

 if (rpgPlayer.mana > playerMaxMana ) rpgPlayer.mana = playerMaxMana


 let percentageEXP =  (rpgPlayer.mana/playerMaxMana)*96;  

 did('magicBar').style.width = percentageEXP+"%";

 did('magicBar').style.background = rpgClass[stats.currentClass].color

 if (rpgPlayer.skill0!== "none" && talent[rpgPlayer.skill0].cost>=rpgPlayer.mana) {did("skillSlot0").style.filter = "brightness(0.6)"} else {did("skillSlot0").style.filter = "brightness(1)"}
 if (rpgPlayer.skill1!== "none" && talent[rpgPlayer.skill1].cost>=rpgPlayer.mana) {did("skillSlot1").style.filter = "brightness(0.6)"} else {did("skillSlot1").style.filter = "brightness(1)"}
 if (rpgPlayer.skill2!== "none" && talent[rpgPlayer.skill2].cost>=rpgPlayer.mana) {did("skillSlot2").style.filter = "brightness(0.6)"} else {did("skillSlot2").style.filter = "brightness(1)"}
 if (rpgPlayer.skill3!== "none" && talent[rpgPlayer.skill3].cost>=rpgPlayer.mana) {did("skillSlot3").style.filter = "brightness(0.6)"} else {did("skillSlot3").style.filter = "brightness(1)"}
 if (rpgPlayer.skill4!== "none" && talent[rpgPlayer.skill4].cost>=rpgPlayer.mana) {did("skillSlot4").style.filter = "brightness(0.6)"} else {did("skillSlot4").style.filter = "brightness(1)"}

 

}

setInterval(updateSkillCD, 1000); 
function updateSkillCD(){

  for (i in talent) { if ("cast" in talent[i] && talent[i].currentCd>0) talent[i].currentCd-- }
    
  

  if (rpgPlayer.skill0!== "none"){ let percentage = ((talent[rpgPlayer.skill0].currentCd / talent[rpgPlayer.skill0].cd) * 100); did("skillSlot0CD").style.height = percentage+"%";}
  if (rpgPlayer.skill1!== "none"){ let percentage = ((talent[rpgPlayer.skill1].currentCd / talent[rpgPlayer.skill1].cd) * 100); did("skillSlot1CD").style.height = percentage+"%";}
  if (rpgPlayer.skill2!== "none"){ let percentage = ((talent[rpgPlayer.skill2].currentCd / talent[rpgPlayer.skill2].cd) * 100); did("skillSlot2CD").style.height = percentage+"%";}
  if (rpgPlayer.skill3!== "none"){ let percentage = ((talent[rpgPlayer.skill3].currentCd / talent[rpgPlayer.skill3].cd) * 100); did("skillSlot3CD").style.height = percentage+"%";}
  if (rpgPlayer.skill4!== "none"){ let percentage = ((talent[rpgPlayer.skill4].currentCd / talent[rpgPlayer.skill4].cd) * 100); did("skillSlot4CD").style.height = percentage+"%";}
    
 
}




//#endregion
//----------------------==========================-----------------------
//----------------------========GEAR SLOTS========-----------------------
//----------------------==========================-----------------------
//#region Gear


function initGear(slot, div) { //Assign individual piece to individual slot
  //initialisation of the gear
  if (slot !== "none") {
    //if something is on the slot variable
    let ID = slot; //id becomes the value of rpgPlayyer.slot
    did(div).innerHTML = ""; //removes the default slot
    if (did(ID + "item")) {
      did(div).appendChild(did(ID + "item"));
    }
    eval(items[ID].stats);
    setBonus();
    statsUpdate();
    updateStatsUI();
  }
}

function initGearAll() { //Assign all pieces to all slots, also resets Haste
  initGear(rpgPlayer.feetSlot, "rpgFeetSlot");
  initGear(rpgPlayer.headSlot, "rpgHeadSlot");
  initGear(rpgPlayer.chestSlot, "rpgChestSlot");
  initGear(rpgPlayer.legsSlot, "rpgLegsSlot");
  initGear(rpgPlayer.handsSlot, "rpgHandsSlot");
  initGear(rpgPlayer.ringSlot, "rpgRingSlot");
  initGear(rpgPlayer.trinketSlot, "rpgTrinketSlot");
  initGear(rpgPlayer.weaponSlot, "rpgWeaponSlot");
  clearInterval(playerAttackInterval);
  playerAttackInterval = setInterval(playerAttack, playerHaste);

  if (rpgPlayer.weaponSlot!='none') weaponSwap(rpgPlayer.weaponSlot)
}

function gearSwap(ID, slot, div, category) {
  if (did(ID + "item")) {
    if (slot !== "none") {



      eval(items[slot].remove);



    }
    let armor = category;
    if (armor === "feet") rpgPlayer.feetSlot = ID;
    if (armor === "head") rpgPlayer.headSlot = ID;
    if (armor === "hands") rpgPlayer.handsSlot = ID;
    if (armor === "chest") rpgPlayer.chestSlot = ID;
    if (armor === "legs") rpgPlayer.legsSlot = ID;
    if (armor === "ring") rpgPlayer.ringSlot = ID;
    if (armor === "trinket") rpgPlayer.trinketSlot = ID;
    if (armor === "weapon") rpgPlayer.weaponSlot = ID;
    did(div).innerHTML = "";
    if (did(ID + "item")) {
      did(div).appendChild(did(ID + "item"));
    }
    eval(items[ID].stats);
    if (rpgPlayer.weaponSlot!='none') weaponSwap(rpgPlayer.weaponSlot)
    setBonus();
    stampStatUp();
    statsUpdate();
    updateStatsUI();
    addItem();
    clearInterval(playerAttackInterval);
    playerAttackInterval = setInterval(playerAttack, playerHaste);
  }
}

function removeGear(div, slot, path, category) { //right click functionality
  //on right click the piece
  did(div).addEventListener("contextmenu", function () {
    if (slot !== "none") {
      while (did(div).firstChild) {
        did("inventory").appendChild(did(div).firstChild);
      }
    }
    did(div).innerHTML = path;
    let armor = category;
    if (armor === "feet" && rpgPlayer.feetSlot !== "none") {
      eval(items[rpgPlayer.feetSlot].remove);
      rpgPlayer.feetSlot = "none";
    }
    if (armor === "head" && rpgPlayer.headSlot !== "none") {
      eval(items[rpgPlayer.headSlot].remove);
      rpgPlayer.headSlot = "none";
    }
    if (armor === "hands" && rpgPlayer.handsSlot !== "none") {
      eval(items[rpgPlayer.handsSlot].remove);
      rpgPlayer.handsSlot = "none";
    }
    if (armor === "chest" && rpgPlayer.chestSlot !== "none") {
      eval(items[rpgPlayer.chestSlot].remove);
      rpgPlayer.chestSlot = "none";
    }
    if (armor === "legs" && rpgPlayer.legsSlot !== "none") {
      eval(items[rpgPlayer.legsSlot].remove);
      rpgPlayer.legsSlot = "none";
    }
    if (armor === "ring" && rpgPlayer.ringSlot !== "none") {
      eval(items[rpgPlayer.ringSlot].remove);
      rpgPlayer.ringSlot = "none";
    }
    if (armor === "trinket" && rpgPlayer.trinketSlot !== "none") {
      eval(items[rpgPlayer.trinketSlot].remove);
      rpgPlayer.trinketSlot = "none";
    }
    if (armor === "weapon" && rpgPlayer.weaponSlot !== "none") {
      eval(items[rpgPlayer.weaponSlot].remove);
      rpgPlayer.weaponSlot = "none";
      weaponSwap('W0')
    }
    setBonus();
    statsUpdate();
    updateStatsUI();
    addItem();
    resetTooltip();
    clearInterval(playerAttackInterval);
    playerAttackInterval = setInterval(playerAttack, playerHaste);
  });
}

//#region removeGear //All the handlers of the function above
removeGear(
  "rpgFeetSlot",
  rpgPlayer.feetSlot,
  '<div class="mejoraComunSlot"><img src="img/sys/feetSlot.png"></div>',
  "feet"
);
removeGear(
  "rpgHeadSlot",
  rpgPlayer.headSlot,
  '<div class="mejoraComunSlot"><img src="img/sys/headSlot.png"></div>',
  "head"
);
removeGear(
  "rpgHandsSlot",
  rpgPlayer.handsSlot,
  '<div class="mejoraComunSlot"><img src="img/sys/handsSlot.png"></div>',
  "hands"
);
removeGear(
  "rpgChestSlot",
  rpgPlayer.feetSlot,
  '<div class="mejoraComunSlot"><img src="img/sys/chestSlot.png"></div>',
  "chest"
);
removeGear(
  "rpgLegsSlot",
  rpgPlayer.legsSlot,
  '<div class="mejoraComunSlot"><img src="img/sys/legsSlot.png"></div>',
  "legs"
);
removeGear(
  "rpgRingSlot",
  rpgPlayer.ringSlot,
  '<div class="mejoraComunSlot"><img src="img/sys/ringSlot.png"></div>',
  "ring"
);
removeGear(
  "rpgTrinketSlot",
  rpgPlayer.trinketSlot,
  '<div class="mejoraComunSlot"><img src="img/sys/trinketSlot.png"></div>',
  "trinket"
);
removeGear(
  "rpgWeaponSlot",
  rpgPlayer.weaponSlot,
  '<div class="mejoraComunSlot"><img src="img/sys/weaponSlot.png"></div>',
  "weapon"
);
//#endregion

function weaponSwap(ID) { //Ui of the weaponmodel 
  did("playerWeapon").src = "img/src/weaponModels/" + ID + ".png";
}

var currentSet = "none"

function setBonus() {
  let h = rpgPlayer.headSlot;
  let c = rpgPlayer.chestSlot;
  let l = rpgPlayer.legsSlot;
  let f = rpgPlayer.feetSlot;
  let d = rpgPlayer.handsSlot;
  let w = rpgPlayer.weaponSlot;
  let t = rpgPlayer.trinketSlot;
  let r = rpgPlayer.ringSlot;

  if (h === "I3" && c === "I5" && l === "I6" && f === "I2" && d === "I4") { //cloth
    did("rpgPlayerImg").src = "img/src/armor/A1.png";
    currentSet = "cloth";
  } 
  else if (h === "I133" && c === "I135" && l === "I136" && f === "I132" && d === "I134") { //jungle king
    did("rpgPlayerImg").src = "img/src/armor/A4.png";
    currentSet="tiger";
    updateAlignUi();
  }
  else if ( f === "I138" &&  h === "I139" && d === "I140" && c === "I141" && l === "I142") { //pringu
    did("rpgPlayerImg").src = "img/src/armor/A7.png";
    currentSet="pringu";
  }
  else if ( f === "I143" &&  h === "I144" && d === "I145" && c === "I146" && l === "I147") { //captain
    did("rpgPlayerImg").src = "img/src/armor/A8.png";
    currentSet="captain";
    did("rpgPlayerImg").style.opacity = 0.8
  } 
  else if ( h === "I74" && c === "I76" && l === "I77" && f === "I73" && d === "I75" ) { //explorer
    did("rpgPlayerImg").src = "img/src/armor/A3.png";
    currentSet="explorer";
    updateAlignUi();
  } 
  else if ( h === "I59" ) { //frog hat
    did("rpgPlayerImg").src = "img/src/armor/A5.png";
    currentSet = "none";
    did("rpgPlayerImg").style.opacity = 1;
    updateAlignUi();
  } 
  else { //no tier
    did("rpgPlayerImg").src = "img/src/armor/A0.png";
    currentSet = "none";
    did("rpgPlayerImg").style.opacity = 1;
    updateAlignUi(); //lo que hay que ahcer aqui es una var llamada tierbonus y luego segun el valor de tierbonus hacer una cosa u otra
  }

  if ( h !== "none" && c !== "none" && l !== "none" && f !== "none" && d !== "none" && w !== "none" && t !== "none" && r !== "none" ) logTrackFullSlots = true;
}

function updateAlignUi(){

  if (rpgPlayer.align === 'none') did('turtleAlign').style.display = "none"
  else did('turtleAlign').style.display = "inline";

  if (rpgPlayer.align === 'nature') did('turtleAlign').src='img/src/icons/nature.png'
  if (rpgPlayer.align === 'might') did('turtleAlign').src='img/src/icons/might.png'
  if (rpgPlayer.align === 'elemental') did('turtleAlign').src='img/src/icons/elemental.png'
  if (rpgPlayer.align === 'deific') did('turtleAlign').src='img/src/icons/deific.png'
  if (rpgPlayer.align === 'occult') did('turtleAlign').src='img/src/icons/occult.png'



}updateAlignUi()
//#endregion
//----------------------==========================-----------------------
//----------------------=========TOOLTIPS=========-----------------------
//----------------------==========================-----------------------
//#region Tooltips
function tooltipItems(item) {
  if (did(item.id + "item")) {
    did(item.id + "item").addEventListener("mouseenter", function () {
      //on mouseenter
      did("tooltip").style.display = "flex";
      did("tooltipArrow").style.right = "23%";

      let itemLevel = ""

      if (item.upgradeable && item.id !== "I281") itemLevel = returnQualityColor(item.count.toString())


      did("tooltipName").innerHTML = item.name + itemLevel;
      did("tooltipPrice").innerHTML = "";
      did("tooltipPrice").innerHTML = "("+item.count+")";
      if (item.max !== playerMaxStack) did("tooltipPrice").innerHTML = "(Max " + item.max + ")";
      if (item.max === 1 || item.upgradeable) did("tooltipPrice").innerHTML = "(Unique)";

      if ("align" in item)  did("tooltipRarity").innerHTML = item.quality + '<br><img class="alignTooltipIcon" src="img/src/icons/'+item.align+'.png"></img>'; 
      else did("tooltipRarity").innerHTML = item.quality;

      did("tooltipRarity").style.color = returnQualityColor(item.quality);
      did("tooltipName").style.color = returnQualityColor(item.quality);
      
      var separadorDesc = '<br><div class="separador"></div>'

      var sellText = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">' + beautify(item.sell*multiplicativeSellValue) + " (" + beautify((item.sell*multiplicativeSellValue) * item.count) + ") "+coinIcon+"Turtle Coins<br></div>";
      if (item.count === 1 && item.sell>0) sellText = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">' + beautify(item.sell*multiplicativeSellValue) + " "+coinIcon+"Turtle Coins<br></div>";
      if (item.upgradeable) sellText = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">' + beautify((item.sell*multiplicativeSellValue)*item.count) + " "+coinIcon+"Turtle Coins<br></div>";
      if (item.sell === 0) sellText = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ed4e4e"> Non Sellable<br></div>'


      var stamp1 = "";
      var stamp2 = "";
      var stamp3 = "";

      if ("stamp1" in item) stamp1 = '<br><br><FONT COLOR=#42a7f5>[Stamps]<FONT COLOR="white"><br>'+ stampIcon + '<span class="logStat"> '+returnStampName(item.stamp1)+'</span>'
      if ("stamp2" in item) stamp2 = '<br>' + stampIcon + '<span class="logStat"> '+returnStampName(item.stamp2)+'</span>'
      if ("stamp3" in item) stamp3 = '<br>' + stampIcon + '<span class="logStat"> '+returnStampName(item.stamp3)+'</span>'


      var tierArmorBonus = ""
      var tierDesc1 = ""
      var tierDesc2 = ""
      var tierDesc3 = ""
      var tierDesc4 = ""
      var tierDesc5 = ""
      var tierDescTotal = ""

      if ("tierArmorBonus" in item) {
        
      if (rpgPlayer.headSlot === item.tierDesc1) { tierDesc1 = '<FONT COLOR="#1EFF0C">❖ '+ items[item.tierDesc1].name } else { tierDesc1 = '<FONT COLOR="gray">❖ '+ items[item.tierDesc1].name }
      if (rpgPlayer.chestSlot === item.tierDesc2) { tierDesc2 = '<FONT COLOR="#1EFF0C">❖ '+ items[item.tierDesc2].name } else { tierDesc2 = '<FONT COLOR="gray">❖ '+ items[item.tierDesc2].name }
      if (rpgPlayer.handsSlot === item.tierDesc3) { tierDesc3 = '<FONT COLOR="#1EFF0C">❖ '+ items[item.tierDesc3].name } else { tierDesc3 = '<FONT COLOR="gray">❖ '+ items[item.tierDesc3].name }
      if (rpgPlayer.legsSlot === item.tierDesc4) { tierDesc4 = '<FONT COLOR="#1EFF0C">❖ '+ items[item.tierDesc4].name } else { tierDesc4 = '<FONT COLOR="gray">❖ '+ items[item.tierDesc4].name }
      if (rpgPlayer.feetSlot === item.tierDesc5) { tierDesc5 = '<FONT COLOR="#1EFF0C">❖ '+ items[item.tierDesc5].name } else { tierDesc5 = '<FONT COLOR="gray">❖ '+ items[item.tierDesc5].name } 

      if (rpgPlayer.headSlot === item.tierDesc1 && rpgPlayer.chestSlot === item.tierDesc2 && rpgPlayer.handsSlot === item.tierDesc3 && rpgPlayer.legsSlot === item.tierDesc4 && rpgPlayer.feetSlot === item.tierDesc5){
        tierArmorBonus = '<FONT COLOR="#b983f7">'+item.tierArmorBonus
      } else tierArmorBonus = '<FONT COLOR="gray">'+item.tierArmorBonus

      var tierDescTotal = tierDesc1+"<br>"+tierDesc2+"<br>"+tierDesc3+"<br>"+tierDesc4+"<br>"+tierDesc5+"<br>"+tierArmorBonus

      }

      var collectibleDesc = ""

      if ("collectible" in item) { 
        if (item.statUp==="got") collectibleDesc = '<br><span style="background:#7db7db; padding: 0 2%; border-radius: 0.6vh;"><FONT COLOR="black">Collected</span>'
        else collectibleDesc = '<br><span style="background:coral; padding: 0 2%; border-radius: 0.6vh;"><FONT COLOR="black">Not Collected</span><br><FONT COLOR="orange">❖ Right Click to add to your collection'
      }

      var seriesDesc = ""

      if ("series" in item) { 
        seriesDesc = returnQualityColor(item.series)
      }


      did("tooltipDescription").innerHTML = item.description + collectibleDesc + tierDescTotal + stamp1 + stamp2 + stamp3 + separadorDesc + seriesDesc + sellText
      if (item.upgradeable || item.dynamic) did("tooltipDescription").innerHTML = eval(item.description) + tierDescTotal + stamp1 + stamp2 + stamp3 + separadorDesc+ seriesDesc + sellText

      did("tooltipFlavor").textContent = item.flavor;
      did("tooltipImage").src = "img/src/items/" + item.img + ".jpg";
      //position related code

      var movingDiv = did("tooltip");
      var referenceDiv = did(item.id + "item");
      var referenceRect = referenceDiv.getBoundingClientRect();

      if (did("gearFlex").contains(did(item.id + "item"))) {
        // if the item is equipped
        var referenceLeft = referenceRect.left - movingDiv.offsetWidth - 25; // Cambiar aquí para posicionar la parte superior derecha del tooltip en la parte superior izquierda del item
        var referenceTop = referenceRect.top - 5;
        var newLeft = referenceLeft;
        var newTop = referenceTop;
        movingDiv.style.left = newLeft + "px";
        movingDiv.style.top = newTop + "px";
        did("tooltipArrow").style.display = "none";
        did("tooltipArrowRight").style.display = "flex";
        did("tooltipArrowRight").style.top = "13%";
      } else {
        var referenceLeft = referenceRect.left + 80;
        var referenceTop = referenceRect.top - 15;
        var newLeft =
          referenceLeft + referenceRect.width - movingDiv.offsetWidth;
        var newTop = referenceTop - movingDiv.offsetHeight;
        movingDiv.style.left = newLeft + "px";
        movingDiv.style.top = newTop + "px";
      }

      if ("use" in item && item.use.startsWith("stampWeapon") && rpgPlayer.weaponSlot !== "none") {
        setTimeout(() => {
      movingDiv = did("stampMenu");
      referenceDiv = did("tooltip");
      referenceRect = referenceDiv.getBoundingClientRect();
      var newLeft = referenceRect.right + 10;
      var newTop = referenceRect.top - 0;
      
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";
      did("stampMenu").style.display="flex" 
      }, 100);

      did("stampMenuImg").src = "img/src/items/"+items[rpgPlayer.weaponSlot].img+".jpg" 
      did("stampMenuName").innerHTML = items[rpgPlayer.weaponSlot].name
      updateStampMenu();

      }


      if (item.id === "I220"){  did("tortugaClick").src = "img/src/tortugasdefault/imgpog.png"; }
       
      


    });
    did(item.id + "item").addEventListener("mouseleave", function () {
      resetTooltip();
      setTimeout(() => { did("stampMenu").style.display="none"}, 100);
      if (item.id === "I220"){  did("tortugaClick").src = "img/src/tortugasdefault/img1.png"; }
    });
  }
}

function updateStampMenu(){

  var stamp1 = "";
  var stamp2 = "";
  var stamp3 = "";

  if ("stamp1" in items[rpgPlayer.weaponSlot]) stamp1 = '<FONT COLOR=#42a7f5>[Stamps]<FONT COLOR="white"><br>'+ stampIcon + '<span class="logStat"> '+returnStampName(items[rpgPlayer.weaponSlot].stamp1)+'</span>'
  if ("stamp2" in items[rpgPlayer.weaponSlot]) stamp2 = '<br>' + stampIcon + '<span class="logStat"> '+returnStampName(items[rpgPlayer.weaponSlot].stamp2)+'</span>'
  if ("stamp3" in items[rpgPlayer.weaponSlot]) stamp3 = '<br>' + stampIcon + '<span class="logStat"> '+returnStampName(items[rpgPlayer.weaponSlot].stamp3)+'</span>'

  did("stampMenuDescription").innerHTML = stamp1+stamp2+stamp3+"<br><br>"

}

statTips = [

'<FONT COLOR="#edd585">When you level up, your Strength, Max Health and Regeneration go up.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
'<FONT COLOR="#edd585">Be sure to pay attention to alignments!<br><br><img id="chartImage" src="img/src/icons/alignChart.png"><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
'<FONT COLOR="#edd585">Haste determines the speed of your attack over the base 100%.<div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
'<FONT COLOR="#edd585">When Drop Chance goes over 100%, youll have the chance of getting multiple items per kill.<div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
'<FONT COLOR="#edd585">Stamps are multiplicative with other bonuses, making them always very strong!<div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
'<FONT COLOR="#edd585">If your Crit Chance is over 100%, you can deal crits that deal more damage than regular ones.<div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
'<FONT COLOR="#edd585">Damage dealt by skills do not benefit from flat bonuses but do from percentage based ones such as food and potions.<div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
'<FONT COLOR="#edd585">Additional gathering level that surpass the met requirement will transform into +1 extra drop per level.<div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
'<FONT COLOR="#edd585">Additional fishing level will increase both the quality and quantity of the catch.<div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',

]

function tooltipStatsHelpingDuck() {
  let tipNumber = 0;

  did('statsHelpingDuck').addEventListener("click", function () {
    tipNumber++
    if (tipNumber>statTips.length-1) tipNumber = 0

    playSound("audio/button3.mp3")

    did("tooltipArrowRight").style.top = "30%";
    did("tooltipDescription").innerHTML = statTips[tipNumber];
    if (tipNumber===1)did("tooltipArrowRight").style.top = "10%";

  })

    did('statsHelpingDuck').addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";

    did("tooltipArrowRight").style.top = "30%";
    did("tooltipDescription").innerHTML = statTips[tipNumber];
    if (tipNumber===1)did("tooltipArrowRight").style.top = "10%";

      

      var movingDiv = did("tooltip");
      var referenceDiv = did('statsHelpingDuck');
      var referenceRect = referenceDiv.getBoundingClientRect();
      var referenceLeft = referenceRect.left - movingDiv.offsetWidth - 25; // Cambiar aquí para posicionar la parte superior derecha del tooltip en la parte superior izquierda del item
      var referenceTop = referenceRect.top - 5;
      var newLeft = referenceLeft;
      var newTop = referenceTop;
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";
      did("tooltipArrow").style.display = "none";
      did("tooltipArrowRight").style.display = "flex";
      
    });
    did('statsHelpingDuck').addEventListener("mouseleave", function () {
      resetTooltip();
    });
}tooltipStatsHelpingDuck()

inventoryTips = [

  '<FONT COLOR="#edd585">There is no limit of how many items you can have on the inventory (at least i didnt code one...!)<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Hold Shift to sell your items.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Gear marked as "Unique" will level up with multiple copies of itself, but only if they have a roman numeral at the side of their name.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Drops marked with a ★ are rare and wont be increased by the Drop Chance stat.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Is the enemy too hard? Be sure to check its description and skills to fight accordingly.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Complete missions to recieve useful rewards in the mail.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">You can buy multiple items at once in the shop by pressing Shift.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Defeating low-level enemies can yield more materials and money at the expense of experience.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Area bosses are a great source of experience.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">Attributes marked with '+scalingIcon+'have unusually high upgrade scaling.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',
  '<FONT COLOR="#edd585">The materials found in chests scale with your progress, so be sure to always open them for easy drops.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips',



]

function tooltipInventoryHelpingDuck() {
  let tipNumber = 0;
  did('inventoryHelpingDuck').addEventListener("click", function () {
    tipNumber++
    if (tipNumber>inventoryTips.length-1) tipNumber = 0

    playSound("audio/button3.mp3")

    did("tooltipArrowRight").style.top = "30%";
    did("tooltipDescription").innerHTML = inventoryTips[tipNumber];


    const movingDiv = did("tooltip");
    const referenceDiv = did("inventoryHelpingDuck");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 40;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";

  })

    did('inventoryHelpingDuck').addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";

    did("tooltipDescription").innerHTML = inventoryTips[tipNumber];

    const movingDiv = did("tooltip");
    const referenceDiv = did("inventoryHelpingDuck");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 40;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
      
    });
    did('inventoryHelpingDuck').addEventListener("mouseleave", function () {
      resetTooltip();
    });
}tooltipInventoryHelpingDuck()

let tooltipHover = "nothing"

function tooltipShopItem(outcome, shop) {
  if (did(outcome.id + "shopItem") && outcome.unlocked !== false) {
    did(outcome.id + "shopItem").addEventListener("mouseenter", function () {

      tooltipHover = "shopItem"

      document.addEventListener("keydown", function (event) { 
        if (event.shiftKey && tooltipHover === "shopItem") {
          did("tooltipName").textContent = items[outcome.item].name+" x10";

          did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(shopItems[shop].price)*10) + ' '+coinIcon+'Turtle Coins<br></div><div class="separador"></div><FONT COLOR="white">' +  items[outcome.item].description + '<br><div class="separador"></div>';
          if (items[outcome.item].upgradeable) did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(shopItems[shop].price)*10) + ' '+coinIcon+'Turtle Coins<br></div><div class="separador"></div><FONT COLOR="white">' +  eval(items[outcome.item].description) + '<br><div class="separador"></div>';

          if (rpgPlayer.coins<eval(shopItems[shop].price)) did("tooltipName").innerHTML = items[outcome.item].name+" x10 <FONT COLOR='coral'> [Cant Afford!]";
          if (shopItems[shop].stock<10) did("tooltipName").innerHTML = items[outcome.item].name+" x10 <FONT COLOR='coral'> [Not Enough Stock!]";
        }
      });

      document.addEventListener("keyup", function (event) { 
        if (event.key === "Shift" && tooltipHover === "shopItem") {
          did("tooltipName").textContent = items[outcome.item].name;
          
          did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(shopItems[shop].price)) + ' '+coinIcon+'Turtle Coins<br></div><div class="separador"></div><FONT COLOR="white">' +  items[outcome.item].description + '<br><div class="separador"></div>';
          if (items[outcome.item].upgradeable) did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(shopItems[shop].price)) + ' '+coinIcon+'Turtle Coins<br></div><div class="separador"></div><FONT COLOR="white">' +  eval(items[outcome.item].description) + '<br><div class="separador"></div>';

        }

      });


      did("tooltip").style.display = "flex";
      did("tooltipName").textContent = items[outcome.item].name;
      if (sellMode) did("tooltipName").textContent = items[outcome.item].name+" x10";
      did("tooltipPrice").innerHTML = "Stock: " + outcome.stock;
      did("tooltipRarity").textContent = items[outcome.item].quality;

      did("tooltipRarity").style.color = returnQualityColor(items[outcome.item].quality);
      did("tooltipName").style.color = returnQualityColor(items[outcome.item].quality);

      did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(shopItems[shop].price)) + ' '+coinIcon+'Turtle Coins<br></div><div class="separador"></div><FONT COLOR="white">' +  items[outcome.item].description + '<br><div class="separador"></div>';
      if (items[outcome.item].upgradeable) did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(shopItems[shop].price)) + ' '+coinIcon+'Turtle Coins<br></div><div class="separador"></div><FONT COLOR="white">' +  eval(items[outcome.item].description) + '<br><div class="separador"></div>';

      if (sellMode) did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(eval(shopItems[shop].price)*10) + ' '+coinIcon+'Turtle Coins<br></div><div class="separador"></div><FONT COLOR="white">' +  items[outcome.item].description + '<br><div class="separador"></div>';
      did("tooltipFlavor").textContent = items[outcome.item].flavor;
      did("tooltipImage").src = "img/src/items/" + items[outcome.item].img + ".jpg";
      var movingDiv = did("tooltip");
      var referenceDiv = did(outcome.id + "shopItem");
      var referenceRect = referenceDiv.getBoundingClientRect();
      var referenceLeft = referenceRect.left + 26;
      var referenceTop = referenceRect.top - 15;
      var newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
      var newTop = referenceTop - movingDiv.offsetHeight;
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";
    });
    did(outcome.id + "shopItem").addEventListener("mouseleave", function () {
      resetTooltip();
      tooltipHover = "nothing"
    });
  }
}

function tooltipEnemies() {
  did("enemyAnimation").addEventListener("mouseenter", function () {
    //on mouseenter
    did("tooltip").style.display = "flex";

    did("tooltipName").innerHTML = enemies[stats.currentEnemy].name;

    if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty))
      did("tooltipPrice").innerHTML = "Gathered:" + beautify(enemies[stats.currentEnemy].killCount);
    else
      did("tooltipPrice").innerHTML = "Defeated:" + beautify(enemies[stats.currentEnemy].killCount);

    if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) did("tooltipRarity").textContent = "Resource";
    else if ("align" in enemies[stats.currentEnemy]) did("tooltipRarity").innerHTML = "Enemy"+ '<br><img class="alignTooltipIcon" src="img/src/icons/'+enemies[stats.currentEnemy].align+'.png"></img>'; 
    else did("tooltipRarity").innerHTML = "Enemy";

    did("tooltipRarity").style.color = "white";
    did("tooltipName").style.color = "white";
    did("tooltipArrow").style.display = "none";
    did("tooltipArrowRight").style.display = "flex";

    let dropDesc = ""

    if ("dropDesc" in enemies[stats.currentEnemy]) dropDesc = '<br><br><FONT COLOR="#edd585">Dedicated Drops:<br>'+enemies[stats.currentEnemy].dropDesc ;
    
    did("tooltipDescription").innerHTML =  enemies[stats.currentEnemy].description+dropDesc

    did("tooltipFlavor").textContent = "";
    did("tooltipImage").src = "img/src/enemies/" + stats.currentEnemy + "M.png";

    if (stats.currentEnemy.startsWith("R")){ //overwrites everything if its a skirmish monster)
      did("tooltipImage").src = "img/src/enemies/S1.png";
      did("tooltipDescription").innerHTML = "A powerful contender from the monster arena. Defeat as many as you can to advance the waves and dont drop your guard down!"
    }
    //position related code
    const movingDiv = did("tooltip");
    const referenceDiv = did("enemyPanel");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceRight = referenceRect.left; // Cambiado
    const referenceTop = referenceRect.bottom + 10;
    const newLeft = referenceRight - movingDiv.offsetWidth; // Cambiado
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });

  did("enemyAnimation").addEventListener("mouseleave", function () {
    resetTooltip();
  });
} tooltipEnemies();

function tooltipBuffs() {
  for (let b in buffs) {
    if (did(b + "buff")) {
      did(b + "buff").addEventListener("mouseenter", function () {
        //on mouseenter
        did("tooltip").style.display = "flex";
        did("tooltipName").textContent = buffs[b].name;
        did("tooltipPrice").innerHTML = convertSecondsToHMS(buffs[b].time);
        did("tooltipRarity").textContent = "Buff";
        did("tooltipRarity").style.color = "#83e781";
        if (buffs[b].food) did("tooltipRarity").textContent = "Food Buff";
        if (buffs[b].potion) did("tooltipRarity").textContent = "Potion Buff";
        if (buffs[b].food) did("tooltipRarity").textContent = "Food Buff";
        if (buffs[b].buff != true) {did("tooltipRarity").textContent = "Debuff"; did("tooltipRarity").style.color = "#bf3b32";}


        did("tooltipName").style.color = "white";
        did("tooltipDescription").innerHTML = buffs[b].description;
        did("tooltipFlavor").textContent = "";
        did("tooltipImage").src = buffs[b].img;

        //position related code
        const movingDiv = did("tooltip");
        const referenceDiv = did(b + "buff");
        const referenceRect = referenceDiv.getBoundingClientRect();

        if (buffs[b].turtle){
          did("tooltipArrow").style.right = '90%';
          const newLeft = referenceRect.left;
          const newTop = referenceRect.bottom-60 - movingDiv.offsetHeight;
          movingDiv.style.left = newLeft + "px";
          movingDiv.style.top = newTop + "px";

        } else {
        const referenceLeft = referenceRect.left + 33;
        const referenceTop = referenceRect.top - 15;
        const newLeft =referenceLeft + referenceRect.width - movingDiv.offsetWidth;
        const newTop = referenceTop - movingDiv.offsetHeight;
        movingDiv.style.left = newLeft + "px";
        movingDiv.style.top = newTop + "px";
      }

      });
      did(b + "buff").addEventListener("mouseleave", function () {
        resetTooltip();
      });
    }
  }
}

function tooltipAreas(id) {
  if (did(id + "area")) {
    did(id + "area").addEventListener("mouseenter", function () {
      //on mouseenter
      did("tooltip").style.display = "flex";
      did("tooltipName").textContent = areas[id].name;
      did("tooltipPrice").innerHTML = "";
      did("tooltipRarity").textContent = "Area";
      did("tooltipRarity").style.color = "white";
      did("tooltipName").style.color = "white";

      if (areas[id].dungeon) did("tooltipRarity").textContent = "Dungeon"



      let description1 = ""
      if (rpgClass[stats.currentClass].level<areas[id].level) description1 = "<FONT COLOR='#fc2626'>You dont meet the level requirement for this area<br>"

      let description05 = ""
      if (!areas[id].dungeon) description05 = "<FONT COLOR='white'>Select this area to travel to " + areas[id].name + "<br>"

      let description2 = ""
      
      if (areas[id].dungeonTimer>0) { description2 = 'You can enter again in <span style="background:#e03841; padding: 0 2%; border-radius: 0.6vh"><FONT COLOR="white">'+convertSecondsToHMS(areas[id].dungeonTimer, "mini")+'</span> or use a <span style="background:#4065c2; padding: 0 2%; border-radius: 0.6vh;white-space: nowrap"><FONT COLOR="white">Dungeon Voucher</span><br><div class="separador"></div>';}
      else description2 = ""       

      did("tooltipDescription").innerHTML = description1 + description05 + description2



      did("tooltipFlavor").textContent = areas[id].description;
      did("tooltipImage").src = "img/src/areas/" + id + "M.png";
      //position related code
      const movingDiv = did("tooltip");
      const referenceDiv = did(id + "area");
      const referenceRect = referenceDiv.getBoundingClientRect();
      const referenceLeft = referenceRect.left + 0;
      const referenceTop = referenceRect.top - 15;
      const newLeft =
        referenceLeft + referenceRect.width - movingDiv.offsetWidth;
      const newTop = referenceTop - movingDiv.offsetHeight;
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";
    });
    did(id + "area").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }
}

function tooltipTalents(id) {
  if (did(id + "talent")) {
    did(id + "talent").addEventListener("mouseenter", function () {

      did("tooltip").style.display = "flex"; 
      did("tooltip").style.backgroundImage = "url(img/sys/space.gif)";
      did("tooltipName").textContent = talent[id].name;
      did("tooltipRarity").textContent = talent[id].category;

      did("tooltipArrow").style.display = "none";
      did("tooltipArrowRight").style.display = "flex";
      did("tooltipArrowRight").style.top = "54%";

      did("tooltipName").style.color = returnQualityColor(id);
      did("tooltipRarity").style.color = returnQualityColor(id);

      let description2 = "";
      if (!talent[id].active) description2 = '<br><br><div class="separador"></div><FONT COLOR="#edd585">Left Click to allocate 1 Talent Point into this star'

      let description1 = "";
      if ("parent" in talent[id]) description1 = '<FONT COLOR="#ff1f1f">Requires '+ talent[talent[id].parent].name + '<br><br>';

      let classDescription = "";
      if (talent[id].category==='Class') classDescription = '<FONT COLOR="#f7ff66">Current Level: '+ rpgClass[id].level + '<br><FONT COLOR="#f7ff66">Max Level: '+ rpgClass[id].maxLevel + '<br><br>';

      let castDescription = ""
      if ("cast" in talent[id]) castDescription = "<span style='color:gray'>Consumes "+eval(talent[id].cost)+" SP<br>"+talent[id].cd+"s Cooldown</span><br><br>"

      let bonusDescription = ""
      if ("logic" in talent[id]) bonusDescription = "<br><br><span class='logStat'>[Current Bonus: "+beautify(eval(talent[id].logic)*100)+"%]</span>"

      
      did("tooltipDescription").innerHTML = description1 + classDescription + castDescription + '<FONT COLOR="lightgray">'+ talent[id].description + bonusDescription + description2

      did("tooltipFlavor").textContent = "";
      did("tooltipImage").src = "img/src/talents/" + id + ".jpg";

      did("tooltipPrice").innerHTML = '<FONT COLOR="#ff1f1f">Inactive';
      if (talent[id].active) did("tooltipPrice").innerHTML ='Active'

      const movingDiv = document.getElementById("tooltip");
      const referenceDiv = document.getElementById(id + "talent");
      
      const referenceRect = referenceDiv.getBoundingClientRect();
      const referenceCenterX = referenceRect.left + referenceRect.width / 2;
      const referenceCenterY = referenceRect.top + referenceRect.height / 2;
      
      const newLeft = referenceCenterX - movingDiv.offsetWidth -30;
      const newTop = referenceCenterY - movingDiv.offsetHeight / 2;
      
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";

    });
    did(id + "talent").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }
}

function tooltipQuests(id) {
  if (did(id + "quest")) {
    did(id + "quest").addEventListener("mouseenter", function () {
      //on mouseenter
        did("tooltip").style.display = "flex";
        did("tooltipName").innerHTML = quests[id].name;
        did("tooltipPrice").innerHTML = "";
        did("tooltipRarity").textContent = "Quest";
        did("tooltipRarity").style.color = "#FFD100";
        did("tooltipName").style.color = "#FFD100";
        did("tooltipDescription").innerHTML = '“ '+quests[id].description+' ”<br><br><span style="color:#FFD100; font-size:1vw"> Objective:</span><br><span style="color:#deaf6a">❖ '+quests[id].objective+'</span><br><br><span style="color:#FFD100; font-size:1vw"> Rewards:</span></span><br><span style="color:#79ed8b">★ '+eval(quests[id].rewardIcon)+quests[id].reward+'</span><br><span style="color:#ffbd54">★ '+beautify(quests[id].money)+' '+coinIcon+'Turtle Coins</span><br><span style="color:#ae77f7">★ '+beautify(quests[id].exp)+' '+expIcon+'Experience</span>'
        did("tooltipFlavor").textContent = "";
        did("tooltipImage").src = "img/src/items/quest.jpg";
        //position related code
        const movingDiv = did("tooltip");
        const referenceDiv = did(id + "quest");
        const referenceRect = referenceDiv.getBoundingClientRect();
        const referenceLeft = referenceRect.left + 0;
        const referenceTop = referenceRect.top - 15;
        const newLeft =
          referenceLeft + referenceRect.width - movingDiv.offsetWidth;
        const newTop = referenceTop - movingDiv.offsetHeight;
        movingDiv.style.left = newLeft + "px";
        movingDiv.style.top = newTop + "px";
      
    });
    did(id + "quest").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }
}

function tooltipSkill(id, full) {
  if (did(full)) {
    did(full).addEventListener("mouseenter", function () {
        did("tooltip").style.display = "flex";
        did("tooltipName").innerHTML = talent[id].name;
        did("tooltipPrice").innerHTML = "";
        did("tooltipRarity").textContent = talent[id].category;
        did("tooltipRarity").style.color = returnQualityColor(id);
        did("tooltipName").style.color = returnQualityColor(id);
        did("tooltipArrow").style.display = "none";
        did("tooltipArrowRight").style.display = "flex";
        did("tooltipArrowRight").style.top = "20%";

        let assigndesc = '<br><br><div style=" text-align: center; background:transparent" ><div class="separador"></div><span style="color:gray">Press <FONT COLOR="orange">[1], [2] , [3]<FONT COLOR="gray"> or <FONT COLOR="orange">[4]<FONT COLOR="gray"> to assign this skill to the hotbar</span></div>'

        let castDescription = ""
        if ("cast" in talent[id]) castDescription = "<span style='color:gray'>Consumes "+eval(talent[id].cost)+" SP<br>"+talent[id].cd+"s Cooldown</span><br><br>"

        did("tooltipDescription").innerHTML = castDescription + talent[id].description + assigndesc;

        if (talent[id].category === "Class") did("tooltipDescription").innerHTML = '<FONT COLOR="#f7ff66">Current Level: '+ rpgClass[id].level + '<br><FONT COLOR="#f7ff66">Max Level: '+ rpgClass[id].maxLevel + '<br><br><FONT COLOR="white">'+ castDescription + talent[id].description + '<br><br><div style=" text-align: center; background:transparent" ><div class="separador"></div><FONT COLOR="orange">Click to swap to this class</span></div>';

        did("tooltipFlavor").textContent = "";
        did("tooltipImage").src = "img/src/talents/" + id + ".jpg";

        var movingDiv = did("tooltip");
        var referenceDiv = did(full);
        var referenceRect = referenceDiv.getBoundingClientRect();
        var referenceLeft = referenceRect.left - movingDiv.offsetWidth - 25; // Cambiar aquí para posicionar la parte superior derecha del tooltip en la parte superior izquierda del item
        var referenceTop = referenceRect.top - 5;
        var newLeft = referenceLeft;
        var newTop = referenceTop;
        movingDiv.style.left = newLeft + "px";
        movingDiv.style.top = newTop + "px";
          
    });
    did(full).addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }
}

function tooltipBossButton() {
  did("bossButton").addEventListener("mouseenter", function () {
    //on mouseenter
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";

    if (unlocks.autoBoss){
    if (!togleAutoBoss) did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Press to summon the boss of this area<FONT COLOR="#D83063"<br><br>Requires ['+items[areas[stats.currentArea].bossKey].name+'] x1<br><span style="background:black; padding: 0 2%; border-radius: 0.6vh"><FONT COLOR="coral">Auto-summon is turned OFF</span><br><FONT COLOR="white">(Right Click to activate)';
    else did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Press to summon the boss of this area<FONT COLOR="#D83063"<br><br>Requires ['+items[areas[stats.currentArea].bossKey].name+'] x1<br><span style="background:black; padding: 0 2%; border-radius: 0.6vh"><FONT COLOR="#44bd6c">Auto-summon is turned ON</span><br><FONT COLOR="white">(Right Click to deactivate)';
    } else did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Press to summon the boss of this area<FONT COLOR="#D83063"<br><br>Requires ['+items[areas[stats.currentArea].bossKey].name+'] x1';
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    const movingDiv = did("tooltip");
    const referenceDiv = did("bossButton");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 32;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });

  did("bossButton").addEventListener("mouseleave", function () {
    //on mouseleave
    resetTooltip();
  });
} tooltipBossButton();

function tooltipEncounterEasy() {
  did("encounterEasy").addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipDescription").innerHTML =
      '<FONT COLOR="#edd585">Press to fight a meddlesome foe';
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    const movingDiv = did("tooltip");
    const referenceDiv = did("encounterEasy");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 32;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });
  did("encounterEasy").addEventListener("mouseleave", function () {
    resetTooltip();
  });
} tooltipEncounterEasy();

function tooltipEncounterMedium() {
  did("encounterMedium").addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipDescription").innerHTML =
      '<FONT COLOR="#edd585">Press to fight a troublesome foe';
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    const movingDiv = did("tooltip");
    const referenceDiv = did("encounterMedium");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 32;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });
  did("encounterMedium").addEventListener("mouseleave", function () {
    resetTooltip();
  });
} tooltipEncounterMedium();

function tooltipEncounterHard() {
  did("encounterHard").addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipDescription").innerHTML =
      '<FONT COLOR="#edd585">Press to fight a frightsome foe';
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    const movingDiv = did("tooltip");
    const referenceDiv = did("encounterHard");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 32;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });
  did("encounterHard").addEventListener("mouseleave", function () {
    resetTooltip();
  });
} tooltipEncounterHard();

function tooltipMiningNode() {
  did("miningNode").addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipDescription").innerHTML =
      '<FONT COLOR="#edd585">Press to mine the vein of this area.';
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    const movingDiv = did("tooltip");
    const referenceDiv = did("miningNode");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 32;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });
  did("miningNode").addEventListener("mouseleave", function () {
    resetTooltip();
  });
} tooltipMiningNode();


function tooltipHerbNode() {
  did("herbNode").addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipDescription").innerHTML =
      '<FONT COLOR="#edd585">Press to gather the herbs of this area.';
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    const movingDiv = did("tooltip");
    const referenceDiv = did("herbNode");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 32;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });
  did("herbNode").addEventListener("mouseleave", function () {
    resetTooltip();
  });
} tooltipHerbNode();

function tooltipAlign() {
  did("turtleAlign").addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";

    if (rpgPlayer.align==="nature") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+mightIcon+' Might.';
    if (rpgPlayer.align==="might") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+elementalIcon+' Elemental.';
    if (rpgPlayer.align==="elemental") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+natureIcon+' Nature.';
    if (rpgPlayer.align==="occult") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+occultIcon+' Occult.';
    if (rpgPlayer.align==="deific") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+deificIcon+' Deific.';

    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    const movingDiv = did("tooltip");
    const referenceDiv = did("turtleAlign");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 40;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });
  did("turtleAlign").addEventListener("mouseleave", function () {
    resetTooltip();
  });
} tooltipAlign();

function tooltipMail(id) {
  did(id+"mail").addEventListener("mouseenter", function () {
    playSound("audio/button4.mp3")
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipDescription").innerHTML = mail[id].title;
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    const movingDiv = did("tooltip");
    const referenceDiv = did(id+"mail");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 15;
    const referenceTop = referenceRect.top - 18;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + "px";
    movingDiv.style.top = newTop + "px";
  });
  did(id+"mail").addEventListener("mouseleave", function () {
    resetTooltip();
  });
}
//#endregion
//----------------------==========================-----------------------
//----------------------===========BUFFS==========-----------------------
//----------------------==========================-----------------------
//#region Buffs
let snapshot = 0;
setInterval(playerBuffsDecay, 1000);


function playerBuffsDecay() { //only UI
  for (let b in buffs) {
    if (buffs[b].time > 0){buffs[b].time--; playerBuffs()}
  }

  for (let i in areas) {
    if (areas[i].dungeonTimer > 0){areas[i].dungeonTimer--;}
  }

  

}






function playerBuffs() { //only UI
  for (let b in buffs) {
    if (buffs[b].time > 0) { //if time more than 0
      
      if (!did(b + "buff")) {  //if it doesnt exist
       
        const bufdiv = document.createElement("div");
        bufdiv.id = b + "buff";

        bufdiv.innerHTML = '<div class="playerBuffTimer" id="' + b + 'timer"></div><img src='+buffs[b].img+'></div>';

        if ('stacks' in buffs[b]) bufdiv.innerHTML = '<div class="playerBuffTimer" id="' + b + 'timer"></div><img src='+buffs[b].img+'>  <div class="itemCount" id="'+b+ "stacks" + '">' + buffs[b].stacks + "</div>";


        bufdiv.className = "playerBuffIcon";

        bufdiv.addEventListener("contextmenu", function () { //right click to remove buff functionality
          if (buffs[b].buff && buffs[b].player) {
            buffs[b].time = 0;
            playerBuffs();
            resetTooltip();
          }});

        if (buffs[b].buff) {
          bufdiv.style.border = "#83e781 solid 1px";
        } else {
          bufdiv.style.border = "#bf3b32 solid 1px";
        }

        if (buffs[b].player) { did("playerBuffWrapper").appendChild(bufdiv);
        } else if (buffs[b].turtle) { did("turtleBuffWrapper").appendChild(bufdiv); }
        else { did("enemyBuffWrapper").appendChild(bufdiv); 
      }
        tooltipBuffs();
        snapshot = buffs[b].time;

        if (buffs[b].haste) setTimeout(() => {
          {clearInterval(playerAttackInterval); playerAttackInterval = setInterval(playerAttack, playerHaste);}
        }, 300);

      }

      if (did(b + "buff")) { //if it does
        eval(buffs[b].effect);
        let percentage = 100 - ((buffs[b].time / snapshot) * 100);
        did(b + "timer").style.transform = 'scaleY('+percentage+"%)";

        if ('stacks' in buffs[b]) did(b + "stacks").innerHTML = buffs[b].stacks

      } 
    }

    if (buffs[b].time < 1 && did(b + "buff")) {
      did(b + "buff").remove();
      buffs[b].statUp = 0;
      if ('stacks' in buffs[b]) buffs[b].stacks = 0;
      statsUpdate();
      updateStatsUI();
      if (buffs[b].haste) {clearInterval(playerAttackInterval); playerAttackInterval = setInterval(playerAttack, playerHaste);}
    }


    
  }

  for (let i in items) if (items[i].trinketCD>0) items[i].trinketCD--
}

function buffEffect(strength, id) {
  if (buffs[id].time>0) { buffs[id].statUp = strength; statsUpdate(); updateStatsUI();}
}


function removeBuffs(category) { //Removes all buffs pertaining to a specific tag
  for (let i in buffs) { if (buffs[i].tag === category) buffs[i].time = 0; }   
}

//#endregion
//----------------------==========================-----------------------
//----------------------======MYSTERY PRESENT=====-----------------------
//----------------------==========================-----------------------
//#region Present

var presentsList = ["coin","coin","coin","coin", "exp","exp","exp", "commonitem","commonitem", "rareitem"];

stats.mysteryPresentsOpened = 0;


document.addEventListener("contextmenu", function(event) { if (event.target && event.target.closest("#E15Enemy img")) { 

  animState("enemyAnimation", "gelatineHigh 0.4s 1");
  animParticleBurst(10 , "particleSpark", "enemyPanel", 0);
  playSound("audio/button3.mp3")

setTimeout(() => {
  startMysteryMinigame(); resetTooltip(); deleteEnemy(); enemyUpdate(); 
}, 300);
 } });

function startMysteryMinigame(){

cd.presentCanSpawn = playerPresentMinigameTimer;
stats.mysteryPresentsOpened++;

did("blackScreen").style.display = "flex";
setTimeout(() => { did("blackScreen").style.opacity = "0.7" }, 100);
did("presentMinigame").style.display = "flex";
did("mysteryCloth").style.display = "flex";
did("mysteryRewardPanel").style.display = "flex";

presentCount = playerPresentsMinigame - 1;
let present = 0;
//creates presents with random effect, except the last one which is game over
for (let i = 0; i < presentCount; i++) {
present++
let effect = presentsList[rng(0,(presentsList.length-1))]
const div = document.createElement("div");
div.id =  effect +"-"+ present;
div.className = "mysteryPresent";
did("mysteryList").appendChild(div);
openPresent(div.id)
}
const div = document.createElement("div");
div.id = "endGame" +"-"+ (present+1);
div.className = "mysteryPresent";
did("mysteryList").appendChild(div);
endGame(div.id)
//shuffles all the presents
var container = document.getElementById("mysteryList");
for (var i = container.children.length; i >= 0; i--) {
  container.appendChild(container.children[Math.random() * i | 0]);
}
//present functionality
function openPresent(present) {
  did(present).addEventListener("click", function clickHandler() {

    const div = document.createElement("div");

    if (present.startsWith("coin")) {
      let roll = rng(1,10);
      let amount = 0
      if (roll <= 5) { amount = stats.totalCoins * 0.03}
      else if (roll <= 9) { amount = stats.totalCoins * 0.05} 
      else if (roll === 10) { amount = stats.totalCoins * 0.07}

      div.innerHTML = '<img src="img/src/icons/coin.png">'+beautify(amount)+' Turtle Coins'
      rpgPlayer.coins += amount
      //stats.totalCoins += amount this doesnt increase total coins because it would snowball exponentially
    }

    if (present.startsWith("exp")) {
      let roll = rng(1,10);
      let amount = 0
      if (roll <= 5) { amount = rpgClass[stats.currentClass].nextExp * 0.4}
      else if (roll <= 9) { amount = rpgClass[stats.currentClass].nextExp * 0.6} 
      else if (roll === 10) { amount = rpgClass[stats.currentClass].nextExp * 0.8}

      div.innerHTML = '<img src="img/src/icons/xp.png">'+beautify(amount)+' EXP'
      rpgClass[stats.currentClass].currentExp += amount
      stats.totalExp += amount
    }

    if (present.startsWith("commonitem")) {
      let roll = rng(1,5);
      if (roll === 1) { div.innerHTML = '<img src="img/src/items/I91.jpg">x2 Wooden Stamper'; items.I91.count+=2}
      else if (roll === 2) { div.innerHTML = '<img src="img/src/items/I91.jpg">x3 Wooden Stamper'; items.I91.count+=3}
      else if (roll === 3) { div.innerHTML = '<img src="img/src/items/I92.jpg">x1 Reinforced Stamper'; items.I92.count+=1}
      else if (roll === 4) { div.innerHTML = '<img src="img/src/items/I92.jpg">x2 Reinforced Stamper'; items.I92.count+=2}
      else if (roll === 5) { div.innerHTML = '<img src="img/src/items/I222.jpg">x1 Golden Magnifying Glass'; items.I222.count+=1}
    }

    if (present.startsWith("rareitem")) {
      let roll = rng(1,10);
      if (roll === 1) { div.innerHTML = '<img src="img/src/items/I96.jpg">x1 Gold-Tinged Gamba'; items.I96.count+=1}
      else if (roll === 2) { div.innerHTML = div.innerHTML = '<img src="img/src/items/I97.jpg">x1 Vitreous Gamba'; items.I97.count+=1}
      else if (roll === 3) { div.innerHTML = div.innerHTML = '<img src="img/src/items/I207.jpg">x1 Wood-Carved Gamba'; items.I207.count+=1}
      else if (roll === 4) { div.innerHTML = div.innerHTML = '<img src="img/src/items/I177.jpg">x1 EXP Voucher'; items.I177.count+=1}
      else if (roll === 5) { div.innerHTML = div.innerHTML = '<img src="img/src/items/I178.jpg">x1 Drop Voucher'; items.I178.count+=1}
      else if (roll === 6) { div.innerHTML = div.innerHTML = '<img src="img/src/items/I174.jpg">x1 Dungeon Voucher'; items.I174.count+=1}
      else if (roll === 7) { div.innerHTML = div.innerHTML = '<img src="img/src/items/I93.jpg">x1 Golden Stamper'; items.I93.count++}
      else if (roll === 8) { div.innerHTML = div.innerHTML = '<img src="img/src/items/I219.jpg">x1 Giantite Chunk'; items.I219.count++}
      else if (roll === 9) { div.innerHTML = div.innerHTML = '<img src="img/src/items/I209.jpg">x1 Ephemeral Time Egg'; items.I209.count++}
      else if (roll === 10) { div.innerHTML = div.innerHTML = '<img src="img/src/items/I210.jpg">x1 Perennial Time Egg'; items.I210.count++}
      logs.P32.unlocked = true;
    }

    div.id = present+"reward";
    div.className = "mysteryRewardItem";
    var container = did("mysteryRewardPanel");
    container.insertBefore(div, container.firstChild);

    animParticleBurst(5 , "particleSpark", present, 0);
    playSound("audio/button3.mp3")
    did(present).style.backgroundImage = "url('img/src/icons/presentOpen.png')";
    did(present).removeEventListener('click', clickHandler);
    
    
      })

}

function endGame(present) {
  did(present).addEventListener("click", function clickHandler() {

    const div = document.createElement("div");
    div.id = present+"reward";
    div.className = "mysteryRewardItem";
    div.innerHTML = '&#10060; Game End'
    div.style.backgroundColor = "#503863"
    var container = did("mysteryRewardPanel");
    container.insertBefore(div, container.firstChild);

    did("presentBlocker").style.display = "flex"

    animParticleBurst(15 , "particleSmoke", present, 0);
    playSound("audio/close.mp3")
    did(present).style.backgroundImage = "url('img/src/icons/presentOpen.png')";
    did(present).removeEventListener('click', clickHandler);

    setTimeout(() => {


      did("presentMinigame").style.animation = "shrinkFadeOut 0.5s 1";
      did("presentMinigame").style.animation = "mysteryRewardPanel 0.5s 1";
      setTimeout(() => { 
        did("presentMinigame").style.display = "none"; 
        did("mysteryRewardPanel").style.display = "none"; 
        did("mysteryCloth").style.display = "none"; 
        setTimeout(() => { did("blackScreen").style.opacity = "0"; }, 100);
        setTimeout(() => { did("blackScreen").style.display = "none"; }, 200);
        did("mysteryRewardPanel").innerHTML = "";
        did("mysteryList").innerHTML = "";
        did("presentBlocker").style.display = "none"
      }, 100);
      
      
    }, 3000);
    
    
    })

}





}











//#endregion
//----------------------==========================-----------------------
//----------------------======INITIALIZATION======-----------------------
//----------------------==========================-----------------------
//#region Initialization
function updateStatsUI() {
  
  did("statsNatureDamage").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].align==="nature" ? "inline" : "none";
  did("statsNatureBonus").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].align==="nature" ? "inline" : "none";
  did("statsElementalDamage").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].align==="elemental" ? "inline" : "none";
  did("statsElementalBonus").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].align==="elemental" ? "inline" : "none";
  did("statsMightDamage").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].align==="might" ? "inline" : "none";
  did("statsMightBonus").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].align==="might" ? "inline" : "none";
  did("statsDeificDamage").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].align==="deific" ? "inline" : "none";
  did("statsDeificBonus").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].align==="deific" ? "inline" : "none";
  did("statsOccultDamage").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].align==="occult" ? "inline" : "none";
  did("statsOccultBonus").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].align==="occult" ? "inline" : "none";
  did("statsMiningDamage").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].tag==="mattock" ? "inline" : "none";
  did("statsFishingLevel").style.display = rpgPlayer.weaponSlot !== "none" && items[rpgPlayer.weaponSlot].tag==="rod" && playerFishingLevel>0 ? "inline" : "none";
  did("statsHaste").style.display = playerHaste !== 2000 ? "inline" : "none";
  did("statsMaxMana").style.display = unlocks.magic ? "inline" : "none";
  did("statsCritChance").style.display = playerCritChance > 1 ? "inline" : "none";

  did("statsHealth").textContent = "❖ Max Health: " + beautify(playerMaxHp);
  did("statsRegen").textContent = "❖ Regeneration: " + beautify(playerHpRegen);
  did("statsNatureDamage").textContent = "❖ Nature Damage: " + beautify(playerTotalNatureDamage);
  did("statsNatureBonus").textContent = "❖ Nature Bonus: " + beautify(multiplicativeNatureDamage * 100) + "%";

  did("statsElementalDamage").textContent = "❖ Elemental Damage: " + beautify(playerTotalElementalDamage);
  did("statsElementalBonus").textContent = "❖ Elemental Bonus: " + beautify(multiplicativeElementalDamage * 100) + "%";

  did("statsMightDamage").textContent = "❖ Might Damage: " + beautify(playerTotalMightDamage);
  did("statsMightBonus").textContent = "❖ Might Bonus: " + beautify(multiplicativeMightDamage * 100) + "%";

  did("statsDeificDamage").textContent = "❖ Deific Damage: " + beautify(playerTotalDeificDamage);
  did("statsDeificBonus").textContent = "❖ Deific Bonus: " + beautify(multiplicativeDeificDamage * 100) + "%";

  did("statsOccultDamage").textContent = "❖ Occult Damage: " + beautify(playerTotalOccultDamage);
  did("statsOccultBonus").textContent = "❖ Occult Bonus: " + beautify(multiplicativeOccultDamage * 100) + "%";

  did("statsHaste").textContent = "❖ Attack Speed: " + beautify((playerHaste / 2000) * 100) + "%";
  did("statsStrength").textContent = "❖ Strength: " + beautify(playerStrength);
  did("turtleName2").textContent = stats.turtleName;
  did("turtleLevel").textContent = "[lvl " + rpgClass[stats.currentClass].level + "]";

  did("statsMiningDamage").textContent = "❖ Gathering Level: " + beautify(playerGatheringLevel);
  did("statsMiningBonus").textContent = "❖ Gathering Bonus: " + beautify(multiplicativeMiningDamage * 100) + "%";

  did("statsFishingLevel").textContent = "❖ Fishing Level: " + beautify(playerFishingLevel);

  did("statsDropChance").textContent = "❖ Drop Chance: " + Math.round(multiplicativeDropChance * 100) + "%";
  did("statsExpMultiplier").textContent = "❖ EXP Rate: " + Math.round(multiplicativeEXPGain * 100) + "%";
  did("statsCritChance").textContent = "❖ Critical Chance: " + Math.round((playerCritChance * 100) - 100) + "%";

  did("statsMaxMana").textContent = "❖ Max SP: " + beautify(playerMaxMana);
}

document.addEventListener("DOMContentLoaded", rpgInitialization);

function rpgInitialization() {
  createAreaPanel();
  expBar();
  encounterButtonPress();
  hpRegen();
  initGearAll()
  switchArea();
  specialButtonUi();
  contractLog();
  armorycheck();
  createArmory();
  createCatalogue();
  statsUpdate();
  updateStatsUI();
  spawnEnemy();
  updateClass();
  removeTableItem();
  createMail();
  unreadMail();
  stampStatUp();
  updateSkills();
  createSkirmish();
  createShowdown();
  calculateInactiveTime();
  createTalent();
  updateTalentUI();
  createShopHonor();

  if (stats.currentArea==="A7"){ //if the player loads in arena, dont show the quest tab
      did("showdownTab").style.display = "flex";
      did("questTab").style.display = "none";
  }

}
//#endregion