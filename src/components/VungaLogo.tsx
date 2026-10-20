import React from 'react';
import { Link } from 'react-router-dom';

export interface VungaLogoProps {
  variant?: 'light' | 'dark';
  layout?: 'horizontal' | 'vertical';
  showText?: boolean;
  showTagline?: boolean;
  asLink?: boolean;
  className?: string;
  size?: number | string;
}

export const VungaLogo: React.FC<VungaLogoProps> = ({
  variant = 'dark',
  layout = 'horizontal',
  showText = true,
  showTagline = false,
  asLink = false,
  className = '',
  size,
}) => {
  // Brand color tokens
  const copper = '#B86B43';
  const textColor = variant === 'light' ? '#EAE8E1' : '#222423';

  // Circular Virunga Crest Emblem SVG
  const CrestSVG = ({ iconSize = 44 }: { iconSize?: number | string }) => (
    <svg
      viewBox="48 13 144 144"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: typeof iconSize === 'number' ? `${iconSize}px` : iconSize,
        height: typeof iconSize === 'number' ? `${iconSize}px` : iconSize,
      }}
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="Virunga Crest Emblem"
    >
      <defs>
        <clipPath id="crestCircleClip">
          <circle cx="120" cy="85" r="66" />
        </clipPath>
      </defs>

      {/* Outer Circular Boundary with fine double-ring luxury frame */}
      <circle
        cx="120"
        cy="85"
        r="66"
        stroke={copper}
        strokeWidth="2.5"
        fill="none"
      />
      <circle
        cx="120"
        cy="85"
        r="62.5"
        stroke={copper}
        strokeWidth="0.8"
        strokeDasharray="2.5 2.5"
        fill="none"
        opacity="0.65"
      />

      {/* Elements clipped inside the circular seal */}
      <g clipPath="url(#crestCircleClip)">
        {/* Volcanic sky backdrop subtle tint */}
        <circle cx="120" cy="85" r="66" fill="#141515" fillOpacity="0.3" />

        {/* Mushroom Cap Outer Dome Arch */}
        <path
          d="M 60 78 C 60 40, 90 23, 120 23 C 150 23, 180 40, 180 78"
          stroke={copper}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Mushroom Cap Underside / Gill Baseline Rim */}
        <path
          d="M 60 78 C 80 62, 105 57, 120 57 C 135 57, 160 62, 180 78"
          stroke={copper}
          strokeWidth="2.5"
          fill="none"
        />

        {/* Mushroom Gills: Fine radiating lamellae curves from dome rim to stipe center */}
        <g stroke={copper} strokeWidth="1.2" opacity="0.85">
          <line x1="120" y1="23" x2="120" y2="57" />
          <line x1="116" y1="24" x2="117" y2="57" />
          <line x1="124" y1="24" x2="123" y2="57" />

          {/* Left radiating gills */}
          <path d="M 112 25 C 113 36, 114 47, 114 57" />
          <path d="M 106 28 C 108 38, 110 49, 111 58" />
          <path d="M 100 31 C 103 41, 106 51, 107 59" />
          <path d="M 94 35 C 98 44, 102 54, 104 60" />
          <path d="M 88 40 C 93 49, 98 57, 100 62" />
          <path d="M 82 46 C 88 54, 94 61, 96 64" />
          <path d="M 76 53 C 83 60, 90 66, 92 67" />
          <path d="M 70 61 C 77 67, 85 71, 88 72" />
          <path d="M 65 70 C 72 73, 79 76, 83 77" />

          {/* Right radiating gills */}
          <path d="M 128 25 C 127 36, 126 47, 126 57" />
          <path d="M 134 28 C 132 38, 130 49, 129 58" />
          <path d="M 140 31 C 137 41, 134 51, 133 59" />
          <path d="M 146 35 C 142 44, 138 54, 136 60" />
          <path d="M 152 40 C 147 49, 142 57, 140 62" />
          <path d="M 158 46 C 152 54, 146 61, 144 64" />
          <path d="M 164 53 C 157 60, 150 66, 148 67" />
          <path d="M 170 61 C 163 67, 155 71, 152 72" />
          <path d="M 175 70 C 168 73, 161 76, 157 77" />
        </g>

        {/* Central Stem (Stipe) striations cascading into volcanic peaks */}
        <g stroke={copper} strokeWidth="1.25" opacity="0.9">
          <line x1="112" y1="58" x2="112" y2="92" />
          <line x1="115" y1="57" x2="115" y2="88" />
          <line x1="118" y1="57" x2="118" y2="84" />
          <line x1="120" y1="57" x2="120" y2="83" />
          <line x1="122" y1="57" x2="122" y2="84" />
          <line x1="125" y1="57" x2="125" y2="88" />
          <line x1="128" y1="58" x2="128" y2="92" />
        </g>

        {/* Virunga Highland Clouds (floating mist wisps flanking mountains) */}
        <g stroke={copper} strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
          <path d="M 54 84 C 60 82, 64 85, 70 83" />
          <path d="M 52 92 C 58 90, 62 93, 68 91" />
          <path d="M 170 84 C 176 82, 180 85, 186 83" />
          <path d="M 172 92 C 178 90, 182 93, 188 91" />
        </g>

        {/* Volcanic Peaks: Virunga Massif (Mount Karisimbi & Mount Bisoke) */}
        <path
          d="M 52 118 L 98 78 L 102 81 L 107 79 L 126 102"
          stroke={copper}
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 98 78 C 101 80, 104 80, 107 79"
          stroke={copper}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 103 80 L 109 116"
          stroke={copper}
          strokeWidth="1.4"
        />
        <path
          d="M 92 84 L 75 118"
          stroke={copper}
          strokeWidth="1.2"
          opacity="0.8"
        />

        <path
          d="M 115 106 L 140 81 L 144 83 L 148 82 L 188 118"
          stroke={copper}
          strokeWidth="2.2"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M 140 81 C 143 83, 146 83, 148 82"
          stroke={copper}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 144 83 L 152 118"
          stroke={copper}
          strokeWidth="1.4"
        />
        <path
          d="M 147 84 L 168 118"
          stroke={copper}
          strokeWidth="1.2"
          opacity="0.8"
        />

        {/* Volcanic Terraces & Kinetic Soil Contour Waves (Kinigi foothills) */}
        <g stroke={copper} strokeWidth="1.8" fill="none">
          <path d="M 50 120 C 75 112, 100 128, 125 119 C 145 112, 168 122, 190 119" />
          <path d="M 52 128 C 78 122, 105 134, 130 126 C 152 120, 172 130, 188 127" />
          <path d="M 58 136 C 82 130, 110 141, 135 133 C 155 128, 172 137, 182 135" />
          <path d="M 72 144 C 95 140, 120 148, 145 142 C 158 139, 168 143, 172 143" />
        </g>

        {/* Subtle rising spore specks */}
        <circle cx="110" cy="38" r="0.9" fill={copper} opacity="0.7" />
        <circle cx="130" cy="36" r="0.9" fill={copper} opacity="0.7" />
        <circle cx="120" cy="30" r="1.1" fill={copper} opacity="0.8" />
      </g>
    </svg>
  );

  // Horizontal Brand Lockup (Default for Navbar)
  if (layout === 'horizontal') {
    const lockupContent = (
      <div className={`inline-flex items-center gap-3.5 group select-none ${className}`}>
        <CrestSVG iconSize={size || 44} />
        {showText && (
          <div className="flex flex-col justify-center">
            <span
              style={{ fontFamily: "'Merriweather', Georgia, serif", color: textColor }}
              className="text-xl sm:text-2xl font-bold tracking-[0.2em] leading-none transition-colors"
            >
              VŪNGA
            </span>
            <span
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-[10px] tracking-[0.35em] text-[#B86B43] uppercase font-semibold mt-1"
            >
              RWANDA
            </span>
            {showTagline && (
              <span
                style={{ fontFamily: "'Merriweather', Georgia, serif" }}
                className="text-[9px] italic text-[#B86B43]/80 tracking-wider mt-0.5"
              >
                Kinigi · 2,400m
              </span>
            )}
          </div>
        )}
      </div>
    );

    if (asLink) {
      return (
        <Link to="/" className="inline-block" aria-label="VŪNGA Rwanda Home">
          {lockupContent}
        </Link>
      );
    }
    return lockupContent;
  }

  // Vertical Stack Layout (Useful for Footers, Splash, Packaging)
  const verticalContent = (
    <div className={`inline-flex flex-col items-center text-center group select-none ${className}`}>
      <CrestSVG iconSize={size || 88} />
      {showText && (
        <div className="flex flex-col items-center mt-3">
          <span
            style={{ fontFamily: "'Merriweather', Georgia, serif", color: textColor }}
            className="text-2xl sm:text-3xl font-bold tracking-[0.2em] leading-none"
          >
            VŪNGA
          </span>
          <span
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-[11px] tracking-[0.35em] text-[#B86B43] uppercase font-semibold mt-1.5"
          >
            RWANDA
          </span>
          {showTagline && (
            <span
              style={{ fontFamily: "'Merriweather', Georgia, serif" }}
              className="text-[10px] italic text-[#B86B43]/80 tracking-widest mt-1"
            >
              Virunga Massif · Kinigi 2,400m
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" className="inline-block" aria-label="VŪNGA Rwanda Home">
        {verticalContent}
      </Link>
    );
  }

  return verticalContent;
};

export default VungaLogo;
