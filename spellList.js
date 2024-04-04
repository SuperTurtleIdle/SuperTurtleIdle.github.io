function castLightDynamite(){
    logPrint(`<FONT COLOR="#18ccba"> You throw a Light Dynamite`);
    playSound("audio/throw.mp3");
    animParticleProjectile("bomb", "throw", 9, "particleSmoke", 0);
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
    setTimeout(() => {
        enemyElementalDamage(rng(130000,140000), "noScale");
        animParticleBurst(10 , "particleSmoke", "enemyPanel", 0);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1"); 
        playSound("audio/explosion.mp3")

        if (enemies[stats.currentEnemy].tag === "ore") {
            const startIndex = enemies[stats.currentEnemy].drop.indexOf("dropItem('") + "dropItem('".length;
            const endIndex = enemies[stats.currentEnemy].drop.indexOf("')", startIndex);
            if (startIndex !== -1 && endIndex !== -1) {
                currentDrop = enemies[stats.currentEnemy].drop.substring(startIndex, endIndex);
                items[currentDrop].count+= rng(30,50)
                addItem()
            }
        }
    }, 700);
    
    }


function castPurifyingSalt(){
    playSound("audio/throw.mp3");
    animParticleProjectile("none", "throw", 5, "particleSpark", 0);
    animParticleProjectile("none", "throw", 5, "particleSpark", 0);
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");

    if (stats.currentEnemy === "E18") {
    setTimeout(() => {
        
        animParticleBurst(10 , "particleFire", "enemyPanel", 200);
        animParticleBurst(10 , "particleSpark", "enemyPanel", 200);
        animImageSplash("soundWave", "enemyPanel", "wave", 200);
        animImageSplash("ghost", "enemyPanel", "float", 0);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        playSound("audio/gas.mp3");
        enemyPhase=2;
        enemyDamageMultiplier = 6
        enemyDefenseMultiplier = 0.2
        currentHP = enemies.E18.hp;
        enemyUpdate();
        did(stats.currentEnemy+"enemy").style.filter = 'hue-rotate(250deg)'
        did(stats.currentEnemy+"enemy").style.opacity = '0.6'

        
    }, 700);

}

    if (stats.currentEnemy === "E1") {
        setTimeout(() => {
            
            animParticleBurst(10 , "particleSpark", "enemyPanel", 200);
            currentHP=0;
            enemyUpdate();
            logs.P61.unlocked=true;
    
            
        }, 700);



    }
}

function castSoulCanister(){
    logPrint(`<FONT COLOR="#18ccba"> You throw a Soul Canister`);
    playSound("audio/throw.mp3");
    animParticleProjectile("soulCanister", "throw", 0, "particleSmoke", 0);
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
    setTimeout(() => {
        enemyOccultDamage(rng(1600000,1700000), "noScale");
        animImageSplash("ghost", "enemyPanel", "float", 0);
        animParticleBurst(10 , "particleFire", "enemyPanel", 180);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        animImageSplash("circle", "enemyPanel", "explosion", 0);
        playSound("audio/explosion.mp3")}, 700); 
    }

stats.ignitedCubomites = 0;

function castCubomite(){

        playerElementalDamage(100000);
        animParticleBurst(10 , "particleFire", "enemyPanel", 0);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        animImageSplash("circle", "enemyPanel", "explosion", 0);
        animImageSplash("soundWave", "enemyPanel", "wave", 0);
        animState("rpgPlayerImg", "shake 0.4s 1");
        playSound("audio/explosion.mp3");
        stats.ignitedCubomites++
        currentHP = 0;
        enemyUpdate()
    }

function castNetOLauncher3000(){
    logPrint(`<FONT COLOR="#18ccba"> You use the Net-O-Launcher 3000`);
    playSound("audio/throw.mp3"); 
    animImageSplash("net", "enemyPanel", "downwards", 0);
    buffs.B6.time=10;
    playerBuffs();}

function castBoxingGloves(){ 
    animImageSplash("punch", "enemyPanel", "impact", 0);
    clearInterval(enemyAttackInterval);
    enemyAttackInterval = setInterval(enemyAttack, enemyAttackMS);
    playerBuffs();}

function castKingKat1(){
    logPrint(`<FONT COLOR="#18ccba"> The enemy throws a fierce punch!`);
    animImageSplash("punch", "playerPanel", "impact", 0);
    animState("rpgPlayerImg", "shake 0.4s 1");
    playerMightDamage(rng(4000,6000))
}

function castKingKat2(){
    logPrint(`<FONT COLOR="#18ccba"> The enemy enrages!`);
    for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
 function loop() {
    animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
    animImageSplash("soundWave", "enemyPanel", "wave", 100, undefined ,'boss');
    did(stats.currentEnemy+"enemy").style.filter = 'hue-rotate(330deg)'
    enemyPhase = 2
    }
    enemyDamageMultiplier = 1.4
}

