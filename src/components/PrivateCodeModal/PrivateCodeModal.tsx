import React, { FC } from 'react';
import Modal from 'src/components/Modal';

import { Container, Input, Button } from './styles';

const PrivateCodeModal: FC = () => {
    return (
        <Modal>
            <Container>
                <div>초대코드를 입력하세요.</div>
                <Input />
                <Button>확인</Button>
            </Container>
        </Modal>
    );
};

export default PrivateCodeModal;
