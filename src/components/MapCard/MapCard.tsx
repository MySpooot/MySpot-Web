import React, { FC } from 'react';
import { useNavigate } from 'react-router';

import { Card } from './styles';

interface MapCardProps {
    map: { id: number; mapName: string; isPrivate: boolean };
}

const MapCard: FC<MapCardProps> = ({ map }) => {
    const navigate = useNavigate();

    const onClickItem = () => {
        console.log('onClickMapItem');
        navigate(`/mymap/${map.id}`);
    };

    return (
        <Card onClick={onClickItem}>
            <span>{map.mapName}</span>
        </Card>
    );
};

export default MapCard;
