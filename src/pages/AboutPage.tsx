import { motion } from "framer-motion";
import { Target, Eye, Star, Heart, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div>
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl text-primary-foreground mb-4">
            Quem Somos
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Conheça a história, os valores e o propósito do Instituto Novo Milênio.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-serif text-3xl text-foreground mb-6">Nossa História</h2>
          <div className="prose max-w-none text-muted-foreground leading-relaxed space-y-4">
            <p>Fundado em 2018, o Instituto Novo Milênio nasceu da vontade de transformar realidades por meio da educação, cultura e ação social. O que começou como um pequeno grupo de voluntários em São Paulo se transformou em uma organização estruturada, com projetos em diversos municípios brasileiros.</p>
            <p>Ao longo dos anos, construímos parcerias sólidas com o poder público, empresas, universidades e outras organizações, ampliando nosso alcance e fortalecendo nosso impacto. Hoje, somos reconhecidos como uma instituição séria, transparente e comprometida com a transformação social.</p>
            <p>Nosso trabalho é guiado pela crença de que toda pessoa tem direito a oportunidades de desenvolvimento pleno, independentemente de sua origem ou condição social.</p>
          </div>
        </div>
      </section>

      <section className="section-warm py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Target, title: "Missão", text: "Promover o desenvolvimento humano integral por meio de projetos educacionais, culturais e sociais, contribuindo para a construção de uma sociedade mais justa, inclusiva e sustentável." },
              { icon: Eye, title: "Visão", text: "Ser referência nacional em transformação social, reconhecida pela excelência, inovação e pelo impacto duradouro de suas ações nas comunidades atendidas." },
              { icon: Star, title: "Valores", text: "Transparência, compromisso social, respeito à diversidade, inclusão, inovação, colaboração, ética e responsabilidade institucional." },
            ].map((item) => (
              <Card key={item.title} className="border-border bg-card h-full">
                <CardContent className="pt-6 text-center">
                  <item.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-serif text-2xl mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-serif text-3xl text-foreground text-center mb-12">Nossos Compromissos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Impacto Social", text: "Cada ação é planejada para gerar mudanças reais e duradouras na vida das pessoas e comunidades." },
              { icon: Users, title: "Participação", text: "Acreditamos no protagonismo das comunidades e na construção coletiva de soluções." },
              { icon: Globe, title: "Sustentabilidade", text: "Buscamos práticas sustentáveis em todas as dimensões: social, ambiental e institucional." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
