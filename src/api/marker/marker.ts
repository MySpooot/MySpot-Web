import { request } from 'src/api';
import type { GetMarkerParam, GetMarkersResponse, CreateMarkerParam, CreateMarkerBody, DeleteMarkerParam } from './types';

export const getMarkers = async ({ mapId }: GetMarkerParam) => {
    return await request<GetMarkersResponse[]>({ method: 'get', url: `/map/${mapId}/marker` });
};

export const createMarker = async ({ mapId }: CreateMarkerParam, body: CreateMarkerBody) => {
    return await request({ method: 'post', url: `/map/${mapId}/marker`, data: body });
};

export const deleteMarker = async ({ markerId }: DeleteMarkerParam) => {
    return await request({ method: 'delete', url: `map/marker/${markerId}` });
};
