import React from 'react'
import './StringLights.css'

const BULBS = ['#5CAFE8','#ff4444','#5CAFE8','#ff8800','#5CAFE8','#ff4444','#5CAFE8','#ff8800','#5CAFE8','#ff4444','#5CAFE8','#ff8800']

export default function StringLights() {
  return (
    <div className="string-lights" aria-hidden="true">
      <div className="string-wire" />
      {BULBS.map((color, i) => (
        <div
          key={i}
          className="bulb"
          style={{
            '--color': color,
            left: `${(i / (BULBS.length - 1)) * 94 + 3}%`,
            animationDelay: `${i * 0.18}s`,
          }}
        >
          <div className="bulb-stem" />
          <div className="bulb-globe" style={{ background: color }} />
        </div>
      ))}
    </div>
  )
}
