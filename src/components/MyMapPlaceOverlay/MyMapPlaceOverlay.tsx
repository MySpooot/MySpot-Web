import React, { FC, useCallback } from 'react';

import { Container, Wrapper, EqRightIcon } from './styles';

import icEqRight from 'src/assets/mymap/ic_eq_right.svg';

type MyMapPlaceOverlayProps = {
    place?: any;
    up: boolean;
};

const MyMapPlaceOverlay: FC<MyMapPlaceOverlayProps> = ({ place, up }) => {
    const onPlaceOverlayClick = useCallback(() => {
        window.open(`https://place.map.kakao.com/m/${place.addressId}`);
    }, [place]);

    return (
        <Container up={up}>
            <Wrapper>
                <div className='title' onClick={onPlaceOverlayClick}>
                    <div>{place.name}</div>
                    <EqRightIcon src={icEqRight} />
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

export default MyMapPlaceOverlay;