function castKingMysterio1(){
    logPrint(`<FONT COLOR="#18ccba"> The enemy throws a fierce punch!`);
    animImageSplash("punch", "playerPanel", "impact", 0);
    animState("rpgPlayerImg", "shake 0.4s 1");
    playerMightDamage(rng(3000,5000))
}


function castTerragosa1(){
    logPrint(`<FONT COLOR="#18ccba"> The enemy uses its claws!`);
    animImageSplash("doubleSlash", "playerPanel", "impact", 0);
    animState("rpgPlayerImg", "shake 0.4s 1");
    playerMightDamage(rng(80000,100000))
}

function castTerragosa2(){
    logPrint(`<FONT COLOR="#18ccba"> The enemy opens its mouth!`);
    animParticleProjectile("none", "reverseThrow", 12, "particleFire", 140);
    setTimeout(() => {
        animState("rpgPlayerImg", "shake 0.4s 1");
        animParticleBurst(7 , "particleFire", "playerPanel", 140);
        playerElementalDamage(rng(150000,200000))
    }, 600);
}

function castDaiGoran(){
    logPrint(`<FONT COLOR="#18ccba"> The enemy opens its mouth!`);
    animParticleProjectile("spike", "reverseThrow", 3, "particlePoison", 0);
    setTimeout(() => {
        animState("rpgPlayerImg", "shake 0.4s 1");
        animParticleBurst(3 , "particleFire", "particlePoison", 0);
        if (!buffs.B34.time>0) buffs.B57.time+=30;
        playerBuffs();
    }, 600);
}

function castRoyalPudding1(){
    logPrint(`<FONT COLOR="#18ccba"> The enemy splashes arround!`);
    animParticleProjectile("none", "reverseThrow", 12, "particlePoison", 180);
    setTimeout(() => {
        animState("rpgPlayerImg", "shake 0.4s 1");
        animParticleBurst(7 , "particlePoison", "playerPanel", 140);
        playerDeificDamage(rng(25000,30000))
    }, 600);
}

function castTerragosa3(){
    logPrint(`<FONT COLOR="#18ccba"> The enemy morphs!`);
    for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
 function loop() {
    animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
    animImageSplash("soundWave", "enemyPanel", "wave", 200, undefined ,'boss');
    animParticleBurst(10 , "particleFire", "enemyPanel", 100,'boss');
    did(stats.currentEnemy+"enemy").style.filter = 'hue-rotate(330deg)'
    enemyPhase = 2
    }
    enemyDamageMultiplier = 16
}

function castKingKat2(){
    logPrint(`<FONT COLOR="#18ccba"> The enemy enrages!`);
    for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
 function loop() {
    animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
    animImageSplash("soundWave", "enemyPanel", "wave", 100, undefined ,'boss');
    did(stats.currentEnemy+"enemy").style.filter = 'hue-rotate(330deg)'
    enemyPhase = 2
    }
    enemyDamageMultiplier = 1.4
}

function castLesserPoisonFlask(){
    logPrint(`<FONT COLOR="#18ccba"> You throw a Lesser Poison Flask`);
    playSound("audio/throw.mp3");
    animParticleProjectile("poison", "throw", 9, "particlePoison", 0);
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
    setTimeout(() => {
        animParticleBurst(7 , "particlePoison", "enemyPanel", 0);
        playSound("audio/gas.mp3");
        buffs.B2.time+=30;
        playerBuffs(); }, 700);}

function castHexTag(){
    logPrint(`<FONT COLOR="#18ccba"> You use the Hex Tag`);
    playSound("audio/page.mp3");
    playSound("audio/gas.mp3");
    animImageSplash("eye", "enemyPanel", "impact", 0);
    animParticleBurst(7 , "particlePoison", "enemyPanel", 200);
    animState(stats.currentEnemy+"enemy", "flash 0.4s 1");
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
    buffs.B50.time+=20;
    playerBuffs(); 
    }

function castEdgeOfCataclysm(){
    for (let i = 0; i < 4; i++) { setTimeout(loop, 250 * i);}
    function loop() {
    let damageDealt = rng(500,650);
    
    animParticleProjectile("fireball", "rain", 9, "particleFire", 0);
    
    setTimeout(() => {
        animParticleBurst(1 , "particleFire", "enemyPanel", 0);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        enemyDeificDamage(damageDealt);
    }, 700);
    }
}

function castBluefinTuna(){ //weapon skill
    for (let i = 0; i < 3; i++) { setTimeout(loop, 250 * i);}
    function loop() {
    
    animParticleProjectile("fish", "rain", 0, "particleFire", 0);
    
    setTimeout(() => {
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        enemyDeificDamage(playerTotalDeificDamage*0.4, "noScale");
    }, 700);
    }
}

