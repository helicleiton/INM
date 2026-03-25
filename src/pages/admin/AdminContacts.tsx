import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

const messages = [
  { id: "1", name: "Pedro Costa", email: "pedro@email.com", subject: "Parceria institucional", message: "Gostaria de saber mais sobre possibilidades de parceria.", date: "2025-03-08" },
  { id: "2", name: "Lucia Santos", email: "lucia@email.com", subject: "Dúvida sobre projetos", message: "Como posso inscrever meu filho no projeto Educação para Todos?", date: "2025-03-06" },
  { id: "3", name: "Marco Oliveira", email: "marco@email.com", subject: "Doação", message: "Gostaria de fazer uma doação mensal. Como proceder?", date: "2025-03-05" },
];

const AdminContacts = () => (
  <div>
    <h1 className="font-serif text-2xl text-foreground mb-6">Mensagens de Contato</h1>
    <div className="space-y-4">
      {messages.map((m) => (
        <Card key={m.id} className="border-border bg-card">
          <CardContent className="pt-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-foreground">{m.subject}</h3>
                  <span className="text-xs text-muted-foreground shrink-0">{new Date(m.date).toLocaleDateString("pt-BR")}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{m.name} • {m.email}</p>
                <p className="text-sm text-foreground/80 mt-2">{m.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default AdminContacts;
