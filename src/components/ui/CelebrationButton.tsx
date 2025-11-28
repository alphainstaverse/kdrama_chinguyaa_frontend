'use client'

import { useState, useEffect, useRef } from 'react'
import { Fireworks } from '@fireworks-js/react'

export default function CelebrationButton() {
  const [showFireworks, setShowFireworks] = useState(false)
  const hasTriggeredRef = useRef(false)

  const startCelebration = () => {
    setShowFireworks(true)
    
    // Stop after 5 seconds
    setTimeout(() => {
      setShowFireworks(false)
    }, 5000)
  }

  useEffect(() => {
    // Prevent double firing in React Strict Mode
    if (hasTriggeredRef.current) return
    hasTriggeredRef.current = true

    // The function to run when the page is fully ready
    const handlePageLoad = () => {
      // Add a tiny delay (500ms) after the browser says "Load Complete"
      // just to be sure the user sees the interface first
      setTimeout(() => {
        startCelebration()
      }, 500)
    }

    // Check if the page is ALREADY fully loaded (common in Single Page App navigation)
    if (document.readyState === 'complete') {
      handlePageLoad()
    } else {
      // If not, wait for the browser's official 'load' event (waits for images/css)
      window.addEventListener('load', handlePageLoad)
      
      // Cleanup listener
      return () => window.removeEventListener('load', handlePageLoad)
    }
  }, [])

  return (
    <>
      <button
        onClick={startCelebration}
        className="text-xs md:text-sm px-4 py-2 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold rounded-md shadow-md hover:opacity-90 transition-all hover:scale-105"
      >
        🎉 1 Month Anniversary - Celebrate
      </button>

      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          <Fireworks
            options={{
              hue: { min: 0, max: 345 },
              acceleration: 1.05,
              brightness: { min: 50, max: 80 },
              decay: { min: 0.015, max: 0.03 },
              delay: { min: 30, max: 60 },
              explosion: 5,
              flickering: 50,
              intensity: 30,
              friction: 0.97,
              gravity: 1.5,
              opacity: 0.5,
              particles: 90,
              traceSpeed: 3,
              rocketsPoint: { min: 50, max: 50 },
              lineWidth: { explosion: { min: 1, max: 4 }, trace: { min: 1, max: 2 } },
            }}
            style={{
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              position: 'fixed',
              background: 'transparent',
            }}
          />
        </div>
      )}
    </>
  )
}