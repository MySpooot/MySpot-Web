import React, { FC, useCallback } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router';

import { MapListArea, NoMapArea } from './components';
import {
    Main,
    Top,
    MyPageIcon,
    User,
    Container,
    Header,
    UserThumbnail,
    MoreRecentMapIcon,
    NewButton,
    RecentMap,
    MapArea,
    MapChip,
    MapSpace
} from './styles';
import { Map, MapType } from './types';
import { Path } from 'src/Constants';
import { getMaps, getFavoriteMap, getRecentMaps } from 'src/api';
import { useMeState } from 'src/atoms';
import Loading from 'src/components/Loading';

import newbtn from 'src/assets/main/btn_newmap.png';
import skyarrow from 'src/assets/main/ic_arrow_sky.png';
import mypage from 'src/assets/main/ic_mypage.png';
import userImg from 'src/assets/main/img_my@3x.png';
import logo from 'src/assets/main/logo_top.png';

const Home: FC = () => {
    const navigate = useNavigate();

    const { me } = useMeState();

    const { data: myMaps } = useQuery(['getMaps'], () => getMaps().then(response => response.map(data => ({ ...data, mapId: data.id }))));
    const { data: favoriteMaps } = useQuery(['getFavoriteMap'], () => getFavoriteMap());
    const { data: recentMaps } = useQuery(['getRecentMaps'], () => getRecentMaps());

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

    return (
        <Container>
            <Main>
                <Top>
                    <Header>
                        <img className='myspot-logo' src={logo} />
                        <MyPageIcon src={mypage} onClick={goMyPage} />
                    </Header>

                    <User>
                        <UserThumbnail src={me?.thumbnail || userImg} />
                        {me?.nickname}님 안녕하세요!
                    </User>

                    <RecentMap>
                        <div className='section-title'>
                            <div className='title'>최근 본 지도</div>
                            <div className='more-map' onClick={() => onMoreMapClick('recent')}>
                                <span>더 보기</span>
                                <MoreRecentMapIcon src={skyarrow} />
                            </div>
                        </div>
                        <MapArea>
                            {!recentMaps ? (
                                <Loading />
                            ) : recentMaps.length === 0 ? (
                                <div className='no-recent-map'>최근 본 지도가 없습니다.</div>
                            ) : (
                                recentMaps.map((map, idx) => (
                                    <MapChip key={idx} onClick={() => onRecentMapClick(map)}>
                                        {map.mapName}
                                    </MapChip>
                                ))
                            )}
                        </MapArea>
                    </RecentMap>
                </Top>
                {!myMaps || !favoriteMaps ? (
                    <Loading />
                ) : (
                    <>
                        {myMaps.length === 0 && favoriteMaps.length === 0 ? (
                            <NoMapArea />
                        ) : (
                            <MapSpace>
                                {myMaps && myMaps.length !== 0 && (
                                    <MapListArea mapList={myMaps} title='내가 만든 map' type='my' onMoreClick={() => onMoreMapClick('my')} />
                                )}
                                {favoriteMaps && favoriteMaps?.length !== 0 && (
                                    <MapListArea
                                        mapList={favoriteMaps}
                                        title='즐겨찾는 map'
                                        type='favorite'
                                        onMoreClick={() => onMoreMapClick('favorite')}
                                    />
                                )}
                            </MapSpace>
                        )}
                    </>
                )}

                <NewButton src={newbtn} onClick={onNewMapClick} />
            </Main>
        </Container>
    );
};

export default Home;
