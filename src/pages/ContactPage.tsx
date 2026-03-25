import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

const ContactPage = () => {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Mensagem enviada com sucesso!");
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div>
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl text-primary-foreground mb-4">Contato</motion.h1>
          <p className="text-primary-foreground/80 text-lg">Estamos à disposição para ouvir você.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-6">Informações de Contato</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Endereço", value: "Rua da Esperança, 123, Centro\nSão Paulo - SP, 01001-000" },
                  { icon: Phone, label: "Telefone", value: "(11) 99999-0000" },
                  { icon: Mail, label: "E-mail", value: "contato@novomilenio.org.br" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="text-foreground whitespace-pre-line">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl overflow-hidden border border-border h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975!2d-46.6333!3d-23.5505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAxLjgiUyA0NsKwMzgnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Localização"
                />
              </div>
            </div>

            <Card className="border-border bg-card h-fit">
              <CardContent className="pt-6">
                <h2 className="font-serif text-xl text-foreground mb-4">Envie sua mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder="Seu nome" required />
                  <Input type="email" placeholder="Seu e-mail" required />
                  <Input type="tel" placeholder="Telefone (opcional)" />
                  <Input placeholder="Assunto" required />
                  <Textarea placeholder="Sua mensagem" rows={5} required />
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Enviando..." : "Enviar Mensagem"}
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

export default ContactPage;
