import { atom, useAtom } from 'jotai';

import { MapDetailVO } from 'src/vo';

const mapDetailState = atom<MapDetailVO | undefined>(undefined);

export const useMapDetailState = () => {
    const [mapDetail, setMapDetail] = useAtom(mapDetailState);

    return { mapDetail, setMapDetail };
};
