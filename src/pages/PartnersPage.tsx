import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSiteContent } from "@/context/SiteContentContext";
import { PageMeta } from "@/components/seo/PageMeta";

const PartnersPage = () => {
  const { partners } = useSiteContent();
  return (
    <div>
      <PageMeta title="Parceiros" description="Quem apoia o Instituto Novo Milênio." />
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl text-primary-foreground mb-4">Parceiros</motion.h1>
          <p className="text-primary-foreground/80 text-lg">Organizações que acreditam e investem na nossa missão.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {partners.map((p) => (
              <Card key={p.id} className="border-border bg-card h-full">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="font-serif text-xl text-primary">{p.name[0]}</span>
                  </div>
                  <h3 className="font-medium text-foreground mb-1">{p.name}</h3>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">{p.category}</span>
                  <p className="text-muted-foreground text-sm mt-3">{p.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-16">
            <h2 className="font-serif text-2xl text-foreground mb-4">Seja um Parceiro</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">Sua organização pode fazer parte dessa rede de transformação social. Entre em contato e descubra como podemos atuar juntos.</p>
            <Button asChild size="lg"><Link to="/contato">Fale Conosco</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;
