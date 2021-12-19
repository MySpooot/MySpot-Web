import axios from 'axios';

import { version } from '../../package.json';

export const instance = axios.create({
    baseURL: 'https://nestjs-map.herokuapp.com/',
    headers: {
        clientVersion: version
    }
});

export const setAccessToken = (token: string) => {
    instance.defaults.headers.common['Authorization'] = token;
};

export const clearAccessToken = () => {
    instance.defaults.headers.common['Authorization'] = '';
};
