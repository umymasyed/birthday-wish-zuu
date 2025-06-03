"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, Heart, Gift, Cake, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BirthdayWish() {
  const [showMessage, setShowMessage] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setDimensions({ width: window.innerWidth, height: window.innerHeight })

    const timer = setTimeout(() => setShowMessage(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleCelebrate = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
  }

  if (!isClient) return null // Skip SSR rendering

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: "url(/bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/20" />

      {/* Flying hearts animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-red-400"
            initial={{
              x: -100,
              y: Math.random() * dimensions.height,
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: dimensions.width + 100,
              y: [
                null,
                Math.random() * dimensions.height - 200,
                Math.random() * dimensions.height,
              ],
              opacity: [0, 1, 1, 0],
              rotate: [0, 45, -45, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 20,
              ease: "linear",
            }}
          >
            <Heart size={Math.random() * 20 + 15} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Flying sparkles animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute text-yellow-400"
            initial={{
              x: -50,
              y: Math.random() * dimensions.height,
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: dimensions.width + 50,
              y: [
                null,
                Math.random() * dimensions.height - 100,
                Math.random() * dimensions.height + 100,
              ],
              opacity: [0, 1, 1, 0],
              rotate: [0, 180, 360],
              scale: [
                null,
                Math.random() + 0.5,
                Math.random() * 0.5 + 0.2,
              ],
            }}
            transition={{
              duration: Math.random() * 8 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 15,
              ease: "linear",
            }}
          >
            <Star size={Math.random() * 15 + 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Floating sparkles animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute text-yellow-400"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
              opacity: 0,
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            <Sparkles size={16} />
          </motion.div>
        ))}
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(100)].map((_, i) => {
            const isHeart = Math.random() > 0.7
            return (
              <motion.div
                key={`confetti-${i}`}
                className="absolute"
                style={{
                  left: Math.random() * 100 + "%",
                  color: Math.random() > 0.5 ? "#f87171" : "#fbbf24",
                }}
                initial={{ y: -10, opacity: 1 }}
                animate={{
                  y: dimensions.height + 10,
                  x: [null, Math.random() * 200 - 100],
                  rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  ease: "easeOut",
                }}
              >
                {isHeart ? (
                  <Heart
                    size={Math.random() * 15 + 10}
                    fill="currentColor"
                  />
                ) : (
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "currentColor" }}
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="mb-8"
        >
          <div className="flex justify-center items-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Cake className="text-yellow-400" size={48} />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <Heart className="text-red-400" size={40} fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -15, 15, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.5,
              }}
            >
              <Gift className="text-yellow-400" size={44} />
            </motion.div>
          </div>
        </motion.div>

        {showMessage && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent mb-8"
              style={{ fontFamily: "'Great Vibes', cursive" }}
              animate={{
                textShadow: [
                  "0 0 20px rgba(251, 191, 36, 0.5)",
                  "0 0 40px rgba(251, 191, 36, 0.8)",
                  "0 0 20px rgba(251, 191, 36, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Happy Birthday to my Forever Person!
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto"
              style={{ fontFamily: "'Dancing Script', cursive" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <span
                className="text-yellow-400 font-medium text-2xl md:text-3xl"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                "I love you more than words can say"
              </span>
              <br />
              <br />
              You are my heart, my soul, my everything.
              <br />
              Every moment with you is a precious gift that I treasure forever.
              <br />
              Here's to celebrating you today and always! ✨
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="pt-8"
            >
              <Button
                onClick={handleCelebrate}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                💕 Celebrate My Love! 💕
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Decorative sparkles */}
        <motion.div
          className="absolute -top-10 -left-10 text-yellow-400/30"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Sparkles size={60} />
        </motion.div>
        <motion.div
          className="absolute -bottom-10 -right-10 text-yellow-400/30"
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Sparkles size={80} />
        </motion.div>
      </div>
    </div>
  )
}
