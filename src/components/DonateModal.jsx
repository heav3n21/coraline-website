import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './DonateModal.css'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const fonts = [{
  cssSrc: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=IM+Fell+English:ital@0;1&display=swap',
}]

const appearance = {
  theme: 'flat',
  variables: {
    colorPrimary: '#c8922a',
    colorBackground: '#fdf6e3',
    colorText: '#1a0808',
    colorTextSecondary: 'rgba(26,8,8,.55)',
    colorTextPlaceholder: 'rgba(26,8,8,.35)',
    colorDanger: '#c0392b',
    fontFamily: "'IM Fell English', Georgia, serif",
    fontSizeBase: '15px',
    borderRadius: '2px',
    spacingGridRow: '14px',
  },
  rules: {
    '.Label': {
      fontFamily: "'Cinzel', serif",
      fontSize: '10px',
      fontWeight: '700',
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'rgba(26,8,8,.6)',
      marginBottom: '6px',
    },
    '.Input': {
      border: '1px solid rgba(200,146,42,.4)',
      boxShadow: 'none',
      padding: '11px 12px',
    },
    '.Input:focus': {
      border: '1px solid #c8922a',
      boxShadow: '0 0 0 1px rgba(200,146,42,.3)',
    },
    '.Tab': {
      border: '1px solid rgba(200,146,42,.3)',
      boxShadow: 'none',
    },
    '.Tab:hover': { backgroundColor: 'rgba(200,146,42,.06)' },
    '.Tab--selected': {
      border: '1px solid #c8922a',
      backgroundColor: 'rgba(200,146,42,.1)',
      boxShadow: 'none',
    },
    '.TabLabel': { fontFamily: "'Cinzel', serif", fontSize: '12px' },
  },
}

function PayForm({ onClose }) {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setSubmitting(true)
    setError(null)

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/?treat=success` },
      redirect: 'if_required',
    })

    if (confirmError) {
      setError(confirmError.message || 'Something went wrong. Please try again.')
      setSubmitting(false)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="modal-success">
        <div className="modal-star hand" aria-hidden="true">🌟</div>
        <h2 className="modal-title">Treat Delivered.</h2>
        <p className="modal-copy">She's already doing the spin. Thank you.</p>
        <button className="modal-pay" onClick={onClose}>Close</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p className="modal-copy" style={{ color: '#c0392b', marginTop: '1rem' }}>{error}</p>}
      <button className="modal-pay" disabled={!stripe || submitting} style={{ marginTop: '1.4rem' }}>
        {submitting ? 'Processing…' : 'Pay $1'}
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 8h10M9 4l4 4-4 4"/>
        </svg>
      </button>
      <p className="modal-secure hand">🔒 Secure · Instant · Treat-guaranteed</p>
    </form>
  )
}

export default function DonateModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [clientSecret, setClientSecret] = useState(null)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    const onKey = e => e.key === 'Escape' && onClose()
    if (isOpen) window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [isOpen, onClose])

  const handleClose = () => {
    onClose()
    setClientSecret(null)
    setError(null)
    setLoading(false)
  }

  if (!isOpen) return null

  const handleStripe = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/create-payment-intent', { method: 'POST' })
      const data = await res.json()
      if (!res.ok || !data.clientSecret) throw new Error(data.error || 'Something went wrong')
      setClientSecret(data.clientSecret)
    } catch (err) {
      setError('Could not start checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={handleClose} role="dialog" aria-modal="true" aria-label="Buy Coraline a treat">
      <div className={`modal-box ${clientSecret ? 'modal-box--checkout' : ''}`} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose} aria-label="Close">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
          </svg>
        </button>

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret, appearance, fonts }}>
            <PayForm onClose={handleClose} />
          </Elements>
        ) : (
          <>
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
              {loading ? 'Loading…' : 'Pay $1 via Stripe'}
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
            {error && <p className="modal-copy" style={{ color: '#c0392b' }}>{error}</p>}
            <p className="modal-secure hand">🔒 Secure · Instant · Treat-guaranteed</p>
          </>
        )}
      </div>
    </div>
  )
}
