import { atom, useAtom } from 'jotai';

import { MapMarkerVO } from 'src/vo';

const markerState = atom<MapMarkerVO[] | undefined>(undefined);

export const useMapMarkerState = () => {
    const [markers, setMarkers] = useAtom(markerState);

    return { markers, setMarkers };
};
