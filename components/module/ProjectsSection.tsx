'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projectsHome, type ProjectItem } from '@/lib/data/projects-home'

const PROJECTS = projectsHome

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const active = PROJECTS[activeIndex] ?? PROJECTS[0]

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length)
  }

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length)
  }

  useEffect(() => {
    if (paused) return

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECTS.length)
    }, 7000)

    return () => window.clearInterval(id)
  }, [paused])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#000] px-6 py-24 text-[#fff] md:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[4%] h-72 w-72 rounded-full bg-[#f0d46a]/24 blur-3xl" />
        <div className="absolute right-[-12%] bottom-[8%] h-80 w-80 rounded-full bg-[#f0d46a]/18 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px)] bg-size-[100%_24px] opacity-20" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="inline-flex rounded-full bg-[#000] px-3 py-1 text-[11px] font-semibold tracking-[0.13em] text-[#f0d46a] shadow-[inset_0_0_0_1px_rgba(88,197,182,0.28)]">
              PROJECTS LAB
            </p>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-[#fff] sm:text-5xl">
              Built Systems,
              <br />
              Better Experience.
            </h2>
          </div>

          <div className="grid w-full max-w-sm grid-cols-2 gap-2">
            <div className="rounded-xl bg-[#000] px-3 py-2 shadow-[inset_0_0_0_1px_rgba(77,109,129,0.28)]">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#fff]">
                Projects
              </p>
              <p className="mt-1 text-xl font-semibold text-[#fff]">
                {PROJECTS.length}
              </p>
            </div>
            <div className="rounded-xl bg-[#000] px-3 py-2 shadow-[inset_0_0_0_1px_rgba(88,197,182,0.32)]">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#f0d46a]">
                Mode
              </p>
              <p className="mt-1 text-xl font-semibold text-[#fff]">Live</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[1.7rem] bg-[#000]/92 p-4 shadow-[0_26px_70px_rgba(5,12,18,0.52),inset_0_0_0_1px_rgba(58,82,102,0.22)] sm:p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {PROJECTS.map((project, index) => {
              const isActive = activeIndex === index

              return (
                <button
                  key={project.key}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-all duration-200 ${
                    isActive
                      ? 'border-transparent bg-[#f0d46a] text-[#000] shadow-[0_8px_20px_rgba(240,212,106,0.35)]'
                      : 'border-transparent bg-[#000] text-[#fff] shadow-[inset_0_0_0_1px_rgba(66,90,113,0.36)] hover:bg-[#000]'
                  }`}
                >
                  {project.name}
                </button>
              )
            })}
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.4fr_0.6fr]">
            <div className="rounded-2xl bg-[#000] p-4 shadow-[inset_0_0_0_1px_rgba(72,113,136,0.3)]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#f0d46a]">
                Navigator
              </p>
              <div className="mt-3 space-y-2">
                {PROJECTS.map((project, index) => {
                  const isActive = activeIndex === index

                  return (
                    <button
                      key={`${project.key}-nav`}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`w-full rounded-xl px-3 py-2 text-left transition-colors duration-200 ${
                        isActive
                          ? 'bg-[#000] shadow-[inset_0_0_0_1px_rgba(88,197,182,0.44)]'
                          : 'bg-[#000] shadow-[inset_0_0_0_1px_rgba(70,97,122,0.34)] hover:bg-[#000]'
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#fff]">
                        {String(index + 1).padStart(2, '0')} • {project.eyebrow}
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#fff]">
                        {project.name}
                      </p>
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-[#000] px-3 py-2 shadow-[inset_0_0_0_1px_rgba(69,96,121,0.35)]">
                <p className="text-sm text-[#fff]">
                  Project {activeIndex + 1} of {PROJECTS.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevProject}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#000] text-[#fff] shadow-[inset_0_0_0_1px_rgba(76,107,134,0.4)] hover:bg-[#000]"
                    aria-label="Previous project"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={nextProject}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#000] text-[#fff] shadow-[inset_0_0_0_1px_rgba(76,107,134,0.4)] hover:bg-[#000]"
                    aria-label="Next project"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={active.key}
                initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-2xl bg-[#000] shadow-[0_18px_40px_rgba(3,10,16,0.45),inset_0_0_0_1px_rgba(59,88,111,0.28)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={active.image}
                    alt={active.title}
                    className="h-[240px] w-full object-cover sm:h-[320px]"
                    style={{
                      objectPosition: active.imagePosition ?? '50% 50%',
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(9,18,25,0.04)_45%,rgba(9,18,25,0.76)_100%)]" />
                  <p className="absolute left-4 top-4 rounded-full bg-[#000]/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#f0d46a] shadow-[inset_0_0_0_1px_rgba(87,191,177,0.42)]">
                    {active.eyebrow}
                  </p>
                </div>

                <div className="p-5">
                  <h3 className="text-2xl font-semibold leading-tight text-[#fff]">
                    {active.title}
                  </h3>
                  <p className="mt-3 text-[1.01rem] leading-7 text-[#fff]">
                    {active.summary}
                  </p>

                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {active.highlights.map((item) => (
                      <div
                        key={`${active.key}-${item}`}
                        className="rounded-xl bg-[#000] px-3 py-2 text-sm text-[#fff] shadow-[inset_0_0_0_1px_rgba(72,109,138,0.36)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl bg-[#000] px-4 py-3 shadow-[inset_0_0_0_1px_rgba(72,145,134,0.42)]">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#f0d46a]">
                      Outcome
                    </p>
                    <p className="mt-1 text-sm text-[#fff]">{active.outcome}</p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
