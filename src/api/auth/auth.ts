import { request } from 'src/api';
import type { GetMeResponse, LogInResponse, UpdateUserNicknameResponse } from './types';

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
