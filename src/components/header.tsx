import { useState, useEffect, useCallback, type JSX } from "react";
import { cn } from "../lib/utils";
import logo from "../assets/logo.svg";

interface NavItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    label: string;
    icon: JSX.Element | string;
    hasArrow?: boolean;
  }[];
}

const navItems: NavItem[] = [
  { label: "Product", href: "/" },
  {
    label: "Use Cases",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "Professional",
        icon: <span className="material-symbols-outlined">workspaces</span>,
        hasArrow: true,
      },
      {
        label: "Frontend",
        icon: <span className="material-symbols-outlined">code_blocks</span>,
        hasArrow: true,
      },
      {
        label: "Fullstack",
        icon: <span className="material-symbols-outlined">stack</span>,
        hasArrow: true,
      },
    ],
  },
  { label: "Pricing", href: "/services" },
  { label: "Blog", href: "/portfolio" },
  {
    label: "Resources",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "Documentation",
        icon: "",
        hasArrow: true,
      },
      {
        label: "Changelog",
        icon: "",
        hasArrow: true,
      },
      {
        label: "Support",
        icon: "",
        hasArrow: true,
      },
    ],
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setIsVisible(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {/* HEADER — unchanged */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm border-border transition-transform duration-300 ease-in-out",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isMenuOpen ? "border-b" : ""
        )}
      >
        <div className="container mx-auto px-7">
          <div className="flex items-center justify-between py-2">
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" />
            </a>

            {/* Hamburger */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setOpenDropdown(null);
              }}
              className={`relative w-16 h-9 flex items-center justify-center rounded-[18px] focus:outline-none transition-colors duration-300 ease-in-out cursor-pointer ${
                isMenuOpen ? "bg-[#2f3034]" : "hover:bg-[#2122260a]"
              }`}
            >
              <div className="relative w-3 h-2.5 flex flex-col">
                <span
                  className={cn(
                    "absolute left-0 w-3.5 h-[1.5px] rounded-full transition-all duration-300",
                    isMenuOpen
                      ? "top-1/2 -translate-y-1/2 rotate-45 bg-white"
                      : "top-0 bg-[#121317]"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-[1.5px] rounded-full transition-all duration-300",
                    isMenuOpen ? "opacity-0" : "opacity-100 bg-[#121317]"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 w-3.5 h-[1.5px] rounded-full transition-all duration-300",
                    isMenuOpen
                      ? "bottom-1/2 translate-y-1/2 -rotate-45 bg-white"
                      : "bottom-0 bg-[#121317]"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN MOBILE MENU */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white transition-all duration-300",
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="h-full flex flex-col pt-12 overflow-y-auto">
          {navItems.map((item, index) => {
            const isDropdown = item.hasDropdown;
            const isOpen = openDropdown === item.label;

            return (
              <>
                <div key={item.label} className="border-b border-[#e6eaf0]">
                  {!isDropdown && (
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-6 py-5 text-[28px] text-[#121317]"
                      style={{
                        transitionDelay: isMenuOpen ? `${index * 75}ms` : "0ms",
                      }}
                    >
                      {item.label}
                    </a>
                  )}

                  {isDropdown && (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="w-full flex items-center gap-x-2 px-6 py-5 text-[28px] text-[#121317]"
                      >
                        {item.label}
                        <span
                          className={cn(
                            "transition-transform duration-300 material-symbols-outlined",
                            isOpen ? "-rotate-180" : "rotate-0"
                          )}
                        >
                          keyboard_arrow_down
                        </span>
                      </button>
                    </>
                  )}
                </div>

                {/* DROPDOWN */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  {item.dropdownItems?.map((dd) => (
                    <div
                      key={dd.label}
                      className="flex items-center gap-x-1 px-6 py-3 group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 text-[17px] text-[#121317]">
                        {dd.icon}
                        {dd.label}
                      </div>

                      {dd.hasArrow && (
                        <span className="material-symbols-outlined transition-transform duration-300 ease-out group-hover:translate-x-1 text-[#121317]">
                          keyboard_arrow_right
                        </span>
                      )}
                    </div>
                  ))}
                  {item.label === "Use Cases" && (
                    <div className=" flex justify-center items-center bg-[#b7bfd917] border border-transparent rounded-full px-4 py-2 text-[#121317] text-sm font-medium w-fit ml-6 my-2 cursor-pointer hover:bg-[#b7bfd933] transition-colors duration-150 ease-in-out">
                      See overview
                    </div>
                  )}
                </div>
              </>
            );
          })}

          {/* <div className="border-b border-[#e6eaf0]" /> */}
        </nav>
      </div>
    </>
  );
}
