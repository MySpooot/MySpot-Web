import React, { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';

import { Container, MapContainer, HeaderIcon, FavoriteIcon } from './styles';
import { createRecentMap, createFavoriteMap, deleteFavoriteMap } from 'src/api/map';
import { getMarkers, GetMarkersResponse } from 'src/api/marker';
import { Path } from 'src/Constants';
import { meState } from 'src/atoms';
import { usePlaceDetail } from './atoms';
import { useMapDetailState } from 'src/atoms/mapDetail';
import useKeyPress from 'src/hooks/useKeyPress';
// import useQueryString from 'src/hooks/useQueryString';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import MyMapPlaceOverlay from './components/PlaceOverlay';
import PrivateCodeModal from './components/PrivateCodeModal';
import BottomFloatingArea from './components/BottomFloatingArea';
import KakaoPlaceIframe from 'src/components/KakaoPlaceIframe';
import Loading from 'src/components/Loading';

import icSearch from 'src/assets/mymap/ic_search.svg';
import icFavoriteOn from 'src/assets/mymap/ic_favorite_on.svg';
import icMarker from 'src/assets/mymap/ic_marker.svg';
import icMarkedMarker from 'src/assets/mymap/ic_marked_marker.svg';
import icSetting from 'src/assets/mymap/ic_setting.svg';

const Map: FC = () => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();
    // const { code } = useQueryString<'code'>();

    const { mapDetail, setMapDetail } = useMapDetailState();
    const { placeDetail } = usePlaceDetail();
    const me = useRecoilValue(meState);

    const [mapAccessible, setMapAccessible] = useState(false);
    const [isOpenPlaceList, setIsOpenPlaceList] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<GetMarkersResponse>();

    const { data: markers } = useQuery(['getMarkers', mapId], () => getMarkers({ mapId: Number(mapId) }), { enabled: mapAccessible });
    useQuery('createRecentMap', () => createRecentMap({ recentMapId: Number(mapId) }), { enabled: !!me && mapAccessible });

    useKeyPress('Escape', () => {
        setSelectedPlace(undefined);
        setIsOpenPlaceList(false);
    });

    const centerLocation = useMemo(() => {
        if (!markers?.length) {
            return { level: 5, latitude: 37.516, longitude: 127.13 };
        }

        if (selectedPlace) {
            return { level: 5, latitude: Number(selectedPlace.latitude), longitude: Number(selectedPlace.longitude) };
        }

        return { level: 5, latitude: Number(markers[0].latitude), longitude: Number(markers[0].longitude) };
    }, [markers, selectedPlace]);

    useEffect(() => {
        if (!mapDetail) return;

        setMapAccessible(mapDetail.accessible);
    }, [mapDetail]); // eslint-disable-line react-hooks/exhaustive-deps

    const onFavoriteClick = useCallback(() => {
        if (!mapDetail) return;

        if (mapDetail?.isFavorite) {
            setMapDetail(detail => (detail ? { ...detail, isFavorite: false } : undefined));
            deleteFavoriteMap({ favoriteMapId: Number(mapId) });

            return;
        }

        setMapDetail(detail => (detail ? { ...detail, isFavorite: true } : undefined));
        createFavoriteMap({ favoriteMapId: Number(mapId) });
    }, [mapId, mapDetail, setMapDetail]);

    const onPlaceListToggle = useCallback(() => {
        if (!isOpenPlaceList) {
            setSelectedPlace(undefined);
        }

        setIsOpenPlaceList(open => !open);
    }, [isOpenPlaceList]);

    if (!mapDetail) {
        return <Loading />;
    }

    return (
        <>
            {mapAccessible && markers && (
                <Container>
                    <HeaderWithLeftArrow style={{ justifyContent: 'space-between' }} onLeftArrowClick={() => navigate(Path.home)}>
                        <h3 className='title'>{mapDetail.mapName}</h3>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to={`${Path.myMap}/${mapId}${Path.search}`}>
                                <HeaderIcon alt='search' src={icSearch} />
                            </Link>
                            <Link to={`${Path.myMap}/${mapId}/setting`}>
                                <HeaderIcon alt='setting' src={icSetting} />
                            </Link>
                        </div>
                    </HeaderWithLeftArrow>
                    <MapContainer>
                        <KakaoMap
                            center={{ lat: centerLocation.latitude, lng: centerLocation.longitude }}
                            level={centerLocation.level}
                            style={{ width: '100%', height: '100%' }}
                        >
                            {markers.map(marker => (
                                <MapMarker
                                    key={marker.id}
                                    image={{ src: marker.isMyLocation ? icMarkedMarker : icMarker, size: { height: 40, width: 30 } }}
                                    position={{ lat: Number(marker.latitude), lng: Number(marker.longitude) }}
                                    onClick={() => setSelectedPlace(marker)}
                                />
                            ))}
                            {selectedPlace && <MyMapPlaceOverlay place={selectedPlace} up={isOpenPlaceList} />}
                            <BottomFloatingArea open={isOpenPlaceList} onPlaceListToggle={onPlaceListToggle} />
                        </KakaoMap>
                        <FavoriteIcon alt='favorite' src={mapDetail.isFavorite ? icFavoriteOn : ''} onClick={onFavoriteClick} />
                        {placeDetail && <KakaoPlaceIframe />}
                    </MapContainer>
                </Container>
            )}
            {!mapAccessible && (
                <PrivateCodeModal
                    mapId={mapDetail.mapId}
                    onCodeEnterFail={() => alert('fail!')}
                    onCodeEnterSuccess={accessible => setMapAccessible(accessible)}
                />
            )}
        </>
    );
};

export default Map;
