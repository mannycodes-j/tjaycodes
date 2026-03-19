'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import FoldButton from '@/components/common/FoldButton'

// Typewriter effect component
function TypewriterEffect({
  text,
  delay = 0,
}: {
  text: string
  delay?: number
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      let index = 0
      const typeInterval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.substring(0, index))
          index++
        } else {
          setIsComplete(true)
          clearInterval(typeInterval)
        }
      }, 30)
      return () => clearInterval(typeInterval)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <span>
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </span>
  )
}

export default function AboutSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const profileY = useTransform(scrollYProgress, [0, 1], [0, 100])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      {/* Hero Section */}
      <section className="px-6 md:px-12 py-20 md:py-32 relative overflow-hidden">
        {/* Animated background blobs */}
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-black/2 rounded-full blur-3xl -z-10"
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="mx-auto max-w-7xl">
          {/* Intro Text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-base md:text-lg text-gray-400 mb-6"
          >
            Hi, I'm TJ,
          </motion.p>

          {/* Main Heading with Typewriter */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-black mb-16 leading-tight max-w-3xl"
          >
            <TypewriterEffect
              text="I automate the internet for you"
              delay={600}
            />
          </motion.h1>

          {/* Two Column Layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16"
          >
            {/* Left Sidebar Label */}
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2.4 }}
            >
              <p className="text-base font-semibold text-black sticky top-8">
                About me
              </p>
            </motion.div>

            {/* Right Content */}
            <motion.div
              className="md:col-span-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ delayChildren: 2.4, staggerChildren: 0.15 }}
            >
              <motion.div className="space-y-6" variants={itemVariants}>
                <p className="text-lg text-gray-600 leading-relaxed">
                  For the past few years, I've specialized in turning tedious
                  tasks into seamless automation. Whether that means sniping
                  limited-stock drops with checkout bots, generating accounts at
                  scale, monitoring e-commerce sites in real time, or scraping
                  data faster than you can say "out of stock"—I've got the
                  expertise.
                </p>

                <p className="text-lg text-gray-600 leading-relaxed">
                  Reverse engineering anti-bot measures? No problem. Building
                  resilient systems that scale? Consider it handled. Need custom
                  automation solutions tailored to your specific needs? I'm your
                  guy. I don't just build bots; I build intelligent systems that
                  work when it matters most.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="mt-12 flex flex-col sm:flex-row gap-4"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <FoldButton
                    label="Contact me!"
                    onClick={() => {
                      window.location.hash = 'contact'
                    }}
                  />
                </motion.div>
                <motion.a
                  href="#projects"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-[8px] border-2 border-gray-300 text-black font-semibold hover:border-black hover:bg-gray-50 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  See My Work
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Profile/Showcase Section */}
      <section className="px-6 md:px-12 py-20 relative">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            {/* Centered showcase with profile image and mockups */}
            <div className="flex justify-center items-center min-h-[500px] md:min-h-[600px] relative">
              {/* Floating gradient orbs behind profile */}
              <motion.div
                className="absolute top-10 left-10 w-64 h-64 bg-linear-to-br from-black/5 to-transparent rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-72 h-72 bg-linear-to-br from-black/3 to-transparent rounded-full blur-3xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 8, repeat: Infinity, delay: 1 }}
              />

              {/* Profile Image Circle */}
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80"
                style={{ y: profileY }}
              >
                <motion.div
                  className="w-full h-full rounded-3xl bg-gray-100 border-2 border-gray-200 overflow-hidden flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-400 text-center">TJ Profile Image</p>
                </motion.div>

                {/* Decorative element - top left - animated */}
                <motion.div
                  className="absolute -top-8 -left-12 md:-left-16"
                  initial={{ opacity: 0, x: -20, y: -20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg px-3 py-2 whitespace-nowrap shadow-md">
                    Automation Expert
                  </div>
                </motion.div>

                {/* Decorative element - bottom right - animated */}
                <motion.div
                  className="absolute -bottom-8 -right-12 md:-right-16"
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
                    <motion.p
                      className="text-2xl font-bold text-black"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      10+
                    </motion.p>
                    <p className="text-xs text-gray-600 mt-1">
                      Projects Completed
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="px-6 md:px-12 py-20 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black">
              My Expertise
            </h2>
            <motion.p
              className="text-lg text-gray-600 mt-4 max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              Everything I specialize in to power your automation at scale
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {[
              {
                icon: '🤖',
                title: 'Checkout Bot Development',
                description:
                  'Lightning-fast bots that secure limited drops, bypass queues, and handle high-traffic checkouts with precision',
              },
              {
                icon: '📊',
                title: 'Account Generation at Scale',
                description:
                  'Mass account creation systems with bypass techniques, fingerprinting evasion, and authentication automation',
              },
              {
                icon: '👁️',
                title: 'E-commerce Monitoring',
                description:
                  'Real-time inventory tracking, price monitoring, and stock alerts across multiple platforms simultaneously',
              },
              {
                icon: '🛡️',
                title: 'Anti-Bot Bypass & Resilience',
                description:
                  'Advanced techniques to detect and defeat Cloudflare, hCaptcha, reCAPTCHA, and other anti-bot systems',
              },
              {
                icon: '⚡',
                title: 'Data Scraping & Pipelines',
                description:
                  'Distributed scraping at scale with proxy rotation, headless browsers, and data pipeline orchestration',
              },
              {
                icon: '🔍',
                title: 'Reverse Engineering',
                description:
                  'Analyzing APIs, mobile apps, and web platforms to unlock automation possibilities and detect vulnerabilities',
              },
            ].map((expertise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="group relative p-8 border-2 border-gray-200 rounded-2xl bg-white hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 bg-black/2 rounded-2xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ zIndex: -1 }}
                />

                {/* Icon */}
                <motion.div
                  className="text-5xl mb-5 inline-block"
                  whileHover={{ scale: 1.3, rotate: 10, y: -10 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {expertise.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-gray-900 transition-colors">
                  {expertise.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {expertise.description}
                </p>

                {/* Arrow indicator */}
                <motion.div
                  className="mt-6 inline-flex items-center text-black font-semibold"
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Learn more
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 md:px-12 py-20 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-black/2 to-transparent"
          animate={{
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ zIndex: -1 }}
        />

        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center bg-gray-50 rounded-3xl p-12 md:p-16 relative"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-black mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              Let's build something unstoppable.
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              Whether you need custom automation, intelligent systems, or
              scaling solutions—let's make it happen.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-black text-white font-semibold"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border-2 border-gray-300 text-black font-semibold hover:border-black"
                whileHover={{ scale: 1.05, y: -2, borderColor: '#000' }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Call
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
