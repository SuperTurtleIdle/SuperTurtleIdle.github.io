
function changeBookmark(button, job){
   did(button).addEventListener('click', function () { 
       playSound("audio/page.mp3")
       rpgPlayer.currentJob = job;
       jobBookUi();
       createRecipe();
    }); 

}

changeBookmark('cookingBookmark', 'cooking')
changeBookmark('blacksmithBookmark','blacksmith')
changeBookmark('alchemyBookmark','alchemy')
changeBookmark('engineeringBookmark','engineering')

function jobBookUi() {
    
    did('blacksmithRecipes').style.display = 'none';
    did('cookingRecipes').style.display = 'none';
    did('alchemyRecipes').style.display = 'none';
    did('engineeringRecipes').style.display = 'none';

    did('blacksmithBookmark').className  = 'craftBookmark';    
    did('cookingBookmark').className  = 'craftBookmark';
    did('alchemyBookmark').className  = 'craftBookmark';
    did('engineeringBookmark').className  = 'craftBookmark';
        
    did(rpgPlayer.currentJob+"Recipes").style.display = 'flex';    
    did(rpgPlayer.currentJob+"Bookmark").className  = 'craftBookmarkCurrent';
    did('professionTitleIcon').src = "img/src/icons/"+rpgPlayer.currentJob+".png";
    
    jobExp();
    
    
}jobBookUi();


function createRecipeListing(){
    for (let jp in jobPanels) {
    if (!did(jobPanels[jp].id+"panel")) {  
        
    const recipetitlediv = document.createElement('div');
    recipetitlediv.id = jobPanels[jp].id+"paneltitle";
    //recipetitlediv.innerHTML = '<img id="'+jobPanels[jp].id+'recipeArrow" src="img/sys/contraer.png"> '+ jobPanels[jp].name;
    recipetitlediv.innerHTML = '<div class="contentHeaderLeft" style="font-size: 1.4rem;"> <img src="img/src/items/'+jobPanels[jp].icon+'.jpg">'+jobPanels[jp].name+'</div> <div class="contentHeaderCenter"></div><div class="contentHeaderRight"><img id="'+jobPanels[jp].id+'recipeArrow" src="img/sys/contraer.png"></div>';
    recipetitlediv.className = 'contentHeaderFused craftBookTitle';     

    did(jobPanels[jp].category).appendChild(recipetitlediv);
   
    const recipediv = document.createElement('div');
    recipediv.id = jobPanels[jp].id+"panel";
    recipediv.className = 'craftCategory';
    did(jobPanels[jp].category).appendChild(recipediv);
        
    did(jobPanels[jp].id+'recipeArrow').addEventListener('click', function () { 
        playSound("audio/button1.mp3")

    if (!jobPanels[jp].hidden) { jobPanels[jp].hidden = true }
    else jobPanels[jp].hidden = false;
    recipeListingContract();
        
    });     
    }


    if (!jobPanels[jp].unlocked) {did(jp+"panel").style.visibility = "hidden"; did(jp+"paneltitle").style.visibility = "hidden";}
    else {did(jp+"panel").style.visibility = "visible"; did(jp+"paneltitle").style.visibility = "visible";}


    }

}createRecipeListing()

function recipeListingContract() {
   for (let jp in jobPanels) {
    if (did(jobPanels[jp].id+"panel")) {   
    if (jobPanels[jp].hidden === true){
    did(jobPanels[jp].id+'panel').style.maxHeight = "0";
    did(jobPanels[jp].id+'panel').style.padding = "0rem 0"
    did(jobPanels[jp].id+'recipeArrow').style.transform = "rotateX(180deg)";   
    }
    else {
     did(jobPanels[jp].id+'panel').style.maxHeight = "100%";
     did(jobPanels[jp].id+'panel').style.padding = "0.5rem 0"
     did(jobPanels[jp].id+'recipeArrow').style.transform = "rotateX(0deg)";   
    }    
    }}}


