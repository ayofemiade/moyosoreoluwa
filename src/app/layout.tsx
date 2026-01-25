import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import FloatingDock from "@/components/layout/FloatingDock";
import ScrollThemeController from "@/components/motion/ScrollThemeController";
import StickyCTA from "@/components/ui/StickyCTA";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Moyosore | Anti-Gravity Engineer",
  description: "Software Engineer | Frontend & AI Systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body
        className={`${inter.variable} font-sans bg-background text-foreground overflow-x-hidden`}
      >
        <SmoothScrollProvider>
          <ScrollThemeController />
          <Navbar />
          <StickyCTA />
          {children}
          <FloatingDock />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
