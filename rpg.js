
//#region Variable Hell

var playerAttackInterval = setInterval(playerAttack, playerHaste);

const enemyAttackMS = 2500;
var enemyAttackInterval = setInterval(enemyAttack, enemyAttackMS);



const gatherDifficulty = ["ore", "herb"];

var logTrack69 = false;
var logTrackDamage = 0;

stats.currentDifficulty = 'easy';
stats.currentArea = 'A1';
stats.currentEnemy = 'E1';

var currentHP = 0;

//#endregion
//----------------------==========================-----------------------
//----------------------==========COMBAT==========-----------------------
//----------------------==========================-----------------------
//#region Combat

function spawnEnemy() { //spawns enemy based on current difficulty and area

  for (let i in enemies) if (enemies[i].difficulty===stats.currentDifficulty&&enemies[i].area===stats.currentArea) var currentEnemy=i 

  if (bossTime) currentEnemy=areas[stats.currentArea].boss
  

  const div = document.createElement("div");
  div.id = currentEnemy + "enemy";
  div.className = "enemy";
  did("enemyAnimation").appendChild(div);
  div.innerHTML = '<img src="img/src/enemies/' + currentEnemy + '.png">';
  did("enemyName").innerHTML = enemies[currentEnemy].name;
  did("enemyLevel").textContent = enemies[currentEnemy].level;
  currentHP = enemies[currentEnemy].hp;
  stats.currentEnemy = currentEnemy;


}

stats.totalKills = 0
stats.totalBossKills = 0
function enemyUpdate() { //updates enemy HP and checks if enemy is dead
  if (currentHP <= 0) { //on enemy kill

        for (let i in enemies){ if (did(i+"enemy")){
        did(i + "enemy").style.animation = "enemyDefeat 0.2s 1 ease";
        setTimeout(function () { did(i + "enemy").remove(); }, 180);
        }}

        enemies[stats.currentEnemy].killCount++;
        stats.totalKills++;
        if (bossTime) {stats.totalBossKills++;};

        if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) {
          var totalEXP = Math.round(enemies[stats.currentEnemy].exp * multiplicativeEXPGain);
           rpgClass[stats.currentClass].currentExp += totalEXP;
           logPrint("<FONT COLOR='#ae77f7'>You gain " + totalEXP + " EXP!" );
        }
        else {
          var totalEXP = Math.round(enemies[stats.currentEnemy].exp * multiplicativeEXPGain);
          rpgClass[stats.currentClass].currentExp += totalEXP;
          logPrint("<FONT COLOR='#ae77f7'>" + enemies[stats.currentEnemy].name + " gets defeated! You gain " + totalEXP + " EXP!" );
        }

        trinketEnemyKill(); //trinket effect
        expBar();
        eval(enemies[stats.currentEnemy].drop);


    clearInterval(enemyAttackInterval); //reset attack interval
    enemyAttackInterval = setInterval(enemyAttack, enemyAttackMS);
        


    bossTime = false;

    
    spawnEnemy();

    

  }

  var percentageHP = (currentHP / enemies[stats.currentEnemy].hp) * 100;
  did("enemyHpBar").style.background = "linear-gradient(90deg, rgb(144,238,111)" + percentageHP + "%, rgb(255,119,119) " + percentageHP + "%)";

}

function playerAttack() { 
      if (rpgPlayer.alive) {

        if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) { //if its a gathering node
          playSound("audio/playerAttack.mp3")
          var damageDealt = 10; //this will be mining power o whatever
          if (baseMiningDamage>0 && enemies[stats.currentEnemy].difficulty==="ore") damageDealt = playerMiningDamage
          if (baseHerbloreDamage>0 && enemies[stats.currentEnemy].difficulty==="herb") damageDealt = playerHerbloreDamage

          enemyBasicDamage(damageDealt)
          
        } else  {
          playSound("audio/playerAttack.mp3")
          if (rpgPlayer.weaponSlot !== 'none'){
          var damageFormula = playerStrength + baseNatureDamage + baseMightDamage + baseElementalDamage + baseOccultDamage + baseDeificDamage;
          var damageDealt = rng(damageFormula, (damageFormula*1.1))

          if (baseNatureDamage>0) enemyNatureDamage(damageDealt)
          if (baseMightDamage>0) enemyMightDamage(damageDealt)
          if (baseElementalDamage>0) enemyElementalDamage(damageDealt)
          if (baseOccultDamage>0) enemyOccultDamage(damageDealt)
          if (baseDeificDamage>0) enemyDeificDamage(damageDealt)


          if ("commonSkill" in items[rpgPlayer.weaponSlot]) {
            if (Math.random() < 0.2) { eval(items[rpgPlayer.weaponSlot].commonSkill); }  //20% chance per attack
          }
          }

          if (rpgPlayer.weaponSlot === 'none' || baseMiningDamage>0 || baseHerbloreDamage>0) {var damageDealt = rng(playerStrength, (playerStrength*1.1)); enemyBasicDamage(damageDealt)}

          if (damageDealt === 69) logTrack69 = true;
          logTrackDamage = damageDealt;
        
}
        did("playerAnimation").style.animation = "";
        void did("playerAnimation").offsetWidth;
        did("playerAnimation").style.animation = "playerAttack " + playerHaste / 1000 / 2 + "s 1 ease";

        did("npcPanel").style.animation = "";
        void did("npcPanel").offsetWidth;
        did("npcPanel").style.animation = "gelatine 0.3s 1 ease";

        
      }
    
    /*
    if (did("enemyAnimation").childElementCount === 0 && currentHP > 0)
      currentHP = 0; //failsafe to prevent unspawned enemies */
  

  enemyUpdate();
}

function playerUpdate(){ //updates player HP and checks if its dead

  if (rpgPlayer.hp <= 0 && rpgPlayer.alive) {
    rpgPlayer.hp = 0;
    if (bossTime) { //if a boss kills the turtle
      bossTime = false;
      deleteEnemy();
      did("rpgCanvas").style.animation = "";
      void did("rpgCanvas").offsetWidth;
      did("rpgCanvas").style.animation = "rpgFade 1s 1";
    }
    rpgPlayer.alive = false;
    logPrint(stats.turtleName + " perishes :c");
    hpRegen();
  }

  triggerHPTrinket();

  var percentageplayerHP = (rpgPlayer.hp / playerMaxHp) * 100;
  did("playerHpBar").style.background = "linear-gradient(90deg, rgb(144,238,111)" + percentageplayerHP + "%, rgb(255,119,119) " + percentageplayerHP + "%)";
}

function triggerHPTrinket() {

if (rpgPlayer.trinketSlot !== 'none' && 'trinketHPEffect' in items[rpgPlayer.trinketSlot] && items[rpgPlayer.trinketSlot].trinketCD === 0) eval(items[rpgPlayer.trinketSlot].trinketHPEffect)



}

