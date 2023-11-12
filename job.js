
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

    did('blacksmithBookmark').className  = 'bookmark';    
    did('cookingBookmark').className  = 'bookmark';
    did('alchemyBookmark').className  = 'bookmark';
    did('engineeringBookmark').className  = 'bookmark';
        
    did(rpgPlayer.currentJob+"Recipes").style.display = 'flex';    
    did(rpgPlayer.currentJob+"Bookmark").className  = 'bookmarkCurrent';
    did('professionTitleIcon').style.backgroundImage = "url(img/src/icons/"+rpgPlayer.currentJob+"Frame.png)";
    
    jobExp();
    
    
}jobBookUi();


function createRecipeListing(){
    for (let jp in jobPanels) {
    if (!did(jobPanels[jp].id+"panel")) {  
        
    const recipetitlediv = document.createElement('div');
    recipetitlediv.id = jobPanels[jp].id+"paneltitle";
    recipetitlediv.innerHTML = '<img id="'+jobPanels[jp].id+'recipeArrow" src="img/sys/contraer.png"> '+ jobPanels[jp].name;
    recipetitlediv.className = 'recipePanelTitle';      
    did(jobPanels[jp].category).appendChild(recipetitlediv);
   
    const recipediv = document.createElement('div');
    recipediv.id = jobPanels[jp].id+"panel";
    recipediv.className = 'professionRecipePanel';
    did(jobPanels[jp].category).appendChild(recipediv);
        
    did(jobPanels[jp].id+'recipeArrow').addEventListener('click', function () { 
        
    if (!jobPanels[jp].hidden) { jobPanels[jp].hidden = true }
    else jobPanels[jp].hidden = false;
    recipeListingContract();
        
    });     
    }
    }

}createRecipeListing()

function recipeListingContract() {
   for (let jp in jobPanels) {
    if (did(jobPanels[jp].id+"panel")) {   
    if (jobPanels[jp].hidden === true){
    playSound("audio/button1.mp3")
    did(jobPanels[jp].id+'panel').style.display = "none"; 
    did(jobPanels[jp].id+'recipeArrow').style.transform = "rotateX(180deg)";   
    }
    else {
     did(jobPanels[jp].id+'panel').style.display = "block";   did(jobPanels[jp].id+'recipeArrow').style.transform = "rotateX(0deg)";   
    }    
    }}}


setInterval(function() { if (stats.currentCategory === "jobContainer") { createRecipe(); } }, 1000);
function createRecipe() {
   for (let r in recipes) {
   if (!did(recipes[r].id+"recipe")) {
    
    const recipediv = document.createElement('div');
    recipediv.id = recipes[r].id+"recipe";
    recipediv.innerHTML = '['+recipes[r].level+'] <span id="'+recipes[r].id+'recipeName">????? </span> <img id="'+recipes[r].id+'craftIconOne" src="img/src/icons/craftOne.png"> <img id="'+recipes[r].id+'craftIconAll" src="img/src/icons/craftAll.png">';
    did(recipes[r].category).appendChild(recipediv);
    recipediv.className = 'recipe';
    recipeButton(recipes[r]); 
    if (recipes[r].unlocked === false) recipediv.style.display = "none" 
   }
       
   if (did(recipes[r].id+"recipe")) {

    if (recipes[r].unlocked === true && did(r+"recipe").style.display === "none" )  {did(r+"recipe").style.display = "flex"}

    if (recipes[r].unlocked === false) {did(r+"recipe").style.display = "none"} 
       
     if(recipes[r].level <= (jobs[rpgPlayer.currentJob].level)) {did(recipes[r].id+'recipeName').innerHTML = items[recipes[r].item].name}
     else{ did(recipes[r].id+'recipeName').innerHTML = '?????'; did(recipes[r].id+"recipe").style.color = "gray";}
           
     
     if (recipes[r].level <= (jobs[rpgPlayer.currentJob].level)) did(recipes[r].id+"recipe").style.color = "#dec42f"; 
       
     if (recipes[r].level <= (jobs[rpgPlayer.currentJob].level - 5)) did(recipes[r].id+"recipe").style.color = "#3e753e";  
       
     if(recipes[r].level <= (jobs[rpgPlayer.currentJob].level - 10)) did(recipes[r].id+"recipe").style.color = "gray";
     
     if(recipes[r].crafting==='once') {did(recipes[r].id+'craftIconOne').style.display = "inline"} else did(recipes[r].id+'craftIconOne').style.display = "none";
     if(recipes[r].crafting==='all') {did(recipes[r].id+'craftIconAll').style.display = "inline"} else did(recipes[r].id+'craftIconAll').style.display = "none";
       
   }
       
   }
    

};createRecipe();

