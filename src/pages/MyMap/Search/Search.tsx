import React, { FC, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Container, Header, Main, PlaceItem, HeaderIcon } from './styles';
import { Path } from 'src/Constants';
import { createMarker } from 'src/api/marker';
import useSearchPlace from 'src/hooks/useSearchPlace';
import useKeyPress from 'src/hooks/useKeyPress';

import icSearch from 'src/assets/mymap/ic_search.svg';
import icArrowLeft from 'src/assets/mymap/ic_arrow_left.svg';

const Search: FC = () => {
    const params = useParams<{ mapId: string }>();

    const { places, searchPlaces } = useSearchPlace();

    const [keyword, setKeyword] = useState('');

    const onSearchClick = useCallback(() => {
        searchPlaces(keyword);
    }, [searchPlaces, keyword]);

    const onAddPlaceClick = useCallback(
        (place: any) => {
            createMarker({ mapId: Number(params.mapId) }, place);
        },
        [params]
    );

    useKeyPress('Enter', onSearchClick);

    return (
        <Container>
            <Header>
                <Link to={`${Path.myMap}/${params.mapId}`}>
                    <HeaderIcon src={icArrowLeft} />
                </Link>
                <div className='input-wrapper'>
                    <input placeholder='검색하실 장소를 입력해 주세요' value={keyword} onChange={event => setKeyword(event.target.value)} />
                    <HeaderIcon src={icSearch} onClick={onSearchClick} />
                </div>
            </Header>
            <Main>
                {!places && <div>장소를 검색해주세요.</div>}
                {places?.map(place => (
                    <PlaceItem key={place.id}>
                        <div className='info'>
                            <div className='name'>{place.locationName}</div>
                            <div className='address'>{place.address}</div>
                            {place.roadAddress && (
                                <div className='road-address'>
                                    <div className='label'>지번</div>
                                    <div>{place.roadAddress}</div>
                                </div>
                            )}
                        </div>
                        <div className='right' onClick={() => onAddPlaceClick(place)}>
                            추가
                        </div>
                    </PlaceItem>
                ))}
            </Main>
        </Container>
    );
};

export default Search;
