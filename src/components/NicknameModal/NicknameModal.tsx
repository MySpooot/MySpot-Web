import React, { FC, useState, useCallback } from 'react';
import { updateUserNicknameMypage } from 'src/api/auth';
import { getMeHelper } from 'src/query';

import { Container, Title, BtnArea } from './styles';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

interface NicknameProps {
    id: number | undefined;
    setOpen: () => void;
}
const NicknameModal: FC<NicknameProps> = ({ id, setOpen }) => {
    const [inputValue, setInputValue] = useState('');

    const saveNickname = useCallback(
        async value => {
            const me = await updateUserNicknameMypage(id, value);

            getMeHelper.setQueryData(me);
            setOpen();
        },
        [id, setOpen]
    );

    return (
        <Modal>
            <Container>
                <Title>닉네임</Title>
                <Input
                    maxLength={30}
                    style={{ margin: '1.25rem' }}
                    value={inputValue}
                    autoFocus
                    onChange={event => setInputValue(event.target.value)}
                />
                <BtnArea>
                    <Button className='btn-half' onClick={() => setOpen()}>
                        닫기
                    </Button>
                    <Button className='btn-half' type='primary' onClick={() => saveNickname(inputValue)}>
                        저장하기
                    </Button>
                </BtnArea>
            </Container>
        </Modal>
    );
};

export default NicknameModal;
