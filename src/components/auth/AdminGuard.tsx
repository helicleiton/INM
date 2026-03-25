import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

import { isAdminAuthed } from "@/lib/auth";

type AdminGuardProps = {
  children: ReactNode;
};

export default function AdminGuard({ children }: AdminGuardProps) {
  if (!isAdminAuthed()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

