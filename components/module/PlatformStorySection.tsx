'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { marqueeItems } from '@/lib/data/marquee'

export default function PlatformStorySection() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!marqueeRef.current) return

    const marqueeContent = marqueeRef.current.querySelector(
      '[data-marquee-content]',
    )
    if (!marqueeContent) return

    const tween = gsap.to(marqueeContent, {
      x: '-50%',
      duration: 24,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <section className="relative overflow-hidden py-16">
      <div
        ref={marqueeRef}
        className="relative mx-auto w-[112%] -translate-x-[6%] -rotate-2 overflow-hidden border-y border-[#fff] bg-white/75 py-4 shadow-[0_14px_34px_rgba(21,27,39,0.08)]"
      >
        <div data-marquee-content className="flex w-max whitespace-nowrap">
          {[
            ...marqueeItems,
            ...marqueeItems,
            ...marqueeItems,
            ...marqueeItems,
          ].map((item, index) => (
            <span
              key={`${item}-${index}`}
              className={`mx-6 text-sm font-semibold tracking-[0.08em] ${
                item === '•' ? 'text-[#f0d46a]' : 'text-[#000]'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
