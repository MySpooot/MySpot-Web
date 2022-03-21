export type Map = {
    id: number;
    mapName: string;
    isPrivate: boolean;
    created?: number;
};

export type MapType = 'recent' | 'my' | 'favorite';
