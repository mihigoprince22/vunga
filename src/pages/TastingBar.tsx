import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  MapPin,
  Calendar,
  Coffee,
  CheckCircle2,
  Sparkles,
  Building2,
  Plus,
  Minus,
  ArrowRight,
  Percent,
  Calculator,
} from 'lucide-react';
import { useVunga } from '../context/VungaContext';

// --- Wholesale Products Configuration ---
interface WholesaleProduct {
  id: string;
  name: string;
  category: 'culinary' | 'extract';
  max: number;
  unit: string;
  priceRWF: number;
  priceUSD: number;
  description: string;
}

const WHOLESALE_ITEMS: WholesaleProduct[] = [
  {
    id: 'pearl-oyster',
    name: 'Fresh Pearl Oyster',
    category: 'culinary',
    max: 50,
    unit: 'kg/week',
    priceRWF: 12000,
    priceUSD: 9.0,
    description: 'Delicate fluted clusters harvested dawn daily in Kinigi',
  },
  {
    id: 'cremini-button',
    name: 'Fresh Cremini & Button',
    category: 'culinary',
    max: 50,
    unit: 'kg/week',
    priceRWF: 14000,
    priceUSD: 10.5,
    description: 'Dense volcanic earth Agaricus for kitchen bistros & braises',
  },
  {
    id: 'oak-shiitake',
    name: 'Fresh Oak Shiitake',
    category: 'culinary',
    max: 30,
    unit: 'kg/week',
    priceRWF: 26000,
    priceUSD: 19.5,
    description: 'Cracked Donko caps rich in savory glutamate umami',
  },
  {
    id: 'golden-oyster',
    name: 'Fresh Golden Oyster',
    category: 'culinary',
    max: 30,
    unit: 'kg/week',
    priceRWF: 18000,
    priceUSD: 13.5,
    description: 'Vibrant golden bouquets with toasted cashew finish',
  },
  {
    id: 'king-trumpet',
    name: 'Fresh King Trumpet',
    category: 'culinary',
    max: 30,
    unit: 'kg/week',
    priceRWF: 22000,
    priceUSD: 16.5,
    description: 'Meaty cylindrical stems ideal for searing & plant steaks',
  },
  {
    id: 'wood-ear',
    name: 'Dried Wood Ear',
    category: 'culinary',
    max: 20,
    unit: 'kg/week',
    priceRWF: 36000,
    priceUSD: 27.0,
    description: 'Sun-cured highland cloud forest fronds with distinctive snap',
  },
  {
    id: 'rwanda-termitomyces-imegeri',
    name: 'Rwandan Heritage Termitomyces (Imegeri Reserve)',
    category: 'culinary',
    max: 15,
    unit: 'kg/week',
    priceRWF: 48000,
    priceUSD: 36.0,
    description: 'Prized wild-foraged symbiotic termite mound harvest, sun-dried reserve',
  },
  {
    id: 'bulk-lm',
    name: "Bulk Lion's Mane Extract",
    category: 'extract',
    max: 10,
    unit: '1kg pouches',
    priceRWF: 240000,
    priceUSD: 180.0,
    description: '10:1 Dual hydro-ethanolic extract (>30% beta-glucan)',
  },
  {
    id: 'bulk-reishi',
    name: 'Bulk Reishi Extract',
    category: 'extract',
    max: 10,
    unit: '1kg pouches',
    priceRWF: 260000,
    priceUSD: 195.0,
    description: '12:1 Red Reishi fruiting body extract with active triterpenes',
  },
  {
    id: 'bulk-5def',
    name: 'Bulk 5-Defenders Extract',
    category: 'extract',
    max: 10,
    unit: '1kg pouches',
    priceRWF: 280000,
    priceUSD: 210.0,
    description: 'Master synergy formulation for beverage infusions & bars',
  },
];

const TIME_SLOTS = [
  '08:00 AM CAT',
  '09:00 AM CAT',
  '10:00 AM CAT',
  '11:00 AM CAT',
  '12:00 PM CAT',
  '01:00 PM CAT',
  '02:00 PM CAT',
  '03:00 PM CAT',
  '04:00 PM CAT',
  '05:00 PM CAT',
  '06:00 PM CAT',
  '07:00 PM CAT',
  '08:00 PM CAT',
];

