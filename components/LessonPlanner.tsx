import React, { useState, useMemo, useEffect } from 'react';
import { Lesson, Student, ScheduledClass } from '../types';
import Button from './Button';
import PlusIcon from './icons/PlusIcon';
import LessonItem from './LessonItem';
import CalendarView from './CalendarView';
import LessonDetailModal from './LessonDetailModal';
import ListBulletIcon from './icons/ListBulletIcon';
import CalendarIcon from './icons/CalendarIcon';
import { useUser } from '../context/UserContext';
import { useCollection } from '../hooks/useFirestore';
import { db } from '../firebase';
import { collection, query, where, orderBy, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { suggestLessonContent } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';

const LessonPlanner: React.FC = () => {
  const { user } = useUser();

  // Firestore queries
  const lessonsQuery = useMemo(() => {
    let q = query(collection(db, 'lessons'), orderBy('date', 'desc'));
    if (user.role === 'vocal_teacher') {
      q = query(q, where('workshop', '==', 'Técnica Vocal'));
    }
    return q;
  }, [user.role]);
  
  const studentsQuery = useMemo(() => {
      let q = query(collection(db, 'students'));
      if (user.role === 'vocal_teacher') {
          q = query(q, where('workshop', '==', 'Técnica Vocal'));
      }
      return q;
  }, [user.role]);
  
  const scheduleQuery = query(collection(db, 'schedule'));

  const { data: lessons, loading: lessonsLoading } = useCollection<Lesson>(lessonsQuery);
  const { data: students, loading: studentsLoading } = useCollection<Student>(studentsQuery);
  const { data: schedule, loading: scheduleLoading } = useCollection<ScheduledClass>(scheduleQuery);

  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const availableClasses = useMemo(() => {
    if (user.role === 'vocal_teacher') {
      return schedule.filter(c => c.workshop === 'Técnica Vocal');
    }
    return schedule;
  }, [user.role, schedule]);
  
  const [newLessonDate, setNewLessonDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [isSuggesting, setIsSuggesting] = useState(false);

  useEffect(() => {
    if (availableClasses.length > 0 && !availableClasses.find(c => c.id === selectedClassId)) {
      setSelectedClassId(availableClasses[0].id);
    }
  }, [availableClasses, selectedClassId]);

  const handleAddLesson = async () => {
    const selectedClass = schedule.find(c => c.id === selectedClassId);
    if (!selectedClass) return;

    const newLessonData: Omit<Lesson, 'id'> = {
      date: newLessonDate,
      workshop: selectedClass.workshop,
      turma: selectedClass.turma,
      topic: 'Novo Tópico (Manual)',
      content: 'Adicione o conteúdo aqui...',
      materials: [],
      attendance: {},
    };
    await addDoc(collection(db, 'lessons'), newLessonData);
  };

  const handleSuggestLesson = async () => {
    const selectedClass = schedule.find(c => c.id === selectedClassId);
    if (!selectedClass) return;

    setIsSuggesting(true);
    try {
        const suggestion = await suggestLessonContent(selectedClass.workshop, selectedClass.turma);
        
        const newLessonData: Omit<Lesson, 'id'> = {
            date: newLessonDate,
            workshop: selectedClass.workshop,
            turma: selectedClass.turma,
            topic: suggestion.topic,
            content: suggestion.content,
            materials: [],
            attendance: {},
        };
        await addDoc(collection(db, 'lessons'), newLessonData);

    } catch (error) {
        console.error("Failed to get AI suggestion:", error);
        alert("Ocorreu um erro ao buscar a sugestão da IA. Tente novamente.");
    } finally {
        setIsSuggesting(false);
    }
  };

  const handleUpdateLesson = async (updatedLesson: Lesson) => {
    const lessonDoc = doc(db, 'lessons', updatedLesson.id);
    const { id, ...dataToUpdate } = updatedLesson;
    await updateDoc(lessonDoc, dataToUpdate);
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (user.role !== 'admin') return;
    if (!window.confirm('Tem certeza de que deseja excluir este plano de aula?')) return;
    await deleteDoc(doc(db, 'lessons', lessonId));
    if (selectedLesson?.id === lessonId) {
      setSelectedLesson(null);
    }
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleCloseModal = () => {
    setSelectedLesson(null);
  }

  const viewButtonClasses = "p-2 rounded-md transition-colors";
  const activeViewClasses = "bg-blue-600 text-white shadow-sm";
  const inactiveViewClasses = "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300";

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800/50 shadow-sm rounded-lg p-6 border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Adicionar Nova Aula</h2>
        {scheduleLoading ? <p>Carregando turmas...</p> : availableClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Data</label>
                <input
                type="date"
                id="date"
                value={newLessonDate}
                onChange={(e) => setNewLessonDate(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="scheduled-class" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Turma Agendada</label>
                <select
                id="scheduled-class"
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                {availableClasses.map(c => 
                    <option key={c.id} value={c.id}>
                    {c.workshop} - {c.turma} ({c.dayOfWeek.substring(0,3)}, {c.time})
                    </option>
                )}
                </select>
            </div>
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 justify-end pt-2">
                <Button onClick={handleAddLesson} className="w-full sm:w-auto" variant="secondary" disabled={!selectedClassId || isSuggesting}>
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Adicionar Manual
                </Button>
                <Button onClick={handleSuggestLesson} className="w-full sm:w-auto" disabled={!selectedClassId || isSuggesting}>
                    {isSuggesting ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                        <SparklesIcon className="h-5 w-5 mr-2" />
                    )}
                    {isSuggesting ? 'Gerando...' : 'Sugerir com IA'}
                </Button>
            </div>
            </div>
        ) : (
            <p className="text-slate-500 dark:text-slate-400">Não há turmas disponíveis para o seu perfil. O administrador precisa cadastrar horários na página 'Horários'.</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Planos de Aula</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setView('list')} className={`${viewButtonClasses} ${view === 'list' ? activeViewClasses : inactiveViewClasses}`} title="Visualização em Lista">
              <ListBulletIcon className="h-5 w-5" />
            </button>
            <button onClick={() => setView('calendar')} className={`${viewButtonClasses} ${view === 'calendar' ? activeViewClasses : inactiveViewClasses}`} title="Visualização em Calendário">
              <CalendarIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {lessonsLoading || studentsLoading ? <p className="text-center py-12">Carregando planos de aula...</p> : view === 'list' ? (
          lessons.length > 0 ? (
            lessons.map(lesson => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                onUpdate={handleUpdateLesson}
                onDelete={handleDeleteLesson}
                students={students.filter(s => s.turma === lesson.turma && s.workshop === lesson.workshop)}
                userRole={user.role}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">Nenhum plano de aula ainda.</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Adicione uma nova aula para começar.</p>
            </div>
          )
        ) : (
          <CalendarView lessons={lessons} onLessonClick={handleSelectLesson} />
        )}
      </div>

      {selectedLesson && (
        <LessonDetailModal
          lesson={selectedLesson}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default LessonPlanner;