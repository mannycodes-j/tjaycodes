import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/animations/ScrollReveal'
import ProjectsPageContent from '@/components/module/ProjectsPageContent'

export const metadata = {
  title: 'Projects | Antigravity',
  description:
    'Explore TJ projects across automation, scraping, integrations, and high-demand workflow systems.',
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f3f4f6]">
      <Navbar />
      <ProjectsPageContent />
      <ScrollReveal delay={0.14} y={20}>
        <Footer />
      </ScrollReveal>
    </div>
  )
}
