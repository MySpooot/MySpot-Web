import React, { FC, useEffect } from 'react';

const MyMap: FC = () => {
    useEffect(() => {
        console.log('mymap');
    }, []);
    return <div>MyMap</div>;
};

export default MyMap;
