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

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'planner' | 'students' | 'schedule'>('dashboard');
  
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        setAuthUser(user);
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role as UserRole);
          } else {
            console.error("User document not found in Firestore for UID:", user.uid);
            // Log out user if they have no role document
            await auth.signOut();
            setUserRole(null);
            setAuthUser(null);
          }
        } catch (error) {
           console.error("Error fetching user role:", error);
           await auth.signOut();
           setUserRole(null);
           setAuthUser(null);
        }
      } else {
        setAuthUser(null);
        setUserRole(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);


  const handleLogout = () => {
    auth.signOut();
    setActiveView('dashboard');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
        <div className="text-slate-600 dark:text-slate-400">Carregando...</div>
      </div>
    );
  }

  if (!authUser || !userRole) {
    return <LoginPage />;
  }

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

export default App;