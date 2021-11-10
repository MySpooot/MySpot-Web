import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import loadable from '@loadable/component';

import GlobalStyle from '@src/components/GlobalStyle';
import useMediaQuery from '@src/hooks/useMediaQuery';

const SupportNotice = loadable(() => import('@src/pages/SupportNotice'));
const MyMap = loadable(() => import('@src/pages/MyMap'));
const Login = loadable(() => import('@src/pages/Login'));
const NotFound = loadable(() => import('@src/pages/NotFound'));

const App: FC = () => {
    const { isPhone } = useMediaQuery();

    if (!isPhone) {
        return <SupportNotice />;
    }

    return (
        <Container>
            <GlobalStyle />
            <Routes>
                <Route element={<MyMap />} path='/mymap/:hash' />
                <Route element={<Login />} path='/login' />
                <Route element={<NotFound />} />
            </Routes>
        </Container>
    );
};

export default App;

const Container = styled.div`
    @media (max-width: 768px) {
        background-color: black;
        color: white;
    }
`;
