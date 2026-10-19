import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Sprout,
  Leaf,
  TreePine,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  RotateCcw,
} from 'lucide-react'
import { useVunga } from '../context/VungaContext'

interface GoalOption {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
}

interface TimingOption {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
}

interface ExperienceOption {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
}

interface RecommendedItem {
  id: string
  slug: string
  name: string
  format: string
  priceRwf: number
  priceUsd: number
  image: string
  why: string
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
]

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
]

const EXPERIENCES: ExperienceOption[] = [
  {
    id: 'beginner',
    title: "I'm brand new",
    subtitle: 'First time exploring functional or culinary mycotherapy',
    icon: Sprout,
  },
  {
    id: 'intermediate',
    title: "I've tried a few",
    subtitle: 'Familiar with common mushroom powders and looking for volcanic potency',
    icon: Leaf,
  },
  {
    id: 'expert',
    title: "I'm a myco-enthusiast",
    subtitle: 'Experienced with dual extracts, standardized beta-glucans, and daily dosing stacks',
    icon: TreePine,
  },
]

const QuizModal: React.FC = () => {
  const { isQuizOpen, closeQuiz, addToCart, formatPrice } = useVunga()

  const [step, setStep] = useState<number>(1)
  const [selectedGoal, setSelectedGoal] = useState<string>('focus')
  const [selectedTiming, setSelectedTiming] = useState<string>('morning')
  const [selectedExperience, setSelectedExperience] = useState<string>('beginner')
  const [direction, setDirection] = useState<number>(1)

  const handleNext = () => {
    setDirection(1)
    setStep((prev) => Math.min(4, prev + 1))
  }

  const handleBack = () => {
    setDirection(-1)
    setStep((prev) => Math.max(1, prev - 1))
  }

  const handleReset = () => {
    setDirection(-1)
    setStep(1)
    setSelectedGoal('focus')
    setSelectedTiming('morning')
    setSelectedExperience('beginner')
  }

  // Recommendation engine logic
  const getRecommendations = (): RecommendedItem[] => {
    switch (selectedGoal) {
      case 'focus':
        return [
          {
            id: 'lions-mane-extract',
            slug: 'lions-mane-dual-extract',
            name: "Highland Lion's Mane Dual-Extract",
            format: '50g Micronized Fruiting Body',
            priceRwf: 38000,
            priceUsd: 28,
            image: '/assets/09_sku-lions-mane-ritual-4x5_4K.jpg',
            why: `Selected for your ${
              selectedTiming === 'morning' ? 'Morning Coffee Ritual' : 'daily routine'
            }: stimulates Nerve Growth Factor (NGF) for razor-sharp cognitive clarity and focus at work.`,
          },
        ]

      case 'calm':
        return [
          {
            id: 'highland-reishi-extract',
            slug: 'highland-reishi-calm',
            name: 'Highland Reishi Calm Ritual',
            format: '100ml Dual-Extract Tincture',
            priceRwf: 42000,
            priceUsd: 32,
            image: '/assets/10_sku-reishi-calm-ritual-4x5_4K.jpg',
            why: `Ideal for your ${
              selectedTiming === 'evening' ? 'Evening Herbal Tea' : 'evening ritual'
            }: rich in triterpenes and ganoderic acids that recalibrate adrenal fatigue and trigger restorative deep sleep.`,
          },
        ]

      case 'immunity':
        return [
          {
            id: 'five-defenders-immunity',
            slug: 'five-defenders-immunity-complex',
            name: '5-Defenders Immunity Complex',
            format: '60 Vegan Capsules',
            priceRwf: 45000,
            priceUsd: 34,
            image: '/assets/11_sku-five-defenders-immunity-4x5_4K.jpg',
            why: 'A potent 5-species synergistic matrix (Reishi, Chaga, Maitake, Shiitake, Turkey Tail) with >35% active beta-glucans to support cellular immune defense.',
          },
        ]

      case 'energy':
        return [
          {
            id: 'cordyceps-energy-cacao',
            slug: 'cordyceps-energy-cacao',
            name: 'Cordyceps Energy & 75% Dark Cacao',
            format: '250g Ceremonial Elixir Powder',
            priceRwf: 36000,
            priceUsd: 26,
            image: '/assets/12_sku-cordyceps-cacao-4x5_4K.jpg',
            why: 'Combines bio-fermented Cordyceps militaris with 75% single-origin Rwandan stone-ground dark chocolate to elevate cellular oxygen uptake and clean physical ATP stamina.',
          },
        ]

      case 'culinary':
        return [
          {
            id: 'kinigi-pearl-oyster',
            slug: 'kinigi-pearl-oyster-fresh',
            name: 'Kinigi Pearl Oyster (Fresh)',
            format: '500g Hand-Harvested Crate',
            priceRwf: 8500,
            priceUsd: 6.5,
            image: '/assets/shop-01-kinigi-pearl-oyster-4x5_4K.jpg',
            why: 'Plump, velvety clusters cultivated on organic coffee pulp. Extraordinary umami depth for pan searing.',
          },
          {
            id: 'virunga-oak-shiitake',
            slug: 'virunga-oak-shiitake-fresh',
            name: 'Virunga Oak Shiitake (Fresh)',
            format: '400g Hand-Harvested Crate',
            priceRwf: 11000,
            priceUsd: 8.5,
            image: '/assets/shop-03-virunga-oak-shiitake-4x5_4K.jpg',
            why: 'Dense caps grown on fallen high-altitude hardwood logs, imparting smoky mineral notes.',
          },
          {
            id: 'kinigi-golden-oyster',
            slug: 'kinigi-golden-oyster-fresh',
            name: 'Kinigi Golden Oyster (Chef’s Reserve)',
            format: '350g Hand-Harvested Crate',
            priceRwf: 9500,
            priceUsd: 7.5,
            image: '/assets/shop-04-kinigi-golden-oyster-4x5_4K.jpg',
            why: 'Vibrant sunshine-yellow clusters with delicate buttery aromas reminiscent of roasted cashews.',
          },
        ]

      default:
        return []
    }
  }

  const recommendations = getRecommendations()

  const handleAddAllToCart = () => {
    recommendations.forEach((item) => {
      addToCart({
        id: item.id,
        slug: item.slug,
        name: item.name,
        format: item.format,
        priceRwf: item.priceRwf,
        priceUsd: item.priceUsd,
        image: item.image,
        quantity: 1,
        isSubscription: true,
      })
    })
    closeQuiz()
  }

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
  }

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
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#141515]/95 backdrop-blur-2xl border border-oxidized-copper/30 shadow-2xl rounded-none text-kinigi-mist overflow-hidden z-10 flex flex-col my-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Bar: Progress Indicator & Close Button */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-spore-gold font-bold">
                  {step <= 3 ? `Step ${step} of 3` : 'Your Personalized Stack'}
                </span>

                {step <= 3 && (
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          s === step
                            ? 'w-6 bg-oxidized-copper'
                            : s < step
                            ? 'w-3 bg-spore-gold'
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
                className="p-1.5 text-kinigi-mist/70 hover:text-white transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Body */}
            <div className="p-6 sm:p-8 min-h-[380px] flex flex-col justify-between">
              <AnimatePresence mode="wait" custom={direction}>
                {/* STEP 1 */}
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
                      <span className="font-mono text-[10px] uppercase tracking-widest text-oxidized-copper block mb-1">
                        Primary Intention
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white mb-1">
                        What&apos;s Your Primary Goal?
                      </h3>
                      <p className="text-xs text-kinigi-mist/70 font-sans">
                        Choose the primary physiological or culinary outcome you desire.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      {GOALS.map((g) => {
                        const Icon = g.icon
                        const isSelected = selectedGoal === g.id
                        return (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => setSelectedGoal(g.id)}
                            className={`w-full p-3.5 text-left border flex items-center gap-3.5 transition-all ${
                              isSelected
                                ? 'border-oxidized-copper bg-oxidized-copper/20 shadow-md ring-1 ring-oxidized-copper'
                                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                            }`}
                          >
                            <div
                              className={`p-2.5 rounded-none border ${
                                isSelected
                                  ? 'border-spore-gold bg-spore-gold/20 text-spore-gold'
                                  : 'border-white/10 bg-black/30 text-kinigi-mist/80'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-serif font-bold text-sm text-white">
                                {g.title}
                              </div>
                              <div className="font-sans text-[11px] text-kinigi-mist/70 truncate">
                                {g.subtitle}
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="w-5 h-5 text-spore-gold shrink-0 stroke-[2.5]" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
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
                      <span className="font-mono text-[10px] uppercase tracking-widest text-oxidized-copper block mb-1">
                        Circadian Timing
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white mb-1">
                        When Do You Want to Add VŪNGA?
                      </h3>
                      <p className="text-xs text-kinigi-mist/70 font-sans">
                        Select the moment in your day where this ritual seamlessly fits.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      {TIMINGS.map((t) => {
                        const Icon = t.icon
                        const isSelected = selectedTiming === t.id
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setSelectedTiming(t.id)}
                            className={`w-full p-3.5 text-left border flex items-center gap-3.5 transition-all ${
                              isSelected
                                ? 'border-oxidized-copper bg-oxidized-copper/20 shadow-md ring-1 ring-oxidized-copper'
                                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                            }`}
                          >
                            <div
                              className={`p-2.5 rounded-none border ${
                                isSelected
                                  ? 'border-spore-gold bg-spore-gold/20 text-spore-gold'
                                  : 'border-white/10 bg-black/30 text-kinigi-mist/80'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-serif font-bold text-sm text-white">
                                {t.title}
                              </div>
                              <div className="font-sans text-[11px] text-kinigi-mist/70">
                                {t.subtitle}
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="w-5 h-5 text-spore-gold shrink-0 stroke-[2.5]" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-oxidized-copper block mb-1">
                        Dosage & Acclimatization
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white mb-1">
                        What&apos;s Your Mushroom Experience?
                      </h3>
                      <p className="text-xs text-kinigi-mist/70 font-sans">
                        Helps calibrate the initial concentration and dosing guidelines.
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      {EXPERIENCES.map((e) => {
                        const Icon = e.icon
                        const isSelected = selectedExperience === e.id
                        return (
                          <button
                            key={e.id}
                            type="button"
                            onClick={() => setSelectedExperience(e.id)}
                            className={`w-full p-4 text-left border flex items-center gap-3.5 transition-all ${
                              isSelected
                                ? 'border-oxidized-copper bg-oxidized-copper/20 shadow-md ring-1 ring-oxidized-copper'
                                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                            }`}
                          >
                            <div
                              className={`p-2.5 rounded-none border ${
                                isSelected
                                  ? 'border-spore-gold bg-spore-gold/20 text-spore-gold'
                                  : 'border-white/10 bg-black/30 text-kinigi-mist/80'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-serif font-bold text-base text-white">
                                {e.title}
                              </div>
                              <div className="font-sans text-xs text-kinigi-mist/70 mt-0.5">
                                {e.subtitle}
                              </div>
                            </div>
                            {isSelected && (
                              <Check className="w-5 h-5 text-spore-gold shrink-0 stroke-[2.5]" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* RESULT SCREEN (Step 4) */}
                {step === 4 && (
                  <motion.div
                    key="step-result"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-spore-gold/15 border border-spore-gold/30 text-spore-gold font-mono text-[10px] uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Apothecary Prescription Formulated</span>
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-white">
                        Your Custom Virunga Stack
                      </h3>
                      <p className="text-xs text-kinigi-mist/70 font-sans mt-1">
                        Based on your goal for{' '}
                        <strong className="text-spore-gold capitalize">
                          {selectedGoal}
                        </strong>{' '}
                        and your{' '}
                        <strong className="text-spore-gold capitalize">
                          {selectedTiming}
                        </strong>{' '}
                        routine.
                      </p>
                    </div>

                    {/* Recommended Cards */}
                    <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                      {recommendations.map((rec) => (
                        <div
                          key={rec.id}
                          className="p-3 bg-white/5 border border-white/10 flex gap-3 items-center group hover:border-white/20 transition-all"
                        >
                          <div className="w-16 h-16 rounded bg-black/40 overflow-hidden shrink-0 border border-white/10">
                            <img
                              src={rec.image}
                              alt={rec.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <h4 className="font-serif font-bold text-sm text-white truncate">
                                {rec.name}
                              </h4>
                              <span className="font-mono text-xs font-semibold text-spore-gold shrink-0">
                                {formatPrice(rec.priceRwf, rec.priceUsd)}
                              </span>
                            </div>
                            <span className="font-mono text-[10px] text-oxidized-copper block">
                              {rec.format}
                            </span>
                            <p className="font-sans text-[11px] text-kinigi-mist/75 mt-1 leading-snug line-clamp-2">
                              {rec.why}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Subscription Perk Callout */}
                    <div className="p-3 bg-oxidized-copper/15 border border-oxidized-copper/40 text-[11px] font-mono text-kinigi-mist flex items-center justify-between">
                      <span>Includes Free Brushed Copper Dosing Scoop + 15% Subscription Discount</span>
                      <Check className="w-4 h-4 text-spore-gold shrink-0" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Controls */}
              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between gap-4">
                {step > 1 && step <= 3 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-kinigi-mist/70 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                )}

                {step === 1 && (
                  <div className="font-mono text-[10px] text-kinigi-mist/50 uppercase tracking-widest">
                    Kinigi Botanical Engine
                  </div>
                )}

                {step === 4 && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-kinigi-mist/60 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                )}

                {step < 3 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto inline-flex items-center gap-2 px-6 py-3 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {step === 3 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="ml-auto inline-flex items-center gap-2 px-6 py-3 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-spore-gold" />
                    <span>Reveal My Stack</span>
                  </button>
                )}

                {step === 4 && (
                  <button
                    type="button"
                    onClick={handleAddAllToCart}
                    className="ml-auto inline-flex items-center gap-2 px-6 py-3.5 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-lg shadow-oxidized-copper/20 active:scale-95"
                  >
                    <span>Add Recommended Stack to Bag</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default QuizModal
