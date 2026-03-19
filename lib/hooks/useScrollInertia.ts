import { useEffect, useRef } from 'react'

export function useScrollInertia(intensity = 0.25, damping = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const yOffsetRef = useRef(0)
  const lastScrollRef = useRef(
    typeof window !== 'undefined' ? window.scrollY : 0,
  )
  const tickingRef = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.style.willChange = 'transform'

    const update = () => {
      const currentScroll = window.scrollY
      const scrollSpeed = currentScroll - lastScrollRef.current

      yOffsetRef.current += scrollSpeed * intensity
      yOffsetRef.current *= 1 - damping

      element.style.transform = `translateY(${yOffsetRef.current}px)`

      lastScrollRef.current = currentScroll
      tickingRef.current = false

      if (Math.abs(yOffsetRef.current) > 0.3) {
        requestAnimationFrame(update)
      }
    }

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [intensity, damping])

  return ref
}
