'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "Como funciona o período de 14 dias grátis?",
        a: "Ao criar sua conta, você tem acesso completo a todos os recursos do plano Professional por 14 dias, sem precisar inserir cartão de crédito. Ao final do período, você escolhe o plano ideal e faz a assinatura. Se não assinar, sua conta fica pausada (não excluímos seus dados).",
    },
    {
        q: "Preciso instalar algum programa?",
        a: "Não. O NuviaClinics ERP é 100% online (SaaS). Acesse pelo navegador de qualquer dispositivo — computador, tablet ou celular — sem instalação ou configuração técnica.",
    },
    {
        q: "Posso migrar meus dados de outro sistema?",
        a: "Sim! Oferecemos migração gratuita de planilhas Excel, Google Sheets ou de outros sistemas como Agenda Virtual, Trinks e similares. Nossa equipe auxilia todo o processo.",
    },
    {
        q: "Quantos profissionais posso cadastrar?",
        a: "Depende do plano: Starter (2), Professional (8) e Enterprise (ilimitado). Cada profissional tem acesso personalizado à sua própria agenda e dados.",
    },
    {
        q: "Os dados dos meus pacientes são seguros?",
        a: "Absolutamente. Utilizamos criptografia SSL/TLS, backups automáticos diários e seguimos rigorosamente a LGPD. Seus dados pertencem a você — nunca são compartilhados com terceiros.",
    },
    {
        q: "Posso cancelar a qualquer momento?",
        a: "Sim, sem multas ou burocracia. Cancele quando quiser diretamente pelo painel. Seus dados ficam disponíveis por 30 dias após o cancelamento para exportação.",
    },
    {
        q: "O sistema funciona offline?",
        a: "O NuviaClinics ERP requer conexão com internet para funcionar. Recomendamos uma conexão estável, mas como é na nuvem, qualquer Wi-Fi ou 4G já é suficiente.",
    },
    {
        q: "Qual o suporte disponível?",
        a: "Todos os planos têm acesso à central de ajuda com tutoriais em vídeo e artigos. O plano Professional inclui suporte via chat e o Enterprise tem gerente de conta dedicado.",
    },
];

function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-border/60 rounded-xl overflow-hidden">
            <button onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/40 transition-colors">
                <span className="font-medium text-sm pr-4">{q}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                        transition={{ duration: 0.2 }} className="overflow-hidden">
                        <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FaqSection() {
    return (
        <section id="faq" className="py-24 bg-muted/20">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#cc9433] mb-3 block">FAQ</span>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Perguntas frequentes</h2>
                    <p className="text-muted-foreground">Não encontrou sua resposta? Fale com a gente pelo WhatsApp.</p>
                </motion.div>
                <div className="space-y-3">
                    {faqs.map((f, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                            <FaqItem q={f.q} a={f.a} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}