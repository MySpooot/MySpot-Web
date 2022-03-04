import { atom, useRecoilState } from 'recoil';

const mapAccessibleState = atom<boolean>({
    key: 'mapAccessibleState',
    default: false
});

export const useMapAccessible = () => {
    const [mapAccessible, setMapAccessible] = useRecoilState(mapAccessibleState);

    return { mapAccessible, setMapAccessible };
};
