import React, { FC } from 'react';

import { Container } from './styles';
import { GetMarkersResponse } from 'src/api/marker';

type PlaceItemProps = {
    place: GetMarkersResponse;
    onClick: () => void;
};

const PlaceItem: FC<PlaceItemProps> = ({ place, onClick }) => {
    return (
        <Container onClick={onClick}>
            <div>{place.name}</div>
            <div>
                <div className='adress'>
                    {place.address && <div className='jibun-address'>{place.address}</div>}
                    {place.roadAddress && <div className='road-address'>{place.roadAddress}</div>}
                </div>
            </div>
        </Container>
    );
};

export default PlaceItem;
