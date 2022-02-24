import React, { FC, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container, PlaceInput, Main, PlaceItem, HeaderIcon, Info, PlaceName, Address, RoadAddress, AddButton } from './styles';
import { Path } from 'src/Constants';
import { useMapDetailState } from 'src/atoms/mapDetail';
import { createMarker } from 'src/api/marker';
import useSearchPlace, { PlaceInfo } from 'src/hooks/useSearchPlace';
import useKeyPress from 'src/hooks/useKeyPress';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';

import icSearch from 'src/assets/mymap/ic_search.svg';

const Search: FC = () => {
    const navigate = useNavigate();
    const params = useParams<{ mapId: string }>();

    const { mapDetail } = useMapDetailState();
    const { places, searchPlaces } = useSearchPlace();

    const [keyword, setKeyword] = useState('');

    const onSearchClick = useCallback(() => {
        searchPlaces(keyword);
    }, [searchPlaces, keyword]);

    const onAddPlaceClick = useCallback(
        (place: PlaceInfo) => {
            if (!mapDetail?.isOwner) return;

            createMarker({ mapId: Number(params.mapId) }, place).then(() => alert('추가되었습니다.'));
        },
        [params, mapDetail?.isOwner]
    );

    useKeyPress('Enter', onSearchClick);

    return (
        <Container>
            <HeaderWithLeftArrow onLeftArrowClick={() => navigate(`${Path.myMap}/${params.mapId}`)}>
                <PlaceInput>
                    <input placeholder='검색하실 장소를 입력해 주세요' value={keyword} onChange={event => setKeyword(event.target.value)} />
                    <HeaderIcon src={icSearch} onClick={onSearchClick} />
                </PlaceInput>
            </HeaderWithLeftArrow>
            <Main>
                {!places && <div>장소를 검색해주세요.</div>}
                {places?.map(place => (
                    <PlaceItem key={place.id}>
                        <Info>
                            <PlaceName>{place.locationName}</PlaceName>
                            <Address>{place.address}</Address>
                            {place.roadAddress && (
                                <RoadAddress>
                                    <div className='label'>지번</div>
                                    <div>{place.roadAddress}</div>
                                </RoadAddress>
                            )}
                        </Info>
                        {mapDetail?.isOwner && <AddButton onClick={() => onAddPlaceClick(place)}>추가</AddButton>}
                    </PlaceItem>
                ))}
            </Main>
        </Container>
    );
};

export default Search;
