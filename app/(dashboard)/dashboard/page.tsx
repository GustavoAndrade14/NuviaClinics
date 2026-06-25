/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    TrendingUp, TrendingDown, Users, Calendar, DollarSign,
    Scissors, Star, Clock, BarChart2, ArrowUpRight, ArrowDownRight, LucideIcon
} from "lucide-react";
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isToday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// Tipos para os dados
interface Appointment {
    id: string;
    date: string;
    patient_name: string;
    procedure_name?: string;
    start_time: string;
    status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
}

interface Patient {
    id: string;
    name: string;
    created_date?: string;
}

interface Financial {
    id: string;
    type: 'income' | 'expense';
    status: 'paid' | 'pending';
    amount: number;
    due_date?: string;
    payment_date?: string;
}

// Tipos para os dados dos gráficos
interface RevenueData {
    month: string;
    receita: number;
    despesas: number;
}

interface ProcedureData {
    name: string;
    value: number;
}

interface WeekAppointment {
    day: string;
    agendamentos: number;
}

// Constantes tipadas
const COLORS = ["#C9A84C", "#E88FA0", "#5B8DB8", "#6DBF8A", "#A87EC9"];

// Cores para as barras da semana
const BAR_COLORS = ["#C9A84C", "#E88FA0", "#5B8DB8", "#6DBF8A", "#A87EC9", "#F59E0B"];

const periodOptions: { label: string; value: string }[] = [
    { label: "Hoje", value: "today" },
    { label: "Semana", value: "week" },
    { label: "Mês", value: "month" },
    { label: "Ano", value: "year" },
];

const revenueData: RevenueData[] = [
    { month: "Jan", receita: 18500, despesas: 8200 },
    { month: "Fev", receita: 22000, despesas: 9100 },
    { month: "Mar", receita: 19800, despesas: 7800 },
    { month: "Abr", receita: 25600, despesas: 10200 },
    { month: "Mai", receita: 28900, despesas: 11400 },
    { month: "Jun", receita: 31200, despesas: 12000 },
    { month: "Jul", receita: 29400, despesas: 11800 },
];

const procedureData: ProcedureData[] = [
    { name: "Botox", value: 35 },
    { name: "Preenchimento", value: 22 },
    { name: "Limpeza de Pele", value: 18 },
    { name: "Laser", value: 15 },
    { name: "Outros", value: 10 },
];

const weekAppointments: WeekAppointment[] = [
    { day: "Seg", agendamentos: 8 },
    { day: "Ter", agendamentos: 12 },
    { day: "Qua", agendamentos: 10 },
    { day: "Qui", agendamentos: 15 },
    { day: "Sex", agendamentos: 14 },
    { day: "Sáb", agendamentos: 7 },
];

// Props do KpiCard
interface KpiCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
    change?: string;
    changeType?: 'up' | 'down';
    color?: 'gold' | 'rose' | 'blue' | 'green';
    delay?: number;
}

function KpiCard({ icon: Icon, label, value, change, changeType, color = "gold", delay = 0 }: KpiCardProps) {
    const colorStyles = {
        gold: { bg: "bg-gold-light", text: "text-gold" },
        rose: { bg: "bg-rose-light", text: "text-rose" },
        blue: { bg: "bg-blue-50", text: "text-blue-500" },
        green: { bg: "bg-green-50", text: "text-green-500" }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.35 }}
            className="bg-card border border-border/60 rounded-xl p-5 hover:shadow-md transition-shadow"
        >
            <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorStyles[color].bg}`}>
                    <Icon className={`w-5 h-5 ${colorStyles[color].text}`} />
                </div>
                {change !== undefined && changeType && (
                    <div className={`flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded-full ${changeType === "up" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
                        }`}>
                        {changeType === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {change}
                    </div>
                )}
            </div>
            <p className="text-2xl font-bold font-heading text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
        </motion.div>
    );
}

// Props do StatusBadge
interface StatusBadgeProps {
    status?: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show' | string;
}

function StatusBadge({ status }: StatusBadgeProps) {
    const map: Record<string, { label: string; cls: string }> = {
        scheduled: { label: "Agendado", cls: "bg-blue-50 text-blue-600" },
        confirmed: { label: "Confirmado", cls: "bg-green-50 text-green-600" },
        in_progress: { label: "Em Andamento", cls: "bg-yellow-50 text-yellow-600" },
        completed: { label: "Finalizado", cls: "bg-gray-50 text-gray-600" },
        cancelled: { label: "Cancelado", cls: "bg-red-50 text-red-500" },
        no_show: { label: "Faltou", cls: "bg-orange-50 text-orange-500" },
    };
    const s = status && map[status] ? map[status] : { label: status || "Desconhecido", cls: "bg-muted text-muted-foreground" };
    return <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${s.cls}`}>{s.label}</span>;
}

