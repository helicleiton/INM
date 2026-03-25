import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

const AdminProjects = () => {
  const { projects } = useSiteContent();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-foreground">Projetos</h1>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Novo Projeto</Button>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Título</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Área</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Cidade</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.title} className="w-10 h-10 rounded-md object-cover hidden sm:block" />
                        <div>
                          <p className="font-medium text-foreground">{p.title}</p>
                          <p className="text-xs text-muted-foreground md:hidden">{p.area}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{p.area}</td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{p.status}</span>
                    </td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">{p.city}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProjects;
