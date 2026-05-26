"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { useFramePreloader } from "@/components/hero/useFramePreloader";
import { useCinematicOrchestrator } from "@/components/sequence/useCinematicOrchestrator";

import ScrollyCanvas from "@/components/hero/ScrollyCanvas";
import HeroOverlay from "@/components/hero/HeroOverlay";

import GalaxyOverlay from "@/components/sequence/GalaxyOverlay";
import SkillReveal from "@/components/sequence/SkillReveal";
import VortexTransition from "@/components/sequence/VortexTransition";
import FutureCity from "@/components/sequence/FutureCity";

export default function CinematicJourney() {
    const containerRef = useRef<HTMLElement>(null);
    
    // Total journey is 800vh
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const orchestratedProgress = useCinematicOrchestrator(scrollYProgress, { plateaus: [] });

    // 0 -> 0.35 is Hero (approx 280vh of scroll)
    // 0.45 -> 0.95 is Sequence Overlays (approx 400vh of scroll)
    const heroProgress = useTransform(orchestratedProgress, [0, 0.35], [0, 1], { clamp: true });
    const sequenceProgress = useTransform(orchestratedProgress, [0.45, 0.95], [0, 1], { clamp: true });

    // The Deep Blur Morph
    // Instead of fading out the hero, we blur it heavily and darken it between 0.35 and 0.45
    // This creates a moody, deeply atmospheric background for the rest of the journey using the exact same color palette.
    const heroBlur = useTransform(orchestratedProgress, [0.35, 0.45], ["blur(0px)", "blur(40px)"]);
    const heroDarken = useTransform(orchestratedProgress, [0.35, 0.45], [0, 0.8]); // Opacity of a black overlay
    
    // The overlays fade in smoothly as the blur completes
    const sequenceOpacity = useTransform(orchestratedProgress, [0.40, 0.45], [0, 1]);

    // Final fade out for transition to the Projects monolithic rail
    const globalOpacity = useTransform(orchestratedProgress, [0.95, 1], [1, 0]);

    const { images: heroImages } = useFramePreloader();

    return (
        <section ref={containerRef} className="relative h-[800vh] bg-[#121212]">
            <motion.div 
                style={{ opacity: globalOpacity }}
                className="sticky top-0 h-screen supports-[height:100dvh]:h-[100dvh] w-full overflow-hidden"
            >
                {/* Unified Atmospheric Environment (Hero Canvas) */}
                <motion.div style={{ filter: heroBlur }} className="absolute inset-0">
                    <ScrollyCanvas scrollYProgress={heroProgress} images={heroImages} />
                    
                    {/* Darken overlay to make white text pop during the deep blur phase */}
                    <motion.div 
                        style={{ opacity: heroDarken }} 
                        className="absolute inset-0 bg-black pointer-events-none" 
                    />
                </motion.div>

                {/* Hero Typography (Fades out internally via its own progress) */}
                <HeroOverlay scrollYProgress={heroProgress} />

                {/* Sequence Overlays (No more separate 3D canvas) */}
                <motion.div style={{ opacity: sequenceOpacity }} className="absolute inset-0 z-10 pointer-events-none">
                    <GalaxyOverlay scrollYProgress={sequenceProgress} />
                    <SkillReveal scrollYProgress={sequenceProgress} />
                    <VortexTransition scrollYProgress={sequenceProgress} />
                    <FutureCity scrollYProgress={sequenceProgress} />
                </motion.div>
            </motion.div>
        </section>
    );
}
