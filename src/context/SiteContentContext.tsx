import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { SiteContent } from "@/types/site-content";
import initialContent from "@/data/content.json";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import {
  publishDraftToPublic,
  subscribeDraftSiteContent,
  subscribeSiteContent,
  writeDraftSiteContent,
} from "@/lib/firebase/content";

const bundled: SiteContent = initialContent as SiteContent;

async function fetchSiteContent(): Promise<SiteContent> {
  const res = await fetch("/data/content.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Falha ao carregar conteúdo do site");
  return res.json() as Promise<SiteContent>;
}

type SiteCtxValue = {
  /** Conteúdo publicado (o site público consome isto). */
  data: SiteContent;
  /** Conteúdo em rascunho (editável no admin). Pode não existir ainda. */
  draft: SiteContent | null;
  isLoading: boolean;
  firebaseActive: boolean;
  saveDraftSiteContent: (next: SiteContent) => Promise<void>;
  publishDraft: () => Promise<void>;
  seedDraftFromBundled: () => Promise<void>;
};

const SiteCtx = createContext<SiteCtxValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [remote, setRemote] = useState<SiteContent | null>(null);
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [fsLoading, setFsLoading] = useState(isFirebaseConfigured());

  const firebaseActive = isFirebaseConfigured();

  useEffect(() => {
    if (!firebaseActive) {
      setFsLoading(false);
      return;
    }

    let pending = 2;
    const done = () => {
      pending -= 1;
      if (pending <= 0) setFsLoading(false);
    };

    const unsubPublic = subscribeSiteContent(
      (d) => {
        setRemote(d);
        done();
      },
      () => done(),
    );

    const unsubDraft = subscribeDraftSiteContent(
      (d) => {
        setDraft(d);
        done();
      },
      () => done(),
    );

    return () => {
      unsubPublic();
      unsubDraft();
    };
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

  const saveDraftSiteContent = useCallback(
    async (next: SiteContent) => {
      if (!firebaseActive) {
        toast.error("Configure o Firebase (variáveis VITE_FIREBASE_*) para salvar na nuvem.");
        return;
      }
      try {
        await writeDraftSiteContent(next);
        toast.success("Rascunho salvo.");
      } catch (e) {
        console.error(e);
        toast.error("Erro ao salvar rascunho. Verifique o login e as regras do Firestore.");
        throw e;
      }
    },
    [firebaseActive],
  );

  const publishDraft = useCallback(async () => {
    if (!firebaseActive) {
      toast.error("Firebase não configurado.");
      return;
    }
    try {
      await publishDraftToPublic();
      toast.success("Rascunho publicado. O site público será atualizado.");
    } catch (e) {
      console.error(e);
      toast.error("Falha ao publicar. Verifique se existe rascunho e se você está logado.");
      throw e;
    }
  }, [firebaseActive]);

  const seedDraftFromBundled = useCallback(async () => {
    if (!firebaseActive) {
      toast.error("Firebase não configurado.");
      return;
    }
    await saveDraftSiteContent(bundled);
  }, [firebaseActive, saveDraftSiteContent]);

  const value = useMemo<SiteCtxValue>(
    () => ({
      data,
      draft,
      isLoading,
      firebaseActive,
      saveDraftSiteContent,
      publishDraft,
      seedDraftFromBundled,
    }),
    [data, draft, isLoading, firebaseActive, saveDraftSiteContent, publishDraft, seedDraftFromBundled],
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
    draft: ctx.draft,
    saveDraftSiteContent: ctx.saveDraftSiteContent,
    publishDraft: ctx.publishDraft,
    seedDraftFromBundled: ctx.seedDraftFromBundled,
    isLoading: ctx.isLoading,
    firebaseActive: ctx.firebaseActive,
  };
}
