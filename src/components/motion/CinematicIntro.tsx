"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check session storage to play only once per session
        const hasPlayed = sessionStorage.getItem("intro_played");
        if (hasPlayed) {
            setIsVisible(false);
            onComplete();
            return;
        }

        // Progress simulation
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 1;
            });
        }, 25);

        // End Intro
        const timeout = setTimeout(() => {
            finishIntro();
        }, 3000);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const finishIntro = () => {
        sessionStorage.setItem("intro_played", "true");
        setIsVisible(false);
        setTimeout(onComplete, 800); // Wait for exit animation
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground"
                >
                    {/* Subtle Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            {/* Orbiting Ring */}
                            <div className="w-16 h-16 rounded-full border-2 border-dashed border-accent/30 animate-[spin_3s_linear_infinite]" />
                            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-accent">
                                {progress}%
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-mono text-sm tracking-widest text-muted-foreground uppercase"
                        >
                            Initializing System...
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            onClick={finishIntro}
                            className="absolute top-full mt-12 text-xs text-muted-foreground/50 hover:text-foreground transition-colors uppercase tracking-widest"
                        >
                            Skip Intro
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
