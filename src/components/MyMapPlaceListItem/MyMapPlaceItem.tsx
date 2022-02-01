import React, { FC } from 'react';

import { Container } from './styles';

type MyMapPlaceItemProps = {
    place: any;
};

const MyMapPlaceItem: FC<MyMapPlaceItemProps> = ({ place }) => {
    return (
        <Container>
            <div>{place.name}</div>
            <div>
                <div className='adress'>
                    <div className='jibun-address'>{place.address}</div>
                    <div className='road-address'>{place.roadAddress}</div>
                </div>
            </div>
        </Container>
    );
};

export default MyMapPlaceItem;
