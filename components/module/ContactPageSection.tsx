'use client'

import OrbitNetworkBackground from '@/components/common/OrbitNetworkBackground'

export default function ContactPageSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-20 pt-20 md:px-10">
      <OrbitNetworkBackground />

      <div className="relative mx-auto max-w-6xl rounded-4xl bg-white/92 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.16),inset_0_0_0_1px_rgba(147,197,253,0.45)] backdrop-blur md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-[#1d4ed8] shadow-[inset_0_0_0_1px_rgba(29,78,216,0.24)]">
              LET&apos;S BUILD THE UNREAL
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#1e40af] md:text-6xl">
              Contact Us
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#334155]">
              Share what you are building and I will get back with practical
              next steps. This form is built for real projects, not generic
              replies.
            </p>

            <form className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-semibold text-[#2563eb]">
                  *First Name
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    className="h-12 rounded-none border border-[#93c5fd] bg-white px-3 text-[#0f172a] outline-none transition focus:border-[#1d4ed8]"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-semibold text-[#2563eb]">
                  *Last Name
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    className="h-12 rounded-none border border-[#93c5fd] bg-white px-3 text-[#0f172a] outline-none transition focus:border-[#1d4ed8]"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2 text-sm font-semibold text-[#2563eb]">
                *Business Email
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="h-12 rounded-none border border-[#93c5fd] bg-white px-3 text-[#0f172a] outline-none transition focus:border-[#1d4ed8]"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-[#2563eb]">
                *Website You Need Data From
                <input
                  type="url"
                  name="targetWebsite"
                  placeholder="https://example.com"
                  className="h-12 rounded-none border border-[#93c5fd] bg-white px-3 text-[#0f172a] outline-none transition focus:border-[#1d4ed8]"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-[#2563eb]">
                Tell us about your project
                <textarea
                  name="message"
                  rows={6}
                  placeholder="What do you need automated?"
                  className="rounded-none border border-[#93c5fd] bg-white p-3 text-[#0f172a] outline-none transition focus:border-[#1d4ed8]"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-[#2563eb]">
                *Please Describe the Data You Need From the Website or the Help
                You Need
                <textarea
                  name="dataOrHelpRequest"
                  rows={6}
                  placeholder="Example: product title, price, stock status, and daily changes. Also need automation for scheduled exports."
                  className="rounded-none border border-[#93c5fd] bg-white p-3 text-[#0f172a] outline-none transition focus:border-[#1d4ed8]"
                />
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-2 border border-[#2563eb] bg-[#2563eb] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#1d4ed8]"
              >
                Submit
                <span aria-hidden="true">→</span>
              </button>
            </form>
          </div>

          <aside className="relative min-h-[460px] overflow-hidden rounded-3xl border border-[#93c5fd] bg-white/95 shadow-[inset_0_0_0_1px_rgba(147,197,253,0.28)]">
            <OrbitNetworkBackground variant="panel" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(240,212,106,0.24),transparent_32%)]" />

            <div className="absolute right-4 top-1/2 z-20 -translate-y-1/2">
              <p className="mb-3 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-[#2563eb]">
                Socials
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#93c5fd] bg-white text-[#1d4ed8] shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition hover:bg-[#eff6ff]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M14.5 3c.3 1.8 1.2 3.1 2.8 3.9 1 .5 2 .7 3 .7v2.8c-1 0-2-.2-3-.6-.9-.3-1.8-.8-2.6-1.4v6.4c0 1.6-.5 2.9-1.5 3.9s-2.3 1.5-3.9 1.5c-1.3 0-2.4-.4-3.4-1.2-1.2-1-1.8-2.2-1.8-3.8 0-1.5.6-2.8 1.8-3.8 1-.8 2.2-1.2 3.6-1.2.2 0 .5 0 .8.1V14c-.3-.1-.5-.1-.8-.1-.7 0-1.3.2-1.8.6-.7.5-1 1.2-1 2s.3 1.5 1 2c.5.4 1.1.6 1.8.6.8 0 1.5-.3 2.1-.9.5-.5.8-1.2.8-2.1V3h2.9z" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#93c5fd] bg-white text-[#1d4ed8] shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition hover:bg-[#eff6ff]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M6.9 8.4c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zM5.4 9.8h3v8.8h-3V9.8zm4.8 0H13v1.2h.1c.4-.8 1.4-1.5 2.8-1.5 3 0 3.5 2 3.5 4.5v4.6h-3v-4.1c0-1-.1-2.2-1.4-2.2s-1.6 1.1-1.6 2.1v4.2h-3V9.8z" />
                  </svg>
                </a>

                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#93c5fd] bg-white text-[#1d4ed8] shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition hover:bg-[#eff6ff]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M21.8 8.6c-.2-1-.9-1.7-1.9-1.9C18.1 6.3 12 6.3 12 6.3s-6.1 0-7.9.4c-1 .2-1.7.9-1.9 1.9C1.8 10.4 1.8 12 1.8 12s0 1.6.4 3.4c.2 1 .9 1.7 1.9 1.9 1.8.4 7.9.4 7.9.4s6.1 0 7.9-.4c1-.2 1.7-.9 1.9-1.9.4-1.8.4-3.4.4-3.4s0-1.6-.4-3.4zM10.1 14.9V9.1l5 2.9-5 2.9z" />
                  </svg>
                </a>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#93c5fd] bg-white text-[#1d4ed8] shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition hover:bg-[#eff6ff]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M18.2 3h2.9l-6.4 7.3L22 21h-5.7l-4.5-5.9L6.6 21H3.7l6.8-7.8L2 3h5.8l4 5.3L18.2 3zm-1 16.3h1.6L7.6 4.6H5.9l11.3 14.7z" />
                  </svg>
                </a>

                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Discord"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#93c5fd] bg-white text-[#1d4ed8] shadow-[0_8px_18px_rgba(15,23,42,0.12)] transition hover:bg-[#eff6ff]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M20 5.2a16 16 0 0 0-4-1.2l-.2.4c1.5.4 2.3 1 2.3 1s-1.9-1-5.8-1-5.8 1-5.8 1 .8-.6 2.3-1L8.6 4A16 16 0 0 0 4.6 5.2C2 9 1.3 12.8 1.3 12.8a16.7 16.7 0 0 0 4.9 2.5l1.1-1.8c-1-.3-1.4-.7-1.4-.7.1 0 .2.1.2.1 2.3 1 4.7 1 6 1h.1c1.3 0 3.7 0 6-1 0 0 .1 0 .2-.1 0 0-.4.4-1.4.7l1.1 1.8a16.7 16.7 0 0 0 4.9-2.5S22 9 20 5.2zM9.7 12.2c-.8 0-1.4-.7-1.4-1.6 0-.9.6-1.6 1.4-1.6s1.4.7 1.4 1.6c0 .9-.6 1.6-1.4 1.6zm4.6 0c-.8 0-1.4-.7-1.4-1.6 0-.9.6-1.6 1.4-1.6s1.4.7 1.4 1.6c0 .9-.6 1.6-1.4 1.6z" />
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
