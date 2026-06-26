/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Search, Filter, ChevronLeft, ChevronRight, ChevronDown,
    User, Phone, Mail, MapPin, Heart, Users, FileText, Edit2, Trash2,
    X, Save, AlertCircle, CheckCircle, Clock, Home, Briefcase,
    Calendar, CreditCard, IdCard, Info, MapPinHouse, UserPlus
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// ============================================
// TIPOS
// ============================================

type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
type PhoneType = 'mobile' | 'residential' | 'commercial';
type EmailType = 'personal' | 'business';
type AddressType = 'residential' | 'commercial';
type Gender = 'male' | 'female' | 'other';
type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed' | 'separated';
type PatientStatus = 'active' | 'inactive' | 'blocked';

interface EmergencyContact {
    id: string;
    name: string;
    healthPlan: string;
    phone: string;
    bloodType: BloodType;
}

interface PhoneContact {
    id: string;
    type: PhoneType;
    number: string;
}

interface EmailContact {
    id: string;
    type: EmailType;
    email: string;
}

interface Address {
    id: string;
    type: AddressType;
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
}

interface Responsible {
    id: string;
    name: string;
    relationship: string;
    phone: string;
    email: string;
    rg: string;
    cpf: string;
}

interface Patient {
    id: string;
    // Dados Básicos
    name: string;
    birthDate: string;
    rg: string;
    cpf: string;
    gender: Gender;
    maritalStatus: MaritalStatus;
    referral: string;
    observations: string;
    // Contatos
    phones: PhoneContact[];
    emails: EmailContact[];
    // Endereços
    addresses: Address[];
    // Contato de Emergência
    emergencyContact?: EmergencyContact;
    // Responsáveis
    responsible?: Responsible[];
    // Metadados
    createdAt: string;
    updatedAt: string;
    status: PatientStatus;
}

// Tipo para o formulário parcial
type PatientFormData = Omit<Patient, 'id' | 'createdAt' | 'updatedAt'> & {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
};

// ============================================
// DADOS MOCKADOS
// ============================================

