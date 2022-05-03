import {
    GetMapDetailParam,
    GetMapDetailResponse,
    GetUserMapsQuery,
    GetUserMapsResponse,
    PostUserMapBody,
    PostUserMapResponse,
    GetUserRecentMapsQuery,
    GetUserRecentMapsResponse,
    PostUserRecentMapParam,
    DeleteUserRecentMapParam,
    GetUserFavoriteMapsQuery,
    GetUserFavoriteMapsResponse,
    PostUserFavoriteMapParam,
    DeleteUserFavoriteMapParam,
    GetMapCodeParam,
    GetMapCodeResponse,
    PostMapCodeMatchParam,
    PostMapCodeMatchBody
} from '@myspooot/myspot-backend';

import { request } from 'src/api';

// 지도 상세
export const getMapDetail = ({ mapId }: GetMapDetailParam) => {
    return request<GetMapDetailResponse>({ method: 'GET', url: `/map/${mapId}/detail` });
};

// 내 지도
export const getMaps = (query?: GetUserMapsQuery) => {
    return request<GetUserMapsResponse[]>({ method: 'GET', url: '/map', params: query });
};
export const createMap = (body: PostUserMapBody) => {
    return request<PostUserMapResponse>({ method: 'POST', url: '/map', data: body });
};
export const updateMap = () => {
    return request({ method: 'PUT', url: '/map/mapId' });
};

// TODO: FIX after remain pr merge
export const deleteMap = (mapId: number) => {
    return request({ method: 'DELETE', url: `/map/${mapId}` });
};

// 최근 지도
export const getRecentMaps = (query?: GetUserRecentMapsQuery) => {
    return request<GetUserRecentMapsResponse[]>({ method: 'GET', url: '/map/recent', params: query });
};
export const createRecentMap = ({ recentMapId }: PostUserRecentMapParam) => {
    return request({ method: 'POST', url: `/map/recent/${recentMapId}` });
};
export const deleteRecentMap = ({ recentMapId }: DeleteUserRecentMapParam) => {
    return request({ method: 'DELETE', url: `/map/recent/${recentMapId}` });
};

// 즐겨찾기 지도
export const getFavoriteMap = (query?: GetUserFavoriteMapsQuery) => {
    return request<GetUserFavoriteMapsResponse[]>({ method: 'GET', url: '/map/favorite', params: query });
};
export const createFavoriteMap = ({ favoriteMapId }: PostUserFavoriteMapParam) => {
    return request({ method: 'POST', url: `/map/favorite/${favoriteMapId}` });
};
export const deleteFavoriteMap = ({ favoriteMapId }: DeleteUserFavoriteMapParam) => {
    return request({ method: 'DELETE', url: `/map/favorite/${favoriteMapId}` });
};

export const getPrivateCode = ({ mapId }: GetMapCodeParam) => {
    return request<GetMapCodeResponse>({ method: 'GET', url: `/map/${mapId}/code` });
};

export const checkPrivateCode = ({ mapId }: PostMapCodeMatchParam, body: PostMapCodeMatchBody) => {
    return request<boolean>({ method: 'POST', url: `/map/${mapId}/code/match`, data: body });
};
