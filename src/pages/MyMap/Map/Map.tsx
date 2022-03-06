import React, { FC, useMemo, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';

import { Container, MapContainer, HeaderIcon, FavoriteIcon } from './styles';
import { createRecentMap, createFavoriteMap, deleteFavoriteMap } from 'src/api/map';
import { Path } from 'src/Constants';
import { useMeState, useMapAccessible, useMapDetailState, useMapMarkerState } from 'src/atoms';
import { useMapPlaceOverlayState } from 'src/atoms/mapPlaceOverlay';
import useKeyPress from 'src/hooks/useKeyPress';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import MyMapPlaceOverlay from './components/PlaceOverlay';
import Loading from 'src/components/Loading';

import icSearch from 'src/assets/mymap/ic_search.svg';
import icFavoriteOn from 'src/assets/mymap/ic_favorite_on.svg';
import icFavoriteOff from 'src/assets/mymap/ic_favorite_off.svg';
import icMarker from 'src/assets/mymap/ic_marker.svg';
import icMarkedMarker from 'src/assets/mymap/ic_marked_marker.svg';
import icSetting from 'src/assets/mymap/ic_setting.svg';

const Map: FC = () => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();

    const { mapDetail, setMapDetail } = useMapDetailState();
    const { markers } = useMapMarkerState();
    const { mapAccessible } = useMapAccessible();
    const { mapPlaceOverlay, setMapPlaceOverlay } = useMapPlaceOverlayState();
    const { me } = useMeState();

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
            setMapDetail(detail => ({ ...detail!, isFavorite: false })); // eslint-disable-line @typescript-eslint/no-non-null-assertion
            deleteFavoriteMap({ favoriteMapId: Number(mapId) });

            return;
        }

        setMapDetail(detail => ({ ...detail!, isFavorite: true })); // eslint-disable-line @typescript-eslint/no-non-null-assertion
        createFavoriteMap({ favoriteMapId: Number(mapId) });
    }, [mapId, mapDetail, setMapDetail]);

    if (!mapDetail) {
        return <Loading />;
    }

    return (
        <>
            {mapAccessible && markers && (
                <Container>
                    <HeaderWithLeftArrow style={{ justifyContent: 'space-between' }} onLeftArrowClick={() => navigate(Path.home)}>
                        <h3 className='title'>{mapDetail.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to={`${Path.myMap}/${mapId}${Path.search}`}>
                                <HeaderIcon alt='search' src={icSearch} />
                            </Link>
                            <Link to={`${Path.myMap}/${mapId}/setting`}>
                                <HeaderIcon alt='setting' src={icSetting} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                        </div>
                    </HeaderWithLeftArrow>
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
                            {mapPlaceOverlay && <MyMapPlaceOverlay />}
                        </KakaoMap>
                        <FavoriteIcon alt='favorite' src={mapDetail.isFavorite ? icFavoriteOn : icFavoriteOff} onClick={onFavoriteClick} />
                    </MapContainer>
                </Container>
            )}
        </>
    );
};

export default Map;
