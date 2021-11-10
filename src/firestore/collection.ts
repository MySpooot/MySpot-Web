import { collection } from '@firebase/firestore';

import { db } from '@src/firestore';

export const user = collection(db, 'user');
export const mymap = collection(db, 'mymap');
