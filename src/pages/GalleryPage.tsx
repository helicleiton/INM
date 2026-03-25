import { motion } from "framer-motion";
import { galleryImages } from "@/data/mockData";

const GalleryPage = () => {
  return (
    <div>
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-4xl md:text-5xl text-primary-foreground mb-4">Galeria</motion.h1>
          <p className="text-primary-foreground/80 text-lg">Imagens que contam histórias de transformação.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <motion.div key={img.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="break-inside-avoid">
                <div className="rounded-xl overflow-hidden group relative">
                  <img src={img.url} alt={img.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-end">
                    <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-primary-foreground text-sm font-medium">{img.caption}</p>
                      <p className="text-primary-foreground/70 text-xs">{img.album}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
