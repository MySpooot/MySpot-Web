import { atom, useRecoilState } from 'recoil';

import { MapDetailVO } from 'src/vo';

const mapDetailState = atom<MapDetailVO | undefined>({
    key: 'mapDetailState',
    default: undefined
});

export const useMapDetailState = () => {
    const [mapDetail, setMapDetail] = useRecoilState(mapDetailState);

    return { mapDetail, setMapDetail };
};
