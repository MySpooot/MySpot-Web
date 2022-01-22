export type GetMapQuery = {
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
