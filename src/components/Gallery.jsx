import React, { useRef, useEffect } from 'react'
import './Gallery.css'

// Real photos + captions
const PHOTOS = [
  {
    src: '/coraline-nose.png',
    caption: 'hello. yes. treat?',
    alt: 'Coraline nose pressed to camera',
    rot: -2,
    tape: 'blue',
  },
  {
    src: '/coraline-costume.jpeg',
    caption: 'battle gear. do not approach.',
    alt: 'Coraline in green monster costume',
    rot: 2.5,
    tape: 'green',
  },
  {
    src: '/coraline-grass.jpeg',
    caption: 'field explorations, ongoing',
    alt: 'Coraline in tall grass',
    rot: -1.5,
    tape: 'rose',
  },
]

function PhotoCard({ photo, index }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add('visible'), index * 100) } },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  const tapeColors = {
    blue: 'rgba(91, 158, 240, 0.35)',
    green: 'rgba(152, 208, 32, 0.35)',
    rose: 'rgba(196, 80, 106, 0.35)',
  }

  return (
    <div className="gal-item fade-up" ref={ref} style={{ '--rot': `${photo.rot}deg` }}>
      <div className="gal-polaroid">
        {/* Tape strip */}
        <div
          className="gal-tape"
          style={{ background: tapeColors[photo.tape] }}
          aria-hidden="true"
        />
        {/* Button eye on polaroid */}
        <div className="gal-eye-decor" aria-hidden="true">
          <div className="gal-eye">
            <div className="gal-eye-p"/>
            <div className="gal-eye-s"/>
          </div>
        </div>
        <div className="gal-photo-wrap">
          <img
            src={photo.src}
            alt={photo.alt}
            className="gal-photo"
            loading="lazy"
          />
        </div>
        <p className="gal-caption hand">{photo.caption}</p>
      </div>
    </div>
  )
}

export default function Gallery() {
  const headerRef = useRef(null)
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add('visible') },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="gallery">
      <div className="container container--wide">
        <div className="gal-header fade-up" ref={headerRef}>
          <div className="gal-divider-line" aria-hidden="true">
            <span/><span className="hand">the album</span><span/>
          </div>
          <h2>A Life Well Sniffed</h2>
        </div>

        <div className="gal-grid">
          {PHOTOS.map((p, i) => (
            <PhotoCard key={i} photo={p} index={i} />
          ))}
        </div>

        <p className="gal-note hand">
          + several thousand more, all equally excellent
        </p>
      </div>
    </section>
  )
}
