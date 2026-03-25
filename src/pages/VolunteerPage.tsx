import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

const VolunteerPage = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Inscrição enviada com sucesso! Entraremos em contato em breve.");
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div>
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Nome completo" required />
                  <Input type="email" placeholder="E-mail" required />
                  <Input type="tel" placeholder="Telefone" required />
                  <Input placeholder="Cidade" required />
                  <Input placeholder="Área de interesse" />
                  <Input placeholder="Disponibilidade (ex: sábados pela manhã)" />
                  <Textarea placeholder="Conte um pouco sobre sua experiência e motivação" rows={4} />
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Enviando..." : "Enviar Inscrição"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteerPage;
