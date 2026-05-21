"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroOverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function HeroOverlay({ scrollYProgress }: HeroOverlayProps) {
    // Section 1: 0% to ~25%
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
    const blur1 = useTransform(scrollYProgress, [0, 0.15, 0.25], ["blur(0px)", "blur(0px)", "blur(10px)"]);

    // Section 2: ~20% to ~55% (Peaks at 30%)
    const opacity2 = useTransform(scrollYProgress, [0.15, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.15, 0.55], [50, -50]);
    const blur2 = useTransform(scrollYProgress, [0.15, 0.3, 0.45, 0.55], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    // Section 3: ~50% to ~85% (Peaks at 60%)
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.85], [50, -50]);
    const blur3 = useTransform(scrollYProgress, [0.45, 0.6, 0.75, 0.85], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Section 1: Centered */}
            <motion.div 
                style={{ opacity: opacity1, y: y1, filter: blur1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight text-white drop-shadow-2xl">
                    Moyosore.<br />
                    <span className="text-white/60">Creative Developer.</span>
                </h1>
            </motion.div>

            {/* Section 2: Left Aligned */}
            <motion.div 
                style={{ opacity: opacity2, y: y2, filter: blur2 }}
                className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-24"
            >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight text-white drop-shadow-2xl max-w-3xl">
                    I build digital experiences.
                </h2>
            </motion.div>

            {/* Section 3: Right Aligned */}
            <motion.div 
                style={{ opacity: opacity3, y: y3, filter: blur3 }}
                className="absolute inset-0 flex flex-col items-end justify-center text-right px-8 md:px-24"
            >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight text-white drop-shadow-2xl max-w-3xl">
                    Bridging design<br />and engineering.
                </h2>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: opacity1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-white/50"
            >
                <span>Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
            </motion.div>
        </div>
    );
}
