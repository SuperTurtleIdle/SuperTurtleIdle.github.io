
let selectedSeed = "none";



let gardenReflectPower = 0;
let gardenNaturePower = 0;
let gardenElementalPower = 0;
let gardenMightPower = 0;
let gardenDeificPower = 0;
let gardenOccultPower = 0;
let gardenPatPower = 0;
let gardenStrengthPower = 0;
let gardenSpellpower = 0;
let gardenDropChancePower = 0;
let gardenExpGainPower = 0;
let gardenHealthPower = 0;
let gardenFlowerPower = 0;
let gardenMutationPower = 0;
let gardenDragonGoldPower = 0;
let gardenMagicRegenPower = 0;


function calculateGardenStats(){

  if (rpgPlayer.currentFertiliser==="f0"){ //frozen

    gardenFlowerPower = 0
    gardenReflectPower = 0
    gardenNaturePower = 0
    gardenElementalPower = 0
    gardenMightPower = 0
    gardenDeificPower = 0
    gardenOccultPower = 0
    gardenPatPower = 0
    gardenStrengthPower = 0
    gardenSpellpower = 0
    gardenDropChancePower = 0
    gardenExpGainPower = 0
    gardenHealthPower = 0
    gardenMutationPower = 0
    gardenMagicRegenPower = 0
    gardenDragonGoldPower = 0

  } else {

    gardenFlowerPower = ((plants.g17.planted)*10 + (plants.g17a.planted*30)) + (talent.TI2B1.statUp);
    gardenReflectPower = ((plants.g1.planted)*3 + (plants.g1a.planted*10))*(1+(gardenFlowerPower/3)/100);
    gardenNaturePower = ((plants.g7.planted)*2 + (plants.g7a.planted*10))/100*(1+gardenFlowerPower/100);
    gardenElementalPower = ((plants.g4.planted)*2 + (plants.g4a.planted*10))/100*(1+gardenFlowerPower/100);
    gardenMightPower = ((plants.g6.planted)*2 + (plants.g6a.planted*10))/100*(1+gardenFlowerPower/100);
    gardenDeificPower = ((plants.g3.planted)*2 + (plants.g3a.planted*10))/100*(1+gardenFlowerPower/100);
    gardenOccultPower = ((plants.g5.planted)*2 + (plants.g5a.planted*10))/100*(1+gardenFlowerPower/100);
    gardenPatPower = ((plants.g12.planted)*2 + (plants.g12a.planted*10))/100*(1+gardenFlowerPower/100);
    gardenStrengthPower = ((plants.g8.planted)*1 + (plants.g8a.planted*6))/100*(1+gardenFlowerPower/100);
    gardenSpellpower = ((plants.g9.planted)*1 + (plants.g9a.planted*6))/100*(1+gardenFlowerPower/100);
    gardenDropChancePower = ((plants.g11.planted)*2 + (plants.g11a.planted*10))/100*(1+gardenFlowerPower/100);
    gardenExpGainPower = ((plants.g13.planted)*2 + (plants.g13a.planted*10))/100*(1+gardenFlowerPower/100);
    gardenHealthPower = ((plants.g14.planted)*1 + (plants.g14a.planted*6))/100*(1+gardenFlowerPower/100);
    gardenMutationPower = ((plants.g15.planted)*20 + (plants.g15a.planted*75))*(1+(gardenFlowerPower/3)/100);
    gardenMagicRegenPower = ((plants.g18.planted)*1 + (plants.g18a.planted*5))/100*(1+gardenFlowerPower/100);
    gardenDragonGoldPower = ((plants.g19.planted)*3 + (plants.g19a.planted*30))*(1+(gardenFlowerPower)/100);
    
  }

  

  statsUpdate();
  updateStatsUI();


}
let nextGardenLevel = 0;

function updateGardenUi() {
  did("gardenTokenCount").innerHTML = '<img src="img/src/garden/gardenToken.jpg">'+ beautify(rpgPlayer.gardenTokens)

  if (rpgPlayer.currentFertiliser!=="none") did("currentFertiliser").src = "img/src/garden/"+rpgPlayer.currentFertiliser+".jpg";

  for (let i = 1; i <= rpgPlayer.gardenLevel-1; i++) {
    did("gardenShopListing" + i + "Cover").style.display = "none";
}


  if (rpgPlayer.gardenExp>=nextGardenLevel){
    rpgPlayer.gardenLevel++;
    rpgPlayer.gardenExp = 0;
    nextGardenLevel = Math.floor(100 * Math.pow(2, rpgPlayer.gardenLevel-1))

    did("gardenExpButton").style.animation = "";
    void did("gardenExpButton").offsetWidth;
    did("gardenExpButton").style.animation = "levelUp 1s 1";

    playSound("audio/levelup.mp3");


    updateGardenUi();
  }



  let percentageEXP = (rpgPlayer.gardenExp / nextGardenLevel) * 100;
  did("gardeningExpBar").style.background = "linear-gradient(90deg, #7EBE70 " + percentageEXP + "%, #251A17 " + percentageEXP + "%)";
  did("gardeningExp").innerHTML = '🌳 Gardening Level '+rpgPlayer.gardenLevel+' 🌳';

  

}

/*

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

  
}*/


var gardenCollectibles = { 
  I480:{P:200, A:1}, 
  I482:{P:200, A:1}, 

  I478:{P:400, A:1},
  I479:{P:400, A:1}, 

  I475:{P:1000, A:1},
  I477:{P:1000, A:1}, 

  I476:{P:2000, A:1}, 

  I481:{P:4000, A:1}, 
}



stats.plantsHarvested = 0

