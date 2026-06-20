import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import './LifeWellSniffed.css'

const PHOTOS = [
  { src: '/coraline-nose.png',     caption: 'Battle gear, deployed.',      pos: 'center 40%' },
  { src: '/coraline-grass.jpeg',   caption: 'Field operations, ongoing.',  pos: 'center 55%' },
  { src: '/coraline-costume.jpeg', caption: 'She made her own title card.', pos: 'center 50%' },
]

const N = PHOTOS.length

function GalleryFrame({ photo, index, progress }) {
  const start = index / N
  const mid   = (index + 0.5) / N
  const end   = (index + 1) / N
  const isFirst = index === 0
  const isLast  = index === N - 1

  const opacity = useTransform(
    progress,
    [
      isFirst ? 0 : Math.max(0, start - 0.04),
      isFirst ? 0.001 : start + 0.02,
      isLast ? 1 : end - 0.06,
      isLast ? 1 : Math.min(1, end + 0.02),
    ],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  )
  const scale = useTransform(progress, [start, mid, end], [1.08, 1, 0.94])
  const y     = useTransform(progress, [start, end], ['4%', '-4%'])

  return (
    <motion.figure className="lws-frame" style={{ opacity, scale, y }}>
      <img src={photo.src} alt="" loading="lazy" style={{ objectPosition: photo.pos }} />
      <figcaption>{photo.caption}</figcaption>
    </motion.figure>
  )
}

function FrameCounter({ progress }) {
  const [n, setN] = useState(1)
  useMotionValueEvent(progress, 'change', (v) => {
    setN(Math.min(N, Math.floor(v * N) + 1))
  })
  return (
    <div className="lws-counter" aria-hidden="true">
      <span>{String(n).padStart(2, '0')}</span>
      <span className="lws-counter-sep"> / {String(N).padStart(2, '0')}</span>
    </div>
  )
}

export default function LifeWellSniffed() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  return (
    <section className="lws" ref={containerRef}>
      <div className="lws-sticky">
        <div className="lws-heading">
          <p className="lws-kicker">act three &middot; the album</p>
          <h2 className="lws-title">A Life Well Sniffed</h2>
        </div>

        <div className="lws-stage">
          {PHOTOS.map((p, i) => (
            <GalleryFrame key={p.src} photo={p} index={i} progress={scrollYProgress} />
          ))}
        </div>

        <FrameCounter progress={scrollYProgress} />
      </div>
    </section>
  )
}
