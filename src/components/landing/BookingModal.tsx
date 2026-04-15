import { useState } from "react"
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import func2url from "../../../backend/func2url.json"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  tourTitle?: string
}

type State = "idle" | "loading" | "success" | "error"

const BOOKING_URL = func2url.booking

export default function BookingModal({ isOpen, onClose, tourTitle = "" }: BookingModalProps) {
  const [state, setState] = useState<State>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    tour_title: tourTitle,
    tour_date: "",
    comment: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Введите ФИО (минимум 2 символа)"
    if (!form.phone.trim()) e.phone = "Введите номер телефона"
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Введите корректный email"
    if (!form.tour_title.trim()) e.tour_title = "Укажите название тура"
    if (!form.tour_date.trim()) e.tour_date = "Укажите дату"
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setState("loading")
    try {
      const res = await fetch(BOOKING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, persons: 1 }),
      })
      if (res.ok) {
        setState("success")
      } else {
        const data = await res.json()
        setErrorMsg(data.error || "Ошибка отправки")
        setState("error")
      }
    } catch {
      setErrorMsg("Не удалось связаться с сервером. Попробуйте ещё раз.")
      setState("error")
    }
  }

  function handleClose() {
    onClose()
    setTimeout(() => {
      setState("idle")
      setErrors({})
      setForm({ name: "", phone: "", email: "", tour_title: tourTitle, tour_date: "", comment: "" })
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(10,0,20,0.8)" }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className="bg-[#1a0a2e] border border-purple-600/40 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-700/30">
          <div>
            <h2 className="text-xl font-bold text-white">Оформить заявку</h2>
            <p className="text-purple-400 text-sm mt-0.5">Мы свяжемся с вами в течение 24 часов</p>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg text-purple-400 hover:text-white hover:bg-purple-800/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">

          {state === "success" && (
            <div className="text-center py-8 space-y-4">
              <CheckCircle className="w-16 h-16 text-pink-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Заявка отправлена!</h3>
              <p className="text-purple-300 text-sm leading-relaxed max-w-xs mx-auto">
                Мы получили вашу заявку и свяжемся с вами в ближайшее время по номеру <span className="text-pink-400 font-semibold">{form.phone}</span>
              </p>
              <button
                onClick={handleClose}
                className="mt-4 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl"
              >
                Закрыть
              </button>
            </div>
          )}

          {state === "error" && (
            <div className="text-center py-8 space-y-4">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Не удалось отправить</h3>
              <p className="text-purple-300 text-sm">{errorMsg}</p>
              <button
                onClick={() => setState("idle")}
                className="mt-4 px-8 py-3 bg-purple-700 hover:bg-purple-600 text-white font-semibold rounded-xl"
              >
                Попробовать снова
              </button>
            </div>
          )}

          {(state === "idle" || state === "loading") && (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ФИО */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1.5">
                  ФИО <span className="text-pink-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Иванова Мария Ивановна"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-[#2d0a4e] border text-white placeholder-purple-600 focus:outline-none focus:ring-1 focus:ring-pink-500 ${errors.name ? "border-red-500" : "border-purple-700/50"}`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Телефон */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1.5">
                  Номер телефона <span className="text-pink-400">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+7 (900) 000-00-00"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-[#2d0a4e] border text-white placeholder-purple-600 focus:outline-none focus:ring-1 focus:ring-pink-500 ${errors.phone ? "border-red-500" : "border-purple-700/50"}`}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1.5">
                  Электронная почта
                </label>
                <input
                  type="email"
                  placeholder="example@mail.ru"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-[#2d0a4e] border text-white placeholder-purple-600 focus:outline-none focus:ring-1 focus:ring-pink-500 ${errors.email ? "border-red-500" : "border-purple-700/50"}`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Название тура */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1.5">
                  Название тура <span className="text-pink-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Масленица в Суздале"
                  value={form.tour_title}
                  onChange={(e) => set("tour_title", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-[#2d0a4e] border text-white placeholder-purple-600 focus:outline-none focus:ring-1 focus:ring-pink-500 ${errors.tour_title ? "border-red-500" : "border-purple-700/50"}`}
                />
                {errors.tour_title && <p className="text-red-400 text-xs mt-1">{errors.tour_title}</p>}
              </div>

              {/* Дата */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1.5">
                  Желаемая дата <span className="text-pink-400">*</span>
                </label>
                <input
                  type="date"
                  value={form.tour_date}
                  onChange={(e) => set("tour_date", e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-[#2d0a4e] border text-white focus:outline-none focus:ring-1 focus:ring-pink-500 ${errors.tour_date ? "border-red-500" : "border-purple-700/50"}`}
                  style={{ colorScheme: "dark" }}
                />
                {errors.tour_date && <p className="text-red-400 text-xs mt-1">{errors.tour_date}</p>}
              </div>

              {/* Комментарий */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1.5">Комментарий</label>
                <textarea
                  placeholder="Дополнительные пожелания..."
                  value={form.comment}
                  onChange={(e) => set("comment", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#2d0a4e] border border-purple-700/50 text-white placeholder-purple-600 focus:outline-none focus:ring-1 focus:ring-pink-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={state === "loading"}
                className="w-full py-4 bg-pink-500 hover:bg-pink-600 disabled:opacity-60 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-base"
              >
                {state === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  "Отправить заявку"
                )}
              </button>

              <p className="text-purple-500 text-xs text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
