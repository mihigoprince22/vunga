import React, { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, ChevronDown, Sparkles, ArrowRight } from 'lucide-react'
import VungaLogo from './VungaLogo'
import { useVunga } from '../context/VungaContext'
import type { Language } from '../context/VungaContext'

const MEGA_MENU_COLUMNS = [
  {
    title: 'Shop by Need',
    description: 'Targeted physiological & vitality protocols from Kinigi',
    items: [
      { name: 'Focus & Clarity', desc: "Lion's Mane, King Trumpet & morning coffee protocols", href: '/shop?need=focus' },
      { name: 'Calm & Deep Sleep', desc: 'Highland Reishi, Shiitake & evening twilight rituals', href: '/shop?need=calm' },
      { name: 'Immunity & Protection', desc: '5-Defenders complex & high-beta-glucan defense', href: '/shop?need=immunity' },
      { name: 'Stamina & Cacao', desc: 'Cordyceps, Golden Oyster & 75% dark Rwandan cacao', href: '/shop?need=energy' },
      { name: 'Fresh Rwandan Culinary', desc: '7 highland species harvested dawn daily in Kinigi', href: '/shop?need=culinary' },
    ],
    showAllLink: true,
  },
  {
    title: 'Functional Apothecary',
    description: 'Dual hydro-ethanolic extracts with >30% verified beta-glucans',
    items: [
      { name: "Organic Lion's Mane Focus", desc: 'Nerve Growth Factor (NGF) & sharp cognitive flow', href: '/shop/lions-mane-focus' },
      { name: 'Highland Reishi Calm', desc: 'Adrenal reset & restorative slow-wave REM sleep', href: '/shop/highland-reishi-calm' },
      { name: 'Virunga 5-Defenders Immunity', desc: '5 master fungal species synergistic shield', href: '/shop/virunga-5-defenders' },
      { name: 'Cordyceps Energy Cacao', desc: 'Cellular ATP stamina with single-estate chocolate', href: '/shop/cordyceps-energy-cacao' },
    ],
  },
  {
    title: 'Fresh & Dried Rwandan Harvest',
    description: 'Cultivated at 2,400m altitude on volcanic compost in Kinigi',
    items: [
      { name: 'Kinigi Pearl Oyster', desc: 'Velvety clusters cultivated on organic coffee pulp', href: '/shop/kinigi-pearl-oyster' },
      { name: 'Musanze Cremini & Button', desc: 'Dense volcanic earth Agaricus for kitchen bistros', href: '/shop/musanze-cremini-button' },
      { name: 'Virunga Oak Shiitake', desc: 'Hardwood log cultivated, rich umami depth', href: '/shop/virunga-oak-shiitake' },
      { name: 'Kinigi Golden Oyster', desc: 'Vibrant yellow fronds with toasted cashew notes', href: '/shop/kinigi-golden-oyster' },
      { name: 'Highland King Trumpet', desc: 'Dense thick stems for pan-searing & culinary steaks', href: '/shop/highland-king-trumpet' },
      { name: 'Rwandan Termitomyces (Imegeri)', desc: 'Wild-foraged sacred termite mound delicacy', href: '/shop/rwanda-termitomyces-imegeri' },
      { name: 'Virunga Wood Ear', desc: 'Sun-cured cloud forest fronds with distinctive snap', href: '/shop/virunga-wood-ear' },
    ],
  },
]