function castPringuSet(){ 

    
    animParticleProjectile("fish", "rain", 0, "particleFire", 0);
    
    setTimeout(() => {
        enemyDeificDamage(rng(8000,10000), "noScale");
    }, 700);
    
}

function castPineBoomerang(){
    logPrint(`<FONT COLOR="#18ccba"> You throw a Pine Boomerang`);
    animParticleProjectile("boomerang", "throw", 0, "particleSmoke", 0);
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
    setTimeout(() => {
        enemyNatureDamage(rng(260,300), 'noScale');
        animState(stats.currentEnemy+"enemy", "gelatine 0.4s 1");
        playSound("audio/throw.mp3")}, 700);}

function castRegalBroadsword(){ //weapon skill
    animImageSplash("slash", "enemyPanel", "impact", 0);
    animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
    enemyMightDamage(rng(150,200));}

function castJungleKingSet(){ 
    animImageSplash("doubleSlash", "enemyPanel", "impact", 0);
    animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
    enemyMightDamage(rng(1800,2000), 'noScale');
}

function castPringuEmperor1(){ 
    animState(stats.currentEnemy+"enemy", "flash 0.4s 1");
    animParticleBurst(6 , "particleHealth", "enemyPanel", 0);
    enemyHealingDamage(enemies.E23.hp*0.08);
}

function castMoonlitGreatsword(){ //weapon skill
    animImageSplash("slash", "enemyPanel", "impact", 0);
    animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
    animParticleBurst(6 , "particleGlow2", "enemyPanel", 50);
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    animImageSplash("moon", "playerPanel", "float", 0);
    
    setTimeout(() => {
        animState("rpgPlayerImg", "flash 0.5s 1");
        animParticleBurst(7 , "particleLight", "playerPanel", 100);
        buffs.B17.time=10;
        playerBuffs()
    }, 1300);}

function castSerizawaFestival(){ //weapon skill
    animParticleBurst(4 , "particleConfetti", "playerPanel", 0); 
    setTimeout(() => { animParticleBurst(4 , "particleConfetti", "playerPanel", 100); }, 200);
    setTimeout(() => { animParticleBurst(4 , "particleConfetti", "playerPanel", 200); }, 400);
    setTimeout(() => { animParticleBurst(4 , "particleConfetti", "playerPanel", 400); }, 600);
        animState("rpgPlayerImg", "flash 0.5s 1");
        animParticleBurst(7 , "particleLight", "playerPanel", 100);
        buffs.B18.time=10;
        playerBuffs();}

function castFoliarBlade(){ //weapon skill

    animState("rpgPlayerImg", "flash 0.5s 1");
    animImageSplash("sunray", "playerPanel", "rotate", 0);
    setTimeout(() => {
        animState("rpgPlayerImg", "flash 0.5s 1");
        animParticleBurst(7 , "particleLight", "playerPanel", 100);
        buffs.B19.time=10;
        playerHealingDamage((multiplicativeNatureDamage-1)*1000)
        playerBuffs()
    }, 1300);}


function castTheCaught(){ //weapon skill
    animImageSplash("whirlpool", "enemyPanel", "rotate", 0);
    for (let i = 0; i < 6; i++) { setTimeout(loop, 300 * i);}
 function loop() {
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    enemyMightDamage(rng(100,200));
}

}

function castPenguinsUmbrella(){ //weapon skill

    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");

    let outcome = rng(1,5)

    if (outcome===1) animParticleProjectile("bomb", "throw", 9, "particleConfetti", 0);
    if (outcome===2) animParticleProjectile("card", "throw", 9, "particleConfetti", 0);
    if (outcome===3) animParticleProjectile("dove", "throw", 9, "particleConfetti", 0);
    if (outcome===4) animParticleProjectile("bunny", "throw", 9, "particleConfetti", 0);
    if (outcome===5) animParticleProjectile("fish", "throw", 9, "particleConfetti", 0);

    setTimeout(() => {
        animState(stats.currentEnemy+"enemy", "gelatine 0.4s 1");
        playSound("audio/throw.mp3");
        if (outcome===1) enemyElementalDamage(rng(1000,1500));
        if (outcome===2) enemyMightDamage(rng(800,1000));
        if (outcome===3) enemyNatureDamage(rng(800,1000));
        if (outcome===4) enemyDeificDamage(rng(200,300));
        if (outcome===5) enemyOccultDamage(rng(800,1000));
    }, 700);
    

}

    
    
function castMoonSlash(){ //weapon skill
    animImageSplash("slash", "enemyPanel", "impact", 0);
    animParticleBurst(6 , "particleGlow2", "enemyPanel", 50);
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    let damageDealt = rng(500,650);
    enemyElementalDamage(damageDealt);}

