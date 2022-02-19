import React, { FC, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { parse } from 'query-string';
import { useQuery } from 'react-query';

import { Container, TitleTab, Tab, Maps } from 'src/pages/MapList/styles';
// import { Map } from 'src/pages/MapList/types';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import { getMaps, getRecentMaps, getFavoriteMap } from 'src/api/map';
import { Path } from 'src/Constants';
import Card from 'src/components/MapCard';

const MapList: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = parse(location.search);

    const { data: maps, refetch: refetchMaps } = useQuery('getMaps', () => getMaps(), {
        enabled: query.type === 'my'
    });
    const { data: favoriteMaps, refetch: refetchFavoriteMaps } = useQuery('getFavoriteMap', () => getFavoriteMap(), {
        enabled: query.type === 'favorite'
    });
    const { data: recentMaps, refetch: refetchRecentMaps } = useQuery('getRecentMaps', () => getRecentMaps(), {
        enabled: query.type === 'recent'
    });

    const fetchMaps = useMemo(() => {
        switch (query.type) {
            case 'my':
                return maps;
            case 'favorite':
                return favoriteMaps;
            case 'recent':
                return recentMaps;
        }
        // return maps || favoriteMaps || recentMaps;
    }, [maps, favoriteMaps, recentMaps, query.type]);

    const fetchData = () => {
        switch (query.type) {
            case 'my':
                refetchMaps();
                return;
            case 'favorite':
                refetchFavoriteMaps();
                return;
            case 'recent':
                refetchRecentMaps();
                return;
        }
    };

    return (
        <Container>
            <HeaderWithLeftArrow onLeftArrowClick={() => navigate(Path.home)}></HeaderWithLeftArrow>
            <TitleTab>
                <Tab active={query.type === 'my'} onClick={() => navigate(`${Path.mapList}?type=my`)}>
                    나의 지도
                </Tab>
                <Tab active={query.type === 'favorite'} onClick={() => navigate(`${Path.mapList}?type=favorite`)}>
                    즐겨찾는 지도
                </Tab>
                <Tab active={query.type === 'recent'} onClick={() => navigate(`${Path.mapList}?type=recent`)}>
                    최근 본 지도
                </Tab>
            </TitleTab>
            <Maps>
                {fetchMaps?.map((map, idx) => (
                    <Card key={idx} map={map} refetch={() => fetchData()} />
                ))}
            </Maps>
        </Container>
    );
};

export default MapList;
