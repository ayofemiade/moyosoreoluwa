"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import TextSplitReveal from "@/components/motion/TextSplitReveal";
import HeroBackground from "@/components/ui/HeroBackground";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
            <HeroBackground />

            <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center gap-8">

                {/* Status Pill */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>Open to Work / Global</span>
                </motion.div>

                {/* Main Headline */}
                <div className="space-y-4">
                    <TextSplitReveal
                        text="I build web experiences that scale"
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight justify-center"
                        delay={0.2}
                    />
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-tight bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent"
                    >
                        and perform
                    </motion.h1>
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed"
                >
                    Software Engineer specializing in fast, accessible frontend systems and real-time AI agents.
                    Top 5% talent shipping to 50+ monthly users.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mt-4"
                >
                    <Link
                        href="#projects"
                        className="group relative px-8 py-3 rounded-full bg-foreground text-background font-medium overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center gap-2">
                            View Projects <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>

                    <Link
                        href="/resume.pdf" // Placeholder
                        target="_blank"
                        className="px-8 py-3 rounded-full border border-border hover:bg-white/5 transition-all text-foreground font-medium flex items-center gap-2 hover:scale-105 active:scale-95"
                    >
                        <Download className="w-4 h-4" /> Resume
                    </Link>
                </motion.div>

                {/* Hero Stats Mini */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 border-t border-white/5 pt-8"
                >
                    <HeroStat label="CGPA" value="4.65" sub="/ 5.0" />
                    <HeroStat label="Clients" value="5+" sub="Shipped" />
                    <HeroStat label="Users" value="50+" sub="Monthly" />
                    <HeroStat label="Records" value="200+" sub="Managed" />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-muted-foreground/50"
            >
                <span>Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-foreground/20 to-transparent" />
            </motion.div>
        </section>
    );
}

function HeroStat({ label, value, sub }: { label: string; value: string; sub: string }) {
    return (
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-3xl font-display font-medium text-foreground">{value}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{label} <span className="opacity-50 text-[10px]">{sub}</span></span>
        </div>
    )
}
