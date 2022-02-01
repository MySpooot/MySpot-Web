import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import { GetMapDetailResponse } from 'src/api/map';

const mapDetailState = atom<GetMapDetailResponse | undefined>({
    key: 'mapDetailState',
    default: undefined
});

export const useMapDetailState = () => {
    const [mapDetail, setMapDetail] = useRecoilState(mapDetailState);
    const reset = useResetRecoilState(mapDetailState);

    return { mapDetail, setMapDetail, reset };
};
