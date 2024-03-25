
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


    if (!jobPanels[jp].unlocked) {did(jp+"panel").style.visibility = "hidden"; did(jp+"paneltitle").style.visibility = "hidden";}
    else {did(jp+"panel").style.visibility = "visible"; did(jp+"paneltitle").style.visibility = "visible";}


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


function createRecipe() {
   for (let r in recipes) {
   if (!did(r+"recipe")) {
    
    const recipediv = document.createElement('div');
    recipediv.id = r+"recipe";
    recipediv.innerHTML = '['+recipes[r].level+'] <span id="'+r+'recipeName">????? </span> <img id="'+r+'craftIconOne" src="img/src/icons/craftOne.png"> <img id="'+r+'craftIconAll" src="img/src/icons/craftAll.png">';
    did(r.substring(0, 2) + "panel").appendChild(recipediv);
    recipediv.className = 'recipe';
    recipeButton(r); 
    if (recipes[r].unlocked === false) recipediv.style.display = "none" 
   }
       
   if (did(r+"recipe")) {

    if (recipes[r].unlocked === true && did(r+"recipe").style.display === "none" )  {did(r+"recipe").style.display = "flex"}

    if (recipes[r].unlocked === false) {did(r+"recipe").style.display = "none"} 
       
     if(recipes[r].level <= (jobs[rpgPlayer.currentJob].level)) {did(r+'recipeName').innerHTML = items[recipes[r].item].name}
     else{ did(r+'recipeName').innerHTML = '?????'; did(r+"recipe").style.color = "gray";}
           
     
     if (recipes[r].level <= (jobs[rpgPlayer.currentJob].level)) did(r+"recipe").style.color = "#dec42f"; 
       
     if (recipes[r].level <= (jobs[rpgPlayer.currentJob].level - 5)) did(r+"recipe").style.color = "#3e753e";  
       
     if(recipes[r].level <= (jobs[rpgPlayer.currentJob].level - 10)) did(r+"recipe").style.color = "gray";
     
     if(recipes[r].crafting==='once') {did(r+'craftIconOne').style.display = "inline"} else did(r+'craftIconOne').style.display = "none";
     if(recipes[r].crafting==='all') {did(r+'craftIconAll').style.display = "inline"} else did(r+'craftIconAll').style.display = "none";
       
   }
       
   }
    

};createRecipe();

