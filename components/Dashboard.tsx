import React from 'react';
import { initialSchedule } from '../data/schedule';
import { ScheduledClass } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useUser } from '../context/UserContext';

const Dashboard: React.FC = () => {
  const [schedule] = useLocalStorage<ScheduledClass[]>('schedule', initialSchedule);
  const { user } = useUser();

  const visibleSchedule = user.role === 'vocal_teacher' 
    ? schedule.filter(c => c.workshop === 'Técnica Vocal')
    : schedule;

  const daysOfWeekOrder = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  const scheduleByDay = daysOfWeekOrder.reduce((acc, day) => {
    acc[day] = visibleSchedule
      .filter(c => c.dayOfWeek === day)
      .sort((a, b) => a.time.localeCompare(b.time));
    return acc;
  }, {} as Record<string, ScheduledClass[]>);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
          Calendário de Aulas da Semana
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          Visão geral de todas as turmas agendadas no instituto.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {daysOfWeekOrder.map(day => {
          if (user.role === 'vocal_teacher' && scheduleByDay[day].length === 0) {
            return null; // Don't render the day if there are no classes for the vocal teacher
          }
          return (
            <div key={day} className="bg-white dark:bg-slate-800/50 shadow-sm rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
              <h2 className="text-lg font-semibold text-center py-3 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200">
                {day}
              </h2>
              <div className="p-4 space-y-3">
                {scheduleByDay[day].length > 0 ? (
                  scheduleByDay[day].map(c => (
                    <div key={c.id} className="p-3 rounded-md bg-slate-100 dark:bg-slate-800 flex items-start gap-3">
                      <div className="font-mono text-sm text-blue-600 dark:text-blue-400 pt-0.5">{c.time}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 dark:text-slate-100">{c.workshop}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Turma {c.turma}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-center text-slate-500 dark:text-slate-400 py-8">
                    Nenhuma aula agendada.
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Dashboard;