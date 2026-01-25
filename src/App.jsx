import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Utensils, Info, ZoomIn, ZoomOut } from "lucide-react";
import "./App.css";

// Map data URL (World Atlas - 50m resolution for cleaner borders)
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

// Cuisine data by country
const foodData = {
  "South Korea": [
    { name: "Kimchi", desc: "National Dish. Spicy fermented Napa cabbage, essential at every meal.", image: "https://loremflickr.com/400/300/kimchi,korean" },
    { name: "Jeonju Bibimbap", desc: "Jeonju. Rice bowl topped with sautéed vegetables, chili paste, and raw beef.", image: "https://loremflickr.com/400/300/bibimbap,food" },
    { name: "Bulgogi", desc: "National. Thinly sliced marinated beef grilled over charcoal.", image: "https://loremflickr.com/400/300/bulgogi,beef" },
    { name: "Samgyeopsal", desc: "National. Grilled pork belly, often wrapped in lettuce with garlic and ssamjang.", image: "https://loremflickr.com/400/300/samgyeopsal,pork" },
    { name: "Tteokbokki", desc: "Street Food. Chewy rice cakes cooked in a spicy, sweet gochujang sauce.", image: "https://loremflickr.com/400/300/tteokbokki,spicy" },
    { name: "Samgyetang", desc: "Summer favorite. Ginseng chicken soup, stuffed with sticky rice and medicinal herbs.", image: "https://loremflickr.com/400/300/samgyetang,soup" },
    { name: "Jajangmyeon", desc: "Incheon. Noodle dish topped with a thick sauce made of chunjang, diced pork, and vegetables.", image: "https://loremflickr.com/400/300/jajangmyeon,noodle" },
    { name: "Chimaek (Korean Fried Chicken)", desc: "National. Double-fried crispy chicken served with cold beer.", image: "https://loremflickr.com/400/300/friedchicken,beer" },
    { name: "Naengmyeon", desc: "Pyongyang/Hamhung. Cold buckwheat noodles served in a chilled broth or spicy sauce.", image: "https://loremflickr.com/400/300/naengmyeon,noodles" },
    { name: "Hotteok", desc: "Busan. Sweet Korean pancake filled with brown sugar, honey, chopped peanuts, and cinnamon.", image: "https://loremflickr.com/400/300/hotteok,dessert" }
  ],
  "Japan": [
    { name: "Sushi", desc: "Tokyo. Vinegared rice with raw seafood. Try 'Edomae' style in Tokyo.", image: "https://loremflickr.com/400/300/sushi,japan" },
    { name: "Hakata Ramen", desc: "Fukuoka. Rich, milky tonkotsu (pork bone) broth with thin noodles.", image: "https://loremflickr.com/400/300/ramen,tonkotsu" },
    { name: "Okonomiyaki", desc: "Osaka/Hiroshima. Savory pancake containing a variety of ingredients like cabbage and pork.", image: "https://loremflickr.com/400/300/okonomiyaki,food" },
    { name: "Takoyaki", desc: "Osaka. Ball-shaped snack made of a wheat flour-based batter and cooked in a special molded pan.", image: "https://loremflickr.com/400/300/takoyaki,food" },
    { name: "Tempura", desc: "Tokyo. Seafood or vegetables that have been battered and deep fried.", image: "https://loremflickr.com/400/300/tempura,fried" },
    { name: "Kobe Beef", desc: "Hyogo. Wagyu beef known for its flavor, tenderness, and fatty, well-marbled texture.", image: "https://loremflickr.com/400/300/wagyu,steak" },
    { name: "Sanuki Udon", desc: "Kagawa. Thick, chewy wheat flour noodles in a mild broth.", image: "https://loremflickr.com/400/300/udon,noodle" },
    { name: "Tonkatsu", desc: "National. Breaded, deep-fried pork cutlet. Often served with shredded cabbage.", image: "https://loremflickr.com/400/300/tonkatsu,pork" },
    { name: "Yakitori", desc: "National. Grilled chicken skewers, a popular izakaya staple.", image: "https://loremflickr.com/400/300/yakitori,chicken" },
    { name: "Matcha Sweets", desc: "Kyoto. Desserts made with high-quality green tea powder from Uji.", image: "https://loremflickr.com/400/300/matcha,dessert" }
  ],
  "Italy": [
    { name: "Pizza Napoletana", desc: "Naples. The original pizza with tomatoes, mozzarella cheese, fresh basil, and extra virgin olive oil.", image: "https://loremflickr.com/400/300/pizza,neapolitan" },
    { name: "Carbonara", desc: "Rome. Pasta made with eggs, hard cheese, cured pork (guanciale), and black pepper.", image: "https://loremflickr.com/400/300/carbonara,pasta" },
    { name: "Lasagna", desc: "Bologna. Wide, flat pasta baked with layers of ragù, béchamel sauce, and cheese.", image: "https://loremflickr.com/400/300/lasagna,food" },
    { name: "Risotto alla Milanese", desc: "Milan. Creamy rice dish cooked with saffron, giving it a distinct yellow color.", image: "https://loremflickr.com/400/300/risotto,saffron" },
    { name: "Bistecca alla Fiorentina", desc: "Florence. Thickly cut T-bone steak grilled over a wood fire.", image: "https://loremflickr.com/400/300/steak,florence" },
    { name: "Gelato", desc: "National. Italian ice cream, known for being denser and more flavorful than regular ice cream.", image: "https://loremflickr.com/400/300/gelato,icecream" },
    { name: "Tiramisu", desc: "Veneto. Coffee-flavoured dessert made of ladyfingers dipped in coffee, layered with mascarpone mixture.", image: "https://loremflickr.com/400/300/tiramisu,dessert" },
    { name: "Pesto Genovese", desc: "Genoa. Sauce made from crushed garlic, European pine nuts, coarse salt, basil leaves, and hard cheese.", image: "https://loremflickr.com/400/300/pesto,pasta" },
    { name: "Arancini", desc: "Sicily. Stuffed rice balls which are coated with bread crumbs and then deep fried.", image: "https://loremflickr.com/400/300/arancini,food" },
    { name: "Ossobuco", desc: "Milan. Braised veal shanks cooked with vegetables, white wine and broth.", image: "https://loremflickr.com/400/300/ossobuco,meat" }
  ],
  "USA": [
      { name: "Texas Brisket", desc: "Texas. Beef brisket smoked low and slow for hours until tender.", image: "https://loremflickr.com/400/300/brisket,bbq" },
      { name: "New York Pizza", desc: "NYC. Wide, thin, and foldable slices topped with tomato sauce and mozzarella.", image: "https://loremflickr.com/400/300/pizza,nyc" },
      { name: "Hamburger", desc: "National. Ground beef patty served in a bun, customized with endless toppings.", image: "https://loremflickr.com/400/300/hamburger,burger" },
      { name: "Clam Chowder", desc: "New England. Thick soup made with clams, potatoes, salt pork, and cream.", image: "https://loremflickr.com/400/300/clamchowder,soup" },
      { name: "Philly Cheesesteak", desc: "Philadelphia. Sandwich made from thinly sliced beefsteak and melted cheese in a long hoagie roll.", image: "https://loremflickr.com/400/300/cheesesteak,sandwich" },
      { name: "Gumbo", desc: "Louisiana. Creole stew consisting of a strong stock, meat or shellfish, and the 'holy trinity' of vegetables.", image: "https://loremflickr.com/400/300/gumbo,stew" },
      { name: "Deep Dish Pizza", desc: "Chicago. Pizza with a very high edge which provides ample space for large amounts of cheese and chunky tomato sauce.", image: "https://loremflickr.com/400/300/deepdishpizza,food" },
      { name: "Lobster Roll", desc: "Maine. Lobster meat served on a grilled hot dog-style bun.", image: "https://loremflickr.com/400/300/lobsterroll,sandwich" },
      { name: "Bagel with Lox", desc: "NYC. Chewy bagel topped with cream cheese and cured salmon.", image: "https://loremflickr.com/400/300/bagel,lox" },
      { name: "Southern Fried Chicken", desc: "The South. Chicken floured or battered and then pan-fried or deep-fried.", image: "https://loremflickr.com/400/300/friedchicken,southern" }
  ],
  "Portugal": [
    { name: "Pastel de Nata", desc: "Traditional Portuguese custard tart dusted with cinnamon.", image: "https://loremflickr.com/400/300/pasteldenata,dessert" },
    { name: "Bacalhau à Brás", desc: "Shredded salted cod with onions, potatoes, and scrambled eggs.", image: "https://loremflickr.com/400/300/bacalhau,fish,food" },
    { name: "Francesinha", desc: "A heavy sandwich with various meats covered in melted cheese and a spicy tomato sauce.", image: "https://loremflickr.com/400/300/francesinha,sandwich" },
    { name: "Piri-Piri Chicken", desc: "Grilled chicken marinated in spicy chili sauce.", image: "https://loremflickr.com/400/300/piripiri,chicken,food" },
    { name: "Caldo Verde", desc: "Green soup made with kale, potatoes, and chouriço.", image: "https://loremflickr.com/400/300/caldo,verde,soup" },
    { name: "Sardinhas Assadas", desc: "Freshly grilled sardines, a summer staple especially during festivals.", image: "https://loremflickr.com/400/300/sardines,grilled,food" },
    { name: "Polvo à Lagareiro", desc: "Tender octopus roasted with potatoes, garlic, and plenty of olive oil.", image: "https://loremflickr.com/400/300/octopus,food,roasted" },
    { name: "Bifana", desc: "Traditional pork steak sandwich seasoned with garlic and spices.", image: "https://loremflickr.com/400/300/bifana,sandwich,pork" },
    { name: "Arroz de Pato", desc: "Duck rice baked with chouriço and bacon.", image: "https://loremflickr.com/400/300/arroz,pato,duck,food" },
    { name: "Alheira", desc: "A smoked sausage made with meats (usually not pork) and bread.", image: "https://loremflickr.com/400/300/alheira,sausage,food" }
  ],
  "France": [
    { name: "Croissant", desc: "Paris. Buttery, flaky, viennoiserie pastry.", image: "https://loremflickr.com/400/300/croissant,pastry" },
    { name: "Coq au Vin", desc: "Burgundy. Chicken braised with wine, lardons, mushrooms, and garlic.", image: "https://loremflickr.com/400/300/coqauvin,food" },
    { name: "Ratatouille", desc: "Provence. Stewed vegetable dish, originating in Nice.", image: "https://loremflickr.com/400/300/ratatouille,vegetables" },
    { name: "Escargots de Bourgogne", desc: "Burgundy. Snails cooked in garlic butter, chicken stock or wine.", image: "https://loremflickr.com/400/300/escargots,food" },
    { name: "Bouillabaisse", desc: "Marseille. Traditional Provençal fish stew originating from the port city of Marseille.", image: "https://loremflickr.com/400/300/bouillabaisse,soup" },
    { name: "Crêpes", desc: "Brittany. Very thin pancakes served with a variety of sweet or savoury fillings.", image: "https://loremflickr.com/400/300/crepes,dessert" },
    { name: "Boeuf Bourguignon", desc: "Burgundy. Beef stew braised in red wine, often red Burgundy, and beef stock.", image: "https://loremflickr.com/400/300/boeufbourguignon,stew" },
    { name: "Quiche Lorraine", desc: "Lorraine. Savory tart filled with cheese, meat, seafood or vegetables.", image: "https://loremflickr.com/400/300/quiche,food" },
    { name: "Cassoulet", desc: "Castelnaudary. Rich, slow-cooked casserole containing meat (pork sausages, goose, duck and sometimes mutton), pork skin and white beans.", image: "https://loremflickr.com/400/300/cassoulet,food" },
    { name: "Macarons", desc: "Paris. Sweet meringue-based confection made with egg white, icing sugar, granulated sugar, almond meal, and food colouring.", image: "https://loremflickr.com/400/300/macarons,dessert" }
  ],
  "Spain": [
    { name: "Paella", desc: "Valencia. Rice dish with saffron, chicken, seafood, etc.", image: "https://loremflickr.com/400/300/paella,food" },
    { name: "Jamón Ibérico", desc: "National. Cured ham from Black Iberian pigs.", image: "https://loremflickr.com/400/300/jamoniberico,ham" },
    { name: "Gazpacho", desc: "Andalusia. Cold soup made of raw, blended vegetables.", image: "https://loremflickr.com/400/300/gazpacho,soup" },
    { name: "Tortilla Española", desc: "National. Omelette made with eggs and potatoes, optionally including onion.", image: "https://loremflickr.com/400/300/tortilla,spanish" },
    { name: "Churros con Chocolate", desc: "Madrid. Fried dough pastry served with hot chocolate dip.", image: "https://loremflickr.com/400/300/churros,dessert" },
    { name: "Patatas Bravas", desc: "National. White potatoes cut into irregular cubes, fried and served with spicy tomato sauce.", image: "https://loremflickr.com/400/300/patatasbravas,food" },
    { name: "Pulpo a la Gallega", desc: "Galicia. Octopus cooked with paprika, rock salt, and olive oil.", image: "https://loremflickr.com/400/300/pulpo,food" },
    { name: "Gambas al Ajillo", desc: "National. Prawns cooked with garlic, olive oil and chili pepper.", image: "https://loremflickr.com/400/300/gambas,shrimp" },
    { name: "Fabada Asturiana", desc: "Asturias. Rich bean stew with sausages like chorizo and morcilla.", image: "https://loremflickr.com/400/300/fabada,stew" },
    { name: "Crema Catalana", desc: "Catalonia. Custard dessert very similar to crème brûlée.", image: "https://loremflickr.com/400/300/crema,dessert" }
  ],
  "Germany": [
    { name: "Bratwurst", desc: "National. Sausage made from veal, beef, or pork.", image: "https://loremflickr.com/400/300/bratwurst,sausage" },
    { name: "Sauerkraut", desc: "National. Finely cut raw cabbage that has been fermented by various lactic acid bacteria.", image: "https://loremflickr.com/400/300/sauerkraut,food" },
    { name: "Schnitzel", desc: "National. Thin slice of meat fried in fat.", image: "https://loremflickr.com/400/300/schnitzel,food" },
    { name: "Pretzel (Brezel)", desc: "Bavaria. Type of baked pastry made from dough that is commonly shaped into a knot.", image: "https://loremflickr.com/400/300/pretzel,food" },
    { name: "Currywurst", desc: "Berlin. Fast food dish of steamed, then fried pork sausage typically cut into slices and seasoned with curry ketchup.", image: "https://loremflickr.com/400/300/currywurst,food" },
    { name: "Sauerbraten", desc: "Rhineland. Pot roast that can be prepared with a variety of meats, most often beef, but also from venison, lamb, mutton, pork, and horse.", image: "https://loremflickr.com/400/300/sauerbraten,food" },
    { name: "Spätzle", desc: "Swabia. Type of pasta made with fresh eggs.", image: "https://loremflickr.com/400/300/spatzle,food" },
    { name: "Kartoffelsalat", desc: "National. Potato salad prepared in various ways (with mayo or vinegar/oil).", image: "https://loremflickr.com/400/300/potatosalad,german" },
    { name: "Rouladen", desc: "National. Bacon, onions, mustard and pickles wrapped in thinly sliced beef which is then cooked.", image: "https://loremflickr.com/400/300/rouladen,food" },
    { name: "Black Forest Cake", desc: "Black Forest. Chocolate sponge cake with a rich cherry filling.", image: "https://loremflickr.com/400/300/blackforestcake,cake" }
  ],
  "United Kingdom": [
    { name: "Fish and Chips", desc: "National. Hot dish consisting of fried fish in batter served with chips.", image: "https://loremflickr.com/400/300/fishandchips,food" },
    { name: "Full English Breakfast", desc: "National. Breakfast meal typically including bacon, sausages, eggs, black pudding, baked beans, tomatoes and mushrooms.", image: "https://loremflickr.com/400/300/englishbreakfast,food" },
    { name: "Sunday Roast", desc: "National. Traditional main meal composed of roasted meat, roast potato, and accompaniments such as Yorkshire pudding.", image: "https://loremflickr.com/400/300/sundayroast,food" },
    { name: "Shepherd's Pie", desc: "National. Meat pie with a crust or topping of mashed potato.", image: "https://loremflickr.com/400/300/shepherdspie,food" },
    { name: "Beef Wellington", desc: "National. Preparation of fillet steak coated with pâté and duxelles, which is then wrapped in parma ham and puff pastry, then baked.", image: "https://loremflickr.com/400/300/beefwellington,food" },
    { name: "Cornish Pasty", desc: "Cornwall. Baked pastry, a traditional variety of which is particularly associated with Cornwall.", image: "https://loremflickr.com/400/300/cornishpasty,food" },
    { name: "Chicken Tikka Masala", desc: "Glasgow/National. Chunks of roasted marinated chicken (chicken tikka) in a spiced curry sauce.", image: "https://loremflickr.com/400/300/chickentikka,food" },
    { name: "Haggis", desc: "Scotland. Savoury pudding containing sheep's pluck (heart, liver, and lungs), minced with onion, oatmeal, suet, spices, and stock.", image: "https://loremflickr.com/400/300/haggis,food" },
    { name: "Scones with Clotted Cream", desc: "Devon/Cornwall. Single-serving quick bread, usually made of wheat, barley or oatmeal.", image: "https://loremflickr.com/400/300/scones,food" },
    { name: "Eton Mess", desc: "Eton. Traditional English dessert consisting of a mixture of strawberries, broken meringue, and whipped double cream.", image: "https://loremflickr.com/400/300/etonmess,dessert" }
  ],
  "Greece": [
    { name: "Moussaka", desc: "National. Eggplant- or potato-based dish, often including ground meat.", image: "https://loremflickr.com/400/300/moussaka,food" },
    { name: "Souvlaki", desc: "National. Small pieces of meat and sometimes vegetables grilled on a skewer.", image: "https://loremflickr.com/400/300/souvlaki,food" },
    { name: "Gyros", desc: "National. Meat cooked on a vertical rotisserie, then sliced and served wrapped or stuffed in pita bread.", image: "https://loremflickr.com/400/300/gyros,food" },
    { name: "Spanakopita", desc: "National. Spinach pie.", image: "https://loremflickr.com/400/300/spanakopita,food" },
    { name: "Dolmades", desc: "National. Stuffed vine leaves.", image: "https://loremflickr.com/400/300/dolmades,food" },
    { name: "Tzatziki", desc: "National. Dip, soup, or sauce found in the cuisines of Southeast Europe and the Middle East.", image: "https://loremflickr.com/400/300/tzatziki,food" },
    { name: "Greek Salad (Horiatiki)", desc: "National. Salad made with pieces of tomatoes, cucumbers, onion, feta cheese, and olives.", image: "https://loremflickr.com/400/300/greeksalad,food" },
    { name: "Feta Cheese", desc: "National. Brined curd white cheese made from sheep's milk or from a mixture of sheep and goat's milk.", image: "https://loremflickr.com/400/300/feta,cheese" },
    { name: "Baklava", desc: "National. Rich, sweet dessert pastry made of layers of filo filled with chopped nuts and sweetened and held together with syrup or honey.", image: "https://loremflickr.com/400/300/baklava,dessert" },
    { name: "Pastitsio", desc: "National. Baked pasta dish with ground meat and béchamel sauce.", image: "https://loremflickr.com/400/300/pastitsio,food" }
  ],
  "Turkey": [
    { name: "Kebab", desc: "National. Cooked meat dishes, with origins in Middle Eastern cuisine.", image: "https://loremflickr.com/400/300/kebab,food" },
    { name: "Baklava", desc: "Gaziantep. Rich, sweet dessert pastry made of layers of filo filled with chopped nuts.", image: "https://loremflickr.com/400/300/baklava,turkey" },
    { name: "Turkish Delight (Lokum)", desc: "National. Family of confections based on a gel of starch and sugar.", image: "https://loremflickr.com/400/300/turkishdelight,food" },
    { name: "Manti", desc: "Kayseri. Dumplings popular in most Turkic cuisines.", image: "https://loremflickr.com/400/300/manti,food" },
    { name: "Menemen", desc: "National. Traditional Turkish dish which includes eggs, tomato, green peppers, and spices.", image: "https://loremflickr.com/400/300/menemen,food" },
    { name: "Lahmacun", desc: "National. Round, thin piece of dough topped with minced meat, minced vegetables and herbs.", image: "https://loremflickr.com/400/300/lahmacun,food" },
    { name: "Börek", desc: "National. Family of baked filled pastries made of a thin flaky dough such as phyllo.", image: "https://loremflickr.com/400/300/borek,food" },
    { name: "Köfte", desc: "National. Balls of ground meat - beef, chicken, lamb, or pork, mixed with spices and/or onions.", image: "https://loremflickr.com/400/300/kofte,food" },
    { name: "Pide", desc: "National. Flatbread baked with toppings in a stone oven.", image: "https://loremflickr.com/400/300/pide,food" },
    { name: "Kunefe", desc: "Hatay. Crisp cheese-filled dessert soaked in sweet syrup.", image: "https://loremflickr.com/400/300/kunefe,dessert" }
  ],
  "Switzerland": [
    { name: "Fondue", desc: "National. Swiss melted cheese dish served in a communal pot over a portable stove.", image: "https://loremflickr.com/400/300/fondue,cheese" },
    { name: "Raclette", desc: "Valais. Semi-hard cheese that is usually fashioned into a wheel of about 6 kg.", image: "https://loremflickr.com/400/300/raclette,cheese" },
    { name: "Rösti", desc: "Bern. Dish consisting mainly of potatoes, in the style of a fritter.", image: "https://loremflickr.com/400/300/rosti,food" },
    { name: "Zürcher Geschnetzeltes", desc: "Zurich. Sliced veal strips in a creamy mushroom sauce.", image: "https://loremflickr.com/400/300/veal,cream" },
    { name: "Birchermüesli", desc: "Zurich. Rolled oats, fruit, nuts, lemon juice and condensed milk.", image: "https://loremflickr.com/400/300/muesli,food" },
    { name: "Tartiflette", desc: "Savoie (Shared). Dish made from potatoes, reblochon cheese, lardons and onions.", image: "https://loremflickr.com/400/300/tartiflette,food" },
    { name: "Swiss Chocolate", desc: "National. High quality milk chocolate.", image: "https://loremflickr.com/400/300/chocolate,swiss" },
    { name: "Bündnerfleisch", desc: "Graubünden. Air-dried meat.", image: "https://loremflickr.com/400/300/driedmeat,food" },
    { name: "Älplermagronen", desc: "Alpine Regions. Macaroni with cheese, onions, and potatoes.", image: "https://loremflickr.com/400/300/macaroni,cheese" },
    { name: "Basler Leckerli", desc: "Basel. Hard spice biscuit made of honey, hazelnuts, almonds, and candied peel.", image: "https://loremflickr.com/400/300/biscuit,swiss" }
  ],
  "Belgium": [
    { name: "Moules-Frites", desc: "National. Main dish of mussels and fries.", image: "https://loremflickr.com/400/300/moulesfrites,food" },
    { name: "Belgian Waffles", desc: "National. Waffles with lighter batter, larger squares, and deeper pockets.", image: "https://loremflickr.com/400/300/waffle,belgium" },
    { name: "Belgian Chocolate", desc: "National. Famous for pralines.", image: "https://loremflickr.com/400/300/chocolate,belgium" },
    { name: "Carbonade flamande", desc: "Flanders. Sweet-sour beef and onion stew made with beer.", image: "https://loremflickr.com/400/300/stew,beef" },
    { name: "Waterzooi", desc: "Ghent. Stew made of fish or chicken, vegetables, cream and eggs.", image: "https://loremflickr.com/400/300/waterzooi,soup" },
    { name: "Frites", desc: "National. Thick-cut fries, traditionally double-fried in beef tallow.", image: "https://loremflickr.com/400/300/fries,food" },
    { name: "Stoemp", desc: "Brussels. Dish of mashed potatoes and other vegetables.", image: "https://loremflickr.com/400/300/mashedpotato,food" },
    { name: "Speculoos", desc: "National. Spiced shortcrust biscuit.", image: "https://loremflickr.com/400/300/speculoos,cookie" },
    { name: "Dame Blanche", desc: "National. Dessert consisting of vanilla ice cream with whipped cream, and warm molten chocolate.", image: "https://loremflickr.com/400/300/icecream,chocolate" },
    { name: "Grey Shrimp Croquettes", desc: "Coast. Breaded fried roll containing creamy shrimp mixture.", image: "https://loremflickr.com/400/300/croquette,shrimp" }
  ],
  "Netherlands": [
    { name: "Stroopwafel", desc: "Gouda. Wafer cookie made from two thin layers of baked dough joined by a caramel filling.", image: "https://loremflickr.com/400/300/stroopwafel,food" },
    { name: "Herring (Hollandse Nieuwe)", desc: "National. Raw herring served with chopped onions and gherkins.", image: "https://loremflickr.com/400/300/herring,fish" },
    { name: "Poffertjes", desc: "National. Traditional Dutch batter treats. Resembling small, fluffy pancakes.", image: "https://loremflickr.com/400/300/poffertjes,pancakes" },
    { name: "Bitterballen", desc: "National. Dutch meat-based snack, typically containing a mixture of beef or veal (minced or chopped), beef broth, butter, flour for thickening, parsley, salt and pepper.", image: "https://loremflickr.com/400/300/bitterballen,food" },
    { name: "Kibbeling", desc: "National. Battered chunks of fish, commonly served with a mayonnaise-based garlic sauce.", image: "https://loremflickr.com/400/300/friedfish,food" },
    { name: "Erwtensoep", desc: "National. Thick split pea soup.", image: "https://loremflickr.com/400/300/peasoup,food" },
    { name: "Hagelslag", desc: "National. Chocolate sprinkles sandwich topping.", image: "https://loremflickr.com/400/300/sprinkles,chocolate" },
    { name: "Oliebollen", desc: "National. Variety of dumpling made by using an ice-cream scoop or two spoons to scoop a certain amount of dough and dropping the dough into a deep fryer.", image: "https://loremflickr.com/400/300/donut,fried" },
    { name: "Rijsttafel", desc: "Indonesian-Dutch. Rice table with many small dishes.", image: "https://loremflickr.com/400/300/rice,indonesian" },
    { name: "Kaas (Gouda/Edam)", desc: "National. Dutch cheese.", image: "https://loremflickr.com/400/300/cheese,dutch" }
  ],
  "Sweden": [
    { name: "Swedish Meatballs (Köttbullar)", desc: "National. Meatballs made with ground beef and pork, served with gravy and lingonberry jam.", image: "https://loremflickr.com/400/300/meatballs,swedish" },
    { name: "Gravlax", desc: "National. Raw salmon, cured in salt, sugar, and dill.", image: "https://loremflickr.com/400/300/gravlax,salmon" },
    { name: "Kanelbullar", desc: "National. Cinnamon bun.", image: "https://loremflickr.com/400/300/cinnamonbun,food" },
    { name: "Surströmming", desc: "North. Lightly-salted fermented Baltic Sea herring.", image: "https://loremflickr.com/400/300/herring,canned" },
    { name: "Smörgåstårta", desc: "National. Savoury cake that is similar to a sandwich, but with large amounts of filling and garnish, similar to a layered cream cake.", image: "https://loremflickr.com/400/300/sandwichcake,food" },
    { name: "Pickled Herring (Sill)", desc: "National. Herring preserved in vinegar/sugar marinade.", image: "https://loremflickr.com/400/300/pickledherring,food" },
    { name: "Knäckebröd", desc: "National. Crispbread.", image: "https://loremflickr.com/400/300/crispbread,food" },
    { name: "Princess Cake (Prinsesstårta)", desc: "National. Layer cake or torte consisting of alternating layers of airy sponge cake, pastry cream, and a thick-domed layer of whipped cream.", image: "https://loremflickr.com/400/300/princesscake,food" },
    { name: "Kräftskiva (Crayfish)", desc: "August. Crayfish party.", image: "https://loremflickr.com/400/300/crayfish,food" },
    { name: "Ärtsoppa & Pannkakor", desc: "Thursdays. Pea soup and pancakes.", image: "https://loremflickr.com/400/300/peasoup,pancakes" }
  ],
  "Denmark": [
    { name: "Smørrebrød", desc: "National. Open-faced sandwich consisting of a slice of buttered rye bread topped with cold cuts, pieces of meat or fish, cheese or spreads.", image: "https://loremflickr.com/400/300/smorrebrod,sandwich" },
    { name: "Frikadeller", desc: "National. Flat, pan-fried meatballs of minced meat.", image: "https://loremflickr.com/400/300/frikadeller,meatballs" },
    { name: "Stegt Flæsk", desc: "National. Fried pork belly served with potatoes and parsley sauce.", image: "https://loremflickr.com/400/300/porkbelly,food" },
    { name: "Wienerbrød (Danish Pastry)", desc: "National. Multilayered, laminated sweet pastry.", image: "https://loremflickr.com/400/300/danishpastry,food" },
    { name: "Æbleskiver", desc: "Christmas. Traditional Danish pancakes in a distinctive spherical shape.", image: "https://loremflickr.com/400/300/aebleskiver,dessert" },
    { name: "Rød Pølse", desc: "Street Food. Red boiled pork sausage.", image: "https://loremflickr.com/400/300/sausage,hotdog" },
    { name: "Leverpostej", desc: "National. Liver pâté.", image: "https://loremflickr.com/400/300/pate,food" },
    { name: "Flæskesteg", desc: "National. Roast pork with crackling.", image: "https://loremflickr.com/400/300/roastpork,food" },
    { name: "Risalamande", desc: "Christmas. Traditional Danish rice pudding served with warm cherry sauce.", image: "https://loremflickr.com/400/300/ricepudding,dessert" },
    { name: "Rugbrød", desc: "National. Danish rye bread.", image: "https://loremflickr.com/400/300/ryebread,food" }
  ],
  "Norway": [
    { name: "Fårikål", desc: "National. Mutton and cabbage stew.", image: "https://loremflickr.com/400/300/stew,meat" },
    { name: "Lutefisk", desc: "Christmas. Dried whitefish (normally cod, but ling and burbot are also used).", image: "https://loremflickr.com/400/300/fish,food" },
    { name: "Kjøttkaker", desc: "National. Meatballs.", image: "https://loremflickr.com/400/300/meatballs,food" },
    { name: "Brunost", desc: "National. Brown cheese.", image: "https://loremflickr.com/400/300/browncheese,food" },
    { name: "Rømmegrøt", desc: "National. Sour cream porridge.", image: "https://loremflickr.com/400/300/porridge,food" },
    { name: "Pinnekjøtt", desc: "Christmas. Main course dinner dish of lamb or mutton ribs.", image: "https://loremflickr.com/400/300/lambribs,food" },
    { name: "Rakfisk", desc: "National. Fermented fish.", image: "https://loremflickr.com/400/300/fermentedfish,food" },
    { name: "Smalahove", desc: "Voss. Sheep's head.", image: "https://loremflickr.com/400/300/meat,food" },
    { name: "Krumkake", desc: "Christmas. Waffle cookie made of flour, butter, eggs, white sugar, and cream.", image: "https://loremflickr.com/400/300/waffle,cookie" },
    { name: "Lefse", desc: "National. Traditional soft Norwegian flatbread.", image: "https://loremflickr.com/400/300/flatbread,food" }
  ],
  "Finland": [
    { name: "Karjalanpiirakka", desc: "Karelia. Karelian pasties.", image: "https://loremflickr.com/400/300/pastry,food" },
    { name: "Kalakukko", desc: "Savonia. Fish pasty.", image: "https://loremflickr.com/400/300/fishpie,food" },
    { name: "Poronkäristys", desc: "Lapland. Sautéed reindeer.", image: "https://loremflickr.com/400/300/reindeer,meat" },
    { name: "Ruisleipä", desc: "National. Rye bread.", image: "https://loremflickr.com/400/300/ryebread,food" },
    { name: "Mämmi", desc: "Easter. Traditional Finnish Easter dessert.", image: "https://loremflickr.com/400/300/dessert,brown" },
    { name: "Lohikeitto", desc: "National. Salmon soup.", image: "https://loremflickr.com/400/300/salmonsoup,food" },
    { name: "Mustamakkara", desc: "Tampere. Blood sausage.", image: "https://loremflickr.com/400/300/sausage,black" },
    { name: "Leipäjuusto", desc: "National. Bread cheese.", image: "https://loremflickr.com/400/300/cheese,baked" },
    { name: "Korvapuusti", desc: "National. Cinnamon roll.", image: "https://loremflickr.com/400/300/cinnamonroll,food" },
    { name: "Salmiakki", desc: "National. Salty liquorice.", image: "https://loremflickr.com/400/300/candy,black" }
  ],
  "Estonia": [
    { name: "Verivorst", desc: "Christmas. Blood sausage.", image: "https://loremflickr.com/400/300/sausage,black" },
    { name: "Mulgipuder", desc: "Mulgi. Potato and groats porridge.", image: "https://loremflickr.com/400/300/porridge,potato" },
    { name: "Kiluvõileib", desc: "National. Sprat sandwich.", image: "https://loremflickr.com/400/300/sandwich,fish" },
    { name: "Kama", desc: "National. Finely milled flour mixture.", image: "https://loremflickr.com/400/300/flour,food" },
    { name: "Sült", desc: "National. Jellied meat.", image: "https://loremflickr.com/400/300/aspic,food" },
    { name: "Rosolje", desc: "National. Beetroot and potato salad.", image: "https://loremflickr.com/400/300/beetsalad,food" },
    { name: "Kohuke", desc: "National. Curd snack.", image: "https://loremflickr.com/400/300/chocolate,snack" },
    { name: "Hernesupp", desc: "National. Pea soup.", image: "https://loremflickr.com/400/300/peasoup,food" },
    { name: "Vastlakukkel", desc: "Shrove Tuesday. Semla bun.", image: "https://loremflickr.com/400/300/bun,cream" },
    { name: "Kali", desc: "National. Fermented beverage.", image: "https://loremflickr.com/400/300/drink,brown" }
  ],
  "Latvia": [
    { name: "Pelēkie Zirņi ar Speķi", desc: "National. Grey peas with speck (bacon).", image: "https://loremflickr.com/400/300/peas,bacon" },
    { name: "Rupjmaize", desc: "National. Dark rye bread.", image: "https://loremflickr.com/400/300/ryebread,dark" },
    { name: "Sklandrausis", desc: "Courland. Sweet pie.", image: "https://loremflickr.com/400/300/pie,carrot" },
    { name: "Jāņu Siers", desc: "Midsummer. Caraway cheese.", image: "https://loremflickr.com/400/300/cheese,yellow" },
    { name: "Speķa Pīrādziņi", desc: "National. Bacon pies.", image: "https://loremflickr.com/400/300/pastry,bacon" },
    { name: "Maizes Zupa", desc: "National. Bread soup.", image: "https://loremflickr.com/400/300/dessert,bread" },
    { name: "Kartupeļu Pankūkas", desc: "National. Potato pancakes.", image: "https://loremflickr.com/400/300/potatopancakes,food" },
    { name: "Aukstā Zupa", desc: "Summer. Cold beet soup.", image: "https://loremflickr.com/400/300/soup,pink" },
    { name: "Kotletes", desc: "National. Meatballs/Patties.", image: "https://loremflickr.com/400/300/meatballs,food" },
    { name: "Debessmanna", desc: "National. Berry mousse.", image: "https://loremflickr.com/400/300/mousse,pink" }
  ],
  "Lithuania": [
    { name: "Cepelinai", desc: "National. Potato dumplings stuffed with ground meat, dry curd cheese or mushrooms.", image: "https://loremflickr.com/400/300/dumplings,potato" },
    { name: "Šaltibarščiai", desc: "Summer. Cold beet soup.", image: "https://loremflickr.com/400/300/soup,pink" },
    { name: "Kugelis", desc: "National. Potato pudding.", image: "https://loremflickr.com/400/300/potatopudding,food" },
    { name: "Kibinai", desc: "Trakai. Pastries filled with mutton and onion.", image: "https://loremflickr.com/400/300/pastry,food" },
    { name: "Šakotis", desc: "Weddings. Tree cake.", image: "https://loremflickr.com/400/300/cake,spiky" },
    { name: "Balandėliai", desc: "National. Cabbage rolls.", image: "https://loremflickr.com/400/300/cabbageroll,food" },
    { name: "Bulviniai Blynai", desc: "National. Potato pancakes.", image: "https://loremflickr.com/400/300/pancakes,potato" },
    { name: "Vėdarai", desc: "National. Potato sausages.", image: "https://loremflickr.com/400/300/sausage,potato" },
    { name: "Žemaičių Blynai", desc: "Samogitia. Potato pancakes filled with meat.", image: "https://loremflickr.com/400/300/pancakes,meat" },
    { name: "Kepta Duona", desc: "Bar Snack. Fried bread with garlic.", image: "https://loremflickr.com/400/300/friedbread,food" }
  ],
  "Poland": [
    { name: "Pierogi", desc: "National. Dumplings filled with various ingredients.", image: "https://loremflickr.com/400/300/pierogi,food" },
    { name: "Bigos", desc: "National. Hunter's stew.", image: "https://loremflickr.com/400/300/stew,meat" },
    { name: "Żurek", desc: "Easter. Sour rye soup.", image: "https://loremflickr.com/400/300/soup,sour" },
    { name: "Gołąbki", desc: "National. Cabbage rolls.", image: "https://loremflickr.com/400/300/cabbagerolls,food" },
    { name: "Kotlet Schabowy", desc: "National. Breaded pork cutlet.", image: "https://loremflickr.com/400/300/porkcutlet,food" },
    { name: "Kielbasa", desc: "National. Sausage.", image: "https://loremflickr.com/400/300/sausage,polish" },
    { name: "Placki Ziemniaczane", desc: "National. Potato pancakes.", image: "https://loremflickr.com/400/300/potatopancakes,food" },
    { name: "Oscypek", desc: "Tatra Mountains. Smoked cheese made of salted sheep milk.", image: "https://loremflickr.com/400/300/cheese,smoked" },
    { name: "Makowiec", desc: "Christmas. Poppy seed roll.", image: "https://loremflickr.com/400/300/poppyseedroll,cake" },
    { name: "Pączki", desc: "Fat Thursday. Filled doughnuts.", image: "https://loremflickr.com/400/300/doughnut,food" }
  ],
  "Slovakia": [
    { name: "Bryndzové Halušky", desc: "National. Potato dumplings with sheep cheese and bacon.", image: "https://loremflickr.com/400/300/dumplings,cheese" },
    { name: "Kapustnica", desc: "Christmas. Cabbage soup.", image: "https://loremflickr.com/400/300/cabbagesoup,food" },
    { name: "Vyprážaný Syr", desc: "National. Fried cheese.", image: "https://loremflickr.com/400/300/friedcheese,food" },
    { name: "Lokše", desc: "West. Potato flatbread.", image: "https://loremflickr.com/400/300/flatbread,potato" },
    { name: "Pirohy", desc: "National. Dumplings.", image: "https://loremflickr.com/400/300/pierogi,food" },
    { name: "Guláš", desc: "National. Goulash.", image: "https://loremflickr.com/400/300/goulash,soup" },
    { name: "Segedínsky Guláš", desc: "National. Segedin goulash with sauerkraut.", image: "https://loremflickr.com/400/300/goulash,kraut" },
    { name: "Zemiakové Placky", desc: "National. Potato pancakes.", image: "https://loremflickr.com/400/300/pancakes,potato" },
    { name: "Žemlovka", desc: "National. Bread pudding.", image: "https://loremflickr.com/400/300/breadpudding,food" },
    { name: "Trdelník", desc: "Skalica. Spit cake.", image: "https://loremflickr.com/400/300/trdelnik,cake" }
  ],
  "Hungary": [
    { name: "Gulyás", desc: "National. Goulash soup.", image: "https://loremflickr.com/400/300/goulash,hungarian" },
    { name: "Chicken Paprikash", desc: "National. Chicken in paprika sour cream sauce.", image: "https://loremflickr.com/400/300/paprikash,chicken" },
    { name: "Lángos", desc: "Street Food. Deep fried dough with toppings.", image: "https://loremflickr.com/400/300/langos,food" },
    { name: "Töltött Káposzta", desc: "National. Stuffed cabbage.", image: "https://loremflickr.com/400/300/stuffedcabbage,food" },
    { name: "Pörkölt", desc: "National. Meat stew.", image: "https://loremflickr.com/400/300/stew,meat" },
    { name: "Halászlé", desc: "National. Fisherman's soup.", image: "https://loremflickr.com/400/300/fishsoup,spicy" },
    { name: "Dobos Torte", desc: "National. Layered sponge cake with chocolate buttercream.", image: "https://loremflickr.com/400/300/cake,layer" },
    { name: "Somlói Galuska", desc: "National. Sponge cake dessert.", image: "https://loremflickr.com/400/300/dessert,chocolate" },
    { name: "Kürtőskalács", desc: "Transylvania. Chimney cake.", image: "https://loremflickr.com/400/300/chimneycake,food" },
    { name: "Túrós Csusza", desc: "National. Pasta with cottage cheese and bacon.", image: "https://loremflickr.com/400/300/pasta,cheese" }
  ]
};

