'use client'

import { motion } from "framer-motion";
import { CheckCircle, X, Zap } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const plans = [
    {
        name: "Starter",
        monthlyPrice: 97,
        yearlyPrice: 77,
        desc: "Ideal para clínicas pequenas ou profissionais autônomos.",
        color: "border-border",
        badge: null,
        features: [
            { text: "Até 2 profissionais", ok: true },
            { text: "Agendamentos ilimitados", ok: true },
            { text: "Prontuários digitais", ok: true },
            { text: "Controle financeiro básico", ok: true },
            { text: "Estoque básico", ok: true },
            { text: "CRM de leads", ok: false },
            { text: "Relatórios avançados", ok: false },
            { text: "Suporte prioritário", ok: false },
        ],
    },
    {
        name: "Professional",
        monthlyPrice: 197,
        yearlyPrice: 157,
        desc: "Para clínicas em crescimento com equipe e múltiplos serviços.",
        color: "border-[#cc9433] shadow-xl shadow-gold/10",
        badge: "Mais popular",
        features: [
            { text: "Até 8 profissionais", ok: true },
            { text: "Agendamentos ilimitados", ok: true },
            { text: "Prontuários + fotos antes/depois", ok: true },
            { text: "Financeiro completo + comissões", ok: true },
            { text: "Gestão de estoque completa", ok: true },
            { text: "CRM com funil de vendas", ok: true },
            { text: "Relatórios avançados", ok: true },
            { text: "Suporte prioritário via chat", ok: true },
        ],
    },
    {
        name: "Enterprise",
        monthlyPrice: 397,
        yearlyPrice: 317,
        desc: "Para redes de clínicas com múltiplas unidades e alto volume.",
        color: "border-border",
        badge: null,
        features: [
            { text: "Profissionais ilimitados", ok: true },
            { text: "Múltiplas unidades", ok: true },
            { text: "Todos os recursos do Professional", ok: true },
            { text: "API de integração", ok: true },
            { text: "White-label personalizado", ok: true },
            { text: "Gerente de conta dedicado", ok: true },
            { text: "Onboarding presencial", ok: true },
            { text: "SLA garantido 99.99%", ok: true },
        ],
    },
];

export default function PricingSection() {
    const [yearly, setYearly] = useState(false);

    return (
        <section id="pricing" className="py-24 bg-muted/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#cc9433] mb-3 block">Preços</span>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                        Planos para cada etapa do seu negócio
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
                        Todos os planos incluem 14 dias gratuitos. Sem cartão de crédito para começar.
                    </p>
                    {/* Toggle */}
                    <div className="inline-flex items-center gap-3 bg-card border border-border rounded-xl p-1.5">
                        <button onClick={() => setYearly(false)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${!yearly ? "bg-[#cc9433] text-white shadow-sm" : "text-muted-foreground"}`}>
                            Mensal
                        </button>
                        <button onClick={() => setYearly(true)}
                            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${yearly ? "bg-[#cc9433] text-white shadow-sm" : "text-muted-foreground"}`}>
                            Anual
                            <span className="ml-1.5 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">-20%</span>
                        </button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {plans.map((plan, i) => (
                        <motion.div key={plan.name}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className={`relative bg-card rounded-2xl border-2 p-7 ${plan.color}`}>
                            {plan.badge && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <span className="text-xs font-bold text-white bg-[#cc9433] px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                                        <Zap className="w-3 h-3" /> {plan.badge}
                                    </span>
                                </div>
                            )}
                            <h3 className="font-heading font-bold text-xl mb-1">{plan.name}</h3>
                            <p className="text-sm text-muted-foreground mb-5 min-h-10">{plan.desc}</p>
                            <div className="mb-6">
                                <span className="text-4xl font-heading font-bold">
                                    R$ {yearly ? plan.yearlyPrice : plan.monthlyPrice}
                                </span>
                                <span className="text-muted-foreground text-sm">/mês</span>
                                {yearly && (
                                    <p className="text-xs text-green-600 font-medium mt-1">Cobrado anualmente — economize R$ {(plan.monthlyPrice - plan.yearlyPrice) * 12}/ano</p>
                                )}
                            </div>
                            <Link href="/registro"
                                className={`block text-center py-2.5 rounded-xl font-semibold text-sm mb-6 transition-all ${plan.badge ? "text-white bg-[#cc9433] hover:opacity-90 shadow-md" : "border border-border hover:bg-muted"
                                    }`}>
                                Começar 14 dias grátis
                            </Link>
                            <ul className="space-y-3">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-start gap-2.5 text-sm">
                                        {f.ok
                                            ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            : <X className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 mt-0.5" />}
                                        <span className={f.ok ? "text-foreground" : "text-muted-foreground/50"}>{f.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    className="text-center text-sm text-muted-foreground mt-8">
                    Todos os preços em BRL. Parcelamento em até 12x no cartão. Migração gratuita de outro sistema.
                    <br />Dúvidas? Fale com a gente pelo <span className="text-[#cc9433] font-medium cursor-pointer hover:underline">WhatsApp</span>.
                </motion.p>
            </div>
        </section>
    );
}