import React, { FC, useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Container, Title, Description, InputArea } from './styles';
import type { JoinState } from './types';
import type { UpdateUserNicknameResponse, UpdateUserNicknameParams, UpdateUserNicknameBody } from 'src/api';
import { updateUserNickname } from 'src/api/auth';
import { Path } from 'src/Constants';
import { setAccessToken } from 'src/api';
import { useMeState } from 'src/atoms';
import Input from 'src/components/Input';
import Button from 'src/components/Button';

const Join: FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { setMe } = useMeState();

    const [nickname, setNickname] = useState('');

    const { mutate: fetchUpdateUserNickname } = useMutation<UpdateUserNicknameResponse, unknown, UpdateUserNicknameParams & UpdateUserNicknameBody>(
        ({ userId, nickname }) => updateUserNickname({ userId }, { nickname }),
        {
            onSuccess: me => {
                localStorage.setItem('token', me.token);
                setAccessToken(me.token);
                setMe(me);
                navigate(Path.home);
            },
            onError: err => {
                console.error(err);
                alert('Error!');
            }
        }
    );

    useEffect(() => {
        const { id, nickname } = state as JoinState;

        if (!id || !nickname) {
            return navigate(Path.login);
        }

        setNickname(nickname);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onJoinClick = useCallback(async () => {
        const { id } = state as JoinState;

        if (!id) return;

        if (!nickname) {
            return alert('닉네임을 입력해주세요!');
        }

        fetchUpdateUserNickname({ userId: id, nickname });
    }, [fetchUpdateUserNickname, nickname, state]);

    const onNicknameChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        setNickname(evt.target.value);
    }, []);

    return (
        <Container>
            <div>my spot</div>
            <Title>회원가입</Title>
            <Description>
                마이스팟에 가입하고
                <br />
                나만의 지도를 공유하세요.
            </Description>
            <InputArea>
                <Input maxLength={12} placeholder='닉네임을 입력하세요' type='text' value={nickname} onChange={onNicknameChange} />
                <Button style={{ marginTop: '1.5rem' }} type='primary' onClick={onJoinClick}>
                    완료
                </Button>
            </InputArea>
        </Container>
    );
};

export default Join;
