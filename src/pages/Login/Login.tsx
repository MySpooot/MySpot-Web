import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Container, LabelArea, LoginButton } from './styles';
import { Path } from 'src/Constants';
import { meState } from 'src/atoms';

const Login: FC = () => {
    const navigate = useNavigate();
    const me = useRecoilValue(meState);

    useEffect(() => {
        if (me) {
            navigate(Path.home);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                <h1>My Spot</h1>
                <h3>나만의 지도를 공유하자</h3>
            </LabelArea>
            <LoginButton onClick={onKakaoLoginClick}>카카오톡으로 3초만에 시작하기</LoginButton>
        </Container>
    );
};

export default Login;
