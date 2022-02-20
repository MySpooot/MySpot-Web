export type Map = {
    id: number;
    mapName: string;
    isPrivate: boolean;
    created?: number;
};

export type mapType = 'recent' | 'my' | 'favorite';
