import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "Lightning Fast",
    description: "Built on a Rust-based core for unparalleled performance.",
    icon: (
      <svg
        className="w-6 h-6 text-yellow-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    colSpan: "col-span-1 md:col-span-2",
    bg: "bg-gradient-to-br from-gray-900 to-gray-800",
  },
  {
    title: "AI Native",
    description:
      "Deeply integrated LLMs that understand your entire codebase context.",
    icon: (
      <svg
        className="w-6 h-6 text-purple-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    colSpan: "col-span-1",
    bg: "bg-gradient-to-br from-indigo-900/50 to-purple-900/50",
  },
  {
    title: "Real-time Collaboration",
    description:
      "Code with your team as if you were in the same room. Zero latency sync.",
    icon: (
      <svg
        className="w-6 h-6 text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    colSpan: "col-span-1",
    bg: "bg-gradient-to-br from-blue-900/50 to-cyan-900/50",
  },
  {
    title: "Universal Deploy",
    description:
      "Deploy to any cloud provider with a single click. No configuration hell.",
    icon: (
      <svg
        className="w-6 h-6 text-green-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
    ),
    colSpan: "col-span-1 md:col-span-2",
    bg: "bg-gradient-to-br from-gray-900 to-gray-800",
  },
];

export const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative z-10 py-24 px-4 max-w-7xl mx-auto"
    >
      <div
        className={`transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        }`}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
            Everything you need to ship.
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.colSpan} relative group overflow-hidden rounded-3xl border border-white/10 p-8 backdrop-blur-sm hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${feature.bg}`}
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-6 p-3 bg-white/5 w-fit rounded-2xl border border-white/10 backdrop-blur-md">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
