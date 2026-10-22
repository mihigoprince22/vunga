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

  const handleClose = () => {
    closeQuiz();
    setStep(1);
    setSelectedGoal('focus');
    setSelectedTiming('morning');
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setStep((prev) => Math.min(3, prev + 1));
  };

  const handleBack = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleReset = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setStep(1);
    setSelectedGoal('focus');
    setSelectedTiming('morning');
  };

  // Helper to find product safely by slug with fallback
  const findProd = (slug: string): Product => {
    return products.find((p) => p.slug === slug) || products[0];
  };

  // Dynamic stack recommendation based on user selections
  const getPersonalizedStack = (): {
    title: string;
    rationale: string;
    items: {
      product: Product;
      dosageNote: string;
      format: string;
      timingBadge: string;
    }[];
  } => {
    switch (selectedGoal) {
      case 'focus':
        return {
          title: "The Neuro-Genesis & Clarity Protocol",
          rationale:
            "Synergizes high-altitude Hericium erinaceus with adaptogenic mushroom triterpenes to stimulate NGF synthesis and sustain laser focus.",
          items: [
            {
              product: findProd('lions-mane-focus'),
              dosageNote: '1 scoop daily whisked into morning Rwandan Arabica coffee',
              format: 'Powder 60g',
              timingBadge: 'MORNING COFFEE',
            },
            {
              product: findProd('cordyceps-energy-cacao'),
              dosageNote: '2 dark cacao squares at 2 PM for sustained cellular ATP output',
              format: '12 Ritual Squares',
              timingBadge: 'MIDDAY STAMINA',
            },
            {
              product: findProd('highland-reishi-calm'),
              dosageNote: 'Evening dose dissolved in hot chamomile or warm oat milk',
              format: 'Dual-Extract Pouch 60g',
              timingBadge: 'TWILIGHT REST',
            },
          ],
        };

      case 'calm':
        return {
          title: 'The Deep Nervous System Reset & Sleep Sanctuary Protocol',
          rationale:
            'Calibrates GABA-A neural pathways using volcanic red reishi triterpenes and ganoderic acids to soothe cortisol and deepen slow-wave sleep.',
          items: [
            {
              product: findProd('highland-reishi-calm'),
              dosageNote: '1 level scoop in warm oat milk 45 minutes before bedtime',
              format: 'Dual-Extract Pouch 60g',
              timingBadge: 'EVENING TWILIGHT',
            },
            {
              product: findProd('virunga-5-defenders'),
              dosageNote: 'Morning immunity shield to protect autonomic cellular function',
              format: 'Extract Powder 60g',
              timingBadge: 'MORNING FORTIFY',
            },
            {
              product: findProd('lions-mane-focus'),
              dosageNote: 'Gentle morning dose to promote balanced calm mental clarity',
              format: 'Capsules 90ct',
              timingBadge: 'DAYTIME BALANCE',
            },
          ],
        };

      case 'immunity':
        return {
          title: 'The 5-Species Volcanic Bio-Defense Fortress',
          rationale:
            'Combines five mature fungal fruiting bodies exceeding 30% beta-D-glucans to prime natural killer (NK) cells and systemic mucosal defenses.',
          items: [
            {
              product: findProd('virunga-5-defenders'),
              dosageNote: '1 rounded scoop daily mixed with morning tea or citrus elixir',
              format: 'Extract Powder 60g',
              timingBadge: 'DAILY DEFENSE',
            },
            {
              product: findProd('highland-reishi-calm'),
              dosageNote: 'Evening tonic to support deep regenerative cellular recovery',
              format: 'Dual-Extract Pouch 60g',
              timingBadge: 'EVENING SHIELD',
            },
            {
              product: findProd('cordyceps-energy-cacao'),
              dosageNote: 'Afternoon antioxidant boost with artisanal dark Rwandan cacao',
              format: '12 Ritual Squares',
              timingBadge: 'AFTERNOON VITALITY',
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
              timingBadge: 'MORNING ENERGY',
            },
            {
              product: findProd('lions-mane-focus'),
              dosageNote: '1 copper scoop daily to maintain cerebral micro-circulation',
              format: 'Powder 60g',
              timingBadge: 'AFTERNOON FOCUS',
            },
            {
              product: findProd('highland-reishi-calm'),
              dosageNote: 'Evening dose to restore glycogen and lower cortisol',
              format: 'Dual-Extract Pouch 60g',
              timingBadge: 'EVENING RECOVERY',
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
              timingBadge: 'MORNING HARVEST',
            },
            {
              product: findProd('highland-king-trumpet'),
              dosageNote: 'Crosshatch thick cylindrical stems and baste with brown butter and garlic',
              format: "Chef's Reserve Box 500g",
              timingBadge: 'AFTERNOON PAN-SEAR',
            },
            {
              product: findProd('virunga-oak-shiitake'),
              dosageNote: 'Deep umami base for highland risottos, ramen broths, or reduction glazes',
              format: 'Fresh 250g',
              timingBadge: 'EVENING BROTH',
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
    handleClose();
    openCart();
  };

  return (
    <AnimatePresence>
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Separate Backdrop Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Foreground Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-50 w-full max-w-xl rounded-3xl bg-[#1C1F1E] text-[#EAE8E1] p-8 border border-[#B86B43]/40 shadow-2xl flex flex-col my-auto max-h-[92vh] overflow-hidden"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar: Progress Indicator & Close Button */}
            <div className="pb-4 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs uppercase tracking-widest text-[#D4AF6A] font-bold">
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
                onClick={handleClose}
                aria-label="Close matcher quiz"
                className="p-1.5 text-[#EAE8E1]/70 hover:text-white transition-colors focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Body with STRICT CONDITIONAL RENDERING - No overlapping absolute layers, no ghost exit animations */}
            <div className="py-6 overflow-y-auto flex-1">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <span className="font-sans text-[11px] uppercase tracking-widest text-[#B86B43] font-semibold block mb-1">
                      Primary Intention
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#EAE8E1] mb-1">
                      What&apos;s Your Primary Goal?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#EAE8E1]/75 font-sans">
                      Choose the primary physiological or culinary outcome you want to activate.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {GOALS.map((g) => {
                      const Icon = g.icon;
                      const isSelected = selectedGoal === g.id;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setSelectedGoal(g.id)}
                          className={`w-full p-4 sm:p-5 text-left rounded-2xl flex items-center gap-4 transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'border border-[#B86B43] bg-[#333835] shadow-lg ring-1 ring-[#B86B43]'
                              : 'bg-[#262A28] hover:bg-[#303532] text-[#EAE8E1] border border-[#EAE8E1]/15 hover:border-[#B86B43]'
                          }`}
                        >
                          <div
                            className={`p-3 rounded-xl border shrink-0 ${
                              isSelected
                                ? 'border-[#D4AF6A] bg-[#D4AF6A]/20 text-[#D4AF6A]'
                                : 'border-white/10 bg-black/40 text-[#EAE8E1]/80'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-serif font-bold text-base text-[#EAE8E1]">
                              {g.title}
                            </div>
                            <div className="font-sans text-xs text-[#EAE8E1]/75 mt-1 leading-snug">
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
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <span className="font-sans text-[11px] uppercase tracking-widest text-[#B86B43] font-semibold block mb-1">
                      Circadian Timing
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#EAE8E1] mb-1">
                      When Do You Want to Add VŪNGA?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#EAE8E1]/75 font-sans">
                      Select the daily habit where this ritual fits most naturally.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {TIMINGS.map((t) => {
                      const Icon = t.icon;
                      const isSelected = selectedTiming === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedTiming(t.id)}
                          className={`w-full p-4 sm:p-5 text-left rounded-2xl flex items-center gap-4 transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'border border-[#B86B43] bg-[#333835] shadow-lg ring-1 ring-[#B86B43]'
                              : 'bg-[#262A28] hover:bg-[#303532] text-[#EAE8E1] border border-[#EAE8E1]/15 hover:border-[#B86B43]'
                          }`}
                        >
                          <div
                            className={`p-3 rounded-xl border shrink-0 ${
                              isSelected
                                ? 'border-[#D4AF6A] bg-[#D4AF6A]/20 text-[#D4AF6A]'
                                : 'border-white/10 bg-black/40 text-[#EAE8E1]/80'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-serif font-bold text-base text-[#EAE8E1]">
                              {t.title}
                            </div>
                            <div className="font-sans text-xs text-[#EAE8E1]/75 mt-1 leading-snug">
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
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF6A]/15 border border-[#D4AF6A]/30 text-[#D4AF6A] font-sans text-xs uppercase tracking-wider mb-2 font-semibold">
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

                  {/* Recommended Product Cards (3 concrete items) */}
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {stack.items.map((item, idx) => (
                      <div
                        key={item.product.id || idx}
                        className="p-3.5 bg-[#1C1E1D] border border-white/10 rounded-xl flex gap-3.5 items-center group hover:border-[#B86B43]/50 transition-all shadow-md"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-black/40 overflow-hidden shrink-0 border border-white/10 aspect-square">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="font-serif font-bold text-sm sm:text-base text-white truncate">
                              {item.product.name}
                            </h4>
                            <span className="font-sans text-xs font-bold text-[#D4AF6A] shrink-0">
                              {formatPrice(item.product.priceRWF, item.product.priceUSD)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded-full bg-[#B86B43]/20 border border-[#B86B43]/40 text-[#D4AF6A] text-[10px] font-sans font-semibold uppercase tracking-wider">
                              {item.timingBadge}
                            </span>
                            <span className="font-sans text-[11px] text-[#EAE8E1]/60">
                              {item.format}
                            </span>
                          </div>

                          <p className="font-sans text-xs text-[#EAE8E1]/80 mt-1 leading-snug line-clamp-2">
                            {item.dosageNote}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Free Scoop + 15% Stack Savings Perk Bar */}
                  <div className="p-3.5 bg-[#B86B43]/15 border border-[#B86B43]/40 rounded-xl text-xs font-sans text-[#EAE8E1] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src="/assets/16_cutout-03-copper-dosing-scoop.png"
                        alt="Free Copper Scoop"
                        className="w-7 h-7 object-contain shrink-0 drop-shadow-md"
                      />
                      <span className="truncate">
                        Includes <strong>15% Stack Savings</strong> + <strong>Free Brushed Copper 2g Dosing Scoop</strong>
                      </span>
                    </div>
                    <Check className="w-4 h-4 text-[#D4AF6A] shrink-0" />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Navigation Controls */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 shrink-0">
              {step > 1 && step < 3 && (
                <button
                  type="button"
                  onClick={(e) => handleBack(e)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 font-sans text-xs uppercase tracking-wider text-[#EAE8E1]/70 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}

              {step === 1 && (
                <div className="font-sans text-[11px] text-[#D4AF6A]/80 uppercase tracking-widest font-medium">
                  CULTIVATED AT 2,400M &bull; KINIGI, MUSANZE &mdash; RWANDA
                </div>
              )}

              {step === 3 && (
                <button
                  type="button"
                  onClick={(e) => handleReset(e)}
                  className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#EAE8E1]/70 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              )}

              {step === 1 && (
                <button
                  type="button"
                  onClick={(e) => handleNext(e)}
                  className="ml-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B86B43] hover:bg-[#a35b36] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Continue to Routine</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 2 && (
                <button
                  type="button"
                  onClick={(e) => handleNext(e)}
                  className="ml-auto inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#B86B43] hover:bg-[#a35b36] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF6A]" />
                  <span>Reveal My Stack</span>
                </button>
              )}

              {step === 3 && (
                <button
                  type="button"
                  onClick={handleAddStackToBag}
                  className="ml-auto inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#B86B43] hover:bg-[#a35b36] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-lg shadow-[#B86B43]/30 active:scale-95 cursor-pointer"
                >
                  <span>ADD RECOMMENDED STACK TO BAG (SAVE 15%)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
