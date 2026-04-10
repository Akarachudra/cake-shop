import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { PRODUCTS } from '../ProductCatalog/ProductCatalog'
import { analytics } from '../../services/analytics'
import './ProductDetail.css'

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams()
  const product = PRODUCTS.find(p => p.id === id)

  useEffect(() => {
    if (product) {
      analytics.trackViewItem(product)
    }
  }, [product, id])

  if (!product) {
    return (
      <section className="product-detail">
        <div className="product-not-found">
          <h2>Product not found</h2>
          <Link to="/" className="back-link">← Back to Catalog</Link>
        </div>
      </section>
    )
  }

  const handleAddToCart = () => {
    analytics.trackAddToCart(product)
    onAddToCart(product)
  }

  return (
    <section className="product-detail">
      <Link to="/" className="back-link">← Back to Catalog</Link>

      <div className="product-detail-container">
        <div className="product-image-section">
          <div className="product-image-large">{product.image}</div>
        </div>

        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="product-category">{product.category}</p>

          <div className="product-details">
            <div className="product-detail-row">
              <span className="label">Price:</span>
              <span className="value">${product.price}</span>
            </div>
            <div className="product-detail-row">
              <span className="label">Product ID:</span>
              <span className="value">{product.id}</span>
            </div>
          </div>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          <div className="product-url">
            <p className="url-label">Share this product:</p>
            <code className="url-code">{window.location.origin}{window.location.pathname}#/product/{product.id}</code>
          </div>
        </div>
      </div>
    </section>
  )
}
