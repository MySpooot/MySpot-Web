import React, { FC } from 'react';
import { useNavigate } from 'react-router';

import { Card } from './styles';

interface HomeMapItemProps {
    map: { id: number; title: string };
}

const HomeMapItem: FC<HomeMapItemProps> = ({ map }) => {
    const navigate = useNavigate();

    const onClickItem = () => {
        console.log('onClickMapItem');
        navigate(`/mymap/${map.id}`);
    };

    return (
        <Card onClick={onClickItem}>
            <span>{map.title}</span>
        </Card>
    );
};

export default HomeMapItem;
