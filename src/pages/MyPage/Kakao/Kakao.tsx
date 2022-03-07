import React, { FC, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Container, Footer, CloseButton } from 'src/pages/MyPage/Kakao/styles';
import KakaoPlaceIframe from 'src/components/KakaoPlaceIframe';
import { Path } from 'src/Constants';

const Kakao: FC = () => {
    const { kakaoAddressId } = useParams<{ mapId: string; kakaoAddressId: string }>();
    const navigate = useNavigate();

    const onCloseClick = useCallback(() => {
        navigate(Path.myPage);
    }, [navigate]);

    if (!kakaoAddressId) {
        return <></>;
    }

    return (
        <Container>
            <KakaoPlaceIframe addressId={kakaoAddressId} />
            <Footer>
                <CloseButton onClick={onCloseClick}>닫기</CloseButton>
            </Footer>
        </Container>
    );
};

export default Kakao;
