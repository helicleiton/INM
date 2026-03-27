import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const navItems = [
  { key: "nav.home", path: "/" },
  { key: "nav.about", path: "/quem-somos" },
  { key: "nav.projects", path: "/projetos" },
  { key: "nav.news", path: "/noticias" },
  { key: "nav.gallery", path: "/galeria" },
  { key: "nav.transparency", path: "/transparencia" },
  { key: "nav.volunteer", path: "/voluntariado" },
  { key: "nav.partners", path: "/parceiros" },
  { key: "nav.donations", path: "/doacoes" },
  { key: "nav.contact", path: "/contato" },
];

const PublicHeader = () => {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-serif text-lg font-bold">IN</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-serif text-lg text-foreground leading-tight">Instituto</span>
            <span className="font-serif text-lg text-primary ml-1 leading-tight">Novo Milênio</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            aria-label="Idioma"
            className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
          >
            <option value="pt-BR">PT</option>
            <option value="en">EN</option>
          </select>
          <Button asChild size="sm" variant="default">
            <Link to="/doacoes">{t("nav.donateNow")}</Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-card border-b border-border"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
              <Button asChild size="sm" className="mt-2">
                <Link to="/doacoes" onClick={() => setMobileOpen(false)}>
                  {t("nav.donateNow")}
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default PublicHeader;
