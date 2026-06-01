export interface TimelineItem {
    year: string;
    title: string;
    role: string;
    description: string;
    tags: string[];
    accentColor: string;
    glowColor: string;
    sysNode: string;
}

export const TIMELINE: TimelineItem[] = [
    {
        year: "Now",
        title: "Global Roles",
        role: "Software Engineer",
        description: "Open to remote roles globally. Building high-performance web systems and AI agents.",
        tags: ["Open for Work", "Remote"],
        accentColor: "#06b6d4",
        glowColor: "rgba(6, 182, 212, 0.08)",
        sysNode: "SYS.NODE_01",
    },
    {
        year: "2025",
        title: "ConvergsAI + SBO Foundation",
        role: "Founder & Lead Engineer",
        description: "Built and shipped a real-time AI voice agent platform (ConvergsAI) and a comprehensive donation platform (SBO).",
        tags: ["LiveKit", "Next.js", "AI", "Supabase"],
        accentColor: "#8b5cf6",
        glowColor: "rgba(139, 92, 246, 0.08)",
        sysNode: "SYS.NODE_02",
    },
    {
        year: "2024",
        title: "LOCOBA + ResoBridge",
        role: "Frontend Engineer",
        description: "Developed an alumni directory system and led frontend for a university resource allocation dashboard.",
        tags: ["React", "PostgreSQL", "Algorithms"],
        accentColor: "#f59e0b",
        glowColor: "rgba(245, 158, 11, 0.08)",
        sysNode: "SYS.NODE_03",
    },
    {
        year: "2023",
        title: "Moyocode",
        role: "Founder & Freelancer",
        description: "Started Moyocode agency. Delivered 5+ client projects focusing on speed and lead generation.",
        tags: ["Freelance", "Web Dev"],
        accentColor: "#10b981",
        glowColor: "rgba(16, 185, 129, 0.08)",
        sysNode: "SYS.NODE_04",
    },
];
