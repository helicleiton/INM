import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/mockData";

const ProjectsPage = () => {
  return (
    <div>
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl text-primary-foreground mb-4">
            Nossos Projetos
          </motion.h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Conheça as iniciativas que transformam vidas e comunidades em todo o Brasil.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="overflow-hidden border-border bg-card h-full group">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <CardContent className="pt-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{project.area}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${project.status === "Em andamento" ? "bg-accent/20 text-accent-foreground" : project.status === "Concluído" ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>{project.status}</span>
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{project.summary}</p>
                    <p className="text-xs text-muted-foreground mb-4">{project.city} • {project.beneficiaries}</p>
                    <Button asChild variant="link" className="p-0 text-primary">
                      <Link to={`/projetos/${project.slug}`}>Ver detalhes <ArrowRight className="ml-1 w-4 h-4" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
