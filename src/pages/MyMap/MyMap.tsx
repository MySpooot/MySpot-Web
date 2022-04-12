import React, { FC, useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { checkPrivateCode } from 'src/api/map';
import { useMapAccessible, useMapPlaceOverlayState, useMeState } from 'src/atoms';
import { Path } from 'src/Constants';
import { getMapDetailHelper, getMarkersHelper } from 'src/query';
import Loading from 'src/components/Loading';
import PrivateCodeModal from 'src/components/PrivateCodeModal/PrivateCodeModal';
import useQueryString from 'src/hooks/useQueryString';

const MyMap: FC = () => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();
    const { code } = useQueryString<{ code: string }>();

    const { mapAccessible, setMapAccessible } = useMapAccessible();
    const { setMapPlaceOverlay } = useMapPlaceOverlayState();

    const hasPrivateCode = useMemo(() => {
        return !mapAccessible && Number(code) && (code ?? '').length === 4;
    }, [mapAccessible, code]);

    const { me } = useMeState();
    const { data: mapDetail } = getMapDetailHelper.useQuery(Number(mapId), {
        onSuccess: response => {
            if (!response) {
                alert('잘못된 접근입니다.');

                return navigate(me ? Path.home : Path.login);
            }

            setMapAccessible(response.accessible);
        }
    });

    const { data: markers } = getMarkersHelper.useQuery(Number(mapId));

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

    useEffect(() => {
        return () => setMapPlaceOverlay(undefined);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
