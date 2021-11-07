export type Collection = 'user' | 'mymap';

export type User = {
    created: number;
    email: string;
    level: number;
    nickname: string;
    provider: 'kakao';
};

export type MyMap = {
    created: number;
    name: string;
    userId: string;
};

export type Marker = {
    created: number;
    latitude: number;
    longitude: number;
    mymapId: string;
    name: string;
    userId: string;
};
