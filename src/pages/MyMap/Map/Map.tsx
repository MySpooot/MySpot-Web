import React, { FC, useState, useEffect, useCallback } from 'react';
// import {createPortal} from 'react-dom';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';

import { Container, MapContainer, BottomFloatingArea, HeaderIcon, FavoriteIcon } from './styles';
import { createFavoriteMap, deleteFavoriteMap } from 'src/api/map';
import { getMarkers, GetMarkersResponse } from 'src/api/marker';
import { Path } from 'src/Constants';
import { useMapDetailState } from 'src/atoms/mapDetail';
import useKeyPress from 'src/hooks/useKeyPress';
import MyMapPlaceItem from 'src/components/MyMapPlaceListItem';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import MyMapPlaceOverlay from 'src/components/MyMapPlaceOverlay';
import KakaoPlaceIframe from 'src/components/KakaoPlaceIframe';
import Loading from 'src/components/Loading';
import Icon from 'src/components/Icon';

import icSearch from 'src/assets/mymap/ic_search.svg';
import icArrowUp from 'src/assets/mymap/ic_arrow_up.svg';
import icFavoriteOn from 'src/assets/mymap/ic_favorite_on.svg';
import icTempMarker from 'src/assets/mymap/ic_temp_marker.jpg';

const Map: FC = () => {
    const navigate = useNavigate();
    const params = useParams<{ mapId: string }>();

    const { mapDetail, setMapDetail } = useMapDetailState();

    const [markers, setMarkers] = useState<GetMarkersResponse[]>();

    const [accessible, setAccessible] = useState(false);
    const [isOpenPlaceList, setIsOpenPlaceList] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<any>();

    useKeyPress('Escape', () => {
        setSelectedPlace(undefined);
        setIsOpenPlaceList(false);
    });

    useEffect(() => {
        if (!mapDetail) return;

        if (mapDetail.isPrivate) {
            const code = prompt('PrivateMap입니다. 코드를 입력해주세요. (sample: 123)');
            console.log({ code }); // 초대코드 확인 API 호출로 변경

            if (code !== '123') {
                alert('잘못된 초대코드입니다');
                return navigate(Path.home);
            }
        }
        setAccessible(true);

        getMarkers({ mapId: Number(params.mapId) }).then(setMarkers);
    }, [mapDetail]); // eslint-disable-line react-hooks/exhaustive-deps

    const onFavoriteClick = useCallback(() => {
        if (mapDetail?.isFavorite) {
            setMapDetail(detail => (detail ? { ...detail, isFavorite: false } : undefined));
            deleteFavoriteMap({ favoriteMapId: Number(params.mapId) });

            return;
        }

        setMapDetail(detail => (detail ? { ...detail, isFavorite: true } : undefined));
        createFavoriteMap({ favoriteMapId: Number(params.mapId) });
    }, [params, mapDetail, setMapDetail]);

    if (!mapDetail) {
        return <Loading />;
    }

    if (!accessible) {
        return <div>초대 코드를 입력해주세요.</div>;
    }

    if (!markers) {
        return <Loading />;
    }

    return (
        <Container>
            <HeaderWithLeftArrow style={{ justifyContent: 'space-between' }} onLeftArrowClick={() => navigate(Path.home)}>
                <div className='title'>{mapDetail.mapName}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to={`${Path.myMap}/${params.mapId}${Path.search}`}>
                        <HeaderIcon src={icSearch} />
                    </Link>
                    <Link to={`${Path.myMap}/${params.mapId}/setting`}>
                        <div>Setting</div>
                    </Link>
                </div>
            </HeaderWithLeftArrow>
            <MapContainer>
                <KakaoMap
                    center={{ lat: markers[0]?.latitude || 37.516, lng: markers[0]?.longitude || 127.13 }}
                    level={5}
                    style={{ width: '100%', height: '100%' }}
                >
                    {markers.map(marker => (
                        <MapMarker
                            key={marker.id}
                            image={{ src: icTempMarker, size: { height: 50, width: 50 } }}
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                            title='asd'
                            onClick={() => setSelectedPlace(marker)}
                        />
                    ))}
                    {selectedPlace && <MyMapPlaceOverlay place={selectedPlace} up={isOpenPlaceList} />}
                    <BottomFloatingArea isOpen={isOpenPlaceList}>
                        <div className='header' onClick={() => setIsOpenPlaceList(v => !v)}>
                            <Icon className='arrow-up' src={icArrowUp} />
                            <div className='text'>총 {markers.length}개의 장소</div>
                        </div>
                        <div className='place-list'>
                            {markers.map(marker => (
                                <MyMapPlaceItem key={marker.id} place={marker} />
                            ))}
                        </div>
                    </BottomFloatingArea>
                </KakaoMap>
                <FavoriteIcon src={mapDetail.isFavorite ? icFavoriteOn : ''} onClick={onFavoriteClick} />
                <KakaoPlaceIframe />
            </MapContainer>
        </Container>
    );
};

export default Map;
