'use client'

import { motion } from "framer-motion";
import {
    Calendar, Users, FileText, DollarSign, Package, Target,
    TrendingUp, Shield, Smartphone, Zap, Clock, Star
} from "lucide-react";

const features = [
    {
        icon: Calendar,
        title: "Agenda Inteligente",
        desc: "Visualização diária, semanal e mensal. Notificações automáticas de confirmação para seus clientes.",
        color: "bg-[#f5eee0] text-[#cc9433]",
    },
    {
        icon: FileText,
        title: "Prontuários Digitais",
        desc: "Histórico completo de cada paciente com fotos antes/depois, anamnese e evolução do tratamento.",
        color: "bg-blue-50 text-blue-500",
    },
    {
        icon: DollarSign,
        title: "Financeiro Completo",
        desc: "Controle de receitas, despesas, comissões de profissionais e fluxo de caixa em tempo real.",
        color: "bg-green-50 text-green-500",
    },
    {
        icon: Target,
        title: "CRM & Marketing",
        desc: "Funil de leads, controle de follow-up, origem dos clientes e taxa de conversão automática.",
        color: "bg-purple-50 text-purple-500",
    },
    {
        icon: Package,
        title: "Gestão de Estoque",
        desc: "Controle de produtos, alertas de estoque mínimo e validade, rastreamento por lote.",
        color: "bg-orange-50 text-orange-500",
    },
    {
        icon: TrendingUp,
        title: "Relatórios Avançados",
        desc: "Dashboards com gráficos de performance, procedimentos mais realizados e análise financeira.",
        color: "bg-[#f6eef0] text-[#c2707e]",
    },
    {
        icon: Users,
        title: "Multi-Profissionais",
        desc: "Gestão completa de equipe, agenda por profissional, comissões personalizadas e controle de acesso.",
        color: "bg-teal-50 text-teal-500",
    },
    {
        icon: Shield,
        title: "Segurança & LGPD",
        desc: "Dados criptografados, backup automático diário e conformidade total com a legislação brasileira.",
        color: "bg-gray-50 text-gray-600",
    },
    {
        icon: Smartphone,
        title: "100% Responsivo",
        desc: "Acesse de qualquer dispositivo — computador, tablet ou celular. Funciona em qualquer lugar.",
        color: "bg-indigo-50 text-indigo-500",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 bg-muted/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-14">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#cc9433] mb-3 block">Funcionalidades</span>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                        Tudo que sua clínica precisa,<br />em um só lugar
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Do agendamento ao financeiro, passando por prontuários e CRM — sem precisar de múltiplos sistemas.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => (
                        <motion.div key={f.title}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                            className="bg-card border border-border/60 rounded-2xl p-5 hover:shadow-md transition-shadow group">
                            <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <f.icon className="w-5 h-5" />
                            </div>
                            <h3 className="font-semibold text-base mb-2">{f.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}