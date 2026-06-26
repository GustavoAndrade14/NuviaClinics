/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/set-state-in-effect */
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
    DoorOpen,
    Bed,
    Users,
    Clock,
    ChevronLeft,
    ChevronRight,
    Filter
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// ============================================
// TIPOS
// ============================================

type RoomStatus = 'active' | 'inactive';

interface Room {
    id: string;
    name: string;
    status: RoomStatus;
    createdAt: string;
    updatedAt: string;
}

// ============================================
// DADOS MOCKADOS
// ============================================

const mockRooms: Room[] = [
    {
        id: '1',
        name: 'Sala 01 - Clínica Geral',
        status: 'active',
        createdAt: '2024-01-10T08:00:00',
        updatedAt: '2024-01-10T08:00:00'
    },
    {
        id: '2',
        name: 'Sala 02 - Odontologia',
        status: 'inactive',
        createdAt: '2024-01-10T08:00:00',
        updatedAt: '2024-01-10T08:00:00'
    },
    {
        id: '3',
        name: 'Sala 03 - Procedimentos Estéticos',
        status: 'active',
        createdAt: '2024-01-10T08:00:00',
        updatedAt: '2024-01-10T08:00:00'
    },
    {
        id: '4',
        name: 'Sala 04 - Pequena Cirurgia',
        status: 'inactive',
        createdAt: '2024-01-10T08:00:00',
        updatedAt: '2024-01-10T08:00:00'
    },
    {
        id: '5',
        name: 'Sala 05 - Laserterapia',
        status: 'active',
        createdAt: '2024-01-10T08:00:00',
        updatedAt: '2024-01-10T08:00:00'
    },
    {
        id: '6',
        name: 'Sala 06 - Procedimentos Injetáveis',
        status: 'inactive',
        createdAt: '2024-01-10T08:00:00',
        updatedAt: '2024-01-10T08:00:00'
    },
    {
        id: '7',
        name: 'Sala 07 - Emergência',
        status: 'active',
        createdAt: '2024-01-10T08:00:00',
        updatedAt: '2024-01-10T08:00:00'
    },
    {
        id: '8',
        name: 'Sala 08 - Fisioterapia',
        status: 'inactive',
        createdAt: '2024-01-10T08:00:00',
        updatedAt: '2024-01-10T08:00:00'
    }
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

export default function SalaProcedimentoPage() {
    const [rooms, setRooms] = useState<Room[]>(mockRooms);
    const [filteredRooms, setFilteredRooms] = useState<Room[]>(mockRooms);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    const itemsPerPage = 6;

    // Estado do formulário
    const [formData, setFormData] = useState<Partial<Room>>({
        name: '',
        status: 'active'
    });

    // ==========================================
    // FILTROS E PESQUISA
    // ==========================================

    useEffect(() => {
        let result = rooms;

        // Filtro por status
        if (statusFilter !== 'all') {
            result = result.filter(r => r.status === statusFilter);
        }

        // Filtro por busca
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(r =>
                r.name.toLowerCase().includes(term)
            );
        }

        setFilteredRooms(result);
        setCurrentPage(1);
    }, [rooms, searchTerm, statusFilter]);

    // ==========================================
    // CRUD
    // ==========================================

    const handleSave = async () => {
        setIsLoading(true);

        // Validação
        if (!formData.name?.trim()) {
            setNotification({ type: 'error', message: 'O nome da sala é obrigatório' });
            setIsLoading(false);
            setTimeout(() => setNotification(null), 4000);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            if (editingRoom) {
                // Editar
                const updated = rooms.map(r =>
                    r.id === editingRoom.id
                        ? {
                            ...r,
                            name: formData.name || r.name,
                            status: formData.status as RoomStatus || r.status,
                            updatedAt: new Date().toISOString()
                        }
                        : r
                );
                setRooms(updated);
                setNotification({ type: 'success', message: 'Sala atualizada com sucesso!' });
            } else {
                // Criar
                const newRoom: Room = {
                    id: `room-${Date.now()}`,
                    name: formData.name || '',
                    status: (formData.status as RoomStatus) || 'active',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                setRooms([newRoom, ...rooms]);
                setNotification({ type: 'success', message: 'Sala cadastrada com sucesso!' });
            }

            resetForm();
            setIsModalOpen(false);
        } catch (error) {
            setNotification({ type: 'error', message: 'Erro ao salvar sala' });
        } finally {
            setIsLoading(false);
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta sala?')) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            setRooms(rooms.filter(r => r.id !== id));
            setNotification({ type: 'success', message: 'Sala removida com sucesso!' });
        } catch (error) {
            setNotification({ type: 'error', message: 'Erro ao remover sala' });
        } finally {
            setIsLoading(false);
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const handleEdit = (room: Room) => {
        setEditingRoom(room);
        setFormData({ ...room });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingRoom(null);
        setFormData({
            name: '',
            status: 'active'
        });
    };

    // ==========================================
    // UTILITÁRIOS
    // ==========================================

    const getStatusInfo = (status: RoomStatus) => {
        const map: Record<RoomStatus, { label: string; color: string; icon: any }> = {
            active: {
                label: 'Ativa',
                color: 'text-green-600 bg-green-50 border-green-200',
                icon: CheckCircle
            },
            inactive: {
                label: 'Inativa',
                color: 'text-red-600 bg-red-50 border-red-200',
                icon: X
            },
        };
        return map[status] || map.inactive;
    };

    const getStatusOptions = () => {
        return [
            { value: 'all', label: 'Todos' },
            { value: 'active', label: 'Ativas' },
            { value: 'inactive', label: 'Inativas' }
        ];
    };

    // ==========================================
    // PAGINAÇÃO
    // ==========================================

    const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRooms = filteredRooms.slice(startIndex, startIndex + itemsPerPage);

    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div className="p-6 max-w-screen-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-heading font-bold text-foreground">Salas de Procedimento</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Gerencie as salas de procedimento da clínica
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
                    Nova Sala
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
                        placeholder="Buscar por nome da sala..."
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
                                    {getStatusOptions().map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
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
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="bg-card border border-border/60 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-xl font-bold text-foreground">{rooms.length}</p>
                </div>
                <div className="bg-card border border-border/60 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Ativa</p>
                    <p className="text-xl font-bold text-green-600">{rooms.filter(r => r.status === 'active').length}</p>
                </div>
                <div className="bg-card border border-border/60 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">Inativa</p>
                    <p className="text-xl font-bold text-red-600">{rooms.filter(r => r.status === 'inactive').length}</p>
                </div>
            </div>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentRooms.length === 0 ? (
                    <div className="col-span-full text-center py-16 text-muted-foreground">
                        <DoorOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-medium">Nenhuma sala encontrada</p>
                        <p className="text-sm">Tente ajustar os filtros ou criar uma nova sala</p>
                    </div>
                ) : (
                    currentRooms.map((room, index) => {
                        const statusInfo = getStatusInfo(room.status);
                        const StatusIcon = statusInfo.icon;

                        return (
                            <motion.div
                                key={room.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-card border border-border/60 rounded-xl p-5 hover:shadow-md transition-shadow group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gold-light/20 flex items-center justify-center">
                                            <DoorOpen className="w-5 h-5 text-gold" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground text-sm">{room.name}</h3>
                                            <p className="text-xs text-muted-foreground">
                                                Criado em {format(new Date(room.createdAt), 'dd/MM/yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                                        <StatusIcon className="w-3 h-3" />
                                        {statusInfo.label}
                                    </span>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => handleEdit(room)}
                                            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                                            title="Editar"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(room.id)}
                                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                            title="Excluir"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            {/* Pagination */}
            {filteredRooms.length > 0 && (
                <div className="flex items-center justify-between px-4 py-3 bg-card border border-border/60 rounded-xl">
                    <p className="text-xs text-muted-foreground">
                        Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredRooms.length)} de {filteredRooms.length}
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
                            className="bg-card rounded-2xl w-full max-w-md overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-5 border-b border-border/60">
                                <div>
                                    <h2 className="text-lg font-heading font-bold text-foreground">
                                        {editingRoom ? 'Editar Sala' : 'Nova Sala'}
                                    </h2>
                                    <p className="text-xs text-muted-foreground">
                                        {editingRoom ? 'Atualize os dados da sala' : 'Cadastre uma nova sala de procedimento'}
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
                            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                        Nome da Sala <span className="text-rose">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Ex: Sala 01 - Clínica Geral"
                                        className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">
                                        Status
                                    </label>
                                    <select
                                        value={formData.status || 'available'}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as RoomStatus })}
                                        className="w-full px-3 py-2 bg-background border border-border/60 rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all"
                                    >
                                        <option value="active">Ativa</option>
                                        <option value="inactive">Inativa</option>
                                    </select>
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
                                            {editingRoom ? 'Atualizar' : 'Cadastrar'}
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