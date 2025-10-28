import React from 'react';
import BookOpenIcon from './icons/BookOpenIcon';
import UsersIcon from './icons/UsersIcon';
import GraduationCapIcon from './icons/GraduationCapIcon';
import HomeIcon from './icons/HomeIcon';
import CogIcon from './icons/CogIcon';
import { useUser } from '../context/UserContext';

interface HeaderProps {
  activeView: 'dashboard' | 'planner' | 'students' | 'schedule';
  setActiveView: (view: 'dashboard' | 'planner' | 'students' | 'schedule') => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const { user, setUser } = useUser();
  
  const navButtonClasses = "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeClasses = "bg-blue-600 text-white shadow-sm";
  const inactiveClasses = "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800";

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const role = event.target.value as 'admin' | 'vocal_teacher';
    setUser({ role });
    if(role !== 'admin' && activeView === 'schedule'){
      setActiveView('dashboard');
    }
  };

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
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center space-x-2 bg-slate-100/80 dark:bg-slate-900/80 p-1 rounded-lg">
               <button
                onClick={() => setActiveView('dashboard')}
                className={`${navButtonClasses} ${activeView === 'dashboard' ? activeClasses : inactiveClasses}`}
              >
                <HomeIcon className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
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
              {user.role === 'admin' && (
                 <button
                 onClick={() => setActiveView('schedule')}
                 className={`${navButtonClasses} ${activeView === 'schedule' ? activeClasses : inactiveClasses}`}
               >
                 <CogIcon className="h-5 w-5" />
                 <span>Horários</span>
               </button>
              )}
            </nav>
             <div className="hidden md:flex items-center">
              <label htmlFor="role-select" className="sr-only">Selecionar Função</label>
              <select 
                id="role-select"
                value={user.role}
                onChange={handleRoleChange}
                className="ml-4 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-1.5 px-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="admin">Administrador</option>
                <option value="vocal_teacher">Professor de Técnica Vocal</option>
              </select>
            </div>
          </div>
        </div>
      </div>
       {/* Mobile Navigation */}
       <nav className="md:hidden flex items-center justify-around p-2 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`${navButtonClasses} ${activeView === 'dashboard' ? activeClasses : inactiveClasses} flex-1 justify-center`}
        >
          <HomeIcon className="h-5 w-5" />
          <span className="ml-2">Dashboard</span>
        </button>
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
        {user.role === 'admin' && (
          <button
            onClick={() => setActiveView('schedule')}
            className={`${navButtonClasses} ${activeView === 'schedule' ? activeClasses : inactiveClasses} flex-1 justify-center`}
          >
            <CogIcon className="h-5 w-5" />
            <span className="ml-2">Horários</span>
          </button>
        )}
      </nav>
      <div className="md:hidden p-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <label htmlFor="role-select-mobile" className="block text-xs text-center font-medium text-slate-600 dark:text-slate-300 mb-1">Visualizando como:</label>
          <select 
            id="role-select-mobile"
            value={user.role}
            onChange={handleRoleChange}
            className="w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-1.5 px-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="admin">Administrador</option>
            <option value="vocal_teacher">Professor de Técnica Vocal</option>
          </select>
      </div>
    </header>
  );
};

export default Header;