//----------------------==========================-----------------------
//----------------------==========UPGRADES========-----------------------
//----------------------==========================-----------------------


var upgrades = {}

upgrades.C10 = {};
upgrades.C10.price = 1000;
upgrades.C10.name = 'Log Refinement Blueprint';
upgrades.C10.description = 'Permanently unlocks this activity on the<FONT COLOR="#edd585"> Coins <FONT COLOR="white">category'
upgrades.C10.flavor = '"All the bark without bitting."';
upgrades.C10.permanent = 1;
upgrades.C10.rarity = 'Common';
upgrades.C10.o = 'buildings["C10"].v=1;'

upgrades.C15 = {};
upgrades.C15.price = 1000;
upgrades.C15.name = 'Sacredwood Refinement';
upgrades.C15.description = 'Learn how to refine Sacredwood'
upgrades.C15.flavor = '"Holier than your regular stump."';
upgrades.C15.permanent = 0;
upgrades.C15.rarity = 'Epic';
upgrades.C15.o = 'buildings["C10"].img="C15"; buildingImage();'



Object.keys(upgrades).forEach(function(key) {
  upgrades[key].id = key;
  upgrades[key].unlocked = 1;
  upgrades[key].bought = 0;    
});

//----------------------==========================-----------------------
//----------------------========ACHIEVEMENTS======-----------------------
//----------------------==========================-----------------------

