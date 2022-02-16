import React, { useState, useCallback, ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

import { Container, Title, InputArea, Input, ButtonArea, Button, Myspot, Desc } from './styles';
import { createMap } from 'src/api/map';

interface NewMapModalProps {
    open: boolean;
    setNewMapModalOpen: Dispatch<SetStateAction<boolean>>;
}

const NewMapModal: FC<NewMapModalProps> = ({ open, setNewMapModalOpen }) => {
    const [mapName, setMapName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setMapName(event.target.value);
    }, []);

    const onCheckboxChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setIsPrivate(event.target.checked);
        },
        [setIsPrivate]
    );

    const onCreateClick = useCallback(async () => {
        await createMap({ mapName, isPrivate });
        alert('Success!');
        setMapName('');
        setNewMapModalOpen(false);
    }, [mapName, isPrivate, setNewMapModalOpen]);

    const onCancelClick = () => {
        setNewMapModalOpen(false);
    };
    return (
        <Container open={open}>
            <Myspot>my spot</Myspot>
            <Title>지도 생성하기</Title>
            <Desc>나만의 지도를 만들고 공유하세요</Desc>
            <InputArea>
                <Input placeholder='지도이름을 입력하세요' type='text' onChange={onInputChange} />
                <div>
                    <input checked={isPrivate} type='checkbox' onChange={onCheckboxChange} />
                    <span>프라이빗 지도</span>
                </div>
            </InputArea>
            <ButtonArea>
                <Button onClick={onCancelClick}>취소</Button>
                <Button onClick={onCreateClick}>생성</Button>
            </ButtonArea>
        </Container>
    );
};

export default NewMapModal;
