import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChevronDown,
  Sparkles,
  ShoppingBag,
  Truck,
  Globe,
  ShieldCheck,
  Check,
  Play,
  Plus,
  Minus,
  FileCheck2,
} from 'lucide-react';
import products, { getProductBySlug } from '../data/products';
import { useVunga } from '../context/VungaContext';

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-volcanic-ash/15">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group cursor-pointer transition-colors"
      >
        <span className="font-serif text-lg font-bold text-volcanic-ash group-hover:text-oxidized-copper transition-colors">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="text-volcanic-ash/60 group-hover:text-oxidized-copper"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-1 text-sm font-sans text-volcanic-ash/80 leading-relaxed space-y-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { formatPrice, addToCart, openCart } = useVunga();

  // Find product by slug with fallback
  const product = useMemo(() => {
    if (!slug) return products[0];
    return getProductBySlug(slug) || products.find((p) => p.slug.includes(slug)) || products[0];
  }, [slug]);

  // Gallery state
  type GalleryMedia = { type: 'image'; url: string; label: string } | { type: 'video'; url: string; poster: string; label: string };

  const galleryItems = useMemo<GalleryMedia[]>(() => {
    const items: GalleryMedia[] = [
      { type: 'image', url: product.image, label: 'Primary View' },
      { type: 'image', url: '/assets/02_I02_anchor-apothecary-kit-flatlay-3x2_4K.jpg', label: 'Apothecary Kit' },
    ];

    if (product.hoverImage && product.hoverImage !== product.image) {
      items.push({ type: 'image', url: product.hoverImage, label: 'Packaging Ritual' });
    }

    if (product.category === 'functional' || product.category === 'cacao') {
      items.push({
        type: 'video',
        url: '/assets/20_video-04-morning-elixir-stir-loop-9x16.mp4',
        poster: '/assets/20_keyframe-video-04-morning-elixir-stir-9x16_4K.jpg',
        label: 'Ritual Video',
      });
    }

    return items;
  }, [product]);

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Purchase configuration states
  const [selectedFormat, setSelectedFormat] = useState<string>(
    product.formats && product.formats.length > 0 ? product.formats[0] : product.weight
  );
  const [purchaseType, setPurchaseType] = useState<'onetime' | 'subscription'>(
    product.isSubscribable ? 'subscription' : 'onetime'
  );
  const [quantity, setQuantity] = useState(1);
  const [hoveredRelatedId, setHoveredRelatedId] = useState<number | null>(null);

  // Accordion active state (default open first tab)
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    compounds: true,
    ritual: false,
    origin: false,
    coa: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Pricing calculations
  const isSubscription = product.isSubscribable && purchaseType === 'subscription';
  const effectiveUnitPrice = isSubscription ? Math.round(product.priceRWF * 0.85) : product.priceRWF;
  const effectiveUnitPriceUSD = isSubscription ? +(product.priceUSD * 0.85).toFixed(2) : product.priceUSD;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedFormat, isSubscription);
    openCart();
  };

  // Related products logic (4 products)
  const relatedProducts = useMemo(() => {
    const sameCategory = products.filter((p) => p.id !== product.id && p.category === product.category);
    const others = products.filter((p) => p.id !== product.id && p.category !== product.category);
    const combined = [...sameCategory, ...others];
    return combined.slice(0, 4);
  }, [product]);

  // Dynamic content based on product data
  const getCompoundsContent = () => {
    if (product.slug.includes('lions-mane')) {
      return {
        keyMolecules: 'Hericenones (C–H) & Erinacines (A–I)',
        method: 'Subcritical hot-water extraction followed by organic sugar cane ethanol precipitation.',
        summary: 'Certified >32% Beta-D-Glucans verified by independent Megazyme testing. Contains zero mycelium-on-grain starch and less than 1.8% native alpha-glucan starches. Stimulates the expression of Nerve Growth Factor (NGF) and Brain-Derived Neurotrophic Factor (BDNF).',
      };
    }
    if (product.slug.includes('reishi')) {
      return {
        keyMolecules: 'Ganoderic Acids (A, B, C2) & Bioactive Triterpenes',
        method: 'Ultrasonic-assisted dual aqueous/alcoholic extraction of 100% mature red reishi antler fruiting bodies.',
        summary: 'Certified >35% Beta-Glucans + Triterpenoids. Triterpenes bind directly to GABA-A neural receptors to downregulate sympathetic fight-or-flight signaling and promote deep restorative Stage 4 slow-wave sleep.',
      };
    }
    if (product.slug.includes('cordyceps')) {
      return {
        keyMolecules: 'Cordycepin (3′-deoxyadenosine), Adenosine & Natural Theobromine',
        method: 'Fruiting-body hot-water dual extract infused into micro-batch single-estate Rwandan 75% dark cacao.',
        summary: 'Certified >25% Beta-Glucans. Cordycepin directly enhances cellular ATP (adenosine triphosphate) generation and VO2 max oxygen diffusion into muscular capillaries without sympathetic heart rate spikes.',
      };
    }
    if (product.slug.includes('5-defenders')) {
      return {
        keyMolecules: 'Polysaccharide-K (PSK), Polysaccharopeptide (PSP), D-Fraction & Betulinic Acid',
        method: 'Targeted multi-fungal synergistic dual extractions across 5 medicinal species.',
        summary: 'Certified >30% Beta-Glucans. Formulated with equal proportions of Kinigi Reishi, wild Virunga Turkey Tail, Highland Maitake, Shiitake, and sub-alpine Chaga to activate macrophages and natural killer (NK) cells.',
      };
    }
    return {
      keyMolecules: 'High-Molecular Weight Beta-1,3/1,6-Glucans, Ergothioneine & Natural Glutamates',
      method: 'Sun-dried at 2,400m altitude or hand-trimmed fresh within 4 hours of dawn harvesting.',
      summary: `Certified ${product.betaGlucans || '>18% Beta-Glucans'}. Rich in L-ergothioneine, an intracellular longevity antioxidant that protects mitochondrial DNA from oxidative stress, paired with velvety natural umami.`,
    };
  };

  const compoundsInfo = getCompoundsContent();

  const getDosingContent = () => {
    if (product.category === 'functional') {
      return (
        <>
          <p>
            <strong>The Morning / Evening Elixir:</strong> Measure 1 level scoop (approx. 2g) using our
            hand-forged brushed copper scoop. Whisk briskly into hot single-origin Rwandan coffee,
            warm ceremonial cacao, or simmering bone broth.
          </p>
          <p>
            <strong>Capsule Dosing:</strong> If consuming capsules, take 3 vegan capsules daily with a glass of
            mineral-rich highland spring water, ideally 15 minutes before your first morning meal.
          </p>
          <p className="text-xs text-volcanic-ash/60 italic">
            *Functional benefits compound with daily ceremonial consistency. Allow 14–21 days of continuous
            incorporation for cellular neuro-receptors to fully assimilate.
          </p>
        </>
      );
    }
    if (product.category === 'cacao') {
      return (
        <>
          <p>
            <strong>Daily Dosing Ritual:</strong> Enjoy 1 to 2 ritual squares 30 minutes before cognitive
            sessions, morning meditation, or aerobic physical training.
          </p>
          <p>
            Allow the raw volcanic chocolate to melt slowly upon the palate, releasing the rich warmth of
            single-origin Rwandan cacao beans and active cordycepin directly into the sublingual capillaries.
          </p>
        </>
      );
    }
    return (
      <>
        <p>
          <strong>Fresh Harvest Preparation:</strong> Gently brush the fluted caps with a dry linen cloth or
          soft botanical brush. Never submerge in water.
        </p>
        <p>
          <strong>Culinary Pan-Sear:</strong> Heat a heavy cast iron or copper pan over medium-high heat. Add 1 tbsp
          of cultured Rwandan butter or cold-pressed olive oil. Place mushrooms flat and sear undisturbed for 4 minutes
          until deep golden caramelization occurs. Flip, toss with minced garlic and sea salt, and serve hot.
        </p>
        {product.formats.some((f) => f.toLowerCase().includes('dried')) && (
          <p>
            <strong>Dried Format Rehydration:</strong> Submerge dried caps in lukewarm filtered water for 20 minutes.
            Strain and reserve the dark aromatic soaking liquid to enrich sauces, risottos, or broth.
          </p>
        )}
      </>
    );
  };

  const currentMedia = galleryItems[activeMediaIndex] || galleryItems[0];

  return (
    <div className="min-h-screen bg-kinigi-paper text-volcanic-ash selection:bg-oxidized-copper selection:text-kinigi-mist">
      {/* Top Breadcrumb Navigation */}
      <nav className="border-b border-volcanic-ash/10 bg-kinigi-paper/90 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-volcanic-ash/60 overflow-hidden text-ellipsis whitespace-nowrap">
            <Link to="/" className="hover:text-oxidized-copper transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-oxidized-copper transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-volcanic-ash font-medium truncate">{product.name}</span>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-oxidized-copper hover:underline text-xs shrink-0 ml-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Collection</span>
          </Link>
        </div>
      </nav>

      {/* =========================================================================
          TOP SECTION (Split Layout: 55% Left Gallery, 45% Right Purchase Box)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ===================== LEFT: 55% Image Gallery ===================== */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Stage Display (Image or Video) */}
            <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full bg-kinigi-mist/40 border border-volcanic-ash/15 overflow-hidden group shadow-lg">
              {currentMedia.type === 'video' ? (
                <div className="w-full h-full relative bg-black flex items-center justify-center">
                  <video
                    src={currentMedia.url}
                    poster={currentMedia.poster}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 z-10 bg-volcanic-ash/80 text-kinigi-mist text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 backdrop-blur-xs">
                    Kinigi Elixir Ritual Loop
                  </div>
                </div>
              ) : (
                <div className="w-full h-full overflow-hidden relative">
                  <img
                    src={currentMedia.url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Badges on main image */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.isFresh && (
                      <span className="bg-verdigris-bamboo text-kinigi-mist text-[10px] font-mono tracking-widest uppercase px-3 py-1 font-semibold rounded-xs shadow-sm inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-kinigi-mist animate-pulse" />
                        Fresh Highland Harvest
                      </span>
                    )}
                    {product.isSubscribable && (
                      <span className="bg-oxidized-copper text-kinigi-mist text-[10px] font-mono tracking-wider uppercase px-3 py-1 font-semibold rounded-xs shadow-sm">
                        Subscribe & Save 15%
                      </span>
                    )}
                  </div>

                  {product.betaGlucans && (
                    <div className="absolute bottom-4 left-4 z-10 bg-volcanic-deep/85 backdrop-blur-xs text-kinigi-mist text-xs font-mono tracking-wide px-3 py-1.5 rounded-xs border border-white/10 shadow-md">
                      {product.betaGlucans}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Thumbnail Row Below */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
              {galleryItems.map((item, idx) => {
                const isSelected = activeMediaIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveMediaIndex(idx)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden rounded-xs border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-oxidized-copper ring-2 ring-oxidized-copper/30 shadow-md scale-[1.02]'
                        : 'border-volcanic-ash/20 opacity-70 hover:opacity-100 hover:border-volcanic-ash/40'
                    }`}
                  >
                    <img
                      src={item.type === 'video' ? item.poster : item.url}
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />

                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-volcanic-ash/40 flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-oxidized-copper text-white flex items-center justify-center shadow-sm">
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-0 inset-x-0 bg-volcanic-deep/70 text-[9px] font-mono text-kinigi-mist text-center py-0.5 truncate px-1">
                      {item.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===================== RIGHT: 45% Purchase Box ===================== */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-oxidized-copper font-semibold">
                  {product.category === 'functional'
                    ? 'Apothecary Dual-Extract'
                    : product.category === 'cacao'
                    ? 'Ceremonial Dark Cacao'
                    : 'Kinigi Culinary Harvest'}
                </span>

                {product.betaGlucans && (
                  <span className="bg-verdigris-bamboo text-kinigi-mist font-mono text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3" />
                    <span>{product.betaGlucans}</span>
                  </span>
                )}
              </div>

              {/* H1: Product Name */}
              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-volcanic-ash tracking-tight leading-[1.15]">
                {product.name}
              </h1>

              {/* Species in italic with Kinyarwanda name */}
              <div className="mt-2 space-y-0.5">
                <p className="font-sans italic text-sm text-volcanic-ash/70">
                  {product.speciesLatin || product.species}
                </p>
                {product.nameRw && (
                  <p className="font-sans text-xs text-volcanic-ash/60">
                    <span className="font-medium text-volcanic-ash/80">Kinyarwanda:</span> {product.nameRw}
                  </p>
                )}
              </div>
            </div>

            {/* Price in DM Mono, text-2xl, copper color */}
            <div className="pt-2 border-t border-volcanic-ash/15 flex items-baseline gap-3">
              <span className="font-mono text-3xl font-bold text-oxidized-copper">
                {formatPrice(effectiveUnitPrice, effectiveUnitPriceUSD)}
              </span>

              {isSubscription && (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-volcanic-ash/50 line-through">
                    {formatPrice(product.priceRWF, product.priceUSD)}
                  </span>
                  <span className="text-[11px] font-mono bg-oxidized-copper/15 text-oxidized-copper font-semibold px-2 py-0.5 rounded-xs">
                    Save 15%
                  </span>
                </div>
              )}
            </div>

            {/* Weight & Format Description */}
            <div className="space-y-2">
              <div className="font-mono text-xs text-volcanic-ash/80 tracking-wide flex items-center gap-2">
                <span className="text-volcanic-ash/40">Standard Format:</span>
                <span className="font-semibold text-volcanic-ash">{product.weight}</span>
              </div>
              <p className="font-sans text-sm text-volcanic-ash/80 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Format Selector (if multiple formats) */}
            {product.formats && product.formats.length > 1 && (
              <div className="space-y-2.5 pt-2">
                <label className="block font-mono text-xs uppercase tracking-wider text-volcanic-ash/70">
                  Select Botanical Format:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {product.formats.map((fmt) => {
                    const isSelected = selectedFormat === fmt;
                    return (
                      <button
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`p-3 text-left border rounded-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-oxidized-copper bg-volcanic-ash text-kinigi-mist shadow-sm ring-1 ring-oxidized-copper'
                            : 'border-volcanic-ash/20 bg-kinigi-paper text-volcanic-ash hover:border-volcanic-ash/40'
                        }`}
                      >
                        <div className="font-mono text-xs font-semibold">{fmt}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            isSelected ? 'text-kinigi-mist/70' : 'text-volcanic-ash/60'
                          }`}
                        >
                          Kinigi Formulation
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Purchase Type Radio Cards (if subscribable) */}
            {product.isSubscribable && (
              <div className="space-y-3 pt-2">
                <label className="block font-mono text-xs uppercase tracking-wider text-volcanic-ash/70">
                  Purchase Type:
                </label>

                {/* Option 1: One-Time Purchase */}
                <button
                  type="button"
                  onClick={() => setPurchaseType('onetime')}
                  className={`w-full p-4 border rounded-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                    purchaseType === 'onetime'
                      ? 'border-volcanic-ash bg-kinigi-mist/60 ring-1 ring-volcanic-ash'
                      : 'border-volcanic-ash/20 bg-kinigi-paper hover:border-volcanic-ash/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        purchaseType === 'onetime'
                          ? 'border-volcanic-ash bg-volcanic-ash text-white'
                          : 'border-volcanic-ash/40'
                      }`}
                    >
                      {purchaseType === 'onetime' && <div className="w-1.5 h-1.5 rounded-full bg-kinigi-mist" />}
                    </div>
                    <div>
                      <div className="font-serif text-sm font-bold text-volcanic-ash">
                        One-Time Purchase
                      </div>
                      <div className="font-mono text-xs text-volcanic-ash/60">
                        Single apothecary dispatch
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-bold text-sm text-volcanic-ash">
                    {formatPrice(product.priceRWF, product.priceUSD)}
                  </div>
                </button>

                {/* Option 2: Subscribe & Save 15% + Free Copper Scoop */}
                <button
                  type="button"
                  onClick={() => setPurchaseType('subscription')}
                  className={`w-full p-4 border-2 rounded-xs text-left transition-all cursor-pointer relative ${
                    purchaseType === 'subscription'
                      ? 'border-oxidized-copper bg-kinigi-paper shadow-sm'
                      : 'border-oxidized-copper/40 bg-kinigi-paper/60 hover:border-oxidized-copper'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                          purchaseType === 'subscription'
                            ? 'border-oxidized-copper bg-oxidized-copper text-white'
                            : 'border-volcanic-ash/40'
                        }`}
                      >
                        {purchaseType === 'subscription' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <div className="font-serif text-sm font-bold text-volcanic-ash flex items-center gap-2">
                          <span>Subscribe & Save 15%</span>
                          <span className="bg-oxidized-copper text-white text-[9px] font-mono px-2 py-0.5 rounded-xs tracking-wider uppercase font-semibold">
                            + Free Copper Scoop
                          </span>
                        </div>
                        <div className="font-mono text-xs text-volcanic-ash/70 mt-1">
                          Auto-delivered monthly · Cancel or pause anytime in 1 click
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-sm text-oxidized-copper whitespace-nowrap">
                      {formatPrice(Math.round(product.priceRWF * 0.85), product.priceUSD ? +(product.priceUSD * 0.85).toFixed(2) : undefined)}
                    </div>
                  </div>

                  {/* Monthly delivery note */}
                  <div className="mt-3 pt-2.5 border-t border-volcanic-ash/10 text-[11px] font-sans text-volcanic-ash/70 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-oxidized-copper shrink-0" />
                    <span>Includes complimentary brushed copper 2g dosing scoop with your 1st delivery.</span>
                  </div>
                </button>
              </div>
            )}

            {/* Quantity Stepper & CTA Row */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                {/* Quantity Stepper in Volcanic Ash */}
                <div className="flex items-center border border-volcanic-ash/30 rounded-xs bg-kinigi-paper">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-11 h-12 flex items-center justify-center text-volcanic-ash hover:bg-volcanic-ash/10 transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-mono text-base font-bold text-volcanic-ash">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-11 h-12 flex items-center justify-center text-volcanic-ash hover:bg-volcanic-ash/10 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtotal preview */}
                <div className="text-right ml-auto font-mono text-xs text-volcanic-ash/60">
                  Total:{' '}
                  <span className="font-bold text-sm text-volcanic-ash">
                    {formatPrice(effectiveUnitPrice * quantity, effectiveUnitPriceUSD * quantity)}
                  </span>
                </div>
              </div>

              {/* Full-width "ADD TO APOTHECARY BAG" CTA */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-oxidized-copper hover:brightness-110 active:scale-[0.99] text-white font-mono text-sm tracking-widest uppercase font-semibold transition-all duration-200 shadow-md flex items-center justify-center gap-3 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-white" />
                <span>Add to Apothecary Bag</span>
                <span>·</span>
                <span>{formatPrice(effectiveUnitPrice * quantity, effectiveUnitPriceUSD * quantity)}</span>
              </button>
            </div>

            {/* Quick Info Below CTA: Shipping Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-volcanic-ash/15">
              <div className="flex items-center gap-2.5 p-2.5 bg-kinigi-mist/40 border border-volcanic-ash/10 rounded-xs">
                <Truck className="w-4 h-4 text-oxidized-copper shrink-0" />
                <span className="text-[11px] font-mono text-volcanic-ash/80 leading-tight">
                  Same-Day Kigali Dispatch
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 bg-kinigi-mist/40 border border-volcanic-ash/10 rounded-xs">
                <Globe className="w-4 h-4 text-verdigris-bamboo shrink-0" />
                <span className="text-[11px] font-mono text-volcanic-ash/80 leading-tight">
                  DHL International to 140+
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 bg-kinigi-mist/40 border border-volcanic-ash/10 rounded-xs">
                <ShieldCheck className="w-4 h-4 text-spore-gold shrink-0" />
                <span className="text-[11px] font-mono text-volcanic-ash/80 leading-tight">
                  Lab Tested &gt;30% Beta-Glucans
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ACCORDION TABS SECTION
          4 Expandable Sections:
          1. Active Compounds & Beta-Glucans
          2. How to Prepare / Dosing Ritual
          3. Rwandan Highland Origin
          4. Batch COA Certificate
      ========================================================================= */}
      <section className="border-t border-volcanic-ash/15 bg-kinigi-mist/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-mono text-xs uppercase tracking-widest text-oxidized-copper font-semibold block mb-2">
              Botanical Verification & Ritual Integrity
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-volcanic-ash">
              Formulation Specifications
            </h2>
          </div>

          <div className="bg-kinigi-paper border border-volcanic-ash/15 p-6 sm:p-8 shadow-sm">
            {/* 1. Active Compounds & Beta-Glucans */}
            <AccordionItem
              title="Active Compounds & Beta-Glucans"
              isOpen={openAccordions.compounds}
              onToggle={() => toggleAccordion('compounds')}
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-kinigi-mist/40 border border-volcanic-ash/10 rounded-xs">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-oxidized-copper block mb-1">
                      Key Bioactive Compounds
                    </span>
                    <p className="font-mono text-xs font-semibold text-volcanic-ash">
                      {compoundsInfo.keyMolecules}
                    </p>
                  </div>

                  <div className="p-4 bg-kinigi-mist/40 border border-volcanic-ash/10 rounded-xs">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-verdigris-bamboo block mb-1">
                      Extraction Specification
                    </span>
                    <p className="font-sans text-xs text-volcanic-ash/80">
                      {compoundsInfo.method}
                    </p>
                  </div>
                </div>

                <p className="font-sans text-sm text-volcanic-ash/80 leading-relaxed">
                  {compoundsInfo.summary}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-volcanic-ash/70">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-verdigris-bamboo" />
                    100% Fruiting Bodies
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-verdigris-bamboo" />
                    &lt;2% Alpha-Glucan Starch
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-verdigris-bamboo" />
                    Zero Grain Fillers
                  </span>
                </div>
              </div>
            </AccordionItem>

            {/* 2. How to Prepare / Dosing Ritual */}
            <AccordionItem
              title="How to Prepare / Dosing Ritual"
              isOpen={openAccordions.ritual}
              onToggle={() => toggleAccordion('ritual')}
            >
              <div className="space-y-3 font-sans text-sm leading-relaxed text-volcanic-ash/85">
                {getDosingContent()}
              </div>
            </AccordionItem>

            {/* 3. Rwandan Highland Origin */}
            <AccordionItem
              title="Rwandan Highland Origin"
              isOpen={openAccordions.origin}
              onToggle={() => toggleAccordion('origin')}
            >
              <div className="space-y-3 font-sans text-sm text-volcanic-ash/80 leading-relaxed">
                <p>
                  <strong>The Kinigi Sanctuary (2,400m Altitude):</strong> Cultivated under the permanent mist
                  of the Virunga Volcanoes, within sight of Mount Karisimbi and Mount Sabyinyo in Musanze District,
                  Northern Province, Rwanda.
                </p>
                <p>
                  <strong>Volcanic Basalt Substrate:</strong> Grown on locally composted highland hardwood sawdust,
                  bamboo shavings, and mineral-saturated volcanic basalt ash. Zero artificial heating or air conditioning —
                  the cool alpine cloud forest supplies ideal fruiting humidity and high oxygenation.
                </p>
                <p>
                  <strong>Cooperative Stewardship:</strong> 100% hand-harvested at dawn by local women-led farmer
                  cooperatives in Musanze, earning dignified living wages and sustainable agroforestry training.
                </p>
              </div>
            </AccordionItem>

            {/* 4. Batch COA Certificate */}
            <AccordionItem
              title="Batch COA Certificate"
              isOpen={openAccordions.coa}
              onToggle={() => toggleAccordion('coa')}
            >
              <div className="space-y-4">
                <div className="p-4 bg-volcanic-ash text-kinigi-mist rounded-xs font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-kinigi-mist/20 pb-2">
                    <span className="text-spore-gold uppercase tracking-wider font-semibold">
                      Sample Batch #
                    </span>
                    <span className="text-white font-bold">
                      VNG-2026-{product.slug.toUpperCase().slice(0, 4)}-08
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-kinigi-mist/80">
                    <div>Origin: Kinigi, Musanze (2,400m)</div>
                    <div>Species Verification: 100% Passed (NMR)</div>
                    <div>Beta-Glucan Assay: {product.betaGlucans || '>30% Verified'}</div>
                    <div>Heavy Metals (Pb, As, Cd): Pass &lt;0.01 ppm</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="font-sans text-xs text-volcanic-ash/70">
                    Complete multi-spectral Certificates of Analysis available for every production run.
                  </p>
                  <Link
                    to="/science"
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-oxidized-copper hover:underline font-semibold shrink-0"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>View Science &amp; COA Hub →</span>
                  </Link>
                </div>
              </div>
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* =========================================================================
          RELATED PRODUCTS SECTION
          "Complete Your Ritual"
          Horizontal scrollable row of 4 related product cards
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-10 pb-4 border-b border-volcanic-ash/15">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-oxidized-copper font-semibold block mb-1">
              Synergistic Formulations
            </span>
            <h2 className="font-serif text-3xl font-bold text-volcanic-ash">
              Complete Your Ritual
            </h2>
          </div>
          <p className="font-sans text-xs text-volcanic-ash/60 mt-2 sm:mt-0 max-w-sm">
            Hand-harvested from the same volcanic soils of Kinigi to complement your daily practice.
          </p>
        </div>

        {/* 4 Related Cards Grid / Scrollable Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relProduct) => {
            const isHovered = hoveredRelatedId === relProduct.id;

            return (
              <div
                key={relProduct.id}
                onMouseEnter={() => setHoveredRelatedId(relProduct.id)}
                onMouseLeave={() => setHoveredRelatedId(null)}
                className="group bg-kinigi-paper border border-volcanic-ash/15 flex flex-col justify-between overflow-hidden transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:border-volcanic-ash/30"
              >
                <Link to={`/shop/${relProduct.slug}`} className="flex flex-col flex-1 block">
                  {/* 4:5 Aspect Container with crossfade */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-kinigi-mist/40">
                    <motion.img
                      src={relProduct.image}
                      alt={relProduct.name}
                      animate={{ opacity: isHovered ? 0 : 1 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    <motion.img
                      src={relProduct.hoverImage || relProduct.image}
                      alt={`${relProduct.name} alternate view`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {relProduct.isFresh && (
                      <div className="absolute top-2.5 left-2.5 z-10 bg-verdigris-bamboo text-kinigi-mist text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-xs font-semibold">
                        Fresh
                      </div>
                    )}

                    {relProduct.isSubscribable && (
                      <div className="absolute top-2.5 right-2.5 z-10 bg-oxidized-copper text-kinigi-mist text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-xs font-semibold">
                        Sub -15%
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-serif font-bold uppercase tracking-wider text-sm text-volcanic-ash group-hover:text-oxidized-copper transition-colors line-clamp-1">
                      {relProduct.name}
                    </h3>
                    <p className="font-sans italic text-volcanic-ash/60 text-xs mt-0.5 line-clamp-1">
                      {relProduct.speciesLatin || relProduct.species}
                    </p>
                    <div className="font-mono text-[11px] text-volcanic-ash/70 mt-1 line-clamp-1">
                      {relProduct.weight}
                    </div>

                    <div className="mt-auto pt-3 border-t border-volcanic-ash/10 flex items-baseline justify-between font-mono">
                      <span className="font-bold text-sm text-volcanic-ash">
                        {formatPrice(relProduct.priceRWF, relProduct.priceUSD)}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="px-4 pb-4 pt-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(relProduct, 1);
                      openCart();
                    }}
                    className="w-full py-2.5 bg-oxidized-copper hover:brightness-110 active:scale-[0.99] text-white font-mono text-[11px] uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3 text-white" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