function createGardenPlots() {
    for (let i in plot) {
  
  
    if (!did(i+"plot")) {
    
      const div = document.createElement("div");
      div.innerHTML = '<span><img id="'+i+'mound" src="img/src/icons/mound.png"></span><img id="'+i+'plotPlant" src="img/src/garden/g1.png" style="height:0">';
      div.id = i+"plot";

      if (i.startsWith("r1")) did("gardenRow1").appendChild(div)
      if (i.startsWith("r2")) did("gardenRow2").appendChild(div)
      if (i.startsWith("r3")) did("gardenRow3").appendChild(div)
      if (i.startsWith("r4")) did("gardenRow4").appendChild(div)
      if (i.startsWith("r5")) did("gardenRow5").appendChild(div)
  
      tooltipGarden(i);


      function mainClick(){

        if (plot[i].slot!=="none"){ //water the plant
          plot[i].water = 100;
          div.style.animation = "";
          void div.offsetWidth;
          div.style.animation = "gelatineHigh 0.3s 1";
          leftClickX = event.clientX;
           leftClickY = event.clientY;
          if (rng(1,3)===1)animParticleBurst(1 , "particleWaterGarden", "cursor2", 0);
      } 


      if (plot[i].slot==="none" && selectedSeed != "none"){ //plant when empty

          if (rng(1,4)===1)playSound("audio/plant.mp3");
          else playSound("audio/plant2.mp3");

          randomTabName()
          did("jobTab").innerHTML = '<img src="img/src/icons/job.png"><p>Guildwork</p>';

          if (selectedSeed!=="g2") plants[selectedSeed].count--
          plot[i].water = 100;
          plot[i].slot = selectedSeed
          div.style.animation = "";
          void div.offsetWidth;
          div.style.animation = "gelatineHigh 0.3s 1";
          leftClickX = event.clientX;
           leftClickY = event.clientY;
          animParticleBurst(2 , "particleSpark", "cursor2", 0);
          createGardenPlots()

          
          if (plants[selectedSeed].count<=0) selectedSeed = "none"
          createPlants()
      } 


      plantGrow()

      }



      function secondClick(){

        if (plot[i].mature && plot[i].renewable && !("harvest" in plants[plot[i].slot])){ //if renewable

            
          
          createFloatingText('<p>' + 'Seed Recovered!') 
          plants[plot[i].slot].count++
          createPlants()
          
        }

      if (plot[i].mature) { //if mature
        stats.plantsHarvested++
        rollTable(gardenCollectibles, 1)


        let tokensGained = 1;
        if (talent.TG2D2.active && rng(1,4)===1) tokensGained += 1

        if (talent.TG2D2.active && rng(1,4)===1) tokensGained += 1
        if (rpgPlayer.currentFertiliser==="f1" && rng(1,4)===1) tokensGained += 1
        rpgPlayer.gardenTokens += tokensGained;
        

        if (rpgPlayer.gardenLevel<=6) rpgPlayer.gardenExp+=returnPlantExp(plot[i].slot)
        plants[plot[i].slot].planted--;
        if ("harvest" in plants[plot[i].slot]) eval(plants[plot[i].slot].harvest)
        updateGardenUi()

      
      }

        if (plot[i].slot!=="none") { //if plant

          playSound("audio/button6.mp3")


          if (plants[plot[i].slot].harvested===0) { //if new plant
            playSound("audio/talent.mp3")
            createFloatingText('<p>' + 'Seed Discovered!') 
            did("gardenShipButton").style.animation = "";
            void did("gardenShipButton").offsetWidth;
            did("gardenShipButton").style.animation = "gelatineHigh 0.3s 1";
          }
      
          plants[plot[i].slot].harvested++
          if (did(i+'plotPlant')) did(i+'plotPlant').classList.remove('moundMature');
          if (settings.disableColorblind && did(i+'plotPlant')) did(i+'plotPlant').style.outline = "none"

          plot[i].slot = "none"
          div.style.animation = "";
          void div.offsetWidth;
          div.style.animation = "gelatineHigh 0.3s 1";
          randomTabName()
          did("jobTab").innerHTML = '<img src="img/src/icons/job.png"><p>Guildwork</p>';
          plot[i].age = 0;
          plot[i].water = 0;
          plot[i].mature=false;
          plot[i].renewable = false;
          did(i+'plotPlant').style.height = "0%"
          calculateGardenStats()
          createGardenPlots()
          plantGrow()
  
          }








      }



      div.addEventListener('mousemove', function(event) {
        if (event.buttons === 1) {
            mainClick()
        }

        if (event.buttons === 2) { //right click harvest
         secondClick()
        }
    });

    div.addEventListener('click', function(event) {  mainClick() });
         
    div.addEventListener('contextmenu', function(event) {  secondClick() });






/*
    div.addEventListener("contextmenu", function () { //right click

        if (plot[i].mature && plot[i].renewable && !("harvest" in plants[plot[i].slot])){
          
            createFloatingText('<p>' + 'Seed Recovered!') 
            plants[plot[i].slot].count++
            createPlants()
            
          }

        if (plot[i].mature) {
          rpgPlayer.gardenTokens++;
          rpgPlayer.gardenExp+=plants[plot[i].slot].exp
          plants[plot[i].slot].planted--;
          if ("harvest" in plants[plot[i].slot]) eval(plants[plot[i].slot].harvest)
          updateGardenUi()


        }

          if (plot[i].slot!=="none") {
        
            plants[plot[i].slot].harvested++

            plot[i].slot = "none"
            div.style.animation = "";
            void div.offsetWidth;
            div.style.animation = "gelatineHigh 0.3s 1";

    
            plot[i].age = 0;
            plot[i].water = 0;
            plot[i].mature=false;
            plot[i].renewable = false;
            did(i+'plotPlant').style.filter = "saturate(0.9)";
            did(i+'plotPlant').style.height = "0%"
            calculateGardenStats()
            createGardenPlots()
    
            }
  

      });

*/





  
    }


    did(i+'plotPlant').src = "img/src/garden/"+plot[i].slot+".png";
  
  
  
  }
  }

  setInterval(plantTick, 10000); //default 10000

  let matureTime = 120 //120 ticks === 1h
  let secondsPassed = 0
  let matureSeconds = 0


  function plantTick(mode){
  
    for (let i in plot) {


        if (plot[i].slot !== "none" && rpgPlayer.currentFertiliser!=="f0"){
            if (!plot[i].mature) {  

              //secondsPassed+=10
              //console.log(secondsPassed/60)
              //if (rpgPlayer.currentFertiliser === "f2") matureTime = 180*2

               
              plot[i].water-=rng(0,2) //water will run out in 17 minutes avg

              if (stats.currentWeather === "rain")  plot[i].water=100

              let water = 1;
              if (plot[i].water>0){ water = 3;} else water = 1

              

              if (rpgPlayer.currentFertiliser==="f2"){ //water retaining
                plot[i].water = 0;
                water = 2.5;
              }

              if (plants[plot[i].slot].growth === "short") plot[i].age+= 1.8*water //30 mins
              else if (plants[plot[i].slot].growth === "long") plot[i].age+= 0.44*water //2h
              else plot[i].age+= 0.22*water //60 mins without watering, 30 with watering after 17 mins, default

            } 

            

            if (plot[i].age >= matureTime && !plot[i].mature){
              







              if (plot[i].water>0 && plot[i].slot !== "g16" && plot[i].slot.slice(-1) !== 'a' && rng(1,20)===1){ // bonus mutation
                if (plot[i].mature) plants[plot[i].slot].planted--
                plot[i].slot = plot[i].slot+"a";
                plot[i].renewable = true;
                plot[i].age = 0;
                plot[i].water = 100;
                plot[i].mature=false;
                if (did(i+'plotPlant')) did(i+'plotPlant').classList.remove('moundMature');
                if (settings.disableColorblind && did(i+'plotPlant')) did(i+'plotPlant').style.outline = "none"
                createGardenPlots();
                calculateGardenStats()
              } else{
                randomTabName("plant")
                plants[plot[i].slot].planted++;
                plot[i].mature=true;
                did("jobTab").innerHTML = '<img src="img/src/icons/job.png"><p>Guildwork 🌱</p>';
                calculateGardenStats()
              }








              
              
            } 


            if(rng(1,1000000)===1){ //corruption
              if (plot[i].mature) plants[plot[i].slot].planted--;
              plot[i].age = 0;
              plot[i].water = 100;
              plot[i].mature=false;
              plot[i].renewable = false;
              plot[i].slot = "g16";
              createGardenPlots();
            }

            let crossbreedChance = 300

            if (plot[i].mature){ //when plant mature
              if (rng(1,crossbreedChance)===1) crossBreeding();
              plot[i].age-=0.17 // 2h of maturity, default

              //matureSeconds+=10
              //console.log(matureSeconds/60)




              let baseMutationChance = 6000
              if (plants[plot[i].slot].tier === 2) baseMutationChance = 10000
              if (plants[plot[i].slot].tier === 3) baseMutationChance = 19000
              if (plants[plot[i].slot].tier === 4) baseMutationChance = 24000
              //console.log("new:" + baseMutationChance*(1/(1 + (gardenMutationPower*5)/100 )))
              //let mutationChance = baseMutationChance * (100-Math.min(gardenMutationPower,99)) / 100
              //console.log("old:" + mutationChance)
              let mutationChance = baseMutationChance*(1/(1 + (gardenMutationPower)/100 ))




              //if (rpgPlayer.currentFertiliser === "f2") mutationChance = baseMutationChance*2

              if (plot[i].slot !== "g16" && plot[i].slot.slice(-1) !== 'a' && rng(1,mutationChance)===1){ //mutation
                //if (plot[i].mature) plants[plot[i].slot].planted--
                plants[plot[i].slot].planted--
                plot[i].slot = plot[i].slot+"a";
                plot[i].renewable = true;
                plot[i].age = 0;
                plot[i].water = 100;
                plot[i].mature=false;
                if (did(i+'plotPlant')) did(i+'plotPlant').classList.remove('moundMature');
                if (settings.disableColorblind && did(i+'plotPlant')) did(i+'plotPlant').style.outline = "none"
                createGardenPlots();
                calculateGardenStats()
              }


              



















            } 

            if (plot[i].mature && plot[i].age<0){ //plant death
                

                stats.plantsHarvested++
                let tokensGained = 2;
                if (talent.TG2D2.active && rng(1,4)===1) tokensGained += 1
                rpgPlayer.gardenTokens += tokensGained;
                if (rpgPlayer.gardenLevel<=6) rpgPlayer.gardenExp+=returnPlantExp(plot[i].slot)*2
                if (i!=="g2" && "harvest" in plants[plot[i].slot]) eval(plants[plot[i].slot].harvest)
                updateGardenUi()

                plants[plot[i].slot].harvested++
                if (did(i+'plotPlant')) did(i+'plotPlant').classList.remove('moundMature');
                if (settings.disableColorblind && did(i+'plotPlant')) did(i+'plotPlant').style.outline = "none"

                plants[plot[i].slot].planted--;
                plot[i].slot = "none"; 

                createGardenPlots();
                plot[i].age = 0;
                plot[i].water = 0;
                plot[i].mature=false;
                plot[i].renewable = false;
                calculateGardenStats()
                
                did(i+'plotPlant').style.height = "0%"
                
            } 

            plantGrow();

        }

    }

  }



