import React, { useState } from 'react';
import { Student } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Button from './Button';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

const workshops = ["Musicalização", "Violão", "Teclado", "Canto Coral", "Bateria"];
const turmas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const daysOfWeek = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];


const StudentsPage: React.FC = () => {
  const [students, setStudents] = useLocalStorage<Student[]>('students', []);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentWorkshop, setNewStudentWorkshop] = useState(workshops[0]);
  const [newStudentTurma, setNewStudentTurma] = useState(turmas[0]);
  const [newStudentDay, setNewStudentDay] = useState(daysOfWeek[0]);
  const [newStudentTime, setNewStudentTime] = useState('');


  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudentName.trim() === '') return;

    const newStudent: Student = {
      id: new Date().toISOString(),
      name: newStudentName.trim(),
      workshop: newStudentWorkshop,
      turma: newStudentTurma,
      dayOfWeek: newStudentDay,
      time: newStudentTime,
    };
    setStudents([...students, newStudent]);
    setNewStudentName('');
    setNewStudentTime('');
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800/50 shadow-sm rounded-lg p-6 border border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Adicionar Novo Aluno</h2>
        <form onSubmit={handleAddStudent} className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
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
                <label htmlFor="student-workshop" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Oficina</label>
                <select
                  id="student-workshop"
                  value={newStudentWorkshop}
                  onChange={(e) => setNewStudentWorkshop(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {workshops.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="student-turma" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Turma</label>
                <select
                  id="student-turma"
                  value={newStudentTurma}
                  onChange={(e) => setNewStudentTurma(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {turmas.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
             <div>
                <label htmlFor="student-day" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Dia da Semana</label>
                <select
                  id="student-day"
                  value={newStudentDay}
                  onChange={(e) => setNewStudentDay(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="student-time" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Horário</label>
                <input
                  type="time"
                  id="student-time"
                  value={newStudentTime}
                  onChange={(e) => setNewStudentTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
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
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Ações</span>
                </th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDeleteStudent(student.id)} className="p-1 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
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
    </div>
  );
};

export default StudentsPage;