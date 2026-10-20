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
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-kinigi-mist/10 border border-kinigi-mist/20 text-spore-gold text-[11px] font-mono tracking-widest uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-spore-gold" />
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
            className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-kinigi-mist/70 tracking-wider"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-verdigris-bamboo" />
              100% Fruiting Bodies
            </span>
            <span className="text-kinigi-mist/30">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-oxidized-copper" />
              Zero Grain Starch Fillers
            </span>
            <span className="text-kinigi-mist/30">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-spore-gold" />
              Hand-Harvested Musanze
            </span>
          </motion.div>
        </div>
      </section>

      {/* =========================================================================
          2. DUAL FILTER SYSTEM
      ========================================================================= */}
      <section className="sticky top-0 z-30 bg-kinigi-paper/95 backdrop-blur-md border-b border-volcanic-ash/10 py-5 px-4 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Filter Row 1: Category Pills */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-mono uppercase tracking-wider text-volcanic-ash/50 mr-1 shrink-0 hidden sm:inline">
              Category:
            </span>
            {categoryOptions.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 shrink-0 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-volcanic-ash text-kinigi-mist shadow-sm ring-1 ring-volcanic-ash'
                      : 'bg-kinigi-paper text-volcanic-ash border border-volcanic-ash/20 hover:border-volcanic-ash/60 hover:bg-kinigi-mist/50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-kinigi-mist/20 text-kinigi-mist'
                        : 'bg-volcanic-ash/10 text-volcanic-ash/70'
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
            <span className="text-[11px] font-mono uppercase tracking-wider text-volcanic-ash/50 mr-1 shrink-0 hidden sm:inline">
              Benefit:
            </span>

            {/* Clear / All benefits button */}
            <button
              onClick={() => setSelectedBenefit('all')}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono tracking-wide transition-all shrink-0 cursor-pointer ${
                selectedBenefit === 'all'
                  ? 'bg-volcanic-ash/10 text-volcanic-ash font-semibold'
                  : 'text-volcanic-ash/60 hover:text-volcanic-ash'
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
                  className={`px-3.5 py-1.5 rounded-sm text-xs font-mono tracking-wide transition-all duration-150 shrink-0 cursor-pointer shadow-2xs ${
                    isActive
                      ? benefit.activeColorClass
                      : `${benefit.colorClass} bg-kinigi-paper text-volcanic-ash border-y border-r border-volcanic-ash/15 hover:border-volcanic-ash/40 hover:bg-kinigi-mist/40`
                  }`}
                >
                  {benefit.label}
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
                  className="text-[11px] font-mono text-oxidized-copper hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
              <span className="text-xs font-mono text-volcanic-ash/60 whitespace-nowrap">
                Showing{' '}
                <strong className="text-volcanic-ash font-bold">{filteredProducts.length}</strong> of{' '}
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
            <div className="w-16 h-16 rounded-full bg-volcanic-ash/5 mx-auto flex items-center justify-center text-volcanic-ash/40 mb-4">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-volcanic-ash mb-2">
              No matching harvests
            </h3>
            <p className="font-sans text-sm text-volcanic-ash/70 mb-6">
              We could not find any apothecary products matching both your selected category and
              benefit filter.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBenefit('all');
              }}
              className="px-6 py-3 bg-volcanic-ash text-kinigi-mist text-xs font-mono uppercase tracking-widest hover:bg-oxidized-copper transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => {
                const isHovered = hoveredCardId === product.id;
                const displayName =
                  language === 'RW' ? product.nameRw : language === 'FR' ? product.nameFr : product.name;

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
                    className="group bg-kinigi-paper border border-volcanic-ash/15 flex flex-col justify-between overflow-hidden rounded-xl transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:border-volcanic-ash/30"
                  >
                    <Link to={`/shop/${product.slug}`} className="flex flex-col flex-1 block">
                      {/* 4:5 Aspect Ratio Image Container with Framer Motion Crossfade */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#141515]">
                        {/* Default Image */}
                        <motion.img
                          src={product.image}
                          alt={displayName}
                          animate={{ opacity: isHovered ? 0 : 1 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Hover Image Crossfade */}
                        <motion.img
                          src={product.hoverImage || product.image}
                          alt={`${displayName} alternate view`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isHovered ? 1 : 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Top-Left Badge: FRESH HARVEST */}
                        {product.isFresh && (
                          <div className="absolute top-3.5 left-3.5 z-10 bg-verdigris-bamboo text-kinigi-mist text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-xs shadow-sm font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-kinigi-mist animate-pulse" />
                            <span>Fresh Harvest</span>
                          </div>
                        )}

                        {/* Top-Right Badge: SUBSCRIBE & SAVE 15% */}
                        {product.isSubscribable && (
                          <div className="absolute top-3.5 right-3.5 z-10 bg-oxidized-copper text-kinigi-mist text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-xs shadow-sm font-semibold">
                            Subscribe & Save 15%
                          </div>
                        )}

                        {/* Bottom-left Beta-Glucans Tag if present */}
                        {product.betaGlucans && (
                          <div className="absolute bottom-3 left-3 z-10 bg-volcanic-deep/85 backdrop-blur-xs text-kinigi-mist text-[10px] font-mono tracking-wide px-2.5 py-1 rounded-xs">
                            {product.betaGlucans}
                          </div>
                        )}
                      </div>

                      {/* Product Card Details */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Product Name */}
                        <h3 className="font-serif font-bold uppercase tracking-wider text-base sm:text-lg text-volcanic-ash group-hover:text-oxidized-copper transition-colors line-clamp-1">
                          {displayName}
                        </h3>

                        {/* Species in Italic */}
                        <p className="font-sans italic text-volcanic-ash/60 text-xs sm:text-sm mt-1 mb-2 line-clamp-1">
                          {product.speciesLatin || product.species}
                        </p>

                        {/* Weight / Format info in DM Mono 12px */}
                        <div className="font-mono text-[12px] text-volcanic-ash/70 mb-4 line-clamp-1 tracking-tight">
                          {product.weight}
                        </div>

                        {/* Price in DM Mono Bold */}
                        <div className="mt-auto pt-3 border-t border-volcanic-ash/10 flex items-baseline justify-between">
                          <span className="font-mono font-bold text-lg text-volcanic-ash">
                            {formatPrice(product.priceRWF, product.priceUSD)}
                          </span>

                          {product.isSubscribable && (
                            <span className="text-[11px] font-mono text-oxidized-copper">
                              Sub: {formatPrice(Math.round(product.priceRWF * 0.85), product.priceUSD ? +(product.priceUSD * 0.85).toFixed(2) : undefined)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Add to Bag CTA Button */}
                    <div className="px-6 pb-6 pt-0">
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-full py-3 bg-oxidized-copper hover:brightness-110 active:scale-[0.99] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-white" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
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
          <div className="flex flex-col items-center md:items-start p-6 bg-kinigi-paper border border-volcanic-ash/10">
            <span className="font-mono text-xs text-oxidized-copper uppercase tracking-widest mb-2 font-semibold">
              01 · Dual Extraction
            </span>
            <h4 className="font-serif font-bold text-lg text-volcanic-ash mb-2">
              Hot Water & Organic Cane Alcohol
            </h4>
            <p className="font-sans text-xs text-volcanic-ash/70 leading-relaxed">
              Liberates water-soluble beta-1,3/1,6-glucans and alcohol-soluble triterpenes for maximum cellular bioavailability.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start p-6 bg-kinigi-paper border border-volcanic-ash/10">
            <span className="font-mono text-xs text-verdigris-bamboo uppercase tracking-widest mb-2 font-semibold">
              02 · Highland Soil Purity
            </span>
            <h4 className="font-serif font-bold text-lg text-volcanic-ash mb-2">
              Kinigi Basalt & Organic Juncao
            </h4>
            <p className="font-sans text-xs text-volcanic-ash/70 leading-relaxed">
              Nurtured on nutrient-dense volcanic substrate at 2,400 meters with zero pesticides, chemical fertilizers, or oat grain fillers.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start p-6 bg-kinigi-paper border border-volcanic-ash/10">
            <span className="font-mono text-xs text-spore-gold uppercase tracking-widest mb-2 font-semibold">
              03 · Third-Party COA Verified
            </span>
            <h4 className="font-serif font-bold text-lg text-volcanic-ash mb-2">
              Species NMR & Heavy Metal Cleared
            </h4>
            <p className="font-sans text-xs text-volcanic-ash/70 leading-relaxed">
              Every production batch undergoes third-party Megazyme beta-glucan assay and ICP-MS testing below 0.01 ppm detection limits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
