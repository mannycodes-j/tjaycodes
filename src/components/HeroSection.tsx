import { useEffect, useState } from 'react';

export const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="relative z-10 text-white pointer-events-none w-full min-h-screen flex flex-col items-center justify-center">
            {/* Hero Content */}
            <div className="flex flex-col items-center justify-center px-4 -mt-20">
                <div
                    className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        } flex flex-col items-center`}
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium text-center mb-6 tracking-tighter text-white">
                        Antigravity
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 text-center max-w-3xl mx-auto mb-12 font-normal leading-relaxed tracking-wide">
                        A new way to build for the web.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto w-full sm:w-auto">
                        <button className="w-full sm:w-auto px-8 py-3.5 bg-[#1a73e8] text-white rounded-full font-medium text-[16px] hover:bg-[#1557b0] transition-all duration-300 shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2">
                            Get Started
                        </button>
                        <button className="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/10 text-white rounded-full font-medium text-[16px] hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm flex items-center justify-center gap-2">
                            Learn more
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 delay-500 ${isVisible ? 'opacity-50' : 'opacity-0'
                }`}>
                <div className="animate-bounce">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
