export const Footer = () => {
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
                Antigravity
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Releases
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <span className="text-gray-500 text-sm">© 2024 Google</span>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white text-sm transition-colors"
            >
              About Google
            </a>
          </div>

          <div className="flex items-center gap-4">
            <select className="bg-transparent text-gray-500 text-sm border-none focus:ring-0 cursor-pointer hover:text-white transition-colors">
              <option>English (United States)</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};
