"use client";

import { motion, MotionValue, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

interface GalaxyOverlayProps {
    scrollYProgress: MotionValue<number>;
}

// ---------------------------------------------
// The 3D Wireframe Cortex (Background Environment)
// ---------------------------------------------
const WireframeCortex = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
    
    // Mouse Tracking for Interactive Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Smooth out the mouse movement so the globe doesn't snap
    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize coordinates from -1 to 1 based on window center
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            mouseX.set(nx);
            mouseY.set(ny);
        };
        // Only run on desktop/devices with a mouse
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Map mouse position to rotation offsets (max 30 degrees)
    const mouseRotateY = useTransform(smoothMouseX, [-1, 1], [-30, 30]);
    const mouseRotateX = useTransform(smoothMouseY, [-1, 1], [15, -15]);

    // Global container rotation driven by SCROLL
    // Look down the barrel of the tunnel (15deg tilt) instead of looking at it sideways (75deg)
    const baseRotateX = useTransform(scrollYProgress, [0, 0.22, 0.28, 1], [15, 15, 0, 0]);
    // The tunnel spins slowly as you fly through it (0 to 90), then stabilizes for the globe
    const rotateZ = useTransform(scrollYProgress, [0, 0.22, 0.28, 1], [0, 90, 0, 0]);
    // Continuous rotation: spins fast to 360 during Scene 2, then spins slowly to 720 to the absolute end
    const baseRotateY = useTransform(scrollYProgress, [0, 0.22, 0.28, 0.40, 1], [0, 0, 0, 360, 720]);
    
    // Combine Scroll Rotation + Mouse Interactive Rotation
    const rotateX = useTransform(() => baseRotateX.get() + mouseRotateX.get());
    const rotateY = useTransform(() => baseRotateY.get() + mouseRotateY.get());

    // Scale: Massive in Scene 1 (to fly through), smaller in Scene 2 (globe)
    const scale = useTransform(scrollYProgress, [0, 0.22, 0.28, 1], [2.5, 3, 0.8, 0.8]);

    // 12 rings for a very dense, highly technical wireframe
    const rings = Array.from({ length: 12 });

    return (
        <motion.div 
            style={{ rotateX, rotateY, rotateZ, scale, transformStyle: "preserve-3d" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            {rings.map((_, i) => {
                // Scene 1: Distributed along Z-axis (Tunnel). As we scroll, Z increases so we fly through.
                const startZ = -4000 + i * 400;
                const endZ = 1000 + i * 400; 

                // Scene 2: Globe distribution (rotated along Y axis to form a sphere)
                const sphericalRotateY = (180 / rings.length) * i;
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const z = useTransform(scrollYProgress, [0, 0.22, 0.28, 1], [startZ, endZ, 0, 0]);
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const ringRotateY = useTransform(scrollYProgress, [0, 0.22, 0.28, 1], [0, 0, sphericalRotateY, sphericalRotateY]);
                
                // Opacity stays visible all the way to the absolute end (1.0)
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [0, 0.16, 0.22, 0.28, 1], [0.5, 0.9, 0.9, 0.5, 0.5]);

                // Create a mix of dashed and solid glowing rings, making them thicker and brighter
                const isDashed = i % 3 === 0;

                return (
                    <motion.div
                        key={i}
                        style={{
                            z,
                            rotateY: ringRotateY,
                            opacity,
                            transformStyle: "preserve-3d"
                        }}
                        className={`absolute w-[100vw] h-[100vw] md:w-[60vw] md:h-[60vw] max-w-[800px] max-h-[800px] rounded-full border-[2px] md:border-[3px] ${
                            isDashed 
                            ? 'border-dashed border-accent/80 shadow-[0_0_30px_rgba(99,102,241,0.6)]' 
                            : 'border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                        }`}
                    />
                );
            })}
        </motion.div>
    );
};


