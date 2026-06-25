'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Mail, Lock, Megaphone, TicketPercent, EyeOff, Eye } from "lucide-react"
import { useState } from "react";


export default function RegisterPage() {

    const [comoConheceu, setComoConheceu] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
            <div className="w-full max-w-md">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#cc9433] mb-4">
                        <UserPlus className="size-7 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Crie sua conta</h1>
                    <p className="text-muted-foreground mt-2">
                        Preencha os campos abaixo para criar sua conta
                    </p>
                </div>

                <div className="bg-card rounded-2xl shadow-sm border border-border p-4">
                    <form className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Seu nome</label>
                            <div className="relative">
                                <Mail className="lucide lucide-mail absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 h-12" placeholder="Fulano"></input>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">E-mail</label>
                            <div className="relative">
                                <Mail className="lucide lucide-mail absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 h-12" placeholder="Você@exemplo.com"></input>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Senha</label>
                            </div>
                            <div className="relative">
                                <Lock className="lucide lucide-lock absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 pr-10 h-12"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Como nos conheceu?
                            </label>

                            <div className="relative">
                                <Megaphone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                                <Select value={comoConheceu} onValueChange={setComoConheceu}>
                                    <SelectTrigger
                                        className="w-full h-12 pl-10 pr-3 text-base border border-input bg-transparent shadow-sm cursor-pointer"
                                    >
                                        <SelectValue placeholder="Selecione" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="cliente" className="cursor-pointer">
                                            Outro cliente
                                        </SelectItem>
                                        <SelectItem value="site" className="cursor-pointer">
                                            Site
                                        </SelectItem>
                                        <SelectItem value="google" className="cursor-pointer">
                                            Google
                                        </SelectItem>
                                        <SelectItem value="instagram" className="cursor-pointer">
                                            Instagram
                                        </SelectItem>
                                        <SelectItem value="tiktok" className="cursor-pointer">
                                            TikTok
                                        </SelectItem>
                                        <SelectItem value="outro" className="cursor-pointer">
                                            Outra forma
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {comoConheceu === "outro" && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">
                                    Que forma?
                                </label>

                                <input
                                    type="text"
                                    placeholder="Descreva como nos conheceu"
                                    className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">
                                Código Promocional
                            </label>

                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <TicketPercent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                                    <input
                                        type="text"
                                        placeholder="Digite seu cupom"
                                        className="w-full h-12 pl-10 rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="h-12 px-6 rounded-md bg-[#cc9433] text-white font-medium hover:bg-[#cc9433]/90 transition-colors cursor-pointer"
                                >
                                    Aplicar
                                </button>
                            </div>
                        </div>

                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#cc9433] text-primary-foreground shadow hover:bg-[#cc9433]/90 px-4 py-2 w-full h-12 font-medium cursor-pointer">Criar Conta</button>
                    </form>

                </div>

                <p className="text-center text-sm text-muted-foreground mt-8">
                    Já tem uma conta? <a className="text-[#cc9433] hover:underline cursor-pointer" href="/login">Entrar agora!</a>
                </p>
            </div>
        </div>
    )
}
