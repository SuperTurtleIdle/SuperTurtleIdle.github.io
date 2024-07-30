let enemyTurn = 0;


function castLightDynamite(){
    logPrint(`<FONT COLOR="#18ccba"> You throw a Light Dynamite`);
    playSound("audio/throw.mp3");
    animParticleProjectile("bomb", "throw", 9, "particleSmoke", 0);
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
    setTimeout(() => {
        enemyElementalDamage(playerWeaponDamage*5);
        animParticleBurst(10 , "particleSmoke", "enemyPanel", 0);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1"); 
        playSound("audio/explosion.mp3")

        if (enemies[stats.currentEnemy].tag === "ore") {
            const startIndex = enemies[stats.currentEnemy].drop.indexOf("dropItem('") + "dropItem('".length;
            const endIndex = enemies[stats.currentEnemy].drop.indexOf("')", startIndex);
            if (startIndex !== -1 && endIndex !== -1) {
                currentDrop = enemies[stats.currentEnemy].drop.substring(startIndex, endIndex);
                rareItemDrop(currentDrop,1, rng(30,50))
                addItem()
            }
        }
    }, 700);
    
}

function castFossilSet(){
    setTimeout(() => {
    animParticleProjectile("bone2", "throw", 0, "particleSmoke", 0);
    setTimeout(() => {
        enemyElementalDamage(playerWeaponDamage*0.4,"sp");
    }, 700);
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


if (stats.currentEnemy === "E36") {
    setTimeout(() => {
        
        animParticleBurst(10 , "particleFire", "enemyPanel", 200);
        animParticleBurst(10 , "particleSpark", "enemyPanel", 200);
        animImageSplash("soundWave", "enemyPanel", "wave", 200);
        animImageSplash("ghost", "enemyPanel", "float", 0);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        playSound("audio/gas.mp3");
        enemyDamageMultiplier = 0.85
        enemyDefenseMultiplier = 1.15
        enemyUpdate();
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
        enemyOccultDamage(playerWeaponDamage*5);
        animImageSplash("ghost", "enemyPanel", "float", 0);
        animParticleBurst(10 , "particleFire", "enemyPanel", 180);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        animImageSplash("circle", "enemyPanel", "explosion", 0);
        playSound("audio/explosion.mp3")}, 700); 
    }

function castInterrupt(){
if(buffs.B90.time>0){
    buffs.B90.time = 0;
    playerBuffs();
}
}


function castLightsOut(){
    playSound("audio/revolver.mp3");
    animState("rpgPlayerImg", "spin 0.7s 1");

    setTimeout(() => {
        playSound("audio/heal.mp3");
    }, 400);
    setTimeout(() => {
        castInterrupt()
        enemyDeificDamage(playerWeaponDamage*2, "sp");
        animParticleBurst(15 , "particleSmoke", "enemyPanel", 0);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        animImageSplash("circle", "enemyPanel", "explosion", 0);
        playSound("audio/touchGlass.mp3");
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


function castArea9Explosion(){

    playerElementalDamage(enemies[stats.currentEnemy].attack*3);
    animImageSplash("circle", "enemyPanel", "explosion", 0);
    animImageSplash("soundWave", "enemyPanel", "wave", 0);
    playerUpdate()
}

function castNetOLauncher3000(){
    logPrint(`<FONT COLOR="#18ccba"> You use the Net-O-Launcher 3000`);
    playSound("audio/throw.mp3"); 
    animImageSplash("net", "enemyPanel", "downwards", 0);
    buffs.B6.time=10;
    playerBuffs();}

function castBoxingGloves(){ 


    if (items.I69.level>9 && rng(1,10)===1){
    animImageSplash("punch", "enemyPanel", "impact", 0);
    enemyMightDamage(playerWeaponDamage*2.5);

   

}

}

function castKingKat(){

    enemyTurn++;

    if (currentHP < enemies.E8.hp*0.3 && enemyPhase===1) {enrage()};

    if(enemyTurn>3){
        punch()
        enemyTurn=0;
    }

    function punch(){
        animImageSplash("punch", "playerPanel", "impact", 0);
        animState("rpgPlayerImg", "shake 0.4s 1");
        playerMightDamage(enemies[stats.currentEnemy].attack)
    }
    

    function enrage(){
    enemyPhase = 2;
    buffs.B76.time = 100;
    buffs.B76.stacks = 1;
    enemyDamageMultiplier = 1.4;
    playerBuffs();
    for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
    function loop() {
    animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
    animImageSplash("soundWave", "enemyPanel", "wave", 100, undefined ,'boss');
    did(stats.currentEnemy+"enemy").style.filter = 'hue-rotate(330deg)'
    }

    }


}


function castKingMysterio(){

    enemyTurn++;

    

    if (enemyTurn % 3 === 0){punch();}


    if(enemyTurn===15){
        castEnemyAlerted(5)
    }

    if(enemyTurn===19){
        barrage()
    }

    function punch(){
        animImageSplash("punch", "playerPanel", "impact", 0);
        animState("rpgPlayerImg", "shake 0.4s 1");
        playerMightDamage(enemies[stats.currentEnemy].attack*1.2);
    }
    

    function barrage(){
        for (let i = 0; i < 10; i++) { setTimeout(loop, 600 * i);}
        function loop() {
        animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
        animImageSplash("punch", "playerPanel", "impact", 0);
        animState("rpgPlayerImg", "shake 0.4s 1");
        playerMightDamage(enemies[stats.currentEnemy].attack*0.5);
        }

    }

    castEnemyAlertedDecay()



}


function castTerragosa(){

    if(enemyPhase===1){

        for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
 function loop() {
    animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
    animImageSplash("soundWave", "enemyPanel", "wave", 200, undefined ,'boss');
    animParticleBurst(10 , "particleFire", "enemyPanel", 100,'boss');
    }
        enemyPhase=2;
        buffs.B87.time = 1000;
        buffs.B87.stacks = 1

    }

    enemyDamageMultiplier = 1 + ((buffs.B87.stacks-1) * 1.02)



    enemyTurn++

    if (enemyTurn===4){claws();}

    if (enemyTurn===10){fire(); enemyTurn=0;}


    if (buffs.B87.stacks>149) logs.P46A.unlocked = true



    function claws(){
        animImageSplash("doubleSlash", "playerPanel", "impact", 0);
        animState("rpgPlayerImg", "shake 0.4s 1");
        buffs.B82.time = 15,
        playerBuffs();
    }


    function fire(){
        animParticleProjectile("none", "reverseThrow", 12, "particleFire", 140);
        setTimeout(() => {
            animState("rpgPlayerImg", "shake 0.4s 1");
            animParticleBurst(7 , "particleFire", "playerPanel", 140);
            buffs.B59.time = 10;
            buffs.B59.stacks = 5;
            playerBuffs();
        }, 600);
    }
}

function castShatterstrasza(){

    if(enemyPhase===1){

        for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
 function loop() {
    animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
    animImageSplash("soundWave", "enemyPanel", "wave", 200, undefined ,'boss');
    animParticleBurst(10 , "particleFire", "enemyPanel", 100,'boss');
    }
        enemyPhase=2;
        buffs.B97.time = 1000;
        buffs.B97.stacks = 1
    }

    enemyDamageMultiplier = 1 + ((buffs.B97.stacks-1) * 1.02)



    enemyTurn++

    if (enemyTurn===4){claws();}

    if (enemyTurn===10){fire(); enemyTurn=0;}



    function claws(){
        animImageSplash("doubleSlash", "playerPanel", "impact", 0);
        animState("rpgPlayerImg", "shake 0.4s 1");
        buffs.B82.time = 15,
        playerBuffs();
    }


    function fire(){
        animParticleProjectile("none", "reverseThrow", 12, "particleFire", 380);
        setTimeout(() => {
            animState("rpgPlayerImg", "shake 0.4s 1");
            animParticleBurst(7 , "particleFire", "playerPanel", 380);
            buffs.B73.time = 20;
            buffs.B73.stacks = 5;
            playerBuffs();
        }, 600);
    }


}



function castKawKaw(){


    enemyTurn++

    

    if (enemyTurn===5){thunder();}

    if (enemyTurn===7){castEnemyCasting(5)}

    if (enemyTurn===11){ if (buffs.B90.time>0) {heal();} enemyTurn=0;}

    function thunder(){
        animImageSplash("lightning", "playerPanel", "impact", 0);
        animParticleBurst(2 , "particleGlow2", "playerPanel", 100);
        animState("rpgPlayerImg", "shakeFlash 0.4s 1");
        buffs.B73.time=15; buffs.B73.stacks=10;
        playerBuffs();
    }


    function heal(){
        animState(stats.currentEnemy+"enemy", "flash 0.4s 1");
        animParticleBurst(6 , "particleHealth", "enemyPanel", 0);
        enemyHealingDamage(enemies[stats.currentEnemy].hp*0.35);
    }

    castEnemyCastingDecay()

}


function castPrincipality(){


    enemyTurn++

    buffs.B76.time=10; buffs.B76.stacks++; 

    enemyDamageMultiplier = 1 + (buffs.B76.stacks*0.1)

    if (enemyTurn===6){castEnemyCasting(5)}

    if (enemyTurn===10){if (buffs.B90.time>0) { stomp()}; enemyTurn=0}

    function stomp(){
        animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
        animState("rpgPlayerImg", "shakeFlash 0.4s 1");
        buffs.B74.time=15;
        playerBuffs();
    }

    castEnemyCastingDecay()

}



function castDominion(trigger){


    enemyTurn++


    if (enemyTurn===5 && (enemyPhase===1 || enemyPhase===3)){fire()}

    if (enemyTurn===10 && (enemyPhase===1 || enemyPhase===3)){fire()}

    if (enemyTurn===14 && (enemyPhase===1 || enemyPhase===3)){castEnemyCasting(5)}

    if (enemyTurn===18 && (enemyPhase===1 || enemyPhase===3)){if (buffs.B90.time>0) { mute()}; enemyTurn=0}

    if (trigger==="bobi") {phase()};


    if (enemyTurn===1 && (enemyPhase===3)){crown()}
    if (enemyTurn===6 && (enemyPhase===3)){crownCheck()}

    if (enemyTurn===9 && (enemyPhase===3)){crown()}
    if (enemyTurn===14 && (enemyPhase===3)){crownCheck()}


    function phase(){
        enemyPhase=2;

        for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
        function loop() {
            animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
            animImageSplash("soundWave", "enemyPanel", "wave", 200, undefined ,'boss');
            }

            buffs.B83.time=10;
            buffs.B95.time=10;
            buffs.B95.stacks=8;
            playerBuffs();

            setTimeout(() => {

                enemyPhase=3;
                enemyTurn=0;
                
            }, 10000);

    }

    function fire(){
        animImageSplash("holyRay", "playerPanel", "impact", 0);
        animState("rpgPlayerImg", "shakeFlash 0.4s 1");
        buffs.B59.time = 15;
        buffs.B59.stacks = 5;
        playerBuffs();
    }

    function mute(){
        animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
        animImageSplash("soundWave", "enemyPanel", "wave", 200, undefined ,'boss');
        buffs.B60.time = 15;
        playerBuffs();
    }


    function crown(){
        let crown = rng(1,5);
        if (crown===1) buffs.B102.time=14;
        if (crown===2) buffs.B103.time=14;
        if (crown===3) buffs.B104.time=14;
        if (crown===4) buffs.B105.time=14;
        if (crown===5) buffs.B106.time=14;
        playerBuffs();
    }


    function crownCheck(){

        if (buffs.B102.time>0 || buffs.B103.time>0 || buffs.B104.time>0 || buffs.B105.time>0 || buffs.B106.time>0){
            animState(stats.currentEnemy+"enemy", "flash 0.4s 1");
            animParticleBurst(6 , "particleHealth", "enemyPanel", 0);
            enemyHealingDamage(enemies[stats.currentEnemy].hp*0.3);
        }

    }







    castEnemyCastingDecay()

}


function castVirtue(){


    enemyTurn++


    if (enemyTurn===4){castEnemyCasting(5)}

    if (enemyTurn===8){ if (buffs.B90.time>0) {fire();}}

    if (enemyTurn===13){ castEnemyAlerted(5)}

    if (enemyTurn===17){ zombie(); enemyTurn=0;}


    function fire(){
        animParticleProjectile("none", "reverseThrow", 12, "particleFire", 0);
        setTimeout(() => {
            animState("rpgPlayerImg", "shake 0.4s 1");
            animParticleBurst(7 , "particleFire", "playerPanel", 0);
            buffs.B59.time += 20;
            buffs.B59.stacks = 5;
            playerBuffs();
        }, 600);
    }


    function zombie(){
        animImageSplash("soundWave", "enemyPanel", "wave", 0);
        animParticleBurst(10 , "particleFire", "enemyPanel", 0);
        animState("rpgPlayerImg", "shakeFlash 0.4s 1");
        buffs.B80.time=20;
        playerBuffs();
    }

    castEnemyCastingDecay()
    castEnemyAlertedDecay()

}

function castTURTLE(){


    enemyTurn++

    
    if (enemyTurn===6){emp();}

    if (enemyTurn===10){castEnemyCasting(5)}

    if (enemyTurn===14){ if (buffs.B90.time>0) {heal();} enemyTurn=0;}

    function emp(){
        animImageSplash("soundWave", "enemyPanel", "wave", 0);
        animParticleBurst(10 , "particleElectric", "enemyPanel", 0);
        animState("rpgPlayerImg", "shakeFlash 0.4s 1");
        buffs.B77.time=10;
        playerBuffs();
    }


    function heal(){
        buffs.B83.time=10;
        buffs.B95.time=10;
        buffs.B95.stacks=5;
        playerBuffs();
    }

    castEnemyCastingDecay()

}

function castRaijinGoran(){


    enemyTurn++

    buffs.B76.time=100; buffs.B76.stacks++;

    
    if (enemyTurn===4){castEnemyCasting(3)}

    if (enemyTurn===6){ if (buffs.B90.time>0) {fang();} enemyTurn=0;}

    function fang(){
        animImageSplash("bite", "playerPanel", "impact", 0);
        animParticleBurst(7 , "particleElectric", "playerPanel", 0);
        animState("rpgPlayerImg", "shake 0.4s 1");
        {buffs.B76.time=15; buffs.B76.stacks+=6;}
        playerElementalDamage(enemies[stats.currentEnemy].attack*4)
        playerBuffs();
    }

    enemyDamageMultiplier = 1 + (buffs.B76.stacks*0.1)

    castEnemyCastingDecay()

}

function castArcaniteTower(){

    animImageSplash("lightning", "playerPanel", "impact", 0);




}

function castEnemyAlerted(stacks){
    playSound("audio/enemyAlerted.mp3");
    buffs.B84.time=100;
    buffs.B84.stacks=stacks;
    playerBuffs();
}

function castEnemyAlertedDecay(){
    buffs.B84.stacks--;
    playerBuffs();
}

function castEnemyCasting(stacks){
    playSound("audio/enemyAlerted.mp3");
    buffs.B90.time=100;
    buffs.B90.stacks=stacks;
    playerBuffs();
}

function castEnemyCastingDecay(){
    if (buffs.B90.time>0) {
    buffs.B90.stacks--;
    playerBuffs();
}
}

function castDaiGoran(){


    enemyTurn++

    if(enemyTurn===5){
        venom();
    }

    if(enemyTurn===10){
        castEnemyAlerted(5)
    }

    if(enemyTurn===14){
        petrify();
        enemyTurn=0;
    }
    
    function venom(){
        animParticleProjectile("spike", "reverseThrow", 3, "particlePoison", 0);
        setTimeout(() => {
            animState("rpgPlayerImg", "shake 0.4s 1");
            animParticleBurst(3 , "particleFire", "particlePoison", 0);
            buffs.B3.time=15; buffs.B3.stacks=6;
            playerBuffs();
        }, 600);
    }

    function petrify(){

        animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
        animImageSplash("soundWave", "enemyPanel", "wave", 200, undefined ,'boss');
        animParticleBurst(10 , "particleFire", "playerPanel", 100);
        buffs.B85.time=15;
        playerBuffs();


    }

    castEnemyAlertedDecay()

    

}

function castEisZeith(){


    enemyTurn++
    

    if(enemyTurn===5){
        fire();
    }

    if(enemyTurn===7){
        castEnemyCasting(4)
    }

    if(enemyTurn===10){
        if (buffs.B90.time>0) { thunder() }
    }

    if(enemyTurn===16){
        castEnemyAlerted(5)
    }

    if(enemyTurn===20){
        rage();
        enemyTurn=0;
    }
    
    function fire(){
        animParticleProjectile("none", "reverseThrow", 12, "particleFire", 140);
        setTimeout(() => {
            animState("rpgPlayerImg", "shake 0.4s 1");
            animParticleBurst(7 , "particleFire", "playerPanel", 140);
            buffs.B59.time = 10;
            buffs.B59.stacks = 8;
            playerBuffs();
        }, 600);
    }

    function thunder(){
        animImageSplash("lightning", "playerPanel", "impact", 0);
        animParticleBurst(2 , "particleGlow2", "playerPanel", 100);
        animState("rpgPlayerImg", "shakeFlash 0.4s 1");
        buffs.B74.time=10;
        playerMightDamage(enemies[stats.currentEnemy].attack*3)
        playerBuffs();
    }

    function rage(){
        for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
        function loop() {
        animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
        animImageSplash("soundWave", "enemyPanel", "wave", 100, undefined ,'boss');
        }

        playerDeificDamage(enemies[stats.currentEnemy].attack*7)
    
        }
    

        castEnemyAlertedDecay()
    castEnemyCastingDecay()

}


function castYogKulth(){


    if(enemyPhase===1){

        for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
 function loop() {
    animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
    animImageSplash("soundWave", "enemyPanel", "wave", 200, undefined ,'boss');
    }

    animParticleBurst(10 , "particleFire", "enemyPanel", 100,'boss');

        enemyPhase=2;
        buffs.B92.time = 10000;
        buffs.B92.stacks = 100
    }


    enemyTurn++
    buffs.B92.stacks -= 1
    if (buffs.B93.time>0) buffs.B92.stacks -= 5

    if (buffs.B92.stacks<=0){buffs.B73.time=10000; buffs.B73.stacks=15;}
    

    if(enemyTurn===5){
        castEnemyCasting(5)
    }

    if(enemyTurn===9){
        if (buffs.B90.time>0) corruption();
    }

    if(enemyTurn===15){
        castEnemyCasting(5)
    }

    if(enemyTurn===19){
        if (buffs.B90.time>0) corruption();
    }

    if(enemyTurn===24){
        mindfly()
    }

    if(enemyTurn===31){
        castEnemyAlerted(6)
    }

    if(enemyTurn===36){
        rage();
        enemyTurn=0;
    }
    
    function corruption(){
            animState("rpgPlayerImg", "shakeFlash 0.4s 1");
            animParticleBurst(7 , "particleFire", "playerPanel", 180);
            buffs.B92.stacks -= 15        
    }

    function mindfly(){
        animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
        buffs.B93.time=20;
        playerBuffs();
    }

    function rage(){
        for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
        function loop() {
        animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
        animImageSplash("soundWave", "enemyPanel", "wave", 100, undefined ,'boss');
        }

        if (rpgPlayer.hp<playerMaxHp*0.7) buffs.B92.stacks -= 40     
    }
    

        castEnemyAlertedDecay()
    castEnemyCastingDecay()

}


function castPrimarder(){


    enemyTurn++
    castEnemyAlertedDecay()

    if (enemyPhase===1){
            animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");
            animImageSplash("soundWave", "enemyPanel", "wave", 200, undefined ,'boss');
            buffs.B81.time=60;
            playerBuffs();
            enemyPhase=2;
    }

    if(enemyTurn===4){
        castEnemyAlerted(4)
    }

    if(enemyTurn===8){
        mirror();
        enemyTurn=0;
    }
    
    function mirror(){
        animState(stats.currentEnemy+"enemy", "flash 0.4s 1");
        animParticleBurst(5 , "particleSpark", "enemyPanel", 0);
        buffs.B79.time=8;
        playerBuffs();
    }

    
    

}

function castRoyalPudding(){


    enemyTurn++

    if (enemyTurn>2){
        gelshot();
        enemyTurn=0;
    }

    function gelshot(){
        animParticleProjectile("none", "reverseThrow", 12, "particlePoison", 180);
        setTimeout(() => {
            animState("rpgPlayerImg", "shake 0.4s 1");
            animParticleBurst(7 , "particlePoison", "playerPanel", 140);
            buffs.B86.stacks++;
            buffs.B86.time+=15;
            playerNatureDamage(enemies[stats.currentEnemy].attack)
            playerBuffs();
        }, 600);
    }

    


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



function castLesserPoisonFlask(){
    logPrint(`<FONT COLOR="#18ccba"> You throw a Lesser Poison Flask`);
    playSound("audio/throw.mp3");
    animParticleProjectile("poison", "throw", 9, "particlePoison", 0);
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
    setTimeout(() => {
        animParticleBurst(7 , "particlePoison", "enemyPanel", 0);
        playSound("audio/gas.mp3");
        buffs.B54.time+=30;
        playerBuffs(); }, 700);
    }

function castConjuredCaltrops(){
    playSound("audio/throw.mp3");

    for (let i = 0; i < 4; i++) { setTimeout(loop, 250 * i);}
    function loop() {

        animParticleProjectile("caltrop", "throw", 9, "particlePoison", 100);
        animState("rpgPlayerImg", "gelatineHigh 0.3s 1");

    }

    
    setTimeout(() => {
        buffs.B67.time=1800;
        playerBuffs();
    }, 700);
    }

function castHexTag(){
    logPrint(`<FONT COLOR="#18ccba"> You use the Hex Tag`);
    playSound("audio/page.mp3");
    playSound("audio/gas.mp3");
    animImageSplash("eye", "enemyPanel", "impact", 0);
    animParticleBurst(7 , "particlePoison", "enemyPanel", 200);
    animState(stats.currentEnemy+"enemy", "flash 0.4s 1");
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
    buffs.B109.time+=30;
    playerBuffs(); 
    }

function castEdgeOfCataclysm(){

    if (items.I28.level>39 && rng(1,5)===1){
    for (let i = 0; i < 4; i++) { setTimeout(loop, 250 * i);}
    if (items.I28.level>49) buffs.B110.time+=5;
    playerBuffs()
    function loop() {
    
    animParticleProjectile("fireball", "rain", 9, "particleFire", 0);
    
    setTimeout(() => {
        animParticleBurst(1 , "particleFire", "enemyPanel", 0);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        enemyElementalDamage(playerWeaponDamage);
        
    }, 700);
    }
}
}

function castHiddenPledge(){


    if (items.I321.level>49 && rng(1,10)===1) for (let i = 0; i < rng(1,10); i++) { setTimeout(loop, 250 * i);} else normal()


        function normal(){
            animParticleProjectile("fallingFeather", "rain", 0, "particleFire", 0);
    
            setTimeout(() => {
                playerAttackHit();


                if (items.I321.level>69 && rng(1,10)===1){
                    let chance = rng(1,3)
                    if (chance===1) buffs.B107.time+=5;
                    if (chance===2) buffs.B110.time+=5;
                    if (chance===3) buffs.B109.time+=5;
                    playerBuffs()
                }




            }, 700);



            



        }




    
    function loop() {
    
    animParticleProjectile("fallingFeather", "rain", 0, "particleFire", 0);
    
    setTimeout(() => {
        enemyNatureDamage(playerWeaponDamage*0.3);

        if (items.I321.level>69 && rng(1,10)===1){
            let chance = rng(1,3)
            if (chance===1) buffs.B107.time+=5;
            if (chance===2) buffs.B110.time+=5;
            if (chance===3) buffs.B109.time+=5;
            playerBuffs()
        }
    }, 700);
    }
}



function castBluefinTuna(){ //weapon skill


    let timesHit = 3;
    if (items.I60.level>44) timesHit = 4


    if (items.I60.level>34 && rng(1,10)===1) for (let i = 0; i < timesHit; i++) { setTimeout(loop, 250 * i);}

    function loop() {
    
    animParticleProjectile("fish", "rain", 0, "particleFire", 0);
    
    setTimeout(() => {
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        enemyNatureDamage(playerWeaponDamage*0.6);
    }, 700);
    }



}

function castPringuSet(){ 

    
    animParticleProjectile("fish", "rain", 0, "particleFire", 0);
    
    setTimeout(() => {
        enemyNatureDamage(playerWeaponDamage*0.3);
    }, 700);
    
}

function castPineBoomerang(){
    logPrint(`<FONT COLOR="#18ccba"> You throw a Pine Boomerang`);
    animParticleProjectile("boomerang", "throw", 0, "particleSmoke", 0);
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
    setTimeout(() => {
        enemyNatureDamage(playerWeaponDamage*0.2);
        animState(stats.currentEnemy+"enemy", "gelatine 0.4s 1");
        playSound("audio/throw.mp3")}, 700);}

function castRegalBroadsword(){ //weapon skill
    if (rng(1,5)===1){
        animImageSplash("slash", "enemyPanel", "impact", 0);
        animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
        enemyOccultDamage(playerWeaponDamage);
    }
}

function castFossilClub(){

    if (items.I322.level>44 && rng(1,10)===1){

    animParticleProjectile("bone", "spinningThrow", 0, "particleSmoke", 0);

    setTimeout(() => {
        for (let i = 0; i < 3; i++) { setTimeout(loop, 300 * i);}
    }, 1000);
    

    function loop() {
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        enemyMightDamage(playerWeaponDamage*3);
    }

}

}

function castAngelicBuster(){

    animParticleProjectile("angelicBuster", "spinningThrow", 0, "particleSmoke", 0);

    setTimeout(() => {
        for (let i = 0; i < 4; i++) { setTimeout(loop, 300 * i);}
    }, 1000);

    setTimeout(() => {
        animImageSplash("holyRay", "enemyPanel", "impact", 0);
    animParticleBurst(2 , "particleGlow2", "enemyPanel", 100);
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    animImageSplash("circle", "enemyPanel", "explosion", 0);
    }, 1700);
    

    function loop() {
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        enemyDeificDamage(playerWeaponDamage);
    }

}


function castJungleKingSet(){ 
    animImageSplash("doubleSlash", "enemyPanel", "impact", 0);
    animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
    enemyMightDamage(playerWeaponDamage);
}

let spellCdWrath = 0;
let spellWrath = false
function castWrath(){ 
    spellCdWrath--
    if (spellCdWrath<=0){
    spellWrath = true

    animImageSplash("wrath", "playerPanel", "holdRotate", 0, 20);
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("circle", "playerPanel", "explosion", 0);
    animImageSplash("soundWave", "playerPanel", "wave", 50);
    spellCdWrath=20

    setTimeout(() => {
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("circle", "playerPanel", "explosion", 0);
    animImageSplash("soundWave", "playerPanel", "wave", 50);
    spellWrath = false
    }, 20000);
}

    if (spellWrath){
        animImageSplash("doubleSlash", "enemyPanel", "impact", 0);
        animParticleProjectile("none", "reverseThrow", 11, "particleGlow", 200);
        enemyOccultDamage(1)
        setTimeout(() => {
            animState("rpgPlayerImg", "gelatine 0.6s 1");
        }, 700);
        buffs.B94.time = 10;
        buffs.B94.stacks++;
    }

}

let spellCdFaith = 0;
let spellFaith = false
function castFaith(){ 
    spellCdFaith--
    if (spellCdFaith<=0){
    spellFaith = true

    animImageSplash("faith", "playerPanel", "holdRotate", 0, 20);
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("circle", "playerPanel", "explosion", 0);
    animImageSplash("soundWave", "playerPanel", "wave", 190);
    spellCdFaith=20

    setTimeout(() => {
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("circle", "playerPanel", "explosion", 0);
    animImageSplash("soundWave", "playerPanel", "wave", 190);
    spellFaith = false
    }, 20000);
}

    if (spellFaith){
        animImageSplash("slash", "enemyPanel", "impact", 0);
        animParticleBurst(3 , "particleGlow", "enemyPanel", 280);
        enemyOccultDamage(1)
        
    }

}

let spellCdEternitysEnd = 0;
let spellEternitysEnd = false
function castEternitysEnd(){ 
    spellCdEternitysEnd--
    if (spellCdEternitysEnd<=0){
    spellEternitysEnd = true

    animImageSplash("eternity", "playerPanel", "holdRotate", 0, 10);
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("circle", "playerPanel", "explosion", 0);
    animImageSplash("soundWave", "playerPanel", "wave", 190);
    spellCdEternitysEnd=20

    setTimeout(() => {
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("circle", "playerPanel", "explosion", 0);
    animImageSplash("soundWave", "playerPanel", "wave", 190);
    spellEternitysEnd = false
    animState("rpgPlayerImg", "spin 2s 1");

/////-----
animParticleProjectile("eternitysEnd", "spinningThrow", 0, "particleSmoke", 0);

    setTimeout(() => {
        for (let i = 0; i < 3; i++) { setTimeout(loop, 300 * i);}
    }, 1000);

    setTimeout(() => {
        
    animParticleBurst(2 , "particleGlow2", "enemyPanel", 100);
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    animImageSplash("circle", "enemyPanel", "explosion", 0);
    enemyMightDamage(1);
    }, 1700);
    

    function loop() {
        animImageSplash("holyRay", "enemyPanel", "impact", 0);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        enemyMightDamage(1);
    }
///--------





    }, 10000);
}

    if (spellEternitysEnd){
        animImageSplash("twilightSlash", "enemyPanel", "impact", 0);
        animParticleProjectile("none", "reverseThrow", 11, "particleGlow2", 280);
        animImageSplash("circle", "enemyPanel", "explosion", 100);
         animImageSplash("soundWave", "enemyPanel", "wave", 110);
        enemyOccultDamage(1)
        setTimeout(() => {
            animState("rpgPlayerImg", "gelatine 0.6s 1");
        }, 700);
        
    }


}



function castPringuEmperor(){ 


    enemyTurn++

    if (enemyTurn>5){
        fish();
        enemyTurn = 0;
    }

    if (currentHP < enemies[stats.currentEnemy].hp*0.15)  heal()



    function fish(){
        animParticleProjectile("fish", "reverseThrow", 0, "particleGlow", 50);
        animState(stats.currentEnemy+"enemy", "gelatineHigh 0.4s 1");

        setTimeout(() => {

            buffs.B81.time = 10,
            playerBuffs();

        }, 700);
    }



    function heal(){
        animState(stats.currentEnemy+"enemy", "flash 0.4s 1");
        animParticleBurst(6 , "particleHealth", "enemyPanel", 0);
        enemyHealingDamage(enemies[stats.currentEnemy].hp*0.06);
    }
    




}

function castMoonlitGreatsword(){ //weapon skill

    if (items.I27.level>35 && rng(1,20)===1) {
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
        }, 1300);

    }


    if (buffs.B17.time>0){

        animImageSplash("slash", "enemyPanel", "impact", 0);
        animParticleBurst(6 , "particleGlow2", "enemyPanel", 50);
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        let multiplier=1;
        if (items.I27.level>44) multiplier=1.5
        enemyElementalDamage(playerWeaponDamage*multiplier);

    }
   
}


function castManaSplitter(){ //weapon skill

    if (items.I319.level>49 && rng(1,10)===1 && rpgPlayer.mana>=10){

    rpgPlayer.mana-=10
    animImageSplash("slash", "enemyPanel", "impact", 0);
    animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
    animParticleBurst(6 , "particleGlow2", "enemyPanel", 50);
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    enemyDeificDamage(playerWeaponDamage*6)
}

let stacks = 5;
if (items.I319.level>69) stacks = 5;

    if (items.I319.level>59 && rng(1,5)===1 && rpgPlayer.mana>=5 && buffs.B114.stacks<5){

    rpgPlayer.mana-=5
    animState("rpgPlayerImg", "flash 0.5s 1");
    animParticleBurst(4 , "particleGlow2", "playerPanel", 0);
    animParticleBurst(7 , "particleLight", "playerPanel", 100);
    buffs.B114.time+=15; buffs.B114.stacks+=1;
    playerBuffs();
    }


}

function castSerizawaFestival(){ //weapon skill

    if (items.I55.level>29 && rng(1,10)===1){
    animParticleBurst(4 , "particleConfetti", "playerPanel", 0); 
    setTimeout(() => { animParticleBurst(4 , "particleConfetti", "playerPanel", 100); }, 200);
    setTimeout(() => { animParticleBurst(4 , "particleConfetti", "playerPanel", 200); }, 400);
    setTimeout(() => { animParticleBurst(4 , "particleConfetti", "playerPanel", 400); }, 600);
        animState("rpgPlayerImg", "flash 0.5s 1");
        animParticleBurst(7 , "particleLight", "playerPanel", 100);
        buffs.B18.time=10;
        playerBuffs();
    }
    
    
    }

function castFoliarBlade(){


    if (items.I33.level>14) if (rng(1,10)===1) skill()

    function skill(){
        animState("rpgPlayerImg", "flash 0.5s 1");
        animImageSplash("sunray", "playerPanel", "rotate", 0);
        setTimeout(() => {
            animState("rpgPlayerImg", "flash 0.5s 1");
            animParticleBurst(7 , "particleLight", "playerPanel", 100);
            if (items.I33.level>24) buffs.B19.time=10;
            playerHealingDamage(playerMaxHp*0.2)
            playerBuffs()
        }, 1300);

    }

    



}


function castTheCaught(){ //weapon skill
    if (items.I169.level>29 && rng(1,10)===1) {
    animImageSplash("whirlpool", "enemyPanel", "rotate", 0);
    for (let i = 0; i < 6; i++) { setTimeout(loop, 300 * i);}
    if (items.I169.level>49){buffs.B111.time+=6; playerBuffs()}
 function loop() {
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    enemyMightDamage(playerWeaponDamage*0.8);
}
}

}

function castEvocation(){ 
    animImageSplash("whirlpool", "playerPanel", "rotate", 0);
        did("playerPanel").style.filter = "hue-rotate(100deg)";
    setTimeout(() => {
        did("playerPanel").style.filter = "";
    }, 2000);
    animParticleBurst(10 , "particleFire", "playerPanel", 180);
    animState("rpgPlayerImg", "gelatineHigh 2s 1");
    playSound("audio/gas.mp3")
    buffs.B66.time=15;
    playerBuffs()

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

    
    


function castSacrificialDagger(){ //weapon skill

    if (items.I81.level>29 && rng(1,10)===1){
    animImageSplash("holySlash", "enemyPanel", "impact", 0);
    animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
    let damageDealt=rng(200,350);
    enemyOccultDamage(playerWeaponDamage*2);
    animParticleProjectile("none", "reverseThrow", 9, "particleGlow", 130);
    setTimeout(() => {
        playerHealingDamage(playerMaxHp*0.2)
        animParticleBurst(3 , "particleHealth", "playerPanel", 0);  
    
    
    
    }, 700);

}



}

function castTerrorscythe(){ //weapon skill

    if (items.I64.level>49 && rng(1,10)===1) {
    animImageSplash("ghost", "enemyPanel", "float", 0);
    animImageSplash("holySlash", "enemyPanel", "impact", 0);
    animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
    animParticleBurst(9 , "particleGlow2", "enemyPanel", 130);
    animParticleProjectile("none", "reverseThrow", 9, "particleGlow", 130);
    setTimeout(() => {
        animParticleBurst(7 , "particleGlow2", "playerPanel", 130);  
        animParticleBurst(7 , "particleLight", "playerPanel", 0);
        buffs.B20.time=10;
        if (items.I64.level>59)buffs.B20A.time=10;
        playerBuffs();
    }, 700);

}
}

let wraithbladeCooldown = 0;
function castWraithbladeScimitar(){ //weapon skill

    if(items.I167.level>29) wraithbladeCooldown--
    if (wraithbladeCooldown<=0 && items.I167.level>29) {
        buffs.B33.time=10;
        animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
        animParticleBurst(2 , "particleFire", "enemyPanel", 130);
        if (buffs.B33.stacks<10) buffs.B33.stacks++;
        playerBuffs(); 

    }
    if (buffs.B33.stacks>=10) {
        if(items.I167.level>49) castWraithbladeScimitar2();
        buffs.B33.time=0;
        wraithbladeCooldown = 7;
        playerBuffs(); 

    }



    function castWraithbladeScimitar2(){

        animImageSplash("ghost", "enemyPanel", "float", 0);
        animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
        animParticleBurst(8 , "particleFire", "enemyPanel", 130);
        animImageSplash("soundWave", "enemyPanel", "wave", 200);
        enemyOccultDamage(playerWeaponDamage*6, "noScale");




    }
}


let castDpsTesterCd = 0;
function castDpsTester(){

    castDpsTesterCd++
    
    if (castDpsTesterCd>9) castDpsTester2()


    function castDpsTester2(){
        castDpsTesterCd = 0;

        console.log("Your DPS over 25 seconds: " + beautify((enemies.E46.hp - currentHP) / 25) + " DPS")
        deleteEnemy();


    }
}

function castPlundergeist(){ //weapon skill



    enemyTurn++;

    if (currentHP < enemies[stats.currentEnemy].hp*0.5) {curse()};

    if(enemyTurn>8){
        slash()
        enemyTurn=0;
    }


    function slash(){
        animImageSplash("slash", "playerPanel", "impact", 0);
        animState("rpgPlayerImg", "shake 0.4s 1");
        buffs.B60.time=15;
        playerBuffs(); 
        }


    



    function curse(){
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



}

let VicesRetributionCooldown = 0;
let VicesRetributionCooldown2 = false;
function castVicesRetribution(){ //weapon skill

    VicesRetributionCooldown--

    if (VicesRetributionCooldown<=0) {
        VicesRetributionCooldown=15;
        VicesRetributionCooldown2 = true;

        animImageSplash("vices", "playerPanel", "holdFloat", 0, 20, "vice");
        animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
        animImageSplash("circle", "playerPanel", "explosion", 0);
        animParticleBurst(7 , "particleElectric", "playerPanel", 0);

        setTimeout(() => {
            animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
            animImageSplash("circle", "playerPanel", "explosion", 0);
            animParticleBurst(7 , "particleElectric", "playerPanel", 0);
            VicesRetributionCooldown2 = false;
            }, 20000);

    }


    if (VicesRetributionCooldown2 === true){
        fire()


    }


    function fire(){
        if (did("vice")) animState("vice", "gelatineHoldFloatVice 6s infinite");

        animParticleProjectile("none", "throw", 12, "particleFire", 140);
        setTimeout(() => {
            animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
            animParticleBurst(3 , "particleFire", "enemyPanel", 140);
            //playerAttackHit();
            if (items.I371.level>70) enemyOccultDamage(playerWeaponDamage*1.2, "str")
            else enemyOccultDamage(playerWeaponDamage*1, "str")
        }, 600);
    }







    
}

function castInfernalus(){ 




    enemyTurn++

    if (enemyTurn % 3 === 0){fire();}

    if (enemyTurn===10){smoke(); enemyTurn=0;}



    function fire(){
        animImageSplash("holySlash", "playerPanel", "impact", 0);
        animState("rpgPlayerImg", "shake 0.4s 1");
        animParticleBurst(5 , "particleFire", "playerPanel", 0);
        buffs.B59.time=15;
        buffs.B59.stacks++;
        playerBuffs(); 
    }

    function smoke(){
        animParticleProjectile("none", "reverseThrow", 12, "particleSmoke", 0);
        setTimeout(() => {
            animState("rpgPlayerImg", "shake 0.4s 1");
            animParticleBurst(7 , "particleSmoke", "playerPanel", 140);
            buffs.B75.time+=15;
            playerBuffs();
        }, 600);
    }



    





}



function castCopperworkAxe(){ //weapon skill


    if (rng(1,5)===1 && items.I80.level>14){
    animParticleProjectile("none", "throw", 9, "particleSmoke", 0);
    setTimeout(() => {
        animParticleBurst(7 , "particleSmoke", "enemyPanel", 0);
        playSound("audio/button4.mp3");
        enemyElementalDamage(playerWeaponDamage*2);

    }, 600);


}
    
    
    }

function castMagewoodStaff(){ //weapon skill
    animParticleProjectile("fireball", "throwArrow", 5, "particleFire", 0);
    setTimeout(() => {
        animParticleBurst(3 , "particleFire", "enemyPanel", 0);
        playerAttackHit()
        playSound("audio/button4.mp3"); }, 700);}


function castHoopperonasPhylactery(){

    if (rng(1,10)===1){
    animImageSplash("bite", "enemyPanel", "impact", 0);
    animParticleBurst(7 , "particlePoison", "enemyPanel", 0);
    animState(stats.currentEnemy+"enemy", "shake 0.4s 1");
    buffs.B54.time+=10;
    if (items.I47.level>29) buffs.B107.time+=10;
    playerBuffs()
    }
}

function castDesertInAJar(){
    if (rng(1,10)===1){
    animParticleBurst(7 , "particleFire", "playerPanel", 20);
    animState("rpgPlayerImg", "spin 1s 1");
     buffs.B70.time=10;
    playerBuffs()
    }
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



function castLightbringerSet(damage){
    animImageSplash("holyRay", "enemyPanel", "impact", 0);
    animParticleBurst(2 , "particleGlow2", "enemyPanel", 100);
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    animImageSplash("circle", "enemyPanel", "explosion", 0);
    enemyDeificDamage(damage*20);
}

function castThunderousGyroresonator(){

if (rng(1,5)===1){

    animImageSplash("lightning", "enemyPanel", "impact", 0);
    animParticleBurst(2 , "particleGlow2", "enemyPanel", 100);
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    enemyElementalDamage(playerWeaponDamage*0.5);

    if (items.I201.level>39 && rng(1,3)===1) buffs.B110.time+=10;
    playerBuffs()




}

    



}

let eaCooldown = 0;
function castHeavenlyRuin(){
    wraithbladeCooldown--
    animImageSplash("ea", "enemyPanel", "impact", 0);
    enemyElementalDamage(rng(returnItemUpgradeScaling(4800, "I201"),returnItemUpgradeScaling(5100, "I201")), "noScale");
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");

    if (eaCooldown<=0) {
        eaCooldown = 20;
        buffs.B65.time=10;
        playerBuffs();

    }
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


    if (items.I9.level>9){
        if (rng(1,10)===1) siege()
            else attack()
    } else attack()


    function attack(){
        animParticleProjectile("arrow", "throwArrow", 0, "particleSmoke", 0);
        setTimeout(() => {
            playerAttackHit()
            if (!settings.disableCombatAudio) playSound("audio/button4.mp3")
        }, 600);
    }

    function siege(){
        animParticleProjectile("arrow", "throwArrow", 7, "particleFire", 0);
        setTimeout(() => {
            enemyElementalDamage(playerWeaponDamage*4);
            if (!settings.disableCombatAudio) playSound("audio/button4.mp3")
        }, 600);
    }
    


}

function castFloralBow(){ //weapon skill

    if (rng(1,5)===1){ flower() } else shot()


    function shot(){
            animParticleProjectile("arrow", "throwArrow", 0, "particleSmoke", 0);
            setTimeout(() => {
                playerAttackHit()
                if (!settings.disableCombatAudio) playSound("audio/button4.mp3")
            }, 600);}
    

    function flower(){
        animParticleProjectile("flower", "throw", 0, "particleSmoke", 0);
        setTimeout(() => {
            enemyNatureDamage(playerWeaponDamage*2);
            if (!settings.disableCombatAudio) playSound("audio/button4.mp3")
        }, 700);

    }



}

function castChrysalisRecurver(){ //weapon skill


    let timesshot = 3;
    if (items.I83.level>29) timesshot = 5

    if (items.I83.level>19 && rng(1,6)===1) for (let i = 0; i < timesshot; i++) { setTimeout(shard, 70 * i);}




    
    animParticleProjectile("spike", "throwArrow", 0, "particleSmoke", 0);
    setTimeout(() => {
        playerAttackHit();
        if (!settings.disableCombatAudio) playSound("audio/button4.mp3")
    }, 600);
    

    function shard(){
        animParticleProjectile("spike", "throwArrow", 0, "particleSmoke", 0);
        setTimeout(() => {
            enemyOccultDamage(playerWeaponDamage*0.4);
        }, 600);
        }




}


    

function castHoopperoona(){

    enemyTurn++


    if(enemyTurn>3){
        fangattack()
        enemyTurn=0;
    }


    function fangattack(){
        animImageSplash("bite", "playerPanel", "impact", 0);
        animParticleBurst(7 , "particlePoison", "playerPanel", 0);
        animState("rpgPlayerImg", "shake 0.4s 1");
        buffs.B3.time=15; buffs.B3.stacks=4;
        playerBuffs();
    }

}


function castHoopperoonaLucid(){

    enemyTurn++


    if(enemyTurn>3){
        fangattack()
    }

    if(enemyTurn>7){
        string()
        enemyTurn=0;
    }


    function fangattack(){
        animImageSplash("bite", "playerPanel", "impact", 0);
        animParticleBurst(7 , "particlePoison", "playerPanel", 0);
        animState("rpgPlayerImg", "shake 0.4s 1");
        buffs.B3.time=15; buffs.B3.stacks=5;
        playerBuffs();
    }


    function string(){
        animParticleProjectile("none", "reverseThrow", 12, "particleSmoke", 180);
        setTimeout(() => {
            animState("rpgPlayerImg", "shake 0.4s 1");
            animParticleBurst(7 , "particleSmoke", "playerPanel", 140);
            buffs.B86.stacks=8;
            buffs.B86.time=15;
            playerBuffs();
        }, 600);
    }


}


let thiefCollectibles = {

    I444:{P:700,A:1},
    I439:{P:700,A:1}, 

    I442:{P:900,A:1},
    I440:{P:900,A:1},

    I441:{P:1500,A:1}, 
    I445:{P:1500,A:1}, 

    I443:{P:2000,A:1}, 

    I446:{P:2500,A:1},
    I473:{P:2500,A:1},

}

stats.timesStolen = 0;
let enemyLevel = 1;
function castThief(){
    animState(stats.currentEnemy+"enemy", "gelatine 0.4s 1");
    animParticleProjectile("thief", "reverseThrow", 0, "particleSmoke", 0);
    setTimeout(() => {
        playSound("audio/use.mp3")

        rollTable(thiefCollectibles, 1);

        stats.timesStolen++

        let gotItem = false;


        if (stats.currentEnemy === "E1") gotItem = steal("I190",50)  //caulislug
        if (stats.currentEnemy === "E9") gotItem = steal("I24",200) //picore
        if (stats.currentEnemy === "E6") gotItem = steal("I127",150) //Karateil
        if (stats.currentEnemy === "E17") gotItem = steal("I215",70) //caladora
        if (stats.currentEnemy === "E18") gotItem = steal("I345",400) //morgato
        if (stats.currentEnemy === "E30") gotItem = steal("I345",60) //creatura
        if (stats.currentEnemy === "E27")  gotItem = steal("I90",150)  //infernalus
        if (stats.currentEnemy === "E43")  gotItem = steal("I184",200)  //mimic



        function steal(id, mod){

        let itemmod = mod - playerSteal
        let basemod = 0;
        if (items[id].quality==="Quest") basemod = 5
        if (items[id].quality==="Common") basemod = commonThief
        if (items[id].quality==="Uncommon") basemod = uncommonThief
        if (items[id].quality==="Rare") basemod = rareThief
        if (items[id].quality==="Epic") basemod = epicThief
        if (items[id].quality==="Mythic") basemod = mythicThief

        let chance = Math.max(basemod,itemmod)

        if (rng(1, chance)===1){
            items[id].count++;
            addItem();
            logPrint(`<FONT COLOR="#68FEBE"> You managed to steal a `+items[id].name+`!`)
            return true
        }

        }

 


        animState("rpgPlayerImg", "gelatineHigh 0.3s 1");

         

    


    }, 600);}

function castMalvarrel(){

    enemyTurn++

    if (enemyTurn===4){
        poison();
    }

    if (enemyTurn===9){
        hex();
        enemyTurn=0;
    }

    function poison(){
        animParticleProjectile("none", "reverseThrow", 12, "particlePoison", 200);
        setTimeout(() => {
            animState("rpgPlayerImg", "shake 0.4s 1");
            animParticleBurst(7 , "particlePoison", "playerPanel", 140);
            buffs.B3.time=15; buffs.B3.stacks=5;
            playerBuffs();
        }, 600);
    }

    function hex(){
        animParticleProjectile("none", "reverseThrow", 12, "particleFire", 200);
        setTimeout(() => {
            animState("rpgPlayerImg", "shake 0.4s 1");
            animParticleBurst(7 , "particleFire", "playerPanel", 140);
            buffs.B73.time=15; buffs.B73.stacks=10;
            playerBuffs();
        }, 600);
    }




}


stats.shroom1discovered = 0;
stats.shroom2discovered = 0;
stats.shroom3discovered = 0;
stats.shroom4discovered = 0;
stats.shroom5discovered = 0;
stats.shroom6discovered = 0;
stats.shroom7discovered = 0;
stats.shroom8discovered = 0;
let shroomEffectsDiscovered = 0;

function castSussyMushroom(){

    playSound("audio/monch.mp3");
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
    items.I380.count--;
    items.I380.cd = 20
  
    let shroomRoll = rng(1,10)
  
    if ([1, 9, 10].includes(shroomRoll)){
      rpgPlayer.hp = 0;
      playerUpdate();
      stats.shroom1discovered = 1

    }

    if (shroomRoll===2){
        buffs.B3.time=100; buffs.B3.stacks=5;
        playerBuffs();
        stats.shroom2discovered = 1

    }

    if (shroomRoll===3){
        did("rpgCanvas").style.animation = "rainbowFilter infinite 20s"
        setTimeout(() => { did("rpgCanvas").style.animation = "none"}, 60000);
        stats.shroom3discovered = 1;

    }
  
    if (shroomRoll===4){
        animState("rpgPlayerImg", "flash 0.3s 1");
        did("rpgPlayerImg").style.scale = "1";
        did("rpgPlayerImg").style.marginTop = "10%"
        setTimeout(() => { did("rpgPlayerImg").style.scale = "1.4"; did("rpgPlayerImg").style.marginTop = ""; animState("rpgPlayerImg", "flash 0.3s 1"); }, 120000);
        stats.shroom4discovered = 1;

    }

    if (shroomRoll===5){
        animState("rpgPlayerImg", "flash 0.3s 1");
        did("rpgPlayerImg").style.scale = "2";
        did("rpgPlayerImg").style.marginTop = "-10%"
        setTimeout(() => { did("rpgPlayerImg").style.scale = "1.4"; did("rpgPlayerImg").style.marginTop = ""; animState("rpgPlayerImg", "flash 0.3s 1"); }, 120000);
        stats.shroom5discovered = 1;

    }

    if (shroomRoll===6){
        did("rpgCanvas").style.filter = "brightness(0)";
        setTimeout(() => { did("rpgCanvas").style.filter = "none"}, 60000);
        stats.shroom6discovered = 1;

    }

    if (shroomRoll===7){
        buffs.B71.time=60;
        playerBuffs();
        stats.shroom7discovered = 1;

    }

    if (shroomRoll===8){
        buffs.B72.time=60;
        playerBuffs();
        stats.shroom8discovered = 1;
    }


    shroomEffectsDiscovered = stats.shroom1discovered + stats.shroom2discovered + stats.shroom3discovered + stats.shroom4discovered + stats.shroom5discovered + stats.shroom6discovered + stats.shroom7discovered + stats.shroom8discovered;



  
  }






function castIncendiaryBunny(){
    animState("rpgPlayerImg", "gelatineHigh 0.3s 1");
    animParticleProjectile("bunny", "throwArrow", 9, "particleFire", 0);
    animParticleProjectile("none", "throw", 6, "particleConfetti", 0);
    animImageSplash("hat", "playerPanel", "impact", 0);
    setTimeout(() => {
        enemyElementalDamage(playerWeaponDamage, "sp");
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
        animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        enemyElementalDamage(playerWeaponDamage, "sp");
        castInterrupt()
        }, 700);



    /*
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
        }, 700);
    */ //old poly
    
    
    
    
    }

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
        buffs[selectedBuffs[rng(0,(selectedBuffs.length-1))]].time=0;
        playerBuffs()
        animParticleBurst(7 , "particleSpark", "playerPanel", 100);
        playSound("audio/retro1.mp3");
        animImageSplash("soundWave", "playerPanel", "wave", 100);
        //animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
        //enemyDeificDamage(playerWeaponDamage*5, "sp");
    }




    }, 400);
    
    }

playerShield = 0;

function castWizhardShield(){
    animState("rpgPlayerImg", "flash 0.5s 1");
    animImageSplash("magishield", "playerPanel", "hold", 0, 15);
    animParticleBurst(7 , "particleExp", "playerPanel", 0);
    let shield =expectedPlayerDamage*0.3*playerSpellpower
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
        enemyMightDamage(playerWeaponDamage*0.15, "sp");
        animState(stats.currentEnemy+"enemy", "gelatine 0.4s 1");
        playSound("audio/throw.mp3")}, 700);}
}

function castHeartOfTheCards(){
timesfired = 10
if (items.I56.level>59) timesfired = 15
 for (let i = 0; i < timesfired; i++) { setTimeout(loop, 100 * i);}
 function loop() {
    playSound("audio/page.mp3");
    animState("rpgPlayerImg", "gelatine 0.3s 1");
    animParticleProjectile("card", "throwArrow", 0, "particleFire", 0);
    setTimeout(() => {
        enemyDeificDamage(playerWeaponDamage);
        animState(stats.currentEnemy+"enemy", "gelatine 0.4s 1");
        playSound("audio/throw.mp3")}, 700);}}

function castDoveFlock(){
 for (let i = 0; i < 4; i++) { setTimeout(loop, 120 * i);}
 function loop() {
    playSound("audio/page.mp3");
    animState("rpgPlayerImg", "gelatine 0.3s 1");
    animParticleProjectile("dove", "throwArrow", 0, "particleFeather", 0);
    setTimeout(() => {
        enemyNatureDamage(playerWeaponDamage*0.3, "sp");
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
                enemyElementalDamage(playerWeaponDamage*5, "sp");
                animParticleBurst(15 , "particleFire", "enemyPanel", 120);
                animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
                animImageSplash("circle", "enemyPanel", "explosion", 0);
                playSound("audio/explosion.mp3");
                animImageSplash("soundWave", "enemyPanel", "wave", 200);
                
            }, 700);
        }

        if (rollRng===2){ //heal
            playerHealingDamage(playerMaxHp*0.3);
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
            playerElementalDamage(playerMaxHp*0.2);
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
        buffs.B48.time=20; 
        playerBuffs()
        }, 1000);
    }

 function castWorkforcePoem(){
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("partiture", "playerPanel", "float", 0 );

    setTimeout(() => {
        animImageSplash("pickaxe", "playerPanel", "spin", 0);
        animState("rpgPlayerImg", "flash 0.5s 1");
        animParticleBurst(4 , "particleGlow2", "playerPanel", 0);
        animParticleBurst(7 , "particleLight", "playerPanel", 100);
        buffs.B69.time=1800*2; 
        playerBuffs()
        }, 1000);
    }  

