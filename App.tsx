import React, { useState } from 'react';
import Header from './components/Header';
import LessonPlanner from './components/LessonPlanner';
import StudentsPage from './components/StudentsPage';

function App() {
  const [activeView, setActiveView] = useState<'planner' | 'students'>('planner');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'planner' && <LessonPlanner />}
        {activeView === 'students' && <StudentsPage />}
      </main>
    </div>
  );
}

export default App;
