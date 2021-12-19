import React, { FC, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import loadable from '@loadable/component';

import { BreakPoint, Path } from '@src/Constants';
import { meState } from '@src/atom';
import { getMe, setAccessToken } from '@src/api';
import GlobalStyle from '@src/components/GlobalStyle';
import Loading from '@src/components/Loading';

const Login = loadable(() => import('@src/pages/Login'));
const Join = loadable(() => import('@src/pages/Join'));
const Home = loadable(() => import('@src/pages/Home'));
const MyMap = loadable(() => import('@src/pages/MyMap'));
const KakaoCallbackPage = loadable(() => import('@src/pages/KakaoCallbackPage'));
const NotFound = loadable(() => import('@src/pages/NotFound'));

const App: FC = () => {
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(true);
    const setMe = useSetRecoilState(meState);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setAccessToken(token);
            getMe()
                .then(setMe)
                .catch(err => {
                    localStorage.removeItem('token');
                    console.error(err);
                    alert('Error!');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);

            if (location.pathname !== Path.authKakao) {
                navigate(Path.login);
            }
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) {
        return <Loading />;
    }

    return (
        <AppContainer>
            <GlobalStyle />
            <RouteContainer>
                <Routes>
                    <Route element={<Login />} path={Path.login} />
                    <Route element={<Join />} path={Path.join} />
                    <Route element={<Home />} path={Path.home} />
                    <Route element={<MyMap />} path={`${Path.myMap}/:hash`} />
                    <Route element={<KakaoCallbackPage />} path='/auth/kakao' />

                    <Route element={<NotFound />} path='*' />
                </Routes>
            </RouteContainer>
        </AppContainer>
    );
};

export default App;

const AppContainer = styled.div`
    background-color: #f9f9f9;
`;

const RouteContainer = styled.main`
    ${BreakPoint.PC} {
        width: 768px;
        min-height: 100vh;
        margin: auto;
        box-shadow: 1px 0 10px 0 #000808;
    }
`;
