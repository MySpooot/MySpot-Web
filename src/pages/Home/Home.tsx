import React, { FC, useState, useEffect, useCallback, Suspense } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import { Main, WelcomeSection, User, Container, Header, Maps, FloatingWrapper, NewBtn } from './styles';
import { Map } from './types';
// import { getMaps, getRecentMaps } from 'src/api/map';
import { getMaps } from 'src/api/map';
import { Path } from '../../Constants';
import { meState } from 'src/atoms';
import Card from 'src/components/MapCard';
import NewMapModal from 'src/components/NewMapModal';
import Loading from 'src/components/Loading';

const TempMaps = [
    { id: 1, mapName: '지도1', isPrivate: false },
    { id: 2, mapName: '지도2', isPrivate: false },
    { id: 3, mapName: '지도3', isPrivate: false }
];

const Home: FC = () => {
    const navigate = useNavigate();

    const me = useRecoilValue(meState);

    const [recentMaps, setRecentMaps] = useState<Map[]>();
    const [favoriteMaps, setFavoriteMaps] = useState<Map[]>();
    const [newMapModalOpen, setNewMapModalOpen] = useState(false);

    const { data: maps, refetch } = useQuery('getMaps', () => getMaps());

    useEffect(() => {
        setTimeout(() => {
            setRecentMaps(TempMaps);
            setFavoriteMaps(TempMaps);
            // getRecentMaps().then(setRecentMaps);
        }, 500);
    }, []);

    useEffect(() => {
        refetch();
    }, [newMapModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    const onNewMapClick = useCallback(() => {
        setNewMapModalOpen(open => !open);
    }, []);

    const goMyPage = useCallback(() => {
        navigate(Path.myPage);
    }, [navigate]);

    return (
        <Container>
            <Header>
                <img className='myspot-logo' src='img/logoMyspot.png' />
                <img className='mypage-img' src='img/user.png' onClick={goMyPage} />
            </Header>
            <Main>
                <WelcomeSection>
                    <User>
                        <b>{me?.nickname}님 </b>
                        <span>안녕하세요!</span>
                    </User>
                </WelcomeSection>
                <div className='desc'>오늘도 멋진 나만의 지도를 완성해보세요 :)</div>
                <Maps>
                    <div className='title-area'>
                        <span className='title'>내 지도</span>
                        <img src='img/icArrowRight.png' width='20' />
                    </div>
                    <div className='map-area'>
                        <Suspense fallback={<Loading />}>
                            {maps?.map((map, idx) => (
                                <Card key={idx} map={map} />
                            ))}
                        </Suspense>
                    </div>
                    <div className='title-area'>
                        <span className='title'>즐겨찾기</span>
                        <img src='img/icArrowRight.png' width='20' />
                    </div>
                    <div className='map-area'>
                        {!favoriteMaps && <Loading />}
                        {favoriteMaps?.map((map, idx) => (
                            <Card key={idx} map={map} />
                        ))}
                    </div>
                    <div className='title-area'>
                        <span className='title'>최근 본 지도</span>
                        <img src='img/icArrowRight.png' width='20' />
                    </div>
                    <div className='map-area'>
                        {!recentMaps && <Loading />}
                        {recentMaps?.map((map, idx) => (
                            <Card key={idx} map={map} />
                        ))}
                    </div>
                </Maps>
                <FloatingWrapper active={false}>
                    <NewBtn onClick={onNewMapClick}>NEW MAP +</NewBtn>
                </FloatingWrapper>
            </Main>

            <NewMapModal open={newMapModalOpen} setNewMapModalOpen={setNewMapModalOpen} />
        </Container>
    );
};

export default Home;
