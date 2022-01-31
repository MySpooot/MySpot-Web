// 지도 상세
export type GetMapDetailParam = {
    mapId: number;
};

export type GetMapDetailResponse = {
    isOwner: boolean;
    userId: number;
    mapId: number;
    isPrivate: boolean;
    mapName: string;
    accessible: boolean;
};

// 내 지도
export type GetMapsQuery = {
    offset?: number;
    limit?: number;
};

export type GetMapsResponse = {
    id: number;
    userId: number;
    mapName: string;
    isPrivate: boolean;
};

// 최근 지도
export type GetRecentMapsResponse = {
    id: number;
    userId: number;
    mapName: string;
    isPrivate: boolean;
};

export type CreateRecenMapsParam = {
    recentMapId: number;
};

export type DeleteRecentMapsParam = {
    recentMapId: number;
};

// 즐겨찾기 지도
export type GetFavoriteMapsResponse = {
    id: number;
    userId: number;
    mapName: string;
    isPrivate: boolean;
};

export type CreateFavoriteMapsParam = {
    favoriteMapId: number;
};

export type CreateMapBody = {
    mapName: string;
    isPrivate: boolean;
};

export type DeleteFavoriteMapParam = {
    favoriteMapId: number;
};
