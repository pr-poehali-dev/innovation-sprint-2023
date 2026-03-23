import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import AnimatedButton from "./AnimatedButton"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl">
      <motion.nav
        className="relative bg-gray-900/60 backdrop-blur-md border rounded-2xl shadow-lg overflow-hidden"
        animate={{
          borderColor: [
            "rgba(16, 185, 129, 0.3)",
            "rgba(20, 184, 166, 0.3)",
            "rgba(6, 182, 212, 0.3)",
            "rgba(16, 185, 129, 0.3)",
            "rgba(20, 184, 166, 0.3)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              "0 0 20px rgba(16, 185, 129, 0.2)",
              "0 0 20px rgba(20, 184, 166, 0.2)",
              "0 0 20px rgba(6, 182, 212, 0.2)",
              "0 0 20px rgba(16, 185, 129, 0.2)",
              "0 0 20px rgba(20, 184, 166, 0.2)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="relative z-10 px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-3">
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Калейдоскоп событий
                </span>
              </a>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#services" className="text-sm text-gray-300 hover:text-emerald-400 transition-colors">
                  Туры
                </a>
                <a href="#artists" className="text-sm text-gray-300 hover:text-teal-400 transition-colors">
                  Направления
                </a>
                <a href="#success-stories" className="text-sm text-gray-300 hover:text-cyan-400 transition-colors">
                  Отзывы
                </a>
                <a href="#contact" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                  Контакты
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a href="#get-started">
                <AnimatedButton size="sm" className="bg-emerald-500 text-white hover:bg-emerald-600">
                  Подобрать тур
                </AnimatedButton>
              </a>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5 text-gray-300" /> : <Menu className="h-5 w-5 text-gray-300" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700/50 bg-gray-900/80 backdrop-blur-md rounded-b-2xl">
            <div className="px-6 py-4 space-y-3">
              <a href="#services" className="block text-gray-300 hover:text-emerald-400">
                Туры
              </a>
              <a href="#artists" className="block text-gray-300 hover:text-teal-400">
                Направления
              </a>
              <a href="#success-stories" className="block text-gray-300 hover:text-cyan-400">
                Отзывы
              </a>
              <a href="#contact" className="block text-gray-300 hover:text-orange-400">
                Контакты
              </a>
              <div className="pt-3 border-t border-gray-700">
                <a href="#get-started" className="block">
                  <AnimatedButton className="w-full bg-emerald-500 text-white hover:bg-emerald-600">Подобрать тур</AnimatedButton>
                </a>
              </div>
            </div>
          </div>
        )}
      </motion.nav>
    </header>
  )
}