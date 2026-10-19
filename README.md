# VŪNGA RWANDA (`vunga.rw`)
## Earthen Alchemy from the Virunga Mist

> **Location:** Kinigi, Musanze District (Volcanoes National Park, 2,400m altitude)  
> **Flagship Venue:** VŪNGA Apothecary & Tasting Bar, Kigali, Rwanda  
> **Online Flagship:** `vunga.rw`

---

### Project & Brand Architecture

VŪNGA is Rwanda’s premier functional and culinary mushroom house, cultivating apothecary-grade mushroom extracts, 75% Rwandan dark cacao ritual squares, and fresh highland culinary mushrooms grown on mineral-rich volcanic basalt and Juncao/hardwood substrate.

This repository hosts the complete multi-page luxury e-commerce and brand storytelling application, synthesizing the best UI/UX patterns from:
- **Alice Mushrooms:** Kinetic copper ticker, luxury editorial serif typography, mood pills, and tiered free-gift unlock drawer.
- **Om Mushroom Superfood:** First-person "Shop by Need" conversational filters, interactive 3-step Mushroom Matcher diagnostic, "Keep Your Routine" split video carousel, and 5-step "From Spore to Shelf" cultivation timeline.
- **Real Mushrooms:** Two-state hover product cards, "Why Beta-Glucans Matter" scientific comparison table, and interactive Certificate of Analysis (COA) batch verifier.

---

### Complete 11-SKU Portfolio

#### 1. Functional Extracts & Cacao
| SKU Name | Species | Format | Potency / Specs | Price (RWF / USD) |
| :--- | :--- | :--- | :--- | :--- |
| **Organic Lion's Mane Focus** | *Hericium erinaceus* | 60g Powder / 90 Capsules | `>32% Beta-Glucans` · Hericenones | `38,000 RWF / $28.00` |
| **Highland Reishi Calm** | *Ganoderma lucidum* | 60g Dual-Extract Pouch | `>35% Beta-Glucans` + Triterpenes | `40,000 RWF / $30.00` |
| **Virunga 5-Defenders Immunity** | Synergistic 5-Species Blend | Frosted Verdigris Jar (60g/90ct) | `>30% Beta-Glucans` (Chaga, Reishi, Turkey Tail, Maitake, Shiitake) | `45,000 RWF / $34.00` |
| **Cordyceps Energy Cacao** | *Cordyceps militaris* + 75% Cocoa | 12 Ritual Tasting Squares | 500mg Cordyceps per square · Single-Origin Rwandan Dark Cacao | `35,000 RWF / $26.00` |

#### 2. Fresh & Dried Rwandan Culinary Harvests
| SKU Name | Kinyarwanda Name | Species | Chef Format | Price (RWF / USD) |
| :--- | :--- | :--- | :--- | :--- |
| **Kinigi Pearl Oyster** | *Ibihumyo by'igiti* | *Pleurotus ostreatus* | 500g Fresh Punnet / 100g Dried | `8,500 RWF / $6.50` |
| **Musanze Highland Cremini & Button** | *Ibihumyo bya Butoni* | *Agaricus bisporus* | 500g Fresh Chef's Box | `9,500 RWF / $7.00` |
| **Virunga Oak Shiitake** | *Ibihumyo bya Shiitake* | *Lentinula edodes* | 250g Fresh / 100g Donko Caps | `14,000 RWF / $10.50` |
| **Kinigi Golden Oyster** | *Ibihumyo by'umuhondo* | *Pleurotus citrinopileatus* | 400g Fresh Bouquet / 80g Dried | `11,000 RWF / $8.00` |
| **Highland King Trumpet Oyster** | *Ibihumyo by'umwami* | *Pleurotus eryngii* | 500g Chef's Reserve Box | `15,000 RWF / $11.00` |
| **Rwandan Heritage Termitomyces** | *Imegeri & Ikinyamugina* | *Termitomyces letestui* | 150g Sun-Dried Reserve | `24,000 RWF / $18.00` |
| **Virunga Wood Ear** | *Amatwi y'igiti* | *Auricularia auricula-judae* | 150g Dried / 250g Fresh | `12,000 RWF / $9.00` |

---

### Key Application Routes

- `/` — **Homepage:** Full-viewport 4K video hero (`17_video-01-hero-virunga-spores-loop-16x9.mp4`), first-person benefit switcher, "Keep Your Routine" video countertop module, "Build Your Virunga Ritual" 3-slot bundle builder.
- `/shop` — **Shop All & By Need:** Dual category/benefit filters, two-state hover cards, instant cart drawer integration.
- `/shop/:slug` — **Product Detail Page:** 4K knolling gallery, dosing guides, one-time vs. subscribe & save radio cards, active compound accordions, related pairings.
- `/science` — **Our Science & COA:** Dual extraction laboratory showcase, "Why Beta-Glucans Matter" comparison scorecard, batch COA verifier (`VNG-2026-LM01`, `VNG-2026-REI04`, etc.), and peer-reviewed research counter.
- `/origin` — **Virunga Origin:** 2,400m aerial panorama, macro fruiting time-lapse (`18_video-02-fruiting-timelapse-loop-16x9.mp4`), 5-step "From Spore to Shelf" interactive timeline honoring Musanze women-led cooperatives.
- `/tasting-bar` — **Kigali Tasting Bar & Wholesale:** Basalt architecture showcase, Kigali tasting flight menu (*The Virunga Trilogy*), reservation booking engine, and B2B wholesale calculator for Rwanda's luxury eco-lodges (*Singita Kwitonda*, *Bisate Lodge*, *One&Only Gorilla's Nest*).

---

### Design System Tokens

- **Dominance:** 60% Volcanic Ash (`#222423`), 25% Kinigi Mist (`#EAE8E1`), 8% Oxidized Copper (`#B86B43`), 7% SKU Accents.
- **SKU Accents:**
  - Verdigris Bamboo (`#527361`): Virunga 5-Defenders Immunity & Organic Badges.
  - Musanze Terracotta (`#8C3F2B`): Highland Reishi Calm & Wood Ear Line.
  - Spore Gold (`#D4AF6A`): Cordyceps Energy Cacao & Lab Verification Badges.
- **Typography:**
  - Headings: `Merriweather` (Light 300 / Bold 700 with `0.14em` tracking)
  - Body & UI: `Plus Jakarta Sans`
  - Technical & Dosages: `DM Mono` (`2000 MG / SERVING`, `>30% BETA-GLUCANS`)

---

### Global Context (`VungaContext`)
1. **Multi-Currency:** Instant toggle between Rwandan Francs (`RWF`) and US Dollars (`USD`) with 1 USD ≈ 1,350 RWF peg.
2. **Tri-Lingual:** Instant dictionary switching across English (`EN`), Kinyarwanda (`RW`), and French (`FR`).
3. **Slide-Out Cart & Free Gifts:**
   - Tier 1 (`40,000 RWF / $30+` or any subscription): Unlocks Free Brushed Oxidized Copper 2g Dosing Scoop.
   - Tier 2 (`95,000 RWF / $70+` or 3+ products): Unlocks Free Kinigi Mist Canvas Tote & Stamped Dosing Card.
4. **Mushroom Matcher Quiz:** 3-question diagnostic with 1-click personalized stack addition.

---
*Cultivated with reverence at 2,400m in Kinigi, Musanze — Rwanda.*
