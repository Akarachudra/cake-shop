import { useState, useEffect } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { analytics } from '../../services/analytics'
import './ProductCatalog.css'

const PRODUCTS = [
  { id: 1, name: 'Chocolate Cake', price: 25, category: 'Cakes', image: '🍫' },
  { id: 2, name: 'Vanilla Cake', price: 20, category: 'Cakes', image: '🍦' },
  { id: 3, name: 'Strawberry Cake', price: 28, category: 'Cakes', image: '🍓' },
  { id: 4, name: 'Carrot Cake', price: 22, category: 'Cakes', image: '🥕' },
  { id: 5, name: 'Cheesecake', price: 30, category: 'Cakes', image: '🧀' },
  { id: 6, name: 'Red Velvet', price: 26, category: 'Cakes', image: '❤️' },
]

export default function ProductCatalog({ onAddToCart }) {
  useEffect(() => {
    // Track page view when catalog loads
    analytics.trackEvent('page_view', {
      page_title: 'Product Catalog',
    })
  }, [])

  const handleProductClick = (product) => {
    analytics.trackViewItem(product)
  }

  const handleAddToCart = (product) => {
    analytics.trackAddToCart(product)
    onAddToCart(product)
  }

  return (
    <section className="product-catalog">
      <h2>Our Cakes</h2>
      <div className="product-grid">
        {PRODUCTS.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onView={() => handleProductClick(product)}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </section>
  )
}
