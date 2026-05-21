"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFramePreloader } from "@/components/hero/useFramePreloader";

const INTRO_PLAYED_KEY = "intro_played";

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);
    const hasCalledComplete = useRef(false);

    const { isLoaded, progress } = useFramePreloader();

    // Determine on mount (client-side only) whether to show the intro
    useEffect(() => {
        const alreadyPlayed = sessionStorage.getItem(INTRO_PLAYED_KEY);
        if (alreadyPlayed) {
            // Skip intro — fire onComplete immediately
            if (!hasCalledComplete.current) {
                hasCalledComplete.current = true;
                onComplete();
            }
        } else {
            setShouldShow(true);
            setIsVisible(true);
        }
    }, [onComplete]);

    // When loading finishes, begin exit
    useEffect(() => {
        if (!shouldShow) return;
        if (isLoaded) {
            const timer = setTimeout(() => {
                sessionStorage.setItem(INTRO_PLAYED_KEY, "true");
                setIsVisible(false);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [isLoaded, shouldShow]);

    const handleExitComplete = () => {
        if (!hasCalledComplete.current) {
            hasCalledComplete.current = true;
            onComplete();
        }
    };

    // If skipping, render nothing
    if (!shouldShow) return null;

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {isVisible && (
                <motion.div
                    key="cinematic-intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
                >
                    {/* Subtle orbiting ring */}
                    <motion.div
                        className="absolute w-32 h-32 rounded-full border border-white/10"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/40" />
                    </motion.div>

                    {/* Progress counter */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="relative z-10 flex flex-col items-center gap-6"
                    >
                        <span className="text-6xl md:text-8xl font-display font-light tracking-tighter text-white tabular-nums">
                            {progress}
                            <span className="text-white/30 text-4xl md:text-5xl">%</span>
                        </span>

                        {/* Progress bar */}
                        <div className="w-48 h-[1px] bg-white/10 overflow-hidden rounded-full">
                            <motion.div
                                className="h-full bg-white/60"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        <span className="text-xs text-white/30 uppercase tracking-[0.3em] font-light">
                            Loading experience
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