function castConjureViolin(){
    animState("rpgPlayerImg", "flash 0.5s 1");
    animImageSplash("violin", "playerPanel", "holdFloat", 0, 20);
    animParticleBurst(7 , "particleExp", "playerPanel", 100);
    buffs.B16.time=20;
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
        enemyNatureDamage(playerWeaponDamage*0.8, "sp");
        playSound("audio/button4.mp3")}, 600);}

 function castRiffTempo(){
    for (let i = 0; i < 10; i++) { setTimeout(loop, 600 * i);}
 function loop() {
    playSound("audio/enemyAttack.mp3");
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("soundWave", "playerPanel", "wave", 0);
    setTimeout(() => {
        enemyNatureDamage(playerWeaponDamage*0.3, "sp");
        }, 500);}
    }
        
function castKingKatDecapitator(){ //weapon skill

if (items.I137.level>19 && rng(1,10)===1) {

    for (let i = 0; i < 3; i++) { setTimeout(loop, 150 * i);}
 function loop() {
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("soundWave", "playerPanel", "wave", 100);
    }
    buffs.B21.time=10;
    playerBuffs();

}


}


function castMalevolentShrine(){

    for (let i = 0; i < 100; i++) { setTimeout(loop, 300 * i);}
    function loop() {
       animParticleBurst(10 , "particleSukuna", "enemyPanel", 0);
       enemyOccultDamage(192032199);




       }

}

