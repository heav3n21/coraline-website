import React, { useEffect, useRef, useState } from 'react'
import TunnelPortal from './TunnelPortal'
import './Hero.css'

export default function Hero({ onDonate }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Stagger children in
    const children = el.querySelectorAll('.hero-animate')
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        children.forEach((c, i) => {
          setTimeout(() => c.classList.add('in'), i * 140)
        })
      }
    }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="hero" ref={ref}>
      {/* Whimsical floating word clusters */}
      <FloatingWords />

      <div className="container">
        {/* Top eyebrow */}
        <div className="hero-eyebrow hero-animate">
          <EyeRow count={3} />
          <span className="hero-eyebrow-text title-font">The Portal Is Open</span>
          <EyeRow count={3} />
        </div>

        {/* Big italic name */}
        <h1 className="hero-name hero-animate">
          <em>Coraline</em>
        </h1>
        <p className="hero-sub hero-animate hand">
          golden retriever · chaos agent · treat connoisseur
        </p>

        {/* THE TUNNEL — hero centerpiece */}
        <div className="hero-tunnel-wrap hero-animate">
          <TunnelPortal onDonate={onDonate} />
        </div>

        {/* Underneath the tunnel: the dog photo polaroid */}
        <div className="hero-photo-area hero-animate">
          <div className="hero-polaroid hero-polaroid--main">
            <div className="hero-pol-tape" />
            <div className="hero-pol-eye" aria-hidden="true">
              <div className="hpe-inner"/><div className="hpe-shine"/>
            </div>
            <div className="hero-pol-img-wrap">
              <img
                src="/coraline-nose.png"
                alt="Coraline the Golden Retriever"
                className="hero-pol-img"
                onError={e => {
                  e.target.style.display='none'
                  e.target.parentNode.style.background='linear-gradient(135deg,#1E1040,#12082A)'
                  e.target.parentNode.innerHTML += '<div style="font-size:4rem;display:flex;align-items:center;justify-content:center;height:100%">🐕</div>'
                }}
              />
            </div>
            <p className="hero-pol-caption hand">hello. yes. treat?</p>
          </div>

          {/* Second polaroid — the costume */}
          <div className="hero-polaroid hero-polaroid--secondary">
            <div className="hero-pol-tape hero-pol-tape--green" />
            <div className="hero-pol-img-wrap">
              <img
                src="/coraline-costume.jpeg"
                alt="Coraline in monster costume"
                className="hero-pol-img"
                onError={e => {
                  e.target.style.display='none'
                  e.target.parentNode.style.background='#1a1030'
                }}
              />
            </div>
            <p className="hero-pol-caption hand">battle gear equipped 🦖</p>
          </div>
        </div>

        {/* Handwritten scroll note */}
        <div className="hero-scroll-note hero-animate">
          <div className="scroll-paper">
            <div className="scroll-lines" aria-hidden="true" />
            <p className="scroll-text">
              She pressed her nose to this screen once and left a smudge.
              We're still not sure if she was trying to buy herself a treat
              or just saying hi. For <strong>$1</strong>, you make her tail go.
            </p>
            <span className="scroll-sig hand">— her person 🐾</span>
            {/* Wax seal */}
            <div className="wax-seal" aria-hidden="true">
              <span>C</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

function EyeRow({ count }) {
  return (
    <div className="eye-row" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="h-eye" style={{ animationDelay: `${i * 0.3}s` }}>
          <div className="h-eye-p"/><div className="h-eye-s"/>
          <div className="h-eye-thread h-eye-thread--t"/>
          <div className="h-eye-thread h-eye-thread--b"/>
        </div>
      ))}
    </div>
  )
}

function FloatingWords() {
  const words = [
    { text:'✦', x:'8%', y:'18%', size:'1.6rem', delay:'0s', color:'rgba(255,210,60,0.4)' },
    { text:'very good girl', x:'3%', y:'42%', size:'0.75rem', delay:'0.8s', color:'rgba(180,200,255,0.25)', font:'hand' },
    { text:'✿', x:'91%', y:'22%', size:'1.4rem', delay:'1.2s', color:'rgba(220,160,240,0.45)' },
    { text:'treats pls', x:'88%', y:'55%', size:'0.72rem', delay:'0.4s', color:'rgba(180,200,255,0.22)', font:'hand' },
    { text:'⊙', x:'6%', y:'70%', size:'1.1rem', delay:'2s', color:'rgba(180,160,255,0.3)' },
    { text:'☽', x:'93%', y:'75%', size:'1.2rem', delay:'1.5s', color:'rgba(255,230,100,0.35)' },
    { text:'✦', x:'82%', y:'8%', size:'0.9rem', delay:'0.6s', color:'rgba(255,210,60,0.3)' },
    { text:'⊙', x:'15%', y:'88%', size:'0.8rem', delay:'1.8s', color:'rgba(180,160,255,0.25)' },
  ]
  return (
    <div className="floating-words" aria-hidden="true">
      {words.map((w, i) => (
        <span
          key={i}
          className={`fw ${w.font || ''}`}
          style={{
            left: w.x, top: w.y,
            fontSize: w.size,
            color: w.color,
            animationDelay: w.delay,
          }}
        >{w.text}</span>
      ))}
    </div>
  )
}
