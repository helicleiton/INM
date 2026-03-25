import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FolderOpen, Newspaper, Image, FileText,
  Heart, Handshake, DollarSign, MessageSquare, Users, Settings, LogOut, Menu
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { clearAdminAuthed } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

const adminNav = [
  { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { label: "Projetos", path: "/admin/projetos", icon: FolderOpen },
  { label: "Notícias", path: "/admin/noticias", icon: Newspaper },
  { label: "Galeria", path: "/admin/galeria", icon: Image },
  { label: "Transparência", path: "/admin/transparencia", icon: FileText },
  { label: "Voluntariado", path: "/admin/voluntariado", icon: Heart },
  { label: "Parceiros", path: "/admin/parceiros", icon: Handshake },
  { label: "Doações", path: "/admin/doacoes", icon: DollarSign },
  { label: "Contatos", path: "/admin/contatos", icon: MessageSquare },
  { label: "Usuários", path: "/admin/usuarios", icon: Users },
  { label: "Configurações", path: "/admin/configuracoes", icon: Settings },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className={`hidden md:flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <Link to="/admin" className="font-serif text-sm text-sidebar-foreground">
              INM Admin
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <Menu size={18} />
          </button>
        </div>
        <nav className="flex-1 py-4 space-y-1 px-2">
          {adminNav.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <button
            type="button"
            onClick={async () => {
              if (isDemoMode) {
                clearAdminAuthed();
              } else {
                await signOutUser();
              }
              navigate("/login");
            }}
            className="flex items-center gap-3 text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors w-full"
          >
            <LogOut size={18} />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center px-6 gap-4">
          <button className="md:hidden text-foreground" onClick={() => setCollapsed(!collapsed)}>
            <Menu size={20} />
          </button>
          <h1 className="font-serif text-lg text-foreground">Painel Administrativo</h1>
          <div className="ml-auto flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/" target="_blank">Ver Site</Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
