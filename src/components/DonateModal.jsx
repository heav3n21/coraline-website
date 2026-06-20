import React, { useEffect, useState } from 'react'
import './DonateModal.css'

export default function DonateModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    const onKey = e => e.key === 'Escape' && onClose()
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleStripe = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/create-checkout-session', { method: 'POST' })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Something went wrong')
      window.location.href = data.url
    } catch (err) {
      setError('Could not start checkout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Buy Coraline a treat">
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
          </svg>
        </button>
        <div className="modal-star hand" aria-hidden="true">🌟</div>
        <h2 className="modal-title">
          You're About to Make<br/>
          <em>a Very Good Girl</em><br/>
          Very Happy.
        </h2>
        <div className="modal-price">
          <span className="price-num hand">$1</span>
          <span className="price-eq hand">= one perfect treat</span>
        </div>
        <p className="modal-copy">
          Straight to Coraline's treat fund. She will do a spin. She always does.
        </p>
        <button className="modal-pay" onClick={handleStripe} disabled={loading}>
          {loading ? 'Redirecting…' : 'Pay $1 via Stripe'}
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </button>
        {error && <p className="modal-copy" style={{ color: '#c0392b' }}>{error}</p>}
        <p className="modal-secure hand">🔒 Secure · Instant · Treat-guaranteed</p>
      </div>
    </div>
  )
}
