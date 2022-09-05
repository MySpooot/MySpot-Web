import React, { FC, useCallback } from 'react';

import { Container, LoginIcon, LabelArea, Description, LoginButton, KakaoIcon, KakaoText } from './styles';

import kakaoLogo from 'src/assets/kakao_logo.svg';
import loginLogo from 'src/assets/login_logo.svg';

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
                <LoginIcon src={loginLogo} />
                <Description>
                    나만의 지도를 만들어
                    <br />
                    장소를 저장하고 공유해 보세요!
                </Description>
            </LabelArea>
            <LoginButton onClick={onKakaoLoginClick}>
                <KakaoIcon src={kakaoLogo} />
                <KakaoText>카카오톡으로 3초만에 시작하기</KakaoText>
            </LoginButton>
        </Container>
    );
};

export default Login;
