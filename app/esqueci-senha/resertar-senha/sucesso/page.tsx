'use client'

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import AuthLayout from "@/components/auth-layout";
import Link from "next/link";

export default function ForgotPassword() {

    return (
        <AuthLayout
            icon={CheckCircle2}
            title="Senha redefinida!"
            subtitle="Sua senha foi alterada com sucesso"
        >
            <p className="text-sm text-muted-foreground text-center">
                Agora você pode entrar com sua nova senha.
            </p>
            <Link href="/login">
                <Button className="w-full h-12 font-medium mt-4 bg-[#cc9433] hover:bg-[#cc9433]/90 text-primary-foreground cursor-pointer">
                    Fazer login
                </Button>
            </Link>
        </AuthLayout>
    );
}
