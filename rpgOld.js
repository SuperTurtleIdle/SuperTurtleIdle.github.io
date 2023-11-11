var playerAttackInterval = setInterval(playerAttack, playerHaste);

const enemyAttackMS = 2500;

var enemyAttackInterval = setInterval(enemyAttack, enemyAttackMS);

setInterval(hpRegen, 1000);
var foodRegen = 0;

for (let e in enemies) {
  var currentHP = enemies[e].hp;
  var percentageHP = (currentHP / enemies[e].hp) * 100;
  var percentageplayerHP = (rpgPlayer.hp / playerMaxHp) * 100;
}

const rangedIcon = '<img src="img/sys/ranged.png">';
const physIcon = '<img src="img/sys/phys.png">';
const magicIcon = '<img src="img/sys/magic.png">';

//start ejasd

const gatherDifficulty = ["ore", "herb"];

var logTrack69 = false;
var logTrackDamage = 0;
//close

function playerAttack() {
  for (let e in enemies) {
    if (did(enemies[e].id + "enemy")) {
      if (rpgPlayer.alive === 1) {
        //attack code

        if (gatherDifficulty.includes(enemies[currentEnemy].difficulty)) {
          var damageDealt = 10; //this will be mining power o whatever

          currentHP -= damageDealt;
          damageText(beautifyDamage(damageDealt) + " dmg", "damageText");

          logPrint(
            stats.turtleName +
              " deals <FONT COLOR='#e8643c'>" +
              damageDealt +
              " damage<FONT COLOR='white'> to <FONT COLOR='#ffbd54'>" +
              enemies[e].name +
              "!"
          );
        } else {
          var damageFormula =
            playerStrength +
            Math.max(playerPhysAttack - enemies[currentEnemy].physDefense, 0) +
            Math.max(
              playerMagicAttack - enemies[currentEnemy].magicDefense,
              0
            ) +
            Math.max(
              playerRangedAttack - enemies[currentEnemy].rangedDefense,
              0
            );

          var damageDealt = Math.round(
            damageFormula + Math.random() * (damageFormula * 0.2)
          );

          currentHP -= damageDealt;
          damageText(beautifyDamage(damageDealt) + " dmg", "damageText");

          if (damageDealt === 69) logTrack69 = true;
          logTrackDamage = damageDealt;
          //log mssg when player hits creature
          logPrint(
            stats.turtleName +
              " deals <FONT COLOR='#e8643c'>" +
              damageDealt +
              " damage<FONT COLOR='white'> to <FONT COLOR='#ffbd54'>" +
              enemies[e].name +
              "!"
          );
        }

        //updates hp bar
        percentageHP = (currentHP / enemies[e].hp) * 100;
        did("enemyHpBar").style.background =
          "linear-gradient(90deg, rgb(144,238,111)" +
          percentageHP +
          "%, rgb(255,119,119) " +
          percentageHP +
          "%)";

        did("playerAnimation").style.animation = "";
        void did("playerAnimation").offsetWidth;
        did("playerAnimation").style.animation =
          "playerAttack " + playerHaste / 1000 / 2 + "s 1 ease";

        did("npcPanel").style.animation = "";
        void did("npcPanel").offsetWidth;
        did("npcPanel").style.animation = "gelatine 0.3s 1 ease";
      }
    }

    if (did("enemyAnimation").childElementCount === 0 && currentHP > 0)
      currentHP = 0; //failsafe to prevent unspawned enemies
  }

  enemyUpdate();
}

function enemyUpdate() {
  //updates enemy HP and checks if enemy is dead

  if (currentHP <= 0) {
    //on enemy kill
    for (let e in enemies) {
      if (did(enemies[e].id + "enemy")) {
        did(enemies[e].id + "enemy").style.animation =
          "enemyDefeat 0.2s 1 ease";
        setTimeout(function () {
          did(enemies[e].id + "enemy").remove();
        }, 180);
        enemies[e].killCount++;

        let totalCoins = enemies[e].coins + additiveCoinGain;
        rpgPlayer.coins += totalCoins;
        stats.totalCoins += totalCoins;

        if (gatherDifficulty.includes(enemies[currentEnemy].difficulty))
          logPrint(
            "<FONT COLOR='white'>You obtain <FONT COLOR='#ae77f7'> " +
              enemies[e].exp +
              " EXP <FONT COLOR='white'>from the <FONT COLOR='#ffbd54'>" +
              enemies[e].name
          );
        else
          logPrint(
            "<FONT COLOR='#ffbd54'>" +
              enemies[e].name +
              " <FONT COLOR='white'>gets defeated and drops<FONT COLOR='#ffbd54'> " +
              totalCoins +
              " Turtle Coins <FONT COLOR='white'>and<FONT COLOR='#ae77f7'> " +
              enemies[e].exp +
              " EXP!"
          );

        for (let a in areas) {
          if (
            areas[a].active === 1 &&
            areas[a].mastery <= areas[a].maxMastery
          ) {
            areas[a].mastery += enemies[e].exp;
            rpgPlayer.exp += enemies[e].exp;
          }
        }
        trinketEnemyKill(); //trinket effect
        switchArea();
        expBar();
        bossTime = false;
        eval(enemies[e].drop1);
        eval(enemies[e].drop2);
        eval(enemies[e].drop3);
      }
    }

    //this resets attack timer of enemy if it dies
    clearInterval(enemyAttackInterval);
    enemyAttackInterval = setInterval(enemyAttack, enemyAttackMS);

    if (bossTime === false) {
      //generates a random enemy within the actual area if theres not a boss

      const enemyKeys = Object.keys(enemies).filter(
        (key) =>
          enemies[key].area === rpgPlayer.area &&
          enemies[key].difficulty === rpgPlayer.difficulty
      );
      const randomEnemyKey =
        enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
      spawnEnemy(randomEnemyKey);
    }

    did("enemyHpBar").style.background =
      "linear-gradient(90deg, rgb(144,238,111)" +
      percentageHP +
      "%, rgb(255,119,119) " +
      percentageHP +
      "%)";
  }

  percentageHP = (currentHP / enemies[currentEnemy].hp) * 100;
  did("enemyHpBar").style.background =
    "linear-gradient(90deg, rgb(144,238,111)" +
    percentageHP +
    "%, rgb(255,119,119) " +
    percentageHP +
    "%)";
}

