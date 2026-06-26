/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    X,
    Save,
    CheckCircle,
    AlertCircle,
    User,
    Mail,
    Briefcase,
    Clock,
    Shield,
    Image as ImageIcon,
    Upload,
    ChevronLeft,
    ChevronRight,
    Filter,
    LayoutDashboard,
    Calendar,
    Users,
    ShoppingBag,
    HandHeart,
    DollarSign,
    PackageOpen,
    SquarePen,
    House,
    ChevronDown
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// ============================================
// TIPOS
// ============================================

type UserStatus = 'active' | 'inactive';
type UserRole = 'admin' | 'manager' | 'receptionist' | 'doctor' | 'assistant';

interface UserPermission {
    id: string;
    label: string;
    path?: string;
    icon?: any;
    subItems?: { label: string; path: string }[];
}

interface User {
    id: string;
    photo: string | null;
    email: string;
    name: string;
    role: UserRole;
    color: string;
    workStart: string;
    workEnd: string;
    status: UserStatus;
    password: string;
    permissions: string[]; // paths dos menus que o usuário pode ver
    createdAt: string;
    updatedAt: string;
}

// ============================================
// NAVIGATION ITEMS (para referência)
// ============================================

const navItems: UserPermission[] = [
    {
        id: 'dashboard',
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/dashboard"
    },
    {
        id: 'agenda',
        icon: Calendar,
        label: "Agenda",
        path: "/agenda"
    },
    {
        id: 'pacientes',
        icon: Users,
        label: "Pacientes",
        path: "/pacientes",
    },
    {
        id: 'vendas',
        icon: ShoppingBag,
        label: "Vendas",
        path: "/vendas",
    },
    {
        id: 'atendimento',
        icon: HandHeart,
        label: "Atendimento",
        subItems: [
            { label: "Agendamentos", path: "/agendamentos" },
            { label: "Anamnese", path: "/anamnese" },
            { label: "Receituários", path: "/receituarios" },
            { label: "Termos de Consentimento", path: "/termos" },
            { label: "Atestados", path: "/atestados" },
        ]
    },
    {
        id: 'financeiro',
        icon: DollarSign,
        label: "Financeiro",
        subItems: [
            { label: "Contas a Receber", path: "/contas-receber" },
            { label: "Contas a Pagar", path: "/contas-pagar" },
        ]
    },
    {
        id: 'estoque',
        icon: PackageOpen,
        label: "Estoque",
        subItems: [
            { label: "Movimentações de Estoque", path: "/movimentacoes" },
            { label: "Estoque Atual", path: "/estoque" },
        ]
    },
    {
        id: 'cadastro',
        icon: SquarePen,
        label: "Cadastro",
        subItems: [
            { label: "Produtos", path: "/produtos" },
            { label: "Procedimentos", path: "/procedimentos" },
            { label: "Modelos de Anamnese", path: "/modelo-anamnese" },
            { label: "Modelos de Receita", path: "/modelo-receita" },
            { label: "Fornecedores", path: "/fornecedores" },
        ]
    },
    {
        id: 'minha-clinica',
        icon: House,
        label: "Minha Clínica",
        subItems: [
            { label: "Informações", path: "/informacoes" },
            { label: "Salas de Procedimento", path: "/salas" },
            { label: "Usuários", path: "/usuarios" },
        ]
    }
];

// Cores disponíveis para o usuário
const availableColors = [
    '#C9A84C', '#E88FA0', '#5B8DB8', '#6DBF8A', '#A87EC9',
    '#F59E0B', '#EF4444', '#3B82F6', '#10B981', '#8B5CF6',
    '#EC4899', '#F97316', '#14B8A6', '#6366F1', '#E11D48'
];

// ============================================
// DADOS MOCKADOS
// ============================================