const mockPatients: Patient[] = [
    {
        id: '1',
        name: 'Ana Cristina Silva',
        birthDate: '1985-03-15',
        rg: '12.345.678-9',
        cpf: '123.456.789-00',
        gender: 'female',
        maritalStatus: 'married',
        referral: 'Indicação da Dra. Mariana',
        observations: 'Paciente com alergia a penicilina',
        phones: [
            { id: 'p1', type: 'mobile', number: '(11) 98765-4321' },
            { id: 'p2', type: 'residential', number: '(11) 3456-7890' }
        ],
        emails: [
            { id: 'e1', type: 'personal', email: 'ana.silva@gmail.com' },
            { id: 'e2', type: 'business', email: 'ana@empresa.com.br' }
        ],
        addresses: [
            {
                id: 'a1',
                type: 'residential',
                cep: '01234-567',
                street: 'Rua das Flores',
                number: '123',
                complement: 'Apto 45',
                neighborhood: 'Jardim Paulista',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil'
            }
        ],
        emergencyContact: {
            id: 'ec1',
            name: 'Carlos Silva',
            healthPlan: 'Amil Saúde',
            phone: '(11) 98765-4321',
            bloodType: 'A+'
        },
        responsible: [
            {
                id: 'r1',
                name: 'Carlos Silva',
                relationship: 'Cônjuge',
                phone: '(11) 98765-4321',
                email: 'carlos.silva@gmail.com',
                rg: '23.456.789-0',
                cpf: '234.567.890-12'
            }
        ],
        createdAt: '2024-01-15T10:30:00',
        updatedAt: '2024-01-15T10:30:00',
        status: 'active'
    },
    {
        id: '2',
        name: 'Roberto Almeida Santos',
        birthDate: '1978-07-22',
        rg: '34.567.890-1',
        cpf: '345.678.901-23',
        gender: 'male',
        maritalStatus: 'single',
        referral: 'Busca no Google',
        observations: 'Paciente com histórico de hipertensão',
        phones: [
            { id: 'p3', type: 'mobile', number: '(11) 97654-3210' }
        ],
        emails: [
            { id: 'e3', type: 'personal', email: 'roberto.almeida@yahoo.com.br' }
        ],
        addresses: [
            {
                id: 'a2',
                type: 'residential',
                cep: '04567-890',
                street: 'Avenida Paulista',
                number: '1578',
                complement: 'Sala 12',
                neighborhood: 'Bela Vista',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil'
            }
        ],
        emergencyContact: {
            id: 'ec2',
            name: 'Maria Almeida',
            healthPlan: 'Bradesco Saúde',
            phone: '(11) 97654-3210',
            bloodType: 'O-'
        },
        responsible: [],
        createdAt: '2024-02-20T14:20:00',
        updatedAt: '2024-02-20T14:20:00',
        status: 'active'
    },
    {
        id: '3',
        name: 'Mariana Oliveira Costa',
        birthDate: '1992-11-05',
        rg: '45.678.901-2',
        cpf: '456.789.012-34',
        gender: 'female',
        maritalStatus: 'divorced',
        referral: 'Indicação de paciente',
        observations: 'Paciente com sensibilidade a luz',
        phones: [
            { id: 'p4', type: 'mobile', number: '(11) 96543-2109' },
            { id: 'p5', type: 'commercial', number: '(11) 4567-8901' }
        ],
        emails: [
            { id: 'e4', type: 'personal', email: 'mariana.costa@hotmail.com' }
        ],
        addresses: [
            {
                id: 'a3',
                type: 'residential',
                cep: '05678-901',
                street: 'Rua Augusta',
                number: '456',
                complement: 'Casa 2',
                neighborhood: 'Consolação',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil'
            },
            {
                id: 'a4',
                type: 'commercial',
                cep: '06789-012',
                street: 'Rua Oscar Freire',
                number: '789',
                complement: 'Sala 34',
                neighborhood: 'Jardim Paulista',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil'
            }
        ],
        emergencyContact: {
            id: 'ec3',
            name: 'Paulo Oliveira',
            healthPlan: 'SulAmérica Saúde',
            phone: '(11) 96543-2109',
            bloodType: 'B+'
        },
        responsible: [],
        createdAt: '2024-03-10T09:15:00',
        updatedAt: '2024-03-10T09:15:00',
        status: 'inactive'
    },
    {
        id: '4',
        name: 'Pedro Henrique Santos',
        birthDate: '2000-09-30',
        rg: '56.789.012-3',
        cpf: '567.890.123-45',
        gender: 'male',
        maritalStatus: 'single',
        referral: 'Indicação de amigo',
        observations: '',
        phones: [
            { id: 'p6', type: 'mobile', number: '(11) 95432-1098' }
        ],
        emails: [
            { id: 'e5', type: 'personal', email: 'pedro.santos@gmail.com' }
        ],
        addresses: [
            {
                id: 'a5',
                type: 'residential',
                cep: '07890-123',
                street: 'Rua dos Pinheiros',
                number: '321',
                complement: 'Bloco B',
                neighborhood: 'Pinheiros',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil'
            }
        ],
        emergencyContact: {
            id: 'ec4',
            name: 'Lucia Santos',
            healthPlan: 'Amil Saúde',
            phone: '(11) 95432-1098',
            bloodType: 'AB+'
        },
        responsible: [
            {
                id: 'r2',
                name: 'Lucia Santos',
                relationship: 'Mãe',
                phone: '(11) 95432-1098',
                email: 'lucia.santos@gmail.com',
                rg: '67.890.123-4',
                cpf: '678.901.234-56'
            }
        ],
        createdAt: '2024-04-05T11:45:00',
        updatedAt: '2024-04-05T11:45:00',
        status: 'active'
    },
    {
        id: '5',
        name: 'Julia Costa Lima',
        birthDate: '1995-06-18',
        rg: '78.901.234-5',
        cpf: '789.012.345-67',
        gender: 'female',
        maritalStatus: 'married',
        referral: 'Indicação do Dr. Roberto',
        observations: 'Paciente com histórico de alergia a cosméticos',
        phones: [
            { id: 'p7', type: 'mobile', number: '(11) 94321-0987' },
            { id: 'p8', type: 'residential', number: '(11) 5678-9012' }
        ],
        emails: [
            { id: 'e6', type: 'personal', email: 'julia.lima@gmail.com' },
            { id: 'e7', type: 'business', email: 'julia@consultoria.com.br' }
        ],
        addresses: [
            {
                id: 'a6',
                type: 'residential',
                cep: '08901-234',
                street: 'Alameda Santos',
                number: '654',
                complement: 'Apto 101',
                neighborhood: 'Cerqueira César',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil'
            }
        ],
        emergencyContact: {
            id: 'ec5',
            name: 'Lucas Lima',
            healthPlan: 'Bradesco Saúde',
            phone: '(11) 94321-0987',
            bloodType: 'A-'
        },
        responsible: [
            {
                id: 'r3',
                name: 'Lucas Lima',
                relationship: 'Cônjuge',
                phone: '(11) 94321-0987',
                email: 'lucas.lima@gmail.com',
                rg: '89.012.345-6',
                cpf: '890.123.456-78'
            }
        ],
        createdAt: '2024-05-12T08:00:00',
        updatedAt: '2024-05-12T08:00:00',
        status: 'active'
    },
    {
        id: '6',
        name: 'Fernanda Souza Oliveira',
        birthDate: '1988-12-25',
        rg: '90.123.456-7',
        cpf: '901.234.567-89',
        gender: 'female',
        maritalStatus: 'separated',
        referral: 'Busca no Instagram',
        observations: '',
        phones: [
            { id: 'p9', type: 'mobile', number: '(11) 93210-9876' }
        ],
        emails: [
            { id: 'e8', type: 'personal', email: 'fernanda.souza@outlook.com' }
        ],
        addresses: [
            {
                id: 'a7',
                type: 'residential',
                cep: '09012-345',
                street: 'Rua Bela Cintra',
                number: '987',
                complement: '',
                neighborhood: 'Jardim América',
                city: 'São Paulo',
                state: 'SP',
                country: 'Brasil'
            }
        ],
        emergencyContact: {
            id: 'ec6',
            name: 'Ricardo Souza',
            healthPlan: 'SulAmérica Saúde',
            phone: '(11) 93210-9876',
            bloodType: 'O+'
        },
        responsible: [],
        createdAt: '2024-06-08T16:30:00',
        updatedAt: '2024-06-08T16:30:00',
        status: 'blocked'
    }
];

