import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Mountain,
  Cloud,
  Hand,
  FlaskConical,
  Users,
  Sparkles,
  ArrowRight,
  MapPin,
  Compass,
  Droplets,
  Thermometer,
  Leaf,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';

interface TimelineStep {
  id: number;
  title: string;
  subtitle: string;
  icon: typeof Mountain;
  detail: string;
  image?: string;
  meta: {
    label: string;
    value: string;
  }[];
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 1,
    title: 'Volcanic Basalt & Juncao/Hardwood Substrate',
    subtitle: 'Mineral matrix from the Virunga Massif',
    icon: Mountain,
    detail:
      'Our substrate begins with mineral-rich volcanic basalt from the Virunga Massif, blended with Juncao grass and locally sourced hardwood sawdust. This creates the ideal nutrient matrix for maximum beta-glucan synthesis at 2,400m elevation.',
    meta: [
      { label: 'Substrate Composition', value: 'Basalt, Juncao & Hardwood' },
      { label: 'Mineral Matrix', value: 'Volcanic Iron, Magnesium, Silica' },
      { label: 'Origin', value: 'Musanze Agroforestry Basins' },
    ],
  },
  {
    id: 2,
    title: 'Highland Mist Fruiting in Kinigi Sanctuary',
    subtitle: 'Slow montane growth under volcanic clouds',
    icon: Cloud,
    detail:
      'The natural highland mist and cool temperatures of Kinigi (avg. 15°C) slow the fruiting cycle, concentrating bioactive compounds. Our open-air sanctuaries face the volcanic cones, drawing mineral-laden moisture.',
    image: '/assets/01_I01_anchor-kinigi-sanctuary-16x9_4K.jpg',
    meta: [
      { label: 'Sanctuary Altitude', value: '2,400 Metres (7,874 ft)' },
      { label: 'Ambient Temperature', value: '14.5°C – 16.5°C' },
      { label: 'Cloud Moisture', value: '88% – 94% Relative Humidity' },
    ],
  },
  {
    id: 3,
    title: 'Hand-Harvested at Peak Spore Maturity',
    subtitle: 'Daily dawn harvesting by expert mycologists',
    icon: Hand,
    detail:
      'Every fruiting body is hand-harvested at the precise moment of peak spore maturity — when beta-glucan, hericenone, and triterpene concentrations reach their highest levels.',
    image: '/assets/13_harvest-culinary-crate-3x2_4K.jpg',
    meta: [
      { label: 'Harvest Timing', value: '05:30 AM – 08:00 AM' },
      { label: 'Selection Criteria', value: 'Dense Margin & Cap Convexity' },
      { label: 'Post-Harvest Window', value: '<2 Hours to Curing / Extraction' },
    ],
  },
  {
    id: 4,
    title: 'Dual Water & Alcohol Extraction',
    subtitle: 'Bio-fractionation for complete molecular bioavailability',
    icon: FlaskConical,
    detail:
      'Our dual-extraction process uses sequential hot water (for water-soluble beta-glucans and polysaccharides) and ethanol extraction (for fat-soluble triterpenes and hericenones). This yields >30% beta-D-glucan content with <2% starch.',
    image: '/assets/06_extraction-lab-copper-still-16x9_4K.jpg',
    meta: [
      { label: 'Solvent 1', value: 'Purified Kinigi Mountain Spring H₂O' },
      { label: 'Solvent 2', value: 'Certified Organic Cane Ethanol' },
      { label: 'Yield Assay', value: '>30% Beta-Glucans, <2% Starch' },
    ],
  },
  {
    id: 5,
    title: 'Women-Led Musanze Farmer Cooperatives & Ecological Stewardship',
    subtitle: 'Regenerative circular mycology supporting 200+ families',
    icon: Users,
    detail:
      'VŪNGA partners with women-led cooperatives across Musanze District. Our circular cultivation model returns spent substrate as organic compost to local farms, closing the nutrient loop and supporting 200+ farming families.',
    meta: [
      { label: 'Cooperative Partners', value: 'Women Farmers of Musanze District' },
      { label: 'Families Supported', value: '200+ Agro-Pastoral Households' },
      { label: 'Nutrient Loop', value: '100% Circular Organic Compost Return' },
    ],
  },
];

