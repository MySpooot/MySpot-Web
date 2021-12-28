import { request } from './api';

export const getMe = async () => {
    return await request<GetMeResponse>({ method: 'get', url: '/auth/me' });
};

export const logIn = async (data: { code: string }) => {
    return await request<LogInResponse>({ method: 'post', url: '/auth/login', data });
};

export const logOut = () => {
    return request({ method: 'post', url: '/auth/logout' });
};

export const updateUserNickname = async (userId: number, nickname: string) => {
    return await request<UpdateUserNicknameResponse>({ method: 'put', url: `/auth/user/${userId}`, data: { nickname } });
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
