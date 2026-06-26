/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Building2,
    User,
    CreditCard,
    MapPin,
    Phone,
    Mail,
    Plus,
    X,
    Save,
    Upload,
    Image as ImageIcon,
    Home,
    Briefcase,
    ChevronDown,
    CheckCircle,
    AlertCircle
} from "lucide-react";

// ============================================
// TIPOS
// ============================================

interface PhoneContact {
    id: string;
    type: 'mobile' | 'commercial';
    number: string;
}

interface ClinicInfo {
    // Minha Clínica
    logo: string | null;
    companyName: string;
    responsible: string;
    cpfCnpj: string;
    // Endereço
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    // Telefones
    phones: PhoneContact[];
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function InformacoesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    // Estado da clínica
    const [clinic, setClinic] = useState<ClinicInfo>({
        logo: null,
        companyName: 'Nuvia Clinics',
        responsible: 'Dr. João Silva',
        cpfCnpj: '12.345.678/0001-90',
        cep: '01234-567',
        street: 'Rua das Flores',
        number: '123',
        complement: 'Sala 45',
        neighborhood: 'Jardim Paulista',
        city: 'São Paulo',
        state: 'SP',
        country: 'Brasil',
        phones: [
            { id: '1', type: 'commercial', number: '(11) 3456-7890' },
            { id: '2', type: 'mobile', number: '(11) 98765-4321' }
        ]
    });

    // ==========================================
    // FUNÇÕES
    // ==========================================