// Função para gerar dados mockados com datas variáveis
const generateMockData = () => {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    const yesterdayStr = format(new Date(today.setDate(today.getDate() - 1)), 'yyyy-MM-dd');
    const tomorrowStr = format(new Date(today.setDate(today.getDate() + 2)), 'yyyy-MM-dd');

    // Reset para não bagunçar a data
    const now = new Date();

    const mockAppointments: Appointment[] = [
        { id: '1', date: todayStr, patient_name: 'Ana Silva', procedure_name: 'Botox', start_time: '09:00', status: 'confirmed' },
        { id: '2', date: todayStr, patient_name: 'Carlos Souza', procedure_name: 'Preenchimento', start_time: '10:30', status: 'scheduled' },
        { id: '3', date: todayStr, patient_name: 'Mariana Santos', procedure_name: 'Limpeza de Pele', start_time: '14:00', status: 'in_progress' },
        { id: '4', date: todayStr, patient_name: 'Pedro Oliveira', procedure_name: 'Laser', start_time: '15:30', status: 'scheduled' },
        { id: '5', date: todayStr, patient_name: 'Julia Costa', procedure_name: 'Preenchimento', start_time: '16:00', status: 'scheduled' },
        { id: '6', date: yesterdayStr, patient_name: 'Roberto Almeida', procedure_name: 'Botox', start_time: '11:00', status: 'completed' },
        { id: '7', date: tomorrowStr, patient_name: 'Fernanda Lima', procedure_name: 'Limpeza de Pele', start_time: '09:30', status: 'scheduled' },
    ];

    const mockPatients: Patient[] = [
        { id: '1', name: 'Ana Silva', created_date: format(now, 'yyyy-MM-dd') },
        { id: '2', name: 'Carlos Souza', created_date: format(now, 'yyyy-MM-dd') },
        { id: '3', name: 'Mariana Santos', created_date: format(now, 'yyyy-MM-dd') },
        { id: '4', name: 'Pedro Oliveira', created_date: format(now, 'yyyy-MM-dd') },
        { id: '5', name: 'Julia Costa', created_date: format(now, 'yyyy-MM-dd') },
        { id: '6', name: 'Roberto Almeida', created_date: format(now, 'yyyy-MM-dd') },
        { id: '7', name: 'Fernanda Lima', created_date: format(now, 'yyyy-MM-dd') },
        { id: '8', name: 'Ricardo Santos', created_date: format(now, 'yyyy-MM-dd') },
    ];

    const mockFinancials: Financial[] = [
        { id: '1', type: 'income', status: 'paid', amount: 350, payment_date: todayStr },
        { id: '2', type: 'income', status: 'paid', amount: 450, payment_date: todayStr },
        { id: '3', type: 'income', status: 'paid', amount: 280, payment_date: todayStr },
        { id: '4', type: 'income', status: 'paid', amount: 520, payment_date: yesterdayStr },
        { id: '5', type: 'income', status: 'pending', amount: 550 },
        { id: '6', type: 'income', status: 'pending', amount: 380 },
        { id: '7', type: 'expense', status: 'pending', amount: 120 },
        { id: '8', type: 'expense', status: 'pending', amount: 80 },
        { id: '9', type: 'expense', status: 'paid', amount: 200, payment_date: todayStr },
    ];

    return { mockAppointments, mockPatients, mockFinancials };
};

