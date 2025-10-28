import { useState, useEffect, useMemo } from 'react';
import { db } from '../firebase';
import { onSnapshot, Query, DocumentData, QuerySnapshot } from 'firebase/firestore';

interface FirestoreDoc {
    id: string;
    [key: string]: any;
}

export const useCollection = <T extends FirestoreDoc>(q: Query<DocumentData, DocumentData>) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Memoize the query path to prevent re-running the effect unnecessarily
    const queryPath = useMemo(() => {
        // A simple serialization of the query's path and constraints
        // This is not perfect but works for many simple cases.
        // A more robust solution might involve a deep comparison of query objects.
        const path = q.path;
        const constraints = (q as any)._query.constraints.map((c: any) => `${c.type}${c.field}${c.op}${c.value}`).join('');
        return `${path}?${constraints}`;
    }, [q]);

    useEffect(() => {
        setLoading(true);
        // onSnapshot returns an unsubscriber
        const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
            const documents: T[] = [];
            querySnapshot.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() } as T);
            });
            setData(documents);
            setLoading(false);
        }, (err) => {
            console.error(err);
            setError(err);
            setLoading(false);
        });

        // Unsubscribe on unmount
        return () => unsubscribe();
    }, [queryPath]); // Dependency array includes the serialized query path.

    return { data, loading, error };
};
