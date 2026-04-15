import { motion } from "framer-motion"
import { Shield, CheckCircle, DollarSign } from "lucide-react"
import AnimatedButton from "./AnimatedButton"
import ServicesMockup from "./ServicesMockup"

interface Badge {
  icon: React.ReactNode
  text: string
}

interface Service {
  title: string
  description: string
  mockup: string
  badges?: Badge[]
}

interface ServicesBottomRowProps {
  services: Service[]
}

export default function ServicesBottomRow({ services }: ServicesBottomRowProps) {
  return (
    <>
      {services.slice(5).map((service) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm mb-6">{service.description}</p>

                {service.badges && (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {service.badges.map((badge, badgeIndex) => (
                      <div
                        key={badgeIndex}
                        className="flex items-center space-x-2 bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/50"
                      >
                        <div className="text-green-400">{badge.icon}</div>
                        <span className="text-xs text-gray-300">{badge.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end items-center">
                <a href="#services">
                  <AnimatedButton className="bg-white text-black hover:bg-gray-100 px-6 py-2">
                    <span className="flex items-center">Подробнее</span>
                  </AnimatedButton>
                </a>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="aspect-[16/9] bg-gray-900 rounded-lg overflow-hidden relative border border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 p-4">
                  <ServicesMockup mockup={service.mockup} index={5} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  )
}

export { Shield, CheckCircle, DollarSign }
