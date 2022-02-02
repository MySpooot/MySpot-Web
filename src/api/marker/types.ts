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
