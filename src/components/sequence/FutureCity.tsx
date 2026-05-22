"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface FutureCityProps {
    scrollYProgress: MotionValue<number>;
}

export default function FutureCity({ scrollYProgress }: FutureCityProps) {
    // Scene 3: City Reveal (75% to 100% scroll)
    const opacity1 = useTransform(scrollYProgress, [0.75, 0.8, 0.9, 0.95], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0.75, 0.95], [40, -40]);
    const blur1 = useTransform(scrollYProgress, [0.75, 0.8, 0.9, 0.95], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    const opacity2 = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
    const y2 = useTransform(scrollYProgress, [0.85, 1], [40, 0]);
    const blur2 = useTransform(scrollYProgress, [0.85, 0.9, 1], ["blur(10px)", "blur(0px)", "blur(0px)"]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <motion.div 
                style={{ opacity: opacity1, y: y1, filter: blur1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-8"
            >
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-medium tracking-tight text-white drop-shadow-2xl">
                    Every interaction <span className="text-white/60">tells a story.</span>
                </h2>
            </motion.div>

            <motion.div 
                style={{ opacity: opacity2, y: y2, filter: blur2 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-8"
            >
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-medium tracking-tight text-white drop-shadow-2xl">
                    From ideas <span className="text-accent">to realities.</span>
                </h2>
            </motion.div>
        </div>
    );
}