function castSacrificialDagger(){ //weapon skill
    animImageSplash("holySlash", "enemyPanel", "impact", 0);
    animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
    let damageDealt=rng(200,350);
    enemyOccultDamage(damageDealt);
    animParticleProjectile("none", "reverseThrow", 9, "particleGlow", 130);
    setTimeout(() => {
        playerHealingDamage(playerTotalOccultDamage*3);
        animParticleBurst(3 , "particleHealth", "playerPanel", 0);  }, 700);}

function castTerrorscythe(){ //weapon skill
    animImageSplash("ghost", "enemyPanel", "float", 0);
    animImageSplash("holySlash", "enemyPanel", "impact", 0);
    animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
    animParticleBurst(9 , "particleGlow2", "enemyPanel", 130);
    animParticleProjectile("none", "reverseThrow", 9, "particleGlow", 130);
    setTimeout(() => {
        animParticleBurst(7 , "particleGlow2", "playerPanel", 130);  
        animParticleBurst(7 , "particleLight", "playerPanel", 0);
        buffs.B20.time=10;
        playerBuffs();
    }, 700);}

let wraithbladeCooldown = 0;
function castWraithbladeScimitar(){ //weapon skill

    wraithbladeCooldown--
    if (wraithbladeCooldown<=0) {
        buffs.B33.time=10;
        animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
        animParticleBurst(2 , "particleFire", "enemyPanel", 130);
        if (buffs.B33.stacks<10) buffs.B33.stacks++;
    }
    if (buffs.B33.stacks>=10) {
        castWraithbladeScimitar2();
        buffs.B33.time=0;
        wraithbladeCooldown = 7;
        enemyOccultDamage(playerTotalOccultDamage*3, "noScale");
    }

    playerBuffs(); 


    function castWraithbladeScimitar2(){

        animImageSplash("ghost", "enemyPanel", "float", 0);
        animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
        animParticleBurst(8 , "particleFire", "enemyPanel", 130);
        animImageSplash("soundWave", "enemyPanel", "wave", 200);




    }
}

function castPlundergeist1(){ //weapon skill
    animImageSplash("ghost", "playerPanel", "float", 0);
    animImageSplash("slash", "playerPanel", "impact", 0);
    animState("rpgPlayerImg", "shake 0.4s 1");
    animParticleBurst(5 , "particleFire", "playerPanel", 130);
    buffs.B58.time=15;
    buffs.B58.stacks++;
    if (buffs.B58.stacks>14){
        rpgPlayer.hp = 0;
        playerUpdate();
        buffs.B58.time=0;
    }
    playerBuffs(); 
}

function castInfernalus1(){ 
    animImageSplash("holySlash", "playerPanel", "impact", 0);
    animState("rpgPlayerImg", "shake 0.4s 1");
    animParticleBurst(5 , "particleFire", "playerPanel", 0);
    buffs.B59.time=15;
    buffs.B59.stacks++;
    playerBuffs(); 
}

function castInfernalus2(){
    for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
 function loop() {
    animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
    animImageSplash("soundWave", "enemyPanel", "wave", 100, undefined ,'boss');
    animParticleBurst(5 , "particleFire", "enemyPanel", 0);
    animState("rpgPlayerImg", "shake 0.4s 1");
    }
    buffs.B60.time=20;
    playerBuffs();
}

function castCopperworkAxe(){ //weapon skill
    animParticleProjectile("none", "throw", 9, "particleSmoke", 0);
    setTimeout(() => {
        animParticleBurst(7 , "particleSmoke", "enemyPanel", 0);
        playSound("audio/button4.mp3");
        enemyElementalDamage(100); }, 700);}

function castMagewoodStaff(){ //weapon skill
    animParticleProjectile("fireball", "throwArrow", 5, "particleFire", 0);
    setTimeout(() => {
        animParticleBurst(3 , "particleFire", "enemyPanel", 0);
        playerAttackHit()
        playSound("audio/button4.mp3"); }, 700);}

function castHoopperonasPhylactery(){
    animImageSplash("bite", "enemyPanel", "impact", 0);
    animParticleBurst(7 , "particlePoison", "enemyPanel", 0);
    animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
    buffs.B54.time=10;
    playerBuffs()
}

