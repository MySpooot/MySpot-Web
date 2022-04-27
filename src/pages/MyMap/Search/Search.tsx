import React, { FC, useState, useCallback } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Container, Main, HeaderIcon } from './styles';
import { SearchItem } from './components';
import { Path } from 'src/Constants';
import { getMapDetailHelper, getMarkersHelper } from 'src/query';
import { createMarker, CreateMarkerBody, CreateMarkerParam, CreateMarkerResponse } from 'src/api/marker';
import useSearchPlace, { Place } from 'src/hooks/useSearchPlace';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import FilledLoading from 'src/components/FilledLoading';
import Input from 'src/components/Input';

import icSearch from 'src/assets/mymap/ic_search.svg';

const Search: FC = () => {
    const navigate = useNavigate();
    const { mapId } = useParams<{ mapId: string }>();

    const { data: mapDetail } = getMapDetailHelper.useQuery(Number(mapId));
    const { data: markers } = getMarkersHelper.useQuery(Number(mapId));

    const { places, searchPlaces } = useSearchPlace();

    const [keyword, setKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSearchClick = useCallback(() => {
        searchPlaces(keyword);
    }, [searchPlaces, keyword]);

    const { mutate: fetchCreateMarker } = useMutation<CreateMarkerResponse, unknown, CreateMarkerParam & CreateMarkerBody>(
        ({ mapId, ...body }) => createMarker({ mapId }, body),
        {
            onMutate: () => setIsLoading(true),
            onSuccess: response => {
                alert('추가되었습니다.');

                getMarkersHelper.setQueryData(Number(mapId), markers => {
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
            },
            onSettled: () => setIsLoading(false)
        }
    );

    const onAddPlaceClick = useCallback(
        (place: Place) => {
            if (!mapDetail?.isOwner) return;

            const isAlreadyAdded = markers?.some(marker => marker.kakaoAddressId === Number(place.addressId));

            if (isAlreadyAdded) {
                return alert('이미 추가된 장소입니다.');
            }

            fetchCreateMarker({ mapId: Number(mapId), ...place });
        },
        [mapId, mapDetail?.isOwner, fetchCreateMarker, markers]
    );

    if (!mapDetail?.isOwner) {
        return <Navigate to={`${Path.myMap}/${mapId}`} />;
    }

    return (
        <Container>
            <HeaderWithLeftArrow style={{ flexShrink: 0 }} onLeftArrowClick={() => navigate(`${Path.myMap}/${mapId}`)} />
            <Input
                placeholder='검색하실 장소를 입력해 주세요'
                style={{ margin: '0 1.25rem', width: 'calc(100% - 2.5rem)', flexShrink: 0 }}
                value={keyword}
                autoFocus
                onChange={event => setKeyword(event.target.value)}
                onEnterPress={onSearchClick}
            >
                <HeaderIcon src={icSearch} onClick={onSearchClick} />
            </Input>
            <Main>
                {places?.map((place, index) => (
                    <SearchItem key={index} activeAddButton={!!mapDetail?.isOwner} place={place} onAddClick={() => onAddPlaceClick(place)} />
                ))}
            </Main>
            {isLoading && <FilledLoading />}
        </Container>
    );
};

export default Search;
