"use client"

import {
    Mail,
    Phone,
    Pencil,
    Trash2,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const patients = [
    {
        id: 1,
        name: "gustavo andrade",
        gender: "Masculino",
        phone: "85989628596",
        email: "gusta08567@gmail.com",
        cpf: "11122233344",
        createdAt: "16/06/2026",
        status: "Ativo",
    },
]

export function PatientsTable() {
    return (
        <div className="rounded-xl border">

            <Table>

                <TableHeader>
                    <TableRow>
                        <TableHead>Paciente</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>CPF</TableHead>
                        <TableHead>Cadastro</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">
                            Ações
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {patients.map((patient) => (
                        <TableRow key={patient.id}>

                            <TableCell>
                                <div className="flex items-center gap-3">

                                    <Avatar>
                                        <AvatarFallback>
                                            {patient.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div>
                                        <p className="font-medium">
                                            {patient.name}
                                        </p>

                                        <p className="text-muted-foreground text-sm">
                                            {patient.gender}
                                        </p>
                                    </div>

                                </div>
                            </TableCell>

                            <TableCell>

                                <div className="space-y-1 text-sm">

                                    <div className="flex items-center gap-2">
                                        <Phone className="h-3 w-3" />
                                        {patient.phone}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Mail className="h-3 w-3" />
                                        {patient.email}
                                    </div>

                                </div>

                            </TableCell>

                            <TableCell>
                                {patient.cpf}
                            </TableCell>

                            <TableCell>
                                {patient.createdAt}
                            </TableCell>

                            <TableCell>

                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                    Ativo
                                </Badge>

                            </TableCell>

                            <TableCell>

                                <div className="flex justify-end gap-2">

                                    <Pencil className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />

                                    <Trash2 className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-destructive" />

                                </div>

                            </TableCell>

                        </TableRow>
                    ))}

                </TableBody>

            </Table>

        </div>
    )
}