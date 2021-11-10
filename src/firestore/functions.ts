import { getDocs, query, where } from '@firebase/firestore';

import { mymap } from '@src/firestore/collection';
import { MyMap } from '@src/types/firestore';

type GetMyMapParam = {
    userId: string;
};

export const getMymaps = async ({ userId }: GetMyMapParam): Promise<MyMap[]> => {
    const res = query(mymap, where('userId', '==', userId));

    const maps = await getDocs(res);

    const result: MyMap[] = [];
    maps.forEach(doc => {
        result.push({ ...(doc.data() as Omit<MyMap, 'id'>), id: doc.id });
    });

    return Promise.resolve(result);
};