var achievements = { //uc = unlock condition

//------Click count

'cl1': {n: "Lovetap", d: 'Produce 1 Turtle Coin from clicking a turtle.', f:'"Good job! Now do it again."', id: '1cl1', t:'Achievement', u: 0, uc: 'if(stats.totalCoinsClick >= 1)achievements["cl1"].u=1'},   

'cl2': {n: "Turtle Stomper", d: 'Produce 10000 Turtle Coins from clicking a turtle.', id: '1cl2', t:'Achievement', u: 0, uc: 'if(stats.totalCoinsClick >= 10000)achievements["cl2"].u=1'},
    
'cl3': {n: "Shell Crusher", d: 'Produce 1000000 Turtle Coins from clicking a turtle.', f:'"In a good way. Somehow.', id: '1cl3', t:'Achievement', u: 0, uc: 'if(stats.totalCoinsClick >= 1000000)achievements["cl3"].u=1'},
    
'cl4': {n: "Pettapocalypse", d: 'Produce 1e+8 Turtle Coins from clicking a turtle.', id: '1cl4', t:'Achievement', u: 0, uc: 'if(stats.totalCoinsClick >= 10000000)achievements["cl4"].u=1'},
    
'cl5': {n: "Tactile Madness", d: 'Produce 1e+9 Turtle Coins from clicking a turtle.', id: '1cl5', t:'Achievement', u: 0, uc: 'if(stats.totalCoinsClick >= 100000000)achievements["cl5"].u=1'},
    
'cl6': {n: "Bring Them All", d: 'Produce 1e+10 Turtle Coins from clicking a turtle.', id: '1cl6', t:'Achievement', u: 0, uc: 'if(stats.totalCoinsClick >= 10000000000)achievements["cl6"].u=1'},
    
'cl7': {n: "Good Touch", d: 'Produce 1e+11 Turtle Coins from clicking a turtle.', id: '1cl7', t:'Achievement', u: 0, uc: 'if(stats.totalCoinsClick >= 100000000000)achievements["cl7"].u=1'},
    
'cl8': {n: "Turtlepetinator", d: 'Produce 1e+13 Turtle Coins from clicking a turtle.', f:'"Ive always wanted a pet platypus. But you’ll have to do for now."', id: '1cl8', t:'Achievement', u: 0, uc: 'if(stats.totalCoinsClick >= 10000000000000)achievements["cl8"].u=1'},
    
'cl9': {n: "The Turtleman Never Dies", d: 'Produce 1e+14 Turtle Coins from clicking a turtle.', id: '1cl9', t:'Achievement', u: 0, uc: 'if(stats.totalCoinsClick >= 100000000000000)achievements["cl9"].u=1'},
    
'cl10': {n: "The Tapped One", d: 'Produce 1e+15 Turtle Coins from clicking a turtle.', f:'"How cute how he eclipses the earth with his little shell."', id: '1cl10', t:'Achievement', u: 0, uc: 'if(stats.totalCoinsClick >= 1000000000000000)achievements["cl10"].u=1'},
    
//------Money in bank
    
'mo1': {n: "Early Stage Capitalism", d: 'Produce a total of 1000 Turtle Coins', id: '2mo1', t:'Achievement', u: 0, uc: 'if(stats.totalCoins >= 1000)achievements["mo1"].u=1'},
    
'mo2': {n: "Scrooge McTurt", d: 'Produce a total of 10000 Turtle Coins', id: '2mo2', t:'Achievement', u: 0, uc: 'if(stats.totalCoins >= 10000)achievements["mo2"].u=1'},
    
'mo3': {n: "Pyramidal Scheme", d: 'Produce a total of 1000000 Turtle Coins', id: '2mo3', t:'Achievement', u: 0, uc: 'if(stats.totalCoins >= 1000000)achievements["mo3"].u=1'},
    
'mo4': {n: "Money Goes in...", d: 'Produce a total of 1e+8 Turtle Coins', id: '2mo4', t:'Achievement', u: 0, uc: 'if(stats.totalCoins >= 100000000)achievements["mo4"].u=1'},
    
'mo5': {n: "Money Goes out...", d: 'Produce a total of 1e+10 Turtle Coins', id: '2mo5', t:'Achievement', u: 0, uc: 'if(stats.totalCoins >= 10000000000)achievements["mo5"].u=1'},
    
'mo6': {n: "First World Solutions", d: 'Produce a total of 1e+11 Turtle Coins', id: '2mo6', t:'Achievement', u: 0, uc: 'if(stats.totalCoins >= 100000000000)achievements["mo6"].u=1'},
    
'mo7': {n: "Life Is Like a Coin", d: 'Produce a total of 1e+13 Turtle Coins', f:'"...or like ten trillion in this case"', id: '2mo7', t:'Achievement', u: 0, uc: 'if(stats.totalCoins >= 10000000000000)achievements["mo7"].u=1'},
    
'mo8': {n: "Aaaand... Its gone", d: 'Produce a total of 1e+14 Turtle Coins', id: '2mo8', t:'Achievement', u: 0, uc: 'if(stats.totalCoins >= 100000000000000)achievements["mo8"].u=1'},
    
'mo9': {n: "Back in the Rank", d: 'Produce a total of 1e+15 Turtle Coins', id: '2mo9', t:'Achievement', u: 0, uc: 'if(stats.totalCoins >= 1000000000000000)achievements["mo9"].u=1'},
    
'mo10': {n: "AI Generated Coins", d: 'Produce a total of 1e+16 Turtle Coins', f:"'Generated infinitely without repercusion. Or at least the repercusion is not our problem.'", id: '2mo10', t:'Achievement', u: 0, uc: 'if(stats.totalCoins >= 10000000000000000)achievements["mo10"].u=1'},
    
//------Buildings Reached
    
'bu1': {n: "Auspicious Settlement", d: 'Purchase a total of 10 activities on your Turtle Camp', id: '6bu1', t:'Achievement', u: 0, uc: 'if(stats.totalBuildings >= 10)achievements["bu1"].u=1'},
    
'bu2': {n: "Populated Tents", d: 'Purchase a total of 50 activities on your Turtle Camp', id: '6bu2', t:'Achievement', u: 0, uc: 'if(stats.totalBuildings >= 50)achievements["bu2"].u=1'},
    
'bu3': {n: "Busy Township", d: 'Purchase a total of 150 activities on your Turtle Camp',  id: '6bu3', t:'Achievement', u: 0, uc: 'if(stats.totalBuildings >= 150)achievements["bu3"].u=1'},
    
'bu4': {n: "Urban District", d: 'Purchase a total of 300 activities on your Turtle Camp', id: '6bu4', t:'Achievement', u: 0, uc: 'if(stats.totalBuildings >= 300)achievements["bu4"].u=1'},
    
'bu5': {n: "Realm of ye Turts", d: 'Purchase a total of 500 activities on your Turtle Camp', id: '6bu5', t:'Achievement', f:'"A fine kingdom thou are managing."', u: 0, uc: 'if(stats.totalBuildings >= 500)achievements["bu5"].u=1'},
    
'bu6': {n: "Metropolis", d: 'Purchase a total of 1000 activities on your Turtle Camp', id: '6bu6', t:'Achievement', u: 0, uc: 'if(stats.totalBuildings >= 1000)achievements["bu6"].u=1'},
    
'bu7': {n: "Megapolis", d: 'Purchase a total of 3000 activities on your Turtle Camp', id: '6bu7', t:'Achievement', u: 0, uc: 'if(stats.totalBuildings >= 3000)achievements["bu7"].u=1'},
    
'bu8': {n: "Black Company", d: 'Purchase a total of 12000 activities on your Turtle Camp', id: '6bu8', t:'Achievement', u: 0, uc: 'if(stats.totalBuildings >= 12000)achievements["bu8"].u=1'},
    
'bu9': {n: "Profession Farming", d: 'Purchase a total of 35000 activities on your Turtle Camp', f:'"Only a few more levels to go."', id: '6bu9', t:'Achievement', u: 0, uc: 'if(stats.totalBuildings >= 35000)achievements["bu9"].u=1'},
    
'bu10': {n: "0% Unemployment Rate", d: 'Purchase a total of 55000 activities on your Turtle Camp', f:'"For the better or the worse, no matter how much you run, job is going to find you."', id: '6bu10', t:'Achievement', u: 0, uc: 'if(stats.totalBuildings >= 55000)achievements["bu10"].u=1'},
    
//------Resources Produced
    
're1': {n: "Forestal Exploitation", d: 'Produce a total of 100 Resources on your Turtle Camp', id: '3re1', t:'Achievement', u: 0, uc: 'if(stats.totalResources >= 100)achievements["re1"].u=1'},
    
're2': {n: "Nature Heapening", d: 'Produce a total of 100000 Resources on your Turtle Camp', f:'"Nature gives, and Nature gives again."', id: '3re2', t:'Achievement', u: 0, uc: 'if(stats.totalResources >= 100000)achievements["re2"].u=1'},
    
're3': {n: "Tectonic Ravaging", d: 'Produce a total of 10000000 Resources on your Turtle Camp', id: '3re3', t:'Achievement', u: 0, uc: 'if(stats.totalResources >= 10000000)achievements["re3"].u=1'},
    
're4': {n: "Mountain Collection", d: 'Produce a total of 1e+9 Resources on your Turtle Camp', id: '3re4', t:'Achievement', u: 0, uc: 'if(stats.totalResources >= 1000000000)achievements["re4"].u=1'},
    
're5': {n: "World Exploitation", d: 'Produce a total of 1e+11 Resources on your Turtle Camp', id: '3re5', t:'Achievement', u: 0, uc: 'if(stats.totalResources >= 100000000000)achievements["re5"].u=1'},
    
're6': {n: "Star Reaping", d: 'Produce a total of 1e+12 Resources on your Turtle Camp', f:'"This bright ball now belongs to the turties."', id: '3re6', t:'Achievement', u: 0, uc: 'if(stats.totalResources >= 1000000000000)achievements["re6"].u=1'},
    
're7': {n: "Dyson Sphere", d: 'Produce a total of 1e+13 Resources on your Turtle Camp', id: '3re7', t:'Achievement', u: 0, uc: 'if(stats.totalResources >= 10000000000000)achievements["re7"].u=1'},
    
're8': {n: "Quasar Farming", d: 'Produce a total of 1e+14 Resources on your Turtle Camp', id: '3re8', t:'Achievement', u: 0, uc: 'if(stats.totalResources >= 100000000000000)achievements["re8"].u=1'},
    
're9': {n: "Pulsar Gathering", d: 'Produce a total of 1e+15 Resources on your Turtle Camp', id: '3re9', t:'Achievement', u: 0, uc: 'if(stats.totalResources >= 1000000000000000)achievements["re9"].u=1'},
    
're10': {n: "Neutron Stockpile", d: 'Produce a total of 1e+16 Resources on your Turtle Camp', f:'"Despite the name, Its a pretty positive thing."', id: '3re10', t:'Achievement', u: 0, uc: 'if(stats.totalResources >= 10000000000000000)achievements["re10"].u=1'},

//------Supplies Produced 
    
'su1': {n: "Turtle Feast", d: 'Produce a total of 100 Supplies on your Turtle Camp', id: '4su1', t:'Achievement', u: 0, uc: 'if(stats.totalSupplies >= 100)achievements["su1"].u=1'},
    
'su2': {n: "Grandma's Feeding", d: 'Produce a total of 100000 Supplies on your Turtle Camp',  id: '4su2', t:'Achievement', u: 0, uc: 'if(stats.totalResources >= 100000)achievements["su2"].u=1'},
    
'su3': {n: "One More Dessert", d: 'Produce a total of 10000000 Supplies on your Turtle Camp', f:'"Make it 10000001."', id: '4su3', t:'Achievement', u: 0, uc: 'if(stats.totalSupplies >= 10000000)achievements["su3"].u=1'},
    
'su4': {n: "Tonight We Dine in Here", d: 'Produce a total of 1e+9 Supplies on your Turtle Camp', id: '4su4', t:'Achievement', u: 0, uc: 'if(stats.totalSupplies >= 1000000000)achievements["su4"].u=1'},
    
'su5': {n: "Overqualified Dietitian", d: 'Produce a total of 1e+11 Supplies on your Turtle Camp', f:'"Youre overdoing it too much."', id: '4su5', t:'Achievement', u: 0, uc: 'if(stats.totalSupplies >= 100000000000)achievements["su5"].u=1'},
    
'su6': {n: "Turtle Protein", d: 'Produce a total of 1e+12 Supplies on your Turtle Camp', id: '4su6', t:'Achievement', u: 0, uc: 'if(stats.totalSupplies >= 1000000000000)achievements["su6"].u=1'},
    
'su7': {n: "Hotel Breakfast", d: 'Produce a total of 1e+13 Supplies on your Turtle Camp', id: '4su7', t:'Achievement', u: 0, uc: 'if(stats.totalSupplies >= 10000000000000)achievements["su7"].u=1'},
    
'su8': {n: "Food Warfare", d: 'Produce a total of 1e+14 Supplies on your Turtle Camp', id: '4su8', t:'Achievement', u: 0, uc: 'if(stats.totalSupplies >= 100000000000000)achievements["su8"].u=1'},
    
'su9': {n: "World Hunger no More", d: 'Produce a total of 1e+15 Supplies on your Turtle Camp', f:'"At least in one planet."', id: '4su9', t:'Achievement', u: 0, uc: 'if(stats.totalSupplies >= 1000000000000000)achievements["su9"].u=1'},
    
'su10': {n: "American Portion", d: 'Produce a total of 1e+16 Supplies on your Turtle Camp', id: '4su10', t:'Achievement', u: 0, uc: 'if(stats.totalSupplies >= 10000000000000000)achievements["su10"].u=1'},
    
//------Energy Produced 
    
'en1': {n: "Greased Lightning", d: 'Produce a total of 100 Energy on your Turtle Camp', id: '5en1', t:'Achievement', u: 0, uc: 'if(stats.totalEnergy >= 100)achievements["en1"].u=1'},
    
'en2': {n: "A Really Good Energy Plan", d: 'Produce a total of 100000 Energy on your Turtle Camp', f:'"They dont make them like they used to do, dont they."',  id: '5en2', t:'Achievement', u: 0, uc: 'if(stats.totalEnergy >= 100000)achievements["en2"].u=1'},
    
'en3': {n: "Power Blackout", d: 'Produce a total of 10000000 Energy on your Turtle Camp', id: '5en3', t:'Achievement', u: 0, uc: 'if(stats.totalEnergy >= 10000000)achievements["en3"].u=1'},
    
'en4': {n: "Isotope 0", d: 'Produce a total of 1e+9 Energy on your Turtle Camp', id: '5en4', t:'Achievement', u: 0, uc: 'if(stats.totalEnergy >= 1000000000)achievements["en4"].u=1'},
    
'en5': {n: "Nuclear Fusion", d: 'Produce a total of 1e+11 Energy on your Turtle Camp', f:'"CAUTION ☢ CAUTION ☢ CAUTION ☢ CAUTION ☢."', id: '5en5', t:'Achievement', u: 0, uc: 'if(stats.totalEnergy >= 100000000000)achievements["en5"].u=1'},
    
'en6': {n: "Particle Slicing", d: 'Produce a total of 1e+12 Energy on your Turtle Camp', id: '5en6', t:'Achievement', u: 0, uc: 'if(stats.totalEnergy >= 1000000000000)achievements["en6"].u=1'},
    
'en7': {n: "Perpetual Machinery", d: 'Produce a total of 1e+13 Energy on your Turtle Camp', id: '5en7', t:'Achievement', u: 0, uc: 'if(stats.totalEnergy >= 10000000000000)achievements["en7"].u=1'},
    
'en8': {n: "Thermodinawho", d: 'Produce a total of 1e+14 Energy on your Turtle Camp', id: '5en8', t:'Achievement', u: 0, uc: 'if(stats.totalEnergy >= 100000000000000)achievements["en8"].u=1'},
    
'en9': {n: "Energy Loop", d: 'Produce a total of 1e+15 Energy on your Turtle Camp', id: '5en9', t:'Achievement', u: 0, uc: 'if(stats.totalEnergy >= 1000000000000000)achievements["en9"].u=1'},
    
'en10': {n: "Elemental Syphoning", d: 'Produce a total of 1e+16 Energy on your Turtle Camp', f:'"Get the energy directly from the higer-ups."', id: '5en10', t:'Achievement', u: 0, uc: 'if(stats.totalEnergy >= 10000000000000000)achievements["en10"].u=1'},   
       
//--------Upgrade Count

'up1': {n: "Enhancer", d: 'Purchase a total of 5 upgrades', f:'"How did it felt?"', id: '8up1', t:'Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 5)achievements["up1"].u=1'},
    
'up2': {n: "Upgradomancer", d: 'Purchase a total of 10 upgrades', id: '8up2', t:'Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 10)achievements["up2"].u=1'},
    
'up3': {n: "Nitro Booster", d: 'Purchase a total of 25 upgrades',  id: '8up3', t:'Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 25)achievements["up3"].u=1'},
    
'up4': {n: "Magnification", d: 'Purchase a total of 50 upgrades', id: '8up4', t:'Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 50)achievements["up4"].u=1'},
    
'up5': {n: "Life Improvement", d: 'Purchase a total of 100 upgrades', id: '8up5', t:'Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 100)achievements["up5"].u=1'},
    
'up6': {n: "Upgradus Maximus", d: 'Purchase a total of 250 upgrades', id: '8up6', t:'Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 250)achievements["up6"].u=1'},
    
'up7': {n: "When Are They Going To Run Out", d: 'Purchase a total of 200 upgrades', f:'"Sometimes I ask to myself."', id: '8up7', t:'Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 200)achievements["up7"].u=1'},
    
'up8': {n: "Not Anytime Soon", d: 'Purchase a total of 350 upgrades', id: '8up8', f:'"Oh well."', t:'Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 350)achievements["up8"].u=1'},
    
'up9': {n: "Unlimited Power", d: 'Purchase a total of 450 upgrades',  id: '8up9', t:'Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 450)achievements["up9"].u=1'},
    
'up10': {n: "Nothing Left Unimproved", d: 'Purchase a total of 550 upgrades', id: '8up10', t:'Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 550)achievements["up10"].u=1'},    
    
//--------Penguin Count //hacer  
    
'pe1': {n: "Alone No More", d: 'Adquire your first Penguin Helper.', f:'"Aint they the second cutest?"', id: '7pe1', t:'Achievement', u: 0, uc: 'if(player.penguins.amount >= 1)achievements["pe1"].u=1'},
    
'pe2': {n: "Penguin Flock", d: 'Adquire 100 Penguin Helpers.', id: '7pe2', t:'Achievement', u: 0, uc: 'if(player.penguins.amount >= 100)achievements["pe2"].u=1'},
    
'pe3': {n: "Penguin Band", d: 'Adquire 1000 Penguin Helpers.',  id: '7pe3', t:'Achievement', u: 0, uc: 'if(player.penguins.amount >= 1000)achievements["pe3"].u=1'},
    
'pe4': {n: "Penguin Army", d: 'Adquire 10000 Penguin Helpers.', id: '7pe4', t:'Achievement', u: 0, uc: 'if(player.penguins.amount >= 10000)achievements["pe4"].u=1'},
    
'pe5': {n: "Penguin Military Force", d: 'Adquire 100000 Penguin Helpers.', id: '7pe5', t:'Achievement', u: 0, uc: 'if(player.penguins.amount >= 100000)achievements["pe5"].u=1'},
    
'pe6': {n: "Penguin Syndicate", d: 'Adquire 1000000 Penguin Helpers.', id: '7pe6', t:'Achievement', u: 0, uc: 'if(player.penguins.amount >= 1000000)achievements["pe6"].u=1'},
    
'pe7': {n: "Penguin Revolution", d: 'Adquire 10000000 Penguin Helpers.', f:'"Surely they aint plotting anything."', id: '7pe7', t:'Achievement', u: 0, uc: 'if(player.penguins.amount >= 10000000)achievements["pe7"].u=1'},
    
'pe8': {n: "Club Penguin", d: 'Adquire 1e+8 Penguin Helpers.', id: '7pe8', t:'Achievement', u: 0, uc: 'if(player.penguins.amount >= 100000000)achievements["pe8"].u=1'},
    
'pe9': {n: "Wombo Combo", d: 'Adquire 1e+9 Penguin Helpers.',  id: '7pe9', f:'"The happiest of the feets."', t:'Achievement', u: 0, uc: 'if(player.penguins.amount >= 1000000000)achievements["pe9"].u=1'},
    
'pe10': {n: "Super Penguin Idle", d: 'Adquire 1e+10 Penguin Helpers.',  id: '7pe10', t:'Achievement', u: 0, uc: 'if(player.penguins.amount >= 10000000000)achievements["pe10"].u=1'},    
    
 //--------Secret Achievements   //st: spoiler tag (advice on how to unlock it)
    
'mi1': {n: "Penguin Clicker", d: 'Click the Penguin Helper 100 times', id: 'mi1', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi1"].u=1', st: '"Give your helpers some love too."', }, 
    
'mi2': {n: "Too much free time", d: 'Play for 10 hours.', id: 'mi2', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi2"].u=1', st: '"Just do your thing."', },
    
'mi3': {n: "Way too much free time", d: 'Play for 100 hours.', id: 'mi3', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi3"].u=1', st: '"Keep doing your thing."', },  
    
'mi4': {n: "Pekin Duck", d:"Click the secret duck" ,f: '"Thats not the animal you came here to click."', id: 'mi4', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi4"].u=1', st: '"Find that damn quacker."', },  
    
'mi5': {n: "Pacifist Run", d: 'Reach 1000000 Turtle Coins only having clicked on the turtle 25 times from the start of your legacy.', id: 'mi5', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi5"].u=1', st: '"No clicking allowed."', },  

'mi6': {n: "And You Shall Be", d: 'Rename your turtle for the first time', id: 'mi6', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi6"].u=1', st: '"Jeffrey is no more."', },    
    
'mi7': {n: "Or Maybe Not", d: 'Rename your turtle a bunch of times.', f: '"You know it aint that important, right."', id: 'mi7', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi7"].u=1', st: '"Feel a bit too indecisive."', },     
    
'mi8': {n: "Back in Black", d: 'Rename your turtle Jeffrey.', f: '"Sometimes we all feel a bit Jeffrey."', id: 'mi8', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi8"].u=1', st: '"....Aaand hes back."', },
    
'mi9': {n: "Whatever Did We Do", d: 'Check the discord server out.', f: '"Feel free to say something in there!."', id: 'mi9', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi8"].u=1', st: '"....Aaand hes back."', },     

'mi10': {n: "Speedrun", d: 'Reach 1000000 Turtle Coins in one hour from the start of your legacy.', id: 'mi10', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi10"].u=1', st: '"Get coins fast."', },
    
'mi11': {n: "Sprintrush", d: 'Reach 1000000 Turtle Coins in 30 minutes from the start of your legacy.', id: 'mi11', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi11"].u=1', st: '"Get coins real fast."', },
    
'mi12': {n: "Hastedash", d: 'Reach 1000000 Turtle Coins in 15 minutes from the start of your legacy.', id: 'mi12', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi12"].u=1', st: '"Get coins truly real fast."', },
    
'mi13': {n: "Obstinated Obstructionist", d: 'Reach 1000000 Turtle Coins without purchasing any activity.', id: 'mi13', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi13"].u=1', st: '"Refuse work."', },
    
'mi14': {n: "Minish Cap", d: 'Reach 10000000 Turtle Coins without purchasing any upgrades.', id: 'mi14', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi14"].u=1', st: '"Refuse power."', },    
    
'mi15': {n: "Humble Hustle", d: 'Buy 1 of every activity on your Turtle Camp.', id: 'mi15', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi15"].u=1', st: '"One at a time."', }, 

'mi16': {n: "I Dont Wanna Rule Anymore", d: 'End your legacy a bunch of times in a row.', id: 'mi16', t:'Secret Achievement', u: 0, uc: 'if(stats.totalUpgrades >= 1)achievements["mi16"].u=1', st: '"Try to abandon your fate and your turtles."', }, 
}

achievements;

//----------------------==========================-----------------------
//----------------------=========TREATIES=========-----------------------
//----------------------==========================-----------------------

var treaties = { //u = unlocked? //r = rank //a = active?// o = outcome// d2 = second description used for swag
    
'tr1': {n:'Treaty Of Resources', d:'Converts 50% of the production of Supplies and Energy to Resources.', id:'tr1', u: 0, r: 'I', a: 0, o:'switchTreaty("resources")'},  
    
'tr2': {n:'Treaty Of Supplies', d:'Converts 50% of the production of Resources and Energy to Supplies.', id:'tr2', u: 0, r: 'I', a: 0, o:'switchTreaty("supplies")'},
    
'tr3': {n:'Treaty Of Energy', d:'Converts 50% of the production of Resources and Supplies to Energy.', id:'tr3', u: 0, r: 'I', a: 0, o:'switchTreaty("energy")'}, 
    
}
treaties;

//----------------------==========================-----------------------
//----------------------==========ENEMIES=========-----------------------
//----------------------==========================-----------------------
var enemies = {}

enemies.E1 = {};
enemies.E1.name = 'Stern Cricket';
enemies.E1.level = '[lvl 2]';
enemies.E1.hp = 100;
enemies.E1.description = 'This mighty foe wont back up from any fight. Despite Its size, It posses an equal threat than whatever threat a cricket supposes.'
enemies.E1.area = 'A1';
enemies.E1.physAttack = 10;
enemies.E1.magicAttack = 10;
enemies.E1.rangedAttack = 10;
enemies.E1.physDefense = 10;
enemies.E1.magicDefense = 10;
enemies.E1.rangedDefense = 10;
enemies.E1.exp = 10;
enemies.E1.coins = 10;
enemies.E1.drops = {}

enemies.E1.drops.id1 = ['I2','I3','I4','I5','I6','I8'];
enemies.E1.drops.id1w = 0.5;
enemies.E1.drops.id1n = '<FONT COLOR="white">[Cloth Set]';

enemies.E1.drops.id2 = 'I2';
enemies.E1.drops.id2w = 1;
enemies.E1.drops.id2n = '<FONT COLOR="white">[Bug Meat]';

enemies.E1.drops.id3 = 'I1';
enemies.E1.drops.id3w = 1;
enemies.E1.drops.id3n = '<FONT COLOR="white">[Bug Meat]';


enemies.E2 = {};
enemies.E2.name = 'Green Maggot';
enemies.E2.level = '[lvl 1]';
enemies.E2.hp = 100;
enemies.E2.description = 'A pathetic excuse of a foe whose chances of natural survival are negligible. You are probably doing it a favor by ending his struggle early.'
enemies.E2.area = 'A1';
enemies.E2.physAttack = 10;
enemies.E2.magicAttack = 10;
enemies.E2.rangedAttack = 10;
enemies.E2.physDefense = 10;
enemies.E2.magicDefense = 10;
enemies.E2.rangedDefense = 10;
enemies.E2.exp = 10;
enemies.E2.coins = 10;
enemies.E2.drops = {}

enemies.E2.drops.id1 = ['I2','I3','I4','I5','I6','I8'];
enemies.E2.drops.id1w = 0.5;
enemies.E2.drops.id1n = '<FONT COLOR="white">[Cloth Set]';

enemies.E2.drops.id2 = 'I12';
enemies.E2.drops.id2w = 1;
enemies.E2.drops.id2n = '<FONT COLOR="white">[Bug Meat]';

enemies.E2.drops.id3 = 'I7';
enemies.E2.drops.id3w = 1;
enemies.E2.drops.id3n = '<FONT COLOR="white">[Bug Meat]';



enemies.E3 = {};
enemies.E3.name = 'Fruit Fly';
enemies.E3.level = '[lvl 1]';
enemies.E3.hp = 200;
enemies.E3.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E3.area = 'A1';
enemies.E3.physAttack = 10;
enemies.E3.magicAttack = 10;
enemies.E3.rangedAttack = 10;
enemies.E3.physDefense = 10;
enemies.E3.magicDefense = 10;
enemies.E3.rangedDefense = 10;
enemies.E3.exp = 10;
enemies.E3.coins = 10;
enemies.E3.drops = {}


enemies.E4 = {};
enemies.E4.name = 'Great Wolf Spider';
enemies.E4.level = '[lvl 5]';
enemies.E4.hp = 10;
enemies.E4.description = 'This overgrown arachnid makes up for a mighty foe. Its attacks can inflict a deadly poison that ignores armor.<br><br><FONT COLOR="#93b56e">Skills: High chance of applying poison on attack';
enemies.E4.area = 'A1';
enemies.E4.physAttack = 10;
enemies.E4.magicAttack = 10;
enemies.E4.rangedAttack = 10;
enemies.E4.physDefense = 10;
enemies.E4.magicDefense = 10;
enemies.E4.rangedDefense = 10;
enemies.E4.exp = 10;
enemies.E4.coins = 10;
enemies.E4.drops = {}

enemies.E4.drops.id1 = "I10";
enemies.E4.drops.id1w = 100;
enemies.E4.drops.id1n = '<FONT COLOR=" #1EFF0C">[Great Wolf Spider Cache]';

enemies.E5 = {};
enemies.E5.name = 'Giant Hare';
enemies.E5.level = '[lvl 1]';
enemies.E5.hp = 200;
enemies.E5.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E5.area = 'A2';
enemies.E5.physAttack = 10;
enemies.E5.magicAttack = 10;
enemies.E5.rangedAttack = 10;
enemies.E5.physDefense = 10;
enemies.E5.magicDefense = 10;
enemies.E5.rangedDefense = 10;
enemies.E5.exp = 10;
enemies.E5.coins = 10;
enemies.E5.drops = {}

enemies.E6 = {};
enemies.E6.name = 'Red Squirrel';
enemies.E6.level = '[lvl 1]';
enemies.E6.hp = 200;
enemies.E6.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E6.area = 'A2';
enemies.E6.physAttack = 10;
enemies.E6.magicAttack = 10;
enemies.E6.rangedAttack = 10;
enemies.E6.physDefense = 10;
enemies.E6.magicDefense = 10;
enemies.E6.rangedDefense = 10;
enemies.E6.exp = 10;
enemies.E6.coins = 10;
enemies.E6.drops = {}

enemies.E7 = {};
enemies.E7.name = 'Mighty Hen';
enemies.E7.level = '[lvl 1]';
enemies.E7.hp = 200;
enemies.E7.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E7.area = 'A2';
enemies.E7.physAttack = 10;
enemies.E7.magicAttack = 10;
enemies.E7.rangedAttack = 10;
enemies.E7.physDefense = 10;
enemies.E7.magicDefense = 10;
enemies.E7.rangedDefense = 10;
enemies.E7.exp = 10;
enemies.E7.coins = 10;
enemies.E7.drops = {}

enemies.E8 = {};
enemies.E8.name = 'Basalt Tiger';
enemies.E8.level = '[lvl 1]';
enemies.E8.hp = 200;
enemies.E8.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E8.area = 'A2';
enemies.E8.physAttack = 10;
enemies.E8.magicAttack = 10;
enemies.E8.rangedAttack = 10;
enemies.E8.physDefense = 10;
enemies.E8.magicDefense = 10;
enemies.E8.rangedDefense = 10;
enemies.E8.exp = 10;
enemies.E8.coins = 10;
enemies.E8.drops = {}

enemies.E9 = {};
enemies.E9.name = 'Rhynokerros';
enemies.E9.level = '[lvl 1]';
enemies.E9.hp = 200;
enemies.E9.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E9.area = 'A3';
enemies.E9.physAttack = 10;
enemies.E9.magicAttack = 10;
enemies.E9.rangedAttack = 10;
enemies.E9.physDefense = 10;
enemies.E9.magicDefense = 10;
enemies.E9.rangedDefense = 10;
enemies.E9.exp = 10;
enemies.E9.coins = 10;
enemies.E9.drops = {}

enemies.E10 = {};
enemies.E10.name = 'Iron Kuwait';
enemies.E10.level = '[lvl 1]';
enemies.E10.hp = 200;
enemies.E10.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E10.area = 'A3';
enemies.E10.physAttack = 10;
enemies.E10.magicAttack = 10;
enemies.E10.rangedAttack = 10;
enemies.E10.physDefense = 10;
enemies.E10.magicDefense = 10;
enemies.E10.rangedDefense = 10;
enemies.E10.exp = 10;
enemies.E10.coins = 10;
enemies.E10.drops = {}

enemies.E11 = {};
enemies.E11.name = 'Great Riftwolf';
enemies.E11.level = '[lvl 1]';
enemies.E11.hp = 200;
enemies.E11.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E11.area = 'A3';
enemies.E11.physAttack = 10;
enemies.E11.magicAttack = 10;
enemies.E11.rangedAttack = 10;
enemies.E11.physDefense = 10;
enemies.E11.magicDefense = 10;
enemies.E11.rangedDefense = 10;
enemies.E11.exp = 10;
enemies.E11.coins = 10;
enemies.E11.drops = {}

enemies.E12 = {};
enemies.E12.name = 'Giant Talus';
enemies.E12.level = '[lvl 1]';
enemies.E12.hp = 200;
enemies.E12.description = 'A common insect found in swamps and jungles. It possess no redeeming qualities as a predator.'
enemies.E12.area = 'A3';
enemies.E12.physAttack = 10;
enemies.E12.magicAttack = 10;
enemies.E12.rangedAttack = 10;
enemies.E12.physDefense = 10;
enemies.E12.magicDefense = 10;
enemies.E12.rangedDefense = 10;
enemies.E12.exp = 10;
enemies.E12.coins = 10;
enemies.E12.drops = {}


Object.keys(enemies).forEach(function(key) {
  enemies[key].id = key;
  enemies[key].img = key;
  enemies[key].miniImg = key+'M';
  enemies[key].killCount = 0;  
});

//----------------------==========================-----------------------
//----------------------===========ITEMS==========-----------------------
//----------------------==========================-----------------------
var items = {}

items.I1 = {};
items.I1.name = 'Bug Meat';
items.I1.description = 'Material';
items.I1.flavor = '"You are not brave enough to try this cut."';
items.I1.quality = 'Common';
items.I1.sell = 10;
items.I1.max = 999;


items.I2 = {};
items.I2.name = 'Cloth Boots';
items.I2.description = 'Equipable - Feet<br><FONT COLOR="#1EFF0C">+10 Physical Defense<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br><FONT COLOR="#1EFF0C">❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +100 Physical Defense';
items.I2.flavor = '"You can feel the ground texture through these, you can only imagine the protection they provide."';
items.I2.quality = 'Common';
items.I2.sell = 10;
items.I2.max = 1;
items.I2.use = 'gearSwap(items.I2.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I2.stats = 'armorPhysDefense += 10'
items.I2.remove = 'armorPhysDefense -= 10'

items.I3 = {};
items.I3.name = 'Worn Scarf';
items.I3.description = 'Equipable - Head<br><FONT COLOR="#1EFF0C">+15 Physical Defense<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray"><FONT COLOR="#1EFF0C">❖ Worn Scarf<br><FONT COLOR="gray">❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br>❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +100 Physical Defense';
items.I3.flavor = '"The odor makes you wish it wasnt an item for the head slot."';
items.I3.quality = 'Common';
items.I3.sell = 10;
items.I3.max = 1; 
items.I3.use = 'gearSwap(items.I3.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I3.stats = 'armorPhysDefense += 15'
items.I3.remove = 'armorPhysDefense -= 15'

items.I4 = {};
items.I4.name = 'Cloth Bracelets';
items.I4.description = 'Equipable - Hands<br><FONT COLOR="#1EFF0C">+8 Physical Defense<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br>❖ Cloth Shirt<br><FONT COLOR="#1EFF0C">❖ Cloth Bracelets<br><FONT COLOR="gray">❖ Cloth Pants<br>❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +100 Physical Defense';
items.I4.flavor = '"A bit too thight for your everyday wrist. Good riddance youre a turtle."';
items.I4.quality = 'Common';
items.I4.sell = 10;
items.I4.max = 1;
items.I4.use = 'gearSwap(items.I4.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")'
items.I4.stats = 'armorPhysDefense += 8'
items.I4.remove = 'armorPhysDefense -= 8'

items.I5 = {};
items.I5.name = 'Cloth Shirt';
items.I5.description = 'Equipable - Chest<br><FONT COLOR="#1EFF0C">+25 Physical Defense<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br><FONT COLOR="#1EFF0C">❖ Cloth Shirt<br><FONT COLOR="gray">❖ Cloth Bracelets<br>❖ Cloth Pants<br>❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +100 Physical Defense';
items.I5.flavor = '"Better than nothing. Not too better, though."';
items.I5.quality = 'Common';
items.I5.sell = 10;
items.I5.max = 1;
items.I5.use = 'gearSwap(items.I5.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")'
items.I5.stats = 'armorPhysDefense += 25'
items.I5.remove = 'armorPhysDefense -= 25'

items.I6 = {};
items.I6.name = 'Cloth Pants';
items.I6.description = 'Equipable - Legs<br><FONT COLOR="#1EFF0C">+25 Physical Defense<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br><FONT COLOR="#1EFF0C">❖ Cloth Pants<br><FONT COLOR="gray">❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +100 Physical Defense';
items.I6.flavor = '"If these pants survived whatever enviroment they were found, that means that at least they are resistant."';
items.I6.quality = 'Common';
items.I6.sell = 10;
items.I6.max = 1;
items.I6.use = 'gearSwap(items.I6.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")'
items.I6.stats = 'armorPhysDefense += 25'
items.I6.remove = 'armorPhysDefense -= 25'

items.I7 = {};
items.I7.name = 'Silver Ring';
items.I7.description = 'Equipable - Ring:<br><FONT COLOR="#1EFF0C">+50 Max Health';
items.I7.flavor = '"It sheens with a blue hue unknown to the place it was found in."';
items.I7.quality = 'Uncommon';
items.I7.sell = 10;
items.I7.max = 1; 
items.I7.use = 'gearSwap(items.I7.id, rpgPlayer.ringSlot, "rpgRingSlot", "ring")'
items.I7.stats = 'armorMaxHp += 50'
items.I7.remove = 'armorMaxHp -= 50'

items.I8 = {};
items.I8.name = 'Wooden Pole';
items.I8.description = 'Equipable<br><br>Resistances:';
items.I8.flavor = '"A training pole usually used for sparring and friendly matches. Purposely made to be as harmless as possible."';
items.I8.quality = 'Common';
items.I8.sell = 10;
items.I8.max = 1;
items.I8.use = 'gearSwap(items.I8.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I8.stats = 'armorPhysAttack += 25; weaponSwap("W1")'
items.I8.remove = 'armorPhysAttack -= 25; weaponSwap("W0")'

items.I9 = {};
items.I9.name = 'Wooden Bow';
items.I9.description = 'Equipable<br><br>Resistances:';
items.I9.flavor = '"Its full of splinters, but it should last a few shots before breaking apart."';
items.I9.quality = 'Common';
items.I9.sell = 10;
items.I9.max = 1;
items.I9.use = 'gearSwap(items.I9.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I9.stats = 'armorPhysAttack += 25; weaponSwap("W2")'
items.I9.remove = 'armorPhysAttack -= 25; weaponSwap("W0")'

items.I10 = {};
items.I10.name = 'Great Wolf Spider Cache';
items.I10.description = 'Container<br><FONT COLOR="#1EFF0C">Use: Open it!'
items.I10.flavor = '"A worthy reward of a big and hairy foe"';
items.I10.quality = 'Uncommon';
items.I10.sell = 10;
items.I10.max = 999; 
items.I10.use = 'giveRandomItem(reinforcedClothArray); removeItem(items.I10, 1)';
    
items.I11 = {};
items.I11.name = 'Weighted Die';
items.I11.description = 'Equipable - Trinket<br><FONT COLOR="#1EFF0C">Equip: Enemies defeated drop +10 Turtle Coins';
items.I11.flavor = '"Its full of splinters, but it should last a few shots before breaking apart."';
items.I11.quality = 'Uncommon';
items.I11.sell = 10;
items.I11.max = 1;
items.I11.use = 'gearSwap(items.I11.id, rpgPlayer.trinketSlot, "rpgTrinketSlot", "trinket")'
items.I11.stats = 'armorPhysAttack += 25;'
items.I11.remove = 'armorPhysAttack -= 25;'

items.I12 = {};
items.I12.name = 'Skewed Lizard';
items.I12.description = 'Consumable - Food<br><FONT COLOR="#1EFF0C">Use: Restores 1500 Health over 10 seconds'
items.I12.flavor = '"Tastes like chicken."';
items.I12.quality = 'Common';
items.I12.sell = 10;
items.I12.max = 999;
items.I12.use = 'if(foodCD===false){buffs.B1.active=1; playerBuffs(); playerItemAnimation(); removeItem(items.I12, 1)}'

items.I13 = {};
items.I13.name = 'Reinforced Cloth Boots';
items.I13.description = 'Equipable - Feet<br><FONT COLOR="#1EFF0C">+10 Physical Defense<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br><FONT COLOR="#1EFF0C">❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +100 Physical Defense';
items.I13.flavor = '"You can feel the ground texture through these, you can only imagine the protection they provide."';
items.I13.quality = 'Uncommon';
items.I13.sell = 10;
items.I13.max = 1;
items.I13.use = 'gearSwap(items.I13.id, rpgPlayer.feetSlot, "rpgFeetSlot", "feet")'
items.I13.stats = 'armorPhysDefense += 20'
items.I13.remove = 'armorPhysDefense -= 20'

items.I14 = {};
items.I14.name = 'Reinforced Worn Scarf';
items.I14.description = 'Equipable - Feet Slot<br><FONT COLOR="#1EFF0C">+10 Physical Resistance<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="#1EFF0C">❖ Worn Scarf<FONT COLOR="gray"><br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br>❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +10 Physical Resistance';
items.I14.flavor = '"You can feel the ground texture through these, you can only imagine the protection they provide."';
items.I14.quality = 'Uncommon';
items.I14.use = 'gearSwap(items.I14.id, rpgPlayer.headSlot, "rpgHeadSlot", "head")'
items.I14.sell = 10;
items.I14.max = 1;
items.I14.stats = 'armorPhysDefense += 25'
items.I14.remove = 'armorPhysDefense -= 25'

items.I15 = {};
items.I15.name = 'Reinforced Wooden Pole';
items.I15.description = 'Equipable - Feet Slot<br><FONT COLOR="#1EFF0C">+10 Physical Resistance<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br><FONT COLOR="#1EFF0C">❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +10 Physical Resistance';
items.I15.flavor = '"You can feel the ground texture through these, you can only imagine the protection they provide."';
items.I15.quality = 'Uncommon';
items.I15.sell = 10;
items.I15.max = 1;

items.I16 = {};
items.I16.name = 'Reinforced Cloth Bracelets';
items.I16.description = 'Equipable - Feet Slot<br><FONT COLOR="#1EFF0C">+10 Physical Resistance<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br><FONT COLOR="#1EFF0C">❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +10 Physical Resistance';
items.I16.flavor = '"You can feel the ground texture through these, you can only imagine the protection they provide."';
items.I16.quality = 'Uncommon';
items.I16.sell = 10;
items.I16.max = 1;
items.I16.use = 'gearSwap(items.I16.id, rpgPlayer.handsSlot, "rpgHandsSlot", "hands")';
items.I16.stats = 'armorPhysDefense += 25';
items.I16.remove = 'armorPhysDefense -= 25';


items.I17 = {};
items.I17.name = 'Reinforced Cloth Shirt';
items.I17.description = 'Equipable - Feet Slot<br><FONT COLOR="#1EFF0C">+10 Physical Resistance<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br><FONT COLOR="#1EFF0C">❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +10 Physical Resistance';
items.I17.flavor = '"You can feel the ground texture through these, you can only imagine the protection they provide."';
items.I17.quality = 'Uncommon';
items.I17.sell = 10;
items.I17.max = 1;
items.I17.use = 'gearSwap(items.I17.id, rpgPlayer.chestSlot, "rpgChestSlot", "chest")';
items.I17.stats = 'armorPhysDefense += 25'
items.I17.remove = 'armorPhysDefense -= 25'


items.I18 = {};
items.I18.name = 'Reinforced Cloth Pants';
items.I18.description = 'Equipable - Feet Slot<br><FONT COLOR="#1EFF0C">+10 Physical Resistance<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br><FONT COLOR="#1EFF0C">❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +10 Physical Resistance';
items.I18.flavor = '"You can feel the ground texture through these, you can only imagine the protection they provide."';
items.I18.quality = 'Uncommon';
items.I18.sell = 10;
items.I18.max = 1;
items.I18.stats = 'armorPhysDefense += 25';
items.I18.remove = 'armorPhysDefense -= 25';
items.I18.use = 'gearSwap(items.I18.id, rpgPlayer.legsSlot, "rpgLegsSlot", "legs")';


items.I19 = {};
items.I19.name = 'Avelyn';
items.I19.description = 'Equipable - Feet<br><FONT COLOR="#1EFF0C">+10 Physical Resistance<br><FONT COLOR="#b983f7">Cloth Set:<br><FONT COLOR="gray">❖ Worn Scarf<br>❖ Cloth Shirt<br>❖ Cloth Bracelets<br>❖ Cloth Pants<br><FONT COLOR="#1EFF0C">❖ Cloth Boots<br><FONT COLOR="#b983f7">★ Set bonus [5]: +10 Physical Resistance<br><FONT COLOR="white">Sell value: <FONT COLOR="#ffbd54">100 Turtle Coins<br>';
items.I19.flavor = '"A work of art rather than a crossbow. Its name whispers the name of a young warrior perished in battle."';
items.I19.quality = 'Uncommon';
items.I19.sell = 10;
items.I19.max = 1;
items.I19.use = 'gearSwap(items.I19.id, rpgPlayer.weaponSlot, "rpgWeaponSlot", "weapon")'
items.I19.stats = 'armorPhysAttack += 25; weaponSwap("W3")'
items.I19.remove = 'armorPhysAttack -= 25; weaponSwap("W0")'

items.I20 = {};
items.I20.name = 'Skull Caverns Key';
items.I20.description = 'Key Item<br><FONT COLOR="#1EFF0C">Use: Grants access to the Skull Caverns dungeon.';
items.I20.flavor = '"In contrast to Its key, you have a feeling sensation that the insides are not going to be as usual."';
items.I20.quality = 'Uncommon';
items.I20.sell = 10;
items.I20.max = 1;

items.I21 = {};
items.I21.name = 'Poison Flask';
items.I21.description = 'Consumable - Battle<br><FONT COLOR="#1EFF0C">On Enemy: Applies a weak poison that deals 1200 damage over 1 minute.';
items.I21.flavor = '"In the midst of chaos, there is also opportunity."';
items.I21.quality = 'Common';
items.I21.sell = 10;
items.I21.max = 5;

items.I22 = {};
items.I22.name = 'Nephrite';
items.I22.description = 'Material';
items.I22.flavor = '"One variety of jade much more rare and impure than Its sibling. Despite that, It still can fetch a good price"';
items.I22.quality = 'Common';
items.I22.sell = 10;
items.I22.max = 999;

items.I23 = {};
items.I23.name = 'Oran Berry';
items.I23.description = 'Equipable - Trinket<br>Restores <FONT COLOR="#1EFF0C">100 health<FONT COLOR="white"> when It falls below 50%. <br><FONT COLOR="gray">[1 minute cooldown]';
items.I23.flavor = '"A plump and round berry fruit characterised by their blue color. It can save you in a pinch."';
items.I23.quality = 'Uncommon';
items.I23.sell = 10;
items.I23.max = 1; 

Object.keys(items).forEach(function(key) {
  items[key].id = key;
  items[key].img = key;
  items[key].count = 1;
});


//----------------------==========================-----------------------
//----------------------============BUFFS=========-----------------------
//----------------------==========================-----------------------


var buffs = {}

buffs.B1 = {};
buffs.B1.name = 'Well Fed (Roasted Lizard)';
buffs.B1.description = 'Slowly Regenerating Life<br><br><FONT COLOR="#d67c3c">You feel full and cannot consume any more food until this effect runs out';
buffs.B1.left = 10;
buffs.B1.timer = 10;
buffs.B1.effect = 'buffFood(150, buffs.B1.left*1000)';

Object.keys(buffs).forEach(function(key) {
  buffs[key].id = key;
  buffs[key].img = key;
  buffs[key].percentage = 1;      
  buffs[key].active = 0;    
});


//----------------------==========================-----------------------
//----------------------===========AREAS==========-----------------------
//----------------------==========================-----------------------
var areas = {}

areas.A1 = {};
areas.A1.name = 'Lush Passageway';
areas.A1.level = 1;
areas.A1.description = '"A path that leads to the densest part of the forest. Before advancing further, you may expect quiet and serenity, given that the woods is where monsters and other vermin seek refuge. Nevertheless you shouldnt let your guard down."';
areas.A1.active = 1;
areas.A1.unlocked = 1;
areas.A1.visible = 1;
areas.A1.mastery = 0;
areas.A1.maxMastery = 10000;

areas.A2 = {};
areas.A2.name = 'Deep Rainforest';
areas.A2.level = 10;
areas.A2.description = '"The heart of the first bastion of dangers. Many of the animals that live in this forest have not been disturbed for many years; It is unknown how they may react if disturbed. In turn, there are also rumours of an apex hunter lurking in this area."';
areas.A2.active = 0;
areas.A2.unlocked = 1;
areas.A2.mastery = 0;
areas.A2.maxMastery = 10000;

areas.A3 = {};
areas.A3.name = 'Rock-Strewn Plateau';
areas.A3.level = 20;
areas.A3.description = '"A hazardous route lined with cliffs and granite, home to beasts which evolved to the harsh terrain. Their claws were developed to sink into the steep, rocky cliffs and tear apart prey. Some even acquired wings."';
areas.A3.active = 0;
areas.A3.unlocked = 1;
areas.A3.mastery = 0;
areas.A3.maxMastery = 10000;

Object.keys(areas).forEach(function(key) {
  areas[key].id = key;
  areas[key].background = key;
  areas[key].mini = key+"M";      
});















