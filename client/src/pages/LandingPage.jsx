import { FeaturesSection } from "../components/landing/FeaturesSection"
import { Footer } from "../components/landing/Footer"
import { HeroSection } from "../components/landing/HeroSection"
import { HowItWorks } from "../components/landing/HowItWorks"
import { Navbar } from "../components/landing/Navbar"
import { ServicesSection } from "../components/landing/ServicesSection"
import { StatsSection } from "../components/landing/StatsSection"

export const LandingPage = () => {
  return (
    <>
     <Navbar />
     <HeroSection />
     <StatsSection />
     <ServicesSection />
     <HowItWorks />
     <FeaturesSection />
     <Footer />
    </>
  )
}
