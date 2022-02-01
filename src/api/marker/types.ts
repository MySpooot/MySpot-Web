export type GetMarkerParam = {
    mapId: number;
};

export type GetMarkersResponse = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    addressId: number;
    address?: string;
    openingHours?: string;
    isMyLocation: boolean;
};

export type CreateMarkerParam = {
    mapId: number;
};

export type CreateMarkerBody = {
    locationName: string;
    latitude: string;
    longitude: string;
    addressId: number;
    address?: number;
    openingHours?: string;
};

export type DeleteMarkerParam = {
    markerId: number;
};
