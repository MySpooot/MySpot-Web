import axios from 'axios';

export * from './auth';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_ENV === 'local' ? 'http://localhost:3001' : 'https://untitled-server.herokuapp.com'
});

export const setAccessToken = (token: string) => {
    instance.defaults.headers.common['Authorization'] = token;
};

export const clearAccessToken = () => {
    instance.defaults.headers.common['Authorization'] = '';
};
