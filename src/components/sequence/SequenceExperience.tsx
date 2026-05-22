"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
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

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#121212]">
            <div className="sticky top-0 h-screen supports-[height:100dvh]:h-[100dvh] w-full overflow-hidden">
                <GalaxyCanvas scrollYProgress={smoothProgress} images={images} />
                
                {/* Cinematic Overlay Layers */}
                <GalaxyOverlay scrollYProgress={smoothProgress} />
                <SkillReveal scrollYProgress={smoothProgress} />
                <VortexTransition scrollYProgress={smoothProgress} />
                <FutureCity scrollYProgress={smoothProgress} />
            </div>
        </section>
    );
}
