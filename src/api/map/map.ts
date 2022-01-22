import { request } from 'src/api';
import { GetMapQuery, GetMapsResponse, GetRecentMapsResponse, GetUserFavoriteMapsResponse, CreateMapBody } from './types';

// 내 지도
export const getMaps = (params?: GetMapQuery) => {
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
export const getRecentMaps = (params?: GetMapQuery) => {
    return request<GetRecentMapsResponse[]>({ method: 'GET', url: '/map/recent', params });
};
export const createRecentMap = (recentMapId: number) => {
    return request({ method: 'POST', url: `/map/recent/${recentMapId}` });
};
export const deleteRecentMap = (recentMapId: number) => {
    return request({ method: 'DELETE', url: `/map/recent/${recentMapId}` });
};

// 즐겨찾기 지도
export const getFavoriteMap = (params?: GetMapQuery) => {
    return request<GetUserFavoriteMapsResponse[]>({ method: 'GET', url: '/map/favorite', params });
};
export const createFavoriteMap = (favoriteMapId: number) => {
    return request({ method: 'POST', url: `/map/favorite/${favoriteMapId}` });
};
export const deleteFavoriteMap = (favoriteMapId: number) => {
    return request({ method: 'DELETE', url: `/map/favorite/${favoriteMapId}` });
};
