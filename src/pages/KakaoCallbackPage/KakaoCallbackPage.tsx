import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { parse } from 'query-string';

import { logIn } from '@src/api';
import { meState } from '@src/atom/me';

const KakaoCallbackPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const setMe = useSetRecoilState(meState);

    const { code, state, error, error_description } = parse(location.search);

    useEffect(() => {
        if (error) {
            alert(error_description);

            return navigate('/login');
        }

        if (!code || !state) {
            alert('잘못된 접근입니다.');

            return navigate('/login');
        }

        logIn({ code: code as string }).then(data => {
            localStorage.setItem('token', data.token);

            setMe({ id: data.id, name: data.name, thumbnail: data.thumbnail });
            navigate('/');
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <div></div>;
};

export default KakaoCallbackPage;