setInterval(hpRegen, 1000);
function hpRegen() { //additionally manages death
  if (rpgPlayer.alive) {
    //if player alive
    if (rpgPlayer.hp < playerMaxHp) rpgPlayer.hp += playerHpRegen;
    playerUpdate()
    
  } else {
    //if player dead
    if (rpgPlayer.hp < playerMaxHp && logs.B1P7.statUp===true) rpgPlayer.hp += playerHpRegen / 5;
    else if (rpgPlayer.hp < playerMaxHp) rpgPlayer.hp += playerHpRegen / 10;
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
    gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty) || !rpgPlayer.alive ) { //conditions to not attack
  } else {
    playSound("audio/enemyAttack.mp3")
        var damageDealt = rng(enemies[stats.currentEnemy].attack, (enemies[stats.currentEnemy].attack*1.1)) //damage variance

        if (enemies[stats.currentEnemy].align==='nature') playerNatureDamage(damageDealt)
        if (enemies[stats.currentEnemy].align==='might') playerMightDamage(damageDealt)
        if (enemies[stats.currentEnemy].align==='elemental') playerElementalDamage(damageDealt)
        if (enemies[stats.currentEnemy].align==='occult') playerOccultDamage(damageDealt)
        if (enemies[stats.currentEnemy].align==='deific') playerDeificDamage(damageDealt)

        if ("veryCommonSkill" in enemies[stats.currentEnemy]) {
          if (Math.random() < 0.7) { eval(enemies[stats.currentEnemy].veryCommonSkill); }  //70% chance per attack
        }

        if ("commonSkill" in enemies[stats.currentEnemy]) {
          if (Math.random() < 0.4) { eval(enemies[stats.currentEnemy].commonSkill); }  //40% chance per attack
        }
        

        if ("rareSkill" in enemies[stats.currentEnemy]) {
          if (Math.random() < 0.2) { eval(enemies[stats.currentEnemy].rareSkill); }  //20% chance per attack
        }

    damageReflect(damageDealt)

    did("enemyAnimation").style.animation = "";
    void did("enemyAnimation").offsetWidth;
    did("enemyAnimation").style.animation = "enemyAttack 0.5s 1";

    did("playerNpcPanel").style.animation = "";
    void did("playerNpcPanel").offsetWidth;
    did("playerNpcPanel").style.animation = "gelatine 0.3s 1 ease";
}
}

function damageReflect(damage){

if (rpgPlayer.ringSlot === "I131") { let reflectedDamage = Math.min(damage/3, 200); enemyNatureDamage(reflectedDamage) }



}

setInterval(damageTicks, 1000);
function damageTicks() {
  if (rpgPlayer.alive && playerPoison > 0) { playerNatureDamage(playerPoison);}
  
  if (enemyPoison > 0 && !gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) { enemyNatureDamage(enemyPoison); }
}

