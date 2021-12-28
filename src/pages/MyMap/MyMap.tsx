import React, { FC, useState, useCallback, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu as Hamburger } from 'react-icons/gi';
import { FaSearch as Search } from 'react-icons/fa';

import { Container, Header, MapContainer, Map, ButtonWrapper, Plus, Minus } from './styles';
import SearchPlacesModal from 'src/components/SearchPlacesModal';
import useSearchMap from 'src/hooks/useSearchMap';

const MyMap: FC = () => {
    const navigate = useNavigate();
    const mapRef = useRef<HTMLDivElement>(null);

    const { places, searchPlaces } = useSearchMap();
    // console.log(places);

    const [searchPlacesModalOpen, setSearchPlacesModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const options = {
            center: new window.kakao.maps.LatLng(37.541, 126.986),
            level: 3
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);

        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(37.541, 126.986);

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
    }, []);

    const onSearchInputChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(evt.target.value);
    }, []);

    const onClickSearch = useCallback(() => {
        searchPlaces(searchInput);
        setSearchPlacesModalOpen(true);
    }, [searchPlaces, searchInput]);

    const onSearchInputKeypress = useCallback(
        (evt: KeyboardEvent<HTMLInputElement>) => {
            if (evt.key === 'Enter') {
                onClickSearch();
            }
        },
        [onClickSearch]
    );

    const onHamburgerClick = useCallback(() => {
        navigate('/home');
    }, [navigate]);

    const onPlusClick = useCallback(() => {
        console.log('onPlusClick');
    }, []);

    const onMinusClick = useCallback(() => {
        console.log('onMinusClick');
    }, []);

    return (
        <Container>
            <Header>
                <Hamburger onClick={onHamburgerClick} />
                <div>
                    <input placeholder='검색어 입력' value={searchInput} onChange={onSearchInputChange} onKeyPress={onSearchInputKeypress}></input>
                    <Search onClick={onClickSearch} />
                </div>
                <div>+</div>
            </Header>
            <MapContainer>
                <Map ref={mapRef}>
                    <ButtonWrapper style={{ zIndex: 99 }}>
                        <Plus size={30} onClick={onPlusClick} />
                        <Minus size={30} onClick={onMinusClick} />
                    </ButtonWrapper>
                    {searchPlacesModalOpen && places && <SearchPlacesModal places={places} setSearchPlacesModalOpen={setSearchPlacesModalOpen} />}
                </Map>
            </MapContainer>
        </Container>
    );
};

export default MyMap;
