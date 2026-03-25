import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { transparencyDocs } from "@/data/mockData";

const AdminTransparency = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h1 className="font-serif text-2xl text-foreground">Transparência</h1>
      <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Novo Documento</Button>
    </div>
    <Card className="border-border bg-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left p-4 font-medium text-muted-foreground">Título</th>
              <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Categoria</th>
              <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Data</th>
              <th className="text-right p-4 font-medium text-muted-foreground">Ações</th>
            </tr></thead>
            <tbody>
              {transparencyDocs.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="p-4 font-medium text-foreground">{d.title}</td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{d.category}</td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{new Date(d.date).toLocaleDateString("pt-BR")}</td>
                  <td className="p-4"><div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AdminTransparency;
