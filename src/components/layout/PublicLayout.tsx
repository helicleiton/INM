import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";
import { useTranslation } from "react-i18next";
import CookieConsent from "@/components/privacy/CookieConsent";

const PublicLayout = () => (
  <div className="relative flex flex-col min-h-screen">
    <SkipToContent />
    <PublicHeader />
    <main id="conteudo-principal" className="flex-1" tabIndex={-1}>
      <Outlet />
    </main>
    <PublicFooter />
    <CookieConsent />
  </div>
);

function SkipToContent() {
  const { t } = useTranslation();
  return (
    <a
      href="#conteudo-principal"
      className="absolute left-[-9999px] z-[100] rounded-md bg-primary px-3 py-2 text-primary-foreground outline-none ring-2 ring-ring focus:left-4 focus:top-4"
    >
      {t("a11y.skipToContent")}
    </a>
  );
}

export default PublicLayout;
