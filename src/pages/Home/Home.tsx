import React, { FC, useState, useEffect, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router';

import { Footer } from './styles';
import { meState } from 'src/atoms';
import Card from 'src/components/HomeMapItem';
import NewMapModal from 'src/components/NewMapModal';
import Loading from 'src/components/Loading';
import { Main, WelcomeSection, User, HContainer, HHeader, Maps, Desc, NewBtn } from './mainstyles';

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
        <HContainer>
            <HHeader>
                <img src='img/logoMyspot.png' style={{ paddingTop: '25px' }} width='124px'></img>
            </HHeader>
            <Main>
                <WelcomeSection>
                    <User>
                        <b style={{ fontWeight: '700' }}>{me?.nickname}님 </b>
                        <span style={{ fontWeight: '200' }}>안녕하세요!</span>
                    </User>
                    <img height='60' src='img/user.png' style={{ borderRadius: '50%' }} width='60' onClick={goMyPage} />
                </WelcomeSection>
                <Desc>오늘도 멋진 나만의 지도를 완성해보세요 :)</Desc>
                <Maps>
                    <div className='title-area'>
                        <span style={{ fontSize: '16px', paddingRight: '10px', paddingTop: '5px' }}>내 지도</span>
                        <img src='img/icArrowRight.png' width='20' />
                    </div>
                    <div style={{ display: 'flex', paddingTop: '10px' }}>
                        {!maps && <Loading />}
                        {maps?.map((map, idx) => (
                            <Card key={idx} map={map}></Card>
                        ))}
                    </div>
                    <div className='title-area'>
                        <span style={{ fontSize: '16px', paddingRight: '10px', paddingTop: '5px' }}>즐겨찾기</span>
                        <img src='img/icArrowRight.png' width='20' />
                    </div>
                    <div style={{ display: 'flex', paddingTop: '10px' }}>
                        {!maps && <Loading />}
                        {maps?.map((map, idx) => (
                            <Card key={idx} map={map}></Card>
                        ))}
                    </div>
                    <div className='title-area'>
                        <span style={{ fontSize: '16px', paddingRight: '10px', paddingTop: '5px' }}>최근 본 지도</span>
                        <img src='img/icArrowRight.png' width='20' />
                    </div>
                    <div style={{ display: 'flex', paddingTop: '10px' }}>
                        {!maps && <Loading />}
                        {maps?.map((map, idx) => (
                            <Card key={idx} map={map}></Card>
                        ))}
                    </div>
                </Maps>
            </Main>
            <Footer>
                <NewBtn onClick={onNewMapClick}>NEW MAP +</NewBtn>
            </Footer>
            <NewMapModal open={newMapModalOpen} setNewMapModalOpen={setNewMapModalOpen} />
        </HContainer>
    );
};

export default Home;
