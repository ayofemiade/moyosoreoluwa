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
            className="py-32 md:py-48 px-6 bg-[#080808] relative overflow-hidden transition-colors duration-1000"
        >
            {/* Ambient Background Grid lines */}
            <div 
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
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
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] rounded-full opacity-40 transition-colors duration-1000 will-change-transform"
                            style={{
                                background: `radial-gradient(circle, ${activeItem.accentColor}55 0%, ${activeItem.accentColor}10 40%, transparent 70%)`
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto relative z-10">
                
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-24 md:mb-36 text-center">
                    <motion.span
                        className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/30 mb-4 block"
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Engineering Log
                    </motion.span>
                    <motion.h2
                        className="text-4xl md:text-6xl font-display font-medium tracking-tight text-white leading-none"
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Professional <span className="font-serif italic font-light text-white/50">Journey</span>
                    </motion.h2>
                </div>

                {/* Timeline Grid */}
                <div className="relative border-l border-white/[0.05] md:border-none pl-8 md:pl-0">
                    
                    {/* Cybernetic Spine Connector */}
                    <div className="hidden md:flex absolute left-1/2 top-4 bottom-4 w-10 -translate-x-1/2 overflow-hidden justify-center z-0">
                        {/* Background track */}
                        <div className="absolute inset-y-0 w-[1px] bg-white/[0.05]" />
                        
                        {/* High-energy Laser Laser Core */}
                        <motion.div 
                            style={{ y: useTransform(laserScaleY, s => `${(s - 1) * 100}%`) }} 
                            className="w-[2px] h-full bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,1)] relative will-change-transform"
                        >
                            {/* Moving spark node */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_20px_#fff]" />
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
                className={`absolute left-[-42px] md:left-1/2 md:-translate-x-1/2 top-4 w-5 h-5 rounded-full border bg-[#080808] z-20 flex items-center justify-center transition-all duration-700 ${
                    isActive 
                    ? "scale-125 border-white shadow-[0_0_15px_#fff]" 
                    : "border-white/10"
                }`}
                style={{
                    borderColor: isActive ? item.accentColor : "rgba(255,255,255,0.1)"
                }}
            >
                {/* Node center pulsing grid */}
                <motion.div 
                    className="w-2.5 h-2.5 rounded-full bg-white"
                    animate={isActive ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    style={{ backgroundColor: isActive ? item.accentColor : "rgba(255,255,255,0.15)" }}
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
                        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.6)",
                    }}
                    style={{ 
                        rotateX, 
                        rotateY, 
                        x: cardTranslateX,
                        y: combinedCardY,
                        transformStyle: "preserve-3d" 
                    }}
                    className="group cursor-pointer relative bg-neutral-900/[0.15] border border-white/[0.04] hover:border-white/[0.09] backdrop-blur-md rounded-2xl p-8 md:p-10 shadow-2xl overflow-hidden transition-colors duration-500 will-change-transform"
                >
                    {/* Glowing card base background grid effect */}
                    <div 
                        className="absolute inset-0 opacity-[0.015] group-hover:opacity-[0.035] transition-opacity pointer-events-none"
                        style={{
                            backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
                            backgroundSize: "20px 20px"
                        }}
                    />

                    {/* Sweep border glow accent */}
                    <div 
                        className="absolute inset-x-0 top-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                            background: `linear-gradient(to right, transparent, ${item.accentColor}, transparent)`
                        }}
                    />

                    {/* CARD CONTENT HEADER */}
                    <div className="flex justify-between items-center mb-6" style={{ transform: "translateZ(50px)" }}>
                        <span 
                            className="font-mono text-[9px] uppercase tracking-[0.25em]"
                            style={{ color: isActive ? item.accentColor : "rgba(255,255,255,0.25)" }}
                        >
                            {item.sysNode}
                        </span>
                        <div className="flex items-center gap-1.5">
                            <div 
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: isActive ? item.accentColor : "rgba(255,255,255,0.15)" }}
                            />
                            <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">
                                {isActive ? "LIVE_READOUT" : "LOGGED"}
                            </span>
                        </div>
                    </div>

                    {/* YEAR (Mobile HUD Header) */}
                    <span 
                        className="font-mono text-xs uppercase tracking-[0.3em] font-medium block mb-2 transition-colors duration-500"
                        style={{ color: isActive ? item.accentColor : "rgba(255,255,255,0.3)", transform: "translateZ(40px)" }}
                    >
                        {item.year}
                    </span>

                    {/* JOB TITLE */}
                    <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-1.5 tracking-tight transition-all duration-500 group-hover:translate-x-1" style={{ transform: "translateZ(60px)" }}>
                        {item.title}
                    </h3>

                    {/* ROLE / SUBHEAD */}
                    <div 
                        className="text-xs font-mono uppercase tracking-widest mb-6 block transition-colors duration-500"
                        style={{ color: isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)", transform: "translateZ(30px)" }}
                    >
                        {item.role}
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-white/55 group-hover:text-white/70 leading-relaxed mb-6 font-light transition-colors duration-300" style={{ transform: "translateZ(25px)" }}>
                        {item.description}
                    </p>

                    {/* TECH TAGS */}
                    <div className="flex flex-wrap gap-2.5" style={{ transform: "translateZ(45px)" }}>
                        {item.tags.map((tag: string) => (
                            <span 
                                key={tag} 
                                className="px-3 py-1 bg-white/[0.03] group-hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/10 rounded-full text-[9px] font-mono tracking-widest text-white/40 group-hover:text-white/60 uppercase transition-all duration-300 cursor-default"
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
                        color: isActive ? `${item.accentColor}0e` : "rgba(255,255,255,0.015)",
                        fontSize: "clamp(6rem, 15vw, 11rem)",
                        left: isEven ? "auto" : "-10%",
                        right: isEven ? "-10%" : "auto",
                        zIndex: -1,
                    }}
                    className="absolute -top-12 md:-top-20 pointer-events-none select-none font-display font-bold leading-none tracking-tighter transition-colors duration-1000 hidden md:block"
                >
                    {item.year === "Now" ? "NOW" : item.year}
                </motion.div>
            </div>
        </motion.div>
    );
}
