import { useState } from 'react'
import { analytics } from '../../services/analytics'
import OrderSuccess from '../OrderSuccess/OrderSuccess'
import './Cart.css'

export default function Cart({ items }) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [transactionId, setTransactionId] = useState(null)

  const total = items.reduce((sum, item) => sum + item.price, 0)

  const handleCheckout = () => {
    if (items.length === 0) return

    analytics.trackBeginCheckout(items)
    setShowCheckout(true)
  }

  const handlePurchase = () => {
    const txnId = `TXN-${Date.now()}`
    analytics.trackPurchase(items, txnId)
    setTransactionId(txnId)
    setShowCheckout(false)
  }

  const handleRemoveItem = (indexToRemove) => {
    const item = items[indexToRemove]
    analytics.trackRemoveFromCart(item)
  }

  if (transactionId) {
    return (
      <section className="cart">
        <OrderSuccess
          transactionId={transactionId}
          onContinueShopping={() => setTransactionId(null)}
        />
      </section>
    )
  }

  return (
    <section className="cart">
      <h2>🛒 Cart</h2>

      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={index} className="cart-item">
                <span>{item.image} {item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <strong>Total: ${total}</strong>
          </div>

          {!showCheckout ? (
            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          ) : (
            <div className="checkout-form">
              <p>Complete your purchase</p>
              <button
                className="purchase-btn"
                onClick={handlePurchase}
              >
                Complete Purchase
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowCheckout(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}
