import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminUsers = () => (
  <div>
    <h1 className="font-serif text-2xl text-foreground mb-6">Usuários</h1>
    <Card className="border-border bg-card max-w-2xl">
      <CardHeader>
        <CardTitle className="font-serif text-lg text-foreground">Gestão de Usuários</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4">Gerencie os acessos ao painel administrativo.</p>
        <div className="space-y-3">
          {[
            { name: "Administrador", email: "admin@novomilenio.org.br", role: "Administrador" },
            { name: "Editor", email: "editor@novomilenio.org.br", role: "Editor" },
          ].map((u) => (
            <div key={u.email} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium text-foreground">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{u.role}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AdminUsers;
