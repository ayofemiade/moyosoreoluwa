"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ChapterTransition
 *
 * A scroll-driven title card that lives ONLY between CinematicJourney and
 * ProjectsRail. Completely self-contained — overflow-hidden on the wrapper
 * guarantees it cannot bleed into or affect any other section.
 *
 * Phases:
 *  0.00 → 0.50 : Title lines slide up into view (Y + opacity)
 *  0.55 → 1.00 : Entire panel translates UP off screen (curtain lift)
 */
export default function ChapterTransition() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // ── Title reveal
    const line1Y       = useTransform(scrollYProgress, [0.00, 0.25], [60, 0]);
    const line1Opacity = useTransform(scrollYProgress, [0.00, 0.25], [0, 1]);
    const line2Y       = useTransform(scrollYProgress, [0.05, 0.30], [60, 0]);
    const line2Opacity = useTransform(scrollYProgress, [0.05, 0.30], [0, 1]);
    const kickerY      = useTransform(scrollYProgress, [0.10, 0.35], [30, 0]);
    const kickerOpacity= useTransform(scrollYProgress, [0.10, 0.35], [0, 1]);
    const lineScaleX   = useTransform(scrollYProgress, [0.00, 0.30], [0, 1]);

    // ── Curtain lift: the panel slides upward revealing projects below
    const panelY = useTransform(scrollYProgress, [0.55, 1.00], ["0vh", "-105vh"]);

    // Content fades before the panel lifts so text doesn't awkwardly scroll away
    const contentOpacity = useTransform(scrollYProgress, [0.45, 0.60], [1, 0]);

    // Faint accent glow bleeds up from the projects section below
    const glowOpacity = useTransform(scrollYProgress, [0.30, 0.65], [0, 0.8]);

    return (
        // 200vh of scroll space — isolated with overflow-hidden
        <div
            ref={containerRef}
            className="relative h-[200vh] bg-[#080808] overflow-hidden"
            style={{ isolation: "isolate" }}
        >
            {/* Sticky panel — slides upward in phase 2 */}
            <motion.div
                style={{ y: panelY }}
                className="sticky top-0 h-screen supports-[height:100dvh]:h-[100dvh] w-full bg-[#080808] flex items-center overflow-hidden"
            >
                {/* Subtle film grain matching the cinematic hero */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                        backgroundRepeat: "repeat",
                        backgroundSize: "200px 200px",
                    }}
                    aria-hidden="true"
                />

                {/* Indigo glow bleeding up from below — hints at the projects section */}
                <motion.div
                    style={{ opacity: glowOpacity }}
                    className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
                    aria-hidden="true"
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(99,102,241,0.10) 0%, transparent 70%)"
                        }}
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    style={{ opacity: contentOpacity }}
                    className="relative w-full px-8 md:px-20 flex flex-col items-start"
                >
                    {/* Chapter kicker */}
                    <motion.span
                        style={{ y: kickerY, opacity: kickerOpacity }}
                        className="block font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/25 mb-5 md:mb-7"
                    >
                        02 / Selected Work
                    </motion.span>

                    {/* Horizontal sweep line */}
                    <motion.div
                        style={{ scaleX: lineScaleX, originX: "0%" }}
                        className="w-full h-[1px] mb-8 md:mb-12"
                        // inline style because Tailwind can't express this gradient easily
                        css-hack="true"
                    >
                        <div
                            className="w-full h-full"
                            style={{ background: "linear-gradient(to right, rgba(255,255,255,0.15), rgba(99,102,241,0.35), transparent)" }}
                        />
                    </motion.div>

                    {/* "Built" */}
                    <motion.h2
                        style={{ y: line1Y, opacity: line1Opacity }}
                        aria-hidden="true"
                        className="font-display font-medium text-white leading-none tracking-tighter select-none"
                    >
                        <span style={{ fontSize: "clamp(4rem, 17vw, 15rem)", display: "block" }}>
                            Built
                        </span>
                    </motion.h2>

                    {/* "realities." */}
                    <motion.h2
                        style={{ y: line2Y, opacity: line2Opacity }}
                        aria-hidden="true"
                        className="font-serif italic font-light leading-none tracking-tighter select-none"
                    >
                        <span
                            style={{
                                fontSize: "clamp(3.5rem, 15vw, 13rem)",
                                color: "rgba(255,255,255,0.18)",
                                display: "block"
                            }}
                        >
                            realities.
                        </span>
                    </motion.h2>

                    {/* Scroll nudge */}
                    <motion.p
                        style={{ y: kickerY, opacity: kickerOpacity }}
                        className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20 mt-8 md:mt-12"
                    >
                        Scroll to explore
                    </motion.p>
                </motion.div>
            </motion.div>
        </div>
    );
}
