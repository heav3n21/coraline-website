import React, { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero({ onDonate }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll('.h-reveal')
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        items.forEach((item, i) =>
          setTimeout(() => item.classList.add('in'), i * 160)
        )
      }
    }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="hero" ref={ref}>
      {/* Curved title via SVG textPath */}
      <div className="hero-title-wrap h-reveal">
        <svg
          className="hero-title-svg"
          viewBox="0 0 340 72"
          aria-label="Buy Coraline a Treat"
          role="img"
        >
          <defs>
            <path id="titleArc" d="M 22,68 Q 170,-6 318,68" />
          </defs>
          {/* shadow pass */}
          <text
            fontFamily="Cinzel, serif"
            fontSize="13.5"
            fontWeight="700"
            fill="rgba(240,200,120,.25)"
            letterSpacing="5"
          >
            <textPath           className="footer-name1"
 href="#titleArc" startOffset="50%" textAnchor="middle" dy="-1">
              BUY CORALINE A TREAT
            </textPath>
          </text>
          {/* main pass */}
          <text
               className="footer-name1"
            fontFamily="Cinzel, serif"
            fontSize="13.5"
            fontWeight="700"
            fill="#1a0808"
            letterSpacing="5"
          >
            <textPath href="#titleArc" startOffset="50%" textAnchor="middle">
              BUY CORALINE A TREAT
            </textPath>
          </text>
        </svg>
      </div>

      {/* Star ball above photo */}
      <div className="star-ball h-reveal" aria-hidden="true">
        <svg width="58" height="58" viewBox="0 0 58 58">
          <circle cx="29" cy="29" r="29" fill="#9b1010"/>
          <circle cx="29" cy="29" r="29" fill="url(#ballShine)"/>
          <defs>
            <radialGradient id="ballShine" cx="35%" cy="30%">
              <stop offset="0%" stopColor="rgba(255,220,120,.35)"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
            </radialGradient>
          </defs>
          <polygon
            points="29,8 33,21 47,21 36,29 40,43 29,35 18,43 22,29 11,21 25,21"
            fill="#f0c040"
          />
        </svg>
      </div>

      {/* Dog photo in gold ring */}
      <div className="photo-ring h-reveal">
        <img
          src="/coraline-nose.png"
          alt="Coraline the Golden Retriever"
          className="photo-img"
          onError={e => {
            e.target.style.display = 'none'
            e.target.parentNode.classList.add('fallback')
          }}
        />
      </div>

      {/* Name sitting below photo */}
      <div className="dog-name-wrap h-reveal">
        <h1 className="dog-name hand">Coraline</h1>
        <p className="dog-sub hand">golden retriever · very good girl</p>
      </div>

      {/* Mouse stickers — grounded left and right */}
      <img
        src="/mouse-trumpet.png"
        alt=""
        aria-hidden="true"
        className="mouse mouse--left h-reveal"
      />
      <img
        src="/mouse-ball.png"
        alt=""
        aria-hidden="true"
        className="mouse mouse--right h-reveal"
      />

      {/* Worn paper note */}
      <div className="paper-note h-reveal">
        <div className="paper-lines" aria-hidden="true"/>
        <p className="paper-text">
          She pressed her nose to this screen and left a smudge.
          For <strong>$1</strong>, you make her tail go.
        </p>
        <span className="paper-sig hand">— DAD. 🐾</span>
        <div className="wax-seal" aria-hidden="true">M</div>
      </div>

      {/* Ticket button */}
      <div className="hero-cta h-reveal">
        <button className="ticket-btn" onClick={onDonate}>
          <span className="ticket-hole ticket-hole--l" aria-hidden="true"/>
          <span className="ticket-label">Buy a Treat</span>
          <span className="ticket-price hand">$1</span>
          <span className="ticket-hole ticket-hole--r" aria-hidden="true"/>
        </button>
        <p className="cta-sub hand">🔒 secure via Stripe</p>
      </div>

      {/* Treat counter */}
      <div className="treat-counter h-reveal">
        <span className="hand">🦴</span>
        <span className="counter-num hand" aria-live="polite">47</span>
        <span className="counter-label hand">treats received</span>
        <span className="hand">🦴</span>
      </div>
    </section>
  )
}
