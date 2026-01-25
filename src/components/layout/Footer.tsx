export default function Footer() {
    return (
        <footer className="py-8 text-center text-xs text-muted-foreground border-t border-white/5">
            <p>&copy; {new Date().getFullYear()} Moyosore. All rights reserved.</p>
            <p className="mt-2 text-white/20">Designed & Engineered in 2025.</p>
        </footer>
    );
}