function castEmblemOfGodhood(){
    animImageSplash("holyRay", "enemyPanel", "impact", 0);
    animParticleBurst(2 , "particleGlow2", "enemyPanel", 100);
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    animImageSplash("circle", "enemyPanel", "explosion", 0);
    enemyDeificDamage(rng(1200,1600));
    if (rng(1,1000)===1){
        playSound("audio/lilyhead.mp3");
        did("tortugaClick").src = "img/src/tortugasdefault/imgpog.png"; 
        
        animState("rpgPlayerImg", "gelatineHigh 0.6s 1");
        setTimeout(() => {
            animState("rpgPlayerImg", "gelatineHigh 0.6s 1");
            setTimeout(() => {
                animState("rpgPlayerImg", "gelatineHigh 0.6s 1");
                    setTimeout(() => {
                animState("rpgPlayerImg", "spin 2s 1");
                    setTimeout(() => {
                        animState("rpgPlayerImg", "spin 3s 1");
                        setTimeout(() => {

                            animState("rpgPlayerImg", "gelatineHigh 1.5s 1");
                            setTimeout(() => {
                                animState("rpgPlayerImg", "gelatineHigh 1s 1");

                        }, 1000);
                        }, 2000);
                    }, 1000);
                }, 800);
            }, 800);
        }, 800);



    } 
}

function castThunderousGyroresonator(){
    animImageSplash("lightning", "enemyPanel", "impact", 0);
    animParticleBurst(2 , "particleGlow2", "enemyPanel", 100);
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    enemyElementalDamage(rng(returnItemUpgradeScaling(4800, "I201"),returnItemUpgradeScaling(5100, "I201")), "noScale");
}
        
function castFirekegCannon(){ //weapon skill
    animParticleProjectile("fireball", "throwArrow", 5, "particleFire", 0);
    setTimeout(() => {
        animParticleBurst(3 , "particleFire", "enemyPanel", 0);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        animImageSplash("circle", "enemyPanel", "explosion", 0);
        if (!settings.disableCombatAudio) playSound("audio/button4.mp3");
        playerAttackHit() }, 700);}           

function castWoodenBow(){ //weapon skill
    animParticleProjectile("arrow", "throwArrow", 0, "particleSmoke", 0);
    setTimeout(() => {
        playerAttackHit()
        if (!settings.disableCombatAudio) playSound("audio/button4.mp3")
    }, 600);}

function castChrysalisRecurver(){ //weapon skill
    animParticleProjectile("spike", "throwArrow", 0, "particleSmoke", 0);
    setTimeout(() => {
        playerAttackHit();
        if (!settings.disableCombatAudio) playSound("audio/button4.mp3")
    }, 600);}

function castHoopperoona1(){
    logPrint(`<FONT COLOR="#18ccba"> The enemy shows its fangs!`)
    animImageSplash("bite", "playerPanel", "impact", 0);
    animParticleBurst(7 , "particlePoison", "playerPanel", 0);
    animState("rpgPlayerImg", "shake 0.4s 1");
    playerNatureDamage(rng(50,60))
    if (!buffs.B34.time>0) buffs.B3.time=10;
    playerBuffs();
}

function castHoopperoonaJr1(){
    logPrint(`<FONT COLOR="#18ccba"> The enemy shows its fangs!`)
    animImageSplash("bite", "playerPanel", "impact", 0);
    animParticleBurst(7 , "particlePoison", "playerPanel", 0);
    animState("rpgPlayerImg", "shake 0.4s 1");
    playerNatureDamage(rng(1000,2000))
    if (!buffs.B34.time>0) buffs.B56.time=10;
    playerBuffs();
}

let thiefCollectibles = {
  I283:{P:collectibleChance1,A:1, R:"medium"}, 
  I284:{P:collectibleChance1,A:1, R:"medium"},
}

stats.timesStolen = 0;
let enemyLevel = 1;
function castThief(){
    animState(stats.currentEnemy+"enemy", "gelatine 0.4s 1");
    animParticleProjectile("thief", "reverseThrow", 0, "particleSmoke", 0);
    setTimeout(() => {
        
        if (rng(1,3)===1) { //Successfull steal
        playSound("audio/use.mp3")
        stats.timesStolen++;
        let stolenItem;

        if (enemies[stats.currentEnemy].level !== ''){
        const cadena = enemies[stats.currentEnemy].level;
        enemyLevel = parseInt(cadena.match(/\d+/)[0]);
        }
        
        if (enemyLevel<41){ //low level money
            if (rng(1,15)===1){
                items.I285.count++
                stolenItem = items.I285.name
            } else if (rng(1,5)===1){
                items.I95.count++
                stolenItem = items.I95.name
            } else {
                items.I94.count++
                stolenItem = items.I94.name
            }
        }

        if (stats.currentEnemy === "E9") if (rng(1,15)===1) {items.I24.count++; stolenItem = items.I24.name} //picore en teoria esto tiene 21% de que salga cada 10 steals
        if (stats.currentEnemy === "E17") if (rng(1,2)===1) {items.I215.count++; stolenItem = items.I215.name} //caladora
        if (stats.currentEnemy === "E1") {items.I190.count++; stolenItem = items.I190.name} //caulislug
        if (stats.currentEnemy === "E27") if (rng(1,15)===1) {items.I90.count++; stolenItem = items.I90.name} //infernalus

        rollTable(thiefCollectibles, 1);

        animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
        animParticleBurst(5 , "particleLight", "playerPanel", 0);
        addItem();
        logPrint(`<FONT COLOR="#68FEBE"> You managed to steal a `+stolenItem+`!`)

         

    }else logPrint(`<FONT COLOR="#68FEBE"> Failed to steal anything`)


    }, 600);}

