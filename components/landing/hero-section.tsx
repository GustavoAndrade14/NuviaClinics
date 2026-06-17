'use client'
import { motion } from "framer-motion";
import { ArrowRight, Star, CheckCircle } from "lucide-react";
import Link from "next/link";

const highlights = ["Sem cartão de crédito", "14 dias grátis", "Cancele quando quiser"];

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-gold-light/30 pointer-events-none" />
            <div className="absolute top-20 right-[-10%] w-96 h-96 rounded-full bg-[#cc9433]/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 left-[-10%] w-80 h-80 rounded-full bg-rose-light blur-3xl pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="inline-flex items-center gap-2 bg-[#cc9433]-light text-[#cc9433] text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-gold/20">
                        <Star className="w-3.5 h-3.5 fill-[#cc9433]" />
                        #1 ERP para clínicas de estética no Brasil
                    </div>
                    <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                        Gerencie sua clínica com{" "}
                        <span className="text-[#cc9433]">elegância e</span>{" "}
                        eficiência
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                        Agendamentos, prontuários, financeiro, estoque e CRM em uma única plataforma. Feito para clínicas de estética, spas e salões premium.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        <Link href="/registro"
                            className="flex items-center justify-center gap-2 text-white bg-[#cc9433] bg-[#cc9433] px-6 py-3.5 rounded-xl font-semibold text-base hover:opacity-90 transition-opacity shadow-lg">
                            Começar grátis por 14 dias
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button
                            onClick={() => document.querySelector("#how")?.scrollIntoView({ behavior: "smooth" })}
                            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base border border-border hover:bg-muted transition-colors">
                            Ver como funciona
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {highlights.map(h => (
                            <div key={h} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                {h}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Dashboard mockup */}
                <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
                    className="hidden lg:block">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-rose-light rounded-3xl blur-2xl scale-105" />
                        <div className="relative bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Mock header */}
                            <div className="bg-muted/40 border-b border-border/50 px-4 py-3 flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                                <div className="flex-1 mx-4 bg-muted rounded px-3 py-1 text-xs text-muted-foreground">http://nuviaclinics.com.br</div>
                            </div>
                            {/* Mock dashboard */}
                            <div className="p-5 space-y-4">
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { label: "Agendamentos hoje", value: "12", color: "text-[#cc9433]" },
                                        { label: "Receita do mês", value: "R$ 28.4k", color: "text-green-500" },
                                        { label: "Novos pacientes", value: "38", color: "text-blue-500" },
                                    ].map(k => (
                                        <div key={k.label} className="bg-muted/50 rounded-xl p-3">
                                            <p className={`text-lg font-bold ${k.color}`}>{k.value}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{k.label}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-muted/40 rounded-xl p-3">
                                    <p className="text-xs font-semibold mb-3 text-muted-foreground">Agenda de Hoje</p>
                                    {[
                                        { time: "09:00", name: "Ana Beatriz", proc: "Botox facial", status: "confirmed" },
                                        { time: "10:30", name: "Carla Mendes", proc: "Limpeza de pele", status: "in_progress" },
                                        { time: "14:00", name: "Fernanda Lima", proc: "Preenchimento labial", status: "scheduled" },
                                    ].map(a => (
                                        <div key={a.time} className="flex items-center gap-2 py-2 border-b border-border/30 last:border-0">
                                            <span className="text-xs font-semibold w-10 text-[#cc9433]">{a.time}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium truncate">{a.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{a.proc}</p>
                                            </div>
                                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${a.status === "confirmed" ? "bg-green-50 text-green-600" :
                                                a.status === "in_progress" ? "bg-yellow-50 text-yellow-600" :
                                                    "bg-blue-50 text-blue-600"}`}>
                                                {a.status === "confirmed" ? "Confirmado" : a.status === "in_progress" ? "Em andamento" : "Agendado"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Social proof bar */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-border/30 bg-card/50 backdrop-blur-sm py-4">
                <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-center">
                    {[
                        { n: "2.400+", l: "Clínicas ativas" },
                        { n: "1.2M+", l: "Agendamentos/mês" },
                        { n: "4.9★", l: "Avaliação média" },
                        { n: "99.9%", l: "Uptime garantido" },
                    ].map(s => (
                        <div key={s.l}>
                            <p className="text-xl font-bold text-[#cc9433]">{s.n}</p>
                            <p className="text-xs text-muted-foreground">{s.l}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}