var currentRecipe = 'SN1'
function recipeButton(recipe) {
   if (did(recipe.id + 'recipe')) {
       did(recipe.id + 'recipe').addEventListener('click', function () { 
        if(recipe.level <= (jobs[rpgPlayer.currentJob].level)){ //clickable if the player has enough level
            playSound("audio/button4.mp3")
           currentRecipe = recipe.id
            did("recipePanel").style.display = "flex";
           //cleans the itemboxes
           did('recipeOutcome').innerHTML = "";
           did('recipeReagents').innerHTML = "";
           //highlight of the recipe
           var elements = document.querySelectorAll('.recipeSelect');
           elements.forEach(function(element) {
           element.classList.replace('recipeSelect', 'recipe'); })
           did(recipe.id + 'recipe').className  = 'recipeSelect';
           //set the item uptop
           if (items[recipe.item].quality === "Common") {did('recipeImage').style.border = 'white solid 1px'; did('recipeTitle').style.color="white"}
            if (items[recipe.item].quality === "Uncommon") {did('recipeImage').style.border = '#1eff00 solid 1px';did('recipeTitle').style.color="1eff00"}
            if (items[recipe.item].quality === "Rare") {did('recipeImage').style.border = '#0070dd solid 1px';did('recipeTitle').style.color="#0070dd"} 
            if (items[recipe.item].quality === "Epic") {did('recipeImage').style.border = '#a335ee solid 1px';did('recipeTitle').style.color="#a335ee" }
            if (items[recipe.item].quality === "Legendary") {did('recipeImage').style.border = '#ff8000 solid 1px';did('recipeTitle').style.color="#ff8000" }
            if (items[recipe.item].quality === "Relic") {did('recipeImage').style.border = '#e6cc80 solid 1px';did('recipeTitle').style.color="#e6cc80"}
            if (items[recipe.item].quality === "Quest") {did('recipeImage').style.border = 'Yellow solid 1px';did('recipeTitle').style.color="Yellow"}
           
           craftingBarUi();
           
           did('recipeImage').src = "img/src/items/"+recipe.item+".png";
           //display quantity if its not an unique item
           if (items[recipe.item].max === 1) did('recipeTitle').innerHTML = items[recipe.item].name;
           else did('recipeTitle').innerHTML = items[recipe.item].name+" [x"+items[recipe.item].count+"]";

           var minutes = Math.floor(recipe.timer / 60); 
           var seconds = recipe.timer % 60;
           did('recipeTimer').innerHTML = minutes+"m "+seconds+"s";
           did('recipeDescription').innerHTML = recipe.description;
           
    function addReagent(reagent, amount){       
           
    const itemdiv = document.createElement('div');
    itemdiv.id = reagent + 'reagent';  
    itemdiv.innerHTML = '<img src = "img/src/items/'+items[reagent].id+'.png"><div class="itemCount">'+amount+'</div>';
    itemdiv.className = 'itemSlot'; 
    did('recipeReagents').appendChild(itemdiv);
    if (items[reagent].quality === "Common") itemdiv.style.border = 'white solid 1px';
    if (items[reagent].quality === "Uncommon") itemdiv.style.border = '#1eff00 solid 1px';
    if (items[reagent].quality === "Rare") itemdiv.style.border = '#0070dd solid 1px'; 
    if (items[reagent].quality === "Epic") itemdiv.style.border = '#a335ee solid 1px'; 
    if (items[reagent].quality === "Legendary") itemdiv.style.border = '#ff8000 solid 1px'; 
    if (items[reagent].quality === "Relic") itemdiv.style.border = '#e6cc80 solid 1px';
    if (items[reagent].quality === "Quest") itemdiv.style.border = 'yellow solid 1px';
    tooltipReagent(reagent)    
    }       
           
    addReagent(recipe.reagent1, recipe.amount1);       
    if ('reagent2' in recipe) addReagent(recipe.reagent2, recipe.amount2);
    if ('reagent3' in recipe) addReagent(recipe.reagent3, recipe.amount3);         
           
    function addOutcome(outcome){       
           
    const itemdiv = document.createElement('div');
    itemdiv.id = outcome + 'outcome';  
    itemdiv.innerHTML = '<img src = "img/src/items/'+items[outcome].id+'.png">';
    itemdiv.className = 'itemSlot'; 
    did('recipeOutcome').appendChild(itemdiv);
    if (items[outcome].quality === "Common") itemdiv.style.border = 'white solid 1px';
    if (items[outcome].quality === "Uncommon") itemdiv.style.border = '#1eff00 solid 1px';
    if (items[outcome].quality === "Rare") itemdiv.style.border = '#0070dd solid 1px'; 
    if (items[outcome].quality === "Epic") itemdiv.style.border = '#a335ee solid 1px'; 
    if (items[outcome].quality === "Legendary") itemdiv.style.border = '#ff8000 solid 1px'; 
    if (items[outcome].quality === "Relic") itemdiv.style.border = '#e6cc80 solid 1px';
    if (items[outcome].quality === "Quest") itemdiv.style.border = 'yellow solid 1px';
    tooltipOutcome(outcome)    
    }       
           
    addOutcome(recipe.item); 
           
      }     
       });
   }
    
}

