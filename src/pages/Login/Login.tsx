import React, { FC, useCallback } from 'react';

import { Container, LabelArea, Title, Description, LoginButton } from './styles';

const Login: FC = () => {
    const onKakaoLoginClick = useCallback(() => {
        if (!window.Kakao?.isInitialized()) return;

        window.Kakao.Auth.authorize({
            redirectUri: encodeURI(`${window.location.origin}/auth/kakao`),
            state: encodeURI(window.location.origin)
        });
    }, []);

    return (
        <Container>
            <LabelArea>
                <Title>My Spot</Title>
                <Description>나만의 지도를 공유하자</Description>
            </LabelArea>
            <LoginButton onClick={onKakaoLoginClick}>카카오톡으로 3초만에 시작하기</LoginButton>
        </Container>
    );
};

export default Login;
