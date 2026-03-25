import { doc, onSnapshot, setDoc, type Unsubscribe } from "firebase/firestore";
import type { SiteContent } from "@/types/site-content";
import { getFirebaseDb } from "./config";

export const SITE_CONTENT_DOC = ["site", "publicContent"] as const;

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