function castDragonfellSword(){ //weapon skill
    animState("rpgPlayerImg", "gelatineHigh 0.4s 1");
    animImageSplash("circle", "enemyPanel", "explosion", 0);
    animImageSplash("soundWave", "enemyPanel", "wave", 200);
    animImageSplash("slash", "enemyPanel", "impact", 0);
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
}

function castTortufleet(){ //weapon skill
    animParticleProjectile("turtlefleet", "slow", 29, "particleGlow2", 100);
    animParticleProjectile("none", "slow", 10, "particleElectric", 0);

    setTimeout(() => {
        animImageSplash("soundWave", "enemyPanel", "wave", 200);

        for (let i = 0; i < 15; i++) { setTimeout(loop, 150 * i);}
        function loop() {
            animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
            enemyElementalDamage(192032199);
            animImageSplash("turtlefleetAoe", "enemyPanel", "impact", 0, 7);
        }
        

    }, 2000);

}

function castShadowBolt(){ 
    animParticleProjectile("turtlefleet", "fast", 5, "particleFire", 200);

    setTimeout(() => {
        enemyOccultDamage(playerWeaponDamage*0.5);
        

    }, 1000);

}

function castRhythmHell(){

        buffs.B51.time=15;
        playerBuffs();
       
} 

rhythmHellCd = false

