"use client";

import {
    Bell,
    Search,
    Moon,
    Menu,
    Sun,
    Building2,
} from "lucide-react";
import { useEffect, useState } from "react";

export function SiteHeader() {


    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <header className="h-14 bg-card/80 backdrop-blur border-b border-border/50 flex items-center gap-3 px-4 flex-shrink-0">
            <button
                className="md:hidden text-muted-foreground hover:text-foreground p-1">

                <Menu className="w-5 h-5" />
            </button>

            <div className="flex-1 flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-1.5 max-w-sm">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                    type="text"
                    placeholder="Buscar pacientes, agendamentos..."
                    className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground" />

            </div>

            <div className="ml-auto flex items-center gap-2">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">

                    {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gold rounded-full" />
                </button>
                <div className="hidden md:flex items-center gap-2 pl-2 border-l border-border/50">
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Clínica Principal</span>
                </div>
            </div>
        </header>
    );
}