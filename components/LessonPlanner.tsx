import React, { useState, useMemo } from 'react';
import { Lesson, Student } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Button from './Button';
import PlusIcon from './icons/PlusIcon';
import LessonItem from './LessonItem';

const workshops = ["Musicalização", "Violão", "Teclado", "Canto Coral", "Bateria"];
const turmas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

const LessonPlanner: React.FC = () => {
  const [lessons, setLessons] = useLocalStorage<Lesson[]>('lessons', []);
  const [students] = useLocalStorage<Student[]>('students', []);

  const [newLessonDate, setNewLessonDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [newLessonWorkshop, setNewLessonWorkshop] = useState<string>(workshops[0]);
  const [newLessonTurma, setNewLessonTurma] = useState<string>(turmas[0]);

  const sortedLessons = useMemo(() => {
    return [...lessons].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [lessons]);

  const handleAddLesson = (topic: string, content: string) => {
    const newLesson: Lesson = {
      id: new Date().toISOString(),
      date: newLessonDate,
      workshop: newLessonWorkshop,
      turma: newLessonTurma,
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
    setLessons(lessons.filter(lesson => lesson.id !== lessonId));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800/50 shadow-sm rounded-lg p-6 border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Adicionar Nova Aula</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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
            <label htmlFor="workshop" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Oficina</label>
            <select
              id="workshop"
              value={newLessonWorkshop}
              onChange={(e) => setNewLessonWorkshop(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {workshops.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="turma" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Turma</label>
            <select
              id="turma"
              value={newLessonTurma}
              onChange={(e) => setNewLessonTurma(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {turmas.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <Button onClick={() => handleAddLesson('Novo Tópico', 'Adicione o conteúdo aqui...')} className="w-full">
              <PlusIcon className="h-5 w-5 mr-2" />
              Adicionar
            </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Planos de Aula</h2>
        {sortedLessons.length > 0 ? (
          sortedLessons.map(lesson => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              onUpdate={handleUpdateLesson}
              onDelete={handleDeleteLesson}
              students={students.filter(s => s.turma === lesson.turma && s.workshop === lesson.workshop)}
            />
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">Nenhum plano de aula ainda.</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Adicione uma nova aula para começar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonPlanner;