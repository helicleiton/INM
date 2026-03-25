import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { isAdminAuthed } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

type AdminGuardProps = {
  children: ReactNode;
};

export default function AdminGuard({ children }: AdminGuardProps) {
  const { user, loading, isDemoMode } = useAuth();

  if (isDemoMode) {
    if (!isAdminAuthed()) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 text-muted-foreground" role="status">
        Verificando sessão…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
