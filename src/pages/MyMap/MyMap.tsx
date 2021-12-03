import React, { FC, useEffect } from 'react';

import Map from '@src/components/Map';

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
