export interface TimelineItem {
    year: string;
    title: string;
    role: string;
    description: string;
    tags: string[];
}

export const TIMELINE: TimelineItem[] = [
    {
        year: "Now",
        title: "Global Roles",
        role: "Software Engineer",
        description: "Open to remote roles globally. Building high-performance web systems and AI agents.",
        tags: ["Open for Work", "Remote"],
    },
    {
        year: "2025",
        title: "ConvergsAI + SBO Foundation",
        role: "Founder & Lead Engineer",
        description: "Built and shipped a real-time AI voice agent platform (ConvergsAI) and a comprehensive donation platform (SBO).",
        tags: ["LiveKit", "Next.js", "AI", "Supabase"],
    },
    {
        year: "2024",
        title: "LOCOBA + ResoBridge",
        role: "Frontend Engineer",
        description: "Developed an alumni directory system and led frontend for a university resource allocation algorithm dashboard.",
        tags: ["React", "PostgreSQL", "Algorithms"],
    },
    {
        year: "2023",
        title: "Moyocode",
        role: "Founder & Freelancer",
        description: "Started Moyocode agency. Delivered 5+ client projects focusing on speed and lead generation.",
        tags: ["Freelance", "Web Dev"],
    },
];
