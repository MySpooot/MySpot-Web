import { request } from './api';

export const getMarkers = async () => {
    return await request<GetMarkersResponse[]>({ method: 'get', url: '/marker', params: { mapId: '' } });
};

export const createMarker = async () => {
    return await request({ method: 'post', url: '/marker', data: {} });
};

export const deleteMarker = async () => {
    return await request({ method: 'delete', url: '/marker/markerId' });
};

interface GetMarkersResponse {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    created: Date;
}
