import React, { useState, useRef } from 'react';
import { Lesson, Student } from '../types';
import TrashIcon from './icons/TrashIcon';
import DownloadIcon from './icons/DownloadIcon';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import UsersIcon from './icons/UsersIcon';
import AttendanceTracker from './AttendanceTracker';
import ClipboardUserIcon from './icons/ClipboardUserIcon';
import { Remarkable } from 'remarkable';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface LessonItemProps {
  lesson: Lesson;
  students: Student[];
  onUpdate: (lesson: Lesson) => void;
  onDelete: (lessonId: string) => void;
  userRole: 'admin' | 'vocal_teacher';
}

const md = new Remarkable();

const LessonItem: React.FC<LessonItemProps> = ({ lesson, students, onUpdate, onDelete, userRole }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTopic, setEditedTopic] = useState(lesson.topic);
  const [editedContent, setEditedContent] = useState(lesson.content);
  const [activeTab, setActiveTab] = useState<'content' | 'attendance'>('content');

  const contentRef = useRef<HTMLDivElement>(null);
  const printableAreaRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    onUpdate({ ...lesson, topic: editedTopic, content: editedContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTopic(lesson.topic);
    setEditedContent(lesson.content);
    setIsEditing(false);
  };

  const handleExportPDF = () => {
    const input = printableAreaRef.current;
    if (!input) return;

    html2canvas(input, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      backgroundColor: 'white', // Ensure background is not transparent
      ignoreElements: (element) => element.classList.contains('no-pdf')
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      const canvasAspectRatio = canvasWidth / canvasHeight;
      const pageAspectRatio = pdfWidth / pdfHeight;

      let renderWidth, renderHeight;

      // Fit the image to the page, preserving aspect ratio
      if (canvasAspectRatio > pageAspectRatio) {
          renderWidth = pdfWidth - 20; // 10mm margin on each side
          renderHeight = renderWidth / canvasAspectRatio;
      } else {
          renderHeight = pdfHeight - 20; // 10mm margin on each side
          renderWidth = renderHeight * canvasAspectRatio;
      }

      const xOffset = (pdfWidth - renderWidth) / 2;
      const yOffset = 10; // 10mm margin top

      pdf.addImage(imgData, 'PNG', xOffset, yOffset, renderWidth, renderHeight);

      const safeWorkshop = lesson.workshop.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const safeTurma = lesson.turma.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      pdf.save(`plano_de_aula_${safeWorkshop}_${safeTurma}_${lesson.date}.pdf`);
    });
  };
  
  const handleUpdateAttendance = (studentId: string, status: 'present' | 'absent' | 'late') => {
    const newAttendance = { ...lesson.attendance, [studentId]: status };
    onUpdate({ ...lesson, attendance: newAttendance });
  };


  return (
    <div className="bg-white dark:bg-slate-800/50 shadow-sm rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
      <div ref={printableAreaRef} className="p-4 sm:p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            {isEditing ? (
              <input
                type="text"
                value={editedTopic}
                onChange={(e) => setEditedTopic(e.target.value)}
                className="text-xl font-bold w-full bg-transparent border-b-2 border-blue-500 focus:outline-none text-slate-800 dark:text-slate-100"
              />
            ) : (
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{lesson.topic}</h3>
            )}
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-2">
              <span className="flex items-center gap-1.5"><CalendarDaysIcon className="h-4 w-4" /> {new Date(lesson.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</span>
              <span className="flex items-center gap-1.5"><UsersIcon className="h-4 w-4" /> {lesson.workshop} - {lesson.turma}</span>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-2 no-pdf">
            <button onClick={handleExportPDF} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors" title="Exportar para PDF">
              <DownloadIcon className="h-5 w-5" />
            </button>
            {userRole === 'admin' && (
              <button onClick={() => onDelete(lesson.id)} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 text-red-500 dark:text-red-400 transition-colors">
                <TrashIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-4 border-b border-slate-200 dark:border-slate-700">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('content')}
              className={`${
                activeTab === 'content'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Plano de Aula
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`${
                activeTab === 'attendance'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2`}
            >
             <ClipboardUserIcon className="h-5 w-5" /> Chamada
            </button>
          </nav>
        </div>

        <div className="mt-4">
          {activeTab === 'content' && (
            isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={10}
                className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            ) : (
                <div 
                  ref={contentRef}
                  className="prose prose-sm dark:prose-invert max-w-none" 
                  dangerouslySetInnerHTML={{ __html: md.render(lesson.content) }} 
                />
            )
          )}
          {activeTab === 'attendance' && (
            <AttendanceTracker
              students={students}
              attendance={lesson.attendance}
              onUpdateAttendance={handleUpdateAttendance}
            />
          )}
        </div>
      </div>
      {activeTab === 'content' && (
         <div className="bg-slate-50 dark:bg-slate-800 px-4 py-3 sm:px-6 flex justify-end gap-2 no-pdf">
         {isEditing ? (
           <>
             <button onClick={handleCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700">Cancelar</button>
             <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Salvar</button>
           </>
         ) : (
           <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-600">Editar</button>
         )}
       </div>
      )}
    </div>
  );
};

export default LessonItem;