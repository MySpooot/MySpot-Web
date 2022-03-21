import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Path } from 'src/Constants';
import { logIn, setAccessToken } from 'src/api';
import { getMeHelper } from 'src/query';
import useQueryString from 'src/hooks/useQueryString';
import Loading from 'src/components/Loading';

const KakaoLoginCallback: FC = () => {
    const navigate = useNavigate();
    const {
        code,
        state,
        error,
        error_description: errorDescription
    } = useQueryString<{ code: string; state: string; error: string; error_description: string }>();

    useEffect(() => {
        if (error) {
            alert(errorDescription);

            return navigate(Path.login);
        }

        if (!code || !state) {
            alert('잘못된 접근입니다.');

            return navigate(Path.login);
        }

        // TODO: 뒤로가기로 접근하였을때 페이지 이동 처리 필요
        logIn({ code })
            .then(data => {
                switch (data.active) {
                    case 0: // Inactive
                        alert('Inactive User!');
                        navigate(Path.login);
                        break;

                    case 1: // Active
                        localStorage.setItem('token', data.token as string);
                        setAccessToken(data.token!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
                        getMeHelper.setQueryData(data);
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

                getMeHelper.setQueryData(undefined);
                localStorage.removeItem('token');

                alert('Backend Server Error!');

                navigate(Path.login);
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <Loading />;
};

export default KakaoLoginCallback;
