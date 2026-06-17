'use client'

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Dra. Camila Rodrigues",
        role: "Diretora — Clínica Lumière, São Paulo",
        avatar: "C",
        color: "bg-[#cc9433]-light text-[#cc9433]",
        stars: 5,
        text: "Antes usávamos 3 sistemas diferentes. Com o NuviaClinics ERP, centralizamos tudo e reduzimos nossa inadimplência em 40% no primeiro trimestre. Indispensável.",
    },
    {
        name: "Mariana Fonseca",
        role: "Proprietária — Studio MF Estética, Curitiba",
        avatar: "M",
        color: "bg-[#f6eef0] text-[#c2707e]",
        stars: 5,
        text: "A agenda inteligente mudou o nosso dia a dia. As confirmações automáticas reduziram os faltas em quase 60%. A equipe adorou a facilidade de uso.",
    },
    {
        name: "Dr. Rafael Mendes",
        role: "CEO — Rede BellaVita (4 unidades), BH",
        avatar: "R",
        color: "bg-blue-50 text-blue-500",
        stars: 5,
        text: "Gerenciar 4 clínicas ao mesmo tempo era um caos. Hoje tenho visão em tempo real de cada unidade no meu celular. O relatório financeiro consolidado é perfeito.",
    },
    {
        name: "Juliana Castro",
        role: "Esteticista — JC Skin Care, Rio de Janeiro",
        avatar: "J",
        color: "bg-green-50 text-green-500",
        stars: 5,
        text: "Comecei sozinha e o plano Starter foi perfeito. Cresci, contratei 2 profissionais e fiz upgrade sem dor. O suporte é incrível e responde muito rápido.",
    },
    {
        name: "Patricia Andrade",
        role: "Dermato — Clínica Andrade, Florianópolis",
        avatar: "P",
        color: "bg-purple-50 text-purple-500",
        stars: 5,
        text: "Os prontuários digitais com fotos antes e depois transformaram minha consulta. Meus pacientes ficam impressionados com a profissionalidade do atendimento.",
    },
    {
        name: "Carlos Nunes",
        role: "Gestor — Grupo Nunes Saúde Estética, Salvador",
        avatar: "N",
        color: "bg-orange-50 text-orange-500",
        stars: 5,
        text: "ROI surpreendente. Em 3 meses de uso, recuperamos o valor do plano anual inteiro só com a melhora no controle de estoque e redução de desperdício.",
    },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-14">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#cc9433] mb-3 block">Depoimentos</span>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                        Mais de 2.400 clínicas confiam no NuviaClinics ERP
                    </h2>
                    <div className="flex items-center justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-[#cc9433] text-[#cc9433]" />)}
                        <span className="ml-2 font-semibold">4.9/5</span>
                    </div>
                    <p className="text-muted-foreground text-sm">Baseado em mais de 1.800 avaliações verificadas</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {testimonials.map((t, i) => (
                        <motion.div key={t.name}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                            className="bg-card border border-border/60 rounded-2xl p-6 hover:shadow-md transition-shadow relative">
                            <Quote className="absolute top-4 right-4 w-8 h-8 text-[#cc9433]/10" />
                            <div className="flex items-center gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-[#cc9433] text-[#cc9433]" />)}
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{t.text}</p>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}