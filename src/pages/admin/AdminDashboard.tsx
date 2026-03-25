import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Newspaper, FileText, Heart, Handshake, MessageSquare, DollarSign, Users } from "lucide-react";

const stats = [
  { label: "Projetos", value: 4, icon: FolderOpen, color: "text-primary" },
  { label: "Notícias", value: 3, icon: Newspaper, color: "text-primary" },
  { label: "Documentos", value: 5, icon: FileText, color: "text-primary" },
  { label: "Voluntários", value: 12, icon: Heart, color: "text-accent" },
  { label: "Parceiros", value: 6, icon: Handshake, color: "text-primary" },
  { label: "Mensagens", value: 8, icon: MessageSquare, color: "text-accent" },
  { label: "Doações", value: 0, icon: DollarSign, color: "text-muted-foreground" },
  { label: "Usuários", value: 2, icon: Users, color: "text-primary" },
];

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="font-serif text-2xl text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif text-foreground">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="font-serif text-lg text-foreground">Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Novo voluntário inscrito: Carlos M.",
                "Notícia publicada: Balanço 2024",
                "Mensagem de contato recebida",
                "Projeto atualizado: Educação para Todos",
                "Documento enviado: Relatório Anual 2024",
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <span className="text-muted-foreground">{activity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="font-serif text-lg text-foreground">Acesso Rápido</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Use o menu lateral para navegar entre as seções do painel. Cada módulo permite criar, editar e gerenciar os conteúdos do site público.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