function returnPlantExp(id){

 
  if (plants[id].tier===0) return 2
  if (plants[id].tier===1) return 4
  if (plants[id].tier===2) return 8
  if (plants[id].tier===3) return 16
  if (plants[id].tier===4) return 32

  return 1 //failsafe


}

function plantGrow(){ //purely visual stuff

  for (let i in plot) {

    //if (plot[i].slot !== "none") {did(i+'mound').style.visibility = "visible";} else did(i+'mound').style.visibility = "hidden";
    if (did(i+'mound') && plot[i].slot !== "none") {did(i+'mound').style.display = "flex";} else if (did(i+'mound')) did(i+'mound').style.display = "none";


    
    if (plot[i].slot !== "none"){


  if (stats.currentCategory === "jobContainer"){ //visual stuffg19

    if (did(i+'plotPlant') && !plot[i].mature) {
    
    let agePercentage = ( plot[i].age / matureTime * 100 ) 
    did(i+'plotPlant').style.height = Math.min(100, (agePercentage*1.5))+"%"

    } else if (did(i+'plotPlant') && plot[i].mature) {

    did(i+'plotPlant').classList.add('moundMature');
    did(i+'plotPlant').style.height = "100%"
    if (settings.disableColorblind) did(i+'plotPlant').style.outline = "solid yellow 1px"
    //let sepiaPercentage = 1 - (plot[i].age / plants[plot[i].slot].age); //extremely laggy do not use
    //did(i+'plotPlant').style.filter += "sepia("+ Math.min(sepiaPercentage, 0.1) +")";



    }

  }

    }
  }



}


  function crossBreeding(){

//if youre trying to datamine this, dont even try. theres a file on \img\src\garden called plantguide detailing all of this

//t2
if (plants.g1a.planted>0 && plants.g6.planted>0) createNewPlant("g12", (plants.g1a.planted+plants.g6.planted)) //cactus m y piña
if (plants.g6a.planted>0 && plants.g7.planted>0) createNewPlant("g14", (plants.g6a.planted+plants.g7.planted)) //piña m y rosa
if (plants.g7a.planted>0 && plants.g6.planted>0) createNewPlant("g13", (plants.g7a.planted+plants.g6.planted)) //c rosa m y piña
if (plants.g5a.planted>0 && plants.g4.planted>0) createNewPlant("g15", (plants.g5a.planted+plants.g4.planted)) //arandano m y chile
if (plants.g2a.planted>0 && plants.g4a.planted>0) createNewPlant("g8", (plants.g2a.planted+plants.g4a.planted)) //sprout m y chile m

//t3
if (plants.g2a.planted>0 && plants.g12.planted>0) createNewPlant("g19", (plants.g2a.planted+plants.g12.planted)) //sprout m y cactuspiña
if (plants.g3a.planted>0 && plants.g15.planted>0) createNewPlant("g9", (plants.g3a.planted+plants.g15.planted)) //sunflower m y cloudchili
if (plants.g16.planted>0 && plants.g12.planted>0) createNewPlant("g18", (plants.g16.planted+plants.g12.planted)) //glitch y cactuspiña

//t4
if (plants.g19a.planted>0 && plants.g14a.planted>0) createNewPlant("g11", (plants.g19a.planted+plants.g14a.planted)) //dragonfruit m y woodflower
if (plants.g16.planted>0 && plants.g9a.planted>0) createNewPlant("g17", (plants.g16.planted+plants.g9a.planted)) //glitch y blacklotus

}