function deleteEnemy() {  //deletes without loot, used in dungeons, bosses and switching area
  for (let i in enemies) {
    if (did(i + "enemy")) {
  did(i + "enemy").remove();
  currentHP = 0;
  spawnEnemy();
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
  if (did("combatLog").children.length >= 30)
    did("combatLog").removeChild(did("combatLog").firstChild); //if it has more than 10 childs delete the first
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

    statsUpdate();
    updateStatsUI();
  }

  let percentageEXP = (rpgClass[stats.currentClass].currentExp / rpgClass[stats.currentClass].nextExp) * 100;
  did("expBar").style.background = "linear-gradient(90deg, #6FB1EE " + percentageEXP + "%, #3F3939 " + percentageEXP + "%)";
  did("currentExp").textContent = beautifyDamage(rpgClass[stats.currentClass].currentExp) + "/" + beautifyDamage(rpgClass[stats.currentClass].nextExp);
}

function updateClass(){

  rpgPlayer.baseStrength = 4 + (rpgClass[stats.currentClass].level * 9);
  rpgPlayer.baseMaxHp = 33 + (rpgClass[stats.currentClass].level * 67);
  rpgPlayer.baseHpRegen = 3.3 + (rpgClass[stats.currentClass].level * 6.7);

  did("turtleLevel2").innerHTML = rpgClass[stats.currentClass].level;
  did("classIcon").src = "img/src/icons/"+stats.currentClass+".png";
  did("expPanelClass").innerHTML = '&lt;'+rpgClass[stats.currentClass].name+'&gt;';
  did("expPanelClass").style.color = rpgClass[stats.currentClass].color;

  expBar();
  statsUpdate();
  updateStatsUI();
}


function trinketEnemyKill() {}

const typestrength = 1.5;
const typeResist = 0.5;

function enemyNatureDamage(damage){
  let damageDealt = (damage + additiveNatureDamage) * multiplicativeNatureDamage;
  let icon;
  if (enemies[stats.currentEnemy].align === 'elemental') {damageDealt *= typeResist; icon='weak';}
  if (enemies[stats.currentEnemy].align === 'might') {damageDealt *= typestrength; icon='strong';}
  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautifyDamage(damageDealt), 'damageText', '#21b42d', icon, "enemyPanel");
  logPrint( enemies[stats.currentEnemy].name + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Nature Damage");
}

function enemyMightDamage(damage){
  let damageDealt = (damage + additiveMightDamage) * multiplicativeMightDamage;
  let icon;
  if (enemies[stats.currentEnemy].align === 'nature') {damageDealt *= typeResist; icon='weak';}
  if (enemies[stats.currentEnemy].align === 'elemental') {damageDealt *= typestrength; icon='strong';}
  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautifyDamage(damageDealt), 'damageText', '#217eb4', icon, "enemyPanel");
  logPrint( enemies[stats.currentEnemy].name + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Might Damage");
}

function enemyElementalDamage(damage){
  let damageDealt = (damage + additiveElementalDamage) * multiplicativeElementalDamage;
  let icon;
  if (enemies[stats.currentEnemy].align === 'might') {damageDealt *= typeResist; icon='weak';}
  if (enemies[stats.currentEnemy].align === 'nature') {damageDealt *= typestrength; icon='strong';}
  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautifyDamage(damageDealt), 'damageText', '#f35933', icon, "enemyPanel");
  logPrint( enemies[stats.currentEnemy].name + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Elemental Damage");
}

function enemyOccultDamage(damage){
  let damageDealt = (damage + additiveOccultDamage) * multiplicativeOccultDamage;
  let icon;
  if (enemies[stats.currentEnemy].align === 'deific') {damageDealt *= typestrength; icon='strong';}
  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautifyDamage(damageDealt), 'damageText', '#a936d6', icon, "enemyPanel");
  logPrint( enemies[stats.currentEnemy].name + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Occult Damage");
}

function enemyDeificDamage(damage){
  let damageDealt = (damage + additiveOccultDamage) * multiplicativeOccultDamage;
  let icon;
  if (enemies[stats.currentEnemy].align === 'occult') {damageDealt *= typestrength; icon='strong';}
  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautifyDamage(damageDealt), 'damageText', '#ec9900', icon, "enemyPanel");
  logPrint( enemies[stats.currentEnemy].name + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Deific Damage");
}

function enemyBasicDamage(damage){
  let damageDealt = damage
  let icon;
  currentHP -= damageDealt;
  enemyUpdate();
  damageText(beautifyDamage(damageDealt), 'damageText', '#818181', icon, "enemyPanel");
  logPrint( enemies[stats.currentEnemy].name + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Damage");
}

function enemyHealingDamage(healing){
  playSound("audio/heal.mp3")
  let healingDealt = healing
  currentHP += healingDealt;
  if (currentHP > enemies[stats.currentEnemy].hp) currentHP = enemies[stats.currentEnemy].hp //prevents overhealing
  enemyUpdate();
  damageText(beautifyDamage(healingDealt), 'damageText', '#61b600', 'heal', "enemyPanel");
  logPrint( enemies[stats.currentEnemy].name + " heals for <FONT COLOR='#e8643c'>" + Math.round(healingDealt) + " HP");
}



function playerNatureDamage(damage){
  let icon;
  let damageDealt = damage;
  if (rpgPlayer.align === 'elemental') {damageDealt *= typeResist; icon='weak';}
  if (rpgPlayer.align === 'might') {damageDealt *= typestrength; icon='strong';}
  rpgPlayer.hp -= damageDealt;
  playerUpdate();
  damageText(beautifyDamage(damageDealt), 'damageText', '#21b42d', icon, "playerPanel");
  logPrint( stats.turtleName + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Nature Damage");
}

function playerMightDamage(damage){
  let damageDealt = damage;
  let icon;
  if (rpgPlayer.align === 'nature') {damageDealt *= typeResist; icon='weak';}
  if (rpgPlayer.align ===  'elemental') {damageDealt *= typestrength; icon='strong';}
  rpgPlayer.hp -= damageDealt;
  playerUpdate();
  damageText(beautifyDamage(damageDealt), 'damageText', '#217eb4', icon, "playerPanel");
  logPrint( stats.turtleName + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Might Damage");
}

function playerElementalDamage(damage){
  let damageDealt = damage;
  let icon;
  if (rpgPlayer.align === 'might') {damageDealt *= typeResist; icon='weak';}
  if (rpgPlayer.align === 'nature') {damageDealt *= typestrength; icon='strong';}
  rpgPlayer.hp -= damageDealt;
  playerUpdate();
  damageText(beautifyDamage(damageDealt), 'damageText', '#f35933', icon, "playerPanel");
  logPrint( stats.turtleName + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Elemental Damage");
}

function playerOccultDamage(damage){
  let damageDealt = damage;
  let icon;
  if (rpgPlayer.align ===  'deific') {damageDealt *= typestrength; icon='strong';}
  rpgPlayer.hp -= damageDealt;
  playerUpdate();
  damageText(beautifyDamage(damageDealt), 'damageText', '#a936d6', icon, "playerPanel");
  logPrint( stats.turtleName + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Occult Damage");
}

function playerDeificDamage(damage){
  let damageDealt = damage;
  let icon;
  if (rpgPlayer.align ===  'occult') {damageDealt *= typestrength; icon='strong';}
  rpgPlayer.hp -= damageDealt;
  playerUpdate();
  damageText(beautifyDamage(damageDealt), 'damageText', '#ec9900', icon, "playerPanel");
  logPrint( stats.turtleName + " recieves <FONT COLOR='#e8643c'>" + Math.round(damageDealt) + " Deific Damage");
}

function playerHealingDamage(healing){
  playSound("audio/heal.mp3")
  let healingDealt = healing
  rpgPlayer.hp += healingDealt;
  if (rpgPlayer.hp > playerMaxHp) rpgPlayer.hp = playerMaxHp //prevents overhealing
  playerUpdate();
  damageText(beautifyDamage(healingDealt), 'damageText', '#61b600', 'heal', "playerPanel");
  logPrint( stats.turtleName + " heals for <FONT COLOR='#e8643c'>" + Math.round(healingDealt) + " HP");
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



  //particle count
  for (let i = 0; i < particleCount; i++) {
    setTimeout(particle, 50 * i);
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

function animParticleBurst(particleCount, particleType, target, huerotation) { //burst of particles on player
  //particle count
  for (let i = 0; i < particleCount; i++) {
    setTimeout(particle, 50 * i);
  }
  //spawn particle
  function particle() {
    const particle = document.createElement("div");
    particle.className = "throwParticle";
    did(target).appendChild(particle);
    particle.style.filter = "hue-rotate("+huerotation+"deg)"
    particle.style.animation = particleType + " 2s 1 ease";
    setTimeout(function () {
      particle.remove();
    }, 1000);
    //sets the particle position to the projectile with some randomness
    const div2 = did(target);
    const maxWidthPercentage = 100 - (20 / div2.clientWidth) * 100; // 20 es el ancho del div1
    const maxHeightPercentage = 100 - (20 / div2.clientHeight) * 100; // 20 es el alto del div1
    const randomXPercentage = Math.random() * maxWidthPercentage;
    const randomYPercentage = Math.random() * maxHeightPercentage;
    particle.style.left = randomXPercentage + "%";
    particle.style.top = randomYPercentage + "%";
  }
}

function animImageSplash(image, target, animation, huerotation){ //image on top of a target

  const projectile = document.createElement("div");
  projectile.id = projectile + "projectile";
  projectile.className = "imageSplash";
  projectile.style.filter = "hue-rotate("+huerotation+"deg)"
  did(target).appendChild(projectile);
  projectile.style.backgroundImage = "url(img/src/projectiles/" + image + ".png)";
  setTimeout(function () { projectile.remove(); }, 1000);
    
  let animationlet = animation;
  if (animationlet === "impact") { projectile.style.animation = "gelatineImpact 1.1s 1"; }
  if (animationlet === "downwards") { projectile.style.animation = "gelatineDownwards 1.1s 1"; }

}

function beautifyDamage(number) {
  if (number >= 10000000) {
    return (number / 1000000).toFixed(0) + "M";
  } else if (number >= 10000) {
    return (number / 1000).toFixed(0) + "K";
  } else {
    return Math.round(number).toString();
  }
}


function damageText(number, type, color, icon, target) {
  if (!settings.disableDamageNumbers) {
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

function statusParticle(particleType, target) { //spawns one particle, used for status Particle Check below
  //spawn particle
  function particle() {
    const particle = document.createElement("div");
    particle.className = "throwParticle";
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
  }
  particle();
}

setInterval(function () { if (stats.currentCategory === "rpgContainer") { statusParticleCheck(); } }, 1000);
function statusParticleCheck() { //checks if buffs is active, and asigns status Particle
  //if (buffs.B1.active===1) {statusParticle('particleHealth', 'player');}
  if (buffs.B2.active === 1) {
    statusParticle("particlePoison");
  }
  if (buffs.B3.active === 1) {
    statusParticle("particlePoison", "player");
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
  items[ID].count += itemdrop;
  addItem()
}

function rollTable(table, rolls) { //droptable rolls
  function getRandomInt(max) { //rewrite with the rng
    return Math.floor(Math.random() * max);
  }

  for (let i = 0; i < rolls; i++) {
    for (let dt in table) {
      let rngroll = getRandomInt(table[dt].D);
      if (rngroll === table[dt].D - 1) {
        //because the die can land on 0, substract 1 to make for it
        rollcount = eval(table[dt].C)
        items[dt].count += rollcount;
        logPrint("<FONT COLOR='#8fba77'>You obtain " + items[dt].name + " x"+rollcount+"!");
      }
    }
  }

  let goldrng = getRandomInt(777777);

  if (goldrng === 777776) {
  }
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

setInterval(function () { if (stats.currentCategory === "rpgContainer") { addItem(); } }, 1000);
function addItem() { //updates inventory items
  for (let i in items) {
    if ((items[i].count >= 1 && !items[i].unique) || (items[i].count >= 1 && items[i].unique && !items[i].gotOnce)) {
      if (!did(items[i].id + "item")) {  //if it doesnt exist yet create it
        const itemdiv = document.createElement("div");
        itemdiv.id = items[i].id + "item";
        if (items[i].max === 1)
          itemdiv.innerHTML = '<img src = "img/src/items/' + items[i].img + '.png">';
        else //if its not singular, add counter
          itemdiv.innerHTML = '<img src = "img/src/items/' + items[i].img + '.png"><div class="itemCount" id="' + items[i].id + "itemCount" + '">' + items[i].count + "</div>";
          
        itemdiv.className = "itemSlot";
        itemdiv.style.animation = "";
        void itemdiv.offsetWidth;
        itemdiv.style.animation = "growFadeIn 0.2s 1";
        //assign a category depending on the tag
        did("inventory").appendChild(itemdiv);
        if (items[i].quality === "Common")
          itemdiv.style.border = "white solid 1px";
        if (items[i].quality === "Uncommon")
          itemdiv.style.border = "#1eff00 solid 1px";
        if (items[i].quality === "Rare")
          itemdiv.style.border = "#0070dd solid 1px";
        if (items[i].quality === "Epic")
          itemdiv.style.border = "#a335ee solid 1px";
        if (items[i].quality === "Legendary")
          itemdiv.style.border = "#ff8000 solid 1px";
        if (items[i].quality === "Relic")
          itemdiv.style.border = "#e6cc80 solid 1px";
        if (items[i].quality === "Quest")
          itemdiv.style.border = "yellow solid 1px";
        //call tooltip and use functions
        tooltipItems(items[i]);

        if ("use" in items[i]) itemUse(items[i].id, function () { eval(items[i].use); }); //assigns use function

        if (!items[i].gotOnce) items[i].gotOnce = true;

        sellItem(i);
      }
    }

    if (did(items[i].id + "item")) {  //if it exists limit and update ammount
      if (items[i].max < items[i].count) items[i].count = items[i].max;
      if (items[i].max !== 1) did(items[i].id + "itemCount").innerHTML = items[i].count;
    }

    if (items[i].count < 0) items[i].count = 0; //failsafe for negative items

    if (did(items[i].id + "item") && items[i].count <= 0) { //remove if count 0 and exists
      did(items[i].id + "item").remove();
    }
  }
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
        did(id + "item").style.animation = "";
        void did(id + "item").offsetWidth;
        did(id + "item").style.animation = "levelUp 1s 1";
        effect();
        if(items[id].count<1) resetTooltip()
      }

    } else if (!sellMode) {
      playSound("audio/use.mp3")
      did(id + "item").style.animation = "";
      void did(id + "item").offsetWidth;
      did(id + "item").style.animation = "levelUp 1s 1";
      effect();
      if(items[id].count<1) resetTooltip()
    }

  } else {
    playSound("audio/thud.mp3")
    did(id + "item").style.animation = "";
    void did(id + "item").offsetWidth;
    did(id + "item").style.animation = "noBuyAnimation 0.2s 1";
  }

  });
}

stats.soldItems = 0;
function sellItem(id) {
  did(id + "item").addEventListener("click", function () { //sell once
    if (sellMode && items[id].sell !== 0) {
    if (rpgPlayer.headSlot!==id && rpgPlayer.chestSlot!==id && rpgPlayer.handsSlot!==id && rpgPlayer.weaponSlot!==id && rpgPlayer.ringSlot!==id && rpgPlayer.legsSlot!==id && rpgPlayer.trinketSlot!==id && rpgPlayer.feetSlot!==id) { //if the item is not equiped
      playSound("audio/heal.mp3"); 
      items[id].count--;
      rpgPlayer.coins += items[id].sell;
      stats.soldItems++;
      updateCounters();
      addItem();
      if (items[id].count<1) resetTooltip();
    }
    }
  });

  did(id + "item").addEventListener("contextmenu", function () { //sell all
    if (sellMode && items[id].sell !== 0) {
      playSound("audio/heal.mp3"); 
      rpgPlayer.coins += (items[id].sell) * items[id].count ;
      stats.soldItems += items[id].count;
      items[id].count = 0;
      updateCounters();
      addItem();
      resetTooltip();
    }
  });
}

function updateMaxStack(){ //Also gets called once a bag is used
  statsUpdate();
  for (let i in items) {
    if ( items[i].max > 99) items[i].max = Math.round(playerMaxStack);
    if ( items[i].tag === "resource") items[i].max = Math.round(playerMaxStackResource);
  
  }
  
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
//#endregion
//----------------------==========================-----------------------
//----------------------===========AREAS==========-----------------------
//----------------------==========================-----------------------
//#region Areas

setInterval(function () { if (stats.currentCategory === "rpgContainer") { createAreaPanel(); } }, 1000);
function createAreaPanel() {
  for (let a in areas) {
    if (!did(areas[a].id + "area")) {
      const areadiv = document.createElement("div");
      areadiv.id = areas[a].id + "area";
      areadiv.innerHTML = '<div class="areaPanel1"> <div class="areaImage"> <img src="img/src/areas/' + areas[a].mini + '.png"></div> </div> <div class="areaPanel2"> <p class="areaPanelName">' + areas[a].name + '</p> <p class="areaPanelLevel" id="' + areas[a].id + 'areal">lvl ' + areas[a].level + '</p></div>';
      did("areaTab").appendChild(areadiv);
      areadiv.className = "areaPanel";
      areaButton(areas[a]);
      tooltipAreas(areas[a]);
    }

    if (!areas[a].unlocked) {  did(areas[a].id + "area").style.display = 'none'; } else did(areas[a].id + "area").style.display = 'flex';
     
    if (rpgClass[stats.currentClass].level >= areas[a].level * 0.7) did(areas[a].id + "areal").style.background = "#CD984D";

    if (rpgClass[stats.currentClass].level >= areas[a].level) did(areas[a].id + "areal").style.background = "#58B86C";
    
  }
} createAreaPanel();

function areaButton(area) {
  if (did(area.id + "area")) {
    did(area.id + "area").addEventListener("click", function () {
      if (stats.currentArea !== area.id) { // if its not already on the area
        playSound("audio/button3.mp3")
        stats.currentArea = area.id;
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
    });
  }

  function resetAreaButtonClass() { //visual select of area button

    for (let a in areas) {
      did(areas[a].id + "area").classList.replace(
        "areaPanelSelect",
        "areaPanel"
      );
    }
  }
}

function switchArea() {
  did("rpgCanvas").style.backgroundImage = "url(img/src/areas/" + stats.currentArea + ".png)";
  did(stats.currentArea + "area").classList.replace( "areaPanel", "areaPanelSelect");
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

      if (areas[stats.currentArea].unlockedBoss === 1) { did("bossButton").style.display = "flex";
      } else did("bossButton").style.display = "none";

      if (areas[stats.currentArea].unlockedOre === 1) { did("miningNode").style.display = "flex";
      } else did("miningNode").style.display = "none";
      
      if (areas[stats.currentArea].unlockedHerb === 1) { did("herbNode").style.display = "flex";
      } else did("herbNode").style.display = "none";
    
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

function difficultyButton(div, difficulty){
  did(div).addEventListener("click", function () {
    playSound("audio/button4.mp3")
    stats.currentDifficulty = difficulty;
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

function encounterButtonPress() { //Ui states of special Buttons
  did("encounterEasy").style.boxShadow = "";
  did("encounterMedium").style.boxShadow = "";
  did("encounterHard").style.boxShadow = "";
  did("miningNode").style.boxShadow = "";
  did("herbNode").style.boxShadow = "";
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
  }
}
//#endregion
//----------------------==========================-----------------------
//----------------------===========QUESTS=========-----------------------
//----------------------==========================-----------------------
//#region Quests
stats.questsCompleted = 0;

setInterval(function () { if (stats.currentCategory === "rpgContainer") { createQuest(); } }, 1000);
function createQuest() {
  for (let q in quests) {
    if (q.startsWith(stats.currentArea)){
    if (!did(quests[q].id + "quest")) {
      const questdiv = document.createElement("div");
      questdiv.id = quests[q].id + "quest";
      questdiv.style.filter = "brightness(0.3)";
      questdiv.innerHTML = '<div class="areaPanel1" > <div class="areaImage" id="' + quests[q].id + 'questi" style="border-color: #FFD100"> <img src="img/src/items/quest.png"></div> </div> <div class="areaPanel2"> <p class="questPanelName">'+quests[q].name+'<br></p> <p class="questPanelLevel" id="' + quests[q].id + 'questl" >lvl ' + quests[q].level + "</p></div>";
      did("questTab").appendChild(questdiv);
      questdiv.className = "questPanel";

      did(quests[q].id + "quest").addEventListener("click", function () {
        if (quests[q].state === "complete") {
          playSound("audio/startup.mp3");
          stats.questsCompleted++;
          did(quests[q].id + "questl").innerHTML = "Completed";
          quests[q].state = "completed";
          eval(quests[q].effect);
          createQuest()
        }
      });

      tooltipQuests(quests[q]);
    }

    if (quests[q].state==='locked') {
      did(q + "quest").style.filter = "brightness(0.3)";
    }
    else if(quests[q].state==='pending') {
      quests[q].once=false;
      did(q + "quest").style.filter = "brightness(1)";
      did(q + "questl").style.background = "#58B86C";
      did(q + "questl").innerHTML = "lvl " + quests[q].level;
      did(q + "questi").style.borderColor = "yellow";
    }
    else if(quests[q].state==='complete') {
      if (!quests[q].once) {questPopup(q); quests[q].once=true}
      did(q + "quest").style.filter = "brightness(1)";
      did(q + "questl").innerHTML = "Redeem";
      did(q + "questl").style.background = "#37b330";
      did(q + "questi").style.borderColor = "#37b330";
    }
    else if(quests[q].state==='completed') {
      did(q + "quest").style.filter = "brightness(0.3)";
      did(q + "questl").innerHTML = "Completed";
      did(q + "questl").style.background = "gray";
      did(q + "questi").style.borderColor = "gray";
    }

    if (quests[q].state==='locked' && quests[q].level <= rpgClass[stats.currentClass].level && !quests[q].locked){
      quests[q].state='pending';  
    }

    if(quests[q].state==='pending' || quests[q].state==='complete'){
    eval(quests[q].objective);  
    }
  }
  }
} createQuest();

function questPopup(id) {
  playSound("audio/ring.mp3")
  const div = document.createElement('div');
  div.innerHTML = '&#128220 Quest Completed: '+quests[id].name
  div.className = 'logPopUp';
  div.id = id+'popUp';
  div.style.backgroundColor = "#6da5bf"
  document.body.appendChild(div);
  setTimeout(function () { div.remove() }, 5000);

}

function questReward(money, exp) { //generic rewards for quests, also used for exp candies
  rpgPlayer.coins += money;   
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
setInterval(function () { if (stats.currentCategory === "rpgContainer") { createShopItem(); } }, 1000);

function createShopItem() {
  for (let si in shopItems) {
    if (si.startsWith(stats.currentArea)){
    if (!did(shopItems[si].id + "shopItem")) {
      const areadiv = document.createElement("div");
      areadiv.id = shopItems[si].id + "shopItem";
      areadiv.innerHTML = '<div class=soldOut id="' + shopItems[si].id + 'itemTag">SOON</div><div class="itemSlot" id="' + shopItems[si].id + 'displayItem"><img id="' + si + 'image" src="img/src/items/' + shopItems[si].item + '.png"></div>'; did("shopListing").appendChild(areadiv);
      if (shopItems[si].item.startsWith("I103")) did(si+"image").src = "img/src/items/I103.png"
      areadiv.className = "shopItemCasing";
      if (items[shopItems[si].item].quality === "Common")
        did(shopItems[si].id + "displayItem").style.border = "white solid 1px";
      if (items[shopItems[si].item].quality === "Uncommon")
        did(shopItems[si].id + "displayItem").style.border =
          "#1eff00 solid 1px";
      if (items[shopItems[si].item].quality === "Rare")
        did(shopItems[si].id + "displayItem").style.border =
          "#0070dd solid 1px";
      if (items[shopItems[si].item].quality === "Epic")
        did(shopItems[si].id + "displayItem").style.border =
          "#a335ee solid 1px";
      if (items[shopItems[si].item].quality === "Legendary")
        did(shopItems[si].id + "displayItem").style.border =
          "#ff8000 solid 1px";
      if (items[shopItems[si].item].quality === "Relic")
        did(shopItems[si].id + "displayItem").style.border =
          "#e6cc80 solid 1px";
      if (items[shopItems[si].item].quality === "Quest")
        did(shopItems[si].id + "displayItem").style.border = "yellow solid 1px";
      //tooltip here
      shopItemButton(shopItems[si]);
      tooltipShopItem(shopItems[si], si);
    }

    if (shopItems[si].unlocked === false) {
      did(shopItems[si].id + "itemTag").style.display = "flex";
      did(shopItems[si].id + "itemTag").innerHTML = "SOON";
    }
    if (shopItems[si].stock < 1) {
      did(shopItems[si].id + "itemTag").style.display = "flex";
      did(shopItems[si].id + "itemTag").innerHTML = "SOLD OUT";
    }
    if (shopItems[si].stock < 1 || shopItems[si].unlocked === false)
      did(shopItems[si].id + "displayItem").style.filter = "grayscale(0.6)";
    }
  }
} createShopItem();

stats.boughtItems = 0;

function shopItemButton(area) {
  if (did(area.id + "shopItem")) {
    did(area.id + "shopItem").addEventListener("click", function () {
      if ( rpgPlayer.coins >= area.price && (area.stock > 0 || area.stock==="∞") && area.unlocked !== false ) {
        playSound("audio/button3.mp3"); 
        rpgPlayer.coins -= area.price;
        if (area.stock !=="∞") {area.stock--;}
        items[area.item].count++;
        stats.boughtItems++;
        did(area.id + "displayItem").style.animation = "";
        void did(area.id + "displayItem").offsetWidth;
        did(area.id + "displayItem").style.animation = "buyAnimation 0.2s 1";
        updateCounters();
        createShopItem();
      } else {
        playSound("audio/thud.mp3"); 
        did(area.id + "displayItem").style.animation = "";
        void did(area.id + "displayItem").offsetWidth;
        did(area.id + "displayItem").style.animation = "noBuyAnimation 0.2s 1";
      }
    });
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

    did("questButton").className = "gearButtonInactive";
    if (unlocks.areas) did("areaButton").className = "gearButtonInactive";
    if (unlocks.shop) did("shopButton").className = "gearButtonInactive";

    did(tab).style.display = "flex";
    did(button).className = "gearButtonActive";
    }
  });
}

changeRPGTab("questButton", "questTab");
changeRPGTab("areaButton", "areaTab");
changeRPGTab("shopButton", "shopTab");

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
    setBonus();
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
    tierMaxHp = 250;
    did("rpgPlayerImg").src = "img/src/armor/A1.png";
  } 
  else if ( h === "I14" && c === "I17" && l === "I18" && f === "I13" && d === "I16" ) { //pirate
    tierMaxHp = 1000;
    did("rpgPlayerImg").src = "img/src/armor/A2.png";
  } 
  else if ( h === "I74" && c === "I76" && l === "I77" && f === "I73" && d === "I75" ) { //explorer
    did("rpgPlayerImg").src = "img/src/armor/A3.png";
    rpgPlayer.align = "nature"
    updateAlignUi();
  } 
  else { //no tier
    tierMaxHp = 0;
    did("rpgPlayerImg").src = "img/src/armor/A0.png";
    rpgPlayer.align = "none"
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
      did("tooltipName").textContent = item.name;
      did("tooltipPrice").innerHTML = "(Max " + item.max + ")";
      if (item.max === 1) did("tooltipPrice").innerHTML = "(Singular)";
      if (item.unique) did("tooltipPrice").innerHTML = "(Unique)";

      if ("align" in item)  did("tooltipRarity").innerHTML = item.quality + '<br><img class="alignTooltipIcon" src="img/src/icons/'+item.align+'.png"></img>'; 
      else did("tooltipRarity").innerHTML = item.quality;

      if (item.quality === "Common") {
        did("tooltipRarity").style.color = "white";
        did("tooltipName").style.color = "white";
      }
      if (item.quality === "Uncommon") {
        did("tooltipRarity").style.color = "#1eff00";
        did("tooltipName").style.color = "#1eff00";
      }
      if (item.quality === "Rare") {
        did("tooltipRarity").style.color = "#0070dd";
        did("tooltipName").style.color = "#0070dd";
      }
      if (item.quality === "Epic") {
        did("tooltipRarity").style.color = "#a335ee";
        did("tooltipName").style.color = "#a335ee";
      }
      if (item.quality === "Legendary") {
        did("tooltipRarity").style.color = "#ff8000";
        did("tooltipName").style.color = "#ff8000";
      }
      if (item.quality === "Relic") {
        did("tooltipRarity").style.color = "#e6cc80";
        did("tooltipName").style.color = "#e6cc80";
      }
      if (item.quality === "Quest") {
        did("tooltipRarity").style.color = "yellow";
        did("tooltipName").style.color = "yellow";
      }

      if (item.sell === 0)
        did("tooltipDescription").innerHTML =
          item.description +
          '<br><div class="separador"></div><div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ed4e4e"> Non Sellable<br></div>';
      else
        did("tooltipDescription").innerHTML = item.description + '<br><div class="separador"></div><div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">' + item.sell + " (" + item.sell * item.count + ") Turtle Coins<br></div>";

      did("tooltipFlavor").textContent = item.flavor;
      did("tooltipImage").src = "img/src/items/" + item.img + ".png";
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
        var referenceLeft = referenceRect.left + 26;
        var referenceTop = referenceRect.top - 15;
        var newLeft =
          referenceLeft + referenceRect.width - movingDiv.offsetWidth;
        var newTop = referenceTop - movingDiv.offsetHeight;
        movingDiv.style.left = newLeft + "px";
        movingDiv.style.top = newTop + "px";
      }
    });
    did(item.id + "item").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }
}

function tooltipStatsHelpingDuck() {
  let tipNumber = 0;
  did('statsHelpingDuck').addEventListener("click", function () {
    tipNumber = (tipNumber + 1) % 4;
    playSound("audio/button3.mp3")
    if (tipNumber===0){
      did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">When you level up, your Strength, Max Health and Regeneration go up.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';
      did("tooltipArrowRight").style.top = "30%";}
  
    if (tipNumber===1){
      did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">Be sure to pay attention to alignments!<br><br><img id="chartImage" src="img/src/icons/alignChart.png"><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';
      did("tooltipArrowRight").style.top = "10%";}

    if (tipNumber===2){
        did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">Haste determines the speed of your attack over the base 100% (the lower the faster)<div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';
        did("tooltipArrowRight").style.top = "30%";}

    if (tipNumber===3){
          did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">When Drop Chance goes over 100%, youll have the chance of getting multiple items per kill.<div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';
          did("tooltipArrowRight").style.top = "30%";}

  })
    did('statsHelpingDuck').addEventListener("mouseenter", function () {
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";

    if (tipNumber===0){
      did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">When you level up, your Strength, Max Health and Regeneration go up.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';
      did("tooltipArrowRight").style.top = "30%";}
  
    if (tipNumber===1){
      did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">Be sure to pay attention to alignments!<br><br><img id="chartImage" src="img/src/icons/alignChart.png"><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';
      did("tooltipArrowRight").style.top = "10%";}

    if (tipNumber===2){
      did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">Haste determines the speed of your attack over the base 100% (the lower the faster)<div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';
      did("tooltipArrowRight").style.top = "30%";}

    if (tipNumber===3){
      did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">When Drop Chance goes over 100%, youll have the chance of getting multiple items per kill.<div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';
      did("tooltipArrowRight").style.top = "30%";}

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

function tooltipInventoryHelpingDuck() {
  let tipNumber = 0;
  did('inventoryHelpingDuck').addEventListener("click", function () {
    tipNumber = (tipNumber + 1) % 4;
    playSound("audio/button3.mp3")
    if (tipNumber===0){
      did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">There is no limit of how many different items you can have on the inventory (at least i didnt code one...!)<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';}
  
    if (tipNumber===1){
      did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">Increase the maximum items you can hold in one stack with bags.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';}

    if (tipNumber===2){
       did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">Hold shift to sell your items.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';}
  
    if (tipNumber===3){
       did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">If an item is marked as "Singular" you wont be able to get more copies of that item until you get rid of it first, if its marked as "Unique" you only will able to get that item once ever.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';}
   
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

    if (tipNumber===0){
      did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">There is no limit of how many different items you can have on the inventory (at least i didnt code one...!)<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';}
  
    if (tipNumber===1){
      did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">Increase the maximum items you can hold in one stack with bags.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';}

    if (tipNumber===2){
       did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">Hold shift to sell your items.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';}
  
    if (tipNumber===3){
       did("tooltipDescription").innerHTML ='<FONT COLOR="#edd585">If an item is marked as "Singular" you wont be able to get more copies of that item until you get rid of it first, if its marked as "Unique" you only will able to get that item once ever.<br><div class="separador"></div><FONT COLOR="gray"><br>Click to cycle through tips';}
   
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

function tooltipShopItem(outcome, shop) {
  if (did(outcome.id + "shopItem") && outcome.unlocked !== false) {
    did(outcome.id + "shopItem").addEventListener("mouseenter", function () {
      did("tooltip").style.display = "flex";
      did("tooltipName").textContent = items[outcome.item].name;
      did("tooltipPrice").innerHTML = "Stock: " + outcome.stock;
      did("tooltipRarity").textContent = items[outcome.item].quality;

      if (items[outcome.item].quality === "Common") {
        did("tooltipRarity").style.color = "white";
        did("tooltipName").style.color = "white";
      }
      if (items[outcome.item].quality === "Uncommon") {
        did("tooltipRarity").style.color = "#1eff00";
        did("tooltipName").style.color = "#1eff00";
      }
      if (items[outcome.item].quality === "Rare") {
        did("tooltipRarity").style.color = "#0070dd";
        did("tooltipName").style.color = "#0070dd";
      }
      if (items[outcome.item].quality === "Epic") {
        did("tooltipRarity").style.color = "#a335ee";
        did("tooltipName").style.color = "#a335ee";
      }
      if (items[outcome.item].quality === "Legendary") {
        did("tooltipRarity").style.color = "#ff8000";
        did("tooltipName").style.color = "#ff8000";
      }
      if (items[outcome.item].quality === "Relic") {
        did("tooltipRarity").style.color = "#e6cc80";
        did("tooltipName").style.color = "#e6cc80";
      }
      if (items[outcome.item].quality === "Quest") {
        did("tooltipRarity").style.color = "yellow";
        did("tooltipName").style.color = "yellow";
      }

      did("tooltipDescription").innerHTML =
        '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' +
        shopItems[shop].price +
        ' Turtle Coins<br></div><div class="separador"></div><FONT COLOR="white">' +
        items[outcome.item].description +
        '<br><div class="separador"></div>';
      did("tooltipFlavor").textContent = items[outcome.item].flavor;
      did("tooltipImage").src = "img/src/items/" + items[outcome.item].id + ".png";
      if (items[outcome.item].id.startsWith("I103")) did("tooltipImage").src = "img/src/items/I103.png";
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
      did("tooltipPrice").innerHTML = "Killed:" + beautify(enemies[stats.currentEnemy].killCount);

    if (gatherDifficulty.includes(enemies[stats.currentEnemy].difficulty)) did("tooltipRarity").textContent = "Resource";
    else if ("align" in enemies[stats.currentEnemy]) did("tooltipRarity").innerHTML = "Enemy"+ '<br><img class="alignTooltipIcon" src="img/src/icons/'+enemies[stats.currentEnemy].align+'.png"></img>'; 
    else did("tooltipRarity").innerHTML = "Enemy";

    did("tooltipRarity").style.color = "white";
    did("tooltipName").style.color = "white";
    did("tooltipArrow").style.display = "none";
    did("tooltipArrowRight").style.display = "flex";
    
    did("tooltipDescription").innerHTML =  enemies[stats.currentEnemy].description+'<br><br><FONT COLOR="#edd585">Dedicated Drops:<br>'+enemies[stats.currentEnemy].dropDesc

    did("tooltipFlavor").textContent = "";
    did("tooltipImage").src =
      "img/src/enemies/" + enemies[stats.currentEnemy].miniImg + ".png";
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
        did("tooltipPrice").innerHTML = buffs[b].time + "s left";
        if (buffs[b].food) did("tooltipRarity").textContent = "Food Buff";
        else if (buffs[b].potion) did("tooltipRarity").textContent = "Potion Buff";
        else if (buffs[b].food) did("tooltipRarity").textContent = "Food Buff";
        else if (buffs[b].buff != true) did("tooltipRarity").textContent = "Debuff";
        else did("tooltipRarity").textContent = "Buff";
        did("tooltipRarity").style.color = "white";
        did("tooltipName").style.color = "white";
        did("tooltipDescription").innerHTML = buffs[b].description;
        did("tooltipFlavor").textContent = "";
        if (b.startsWith("B1")) did("tooltipImage").src = "img/src/buffs/B1.png";
        else did("tooltipImage").src = "img/src/buffs/" + buffs[b].img + ".png";
        //position related code
        const movingDiv = did("tooltip");
        const referenceDiv = did(b + "buff");
        const referenceRect = referenceDiv.getBoundingClientRect();
        const referenceLeft = referenceRect.left + 33;
        const referenceTop = referenceRect.top - 15;
        const newLeft =
          referenceLeft + referenceRect.width - movingDiv.offsetWidth;
        const newTop = referenceTop - movingDiv.offsetHeight;
        movingDiv.style.left = newLeft + "px";
        movingDiv.style.top = newTop + "px";
      });
      did(b + "buff").addEventListener("mouseleave", function () {
        resetTooltip();
      });
    }
  }
}

function tooltipAreas(area) {
  if (did(area.id + "area")) {
    did(area.id + "area").addEventListener("mouseenter", function () {
      //on mouseenter
      did("tooltip").style.display = "flex";
      did("tooltipName").textContent = area.name;
      did("tooltipPrice").innerHTML = "";
      did("tooltipRarity").textContent = "Area";
      did("tooltipRarity").style.color = "white";
      did("tooltipName").style.color = "white";
      did("tooltipDescription").innerHTML =
        "Select this area to travel to " + area.name + "";
      did("tooltipFlavor").textContent = area.description;
      did("tooltipImage").src = "img/src/areas/" + area.mini + ".png";
      //position related code
      const movingDiv = did("tooltip");
      const referenceDiv = did(area.id + "area");
      const referenceRect = referenceDiv.getBoundingClientRect();
      const referenceLeft = referenceRect.left + 33;
      const referenceTop = referenceRect.top - 15;
      const newLeft =
        referenceLeft + referenceRect.width - movingDiv.offsetWidth;
      const newTop = referenceTop - movingDiv.offsetHeight;
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";
    });
    did(area.id + "area").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }
}

function tooltipQuests(quest) {
  if (did(quest.id + "quest")) {
    did(quest.id + "quest").addEventListener("mouseenter", function () {
      //on mouseenter
      if (quest.level <= rpgClass[stats.currentClass].level && !quest.locked) {
        did("tooltip").style.display = "flex";
        did("tooltipName").innerHTML = quest.name;
        did("tooltipPrice").innerHTML = "";
        did("tooltipRarity").textContent = "Quest";
        did("tooltipRarity").style.color = "#FFD100";
        did("tooltipName").style.color = "#FFD100";
        did("tooltipDescription").innerHTML = quest.description;
        did("tooltipFlavor").textContent = "";
        did("tooltipImage").src = "img/src/items/quest.png";
        //position related code
        const movingDiv = did("tooltip");
        const referenceDiv = did(quest.id + "quest");
        const referenceRect = referenceDiv.getBoundingClientRect();
        const referenceLeft = referenceRect.left + 33;
        const referenceTop = referenceRect.top - 15;
        const newLeft =
          referenceLeft + referenceRect.width - movingDiv.offsetWidth;
        const newTop = referenceTop - movingDiv.offsetHeight;
        movingDiv.style.left = newLeft + "px";
        movingDiv.style.top = newTop + "px";
      }
    });
    did(quest.id + "quest").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }
}

function tooltipBossButton() {
  did("bossButton").addEventListener("mouseenter", function () {
    //on mouseenter
    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Press to summon the boss of this area.<FONT COLOR="#D83063"<br><br>Requires ['+items[areas[stats.currentArea].bossKey].name+'] x1';
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
      '<FONT COLOR="#edd585">Press to fight the weakest enemy on this area.';
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
      '<FONT COLOR="#edd585">Press to fight the average enemy on this area.';
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
      '<FONT COLOR="#edd585">Press to fight the strongest enemy on this area.';
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

    if (rpgPlayer.align==="nature") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+mightIcon+' Might and decreased against '+elementalIcon+' Elemental.';
    if (rpgPlayer.align==="might") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+elementalIcon+' Elemental and decreased against '+natureIcon+' Nature.';
    if (rpgPlayer.align==="elemental") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Increased damage reduction against '+natureIcon+' Nature and decreased against '+mightIcon+' Elemental.';
    if (rpgPlayer.align==="occult") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Decreased damage reduction against '+deificIcon+' Deific.';
    if (rpgPlayer.align==="deific") did("tooltipDescription").innerHTML = '<FONT COLOR="#edd585">Decreased damage reduction against '+occultIcon+' Occult.';

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
//#endregion
//----------------------==========================-----------------------
//----------------------===========BUFFS==========-----------------------
//----------------------==========================-----------------------
//#region Buffs
let snapshot = 0;
setInterval(playerBuffs, 1000);
function playerBuffs() { //only UI
  for (let b in buffs) {
    if (buffs[b].time > 0) { //if time more than 0
      
      if (!did(b + "buff")) {  //if it doesnt exist
       
        const bufdiv = document.createElement("div");
        bufdiv.id = b + "buff";

        if (b.startsWith("B1")) bufdiv.innerHTML = '<div class="playerBuffTimer" id="' + b + 'timer"></div><img src="img/src/buffs/B1.png"></div>';
        else bufdiv.innerHTML = '<div class="playerBuffTimer" id="' + b + 'timer"></div><img src="img/src/buffs/' + b + '.png"></div>';

        bufdiv.className = "playerBuffIcon";

        if (buffs[b].buff) { bufdiv.style.border = "#83e781 solid 1px";
        } else { bufdiv.style.border = "#bf3b32 solid 1px";}

        if (buffs[b].player) { did("playerBuffWrapper").appendChild(bufdiv);
        } else { did("enemyBuffWrapper").appendChild(bufdiv); 
      }
        tooltipBuffs();
        snapshot = buffs[b].time;
      }

      if (did(b + "buff")) { //if it does
        buffs[b].time--;
        eval(buffs[b].effect);
        let percentage = 100 - ((buffs[b].time / snapshot) * 100);
        did(b + "timer").style.transform = 'scaleY('+percentage+"%)";

      } 
    }

    if (buffs[b].time < 1 && did(b + "buff")) {
      did(b + "buff").remove();
      resetTooltip();
      buffs[b].statUp = 0;
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


function removeBuffs(category) { //Removes all buffs pertaining to a specific category
  let type = category;
  if (type === "food") { for (let i in buffs) { if (buffs[i].food) buffs[i].time = 0; }}
  if (type === "potion") { for (let i in buffs) { if (buffs[i].potion) buffs[i].time = 0; }}    
    
  
}

//#endregion
//----------------------==========================-----------------------
//----------------------======INITIALIZATION======-----------------------
//----------------------==========================-----------------------
//#region Initialization
function updateStatsUI() {
  
  did("statsNatureDamage").style.display = baseNatureDamage > 0 ? "inline" : "none";
  did("statsElementalDamage").style.display = baseElementalDamage > 0 ? "inline" : "none";
  did("statsMightDamage").style.display = baseMightDamage > 0 ? "inline" : "none";
  did("statsDeificDamage").style.display = baseDeificDamage > 0 ? "inline" : "none";
  did("statsOccultDamage").style.display = baseOccultDamage > 0 ? "inline" : "none";
  did("statsHaste").style.display = playerHaste < 2000 ? "inline" : "none";
  did("statsMiningDamage").style.display = baseMiningDamage > 0 ? "inline" : "none";
  did("statsHerbloreDamage").style.display = baseHerbloreDamage > 0 ? "inline" : "none";

  did("statsHealth").textContent = "❖ Max Health: " + beautifyDamage(playerMaxHp);
  did("statsRegen").textContent = "❖ Regeneration: " + beautifyDamage(playerHpRegen);
  did("statsNatureDamage").textContent = "❖ Nature Damage: " + (baseNatureDamage + additiveNatureDamage * multiplicativeNatureDamage);
  did("statsElementalDamage").textContent = "❖ Elemental Damage: " + (baseElementalDamage + additiveElementalDamage * multiplicativeElementalDamage);
  did("statsMightDamage").textContent = "❖ Might Damage: " + (baseMightDamage + additiveMightDamage * multiplicativeMightDamage);
  did("statsDeificDamage").textContent = "❖ Deific Damage: " + (baseDeificDamage + additiveDeificDamage * multiplicativeDeificDamage);
  did("statsOccultDamage").textContent = "❖ Occult Damage: " + (baseOccultDamage + additiveOccultDamage * multiplicativeOccultDamage);
  did("statsHaste").textContent = "❖ Haste: " + (playerHaste / 2000) * 100 + "%";
  did("statsStrength").textContent = "❖ Strength: " + playerStrength;
  did("turtleName2").textContent = stats.turtleName;
  did("turtleLevel").textContent = "[lvl " + rpgClass[stats.currentClass].level + "]";
  did("statsMiningDamage").textContent = "❖ Mining Power: " + playerMiningDamage;
  did("statsHerbloreDamage").textContent = "❖ Herblore Power: " + playerHerbloreDamage;
  did("statsDropChance").textContent = "❖ Drop Chance: " + Math.round(multiplicativeDropChance * 100) + "%";
}

document.addEventListener("DOMContentLoaded", rpgInitialization);

//this hack activates on click the tab once and calls armor initialisation. sideeffect of this is that armor stats wont be gained until the player loads the tab!!!
document.addEventListener("DOMContentLoaded", rpgGearHack);
function rpgGearHack() {
  if (stats.currentCategory !== "rpgContainer") {
    did("rpgTab").addEventListener(
      "click",
      function () {
        setTimeout(initGearAll, 1000);
      },
      { once: true }
    );
  }
}

function rpgInitialization() {
  expBar();
  statsUpdate();
  updateStatsUI();
  encounterButtonPress();
  hpRegen();
  if (stats.currentCategory === "rpgContainer")
    setTimeout(initGearAll, 1000);
  switchArea();
  specialButtonUi();
  contractLog();
  statsUpdate();
  spawnEnemy();
  updateClass();
}
//#endregion