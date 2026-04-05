# cake-shop 🍰

Test website for GA4 and Meta Pixel integration testing.

## Overview

This is a simple e-commerce demo site built with React + Vite. It's designed to test and validate:
- Google Analytics 4 (GA4) event tracking
- Meta Pixel event tracking
- E-commerce event flows (view, add to cart, purchase)

## Features

- Product catalog with view_item events
- Shopping cart with add_to_cart/remove_from_cart events
- Checkout flow with begin_checkout and purchase events
- Order success page showing transaction ID after purchase
- Dual analytics tracking: GA4 + Meta Pixel events
- Centralized analytics service with automatic event mapping
- Automatic GitHub Pages deployment with GitHub Actions
- Node.js 24 support

## Getting Started

### Prerequisites
- Node.js 24.x or later
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

Production build output goes to `dist/` directory.

### Preview

```bash
npm run preview
```

## Analytics Integration

The analytics service is located in `src/services/analytics.js`. It provides dual tracking for both GA4 and Meta Pixel with automatic event mapping.

### Initialization

1. Update `src/App.jsx` to initialize analytics with your IDs:
```javascript
import { analytics } from './services/analytics'
import { useEffect } from 'react'

useEffect(() => {
  analytics.init('GA4_MEASUREMENT_ID', 'META_PIXEL_ID')
}, [])
```

### Event Tracking

The service automatically tracks e-commerce events and maps them to both GA4 and Meta Pixel:

**GA4 Events:**
- `view_item` - When a product is viewed
- `add_to_cart` - When a product is added to cart
- `remove_from_cart` - When a product is removed from cart
- `begin_checkout` - When checkout starts
- `purchase` - When purchase is completed

**Meta Pixel Event Mapping:**
- GA4 `view_item` → Meta `ViewContent`
- GA4 `add_to_cart` → Meta `AddToCart`
- GA4 `begin_checkout` → Meta `InitiateCheckout`
- GA4 `purchase` → Meta `Purchase`

## Deployment

### GitHub Pages

This project automatically deploys to GitHub Pages on every push to the `master` branch using GitHub Actions.

The deployment is configured via `.github/workflows/deploy.yml` and uses:
- Node.js 24.x to build the project
- Official GitHub Actions for deployment (`actions/checkout`, `actions/setup-node`, `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`)

**Setup:**
1. Ensure your repository has GitHub Pages enabled
2. Go to Settings → Pages
3. Set the source to **"GitHub Actions"** (NOT "Deploy from a branch")
4. On push to master, the workflow will automatically build and deploy

**Visit your site at:** `https://your-username.github.io/cake-shop/`

## Project Structure

```
src/
├── components/
│   ├── ProductCatalog/     # Product listing
│   ├── ProductCard/        # Individual product card
│   ├── Cart/               # Shopping cart and checkout
│   └── OrderSuccess/       # Purchase confirmation page
├── services/
│   └── analytics.js        # GA4 & Meta Pixel tracking service
├── App.jsx                 # Main app component
├── App.css                 # App styling
├── main.jsx                # React entry point
└── index.css               # Global styles
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Testing Events

In development mode, all analytics events are logged to the browser console for easy debugging and validation. Ad blockers may prevent Meta Pixel script loading, but events are still tracked locally.

## License

MIT
