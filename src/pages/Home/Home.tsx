import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';

import { Main, Top, User, Container, Header, Maps, FloatingWrapper, NewBtn, RecentMap, MapChip } from './styles';
import { Map, MapType } from './types';
import { getMaps, getFavoriteMap, getRecentMaps } from 'src/api';
import { Path } from 'src/Constants';
import { getMeHelper } from 'src/query';
import Card from 'src/components/MapCard';
import Loading from 'src/components/Loading';

import mypage from 'src/assets/main/btn-mypage.svg';
import whitearrow from 'src/assets/main/ic-arrow.svg';
import blackarrow from 'src/assets/main/ic-arrow-b.svg';

const Home: FC = () => {
    const navigate = useNavigate();

    const { data: me } = getMeHelper.useQuery();

    const { data: maps, isLoading: isMapLoading } = useQuery('getMaps', () => getMaps());
    const { data: favoriteMaps, isLoading: isFavoriteLoading } = useQuery('getFavoriteMap', () => getFavoriteMap());
    const { data: recentMaps, isLoading: isRecentLoading } = useQuery('getRecentMaps', () => getRecentMaps());

    const onNewMapClick = useCallback(() => {
        navigate(Path.newMap);
    }, [navigate]);

    const goMyPage = useCallback(() => {
        navigate(Path.myPage);
    }, [navigate]);

    const onRecentMapClick = useCallback(
        (map: Map) => {
            navigate(`${Path.myMap}/${map.id}`);
        },
        [navigate]
    );

    const onMoreMapClick = useCallback(
        (type: MapType) => {
            navigate(`${Path.mapList}?type=${type}`);
        },
        [navigate]
    );

    const onClickMap = useCallback(
        (mapId: number) => {
            // if (type === 'my') {
            navigate(`${Path.myMap}/${mapId}`);
            // } else {
            //     navigate(`${Path.myMap}/${map.mapId}`);
            // }
        },
        [navigate]
    );

    return (
        <Container>
            <Main>
                <Top>
                    <Header>
                        <div className='myspot-title'>my spot</div>
                        <img className='mypage-img' src={me?.thumbnail || mypage} onClick={goMyPage} />
                    </Header>

                    <User>{me?.nickname}님 안녕하세요!</User>

                    <RecentMap>
                        <div className='text-bar'>
                            <div className='title'>#최근 본 지도</div>
                            <img src={whitearrow} onClick={() => onMoreMapClick('recent')} />
                        </div>
                        <div className='map-area'>
                            {isRecentLoading && <Loading />}
                            {recentMaps?.map((map, idx) => (
                                <MapChip key={idx} onClick={() => onRecentMapClick(map)}>
                                    {map.mapName}
                                </MapChip>
                            ))}
                        </div>
                    </RecentMap>
                </Top>
                <Maps>
                    <div className='title-area'>
                        <span className='title'>나의 지도</span>
                        <img src={blackarrow} onClick={() => onMoreMapClick('my')} />
                    </div>
                    <div className='map-area'>
                        {isMapLoading && <Loading />}
                        {maps?.map((map, idx) => (
                            <Card key={idx} map={map} onClick={() => onClickMap(map.id)} />
                        ))}
                    </div>
                </Maps>
                <Maps>
                    <div className='title-area'>
                        <span className='title'>즐겨찾는 지도</span>
                        <img src={blackarrow} onClick={() => onMoreMapClick('favorite')} />
                    </div>
                    <div className='map-area'>
                        {isFavoriteLoading && <Loading />}
                        {favoriteMaps?.map((map, idx) => (
                            <Card key={idx} map={map} onClick={() => onClickMap(map.mapId)} />
                        ))}
                    </div>
                </Maps>
                <FloatingWrapper active={false}>
                    <NewBtn onClick={onNewMapClick}>new</NewBtn>
                </FloatingWrapper>
            </Main>
        </Container>
    );
};

export default Home;
