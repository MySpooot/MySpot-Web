import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Path } from 'src/Constants';
import { setAccessToken } from 'src/api';
import { useMeState } from 'src/atoms';
import Loading from 'src/components/Loading';
import useQueryString from 'src/hooks/useQueryString';
import { logInHelper } from 'src/query';

const KakaoLoginCallback: FC = () => {
    const navigate = useNavigate();
    const {
        code,
        state,
        error,
        error_description: errorDescription
    } = useQueryString<{ code: string; state: string; error: string; error_description: string }>();

    const { me, setMe } = useMeState();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    logInHelper.useQuery(code!, {
        enabled: !me && !!code && !!state,
        onSuccess: data => {
            switch (data.active) {
                case 0: // Inactive
                    alert('Inactive User!');
                    navigate(Path.login);
                    break;

                case 1: // Active
                    if (!data.token) {
                        throw new Error('Cannot find token!');
                    }

                    localStorage.setItem('token', data.token);
                    setAccessToken(data.token);
                    setMe(data);
                    navigate(Path.home);

                    break;

                case 2: // Pending
                    navigate(Path.join, { state: { id: data.id, nickname: data.nickname } });

                    break;

                default:
                    throw new Error(`Unexpected User Status: ${data.active}`);
            }
        },
        onError: err => {
            console.error(err);

            setMe(undefined);
            localStorage.removeItem('token');

            alert('Backend Server Error!');

            navigate(Path.login);
        }
    });

    useEffect(() => {
        if (me) {
            return navigate(Path.home);
        }

        if (error || !code || !state) {
            alert(errorDescription || '잘못된 접근입니다.');

            return navigate(Path.login);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <Loading />;
};

export default KakaoLoginCallback;
