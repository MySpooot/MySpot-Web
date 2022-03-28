import { atom, useAtom } from 'jotai';

interface Me {
    id: number;
    nickname: string;
    thumbnail?: string;
}

const meState = atom<Me | undefined>(undefined);
const updateState = atom(false);

/**
 * @deprecated
 */
export const useMeState = () => {
    const [me, setMe] = useAtom(meState);

    return { me, setMe };
};

export const useUpdateState = () => {
    const [update, setUpdate] = useAtom(updateState);

    return { update, setUpdate };
};
