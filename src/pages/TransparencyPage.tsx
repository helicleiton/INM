import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { transparencyDocs } from "@/data/mockData";
import { useState } from "react";

const categories = ["Todos", ...Array.from(new Set(transparencyDocs.map((d) => d.category)))];

const TransparencyPage = () => {
  const [filter, setFilter] = useState("Todos");
  const filtered = filter === "Todos" ? transparencyDocs : transparencyDocs.filter((d) => d.category === filter);

  return (
    <div>
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl text-primary-foreground mb-4">Transparência</motion.h1>
          <p className="text-primary-foreground/80 text-lg">Nosso compromisso com a prestação de contas e a transparência institucional.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <Button key={cat} variant={filter === cat ? "default" : "outline"} size="sm" onClick={() => setFilter(cat)}>
                {cat}
              </Button>
            ))}
          </div>
          <div className="space-y-4">
            {filtered.map((doc) => (
              <Card key={doc.id} className="border-border bg-card">
                <CardContent className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-sm">{doc.title}</h3>
                      <p className="text-xs text-muted-foreground">{doc.category} • {new Date(doc.date).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary shrink-0">
                    <Download className="w-4 h-4 mr-1" /> {doc.type}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TransparencyPage;