function createNewPlant(seed, parents){
  

  for (i in plot){


    let baseCrossbreed = 150
    if (plants[plot[i].slot].tier === 3) baseCrossbreed = 400
    if (plants[plot[i].slot].tier === 4) baseCrossbreed = 600

    if (did(i+"plot").parentNode.style.display !== "none" && plot[i].slot === "none" && rng(1,Math.max(1,baseCrossbreed-parents))===1){

      plot[i].slot = seed;
      createGardenPlots();
      plot[i].water = 100;
      plantTick()
      calculateGardenStats()
    }


  }

}


  


  


  function createPlants(){

    for (let i in plants) {
  
  
        if (!did(i+"plants")) {
        
          const div = document.createElement("span");
          div.id = i+"plants";
          div.innerHTML = "<img class='seedbag' id='"+i+"seedSack' src='img/src/garden/sack.png'><img src='img/src/garden/"+i+".png'><span id='"+i+"seedCount'>5</span>"
          
    
          did("gardenList").appendChild(div)
      
    
          div.addEventListener('click', function(event) { 
            playSound("audio/button1.mp3")
            selectedSeed = i;
            createPlants()
            
        });
    
    
        tooltipSeed(i)
      
        }

          
    
          if (i !== "none" && did(i+"plants") && plants[i].count>0){
            did(i+"plants").style.display = "flex";
            did(i+"seedCount").innerHTML = plants[i].count;
          } else { did(i+"plants").style.display = "none"}

          if (i !== "none" && did(i+"plants") && selectedSeed === i) { did(i+"seedSack").src = "img/src/garden/sackSelect.png"} else { did(i+"seedSack").src = "img/src/garden/sack.png"}


          if (i==="g2") did(i+"seedCount").innerHTML = "∞";
          
      
      }
    




  }

 

 

  function tooltipGarden(i) {
    if (did(i+"plot")) {

      let plantTooltipCd;


    did(i+"plot").addEventListener('mouseenter', function () { //on mouseenter

      plantTooltipCd = setTimeout(function () {

  
    if (plot[i].slot !== "none" && plantTooltipCd) {
    did('tooltip').style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipFlavor").textContent = "";
    did("tooltipArrow").style.display = "none";

    let agePercentage = ( plot[i].age / matureTime * 100 ) 

    let waterPercentage = ( plot[i].water / 100 * 100 ) 

    let ageBarColor = "#7EBE70"
    if (plot[i].mature) ageBarColor = "#997151"

    let matureText = "gray";
    if (plot[i].mature) matureText = "lime"

    did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:'+plants[plot[i].slot].color+'; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">'+plants[plot[i].slot].name+'</div>'+
    bestiaryTag(colorTag("🌱 When Mature 🌱", "#997151"), "transparent") +
    '<div style="text-align: center; background:transparent; margin-top:0.2vw; color:'+matureText+'">'+plants[plot[i].slot].description+'</div>' +
    '<div class="separador"></div><br>' +
    '<div style=" text-align: right;background: linear-gradient(90deg, '+ageBarColor+' '+agePercentage+'%, #251A17 '+agePercentage+'%); padding: 0 2%; border-radius: 0.4vh; height:1vh; overflow:visible; position:relative; width: 90%; margin-left: 10%; border: 1px white outset; margin-top:-0.5vh""><span style="position: absolute; left:-10%; font-size:2vh; bottom:-100%;">🌿</span></div><br>' +
    '<div style=" text-align: right;background: linear-gradient(90deg, #6AB2C4 '+waterPercentage+'%, #251A17 '+waterPercentage+'%); padding: 0 2%; border-radius: 0.4vh; height:1vh; overflow:visible; position:relative; width: 90%; margin-left: 10%; border: 1px white outset; margin-top:-0.5vh; margin-bottom:-1vh"><span style="position: absolute; left:-10%; font-size:2vh; bottom:-100%;">💧</span></div><br>' +
    '<div style="text-align: center; background:transparent; margin-top:0.2vw; color:gray">Left Click to Water | Right Click to Harvest</div>'

  
   
  var movingDiv = did("tooltip");
  var referenceDiv = did(i + "plot");
  var referenceRect = referenceDiv.getBoundingClientRect();
  var newLeft = referenceRect.right + 30;
  var newTop = referenceRect.top - 60;
  
  movingDiv.style.left = newLeft + "px";
  movingDiv.style.top = newTop + "px";

}
}, 300);
        
  });
    did(i+"plot").addEventListener('mouseleave', function () {
    resetTooltip();
    clearTimeout(plantTooltipCd);
  
    });



    
  }
  }


 

  
  function tooltipSeed(i) {
    if (did(i+"plants")) {
    did(i+"plants").addEventListener('mouseenter', function () { //on mouseenter
  
   
    did('tooltip').style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipFlavor").textContent = "";
    did("tooltipArrow").style.display = "none";

    let lifespan = "Medium"
    //if (plants[i].growth === plantLifespanMedium) lifespan = "Medium"


    did("tooltipDescription").innerHTML = bestiaryTag(plants[i].name+" - Tier "+returnRoman(plants[i].tier), plants[i].color) + bestiaryTag(colorTag("🌱 When Mature 🌱", "#997151"), "transparent") +
    '<div style="text-align: center; background:transparent; margin-top:0.2vw; color:white;">'+plants[i].description+'</div>'  +
    '<div class="separador"></div>' + bestiaryTag(colorTag('⏱️ Lifespan: '+lifespan, "#9B4F65"), "transparent")
    /*
    nter;background:'+plants[i].color+'; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450">'+plants[i].name+'</div>'+
    '<div style=" text-align: center;background:#997151; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450; width: 50%; margin-top:1vh; margin-left:24%;">🌱 When Mature 🌱</div>' +
    '<div style="text-align: center; background:transparent; margin-top:0.2vw; color:white: display:flex">'+plants[i].description+'</div>' +
    '<div class="separador"></div>'+
    '<div style=" text-align: center;background:#9B4F65; padding: 0 2%; border-radius: 0.4vh; color:white; font-family: fredoka; font-weight: 450; width: 50%; margin-top:1vh; margin-left:24%;">⏱️ Lifespan: '+lifespan+'</div>'
  */
   
  var movingDiv = did("tooltip");
  var referenceDiv = did(i + "plants");
  var referenceRect = referenceDiv.getBoundingClientRect();
  var newLeft = referenceRect.right + 10;
  var newTop = referenceRect.top - 40;
  
  movingDiv.style.left = newLeft + "px";
  movingDiv.style.top = newTop + "px";


  
        
  });
    did(i+"plants").addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }
  }
  




  did("flowerPower").addEventListener("mouseenter", function () {


    let gardenReflectPowerDisplay = "";
    if (gardenReflectPower>0) gardenReflectPowerDisplay = '<br>+' + gardenReflectPower.toFixed(0) +"% Damage Reflect";

    let gardenNaturePowerDisplay = "";
    if (gardenNaturePower>0) gardenNaturePowerDisplay = '<br>'+colorTag("x"+(1+gardenNaturePower).toFixed(2),"#E57D08")+' Nature Damage';

    let gardenElementalPowerDisplay = "";
    if (gardenElementalPower>0) gardenElementalPowerDisplay = '<br>'+colorTag("x"+(1+gardenElementalPower).toFixed(2),"#E57D08")+' Elemental Damage';

    let gardenMightPowerDisplay = "";
    if (gardenMightPower>0) gardenMightPowerDisplay = '<br>'+colorTag("x"+(1+gardenMightPower).toFixed(2),"#E57D08")+' Might Damage';

    let gardenDeificPowerDisplay = "";
    if (gardenDeificPower>0) gardenDeificPowerDisplay = '<br>'+colorTag("x"+(1+gardenDeificPower).toFixed(2),"#E57D08")+' Deific Damage';

    let gardenOccultPowerDisplay = "";
    if (gardenOccultPower>0) gardenOccultPowerDisplay = '<br>'+colorTag("x"+(1+gardenOccultPower).toFixed(2),"#E57D08")+' Occult Damage';

    let gardenPatPowerDisplay = "";
    if (gardenPatPower>0) gardenPatPowerDisplay = '<br>'+colorTag("x"+(1+gardenPatPower).toFixed(2),"#E57D08")+' Pat Power';

    let gardenStrengthPowerDisplay = "";
    if (gardenStrengthPower>0) gardenStrengthPowerDisplay = '<br>'+colorTag("x"+(1+gardenStrengthPower).toFixed(2),"#E57D08")+' Strength';

    let gardenSpellpowerDisplay = "";
    if (gardenSpellpower>0) gardenSpellpowerDisplay = '<br>'+colorTag("x"+(1+gardenSpellpower).toFixed(2),"#E57D08")+' Spellpower';

    let gardenDropChancePowerDisplay = "";
    if (gardenDropChancePower>0) gardenDropChancePowerDisplay = '<br>'+colorTag("x"+(1+gardenDropChancePower).toFixed(2),"#E57D08")+' Drop Bonus';

    let gardenExpGainPowerDisplay = "";
    if (gardenExpGainPower>0) gardenExpGainPowerDisplay = '<br>'+colorTag("x"+(1+gardenExpGainPower).toFixed(2),"#E57D08")+" EXP Gain Bonus";

    let gardenHealthPowerDisplay = "";
    if (gardenHealthPower>0) gardenHealthPowerDisplay = '<br>'+colorTag("x"+(1+gardenHealthPower).toFixed(2),"#E57D08")+" Max Health";

    let gardenFlowerPowerDisplay = "";
    if (gardenFlowerPower>0) gardenFlowerPowerDisplay = '<br>+' + gardenFlowerPower.toFixed(2) +"% Flower Power";

    let gardenMutationPowerDisplay = "";
    if (gardenMutationPower>0) gardenMutationPowerDisplay = '<br>+' + gardenMutationPower.toFixed(0) +"% Mutation Chance";

    let gardenMagicRegenPowerDisplay = "";
    if (gardenMagicRegenPower>0) gardenMagicRegenPowerDisplay = '<br>+' + gardenMagicRegenPower.toFixed(2) +" Magic Regeneration";

    let gardenDragonGoldPowerDisplay = "";
    if (gardenDragonGoldPower>0) gardenDragonGoldPowerDisplay = '<br>Enemies Drop ' + beautify(gardenDragonGoldPower) +" Shells";


    did("tooltip").style.display = "flex";
    did("upperTooltip").style.display = "none";
    did("tooltipDescription").innerHTML = bestiaryTag("Flower Power","#AF6E9E")+'<FONT COLOR="#edd585">Current Garden Bonuses:'
    + gardenReflectPowerDisplay + gardenNaturePowerDisplay +gardenElementalPowerDisplay+gardenMightPowerDisplay+gardenDeificPowerDisplay+gardenOccultPowerDisplay+gardenPatPowerDisplay+
    gardenStrengthPowerDisplay+gardenSpellpowerDisplay+gardenDropChancePowerDisplay+gardenExpGainPowerDisplay+gardenHealthPowerDisplay+gardenFlowerPowerDisplay+
    gardenMutationPowerDisplay+gardenDragonGoldPowerDisplay+gardenMagicRegenPowerDisplay;
    did("tooltipFlavor").textContent = "";
    did("tooltipDescription").style.textAlign = "center";
    did("tooltipImage").style.display = "none";
    did("tooltipArrowUp").style.display = 'flex'
    did("tooltipArrow").style.display = 'none'
  
  const movingDiv = did("tooltip");
  const referenceDiv = did("flowerPower");
  const referenceRect = referenceDiv.getBoundingClientRect();
  const referenceRight = referenceRect.right;
  const referenceBottom = referenceRect.bottom + 10;
  const newLeft = referenceRight - movingDiv.offsetWidth;
  const newTop = referenceBottom;
  movingDiv.style.left = newLeft + 3 +"px";
  movingDiv.style.top = newTop + "px";
  });
  did("flowerPower").addEventListener("mouseleave", function () {
    resetTooltip();
  });





  settingsPanel ("gardenShopButton", "gardenShop");

  
