import { request } from 'src/api';
import { GetMapsQuery, GetMapsResponse, GetRecentMapsResponse, GetUserFavoriteMapsResponse, CreateMapBody, GetMapDetailResponse } from './types';

export const getMapDetail = (params: { mapId: number }) => {
    return request<GetMapDetailResponse>({ method: 'GET', url: `/map/${params.mapId}/detail` });
};

// 내 지도
export const getMaps = (params?: GetMapsQuery) => {
    return request<GetMapsResponse[]>({ method: 'GET', url: '/map', params });
};
export const createMap = (body: CreateMapBody) => {
    return request({ method: 'POST', url: '/map', data: body });
};
export const updateMap = () => {
    return request({ method: 'PUT', url: '/map/mapId' });
};
export const deleteMap = () => {
    return request({ method: 'DELETE', url: '/map/mapId' });
};

// 최근 지도
export const getRecentMaps = (params?: GetMapsQuery) => {
    return request<GetRecentMapsResponse[]>({ method: 'GET', url: '/map/recent', params });
};
export const createRecentMap = (params: { recentMapId: number }) => {
    return request({ method: 'POST', url: `/map/recent/${params.recentMapId}` });
};
export const deleteRecentMap = (params: { recentMapId: number }) => {
    return request({ method: 'DELETE', url: `/map/recent/${params.recentMapId}` });
};

// 즐겨찾기 지도
export const getFavoriteMap = (params?: GetMapsQuery) => {
    return request<GetUserFavoriteMapsResponse[]>({ method: 'GET', url: '/map/favorite', params });
};
export const createFavoriteMap = (params: { favoriteMapId: number }) => {
    return request({ method: 'POST', url: `/map/favorite/${params.favoriteMapId}` });
};
export const deleteFavoriteMap = (params: { favoriteMapId: number }) => {
    return request({ method: 'DELETE', url: `/map/favorite/${params.favoriteMapId}` });
};
