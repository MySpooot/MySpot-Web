import React, { FC, useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { HiUser } from 'react-icons/hi';
import { useNavigate } from 'react-router';

import { Container, Header, Main, Footer, NewMapButton } from './styles';
import { meState } from 'src/atoms';
import HomeMapItem from 'src/components/HomeMapItem';
import NewMapModal from 'src/components/NewMapModal';
import Loading from 'src/components/Loading';

const TempMaps = [
    { id: 1, title: '지도1' },
    { id: 2, title: '지도2' },
    { id: 3, title: '지도3' }
];

const Home: FC = () => {
    const me = useRecoilValue(meState);

    const [maps, setMaps] = useState<{ id: number; title: string }[]>();
    const [newMapModalOpen, setNewMapModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setMaps(TempMaps);
        }, 500);
    }, []);

    const onNewMapClick = useCallback(() => {
        console.log('onNewMapClick');
        setNewMapModalOpen(open => !open);
    }, []);

    const onLogoutClick = useCallback(() => {
        localStorage.removeItem('token');
        window.location.reload();
    }, []);

    const goMyPage = useCallback(() => {
        navigate('/mypage');
    }, [navigate]);

    return (
        <Container>
            <Header>MIND MAP</Header>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt='thumbnail' src={me?.thumbnail} style={{ borderRadius: '50%' }} width='30' />
                <div>{me?.nickname}님 안녕하세요!</div>
            </div>
            <Header>
                MIND MAP<HiUser onClick={goMyPage}></HiUser>
            </Header>
            <Main>
                {!maps && <Loading />}
                {maps?.map((map, idx) => (
                    <HomeMapItem key={idx} map={map} />
                ))}
            </Main>
            <Footer>
                <NewMapButton onClick={onNewMapClick}>NEW MAP +</NewMapButton>
                <div style={{ cursor: 'pointer' }} onClick={onLogoutClick}>
                    Logout
                </div>
            </Footer>
            <NewMapModal open={newMapModalOpen} setNewMapModalOpen={setNewMapModalOpen} />
        </Container>
    );
};

export default Home;
