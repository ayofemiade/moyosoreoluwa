export interface Project {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    tags: string[];
    year: string;
    links: {
        demo?: string;
        github?: string;
    };
    image: string;        // Path to ambient preview image
    accentColor: string;  // CSS color for accent line and glows
    glowColor: string;    // RGBA for the full-screen ambient atmosphere
    stats?: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
    {
        slug: "convergs-ai",
        title: "ConvergsAI",
        tagline: "Real-time AI Voice Agent Platform",
        description: "An AI-powered customer service agent that talks like a human. Built with LiveKit, Cartesia, and Cerebras for sub-500ms latency.",
        tags: ["Next.js", "Python", "LiveKit", "AI"],
        year: "2025",
        links: { demo: "https://convergs-ai-tdno.vercel.app/" },
        image: "/projects/convergs-ai.png",
        accentColor: "#818cf8",
        glowColor: "rgba(99, 102, 241, 0.15)",
        stats: [
            { label: "Latency", value: "<500ms" },
            { label: "Users", value: "Beta" }
        ]
    },
    {
        slug: "resobridge",
        title: "ResoBridge",
        tagline: "Resource Allocation Dashboard",
        description: "Algorithm-based university resource allocation dashboard. I led the frontend architecture and visualization.",
        tags: ["Next.js", "Recharts", "Algorithm"],
        year: "2024",
        links: { demo: "https://resobridge.netlify.app/" },
        image: "/projects/resobridge.png",
        accentColor: "#f97316",
        glowColor: "rgba(249, 115, 22, 0.15)",
        stats: [
            { label: "Efficiency", value: "+40%" }
        ]
    },
    {
        slug: "sbo-foundation",
        title: "SBO Foundation",
        tagline: "Impact & Donation Platform",
        description: "A digital platform for the SBO Foundation to manage donations, events, and community impact stories.",
        tags: ["Next.js", "Tailwind", "Supabase"],
        year: "2025",
        links: { demo: "https://sbofoundation.ng/" },
        image: "/projects/sbo-foundation.png",
        accentColor: "#34d399",
        glowColor: "rgba(52, 211, 153, 0.15)",
        stats: [
            { label: "Monthly Users", value: "50+" },
            { label: "Donations", value: "$5k+" }
        ]
    },
    {
        slug: "locoba",
        title: "LOCOBA Alumni",
        tagline: "Alumni Directory & Payments",
        description: "A comprehensive directory for 200+ alumni records, featuring event management and payment processing.",
        tags: ["React", "Node.js", "PostgreSQL"],
        year: "2024",
        links: { demo: "https://www.locoba.org/" },
        image: "/projects/locoba.png",
        accentColor: "#60a5fa",
        glowColor: "rgba(96, 165, 250, 0.15)",
        stats: [
            { label: "Records", value: "200+" },
            { label: "Events", value: "10+" }
        ]
    }
];
