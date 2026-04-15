import { Search, Lightbulb, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Выбираете событие",
    description: "Выбираете тур из каталога или рассказываете о желаемом событии — мы подберём идеальный вариант под ваши интересы и даты.",
    icon: <Search className="w-7 h-7" />,
  },
  {
    number: "02",
    title: "Мы всё организуем",
    description: "Берём на себя логистику, проживание, билеты на событие и экскурсионную программу — вам остаётся только собрать чемодан.",
    icon: <Lightbulb className="w-7 h-7" />,
  },
  {
    number: "03",
    title: "Отправляетесь в путь",
    description: "Едете и погружаетесь в атмосферу уникального события. Наш сопровождающий гид всегда рядом, чтобы поездка прошла без забот.",
    icon: <Rocket className="w-7 h-7" />,
  },
]

export default function HowWeWork() {
  return (
    <section id="how" className="py-20 bg-[#1a0a2e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Как это работает</h2>
          <p className="text-lg text-purple-300 max-w-2xl mx-auto">
            Три простых шага — и вы уже в центре самого яркого события России.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-[#2d0a4e]/60 border border-purple-600/30 rounded-2xl p-8"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-pink-500/20 border border-pink-500/30 rounded-xl flex items-center justify-center text-pink-400">
                  {step.icon}
                </div>
                <span className="text-4xl font-bold text-purple-700">{step.number}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-purple-300 leading-relaxed text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