// Hook to detect window size for responsive map scaling
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const { width, height } = useWindowSize();
  const [position, setPosition] = useState({ 
    coordinates: [10, 10], 
    zoom: window.innerWidth < 600 ? 3 : 2 
  });

  // Handle manual zoom for Mac trackpads (pinch-to-zoom)
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        // Calculate new zoom level
        const zoomSpeed = 0.01;
        const delta = -e.deltaY * zoomSpeed;
        setPosition(pos => {
          const newZoom = Math.min(Math.max(pos.zoom + delta, 0.5), 8);
          return { ...pos, zoom: newZoom };
        });
      }
    };

    const container = document.getElementById("map-container");
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  // Calculate map scale based on screen aspect ratio
  // Increases scale slightly on narrow screens but stays zoomed out enough to see the world
  const getScale = () => {
    if (width < 600) return (width / 6.5); // Dynamic scale based on width for mobile
    return 150; // Default zoomed out scale for desktop
  };

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  const handleCountryClick = (geo) => {
    const { name } = geo.properties;
    let countryName = name === "United States of America" ? "USA" : name;

    if (foodData[countryName]) {
      setSelectedCountry(countryName);
    } else {
      // Do nothing for countries without data
      setSelectedCountry(null);
    }
  };

  return (
    <div 
      style={{ 
        width: "100vw", 
        height: "100vh", 
        overflow: "hidden", 
        position: "fixed", 
        top: 0, 
        left: 0,
        backgroundColor: "#f0f7ff" // Very Light Azure Background
      }}
      className="font-sans"
    >
      {/* Map Layer */}
      <div 
        id="map-container"
        className="position-absolute top-0 start-0 w-100 h-100" 
        style={{ zIndex: 0, touchAction: "none" }} 
      >
        <ComposableMap 
            width={width}
            height={height}
            projection="geoMercator" 
            projectionConfig={{ scale: getScale() }} 
        >
            <ZoomableGroup 
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={handleMoveEnd}
                minZoom={0.5}
                maxZoom={8}
            >
            <Geographies geography={GEO_URL}>
                {({ geographies }) => (
                <>
                    {/* Layer 1: Country Fills (Handles Interaction) */}
                    {geographies.map((geo) => {
                        const isSelected = selectedCountry === geo.properties.name || (selectedCountry === 'USA' && geo.properties.name === "United States of America");
                        const hasData = foodData[geo.properties.name] || (geo.properties.name === "United States of America" && foodData["USA"]);
                        
                        return (
                        <Geography
                            key={geo.rsmKey + "-fill"}
                            geography={geo}
                            onMouseEnter={() => setTooltipContent(geo.properties.name)}
                            onMouseLeave={() => setTooltipContent("")}
                            onClick={() => handleCountryClick(geo)}
                            style={{
                            default: {
                                fill: isSelected ? "#1e3a8a" : (hasData ? "#3b82f6" : "#ffffff"), // Selected: Navy, Has Data: Electric Blue, No Data: White
                                outline: "none",
                                transition: "fill 0.3s ease"
                            },
                            hover: {
                                fill: hasData ? "#1e3a8a" : "#e0f2fe",
                                outline: "none",
                                cursor: "pointer"
                            },
                            pressed: {
                                fill: "#172554",
                                outline: "none",
                            },
                            }}
                        />
                        );
                    })}
                    
                    {/* Layer 2: Global Borders (Ensures consistency) */}
                    {geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey + "-stroke"}
                            geography={geo}
                            style={{
                                default: {
                                    fill: "none",
                                    stroke: "#cbd5e1",
                                    strokeWidth: 0.5,
                                    strokeLinejoin: "round",
                                    strokeLinecap: "round",
                                    pointerEvents: "none", // Clicks pass through to the fill layer
                                    vectorEffect: "non-scaling-stroke"
                                }
                            }}
                        />
                    ))}
                </>
                )}
            </Geographies>
            </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Floating Header */}
      <header className="position-absolute top-0 start-0 m-3 p-3 bg-white shadow rounded-4 d-flex align-items-center gap-3" style={{ zIndex: 10, maxWidth: "400px" }}>
        <div className="text-white p-2 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ backgroundColor: "#3b82f6" }}>
            <Utensils size={20} />
        </div>
        <div>
            <h1 className="h6 m-0 fw-bold" style={{ color: "#1e3a8a" }}>World Food Map</h1>
            <p className="m-0 small text-secondary" style={{fontSize: '0.8rem'}}>Zoom & Click to explore</p>
        </div>
      </header>

      {/* Zoom Controls */}
      <div 
        className="position-absolute start-0 m-3 d-flex flex-column gap-2" 
        style={{ 
            zIndex: 10, 
            bottom: width < 600 
                ? "calc(env(safe-area-inset-bottom, 0px) + 3rem)" 
                : "1.5rem"
        }}
      >
        <button 
            className="btn btn-white bg-white shadow-lg rounded-circle d-flex align-items-center justify-content-center border-0" 
            style={{ width: "44px", height: "44px", padding: 0, color: "#1e3a8a" }}
            onClick={handleZoomIn} 
            aria-label="Zoom In"
        >
            <ZoomIn size={22} />
        </button>
        <button 
            className="btn btn-white bg-white shadow-lg rounded-circle d-flex align-items-center justify-content-center border-0" 
            style={{ width: "44px", height: "44px", padding: 0, color: "#1e3a8a" }}
            onClick={handleZoomOut} 
            aria-label="Zoom Out"
        >
            <ZoomOut size={22} />
        </button>
      </div>

      {/* Country Tooltip */}
      {tooltipContent && (
        <div className="position-absolute top-0 start-50 translate-middle-x mt-3 text-white px-3 py-1 rounded-pill shadow-sm opacity-90 pointer-events-none" style={{ zIndex: 20, backgroundColor: "#1e3a8a" }}>
            {tooltipContent}
        </div>
      )}

      {/* Food List Sidebar */}
      {selectedCountry && (
        <div 
          className="position-absolute top-0 end-0 h-100 bg-white shadow-lg overflow-auto" 
          style={{ 
            zIndex: 30, 
            width: width < 600 ? "100vw" : "350px", 
            animation: "slideInRight 0.3s ease-out",
            paddingBottom: "env(safe-area-inset-bottom, 0px)" // Added safe area padding
          }}
        >
            <div className="p-4 pt-0">
                <div className="sticky-top bg-white py-4 mb-2 shadow-sm" style={{ zIndex: 5, margin: "0 -1.5rem", padding: "1.5rem" }}>
                    <div className="d-flex align-items-center justify-content-between">
                        <h2 className="h5 fw-bold m-0" style={{ color: "#1e3a8a" }}>
                                <span style={{ color: "#3b82f6" }}>{selectedCountry}</span> Cuisine
                        </h2>
                        <button onClick={() => setSelectedCountry(null)} className="btn btn-close"></button>
                    </div>
                </div>
                
                <div className="d-flex flex-column gap-4">
                    {foodData[selectedCountry].map((food, index) => (
                        <div key={index} className="card border-0 shadow-sm">
                            <div className="position-relative overflow-hidden rounded-top" style={{ height: "160px" }}>
                                <img 
                                    src={food.image} 
                                    alt={food.name} 
                                    className="w-100 h-100 object-fit-cover"
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = `https://placehold.co/600x400?text=${food.name}`;
                                    }}
                                />
                            </div>
                            <div className="card-body">
                                <h6 className="card-title fw-bold" style={{ color: "#1e3a8a" }}>{food.name}</h6>
                                <p className="card-text text-muted small">{food.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default App;