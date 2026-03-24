import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"
import { tours, getCategoryColor, getDifficultyLabel, getDifficultyColor, type Tour } from "@/data/tours"

const CATEGORIES = [
  { value: "all", label: "Все туры" },
  { value: "festival", label: "Фестивали" },
  { value: "history", label: "История" },
  { value: "culture", label: "Культура" },
  { value: "sport", label: "Спорт" },
  { value: "custom", label: "Авторские" },
]

const SORT_OPTIONS = [
  { value: "date", label: "По дате" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" },
  { value: "rating", label: "По рейтингу" },
]

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
}

function TourCard({ tour, index }: { tour: Tour; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      layout
    >
      <Link to={`/tours/${tour.id}`} className="group block h-full">
        <div className="relative h-full bg-gray-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden aspect-[16/10]">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Badges top */}
            <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
              {tour.hot && (
                <span className="px-2.5 py-1 bg-red-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                  🔥 Хит
                </span>
              )}
              {tour.soldOut && (
                <span className="px-2.5 py-1 bg-gray-700/90 text-gray-300 text-xs font-semibold rounded-full backdrop-blur-sm">
                  Мест нет
                </span>
              )}
            </div>

            {/* Category badge */}
            <div className="absolute top-3 right-3">
              <span className={`px-2.5 py-1 border text-xs font-medium rounded-full backdrop-blur-sm ${getCategoryColor(tour.category)}`}>
                {tour.categoryLabel}
              </span>
            </div>

            {/* Price */}
            <div className="absolute bottom-3 right-3">
              <span className="px-3 py-1.5 bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg">
                {tour.priceLabel}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-start gap-2 mb-2">
              <Icon name="MapPin" size={14} className="text-emerald-400 mt-1 shrink-0" />
              <span className="text-emerald-400 text-xs">{tour.city}, {tour.region}</span>
            </div>

            <h3 className="text-white font-bold text-lg mb-2 group-hover:text-emerald-400 transition-colors leading-tight">
              {tour.title}
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
              {tour.shortDescription}
            </p>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
              <div className="flex items-center gap-1.5 text-gray-400">
                <Icon name="Calendar" size={13} className="text-gray-500" />
                <span>{formatDate(tour.dateStart)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Icon name="Clock" size={13} className="text-gray-500" />
                <span>{tour.duration} {tour.duration === 1 ? "день" : tour.duration < 5 ? "дня" : "дней"}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-400">
                <Icon name="Users" size={13} className="text-gray-500" />
                <span>{tour.groupSize}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="TrendingUp" size={13} className="text-gray-500" />
                <span className={getDifficultyColor(tour.difficulty)}>{getDifficultyLabel(tour.difficulty)}</span>
              </div>
            </div>

            {/* Rating + CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Icon name="Star" size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-white font-semibold text-sm">{tour.rating}</span>
                <span className="text-gray-500 text-xs">({tour.reviewsCount})</span>
              </div>
              <span className="text-emerald-400 text-sm font-medium group-hover:text-emerald-300 flex items-center gap-1">
                Подробнее <Icon name="ArrowRight" size={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function ToursPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    let result = tours.filter((t) => {
      if (activeCategory !== "all" && t.category !== activeCategory) return false
      if (search) {
        const q = search.toLowerCase()
        return (
          t.title.toLowerCase().includes(q) ||
          t.city.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.includes(q))
        )
      }
      return true
    })

    result = [...result].sort((a, b) => {
      if (sortBy === "date") return new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

    return result
  }, [activeCategory, sortBy, search])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent" />
        <div className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(ellipse at 60% 0%, rgba(16,185,129,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm">
            <Icon name="ArrowLeft" size={16} />
            На главную
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Каталог{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                туров
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              {tours.length} событийных туров по всей России — выберите своё путешествие
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category tabs */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.value
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search + Sort */}
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Поиск по турам..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-56 pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 focus:outline-none focus:border-emerald-500/50 transition-all cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-gray-900">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-white mb-2">Туры не найдены</h3>
            <p className="text-gray-400">Попробуйте изменить фильтры или поисковый запрос</p>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((tour, i) => (
                <TourCard key={tour.id} tour={tour} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}
