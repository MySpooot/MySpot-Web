import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMutation } from 'react-query';

import { Container, Title, Input } from './styles';
import { checkPrivateCode } from 'src/api/map';
import { useMapAccessible } from 'src/atoms';
import Modal from 'src/components/Modal';
import Button from 'src/components/Button';

const PrivateCodeModal: FC = () => {
    const { mapId } = useParams<{ mapId: string }>();
    const [inputValue, setInputValue] = useState('');

    const { setMapAccessible } = useMapAccessible();

    const { mutate: fetchCheckPrivateCode } = useMutation(() => checkPrivateCode({ mapId: Number(mapId) }, { code: inputValue }), {
        onSuccess: accessible => {
            if (!accessible) {
                alert('잘못된 입력입니다.');
            }

            setMapAccessible(accessible);
        }
    });

    return (
        <Modal>
            <Container>
                <Title>접근이 제한되어 있는 지도</Title>
                <Input
                    maxLength={4}
                    placeholder='보안코드를 입력해주세요.'
                    value={inputValue}
                    autoFocus
                    onChange={event => setInputValue(event.target.value)}
                />
                <Button disabled={inputValue.length < 4} type='primary' onClick={() => fetchCheckPrivateCode()}>
                    입력완료
                </Button>
            </Container>
        </Modal>
    );
};

export default PrivateCodeModal;
