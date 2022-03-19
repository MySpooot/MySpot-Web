import React, { FC, useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { checkPrivateCode, getMapDetail } from 'src/api/map';
import { getMarkers } from 'src/api/marker';
import { useMapDetailState, useMapMarkerState, useMapAccessible, useMapPlaceOverlayState } from 'src/atoms';
import { MapDetailVO, MapMarkerVO } from 'src/vo';
import Loading from 'src/components/Loading';
import PrivateCodeModal from 'src/components/PrivateCodeModal/PrivateCodeModal';
import useQueryString from 'src/hooks/useQueryString';
import { Path } from 'src/Constants';

const MyMap: FC = () => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();
    const { code } = useQueryString<{ code: string }>();

    const { mapDetail, setMapDetail } = useMapDetailState();
    const { markers, setMarkers } = useMapMarkerState();
    const { mapAccessible, setMapAccessible } = useMapAccessible();
    const { setMapPlaceOverlay } = useMapPlaceOverlayState();

    const hasPrivateCode = useMemo(() => {
        return !mapAccessible && Number(code) && (code ?? '').length === 4;
    }, [mapAccessible, code]);

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

    useEffect(() => {
        return () => setMapPlaceOverlay(undefined);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!mapDetail?.accessible && code) {
            checkPrivateCode({ mapId: Number(mapId) }, { code }).then(accessible => {
                if (!accessible) {
                    return navigate(Path.home);
                }

                setMapAccessible(true);
            });
        }
    }, [mapDetail, mapId, code]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!mapDetail) {
        return <Loading />;
    }

    if (hasPrivateCode) {
        return <Loading />;
    }

    if (!mapAccessible) {
        return <PrivateCodeModal />;
    }

    if (!markers) {
        return <Loading />;
    }

    return <Outlet />;
};

export default MyMap;
