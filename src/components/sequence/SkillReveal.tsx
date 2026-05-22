"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface SkillRevealProps {
    scrollYProgress: MotionValue<number>;
}

const skills = [
    { name: "React", top: "15%", left: "10%", depth: 0.5 },
    { name: "Next.js", top: "25%", left: "75%", depth: 0.8 },
    { name: "TypeScript", top: "60%", left: "15%", depth: 0.6 },
    { name: "Tailwind CSS", top: "75%", left: "80%", depth: 0.4 },
    { name: "Framer Motion", top: "40%", left: "85%", depth: 0.7 },
    { name: "GSAP", top: "80%", left: "30%", depth: 0.9 },
    { name: "Three.js", top: "10%", left: "60%", depth: 0.5 },
    { name: "Node.js", top: "45%", left: "5%", depth: 0.3 },
    { name: "Python", top: "85%", left: "60%", depth: 0.8 },
    { name: "LiveKit", top: "20%", left: "40%", depth: 0.6 },
    { name: "OpenAI API", top: "65%", left: "45%", depth: 0.5 },
    { name: "Cartesia", top: "35%", left: "30%", depth: 0.7 },
    { name: "Cerebras", top: "55%", left: "65%", depth: 0.4 },
    { name: "Supabase", top: "90%", left: "10%", depth: 0.6 },
    { name: "Git", top: "5%", left: "85%", depth: 0.3 },
    { name: "Figma", top: "95%", left: "85%", depth: 0.5 },
    { name: "Docker", top: "30%", left: "55%", depth: 0.8 }
];

export default function SkillReveal({ scrollYProgress }: SkillRevealProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // Skills appear during the crystal scene (0.05 to 0.4 progress)
    const containerOpacity = useTransform(scrollYProgress, [0.05, 0.1, 0.4, 0.45], [0, 1, 1, 0]);

    return (
        <motion.div 
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
        >
            {skills.map((skill, index) => {
                // Staggered appearance based on depth and index
                const start = 0.05 + (index * 0.01);
                const peak = start + 0.05;
                const fade = 0.4;
                const end = 0.45;

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, [start, peak, fade, end], [0, skill.depth, skill.depth, 0]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const y = useTransform(scrollYProgress, [start, end], [20 * skill.depth, -50 * skill.depth]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(scrollYProgress, [start, peak, fade, end], [0.8, skill.depth + 0.2, skill.depth + 0.2, 0.8]);
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const blur = useTransform(
                    scrollYProgress, 
                    [start, peak, fade, end], 
                    ["blur(10px)", `blur(${isMobile ? 0 : (1 - skill.depth) * 4}px)`, `blur(${isMobile ? 0 : (1 - skill.depth) * 4}px)`, "blur(10px)"]
                );

                return (
                    <motion.div
                        key={skill.name}
                        style={{ 
                            opacity, 
                            y, 
                            scale,
                            filter: blur,
                            top: skill.top,
                            left: skill.left
                        }}
                        className="absolute text-white font-mono tracking-widest text-sm sm:text-base md:text-lg"
                    >
                        {skill.name}
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
