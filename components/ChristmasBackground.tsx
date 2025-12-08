// components/ui/ChristmasBackground.tsx
// Now a Christmas / winter background

import { useEffect, useState } from "react"
import {
  SvgSnowflake,
  SvgTree,
  SvgStar,
  SvgGift,
  SvgOrnament,
} from "@/components/ui/christmas-icons"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  rotation: number
  speed: number
  type: number // which icon to use
}

const icons: ((size: number) => JSX.Element)[] = [
  (size) => <SvgSnowflake size={size} />,
  (size) => <SvgTree size={size} />,
  (size) => <SvgStar size={size} />,
  (size) => <SvgGift size={size} />,
  (size) => <SvgOrnament size={size} />,
]

export default function ChristmasBackground() {
  const [particles, setParticles] = useState<Particle[]>([])

  // Spawn new particles
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      setParticles((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,      // random horizontal position
          y: -10,                      // start slightly above the top
          size: Math.random() * 16 + 10, // 10–26px
          opacity: 1,
          rotation: Math.random() * 360,
          speed: Math.random() * 0.25 + 0.15, // each falls at a slightly different speed
          type: Math.floor(Math.random() * icons.length),
        },
      ])
    }, 400) // how often new icons appear

    return () => clearInterval(spawnInterval)
  }, [])

  // Animate particles
  useEffect(() => {
    const animationInterval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y + p.speed,              // fall downwards
            opacity: p.opacity - 0.003,    // fade out slowly
            rotation: p.rotation + 0.2,    // gentle spin
          }))
          .filter((p) => p.opacity > 0 && p.y < 120), // remove once gone
      )
    }, 50)

    return () => clearInterval(animationInterval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            transform: `rotate(${p.rotation}deg)`,
            transition: "transform 50ms linear",
          }}
        >
          {icons[p.type](p.size)}
        </div>
      ))}
    </div>
  )
}
