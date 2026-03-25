import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { subscribeInboxMessages, type InboxMessage } from "@/lib/firebase/messages";

const fallbackMessages = [
  { id: "1", name: "Pedro Costa", email: "pedro@email.com", subject: "Parceria institucional", message: "Gostaria de saber mais sobre possibilidades de parceria.", date: "2025-03-08" },
  { id: "2", name: "Lucia Santos", email: "lucia@email.com", subject: "Dúvida sobre projetos", message: "Como posso inscrever meu filho no projeto Educação para Todos?", date: "2025-03-06" },
  { id: "3", name: "Marco Oliveira", email: "marco@email.com", subject: "Doação", message: "Gostaria de fazer uma doação mensal. Como proceder?", date: "2025-03-05" },
];

const AdminContacts = () => {
  const [rows, setRows] = useState<InboxMessage[]>([]);
  const firebase = isFirebaseConfigured();

  useEffect(() => {
    if (!firebase) return;
    const unsub = subscribeInboxMessages(setRows);
    return () => unsub();
  }, [firebase]);

  if (!firebase) {
    return (
      <div>
        <p className="text-sm text-muted-foreground mb-4">
          Configure o Firebase para ver mensagens reais do site. Enquanto isso, exibimos dados de exemplo.
        </p>
        <h1 className="font-serif text-2xl text-foreground mb-6">Mensagens de Contato</h1>
        <div className="space-y-4">
          {fallbackMessages.map((m) => (
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
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-foreground mb-6">Mensagens de Contato</h1>
      {rows.length === 0 ? (
        <p className="text-muted-foreground text-sm">Nenhuma mensagem ainda.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((m) => (
            <Card key={m.id} className="border-border bg-card">
              <CardContent className="pt-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="font-medium text-foreground">{m.subject || "(sem assunto)"}</h3>
                      <span className="text-xs text-muted-foreground shrink-0">{m.createdAtLabel}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {m.source} · {m.name} • {m.email}
                      {m.phone ? ` • ${m.phone}` : ""}
                    </p>
                    <p className="text-sm text-foreground/80 mt-2 whitespace-pre-wrap">{m.message}</p>
                    {m.extra && Object.keys(m.extra).length > 0 && (
                      <pre className="mt-2 text-xs bg-muted rounded p-2 overflow-x-auto">{JSON.stringify(m.extra, null, 2)}</pre>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
