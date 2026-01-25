"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "none";
    fullWidth?: boolean;
}

export default function FadeIn({
    children,
    className,
    delay = 0,
    duration = 0.5,
    direction = "up", // Default to slide up
    fullWidth = false,
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: yOffset }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98] // Smooth custom easing
            }}
            className={cn(fullWidth ? "w-full" : "", className)}
        >
            {children}
        </motion.div>
    );
}
