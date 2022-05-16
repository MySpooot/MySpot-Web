import React, { FC, useState, useCallback } from 'react';

import { Container, CloseHeader, Title, BtnArea, NowNickname } from './styles';
import { updateUserNicknameMypage } from 'src/api/auth';
import { useMeState } from 'src/atoms';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

import close from 'src/assets/mymap/ic_close.svg';

interface NicknameProps {
    setClose: () => void;
}
const NicknameModal: FC<NicknameProps> = ({ setClose }) => {
    const { me, setMe } = useMeState();
    const [inputValue, setInputValue] = useState('');

    const saveNickname = useCallback(
        async (value: string) => {
            const me = await updateUserNicknameMypage({ nickname: value });

            alert('닉네임이 변경되었습니다.');
            setMe(me);
            setClose();
        },
        [setClose, setMe]
    );

    return (
        <Modal>
            <Container>
                <CloseHeader>
                    <img src={close} style={{ cursor: 'pointer' }} onClick={setClose}></img>
                </CloseHeader>
                <Title>닉네임을 변경하시겠어요?</Title>
                <NowNickname>
                    현재 사용하고 있는 닉네임 : <div className='nickname'>{me?.nickname}</div>
                </NowNickname>
                <Input
                    maxLength={30}
                    placeholder='변경할 닉네임 입력'
                    style={{ margin: '1.25rem' }}
                    value={inputValue}
                    autoFocus
                    onChange={event => setInputValue(event.target.value)}
                />
                <BtnArea>
                    <Button className='full-half' type='primary' popup onClick={() => saveNickname(inputValue)}>
                        저장하기
                    </Button>
                </BtnArea>
            </Container>
        </Modal>
    );
};

export default NicknameModal;
