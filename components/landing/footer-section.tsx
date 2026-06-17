'use client'

import { Scissors } from "lucide-react";
import Link from "next/link";

export default function FooterSection() {
    return (
        <footer className="bg-card border-t border-border/50">
            {/* CTA Banner */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                <div className="relative bg-foreground rounded-2xl px-8 py-12 text-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#cc9433]/20 to-transparent pointer-events-none rounded-2xl" />
                    <div className="relative">
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-background mb-4">
                            Pronto para transformar sua clínica?
                        </h2>
                        <p className="text-background/70 text-lg mb-8 max-w-xl mx-auto">
                            Junte-se a mais de 2.400 clínicas que já simplificaram sua gestão com o NuviaClinics ERP.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/registro"
                                className="inline-flex items-center justify-center gap-2 text-foreground bg-background px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-background/90 transition-colors shadow-md">
                                Começar 14 dias grátis
                            </Link>
                            <a href="#pricing"
                                onClick={e => { e.preventDefault(); document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" }); }}
                                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-semibold text-base border border-background/30 text-background hover:bg-background/10 transition-colors">
                                Ver planos
                            </a>
                        </div>
                        <p className="text-background/50 text-xs mt-4">Sem cartão de crédito · Cancele quando quiser</p>
                    </div>
                </div>
            </div>

            {/* Footer links */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-xl bg-[#cc9433] flex items-center justify-center">
                                <Scissors className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-heading font-bold text-lg">NuviaClinics</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            O ERP mais completo para clínicas de estética, spas e salões premium do Brasil.
                        </p>
                    </div>

                    {[
                        {
                            title: "Produto",
                            links: ["Funcionalidades", "Preços", "Novidades", "Integrações", "API"],
                        },
                        {
                            title: "Empresa",
                            links: ["Sobre nós", "Blog", "Parceiros", "Carreiras", "Imprensa"],
                        },
                        {
                            title: "Suporte",
                            links: ["Central de ajuda", "WhatsApp", "Status do sistema", "Política de privacidade", "Termos de uso"],
                        },
                    ].map(col => (
                        <div key={col.title}>
                            <p className="font-semibold text-sm mb-4">{col.title}</p>
                            <ul className="space-y-2.5">
                                {col.links.map(l => (
                                    <li key={l}>
                                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
                    <p>© 2026 NuviaClinics ERP. Todos os direitos reservados.</p>
                    <p>Feito com ❤️ para clínicas de estética brasileiras</p>
                </div>
            </div>
        </footer>
    );
}