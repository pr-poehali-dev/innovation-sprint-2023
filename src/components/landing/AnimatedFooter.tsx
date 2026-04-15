import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import AnimatedButton from "./AnimatedButton"

export default function AnimatedFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setTimeout(() => setIsSubscribed(false), 3000)
    setEmail("")
  }

  return (
    <footer id="contact" className="relative bg-black border-t border-gray-800/50">
      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Узнавайте о событиях первыми</h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Подпишитесь на рассылку и получайте анонсы новых туров, специальные предложения и горящие путёвки.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubscribe}
            className="max-w-md mx-auto"
          >
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш email"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  required
                />
              </div>
              <AnimatedButton
                type="submit"
                className="bg-white text-black hover:bg-gray-100"
              >
                <ArrowRight className="h-5 w-5" />
              </AnimatedButton>
            </div>
            {isSubscribed && (
              <p className="text-green-400 text-center mt-4 animate-fade-in">Спасибо за подписку!</p>
            )}
          </motion.form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="group flex justify-center lg:justify-start">
              <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105">
                Калейдоскоп событий
              </span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              Туристическое агентство событийных туров по России. Открываем страну через фестивали,
              исторические реконструкции и уникальные культурные события с 2015 года.
            </p>

            {/* Social Links */}
            <div className="flex space-x-6 justify-center lg:justify-start">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a href={href} className="group relative" aria-label={label}>
                    <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-800 group-hover:border-gray-700 transition-colors">
                      <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links and Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Направления</h4>
              <ul className="space-y-4">
                {[
                  { label: "Фестивальные туры", cat: "festival" },
                  { label: "Исторические туры", cat: "history" },
                  { label: "Культурные события", cat: "culture" },
                  { label: "Спортивные туры", cat: "sport" },
                  { label: "Корпоративные туры", cat: "corporate" },
                  { label: "Индивидуальные туры", cat: "custom" },
                ].map((item, index) => (
                  <motion.li
                    key={item.cat}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/tours?category=${item.cat}`}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center justify-center sm:justify-start group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-fuchsia-500 transition-all duration-200 mr-0 group-hover:mr-2" />
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Контакты</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-400 justify-center sm:justify-start">
                  <Mail className="h-5 w-5 text-emerald-500" />
                  <span>info@kaleidoscope-tour.ru</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 justify-center sm:justify-start">
                  <Phone className="h-5 w-5 text-emerald-500" />
                  <span>+7 (800) 555-00-00</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 justify-center sm:justify-start">
                  <MapPin className="h-5 w-5 text-emerald-500" />
                  <span>Россия, по всей стране</span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  to="/tours"
                  className="block w-full text-center px-6 py-3 bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-semibold rounded-xl transition-colors duration-200"
                >
                  Подобрать тур
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
            <p className="text-gray-500 text-sm">
              {new Date().getFullYear()} Калейдоскоп событий. Все права защищены.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Условия использования
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}