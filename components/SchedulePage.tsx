import React, { useState } from 'react';
import { ScheduledClass } from '../types';
import { initialSchedule } from '../data/schedule';
import Button from './Button';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import { useUser } from '../context/UserContext';
import XMarkIcon from './icons/XMarkIcon';
import CheckIcon from './icons/CheckIcon';
import PencilIcon from './icons/PencilIcon';
import { useCollection } from '../hooks/useFirestore';
import { db } from '../firebase';
import { collection, query, doc, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';

const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

const SchedulePage: React.FC = () => {
    const { user } = useUser();
    const { data: schedule, loading } = useCollection<ScheduledClass>(query(collection(db, 'schedule')));
    
    const [isAdding, setIsAdding] = useState(false);
    const [newClass, setNewClass] = useState<Omit<ScheduledClass, 'id'>>({
        workshop: '',
        turma: '',
        dayOfWeek: daysOfWeek[0],
        time: ''
    });

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingClass, setEditingClass] = useState<ScheduledClass | null>(null);

    if (user.role !== 'admin') {
        return (
            <div className="text-center py-12 bg-white dark:bg-slate-800/50 rounded-lg">
                <h1 className="text-2xl font-bold">Acesso Negado</h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Você não tem permissão para acessar esta página.</p>
            </div>
        );
    }

    const handleInputChange = (field: keyof Omit<ScheduledClass, 'id'>, value: string) => {
        if (isAdding) {
            setNewClass(prev => ({ ...prev, [field]: value }));
        } else if (editingClass) {
            setEditingClass(prev => prev ? { ...prev, [field]: value } : null);
        }
    };

    const handleSaveNewClass = async () => {
        if (newClass.workshop.trim() && newClass.turma.trim() && newClass.time.trim()) {
            // Use a combination of fields for a more stable ID
            const newId = `${newClass.workshop}-${newClass.turma}-${newClass.dayOfWeek}-${newClass.time}`.replace(/\s+/g, '-').toLowerCase();
            await setDoc(doc(db, 'schedule', newId), { ...newClass, id: newId });
            setIsAdding(false);
            setNewClass({ workshop: '', turma: '', dayOfWeek: daysOfWeek[0], time: '' });
        }
    };
    
    const handleStartEdit = (cls: ScheduledClass) => {
        setEditingId(cls.id);
        setEditingClass(cls);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingClass(null);
    };

    const handleSaveEdit = async () => {
        if (editingClass) {
            await setDoc(doc(db, 'schedule', editingClass.id), editingClass);
            handleCancelEdit();
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Tem certeza que deseja excluir este horário?')) {
            await deleteDoc(doc(db, 'schedule', id));
        }
    };

    const handleSeedData = async () => {
        if (schedule.length > 0) {
            alert('A agenda já contém dados. A importação foi cancelada.');
            return;
        }
        if (!window.confirm('Isso irá importar os horários padrão para o banco de dados. Deseja continuar?')) {
            return;
        }
        try {
            const batch = writeBatch(db);
            initialSchedule.forEach((item) => {
                const docRef = doc(db, 'schedule', item.id);
                batch.set(docRef, item);
            });
            await batch.commit();
            alert('Dados iniciais de horários importados com sucesso!');
        } catch (error) {
            console.error("Error seeding data: ", error);
            alert('Ocorreu um erro ao importar os dados.');
        }
    };

    const renderClassRow = (cls: ScheduledClass) => {
        const isEditingThis = editingId === cls.id;
        return (
            <tr key={cls.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/20">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">
                    {isEditingThis ? (
                        <input type="text" value={editingClass?.workshop || ''} onChange={(e) => handleInputChange('workshop', e.target.value)} className="w-full bg-white dark:bg-slate-700 p-1 border rounded-md border-slate-400 dark:border-slate-500" />
                    ) : cls.workshop}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {isEditingThis ? (
                        <input type="text" value={editingClass?.turma || ''} onChange={(e) => handleInputChange('turma', e.target.value)} className="w-20 bg-white dark:bg-slate-700 p-1 border rounded-md border-slate-400 dark:border-slate-500" />
                    ) : cls.turma}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {isEditingThis ? (
                        <select value={editingClass?.dayOfWeek} onChange={(e) => handleInputChange('dayOfWeek', e.target.value)} className="w-full bg-white dark:bg-slate-700 p-1 border rounded-md border-slate-400 dark:border-slate-500">
                            {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                        </select>
                    ) : cls.dayOfWeek}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                    {isEditingThis ? (
                        <input type="text" value={editingClass?.time || ''} onChange={(e) => handleInputChange('time', e.target.value)} className="w-full bg-white dark:bg-slate-700 p-1 border rounded-md border-slate-400 dark:border-slate-500" />
                    ) : cls.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    {isEditingThis ? (
                        <div className="flex items-center justify-center gap-2">
                            <button onClick={handleSaveEdit} className="p-1 text-green-500 hover:text-green-700 dark:hover:text-green-400" title="Salvar"><CheckIcon className="h-5 w-5" /></button>
                            <button onClick={handleCancelEdit} className="p-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" title="Cancelar"><XMarkIcon className="h-5 w-5" /></button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleStartEdit(cls)} className="p-1 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400" title="Editar"><PencilIcon className="h-5 w-5" /></button>
                            <button onClick={() => handleDelete(cls.id)} className="p-1 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400" title="Excluir"><TrashIcon className="h-5 w-5" /></button>
                        </div>
                    )}
                </td>
            </tr>
        )
    };
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
                  Gerenciar Horários
                </h1>
                {!isAdding && (
                    <Button onClick={() => setIsAdding(true)}>
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Adicionar Horário
                    </Button>
                )}
            </div>

            {isAdding && (
                 <div className="bg-white dark:bg-slate-800/50 shadow-sm rounded-lg p-6 border border-slate-200 dark:border-slate-800">
                     <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Novo Horário</h2>
                     <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Oficina</label>
                            <input type="text" value={newClass.workshop} onChange={(e) => handleInputChange('workshop', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md" placeholder="Ex: Violão"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Turma</label>
                            <input type="text" value={newClass.turma} onChange={(e) => handleInputChange('turma', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md" placeholder="Ex: A"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Dia da Semana</label>
                             <select value={newClass.dayOfWeek} onChange={(e) => handleInputChange('dayOfWeek', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md">
                                {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Horário</label>
                            <input type="text" value={newClass.time} onChange={(e) => handleInputChange('time', e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md" placeholder="Ex: 08:00 ou 08:00-10:00"/>
                        </div>
                     </div>
                     <div className="flex gap-2 mt-4">
                        <Button onClick={handleSaveNewClass}>Salvar</Button>
                        <Button variant="secondary" onClick={() => setIsAdding(false)}>Cancelar</Button>
                     </div>
                 </div>
            )}
            
            <div className="bg-white dark:bg-slate-800/50 shadow-sm rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                {schedule.length === 0 && !loading && (
                    <div className="p-4 text-center">
                        <p className="text-slate-500 dark:text-slate-400 mb-4">Nenhum horário cadastrado. Você pode importar os horários padrão.</p>
                        <Button onClick={handleSeedData}>Importar Horários Padrão</Button>
                    </div>
                )}
                <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Oficina</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Turma</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Dia da Semana</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Horário</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Ações</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800/50 divide-y divide-slate-200 dark:divide-slate-700">
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-4">Carregando horários...</td></tr>
                        ) : (
                            schedule.sort((a,b) => a.workshop.localeCompare(b.workshop)).map(cls => renderClassRow(cls))
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;