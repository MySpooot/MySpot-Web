export type Collection = 'user' | 'mymap';

export interface BaseDocument {
    id: string;
}

export interface User extends BaseDocument {
    created: number;
    email: string;
    level: number;
    nickname: string;
    provider: 'kakao';
}

export interface MyMap extends BaseDocument {
    created: number;
    name: string;
    userId: string;
}

export interface Marker extends BaseDocument {
    created: number;
    latitude: number;
    longitude: number;
    mymapId: string;
    name: string;
    userId: string;
}
