import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

const bgImages = [
  "https://cdn.poehali.dev/projects/f72d285d-08f7-4e55-aa66-0ddb50cc98da/files/cb2ab19a-b0d1-4aef-95c4-42d8ec1f4a5f.jpg",
  "https://cdn.poehali.dev/projects/f72d285d-08f7-4e55-aa66-0ddb50cc98da/files/8ff0991b-e943-4e60-bbbe-e2b543888ee0.jpg",
  "https://cdn.poehali.dev/projects/f72d285d-08f7-4e55-aa66-0ddb50cc98da/files/19d6805e-0d45-45dd-8582-e1889db4f2ef.jpg",
]

const features = [
  { icon: "🎪", title: "Фестивали и события", desc: "Музыка, культура, история" },
  { icon: "🗺️", title: "Вся Россия", desc: "От Калининграда до Владивостока" },
  { icon: "🎭", title: "Полное сопровождение", desc: "Гид, логистика, проживание" },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgImages.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

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

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: headline + CTA */}
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
                <div className="w-2 h-2 bg-fuchsia-400 rounded-full mr-3 animate-pulse" />
                Событийные туры по всей России
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
                  className="block mb-2 bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-400 bg-clip-text text-transparent font-pacifico"
                  style={{ textShadow: "0 0 40px rgba(232, 72, 200, 0.5)" }}
                >
                  Событиям
                </span>
                <span className="block text-gray-200">СТРАНЫ</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 px-8 py-4 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold rounded-xl transition-colors duration-200 text-lg shadow-lg shadow-fuchsia-500/30"
              >
                Подобрать тур
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap gap-3"
            >
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl"
                >
                  <span className="text-lg">{f.icon}</span>
                  <div>
                    <p className="text-white text-xs font-semibold leading-tight">{f.title}</p>
                    <p className="text-gray-300 text-xs leading-tight">{f.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: about the company */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-black/40 backdrop-blur-md border border-white/15 rounded-3xl p-8 space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Калейдоскоп событий</h2>
              <p className="text-fuchsia-300 text-sm font-medium">Туристическая компания</p>
            </div>

            <p className="text-gray-200 leading-relaxed">
              Мы специализируемся на событийном туризме — направлении, где поводом для путешествия
              становится конкретное событие: фестиваль, историческая реконструкция, спортивный
              чемпионат или культурный форум.
            </p>

            <p className="text-gray-300 leading-relaxed text-sm">
              Каждый тур мы собираем вокруг события, которое невозможно увидеть в другом месте и в
              другое время. Вы не просто едете в город — вы попадаете в эпицентр происходящего.
              Наши гиды — это не просто сопровождающие, а люди, влюблённые в то событие, к которому
              они вас везут.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { value: "200+", label: "Событийных туров" },
                { value: "98%", label: "Довольных туристов" },
                { value: "50+", label: "Уникальных событий" },
                { value: "10 лет", label: "На туристическом рынке" },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-fuchsia-300 text-xl font-bold">{s.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
