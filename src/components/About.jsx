import React, { useRef, useEffect } from 'react'
import './About.css'

const FACTS = [
  { icon: '🎾', title: 'Ball Counter', desc: '14 tennis balls. She tracks every single one.' },
  { icon: '🛋️', title: 'Sleep Research', desc: '12.4 hrs daily avg. Studying the art since forever.' },
  { icon: '🍂', title: 'Leaf Destruction', desc: 'Full-speed only. No exceptions.' },
  { icon: '🧦', title: 'Gift Delivery', desc: 'Always brings a sock when you come home. Always.' },
]

function FCard({ f, i }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => el.classList.add('visible'), i * 90) },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [i])

  return (
    <div className="abt-fcard fade-up" ref={ref}>
      <span className="abt-ficon">{f.icon}</span>
      <h3 className="abt-ftitle">{f.title}</h3>
      <p className="abt-fdesc">{f.desc}</p>
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible') },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="about fade-up" ref={ref}>
      <div className="container">
        <div className="abt-header">
          <span className="abt-eye-cluster" aria-hidden="true">
            {'⊙⊙⊙'.split('').map((c, i) => <span key={i}>{c}</span>)}
          </span>
          <h2>The Official Dossier</h2>
          <p className="abt-sub hand">classified: very good girl</p>
        </div>

        <div className="abt-grid">
          {FACTS.map((f, i) => <FCard key={i} f={f} i={i} />)}
        </div>

        <div className="abt-quote">
          <div className="abt-quote-mark hand">"</div>
          <p>
            She never asks for much. Just a walk, a long nap, a sunny patch,
            and maybe — <em>just maybe</em> — one more treat.
          </p>
          <div className="abt-quote-mark hand abt-quote-mark--close">"</div>
          <div className="abt-paws hand">🐾 🐾 🐾</div>
        </div>
      </div>
    </section>
  )
}
