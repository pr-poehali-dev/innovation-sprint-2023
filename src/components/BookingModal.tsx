import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"
import func2url from "../../backend/func2url.json"

interface BookingModalProps {
  open: boolean
  onClose: () => void
  tourTitle: string
  tourDate: string
  priceLabel: string
}

export default function BookingModal({ open, onClose, tourTitle, tourDate, priceLabel }: BookingModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", persons: "1", comment: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(func2url.booking, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          persons: Number(form.persons),
          comment: form.comment,
          tour_title: tourTitle,
          tour_date: tourDate,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  function handleClose() {
    onClose()
    setTimeout(() => setStatus("idle"), 300)
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-white/10">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <Icon name="X" size={18} />
              </button>
              <p className="text-emerald-400 text-sm font-medium mb-1">Бронирование тура</p>
              <h2 className="text-white font-bold text-xl leading-tight pr-8">{tourTitle}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Icon name="Calendar" size={13} className="text-emerald-500" />
                  {tourDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="Tag" size={13} className="text-emerald-500" />
                  {priceLabel}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Заявка отправлена!</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Мы свяжемся с вами в ближайшее время по номеру <span className="text-white">{form.phone}</span>
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl transition-all"
                  >
                    Отлично!
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-gray-400 text-xs mb-1.5">Ваше имя *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Иван Иванов"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-gray-400 text-xs mb-1.5">Телефон *</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        type="tel"
                        placeholder="+7 (900) 000-00-00"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-gray-400 text-xs mb-1.5">Кол-во человек</label>
                      <select
                        name="persons"
                        value={form.persons}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <option key={n} value={n} className="bg-gray-800">
                            {n} {n === 1 ? "человек" : n < 5 ? "человека" : "человек"}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-400 text-xs mb-1.5">Email (необязательно)</label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="ivan@mail.ru"
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-gray-400 text-xs mb-1.5">Комментарий</label>
                      <textarea
                        name="comment"
                        value={form.comment}
                        onChange={handleChange}
                        placeholder="Пожелания, вопросы..."
                        rows={2}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-red-400 text-xs text-center">Ошибка отправки. Попробуйте ещё раз или позвоните нам.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Icon name="Loader2" size={18} className="animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      "Отправить заявку"
                    )}
                  </button>
                  <p className="text-gray-600 text-xs text-center">Мы свяжемся с вами в течение 1 часа</p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
