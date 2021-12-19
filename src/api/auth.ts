import { instance } from '@src/api';

export const getMe = async (): Promise<GetMeResponse> => {
    const { data } = await instance.get('/auth/me');

    return data;
};

export const logIn = async (param: { code: string }): Promise<LogInResponse> => {
    const { data } = await instance.post<LogInResponse>('/auth/login', param);

    return data;
};

export const logOut = () => {
    return instance.post('/auth/logout');
};

export const updateUserNickname = async (userId: number, nickname: string): Promise<UpdateUserNicknameResponse> => {
    const { data } = await instance.put(`/auth/user/${userId}`, { nickname });

    return data;
};

interface GetMeResponse {
    id: number;
    nickname: string;
    thumbnail?: string;
}

interface LogInResponse {
    id: number;
    nickname: string;
    thumbnail?: string;
    active?: number;
    token?: string;
}

interface UpdateUserNicknameResponse {
    id: number;
    nickname: string;
    thumbnail: string;
    active: number;
    token: string;
}
