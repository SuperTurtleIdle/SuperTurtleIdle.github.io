
var upgrades = [  // n = name, p = price, d = description, f = flavor text, t = tag, o = outcome, u = unlocked?, b = bought?
    
//-----------click related upgrades
//flat amount
   
{ n: "Extra Petting Hand", p: 50, d: 'Increases the Turtle Coin reward of clicking by +5.', f: '"We are definitely going to need more hands."', t: "Common Upgrade", id: "cf1", o: 'player.coins.perClick += 4', u: 1, b: 0 },
    
{ n: "Turtle Tucker", p: 12500, d: 'Increases the Turtle Coin reward of clicking by +80.', f: '"Wood to see them happy, aint we?"', t: "Common Upgrade", id: "cf2", o: 'player.coins.perClick += 80', u: 1, b: 0 },
    
{ n: "Cold Embrace", p: 120000, d: 'Increases the Turtle Coin reward of clicking by +500.', f: '"Nothing beats the warmth of a fifty-pound stone palm."', t: "Common Upgrade", id: "cf3", o: 'player.coins.perClick += 500', u: 1, b: 0 },
    
{ n: "Green Thumb", p: 990000, d: 'Increases the Turtle Coin reward of clicking by +4000.', f: '"One hundred percent non-GMO turtles guaranteed."', t: "Common Upgrade", id: "cf4", o: 'player.coins.perClick += +4000', u: 1, b: 0 },
    
{ n: "Pat From Beyond The Grave", p: 7500000, d: 'Increases the Turtle Coin reward of clicking by +8000.', f: '"Kind of wholesome, in the forensic sense of the word."', t: "Common Upgrade", id: "cf5", o: 'player.coins.perClick += 8000', u: 1, b: 0 },
    
{ n: "Automated Cuddles", p: 34500000, d: 'Increases the Turtle Coin reward of clicking by +50000.', f: '"In the future, love will be randomly generated."', t: "Common Upgrade", id: "cf6", o: 'player.coins.perClick += 50000', u: 1, b: 0 },
    
{ n: "Kiwi Clicker", p: 774500000, d: 'Increases the Turtle Coin reward of clicking by +300000.', f: '"But thats the wrong animal, you might say."', t: "Common Upgrade", id: "cf7", o: 'player.coins.perClick += 300000', u: 1, b: 0 },
    
{ n: "Passionate Touch", p: 55500000000, d: 'Increases the Turtle Coin reward of clicking by +15000000.', f: '"The turtles will be fine. Your hand, however"', t: "Common Upgrade", id: "cf8", o: 'player.coins.perClick += 1500000', u: 1, b: 0 },
    
{ n: "Crazy Diamond", p: 125500000000, d: 'Increases the Turtle Coin reward of clicking by +77777777.', f: '"This recently discovered patting technique can heal any injury on a turtles body."', t: "Common Upgrade", id: "cf9", o: 'player.coins.perClick += 7777777', u: 1, b: 0 },
    
{ n: "Supernova Touch", p: 555500000000, d: 'Increases the Turtle Coin reward of clicking by +130000000.', f: '"Did you know that turtle shells can survive on space indefinitely?"', t: "Common Upgrade", id: "cf10", o: 'player.coins.perClick += 13000000', u: 1, b: 0 },
    
{ n: "Hellish Embrace", p: 8855000000000, d: 'Increases the Turtle Coin reward of clicking by +66600000000.', f: '"They will join any cult in order to get them pats, ill tell you."', t: "Common Upgrade", id: "cf11", o: 'player.coins.perClick += 66600000000', u: 1, b: 0 },
    
{ n: "Astropat", p: 220000000000000, d: 'Increases the Turtle Coin reward of clicking by +100000000000.', f: '"Scientists are astounded. How can turtles be this wonderful?"', t: "Common Upgrade", id: "cf12", o: 'player.coins.perClick += 100000000000', u: 1, b: 0 }, 
    
//-----------building related upgrades
//------supplies buildings
     
//Bow Hunting
{ n: "Poison Tipped Arrows", p: 885000, d: 'Multiplies the production of Bow Hunting by 2.', f: '"The poison is a strong agent produced by some species of turtles. Dont believe me? You dont want to find it out."', t: "Common Upgrade", id: "bh1", o: 'buildings["Bow Hunting"].u *= 2; buyingHandler2("Bow Hunting");', u: 1, b: 0 },
    
{ n: "Burning Arrows", p: 11250000, d: 'Multiplies the production of Bow Hunting by 2.', f: '"Sometimes the most simple and charred things in life are the best."', t: "Common Upgrade", id: "bh2", o: 'buildings["Bow Hunting"].u *= 2; buyingHandler2("Bow Hunting");', u: 1, b: 0 },
    
{ n: "Diamantine Arrows", p: 122500000, d: 'Multiplies the production of Bow Hunting by 2.', f: '"The hardest material known to mankind. To turtles, however, its as soft as wet toilet paper."', t: "Common Upgrade", id: "bh3", o: 'buildings["Bow Hunting"].u *= 2; buyingHandler2("Bow Hunting");', u: 1, b: 0 },
    
{ n: "Pyrotheum Arrows", p: 714500000000, d: 'Multiplies the production of Bow Hunting by 10.', f: '"Ignited with the sheer passion of turtles."', t: "Common Upgrade", id: "bh4", o: 'buildings["Bow Hunting"].u *= 10; buyingHandler2("Bow Hunting");', u: 1, b: 0 },
    
//Croissant Trap
{ n: "Croissant Net", p: 790000000, d: 'Multiplies the production of Croissant Traps by 2.', f: '"We caught them all on land, now we need to take care of the pesky flying ones."', t: "Common Upgrade", id: "ct1", o: 'buildings["Croissant Trap"].u *= 2; buyingHandler2("Croissant Trap");', u: 1, b: 0 },
    
{ n: "Croisant Web", p: 965000000000, d: 'Multiplies the production of Croissant Traps by 2.', f: '"Did you know that in some parts of the world soccer is played with a croissant instead of a ball? They also call it Croccer."', t: "Common Upgrade", id: "ct2", o: 'buildings["Croissant Trap"].u *= 2; buyingHandler2("Croissant Trap");', u: 1, b: 0 },
    
{ n: "Croissant Rapture", p: 15560000000000, d: 'Multiplies the production of Croissant Traps by 30.', f: '"Dont worry, theyll only get the naughty ones."', t: "Common Upgrade", id: "ct3", o: 'buildings["Croissant Trap"].u *= 30; buyingHandler2("Croissant Trap");', u: 1, b: 0 },
    
//Agriculture
{ n: "Cherry Tree", p: 177700000000, d: 'Multiplies the production of Agriculture by 2.', f: '"Surprisingly normal."', t: "Common Upgrade", id: "ag1", o: 'buildings["Agriculture"].u *= 2; buyingHandler2("Agriculture");', u: 1, b: 0 },
    
{ n: "Orange Tree", p: 1999000000000, d: 'Multiplies the production of Agriculture by 3.', f: '"So far so good."', t: "Common Upgrade", id: "ag2", o: 'buildings["Agriculture"].u *= 3; buyingHandler2("Agriculture");', u: 1, b: 0 },
    
{ n: "Watreemelon", p: 50000000000000, d: 'Multiplies the production of Agriculture by 30.', f: '"Ah, there we go."', t: "Common Upgrade", id: "ag3", o: 'buildings["Agriculture"].u *= 30; buyingHandler2("Agriculture");', u: 1, b: 0 },
    
    
//Turtle Grandma    
{ n: "Sewing Kit", p: 6225000000000, d: 'Multiplies the production of Turtle Grandmas by 9.', f: '"Shes already plotting to take over the cookie box."', t: "Common Upgrade", id: "tg1", o: 'buildings["Turtle Grandma"].u *= 9; buyingHandler2("Turtle Grandma");', u: 1, b: 0 },
    
{ n: "Granny Glasses", p: 399900000000000, d: 'Multiplies the production of Turtle Grandmas by 20.', f: '"To them, however, are just regular glasses."', t: "Common Upgrade", id: "tg2", o: 'buildings["Turtle Grandma"].u *= 10; buyingHandler2("Turtle Grandma");', u: 1, b: 0 },
    
//Husbandry
{ n: "Goat Pen", p: 122400000000000, d: 'Multiplies the production of Husbandry by 25.', f: '"These turtles are looking rather hairy aint them."', t: "Common Upgrade", id: "h1", o: 'buildings["Husbandry"].u *= 30; buyingHandler2("Husbandry");', u: 1, b: 0 },
    
{ n: "Bunny Pen", p: 3650000000000000, d: 'Multiplies the production of Husbandry by 3.', f: '"Multiply constantly your benefits with sheer love."', t: "Common Upgrade", id: "h2", o: 'buildings["Husbandry"].u *= 3; buyingHandler2("Husbandry");', u: 1, b: 0 },
    
//Avocadium    
{ n: "Avocadium Toast", p: 14000000000000000, d: 'Multiplies the production of Avocadium by 6.', f: '"I mean, I know its expensive, but what else im supposed to do with it?"', t: "Common Upgrade", id: "av1", o: 'buildings["Avocadium"].u *= 6; buyingHandler2("Avocadium");', u: 1, b: 0 }, 
    
//------energy buildings
    
//Coffee    
{ n: "Green Tea", p: 2520000000, d: 'Multiplies the production of Coffee by 3.', f: '"Goes well with biscuits"', t: "Common Upgrade", id: "co1", o: 'buildings["Coffee"].u *= 3; buyingHandler2("Coffee");', u: 1, b: 0 },
    
{ n: "Hot Chocolate", p: 60000000000, d: 'Multiplies the production of Coffee by 4.', f: '"One of the oldest beverages known, and also one of the best tasting ones."', t: "Common Upgrade", id: "co2", o: 'buildings["Coffee"].u *= 4; buyingHandler2("Coffee");', u: 1, b: 0 },
    
{ n: "Pumpkin Late", p: 6550000000000, d: 'Multiplies the production of Coffee by 300.', f: '"Buy it now before it gets too late."', t: "Common Upgrade", id: "co3", o: 'buildings["Coffee"].u *= 300; buyingHandler2("Coffee");', u: 1, b: 0 },
    
{ n: "American Coffee", p: 32110000000000, d: 'Multiplies the production of Coffee by 8.', f: '"I honestly dont see the hype behind it."', t: "Common Upgrade", id: "co4", o: 'buildings["Coffee"].u *= 8; buyingHandler2("Coffee");', u: 1, b: 0 },

//Kite Generator   
{ n: "Weather Predictions", p: 9999000000000, d: 'Multiplies the production of Kite Generators by 6.', f: '"Accurately predicts the chances of thunder on the weather to maximise profits."', t: "Common Upgrade", id: "kg1", o: 'buildings["Kite Generator"].u *= 6; buyingHandler2("Kite Generator");', u: 1, b: 0 },
    
{ n: "Storm Generators", p: 16000000000000, d: 'Multiplies the production of Kite Generators by 4.', f: '"The turtles decided that waiting for a storm was simply not worth it."', t: "Common Upgrade", id: "kg2", o: 'buildings["Kite Generator"].u *= 4; buyingHandler2("Kite Generator");', u: 1, b: 0 },
    
{ n: "Electronado", p: 1333000000000000, d: 'Multiplies the production of Kite Generators by 20.', f: '"Well this certainly puts sharks to shame."', t: "Common Upgrade", id: "kg3", o: 'buildings["Kite Generator"].u *= 20; buyingHandler2("Kite Generator");', u: 1, b: 0 },

//Potato Battery
{ n: "Peeled Potatoes", p: 11110000000000, d: 'Multiplies the production of Potato Batteries by 3.', f: '"YEAH SCIENCE"', t: "Common Upgrade", id: "pb1", o: 'buildings["Potato Battery"].u *= 3; buyingHandler2("Potato Battery");', u: 1, b: 0 },
    
{ n: "Cooler Potatoes", p: 120000000000000, d: 'Multiplies the production of Potato Batteries by 7.', f: '"The shades statistically rise the cool factor of your batteries, and hence, their energy gets to be cooler. Or something like that."', t: "Common Upgrade", id: "pb2", o: 'buildings["Potato Battery"].u *= 7; buyingHandler2("Potato Battery");', u: 1, b: 0 },

//Canned Lightning    
{ n: "Safety Disregard", p: 492000000000000, d: 'Multiplies the production of Canned Lightning by 2.', f: '"As it turns out, you get to can much more lightning if you simply dont abide by basic safety rules. The extra income far exceeds the extra casualties."', t: "Common Upgrade", id: "cl1", o: 'buildings["Canned Lightning"].u *= 2; buyingHandler2("Canned Lightning");', u: 1, b: 0 },
    
{ n: "Electron Pride", p: 4000000000000000, d: 'Multiplies the production of Canned Lightning by 5.', f: '"Nobody can tell you what atom to orbit, separate when you feel like so! Engage in nuclear fission!"', t: "Common Upgrade", id: "cl2", o: 'buildings["Canned Lightning"].u *= 5; buyingHandler2("Canned Lightning");', u: 1, b: 0 },

//Carbon Burning    
{ n: "Carbon Endofreezing", p: 6000000000000000, d: 'Multiplies the production of Carbon Burning by 2.', f: '"As it turns out, you can also apply extreme low heat to these things and they will burn too. Who decided to put these things on a ring?"', t: "Common Upgrade", id: "cb1", o: 'buildings["Carbon Burning"].u *= 2; buyingHandler2("Carbon Burning");', u: 1, b: 0 },
    
{ n: "Carbon Pyrocremation", p: 77700000000000000, d: 'Multiplies the production of Carbon Burning by 2.', f: '"Normal fire just didnt make the cut anymore, so we needed to use gray one."', t: "Common Upgrade", id: "cb2", o: 'buildings["Carbon Burning"].u *= 2; buyingHandler2("Carbon Burning");', u: 1, b: 0 },

//------coin buildings
   
//Hard Currency
{ n: "Star-Shaped Candy", p: 32000, d: 'Multiplies the production of Hard Currency by 2.', f: '"The star shape gives it stellar flavor"', t: "Common Upgrade", id: "hc1", o: 'buildings["Hard Currency"].u *= 2; buyingHandler2("Hard Currency");', u: 1, b: 0 },
    
{ n: "Lemon Candies", p: 634000, d: 'Multiplies the production of Hard Currency by 10.', f: '"Arguably the worst ones, but we are not in a position to choose."', t: "Common Upgrade", id: "hc2", o: 'buildings["Hard Currency"].u *= 10; buyingHandler2("Hard Currency");', u: 1, b: 0 },
    
{ n: "Tabasco Candies", p: 12555000, d: 'Multiplies the production of Hard Currency by 2.', f: '"By ruining completely the taste of candy, you guarantee that the turtles only get to use them on economic trades and dont eat their own currency."', t: "Common Upgrade", id: "hc3", o: 'buildings["Hard Currency"].u *= 2; buyingHandler2("Hard Currency");', u: 1, b: 0 },
    
{ n: "Candy Scheme", p: 26660000000000000, d: 'Multiplies the production of Hard Currency by 2.', f: '"Ill give you two candies over the course of a week if you give me one, and so on until the turtle law gets involved."', t: "Common Upgrade", id: "hc4", o: 'buildings["Hard Currency"].u *= 2; buyingHandler2("Hard Currency");', u: 1, b: 0 },
    
{ n: "Trick-or-Treat", p: 2666000000000000000, d: 'Multiplies the production of Hard Currency by 4.', f: '"This festivity is going to have catastrophic consequences for the inflation."', t: "Common Upgrade", id: "hc5", o: 'buildings["Hard Currency"].u *= 4; buyingHandler2("Hard Currency");', u: 1, b: 0 },
 
//Communal Life    
{ n: "Leader of the Village", p: 2000000000, d: 'Multiplies the production of Communal Life by 4.', f: '"One turtle gets to be selected annually to represent their settlement. It doesnt give benefits of any kind, they just like to feel special."', t: "Common Upgrade", id: "li1", o: 'buildings["Communal Life"].u *= 4; buyingHandler2("Communal Life");', u: 1, b: 0 },
    
{ n: "Governor of the Town", p: 162000000000, d: 'Multiplies the production of Communal Life by 6.', f: '"Feeling special was not enough, they are now driven by greed and power."', t: "Common Upgrade", id: "li2", o: 'buildings["Communal Life"].u *= 6; buyingHandler2("Communal Life");', u: 1, b: 0 },
    
{ n: "Lord of the Kingdom", p: 3552000000000, d: 'Multiplies the production of Communal Life by 5.', f: '"Neither democracy nor dictatorship, they simply do not care of law as everything a turtle does will inherently be the right choice. So yes once again its just to make them feel special."', t: "Common Upgrade", id: "li3", o: 'buildings["Communal Life"].u *= 5; buyingHandler2("Communal Life");', u: 1, b: 0 },
    
{ n: "Emperor of the Realm", p: 66665000000000, d: 'Multiplies the production of Communal Life by 30.', f: '"The ruler of the turtle domains now has access to extra sleepy time. Expect rioting soon."', t: "Common Upgrade", id: "li4", o: 'buildings["Communal Life"].u *= 30; buyingHandler2("Communal Life");', u: 1, b: 0 },

//Handicraft    
{ n: "Bunny Carving", p: 552000000000, d: 'Multiplies the production of Handicraft by 5.', f: '"These wooden, artisanal carvings of a bunny remind you of the excellent craftsmanship of the turtles."', t: "Common Upgrade", id: "ha1", o: 'buildings["Handicraft"].u *= 5; buyingHandler2("Handicraft");', u: 1, b: 0 },
    
{ n: "Owl Carving", p: 11552000000000, d: 'Multiplies the production of Handicraft by 2.', f: '"These wooden, artisanal carvings of an owl remind you of the excellent sight of the turtles."', t: "Common Upgrade", id: "ha2", o: 'buildings["Handicraft"].u *= 2; buyingHandler2("Handicraft");', u: 1, b: 0 },
    
{ n: "Cheese Carving", p: 777770000000000, d: 'Multiplies the production of Handicraft by 2.', f: '"These wooden, artisanal carvings of cheese remind you of cheese."', t: "Common Upgrade", id: "ha3", o: 'buildings["Handicraft"].u *= 2; buyingHandler2("Handicraft");', u: 1, b: 0 },
   
//Turtle Beliefs    
{ n: "Omnipresence", p: 11552000000000, d: 'Multiplies the production of Turtle Beliefs by 2.', f: '"What if I told you that there is a primordial, transcendental turtle that\'s currently watching you in this very moment? Would it make you feel more safe? No?"', t: "Common Upgrade", id: "tb1", o: 'buildings["Turtle Beliefs"].u *= 2; buyingHandler2("Turtle Beliefs");', u: 1, b: 0 },
    
{ n: "Omniscience", p: 321552000000000, d: 'Multiplies the production of Turtle Beliefs by 4.', f: '"It knows."', t: "Common Upgrade", id: "tb2", o: 'buildings["Turtle Beliefs"].u *= 4; buyingHandler2("Turtle Beliefs");', u: 1, b: 0 },
    
{ n: "Omnipotence", p: 7771552000000000, d: 'Multiplies the production of Turtle Beliefs by 3.', f: '"If you don\'t believe in it, it\'s simply because it didn\'t want you to believe."', t: "Common Upgrade", id: "tb3", o: 'buildings["Turtle Beliefs"].u *= 3; buyingHandler2("Turtle Beliefs");', u: 1, b: 0 },

//Empire Zealotry    
{ n: "A really big red tower", p: 8800000000000000, d: 'Multiplies the production of Empire Zealotry by 2.', f: '"We erected this big tower in honor of all the things that are red and tall."', t: "Common Upgrade", id: "ez1", o: 'buildings["Empire Zealotry"].u *= 2; buyingHandler2("Empire Zealotry");', u: 1, b: 0 },
    
{ n: "Extra Time", p: 12000000000000000, d: 'Multiplies the production of Empire Zealotry by 2.', f: '"You came to the conclusion that longer days equal longer production, so you decided to sneak a couple of extra hours into every day."', t: "Common Upgrade", id: "ez2", o: 'buildings["Empire Zealotry"].u *= 2; buyingHandler2("Empire Zealotry");', u: 1, b: 0 },

//Money Printers    
{ n: "Thicker Bills", p: 621552000000000, d: 'Multiplies the production of Money Printers by 2.', f: '"By increasing the size of your money, your pockets effectively became heavier."', t: "Common Upgrade", id: "mp1", o: 'buildings["Money Printer"].u *= 2; buyingHandler2("Money Printers");', u: 1, b: 0 },
    
{ n: "Flying Funds", p: 6600000000000000, d: 'Multiplies the production of Money Printers by 2.', f: '"Where are they flying? Only the turtles pocket knows."', t: "Common Upgrade", id: "mp2", o: 'buildings["Money Printer"].u *= 2; buyingHandler2("Money Printer");', u: 1, b: 0 },

//TurtleLand    
{ n: "Global Inauguration", p: 98600000000000000, d: 'Multiplies the production of TurtleLand by 2.', f: '"And I really mean Global Inauguration. The entire globe is now part of TurtleLand."', t: "Common Upgrade", id: "tl1", o: 'buildings["TurtleLand"].u *= 2; buyingHandler2("TurtleLand");', u: 1, b: 0 },

//------resource buildings
//Wood Chopping    
{ n: "Thicker Stumps", p: 1250000, d: 'Multiplies the production of Wood Chopping by 2.', f: '"It was hard to achieve this, but we finally convinced the trees."', t: "Common Upgrade", id: "wc1", o: 'buildings["Wood Chopping"].u *= 2; buyingHandler2("Wood Chopping");', u: 1, b: 0 },
    
{ n: "Rich Trunks", p: 69000000, d: 'Multiplies the production of Wood Chopping by 10.', f: '"Not in the economic sense of the word. Not yet at least."', t: "Common Upgrade", id: "wc2", o: 'buildings["Wood Chopping"].u *= 10; buyingHandler2("Wood Chopping");', u: 1, b: 0 },
    
{ n: "Flourished Logs", p: 9000000000, d: 'Multiplies the production of Wood Chopping by 10.', f: '"Nutrients and care on the soil has repaid us with pretty and colorful flowers, which we can blend and mush together for more even more resources."', t: "Common Upgrade", id: "wc3", o: 'buildings["Wood Chopping"].u *= 10; buyingHandler2("Wood Chopping");', u: 1, b: 0 },
    
{ n: "Tree Hollowing", p: 30000000000000, d: 'Multiplies the production of Wood Chopping by 20.', f: '"An unorthodox technique for sure, but trees dont seem to mind. Or at the very least, they are not voicing their complaints."', t: "Common Upgrade", id: "wc4", o: 'buildings["Wood Chopping"].u *= 20; buyingHandler2("Wood Chopping");', u: 1, b: 0 },

//Stone Mining    
{ n: "Geode Vein", p: 5200000000, d: 'Multiplies the production of Stone Minning by 2.', f: '"Stone inside stones, just what we needed."', t: "Common Upgrade", id: "sm1", o: 'buildings["Stone Mining"].u *= 2; buyingHandler2("Stone Mining");', u: 1, b: 0 },
    
{ n: "Dynamite Mining", p: 188800000000, d: 'Multiplies the production of Stone Minning by 10.', f: '"Why is it that most problems in life get to be solved with explosives."', t: "Common Upgrade", id: "sm2", o: 'buildings["Stone Mining"].u *= 10; buyingHandler2("Stone Mining");', u: 1, b: 0 },
    
{ n: "Erosive Minning", p: 77700000000000, d: 'Multiplies the production of Stone Minning by 10.', f: '"Let the water do all the hard work for you if you have three hundred thousand years to spare."', t: "Common Upgrade", id: "sm3", o: 'buildings["Stone Mining"].u *= 10; buyingHandler2("Stone Mining");', u: 1, b: 0 },

//Tree Harvest    
{ n: "Treepopulation", p: 100000000000, d: 'Multiplies the production of Tree Harvest by 3.', f: '"They are only condemning their own child."', t: "Common Upgrade", id: "th1", o: 'buildings["Tree Harvest"].u *= 3; buyingHandler2("Tree Harvest");', u: 1, b: 0 },
    
{ n: "Overplantation", p: 420000000000000, d: 'Multiplies the production of Tree Harvest by 15.', f: '"With our hard efforts, we managed to repoblate the trees of all over the world as if turtles never chopped them down in the first place. Lets chop them down again."', t: "Common Upgrade", id: "th2", o: 'buildings["Tree Harvest"].u *= 15; buyingHandler2("Tree Harvest");', u: 1, b: 0 },

//Automatisation    
{ n: "Robot Syndicate", p: 120000000000000, d: 'Multiplies the production of Automatisation by 4.', f: '"Unite all the robot labor and convince them to work harder."', t: "Common Upgrade", id: "am1", o: 'buildings["Automatisation"].u *= 4; buyingHandler2("Automatisation");', u: 1, b: 0 },
    
{ n: "Cloud Saving", p: 4120000000000000, d: 'Multiplies the production of Automatisation by 2.', f: '"When a robot breaks appart, their consciousness gets to be transferred to another machine, which ensures to not pay the same robot twice."', t: "Common Upgrade", id: "am2", o: 'buildings["Automatisation"].u *= 2; buyingHandler2("Automatisation");', u: 1, b: 0 },

//Asteroid Crushers    
{ n: "Comet Sonar", p: 14500000000000000, d: 'Multiplies the production of Asteroid Crushers by 4.', f: '"Makes sure nothing in space gets to go unnoticed and turned into resources."', t: "Common Upgrade", id: "ac1", o: 'buildings["Asteroid Crusher"].u *= 4; buyingHandler2("Asteroid Crusher");', u: 1, b: 0 },
 
//-----------general upgrades
//------supplies
{ n: "Cheese on a Turtle", p: 17300, d: 'Increases the production of all Supplies by 3%.', f: '"Why it always got to be cheese."', t: "Common Upgrade", id: "gs1", o: 'player.supplies.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Turtle Dinner", p: 66780, d: 'Increases the production of all Supplies by 3%.', f: '"For turtles, not out of turtles."', t: "Common Upgrade", id: "gs2", o: 'player.supplies.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Polinisation", p: 890000, d: 'Increases the production of all Supplies by 3%.', f: '"Bees are the friends of turtles. Wasps, however."', t: "Common Upgrade", id: "gs3", o: 'player.supplies.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Floral Season", p: 89000000, d: 'Increases the production of all Supplies by 3%.', f: '"On days like these, turtles like you should be playing outside."', t: "Common Upgrade", id: "gs4", o: 'player.supplies.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Emergency Ration", p: 555000000, d: 'Increases the production of all Supplies by 3%.', f: '"Just a quick emergency snack, not much more."', t: "Common Upgrade", id: "gs5", o: 'player.supplies.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "A lot of Cheese", p: 2225000000, d: 'Increases the production of all Supplies by 3%.', f: '"It would only make so much sense."', t: "Common Upgrade", id: "gs6", o: 'player.supplies.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Breadman", p: 555000000000, d: 'Increases the production of all Supplies by 3%.', f: '"The scientific name for this one is Uomo Panem."', t: "Common Upgrade", id: "gs7", o: 'player.supplies.upgrades += 0.03', u: 1, b: 0 },

//------energy    
{ n: "Polished Shells", p: 55550000, d: 'Increases the production of all Energy by 3%.', f: '"Frictionless turtles move faster, that much should be public knowledge."', t: "Common Upgrade", id: "ge1", o: 'player.energy.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Environmental Advantage", p: 460000000, d: 'Increases the production of all Energy by 3%.', f: '"Proper understanding of nature can be used to gut-punch it into submission."', t: "Common Upgrade", id: "ge2", o: 'player.energy.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Magmatic Tidal Generators", p: 35000000000, d: 'Increases the production of all Energy by 3%.', f: '"The turtles are too impatient to choose one of the two at a time."', t: "Common Upgrade", id: "ge3", o: 'player.energy.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Coffee Flooding", p: 5560000000000, d: 'Increases the production of all Energy by 3%.', f: '"Also known as Java overflow."', t: "Common Upgrade", id: "ge4", o: 'player.energy.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Additional Bones", p: 22300000000000, d: 'Increases the production of all Energy by 3%.', f: '"We are getting to sciency with this one, I know."', t: "Common Upgrade", id: "ge5", o: 'player.energy.upgrades += 0.03', u: 1, b: 0 },

//------coins    
{ n: "Cherry", p: 2500, d: 'Increases the production of all Turtle Coins by 3%.', f: '"They do be cherries."', t: "Common Upgrade", id: "gc1", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Strawberry", p: 27200, d: 'Increases the production of all Turtle Coins by 3%.', f: '"Turtles favorites."', t: "Common Upgrade", id: "gc2", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Mango", p: 99000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"Tropical turtles require tropical fruits after all."', t: "Common Upgrade", id: "gc3", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Cheese", p: 685000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"Cheese."', t: "Common Upgrade", id: "gc4", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Corn", p: 1200000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"Id mention all the benefits of corn, but all I could came up with was popcorn."', t: "Common Upgrade", id: "gc5", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Banana", p: 5200000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"Did you know bananas used to have bigger seeds? Turtles werent happy with that choice."', t: "Common Upgrade", id: "gc6", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Watermelon", p: 80000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"This is the actual favorite of the turtles."', t: "Common Upgrade", id: "gc7", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Bread", p: 122200000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"No need to be fancy to gain a turtle\'s heart."', t: "Common Upgrade", id: "gc8", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Pretzel", p: 750000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"From the German, meaning "twisty salty turtle.""', t: "Common Upgrade", id: "gc9", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Pancake", p: 1000000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"The shameless brother of the crêpe."', t: "Common Upgrade", id: "gc10", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Taco", p: 4500000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"The possibilities are endless, as long as your mouth gets to be big enough."', t: "Common Upgrade", id: "gc11", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Burrito", p: 11000000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"This time, the content gets to be limited by physics."', t: "Common Upgrade", id: "gc12", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Pie", p: 40000000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"Pie flavored."', t: "Common Upgrade", id: "gc13", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Slice of Cake", p: 555000000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"I\'d lie if I told you I don\'t want to make an obvious reference."', t: "Common Upgrade", id: "gc14", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Fortune Cookie", p: 6000000000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"As lucky as a person getting to eat a cookie can be."', t: "Common Upgrade", id: "gc15", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Cupcake", p: 12220000000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"Muffin wrong with these."', t: "Common Upgrade", id: "gc16", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "A Cake", p: 66660000000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"Happy turtle day!"', t: "Common Upgrade", id: "gc17", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Boba Tea", p: 89990000000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"The only way chewing and drinking at the same time don\'t get to be gross."', t: "Common Upgrade", id: "gc18", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Sprinkled Bread", p: 120000000000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"You aren\'t fooling anyone with this."', t: "Common Upgrade", id: "gc19", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Hamburger", p: 333300000000000, d: 'Increases the production of all Turtle Coins by 3%.', f: '"From the popular state of Hamburg, Turtlevile."', t: "Common Upgrade", id: "gc20", o: 'player.coins.upgrades += 0.03', u: 1, b: 0 },

//------resources    
{ n: "Material Hypercompression", p: 44000, d: 'Increases the production of all Resources by 3%.', f: '"As it turns out, everything eventually forms into diamonds if you press hard enough"', t: "Common Upgrade", id: "gr1", o: 'player.resources.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Forest Diversity", p: 3400000, d: 'Increases the production of all Resources by 3%.', f: '"The turtles don\'t judge, as long as they don\'t put up a fight."', t: "Common Upgrade", id: "gr2", o: 'player.resources.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Coal Ignition", p: 13400000, d: 'Increases the production of all Resources by 3%.', f: '"But why go back to such primitive methods? It\'s simple, we forgot you could do that."', t: "Common Upgrade", id: "gr3", o: 'player.resources.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Recycled Paper", p: 666400000, d: 'Increases the production of all Resources by 3%.', f: '"At the end of the day, recycling benefits everyone, except the wood that needs to suffer twice."', t: "Common Upgrade", id: "gr4", o: 'player.resources.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Sound Mufflers", p: 95000000000, d: 'Increases the production of all Resources by 3%.', f: '"Protects their turtle ears from all the screams of the resources they are trying to gather."', t: "Common Upgrade", id: "gr5", o: 'player.resources.upgrades += 0.03', u: 1, b: 0 },
    
{ n: "Brand Chickens", p: 1895000000000, d: 'Increases the production of all Resources by 3%.', f: '"This breed has been genetically modified to suit the scope of your turtle kingdom. What are we even supposed to do with regular eggs?"', t: "Common Upgrade", id: "gr6", o: 'player.resources.upgrades += 0.03', u: 1, b: 0 },

//-----------misc upgrades   
   
{ n: "National Turtle Day", p: 9999999, d: 'Increases the production of everything by 2%.', f: '"Every day should be turtle day."', t: "Common Upgrade", id: "mu1", o: 'player.coins.upgrades += 0.02; player.resources.upgrades += 0.02; player.supplies.upgrades += 0.02; player.energy.upgrades += 0.02', u: 1, b: 0 },
    
{ n: "Sands of Time", p: 99999999, d: 'Increases the production of your Turtle Coins by 1% for every hour played', f: '"Everything feels doable now that time ain\'t an issue."', t: "Common Upgrade", id: "mu2", o: 'player.coins.upgrades += (stats.totalSeconds / 3600) / 10', u: 1, b: 0 }, //e
    
{ n: "A Turtle for your Turtles", p: 999999999, d: 'Increases the production of your Turtle Coins by 0.1% for every upgrade purchased.', f: '"Everyone deserves a turtle. Even turtles."', t: "Common Upgrade", id: "mu3", o: 'player.coins.upgrades += (stats.totalUpgrades) / 100', u: 1, b: 0 },
    
{ n: "Self-Improvement", p: 9999999999, d: 'Increases the Turtle Coin reward of clicking by 5% of your coins per second.', f: '"Give yourself a pat on the back."', t: "Common Upgrade", id: "mu4", o: 'player.coins.upgradesClick += (player.coins.second) / 5', u: 1, b: 0 }, 
    
{ n: "World Coverage", p: 99999999999, d: 'Increases the Turtle Coin reward of clicking by 0.1% for every upgrade purchased.', f: '"Your turtles appear all over the news, congratulations!"', t: "Common Upgrade", id: "mu5", o: 'player.coins.upgradesClick += player.coins.upgradesClick * (stats.totalUpgrades) / 100', u: 1, b: 0 },
    
{ n: "Turtle Balloons", p: 999999999999, d: 'Increases the Turtle Coin reward of clicking by 5% of your coins per second.', f: '"It\'s a turtle, you\'ll have to believe me on this one."', t: "Common Upgrade", id: "mu6", o: 'player.coins.upgradesClick += (player.coins.second) / 5', u: 1, b: 0 },
    
{ n: "Sky Society", p: 9999999999999, d: 'Increases the Turtle Coin reward of clicking by 400000% of every building that you own.', f: '"Rising the housing into an all-time high."', t: "Common Upgrade", id: "mu7", o: 'player.coins.upgradesClick += (stats.totalBuildings) * 4000', u: 1, b: 0 },
      
{ n: "Wooden Society", p: 99999999999999, d: 'Increases the production of all Turtle Coins 0.01% for every building that you own.', f: '"Back to the basics."', t: "Common Upgrade", id: "mu8", o: 'player.coins.upgrades += (stats.totalBuildings) / 1000', u: 1, b: 0 },

    
//-----------permanent upgrades
//------building uncock    
{ n: "Hard Currency", p: 10, d: 'Permanently unlocks this activity on the Turtle Coins tab.', f: '"Sweet, sweet economics."', t: "Permanent Upgrade", id: "bu1", o: 'buildings["Hard Currency"].v=1;', u: 1, b: 0 },
    
{ n: "Communal Life", p: 4000, d: 'Permanently unlocks this activity on the Turtle Coins tab.', f: '"He who controls the candy controls the people."', t: "Permanent Upgrade", id: "bu2", o: 'buildings["Communal Life"].v=1;', u: 1, b: 0 },
    
{ n: "Handicraft", p: 6000000, d: 'Permanently unlocks this activity on the Turtle Coins tab.', f: '"Bet ya didnt knew turtles could do that."', t: "Permanent Upgrade", id: "bu3", o: 'buildings["Handicraft"].v=1;', u: 1, b: 0 },
    
{ n: "Turtle Beliefs", p: 23000000, d: 'Permanently unlocks this activity on the Turtle Coins tab.', f: '"Do turtles dream of scaley sheep?"', t: "Permanent Upgrade", id: "bu4", o: 'buildings["Turtle Beliefs"].v=1;', u: 1, b: 0 },
    
{ n: "Empire Zealotry", p: 10000000000, d: 'Permanently unlocks this activity on the Turtle Coins tab.', f: '"Domain expansion."', t: "Permanent Upgrade", id: "bu5", o: 'buildings["Empire Zealotry"].v=1;', u: 1, b: 0 },
    
{ n: "Money Printer", p: 4000000000000, d: 'Permanently unlocks this activity on the Turtle Coins tab.', f: '"Banned in over sixty turtle kingdoms."', t: "Permanent Upgrade", id: "bu6", o: 'buildings["Money Printer"].v=1;', u: 1, b: 0 },
    
{ n: "TurtleLand", p: 25500000000000, d: 'Permanently unlocks this activity on the Turtle Coins tab.', f: '"The turtliest place on earth."', t: "Permanent Upgrade", id: "bu7", o: 'buildings["TurtleLand"].v=1;', u: 1, b: 0 },
    
{ n: "Wood Chopping", p: 400, d: 'Permanently unlocks this activity on the Resources tab.', f: '"Everyone must start somewhere."', t: "Permanent Upgrade", id: "bu8", o: 'buildings["Wood Chopping"].v=1;', u: 1, b: 0 },
    
{ n: "Stone Mining", p: 200000, d: 'Permanently unlocks this activity on the Resources tab.', f: '"Both unethical AND profitable."', t: "Permanent Upgrade", id: "bu9", o: 'buildings["Stone Mining"].v=1;', u: 1, b: 0 },
    
{ n: "Tree Harvest", p: 12000000, d: 'Permanently unlocks this activity on the Resources tab.', f: '"Make them pay for being made up of resources."', t: "Permanent Upgrade", id: "bu10", o: 'buildings["Tree Harvest"].v=1;', u: 1, b: 0 },
    
{ n: "Automatisation", p: 1670000000, d: 'Permanently unlocks this activity on the Resources tab.', f: '"We cant spend all the time chopping wood, we have an empire to lift."', t: "Permanent Upgrade", id: "bu11", o: 'buildings["Automatisation"].v=1;', u: 1, b: 0 },
    
{ n: "Asteroid Crusher", p: 69990000000, d: 'Permanently unlocks this activity on the Resources tab.', f: '"Earth is a tiny marble compared to all the resources all there."', t: "Permanent Upgrade", id: "bu12", o: 'buildings["Asteroid Crusher"].v=1;', u: 1, b: 0 },
    
{ n: "World Partition", p: 245000000000000, d: 'Permanently unlocks this activity on the Resources tab.', f: '"Surely this is not getting out of hand."', t: "Permanent Upgrade", id: "bu13", o: 'buildings["World Partition"].v=1;', u: 1, b: 0 },
    
{ n: "Bow Hunting", p: 5, d: 'Permanently unlocks this activity on the Supplies tab.',  f: '"The humble beginnings of your civilisation."', t: "Permanent Upgrade", id: "bu14", o: 'buildings["Bow Hunting"].v=1;', u: 1, b: 0 },
    
{ n: "Croissant Trap", p: 124600, d: 'Permanently unlocks this activity on the Supplies tab.', f: '"Uses advanced psychological games to trick them."', t: "Permanent Upgrade", id: "bu15", o: 'buildings["Croissant Trap"].v=1;', u: 1, b: 0 },
    
{ n: "Agriculture", p: 6222000, d: 'Permanently unlocks this activity on the Supplies tab.', f: '"Hard to not chew on them while they are growing out. At least of the turties."', t: "Permanent Upgrade", id: "bu16", o: 'buildings["Agriculture"].v=1;', u: 1, b: 0 },
    
{ n: "Turtle Grandma", p: 746000000, d: 'Permanently unlocks this activity on the Supplies tab.', f: '"Surely they wont revolt this time."', t: "Permanent Upgrade", id: "bu17", o: 'buildings["Turtle Grandma"].v=1;', u: 1, b: 0 },
    
{ n: "Husbandry", p: 715000000000, d: 'Permanently unlocks this activity on the Supplies tab.', f: '"Slavery is legal as long as they are not aware of this fact."', t: "Permanent Upgrade", id: "bu18", o: 'buildings["Husbandry"].v=1;', u: 1, b: 0 },
    
{ n: "Avocadium", p: 4000000000000, d: 'Permanently unlocks this activity on the Supplies tab.', f: '"If avocados are expensive imagine these things."', t: "Permanent Upgrade", id: "bu19", o: 'buildings["Avocadium"].v=1;', u: 1, b: 0 },
    
{ n: "Coffee", p: 1556000, d: 'Permanently unlocks this activity on the Energy tab.', f: '"One thousand ways to make it, one to drink it."', t: "Permanent Upgrade", id: "bu20", o: 'buildings["Coffee"].v=1;', u: 1, b: 0 },
    
{ n: "Kite Generator", p: 271000000, d: 'Permanently unlocks this activity on the Energy tab.',  f: '"Take that Franklin!"', t: "Permanent Upgrade", id: "bu21", o: 'buildings["Kite Generator"].v=1;', u: 1, b: 0 },
    
{ n: "Potato Battery", p: 25670000000, d: 'Permanently unlocks this activity on the Energy tab.', f: '"100% free* of neurotoxins!"', t: "Permanent Upgrade", id: "bu22", o: 'buildings["Potato Battery"].v=1;', u: 1, b: 0 },
    
{ n: "Canned Lightning", p: 1800000000000, d: 'Permanently unlocks this activity on the Energy tab.', f: '"Its hard to explain."', t: "Permanent Upgrade", id: "bu23", o: 'buildings["Canned Lightning"].v=1;', u: 1, b: 0 },
    
{ n: "Carbon Burning", p: 8422000000000, d: 'Permanently unlocks this activity on the Energy tab.', f: '"This is the best thing that your turtle scientists could come up with, dont laugh."', t: "Permanent Upgrade", id: "bu24", o: 'buildings["Carbon Burning"].v=1;', u: 1, b: 0 },
    
{ n: "Turtle Generator", p: 688800000000000, d: 'Permanently unlocks this activity on the Energy tab.', f: '"What if we use 1% of a turtles power?"', t: "Permanent Upgrade", id: "bu25", o: 'buildings["Turtle Generator"].v=1;', u: 1, b: 0 },
    
{ n: "Big Ol Cave", p: 120000, d: 'Permanently unlocks this activity on the Storage tab.', f: '"You probably want to save for this."', t: "Permanent Upgrade", id: "bu26", o: 'buildings["Big Ol Cave"].v=1;', u: 1, b: 0 },
    
{ n: "Clay Pottery", p: 18500000, d: 'Permanently unlocks this activity on the Storage tab.', f: '"Deeper than it looks."', t: "Permanent Upgrade", id: "bu27", o: 'buildings["Clay Pottery"].v=1;', u: 1, b: 0 },
    
{ n: "Straw Basket", p: 1300000000, d: 'Permanently unlocks this activity on the Storage tab.', f: '"Way deeper than it looks."', t: "Permanent Upgrade", id: "bu28", o: 'buildings["Straw Basket"].v=1;', u: 1, b: 0 },
    
{ n: "Warehouse", p: 125200000000, d: 'Permanently unlocks this activity on the Storage tab.', f: '"Roomier than your average room."', t: "Permanent Upgrade", id: "bu29", o: 'buildings["Warehouse"].v=1;', u: 1, b: 0 },
    
{ n: "Floppy Disk", p: 7700000000000, d: 'Permanently unlocks this activity on the Storage tab.', f: '"A blast from the past."', t: "Permanent Upgrade", id: "bu30", o: 'buildings["Floppy Disk"].v=1;', u: 1, b: 0 },
    
{ n: "Variable", p: 666000000000000, d: 'Permanently unlocks this activity on the Storage tab.', f: '"unlimitedStorage()."', t: "Permanent Upgrade", id: "bu31", o: 'buildings["Variable"].v=1;', u: 1, b: 0 },
    
//------penguin helper upgrades
    
{ n: "Penguin Helpers", p: 1000000, d: 'Permanently unlocks Penguin Helpers. These slippery fellows will assist on your production while you are offline.', f: '"Welcome to the team, little fellas."', t: "Permanent Upgrade", id: "pe1", o: 'unlockItem("img/sys/penguinRecap.png", "ㅤPenguin Asistantsㅤ"); unlocks.penguins = 1; did("penguinBox").style.display = "flex"; player.penguins.amount = 1;', u: 1, b: 0 }, 
    
{ n: "Just a Penguin", p: 12000000, d: 'Adds 10 Penguin Helpers.', f: '"Theres actually more than just one."', t: "Common Upgrade", id: "pe2", o: 'player.penguins.amount += 10;', u: 1, b: 0 },
    
{ n: "Penwin Medalist", p: 755000000, d: 'Adds one Penguin Helper per achievement unlocked.', f: '"See what I did there?"', t: "Common Upgrade", id: "pe3", o: 'player.penguins.amount += stats.totalAchievementsGot', u: 1, b: 0 },
    
{ n: "Peguin Helper Helpers", p: 6955000000, d: 'Adds one Penguin Helper per every 100000 energy.', f: '"But who helps the Penguin Helper Helpers?"', t: "Common Upgrade", id: "pe4", o: 'player.penguins.amount += Math.floor(player.energy.amount / 100000)', u: 1, b: 0 },
    
{ n: "Penguin-In-A-Box", p: 20000000000, d: 'Adds one Penguin Helper for every hour played.', f: '"Who put you there little buddy?"', t: "Common Upgrade", id: "pe5", o: 'player.penguins.amount += Math.floor(stats.timePlayed / 3600)', u: 1, b: 0 },     
    
{ n: "Emperor Penguin", p: 73330000000, d: 'Adds one Penguin Helper for every 100 building owned.', f: '"Royaly fluffy"', t: "Common Upgrade", id: "pe6", o: 'player.penguins.amount += Math.floor(stats.totalBuildings / 100)', u: 1, b: 0 },
    
//-------treaty upgrades
//---treaty of Resources    
/*
{ n: "Law of Materialism", p: 1000000, d: '30% of both your Supplies and Energy production per second gets transformed into Resources per second.', f: '"We definitely need to build additional pylons."', t: "Law Upgrade", id: "tr1", o: 'unlockItem("img/sys/penguinRecap.png", "ㅤPenguin Asistantsㅤ"); unlocks.penguins = 1; did("penguinBox").style.display = "flex"; player.penguins.amount = 1;', u: 1, b: 0 },
    
{ n: "Law of Natural Reserves", p: 1000000, d: 'All Resource production now contributes your Resource per second twice.', f: '"Natural reserves are in fact, no longer natural, and of the penguins."', t: "Law Upgrade", id: "tr2", o: 'unlockItem("img/sys/penguinRecap.png", "ㅤPenguin Asistantsㅤ"); unlocks.penguins = 1; did("penguinBox").style.display = "flex"; player.penguins.amount = 1;', u: 1, b: 0 }, 
    
{ n: "Law of Bountiful Resources", p: 1000000, d: 'Permanently unlocks the Bountiful Resources upgrade.', f: '"We order those minerals to get chunkier."', t: "Law Upgrade", id: "tr2", o: 'unlockItem("img/sys/penguinRecap.png", "ㅤPenguin Asistantsㅤ"); unlocks.penguins = 1; did("penguinBox").style.display = "flex"; player.penguins.amount = 1;', u: 1, b: 0 },
    
{ n: "Bountiful Resources", p: 666000000000000, d: 'Multiplies your resource production by 2.', f: '"They did got chunkier."', t: "Permanent Upgrade", id: "bu31", o: 'buildings["Variable"].v=1;', u: 0, b: 0 },    
    
{ n: "Law of Trophy Reconstruction", p: 1000000, d: 'Your Resources production gets increased 10% for every achievement obtained', f: '"We dont need a sensation of gratification, we need a sensation of fat resources."', t: "Law Upgrade", id: "tr2", o: 'unlockItem("img/sys/penguinRecap.png", "ㅤPenguin Asistantsㅤ"); unlocks.penguins = 1; did("penguinBox").style.display = "flex"; player.penguins.amount = 1;', u: 1, b: 0 },    
    
{ n: "Law of the Conversion of Matter", p: 1000000, d: 'An additional 50% of both your Supplies and Energy production per second gets transformed into Resources per second.', f: '"Conversion into more matter, of course."', t: "Law Upgrade", id: "tr2", o: 'unlockItem("img/sys/penguinRecap.png", "ㅤPenguin Asistantsㅤ"); unlocks.penguins = 1; did("penguinBox").style.display = "flex"; player.penguins.amount = 1;', u: 1, b: 0 },
    
{ n: "Law of Artesany", p: 1000000, d: 'Your Resources production gets increased 10% for every penguin obtained', f: '"If you dont work with materials, youre out."', t: "Law Upgrade", id: "tr2", o: 'unlockItem("img/sys/penguinRecap.png", "ㅤPenguin Asistantsㅤ"); unlocks.penguins = 1; did("penguinBox").style.display = "flex"; player.penguins.amount = 1;', u: 1, b: 0 },
    
 { n: "Law of Space Gathering", p: 1000000, d: 'Permanently unlocks the Asteroid Crusher upgrade.', f: '"Bigger resources require bigger rocks."', t: "Law Upgrade", id: "tr2", o: 'unlockItem("img/sys/penguinRecap.png", "ㅤPenguin Asistantsㅤ"); unlocks.penguins = 1; did("penguinBox").style.display = "flex"; player.penguins.amount = 1;', u: 1, b: 0 },   
    
{ n: "Law of Artesany", p: 1000000, d: 'Your Resources production gets increased 10% for every penguin obtained', f: '"If you dont work with materials, youre out."', t: "Law Upgrade", id: "tr2", o: 'unlockItem("img/sys/penguinRecap.png", "ㅤPenguin Asistantsㅤ"); unlocks.penguins = 1; did("penguinBox").style.display = "flex"; player.penguins.amount = 1;', u: 1, b: 0 },     
*/
];

upgrades;

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



