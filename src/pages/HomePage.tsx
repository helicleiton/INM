import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Palette, Users, Leaf, Heart, Target, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { projects, news, testimonials, partners, impactNumbers } from "@/data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const HomePage = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const areas = [
    { icon: BookOpen, label: "Educação", desc: "Reforço escolar, alfabetização e acesso à leitura." },
    { icon: Palette, label: "Cultura", desc: "Oficinas de arte, música e expressão cultural." },
    { icon: Users, label: "Desenvolvimento Social", desc: "Capacitação profissional e inserção produtiva." },
    { icon: Leaf, label: "Meio Ambiente", desc: "Educação ambiental e sustentabilidade urbana." },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920')] bg-cover bg-center opacity-15" />
        <div className="relative container mx-auto px-4 py-24 md:py-36 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary-foreground max-w-4xl mx-auto leading-tight mb-6"
          >
            Transformando vidas por meio da educação, cultura e ação social
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            O Instituto Novo Milênio atua na promoção do desenvolvimento humano, construindo pontes entre comunidades e oportunidades.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/quem-somos">Conheça o Instituto</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/projetos">Nossos Projetos</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/voluntariado">Seja Voluntário</Link>
            </Button>
            <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <Link to="/doacoes">Doe Agora</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Quem Somos</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              O Instituto Novo Milênio é uma organização da sociedade civil dedicada à transformação social por meio de projetos nas áreas de educação, cultura, desenvolvimento comunitário e sustentabilidade. Atuamos com transparência, compromisso e paixão pela construção de um futuro mais justo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {[
                { icon: Target, title: "Missão", text: "Promover o desenvolvimento humano integral por meio de projetos educacionais, culturais e sociais." },
                { icon: Eye, title: "Visão", text: "Ser referência nacional em transformação social, reconhecida pela excelência e impacto de suas ações." },
                { icon: Star, title: "Valores", text: "Transparência, compromisso social, respeito, inclusão, inovação e colaboração." },
              ].map((item, i) => (
                <motion.div key={item.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <Card className="border-border bg-card h-full">
                    <CardContent className="pt-6 text-center">
                      <item.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                      <h3 className="font-serif text-xl mb-2 text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.text}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="section-warm py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground mb-12">Áreas de Atuação</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.map((area, i) => (
              <motion.div key={area.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="border-border bg-card h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <area.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg mb-2 text-foreground">{area.label}</h3>
                    <p className="text-muted-foreground text-sm">{area.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-primary-foreground mb-12">Nosso Impacto</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactNumbers.map((item, i) => (
              <motion.div key={item.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
                <div className="font-serif text-4xl md:text-5xl text-accent mb-2">{item.value.toLocaleString("pt-BR")}+</div>
                <div className="text-primary-foreground/80 text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">Projetos em Destaque</h2>
            <Button asChild variant="ghost" className="text-primary">
              <Link to="/projetos">Ver todos <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => (
              <motion.div key={project.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="overflow-hidden border-border bg-card h-full group">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <CardContent className="pt-5">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{project.area}</span>
                    <h3 className="font-serif text-xl text-foreground mt-3 mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.summary}</p>
                    <Button asChild variant="link" className="p-0 text-primary">
                      <Link to={`/projetos/${project.slug}`}>Saiba mais <ArrowRight className="ml-1 w-4 h-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section-warm py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">Notícias Recentes</h2>
            <Button asChild variant="ghost" className="text-primary">
              <Link to="/noticias">Ver todas <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, i) => (
              <motion.div key={item.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="overflow-hidden border-border bg-card h-full group">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <CardContent className="pt-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span className="font-medium text-primary">{item.category}</span>
                      <span>•</span>
                      <span>{new Date(item.date).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <h3 className="font-serif text-lg text-foreground mb-2 line-clamp-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{item.summary}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground mb-12">Depoimentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={t.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card className="border-border bg-card h-full">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground italic text-sm leading-relaxed mb-4">"{t.text}"</p>
                    <div>
                      <p className="font-medium text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-warm py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12">Parceiros e Apoiadores</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {partners.map((p) => (
              <div key={p.id} className="bg-card rounded-lg border border-border p-4 flex items-center justify-center h-20">
                <span className="text-sm font-medium text-muted-foreground">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-4">Como Você Pode Ajudar</h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Cada gesto de apoio fortalece nosso trabalho e transforma vidas. Descubra como participar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/doacoes">Fazer uma Doação</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/voluntariado">Seja Voluntário</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/parceiros">Seja Parceiro</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Quick */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">Fale Conosco</h2>
          <p className="text-muted-foreground text-lg mb-8">Estamos prontos para ouvir você.</p>
          <Button asChild size="lg">
            <Link to="/contato">Entre em Contato</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
