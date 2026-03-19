import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BlogSection from '@/components/module/BlogSection'
import ScrollReveal from '@/components/animations/ScrollReveal'

export const metadata: Metadata = {
  title: 'Blog | Antigravity',
  description:
    'Insights on automation, data engineering, and business scaling strategies.',
}

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <BlogSection />
      <Footer />
    </main>
  )
}
