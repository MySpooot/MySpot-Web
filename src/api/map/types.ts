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

export type GetRecentMapsResponse = {
    id: number;
    userId: number;
    mapName: string;
    isPrivate: boolean;
};

export type GetUserFavoriteMapsResponse = {
    id: number;
    userId: number;
    mapName: string;
    isPrivate: boolean;
};

export type CreateMapBody = {
    mapName: string;
    isPrivate: boolean;
};

export type GetMapDetailResponse = {
    isOwner: boolean;
    userId: number;
    mapId: number;
    isPrivate: boolean;
    mapName: string;
    accessible: boolean;
};
