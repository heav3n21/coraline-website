import React, { useState } from 'react'
import StarField from './components/StarField'
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
      <StarField />

      <div className="content">
        <Header />
        <main>
          <Hero onDonate={open} />
          <TreatCounter onDonate={open} />
          <Gallery />
          <About />

          {/* Final CTA */}
          <section className="final-cta">
            <div className="container">
              <p className="fcta-pre hand">she's still waiting.</p>
              <h2 className="fcta-title">One treat. One dollar.<br/>One very happy spin.</h2>
              <button className="fcta-btn" onClick={open}>
                <span className="fcta-eye" aria-hidden="true">
                  <span className="fcta-eye-p"/>
                </span>
                <span>Buy the Treat</span>
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
