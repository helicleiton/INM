import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Timestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { getFirebaseDb } from "./config";

export type MessageSource = "contact" | "volunteer" | "donation";

export type InboxMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source: MessageSource;
  extra?: Record<string, string | undefined>;
  /** Texto já formatado para exibição */
  createdAtLabel: string;
};

const COLLECTION = "inboxMessages";

export async function addInboxMessage(payload: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  source: MessageSource;
  extra?: Record<string, string | undefined>;
}): Promise<void> {
  const db = getFirebaseDb();
  const clean = JSON.parse(JSON.stringify(payload)) as typeof payload;
  await addDoc(collection(db, COLLECTION), {
    ...clean,
    createdAt: serverTimestamp(),
  });
}

function formatCreatedAt(v: unknown): string {
  if (v && typeof v === "object" && "toDate" in v && typeof (v as Timestamp).toDate === "function") {
    return (v as Timestamp).toDate().toLocaleString("pt-BR");
  }
  return "—";
}

export function subscribeInboxMessages(
  onData: (rows: InboxMessage[]) => void,
  onError?: (err: Error) => void,
): Unsubscribe {
  const db = getFirebaseDb();
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => {
      const rows: InboxMessage[] = snap.docs.map((d) => {
        const x = d.data();
        return {
          id: d.id,
          name: x.name,
          email: x.email,
          phone: x.phone,
          subject: x.subject,
          message: x.message,
          source: x.source,
          extra: x.extra,
          createdAtLabel: formatCreatedAt(x.createdAt),
        };
      });
      onData(rows);
    },
    (err) => onError?.(err as Error),
  );
}
