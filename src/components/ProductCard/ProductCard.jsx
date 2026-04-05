import { Link } from 'react-router-dom'
import './ProductCard.css'

export default function ProductCard({ product, onView, onAddToCart }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card" onClick={onView}>
        <div className="product-image">{product.image}</div>
        <h3>{product.name}</h3>
        <p className="price">${product.price}</p>
        <button
          className="add-to-cart-btn"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onAddToCart()
          }}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  )
}

