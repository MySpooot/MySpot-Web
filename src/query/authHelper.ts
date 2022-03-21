import { makeQueryHelper } from 'react-query-helper';

import { getMe, setAccessToken } from 'src/api';
import { queryClient } from 'src/query';

export const getMeHelper = makeQueryHelper({
    baseQueryKey: ['getMe'],
    queryClient,
    queryFn: () => () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setAccessToken(token);
        return getMe();
    }
});
