"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFramePreloader } from "@/components/hero/useFramePreloader";

interface CinematicIntroProps {
    onComplete: () => void;
    onEnter: () => void;
}

export default function CinematicIntro({ onComplete, onEnter }: CinematicIntroProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);
    const [showEnter, setShowEnter] = useState(false);
    const hasCalledComplete = useRef(false);

    const { isLoaded, progress } = useFramePreloader();

    // Determine on mount (client-side only) whether to show the intro
    useEffect(() => {
        setShouldShow(true);
        setIsVisible(true);
    }, []);

    // When loading finishes, show the Enter button instead of auto-exiting
    useEffect(() => {
        if (!shouldShow) return;
        if (isLoaded) {
            setShowEnter(true);
        }
    }, [isLoaded, shouldShow]);

    const handleEnterClick = () => {
        // Play the sound synchronously in the call stack of the click event
        onEnter();
        setIsVisible(false);
    };

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
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none"
                >
                    {/* Orbiting ring */}
                    <motion.div
                        className="absolute w-36 h-36 rounded-full border border-white/5"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/20" />
                    </motion.div>

                    <div className="relative z-10 flex flex-col items-center justify-center h-48 w-full max-w-xs">
                        <AnimatePresence mode="wait">
                            {!showEnter ? (
                                <motion.div
                                    key="loader"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center gap-6"
                                >
                                    {/* Progress counter */}
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
                            ) : (
                                <motion.div
                                    key="enter-button"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-col items-center gap-4"
                                >
                                    <motion.button
                                        onClick={handleEnterClick}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group relative px-8 py-3 rounded-full border border-white/20 hover:border-white/80 bg-transparent text-white text-sm font-medium tracking-[0.2em] uppercase overflow-hidden transition-colors duration-500"
                                    >
                                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                                        Enter Experience
                                    </motion.button>
                                    <span className="text-[10px] text-white/40 uppercase tracking-[0.15em]">
                                        Sound Recommended
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