function createRecipe() {
   for (let r in recipes) {
   if (!did(r+"recipe")) {
    
    const recipediv = document.createElement('div');
    recipediv.id = r+"recipe";
    recipediv.innerHTML = '<span id="'+r+'recipeLevel">'+recipes[r].level+'</span><img id="'+r+'recipeImage" src="img/src/items/'+recipes[r].item+'.jpg"><strong id="'+r+'recipeName">?????</strong><span style="margin-left: auto; background: #364D68; color: #7ACCDE; animation: gelatine 0.3s 1;" id="'+r+'craftQueue"><img id="'+r+'craftIcon" src="img/src/icons/craftOne.png">200</span>';
    did(r.substring(0, 2) + "panel").appendChild(recipediv);
    recipediv.className = 'craftRecipe';
    recipeButton(r); 
    if (recipes[r].unlocked === false) recipediv.style.display = "none" 
   }
       
   if (did(r+"recipe")) {

    if (recipes[r].unlocked === true && did(r+"recipe").style.display === "none" )  {did(r+"recipe").style.display = "flex"}
       
     if(recipes[r].level <= (jobs[rpgPlayer.currentJob].level)) {did(r+'recipeName').innerHTML = items[recipes[r].item].name; did(r+"recipeName").style.color = "white"; did(r+"recipeImage").style.display = "flex"}
     else{ did(r+'recipeName').innerHTML = '?????'; did(r+"recipeName").style.color = "gray"; did(r+"recipeLevel").style.background = "gray"; did(r+"recipeImage").style.display = "none";}


           
     if (recipes[r].level >= (jobs[rpgPlayer.currentJob].level+5)) {did(r+"recipe").style.display = "none"} else did(r+"recipe").style.display = "flex"; 

     if (recipes[r].unlocked === false) {did(r+"recipe").style.display = "none";} 


     if (recipes[r].level <= (jobs[rpgPlayer.currentJob].level)) did(r+"recipeLevel").style.background = "#FF993B"; 
       
     if (recipes[r].level <= (jobs[rpgPlayer.currentJob].level - 5)) did(r+"recipeLevel").style.background = "#6BAD51";  
       
     if(recipes[r].level <= (jobs[rpgPlayer.currentJob].level - 10)) {did(r+"recipeLevel").style.background = "gray"; did(r+"recipeName").style.color = "gray";}     

     if(recipes[r].crafting==='once' || recipes[r].crafting==='all') {did(r+'craftQueue').style.display = "flex";} else did(r+'craftQueue').style.display = "none";
       
     if(recipes[r].crafting==='once') did (r+'craftQueue').innerHTML = '<img id="'+r+'craftIcon" src="img/src/icons/craftOne.png">'+recipes[r].craftingQueue
     if(recipes[r].crafting==='all') did (r+'craftQueue').innerHTML = '<img id="'+r+'craftIcon" src="img/src/icons/craftOne.png"> ∞'

   }
       
   }
    

}

var currentRecipe = 'SN1'
function recipeButton(r) {
   if (did(r + 'recipe')) {
    did(r + 'recipe').addEventListener('click', function() {
        updateRecipeButton(r);
    });
        
   }
    
}

