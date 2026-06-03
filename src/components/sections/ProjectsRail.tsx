"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/content/projects";
import ProjectCard from "@/components/projects/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsRail() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

    // Cursor orb tracking
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const springX = useSpring(cursorX, { stiffness: 80, damping: 20 });
    const springY = useSpring(cursorY, { stiffness: 80, damping: 20 });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        cursorX.set(e.clientX - rect.left);
        cursorY.set(e.clientY - rect.top);
    }, [cursorX, cursorY]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener("mousemove", handleMouseMove);
        return () => el.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    // GSAP horizontal scroll (desktop only — preserved exactly)
    useEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;
        if (!section || !trigger) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            const scrollWidth = section.scrollWidth;
            const windowWidth = window.innerWidth;
            const xMove = -(scrollWidth - windowWidth);

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                    refreshPriority: 1, // Ensures this calculates BEFORE downstream components like CinematicContact
                },
            });

            tl.to(section, { x: 0, duration: 1 })
              .to(section, { x: xMove, ease: "none", duration: 4 });
        });

        return () => { mm.revert(); };
    }, []);

    const hoveredProject = PROJECTS.find(p => p.slug === hoveredSlug);

    return (
        <section
            id="projects"
            ref={containerRef}
            className="relative bg-[#121212] overflow-hidden"
        >
            {/* ── SEAMLESS ENTRY: tall gradient bridge matching the cinematic hero's bg exactly ── */}
            <div
                className="absolute top-0 left-0 right-0 pointer-events-none z-10"
                style={{
                    height: "40vh",
                    background: "linear-gradient(to bottom, #121212 0%, #121212 30%, transparent 100%)"
                }}
            />

            {/* ── FULL-SCREEN AMBIENT ATMOSPHERE ── 
                When a project is hovered, its unique color palette bleeds across the entire section.
                This is the cinematic immersion layer — inspired by the 3D hero's atmospheric depth. */}
            <AnimatePresence mode="wait">
                {hoveredProject && (
                    <motion.div
                        key={hoveredProject.slug}
                        className="absolute inset-0 pointer-events-none z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Left bloom */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `radial-gradient(ellipse 60% 80% at 20% 60%, ${hoveredProject.glowColor} 0%, transparent 70%)`
                            }}
                        />
                        {/* Right bloom */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `radial-gradient(ellipse 40% 60% at 80% 30%, ${hoveredProject.glowColor} 0%, transparent 70%)`
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── CURSOR ORB: spotlight that follows the mouse ── */}
            <motion.div
                className="absolute pointer-events-none z-10 rounded-full hidden md:block"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: 400,
                    height: 400,
                    background: hoveredProject
                        ? `radial-gradient(circle, ${hoveredProject.accentColor}18 0%, transparent 70%)`
                        : "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)",
                    transition: "background 0.6s ease",
                }}
            />

            {/* ── MAIN RAIL ── */}
            <div ref={triggerRef}>
                <div className="h-auto md:h-screen md:supports-[height:100dvh]:h-[100dvh] flex flex-col justify-center w-full overflow-visible md:overflow-hidden">
                    <div
                        ref={sectionRef}
                        className="flex flex-col md:flex-row w-full md:w-max h-auto md:h-full"
                    >
                        {/* ── INTRO PANEL ── */}
                        <div className="w-full md:w-[560px] h-[38vh] md:h-full flex flex-col justify-center md:justify-end p-8 md:p-14 border-b md:border-b-0 md:border-r border-white/[0.06] shrink-0 relative">
                            
                            {/* Section kicker */}
                            <motion.span
                                className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/30 mb-6 md:mb-8 block"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Selected Work
                            </motion.span>

                            <motion.h2
                                className="font-display font-medium text-white leading-tight tracking-tighter"
                                style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                Built realities.{" "}
                                <span className="text-white/25">Not just concepts.</span>
                            </motion.h2>

                            {/* Animated count readout */}
                            <motion.div
                                className="flex items-center gap-3 mt-8 md:mt-12"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <div className="w-8 h-[1px] bg-white/20" />
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                                    {PROJECTS.length} Projects
                                </span>
                            </motion.div>

                            {/* Active project name readout (appears when hovering a card) */}
                            <AnimatePresence mode="wait">
                                {hoveredProject && (
                                    <motion.div
                                        key={hoveredProject.slug}
                                        className="absolute bottom-8 md:bottom-14 left-8 md:left-14 hidden md:flex flex-col gap-1"
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <span
                                            className="font-mono text-[9px] uppercase tracking-[0.3em]"
                                            style={{ color: hoveredProject.accentColor }}
                                        >
                                            Now viewing
                                        </span>
                                        <span className="font-display text-sm text-white/60 tracking-tight">
                                            {hoveredProject.tagline}
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ── PROJECT CARDS ── */}
                        {PROJECTS.map((project, index) => (
                            <ProjectCard
                                key={project.slug}
                                project={project}
                                index={index}
                                className="shrink-0"
                                isHovered={hoveredSlug === project.slug}
                                onHover={setHoveredSlug}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
