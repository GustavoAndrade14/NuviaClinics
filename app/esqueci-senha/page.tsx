'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import AuthLayout from "@/components/auth-layout";
import Link from "next/link";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    return (
        <AuthLayout
            icon={Mail}
            title="Redefinir senha"
            subtitle="Iremos enviar um código para redefinir sua senha"
            footer={
                <Link href="/login" className="text-[#cc9433] hover:underline">
                    <ArrowLeft className="w-3 h-3 inline mr-1" />Voltar para login
                </Link>
            }
        >
            {sent ? (
                <p className="text-sm text-foreground text-center">
                    Se um usuário com esse email existir, um código para resetar a senha sepra enviado.
                </p>
            ) : (
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Endereço de email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                placeholder="Você@exemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 h-12"
                                required
                            />
                        </div>
                    </div>
                    <Link href="/esqueci-senha/verificar-codigo">
                        <Button type="submit" className="w-full h-12 bg-[#cc9433] hover:bg-[#cc9433]/90 text-primary-foreground cursor-pointer" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                "Enviar código"
                            )}
                        </Button>
                    </Link>
                </form>
            )}
        </AuthLayout>
    );
}
