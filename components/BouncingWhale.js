'use client'

import { useEffect, useState, useRef } from 'react'

export default function BouncingWhale() {
  const [active, setActive] = useState(false)
  const whaleRef = useRef(null)
  
  // Physics refs to avoid re-running effects on state changes
  const posRef = useRef({ x: 100, y: 100, vx: 4, vy: 3 })
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const dimensionsRef = useRef({ width: 800, height: 600 })
  
  const whaleSize = 64
  const collisionRadius = whaleSize / 2 + 25

  useEffect(() => {
    // Listen for custom event to toggle the whale
    const handleToggle = () => {
      setActive(prev => {
        const next = !prev
        if (next) {
          // Initialize in the center of the screen
          const startX = window.innerWidth / 2 - whaleSize / 2
          const startY = window.innerHeight / 2 - whaleSize / 2
          const angle = Math.random() * Math.PI * 2
          const speed = 4
          posRef.current = {
            x: startX,
            y: startY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed
          }
        }
        return next
      })
    }

    window.addEventListener('toggle-whale', handleToggle)
    return () => window.removeEventListener('toggle-whale', handleToggle)
  }, [])

  // Keep track of window dimensions
  useEffect(() => {
    if (!active) return

    const updateDimensions = () => {
      dimensionsRef.current = {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [active])

  // Track mouse position globally
  useEffect(() => {
    if (!active) return

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [active])

  // Animation Loop
  useEffect(() => {
    if (!active) return

    let animationFrameId
    let isMouseColliding = false
    let rotation = 0

    const updatePhysics = () => {
      const pos = posRef.current
      const mouse = mouseRef.current
      const dims = dimensionsRef.current
      
      // Move whale
      pos.x += pos.vx
      pos.y += pos.vy
      
      // Bounce off walls
      if (pos.x <= 0) {
        pos.x = 0
        pos.vx = Math.abs(pos.vx)
      } else if (pos.x >= dims.width - whaleSize) {
        pos.x = dims.width - whaleSize
        pos.vx = -Math.abs(pos.vx)
      }

      if (pos.y <= 0) {
        pos.y = 0
        pos.vy = Math.abs(pos.vy)
      } else if (pos.y >= dims.height - whaleSize) {
        pos.y = dims.height - whaleSize
        pos.vy = -Math.abs(pos.vy)
      }

      // Check mouse collision
      const whaleCenterX = pos.x + whaleSize / 2
      const whaleCenterY = pos.y + whaleSize / 2
      const dx = whaleCenterX - mouse.x
      const dy = whaleCenterY - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < collisionRadius) {
        if (!isMouseColliding) {
          isMouseColliding = true
          // Calculate angle away from mouse
          const angle = Math.atan2(dy, dx)
          // Speed boost on push
          const currentSpeed = Math.sqrt(pos.vx * pos.vx + pos.vy * pos.vy)
          const newSpeed = Math.min(currentSpeed + 2.5, 12)
          
          pos.vx = Math.cos(angle) * newSpeed
          pos.vy = Math.sin(angle) * newSpeed
        }
      } else {
        isMouseColliding = false
        // Decay speed back to normal slowly
        const currentSpeed = Math.sqrt(pos.vx * pos.vx + pos.vy * pos.vy)
        const targetSpeed = 4
        if (currentSpeed > targetSpeed) {
          const ratio = (currentSpeed - 0.05) / currentSpeed
          pos.vx *= ratio
          pos.vy *= ratio
        }
      }

      // Update DOM
      if (whaleRef.current) {
        // Rotate the whale based on movement direction (flip horizontal if going left)
        const movingLeft = pos.vx < 0
        rotation += (movingLeft ? -pos.vx : pos.vx) * 0.5 // spin speed based on movement
        whaleRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scaleX(${movingLeft ? -1 : 1}) rotate(${movingLeft ? -rotation : rotation}deg)`
      }

      animationFrameId = requestAnimationFrame(updatePhysics)
    }

    animationFrameId = requestAnimationFrame(updatePhysics)
    return () => cancelAnimationFrame(animationFrameId)
  }, [active])

  if (!active) return null

  return (
    <div
      ref={whaleRef}
      className="fixed top-0 left-0 pointer-events-none select-none z-[9999] transition-shadow"
      style={{
        width: whaleSize,
        height: whaleSize,
        willChange: 'transform',
      }}
    >
      {/* Glow effect behind the whale */}
      <div className="absolute inset-0 bg-blue-500/30 blur-md rounded-full pointer-events-none"></div>
      
      {/* Whale Graphic */}
      <div className="relative w-full h-full flex items-center justify-center text-5xl filter drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
        🐋
      </div>
    </div>
  )
}
