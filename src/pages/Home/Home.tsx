import React, { FC, useState, useCallback, Suspense } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import { Main, Top, User, Container, Header, Maps, FloatingWrapper, NewBtn, RecentMap, MapChip } from './styles';
import { Map, mapType } from './types';
import { getMaps, getFavoriteMap, getRecentMaps } from 'src/api/map';
import { Path } from '../../Constants';
import { meState } from 'src/atoms';
import Card from 'src/components/MapCard';
import NewMapModal from 'src/components/NewMapModal';
import Loading from 'src/components/Loading';

import mypage from 'src/assets/main/btn-mypage.svg';

const Home: FC = () => {
    const navigate = useNavigate();

    const me = useRecoilValue(meState);

    const [newMapModalOpen, setNewMapModalOpen] = useState(false);

    const { data: maps } = useQuery('getMaps', () => getMaps());
    const { data: favoriteMaps } = useQuery('getFavoriteMap', () => getFavoriteMap());
    const { data: recentMaps } = useQuery('getRecentMaps', () => getRecentMaps());

    // useEffect(() => {}, [newMapModalOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    const onNewMapClick = useCallback(() => {
        setNewMapModalOpen(open => !open);
    }, []);

    const goMyPage = useCallback(() => {
        navigate(Path.myPage);
    }, [navigate]);

    const onClickRecentMap = (map: Map) => {
        navigate(`${Path.myMap}/${map.id}`);
    };

    const onClickMoreMap = (type: mapType) => {
        navigate(Path.mapList, { state: { type } });
    };

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
                            <div className='see-more' onClick={() => onClickMoreMap('recent')}>
                                더보기
                            </div>
                        </div>
                        <div className='map-area'>
                            <Suspense fallback={<Loading />}>
                                {recentMaps?.map((map, idx) => (
                                    <MapChip key={idx} className='map-chip' onClick={() => onClickRecentMap(map)}>
                                        {map.mapName}
                                    </MapChip>
                                ))}
                            </Suspense>
                        </div>
                    </RecentMap>
                </Top>
                <Maps>
                    <div className='title-area'>
                        <span className='title'>나의 지도</span>
                        <span className='see-more' onClick={() => onClickMoreMap('my')}>
                            더보기
                        </span>
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
                        <span className='see-more' onClick={() => onClickMoreMap('favorite')}>
                            더보기
                        </span>
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
