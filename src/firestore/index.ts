import { getFirestore } from '@firebase/firestore';

import { app } from '@src/firebase';

export const db = getFirestore(app);
