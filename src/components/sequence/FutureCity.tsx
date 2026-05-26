"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface FutureCityProps {
    scrollYProgress: MotionValue<number>;
}

export default function FutureCity({ scrollYProgress }: FutureCityProps) {
    // Scene 3: City Transition (0.75 to 0.85)
    const opacity1 = useTransform(scrollYProgress, [0.75, 0.78, 0.82, 0.85], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0.75, 0.85], [40, -40]);
    const blur1 = useTransform(scrollYProgress, [0.75, 0.78, 0.82, 0.85], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    // Scene 4: City Plateau (0.85 to 1.0)
    const opacity2 = useTransform(scrollYProgress, [0.86, 0.89, 1], [0, 1, 1]);
    const y2 = useTransform(scrollYProgress, [0.86, 1], [40, 0]);
    const blur2 = useTransform(scrollYProgress, [0.86, 0.89, 1], ["blur(10px)", "blur(0px)", "blur(0px)"]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* SCENE 3 */}
            <motion.div 
                style={{ opacity: opacity1, y: y1, filter: blur1 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-8"
            >
                <div className="border border-white/10 px-8 py-6 md:px-12 md:py-8 backdrop-blur-md rounded-full bg-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-medium tracking-tight text-white flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                        <span>Every interaction</span>
                        <span className="font-serif italic font-light text-white/60">tells a story.</span>
                    </h2>
                </div>
            </motion.div>

            {/* SCENE 4 */}
            <motion.div 
                style={{ opacity: opacity2, y: y2, filter: blur2 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-8"
            >
                <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-4xl text-center">
                    {/* Glowing Orb / Node */}
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-24 h-24 border border-accent/20 rounded-full animate-[spin_4s_linear_infinite]" />
                        <div className="absolute w-16 h-16 border border-accent/40 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
                        <div className="w-3 h-3 rounded-full bg-accent drop-shadow-[0_0_15px_rgba(99,102,241,1)] animate-pulse" />
                    </div>
                    
                    <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-medium tracking-tighter text-white leading-[0.9] drop-shadow-[0_4px_40px_rgba(0,0,0,0.9)]">
                        From ideas <br />
                        <span className="font-serif italic font-light text-accent drop-shadow-[0_0_20px_rgba(99,102,241,0.5)]">to realities.</span>
                    </h2>
                </div>
            </motion.div>
        </div>
    );
}
