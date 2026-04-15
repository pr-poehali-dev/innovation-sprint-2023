import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import AnimatedButton from "./AnimatedButton"
import CountingStats from "./CountingStats"
import { cn } from "@/lib/utils"

const bgImages = [
  "https://cdn.poehali.dev/projects/f72d285d-08f7-4e55-aa66-0ddb50cc98da/files/cb2ab19a-b0d1-4aef-95c4-42d8ec1f4a5f.jpg",
  "https://cdn.poehali.dev/projects/f72d285d-08f7-4e55-aa66-0ddb50cc98da/files/8ff0991b-e943-4e60-bbbe-e2b543888ee0.jpg",
  "https://cdn.poehali.dev/projects/f72d285d-08f7-4e55-aa66-0ddb50cc98da/files/19d6805e-0d45-45dd-8582-e1889db4f2ef.jpg",
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgImages.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { value: 200, suffix: "+", label: "Событийных туров" },
    { value: 98, suffix: "%", label: "Довольных туристов" },
    { value: 10, suffix: "+", label: "Лет на рынке" },
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background photo slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={bgImages[current]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>
        {/* Candy-coloured overlay: keeps text readable but lets vivid colours breathe */}
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900/60 via-violet-900/50 to-black/70" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {bgImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === current ? "w-6 bg-fuchsia-400" : "w-2 bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-fuchsia-500/30 via-violet-500/30 to-pink-500/30 border border-white/30 rounded-full text-sm text-white font-medium backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3 animate-pulse"></div>
                <span>Событийные туры по всей России</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              >
                <span className="block text-white mb-2">ПУТЕШЕСТВИЯ</span>
                <span className="block text-white mb-2">ПО САМЫМ ЯРКИМ</span>
                <span
                  className={cn(
                    "block mb-2 bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-400 bg-clip-text text-transparent font-pacifico",
                  )}
                  style={{ textShadow: "0 0 40px rgba(232, 72, 200, 0.5)" }}
                >
                  Событиям
                </span>
                <span className="block text-gray-200">СТРАНЫ</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto lg:mx-0"
              >
                «Калейдоскоп событий» — ваш проводник в мир уникальных событийных туров по России. Фестивали, форумы, исторические реконструкции и культурные события — мы создаём путешествия, которые запоминаются навсегда.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col gap-6 items-center justify-center lg:justify-start lg:items-start"
            >
              <a href="#get-started">
                <AnimatedButton variant="slim" className="bg-fuchsia-500 text-white hover:bg-fuchsia-600">
                  <span className="flex items-center">
                    Подобрать тур
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </AnimatedButton>
              </a>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg text-xl">
                    🎪
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Вся Россия</p>
                    <p className="text-xs text-gray-300">Фестивали и события</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg text-xl">
                    🎭
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Уникальные события</p>
                    <p className="text-xs text-gray-300">Фестивали и форумы</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-700 rounded-xl flex items-center justify-center shadow-lg text-xl">
                    ✨
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Опыт с 2015 года</p>
                    <p className="text-xs text-gray-300">10+ лет на рынке</p>
                  </div>
                </div>
              </div>

              <CountingStats stats={stats} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
