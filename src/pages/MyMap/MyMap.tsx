import React, { FC, useEffect } from 'react';
import Map from '@src/components/Map';
import AddPlace from '@src/components/Map';
import { getMymaps } from '@src/firestore/functions';

const MyMap: FC = () => {
    useEffect(() => {
        console.log('mymap');
    }, []);

    return (
        <>
            <Map></Map>
        </>
    );
};

export default MyMap;
