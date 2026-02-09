import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Instagram, ExternalLink, ChevronDown, Linkedin } from 'lucide-react';

const DiscordIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.054-3.03.076.076 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.947 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
    </svg>
);

const MorphingText = ({ initialText, targetText, isHovered }: { initialText: string, targetText: string, isHovered: boolean }) => {
    const [displayText, setDisplayText] = useState(initialText);

    useEffect(() => {
        let frame = 0;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const currentTarget = isHovered ? targetText : initialText;

        let interval = setInterval(() => {
            const result = currentTarget.split('').map((char, i) => {
                if (char === ' ') return ' ';
                if (frame > i * 5) return char;
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');

            setDisplayText(result);

            if (frame > currentTarget.length * 5 + 10) {
                clearInterval(interval);
                setDisplayText(currentTarget);
            }
            frame++;
        }, 20);

        return () => clearInterval(interval);
    }, [isHovered, initialText, targetText]);

    return <span>{displayText}</span>;
}

const Typewriter = ({ text, delay = 0, speed = 15, startTrigger = true, onComplete, skip = false, className = "" }: {
    text: string,
    delay?: number,
    speed?: number,
    startTrigger?: boolean,
    onComplete?: () => void,
    skip?: boolean,
    className?: string
}) => {
    const [displayedText, setDisplayedText] = useState(skip ? text : "");
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        if (skip) {
            setDisplayedText(text);
            onComplete?.();
            return;
        }

        if (startTrigger) {
            const timer = setTimeout(() => setIsStarted(true), delay);
            return () => clearTimeout(timer);
        }
    }, [startTrigger, delay, skip, text, onComplete]);

    useEffect(() => {
        if (!isStarted || skip || displayedText.length >= text.length) return;

        const timeout = setTimeout(() => {
            setDisplayedText(text.slice(0, displayedText.length + 1));
            if (displayedText.length + 1 === text.length) {
                onComplete?.();
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayedText, isStarted, text, speed, skip, onComplete]);

    return (
        <span className={`inline-block relative break-words whitespace-pre-wrap ${className}`}>
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[3px] h-[1.1em] bg-white align-middle ml-1 -mt-1 shadow-[0_0_10px_white]"
            />
        </span>
    );
};

const RoleCard = ({ title, role, desc, link, img }: { title: string, role: string, desc: string, link: string, img: string }) => (
    <div
        className="w-full p-6 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center gap-8 group transition-all duration-300 pointer-events-auto hover:bg-white/[0.07] hover:border-white/20"
    >
        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
            <img src={img} alt={title} className="w-full h-full object-cover opacity-100 transition-opacity duration-500" />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center justify-between gap-6">
                <div className="flex flex-col truncate">
                    <h3 className="text-white font-semibold text-lg tracking-wide truncate" style={{ fontFamily: "'Kanit', sans-serif" }}>{title}</h3>
                    <p className="text-white/30 text-xs uppercase tracking-[0.15em] font-medium" style={{ fontFamily: "'Kanit', sans-serif" }}>{role}</p>
                </div>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:bg-white hover:text-black hover:border-white transition-all duration-300 active:scale-95 flex-shrink-0"
                >
                    <ExternalLink size={16} />
                </a>
            </div>
            <p className="mt-2 text-white/50 text-[13px] leading-relaxed line-clamp-2" style={{ fontFamily: "'Kanit', sans-serif" }}>
                {desc}
            </p>
        </div>
    </div>
);

// Counting Stat Component with hover reset animation
const CountingStat = ({ target, label, suffix = "+", startDelay = 0 }: { target: number, label: string, suffix?: string, startDelay?: number }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    const animateTo = (start: number, end: number, duration: number = 1000) => {
        const startTime = performance.now();
        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);
            setCount(current);
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (!hasAnimated) {
            const timer = setTimeout(() => {
                animateTo(0, target, 1200);
                setHasAnimated(true);
            }, startDelay); // Wait for bar to be visible before counting
            return () => clearTimeout(timer);
        }
    }, [hasAnimated, target, startDelay]);

    const handleHover = () => {
        const halfValue = Math.floor(target / 2);
        setCount(halfValue);
        animateTo(halfValue, target, 600);
    };

    return (
        <motion.div
            className="flex flex-col items-center gap-1 px-4 md:px-8 py-2 md:py-4 cursor-default group"
            onMouseEnter={handleHover}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-baseline gap-1">
                <span
                    className="text-4xl font-light text-white tracking-tight transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    style={{ fontFamily: "'Kanit', sans-serif" }}
                >
                    {count}
                </span>
                <span className="text-2xl text-white/60 font-light">{suffix}</span>
            </div>
            <span
                className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium whitespace-nowrap"
                style={{ fontFamily: "'Kanit', sans-serif" }}
            >
                {label}
            </span>
        </motion.div>
    );
};

const Intro = () => {
    const [show, setShow] = useState(true);
    const [animationPhase, setAnimationPhase] = useState('text-in');
    const [isTitleHovered, setIsTitleHovered] = useState(false);
    const [activeTab, setActiveTab] = useState<'intro' | 'building'>('intro');
    const [hasFinishedTyping, setHasFinishedTyping] = useState(false);
    const [isInitialReveal, setIsInitialReveal] = useState(true);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const timers = [
            setTimeout(() => setAnimationPhase('swipe'), 800), // Faster text exit
            setTimeout(() => setAnimationPhase('card-reveal'), 2000), // Quicker reveal
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    const socialLinks = [
        { icon: Instagram, href: "https://www.instagram.com/musicu.mrxz/", color: "group-hover:text-[#FF0069]", glow: "shadow-[#FF0069]/20" },
        { icon: DiscordIcon, href: "https://discord.com/users/991322990186876928", color: "group-hover:text-[#5865F2]", glow: "shadow-[#5865F2]/20" },
        { icon: Linkedin, href: "https://www.linkedin.com/in/lalith-sai-aratikatla-5b8695390/", color: "group-hover:text-[#0A66C2]", glow: "shadow-[#0A66C2]/20" },
        { icon: Github, href: "https://github.com/Tony-Mrxz", color: "group-hover:text-white", glow: "shadow-white/20" },
    ];


    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="relative min-h-screen bg-black flex flex-col items-center z-[10] overflow-x-hidden transform-gpu will-change-transform"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="relative flex flex-col md:flex-row items-center justify-center w-full min-h-screen mt-0 md:-mt-10 py-24 md:py-0">

                        {/* "Introducing.." Text */}
                        <motion.h1
                            className="text-white text-2xl md:text-3xl font-light tracking-[0.4em] select-none absolute z-20 
                                       top-[35%] -translate-y-1/2 md:translate-y-0 md:top-auto 
                                       w-full text-center md:text-left md:w-auto"
                            style={{ fontFamily: "'Kanit', sans-serif", fontWeight: 300 }}
                            initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
                            animate={
                                animationPhase === 'text-in'
                                    ? { opacity: 1, filter: "blur(0px)", y: isMobile ? -50 : 0 } // Extra offset for vertical center feel on mobile
                                    : { opacity: 0, y: -40, filter: "blur(10px)", transition: { duration: 0.6, ease: "easeInOut" } }
                            }
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Introducing..
                        </motion.h1>

                        {/* Synchronized Identity Reveal */}
                        <motion.div
                            className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-7xl px-4"
                            initial={{ opacity: 0 }}
                            animate={(animationPhase !== 'text-in') ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                className="relative flex flex-col items-center justify-start w-full md:w-[400px] z-10 md:pt-12"
                                animate={
                                    animationPhase === 'card-reveal'
                                        ? { x: isMobile ? 0 : '-26vw' } // Smooth movement to left on desktop only
                                        : { x: 0 }
                                }
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Faster movement
                            >
                                {/* Static Atmospheric Glow: Appears when stable */}
                                <motion.div
                                    className="absolute inset-0 bg-white/5 blur-[80px] md:blur-[120px] rounded-full -z-20"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={animationPhase === 'card-reveal' ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
                                />

                                {/* Enhanced Premium Card Background */}
                                <motion.div
                                    className="absolute bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-3xl border border-white/10 rounded-[2.5rem] -z-10 shadow-[0_0_80px_rgba(255,255,255,0.02)]"
                                    initial={{ width: 0, height: 0, opacity: 0 }}
                                    animate={
                                        animationPhase === 'card-reveal'
                                            ? { width: isMobile ? '90vw' : '400px', height: isMobile ? '520px' : '560px', opacity: 1 }
                                            : { width: 0, height: 0, opacity: 0 }
                                    }
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                />

                                {/* Content Container - Tighter Top Spacing */}
                                <div className="relative flex flex-col items-center justify-start pointer-events-auto w-full pt-[20px]">
                                    {/* Sub-container to maintain equal spacing even when image is circular */}
                                    <div className="relative w-full h-[300px] md:h-[360px] flex items-center justify-center">
                                        <motion.div
                                            className="overflow-hidden border border-white/10 p-2 glass relative z-10 cursor-pointer"
                                            initial={{ scale: 0, filter: "blur(30px)", borderRadius: "100%", width: "200px", height: "200px" }}
                                            animate={
                                                animationPhase !== 'text-in'
                                                    ? { scale: 1, filter: "blur(0px)", borderRadius: "100%", width: isMobile ? "220px" : "270px", height: isMobile ? "220px" : "270px" }
                                                    : { scale: 0, filter: "blur(30px)", borderRadius: "100%", width: isMobile ? "200px" : "270px", height: isMobile ? "200px" : "270px" }
                                            }
                                            whileHover={{
                                                borderRadius: "2rem",
                                                width: isMobile ? "260px" : "360px",
                                                height: isMobile ? "260px" : "360px",
                                                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                                            }}
                                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <motion.div
                                                className="w-full h-full overflow-hidden"
                                                initial={{ borderRadius: "100%" }}
                                                whileHover={{ borderRadius: "1.5rem" }}
                                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                <img
                                                    src="/lalith.png"
                                                    alt="User Identity"
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>
                                        </motion.div>
                                    </div>

                                    {/* Identity Section: Divider, Animated Title & Subtitle */}
                                    <div className="flex flex-col items-center w-full px-8 md:px-12 mt-4 md:mt-8 select-none">
                                        {/* Divider Line */}
                                        <motion.div
                                            className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            initial={{ scaleX: 0, opacity: 0 }}
                                            animate={animationPhase === 'card-reveal' ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                                            transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
                                        />

                                        {/* Name / Title with Morph Effect */}
                                        <motion.div
                                            className="mt-4 mb-2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={animationPhase === 'card-reveal' ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                                            onMouseEnter={() => setIsTitleHovered(true)}
                                            onMouseLeave={() => setIsTitleHovered(false)}
                                        >
                                            <h2
                                                className="text-white text-3xl md:text-4xl font-light tracking-wider cursor-default"
                                                style={{ fontFamily: "'Kanit', sans-serif", fontWeight: 300 }}
                                            >
                                                <MorphingText
                                                    initialText="Lalith"
                                                    targetText="Tony"
                                                    isHovered={isTitleHovered}
                                                />
                                            </h2>
                                        </motion.div>

                                        {/* Subtitle */}
                                        <motion.p
                                            className="text-white/40 text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-center"
                                            style={{ fontFamily: "'Kanit', sans-serif" }}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={animationPhase === 'card-reveal' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                            transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
                                        >
                                            Creative Technologist
                                        </motion.p>
                                        <motion.div
                                            className="flex flex-col items-center gap-4 mt-2"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={animationPhase === 'card-reveal' ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                                            transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
                                        >
                                            <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/10 flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                                                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full overflow-hidden border border-white/10 bg-black shrink-0">
                                                    <img src="/mrxz.png" alt="Mrxz Logo" className="w-full h-full object-cover" />
                                                </div>
                                                <span
                                                    className="text-white/40 text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-medium whitespace-nowrap"
                                                    style={{ fontFamily: "'Kanit', sans-serif" }}
                                                >
                                                    Mrxz IOT Development Founder & CEO
                                                </span>
                                            </div>
                                        </motion.div>

                                        {/* Mobile Social Links: Inline below founder container */}
                                        {isMobile && (
                                            <motion.div
                                                className="flex flex-row gap-6 mt-6 items-center"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={animationPhase === 'card-reveal' ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                                transition={{ duration: 0.5, delay: 1.3 }}
                                            >
                                                {socialLinks.map((social, i) => (
                                                    <motion.a
                                                        key={i}
                                                        href={social.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`text-white/40 transition-all duration-300 hover:scale-110 ${social.color}`}
                                                    >
                                                        <social.icon size={20} />
                                                    </motion.a>
                                                ))}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Elite Social Toolbar: Desktop only, hidden on mobile */}
                                <motion.div
                                    className="absolute md:right-full md:top-[100px] md:-mr-4 
                                               hidden md:flex flex-col gap-9 items-center p-5 
                                               bg-white/[0.05] backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.4)] -z-20"
                                    initial={{ opacity: 0, x: 60 }}
                                    animate={animationPhase === 'card-reveal' ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 1.2,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                >
                                    {socialLinks.map((social, i) => (
                                        <motion.a
                                            key={i}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={animationPhase === 'card-reveal' ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                                            transition={{ duration: 0.3, delay: 1.4 + (i * 0.08) }}
                                            className={`text-white/40 transition-all duration-500 hover:scale-125 group relative`}
                                        >
                                            <div className={`absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full ${social.glow}`} />
                                            <div className={`relative z-10 ${social.color} transition-colors duration-500`}>
                                                <social.icon size={20} className="md:w-[22px] md:h-[22px]" />
                                            </div>
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </motion.div>

                        </motion.div>



                        {/* Biography / Roles Section: Appears to the right of the card on Desktop, Below on Mobile */}
                        <motion.div
                            className="relative md:absolute md:left-[50%] md:top-[100px] 
                                       w-[85%] md:w-[500px] mx-auto md:mx-0 md:-ml-8 mt-24 md:mt-0
                                       pointer-events-none select-none flex flex-col items-center md:items-start text-center md:text-left"
                            initial={{ opacity: 0, x: 50 }}
                            animate={
                                animationPhase === 'card-reveal'
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: 50 }
                            }
                            transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
                        >
                            <div className={`relative pointer-events-auto flex flex-col ${isMobile ? 'h-auto' : 'h-[320px]'} order-last md:order-first w-full`}>
                                <AnimatePresence mode="wait">
                                    {activeTab === 'intro' ? (
                                        <motion.div
                                            key="intro-content"
                                            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                            className="text-white/80 text-base md:text-xl leading-relaxed font-light tracking-wide space-y-6 pt-2 break-words w-full"
                                            style={{ fontFamily: "'Kanit', sans-serif", fontWeight: 300, textShadow: '0 0 40px rgba(255,255,255,0.05)' }}
                                        >
                                            <Typewriter
                                                text="Hey! I'm Lalith. A multi-skilled human, basically a one-man army. I design professional graphics, build scalable websites, and train/deploy full-stack AI solutions. I'm also proficient in entry-level ethical hacking and system defense—ready for any technical challenge."
                                                delay={400}
                                                startTrigger={animationPhase === 'card-reveal'}
                                                skip={hasFinishedTyping}
                                                onComplete={() => setHasFinishedTyping(true)}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="building-content"
                                            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                            exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                            className="flex flex-col gap-4 w-full pt-4"
                                        >
                                            <RoleCard
                                                title="Prodex Studio"
                                                role="Founder and CEO"
                                                desc="Productivity Hub and a Life OS. Perfect software to organize things and break the chaos."
                                                link="https://prodexstudio.in"
                                                img="prodex-studio.png"
                                            />
                                            <RoleCard
                                                title="NextraForge"
                                                role="Co-founder"
                                                desc="IoT Development Team. Web development, Automations, AI bots."
                                                link="https://nextraforge.xyz"
                                                img="nextra.webp"
                                            />
                                            <RoleCard
                                                title="InnerHue.org"
                                                role="Technical Assistant"
                                                desc="Charity Ngo. Helping and encouraging the orphan and dependent kids."
                                                link="https://www.instagram.com/innerhue.org_"
                                                img="innerhue.jpg"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Stats Bar - Relative on Mobile, Absolute on Desktop */}
                                {activeTab === 'intro' && (
                                    <motion.div
                                        className={`${isMobile ? 'relative mt-8 mb-4 scale-90 origin-top w-full' : 'absolute bottom-[-80px] w-auto'} left-0 right-0 flex items-center justify-center gap-2 p-2 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/5`}
                                        initial={isInitialReveal ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: isInitialReveal ? 3.0 : 0 }}
                                        onAnimationComplete={() => {
                                            if (isInitialReveal) setIsInitialReveal(false);
                                        }}
                                    >
                                        <CountingStat target={6} label="Years Exp" startDelay={isInitialReveal ? 3200 : 0} />
                                        <div className="w-px h-12 bg-white/10" />
                                        <CountingStat target={50} label="Clients" startDelay={isInitialReveal ? 3400 : 0} />
                                        <div className="w-px h-12 bg-white/10" />
                                        <CountingStat target={70} label="Projects" startDelay={isInitialReveal ? 3600 : 0} />
                                    </motion.div>
                                )}
                            </div>

                            {/* Premium Tab Toggle Bar: Locked at mt-52 position */}
                            <motion.div
                                className="md:mt-52 mt-6 mb-8 md:mb-0 flex flex-col items-center gap-4 w-full pointer-events-auto order-first md:order-last"
                                initial={{ opacity: 0, y: 20 }}
                                animate={animationPhase === 'card-reveal' ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 2.0, ease: "easeOut" }}
                            >
                                <div className="p-1.5 px-1.5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 flex items-center gap-1.5">
                                    <button
                                        onClick={() => setActiveTab('intro')}
                                        className={`px-10 py-3.5 rounded-xl text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-500 ${activeTab === 'intro'
                                            ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.15)]'
                                            : 'text-white/30 hover:text-white/60'
                                            }`}
                                        style={{ fontFamily: "'Kanit', sans-serif" }}
                                    >
                                        Intro
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('building')}
                                        className={`px-10 py-3.5 rounded-xl text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-500 ${activeTab === 'building'
                                            ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.15)]'
                                            : 'text-white/30 hover:text-white/60'
                                            }`}
                                        style={{ fontFamily: "'Kanit', sans-serif" }}
                                    >
                                        What I'm Building
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:60px_60px]" />
                </motion.div >
            )}
        </AnimatePresence >
    );
};

export default Intro;
