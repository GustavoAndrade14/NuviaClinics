/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
    Calendar,
    DollarSign,
    Users,
    Scissors,
    TrendingUp,
    CalendarDays,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react"

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    CartesianGrid,
    Legend,
} from "recharts"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const metrics = [
    {
        title: "Faturamento Hoje",
        value: "R$ 0,00",
        icon: DollarSign,
        color: "from-amber-50 to-amber-100 border-amber-200",
        iconColor: "text-amber-600",
        growth: "+12%",
        trend: "up",
    },
    {
        title: "Faturamento Mensal",
        value: "R$ 0,00",
        icon: TrendingUp,
        color: "from-orange-50 to-orange-100 border-orange-200",
        iconColor: "text-orange-600",
        growth: "+8%",
        trend: "up",
    },
    {
        title: "Agendamentos Hoje",
        value: "0",
        icon: Calendar,
        color: "from-pink-50 to-pink-100 border-pink-200",
        iconColor: "text-pink-600",
        growth: "+3",
        trend: "up",
    },
    {
        title: "Total Pacientes",
        value: "1",
        icon: Users,
        color: "from-blue-50 to-blue-100 border-blue-200",
        iconColor: "text-blue-600",
        growth: "+15",
        trend: "up",
    },
    {
        title: "Procedimentos Mês",
        value: "128",
        icon: Scissors,
        color: "from-green-50 to-green-100 border-green-200",
        iconColor: "text-green-600",
        growth: "+22%",
        trend: "up",
    },
]

const revenueData = [
    { month: "Jan", receita: 18000, despesa: 8000 },
    { month: "Fev", receita: 22000, despesa: 9000 },
    { month: "Mar", receita: 20000, despesa: 8000 },
    { month: "Abr", receita: 26000, despesa: 10000 },
    { month: "Mai", receita: 29000, despesa: 11000 },
    { month: "Jun", receita: 32000, despesa: 12000 },
    { month: "Jul", receita: 30000, despesa: 12000 },
]

const proceduresData = [
    { name: "Botox", value: 35 },
    { name: "Preenchimento", value: 22 },
    { name: "Limpeza", value: 18 },
    { name: "Laser", value: 15 },
    { name: "Outros", value: 10 },
]

const appointmentsWeek = [
    { day: "Seg", total: 8 },
    { day: "Ter", total: 12 },
    { day: "Qua", total: 10 },
    { day: "Qui", total: 15 },
    { day: "Sex", total: 14 },
    { day: "Sáb", total: 7 },
]

const COLORS = ["#c89d3d", "#e88aa0", "#4f83b8", "#62b67f", "#9a70c0"]

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                <p className="font-medium text-sm">{label}</p>
                {payload.map((p: any, index: number) => (
                    <p key={index} className="text-sm" style={{ color: p.color }}>
                        {p.name}: R$ {p.value.toLocaleString("pt-BR")}
                    </p>
                ))}
            </div>
        )
    }
    return null
}

const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                <p className="font-medium text-sm">{payload[0].name}</p>
                <p className="text-sm text-muted-foreground">{payload[0].value}%</p>
            </div>
        )
    }
    return null
}

