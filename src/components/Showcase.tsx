import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Globe, Cpu, ExternalLink } from 'lucide-react';

// Elite Section Header with Category Tabs
const SectionHeader = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (tab: 'designs' | 'websites' | 'software') => void }) => {
    const categories = [
        { id: 'designs', label: 'Designs', icon: Palette },
        { id: 'websites', label: 'Websites', icon: Globe },
        { id: 'software', label: 'Software / AI', icon: Cpu },
    ];

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex items-center gap-6">
                {categories.map((cat) => {
                    const isActive = activeTab === cat.id;
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => onTabChange(cat.id as any)}
                            className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 ${isActive
                                ? 'bg-white/[0.08] border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.05)]'
                                : 'bg-transparent border-transparent hover:bg-white/[0.03]'
                                } border`}
                        >
                            <Icon
                                size={20}
                                className={`transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}
                                strokeWidth={1.5}
                            />
                            <span
                                className={`text-sm uppercase tracking-[0.2em] font-medium transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                                    }`}
                                style={{ fontFamily: "'Kanit', sans-serif" }}
                            >
                                {cat.label}
                            </span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 rounded-2xl border border-white/20"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

// Elite Card Component
const ShowcaseCard = ({ title, desc, link, img, delay }: { title: string, desc: string, link: string, img: string, delay: number }) => {
    const isClickable = link && link !== "#" && link !== "";

    return (
        <motion.a
            href={isClickable ? link : undefined}
            target={isClickable ? "_blank" : undefined}
            rel={isClickable ? "noopener noreferrer" : undefined}
            className={`group relative block overflow-hidden rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/5 transition-all duration-500 ${isClickable ? "hover:border-white/15 cursor-pointer" : "cursor-default"
                }`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
            whileHover={isClickable ? { y: -5 } : {}}
            style={{ pointerEvents: isClickable ? 'auto' : 'none' }}
        >
            <div className="aspect-video w-full overflow-hidden bg-black/20">
                <img
                    src={img}
                    alt={title}
                    className={`w-full h-full object-cover transition-all duration-700 ${isClickable ? "opacity-70 group-hover:opacity-100 group-hover:scale-105" : "opacity-70"
                        }`}
                />
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <h3
                        className="text-lg text-white font-medium tracking-wide"
                        style={{ fontFamily: "'Kanit', sans-serif" }}
                    >
                        {title}
                    </h3>
                    {isClickable && (
                        <ExternalLink size={16} className="text-white/30 group-hover:text-white transition-colors duration-300" />
                    )}
                </div>
                {desc && (
                    <p
                        className="text-white/40 text-sm leading-relaxed line-clamp-2"
                        style={{ fontFamily: "'Kanit', sans-serif" }}
                    >
                        {desc}
                    </p>
                )}
            </div>
            {isClickable && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t from-white/[0.03] to-transparent" />
            )}
        </motion.a>
    );
};

const Showcase = () => {
    const [activeCategory, setActiveCategory] = React.useState<'designs' | 'websites' | 'software'>('designs');

    const content = {
        designs: [
            { title: "WHO WAS I", desc: "A narrative-driven visual exploration of identity and transition.", link: "/Designs/WHO WAS I.png", img: "/Designs/WHO WAS I.png" },
            { title: "astra", desc: "Sleek, futuristic motion branding for AI-powered systems.", link: "/Designs/astra.gif", img: "/Designs/astra.gif" },
            { title: "auxin circle", desc: "Minimalist geometry focusing on organic flow and balance.", link: "/Designs/auxin circle.png", img: "/Designs/auxin circle.png" },
            { title: "auxin", desc: "Signature branding reflecting high-performance digital architecture.", link: "/Designs/auxin.png", img: "/Designs/auxin.png" },
            { title: "bmw g87 m2-ks", desc: "High-octane automotive visualization with custom livery design.", link: "/Designs/bmw g87 m2-ks.png", img: "/Designs/bmw g87 m2-ks.png" },
            { title: "bmw", desc: "Sleek automotive aesthetics highlighting precision engineering.", link: "/Designs/bmw.png", img: "/Designs/bmw.png" },
            { title: "charles", desc: "Character-focused portrait with expressive lighting and depth.", link: "/Designs/charles.png", img: "/Designs/charles.png" },
            { title: "connect", desc: "Abstract motion piece exploring digital connectivity and nodes.", link: "/Designs/connect.gif", img: "/Designs/connect.gif" },
            { title: "d (6)", desc: "Hyper-localized geometric pattern with intricate detailing.", link: "/Designs/d (6).png", img: "/Designs/d (6).png" },
            { title: "ferrari", desc: "Iconic supercar study with dramatic lighting and reflections.", link: "/Designs/ferrari.jpg", img: "/Designs/ferrari.jpg" },
            { title: "ferrari red", desc: "Pure speed captured through vibrant colors and aero lines.", link: "/Designs/ferrari.png", img: "/Designs/ferrari.png" },
            { title: "gfalcon", desc: "Bold, aggressive branding concept for aerospace technology.", link: "/Designs/gfalcon.png", img: "/Designs/gfalcon.png" },
            { title: "hyper vrs", desc: "Modern studio branding with a focus on virtual reality.", link: "/Designs/hyper vrs thumbnail 3.png", img: "/Designs/hyper vrs thumbnail 3.png" },
            { title: "hypervrs studios", desc: "Flagship studio identity and production-ready graphics.", link: "/Designs/hypervrs studios.png", img: "/Designs/hypervrs studios.png" },
            { title: "hypervrs thumbnail", desc: "Digital asset designed for high-impact social media presence.", link: "/Designs/hypervrs thumbnail.png", img: "/Designs/hypervrs thumbnail.png" },
            { title: "hypervrs", desc: "Minimalist studio logo emphasizing clarity and scale.", link: "/Designs/hypervrs.png", img: "/Designs/hypervrs.png" },
            { title: "mercedes", desc: "Luxury automotive visualization focusing on form and shadow.", link: "/Designs/mercedes.png", img: "/Designs/mercedes.png" },
            { title: "namaha", desc: "Spiritual and traditional motifs integrated into modern design.", link: "/Designs/namaha.png", img: "/Designs/namaha.png" },
            { title: "porsche", desc: "A timeless automotive classic rendered in high-end fidelity.", link: "/Designs/porsche .png", img: "/Designs/porsche .png" },
            { title: "porsche 2", desc: "Exploring the curves and aerodynamics of high-performance racing.", link: "/Designs/porsche 2.png", img: "/Designs/porsche 2.png" },
            { title: "porsche 3", desc: "Moody, atmospheric study of automotive design language.", link: "/Designs/porsche 3.png", img: "/Designs/porsche 3.png" },
            { title: "poster 1", desc: "Bold typography and layout for event-based visual impact.", link: "/Designs/poster 1.png", img: "/Designs/poster 1.png" },
            { title: "poster 2", desc: "Experimental composition exploring color theory and depth.", link: "/Designs/poster 2.png", img: "/Designs/poster 2.png" },
            { title: "soul devs", desc: "Custom branding for development teams with a creative edge.", link: "/Designs/soul devs.png", img: "/Designs/soul devs.png" },
            { title: "soya", desc: "Clean branding concept for sustainable food production.", link: "/Designs/soya.png", img: "/Designs/soya.png" },
            { title: "tala beats", desc: "Vibrant cover art for music production and audio engineering.", link: "/Designs/tala beats.png", img: "/Designs/tala beats.png" },
            { title: "thumbnail 1", desc: "Custom social media graphics for high-engagement content.", link: "/Designs/thumbnail 1.png", img: "/Designs/thumbnail 1.png" },
            { title: "thumbnail 2", desc: "Visual storytelling through condensed, impactful graphics.", link: "/Designs/thumbnail 2.png", img: "/Designs/thumbnail 2.png" },
            { title: "thumbnail 4", desc: "Bold composition designed for maximum digital visibility.", link: "/Designs/thumbnail 4.png", img: "/Designs/thumbnail 4.png" },
            { title: "thumbnail", desc: "Signature thumbnail style for consistent branding.", link: "/Designs/thumbnail.png", img: "/Designs/thumbnail.png" },
        ],
        websites: [
            { title: "Prodex Studio", desc: "Productivity Hub and a Life OS for creators.", link: "https://prodexstudio.in", img: "/prodex-studio.png" },
            { title: "Mrxz", desc: "Digital portfolio and creative hub.", link: "https://cybmrxz.netlify.app", img: "/mrxz.png" },
            { title: "Hyperverse", desc: "Creative studio and production house.", link: "https://www.hyperversestudios.in", img: "/Designs/hypervrs.png" },
            { title: "NextraForge", desc: "IoT Development Team. Web, Automations, AI.", link: "https://nextraforge.xyz", img: "/nextra.webp" },
        ],
        software: [
            { title: "Prodex Studio", desc: "Productivity Hub and a Life OS for creators.", link: "https://prodexstudio.in", img: "/prodex-studio.png" },
            { title: "Connect", desc: "Premium match-making Discord bot for intelligent communities.", link: "https://discord.com/oauth2/authorize?client_id=1271770172641775636", img: "/Designs/connect.gif" },
            { title: "Mrxz Discord Bot", desc: "Advanced Discord integration and automated server management.", link: "https://dsc.gg/mrxz", img: "/mrxz.png" },
            { title: "Auxin", desc: "A privacy-focused, high-performance web browser concept.", link: "", img: "/Designs/auxin.png" },
            { title: "Bracelet Mouse", desc: "Innovative wearable hardware concept for seamless gesture control.", link: "", img: "https://placehold.co/600x400/1a1a1a/333?text=Bracelet+Mouse" },
            { title: "Astra AI", desc: "Automated, powerful voice assistant for PC productivity.", link: "", img: "/Designs/astra.gif" },
        ]
    };

    return (
        <motion.div
            className="min-h-screen bg-black text-white pt-16 pb-24 px-8 md:px-16 lg:px-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Reduced Page Title */}
                <motion.h1
                    className="text-2xl md:text-3xl text-white/90 font-light tracking-[0.3em] uppercase mb-12 text-center"
                    style={{ fontFamily: "'Kanit', sans-serif" }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    Showcase
                </motion.h1>

                {/* Section Header with Tabs */}
                <SectionHeader activeTab={activeCategory} onTabChange={setActiveCategory} />

                {/* Conditional Content Rendering */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {content[activeCategory].map((item, i) => (
                            <ShowcaseCard key={i} {...item} delay={i * 0.05} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Showcase;
