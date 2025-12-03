import { useState, useEffect } from 'react';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer">
                    <span className="text-white font-medium text-[22px] tracking-tight">Google</span>
                    <span className="text-gray-400 font-normal text-[22px] tracking-tight">Antigravity</span>
                </div>

                <div className="hidden md:flex items-center gap-10">
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-[15px] font-medium tracking-wide">Overview</a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-[15px] font-medium tracking-wide">Technology</a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-[15px] font-medium tracking-wide">Research</a>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-[15px] font-medium tracking-wide">Team</a>
                </div>

                <div className="flex items-center gap-4">
                    <button className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-[#1a73e8] hover:bg-[#1557b0] text-white rounded-full text-[15px] font-medium transition-all duration-300">
                        Explore
                    </button>
                </div>
            </div>
        </nav>
    );
};
