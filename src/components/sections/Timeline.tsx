"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TIMELINE, TimelineItem as TimelineType } from "@/content/timeline";

export default function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Elegant scroll-driven laser spine progress
    // Spans the middle 80% of the section scroll space
    const laserProgress = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
    const laserScaleY = useSpring(laserProgress, {
        stiffness: 80,
        damping: 25,
    });

    const activeItem = TIMELINE[activeIndex];

    return (
        <section
            id="timeline"
            ref={containerRef}
            className="py-32 md:py-48 px-6 bg-background relative overflow-hidden transition-colors duration-1000"
        >
            {/* Ambient Background Grid lines */}
            <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
                    backgroundSize: "60px 60px"
                }}
            />

            {/* ── ATMOSPHERIC THEME BLOOMS ── 
                As the user scrolls through each era, a giant, slow-pulsing cosmic nebula
                glows behind the active node with the signature color of that year. */}
            <AnimatePresence mode="wait">
                {activeItem && (
                    <motion.div
                        key={activeItem.sysNode}
                        className="absolute inset-0 pointer-events-none z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] rounded-full opacity-[0.15] dark:opacity-40 transition-colors duration-1000 will-change-transform mix-blend-multiply dark:mix-blend-screen"
                            style={{
                                background: `radial-gradient(circle, ${activeItem.accentColor}66 0%, ${activeItem.accentColor}20 40%, transparent 70%)`
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-24 md:mb-36 text-center">
                    <motion.span
                        className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-foreground/30 mb-4 block"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Engineering Log
                    </motion.span>
                    <motion.h2
                        className="text-4xl md:text-6xl font-display font-medium tracking-tight text-foreground leading-none"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Professional <span className="font-serif italic font-light text-foreground/50">Journey</span>
                    </motion.h2>
                </div>

                {/* Timeline Grid */}
                <div className="relative border-l border-foreground/10 md:border-none pl-8 md:pl-0">
                    
                    {/* Cybernetic Spine Connector */}
                    <div className="hidden md:flex absolute left-1/2 top-4 bottom-4 w-10 -translate-x-1/2 overflow-hidden justify-center z-0">
                        {/* Background track */}
                        <div className="absolute inset-y-0 w-[1px] bg-foreground/[0.08] dark:bg-foreground/10" />
                        
                        {/* High-energy Laser Laser Core */}
                        <motion.div 
                            style={{ y: useTransform(laserScaleY, s => `${(s - 1) * 100}%`) }} 
                            className="w-[2px] h-full bg-gradient-to-b from-transparent via-foreground/40 dark:via-foreground to-transparent shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,1)] relative will-change-transform"
                        >
                            {/* Moving spark node */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-foreground shadow-[0_0_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_#fff]" />
                        </motion.div>
                    </div>

                    <div className="space-y-24 md:space-y-36">
                        {TIMELINE.map((item, index) => (
                            <TimelineRow 
                                key={item.sysNode} 
                                item={item} 
                                index={index} 
                                activeIndex={activeIndex}
                                onFocus={setActiveIndex}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface TimelineRowProps {
    item: TimelineType;
    index: number;
    activeIndex: number;
    onFocus: (index: number) => void;
}

function TimelineRow({ item, index, activeIndex, onFocus }: TimelineRowProps) {
    const rowRef = useRef<HTMLDivElement>(null);
    const isEven = index % 2 === 0;
    const isActive = activeIndex === index;

    // Scroll Tracking for Vertical Parallax Movement
    const { scrollYProgress } = useScroll({
        target: rowRef,
        offset: ["start end", "end start"]
    });

    // Continuous view tracking to correctly update activeIndex even when scrolling up
    const isInView = useInView(rowRef, { margin: "-40% 0px -40% 0px" });

    useEffect(() => {
        if (isInView) {
            onFocus(index);
        }
    }, [isInView, index, onFocus]);

    // Card moves slightly with scroll to create a floatation depth parallax
    const yCardParallax = useTransform(scrollYProgress, [0, 1], [-30, 30]);
    const springCardY = useSpring(yCardParallax, { stiffness: 100, damping: 30 });

    // Background giant Year moves faster with scroll to separate layers
    const yYearParallax = useTransform(scrollYProgress, [0, 1], [-80, 80]);

    // Mouse Tracking for 3D Card Hover Tilts (with explicit deg units for robust CSS 3D rendering)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Smoother, deeper tilt
    const springXDeg = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), { stiffness: 80, damping: 20 });
    const springYDeg = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), { stiffness: 80, damping: 20 });
    
    const rotateX = useTransform(springXDeg, (val) => `${val}deg`);
    const rotateY = useTransform(springYDeg, (val) => `${val}deg`);
    
    // Mouse Translation for the card itself (it floats towards the mouse)
    const cardTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 80, damping: 20 });
    const cardTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 80, damping: 20 });

    // Combined Card Y (Scroll + Mouse)
    const combinedCardY = useTransform(() => springCardY.get() + cardTranslateY.get());
    
    // Inverted 3D Parallax offset for the giant Year background text
    const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-45, 45]), { stiffness: 70, damping: 20 });
    const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-45, 45]), { stiffness: 70, damping: 20 });

    // Combined giant year Y movement: Scroll Parallax + Mouse Parallax
    const yearY = useTransform(() => yYearParallax.get() + parallaxY.get());

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        // Calculate mouse position relative to the center of the card
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={rowRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col md:flex-row gap-8 md:gap-0 relative ${isEven ? "md:flex-row-reverse" : ""}`}
            style={{ perspective: "1000px" }}
        >
            {/* Cybernetic Spine Dot Node */}
            <div 
                className={`absolute left-[-42px] md:left-1/2 md:-translate-x-1/2 top-4 w-5 h-5 rounded-full border bg-background z-20 flex items-center justify-center transition-all duration-700 ${
                    isActive 
                    ? "scale-125 border-foreground shadow-sm dark:shadow-[0_0_15px_#fff]" 
                    : "border-foreground/10"
                }`}
                style={{
                    borderColor: isActive ? item.accentColor : undefined
                }}
            >
                {/* Node center pulsing grid */}
                <motion.div 
                    className={`w-2.5 h-2.5 rounded-full ${isActive ? '' : 'bg-foreground/15'}`}
                    animate={isActive ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    style={{ backgroundColor: isActive ? item.accentColor : undefined }}
                />

                {/* Node atmospheric expansion rings */}
                {isActive && (
                    <motion.div 
                        className="absolute inset-0 rounded-full border pointer-events-none"
                        style={{ borderColor: item.accentColor }}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                    />
                )}
            </div>

            {/* Spacer Panel */}
            <div className="flex-1 md:w-1/2" />

            {/* Card Content Panel */}
            <div 
                className={`flex-1 md:w-1/2 relative ${
                    isEven ? "md:pr-16 lg:pr-24" : "md:pl-16 lg:pl-24"
                }`}
                style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
            >
                
                {/* ── INTERACTIVE 3D CARD CONTAINER ── */}
                <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.1)",
                    }}
                    style={{ 
                        rotateX, 
                        rotateY, 
                        x: cardTranslateX,
                        y: combinedCardY,
                        transformStyle: "preserve-3d" 
                    }}
                    className="group cursor-pointer relative bg-white/70 dark:bg-foreground/[0.03] border border-black/[0.06] dark:border-foreground/[0.04] hover:border-black/[0.15] dark:hover:border-foreground/[0.12] backdrop-blur-xl rounded-3xl p-10 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-2xl overflow-hidden transition-all duration-500 will-change-transform"
                >
                    {/* Glowing card base background grid effect */}
                    <div 
                        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)",
                            backgroundSize: "20px 20px"
                        }}
                    />

                    {/* Sweep border glow accent (Thickened for visceral impact) */}
                    <div 
                        className="absolute inset-x-0 top-0 h-[3px] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-[1px] group-hover:blur-none"
                        style={{
                            background: `linear-gradient(90deg, transparent, ${item.accentColor}, ${item.accentColor}, transparent)`
                        }}
                    />

                    {/* CARD CONTENT HEADER */}
                    <div className="flex justify-between items-center mb-8" style={{ transform: "translateZ(80px)" }}>
                        {/* Editorial Badge */}
                        <div 
                            className={`px-3 py-1.5 rounded-full border border-foreground/10 font-mono text-[10px] uppercase tracking-[0.2em] font-bold backdrop-blur-md transition-colors duration-300 ${isActive ? 'bg-background text-foreground' : 'text-foreground/40'}`}
                            style={{ 
                                borderColor: isActive ? item.accentColor : undefined,
                                color: isActive ? item.accentColor : undefined
                            }}
                        >
                            {item.sysNode}
                        </div>
                        <div className="flex items-center gap-2">
                            <div 
                                className={`w-2 h-2 rounded-full ${isActive ? 'animate-pulse shadow-[0_0_8px_currentColor]' : 'bg-foreground/15'}`}
                                style={{ backgroundColor: isActive ? item.accentColor : undefined, color: item.accentColor }}
                            />
                            <span className="font-mono text-[9px] text-foreground/30 uppercase tracking-[0.3em] font-medium">
                                {isActive ? "ACTIVE_STATE" : "ARCHIVED"}
                            </span>
                        </div>
                    </div>

                    {/* YEAR (Mobile HUD Header) */}
                    <span 
                        className={`font-mono text-[11px] uppercase tracking-[0.4em] font-bold block mb-3 transition-colors duration-500 ${isActive ? '' : 'text-foreground/30'}`}
                        style={{ color: isActive ? item.accentColor : undefined, transform: "translateZ(60px)" }}
                    >
                        {item.year}
                    </span>

                    {/* JOB TITLE (Massive Editorial scale) */}
                    <h3 
                        className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3 tracking-tighter leading-[1.1] transition-all duration-500 group-hover:translate-x-2" 
                        style={{ transform: "translateZ(100px)" }}
                    >
                        {item.title}
                    </h3>

                    {/* ROLE / SUBHEAD */}
                    <div 
                        className={`text-xs md:text-sm font-mono uppercase tracking-[0.2em] mb-8 block transition-colors duration-500 ${isActive ? 'text-foreground/70' : 'text-foreground/40'}`}
                        style={{ transform: "translateZ(50px)" }}
                    >
                        {item.role}
                    </div>

                    {/* DESCRIPTION */}
                    <p 
                        className="text-base md:text-lg text-foreground/60 group-hover:text-foreground/80 leading-relaxed mb-8 font-light transition-colors duration-300" 
                        style={{ transform: "translateZ(40px)" }}
                    >
                        {item.description}
                    </p>

                    {/* TECH TAGS (High Contrast Snap) */}
                    <div className="flex flex-wrap gap-2.5" style={{ transform: "translateZ(70px)" }}>
                        {item.tags.map((tag: string) => (
                            <span 
                                key={tag} 
                                className="px-3.5 py-1.5 bg-foreground/[0.03] group-hover:bg-foreground group-hover:text-background border border-foreground/[0.08] group-hover:border-transparent rounded-full text-[10px] font-mono tracking-widest text-foreground/50 uppercase transition-all duration-300 cursor-default shadow-sm group-hover:shadow-md"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* ── GIANT HOLOGRAPHIC BACKGROUND YEAR (3D Parallax) ── */}
                <motion.div
                    style={{ 
                        x: parallaxX, 
                        y: yearY,
                        z: -100,
                        transformStyle: "preserve-3d",
                        color: isActive ? `${item.accentColor}1a` : undefined,
                        fontSize: "clamp(6rem, 15vw, 11rem)",
                        left: isEven ? "auto" : "-10%",
                        right: isEven ? "-10%" : "auto",
                        zIndex: -1,
                    }}
                    className={`absolute -top-12 md:-top-20 pointer-events-none select-none font-display font-bold leading-none tracking-tighter transition-colors duration-1000 hidden md:block ${isActive ? '' : 'text-foreground/[0.02]'}`}
                >
                    {item.year === "Now" ? "NOW" : item.year}
                </motion.div>
            </div>
        </motion.div>
    );
}
