import { useState, useEffect } from 'react'
import ProductCatalog from './components/ProductCatalog/ProductCatalog'
import Cart from './components/Cart/Cart'
import { analytics } from './services/analytics'
import './App.css'

export default function App() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    analytics.init('G-4C0NWC3REY', '4038437582960474')
  }, [])

  return (
    <div className="app">
      <header className="header">
        <h1>🍰 Cake Shop</h1>
        <p>GA4 & Meta Pixel Testing Ground</p>
      </header>

      <main className="main">
        <ProductCatalog onAddToCart={(product) => {
          setCartItems([...cartItems, product])
        }} />

        <Cart items={cartItems} />
      </main>

      <footer className="footer">
        <p>&copy; 2026 Cake Shop - Test Site</p>
      </footer>
    </div>
  )
}
