import React from 'react';

import { Container, ChulsuIcon, EmptyText } from './styles';

import empty from 'src/assets/main/img_empty.png';

const NoMapArea = () => (
    <Container>
        <ChulsuIcon src={empty} />
        <EmptyText>
            나만의 지도를 만들어 <br />
            장소를 저장하고, 공유해 보세요.
        </EmptyText>
    </Container>
);

export default NoMapArea;
