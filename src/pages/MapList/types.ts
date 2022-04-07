export type mapType = 'recent' | 'my' | 'favorite';
export type Map = {
    id: number;
    userId: number;
    mapId?: number;
    mapName: string;
    isPrivate: boolean;
    created: number;
};
