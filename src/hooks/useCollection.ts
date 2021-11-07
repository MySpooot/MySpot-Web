import { useState, useEffect } from 'react';
import { collection, query, where, SnapshotListenOptions, WhereFilterOp, FieldPath } from '@firebase/firestore';
import { useCollection as useFireCollection } from 'react-firebase-hooks/firestore';

import { db } from '@utils/firebase';
import { Collection } from '@share/types/firestore';

type Where = [string | FieldPath, WhereFilterOp, string];

type Option = {
    where?: Where[];
    snapshotListenOptions?: SnapshotListenOptions;
};

// https://github.com/CSFrequency/react-firebase-hooks/tree/v3.0.4/firestore
function useCollection<T>(collectionName: Collection, option?: Option) {
    const [value, loading, error] = useFireCollection(
        option?.where
            ? query(collection(db, collectionName), ...option.where.map(([fieldPath, opStr, value]) => where(fieldPath, opStr, value)))
            : collection(db, collectionName)
    );
    const [newValue, setNewValue] = useState<(T & { id: string })[]>();

    useEffect(() => {
        const data = value?.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (!data) return;

        // eslint-disable-next-line
        // @ts-ignore
        setNewValue(data);
    }, [value]);

    return [newValue, loading, error] as const;
}

export default useCollection;