function createGardenShop() {
  for (let gs in gardenShop) {
    if (!did(gs + "gardenShop")) {
      const div = document.createElement("div");
      div.id = gs + "gardenShop";


      div.innerHTML = '<div class=soldOut id="' + gs + 'itemTag">LOCKED</div><div class="itemSlot" id="' + gs + 'displayItem"><img id="' + gs + 'image" src="img/src/items/' + items[gardenShop[gs].item].img + '.jpg"></div>';
      did(gardenShop[gs].parent).appendChild(div);
      div.className = "shopItemCasingNoHover";

      did(gs + "displayItem").style.outline = returnQualityColor(items[gardenShop[gs].item].quality) +" solid 0.15rem";
      gardenShopButton(gs);
      tooltipGardenShop(gs);
    }

    if (gardenShop[gs].stock < 1) {
      did(gs + "itemTag").style.display = "flex";
      did(gs + "itemTag").innerHTML = "SOLD OUT";
    }

  }
}



function tooltipGardenShop(id) {
  if (did(id + "gardenShop")) {
    did(id + "gardenShop").addEventListener("mouseenter", function () {
      did("tooltip").style.display = "flex";
      did("tooltipName").textContent = items[gardenShop[id].item].name;
      did("tooltipPrice").innerHTML = "Stock: " + gardenShop[id].stock;
      did("tooltipRarity").textContent = items[gardenShop[id].item].quality;

      did("tooltipRarity").style.color = returnQualityColor(items[gardenShop[id].item].quality);
      did("tooltipName").style.color = returnQualityColor(items[gardenShop[id].item].quality);

      did("tooltipDescription").innerHTML = '<div style=" text-align: center;background:transparent"><FONT COLOR="white"> Price: <FONT COLOR="#ffbd54">' + beautify(gardenShop[id].price) + ' <img src="img/src/garden/gardenToken.jpg">Bloom Tokens<br></div><div class="separador"></div><FONT COLOR="white">' + items[gardenShop[id].item].description;
            
      did("tooltipFlavor").textContent = "";
      did("tooltipImage").src = "img/src/items/" + items[gardenShop[id].item].img + ".jpg";

      var movingDiv = did("tooltip");
      var referenceDiv = did(id + "gardenShop");
      var referenceRect = referenceDiv.getBoundingClientRect();
      var referenceLeft = referenceRect.left + 26;
      var referenceTop = referenceRect.top - 15;
      var newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
      var newTop = referenceTop - movingDiv.offsetHeight;
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop + "px";
    });
    did(id + "gardenShop").addEventListener("mouseleave", function () {
      resetTooltip();
    });
  }



  
}


