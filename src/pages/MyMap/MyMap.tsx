import React, { FC, useState, useCallback, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Map, CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';
import { useQuery } from 'react-query';

import { Container, Header, MapContainer, BottomFloatingArea, HeaderIcon } from './styles';
import { getMapDetail } from 'src/api/map';
import SearchPlacesModal from 'src/components/SearchPlacesModal';
import useSearchMap from 'src/hooks/useSearchMap';
import Loading from '../../components/Loading';

import icSearch from 'src/assets/mymap/ic_glass.svg';
import icArrowLeft from 'src/assets/mymap/ic_arrow_left.svg';
import icArrowUp from 'src/assets/mymap/ic_arrow_up.svg';
import Icon from '../../components/Icon';

const MyMap: FC = () => {
    const navigate = useNavigate();
    const params = useParams<{ mapId: string }>();

    // console.log('@@@@@', window.location.pathname);
    const { data: mapDetail } = useQuery('getMapDetail', () => getMapDetail({ mapId: Number(params.mapId) }));

    const mapRef = useRef<HTMLDivElement>(null);

    const [isOpenPlaceList, setIsOpenPlaceList] = useState(false);

    const { places, searchPlaces } = useSearchMap();
    // console.log(places);

    // const [searchPlacesModalOpen, setSearchPlacesModalOpen] = useState(false);
    // const [searchInput, setSearchInput] = useState('');

    // const onSearchInputChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    //     setSearchInput(evt.target.value);
    // }, []);

    // const onClickSearch = useCallback(() => {
    //     searchPlaces(searchInput);
    //     setSearchPlacesModalOpen(true);
    // }, [searchPlaces, searchInput]);

    // const onSearchInputKeypress = useCallback(
    //     (evt: KeyboardEvent<HTMLInputElement>) => {
    //         if (evt.key === 'Enter') {
    //             onClickSearch();
    //         }
    //     },
    //     [onClickSearch]
    // );

    // const onHamburgerClick = useCallback(() => {
    //     navigate('/home');
    // }, [navigate]);

    if (!mapDetail) {
        return <Loading />;
    }
    console.log({ isOpenPlaceList });
    return (
        <Container>
            <Header>
                <HeaderIcon src={icArrowLeft} />
                <div className='title'>{mapDetail.mapName}</div>
                <HeaderIcon src={icSearch} />
            </Header>
            <MapContainer>
                <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: '100%', height: '100%' }}>
                    <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                        <div style={{ color: '#000' }}>Hello World!</div>
                    </MapMarker>
                    <BottomFloatingArea isOpen={isOpenPlaceList} onClick={() => setIsOpenPlaceList(v => !v)}>
                        <div className='header'>
                            <Icon className='arrow-up' src={icArrowUp} />
                            <div className='text'>총 12개의 장소</div>
                        </div>
                        <div className='place-list'>
                            <div>
                                <div>돈돈버거 강남점</div>
                            </div>
                            <div>
                                <div>돈돈버거 강남점</div>
                            </div>
                            <div>
                                <div>돈돈버거 강남점</div>
                            </div>
                        </div>
                    </BottomFloatingArea>
                </Map>
            </MapContainer>
        </Container>
    );
};

export default MyMap;
