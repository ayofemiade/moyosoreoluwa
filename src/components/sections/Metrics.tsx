"use client";

import { motion, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ABOUT_CONTENT } from "@/content/copy";

export default function Metrics() {
    return (
        <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-16">Proof of Work</h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 w-full">
                    {ABOUT_CONTENT.metrics.map((metric, i) => (
                        <MetricItem key={i} metric={metric} delay={i * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function MetricItem({ metric, delay }: { metric: any; delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const spring = useSpring(0, { bounce: 0, duration: 2000 });

    useEffect(() => {
        if (isInView) {
            spring.set(Number(metric.value));
        }
    }, [isInView, spring, metric.value]);

    return (
        <div ref={ref} className="flex flex-col items-center text-center">
            <span className="text-4xl md:text-5xl font-display font-medium mb-2 flex items-baseline">
                {/* Simplified Counter for demo, could use useTransform for float values */}
                {metric.value}{metric.suffix}
            </span>
            <span className="text-sm text-muted-foreground">{metric.label}</span>
        </div>
    )
}
