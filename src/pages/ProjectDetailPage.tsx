import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSiteContent } from "@/context/SiteContentContext";
import { PageMeta } from "@/components/seo/PageMeta";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { projects } = useSiteContent();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl text-foreground mb-4">Projeto não encontrado</h1>
        <Button asChild><Link to="/projetos">Voltar aos projetos</Link></Button>
      </div>
    );
  }

  return (
    <div>
      <PageMeta title={project.title} description={project.summary} />
      <section className="relative h-[50vh] min-h-[400px]">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-80" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <Button asChild variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground mb-4">
              <Link to="/projetos"><ArrowLeft className="mr-2 w-4 h-4" /> Voltar</Link>
            </Button>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl text-primary-foreground mb-3">
              {project.title}
            </motion.h1>
            <div className="flex flex-wrap gap-3">
              <span className="text-sm bg-primary-foreground/20 text-primary-foreground px-3 py-1 rounded-full">{project.area}</span>
              <span className="text-sm bg-accent/80 text-accent-foreground px-3 py-1 rounded-full">{project.status}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">Sobre o Projeto</h2>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
              <div>
                <h2 className="font-serif text-2xl text-foreground mb-4">Objetivos</h2>
                <ul className="space-y-2">
                  {project.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/doacoes">Apoiar este projeto</Link>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { icon: MapPin, label: "Local", value: project.city },
                { icon: Users, label: "Público beneficiado", value: project.beneficiaries },
                { icon: Calendar, label: "Início", value: new Date(project.startDate).toLocaleDateString("pt-BR") },
                { icon: Calendar, label: "Término", value: project.endDate ? new Date(project.endDate).toLocaleDateString("pt-BR") : "Em aberto" },
              ].map((item) => (
                <Card key={item.label} className="border-border bg-card">
                  <CardContent className="pt-4 flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm text-foreground font-medium">{item.value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
