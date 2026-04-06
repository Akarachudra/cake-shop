import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import ProductCatalog from './components/ProductCatalog/ProductCatalog'
import ProductDetail from './components/ProductDetail/ProductDetail'
import Cart from './components/Cart/Cart'
import { analytics } from './services/analytics'
import './App.css'

function AppContent() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    analytics.init('G-4C0NWC3REY', '4038437582960474')
  }, [])

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product])
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
                <Cart items={cartItems} />
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

