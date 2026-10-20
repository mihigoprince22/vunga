import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Brain,
  Moon,
  Shield,
  Zap,
  ChefHat,
  Coffee,
  CupSoda,
  Candy,
  UtensilsCrossed,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useVunga } from '../context/VungaContext';
import { products } from '../data/products';
import type { Product } from '../data/products';

interface GoalOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TimingOption {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface RecommendedProductItem {
  product: Product;
  dosageNote: string;
  format: string;
}

const GOALS: GoalOption[] = [
  {
    id: 'focus',
    title: 'Focus & Mental Clarity',
    subtitle: 'Neurogenesis, memory consolidation & sustained flow state',
    icon: Brain,
  },
  {
    id: 'calm',
    title: 'Calm & Deep Sleep',
    subtitle: 'Nervous system down-regulation & restorative REM sleep',
    icon: Moon,
  },
  {
    id: 'immunity',
    title: 'Immunity & Protection',
    subtitle: 'Beta-glucan cellular shield & year-round resilience',
    icon: Shield,
  },
  {
    id: 'energy',
    title: 'Energy & Stamina',
    subtitle: 'Cellular ATP production without caffeine jitters or crashes',
    icon: Zap,
  },
  {
    id: 'culinary',
    title: 'Culinary Cooking',
    subtitle: 'Gourmet forest mushrooms freshly harvested in Kinigi',
    icon: ChefHat,
  },
];

const TIMINGS: TimingOption[] = [
  {
    id: 'morning',
    title: 'Morning Coffee Ritual',
    subtitle: 'Stirred seamlessly into Rwandan single-origin coffee or espresso',
    icon: Coffee,
  },
  {
    id: 'evening',
    title: 'Evening Herbal Tea',
    subtitle: 'Steeped before twilight to unwind from cognitive stress',
    icon: CupSoda,
  },
  {
    id: 'onthego',
    title: 'On-the-Go Cacao',
    subtitle: 'Whisked with hot spring water or oat milk during afternoon lull',
    icon: Candy,
  },
  {
    id: 'kitchen',
    title: 'Home Kitchen',
    subtitle: 'Pan-seared in grass-fed butter, garlic, and highland sea salt',
    icon: UtensilsCrossed,
  },
];

const QuizModal: React.FC = () => {
  const { isQuizOpen, closeQuiz, addToCart, openCart, formatPrice } = useVunga();

  const [step, setStep] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>('focus');
  const [selectedTiming, setSelectedTiming] = useState<string>('morning');
  const [direction, setDirection] = useState<number>(1);

  const handleNext = () => {
    setDirection(1);
    setStep((prev) => Math.min(3, prev + 1));
  };

  const handleBack = () => {
    setDirection(-1);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleReset = () => {
    setDirection(-1);
    setStep(1);
    setSelectedGoal('focus');
    setSelectedTiming('morning');
  };

  // Helper to find product safely by slug
  const findProd = (slug: string): Product => {
    return products.find((p) => p.slug === slug) || products[0];
  };

  // Dynamic stack recommendation based on user selections
  const getPersonalizedStack = (): {
    title: string;
    rationale: string;
    items: RecommendedProductItem[];
  } => {
    switch (selectedGoal) {
      case 'focus':
        return {
          title:
            selectedTiming === 'morning'
              ? 'The Kinigi Deep Focus & Morning Coffee Protocol'
              : 'The Highland Cognitive Flow Protocol',
          rationale:
            'Engineered to stimulate Nerve Growth Factor (NGF) and elevate cerebral oxygen uptake for sustained, jitter-free mental clarity all day.',
          items: [
            {
              product: findProd('lions-mane-focus'),
              dosageNote: '1 copper scoop (2000mg) in morning coffee or espresso',
              format: 'Powder 60g',
            },
            {
              product: findProd('cordyceps-energy-cacao'),
              dosageNote: '2 ritual squares for clean mid-morning sustained flow',
              format: '12 Ritual Squares',
            },
            {
              product: findProd('highland-king-trumpet'),
              dosageNote: 'Rich in L-ergothioneine; sear with garlic butter for lunch',
              format: "Chef's Reserve Box 500g",
            },
          ],
        };

      case 'calm':
        return {
          title:
            selectedTiming === 'evening'
              ? 'The Highland Restorative Sleep & Night Tonic Protocol'
              : 'The Kinigi Adrenal Down-Regulation Stack',
          rationale:
            'Rich in bioactive triterpenes and ganoderic acids that bind to GABA receptors, calming the sympathetic nervous system for deep restorative REM sleep.',
          items: [
            {
              product: findProd('highland-reishi-calm'),
              dosageNote: '1 level scoop (2000mg) in warm oat milk 45 min before sleep',
              format: 'Dual-Extract Pouch 60g',
            },
            {
              product: findProd('virunga-5-defenders'),
              dosageNote: '2 capsules daily to fortify immune defense while sleeping',
              format: 'Capsules 90ct',
            },
            {
              product: findProd('virunga-oak-shiitake'),
              dosageNote: 'Simmer caps into a restorative evening mineral broth',
              format: 'Sun-Dried Donko Caps 100g',
            },
          ],
        };

      case 'immunity':
        return {
          title: 'The Virunga Elemental Fortress & Daily Defense Stack',
          rationale:
            'A synergistic 5-species beta-glucan matrix that primes macrophage phagocytosis and fortifies your mucosal respiratory shield.',
          items: [
            {
              product: findProd('virunga-5-defenders'),
              dosageNote: '1 level scoop or 3 capsules each morning with spring water',
              format: 'Extract Powder 60g',
            },
            {
              product: findProd('highland-reishi-calm'),
              dosageNote: 'Evening adaptogenic dose to accelerate white blood cell regeneration',
              format: 'Dual-Extract Pouch 60g',
            },
            {
              product: findProd('kinigi-pearl-oyster'),
              dosageNote: 'Fresh culinary sauté providing high natural dietary beta-glucans',
              format: 'Fresh Punnet 500g',
            },
          ],
        };

      case 'energy':
        return {
          title: 'The High-Altitude Cellular Vitality & Cacao Protocol',
          rationale:
            'Pairs bioactive cordycepin with single-estate 75% dark chocolate to maximize cellular ATP phosphorylation without adrenal burn-out.',
          items: [
            {
              product: findProd('cordyceps-energy-cacao'),
              dosageNote: '2 ritual squares 30 minutes before physical training or deep work',
              format: '12 Ritual Squares',
            },
            {
              product: findProd('lions-mane-focus'),
              dosageNote: '1 copper scoop daily to maintain cerebral micro-circulation',
              format: 'Powder 60g',
            },
            {
              product: findProd('kinigi-golden-oyster'),
              dosageNote: 'Vibrant pan-seared clusters rich in essential branched-chain amino acids',
              format: 'Fresh Bouquet 400g',
            },
          ],
        };

      case 'culinary':
      default:
        return {
          title: "The Chef's Forest Forager & Fresh Highland Kitchen Reserve",
          rationale:
            'Hand-selected at dawn inside our Kinigi volcanic mist chambers to deliver transcendent umami, velvety textures, and restaurant-grade quality.',
          items: [
            {
              product: findProd('kinigi-pearl-oyster'),
              dosageNote: 'Flash-sear over high heat with salted butter and rosemary for 4 minutes',
              format: 'Fresh Punnet 500g',
            },
            {
              product: findProd('highland-king-trumpet'),
              dosageNote: 'Crosshatch thick cylindrical stems and baste with brown butter and garlic',
              format: "Chef's Reserve Box 500g",
            },
            {
              product: findProd('virunga-oak-shiitake'),
              dosageNote: 'Deep umami base for highland risottos, ramen broths, or reduction glazes',
              format: 'Fresh 250g',
            },
          ],
        };
    }
  };

  const stack = getPersonalizedStack();

  const handleAddStackToBag = () => {
    stack.items.forEach((item) => {
      addToCart(item.product, 1, item.format, true);
    });
    closeQuiz();
    openCart();
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 40 : -40,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence>
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuiz}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#141515] border border-[#B86B43]/40 shadow-2xl rounded-xl text-[#EAE8E1] overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Bar: Progress Indicator & Close Button */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/50 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF6A] font-bold">
                  {step === 1 && 'Step 1 of 2: Intention'}
                  {step === 2 && 'Step 2 of 2: Daily Routine'}
                  {step === 3 && 'Your Personalized Stack'}
                </span>

                {step <= 2 && (
                  <div className="flex items-center gap-1.5">
                    {[1, 2].map((s) => (
                      <div
                        key={s}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          s === step
                            ? 'w-6 bg-[#B86B43]'
                            : s < step
                            ? 'w-3 bg-[#D4AF6A]'
                            : 'w-3 bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={closeQuiz}
                aria-label="Close matcher quiz"
                className="p-1.5 text-[#EAE8E1]/70 hover:text-white transition-colors focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex flex-col justify-between flex-1">
              <AnimatePresence mode="wait" custom={direction}>
                {/* STEP 1: Intention */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#B86B43] font-semibold block mb-1">
                        Primary Intention
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#EAE8E1] mb-1">
                        What&apos;s Your Primary Goal?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#EAE8E1]/70 font-sans">
                        Choose the primary physiological or culinary outcome you want to activate.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      {GOALS.map((g) => {
                        const Icon = g.icon;
                        const isSelected = selectedGoal === g.id;
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => setSelectedGoal(g.id)}
                            className={`w-full p-3.5 text-left border rounded-lg flex items-center gap-3.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#B86B43] bg-[#B86B43]/20 shadow-md ring-1 ring-[#B86B43]'
                                : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                            }`}
                          >
                            <div
                              className={`p-2.5 rounded border shrink-0 ${
                                isSelected
                                  ? 'border-[#D4AF6A] bg-[#D4AF6A]/20 text-[#D4AF6A]'
                                  : 'border-white/10 bg-black/40 text-[#EAE8E1]/80'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-serif font-bold text-sm text-[#EAE8E1]">
                                {g.title}
                              </div>
                              <div className="font-sans text-[11px] text-[#EAE8E1]/70 truncate">
                                {g.subtitle}
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="w-5 h-5 text-[#D4AF6A] shrink-0 stroke-[2.5]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Timing / Routine */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#B86B43] font-semibold block mb-1">
                        Circadian Timing
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#EAE8E1] mb-1">
                        When Do You Want to Add VŪNGA?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#EAE8E1]/70 font-sans">
                        Select the daily habit where this ritual fits most naturally.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      {TIMINGS.map((t) => {
                        const Icon = t.icon;
                        const isSelected = selectedTiming === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTiming(t.id)}
                            className={`w-full p-3.5 text-left border rounded-lg flex items-center gap-3.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#B86B43] bg-[#B86B43]/20 shadow-md ring-1 ring-[#B86B43]'
                                : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                            }`}
                          >
                            <div
                              className={`p-2.5 rounded border shrink-0 ${
                                isSelected
                                  ? 'border-[#D4AF6A] bg-[#D4AF6A]/20 text-[#D4AF6A]'
                                  : 'border-white/10 bg-black/40 text-[#EAE8E1]/80'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-serif font-bold text-sm text-[#EAE8E1]">
                                {t.title}
                              </div>
                              <div className="font-sans text-[11px] text-[#EAE8E1]/70">
                                {t.subtitle}
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="w-5 h-5 text-[#D4AF6A] shrink-0 stroke-[2.5]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Personalized Recommendation Result */}
                {step === 3 && (
                  <motion.div
                    key="step-3-result"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#D4AF6A]/15 border border-[#D4AF6A]/30 text-[#D4AF6A] font-mono text-[10px] uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Apothecary Prescription Formulated</span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                        {stack.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#EAE8E1]/80 font-sans mt-1.5 leading-relaxed">
                        {stack.rationale}
                      </p>
                    </div>

                    {/* Recommended Product Cards (2-3 items) */}
                    <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
                      {stack.items.map((item, idx) => (
                        <div
                          key={item.product.id || idx}
                          className="p-3 bg-white/5 border border-white/10 rounded-lg flex gap-3.5 items-center group hover:border-[#B86B43]/50 transition-all"
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded bg-black/40 overflow-hidden shrink-0 border border-white/10 aspect-square">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <h4 className="font-serif font-bold text-sm text-white truncate">
                                {item.product.name}
                              </h4>
                              <span className="font-mono text-xs font-semibold text-[#D4AF6A] shrink-0">
                                {formatPrice(item.product.priceRWF, item.product.priceUSD)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-mono text-[10px] text-[#B86B43] font-medium">
                                {item.format}
                              </span>
                              {item.product.betaGlucans && (
                                <span className="text-[10px] font-mono text-[#527361]">
                                  · {item.product.betaGlucans}
                                </span>
                              )}
                            </div>
                            <p className="font-sans text-[11px] text-[#EAE8E1]/80 mt-1 leading-snug line-clamp-2">
                              {item.dosageNote}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Free Scoop + 15% Stack Savings Perk Bar */}
                    <div className="p-3 bg-[#B86B43]/15 border border-[#B86B43]/40 rounded-lg text-[11px] font-mono text-[#EAE8E1] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src="/assets/16_cutout-03-copper-dosing-scoop.png"
                          alt="Free Copper Scoop"
                          className="w-7 h-7 object-contain shrink-0 drop-shadow-md"
                        />
                        <span className="truncate">
                          Includes <strong>15% Stack Savings</strong> + <strong>Free Brushed Oxidized Copper 2g Dosing Scoop</strong>
                        </span>
                      </div>
                      <Check className="w-4 h-4 text-[#D4AF6A] shrink-0" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Navigation Controls */}
              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between gap-4 shrink-0">
                {step > 1 && step < 3 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-[#EAE8E1]/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                )}

                {step === 1 && (
                  <div className="font-mono text-[10px] text-[#EAE8E1]/50 uppercase tracking-widest">
                    Kinigi Botanical Engine · 2,400m
                  </div>
                )}

                {step === 3 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#EAE8E1]/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                )}

                {step === 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto inline-flex items-center gap-2 px-6 py-3 bg-[#B86B43] hover:bg-[#a15833] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95 cursor-pointer rounded"
                  >
                    <span>Continue to Routine</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {step === 2 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto inline-flex items-center gap-2 px-6 py-3 bg-[#B86B43] hover:bg-[#a15833] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95 cursor-pointer rounded"
                  >
                    <Sparkles className="w-4 h-4 text-[#D4AF6A]" />
                    <span>Reveal My Stack</span>
                  </button>
                )}

                {step === 3 && (
                  <button
                    type="button"
                    onClick={handleAddStackToBag}
                    className="ml-auto inline-flex items-center gap-2 px-6 py-3.5 bg-[#B86B43] hover:bg-[#a15833] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-lg shadow-[#B86B43]/30 active:scale-95 cursor-pointer rounded"
                  >
                    <span>ADD PERSONALIZED STACK TO SATCHEL</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
