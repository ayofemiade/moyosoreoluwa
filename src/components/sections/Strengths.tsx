"use client";

import { ABOUT_CONTENT } from "@/content/copy";
import { Cpu, Zap, Rocket, Layers } from "lucide-react";
import Stagger, { StaggerItem } from "@/components/motion/Stagger";

const icons = {
    ai: Cpu,
    perf: Zap,
    ship: Rocket,
    full: Layers
}

export default function Strengths() {
    return (
        <section className="py-24 px-6 flex justify-center">
            <Stagger className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {ABOUT_CONTENT.strengths.map((strength, i) => {
                    const Icon = icons[strength.id as keyof typeof icons] || Layers;
                    return (
                        <StaggerItem
                            key={strength.id}
                            className="group p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
                        >
                            <div className="mb-6 inline-flex p-3 rounded-xl bg-accent/10 text-accent">
                                <Icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-display font-medium mb-3">{strength.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{strength.description}</p>
                        </StaggerItem>
                    )
                })}
            </Stagger>
        </section>
    );
}
