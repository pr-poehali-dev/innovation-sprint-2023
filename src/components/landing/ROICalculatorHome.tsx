import { useState } from "react"
import { TrendingUp, Users, Star, MapPin } from "lucide-react"
import BookingModal from "./BookingModal"

const tourTypes = [
  { id: "festival", name: "Фестивальный", icon: <Star className="w-5 h-5" />, pricePerPerson: 18000, description: "Музыка и культура" },
  { id: "history",  name: "Исторический", icon: <MapPin className="w-5 h-5" />, pricePerPerson: 22000, description: "Реконструкции и форумы" },
  { id: "group",    name: "Групповой",    icon: <Users className="w-5 h-5" />, pricePerPerson: 14000, description: "Корпоратив и друзья" },
  { id: "vip",      name: "VIP-тур",      icon: <TrendingUp className="w-5 h-5" />, pricePerPerson: 45000, description: "Премиум-формат" },
]

export default function ROICalculatorHome() {
  const [people, setPeople] = useState(2)
  const [selectedTour, setSelectedTour] = useState("festival")
  const [modalOpen, setModalOpen] = useState(false)

  const pricePerPerson = tourTypes.find((t) => t.id === selectedTour)?.pricePerPerson || 18000
  const total = people * pricePerPerson

  return (
    <>
    <section id="calc" className="py-20 bg-[#1a0a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Рассчитайте стоимость тура</h2>
          <p className="text-lg text-purple-300 max-w-2xl mx-auto">
            Выберите тип тура и количество человек — узнайте примерную стоимость поездки
          </p>
        </div>

        <div className="bg-[#2d0a4e]/60 border border-purple-600/30 rounded-3xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-8">
              <div>
                <label className="block text-base font-medium text-white mb-4">Выберите тип тура</label>
                <div className="grid grid-cols-2 gap-3">
                  {tourTypes.map((tour) => (
                    <button
                      key={tour.id}
                      onClick={() => setSelectedTour(tour.id)}
                      className={`p-4 rounded-xl border text-left ${
                        selectedTour === tour.id
                          ? "bg-pink-500/20 border-pink-500/50 text-white"
                          : "bg-purple-900/30 border-purple-700/40 text-purple-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-1">
                        <div className={`p-1.5 rounded-lg ${selectedTour === tour.id ? "bg-pink-500/30 text-pink-300" : "bg-purple-800/50 text-purple-400"}`}>
                          {tour.icon}
                        </div>
                        <span className="font-medium text-sm">{tour.name}</span>
                      </div>
                      <p className="text-xs opacity-60 pl-9">{tour.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-base font-medium text-white mb-4">Количество человек: <span className="text-pink-400 font-bold">{people}</span></label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${((people - 1) / 19) * 100}%, #4c1d6e ${((people - 1) / 19) * 100}%, #4c1d6e 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-purple-400 mt-2">
                  <span>1 чел.</span>
                  <span>20 чел.</span>
                </div>
              </div>

              <div className="bg-purple-900/30 border border-purple-700/40 rounded-xl p-4 text-sm text-purple-300 leading-relaxed">
                Цена рассчитана на основе средней стоимости туров. Точная стоимость зависит от даты, города и дополнительных опций. Свяжитесь с нами для точного расчёта.
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="text-center bg-purple-900/30 border border-purple-600/30 rounded-2xl p-10 w-full">
                <p className="text-purple-300 text-sm mb-2">Ориентировочная стоимость</p>
                <p className="text-5xl font-bold text-white mb-1">
                  {total.toLocaleString("ru-RU")} <span className="text-2xl text-pink-400">₽</span>
                </p>
                <p className="text-purple-400 text-sm mt-2">
                  {people} {people === 1 ? "человек" : people < 5 ? "человека" : "человек"} × {pricePerPerson.toLocaleString("ru-RU")} ₽
                </p>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl text-lg"
              >
                Оформить заявку
              </button>
              <p className="text-purple-400 text-xs text-center">
                Точную стоимость уточним при звонке
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <BookingModal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      tourTitle={tourTypes.find((t) => t.id === selectedTour)?.name ?? ""}
    />
    </>
  )
}