import { motion } from "framer-motion";
import { Heart, BookOpen, Palette, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { donationIntentSchema, type DonationIntentValues } from "@/lib/schemas/forms";
import { PageMeta } from "@/components/seo/PageMeta";

const DONATIONS_EMAIL = "doacoes@novomilenio.org.br";

const DonationsPage = () => {
  const form = useForm<DonationIntentValues>({
    resolver: zodResolver(donationIntentSchema),
    defaultValues: {
      name: "",
      email: "",
      amountHint: "",
      message: "",
    },
  });

  const onSubmit = (values: DonationIntentValues) => {
    const body = [
      `Nome: ${values.name}`,
      `E-mail: ${values.email}`,
      values.amountHint ? `Valor / forma pretendida: ${values.amountHint}` : null,
      "",
      values.message || "Gostaria de apoiar o Instituto Novo Milênio.",
    ]
      .filter(Boolean)
      .join("\n");
    const subject = `Intenção de doação — ${values.name}`;
    const mailto = `mailto:${DONATIONS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    toast.success("Abrindo seu e-mail para combinar a doação com a equipe.");
    form.reset();
  };

  return (
    <div>
      <PageMeta
        title="Doações"
        description="Apoie o Instituto Novo Milênio e transforme vidas com sua contribuição."
      />
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl text-primary-foreground mb-4">Faça uma Doação</motion.h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Sua contribuição transforma vidas. Cada real investido gera impacto real nas comunidades que atendemos.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-serif text-3xl text-foreground text-center mb-12">Por que doar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: BookOpen, title: "Educação", desc: "Apoie programas de reforço escolar e alfabetização." },
              { icon: Palette, title: "Cultura", desc: "Financie oficinas de arte e expressão cultural." },
              { icon: Users, title: "Capacitação", desc: "Invista na formação profissional de jovens." },
              { icon: Heart, title: "Ação Social", desc: "Fortaleça ações diretas de assistência social." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card h-full text-center">
                <CardContent className="pt-6">
                  <item.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border bg-card max-w-2xl mx-auto mb-12">
            <CardContent className="pt-8 text-center">
              <h2 className="font-serif text-2xl text-foreground mb-4">Como Doar</h2>
              <p className="text-muted-foreground mb-6">Em breve, disponibilizaremos opções de doação via Pix, transferência bancária e link de pagamento. Enquanto isso, use o formulário abaixo ou entre em contato pelo WhatsApp.</p>
              <div className="space-y-3">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Pix (CNPJ)</p>
                  <p className="font-mono text-foreground font-medium">00.000.000/0001-00</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Banco</p>
                  <p className="text-foreground text-sm">Banco Social • Ag: 0001 • CC: 12345-6</p>
                </div>
              </div>
              <Button size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="https://wa.me/5511999990000" target="_blank" rel="noopener noreferrer">Doar via WhatsApp</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <h2 className="font-serif text-xl text-foreground mb-2 text-center">Registrar intenção de doação</h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Abre seu e-mail para <span className="font-medium text-foreground">{DONATIONS_EMAIL}</span> com os dados; a equipe retorna com as opções oficiais.
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome" autoComplete="name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seu@email.com" autoComplete="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amountHint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Valor ou forma (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex.: R$ 50 / Pix mensal" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem (opcional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Como gostaria de apoiar" rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Abrindo e-mail..." : "Enviar intenção por e-mail"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default DonationsPage;
