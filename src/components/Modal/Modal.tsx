import React, { FC, PropsWithChildren } from 'react';

import { Container, Wrapper } from './styles';

type ModalProps = {
    onClose?: () => void;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({ children }) => {
    return (
        <Container>
            <Wrapper>{children}</Wrapper>
        </Container>
    );
};

export default Modal;
