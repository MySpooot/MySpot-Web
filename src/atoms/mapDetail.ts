import { atom, useRecoilState } from 'recoil';

import { GetMapDetailResponse } from 'src/api/map';

const mapDetailState = atom<GetMapDetailResponse | undefined>({
    key: 'mapDetailState',
    default: undefined
});

export const useMapDetailState = () => {
    const [mapDetail, setMapDetail] = useRecoilState(mapDetailState);

    return { mapDetail, setMapDetail };
};
