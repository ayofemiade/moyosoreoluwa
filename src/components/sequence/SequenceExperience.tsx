"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { useSequencePreloader } from "./useSequencePreloader";
import { useCinematicOrchestrator } from "./useCinematicOrchestrator";
import GalaxyCanvas from "./GalaxyCanvas";
import GalaxyOverlay from "./GalaxyOverlay";
import SkillReveal from "./SkillReveal";
import VortexTransition from "./VortexTransition";
import FutureCity from "./FutureCity";

export default function SequenceExperience() {
    const containerRef = useRef<HTMLElement>(null);
    
    // We want the sequence to take up plenty of scroll height for a slow, cinematic feel
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Apply the exact same heavy cinematic inertia spring that makes the Hero feel perfect.
    // By removing plateaus, the animation flows constantly without rushed jumps or hanging.
    const orchestratedProgress = useCinematicOrchestrator(scrollYProgress, { plateaus: [] });
    const { images } = useSequencePreloader();

    // The background canvas begins partially visible to carry over atmospheric momentum from the Hero.
    // Both the canvas and container fade out over the last 10% to transition into the monolithic City/Projects area.
    const canvasOpacity = useTransform(orchestratedProgress, [0, 0.10, 0.9, 1], [0.3, 1, 1, 0]);
    const containerOpacity = useTransform(orchestratedProgress, [0.9, 1], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#121212]">
            <motion.div 
                style={{ opacity: containerOpacity }}
                className="sticky top-0 h-screen supports-[height:100dvh]:h-[100dvh] w-full overflow-hidden z-20"
            >
                <motion.div style={{ opacity: canvasOpacity }} className="absolute inset-0">
                    <GalaxyCanvas scrollYProgress={orchestratedProgress} images={images} />
                </motion.div>
                
                {/* Cinematic Overlay Layers - using orchestratedProgress ensures UI perfectly matches the canvas drift */}
                <GalaxyOverlay scrollYProgress={orchestratedProgress} />
                <SkillReveal scrollYProgress={orchestratedProgress} />
                <VortexTransition scrollYProgress={orchestratedProgress} />
                <FutureCity scrollYProgress={orchestratedProgress} />
            </motion.div>
        </section>
    );
}
