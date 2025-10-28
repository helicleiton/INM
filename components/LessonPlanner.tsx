import React, { useState, useMemo, useEffect } from 'react';
import { Lesson, Student } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Button from './Button';
import PlusIcon from './icons/PlusIcon';
import LessonItem from './LessonItem';
import { schedule } from '../data/schedule';
import CalendarView from './CalendarView';
import LessonDetailModal from './LessonDetailModal';
import ListBulletIcon from './icons/ListBulletIcon';
import CalendarIcon from './icons/CalendarIcon';
import { useUser } from '../context/UserContext';

const LessonPlanner: React.FC = () => {
  const { user } = useUser();
  const [lessons, setLessons] = useLocalStorage<Lesson[]>('lessons', []);
  const [students] = useLocalStorage<Student[]>('students', []);
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const availableClasses = useMemo(() => {
    if (user.role === 'vocal_teacher') {
      return schedule.filter(c => c.workshop === 'Canto Coral');
    }
    return schedule;
  }, [user.role]);
  
  const [newLessonDate, setNewLessonDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedClassId, setSelectedClassId] = useState<string>(availableClasses.length > 0 ? availableClasses[0].id : '');
  
  useEffect(() => {
    // Reset selected class if it's not in the available list for the current user
    if (!availableClasses.find(c => c.id === selectedClassId)) {
        setSelectedClassId(availableClasses.length > 0 ? availableClasses[0].id : '');
    }
  }, [availableClasses, selectedClassId]);


  const sortedLessons = useMemo(() => {
    const userLessons = user.role === 'vocal_teacher' 
      ? lessons.filter(l => l.workshop === 'Canto Coral')
      : lessons;

    return [...userLessons].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [lessons, user.role]);

  const handleAddLesson = (topic: string, content: string) => {
    const selectedClass = schedule.find(c => c.id === selectedClassId);
    if (!selectedClass) return;

    const newLesson: Lesson = {
      id: new Date().toISOString(),
      date: newLessonDate,
      workshop: selectedClass.workshop,
      turma: selectedClass.turma,
      topic: topic,
      content: content,
      materials: [],
      attendance: {},
    };
    setLessons([newLesson, ...lessons]);
  };

  const handleUpdateLesson = (updatedLesson: Lesson) => {
    setLessons(lessons.map(lesson => lesson.id === updatedLesson.id ? updatedLesson : lesson));
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (user.role !== 'admin') return; // Security check
    setLessons(lessons.filter(lesson => lesson.id !== lessonId));
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
        {availableClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
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
            <div className="md:col-span-1">
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
            <Button onClick={() => handleAddLesson('Novo Tópico', 'Adicione o conteúdo aqui...')} className="w-full">
                <PlusIcon className="h-5 w-5 mr-2" />
                Adicionar
                </Button>
            </div>
        ) : (
            <p className="text-slate-500 dark:text-slate-400">Não há turmas disponíveis para o seu perfil.</p>
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
        
        {view === 'list' ? (
          sortedLessons.length > 0 ? (
            sortedLessons.map(lesson => (
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
          <CalendarView lessons={sortedLessons} onLessonClick={handleSelectLesson} />
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