"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface VortexTransitionProps {
    scrollYProgress: MotionValue<number>;
}

export default function VortexTransition({ scrollYProgress }: VortexTransitionProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Vortex intensifies from 40% to 70% scroll
    const opacity = useTransform(scrollYProgress, [0.4, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0.4, 0.75], [1, 1.5]);

    // Disable heavy CSS filters on mobile to maintain 60fps
    if (isMobile) {
        return null; 
    }

    return (
        <motion.div 
            style={{ opacity, scale }}
            className="absolute inset-0 w-full h-full pointer-events-none z-20 mix-blend-screen"
        >
            {/* Creates a subtle radial blur/glow effect over the swirling galaxy */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 backdrop-blur-[2px] opacity-30" />
        </motion.div>
    );
}
