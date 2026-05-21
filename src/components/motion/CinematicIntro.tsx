"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFramePreloader } from "@/components/hero/useFramePreloader";

const INTRO_PLAYED_KEY = "intro_played";

interface CinematicIntroProps {
    onComplete: () => void;
    onEnter: () => void;
}

export default function CinematicIntro({ onComplete, onEnter }: CinematicIntroProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);
    const [showEnterButton, setShowEnterButton] = useState(false);
    const hasCalledComplete = useRef(false);

    const { isLoaded, progress } = useFramePreloader();

    // Determine on mount (client-side only) whether to show the intro
    useEffect(() => {
        const alreadyPlayed = sessionStorage.getItem(INTRO_PLAYED_KEY);
        if (alreadyPlayed) {
            if (!hasCalledComplete.current) {
                hasCalledComplete.current = true;
                onComplete();
            }
        } else {
            setShouldShow(true);
            setIsVisible(true);
        }
    }, [onComplete]);

    // When progress hits 100% and assets are preloaded, show the enter button
    useEffect(() => {
        if (isLoaded && progress === 100) {
            const timer = setTimeout(() => {
                setShowEnterButton(true);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isLoaded, progress]);

    const handleEnterClick = () => {
        // Trigger sound synchronously in user click gesture to unlock Web Audio API
        onEnter();
        
        sessionStorage.setItem(INTRO_PLAYED_KEY, "true");
        setIsVisible(false);
    };

    const handleExitComplete = () => {
        if (!hasCalledComplete.current) {
            hasCalledComplete.current = true;
            onComplete();
        }
    };

    if (!shouldShow) return null;

    return (
        <AnimatePresence onExitComplete={handleExitComplete}>
            {isVisible && (
                <motion.div
                    key="cinematic-intro"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black select-none pointer-events-auto"
                >
                    {/* Subtle orbiting ring */}
                    <motion.div
                        className="absolute w-36 h-36 rounded-full border border-white/5"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/20" />
                    </motion.div>

                    <div className="relative z-10 flex flex-col items-center justify-center h-48 w-64">
                        <AnimatePresence mode="wait">
                            {!showEnterButton ? (
                                <motion.div
                                    key="loading-progress"
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-col items-center gap-6"
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

                                    <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-light">
                                        Loading experience
                                    </span>
                                </motion.div>
                            ) : (
                                <motion.button
                                    key="enter-btn"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={handleEnterClick}
                                    className="group relative flex flex-col items-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:border-white/60 bg-transparent hover:bg-white/[0.03] transition-all duration-500 cursor-pointer"
                                >
                                    <span className="text-sm font-display font-medium tracking-[0.3em] uppercase text-white group-hover:scale-105 transition-transform duration-500">
                                        Enter Site
                                    </span>
                                    <span className="text-[9px] text-white/40 tracking-wider font-light uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        Enable Audio
                                    </span>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
