import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import Icon from "@/components/ui/icon"
import { tours, getCategoryColor } from "@/data/tours"

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })
}

const featured = tours.filter((t) => t.hot).slice(0, 3)

export default function FeaturedTours() {
  return (
    <section id="tours" className="py-24 bg-black relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 100%, rgba(16,185,129,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm mb-4">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Горячие предложения
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Туры{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                ближайших дат
              </span>
            </h2>
          </div>
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all group shrink-0"
          >
            Все туры
            <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((tour, i) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/tours/${tour.id}`} className="group block h-full">
                <div className="relative h-full bg-gray-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 bg-red-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                        🔥 Хит
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 border text-xs font-medium rounded-full backdrop-blur-sm ${getCategoryColor(tour.category)}`}>
                        {tour.categoryLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                      <div>
                        <p className="text-white/70 text-xs">{tour.city}</p>
                        <h3 className="text-white font-bold text-lg leading-tight">{tour.title}</h3>
                      </div>
                      <span className="px-3 py-1.5 bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shrink-0 ml-2">
                        {tour.priceLabel}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                      {tour.shortDescription}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={12} className="text-emerald-500" />
                          {formatDate(tour.dateStart)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={12} className="text-emerald-500" />
                          {tour.duration} {tour.duration < 5 ? "дня" : "дней"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-white text-xs font-semibold">{tour.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 p-8 bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-white text-xl font-bold mb-1">Не нашли подходящий тур?</h3>
            <p className="text-gray-400 text-sm">В каталоге {tours.length} туров с фильтрами по категории, дате и цене</p>
          </div>
          <Link
            to="/tours"
            className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20 shrink-0"
          >
            Открыть каталог
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
