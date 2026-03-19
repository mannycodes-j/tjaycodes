'use client'

import { useEffect, useRef } from 'react'
import { CallAdd } from 'iconsax-reactjs'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OrbitalRing from '@/components/common/OrbitalRing'
import ActionButton from '@/components/common/ActionButton'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroParticleRef = useRef<HTMLDivElement>(null)
  const phonesWrapperRef = useRef<HTMLDivElement>(null)
  const leftBadgeRef = useRef<HTMLDivElement>(null)
  const rightBadgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      tl.set('.invert-in', {
        rotateX: -90,
        transformPerspective: 900,
        transformOrigin: '50% 50%',
      })
      tl.set('.scale-in', { scale: 0.9 })
      tl.set('.flip-in', {
        transformPerspective: 900,
        transformOrigin: '50% 50%',
      })

      tl.to('.invert-in', { rotateX: 0, duration: 0.5 }, '-=.2')
      tl.to(
        '.scale-in',
        {
          scale: 1,
          duration: 0.5,
        },
        0.1,
      ).to('.flip-in', {
        rotateY: 360,
        duration: 1,
      })

      const phones = phonesWrapperRef.current?.querySelectorAll('[data-phone]')

      if (phones && phones.length >= 3) {
        gsap.set(phones[0], { x: -80, opacity: 0 })
        gsap.set(phones[1], { y: 70, opacity: 0 })
        gsap.set(phones[2], { x: 80, opacity: 0 })

        ScrollTrigger.create({
          trigger: phonesWrapperRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(phones[1], { y: 0, opacity: 1, duration: 0.55 })
            gsap.to(phones[0], {
              x: 0,
              opacity: 1,
              duration: 0.55,
              delay: 0.08,
            })
            gsap.to(phones[2], {
              x: 0,
              opacity: 1,
              duration: 0.55,
              delay: 0.08,
            })
          },
          once: true,
        })
      }

      gsap.to(leftBadgeRef.current, {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(rightBadgeRef.current, {
        y: -6,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.3,
      })
    }, heroParticleRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroParticleRef}
      className="relative overflow-hidden bg-white pt-20"
    >
      <div className="flex justify-center items-center min-h-[calc(100dvh-5rem)] relative z-10">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-3 perspective-[900px]">
            <div className="scale-in inline-flex items-center rounded-full border border-[#fff] bg-white/95 px-5 py-2 shadow-[0_10px_24px_rgba(18,19,23,0.08)]">
              <span className="invert-in inline-block text-sm font-semibold tracking-[0.22em] text-[#f0d46a]">
                TJAY
              </span>
              <span className="mx-2 h-4 w-px bg-[#fff]" />
              <span className="flip-in inline-block text-sm font-semibold tracking-[0.22em] text-[#000]">
                CODES
              </span>
            </div>
          </div>
          <div className="mx-8 mt-8 mb-16 text-center">
            <h1 className="text-7xl font-[450] leading-14">
              <span className="block text-[#000]">Get Any Web Data,</span>
              <span className="text-6xl text-[#000] block">
                Delivered to You on Autopilot.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg leading-7 text-[#000]">
              I deliver clean, structured data from any website, so you can stop
              wasting time and start making smarter decisions.
            </p>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <ActionButton
              variant="primary"
              icon={
                <CallAdd
                  color="#ffffff"
                  variant="Bold"
                  className="mr-2"
                  size={20}
                />
              }
            >
              Book a Free Consultation
            </ActionButton>
          </div>

          <div
            ref={phonesWrapperRef}
            className="mt-12 relative flex items-end justify-center px-4"
          >
            <div
              data-phone
              className="relative z-10 h-[300px] w-[150px] sm:h-[440px] sm:w-[220px]"
            >
              <div className="absolute left-[5.5%] top-[4.2%] z-20 h-[92.6%] w-[89%] overflow-hidden rounded-[20px] bg-[#fff]">
                <img
                  src="/assets/hero-image-1.jpg"
                  alt="App preview"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <img
                src="/assets/phone-frame.png"
                alt="Phone frame"
                className="pointer-events-none absolute inset-0 z-40 h-full w-full object-contain"
              />
            </div>

            <div
              data-phone
              className="relative z-20 -mx-6 h-[360px] w-[180px] sm:-mx-10 sm:h-[540px] sm:w-[270px]"
            >
              <div className="absolute left-[5.2%] top-[4%] z-20 h-[92.8%] w-[89.6%] overflow-hidden rounded-[22px] bg-[#ffffff]">
                <img
                  src="/assets/hero-image-1.jpg"
                  alt="App preview"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <img
                src="/assets/phone-frame.png"
                alt="Phone frame"
                className="pointer-events-none absolute inset-0 z-40 h-full w-full object-contain"
              />
            </div>

            <div
              data-phone
              className="relative z-10 h-[300px] w-[150px] sm:h-[440px] sm:w-[220px]"
            >
              <div className="absolute left-[5.5%] top-[4.2%] z-20 h-[92.6%] w-[89%] overflow-hidden rounded-[20px] bg-[#fff]">
                <img
                  src="/assets/hero-image-1.jpg"
                  alt="App preview"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <img
                src="/assets/phone-frame.png"
                alt="Phone frame"
                className="pointer-events-none absolute inset-0 z-40 h-full w-full object-contain"
              />
            </div>

            <div
              ref={leftBadgeRef}
              className="absolute left-[-0.25rem] top-5 hidden max-w-[160px] rounded-2xl border border-[#fff] bg-white/95 p-3 text-left shadow-[0_12px_28px_rgba(18,19,23,0.12)] lg:block"
            >
              <p className="text-[11px] font-semibold tracking-wide text-[#000]">
                10K+ Pages Parsed
              </p>
              <p className="mt-1 text-[11px] text-[#000]">
                Daily automations running across workflows.
              </p>
            </div>

            <div
              ref={rightBadgeRef}
              className="absolute right-[-0.25rem] top-14 hidden max-w-[170px] rounded-2xl border border-[#fff] bg-white/95 p-3 text-left shadow-[0_12px_28px_rgba(18,19,23,0.12)] lg:block"
            >
              <p className="text-[11px] font-semibold tracking-wide text-[#000]">
                Scheduled Collection
              </p>
              <p className="mt-1 text-[11px] text-[#000]">
                Pull fresh data on repeat without manual runs.
              </p>
            </div>
          </div>
        </div>
      </div>
      <OrbitalRing
        particleCount={400}
        innerRadius={1.5}
        breathAmount={0}
        breathSpeed={0}
        wrapper={heroParticleRef}
      />
    </section>
  )
}
