'use client'

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, Loader2, KeyRound } from "lucide-react";
import AuthLayout from "@/components/auth-layout";
import Link from "next/link";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const [code, setCode] = useState("");


    return (
        <AuthLayout
            icon={KeyRound}
            title="Digite o código"
            subtitle={`Enviamos um código de 6 dígitos`}
            footer={
                <Link href="/esqueci-senha" className="text-[#cc9433] font-medium hover:underline text-sm cursor-pointer">
                    <ArrowLeft className="w-3 h-3 inline mr-1" />Usar outro e-mail
                </Link>
            }
        >
            <form className="space-y-6">
                {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
                )}

                <div className="flex flex-col items-center gap-4">
                    <InputOTP maxLength={6} value={code} onChange={setCode}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                            <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                            <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                            <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                            <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                            <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
                        </InputOTPGroup>
                    </InputOTP>
                    <p className="text-xs text-muted-foreground text-center">
                        Não recebeu?{" "}
                        <button
                            type="button"
                            className="text-[#cc9433] hover:underline font-medium cursor-pointer"
                        >
                            Reenviar código
                        </button>
                    </p>
                </div>
                <Link href="/esqueci-senha/resertar-senha">
                    <Button type="submit" className="w-full h-12 font-medium bg-[#cc9433] hover:bg-[#cc9433]/90 text-primary-foreground cursor-pointer" disabled={loading || code.length < 6}>
                        {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Verificando...</> : "Verificar código"}
                    </Button>
                </Link>
            </form>
        </AuthLayout>
    );
}
