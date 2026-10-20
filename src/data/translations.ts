export type Language = 'EN' | 'RW' | 'FR';

export interface TranslationDictionary {
  nav: {
    home: string;
    shop: string;
    science: string;
    origin: string;
    tastingBar: string;
    wholesale: string;
    quiz: string;
    findMatch: string;
    cart: string;
    language: string;
    currency: string;
  };
  hero: {
    tagline: string;
    headline: string;
    subheadline: string;
    ctaShop: string;
    ctaQuiz: string;
    badgeFruiting: string;
    badgeBetaGlucans: string;
    badgeDualExtract: string;
    badgeKinigi: string;
    badgeTested: string;
    scrollHint: string;
  };
  benefits: {
    focusTitle: string;
    focusSub: string;
    calmTitle: string;
    calmSub: string;
    immunityTitle: string;
    immunitySub: string;
    energyTitle: string;
    energySub: string;
    culinaryTitle: string;
    culinarySub: string;
  };
  cta: {
    shopHarvest: string;
    takeQuiz: string;
    addToCart: string;
    addedToCart: string;
    subscribeSave: string;
    oneTimePurchase: string;
    monthlySubscription: string;
    selectFormat: string;
    buildRitual: string;
    verifyCoa: string;
    reserveTasting: string;
    calculateWholesale: string;
    proceedCheckout: string;
    continueShopping: string;
    viewDetails: string;
    addStackToCart: string;
    retakeQuiz: string;
    close: string;
    remove: string;
  };
  badges: {
    fruitingBody: string;
    betaGlucans: string;
    dualExtracted: string;
    grownKinigi: string;
    labTested: string;
    zeroFillers: string;
    volcanicMinerals: string;
    elevation: string;
  };
  cart: {
    title: string;
    emptyTitle: string;
    emptySub: string;
    subtotal: string;
    shippingNotice: string;
    freeShippingKigali: string;
    tier1Unlocked: string;
    tier2Unlocked: string;
    tier1Progress: string;
    tier2Progress: string;
    tier1Name: string;
    tier2Name: string;
    subscriptionBadge: string;
    checkoutBtn: string;
    deliveryTime: string;
    quantity: string;
    remove: string;
  };
  routine: {
    title: string;
    subtitle: string;
    coffeeTitle: string;
    coffeeDesc: string;
    teaTitle: string;
    teaDesc: string;
    cacaoTitle: string;
    cacaoDesc: string;
    culinaryTitle: string;
    culinaryDesc: string;
  };
  quiz: {
    modalTitle: string;
    modalSubtitle: string;
    step1Question: string;
    step1Desc: string;
    step1OptFocus: string;
    step1OptCalm: string;
    step1OptImmunity: string;
    step1OptEnergy: string;
    step1OptCulinary: string;
    step2Question: string;
    step2Desc: string;
    step2OptCoffee: string;
    step2OptTea: string;
    step2OptCacao: string;
    step2OptKitchen: string;
    step3Question: string;
    step3Desc: string;
    step3OptBeginner: string;
    step3OptIntermediate: string;
    step3OptAdvanced: string;
    resultsTitle: string;
    resultsSubtitle: string;
    whyThisStack: string;
  };
  science: {
    title: string;
    subtitle: string;
    whyBetaGlucans: string;
    whyBetaGlucansDesc: string;
    tableHeaderFeature: string;
    tableHeaderVunga: string;
    tableHeaderOther: string;
    coaTitle: string;
    coaSubtitle: string;
    coaPlaceholder: string;
    coaButton: string;
    coaVerifiedBadge: string;
    coaSampleBatch: string;
    paperCounterTitle: string;
    paperCounterSub: string;
  };
  origin: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
  };
  tastingBar: {
    title: string;
    subtitle: string;
    address: string;
    hours: string;
    menuTitle: string;
    flightTitle: string;
    flightDesc: string;
    bookTitle: string;
    dateLabel: string;
    timeLabel: string;
    guestsLabel: string;
    experienceLabel: string;
    confirmBtn: string;
    wholesaleTitle: string;
    wholesaleSubtitle: string;
    weeklyVolume: string;
    calculateQuote: string;
  };
  footer: {
    brandTagline: string;
    newsletterTitle: string;
    newsletterDesc: string;
    emailPlaceholder: string;
    subscribeBtn: string;
    colShop: string;
    colLearn: string;
    colVenues: string;
    colLegal: string;
    copyright: string;
    location: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  EN: {
    nav: {
      home: 'Home',
      shop: 'Shop',
      science: 'Science & COA',
      origin: 'Virunga Origin',
      tastingBar: 'Kigali Bar',
      wholesale: 'Chef & Wholesale',
      quiz: 'Mushroom Matcher',
      findMatch: 'FIND YOUR MATCH',
      cart: 'Apothecary Bag',
      language: 'Language',
      currency: 'Currency',
    },
    hero: {
      tagline: 'Grown in the Volcanic Foothills of Kinigi · 2,400m',
      headline: 'Earthen Alchemy from the Volcanic Foothills of Kinigi',
      subheadline: 'Potent 100% fruiting body dual-extracts and fresh culinary mushrooms, nurtured by volcanic mineral soil and highland cloud forest mist.',
      ctaShop: 'Shop the Harvest',
      ctaQuiz: 'Take the Mushroom Matcher',
      badgeFruiting: '100% Fruiting Body',
      badgeBetaGlucans: '>30% Beta-Glucans',
      badgeDualExtract: 'Dual Hot-Water & Ethanol Extracted',
      badgeKinigi: 'Grown in Kinigi, Rwanda',
      badgeTested: '3rd-Party Lab Verified',
      scrollHint: 'Scroll to explore the harvest',
    },
    benefits: {
      focusTitle: 'Focus & Mental Clarity',
      focusSub: 'Neurogenesis, sustained focus, and sharp cognition powered by pure Lion\'s Mane.',
      calmTitle: 'Calm & Deep Sleep',
      calmSub: 'Soothe the nervous system and lower cortisol with high-altitude Highland Reishi.',
      immunityTitle: 'Immunity & Protection',
      immunitySub: 'Five elemental wild fungi working synergistically to fortify natural defenses.',
      energyTitle: 'Stamina, Oxygen & Cacao',
      energySub: 'Cellular ATP energy and VO2 max stamina in single-origin 75% Rwandan dark chocolate.',
      culinaryTitle: 'Fresh Rwandan Culinary',
      culinarySub: 'Gourmet wild and cultivated mushrooms harvested fresh at dawn for chef kitchens.',
    },
    cta: {
      shopHarvest: 'Shop the Harvest',
      takeQuiz: 'Take the Mushroom Matcher',
      addToCart: 'Add to Apothecary Bag',
      addedToCart: 'Added to Bag',
      subscribeSave: 'Subscribe & Save 15%',
      oneTimePurchase: 'One-Time Purchase',
      monthlySubscription: 'Monthly Ritual Subscription',
      selectFormat: 'Select Format',
      buildRitual: 'Build Your Virunga Ritual',
      verifyCoa: 'Verify Batch COA',
      reserveTasting: 'Reserve Tasting Flight',
      calculateWholesale: 'Calculate Wholesale Quote',
      proceedCheckout: 'Proceed to Checkout',
      continueShopping: 'Continue Shopping',
      viewDetails: 'View Details',
      addStackToCart: 'Add Recommended Stack to Bag',
      retakeQuiz: 'Retake Matcher',
      close: 'Close',
      remove: 'Remove',
    },
    badges: {
      fruitingBody: '100% Fruiting Body',
      betaGlucans: '>30% Beta-Glucans',
      dualExtracted: 'Dual Extracted',
      grownKinigi: 'Kinigi, Rwanda',
      labTested: 'Lab Tested & Verified',
      zeroFillers: 'Zero Grain Starch',
      volcanicMinerals: 'Volcanic Mineral Rich',
      elevation: '2,400m Elevation',
    },
    cart: {
      title: 'Apothecary Bag',
      emptyTitle: 'Your apothecary bag is empty',
      emptySub: 'Discover our volcanic functional extracts and fresh culinary harvest to begin your ritual.',
      subtotal: 'Subtotal',
      shippingNotice: 'Shipping & local taxes calculated at checkout',
      freeShippingKigali: 'Free same-day delivery in Kigali on orders over 40,000 RWF / $30',
      tier1Unlocked: 'Tier 1 Unlocked: Free Brushed Oxidized Copper 2g Dosing Scoop included',
      tier2Unlocked: 'Tier 2 Unlocked: Free VŪNGA Kinigi Mist Canvas Tote & Loyalty Card included',
      tier1Progress: 'Add {amount} more for a Free Copper Dosing Scoop',
      tier2Progress: 'Add {amount} more for a Free Canvas Tote & Dosing Card',
      tier1Name: 'Brushed Oxidized Copper 2g Dosing Scoop',
      tier2Name: 'Kinigi Mist Organic Canvas Tote & Stamp Card',
      subscriptionBadge: 'Monthly Ritual (15% Savings)',
      checkoutBtn: 'Checkout with MoMo / Bank of Kigali / Card',
      deliveryTime: 'Same-day delivery across Kigali · DHL Express worldwide',
      quantity: 'Quantity',
      remove: 'Remove',
    },
    routine: {
      title: 'Keep Your Routine. Add VŪNGA to It.',
      subtitle: 'Seamlessly integrate volcanic adaptogens into the rituals you already cherish every day.',
      coffeeTitle: 'In Your Morning Rwandan Coffee',
      coffeeDesc: 'Whisk 1 scoop of Lion\'s Mane Focus into freshly brewed Bourbon Arabica for clean flow state without the caffeine jitters.',
      teaTitle: 'In Your Evening Herbal Tonic',
      teaDesc: 'Dissolve Highland Reishi Calm into hot chamomile or warm oat milk 45 minutes before sleep to ground your circadian rhythm.',
      cacaoTitle: 'Two Squares of Afternoon Cacao',
      cacaoDesc: 'Savor rich 75% dark chocolate infused with Cordyceps militaris at 3 PM to oxygenate cells and overcome the afternoon slump.',
      culinaryTitle: 'Seared Fresh in Your Kitchen',
      culinaryDesc: 'Sear King Trumpet or Golden Oyster mushrooms in browned butter and highland thyme for an unforgettable plant-forward meal.',
    },
    quiz: {
      modalTitle: 'The Virunga Mushroom Matcher',
      modalSubtitle: 'Answer 3 brief questions to receive your tailored mycological formula from the volcanic highlands.',
      step1Question: 'What is your primary wellness or culinary focus?',
      step1Desc: 'Choose the core benefit you seek for your body and mind.',
      step1OptFocus: 'Sharp Mental Focus, Memory & Flow State',
      step1OptCalm: 'Nervous System Calm, Stress Relief & Deep Sleep',
      step1OptImmunity: 'Year-Round Immune Defense & Cellular Resilience',
      step1OptEnergy: 'Natural Stamina, Oxygen Uptake & Athletic Energy',
      step1OptCulinary: 'Gourmet Cooking with Fresh Highland Mushrooms',
      step2Question: 'How do you prefer to take your daily ritual?',
      step2Desc: 'Select how you enjoy your wellness moments.',
      step2OptCoffee: 'Stirred into morning coffee or morning matcha',
      step2OptTea: 'Dissolved in evening tea or calming herbal infusion',
      step2OptCacao: 'Artisanal dark chocolate ritual squares on the go',
      step2OptKitchen: 'Pan-seared or simmered in home culinary dishes',
      step3Question: 'What is your familiarity with functional fungi?',
      step3Desc: 'Help us calibrate your ideal daily dosing intensity.',
      step3OptBeginner: 'New to mushrooms — seeking a gentle, delicious daily entry',
      step3OptIntermediate: 'Familiar with adaptogens — looking for superior potency',
      step3OptAdvanced: 'Daily functional user or chef — wanting pure 100% fruiting body extracts',
      resultsTitle: 'Your Tailored Virunga Ritual Stack',
      resultsSubtitle: 'Based on your profile, our Kinigi mycologists recommend this high-potency volcanic formula:',
      whyThisStack: 'Why this formula is optimal for you:',
    },
    science: {
      title: 'Our Science & COA Verifier',
      subtitle: 'Radical Mycological Transparency. 100% Fruiting Bodies. Zero Starch Fillers.',
      whyBetaGlucans: 'Why Beta-Glucans Matter',
      whyBetaGlucansDesc: '1,3 / 1,6 Beta-D-Glucans are the true active medicinal compounds in functional mushrooms. Many commercial brands sell mycelium grown on oats or rice — giving you up to 70% grain starch and less than 5% active beta-glucans. At VŪNGA, we exclusively extract 100% mature fruiting bodies.',
      tableHeaderFeature: 'Quality Metric',
      tableHeaderVunga: 'VŪNGA Fruiting Body Extract',
      tableHeaderOther: 'Typical Mycelium-on-Grain Brands',
      coaTitle: 'Certificate of Analysis (COA) Batch Lookup',
      coaSubtitle: 'Verify the NMR identity, beta-glucan percentage, and heavy metal screening for your exact jar.',
      coaPlaceholder: 'Enter batch code (e.g. VNG-2026-LM01)',
      coaButton: 'Verify Batch',
      coaVerifiedBadge: 'Authentic 100% Fruiting Body · Verified by Independent HPLC & NMR Testing',
      coaSampleBatch: 'Quick Test Samples:',
      paperCounterTitle: 'Backed by Over 8,300+ Peer-Reviewed Studies',
      paperCounterSub: 'Decades of biomedical research confirm the neurological, immunomodulatory, and adaptogenic benefits of functional mushroom fruiting bodies.',
    },
    origin: {
      title: 'Virunga Origin: From Spore to Shelf in Kinigi',
      subtitle: 'At 2,400 meters altitude under the volcanoes of Mount Sabyinyo and Mount Bisoke, volcanic soil and cool highland mist nurture Africa\'s most potent medicinal fungi.',
      step1Title: '01. Volcanic Basalt & Organic Hardwood Substrate',
      step1Desc: 'Our mushrooms are cultivated on indigenous Rwandan hardwood chips and mineral-rich volcanic basalt dust, replicating deep wild forest ecology.',
      step2Title: '02. Highland Mist Fruiting in Kinigi Sanctuary',
      step2Desc: 'High-altitude cloud forest moisture and fresh Virunga mountain air foster thick, nutrient-dense mushroom caps rich in functional compounds.',
      step3Title: '03. Hand-Harvested at Peak Spore Maturity',
      step3Desc: 'Trained Musanze cooperative farmers harvest each fruiting body by hand at the precise dawn moment when beta-glucan density is at its apex.',
      step4Title: '04. Dual Hot-Water & Organic Ethanol Extraction',
      step4Desc: 'We break down the tough indigestible chitin cell walls using a proprietary two-stage extraction, freeing both water-soluble beta-glucans and alcohol-soluble triterpenes.',
      step5Title: '05. Women-Led Farmer Cooperatives & Regeneration',
      step5Desc: 'Every harvest supports living-wage agricultural jobs for over 120 women in Musanze District while recycling spent substrate into volcanic compost.',
    },
    tastingBar: {
      title: 'Kigali Flagship Apothecary & Tasting Bar',
      subtitle: 'Where volcanic mycology meets modern elixir craft in the heart of Kigali.',
      address: 'KG 674 St, Nyarutarama / Kimihurura, Kigali, Rwanda',
      hours: 'Tuesday – Sunday · 08:00 AM – 08:00 PM CAT',
      menuTitle: 'Daily Elixirs & Functional Doses',
      flightTitle: 'The Virunga Trilogy Tasting Flight',
      flightDesc: 'Three artisanal demitasse pours (Lion\'s Mane Pour-Over, Reishi Tonka Elixir, Cordyceps Golden Latte) paired with two squares of 75% dark single-origin cacao and a stamped apothecary dosing card.',
      bookTitle: 'Reserve a Table or Guided Tasting Flight',
      dateLabel: 'Select Date',
      timeLabel: 'Select Time Slot',
      guestsLabel: 'Number of Guests',
      experienceLabel: 'Experience Type',
      confirmBtn: 'Confirm Reservation',
      wholesaleTitle: 'Chef, Restaurant & Eco-Lodge Wholesale',
      wholesaleSubtitle: 'Fresh dawn deliveries and bulk extract supplies for Rwanda\'s premier culinary destinations.',
      weeklyVolume: 'Weekly Volume Requirement',
      calculateQuote: 'Request Wholesale Account',
    },
    footer: {
      brandTagline: 'Cultivated under the volcanic peaks of the Virunga Massif. Rooted in Kinigi, perfected in Kigali.',
      newsletterTitle: 'The Kinigi Harvest Bulletin',
      newsletterDesc: 'Subscribe for seasonal wild harvest alerts, limited reserve drops, and mycological research.',
      emailPlaceholder: 'Enter your email address',
      subscribeBtn: 'Subscribe',
      colShop: 'Apothecary & Harvest',
      colLearn: 'Science & Heritage',
      colVenues: 'Tasting Bar & Wholesale',
      colLegal: 'Verification & Legal',
      copyright: '© 2026 VŪNGA RWANDA. All rights reserved.',
      location: 'Kinigi, Musanze District, Northern Province, Rwanda.',
    },
  },
  RW: {
    nav: {
      home: 'Ahabanza',
      shop: 'Isoko',
      science: 'Ubushakashatsi',
      origin: 'Inkomoko',
      tastingBar: 'I Kigali',
      wholesale: 'Kurangura ku Mahoteli n\'Abatetsi',
      quiz: 'Guhitamo Igihumyo Cyawe',
      findMatch: 'SHAKA IGIKWIRIYE',
      cart: 'Igikapu Cy\'Ibihumyo',
      language: 'Ururimi',
      currency: 'Ifaranga',
    },
    hero: {
      tagline: 'Byeze mu Butaka bw\'Ibirunga i Kinigi · Metero 2,400',
      headline: 'Ubumenyi bw\'Ibihumyo by\'Umwimerere byo mu Birunga bya Kinigi',
      subheadline: 'Ibyagabanuwe byuzuye 100% by\'umwimerere n\'ibihumyo bishya byo kurya, byakuriye mu butaka bw\'ibirunga butoshye n\'igihu cyo mu misozi ya Virunga.',
      ctaShop: 'Gura Ibihumyo Byeze',
      ctaQuiz: 'Hitamo Igihumyo kigukwiye',
      badgeFruiting: '100% Igihumyo Nyacyo',
      badgeBetaGlucans: '>30% Beta-Glucans',
      badgeDualExtract: 'Byatunganyirijwe mu mazi n\'umusemburo',
      badgeKinigi: 'Byahingwa i Kinigi mu Rwanda',
      badgeTested: 'Byemejwe na Laboratwari',
      scrollHint: 'Komeza hasi urebe umusaruro',
    },
    benefits: {
      focusTitle: 'Gushyira Umutima ku Murimo & Gutekereza Neza',
      focusSub: 'Gufasha ubwonko gukora neza no kwibuka bishingiye ku gihumyo cya Lion\'s Mane.',
      calmTitle: 'Ituze rirambye & Gusinzira Neza',
      calmSub: 'Kugabanya umunaniro n\'umuhangayiko ukoresheje Reishi yo mu misozi miremire.',
      immunityTitle: 'Ubwirinzi bw\'Umubiri & Gukomera',
      immunitySub: 'Ibihumyo 5 by\'amoko akomeye bifatanyiriza hamwe kurinda ubuzima bwawe buri gihe.',
      energyTitle: 'Imbaraga z\'Umubiri & Tsikola y\'u Rwanda',
      energySub: 'Imbaraga nyakuri zituruka mu kinyamisogwe cy\'u Rwanda gifatanije na Cordyceps.',
      culinaryTitle: 'Ibihumyo Bishya byo mu Gikoni',
      culinarySub: 'Ibihumyo bidasanzwe bisoromwa buri gitondo ku bakozi b\'i Kinigi bitegurirwa amahoteli n\'ingo.',
    },
    cta: {
      shopHarvest: 'Gura Ibihumyo Byeze',
      takeQuiz: 'Hitamo Igihumyo kigukwiye',
      addToCart: 'Shyira mu Gikapu',
      addedToCart: 'Byashyizwe mu Gikapu',
      subscribeSave: 'Fata Ifatabuguzi Wizigamire 15%',
      oneTimePurchase: 'Kugura Rimwe Gusa',
      monthlySubscription: 'Ifatabuguzi rya Buri Kwezi',
      selectFormat: 'Hitamo Imiterere',
      buildRitual: 'Iteganyirize Umuganda w\'Ibihumyo',
      verifyCoa: 'Reba Ibyemezo bya Laboratwari',
      reserveTasting: 'Fata Umwanya wo Gusogongera',
      calculateWholesale: 'Bara Igiciro cyo Kurangura',
      proceedCheckout: 'Komeza Kwishyura',
      continueShopping: 'Komeza Guhaha',
      viewDetails: 'Reba Birambuye',
      addStackToCart: 'Shyira Ibyo Wagiriwe Inama mu Gikapu',
      retakeQuiz: 'Subiramo Ibibazo',
      close: 'Funga',
      remove: 'Kura mu Gikapu',
    },
    badges: {
      fruitingBody: '100% Igihumyo Nyacyo',
      betaGlucans: '>30% Beta-Glucans',
      dualExtracted: 'Byatunganyijwe Kabiri',
      grownKinigi: 'Kinigi, u Rwanda',
      labTested: 'Byemejwe na Laboratwari',
      zeroFillers: 'Nta Myanda y\'Ingano',
      volcanicMinerals: 'Bikungahaye ku Munyu w\'Ibirunga',
      elevation: 'Metero 2,400 z\'Ubutumburuke',
    },
    cart: {
      title: 'Igikapu Cy\'Ibihumyo',
      emptyTitle: 'Igikapu cyawe kiracyarimo ubusa',
      emptySub: 'Tembera mu bucuruzi bwacu bw\'ibihumyo byo mu birunga n\'ibyo guteka utangire urugendo rwawe.',
      subtotal: 'Amafaranga Yose Hamwe',
      shippingNotice: 'Kugeza ibicuruzwa bibarirwa mu gihe cyo kwishyura',
      freeShippingKigali: 'Kugezwaho ku buntu i Kigali ku bicuruzwa birengeje 40,000 RWF',
      tier1Unlocked: 'Icyiciro cya 1 Cyagezweho: Uherewe ubuntu Akayiko k\'Umuringa ko gupima (2g)',
      tier2Unlocked: 'Icyiciro cya 2 Cyagezweho: Uherewe ubuntu Igikapu cy\'Igitambaro cya Kinigi Mist & Ikarita y\'Ubudahemuka',
      tier1Progress: 'Yongeraho {amount} uhabwe akayiko k\'umuringa k\'ubuntu',
      tier2Progress: 'Yongeraho {amount} uhabwe igikapu cya kanyaburanga n\'ikarita',
      tier1Name: 'Akayiko k\'Umuringa ko Gupima Ibihumyo (2g)',
      tier2Name: 'Igikapu cy\'Igitambaro cya Kinigi Mist & Ikarita',
      subscriptionBadge: 'Ifatabuguzi rya buri kwezi (Kugabanyirizwa 15%)',
      checkoutBtn: 'Ishyura ukoresheje MoMo / Bank of Kigali / Karita',
      deliveryTime: 'Bikugeraho uwo munsi i Kigali · DHL ku rwego mpuzamahanga',
      quantity: 'Ingano',
      remove: 'Gukuramo',
    },
    routine: {
      title: 'Komeza Gahunda Yawe. Yongeremo VŪNGA.',
      subtitle: 'Injiza ibihumyo by\'ibirunga mu binyobwa n\'ibiryo ufata buri munsi bitakugoye.',
      coffeeTitle: 'Mu Ikawa Yawe ya Mugitondo y\'u Rwanda',
      coffeeDesc: 'Vanga akayiko kamwe ka Lion\'s Mane mu ikawa y\'Arabica ya mugitondo kugira ngo ubwonko bwawe bukanguke neza.',
      teaTitle: 'Mu Cyayi Cyawe cyo Nimugoroba',
      teaDesc: 'Shyira Reishi mu cyayi gishyushye iminota 45 mbere yo kuryama kugira ngo usinzire neza utuje.',
      cacaoTitle: 'Uduce Tubiri twa Tsikola Nimanywa',
      cacaoDesc: 'Fata uduce tubiri twa tsikola y\'umukara yivanze na Cordyceps saa kenda z\'amanywa kugira ngo wongere intege.',
      culinaryTitle: 'Bikaranze Bishya mu Gikoni Cyawe',
      culinaryDesc: 'Karanga King Trumpet cyangwa Golden Oyster mu mavuta meza n\'amashaza ku meza asukuye y\'umuryango.',
    },
    quiz: {
      modalTitle: 'Guhitamo Igihumyo Kigukwiye muri Virunga',
      modalSubtitle: 'Subiza ibibazo 3 gusa abahanga bacu b\'i Kinigi baguhitiremo igihumyo kiberanye n\'umubiri wawe.',
      step1Question: 'Ni iyihe ntego nyamukuru y\'ubuzima cyangwa igikoni ushaka kugeraho?',
      step1Desc: 'Hitamo iby\'ingenzi umubiri n\'ubwenge bwawe bikeneye cyane.',
      step1OptFocus: 'Gushyira Umutima ku Murimo, Kwibuka & Gutekereza Neza',
      step1OptCalm: 'Kuruhuka, Kugabanya Umunaniro & Gusinzira Neza',
      step1OptImmunity: 'Ubwirinzi Bukomeye bw\'Umubiri mu Bihe Byose',
      step1OptEnergy: 'Ingufu z\'Umubiri, Gutera Imbere mu Myitozo & Kwihangana',
      step1OptCulinary: 'Guteka Ibiryo Biryoshye cyane Byifashishije Ibihumyo Bishya',
      step2Question: 'Ni ubuhe buryo ukunda gukoresha buri munsi?',
      step2Desc: 'Hitamo uko wishimira gufata ibigufasha mu buzima.',
      step2OptCoffee: 'Kubivanga mu ikawa ya mugitondo cyangwa icyayi',
      step2OptTea: 'Kunywa mu cyayi gishyushye cyo ku mugoroba',
      step2OptCacao: 'Kuriya uduce twa tsikola iryoshye aho uri hose',
      step2OptKitchen: 'Gukaranga cyangwa guteka mu biryo byo mu rugo',
      step3Question: 'Ubumenyi bwawe ku bihumyo bivura bungana gute?',
      step3Desc: 'Bifasha kumenya urugero rw\'ingufu rukwiranye nawe.',
      step3OptBeginner: 'Ndi mushya — nshaka ibyoroshye kandi biryoshye bitangira',
      step3OptIntermediate: 'Ndabyizeye — nsanzwe nkoresha ibintu byongera imbaraga',
      step3OptAdvanced: 'Ndi inzobere / umutetsi — nshaka ibyagabanuwe bikomeye 100%',
      resultsTitle: 'Ibihumyo Byatoranirijwe Wowe Ubwawe',
      resultsSubtitle: 'Dushingiye ku bisubizo byawe, abahanga b\'i Kinigi barakugira inama yo gukoresha iyi mvange:',
      whyThisStack: 'Impamvu iyi mvange igukwiriye kurusha izindi:',
    },
    science: {
      title: 'Ubumenyi Bwacu & Ibyemezo bya Laboratwari',
      subtitle: 'Ukuri Kwambaye Ubusa. 100% Ibihumyo Nyabyo. Nta Bisigazwa by\'Ingano.',
      whyBetaGlucans: 'Impamvu Beta-Glucans Zifite Akamaro Gakomeye',
      whyBetaGlucansDesc: 'Beta-Glucans (1,3 / 1,6) nizo ntungamubiri zifatiye runini ibihumyo bifite mu kurinda umubiri. Amakompanyi menshi agurisha imizi y\'ibihumyo yameze ku ngano — bikaguha ifu y\'ingano 70% naho ibifitiye umubiri akamaro bikaba munsi ya 5%. Muri VŪNGA, dukoresha 100% umubiri w\'igihumyo cyeze neza.',
      tableHeaderFeature: 'Icyiciro cy\'Ubuziranenge',
      tableHeaderVunga: 'Ibyagabanuwe bya VŪNGA',
      tableHeaderOther: 'Ibindi bicuruzwa bishingiye ku ngano',
      coaTitle: 'Kugenzura Icyemezo cy\'Isesengura rya Laboratwari',
      coaSubtitle: 'Shyiramo nimero y\'agapaki kawe urebe ibipimo by\'umwimerere na laboratwari yabyemeje.',
      coaPlaceholder: 'Shyiramo nimero y\'agapaki (urugero: VNG-2026-LM01)',
      coaButton: 'Genjura Agapaki',
      coaVerifiedBadge: 'Byemejwe 100% ko ari Umwimerere na Laboratwari Yigenga',
      coaSampleBatch: 'Ingero z\'Utupaki wasuzuma:',
      paperCounterTitle: 'Bishyigikiwe n\'Ubushakashatsi Bwasohotse Burenga 8,300',
      paperCounterSub: 'Imyaka ibarirwa muri za mirongo y\'ubuvuzi bwemeza ko ibihumyo by\'ibirunga bifasha ubwonko, ubwirinzi n\'uburambe.',
    },
    origin: {
      title: 'Inkomoko muri Virunga: Kuva ku Rusobe kugeza ku Isoko i Kinigi',
      subtitle: 'Ku butumburuke bwa metero 2,400 munsi y\'Ibirunga bya Sabyinyo na Bisoke, ubutaka bw\'ibirunga butoshye n\'igihu bitanga ibihumyo byiza kurusha ibindi muri Afurika.',
      step1Title: '01. Ubutaka bw\'Ibirunga & Ibishishwa by\'Ibiti Byiza',
      step1Desc: 'Ibihumyo byacu byezwa ku biti gakondo byo mu Rwanda n\'ifu y\'amabuye y\'ibirunga akungahaye ku myunyu ngugu.',
      step2Title: '02. Kwera mu Gihu cy\'Imisozi y\'i Kinigi',
      step2Desc: 'Umwuka ukonje n\'ubuhehere bwo mu misozi ya Virunga bituma ibihumyo bikura bifite ubushobozi n\'intungamubiri ziri ku kigero cyo hejuru.',
      step3Title: '03. Gusoromwa n\'Intoki mu Rukerera',
      step3Desc: 'Abahinzi b\'inzobere b\'i Musanze basoroma buri gihumyo mu rukerera igihe cyose cyuzuyemo intungamubiri zihagije.',
      step4Title: '04. Gutunganywa mu Mazi Abira no mu Musemburo w\'Isukari',
      step4Desc: 'Dukoresha uburyo bwo gutunganya kabiri kugira ngo dufungure intungamubiri zose zifunze mu rukuta rw\'igihumyo.',
      step5Title: '05. Koperative z\'Abagore b\'i Musanze & Kubungabunga Ibidukikije',
      step5Desc: 'Uyu murimo uhaye akazi kishyurwa neza abagore barenga 120 bo muri Musanze, bisigazwa bigakoreshwa nk\'ifumbire y\'ibirunga.',
    },
    tastingBar: {
      title: 'Akabari k\'Ibihumyo n\'Ibinyobwa i Kigali',
      subtitle: 'Aho ubumenyi gakondo bw\'ibirunga buhurira n\'ubuhanga bugezweho mu mutima wa Kigali.',
      address: 'KG 674 St, Nyarutarama / Kimihurura, Kigali, u Rwanda',
      hours: 'Kuwa Kabiri – Ku Cyumweru · Saa mbili za Mugitondo kugeza Saa mbili z\'Ijoro CAT',
      menuTitle: 'Ibinyobwa by\'Umunsi & Imiti y\'Umwimerere',
      flightTitle: 'Urutonde rwo Gusogongera Ibihumyo bitatu bya Virunga',
      flightDesc: 'Ibikombe bitatu bito by\'ibihumyo bitandukanye (Lion\'s Mane Pour-Over, Reishi Tonka Elixir, Cordyceps Golden Latte) biherekejwe na tsikola y\'umwimerere n\'ikarita y\'amabwiriza.',
      bookTitle: 'Fata Umwanya ku Meza cyangwa Gusogongera',
      dateLabel: 'Hitamo Itariki',
      timeLabel: 'Hitamo Isaha',
      guestsLabel: 'Umubare w\'Abashyitsi',
      experienceLabel: 'Ubwoko bw\'Uburambe',
      confirmBtn: 'Emeza Umwanya',
      wholesaleTitle: 'Gucuruza ku Mahoteli, Abatetsi n\'Amahuguriro',
      wholesaleSubtitle: 'Umusaruro mushya ugezwa mu gitondo ku mahoteli n\'abahanga mu guteka bo mu Rwanda hose.',
      weeklyVolume: 'Ingano Mukenera mu Cyumweru',
      calculateQuote: 'Saba Konti yo Kurangura',
    },
    footer: {
      brandTagline: 'Byakuriye munsi y\'amasonga y\'ibirunga bya Virunga. Byashinze imizi i Kinigi, byatunganyirizwa i Kigali.',
      newsletterTitle: 'Amakuru y\'Umusaruro w\'i Kinigi',
      newsletterDesc: 'Iyandikishe ujye ubona amakuru y\'igihe cy\'isarura n\'ubushakashatsi bushya bw\'ibihumyo.',
      emailPlaceholder: 'Shyiramo imeri yawe hano',
      subscribeBtn: 'Iyandikishe',
      colShop: 'Ibicuruzwa & Isarura',
      colLearn: 'Ubumenyi & Gakondo',
      colVenues: 'Gusogongera & Kurangura',
      colLegal: 'Ubuziranenge & Amategeko',
      copyright: '© 2026 VŪNGA RWANDA. Uburenganzira bwose burabitswe.',
      location: 'Kinigi, Akarere ka Musanze, Intara y\'Amajyaruguru, u Rwanda.',
    },
  },
  FR: {
    nav: {
      home: 'Accueil',
      shop: 'Boutique',
      science: 'Science & COA',
      origin: 'Origine',
      tastingBar: 'Bar Kigali',
      wholesale: 'Chefs & Vente en Gros',
      quiz: 'Diagnostique Mycologique',
      findMatch: 'TROUVEZ VOTRE RITUEL',
      cart: 'Panier Apothicaire',
      language: 'Langue',
      currency: 'Devise',
    },
    hero: {
      tagline: 'Cultivé sur les Contreforts Volcaniques de Kinigi · 2 400 m',
      headline: 'L\'Alchimie Tellurique des Contreforts Volcaniques de Kinigi',
      subheadline: 'Extraits purs à 100% de sporophores et champignons gastronomiques frais, nourris par la terre volcanique minérale et les brumes d\'altitude du Massif des Virunga.',
      ctaShop: 'Découvrir la Récolte',
      ctaQuiz: 'Faire le Test Champignon',
      badgeFruiting: '100% Corps Fructifère',
      badgeBetaGlucans: '>30% Bêta-Glucanes',
      badgeDualExtract: 'Double Extraction Eau & Éthanol Bio',
      badgeKinigi: 'Cultivé à Kinigi, Rwanda',
      badgeTested: 'Testé en Laboratoire Certifié',
      scrollHint: 'Faites défiler pour explorer la récolte',
    },
    benefits: {
      focusTitle: 'Concentration & Clarté Mentale',
      focusSub: 'Neurogenèse, clarté d\'esprit et vivacité intellectuelle grâce à la pure Crinière de Lion.',
      calmTitle: 'Sérénité & Sommeil Réparateur',
      calmSub: 'Apaisement profond du système nerveux et régulation du cortisol avec le Reishi des hauts plateaux.',
      immunityTitle: 'Immunité & Bouclier Cellulaire',
      immunitySub: 'Synergie souveraine de 5 champignons majeurs pour une défense immunitaire intégrale.',
      energyTitle: 'Vitalité, Endurance & Cacao',
      energySub: 'Production cellulaire d\'ATP et endurance respiratoire dans un grand cru de chocolat noir rwandais 75%.',
      culinaryTitle: 'Champignons Gastronomiques Frais',
      culinarySub: 'Champignons d\'exception sauvages et cultivés cueillis à l\'aube pour les chefs et épicuriens.',
    },
    cta: {
      shopHarvest: 'Découvrir la Récolte',
      takeQuiz: 'Faire le Test Champignon',
      addToCart: 'Ajouter au Panier Apothicaire',
      addedToCart: 'Ajouté au Panier',
      subscribeSave: 'S\'abonner & Économiser 15%',
      oneTimePurchase: 'Achat Unique',
      monthlySubscription: 'Abonnement Rituel Mensuel',
      selectFormat: 'Choisir le Format',
      buildRitual: 'Composer Votre Rituel Virunga',
      verifyCoa: 'Vérifier le Certificat COA',
      reserveTasting: 'Réserver une Dégustation',
      calculateWholesale: 'Calculer le Tarif Pro',
      proceedCheckout: 'Passer à la Caisse',
      continueShopping: 'Poursuivre les Achats',
      viewDetails: 'Détails du Produit',
      addStackToCart: 'Ajouter la Sélection au Panier',
      retakeQuiz: 'Recommencer le Test',
      close: 'Fermer',
      remove: 'Supprimer',
    },
    badges: {
      fruitingBody: '100% Corps Fructifère',
      betaGlucans: '>30% Bêta-Glucanes',
      dualExtracted: 'Double Extraction',
      grownKinigi: 'Kinigi, Rwanda',
      labTested: 'Analysé en Laboratoire',
      zeroFillers: 'Zéro Amidon de Céréale',
      volcanicMinerals: 'Riche en Minéraux Volcaniques',
      elevation: 'Altitude 2 400 m',
    },
    cart: {
      title: 'Panier Apothicaire',
      emptyTitle: 'Votre panier apothicaire est vide',
      emptySub: 'Explorez nos extraits volcaniques et notre récolte culinaire fraîche pour initier votre rituel.',
      subtotal: 'Sous-total',
      shippingNotice: 'Frais de livraison calculés lors du paiement',
      freeShippingKigali: 'Livraison gratuite le jour même à Kigali dès 40 000 RWF / 30 $',
      tier1Unlocked: 'Palier 1 Débloqué : Cuillère Doseuse en Cuivre Oxydé Brossé 2g offerte',
      tier2Unlocked: 'Palier 2 Débloqué : Tote Bag en Coton Bio Kinigi Mist & Carte de Fidélité offerts',
      tier1Progress: 'Ajoutez {amount} supplémentaires pour recevoir la Cuillère en Cuivre',
      tier2Progress: 'Ajoutez {amount} supplémentaires pour débloquer le Tote Bag & la Carte',
      tier1Name: 'Cuillère Doseuse en Cuivre Brossé 2g',
      tier2Name: 'Tote Bag Kinigi Mist & Carte de Fidélité',
      subscriptionBadge: 'Rituel Mensuel (-15% d\'économie)',
      checkoutBtn: 'Payer via MoMo / Bank of Kigali / Carte',
      deliveryTime: 'Livraison le jour même à Kigali · DHL Express international',
      quantity: 'Quantité',
      remove: 'Supprimer',
    },
    routine: {
      title: 'Gardez Votre Routine. Ajoutez VŪNGA.',
      subtitle: 'Intégrez les champignons adaptogènes volcaniques à vos habitudes quotidiennes les plus chères.',
      coffeeTitle: 'Dans Votre Café d\'Origine Rwandaise',
      coffeeDesc: 'Fouettez 1 cuillère de Crinière de Lion dans votre Arabica Bourbon pour un état de flow profond sans tremblement.',
      teaTitle: 'Dans Votre Infusion du Soir',
      teaDesc: 'Dissolvez le Reishi des Hauts Plateaux dans une tisane chaude 45 minutes avant le coucher pour restaurer votre rythme biologique.',
      cacaoTitle: 'Deux Carrés de Cacao l\'Après-Midi',
      cacaoDesc: 'Dégustez notre chocolat noir 75% infusé au Cordyceps militaris à 15h pour relancer la vitalité et oxygéner vos cellules.',
      culinaryTitle: 'Poêlés Frais dans Votre Cuisine',
      culinaryDesc: 'Faites caraméliser nos Pleurotes Royaux ou Pleurotes Dorés dans un beurre noisette et thym des collines.',
    },
    quiz: {
      modalTitle: 'Le Diagnostique Mycologique VŪNGA',
      modalSubtitle: 'Répondez à 3 questions précises pour recevoir la recommandation de nos mycologues des hauts plateaux.',
      step1Question: 'Quel est votre objectif principal de bien-être ou gastronomique ?',
      step1Desc: 'Sélectionnez le bénéfice essentiel recherché pour votre corps et votre esprit.',
      step1OptFocus: 'Clarté Mentale Aiguë, Mémoire & État de Flow',
      step1OptCalm: 'Sérénité Nerveuse, Soulagement du Stress & Sommeil Réparateur',
      step1OptImmunity: 'Défense Immunitaire & Résilience Cellulaire Quotidienne',
      step1OptEnergy: 'Endurance Physique, Oxygénation & Vitalité Propre',
      step1OptCulinary: 'Haute Gastronomie avec Champignons Frais de Terroir',
      step2Question: 'Comment préférez-vous consommer votre rituel ?',
      step2Desc: 'Choisissez votre modalité de préparation favorite.',
      step2OptCoffee: 'Mélangé à votre café ou matcha matinal',
      step2OptTea: 'Dissous dans une infusion ou tisane chaude vespérale',
      step2OptCacao: 'Carrés de chocolat noir nomades à savourer en journée',
      step2OptKitchen: 'Sauté à la poêle ou mijoté dans vos plats gastronomiques',
      step3Question: 'Quelle est votre familiarité avec les champignons fonctionnels ?',
      step3Desc: 'Permettez-nous de calibrer le dosage idéal pour votre quotidien.',
      step3OptBeginner: 'Débutant curieux — à la recherche d\'une initiation douce et savoureuse',
      step3OptIntermediate: 'Adepte des adaptogènes — souhaitant une puissance d\'extraction supérieure',
      step3OptAdvanced: 'Utilisateur assidu ou chef — exigeant 100% de sporophores purs haute concentration',
      resultsTitle: 'Votre Protocole Mycologique Recommandé',
      resultsSubtitle: 'Selon vos réponses, nos experts de Kinigi ont composé cette formule volcanique de pointe :',
      whyThisStack: 'Pourquoi cette formulation est optimale pour vous :',
    },
    science: {
      title: 'Notre Science & Vérification COA',
      subtitle: 'Transparence Mycologique Radicale. 100% Corps Fructifères. Zéro Amidon de Remplissage.',
      whyBetaGlucans: 'L\'Importance Cruciale des Bêta-Glucanes',
      whyBetaGlucansDesc: 'Les 1,3 / 1,6 Bêta-D-Glucanes constituent les véritables principes actifs thérapeutiques des champignons médicinaux. De nombreuses marques industrielles commercialisent du mycélium cultivé sur avoine ou riz, contenant jusqu\'à 70% d\'amidon inactif et moins de 5% de principes actifs. Chez VŪNGA, nous extrayons exclusivement 100% de sporophores matures.',
      tableHeaderFeature: 'Indicateur de Pureté',
      tableHeaderVunga: 'Extraits Purs de Sporophores VŪNGA',
      tableHeaderOther: 'Produits Industriels sur Céréales',
      coaTitle: 'Vérification de Certificat d\'Analyse (COA)',
      coaSubtitle: 'Vérifiez la pureté HPLC, le taux certifié de bêta-glucanes et l\'absence de métaux lourds de votre lot.',
      coaPlaceholder: 'Entrez le numéro de lot (ex. VNG-2026-LM01)',
      coaButton: 'Vérifier le Lot',
      coaVerifiedBadge: 'Authentique 100% Sporophore · Certifié par Spectrométrie NMR & HPLC Indépendante',
      coaSampleBatch: 'Lots de démonstration :',
      paperCounterTitle: 'Validé par Plus de 8 300 Études Scientifiques à Comité de Lecture',
      paperCounterSub: 'Des décennies de recherches biomédicales internationales confirment les vertus neurologiques, immunomodulatrices et adaptogènes des champignons médicinaux.',
    },
    origin: {
      title: 'Origine Virunga : Du Spore au Flacon à Kinigi',
      subtitle: 'À 2 400 mètres d\'altitude sous le regard des monts Sabyinyo et Bisoke, la terre volcanique fertile et les brumes fraîches donnent naissance aux champignons les plus concentrés d\'Afrique.',
      step1Title: '01. Basalte Volcanique & Substrat de Bois Dur Indigène',
      step1Desc: 'Nos champignons sont cultivés sur copeaux de bois durs rwandais et poussières minérales volcaniques, reproduisant fidèlement la litière forestière sauvage.',
      step2Title: '02. Fructification sous les Brumes de Haute Altitude à Kinigi',
      step2Desc: 'L\'humidité de la forêt de nuages et l\'air pur des montagnes des Virunga stimulent des sporophores denses et concentrés en principes bioactifs.',
      step3Title: '03. Récolte Manuelle à l\'Aube au Pic de Maturité',
      step3Desc: 'Les agricultrices de notre coopérative de Musanze cueillent chaque champignon à la main au lever du soleil lorsque la concentration en bêta-glucanes est maximale.',
      step4Title: '04. Double Extraction à l\'Eau Chaude & Éthanol Bio',
      step4Desc: 'Nous brisons la membrane coriace de chitine par une double extraction exclusive, libérant l\'intégralité des bêta-glucanes hydrosolubles et triterpènes liposolubles.',
      step5Title: '05. Coopératives Féminines de Musanze & Agroécologie Régénératrice',
      step5Desc: 'Chaque récolte rémunère dignement plus de 120 femmes du district de Musanze tout en recyclant le substrat épuisé en compost volcanique fertile.',
    },
    tastingBar: {
      title: 'Bar de Dégustation & Apothicaire Flagship à Kigali',
      subtitle: 'L\'alliance de la mycologie ancestrale et de la mixologie moderne au cœur de Kigali.',
      address: 'KG 674 St, Nyarutarama / Kimihurura, Kigali, Rwanda',
      hours: 'Mardi – Dimanche · 08h00 – 20h00 CAT',
      menuTitle: 'Élixirs Quotidiens & Doses Thérapeutiques',
      flightTitle: 'Le Vol de Dégustation Trilogie des Virunga',
      flightDesc: 'Trois tasses artisanales en grès (Pour-Over Lion\'s Mane, Élixir Reishi Fève Tonka, Golden Latte au Cordyceps) accompagnées de deux carrés de grand cru de chocolat noir 75% et de votre carnet apothicaire.',
      bookTitle: 'Réserver une Table ou un Vol de Dégustation',
      dateLabel: 'Date Souhaitée',
      timeLabel: 'Créneau Horaire',
      guestsLabel: 'Nombre d\'Invités',
      experienceLabel: 'Type d\'Expérience',
      confirmBtn: 'Confirmer la Réservation',
      wholesaleTitle: 'Vente aux Chefs, Hôtels & Éco-Lodges',
      wholesaleSubtitle: 'Livraison fraîche matinale et extraits grand format pour les meilleures tables du Rwanda.',
      weeklyVolume: 'Besoins Hebdomadaires Estimés',
      calculateQuote: 'Ouvrir un Compte Professionnel',
    },
    footer: {
      brandTagline: 'Cultivé sous les cimes volcaniques du Massif des Virunga. Enraciné à Kinigi, sublimé à Kigali.',
      newsletterTitle: 'Le Bulletin des Récoltes de Kinigi',
      newsletterDesc: 'Abonnez-vous pour recevoir les annonces de cueillettes sauvages et les avancées scientifiques.',
      emailPlaceholder: 'Entrez votre adresse email',
      subscribeBtn: 'S\'inscrire',
      colShop: 'Boutique & Récoltes',
      colLearn: 'Science & Héritage',
      colVenues: 'Dégustation & Gros',
      colLegal: 'Certifications & Légal',
      copyright: '© 2026 VŪNGA RWANDA. Tous droits réservés.',
      location: 'Kinigi, District de Musanze, Province du Nord, Rwanda.',
    },
  },
};

export default translations;
