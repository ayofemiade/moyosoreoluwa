"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface GalaxyOverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function GalaxyOverlay({ scrollYProgress }: GalaxyOverlayProps) {
    // Scene 1: Crystal World (0% to ~25% scroll)
    // The narrative text appears and fades out before the vortex gets intense.
    const opacity1 = useTransform(scrollYProgress, [0.02, 0.08, 0.15, 0.22], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0.02, 0.22], [40, -40]);
    const blur1 = useTransform(scrollYProgress, [0.02, 0.08, 0.15, 0.22], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    const opacity2 = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.4], [40, -40]);
    const blur2 = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <motion.div 
                style={{ opacity: opacity1, y: y1, filter: blur1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-8"
            >
                {/* Contrast Backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_0%,transparent_50%)] pointer-events-none" />
                
                <h2 className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,1)] max-w-4xl leading-tight">
                    Take a look into my world of <br className="hidden sm:block" />
                    <span className="text-white/60 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">limitless possibilities.</span>
                </h2>
            </motion.div>

            <motion.div 
                style={{ opacity: opacity2, y: y2, filter: blur2 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-8"
            >
                {/* Contrast Backdrop */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_0%,transparent_60%)] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-tight text-white drop-shadow-[0_4px_25px_rgba(0,0,0,1)] max-w-4xl leading-tight">
                        I ship high-performance web products and <br className="hidden sm:block" />
                        <span className="text-accent drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">real-time AI systems</span> that feel instant.
                    </h2>
                    <p className="mt-6 sm:mt-8 text-sm sm:text-base md:text-xl text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] max-w-2xl font-medium tracking-wide">
                        Founder mindset. I don't just write code; I launch products that get users.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
