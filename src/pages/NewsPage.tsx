import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { news } from "@/data/mockData";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewsPage = () => {
  return (
    <div>
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl text-primary-foreground mb-4">Notícias</motion.h1>
          <p className="text-primary-foreground/80 text-lg">Acompanhe as últimas novidades do Instituto Novo Milênio.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
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
                    <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{item.summary}</p>
                    <Button asChild variant="link" className="p-0 text-primary">
                      <Link to={`/noticias/${item.slug}`}>Leia mais</Link>
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

export default NewsPage;

export const NewsDetailPage = () => {
  const { slug } = useParams();
  const article = news.find((n) => n.slug === slug);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl text-foreground mb-4">Notícia não encontrada</h1>
        <Button asChild><Link to="/noticias">Voltar</Link></Button>
      </div>
    );
  }

  return (
    <div>
      <section className="relative h-[40vh] min-h-[300px]">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-80" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-10">
            <Button asChild variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground mb-3">
              <Link to="/noticias"><ArrowLeft className="mr-2 w-4 h-4" /> Voltar</Link>
            </Button>
            <h1 className="font-serif text-3xl md:text-4xl text-primary-foreground">{article.title}</h1>
            <div className="text-primary-foreground/70 text-sm mt-2">{article.author} • {new Date(article.date).toLocaleDateString("pt-BR")}</div>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-muted-foreground leading-relaxed text-lg">{article.content}</p>
        </div>
      </section>
    </div>
  );
};
