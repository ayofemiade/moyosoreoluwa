"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export default function ProjectCard({ project, className }: { project: Project; className?: string }) {
    return (
        <Link href={`/projects/${project.slug}`} className={cn("block group relative", className)}>
            <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative h-[500px] w-full md:w-[600px] rounded-3xl overflow-hidden bg-secondary/10 border border-white/5"
            >
                {/* Image Placeholder - Replace with Next/Image later */}
                <div className={cn("absolute inset-0 transition-transform duration-700 group-hover:scale-105", project.image)} />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="flex gap-2 mb-3">
                                {project.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider bg-white/20 backdrop-blur-md rounded text-white/90">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-3xl font-display font-medium text-white mb-1">{project.title}</h3>
                            <p className="text-white/70 text-lg line-clamp-2 md:w-4/5">{project.tagline}</p>
                        </div>

                        <div className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowUpRight className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Stats (Reveal on hover if needed, or always show) */}
                    {project.stats && (
                        <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-white/10">
                            {project.stats.map(stat => (
                                <div key={stat.label}>
                                    <div className="text-xl font-display text-white">{stat.value}</div>
                                    <div className="text-xs text-white/50 uppercase">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </Link>
    );
}
