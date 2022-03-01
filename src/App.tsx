import React, { FC, useEffect, useState, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { Dimension, Path } from './Constants';
import { useMeState } from 'src/atoms';
import { getMe, setAccessToken } from 'src/api';
import GlobalStyle from 'src/components/GlobalStyle';
import Loading from 'src/components/Loading';

const Login = lazy(() => import('src/pages/Login'));
const Join = lazy(() => import('src/pages/Join'));
const Home = lazy(() => import('src/pages/Home'));
const MyMap = lazy(() => import('src/pages/MyMap'));
const Map = lazy(() => import('src/pages/MyMap/Map'));
const Search = lazy(() => import('src/pages/MyMap/Search'));
const KakaoDetail = lazy(() => import('src/pages/MyMap/Kakao'));
const Review = lazy(() => import('src/pages/MyMap/Review'));
const Setting = lazy(() => import('src/pages/MyMap/Setting'));
const MyPage = lazy(() => import('src/pages/MyPage'));
const MapList = lazy(() => import('src/pages/MapList'));
const KakaoLoginCallback = lazy(() => import('src/pages/KakaoLoginCallback'));

const App: FC = () => {
    const [isLoading, setLoading] = useState(true);
    const { me, setMe } = useMeState();

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
                    {me ? (
                        <>
                            <Route element={<Home />} path={Path.home} />
                            <Route element={<MyPage />} path={Path.myPage} />
                        </>
                    ) : (
                        <>
                            <Route element={<Login />} path={Path.login} />
                            <Route element={<Join />} path={Path.join} />
                        </>
                    )}
                    <Route element={<MyMap />} path={Path.myMap}>
                        <Route element={<Map />} path=':mapId' />
                        <Route element={<Search />} path={`:mapId${Path.search}`} />
                        <Route element={<Setting />} path={`:mapId${Path.setting}`} />
                        <Route element={<KakaoDetail />} path={':mapId/kakao/:kakaoAddressId'} />
                        <Route element={<Review />} path={':mapId/review/:kakaoAddressId'} />
                    </Route>
                    <Route element={<KakaoLoginCallback />} path={Path.authKakao} />
                    <Route element={<MapList />} path={Path.mapList} />
                    <Route element={<Navigate to={me ? Path.home : Path.login} replace />} path='*' />
                </Routes>
            </Suspense>
        </AppContainer>
    );
};

export default App;

const AppContainer = styled.main`
    display: flex;
    width: 100%;
    max-width: ${Dimension.MaxWidth};
    min-height: 100vh;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 -5px 10px 0 rgba(0, 0, 0, 0.1);
`;
