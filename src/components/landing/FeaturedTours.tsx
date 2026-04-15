import Icon from "@/components/ui/icon"
import { tours } from "@/data/tours"

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })
}

const featured = tours.filter((t) => t.hot).slice(0, 3)

export default function FeaturedTours() {
  return (
    <section id="tours" className="py-20 bg-[#200c38]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/15 border border-pink-500/25 rounded-full text-pink-300 text-sm mb-4">
              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
              Горячие предложения
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Туры{" "}
              <span className="text-pink-400">ближайших дат</span>
            </h2>
          </div>
          <a
            href="#calc"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-700/30 border border-purple-500/30 rounded-xl text-purple-200 text-sm shrink-0"
          >
            Рассчитать стоимость
            <Icon name="ArrowRight" size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((tour) => (
            <div
              key={tour.id}
              className="bg-[#2d0a4e]/70 border border-purple-600/25 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a2e]/80 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-pink-500/90 text-white text-xs font-semibold rounded-full">
                    🔥 Хит
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-purple-600/80 border border-purple-400/30 text-purple-100 text-xs font-medium rounded-full">
                    {tour.categoryLabel}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <div>
                    <p className="text-purple-200 text-xs">{tour.city}</p>
                    <h3 className="text-white font-bold text-lg leading-tight">{tour.title}</h3>
                  </div>
                  <span className="px-3 py-1.5 bg-pink-500 text-white text-sm font-bold rounded-xl shrink-0 ml-2">
                    {tour.priceLabel}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-purple-300 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                  {tour.shortDescription}
                </p>
                <div className="flex items-center gap-4 text-xs text-purple-400">
                  <span className="flex items-center gap-1">
                    <Icon name="Calendar" size={12} className="text-pink-400" />
                    {formatDate(tour.dateStart)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={12} className="text-pink-400" />
                    {tour.duration} {tour.duration < 5 ? "дня" : "дней"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-8 bg-gradient-to-r from-purple-900/50 to-fuchsia-900/40 border border-purple-500/20 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">Не нашли подходящий тур?</h3>
            <p className="text-purple-300 text-sm">Напишите нам — подберём под ваши даты и интересы</p>
          </div>
          <a
            href="#contact"
            className="px-8 py-3.5 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shrink-0"
          >
            Связаться с нами
          </a>
        </div>
      </div>
    </section>
  )
}
