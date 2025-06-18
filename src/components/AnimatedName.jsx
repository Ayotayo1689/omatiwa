"use client"

import { useState, useEffect } from "react"
import "./animated.css"

export default function AnimatedName() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const letters = ["O", "m", "a", "t", "i", "w", "a"]

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className=" top-0 left-0 absolute w-[100vw] h-[100dvh] z-[999] flex items-center justify-center bg-[#121F22] overflow-hidden">
      <div className="relative w-full   h-[100dvh] flex">
        {letters.map((letter, index) => (
          <div
            key={index}
            className={`
              relative flex-1 flex items-center justify-center cursor-pointer
              transition-all duration-1000 ease-out
              ${index % 2 === 0 ? "bg-[#121F22]" : "bg-[#FFFFFF]"}
              ${isVisible ? "transform translate-y-0 opacity-100" : "transform translate-y-full opacity-0"}
              ${hoveredIndex === index ? "scale-110 z-10" : "scale-100"}
              hover:shadow-2xl
            `}
            style={{
              transitionDelay: `${index * 150}ms`,
              animationDelay: `${index * 200}ms`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Animated background waves */}
            <div
              className={`
                absolute inset-0 opacity-20
                ${index % 2 === 0 ? "bg-gradient-to-b from-slate-700 to-slate-900" : "bg-gradient-to-b from-white to-slate-200"}
              `}
              style={{
                background: `linear-gradient(45deg, 
                  ${index % 2 === 0 ? "#1e293b, #0f172a" : "#ffffff, #e2e8f0"}
                )`,
                animation: `wave ${3 + index * 0.5}s ease-in-out infinite`,
              }}
            />

            {/* Letter */}
            <span
              className={` animated-name
                relative z-10 text-[40px] md:text-[120px]   transition-all duration-700
                ${index % 2 === 0 ? "text-white" : "text-slate-800"}
                ${isVisible ? "transform rotate-0 scale-100" : "transform rotate-180 scale-0"}
                ${hoveredIndex === index ? "transform rotate-12 scale-125 drop-shadow-2xl" : ""}
              `}
              style={{
                transitionDelay: `${index * 100 + 300}ms`,
                textShadow:
                  hoveredIndex === index
                    ? index % 2 === 0
                      ? "0 0 30px rgba(255,255,255,0.5)"
                      : "0 0 30px rgba(0,0,0,0.3)"
                    : "none",
                animation: isVisible ? `bounce ${2 + index * 0.3}s ease-in-out infinite` : "none",
              }}
            >
              {letter}
            </span>

            {/* Hover overlay */}
            <div
              className={`
                absolute inset-0 transition-all duration-500
                ${
                  hoveredIndex === index
                    ? index % 2 === 0
                      ? "bg-slate-700 opacity-30"
                      : "bg-slate-300 opacity-30"
                    : "opacity-0"
                }
              `}
            />

            {/* Animated particles */}
            {hoveredIndex === index && (
              <>
                <div
                  className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping"
                  style={{ animationDelay: "200ms" }}
                />
                <div
                  className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"
                  style={{ animationDelay: "400ms" }}
                />
              </>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(1deg); }
          50% { transform: translateY(-2px) rotate(-0.5deg); }
          75% { transform: translateY(-8px) rotate(0.5deg); }
        }
      `}</style>
    </div>
  )
}
