import React, { useState } from 'react';
import Header from './components/Header';
import LessonPlanner from './components/LessonPlanner';
import StudentsPage from './components/StudentsPage';
import Dashboard from './components/Dashboard';
import SchedulePage from './components/SchedulePage';
import { UserProvider } from './context/UserContext';
import LoginPage from './components/LoginPage';
import { UserRole } from './types';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'planner' | 'students' | 'schedule'>('dashboard');
  const [loggedInUserRole, setLoggedInUserRole] = useState<UserRole | null>(null);

  const handleLogout = () => {
    setLoggedInUserRole(null);
    // Reset view to dashboard on logout
    setActiveView('dashboard');
  };

  if (!loggedInUserRole) {
    return <LoginPage onLoginSuccess={(role) => setLoggedInUserRole(role)} />;
  }

  return (
    <UserProvider initialRole={loggedInUserRole}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
        <Header activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'planner' && <LessonPlanner />}
          {activeView === 'students' && <StudentsPage />}
          {activeView === 'schedule' && <SchedulePage />}
        </main>
      </div>
    </UserProvider>
  );
}

export default App;