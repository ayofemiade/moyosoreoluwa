"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface StaggerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
    delay?: number;
}

export default function Stagger({
    children,
    className,
    staggerDelay = 0.1,
    delay = 0,
}: StaggerProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delay,
                    },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export const StaggerItem = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
