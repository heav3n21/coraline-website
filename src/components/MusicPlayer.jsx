import React, { useRef, useState, useEffect } from 'react'
import './MusicPlayer.css'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.55)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = true
    }
  }, [])

  const toggle = () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      a.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value)
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  return (
    <div className={`music-player ${playing ? 'playing' : ''}`}>
      <audio ref={audioRef} src="/in-the-bed.mp3" loop preload="none" />
      <button className="mp-btn" onClick={toggle} aria-label={playing ? 'Pause' : 'Play music'}>
        {playing ? (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
            <rect x="0" y="0" width="3.5" height="12" rx="1"/>
            <rect x="6.5" y="0" width="3.5" height="12" rx="1"/>
          </svg>
        ) : (
          <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor">
            <path d="M0 0.5L11 6L0 11.5V0.5Z"/>
          </svg>
        )}
      </button>

      <div className="mp-info">
        <span className="mp-title">In The Bed</span>
        {playing ? (
          <div className="mp-bars" aria-hidden="true">
            <span/><span/><span/><span/><span/>
          </div>
        ) : (
          <span className="mp-hint">tap to play</span>
        )}
      </div>

      <div className="mp-vol" aria-label="Volume control">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          {volume > 0.1 && <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>}
        </svg>
        <input
          type="range" min="0" max="1" step="0.02" value={volume}
          onChange={handleVolume}
          className="mp-slider"
          aria-label="Volume"
        />
      </div>
    </div>
  )
}
