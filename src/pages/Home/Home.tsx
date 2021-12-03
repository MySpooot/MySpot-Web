import React, { FC, useState, useEffect } from 'react';

import { Container, Header, Main, MapItem, Footer, NewMapButton } from './styles';
import NewMapModal from '@src/components/NewMapModal';

const TempMaps = ['지도1', '지도2', '지도3'];

const Home: FC = () => {
    const [maps, setMaps] = useState<string[]>();
    const [newMapModalOpen, setNewMapModalOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMaps(TempMaps);
        }, 1500);
    }, []);

    const onClickMap = () => {
        console.log('onClickMap');
    };

    const onClickNewMap = () => {
        console.log('onClickNewMap');
        setNewMapModalOpen(open => !open);
    };

    return (
        <Container>
            <Header>MIND MAP</Header>
            <Main>
                {maps?.map((map, idx) => (
                    <MapItem key={idx} onClick={onClickMap}>
                        <span>{map}</span>
                        <span>X</span>
                    </MapItem>
                ))}
            </Main>
            <Footer>
                <NewMapButton onClick={onClickNewMap}>NEW MAP +</NewMapButton>
                <div>Logout</div>
            </Footer>
            <NewMapModal open={newMapModalOpen} setNewMapModalOpen={setNewMapModalOpen} />
        </Container>
    );
};

export default Home;
