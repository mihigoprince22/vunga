import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import type { Product } from '../data/products';
import { useVunga } from '../context/VungaContext';

type CategoryFilter = 'all' | 'functional' | 'culinary' | 'bundles';
type BenefitFilter = 'all' | 'focus' | 'calm' | 'immunity' | 'energy' | 'culinary';

interface CategoryOption {
  id: CategoryFilter;
  label: string;
  count: number;
}

interface BenefitOption {
  id: BenefitFilter;
  label: string;
  colorClass: string;
  activeColorClass: string;
}

const Shop: React.FC = () => {
  const { formatPrice, addToCart, openCart, language } = useVunga();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitFilter>('all');
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  useEffect(() => {
    const needParam = searchParams.get('need') || searchParams.get('benefit');
    const catParam = searchParams.get('category');
    if (needParam && ['focus', 'calm', 'immunity', 'energy', 'culinary'].includes(needParam)) {
      setSelectedBenefit(needParam as BenefitFilter);
    }
    if (catParam && ['functional', 'culinary', 'bundles'].includes(catParam)) {
      setSelectedCategory(catParam as CategoryFilter);
    }
  }, [searchParams]);

  // Category pills as requested in specification
  const categoryOptions: CategoryOption[] = [
    { id: 'all', label: 'All', count: products.length },
    {
      id: 'functional',
      label: 'Functional Extracts & Cacao',
      count: products.filter((p) => p.category === 'functional' || p.category === 'cacao').length,
    },
    {
      id: 'culinary',
      label: 'Fresh & Dried Rwandan Mushrooms',
      count: products.filter((p) => p.category === 'culinary').length,
    },
    {
      id: 'bundles',
      label: 'Bundles & Apothecary Gear',
      count: products.filter((p) => p.isSubscribable).length,
    },
  ];

  // Benefit pills with specific colored left borders
  // (focus=default, calm=terracotta, immunity=verdigris, energy=spore-gold, culinary=copper)
  const benefitOptions: BenefitOption[] = [
    {
      id: 'focus',
      label: 'Focus & Memory',
      colorClass: 'border-l-4 border-l-volcanic-ash',
      activeColorClass: 'border-l-4 border-l-volcanic-ash bg-volcanic-ash text-kinigi-mist',
    },
    {
      id: 'calm',
      label: 'Calm & Sleep',
      colorClass: 'border-l-4 border-l-musanze-terracotta',
      activeColorClass: 'border-l-4 border-l-musanze-terracotta bg-volcanic-ash text-kinigi-mist',
    },
    {
      id: 'immunity',
      label: 'Immunity',
      colorClass: 'border-l-4 border-l-verdigris-bamboo',
      activeColorClass: 'border-l-4 border-l-verdigris-bamboo bg-volcanic-ash text-kinigi-mist',
    },
    {
      id: 'energy',
      label: 'Energy & Stamina',
      colorClass: 'border-l-4 border-l-spore-gold',
      activeColorClass: 'border-l-4 border-l-spore-gold bg-volcanic-ash text-kinigi-mist',
    },
    {
      id: 'culinary',
      label: 'Culinary & Gourmet',
      colorClass: 'border-l-4 border-l-oxidized-copper',
      activeColorClass: 'border-l-4 border-l-oxidized-copper bg-volcanic-ash text-kinigi-mist',
    },
  ];

  // Combined Category AND Benefit filter logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category condition
      let matchesCategory = true;
      if (selectedCategory === 'functional') {
        matchesCategory = product.category === 'functional' || product.category === 'cacao';
      } else if (selectedCategory === 'culinary') {
        matchesCategory = product.category === 'culinary';
      } else if (selectedCategory === 'bundles') {
        matchesCategory = product.isSubscribable;
      }

      // Benefit condition
      let matchesBenefit = true;
      if (selectedBenefit !== 'all') {
        matchesBenefit = product.benefits.includes(selectedBenefit as any);
      }

      return matchesCategory && matchesBenefit;
    });
  }, [selectedCategory, selectedBenefit]);

  const handleBenefitClick = (benefitId: BenefitFilter) => {
    if (selectedBenefit === benefitId) {
      setSelectedBenefit('all');
    } else {
      setSelectedBenefit(benefitId);
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    openCart();
  };

  return (
    <div className="min-h-screen bg-kinigi-paper text-volcanic-ash selection:bg-oxidized-copper selection:text-kinigi-mist">
      {/* =========================================================================
          1. HEADER BANNER SECTION
      ========================================================================= */}
      <section className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] flex items-center justify-center overflow-hidden bg-volcanic-deep">
        {/* Full-width banner background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 ease-out"
          style={{ backgroundImage: `url('/assets/04_VUNGA_4SKU_Packaging_Suite.jpg')` }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-volcanic-deep via-volcanic-ash/85 to-volcanic-deep/80 backdrop-blur-[2px]" />

        {/* Banner Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE8E1]/10 border border-[#EAE8E1]/20 text-[#D4AF6A] text-[11px] font-sans font-semibold tracking-widest uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF6A]" />
            <span>Kinigi Volcanic Altitude · 2,400m Substrate</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif font-light text-kinigi-mist text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15]"
          >
            The Apothecary Collection
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-kinigi-mist/85 text-base sm:text-lg max-w-2xl font-light mt-4 leading-relaxed"
          >
            Functional mushroom extracts, Rwandan dark cacao rituals, and fresh highland harvests from Kinigi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-sans font-medium text-[#EAE8E1]/80 tracking-wider"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#527361]" />
              100% Fruiting Bodies
            </span>
            <span className="text-white/30">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B86B43]" />
              Zero Grain Starch Fillers
            </span>
            <span className="text-white/30">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF6A]" />
              Hand-Harvested Musanze
            </span>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          2. DUAL FILTER SYSTEM
      ========================================================================= */}
      <section className="sticky top-0 z-30 bg-[#F4F1EA]/95 backdrop-blur-md border-b border-[#222423]/10 py-5 px-4 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Filter Row 1: Category Pills */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-sans uppercase tracking-wider text-[#222423]/60 mr-1 shrink-0 hidden sm:inline font-semibold">
              Category:
            </span>
            {categoryOptions.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-200 shrink-0 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#222423] text-[#EAE8E1] shadow-sm'
                      : 'bg-white text-[#222423] border border-[#222423]/15 hover:border-[#222423]/50 hover:bg-[#EAE8E1]/50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-sans font-bold px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#222423]/10 text-[#222423]/70'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filter Row 2: Benefit Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-sans uppercase tracking-wider text-[#222423]/60 mr-1 shrink-0 hidden sm:inline font-semibold">
              Benefit:
            </span>

            {/* Clear / All benefits button */}
            <button
              onClick={() => setSelectedBenefit('all')}
              className={`px-4 py-2 rounded-full text-xs font-sans font-medium tracking-wide transition-all shrink-0 cursor-pointer ${
                selectedBenefit === 'all'
                  ? 'bg-[#222423]/15 text-[#222423] font-semibold'
                  : 'text-[#222423]/60 hover:text-[#222423]'
              }`}
            >
              All Benefits
            </button>

            {benefitOptions.map((benefit) => {
              const isActive = selectedBenefit === benefit.id;
              return (
                <button
                  key={benefit.id}
                  onClick={() => handleBenefitClick(benefit.id)}
                  className={`px-4 py-2 rounded-full text-xs font-sans font-medium tracking-wide transition-all duration-150 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#222423] text-[#EAE8E1] shadow-xs'
                      : 'bg-white text-[#222423] border border-[#222423]/15 hover:border-[#222423]/40'
                  }`}
                >
                  <span>{benefit.label}</span>
                  {isActive && <span className="ml-1.5 opacity-70">✕</span>}
                </button>
              );
            })}

            {/* Product Matching Count Status */}
            <div className="ml-auto pl-4 shrink-0 flex items-center gap-3">
              {(selectedCategory !== 'all' || selectedBenefit !== 'all') && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBenefit('all');
                  }}
                  className="text-xs font-sans font-semibold text-[#B86B43] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
              <span className="text-xs font-sans text-[#222423]/70 whitespace-nowrap">
                Showing{' '}
                <strong className="text-[#222423] font-bold">{filteredProducts.length}</strong> of{' '}
                {products.length} formulations
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. PRODUCT GRID SECTION
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#222423]/5 mx-auto flex items-center justify-center text-[#222423]/40 mb-4">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#222423] mb-2">
              No matching harvests
            </h3>
            <p className="font-sans text-sm text-[#222423]/70 mb-6">
              We could not find any apothecary products matching both your selected category and
              benefit filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBenefit('all');
              }}
              className="px-6 py-3 rounded-full bg-[#222423] text-[#EAE8E1] text-xs font-sans font-semibold uppercase tracking-widest hover:bg-[#B86B43] transition-colors cursor-pointer shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => {
                const displayName =
                  language === 'RW' ? product.nameRw : language === 'FR' ? product.nameFr : product.name;
                const formatLabel =
                  product.formats?.[0] || product.weight?.split(' ')[0] || (product.isFresh ? '500g Fresh' : '60g Extract');
                const badgeText =
                  product.id === 1 || product.id === 4
                    ? 'BESTSELLER'
                    : product.isFresh
                    ? "CHEF'S RESERVE"
                    : '100% FRUITING BODY';

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    onMouseEnter={() => setHoveredCardId(product.id)}
                    onMouseLeave={() => setHoveredCardId(null)}
                    className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#222423]/8 shadow-[0_8px_30px_rgb(34,36,35,0.06)] hover:shadow-[0_20px_40px_rgb(184,107,67,0.14)] p-4 transition-all duration-300 hover:-translate-y-1 text-[#222423]"
                  >
                    <Link to={`/shop/${product.slug}`} className="flex flex-col flex-1">
                      {/* 4:5 Aspect Ratio Image Container */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#1A1C1B] mb-3">
                        <img
                          src={product.image}
                          alt={displayName}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        {product.hoverImage && (
                          <img
                            src={product.hoverImage}
                            alt={`${displayName} alternate view`}
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                            loading="lazy"
                          />
                        )}

                        {/* Top-Left Pill Badge */}
                        <span className="absolute top-3 left-3 z-10 rounded-full bg-[#141515]/90 backdrop-blur-md text-[#EAE8E1] px-3 py-1 text-[10px] font-sans font-semibold uppercase tracking-[0.12em] border border-[#B86B43]/40 shadow-sm">
                          {badgeText}
                        </span>

                        {/* Top-Right Format Pill */}
                        <span className="absolute top-3 right-3 z-10 rounded-full bg-white/95 backdrop-blur-md text-[#222423] px-2.5 py-1 text-[10px] font-sans font-semibold uppercase tracking-[0.08em] shadow-sm border border-[#222423]/10">
                          {formatLabel}
                        </span>
                      </div>

                      {/* Product Card Details */}
                      <div className="flex flex-col flex-1 justify-between px-1">
                        <div>
                          {/* Social Proof: 5 filled gold stars + review count */}
                          <div className="flex items-center gap-1.5 text-xs text-[#D4AF6A] mb-1">
                            <span>★★★★★</span>
                            <span className="text-[11px] font-sans font-medium text-[#222423]/70">
                              4.9 (142)
                            </span>
                          </div>

                          {/* Botanical Latin & Spec Subtitle */}
                          <p className="text-[11px] font-sans font-semibold uppercase tracking-[0.1em] text-[#527361] mb-1 line-clamp-1">
                            {product.speciesLatin || product.species}
                            {product.betaGlucans ? ` · ${product.betaGlucans}` : ''}
                          </p>

                          {/* Product Name */}
                          <h3 className="font-serif text-lg font-bold text-[#222423] leading-snug line-clamp-2 min-h-[3rem] group-hover:text-[#B86B43] transition-colors mt-1">
                            {displayName}
                          </h3>

                          {/* Short Description */}
                          <p className="text-xs font-sans text-[#222423]/75 mt-1 mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </Link>

                    {/* Solid Pill CTA Button */}
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-full rounded-full bg-[#222423] group-hover:bg-[#B86B43] text-[#EAE8E1] font-sans font-semibold text-xs uppercase tracking-[0.14em] py-3.5 px-5 mt-3 flex items-center justify-between transition-all duration-300 cursor-pointer shadow-md"
                    >
                      <span>ADD TO BAG</span>
                      <span className="font-medium text-white/95">
                        {formatPrice(product.priceRWF, product.priceUSD)}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* =========================================================================
          4. APOTHECARY RITUAL PROMISE FOOTER BANNER
      ========================================================================= */}
      <section className="border-t border-volcanic-ash/15 bg-kinigi-mist/40 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start p-6 bg-white border border-[#222423]/10 rounded-2xl shadow-xs">
            <span className="font-sans text-xs text-[#B86B43] uppercase tracking-widest mb-2 font-bold">
              01 · Dual Extraction
            </span>
            <h4 className="font-serif font-bold text-lg text-[#222423] mb-2">
              Hot Water & Organic Cane Alcohol
            </h4>
            <p className="font-sans text-xs text-[#222423]/70 leading-relaxed">
              Liberates water-soluble beta-1,3/1,6-glucans and alcohol-soluble triterpenes for maximum cellular bioavailability.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start p-6 bg-white border border-[#222423]/10 rounded-2xl shadow-xs">
            <span className="font-sans text-xs text-[#527361] uppercase tracking-widest mb-2 font-bold">
              02 · Highland Soil Purity
            </span>
            <h4 className="font-serif font-bold text-lg text-[#222423] mb-2">
              Kinigi Basalt & Organic Juncao
            </h4>
            <p className="font-sans text-xs text-[#222423]/70 leading-relaxed">
              Nurtured on nutrient-dense volcanic substrate at 2,400 meters with zero pesticides, chemical fertilizers, or oat grain fillers.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start p-6 bg-white border border-[#222423]/10 rounded-2xl shadow-xs">
            <span className="font-sans text-xs text-[#D4AF6A] uppercase tracking-widest mb-2 font-bold">
              03 · Third-Party COA Verified
            </span>
            <h4 className="font-serif font-bold text-lg text-[#222423] mb-2">
              Species NMR & Heavy Metal Cleared
            </h4>
            <p className="font-sans text-xs text-[#222423]/70 leading-relaxed">
              Every production batch undergoes third-party Megazyme beta-glucan assay and ICP-MS testing below 0.01 ppm detection limits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
