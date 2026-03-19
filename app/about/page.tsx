import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AboutSection from '@/components/module/AboutSection'
import ScrollReveal from '@/components/animations/ScrollReveal'

export const metadata = {
  title: 'About TJ | Antigravity',
  description:
    'Learn about TJ and his expertise in automation, anti-bot bypass, and business intelligence.',
}

export default function About() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />
      <ScrollReveal y={24}>
        <AboutSection />
      </ScrollReveal>
      <ScrollReveal delay={0.14} y={20}>
        <Footer />
      </ScrollReveal>
    </div>
  )
}
