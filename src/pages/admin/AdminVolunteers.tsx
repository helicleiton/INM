import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const volunteers = [
  { id: "1", name: "Carlos Mendes", email: "carlos@email.com", phone: "(11) 91234-5678", city: "São Paulo", area: "Educação", date: "2025-02-20" },
  { id: "2", name: "Fernanda Lima", email: "fernanda@email.com", phone: "(21) 98765-4321", city: "Rio de Janeiro", area: "Cultura", date: "2025-02-18" },
  { id: "3", name: "Roberto Alves", email: "roberto@email.com", phone: "(31) 99876-5432", city: "Belo Horizonte", area: "Capacitação", date: "2025-02-15" },
];

const AdminVolunteers = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h1 className="font-serif text-2xl text-foreground">Voluntários Inscritos</h1>
      <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-1" /> Exportar</Button>
    </div>
    <Card className="border-border bg-card">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border">
              <th className="text-left p-4 font-medium text-muted-foreground">Nome</th>
              <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">E-mail</th>
              <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Cidade</th>
              <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Área</th>
              <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Data</th>
            </tr></thead>
            <tbody>
              {volunteers.map((v) => (
                <tr key={v.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="p-4 font-medium text-foreground">{v.name}</td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{v.email}</td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{v.city}</td>
                  <td className="p-4 text-muted-foreground hidden lg:table-cell">{v.area}</td>
                  <td className="p-4 text-muted-foreground hidden lg:table-cell">{new Date(v.date).toLocaleDateString("pt-BR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default AdminVolunteers;
