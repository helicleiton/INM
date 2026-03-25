import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { SiteContent } from "@/types/site-content";
import initialContent from "@/data/content.json";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { subscribeSiteContent, writeSiteContent } from "@/lib/firebase/content";

const bundled: SiteContent = initialContent as SiteContent;

async function fetchSiteContent(): Promise<SiteContent> {
  const res = await fetch("/data/content.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Falha ao carregar conteúdo do site");
  return res.json() as Promise<SiteContent>;
}

type SiteCtxValue = {
  data: SiteContent;
  isLoading: boolean;
  firebaseActive: boolean;
  saveSiteContent: (next: SiteContent) => Promise<void>;
  seedFromBundled: () => Promise<void>;
};

const SiteCtx = createContext<SiteCtxValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [remote, setRemote] = useState<SiteContent | null>(null);
  const [fsLoading, setFsLoading] = useState(isFirebaseConfigured());

  const firebaseActive = isFirebaseConfigured();

  useEffect(() => {
    if (!firebaseActive) {
      setFsLoading(false);
      return;
    }
    const unsub = subscribeSiteContent(
      (d) => {
        setRemote(d);
        setFsLoading(false);
      },
      () => {
        setFsLoading(false);
      },
    );
    return () => unsub();
  }, [firebaseActive]);

  const jsonQuery = useQuery({
    queryKey: ["site-content-json"],
    queryFn: fetchSiteContent,
    enabled: !firebaseActive,
    initialData: bundled,
    staleTime: 60_000,
  });

  const data = useMemo(() => {
    if (firebaseActive) {
      return remote ?? bundled;
    }
    return jsonQuery.data ?? bundled;
  }, [firebaseActive, remote, jsonQuery.data]);

  const isLoading = firebaseActive ? fsLoading : jsonQuery.isLoading;

  const saveSiteContent = useCallback(
    async (next: SiteContent) => {
      if (!firebaseActive) {
        toast.error("Configure o Firebase (variáveis VITE_FIREBASE_*) para salvar na nuvem.");
        return;
      }
      try {
        await writeSiteContent(next);
        toast.success("Conteúdo publicado no Firebase.");
      } catch (e) {
        console.error(e);
        toast.error("Erro ao salvar. Verifique o login e as regras do Firestore.");
        throw e;
      }
    },
    [firebaseActive],
  );

  const seedFromBundled = useCallback(async () => {
    if (!firebaseActive) {
      toast.error("Firebase não configurado.");
      return;
    }
    await saveSiteContent(bundled);
  }, [firebaseActive, saveSiteContent]);

  const value = useMemo<SiteCtxValue>(
    () => ({
      data,
      isLoading,
      firebaseActive,
      saveSiteContent,
      seedFromBundled,
    }),
    [data, isLoading, firebaseActive, saveSiteContent, seedFromBundled],
  );

  return <SiteCtx.Provider value={value}>{children}</SiteCtx.Provider>;
}

export function useSiteContent(): SiteContent {
  const ctx = useContext(SiteCtx);
  if (!ctx) {
    throw new Error("useSiteContent deve ser usado dentro de SiteContentProvider");
  }
  return ctx.data;
}

export function useSiteContentActions() {
  const ctx = useContext(SiteCtx);
  if (!ctx) {
    throw new Error("useSiteContentActions deve ser usado dentro de SiteContentProvider");
  }
  return {
    saveSiteContent: ctx.saveSiteContent,
    seedFromBundled: ctx.seedFromBundled,
    isLoading: ctx.isLoading,
    firebaseActive: ctx.firebaseActive,
  };
}
