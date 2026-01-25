"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollThemeController() {
    const { scrollY } = useScroll();
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useMotionValueEvent(scrollY, "change", (latest) => {
        // We will use precise element tracking later, for now we use rough estimates or getElementById
        const projectsSection = document.getElementById("projects");
        const contactSection = document.getElementById("contact");

        if (projectsSection && contactSection) {
            const projectsTop = projectsSection.offsetTop - 300; // Trigger before reaching
            const contactTop = contactSection.offsetTop - 300;

            if (latest >= projectsTop && latest < contactTop) {
                if (theme !== "dark") setTheme("dark");
            } else {
                if (theme !== "light") setTheme("light");
            }
        } else {
            // Fallback for demo if sections don't exist yet
            if (latest > 800) {
                // setTheme("dark"); // Disabled for now until sections exist
            }
        }
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return null; // Logic only component
}
