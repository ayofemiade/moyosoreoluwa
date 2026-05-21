"use client";

import { motion } from "framer-motion";

interface SoundToggleProps {
    isMuted: boolean;
    isPlaying: boolean;
    onToggle: () => void;
    isOverHero?: boolean;
}

export default function SoundToggle({ isMuted, isPlaying, onToggle, isOverHero = true }: SoundToggleProps) {
    const colorClass = isOverHero ? "text-white/50 hover:text-white/80" : "text-foreground/40 hover:text-foreground/70";

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            onClick={onToggle}
            className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full border border-white/10 backdrop-blur-sm flex items-center justify-center transition-colors duration-500 ${colorClass}`}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
            title={isMuted ? "Unmute" : "Mute"}
        >
            {/* Sound wave bars — animated when playing */}
            <div className="flex items-end gap-[2px] h-4">
                {[0, 1, 2, 3].map((i) => (
                    <motion.div
                        key={i}
                        className="w-[2px] rounded-full bg-current"
                        animate={
                            !isMuted && isPlaying
                                ? {
                                      height: [4, 10 + i * 2, 6, 12 - i, 4],
                                  }
                                : { height: 4 }
                        }
                        transition={
                            !isMuted && isPlaying
                                ? {
                                      duration: 0.8 + i * 0.15,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                      ease: "easeInOut",
                                      delay: i * 0.1,
                                  }
                                : { duration: 0.3 }
                        }
                    />
                ))}
            </div>

            {/* Mute line overlay */}
            {isMuted && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="w-6 h-[1.5px] bg-current rotate-45 rounded-full" />
                </motion.div>
            )}
        </motion.button>
    );
}
