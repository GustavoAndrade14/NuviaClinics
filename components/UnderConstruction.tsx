/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Construction,
    Hammer,
    Wrench,
    Clock,
    ArrowLeft,
    Home,
    Coffee
} from "lucide-react";

interface UnderConstructionProps {
    pageName?: string;
}

export function UnderConstruction({ pageName }: UnderConstructionProps) {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl w-full"
            >
                <div className="bg-card border border-border/60 rounded-2xl p-8 md:p-12 shadow-lg">
                    <div className="flex flex-col items-center text-center">
                        {/* Ícone animado */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.1
                            }}
                            className="relative"
                        >
                            <div className="w-28 h-28 rounded-full bg-gold-light/20 flex items-center justify-center">
                                <div className="absolute inset-0 rounded-full border-4 border-gold/10 animate-pulse" />
                                <div className="absolute inset-0 rounded-full border-4 border-gold/20 animate-ping" style={{ animationDuration: '3s' }} />
                                <Construction className="w-14 h-14 text-gold" />
                            </div>
                            {/* Badge */}
                            <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg animate-bounce">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Em breve
                                </span>
                            </div>
                        </motion.div>

                        {/* Título */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-6 space-y-3"
                        >
                            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                                {pageName || 'Página'} em Construção
                            </h1>
                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                <Construction className="w-5 h-5" />
                                <span className="text-lg">Estamos trabalhando nisso</span>
                            </div>
                        </motion.div>

                        {/* Mensagem */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-4 text-muted-foreground max-w-md"
                        >
                            Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
                            Agradecemos pela compreensão!
                        </motion.p>

                        {/* Ícones de ferramentas */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center justify-center gap-3 mt-6 text-muted-foreground/30"
                        >
                            <Hammer className="w-5 h-5 animate-bounce" style={{ animationDelay: '0s' }} />
                            <Wrench className="w-5 h-5 animate-bounce" style={{ animationDelay: '0.5s' }} />
                            <Hammer className="w-5 h-5 animate-bounce" style={{ animationDelay: '1s' }} />
                        </motion.div>

                        {/* Progresso */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ delay: 0.5, duration: 1.5 }}
                            className="w-full max-w-xs h-1.5 bg-muted rounded-full mt-6 overflow-hidden"
                        >
                            <div className="h-full bg-gold rounded-full w-3/5 animate-pulse" />
                        </motion.div>
                        <p className="text-xs text-muted-foreground mt-2">Progresso: 60%</p>

                        {/* Botões */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap items-center justify-center gap-3 mt-8"
                        >
                            <button
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2 px-5 py-2.5 border border-border/60 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-all"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Voltar
                            </button>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-dark text-white rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md"
                            >
                                <Home className="w-4 h-4" />
                                Dashboard
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default UnderConstruction;