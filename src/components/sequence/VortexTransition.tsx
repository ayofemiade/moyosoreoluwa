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

    // Disable heavy CSS filters on mobile, but keep a smooth darkening effect
    if (isMobile) {
        return (
            <motion.div style={{ opacity, scale }} className="absolute inset-0 w-full h-full pointer-events-none z-20">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />
            </motion.div>
        );
    }

    return (
        <motion.div 
            style={{ opacity, scale }}
            className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden"
        >
            {/* Obsidian Glass Background */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-md" />
            
            {/* Iridescent Metallic Sheen (Color Dodge for bright reflections) */}
            <div className="absolute inset-0 mix-blend-color-dodge opacity-30" 
                 style={{ backgroundImage: "conic-gradient(from 180deg at 50% 50%, #2a8af6 0deg, #a853ba 180deg, #e92a67 360deg)" }} 
            />

            {/* Deep Obsidian Core */}
            <div className="absolute inset-0 mix-blend-multiply opacity-90"
                 style={{ backgroundImage: "radial-gradient(ellipse at center, transparent 0%, #000000 80%)" }}
            />

            {/* Sharp Chrome Light Sweeps */}
            <motion.div 
                className="absolute inset-0 mix-blend-overlay opacity-50"
                style={{ backgroundImage: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.6) 45deg, transparent 90deg)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Ambient Bloom Edge */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
        </motion.div>
    );
}
