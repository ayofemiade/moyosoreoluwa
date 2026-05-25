"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface FutureCityProps {
    scrollYProgress: MotionValue<number>;
}

export default function FutureCity({ scrollYProgress }: FutureCityProps) {
    // The glass pill appears early and slowly glides into position
    const opacity1 = useTransform(scrollYProgress, [0.72, 0.78], [0, 1]);
    const y1 = useTransform(scrollYProgress, [0.72, 0.85], [60, 0]);
    const blur1 = useTransform(scrollYProgress, [0.72, 0.78], ["blur(15px)", "blur(0px)"]);

    // The main headline appears shortly after, completing the massive composition
    const opacity2 = useTransform(scrollYProgress, [0.80, 0.86], [0, 1]);
    const y2 = useTransform(scrollYProgress, [0.80, 0.90], [60, 0]);
    const blur2 = useTransform(scrollYProgress, [0.80, 0.86], ["blur(15px)", "blur(0px)"]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex flex-col items-center justify-center gap-8 md:gap-12 px-6 sm:px-8 pb-20 md:pb-32">
            {/* SCENE 3: The Glass Pill */}
            <motion.div 
                style={{ opacity: opacity1, y: y1, filter: blur1 }}
                className="flex flex-col items-center justify-center"
            >
                <div className="border border-white/10 px-8 py-5 md:px-12 md:py-6 backdrop-blur-md rounded-full bg-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <h2 className="text-xl sm:text-2xl md:text-4xl font-display font-medium tracking-tight text-white flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                        <span>Every interaction</span>
                        <span className="font-serif italic font-light text-white/60">tells a story.</span>
                    </h2>
                </div>
            </motion.div>

            {/* SCENE 4: The Main Headline */}
            <motion.div 
                style={{ opacity: opacity2, y: y2, filter: blur2 }}
                className="flex flex-col items-center justify-center mt-4 md:mt-8"
            >
                <div className="flex flex-col items-center w-full max-w-5xl text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tighter text-white leading-[1] drop-shadow-[0_4px_40px_rgba(0,0,0,0.9)]">
                        From ideas <br />
                        <span className="font-serif italic font-light text-accent drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">to realities.</span>
                    </h2>
                </div>
            </motion.div>
        </div>
    );
}
