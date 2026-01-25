"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, FolderGit2, User, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const items = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "projects", label: "Projects", icon: FolderGit2, href: "#projects" },
    { id: "about", label: "About", icon: User, href: "#about" },
    { id: "skills", label: "Skills", icon: Sparkles, href: "#skills" },
    { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
];

export default function FloatingDock() {
    let mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-end gap-4 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl px-4 py-3 shadow-2xl"
        >
            {items.map((item) => (
                <DockIcon key={item.id} mouseX={mouseX} item={item} />
            ))}
        </motion.div>
    );
}

function DockIcon({ mouseX, item }: { mouseX: any; item: any }) {
    let ref = useRef<HTMLAnchorElement>(null);

    let distance = useTransform(mouseX, (val: number) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    let widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <Link href={item.href} ref={ref}>
            <motion.div
                style={{ width, height: width }}
                className="aspect-square rounded-full bg-white/5 border border-white/5 flex items-center justify-center relative group hover:bg-white/10 transition-colors"
            >
                <item.icon className="w-5 h-5 text-white/80 group-hover:text-white" />
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                    {item.label}
                </span>
            </motion.div>
        </Link>
    );
}
