import { motion } from "framer-motion"
import ServicesMockup from "./ServicesMockup"

interface Service {
  title: string
  description: string
  mockup: string
}

interface ServicesMiddleRowProps {
  services: Service[]
}

export default function ServicesMiddleRow({ services }: ServicesMiddleRowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.slice(2, 5).map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: (index + 2) * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="bg-gray-900/30 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 group"
        >
          <div className="aspect-video bg-gray-900 rounded-lg mb-6 overflow-hidden relative border border-gray-800">
            <ServicesMockup mockup={service.mockup} index={index} />
          </div>

          <div className="flex flex-col justify-between h-auto">
            <div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">{service.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
