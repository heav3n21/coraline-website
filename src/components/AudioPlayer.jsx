import React, { useRef, useState, useEffect } from 'react'
import './AudioPlayer.css'

export default function AudioPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.55
    audio.loop = true
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => {
        setPlaying(true)
        setStarted(true)
      }).catch(() => {})
    }
  }

  return (
    <div className="audio-player">
      <audio ref={audioRef} src="/in-the-bed.mp3" loop preload="none" />
      <button
        className={`audio-btn ${playing ? 'playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        title={playing ? 'Pause' : 'Play "In The Bed"'}
      >
        <span className="audio-icon">
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="2" y="2" width="4" height="12" rx="1"/>
              <rect x="10" y="2" width="4" height="12" rx="1"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 2.5l11 5.5-11 5.5V2.5z"/>
            </svg>
          )}
        </span>
        <span className="audio-label hand">
          {!started ? '♪ play music' : playing ? '♪ playing...' : '♪ paused'}
        </span>
        {playing && (
          <span className="audio-waves" aria-hidden="true">
            <span/><span/><span/><span/>
          </span>
        )}
      </button>
    </div>
  )
}
