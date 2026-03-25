import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AdminSettings = () => (
  <div>
    <h1 className="font-serif text-2xl text-foreground mb-6">Configurações</h1>
    <Card className="border-border bg-card max-w-2xl">
      <CardHeader>
        <CardTitle className="font-serif text-lg text-foreground">Dados Institucionais</CardTitle>
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
        <Button>Salvar Alterações</Button>
      </CardContent>
    </Card>
  </div>
);

export default AdminSettings;
