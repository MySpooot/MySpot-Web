import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
    // baseURL: 'https://nestjs-map.herokuapp.com/',
    baseURL: 'http://localhost:3001/',
    headers: {
        clientVersion: require('../../package.json').version // eslint-disable-line @typescript-eslint/no-var-requires
    }
});

export const request = async <T = any>(config: AxiosRequestConfig): Promise<T> => {
    const { data } = await instance(config);

    return data;
};

export const setAccessToken = (token: string) => {
    instance.defaults.headers.common['Authorization'] = token;
};

export const clearAccessToken = () => {
    instance.defaults.headers.common['Authorization'] = '';
};