var currentRecipe = 'SN1'
function recipeButton(r) {
   if (did(r + 'recipe')) {
       did(r + 'recipe').addEventListener('click', function () { 
        if(recipes[r].level <= (jobs[rpgPlayer.currentJob].level)){ //clickable if the player has enough level
            playSound("audio/button4.mp3")
           currentRecipe = r
            did("recipePanel").style.display = "flex";
           //cleans the itemboxes
           did('recipeOutcome').innerHTML = "";
           did('recipeReagents').innerHTML = "";
           //highlight of the recipe
           var elements = document.querySelectorAll('.recipeSelect');
           elements.forEach(function(element) {
           element.classList.replace('recipeSelect', 'recipe'); })
           did(r + 'recipe').className  = 'recipeSelect';
           //set the item uptop
           did('recipeImage').style.border = returnQualityColor(items[recipes[r].item].quality) +' solid 1px';
           did('recipeTitle').style.color=returnQualityColor(items[recipes[r].item].quality);
           
           craftingBarUi();
           
           did('recipeImage').src = "img/src/items/"+recipes[r].item+".jpg";
           //display quantity if its not an unique item
           did('recipeTitle').innerHTML = items[recipes[r].item].name;

           var minutes = Math.floor(recipes[r].timer / 60); 
           var seconds = recipes[r].timer % 60;
           did('recipeTimer').innerHTML = minutes+"m "+seconds+"s";


           let description1 = "";
           if (r.charAt(1) === 'N') description1 = "Novice";
           if (r.charAt(1) === 'S') description1 = "Novice Blacksmith"

           let description2 = "";
           if (r.startsWith("S")) description2 = "Blacksmith"
           if (r.startsWith("A")) description2 = "Alchemy"
           if (r.startsWith("C")) description2 = "Cooking"
           if (r.startsWith("E")) description2 = "Engineering"

           did('recipeDescription').innerHTML = '<span style="color: lawngreen">Requires '+description1+' '+description2+' ['+recipes[r].level+']</span><br>Creates a '+items[recipes[r].item].name+'</p>';
           if ("description" in recipes[r]) did('recipeDescription').innerHTML = '<span style="color: lawngreen">Requires '+description1+' '+description2+' ['+recipes[r].level+']</span><br>'+recipes[r].description+'</p>';

           
    function addReagent(reagent, amount){       
           
    const itemdiv = document.createElement('div');
    itemdiv.id = reagent + 'reagent';  
    itemdiv.innerHTML = '<img src = "img/src/items/'+items[reagent].id+'.jpg"><div class="itemCount">'+amount+'</div>';
    itemdiv.className = 'itemSlot'; 
    did('recipeReagents').appendChild(itemdiv);
    itemdiv.style.border = returnQualityColor(items[reagent].quality) +' solid 1px';
    tooltipReagent(reagent)    
    }       
           
    addReagent(recipes[r].reagent1, recipes[r].amount1);       
    if ('reagent2' in recipes[r]) addReagent(recipes[r].reagent2, recipes[r].amount2);
    if ('reagent3' in recipes[r]) addReagent(recipes[r].reagent3, recipes[r].amount3); 
    if ('reagent4' in recipes[r]) addReagent(recipes[r].reagent4, recipes[r].amount4);          
           
    function addOutcome(outcome){       
           
    const itemdiv = document.createElement('div');
    itemdiv.id = outcome + 'outcome';  
    itemdiv.innerHTML = '<img src = "img/src/items/'+items[outcome].id+'.jpg">';
    itemdiv.className = 'itemSlot'; 
    did('recipeOutcome').appendChild(itemdiv);
    itemdiv.style.border = returnQualityColor(items[outcome].quality) +' solid 1px';
    tooltipOutcome(outcome)    
    }       
           
    addOutcome(recipes[r].item); 
           
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
     if (recipes[currentRecipe].reagent4 && items[recipes[currentRecipe].reagent4].count < recipes[currentRecipe].amount4) {canCraft = false;}
    
     if (canCraft && recipes[currentRecipe].crafting === "false") {
        playSound("audio/craft.mp3")
         did('craftBarWrap').style.animation = '';
         void did('craftBarWrap').offsetWidth;
         did('craftBarWrap').style.animation = 'levelUp 1s 1';
         recipes[currentRecipe].crafting = count;
         recipes[currentRecipe].time = recipes[currentRecipe].timer;
         createRecipe();

         items[recipes[currentRecipe].reagent1].count -= recipes[currentRecipe].amount1; //deducts on the initial press
         if ('reagent2' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent2].count -= recipes[currentRecipe].amount2;
         if ('reagent3' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent3].count -= recipes[currentRecipe].amount3;
         if ('reagent4' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent4].count -= recipes[currentRecipe].amount4;
         addItem()

     }

     if (!canCraft && !did('resourcePopUp')) {createPopup('&#10060; Not Enough Resources', '#913c3c', 'resourcePopUp'); playSound("audio/close.mp3")}
 }

 did('craftButtonCancel').addEventListener('click', cancelCrafting);
 function cancelCrafting() {

    if (recipes[currentRecipe].crafting !== "false") {
        recipes[currentRecipe].crafting = "false";
        playSound("audio/craft.mp3")
         did('craftBarWrap').style.animation = '';
         void did('craftBarWrap').offsetWidth;
         did('craftBarWrap').style.animation = 'levelUp 1s 1';
         
         recipes[currentRecipe].time = recipes[currentRecipe].timer;
         createRecipe();
         craftingBarUi()
         items[recipes[currentRecipe].reagent1].count += recipes[currentRecipe].amount1; //returns materials
         if ('reagent2' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent2].count += recipes[currentRecipe].amount2;
         if ('reagent3' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent3].count += recipes[currentRecipe].amount3;
         if ('reagent4' in recipes[currentRecipe]) items[recipes[currentRecipe].reagent4].count += recipes[currentRecipe].amount4;
         addItem()

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

function reduceRecipeTime(time) {

    for (let i in recipes) {
        recipes[i].timer -= time;
        if (recipes[i].timer<1) recipes[i].timer = 1;
    }
}

unlocks.anvil1 = false;
unlocks.anvil2 = false;
unlocks.anvil3 = false;
let anvil1once = true;
let anvil2once = true;
let anvil3once = true;

function reduceRecipeTimeCheck(){ //codigo del diablo lol
    if (unlocks.anvil1 && anvil1once) {reduceRecipeTime(5); anvil1once=false}
    if (unlocks.anvil2 && anvil2once) {reduceRecipeTime(5); anvil2once=false}
    if (unlocks.anvil3 && anvil3once) {reduceRecipeTime(5); anvil3once=false}
}


stats.craftedItems = 0;

var craftingCollectibles = { 
    I264A:{P:rareCollectibleChance,A:1, R:"medium"}, 
    I264B:{P:rareCollectibleChance,A:1, R:"medium"},
  }


setInterval(craftingProgress,1000);
function craftingProgress(){
    for (let r in recipes) {
    if (recipes[r].crafting !== 'false'){
    recipes[r].time--
        
    if (currentRecipe === r) craftingBarUi()
        
    if (recipes[r].time < 0){ //stops at -1 technically so the progress bar finishes

    
    //gives exp if not gray
    if(recipes[r].level > (jobs[rpgPlayer.currentJob].level - 10)) {

    if (r.startsWith("S")) jobs.blacksmith.exp += recipes[r].exp;
    if (r.startsWith("C")) jobs.cooking.exp += recipes[r].exp;
    if (r.startsWith("A")) jobs.alchemy.exp += recipes[r].exp;
    if (r.startsWith("E")) jobs.engineering.exp += recipes[r].exp;
    jobExp();
    }
    

    items[recipes[r].item].count += 1;
    stats.craftedItems++;
    rollTable(craftingCollectibles, 1);
    addItem()
    

    if (recipes[r].crafting === 'once'){
    recipes[r].crafting = 'false';
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
    did('craftBarWrap').style.animation = '';
    void did('craftBarWrap').offsetWidth;
    did('craftBarWrap').style.animation = 'levelUp 1s 1';}
        
        
    }}}}


    function jobExp(){
        for (let i in jobs) {
        if (jobs[i].exp >= jobs[i].maxExp){ //level up
        jobs[i].exp -= jobs[i].maxExp;    
        jobs[i].maxExp = Math.floor(30 * Math.pow(1.2, jobs[i].level));    
        jobs[i].level += 1; 
        createRecipe()

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

    did("tooltipPrice").innerHTML = "You Have: "+ items[reagent].count;

    did("tooltipRarity").textContent = items[reagent].quality;
        
    did("tooltipRarity").style.color = returnQualityColor(items[reagent].quality);
    did("tooltipName").style.color = returnQualityColor(items[reagent].quality);
          
    did("tooltipDescription").innerHTML = items[reagent].description + '<br><div class="separador"></div><div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">'+items[reagent].sell+' '+coinIcon+'Turtle Coins<br></div>';
    if (items[reagent].upgradeable || items[reagent].dynamic) did("tooltipDescription").innerHTML = eval(items[reagent].description) + '<br><div class="separador"></div><div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">'+items[reagent].sell+' '+coinIcon+'Turtle Coins<br></div>';
    did("tooltipFlavor").textContent = items[reagent].flavor;
    did('tooltipImage').src = "img/src/items/"+items[reagent].id+".jpg";             
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

    let itemLevel = ""

    let bobi = items[outcome].count+1

    if (items[outcome].upgradeable) itemLevel = returnQualityColor(bobi.toString())


    did("tooltipName").innerHTML = items[outcome].name + itemLevel;

    did("tooltipPrice").innerHTML = "You Have: "+ items[outcome].count;
    if (items[outcome].upgradeable) did("tooltipPrice").innerHTML = "";

    did("tooltipRarity").textContent = items[outcome].quality;

    did("tooltipRarity").style.color = returnQualityColor(items[outcome].quality);
    did("tooltipName").style.color = returnQualityColor(items[outcome].quality);
          
    did("tooltipDescription").innerHTML = items[outcome].description + '<br><div class="separador"></div><div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">'+items[outcome].sell+' '+coinIcon+'Turtle Coins<br></div>';
    if (items[outcome].upgradeable || items[outcome].dynamic) did("tooltipDescription").innerHTML = eval(items[outcome].description) + '<br><div class="separador"></div><div style=" text-align: center;background:transparent"><FONT COLOR="white"> Sell value: <FONT COLOR="#ffbd54">'+items[outcome].sell+' '+coinIcon+'Turtle Coins<br></div>';
    
    did("tooltipFlavor").textContent = items[outcome].flavor;
    did('tooltipImage').src = "img/src/items/"+items[outcome].id+".jpg";             
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
    createRecipe();
    reduceRecipeTimeCheck();
    createRecipeListing();
}
//#endregion







