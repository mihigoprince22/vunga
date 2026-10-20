import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  FlaskConical,
  Droplets,
  Mountain,
  ShieldCheck,
  Coffee,
  Moon,
  Candy,
  ChefHat,
  ArrowRight,
  Plus,
  X,
  Check,
  Sparkles,
  Gift,
  Minus,
} from 'lucide-react';
import { useVunga } from '../context/VungaContext';
import { products, Product } from '../data/products';

interface BenefitTab {
  id: 'all' | 'focus' | 'calm' | 'immunity' | 'energy' | 'culinary';
  title: string;
  pillLabel: string;
  subtitle: string;
}

const BENEFIT_TABS: BenefitTab[] = [
  {
    id: 'all',
    title: 'All Harvests',
    pillLabel: 'All Harvests (11)',
    subtitle: 'Explore the full 12-species volcanic dispensary',
  },
  {
    id: 'focus',
    title: 'Focus & Clarity',
    pillLabel: 'Focus & Clarity',
    subtitle: 'I want help staying mentally sharp',
  },
  {
    id: 'calm',
    title: 'Calm & Deep Sleep',
    pillLabel: 'Calm & Sleep',
    subtitle: 'I want to feel calmer and sleep better',
  },
  {
    id: 'immunity',
    title: 'Immunity & Protection',
    pillLabel: 'Immunity',
    subtitle: 'I want everyday immune defense',
  },
  {
    id: 'energy',
    title: 'Stamina & Cacao',
    pillLabel: 'Stamina & Cacao',
    subtitle: 'I want clean energy without the crash',
  },
  {
    id: 'culinary',
    title: 'Fresh Rwandan Culinary',
    pillLabel: 'Fresh Rwandan Culinary',
    subtitle: 'I want chef-grade highland mushrooms',
  },
];

const SPEC_BADGES = [
  { icon: Leaf, label: '100% FRUITING BODY' },
  { icon: FlaskConical, label: '>30% BETA-GLUCANS' },
  { icon: Droplets, label: 'DUAL EXTRACTED' },
  { icon: Mountain, label: 'GROWN IN KINIGI RWANDA' },
  { icon: ShieldCheck, label: '3RD-PARTY LAB TESTED' },
];

const ROUTINE_MOMENTS = [
  {
    id: 'morning',
    number: '01',
    title: 'Morning Rwandan Coffee',
    desc: "Whisk 1 scoop of Lion's Mane Focus into freshly brewed Bourbon Arabica for sustained cognitive flow without jittery crashes.",
    icon: Coffee,
    cutout: '/assets/14_cutout-01-lions-mane.png',
    cutoutAlt: "Lion's Mane Fruiting Body",
    isImage: false,
  },
  {
    id: 'cacao',
    number: '02',
    title: 'Afternoon Dark Cacao',
    desc: 'Two squares of 75% single-origin dark Rwandan cacao infused with Cordyceps militaris to oxygenate cells and sustain VO2 endurance.',
    icon: Candy,
    cutout: '/assets/16_cutout-03-copper-dosing-scoop.png',
    cutoutAlt: 'Brushed Copper Dosing Scoop',
    isImage: false,
  },
  {
    id: 'evening',
    number: '03',
    title: 'Evening Reishi Tonic',
    desc: 'Dissolve Highland Reishi Calm into warm oat milk 45 minutes before sleep to ground the nervous system and promote restorative REM cycles.',
    icon: Moon,
    cutout: '/assets/15_cutout-02-reishi-cap.png',
    cutoutAlt: 'Highland Reishi Cap',
    isImage: false,
  },
  {
    id: 'kitchen',
    number: '04',
    title: 'Fresh Highland Kitchen',
    desc: 'Sear thick King Trumpets or Golden Oyster bouquets in browned butter, mountain thyme, and volcanic sea salt for an unforgettable meal.',
    icon: ChefHat,
    cutout: '/assets/13_harvest-culinary-crate-3x2_4K.jpg',
    cutoutAlt: "Chef's Fresh Kinigi Harvest Crate",
    isImage: true,
  },
];

