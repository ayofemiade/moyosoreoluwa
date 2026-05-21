"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { useFramePreloader } from "@/components/hero/useFramePreloader";
import ScrollyCanvas from "@/components/hero/ScrollyCanvas";
import HeroOverlay from "@/components/hero/HeroOverlay";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const { images } = useFramePreloader();

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-[#121212]">
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
                <ScrollyCanvas scrollYProgress={scrollYProgress} images={images} />
                <HeroOverlay scrollYProgress={scrollYProgress} />
            </div>
        </section>
    );
}
