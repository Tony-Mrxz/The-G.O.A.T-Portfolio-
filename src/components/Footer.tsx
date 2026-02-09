import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            className="w-full py-12 px-8 md:px-16 lg:px-32 border-t border-white/5 bg-white/[0.01] backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span
                        className="text-white/60 text-[11px] uppercase tracking-[0.3em] font-medium"
                        style={{ fontFamily: "'Kanit', sans-serif" }}
                    >
                        © 2026 Mrxz
                    </span>
                    <span
                        className="text-white/20 text-[9px] uppercase tracking-[0.2em]"
                        style={{ fontFamily: "'Kanit', sans-serif" }}
                    >
                        Creative Technologist & System Designer
                    </span>
                </div>

                <div className="h-px w-12 bg-white/10 hidden md:block" />

                <div className="flex flex-col items-center md:items-end gap-2">
                    <span
                        className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-light"
                        style={{ fontFamily: "'Kanit', sans-serif" }}
                    >
                        Built with <span className="text-white/60">Elite Precision</span>
                    </span>
                    <span
                        className="text-white/60 text-[28px] font-light"
                        style={{ fontFamily: "'Bonheur Royale', cursive" }}
                    >
                        Lalith
                    </span>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
