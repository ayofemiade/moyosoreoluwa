"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const [isMobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 pointer-events-none backdrop-blur-md bg-background/50"
            >
                <div className="pointer-events-auto">
                    <Link href="/" className="group relative flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        <span className="font-display font-medium text-lg tracking-tight">MOYOSORE</span>
                    </Link>
                </div>

                <div className="pointer-events-auto">
                    {/* Mobile Menu Trigger */}
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="md:hidden p-2 -mr-2 text-foreground/80 hover:text-foreground"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Desktop Link */}
                    <Link
                        href="mailto:contact@moyosore.dev"
                        className="hidden md:block text-sm text-foreground/60 hover:text-foreground transition-colors"
                    >
                        Available for work
                    </Link>
                </div>
            </motion.header>
            <MobileMenu isOpen={isMobileOpen} setOpen={setMobileOpen} />
        </>
    );
}
