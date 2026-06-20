import React, { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import CircusBackground from './components/CircusBackground'
import TentOpen from './sections/TentOpen'
import Introduction from './sections/Introduction'
import Origin from './sections/Origin'
import LifeWellSniffed from './sections/LifeWellSniffed'
import Stats from './sections/Stats'
import Waiting from './sections/Waiting'
import FinalCTA from './sections/FinalCTA'
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
    <MotionConfig reducedMotion="user">
      <div className="app">
        <CircusBackground />

        <div className="site-content">
          <main>
            <TentOpen />
            <Introduction />
            <Origin />
            <LifeWellSniffed />
            <Stats />
            <Waiting />
            <FinalCTA onDonate={open} />
          </main>

          <Footer />
        </div>

        <DonateModal isOpen={modal} onClose={close} />
        <FloatingDonate onDonate={open} />
        <MusicPlayer />
      </div>
    </MotionConfig>
  )
}
