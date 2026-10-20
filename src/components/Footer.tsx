import React from 'react'
import { Link } from 'react-router-dom'
import VungaLogo from './VungaLogo'

// Custom SVGs for social icons
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-label="Instagram"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const TwitterXIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-label="Twitter / X"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-label="Facebook"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

// Payment Badges with authentic brand colors
const MomoBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFCC00] text-black text-[11px] font-sans font-bold shadow-xs select-none">
    <span className="w-2 h-2 rounded-full bg-black shrink-0" />
    <span>MTN MoMo</span>
  </span>
)

const BkBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#0B2545] text-white text-[11px] font-sans font-bold border border-white/20 shadow-xs select-none">
    <span className="text-[#139A8C] font-black">BK</span>
    <span className="text-white/40">/</span>
    <span className="text-white font-medium text-[10px]">Urubuto</span>
  </span>
)

const VisaBadge: React.FC = () => (
  <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#1A1F71] text-white text-[11px] font-sans font-black italic tracking-wider shadow-xs select-none">
    VISA
  </span>
)

const MastercardBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#222423] border border-white/20 shadow-xs select-none">
    <span className="relative flex items-center w-6 h-3.5">
      <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B] inline-block absolute left-0" />
      <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] inline-block absolute right-0 opacity-80" />
    </span>
    <span className="text-white text-[10px] font-sans font-bold">Mastercard</span>
  </span>
)

const ApplePayBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-white text-black text-[11px] font-sans font-bold shadow-xs select-none">
    <svg className="w-3 h-3 fill-current inline-block" viewBox="0 0 170 170">
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.77-7.94-12.24-14.58-6.19-9.16-11.05-19.78-14.58-31.86-3.53-12.08-5.3-23.45-5.3-34.12 0-14.35 3.69-26.06 11.08-35.13 7.39-9.07 16.63-13.68 27.73-13.84 4.58 0 9.87 1.25 15.86 3.76 6 2.5 9.87 3.82 11.61 3.94 1.34 0 5.48-1.47 12.44-4.41 6.95-2.94 12.87-4.18 17.76-3.71 13.55.93 23.95 5.75 31.21 14.46-12.08 7.33-18.01 17.29-17.79 29.89.22 9.92 4.13 18.27 11.73 25.06 7.6 6.79 16.52 10.74 26.76 11.85-2.28 6.79-5.18 14.34-8.71 22.65zM119.22 31.02c0-7.39 2.68-14.28 8.04-20.67 5.36-6.39 12.07-10.35 20.13-11.88.54 3.48.54 6.74 0 9.78-.76 6.95-3.69 13.53-8.8 19.74-5.11 6.2-11.68 10.02-19.71 11.46-.22-2.82-.33-5.63-.33-8.43z" />
    </svg>
    <span>Pay</span>
  </span>
)

const QUICK_LINKS = [
  { name: 'Shop All Dispensary', path: '/shop' },
  { name: 'Functional Extracts', path: '/shop' },
  { name: 'Fresh Mushrooms', path: '/shop' },
  { name: 'Bundles & Ritual Sets', path: '/shop' },
  { name: 'Science & COA Lookup', path: '/science' },
]

const COMPANY_LINKS = [
  { name: 'Our Story', path: '/origin' },
  { name: 'Virunga Origin', path: '/origin' },
  { name: 'Kigali Tasting Bar', path: '/tasting-bar' },
  { name: 'Wholesale & Hospitality', path: '/tasting-bar' },
  { name: 'Careers', path: '/origin' },
]

const SUPPORT_LINKS = [
  { name: 'Contact Us', path: '/tasting-bar' },
  { name: 'Shipping & Returns', path: '/shop' },
  { name: 'COA Batch Lookup', path: '/science' },
  { name: 'Frequently Asked Questions', path: '/science' },
  { name: 'Privacy Policy', path: '/' },
]

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#222423] text-[#EAE8E1] border-t border-white/10 font-sans">
      {/* Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Column 1: Brand & Tagline & Socials (Width: 4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            <VungaLogo variant="light" showTagline={true} />
            <p className="mt-5 font-serif italic text-base text-[#EAE8E1]/80 max-w-sm leading-relaxed">
              &ldquo;Earthen Alchemy from the Virunga Mist&rdquo;
            </p>
            <p className="mt-3 font-sans text-xs text-[#EAE8E1]/60 max-w-sm leading-relaxed font-normal">
              Apothecary-grade dual-extracts and fresh culinary harvests grown on volcanic substrates in Kinigi, Musanze at 2,400 meters altitude.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#EAE8E1]/80 hover:text-white hover:border-[#B86B43] hover:bg-[#B86B43]/20 transition-all duration-200"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#EAE8E1]/80 hover:text-white hover:border-[#B86B43] hover:bg-[#B86B43]/20 transition-all duration-200"
              >
                <TwitterXIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#EAE8E1]/80 hover:text-white hover:border-[#B86B43] hover:bg-[#B86B43]/20 transition-all duration-200"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Width: 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-[#D4AF6A] font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group inline-block text-[14px] text-[#EAE8E1]/80 hover:text-[#B86B43] transition-colors relative"
                  >
                    <span>{link.name}</span>
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#B86B43]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company (Width: 2-3 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-[#D4AF6A] font-semibold mb-6">
              Company
            </h4>
            <ul className="space-y-3.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group inline-block text-[14px] text-[#EAE8E1]/80 hover:text-[#B86B43] transition-colors relative"
                  >
                    <span>{link.name}</span>
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#B86B43]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support (Width: 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-[#D4AF6A] font-semibold mb-6">
              Support
            </h4>
            <ul className="space-y-3.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group inline-block text-[14px] text-[#EAE8E1]/80 hover:text-[#B86B43] transition-colors relative"
                  >
                    <span>{link.name}</span>
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-[#B86B43]" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl">
              <span className="font-sans text-[10px] text-[#D4AF6A] uppercase tracking-wider block mb-1 font-semibold">
                Kigali Tasting Bar
              </span>
              <p className="font-sans text-xs text-[#EAE8E1]/70 leading-snug">
                KG 674 St, Kimihurura · Open Tue–Sun 8AM–8PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#141515]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans text-[#EAE8E1]/70">
          <div>
            <span>© 2026 VŪNGA Rwanda · </span>
            <span className="text-[#D4AF6A] font-medium">vunga.rw</span>
          </div>

          {/* SVG Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <MomoBadge />
            <BkBadge />
            <VisaBadge />
            <MastercardBadge />
            <ApplePayBadge />
          </div>

          <div className="text-center md:text-right tracking-wider uppercase text-[11px] text-[#D4AF6A]/90 font-medium">
            Cultivated in Kinigi, Musanze — Rwanda
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
