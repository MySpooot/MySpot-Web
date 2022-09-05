import React, { FC, useCallback, MouseEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container, Info, PlaceName, Address, RoadAddress, AddButton } from './styles';
import { Path } from 'src/Constants';
import { CreateMarkerBody, CreateMarkerParam } from 'src/api';
import { Place } from 'src/hooks/useSearchPlace';
import { getMapDetailHelper, getMarkersHelper } from 'src/query';

type SearchItemProps = {
    place: Place;
    activeAddButton: boolean;
    onCreateMarker: (v: CreateMarkerParam & CreateMarkerBody) => void;
};

const SearchItem: FC<SearchItemProps> = ({ place, activeAddButton, onCreateMarker }) => {
    const { mapId } = useParams<{ mapId: string }>();
    const navigate = useNavigate();

    const { data: mapDetail } = getMapDetailHelper.useQuery(Number(mapId));
    const { data: markers } = getMarkersHelper.useQuery(Number(mapId));

    const onItemClick = useCallback(
        (kakaoAddressId: number) => {
            navigate(`${Path.myMap}/${mapId}${Path.search}/${kakaoAddressId}`);
        },
        [navigate, mapId]
    );

    const onAddPlaceClick = useCallback(
        (place: Place, event: MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            if (!mapDetail?.isOwner) return;

            const isAlreadyAdded = markers?.some(marker => marker.kakaoAddressId === Number(place.addressId));

            if (isAlreadyAdded) {
                return alert('이미 추가된 장소입니다.');
            }

            onCreateMarker({ mapId: Number(mapId), ...place });
        },
        [mapId, mapDetail?.isOwner, onCreateMarker, markers]
    );

    return (
        <Container onClick={() => onItemClick(place.addressId)}>
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
            {activeAddButton && <AddButton onClick={event => onAddPlaceClick(place, event)}>추가</AddButton>}
        </Container>
    );
};

export default SearchItem;
