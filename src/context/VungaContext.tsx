import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { translations } from '../data/translations';
import type { Language } from '../data/translations';
import type { Product } from '../data/products';

export type { Language };
export type Currency = 'RWF' | 'USD';

export interface CartItem {
  productId: number;
  id: number | string;
  slug: string;
  name: string;
  image: string;
  priceRWF: number;
  priceUSD: number;
  priceRwf: number;
  priceUsd: number;
  quantity: number;
  format: string;
  isSubscription: boolean;
}

export type AddToCartInput =
  | Partial<CartItem> & { name: string }
  | {
      product: Product;
      quantity?: number;
      format?: string;
      isSubscription?: boolean;
    };

export interface VungaContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  toggleCurrency: () => void;
  cart: CartItem[];
  addToCart: (
    itemOrProduct: AddToCartInput | Product,
    quantity?: number,
    format?: string,
    isSubscription?: boolean
  ) => void;
  removeFromCart: (productId: number | string, format?: string, isSubscription?: boolean) => void;
  updateQuantity: (productId: number | string, quantity: number, format?: string, isSubscription?: boolean) => void;
  toggleSubscription: (productId: number | string, format?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  isQuizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;
  setIsQuizOpen: (open: boolean) => void;
  formatPrice: (rwf: number, usd?: number) => string;
  t: (key: string, vars?: Record<string, string | number>) => string;
  cartTotal: number;
  cartTotalRWF: number;
  cartTotalUSD: number;
  subtotalRwf: number;
  subtotalUsd: number;
  savingsRwf: number;
  savingsUsd: number;
  totalRwf: number;
  totalUsd: number;
  cartCount: number;
  freeGiftTier: 0 | 1 | 2;
  tier1Unlocked: boolean;
  tier2Unlocked: boolean;
  tier1ThresholdRwf: number;
  tier1ThresholdUsd: number;
  tier2ThresholdRwf: number;
  tier2ThresholdUsd: number;
  hasSubscription: boolean;
  notification: string | null;
  showNotification: (msg: string) => void;
}

const VungaContext = createContext<VungaContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'vunga_cart_v1';
const LANG_STORAGE_KEY = 'vunga_lang_v1';
const CURR_STORAGE_KEY = 'vunga_curr_v1';

const TIER_1_THRESHOLD_RWF = 40000;
const TIER_1_THRESHOLD_USD = 30;
const TIER_2_THRESHOLD_RWF = 95000;
const TIER_2_THRESHOLD_USD = 70;

