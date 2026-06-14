import React, { useRef, useEffect } from 'react'
import './About.css'

const FACTS = [
  { icon: '🎾', title: 'Ball Counter',   body: '14 tennis balls. She knows if one is missing.' },
  { icon: '🛋️', title: 'Sleep Research', body: '12 hours daily. A deeply committed practice.' },
  { icon: '🍂', title: 'Leaf Chaos',     body: 'Full-speed through every pile. Always.' },
  { icon: '🧦', title: 'Gift Giver',     body: 'Brings a sock every time you come home.' },
]

export default function About() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll('.abt-card').forEach((c, i) =>
          setTimeout(() => c.classList.add('in'), i * 90)
        )
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="about" ref={ref}>
      <div className="container">
        <div className="section-rule">
          <span className="rule-line"/>
          <span className="rule-text hand">official dossier</span>
          <span className="rule-line"/>
        </div>
        <h2 className="abt-heading">A Very Good Girl</h2>
        <div className="abt-grid">
          {FACTS.map((f, i) => (
            <div key={i} className="abt-card reveal">
              <span className="abt-icon">{f.icon}</span>
              <h3 className="abt-title">{f.title}</h3>
              <p className="abt-body">{f.body}</p>
            </div>
          ))}
        </div>
        <blockquote className="abt-quote reveal">
          <p>She never asks for much. Just a walk, a sunny patch, and maybe —
            <em> just maybe</em> — one more treat.</p>
          <footer className="hand">— her person 🐾</footer>
        </blockquote>
      </div>
    </section>
  )
}
