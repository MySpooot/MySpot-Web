import React, { FC, useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { pageview, set } from 'react-ga';
import styled from '@emotion/styled';
import Div100vh from '@rodmg/react-div-100vh';

import { BreakPoint, Dimension, Path } from './Constants';
import GlobalStyle from 'src/components/GlobalStyle';
import Loading from 'src/components/Loading';
import { useMeState } from './atoms';
import { getMe, setAccessToken } from './api';

import backgroundImage from 'src/assets/img_background.jpg';
import useMediaQuery from './hooks/useMediaQuery';

const Login = lazy(() => import('src/pages/Login'));
const Join = lazy(() => import('src/pages/Join'));
const Home = lazy(() => import('src/pages/Home'));
const MyMap = lazy(() => import('src/pages/MyMap'));
const Map = lazy(() => import('src/pages/MyMap/Map'));
const Search = lazy(() => import('src/pages/MyMap/Search'));
const KakaoDetail = lazy(() => import('src/pages/MyMap/Kakao'));
const LocationDetail = lazy(() => import('src/pages/MyPage/Kakao'));
const Review = lazy(() => import('src/pages/MyMap/Review'));
const MyPage = lazy(() => import('src/pages/MyPage'));
const MapList = lazy(() => import('src/pages/MapList'));
const KakaoLoginCallback = lazy(() => import('src/pages/KakaoLoginCallback'));
const NewMap = lazy(() => import('src/pages/NewMap'));

const App: FC = () => {
    const location = useLocation();
    const { isBelowThanTablet } = useMediaQuery();

    const { me, setMe } = useMeState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            return setIsLoading(false);
        }

        setAccessToken(token);
        getMe()
            .then(setMe)
            .catch(err => {
                localStorage.removeItem('token');
                console.error(err);
                alert('Error!');
            })
            .finally(() => setIsLoading(false));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        set({ page: location.pathname });
        pageview(location.pathname);
    }, [location]);

    if (isLoading) {
        return (
            <>
                <AppContainer>
                    <GlobalStyle />
                    <Loading />
                </AppContainer>
                {!isBelowThanTablet && <Background src={backgroundImage} />}
            </>
        );
    }

    return (
        <>
            <AppContainer>
                <GlobalStyle />
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {me ? (
                            <>
                                <Route element={<Home />} path={Path.home} />
                                <Route element={<MyPage />} path={Path.myPage}>
                                    <Route element={<LocationDetail />} path={':kakaoAddressId'} />
                                </Route>
                                <Route element={<MapList />} path={Path.mapList} />
                                <Route element={<NewMap />} path={Path.newMap} />
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
                            <Route element={<KakaoDetail />} path={':mapId/kakao/:kakaoAddressId'} />
                            <Route element={<Review />} path={':mapId/review/:kakaoAddressId'} />
                        </Route>
                        <Route element={<KakaoLoginCallback />} path={Path.authKakao} />
                        <Route element={<Navigate to={me ? Path.home : Path.login} replace />} path='*' />
                    </Routes>
                </Suspense>
            </AppContainer>
            {!isBelowThanTablet && <Background src={backgroundImage} />}
        </>
    );
};

export default App;

const AppContainer = styled(Div100vh)`
    position: relative;
    display: flex;
    width: 100%;
    max-width: ${Dimension.MaxWidth};
    flex-direction: column;
    margin: auto;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1);

    ${BreakPoint.GreaterThanTablet} {
        transform: translateX(12.5rem);
    }
`;

const Background = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    object-fit: cover;
`;
