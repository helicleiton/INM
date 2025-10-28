import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Student, Lesson, ScheduledClass } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Button from './Button';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';
import { initialSchedule } from '../data/schedule';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PrintIcon from './icons/PrintIcon';
import GraduationCapIcon from './icons/GraduationCapIcon';
import { useUser } from '../context/UserContext';
import PencilIcon from './icons/PencilIcon';
import CheckIcon from './icons/CheckIcon';
import XMarkIcon from './icons/XMarkIcon';

const dayNameToNumber: { [key: string]: number } = {
  'Domingo': 0,
  'Segunda-feira': 1,
  'Terça-feira': 2,
  'Quarta-feira': 3,
  'Quinta-feira': 4,
  'Sexta-feira': 5,
  'Sábado': 6,
};

const generateFullSchedule = (student: Student) => {
    const classDay = dayNameToNumber[student.dayOfWeek];
    if (classDay === undefined) return [];

    const dates: Date[] = [];
    // Start date is Nov 1, 2025, End date is Apr 30, 2026
    const startDate = new Date('2025-11-01T12:00:00Z');
    const endDate = new Date('2026-04-30T12:00:00Z');

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (currentDate.getUTCDay() === classDay) {
            dates.push(new Date(currentDate));
        }
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }
    return dates;
};

