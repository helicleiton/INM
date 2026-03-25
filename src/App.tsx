import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteContentProvider } from "@/context/SiteContentContext";

import PublicLayout from "@/components/layout/PublicLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminGuard from "@/components/auth/AdminGuard";

const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"));
const NewsPage = lazy(() => import("@/pages/NewsPage"));
const NewsDetailPage = lazy(() => import("@/pages/NewsPage").then((m) => ({ default: m.NewsDetailPage })));
const GalleryPage = lazy(() => import("@/pages/GalleryPage"));
const TransparencyPage = lazy(() => import("@/pages/TransparencyPage"));
const VolunteerPage = lazy(() => import("@/pages/VolunteerPage"));
const PartnersPage = lazy(() => import("@/pages/PartnersPage"));
const DonationsPage = lazy(() => import("@/pages/DonationsPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));

const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminProjects = lazy(() => import("@/pages/admin/AdminProjects"));
const AdminNews = lazy(() => import("@/pages/admin/AdminNews"));
const AdminGallery = lazy(() => import("@/pages/admin/AdminGallery"));
const AdminTransparency = lazy(() => import("@/pages/admin/AdminTransparency"));
const AdminVolunteers = lazy(() => import("@/pages/admin/AdminVolunteers"));
const AdminPartners = lazy(() => import("@/pages/admin/AdminPartners"));
const AdminDonations = lazy(() => import("@/pages/admin/AdminDonations"));
const AdminContacts = lazy(() => import("@/pages/admin/AdminContacts"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));

const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="flex min-h-[40vh] items-center justify-center text-muted-foreground" role="status" aria-live="polite">
    Carregando…
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SiteContentProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/quem-somos" element={<AboutPage />} />
                <Route path="/projetos" element={<ProjectsPage />} />
                <Route path="/projetos/:slug" element={<ProjectDetailPage />} />
                <Route path="/noticias" element={<NewsPage />} />
                <Route path="/noticias/:slug" element={<NewsDetailPage />} />
                <Route path="/galeria" element={<GalleryPage />} />
                <Route path="/transparencia" element={<TransparencyPage />} />
                <Route path="/voluntariado" element={<VolunteerPage />} />
                <Route path="/parceiros" element={<PartnersPage />} />
                <Route path="/doacoes" element={<DonationsPage />} />
                <Route path="/contato" element={<ContactPage />} />
              </Route>

              <Route path="/login" element={<LoginPage />} />

              <Route path="/admin" element={<AdminGuard><AdminLayout /></AdminGuard>}>
                <Route index element={<AdminDashboard />} />
                <Route path="projetos" element={<AdminProjects />} />
                <Route path="noticias" element={<AdminNews />} />
                <Route path="galeria" element={<AdminGallery />} />
                <Route path="transparencia" element={<AdminTransparency />} />
                <Route path="voluntariado" element={<AdminVolunteers />} />
                <Route path="parceiros" element={<AdminPartners />} />
                <Route path="doacoes" element={<AdminDonations />} />
                <Route path="contatos" element={<AdminContacts />} />
                <Route path="usuarios" element={<AdminUsers />} />
                <Route path="configuracoes" element={<AdminSettings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </SiteContentProvider>
  </QueryClientProvider>
);

export default App;
