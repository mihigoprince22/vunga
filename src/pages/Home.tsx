import React, { useState, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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
  ShoppingBag,
} from 'lucide-react';
import { useVunga } from '../context/VungaContext';
import { products, Product } from '../data/products';

interface BenefitTab {
  id: 'all' | 'focus' | 'calm' | 'immunity' | 'energy' | 'culinary';
  title: string;
  subtitle: string;
}

const BENEFIT_TABS: BenefitTab[] = [
  {
    id: 'all',
    title: 'All Harvests',
    subtitle: 'Explore the full 12-species volcanic dispensary',
  },
  {
    id: 'focus',
    title: 'Focus & Clarity',
    subtitle: 'I want help staying mentally sharp',
  },
  {
    id: 'calm',
    title: 'Calm & Deep Sleep',
    subtitle: 'I want to feel calmer and sleep better',
  },
  {
    id: 'immunity',
    title: 'Immunity & Protection',
    subtitle: 'I want everyday immune defense',
  },
  {
    id: 'energy',
    title: 'Stamina & Cacao',
    subtitle: 'I want clean energy without the crash',
  },
  {
    id: 'culinary',
    title: 'Fresh Rwandan Culinary',
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

const ROUTINE_CARDS = [
  {
    icon: Coffee,
    title: 'In Your Morning Rwandan Coffee',
    desc: "Add 1 scoop of Lion's Mane Focus to your morning pour-over for sustained clarity.",
  },
  {
    icon: Moon,
    title: 'In Your Evening Herbal Tonic',
    desc: 'Stir Highland Reishi Calm into warm oat milk 45 minutes before sleep.',
  },
  {
    icon: Candy,
    title: 'Two Squares of Afternoon Cacao',
    desc: 'Enjoy 2 Cordyceps Energy Cacao squares at 2pm for clean, sustained focus.',
  },
  {
    icon: ChefHat,
    title: 'Seared Fresh in Your Kitchen',
    desc: 'Score King Trumpets and sear with garlic butter. Pan-roast Pearl Oysters with rosemary.',
  },
];

const SCIENCE_FRUITING_BODY = [
  '>30% Beta-D-Glucans',
  '<2% Starch',
  'Dual Water + Ethanol',
  'Volcanic Substrate',
  'Every Batch Verified',
];

const SCIENCE_MYCELIUM_GRAIN = [
  '<5% Beta-Glucans',
  'Up to 70% Grain Starch',
  'Hot Water Only',
  'Oat / Rice Grain',
  'Rarely Tested',
];

const Home: React.FC = () => {
  const { openQuiz, openCart, addToCart, formatPrice } = useVunga();

  // Benefit Switcher state
  const [activeTab, setActiveTab] = useState<number>(0);

  // Parallax section ref
  const routineSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: routineSectionRef,
    offset: ['start end', 'end start'],
  });

  const yLionsMane = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const yReishi = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yScoop = useTransform(scrollYProgress, [0, 1], [-20, 40]);

  // Ritual Bundle Builder state
  const [selectedSlots, setSelectedSlots] = useState<(Product | null)[]>([null, null, null]);

  // Filtered products for active benefit tab
  const filteredProducts = useMemo(() => {
    const currentBenefit = BENEFIT_TABS[activeTab].id;
    if (currentBenefit === 'all') return products;
    return products.filter((p) => (p.benefits as string[]).includes(currentBenefit));
  }, [activeTab]);

  // Bundle calculations
  const isBundleComplete = selectedSlots.every((slot) => slot !== null);

  const bundlePricing = useMemo(() => {
    const rawRwf = selectedSlots.reduce((acc, p) => acc + (p?.priceRWF || 0), 0);
    const rawUsd = selectedSlots.reduce((acc, p) => acc + (p?.priceUSD || 0), 0);
    const discountedRwf = Math.round(rawRwf * 0.8);
    const discountedUsd = Number((rawUsd * 0.8).toFixed(2));
    return {
      rawRwf,
      rawUsd,
      discountedRwf,
      discountedUsd,
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
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#D4AF6A] font-semibold">
                HARVESTED AT 2,400M · KINIGI, MUSANZE — RWANDA
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-serif font-light text-5xl lg:text-7xl text-[#EAE8E1] leading-[1.08] tracking-tight mb-6">
              Earthen Alchemy from the Virunga Mist.
            </h1>

            {/* Subheadline */}
            <p className="font-sans text-lg text-[#EAE8E1]/80 max-w-2xl font-normal leading-relaxed mb-10">
              Apothecary-grade functional mushroom extracts, 75% Rwandan dark cacao, and fresh highland harvests
              cultivated on mineral-rich volcanic substrate. Zero grain. Zero fillers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#apothecary-shop"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('apothecary-shop')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-[#B86B43] hover:bg-[#a15833] text-white font-mono uppercase tracking-[0.14em] text-sm font-semibold transition-all duration-300 shadow-lg shadow-[#B86B43]/25 flex items-center justify-center gap-3 group text-center cursor-pointer"
              >
                <span>SHOP THE HARVEST</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                type="button"
                onClick={openQuiz}
                className="px-8 py-4 border-2 border-[#EAE8E1]/40 hover:border-[#EAE8E1] hover:bg-white/5 bg-transparent text-[#EAE8E1] font-mono uppercase tracking-[0.14em] text-sm font-semibold transition-all duration-300 backdrop-blur-sm text-center cursor-pointer"
              >
                TAKE THE MUSHROOM MATCHER
              </button>
            </div>
          </motion.div>
        </div>

        {/* Pinned Bottom 5-Badge Spec Bar */}
        <div className="absolute bottom-0 inset-x-0 z-20 w-full bg-[#141515]/75 backdrop-blur-md border-t border-white/10 py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center overflow-x-auto gap-4 sm:gap-6 lg:gap-8 scrollbar-none py-1">
            {SPEC_BADGES.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <React.Fragment key={badge.label}>
                  <div className="flex items-center gap-2 flex-shrink-0 text-[#EAE8E1]/80">
                    <Icon className="w-4 h-4 text-[#B86B43]" />
                    <span className="font-mono text-[11px] uppercase tracking-widest font-medium whitespace-nowrap">
                      {badge.label}
                    </span>
                  </div>
                  {idx < SPEC_BADGES.length - 1 && (
                    <span className="text-[#B86B43] select-none text-xs font-mono">·</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: First-Person "Shop by Need" Switcher (bg-[#EAE8E1])            */}
      {/* ========================================================================= */}
      <section id="apothecary-shop" className="bg-[#EAE8E1] py-16 lg:py-24 border-b border-[#222423]/10 text-[#222423]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="font-serif italic text-3xl lg:text-4xl text-[#222423] tracking-tight">
              &ldquo;What brings you to the apothecary?&rdquo;
            </h2>
            <p className="font-sans text-xs font-mono uppercase tracking-widest text-[#222423]/70 mt-3">
              Tailored Botanical Formulations For Your Vitality Needs
            </p>
          </div>

          {/* Benefit Tabs Row */}
          <div className="overflow-x-auto flex gap-3 pb-6 justify-start lg:justify-center scrollbar-none">
            {BENEFIT_TABS.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`flex flex-col text-left px-5 py-3 rounded-lg transition-all duration-300 flex-shrink-0 min-w-[200px] sm:min-w-[220px] cursor-pointer ${
                    isActive
                      ? 'bg-[#222423] text-[#EAE8E1] shadow-md shadow-[#222423]/20 ring-1 ring-[#222423]'
                      : 'bg-[#F4F2EC] text-[#222423] border border-[#222423]/15 hover:border-[#B86B43]/50 hover:bg-[#EAE8E1]'
                  }`}
                >
                  <span className={`font-serif font-bold text-sm tracking-wide ${isActive ? 'text-[#EAE8E1]' : 'text-[#222423]'}`}>
                    {tab.title}
                  </span>
                  <span
                    className={`text-xs italic mt-1 ${
                      isActive ? 'text-[#EAE8E1]/80' : 'text-[#222423]/70'
                    }`}
                  >
                    {tab.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filtered Product Grid with AnimatePresence */}
          <div className="mt-8">
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
                    className="group bg-[#F4F2EC] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#222423]/15 flex flex-col text-[#222423]"
                  >
                    {/* Image Container with Two-State Hover Crossfade */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-xl bg-[#141515]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-0"
                      />
                      <img
                        src={product.hoverImage}
                        alt={`${product.name} detail`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 opacity-0 group-hover:scale-105 group-hover:opacity-100"
                      />

                      {/* Fresh Badge */}
                      {product.isFresh && (
                        <span className="absolute top-3 left-3 z-10 bg-[#527361] text-white text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded shadow-sm font-semibold">
                          FRESH
                        </span>
                      )}

                      {/* Subscribable Badge */}
                      {product.isSubscribable && (
                        <span className="absolute top-3 right-3 z-10 bg-[#B86B43] text-white text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded shadow-sm font-semibold">
                          SAVE 15%
                        </span>
                      )}
                    </div>

                    {/* Card Body with strict explicit high-contrast text */}
                    <div className="p-4 flex flex-col flex-1 justify-between bg-[#F4F2EC] text-[#222423] rounded-b-xl border-t border-[#222423]/10">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[#527361] font-semibold">
                            {product.category === 'functional'
                              ? 'Dual Extract'
                              : product.category === 'cacao'
                              ? 'Dark Cacao'
                              : 'Highland Harvest'}
                          </span>
                          {product.betaGlucans && (
                            <span className="font-mono text-[9px] text-[#222423]/70 font-medium">
                              {product.betaGlucans}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif font-bold text-sm uppercase tracking-[0.14em] text-[#222423] group-hover:text-[#B86B43] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="font-sans text-xs italic text-[#527361] mt-1 line-clamp-1 font-medium">
                          {product.speciesLatin || product.species}
                        </p>
                        <p className="font-mono text-xs text-[#222423]/70 mt-1 line-clamp-1">
                          {product.weight}
                        </p>
                        <p className="font-mono text-sm font-bold text-[#222423] mt-2.5">
                          {formatPrice(product.priceRWF, product.priceUSD)}
                        </p>
                      </div>

                      {/* Add to Bag Button */}
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
                        className="w-full py-2.5 bg-[#222423] hover:bg-[#B86B43] text-[#EAE8E1] text-xs uppercase tracking-widest font-mono transition-colors duration-200 mt-4 flex items-center justify-center gap-2 rounded cursor-pointer font-semibold shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
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
      <section
        ref={routineSectionRef}
        className="relative overflow-hidden bg-[#222423] py-20 lg:py-28 text-[#EAE8E1]"
      >
        {/* Floating Parallax Cutouts (Large Screens Only) */}
        <motion.img
          style={{ y: yLionsMane }}
          src="/assets/14_cutout-01-lions-mane.png"
          alt="Lion's Mane Fruiting Body"
          className="hidden lg:block absolute right-8 top-16 w-32 md:w-44 h-auto object-contain pointer-events-none select-none drop-shadow-2xl opacity-60 z-0"
        />
        <motion.img
          style={{ y: yReishi }}
          src="/assets/15_cutout-02-reishi-cap.png"
          alt="Reishi Mushroom Cap"
          className="hidden lg:block absolute left-8 bottom-12 w-32 md:w-44 h-auto object-contain pointer-events-none select-none drop-shadow-2xl opacity-50 z-0"
        />
        <motion.img
          style={{ y: yScoop }}
          src="/assets/16_cutout-03-copper-dosing-scoop.png"
          alt="Copper Dosing Scoop"
          className="hidden lg:block absolute right-16 bottom-24 w-32 md:w-44 h-auto object-contain pointer-events-none select-none drop-shadow-2xl opacity-65 z-0"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="mb-12">
            <h2 className="font-serif font-light text-4xl lg:text-5xl text-[#EAE8E1] leading-tight">
              Keep Your Routine.
              <br />
              Add VŪNGA to It.
            </h2>
            <div className="w-16 h-0.5 bg-[#B86B43] mt-4" />
          </div>

          {/* Split Layout: Left Video (5/12) + Right 2x2 Grid (7/12) */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left: Video in Portrait Container */}
            <div className="w-full lg:w-5/12">
              <div className="aspect-[9/16] max-h-[600px] w-full overflow-hidden rounded-lg border border-[#B86B43]/30 shadow-2xl bg-[#141515] mx-auto">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/assets/20_keyframe-video-04-morning-elixir-stir-9x16_4K.jpg"
                  src="/assets/20_video-04-morning-elixir-stir-loop-9x16.mp4"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Right: 2x2 Grid of Routine Cards */}
            <div className="w-full lg:w-7/12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ROUTINE_CARDS.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.title}
                      className="bg-[#141515] p-6 rounded-lg border border-white/5 hover:border-[#B86B43]/40 transition-all duration-300 flex flex-col justify-start group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-[#222423] border border-white/5 flex items-center justify-center text-[#D4AF6A] group-hover:text-[#B86B43] transition-colors">
                        <Icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif font-semibold text-[#EAE8E1] text-base mt-4 leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-sm text-[#EAE8E1]/70 mt-2 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: "From Spore to Shelf" Teaser & Science Snapshot (bg-[#EAE8E1]) */}
      {/* ========================================================================= */}
      <section className="bg-[#EAE8E1] py-16 lg:py-24 border-b border-[#222423]/10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Split Layout: Sanctuary Image & Origin Story */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            {/* Left Image */}
            <div className="w-full lg:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-md border border-[#222423]/10 group">
                <img
                  src="/assets/01_I01_anchor-kinigi-sanctuary-16x9_4K.jpg"
                  alt="Kinigi Highland Mushroom Sanctuary"
                  className="w-full h-full aspect-[16/9] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Right Story */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B86B43] font-semibold mb-2">
                ORIGIN · KINIGI SANCTUARY
              </span>
              <h2 className="font-serif text-2xl lg:text-3xl text-[#222423] font-bold leading-tight mb-4">
                Cultivated in the Volcanic Highlands of Kinigi
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#222423]/80 leading-relaxed mb-6">
                Under the shadowed ridges of Mount Karisimbi and Mount Bisoke at 2,400 meters elevation,
                our Kinigi sanctuary cultivates functional fungi on mineral-dense volcanic substrate.
                Sustained by sub-alpine humidity and crisp equatorial breezes, every harvest is gathered
                by hand at peak spore maturity to ensure unparalleled biochemical potency.
              </p>
              <Link
                to="/origin"
                className="inline-flex items-center gap-2 text-[#B86B43] hover:text-[#8C3F2B] font-semibold font-sans text-sm tracking-wide transition-colors"
              >
                <span>Discover Our Origin</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Science Snapshot: Beta-Glucan Comparison Preview Card */}
          <div className="mt-12 bg-[#F4F2EC] rounded-lg p-6 lg:p-8 border border-[#222423]/10 shadow-sm">
            <div className="text-center mb-8">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#222423]">
                The Fruiting Body Standard
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest text-[#222423]/60 mt-1">
                Verified Chemistry: 100% Mushroom vs. Grain Mycelium
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {/* Left Column: VUNGA 100% Fruiting Body */}
              <div className="bg-[#EAE8E1]/40 rounded-lg p-6 border border-[#527361]/30">
                <h4 className="font-serif font-bold text-base sm:text-lg text-[#222423] pb-3 mb-4 border-b border-[#222423]/10 flex items-center justify-between">
                  <span>VŪNGA 100% Fruiting Body</span>
                  <span className="font-mono text-[10px] tracking-wider uppercase bg-[#527361]/15 text-[#527361] px-2 py-0.5 rounded font-semibold">
                    Gold Standard
                  </span>
                </h4>
                <ul className="space-y-3">
                  {SCIENCE_FRUITING_BODY.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#222423] font-medium">
                      <Check className="w-4 h-4 text-[#527361] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Typical Mycelium-on-Grain */}
              <div className="bg-[#EAE8E1]/40 rounded-lg p-6 border border-red-200">
                <h4 className="font-serif font-bold text-base sm:text-lg text-[#222423]/70 pb-3 mb-4 border-b border-[#222423]/10 flex items-center justify-between">
                  <span>Typical Mycelium-on-Grain</span>
                  <span className="font-mono text-[10px] tracking-wider uppercase bg-red-100 text-red-600 px-2 py-0.5 rounded font-semibold">
                    Industry Filler
                  </span>
                </h4>
                <ul className="space-y-3">
                  {SCIENCE_MYCELIUM_GRAIN.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#222423]/70">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link
                to="/science"
                className="inline-flex items-center gap-1.5 text-[#B86B43] hover:text-[#8C3F2B] font-semibold font-sans text-sm transition-colors"
              >
                <span>Explore the Full Science</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: "Build Your Virunga Ritual" Interactive Bundle Builder          */}
      {/* ========================================================================= */}
      <section className="bg-[#EAE8E1] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl lg:text-4xl text-[#222423] font-light">
              Build Your Virunga Ritual
            </h2>
            <p className="text-center text-[#222423]/70 mt-2 font-sans text-sm sm:text-base">
              Select any 3 products for 20% Bundle Savings + Free Gifts
            </p>
          </div>

          {/* 3 Slot Containers */}
          <div className="flex flex-wrap sm:flex-nowrap gap-4 lg:gap-6 justify-center items-center mb-10">
            {selectedSlots.map((slot, index) => (
              <div
                key={index}
                className="w-40 h-48 lg:w-48 lg:h-56 border-2 border-dashed border-[#B86B43]/40 rounded-lg flex flex-col items-center justify-center relative bg-[#F4F2EC] hover:border-[#B86B43] transition-colors p-3 shadow-inner"
              >
                {slot ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full flex flex-col items-center justify-between text-center relative"
                  >
                    {/* Remove button */}
                    <button
                      type="button"
                      aria-label="Remove slot product"
                      onClick={() => handleRemoveSlot(index)}
                      className="absolute top-0 right-0 p-1 rounded-full bg-[#222423]/10 hover:bg-[#B86B43] hover:text-white text-[#222423] transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <img
                      src={slot.image}
                      alt={slot.name}
                      className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-md mt-2 shadow-sm border border-[#222423]/10"
                    />

                    <div className="w-full mt-2">
                      <p className="text-xs font-mono font-semibold text-[#222423] line-clamp-1 px-1">
                        {slot.name}
                      </p>
                      <p className="text-[11px] font-mono text-[#B86B43] font-medium mt-0.5">
                        {formatPrice(slot.priceRWF, slot.priceUSD)}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-2">
                    <div className="w-10 h-10 rounded-full border border-dashed border-[#B86B43]/50 flex items-center justify-center mb-2">
                      <Plus className="w-5 h-5 text-[#B86B43]/60" />
                    </div>
                    <span className="text-xs font-mono text-[#222423]/50 uppercase tracking-widest font-semibold">
                      Slot {index + 1}
                    </span>
                    <span className="text-[10px] text-[#222423]/40 font-sans mt-1">
                      Select item below
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Scrollable Product Selector */}
          <div className="mb-10 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#222423]/60 font-semibold">
                Available Harvest Items:
              </span>
              <span className="font-mono text-[11px] text-[#B86B43]">
                Click an item to fill the next slot
              </span>
            </div>

            <div className="overflow-x-auto flex gap-3 py-3 px-2 scrollbar-none">
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleAddProductToSlot(product)}
                  className="w-28 flex-shrink-0 cursor-pointer p-2 rounded-lg bg-[#F4F2EC] border border-[#222423]/15 hover:border-[#B86B43] hover:shadow-md transition-all text-center group flex flex-col items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded mb-1.5 group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="text-[10px] font-mono text-center truncate text-[#222423] font-medium w-full">
                    {product.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#B86B43] font-bold mt-0.5">
                    {formatPrice(product.priceRWF, product.priceUSD)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bundle Summary & Add to Cart (Shown when all 3 slots filled) */}
          {isBundleComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl mx-auto bg-[#F4F2EC] rounded-xl p-6 lg:p-8 border-2 border-[#B86B43]/30 shadow-lg text-center"
            >
              {/* Bundle Pricing */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="font-mono text-2xl lg:text-3xl font-bold text-[#B86B43]">
                  {formatPrice(bundlePricing.discountedRwf, bundlePricing.discountedUsd)}
                </span>
                <span className="font-mono text-sm sm:text-base line-through text-[#222423]/50">
                  {formatPrice(bundlePricing.rawRwf, bundlePricing.rawUsd)}
                </span>
                <span className="bg-[#B86B43]/15 text-[#B86B43] text-xs font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  20% SAVED
                </span>
              </div>

              {/* Free Gift Callout */}
              <div className="bg-[#EAE8E1]/80 rounded-lg p-4 mb-6 border border-[#222423]/10 text-center">
                <div className="flex items-center justify-center gap-2 mb-1.5 text-[#B86B43]">
                  <Gift className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    Complimentary Gifts Included
                  </span>
                </div>
                <p className="text-xs text-[#222423]/80 font-sans mb-3">
                  Includes Free Copper 2g Dosing Scoop + Kinigi Mist Canvas Tote
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2 bg-[#F4F2EC] px-3 py-1.5 rounded border border-[#222423]/10">
                    <img
                      src="/assets/16_cutout-03-copper-dosing-scoop.png"
                      alt="Copper 2g Dosing Scoop"
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-[11px] font-mono text-[#222423] font-medium">
                      Copper 2g Scoop
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F4F2EC] px-3 py-1.5 rounded border border-[#222423]/10">
                    <img
                      src="/assets/Output_01_VUNGA_Asset_Kit.jpg"
                      alt="Kinigi Mist Canvas Tote & Dosing Stamp Card"
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span className="text-[11px] font-mono text-[#222423] font-medium">
                      Canvas Tote
                    </span>
                  </div>
                </div>
              </div>

              {/* Add Bundle to Cart Button */}
              <button
                type="button"
                onClick={handleAddBundleToCart}
                className="w-full max-w-md mx-auto py-4 bg-[#B86B43] hover:bg-[#a15833] text-white font-mono uppercase tracking-[0.14em] text-sm font-semibold transition-all duration-300 shadow-lg shadow-[#B86B43]/25 flex items-center justify-center gap-2.5 rounded cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD RITUAL BUNDLE TO BAG</span>
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
