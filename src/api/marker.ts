import { instance } from '@src/api';

export const getMarkers = async () => {
    const { data } = await instance.get<GetMarkersResponse[]>('/marker', { params: { mapId: '' } });

    return data;
};

export const createMarker = async () => {
    await instance.post('/marker', {});
};

export const deleteMarker = async () => {
    await instance.delete('/marker/markerId');
};

interface GetMarkersResponse {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    created: Date;
}