function updateRecipeButton(r) {
    if(recipes[r].level <= (jobs[rpgPlayer.currentJob].level)){ //clickable if the player has enough level
        playSound("audio/button4.mp3")
       currentRecipe = r
        did("recipePanel").style.display = "flex";
       //cleans the itemboxes
       did('recipeOutcome').innerHTML = "";
       did('recipeReagents').innerHTML = "";
       //highlight of the recipe
       var elements = document.querySelectorAll('.craftRecipeActive');
       elements.forEach(function(element) {
       element.classList.replace('craftRecipeActive', 'craftRecipe'); })
       did(r + 'recipe').className  = 'craftRecipeActive';
       //set the item uptop
       did('recipeImage').style.border = returnQualityColor(items[recipes[r].item].quality) +' solid 0.15rem';
       did('recipeTitle').style.color=returnQualityColor(items[recipes[r].item].quality);
       
       craftingBarUi();
       
       did('recipeImage').src = "img/src/items/"+recipes[r].item+".jpg";
       //display quantity if its not an unique item
       did('recipeTitle').innerHTML = items[recipes[r].item].name;

       var minutes = Math.floor(recipes[r].timer / 60); 
       var seconds = recipes[r].timer % 60;
       did('recipeTimer').innerHTML = "⏱️ "+ minutes+"m "+seconds+"s";


       let description1 = "";
       if (r.startsWith("S")) description1 = "Blacksmith"
       if (r.startsWith("A")) description1 = "Alchemy"
       if (r.startsWith("C")) description1 = "Cooking"
       if (r.startsWith("E")) description1 = "Engineering"

       did('recipeDescription').innerHTML = 'Requires '+description1+' ['+recipes[r].level+']<br>Creates a '+items[recipes[r].item].name+'';
       if ("description" in recipes[r]) did('recipeDescription').innerHTML = 'Requires '+description1+' ['+recipes[r].level+']<br>'+recipes[r].description+'';

       
function addReagent(reagent, amount){       
       
const itemdiv = document.createElement('div');
itemdiv.id = reagent + 'reagent';  
itemdiv.innerHTML = '<img src = "img/src/items/'+items[reagent].id+'.jpg"><div class="itemCount" id="'+items[reagent].id + "reagentCount"+'">'+beautify(amount)+'</div>';
itemdiv.className = 'craftBookRecipeReagent';
did('recipeReagents').appendChild(itemdiv);
if (items[reagent].count<amount) {itemdiv.style.outline = "#f54842 solid 0.15rem"}
else {
itemdiv.style.outline = returnQualityColor(items[reagent].quality) +' solid 0.15rem';}
tooltipReagent(reagent)    
if (items[reagent].upgradeable && did(items[reagent].id + "reagentCount")) did(items[reagent].id + "reagentCount").innerHTML = returnRoman(amount.toString())

}       


       
addReagent(recipes[r].reagent1, recipes[r].amount1);       
if ('reagent2' in recipes[r]) addReagent(recipes[r].reagent2, recipes[r].amount2);
if ('reagent3' in recipes[r]) addReagent(recipes[r].reagent3, recipes[r].amount3); 
if ('reagent4' in recipes[r]) addReagent(recipes[r].reagent4, recipes[r].amount4);          
       
function addOutcome(outcome){       
       
const itemdiv = document.createElement('div');
itemdiv.id = outcome + 'outcome';  

itemdiv.innerHTML = '<img src = "img/src/items/'+items[outcome].id+'.jpg">';
if ("itemCount" in recipes[r]) itemdiv.innerHTML = '<img src = "img/src/items/'+items[outcome].id+'.jpg"><div class="itemCount">'+recipes[r].itemCount+'</div>';
itemdiv.className = 'craftBookRecipeReagent'; 
did('recipeOutcome').appendChild(itemdiv);
itemdiv.style.outline = returnQualityColor(items[outcome].quality) +' solid 0.15rem';
tooltipOutcome(outcome)   


}       
       
addOutcome(recipes[r].item); 
       
  }     
   }

did('craftButtonOne').addEventListener('click', function() { craftButton('once'); });
did('craftButtonAll').addEventListener('click', function() { craftButton('all'); });

let itemQueueValue = 1;

