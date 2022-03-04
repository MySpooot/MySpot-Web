import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import { MapMarkerVO } from 'src/vo';

const mapPlaceOverlayState = atom<undefined | MapMarkerVO>({
    key: 'mapPlaceOverlayState',
    default: undefined
});

export const useMapPlaceOverlayState = () => {
    const [mapPlaceOverlay, setMapPlaceOverlay] = useRecoilState(mapPlaceOverlayState);

    return { mapPlaceOverlay, setMapPlaceOverlay };
};

export const useMapPlaceOverlayReset = () => {
    return useResetRecoilState(mapPlaceOverlayState);
};
