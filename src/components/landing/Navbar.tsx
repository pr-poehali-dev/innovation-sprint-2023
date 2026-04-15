import { Menu, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl">
      <nav className="relative bg-gray-900/60 backdrop-blur-md border border-gray-700/40 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative z-10 px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-xl font-bold bg-gradient-to-r from-fuchsia-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Калейдоскоп событий
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/tours" className="text-sm text-gray-300 hover:text-fuchsia-400 transition-colors">
                Каталог туров
              </Link>
              <a href="#how" className="text-sm text-gray-300 hover:text-pink-400 transition-colors">
                Как это работает
              </a>
              <a href="#contact" className="text-sm text-gray-300 hover:text-orange-400 transition-colors">
                Контакты
              </a>
            </div>

            <div className="hidden md:flex items-center">
              <Link
                to="/tours"
                className="px-5 py-2 bg-fuchsia-500 hover:bg-fuchsia-600 text-white text-sm font-semibold rounded-xl transition-colors duration-200"
              >
                Подобрать тур
              </Link>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5 text-gray-300" /> : <Menu className="h-5 w-5 text-gray-300" />}
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700/50 bg-gray-900/80 backdrop-blur-md rounded-b-2xl">
            <div className="px-6 py-4 space-y-3">
              <Link
                to="/tours"
                className="block text-gray-300 hover:text-fuchsia-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Каталог туров
              </Link>
              <a href="#how" className="block text-gray-300 hover:text-pink-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Как это работает
              </a>
              <a href="#contact" className="block text-gray-300 hover:text-orange-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                Контакты
              </a>
              <div className="pt-3 border-t border-gray-700">
                <Link
                  to="/tours"
                  className="block w-full text-center px-5 py-2.5 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold rounded-xl transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Подобрать тур
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
