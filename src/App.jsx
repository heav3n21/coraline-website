import React, { useState } from 'react'
import CircusBackground from './components/CircusBackground'
import StringLights from './components/StringLights'
import Bunting from './components/Bunting'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import About from './components/About'
import DonateModal from './components/DonateModal'
import FloatingDonate from './components/FloatingDonate'
import MusicPlayer from './components/MusicPlayer'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const [modal, setModal] = useState(false)
  const open  = () => setModal(true)
  const close = () => setModal(false)

  return (
    <div className="app">
      {/* Fixed circus tent background */}
      <CircusBackground />

      <div className="site-content">
        {/* String lights + bunting at very top */}
        <StringLights />
        <Bunting />

        <main>
          <Hero onDonate={open} />
          <Gallery />
          <About />
          <FinalCTA onDonate={open} />
        </main>

        <Footer />
      </div>

      <DonateModal isOpen={modal} onClose={close} />
      <FloatingDonate onDonate={open} />
      <MusicPlayer />
    </div>
  )
}

function FinalCTA({ onDonate }) {
  const ref = React.useRef(null)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('in') }, { threshold: .2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="final-cta reveal" ref={ref}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="final-pre hand">she's still waiting.</p>
        <h2 className="final-title">One Treat.<br/>One Dollar.<br/>One Very Happy Spin.</h2>
        <button className="ticket-btn" onClick={onDonate} style={{ margin: '0 auto' }}>
          <span className="ticket-hole ticket-hole--l" aria-hidden="true"/>
          <span>Buy the Treat</span>
          <span className="ticket-price hand">$1</span>
          <span className="ticket-hole ticket-hole--r" aria-hidden="true"/>
        </button>
      </div>
    </section>
  )
}