rhythmHellCdStreak = true

function castRhythmHellHit(){

    playSound("audio/osu.mp3");
    animState(stats.currentEnemy+"enemy", "shakeFlash 0.4s 1");
    damageText('Good', 'damageText', '#818181', undefined, "enemyPanel");
    enemyNatureDamage(playerWeaponDamage*0.5, "sp");
    animImageSplash("soundWave", "enemyPanel", "reverseWave", 0);
    animImageSplash("circle", "enemyPanel", "explosion", 0);
    setTimeout(() => {
        rhythmHellCd = false
    }, 500);
   
} 


document.addEventListener("click", function(event) { if (event.target && event.target.closest("#"+stats.currentEnemy+"Enemy img") && buffs.B51.time>0) { 

    if (!rhythmHellCd){
        
        castRhythmHellHit();
        rhythmHellCd=true
        rhythmHellCdStreak = true

        setTimeout(() => {

            if (rhythmHellCd===false){

                buffs.B51.time=0;
                playerBuffs();
                damageText('Miss', 'damageText', '#818181', undefined, "enemyPanel");
                playSound("audio/osumiss.mp3");


            }
            
        }, 700);


        
    
    }


    
  
  
   } });

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
        enemyOccultDamage(playerWeaponDamage*8, "sp");
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