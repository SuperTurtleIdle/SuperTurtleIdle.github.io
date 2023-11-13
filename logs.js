
//#region Trackers
var logTrackClickDuck = false;
var logTrackClickDiscord = false;
var logTrackTier = false;
var logTrackClickThis = false;
//#endregion

document.addEventListener("click", function(event) { if (event.target && event.target.closest("#B1P16log img")) { logTrackClickThis = true; logCheck() } });

setInterval(function() { if (stats.currentCategory === "achievementContainer") { createLog(); } }, 1000);
function createLog() {
   for (let i in logs) {
   if (!did(i+"log")) {
    
    const div = document.createElement('div');
    div.id = i+"log";
    div.style.filter = "brightness(0.1)";
    div.style.border = "black solid 1px";   

    if (i.startsWith("B1")) {
    div.innerHTML = '<img src="img/src/icons/page1.png">';   
    did('book1List').appendChild(div); }

    if (i.startsWith("B2")) {
      div.innerHTML = '<img src="img/src/icons/page2.png">';   
      did('book2List').appendChild(div); }





    div.className = 'itemSlot';
    //tooltip here
    //areaButton(areas[a]);
    tooltipLog(i);   
   }
       
   if (logs[i].unlocked) did(i+"log").style.filter = "brightness(1)"    
   }    
};createLog();


function tooltipLog(i) {
    if (did(i+"log")) {
    did(i+"log").addEventListener('mouseenter', function () { //on mouseenter
    playSound("audio/page.mp3")
    did('tooltip').style.display = "flex";
    did("tooltipName").textContent = logs[i].name;
    did("tooltipPrice").innerHTML = '';
    
    if (logs[i].unlocked){
    did("tooltipRarity").textContent = 'Completed Page';
    did("tooltipRarity").style.color = "white";      
    did("tooltipName").style.color = "white";     
    did("tooltipDescription").innerHTML = logs[i].description;
        
    } else {
    did("tooltipRarity").textContent = 'Missing Page';
    did("tooltipRarity").style.color = "gray";
    did("tooltipName").style.color = "gray";
    did("tooltipDescription").innerHTML = "";     
    }
        
    did("tooltipFlavor").textContent = logs[i].hint;

    if (i.startsWith("B1")) { did('tooltipImage').src = "img/src/icons/page1.png"; }
    if (i.startsWith("B2")) { did('tooltipImage').src = "img/src/icons/page2.png"; }   
        
    const movingDiv = did('tooltip');
    const referenceDiv = did(i+"log");
    const referenceRect = referenceDiv.getBoundingClientRect();
    const referenceLeft = referenceRect.left + 33;
    const referenceTop = referenceRect.top - 15;
    const newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    const newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';
        
  });
    did(i+"log").addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }
}

