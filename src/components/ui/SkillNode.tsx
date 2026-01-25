"use client";

import { motion } from "framer-motion";
import { Skill } from "@/content/skills";
import { cn } from "@/lib/utils";

const categoryColors = {
    Frontend: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    Backend: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    AI: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    Tools: "bg-orange-500/10 text-orange-300 border-orange-500/20",
};

export default function SkillNode({ skill, index, total, isMobile }: { skill: Skill; index: number; total: number; isMobile: boolean }) {
    // Generate random positions for a galaxy feel (deterministic based on index for hydration stability ideally, but random for visual chaos here)
    // In a real galaxy, we'd use a physics simulation or pre-calculated positions.
    // For this demo, we'll use a spiral layout.

    const angle = (index / total) * Math.PI * 2 * 3; // 3 spirals
    const radius = (100 + (index * 18)) * (isMobile ? 0.5 : 1); // Expand outwards, tighter on mobile

    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * (radius * (isMobile ? 1.5 : 0.6)); // Flattened circle (galaxy shape) on desktop, taller on mobile

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5, type: "spring" }}
            className="absolute top-1/2 left-1/2"
            style={{ x, y }}
        >
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{
                    duration: 4 + (index % 3), // Deterministic duration based on index
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (index % 5) * 0.4 // Deterministic delay based on index
                }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                className={cn(
                    "px-4 py-2 rounded-full border backdrop-blur-sm cursor-pointer transition-colors shadow-[0_0_15px_rgba(0,0,0,0.1)]",
                    categoryColors[skill.category],
                    "hover:bg-white/10 hover:border-white/30 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                )}
            >
                <span className="text-sm font-medium whitespace-nowrap">{skill.name}</span>
            </motion.div>
        </motion.div>
    );
}
