import React, { FC, useEffect, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router';
// import { useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import { Container, TitleTab, Maps } from './styles';
import { mapType } from './types';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import { getMaps } from 'src/api/map';
import { Path } from '../../Constants';
import Card from 'src/components/MapCard';
import Loading from 'src/components/Loading';

const MapList: FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const type = state as mapType;

    // const { data: favoriteMaps } = useQuery('getFavoriteMap', () => getFavoriteMap());
    // const { data: recentMaps } = useQuery('getRecentMaps', () => getRecentMaps());
    const { data: maps } = useQuery('getMaps', () => getMaps());
    useEffect(() => {
        console.log(type);
        // if (type === 'recent')
    }, [type]);

    return (
        <Container>
            <HeaderWithLeftArrow onLeftArrowClick={() => navigate(Path.home)}></HeaderWithLeftArrow>
            <TitleTab>
                <div className='tab'>나의 지도</div>
                <div className='tab'>즐겨찾는 지도</div>
                <div className='tab'>최근 본 지도</div>
            </TitleTab>
            <Maps>
                <Suspense fallback={<Loading />}>
                    {maps?.map((map, idx) => (
                        <Card key={idx} map={map} />
                    ))}
                </Suspense>
            </Maps>
        </Container>
    );
};

export default MapList;
