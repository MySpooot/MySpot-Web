import React, { FC, useState, useCallback } from 'react';

import { updateUserNicknameMypage } from 'src/api/auth';
import { getMeHelper } from 'src/query';
import { Container, Title, BtnArea } from './styles';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

interface NicknameProps {
    setClose: () => void;
}
const NicknameModal: FC<NicknameProps> = ({ setClose }) => {
    const [inputValue, setInputValue] = useState('');

    const saveNickname = useCallback(
        async (value: string) => {
            const me = await updateUserNicknameMypage({ nickname: value });

            getMeHelper.setQueryData(me);
            setClose();
        },
        [setClose]
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
                    <Button className='btn-half' onClick={setClose}>
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
