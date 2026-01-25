"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/content/projects";
import ProjectCard from "@/components/projects/ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsRail() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;

        if (!section || !trigger) return;

        // Calculate total width of all cards + gaps
        // We are scrolling the 'section' horizontally
        const scrollWidth = section.scrollWidth;
        const windowWidth = window.innerWidth;
        const xMove = -(scrollWidth - windowWidth + 100); // 100px padding

        const pin = gsap.fromTo(
            section,
            { x: 0 },
            {
                x: xMove,
                ease: "none",
                duration: 1,
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top",
                    end: "+=2000", // Scroll distance
                    scrub: 0.5,
                    pin: true,
                    // markers: true, // Debug
                    invalidateOnRefresh: true, // Handle resize
                },
            }
        );

        return () => {
            pin.kill();
        };
    }, []);

    return (
        <section id="projects" className="relative overflow-hidden bg-background">
            <div ref={triggerRef}>
                <div className="h-screen flex flex-col justify-center py-20">
                    <div className="container mx-auto px-6 mb-8">
                        <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-4">Selected Work</h2>
                        <p className="text-3xl md:text-5xl font-display font-medium max-w-2xl">
                            Engineering experiences that define brands.
                        </p>
                    </div>

                    <div
                        ref={sectionRef}
                        className="flex gap-8 px-6 w-max"
                    >
                        {PROJECTS.map((project) => (
                            <ProjectCard key={project.slug} project={project} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
