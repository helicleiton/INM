import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useSiteContent, useSiteContentActions } from "@/context/SiteContentContext";
import type { Project } from "@/types/site-content";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { uploadSiteAsset } from "@/lib/firebase/storage";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { toast } from "sonner";

function slugify(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const emptyProject = (): Project => ({
  id: `p-${Date.now()}`,
  slug: "novo-projeto",
  title: "Novo projeto",
  summary: "",
  description: "",
  objectives: [],
  area: "",
  city: "",
  startDate: new Date().toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10),
  status: "Em andamento",
  beneficiaries: "",
  featured: false,
  image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
});

const AdminProjects = () => {
  const published = useSiteContent();
  const { saveDraftSiteContent, firebaseActive, draft } = useSiteContentActions();
  const content = draft ?? published;
  const projects = content.projects;

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Project>(emptyProject());
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [objText, setObjText] = useState("");

  const objectivesKey = draft.objectives.join("|");
  useEffect(() => {
    if (open) setObjText(draft.objectives.join("\n"));
  }, [open, draft.id, objectivesKey]);

  const openCreate = () => {
    setCreating(true);
    setDraft(emptyProject());
    setOpen(true);
  };

  const openEdit = (p: Project) => {
    setCreating(false);
    setDraft({ ...p });
    setOpen(true);
  };

  const handleSave = async () => {
    if (!firebaseActive) {
      toast.error("Configure o Firebase para salvar alterações na nuvem.");
      return;
    }
    const slug = draft.slug?.trim() || slugify(draft.title);
    const objectives = objText
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const nextProject: Project = {
      ...draft,
      slug,
      objectives,
    };

    setSaving(true);
    try {
      let nextProjects: Project[];
      if (creating) {
        nextProjects = [...content.projects, nextProject];
      } else {
        nextProjects = content.projects.map((p) => (p.id === draft.id ? nextProject : p));
      }
      await saveDraftSiteContent({ ...content, projects: nextProjects });
      setOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!firebaseActive) {
      toast.error("Configure o Firebase para excluir.");
      return;
    }
    if (!window.confirm("Excluir este projeto?")) return;
    await saveDraftSiteContent({
      ...content,
      projects: content.projects.filter((p) => p.id !== id),
    });
  };

  const uploadImage = async (file: File) => {
    if (!isFirebaseConfigured()) {
      toast.error("Firebase necessário para upload de imagens.");
      return;
    }
    try {
      const url = await uploadSiteAsset(file, "projects");
      setDraft((d) => ({ ...d, image: url }));
      toast.success("Imagem enviada.");
    } catch (e) {
      console.error(e);
      toast.error("Falha no upload.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-foreground">Projetos</h1>
        <Button size="sm" type="button" onClick={openCreate} disabled={!firebaseActive}>
          <Plus className="w-4 h-4 mr-1" /> Novo Projeto
        </Button>
      </div>

      {!firebaseActive && (
        <p className="text-sm text-muted-foreground mb-4">
          Com Firebase ativo, você pode criar, editar e excluir projetos. Sem variáveis de ambiente, os dados vêm só do JSON estático.
        </p>
      )}

      <Card className="border-border bg-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-muted-foreground">Título</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Área</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Cidade</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt="" className="w-10 h-10 rounded-md object-cover hidden sm:block" />
                        <div>
                          <p className="font-medium text-foreground">{p.title}</p>
                          <p className="text-xs text-muted-foreground md:hidden">{p.area}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{p.area}</td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{p.status}</span>
                    </td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">{p.city}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/projetos/${p.slug}`} target="_blank" rel="noreferrer">
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" type="button" onClick={() => openEdit(p)} disabled={!firebaseActive}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          type="button"
                          className="text-destructive"
                          onClick={() => handleDelete(p.id)}
                          disabled={!firebaseActive}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-lg">
          <DialogHeader>
            <DialogTitle>{creating ? "Novo projeto" : "Editar projeto"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <Label htmlFor="ptitle">Título</Label>
              <Input id="ptitle" value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="pslug">Slug (URL)</Label>
              <Input id="pslug" value={draft.slug} onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="psum">Resumo</Label>
              <Textarea id="psum" rows={2} value={draft.summary} onChange={(e) => setDraft((d) => ({ ...d, summary: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="pdesc">Descrição</Label>
              <Textarea id="pdesc" rows={3} value={draft.description} onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="obj-lines">Objetivos (um por linha)</Label>
              <Textarea id="obj-lines" rows={3} value={objText} onChange={(e) => setObjText(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Área</Label>
                <Input value={draft.area} onChange={(e) => setDraft((d) => ({ ...d, area: e.target.value }))} />
              </div>
              <div>
                <Label>Cidade</Label>
                <Input value={draft.city} onChange={(e) => setDraft((d) => ({ ...d, city: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Início</Label>
                <Input type="date" value={draft.startDate} onChange={(e) => setDraft((d) => ({ ...d, startDate: e.target.value }))} />
              </div>
              <div>
                <Label>Fim</Label>
                <Input type="date" value={draft.endDate} onChange={(e) => setDraft((d) => ({ ...d, endDate: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Input value={draft.status} onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value }))} />
            </div>
            <div>
              <Label>Beneficiários</Label>
              <Input value={draft.beneficiaries} onChange={(e) => setDraft((d) => ({ ...d, beneficiaries: e.target.value }))} />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="pfeat"
                checked={draft.featured}
                onChange={(e) => setDraft((d) => ({ ...d, featured: e.target.checked }))}
              />
              <Label htmlFor="pfeat">Destaque na home</Label>
            </div>
            <div>
              <Label htmlFor="pimg">URL da imagem</Label>
              <Input id="pimg" value={draft.image} onChange={(e) => setDraft((d) => ({ ...d, image: e.target.value }))} />
            </div>
            {isFirebaseConfigured() && (
              <div>
                <Label>Upload (substitui URL)</Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="cursor-pointer"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void uploadImage(f);
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleSave} disabled={saving || !firebaseActive}>
              {saving ? "Salvando…" : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
