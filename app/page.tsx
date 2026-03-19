import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/module/HeroSection'
import PainPointsSection from '@/components/module/PainPointsSection'
import SignalControlSection from '@/components/module/SignalControlSection'
import TestimonialSection from '@/components/module/TestimonialSection'
import ProjectsSection from '@/components/module/ProjectsSection'
import ProductDemoSection from '@/components/module/ProductDemoSection'
import PlatformStorySection from '@/components/module/PlatformStorySection'
import LaunchWaitlistSection from '@/components/module/LaunchWaitlistSection'
import ScrollReveal from '@/components/animations/ScrollReveal'

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <ScrollReveal y={24}>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal delay={0.05}>
        <PainPointsSection />
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <SignalControlSection />
      </ScrollReveal>
      <ScrollReveal delay={0.09}>
        <TestimonialSection />
      </ScrollReveal>
      <ProjectsSection />
      <ScrollReveal delay={0.098}>
        <ProductDemoSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <PlatformStorySection />
      </ScrollReveal>
      <ScrollReveal delay={0.12}>
        <LaunchWaitlistSection />
      </ScrollReveal>
      <ScrollReveal delay={0.14} y={20}>
        <Footer />
      </ScrollReveal>
    </div>
  )
}
