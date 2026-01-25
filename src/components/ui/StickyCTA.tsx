"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function StickyCTA() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 1000;
        // Show after scrolling 50% of viewport
        if (latest > viewportHeight * 0.5) {
            if (!isVisible) setIsVisible(true);
        } else {
            if (isVisible) setIsVisible(false);
        }
    });

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 right-6 z-40 hidden md:block"
                >
                    <Link
                        href="mailto:contact@moyosore.dev"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium shadow-2xl hover:scale-105 transition-transform"
                    >
                        <span>Hire Me</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
