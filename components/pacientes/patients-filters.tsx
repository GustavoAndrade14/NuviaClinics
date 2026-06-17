"use client"

import { Search, Filter } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function PatientsFilters() {
    return (
        <div className="flex gap-3">

            <div className="relative w-[350px]">

                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder="Buscar por nome, CPF, telefone..."
                    className="pl-9"
                />

            </div>

            <Button variant="outline">
                <Filter />
                Filtrar
            </Button>

        </div>
    )
}