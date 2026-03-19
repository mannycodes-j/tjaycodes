'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/animations/ScrollReveal'

type BlogPost = {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: string
  image: string
  imagePosition?: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'python-requests-scaling',
    title: 'How 20,000 Requests Sent/Sec in Python Helps Scale Your Business',
    excerpt:
      "For any scaling company, there's a familiar and costly problem. The technology that helped you launch and find your first customers eventually starts to slow down.",
    content:
      "For any scaling company, there's a familiar and costly problem. The technology that helped you launch and find your first customers eventually starts to slow down.\n\nMany businesses start with a flexible language like Python because it lets them build and adapt quickly. But when it's time for serious growth, the conventional wisdom says you have to do a \"rewrite\"—a slow and expensive migration to a supposedly faster, more complex system.\n\nThis approach proves that with a smart architecture, you don't have to choose between speed of development and speed of execution. By making smarter architectural choices early on, you can build a business that's not only quick to launch but also ready for massive growth.",
    category: 'Performance',
    date: 'October 9, 2025',
    readTime: '8 min read',
    image: '/assets/hero-image-1.jpg',
    imagePosition: '50% 30%',
  },
  {
    id: 'bot-development-automation',
    title: 'Tired of Manual Work? Let a Bot Handle It!',
    excerpt:
      "You're here because you're sick of repetitive tasks. Maybe you're entering raffles, managing e-commerce listings, or scraping data. Let a bot handle the tedious stuff.",
    content:
      "You're here because you're sick of repetitive tasks. Maybe you're entering raffles, managing e-commerce listings, or scraping data. I build custom bots to automate the tedious stuff so you can focus on what actually matters.\n\nWhat I specialize in:\n\n✓ Checkout Bots – Beat the competition and secure your items instantly\n✓ Raffle Entry Bots – Enter thousands of times, effortlessly\n✓ Account Generators – Create bulk accounts with ease\n✓ Web Scrapers & Monitors – Get real-time data without lifting a finger\n✓ Custom Automation – If it's repetitive, I can automate it\n\nWhy work with me? 5+ years of experience building hundreds of automation tools. Optimized for speed & efficiency – No bloated scripts, just results. Flexible Pricing – Fixed-price jobs start at $350 or $30/hr.\n\nSo next time you need a high-performance scraper, a load testing tool, or a real-time data ingestion service, don't count Python out.",
    category: 'Automation',
    date: 'September 15, 2025',
    readTime: '6 min read',
    image: '/assets/recaptcha.gif',
    imagePosition: '50% 50%',
  },
  {
    id: 'web-scraping-ethics',
    title: 'Web Scraping: The Right Way to Extract Data',
    excerpt:
      "Data extraction doesn't have to be complicated. Learn how to build efficient scrapers while respecting website policies and handling rate limits gracefully.",
    content:
      "Data extraction doesn't have to be complicated. Whether you're building a price monitoring tool, gathering market intelligence, or sourcing leads, web scraping is one of the most powerful data collection methods available.\n\nThe key to reliable scraping is understanding the fundamentals: respectful crawling, handling pagination, dealing with JavaScript-rendered content, and managing rate limits. This guide covers it all.\n\nEfficient scraping means respecting the sites you're scraping from. Use appropriate delays, respect robots.txt, and implement proper error handling. When done right, you can build scalable data pipelines that feed your business intelligence without causing problems.\n\nI've built dozens of scrapers across different industries—from real estate listings to ecommerce product data. The principles remain the same: speed, reliability, and respect for the resource.",
    category: 'Data Extraction',
    date: 'August 28, 2025',
    readTime: '10 min read',
    image: '/assets/hero-image-1.jpg',
    imagePosition: '50% 45%',
  },
  {
    id: 'api-orchestration-guide',
    title: 'Mastering API Orchestration: Connect Your Tools',
    excerpt:
      'APIs are everywhere. Learn how to chain together multiple services, handle authentication, and build reliable integration pipelines for your business.',
    content:
      "Modern businesses rely on APIs. Shopify, eBay, Google Maps, Stripe—they all expose APIs that let you build on top of them. But chaining multiple APIs together into a reliable pipeline requires careful planning.\n\nAPI orchestration is about connecting multiple services into a cohesive workflow. You might pull inventory from Shopify, sync it to eBay, check pricing from a third-party service, and log results to a database—all automatically.\n\nKey considerations: Authentication (API keys, OAuth2), Rate limiting and backoff strategies, Error handling and retries, Data transformation and mapping, Logging and monitoring.\n\nI've built integration pipelines that sync data across 5+ platforms seamlessly. The secret is understanding the strengths and limitations of each API, then building orchestration logic that treats them as building blocks in a larger system.",
    category: 'Integration',
    date: 'August 10, 2025',
    readTime: '7 min read',
    image: '/assets/image2%20(1).gif',
    imagePosition: '50% 46%',
  },
  {
    id: 'real-estate-market-analysis',
    title: 'Using Market Intelligence to Beat Competition',
    excerpt:
      'In competitive real estate markets, data wins. Discover how automated market analysis can give you the edge in pricing, timing, and acquisition strategies.',
    content:
      "In competitive real estate markets, information is power. Automated market analysis gives you real-time insights that manual methods simply can't match.\n\nImagine tracking 1,000+ properties simultaneously: watching price changes, monitoring days-on-market, identifying distressed sales, and catching off-market opportunities the moment they appear. This is what data-driven real estate looks like.\n\nKey metrics to track: Price trajectories, Listing duration trends, Neighborhood demographics, Comparable sales (comps), Tax assessment changes.\n\nI've built systems that helped real estate investors identify undervalued properties in hot markets months before their competitors. The edge comes from combining multiple data sources, automating the analysis, and delivering actionable insights in real-time.\n\nWhen you have better information faster, you make better decisions.",
    category: 'Market Intelligence',
    date: 'July 20, 2025',
    readTime: '9 min read',
    image: '/assets/hero-image-1.jpg',
    imagePosition: '50% 40%',
  },
  {
    id: 'ecommerce-automation-trends',
    title: 'eCommerce Automation Trends in 2025',
    excerpt:
      'The eCommerce landscape is evolving rapidly. From inventory sync to dynamic pricing, automation is becoming essential for staying competitive.',
    content:
      "The eCommerce landscape is evolving rapidly. From inventory sync to dynamic pricing, automation is becoming essential for staying competitive. Successful sellers in 2025 are automating everything.\n\nInventory Synchronization: Managing inventory across Shopify, eBay, Amazon, and your own warehouse manually? That's a recipe for overselling and frustrated customers. Automation keeps stock levels in sync across all channels.\n\nDynamic Pricing: Static prices are dead. Top sellers adjust prices based on demand, competition, seasonal trends, and profit margins in real-time.\n\nOrder Fulfillment: Automating order routing, label generation, and tracking updates saves hours every week.\n\nCustomer Intelligence: Track repeat customers, identify profitable segments, and automate marketing based on purchase behavior.\n\nThe sellers who are winning right now are the ones with the best automation infrastructure. It's not about luck—it's about systems.",
    category: 'eCommerce',
    date: 'July 5, 2025',
    readTime: '6 min read',
    image: '/assets/recaptcha.gif',
    imagePosition: '50% 50%',
  },
]

