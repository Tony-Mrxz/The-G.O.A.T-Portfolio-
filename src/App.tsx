import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Zap, Mail } from 'lucide-react';
import Intro from './components/Intro';
import Showcase from './components/Showcase';
import Contact from './components/Contact';
import ProdexBell from './components/ProdexBell';
import Footer from './components/Footer';

// Persistent Navigation Sidebar
const NavigationSidebar = () => {
    const location = useLocation();

    const navItems = [
        { label: "Intro", path: "/", icon: Home },
        { label: "Showcase", path: "/showcase", icon: Zap },
        { label: "Contact", path: "/contact", icon: Mail },
    ];

    return (
        <motion.div
            className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-8 items-center p-2 bg-white/[0.03] backdrop-blur-3xl border border-white/5 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.4)] z-[9999]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
            {navItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link
                        key={i}
                        to={item.path}
                        className="group relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 hover:bg-white/[0.08] cursor-pointer"
                    >
                        {/* Tooltip */}
                        <div className="absolute right-full mr-6 pointer-events-none">
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
                            <item.icon size={20} strokeWidth={1.5} />
                        </div>

                        {/* Active Indicator */}
                        <div className={`absolute -right-1 w-1.5 h-1.5 rounded-full bg-white transition-all duration-300 ${isActive ? 'scale-100' : 'scale-0'}`} />
                    </Link>
                );
            })}
        </motion.div>
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
    return (
        <BrowserRouter>
            <div className="bg-black min-h-screen text-white flex flex-col">
                <div className="flex-grow">
                    <AnimatedRoutes />
                </div>
                <Footer />
                <NavigationSidebar />
                <ProdexBell />
            </div>
        </BrowserRouter>
    );
};

export default App;