const SCIENCE_CRITERIA = [
  {
    label: 'Primary Botanical Source',
    vunga: '100% Mature Fruiting Bodies (Stem, Cap & Gills)',
    vungaSub: 'Harvested by hand at dawn in Kinigi, Rwanda',
    filler: 'Mycelium on Grain Biomass (Up to 70% Starch)',
    fillerSub: 'Grown on sterile rice, oats or sorghum in plastic bags',
  },
  {
    label: 'Active Beta-D-Glucans',
    vunga: '>30% Verified Bioactive Polysaccharides',
    vungaSub: 'Third-party certified by Megazyme enzymatic assay',
    filler: '<5% Active Beta-Glucans (Negligible Potency)',
    fillerSub: 'Diluted by substrate starch carbohydrates',
  },
  {
    label: 'Grain Starch & Alpha-Glucan Content',
    vunga: '<2% Alpha-Glucan / Zero Grain Fillers',
    vungaSub: 'Clean golden amber in iodine tests; zero color change',
    filler: '35% – 70% Grain Starch Fillers',
    fillerSub: 'Turns ink-black when tested with laboratory iodine',
  },
  {
    label: 'Extraction Methodology',
    vunga: 'Dual Hydro-Ethanolic Bio-Fractionation',
    vungaSub: 'Hot water extracts water-soluble beta-glucans; ethanol extracts triterpenes',
    filler: 'Raw Unextracted Powder or Water Only',
    fillerSub: 'Indigestible fungal chitin cell walls remain locked',
  },
  {
    label: 'Terroir & Cultivation Elevation',
    vunga: '2,400m Sub-Alpine Volcanic Mineral Substrate',
    vungaSub: 'Basalt, Juncao grass & rich montane mist in Kinigi',
    filler: 'Industrial Warehouse Lab Trays',
    fillerSub: 'Fast cycle grain culture lacking micro-element minerals',
  },
];

