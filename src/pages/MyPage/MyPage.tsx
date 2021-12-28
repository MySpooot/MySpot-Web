import React, { FC, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { HiHome as Home, HiPencil } from 'react-icons/hi';

import { Container, Header, UserInfo, LogoutBtn, UserImg, UserNickname, UserTab, Tab } from './styles';

const user = [{ id: 1, nickname: '배하은', thumbnail: 'http://k.kakaocdn.net/dn/bbjv2A/btrhfyU2P02/KxZzzoJLsJDSwdd4ICJqY1/img_110x110.jpg' }];

const MyPage: FC = () => {
    const navigate = useNavigate();
    const [activeIndex, setActiveIndex] = useState(0);

    const tabClickHandler = useCallback((index: number) => {
        setActiveIndex(index);
    }, []);

    const onClickHome = useCallback(() => {
        navigate('/home');
    }, [navigate]);

    useEffect(() => {
        console.log('useEffect');
    }, []);

    return (
        <Container>
            <Header>
                <Home onClick={onClickHome}></Home>
            </Header>
            <UserInfo>
                <UserImg></UserImg>
                <LogoutBtn>로그아웃</LogoutBtn>
                <UserNickname>
                    닉네임
                    <div className='nickname-update'>
                        {user[0].nickname}
                        <HiPencil></HiPencil>
                    </div>
                </UserNickname>
            </UserInfo>
            <UserTab>
                <div className='tabs'>
                    <h2 onClick={() => tabClickHandler(0)}>사진</h2>
                    <h2 onClick={() => tabClickHandler(1)}>저장</h2>
                </div>
                <Tab active={activeIndex === 0}>
                    <div className='boxed'> 사진 영역 </div>
                </Tab>

                <Tab active={activeIndex === 1}>
                    <div className='boxed'> 저장 장소 </div>
                </Tab>
            </UserTab>
        </Container>
    );
};

export default MyPage;