function craftButton(count){

    if (craftingQueue.value.length!==0) {itemQueueValue = craftingQueue.value} else itemQueueValue = 1;

    if (isNaN(craftingQueue.value) || craftingQueue.value < 1 || craftingQueue.value > 999) {
        itemQueueValue = 1;
    }

    if (count==="all") itemQueueValue = 1;
    
     let canCraft = true; //codigo marciano que me ha dado gpt, checks for ingredient number
     if (items[recipes[currentRecipe].reagent1].count< recipes[currentRecipe].amount1*itemQueueValue) { canCraft = false;}
     if (recipes[currentRecipe].reagent2 && items[recipes[currentRecipe].reagent2].count < recipes[currentRecipe].amount2*itemQueueValue) {canCraft = false;}
     if (recipes[currentRecipe].reagent3 && items[recipes[currentRecipe].reagent3].count < recipes[currentRecipe].amount3*itemQueueValue) {canCraft = false;}
     if (recipes[currentRecipe].reagent4 && items[recipes[currentRecipe].reagent4].count < recipes[currentRecipe].amount4*itemQueueValue) {canCraft = false;}
    
     if (canCraft && (recipes[currentRecipe].crafting === "false" || (recipes[currentRecipe].craftingQueue>=0 && count !== "all")) && recipes[currentRecipe].crafting !== "all") {
         playSound("audio/craft.mp3")
         did('craftBookBarBox').style.animation = '';
         void did('craftBookBarBox').offsetWidth;
         did('craftBookBarBox').style.animation = 'levelUp 1s 1';
         recipes[currentRecipe].crafting = count;
         if (count === "once"){
            
            recipes[currentRecipe].craftingQueue += parseInt(itemQueueValue)
            
            did (currentRecipe+'craftQueue').innerHTML = recipes[currentRecipe].craftingQueue

         }

         recipes[currentRecipe].time = recipes[currentRecipe].timer;
         createRecipe();
         if (count === "once"){
         items[recipes[currentRecipe].reagent1].count -= recipes[currentRecipe].amount1*itemQueueValue; //deducts on the initial press
         if ('reagent2' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent2].count -= recipes[currentRecipe].amount2*itemQueueValue;
         if ('reagent3' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent3].count -= recipes[currentRecipe].amount3*itemQueueValue;
         if ('reagent4' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent4].count -= recipes[currentRecipe].amount4*itemQueueValue;
         addItem()
         updateRecipeButton(currentRecipe)
        }

        if (count === "all"){
            items[recipes[currentRecipe].reagent1].count -= recipes[currentRecipe].amount1; //deducts on the initial press
            if ('reagent2' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent2].count -= recipes[currentRecipe].amount2;
            if ('reagent3' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent3].count -= recipes[currentRecipe].amount3;
            if ('reagent4' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent4].count -= recipes[currentRecipe].amount4;
            addItem()
            updateRecipeButton(currentRecipe)
        }




     }

     if (!canCraft && !did('resourcePopUp')) {createPopup('&#10060; Not Enough Resources', '#913c3c', 'resourcePopUp'); playSound("audio/close.mp3")}
 }

 did('craftButtonCancel').addEventListener('click', cancelCrafting);
 function cancelCrafting() {

    if (recipes[currentRecipe].crafting !== "false") {
        recipes[currentRecipe].crafting = "false";
        playSound("audio/craft.mp3")
         did('craftBookBarBox').style.animation = '';
         void did('craftBookBarBox').offsetWidth;
         did('craftBookBarBox').style.animation = 'levelUp 1s 1';

         did (currentRecipe+'craftQueue').innerHTML = "";
         
         recipes[currentRecipe].time = recipes[currentRecipe].timer;
         createRecipe();
         craftingBarUi()
         items[recipes[currentRecipe].reagent1].count += recipes[currentRecipe].amount1*Math.max(recipes[currentRecipe].craftingQueue, 1); //returns materials
         if ('reagent2' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent2].count += recipes[currentRecipe].amount2*Math.max(recipes[currentRecipe].craftingQueue, 1); //aqui menos uno quizas
         if ('reagent3' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent3].count += recipes[currentRecipe].amount3*Math.max(recipes[currentRecipe].craftingQueue, 1);
         if ('reagent4' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent4].count += recipes[currentRecipe].amount4*Math.max(recipes[currentRecipe].craftingQueue, 1);
         addItem()

         recipes[currentRecipe].craftingQueue = 0;

    }


 }


 function createPopup(inner, color, id) {
    const popupdiv = document.createElement('div');
    popupdiv.innerHTML = inner
    popupdiv.className = 'popUp';
    popupdiv.id = id;
    popupdiv.style.background = color;
    if (color === 'page') {popupdiv.className = 'popUpPage'; popupdiv.style.background = '#966a30';}
    if (color === 'save') {popupdiv.style.filter = 'opacity(0.8)';}
    did("popUpList").appendChild(popupdiv);
    setTimeout(function () { popupdiv.remove() }, 4500);
}


