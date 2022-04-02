import React, { FC, useCallback, useState, useRef } from 'react';
import { useNavigate } from 'react-router';

import { useMutation, useQuery } from 'react-query';
import { getMeHelper } from 'src/query';
import { createUserImg } from 'src/api/auth';
import { Container, UpdateBtn, UserInfo, LogoutBtn, User, Locations, LocationCard } from './styles';
import HeaderWithLeftArrow from 'src/components/HeaderWithLeftArrow';
import { Path } from 'src/Constants';
import { useMyLocationState } from 'src/atoms';
import { getMyLocation, deleteMyLocation } from 'src/api/marker';
import Modal from 'src/components/NicknameModal';

import mypage from 'src/assets/mypage/user-img.png';
import camera from 'src/assets/mypage/camera.png';

const MyPage: FC = () => {
    const { data: me } = getMeHelper.useQuery();
    const navigate = useNavigate();
    const { setLocations } = useMyLocationState();
    const [nicknamePopup, setNicknamePopup] = useState(false);

    const { data: locations } = useQuery('getLocations', () => getMyLocation({ offset: 0, limit: 50 }), {
        onSuccess: response => {
            setLocations(response);
        }
    });
    const { mutate: deleteLocation } = useMutation(deleteMyLocation, {
        onMutate: ({ addressId }) => {
            setLocations(locations => {
                if (!locations) return;

                return locations.filter(location => {
                    return location.addressId !== addressId;
                });
            });
        }
    });

    const onClickLocation = useCallback(
        (addressId: number) => {
            navigate(`${Path.myPage}/${addressId}`);
        },
        [navigate]
    );

    const onDeleteClick = useCallback(
        async (addressId: number) => {
            const confirm = window.confirm('해당 장소를 삭제하시겠습니까?');

            if (confirm) {
                await deleteLocation({ addressId });
                window.alert('삭제되었습니다.');
            }
        },
        [deleteLocation]
    );

    const onClickHome = useCallback(() => {
        navigate(Path.home);
    }, [navigate]);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        getMeHelper.setQueryData(undefined);
        navigate(Path.login);
    }, [navigate]);

    const onChange = useCallback(
        async e => {
            const img = e.target.files[0];
            const formData = new FormData();
            formData.append('file', img);

            const resultThumnail = await createUserImg(formData);

            getMeHelper.setQueryData({ ...me, thumbnail: resultThumnail });
        },
        [me]
    );

    const updateNickname = useCallback(() => {
        setNicknamePopup(true);
    }, [setNicknamePopup]);

    const inputRef = useRef<HTMLInputElement>(null);

    const clickCamera = () => {
        inputRef.current?.click();
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
                    <input ref={inputRef} accept='image/jpg,impge/png,image/jpeg,image/gif' className='profile_img' type='file' onChange={onChange} />
                    <img className='mypage-img' src={me?.thumbnail || mypage} />
                    <img className='upload-img' src={camera} onClick={() => clickCamera()} />
                    <div className='user-txt'>{me?.nickname}</div>
                    <UpdateBtn onClick={() => updateNickname()}>수정</UpdateBtn>
                </User>

                <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
            </UserInfo>
            <div style={{ marginLeft: '1rem', marginBottom: '0.75rem' }}>
                <h2>저장한 장소</h2>
            </div>
            <Locations style={{ overflowY: 'auto' }}>
                <div>
                    {locations?.map(({ id, name, address, roadAddress, addressId }) => (
                        <LocationCard key={id}>
                            <div style={{ display: 'flex', flexDirection: 'column' }} onClick={() => onClickLocation(addressId)}>
                                <div className='location-title'>{name}</div>
                                <div className='location-address'>{roadAddress}</div>
                                <div style={{ display: 'flex', alignItems: 'align-items' }}>
                                    <div className='address'>지번</div>
                                    <div className='location-address'>{address}</div>
                                </div>
                            </div>
                            <UpdateBtn onClick={() => onDeleteClick(addressId)}>삭제</UpdateBtn>
                        </LocationCard>
                    ))}
                </div>
            </Locations>
            {nicknamePopup && <Modal id={me?.id} setOpen={() => setNicknamePopup(false)}></Modal>}
        </Container>
    );
};

export default MyPage;