const FEATURED_AUTHORS = [
  {
    name: 'Kudo Chien',
    role: 'Engineering',
    avatar: '/assets/hero-image-1.jpg',
  },
  {
    name: 'Nishan Bende',
    role: 'Engineering',
    avatar: '/assets/recaptcha.gif',
  },
  {
    name: 'Aleksander Mikucki',
    role: 'Engineering',
    avatar: '/assets/image2%20(1).gif',
  },
]

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const featuredPost = BLOG_POSTS[0]
  const gridPosts = BLOG_POSTS.slice(1)

  return (
    <>
      <section className="bg-[#f3f4f6] px-6 py-12 md:px-10 md:py-14">
        <div className="mx-auto max-w-6xl">
          {featuredPost && (
            <ScrollReveal delay={0.05}>
              <div className="mb-8 mt-8 rounded-2xl bg-transparent p-3 transition-colors duration-200 hover:bg-[#e5e7eb] md:p-4">
                <button
                  onClick={() => setSelectedPost(featuredPost)}
                  className="grid w-full items-start gap-5 text-left md:grid-cols-2"
                >
                  <div className="relative h-56 overflow-hidden rounded-xl bg-[#d1d5db] md:h-[336px]">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      style={{
                        objectPosition: featuredPost.imagePosition || 'center',
                      }}
                    />
                  </div>

                  <div className="py-1 pr-1">
                    <p className="text-xs text-[#6b7280]">
                      Product, React Native, Development
                    </p>
                    <h2 className="mt-2 text-[30px] font-semibold leading-[1.12] text-[#111827] md:text-[40px]">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-3 text-base leading-7 text-[#4b5563] line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="mt-4 text-sm text-[#6b7280]">
                      <span>{featuredPost.date}</span>
                      <span className="mx-2">-</span>
                      <span>{featuredPost.readTime}</span>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      {FEATURED_AUTHORS.map((author) => (
                        <div
                          key={author.name}
                          className="flex items-center gap-2"
                        >
                          <div className="relative h-8 w-8 overflow-hidden rounded-full bg-[#d1d5db]">
                            <Image
                              src={author.avatar}
                              alt={author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="leading-tight">
                            <p className="text-sm font-medium text-[#111827]">
                              {author.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </button>
              </div>
            </ScrollReveal>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gridPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={0.1 + index * 0.04}>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="group w-full rounded-2xl bg-transparent p-3 text-left transition-colors duration-200 hover:bg-[#e5e7eb]"
                >
                  <div className="relative h-44 overflow-hidden rounded-xl bg-[#e5e7eb]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ objectPosition: post.imagePosition || 'center' }}
                    />
                  </div>

                  <div className="px-0 pb-2 pt-3">
                    <p className="text-xs text-[#6b7280]">Product</p>
                    <h3 className="mt-2 text-[22px] leading-[1.2] font-semibold text-[#111827] line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-base leading-7 text-[#4b5563]">
                      {post.excerpt}
                    </p>

                    <div className="mt-3 text-sm text-[#6b7280]">
                      <span>{post.date}</span>
                      <span className="mx-2">-</span>
                      <span>{post.readTime}</span>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111827] text-[10px] font-semibold text-white">
                        TJ
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#111827]">
                          TJ Codes
                        </p>
                        <p className="text-xs text-[#6b7280]">Engineering</p>
                      </div>
                    </div>
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPost(null)}
              className="sticky top-4 right-4 z-10 float-right inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 hover:bg-[#f8fafc]"
            >
              <span className="text-2xl text-[#0f172a]">×</span>
            </button>

            {/* Header Image */}
            <div className="relative h-64 w-full overflow-hidden bg-[#f0f9ff] md:h-80">
              <Image
                src={selectedPost.image}
                alt={selectedPost.title}
                fill
                className="object-cover"
                style={{
                  objectPosition: selectedPost.imagePosition || 'center',
                }}
              />
            </div>

            {/* Content */}
            <div className="space-y-6 px-6 py-10 md:px-10 md:py-12">
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 border-b border-[#e2e8f0] pb-6 text-sm">
                <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-[#2563eb]">
                  {selectedPost.category}
                </span>
                <span className="text-[#94a3b8]">{selectedPost.date}</span>
                <span className="text-[#94a3b8]">•</span>
                <span className="text-[#94a3b8]">{selectedPost.readTime}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-bold text-[#0f172a] md:text-5xl">
                {selectedPost.title}
              </h1>

              {/* Body */}
              <div className="space-y-5 text-base leading-7 text-[#475569]">
                {selectedPost.content.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* CTA */}
              <div className="border-t border-[#e2e8f0] pt-8">
                <p className="mb-4 text-sm font-semibold text-[#0f172a]">
                  Want to work on something similar?
                </p>
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-[#1d4ed8]">
                    Get In Touch
                    <span>→</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
