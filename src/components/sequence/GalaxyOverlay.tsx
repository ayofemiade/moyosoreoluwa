"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface GalaxyOverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function GalaxyOverlay({ scrollYProgress }: GalaxyOverlayProps) {
    // Scene 1: Discovery (0.0 to 0.16)
    const opacity1 = useTransform(scrollYProgress, [0.02, 0.06, 0.12, 0.16], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0.02, 0.16], [40, -40]);
    const blur1 = useTransform(scrollYProgress, [0.02, 0.06, 0.12, 0.16], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    // Scene 2: High Performance (0.20 to 0.36)
    const opacity2 = useTransform(scrollYProgress, [0.20, 0.24, 0.32, 0.36], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.20, 0.36], [40, -40]);
    const blur2 = useTransform(scrollYProgress, [0.20, 0.24, 0.32, 0.36], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* SCENE 1 */}
            <motion.div 
                style={{ opacity: opacity1, y: y1, filter: blur1 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-8"
            >
                <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-5xl">
                    {/* Micro-architecture: Kicker */}
                    <div className="flex items-center gap-4 text-xs font-mono text-white/40 uppercase tracking-[0.3em]">
                        <span className="w-12 h-[1px] bg-white/20"></span>
                        <span>Phase 01 // Discovery</span>
                        <span className="w-12 h-[1px] bg-white/20"></span>
                    </div>

                    {/* Typographic Luxury Mix */}
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tighter text-white text-center leading-[1.1] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                        Take a look into my <br />
                        <span className="font-serif italic font-light text-white/70">world of limitless</span> <br />
                        possibilities.
                    </h2>

                    {/* Micro-architecture: Anchor Line */}
                    <div className="mt-4 w-[1px] h-24 md:h-32 bg-gradient-to-b from-white/30 to-transparent"></div>
                </div>
            </motion.div>

            {/* SCENE 2 */}
            <motion.div 
                style={{ opacity: opacity2, y: y2, filter: blur2 }}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-8"
            >
                <div className="relative w-full max-w-7xl flex justify-between items-center md:items-end">
                    {/* HUD Left */}
                    <div className="hidden md:flex flex-col gap-2 text-[10px] font-mono text-white/30 tracking-widest pb-4">
                        <span>[ ENGINES ONLINE ]</span>
                        <span>VOLTAGE: 100%</span>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                            I ship high-performance <span className="text-white/50">web products</span> <br className="hidden md:block"/>
                            and <span className="font-serif italic font-light text-accent">real-time AI systems</span> <br className="hidden md:block"/>
                            that feel instant.
                        </h2>
                        
                        <p className="mt-8 text-sm md:text-lg text-white/60 font-medium tracking-wide font-mono uppercase">
                            Founder mindset. Launch focused.
                        </p>

                        {/* Animated Nodes */}
                        <div className="mt-12 flex gap-4 items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-accent drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse"></div>
                            <div className="w-1 h-1 rounded-full bg-white/20"></div>
                            <div className="w-1 h-1 rounded-full bg-white/20"></div>
                        </div>
                    </div>

                    {/* HUD Right */}
                    <div className="hidden md:flex flex-col items-end gap-2 text-[10px] font-mono text-white/30 tracking-widest pb-4">
                        <span>[ LATENCY: 12ms ]</span>
                        <span>NODE: ACTIVE</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
