import React, { FC } from 'react';

import useCollection from '@hooks/useCollection';
import { MyMap as IMyMap } from '@share/types/firestore';

const MyMap: FC = () => {
    const [mymap] = useCollection<IMyMap>('mymap');

    const [mymap2] = useCollection<IMyMap>('mymap', {
        where: [['name', '==', '서울 나들']]
    });

    const [mymap3] = useCollection<IMyMap>('mymap', {
        where: [
            ['name', '==', '서울 나들이'],
            ['userId', '==', 'paYNEAKMQzA4QatY7bwp']
        ]
    });

    console.log({ mymap });
    console.log({ mymap2 });
    console.log({ mymap3 });

    return <div>MyMap</div>;
};

export default MyMap;
