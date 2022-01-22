import React, { FC, useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';

import { BreakPoint, Path } from './Constants';
import { meState } from './atoms';
import { getMe, setAccessToken } from './api';
import GlobalStyle from './components/GlobalStyle';
import Loading from './components/Loading';

const Login = lazy(() => import('src/pages/Login'));
const Join = lazy(() => import('src/pages/Join'));
const Home = lazy(() => import('src/pages/Home'));
const MyMap = lazy(() => import('src/pages/MyMap'));
const KakaoLoginCallback = lazy(() => import('src/pages/KakaoLoginCallback'));
const NotFound = lazy(() => import('src/pages/NotFound'));

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
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route element={<Login />} path={Path.login} />
                    <Route element={<Join />} path={Path.join} />
                    <Route element={<Home />} path={Path.home} />
                    <Route element={<MyMap />} path={`${Path.myMap}/:hash`} />
                    <Route element={<KakaoLoginCallback />} path={Path.authKakao} />

                    <Route element={<NotFound />} path='*' />
                </Routes>
            </Suspense>
        </AppContainer>
    );
};

export default App;

const AppContainer = styled.main`
    ${BreakPoint.PC} {
        width: 768px;
        min-height: 100vh;
        margin: auto;
    }
`;
