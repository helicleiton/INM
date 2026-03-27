import { doc, getDoc, onSnapshot, setDoc, type Unsubscribe } from "firebase/firestore";
import type { SiteContent } from "@/types/site-content";
import { getFirebaseDb } from "./config";

/** Coleção `site`: documento publicado (site público lê só este). */
export const SITE_CONTENT_DOC = ["site", "publicContent"] as const;
/** Mesma coleção: rascunho antes de publicar (admin edita aqui). */
export const DRAFT_CONTENT_DOC = ["site", "draftContent"] as const;

/** Remove valores `undefined` (Firestore não aceita). */
export function sanitizeSiteContent(data: SiteContent): SiteContent {
  return JSON.parse(JSON.stringify(data)) as SiteContent;
}

export function subscribeSiteContent(
  onData: (data: SiteContent | null) => void,
  onError?: (err: Error) => void,
): Unsubscribe {
  const db = getFirebaseDb();
  const ref = doc(db, SITE_CONTENT_DOC[0], SITE_CONTENT_DOC[1]);
  return onSnapshot(
    ref,
    (snap) => {
      if (!snap.exists()) {
        onData(null);
        return;
      }
      onData(snap.data() as SiteContent);
    },
    (err) => {
      onError?.(err as Error);
    },
  );
}

export async function writeSiteContent(data: SiteContent): Promise<void> {
  const db = getFirebaseDb();
  const ref = doc(db, SITE_CONTENT_DOC[0], SITE_CONTENT_DOC[1]);
  await setDoc(ref, sanitizeSiteContent(data));
}

export function subscribeDraftSiteContent(
  onData: (data: SiteContent | null) => void,
  onError?: (err: Error) => void,
): Unsubscribe {
  const db = getFirebaseDb();
  const ref = doc(db, DRAFT_CONTENT_DOC[0], DRAFT_CONTENT_DOC[1]);
  return onSnapshot(
    ref,
    (snap) => {
      if (!snap.exists()) {
        onData(null);
        return;
      }
      onData(snap.data() as SiteContent);
    },
    (err) => {
      onError?.(err as Error);
    },
  );
}

export async function writeDraftSiteContent(data: SiteContent): Promise<void> {
  const db = getFirebaseDb();
  const ref = doc(db, DRAFT_CONTENT_DOC[0], DRAFT_CONTENT_DOC[1]);
  await setDoc(ref, sanitizeSiteContent(data));
}

/** Copia o documento de rascunho para o documento publicado (site ao vivo). */
export async function publishDraftToPublic(): Promise<void> {
  const db = getFirebaseDb();
  const draftRef = doc(db, DRAFT_CONTENT_DOC[0], DRAFT_CONTENT_DOC[1]);
  const pubRef = doc(db, SITE_CONTENT_DOC[0], SITE_CONTENT_DOC[1]);
  const snap = await getDoc(draftRef);
  if (!snap.exists()) {
    throw new Error("Não há rascunho para publicar.");
  }
  const data = sanitizeSiteContent(snap.data() as SiteContent);
  await setDoc(pubRef, data);
}
