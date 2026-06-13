import React, { useEffect } from 'react'
import './DonateModal.css'

export default function DonateModal({ isOpen, onClose }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const handleStripe = () => {
    // Replace with your actual Stripe Payment Link
    window.open('https://buy.stripe.com/your-payment-link', '_blank')
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        {/* Spiral portal mini */}
        <div className="modal-portal" aria-hidden="true">
          <div className="portal-ring portal-ring--1"/>
          <div className="portal-ring portal-ring--2"/>
          <div className="portal-ring portal-ring--3"/>
          <span className="portal-dog">🐕</span>
        </div>

        <h2 className="modal-title">
          You're about to make<br />
          <em>a very good girl</em><br />
          very happy.
        </h2>

        <div className="modal-price-pill">
          <span className="modal-dollar hand">$1</span>
          <span className="modal-eq hand">= one perfect treat</span>
        </div>

        <p className="modal-copy">
          Your dollar goes directly to Coraline's treat fund.
          She will do a spin. She always does a spin.
        </p>

        <button className="modal-stripe-btn" onClick={handleStripe}>
          Pay $1 via Stripe
          <span className="modal-arrow">→</span>
        </button>

        <p className="modal-secure hand">🔒 Secure · Fast · Treat-guaranteed</p>

        {/* Button eyes row */}
        <div className="modal-eyes" aria-hidden="true">
          {[0,1,2].map(i => (
            <div key={i} className="modal-eye">
              <div className="modal-eye-p"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
