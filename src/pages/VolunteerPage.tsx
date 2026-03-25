import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { volunteerFormSchema, type VolunteerFormValues } from "@/lib/schemas/forms";
import { PageMeta } from "@/components/seo/PageMeta";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { addInboxMessage } from "@/lib/firebase/messages";

const VOLUNTEER_EMAIL = "voluntarios@novomilenio.org.br";

const VolunteerPage = () => {
  const form = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      interest: "",
      availability: "",
      motivation: "",
    },
  });

  const onSubmit = async (values: VolunteerFormValues) => {
    if (isFirebaseConfigured()) {
      try {
        await addInboxMessage({
          name: values.name,
          email: values.email,
          phone: values.phone,
          subject: `Inscrição voluntário — ${values.name}`,
          message: values.motivation,
          source: "volunteer",
          extra: {
            city: values.city,
            interest: values.interest,
            availability: values.availability,
          },
        });
        toast.success("Inscrição registrada. Entraremos em contato em breve.");
        form.reset();
        return;
      } catch (e) {
        console.error(e);
        toast.error("Não foi possível enviar agora. Tente o e-mail ou mais tarde.");
        return;
      }
    }
    const body = [
      `Nome: ${values.name}`,
      `E-mail: ${values.email}`,
      `Telefone: ${values.phone}`,
      `Cidade: ${values.city}`,
      `Área de interesse: ${values.interest || "—"}`,
      `Disponibilidade: ${values.availability || "—"}`,
      "",
      "Motivação / experiência:",
      values.motivation,
    ].join("\n");
    const subject = `Inscrição voluntário — ${values.name}`;
    const mailto = `mailto:${VOLUNTEER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    toast.success("Abrindo seu e-mail para concluir a inscrição.");
    form.reset();
  };

  return (
    <div>
      <PageMeta
        title="Voluntariado"
        description="Seja voluntário no Instituto Novo Milênio e transforme vidas."
      />
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl text-primary-foreground mb-4">Voluntariado</motion.h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Faça parte da nossa rede de voluntários e contribua para a transformação social.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-3xl text-foreground mb-6">Por que ser voluntário?</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>O voluntariado no Instituto Novo Milênio é uma oportunidade única de contribuir diretamente para a transformação de vidas. Como voluntário, você pode atuar em diversas frentes:</p>
                <ul className="space-y-2 ml-4">
                  {["Aulas de reforço e tutoria", "Oficinas culturais e artísticas", "Apoio em eventos e campanhas", "Mentoria profissional para jovens", "Suporte administrativo e comunicação"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p>Não exigimos experiência prévia — apenas vontade de ajudar. Oferecemos capacitação, acompanhamento e certificado de horas voluntárias.</p>
              </div>
            </div>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-serif text-xl text-foreground">Formulário de Inscrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  O envio abre seu cliente de e-mail com o texto da inscrição para <span className="font-medium text-foreground">{VOLUNTEER_EMAIL}</span>.
                </p>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome completo" autoComplete="name" {...field} />
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
                            <Input type="email" placeholder="E-mail" autoComplete="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Telefone" autoComplete="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Cidade" autoComplete="address-level2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Área de interesse (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Área de interesse" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disponibilidade (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex.: sábados pela manhã" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experiência e motivação</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Conte um pouco sobre sua experiência e motivação" rows={4} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Abrindo e-mail..." : "Enviar inscrição"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerPage;
