"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { SOCIALS } from "@/content/socials";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Contact() {
    const [copied, setCopied] = useState(false);
    const email = "contact@moyosore.dev";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-32 px-6 min-h-[80vh] flex flex-col justify-center items-center text-center">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-8">What&apos;s Next?</h2>
                    <h3 className="text-5xl md:text-8xl font-display font-medium tracking-tight mb-8">
                        Let&apos;s build something <span className="text-accent">impossible</span>.
                    </h3>
                    <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
                        I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                    </p>
                </motion.div>

                {/* Email Copy */}
                <motion.button
                    onClick={handleCopy}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mb-16"
                >
                    <span className="text-2xl md:text-3xl font-mono">{email}</span>
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </div>
                    {copied && (
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-mono text-green-500 bg-background/50 backdrop-blur px-2 py-1 rounded"
                        >
                            Copied!
                        </motion.span>
                    )}
                </motion.button>

                {/* Socials */}
                <div className="flex justify-center gap-8">
                    {SOCIALS.map((social) => (
                        <Link
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                        >
                            <social.icon className="w-6 h-6" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
