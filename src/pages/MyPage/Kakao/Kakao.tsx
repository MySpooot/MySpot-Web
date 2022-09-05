import React, { FC, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Path } from 'src/Constants';
import KakaoPlaceIframe from 'src/components/KakaoPlaceIframe';
import { Container, Footer, CloseButton } from 'src/pages/MyPage/Kakao/styles';

const Kakao: FC = () => {
    const { kakaoAddressId } = useParams<{ kakaoAddressId: string }>();
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
