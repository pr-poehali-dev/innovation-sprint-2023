import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"
import { tours, getCategoryColor, getDifficultyLabel, getDifficultyColor } from "@/data/tours"
import BookingModal from "@/components/BookingModal"

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
}

export default function TourDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activePhoto, setActivePhoto] = useState(0)
  const [activeTab, setActiveTab] = useState<"program" | "included" | "details">("program")
  const [bookingOpen, setBookingOpen] = useState(false)

  const tour = tours.find((t) => t.id === id)

  if (!tour) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center flex-col gap-4">
        <div className="text-6xl">🗺️</div>
        <h2 className="text-2xl font-bold">Тур не найден</h2>
        <Link to="/tours" className="text-emerald-400 hover:underline">← Вернуться к каталогу</Link>
      </div>
    )
  }

  const allPhotos = [tour.image, ...tour.gallery.slice(0, 3)]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-xl text-sm text-white hover:border-emerald-500/40 transition-all"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад
        </button>
      </div>

      {/* Hero gallery */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <motion.img
          key={activePhoto}
          src={allPhotos[activePhoto]}
          alt={tour.title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Thumbnails */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {allPhotos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActivePhoto(i)}
              className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                activePhoto === i ? "border-emerald-400 scale-110" : "border-white/20 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Category + Hot */}
        <div className="absolute top-6 right-6 flex gap-2">
          {tour.hot && (
            <span className="px-3 py-1.5 bg-red-500/90 text-white text-sm font-semibold rounded-full backdrop-blur-sm">
              🔥 Хит продаж
            </span>
          )}
          <span className={`px-3 py-1.5 border text-sm font-medium rounded-full backdrop-blur-sm ${getCategoryColor(tour.category)}`}>
            {tour.categoryLabel}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left column: info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title block */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 text-emerald-400 text-sm mb-3">
                <Icon name="MapPin" size={14} />
                <span>{tour.city}, {tour.region}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">{tour.title}</h1>

              <div className="flex items-center gap-4 flex-wrap">
                <div className={`flex items-center gap-1.5 text-sm ${getDifficultyColor(tour.difficulty)}`}>
                  <Icon name="TrendingUp" size={14} />
                  {getDifficultyLabel(tour.difficulty)} уровень
                </div>
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: "Calendar", label: "Начало", value: formatDate(tour.dateStart) },
                { icon: "CalendarCheck", label: "Окончание", value: formatDate(tour.dateEnd) },
                { icon: "Clock", label: "Длительность", value: `${tour.duration} ${tour.duration < 5 ? "дня" : "дней"}` },
                { icon: "Users", label: "Группа", value: tour.groupSize },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <Icon name={item.icon as "Calendar"} size={18} className="text-emerald-400 mb-2" />
                  <p className="text-gray-400 text-xs mb-1">{item.label}</p>
                  <p className="text-white font-semibold text-sm">{item.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="prose prose-invert max-w-none"
            >
              <h2 className="text-xl font-bold text-white mb-3">О туре</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">{tour.fullDescription}</div>
            </motion.div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tour.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 text-xs">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex gap-2 border-b border-white/10 mb-6">
                {[
                  { key: "program", label: "Программа" },
                  { key: "included", label: "Включено" },
                  { key: "details", label: "Детали" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
                      activeTab === tab.key
                        ? "border-emerald-400 text-emerald-400"
                        : "border-transparent text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "program" && (
                <div className="space-y-4">
                  {tour.program.map((day, i) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0">
                          {day.day}
                        </div>
                        {i < tour.program.length - 1 && (
                          <div className="w-px flex-1 bg-white/10 mt-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <h4 className="text-white font-semibold mb-1">{day.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{day.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === "included" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Icon name="CheckCircle" size={18} className="text-emerald-400" />
                      Включено в стоимость
                    </h4>
                    <ul className="space-y-2.5">
                      {tour.included.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-gray-300 text-sm">
                          <Icon name="Check" size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <Icon name="XCircle" size={18} className="text-red-400" />
                      Не включено
                    </h4>
                    <ul className="space-y-2.5">
                      {tour.notIncluded.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-gray-400 text-sm">
                          <Icon name="X" size={14} className="text-red-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "details" && (
                <div className="space-y-4">
                  {[
                    { label: "Город", value: tour.city },
                    { label: "Регион", value: tour.region },
                    { label: "Категория", value: tour.categoryLabel },
                    { label: "Уровень сложности", value: getDifficultyLabel(tour.difficulty) },
                    { label: "Размер группы", value: tour.groupSize },
                    { label: "Дата начала", value: formatDate(tour.dateStart) },
                    { label: "Дата окончания", value: formatDate(tour.dateEnd) },
                    { label: "Длительность", value: `${tour.duration} ${tour.duration < 5 ? "дня" : "дней"}` },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-gray-400 text-sm">{item.label}</span>
                      <span className="text-white text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right column: booking card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="sticky top-24"
            >
              <div className="bg-gray-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <div className="mb-6">
                  <p className="text-gray-400 text-sm mb-1">Стоимость тура</p>
                  <p className="text-4xl font-bold text-white">{tour.priceLabel}</p>
                  <p className="text-gray-500 text-xs mt-1">на одного человека</p>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: "Calendar", text: `${formatDate(tour.dateStart)} — ${formatDate(tour.dateEnd)}` },
                    { icon: "Users", text: `Группа: ${tour.groupSize}` },
                    { icon: "Clock", text: `${tour.duration} ${tour.duration < 5 ? "дня" : "дней"}` },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3 text-gray-300 text-sm">
                      <Icon name={item.icon as "Calendar"} size={16} className="text-emerald-400 shrink-0" />
                      {item.text}
                    </div>
                  ))}
                </div>

                <button
                  disabled={tour.soldOut}
                  onClick={() => !tour.soldOut && setBookingOpen(true)}
                  className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 ${
                    tour.soldOut
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 hover:-translate-y-0.5"
                  }`}
                >
                  {tour.soldOut ? "Мест нет" : "Забронировать тур"}
                </button>

                <p className="text-center text-gray-500 text-xs mt-3">
                  Или позвоните нам: <a href="tel:+79045327706" className="text-emerald-400 hover:underline">+7 (904) 532-77-06</a>
                </p>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5">
                  {[
                    { icon: "Shield", text: "Гарантия лучшей цены" },
                    { icon: "RefreshCw", text: "Бесплатная отмена за 14 дней" },
                    { icon: "Headphones", text: "Поддержка 24/7 в туре" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2.5 text-gray-400 text-xs">
                      <Icon name={item.icon as "Shield"} size={14} className="text-emerald-400 shrink-0" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Related tours */}
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-3 text-sm">Похожие туры</h4>
                <div className="space-y-3">
                  {tours
                    .filter((t) => t.id !== tour.id && t.category === tour.category)
                    .slice(0, 2)
                    .map((related) => (
                      <Link
                        key={related.id}
                        to={`/tours/${related.id}`}
                        className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:border-emerald-500/30 transition-all group"
                      >
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-16 h-12 object-cover rounded-lg shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-white text-xs font-medium truncate group-hover:text-emerald-400 transition-colors">
                            {related.title}
                          </p>
                          <p className="text-emerald-400 text-xs mt-0.5">{related.priceLabel}</p>
                          <p className="text-gray-500 text-xs">{formatDate(related.dateStart)}</p>
                        </div>
                      </Link>
                    ))}
                  {tours.filter((t) => t.id !== tour.id && t.category === tour.category).length === 0 && (
                    <Link
                      to="/tours"
                      className="block text-center text-emerald-400 text-sm hover:underline"
                    >
                      Смотреть все туры →
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        tourTitle={tour.title}
        tourDate={`${formatDate(tour.dateStart)} — ${formatDate(tour.dateEnd)}`}
        priceLabel={tour.priceLabel}
      />
    </div>
  )
}