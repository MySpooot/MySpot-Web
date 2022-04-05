import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
    baseURL:
        import.meta.env.VITE_ENV === 'production'
            ? 'https://afijgf54ce.execute-api.ap-northeast-2.amazonaws.com/prod/'
            : 'https://jsyth59asa.execute-api.ap-northeast-2.amazonaws.com/dev/'
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
