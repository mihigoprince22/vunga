import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  Truck,
  Building,
  Plane,
  CreditCard,
  Smartphone,
  Printer,
  Check,
  Sparkles,
  ArrowRight,
  Gift,
} from 'lucide-react';
import { useVunga } from '../context/VungaContext';
import { useNavigate } from 'react-router-dom';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    subtotalRwf,
    subtotalUsd,
    formatPrice,
    clearCart,
    tier1Unlocked,
    tier2Unlocked,
  } = useVunga();

  const navigate = useNavigate();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+250 ');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<
    'same-day' | 'pickup' | 'dhl'
  >('same-day');
  const [paymentMethod, setPaymentMethod] = useState<
    'momo' | 'bk' | 'card'
  >('momo');

  // Submission & Confirmation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');
  const [confirmedDate, setConfirmedDate] = useState('');

  // Delivery fee calculation
  const deliveryFeeRWF = deliveryMode === 'dhl' ? 20000 : 0;
  const deliveryFeeUSD = deliveryMode === 'dhl' ? 15 : 0;

  const finalTotalRWF = subtotalRwf + deliveryFeeRWF;
  const finalTotalUSD = Number((subtotalUsd + deliveryFeeUSD).toFixed(2));

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || phone.trim().length < 9) {
      alert('Please provide your name and a valid phone number for dispatch tracking.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `VNG-RW-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmedOrderId(generatedId);
      setConfirmedDate(new Date().toLocaleDateString('en-RW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }));
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 900);
  };

  const handleFinishAndReturn = () => {
    clearCart();
    setIsConfirmed(false);
    onClose();
    navigate('/shop');
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (isConfirmed) {
                handleFinishAndReturn();
              } else {
                onClose();
              }
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#141515] border border-[#B86B43]/40 shadow-2xl rounded-xl text-[#EAE8E1] overflow-hidden z-10 flex flex-col my-auto max-h-[92vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Bar */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#B86B43]" />
                <h3 className="font-serif text-lg font-bold tracking-wide text-[#EAE8E1]">
                  {isConfirmed ? 'Ritual Order Confirmed' : 'Checkout & Delivery Authorization'}
                </h3>
              </div>

              <button
                onClick={() => {
                  if (isConfirmed) {
                    handleFinishAndReturn();
                  } else {
                    onClose();
                  }
                }}
                aria-label="Close checkout modal"
                className="p-1.5 text-[#EAE8E1]/70 hover:text-white transition-colors focus:outline-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              {!isConfirmed ? (
                /* CHECKOUT FORM */
                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  {/* Step 1: Customer Info */}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#D4AF6A] font-semibold mb-3 flex items-center gap-2">
                      <span>01. Recipient Information</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-[#EAE8E1]/70 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Jean-Paul Karasira"
                          className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded text-sm text-[#EAE8E1] focus:outline-none focus:border-[#B86B43]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-[#EAE8E1]/70 mb-1">
                          Phone (MTN / Airtel / Int&apos;l) *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+250 788 123 456"
                          className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded text-sm text-[#EAE8E1] focus:outline-none focus:border-[#B86B43]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Delivery Mode */}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#D4AF6A] font-semibold mb-3 flex items-center gap-2">
                      <span>02. Select Delivery Mode</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setDeliveryMode('same-day')}
                        className={`p-3 text-left border rounded-lg transition-all cursor-pointer flex flex-col justify-between ${
                          deliveryMode === 'same-day'
                            ? 'border-[#B86B43] bg-[#B86B43]/20 ring-1 ring-[#B86B43]'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-xs font-bold text-[#EAE8E1] mb-1">
                          <Truck className="w-4 h-4 text-[#D4AF6A]" />
                          <span>Same-Day Kigali</span>
                        </div>
                        <p className="text-[11px] text-[#EAE8E1]/70 leading-snug">
                          Nyarutarama, Kimihurura, Kiyovu, Kacyiru, Remera
                        </p>
                        <span className="font-mono text-[10px] text-emerald-400 mt-2 font-semibold">
                          FREE
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryMode('pickup')}
                        className={`p-3 text-left border rounded-lg transition-all cursor-pointer flex flex-col justify-between ${
                          deliveryMode === 'pickup'
                            ? 'border-[#B86B43] bg-[#B86B43]/20 ring-1 ring-[#B86B43]'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-xs font-bold text-[#EAE8E1] mb-1">
                          <Building className="w-4 h-4 text-[#D4AF6A]" />
                          <span>Kigali Tasting Bar</span>
                        </div>
                        <p className="text-[11px] text-[#EAE8E1]/70 leading-snug">
                          KG 674 St, Kimihurura (Ready in 30 mins)
                        </p>
                        <span className="font-mono text-[10px] text-emerald-400 mt-2 font-semibold">
                          COMPLIMENTARY
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeliveryMode('dhl')}
                        className={`p-3 text-left border rounded-lg transition-all cursor-pointer flex flex-col justify-between ${
                          deliveryMode === 'dhl'
                            ? 'border-[#B86B43] bg-[#B86B43]/20 ring-1 ring-[#B86B43]'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2 text-xs font-bold text-[#EAE8E1] mb-1">
                          <Plane className="w-4 h-4 text-[#D4AF6A]" />
                          <span>DHL Express</span>
                        </div>
                        <p className="text-[11px] text-[#EAE8E1]/70 leading-snug">
                          Worldwide 3–5 Day International Courier
                        </p>
                        <span className="font-mono text-[10px] text-[#D4AF6A] mt-2 font-semibold">
                          +20,000 RWF ($15)
                        </span>
                      </button>
                    </div>

                    {deliveryMode !== 'pickup' && (
                      <div className="mt-3">
                        <label className="block text-xs font-mono text-[#EAE8E1]/70 mb-1">
                          Delivery Street / Villa / Landmark *
                        </label>
                        <input
                          type="text"
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="e.g. KG 9 Ave, Villa 14, Nyarutarama (or international address)"
                          className="w-full px-3.5 py-2.5 bg-black/40 border border-white/15 rounded text-sm text-[#EAE8E1] focus:outline-none focus:border-[#B86B43]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Step 3: Payment Method */}
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#D4AF6A] font-semibold mb-3 flex items-center gap-2">
                      <span>03. Payment Rail</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('momo')}
                        className={`p-3.5 text-left border rounded-lg transition-all cursor-pointer flex items-center gap-3 ${
                          paymentMethod === 'momo'
                            ? 'border-[#B86B43] bg-[#B86B43]/20 ring-1 ring-[#B86B43]'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <Smartphone className="w-5 h-5 text-yellow-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-[#EAE8E1]">
                            MTN Mobile Money
                          </div>
                          <div className="text-[10px] text-[#EAE8E1]/60">
                            Instant MoMoPush Prompt
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bk')}
                        className={`p-3.5 text-left border rounded-lg transition-all cursor-pointer flex items-center gap-3 ${
                          paymentMethod === 'bk'
                            ? 'border-[#B86B43] bg-[#B86B43]/20 ring-1 ring-[#B86B43]'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <Building className="w-5 h-5 text-blue-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-[#EAE8E1]">
                            Bank of Kigali
                          </div>
                          <div className="text-[10px] text-[#EAE8E1]/60">
                            UrubutoPay Direct Rail
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3.5 text-left border rounded-lg transition-all cursor-pointer flex items-center gap-3 ${
                          paymentMethod === 'card'
                            ? 'border-[#B86B43] bg-[#B86B43]/20 ring-1 ring-[#B86B43]'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-[#EAE8E1]">
                            Card / Apple Pay
                          </div>
                          <div className="text-[10px] text-[#EAE8E1]/60">
                            Visa, Mastercard, Amex
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Summary Box & Rewards */}
                  <div className="p-4 bg-black/40 border border-white/10 rounded-lg space-y-2">
                    <div className="flex justify-between text-xs font-mono text-[#EAE8E1]/80">
                      <span>Satchel Subtotal ({cart.length} items)</span>
                      <span>{formatPrice(subtotalRwf, subtotalUsd)}</span>
                    </div>

                    {deliveryFeeRWF > 0 && (
                      <div className="flex justify-between text-xs font-mono text-[#D4AF6A]">
                        <span>DHL Express International Fee</span>
                        <span>{formatPrice(deliveryFeeRWF, deliveryFeeUSD)}</span>
                      </div>
                    )}

                    {/* Unlocked Free Gifts */}
                    {(tier1Unlocked || tier2Unlocked) && (
                      <div className="pt-2 border-t border-white/10 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF6A] font-semibold block">
                          Complimentary Apothecary Gifts Included:
                        </span>
                        {tier1Unlocked && (
                          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                            <Check className="w-3.5 h-3.5" />
                            <span>Brushed Oxidized Copper 2g Dosing Scoop</span>
                          </div>
                        )}
                        {tier2Unlocked && (
                          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
                            <Check className="w-3.5 h-3.5" />
                            <span>VŪNGA Kinigi Mist Organic Canvas Tote & Stamp Card</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="pt-2 border-t border-white/10 flex justify-between items-baseline font-mono text-sm sm:text-base font-bold text-[#EAE8E1]">
                      <span>Total Authorized:</span>
                      <span className="text-[#B86B43] text-lg sm:text-xl">
                        {formatPrice(finalTotalRWF, finalTotalUSD)}
                      </span>
                    </div>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#B86B43] hover:bg-[#a15833] text-white font-mono uppercase tracking-[0.14em] text-xs font-semibold transition-all duration-200 shadow-xl shadow-[#B86B43]/20 flex items-center justify-center gap-2 rounded cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D4AF6A]" />
                        Authorizing Dispatch to Kinigi Hub...
                      </span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 text-[#D4AF6A]" />
                        <span>COMPLETE RITUAL ORDER</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* ORDER CONFIRMED SCREEN */
                <div className="space-y-6 text-center sm:text-left print:text-black">
                  <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-white/10">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-7 h-7 text-emerald-400 stroke-[3]" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[#D4AF6A] uppercase tracking-widest block font-semibold">
                        Official Order Receipt · Kinigi Apothecary
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-white">
                        Order #{confirmedOrderId} Confirmed
                      </h4>
                      <p className="text-xs text-[#EAE8E1]/70 font-sans mt-0.5">
                        Placed on {confirmedDate} for {fullName} ({phone})
                      </p>
                    </div>
                  </div>

                  {/* Itemized Order Breakdown */}
                  <div>
                    <h5 className="font-mono text-xs uppercase tracking-widest text-[#B86B43] font-semibold mb-3">
                      Itemized Dispensary Harvests
                    </h5>
                    <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {cart.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white/5 border border-white/10 rounded flex items-center justify-between gap-4 text-xs font-mono"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded bg-black shrink-0"
                            />
                            <div className="min-w-0 text-left">
                              <span className="font-serif font-bold text-white truncate block">
                                {item.name}
                              </span>
                              <span className="text-[10px] text-[#EAE8E1]/60">
                                {item.format} · Qty: {item.quantity} {item.isSubscription && '(Monthly Ritual -15%)'}
                              </span>
                            </div>
                          </div>
                          <span className="font-bold text-[#D4AF6A] shrink-0">
                            {formatPrice(
                              item.priceRWF * item.quantity,
                              item.priceUSD ? item.priceUSD * item.quantity : undefined
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Free Gifts Claimed */}
                  {(tier1Unlocked || tier2Unlocked) && (
                    <div className="p-4 bg-[#B86B43]/15 border border-[#B86B43]/40 rounded-lg">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#D4AF6A] font-semibold block mb-2 flex items-center gap-1.5">
                        <Gift className="w-4 h-4 text-[#D4AF6A]" />
                        <span>Complimentary Free Gifts Unlocked & Enclosed</span>
                      </span>
                      <div className="flex flex-wrap gap-3">
                        {tier1Unlocked && (
                          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded border border-white/10">
                            <img
                              src="/assets/16_cutout-03-copper-dosing-scoop.png"
                              alt="Copper Scoop"
                              className="w-6 h-6 object-contain"
                            />
                            <span className="text-xs font-mono text-[#EAE8E1]">
                              Brushed Oxidized Copper 2g Dosing Scoop
                            </span>
                          </div>
                        )}
                        {tier2Unlocked && (
                          <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded border border-white/10">
                            <img
                              src="/assets/Output_01_VUNGA_Asset_Kit.jpg"
                              alt="Canvas Tote"
                              className="w-6 h-6 object-cover rounded"
                            />
                            <span className="text-xs font-mono text-[#EAE8E1]">
                              Kinigi Mist Organic Canvas Tote & Stamp Card
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Dispatch Notice */}
                  <div className="p-3 bg-black/40 border border-white/10 rounded text-xs font-mono text-[#EAE8E1]/80 space-y-1">
                    <div className="flex items-center gap-2 text-[#D4AF6A]">
                      <Truck className="w-4 h-4 shrink-0" />
                      <span className="font-semibold">
                        {deliveryMode === 'same-day' && 'Same-Day Kigali Courier Scheduled'}
                        {deliveryMode === 'pickup' && 'Ready for Pickup at Kigali Tasting Bar'}
                        {deliveryMode === 'dhl' && 'DHL Express International Airway Bill Generating'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#EAE8E1]/60 pl-6">
                      {deliveryMode !== 'pickup'
                        ? `Delivery address: ${deliveryAddress}`
                        : 'Collect at KG 674 St, Kimihurura. Show this order code.'}
                    </p>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={handlePrintReceipt}
                      className="w-full sm:w-auto px-5 py-3 border border-white/20 hover:border-white/40 text-xs font-mono uppercase tracking-wider text-[#EAE8E1] flex items-center justify-center gap-2 rounded cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-[#D4AF6A]" />
                      <span>Print Official Receipt</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleFinishAndReturn}
                      className="w-full sm:flex-1 py-3 bg-[#B86B43] hover:bg-[#a15833] text-white text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center gap-2 rounded cursor-pointer shadow-lg shadow-[#B86B43]/20"
                    >
                      <span>Return to Dispensary</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
