'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STEPS } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

export default function SignalControlSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const hasStartedRef = useRef(false)
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Advance to next step when progress completes
  useEffect(() => {
    if (progress >= 100) {
      setActiveStep((current) => (current + 1) % STEPS.length)
      setProgress(0)
    }
  }, [progress])

  // Auto-advance steps with progress loader
  const startProgress = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
    }

    const duration = 4000
    const interval = 30
    const increment = (interval / duration) * 100

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return prev
        return prev + increment
      })
    }, interval)
  }, [])

  useEffect(() => {
    // Start auto-play when section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true
          startProgress()
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [startProgress])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.from(cardRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      // Phone mockup animation
      gsap.from(phoneRef.current, {
        x: 100,
        opacity: 0,
        rotation: 10,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      // Steps stagger
      if (stepsRef.current) {
        const items = stepsRef.current.querySelectorAll('[data-step-item]')
        gsap.from(items, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleStepClick = (index: number) => {
    setActiveStep(index)
    setProgress(0)
  }

  // Phone screen images
  const stepScreenImages = [
    '/assets/recaptcha.gif',
    '/assets/image2%20(1).gif',
    '/assets/hero-image-1.jpg',
  ]

  // Phone screen content
  const phoneScreens = stepScreenImages.map((imageSrc, index) => (
    <div key={`step-${index}`} style={{ height: '100%', position: 'relative' }}>
      <Image
        src={imageSrc}
        alt={`Step ${index + 1} screen`}
        fill
        style={{ objectFit: 'cover' }}
        priority={index === 0}
      />
    </div>
  ))

  return (
    <section
      ref={sectionRef}
      style={{
        padding: isMobile ? '3rem 0' : '6rem 0',
        backgroundColor: '#F8F8FC',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorations */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: '30%',
          height: '40%',
          background:
            'radial-gradient(circle, rgba(75,0,130,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          width: '35%',
          height: '45%',
          background:
            'radial-gradient(circle, rgba(253,185,19,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.25rem',
              backgroundColor: 'rgba(75,0,130,0.1)',
              borderRadius: '9999px',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ fontSize: '1rem' }}>🚀</span>
            <span
              style={{
                color: '#4B0082',
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: '0.05em',
              }}
            >
              HOW IT WORKS
            </span>
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 900,
              color: '#1C1C3C',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Your Data Problem <br />
            <span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #FDB913 0%, #E6A800 100%)',
                color: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Solved in 3 Simple Steps.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            style={{
              fontSize: '1.125rem',
              color: '#666',
              maxWidth: '32rem',
              margin: '0 auto',
            }}
          >
            Start your scraping workflow in minutes and automate reliable data
            delivery.
          </motion.p>
        </div>

        {/* Main Card */}
        <div
          ref={cardRef}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: isMobile ? '1.5rem' : '2rem',
            boxShadow: '0 25px 80px rgba(0,0,0,0.08)',
            padding: isMobile ? '1.5rem' : '3rem',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '2rem' : '4rem',
            alignItems: 'center',
            border: '1px solid rgba(75,0,130,0.05)',
          }}
        >
          {/* Left: Steps with Progress Loaders */}
          <div
            ref={stepsRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isMobile ? '0.75rem' : '1.5rem',
            }}
          >
            {STEPS.map((step, index) => {
              const radius = 30
              const circumference = 2 * Math.PI * radius
              const strokeColor =
                index < activeStep
                  ? '#4B0082'
                  : activeStep === index
                    ? '#FDB913'
                    : 'transparent'
              const dashOffset =
                index < activeStep
                  ? 0
                  : activeStep === index
                    ? circumference * (1 - progress / 100)
                    : circumference

              return (
                <motion.div
                  key={step.id}
                  data-step-item
                  onClick={() => handleStepClick(index)}
                  whileHover={{ x: isMobile ? 0 : 4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: isMobile ? '1rem' : '1.5rem',
                    padding: isMobile ? '1rem' : '1.5rem',
                    backgroundColor:
                      activeStep === index
                        ? 'rgba(75,0,130,0.05)'
                        : 'transparent',
                    borderRadius: '1.25rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    border:
                      activeStep === index
                        ? '1px solid rgba(75,0,130,0.1)'
                        : '1px solid transparent',
                  }}
                >
                  {/* Circular Progress Loader */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <svg
                      width={isMobile ? '50' : '70'}
                      height={isMobile ? '50' : '70'}
                      viewBox="0 0 70 70"
                      style={{ transform: 'rotate(-90deg)' }}
                    >
                      {/* Background circle */}
                      <circle
                        cx="35"
                        cy="35"
                        r="30"
                        fill="none"
                        stroke={
                          activeStep === index ? 'rgba(75,0,130,0.1)' : '#eee'
                        }
                        strokeWidth="4"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="35"
                        cy="35"
                        r="30"
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        style={{
                          transition:
                            index < activeStep
                              ? 'stroke-dashoffset 0.3s'
                              : 'none',
                        }}
                      />
                    </svg>

                    {/* Step number in center */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: isMobile ? '32px' : '44px',
                        height: isMobile ? '32px' : '44px',
                        borderRadius: '50%',
                        backgroundColor:
                          index <= activeStep ? '#4B0082' : '#F8F8FC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s',
                        boxShadow:
                          index <= activeStep
                            ? '0 4px 12px rgba(75,0,130,0.3)'
                            : 'none',
                      }}
                    >
                      {index < activeStep ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          style={{ color: 'white', fontSize: '1.25rem' }}
                        >
                          ✓
                        </motion.span>
                      ) : (
                        <span
                          style={{
                            fontSize: '1rem',
                            fontWeight: 800,
                            color: index === activeStep ? 'white' : '#999',
                          }}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontSize: isMobile ? '1rem' : '1.25rem',
                        fontWeight: 700,
                        color: activeStep === index ? '#4B0082' : '#1C1C3C',
                        marginBottom: '0.25rem',
                        transition: 'color 0.3s',
                      }}
                    >
                      {step.title}
                    </h4>
                    <p
                      style={{
                        fontSize: isMobile ? '0.8rem' : '0.9rem',
                        color: '#666',
                        lineHeight: 1.5,
                        opacity: activeStep === index ? 1 : 0.7,
                        transition: 'opacity 0.3s',
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}

            {/* Progress indicator */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1rem',
                paddingLeft: '1.5rem',
              }}
            >
              {STEPS.map((step, index) => (
                <motion.div
                  key={step.id}
                  style={{
                    height: '4px',
                    borderRadius: '2px',
                    backgroundColor: index <= activeStep ? '#4B0082' : '#eee',
                    flex: 1,
                    cursor: 'pointer',
                    overflow: 'hidden',
                  }}
                  onClick={() => handleStepClick(index)}
                >
                  {index === activeStep && (
                    <motion.div
                      style={{
                        height: '100%',
                        backgroundColor: '#FDB913',
                        width: `${progress}%`,
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Phone Mockup with Frame Image */}
          <div
            ref={phoneRef}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Phone Frame - STAGNANT */}
            <div
              style={{
                position: 'relative',
                width: isMobile ? '220px' : '280px',
                height: isMobile ? '450px' : '570px',
              }}
            >
              {/* Phone Frame Image - stays fixed */}
              <Image
                src="/assets/phone-frame.png"
                alt="Phone frame"
                fill
                priority
                style={{
                  objectFit: 'contain',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />

              {/* Screen Content Area - only this changes */}
              <div
                style={{
                  position: 'absolute',
                  top: '2.5%',
                  left: '5.5%',
                  width: '89%',
                  height: '95%',
                  borderRadius: isMobile ? '28px' : '36px',
                  overflow: 'hidden',
                  backgroundColor: '#F8F8FC',
                  zIndex: 1,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    style={{ height: '100%' }}
                  >
                    {phoneScreens[activeStep]}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Floating elements - hide on mobile */}
              {!isMobile && (
                <>
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: '10%',
                      right: '5%',
                      backgroundColor: 'white',
                      padding: '0.75rem 1rem',
                      borderRadius: '1rem',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>🛡️</span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: '#1C1C3C',
                      }}
                    >
                      Cloudflare Ready
                    </span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
                    style={{
                      position: 'absolute',
                      bottom: '15%',
                      left: '0%',
                      backgroundColor: '#4B0082',
                      color: 'white',
                      padding: '0.6rem 1rem',
                      borderRadius: '1rem',
                      boxShadow: '0 10px 30px rgba(75,0,130,0.3)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                    }}
                  >
                    Structured Output Ready
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
