import React, { FC, useEffect } from 'react';
import { Outlet, useParams } from 'react-router';

import { getMapDetail } from 'src/api/map';
import { useMapDetailState } from 'src/atoms/mapDetail';

const MyMap: FC = () => {
    const params = useParams<{ mapId: string }>();
    const { setMapDetail, reset } = useMapDetailState();

    useEffect(() => {
        getMapDetail({ mapId: Number(params.mapId) }).then(setMapDetail);

        return () => reset();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <Outlet />;
};

export default MyMap;
