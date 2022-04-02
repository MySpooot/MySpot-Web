import React, { FC } from 'react';

import { Container, Wrapper } from './styles';

type ModalProps = {
    onClose?: () => void;
};

const Modal: FC<ModalProps> = ({ children }) => {
    return (
        <Container>
            <Wrapper>{children}</Wrapper>
        </Container>
    );
};

export default Modal;
