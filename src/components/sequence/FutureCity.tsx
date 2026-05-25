"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface FutureCityProps {
    scrollYProgress: MotionValue<number>;
}

export default function FutureCity({ scrollYProgress }: FutureCityProps) {
    // Scene 3: City Transition (0.75 to 0.85) - Text appears as the city comes into view
    const opacity1 = useTransform(scrollYProgress, [0.75, 0.78, 0.82, 0.85], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0.75, 0.85], [40, -40]);
    const blur1 = useTransform(scrollYProgress, [0.75, 0.78, 0.82, 0.85], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    // Scene 4: City Plateau (0.85 to 1.0) - Text settles solidly as the sequence concludes
    const opacity2 = useTransform(scrollYProgress, [0.86, 0.89, 1], [0, 1, 1]);
    const y2 = useTransform(scrollYProgress, [0.86, 1], [40, 0]);
    const blur2 = useTransform(scrollYProgress, [0.86, 0.89, 1], ["blur(10px)", "blur(0px)", "blur(0px)"]);

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
