import React, { FC } from 'react';
import { useNavigate } from 'react-router';

import { Container } from './styles';

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
        <Container onClick={onClickItem}>
            <span>{map.title}</span>
            <span>X</span>
        </Container>
    );
};

export default HomeMapItem;
