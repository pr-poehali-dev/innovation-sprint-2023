import { motion } from "framer-motion"
import { useState } from "react"
import { TrendingUp, Users, Star, MapPin, BarChart3 } from "lucide-react"

const tourTypes = [
  {
    id: "festival",
    name: "Фестивальный",
    icon: <Star className="w-6 h-6" />,
    pricePerPerson: 18000,
    description: "Музыка и культура",
  },
  {
    id: "history",
    name: "Исторический",
    icon: <MapPin className="w-6 h-6" />,
    pricePerPerson: 22000,
    description: "Реконструкции и форумы",
  },
  {
    id: "group",
    name: "Групповой",
    icon: <Users className="w-6 h-6" />,
    pricePerPerson: 14000,
    description: "Корпоратив и друзья",
  },
  {
    id: "vip",
    name: "VIP-тур",
    icon: <TrendingUp className="w-6 h-6" />,
    pricePerPerson: 45000,
    description: "Премиум-формат",
  },
]

const formatRub = (num: number) => {
  return num.toLocaleString('ru-RU')
}

export default function ROICalculatorHome() {
  const [people, setPeople] = useState(2)
  const [selectedTour, setSelectedTour] = useState("festival")

  const selectedTourType = tourTypes.find((t) => t.id === selectedTour)
  const pricePerPerson = selectedTourType?.pricePerPerson || 18000

  const calculateTotal = (count: number) => {
    return count * pricePerPerson
  }

  const calculateMonthlyRevenue = (count: number) => {
    return Math.round(calculateTotal(count) * 0.15)
  }

  return (
    <section className="py-24 bg-black relative backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Рассчитайте стоимость тура</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Выберите тип тура и количество человек — узнайте примерную стоимость поездки
          </p>
        </motion.div>

        <div className="bg-gray-900/40 border border-gray-700/30 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle animated background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(147,51,234,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(34,197,94,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(249,115,22,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 15, repeat: Infinity }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-8">
              {/* Tour Type Selection */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">Выберите тип тура</label>
                <div className="grid grid-cols-2 gap-3">
                  {tourTypes.map((tour) => (
                    <motion.button
                      key={tour.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTour(tour.id)}
                      className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                        selectedTour === tour.id
                          ? "bg-emerald-500/20 border-emerald-500/50 text-white"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${
                            selectedTour === tour.id ? "bg-emerald-500/30" : "bg-gray-700/50"
                          }`}
                        >
                          {tour.icon}
                        </div>
                        <div>
                          <div className="font-medium">{tour.name}</div>
                          <div className="text-xs opacity-70">{tour.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* People Slider */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">Количество человек</label>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={people}
                    onChange={(e) => setPeople(Number(e.target.value))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${((people - 1) / (20 - 1)) * 100}%, #374151 ${((people - 1) / (20 - 1)) * 100}%, #374151 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>1 чел.</span>
                    <span>20 чел.</span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span className="text-3xl font-bold text-white">{people}</span>
                  <span className="text-gray-400 ml-2">{people === 1 ? "человек" : people < 5 ? "человека" : "человек"}</span>
                </div>
              </div>

              {/* Info */}
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-medium text-white">Ориентировочная стоимость</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Цена рассчитана на основе средней стоимости туров. Точная стоимость зависит от
                  даты, города и дополнительных опций. Свяжитесь с нами для точного расчёта.
                </p>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-8">
              {/* ROI Circle */}
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-gray-700"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="url(#gradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 219.8" }}
                    animate={{
                      strokeDasharray: `${Math.min((people / 20) * 219.8, 219.8)} 219.8`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06d6a0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      key={`${people}-${selectedTour}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-white"
                    >
                      {people}
                    </motion.div>
                    <div className="text-gray-400 text-sm">чел.</div>
                  </div>
                </div>
              </div>

              {/* Revenue Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 text-center">
                  <div className="w-8 h-8 text-emerald-400 mx-auto mb-2 flex items-center justify-center text-2xl font-bold">&#8381;</div>
                  <motion.div
                    key={`per-person-${people}-${selectedTour}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-white mb-1"
                  >
                    {formatRub(pricePerPerson)}
                  </motion.div>
                  <div className="text-gray-400 text-sm">за человека</div>
                </div>

                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 text-center">
                  <TrendingUp className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                  <motion.div
                    key={`total-${people}-${selectedTour}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-white mb-1"
                  >
                    {formatRub(calculateTotal(people))}
                  </motion.div>
                  <div className="text-gray-400 text-sm">Итого &#8381;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}