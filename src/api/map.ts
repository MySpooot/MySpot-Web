import { instance } from '@src/api';

export const getMaps = async () => {
    const { data } = await instance.get<GetMapsResponse[]>('/map', { params: { mapId: '' } });

    return data;
};

export const createMap = async () => {
    await instance.post('/map', {});
};

export const updateMap = async () => {
    await instance.put('/map/mapId');
};

export const deleteMap = async () => {
    await instance.delete('/map/mapId');
};

interface GetMapsResponse {
    id: number;
    name: string;
}
