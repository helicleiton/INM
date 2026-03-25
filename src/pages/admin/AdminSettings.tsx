import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSiteContentActions } from "@/context/SiteContentContext";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { useState } from "react";
import { toast } from "sonner";

const AdminSettings = () => {
  const { seedFromBundled, firebaseActive } = useSiteContentActions();
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedFromBundled();
    } catch {
      toast.error("Falha ao publicar dados iniciais.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <h1 className="font-serif text-2xl text-foreground mb-6">Configurações</h1>

      {firebaseActive && (
        <Card className="border-border bg-card max-w-2xl mb-8">
          <CardHeader>
            <CardTitle className="font-serif text-lg text-foreground">Firebase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              O conteúdo público do site é lido do documento Firestore <code className="text-xs bg-muted px-1 rounded">site/publicContent</code>.
              Se o site ainda mostra só o JSON embutido, publique os dados iniciais uma vez (ou edite em Projetos / outras telas).
            </p>
            <Button type="button" onClick={handleSeed} disabled={seeding}>
              {seeding ? "Publicando…" : "Publicar dados iniciais (JSON padrão) no Firebase"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Variáveis: copie <code>.env.example</code> para <code>.env.local</code> e preencha com o projeto Firebase.
              Na Vercel, adicione as mesmas variáveis em Project → Settings → Environment Variables.
            </p>
          </CardContent>
        </Card>
      )}

      {!isFirebaseConfigured() && (
        <p className="text-sm text-amber-800 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8 max-w-2xl">
          Firebase não está configurado neste ambiente. O site usa JSON estático; o login do admin permanece em modo demonstração (localStorage).
        </p>
      )}

      <Card className="border-border bg-card max-w-2xl">
        <CardHeader>
          <CardTitle className="font-serif text-lg text-foreground">Dados Institucionais (local)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Nome da Instituição</label>
            <Input defaultValue="Instituto Novo Milênio" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">E-mail</label>
            <Input defaultValue="contato@novomilenio.org.br" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Telefone</label>
            <Input defaultValue="(11) 99999-0000" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Endereço</label>
            <Input defaultValue="Rua da Esperança, 123, Centro, São Paulo - SP" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-1 block">Descrição institucional</label>
            <Textarea defaultValue="Transformando vidas por meio da educação, cultura e ação social." rows={3} />
          </div>
          <Button type="button" disabled>
            Salvar (em breve: Firestore)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
