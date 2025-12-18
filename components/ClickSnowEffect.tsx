"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SvgSnowflake } from "@/components/ui/christmas-icons"

interface Position {
  x: number
  y: number
  id: number
}

export default function ClickSnowEffect() {
  const [clicks, setClicks] = useState<Position[]>([])
  const nextId = useRef(0)
  const animationCount = useRef<{ [key: number]: number }>({})

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const id = nextId.current++
      setClicks((prev) => [...prev, { x: e.clientX, y: e.clientY, id }])
      animationCount.current[id] = 12
    }

    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [])

  const handleAnimationComplete = (clickId: number) => {
    animationCount.current[clickId]--
    if (animationCount.current[clickId] === 0) {
      setClicks((prev) => prev.filter((click) => click.id !== clickId))
      delete animationCount.current[clickId]
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {clicks.map((click) => (
          <div key={click.id}>
            {[...Array(12)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 12 + Math.random() * 0.5
              const distance = 70 + Math.random() * 80
              const duration = 0.9 + Math.random() * 0.5
              const initialScale = 0.6 + Math.random() * 0.7
              const size = 12 + Math.random() * 8

              return (
                <motion.div
                  key={`${click.id}-${i}`}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: initialScale,
                    opacity: 1,
                    rotate: Math.random() * 360,
                  }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    scale: 0,
                    opacity: 0,
                    rotate: Math.random() * 720 - 360,
                  }}
                  transition={{
                    duration,
                    ease: "easeOut",
                  }}
                  onAnimationComplete={() => handleAnimationComplete(click.id)}
                  className="absolute"
                  style={{
                    left: click.x,
                    top: click.y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="text-white/90">
                    <SvgSnowflake size={size} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}
