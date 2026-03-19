import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'
import {
  projectsPage,
  iconLines,
  type ProjectCard,
} from '@/lib/data/projects-page'

const PROJECTS = projectsPage
const ICON_LINES = iconLines

export default function ProjectsPageContent() {
  return (
    <main className="bg-[#f3f4f6] px-6 pb-24 pt-16 md:px-10 md:pt-20 ">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal y={18}>
          <section className="text-center">
            <h1 className="mx-auto mt-8 max-w-4xl text-balance text-3xl font-semibold tracking-tight text-[#111827] md:text-3xl">
              Here are some of my recent projects. If you want to know more
              about
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#4b5563]">
              I’ve completed hundreds of projects over the past 5 years, but
              these are 8 of my most recent projects, if you want to know
              whether I’ve done a project similar to yours, just send me a
              message.
            </p>

            <div className="mt-14 grid gap-4 md:grid-cols-2">
              <article className="rounded-4xl border border-[#e5e7eb] bg-[#eeeff2] px-6 py-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[#9ca3af]">
                  AUTOMATION FIRST
                </p>
                <h2 className="mt-6 text-4xl font-semibold leading-[1.08] text-[#111827]">
                  Streamlining the entire software delivery lifecycle
                </h2>
              </article>
              <article className="rounded-4xl border border-[#e5e7eb] bg-[#eeeff2] px-6 py-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[#9ca3af]">
                  PURPOSE BUILT
                </p>
                <h2 className="mt-6 text-4xl font-semibold leading-[1.08] text-[#111827]">
                  Standardized outcomes for custom app operations
                </h2>
              </article>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-16 space-y-16">
          {PROJECTS.map((project, index) => (
            <ScrollReveal key={project.key} delay={0.04 + index * 0.03} y={20}>
              <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <article>
                  <p className="inline-flex items-center gap-2 text-2xl font-semibold text-[#1270de] md:text-xl">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#1270de]" />
                    {project.category}
                  </p>

                  <h3 className="mt-6 max-w-xl text-6xl font-semibold leading-[0.98] tracking-tight text-[#111827] md:text-4xl">
                    {project.name}
                  </h3>

                  <p className="mt-8 max-w-2xl text-[13px]leading-8 text-[#374151]">
                    {project.summary}
                  </p>

                  <ul className="mt-8 space-y-4">
                    {project.stack.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-4 text-[1.9rem] font-medium leading-[1.2] text-[#1f2937] md:text-[15px]"
                      >
                        <span className="mt-4 h-2.5 w-2.5 shrink-0 rounded-full bg-[#9ca3af]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 border-t border-[#d1d5db] pt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6b7280]">
                      Outcome
                    </p>
                    <p className="mt-3 text-lg text-[#374151]">
                      {project.impact}
                    </p>
                  </div>
                </article>

                <article className="flex flex-col">
                  <div className="relative overflow-hidden rounded-4xl border border-[#e5e7eb] bg-[#edeef1] p-6">
                    <div className="relative h-[440px] overflow-hidden rounded-2xl border border-[#d1d5db] bg-white">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover"
                        style={{
                          objectPosition: project.imagePosition ?? '50% 50%',
                        }}
                      />
                    </div>
                  </div>
                </article>
              </section>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  )
}
