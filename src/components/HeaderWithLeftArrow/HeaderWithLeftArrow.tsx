import React, { CSSProperties, FC } from 'react';

import { Container } from './styles';
import Icon from 'src/components/Icon';

import icArrowLeft from 'src/assets/mymap/ic_arrow_left.svg';

type HeaderWithLeftArrowProps = {
    onLeftArrowClick: () => void;
    style?: CSSProperties;
};

const HeaderWithLeftArrow: FC<HeaderWithLeftArrowProps> = ({ children, style, onLeftArrowClick }) => (
    <Container style={style}>
        <Icon alt='arrowLeft' src={icArrowLeft} style={{ cursor: 'pointer', width: '2.125rem', height: '2.125rem' }} onClick={onLeftArrowClick} />
        {children}
    </Container>
);

export default HeaderWithLeftArrow;
