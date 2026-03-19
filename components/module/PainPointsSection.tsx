'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PainPointsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftPanel = sectionRef.current?.querySelector('.pain-left')
      const rightPanel = sectionRef.current?.querySelector('.pain-right')
      const items = sectionRef.current?.querySelectorAll('.pain-item')
      const gifCards = sectionRef.current?.querySelectorAll('.gif-card')
      const stage = sectionRef.current?.querySelector('.pain-stage')
      const scanLine = sectionRef.current?.querySelector('.scan-line')
      const noiseLayer = sectionRef.current?.querySelector('.noise-layer')

      if (leftPanel) {
        gsap.fromTo(
          leftPanel,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      }

      if (rightPanel) {
        gsap.fromTo(
          rightPanel,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 74%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      }

      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { x: 22, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.11,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 72%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      }

      if (gifCards && gifCards.length > 0 && stage) {
        gsap.set(stage, {
          rotateX: 0,
          rotateZ: 0,
          transformOrigin: '50% 50%',
        })

        gsap.set(gifCards, {
          x: 0,
          y: 0,
          rotate: 0,
          rotateX: 0,
        })

        gsap.fromTo(
          gifCards,
          {
            y: 60,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 76%',
              toggleActions: 'play none none reverse',
            },
          },
        )

        const bendTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom 8%',
            scrub: 0.8,
            invalidateOnRefresh: true,
            onRefreshInit: () => {
              gsap.set(stage, { rotateX: 0, rotateZ: 0 })
              gsap.set(gifCards, { x: 0, y: 0, rotate: 0 })
            },
            onEnter: () => {
              gsap.set(stage, { rotateX: 0, rotateZ: 0 })
              gsap.set(gifCards, { x: 0, y: 0, rotate: 0 })
            },
            onEnterBack: () => {
              gsap.set(stage, { rotateX: 0, rotateZ: 0 })
              gsap.set(gifCards, { x: 0, y: 0, rotate: 0 })
            },
            onLeaveBack: () => {
              gsap.set(stage, { rotateX: 0, rotateZ: 0 })
              gsap.set(gifCards, { x: 0, y: 0, rotate: 0 })
              if (scanLine) gsap.set(scanLine, { yPercent: -140, opacity: 0 })
              if (noiseLayer) gsap.set(noiseLayer, { opacity: 0 })
            },
          },
        })

        bendTl
          .fromTo(
            stage,
            {
              rotateX: 0,
              rotateZ: 0,
              transformOrigin: '50% 50%',
            },
            {
              rotateX: 11,
              rotateZ: -1.8,
              ease: 'none',
              duration: 0.22,
            },
            0,
          )
          .to(
            stage,
            {
              rotateX: 11,
              rotateZ: -1.8,
              ease: 'none',
              duration: 0.58,
            },
            0.22,
          )
          .to(
            stage,
            {
              rotateX: 0,
              rotateZ: 0,
              ease: 'none',
              duration: 0.2,
            },
            0.8,
          )
          .fromTo(
            gifCards[0],
            {
              x: 0,
              y: 0,
              rotate: 0,
            },
            {
              x: -76,
              y: -74,
              rotate: -11,
              ease: 'none',
              duration: 0.22,
            },
            0,
          )
          .to(
            gifCards[0],
            {
              x: -76,
              y: -74,
              rotate: -11,
              ease: 'none',
              duration: 0.58,
            },
            0.22,
          )
          .to(
            gifCards[0],
            {
              x: 0,
              y: 0,
              rotate: 0,
              ease: 'none',
              duration: 0.2,
            },
            0.8,
          )
          .fromTo(
            gifCards[1],
            {
              x: 0,
              y: 0,
              rotate: 0,
            },
            {
              x: 86,
              y: -118,
              rotate: 13,
              ease: 'none',
              duration: 0.22,
            },
            0,
          )
          .to(
            gifCards[1],
            {
              x: 86,
              y: -118,
              rotate: 13,
              ease: 'none',
              duration: 0.58,
            },
            0.22,
          )
          .to(
            gifCards[1],
            {
              x: 0,
              y: 0,
              rotate: 0,
              ease: 'none',
              duration: 0.2,
            },
            0.8,
          )

        if (scanLine) {
          bendTl
            .fromTo(
              scanLine,
              {
                yPercent: -140,
                opacity: 0,
              },
              {
                yPercent: 45,
                opacity: 0.42,
                ease: 'none',
                duration: 0.22,
              },
              0,
            )
            .to(
              scanLine,
              {
                yPercent: 90,
                opacity: 0.42,
                ease: 'none',
                duration: 0.58,
              },
              0.22,
            )
            .to(
              scanLine,
              {
                yPercent: 180,
                opacity: 0,
                ease: 'none',
                duration: 0.2,
              },
              0.8,
            )
        }

        if (noiseLayer) {
          bendTl
            .fromTo(
              noiseLayer,
              {
                opacity: 0,
              },
              {
                opacity: 0.2,
                ease: 'none',
                duration: 0.22,
              },
              0,
            )
            .to(
              noiseLayer,
              {
                opacity: 0.2,
                ease: 'none',
                duration: 0.58,
              },
              0.22,
            )
            .to(
              noiseLayer,
              {
                opacity: 0.03,
                ease: 'none',
                duration: 0.2,
              },
              0.8,
            )
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 md:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[20%] h-56 w-56 rounded-full bg-[#fff]/60 blur-3xl" />
        <div className="absolute right-[-6%] top-[35%] h-64 w-64 rounded-full bg-[#fff]/70 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="mb-12 border-t border-[#fff] pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#fff] bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-[#0ea5e9]">
              SECTION 02
            </span>
            <p className="text-sm font-medium tracking-[0.08em] text-[#000]">
              Anti-Bot Friction Layer
            </p>
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.22fr_1fr]">
        <div className="pain-left relative">
          <div className="pain-stage relative h-[480px] w-full [perspective:1200px] sm:h-[580px]">
            <div className="noise-layer pointer-events-none absolute inset-0 z-30 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(31,102,255,0.2),transparent_38%)] opacity-0" />

            <div className="scan-line pointer-events-none absolute inset-x-[7%] top-6 z-40 h-14 rounded-full bg-[linear-gradient(180deg,rgba(31,102,255,0)_0%,rgba(31,102,255,0.35)_50%,rgba(31,102,255,0)_100%)] opacity-0 blur-md" />

            <article className="gif-card absolute left-[0%] top-[4%] z-10 w-[96%] overflow-hidden rounded-3xl border border-[#fff] bg-white shadow-[0_30px_68px_rgba(18,19,23,0.2)] sm:w-[94%]">
              <img
                src="/assets/recaptcha.gif"
                alt="reCAPTCHA challenge interrupting scraping flow"
                className="h-[270px] w-full object-contain bg-[#fff] object-center sm:h-[330px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,19,23,0)_45%,rgba(18,19,23,0.42)_100%)]" />
              <div className="absolute left-3 top-3 rounded-full border border-[#fff] bg-white/94 px-2 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#000]">
                VERIFICATION LOOP
              </div>
              <div className="absolute right-3 top-3 rounded-full bg-white/94 px-2 py-1 text-[11px] text-[#000]">
                Bot challenge loop
              </div>
            </article>

            <article className="gif-card absolute right-[0%] top-[38%] z-20 w-[98%] overflow-hidden rounded-3xl border border-[#fff] bg-white shadow-[0_30px_68px_rgba(18,19,23,0.2)] sm:w-[95%]">
              <img
                src="/assets/image2%20(1).gif"
                alt="Request blocked with anti-bot response"
                className="h-[270px] w-full object-contain bg-[#fff] object-center sm:h-[340px]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(18,19,23,0)_48%,rgba(18,19,23,0.44)_100%)]" />
              <div className="absolute left-3 top-3 rounded-full border border-[#fff] bg-white/94 px-2 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#000]">
                ACCESS FRICTION
              </div>
              <div className="absolute right-3 top-3 rounded-full bg-white/94 px-2 py-1 text-[11px] text-[#000]">
                Request denied
              </div>
            </article>

            <div className="absolute -bottom-2 left-[6%] z-20 rounded-full border border-[#fff] bg-white/95 px-3 py-1 text-[11px] font-semibold tracking-[0.08em] text-[#0ea5e9]">
              35%-60% jobs fail without bypass logic
            </div>
          </div>
        </div>

        <div className="pain-right">
          <p className="mb-4 inline-flex rounded-full border border-[#fff] bg-white/90 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-[#0ea5e9]">
            REAL WORLD SCRAPING FRICTION
          </p>
          <h2 className="text-4xl font-medium tracking-tight text-[#000] sm:text-5xl">
            Does this sound familiar?
          </h2>
          <ul className="mt-9 space-y-6 text-[1.05rem] leading-8 text-[#000] sm:text-[1.15rem]">
            <li className="pain-item flex gap-4">
              <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#fff] text-sm font-semibold text-[#0ea5e9]">
                1
              </span>
              <span>
                You need competitor or supplier data, but anti-bot walls block
                every serious attempt.
              </span>
            </li>
            <li className="pain-item flex gap-4">
              <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#fff] text-sm font-semibold text-[#0ea5e9]">
                2
              </span>
              <span>
                Your team burns hours on manual copy-paste workflows that should
                have been automated months ago.
              </span>
            </li>
            <li className="pain-item flex gap-4">
              <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#fff] text-sm font-semibold text-[#0ea5e9]">
                3
              </span>
              <span>
                Even when data lands, it is inconsistent and outdated before
                stakeholders can act on it.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
