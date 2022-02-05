import React, { FC, useState, useEffect, useCallback, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { Container } from './styles';
import { JoinState } from './types';
import { updateUserNickname } from 'src/api/auth';
import { Path } from 'src/Constants';
import { meState } from 'src/atoms';
import { setAccessToken } from 'src/api';

const Join: FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [me, setMe] = useRecoilState(meState);

    const [nickname, setNickname] = useState('');

    useEffect(() => {
        if (me) {
            return navigate(Path.home);
        }

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

        try {
            const me = await updateUserNickname(id, nickname);
            localStorage.setItem('token', me.token);
            setAccessToken(me.token);
            setMe(me);
            navigate(Path.home);
        } catch (err) {
            console.error(err);
            alert('Error!');
        }
    }, [nickname, setMe, navigate, state]);

    const onNicknameChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        setNickname(evt.target.value);
    }, []);

    return (
        <Container>
            <h3>가입하기</h3>
            <h5>닉네임을 입력하고 회원가입을 완료하세요</h5>
            <div>
                <input placeholder='닉네임을 입력하세요' type='text' value={nickname} onChange={onNicknameChange} />
                <button onClick={onJoinClick}>회원가입</button>
            </div>
        </Container>
    );
};

export default Join;
