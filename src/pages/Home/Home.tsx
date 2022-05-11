import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useQuery, useQueryClient } from 'react-query';

import { Main, Top, User, Container, Header, Maps, NewBtn, RecentMap, MapArea, MapChip, EmptySpace, MapSpace, ContentSpace } from './styles';
import { Map, MapType } from './types';
import { Path } from 'src/Constants';
import { getMaps, getFavoriteMap, getRecentMaps } from 'src/api';
import { useMeState } from 'src/atoms';
import Card from 'src/components/MapCard';
import Loading from 'src/components/Loading';

import mypage from 'src/assets/main/ic_mypage.png';
import userImg from 'src/assets/main/img_my@3x.png';
import skyarrow from 'src/assets/main/ic_arrow_sky.png';
import greyarrow from 'src/assets/main/ic_arrow_next.png';
import empty from 'src/assets/main/img_empty.png';
import newbtn from 'src/assets/main/btn_newmap.png';

const Home: FC = () => {
    const navigate = useNavigate();

    const { me } = useMeState();

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
            navigate(`${Path.myMap}/${map.mapId}`);
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
            navigate(`${Path.myMap}/${mapId}`);
        },
        [navigate]
    );

    return (
        <Container>
            <Main>
                <Top>
                    <Header>
                        <div className='myspot-title'>my spot</div>
                        <img className='mypage-img' src={mypage} onClick={goMyPage} />
                    </Header>

                    <User>
                        <img className='user-img' src={me?.thumbnail || userImg} />
                        {me?.nickname}님 안녕하세요!
                    </User>

                    <RecentMap>
                        <div className='section-title'>
                            <div className='title'>최근 본 지도</div>
                            <div className='more-map' onClick={() => onMoreMapClick('recent')}>
                                <span>더 보기</span>
                                <img src={skyarrow} />
                            </div>
                        </div>
                        <MapArea>
                            {!recentMaps && !isRecentLoading && <div className='no-recent-map'>최근 본 지도가 없습니다.</div>}
                            {isRecentLoading && <Loading />}
                            {recentMaps?.map((map, idx) => (
                                <MapChip key={idx} onClick={() => onRecentMapClick(map)}>
                                    {map.mapName}
                                </MapChip>
                            ))}
                        </MapArea>
                    </RecentMap>
                </Top>
                {isFavoriteLoading && isMapLoading && <Loading />}
                {maps?.length === 0 && favoriteMaps?.length === 0 ? (
                    <EmptySpace>
                        <div className='content'>
                            <img src={empty} />
                            <div>
                                나만의 지도를 만들어 <br></br>장소를 저장하고, 공유해 보세요.
                            </div>
                        </div>
                    </EmptySpace>
                ) : (
                    <MapSpace>
                        {maps && maps.length !== 0 && (
                            <Maps>
                                <div className='title-area'>
                                    <span className='title'>내가 만든 map</span>
                                    <div className='see-more' onClick={() => onMoreMapClick('my')}>
                                        <span>더 보기</span>
                                        <img src={greyarrow} />
                                    </div>
                                </div>
                                <div className='map-area'>
                                    {maps?.map((map, idx) => (
                                        <Card key={idx} map={map} type='my' onClick={() => onClickMap(map.id)} />
                                    ))}
                                </div>
                            </Maps>
                        )}
                        {favoriteMaps && favoriteMaps?.length !== 0 && (
                            <Maps>
                                <div className='title-area'>
                                    <span className='title'>즐겨찾는 map</span>
                                    <div className='see-more' onClick={() => onMoreMapClick('favorite')}>
                                        <span>더 보기</span>
                                        <img src={greyarrow} />
                                    </div>
                                </div>
                                <div className='map-area'>
                                    {favoriteMaps?.map((map, idx) => (
                                        <Card key={idx} map={map} type='favorite' onClick={() => onClickMap(map.mapId)} />
                                    ))}
                                </div>
                            </Maps>
                        )}
                    </MapSpace>
                )}
                <NewBtn onClick={onNewMapClick}>
                    <img src={newbtn} />
                </NewBtn>
            </Main>
        </Container>
    );
};

export default Home;