// ============================================
// COMPONENTES DE FORMULÁRIO
// ============================================

interface FormInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    as?: 'input' | 'select' | 'textarea';
    className?: string;
}

function FormInput({
    label,
    name,
    value,
    onChange,
    type = 'text',
    placeholder = '',
    required = false,
    options = [],
    as = 'input',
    className = ''
}: FormInputProps) {
    const baseClasses = "w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all";

    return (
        <div className={`space-y-1.5 ${className}`}>
            <label className="text-xs font-medium text-muted-foreground">
                {label} {required && <span className="text-rose">*</span>}
            </label>
            {as === 'select' ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={baseClasses}
                    required={required}
                >
                    <option value="">Selecione...</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : as === 'textarea' ? (
                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${baseClasses} min-h-[80px] resize-y`}
                    required={required}
                />
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={baseClasses}
                    required={required}
                />
            )}
        </div>
    );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function PatientManagement() {
    // Estados
    const [patients, setPatients] = useState<Patient[]>(mockPatients);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>(mockPatients);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [activeTab, setActiveTab] = useState<'basic' | 'contacts' | 'addresses' | 'emergency' | 'responsible'>('basic');

    const itemsPerPage = 5;

    // Estado do formulário - usando o tipo Partial com PatientFormData
    const [formData, setFormData] = useState<Partial<PatientFormData>>({
        name: '',
        birthDate: '',
        rg: '',
        cpf: '',
        gender: 'female' as Gender,
        maritalStatus: 'single' as MaritalStatus,
        referral: '',
        observations: '',
        phones: [{ id: `p-${Date.now()}`, type: 'mobile' as PhoneType, number: '' }],
        emails: [{ id: `e-${Date.now()}`, type: 'personal' as EmailType, email: '' }],
        addresses: [{
            id: `a-${Date.now()}`,
            type: 'residential' as AddressType,
            cep: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            country: 'Brasil'
        }],
        emergencyContact: {
            id: `ec-${Date.now()}`,
            name: '',
            healthPlan: '',
            phone: '',
            bloodType: 'A+' as BloodType
        },
        responsible: [{
            id: `r-${Date.now()}`,
            name: '',
            relationship: '',
            phone: '',
            email: '',
            rg: '',
            cpf: ''
        }],
        status: 'active' as PatientStatus
    });

    // ==========================================
    // FUNÇÕES DE FILTRO E PESQUISA
    // ==========================================

    useEffect(() => {
        let result = patients;

        // Filtro por status
        if (statusFilter !== 'all') {
            result = result.filter(p => p.status === statusFilter);
        }

        // Filtro por busca
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(p =>
                p.name.toLowerCase().includes(term) ||
                p.cpf.includes(term) ||
                p.rg.includes(term) ||
                p.phones.some(phone => phone.number.includes(term)) ||
                p.emails.some(email => email.email.toLowerCase().includes(term))
            );
        }

        setFilteredPatients(result);
        setCurrentPage(1);
    }, [patients, searchTerm, statusFilter]);

    // ==========================================
    // FUNÇÕES DE CRUD
    // ==========================================

    const handleSave = async () => {
        setIsLoading(true);

        // Validação básica
        if (!formData.name?.trim()) {
            setNotification({ type: 'error', message: 'O nome do paciente é obrigatório' });
            setIsLoading(false);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            if (editingPatient) {
                // Editar
                const updated = patients.map(p =>
                    p.id === editingPatient.id
                        ? {
                            ...p,
                            name: formData.name || p.name,
                            birthDate: formData.birthDate || p.birthDate,
                            rg: formData.rg || p.rg,
                            cpf: formData.cpf || p.cpf,
                            gender: (formData.gender || p.gender) as Gender,
                            maritalStatus: (formData.maritalStatus || p.maritalStatus) as MaritalStatus,
                            referral: formData.referral || p.referral,
                            observations: formData.observations || p.observations,
                            phones: formData.phones?.filter(p => p.number.trim()) || p.phones,
                            emails: formData.emails?.filter(e => e.email.trim()) || p.emails,
                            addresses: formData.addresses?.filter(a => a.street.trim()) || p.addresses,
                            emergencyContact: formData.emergencyContact?.name ? formData.emergencyContact as EmergencyContact : p.emergencyContact,
                            responsible: formData.responsible?.filter(r => r.name.trim()) || p.responsible,
                            status: (formData.status || p.status) as PatientStatus,
                            updatedAt: new Date().toISOString()
                        }
                        : p
                );
                setPatients(updated);
                setNotification({ type: 'success', message: 'Paciente atualizado com sucesso!' });
            } else {
                // Criar
                const newPatient: Patient = {
                    id: `p-${Date.now()}`,
                    name: formData.name || '',
                    birthDate: formData.birthDate || '',
                    rg: formData.rg || '',
                    cpf: formData.cpf || '',
                    gender: (formData.gender || 'female') as Gender,
                    maritalStatus: (formData.maritalStatus || 'single') as MaritalStatus,
                    referral: formData.referral || '',
                    observations: formData.observations || '',
                    phones: formData.phones?.filter(p => p.number.trim()) || [],
                    emails: formData.emails?.filter(e => e.email.trim()) || [],
                    addresses: formData.addresses?.filter(a => a.street.trim()) || [],
                    emergencyContact: formData.emergencyContact?.name ? formData.emergencyContact as EmergencyContact : undefined,
                    responsible: formData.responsible?.filter(r => r.name.trim()) || [],
                    status: (formData.status || 'active') as PatientStatus,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                setPatients([newPatient, ...patients]);
                setNotification({ type: 'success', message: 'Paciente cadastrado com sucesso!' });
            }

            // Reset form
            resetForm();
            setIsModalOpen(false);
        } catch (error) {
            setNotification({ type: 'error', message: 'Erro ao salvar paciente' });
        } finally {
            setIsLoading(false);
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este paciente?')) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setPatients(patients.filter(p => p.id !== id));
            setNotification({ type: 'success', message: 'Paciente removido com sucesso!' });
        } catch (error) {
            setNotification({ type: 'error', message: 'Erro ao remover paciente' });
        } finally {
            setIsLoading(false);
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const handleEdit = (patient: Patient) => {
        setEditingPatient(patient);
        setFormData({
            ...patient,
            // Garantir que os arrays tenham pelo menos um item para edição
            phones: patient.phones.length > 0 ? patient.phones : [{ id: `p-${Date.now()}`, type: 'mobile' as PhoneType, number: '' }],
            emails: patient.emails.length > 0 ? patient.emails : [{ id: `e-${Date.now()}`, type: 'personal' as EmailType, email: '' }],
            addresses: patient.addresses.length > 0 ? patient.addresses : [{
                id: `a-${Date.now()}`,
                type: 'residential' as AddressType,
                cep: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                country: 'Brasil'
            }],
            responsible: patient.responsible && patient.responsible.length > 0 ? patient.responsible : [{
                id: `r-${Date.now()}`,
                name: '',
                relationship: '',
                phone: '',
                email: '',
                rg: '',
                cpf: ''
            }]
        });
        setIsModalOpen(true);
        setActiveTab('basic');
    };

    const resetForm = () => {
        setEditingPatient(null);
        setFormData({
            name: '',
            birthDate: '',
            rg: '',
            cpf: '',
            gender: 'female' as Gender,
            maritalStatus: 'single' as MaritalStatus,
            referral: '',
            observations: '',
            phones: [{ id: `p-${Date.now()}`, type: 'mobile' as PhoneType, number: '' }],
            emails: [{ id: `e-${Date.now()}`, type: 'personal' as EmailType, email: '' }],
            addresses: [{
                id: `a-${Date.now()}`,
                type: 'residential' as AddressType,
                cep: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                country: 'Brasil'
            }],
            emergencyContact: {
                id: `ec-${Date.now()}`,
                name: '',
                healthPlan: '',
                phone: '',
                bloodType: 'A+' as BloodType
            },
            responsible: [{
                id: `r-${Date.now()}`,
                name: '',
                relationship: '',
                phone: '',
                email: '',
                rg: '',
                cpf: ''
            }],
            status: 'active' as PatientStatus
        });
        setActiveTab('basic');
    };

    // ==========================================
    // FUNÇÕES DE FORMULÁRIO - ARRAYS DINÂMICOS
    // ==========================================

    const addPhone = () => {
        setFormData({
            ...formData,
            phones: [...(formData.phones || []), { id: `p-${Date.now()}`, type: 'mobile' as PhoneType, number: '' }]
        });
    };

    const removePhone = (id: string) => {
        if ((formData.phones?.length || 0) <= 1) return;
        setFormData({
            ...formData,
            phones: (formData.phones || []).filter(p => p.id !== id)
        });
    };

    const updatePhone = (id: string, field: keyof PhoneContact, value: string) => {
        setFormData({
            ...formData,
            phones: (formData.phones || []).map(p => p.id === id ? { ...p, [field]: value as any } : p)
        });
    };

    const addEmail = () => {
        setFormData({
            ...formData,
            emails: [...(formData.emails || []), { id: `e-${Date.now()}`, type: 'personal' as EmailType, email: '' }]
        });
    };

    const removeEmail = (id: string) => {
        if ((formData.emails?.length || 0) <= 1) return;
        setFormData({
            ...formData,
            emails: (formData.emails || []).filter(e => e.id !== id)
        });
    };

    const updateEmail = (id: string, field: keyof EmailContact, value: string) => {
        setFormData({
            ...formData,
            emails: (formData.emails || []).map(e => e.id === id ? { ...e, [field]: value as any } : e)
        });
    };

    const addAddress = () => {
        setFormData({
            ...formData,
            addresses: [...(formData.addresses || []), {
                id: `a-${Date.now()}`,
                type: 'residential' as AddressType,
                cep: '',
                street: '',
                number: '',
                complement: '',
                neighborhood: '',
                city: '',
                state: '',
                country: 'Brasil'
            }]
        });
    };

    const removeAddress = (id: string) => {
        if ((formData.addresses?.length || 0) <= 1) return;
        setFormData({
            ...formData,
            addresses: (formData.addresses || []).filter(a => a.id !== id)
        });
    };

    const updateAddress = (id: string, field: keyof Address, value: string) => {
        setFormData({
            ...formData,
            addresses: (formData.addresses || []).map(a => a.id === id ? { ...a, [field]: value as any } : a)
        });
    };

    const addResponsible = () => {
        setFormData({
            ...formData,
            responsible: [...(formData.responsible || []), {
                id: `r-${Date.now()}`,
                name: '',
                relationship: '',
                phone: '',
                email: '',
                rg: '',
                cpf: ''
            }]
        });
    };

    const removeResponsible = (id: string) => {
        if ((formData.responsible?.length || 0) <= 1) return;
        setFormData({
            ...formData,
            responsible: (formData.responsible || []).filter(r => r.id !== id)
        });
    };

    const updateResponsible = (id: string, field: keyof Responsible, value: string) => {
        setFormData({
            ...formData,
            responsible: (formData.responsible || []).map(r => r.id === id ? { ...r, [field]: value as any } : r)
        });
    };

    // ==========================================
    // PAGINAÇÃO
    // ==========================================

    const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

    const getStatusInfo = (status: PatientStatus) => {
        const map: Record<PatientStatus, { label: string; color: string }> = {
            active: { label: 'Ativo', color: 'text-green-600 bg-green-50' },
            inactive: { label: 'Inativo', color: 'text-yellow-600 bg-yellow-50' },
            blocked: { label: 'Bloqueado', color: 'text-red-600 bg-red-50' }
        };
        return map[status] || map.active;
    };

    const getGenderLabel = (gender: Gender) => {
        const map: Record<Gender, string> = { male: 'Masculino', female: 'Feminino', other: 'Outro' };
        return map[gender] || gender;
    };

    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div className="p-6 max-w-screen-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">Pacientes</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Gerencie todos os seus pacientes
                    </p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gold hover:bg-gold-dark text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    Novo Paciente
                </button>
            </div>

            {/* Notification */}
            <AnimatePresence>
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
            </AnimatePresence>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por nome, CPF, RG, telefone ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-border/60 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${showFilters || statusFilter !== 'all'
                            ? 'bg-gold text-white'
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                        Filtros
                        <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-muted/30 rounded-xl border border-border/60 flex flex-wrap gap-4">
                            <div className="flex-1 min-w-[150px]">
                                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Status</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                >
                                    <option value="all">Todos</option>
                                    <option value="active">Ativos</option>
                                    <option value="inactive">Inativos</option>
                                    <option value="blocked">Bloqueados</option>
                                </select>
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={() => {
                                        setStatusFilter('all');
                                        setSearchTerm('');
                                    }}
                                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Limpar filtros
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-card border border-border/60 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-xl font-bold text-foreground">{patients.length}</p>
                </div>
                <div className="bg-card border border-border/60 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Ativos</p>
                    <p className="text-xl font-bold text-green-600">{patients.filter(p => p.status === 'active').length}</p>
                </div>
                <div className="bg-card border border-border/60 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Inativos</p>
                    <p className="text-xl font-bold text-yellow-600">{patients.filter(p => p.status === 'inactive').length}</p>
                </div>
                <div className="bg-card border border-border/60 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Bloqueados</p>
                    <p className="text-xl font-bold text-red-600">{patients.filter(p => p.status === 'blocked').length}</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border/60 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50 border-b border-border/60">
                            <tr>
                                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Paciente</th>
                                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">CPF</th>
                                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Contato</th>
                                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden xl:table-cell">Status</th>
                                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPatients.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-muted-foreground">
                                        <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">Nenhum paciente encontrado</p>
                                    </td>
                                </tr>
                            ) : (
                                currentPatients.map((patient) => (
                                    <tr key={patient.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gold-light text-gold flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                    {patient.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{patient.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {format(new Date(patient.birthDate), 'dd/MM/yyyy')}
                                                        {' · '}
                                                        {getGenderLabel(patient.gender)}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 hidden md:table-cell">
                                            <span className="text-sm text-muted-foreground">{patient.cpf}</span>
                                        </td>
                                        <td className="px-4 py-3 hidden lg:table-cell">
                                            <div className="flex flex-col gap-0.5">
                                                {patient.phones.slice(0, 2).map(phone => (
                                                    <span key={phone.id} className="text-xs text-muted-foreground">{phone.number}</span>
                                                ))}
                                                {patient.phones.length > 2 && (
                                                    <span className="text-xs text-gold">+{patient.phones.length - 2} mais</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 hidden xl:table-cell">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusInfo(patient.status).color}`}>
                                                {getStatusInfo(patient.status).label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleEdit(patient)}
                                                    className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                                                    title="Editar"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(patient.id)}
                                                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                                    title="Excluir"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredPatients.length > 0 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-border/60">
                        <p className="text-xs text-muted-foreground">
                            Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredPatients.length)} de {filteredPatients.length}
                        </p>
                        <div className="flex gap-1">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1.5 text-sm font-medium text-foreground">
                                {currentPage} / {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* ========================================== */}
            {/* MODAL DE CADASTRO/EDIÇÃO */}
            {/* ========================================== */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-card rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-5 border-b border-border/60">
                                <div>
                                    <h2 className="text-lg font-heading font-bold text-foreground">
                                        {editingPatient ? 'Editar Paciente' : 'Novo Paciente'}
                                    </h2>
                                    <p className="text-xs text-muted-foreground">
                                        {editingPatient ? 'Atualize os dados do paciente' : 'Preencha os dados para cadastrar um novo paciente'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-1 p-4 border-b border-border/60 overflow-x-auto">
                                {[
                                    { key: 'basic', label: 'Dados Básicos', icon: User },
                                    { key: 'contacts', label: 'Contatos', icon: Phone },
                                    { key: 'addresses', label: 'Endereços', icon: MapPin },
                                    { key: 'emergency', label: 'Emergência', icon: Heart },
                                    { key: 'responsible', label: 'Responsáveis', icon: Users }
                                ].map(tab => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key as any)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.key
                                            ? 'bg-gold text-white shadow-sm'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                            }`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-6">
                                {/* TAB: Dados Básicos */}
                                {activeTab === 'basic' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput
                                            label="Nome Completo"
                                            name="name"
                                            value={formData.name || ''}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Digite o nome completo"
                                            required
                                            className="md:col-span-2"
                                        />
                                        <FormInput
                                            label="Data de Nascimento"
                                            name="birthDate"
                                            type="date"
                                            value={formData.birthDate || ''}
                                            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                            required
                                        />
                                        <FormInput
                                            label="RG"
                                            name="rg"
                                            value={formData.rg || ''}
                                            onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
                                            placeholder="00.000.000-0"
                                        />
                                        <FormInput
                                            label="CPF/CNPJ"
                                            name="cpf"
                                            value={formData.cpf || ''}
                                            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                                            placeholder="000.000.000-00"
                                            required
                                        />
                                        <FormInput
                                            label="Gênero"
                                            name="gender"
                                            value={formData.gender || ''}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                                            as="select"
                                            options={[
                                                { value: 'female', label: 'Feminino' },
                                                { value: 'male', label: 'Masculino' },
                                                { value: 'other', label: 'Outro' }
                                            ]}
                                        />
                                        <FormInput
                                            label="Estado Civil"
                                            name="maritalStatus"
                                            value={formData.maritalStatus || ''}
                                            onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as MaritalStatus })}
                                            as="select"
                                            options={[
                                                { value: 'single', label: 'Solteiro(a)' },
                                                { value: 'married', label: 'Casado(a)' },
                                                { value: 'divorced', label: 'Divorciado(a)' },
                                                { value: 'widowed', label: 'Viúvo(a)' },
                                                { value: 'separated', label: 'Separado(a)' }
                                            ]}
                                        />
                                        <FormInput
                                            label="Indicação"
                                            name="referral"
                                            value={formData.referral || ''}
                                            onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                                            placeholder="Como conheceu a clínica?"
                                            className="md:col-span-2"
                                        />
                                        <FormInput
                                            label="Observações"
                                            name="observations"
                                            value={formData.observations || ''}
                                            onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                                            placeholder="Observações relevantes sobre o paciente"
                                            as="textarea"
                                            className="md:col-span-2"
                                        />
                                        <FormInput
                                            label="Status"
                                            name="status"
                                            value={formData.status || 'active'}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as PatientStatus })}
                                            as="select"
                                            options={[
                                                { value: 'active', label: 'Ativo' },
                                                { value: 'inactive', label: 'Inativo' },
                                                { value: 'blocked', label: 'Bloqueado' }
                                            ]}
                                            className="md:col-span-2"
                                        />
                                    </div>
                                )}

                                {/* TAB: Contatos */}
                                {activeTab === 'contacts' && (
                                    <div className="space-y-6">
                                        {/* Telefones */}
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="text-sm font-semibold text-foreground">Telefones</h4>
                                                <button
                                                    onClick={addPhone}
                                                    className="flex items-center gap-1 text-xs text-gold hover:text-gold-dark transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" /> Adicionar
                                                </button>
                                            </div>
                                            {formData.phones?.map((phone) => (
                                                <div key={phone.id} className="flex flex-wrap gap-2 mb-2 p-3 bg-muted/20 rounded-lg">
                                                    <div className="flex-1 min-w-[120px]">
                                                        <select
                                                            value={phone.type}
                                                            onChange={(e) => updatePhone(phone.id, 'type', e.target.value as PhoneType)}
                                                            className="w-full px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                        >
                                                            <option value="mobile">Celular</option>
                                                            <option value="residential">Residencial</option>
                                                            <option value="commercial">Comercial</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex-1 min-w-[150px]">
                                                        <input
                                                            type="text"
                                                            value={phone.number}
                                                            onChange={(e) => updatePhone(phone.id, 'number', e.target.value)}
                                                            placeholder="(00) 00000-0000"
                                                            className="w-full px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => removePhone(phone.id)}
                                                        className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Emails */}
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="text-sm font-semibold text-foreground">Emails</h4>
                                                <button
                                                    onClick={addEmail}
                                                    className="flex items-center gap-1 text-xs text-gold hover:text-gold-dark transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" /> Adicionar
                                                </button>
                                            </div>
                                            {formData.emails?.map((email) => (
                                                <div key={email.id} className="flex flex-wrap gap-2 mb-2 p-3 bg-muted/20 rounded-lg">
                                                    <div className="flex-1 min-w-[100px]">
                                                        <select
                                                            value={email.type}
                                                            onChange={(e) => updateEmail(email.id, 'type', e.target.value as EmailType)}
                                                            className="w-full px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                        >
                                                            <option value="personal">Pessoal</option>
                                                            <option value="business">Empresarial</option>
                                                        </select>
                                                    </div>
                                                    <div className="flex-1 min-w-[180px]">
                                                        <input
                                                            type="email"
                                                            value={email.email}
                                                            onChange={(e) => updateEmail(email.id, 'email', e.target.value)}
                                                            placeholder="email@exemplo.com"
                                                            className="w-full px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={() => removeEmail(email.id)}
                                                        className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* TAB: Endereços */}
                                {activeTab === 'addresses' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-sm font-semibold text-foreground">Endereços</h4>
                                            <button
                                                onClick={addAddress}
                                                className="flex items-center gap-1 text-xs text-gold hover:text-gold-dark transition-colors"
                                            >
                                                <Plus className="w-3 h-3" /> Adicionar
                                            </button>
                                        </div>
                                        {formData.addresses?.map((address) => (
                                            <div key={address.id} className="p-4 bg-muted/20 rounded-lg border border-border/40 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <select
                                                        value={address.type}
                                                        onChange={(e) => updateAddress(address.id, 'type', e.target.value as AddressType)}
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    >
                                                        <option value="residential">Residencial</option>
                                                        <option value="commercial">Comercial</option>
                                                    </select>
                                                    <button
                                                        onClick={() => removeAddress(address.id)}
                                                        className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <input
                                                        type="text"
                                                        value={address.cep}
                                                        onChange={(e) => updateAddress(address.id, 'cep', e.target.value)}
                                                        placeholder="CEP"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={address.street}
                                                        onChange={(e) => updateAddress(address.id, 'street', e.target.value)}
                                                        placeholder="Rua"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={address.number}
                                                        onChange={(e) => updateAddress(address.id, 'number', e.target.value)}
                                                        placeholder="Número"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={address.complement}
                                                        onChange={(e) => updateAddress(address.id, 'complement', e.target.value)}
                                                        placeholder="Complemento"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={address.neighborhood}
                                                        onChange={(e) => updateAddress(address.id, 'neighborhood', e.target.value)}
                                                        placeholder="Bairro"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={address.city}
                                                        onChange={(e) => updateAddress(address.id, 'city', e.target.value)}
                                                        placeholder="Cidade"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={address.state}
                                                        onChange={(e) => updateAddress(address.id, 'state', e.target.value)}
                                                        placeholder="Estado"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={address.country}
                                                        onChange={(e) => updateAddress(address.id, 'country', e.target.value)}
                                                        placeholder="País"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* TAB: Emergência */}
                                {activeTab === 'emergency' && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormInput
                                            label="Nome do Contato"
                                            name="emergencyName"
                                            value={formData.emergencyContact?.name || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                emergencyContact: {
                                                    ...(formData.emergencyContact || { id: `ec-${Date.now()}`, bloodType: 'A+' as BloodType, name: '', healthPlan: '', phone: '' }),
                                                    name: e.target.value
                                                }
                                            })}
                                            placeholder="Nome completo"
                                            className="md:col-span-2"
                                        />
                                        <FormInput
                                            label="Plano de Saúde"
                                            name="emergencyHealthPlan"
                                            value={formData.emergencyContact?.healthPlan || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                emergencyContact: {
                                                    ...(formData.emergencyContact || { id: `ec-${Date.now()}`, bloodType: 'A+' as BloodType, name: '', healthPlan: '', phone: '' }),
                                                    healthPlan: e.target.value
                                                }
                                            })}
                                            placeholder="Nome do plano"
                                        />
                                        <FormInput
                                            label="Telefone"
                                            name="emergencyPhone"
                                            value={formData.emergencyContact?.phone || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                emergencyContact: {
                                                    ...(formData.emergencyContact || { id: `ec-${Date.now()}`, bloodType: 'A+' as BloodType, name: '', healthPlan: '', phone: '' }),
                                                    phone: e.target.value
                                                }
                                            })}
                                            placeholder="(00) 00000-0000"
                                        />
                                        <FormInput
                                            label="Tipo Sanguíneo"
                                            name="emergencyBloodType"
                                            value={formData.emergencyContact?.bloodType || 'A+'}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                emergencyContact: {
                                                    ...(formData.emergencyContact || { id: `ec-${Date.now()}`, name: '', healthPlan: '', phone: '' }),
                                                    bloodType: e.target.value as BloodType
                                                }
                                            })}
                                            as="select"
                                            options={[
                                                { value: 'A+', label: 'A+' },
                                                { value: 'A-', label: 'A-' },
                                                { value: 'B+', label: 'B+' },
                                                { value: 'B-', label: 'B-' },
                                                { value: 'AB+', label: 'AB+' },
                                                { value: 'AB-', label: 'AB-' },
                                                { value: 'O+', label: 'O+' },
                                                { value: 'O-', label: 'O-' }
                                            ]}
                                        />
                                    </div>
                                )}

                                {/* TAB: Responsáveis */}
                                {activeTab === 'responsible' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h4 className="text-sm font-semibold text-foreground">Responsáveis</h4>
                                            <button
                                                onClick={addResponsible}
                                                className="flex items-center gap-1 text-xs text-gold hover:text-gold-dark transition-colors"
                                            >
                                                <Plus className="w-3 h-3" /> Adicionar
                                            </button>
                                        </div>
                                        {formData.responsible?.map((resp) => (
                                            <div key={resp.id} className="p-4 bg-muted/20 rounded-lg border border-border/40 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-medium text-muted-foreground">Responsável</span>
                                                    <button
                                                        onClick={() => removeResponsible(resp.id)}
                                                        className="p-1.5 text-red-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <input
                                                        type="text"
                                                        value={resp.name}
                                                        onChange={(e) => updateResponsible(resp.id, 'name', e.target.value)}
                                                        placeholder="Nome completo"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={resp.relationship}
                                                        onChange={(e) => updateResponsible(resp.id, 'relationship', e.target.value)}
                                                        placeholder="Relação (ex: Pai, Mãe, Cônjuge)"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={resp.phone}
                                                        onChange={(e) => updateResponsible(resp.id, 'phone', e.target.value)}
                                                        placeholder="Telefone"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                    <input
                                                        type="email"
                                                        value={resp.email}
                                                        onChange={(e) => updateResponsible(resp.id, 'email', e.target.value)}
                                                        placeholder="Email"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={resp.rg}
                                                        onChange={(e) => updateResponsible(resp.id, 'rg', e.target.value)}
                                                        placeholder="RG"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={resp.cpf}
                                                        onChange={(e) => updateResponsible(resp.id, 'cpf', e.target.value)}
                                                        placeholder="CPF/CNPJ"
                                                        className="px-3 py-1.5 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end gap-3 p-5 border-t border-border/60 bg-muted/20">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-dark text-white rounded-xl font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Salvando...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            {editingPatient ? 'Atualizar' : 'Cadastrar'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}