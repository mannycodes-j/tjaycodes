'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

type Testimonial = {
  id: string
  name: string
  role: string
  quote: string
  highlights: string[]
  imageSrc: string
  imageAlt: string
  imagePosition?: string
  baseTilt: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'a',
    name: 'Aleksandra Jablonska',
    role: 'Operations Lead',
    quote:
      'The system is intuitive, the extraction works well, and we can always count on the support team.',
    highlights: ['is intuitive', 'works well'],
    imageSrc: '/assets/hero-image-1.jpg',
    imageAlt: 'Aleksandra portrait style testimonial image',
    imagePosition: '50% 30%',
    baseTilt: -7,
  },
  {
    id: 'b',
    name: 'Marcus Bell',
    role: 'Product Analyst',
    quote:
      'Even with bot checks and tricky pages, the pipeline keeps delivering clean structured output every day.',
    highlights: ['bot checks', 'clean structured output'],
    imageSrc: '/assets/hero-image-1.jpg',
    imageAlt: 'Marcus testimonial image',
    imagePosition: '42% 36%',
    baseTilt: 6,
  },
  {
    id: 'c',
    name: 'Nora Mendoza',
    role: 'Growth Manager',
    quote:
      'We replaced manual copy-paste chaos with dependable automations and finally trust the data in meetings.',
    highlights: ['manual copy-paste chaos', 'trust the data'],
    imageSrc: '/assets/hero-image-1.jpg',
    imageAlt: 'Nora testimonial image',
    imagePosition: '58% 34%',
    baseTilt: -5,
  },
  {
    id: 'd',
    name: 'Samir Okeke',
    role: 'Data Engineer',
    quote:
      'The delivery cadence is flexible, and schema consistency has been rock solid across all our target sources.',
    highlights: ['delivery cadence', 'schema consistency'],
    imageSrc: '/assets/hero-image-1.jpg',
    imageAlt: 'Samir testimonial image',
    imagePosition: '50% 40%',
    baseTilt: 8,
  },
  {
    id: 'e',
    name: 'Ivy Chen',
    role: 'Founder',
    quote:
      'From first call to production workflow, everything felt thoughtful, fast, and ridiculously reliable.',
    highlights: ['thoughtful, fast', 'ridiculously reliable'],
    imageSrc: '/assets/hero-image-1.jpg',
    imageAlt: 'Ivy testimonial image',
    imagePosition: '46% 28%',
    baseTilt: -9,
  },
]

function highlightText(text: string, highlights: string[]) {
  if (!highlights.length) return text

  const escaped = highlights
    .map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) => {
    const isHighlight = highlights.some(
      (target) => part.toLowerCase() === target.toLowerCase(),
    )

    if (!isHighlight) return <span key={`${part}-${index}`}>{part}</span>

    return (
      <span
        key={`${part}-${index}`}
        className="rounded-full bg-[#f0d46a] px-2 py-[0.15rem] text-black"
      >
        {part}
        
      </span>
    )
  })
}

export default function TestimonialSection() {
  const [order, setOrder] = useState(TESTIMONIALS.map((item) => item.id))
  const [isAnimating, setIsAnimating] = useState(false)
  const [movingCardId, setMovingCardId] = useState<string | null>(null)

  const testimonialById = useMemo(() => {
    const map = new Map<string, Testimonial>()
    TESTIMONIALS.forEach((item) => map.set(item.id, item))
    return map
  }, [])

  const active = testimonialById.get(order[0] ?? '') ?? TESTIMONIALS[0]

  const rotateNext = () => {
    if (isAnimating) return
    const frontId = order[0]
    if (!frontId) return

    setIsAnimating(true)
    setMovingCardId(frontId)

    setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0] ?? prev[0]])
      setMovingCardId(null)
      setIsAnimating(false)
    }, 720)
  }

  const rotatePrev = () => {
    if (isAnimating) return
    const frontId = order[0]
    if (!frontId) return

    setIsAnimating(true)
    setMovingCardId(frontId)

    setTimeout(() => {
      setOrder((prev) => [
        prev[prev.length - 1] ?? prev[0],
        ...prev.slice(0, -1),
      ])
      setMovingCardId(null)
      setIsAnimating(false)
    }, 720)
  }

  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-14%] h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-[-6%] bottom-[-18%] h-96 w-96 rounded-full bg-[#f0d46a]/12 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
        <div
          className="relative min-h-[520px]"
          style={{ perspective: '2000px' }}
        >
          {order.map((id, index) => {
            const item = testimonialById.get(id)
            if (!item) return null

            const visible = index < 4
            const x = index * 24 - 12
            const y = index * 16 + 4
            const scale = 1 - index * 0.06
            const opacity = visible ? 1 - index * 0.15 : 0
            const zIndex = 80 - index
            const isFront = index === 0
            const isMovingToBack = isFront && id === movingCardId

            return (
              <motion.article
                key={id}
                layout
                transition={{
                  duration: isMovingToBack ? 0.68 : 0.34,
                  ease: [0.22, 1, 0.36, 1],
                  times: isMovingToBack ? [0, 0.42, 1] : undefined,
                }}
                className="absolute left-0 top-0 w-[88%] max-w-[690px]"
                style={{
                  zIndex,
                  pointerEvents: index === 0 ? 'auto' : 'none',
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  x: isMovingToBack ? [x, x - 112, x + 96] : x,
                  y: isMovingToBack ? [y, y - 26, y + 74] : y,
                  z: isMovingToBack ? [0, 120, -260] : 0,
                  rotate: isMovingToBack
                    ? [
                        item.baseTilt + index * 1.8,
                        item.baseTilt - 3,
                        item.baseTilt + 7,
                      ]
                    : item.baseTilt + index * 1.8,
                  scale: isMovingToBack
                    ? [scale, scale * 1.12, scale * 0.72]
                    : scale,
                  opacity: isMovingToBack
                    ? [opacity, 1, Math.max(0.48, opacity)]
                    : opacity,
                  zIndex: isMovingToBack ? [120, 120, 14] : zIndex,
                }}
              >
                <div className="rounded-[10px] border border-black/10 bg-white p-5 shadow-[0_18px_28px_rgba(0,0,0,0.35)]">
                  <div className="relative overflow-hidden rounded-xs border-3 border-black bg-white">
                    <img
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      className="h-[360px] w-full object-cover"
                      style={{
                        objectPosition: item.imagePosition ?? '50% 50%',
                      }}
                    />
                  </div>
                  <p className="pt-4 text-center font-[cursive] text-[2.8rem] leading-none text-black">
                    {item.name.split(' ')[0]}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="lg:pl-3">
          <p className="text-8xl leading-none text-[#f0d46a]">“</p>
          <p className="mt-2 text-balance text-[2.15rem] font-semibold leading-[1.45] text-white">
            {highlightText(active.quote, active.highlights)}
          </p>

          <div className="mt-7 flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-full border border-[#f0d46a]/60">
              <img
                src={active.imageSrc}
                alt={`${active.name} avatar`}
                className="h-full w-full object-cover"
                style={{ objectPosition: active.imagePosition ?? '50% 50%' }}
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-white">
                {active.name}
              </p>
              <p className="text-sm text-white/65">{active.role}</p>
            </div>
          </div>

          <div className="mt-14 flex items-center gap-4">
            <button
              type="button"
              onClick={rotatePrev}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/45 bg-black text-2xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-[#f0d46a] hover:text-black"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              type="button"
              onClick={rotateNext}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/45 bg-black text-2xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-[#f0d46a] hover:text-black"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
