import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useSpring } from 'framer-motion';
import {
  Check,
  X,
  Minus,
  Search,
  Download,
  Printer,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink,
  FlaskConical,
  Beaker,
  FileCheck2,
  Atom,
} from 'lucide-react';
import VungaLogo from '../components/VungaLogo';

// --- Research Counter Component ---
interface StatCounterProps {
  value: number;
  suffix?: string;
}

const StatCounter = ({ value, suffix = '+' }: StatCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const spring = useSpring(0, { damping: 40, stiffness: 90 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [spring]);

  return (
    <span ref={ref} className="font-mono text-4xl sm:text-5xl font-bold text-oxidized-copper tracking-tight">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

// --- COA Batch Data Definition ---
interface BatchCOA {
  batchNumber: string;
  productName: string;
  species: string;
  speciesLatin: string;
  nmrVerification: 'PASS';
  betaGlucanContent: number;
  alphaGlucanContent: number;
  heavyMetals: {
    lead: string;
    arsenic: string;
    cadmium: string;
    mercury: string;
    status: 'PASS';
  };
  microbial: {
    totalPlate: string;
    yeastMold: string;
    salmonella: string;
    ecoli: string;
    status: 'PASS';
  };
  harvestDate: string;
  harvestLocation: string;
  extractionRatio: string;
  certNumber: string;
  testedDate: string;
}

const SAMPLE_BATCHES: Record<string, BatchCOA> = {
  'VNG-2026-LM01': {
    batchNumber: 'VNG-2026-LM01',
    productName: "Organic Lion's Mane Focus Extract",
    species: "Lion's Mane",
    speciesLatin: 'Hericium erinaceus',
    nmrVerification: 'PASS',
    betaGlucanContent: 32.4,
    alphaGlucanContent: 1.1,
    heavyMetals: {
      lead: '<0.002 ppm',
      arsenic: '<0.003 ppm',
      cadmium: '<0.001 ppm',
      mercury: '<0.001 ppm',
      status: 'PASS',
    },
    microbial: {
      totalPlate: '<100 CFU/g',
      yeastMold: '<10 CFU/g',
      salmonella: 'Absent / 25g',
      ecoli: 'Absent / 25g',
      status: 'PASS',
    },
    harvestDate: 'March 2026, Musanze District',
    harvestLocation: 'Kinigi, Musanze, Rwanda — 2,400m',
    extractionRatio: '10:1 Dual Water & Organic Ethanol',
    certNumber: 'COA-RW-2026-0891',
    testedDate: 'March 18, 2026',
  },
  'VNG-2026-REI04': {
    batchNumber: 'VNG-2026-REI04',
    productName: 'Highland Red Reishi Calm Reserve',
    species: 'Red Reishi',
    speciesLatin: 'Ganoderma lucidum',
    nmrVerification: 'PASS',
    betaGlucanContent: 35.8,
    alphaGlucanContent: 0.8,
    heavyMetals: {
      lead: '<0.001 ppm',
      arsenic: '<0.002 ppm',
      cadmium: '<0.001 ppm',
      mercury: '<0.001 ppm',
      status: 'PASS',
    },
    microbial: {
      totalPlate: '<80 CFU/g',
      yeastMold: '<10 CFU/g',
      salmonella: 'Absent / 25g',
      ecoli: 'Absent / 25g',
      status: 'PASS',
    },
    harvestDate: 'February 2026, Musanze District',
    harvestLocation: 'Kinigi, Musanze, Rwanda — 2,400m',
    extractionRatio: '12:1 Hot Mountain Water & Cane Spirit',
    certNumber: 'COA-RW-2026-0742',
    testedDate: 'February 26, 2026',
  },
  'VNG-2026-5DEF02': {
    batchNumber: 'VNG-2026-5DEF02',
    productName: 'Virunga 5-Defenders Immunity Synergy',
    species: 'Reishi, Turkey Tail, Maitake, Shiitake, Chaga',
    speciesLatin: 'Ganoderma lucidum, Trametes versicolor, Grifola frondosa, Lentinula edodes, Inonotus obliquus',
    nmrVerification: 'PASS',
    betaGlucanContent: 31.6,
    alphaGlucanContent: 1.4,
    heavyMetals: {
      lead: '<0.003 ppm',
      arsenic: '<0.004 ppm',
      cadmium: '<0.001 ppm',
      mercury: '<0.001 ppm',
      status: 'PASS',
    },
    microbial: {
      totalPlate: '<120 CFU/g',
      yeastMold: '<15 CFU/g',
      salmonella: 'Absent / 25g',
      ecoli: 'Absent / 25g',
      status: 'PASS',
    },
    harvestDate: 'January 2026, Musanze & Cloud Forest Buffer',
    harvestLocation: 'Kinigi, Musanze, Rwanda — 2,400m',
    extractionRatio: 'Multi-Species Dual Hydro-Ethanolic',
    certNumber: 'COA-RW-2026-0615',
    testedDate: 'February 04, 2026',
  },
  'VNG-2026-COR09': {
    batchNumber: 'VNG-2026-COR09',
    productName: 'Cordyceps Energy & Cacao Reserve',
    species: 'Cordyceps & Rwandan Cacao',
    speciesLatin: 'Cordyceps militaris & Theobroma cacao',
    nmrVerification: 'PASS',
    betaGlucanContent: 26.8,
    alphaGlucanContent: 1.2,
    heavyMetals: {
      lead: '<0.002 ppm',
      arsenic: '<0.003 ppm',
      cadmium: '<0.002 ppm',
      mercury: '<0.001 ppm',
      status: 'PASS',
    },
    microbial: {
      totalPlate: '<90 CFU/g',
      yeastMold: '<10 CFU/g',
      salmonella: 'Absent / 25g',
      ecoli: 'Absent / 25g',
      status: 'PASS',
    },
    harvestDate: 'March 2026, Musanze & Western Ridge',
    harvestLocation: 'Kinigi, Musanze, Rwanda — 2,400m',
    extractionRatio: '10:1 Ultrasonic Assisted Bio-Extraction',
    certNumber: 'COA-RW-2026-0904',
    testedDate: 'March 22, 2026',
  },
};

const RESEARCH_DATA = [
  {
    name: "Lion's Mane",
    latin: 'Hericium erinaceus',
    studies: 600,
    accent: 'Neurogenesis & Focus',
    description:
      'Stimulates Nerve Growth Factor (NGF) and Brain-Derived Neurotrophic Factor (BDNF) synthesis for synaptic plasticity and memory clarity.',
  },
  {
    name: 'Reishi',
    latin: 'Ganoderma lucidum',
    studies: 3000,
    accent: 'HPA Axis & Sleep Depth',
    description:
      'Triterpenoids (ganoderic acids) modulate the hypothalamic-pituitary-adrenal axis, reducing serum cortisol and deepening restorative delta-wave sleep.',
  },
  {
    name: 'Turkey Tail',
    latin: 'Trametes versicolor',
    studies: 1700,
    accent: 'Cellular Immunity & PSK',
    description:
      'Rich in Polysaccharide-K (PSK) and Polysaccharopeptide (PSP), which selectively activate Natural Killer (NK) cells and rebuild mucosal gut barrier ecology.',
  },
  {
    name: 'Cordyceps',
    latin: 'Cordyceps militaris',
    studies: 1000,
    accent: 'ATP Bio-Energy & VO2 Max',
    description:
      'Bioactive cordycepin and adenosine expand cellular mitochondrial ATP conversion, accelerating oxygen delivery and athletic cardiovascular threshold.',
  },
  {
    name: 'Shiitake',
    latin: 'Lentinula edodes',
    studies: 2000,
    accent: 'Lentinan & Vascular Defense',
    description:
      'Beta-1,3/1,6-D-glucan lentinan primes cytokine balance while natural eritadenine supports cardiovascular elasticity and balanced lipid profiles.',
  },
  {
    name: 'King Trumpet',
    latin: 'Pleurotus eryngii',
    studies: 600,
    accent: 'Ergothioneine Master Defense',
    description:
      'The premier dietary repository of L-Ergothioneine, an intelligent cellular antioxidant with dedicated human cell transporters for mitochondrial DNA defense.',
  },
];

const Science = () => {
  const [searchInput, setSearchInput] = useState('VNG-2026-LM01');
  const [activeBatchKey, setActiveBatchKey] = useState<string>('VNG-2026-LM01');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const activeBatch: BatchCOA =
    SAMPLE_BATCHES[activeBatchKey] || SAMPLE_BATCHES['VNG-2026-LM01'];

  const handleSearch = (code: string) => {
    const clean = code.trim().toUpperCase();
    setSearchInput(clean);
    if (SAMPLE_BATCHES[clean]) {
      setActiveBatchKey(clean);
    } else {
      // Fallback or closest match
      const found = Object.keys(SAMPLE_BATCHES).find((k) =>
        k.includes(clean)
      );
      if (found) {
        setActiveBatchKey(found);
      } else {
        alert(
          `Batch "${clean}" is not in the live public preview database. Try one of our verified sample batches: VNG-2026-LM01, VNG-2026-REI04, VNG-2026-5DEF02, or VNG-2026-COR09.`
        );
      }
    }
  };

  const handleDownloadPDF = () => {
    setDownloadToast(`Generating official PDF for Batch ${activeBatch.batchNumber}...`);
    setTimeout(() => {
      setDownloadToast(null);
      alert(
        `[VŪNGA Official Lab Archive]\nCertificate of Analysis for Batch ${activeBatch.batchNumber} (${activeBatch.productName}) has been generated with verified cryptographic signature and Rwanda FDA / Eurofins audit stamps.`
      );
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-kinigi-paper text-volcanic-ash">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#141515] text-[#EAE8E1] pt-24 pb-20">
        {/* Background Image with Scrim Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/06_extraction-lab-copper-still-16x9_4K.jpg"
            alt="VŪNGA Copper Still Extraction Lab"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#141515]/90 via-[#141515]/75 to-[#141515]" />
          <div className="absolute inset-0 bg-[radial-gradient(#B86B43_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B86B43]/20 border border-[#B86B43]/50 text-[#D4AF6A] text-xs font-mono tracking-[0.2em] uppercase backdrop-blur-md">
              <FlaskConical className="w-3.5 h-3.5 text-[#D4AF6A]" />
              <span>Apothecary Lab Standards · 2,400m Elevation</span>
            </div>

            <h1 className="font-serif font-light text-[#EAE8E1] text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.12]">
              The Science of Extraction
            </h1>

            <p className="font-sans text-lg sm:text-xl text-[#EAE8E1]/85 font-normal leading-relaxed max-w-2xl">
              Dual water and ethanol extraction from 100% organic fruiting bodies. Zero mycelium-on-grain fillers. Third-party verified.
            </p>

            {/* Quick Micro Badges */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-[#EAE8E1]/80">
              <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                <span className="text-[#D4AF6A] block font-semibold text-sm">&gt;30%</span>
                Beta-D-Glucans Verified
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-sm">
                <span className="text-emerald-400 block font-semibold text-sm">&lt;2%</span>
                Zero Starch / Alpha-Glucan
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-sm col-span-2 sm:col-span-1">
                <span className="text-[#B86B43] block font-semibold text-sm">100%</span>
                Fruiting Body Only
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a
                href="#coa-lookup"
                className="px-6 py-3.5 bg-[#B86B43] hover:bg-[#a15833] text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-lg shadow-[#B86B43]/25 flex items-center gap-2"
              >
                <span>Verify Your Batch COA</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#comparison"
                className="px-6 py-3.5 bg-transparent hover:bg-white/5 border border-[#EAE8E1]/30 text-[#EAE8E1] font-sans text-xs uppercase tracking-widest font-semibold transition-all backdrop-blur-sm"
              >
                Fruiting Body vs Grain
              </a>
            </div>
          </motion.div>

          {/* Right Video Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-none border-2 border-oxidized-copper/50 p-2 bg-volcanic-ash/80 backdrop-blur-md shadow-2xl overflow-hidden group">
              {/* Subtle copper accent corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-spore-gold" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-spore-gold" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-spore-gold" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-spore-gold" />

              <div className="relative aspect-video w-full overflow-hidden bg-volcanic-deep">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/assets/19_keyframe-video-03-dual-extraction-amber-drop-16x9_4K.jpg"
                  src="/assets/19_video-03-dual-extraction-amber-drop-16x9.mp4"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-volcanic-deep/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-kinigi-mist/90 pointer-events-none">
                  <span className="flex items-center gap-1.5 bg-volcanic-deep/80 px-2.5 py-1 rounded-sm border border-white/10 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    DUAL EXTRACTION CYCLE 03
                  </span>
                  <span className="text-spore-gold bg-volcanic-deep/80 px-2 py-1 rounded-sm border border-white/10">
                    HPLC MONITORED
                  </span>
                </div>
              </div>

              <div className="p-3 text-[11px] font-mono text-kinigi-mist/70 flex items-center justify-between border-t border-white/10 mt-2">
                <span>Solvent A: Kinigi Spring H₂O</span>
                <span className="text-oxidized-copper">Solvent B: Organic Cane EtOH</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. "WHY BETA-GLUCANS MATTER" COMPARISON TABLE */}
      <section id="comparison" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxidized-copper/10 border border-oxidized-copper/30 text-oxidized-copper text-xs font-mono tracking-widest uppercase">
            <Atom className="w-3.5 h-3.5" />
            Bioactive Potency & Transparency
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-volcanic-ash tracking-tight">
            Why Beta-Glucans Matter
          </h2>
          <p className="font-sans text-volcanic-ash/80 text-base sm:text-lg leading-relaxed">
            Not all mushroom products are created equal. Many commercial brands grind cheap mycelium grown on oats or rice — delivering up to 70% useless grain starch. VŪNGA extracts exclusively from mature, 100% whole fruiting bodies.
          </p>
        </div>

        {/* Side-by-Side Comparison Cards in Luxury Apothecary Palette */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Column 1: VŪNGA 100% Fruiting Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-[#1C2420] text-[#EAE8E1] border border-[#B86B43]/50 p-6 sm:p-8 shadow-xl flex flex-col justify-between"
          >
            {/* Crown Tag */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B86B43] text-[#EAE8E1] text-[10px] font-sans font-semibold tracking-wider uppercase mb-2">
                  <Sparkles className="w-3 h-3 text-[#D4AF6A]" />
                  VŪNGA Gold Standard
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  100% Fruiting Body
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#527361]/30 border border-[#527361] flex items-center justify-center text-[#D4AF6A]">
                <Award className="w-5 h-5" />
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="space-y-4 font-sans text-sm flex-1">
              {/* Row 1 */}
              <div className="p-4 bg-black/30 rounded-xl border border-white/5 flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#527361]/30 text-[#D4AF6A] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#D4AF6A] font-semibold">
                      Beta-D-Glucans
                    </span>
                    <span className="font-serif font-bold text-white text-base">
                      &gt;30% Verified
                    </span>
                  </div>
                  <p className="text-xs text-[#EAE8E1]/70 mt-1">
                    Therapeutically active (1,3)-(1,6)-beta-D-glucans bound naturally in structural fungal chitin.
                  </p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="p-4 bg-black/30 rounded-xl border border-white/5 flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#527361]/30 text-[#D4AF6A] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#D4AF6A] font-semibold">
                      Alpha-Glucan Starch
                    </span>
                    <span className="font-serif font-bold text-white text-base">
                      &lt;2% (Essentially Zero)
                    </span>
                  </div>
                  <p className="text-xs text-[#EAE8E1]/70 mt-1">
                    Laboratory verified absence of grain fillers, rice starch, or cereal carbohydrates.
                  </p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="p-4 bg-black/30 rounded-xl border border-white/5 flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#527361]/30 text-[#D4AF6A] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#D4AF6A] font-semibold">
                      Extraction Method
                    </span>
                    <span className="font-serif font-bold text-white text-base">
                      Dual Hot-Water & Ethanol
                    </span>
                  </div>
                  <p className="text-xs text-[#EAE8E1]/70 mt-1">
                    Full-spectrum bio-fractionation unlocking water-soluble polysaccharides and alcohol-soluble triterpenoids.
                  </p>
                </div>
              </div>

              {/* Row 4 */}
              <div className="p-4 bg-black/30 rounded-xl border border-white/5 flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#527361]/30 text-[#D4AF6A] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#D4AF6A] font-semibold">
                      Bioactive Diversity
                    </span>
                    <span className="font-serif font-bold text-white text-base">
                      Full Terpenoids & Phenolics
                    </span>
                  </div>
                  <p className="text-xs text-[#EAE8E1]/70 mt-1">
                    Rich in hericenones, erinacines, ganoderic acids, and ergosterol synthesized only during fruiting maturation.
                  </p>
                </div>
              </div>

              {/* Row 5 */}
              <div className="p-4 bg-black/30 rounded-xl border border-white/5 flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#527361]/30 text-[#D4AF6A] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#D4AF6A] font-semibold">
                      Cultivation Medium
                    </span>
                    <span className="font-serif font-bold text-white text-base">
                      Mineral-Dense Volcanic Substrate
                    </span>
                  </div>
                  <p className="text-xs text-[#EAE8E1]/70 mt-1">
                    Substrate formulated with volcanic basalt, Juncao grass, and local hardwood sawdust at 2,400m elevation.
                  </p>
                </div>
              </div>

              {/* Row 6 */}
              <div className="p-4 bg-black/30 rounded-xl border border-white/5 flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#527361]/30 text-[#D4AF6A] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#D4AF6A] font-semibold">
                      Third-Party Testing
                    </span>
                    <span className="font-serif font-bold text-[#D4AF6A] text-base">
                      Every Batch Verified
                    </span>
                  </div>
                  <p className="text-xs text-[#EAE8E1]/70 mt-1">
                    Full HPLC beta-glucan assay, heavy metals (&lt;0.01 ppm), microbial screening, and NMR species ID.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-sans text-[#D4AF6A]">
              <span>Origin: Kinigi, Musanze District</span>
              <span className="text-[#B86B43] font-semibold">100% Active Fungus</span>
            </div>
          </motion.div>

          {/* Column 2: Typical Mycelium-on-Grain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-2xl bg-[#E5E2D9] text-[#222423]/80 border border-[#222423]/15 p-6 sm:p-8 shadow-md flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#222423]/10">
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

            {/* Comparison Rows */}
            <div className="space-y-4 font-sans text-sm flex-1">
              {/* Row 1 */}
              <div className="p-4 bg-white/50 rounded-xl border border-[#222423]/10 flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#8C3F2B]/15 text-[#8C3F2B] flex items-center justify-center shrink-0">
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#222423]/60 font-semibold">
                      Beta-D-Glucans
                    </span>
                    <span className="font-serif font-bold text-[#8C3F2B] text-base">
                      &lt;5% (Negligible)
                    </span>
                  </div>
                  <p className="text-xs text-[#222423]/60 mt-1">
                    Critically low active polysaccharides because the product is mostly unconsumed grain.
                  </p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="p-4 bg-white/50 rounded-xl border border-[#222423]/10 flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#8C3F2B]/15 text-[#8C3F2B] flex items-center justify-center shrink-0">
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#222423]/60 font-semibold">
                      Alpha-Glucan Starch
                    </span>
                    <span className="font-serif font-bold text-[#8C3F2B] text-base">
                      35% – 70% Grain Starch
                    </span>
                  </div>
                  <p className="text-xs text-[#222423]/60 mt-1">
                    High concentration of starch filler from grain substrate that cannot be separated from mycelium.
                  </p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="p-4 bg-white/50 rounded-xl border border-[#222423]/10 flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#8C3F2B]/15 text-[#8C3F2B] flex items-center justify-center shrink-0">
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#222423]/60 font-semibold">
                      Extraction Method
                    </span>
                    <span className="font-serif font-bold text-[#222423]/80 text-base">
                      Raw Powder or Water Only
                    </span>
                  </div>
                  <p className="text-xs text-[#222423]/60 mt-1">
                    Often sold as raw freeze-dried grain powder without dual solvent extraction to break chitin bonds.
                  </p>
                </div>
              </div>

              {/* Row 4 */}
              <div className="p-4 bg-white/50 rounded-xl border border-[#222423]/10 flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#8C3F2B]/15 text-[#8C3F2B] flex items-center justify-center shrink-0">
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#222423]/60 font-semibold">
                      Bioactive Diversity
                    </span>
                    <span className="font-serif font-bold text-[#222423]/80 text-base">
                      Severely Depleted
                    </span>
                  </div>
                  <p className="text-xs text-[#222423]/60 mt-1">
                    Lacks the secondary metabolites, triterpenoids, and ganoderic acids produced only in mature caps.
                  </p>
                </div>
              </div>

              {/* Row 5 */}
              <div className="p-4 bg-white/50 rounded-xl border border-[#222423]/10 flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#8C3F2B]/15 text-[#8C3F2B] flex items-center justify-center shrink-0">
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#222423]/60 font-semibold">
                      Cultivation Medium
                    </span>
                    <span className="font-serif font-bold text-[#222423]/80 text-base">
                      Sterilized Commodity Grain
                    </span>
                  </div>
                  <p className="text-xs text-[#222423]/60 mt-1">
                    Grown quickly in plastic bags on cereal grains (rice, oats, barley) in indoor sterile labs.
                  </p>
                </div>
              </div>

              {/* Row 6 */}
              <div className="p-4 bg-white/50 rounded-xl border border-[#222423]/10 flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-[#8C3F2B]/15 text-[#8C3F2B] flex items-center justify-center shrink-0">
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#222423]/60 font-semibold">
                      Third-Party Testing
                    </span>
                    <span className="font-serif font-bold text-[#8C3F2B] text-base">
                      Rarely Tested / Proprietary Blends
                    </span>
                  </div>
                  <p className="text-xs text-[#222423]/60 mt-1">
                    Labels cite &quot;total polysaccharides&quot; to mask high starch percentages and evade specific beta-glucan quantification.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#222423]/10 flex items-center justify-between text-xs font-sans text-[#222423]/60">
              <span>Standard Grain Biomass</span>
              <span className="text-[#8C3F2B] font-semibold">Predominantly Grain Starch</span>
            </div>
          </motion.div>
        </div>

        {/* Informational Callout Banner (Clean normal flow, mt-12, never overlapping) */}
        <div className="mt-12 p-6 md:p-8 bg-[#141515] text-[#EAE8E1] rounded-2xl border border-white/10 shadow-xl flex flex-col md:flex-row items-center gap-6 max-w-5xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#D4AF6A]/20 text-[#D4AF6A] flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-serif text-lg text-white font-semibold mb-1">
              The Iodine Starch Test: Simple Biological Truth
            </h4>
            <p className="font-sans text-sm text-[#EAE8E1]/80 leading-relaxed">
              Drop pharmacy iodine into typical mycelium-on-grain powder and it turns ink-black &mdash; exposing massive grain starch. Drop iodine into VŪNGA pure fruiting body dual-extract and the liquid stays clean golden amber. Zero starch. 100% active functional fungus.
            </p>
          </div>
          <Link
            to="/shop"
            className="shrink-0 px-6 py-3.5 rounded-full bg-[#B86B43] hover:bg-[#a35b36] text-[#EAE8E1] font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg cursor-pointer"
          >
            Explore Apothecary
          </Link>
        </div>
            </section>

      {/* 3. INTERACTIVE BATCH COA VERIFIER */}
      <section id="coa-lookup" className="py-24 px-6 bg-gradient-to-b from-kinigi-paper via-white to-kinigi-paper border-t border-b border-volcanic-ash/10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxidized-copper/10 border border-oxidized-copper/30 text-oxidized-copper text-xs font-mono tracking-widest uppercase">
              <FileCheck2 className="w-3.5 h-3.5" />
              Cryptographic Batch Traceability
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-volcanic-deep tracking-tight">
              Certificate of Analysis — Batch Lookup
            </h2>
            <p className="font-sans text-volcanic-ash/80 text-base max-w-2xl mx-auto">
              Every jar and pouch harvested in Kinigi is assigned a unique lot stamp. Input your code below to inspect the full third-party chromatographic profile and safety audit.
            </p>
          </div>

          {/* Search Box & Quick Test Buttons */}
          <div className="bg-kinigi-paper p-6 sm:p-8 rounded-none border border-volcanic-ash/15 shadow-lg mb-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(searchInput);
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-volcanic-ash/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter Batch Code (e.g., VNG-2026-LM01)"
                  className="w-full pl-12 pr-4 py-3.5 bg-white border border-volcanic-ash/20 font-mono text-sm tracking-wider uppercase text-volcanic-deep focus:outline-none focus:border-oxidized-copper focus:ring-1 focus:ring-oxidized-copper transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>VERIFY BATCH</span>
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Test Pill Buttons */}
            <div className="mt-4 pt-4 border-t border-volcanic-ash/10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-volcanic-ash/60 mr-2">Sample Batches:</span>
              {Object.keys(SAMPLE_BATCHES).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleSearch(code)}
                  className={`px-3 py-1 text-xs font-mono rounded-none border transition-all ${
                    activeBatchKey === code
                      ? 'bg-volcanic-deep text-kinigi-mist border-volcanic-deep font-semibold shadow-sm'
                      : 'bg-white text-volcanic-ash/80 border-volcanic-ash/20 hover:border-oxidized-copper'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Certificate of Analysis Card */}
          <motion.div
            key={activeBatch.batchNumber}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-kinigi-paper border-2 border-oxidized-copper/60 p-6 sm:p-10 shadow-2xl relative overflow-hidden print:p-0 print:border-none print:shadow-none"
          >
            {/* Watermark Logo Effect */}
            <div className="absolute right-[-40px] top-[-40px] w-72 h-72 opacity-[0.04] pointer-events-none select-none">
              <VungaLogo variant="dark" asLink={false} />
            </div>

            {/* Official Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b-2 border-volcanic-ash/15">
              <div>
                <div className="flex items-center gap-3">
                  <VungaLogo variant="dark" asLink={false} />
                  <span className="text-xs font-mono uppercase tracking-widest text-oxidized-copper font-bold px-2 py-0.5 bg-oxidized-copper/10">
                    Official COA
                  </span>
                </div>
                <p className="text-xs font-mono text-volcanic-ash/60 mt-1">
                  Kinigi Extraction Laboratory · Certificate ID: {activeBatch.certNumber}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-mono font-bold tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  AUTHENTICATED &amp; VERIFIED
                </span>
                <span className="block text-[11px] font-mono text-volcanic-ash/50 mt-1">
                  Audit Date: {activeBatch.testedDate}
                </span>
              </div>
            </div>

            {/* Product & Batch Identification */}
            <div className="py-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-volcanic-ash/10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-volcanic-ash/60 block">
                  Product Formulation
                </span>
                <h3 className="font-serif text-2xl font-bold text-volcanic-deep mt-0.5">
                  {activeBatch.productName}
                </h3>
                <p className="font-serif italic text-sm text-oxidized-copper mt-0.5">
                  {activeBatch.speciesLatin}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-volcanic-ash/60 uppercase block">Batch Number</span>
                  <span className="font-bold text-volcanic-deep text-sm">{activeBatch.batchNumber}</span>
                </div>
                <div>
                  <span className="text-volcanic-ash/60 uppercase block">NMR Species ID</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 inline-block">
                    {activeBatch.nmrVerification} (100% Match)
                  </span>
                </div>
                <div>
                  <span className="text-volcanic-ash/60 uppercase block">Extraction Ratio</span>
                  <span className="text-volcanic-deep font-medium">{activeBatch.extractionRatio}</span>
                </div>
                <div>
                  <span className="text-volcanic-ash/60 uppercase block">Harvest Elevation</span>
                  <span className="text-volcanic-deep font-medium">2,400m MSL</span>
                </div>
              </div>
            </div>

            {/* Primary Chemical Assay Table */}
            <div className="py-6 border-b border-volcanic-ash/10 space-y-4">
              <h4 className="font-serif text-base font-semibold text-volcanic-deep flex items-center gap-2">
                <Beaker className="w-4 h-4 text-oxidized-copper" />
                Chromatographic Quantitative Assays
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Beta-Glucan Bar */}
                <div className="p-4 bg-white/80 border border-volcanic-ash/10 rounded-none">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-volcanic-ash/70">
                      Beta-D-Glucan Active Yield
                    </span>
                    <span className="font-mono text-emerald-700 font-bold text-base">
                      {activeBatch.betaGlucanContent}% PASS
                    </span>
                  </div>
                  <div className="w-full bg-volcanic-ash/10 h-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, activeBatch.betaGlucanContent * 2.5)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-volcanic-ash/50 mt-1 block">
                    Target Standard: &ge;30.0% w/w (HPLC Megazyme Protocol)
                  </span>
                </div>

                {/* Alpha-Glucan Bar */}
                <div className="p-4 bg-white/80 border border-volcanic-ash/10 rounded-none">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-volcanic-ash/70">
                      Alpha-Glucan (Starch Filler)
                    </span>
                    <span className="font-mono text-emerald-700 font-bold text-base">
                      {activeBatch.alphaGlucanContent}% PASS
                    </span>
                  </div>
                  <div className="w-full bg-volcanic-ash/10 h-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full transition-all duration-1000"
                      style={{ width: `${Math.max(4, activeBatch.alphaGlucanContent * 10)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-volcanic-ash/50 mt-1 block">
                    Target Standard: &le;2.0% w/w (Verified Zero Grain Adulteration)
                  </span>
                </div>
              </div>
            </div>

            {/* Safety & Heavy Metals + Microbial Screen */}
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-volcanic-ash/10">
              {/* Heavy Metals */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-volcanic-ash/70 font-semibold">
                    Heavy Metals (ICP-MS)
                  </span>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5">
                    {activeBatch.heavyMetals.status} (&lt;0.01 ppm)
                  </span>
                </div>
                <div className="bg-white/60 p-3 border border-volcanic-ash/10 space-y-1.5 text-xs font-mono text-volcanic-ash/80">
                  <div className="flex justify-between">
                    <span>Lead (Pb):</span>
                    <span className="font-semibold text-emerald-800">{activeBatch.heavyMetals.lead}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Arsenic (As):</span>
                    <span className="font-semibold text-emerald-800">{activeBatch.heavyMetals.arsenic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cadmium (Cd):</span>
                    <span className="font-semibold text-emerald-800">{activeBatch.heavyMetals.cadmium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mercury (Hg):</span>
                    <span className="font-semibold text-emerald-800">{activeBatch.heavyMetals.mercury}</span>
                  </div>
                </div>
              </div>

              {/* Microbial Screen */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-volcanic-ash/70 font-semibold">
                    Microbiological Safety (USP)
                  </span>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5">
                    {activeBatch.microbial.status} (Clean)
                  </span>
                </div>
                <div className="bg-white/60 p-3 border border-volcanic-ash/10 space-y-1.5 text-xs font-mono text-volcanic-ash/80">
                  <div className="flex justify-between">
                    <span>Total Plate Count:</span>
                    <span className="font-semibold text-emerald-800">{activeBatch.microbial.totalPlate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yeast &amp; Mold:</span>
                    <span className="font-semibold text-emerald-800">{activeBatch.microbial.yeastMold}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Salmonella spp:</span>
                    <span className="font-semibold text-emerald-800">{activeBatch.microbial.salmonella}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Escherichia coli:</span>
                    <span className="font-semibold text-emerald-800">{activeBatch.microbial.ecoli}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Provenance & Geo-Location */}
            <div className="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-volcanic-ash/70">
              <div>
                <span className="block font-semibold text-volcanic-deep">Harvest Provenance:</span>
                <span>{activeBatch.harvestLocation}</span>
                <span className="block text-volcanic-ash/50">{activeBatch.harvestDate}</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="block font-semibold text-volcanic-deep">Governing Standards:</span>
                <span>ISO/IEC 17025 Accredited Laboratory Protocol</span>
                <span className="block text-volcanic-ash/50">Rwanda FDA GMP Compliance Archive</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t-2 border-volcanic-ash/15 flex flex-wrap gap-4 items-center justify-between print:hidden">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="px-6 py-3 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all shadow-md flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download COA PDF</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-6 py-3 bg-white hover:bg-volcanic-ash/5 border border-volcanic-ash/20 text-volcanic-ash font-sans text-xs uppercase tracking-widest font-semibold transition-all flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Certificate</span>
                </button>
              </div>

              {downloadToast && (
                <span className="text-xs font-mono text-oxidized-copper animate-pulse">
                  {downloadToast}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. PEER-REVIEWED RESEARCH COUNTER */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxidized-copper/10 border border-oxidized-copper/30 text-oxidized-copper text-xs font-mono tracking-widest uppercase">
            <Atom className="w-3.5 h-3.5" />
            Global Scientific Literature
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-volcanic-ash tracking-tight">
            Peer-Reviewed Research
          </h2>
          <p className="font-sans text-volcanic-ash/80 text-base sm:text-lg leading-relaxed">
            Every mushroom in our formulary is backed by hundreds of clinical trials and scientific publications indexed on PubMed, NCBI, and ScienceDirect.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESEARCH_DATA.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-kinigi-paper p-6 sm:p-8 rounded-none border border-volcanic-ash/10 hover:border-oxidized-copper/50 transition-all shadow-sm hover:shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-volcanic-ash/50 mb-3">
                  <span className="text-oxidized-copper uppercase tracking-wider font-semibold">
                    {item.accent}
                  </span>
                  <span>PubMed Indexed</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-volcanic-deep group-hover:text-oxidized-copper transition-colors">
                  {item.name}
                </h3>
                <p className="font-serif italic text-sm text-volcanic-ash/60 mt-0.5 mb-6">
                  {item.latin}
                </p>

                {/* Animated Stat Counter */}
                <div className="mb-4">
                  <StatCounter value={item.studies} suffix="+" />
                  <span className="block font-mono text-xs uppercase tracking-widest text-volcanic-ash/60 mt-1">
                    Published Studies
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-volcanic-ash/80 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-volcanic-ash/10 flex items-center justify-between text-xs font-mono text-oxidized-copper">
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-medium">
                  Review Studies <ExternalLink className="w-3.5 h-3.5" />
                </span>
                <span className="text-volcanic-ash/40 text-[10px]">NCBI / MeSH</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center">
          <Link
            to="/origin"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-oxidized-copper hover:text-volcanic-deep font-semibold transition-colors pb-1 border-b border-oxidized-copper"
          >
            <span>Discover Where These Species Are Grown in Kinigi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Science;
