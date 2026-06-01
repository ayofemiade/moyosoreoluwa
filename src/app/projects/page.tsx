"use client";

import { useState } from "react";
import { PROJECTS } from "@/content/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import { Search } from "lucide-react";

const FILTERS = ["All", "AI Agents", "Frontend", "Full-Stack"];

export default function ProjectsPage() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

    const filteredProjects = PROJECTS.filter((p) => {
        const matchesFilter = filter === "All" || p.tags.some(t => {
            if (filter === "AI Agents") return t.includes("AI") || t.includes("LiveKit");
            if (filter === "Frontend") return t.includes("React") || t.includes("Tailwind");
            if (filter === "Full-Stack") return t.includes("Node") || t.includes("Database") || t.includes("Python");
            return false;
        });

        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <main className="min-h-screen pt-32 px-6 container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                <div>
                    <h1 className="text-4xl md:text-6xl font-display font-medium mb-4">All Projects</h1>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        A collection of high-performance web applications and AI systems.
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full md:w-64 pl-9 pr-4 py-2 rounded-full bg-secondary/20 border border-white/5 focus:outline-none focus:border-accent/50 transition-colors placeholder:text-muted-foreground/50"
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-8 scrollbar-hide">
                {FILTERS.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === f
                                ? "bg-foreground text-background"
                                : "bg-secondary/10 hover:bg-secondary/20 text-muted-foreground"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
                {filteredProjects.map((project, index) => (
                    <ProjectCard
                        key={project.slug}
                        project={project}
                        index={index}
                        className="md:!w-full"
                        isHovered={hoveredSlug === project.slug}
                        onHover={setHoveredSlug}
                    />
                ))}

                {filteredProjects.length === 0 && (
                    <div className="col-span-full py-20 text-center text-muted-foreground">
                        No projects found matching your criteria.
                    </div>
                )}
            </div>
        </main>
    );
}
