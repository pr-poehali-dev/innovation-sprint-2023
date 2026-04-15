import { motion } from "framer-motion"
import { useState } from "react"
import { Shield, CheckCircle, DollarSign } from "lucide-react"
import ServicesTopRow from "./ServicesTopRow"
import ServicesMiddleRow from "./ServicesMiddleRow"
import ServicesBottomRow from "./ServicesBottomRow"

const services = [
  {
    title: "Фестивальные туры",
    description:
      "Путешествия на крупнейшие фестивали страны: музыкальные, гастрономические, этнические. Живая атмосфера, новые знакомства и незабываемые впечатления.",
    mockup: "social",
  },
  {
    title: "Исторические туры",
    description:
      "Реконструкции битв, средневековые ярмарки и исторические фестивали. Погружение в прошлое России вместе с профессиональными гидами-историками.",
    mockup: "google-ads",
  },
  {
    title: "Культурные события",
    description: "Театральные фестивали, биеннале, выставки и арт-форумы по всей России. Искусство и культура — в самых неожиданных местах.",
    mockup: "email",
  },
  {
    title: "Спортивные туры",
    description:
      "Туры на крупные спортивные события: марафоны, чемпионаты, экстрим-соревнования. Болейте за любимую команду или участвуйте сами.",
    mockup: "seo",
  },
  {
    title: "Корпоративные туры",
    description:
      "Событийные туры для команд и компаний. Тимбилдинг через путешествия, совместный опыт и вдохновение для бизнеса.",
    mockup: "analytics",
  },
  {
    title: "Индивидуальные туры",
    description:
      "Создаём тур под ваш запрос: дата, событие, маршрут, бюджет. Полное сопровождение от бронирования до возвращения домой.",
    mockup: "web-dev",
    badges: [
      { icon: <Shield className="w-4 h-4" />, text: "Гарантия цены" },
      { icon: <DollarSign className="w-4 h-4" />, text: "Рассрочка" },
      { icon: <CheckCircle className="w-4 h-4" />, text: "Гид включён" },
    ],
  },
]

export default function InnovativeServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="services" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Наши направления туров</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Событийные путешествия на любой вкус — от фестивалей до исторических реконструкций.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          <ServicesTopRow
            services={services}
            onHoverStart={(index) => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          />
          <ServicesMiddleRow services={services} />
          <ServicesBottomRow services={services} />
        </div>
      </div>
    </section>
  )
}