export default function Dashboard() {
    return (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-pink-600 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        terça-feira, 16 de junho de 2026
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                        Hoje
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-amber-50">
                        Semana
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-amber-50">
                        Mês
                    </Button>
                    <Button size="sm" variant="ghost" className="hover:bg-amber-50">
                        Ano
                    </Button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-5">
                {metrics.map((metric) => {
                    const Icon = metric.icon
                    return (
                        <Card
                            key={metric.title}
                            className={`bg-gradient-to-br ${metric.color} border shadow-sm hover:shadow-md transition-shadow`}
                        >
                            <CardContent className="p-3 sm:p-5">
                                <div className="flex items-center justify-between">
                                    <div className={`rounded-xl bg-white/60 p-2 ${metric.iconColor}`}>
                                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className={`text-xs ${metric.trend === "up" ? "text-green-600 bg-green-50" : "text-red-600 bg-red-50"
                                            }`}
                                    >
                                        {metric.trend === "up" ? "↑" : "↓"} {metric.growth}
                                    </Badge>
                                </div>

                                <div className="mt-3 sm:mt-6">
                                    <p className="text-lg sm:text-3xl font-bold truncate">{metric.value}</p>
                                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                        {metric.title}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Quick Stats */}
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Taxa de Retorno", value: "68%", color: "text-green-500", bg: "bg-green-500" },
                    { label: "Ocupação da Agenda", value: "82%", color: "text-amber-500", bg: "bg-amber-500" },
                    { label: "A Receber", value: "R$ 0,00", color: "text-blue-500", bg: "bg-blue-500" },
                    { label: "A Pagar", value: "R$ 0,00", color: "text-rose-500", bg: "bg-rose-500" },
                ].map((stat) => (
                    <Card key={stat.label} className="border shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-3 sm:p-5">
                            <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                            <h2 className={`mt-1 sm:mt-2 text-xl sm:text-4xl font-bold ${stat.color}`}>
                                {stat.value}
                            </h2>
                            {stat.label.includes("Receber") && (
                                <p className="text-xs text-muted-foreground mt-1">pagamentos pendentes</p>
                            )}
                            {stat.label.includes("Pagar") && (
                                <p className="text-xs text-muted-foreground mt-1">contas pendentes</p>
                            )}
                            {(stat.label === "Taxa de Retorno" || stat.label === "Ocupação da Agenda") && (
                                <div className="mt-2 sm:mt-4 h-1.5 sm:h-2 rounded-full bg-gray-100 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${stat.bg} transition-all duration-1000`}
                                        style={{ width: stat.value }}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid gap-4 lg:grid-cols-12">
                <Card className="lg:col-span-8 border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                            <h3 className="font-semibold text-base sm:text-lg">Receitas vs Despesas</h3>
                            <span className="text-xs sm:text-sm text-muted-foreground">Últimos 7 meses</span>
                        </div>

                        <ResponsiveContainer width="100%" height={240}>
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                                    iconType="circle"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="receita"
                                    name="Receita"
                                    stroke="#c89d3d"
                                    strokeWidth={3}
                                    dot={{ fill: "#c89d3d", strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="despesa"
                                    name="Despesa"
                                    stroke="#e88aa0"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={{ fill: "#e88aa0", strokeWidth: 2, r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-4 border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 sm:p-6">
                        <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">Top Procedimentos</h3>

                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={proceduresData}
                                    innerRadius={40}
                                    outerRadius={70}
                                    dataKey="value"
                                    paddingAngle={2}
                                >
                                    {proceduresData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>

                        <div className="grid grid-cols-2 gap-1 sm:gap-2 mt-3 sm:mt-4">
                            {proceduresData.map((item, index) => (
                                <div
                                    key={item.name}
                                    className="flex items-center justify-between text-xs sm:text-sm px-2 py-1 rounded hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <div
                                            className="h-2 w-2 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: COLORS[index] }}
                                        />
                                        <span className="truncate">{item.name}</span>
                                    </div>
                                    <span className="font-medium">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid gap-4 lg:grid-cols-2">
                <Card className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 sm:p-6">
                        <h3 className="font-semibold text-base sm:text-lg mb-4 sm:mb-6">
                            Agendamentos da Semana
                        </h3>

                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={appointmentsWeek}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                <XAxis
                                    dataKey="day"
                                    tick={{ fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                                                    <p className="font-medium text-sm">{payload[0].payload.day}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {payload[0].value} agendamentos
                                                    </p>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                                <Bar
                                    dataKey="total"
                                    radius={[6, 6, 0, 0]}
                                    fill="#c89d3d"
                                    maxBarSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <h3 className="font-semibold text-base sm:text-lg">Agendamentos de Hoje</h3>
                            <Badge variant="secondary" className="text-xs">
                                0 total
                            </Badge>
                        </div>

                        <div className="flex flex-col items-center justify-center h-[200px] sm:h-[220px] text-muted-foreground">
                            <div className="bg-gray-50 rounded-full p-4 sm:p-6 mb-3 sm:mb-4">
                                <CalendarDays className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                            </div>
                            <p className="text-sm sm:text-base font-medium">Nenhum agendamento hoje</p>
                            <p className="text-xs text-muted-foreground">Aproveite para organizar sua agenda</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}