import React from 'react'
import './Bunting.css'

const FLAGS = Array.from({ length: 17 }, (_, i) => i % 2 === 0 ? 'red' : 'gold')

export default function Bunting() {
  return (
    <div className="bunting" aria-hidden="true">
      <svg
        width="100%"
        viewBox="0 0 360 36"
        preserveAspectRatio="none"
        className="bunting-svg"
      >
        {/* Drooping string */}
        <path
          d="M0,4 Q90,18 180,4 Q270,18 360,4"
          stroke="rgba(180,130,20,.55)"
          strokeWidth="1.5"
          fill="none"
        />
        {FLAGS.map((color, i) => {
          const x = 12 + i * 20
          const yOffset = Math.sin((i / (FLAGS.length - 1)) * Math.PI) * 10
          const y = 4 + yOffset
          const fill = color === 'red' ? '#A12A1D' : '#E0B24F'
          return (
            <polygon
              key={i}
              points={`${x},${y} ${x + 14},${y} ${x + 7},${y + 18}`}
              fill={fill}
              opacity=".92"
            />
          )
        })}
      </svg>
    </div>
  )
}
