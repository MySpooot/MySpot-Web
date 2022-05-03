import {
    GetMeResponse,
    PostLoginBody,
    PostLoginResponse,
    PutUserParam,
    PutUserBody,
    PutUserResponse,
    PutUserNicknameBody,
    PutUserNicknameResponse,
    PostUploadImageBody
} from '@myspooot/myspot-backend';

import { request } from 'src/api';

export const getMe = () => {
    return request<GetMeResponse>({ method: 'GET', url: '/auth/me' });
};

export const logIn = (body: PostLoginBody) => {
    return request<PostLoginResponse>({ method: 'POST', url: '/auth/login', data: body });
};

export const logOut = () => {
    return request({ method: 'POST', url: '/auth/logout' });
};

export const updateUserNickname = ({ userId }: PutUserParam, body: PutUserBody) => {
    return request<PutUserResponse>({ method: 'PUT', url: `/auth/user/${userId}`, data: body });
};
export const updateUserNicknameMypage = (body: PutUserNicknameBody) => {
    return request<PutUserNicknameResponse>({ method: 'PUT', url: '/user', data: body });
};

export const createUserImg = (body: PostUploadImageBody) => {
    return request<string>({
        method: 'POST',
        url: '/user/upload',
        data: body.file,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