function gardenShopButton(id) {
  if (did(id+ "gardenShop")) {
    did(id + "gardenShop").addEventListener("click", function () {
      if (gardenShop[id].stock && rpgPlayer.gardenTokens>=gardenShop[id].price && items[gardenShop[id].item].count!==items[gardenShop[id].item].max ) {
        playSound("audio/button3.mp3");
        rpgPlayer.gardenTokens-=gardenShop[id].price
        if ("effect" in gardenShop[id]){
          eval(gardenShop[id].effect);
          if (gardenShop[id].stock != "∞") gardenShop[id].stock--;}
        else {
        if (gardenShop[id].stock != "∞") gardenShop[id].stock--;
        items[gardenShop[id].item].count++;
      }
        did(id + "gardenShop").style.animation = "";
        void did(id + "gardenShop").offsetWidth;
        did(id + "gardenShop").style.animation = "useSkill 0.5s 1";
        createGardenShop();
        updateGardenUi();
        addItem();
      } else {
        playSound("audio/thud.mp3"); 
        
      }
    });
  }
}


settingsPanel ("gardenShipButton", "plantCatalogue");




function returnPlantPrice(id){

  let plantPrice = 0;
  if (plants[id].tier===1) return 3;
  if (plants[id].tier===2) return 6;
  if (plants[id].tier===3) return 10;
  if (plants[id].tier===4) return 16;


}


