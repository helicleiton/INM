import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import PublicLayout from "@/components/layout/PublicLayout";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminGuard from "@/components/auth/AdminGuard";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectDetailPage from "@/pages/ProjectDetailPage";
import NewsPage, { NewsDetailPage } from "@/pages/NewsPage";
import GalleryPage from "@/pages/GalleryPage";
import TransparencyPage from "@/pages/TransparencyPage";
import VolunteerPage from "@/pages/VolunteerPage";
import PartnersPage from "@/pages/PartnersPage";
import DonationsPage from "@/pages/DonationsPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/pages/LoginPage";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminNews from "@/pages/admin/AdminNews";
import AdminGallery from "@/pages/admin/AdminGallery";
import AdminTransparency from "@/pages/admin/AdminTransparency";
import AdminVolunteers from "@/pages/admin/AdminVolunteers";
import AdminPartners from "@/pages/admin/AdminPartners";
import AdminDonations from "@/pages/admin/AdminDonations";
import AdminContacts from "@/pages/admin/AdminContacts";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminSettings from "@/pages/admin/AdminSettings";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
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

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />

          {/* Admin */}
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
