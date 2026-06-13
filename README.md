# 🐾 Buy Coraline a Treat

A beautiful, mobile-first website dedicated to Coraline the Golden Retriever. Visitors can donate $1 via Stripe to buy her a treat.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 💳 Setting Up Stripe

1. Create a [Stripe account](https://stripe.com)
2. Go to **Payment Links** → Create a new link
3. Set the price to **$1.00 USD**
4. Copy your payment link URL
5. Open `src/components/DonateModal.jsx` and replace:
   ```js
   window.open('https://buy.stripe.com/your-payment-link', '_blank')
   ```
   with your actual Stripe Payment Link URL.

### Optional: Track Treat Count
To make the treat counter dynamic:
1. Set up a Stripe webhook to increment a counter in your database
2. Create an API endpoint (e.g., Vercel Edge Function) at `/api/treats`
3. Fetch the count in `TreatCounter.jsx`:
   ```js
   const res = await fetch('/api/treats')
   const { count } = await res.json()
   setTreats(count)
   ```

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel for automatic deploys.

## 📁 Project Structure

```
src/
  components/
    Header.jsx         # Site header with animated paws
    Hero.jsx           # Hero section with Coraline's portrait
    TreatCounter.jsx   # The treat counter + main donate button
    About.jsx          # Personality facts section
    Gallery.jsx        # Scrapbook photo gallery
    DonateModal.jsx    # Stripe donation modal
    FloatingDonate.jsx # Persistent floating CTA
    Footer.jsx         # Footer with mini Coraline
  App.jsx              # Main app with final CTA
  index.css            # Design tokens & global styles
```

## 🎨 Design System

- **Fonts**: Playfair Display (display), Lora (body), Caveat (handwritten)
- **Colors**: Warm cream, dusty rose, golden amber, soft sage
- **Style**: Digital scrapbook, Tumblr-inspired, polaroid photos

## 📱 Features

- ✅ Mobile-first responsive design
- ✅ Scroll-triggered animations
- ✅ Polaroid photo gallery with scatter layout
- ✅ Animated treat counter with confetti paws
- ✅ Stripe payment integration
- ✅ Floating donate button
- ✅ Custom SVG illustrations of Coraline
- ✅ Paper texture and scrapbook aesthetic
- ✅ Reduced motion support
- ✅ Accessible (ARIA labels, semantic HTML)
- ✅ Optimized for Vercel deployment

## 💛 Made with love for Coraline