    const handleSave = async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setNotification({ type: 'success', message: 'Informações salvas com sucesso!' });
            setTimeout(() => setNotification(null), 4000);
        } catch (error) {
            setNotification({ type: 'error', message: 'Erro ao salvar informações' });
            setTimeout(() => setNotification(null), 4000);
        } finally {
            setIsLoading(false);
        }
    };

    const addPhone = () => {
        setClinic({
            ...clinic,
            phones: [...clinic.phones, { id: `phone-${Date.now()}`, type: 'mobile', number: '' }]
        });
    };

    const removePhone = (id: string) => {
        if (clinic.phones.length <= 1) return;
        setClinic({
            ...clinic,
            phones: clinic.phones.filter(p => p.id !== id)
        });
    };

    const updatePhone = (id: string, field: keyof PhoneContact, value: string) => {
        setClinic({
            ...clinic,
            phones: clinic.phones.map(p =>
                p.id === id ? { ...p, [field]: value } : p
            )
        });
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setClinic({ ...clinic, logo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">Informações</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Gerencie as informações da sua clínica
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-dark text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Salvando...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Salvar Alterações
                        </>
                    )}
                </button>
            </div>

            {/* Notification */}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl ${notification.type === 'success'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                >
                    {notification.type === 'success' ? (
                        <CheckCircle className="w-5 h-5" />
                    ) : (
                        <AlertCircle className="w-5 h-5" />
                    )}
                    <span className="text-sm">{notification.message}</span>
                </motion.div>
            )}

            {/* Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card: Minha Clínica */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0 }}
                    className="bg-card border border-border/60 rounded-xl p-6"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <Building2 className="w-5 h-5 text-gold" />
                        <h2 className="text-lg font-heading font-semibold text-foreground">Minha Clínica</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Logo */}
                        <div>
                            <label className="text-xs font-medium text-muted-foreground block mb-2">
                                Logo da Clínica
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="relative w-24 h-24 rounded-xl border-2 border-dashed border-border/60 bg-muted/30 flex items-center justify-center overflow-hidden group hover:border-gold transition-colors">
                                    {clinic.logo ? (
                                        <>
                                            <img
                                                src={clinic.logo}
                                                alt="Logo da clínica"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <label className="cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleLogoUpload}
                                                        className="hidden"
                                                    />
                                                    <Upload className="w-6 h-6 text-white" />
                                                </label>
                                            </div>
                                        </>
                                    ) : (
                                        <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoUpload}
                                                className="hidden"
                                            />
                                            <ImageIcon className="w-8 h-8 text-muted-foreground/40 mb-1" />
                                            <span className="text-[10px] text-muted-foreground/60 text-center px-2">
                                                Clique ou arraste
                                            </span>
                                        </label>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-muted-foreground">
                                        Formatos: PNG, JPG, SVG
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Tamanho recomendado: 200x200px
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Campos */}
                        <div>
                            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                Nome da Empresa
                            </label>
                            <input
                                type="text"
                                value={clinic.companyName}
                                onChange={(e) => setClinic({ ...clinic, companyName: e.target.value })}
                                className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                Responsável
                            </label>
                            <input
                                type="text"
                                value={clinic.responsible}
                                onChange={(e) => setClinic({ ...clinic, responsible: e.target.value })}
                                className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                CPF/CNPJ
                            </label>
                            <input
                                type="text"
                                value={clinic.cpfCnpj}
                                onChange={(e) => setClinic({ ...clinic, cpfCnpj: e.target.value })}
                                className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Card: Endereço */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border border-border/60 rounded-xl p-6"
                >
                    <div className="flex items-center gap-2 mb-5">
                        <MapPin className="w-5 h-5 text-gold" />
                        <h2 className="text-lg font-heading font-semibold text-foreground">Endereço</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="col-span-2 sm:col-span-1">
                                <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                    CEP
                                </label>
                                <input
                                    type="text"
                                    value={clinic.cep}
                                    onChange={(e) => setClinic({ ...clinic, cep: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                    País
                                </label>
                                <input
                                    type="text"
                                    value={clinic.country}
                                    onChange={(e) => setClinic({ ...clinic, country: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                Rua
                            </label>
                            <input
                                type="text"
                                value={clinic.street}
                                onChange={(e) => setClinic({ ...clinic, street: e.target.value })}
                                className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                    Número
                                </label>
                                <input
                                    type="text"
                                    value={clinic.number}
                                    onChange={(e) => setClinic({ ...clinic, number: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                    Complemento
                                </label>
                                <input
                                    type="text"
                                    value={clinic.complement}
                                    onChange={(e) => setClinic({ ...clinic, complement: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                Bairro
                            </label>
                            <input
                                type="text"
                                value={clinic.neighborhood}
                                onChange={(e) => setClinic({ ...clinic, neighborhood: e.target.value })}
                                className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                    Cidade
                                </label>
                                <input
                                    type="text"
                                    value={clinic.city}
                                    onChange={(e) => setClinic({ ...clinic, city: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                    Estado
                                </label>
                                <input
                                    type="text"
                                    value={clinic.state}
                                    onChange={(e) => setClinic({ ...clinic, state: e.target.value })}
                                    className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Card: Telefones (Full Width) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border/60 rounded-xl p-6"
            >
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <Phone className="w-5 h-5 text-gold" />
                        <h2 className="text-lg font-heading font-semibold text-foreground">Telefones</h2>
                    </div>
                    <button
                        onClick={addPhone}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 text-gold hover:bg-gold/20 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Adicionar Telefone
                    </button>
                </div>

                <div className="space-y-3">
                    {clinic.phones.map((phone) => (
                        <div key={phone.id} className="flex flex-wrap items-center gap-3 p-3 bg-muted/20 rounded-lg border border-border/40">
                            <div className="flex-1 min-w-[140px]">
                                <select
                                    value={phone.type}
                                    onChange={(e) => updatePhone(phone.id, 'type', e.target.value as 'mobile' | 'commercial')}
                                    className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                >
                                    <option value="mobile">Celular</option>
                                    <option value="commercial">Comercial</option>
                                </select>
                            </div>
                            <div className="flex-1 min-w-[160px]">
                                <input
                                    type="text"
                                    value={phone.number}
                                    onChange={(e) => updatePhone(phone.id, 'number', e.target.value)}
                                    placeholder="(00) 00000-0000"
                                    className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                />
                            </div>
                            <button
                                onClick={() => removePhone(phone.id)}
                                disabled={clinic.phones.length <= 1}
                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {clinic.phones.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                        <Phone className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">Nenhum telefone cadastrado</p>
                    </div>
                )}
            </motion.div>

            {/* Botão Salvar (fixo no rodapé em telas grandes) */}
            <div className="hidden md:block" />
        </div>
    );
}