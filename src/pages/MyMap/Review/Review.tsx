import React, { FC, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container, Main, Info, PlaceName, Footer, BackButton, ViewKakaoButton } from './styles';

const Review: FC = () => {
    const { mapId, kakaoAddressId } = useParams<{ mapId: string; kakaoAddressId: string }>();
    const navigate = useNavigate();

    const onBackButtonClick = useCallback(() => {
        navigate(`/map/${mapId}`);
    }, [navigate, mapId]);

    const onViewKakaoMapButtonClick = useCallback(() => {
        navigate(`/map/${mapId}/kakao/${kakaoAddressId}`);
    }, [navigate, mapId, kakaoAddressId]);

    return (
        <Container>
            <Main>
                <Info>
                    <PlaceName>카페 노티드</PlaceName>
                </Info>
            </Main>
            <Footer>
                <BackButton onClick={onBackButtonClick}>뒤로가기</BackButton>
                <ViewKakaoButton onClick={onViewKakaoMapButtonClick}>카카오 맵 보기</ViewKakaoButton>
            </Footer>
        </Container>
    );
};

export default Review;
