'use client';

import { useState, useEffect } from "react";
import { Scissors, Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
    { label: "Funcionalidades", href: "#features" },
    { label: "Como funciona", href: "#how" },
    { label: "Preços", href: "#pricing" },
    { label: "Depoimentos", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
];

export default function LandingNav() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const scroll = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-card/95 backdrop-blur shadow-sm border-b border-border/50" : "bg-transparent"}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#cc9433] flex items-center justify-center shadow-md bg-[#cc9433]">
                        <Scissors className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-heading font-bold text-lg">NuviaClinics</span>
                </div>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map(l => (
                        <button key={l.href} onClick={() => scroll(l.href)}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            {l.label}
                        </button>
                    ))}
                </div>

                {/* CTAs */}
                <div className="hidden md:flex items-center gap-3">
                    <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">
                        Entrar
                    </Link>
                    <Link href="/registro" className="text-sm font-medium text-white bg-[#cc9433] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-md">
                        Testar grátis
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-1">
                    {links.map(l => (
                        <button key={l.href} onClick={() => scroll(l.href)}
                            className="block w-full text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                            {l.label}
                        </button>
                    ))}
                    <div className="pt-2 flex flex-col gap-2">
                        <Link href="/login" className="text-sm font-medium text-center py-2 rounded-lg border border-border hover:bg-muted transition-colors">Entrar</Link>
                        <Link href="/registro" className="text-sm font-medium text-center text-white bg-[#cc9433] py-2 rounded-lg hover:opacity-90">Testar grátis por 14 dias</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}