import React, { useState } from 'react';
import { Lesson } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface CalendarViewProps {
  lessons: Lesson[];
  onLessonClick: (lesson: Lesson) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ lessons, onLessonClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endOfMonth.getDay()));

  const calendarDays: { date: Date; isCurrentMonth: boolean }[] = [];
  let day = new Date(startDate);
  while (day <= endDate) {
    calendarDays.push({
      date: new Date(day),
      isCurrentMonth: day.getMonth() === currentDate.getMonth(),
    });
    day.setDate(day.getDate() + 1);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 shadow-sm rounded-lg border border-slate-200 dark:border-slate-800 p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
          <ChevronLeftIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
        </button>
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          {currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
          <ChevronRightIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-xs font-medium text-slate-500 dark:text-slate-400 py-2">
            {day}
          </div>
        ))}
        {calendarDays.map(({ date, isCurrentMonth }) => {
          const lessonsForDay = lessons.filter(l => {
            const lessonDate = new Date(l.date);
            return lessonDate.getUTCFullYear() === date.getFullYear() &&
                   lessonDate.getUTCMonth() === date.getMonth() &&
                   lessonDate.getUTCDate() === date.getDate();
          });
          return (
            <div
              key={date.toString()}
              className={`border border-slate-200 dark:border-slate-700/50 min-h-[120px] p-1.5 ${isCurrentMonth ? 'bg-white dark:bg-slate-800/50' : 'bg-slate-50 dark:bg-slate-800/20'}`}
            >
              <div className={`text-sm font-medium ${isCurrentMonth ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'} ${isToday(date) ? 'bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center' : ''}`}>
                {date.getDate()}
              </div>
              <div className="mt-1 space-y-1">
                {lessonsForDay.map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => onLessonClick(lesson)}
                    className="w-full text-left text-xs p-1 rounded-md bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-900 text-blue-800 dark:text-blue-200 truncate"
                  >
                    <p className="font-semibold">{lesson.topic}</p>
                    <p>{lesson.turma}</p>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