export const VungaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'EN' || saved === 'RW' || saved === 'FR') return saved;
    } catch {
      // Fallback
    }
    return 'EN';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    try {
      const saved = localStorage.getItem(CURR_STORAGE_KEY);
      if (saved === 'RWF' || saved === 'USD') return saved;
    } catch {
      // Fallback
    }
    return 'RWF';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
    } catch {
      // Ignore
    }
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem(CURR_STORAGE_KEY, currency);
    } catch {
      // Ignore
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const setCurrency = useCallback((curr: Currency) => {
    setCurrencyState(curr);
  }, []);

  const toggleCurrency = useCallback(() => {
    setCurrencyState((prev) => (prev === 'RWF' ? 'USD' : 'RWF'));
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openQuiz = useCallback(() => setIsQuizOpen(true), []);
  const closeQuiz = useCallback(() => setIsQuizOpen(false), []);

  const showNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3500);
  }, []);

  const addToCart = useCallback(
    (
      itemOrProduct: AddToCartInput | Product,
      extraQty?: number,
      extraFormat?: string,
      extraSub?: boolean
    ) => {
      let finalProductId = 1;
      let finalSlug = '';
      let finalName = '';
      let finalImage = '';
      let finalPriceRWF = 0;
      let finalPriceUSD = 0;
      let finalFormat = 'Standard';
      let finalQty = extraQty && extraQty > 0 ? extraQty : 1;
      let finalSub = extraSub !== undefined ? extraSub : false;

      const anyObj = itemOrProduct as any;

      if ('product' in anyObj && anyObj.product) {
        const p = anyObj.product as Product;
        finalProductId = p.id;
        finalSlug = p.slug;
        finalName = p.name;
        finalImage = p.image;
        finalPriceRWF = p.priceRWF;
        finalPriceUSD = p.priceUSD;
        finalFormat = anyObj.format || (p.formats && p.formats[0]) || p.weight || 'Standard';
        finalQty = anyObj.quantity || extraQty || 1;
        finalSub = anyObj.isSubscription ?? extraSub ?? false;
      } else if ('category' in anyObj && 'species' in anyObj) {
        const p = anyObj as Product;
        finalProductId = p.id;
        finalSlug = p.slug;
        finalName = p.name;
        finalImage = p.image;
        finalPriceRWF = p.priceRWF;
        finalPriceUSD = p.priceUSD;
        finalFormat = extraFormat || (p.formats && p.formats[0]) || p.weight || 'Standard';
        finalQty = extraQty || 1;
        finalSub = extraSub || false;
      } else {
        if (typeof anyObj.productId === 'number') {
          finalProductId = anyObj.productId;
        } else if (typeof anyObj.id === 'number') {
          finalProductId = anyObj.id;
        } else if (typeof anyObj.id === 'string') {
          const parsed = parseInt(anyObj.id, 10);
          finalProductId = isNaN(parsed) ? 1 : parsed;
        }
        finalSlug = anyObj.slug || '';
        finalName = anyObj.name || '';
        finalImage = anyObj.image || '';
        finalPriceRWF = anyObj.priceRWF ?? anyObj.priceRwf ?? 0;
        finalPriceUSD = anyObj.priceUSD ?? anyObj.priceUsd ?? Math.round(finalPriceRWF / 1350);
        finalFormat = anyObj.format || extraFormat || 'Standard';
        finalQty = anyObj.quantity || extraQty || 1;
        finalSub = anyObj.isSubscription ?? extraSub ?? false;
      }

      setCart((prevCart) => {
        const index = prevCart.findIndex(
          (ci) =>
            ci.productId === finalProductId &&
            ci.format === finalFormat &&
            ci.isSubscription === finalSub
        );

        if (index > -1) {
          const updated = [...prevCart];
          updated[index] = {
            ...updated[index],
            quantity: updated[index].quantity + finalQty,
          };
          return updated;
        } else {
          return [
            ...prevCart,
            {
              productId: finalProductId,
              id: `${finalProductId}-${finalFormat}-${finalSub ? 'sub' : 'one'}`,
              slug: finalSlug,
              name: finalName,
              image: finalImage,
              priceRWF: finalPriceRWF,
              priceUSD: finalPriceUSD,
              priceRwf: finalPriceRWF,
              priceUsd: finalPriceUSD,
              quantity: finalQty,
              format: finalFormat,
              isSubscription: finalSub,
            },
          ];
        }
      });

      showNotification(`Added ${finalName} to Apothecary Bag`);
      setIsCartOpen(true);
    },
    [showNotification]
  );

  const removeFromCart = useCallback(
    (productId: number | string, format?: string, isSubscription?: boolean) => {
      const numId = typeof productId === 'string' ? parseInt(productId, 10) : productId;
      setCart((prevCart) =>
        prevCart.filter((ci) => {
          if (ci.id === productId) return false;
          if (ci.productId !== numId) return true;
          if (format !== undefined && ci.format !== format) return true;
          if (isSubscription !== undefined && ci.isSubscription !== isSubscription) return true;
          return false;
        })
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: number | string, quantity: number, format?: string, isSubscription?: boolean) => {
      if (quantity <= 0) {
        removeFromCart(productId, format, isSubscription);
        return;
      }
      const numId = typeof productId === 'string' ? parseInt(productId, 10) : productId;
      setCart((prevCart) =>
        prevCart.map((ci) => {
          const match =
            (ci.id === productId || ci.productId === numId) &&
            (format === undefined || ci.format === format) &&
            (isSubscription === undefined || ci.isSubscription === isSubscription);

          if (match) {
            return { ...ci, quantity };
          }
          return ci;
        })
      );
    },
    [removeFromCart]
  );

  const toggleSubscription = useCallback((productId: number | string, format?: string) => {
    const numId = typeof productId === 'string' ? parseInt(productId, 10) : productId;
    setCart((prevCart) =>
      prevCart.map((ci) => {
        if ((ci.id === productId || ci.productId === numId) && (!format || ci.format === format)) {
          const newSub = !ci.isSubscription;
          return {
            ...ci,
            isSubscription: newSub,
            id: `${ci.productId}-${ci.format}-${newSub ? 'sub' : 'one'}`,
          };
        }
        return ci;
      })
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const formatPrice = useCallback(
    (rwf: number, usd?: number): string => {
      if (currency === 'RWF') {
        return `${Math.round(rwf).toLocaleString('en-US')} RWF`;
      } else {
        const val = usd !== undefined ? usd : rwf / 1350;
        return val % 1 === 0 ? `$${val}` : `$${val.toFixed(2)}`;
      }
    },
    [currency]
  );

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const parts = key.split('.');
      let current: any = translations[language];
      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          current = undefined;
          break;
        }
      }

      if (current === undefined && language !== 'EN') {
        let fallback: any = translations['EN'];
        for (const part of parts) {
          if (fallback && typeof fallback === 'object' && part in fallback) {
            fallback = fallback[part];
          } else {
            fallback = undefined;
            break;
          }
        }
        current = fallback;
      }

      let result = typeof current === 'string' ? current : key;

      if (vars && typeof result === 'string') {
        for (const [vKey, val] of Object.entries(vars)) {
          result = result.replace(new RegExp(`\\{${vKey}\\}`, 'g'), String(val));
        }
      }

      return result;
    },
    [language]
  );

  // Cart financial totals and gift milestone calculations
  const {
    subtotalRwf,
    subtotalUsd,
    savingsRwf,
    savingsUsd,
    totalRwf,
    totalUsd,
    cartCount,
    hasSubscription,
    freeGiftTier,
    tier1Unlocked,
    tier2Unlocked,
  } = useMemo(() => {
    let count = 0;
    let baseRwf = 0;
    let baseUsd = 0;
    let finalRwf = 0;
    let finalUsd = 0;
    let hasSub = false;

    for (const item of cart) {
      count += item.quantity;
      const itemPriceRwf = item.priceRwf ?? item.priceRWF ?? 0;
      const itemPriceUsd = item.priceUsd ?? item.priceUSD ?? Math.round(itemPriceRwf / 1350);

      baseRwf += itemPriceRwf * item.quantity;
      baseUsd += itemPriceUsd * item.quantity;

      if (item.isSubscription) {
        hasSub = true;
        finalRwf += Math.round(itemPriceRwf * 0.85) * item.quantity;
        finalUsd += Number((itemPriceUsd * 0.85).toFixed(2)) * item.quantity;
      } else {
        finalRwf += itemPriceRwf * item.quantity;
        finalUsd += itemPriceUsd * item.quantity;
      }
    }

    const savedRwf = Math.max(0, baseRwf - finalRwf);
    const savedUsd = Math.max(0, Number((baseUsd - finalUsd).toFixed(2)));

    // Tier 1: 40,000 RWF / $30+ OR any subscription item
    // Tier 2: 95,000 RWF / $70+ OR 3+ items
    const t2Unlocked = finalRwf >= TIER_2_THRESHOLD_RWF || finalUsd >= TIER_2_THRESHOLD_USD || count >= 3;
    const t1Unlocked = t2Unlocked || finalRwf >= TIER_1_THRESHOLD_RWF || finalUsd >= TIER_1_THRESHOLD_USD || hasSub;

    let tier: 0 | 1 | 2 = 0;
    if (t2Unlocked) {
      tier = 2;
    } else if (t1Unlocked) {
      tier = 1;
    }

    return {
      subtotalRwf: Math.round(baseRwf),
      subtotalUsd: baseUsd,
      savingsRwf: savedRwf,
      savingsUsd: savedUsd,
      totalRwf: Math.round(finalRwf),
      totalUsd: finalUsd,
      cartCount: count,
      hasSubscription: hasSub,
      freeGiftTier: tier,
      tier1Unlocked: t1Unlocked,
      tier2Unlocked: t2Unlocked,
    };
  }, [cart]);

  const cartTotal = currency === 'RWF' ? totalRwf : totalUsd;

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      currency,
      setCurrency,
      toggleCurrency,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleSubscription,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      setIsCartOpen,
      isQuizOpen,
      openQuiz,
      closeQuiz,
      setIsQuizOpen,
      formatPrice,
      t,
      cartTotal,
      cartTotalRWF: totalRwf,
      cartTotalUSD: totalUsd,
      subtotalRwf,
      subtotalUsd,
      savingsRwf,
      savingsUsd,
      totalRwf,
      totalUsd,
      cartCount,
      freeGiftTier,
      tier1Unlocked,
      tier2Unlocked,
      tier1ThresholdRwf: TIER_1_THRESHOLD_RWF,
      tier1ThresholdUsd: TIER_1_THRESHOLD_USD,
      tier2ThresholdRwf: TIER_2_THRESHOLD_RWF,
      tier2ThresholdUsd: TIER_2_THRESHOLD_USD,
      hasSubscription,
      notification,
      showNotification,
    }),
    [
      language,
      setLanguage,
      currency,
      setCurrency,
      toggleCurrency,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleSubscription,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      setIsCartOpen,
      isQuizOpen,
      openQuiz,
      closeQuiz,
      setIsQuizOpen,
      formatPrice,
      t,
      cartTotal,
      totalRwf,
      totalUsd,
      subtotalRwf,
      subtotalUsd,
      savingsRwf,
      savingsUsd,
      cartCount,
      freeGiftTier,
      tier1Unlocked,
      tier2Unlocked,
      hasSubscription,
      notification,
      showNotification,
    ]
  );

  return <VungaContext.Provider value={value}>{children}</VungaContext.Provider>;
};

export const useVunga = (): VungaContextType => {
  const context = useContext(VungaContext);
  if (!context) {
    throw new Error('useVunga must be used within a VungaProvider');
  }
  return context;
};

export default VungaContext;
