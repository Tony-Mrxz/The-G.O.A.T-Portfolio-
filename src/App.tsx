import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Zap, Mail } from 'lucide-react';
import Intro from './components/Intro';
import Showcase from './components/Showcase';
import Contact from './components/Contact';
import ProdexBell from './components/ProdexBell';
import Footer from './components/Footer';
import { useScrollDirection } from './hooks/useScrollDirection';

// Persistent Navigation Sidebar (Vertical on desktop, Horizontal on mobile)
const NavigationSidebar = ({ scrollDir, isMobile }: { scrollDir: "up" | "down", isMobile: boolean }) => {
    const location = useLocation();

    const navItems = [
        { label: "Intro", path: "/", icon: Home },
        { label: "Showcase", path: "/showcase", icon: Zap },
        { label: "Contact", path: "/contact", icon: Mail },
    ];


    return (
        /* Wrapper for positioning - handles layout to avoid transform conflicts */
        <div className="fixed z-[9999] pointer-events-none
                        top-6 left-0 w-full flex justify-center
                        md:top-1/2 md:right-8 md:left-auto md:w-auto md:block md:-translate-y-1/2">
            <motion.div
                className="pointer-events-auto flex flex-row gap-4 p-1.5 items-center
                           md:flex-col md:gap-8 md:p-2
                           bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.4)]"
                initial={{ opacity: 0, y: -20 }}
                animate={{
                    opacity: 1,
                    y: (isMobile && scrollDir === "down") ? -100 : 0
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                {navItems.map((item, i) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={i}
                            to={item.path}
                            className="group relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl transition-all duration-300 hover:bg-white/[0.08] cursor-pointer"
                        >
                            {/* Tooltip - Only visible on desktop */}
                            <div className="hidden md:block absolute right-full mr-6 pointer-events-none">
                                <div className="opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[0.22,1,0.36,1]">
                                    <div className="px-5 py-2.5 rounded-xl bg-white/[0.08] backdrop-blur-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                                        <span
                                            className="text-white text-[11px] uppercase tracking-[0.25em] font-medium whitespace-nowrap"
                                            style={{ fontFamily: "'Kanit', sans-serif" }}
                                        >
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Icon */}
                            <div className={`transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white'}`}>
                                <item.icon size={18} className="md:w-5 md:h-5" strokeWidth={1.5} />
                            </div>

                            {/* Active Indicator - Bottom on mobile, Right on desktop */}
                            <div className={`absolute -bottom-0.5 md:bottom-auto md:-right-1 md:top-1/2 md:-translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white transition-all duration-300 ${isActive ? 'scale-100' : 'scale-0'}`} />
                        </Link>
                    );
                })
                }
            </motion.div >
        </div >
    );
};

// Animated Routes Wrapper
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Intro />} />
                <Route path="/showcase" element={<Showcase />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    const scrollDir = useScrollDirection();
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <BrowserRouter>
            <div className="bg-black min-h-screen text-white flex flex-col">
                <div className="flex-grow">
                    <AnimatedRoutes />
                </div>
                <Footer />
                <NavigationSidebar scrollDir={scrollDir} isMobile={isMobile} />
                <ProdexBell scrollDir={scrollDir} isMobile={isMobile} />
            </div>
        </BrowserRouter>
    );
};

export default App;