stats.craftedItems = 0;

/*var craftingCollectibles = { 
    I264A:{P:collectibleChance2,A:1, R:"medium"}, 
    I264B:{P:collectibleChance2,A:1, R:"medium"},
  }*/

var craftingCollectibles = { 

    I455:{P:3000, A:1}, 
    I462:{P:3000, A:1}, 

    I458:{P:5000, A:1},
    I460:{P:5000, A:1}, 

    I456:{P:7000, A:1},
    I461:{P:7000, A:1}, 

    I463:{P:10000, A:1}, 

    I459:{P:15000, A:1}, 
    I457:{P:15000, A:1}, 
}


setInterval(craftingProgress,1000);
function craftingProgress(){
    for (let r in recipes) {
    if (recipes[r].crafting !== 'false'){
    recipes[r].time--
        
    if (currentRecipe === r) craftingBarUi()
        
    if (recipes[r].time < 0){ //stops at -1 technically so the progress bar finishes

    
    //gives exp if not gray
    let profession = "blacksmith"
    if (r.startsWith("A")) profession = "alchemy"
    if (r.startsWith("E")) profession = "engineering"

    if(recipes[r].level > (jobs[profession].level - 10)) {

    if (r.startsWith("S")) jobs.blacksmith.exp += recipes[r].exp;
    if (r.startsWith("C")) jobs.cooking.exp += recipes[r].exp;
    if (r.startsWith("A")) jobs.alchemy.exp += recipes[r].exp;
    if (r.startsWith("E")) jobs.engineering.exp += recipes[r].exp;

   



    jobExp();
    }
    
    if (items[recipes[r].item].max===1 && items[recipes[r].item].count>0) { rpgPlayer.coins+=eval(items[recipes[r].item].sell)*0.35; stats.totalCoins +=eval(items[recipes[r].item].sell)*0.35; }
    items[recipes[r].item].count += 1;
    rollTable(craftingCollectibles, 1)
    if ("itemCount" in recipes[r]) items[recipes[r].item].count += recipes[r].itemCount-1
    stats.craftedItems++;
    addItem()

    

    if (recipes[r].crafting === 'once' && recipes[r].craftingQueue === 1){


    recipes[r].crafting = 'false';
    recipes[r].time = recipes[r].timer;
    createRecipe();
    did (r+'craftQueue').innerHTML = "";
    recipes[r].craftingQueue = 0;

    

    } else if (recipes[r].crafting === 'once' && recipes[r].craftingQueue > 1) {

        recipes[r].craftingQueue--
        did (r+'craftQueue').innerHTML = recipes[r].craftingQueue;
        recipes[r].time = recipes[r].timer;
        createRecipe();

    }

    if (recipes[r].crafting === 'all'){

    let canCraft = true; //Checks if player still has materials 
    if (items[recipes[r].reagent1].count < recipes[r].amount1) { canCraft = false;}
    if (recipes[r].reagent2 && items[recipes[r].reagent2].count < recipes[r].amount2) { canCraft = false;}
    if (recipes[r].reagent3 && items[recipes[r].reagent3].count < recipes[r].amount3) { canCraft = false; }
    if (recipes[r].reagent4 && items[recipes[r].reagent4].count < recipes[r].amount4) { canCraft = false; }
    if (canCraft) {
    items[recipes[r].reagent1].count -= recipes[r].amount1; //deducts materials
    if ('reagent2' in recipes[r]) items[recipes[r].reagent2].count -= recipes[r].amount2;
    if ('reagent3' in recipes[r]) items[recipes[r].reagent3].count -= recipes[r].amount3;
    if ('reagent4' in recipes[r]) items[recipes[r].reagent4].count -= recipes[r].amount4;
    recipes[r].time = recipes[r].timer;
    } else {
        recipes[r].crafting = 'false';
        recipes[r].time = recipes[r].timer;
        createRecipe();
        }

    }

    
        
    

    if (currentRecipe === r) {craftingBarUi(); //only update crafting bar if it matches the selected recipe
    playSound("audio/throw.mp3")
    did('craftBookBarBox').style.animation = '';
    void did('craftBookBarBox').offsetWidth;
    did('craftBookBarBox').style.animation = 'levelUp 1s 1';}
        
        
    }}}}


    function jobExp(){
        for (let i in jobs) {
        if (jobs[i].exp >= jobs[i].maxExp){ //level up
        jobs[i].exp -= jobs[i].maxExp;    
        jobs[i].maxExp = Math.floor(30 * Math.pow(1.2, jobs[i].level));    
        jobs[i].level += 1; 
        createRecipe()

        if (rpgPlayer.currentJob === i){ //the level up animation will only play on current job    
        did('craftBookHeaderInfo').style.animation = '';
        void did('craftBookHeaderInfo').offsetWidth;
        did('craftBookHeaderInfo').style.animation = 'flashNoScale 1s 1';
        playSound("audio/levelUp.mp3")

    }
        }}
        
        let percentageEXP = (jobs[rpgPlayer.currentJob].exp/jobs[rpgPlayer.currentJob].maxExp)*100;
        did('professionSkillBar').style.width = percentageEXP+'%';
        did('professionTitle').innerHTML = jobs[rpgPlayer.currentJob].title.toUpperCase();
        did('professionLevel').innerHTML = "LVL "+jobs[rpgPlayer.currentJob].level;
        did('professionSkillExp').innerHTML = jobs[rpgPlayer.currentJob].exp+" / "+jobs[rpgPlayer.currentJob].maxExp +" EXP"
        
    }
    
    
    
    function craftingBarUi(){
        if (recipes[currentRecipe].time<recipes[currentRecipe].timer) {did('craftBar').style.transition = "1s all linear"} //flushea la animacion si acaba para que no vuelva
        else if (recipes[currentRecipe].time>0) {did('craftBar').style.transition = "none"; did('craftBar').style.width = "0%";}
        let percentageEXP =  100 - ((recipes[currentRecipe].time / recipes[currentRecipe].timer) * 100);
        did('craftBar').style.width = percentageEXP+"%";
    } 



