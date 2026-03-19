import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ContactPageSection from '@/components/module/ContactPageSection'

export const metadata = {
  title: 'Contact | Antigravity',
  description:
    'Start your automation project with TJ. Share scope, budget, and timeline to get a fast response.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <Navbar />
      <ScrollReveal y={24}>
        <ContactPageSection />
      </ScrollReveal>
      <ScrollReveal delay={0.14} y={20}>
        <Footer />
      </ScrollReveal>
    </div>
  )
}
