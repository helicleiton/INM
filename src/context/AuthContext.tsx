import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { getFirebaseApp, getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase/config";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  /** Sem variáveis Firebase: login demo com localStorage (apenas desenvolvimento). */
  isDemoMode: boolean;
  signInEmail: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isFirebaseConfigured());

  const demo = !isFirebaseConfigured();

  useEffect(() => {
    if (demo) {
      setLoading(false);
      return;
    }
    const app = getFirebaseApp();
    if (!app) {
      setLoading(false);
      return;
    }
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, [demo]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isDemoMode: demo,
      signInEmail: async (email, password) => {
        if (demo) throw new Error("Firebase não configurado");
        const auth = getFirebaseAuth();
        await signInWithEmailAndPassword(auth, email, password);
      },
      signOutUser: async () => {
        if (demo) return;
        const auth = getFirebaseAuth();
        await signOut(auth);
      },
    }),
    [user, loading, demo],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
