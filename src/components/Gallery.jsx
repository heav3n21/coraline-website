import React, { useRef, useEffect } from 'react'
import './Gallery.css'

const PHOTOS = [
  { src: '/coraline-nose.png',     caption: 'hello. yes. treat?',          rot: -3,   tape: '#4a7ad8' },
  { src: '/coraline-costume.jpeg', caption: 'battle gear equipped 🦖',     rot:  3.2, tape: '#5a9a40' },
  { src: '/coraline-grass.jpeg',   caption: 'field explorations, ongoing', rot: -1.8, tape: '#9040a0' },
]

export default function Gallery() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll('.gal-item').forEach((c, i) =>
          setTimeout(() => c.classList.add('in'), i * 110)
        )
      }
    }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="gallery" ref={ref}>
      <div className="gal-header">
        <div className="section-rule">
          <span className="rule-line"/><span className="rule-text hand">the album</span><span className="rule-line"/>
        </div>
        <h2 className="gal-title">A Life Well Sniffed</h2>
      </div>
      <div className="gal-grid">
        {PHOTOS.map((p, i) => (
          <GalCard key={i} photo={p} />
        ))}
      </div>
      <p className="gal-note hand">+ about 4,000 more 📱</p>
    </section>
  )
}

function GalCard({ photo }) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div className="gal-item reveal">
      <div
        className="polaroid"
        style={{ transform: hovered ? 'rotate(0deg) scale(1.05)' : `rotate(${photo.rot}deg)` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="pol-tape" style={{ background: photo.tape + '60' }} aria-hidden="true"/>
        <div className="pol-img">
          <img src={photo.src} alt="" loading="lazy"
            onError={e => { e.target.style.display='none' }}/>
        </div>
        <p className="pol-caption hand">{photo.caption}</p>
      </div>
    </div>
  )
}
