import React, { FC } from 'react';

import { Container } from './styles';
import { usePlaceDetail } from 'src/pages/MyMap/Map/atoms';

const KakaoPlaceIframe: FC = () => {
    const { placeDetail, setPlaceDetail } = usePlaceDetail();

    return (
        <Container>
            <iframe src={`https://place.map.kakao.com/m/${placeDetail?.placeId}`} />
            <div onClick={() => setPlaceDetail(undefined)}>닫기</div>
        </Container>
    );
};

export default KakaoPlaceIframe;
