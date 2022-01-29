import React, { FC } from 'react';
import { Outlet, useParams } from 'react-router';
import { useQuery } from 'react-query';

import { getMapDetail } from 'src/api/map';

const MyMap: FC = () => {
    const params = useParams<{ mapId: string }>();

    useQuery(['getMapDetail', params.mapId], () => getMapDetail({ mapId: Number(params.mapId) }));

    return <Outlet />;
};

export default MyMap;
