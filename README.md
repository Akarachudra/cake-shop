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
- Centralized analytics service for easy GA4/Meta Pixel integration
- Automatic GitHub Pages deployment

## Getting Started

### Prerequisites
- Node.js 20.x or later
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

The analytics service is located in `src/services/analytics.js`. To integrate GA4 and Meta Pixel:

1. Update `src/App.jsx` to initialize analytics with your IDs:
```javascript
import { analytics } from './services/analytics'

// Initialize on app load
analytics.init('GA4_MEASUREMENT_ID', 'META_PIXEL_ID')
```

2. The service automatically tracks:
   - `view_item` - When a product is viewed
   - `add_to_cart` - When a product is added to cart
   - `remove_from_cart` - When a product is removed from cart
   - `begin_checkout` - When checkout starts
   - `purchase` - When purchase is completed

## Deployment

### GitHub Pages

This project automatically deploys to GitHub Pages on every push to the `master` branch.

The deployment is configured via `.github/workflows/deploy.yml` and uses:
- Node.js to build the project
- `peaceiris/actions-gh-pages` to deploy to GitHub Pages

**Setup:**
1. Ensure your repository has GitHub Pages enabled
2. Set the source to "Deploy from branch" with `gh-pages` branch
3. On push to master, the workflow will automatically build and deploy

**Visit your site at:** `https://your-username.github.io/cake-shop/`

## Project Structure

```
src/
├── components/
│   ├── ProductCatalog/     # Product listing
│   ├── ProductCard/        # Individual product card
│   └── Cart/               # Shopping cart
├── services/
│   └── analytics.js        # GA4 & Meta Pixel tracking
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

In development mode, all analytics events are logged to the browser console for easy debugging and validation.

## License

MIT
