import React, { FC } from 'react';

import { Container, LabelArea, LoginButton } from './styles';
// import { Path } from '@src/Constants';

const Login: FC = () => {
    const onKakaoLoginClick = () => {
        if (window.Kakao?.isInitialized()) {
            window.Kakao.Auth.authorize({
                redirectUri: encodeURI(`${window.location.origin}/auth/kakao`),
                state: encodeURI(window.location.origin)
            });
        }
    };

    return (
        <Container>
            <LabelArea>
                <h1>MIND MAP</h1>
                <h3>나만의 지도를 공유하자</h3>
            </LabelArea>
            <LoginButton onClick={onKakaoLoginClick}>카카오로 시작하기</LoginButton>
        </Container>
    );
};

export default Login;
