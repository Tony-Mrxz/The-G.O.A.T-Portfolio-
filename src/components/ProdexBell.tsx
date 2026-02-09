import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, ExternalLink } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';

const ProdexBell = ({ scrollDir, isMobile }: { scrollDir: "up" | "down", isMobile: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed top-6 right-6 md:top-8 md:right-8 z-[10000] flex flex-col items-end gap-4 origin-top-right">
            {/* Bell Trigger */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-[52px] h-[52px] md:w-12 md:h-12 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                initial={false}
                animate={{
                    scale: isOpen ? 0.9 : 1,
                    rotate: 0,
                    y: (isMobile && scrollDir === "down" && !isOpen) ? -100 : 0
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div
                    animate={!isOpen ? {
                        rotate: [0, -15, 12, -10, 8, 0],
                    } : { rotate: 0 }}
                    transition={!isOpen ? {
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                    } : {}}
                >
                    {isOpen ? <X size={20} /> : <Bell size={20} strokeWidth={1.5} />}
                </motion.div>

                {/* Notification Badge */}
                {!isOpen && (
                    <motion.span
                        className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-black"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 }}
                    />
                )}
            </motion.button>

            {/* Info Card */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Invisible Backdrop for click-outside */}
                        <div
                            className="fixed inset-0 z-[-1]"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            className="w-80 max-w-[90vw] p-6 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                            initial={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 overflow-hidden flex items-center justify-center">
                                        <img src="/prodex-studio.png" alt="Prodex Logo" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium tracking-wider text-sm" style={{ fontFamily: "'Kanit', sans-serif" }}>
                                            PRODEX STUDIO
                                        </h3>
                                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em]">Productivity Hub</p>
                                    </div>
                                </div>

                                <p className="text-white/60 text-xs leading-relaxed font-light" style={{ fontFamily: "'Kanit', sans-serif" }}>
                                    Productivity Hub and a Life OS, works as ur second part for organizing things and removing chaos from your life!
                                </p>

                                <a
                                    href="https://prodexstudio.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between p-3 rounded-xl bg-white text-black text-[11px] font-medium uppercase tracking-[0.2em] hover:bg-white/90 transition-colors duration-300"
                                    style={{ fontFamily: "'Kanit', sans-serif" }}
                                >
                                    Try it now
                                    <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProdexBell;
