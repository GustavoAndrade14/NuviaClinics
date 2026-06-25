'use client'

import { LogIn, Mail, Lock, EyeOff, Eye } from "lucide-react"
import Link from "next/link";
import { useState } from "react";


export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-16">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#cc9433] mb-4">
                        <LogIn className="size-7 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Bem-vindo</h1>
                    <p className="text-muted-foreground mt-2">
                        Digite suas credenciais para acessar sua conta
                    </p>
                </div>

                <div className="bg-card rounded-2xl shadow-sm border border-border p-4">
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">E-mail</label>
                            <div className="relative">
                                <Mail className="lucide lucide-mail absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 h-12" placeholder="você@exemplo.com"></input>
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
                            <a className="text-xs text-[#cc9433] hover:underline cursor-pointer" href="/esqueci-senha">
                                Esqueceu sua senha?
                            </a>
                        </div>
                        <Link href="/dashboard">
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#cc9433] text-primary-foreground shadow hover:bg-[#cc9433]/90 px-4 py-2 w-full h-12 font-medium cursor-pointer">Entrar</button>
                        </Link>
                    </form>

                </div>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Não tem uma conta? <a className="text-[#cc9433] hover:underline cursor-pointer" href="/registro">Crie uma agora!</a>
                </p>
            </div>
        </div>
    )
}
