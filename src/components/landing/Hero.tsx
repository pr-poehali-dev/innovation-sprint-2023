import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

const bgImages = [
  "https://cdn.poehali.dev/projects/f72d285d-08f7-4e55-aa66-0ddb50cc98da/files/cb2ab19a-b0d1-4aef-95c4-42d8ec1f4a5f.jpg",
  "https://cdn.poehali.dev/projects/f72d285d-08f7-4e55-aa66-0ddb50cc98da/files/8ff0991b-e943-4e60-bbbe-e2b543888ee0.jpg",
  "https://cdn.poehali.dev/projects/f72d285d-08f7-4e55-aa66-0ddb50cc98da/files/19d6805e-0d45-45dd-8582-e1889db4f2ef.jpg",
]

const features = [
  { icon: "🎪", title: "Фестивали и события", desc: "Музыка, культура, история" },
  { icon: "🗺️", title: "Вся Россия", desc: "От Калининграда до Владивостока" },
  { icon: "🎭", title: "Полное сопровождение", desc: "Гид, логистика, проживание" },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bgImages.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImages[current]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transition: "opacity 1s ease" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d0a4e]/80 via-[#4a1070]/70 to-[#1a0a2e]/90" />
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {bgImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full ${i === current ? "w-6 bg-pink-400" : "w-2 bg-white/40"}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center px-5 py-2.5 bg-pink-500/20 border border-pink-400/30 rounded-full text-sm text-pink-200 font-medium">
                <div className="w-2 h-2 bg-pink-400 rounded-full mr-3" />
                Событийные туры по всей России
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-white mb-1">ПУТЕШЕСТВИЯ</span>
                <span className="block text-white mb-1">ПО САМЫМ ЯРКИМ</span>
                <span className="block mb-1 text-pink-400 font-pacifico">Событиям</span>
                <span className="block text-purple-200">СТРАНЫ</span>
              </h1>
            </div>

            <a
              href="#tours"
              className="inline-flex items-center gap-2 px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl text-lg"
            >
              Подобрать тур
              <ArrowRight className="h-5 w-5" />
            </a>

            <div className="flex flex-wrap gap-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 rounded-xl"
                >
                  <span className="text-lg">{f.icon}</span>
                  <div>
                    <p className="text-white text-xs font-semibold">{f.title}</p>
                    <p className="text-purple-200 text-xs">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: about */}
          <div className="bg-[#2d0a4e]/60 border border-purple-500/25 rounded-3xl p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Калейдоскоп событий</h2>
              <p className="text-pink-300 text-sm font-medium">Туристическая компания</p>
            </div>

            <p className="text-purple-100 leading-relaxed">
              Мы специализируемся на событийном туризме — направлении, где поводом для путешествия
              становится конкретное событие: фестиваль, историческая реконструкция, спортивный
              чемпионат или культурный форум.
            </p>

            <p className="text-purple-200 leading-relaxed text-sm">
              Каждый тур мы собираем вокруг события, которое невозможно увидеть в другом месте и в
              другое время. Вы не просто едете в город — вы попадаете в эпицентр происходящего.
              Наши гиды — люди, влюблённые в то событие, к которому они вас везут.
            </p>


          </div>

        </div>
      </div>
    </section>
  )
}