import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LessonPlanner from './components/LessonPlanner';
import StudentsPage from './components/StudentsPage';
import Dashboard from './components/Dashboard';
import SchedulePage from './components/SchedulePage';
import { UserProvider } from './context/UserContext';
import LoginPage from './components/LoginPage';
import { UserRole } from './types';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import AwaitingProfileSetup from './components/AwaitingProfileSetup';

// Define a type for the profile status
type ProfileStatus = 'loading' | 'authenticated' | 'missing_profile' | 'unauthenticated';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'planner' | 'students' | 'schedule'>('dashboard');
  
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>('loading');
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role as UserRole);
            setProfileStatus('authenticated');
            setLoginError(null);
          } else {
            console.warn("User authenticated but profile document not found in Firestore for UID:", user.uid);
            setProfileStatus('missing_profile');
          }
        } catch (error) {
           console.error("Error fetching user role:", error);
           setLoginError("Erro ao verificar permissões. Verifique as regras de segurança do Firestore.");
           setProfileStatus('unauthenticated');
           await auth.signOut();
        }
      } else {
        setAuthUser(null);
        setUserRole(null);
        setProfileStatus('unauthenticated');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    setLoginError(null);
    setActiveView('dashboard');
  };

  // Render logic based on profileStatus
  if (profileStatus === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
        <div className="text-slate-600 dark:text-slate-400">Carregando...</div>
      </div>
    );
  }

  if (profileStatus === 'unauthenticated') {
    return <LoginPage initialError={loginError} setLoginError={setLoginError} />;
  }
  
  if (profileStatus === 'missing_profile' && authUser) {
    return <AwaitingProfileSetup user={authUser} />;
  }

  if (profileStatus === 'authenticated' && userRole) {
    return (
      <UserProvider initialRole={userRole}>
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
  
  // Fallback case, should not be reached often
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="text-red-500">Ocorreu um erro inesperado no estado da aplicação.</div>
    </div>
  );
}

export default App;
