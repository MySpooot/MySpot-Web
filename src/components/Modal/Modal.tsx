import React, { FC } from 'react';

import { Container, Wrapper } from './styles';

type ModalProps = {
    onClose?: () => void;
    open?: boolean;
};

const Modal: FC<ModalProps> = ({ children, open }) => {
    return (
        <Container open={open}>
            <Wrapper>{children}</Wrapper>
        </Container>
    );
};

export default Modal;
