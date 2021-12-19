import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { parse } from 'query-string';

import { Path } from '@src/Constants';
import { logIn } from '@src/api';
import { meState } from '@src/atom/me';
import Loading from '@src/components/Loading';

const KakaoCallbackPage: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const setMe = useSetRecoilState(meState);

    const { code, state, error, error_description } = parse(location.search);

    useEffect(() => {
        if (error) {
            alert(error_description);

            return navigate(Path.login);
        }

        if (!code || !state) {
            alert('잘못된 접근입니다.');

            return navigate(Path.login);
        }

        // TODO: 뒤로가기로 접근하였을때 페이지 이동 처리 필요

        logIn({ code: code as string })
            .then(data => {
                switch (data.active) {
                    case 0: // Inactive
                        alert('Inactive User!');
                        navigate(Path.login);
                        break;

                    case 1: // Active
                        localStorage.setItem('token', data.token as string);
                        setMe(data);
                        navigate(Path.home);
                        break;

                    case 2: // Pending
                        navigate(Path.join, { state: { id: data.id, nickname: data.nickname } });
                        break;

                    default:
                        throw new Error(`Unexpected User Status: ${data.active}`);
                }
            })
            .catch(err => {
                console.error(err);
                alert('Backend Server Error!');
                navigate(-1);
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <Loading />;
};

export default KakaoCallbackPage;
