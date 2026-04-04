import './OrderSuccess.css'

export default function OrderSuccess({ transactionId, onContinueShopping }) {
  return (
    <div className="order-success">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h2>Your Purchase is Successful!</h2>
        <p className="success-message">Thank you for your order.</p>

        <div className="transaction-details">
          <p>Transaction ID:</p>
          <p className="transaction-id">{transactionId}</p>
        </div>

        <p className="success-footer">We've sent a confirmation to your email.</p>

        <button className="continue-btn" onClick={onContinueShopping}>
          Continue Shopping
        </button>
      </div>
    </div>
  )
}
