import React, { FC, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Map as KakaoMap } from 'react-kakao-maps-sdk';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Container, MapContainer, FavoriteIcon, ShareIcon, OverlayContainer } from './styles';
import { MapHeader, Marker, PlaceOverlay, PlaceListOverlay, PlaceListButton } from './components';
import { createRecentMap, createFavoriteMap, deleteFavoriteMap, getPrivateCode } from 'src/api/map';
import { Path } from 'src/Constants';
import { useMapAccessible, useMeState } from 'src/atoms';
import { getMapDetailHelper, getMarkersHelper } from 'src/query';
import { useMapPlaceOverlayState } from 'src/atoms/mapPlaceOverlay';
import useKeyPress from 'src/hooks/useKeyPress';
import Loading from 'src/components/Loading';
import useAlert from 'src/hooks/useAlert';

import icFavoriteOn from 'src/assets/mymap/ic_favorite_on.svg';
import icFavoriteOff from 'src/assets/mymap/ic_favorite_off.svg';
import icShare from 'src/assets/mymap/ic_share.svg';

const Map: FC = () => {
    const { mapId } = useParams<{ mapId: string }>();

    const { alert } = useAlert();

    const [isOpenPlayListOverlay, setIsOpenPlayListOverlay] = useState(false);
    const [mapLevel, setMapLevel] = useState(4);

    const { me } = useMeState();
    const { data: mapDetail } = getMapDetailHelper.useQuery(Number(mapId));
    const { data: markers } = getMarkersHelper.useQuery(Number(mapId));

    const { data: privateCode } = useQuery(['getPrivateCode', mapId], () => getPrivateCode({ mapId: Number(mapId) }).then(({ code }) => code), {
        enabled: !!mapDetail?.isPrivate
    });

    const { mapAccessible } = useMapAccessible();
    const { mapPlaceOverlay, setMapPlaceOverlay } = useMapPlaceOverlayState();

    useQuery('createRecentMap', () => createRecentMap({ recentMapId: Number(mapId) }), { enabled: !!me && mapAccessible });

    useKeyPress('Escape', () => {
        setMapPlaceOverlay(undefined);
    });

    const centerLocation = useMemo(() => {
        if (!markers?.length) {
            return { latitude: 37.516, longitude: 127.13 };
        }

        if (mapPlaceOverlay) {
            return { latitude: mapPlaceOverlay.latitude, longitude: mapPlaceOverlay.longitude };
        }

        return { latitude: markers[0].latitude, longitude: markers[0].longitude };
    }, [markers, mapPlaceOverlay]);

    const markerSize = useMemo(() => {
        if (mapLevel >= 6 && mapLevel < 8) {
            return { width: 46.8, height: 45.6 };
        }

        if (mapLevel >= 8 && mapLevel <= 10) {
            return { width: 27.6, height: 34.2 };
        }

        return {
            width: 46,
            height: 57.5
        };
    }, [mapLevel]);

    const onFavoriteClick = useCallback(() => {
        if (!mapDetail) return;

        if (mapDetail?.isFavorite) {
            getMapDetailHelper.setQueryData(Number(mapId), detail => {
                if (!detail) return;

                return {
                    ...detail,
                    isFavorite: false
                };
            }); // eslint-disable-line @typescript-eslint/no-non-null-assertion
            deleteFavoriteMap({ favoriteMapId: Number(mapId) });

            return;
        }

        getMapDetailHelper.setQueryData(Number(mapId), detail => {
            if (!detail) return;

            return {
                ...detail,
                isFavorite: true
            };
        }); // eslint-disable-line @typescript-eslint/no-non-null-assertion
        createFavoriteMap({ favoriteMapId: Number(mapId) });
    }, [mapId, mapDetail]);

    if (!mapDetail || !markers) {
        return <Loading />;
    }

    return (
        <Container>
            <MapHeader />
            <MapContainer>
                <KakaoMap
                    center={{ lat: centerLocation.latitude, lng: centerLocation.longitude }}
                    level={mapLevel}
                    maxLevel={10}
                    minLevel={2}
                    style={{ width: '100%', height: '100%' }}
                    onZoomChanged={map => setMapLevel(map.getLevel())}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={marker.id}
                            height={markerSize.height}
                            isMyLocation={marker.isMyLocation}
                            latitude={marker.latitude}
                            longitude={marker.longitude}
                            name={marker.name}
                            selected={false}
                            showName={mapLevel < 5}
                            width={markerSize.width}
                            onClick={() => setMapPlaceOverlay(markers[index])}
                        />
                    ))}

                    {isOpenPlayListOverlay ? (
                        <PlaceListOverlay close={() => setIsOpenPlayListOverlay(false)} />
                    ) : (
                        <OverlayContainer>
                            <PlaceListButton up={!!mapPlaceOverlay} onClick={() => setIsOpenPlayListOverlay(true)} />
                            {mapPlaceOverlay && <PlaceOverlay />}
                        </OverlayContainer>
                    )}
                </KakaoMap>
                <FavoriteIcon alt='favorite' src={mapDetail.isFavorite ? icFavoriteOn : icFavoriteOff} onClick={onFavoriteClick} />
                <CopyToClipboard
                    text={`${window.location.origin}${Path.myMap}/${mapId}${privateCode ? `?code=${privateCode}` : ''}`}
                    onCopy={() => alert('지도 링크를 클립보드에 복사하였습니다.\n지도 링크를 공유해보세요~!')}
                >
                    <ShareIcon src={icShare} />
                </CopyToClipboard>
            </MapContainer>
        </Container>
    );
};

export default Map;
