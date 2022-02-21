import { atom, useRecoilState } from 'recoil';

export const placeDetailState = atom<undefined | { placeId: number }>({
    key: 'placeDetail',
    default: undefined
});

export const usePlaceDetail = () => {
    const [placeDetail, setPlaceDetail] = useRecoilState(placeDetailState);

    return { placeDetail, setPlaceDetail };
};
