
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
{ n: "Hard Currency", p: 10, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu1", o: 'buildings["Hard Currency"].v=1;', u: 1, b: 0 },
    
{ n: "Communal Life", p: 4000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu2", o: 'buildings["Communal Life"].v=1;', u: 1, b: 0 },
    
{ n: "Handicraft", p: 6000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu3", o: 'buildings["Handicraft"].v=1;', u: 1, b: 0 },
    
{ n: "Turtle Beliefs", p: 23000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu4", o: 'buildings["Turtle Beliefs"].v=1;', u: 1, b: 0 },
    
{ n: "Empire Zealotry", p: 10000000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu5", o: 'buildings["Empire Zealotry"].v=1;', u: 1, b: 0 },
    
{ n: "Money Printer", p: 4000000000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu6", o: 'buildings["Money Printer"].v=1;', u: 1, b: 0 },
    
{ n: "TurtleLand", p: 25500000000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu7", o: 'buildings["TurtleLand"].v=1;', u: 1, b: 0 },
    
{ n: "Wood Chopping", p: 400, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu8", o: 'buildings["Wood Chopping"].v=1;', u: 1, b: 0 },
    
{ n: "Stone Mining", p: 200000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu9", o: 'buildings["Stone Mining"].v=1;', u: 1, b: 0 },
    
{ n: "Tree Harvest", p: 12000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu10", o: 'buildings["Tree Harvest"].v=1;', u: 1, b: 0 },
    
{ n: "Automatisation", p: 1670000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu11", o: 'buildings["Automatisation"].v=1;', u: 1, b: 0 },
    
{ n: "Asteroid Crusher", p: 69990000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu12", o: 'buildings["Asteroid Crusher"].v=1;', u: 1, b: 0 },
    
{ n: "World Partition", p: 245000000000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu13", o: 'buildings["World Partition"].v=1;', u: 1, b: 0 },
    
{ n: "Bow Hunting", p: 5, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu14", o: 'buildings["Bow Hunting"].v=1;', u: 1, b: 0 },
    
{ n: "Croissant Trap", p: 124600, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu15", o: 'buildings["Croissant Trap"].v=1;', u: 1, b: 0 },
    
{ n: "Agriculture", p: 6222000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu16", o: 'buildings["Agriculture"].v=1;', u: 1, b: 0 },
    
{ n: "Turtle Grandma", p: 746000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu17", o: 'buildings["Turtle Grandma"].v=1;', u: 1, b: 0 },
    
{ n: "Husbandry", p: 715000000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu18", o: 'buildings["Husbandry"].v=1;', u: 1, b: 0 },
    
{ n: "Avocadium", p: 4000000000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu19", o: 'buildings["Avocadium"].v=1;', u: 1, b: 0 },
    
{ n: "Coffee", p: 1556000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu20", o: 'buildings["Coffee"].v=1;', u: 1, b: 0 },
    
{ n: "Kite Generator", p: 271000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu21", o: 'buildings["Kite Generator"].v=1;', u: 1, b: 0 },
    
{ n: "Potato Battery", p: 25670000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu22", o: 'buildings["Potato Battery"].v=1;', u: 1, b: 0 },
    
{ n: "Canned Lightning", p: 1800000000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu23", o: 'buildings["Canned Lightning"].v=1;', u: 1, b: 0 },
    
{ n: "Carbon Burning", p: 8422000000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu24", o: 'buildings["Carbon Burning"].v=1;', u: 1, b: 0 },
    
{ n: "Turtle Generator", p: 688800000000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu25", o: 'buildings["Turtle Generator"].v=1;', u: 1, b: 0 },
    
{ n: "Big Ol Cave", p: 120000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu26", o: 'buildings["Big Ol Cave"].v=1;', u: 1, b: 0 },
    
{ n: "Clay Pottery", p: 18500000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu27", o: 'buildings["Clay Pottery"].v=1;', u: 1, b: 0 },
    
{ n: "Straw Basket", p: 1300000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu28", o: 'buildings["Straw Basket"].v=1;', u: 1, b: 0 },
    
{ n: "Warehouse", p: 125200000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu29", o: 'buildings["Warehouse"].v=1;', u: 1, b: 0 },
    
{ n: "Floppy Disk", p: 7700000000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu30", o: 'buildings["Floppy Disk"].v=1;', u: 1, b: 0 },
    
{ n: "Variable", p: 666000000000000, d: 'Permanently unlocks this activity.', t: "Permanent Upgrade", id: "bu31", o: 'buildings["Variable"].v=1;', u: 1, b: 0 }

     
    
    
    
];





upgrades;