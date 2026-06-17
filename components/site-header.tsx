"use client"

import { Bell, Building2, Moon, Search, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
    return (
        <header className="flex h-(--header-height) shrink-0 items-center border-b">
            <div className="flex w-full items-center gap-4 px-4 lg:px-6">

                <SidebarTrigger />

                <div className="relative max-w-md flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por pacientes, agendamentos..."
                        className="pl-9"
                    />
                </div>

                <div className="ml-auto flex items-center gap-2">

                    <Button variant="ghost" size="icon">
                        <Moon className="h-5 w-5" />
                    </Button>

                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>

                    <Separator
                        orientation="vertical"
                        className="h-6"
                    />

                    <div className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">
                            Clínica Principal
                        </span>
                    </div>

                </div>
            </div>
        </header>
    )
}