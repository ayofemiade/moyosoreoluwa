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
    image: string; // Placeholder color or path
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
        image: "bg-indigo-500", // Will replace with real image later
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
        image: "bg-orange-500",
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
        image: "bg-green-600",
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
        image: "bg-blue-600",
        stats: [
            { label: "Records", value: "200+" },
            { label: "Events", value: "10+" }
        ]
    }
];