const Home: React.FC = () => {
  const { openQuiz, openCart, addToCart, formatPrice } = useVunga();

  // Benefit Switcher state
  const [activeTab, setActiveTab] = useState<number>(0);

  // Ritual Bundle Builder state: 3 slots
  const [selectedSlots, setSelectedSlots] = useState<(Product | null)[]>([null, null, null]);

  // Filtered products for active benefit tab
  const filteredProducts = useMemo(() => {
    const currentBenefit = BENEFIT_TABS[activeTab].id;
    if (currentBenefit === 'all') return products;
    return products.filter((p) => (p.benefits as string[]).includes(currentBenefit));
  }, [activeTab]);

  // Available products for the bundle builder (functional + cacao + top culinary)
  const bundleEligibleProducts = useMemo(() => {
    return products;
  }, []);

  // Filled slots count
  const filledSlotsCount = selectedSlots.filter((slot) => slot !== null).length;
  const isBundleComplete = filledSlotsCount === 3;

  // Bundle calculations
  const bundlePricing = useMemo(() => {
    const rawRwf = selectedSlots.reduce((acc, p) => acc + (p?.priceRWF || 0), 0);
    const rawUsd = selectedSlots.reduce((acc, p) => acc + (p?.priceUSD || 0), 0);
    const discountedRwf = Math.round(rawRwf * 0.8);
    const discountedUsd = Number((rawUsd * 0.8).toFixed(2));
    const savingsRwf = rawRwf - discountedRwf;
    const savingsUsd = Number((rawUsd - discountedUsd).toFixed(2));
    return {
      rawRwf,
      rawUsd,
      discountedRwf,
      discountedUsd,
      savingsRwf,
      savingsUsd,
    };
  }, [selectedSlots]);

  const handleAddProductToSlot = (product: Product) => {
    const nextEmptyIndex = selectedSlots.findIndex((slot) => slot === null);
    if (nextEmptyIndex !== -1) {
      const updated = [...selectedSlots];
      updated[nextEmptyIndex] = product;
      setSelectedSlots(updated);
    }
  };

  const handleRemoveSlot = (index: number) => {
    const updated = [...selectedSlots];
    updated[index] = null;
    setSelectedSlots(updated);
  };

  const handleAddBundleToCart = () => {
    selectedSlots.forEach((product) => {
      if (product) {
        addToCart(product, 1, product.formats?.[0] || product.weight || 'Standard');
      }
    });
    openCart();
  };

  return (
    <main className="min-h-screen bg-[#F4F2EC] text-[#222423] selection:bg-[#B86B43] selection:text-white">
      {/* ========================================================================= */}
      {/* SECTION 1: Full-Viewport Video Hero (dark #141515 bg)                     */}
      {/* ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#141515] text-[#EAE8E1]">
        {/* Background Video Container */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/03_home-hero-idle-16x9_4K.jpg"
            src="/assets/17_video-01-hero-virunga-spores-loop-16x9.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141515]/95 via-[#222423]/75 to-[#222423]/30 z-10 pointer-events-none" />

        {/* Hero Content Left Aligned */}
        <div className="relative z-20 flex-1 flex flex-col justify-center max-w-3xl px-8 lg:px-16 pt-28 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-start"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-4 h-4 text-[#D4AF6A]" />
              <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#D4AF6A] font-semibold">
                HARVESTED AT 2,400M &bull; KINIGI, MUSANZE &mdash; RWANDA
              </span>
            </div>

            {/* H1 Headline with Italic Span */}
            <h1 className="font-serif font-light text-4xl sm:text-5xl lg:text-6xl text-[#EAE8E1] leading-[1.12] tracking-[-0.015em] max-w-2xl mb-6">
              Earthen Alchemy <span className="italic text-[#D4AF6A]">from the Virunga Mist</span>.
            </h1>

            {/* Subheadline Lead Copy */}
            <p className="text-base sm:text-lg font-sans font-normal leading-relaxed text-[#EAE8E1]/85 max-w-xl mb-8">
              Rwanda&apos;s premier functional mushroom house. Cultivated at 2,400m altitude in mineral-rich volcanic soil on the foothills of Volcanoes National Park. 100% organic fruiting bodies. Zero grain starch fillers.
            </p>

            {/* CTA Buttons: Luxury Rounded Pills */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#apothecary-shop"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('apothecary-shop')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center rounded-full bg-[#B86B43] hover:bg-[#a35b36] text-[#EAE8E1] font-sans font-semibold text-xs uppercase tracking-[0.16em] px-8 py-4 transition-all duration-300 shadow-lg hover:shadow-xl border-none text-center cursor-pointer gap-2"
              >
                <span>SHOP THE HARVEST</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={openQuiz}
                className="inline-flex items-center justify-center rounded-full bg-[#EAE8E1]/10 hover:bg-[#EAE8E1]/20 backdrop-blur-md text-[#EAE8E1] border border-[#EAE8E1]/30 font-sans font-semibold text-xs uppercase tracking-[0.16em] px-8 py-4 transition-all duration-300 text-center cursor-pointer"
              >
                TAKE THE MUSHROOM MATCHER
              </button>
            </div>
          </motion.div>
        </div>

        {/* Pinned Bottom 5-Badge Spec Bar */}
        <div className="absolute bottom-0 inset-x-0 z-20 w-full bg-[#141515]/75 backdrop-blur-md border-t border-white/10 py-3.5 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center overflow-x-auto gap-4 sm:gap-6 lg:gap-8 scrollbar-none py-1">
            {SPEC_BADGES.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <React.Fragment key={badge.label}>
                  <div className="flex items-center gap-2 flex-shrink-0 text-[#EAE8E1]/85">
                    <Icon className="w-4 h-4 text-[#B86B43]" />
                    <span className="font-sans text-[11px] uppercase tracking-[0.12em] font-medium whitespace-nowrap">
                      {badge.label}
                    </span>
                  </div>
                  {idx < SPEC_BADGES.length - 1 && (
                    <span className="text-[#D4AF6A] select-none text-xs">&bull;</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: "What brings you to the apothecary?" (Shop by Need Filter)    */}
      {/* ========================================================================= */}
      <section id="apothecary-shop" className="py-20 lg:py-28 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-serif italic text-3xl lg:text-4xl text-[#222423] tracking-tight">
              &ldquo;What brings you to the apothecary?&rdquo;
            </h2>
            <p className="font-sans text-xs uppercase tracking-widest text-[#222423]/70 mt-3 font-semibold">
              Tailored Botanical Formulations For Your Vitality Needs
            </p>
          </div>

          {/* Centered Wrapping Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto mb-12 px-4">
            {BENEFIT_TABS.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`rounded-full px-6 py-2.5 text-xs font-sans uppercase tracking-[0.12em] transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#222423] text-[#EAE8E1] font-semibold shadow-md'
                      : 'bg-[#EAE8E1] hover:bg-[#222423]/10 text-[#222423] border border-[#222423]/15 font-medium'
                  }`}
                >
                  {tab.pillLabel}
                </button>
              );
            })}
          </div>

          {/* Luxury Product Card Grid */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center"
              >
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/shop/${product.slug}`}
                    className="group relative flex flex-col justify-between rounded-2xl bg-[#F6F4EE] border border-[#222423]/10 p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-[#222423]"
                  >
                    {/* Image Container with Two-State Crossfade */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#1A1C1B] mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {product.hoverImage && (
                        <img
                          src={product.hoverImage}
                          alt={`${product.name} harvest ritual`}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                        />
                      )}

                      {/* Top-Left Pill Badge */}
                      <span className="absolute top-3 left-3 z-10 rounded-full bg-[#141515]/85 backdrop-blur-md text-[#EAE8E1] px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-[0.12em] border border-[#B86B43]/40">
                        {product.category === 'functional'
                          ? 'Dual Extract'
                          : product.category === 'cacao'
                          ? '75% Dark Cacao'
                          : product.isFresh
                          ? 'Fresh Harvest'
                          : 'Highland Reserve'}
                      </span>

                      {/* Top-Right Pill (Subscription or Fresh status) */}
                      {product.isSubscribable ? (
                        <span className="absolute top-3 right-3 z-10 rounded-full bg-[#B86B43]/90 backdrop-blur-md text-white px-2.5 py-1 text-[10px] font-sans font-semibold uppercase tracking-[0.1em] shadow-sm">
                          Save 15%
                        </span>
                      ) : product.isFresh ? (
                        <span className="absolute top-3 right-3 z-10 rounded-full bg-[#527361]/90 backdrop-blur-md text-white px-2.5 py-1 text-[10px] font-sans font-semibold uppercase tracking-[0.1em] shadow-sm">
                          Dawn Harvest
                        </span>
                      ) : null}
                    </div>

                    {/* Card Body (Strict high-contrast dark text) */}
                    <div className="flex flex-col flex-1 justify-between px-1">
                      <div>
                        {/* Botanical Latin & Spec Subtitle */}
                        <p className="text-[11px] font-sans font-medium italic text-[#527361] mb-1 line-clamp-1">
                          {product.speciesLatin || product.species}
                          {product.betaGlucans ? ` · ${product.betaGlucans}` : ''}
                        </p>

                        {/* Product Title (Full 2-line title, never truncated!) */}
                        <h3 className="font-serif text-lg font-bold text-[#222423] leading-snug line-clamp-2 min-h-[3rem] group-hover:text-[#B86B43] transition-colors">
                          {product.name}
                        </h3>

                        {/* Short 1-Line Benefit Description */}
                        <p className="text-xs font-sans text-[#222423]/75 mt-1 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      {/* Card Footer CTA Button (NO EMOJI!) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCart(
                            product,
                            1,
                            product.formats?.[0] || product.weight || 'Standard'
                          );
                          openCart();
                        }}
                        className="w-full rounded-xl bg-[#222423] group-hover:bg-[#B86B43] text-[#EAE8E1] font-sans font-semibold text-xs uppercase tracking-[0.14em] py-3.5 px-4 flex items-center justify-between transition-colors duration-300 cursor-pointer shadow-sm"
                      >
                        <span>ADD TO BAG</span>
                        <span className="font-medium text-white/95">
                          {formatPrice(product.priceRWF, product.priceUSD)}
                        </span>
                      </button>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: "Keep Your Routine. Add VŪNGA to It." (bg-[#222423] dark)      */}
      {/* ========================================================================= */}
      <section className="relative bg-[#222423] py-20 lg:py-28 text-[#EAE8E1] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#D4AF6A] block mb-2">
              SEAMLESS INTEGRATION &bull; 4 DAILY RITUAL MOMENTS
            </span>
            <h2 className="font-serif font-light text-4xl lg:text-5xl text-[#EAE8E1] leading-tight">
              Keep Your Routine.
              <br />
              <span className="italic text-[#D4AF6A]">Add VŪNGA to It.</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#B86B43] mt-4" />
          </div>

          {/* Clean 2-Column Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column (5 cols): Vertical Video Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#B86B43]/30 shadow-2xl bg-[#141515] aspect-[9/16] max-h-[560px] mx-auto relative group">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/assets/20_keyframe-video-04-morning-elixir-stir-9x16_4K.jpg"
                  src="/assets/20_video-04-morning-elixir-stir-loop-9x16.mp4"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-xs font-sans text-[#EAE8E1]/90 flex items-center justify-between">
                  <span className="bg-[#141515]/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md font-semibold text-[11px] tracking-wide uppercase">
                    Morning Stir Ritual
                  </span>
                  <span className="text-[#D4AF6A] font-medium text-[11px]">Kinigi Extract Drop</span>
                </div>
              </div>
            </div>

            {/* Right Column (7 cols): 2x2 Elevated Basalt Cards */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ROUTINE_MOMENTS.map((moment) => {
                  const Icon = moment.icon;
                  return (
                    <div
                      key={moment.id}
                      className="rounded-2xl bg-[#1A1C1B] border border-[#EAE8E1]/10 p-6 hover:border-[#B86B43]/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-lg min-h-[210px]"
                    >
                      {/* Corner Thumbnail Asset (Neatly contained, no clipping across section!) */}
                      <div className="absolute top-4 right-4 w-16 h-16 pointer-events-none opacity-85 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                        <img
                          src={moment.cutout}
                          alt={moment.cutoutAlt}
                          className={`w-full h-full ${moment.isImage ? 'object-cover rounded-xl border border-white/10' : 'object-contain drop-shadow-md'}`}
                        />
                      </div>

                      {/* Card Content */}
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-[#222423] border border-white/10 flex items-center justify-center text-[#D4AF6A] mb-3">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B86B43] block mb-1">
                          {moment.number} &bull; Ritual Step
                        </span>
                        <h3 className="font-serif font-bold text-base text-[#EAE8E1] pr-14 leading-snug">
                          {moment.title}
                        </h3>
                        <p className="text-xs font-sans text-[#EAE8E1]/75 mt-2 leading-relaxed">
                          {moment.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: "The Fruiting Body Standard" Science Matrix (Apothecary Palette) */}
      {/* ========================================================================= */}
      <section className="bg-[#EAE8E1] py-20 lg:py-28 border-b border-[#222423]/10">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#B86B43] block mb-2">
              BIOCHEMICAL PURITY &bull; 100% FRUITING BODY VERIFIED
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#222423] font-light">
              The Fruiting Body Standard
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#222423]/75 mt-3 leading-relaxed">
              Why active beta-glucans and fungal maturity define true physiological efficacy over mass-market grain biomass starch.
            </p>
          </div>

          {/* Apothecary Side-by-Side Comparison Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Column 1: VŪNGA 100% Fruiting Body (Gold Standard - Volcanic Card) */}
            <div className="rounded-2xl bg-[#1C2420] text-[#EAE8E1] border border-[#B86B43]/50 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B86B43] text-[#EAE8E1] text-[10px] font-sans font-semibold tracking-wider uppercase mb-2">
                      <Sparkles className="w-3 h-3 text-[#D4AF6A]" />
                      Gold Standard
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      VŪNGA 100% Fruiting Body
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#527361]/30 border border-[#527361] flex items-center justify-center text-[#D4AF6A]">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>

                <div className="space-y-5">
                  {SCIENCE_CRITERIA.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-black/30 rounded-xl border border-white/5">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#D4AF6A] block mb-1">
                        {item.label}
                      </span>
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#D4AF6A] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-sans font-semibold text-white leading-snug">
                            {item.vunga}
                          </p>
                          <p className="text-xs font-sans text-[#EAE8E1]/70 mt-0.5">
                            {item.vungaSub}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-[#D4AF6A]">
                <span>Origin: Kinigi, Musanze District</span>
                <span className="font-semibold text-white">100% Active Functional Fungi</span>
              </div>
            </div>

            {/* Column 2: Typical Mycelium-on-Grain (Muted Stone Card - Terracotta Accents) */}
            <div className="rounded-2xl bg-[#E5E2D9] text-[#222423]/80 border border-[#222423]/15 p-6 sm:p-8 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#222423]/10">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#222423]/15 text-[#222423]/70 text-[10px] font-sans font-semibold tracking-wider uppercase mb-2">
                      Industry Filler
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#222423]/90">
                      Typical Mycelium-on-Grain
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#8C3F2B]/15 border border-[#8C3F2B]/30 flex items-center justify-center text-[#8C3F2B]">
                    <Minus className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>

                <div className="space-y-5">
                  {SCIENCE_CRITERIA.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-white/50 rounded-xl border border-[#222423]/10">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#222423]/60 block mb-1">
                        {item.label}
                      </span>
                      <div className="flex items-start gap-2.5">
                        <Minus className="w-4 h-4 text-[#8C3F2B] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-sans font-medium text-[#222423]/90 leading-snug">
                            {item.filler}
                          </p>
                          <p className="text-xs font-sans text-[#222423]/60 mt-0.5">
                            {item.fillerSub}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#222423]/10 flex items-center justify-between text-xs font-sans text-[#222423]/60">
                <span>Industrial Rice/Oat Bags</span>
                <span className="text-[#8C3F2B] font-semibold">Predominantly Grain Starch</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/science"
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#B86B43] hover:text-[#a35b36] transition-colors"
            >
              <span>Explore Chromatography &amp; Batch COA Lab Profiles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: "Build Your Virunga Ritual" — 2-Column Split Bundle Builder     */}
      {/* ========================================================================= */}
      <section className="bg-[#EAE8E1] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#B86B43] block mb-2">
              ALICE MUSHROOMS CUSTOM APOTHECARY BUNDLE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#222423] font-light">
              Build Your Virunga Ritual
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#222423]/75 mt-2">
              Curate any 3 harvest or extract formulations. Unlock 20% savings and unlock exclusive Kinigi collector gifts.
            </p>
          </div>

          {/* 2-Column Luxury Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (7 cols): Visual Selector Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {bundleEligibleProducts.map((product) => {
                  return (
                    <div
                      key={product.id}
                      className="rounded-2xl bg-[#F6F4EE] border border-[#222423]/10 p-3.5 flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
                    >
                      <div>
                        {/* 140px+ Aspect Square Thumbnail */}
                        <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#1A1C1B] mb-2.5 relative">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2 left-2 rounded-full bg-[#141515]/80 text-[#EAE8E1] px-2 py-0.5 text-[9px] font-sans font-semibold uppercase tracking-wider border border-[#B86B43]/30">
                            {product.category === 'functional' ? 'Extract' : product.category === 'cacao' ? 'Cacao' : 'Culinary'}
                          </span>
                        </div>

                        {/* Merriweather Wrapping Title */}
                        <h4 className="font-serif text-xs sm:text-sm font-bold text-[#222423] leading-snug line-clamp-2 min-h-[2.5rem]">
                          {product.name}
                        </h4>

                        {/* Price */}
                        <p className="font-sans text-xs font-semibold text-[#B86B43] mt-1">
                          {formatPrice(product.priceRWF, product.priceUSD)}
                        </p>
                      </div>

                      {/* + ADD TO BOX Button */}
                      <button
                        type="button"
                        onClick={() => handleAddProductToSlot(product)}
                        className="w-full mt-3 rounded-lg bg-[#222423] hover:bg-[#B86B43] text-[#EAE8E1] text-xs font-sans font-semibold py-2.5 px-3 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD TO BOX</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column (5 cols): Sticky "Your 3-Step Virunga Ritual Box" Drawer Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="rounded-2xl bg-[#222423] text-[#EAE8E1] p-6 lg:p-8 border border-[#B86B43]/40 shadow-2xl space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#D4AF6A]">
                      CUSTOM BOX BUILDER
                    </span>
                    <span className="text-xs font-sans font-semibold text-white/70">
                      {filledSlotsCount}/3 Selected
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#EAE8E1] mt-1">
                    Your 3-Step Ritual Box
                  </h3>
                </div>

                {/* Tiered Free-Gift Progress Bar at Top */}
                <div className="p-4 rounded-xl bg-[#141515] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-sans">
                    <span className="font-semibold text-[#EAE8E1]">
                      {filledSlotsCount === 0 && 'Select items to unlock gifts'}
                      {filledSlotsCount === 1 && 'Free Copper Scoop Unlocked!'}
                      {filledSlotsCount === 2 && '1 more item unlocks Canvas Tote & 20% off'}
                      {filledSlotsCount === 3 && 'All Gifts & 20% Savings Unlocked!'}
                    </span>
                    <span className="text-[#D4AF6A] font-bold">
                      {Math.round((filledSlotsCount / 3) * 100)}%
                    </span>
                  </div>

                  {/* Progress track */}
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#B86B43] transition-all duration-500 rounded-full"
                      style={{ width: `${(filledSlotsCount / 3) * 100}%` }}
                    />
                  </div>

                  {/* Unlocked Gift Thumbnails */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-sans">
                    <div
                      className={`p-2 rounded-lg border flex items-center gap-2 transition-all ${
                        filledSlotsCount >= 1
                          ? 'border-[#B86B43] bg-[#B86B43]/15 text-[#EAE8E1]'
                          : 'border-white/10 bg-white/5 text-[#EAE8E1]/50'
                      }`}
                    >
                      <img
                        src="/assets/16_cutout-03-copper-dosing-scoop.png"
                        alt="Brushed Copper Scoop"
                        className="w-6 h-6 object-contain"
                      />
                      <span className="leading-tight font-medium">Copper 2g Scoop</span>
                    </div>

                    <div
                      className={`p-2 rounded-lg border flex items-center gap-2 transition-all ${
                        filledSlotsCount >= 3
                          ? 'border-[#B86B43] bg-[#B86B43]/15 text-[#EAE8E1]'
                          : 'border-white/10 bg-white/5 text-[#EAE8E1]/50'
                      }`}
                    >
                      <img
                        src="/assets/Output_01_VUNGA_Asset_Kit.jpg"
                        alt="Canvas Tote"
                        className="w-6 h-6 object-cover rounded"
                      />
                      <span className="leading-tight font-medium">Kinigi Tote Bag</span>
                    </div>
                  </div>
                </div>

                {/* 3 Visual Slots */}
                <div className="space-y-3">
                  {[0, 1, 2].map((index) => {
                    const slotProduct = selectedSlots[index];
                    return (
                      <div
                        key={index}
                        className="h-20 rounded-xl border border-dashed border-[#EAE8E1]/25 bg-[#141515]/60 flex items-center justify-between px-4 transition-all"
                      >
                        {slotProduct ? (
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={slotProduct.image}
                                alt={slotProduct.name}
                                className="w-14 h-14 object-cover rounded-lg border border-white/10 shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="font-serif text-xs font-bold text-white truncate">
                                  {slotProduct.name}
                                </p>
                                <p className="font-sans text-[11px] text-[#B86B43] font-semibold mt-0.5">
                                  {formatPrice(slotProduct.priceRWF, slotProduct.priceUSD)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveSlot(index)}
                              aria-label={`Remove ${slotProduct.name} from slot ${index + 1}`}
                              className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between w-full text-[#EAE8E1]/50">
                            <div className="flex items-center gap-3">
                              <div className="w-14 h-14 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-white/40">
                                <Plus className="w-5 h-5" />
                              </div>
                              <span className="font-sans text-xs uppercase tracking-wider font-medium">
                                Slot {index + 1} &bull; Select a Product
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pricing & CTA Button */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  {filledSlotsCount > 0 && (
                    <div className="space-y-1.5 text-xs font-sans">
                      <div className="flex justify-between text-[#EAE8E1]/70">
                        <span>Items Total</span>
                        <span>{formatPrice(bundlePricing.rawRwf, bundlePricing.rawUsd)}</span>
                      </div>
                      {isBundleComplete && (
                        <div className="flex justify-between text-[#D4AF6A] font-semibold">
                          <span>20% Bundle Discount</span>
                          <span>-{formatPrice(bundlePricing.savingsRwf, bundlePricing.savingsUsd)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-white/10">
                        <span>Ritual Total</span>
                        <span className="text-[#D4AF6A]">
                          {formatPrice(
                            isBundleComplete ? bundlePricing.discountedRwf : bundlePricing.rawRwf,
                            isBundleComplete ? bundlePricing.discountedUsd : bundlePricing.rawUsd
                          )}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* CTA Action Button */}
                  <button
                    type="button"
                    disabled={!isBundleComplete}
                    onClick={handleAddBundleToCart}
                    className={`w-full rounded-full font-sans font-semibold text-xs uppercase tracking-[0.16em] py-4 transition-all duration-300 shadow-xl flex items-center justify-center gap-2 ${
                      isBundleComplete
                        ? 'bg-[#B86B43] hover:bg-[#a35b36] text-[#EAE8E1] cursor-pointer'
                        : 'bg-[#D4AF6A]/20 text-[#D4AF6A] cursor-not-allowed border border-[#D4AF6A]/30'
                    }`}
                  >
                    {isBundleComplete ? (
                      <>
                        <Gift className="w-4 h-4 text-[#D4AF6A]" />
                        <span>ADD 3-STEP RITUAL BOX TO BAG (SAVE 20%)</span>
                      </>
                    ) : (
                      <span>SELECT {3 - filledSlotsCount} MORE TO UNLOCK 20% OFF</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
