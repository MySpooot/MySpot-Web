import React, { FC, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container, Footer, BackButton, ViewReviewButton } from './styles';
import KakaoPlaceIframe from 'src/components/KakaoPlaceIframe';
import Icon from 'src/components/Icon';

import icArrowLeft from 'src/assets/mymap/ic_arrow_left.svg';

const Kakao: FC = () => {
    const { mapId, kakaoAddressId } = useParams<{ mapId: string; kakaoAddressId: string }>();
    const navigate = useNavigate();

    const onBackButtonClick = useCallback(() => {
        navigate(`/map/${mapId}`);
    }, [navigate, mapId]);

    const onViewReviewButtonClick = useCallback(() => {
        navigate(`/map/${mapId}/review/${kakaoAddressId}`);
    }, [navigate, mapId, kakaoAddressId]);

    if (!kakaoAddressId) {
        return <></>;
    }

    return (
        <Container>
            <KakaoPlaceIframe addressId={kakaoAddressId} />
            <Footer>
                <BackButton onClick={onBackButtonClick}>
                    <Icon src={icArrowLeft} />
                </BackButton>
                <ViewReviewButton onClick={onViewReviewButtonClick}>후기 보기</ViewReviewButton>
            </Footer>
        </Container>
    );
};

export default Kakao;
