import React, { FC, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Container, MapContainer, FavoriteIcon, ShareIcon } from './styles';
import { MapHeader, PlaceOverlay, PlaceListOverlay, PlaceListButton } from './components';
import { createRecentMap, createFavoriteMap, deleteFavoriteMap, getPrivateCode } from 'src/api/map';
import { Path } from 'src/Constants';
import { useMapAccessible, useMeState } from 'src/atoms';
import { getMapDetailHelper, getMarkersHelper } from 'src/query';
import { useMapPlaceOverlayState } from 'src/atoms/mapPlaceOverlay';
import useKeyPress from 'src/hooks/useKeyPress';
import Loading from 'src/components/Loading';

import icFavoriteOn from 'src/assets/mymap/ic_favorite_on.svg';
import icFavoriteOff from 'src/assets/mymap/ic_favorite_off.svg';
import icMarker from 'src/assets/mymap/ic_marker.svg';
import icMarkedMarker from 'src/assets/mymap/ic_marked_marker.svg';
import icShare from 'src/assets/mymap/ic_share.svg';

const Map: FC = () => {
    const { mapId } = useParams<{ mapId: string }>();

    const [isOpenPlayListOverlay, setIsOpenPlayListOverlay] = useState(false);

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
            return { level: 5, latitude: 37.516, longitude: 127.13 };
        }

        if (mapPlaceOverlay) {
            return { level: 5, latitude: mapPlaceOverlay.latitude, longitude: mapPlaceOverlay.longitude };
        }

        return { level: 5, latitude: markers[0].latitude, longitude: markers[0].longitude };
    }, [markers, mapPlaceOverlay]);

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

    if (!mapDetail) {
        return <Loading />;
    }

    return (
        <>
            {mapAccessible && markers && (
                <Container>
                    <MapHeader mapName={mapDetail.name} showTooltip={markers.length === 0} />
                    <MapContainer>
                        <KakaoMap
                            center={{ lat: centerLocation.latitude, lng: centerLocation.longitude }}
                            level={centerLocation.level}
                            style={{ width: '100%', height: '100%' }}
                        >
                            {markers.map((marker, index) => (
                                <MapMarker
                                    key={marker.id}
                                    image={{
                                        src: marker.isMyLocation ? icMarkedMarker : icMarker,
                                        size: { height: 40, width: 30 },
                                        options: { alt: 'marker' }
                                    }}
                                    position={{ lat: marker.latitude, lng: marker.longitude }}
                                    onClick={() => setMapPlaceOverlay(markers[index])}
                                />
                            ))}
                            <PlaceListButton up={!!mapPlaceOverlay} onClick={() => setIsOpenPlayListOverlay(true)} />
                            {mapPlaceOverlay && <PlaceOverlay />}
                            {isOpenPlayListOverlay && <PlaceListOverlay close={() => setIsOpenPlayListOverlay(false)} />}
                        </KakaoMap>
                        <FavoriteIcon alt='favorite' src={mapDetail.isFavorite ? icFavoriteOn : icFavoriteOff} onClick={onFavoriteClick} />
                        <CopyToClipboard
                            text={`${window.location.origin}${Path.myMap}/${mapId}${privateCode ? `?code=${privateCode}` : ''}`}
                            onCopy={() => alert('복사 성공')}
                        >
                            <ShareIcon src={icShare} />
                        </CopyToClipboard>
                    </MapContainer>
                </Container>
            )}
        </>
    );
};

export default Map;
