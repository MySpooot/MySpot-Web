import React, { FC } from 'react';
import { Outlet, useParams } from 'react-router';
import { useQuery } from 'react-query';

import { getMapDetail } from 'src/api/map';
import { getMarkers } from 'src/api/marker';
import { useMapDetailState, useMapMarkerState, useMapAccessible } from 'src/atoms';
import { MapDetailVO, MapMarkerVO } from 'src/vo';
import Loading from 'src/components/Loading';

const MyMap: FC = () => {
    const { mapId } = useParams<{ mapId: string }>();

    const { mapDetail, setMapDetail } = useMapDetailState();
    const { markers, setMarkers } = useMapMarkerState();
    const { mapAccessible, setMapAccessible } = useMapAccessible();

    useQuery(['getMapDetail', mapId], () => getMapDetail({ mapId: Number(mapId) }), {
        onSuccess: data => {
            setMapAccessible(data.accessible);
            setMapDetail(MapDetailVO.from(data));
        }
    });

    useQuery(['getMarkers', mapId], () => getMarkers({ mapId: Number(mapId) }), {
        enabled: mapAccessible,
        onSuccess: data => {
            setMarkers(data.map(MapMarkerVO.from));
        }
    });

    if (!mapDetail) {
        return <Loading />;
    }

    if (!mapAccessible) {
        return <div>초대코드 입력하세요.</div>;
    }

    if (!markers) {
        return <Loading />;
    }

    return <Outlet />;
};

export default MyMap;
