import { request } from './api';

export const getMaps = async () => {
    return await request<GetMapsResponse[]>({ method: 'get', url: '/map', params: { mapId: '' } });
};

export const createMap = async () => {
    return await request({ method: 'post', url: '/map', data: {} });
};

export const updateMap = async () => {
    return await request({ method: 'put', url: '/map/mapId' });
};

export const deleteMap = async () => {
    return await request({ method: 'delete', url: '/map/mapId' });
};

interface GetMapsResponse {
    id: number;
    name: string;
}
