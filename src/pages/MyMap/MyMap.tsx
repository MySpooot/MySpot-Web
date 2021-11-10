import React, { FC, useEffect } from 'react';

import { getMymaps } from '@src/firestore/functions';

const MyMap: FC = () => {
    useEffect(() => {
        getMymaps({ userId: 'paYNEAKMQzA4QatY7bwp' }).then(res => {
            console.log('res:', res);
        });
    }, []);
    return <div>MyMap</div>;
};

export default MyMap;
