import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";

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
        <div className="flex h-screen overflow-hidden bg-background">
            <AppSidebar />

            <div className="flex flex-1 flex-col min-w-0">
                <SiteHeader />

                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}