const mockUsers: User[] = [
    {
        id: '1',
        photo: null,
        email: 'admin@nuvia.com.br',
        name: 'Administrador',
        role: 'admin',
        color: '#C9A84C',
        workStart: '08:00',
        workEnd: '18:00',
        status: 'active',
        password: 'admin123',
        permissions: navItems
            .map(item => item.path)
            .filter((path): path is string => path !== undefined),
        createdAt: '2024-01-01T08:00:00',
        updatedAt: '2024-01-01T08:00:00'
    },
    {
        id: '2',
        photo: null,
        email: 'doutora@nuvia.com.br',
        name: 'Dra. Mariana Santos',
        role: 'doctor',
        color: '#E88FA0',
        workStart: '09:00',
        workEnd: '17:00',
        status: 'active',
        password: 'doctor123',
        permissions: ['/dashboard', '/agenda', '/pacientes', '/atendimento', '/anamnese', '/receituarios', '/termos', '/atestados'],
        createdAt: '2024-01-15T09:00:00',
        updatedAt: '2024-01-15T09:00:00'
    },
    {
        id: '3',
        photo: null,
        email: 'recepcionista@nuvia.com.br',
        name: 'Carla Oliveira',
        role: 'receptionist',
        color: '#5B8DB8',
        workStart: '08:00',
        workEnd: '17:00',
        status: 'active',
        password: 'recep123',
        permissions: ['/dashboard', '/agenda', '/pacientes', '/vendas'],
        createdAt: '2024-02-01T10:00:00',
        updatedAt: '2024-02-01T10:00:00'
    },
    {
        id: '4',
        photo: null,
        email: 'assistente@nuvia.com.br',
        name: 'João Silva',
        role: 'assistant',
        color: '#6DBF8A',
        workStart: '10:00',
        workEnd: '19:00',
        status: 'inactive',
        password: 'assist123',
        permissions: ['/dashboard', '/pacientes', '/vendas'],
        createdAt: '2024-02-15T11:00:00',
        updatedAt: '2024-02-15T11:00:00'
    }
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function UsersManagement() {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const itemsPerPage = 5;

    // Estado do formulário
    const [formData, setFormData] = useState<Partial<User>>({
        photo: null,
        email: '',
        name: '',
        role: 'receptionist',
        color: availableColors[0],
        workStart: '08:00',
        workEnd: '18:00',
        status: 'active',
        password: '',
        permissions: []
    });

    // ==========================================
    // FILTROS E PESQUISA
    // ==========================================

    useEffect(() => {
        let result = users;

        if (statusFilter !== 'all') {
            result = result.filter(u => u.status === statusFilter);
        }

        if (roleFilter !== 'all') {
            result = result.filter(u => u.role === roleFilter);
        }

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(u =>
                u.name.toLowerCase().includes(term) ||
                u.email.toLowerCase().includes(term) ||
                u.role.toLowerCase().includes(term)
            );
        }

        setFilteredUsers(result);
        setCurrentPage(1);
    }, [users, searchTerm, statusFilter, roleFilter]);

    // ==========================================
    // CRUD
    // ==========================================

    const handleSave = async () => {
        setIsLoading(true);

        if (!formData.name?.trim()) {
            setNotification({ type: 'error', message: 'O nome do usuário é obrigatório' });
            setIsLoading(false);
            setTimeout(() => setNotification(null), 4000);
            return;
        }

        if (!formData.email?.trim()) {
            setNotification({ type: 'error', message: 'O email do usuário é obrigatório' });
            setIsLoading(false);
            setTimeout(() => setNotification(null), 4000);
            return;
        }

        if (!editingUser && !formData.password?.trim()) {
            setNotification({ type: 'error', message: 'A senha inicial é obrigatória' });
            setIsLoading(false);
            setTimeout(() => setNotification(null), 4000);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            if (editingUser) {
                const updated = users.map(u =>
                    u.id === editingUser.id
                        ? {
                            ...u,
                            photo: formData.photo !== undefined ? formData.photo : u.photo,
                            email: formData.email || u.email,
                            name: formData.name || u.name,
                            role: formData.role as UserRole || u.role,
                            color: formData.color || u.color,
                            workStart: formData.workStart || u.workStart,
                            workEnd: formData.workEnd || u.workEnd,
                            status: formData.status as UserStatus || u.status,
                            permissions: formData.permissions || u.permissions,
                            updatedAt: new Date().toISOString()
                        }
                        : u
                );
                setUsers(updated);
                setNotification({ type: 'success', message: 'Usuário atualizado com sucesso!' });
            } else {
                const newUser: User = {
                    id: `user-${Date.now()}`,
                    photo: formData.photo || null,
                    email: formData.email || '',
                    name: formData.name || '',
                    role: (formData.role as UserRole) || 'receptionist',
                    color: formData.color || availableColors[0],
                    workStart: formData.workStart || '08:00',
                    workEnd: formData.workEnd || '18:00',
                    status: (formData.status as UserStatus) || 'active',
                    password: formData.password || '',
                    permissions: formData.permissions || [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                setUsers([newUser, ...users]);
                setNotification({ type: 'success', message: 'Usuário cadastrado com sucesso!' });
            }

            resetForm();
            setIsModalOpen(false);
        } catch (error) {
            setNotification({ type: 'error', message: 'Erro ao salvar usuário' });
        } finally {
            setIsLoading(false);
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setUsers(users.filter(u => u.id !== id));
            setNotification({ type: 'success', message: 'Usuário removido com sucesso!' });
        } catch (error) {
            setNotification({ type: 'error', message: 'Erro ao remover usuário' });
        } finally {
            setIsLoading(false);
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setFormData({ ...user });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingUser(null);
        setFormData({
            photo: null,
            email: '',
            name: '',
            role: 'receptionist',
            color: availableColors[0],
            workStart: '08:00',
            workEnd: '18:00',
            status: 'active',
            password: '',
            permissions: []
        });
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const togglePermission = (path: string) => {
        const current = formData.permissions || [];
        if (current.includes(path)) {
            setFormData({
                ...formData,
                permissions: current.filter(p => p !== path)
            });
        } else {
            setFormData({
                ...formData,
                permissions: [...current, path]
            });
        }
    };

    const toggleAllPermissions = () => {
        const allPaths = getAllPermissionPaths();
        const current = formData.permissions || [];
        if (current.length === allPaths.length) {
            setFormData({ ...formData, permissions: [] });
        } else {
            setFormData({ ...formData, permissions: allPaths });
        }
    };

    const getAllPermissionPaths = (): string[] => {
        const paths: string[] = [];
        navItems.forEach(item => {
            if (item.subItems) {
                item.subItems.forEach(sub => paths.push(sub.path));
            } else if (item.path) {
                paths.push(item.path);
            }
        });
        return paths;
    };

    const isAllPermissionsSelected = () => {
        const allPaths = getAllPermissionPaths();
        const current = formData.permissions || [];
        return allPaths.length > 0 && allPaths.every(p => current.includes(p));
    };

    const getRoleLabel = (role: UserRole) => {
        const map: Record<UserRole, string> = {
            admin: 'Administrador',
            manager: 'Gerente',
            receptionist: 'Recepcionista',
            doctor: 'Médico(a)',
            assistant: 'Assistente'
        };
        return map[role] || role;
    };

    const getStatusInfo = (status: UserStatus) => {
        const map: Record<UserStatus, { label: string; color: string }> = {
            active: { label: 'Ativo', color: 'text-green-600 bg-green-50' },
            inactive: { label: 'Inativo', color: 'text-gray-600 bg-gray-50' }
        };
        return map[status];
    };

    // ==========================================
    // PAGINAÇÃO
    // ==========================================

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div className="p-6 max-w-screen-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">Usuários</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Gerencie os usuários e permissões do sistema
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
                    Novo Usuário
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
                        placeholder="Buscar por nome, email ou cargo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-background border border-border/60 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${showFilters || statusFilter !== 'all' || roleFilter !== 'all'
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
                        <div className="p-4 bg-muted/30 rounded-xl border border-border/60 flex flex-wrap gap-4 items-end">
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
                                </select>
                            </div>
                            <div className="flex-1 min-w-[150px]">
                                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Cargo</label>
                                <select
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                    className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40"
                                >
                                    <option value="all">Todos</option>
                                    <option value="admin">Administrador</option>
                                    <option value="manager">Gerente</option>
                                    <option value="doctor">Médico(a)</option>
                                    <option value="receptionist">Recepcionista</option>
                                    <option value="assistant">Assistente</option>
                                </select>
                            </div>
                            <button
                                onClick={() => {
                                    setStatusFilter('all');
                                    setRoleFilter('all');
                                    setSearchTerm('');
                                }}
                                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="bg-card border border-border/60 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-xl font-bold text-foreground">{users.length}</p>
                </div>
                <div className="bg-card border border-border/60 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Ativos</p>
                    <p className="text-xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
                </div>
                <div className="bg-card border border-border/60 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Administradores</p>
                    <p className="text-xl font-bold text-gold">{users.filter(u => u.role === 'admin').length}</p>
                </div>
                <div className="bg-card border border-border/60 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Médicos</p>
                    <p className="text-xl font-bold text-rose">{users.filter(u => u.role === 'doctor').length}</p>
                </div>
                <div className="bg-card border border-border/60 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Recepcionistas</p>
                    <p className="text-xl font-bold text-blue-500">{users.filter(u => u.role === 'receptionist').length}</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border/60 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-muted/50 border-b border-border/60">
                            <tr>
                                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Usuário</th>
                                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Email</th>
                                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Cargo</th>
                                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden xl:table-cell">Horário</th>
                                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden sm:table-cell">Status</th>
                                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-muted-foreground">
                                        <User className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                        <p className="text-sm">Nenhum usuário encontrado</p>
                                    </td>
                                </tr>
                            ) : (
                                currentUsers.map((user) => {
                                    const statusInfo = getStatusInfo(user.status);
                                    return (
                                        <tr key={user.id} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                                                        style={{ backgroundColor: user.color }}
                                                    >
                                                        {user.photo ? (
                                                            <img src={user.photo} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                                        ) : (
                                                            user.name.charAt(0).toUpperCase()
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                                                        <p className="text-xs text-muted-foreground">{getRoleLabel(user.role)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 hidden md:table-cell">
                                                <span className="text-sm text-muted-foreground">{user.email}</span>
                                            </td>
                                            <td className="px-4 py-3 hidden lg:table-cell">
                                                <span className="text-xs px-2 py-1 rounded-full bg-gold-light text-gold font-medium">
                                                    {getRoleLabel(user.role)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 hidden xl:table-cell">
                                                <span className="text-xs text-muted-foreground">
                                                    {user.workStart} - {user.workEnd}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 hidden sm:table-cell">
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusInfo.color}`}>
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                                                        title="Editar"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                                        title="Excluir"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {filteredUsers.length > 0 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-border/60">
                        <p className="text-xs text-muted-foreground">
                            Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredUsers.length)} de {filteredUsers.length}
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
                            className="bg-card rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-5 border-b border-border/60">
                                <div>
                                    <h2 className="text-lg font-heading font-bold text-foreground">
                                        {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
                                    </h2>
                                    <p className="text-xs text-muted-foreground">
                                        {editingUser ? 'Atualize os dados do usuário' : 'Cadastre um novo usuário no sistema'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-6">
                                {/* Foto */}
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground block mb-2">
                                        Foto do Usuário
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-border/60 bg-muted/30 flex items-center justify-center overflow-hidden group hover:border-gold transition-colors">
                                            {formData.photo ? (
                                                <>
                                                    <img
                                                        src={formData.photo}
                                                        alt="Foto do usuário"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                                        <label className="cursor-pointer">
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handlePhotoUpload}
                                                                className="hidden"
                                                            />
                                                            <Upload className="w-5 h-5 text-white" />
                                                        </label>
                                                    </div>
                                                </>
                                            ) : (
                                                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handlePhotoUpload}
                                                        className="hidden"
                                                    />
                                                    <ImageIcon className="w-6 h-6 text-muted-foreground/40 mb-1" />
                                                    <span className="text-[8px] text-muted-foreground/60 text-center px-1">
                                                        Clique ou arraste
                                                    </span>
                                                </label>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">
                                                Formatos: PNG, JPG
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Tamanho recomendado: 200x200px
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                            Nome <span className="text-rose">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name || ''}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Nome completo"
                                            className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                            Email <span className="text-rose">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email || ''}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="email@exemplo.com"
                                            className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                            Cargo <span className="text-rose">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name || ''}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                            Cor Padrão
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {availableColors.map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => setFormData({ ...formData, color })}
                                                    className={`w-8 h-8 rounded-full transition-all ${formData.color === color
                                                        ? 'ring-2 ring-offset-2 ring-gold scale-110'
                                                        : 'hover:scale-105'
                                                        }`}
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                            Horário de Atendimento (Início)
                                        </label>
                                        <input
                                            type="time"
                                            value={formData.workStart || '08:00'}
                                            onChange={(e) => setFormData({ ...formData, workStart: e.target.value })}
                                            className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                            Horário de Atendimento (Fim)
                                        </label>
                                        <input
                                            type="time"
                                            value={formData.workEnd || '18:00'}
                                            onChange={(e) => setFormData({ ...formData, workEnd: e.target.value })}
                                            className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                            Status
                                        </label>
                                        <select
                                            value={formData.status || 'active'}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                                            className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                        >
                                            <option value="active">Ativo</option>
                                            <option value="inactive">Inativo</option>
                                        </select>
                                    </div>
                                    {!editingUser && (
                                        <div>
                                            <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                                Senha Inicial <span className="text-rose">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                value={formData.password || ''}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                placeholder="Digite uma senha"
                                                className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Permissões */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-gold" />
                                            Permissões
                                        </h4>
                                        <button
                                            onClick={toggleAllPermissions}
                                            className="text-xs text-gold hover:text-gold-dark transition-colors"
                                        >
                                            {isAllPermissionsSelected() ? 'Desmarcar todos' : 'Marcar todos'}
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-muted/20 rounded-lg p-4 border border-border/40">
                                        {navItems.map((item) => {
                                            const hasSubItems = item.subItems && item.subItems.length > 0;

                                            if (hasSubItems) {
                                                return (
                                                    <div key={item.id} className="col-span-1 md:col-span-2">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <input
                                                                type="checkbox"
                                                                id={`perm-${item.id}`}
                                                                checked={item.subItems?.every(sub => (formData.permissions || []).includes(sub.path))}
                                                                onChange={() => {
                                                                    const paths = item.subItems?.map(sub => sub.path) || [];
                                                                    const allSelected = paths.every(p => (formData.permissions || []).includes(p));
                                                                    if (allSelected) {
                                                                        setFormData({
                                                                            ...formData,
                                                                            permissions: (formData.permissions || []).filter(p => !paths.includes(p))
                                                                        });
                                                                    } else {
                                                                        setFormData({
                                                                            ...formData,
                                                                            permissions: [...(formData.permissions || []), ...paths]
                                                                        });
                                                                    }
                                                                }}
                                                                className="w-4 h-4 rounded border-border text-gold focus:ring-gold focus:ring-offset-0"
                                                            />
                                                            <label htmlFor={`perm-${item.id}`} className="text-sm font-medium text-foreground flex items-center gap-2">
                                                                {item.icon && <item.icon className="w-4 h-4 text-gold" />}
                                                                {item.label}
                                                            </label>
                                                        </div>
                                                        <div className="ml-6 space-y-1">
                                                            {item.subItems?.map((sub) => (
                                                                <div key={sub.path} className="flex items-center gap-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`perm-${sub.path ?? ''}`}
                                                                        checked={sub.path ? (formData.permissions || []).includes(sub.path) : false}
                                                                        onChange={() => sub.path && togglePermission(sub.path)}
                                                                        className="w-3.5 h-3.5 rounded border-border text-gold focus:ring-gold focus:ring-offset-0"
                                                                    />
                                                                    <label htmlFor={`perm-${sub.path}`} className="text-xs text-muted-foreground">
                                                                        {sub.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div key={item.id} className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id={`perm-${item.path ?? ''}`}
                                                        checked={item.path ? (formData.permissions || []).includes(item.path) : false}
                                                        onChange={() => item.path && togglePermission(item.path)}
                                                        className="w-4 h-4 rounded border-border text-gold focus:ring-gold focus:ring-offset-0"
                                                    />
                                                    <label htmlFor={`perm-${item.path}`} className="text-sm text-foreground flex items-center gap-2">
                                                        {item.icon && <item.icon className="w-4 h-4 text-gold" />}
                                                        {item.label}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
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
                                            {editingUser ? 'Atualizar' : 'Cadastrar'}
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