// Componente de Tooltip Personalizado para o Gráfico de Linha
const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card border border-border/60 rounded-xl p-4 shadow-lg min-w-[180px]">
                <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center justify-between gap-4 py-1">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            <span className="text-xs text-muted-foreground">{entry.name}</span>
                        </div>
                        <span className="text-xs font-semibold text-foreground">
                            R$ {entry.value.toLocaleString("pt-BR")}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// Componente de Tooltip Personalizado para o Gráfico de Barras
const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-card border border-border/60 rounded-xl p-4 shadow-lg min-w-[160px]">
                <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
                <div className="flex items-center justify-between gap-4 py-1">
                    <span className="text-xs text-muted-foreground">Agendamentos</span>
                    <span className="text-xs font-semibold text-foreground">{payload[0].value}</span>
                </div>
            </div>
        );
    }
    return null;
};

// Componente de Tooltip Personalizado para o Gráfico de Pizza
const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-card border border-border/60 rounded-xl p-4 shadow-lg min-w-[160px]">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color || COLORS[0] }} />
                    <span className="text-xs font-medium text-foreground">{data.name}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <span className="text-xs text-muted-foreground">Percentual</span>
                    <span className="text-xs font-semibold text-foreground">{data.value}%</span>
                </div>
            </div>
        );
    }
    return null;
};

