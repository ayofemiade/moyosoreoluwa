"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { useSequencePreloader } from "./useSequencePreloader";
import { useSmoothScrub } from "./useSmoothScrub";
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

    const smoothProgress = useSmoothScrub(scrollYProgress);
    const { images } = useSequencePreloader();

    // Fade in the entire sequence over the first 10% of scroll to crossfade with the Hero
    // Fade out over the last 10% to transition smoothly into ProjectsRail
    const opacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#121212]">
            <motion.div 
                style={{ opacity }}
                className="sticky top-0 h-screen supports-[height:100dvh]:h-[100dvh] w-full overflow-hidden z-20"
            >
                <GalaxyCanvas scrollYProgress={smoothProgress} images={images} />
                
                {/* Cinematic Overlay Layers */}
                <GalaxyOverlay scrollYProgress={smoothProgress} />
                <SkillReveal scrollYProgress={smoothProgress} />
                <VortexTransition scrollYProgress={smoothProgress} />
                <FutureCity scrollYProgress={smoothProgress} />
            </motion.div>
        </section>
    );
}
