import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { VungaProvider } from './context/VungaContext'
import MarqueeTicker from './components/MarqueeTicker'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import QuizModal from './components/QuizModal'
import SEOHead from './components/SEOHead'
import ScrollToTop from './components/ScrollToTop'
// Lazy load page components
const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Science = lazy(() => import('./pages/Science'))
const Origin = lazy(() => import('./pages/Origin'))
const TastingBar = lazy(() => import('./pages/TastingBar'))

// Elegant Apothecary Fallback
const PageFallback: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#141515] text-[#EAE8E1]">
    <div className="relative w-12 h-12 flex items-center justify-center mb-4">
      <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
      <div className="absolute inset-0 border-2 border-[#B86B43] rounded-full border-t-transparent animate-spin" />
      <div className="w-3 h-3 bg-[#D4AF6A] rounded-full animate-ping" />
    </div>
    <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4AF6A]">
      Distilling Virunga Harvest...
    </span>
  </div>
)

const App: React.FC = () => {
  return (
    <VungaProvider>
      <ScrollToTop />
      <SEOHead />
      <div className="min-h-screen flex flex-col bg-[#141515] text-[#EAE8E1] antialiased selection:bg-[#B86B43] selection:text-[#EAE8E1]">
        {/* Kinetic Marquee Ticker */}
        <MarqueeTicker />

        {/* Sticky Glassmorphic Navbar */}
        <Navbar />

        {/* Main Content Area with Suspended Routes */}
        <div className="flex-1">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:slug" element={<ProductDetail />} />
              <Route path="/science" element={<Science />} />
              <Route path="/origin" element={<Origin />} />
              <Route path="/tasting-bar" element={<TastingBar />} />
              {/* Catch-all fallback route redirects to home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </div>

        {/* Global Apothecary Slide-out Cart Drawer */}
        <CartDrawer />

        {/* Global 3-Step Mushroom Matcher Quiz Modal */}
        <QuizModal />

        {/* Footer */}
        <Footer />
      </div>
    </VungaProvider>
  )
}

export default App
