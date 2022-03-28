import React, { FC, useState, useCallback } from 'react';
import { useUpdateState } from 'src/atoms/me';
import { updateUserNickname } from 'src/api/auth';
import { getMeHelper } from 'src/query';

import { Container, Title, BtnArea } from './styles';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

const NicknameModal: FC = id => {
    const [inputValue, setInputValue] = useState('');
    const { update, setUpdate } = useUpdateState();

    const saveNickname = useCallback(
        async value => {
            const nickname = await updateUserNickname(id.children, value);

            getMeHelper.setQueryData(nickname);
            setUpdate(false);
        },
        [setUpdate, id.children]
    );

    return (
        <div>
            {update && (
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
                            <Button className='btn-half' onClick={() => setUpdate(false)}>
                                닫기
                            </Button>
                            <Button className='btn-half' type='primary' onClick={() => saveNickname(inputValue)}>
                                저장하기
                            </Button>
                        </BtnArea>
                    </Container>
                </Modal>
            )}
        </div>
    );
};

export default NicknameModal;