did('craftButtonOne').addEventListener('click', function() { craftButton('once'); });
did('craftButtonAll').addEventListener('click', function() { craftButton('all'); });

function craftButton(count){
    
     let canCraft = true; //codigo marciano que me ha dado gpt, checks for ingredient number
     if (items[recipes[currentRecipe].reagent1].count < recipes[currentRecipe].amount1) { canCraft = false;}
     if (recipes[currentRecipe].reagent2 && items[recipes[currentRecipe].reagent2].count < recipes[currentRecipe].amount2) {canCraft = false;}
     if (recipes[currentRecipe].reagent3 && items[recipes[currentRecipe].reagent3].count < recipes[currentRecipe].amount3) {canCraft = false;}
    
     if (canCraft) {
        playSound("audio/craft.mp3")
         did('craftBarWrap').style.animation = '';
         void did('craftBarWrap').offsetWidth;
         did('craftBarWrap').style.animation = 'levelUp 1s 1';
         recipes[currentRecipe].crafting = count;
         recipes[currentRecipe].time = recipes[currentRecipe].timer;
         createRecipe();
     }

     if (!canCraft && !did('resourcePopUp')) {createPopup('&#10060; Not Enough Resources', '#913c3c', 'resourcePopUp'); playSound("audio/close.mp3")}
 }


 function createPopup(inner, color, id) {
    const popupdiv = document.createElement('div');
    popupdiv.innerHTML = inner
    popupdiv.className = 'popUp';
    popupdiv.id = id;
    popupdiv.style.background = color;
    document.body.appendChild(popupdiv);
    setTimeout(function () { popupdiv.remove() }, 2000);
}

function reduceRecipeTime(time) {

    for (let i in recipes) {
        recipes[i].timer -= time;
        if (recipes[i].timer<1) recipes[i].timer = 1;
    }
}

unlocks.anvil1 = false;
function reduceRecipeTimeCheck(){
    if (unlocks.anvil1) reduceRecipeTime(5);
    if (logs.B1P2.unlocked) reduceRecipeTime(3);
}

