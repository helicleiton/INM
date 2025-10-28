import React, { useState, useRef, useEffect } from 'react';
import { Student, Lesson } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Button from './Button';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import { schedule } from '../data/schedule';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PrintIcon from './icons/PrintIcon';
import GraduationCapIcon from './icons/GraduationCapIcon';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useLocalStorage<Student[]>('students', []);
  const [lessons] = useLocalStorage<Lesson[]>('lessons', []);
  const [newStudentName, setNewStudentName] = useState('');
  const [selectedClassId, setSelectedClassId] = useState(schedule[0].id);

  const [pdfData, setPdfData] = useState<{ student: Student; lessons: Lesson[] } | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pdfData && pdfRef.current) {
      const element = pdfRef.current;
      html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        const safeStudentName = pdfData.student.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        pdf.save(`cronograma_${safeStudentName}.pdf`);
        setPdfData(null); // Reset after generation
      });
    }
  }, [pdfData]);


  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentName.trim() === '') return;
    
    const selectedClass = schedule.find(c => c.id === selectedClassId);
    if(!selectedClass) return;

    const newStudent: Student = {
      id: new Date().toISOString(),
      name: newStudentName.trim(),
      workshop: selectedClass.workshop,
      turma: selectedClass.turma,
      dayOfWeek: selectedClass.dayOfWeek,
      time: selectedClass.time,
    };
    setStudents([...students, newStudent].sort((a, b) => a.name.localeCompare(b.name)));
    setNewStudentName('');
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  const handlePreparePdf = (student: Student) => {
    const studentLessons = lessons
      .filter(lesson => lesson.workshop === student.workshop && lesson.turma === student.turma)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setPdfData({ student, lessons: studentLessons });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800/50 shadow-sm rounded-lg p-6 border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Adicionar Novo Aluno</h2>
        <form onSubmit={handleAddStudent} className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label htmlFor="student-name" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Nome do Aluno</label>
                <input
                  type="text"
                  id="student-name"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Ex: João da Silva"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="student-class" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Turma Agendada</label>
                <select
                  id="student-class"
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {schedule.map(c => 
                    <option key={c.id} value={c.id}>
                      {c.workshop} - {c.turma} ({c.dayOfWeek}, {c.time})
                    </option>
                  )}
                </select>
              </div>
              <Button type="submit" className="w-full">
                <PlusIcon className="h-5 w-5 mr-2" />
                Adicionar Aluno
              </Button>
           </div>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-800/50 shadow-sm rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 p-6">Lista de Alunos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Nome</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Oficina</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Turma</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Dia da Semana</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Horário</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800/50 divide-y divide-slate-200 dark:divide-slate-700">
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{student.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{student.workshop}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{student.turma}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{student.dayOfWeek}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{student.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button onClick={() => handlePreparePdf(student)} className="p-1 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400" title="Gerar Cronograma PDF">
                        <PrintIcon className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDeleteStudent(student.id)} className="p-1 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 ml-2" title="Excluir Aluno">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                    Nenhum aluno cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pdfData && (
        <div ref={pdfRef} className="absolute -left-[9999px] top-0 w-[210mm] min-h-[297mm] p-8 bg-white text-black font-sans text-sm">
           <header className="flex items-center justify-between pb-6 border-b border-slate-300">
                <div className="flex items-center gap-4">
                    <GraduationCapIcon className="h-12 w-12 text-blue-700" />
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Instituto Novo Milênio</h1>
                        <p className="text-slate-600 text-lg">Cronograma de Aulas</p>
                    </div>
                </div>
            </header>

            <section className="my-8 space-y-2 text-base">
                <p><strong className="font-semibold text-slate-700">Aluno(a):</strong> {pdfData.student.name}</p>
                <p><strong className="font-semibold text-slate-700">Oficina:</strong> {pdfData.student.workshop}</p>
                <p><strong className="font-semibold text-slate-700">Turma:</strong> {pdfData.student.turma}</p>
                <p><strong className="font-semibold text-slate-700">Horário Fixo:</strong> {pdfData.student.dayOfWeek}, {pdfData.student.time}</p>
            </section>
            
            <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Aulas Planejadas</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="border border-slate-300 p-2 font-semibold">Data</th>
                            <th className="border border-slate-300 p-2 font-semibold">Tópico da Aula</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pdfData.lessons.length > 0 ? (
                            pdfData.lessons.map(lesson => (
                                <tr key={lesson.id} className="even:bg-slate-50">
                                    <td className="border border-slate-300 p-2">{new Date(lesson.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</td>
                                    <td className="border border-slate-300 p-2">{lesson.topic}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="border border-slate-300 p-4 text-center text-slate-500">
                                    Nenhuma aula planejada para esta turma ainda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;