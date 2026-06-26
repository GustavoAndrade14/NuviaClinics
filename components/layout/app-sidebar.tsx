/* eslint-disable @typescript-eslint/no-explicit-any */
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
    ChevronDown,
    Scissors,
    FileText,
    DollarSign,
    Package,
    Target,
    TrendingUp,
    Settings,
    LogOut,
    UserCog,
    UserPlus,
    UserCheck,
    ShoppingBag,
    HandHeart,
    PackageOpen,
    SquarePen,
    House,
} from "lucide-react";

// ============================================
// TIPOS PARA NAVEGAÇÃO COM SUBMENUS
// ============================================

interface NavItem {
    icon: any;
    label: string;
    path?: string;
    subItems?: NavSubItem[];
}

interface NavSubItem {
    icon?: any;
    label: string;
    path: string;
}

// ============================================
// CONFIGURAÇÃO DOS ITENS DE NAVEGAÇÃO
// ============================================

const navItems: NavItem[] = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/dashboard"
    },
    {
        icon: Calendar,
        label: "Agenda",
        path: "/agenda"
    },
    {
        icon: Users,
        label: "Pacientes",
        path: "/pacientes",
    },
    {
        icon: ShoppingBag,
        label: "Vendas",
        path: "/vendas",
    },
    {
        icon: HandHeart,
        label: "Atendimento",
        subItems: [
            { label: "Agendamentos", path: "/agendamentos" },
            { label: "Anamnese", path: "/anamnese" },
            { label: "Receituários", path: "/receituarios" },
            { label: "Termos de Consentimento", path: "/termos" },
            { label: "Atestados", path: "/atestados" },
        ]
    },
    {
        icon: DollarSign,
        label: "Financeiro",
        subItems: [
            { label: "Contas a Receber", path: "/contas-receber" },
            { label: "Contas a Pagar", path: "/contas-pagar" },
        ]
    },
    {
        icon: PackageOpen,
        label: "Estoque",
        subItems: [
            { label: "Movimentaçoes de Estoque", path: "/movimentacoes" },
            { label: "Estoque Atual", path: "/estoque" },
        ]
    },
    {
        icon: SquarePen,
        label: "Cadastro",
        subItems: [
            { label: "Produtos", path: "/produtos" },
            { label: "Procedimentos", path: "/procedimentos" },
            { label: "Modelos de Anamnese", path: "/modelo-anamnese" },
            { label: "Modelos de Receita", path: "/modelo-receita" },
            { label: "Fornecedores", path: "/fornecedores" },
        ]
    },
    {
        icon: House,
        label: "Minha Clínica",
        subItems: [
            { label: "Informações", path: "/informacoes" },
            { label: "Salas de Procedimento", path: "/salas" },
            { label: "Usuários", path: "/usuarios" },
        ]
    }
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export function AppSidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    // Função para alternar a expansão de um item
    const toggleExpand = (label: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [label]: !prev[label]
        }));
    };

    // Verifica se um item está ativo (incluindo subitens)
    const isItemActive = (item: NavItem) => {
        if (item.path && pathname === item.path) return true;
        if (item.subItems) {
            return item.subItems.some(sub => pathname === sub.path || pathname.startsWith(sub.path + '/'));
        }
        return false;
    };

    // Verifica se um subitem está ativo
    const isSubItemActive = (path: string) => {
        return pathname === path || pathname.startsWith(path + '/');
    };

    // Verifica se o item deve estar expandido (se algum subitem está ativo ou se foi manualmente expandido)
    const isItemExpanded = (item: NavItem) => {
        if (collapsed) return false;
        if (expandedItems[item.label]) return true;
        if (item.subItems) {
            return item.subItems.some(sub => isSubItemActive(sub.path));
        }
        return false;
    };

    return (
        <aside
            className={`
                relative
                bg-card
                border-r
                transition-all
                duration-300
                ${collapsed ? "w-16" : "w-64"}
                flex-shrink-0
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
                            <p className="font-heading font-bold text-sm text-foreground leading-none">Nuvia Clinics</p>
                            <p className="text-xs text-muted-foreground font-body mt-0.5">ERP Premium</p>
                        </div>
                    }
                </div>

                {/* Menu */}
                <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto scrollbar-thin">
                    {navItems.map((item) => {
                        const active = isItemActive(item);
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        const isExpanded = isItemExpanded(item);

                        return (
                            <div key={item.label} className="space-y-0.5">
                                {/* Item principal */}
                                <div
                                    className={`
                                        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group
                                        ${active ? "bg-gold-light text-gold font-medium shadow-sm" : "text-[hsl(var(--muted-foreground))] hover:text-foreground hover:bg-muted"}
                                        ${collapsed ? "justify-center" : ""}
                                        cursor-pointer
                                        relative
                                    `}
                                    onClick={() => {
                                        if (hasSubItems && !collapsed) {
                                            toggleExpand(item.label);
                                        } else if (item.path) {
                                            // Se não tiver subitens ou estiver collapsed, navega
                                            window.location.href = item.path;
                                        }
                                    }}
                                    title={collapsed ? item.label : undefined}
                                >
                                    {active && !collapsed &&
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gold rounded-r-full" />
                                    }
                                    <item.icon className={`w-4.5 h-4.5 flex-shrink-0 ${active ? "text-gold" : ""}`} style={{ width: 18, height: 18 }} />
                                    {!collapsed && (
                                        <>
                                            <span className="text-sm flex-1">{item.label}</span>
                                            {hasSubItems && (
                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                                                />
                                            )}
                                        </>
                                    )}
                                    {collapsed && hasSubItems && (
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                </div>

                                {/* Subitens */}
                                {hasSubItems && isExpanded && !collapsed && (
                                    <div className="ml-6 space-y-0.5 border-l-2 border-border/40 pl-2">
                                        {item.subItems?.map((subItem) => {
                                            const subActive = isSubItemActive(subItem.path);
                                            return (
                                                <Link
                                                    key={subItem.path}
                                                    href={subItem.path}
                                                    className={`
                                                        flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150
                                                        ${subActive
                                                            ? "bg-gold-light/50 text-gold font-medium"
                                                            : "text-[hsl(var(--muted-foreground))] hover:text-foreground hover:bg-muted/50"
                                                        }
                                                    `}
                                                >
                                                    {subItem.icon && (
                                                        <subItem.icon className={`w-3.5 h-3.5 flex-shrink-0 ${subActive ? "text-gold" : ""}`} />
                                                    )}
                                                    <span className="text-xs">{subItem.label}</span>
                                                    {subActive && (
                                                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className={`px-2 pb-4 border-t border-border/50 pt-3`}>
                    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${collapsed ? "justify-center" : ""}`}>
                        <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            A
                        </div>
                        {!collapsed &&
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">Administrador</p>
                                <p className="text-xs text-muted-foreground truncate">admin@nuvia.com</p>
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

            {/* Botão de colapsar */}
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
                    shadow-md
                    hover:shadow-lg
                    transition-shadow
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