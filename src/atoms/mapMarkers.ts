import { atom, useAtom } from 'jotai';

// import { atom, useRecoilState } from 'recoil';

import { MapMarkerVO } from 'src/vo';

// const markerState = atom<MapMarkerVO[] | undefined>({ key: 'markerState', default: undefined });

// export const useMapMarkerState = () => {
//     const [markers, setMarkers] = useRecoilState(markerState);

//     return { markers, setMarkers };
// };
const markerState = atom<MapMarkerVO[] | undefined>(undefined);

export const useMapMarkerState = () => {
    const [markers, setMarkers] = useAtom(markerState);

    return { markers, setMarkers };
};
