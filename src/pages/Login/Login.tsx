import React, { FC } from 'react';
import styled from '@emotion/styled';

const Login: FC = () => {
    // const { onKakaoLogin } = useKakaoAuth();
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
            <div>
                <h1>MIND MAP</h1>
                <h3>나만의 지도를 공유하자</h3>
            </div>
            <LoginButton onClick={onKakaoLoginClick}>카카오톡으로 시작하기</LoginButton>
        </Container>
    );
};

export default Login;

const Container = styled.main`
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const LoginButton = styled.button`
    /* font-family: Noto-Sans; */
    width: 20rem;
    padding: 1rem 2rem;
    background-color: #fee500;
    cursor: pointer;
`;
