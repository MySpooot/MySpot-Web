import React, { useState, useCallback, ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router';

import { Container, Title, InputArea, Input, ButtonArea, Button, Desc } from './styles';
import { createMap } from 'src/api/map';
import { Path } from 'src/Constants';

import code from 'src/assets/newmap/private-code.png';

const NewMap: FC = () => {
    const [mapName, setMapName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const navigate = useNavigate();

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
    }, [mapName, isPrivate]);

    const onCancelClick = () => {
        navigate(Path.home);
    };
    return (
        <Container>
            <Title>지도 만들기</Title>
            <Desc>나만의 지도를 만들고 공유하세요</Desc>
            <InputArea>
                <Input placeholder='지도이름을 입력해 주세요.' type='text' value={mapName} onChange={onInputChange} />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input checked={isPrivate} type='checkbox' onChange={onCheckboxChange} />
                    <span style={{ marginLeft: '8px' }}>프라이빗 지도</span>
                    <img src={code} style={{ width: '22px', height: '22px' }} />
                </div>
            </InputArea>
            <ButtonArea>
                <Button onClick={onCancelClick}>취소</Button>
                <Button onClick={onCreateClick}>완료</Button>
            </ButtonArea>
        </Container>
    );
};

export default NewMap;
