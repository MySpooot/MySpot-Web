import React, { FC } from 'react';

import { Container } from './styles';
import { usePlaceDetail } from 'src/pages/MyMap/Map/atoms';

const KakaoPlaceIframe: FC = () => {
    const { placeDetail } = usePlaceDetail();

    return (
        <Container>
            <iframe frameBorder='0' height='100%' src={`https://place.map.kakao.com/m/${placeDetail?.placeId}`} width='100%' />
        </Container>
    );
};

export default KakaoPlaceIframe;
