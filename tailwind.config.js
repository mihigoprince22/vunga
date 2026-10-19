/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'volcanic-ash': '#222423',
        'volcanic-deep': '#141515',
        'kinigi-mist': '#EAE8E1',
        'kinigi-paper': '#F4F2EC',
        'oxidized-copper': '#B86B43',
        'verdigris-bamboo': '#527361',
        'musanze-terracotta': '#8C3F2B',
        'spore-gold': '#D4AF6A',
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      letterSpacing: {
        'sku': '0.14em',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 45s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