//----------------------==========================-----------------------
//----------------------==========TOOLTIPS========-----------------------
//----------------------==========================-----------------------
//#region Tooltips
function tooltipReagent(reagent) {
    if (did(reagent + 'reagent')) {
    did(reagent + 'reagent').addEventListener('mouseenter', function () { 
    did('tooltip').style.display = "flex";
    did("tooltipName").textContent = items[reagent].name;

    did("tooltipPrice").innerHTML = "You Have: "+ beautify(items[reagent].count);

    did("tooltipRarity").textContent = items[reagent].quality;
        
    did("tooltipRarity").style.color = returnQualityColor(items[reagent].quality);
    did("tooltipName").style.color = returnQualityColor(items[reagent].quality);
          
    did("tooltipDescription").innerHTML = items[reagent].description + '<br><div class="separador"></div><div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">'+beautify(eval(items[reagent].sell)*multiplicativeSellValue)+coinIcon+'Shells<br></div>';
    if (items[reagent].upgradeable || items[reagent].dynamic) did("tooltipDescription").innerHTML = eval(items[reagent].description) + '<br><div class="separador"></div><div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">'+beautify(eval(items[reagent].sell))*multiplicativeSellValue+coinIcon+'Shells<br></div>';
    did("tooltipFlavor").textContent = items[reagent].flavor;
    did('tooltipImage').src = "img/src/items/"+items[reagent].id+".jpg";             
    var movingDiv = did('tooltip');
    var referenceDiv = did(reagent + 'reagent');
    var referenceRect = referenceDiv.getBoundingClientRect();    
    var referenceLeft = referenceRect.left + 5;
    var referenceTop = referenceRect.top - 15;
    var newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    var newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';      
       
  });
    did(reagent + 'reagent').addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }
}

