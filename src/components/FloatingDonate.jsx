import React, { useState, useEffect } from 'react'
import './FloatingDonate.css'

export default function FloatingDonate({ onDonate }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 300)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div className={`float-wrap ${show ? 'show' : ''}`}>
      <button className="float-btn" onClick={onDonate} aria-label="Buy Coraline a treat — $1">
        <span className="float-icon">🌟</span>
        <span className="float-label cinzel">$1 Treat</span>
      </button>
    </div>
  )
}
