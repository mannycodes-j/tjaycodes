'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/data/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [menuHeight, setMenuHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    if (currentScrollY < lastScrollY) {
      setIsVisible(true)
    } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setIsVisible(false)
    }

    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Get menu height on mount
  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.getBoundingClientRect().height + 100)
    }
  }, [isMenuOpen])

  // Close menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        closeMenu()
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen])

  const openMenu = () => {
    setIsMenuOpen(true)
    gsap.to('.menu-container', {
      width: '94vw',
      maxWidth: '380px',
      height: menuHeight || 500,
      borderRadius: '1rem',
      duration: 0.5,
      ease: 'power2.inOut',
    })
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    gsap.to('.menu-container', {
      width: '48px',
      height: '48px',
      borderRadius: '50px',
      duration: 0.5,
      ease: 'power2.inOut',
    })
  }

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  const handleNavClick = () => {
    if (isMenuOpen) closeMenu()
    setOpenDropdown(null)
  }

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label))
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-4 left-4 right-4 z-50 transition-all duration-300 ease-in-out',
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-10 relative">
            <img
              src="/assets/Tjay-codes-logo.png"
              alt="Tjay Codes logo"
              className="h-10 w-auto transition-transform hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex items-center gap-8 bg-white/80 backdrop-blur-md rounded-full px-8 py-3 shadow-md border border-gray-200">
              {navItems.map((item) => (
                <Fragment key={item.label}>
                  {!item.hasDropdown ? (
                    <Link
                      href={item.href ?? '/'}
                      className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="relative group">
                      <button className="text-sm font-medium text-gray-700 hover:text-black transition-colors flex items-center gap-1">
                        {item.label}
                        <span className="text-xs">▼</span>
                      </button>
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 border border-gray-200">
                        {item.dropdownItems?.map((dropdown) => (
                          <a
                            key={dropdown.label}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {dropdown.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          )}

          {/* Mobile Menu Container */}
          {isMobile && (
            <div className="bg-white rounded-full w-12 h-12 absolute top-0 right-0 overflow-hidden menu-container z-999 shadow-lg border border-gray-200">
              <div>
                {/* Hamburger / Close Icon */}
                <button
                  onClick={toggleMenu}
                  className="w-12 h-12 bg-white text-gray-900 rounded-full flex flex-col items-center justify-center z-999 absolute top-0 right-0 cursor-pointer transition-colors"
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  <div className="relative w-5 h-4 flex flex-col">
                    <span
                      className={cn(
                        'absolute left-0 w-5 h-0.5 bg-gray-900 transition-all duration-500 ease-in-out',
                        isMenuOpen
                          ? 'top-1/2 -translate-y-1/2 rotate-45'
                          : 'top-0',
                      )}
                    />
                    <span
                      className={cn(
                        'absolute left-0 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-gray-900 transition-all duration-500 ease-in-out',
                        isMenuOpen
                          ? 'opacity-0 scale-0'
                          : 'opacity-100 scale-100',
                      )}
                    />
                    <span
                      className={cn(
                        'absolute left-0 w-5 h-0.5 bg-gray-900 transition-all duration-500 ease-in-out',
                        isMenuOpen
                          ? 'bottom-1/2 translate-y-1/2 -rotate-45'
                          : 'bottom-0',
                      )}
                    />
                  </div>
                </button>

                {/* Mobile Menu Links */}
                <div ref={menuRef} className="mt-16 p-6 pt-2">
                  {navItems.map((item, index) => {
                    const isOpen = openDropdown === item.label

                    return (
                      <Fragment key={item.label}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{
                            opacity: isMenuOpen ? 1 : 0,
                            x: isMenuOpen ? 0 : -20,
                          }}
                          transition={{
                            delay: isMenuOpen ? index * 0.08 : 0,
                            duration: 0.3,
                          }}
                        >
                          {!item.hasDropdown ? (
                            <Link
                              href={item.href ?? '/'}
                              onClick={handleNavClick}
                              className="block py-3 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <>
                              <button
                                onClick={() => toggleDropdown(item.label)}
                                className="w-full flex items-center justify-between py-3 text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
                              >
                                {item.label}
                                <span
                                  className={cn(
                                    'transition-transform duration-300',
                                    isOpen ? 'rotate-180' : 'rotate-0',
                                  )}
                                >
                                  ▼
                                </span>
                              </button>

                              <motion.div
                                animate={{
                                  height: isOpen ? 'auto' : 0,
                                  opacity: isOpen ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                {item.dropdownItems?.map(
                                  (dropdown, dropIndex) => (
                                    <motion.a
                                      key={dropdown.label}
                                      href="#"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{
                                        opacity: isOpen ? 1 : 0,
                                        x: isOpen ? 0 : -10,
                                      }}
                                      transition={{
                                        delay: isOpen ? dropIndex * 0.05 : 0,
                                        duration: 0.2,
                                      }}
                                      onClick={handleNavClick}
                                      className="block py-2 pl-4 text-base text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                      {dropdown.label}
                                    </motion.a>
                                  ),
                                )}
                              </motion.div>
                            </>
                          )}
                        </motion.div>
                      </Fragment>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