function tooltipOutcome(outcome) {
    if (did(outcome + 'outcome')) {
    did(outcome + 'outcome').addEventListener('mouseenter', function () { 
    did('tooltip').style.display = "flex";

    let itemLevel = ""

    let bobi = items[outcome].count+1



    did("tooltipName").innerHTML = items[outcome].name;

    did("tooltipPrice").innerHTML = "You Have: "+ items[outcome].count;
    if (items[outcome].upgradeable) did("tooltipPrice").innerHTML = "";

    did("tooltipRarity").textContent = items[outcome].quality;

    did("tooltipRarity").style.color = returnQualityColor(items[outcome].quality);
    did("tooltipName").style.color = returnQualityColor(items[outcome].quality);

    var itemSkills = ""

    if ("skills" in items[outcome]) { 
      itemSkills = "<br>"+eval(items[outcome].skills)
    }

    let priceText = '<FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">'+beautify(eval(items[outcome].sell)*multiplicativeSellValue)+coinIcon+'Shells'
    if (items[outcome].max===1) priceText = '<FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">'+beautify(eval(items[outcome].sell)*multiplicativeSellValue)+coinIcon+'Shells <FONT COLOR="pink">[ Autosell: '+beautify(eval(items[outcome].sell)*0.35)+' ]'

    did("tooltipDescription").innerHTML = items[outcome].description +itemSkills+ '<br><div class="separador"></div><div style=" text-align: center;background:transparent"><FONT COLOR="white">'+priceText+'<br></div>';
    if (items[outcome].upgradeable || items[outcome].dynamic) did("tooltipDescription").innerHTML = eval(items[outcome].description) +itemSkills+ '<br><div class="separador"></div><div style=" text-align: center;background:transparent">'+priceText+'<br></div>';
    
    did("tooltipFlavor").textContent = items[outcome].flavor;
    did('tooltipImage').src = "img/src/items/"+items[outcome].id+".jpg";             
    var movingDiv = did('tooltip');
    var referenceDiv = did(outcome + 'outcome');
    var referenceRect = referenceDiv.getBoundingClientRect();    
    var referenceLeft = referenceRect.left + 5;
    var referenceTop = referenceRect.top - 15;
    var newLeft = referenceLeft + referenceRect.width - movingDiv.offsetWidth;
    var newTop = referenceTop - movingDiv.offsetHeight;
    movingDiv.style.left = newLeft + 'px';
    movingDiv.style.top = newTop + 'px';      
       
  });
    did(outcome + 'outcome').addEventListener('mouseleave', function () {
    resetTooltip();
    });
  }
}
//#endregion
//----------------------==========================-----------------------
//----------------------======INITIALISATION======-----------------------
//----------------------==========================-----------------------
//#region Initilisation
document.addEventListener('DOMContentLoaded', jobInitialization);

function jobInitialization(){
    jobBookUi();
    recipeListingContract();
    jobExp();
    createRecipe();
    createRecipeListing();
}
//#endregion