function hpRegen() {
  if (rpgPlayer.alive === 1) {
    //if player alive
    if (rpgPlayer.hp < playerMaxHp) rpgPlayer.hp += playerHpRegen;
    percentageplayerHP = (rpgPlayer.hp / playerMaxHp) * 100;
    did("playerHpBar").style.background =
      "linear-gradient(90deg, rgb(144,238,111)" +
      percentageplayerHP +
      "%, rgb(255,119,119) " +
      percentageplayerHP +
      "%)";
  } else {
    //if player dead
    if (rpgPlayer.hp < playerMaxHp) rpgPlayer.hp += playerHpRegen / 3;
    percentageplayerHP = (rpgPlayer.hp / playerMaxHp) * 100;
    did("playerHpBar").style.background =
      "linear-gradient(90deg, rgb(144,238,111)" +
      percentageplayerHP +
      "%, rgb(255,119,119) " +
      percentageplayerHP +
      "%)";

    did("playerAnimation").style.animation = "playerDeath 1s 1";
    setTimeout(function () {
      did("playerAnimation").style.transform =
        "rotateX(180deg) translateY(-35%)";
    }, 800);
    did("rpgPlayerImg").src = "img/src/armor/dead.png";

    if (rpgPlayer.hp >= playerMaxHp) {
      rpgPlayer.alive = 1;
      stats.timesDied++; //prevents the player from reloading and getting points
      did("playerAnimation").style.animation = "playerRevive 1s 1";
      setTimeout(function () {
        did("playerAnimation").style.transform = "";
      }, 800);
      did("rpgPlayerImg").src = "img/src/armor/A0.png";
      setBonus();
    }
  }
}

var bossTime = false;

function enemyAttack() {
  if (
    gatherDifficulty.includes(enemies[currentEnemy].difficulty) ||
    rpgPlayer.alive === 0
  ) {
  } else {
    for (let e in enemies) {
      if (did(enemies[e].id + "enemy")) {
        var damageFormula =
          Math.max(enemies[currentEnemy].physAttack - playerPhysDefense, 0) +
          Math.max(enemies[currentEnemy].magicAttack - playerMagicDefense, 0) +
          Math.max(enemies[currentEnemy].rangedAttack - playerRangedDefense, 0);

        var damageDealt = Math.round(
          damageFormula + Math.random() * (damageFormula * 0.2)
        );

        rpgPlayer.hp -= damageDealt;
        damageTextPlayer(beautifyDamage(damageDealt) + " dmg", "damageText");

        //log mssg when player hits creature
        logPrint(
          enemies[e].name +
            " deals <FONT COLOR='#e8643c'>" +
            damageDealt +
            " damage<FONT COLOR='white'> to <FONT COLOR='#ffbd54'>" +
            stats.turtleName +
            "!"
        );

        if ("commonSkill" in enemies[currentEnemy]) {
          if (Math.random() < 0.4) {
            //40% chance per attack
            eval(enemies[currentEnemy].commonSkill);
          }
        }

        //updates player hp bar
        percentageplayerHP = (rpgPlayer.hp / playerMaxHp) * 100;
        did("playerHpBar").style.background =
          "linear-gradient(90deg, rgb(144,238,111)" +
          percentageplayerHP +
          "%, rgb(255,119,119) " +
          percentageplayerHP +
          "%)";
      }
    }

    did("enemyAnimation").style.animation = "";
    void did("enemyAnimation").offsetWidth;
    did("enemyAnimation").style.animation = "enemyAttack 0.5s 1";

    did("playerNpcPanel").style.animation = "";
    void did("playerNpcPanel").offsetWidth;
    did("playerNpcPanel").style.animation = "gelatine 0.3s 1 ease";

    if (rpgPlayer.hp <= 0) {
      //if the player dies

      if (bossTime === true) {
        //if a boss killes the player
        bossTime = false;
        deleteEnemy();
        did("rpgCanvas").style.animation = "";
        void did("rpgCanvas").offsetWidth;
        did("rpgCanvas").style.animation = "rpgFade 1s 1";
      }
      rpgPlayer.alive = 0;
      logPrint(stats.turtleName + " perishes :c");
      hpRegen();
    }
  }
}

var currentEnemy = "0";
function spawnEnemy(ID) {
  let randomEnemyKey = ID;
  const enemyDiv = document.createElement("div");
  enemyDiv.id = randomEnemyKey + "enemy";
  enemyDiv.className = "enemy";
  did("enemyAnimation").appendChild(enemyDiv);
  enemyDiv.innerHTML = '<img src="img/src/enemies/' + randomEnemyKey + '.png">';
  did("enemyName").textContent = enemies[randomEnemyKey].name;
  did("enemyLevel").textContent = enemies[randomEnemyKey].level;
  currentHP = enemies[randomEnemyKey].hp;
  percentageHP = (currentHP / enemies[randomEnemyKey].hp) * 100;
  did("enemyHpBar").style.background =
    "linear-gradient(90deg, rgb(144,238,111)" +
    percentageHP +
    "%, rgb(255,119,119) " +
    percentageHP +
    "%)";
  currentEnemy = ID;
}

setInterval(damageTicks, 1000);
function damageTicks() {
  if (rpgPlayer.alive === 1 && playerPoison > 0) {
    rpgPlayer.hp -= playerPoison;
    damageTextPlayer(playerPoison + " poison dmg", "damageTextPoison");
  }

  if (enemyPoison > 0) {
    currentHP -= enemyPoison;
    damageText(enemyPoison + " poison dmg", "damageTextPoison");
    enemyUpdate();
  }
}

