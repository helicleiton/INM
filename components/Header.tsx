import React from 'react';
import BookOpenIcon from './icons/BookOpenIcon';
import UsersIcon from './icons/UsersIcon';
import GraduationCapIcon from './icons/GraduationCapIcon';

interface HeaderProps {
  activeView: 'planner' | 'students';
  setActiveView: (view: 'planner' | 'students') => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const navButtonClasses = "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-blue-600 text-white shadow-sm";
  const inactiveClasses = "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800";

  return (
    <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 flex items-center gap-3 text-lg font-bold text-slate-800 dark:text-slate-200">
              <GraduationCapIcon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Instituto Novo Milênio</span>
              <span className="sm:hidden">INM Planner</span>
            </div>
          </div>
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-2 bg-slate-100/80 dark:bg-slate-900/80 p-1 rounded-lg">
              <button
                onClick={() => setActiveView('planner')}
                className={`${navButtonClasses} ${activeView === 'planner' ? activeClasses : inactiveClasses}`}
              >
                <BookOpenIcon className="h-5 w-5" />
                <span>Planejador</span>
              </button>
              <button
                onClick={() => setActiveView('students')}
                className={`${navButtonClasses} ${activeView === 'students' ? activeClasses : inactiveClasses}`}
              >
                <UsersIcon className="h-5 w-5" />
                <span>Alunos</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
       {/* Mobile Navigation */}
       <nav className="md:hidden flex items-center justify-around p-2 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveView('planner')}
          className={`${navButtonClasses} ${activeView === 'planner' ? activeClasses : inactiveClasses} flex-1 justify-center`}
        >
          <BookOpenIcon className="h-5 w-5" />
          <span className="ml-2">Planner</span>
        </button>
        <button
          onClick={() => setActiveView('students')}
          className={`${navButtonClasses} ${activeView === 'students' ? activeClasses : inactiveClasses} flex-1 justify-center`}
        >
          <UsersIcon className="h-5 w-5" />
          <span className="ml-2">Alunos</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
