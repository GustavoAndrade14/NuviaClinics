'use client'

import { motion } from "framer-motion";
import { UserPlus, Settings, Play, TrendingUp } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        icon: UserPlus,
        step: "01",
        title: "Crie sua conta grátis",
        desc: "Cadastro em menos de 2 minutos. Sem cartão de crédito, sem burocracia. 14 dias de acesso completo gratuito.",
    },
    {
        icon: Settings,
        step: "02",
        title: "Configure sua clínica",
        desc: "Adicione seus procedimentos, profissionais, horários de funcionamento e personalize com a sua marca.",
    },
    {
        icon: Play,
        step: "03",
        title: "Comece a usar",
        desc: "Agende seus primeiros pacientes, registre prontuários e controle seu financeiro desde o primeiro dia.",
    },
    {
        icon: TrendingUp,
        step: "04",
        title: "Cresça com dados",
        desc: "Acompanhe relatórios de performance, identifique oportunidades e tome decisões baseadas em dados reais.",
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how" className="py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-14">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#cc9433] mb-3 block">Como funciona</span>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                        Pronto para usar em minutos
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                        Sem complicação, sem instalação, sem treinamento longo. Intuitivo do primeiro ao último clique.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
                    {steps.map((s, i) => (
                        <motion.div key={s.step}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="relative">
                            {i < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-7 left-full w-full h-0.5 bg-gradient-to-r from-gold/40 to-transparent z-0" style={{ width: "calc(100% - 2.75rem)", left: "2.75rem" }} />
                            )}
                            <div className="relative bg-card border border-border/60 rounded-2xl p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#cc9433] flex items-center justify-center flex-shrink-0 shadow-md">
                                        <s.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-3xl font-heading font-bold text-[#cc9433]/20 leading-none mt-1">{s.step}</span>
                                </div>
                                <h3 className="font-semibold text-base mb-2">{s.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center">
                    <Link href="/registro"
                        className="inline-flex items-center gap-2 text-white bg-[#cc9433] px-8 py-4 rounded-xl font-semibold text-base hover:opacity-90 transition-opacity shadow-lg">
                        Criar conta gratuita agora
                    </Link>
                    <p className="text-sm text-muted-foreground mt-3">14 dias grátis · Sem cartão de crédito</p>
                </motion.div>
            </div>
        </section>
    );
}