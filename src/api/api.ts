import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
    baseURL: 'https://jsyth59asa.execute-api.ap-northeast-2.amazonaws.com/dev/'
});

export const request = async <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
    const { data } = await instance(config);

    return data;
};

export const setAccessToken = (token: string) => {
    instance.defaults.headers.common['Authorization'] = token;
};

export const clearAccessToken = () => {
    instance.defaults.headers.common['Authorization'] = '';
};
