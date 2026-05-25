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

    // Skills appear beautifully during the entire vortex scene (0.35 to 0.70)
    const containerOpacity = useTransform(scrollYProgress, [0.30, 0.35, 0.68, 0.72], [0, 1, 1, 0]);

    return (
        <motion.div 
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
        >
            <div className="absolute inset-0" style={{ perspective: "1000px" }}>
                {skills.map((skill, index) => {
                    // Distributed continuously across the vortex scroll (0.35 to 0.65)
                    const start = 0.35 + (index * 0.015); // Last skill starts at ~0.59
                    const peak = start + 0.04;
                    const fade = 0.66;
                    const end = 0.70;

                    // Opacity peaks at 1 for maximum visibility, rather than being capped by depth
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const opacity = useTransform(scrollYProgress, [start, peak, fade, end], [0, 1, 1, 0]);
                    
                    // Simulate moving through space (translateZ) instead of just scaling
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const translateZ = useTransform(scrollYProgress, [start, end], [-500 * skill.depth, 600 * skill.depth]);
                    
                    // Slight environmental rotation based on scroll to make the universe feel alive
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const rotateX = useTransform(scrollYProgress, [start, end], [-10 * skill.depth, 10 * skill.depth]);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const rotateY = useTransform(scrollYProgress, [start, end], [10 * skill.depth, -10 * skill.depth]);

                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const blur = useTransform(
                        scrollYProgress, 
                        [start, peak, fade, end], 
                        ["blur(15px)", `blur(${isMobile ? 0 : (1 - skill.depth) * 4}px)`, `blur(${isMobile ? 0 : (1 - skill.depth) * 4}px)`, "blur(20px)"]
                    );

                    return (
                        <motion.div
                            key={skill.name}
                            style={{ 
                                opacity, 
                                rotateX,
                                rotateY,
                                z: translateZ,
                                filter: blur,
                                top: skill.top,
                                left: skill.left,
                                transformStyle: "preserve-3d"
                            }}
                            className="absolute text-white font-mono tracking-widest text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-[0_0_25px_rgba(255,255,255,1)]"
                        >
                            {skill.name}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