export default function GalaxyOverlay({ scrollYProgress }: GalaxyOverlayProps) {
    // ---------------------------------------------
    // Scene 1: Discovery (0.0 to 0.16)
    // ---------------------------------------------
    // Global exit for Scene 1
    const scene1FadeOut = useTransform(scrollYProgress, [0.12, 0.16], [1, 0]);
    const scene1YOut = useTransform(scrollYProgress, [0.12, 0.16], [0, -40]);

    // Staggered entry for text lines
    const l1Opacity = useTransform(scrollYProgress, [0.02, 0.05], [0, 1]);
    const l1Y = useTransform(scrollYProgress, [0.02, 0.05], [30, 0]);
    
    const l2Opacity = useTransform(scrollYProgress, [0.03, 0.06], [0, 1]);
    const l2Y = useTransform(scrollYProgress, [0.03, 0.06], [30, 0]);
    
    const l3Opacity = useTransform(scrollYProgress, [0.04, 0.07], [0, 1]);
    const l3Y = useTransform(scrollYProgress, [0.04, 0.07], [30, 0]);

    // Dynamic Anchor Line
    const lineScale = useTransform(scrollYProgress, [0.05, 0.09], ["0%", "100%"]);

    // ---------------------------------------------
    // Scene 2: High Performance (0.20 to 0.36)
    // ---------------------------------------------
    // Global entrance and exit for Scene 2
    const scene2Opacity = useTransform(scrollYProgress, [0.18, 0.20, 0.32, 0.36], [0, 1, 1, 0]);
    const scene2Y = useTransform(scrollYProgress, [0.18, 0.36], [40, -40]);

    // Floating Ambient Glow (Behind text, augmenting the Cortex)
    const coreScale = useTransform(scrollYProgress, [0.18, 0.36], [0.8, 1.2]);

    // Apple-style Scroll Scrubbing for Text
    const scrub1 = useTransform(scrollYProgress, [0.20, 0.24], [0.2, 1]);
    const scrub2 = useTransform(scrollYProgress, [0.23, 0.27], [0.2, 1]);
    const scrub3 = useTransform(scrollYProgress, [0.26, 0.30], [0.2, 1]);

    // HUD Parallax
    const hudLeftY = useTransform(scrollYProgress, [0.18, 0.36], [-20, 20]);
    const hudRightY = useTransform(scrollYProgress, [0.18, 0.36], [20, -20]);

    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ perspective: "1000px" }}>
            
            {/* The 3D Environment */}
            <WireframeCortex scrollYProgress={scrollYProgress} />

            {/* SCENE 1 */}
            <motion.div 
                style={{ opacity: scene1FadeOut, y: scene1YOut }}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-8 z-10"
            >
                <div className="flex flex-col items-center gap-8 md:gap-12 w-full max-w-5xl">
                    <motion.div 
                        style={{ opacity: l1Opacity, y: l1Y }}
                        className="flex items-center gap-4 text-xs font-mono text-white/40 uppercase tracking-[0.3em]"
                    >
                        <span className="w-12 h-[1px] bg-white/20"></span>
                        <span>Phase 01 // Discovery</span>
                        <span className="w-12 h-[1px] bg-white/20"></span>
                    </motion.div>

                    <div className="flex flex-col items-center text-center">
                        <motion.h2 
                            style={{ opacity: l1Opacity, y: l1Y }}
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tighter text-white leading-[1.1] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
                        >
                            Take a look into my
                        </motion.h2>
                        <motion.h2 
                            style={{ opacity: l2Opacity, y: l2Y }}
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic font-light text-white/70 leading-[1.1] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
                        >
                            world of limitless
                        </motion.h2>
                        <motion.h2 
                            style={{ opacity: l3Opacity, y: l3Y }}
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tighter text-white leading-[1.1] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]"
                        >
                            possibilities.
                        </motion.h2>
                    </div>

                    <motion.div 
                        style={{ height: lineScale }}
                        className="w-[1px] h-24 md:h-32 bg-gradient-to-b from-white/40 to-transparent mt-4"
                    />
                </div>
            </motion.div>

            {/* SCENE 2 */}
            <motion.div 
                style={{ opacity: scene2Opacity, y: scene2Y }}
                className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-8 z-10"
            >
                <motion.div 
                    style={{ scale: coreScale }}
                    className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-tr from-accent/10 to-transparent blur-3xl opacity-50"
                />

                <div className="relative w-full max-w-7xl flex justify-between items-center md:items-end z-20">
                    <motion.div 
                        style={{ y: hudLeftY }}
                        className="hidden md:flex flex-col gap-2 text-[10px] font-mono text-white/30 tracking-widest pb-4"
                    >
                        <span>[ ENGINES ONLINE ]</span>
                        <span>VOLTAGE: 100%</span>
                    </motion.div>
                    
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                        <div className="flex flex-col items-center text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight leading-[1.1]">
                            <motion.span style={{ opacity: scrub1 }} className="text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
                                I ship high-performance <span className="text-white/50">web products</span>
                            </motion.span>
                            <motion.span style={{ opacity: scrub2 }} className="font-serif italic font-light text-accent drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] mt-1 md:mt-2">
                                and real-time AI systems
                            </motion.span>
                            <motion.span style={{ opacity: scrub3 }} className="text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] mt-1 md:mt-2">
                                that feel instant.
                            </motion.span>
                        </div>
                        
                        <p className="mt-8 text-sm md:text-lg text-white/60 font-medium tracking-wide font-mono uppercase">
                            Founder mindset. Launch focused.
                        </p>

                        <div className="mt-12 flex gap-4 items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-accent drop-shadow-[0_0_8px_rgba(99,102,241,0.8)] animate-pulse"></div>
                            <div className="w-1 h-1 rounded-full bg-white/20"></div>
                            <div className="w-1 h-1 rounded-full bg-white/20"></div>
                        </div>
                    </div>

                    <motion.div 
                        style={{ y: hudRightY }}
                        className="hidden md:flex flex-col items-end gap-2 text-[10px] font-mono text-white/30 tracking-widest pb-4"
                    >
                        <span>[ LATENCY: 12ms ]</span>
                        <span>NODE: ACTIVE</span>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
