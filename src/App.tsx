import React, { FC, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { Routes, Route, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import loadable from '@loadable/component';

import { BreakPoint } from '@src/Constants';
import { meState } from '@src/atom/me';
import { getMe } from '@src/api';
import GlobalStyle from '@src/components/GlobalStyle';
import Loading from '@src/components/Loading';

const Login = loadable(() => import('@src/pages/Login'));
const Home = loadable(() => import('@src/pages/Home'));
const MyMap = loadable(() => import('@src/pages/MyMap'));
const NotFound = loadable(() => import('@src/pages/NotFound'));
const KakaoCallbackPage = loadable(() => import('@src/pages/KakaoCallbackPage'));

const App: FC = () => {
    const [isLoading, setLoading] = useState(true);
    const [me, setMe] = useRecoilState(meState);
    // const navigate = useNavigate();

    useEffect(() => {
        console.log('Me:', me);

        const token = localStorage.getItem('token');

        if (token) {
            getMe(token)
                .then(setMe)
                .catch(err => {
                    localStorage.removeItem('token');
                    console.error(err);
                    alert('Error!');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            // navigate('/login');
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
                    <Route element={<Login />} path='/login' />
                    <Route element={<Home />} path='/home' />
                    <Route element={<MyMap />} path='/mymap/:hash' />
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
