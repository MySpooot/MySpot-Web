import React, { useState, useCallback, ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

import { Container, Title, InputArea, Input, ButtonArea, Button } from './styles';
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
        setNewMapModalOpen(false);
    }, [mapName, isPrivate, setNewMapModalOpen]);

    const onCancelClick = () => {
        setNewMapModalOpen(false);
    };
    return (
        <Container open={open}>
            <Title>NEW MAP</Title>
            <InputArea>
                <div>map name</div>
                <Input type='text' onChange={onInputChange} />
                <div>
                    <input checked={isPrivate} type='checkbox' onChange={onCheckboxChange} />
                    <span>isPrivate</span>
                </div>
            </InputArea>
            <ButtonArea>
                <Button onClick={onCancelClick}>CANCEL</Button>
                <Button onClick={onCreateClick}>CREATE</Button>
            </ButtonArea>
        </Container>
    );
};

export default NewMapModal;
