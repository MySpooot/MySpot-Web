export type GetMarkerParam = {
    mapId: number;
};

export type GetMarkersResponse = {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    addressId: number;
    address?: string;
    roadAddress?: string;
    isMyLocation: boolean;
    isLike: boolean;
    likeCount: number;
};

export type CreateMarkerParam = {
    mapId: number;
};

export type CreateMarkerBody = {
    locationName: string;
    latitude: string;
    longitude: string;
    addressId: number;
    address?: string;
};

export type DeleteMarkerParam = {
    markerId: number;
};

export type CreateMyLocationBody = {
    locationName: string;
    addressId: string;
    address?: string;
    roadAddress?: string;
};
