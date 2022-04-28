import React, { FC } from 'react';

import { Container, ButtonText, ListIcon } from './styles';

import icList from 'src/assets/mymap/ic_list.svg';

type PlaceListButtonProps = {
    up: boolean;
    onClick: () => void;
};

const PlaceListButton: FC<PlaceListButtonProps> = ({ up, onClick }) => (
    <Container up={up} onClick={onClick}>
        <ListIcon src={icList} />
        <ButtonText>장소목록</ButtonText>
    </Container>
);

export default PlaceListButton;
