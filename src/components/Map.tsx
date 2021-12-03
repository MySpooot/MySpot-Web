import React, { useEffect } from 'react';

import { drawMap } from '@src/hooks/showMap';

const Map = () => {
    useEffect(() => {
        drawMap(33.450701, 126.570667);
    }, []);

    return <div id='map' style={{ width: '100%', height: '100vh' }}></div>;
};
export default Map;
