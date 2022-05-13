import React, { FC, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';

import { Container, TitleTab, Tab, Maps } from 'src/pages/MapList/styles';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import { getMaps, getRecentMaps, getFavoriteMap } from 'src/api/map';
import { Path } from 'src/Constants';
import Card from 'src/components/MapCard';
import useQueryString from 'src/hooks/useQueryString';
import { Map } from './types';
import Loading from 'src/components/Loading';

const MapList: FC = () => {
    const navigate = useNavigate();
    const { type } = useQueryString<{ type: 'my' | 'favorite' | 'recent' }>();
    useEffect(() => {
        if (type !== 'my' && type !== 'favorite' && type !== 'recent') navigate(`${Path.mapList}?type=my`);
    }, []);

    const { data: maps } = useQuery('getMaps', () => getMaps(), {
        enabled: type === 'my'
    });
    const { data: favoriteMaps } = useQuery('getFavoriteMap', () => getFavoriteMap(), {
        enabled: type === 'favorite'
    });
    const { data: recentMaps } = useQuery('getRecentMaps', () => getRecentMaps(), {
        enabled: type === 'recent'
    });

    const fetchMaps = useMemo(() => {
        switch (type) {
            case 'my':
                return maps;
            case 'favorite':
                return favoriteMaps;
            case 'recent':
                return recentMaps;
            default:
                return maps;
        }
    }, [maps, favoriteMaps, recentMaps, type]);

    const onClickMap = useCallback(
        (map: Map) => {
            if (type === 'my') {
                navigate(`${Path.myMap}/${map.id}`);
            } else {
                navigate(`${Path.myMap}/${map.mapId}`);
            }
        },
        [navigate, type]
    );

    return (
        <Container>
            <HeaderWithLeftArrow onLeftArrowClick={() => navigate(Path.home)}></HeaderWithLeftArrow>
            <TitleTab>
                <Tab active={type === 'my'} onClick={() => navigate(`${Path.mapList}?type=my`)}>
                    나의 지도
                </Tab>
                <Tab active={type === 'favorite'} onClick={() => navigate(`${Path.mapList}?type=favorite`)}>
                    즐겨찾는 지도
                </Tab>
                <Tab active={type === 'recent'} onClick={() => navigate(`${Path.mapList}?type=recent`)}>
                    최근 본 지도
                </Tab>
            </TitleTab>
            <Maps>
                {!fetchMaps && <Loading />}
                {fetchMaps?.map((map, idx) => (
                    <Card key={idx} map={map} type={type} onClick={() => onClickMap(map)} />
                ))}
            </Maps>
        </Container>
    );
};

export default MapList;
