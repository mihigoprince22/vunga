import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Plus,
  Minus,
  Trash2,
  Check,
  Sparkles,
  Gift,
  Truck,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useVunga } from '../context/VungaContext'
import CheckoutModal from './CheckoutModal'

type PaymentMethod = 'momo' | 'bk' | 'card'

const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cart,
    cartCount,
    updateQuantity,
    removeFromCart,
    toggleSubscription,
    currency,
    formatPrice,
    subtotalRwf,
    subtotalUsd,
    savingsRwf,
    savingsUsd,
    totalRwf,
    totalUsd,
    tier1Unlocked,
    tier2Unlocked,
    tier1ThresholdRwf,
    tier1ThresholdUsd,
    tier2ThresholdRwf,
    tier2ThresholdUsd,
  } = useVunga()

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('momo')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const navigate = useNavigate()

  // Calculate gift progress percentage towards Tier 2 (the grand milestone)
  const currentTotal = currency === 'RWF' ? totalRwf : totalUsd
  const targetTier1 = currency === 'RWF' ? tier1ThresholdRwf : tier1ThresholdUsd
  const targetTier2 = currency === 'RWF' ? tier2ThresholdRwf : tier2ThresholdUsd

  const overallProgress = Math.min(100, Math.round((currentTotal / targetTier2) * 100))

  const remainingForTier1 = Math.max(0, targetTier1 - currentTotal)
  const remainingForTier2 = Math.max(0, targetTier2 - currentTotal)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      setIsCheckingOut(false)
      closeCart()
      setIsCheckoutModalOpen(true)
    }, 600)
  }

  const handleShopRedirect = () => {
    closeCart()
    navigate('/shop')
  }

  return (
    <>
      <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Slide-out Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="w-screen max-w-full sm:w-[420px] bg-[#141515] text-[#EAE8E1] shadow-2xl flex flex-col border-l border-white/10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-drawer-heading"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-volcanic-deep shrink-0">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-oxidized-copper" />
                  <h2
                    id="cart-drawer-heading"
                    className="font-serif text-lg font-bold tracking-wide text-kinigi-mist"
                  >
                    Apothecary Satchel
                  </h2>
                  <span className="font-mono text-xs text-spore-gold bg-spore-gold/15 px-2 py-0.5 border border-spore-gold/30">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="p-1.5 text-kinigi-mist/70 hover:text-white transition-colors focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Gift Progress Bar Section */}
              <div className="px-6 py-4 bg-volcanic-ash/40 border-b border-white/10 shrink-0">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <div className="flex items-center gap-1.5 text-kinigi-mist">
                    <Gift className="w-4 h-4 text-spore-gold shrink-0" />
                    <span>Apothecary Tier Rewards</span>
                  </div>
                  <span className="text-spore-gold font-semibold">
                    {tier2Unlocked
                      ? 'All Rewards Unlocked!'
                      : tier1Unlocked
                      ? `Add ${formatPrice(remainingForTier2)} for Tote`
                      : `Add ${formatPrice(remainingForTier1)} for Scoop`}
                  </span>
                </div>

                {/* Progress Track */}
                <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-oxidized-copper rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>

                {/* Tiers Visual Cards */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
                  {/* Tier 1 */}
                  <div
                    className={`p-2 border transition-all ${
                      tier1Unlocked
                        ? 'border-spore-gold/60 bg-spore-gold/10'
                        : 'border-white/10 bg-white/5 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded bg-black/40 p-0.5 overflow-hidden shrink-0 border border-white/10">
                        <img
                          src="/assets/16_cutout-03-copper-dosing-scoop.png"
                          alt="Copper Dosing Scoop"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[9px] text-spore-gold uppercase">
                          Tier 1 ({formatPrice(tier1ThresholdRwf, tier1ThresholdUsd)})
                        </div>
                        <div className="font-medium text-kinigi-mist truncate text-[11px]">
                          Copper Dosing Scoop
                        </div>
                      </div>
                    </div>
                    {tier1Unlocked ? (
                      <div className="flex items-center gap-1 text-[10px] font-mono text-spore-gold font-bold">
                        <Check className="w-3 h-3 text-spore-gold" />
                        <span>UNLOCKED</span>
                      </div>
                    ) : (
                      <div className="font-mono text-[9px] text-kinigi-mist/50">
                        {remainingForTier1 > 0 ? `+${formatPrice(remainingForTier1)} needed` : ''}
                      </div>
                    )}
                  </div>

                  {/* Tier 2 */}
                  <div
                    className={`p-2 border transition-all ${
                      tier2Unlocked
                        ? 'border-spore-gold/60 bg-spore-gold/10'
                        : 'border-white/10 bg-white/5 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded bg-black/40 p-0.5 overflow-hidden shrink-0 border border-white/10">
                        <img
                          src="/assets/Output_01_VUNGA_Asset_Kit.jpg"
                          alt="VŪNGA Canvas Tote & Dosing Stamp Card"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-[9px] text-spore-gold uppercase">
                          Tier 2 ({formatPrice(tier2ThresholdRwf, tier2ThresholdUsd)})
                        </div>
                        <div className="font-medium text-kinigi-mist truncate text-[11px]">
                          Canvas Tote & Stamp
                        </div>
                      </div>
                    </div>
                    {tier2Unlocked ? (
                      <div className="flex items-center gap-1 text-[10px] font-mono text-spore-gold font-bold">
                        <Check className="w-3 h-3 text-spore-gold" />
                        <span>UNLOCKED</span>
                      </div>
                    ) : (
                      <div className="font-mono text-[9px] text-kinigi-mist/50">
                        {remainingForTier2 > 0 ? `+${formatPrice(remainingForTier2)} needed` : ''}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Cart Items List — Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-16 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-kinigi-mist/50">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-kinigi-mist mb-2">
                      Your Satchel is Empty
                    </h3>
                    <p className="text-xs text-kinigi-mist/60 max-w-xs mb-6 font-sans leading-relaxed">
                      Discover our high-altitude dual-extracts and fresh Virunga harvests to begin your daily ritual.
                    </p>
                    <button
                      onClick={handleShopRedirect}
                      className="px-6 py-3 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-colors"
                    >
                      Explore Dispensary
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="bg-white/5 border border-white/10 p-3.5 space-y-3 group hover:border-white/20 transition-all"
                      >
                        {/* Item top row: Image, Title, Stepper, Price, Remove */}
                        <div className="flex items-start gap-3">
                          {/* Image */}
                          <div className="w-16 h-16 rounded bg-black/40 overflow-hidden shrink-0 border border-white/10">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-serif text-sm font-semibold text-kinigi-mist leading-tight truncate">
                              {item.name}
                            </h4>
                            <span className="font-mono text-[10px] text-oxidized-copper block mt-0.5">
                              {item.format}
                            </span>

                            {/* Stepper & Price row */}
                            <div className="flex items-center justify-between mt-2.5">
                              {/* Quantity Stepper */}
                              <div className="inline-flex items-center border border-white/20 bg-black/30">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="p-1 hover:text-oxidized-copper hover:bg-white/5 transition-colors focus:outline-none"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="font-mono text-xs px-2.5 font-semibold text-kinigi-mist select-none">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="p-1 hover:text-oxidized-copper hover:bg-white/5 transition-colors focus:outline-none"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                {item.isSubscription ? (
                                  <div className="flex items-baseline gap-1.5">
                                    <span className="font-mono text-[11px] line-through text-kinigi-mist/40">
                                      {formatPrice(
                                        item.priceRwf * item.quantity,
                                        item.priceUsd * item.quantity
                                      )}
                                    </span>
                                    <span className="font-mono text-xs font-bold text-spore-gold">
                                      {formatPrice(
                                        Math.round(item.priceRwf * item.quantity * 0.85),
                                        item.priceUsd * item.quantity * 0.85
                                      )}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="font-mono text-xs font-bold text-kinigi-mist">
                                    {formatPrice(
                                      item.priceRwf * item.quantity,
                                      item.priceUsd * item.quantity
                                    )}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-kinigi-mist/40 hover:text-red-400 transition-colors focus:outline-none"
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Subscription Selector Toggle */}
                        <div className="pt-2 border-t border-white/5">
                          <button
                            onClick={() => toggleSubscription(item.id)}
                            className={`w-full py-1.5 px-2.5 text-left text-[11px] font-mono flex items-center justify-between border transition-all ${
                              item.isSubscription
                                ? 'border-oxidized-copper bg-oxidized-copper/15 text-kinigi-mist'
                                : 'border-white/10 bg-white/5 text-kinigi-mist/70 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                                  item.isSubscription
                                    ? 'border-oxidized-copper bg-oxidized-copper text-white'
                                    : 'border-white/30'
                                }`}
                              >
                                {item.isSubscription && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </span>
                              <span className="font-medium">
                                Subscribe & Save 15% + Free Copper Scoop
                              </span>
                            </div>
                            <span className="text-spore-gold text-[10px] font-bold">
                              {item.isSubscription ? 'ACTIVE' : 'SAVE 15%'}
                            </span>
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}

                {/* Free Gifts Summary Notice */}
                {(tier1Unlocked || tier2Unlocked) && (
                  <div className="p-3 bg-spore-gold/10 border border-spore-gold/30 space-y-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-spore-gold font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Free Apothecary Gifts Included:
                    </span>
                    <ul className="text-xs space-y-1 text-kinigi-mist font-sans">
                      {tier1Unlocked && (
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-spore-gold shrink-0" />
                          <span>Brushed Oxidized Copper 2g Dosing Scoop</span>
                        </li>
                      )}
                      {tier2Unlocked && (
                        <li className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-spore-gold shrink-0" />
                          <span>VŪNGA Canvas Tote & Dosing Stamp Card</span>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Cart Summary & Checkout Footer */}
              {cart.length > 0 && (
                <div className="px-6 py-5 border-t border-white/10 bg-volcanic-deep space-y-4 shrink-0">
                  {/* Totals */}
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-kinigi-mist/70">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotalRwf, subtotalUsd)}</span>
                    </div>

                    {(savingsRwf > 0 || savingsUsd > 0) && (
                      <div className="flex justify-between text-spore-gold">
                        <span>Subscription Savings (15%)</span>
                        <span>-{formatPrice(savingsRwf, savingsUsd)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-base font-serif font-bold text-kinigi-mist pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span className="font-mono text-spore-gold">
                        {formatPrice(totalRwf, totalUsd)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-wider text-kinigi-mist/60 block">
                      Express Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => setSelectedPayment('momo')}
                        className={`p-2 text-center border transition-all ${
                          selectedPayment === 'momo'
                            ? 'border-oxidized-copper bg-oxidized-copper/20 text-white font-bold'
                            : 'border-white/10 bg-white/5 text-kinigi-mist/70 hover:bg-white/10'
                        }`}
                      >
                        MTN MoMo
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPayment('bk')}
                        className={`p-2 text-center border transition-all ${
                          selectedPayment === 'bk'
                            ? 'border-oxidized-copper bg-oxidized-copper/20 text-white font-bold'
                            : 'border-white/10 bg-white/5 text-kinigi-mist/70 hover:bg-white/10'
                        }`}
                      >
                        BK / Urubuto
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPayment('card')}
                        className={`p-2 text-center border transition-all ${
                          selectedPayment === 'card'
                            ? 'border-oxidized-copper bg-oxidized-copper/20 text-white font-bold'
                            : 'border-white/10 bg-white/5 text-kinigi-mist/70 hover:bg-white/10'
                        }`}
                      >
                        Visa / Apple Pay
                      </button>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div className="p-2.5 bg-black/40 border border-white/5 space-y-1 text-[11px] font-mono text-kinigi-mist/60">
                    <div className="flex items-center gap-1.5 text-kinigi-mist/90">
                      <Truck className="w-3.5 h-3.5 text-oxidized-copper shrink-0" />
                      <span>Same-day Kigali delivery: Nyarutarama, Kimihurura, Kiyovu, Kacyiru, Remera</span>
                    </div>
                    <div className="text-[10px] text-kinigi-mist/50 pl-5">
                      DHL Express International dispatch available worldwide.
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-oxidized-copper hover:bg-oxidized-copper/90 text-white font-sans text-xs uppercase tracking-widest font-semibold transition-all duration-200 shadow-xl shadow-oxidized-copper/20 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                  >
                    {isCheckingOut ? (
                      <span className="animate-pulse flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-spore-gold" />
                        Authorizing Ritual...
                      </span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-spore-gold" />
                        <span>Proceed to Checkout</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>

    <CheckoutModal
      isOpen={isCheckoutModalOpen}
      onClose={() => setIsCheckoutModalOpen(false)}
    />
  </>
  )
}

export default CartDrawer
