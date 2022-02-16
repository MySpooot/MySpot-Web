import React, { FC, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import { Main, Top, User, Container, Header, Maps, FloatingWrapper, NewBtn, RecentMap, MapChip } from 'src/pages/Home/styles';
import { Map, mapType } from 'src/pages/Home/types';
import { getMaps, getFavoriteMap, getRecentMaps } from 'src/api/map';
import { Path } from 'src/Constants';
import { meState } from 'src/atoms';
import Card from 'src/components/MapCard';
import NewMapModal from 'src/components/NewMapModal';
import Loading from 'src/components/Loading';

import mypage from 'src/assets/main/btn-mypage.svg';

const Home: FC = () => {
    const navigate = useNavigate();

    const me = useRecoilValue(meState);

    const [newMapModalOpen, setNewMapModalOpen] = useState(false);

    const { data: maps, isLoading: isMapLoading } = useQuery('getMaps', () => getMaps());
    const { data: favoriteMaps, isLoading: isFavoriteLoading } = useQuery('getFavoriteMap', () => getFavoriteMap());
    const { data: recentMaps, isLoading: isRecentLoading } = useQuery('getRecentMaps', () => getRecentMaps());

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
        navigate(`${Path.mapList}?type=${type}`);
    };

    const [isOpenToolTip, setIsOpenToolTip] = useState(false);

    // useEffect(() => {
    //     console.log('isOpenToolTip ::: ', isOpenToolTip);
    // }, [isOpenToolTip]);

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
                            {isRecentLoading && <Loading />}
                            {recentMaps?.map((map, idx) => (
                                <MapChip key={idx} onClick={() => onClickRecentMap(map)}>
                                    {map.mapName}
                                </MapChip>
                            ))}
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
                        {isMapLoading && <Loading />}
                        {maps?.map((map, idx) => (
                            <Card key={idx} map={map} setIsOpenToolTip={setIsOpenToolTip} />
                        ))}
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
                        {isFavoriteLoading && <Loading />}
                        {favoriteMaps?.map((map, idx) => (
                            <Card key={idx} map={map} setIsOpenToolTip={setIsOpenToolTip} />
                        ))}
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
