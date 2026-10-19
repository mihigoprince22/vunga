import React from 'react';
import { Link } from 'react-router-dom';

export interface VungaLogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: 'light' | 'dark';
  showText?: boolean;
  showTagline?: boolean;
  asLink?: boolean;
  className?: string;
  size?: number | string;
}

export const VungaLogo: React.FC<VungaLogoProps> = ({
  variant = 'dark',
  showText = true,
  showTagline = false,
  asLink = false,
  className = '',
  size,
  ...props
}) => {
  // Brand color tokens
  const copper = '#B86B43';
  const textColor = variant === 'light' ? '#EAE8E1' : '#222423';
  const subtextColor = copper;

  // ViewBox: adjust height if showText is false
  const viewBox = showText ? '0 0 240 260' : '0 0 240 170';
  const defaultHeight = showText ? '100%' : '100%';

  const svgContent = (
    <svg
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      style={{
        width: size ? size : undefined,
        height: size ? (showText ? size : (typeof size === 'number' ? size * 0.7 : size)) : defaultHeight,
        maxWidth: '100%',
      }}
      aria-label="VŪNGA Rwanda Crest Logo"
      {...props}
    >
      <defs>
        {/* Clip path to keep crest inner linework contained within the circular seal */}
        <clipPath id="crestCircleClip">
          <circle cx="120" cy="85" r="66" />
        </clipPath>
      </defs>

      {/* ========================================================= */}
      {/* 1. CREST EMBLEM: Virunga Massif & Volcanic Mushroom Canopy */}
      {/* ========================================================= */}
      <g id="virunga-crest">
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
          strokeWidth="0.75"
          strokeDasharray="2 2"
          fill="none"
          opacity="0.6"
        />

        {/* Elements clipped inside the circular seal */}
        <g clipPath="url(#crestCircleClip)">
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
            {/* Center vertical gill lines */}
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
      </g>

      {/* ========================================================= */}
      {/* 2. BRAND TYPOGRAPHY: VŪNGA RWANDA                         */}
      {/* ========================================================= */}
      {showText && (
        <g id="brand-typography">
          {/* VŪNGA Wordmark in luxury serif */}
          <text
            x="120"
            y="204"
            textAnchor="middle"
            fill={textColor}
            style={{
              fontFamily: "'Merriweather', Georgia, 'Times New Roman', serif",
              fontSize: '32px',
              fontWeight: 400,
              letterSpacing: '0.18em',
            }}
          >
            VŪNGA
          </text>

          {/* RWANDA subtitle in spaced mono */}
          <text
            x="120"
            y="232"
            textAnchor="middle"
            fill={subtextColor}
            style={{
              fontFamily: "'DM Mono', 'Plus Jakarta Sans', monospace, sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.36em',
            }}
          >
            RWANDA
          </text>

          {showTagline && (
            <text
              x="120"
              y="252"
              textAnchor="middle"
              fill={copper}
              style={{
                fontFamily: "'Merriweather', Georgia, serif",
                fontSize: '8px',
                fontStyle: 'italic',
                letterSpacing: '0.1em',
                opacity: 0.85,
              }}
            >
              Virunga Massif · Kinigi 2,400m
            </text>
          )}
        </g>
      )}
    </svg>
  );

  if (asLink) {
    return (
      <Link to="/" className="inline-block" aria-label="VŪNGA Rwanda Home">
        {svgContent}
      </Link>
    );
  }

  return svgContent;
};

export default VungaLogo;
