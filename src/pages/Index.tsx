import { Navbar, Hero, HowWeWork, FeaturedTours, ROICalculatorHome, Footer } from "@/components/landing"

export default function Index() {
  return (
    <div className="min-h-screen bg-[#1a0a2e]">
      <Navbar />
      <Hero />
      <HowWeWork />
      <FeaturedTours />
      <ROICalculatorHome />
      <Footer />
    </div>
  )
}
