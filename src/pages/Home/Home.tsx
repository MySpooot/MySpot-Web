import React, { FC, useState, useEffect, useCallback, Suspense } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import { Main, Top, User, Container, Header, Maps, FloatingWrapper, NewBtn, RecentMap } from './styles';
import { Map } from './types';
// import { getMaps, getRecentMaps } from 'src/api/map';
import { getMaps, getFavoriteMap, getRecentMaps } from 'src/api/map';
import { Path } from '../../Constants';
import { meState } from 'src/atoms';
import Card from 'src/components/MapCard';
import NewMapModal from 'src/components/NewMapModal';
import Loading from 'src/components/Loading';

import mypage from 'src/assets/main/btn-mypage.svg';

const TempMaps = [
    { id: 1, mapName: '지도1', isPrivate: false },
    { id: 2, mapName: '지도2', isPrivate: false },
    { id: 3, mapName: '지도3', isPrivate: false }
];

const Home: FC = () => {
    const navigate = useNavigate();

    const me = useRecoilValue(meState);

    // const [recentMaps, setRecentMaps] = useState<Map[]>();
    // const [favoriteMaps, setFavoriteMaps] = useState<Map[]>();
    const [newMapModalOpen, setNewMapModalOpen] = useState(false);

    const { data: maps } = useQuery('getMaps', () => getMaps());
    const { data: favoriteMaps } = useQuery('getFavoriteMap', () => getFavoriteMap());
    const { data: recentMaps } = useQuery('getRecentMaps', () => getRecentMaps());

    useEffect(() => {
        setTimeout(() => {
            // setRecentMaps(TempMaps);
            // setFavoriteMaps(TempMaps);
            // getRecentMaps().then(setRecentMaps);
        }, 500);
    }, []);

    useEffect(() => {}, [newMapModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    const onNewMapClick = useCallback(() => {
        setNewMapModalOpen(open => !open);
    }, []);

    const goMyPage = useCallback(() => {
        navigate(Path.myPage);
    }, [navigate]);

    return (
        <Container>
            <Main>
                <Top>
                    <Header>
                        <div className='myspot-title'>my spot</div>
                        <img className='mypage-img' src={mypage} onClick={goMyPage} />
                    </Header>

                    <User>{me?.nickname}님 안녕하세요!</User>

                    <RecentMap>
                        <div className='text-bar'>
                            <div className='title'>#최근 본 지도</div>
                            <div className='see-more'>더보기</div>
                        </div>
                        <div className='map-area'>
                            <Suspense fallback={<Loading />}>
                                {recentMaps?.map((map, idx) => (
                                    <div key={idx} className='map-chip'>
                                        {map.mapName}
                                    </div>
                                ))}
                            </Suspense>
                        </div>
                    </RecentMap>
                </Top>
                <Maps>
                    <div className='title-area'>
                        <span className='title'>나의 지도</span>
                        <span className='see-more'>더보기</span>
                        {/* <img src='img/icArrowRight.png' width='20' /> */}
                    </div>
                    <div className='map-area'>
                        <Suspense fallback={<Loading />}>
                            {maps?.map((map, idx) => (
                                <Card key={idx} map={map} />
                            ))}
                        </Suspense>
                    </div>
                </Maps>
                <Maps>
                    <div className='title-area'>
                        <span className='title'>즐겨찾는 지도</span>
                        <span className='see-more'>더보기</span>
                        {/* <img src='img/icArrowRight.png' width='20' /> */}
                    </div>
                    <div className='map-area'>
                        <Suspense fallback={<Loading />}>
                            {!favoriteMaps && <Loading />}
                            {favoriteMaps?.map((map, idx) => (
                                <Card key={idx} map={map} />
                            ))}
                        </Suspense>
                    </div>
                </Maps>
                <FloatingWrapper active={false}>
                    <NewBtn onClick={onNewMapClick}>new</NewBtn>
                </FloatingWrapper>
            </Main>

            <NewMapModal open={newMapModalOpen} setNewMapModalOpen={setNewMapModalOpen} />
        </Container>
    );
};

export default Home;
