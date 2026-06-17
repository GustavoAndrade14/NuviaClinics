"use client"

import * as React from "react"
import {
    IconCamera,
    IconChartBar,
    IconDashboard,
    IconDatabase,
    IconFileAi,
    IconFileDescription,
    IconFileWord,
    IconFolder,
    IconHelp,
    IconInnerShadowTop,
    IconListDetails,
    IconReport,
    IconSearch,
    IconSettings,
    IconUsers,
} from "@tabler/icons-react"

import { LayoutDashboard, Users, Calendar, Scissors, FileText, DollarSign, Package, Target, TrendingUp, Settings } from 'lucide-react';
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "@/components/team-switcher"

const data = {
    user: {
        name: "user",
        email: "user@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "NuviaClinics",
            logo: IconInnerShadowTop,
            plan: "ERP Premium",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Pacientes",
            url: "/pacientes",
            icon: Users,
        },
        {
            title: "Agendamentos",
            url: "#",
            icon: Calendar,
        },
        {
            title: "Procedimentos",
            url: "#",
            icon: Scissors,
        },
        {
            title: "Profissionais",
            url: "#",
            icon: Users,
        },
        {
            title: "Prontuários",
            url: "#",
            icon: FileText,
        },
        {
            title: "Financeiro",
            url: "#",
            icon: DollarSign,
        },
        {
            title: "Estoque",
            url: "#",
            icon: Package,
        },
        {
            title: "CRM",
            url: "#",
            icon: Target,
        },
        {
            title: "Relatórios",
            url: "#",
            icon: TrendingUp,
        },
        {
            title: "Configurações",
            url: "#",
            icon: Settings,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
