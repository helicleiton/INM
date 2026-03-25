import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SiteContent } from "@/types/site-content";
import initialContent from "@/data/content.json";

const SiteContentContext = createContext<SiteContent | null>(null);

const bundled: SiteContent = initialContent as SiteContent;

async function fetchSiteContent(): Promise<SiteContent> {
  const res = await fetch("/data/content.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Falha ao carregar conteúdo do site");
  return res.json() as Promise<SiteContent>;
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: fetchSiteContent,
    initialData: bundled,
    staleTime: 60_000,
  });

  const value = data ?? bundled;

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent(): SiteContent {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error("useSiteContent deve ser usado dentro de SiteContentProvider");
  }
  return ctx;
}
