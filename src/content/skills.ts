export type SkillCategory = "Frontend" | "Backend" | "AI" | "Tools";

export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    level: number; // 1-10 (visual size)
    x?: number; // Optional custom position for mobile fallback if needed
    y?: number;
}

export const SKILLS: Skill[] = [
    // Frontend
    { id: "react", name: "React", category: "Frontend", level: 9 },
    { id: "nextjs", name: "Next.js", category: "Frontend", level: 9 },
    { id: "typescript", name: "TypeScript", category: "Frontend", level: 9 },
    { id: "tailwind", name: "Tailwind CSS", category: "Frontend", level: 9 },
    { id: "framer", name: "Framer Motion", category: "Frontend", level: 8 },
    { id: "gsap", name: "GSAP", category: "Frontend", level: 7 },
    { id: "threejs", name: "Three.js", category: "Frontend", level: 6 },

    // AI & Backend
    { id: "node", name: "Node.js", category: "Backend", level: 8 },
    { id: "python", name: "Python", category: "Backend", level: 7 },
    { id: "livekit", name: "LiveKit", category: "AI", level: 8 },
    { id: "openai", name: "OpenAI API", category: "AI", level: 8 },
    { id: "cartesia", name: "Cartesia", category: "AI", level: 7 },
    { id: "cerebras", name: "Cerebras", category: "AI", level: 6 },
    { id: "supabase", name: "Supabase", category: "Backend", level: 8 },

    // Tools
    { id: "git", name: "Git", category: "Tools", level: 9 },
    { id: "figma", name: "Figma", category: "Tools", level: 7 },
    { id: "docker", name: "Docker", category: "Tools", level: 6 },
];
