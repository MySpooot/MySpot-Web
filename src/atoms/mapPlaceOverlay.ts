import { atom, useRecoilState } from 'recoil';

import { GetMarkersResponse } from 'src/api/marker';

const mapPlaceOverlayState = atom<undefined | GetMarkersResponse>({
    key: 'mapPlaceOverlayState',
    default: undefined
});

export const useMapPlaceOverlayState = () => {
    const [mapPlaceOverlay, setMapPlaceOverlay] = useRecoilState(mapPlaceOverlayState);

    return { mapPlaceOverlay, setMapPlaceOverlay };
};
