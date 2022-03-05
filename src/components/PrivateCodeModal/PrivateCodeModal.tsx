import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import { useMutation } from 'react-query';

import { Container, Input, Button } from './styles';
import { checkPrivateCode } from 'src/api/map';
import { useMapAccessible } from 'src/atoms';
import Modal from 'src/components/Modal';

const PrivateCodeModal: FC = () => {
    const { mapId } = useParams<{ mapId: string }>();
    const [inputValue, setInputValue] = useState('');

    const { setMapAccessible } = useMapAccessible();

    const { mutate: fetchCheckPrivateCode } = useMutation(() => checkPrivateCode({ mapId: Number(mapId) }, { code: inputValue }), {
        onSuccess: response => {
            if (!response) {
                alert('잘못된 코드입니다.');
            }

            setMapAccessible(response);
        }
    });

    return (
        <Modal>
            <Container>
                <div>초대코드를 입력하세요.</div>
                <Input value={inputValue} onChange={event => setInputValue(event.target.value)} />
                <Button disabled={inputValue.length < 4} onClick={() => fetchCheckPrivateCode()}>
                    확인
                </Button>
            </Container>
        </Modal>
    );
};

export default PrivateCodeModal;
