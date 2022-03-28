import { request } from 'src/api';
import type { GetMeResponse, LogInResponse, UpdateUserNicknameResponse } from './types';

export const getMe = () => {
    return request<GetMeResponse>({ method: 'get', url: '/auth/me' });
};

export const logIn = (data: { code: string }) => {
    return request<LogInResponse>({ method: 'post', url: '/auth/login', data });
};

export const logOut = () => {
    return request({ method: 'post', url: '/auth/logout' });
};

export const updateUserNickname = (userId: any, nickname: string) => {
    return request<UpdateUserNicknameResponse>({ method: 'put', url: `/user`, data: { nickname } });
};

export const createUserImg = (file: FormData) => {
    return request({
        method: 'post',
        url: `/user/upload`,
        data: file,
        headers: {
            'Content-Type': `multipart/form-data; `
        }
    });
};
