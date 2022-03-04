import { atom, useRecoilState } from 'recoil';

interface Me {
    id: number;
    nickname: string;
    thumbnail?: string;
}

const meState = atom<Me | undefined>({
    key: 'mesState',
    default: undefined
});

export const useMeState = () => {
    const [me, setMe] = useRecoilState(meState);

    return { me, setMe };
};
