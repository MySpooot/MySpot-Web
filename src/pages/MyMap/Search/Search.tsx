import React, { FC, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Container, Main, HeaderIcon } from './styles';
import { SearchItem } from './components';
import { Path } from 'src/Constants';
import { useMapMarkerState, useMapDetailState } from 'src/atoms';
import { createMarker, CreateMarkerBody, CreateMarkerParam, CreateMarkerResponse } from 'src/api/marker';
import useSearchPlace, { Place } from 'src/hooks/useSearchPlace';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import Input from 'src/components/Input';

import icSearch from 'src/assets/mymap/ic_search.svg';

const Search: FC = () => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();

    const { markers, setMarkers } = useMapMarkerState();
    const { mapDetail } = useMapDetailState();
    const { places, searchPlaces } = useSearchPlace();

    const [keyword, setKeyword] = useState('');

    const onSearchClick = useCallback(() => {
        searchPlaces(keyword);
    }, [searchPlaces, keyword]);

    const { mutate: fetchCreateMarker } = useMutation<CreateMarkerResponse, unknown, CreateMarkerParam & CreateMarkerBody>(
        ({ mapId, ...body }) => createMarker({ mapId }, body),
        {
            onSuccess: response => {
                alert('추가되었습니다.');
                setMarkers(markers => {
                    if (!markers) return;

                    return [
                        ...markers,
                        {
                            ...response,
                            name: response.locationName,
                            kakaoAddressId: response.addressId,
                            longitude: Number(response.longitude),
                            latitude: Number(response.latitude),
                            isLike: false,
                            isMyLocation: false,
                            likeCount: 0,
                            replyCount: 0
                        }
                    ];
                });
                navigate(`${Path.myMap}/${mapId}`);
            }
        }
    );

    const onAddPlaceClick = useCallback(
        (place: Place) => {
            if (!mapDetail?.isOwner) return;

            const isAllreadyAdded = markers?.some(marker => marker.kakaoAddressId === Number(place.addressId));

            if (isAllreadyAdded) {
                return alert('이미 추가된 장소입니다.');
            }

            fetchCreateMarker({ mapId: Number(mapId), ...place });
        },
        [mapId, mapDetail?.isOwner, fetchCreateMarker, markers]
    );

    return (
        <Container>
            <HeaderWithLeftArrow onLeftArrowClick={() => navigate(`${Path.myMap}/${mapId}`)}>
                <Input
                    placeholder='검색하실 장소를 입력해 주세요'
                    value={keyword}
                    onChange={event => setKeyword(event.target.value)}
                    onEnterPress={onSearchClick}
                >
                    <HeaderIcon src={icSearch} onClick={onSearchClick} />
                </Input>
            </HeaderWithLeftArrow>
            <Main>
                {places?.map(place => (
                    <SearchItem key={place.id} activeAddButton={!!mapDetail?.isOwner} place={place} onAddClick={() => onAddPlaceClick(place)} />
                ))}
            </Main>
        </Container>
    );
};

export default Search;
