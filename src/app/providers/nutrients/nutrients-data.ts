

const table = [
    {
        name: "Water",
        classification: "water",
        type: "main",
        symbol: "H2O",
        requirement: 2000000,
        limit: 10000000,
        unit: "mg",
        category: "class",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "A large proportion of the water is taken in the form of beverages, wines, beer,succulent fruits and vegetables, or in milk",
        use: "It forms the chief ingredient of all the fluids of the body and maintains their proper degree of dilution. Lukewarm water acts as an emetic if drunk in large quantity. ",
        description: "Water’s involved in every type of cellular process in your body, and when you’re dehydrated, they all run less efficiently -- and that includes your metabolism. ",
    },
    {
        name: "Carbohydrates",
        classification: "carbohydrate",
        type: "main",
        symbol: "Cm(H2O)n",
        category: "class",
        requirement: 130000,
        limit: 325000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Carbohydrates constitute majority of foods like bread, noodles, rice, and other products that have grains.",
        use: "Main source of calorie intake",
        description: `Carbohydrates are classified based on the number of monomer units in them or the number of sugar units they have. 
        They can be monosaccharides, disaccharides, or polysaccharides. Monosaccharides have one sugar unit, disaccharides have two sugar unites, 
        and polysaccharides have three or more sugar units.
        
        Monosaccharides and disaccharides are simpler carbohydrates while the polysaccharides are complex carbohydrates. 
        Complex carbohydrates take longer to digest because they need more time to be broken down into simpler sugar units. 
        Only the simpler sugar units can be absorbed by the blood.

        The spikes in the sugar levels of the blood are caused by too much consumption of simpler carbohydrates. 
        The simple carbohydrates are absorbed by the blood very quickly which causes the blood sugar levels to spike abnormally. 
        This leads to heart diseases and vascular diseases. You should keep in mind that there are a lot of foods out there that are composed of simple sugars. 
        One of them is the sugar-based juice.`,
    },
    {
        name: "Protein",
        classification: "protein",
        type: "main",
        symbol: "RCH(NH2)COOH",
        category: "class",
        dri: 0.8,
        requirement: 100000,
        limit: 154000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: `Complete protein sources are those with all the essential amino acids while an incomplete source of protein lacks one or more of the essential amino acids. 
        In order to make a complete protein source, one or more incomplete protein sources can be combined. 
        For example, rice and beans can be combined in order to make a complete protein source. 
        Other sources of protein are tofu, meat, eggs, soya and soya products, legumes, grains, and dairy products like cheese and milk. 
        There are a few amino acids that can be converted into glucose and used for energy. This process is referred to as gluconeogenesis. 
        The amino acids that remain after the conversion are discarded by the body.`,
        use: `Your diet needs to have an ample amount of protein especially the protein that is essential. 
        A diet rich in protein is needed when your child is developing and maturing, when you are pregnant, lactating, or when you are injured.`,
        description: `A lot of animal body structures are made up of protein. 
        Your hair, your skin, and your muscles are all made up of protein. 
        Every protein molecule is made up of thousands of amino acids. 
        These amino acids are made up of nitrogen and in some cases sulphur. 
        Your body needs these amino acids in order to make new proteins or 
        retain existing proteins and to replace damaged proteins or to maintain protein mass. 
        Amino acids that aren’t needed by the body are discarded through urination.

        All animals require certain proteins that can not be produced by their own body. 
        These are called the essential proteins. The proteins that an animal can produce internally are referred to as non-essential proteins. 
        These are the proteins that an animal can produce using their own nitrogen based components. 
        There are around twenty amino acid types that can be located in the human body and around ten of these are essential. 
        Since they are essential and can not be produced by your own body, they are required in your diet.

        Some studies show that more than 1.8 grams per kg have no benefit, 
        while others indicate that intakes slightly higher than 2.2 grams per kg is best
        `,
    },
    {
        name: "Fats",
        classification: "fats",
        type: "main",
        symbol: "CH3(CH2)nCOOH",
        category: "class",
        requirement: 45000,
        limit: 77000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: `In order to get the essential fatty acids, one must consume vegetables, seeds, nuts, and marine oils. 
        The best sources of these essential fatty acids include flaxseed oils, fish, soya and soya products, pumpkin seeds, sunflower seeds, and walnuts.`,
        use: "",
        description: `One molecule of fat is made up of several fatty acids that are bonded to glycerol. 
        These fatty acids are made up of long chains of hydrogen and carbon atoms and are found as triglycerides. Triglycerides are three fatty acids that are bonded to one glycerol.
        
        Fats are either saturated or unsaturated. Saturated fats are those kinds of fats with all their carbon atoms bonded to hydrogen atoms with the fatty acid chains. 
        On the other hand, unsaturated fats are characterized by carbon atoms that are double bonded with oftentimes few hydrogen atoms. 
        Moreover, these unsaturated fats can be further classified into monounsaturated fats and polyunsaturated fats. 
        Monounsaturated fats are made up of one double bond. Polyunsaturated fats are made up of several double bonds. 
        Trans fats are a kind of unsaturated fat with a trans-isomer fatty acid and they are usually made through the process of hydrogenation.

        There have been several studies that indicate that unsaturated fats are the best for the diet of a human being. 
        Specifically, monounsaturated fats are the best type of fat. Saturated fats from animals are the next kind of fat that is okay for a human being whilst trans fats are the kinds of fats that should be completely avoided. 
        Saturated fats and trans fats are the kinds of fats that are solid at room temperature. Examples of these fats are butter and lard. 
        Unsaturated fats are liquid at room temperature. 
        Examples of unsaturated fats are olive oil and flaxseed oil. Trans fats are not usually found in nature but are useful in the processing of food.
        The essential fatty acids

        Most of the fatty acids are not essential which means that your body can produce them when it needs to do so. 
        There are some fatty acids that are essential and must be included in your diet though. 
        A balance of the essential fatty acids omega-3 and omega-6 fatty acids are needed for better health. 
        These omega long-chain polyunsaturated fatty acids are substrates of eicosanoids which are also referred to as prostaglandins. They play important roles in the functioning of the human body. 
        They can be referred to as hormones in some ways.

        The omega-3 eicosapentaenoic acid or EPA is made by the human body with the omega-3 fatty acid alpha-linolenic acid or LNA. 
        It can also be derived from marine food sources that are building blocks for the series 3 prostaglandins or weakly inflammatory PGE3. 
        The omega-6 dihomo-gamma-linolenic acid or DGLA is a building block for series 1 prostaglandins or anti-inflammatory PGE1. 
        The Arachidonic acid or AA is used as the building block for these series 2 prostaglandins, otherwise known as the pro-inflammatory PGE 2. 
        Both the DGLA and the AA are made from the omega-6 linolenic acid or the LA from the body of a human being. It can also be acquired through some types of food.

        With a healthy balance of omega-3 and omega-6 fatty acids, there will be a production of the necessary prostaglandins. 
        When you balance omega-3 and omega-6 fatty acids, you will be on your way to excellent cardiovascular health. 
        Problems in highly industrialized societies involve the overconsumption of huge quantities of vegetable oil. 
        This reduces the amount of essential fatty acids or an imbalance between the omega-6 and the omega-3 fatty acids.

        The production of the prostaglandins PGE1 and PGE2 are largely dependent on the way omega-6 DGLA and AA are converted. 
        The omega-3 EPA hold back the AA from being released from the membranes which results in an imbalance of pro-inflammatory PGE2 made from AA to an anti-inflammatory PGE1 which was made from DGLA.

        The conversion or the desaturation of DGLA into AA is handled by the enzyme delta-5 desaturase. 
        This delta-5 desaturase is handled by the hormone called insulin and glucagon. 
        Insulin regulates the increase whilst glucagon regulates the decrease. 
        The amount of carbohydrates consumed alongside the amount of amino acids in your system influences the processes of insulin, glucagon, and other hormones. 
        This means that the ratio of omega-3 against omega-6 will have serious effects on the health of a human being. 
        Particularly, this will influence the immune system, inflammation, and mitosis or the division of cells.`,
    },
    {
        name: "Fibre",
        classification: "fibre",
        type: "main",
        symbol: "Fibre",
        category: "class",
        requirement: 30,
        limit: 0,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Plant foods, including oatmeal, lentils, peas, beans, fruits, and vegetables",
        use: "Helps with digestion, lowers LDL ('bad') cholesterol, helps you feel full, and helps maintain blood sugar levels",
        description: `Fibre is a type of carbohydrate that is not completely absorbed by human beings and in several similar animals. 
        Just like carbohydrates, when fibre is metabolized, it produces four Calories or kilocalories of energy for every gram. 
        Actually, this may be lesser than the estimate because not all of it is absorbed by the body.

        Fibre in your diet is mainly made up of cellulose. This is a large carbohydrate polymer that can not be digested by human beings because of the lack of enzymes. 
        There are two categories for fibre. The insoluble fibre and the soluble fibre are these two types. 
        The whole grains, fruits, prunes, plums, figs, and vegetables are excellent sources of dietary fibre. 
        Fibre is needed by your body in order to promote digestive health and to minimize the risk of developing colon cancer. 
        Moreover, fibre will also alleviate cases of constipation and diarrhea. 
        Fibre will give bulk to the intestinal contents while the insoluble fibre promotes peristalsis. 
        Peristalsis is the rhythmic muscular contractions that are done in the intestinal tracts in order for food to pass through it. 
        Some of the fibres which are soluble are produced with a high viscosity. 
        This means that is slows down the movement of food in the intestines which results in lessening the insulin spikes which are attributed to diabetics.
        Men ages 19-50: 38 grams per day<br/>
        Women ages 19-50: 25 grams per day, unless pregnant or breastfeeding<br/>
        Pregnant women: 25 to 30 grams per day<br/>
        Men age 51 and up: 30 grams per day<br/>
        Women age 51 and up: 21 grams per day<br/>`,
    },
    {
        name: "Calcium",
        classification: "mineral",
        type: "sub",
        symbol: "Ca",
        requirement: 1200,
        limit: 2000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        category: "macro-mineral",
        source: "Milk, fortified nondairy alternatives like soy milk, yogurt, hard cheeses, fortified cereals, kale",
        use: "Needed for bone growth and strength, blood clotting, muscle contraction, and more",
        description: `calcium - this is a common electrolyte which also has structural purposes involving muscle health, digestive system health, bone health, the neutralization of acidity, the clearing of toxins, and helping in the streaming of blood throughout the body
        <p>
        Adults ages 19-50: 1,000 milligrams per day<br/>
        Women age 51 and older: 1,200 milligrams per day<br/>
        Men age 51 - 70: 1,000 milligrams per day<br/>
        Men 71 and older: 1,200 milligrams per day<br/>
        </p>
        <p>Don't get more than this a day: 2,500 milligrams per day for adults age 50 and younger, 2,000 mg per day for those 51 and older
        </p>`,
    },
    {
        name: "Chlorine",
        classification: "mineral",
        type: "sub",
        symbol: "Cl",
        requirement: 500,
        limit: 35000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        category: "macro-mineral",
        source: "Milk, liver, eggs, peanuts",
        use: "Helps make cells",
        description: `chlorine - this is made up of chloride ions. It is a common electrolyte as well. How much you need:
        Men: 550 milligrams per day<br/>
        Women: 425 milligrams per day<br/>
        Pregnant women: 450 milligrams per day<br/>
        Breastfeeding women: 550 milligrams per day<br/>`,
    },

    {
        name: "Chromium",
        classification: "mineral",
        type: "sub",
        symbol: "Cr",
        requirement: 35,
        limit: 0,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        category: "macro-mineral",
        source: "Broccoli, potatoes, meats, poultry, fish, some cereals",
        use: "Helps control blood sugar levels",
        description: `Men ages 19-50: 35 micrograms per day<br/>
        Women ages 19-50: 25 micrograms per day, unless pregnant or breastfeeding<br/>
        Pregnant women: 30 micrograms per day<br/>
        Breastfeeding women: 45 micrograms per day<br/>
        Men age 51 and up: 30 micrograms per day<br/>
        Women age 51 and up: 20 micrograms per day`,
    },
    {
        name: "Phosphorus",
        classification: "mineral",
        type: "sub",
        category: "macro-mineral",
        symbol: "P",
        requirement: 700,
        limit: 3500,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Milk and other dairy products, peas, meat, eggs, some cereals and breads",
        use: "Cells need it to work normally. Helps make energy. Needed for bone growth.",
        description: `Phosphorus - this is required for bones and it is essential in processing energy.<br/>
        How much you need: Adults: 700 milligrams per day<br/>
        Don't get more than this much:<br/>
            Adults up to age 70: 4,000 milligrams per day. The limit is lower if you're pregnant.<br/>
            Pregnant women: 3,500 milligrams per day<br/>
            Adults age 70 and older: 3,000 milligrams per day<br/>
        `,
    },
    {
        name: "Potassium",
        classification: "mineral",
        type: "sub",
        category: "macro-mineral",
        symbol: "Ka",
        requirement: 5000,
        limit: null,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Potatoes, bananas, yogurt, milk, yellowfin tuna, soybeans, and a variety of fruits and vegetables.",
        use: "Helps control blood pressure, makes kidney stones less likely.",
        description: `
        How much you need:<br/>
        Adults: 4,700 milligrams per day, unless breastfeeding<br/>
        Breastfeeding women: 5,100 milligrams per day<br/>  
        Don't get more than this much: No upper limit known for adults. 
        However, high doses of potassium can be deadly.`,
    },
    {
        name: "Copper",
        classification: "mineral",
        type: "sub",
        symbol: "Cu",
        category: "macro-mineral",
        requirement: 1000,
        limit: 8000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        use: "Helps your body process iron",
        source: "Seafood, nuts, seeds, wheat bran cereals, whole grains",
        description: `copper - you need this for many redox enzymes which include cytochrome and oxidase
        Adults: 900 micrograms per day, unless pregnant or breastfeeding<br/>
        Pregnant women: 1,000 micrograms per day<br/>
        Breastfeeding women: 1,300 micrograms per day<br/>`,
    },
    {
        name: "Sodium",
        classification: "mineral",
        type: "sub",
        symbol: "Na",
        category: "macro-mineral",
        requirement: 1500,
        limit: 2300,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Foods made with added salt, such as processed and restaurant foods",
        use: "Important for fluid balance",
        description: `Sodium - this is a common electrolyte which is not usually found in dietary supplements. It is needed in large quantities. This is very common in food anyway. You can find it in the form of sodium chloride or common salt<br/>       
        How much you need:<br/>
        Adults ages 19-50: up to 1,500 milligrams per day<br/>
        Adults ages 51-70: up to 1,300 milligrams per day<br/>
        Adults age 71 and up: up to 1,200 milligrams per day<br/>
        Don't get more than this much: 2,300 milligrams per day for adults, or as instructed by your doctor, 
        depending on whether you have certain conditions, like high blood pressure`,
    },
    {
        name: "Sulphur",
        classification: "mineral",
        type: "sub",
        symbol: "S",
        category: "macro-mineral",
        requirement: 900,
        limit: null,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Seafood, egg,  liver, heart, and kidneys; Veal, beef, chicken, and pork; Nuts such as peanuts, brazil nuts, almonds, and walnuts",
        use: "Dietary sulfur promotes healthy skin by helping the body eliminate toxins.",
        description: `sulphur - this is essential for amino acids and many proteins in the body 
        like the skin, the hair, the liver, the nails, and the pancreas`,
    },
    {
        name: "Minerals",
        type: "main",
        symbol: "MINERAL",
        classification: "mineral",
        category: "class",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        description: `Minerals are chemical elements that are needed by living things. Carbon, hydrogen, nitrogen, and oxygen exist in organic molecules. 
        The word mineral is archaic since it attempts to describe the less abundant elements needed by the human body. 
        These elements are heavier than the basic four elements. 
        These elements include metals which occur as ions more often in the body. 
        Several dieticians advise that these minerals should be acquired from foods naturally. 
        They are to be acquired in complex compounds or natural inorganic sources like calcium carbonate which can be derived from ground oyster shells. 
        In another case, these minerals have to be added artificially in the form of supplements like iodine or iodized salt.
        <br/>
        Macrominerals There are some elements that are essential and they have to be consumed in larger amounts. 
        These minerals are referred to as bulk minerals. They can be structural and they could play several vital roles as electrolytes in the body. 
        Here are some elements that have a recommended daily allowance or RDA with more than two hundred milligrams
        <br/>
        Trace Minerals: Several elements are needed in trace amounts because they play a catalytic role with enzymes. 
        Here are some of the trace mineral elements that are needed in less than two hundred milligrams everyday`,
    },
    {
        name: "Cobalt",
        classification: "mineral",
        type: "sub",
        symbol: "Co",
        category: "trace-mineral",
        requirement: 0.50,
        limit: null,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "fish, nuts, leafy green vegetables, such as broccoli and spinach, and cereals, including oats",
        use: "Cobalt is a key component of vitamin B12, and is required for the synthesis of hemoglobin",
        description: "cobalt - this is required for biosynthesis for the vitamin B12 family of coenzymes",
    },
    {
        name: "Iodine",
        classification: "mineral",
        type: "sub",
        symbol: "I",
        category: "trace-mineral",
        requirement: 150,
        limit: 1000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Seaweed, seafood, dairy products, processed foods, iodized salt",
        use: "Helps make thyroid hormones",
        description: `Iodine - this is needed for biosynthesis of the element thyroxin. This is needed in a much larger quantity compared to the others on this list. Iodine is usually classified as one of the macrominerals <br/>
        Adults: 150 micrograms per day, unless pregnant or breastfeeding<br/>
        Pregnant women: 209 micrograms per day<br/>
        Breastfeeding women: 290 micrograms per day`,
    },
    {
        name: "Fluoride",
        classification: "mineral",
        type: "sub",
        symbol: "F",
        category: "trace-mineral",
        requirement: 4,
        limit: 10,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Fluoridated water, some sea fish",
        use: "Prevents cavities in teeth, helps with bone growth",
        description: `
            Men: 4 milligrams per day<br/>
            Women: 3 milligrams per day. This includes pregnant or breastfeeding women.<br/>
        `,
    },
    {
        name: "Iron",
        classification: "mineral",
        type: "sub",
        symbol: "Fe",
        category: "trace-mineral",
        requirement: 25,
        limit: 45,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Fortified cereals, beans, lentils, beef, turkey (dark meat), soy beans, spinach",
        use: "Needed for red blood cells and many enzymes",
        description: `Iron - this is required for several enzymes especially haemoglobin and other proteins. 
        Men age 19 and up: 8 milligrams per day<br/>
        Women ages 19-50: 18 milligrams per day, unless pregnant or breastfeeding<br/>
        Pregnant women: 27 milligrams per day<br/>
        Breastfeeding women: 10 milligrams per day<br/>
        Women age 51 and up: 8 milligrams per day<br/>
        Don't get more than this much: 45 milligrams per day for adults<br/>`,
    },
    {
        name: "Manganese",
        classification: "mineral",
        type: "sub",
        symbol: "Mn",
        category: "trace-mineral",
        requirement: 2,
        limit: 11,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Nuts, beans and other legumes, tea, whole grains",
        use: "Helps form bones and make some enzymes",
        description: `manganese - this is needed for the processing of oxygen
        How much you need:<br/>
            Men: 2.3 milligrams per day<br/>
            Women: 1.8 milligrams per day, unless pregnant or breastfeeding<br/>
            Pregnant women: 2.0 milligrams per day<br/>
            Breastfeeding women: 2.6 milligrams per day<br/>
            Don't get more than this much: 11 milligrams per day for adults`,
    },
    {
        name: "Magnesium",
        classification: "mineral",
        type: "sub",
        symbol: "Mg",
        category: "trace-mineral",
        requirement: 350,
        limit: 1000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Green leafy vegetables, nuts, dairy, soybeans, potatoes, whole wheat, quinoa",
        use: "Helps with heart rhythm, muscle and nerve function, bone strength",
        description: `Magnesium - this is required for processing ATP or adenosine tri phosphate, the energy of the body. 
        It can also be used for related reactions like building bones, causing strong peristalsis, an increase in the alkalinity of the body, and 
        an increase in the flexibility of the body
        How much you need:<br/>
            Men ages 19-30: 400 milligrams per day<br/>
            Men age 31 and up: 420 milligrams per day<br/>
            Women ages 19-30: 310 milligrams per day, unless pregnant or breastfeeding<br/>
            Women age 31 and up: 320 milligrams per day, unless pregnant or breastfeeding<br/>
            Pregnant women: 350-360 milligrams per day<br/>
            Breastfeeding women: 310-320 milligrams per day<br/>        
        Don't get more than this much: For the magnesium that’s naturally in food and water there is no upper limit.
        For magnesium in supplements or fortified foods: 350 milligrams per day`,
    },
    {
        name: "Molybdenum",
        classification: "mineral",
        type: "sub",
        symbol: "Mo",
        category: "trace-mineral",
        requirement: 45,
        limit: 2000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Legumes, leafy vegetables, grains, nuts",
        use: "Needed to make some enzymes",
        description: `Molybdenum is required for xanthine and other oxidases. <br/>
        How much you need:<br/>
        Adults: 45 micrograms per day, unless pregnant or breastfeeding<br/>
        Pregnant or breastfeeding women: 50 micrograms per day<br/>
        Don't get more than this much: 2,000 micrograms per day for adults<br/>`,
    },
    {
        name: "Nickel",
        classification: "mineral",
        type: "sub",
        symbol: "Ni",
        category: "trace-mineral",
        requirement: 0.9,
        limit: null,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Dry beans, cocoa, baking soda, and nuts, including hazel nuts, almonds and pistachios contain high levels of nicke",
        use: "Nickel plays a major role in helping the body absorb the iron it needs",
        description: "nickel - this is needed in urease",
    },
    {
        name: "Selenium",
        classification: "mineral",
        type: "sub",
        symbol: "Se",
        category: "trace-mineral",
        requirement: 60,
        limit: 400,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Organ meats, seafood, dairy, some plants (if grown in soil with selenium), Brazil nuts",
        use: "Protects cells from damage. Helps manage thyroid hormone.",
        description: `Selenium - this is needed for peroxidase or the anti-oxidant proteins. <br/>
        How much you need: <br/>
            Adults: 55 micrograms per day, unless pregnant or breastfeeding<br/>
            Pregnant women: 60 micrograms per day<br/>
            Breastfeeding women: 70 micrograms per day<br/>
        Don't get more than this much: 400 micrograms per day for adults<br/>`,
    },
    {
        name: "Vanadium",
        classification: "mineral",
        type: "sub",
        symbol: "V",
        category: "trace-mineral",
        requirement: 0.5,
        limit: 4.5,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "mushrooms, shellfish, black pepper, parsley, dill weed, beer, wine, grain and grain products, and artificially sweetened drinks.",
        use: "vanadium may lower blood sugar levels and improve sensitivity to insulin in people with type 2 diabetes. ",
        description: `vanadium - there is no current RDA for vanadium although it has been spotted in lower organisms. 
        It has no specific biochemical function but it has been spotted in human beings`,
    },
    {
        name: "Zinc",
        classification: "mineral",
        type: "sub",
        symbol: "Zn",
        category: "trace-mineral",
        requirement: 11,
        limit: 40,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Red meats, some seafood, fortified cereals",
        use: "Supports your immune system and nerve function. Also important for reproduction.",
        description: `Zinc - this is needed for enzymes like carboxypeptidase,
         the liver alcohol dehydrogenase, and carbonic anhydrase.<br/>
         How much you need:<br/>
        Men: 11 milligrams per day<br/>
        Women: 8 milligrams per day, unless pregnant or breastfeeding<br/>
        Pregnant women: 11 milligrams per day<br/>
        Breastfeeding women: 12 milligrams per day<br/>
        Don't get more than this amount: 40 mg per day for adults<br/>`,
    },
    {
        name: "Vitamins",
        classification: "vitamin",
        type: "main",
        symbol: "Vitamin",
        category: "class",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        description: `Just like the mineral mentioned above, there are twelve vitamins that are deemed as essential nutrients. 
        They are needed in order to maintain good health. 
        The only vitamin that is not essential is Vitamin D because it can be synthesized in the skin when you are under Ultra Violet B Radiation. 
        There are several vitamin like compounds that are highly advised to be included in your diet. An example is carnitine. This is needed in order to survive and maintain a healthy life. 
        It is not a vitamin like compound that is strictly essential because the body can make it from other substances.
        There have been thousands of phytochemicals that have been discovered in some foods just recently and they have desirable antioxidant properties beneficial for human beings. 
        They are usually found in fresh vegetables. Some other essential nutrients that are not identified as vitamins are some of the amino acids, essential fatty acids, choline, 
        and the minerals that were discussed in the previous part.

        If you have vitamin deficiencies then you may get some diseases like goitre, osteoporosis, scurvy, 
        a weakened immune system, cell metabolism disorders, some forms of cancer, signs of early ageing, 
        poor mental health, eating disorders, and many more. If you have too much vitamins then that could be dangerous to your health as well. 
        The same logic applies to minerals too. If you have too much or too little of minerals then that would be a risk to your health as well.`,
    },
    {
        name: "Vitamin A",
        classification: "vitamin",
        type: "sub",
        symbol: "C20H30O",
        category: "fat-based",
        requirement: 800,
        limit: 3000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: `Sweet potatoes, carrots, spinach, fortified cereals, from animal origin as Vitamin A / all-trans-Retinol: Fish in general, liver and dairy products;
            from plant origin as provitamin A / all-trans-beta-carotene: orange, ripe yellow fruits, leafy vegetables, carrots, pumpkin, squash, spinach`,
        use: "Needed for vision, the immune system, and reproduction",
        description: `
                How much you need:<br/>
                Men: 900 micrograms per day<br/>
                Women: 700 micrograms per day<br/>
                Pregnant women: 770 micrograms per day<br/>
                Breastfeeding women: 1,300 micrograms per day<br/>
                Do not get more than this much: 3,000 micrograms per day for adults`,
    },
    {
        name: "Thiamine",
        classification: "vitamin",
        symbol: "B1",
        type: "sub",
        category: "water-based",
        requirement: 1.2,
        limit: null,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Pork, oatmeal, brown rice, vegetables, potatoes, liver, eggs, whole-grain, enriched, fortified products like bread and cereals",
        use: "Helps the body process carbs and some protein",
        description: `Vitamin B1 (thiamine)<br/>
                Men: 1.2 milligrams per day<br/>
                Women: 1.1 milligrams per day, unless pregnant or breastfeeding<br/>
                Pregnant or breastfeeding women: 1.4 milligram per day<br/>
                Don't get more than this amount: No upper limit known for adults`,
    },
    {
        name: "Riboflavin",
        classification: "vitamin",
        symbol: "B2",
        type: "sub",
        category: "water-based",
        requirement: null,
        limit: null,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Dairy products, bananas, green beans, asparagus, Milk, bread products, fortified cereals",
        use: "Helps convert food into energy. Also helps make red blood cells.",
        description: `Vitamin B2 (riboflavin)<br/>
                How much you need:<br/>
                Men: 1.3 milligrams per day<br/>
                Women: 1.1 milligrams per day, unless pregnant or breastfeeding<br/>
                Pregnant women: 1.4 milligrams per day<br/>
                Breastfeeding women: 1.6 milligrams per day<br/>
                Don't get more than this much: No upper limit known for adults`,
    },
    {
        name: "Niacin",
        classification: "vitamin",
        symbol: "B3",
        type: "sub",
        category: "water-based",
        requirement: 15,
        limit: 35,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "many vegetables, mushrooms, tree nuts, Meat, fish, poultry, enriched and whole grain breads, fortified cereals",
        use: "Helps with digestion and with making cholesterol",
        description: `Vitamin B3 (niacin)<br/>
                How much you need:<br/>
                Men: 16 milligrams per day<br/>
                Women: 14 mg per day if not pregnant or breastfeeding<br/>
                Pregnant women: 18 milligrams per day<br/>
                Breastfeeding women: 17 milligrams per day<br/>
                Do not get more than this amount: No upper limit from natural sources. 
                If you're an adult and are taking niacin supplements, 
                or getting niacin from fortified foods, do not get more than 35 milligrams per day.`,
    },
    {
        name: "Vitamin B5 (Pantothenic acid)",
        classification: "vitamin",
        symbol: "V-B5",
        type: "sub",
        category: "water-based",
        requirement: 5,
        limit: null,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Meat, broccoli, avocados, chicken, beef, potatoes, oats, cereals, tomatoes",
        use: "Helps turn carbs, protein, and fat into energy",
        description: `How much you need:<br/>
            Adults: 5 milligrams per day, except for pregnant or breastfeeding women<br/>
            Pregnant women: 6 milligrams per day<br/>
            Breastfeeding women: 7 milligrams per day<br/>
            Don't get more than this much: No upper limit known for adults`,
    },
    {
        name: "Vitamin B6 (Pyridoxine)",
        classification: "vitamin",
        symbol: "V-B6",
        type: "sub",
        category: "water-based",
        requirement: 1.5,
        limit: 100,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Meat, vegetables, tree nuts, bananas, fortified cereals, fortified soy products, chickpeas, potatoes, organ meats",
        use: "Helps with metabolism, the immune system, and babies' brain development",
        description: `How much you need:<br/>
            Men and women ages 19-50: 1.3 milligrams per day, except for pregnant or breastfeeding women<br/>
            Pregnant women: 1.9 milligrams per day<br/>
            Breastfeeding women: 2 milligrams per day<br/>
            Men age 51 and up: 1.7 milligrams per day<br/>
            Women age 51 and up: 1.5 milligrams per day<br/>
            Don't get more than this amount: 100 milligrams per day for adults`,
    },
    {
        name: "Vitamin B7 (Biotin)",
        classification: "vitamin",
        symbol: "V-B7",
        type: "sub",
        category: "water-based",
        requirement: null,
        limit: null,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Raw egg yolk, liver, peanuts, leafy green vegetables, liver, fruits, meats",
        use: "Helps your body make fats, protein, and other things your cells need",
        description: `How much you need:<br/>
        Adults: 30 micrograms per day, except for breastfeeding women<br/>
        Breastfeeding women: 35 micrograms per day<br/>
        Don't get more than this amount: No upper limit known`,
    },
    {
        name: "Vitamin B9 (Folates, Folic acid)",
        classification: "vitamin",
        symbol: "C19H19N7O6",
        type: "sub",
        category: "water-based",
        requirement: 500,
        limit: 1000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Dark, leafy vegetables; enriched and whole grain breads; fortified cereals",
        use: "Helps prevent birth defects, important for heart health and for cell development",
        description: `Folic acid (Folate)
            Adults: 400 micrograms per day, unless pregnant or breastfeeding
            Pregnant women: 600 micrograms per day
            Breastfeeding women: 500 micrograms per day`,
    },
    {
        name: "Vitamin B12",
        classification: "vitamin",
        symbol: "V-B12",
        type: "sub",
        category: "water-based",
        requirement: null,
        limit: null,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Meat, poultry, fish, eggs, dairy products, fortified cereals",
        use: "Helps your body make red blood cells",
        description: `How much you need:<br/>
        Adults: 2.4 micrograms per day, except for pregnant or breastfeeding women<br/>
        Pregnant women: 2.6 micrograms per day<br/>
        Breastfeeding women: 2.8 micrograms per day<br/>
        Don't get more than this amount: No upper limit known<br/>`,
    },
    {
        name: "Vitamin C",
        classification: "vitamin",
        symbol: "C6H8O6",
        type: "sub",
        category: "water-based",
        requirement: 90,
        limit: 2000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Many fruits and vegetables, liver, red and green peppers, kiwis, oranges and other citrus fruits, strawberries, broccoli, tomatoes",
        use: "Helps protect against cell damage, supports the immune system, and helps your body make collagen",
        description: `How much you need:<br/>
        Men: 90 milligrams per day<br/>
        Women: 75 milligrams per day, unless pregnant or breastfeeding<br/>
        Pregnant women: 85 milligrams per day<br/>
        Breastfeeding women: 120 milligrams per day<br/>
        Smokers: Add 35 milligrams to the numbers above.<br/>
        Don't get more than this much: 2,000 milligrams per day for adults`,
    },
    {
        name: "Vitamin D",
        classification: "vitamin",
        symbol: "Vit D",
        type: "sub",
        category: "fat-based",
        requirement: 600,
        limit: 4000,
        unit: "iu",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Fish liver oils, fatty fish, fortified milk products, fortified cereals, lichen, eggs, liver, certain fish species such as sardines, certain mushroom species such as shiitake",
        use: "Needed for bones, muscles, the immune system, and communication between the brain and the rest of your body",
        description: `How much you need:<br/>
        Adults ages 19-70: 600 international units (IU) per day<br/>
        Adults age 71 and older: 800 international units per day<br/>
        Don't get more than this much: 4,000 international units per day for adults unless directed by your Doctor`,
    },
    {
        name: "Vitamin E",
        classification: "vitamin",
        symbol: "C29H50O2",
        type: "sub",
        category: "fat-based",
        requirement: 15,
        limit: 1000,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Many fruits and vegetables, nuts and seeds, and seed oils; fortified cereals, sunflower seeds, almonds, peanut butter, vegetable oils",
        use: "Helps protect cells against damage",
        description: `
            How much you need:<br/>
            Adults: 15 milligrams per day or 22.5 international units. That includes pregnant women.<br/>
            Breastfeeding women: 19 milligrams per day, 28.5 IU<br/>
            Don't get more than this amount: 1,000 milligrams per day for adults`,
    },
    {
        name: "Vitamin K",
        classification: "vitamin",
        symbol: "Vit K",
        type: "sub",
        category: "fat-based",
        requirement: 100,
        limit: 120,
        unit: "mg",
        deficiency: "",
        excess: "",
        ear: null,
        rda_male: null,
        rda_female: null,
        image: "bread.jpg",
        source: "Leafy green vegetables such as spinach, collards, and broccoli; egg yolks; liver, Brussels sprouts; cabbage",
        use: "Important in blood clotting and bone health",
        description: `How much you need:<br/>
        Men: 120 micrograms per day<br/>
        Women: 90 micrograms per day`,
    },

];


function toObjectId(_baseId: String, _mysqlId: Number) {
    const oldId = _mysqlId.toString(10);
    const a = '0'.repeat(7 - oldId.length);
    return _baseId + a + oldId;
}

const baseId = '5951bc91860d8b5b9';
const userBaseId = '5a51bc91860d8b5ba';

const result = table.map((record, index) => {
    const obj = Object.assign({ id: '', image: '', created_by: '' }, record);
    const id = index + 1;
    obj.image = 'assets/images/juice.jpg';
    obj.id = toObjectId(baseId, id);
    obj.created_by = toObjectId(userBaseId, 1);
    return obj;
});

export default result;