function createPlantCatalogue() {
  for (let i in plants) {


  if (!did(i+"plantCatalogue") && i!=="none") {

    
    const areadiv = document.createElement("div");
    areadiv.id = i + "plantCatalogue";
    did("plantCatalogueListing").appendChild(areadiv);

    plantCompletionProgressTotal++
    
    tooltipSeedCatalogue(i)

    if (plants[i].harvested>0){

      plantCompletionProgress++}


      areadiv.addEventListener('click', function(event) { 

        if (plants[i].harvested>0 && unlocks.seedShipping && i.slice(-1) !== 'a' && i !== "g2" && rpgPlayer.gardenTokens>=returnPlantPrice(i)){

          playSound("audio/button8.mp3");
          
         plants[i].count++
         rpgPlayer.gardenTokens-=returnPlantPrice(i)

         tooltipSeedCatalogue(i);
         createPlantCatalogue();
         updateGardenUi();
         createPlants();

         areadiv.style.animation = "";
        void areadiv.offsetWidth;
         areadiv.style.animation = "faintStrike 0.5s 1";
    
    
    
    
        }
        
    });







    

}

if (did(i+"plantCatalogue")){


if (plants[i].harvested>0){

  

  did(i+"plantCatalogue").innerHTML = '<img src="img/src/garden/'+i+'.png"></img><span>'+plants[i].name+" ("+plants[i].count+")"+'</span>';
  if (unlocks.seedShipping && i.slice(-1) !== 'a' && i !== "g2") did(i+"plantCatalogue").innerHTML = '<img src="img/src/garden/'+i+'.png"></img><span>'+plants[i].name+" ("+plants[i].count+")"+' 📦</span>';
} else{
  did(i+"plantCatalogue").innerHTML = '<span>?????</span>';
}



}










did("plantCatalogueProgress").innerHTML = Math.round(plantCompletionProgress/plantCompletionProgressTotal*100)+"%";
did("plantCatalogueProgressBar").style.width = plantCompletionProgress/plantCompletionProgressTotal*100+"%"

did("compendiumMastery").innerHTML = "+"+plantCompletionProgress*5+" Mastery";
did("compendiumProgress2").innerHTML = plantCompletionProgress+"/"+plantCompletionProgressTotal+" Plants Discovered";



  }

 

  /*

bestiaryPercentage = ( ( bestiaryPointEntry + bestiaryPointBronze + bestiaryPointGold ) - 3 / (totalBestiaryPoints - 3) * 100 ) 
did("bestiaryProgress").innerHTML = "<span>["+bestiaryPercentage.toFixed(1)+"%] Completion</span>";

did("bestiaryProgress").style.background = "linear-gradient(90deg, rgba(249,169,16,1) " + bestiaryPercentage + "%, black " + bestiaryPercentage + "%)";
*/
}






  
function tooltipSeedCatalogue(i) {
  if (did(i+"plantCatalogue")) {
  did(i+"plantCatalogue").addEventListener('mouseenter', function () { //on mouseenter
if (plants[i].harvested>0){
 
  did('tooltip').style.display = "flex";
  did("upperTooltip").style.display = "none";
  did("tooltipFlavor").textContent = "";
  did("tooltipArrow").style.display = "none";

  let lifespan = "Medium"
    //if (plants[i].growth === plantLifespanMedium) lifespan = "Medium"

  let buyInfo = "";
  if (unlocks.seedShipping && i.slice(-1) !== 'a' && i !== "g2") buyInfo = '<div class="separador"></div>' + bestiaryTag("Click to purchase" , "#57A157") +
  bestiaryTag('Price: '+returnPlantPrice(i)+'&nbsp;<img src="img/src/garden/gardenToken.jpg"> Bloom Tokens&nbsp;<FONT COLOR="gray">( '+rpgPlayer.gardenTokens+' )', "transparent");


  let catalogueDescription = ""
  if ("catalogue" in plants[i]) catalogueDescription = '<div class="separador"></div>' + bestiaryTag(eval(plants[i].catalogue), "transparent")
  if ("catalogue2" in plants[i]) catalogueDescription = '<div class="separador"></div>' + bestiaryTag(eval(plants[i].catalogue), "transparent") + bestiaryTag(eval(plants[i].catalogue2), "transparent")

  did("tooltipDescription").innerHTML = bestiaryTag(plants[i].name+" - Tier "+returnRoman(plants[i].tier), plants[i].color) + bestiaryTag(colorTag("🌱 When Mature 🌱", "#997151"), "transparent") +
  '<span style="display:flex; justify-content:center; align-items:center; flex-direction: column; background:transparent align-self:center; justify-content:center;">'+plants[i].description+'</span>' +
  '<div class="separador"></div>' + bestiaryTag(colorTag('⏱️ Lifespan: '+lifespan, "#9B4F65"), "transparent") + catalogueDescription + buyInfo
 
var movingDiv = did("tooltip");
var referenceDiv = did(i + "plantCatalogue");
var referenceRect = referenceDiv.getBoundingClientRect();
var newLeft = referenceRect.right + 10;
var newTop = referenceRect.top - 40;

movingDiv.style.left = newLeft + "px";
movingDiv.style.top = newTop + "px";


}


      
});
  did(i+"plantCatalogue").addEventListener('mouseleave', function () {
  resetTooltip();
  });
}
}




