import React, { useState } from 'react';
import './CheckoutModal.css';

const CheckoutModal = ({ course, onClose, onSuccess }) => {
  const [status, setStatus] = useState('input'); // 'input', 'processing', 'success'
  const [method, setMethod] = useState('card'); // 'card', 'upi'
  const [txnId, setTxnId] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    setStatus('processing');
    
    // Simulate secure payment processing latency
    setTimeout(() => {
      const generatedId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setTxnId(generatedId);
      setStatus('success');
    }, 2500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="checkout-content">
          {status !== 'success' ? (
            <>
              <div className="checkout-header">
                <h2>{status === 'processing' ? 'Processing Your Payment' : 'Secure Checkout'}</h2>
                <p>Transaction is encrypted with 256-bit SSL</p>
              </div>

              {status === 'processing' ? (
                <div className="processing-state">
                  <div className="spinner"></div>
                  <p>Verifying with your bank...</p>
                </div>
              ) : (
                <>
                  <div className="order-summary-box">
                    <img src={course.image} alt={course.title} />
                    <div className="summary-info">
                      <h4>{course.title}</h4>
                      <p className="price-tag">₹{course.price}</p>
                    </div>
                  </div>

                  <form onSubmit={handlePayment} className="payment-form">
                    <div className="payment-method-selector">
                      <button 
                        type="button" 
                        className={method === 'card' ? 'active' : ''} 
                        onClick={() => setMethod('card')}
                      >💳 Card</button>
                      <button 
                        type="button" 
                        className={method === 'upi' ? 'active' : ''} 
                        onClick={() => setMethod('upi')}
                      >📱 UPI</button>
                    </div>

                    {method === 'card' ? (
                      <div className="card-fields">
                        <input type="text" placeholder="Cardholder Name" required className="input-field" defaultValue="Vijay Kumar" />
                        <input type="text" placeholder="Card Number" required className="input-field" defaultValue="4242 4242 4242 4242" />
                        <div className="row">
                          <input type="text" placeholder="MM/YY" required className="input-field" defaultValue="12/28" />
                          <input type="password" placeholder="CVV" required className="input-field" defaultValue="***" />
                        </div>
                      </div>
                    ) : (
                      <div className="upi-fields">
                        <div className="qr-box">
                          <div className="qr-placeholder">G-Pay | PhonePe</div>
                        </div>
                        <input type="text" placeholder="Enter UPI ID" required className="input-field" defaultValue="morgex@okaxis" />
                      </div>
                    )}

                    <button type="submit" className="btn pay-btn">
                      Confirm & Pay ₹{course.price}
                    </button>
                  </form>
                </>
              )}
            </>
          ) : (
            <div className="success-state">
              <div className="success-icon">✅</div>
              <h2>Payment Successful!</h2>
              <p>Thank you for your purchase. Your 1-year access is now active.</p>
              
              <div className="receipt-box">
                <div className="receipt-row"><span>Ref ID:</span> <strong>{txnId}</strong></div>
                <div className="receipt-row"><span>Course:</span> <strong>{course.title}</strong></div>
                <div className="receipt-row"><span>Amount:</span> <strong>₹{course.price}</strong></div>
                <div className="receipt-row"><span>Status:</span> <span className="status-badge">PAID</span></div>
              </div>

              <button className="btn dashboard-btn" onClick={onSuccess}>
                Go to My Courses
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
