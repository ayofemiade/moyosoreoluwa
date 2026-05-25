"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { useFramePreloader } from "@/components/hero/useFramePreloader";
import ScrollyCanvas from "@/components/hero/ScrollyCanvas";
import HeroOverlay from "@/components/hero/HeroOverlay";
import { useCinematicOrchestrator } from "@/components/sequence/useCinematicOrchestrator";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const { images } = useFramePreloader();
    
    // Apply the heavy cinematic inertia spring without specific scene plateaus (Hero is one continuous sequence)
    const orchestratedProgress = useCinematicOrchestrator(scrollYProgress, { plateaus: [] });

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-[#121212]">
            <div className="sticky top-0 h-screen supports-[height:100dvh]:h-[100dvh] w-full overflow-hidden">
                <ScrollyCanvas scrollYProgress={orchestratedProgress} images={images} />
                <HeroOverlay scrollYProgress={orchestratedProgress} />
            </div>
        </section>
    );
}
