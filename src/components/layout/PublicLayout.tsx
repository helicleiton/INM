import { Outlet } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import PublicFooter from "./PublicFooter";

const PublicLayout = () => (
  <div className="relative flex flex-col min-h-screen">
    <a
      href="#conteudo-principal"
      className="absolute left-[-9999px] z-[100] rounded-md bg-primary px-3 py-2 text-primary-foreground outline-none ring-2 ring-ring focus:left-4 focus:top-4"
    >
      Ir para o conteúdo
    </a>
    <PublicHeader />
    <main id="conteudo-principal" className="flex-1" tabIndex={-1}>
      <Outlet />
    </main>
    <PublicFooter />
  </div>
);

export default PublicLayout;