const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    currency,
    setCurrency,
    cartCount,
    openCart,
    openQuiz,
    t,
  } = useVunga()

  const toggleCurrency = () => {
    setCurrency(currency === 'RWF' ? 'USD' : 'RWF')
  }

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const megaMenuTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const location = useLocation()

  const handleMouseEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current)
    }
    setIsMegaMenuOpen(true)
  }

  const handleMouseLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false)
    }, 180)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { name: t('nav.home') || 'Home', path: '/' },
    {
      name: t('nav.shop') || 'Shop by Need',
      path: '/shop',
      hasMegaMenu: true,
    },
    { name: t('nav.science') || 'Our Science & COA', path: '/science' },
    { name: t('nav.origin') || 'Virunga Origin', path: '/origin' },
    { name: t('nav.tastingBar') || 'Kigali Tasting Bar & Wholesale', path: '/tasting-bar' },
  ]

  const languages: Language[] = ['EN', 'RW', 'FR']

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-volcanic-deep/85 backdrop-blur-xl border-b border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: VungaLogo */}
          <div className="flex items-center shrink-0">
            <VungaLogo variant="light" asLink={true} layout="horizontal" />
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path)

              if (link.hasMegaMenu) {
                return (
                  <div
                    key={link.path}
                    className="relative py-6"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={link.path}
                      className={`inline-flex items-center gap-1.5 font-sans font-medium uppercase text-[13px] tracking-wider transition-colors duration-200 ${
                        isActive || isMegaMenuOpen
                          ? 'text-oxidized-copper font-semibold'
                          : 'text-kinigi-mist/90 hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isMegaMenuOpen ? 'rotate-180 text-oxidized-copper' : 'text-kinigi-mist/60'
                        }`}
                      />
                    </Link>
                  </div>
                )
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-sans font-medium uppercase text-[13px] tracking-wider transition-colors duration-200 relative py-2 ${
                    isActive
                      ? 'text-oxidized-copper font-semibold'
                      : 'text-kinigi-mist/90 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-oxidized-copper"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Controls Row */}
          <div className="hidden sm:flex items-center gap-4">
            {/* "Find Your Match" button */}
            <button
              onClick={openQuiz}
              className="inline-flex items-center gap-2 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white px-3.5 py-2 font-sans font-medium uppercase text-[12px] tracking-wider transition-all duration-200 shadow-sm active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-spore-gold shrink-0" />
              <span>{t('nav.findMatch') || 'Find Your Match'}</span>
            </button>

            {/* Language Switcher: EN | RW | FR */}
            <div className="flex items-center border border-white/15 px-1 py-0.5 rounded-none bg-volcanic-ash/40">
              {languages.map((lang, index) => {
                const isSelected = language === lang
                return (
                  <React.Fragment key={lang}>
                    <button
                      onClick={() => setLanguage(lang)}
                      className={`relative px-2 py-1 font-mono text-[11px] font-semibold tracking-wider transition-colors duration-150 ${
                        isSelected
                          ? 'text-spore-gold'
                          : 'text-kinigi-mist/60 hover:text-kinigi-mist'
                      }`}
                    >
                      {lang}
                      {isSelected && (
                        <span className="absolute bottom-0.5 left-2 right-2 h-0.5 bg-oxidized-copper" />
                      )}
                    </button>
                    {index < languages.length - 1 && (
                      <span className="text-white/20 text-[10px] select-none">|</span>
                    )}
                  </React.Fragment>
                )
              })}
            </div>

            {/* Currency Switcher: RWF | USD toggle */}
            <button
              onClick={toggleCurrency}
              aria-label="Toggle currency"
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-white/15 bg-volcanic-ash/40 text-kinigi-mist hover:text-white font-mono text-[11px] font-semibold tracking-wider transition-all duration-200 hover:border-oxidized-copper/50"
            >
              <span className={currency === 'RWF' ? 'text-spore-gold font-bold' : 'text-kinigi-mist/50'}>
                RWF
              </span>
              <span className="text-white/20 select-none">/</span>
              <span className={currency === 'USD' ? 'text-spore-gold font-bold' : 'text-kinigi-mist/50'}>
                USD
              </span>
            </button>

            {/* Cart Bag Icon with Item Count Badge */}
            <button
              onClick={openCart}
              aria-label={`Open shopping cart with ${cartCount} items`}
              className="relative p-2 text-kinigi-mist hover:text-oxidized-copper transition-colors duration-200 active:scale-95 group focus:outline-none"
            >
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-oxidized-copper text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center border-2 border-volcanic-deep shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls: Cart & Hamburger */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative p-2 text-kinigi-mist"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-oxidized-copper text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center border-2 border-volcanic-deep">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open navigation menu"
              className="p-2 text-kinigi-mist hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Hover Mega-Menu Dropdown */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="hidden lg:block absolute top-20 left-0 w-full bg-volcanic-deep/98 backdrop-blur-2xl border-b border-oxidized-copper/30 shadow-2xl overflow-hidden z-40"
            >
              <div className="max-w-7xl mx-auto px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {MEGA_MENU_COLUMNS.map((column, colIdx) => (
                    <div
                      key={colIdx}
                      className={`flex flex-col ${
                        colIdx < 2 ? 'md:border-r md:border-white/10 md:pr-8' : ''
                      }`}
                    >
                      <h3 className="font-serif text-sm font-bold text-spore-gold tracking-wider uppercase mb-1 flex items-center gap-2">
                        <span>{column.title}</span>
                      </h3>
                      <p className="font-sans text-[11px] text-kinigi-mist/60 mb-5 leading-snug">
                        {column.description}
                      </p>

                      <ul className="space-y-3.5">
                        {column.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              to={item.href}
                              onClick={() => setIsMegaMenuOpen(false)}
                              className="group block transition-transform duration-150 hover:translate-x-1"
                            >
                              <div className="font-sans font-medium text-[13px] text-kinigi-mist group-hover:text-oxidized-copper transition-colors">
                                {item.name}
                              </div>
                              <div className="font-mono text-[11px] text-kinigi-mist/50 group-hover:text-kinigi-mist/80 transition-colors">
                                {item.desc}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {colIdx === 0 && (
                        <div className="mt-6 pt-4 border-t border-white/10">
                          <Link
                            to="/shop"
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-oxidized-copper hover:text-spore-gold transition-colors"
                          >
                            <span>View All 11 Harvests</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom banner strip inside mega-menu */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-kinigi-mist/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-verdigris-bamboo inline-block animate-pulse" />
                    <span>Current Kinigi Harvest Cycle: Fresh Oyster & Reishi In Stock</span>
                  </div>
                  <div className="text-right">
                    Same-Day Delivery in Kigali for Orders Placed Before 2:00 PM
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Slide-in Fullscreen Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-0 z-50 lg:hidden bg-volcanic-deep/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">
              <VungaLogo variant="light" asLink={false} layout="horizontal" />
              <button
                onClick={closeMobileMenu}
                aria-label="Close navigation"
                className="p-2 text-kinigi-mist hover:text-white focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className="font-serif text-2xl font-bold text-kinigi-mist hover:text-oxidized-copper transition-colors py-1 flex items-center justify-between border-b border-white/5"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-5 h-5 text-oxidized-copper" />
                </Link>
              ))}

              <div className="pt-4">
                <button
                  onClick={() => {
                    closeMobileMenu()
                    openQuiz()
                  }}
                  className="w-full py-4 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white font-sans text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-spore-gold" />
                  <span>{t('nav.findMatch') || 'Find Your Match'} (Quiz)</span>
                </button>
              </div>
            </div>

            {/* Mobile Footer Area: Currency & Language Switchers */}
            <div className="px-6 py-8 border-t border-white/10 bg-volcanic-ash/40 space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-kinigi-mist/70">
                  Language
                </span>
                <div className="flex items-center gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1 font-mono text-xs font-semibold uppercase ${
                        language === lang
                          ? 'bg-oxidized-copper text-white'
                          : 'bg-white/5 text-kinigi-mist/70'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-kinigi-mist/70">
                  Currency
                </span>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    onClick={() => currency !== 'RWF' && toggleCurrency()}
                    className={`px-3 py-1 font-semibold uppercase ${
                      currency === 'RWF'
                        ? 'bg-oxidized-copper text-white'
                        : 'bg-white/5 text-kinigi-mist/70'
                    }`}
                  >
                    RWF
                  </button>
                  <button
                    onClick={() => currency !== 'USD' && toggleCurrency()}
                    className={`px-3 py-1 font-semibold uppercase ${
                      currency === 'USD'
                        ? 'bg-oxidized-copper text-white'
                        : 'bg-white/5 text-kinigi-mist/70'
                    }`}
                  >
                    USD
                  </button>
                </div>
              </div>

              <div className="pt-2 text-center">
                <p className="font-mono text-[10px] uppercase tracking-widest text-kinigi-mist/50">
                  Cultivated in Kinigi, Musanze — Rwanda
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
