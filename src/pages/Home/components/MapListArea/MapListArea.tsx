import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, TitleArea, MapArea, MoreButton } from './styles';
import { Path } from 'src/Constants';
import MapCard from 'src/components/MapCard';

import greyarrow from 'src/assets/main/ic_arrow_next.png';

type MapListArea = {
    title: string;
    type: 'my' | 'favorite' | 'recent';
    onMoreClick: () => void;
    mapList: { id: number; mapName: string; isPrivate: boolean; created: number; mapId: number }[];
};

const MapListArea: FC<MapListArea> = ({ title, type, onMoreClick, mapList }) => {
    const navigate = useNavigate();

    return (
        <Container>
            <TitleArea>
                <span className='title'>{title}</span>
                <div className='see-more' onClick={onMoreClick}>
                    <span>더 보기</span>
                    <MoreButton src={greyarrow} />
                </div>
            </TitleArea>
            <MapArea>
                {mapList.map((map, idx) => (
                    <MapCard key={idx} map={map} type={type} onClick={() => navigate(`${Path.myMap}/${map.mapId}`)} />
                ))}
            </MapArea>
        </Container>
    );
};

export default MapListArea;
