import { request } from 'src/api';
import type {
    GetMarkerParam,
    GetMarkersResponse,
    CreateMarkerParam,
    CreateMarkerBody,
    DeleteMarkerParam,
    CreateMyLocationBody,
    DeleteMyLocationParam
} from './types';

export const getMarkers = ({ mapId }: GetMarkerParam) => {
    return request<GetMarkersResponse[]>({ method: 'GET', url: `/map/${mapId}/marker` });
};

export const createMarker = ({ mapId }: CreateMarkerParam, body: CreateMarkerBody) => {
    return request({ method: 'POST', url: `/map/${mapId}/marker`, data: body });
};

export const deleteMarker = ({ markerId }: DeleteMarkerParam) => {
    return request({ method: 'DELETE', url: `map/marker/${markerId}` });
};

export const getMyLocation = () => {
    return request({ method: 'GET', url: 'map/marker/location' });
};

export const createMyLocation = (body: CreateMyLocationBody) => {
    return request({ method: 'POST', url: 'map/marker/location', data: body });
};

export const deleteMyLocation = ({ addressId }: DeleteMyLocationParam) => {
    return request({ method: 'DELETE', url: `map/marker/location/${addressId}` });
};