stats.craftedItems = 0;
setInterval(craftingProgress,1000);
function craftingProgress(){
    for (let r in recipes) {
    if (recipes[r].crafting !== 'false'){
    recipes[r].time--
        
    if (currentRecipe === r) craftingBarUi()
        
    if (recipes[r].time < 0){ //stops at -1 technically so the progress bar finishes

    let canCraft = true; //Checks if player still has materials 
    if (items[recipes[r].reagent1].count < recipes[r].amount1) { canCraft = false;}
    if (recipes[r].reagent2 && items[recipes[r].reagent2].count < recipes[r].amount2) { canCraft = false;}
    if (recipes[r].reagent3 && items[recipes[r].reagent3].count < recipes[r].amount3) { canCraft = false; }
    if (canCraft) {
        
    //gives exp if not gray
    if(recipes[r].level > (jobs[rpgPlayer.currentJob].level - 10)) {

    if(recipes[r].category==='SNpanel') jobs.blacksmith.exp += recipes[r].exp;
    if(recipes[r].category==='CNpanel') jobs.cooking.exp += recipes[r].exp;
    if(recipes[r].category==='ANpanel') jobs.alchemy.exp += recipes[r].exp;
    if(recipes[r].category==='ENpanel') jobs.engineering.exp += recipes[r].exp;
    jobExp();
    }
    

    items[recipes[r].item].count += 1;
    stats.craftedItems++;
    items[recipes[r].reagent1].count -= recipes[r].amount1; //deducts materials
    if ('reagent2' in recipes[r]) items[recipes[r].reagent2].count -= recipes[r].amount2;
    if ('reagent3' in recipes[r]) items[recipes[r].reagent3].count -= recipes[r].amount3;

    if (recipes[r].crafting === 'once'){
    recipes[r].crafting = 'false';
    recipes[r].time = recipes[r].timer;
    createRecipe();
    }

    if (recipes[r].crafting === 'all'){
    recipes[r].time = recipes[r].timer;
    }

    }
        
    if (!canCraft) {
    recipes[r].crafting = 'false';
    recipes[r].time = recipes[r].timer;
    createRecipe();
    }

    if (currentRecipe === r) {craftingBarUi(); //only update crafting bar if it matches the selected recipe
    playSound("audio/throw.mp3")
    did('craftBarWrap').style.animation = '';
    void did('craftBarWrap').offsetWidth;
    did('craftBarWrap').style.animation = 'levelUp 1s 1';}
        
        
    }}}}


    function jobExp(){
        for (let i in jobs) {
        if (jobs[i].exp >= jobs[i].maxExp){ //level up
        jobs[i].exp -= jobs[i].maxExp;    
        jobs[i].maxExp = Math.floor(30 * Math.pow(1.5, jobs[i].level));    
        jobs[i].level += 1; 

        if (rpgPlayer.currentJob === i){ //the level up animation will only play on current job    
        did('professionTitleBox').style.animation = '';
        void did('professionTitleBox').offsetWidth;
        did('professionTitleBox').style.animation = 'levelUp 1s 1'; }
        }}
        
        let percentageEXP = (jobs[rpgPlayer.currentJob].exp/jobs[rpgPlayer.currentJob].maxExp)*100;
        did('professionSkillBar').style.background = 'linear-gradient(90deg, #F9A910 '+percentageEXP+'%, #000 '+percentageEXP+'%)';
        did('professionTitle').innerHTML = jobs[rpgPlayer.currentJob].title+"<span> [Level "+jobs[rpgPlayer.currentJob].level+"]</span>";
        did('professionSkillExp').innerHTML = jobs[rpgPlayer.currentJob].exp+"/"+jobs[rpgPlayer.currentJob].maxExp
        
    }
    
    
    
    function craftingBarUi(){
        if (recipes[currentRecipe].time<recipes[currentRecipe].timer) {did('craftBar').style.transition = "1s all linear"} //flushea la animacion si acaba para que no vuelva
        else if (recipes[currentRecipe].time>0) {did('craftBar').style.transition = "none"}
        let percentageEXP =  (recipes[currentRecipe].time/recipes[currentRecipe].timer)*100;   
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
    if (items[reagent].max === 1) did("tooltipPrice").innerHTML = "(Unique)";
    else did("tooltipPrice").innerHTML = "(Max "+ items[reagent].max +")";
    did("tooltipRarity").textContent = items[reagent].quality;
        
    if (items[reagent].quality === "Common") {did("tooltipRarity").style.color = "white";did("tooltipName").style.color = "white"; }
    if (items[reagent].quality === "Uncommon") {did("tooltipRarity").style.color = "#1eff00";did("tooltipName").style.color = "#1eff00";}
    if (items[reagent].quality === "Rare") {did("tooltipRarity").style.color = "#0070dd";did("tooltipName").style.color = "#0070dd"}
    if (items[reagent].quality === "Epic") {did("tooltipRarity").style.color = "#a335ee";did("tooltipName").style.color = "#a335ee"}
    if (items[reagent].quality === "Legendary") {did("tooltipRarity").style.color = "#ff8000";did("tooltipName").style.color = "#ff8000"}
    if (items[reagent].quality === "Relic") {did("tooltipRarity").style.color = "#e6cc80";did("tooltipName").style.color = "#e6cc80"}
    if (items[reagent].quality === "Quest") {did("tooltipRarity").style.color = "yellow";did("tooltipName").style.color = "yellow"}
          
    did("tooltipDescription").innerHTML = items[reagent].description + '<br><div class="separador"></div><div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">'+items[reagent].sell+' Turtle Coins<br></div>';
    did("tooltipFlavor").textContent = items[reagent].flavor;
    did('tooltipImage').src = "img/src/items/"+items[reagent].id+".png";             
    var movingDiv = did('tooltip');
    var referenceDiv = did(reagent + 'reagent');
    var referenceRect = referenceDiv.getBoundingClientRect();    
    var referenceLeft = referenceRect.left + 26;
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
    did("tooltipName").textContent = items[outcome].name;
    if (items[outcome].max === 1) did("tooltipPrice").innerHTML = "(Unique)";
    else did("tooltipPrice").innerHTML = "(Max "+ items[outcome].max +")";
    did("tooltipRarity").textContent = items[outcome].quality;
        
    if (items[outcome].quality === "Common") {did("tooltipRarity").style.color = "white";did("tooltipName").style.color = "white"; }
    if (items[outcome].quality === "Uncommon") {did("tooltipRarity").style.color = "#1eff00";did("tooltipName").style.color = "#1eff00";}
    if (items[outcome].quality === "Rare") {did("tooltipRarity").style.color = "#0070dd";did("tooltipName").style.color = "#0070dd"}
    if (items[outcome].quality === "Epic") {did("tooltipRarity").style.color = "#a335ee";did("tooltipName").style.color = "#a335ee"}
    if (items[outcome].quality === "Legendary") {did("tooltipRarity").style.color = "#ff8000";did("tooltipName").style.color = "#ff8000"}
    if (items[outcome].quality === "Relic") {did("tooltipRarity").style.color = "#e6cc80";did("tooltipName").style.color = "#e6cc80"}
    if (items[outcome].quality === "Quest") {did("tooltipRarity").style.color = "yellow";did("tooltipName").style.color = "yellow"}
          
    did("tooltipDescription").innerHTML = items[outcome].description + '<br><div class="separador"></div><div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">'+items[outcome].sell+' Turtle Coins<br></div>';
    did("tooltipFlavor").textContent = items[outcome].flavor;
    did('tooltipImage').src = "img/src/items/"+items[outcome].id+".png";             
    var movingDiv = did('tooltip');
    var referenceDiv = did(outcome + 'outcome');
    var referenceRect = referenceDiv.getBoundingClientRect();    
    var referenceLeft = referenceRect.left + 26;
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
    reduceRecipeTimeCheck();
}
//#endregion







