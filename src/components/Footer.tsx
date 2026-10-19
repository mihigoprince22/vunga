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
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF6A] font-semibold mb-6">
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
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF6A] font-semibold mb-6">
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
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF6A] font-semibold mb-6">
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

            <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-none">
              <span className="font-mono text-[10px] text-[#D4AF6A] uppercase tracking-wider block mb-1">
                Kigali Tasting Bar
              </span>
              <p className="font-mono text-[11px] text-[#EAE8E1]/70 leading-snug">
                KG 674 St, Kimihurura · Open Tue–Sun 8AM–8PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#141515]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#EAE8E1]/70">
          <div>
            <span>© 2026 VŪNGA Rwanda · </span>
            <span className="text-[#D4AF6A]">vunga.rw</span>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-2.5 py-1 bg-white/5 border border-white/15 text-[11px] font-mono text-[#EAE8E1]/90 tracking-wide rounded-none">
              MTN MoMo
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/15 text-[11px] font-mono text-[#EAE8E1]/90 tracking-wide rounded-none">
              Visa
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/15 text-[11px] font-mono text-[#EAE8E1]/90 tracking-wide rounded-none">
              Mastercard
            </span>
            <span className="px-2.5 py-1 bg-white/5 border border-white/15 text-[11px] font-mono text-[#EAE8E1]/90 tracking-wide rounded-none">
              Apple Pay
            </span>
          </div>

          <div className="text-center md:text-right tracking-wider uppercase text-[11px] text-[#D4AF6A]/90">
            Cultivated in Kinigi, Musanze — Rwanda
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
