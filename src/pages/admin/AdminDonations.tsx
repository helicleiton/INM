import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDonations = () => (
  <div>
    <h1 className="font-serif text-2xl text-foreground mb-6">Doações</h1>
    <Card className="border-border bg-card max-w-2xl">
      <CardHeader>
        <CardTitle className="font-serif text-lg text-foreground">Módulo em Preparação</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm leading-relaxed">
          O módulo de doações está sendo preparado para integração futura com Pix, link de pagamento e campanhas de arrecadação. Em breve, você poderá cadastrar campanhas, acompanhar doações recebidas e gerar relatórios.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default AdminDonations;