const Origin = () => {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <div className="min-h-screen bg-kinigi-paper text-volcanic-ash">
      {/* 1. HERO SECTION WITH PARALLAX */}
      <section
        ref={heroRef}
        className="relative min-h-[95vh] flex flex-col justify-end overflow-hidden bg-volcanic-deep text-kinigi-mist pb-24 pt-32"
      >
        {/* Full-width Parallax Background Image */}
        <motion.div
          style={{ y: heroParallaxY, opacity: heroOpacity }}
          className="absolute inset-0 z-0 scale-110"
        >
          <img
            src="/assets/05_origin-virunga-mist-16x9_4K.jpg"
            alt="Virunga Mist and Volcanic Peaks"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-volcanic-deep via-volcanic-deep/65 to-volcanic-deep/30" />
        </motion.div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-4xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-oxidized-copper/20 border border-oxidized-copper/40 text-spore-gold text-xs font-mono tracking-widest uppercase backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-spore-gold" />
              <span>Volcanoes National Park Buffer Zone · 2,400m MSL</span>
            </div>

            <h1 className="font-serif font-light text-kinigi-mist text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08]">
              Born in the Virunga Mist
            </h1>

            <p className="font-sans text-lg sm:text-2xl text-kinigi-mist/90 font-normal leading-relaxed max-w-3xl">
              Cultivated at 2,400 metres in the volcanic foothills of Kinigi, where mineral-rich basalt and highland moisture forge mushrooms of extraordinary potency.
            </p>

            {/* Micro Coordinates Row */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-kinigi-mist/70 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-spore-gold" />
                1°26'18.4"S 29°35'44.2"E
              </span>
              <span className="flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5 text-oxidized-copper" />
                Mount Karisimbi Foothills
              </span>
              <span className="flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                Perpetual Alpine Cloud Moisture
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Secondary Anchor Image & Geologic Context */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="relative border-2 border-oxidized-copper/40 p-2 bg-white shadow-2xl">
              <img
                src="/assets/01_I01_anchor-kinigi-sanctuary-16x9_4K.jpg"
                alt="Kinigi Mushroom Cultivation Sanctuary facing the Virunga Volcanoes"
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-kinigi-paper border-t border-volcanic-ash/10 flex items-center justify-between text-xs font-mono text-volcanic-ash/70">
                <span>The Kinigi Mushroom Sanctuary</span>
                <span className="text-oxidized-copper font-semibold">Elevation: 2,400 Metres</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-oxidized-copper font-semibold">
              Terroir &amp; Biogeography
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-volcanic-deep leading-tight">
              Where Volcanic Mineral Meets Cloud Moisture
            </h2>
            <p className="font-sans text-volcanic-ash/80 text-base leading-relaxed">
              Kinigi lies at the northern edge of Rwanda in the Musanze District, cradled beneath the dormant volcanic cones of Karisimbi, Bisoke, and Sabyinyo.
            </p>
            <p className="font-sans text-volcanic-ash/80 text-base leading-relaxed">
              Here, ancient basaltic lava flows have decomposed over millennia into soils saturated with iron, magnesium, silica, and potassium. In this rare high-altitude microclimate, temperatures remain a steady 14°C to 16°C year-round — forcing the mycelium to grow slowly, synthesizing unprecedented concentrations of protective beta-glucans and secondary triterpenoids.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="w-10 h-0.5 bg-oxidized-copper" />
              <span className="text-xs font-mono text-volcanic-ash/60 tracking-wider uppercase">
                The Slowest Growth Yields the Deepest Medicine
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CULTIVATION TIME-LAPSE MODULE */}
      <section className="py-20 px-6 bg-volcanic-deep text-kinigi-mist">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxidized-copper/15 border border-oxidized-copper/40 text-spore-gold text-xs font-mono tracking-widest uppercase">
              <Leaf className="w-3.5 h-3.5 text-spore-gold" />
              Chronicle of Growth
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-kinigi-mist tracking-tight">
              Cultivation Time-Lapse
            </h2>
            <p className="font-sans text-kinigi-mist/75 text-sm sm:text-base">
              Observe the majestic unfurling of Lion's Mane icicle teeth inside our Kinigi Sanctuary over 14 days of highland mist incubation.
            </p>
          </div>

          {/* Video Container */}
          <div className="relative border-2 border-oxidized-copper/50 p-2 sm:p-3 bg-volcanic-ash/90 shadow-2xl">
            <div className="relative aspect-video w-full overflow-hidden bg-black rounded-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/assets/18_keyframe-video-02-fruiting-timelapse-16x9_4K.jpg"
                src="/assets/18_video-02-fruiting-timelapse-loop-16x9.mp4"
                className="w-full rounded-lg h-full object-cover"
              />
              {/* Corner Watermarks */}
              <div className="absolute top-4 left-4 z-10 bg-volcanic-deep/85 px-3 py-1.5 border border-white/10 text-[11px] font-mono text-kinigi-mist flex items-center gap-2 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                KINIGI SANCTUARY CHAMBER 02
              </div>
              <div className="absolute bottom-4 right-4 z-10 bg-volcanic-deep/85 px-3 py-1.5 border border-white/10 text-[11px] font-mono text-spore-gold backdrop-blur-md">
                14 DAYS COMPRESSED TO 12 SEC
              </div>
            </div>

            {/* Video Caption & Climate Telemetry */}
            <div className="p-4 bg-volcanic-deep/90 border-t border-white/10 mt-3 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono text-kinigi-mist/70">
              <div className="md:col-span-1">
                <span className="text-white font-serif italic text-sm block">
                  Lion's Mane Fruiting Cycle
                </span>
                <span className="text-[11px] text-kinigi-mist/50">Hericium erinaceus</span>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-spore-gold shrink-0" />
                <div>
                  <span className="block text-kinigi-mist font-semibold">14.8°C</span>
                  <span className="text-[10px] text-kinigi-mist/50">Average Sanctuary Temp</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <span className="block text-kinigi-mist font-semibold">91% RH</span>
                  <span className="text-[10px] text-kinigi-mist/50">Volcanic Fog Moisture</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-oxidized-copper shrink-0" />
                <div>
                  <span className="block text-kinigi-mist font-semibold">2,400 Metres</span>
                  <span className="text-[10px] text-kinigi-mist/50">Highland Altitude MSL</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs font-mono text-kinigi-mist/60 italic">
            Macro time-lapse of Lion's Mane fruiting in the Kinigi Sanctuary
          </p>
        </div>
      </section>

      {/* 3. "FROM SPORE TO SHELF IN KINIGI" 5-STEP INTERACTIVE TIMELINE */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxidized-copper/10 border border-oxidized-copper/30 text-oxidized-copper text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Methodology &amp; Ethics
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-volcanic-deep tracking-tight">
            From Spore to Shelf in Kinigi
          </h2>
          <p className="font-sans text-volcanic-ash/80 text-base sm:text-lg leading-relaxed">
            Follow our five-stage lifecycle — from volcanic substrate blending and mist fruiting to dual extraction and circular community return. Click any step to inspect the details.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Connecting Copper Line (Desktop) */}
          <div className="hidden md:block absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-oxidized-copper via-oxidized-copper/50 to-oxidized-copper/20" />

          {/* Timeline Steps Stack */}
          <div className="space-y-6">
            {TIMELINE_STEPS.map((step) => {
              const StepIcon = step.icon;
              const isActive = activeStepId === step.id;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={`relative transition-all duration-300 ${
                    isActive
                      ? 'bg-white border-l-4 border-oxidized-copper shadow-xl border-y border-r border-volcanic-ash/10'
                      : 'bg-kinigi-paper/60 hover:bg-white border-l-4 border-transparent hover:border-volcanic-ash/30 border border-volcanic-ash/10 shadow-sm'
                  }`}
                >
                  {/* Step Header Button */}
                  <button
                    type="button"
                    onClick={() => setActiveStepId(isActive ? 0 : step.id)}
                    className="w-full p-6 sm:p-8 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                      {/* Step Number & Icon Indicator */}
                      <div
                        className={`relative z-10 w-12 h-12 rounded-none flex items-center justify-center shrink-0 border transition-colors ${
                          isActive
                            ? 'bg-oxidized-copper text-white border-oxidized-copper shadow-md'
                            : 'bg-kinigi-paper text-volcanic-ash/70 border-volcanic-ash/20 hover:border-oxidized-copper'
                        }`}
                      >
                        <StepIcon className="w-5 h-5" />
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-xs font-bold uppercase tracking-wider ${
                              isActive ? 'text-oxidized-copper' : 'text-volcanic-ash/50'
                            }`}
                          >
                            Step 0{step.id}
                          </span>
                          <span className="text-[11px] font-mono text-volcanic-ash/40 hidden sm:inline">
                            · Kinigi Methodology
                          </span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-volcanic-deep mt-0.5">
                          {step.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-volcanic-ash/60 mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 mt-1 sm:mt-0 flex items-center gap-2">
                      <span className="text-xs font-mono text-oxidized-copper hidden sm:inline">
                        {isActive ? 'Hide Details' : 'Expand'}
                      </span>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-volcanic-ash/50" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expandable Content Body */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8 sm:px-8 sm:pb-8 pt-0 border-t border-volcanic-ash/5 space-y-6">
                          <p className="font-sans text-sm sm:text-base text-volcanic-ash/85 leading-relaxed pt-4">
                            {step.detail}
                          </p>

                          {/* Optional Step Image */}
                          {step.image && (
                            <div className="border border-volcanic-ash/15 overflow-hidden shadow-md">
                              <img
                                src={step.image}
                                alt={step.title}
                                className="w-full h-64 sm:h-80 object-cover"
                              />
                            </div>
                          )}

                          {/* Metadata Tags */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            {step.meta.map((m, i) => (
                              <div
                                key={i}
                                className="p-3 bg-kinigi-paper border border-volcanic-ash/10 rounded-none text-xs font-mono"
                              >
                                <span className="block text-volcanic-ash/50 text-[10px] uppercase tracking-wider mb-0.5">
                                  {m.label}
                                </span>
                                <span className="font-semibold text-volcanic-deep">
                                  {m.value}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 p-2.5 border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>Verified under VŪNGA Regenerative Agro-Ecology Protocol</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CLOSING SECTION WITH QUOTE & CTA */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-volcanic-deep text-kinigi-mist py-24">
        {/* Full-width Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/05_origin-virunga-mist-16x9_4K.jpg"
            alt="Virunga Misty Foothills at Twilight"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-volcanic-deep via-volcanic-deep/70 to-volcanic-deep/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="w-12 h-0.5 bg-oxidized-copper mx-auto" />

          <blockquote className="font-serif italic font-light text-kinigi-mist text-3xl sm:text-5xl md:text-6xl leading-[1.2] tracking-tight">
            “Where the mountain breathes, the mycelium listens.”
          </blockquote>

          <p className="font-mono text-xs sm:text-sm text-spore-gold uppercase tracking-[0.25em]">
            Kinigi · Musanze · Volcanoes National Park Buffer Zone
          </p>

          <p className="font-sans text-kinigi-mist/80 text-base max-w-xl mx-auto leading-relaxed">
            Every extract, capsule, and fresh cluster carrying the mineral pulse of Rwanda’s highest volcanoes.
          </p>

          <div className="pt-4">
            <Link
              to="/science"
              className="inline-flex items-center gap-3 px-8 py-4 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-xl shadow-oxidized-copper/25 group"
            >
              <span>Explore Our Science</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Origin;
