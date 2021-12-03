import React, { Dispatch, FC, SetStateAction } from 'react';

import { Container, Title, InputArea, ButtonArea, Button } from './styles';

interface NewMapModalProps {
    open: boolean;
    setNewMapModalOpen: Dispatch<SetStateAction<boolean>>;
}

const NewMapModal: FC<NewMapModalProps> = ({ open, setNewMapModalOpen }) => {
    const onClickCreate = () => {
        console.log('onClickCreate');
    };

    const onClickCancel = () => {
        setNewMapModalOpen(false);
    };
    return (
        <Container open={open}>
            <Title>NEW MAP</Title>
            <InputArea>
                <div>map name</div>
                <input type='text' />
            </InputArea>
            <ButtonArea>
                <Button onClick={onClickCancel}>CANCEL</Button>
                <Button onClick={onClickCreate}>CREATE</Button>
            </ButtonArea>
        </Container>
    );
};

export default NewMapModal;