function projectile(img, throwAnimation, particleCount, particleType) {
  //animation of the turtle
  did("rpgPlayerImg").style.animation = "";
  void did("rpgPlayerImg").offsetWidth;
  did("rpgPlayerImg").style.animation = "gelatineHigh 0.3s 1 ease";
  //create projectile
  const projectile = document.createElement("div");
  projectile.id = projectile + "projectile";
  projectile.className = "itemThrow";
  did("playerPanel").appendChild(projectile);
  projectile.style.backgroundImage = "url(img/src/projectiles/" + img + ".png)";
  let type = throwAnimation;
  if (type === "throw") {
    projectile.style.animation =
      "sexyY 0.8s infinite ease-in-out, sexyX 0.8s infinite ease-in-out, itemThrowRotate 0.8s infinite ease-out";
  }
  setTimeout(function () {
    projectile.remove();
  }, 800);
  //particle count
  for (let i = 0; i < particleCount; i++) {
    setTimeout(particle, 50 * i);
  }
  //spawn particle
  function particle() {
    const particle = document.createElement("div");
    particle.className = "throwParticle";
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
  //animation on the enemy
  setTimeout(function () {
    did("enemyAnimation").style.animation = "";
    void did("enemyAnimation").offsetWidth;
    did("enemyAnimation").style.animation = "poisonHit 0.4s 1 ease";
  }, 700);
}

function selfParticle(particleCount, particleType) {
  //animation of the turtle
  did("rpgPlayerImg").style.animation = "";
  void did("rpgPlayerImg").offsetWidth;
  did("rpgPlayerImg").style.animation = "gelatineHigh 0.3s 1 ease";
  //particle count
  for (let i = 0; i < particleCount; i++) {
    setTimeout(particle, 50 * i);
  }
  //spawn particle
  function particle() {
    const particle = document.createElement("div");
    particle.className = "throwParticle";
    did("playerPanel").appendChild(particle);
    particle.style.animation = particleType + " 2s 1 ease";
    setTimeout(function () {
      particle.remove();
    }, 1000);
    //sets the particle position to the projectile with some randomness
    const div2 = did("rpgPlayerImg");
    const maxWidthPercentage = 100 - (20 / div2.clientWidth) * 100; // 20 es el ancho del div1
    const maxHeightPercentage = 100 - (20 / div2.clientHeight) * 100; // 20 es el alto del div1
    const randomXPercentage = Math.random() * maxWidthPercentage;
    const randomYPercentage = Math.random() * maxHeightPercentage;
    particle.style.left = randomXPercentage + "%";
    particle.style.top = randomYPercentage + "%";
  }
}

function beautifyDamage(number) {
  if (number >= 10000) {
    return (number / 1000).toFixed(0) + "K";
  } else {
    return Math.round(number.toString());
  }
}

function damageText(number, type) {
  const damageT = document.createElement("div");
  damageT.className = type;
  did("enemyPanel").appendChild(damageT);
  damageT.innerHTML = number;
  setTimeout(function () {
    damageT.remove();
  }, 1400);
  //sets the particle position to the projectile with some randomness
  const div2 = did("enemyPanel");
  const maxWidthPercentage = 100 - 20 / div2.clientWidth;
  const maxHeightPercentage = 100 - 20 / div2.clientHeight;
  const randomXPercentage = Math.random() * maxWidthPercentage;
  const randomYPercentage = Math.random() * maxHeightPercentage;
  damageT.style.left = randomXPercentage + "%";
  damageT.style.top = randomYPercentage + "%";
}

function damageTextPlayer(number, type) {
  const damageT = document.createElement("div");
  damageT.className = type;
  did("playerPanel").appendChild(damageT);
  damageT.innerHTML = number;
  setTimeout(function () {
    damageT.remove();
  }, 1400);
  //sets the particle position to the projectile with some randomness
  const div2 = did("playerPanel");
  const maxWidthPercentage = 100 - 20 / div2.clientWidth;
  const maxHeightPercentage = 100 - 20 / div2.clientHeight;
  const randomXPercentage = Math.random() * maxWidthPercentage;
  const randomYPercentage = Math.random() * maxHeightPercentage;
  damageT.style.left = randomXPercentage + "%";
  damageT.style.top = randomYPercentage + "%";
}

function statusParticle(particleType, target) {
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

setInterval(function () {
  if (settings.currentCategory === "rpgContainer") {
    statusParticleCheck();
  }
}, 1000);

function statusParticleCheck() {
  //if (buffs.B1.active===1) {statusParticle('particleHealth', 'player');}
  if (buffs.B2.active === 1) {
    statusParticle("particlePoison");
  }
  if (buffs.B3.active === 1) {
    statusParticle("particlePoison", "player");
  }
}

function dropItem(ID, chance, amount) {
  if (Math.random() <= chance) {
    if (items[ID].count < items[ID].max) {
      items[ID].count += amount;

      if (gatherDifficulty.includes(enemies[currentEnemy].difficulty)) {
        logPrint(
          "<FONT COLOR='#8fba77'>You get " +
            items[ID].name +
            " x" +
            amount +
            "!"
        );
      } else
        logPrint(
          "<FONT COLOR='#8fba77'>The enemy drops " +
            items[ID].name +
            " x" +
            amount +
            "!"
        );
    }
  }
}

function rollTable(table, rolls) {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  for (let i = 0; i < rolls; i++) {
    for (let dt in table) {
      let rng = getRandomInt(table[dt].D);
      if (rng === table[dt].D - 1) {
        //because the die can land on 0, substract 1 to make for it
        items[dt].count++;
        console.log("won " + items[dt].name);
      }
    }
  }

  let goldrng = getRandomInt(777777);

  if (goldrng === 777776) {
  }
}

setInterval(itemCooldownTick, 1000);
function itemCooldownTick(ID, time) {
  for (let i in items) {
    if (items[i].cd > 0 && did(items[i].id + "item")) {
      items[i].cd--;
      did(items[i].id + "item").style.filter = "brightness(0.4)";
    }
    if (items[i].cd === 0 && did(items[i].id + "item")) {
      did(items[i].id + "item").style.filter = "brightness(1)";
    }
  }
}

function deleteEnemy() {
  //deletes without loot, used in dungeons, bosses and switching area

  for (let e in enemies) {
    if (did(enemies[e].id + "enemy")) did(enemies[e].id + "enemy").remove();
  }
  currentHP = 0;
  playerAttack();
}

setInterval(function () {
  if (settings.currentCategory === "rpgContainer") {
    addItem();
  }
}, 1000);

function addItem() {
  for (let i in items) {
    if (items[i].count >= 1) {
      if (!did(items[i].id + "item")) {
        //if it doesnt exist yet create it
        const itemdiv = document.createElement("div");
        itemdiv.id = items[i].id + "item";
        if (items[i].max === 1)
          itemdiv.innerHTML =
            '<img src = "img/src/items/' + items[i].id + '.png">';
        else
          itemdiv.innerHTML =
            '<img src = "img/src/items/' +
            items[i].id +
            '.png"><div class="itemCount" id="' +
            items[i].id +
            "itemCount" +
            '">' +
            items[i].count +
            "</div>";
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

        if ("use" in items[i])
          itemUse(items[i].id, function () {
            eval(items[i].use);
          });
        sellItem(i);
      }

      if (did(items[i].id + "item")) {
        //if it exists limite and update ammount
        if (items[i].max < items[i].count) items[i].count = items[i].max;
        if (items[i].max !== 1)
          did(items[i].id + "itemCount").innerHTML = items[i].count;
      }
    }

    if (did(items[i].id + "item") && items[i].count <= 0) {
      did(items[i].id + "item").remove();
    }
  }
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

function itemUse(id, effect) {
  did(id + "item").addEventListener("contextmenu", function () {
    if ("cd" in items[id]) {
      if (items[id].cd > 0 && !sellMode) {
        did(id + "item").style.animation = "";
        void did(id + "item").offsetWidth;
        did(id + "item").style.animation = "noBuyAnimation 0.2s 1";
      }
      if (items[id].cd === 0 && !sellMode) {
        did(id + "item").style.animation = "";
        void did(id + "item").offsetWidth;
        did(id + "item").style.animation = "levelUp 1s 1";
        effect();
      }
    } else if (!sellMode) {
      did(id + "item").style.animation = "";
      void did(id + "item").offsetWidth;
      did(id + "item").style.animation = "levelUp 1s 1";
      effect();
    }
  });
}

stats.soldItems = 0;

function sellItem(id) {
  did(id + "item").addEventListener("click", function () {
    if (sellMode && items[id].sell !== 0) {
      items[id].count--;
      rpgPlayer.coins += items[id].sell;
      stats.soldItems++;
      updateCounters();
      addItem();
    }
  });

  did(id + "item").addEventListener("contextmenu", function () {
    if (sellMode && items[id].sell !== 0) {
      rpgPlayer.coins += items[id].count * items[id].sell;
      stats.soldItems += items[id].count;
      items[id].count = 0;
      updateCounters();
      addItem();
    }
  });
}

const reinforcedClothArray = ["I13", "I14", "I16", "I17", "I18"];

function giveRandomItem(array) {
  let pick = array[Math.floor(Math.random() * array.length)];
  items[pick].count += 1;
}

function expBar() {
  let percentageEXP = (rpgPlayer.exp / rpgPlayer.maxExp) * 100;
  did("expBar").style.background =
    "linear-gradient(90deg, #6FB1EE " +
    percentageEXP +
    "%, #3F3939 " +
    percentageEXP +
    "%)";
  did("currentExp").textContent = rpgPlayer.exp + "/" + rpgPlayer.maxExp;
  did("turtleLevel2").textContent = rpgPlayer.level;
  did("turtleLevel").innerHTML = "[lvl " + rpgPlayer.level + "]";

  if (rpgPlayer.exp >= rpgPlayer.maxExp) {
    //on level up
    rpgPlayer.exp -= rpgPlayer.maxExp;
    rpgPlayer.maxExp = Math.floor(1000 * Math.pow(1.5, rpgPlayer.level));
    rpgPlayer.level += 1;

    let percentageEXP = (rpgPlayer.exp / rpgPlayer.maxExp) * 100;
    did("expBar").style.background =
      "linear-gradient(90deg, #6FB1EE " +
      percentageEXP +
      "%, #3F3939 " +
      percentageEXP +
      "%)";
    did("currentExp").textContent = rpgPlayer.exp + "/" + rpgPlayer.maxExp;

    did("expPanel").style.animation = "";
    void did("expPanel").offsetWidth;
    did("expPanel").style.animation = "levelUp 1s 1";

    rpgPlayer.baseStrength += 9;
    rpgPlayer.baseMaxHp += 67;
    rpgPlayer.baseHpRegen += 6.7;

    statsUpdate();
    updateStatsUI();
  }
}

function levelUp(amount) {
  for (let i = 0; i < amount; i++) {
    rpgPlayer.exp = rpgPlayer.maxExp;
    expBar();
    statsUpdate();
    updateStatsUI();
  }
}

function revive() {
  rpgPlayer.hp = playerMaxHp;
  hpRegen();
}

function removeBossCd() {}

setInterval(function () {
  if (settings.currentCategory === "rpgContainer") {
    createAreaPanel();
  }
}, 1000);
setInterval(function () {
  if (settings.currentCategory === "rpgContainer") {
    createQuest();
  }
}, 1000);

function createAreaPanel() {
  for (let a in areas) {
    if (!did(areas[a].id + "area")) {
      const areadiv = document.createElement("div");
      areadiv.id = areas[a].id + "area";
      areadiv.style.filter = "brightness(0.2)";
      areadiv.innerHTML =
        '<div class="areaPanel1"> <div class="areaImage"> <img src="img/src/areas/' +
        areas[a].mini +
        '.png"></div> </div> <div class="areaPanel2"> <p class="areaPanelName">' +
        areas[a].name +
        '</p> <p class="areaPanelLevel" id="' +
        areas[a].id +
        'areal">lvl ' +
        areas[a].level +
        '</p><p class="areaPanelMastery" id="' +
        areas[a].id +
        'aream">0</p></div>';
      did("areaTab").appendChild(areadiv);
      areadiv.className = "areaPanel";
      //tooltip here
      areaButton(areas[a]);
      tooltipAreas(areas[a]);
    }

    if (areas[a].unlocked === 1) {
      did(areas[a].id + "area").style.filter = "brightness(1)";
    }
    if (rpgPlayer.level >= areas[a].level * 0.7)
      did(areas[a].id + "areal").style.background = "#CD984D";
    if (rpgPlayer.level >= areas[a].level)
      did(areas[a].id + "areal").style.background = "#58B86C";
    did(areas[a].id + "aream").innerHTML =
      Math.floor((areas[a].mastery / areas[a].maxMastery) * 100) + "%";
  }
}
createAreaPanel();

function createQuest() {
  for (let q in quests) {
    if (!did(quests[q].id + "quest")) {
      const questdiv = document.createElement("div");
      questdiv.id = quests[q].id + "quest";
      questdiv.style.filter = "brightness(0.3)";
      questdiv.innerHTML =
        '<div class="areaPanel1" > <div class="areaImage" id="' +
        quests[q].id +
        'questi" style="border-color: #FFD100"> <img src="img/src/items/quest.png"></div> </div> <div class="areaPanel2"> <p class="questPanelName" id="' +
        quests[q].id +
        'questn">?????<br><br></p> <p class="questPanelLevel" id="' +
        quests[q].id +
        'questl" >lvl ' +
        quests[q].level +
        "</p></div>";
      did("questTab").appendChild(questdiv);
      questdiv.className = "questPanel";

      did(quests[q].id + "quest").addEventListener("click", function () {
        if (quests[q].state === "complete") {
          did(quests[q].id + "questl").innerHTML = "Completed";
          quests[q].state = "completed";
          eval(quests[q].effect);
        }
      });

      tooltipQuests(quests[q]);
    }
    //if the player meets the level and quest aint locked
    if (quests[q].level <= rpgPlayer.level && !quests[q].locked) {
      did(quests[q].id + "quest").style.filter = "brightness(1)";
      did(quests[q].id + "questn").innerHTML = quests[q].name;
    }
    if (quests[q].level <= rpgPlayer.level && !quests[q].locked)
      did(quests[q].id + "questl").style.background = "#58B86C";
    //only check the requeriments of quests that are either unlocked or have been fulfilled to prevent cheating
    if (
      (quests[q].state === "pending" || quests[q].state === "complete") &&
      quests[q].level <= rpgPlayer.level &&
      !quests[q].locked
    )
      eval(quests[q].objective);
    //this also checks if they had been to guarantee cheating
    if (quests[q].state === "complete") {
      did(quests[q].id + "questl").innerHTML = "Redeem";
      did(quests[q].id + "questl").style.background = "#37b330";
      did(quests[q].id + "questi").style.borderColor = "#37b330";
      did(quests[q].id + "questn").style.color = "#37b330";
    } else if (quests[q].level <= rpgPlayer.level && !quests[q].locked) {
      did(quests[q].id + "questl").style.background = "#58B86C";
      did(quests[q].id + "questl").innerHTML = "lvl " + quests[q].level;
    }
    //finally after accepting
    if (quests[q].state === "completed") {
      did(quests[q].id + "quest").style.filter = "brightness(0.3)";
      did(quests[q].id + "questl").innerHTML = "Completed";
      did(quests[q].id + "questl").style.background = "gray";
      did(quests[q].id + "questi").style.borderColor = "gray";
      did(quests[q].id + "questn").style.color = "gray";
    }
  }
}
createQuest();

function questReward(money, exp) {
  //generic rewards for quests
  rpgPlayer.coins += money;
  for (let a in areas) {
    if (areas[a].active === 1 && areas[a].mastery <= areas[a].maxMastery) {
      areas[a].mastery += exp;
      rpgPlayer.exp += exp;
    }
  }

  expBar();
  statsUpdate();
  updateStatsUI();
}

function areaButton(area) {
  if (did(area.id + "area")) {
    did(area.id + "area").addEventListener("click", function () {
      if (rpgPlayer.area !== area.id) {
        //wont trigger if its already the area
        rpgPlayer.area = area.id;
        resetAreaButtonClass();
        rpgPlayer.difficulty = "easy";
        switchArea();
        encounterButtonPress();

        did("rpgCanvas").style.animation = "";
        void did("rpgCanvas").offsetWidth;
        did("rpgCanvas").style.animation = "rpgFade 1s 1";
        bossTime = false;
        deleteEnemy();
        bossButton();
        bossTimer();
      }
    });
  }

  function resetAreaButtonClass() {
    //changes styles of every other button

    for (let a in areas) {
      did(areas[a].id + "area").classList.replace(
        "areaPanelSelect",
        "areaPanel"
      );
    }
  }
}

function switchArea() {
  did("rpgCanvas").style.backgroundImage =
    "url(img/src/areas/" + rpgPlayer.area + ".png)";
  did(rpgPlayer.area + "area").classList.replace(
    "areaPanel",
    "areaPanelSelect"
  );
  for (let a in areas) {
    areas[a].active = 0;
  }
  areas[rpgPlayer.area].active = 1;

  for (let a in areas) {
    if (areas[a].active === 1) {
      did("areaName").innerHTML = areas[a].name;
      did("areaLevel").innerHTML = "lvl " + areas[a].level;
      if (rpgPlayer.level < areas[a].level * 0.7)
        did("areaLevel").style.background = "#D85858";
      if (rpgPlayer.level >= areas[a].level * 0.7)
        did("areaLevel").style.background = "#CD984D";
      if (rpgPlayer.level >= areas[a].level)
        did("areaLevel").style.background = "#58B86C";
      did("areaMastery").innerHTML =
        "Mastery: " +
        Math.floor((areas[a].mastery / areas[a].maxMastery) * 100) +
        "%";
    }
  }
}

function bossButton() {
  //despite the name, it works on nodes and all buttons basically

  for (let a in areas) {
    if (areas[a].active === 1) {
      if (areas[a].unlockedBoss === 1) {
        did("bossButton").style.display = "flex";
      } else did("bossButton").style.display = "none";
      if (areas[a].unlockedOre === 1) {
        did("miningNode").style.display = "flex";
      } else did("miningNode").style.display = "none";
      if (areas[a].unlockedHerb === 1) {
        did("herbNode").style.display = "flex";
      } else did("herbNode").style.display = "none";
    }
  }
}

did("bossButton").addEventListener("click", function () {
  if (areas[rpgPlayer.area].currentTimer <= 0) {
    bossTime = true;
    deleteEnemy();
    spawnEnemy(areas[rpgPlayer.area].boss);
    areas[rpgPlayer.area].currentTimer = areas[rpgPlayer.area].bossTimer;
    resetTooltip();
    bossTimer();
  }
});

setInterval(bossTimer, 1000);

function bossTimer() {
  //if (areas[rpgPlayer.area].active === 1) {
  for (let a in areas) {
    areas[a].currentTimer--;
  } //discounts time
  let percent =
    (areas[rpgPlayer.area].currentTimer / areas[rpgPlayer.area].bossTimer) *
    100;
  did("bossButtonTimer").style.background =
    "linear-gradient(180deg, rgba(0,0,0,0.5) " +
    percent +
    "%, rgba(74,74,74,0) " +
    percent +
    "%)";
  //if (buffs[b].left <= 0) {did(buffs[b].id+'buff').remove(); buffs[b].left=buffs[b].timer; buffs[b].active=0; resetTooltip();}

  //}
}

did("encounterEasy").addEventListener("click", function () {
  rpgPlayer.difficulty = "easy";
  encounterButtonPress();
});
did("encounterMedium").addEventListener("click", function () {
  rpgPlayer.difficulty = "medium";
  encounterButtonPress();
});
did("encounterHard").addEventListener("click", function () {
  rpgPlayer.difficulty = "hard";
  encounterButtonPress();
});
did("miningNode").addEventListener("click", function () {
  rpgPlayer.difficulty = "ore";
  encounterButtonPress();
});
did("herbNode").addEventListener("click", function () {
  rpgPlayer.difficulty = "herb";
  encounterButtonPress();
});

function encounterButtonPress() {
  did("encounterEasy").style.boxShadow = "";
  did("encounterMedium").style.boxShadow = "";
  did("encounterHard").style.boxShadow = "";
  did("miningNode").style.boxShadow = "";
  did("herbNode").style.boxShadow = "";
  if (rpgPlayer.difficulty === "easy") {
    did("encounterEasy").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (rpgPlayer.difficulty === "medium") {
    did("encounterMedium").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (rpgPlayer.difficulty === "hard") {
    did("encounterHard").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (rpgPlayer.difficulty === "ore") {
    did("miningNode").style.boxShadow = "inset white 0px 0px 5px 1px";
  } else if (rpgPlayer.difficulty === "herb") {
    did("herbNode").style.boxShadow = "inset white 0px 0px 5px 1px";
  }
}
//----------------------==========================-----------------------
//----------------------============SHOP==========-----------------------
//----------------------==========================-----------------------

setInterval(function () {
  if (settings.currentCategory === "rpgContainer") {
    createShopItem();
  }
}, 1000);

function createShopItem() {
  for (let si in shopItems) {
    if (!did(shopItems[si].id + "shopItem")) {
      const areadiv = document.createElement("div");
      areadiv.id = shopItems[si].id + "shopItem";
      areadiv.innerHTML =
        '<div class=soldOut id="' +
        shopItems[si].id +
        'itemTag">SOON</div><div class="itemSlot" id="' +
        shopItems[si].id +
        'displayItem"><img src="img/src/items/' +
        shopItems[si].item +
        '.png"></div>';
      did("shopListing").appendChild(areadiv);
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
      tooltipShopItem(shopItems[si]);
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
    /*
   if (areas[a].unlocked === 1) {did(areas[a].id+"area").style.filter = 'brightness(1)';}
   if (rpgPlayer.level >= (areas[a].level * 0.7)) did(areas[a].id+'areal').style.background = "#CD984D"
   if (rpgPlayer.level >= (areas[a].level)) did(areas[a].id+'areal').style.background = "#58B86C"    
   did(areas[a].id+'aream').innerHTML = Math.floor(areas[a].mastery/areas[a].maxMastery*100)+"%"*/
  }
}
createShopItem();

function shopItemButton(area) {
  if (did(area.id + "shopItem")) {
    did(area.id + "shopItem").addEventListener("click", function () {
      if (
        rpgPlayer.coins >= area.price &&
        area.stock > 0 &&
        area.unlocked === true
      ) {
        rpgPlayer.coins -= area.price;
        area.stock--;
        items[area.item].count++;
        did(area.id + "displayItem").style.animation = "";
        void did(area.id + "displayItem").offsetWidth;
        did(area.id + "displayItem").style.animation = "buyAnimation 0.2s 1";
        updateCounters();
        createShopItem();
      } else {
        did(area.id + "displayItem").style.animation = "";
        void did(area.id + "displayItem").offsetWidth;
        did(area.id + "displayItem").style.animation = "noBuyAnimation 0.2s 1";
      }
    });
  }
}

//----------------------==========================-----------------------
//----------------------============UI============-----------------------
//----------------------==========================-----------------------

var sellMode = false;

document.addEventListener("keydown", function (event) {
  if (event.shiftKey) {
    sellMode = true;
    did("sellModeText").style.display = "inline";
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "Shift") {
    sellMode = false;
    did("sellModeText").style.display = "none";
  }
});

function changeRPGTab(button, tab) {
  did(button).addEventListener("click", function () {
    did("questTab").style.display = "none";
    did("areaTab").style.display = "none";
    did("shopTab").style.display = "none";

    did("questButton").className = "gearButtonInactive";
    did("areaButton").className = "gearButtonInactive";
    did("shopButton").className = "gearButtonInactive";

    did(tab).style.display = "flex";
    did(button).className = "gearButtonActive";
  });
}

changeRPGTab("questButton", "questTab");
changeRPGTab("areaButton", "areaTab");
changeRPGTab("shopButton", "shopTab");

rpgPlayer.contractedLog = false;

did("combatLogArrow").addEventListener("click", function () {
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

//----------------------==========================-----------------------
//----------------------========GEAR SLOTS========-----------------------
//----------------------==========================-----------------------

function initGear(slot, div) {
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

function initGearAll() {
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

function removeGear(div, slot, path, category) {
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

function weaponSwap(ID) {
  did("playerWeapon").src = "img/src/weaponModels/" + ID + ".png";
}

function trinketEnemyKill() {}

var logTrackTier = false;
var logTrackFullSlots = false;

function setBonus() {
  let h = rpgPlayer.headSlot;
  let c = rpgPlayer.chestSlot;
  let l = rpgPlayer.legsSlot;
  let f = rpgPlayer.feetSlot;
  let d = rpgPlayer.handsSlot;
  let w = rpgPlayer.weaponSlot;
  let t = rpgPlayer.trinketSlot;
  let r = rpgPlayer.ringSlot;

  if (h === "I3" && c === "I5" && l === "I6" && f === "I2" && d === "I4") {
    tierPhysDefense = 50;
    did("rpgPlayerImg").src = "img/src/armor/A1.png";
    logTrackTier = true;
  } //cloth
  else if (
    h === "I14" &&
    c === "I17" &&
    l === "I18" &&
    f === "I13" &&
    d === "I16"
  ) {
    tierMagicDefense = 1000;
    did("rpgPlayerImg").src = "img/src/armor/A2.png";
    logTrackTier = true;
  } //pirate
  else if (
    h === "I74" &&
    c === "I76" &&
    l === "I77" &&
    f === "I73" &&
    d === "I75"
  ) {
    tierRangedDefense = 1000;
    did("rpgPlayerImg").src = "img/src/armor/A3.png";
    logTrackTier = true;
  } //explorer
  else {
    tierPhysDefense = 0;
    tierMagicDefense = 0;
    tierRangedDefense = 0;
    did("rpgPlayerImg").src = "img/src/armor/A0.png";
  }

  if (
    h !== "none" &&
    c !== "none" &&
    l !== "none" &&
    f !== "none" &&
    d !== "none" &&
    w !== "none" &&
    t !== "none" &&
    r !== "none"
  )
    logTrackFullSlots = true;
}

//----------------------==========================-----------------------
//----------------------=========TOOLTIPS=========-----------------------
//----------------------==========================-----------------------

function tooltipItems(item) {
  if (did(item.id + "item")) {
    did(item.id + "item").addEventListener("mouseenter", function () {
      //on mouseenter
      did("tooltip").style.display = "flex";
      did("tooltipName").textContent = item.name;
      if (item.max === 1) did("tooltipPrice").innerHTML = "(Singular)";
      else did("tooltipPrice").innerHTML = "(Max " + item.max + ")";
      did("tooltipRarity").textContent = item.quality;

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
        did("tooltipDescription").innerHTML =
          item.description +
          '<br><div class="separador"></div><div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">' +
          item.sell +
          " (" +
          item.sell * item.count +
          ") Turtle Coins<br></div>";

      did("tooltipFlavor").textContent = item.flavor;
      did("tooltipImage").src = "img/src/items/" + item.id + ".png";
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

function tooltipShopItem(outcome) {
  if (did(outcome.id + "shopItem") && outcome.unlocked === true) {
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
        items[outcome.item].sell +
        ' Turtle Coins<br></div><div class="separador"></div><FONT COLOR="white">' +
        items[outcome.item].description +
        '<br><div class="separador"></div>';
      did("tooltipFlavor").textContent = items[outcome.item].flavor;
      did("tooltipImage").src =
        "img/src/items/" + items[outcome.item].id + ".png";
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

    did("tooltipName").textContent = enemies[currentEnemy].name;
    if (gatherDifficulty.includes(enemies[currentEnemy].difficulty))
      did("tooltipPrice").innerHTML =
        "Gathered:" + beautify(enemies[currentEnemy].killCount);
    else
      did("tooltipPrice").innerHTML =
        "Killed:" + beautify(enemies[currentEnemy].killCount);
    if (gatherDifficulty.includes(enemies[currentEnemy].difficulty))
      did("tooltipRarity").textContent = "Resource";
    else did("tooltipRarity").textContent = "Enemy";
    did("tooltipRarity").style.color = "white";
    did("tooltipName").style.color = "white";
    did("tooltipArrow").style.display = "none";
    did("tooltipArrowRight").style.display = "flex";
    //aqui meterle un if killcount>x para el bestiario, meterlo dentro de esto de abajo
    //did("tooltipDescription").innerHTML = enemies[e].description+'<br><FONT COLOR="#edd585"> Resistances: '+physIcon + enemies[e].physDefense+'%  '+rangedIcon + enemies[e].rangedDefense+'%  '+magicIcon + enemies[e].magicDefense+'%<br><br>Drops:<br>'+enemies[e].drops.id1n+' '+enemies[e].drops.id1w*100+'%<br>'+enemies[e].drops.id2n*100+' '+enemies[e].drops.id2w*100+'%<br>'+enemies[e].drops.id3n+' '+enemies[e].drops.id3w+'%';

    let drop1 = "";
    let drop1w = "";
    let drop2 = "";
    let drop2w = "";
    let drop3 = "";
    let drop3w = "";

    if ("drop1" in enemies[currentEnemy]) {
      let weight1 = enemies[currentEnemy].drop1.split(",");
      let weight1value = weight1[1].trim();
      drop1 = "<br><br>Dedicated Drops:<br>" + enemies[currentEnemy].drop1name;
      drop1w = " " + weight1value * 100 + "%";
    }

    if ("drop2" in enemies[currentEnemy]) {
      let weight2 = enemies[currentEnemy].drop2.split(",");
      let weight2value = weight2[1].trim();
      drop2 = "<br>" + enemies[currentEnemy].drop2name;
      drop2w = " " + weight2value * 100 + "%";
    }

    if ("drop3" in enemies[currentEnemy]) {
      let weight3 = enemies[currentEnemy].drop3.split(",");
      let weight3value = weight3[1].trim();
      drop3 = "<br>" + enemies[currentEnemy].drop3name;
      drop3w = " " + weight3value * 100 + "%";
    }

    if (gatherDifficulty.includes(enemies[currentEnemy].difficulty))
      did("tooltipDescription").innerHTML =
        enemies[currentEnemy].description +
        '<FONT COLOR="#edd585">' +
        drop1 +
        drop1w +
        drop2 +
        drop2w +
        drop3 +
        drop3w;
    else
      did("tooltipDescription").innerHTML =
        enemies[currentEnemy].description +
        '<br><FONT COLOR="#edd585"> Resistances: ' +
        physIcon +
        enemies[currentEnemy].physDefense +
        "   " +
        rangedIcon +
        enemies[currentEnemy].rangedDefense +
        "   " +
        magicIcon +
        enemies[currentEnemy].magicDefense +
        drop1 +
        drop1w +
        drop2 +
        drop2w +
        drop3 +
        drop3w;

    did("tooltipFlavor").textContent = "";
    did("tooltipImage").src =
      "img/src/enemies/" + enemies[currentEnemy].miniImg + ".png";
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
}
tooltipEnemies();

function tooltipBuffs() {
  for (let b in buffs) {
    if (did(buffs[b].id + "buff")) {
      did(buffs[b].id + "buff").addEventListener("mouseenter", function () {
        //on mouseenter
        did("tooltip").style.display = "flex";
        did("tooltipName").textContent = buffs[b].name;
        did("tooltipPrice").innerHTML = buffs[b].left + "s left";
        did("tooltipRarity").textContent = "Buff";
        did("tooltipRarity").style.color = "white";
        did("tooltipName").style.color = "white";
        did("tooltipDescription").innerHTML = buffs[b].description;
        did("tooltipFlavor").textContent = "";
        did("tooltipImage").src = "img/src/buffs/" + buffs[b].img + ".png";
        //position related code
        const movingDiv = did("tooltip");
        const referenceDiv = did(buffs[b].id + "buff");
        const referenceRect = referenceDiv.getBoundingClientRect();
        const referenceLeft = referenceRect.left + 33;
        const referenceTop = referenceRect.top - 15;
        const newLeft =
          referenceLeft + referenceRect.width - movingDiv.offsetWidth;
        const newTop = referenceTop - movingDiv.offsetHeight;
        movingDiv.style.left = newLeft + "px";
        movingDiv.style.top = newTop + "px";
      });
      did(buffs[b].id + "buff").addEventListener("mouseleave", function () {
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
      if (quest.level <= rpgPlayer.level) {
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
    if (areas[rpgPlayer.area].currentTimer > 0)
      did("tooltipDescription").innerHTML =
        'The boss of this area can be summoned in <FONT COLOR="#edd585">' +
        areas[rpgPlayer.area].currentTimer +
        " seconds.";
    if (areas[rpgPlayer.area].currentTimer <= 0)
      did("tooltipDescription").innerHTML =
        '<FONT COLOR="#edd585">Press to summon the boss of this area.';
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
}
tooltipBossButton();

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
}
tooltipEncounterEasy();

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
}
tooltipEncounterMedium();

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
}
tooltipEncounterHard();

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
}
tooltipMiningNode();

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
}
tooltipHerbNode();

//----------------------==========================-----------------------
//----------------------=======BUFF SYSTEM========-----------------------
//----------------------==========================-----------------------

setInterval(playerBuffs, 1000);

function playerBuffs() {
  for (let b in buffs) {
    if (buffs[b].active >= 1) {
      if (!did(buffs[b].id + "buff")) {
        //creation if it doesnt exist

        const bufdiv = document.createElement("div");
        bufdiv.id = buffs[b].id + "buff";
        bufdiv.innerHTML =
          '<div class="playerBuffTimer" id="' +
          buffs[b].id +
          'timer"></div><img src="img/src/buffs/' +
          buffs[b].id +
          '.png"></div>';
        bufdiv.className = "playerBuffIcon";
        if (buffs[b].buff === true) {
          bufdiv.style.border = "#83e781 solid 1px";
        } else {
          bufdiv.style.border = "#bf3b32 solid 1px";
        }
        if (buffs[b].player === true) {
          did("playerBuffWrapper").appendChild(bufdiv);
        } else {
          did("enemyBuffWrapper").appendChild(bufdiv);
        }
        eval(buffs[b].effect);
        tooltipBuffs();
      }

      if (did(buffs[b].id + "buff")) {
        //if exists update timer

        buffs[b].left--; //discounts time
        buffs[b].percentage = (buffs[b].left / buffs[b].timer) * 100;
        did(buffs[b].id + "timer").style.background =
          "linear-gradient(0deg, rgba(74,74,74,0) " +
          buffs[b].percentage +
          "%, rgba(0,0,0,0.5) " +
          buffs[b].percentage +
          "%)";
        if (buffs[b].left <= 0) {
          did(buffs[b].id + "buff").remove();
          buffs[b].left = buffs[b].timer;
          buffs[b].active = 0;
          resetTooltip();
        }
      }
    }
  }
}

function buffEffect(strength, id) {
  buffs[id].statUp = strength;
  setTimeout(function () {
    buffs[id].statUp = 0;
    statsUpdate();
    updateStatsUI();
  }, buffs[id].left * 1000);
  statsUpdate();
  updateStatsUI();
}

function removeBuffs(category) {
  let type = category;
  if (type === "food") {
    for (let i in buffs) {
      if (buffs[i].food) buffs[i].active = 0;
      buffs[i].left = buffs[i].timer;
    }
  }
}

//----------------------==========================-----------------------
//----------------------======INITIALIZATION======-----------------------
//----------------------==========================-----------------------

function updateStatsUI() {
  did("statsPhysAttack").style.display =
    playerPhysAttack > 0 ? "inline" : "none";
  did("statsRangedAttack").style.display =
    playerRangedAttack > 0 ? "inline" : "none";
  did("statsMagicAttack").style.display =
    playerMagicAttack > 0 ? "inline" : "none";
  did("statsPhysDefense").style.display =
    playerPhysDefense > 0 ? "inline" : "none";
  did("statsRangedDefense").style.display =
    playerRangedDefense > 0 ? "inline" : "none";
  did("statsMagicDefense").style.display =
    playerMagicDefense > 0 ? "inline" : "none";
  did("statsHaste").style.display = playerHaste < 2000 ? "inline" : "none";

  did("statsHealth").textContent =
    "❖ Max Health: " + beautifyDamage(playerMaxHp);
  did("statsRegen").textContent =
    "❖ Regeneration: " + beautifyDamage(playerHpRegen);
  did("statsPhysAttack").textContent = "❖ Physical Attack: " + playerPhysAttack;
  did("statsRangedAttack").textContent =
    "❖ Ranged Attack: " + playerRangedAttack;
  did("statsMagicAttack").textContent = "❖ Magic Attack: " + playerMagicAttack;
  did("statsPhysDefense").textContent =
    "❖ Physical Defense: " + playerPhysDefense;
  did("statsRangedDefense").textContent =
    "❖ Ranged Defense: " + playerRangedDefense;
  did("statsMagicDefense").textContent =
    "❖ Magic Defense: " + playerMagicDefense;
  did("statsHaste").textContent =
    "❖ Haste: " + (playerHaste / 2000) * 100 + "%";
  did("statsStrength").textContent = "❖ Strenght: " + playerStrength;
  did("turtleName2").textContent = stats.turtleName;
  did("turtleLevel").textContent = "LvL [" + rpgPlayer.level + "]";
}

document.addEventListener("DOMContentLoaded", rpgInitialization);

//this hack activates on click the tab once and calls armor initialisation. one sidenote of this is that armor stats wont be gained until the player loads the tab!!!
document.addEventListener("DOMContentLoaded", rpgGearHack);
function rpgGearHack() {
  if (settings.currentCategory !== "rpgContainer") {
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
  currentHP = 0; //esentially kills the enemy on start to kick off enemyspawn
  playerAttack();
  expBar();
  statsUpdate();
  updateStatsUI();
  encounterButtonPress();
  hpRegen();
  if (settings.currentCategory === "rpgContainer")
    setTimeout(initGearAll, 1000);
  switchArea();
  bossButton();
  contractLog();
  statsUpdate();
}
