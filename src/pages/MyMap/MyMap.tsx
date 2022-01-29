import React, { FC } from 'react';
import { Outlet, useParams } from 'react-router';
import { useQuery } from 'react-query';

import { Path } from 'src/Constants';
import { getMapDetail } from 'src/api/map';
import Loading from 'src/components/Loading';

const MyMap: FC = () => {
    const params = useParams<{ mapId: string }>();

    const { data: mapDetail } = useQuery(['getMapDetail', params.mapId], () => getMapDetail({ mapId: Number(params.mapId) }));

    return <Outlet />;
};

export default MyMap;