setInterval(logCheck, 1000);
function logCheck() {
    
    if (unlocks.journal){
        
      if (!logs.B1P1.unlocked){ if (stats.logsGot>9){ logs.B1P1.unlocked=true;}};  
      if (!logs.B1P2.unlocked){ if (stats.craftedItems>999){ logs.B1P2.unlocked=true; reduceRecipeTime(3)}};  
      if (!logs.B1P3.unlocked){ if (stats.questsCompleted>9){ logs.B1P3.unlocked=true;}};  
      if (!logs.B1P4.unlocked){ if (logTrack69){ logs.B1P4.unlocked=true}};  
      if (!logs.B1P5.unlocked){ if (enemies.E4.killCount>0){ logs.B1P5.unlocked=true;}};  
      if (!logs.B1P6.unlocked){ if (items.I102.count>0){ logs.B1P6.unlocked=true;}};  
      if (!logs.B1P7.unlocked){ if (stats.timesDied>99){ logs.B1P7.unlocked=true;}};  
      if (!logs.B1P8.unlocked){ if (logTrackLostPage){ logs.B1P8.unlocked=true;}};  
      if (!logs.B1P9.unlocked){ if (logTrackName!=='base'){ logs.B1P9.unlocked=true;}};  
      if (!logs.B1P10.unlocked){ if (logTrackName==='jeffrey' || logTrackName==='Jeffrey'){ logs.B1P10.unlocked=true;}};  
      if (!logs.B1P11.unlocked){ if (logTrackClickDuck){ logs.B1P11.unlocked=true;}};   
      if (!logs.B1P12.unlocked){ if (stats.totalSeconds>36000){ logs.B1P12.unlocked=true;}};  
      if (!logs.B1P13.unlocked){ if (stats.totalSeconds>180000){ logs.B1P13.unlocked=true}};  
      if (!logs.B1P14.unlocked){ if (stats.totalSeconds>360000){ logs.B1P14.unlocked=true;}}; 
      if (!logs.B1P15.unlocked){ if (logTrackTier){ logs.B1P15.unlocked=true; }};  
      if (!logs.B1P16.unlocked){ if (logTrackClickThis){ logs.B1P16.unlocked=true;}};  
      if (!logs.B1P17.unlocked){ if (stats.soldItems>9999){ logs.B1P17.unlocked=true;}};  
      if (!logs.B1P18.unlocked){ if (rpgPlayer.level>9){ logs.B1P18.unlocked=true; }};  
      if (!logs.B1P19.unlocked){ if (rpgPlayer.level>19){ logs.B1P19.unlocked=true;}};  
      if (!logs.B1P20.unlocked){ if (enemies.E8.killCount>0){ logs.B1P20.unlocked=true;}};  
      if (!logs.B1P21.unlocked){ if (stats.clickCount>9999){ logs.B1P21.unlocked=true;}};  
      if (!logs.B1P22.unlocked){ if (logTrackClickDiscord){ logs.B1P22.unlocked=true;}};  
      if (!logs.B1P23.unlocked){ if (unlocks.jobs){ logs.B1P23.unlocked=true}};  
      if (!logs.B1P24.unlocked){ if (stats.currentEnemy==='E4' && buffs.B2.time>2){ logs.B1P24.unlocked=true;}};  
      if (!logs.B1P25.unlocked){ if (stats.boughtItems>99){ logs.B1P25.unlocked=true;}};  
      if (!logs.B1P26.unlocked){ if (logTrackDamage>9999){ logs.B1P26.unlocked=true;}};  
      if (!logs.B1P27.unlocked){ if (stats.currentWeather==="bluemoon"){ logs.B1P27.unlocked=true;}};  
      if (!logs.B1P28.unlocked){ if (stats.recievedPresents>9){ logs.B1P28.unlocked=true;}};  

    } 

    if (unlocks.book2){
      if (!logs.B2P1.unlocked){ if (logTrackDamage>9999){ logs.B2P1.unlocked=true; }};  

    }

    //aqui un if book2 unlocked y continuar
    
    for (var i in logs) { if (logs[i].unlocked && !logs[i].once) { stats.logsGot++; logs[i].once = true; logPopup(i); logStatUp(); playSound("audio/achievement.mp3"); updateMaxStack()}} 

    
    did('logCount').innerHTML = stats.logsGot+'/'+stats.totalLogs
    did('logCompletion').innerHTML = '['+Math.round(stats.logsGot/stats.totalLogs*100)+'%]'
    
}

function logStatUp(){

  if (logs.B1P1.unlocked) logs.B1P1.statUp=0.08;  
  if (logs.B1P3.unlocked) logs.B1P3.statUp=0.08;  
  if (logs.B1P4.unlocked) logs.B1P4.unlocked=true;  
  if (logs.B1P5.unlocked) logs.B1P5.statUp=0.1;  
  if (logs.B1P6.unlocked) logs.B1P6.statUp=0.15; 
  if (logs.B1P7.unlocked) logs.B1P7.statUp=true;  
  if (logs.B1P8.unlocked) logs.B1P8.statUp=0.15;  
  if (logs.B1P9.unlocked) logs.B1P9.statUp=0.1; 
  if (logs.B1P10.unlocked) logs.B1P10.statUp=0.05;  
  if (logs.B1P11.unlocked) logs.B1P11.statUp=0.01;   
  if (logs.B1P12.unlocked) logs.B1P12.statUp=0.1;  
  if (logs.B1P14.unlocked) logs.B1P14.statUp=0.2; 
  if (logs.B1P15.unlocked) logs.B1P15.statUp=0.05;  
  if (logs.B1P16.unlocked) logs.B1P16.statUp=0.04;  
  if (logs.B1P17.unlocked) logs.B1P17.statUp=0.08;  
  if (logs.B1P20.unlocked) logs.B1P20.statUp=0.09;  
  if (logs.B1P21.unlocked) logs.B1P21.statUp=0.15;  
  if (logs.B1P22.unlocked) logs.B1P22.statUp=0.02;  
  if (logs.B1P24.unlocked) logs.B1P24.statUp=3;  
  if (logs.B1P25.unlocked) logs.B1P25.statUp=1;  
  if (logs.B1P27.unlocked) logs.B1P27.statUp=0.09;  
  if (logs.B1P28.unlocked) logs.B1P28.statUp=0.1;
  if (logs.B2P1.unlocked) logs.B2P1.statUp=1;

  statsUpdate();
  updateStatsUI();
  updateMaxStack();
}

function unlockAllLogs(){
  for (var i in logs) { logs[i].unlocked = true }
}

function logPopup(log) {
    
    const div = document.createElement('div');
    div.innerHTML = '&#128196 Log Adquired: '+logs[log].name
    div.className = 'logPopUp';
    div.id = log+'popUp';
    document.body.appendChild(div);
    setTimeout(function () { div.remove() }, 5000);

}

document.addEventListener("DOMContentLoaded", logStatUp);

















