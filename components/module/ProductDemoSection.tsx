'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProductDemoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!frameRef.current || !sectionRef.current) return

      gsap.fromTo(
        frameRef.current,
        {
          transformOrigin: '50% 50%',
          scale: 0.9,
          y: 32,
          opacity: 0.25,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            end: 'top 45%',
            scrub: true,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-12">
      <div
        ref={frameRef}
        className="w-full aspect-video px-4 will-change-transform"
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/xZq59Kj5b30?si=5AifH1EmdHLOHoKU"
          title="Google Antigravity product demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="aspect-video rounded-4xl"
        ></iframe>
      </div>
    </section>
  )
}
