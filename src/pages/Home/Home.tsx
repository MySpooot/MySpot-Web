import React, { FC, useState, useEffect } from 'react';

import { Container, Header, Main, Footer, NewMapButton } from './styles';
import HomeMapItem from '@src/components/HomeMapItem';
import NewMapModal from '@src/components/NewMapModal';
import Loading from '@src/components/Loading';

const TempMaps = [
    { id: 1, title: '지도1' },
    { id: 2, title: '지도2' },
    { id: 3, title: '지도3' }
];

const Home: FC = () => {
    const [maps, setMaps] = useState<{ id: number; title: string }[]>();
    const [newMapModalOpen, setNewMapModalOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMaps(TempMaps);
        }, 500);
    }, []);

    const onClickNewMap = () => {
        console.log('onClickNewMap');
        setNewMapModalOpen(open => !open);
    };

    return (
        <Container>
            <Header>MIND MAP</Header>
            <Main>
                {!maps && <Loading />}
                {maps?.map((map, idx) => (
                    <HomeMapItem key={idx} map={map} />
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
