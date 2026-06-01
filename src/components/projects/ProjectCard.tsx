"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
    project: Project;
    index: number;
    className?: string;
    isHovered: boolean;
    onHover: (slug: string | null) => void;
}

export default function ProjectCard({ project, index, className, isHovered, onHover }: ProjectCardProps) {
    const indexLabel = String(index + 1).padStart(2, "0");

    return (
        <Link
            href={`/projects/${project.slug}`}
            className={cn("block group relative", className)}
            onMouseEnter={() => onHover(project.slug)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(project.slug)}
            onBlur={() => onHover(null)}
        >
            {/* Full-height cinematic card container */}
            <div className="relative h-[80vh] md:h-screen supports-[height:100dvh]:h-[100dvh] w-full md:w-[780px] border-b md:border-b-0 md:border-r border-white/[0.06] flex flex-col justify-end overflow-hidden">

                {/* Ambient image — revealed on hover with a parallax pull */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={isHovered
                        ? { opacity: 1, scale: 1.0 }
                        : { opacity: 0, scale: 1.08 }
                    }
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                {/* Permanent obsidian gradient — makes text legible in all states */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

                {/* Accent color bloom on hover */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.7 }}
                    style={{
                        background: `radial-gradient(ellipse at 50% 80%, ${project.glowColor} 0%, transparent 70%)`
                    }}
                />

                {/* TOP ROW: Index + Tags */}
                <div className="absolute top-8 md:top-12 left-8 md:left-12 right-8 md:right-12 flex justify-between items-start">
                    <motion.span
                        className="font-mono text-[10px] uppercase tracking-[0.35em]"
                        animate={{ color: isHovered ? project.accentColor : "rgba(255,255,255,0.2)" }}
                        transition={{ duration: 0.5 }}
                    >
                        {indexLabel}
                    </motion.span>
                    <div className="flex flex-wrap justify-end gap-x-4 gap-y-1 max-w-[60%]">
                        {project.tags.map(tag => (
                            <motion.span
                                key={tag}
                                className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em]"
                                animate={{ color: isHovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)" }}
                                transition={{ duration: 0.4 }}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* CONTENT: Bottom-anchored editorial block */}
                <div className="relative z-10 p-8 md:p-12 flex flex-col gap-4 md:gap-6">

                    {/* The sweeping accent line */}
                    <div className="relative w-full h-[1px] overflow-hidden">
                        <div className="absolute inset-0 bg-white/10" />
                        <motion.div
                            className="absolute inset-y-0 left-0 h-full"
                            style={{ backgroundColor: project.accentColor }}
                            initial={{ scaleX: 0, originX: 0 }}
                            animate={{ scaleX: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </div>

                    {/* Year */}
                    <motion.span
                        className="font-mono text-[10px] uppercase tracking-[0.3em]"
                        animate={{ color: isHovered ? project.accentColor : "rgba(255,255,255,0.25)" }}
                        transition={{ duration: 0.4 }}
                    >
                        {project.year}
                    </motion.span>

                    {/* Project Title */}
                    <motion.h3
                        className="font-display font-medium tracking-tighter leading-none text-white"
                        style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
                        animate={{
                            x: isHovered ? 8 : 0,
                            opacity: isHovered ? 1 : 0.4
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {project.title}
                    </motion.h3>

                    {/* Tagline + Arrow — slides up on hover */}
                    <motion.div
                        className="flex justify-between items-end gap-4"
                        initial={{ y: 12, opacity: 0 }}
                        animate={isHovered ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-white/60 text-base md:text-xl font-light leading-snug max-w-xs md:max-w-sm">
                            {project.tagline}
                        </p>

                        <motion.div
                            className="w-10 h-10 md:w-14 md:h-14 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-500"
                            style={{ borderColor: project.accentColor }}
                            animate={{ backgroundColor: isHovered ? project.accentColor : "transparent" }}
                            transition={{ duration: 0.4 }}
                        >
                            <ArrowUpRight
                                className="w-5 h-5 md:w-6 md:h-6"
                                style={{ color: isHovered ? "#000" : project.accentColor }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Stats — slide up after tagline */}
                    {project.stats && (
                        <motion.div
                            className="grid grid-cols-2 gap-4 md:gap-8 pt-4 md:pt-6 border-t border-white/[0.07]"
                            initial={{ y: 16, opacity: 0 }}
                            animate={isHovered ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {project.stats.map(stat => (
                                <div key={stat.label}>
                                    <div
                                        className="text-2xl md:text-3xl font-display font-medium mb-0.5"
                                        style={{ color: project.accentColor }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-[9px] md:text-[10px] font-mono text-white/30 uppercase tracking-widest">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </Link>
    );
}
