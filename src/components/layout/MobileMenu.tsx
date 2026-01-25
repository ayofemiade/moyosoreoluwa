"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
    { href: "/", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
];

export default function MobileMenu({ isOpen, setOpen }: { isOpen: boolean; setOpen: (v: boolean) => void }) {
    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center pointer-events-auto"
                >
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <nav className="flex flex-col gap-8 text-center">
                        {links.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="text-4xl font-display font-medium hover:text-accent transition-colors block"
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="absolute bottom-12 text-sm text-white/40"
                    >
                        Moyosore • 2025
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