function castMalvarrel1(){
    logPrint(`<FONT COLOR="#18ccba"> The enemy sprays corrosive booze!`);
    animState(stats.currentEnemy+"enemy", "gelatine 0.4s 1");
    animParticleProjectile("none", "reverseThrow", 12, "particlePoison", 200);
    setTimeout(() => {
        playSound("audio/button6.mp3")
        animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
        playerNatureDamage(rng(100,200));
        if (!buffs.B34.time>0) buffs.B42.time=20;
        playerBuffs()
    }, 600);
}

function castIncendiaryBunny(){
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
    animParticleProjectile("bunny", "throwArrow", 9, "particleFire", 0);
    animParticleProjectile("none", "throw", 6, "particleConfetti", 0);
    animImageSplash("hat", "playerPanel", "impact", 0);
    setTimeout(() => {
        enemyElementalDamage(playerStrength*skillDmg5, "skillDmg");
        animParticleBurst(10 , "particleFire", "enemyPanel", 0);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        animImageSplash("circle", "enemyPanel", "explosion", 0);
        playSound("audio/explosion.mp3")
        buffs.B43.time=15;
        playerBuffs(); 
        if (stats.currentEnemy==="E5")logs.P52A.unlocked=true;
    }, 600);
    }

function castPolymorph(){
    animState("rpgPlayerImg", "gelatine 0.3s 1");
    animImageSplash("wand", "playerPanel", "sway", 0);
    animParticleProjectile("none", "throwArrow", 9, "particleSpark", 0);
    setTimeout(() => {
        animParticleBurst(5 , "particleSpark", "enemyPanel", 0);
        animParticleBurst(10 , "particleSmoke", "enemyPanel", 0);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        animImageSplash("circle", "enemyPanel", "explosion", 0);
        did(stats.currentEnemy+"enemy").querySelector("img").src = "img/src/enemies/E21.png";
        setTimeout(() => {  did(stats.currentEnemy+"enemy").querySelector("img").src = "img/src/enemies/"+stats.currentEnemy+".png";animParticleBurst(5 , "particleSpark", "enemyPanel", 0); animParticleBurst(10 , "particleSmoke", "enemyPanel", 0); animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1"); }, 10000);
        buffs.B44.time=10;
        playerBuffs(); 
        }, 700);}

function castCleanse(){
    animState("rpgPlayerImg", "gelatine 0.3s 1");
    animImageSplash("wand", "playerPanel", "sway", 0);
    setTimeout(() => {

        let selectedBuffs = [];

        for (i in buffs){
            if (buffs[i].time>0 && buffs[i].cleansable){
                selectedBuffs.push(i);
            }
        }
      animState("rpgPlayerImg", "flash 0.4s 1");

        if (selectedBuffs.length!==0){
        console.log(selectedBuffs[rng(0,(selectedBuffs.length-1))])
        buffs[selectedBuffs[rng(0,(selectedBuffs.length-1))]].time=0;
        playerBuffs()
        animParticleBurst(7 , "particleSpark", "playerPanel", 100);
        playSound("audio/retro1.mp3");
        animImageSplash("soundWave", "playerPanel", "wave", 100);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        enemyDeificDamage(playerStrength*skillDmg7, "skillDmg");}
    }, 400);
    
    }

playerShield = 0;

function castWizhardShield(){
    animState("rpgPlayerImg", "flash 0.5s 1");
    animImageSplash("magishield", "playerPanel", "hold", 0, 15);
    animParticleBurst(7 , "particleExp", "playerPanel", 0);
    let shield = playerStrength*skillDmg8
    playerShield += shield
    setTimeout(() => {
        animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
        animImageSplash("circle", "playerPanel", "explosion", 0);
        playerShield -= shield
        if (playerShield<0) playerShield = 0
    }, 15000);
    damageText("+"+beautify(shield), 'damageText', '#45a5a8', 'shield', "playerPanel");
    
    }

function castShellter(){
    animState("rpgPlayerImg", "spin 2s 1");
    setTimeout(() => {
        animState("rpgPlayerImg", "flash 0.4s 1");
        animParticleBurst(7 , "particleSpark", "playerPanel", 100);
        animParticleBurst(7 , "particleLight", "playerPanel", 200);
        buffs.B49.time=30;
        playerBuffs()
    }, 900);
   
    
    }
function castCardFan(){
 for (let i = 0; i < 3; i++) { setTimeout(loop, 70 * i);}
 function loop() {
    playSound("audio/page.mp3");
    animState("rpgPlayerImg", "gelatine 0.3s 1");
    animParticleProjectile("card", "throwArrow", 0, "particleFire", 0);
    setTimeout(() => {
        enemyMightDamage(playerStrength*skillDmg1, "skillDmg");
        animState(stats.currentEnemy+"enemy", "gelatine 0.4s 1");
        playSound("audio/throw.mp3")}, 700);}
}

function castHeartOfTheCards(){
 for (let i = 0; i < 10; i++) { setTimeout(loop, 100 * i);}
 function loop() {
    playSound("audio/page.mp3");
    animState("rpgPlayerImg", "gelatine 0.3s 1");
    animParticleProjectile("card", "throwArrow", 0, "particleFire", 0);
    setTimeout(() => {
        enemyDeificDamage(600000, "noScale");
        animState(stats.currentEnemy+"enemy", "gelatine 0.4s 1");
        playSound("audio/throw.mp3")}, 700);}}

function castDoveFlock(){
 for (let i = 0; i < 4; i++) { setTimeout(loop, 120 * i);}
 function loop() {
    playSound("audio/page.mp3");
    animState("rpgPlayerImg", "gelatine 0.3s 1");
    animParticleProjectile("dove", "throwArrow", 0, "particleFeather", 0);
    setTimeout(() => {
        enemyNatureDamage(playerStrength*skillDmg2, "skillDmg");
        animState(stats.currentEnemy+"enemy", "gelatine 0.4s 1");
        animParticleBurst(2 , "particleFeather", "enemyPanel", 200);
        playSound("audio/throw.mp3")}, 700);}}
    
 function castRollTheDice(){
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("die", "playerPanel", "spin", 0);
    setTimeout(() => {
        animState("rpgPlayerImg", "flash 0.5s 1");
        animParticleBurst(7 , "particleLight", "playerPanel", 100);

        let rollRng = rng(1,3)
        if (rollRng===1){ buffs.B45.time=21 }
        if (rollRng===2){ buffs.B46.time=21 }    
        if (rollRng===3){ buffs.B47.time=21 }
        playerBuffs()

        }, 1000);
    }

 function castSummonJackpot(){
    animState("rpgPlayerImg", "flash 0.4s 1");
    animImageSplash("jackpot", "playerPanel", "float", 0);
    setTimeout(() => {

        let rollRng = rng(1,3)

        if (rollRng===1){ //fireball
            animParticleProjectile("none", "throwArrow", 9, "particleFire", 120);
            setTimeout(() => {
                enemyElementalDamage(playerStrength*skillDmg7, "skillDmg");
                animParticleBurst(15 , "particleFire", "enemyPanel", 120);
                animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
                animImageSplash("circle", "enemyPanel", "explosion", 0);
                playSound("audio/explosion.mp3");
                animImageSplash("soundWave", "enemyPanel", "wave", 200);
                
            }, 700);
        }

        if (rollRng===2){ //heal
            playerHealingDamage(playerMaxHp*0.1);
            animState("rpgPlayerImg", "flash 0.5s 1");
            playerUpdate();
            animParticleBurst(5 , "particleGlow", "playerPanel", 230);
            animParticleBurst(3 , "particleHealth", "playerPanel", 0);
        }

        if (rollRng===3){ //fail
            playSound("audio/retro1.mp3");
            animState("rpgPlayerImg", "shakeFlash 0.5s 1");
            animImageSplash("soundWave", "playerPanel", "wave", 200);
            animImageSplash("circle", "playerPanel", "explosion", 0);
            playerElementalDamage(playerMaxHp*0.15);
            animParticleBurst(6 , "particleFire", "playerPanel", 0);
            animParticleBurst(6 , "particleSmoke", "playerPanel", 0);
        }


        
    }, 1200);}

 function castReverseCard(){
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("reverseCard", "playerPanel", "spin", 0);
    setTimeout(() => {
        animState("rpgPlayerImg", "flash 0.5s 1");
        animParticleBurst(4 , "particleGlow2", "playerPanel", 0);
        animParticleBurst(7 , "particleLight", "playerPanel", 100);
        buffs.B48.time=21; 
        playerBuffs()
        }, 1000);
    }    

function castConjureViolin(){
    animState("rpgPlayerImg", "flash 0.5s 1");
    animImageSplash("violin", "playerPanel", "holdFloat", 0, 20);
    animParticleBurst(7 , "particleExp", "playerPanel", 100);
    buffs.B16.time=22;
    playerBuffs()
    setTimeout(() => {
        animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
        animImageSplash("circle", "playerPanel", "explosion", 0);
        animParticleBurst(7 , "particleExp", "playerPanel", 100);
        }, 20000);}

function castConjureViolinNote(){ //side skill
    animParticleProjectile("note", "throwArrow", 0, "particleSmoke", 0);
    animParticleBurst(5 , "particleExp", "playerPanel", 100);
    setTimeout(() => {
        enemyNatureDamage(playerStrength*skillDmg3, "skillDmg");
        playSound("audio/button4.mp3")}, 600);}

 function castRiffTempo(){
    for (let i = 0; i < 10; i++) { setTimeout(loop, 600 * i);}
 function loop() {
    playSound("audio/enemyAttack.mp3");
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("soundWave", "playerPanel", "wave", 0);
    setTimeout(() => {
        enemyNatureDamage(playerStrength*skillDmg3, "skillDmg");
        }, 500);}
    }
        
function castKingKatDecapitator(){ //weapon skill
    for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
 function loop() {
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("soundWave", "playerPanel", "wave", 100);
    }
    buffs.B21.time=10;
    playerBuffs();
}

function castDragonfellSword(){ //weapon skill
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("circle", "enemyPanel", "explosion", 0);
    animImageSplash("soundWave", "enemyPanel", "wave", 200);
    animImageSplash("slash", "enemyPanel", "impact", 0);
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
}

function castHarpsichaos(){
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("partiture", "playerPanel", "float", 0);
    animParticleBurst(10 , "particleNote", "playerPanel", 0);
    setTimeout(() => {
        animState("rpgPlayerImg", "flash 0.5s 1");
        animParticleBurst(3 , "particleGlow2", "playerPanel", 200);
        animParticleBurst(5 , "particleLight", "playerPanel", 200);
        animParticleBurst(2 , "particleNote", "playerPanel", 0);
        buffs.B51.time=20;
        playerBuffs();
        }, 1200);
    } 

function castSongOfHealing(){
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("partiture", "playerPanel", "float", 0 );
    animParticleBurst(10 , "particleNote", "playerPanel", 200);
    animImageSplash("sunray", "playerPanel", "rotate", 0);

    setTimeout(() => {
        animState("rpgPlayerImg", "flash 0.5s 1");
        animParticleBurst(3 , "particleHealth", "playerPanel", 0);
        animParticleBurst(5 , "particleLight", "playerPanel", 200);
        animParticleBurst(2 , "particleNote", "playerPanel", 200);
        buffs.B53.time=20;
        playerBuffs();
        }, 1200);
    } 



function castGhastlyPirateSet(){
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animParticleBurst(8 , "particleNote", "playerPanel", 100);


    
        animState("rpgPlayerImg", "flash 0.5s 1");
        animParticleBurst(5 , "particleLight", "playerPanel", 200);
        
        let rollRng = rng(1,3)
        if (rollRng===1){ buffs.B61.time=20 }
        if (rollRng===2){ buffs.B62.time=20 }    
        if (rollRng===3){ buffs.B63.time=20 }
        playerBuffs()

        
    } 

function castPerishSong(){
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("partiture", "enemyPanel", "downwards", -30);
    animParticleBurst(10 , "particleNote", "enemyPanel", -50);
    setTimeout(() => {
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.5s 1");
        animParticleBurst(6 , "particleGlow", "enemyPanel", 200);
        animParticleBurst(6 , "particleNote", "enemyPanel", -30);
        buffs.B52.time=20;
        playerBuffs();
    }, 600);

        setTimeout(() => {
        enemyOccultDamage(playerStrength*skillDmg7, "skillDmg");
        playSound("audio/retro1.mp3");
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.5s 1");
        animParticleBurst(6 , "particleGlow", "enemyPanel", 200);
        animParticleBurst(6 , "particleNote", "enemyPanel", -30);
        animImageSplash("soundWave", "enemyPanel", "wave", -40);
    }, 20000);

    }

function castMetronome(){
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("hand", "playerPanel", "sway", 0);
    animParticleBurst(5 , "particleExp", "playerPanel", 100);
    setTimeout(() => {
        animState("rpgPlayerImg", "flash 0.5s 1");
        animParticleBurst(5 , "particleExp", "playerPanel", 100);

        var castkeys = Object.keys(talent).filter(function (clave) { return talent[clave].hasOwnProperty("cast"); });
        var randomcastkeys = castkeys[Math.floor(Math.random() * castkeys.length)];
        eval(talent[randomcastkeys].cast)

        if (!settings.disableSkillLog) logPrint(`<FONT COLOR="#18ccba"> Metronome casts ` + talent[randomcastkeys].name);

        }, 800);} 