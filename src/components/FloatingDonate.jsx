import React, { useState, useEffect } from 'react'
import './FloatingDonate.css'

export default function FloatingDonate({ onDonate }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`float-donate ${visible ? 'visible' : ''}`}>
      <button className="float-btn" onClick={onDonate} aria-label="Buy Coraline a treat — $1">
        <span className="float-eye" aria-hidden="true">
          <span className="float-eye-p"/>
        </span>
        <span className="hand float-label">$1 treat</span>
      </button>
    </div>
  )
}