const StudentsPage: React.FC = () => {
  const { user } = useUser();
  const [students, setStudents] = useLocalStorage<Student[]>('students', []);
  const [lessons] = useLocalStorage<Lesson[]>('lessons', []);
  const [schedule] = useLocalStorage<ScheduledClass[]>('schedule', initialSchedule);

  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentBirthDate, setNewStudentBirthDate] = useState('');
  const [newStudentContact, setNewStudentContact] = useState('');
  const [selectedClassId, setSelectedClassId] = useState(schedule.length > 0 ? schedule[0].id : '');

  const [pdfData, setPdfData] = useState<{ student: Student; lessons: Partial<Lesson>[] } | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [editingStudentData, setEditingStudentData] = useState<Student | null>(null);

  const visibleStudents = useMemo(() => {
    if (user.role === 'vocal_teacher') {
      return students.filter(s => s.workshop === 'Canto Coral');
    }
    return students;
  }, [students, user.role]);
  
  useEffect(() => {
    if (schedule.length > 0 && !schedule.find(c => c.id === selectedClassId)) {
        setSelectedClassId(schedule[0].id);
    } else if (schedule.length === 0) {
        setSelectedClassId('');
    }
  }, [schedule, selectedClassId]);

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
    if (newStudentName.trim() === '' || newStudentBirthDate === '' || newStudentContact.trim() === '' || !selectedClassId) return;
    
    const selectedClass = schedule.find(c => c.id === selectedClassId);
    if(!selectedClass) return;

    const newStudent: Student = {
      id: new Date().toISOString(),
      name: newStudentName.trim(),
      birthDate: newStudentBirthDate,
      contact: newStudentContact.trim(),
      workshop: selectedClass.workshop,
      turma: selectedClass.turma,
      dayOfWeek: selectedClass.dayOfWeek,
      time: selectedClass.time,
    };
    setStudents([...students, newStudent].sort((a, b) => a.name.localeCompare(b.name)));
    setNewStudentName('');
    setNewStudentBirthDate('');
    setNewStudentContact('');
  };

  const handleDeleteStudent = (studentId: string) => {
    if (user.role !== 'admin') return; // Security check
    if (window.confirm('Tem certeza que deseja excluir este aluno?')) {
      setStudents(students.filter(student => student.id !== studentId));
    }
  };

  const handlePreparePdf = (student: Student) => {
    const allClassDates = generateFullSchedule(student);
        
    const scheduleAsLessons = allClassDates.map(date => ({
        id: date.toISOString(),
        date: date.toISOString().split('T')[0], // YYYY-MM-DD format
        topic: `${student.workshop} - Turma ${student.turma}`,
    }));

    setPdfData({ student, lessons: scheduleAsLessons });
  };
  
  const calculateAge = (birthDateString: string) => {
    if (!birthDateString) return '';
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  };

  const handleStartEdit = (student: Student) => {
    setEditingStudentId(student.id);
    setEditingStudentData({ ...student });
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);
    setEditingStudentData(null);
  };

  const handleSaveEdit = () => {
    if (!editingStudentData) return;
    setStudents(
        students
            .map(s => (s.id === editingStudentId ? editingStudentData : s))
            .sort((a, b) => a.name.localeCompare(b.name))
    );
    handleCancelEdit();
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!editingStudentData) return;
    
    const { name, value } = e.target;

    if (name === 'scheduledClassId') {
        const selectedClass = schedule.find(c => c.id === value);
        if (selectedClass) {
            setEditingStudentData({
                ...editingStudentData,
                workshop: selectedClass.workshop,
                turma: selectedClass.turma,
                dayOfWeek: selectedClass.dayOfWeek,
                time: selectedClass.time,
            });
        }
    } else {
        setEditingStudentData({
            ...editingStudentData,
            [name]: value,
        });
    }
  };


  return (
    <div className="space-y-6">
      {user.role === 'admin' && (
        <div className="bg-white dark:bg-slate-800/50 shadow-sm rounded-lg p-6 border border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Adicionar Novo Aluno</h2>
          <form onSubmit={handleAddStudent} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="student-name" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Nome Completo</label>
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
                  <label htmlFor="student-birthdate" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Data de Nascimento</label>
                  <input
                    type="date"
                    id="student-birthdate"
                    value={newStudentBirthDate}
                    onChange={(e) => setNewStudentBirthDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="student-contact" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Contato (Tel ou E-mail)</label>
                  <input
                    type="text"
                    id="student-contact"
                    value={newStudentContact}
                    onChange={(e) => setNewStudentContact(e.target.value)}
                    placeholder="Ex: (11) 99999-9999"
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
                    required
                  >
                  {schedule.length > 0 ? (
                    schedule.map(c => 
                      <option key={c.id} value={c.id}>
                        {c.workshop} - {c.turma} ({c.dayOfWeek}, {c.time})
                      </option>
                    )
                  ) : (
                    <option disabled>Nenhuma turma cadastrada</option>
                  )}
                  </select>
                </div>
            </div>
            <div className="pt-2">
                <Button type="submit" className="w-full md:w-auto" disabled={schedule.length === 0}>
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Adicionar Aluno
                </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800/50 shadow-sm rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 p-6">Lista de Alunos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Nome</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Idade</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Contato</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Oficina</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Turma</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Dia e Horário</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800/50 divide-y divide-slate-200 dark:divide-slate-700">
              {visibleStudents.length > 0 ? (
                visibleStudents.map((student) => 
                    editingStudentId === student.id && editingStudentData ? (
                        <tr key={student.id} className="bg-blue-50 dark:bg-blue-900/20">
                            <td className="px-6 py-2"><input type="text" name="name" value={editingStudentData.name} onChange={handleEditInputChange} className="w-full bg-white dark:bg-slate-700 p-1 border rounded-md border-slate-400 dark:border-slate-500 text-sm"/></td>
                            <td className="px-6 py-2"><input type="date" name="birthDate" value={editingStudentData.birthDate} onChange={handleEditInputChange} className="w-full bg-white dark:bg-slate-700 p-1 border rounded-md border-slate-400 dark:border-slate-500 text-sm"/></td>
                            <td className="px-6 py-2"><input type="text" name="contact" value={editingStudentData.contact} onChange={handleEditInputChange} className="w-full bg-white dark:bg-slate-700 p-1 border rounded-md border-slate-400 dark:border-slate-500 text-sm"/></td>
                            <td className="px-6 py-2">
                                <select name="scheduledClassId" value={schedule.find(c => c.workshop === editingStudentData.workshop && c.turma === editingStudentData.turma && c.dayOfWeek === editingStudentData.dayOfWeek && c.time === editingStudentData.time)?.id || ''} onChange={handleEditInputChange} className="w-full bg-white dark:bg-slate-700 p-1 border rounded-md border-slate-400 dark:border-slate-500 text-sm">
                                    {schedule.map(c => <option key={c.id} value={c.id}>{c.workshop}</option>)}
                                </select>
                            </td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{editingStudentData.turma}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{editingStudentData.dayOfWeek}, {editingStudentData.time}</td>
                            <td className="px-6 py-2 whitespace-nowrap text-center text-sm font-medium">
                                <div className="flex items-center justify-center gap-2">
                                    <button onClick={handleSaveEdit} className="p-1 text-green-500 hover:text-green-700 dark:hover:text-green-400" title="Salvar"><CheckIcon className="h-5 w-5" /></button>
                                    <button onClick={handleCancelEdit} className="p-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" title="Cancelar"><XMarkIcon className="h-5 w-5" /></button>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <tr key={student.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{student.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{calculateAge(student.birthDate)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{student.contact}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{student.workshop}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{student.turma}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{student.dayOfWeek}, {student.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                <button onClick={() => handlePreparePdf(student)} className="p-1 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400" title="Gerar Cronograma PDF">
                                    <PrintIcon className="h-5 w-5" />
                                </button>
                                {user.role === 'admin' && (
                                    <>
                                     <button onClick={() => handleStartEdit(student)} className="p-1 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 ml-2" title="Editar Aluno">
                                        <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDeleteStudent(student.id)} className="p-1 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 ml-2" title="Excluir Aluno">
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    )
                )
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                    Nenhum aluno encontrado.
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
                <p><strong className="font-semibold text-slate-700">Contato:</strong> {pdfData.student.contact}</p>
                <p><strong className="font-semibold text-slate-700">Oficina:</strong> {pdfData.student.workshop}</p>
                <p><strong className="font-semibold text-slate-700">Turma:</strong> {pdfData.student.turma}</p>
                <p><strong className="font-semibold text-slate-700">Horário Fixo:</strong> {pdfData.student.dayOfWeek}, {pdfData.student.time}</p>
            </section>
            
            <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Datas das Aulas (Novembro 2025 - Abril 2026)</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-100">
                            <th className="border border-slate-300 p-2 font-semibold">Data</th>
                            <th className="border border-slate-300 p-2 font-semibold">Aula</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pdfData.lessons.length > 0 ? (
                            pdfData.lessons.map(lesson => (
                                <tr key={lesson.id} className="even:bg-slate-50">
                                    <td className="border border-slate-300 p-2">{lesson.date ? new Date(lesson.date).toLocaleDateString('pt-BR', {timeZone: 'UTC'}) : ''}</td>
                                    <td className="border border-slate-300 p-2">{lesson.topic}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="border border-slate-300 p-4 text-center text-slate-500">
                                    Nenhuma aula agendada para este aluno.
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