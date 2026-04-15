import { Mail, Phone, MapPin } from "lucide-react"

const directions = [
  { label: "Фестивальные туры" },
  { label: "Исторические туры" },
  { label: "Культурные события" },
  { label: "Спортивные туры" },
  { label: "Корпоративные туры" },
  { label: "Индивидуальные туры" },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#200c38] border-t border-purple-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-5">
            <div>
              <span className="text-2xl font-bold text-white">Калейдоскоп событий</span>
              <p className="text-pink-400 text-sm mt-1">Туристическая компания</p>
            </div>
            <p className="text-purple-300 leading-relaxed text-sm">
              Событийные туры по всей России — фестивали, исторические реконструкции, культурные форумы и спортивные события.
            </p>
          </div>

          {/* Directions */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Направления</h4>
            <ul className="space-y-3">
              {directions.map((d) => (
                <li key={d.label}>
                  <a href="#tours" className="text-purple-300 hover:text-pink-300 text-sm">
                    {d.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-5">Контакты</h4>
            <div className="space-y-4">
              <a href="tel:+79045327706" className="flex items-center gap-3 text-purple-300 hover:text-pink-300">
                <div className="w-9 h-9 bg-pink-500/20 border border-pink-500/30 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-pink-400" />
                </div>
                <span className="text-sm">+7 (904) 532-77-06</span>
              </a>
              <a href="mailto:89045327706taisiya@gmail.com" className="flex items-center gap-3 text-purple-300 hover:text-pink-300">
                <div className="w-9 h-9 bg-pink-500/20 border border-pink-500/30 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-pink-400" />
                </div>
                <span className="text-sm break-all">89045327706taisiya@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-purple-300">
                <div className="w-9 h-9 bg-pink-500/20 border border-pink-500/30 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-pink-400" />
                </div>
                <span className="text-sm">Россия, по всей стране</span>
              </div>
            </div>

            <a
              href="tel:+79045327706"
              className="mt-6 block w-full text-center px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl"
            >
              Позвонить нам
            </a>
          </div>
        </div>

        <div className="border-t border-purple-700/30 pt-8 text-center text-purple-500 text-sm">
          © 2025 Калейдоскоп событий. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
