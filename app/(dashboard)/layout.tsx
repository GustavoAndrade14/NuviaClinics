import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

import "../globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
    title: "Nuvia Clinics",
    description: "Sistema para Clínica de Estética",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="pt-BR"
            className={`${plusJakartaSans.variable} h-full antialiased`}
        >
            <body className="min-h-screen">
                <TooltipProvider>
                    <SidebarProvider
                        style={
                            {
                                "--sidebar-width": "calc(var(--spacing) * 72)",
                                "--header-height": "calc(var(--spacing) * 12)",
                            } as React.CSSProperties
                        }
                    >
                        <AppSidebar variant="inset" />

                        <SidebarInset>
                            <SiteHeader />

                            <main className="flex flex-1 flex-col">
                                {children}
                            </main>
                        </SidebarInset>
                    </SidebarProvider>
                </TooltipProvider>
            </body>
        </html>
    );
}