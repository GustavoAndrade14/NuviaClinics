"use client"

import {
    Plus,
    Mail,
    Phone,
    Pencil,
    Trash2,
    Search,
    Filter,
    Calendar,
    ChevronLeft,
    ChevronRight,
    User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const patients = [
    {
        id: 1,
        name: "Gustavo Andrade",
        gender: "Masculino",
        phone: "(85) 98962-8596",
        email: "gusta08567@gmail.com",
        cpf: "111.222.333-44",
        createdAt: "16/06/2026",
        status: "Ativo",
        lastVisit: "15/06/2026",
    },
    {
        id: 2,
        name: "Maria Silva",
        gender: "Feminino",
        phone: "(85) 98888-7777",
        email: "maria.silva@email.com",
        cpf: "222.333.444-55",
        createdAt: "10/06/2026",
        status: "Ativo",
        lastVisit: "14/06/2026",
    },
    {
        id: 3,
        name: "Carlos Oliveira",
        gender: "Masculino",
        phone: "(85) 99999-8888",
        email: "carlos.oliveira@email.com",
        cpf: "333.444.555-66",
        createdAt: "05/06/2026",
        status: "Inativo",
        lastVisit: "01/06/2026",
    },
]

const getInitials = (name: string) => {
    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "Ativo":
            return "bg-green-100 text-green-700 border-green-200"
        case "Inativo":
            return "bg-red-100 text-red-700 border-red-200"
        case "Pendente":
            return "bg-yellow-100 text-yellow-700 border-yellow-200"
        default:
            return "bg-gray-100 text-gray-700 border-gray-200"
    }
}

const getAvatarColor = (name: string) => {
    const colors = [
        "bg-amber-100 text-amber-700",
        "bg-pink-100 text-pink-700",
        "bg-blue-100 text-blue-700",
        "bg-green-100 text-green-700",
        "bg-purple-100 text-purple-700",
        "bg-orange-100 text-orange-700",
        "bg-rose-100 text-rose-700",
        "bg-indigo-100 text-indigo-700",
    ]
    const index = name.length % colors.length
    return colors[index]
}

export default function PacientesPage() {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent">
                        Pacientes
                    </h1>
                    <p className="text-muted-foreground">
                        {patients.length} {patients.length === 1 ? "paciente cadastrado" : "pacientes cadastrados"}
                    </p>
                </div>

                <Button className="bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow-md transition-all">
                    <Plus className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Novo Paciente</span>
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 sm:w-[350px]">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por nome, CPF, telefone..."
                        className="pl-9 border-gray-200 focus:border-amber-400 focus:ring-amber-400/20"
                    />
                </div>

                <div className="flex gap-2 flex-wrap">
                    <Select>
                        <SelectTrigger className="w-[130px] border-gray-200">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="active">Ativo</SelectItem>
                            <SelectItem value="inactive">Inativo</SelectItem>
                            <SelectItem value="pending">Pendente</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button variant="outline" className="border-gray-200 hover:bg-amber-50 hover:border-amber-300">
                        <Filter className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Filtrar</span>
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-semibold text-gray-700">Paciente</TableHead>
                                <TableHead className="font-semibold text-gray-700 hidden md:table-cell">Contato</TableHead>
                                <TableHead className="font-semibold text-gray-700 hidden lg:table-cell">CPF</TableHead>
                                <TableHead className="font-semibold text-gray-700 hidden sm:table-cell">Cadastro</TableHead>
                                <TableHead className="font-semibold text-gray-700">Status</TableHead>
                                <TableHead className="font-semibold text-gray-700 text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {patients.map((patient) => (
                                <TableRow
                                    key={patient.id}
                                    className="hover:bg-amber-50/50 transition-colors group"
                                >
                                    {/* Paciente */}
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className={`h-10 w-10 ${getAvatarColor(patient.name)}`}>
                                                <AvatarFallback className="font-medium">
                                                    {getInitials(patient.name)}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div>
                                                <p className="font-medium">
                                                    {patient.name}
                                                </p>
                                                <div className="flex items-center gap-2 sm:hidden">
                                                    <Phone className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-xs text-muted-foreground">
                                                        {patient.phone}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-muted-foreground hidden sm:block">
                                                    {patient.gender}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Contato - Desktop */}
                                    <TableCell className="hidden md:table-cell">
                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3 w-3 text-muted-foreground" />
                                                <span>{patient.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-3 w-3 text-muted-foreground" />
                                                <span className="truncate max-w-[200px]">{patient.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* CPF - Desktop */}
                                    <TableCell className="hidden lg:table-cell font-mono text-sm">
                                        {patient.cpf}
                                    </TableCell>

                                    {/* Cadastro - Desktop */}
                                    <TableCell className="hidden sm:table-cell">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-3 w-3 text-muted-foreground" />
                                            {patient.createdAt}
                                        </div>
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell>
                                        <Badge className={`${getStatusColor(patient.status)} border font-medium`}>
                                            {patient.status}
                                        </Badge>
                                    </TableCell>

                                    {/* Ações */}
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-100 hover:text-amber-700"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Empty State */}
                {patients.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                        <User className="h-16 w-16 mb-4 text-gray-300" />
                        <p className="text-lg font-medium">Nenhum paciente encontrado</p>
                        <p className="text-sm">Comece cadastrando seu primeiro paciente</p>
                    </div>
                )}

                {/* Pagination */}
                {patients.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t bg-gray-50/50">
                        <p className="text-sm text-muted-foreground order-2 sm:order-1">
                            Mostrando <span className="font-medium text-foreground">1</span> de{" "}
                            <span className="font-medium text-foreground">{patients.length}</span> pacientes
                        </p>

                        <div className="flex items-center gap-1 order-1 sm:order-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border-gray-200 hover:bg-amber-50"
                                disabled
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border-amber-500 bg-amber-500 text-white hover:bg-amber-600 hover:text-white"
                            >
                                1
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 border-gray-200 hover:bg-amber-50"
                                disabled
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}