settingsPanel ("gardenFertiliserButton", "fertiliserMenu");

rpgPlayer.currentFertiliser = "none"



function createFertiliser() {
  for (let i in fertiliser) {
    if (!did(i + "fertiliser")) {
      const div = document.createElement("div");

      if (fertiliser[i].unlocked){
      div.id = i + "fertiliser";
      div.innerHTML = '<img src="img/src/garden/' + i + '.jpg">';
      did("fertiliserList").appendChild(div);
      div.className = "itemSlot";
      div.style.outline = "white solid 0.15rem";

      div.addEventListener('click', function() { 

        playSound("audio/button8.mp3");

        rpgPlayer.currentFertiliser = i

        did("currentFertiliser").src = "img/src/garden/"+i+".jpg";

        calculateGardenStats()

        closePanels()
        
    });


    did(i+"fertiliser").addEventListener('mouseenter', function () { //on mouseenter
       
        did('tooltip').style.display = "flex";
        did("upperTooltip").style.display = "none";
        did("tooltipFlavor").textContent = "";
        did("tooltipArrow").style.display = "none";

        let fertiliserStatus = ""
        if (rpgPlayer.currentFertiliser === i) fertiliserStatus = bestiaryTag(colorTag("Active", "#40A551"), "transparent")
      
        did("tooltipDescription").innerHTML = bestiaryTag(fertiliser[i].name, "#B67D48") + fertiliserStatus +  '<div class="separador"></div> ' + fertiliser[i].description;
       
      var movingDiv = did("tooltip");
      var referenceDiv = did(i + "fertiliser");
      const movingRect = movingDiv.getBoundingClientRect();
      const referenceRect = referenceDiv.getBoundingClientRect();
      const newLeft = referenceRect.left + (referenceRect.width / 2) - (movingRect.width / 2);
      const newTop = referenceRect.top - movingRect.height;
      movingDiv.style.left = newLeft + "px";
      movingDiv.style.top = newTop - 15 + "px";
      
      });
        did(i+"fertiliser").addEventListener('mouseleave', function () {
        resetTooltip();
        });













    }

    }



    if (rpgPlayer.currentFertiliser === i && did(i+"fertiliser")) did(i+"fertiliser").style.outlineColor = "lawngreen"; else if (did(i+"fertiliser")) did(i+"fertiliser").style.outlineColor = "white";


  }
}




function plantSanityCheck(){ for (i in plants){if (plants[i].planted<0)plants[i].planted=0} }














  
document.addEventListener('DOMContentLoaded', gardenInitialization);

function gardenInitialization(){
    createGardenPlots();
    createPlants();
    createGardenShop();
    //createPlantCatalogue(); before statsupdate

    nextGardenLevel = Math.floor(100 * Math.pow(2, rpgPlayer.gardenLevel-1))
    updateGardenUi();
    plantGrow();





    plantSanityCheck()

    if (rpgPlayer.gardenExp === null) rpgPlayer.gardenExp = 0;
    

    
}

