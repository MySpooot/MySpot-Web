export type Map = {
    id: number;
    mapName: string;
    isPrivate: boolean;
    created?: number;
    userId?: number;
    mapId?: number;
};

export type MapType = 'recent' | 'my' | 'favorite';
