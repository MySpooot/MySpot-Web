import React, { FC, useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router';

// import { Footer } from './styles';
import { meState } from 'src/atoms';
import Card from 'src/components/HomeMapItem';
import NewMapModal from 'src/components/NewMapModal';
import Loading from 'src/components/Loading';
import { Main, WelcomeSection, User, Container, Header, Maps, Footer, NewBtn } from './styles';

const TempMaps = [
    { id: 1, title: '지도1' },
    { id: 2, title: '지도2' },
    { id: 3, title: '지도3' }
];

const Home: FC = () => {
    const me = useRecoilValue(meState);

    const [maps, setMaps] = useState<{ id: number; title: string }[]>();
    const [newMapModalOpen, setNewMapModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setMaps(TempMaps);
        }, 500);
    }, []);

    const onNewMapClick = useCallback(() => {
        console.log('onNewMapClick');
        setNewMapModalOpen(open => !open);
    }, []);

    const goMyPage = useCallback(() => {
        navigate('/mypage');
    }, [navigate]);

    return (
        <Container>
            <Header>
                <img className='myspot-logo' src='img/logoMyspot.png'></img>
            </Header>
            <Main>
                <WelcomeSection>
                    <User>
                        <b>{me?.nickname}님 </b>
                        <span>안녕하세요!</span>
                    </User>
                    <img className='mypage-img' src='img/user.png' onClick={goMyPage} />
                </WelcomeSection>
                <div className='desc'>오늘도 멋진 나만의 지도를 완성해보세요 :)</div>
                <Maps>
                    <div className='title-area'>
                        <span className='title'>내 지도</span>
                        <img src='img/icArrowRight.png' width='20' />
                    </div>
                    <div className='map-area'>
                        {!maps && <Loading />}
                        {maps?.map((map, idx) => (
                            <Card key={idx} map={map}></Card>
                        ))}
                    </div>
                    <div className='title-area'>
                        <span className='title'>즐겨찾기</span>
                        <img src='img/icArrowRight.png' width='20' />
                    </div>
                    <div className='map-area'>
                        {!maps && <Loading />}
                        {maps?.map((map, idx) => (
                            <Card key={idx} map={map}></Card>
                        ))}
                    </div>
                    <div className='title-area'>
                        <span className='title'>최근 본 지도</span>
                        <img src='img/icArrowRight.png' width='20' />
                    </div>
                    <div className='map-area'>
                        {!maps && <Loading />}
                        {maps?.map((map, idx) => (
                            <Card key={idx} map={map}></Card>
                        ))}
                    </div>
                </Maps>
                <Footer>
                    <NewBtn onClick={onNewMapClick}>NEW MAP +</NewBtn>
                </Footer>
            </Main>
            <NewMapModal open={newMapModalOpen} setNewMapModalOpen={setNewMapModalOpen} />
        </Container>
    );
};

export default Home;
