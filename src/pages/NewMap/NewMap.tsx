import React, { useState, useCallback, ChangeEvent, FC } from 'react';
import { useNavigate } from 'react-router';

import { Container, Title, InputArea, ButtonArea, Desc, Main, ClickPrivate } from './styles';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import { createMap } from 'src/api/map';
import { Path } from 'src/Constants';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

import code from 'src/assets/newmap/private-code.png';
import checkoff from 'src/assets/newmap/check_off.png';
import checkon from 'src/assets/newmap/check_on.png';

const NewMap: FC = () => {
    const [mapName, setMapName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setMapName(event.target.value);
    }, []);

    const onCheckboxChange = useCallback(() => {
        setIsPrivate(!isPrivate);
    }, [setIsPrivate, isPrivate]);

    const onCreateClick = useCallback(async () => {
        setIsLoading(true);
        const res = await createMap({ mapName, isPrivate });
        setIsLoading(false);
        alert('Success!');
        setMapName('');
        navigate(`${Path.myMap}/${res.id}`);
    }, [mapName, isPrivate, navigate]);

    const onCancelClick = () => {
        navigate(Path.home);
    };
    return (
        <Container>
            <HeaderWithLeftArrow onLeftArrowClick={() => navigate(Path.home)} />
            <Main>
                <div>
                    <Title>지도 생성하기</Title>
                    <Desc>
                        지도를 만들고 <br />
                        자유롭게 공유하세요
                    </Desc>
                    <InputArea>
                        <Input
                            placeholder='지도이름을 입력하세요.'
                            style={{ marginBottom: '1.25rem' }}
                            type='text'
                            value={mapName}
                            onChange={onInputChange}
                            onEnterPress={onCreateClick}
                        />
                        <ClickPrivate style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={onCheckboxChange}>
                            <img src={isPrivate ? checkon : checkoff} />
                            <span style={{ marginLeft: '8px' }}>프라이빗 지도</span>
                            <img src={code} />
                        </ClickPrivate>
                    </InputArea>
                </div>
                <ButtonArea>
                    <Button style={{ marginRight: '0.5rem', width: '30%' }} onClick={onCancelClick}>
                        닫기
                    </Button>
                    <Button disabled={isLoading} type='primary' onClick={onCreateClick}>
                        완료
                    </Button>
                </ButtonArea>
            </Main>
        </Container>
    );
};

export default NewMap;
