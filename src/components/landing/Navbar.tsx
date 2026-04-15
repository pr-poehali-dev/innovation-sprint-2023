import { Menu, X } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { label: "Главная",         href: "#home" },
  { label: "Как это работает", href: "#how" },
  { label: "Туры",            href: "#tours" },
  { label: "Стоимость",       href: "#calc" },
  { label: "Контакты",        href: "#contact" },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a0a2e]/90 backdrop-blur-md border-b border-purple-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-xl font-bold text-white">
            <span className="text-pink-400">Калейдоскоп</span> событий
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-purple-300 hover:text-pink-300"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-xl"
            >
              Связаться
            </a>
          </div>

          <button
            className="md:hidden text-purple-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-purple-700/30 bg-[#200c38]/95 backdrop-blur-md">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block text-purple-300 hover:text-pink-300 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 border-t border-purple-700/30">
              <a
                href="#contact"
                className="block w-full text-center px-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                Связаться
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