const EXPERIENCES = [
  {
    name: 'Tasting Flight',
    priceRWF: 12000,
    priceUSD: 9.0,
    desc: '3 demitasse pours + 2 Cordyceps 75% cacao squares + dosing card',
  },
  {
    name: "Morning Co-Work & Lion's Mane Pour-Over",
    priceRWF: 4500,
    priceUSD: 3.5,
    desc: 'Quiet espresso bar seating, high-speed fiber, infinite herbal infusions',
  },
  {
    name: 'Private Mycologist Guided Tasting',
    priceRWF: 25000,
    priceUSD: 19.0,
    desc: '45-minute sensory deep-dive through rare wild reserves and extraction chemistry',
  },
];

const TastingBar = () => {
  // --- Currency Context Support with Graceful Fallback ---
  let currency: 'RWF' | 'USD' = 'RWF';
  let formatPrice = (rwf: number, usd?: number) => {
    if (currency === 'USD') {
      const val = usd !== undefined ? usd : Math.round(rwf / 1350);
      return `$${Number.isInteger(val) ? val : val.toFixed(2)}`;
    }
    return `${rwf.toLocaleString()} RWF`;
  };

  try {
    const vungaContext = useVunga();
    currency = vungaContext.currency;
    formatPrice = vungaContext.formatPrice;
  } catch {
    // Isolated mode fallback
  }

  // --- Reservation State ---
  const todayStr = new Date().toISOString().split('T')[0];
  const [resDate, setResDate] = useState(todayStr);
  const [resTime, setResTime] = useState(TIME_SLOTS[2]); // 10:00 AM
  const [guestCount, setGuestCount] = useState(2);
  const [experience, setExperience] = useState(EXPERIENCES[0].name);
  const [guestName, setGuestName] = useState('');
  const [guestContact, setGuestContact] = useState('');
  const [isReserved, setIsReserved] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  // --- Wholesale Calculator State ---
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'pearl-oyster': 10,
    'cremini-button': 8,
    'oak-shiitake': 5,
    'golden-oyster': 0,
    'king-trumpet': 4,
    'wood-ear': 2,
    'rwanda-termitomyces-imegeri': 1,
    'bulk-lm': 1,
    'bulk-reishi': 0,
    'bulk-5def': 0,
  });

  const [bizName, setBizName] = useState('');
  const [bizContact, setBizContact] = useState('');
  const [bizEmail, setBizEmail] = useState('');
  const [bizDestination, setBizDestination] = useState('Kigali High Gastronomy District');
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const dateInputId = useId();

  // --- Reservation Form Handler ---
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestContact) {
      alert('Please provide your name and phone/email to reserve.');
      return;
    }
    const code = `VNG-KGL-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationCode(code);
    setIsReserved(true);
  };

  // --- Slider Value Handler ---
  const handleQuantityChange = (id: string, val: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, val),
    }));
  };

  // --- Wholesale Calculation Logic ---
  // Fresh/culinary volume sum to determine volume tier
  const freshKgTotal = WHOLESALE_ITEMS.filter((item) => item.category === 'culinary').reduce(
    (acc, item) => acc + (quantities[item.id] || 0),
    0
  );

  let freshDiscountPercent = 0;
  if (freshKgTotal >= 25) {
    freshDiscountPercent = 25;
  } else if (freshKgTotal >= 10) {
    freshDiscountPercent = 15;
  }

  // Calculate costs item by item
  let totalWeeklyRWF = 0;
  let totalWeeklyUSD = 0;
  let totalVolumeKg = 0;

  WHOLESALE_ITEMS.forEach((item) => {
    const qty = quantities[item.id] || 0;
    if (qty > 0) {
      totalVolumeKg += qty;
      const discount = item.category === 'extract' ? 0.3 : freshDiscountPercent / 100;
      const effectiveRWF = Math.round(item.priceRWF * (1 - discount));
      const effectiveUSD = item.priceUSD * (1 - discount);
      totalWeeklyRWF += effectiveRWF * qty;
      totalWeeklyUSD += effectiveUSD * qty;
    }
  });

  const estimatedMonthlyRWF = Math.round(totalWeeklyRWF * 4.33);
  const estimatedMonthlyUSD = Number((totalWeeklyUSD * 4.33).toFixed(2));

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bizName || !bizContact) {
      alert('Please enter your business name and contact information.');
      return;
    }
    setQuoteSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-volcanic-deep text-kinigi-mist">
      {/* 1. ARCHITECTURAL SHOWCASE SECTION */}
      <section className="relative pt-28 pb-20 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header & Meta */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-oxidized-copper/15 border border-oxidized-copper/40 text-spore-gold text-xs font-mono tracking-widest uppercase">
              <Building2 className="w-3.5 h-3.5 text-spore-gold" />
              <span>Flagship Apothecary &amp; Tasting Bar</span>
            </div>

            <h1 className="font-serif font-light text-kinigi-mist text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08]">
              The VŪNGA Apothecary &amp; Tasting Bar
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-kinigi-mist/75 pt-2">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-oxidized-copper" />
                Kigali, Rwanda
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-spore-gold" />
                Open Daily 08:00 AM – 08:00 PM CAT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Pour-Over Counter Active
              </span>
            </div>

            <p className="font-sans text-base sm:text-lg text-kinigi-mist/80 font-normal leading-relaxed pt-2">
              Constructed with carved volcanic basalt slabs from the slopes of Musanze, raw hand-beaten copper extraction apparatus, and native eucalyptus woodwork. An earthen sanctuary where science, ritual, and gastronomy unite.
            </p>
          </div>

          {/* Architectural Image Collage */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Large 16:9 Interior Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-8 relative border-2 border-oxidized-copper/40 overflow-hidden shadow-2xl group min-h-[380px]"
            >
              <img
                src="/assets/08_venue-tasting-bar-interior-16x9_4K.jpg"
                alt="VŪNGA Tasting Bar Interior with basalt stone counters and copper stills"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-volcanic-deep/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-kinigi-mist">
                <span className="bg-volcanic-deep/80 px-3 py-1 border border-white/10 backdrop-blur-md">
                  Apothecary Bar &amp; Extraction Altar
                </span>
                <span className="text-spore-gold hidden sm:inline">Basalt Slab Counter</span>
              </div>
            </motion.div>

            {/* Side Portrait 9:16 Exterior at Dusk */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="md:col-span-4 relative border-2 border-oxidized-copper/40 overflow-hidden shadow-2xl group min-h-[380px]"
            >
              <img
                src="/assets/07_venue-kigali-exterior-dusk-9x16_4K.jpg"
                alt="VŪNGA Kigali Exterior at Dusk"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-volcanic-deep/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-kinigi-mist">
                <span className="bg-volcanic-deep/80 px-3 py-1 border border-white/10 backdrop-blur-md">
                  Dusk Sanctuary Entrance
                </span>
                <span className="text-oxidized-copper">Kigali</span>
              </div>
            </motion.div>

            {/* Below Storefront & Merch Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="md:col-span-12 relative border border-white/15 overflow-hidden shadow-xl group h-64 sm:h-80"
            >
              <img
                src="/assets/07_VUNGA_Storefront_And_Merch_Mockup.jpg"
                alt="VŪNGA Apothecary Storefront and Ceramic Merch Display"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-volcanic-deep/80 via-volcanic-deep/40 to-transparent" />
              <div className="absolute bottom-6 left-6 max-w-lg space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-spore-gold bg-volcanic-deep/90 px-2 py-0.5 border border-white/10">
                  Apothecary Retail &amp; Ceramic Ritualware
                </span>
                <p className="font-serif text-lg sm:text-xl text-kinigi-mist font-light">
                  Handmade Rwandan volcanic stoneware demitasse cups, brass dosing spoons, and fresh harvest crates available daily.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE KIGALI TASTING BAR MENU */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxidized-copper/15 border border-oxidized-copper/40 text-spore-gold text-xs font-mono tracking-widest uppercase">
            <Coffee className="w-3.5 h-3.5" />
            Seasonal Apothecary Formulations
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-kinigi-mist tracking-tight">
            The Kigali Tasting Menu
          </h2>
          <p className="font-sans text-kinigi-mist/80 text-base sm:text-lg leading-relaxed">
            Freshly pulled, pressed, and whisked. Every elixir integrates our dual-extracted fruiting bodies with high-altitude Rwandan coffee and single-origin cacao.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="space-y-16">
          {/* Section A: Daily Doses */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/15 pb-4 mb-8">
              <div>
                <span className="text-xs font-mono text-spore-gold uppercase tracking-widest block">
                  Ritual Elixirs
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-kinigi-mist">
                  Daily Doses
                </h3>
              </div>
              <span className="font-mono text-oxidized-copper font-medium text-sm sm:text-base">
                4,500 RWF / $3.50 each
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Item 1 */}
              <div className="bg-volcanic-ash/80 border border-white/10 p-6 sm:p-7 relative overflow-hidden group hover:border-oxidized-copper/60 transition-all shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-serif text-xl text-kinigi-mist group-hover:text-spore-gold transition-colors font-medium">
                      Kinigi Lion's Mane Pour-Over
                    </h4>
                    <span className="font-mono text-sm text-oxidized-copper font-medium shrink-0">
                      {formatPrice(4500, 3.5)}
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-kinigi-mist/75 leading-relaxed">
                    Single-origin washed Huye Mountain Bourbon coffee infused with 1,500mg dual-extracted Lion's Mane and raw volcanic wild honey. Promotes immediate mental clarity without nervous agitation.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-kinigi-mist/50">
                  <span>Species: Hericium erinaceus</span>
                  <span className="text-spore-gold">NGF Focus &amp; Synaptic Flow</span>
                </div>
              </div>

              {/* Item 2 */}
              <div className="bg-volcanic-ash/80 border border-white/10 p-6 sm:p-7 relative overflow-hidden group hover:border-oxidized-copper/60 transition-all shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-serif text-xl text-kinigi-mist group-hover:text-spore-gold transition-colors font-medium">
                      Smoked Cardamom Reishi Cacao
                    </h4>
                    <span className="font-mono text-sm text-oxidized-copper font-medium shrink-0">
                      {formatPrice(4500, 3.5)}
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-kinigi-mist/75 leading-relaxed">
                    Artisanal 75% dark Rwandan cacao stone-ground with 1,200mg highland Red Reishi, smoked wild green cardamom pods, and frothed oat milk. Deep nervous system release and restorative grounding.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-kinigi-mist/50">
                  <span>Species: Ganoderma lucidum</span>
                  <span className="text-spore-gold">Vagus Nerve Calming</span>
                </div>
              </div>

              {/* Item 3 */}
              <div className="bg-volcanic-ash/80 border border-white/10 p-6 sm:p-7 relative overflow-hidden group hover:border-oxidized-copper/60 transition-all shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-serif text-xl text-kinigi-mist group-hover:text-spore-gold transition-colors font-medium">
                      Spore Gold Cordyceps Espresso
                    </h4>
                    <span className="font-mono text-sm text-oxidized-copper font-medium shrink-0">
                      {formatPrice(4500, 3.5)}
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-kinigi-mist/75 leading-relaxed">
                    Double ristretto espresso pulled directly over 1,000mg Cordyceps militaris fruiting body extract, touched with cold-pressed ginger mist and raw panela sugar.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-kinigi-mist/50">
                  <span>Species: Cordyceps militaris</span>
                  <span className="text-spore-gold">ATP Oxygen &amp; Stamina</span>
                </div>
              </div>

              {/* Item 4 */}
              <div className="bg-volcanic-ash/80 border border-white/10 p-6 sm:p-7 relative overflow-hidden group hover:border-oxidized-copper/60 transition-all shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-serif text-xl text-kinigi-mist group-hover:text-spore-gold transition-colors font-medium">
                      5-Defenders Ginger-Turmeric Shot
                    </h4>
                    <span className="font-mono text-sm text-oxidized-copper font-medium shrink-0">
                      {formatPrice(4500, 3.5)}
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-kinigi-mist/75 leading-relaxed">
                    Fresh cold-pressed Musanze highland ginger, wild forest turmeric, Kinigi lemon peel, and 1,000mg 5-Defenders master extract blend (Reishi, Chaga, Maitake, Shiitake, Turkey Tail).
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-kinigi-mist/50">
                  <span>Species: 5-Mushroom Synergy</span>
                  <span className="text-spore-gold">Mucosal Gut Defense</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section B: Tasting Flights */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/15 pb-4 mb-8">
              <div>
                <span className="text-xs font-mono text-spore-gold uppercase tracking-widest block">
                  Guided Sommelier Flights
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-kinigi-mist">
                  Tasting Flights
                </h3>
              </div>
              <span className="font-mono text-oxidized-copper font-medium text-sm sm:text-base">
                12,000 RWF / $9.00 each
              </span>
            </div>

            {/* Flight Feature Card */}
            <div className="bg-gradient-to-r from-volcanic-ash via-volcanic-deep to-volcanic-ash border-2 border-oxidized-copper/50 p-8 relative overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-spore-gold/15 text-spore-gold text-xs font-mono uppercase tracking-widest border border-spore-gold/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    Signature Experience
                  </div>
                  <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-kinigi-mist">
                    The Virunga Trilogy Flight
                  </h4>
                  <p className="font-sans text-sm sm:text-base text-kinigi-mist/85 leading-relaxed">
                    A guided tasting journey across three custom stoneware demitasse pours: Lion's Mane Morning Focus, Highland Reishi Evening Calm, and Cordyceps Vitality. Served with 2 squares of single-origin Cordyceps 75% Dark Cacao and our hand-stamped Apothecary Dosing Card.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs font-mono text-kinigi-mist/75">
                    <div className="p-3 bg-volcanic-deep/80 border border-white/10">
                      <span className="text-spore-gold block font-semibold">01 · Pour One</span>
                      Lion's Mane Bourbon Wash
                    </div>
                    <div className="p-3 bg-volcanic-deep/80 border border-white/10">
                      <span className="text-oxidized-copper block font-semibold">02 · Pour Two</span>
                      Smoked Reishi Cacao
                    </div>
                    <div className="p-3 bg-volcanic-deep/80 border border-white/10">
                      <span className="text-emerald-400 block font-semibold">03 · Pour Three</span>
                      Cordyceps Golden Shot
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end p-6 bg-volcanic-deep/90 border border-white/10 space-y-4">
                  <div className="text-left lg:text-right">
                    <span className="text-xs font-mono text-kinigi-mist/60 uppercase block">Flight Price</span>
                    <span className="font-mono text-3xl font-bold text-oxidized-copper">
                      {formatPrice(12000, 9.0)}
                    </span>
                    <span className="text-xs text-kinigi-mist/50 block mt-1">Per Guest · ~45 Minutes</span>
                  </div>

                  <a
                    href="#reserve-table"
                    className="w-full text-center px-6 py-3.5 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-lg"
                  >
                    Reserve This Flight
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TASTING BAR RESERVATION FORM */}
      <section id="reserve-table" className="py-24 px-6 bg-volcanic-ash/50 border-t border-b border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxidized-copper/15 border border-oxidized-copper/40 text-spore-gold text-xs font-mono tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5" />
              Table &amp; Counter Booking
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-kinigi-mist tracking-tight">
              Reserve Your Table
            </h2>
            <p className="font-sans text-kinigi-mist/75 text-sm sm:text-base">
              Limited seating at the volcanic basalt bar. Walk-ins welcome based on daily capacity; bookings recommended for guided flights.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isReserved ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleReservationSubmit}
                className="bg-volcanic-ash p-8 sm:p-10 border-2 border-oxidized-copper/50 rounded-none shadow-2xl space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Date Picker */}
                  <div>
                    <label
                      htmlFor={dateInputId}
                      className="block text-xs font-mono uppercase tracking-wider text-kinigi-mist/70 mb-2"
                    >
                      Reservation Date
                    </label>
                    <input
                      id={dateInputId}
                      type="date"
                      min={todayStr}
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-volcanic-deep border border-oxidized-copper/40 text-kinigi-mist font-mono text-sm focus:outline-none focus:border-oxidized-copper rounded-none"
                    />
                  </div>

                  {/* Time Slot Dropdown */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-kinigi-mist/70 mb-2">
                      Time Slot (CAT)
                    </label>
                    <select
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      className="w-full px-4 py-3 bg-volcanic-deep border border-oxidized-copper/40 text-kinigi-mist font-mono text-sm focus:outline-none focus:border-oxidized-copper rounded-none"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Experience Type Dropdown */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-kinigi-mist/70 mb-2">
                    Experience Type
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-3 bg-volcanic-deep border border-oxidized-copper/40 text-kinigi-mist font-mono text-sm focus:outline-none focus:border-oxidized-copper rounded-none"
                  >
                    {EXPERIENCES.map((exp) => (
                      <option key={exp.name} value={exp.name}>
                        {exp.name} ({formatPrice(exp.priceRWF, exp.priceUSD)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guest Count Stepper */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-kinigi-mist/70 mb-2">
                    Number of Guests (1–8)
                  </label>
                  <div className="flex items-center gap-4 bg-volcanic-deep border border-oxidized-copper/40 p-2 w-full sm:w-64">
                    <button
                      type="button"
                      onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                      className="w-10 h-10 bg-volcanic-ash hover:bg-oxidized-copper text-kinigi-mist flex items-center justify-center transition-colors"
                      aria-label="Decrease guest count"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="flex-1 text-center font-mono font-bold text-lg text-kinigi-mist">
                      {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
                    </div>
                    <button
                      type="button"
                      onClick={() => setGuestCount((c) => Math.min(8, c + 1))}
                      className="w-10 h-10 bg-volcanic-ash hover:bg-oxidized-copper text-kinigi-mist flex items-center justify-center transition-colors"
                      aria-label="Increase guest count"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Name & Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-kinigi-mist/70 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Marie Claire Uwase"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-volcanic-deep border border-oxidized-copper/40 text-kinigi-mist font-sans text-sm focus:outline-none focus:border-oxidized-copper rounded-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-kinigi-mist/70 mb-2">
                      Email or WhatsApp Phone
                    </label>
                    <input
                      type="text"
                      placeholder="+250 78... or name@lodge.rw"
                      value={guestContact}
                      onChange={(e) => setGuestContact(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-volcanic-deep border border-oxidized-copper/40 text-kinigi-mist font-sans text-sm focus:outline-none focus:border-oxidized-copper rounded-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-xl shadow-oxidized-copper/20 rounded-none flex items-center justify-center gap-2"
                  >
                    <span>CONFIRM RESERVATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[11px] font-mono text-kinigi-mist/50 text-center">
                  Cancellations honored without fee up to 2 hours prior to scheduled seating time.
                </p>
              </motion.form>
            ) : (
              /* Success Card with Confetti Animation */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-volcanic-ash border-2 border-oxidized-copper p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl"
              >
                {/* Floating Confetti Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        y: -10,
                        x: Math.random() * 400 - 200,
                        opacity: 1,
                        scale: Math.random() * 0.8 + 0.4,
                      }}
                      animate={{
                        y: 400,
                        rotate: Math.random() * 360,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 2.5 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 1.5,
                      }}
                      className="absolute top-0 left-1/2 w-2 h-2"
                      style={{
                        backgroundColor: i % 3 === 0 ? '#B86B43' : i % 2 === 0 ? '#D4AF6A' : '#527361',
                      }}
                    />
                  ))}
                </div>

                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="text-xs font-mono uppercase tracking-widest text-spore-gold font-semibold block mb-2">
                  Reservation Confirmed
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl text-kinigi-mist font-light mb-4">
                  Welcome to VŪNGA Kigali
                </h3>

                <p className="font-sans text-sm sm:text-base text-kinigi-mist/85 max-w-md mx-auto mb-8">
                  We look forward to hosting you, <span className="font-semibold text-white">{guestName}</span>. Your demitasse service is queued.
                </p>

                {/* Reservation Summary */}
                <div className="bg-volcanic-deep p-6 border border-white/10 max-w-md mx-auto text-left space-y-2 text-xs font-mono mb-8">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-kinigi-mist/50">CONFIRMATION CODE:</span>
                    <span className="font-bold text-spore-gold">{reservationCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-kinigi-mist/50">EXPERIENCE:</span>
                    <span className="text-kinigi-mist font-medium">{experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-kinigi-mist/50">DATE &amp; TIME:</span>
                    <span className="text-kinigi-mist font-medium">
                      {resDate} at {resTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-kinigi-mist/50">PARTY SIZE:</span>
                    <span className="text-kinigi-mist font-medium">{guestCount} Guests</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-kinigi-mist/50">LOCATION:</span>
                    <span className="text-oxidized-copper font-medium">Kigali Heights Sanctuary</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsReserved(false)}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-kinigi-mist font-mono text-xs uppercase tracking-widest transition-all"
                >
                  Make Another Reservation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. B2B WHOLESALE CALCULATOR */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxidized-copper/15 border border-oxidized-copper/40 text-spore-gold text-xs font-mono tracking-widest uppercase">
            <Calculator className="w-3.5 h-3.5" />
            Hospitality &amp; Chef Direct Program
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-kinigi-mist tracking-tight">
            Chef &amp; Eco-Lodge Wholesale
          </h2>
          <p className="font-sans text-kinigi-mist/80 text-base sm:text-lg leading-relaxed">
            Tailored for Kigali restaurants, specialty cafés, and northern eco-lodges. Guaranteed morning courier delivery direct from our Kinigi chambers.
          </p>

          {/* Trusted Lodge Partners */}
          <div className="pt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-kinigi-mist/60">
            <span className="text-spore-gold uppercase font-semibold">Hospitality Partners:</span>
            <span className="px-2.5 py-1 bg-volcanic-ash/80 border border-white/10">Singita Kwitonda</span>
            <span className="px-2.5 py-1 bg-volcanic-ash/80 border border-white/10">Bisate Lodge</span>
            <span className="px-2.5 py-1 bg-volcanic-ash/80 border border-white/10">One&amp;Only Gorilla's Nest</span>
            <span className="px-2.5 py-1 bg-volcanic-ash/80 border border-white/10">Virunga Lodge</span>
          </div>
        </div>

        {/* Wholesale Sliders + Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Sliders Column (8 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-serif text-lg text-kinigi-mist">Select Weekly Standing Volume</span>
              <span className="text-xs font-mono text-oxidized-copper">
                Tier: {freshDiscountPercent}% Off Fresh | 30% Off Extracts
              </span>
            </div>

            <div className="space-y-6">
              {WHOLESALE_ITEMS.map((item) => {
                const qty = quantities[item.id] || 0;
                const discountRate = item.category === 'extract' ? 0.3 : freshDiscountPercent / 100;
                const itemTotalRWF = Math.round(item.priceRWF * (1 - discountRate) * qty);
                const itemTotalUSD = Number((item.priceUSD * (1 - discountRate) * qty).toFixed(2));

                return (
                  <div
                    key={item.id}
                    className="p-5 bg-volcanic-ash/60 border border-white/10 space-y-3 transition-colors hover:border-oxidized-copper/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-base sm:text-lg font-medium text-kinigi-mist">
                            {item.name}
                          </h4>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-none uppercase ${
                              item.category === 'extract'
                                ? 'bg-oxidized-copper/20 text-oxidized-copper border border-oxidized-copper/40'
                                : 'bg-verdigris-bamboo/20 text-emerald-300 border border-verdigris-bamboo/40'
                            }`}
                          >
                            {item.category === 'extract' ? 'Dual Extract' : 'Fresh Harvest'}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-kinigi-mist/60 mt-0.5">
                          {item.description}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono text-base font-bold text-spore-gold block">
                          {qty} {item.unit}
                        </span>
                        <span className="text-[11px] font-mono text-kinigi-mist/50">
                          {formatPrice(itemTotalRWF, itemTotalUSD)}/wk
                        </span>
                      </div>
                    </div>

                    {/* Range Slider */}
                    <div className="space-y-1">
                      <input
                        type="range"
                        min="0"
                        max={item.max}
                        step="1"
                        value={qty}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                        className="w-full h-2 bg-volcanic-deep rounded-none appearance-none cursor-pointer accent-oxidized-copper"
                        style={{
                          accentColor: '#B86B43',
                        }}
                      />
                      <div className="flex justify-between text-[10px] font-mono text-kinigi-mist/40">
                        <span>0 {item.unit}</span>
                        <span>Max {item.max} {item.unit}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Wholesale Summary Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-volcanic-ash border-2 border-oxidized-copper p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-spore-gold block">
                    B2B Standing Order
                  </span>
                  <h3 className="font-serif text-2xl font-light text-kinigi-mist">
                    Weekly Quote Summary
                  </h3>
                </div>
                <div className="w-10 h-10 bg-oxidized-copper/20 border border-oxidized-copper/40 text-spore-gold flex items-center justify-center">
                  <Percent className="w-5 h-5" />
                </div>
              </div>

              {/* Volume & Cost Tiers */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-kinigi-mist/60">Total Volume Selected:</span>
                  <span className="font-bold text-kinigi-mist">{totalVolumeKg} units/wk</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-kinigi-mist/60">Active Fresh Discount:</span>
                  <span className="font-bold text-emerald-400">
                    {freshDiscountPercent}% Tier ({freshKgTotal} kg fresh)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-kinigi-mist/60">Bulk Extract Discount:</span>
                  <span className="font-bold text-emerald-400">30% Fixed Wholesale</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-sm font-sans font-medium text-kinigi-mist">
                    Total Weekly Cost:
                  </span>
                  <div className="text-right">
                    <span className="font-mono text-xl font-bold text-oxidized-copper block">
                      {formatPrice(totalWeeklyRWF, totalWeeklyUSD)}
                    </span>
                    <span className="text-[10px] text-kinigi-mist/50">
                      ({currency === 'RWF' ? `$${totalWeeklyUSD.toFixed(2)} USD` : `${totalWeeklyRWF.toLocaleString()} RWF`})
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-kinigi-mist/60">Est. Monthly Total (4.33 wks):</span>
                  <span className="font-mono text-sm text-spore-gold font-semibold">
                    {formatPrice(estimatedMonthlyRWF, estimatedMonthlyUSD)}
                  </span>
                </div>
              </div>

              {/* Quote Contact Form */}
              {!quoteSubmitted ? (
                <form onSubmit={handleQuoteSubmit} className="space-y-4 pt-4 border-t border-white/10">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-kinigi-mist/70 mb-1">
                      Lodge / Restaurant / Company
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Singita Kwitonda Kitchen"
                      value={bizName}
                      onChange={(e) => setBizName(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-volcanic-deep border border-white/15 text-kinigi-mist text-xs font-sans rounded-none focus:outline-none focus:border-oxidized-copper"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-kinigi-mist/70 mb-1">
                        Executive Chef / Contact
                      </label>
                      <input
                        type="text"
                        placeholder="Chef Jean-Paul"
                        value={bizContact}
                        onChange={(e) => setBizContact(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-volcanic-deep border border-white/15 text-kinigi-mist text-xs font-sans rounded-none focus:outline-none focus:border-oxidized-copper"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-kinigi-mist/70 mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="text"
                        placeholder="+250 7..."
                        value={bizEmail}
                        onChange={(e) => setBizEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-volcanic-deep border border-white/15 text-kinigi-mist text-xs font-sans rounded-none focus:outline-none focus:border-oxidized-copper"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-kinigi-mist/70 mb-1">
                      Delivery Destination
                    </label>
                    <select
                      value={bizDestination}
                      onChange={(e) => setBizDestination(e.target.value)}
                      className="w-full px-3 py-2 bg-volcanic-deep border border-white/15 text-kinigi-mist text-xs font-sans rounded-none focus:outline-none focus:border-oxidized-copper"
                    >
                      <option value="Kigali High Gastronomy District">Kigali Fine Dining &amp; Cafés</option>
                      <option value="Musanze & Volcanoes Eco-Lodges">Musanze &amp; Volcanoes Eco-Lodges</option>
                      <option value="Gisenyi & Lake Kivu Resorts">Lake Kivu Resorts (Rubavu)</option>
                      <option value="Air Courier Export (Nairobi / Kampala)">Regional Air Courier (Nairobi / Kampala)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-lg rounded-none flex items-center justify-center gap-2"
                  >
                    <span>REQUEST WHOLESALE QUOTE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-volcanic-deep border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <span className="font-serif text-lg text-kinigi-mist block">Quote Dispatched</span>
                  <p className="font-sans text-xs text-kinigi-mist/70">
                    Thank you, <span className="text-white font-medium">{bizName}</span>. A wholesale contract with cold-chain delivery schedule has been prepared for {bizContact}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setQuoteSubmitted(false)}
                    className="text-xs font-mono text-oxidized-copper underline"
                  >
                    Adjust Volumes
                  </button>
                </div>
              )}

              <div className="pt-2 text-[10px] font-mono text-kinigi-mist/40 space-y-1">
                <p>• Tiered discounts: 10-25 kg/wk (15%), 25-50 kg/wk (25%)</p>
                <p>• Bulk extracts: Flat 30% discount off retail per kg</p>
                <p>• Direct refrigerated delivery from Kinigi at dawn</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TastingBar;
