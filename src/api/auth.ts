import { instance, setAccessToken } from '@src/api';

export const getMe = async (token: string): Promise<GetMeResponse> => {
    setAccessToken(token);

    const { data } = await instance.post('/auth/me', token);

    return data;
};

export const logIn = async (param: { code: string }): Promise<LogInResponse> => {
    const { data } = await instance.post<LogInResponse>('/auth/logIn', param);
    setAccessToken(data.token);

    return data;
};

export const logOut = () => {
    return instance.post('/auth/logOut');
};

interface GetMeResponse {
    id: number;
    name: string;
    thumbnail?: string;
}

interface LogInResponse extends GetMeResponse {
    token: string;
}
