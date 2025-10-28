import React from 'react';
import { Student } from '../types';

interface AttendanceTrackerProps {
  students: Student[];
  attendance: { [studentId: string]: 'present' | 'absent' | 'late' };
  onUpdateAttendance: (studentId: string, status: 'present' | 'absent' | 'late') => void;
}

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({ students, attendance, onUpdateAttendance }) => {
  if (students.length === 0) {
    return (
      <div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
        Nenhum aluno matriculado nesta turma para registrar a frequência.
      </div>
    );
  }

  const getButtonClasses = (currentStatus: string | undefined, buttonStatus: string) => {
    let base = 'px-2 py-1 text-xs font-medium rounded-md transition-colors ';
    if (currentStatus === buttonStatus) {
      switch (buttonStatus) {
        case 'present': return base + 'bg-green-500 text-white';
        case 'absent': return base + 'bg-red-500 text-white';
        case 'late': return base + 'bg-amber-500 text-white';
      }
    }
    return base + 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300';
  };

  return (
    <div className="mt-4 space-y-3">
      {students.map(student => (
        <div key={student.id} className="flex justify-between items-center bg-white dark:bg-slate-800/50 p-2 rounded-md">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{student.name}</p>
          <div className="flex gap-1">
            <button onClick={() => onUpdateAttendance(student.id, 'present')} className={getButtonClasses(attendance[student.id], 'present')}>P</button>
            <button onClick={() => onUpdateAttendance(student.id, 'absent')} className={getButtonClasses(attendance[student.id], 'absent')}>F</button>
            <button onClick={() => onUpdateAttendance(student.id, 'late')} className={getButtonClasses(attendance[student.id], 'late')}>A</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceTracker;
