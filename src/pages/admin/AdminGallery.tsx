import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { galleryImages } from "@/data/mockData";

const AdminGallery = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h1 className="font-serif text-2xl text-foreground">Galeria</h1>
      <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Adicionar Mídia</Button>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {galleryImages.map((img) => (
        <Card key={img.id} className="overflow-hidden border-border bg-card group">
          <div className="aspect-square overflow-hidden">
            <img src={img.url} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </div>
          <CardContent className="p-3">
            <p className="text-sm text-foreground truncate">{img.caption}</p>
            <p className="text-xs text-muted-foreground">{img.album}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default AdminGallery;
