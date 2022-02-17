import React, { FC, useCallback } from 'react';

import { Container, Wrapper, EqRightIcon, BookMarkIcon } from './styles';
import { usePlaceDetail } from 'src/pages/MyMap/Map/atoms';

import icEqRight from 'src/assets/mymap/ic_eq_right.svg';
import icBookmark from 'src/assets/mymap/ic_bookmark.svg';
import icMarkedBookmark from 'src/assets/mymap/ic_marked_bookmark.svg';

type PlaceOverlayProps = {
    place?: any;
    up: boolean;
};

const PlaceOverlay: FC<PlaceOverlayProps> = ({ place, up }) => {
    const { setPlaceDetail } = usePlaceDetail();

    const onPlaceOverlayClick = useCallback(() => {
        setPlaceDetail({ placeId: place.addressId });
    }, [setPlaceDetail, place]);

    return (
        <Container up={up}>
            <Wrapper>
                <div className='title'>
                    <BookMarkIcon src={place.isMyLocation ? icMarkedBookmark : icBookmark} />
                    <div style={{ display: 'flex' }} onClick={onPlaceOverlayClick}>
                        <div>{place.name}</div>
                        <EqRightIcon src={icEqRight} />
                    </div>
                </div>
                <div className='address'>{place.address}</div>
                {place.roadAddress && (
                    <div className='road-address'>
                        <div className='label'>지번</div>
                        <div className='name'>{place.roadAddress}</div>
                    </div>
                )}
            </Wrapper>
        </Container>
    );
};

export default PlaceOverlay;
