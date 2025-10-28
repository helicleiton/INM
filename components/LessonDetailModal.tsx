import React, { useEffect, useRef } from 'react';
import { Lesson } from '../types';
import { Remarkable } from 'remarkable';
import XMarkIcon from './icons/XMarkIcon';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import UsersIcon from './icons/UsersIcon';

interface LessonDetailModalProps {
  lesson: Lesson;
  onClose: () => void;
}

const md = new Remarkable();

const LessonDetailModal: React.FC<LessonDetailModalProps> = ({ lesson, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClickOutside}
        aria-labelledby="lesson-details-title"
        role="dialog"
        aria-modal="true"
    >
      <div ref={modalRef} className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
            <div>
                <h2 id="lesson-details-title" className="text-xl font-bold text-slate-800 dark:text-slate-100">{lesson.topic}</h2>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1.5"><CalendarDaysIcon className="h-4 w-4" /> {new Date(lesson.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</span>
                    <span className="flex items-center gap-1.5"><UsersIcon className="h-4 w-4" /> {lesson.workshop} - {lesson.turma}</span>
                </div>
            </div>
            <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                aria-label="Fechar modal"
            >
                <XMarkIcon className="h-6 w-6" />
            </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div
            className="prose prose-sm dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: md.render(lesson.content) }}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonDetailModal;
