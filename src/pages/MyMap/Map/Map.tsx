import React, { FC, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Map as KakaoMap, MapMarker } from 'react-kakao-maps-sdk';
import { useQuery } from 'react-query';

import { Container, Header, MapContainer, BottomFloatingArea, HeaderIcon } from './styles';
import { getMapDetail } from 'src/api/map';
import { getMarkers } from 'src/api/marker';
import { Path } from 'src/Constants';
// import SearchPlacesModal from 'src/components/SearchPlacesModal';
// import useSearchMap from 'src/hooks/useSearchMap';
import Loading from 'src/components/Loading';
import Icon from 'src/components/Icon';

import icSearch from 'src/assets/mymap/ic_search.svg';
import icArrowLeft from 'src/assets/mymap/ic_arrow_left.svg';
import icArrowUp from 'src/assets/mymap/ic_arrow_up.svg';

const Map: FC = () => {
    const params = useParams<{ mapId: string }>();

    const { data: mapDetail } = useQuery(['getMapDetail', params.mapId], () => getMapDetail({ mapId: Number(params.mapId) }));
    const { data: markers } = useQuery(['getMarkers', params.mapId], () => getMarkers({ mapId: Number(params.mapId) }), { enabled: !!mapDetail });

    const [isOpenPlaceList, setIsOpenPlaceList] = useState(false);

    if (!mapDetail || !markers) {
        return <Loading />;
    }

    return (
        <Container>
            <Header>
                <HeaderIcon src={icArrowLeft} />
                <div className='title'>{mapDetail.mapName}</div>
                <Link to={`${Path.myMap}/${params.mapId}${Path.search}`}>
                    <HeaderIcon src={icSearch} />
                </Link>
            </Header>
            <MapContainer>
                <KakaoMap center={{ lat: markers[0].latitude, lng: markers[0].longitude }} style={{ width: '100%', height: '100%' }}>
                    {markers.map(marker => (
                        <MapMarker key={marker.id} position={{ lat: marker.latitude, lng: marker.longitude }} />
                    ))}
                    <BottomFloatingArea isOpen={isOpenPlaceList} onClick={() => setIsOpenPlaceList(v => !v)}>
                        <div className='header'>
                            <Icon className='arrow-up' src={icArrowUp} />
                            <div className='text'>총 {markers.length}개의 장소</div>
                        </div>
                        <div className='place-list'>
                            {markers.map(marker => (
                                <div key={marker.id}>
                                    <div>{marker.name}</div>
                                </div>
                            ))}
                        </div>
                    </BottomFloatingArea>
                </KakaoMap>
            </MapContainer>
        </Container>
    );
};

export default Map;
