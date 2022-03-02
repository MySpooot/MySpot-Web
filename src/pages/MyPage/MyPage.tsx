import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { useMutation, useQuery } from 'react-query';

import { Container, UpdateBtn, UserInfo, LogoutBtn, User, Locations, LocationCard } from './styles';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import { Path } from 'src/Constants';
import { meState } from 'src/atoms';
import { getMyLocation, deleteMyLocation } from 'src/api/marker';
import { usePlaceDetail } from 'src/pages/MyMap/Map/atoms';
import KakaoPlaceIframe from 'src/components/KakaoPlaceIframe';
import { queryClient } from 'src/index';

import mypage from 'src/assets/mypage/user-img.png';

const MyPage: FC = () => {
    const [me, setMe] = useRecoilState(meState);
    const navigate = useNavigate();
    const { placeDetail, setPlaceDetail } = usePlaceDetail();

    const { data: locations } = useQuery('getLocations', () => getMyLocation());
    const { mutate: deleteLocation } = useMutation(deleteMyLocation, {
        onMutate: () => {
            queryClient.setQueryData<any>(['getLocations'], prev => {
                console.log(prev);
            });
        }
    });

    const onClickLocation = useCallback(
        (addressId: number) => {
            setPlaceDetail({ placeId: addressId });
        },
        [setPlaceDetail]
    );

    const onClickHome = useCallback(() => {
        navigate(Path.home);
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        setMe({
            id: 0,
            nickname: '',
            thumbnail: ''
        });
        navigate(Path.login);
    };

    return (
        <Container>
            <HeaderWithLeftArrow onLeftArrowClick={() => onClickHome()}>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                    <h3 className='title'>마이페이지</h3>
                </div>
            </HeaderWithLeftArrow>
            <UserInfo>
                <User>
                    <img className='mypage-img' src={me?.thumbnail ? me?.thumbnail : mypage} />
                    <div className='user-txt'>{me?.nickname}</div>
                    <UpdateBtn>수정</UpdateBtn>
                </User>

                <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
            </UserInfo>
            <div style={{ marginLeft: '1rem', marginBottom: '0.75rem' }}>
                <h2>저장한 장소</h2>
            </div>
            <Locations>
                {locations?.map(({ id, name, address, roadAddress, addressId }) => (
                    <LocationCard key={id}>
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                            onClick={() => {
                                onClickLocation(addressId);
                            }}
                        >
                            <div className='location-title'>{name}</div>
                            <div className='location-address'>{roadAddress}</div>
                            <div style={{ display: 'flex', alignItems: 'align-items' }}>
                                <div className='address'>지번</div>
                                <div className='location-address'>{address}</div>
                            </div>
                        </div>
                        <UpdateBtn
                            onClick={() => {
                                deleteLocation({ addressId: addressId });
                            }}
                        >
                            삭제
                        </UpdateBtn>
                    </LocationCard>
                ))}
            </Locations>
            {placeDetail && <KakaoPlaceIframe />}
        </Container>
    );
};

export default MyPage;
