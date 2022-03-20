import React, { FC } from 'react';

import { Container, Info, PlaceName, Address, RoadAddress, AddButton } from './styles';
import { Place } from 'src/hooks/useSearchPlace';

type SearchItemProps = {
    place: Place;
    activeAddButton: boolean;
    onAddClick: () => void;
};

const SearchItem: FC<SearchItemProps> = ({ place, activeAddButton, onAddClick }) => (
    <Container>
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
        {activeAddButton && <AddButton onClick={onAddClick}>추가</AddButton>}
    </Container>
);

export default SearchItem;
