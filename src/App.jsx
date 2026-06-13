import React, { useState } from 'react'
import VanGoghCanvas from './components/VanGoghCanvas'
import Fireflies from './components/Fireflies'
import Header from './components/Header'
import Hero from './components/Hero'
import TreatCounter from './components/TreatCounter'
import About from './components/About'
import Gallery from './components/Gallery'
import DonateModal from './components/DonateModal'
import FloatingDonate from './components/FloatingDonate'
import AudioPlayer from './components/AudioPlayer'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const open = () => setModalOpen(true)
  const close = () => setModalOpen(false)

  return (
    <div className="app">
      {/* Living Van Gogh background */}
      <VanGoghCanvas />
      {/* Whimsical fireflies */}
      <Fireflies />

      <div className="content">
        <Header />
        <main>
          <Hero onDonate={open} />
          <TreatCounter onDonate={open} />
          <Gallery />
          <About />

          <section className="final-cta">
            <div className="container">
              <div className="fcta-stars" aria-hidden="true">
                {['✦','✿','☽','✦','⊙'].map((s,i) => (
                  <span key={i} className="fcta-star" style={{ animationDelay: `${i*0.4}s` }}>{s}</span>
                ))}
              </div>
              <h2 className="fcta-title">She's Still Waiting.</h2>
              <p className="fcta-sub hand">one click · one treat · one very happy spin</p>
              <button className="fcta-btn" onClick={open}>
                <EyeDeco />
                <span className="title-font">Buy The Treat</span>
                <span className="hand fcta-price">$1</span>
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>

      <DonateModal isOpen={modalOpen} onClose={close} />
      <FloatingDonate onDonate={open} />
      <AudioPlayer />
    </div>
  )
}

function EyeDeco() {
  return (
    <span className="fcta-eye" aria-hidden="true">
      <span className="fcta-eye-p"/>
      <span className="fcta-eye-s"/>
      <span className="fcta-eye-th fcta-eye-th--t"/>
      <span className="fcta-eye-th fcta-eye-th--b"/>
    </span>
  )
}
