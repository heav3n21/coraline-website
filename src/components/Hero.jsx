import React, { useEffect, useRef, useState } from 'react'
import './Hero.css'

export default function Hero({ onDonate }) {
  const ref = useRef(null)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="hero" ref={ref}>
      <div className="container">

        {/* Main photo — real Coraline */}
        <div className="hero-photo-container fade-up">
          {/* Decorative sewing-pattern border */}
          <div className="photo-frame">
            <div className="photo-frame-stitches" aria-hidden="true">
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="stitch" style={{ '--i': i }} />
              ))}
            </div>
            <div className={`photo-inner ${imgLoaded ? 'loaded' : ''}`}>
              <img
                src="/coraline-nose.png"
                alt="Coraline the Golden Retriever, nose-first closeup"
                className="hero-photo"
                onLoad={() => setImgLoaded(true)}
              />
            </div>
            {/* Button eye corners */}
            <div className="frame-eye frame-eye--tl" aria-hidden="true"><EyeDecor/></div>
            <div className="frame-eye frame-eye--tr" aria-hidden="true"><EyeDecor/></div>
            <div className="frame-eye frame-eye--bl" aria-hidden="true"><EyeDecor/></div>
            <div className="frame-eye frame-eye--br" aria-hidden="true"><EyeDecor/></div>
          </div>
        </div>

        {/* Title */}
        <div className="hero-text fade-up">
          <h1 className="hero-name">
            <em>Coraline</em>
          </h1>
          <p className="hero-sub hand">golden girl · chaos agent · treat connoisseur</p>
        </div>

        {/* Handwritten intro */}
        <div className="hero-letter fade-up">
          <div className="letter-card">
            <div className="letter-lines" aria-hidden="true" />
            <p className="letter-text">
              She pressed her nose to this screen once and left a smudge.
              We're still not sure if she was trying to buy herself a treat
              or just saying hi. Either way — she deserves one.
              <br /><br />
              For <strong>$1</strong>, you make her tail go.
            </p>
            <div className="letter-sig hand">
              — her person 🐾
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="hero-cta fade-up">
          <button className="main-donate-btn" onClick={onDonate}>
            <span className="mdb-glow" aria-hidden="true"/>
            <span className="mdb-text">Buy Coraline a Treat</span>
            <span className="mdb-price">$1</span>
          </button>
          <p className="hero-secure hand">🔒 via Stripe · takes 10 seconds</p>
        </div>

      </div>
    </section>
  )
}

function EyeDecor() {
  return (
    <div className="eye-decor">
      <div className="eye-decor-outer">
        <div className="eye-decor-inner"/>
        <div className="eye-decor-shine"/>
      </div>
    </div>
  )
}
