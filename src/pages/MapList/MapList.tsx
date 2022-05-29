import React, { FC, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';

import { Container, TitleTab, Tab, Maps } from 'src/pages/MapList/styles';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import { getMaps, getRecentMaps, getFavoriteMap } from 'src/api/map';
import { Path } from 'src/Constants';
import MapCard from 'src/components/MapCard';
import useQueryString from 'src/hooks/useQueryString';
import Loading from 'src/components/Loading';

const MapList: FC = () => {
    const navigate = useNavigate();
    const { type = 'my' } = useQueryString<{ type: 'my' | 'favorite' | 'recent' }>();

    const { data: maps } = useQuery(
        ['getMaps'],
        () => getMaps({ limit: 100, offset: 0 }).then(response => response.map(data => ({ ...data, mapId: data.id }))),
        {
            enabled: type === 'my'
        }
    );
    const { data: favoriteMaps } = useQuery(['getFavoriteMap'], () => getFavoriteMap({ limit: 100, offset: 0 }), {
        enabled: type === 'favorite'
    });
    const { data: recentMaps } = useQuery(['getRecentMaps'], () => getRecentMaps({ limit: 100, offset: 0 }), {
        enabled: type === 'recent'
    });

    const fetchMaps = useMemo(() => {
        switch (type) {
            case 'favorite':
                return favoriteMaps;
            case 'recent':
                return recentMaps;
            default:
                return maps;
        }
    }, [maps, favoriteMaps, recentMaps, type]);

    const onMapCardClick = useCallback(
        (mapId: number) => {
            navigate(`${Path.myMap}/${mapId}`);
        },
        [navigate]
    );

    return (
        <Container>
            <HeaderWithLeftArrow onLeftArrowClick={() => navigate(Path.home)} />
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
                {!fetchMaps ? (
                    <Loading />
                ) : (
                    fetchMaps.map((map, idx) => <MapCard key={idx} map={map} type={type} onClick={() => onMapCardClick(map.mapId)} />)
                )}
            </Maps>
        </Container>
    );
};

export default MapList;
