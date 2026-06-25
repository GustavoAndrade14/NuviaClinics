"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    Users,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Scissors,
    FileText,
    DollarSign,
    Package,
    Target,
    TrendingUp,
    Settings,
    LogOut,
} from "lucide-react";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Pacientes", path: "/pacientes" },
    { icon: Calendar, label: "Agendamentos", path: "/agendamentos" },
    { icon: Scissors, label: "Procedimentos", path: "/procedimentos" },
    { icon: Users, label: "Profissionais", path: "/profissionais" },
    { icon: FileText, label: "Prontuários", path: "/prontuarios" },
    { icon: DollarSign, label: "Financeiro", path: "/financeiro" },
    { icon: Package, label: "Estoque", path: "/estoque" },
    { icon: Target, label: "CRM", path: "/crm" },
    { icon: TrendingUp, label: "Relatórios", path: "/relatorios" },
    { icon: Settings, label: "Configurações", path: "/configuracoes" }
];

export function AppSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`
        relative
        bg-card
        border-r
        transition-all
        duration-300
        ${collapsed ? "w-16" : "w-64"}
      `}
        >
            <div className="h-full flex flex-col">
                {/* Logo */}
                <div className={`flex items-center gap-3 px-4 py-5 border-b border-border/50 ${collapsed ? "justify-center" : ""}`}>
                    <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center flex-shrink-0 shadow-md">
                        <Scissors className="w-4 h-4 text-white" />
                    </div>
                    {!collapsed &&
                        <div>
                            <p className="font-heading font-bold text-sm text-foreground leading-none">BeautyClinic</p>
                            <p className="text-xs text-muted-foreground font-body mt-0.5">ERP Premium</p>
                        </div>
                    }
                </div>

                {/* Menu */}
                <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
                    {navItems.map((item) => {
                        // CORRIGIDO: usando pathname do Next.js em vez de location
                        const active = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative text-[hsl(var(--muted-foreground))] ${active ?
                                    "bg-gold-light text-gold font-medium shadow-sm" :
                                    "hover:text-foreground hover:bg-muted"} ${collapsed ? "justify-center" : ""}`}
                                title={collapsed ? item.label : undefined}
                            >
                                {active &&
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gold rounded-r-full" />
                                }
                                <item.icon className={`w-4.5 h-4.5 flex-shrink-0 ${active ? "text-gold" : ""}`} style={{ width: 18, height: 18 }} />
                                {!collapsed && <span className="text-sm">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className={`px-2 pb-4 border-t border-border/50 pt-3`}>
                    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${collapsed ? "justify-center" : ""}`}>
                        <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            A
                        </div>
                        {!collapsed &&
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">Administrador</p>
                                <p className="text-xs text-muted-foreground truncate">{""}</p>
                            </div>
                        }
                        {!collapsed &&
                            <button
                                className="text-muted-foreground hover:text-destructive transition-colors p-1"
                                title="Sair"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        }
                    </div>
                </div>
            </div>

            {/* Collapse */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="
          absolute
          top-1/2
          -right-3
          -translate-y-1/2
          bg-background
          border
          rounded-full
          p-1
        "
            >
                {collapsed ? (
                    <ChevronRight size={14} />
                ) : (
                    <ChevronLeft size={14} />
                )}
            </button>
        </aside>
    );
}