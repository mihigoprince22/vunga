import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

const defaultMeta = {
  title: 'VŪNGA RWANDA — Earthen Alchemy from the Virunga Mist',
  description: "Rwanda's premier functional mushroom house. Apothecary-grade dual-extracts, 75% Rwandan dark cacao, and fresh highland harvests cultivated at 2,400m on mineral-rich volcanic substrate in Kinigi, Musanze.",
  image: '/assets/03_home-hero-idle-16x9_4K.jpg',
  type: 'website',
};

const pageMeta: Record<string, { title: string; description: string; image?: string }> = {
  '/': {
    title: 'VŪNGA RWANDA — Earthen Alchemy from the Virunga Mist',
    description: 'Apothecary-grade functional mushroom extracts, 75% Rwandan dark cacao, and fresh highland harvests from the volcanic foothills of Kinigi. 100% fruiting body. Zero grain fillers.',
    image: '/assets/03_home-hero-idle-16x9_4K.jpg',
  },
  '/shop': {
    title: 'Shop All — VŪNGA Apothecary Collection',
    description: 'Browse 11 functional mushroom extracts and fresh Rwandan culinary harvests. Lion\'s Mane Focus, Highland Reishi Calm, 5-Defenders Immunity, Cordyceps Energy Cacao, and 7 fresh highland species.',
    image: '/assets/04_VUNGA_4SKU_Packaging_Suite.jpg',
  },
  '/science': {
    title: 'Our Science & COA — VŪNGA Rwanda',
    description: 'Why beta-glucans matter: VŪNGA 100% fruiting body extracts deliver >30% beta-D-glucans vs. <5% in typical mycelium-on-grain. Dual water + ethanol extraction. Every batch third-party verified.',
    image: '/assets/06_extraction-lab-copper-still-16x9_4K.jpg',
  },
  '/origin': {
    title: 'Virunga Origin — VŪNGA Rwanda',
    description: 'Cultivated at 2,400m elevation in the volcanic foothills of Kinigi, Musanze. From spore to shelf: volcanic basalt substrate, highland mist fruiting, hand-harvested at peak maturity, dual extraction, and women-led cooperatives.',
    image: '/assets/05_origin-virunga-mist-16x9_4K.jpg',
  },
  '/tasting-bar': {
    title: 'Kigali Tasting Bar & Wholesale — VŪNGA Rwanda',
    description: 'Visit the VŪNGA Apothecary & Tasting Bar in Kigali. Daily mushroom doses, The Virunga Trilogy Flight, reservations, and B2B wholesale for chefs, restaurants, and northern eco-lodges.',
    image: '/assets/08_venue-tasting-bar-interior-16x9_4K.jpg',
  },
};

const SEOHead: React.FC<SEOHeadProps> = ({ title, description, image, type }) => {
  const location = useLocation();

  useEffect(() => {
    const currentPageMeta = pageMeta[location.pathname];
    const finalTitle = title || currentPageMeta?.title || defaultMeta.title;
    const finalDescription = description || currentPageMeta?.description || defaultMeta.description;
    const finalImage = image || currentPageMeta?.image || defaultMeta.image;
    const finalType = type || defaultMeta.type;
    const baseUrl = 'https://vunga.rw';

    // Update document title
    document.title = finalTitle;

    // Helper to set or create meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Standard meta
    setMeta('name', 'description', finalDescription);

    // Open Graph
    setMeta('property', 'og:title', finalTitle);
    setMeta('property', 'og:description', finalDescription);
    setMeta('property', 'og:image', `${baseUrl}${finalImage}`);
    setMeta('property', 'og:url', `${baseUrl}${location.pathname}`);
    setMeta('property', 'og:type', finalType);

    // Twitter
    setMeta('name', 'twitter:title', finalTitle);
    setMeta('name', 'twitter:description', finalDescription);
    setMeta('name', 'twitter:image', `${baseUrl}${finalImage}`);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${baseUrl}${location.pathname}`);
  }, [location.pathname, title, description, image, type]);

  return null;
};

export default SEOHead;
