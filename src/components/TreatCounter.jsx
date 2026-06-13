import React, { useState, useRef, useEffect } from 'react'
import './TreatCounter.css'

const INITIAL = 47

function useFadeIn(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible') },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
}

export default function TreatCounter({ onDonate }) {
  const [treats, setTreats] = useState(INITIAL)
  const [particles, setParticles] = useState([])
  const numRef = useRef(null)
  const secRef = useRef(null)
  useFadeIn(secRef)

  const handleDonate = () => {
    // Burst particles
    const burst = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: 35 + Math.random() * 30,
      y: 20 + Math.random() * 60,
      icon: ['🐾','✦','🦴','⭐','🌟'][Math.floor(Math.random() * 5)],
      delay: i * 0.07,
      angle: (360 / 10) * i,
    }))
    setParticles(burst)
    setTimeout(() => {
      setTreats(t => t + 1)
      numRef.current?.classList.add('pop')
      setTimeout(() => numRef.current?.classList.remove('pop'), 700)
    }, 300)
    setTimeout(() => setParticles([]), 1800)
    onDonate?.()
  }

  return (
    <section className="treat-counter fade-up" ref={secRef}>
      <div className="container">
        <div className="tc-header">
          <div className="tc-eye-row" aria-hidden="true">
            {[0,1,2,3,4].map(i => <MiniEye key={i} delay={i * 0.15} />)}
          </div>
          <h2 className="tc-title">The Treat Tally</h2>
          <p className="tc-sub hand">every dollar counted, every treat savored</p>
        </div>

        <div className="tc-card-wrap">
          <div className="tc-card">
            {/* Particle burst */}
            <div className="particle-field" aria-hidden="true">
              {particles.map(p => (
                <span
                  key={p.id}
                  className="particle"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    animationDelay: `${p.delay}s`,
                    '--angle': `${p.angle}deg`,
                  }}
                >{p.icon}</span>
              ))}
            </div>

            <div className="tc-num-row" aria-live="polite">
              <span className="tc-bone">🦴</span>
              <span className="tc-number hand" ref={numRef}>{treats}</span>
              <span className="tc-bone">🦴</span>
            </div>
            <p className="tc-label">treats received by Coraline</p>
            <div className="tc-divider" aria-hidden="true">
              <span/><span className="hand">✦</span><span/>
            </div>
            <p className="tc-note">Each one met with a spin and a sigh of pure contentment.</p>
          </div>
        </div>

        {/* Donate button */}
        <div className="tc-donate">
          <div className="tc-needle-tape" aria-hidden="true" />
          <button className="tc-btn" onClick={handleDonate}>
            <span className="tc-btn-paw">🐾</span>
            <span>Send a Treat</span>
            <span className="tc-btn-price hand">$1</span>
          </button>
          <p className="tc-secure hand">🔒 secure · instant · treat-guaranteed</p>
        </div>

        {/* Fun facts row */}
        <div className="tc-facts">
          {[
            { e:'🥜', t:'peanut butter first' },
            { e:'💫', t:'does a full spin before eating' },
            { e:'🎯', t:'catches them mid-air' },
          ].map((f, i) => (
            <div key={i} className="tc-fact">
              <span className="tc-fact-e">{f.e}</span>
              <span className="hand tc-fact-t">{f.t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MiniEye({ delay }) {
  return (
    <div className="mini-eye" style={{ animationDelay: `${delay}s` }}>
      <div className="mini-eye-pupil" />
    </div>
  )
}
