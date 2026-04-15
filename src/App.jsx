import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import ProductCatalog from './components/ProductCatalog/ProductCatalog'
import ProductDetail from './components/ProductDetail/ProductDetail'
import Cart from './components/Cart/Cart'
import { analytics } from './services/analytics'
import './App.css'

function AppContent() {
  const [cartItems, setCartItems] = useState([])
  const location = useLocation()

  useEffect(() => {
    analytics.init('G-4C0NWC3REY', '4038437582960474')
  }, [])

  useEffect(() => {
    analytics.trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${location.pathname}${location.search}`,
    })
  }, [location.pathname, location.search])

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productId)
    )
  }

  const handlePurchaseComplete = () => {
    setCartItems([])
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🍰 Cake Shop</h1>
        <p>GA4 & Meta Pixel Testing Ground</p>
      </header>

      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductCatalog onAddToCart={handleAddToCart} />
                <Cart
                  items={cartItems}
                  onRemoveItem={handleRemoveFromCart}
                  onPurchaseComplete={handlePurchaseComplete}
                />
              </>
}
          />
          <Route
            path="/product/:id"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Cake Shop - Test Site</p>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}
