import Link from 'next/link'

type FooterGroup = {
  title: string
  links: string[]
}

const footerGroups: FooterGroup[] = [
  {
    title: 'Product',
    links: ['Overview', 'Technology', 'Pricing', 'Releases'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API Reference', 'Community', 'Blog'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Security'],
  },
]

const bottomLinks = ['Privacy', 'Terms', 'About Me']

export default function Footer() {
  return (
    <footer className="relative z-10 bg-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-white font-medium text-xl tracking-tight">
                Google
              </span>
              <span className="text-gray-400 font-normal text-xl tracking-tight">
                TjayCodes
              </span>
            </div>
          </div>

          <div className="md:col-span-3 flex items-end justify-end overflow-hidden">
            <h2 className="select-none text-[17vw] md:text-[11vw] font-semibold leading-[0.86] tracking-[-0.03em] text-[#000] mb-6">
              TjayCodes
            </h2>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 mt-10 border-t border-white/10">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <span className="text-gray-500 text-sm">© 2026 </span>
            {bottomLinks.map((label) => (
              <Link
                key={label}
                href="#"
                className="text-gray-500 hover:text-white text-sm transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <select className="bg-transparent text-gray-500 text-sm border-none focus:ring-0 cursor-pointer hover:text-white transition-colors">
              <option>English (United States)</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}
