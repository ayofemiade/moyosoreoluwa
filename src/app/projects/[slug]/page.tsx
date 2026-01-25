import { notFound } from "next/navigation";
import { PROJECTS } from "@/content/projects";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Metadata } from "next";

// This is a server component by default
// We need to generate static params for SSG
export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const project = PROJECTS.find((p) => p.slug === slug);
    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Moyosore`,
        description: project.description,
    };
}


export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project = PROJECTS.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <article className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Back Link */}
                <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium border border-border text-muted-foreground">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-medium mb-4">{project.title}</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">{project.tagline}</p>
                </div>

                {/* Hero Image (Placeholder) */}
                <div className={`w-full aspect-video rounded-3xl mb-16 ${project.image} opacity-80`} />

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-xl font-display font-medium mb-4">Overview</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {project.description}
                                {/* Expandable description would go here */}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Links */}
                        <div className="p-6 rounded-2xl bg-secondary/5 border border-white/5 space-y-4">
                            <h3 className="font-medium">Links</h3>
                            {project.links.demo && (
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-muted-foreground hover:text-accent transition-colors">
                                    Live Demo <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                            {project.links.github && (
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-muted-foreground hover:text-accent transition-colors">
                                    Source Code <Github className="w-4 h-4" />
                                </a>
                            )}
                        </div>

                        {/* Stats */}
                        {project.stats && (
                            <div className="p-6 rounded-2xl bg-secondary/5 border border-white/5 space-y-4">
                                <h3 className="font-medium">Impact</h3>
                                {project.stats.map(stat => (
                                    <div key={stat.label} className="flex justify-between items-end border-b border-white/5 pb-2 last:border-0 last:pb-0">
                                        <span className="text-sm text-muted-foreground">{stat.label}</span>
                                        <span className="font-display font-medium">{stat.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