export default function Dashboard() {
    const [period, setPeriod] = useState<string>("month");
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [financials, setFinancials] = useState<Financial[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simula um carregamento de dados
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);
        setTimeout(() => {
            const { mockAppointments, mockPatients, mockFinancials } = generateMockData();
            setAppointments(mockAppointments);
            setPatients(mockPatients);
            setFinancials(mockFinancials);
            setLoading(false);
        }, 800); // Simula um delay de rede
    }, []);

    // Cálculos tipados com verificações de segurança
    const today = format(new Date(), "yyyy-MM-dd");
    const todayMonth = format(new Date(), "yyyy-MM");

    const todayAppts = appointments.filter(a => a && a.date === today);

    const todayRevenue = financials
        .filter(f => f && f.type === "income" && f.status === "paid" && f.payment_date === today)
        .reduce((s, f) => s + (f.amount || 0), 0);

    const monthRevenue = financials
        .filter(f => f && f.type === "income" && f.status === "paid" && f.payment_date?.startsWith(todayMonth) === true)
        .reduce((s, f) => s + (f.amount || 0), 0);

    const pendingReceivable = financials
        .filter(f => f && f.type === "income" && f.status === "pending")
        .reduce((s, f) => s + (f.amount || 0), 0);

    const pendingPayable = financials
        .filter(f => f && f.type === "expense" && f.status === "pending")
        .reduce((s, f) => s + (f.amount || 0), 0);

    const fmt = (n: number): string => {
        if (typeof n !== 'number' || isNaN(n)) return 'R$ 0,00';
        return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    };

    // Estilos para os eixos que se adaptam ao tema
    const axisStyles = {
        tick: {
            fontSize: 11,
            fill: 'var(--muted-foreground)',
        }
    };

    return (
        <div className="p-6 max-w-screen-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        {format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </p>
                </div>
                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    {periodOptions.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => setPeriod(opt.value)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${period === opt.value
                                ? "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                <KpiCard icon={DollarSign} label="Faturamento Hoje" value={fmt(todayRevenue)} change="+12%" changeType="up" color="gold" delay={0} />
                <KpiCard icon={TrendingUp} label="Faturamento Mensal" value={fmt(monthRevenue)} change="+8%" changeType="up" color="gold" delay={0.05} />
                <KpiCard icon={Calendar} label="Agendamentos Hoje" value={todayAppts.length} change="+3" changeType="up" color="rose" delay={0.1} />
                <KpiCard icon={Users} label="Total Pacientes" value={patients.length} change="+15" changeType="up" color="blue" delay={0.15} />
                <KpiCard icon={Scissors} label="Procedimentos Mês" value="128" change="+22%" changeType="up" color="green" delay={0.2} />
            </div>

            {/* Second row KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border/60 rounded-xl p-5">
                    <p className="text-xs text-muted-foreground mb-1">Taxa de Retorno</p>
                    <p className="text-2xl font-bold text-green-500">68%</p>
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-400 rounded-full" style={{ width: "68%" }} />
                    </div>
                </div>
                <div className="bg-card border border-border/60 rounded-xl p-5">
                    <p className="text-xs text-muted-foreground mb-1">Ocupação da Agenda</p>
                    <p className="text-2xl font-bold text-gold">82%</p>
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full" style={{ width: "82%" }} />
                    </div>
                </div>
                <div className="bg-card border border-border/60 rounded-xl p-5">
                    <p className="text-xs text-muted-foreground mb-1">A Receber</p>
                    <p className="text-2xl font-bold text-blue-500">{fmt(pendingReceivable)}</p>
                    <p className="text-xs text-muted-foreground mt-1">pagamentos pendentes</p>
                </div>
                <div className="bg-card border border-border/60 rounded-xl p-5">
                    <p className="text-xs text-muted-foreground mb-1">A Pagar</p>
                    <p className="text-2xl font-bold text-rose">{fmt(pendingPayable)}</p>
                    <p className="text-xs text-muted-foreground mt-1">contas pendentes</p>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-card border border-border/60 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-semibold text-foreground">Receitas vs Despesas</h3>
                        <span className="text-xs text-muted-foreground">Últimos 7 meses</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                                axisLine={{ stroke: 'var(--border)' }}
                                tickLine={{ stroke: 'var(--border)' }}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                                axisLine={{ stroke: 'var(--border)' }}
                                tickLine={{ stroke: 'var(--border)' }}
                                tickFormatter={v => `R$${(Number(v) / 1000).toFixed(0)}k`}
                            />
                            <Tooltip content={<CustomLineTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1 }} />
                            <Line type="monotone" dataKey="receita" stroke="#C9A84C" strokeWidth={2.5} dot={{ fill: "#C9A84C", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 2 }} name="Receita" />
                            <Line type="monotone" dataKey="despesas" stroke="#E88FA0" strokeWidth={2} dot={{ fill: "#E88FA0", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 2 }} strokeDasharray="4 2" name="Despesas" />
                            <Legend
                                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                                iconType="circle"
                                formatter={(value) => <span className="text-foreground">{value}</span>}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Procedures pie */}
                <div className="bg-card border border-border/60 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-semibold text-foreground">Top Procedimentos</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                            <Pie data={procedureData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                                {procedureData.map((entry, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomPieTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-1.5 mt-2">
                        {procedureData.map((item, i) => (
                            <div key={item.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                                    <span className="text-muted-foreground">{item.name}</span>
                                </div>
                                <span className="font-medium text-foreground">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Appointments this week */}
                <div className="bg-card border border-border/60 rounded-xl p-5">
                    <h3 className="font-semibold text-foreground mb-4">Agendamentos da Semana</h3>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={weekAppointments} barSize={28}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                                axisLine={{ stroke: 'var(--border)' }}
                                tickLine={{ stroke: 'var(--border)' }}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                                axisLine={{ stroke: 'var(--border)' }}
                                tickLine={{ stroke: 'var(--border)' }}
                            />
                            <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                            <Bar dataKey="agendamentos" name="Agendamentos">
                                {weekAppointments.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Today Appointments */}
                <div className="bg-card border border-border/60 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">Agendamentos de Hoje</h3>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">{todayAppts.length} total</span>
                    </div>
                    {loading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />)}
                        </div>
                    ) : todayAppts.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-40" />
                            <p className="text-sm">Nenhum agendamento hoje</p>
                        </div>
                    ) : (
                        <div className="space-y-2 max-h-52 overflow-y-auto scrollbar-thin">
                            {todayAppts.slice(0, 8).map(appt => (
                                <div key={appt.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-gold-light text-gold flex items-center justify-center text-xs font-bold flex-shrink-0">
                                        {appt.patient_name?.charAt(0) || "?"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate text-foreground">{appt.patient_name}</p>
                                        <p className="text-xs text-muted-foreground">{appt.procedure_name || "Procedimento"}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-xs font-medium text-foreground">{appt.start_time}</p>
                                        <StatusBadge status={appt.status} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}