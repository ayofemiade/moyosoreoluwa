"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SKILLS } from "@/content/skills";
import SkillNode from "@/components/ui/SkillNode";
import { useMobilePerformance } from "@/hooks/useMobilePerformance";

export default function SkillsGalaxy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { isMobile, prefersReducedMotion } = useMobilePerformance();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Disable rotation/scale if reduced motion
    const rotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 45]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], prefersReducedMotion ? [1, 1, 1] : [0.8, 1, 0.8]);

    return (
        <section id="skills" ref={containerRef} className="min-h-screen flex flex-col items-center justify-center overflow-hidden py-32 relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50" />

            <div className="text-center z-10 mb-16 px-4">
                <h2 className="text-base font-mono uppercase tracking-widest text-muted-foreground mb-4">Tech Ecosystem</h2>
                <p className="text-2xl md:text-5xl font-display font-medium">The Galaxy of Skills</p>
            </div>

            <div className="relative w-full max-w-[800px] h-[400px] md:w-[1000px] md:h-[800px] flex items-center justify-center pointer-events-none md:pointer-events-auto">
                <motion.div
                    style={{ rotate, scale }}
                    className="relative w-full h-full"
                >
                    {/* Center Core */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/20 rounded-full blur-[60px]" />

                    {SKILLS.map((skill, index) => (
                        <SkillNode key={skill.id} skill={skill} index={index} total={SKILLS.length} isMobile={isMobile} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
