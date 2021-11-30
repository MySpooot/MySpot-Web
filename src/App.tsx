import React, { FC, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import loadable from '@loadable/component';

import GlobalStyle from '@src/components/GlobalStyle';
import KakaoCallbackPage from './pages/KakaoCallbackPage';

const MyMap = loadable(() => import('@src/pages/MyMap'));
const Login = loadable(() => import('@src/pages/Login'));
const NotFound = loadable(() => import('@src/pages/NotFound'));

import { meState } from '@src/atom/me';
import { getMe } from '@src/api';

const App: FC = () => {
    const [isLoading, setLoading] = useState(true);
    const [me, setMe] = useRecoilState(meState);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Me:', me);

        const token = localStorage.getItem('token');

        if (token) {
            getMe(token)
                .then(data => setMe(data))
                .catch(console.error)
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            navigate('/login');
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <Container>
            <GlobalStyle />
            <Routes>
                <Route element={<MyMap />} path='/mymap/:hash' />
                <Route element={<Login />} path='/login' />
                <Route element={<NotFound />} />
<<<<<<< HEAD
                {/* <Route element={<SearchPlaces />} path='/addmap' /> */}
=======
                <Route element={<KakaoCallbackPage />} path='/auth/kakao' />
>>>>>>> master
            </Routes>
        </Container>
    );
};

export default App;

const Container = styled.div`
    @media (min-width: 768px) {
        width: 450px;
        border-right: 1px solid black;
        border-left: 1px solid black;
        margin: auto;
    }
`;
